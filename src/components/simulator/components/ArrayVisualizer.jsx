export default function Visualizer({ show, arr, comparing, swapped }) {
  const CHART_H = 260;

  // If steps are not built yet, show placeholder
  if (!show) {
    return (
      <div className="h-full p-4 bg-white dark:bg-zinc-950">
        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Visualization
        </div>
        <div
          className="mt-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900
                     flex items-center justify-center text-sm text-zinc-500"
          style={{ height: CHART_H }}
        >
          Click “Build Steps” to start the visualization.
        </div>
      </div>
    );
  }

  const safeArr = Array.isArray(arr) ? arr : [];

  if (safeArr.length === 0) {
    return (
      <div className="h-full p-4 bg-white dark:bg-zinc-950">
        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Visualization
        </div>
        <div
          className="mt-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900
                     flex items-center justify-center text-sm text-zinc-500"
          style={{ height: CHART_H }}
        >
          No data to visualize.
        </div>
      </div>
    );
  }

  const max = Math.max(1, ...safeArr);

  return (
    <div className="h-full p-4 bg-white dark:bg-zinc-950">
      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        Visualization
      </div>
      <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
        Bars represent array values
      </div>

      <div
        className="mt-4 flex items-end gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800
                   bg-zinc-50 dark:bg-zinc-900 p-3 overflow-hidden"
        style={{ height: CHART_H }}
      >
        {safeArr.map((v, idx) => {
          const isComparing = comparing?.includes(idx);
          const isSwapped = swapped?.includes(idx);
          const barH = Math.max(8, Math.round((v / max) * (CHART_H - 40)));

          return (
            <div key={idx} className="flex-1 flex flex-col items-center justify-end gap-1">
              <div
                className={[
                  "w-full rounded-lg transition-all duration-300",
                  isSwapped
                    ? "bg-amber-500"
                    : isComparing
                    ? "bg-indigo-500"
                    : "bg-zinc-400 dark:bg-zinc-700",
                ].join(" ")}
                style={{ height: `${barH}px` }}
                title={`${v}`}
              />
              <div className="text-[10px] text-zinc-600 dark:text-zinc-300">
                {v}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
