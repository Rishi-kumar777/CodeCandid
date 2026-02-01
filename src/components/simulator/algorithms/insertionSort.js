export function insertionSortSteps(inputArr) {
  const a = [...inputArr];
  const steps = [];
  let id = 0;

  const push = (line, desc, extra = {}) => {
    steps.push({
      id: id++,
      line,
      array: [...a],
      comparing: extra.comparing ?? null,
      swapped: extra.swapped ?? null, // we use swapped to highlight shifts too
      question: extra.question ?? null,
      vars: extra.vars ?? {},
      callStack: ["insertionSort(a)"],
      desc,
    });
  };

  push(0, "Start Insertion Sort.");

  const n = a.length;
  for (let i = 1; i < n; i++) {
    const key = a[i];
    let j = i - 1;

    push(1, `Pick key = a[${i}] = ${key}.`, {
      vars: { n, i, key, j },
      question: {
        prompt: "In Insertion Sort, what does `key` represent?",
        options: [
          "The current element to insert into the sorted prefix",
          "The maximum element in the array",
          "The swap counter",
          "The pivot element for partition",
        ],
        correctIndex: 0,
      },
    });

    // shift elements to the right until the correct position is found
    while (j >= 0 && a[j] > key) {
      push(2, `a[${j}] = ${a[j]} > key = ${key}. Shift a[${j}] to the right.`, {
        comparing: [j, j + 1],
        swapped: [j, j + 1],
        vars: { n, i, key, j, left: a[j] },
      });

      a[j + 1] = a[j];
      j--;

      push(3, `Shift done. Decrement j -> ${j}.`, {
        vars: { n, i, key, j },
      });
    }

    a[j + 1] = key;

    push(4, `Insert key (${key}) at position ${j + 1}.`, {
      swapped: [j + 1],
      vars: { n, i, key, j },
      question: {
        prompt: "When does the inner while-loop stop in Insertion Sort?",
        options: [
          "When a[j] is still greater than key",
          "When j becomes negative or a[j] <= key",
          "Only when the array is fully sorted",
          "Only after swapping adjacent elements",
        ],
        correctIndex: 1,
      },
    });
  }

  push(5, "Done. Array sorted.");
  return steps;
}

export const insertionSortCode = {
  javascript: `function insertionSort(a) {
  const n = a.length;                 // line 0
  for (let i = 1; i < n; i++) {       // line 1
    const key = a[i];                 // line 2
    let j = i - 1;                    // line 3
    while (j >= 0 && a[j] > key) {    // line 4
      a[j + 1] = a[j];                // line 5
      j--;                            // line 6
    }
    a[j + 1] = key;                   // line 7
  }
  return a;                           // line 8
}`,
  cpp: `vector<int> insertionSort(vector<int> a) {
  int n = (int)a.size();              // line 0
  for(int i=1;i<n;i++){               // line 1
    int key = a[i];                   // line 2
    int j = i - 1;                    // line 3
    while(j >= 0 && a[j] > key){      // line 4
      a[j+1] = a[j];                  // line 5
      j--;                            // line 6
    }
    a[j+1] = key;                     // line 7
  }
  return a;                           // line 8
}`,
  python: `def insertion_sort(a):
  n = len(a)                          # line 0
  for i in range(1, n):               # line 1
    key = a[i]                        # line 2
    j = i - 1                         # line 3
    while j >= 0 and a[j] > key:      # line 4
      a[j+1] = a[j]                   # line 5
      j -= 1                          # line 6
    a[j+1] = key                      # line 7
  return a                            # line 8
`,
};
