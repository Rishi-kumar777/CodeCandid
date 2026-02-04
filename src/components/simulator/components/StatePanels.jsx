import { useEffect, useRef } from "react";

export function VariablesPanel({ vars }) {
  const entries = Object.entries(vars || {});

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 flex flex-col h-[400px]">
      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        Variables
      </div>

      <div className="mt-3 flex-1 overflow-auto pr-1 space-y-2 scrollbar-premium">
        {entries.length === 0 ? (
          <div className="text-sm text-zinc-500">—</div>
        ) : (
          entries.map(([k, v]) => (
            <div
              key={k}
              className="flex items-center justify-between rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-2"
            >
              <div className="text-xs text-zinc-500">{k}</div>
              <div className="text-xs font-mono text-zinc-900 dark:text-zinc-50">
                {String(v)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function CallStackPanel({ stack }) {
  const s = stack?.length ? stack : ["—"];
  const activeIndex = s.length - 1; // 👈 currently executing function

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 flex flex-col h-[400px]">
      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        Call Stack
      </div>

      <div className="mt-3 flex-1 overflow-auto pr-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-3 font-mono text-xs space-y-1 scrollbar-premium">
        {s.map((frame, i) => {
          const isActive = i === activeIndex;

          return (
            <div
              key={i}
              className={[
                "px-2 py-1 rounded-md transition-colors",
                isActive
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-semibold"
                  : "text-zinc-700 dark:text-zinc-400",
              ].join(" ")}
            >
              {frame}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function StepDescPanel({ log, invariants }) {
  const items = Array.isArray(log) ? log : [];
  const listRef = useRef(null);

  // ✅ Auto-scroll INSIDE the panel only (no page jump)
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [items.length]);

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 flex flex-col h-[400px]">
      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        Step Insights
      </div>

      <div className="mt-3 space-y-2">

        {Array.isArray(invariants) && invariants.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {invariants.map((inv, idx) => (
              <span
                key={`${inv}-${idx}`}
                className="text-[11px] px-2 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-700 dark:text-cyan-200"
                title="Invariant / focus cue"
              >
                {inv}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ✅ This is the scroll container */}
      <div
        ref={listRef}
        className="mt-3 flex-1 overflow-auto pr-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 text-sm leading-relaxed scrollbar-premium"
      >
        {items.length === 0 ? (
          <div className="text-zinc-500">Click “Build Steps” to start logging events.</div>
        ) : (
          <div className="event-log space-y-2">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className={["event-item", item.isNew ? "event-new" : ""].join(" ")}
              >
                <span className="mr-2 text-xs text-zinc-400">#{idx + 1}</span>
                {item.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
