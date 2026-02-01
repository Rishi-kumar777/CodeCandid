export const ALGO_META = {
    bubbleSort: {
        name: "Bubble Sort",
        type: "Array / Sorting",
        time: {
            best: "O(n) (with early-exit optimization)",
            average: "O(n²)",
            worst: "O(n²)",
        },
        space: "O(1) extra space",
        stable: "Yes (stable)",
        inPlace: "Yes (in-place)",
        applications: [
            "Educational tool to demonstrate swaps and comparisons",
            "Works for very small arrays or nearly-sorted data (with early-exit)",
        ],
        facts: [
            "Repeatedly swaps adjacent out-of-order elements.",
            "After each pass, the largest element 'bubbles' to the end.",
        ],
    },

    selectionSort: {
        name: "Selection Sort",
        type: "Array / Sorting",
        time: {
            best: "O(n²)",
            average: "O(n²)",
            worst: "O(n²)",
        },
        space: "O(1) extra space",
        stable: "No (not stable by default)",
        inPlace: "Yes (in-place)",
        applications: [
            "Useful when memory writes are expensive (few swaps)",
            "Educational tool for greedy selection of minimum",
        ],
        facts: [
            "Performs exactly n−1 swaps in the typical implementation.",
            "Always scans the remaining unsorted portion to find the minimum.",
        ],
    },

    insertionSort: {
        name: "Insertion Sort",
        type: "Array / Sorting",
        time: {
            best: "O(n) (already sorted)",
            average: "O(n²)",
            worst: "O(n²) (reverse sorted)",
        },
        space: "O(1) extra space",
        stable: "Yes (stable)",
        inPlace: "Yes (in-place)",
        applications: [
            "Very good for small arrays",
            "Used as a base-case in hybrid sorts (e.g., TimSort / IntroSort variants)",
            "Works great on nearly-sorted inputs",
        ],
        facts: [
            "Builds a sorted prefix by inserting each element into its correct position.",
            "Shifts elements instead of swapping repeatedly.",
        ],
    },

    mergeSort: {
        name: "Merge Sort",
        type: "Array / Sorting",
        time: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n log n)",
        },
        space: "O(n) (temporary arrays during merge)",
        stable: "Yes (stable)",
        inPlace: "No",
        applications: [
            "External sorting (large datasets stored on disk)",
            "When stable sorting is required with guaranteed O(n log n) time",
            "Sorting linked lists efficiently",
        ],
        facts: [
            "Divide-and-conquer: split into halves, sort recursively, then merge.",
            "Stable by nature when merging uses <= for left side.",
            "Often used as a building block for more advanced sorting techniques.",
        ],
    },


    bfs: {
        name: "Breadth-First Search (BFS)",
        type: "Graph / Traversal",
        time: {
            best: "O(V + E)",
            average: "O(V + E)",
            worst: "O(V + E)",
        },
        space: "O(V) (queue + visited set)",
        stable: "N/A",
        inPlace: "N/A",
        applications: [
            "Shortest path in unweighted graphs",
            "Level-order traversal in trees",
            "Finding connected components (with repeated BFS)",
        ],
        facts: [
            "Explores neighbors level by level using a queue.",
            "Guarantees the shortest number of edges from the start node in unweighted graphs.",
        ],
    },

    dfs: {
        name: "Depth-First Search (DFS)",
        type: "Graph / Traversal",
        time: {
            best: "O(V + E)",
            average: "O(V + E)",
            worst: "O(V + E)",
        },
        space: "O(V) (stack/recursion + visited set)",
        stable: "N/A",
        inPlace: "N/A",
        applications: [
            "Topological sorting (DAG)",
            "Cycle detection",
            "Finding connected components",
            "Backtracking-style problems (maze, puzzles)",
        ],
        facts: [
            "Explores as deep as possible before backtracking.",
            "Can be implemented using recursion or an explicit stack.",
        ],
    },

    knapsack01: {
        name: "0/1 Knapsack (DP Tabulation)",
        type: "Dynamic Programming",
        time: {
            best: "O(n·W)",
            average: "O(n·W)",
            worst: "O(n·W)",
        },
        space: "O(n·W) (DP table)",
        stable: "N/A",
        inPlace: "N/A",
        applications: [
            "Budget-limited selection problems (maximize value within capacity)",
            "Resource allocation under constraints",
            "Used as a base model for many optimization problems",
        ],
        facts: [
            "Each item can be chosen at most once (0/1 choice).",
            "State: dp[i][w] = best value using first i items with capacity w.",
            "Transition: dp[i][w] = max(dp[i−1][w], value[i] + dp[i−1][w−weight[i]]) when weight[i] ≤ w.",
        ],
    },

};
