export default function DPVisualizer({ show, step }) {
  const H = 380;

  if (!show) {
    return (
      <div className="h-full p-4 bg-white dark:bg-zinc-950">
        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Visualization</div>
        <div
          className="mt-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900
                     flex items-center justify-center text-sm text-zinc-500"
          style={{ height: H }}
        >
          Click “Build Steps” to start the visualization.
        </div>
      </div>
    );
  }

  const dp = step?.dp;
  const cursor = step?.cursor;
  const choice = step?.choice;

  if (!Array.isArray(dp) || dp.length === 0) {
    return (
      <div className="h-full p-4 bg-white dark:bg-zinc-950">
        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Visualization</div>
        <div
          className="mt-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900
                     flex items-center justify-center text-sm text-zinc-500"
          style={{ height: H }}
        >
          No DP table in this step.
        </div>
      </div>
    );
  }

  const rows = dp.length;
  const cols = dp[0].length;

  return (
    <div className="h-full p-4 bg-white dark:bg-zinc-950">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Visualization</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            DP Table ({rows} x {cols})
          </div>
        </div>

        {cursor && (
          <div className="text-xs px-2 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
            i={cursor.i}, w={cursor.w} {choice ? `• ${choice}` : ""}
          </div>
        )}
      </div>

      <div
        className="mt-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900
                   overflow-auto scrollbar-premium"
        style={{ height: H }}
      >
        <div className="p-3 inline-block">
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(46px, 1fr))` }}
          >
            {dp.flatMap((row, i) =>
              row.map((val, w) => {
                const isActive = cursor && cursor.i === i && cursor.w === w;
                const activeRing = isActive
                  ? choice === "take"
                    ? "ring-2 ring-emerald-500/60"
                    : choice === "skip"
                    ? "ring-2 ring-indigo-500/60"
                    : "ring-2 ring-cyan-500/60"
                  : "";
                return (
                  <div
                    key={`${i}-${w}`}
                    className={[
                      "rounded-lg border text-xs font-mono px-2 py-2 text-center transition",
                      "border-zinc-200 dark:border-zinc-800",
                      "bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100",
                      activeRing,
                      isActive ? "animate-pulse" : "",
                    ].join(" ")}
                    title={`dp[${i}][${w}] = ${val}${isActive ? ` • ${choice || "active"}` : ""}`}
                  >
                    {val}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
        Highlight: <span className="text-indigo-600 dark:text-indigo-400">skip</span> vs{" "}
        <span className="text-emerald-600 dark:text-emerald-400">take</span>
      </div>
    </div>
  );
}
