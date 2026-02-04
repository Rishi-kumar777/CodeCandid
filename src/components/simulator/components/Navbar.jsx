import { Link, NavLink } from "react-router-dom";

export default function Navbar({ status, mentorMode, setMentorMode, theme, toggleTheme }) {
  const pill =
    status === "playing"
      ? "bg-blue-600"
      : status === "done"
      ? "bg-emerald-600"
      : "bg-zinc-500";

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/60 backdrop-blur-xl border-b border-zinc-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => window.scrollTo(0, 0)}
        >
          <span className="text-cyan-500 dark:text-cyan-400 text-3xl md:text-4xl font-mono transition-transform duration-300 group-hover:scale-110">
            {"</>"}
          </span>

          <span className="text-zinc-900 dark:text-white text-2xl md:text-3xl font-extrabold tracking-wide">
            Code<span className="text-cyan-500 dark:text-cyan-400">Candid</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <NavLink
            to="/"
            className="transition-all duration-300 text-lg md:text-xl font-semibold text-zinc-700 dark:text-white/80 hover:text-cyan-500 dark:hover:text-cyan-300"
            onClick={() => window.scrollTo(0, 0)}
          >
            Home
          </NavLink>

          <div className="flex items-center gap-2 text-xs">
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white ${pill}`}>
              <span className="h-2 w-2 rounded-full bg-white/90" />
              {status.toUpperCase()}
            </span>
          </div>

          <button
            onClick={() => setMentorMode((v) => !v)}
            className={`transition-all duration-300 text-lg md:text-xl font-semibold
              ${mentorMode ? "text-amber-500 dark:text-amber-300" : "text-zinc-700 dark:text-white/80 hover:text-cyan-500 dark:hover:text-cyan-300"}`}
          >
            Mentor Mode: {mentorMode ? "ON" : "OFF"}
          </button>

          <button
            onClick={toggleTheme}
            className="transition-all duration-300 text-lg md:text-xl font-semibold text-zinc-700 dark:text-white/80 hover:text-cyan-500 dark:hover:text-cyan-300"
          >
            Theme: {theme === "dark" ? "Dark" : "Light"}
          </button>
        </nav>
      </div>
    </header>
  );
}
