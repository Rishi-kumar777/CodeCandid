export default function MentorPanel({
  mentorMode,
  step,
  locked,
  onAnswer,
  onSkip,
  feedback,
}) {
  if (!mentorMode) return null;

  const q = step?.question;

  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-4">
      <div className="rounded-2xl border border-amber-300/60 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-950/30 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Mentor Mode
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-300">
              The next step unlocks only after a correct answer (or you can Skip and continue manually).
            </div>
          </div>

          <div
            className={`text-xs px-3 py-1 rounded-full ${
              locked ? "bg-amber-500 text-black" : "bg-emerald-600 text-white"
            }`}
          >
            {locked ? "LOCKED" : "UNLOCKED"}
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-amber-200 dark:border-amber-700/40 bg-white/70 dark:bg-zinc-950/40 p-4">
          {!q ? (
            <div className="text-sm text-zinc-700 dark:text-zinc-200">
              No question on this step — you can proceed.
            </div>
          ) : (
            <>
              <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                {q.prompt}
              </div>

              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                {q.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => onAnswer(idx)}
                    className="text-left rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 px-3 py-2 text-sm transition"
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <button
                  onClick={onSkip}
                  className="text-sm px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
                >
                  Skip (manual next)
                </button>

                {feedback ? (
                  <div
                    className={`text-sm ${
                      feedback.type === "ok"
                        ? "text-emerald-700 dark:text-emerald-300"
                        : "text-red-700 dark:text-red-300"
                    }`}
                  >
                    {feedback.text}
                  </div>
                ) : (
                  <div className="text-sm text-zinc-600 dark:text-zinc-300">
                    Select an option…
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
