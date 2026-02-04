import "../components/simulator/simulator.css";

import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "../components/simulator/components/Navbar.jsx";
import TopControls from "../components/simulator/components/TopControls.jsx";
import InputOutput from "../components/simulator/components/InputOutput.jsx";
import PlaybackControls from "../components/simulator/components/PlaybackControls.jsx";
import ResizableSplit from "../components/simulator/components/ResizableSplit.jsx";
import CodePanel from "../components/simulator/components/CodePanel.jsx";
import MentorPanel from "../components/simulator/components/MentorPanel.jsx";
import ChatbotPanel from "../components/simulator/components/ChatbotPanel.jsx";
import { VariablesPanel, CallStackPanel, StepDescPanel } from "../components/simulator/components/StatePanels.jsx";
import AlgorithmInfo from "../components/simulator/components/AlgorithmInfo.jsx";
import { ALGO_META } from "../components/simulator/algorithms/meta.js";

import ArrayVisualizer from "../components/simulator/components/ArrayVisualizer.jsx";
import GraphVisualizer from "../components/simulator/components/GraphVisualizer.jsx";
import DPVisualizer from "../components/simulator/components/DPVisualizer.jsx";

import { bubbleSortSteps, bubbleSortCode } from "../components/simulator/algorithms/bubbleSort.js";
import { selectionSortSteps, selectionSortCode } from "../components/simulator/algorithms/selectionSort.js";
import { insertionSortSteps, insertionSortCode } from "../components/simulator/algorithms/insertionSort.js";
import { mergeSortSteps, mergeSortCode } from "../components/simulator/algorithms/mergeSort.js";
import { bfsSteps, bfsCode } from "../components/simulator/algorithms/graph/bfs.js";
import { dfsSteps, dfsCode } from "../components/simulator/algorithms/graph/dfs.js";
import { knapsack01Steps, knapsack01Code } from "../components/simulator/algorithms/dp/knapsack01.js";

const ALGORITHMS = {
  bubbleSort: { type: "array", build: (inputArr) => bubbleSortSteps(inputArr), code: bubbleSortCode },
  selectionSort: { type: "array", build: (inputArr) => selectionSortSteps(inputArr), code: selectionSortCode },
  insertionSort: { type: "array", build: (inputArr) => insertionSortSteps(inputArr), code: insertionSortCode },
  bfs: { type: "graph", build: (g) => bfsSteps(g.graph, g.start), code: bfsCode },
  dfs: { type: "graph", build: (g) => dfsSteps(g.graph, g.start), code: dfsCode },
  knapsack01: { type: "dp", build: (d) => knapsack01Steps(d), code: knapsack01Code },
  mergeSort: { type: "array", build: (inputArr) => mergeSortSteps(inputArr), code: mergeSortCode },
};

function computeOutput(algorithm, inputArr) {
  const meta = ALGORITHMS[algorithm];
  if (!meta || meta.type !== "array") return [];
  return [...inputArr].sort((a, b) => a - b);
}

