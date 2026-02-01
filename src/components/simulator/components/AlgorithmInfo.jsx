export default function AlgorithmInfo({ meta }) {
  if (!meta) return null;

  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-4 pb-10">
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              About: {meta.name}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              {meta.type}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {meta.stable && meta.stable !== "N/A" && (
              <span className="px-2 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                Stable: {meta.stable}
              </span>
            )}
            {meta.inPlace && meta.inPlace !== "N/A" && (
              <span className="px-2 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                In-place: {meta.inPlace}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {/* Complexity */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
            <div className="text-sm font-semibold">Complexity</div>
            <div className="mt-3 text-sm space-y-2">
              <div className="flex justify-between gap-3">
                <span className="text-zinc-500">Best</span>
                <span className="font-mono">{meta.time.best}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-zinc-500">Average</span>
                <span className="font-mono">{meta.time.average}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-zinc-500">Worst</span>
                <span className="font-mono">{meta.time.worst}</span>
              </div>
              <div className="flex justify-between gap-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-500">Space</span>
                <span className="font-mono">{meta.space}</span>
              </div>
            </div>
          </div>

          {/* Applications */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
            <div className="text-sm font-semibold">Applications</div>
            <ul className="mt-3 text-sm list-disc pl-5 space-y-2">
              {meta.applications.map((x, i) => (
                <li key={i} className="text-zinc-700 dark:text-zinc-200">
                  {x}
                </li>
              ))}
            </ul>
          </div>

          {/* Facts */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
            <div className="text-sm font-semibold">Facts</div>
            <ul className="mt-3 text-sm list-disc pl-5 space-y-2">
              {meta.facts.map((x, i) => (
                <li key={i} className="text-zinc-700 dark:text-zinc-200">
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
