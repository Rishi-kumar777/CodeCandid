export default function Visualizer({ show, arr, comparing, swapped, pointers = [] }) {
  const CHART_H = 320;

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

  const pointerMap = new Map();
  (Array.isArray(pointers) ? pointers : []).forEach((p) => {
    if (!Number.isFinite(p?.index)) return;
    if (!pointerMap.has(p.index)) pointerMap.set(p.index, []);
    pointerMap.get(p.index).push(p);
  });

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
          const barH = Math.max(8, Math.round((v / max) * (CHART_H - 80)));
          const labels = pointerMap.get(idx) || [];

          const roleText = [
            isSwapped ? "swap" : null,
            isComparing ? "compare" : null,
            labels.length ? labels.map((l) => l.label).join(", ") : null,
          ]
            .filter(Boolean)
            .join(" • ");

          return (
            <div key={idx} className="flex-1 flex flex-col items-center justify-end gap-1">
              {labels.length > 0 && (
                <div className="flex flex-col items-center gap-1 mb-1">
                  {labels.map((p) => (
                    <div
                      key={`${p.label}-${idx}`}
                      className={[
                        "text-[10px] px-2 py-0.5 rounded-full border",
                        p.className || "border-white/10 text-white/80 bg-white/10",
                      ].join(" ")}
                      title={`${p.label} = ${idx}`}
                    >
                      {p.label}
                    </div>
                  ))}
                </div>
              )}

              <div
                className={[
                  "w-full rounded-lg transition-all duration-300",
                  isSwapped
                    ? "sim-swap"
                    : isComparing
                    ? "sim-compare"
                    : "sim-bar-base",
                ].join(" ")}
                style={{ height: `${barH}px` }}
                title={`Index ${idx} • Value ${v}${roleText ? ` • ${roleText}` : ""}`}
              />
              <div className="text-[10px] text-zinc-600 dark:text-zinc-300">
                {v}
              </div>
              <div className="text-[9px] text-zinc-500 dark:text-zinc-400">
                {idx}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
