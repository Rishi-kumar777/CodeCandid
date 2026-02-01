// src/algorithms/mergeSort.js

function clone(arr) {
  return arr.slice();
}

export function mergeSortSteps(inputArr) {
  const a = clone(inputArr);
  const steps = [];
  let id = 0;

  const push = ({
    line = -1,
    desc = "",
    vars = {},
    callStack = ["mergeSort(arr)"],
    array = a,
    comparing = null,
    swapped = null,
    question = null,
  }) => {
    steps.push({
      id: id++,
      line,
      desc,
      vars,
      callStack,
      array: clone(array),
      comparing,
      swapped,
      question,
    });
  };

  if (!Array.isArray(inputArr) || inputArr.length === 0) {
    push({ line: 0, desc: "Input is empty. Nothing to sort.", vars: { n: 0 } });
    return steps;
  }

  push({
    line: 0,
    desc: "Start Merge Sort using divide-and-conquer.",
    vars: { n: a.length },
    question: {
      prompt: "What is the core idea of Merge Sort?",
      options: [
        "Repeatedly swap adjacent elements",
        "Divide the array into halves and merge sorted halves",
        "Pick a pivot and partition",
        "Select minimum element and place it first",
      ],
      correctIndex: 1,
    },
  });

  const callStack = ["mergeSort(arr)"];

  function merge(l, m, r) {
    // Copy left and right
    const left = a.slice(l, m + 1);
    const right = a.slice(m + 1, r + 1);

    push({
      line: 12,
      desc: `Create left=[${left.join(", ")}], right=[${right.join(", ")}] for range [${l}..${r}].`,
      vars: { l, m, r, leftLen: left.length, rightLen: right.length },
      callStack: [...callStack, `merge(l=${l}, m=${m}, r=${r})`],
    });

    let i = 0,
      j = 0,
      k = l;

    push({
      line: 16,
      desc: `Initialize pointers i=0, j=0, k=${l}.`,
      vars: { l, m, r, i, j, k },
      callStack: [...callStack, `merge(l=${l}, m=${m}, r=${r})`],
    });

    while (i < left.length && j < right.length) {
      // compare left[i] and right[j]
      push({
        line: 18,
        desc: `Compare left[i]=${left[i]} and right[j]=${right[j]}.`,
        vars: { l, m, r, i, j, k, left_i: left[i], right_j: right[j] },
        comparing: [k], // highlight write position (more meaningful visually)
        callStack: [...callStack, `merge(l=${l}, m=${m}, r=${r})`],
      });

      if (left[i] <= right[j]) {
        a[k] = left[i];

        push({
          line: 20,
          desc: `Place left[i]=${left[i]} into arr[k] (k=${k}).`,
          vars: { l, m, r, i, j, k, chosen: "left" },
          swapped: [k],
          callStack: [...callStack, `merge(l=${l}, m=${m}, r=${r})`],
        });

        i++;
        k++;
      } else {
        a[k] = right[j];

        push({
          line: 23,
          desc: `Place right[j]=${right[j]} into arr[k] (k=${k}).`,
          vars: { l, m, r, i, j, k, chosen: "right" },
          swapped: [k],
          callStack: [...callStack, `merge(l=${l}, m=${m}, r=${r})`],
        });

        j++;
        k++;
      }
    }

    // Copy remaining left
    while (i < left.length) {
      a[k] = left[i];
      push({
        line: 28,
        desc: `Copy remaining left[i]=${left[i]} into arr[k] (k=${k}).`,
        vars: { l, m, r, i, j, k },
        swapped: [k],
        callStack: [...callStack, `merge(l=${l}, m=${m}, r=${r})`],
      });
      i++;
      k++;
    }

    // Copy remaining right
    while (j < right.length) {
      a[k] = right[j];
      push({
        line: 33,
        desc: `Copy remaining right[j]=${right[j]} into arr[k] (k=${k}).`,
        vars: { l, m, r, i, j, k },
        swapped: [k],
        callStack: [...callStack, `merge(l=${l}, m=${m}, r=${r})`],
      });
      j++;
      k++;
    }

    push({
      line: 36,
      desc: `Merged range [${l}..${r}] is now sorted.`,
      vars: { l, m, r },
      callStack: [...callStack, `merge(l=${l}, m=${m}, r=${r})`],
      question: {
        prompt: "Why does Merge Sort need extra space?",
        options: [
          "To store recursion stack only",
          "To store temporary left/right arrays during merge",
          "Because it swaps too much",
          "Because it uses hashing",
        ],
        correctIndex: 1,
      },
    });
  }

  function sort(l, r) {
    callStack.push(`sort(l=${l}, r=${r})`);

    push({
      line: 2,
      desc: `Sort range [${l}..${r}].`,
      vars: { l, r },
      callStack: [...callStack],
    });

    if (l >= r) {
      push({
        line: 3,
        desc: `Base case reached for [${l}..${r}].`,
        vars: { l, r },
        callStack: [...callStack],
      });
      callStack.pop();
      return;
    }

    const m = Math.floor((l + r) / 2);

    push({
      line: 6,
      desc: `Compute mid m=${m}. Split into [${l}..${m}] and [${m + 1}..${r}].`,
      vars: { l, m, r },
      callStack: [...callStack],
      question: {
        prompt: "What is the time complexity of Merge Sort in the average case?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        correctIndex: 1,
      },
    });

    sort(l, m);
    sort(m + 1, r);

    // merge back
    push({
      line: 9,
      desc: `Merge sorted halves [${l}..${m}] and [${m + 1}..${r}].`,
      vars: { l, m, r },
      callStack: [...callStack],
    });

    merge(l, m, r);

    callStack.pop();
  }

  sort(0, a.length - 1);

  push({
    line: 40,
    desc: "Merge Sort finished. Array is fully sorted.",
    vars: { n: a.length },
    callStack: ["mergeSort(arr)"],
  });

  return steps;
}

