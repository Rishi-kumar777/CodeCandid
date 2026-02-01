export function selectionSortSteps(inputArr) {
  const a = [...inputArr];
  const steps = [];
  let id = 0;

  const push = (line, desc, extra = {}) => {
    steps.push({
      id: id++,
      line,
      array: [...a],
      comparing: extra.comparing ?? null,
      swapped: extra.swapped ?? null,
      question: extra.question ?? null,
      vars: extra.vars ?? {},
      callStack: ["selectionSort(a)"],
      desc,
    });
  };

  push(0, "Start Selection Sort.");

  const n = a.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;

    push(1, `Set minIdx = i (${i}).`, {
      vars: { n, i, minIdx },
      question: {
        prompt: `At the start of each outer iteration, what does minIdx represent?`,
        options: [
          "Index of the maximum element",
          "Index of the minimum element found so far",
          "Number of swaps performed",
          "Current sorted length",
        ],
        correctIndex: 1,
      },
    });

    for (let j = i + 1; j < n; j++) {
      push(2, `Compare current min a[minIdx]=${a[minIdx]} with a[${j}]=${a[j]}.`, {
        comparing: [minIdx, j],
        vars: { n, i, j, minIdx, currentMin: a[minIdx], candidate: a[j] },
      });

      if (a[j] < a[minIdx]) {
        minIdx = j;
        push(3, `Found new minimum at index ${minIdx} (value ${a[minIdx]}).`, {
          vars: { n, i, j, minIdx },
          question: {
            prompt: `When do we update minIdx in Selection Sort?`,
            options: [
              "When a[j] is greater than a[minIdx]",
              "When a[j] is smaller than a[minIdx]",
              "Every time j increments",
              "Only after swapping",
            ],
            correctIndex: 1,
          },
        });
      }
    }

    if (minIdx !== i) {
      push(4, `Swap a[i] with a[minIdx] (i=${i}, minIdx=${minIdx}).`, {
        swapped: [i, minIdx],
        vars: { n, i, minIdx },
      });

      [a[i], a[minIdx]] = [a[minIdx], a[i]];

      push(5, `Swapped. Position ${i} is now fixed.`, {
        swapped: [i, minIdx],
        vars: { n, i, minIdx },
      });
    } else {
      push(4, `No swap needed. Position ${i} already has the minimum.`, {
        vars: { n, i, minIdx },
      });
    }
  }

  push(6, "Done. Array sorted.");
  return steps;
}

export const selectionSortCode = {
  javascript: `function selectionSort(a) {
  const n = a.length;                 // line 0
  for (let i = 0; i < n; i++) {       // line 1
    let minIdx = i;                   // line 2
    for (let j = i + 1; j < n; j++) { // line 3
      if (a[j] < a[minIdx]) {         // line 4
        minIdx = j;                   // line 5
      }
    }
    if (minIdx !== i) {               // line 6
      [a[i], a[minIdx]] = [a[minIdx], a[i]]; // line 7
    }
  }
  return a;                           // line 8
}`,
  cpp: `vector<int> selectionSort(vector<int> a) {
  int n = (int)a.size();              // line 0
  for(int i=0;i<n;i++){               // line 1
    int minIdx = i;                   // line 2
    for(int j=i+1;j<n;j++){           // line 3
      if(a[j] < a[minIdx]){           // line 4
        minIdx = j;                   // line 5
      }
    }
    if(minIdx != i){                  // line 6
      swap(a[i], a[minIdx]);          // line 7
    }
  }
  return a;                           // line 8
}`,
  python: `def selection_sort(a):
  n = len(a)                          # line 0
  for i in range(n):                  # line 1
    min_idx = i                       # line 2
    for j in range(i+1, n):           # line 3
      if a[j] < a[min_idx]:           # line 4
        min_idx = j                   # line 5
    if min_idx != i:                  # line 6
      a[i], a[min_idx] = a[min_idx], a[i]  # line 7
  return a                            # line 8
`,
};
