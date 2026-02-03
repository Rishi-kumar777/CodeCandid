export default function Navbar({ status, mentorMode, setMentorMode, theme, toggleTheme }) {
  const pill =
    status === "playing"
      ? "bg-blue-600"
      : status === "done"
      ? "bg-emerald-600"
      : "bg-zinc-500";

  return (
    <div className="sticky top-0 z-20 backdrop-blur bg-white/80 dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
          <div>
            <div className="text-sm font-semibold leading-4 text-zinc-900 dark:text-zinc-50"> Code<span className="text-cyan-400">Candid</span> </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Algorithmic “Glass Box” Simulator</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white ${pill}`}>
              <span className="h-2 w-2 rounded-full bg-white/90" />
              {status.toUpperCase()}
            </span>
          </div>

          <button
            onClick={() => setMentorMode((v) => !v)}
            className={`px-3 py-2 rounded-xl text-sm border transition
              ${mentorMode ? "bg-amber-500 text-black border-amber-400" : "border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900"}`}
          >
            Mentor Mode: {mentorMode ? "ON" : "OFF"}
          </button>

          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-xl text-sm border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
          >
            Theme: {theme === "dark" ? "Dark" : "Light"}
          </button>
        </div>
      </div>
    </div>
  );
}