export default function Simulator() {
  // ✅ Simulator-only theme (DO NOT touch document.documentElement)
  const [theme, setTheme] = useState(() => localStorage.getItem("simulator-theme") || "dark");

  useEffect(() => {
    localStorage.setItem("simulator-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // (Optional) debug
  // useEffect(() => {
  //   console.log("simulator theme =", theme);
  // }, [theme]);

  // top settings
  const [language, setLanguage] = useState("javascript");
  const [algorithm, setAlgorithm] = useState("bubbleSort");
  const [n, setN] = useState(10);
  const [randMax, setRandMax] = useState(50);

  // Step/Event log (history)
  const [eventLog, setEventLog] = useState([]); // [{ id, text, isNew }]

  // algorithm type
  const [algoType, setAlgoType] = useState("array"); // "array" | "graph" | "dp"

  // steps
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);

  // playback
  const [status, setStatus] = useState("idle"); // idle | playing | done
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef(null);

  const navActionRef = useRef("init");
  const loggedStepsRef = useRef(new Set());

  // mentor mode
  const [mentorMode, setMentorMode] = useState(false);
  const [mentorLocked, setMentorLocked] = useState(false);
  const [mentorFeedback, setMentorFeedback] = useState(null);

  // graph input
  const [graphInput, setGraphInput] = useState(() => ({
    start: "A",
    graph: {
      directed: false,
      nodes: [
        { id: "A", x: 80, y: 80 },
        { id: "B", x: 220, y: 60 },
        { id: "C", x: 330, y: 140 },
        { id: "D", x: 140, y: 200 },
        { id: "E", x: 260, y: 240 },
      ],
      edges: [
        { from: "A", to: "B" },
        { from: "A", to: "D" },
        { from: "B", to: "C" },
        { from: "B", to: "D" },
        { from: "C", to: "E" },
        { from: "D", to: "E" },
      ],
    },
  }));

  // dp input
  const [dpInput, setDpInput] = useState(() => ({
    weights: [2, 3, 4, 5],
    values: [3, 4, 5, 8],
    W: 8,
  }));

  // input/output
  const [inputArr, setInputArr] = useState([5, 1, 4, 2, 8, 3]);
  const outputArr = useMemo(() => computeOutput(algorithm, inputArr), [algorithm, inputArr]);

  const maxStep = Math.max(0, steps.length - 1);
  const cur = steps[stepIndex] || null;

  // switch algo type + reset
  useEffect(() => {
    const meta = ALGORITHMS[algorithm];
    setAlgoType(meta?.type || "array");

    setSteps([]);
    setStepIndex(0);
    setStatus("idle");

    loggedStepsRef.current = new Set();
    navActionRef.current = "init";
    setEventLog([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algorithm]);

  // event log capture
  useEffect(() => {
    if (!steps.length) return;

    const action = navActionRef.current;
    if (action !== "next" && action !== "auto") return;
    if (loggedStepsRef.current.has(stepIndex)) return;

    const text = cur?.desc?.trim();
    if (!text) return;

    loggedStepsRef.current.add(stepIndex);

    setEventLog((prev) => {
      const id = `${stepIndex}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      return [...prev, { id, text, isNew: true }];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex, steps.length]);

  // derive code
  const code = useMemo(() => {
    const meta = ALGORITHMS[algorithm];
    if (!meta) return "";
    return meta.code?.[language] || meta.code?.javascript || "";
  }, [algorithm, language]);

  const algoMeta = ALGO_META[algorithm] || null;

  // mentor lock logic
  useEffect(() => {
    if (!mentorMode) {
      setMentorLocked(false);
      setMentorFeedback(null);
      return;
    }
    const q = cur?.question;
    if (q) {
      setMentorLocked(true);
      setMentorFeedback(null);
      if (status === "playing") setStatus("idle");
    } else {
      setMentorLocked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mentorMode, stepIndex]);

  // autoplay loop
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (status !== "playing") return;

    timerRef.current = setInterval(() => {
      navActionRef.current = "auto";
      setStepIndex((idx) => Math.min(idx + 1, maxStep));
    }, Math.max(120, 600 / speed));

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [status, speed, maxStep]);

  // mark done
  useEffect(() => {
    if (steps.length && stepIndex >= maxStep) {
      if (status === "playing") setStatus("done");
      else if (status !== "done" && stepIndex === maxStep) setStatus("idle");
    }
  }, [stepIndex, maxStep, steps.length, status]);

  const onGenerateRandom = () => {
    const arr = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * randMax));
    setInputArr(arr);
    setSteps([]);
    setStepIndex(0);
    setStatus("idle");

    loggedStepsRef.current = new Set();
    navActionRef.current = "init";
    setEventLog([]);
  };

  const onLoadExample = () => {
    setInputArr([5, 1, 4, 2, 8, 3]);
    setSteps([]);
    setStepIndex(0);
    setStatus("idle");

    loggedStepsRef.current = new Set();
    navActionRef.current = "init";
    setEventLog([]);
  };

  const onBuildSteps = () => {
    const meta = ALGORITHMS[algorithm];
    if (!meta) {
      alert("Unknown algorithm selected.");
      return;
    }

    if (meta.type === "array") {
      if (!Array.isArray(inputArr) || inputArr.length === 0) {
        alert("Input array is empty. Please load an example or generate random input.");
        return;
      }
    } else if (meta.type === "graph") {
      const g = graphInput?.graph;
      if (!g?.nodes?.length) {
        alert("Graph has no nodes.");
        return;
      }
      if (!graphInput?.start) {
        alert("Please select a start node.");
        return;
      }
    } else {
      const w = dpInput?.weights || [];
      const v = dpInput?.values || [];
      const cap = dpInput?.W;

      if (!w.length || !v.length || w.length !== v.length) {
        alert("DP input invalid: weights/values must be non-empty and same length.");
        return;
      }
      if (!Number.isFinite(cap) || cap < 0) {
        alert("DP input invalid: capacity W must be a number >= 0.");
        return;
      }
    }

    const built =
      meta.type === "array"
        ? meta.build(inputArr)
        : meta.type === "graph"
        ? meta.build(graphInput)
        : meta.build(dpInput);

    if (!built || built.length === 0) {
      alert("No steps were generated. Check the algorithm builder.");
      return;
    }

    setSteps(built);
    setStepIndex(0);
    setStatus("idle");
    setMentorFeedback(null);

    loggedStepsRef.current = new Set();
    navActionRef.current = "init";
    setEventLog([]);
  };

  const onReset = () => {
    setStepIndex(0);
    setStatus("idle");
    setMentorFeedback(null);

    loggedStepsRef.current = new Set();
    navActionRef.current = "init";
    setEventLog([]);
  };

  const canAutoPlay = !mentorMode || !mentorLocked;

  const onPlayPause = () => {
    if (!steps.length) return;
    if (mentorMode && mentorLocked) return;
    setStatus((s) => (s === "playing" ? "idle" : "playing"));
  };

  const onSeek = (idx) => {
    navActionRef.current = "seek";
    setStatus("idle");
    setStepIndex(idx);
  };

  const goNext = () => {
    if (!steps.length) return;
    if (mentorMode && mentorLocked) return;

    navActionRef.current = "next";
    setStatus("idle");
    setStepIndex((i) => Math.min(i + 1, maxStep));
  };

  const goPrev = () => {
    if (!steps.length) return;

    navActionRef.current = "prev";
    setStatus("idle");
    setStepIndex((i) => Math.max(i - 1, 0));
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mentorMode, mentorLocked, maxStep, steps.length]);

  const onMentorAnswer = (selectedIndex) => {
    const q = cur?.question;
    if (!q) return;

    if (selectedIndex === q.correctIndex) {
      setMentorFeedback({ type: "ok", text: "✅ Correct! Next unlocked." });
      setMentorLocked(false);
    } else {
      setMentorFeedback({ type: "bad", text: "❌ Not correct. Try again or Skip." });
      setMentorLocked(true);
    }
  };

  const onMentorSkip = () => {
    setMentorFeedback({ type: "bad", text: "Skipped. Manual Next allowed." });
    setMentorLocked(false);
  };

  return (
    // dark class is ONLY applied inside Simulator page
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
        <Navbar
          status={status}
          mentorMode={mentorMode}
          setMentorMode={setMentorMode}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <TopControls
          language={language}
          setLanguage={setLanguage}
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          n={n}
          setN={setN}
          randMax={randMax}
          setRandMax={setRandMax}
          onGenerateRandom={onGenerateRandom}
          onLoadExample={onLoadExample}
        />

        {algoType === "array" ? (
          <InputOutput inputArr={inputArr} setInputArr={setInputArr} outputArr={outputArr} />
        ) : algoType === "graph" ? (
          <div className="max-w-[1400px] mx-auto px-4 mt-4">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4">
              <div className="text-sm font-semibold">Graph Input</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Start node for traversal</div>

              <div className="mt-3 flex items-center gap-3">
                <label className="text-sm text-zinc-600 dark:text-zinc-300">Start:</label>
                <select
                  value={graphInput.start}
                  onChange={(e) => setGraphInput((p) => ({ ...p, start: e.target.value }))}
                  className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm"
                >
                  {graphInput.graph.nodes.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.id}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-[1400px] mx-auto px-4 mt-4">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4">
              <div className="text-sm font-semibold">DP Input (0/1 Knapsack)</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Comma-separated integers</div>

              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-zinc-500">Weights</label>
                  <input
                    value={dpInput.weights.join(",")}
                    onChange={(e) =>
                      setDpInput((p) => ({
                        ...p,
                        weights: e.target.value
                          .split(",")
                          .map((x) => x.trim())
                          .filter(Boolean)
                          .map(Number)
                          .filter(Number.isFinite),
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-500">Values</label>
                  <input
                    value={dpInput.values.join(",")}
                    onChange={(e) =>
                      setDpInput((p) => ({
                        ...p,
                        values: e.target.value
                          .split(",")
                          .map((x) => x.trim())
                          .filter(Boolean)
                          .map(Number)
                          .filter(Number.isFinite),
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-500">Capacity (W)</label>
                  <input
                    type="number"
                    value={dpInput.W}
                    onChange={(e) => setDpInput((p) => ({ ...p, W: Number(e.target.value) }))}
                    className="mt-1 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-[1400px] mx-auto px-4 mt-2 text-xs text-zinc-500">
          Debug: inputLen={inputArr.length}, steps={steps.length}, stepIndex={stepIndex}
        </div>

        <PlaybackControls
          status={status}
          onBuildSteps={onBuildSteps}
          onReset={onReset}
          stepIndex={stepIndex}
          maxStep={maxStep}
          onSeek={onSeek}
          speed={speed}
          setSpeed={setSpeed}
          onPlayPause={onPlayPause}
          onPrev={goPrev}
          onNext={goNext}
          canAutoPlay={steps.length > 0 && canAutoPlay}
          hasSteps={steps.length > 0}
          mentorLocked={mentorMode && mentorLocked}
        />

        <MentorPanel
          mentorMode={mentorMode}
          step={cur}
          locked={mentorLocked}
          onAnswer={onMentorAnswer}
          onSkip={onMentorSkip}
          feedback={mentorFeedback}
        />

        <div className="max-w-[1400px] mx-auto px-4 mt-4">
          <div className="h-[430px]">
            <ResizableSplit
              initialLeftPct={55}
              left={
                <div className="h-full">
                  {algoType === "array" ? (
                    <ArrayVisualizer
                      show={steps.length > 0}
                      arr={cur?.array ?? []}
                      comparing={cur?.comparing ?? null}
                      swapped={cur?.swapped ?? null}
                    />
                  ) : algoType === "graph" ? (
                    <GraphVisualizer show={steps.length > 0} step={cur} />
                  ) : (
                    <DPVisualizer show={steps.length > 0} step={cur} />
                  )}

                  <div className="px-4 pb-4 -mt-2">
                    <button
                      onClick={goNext}
                      className="mt-2 w-full rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-4 py-2 text-sm transition disabled:opacity-50"
                      disabled={mentorMode && mentorLocked}
                      title={mentorMode && mentorLocked ? "Mentor locked: answer or skip" : ""}
                    >
                      Next Step (→)
                    </button>
                  </div>
                </div>
              }
              right={<CodePanel code={code} activeLine={cur?.line ?? -1} />}
            />
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 mt-4 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <VariablesPanel vars={cur?.vars || {}} />
            <CallStackPanel stack={cur?.callStack || ["—"]} />
            <StepDescPanel log={eventLog} />
          </div>
        </div>

        {algorithm && <AlgorithmInfo meta={algoMeta} />}
        <ChatbotPanel algorithm={algorithm} language={language} step={cur} code={code} mentorMode={mentorMode} mentorLocked={mentorLocked} mentorFeedback={mentorFeedback} mentorQuestion={cur?.question}/>
      </div>
    </div>
  );
}
