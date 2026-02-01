export default function TopControls({
  language,
  setLanguage,
  algorithm,
  setAlgorithm,
  n,
  setN,
  randMax,
  setRandMax,
  onGenerateRandom,
  onLoadExample,
}) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 pt-4">
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          <div className="md:col-span-2">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Code Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-1 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 
           bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100
           px-3 py-2 text-sm outline-none
           focus:ring-2 focus:ring-indigo-500/40"
            >
              <option value="javascript">JavaScript</option>
              <option value="cpp">C++</option>
              <option value="python">Python</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Algorithm</label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="mt-1 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 
           bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100
           px-3 py-2 text-sm outline-none
           focus:ring-2 focus:ring-indigo-500/40"
            >
              <option value="bubbleSort">Bubble Sort</option>
              <option value="selectionSort">Selection Sort</option>
              <option value="insertionSort">Insertion Sort</option>
              <option value="mergeSort">Merge Sort</option>
              <option value="bfs">BFS</option>
              <option value="dfs">DFS</option>
              <option value="knapsack01">0/1 Knapsack (DP)</option>
              {/* Add more later */}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Input Size (N)</label>
            <input
              type="number"
              min={2}
              max={40}
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Random Max</label>
            <input
              type="number"
              min={5}
              max={999}
              value={randMax}
              onChange={(e) => setRandMax(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm"
            />
          </div>

          <div className="md:col-span-3 flex gap-3">
            <button
              onClick={onGenerateRandom}
              className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 text-sm transition"
            >
              Generate Random
            </button>
            <button
              onClick={onLoadExample}
              className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 px-4 py-2 text-sm transition"
            >
              Load Example
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
