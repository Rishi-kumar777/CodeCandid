

import { useMemo, useRef, useState } from "react";

const INITIAL_MESSAGE = {
  role: "assistant",
  content: "Hi! Ask me about the current algorithm, the step you're on, or the code.",
};

export default function ChatbotPanel({
  algorithm,
  language,
  step,
  code,
  mentorMode,
  mentorLocked,
  mentorFeedback,
  mentorQuestion,
}) {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [isOpen, setIsOpen] = useState(false);
  const endRef = useRef(null);

  const context = useMemo(() => {
    const desc = step?.desc ? String(step.desc).trim() : "";
    const line = Number.isFinite(step?.line) ? step.line : null;
    const snippet = typeof code === "string" ? code.slice(0, 1600) : "";
    return {
      algorithm: algorithm || "",
      language: language || "",
      stepDesc: desc,
      stepLine: line,
      codeSnippet: snippet,
      mentorMode: Boolean(mentorMode),
      mentorLocked: Boolean(mentorLocked),
      mentorFeedback: mentorFeedback?.text || "",
      mentorQuestion: mentorQuestion?.prompt || "",
      mentorOptions: mentorQuestion?.options || [],
      mentorAnswerIndex: Number.isFinite(mentorQuestion?.correctIndex)
        ? mentorQuestion.correctIndex
        : null,
    };
  }, [algorithm, language, step, code, mentorMode, mentorLocked, mentorFeedback, mentorQuestion]);

  const scrollToEnd = () => {
    requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || status === "sending") return;

    const nextMessages = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(nextMessages);
    setInput("");
    setStatus("sending");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, context }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed");
      }

      const data = await res.json();
      const reply = data?.text?.trim() || "Sorry, I didn't get a response.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setStatus("idle");
      scrollToEnd();
    } catch (err) {
      setStatus("error");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Try again." },
      ]);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-cyan-600/90 hover:bg-cyan-500 text-white px-5 py-3 text-sm shadow-[0_12px_30px_rgba(8,145,178,0.35)] ring-1 ring-white/10 transition active:scale-[0.98]"
      >
        {isOpen ? "Close Chat" : "Candid AI"}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-[360px] max-w-[92vw] rounded-3xl border border-white/10 dark:border-zinc-200/70 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 dark:from-white dark:via-zinc-100 dark:to-white p-4 flex flex-col h-[440px] shadow-2xl shadow-black/40 dark:shadow-black/10 text-white dark:text-zinc-900 ring-1 ring-white/5 dark:ring-zinc-200/60">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold tracking-wide">Candid AI</div>
              <div className="text-[11px] text-white/60 dark:text-zinc-500 mt-0.5">
                ask anything about the algorithm
              </div>
            </div>
            <div
              className={`text-[10px] px-2 py-1 rounded-full ${
                mentorMode
                  ? "bg-amber-400/20 text-amber-300 dark:bg-amber-500/20 dark:text-amber-700"
                  : "bg-emerald-400/20 text-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-700"
              }`}
            >
              {mentorMode ? "Mentor" : "Standard"}
            </div>
          </div>

          <div className="mt-3 flex-1 overflow-auto space-y-2 pr-1 text-sm rounded-2xl border border-white/5 dark:border-zinc-200/60 bg-white/5 dark:bg-white/70 p-3 shadow-inner shadow-black/30 dark:shadow-black/0">
            {messages.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[90%] rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white px-3 py-2 shadow-md shadow-cyan-500/20 border border-white/10"
                    : "mr-auto max-w-[90%] rounded-2xl bg-white/90 text-zinc-900 dark:bg-zinc-900/90 dark:text-zinc-100 px-3 py-2 shadow-sm border border-white/20 dark:border-zinc-800"
                }
              >
                {m.content}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-2xl border border-white/10 dark:border-zinc-200/70 bg-white/5 dark:bg-white/70 p-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={2}
              placeholder="Ask about this step..."
              className="flex-1 resize-none rounded-xl border border-white/10 dark:border-zinc-200/70 bg-transparent px-3 py-2 text-sm text-white dark:text-zinc-900 placeholder:text-white/40 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
            />
            <button
              onClick={sendMessage}
              disabled={status === "sending"}
              className="rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 text-sm transition shadow-md shadow-cyan-500/30 disabled:opacity-50 disabled:shadow-none active:scale-[0.98]"
            >
              {status === "sending" ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