export const mergeSortCode = {
  javascript: `function mergeSort(arr) {                         // line 0
  sort(arr, 0, arr.length - 1);                    // line 1
}

function sort(arr, l, r) {                         // line 2
  if (l >= r) return;                              // line 3
  const m = Math.floor((l + r) / 2);               // line 4
  sort(arr, l, m);                                 // line 5
  sort(arr, m + 1, r);                             // line 6
  merge(arr, l, m, r);                             // line 7
}

function merge(arr, l, m, r) {                     // line 8
  const left = arr.slice(l, m + 1);                // line 9
  const right = arr.slice(m + 1, r + 1);           // line 10
  let i = 0, j = 0, k = l;                         // line 11
  while (i < left.length && j < right.length) {    // line 12
    if (left[i] <= right[j]) {                     // line 13
      arr[k++] = left[i++];                        // line 14
    } else {
      arr[k++] = right[j++];                       // line 15
    }
  }
  while (i < left.length) arr[k++] = left[i++];    // line 16
  while (j < right.length) arr[k++] = right[j++];  // line 17
}`,
  cpp: `void mergeSort(vector<int>& a) {                          // line 0
  sort(a, 0, (int)a.size() - 1);                   // line 1
}

void sort(vector<int>& a, int l, int r) {          // line 2
  if (l >= r) return;                              // line 3
  int m = (l + r) / 2;                             // line 4
  sort(a, l, m);                                   // line 5
  sort(a, m + 1, r);                               // line 6
  merge(a, l, m, r);                               // line 7
}

void merge(vector<int>& a, int l, int m, int r) {  // line 8
  vector<int> left(a.begin() + l, a.begin() + m + 1); // line 9
  vector<int> right(a.begin() + m + 1, a.begin() + r + 1); // line 10
  int i = 0, j = 0, k = l;                         // line 11
  while (i < (int)left.size() && j < (int)right.size()) { // line 12
    if (left[i] <= right[j]) a[k++] = left[i++];   // line 13
    else a[k++] = right[j++];                      // line 14
  }
  while (i < (int)left.size()) a[k++] = left[i++]; // line 15
  while (j < (int)right.size()) a[k++] = right[j++]; // line 16
}`,
  python: `def merge_sort(a):                                   # line 0
  sort(a, 0, len(a) - 1)                           # line 1

def sort(a, l, r):                                 # line 2
  if l >= r:                                       # line 3
    return
  m = (l + r) // 2                                 # line 4
  sort(a, l, m)                                    # line 5
  sort(a, m + 1, r)                                # line 6
  merge(a, l, m, r)                                # line 7

def merge(a, l, m, r):                             # line 8
  left = a[l:m+1]                                  # line 9
  right = a[m+1:r+1]                               # line 10
  i = j = 0                                        # line 11
  k = l                                            # line 12
  while i < len(left) and j < len(right):          # line 13
    if left[i] <= right[j]:                        # line 14
      a[k] = left[i]; i += 1                       # line 15
    else:
      a[k] = right[j]; j += 1                      # line 16
    k += 1
  while i < len(left):                             # line 17
    a[k] = left[i]; i += 1; k += 1
  while j < len(right):                            # line 18
    a[k] = right[j]; j += 1; k += 1
`,
};
