// Step format (Glass Box):
// { id, line, array, i, j, swapped, comparing: [j, j+1], desc, question?: {prompt, options[], correctIndex} }

export function bubbleSortSteps(inputArr) {
  const a = [...inputArr];
  const steps = [];
  let id = 0;

  const push = (partial) => {
    steps.push({
      id: id++,
      line: partial.line ?? 0,
      array: [...a],
      i: partial.i ?? null,
      j: partial.j ?? null,
      swapped: partial.swapped ?? null,
      comparing: partial.comparing ?? null,
      desc: partial.desc ?? "",
      question: partial.question ?? null,
      vars: partial.vars ?? {},
      callStack: partial.callStack ?? ["bubbleSort(a)"],
    });
  };

  // line map for code highlighting (we'll keep these stable)
  // 1: for i
  // 2: for j
  // 3: if compare
  // 4: swap
  // 5: done
  push({
    line: 0,
    desc: "Start Bubble Sort. Array loaded.",
    vars: { n: a.length },
  });

  const n = a.length;
  for (let i = 0; i < n; i++) {
    push({
      line: 1,
      i,
      desc: `Outer loop i=${i}. We'll push the largest element to the end.`,
      vars: { n, i },
      question: {
        prompt: `At i=${i}, what is the goal of the outer loop pass?`,
        options: [
          "Move the smallest element to the beginning",
          "Move the largest remaining element to the end",
          "Reverse the array",
          "Remove duplicates",
        ],
        correctIndex: 1,
      },
    });

    for (let j = 0; j < n - i - 1; j++) {
      push({
        line: 2,
        i,
        j,
        comparing: [j, j + 1],
        desc: `Compare a[${j}]=${a[j]} and a[${j + 1}]=${a[j + 1]}.`,
        vars: { n, i, j, left: a[j], right: a[j + 1] },
        question: {
          prompt: `If a[${j}] > a[${j + 1}], what should happen next?`,
          options: ["Swap the elements", "Do nothing", "Break the loop", "The array becomes sorted instantly"],
          correctIndex: 0,
        },
      });

      if (a[j] > a[j + 1]) {
        push({
          line: 3,
          i,
          j,
          comparing: [j, j + 1],
          desc: `Condition is true (${a[j]} > ${a[j + 1]}). Perform a swap.`,
          vars: { n, i, j },
        });

        const temp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = temp;

        push({
          line: 4,
          i,
          j,
          swapped: [j, j + 1],
          desc: `Swapped indices ${j} and ${j + 1}.`,
          vars: { n, i, j },
          question: {
            prompt: `After swapping, which statement should now be true for this pair?`,
            options: [
              `a[${j}] <= a[${j + 1}]`,
              `a[${j}] is always > a[${j + 1}]`,
              "The entire array is fully sorted",
              "The outer loop index i is reset",
            ],
            correctIndex: 0,
          },
        });
      } else {
        push({
          line: 3,
          i,
          j,
          comparing: [j, j + 1],
          desc: `Condition is false (${a[j]} <= ${a[j + 1]}). No swap needed.`,
          vars: { n, i, j },
        });
      }
    }
  }

  push({
    line: 5,
    desc: "Done. Array sorted.",
    vars: { n },
  });

  return steps;
}

export const bubbleSortCode = {
  javascript: `function bubbleSort(a) {
  const n = a.length;                 // line 0
  for (let i = 0; i < n; i++) {       // line 1
    for (let j = 0; j < n - i - 1; j++) { // line 2
      if (a[j] > a[j+1]) {            // line 3
        [a[j], a[j+1]] = [a[j+1], a[j]];  // line 4
      }
    }
  }
  return a;                           // line 5
}`,
  cpp: `vector<int> bubbleSort(vector<int> a) {
  int n = (int)a.size();              // line 0
  for(int i=0;i<n;i++){               // line 1
    for(int j=0;j<n-i-1;j++){         // line 2
      if(a[j] > a[j+1]){              // line 3
        swap(a[j], a[j+1]);           // line 4
      }
    }
  }
  return a;                           // line 5
}`,
  python: `def bubble_sort(a):
  n = len(a)                          # line 0
  for i in range(n):                  # line 1
    for j in range(0, n-i-1):         # line 2
      if a[j] > a[j+1]:               # line 3
        a[j], a[j+1] = a[j+1], a[j]   # line 4
  return a                            # line 5
`,
};
