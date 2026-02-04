import { useEffect, useRef } from "react";

export function VariablesPanel({ vars }) {
  const entries = Object.entries(vars || {});

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 flex flex-col h-[260px]">
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
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 flex flex-col h-[260px]">
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

export function StackPanel({ stack }) {
  const items = Array.isArray(stack) ? stack : [];
  const hasItems = items.length > 0;
  const display = hasItems ? [...items].reverse() : [];

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 flex flex-col h-[260px]">
      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        Data Stack
      </div>
      <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
        Top element shown first
      </div>

      <div className="mt-3 flex-1 overflow-auto pr-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-3 font-mono text-xs space-y-1 scrollbar-premium">
        {!hasItems ? (
          <div className="text-sm text-zinc-500">—</div>
        ) : (
          display.map((item, i) => {
            const isTop = i === 0;
            const index = items.length - 1 - i;

            return (
              <div
                key={`${index}-${String(item)}`}
                className={[
                  "px-2 py-1 rounded-md border transition-colors",
                  isTop
                    ? "bg-cyan-100 text-cyan-900 border-cyan-200 dark:bg-cyan-900/40 dark:text-cyan-200 dark:border-cyan-800/60 font-semibold"
                    : "bg-white/60 text-zinc-700 border-zinc-200 dark:bg-zinc-950/40 dark:text-zinc-300 dark:border-zinc-800",
                ].join(" ")}
              >
                <span className="mr-2 text-[10px] text-zinc-400">#{index}</span>
                {String(item)}
                {isTop && (
                  <span className="ml-2 text-[10px] uppercase tracking-wide text-cyan-700 dark:text-cyan-300">
                    Top
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}




export function StepDescPanel({ log }) {
  const items = Array.isArray(log) ? log : [];
  const listRef = useRef(null);

  // ✅ Auto-scroll INSIDE the panel only (no page jump)
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [items.length]);

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 flex flex-col h-64">
      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        Step / Event Description
      </div>

      {/* ✅ This is the scroll container */}
      <div
        ref={listRef}
        className="mt-3 flex-1 overflow-auto pr-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-3 text-sm leading-relaxed scrollbar-premium"
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


