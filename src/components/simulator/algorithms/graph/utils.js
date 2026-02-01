export function buildAdjList(graph) {
  const adj = new Map();
  for (const n of graph.nodes) adj.set(n.id, []);
  for (const e of graph.edges) {
    if (!adj.has(e.from)) adj.set(e.from, []);
    if (!adj.has(e.to)) adj.set(e.to, []);
    adj.get(e.from).push(e.to);
    if (!graph.directed) adj.get(e.to).push(e.from);
  }
  // stable order for deterministic steps
  for (const [k, list] of adj.entries()) list.sort();
  return adj;
}

export function cloneSet(s) {
  return new Set([...s]);
}

export function cloneArray(a) {
  return Array.isArray(a) ? [...a] : [];
}
