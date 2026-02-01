import { useEffect, useRef, useState } from "react";

export default function ResizableSplit({
  left,
  right,
  minLeft = 240,
  minRight = 320,
  initialLeftPct = 55,
}) {
  const containerRef = useRef(null);
  const [leftPct, setLeftPct] = useState(initialLeftPct);
  const draggingRef = useRef(false);

  useEffect(() => {
    const onMove = (e) => {
      if (!draggingRef.current) return;
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const total = rect.width;

      const leftPx = Math.max(minLeft, Math.min(x, total - minRight));
      setLeftPct((leftPx / total) * 100);
    };

    const onUp = () => {
      draggingRef.current = false;
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [minLeft, minRight]);

  const onDown = () => {
    draggingRef.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  return (
    <div ref={containerRef} className="flex w-full h-full rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
      <div className="h-full" style={{ width: `${leftPct}%` }}>
        {left}
      </div>

      <div
        onMouseDown={onDown}
        className="w-2 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-col-resize relative"
        title="Drag to resize"
      >
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-zinc-300 dark:bg-zinc-700" />
      </div>

      <div className="h-full flex-1 min-w-[320px]">
        {right}
      </div>
    </div>
  );
}
