import { buildAdjList, cloneArray, cloneSet } from "./utils.js";

/**
 * Iterative DFS (stack).
 * Fields:
 * - stack: node ids
 * - current: node popped
 * - neighbor: neighbor being pushed
 * - visited: Set
 * - order: traversal order
 */
export function dfsSteps(graph, startId) {
  const adj = buildAdjList(graph);
  const steps = [];
  let id = 0;

  const visited = new Set();
  const stack = [];
  const order = [];

  const push = (line, desc, extra = {}) => {
    steps.push({
      id: id++,
      line,
      graph,
      visited: cloneSet(visited),
      stack: cloneArray(stack),
      order: cloneArray(order),
      current: extra.current ?? null,
      neighbor: extra.neighbor ?? null,
      vars: extra.vars ?? {},
      callStack: extra.callStack ?? ["dfs(graph, start)"],
      desc,
      question: extra.question ?? null,
    });
  };

  if (!adj.has(startId)) {
    push(0, `Start node "${startId}" not found in graph.`, { vars: { start: startId } });
    return steps;
  }

  push(0, `Initialize DFS from start node ${startId}.`, {
    vars: { start: startId },
    question: {
      prompt: "What data structure does DFS primarily use?",
      options: ["Queue", "Stack", "Heap", "Deque only"],
      correctIndex: 1,
    },
  });

  stack.push(startId);
  push(1, `Push ${startId} onto the stack.`, {
    vars: { stackSize: stack.length },
  });

  while (stack.length) {
    const u = stack.pop();
    push(2, `Pop ${u} from the stack.`, {
      current: u,
      vars: { current: u, stackSize: stack.length },
    });

    if (visited.has(u)) {
      push(3, `${u} was already visited. Skip.`, { current: u });
      continue;
    }

    visited.add(u);
    order.push(u);
    push(4, `Mark ${u} visited and add to order.`, {
      current: u,
      vars: { current: u, visitedSize: visited.size },
    });

    // For deterministic visualization, push neighbors in reverse sorted order
    // so the smallest neighbor is processed first when popped.
    const neighbors = (adj.get(u) || []).slice().sort().reverse();
    push(5, `Consider neighbors of ${u}: [${neighbors.slice().reverse().join(", ")}].`, {
      current: u,
      vars: { current: u, deg: neighbors.length },
    });

    for (const v of neighbors) {
      if (!visited.has(v)) {
        stack.push(v);
        push(6, `Push neighbor ${v} onto the stack.`, {
          current: u,
          neighbor: v,
          vars: { pushed: v, stackSize: stack.length },
          question: {
            prompt: "Why do we push neighbors onto a stack in DFS?",
            options: [
              "To explore nodes level by level",
              "To explore deeper before backtracking",
              "To always get the smallest node",
              "To compute shortest paths",
            ],
            correctIndex: 1,
          },
        });
      } else {
        push(6, `Neighbor ${v} is already visited. Do not push.`, {
          current: u,
          neighbor: v,
        });
      }
    }
  }

  push(7, `DFS done. Traversal order: ${order.join(" → ")}.`, {
    vars: { order: order.join("->") },
  });

  return steps;
}

export const dfsCode = {
  javascript: `function dfs(graph, start) {
  const adj = buildAdjList(graph);          // line 0
  const visited = new Set();               // line 1
  const stack = [start];                   // line 2
  const order = [];                        // line 3
  while (stack.length) {                   // line 4
    const u = stack.pop();                 // line 5
    if (visited.has(u)) continue;          // line 6
    visited.add(u);                        // line 7
    order.push(u);                         // line 8
    const nbrs = (adj.get(u) || []).slice().sort().reverse(); // line 9
    for (const v of nbrs) {                // line 10
      if (!visited.has(v)) stack.push(v);  // line 11
    }
  }
  return order;                            // line 12
}`,
  cpp: `vector<string> dfs(const Graph& g, string start){
  auto adj = g.adj();                      // line 0
  unordered_set<string> vis;              // line 1
  vector<string> st = {start};            // line 2
  vector<string> order;                   // line 3
  while(!st.empty()){                     // line 4
    auto u = st.back(); st.pop_back();    // line 5
    if(vis.count(u)) continue;            // line 6
    vis.insert(u);                        // line 7
    order.push_back(u);                   // line 8
    auto nbrs = adj[u];                   // line 9
    sort(nbrs.begin(), nbrs.end(), greater<string>()); // line 10
    for(auto &v: nbrs){                   // line 11
      if(!vis.count(v)) st.push_back(v);  // line 12
    }
  }
  return order;                            // line 13
}`,
  python: `def dfs(graph, start):
  adj = build_adj(graph)                   # line 0
  visited = set()                          # line 1
  stack = [start]                          # line 2
  order = []                               # line 3
  while stack:                             # line 4
    u = stack.pop()                        # line 5
    if u in visited:                       # line 6
      continue
    visited.add(u)                         # line 7
    order.append(u)                        # line 8
    nbrs = sorted(adj.get(u, []), reverse=True)  # line 9
    for v in nbrs:                         # line 10
      if v not in visited:                 # line 11
        stack.append(v)                    # line 12
  return order                             # line 13
`,
};
