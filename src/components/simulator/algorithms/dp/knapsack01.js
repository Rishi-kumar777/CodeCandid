function clone2D(dp) {
  return dp.map((row) => row.slice());
}

/**
 * 0/1 Knapsack tabulation steps
 * input = { weights: number[], values: number[], W: number }
 *
 * Step payload for DPVisualizer:
 * - dp: 2D array
 * - cursor: { i, w }
 * - choice: "skip" | "take" | "init"
 */
export function knapsack01Steps(input) {
  const weights = input?.weights || [];
  const values = input?.values || [];
  const W = Number.isFinite(input?.W) ? input.W : 0;

  const n = Math.min(weights.length, values.length);
  const steps = [];
  let id = 0;

  // dp[i][w] = max value using first i items with capacity w
  const dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));

  const push = (line, desc, extra = {}) => {
    steps.push({
      id: id++,
      line,
      desc,
      vars: extra.vars ?? {},
      callStack: extra.callStack ?? ["knapsack01(weights, values, W)"],
      question: extra.question ?? null,

      // DP visual payload:
      dp: clone2D(dp),
      cursor: extra.cursor ?? null,
      choice: extra.choice ?? null,
    });
  };

  if (n === 0 || W <= 0) {
    push(0, "Invalid input: no items or capacity is 0.", { vars: { n, W } });
    return steps;
    }

  push(0, `Initialize DP table of size (n+1) x (W+1) = ${n + 1} x ${W + 1}.`, {
    vars: { n, W },
    choice: "init",
    question: {
      prompt: "What does dp[i][w] represent in 0/1 Knapsack tabulation?",
      options: [
        "Minimum weight to get value w using i items",
        "Maximum value achievable using first i items within capacity w",
        "Number of ways to reach weight w",
        "Whether weight w is reachable",
      ],
      correctIndex: 1,
    },
  });

  for (let i = 1; i <= n; i++) {
    const wt = weights[i - 1];
    const val = values[i - 1];

    push(1, `Process item ${i} (weight=${wt}, value=${val}).`, {
      vars: { i, wt, val, W },
    });

    for (let w = 0; w <= W; w++) {
      // option1: skip item
      const skip = dp[i - 1][w];

      push(2, `Consider capacity w=${w}. Start with skip = dp[i-1][w] = ${skip}.`, {
        cursor: { i, w },
        choice: "skip",
        vars: { i, w, wt, val, skip },
      });

      let take = -Infinity;
      if (wt <= w) {
        take = val + dp[i - 1][w - wt];

        push(3, `Try take: value + dp[i-1][w-wt] = ${val} + dp[${i - 1}][${w - wt}] = ${take}.`, {
          cursor: { i, w },
          choice: "take",
          vars: { i, w, wt, val, take },
          question: {
            prompt: "When is the 'take' option valid?",
            options: [
              "Always valid",
              "Only if wt <= w",
              "Only if val is positive",
              "Only when dp[i-1][w] is 0",
            ],
            correctIndex: 1,
          },
        });

        dp[i][w] = Math.max(skip, take);
        push(4, `Set dp[${i}][${w}] = max(skip=${skip}, take=${take}) = ${dp[i][w]}.`, {
          cursor: { i, w },
          choice: dp[i][w] === take ? "take" : "skip",
          vars: { i, w, wt, val, skip, take, dp: dp[i][w] },
        });
      } else {
        dp[i][w] = skip;
        push(4, `wt=${wt} > w=${w}. Cannot take. dp[${i}][${w}] = skip = ${skip}.`, {
          cursor: { i, w },
          choice: "skip",
          vars: { i, w, wt, val, dp: dp[i][w] },
        });
      }
    }
  }

  push(5, `Done. Answer = dp[n][W] = dp[${n}][${W}] = ${dp[n][W]}.`, {
    vars: { n, W, answer: dp[n][W] },
  });

  return steps;
}

export const knapsack01Code = {
  javascript: `function knapsack01(weights, values, W) {
  const n = weights.length;                  // line 0
  const dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0)); // line 1
  for (let i = 1; i <= n; i++) {             // line 2
    const wt = weights[i - 1];               // line 3
    const val = values[i - 1];               // line 4
    for (let w = 0; w <= W; w++) {           // line 5
      const skip = dp[i - 1][w];             // line 6
      let best = skip;                       // line 7
      if (wt <= w) {                         // line 8
        const take = val + dp[i - 1][w - wt];// line 9
        best = Math.max(skip, take);         // line 10
      }
      dp[i][w] = best;                       // line 11
    }
  }
  return dp[n][W];                           // line 12
}`,
  cpp: `int knapsack01(vector<int>& wt, vector<int>& val, int W) {
  int n = (int)wt.size();                    // line 0
  vector<vector<int>> dp(n+1, vector<int>(W+1, 0)); // line 1
  for(int i=1;i<=n;i++){                     // line 2
    int wti = wt[i-1];                       // line 3
    int vali = val[i-1];                     // line 4
    for(int w=0;w<=W;w++){                   // line 5
      int skip = dp[i-1][w];                 // line 6
      int best = skip;                       // line 7
      if(wti <= w){                          // line 8
        int take = vali + dp[i-1][w-wti];    // line 9
        best = max(skip, take);              // line 10
      }
      dp[i][w] = best;                       // line 11
    }
  }
  return dp[n][W];                           // line 12
}`,
  python: `def knapsack01(weights, values, W):
  n = len(weights)                           # line 0
  dp = [[0]*(W+1) for _ in range(n+1)]       # line 1
  for i in range(1, n+1):                    # line 2
    wt = weights[i-1]                        # line 3
    val = values[i-1]                        # line 4
    for w in range(W+1):                     # line 5
      skip = dp[i-1][w]                      # line 6
      best = skip                            # line 7
      if wt <= w:                            # line 8
        take = val + dp[i-1][w-wt]           # line 9
        best = max(skip, take)               # line 10
      dp[i][w] = best                        # line 11
  return dp[n][W]                            # line 12
`,
};
