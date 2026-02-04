export default function PlaybackControls({
  status,
  onBuildSteps,
  onReset,
  stepIndex,
  maxStep,
  onSeek,
  speed,
  setSpeed,
  onPlayPause,
  onPrev,
  onNext,
  canAutoPlay,
  hasSteps,
  mentorLocked,
}) {
  // milestone visuals removed per request

  return (
    <div className="max-w-7xl mx-auto px-6 mt-4">
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
          <div className="flex gap-2 flex-wrap items-center">
            <button
              onClick={onBuildSteps}
              className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 text-sm transition"
            >
              Build Steps
            </button>

            <button
              onClick={onReset}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 px-4 py-2 text-sm transition"
            >
              Reset
            </button>

            {/* PREVIOUS */}
            <button
              onClick={onPrev}
              disabled={!hasSteps || stepIndex === 0}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800
               px-3 py-2 text-sm transition
               disabled:opacity-50 disabled:cursor-not-allowed
               text-zinc-700 dark:text-zinc-100 disabled:text-zinc-400 dark:disabled:text-zinc-500
               hover:bg-zinc-50 dark:hover:bg-zinc-900"
              title="Previous step"
            >
              ◀ Prev
            </button>

            {/* PLAY / PAUSE */}
            <button
              onClick={onPlayPause}
              disabled={!canAutoPlay}
              className="rounded-xl bg-blue-600 hover:bg-blue-500
               disabled:opacity-50 disabled:cursor-not-allowed
               text-white px-4 py-2 text-sm transition"
              title={
                !hasSteps
                  ? "Build steps first"
                  : mentorLocked
                    ? "Mentor locked: answer or skip"
                    : ""
              }
            >
              {status === "playing" ? "Pause" : "Play"}
            </button>

            {/* NEXT */}
            <button
              onClick={onNext}
              disabled={!hasSteps || mentorLocked || stepIndex >= maxStep}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800
               px-3 py-2 text-sm transition
               disabled:opacity-50 disabled:cursor-not-allowed
               text-zinc-700 dark:text-zinc-100 disabled:text-zinc-400 dark:disabled:text-zinc-500
               hover:bg-zinc-50 dark:hover:bg-zinc-900"
              title={
                mentorLocked ? "Mentor locked: answer or skip" : "Next step"
              }
            >
              Next ▶
            </button>
          </div>


          <div className="flex-1">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">
              Step: {stepIndex}/{maxStep}
            </label>
            <input
              type="range"
              min={0}
              max={maxStep}
              value={stepIndex}
              onChange={(e) => onSeek(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="w-full md:w-64">
            <label className="text-xs text-zinc-500 dark:text-zinc-400">Speed: {speed}x</label>
            <input
              type="range"
              min={0.25}
              max={3}
              step={0.25}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
