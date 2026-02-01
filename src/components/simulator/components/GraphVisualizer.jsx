export default function GraphVisualizer({ show, step }) {
  const CHART_H = 320;

  if (!show) {
    return (
      <div className="h-full p-4 bg-white dark:bg-zinc-950">
        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Visualization</div>
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

  if (!step?.graph) {
    return (
      <div className="h-full p-4 bg-white dark:bg-zinc-950">
        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Visualization</div>
        <div
          className="mt-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900
                     flex items-center justify-center text-sm text-zinc-500"
          style={{ height: CHART_H }}
        >
          No graph data in this step.
        </div>
      </div>
    );
  }

  const { graph, visited, current, neighbor, queue, stack, order } = step;
  const nodes = graph.nodes || [];
  const edges = graph.edges || [];
  const isDirected = !!graph.directed;

  const visitedSet = visited instanceof Set ? visited : new Set(visited || []);

  // Determine "active edge" during exploration
  const activeEdge =
    current && neighbor
      ? { from: current, to: neighbor }
      : null;

  const nodeById = new Map(nodes.map((n) => [n.id, n]));

  const edgeKey = (a, b) => (isDirected ? `${a}->${b}` : [a, b].sort().join("--"));
  const activeKey = activeEdge ? edgeKey(activeEdge.from, activeEdge.to) : null;

  return (
    <div className="h-full p-4 bg-white dark:bg-zinc-950">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Visualization</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Graph view (SVG)
          </div>
        </div>

        {/* Small status chips */}
        <div className="flex flex-wrap gap-2 text-xs">
          {queue && (
            <span className="px-2 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              Queue: {queue.join(", ")}
            </span>
          )}
          {stack && (
            <span className="px-2 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              Stack: {stack.join(", ")}
            </span>
          )}
          {order && (
            <span className="px-2 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              Order: {order.join(" → ")}
            </span>
          )}
        </div>
      </div>

      <div
        className="mt-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden"
        style={{ height: CHART_H }}
      >
        <svg width="100%" height="100%" viewBox="0 0 420 320">
          {/* edges */}
          {edges.map((e, idx) => {
            const a = nodeById.get(e.from);
            const b = nodeById.get(e.to);
            if (!a || !b) return null;

            const k = edgeKey(e.from, e.to);
            const isActive = activeKey && k === activeKey;

            return (
              <g key={idx}>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  strokeWidth="3"
                  className={
                    isActive
                      ? "stroke-emerald-500"
                      : "stroke-zinc-300 dark:stroke-zinc-700"
                  }
                />
                {/* (optional) arrowheads for directed graphs could be added later */}
              </g>
            );
          })}

          {/* nodes */}
          {nodes.map((n) => {
            const isVisited = visitedSet.has(n.id);
            const isCurrent = current === n.id;
            const isNeighbor = neighbor === n.id;

            const ring =
              isCurrent ? "stroke-indigo-500" : isNeighbor ? "stroke-emerald-500" : "stroke-zinc-300 dark:stroke-zinc-700";

            const fill =
              isCurrent
                ? "fill-indigo-500"
                : isVisited
                ? "fill-zinc-500 dark:fill-zinc-600"
                : "fill-white dark:fill-zinc-950";

            const text =
              isCurrent || isVisited ? "fill-white" : "fill-zinc-900 dark:fill-zinc-50";

            return (
              <g key={n.id}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="18"
                  className={`${fill} ${ring}`}
                  strokeWidth="3"
                />
                <text
                  x={n.x}
                  y={n.y + 5}
                  textAnchor="middle"
                  className={`${text} text-[12px] font-semibold`}
                >
                  {n.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
        Legend: <span className="text-indigo-600 dark:text-indigo-400">current</span>,{" "}
        <span className="text-zinc-600 dark:text-zinc-300">visited</span>,{" "}
        <span className="text-emerald-600 dark:text-emerald-400">neighbor/active edge</span>
      </div>
    </div>
  );
}
