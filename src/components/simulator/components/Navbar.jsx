import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ status, mentorMode, setMentorMode, theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
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

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-white/10 p-2 text-zinc-700 dark:text-white/80 hover:text-cyan-500 dark:hover:text-cyan-300 transition"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-white/10 bg-white/90 dark:bg-black/70 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs">
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white ${pill}`}>
                <span className="h-2 w-2 rounded-full bg-white/90" />
                {status.toUpperCase()}
              </span>
            </div>

            <button
              onClick={() => setMentorMode((v) => !v)}
              className={`text-left transition-all duration-300 text-base font-semibold
                ${mentorMode ? "text-amber-500 dark:text-amber-300" : "text-zinc-700 dark:text-white/80 hover:text-cyan-500 dark:hover:text-cyan-300"}`}
            >
              Mentor Mode: {mentorMode ? "ON" : "OFF"}
            </button>

            <button
              onClick={toggleTheme}
              className="text-left transition-all duration-300 text-base font-semibold text-zinc-700 dark:text-white/80 hover:text-cyan-500 dark:hover:text-cyan-300"
            >
              Theme: {theme === "dark" ? "Dark" : "Light"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
