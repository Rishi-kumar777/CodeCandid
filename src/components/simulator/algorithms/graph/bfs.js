import { buildAdjList, cloneArray, cloneSet } from "./utils.js";

/**
 * BFS steps for Glass Box simulator.
 * Returns steps with fields helpful for a GraphVisualizer:
 * - graph: {nodes, edges, directed}
 * - visited: Set of visited node ids
 * - queue: array of node ids
 * - current: current node id being processed
 * - neighbor: neighbor id being considered
 * - order: traversal order array
 */
export function bfsSteps(graph, startId) {
  const adj = buildAdjList(graph);
  const steps = [];
  let id = 0;

  const visited = new Set();
  const queue = [];
  const order = [];

  const push = (line, desc, extra = {}) => {
    steps.push({
      id: id++,
      line,
      // graph snapshot (graph is immutable here; still include it for renderer)
      graph,
      visited: cloneSet(visited),
      queue: cloneArray(queue),
      order: cloneArray(order),
      current: extra.current ?? null,
      neighbor: extra.neighbor ?? null,
      // for your existing UI panels:
      vars: extra.vars ?? {},
      callStack: extra.callStack ?? ["bfs(graph, start)"],
      desc,
      question: extra.question ?? null,
    });
  };

  if (!adj.has(startId)) {
    push(0, `Start node "${startId}" not found in graph.`, {
      vars: { start: startId },
    });
    return steps;
  }

  push(0, `Initialize BFS from start node ${startId}.`, {
    vars: { start: startId },
    question: {
      prompt: "What data structure does BFS primarily use?",
      options: ["Stack", "Queue", "Heap", "HashMap"],
      correctIndex: 1,
    },
  });

  visited.add(startId);
  queue.push(startId);
  push(1, `Mark ${startId} visited and enqueue it.`, {
    vars: { start: startId, visitedSize: visited.size, queueSize: queue.length },
  });

  while (queue.length) {
    const u = queue.shift();
    order.push(u);

    push(2, `Dequeue ${u}. Add it to traversal order.`, {
      current: u,
      vars: { current: u, queueSize: queue.length, visitedSize: visited.size },
    });

    const neighbors = adj.get(u) || [];
    push(3, `Explore neighbors of ${u}: [${neighbors.join(", ")}].`, {
      current: u,
      vars: { current: u, deg: neighbors.length },
    });

    for (const v of neighbors) {
      push(4, `Check neighbor ${v} (visited? ${visited.has(v)}).`, {
        current: u,
        neighbor: v,
        vars: { current: u, neighbor: v },
        question: {
          prompt: `When BFS sees an unvisited neighbor, what should it do?`,
          options: [
            "Ignore it",
            "Mark visited and enqueue it",
            "Recursively call BFS on it",
            "Decrease its distance",
          ],
          correctIndex: 1,
        },
      });

      if (!visited.has(v)) {
        visited.add(v);
        queue.push(v);
        push(5, `Mark ${v} visited and enqueue it.`, {
          current: u,
          neighbor: v,
          vars: { enqueued: v, queueSize: queue.length, visitedSize: visited.size },
        });
      }
    }
  }

  push(6, `BFS done. Traversal order: ${order.join(" → ")}.`, {
    vars: { order: order.join("->") },
  });

  return steps;
}

export const bfsCode = {
  javascript: `function bfs(graph, start) {
  const adj = buildAdjList(graph);          // line 0
  const visited = new Set();               // line 1
  const q = [];                            // line 2
  visited.add(start);                      // line 3
  q.push(start);                           // line 4
  const order = [];                        // line 5
  while (q.length) {                       // line 6
    const u = q.shift();                   // line 7
    order.push(u);                         // line 8
    for (const v of adj.get(u) || []) {    // line 9
      if (!visited.has(v)) {               // line 10
        visited.add(v);                    // line 11
        q.push(v);                         // line 12
      }
    }
  }
  return order;                            // line 13
}`,
  cpp: `vector<string> bfs(const Graph& g, string start){
  auto adj = g.adj();                      // line 0
  unordered_set<string> vis;              // line 1
  queue<string> q;                         // line 2
  vis.insert(start);                       // line 3
  q.push(start);                           // line 4
  vector<string> order;                    // line 5
  while(!q.empty()){                       // line 6
    auto u = q.front(); q.pop();           // line 7
    order.push_back(u);                    // line 8
    for(auto v: adj[u]){                   // line 9
      if(!vis.count(v)){                   // line 10
        vis.insert(v);                     // line 11
        q.push(v);                         // line 12
      }
    }
  }
  return order;                            // line 13
}`,
  python: `from collections import deque

def bfs(graph, start):
  adj = build_adj(graph)                   # line 0
  visited = set()                          # line 1
  q = deque()                              # line 2
  visited.add(start)                       # line 3
  q.append(start)                          # line 4
  order = []                               # line 5
  while q:                                 # line 6
    u = q.popleft()                        # line 7
    order.append(u)                        # line 8
    for v in adj.get(u, []):               # line 9
      if v not in visited:                 # line 10
        visited.add(v)                     # line 11
        q.append(v)                        # line 12
  return order                             # line 13
`,
};
