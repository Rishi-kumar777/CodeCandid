import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
    `transition-all duration-300 text-lg md:text-xl font-semibold ${
      isActive
        ? "text-cyan-400"
        : "text-white/80 hover:text-cyan-300"
    }`;

  return (
    <header className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => window.scrollTo(0, 0)}
        >
          <span className="text-cyan-400 text-3xl md:text-4xl font-mono transition-transform duration-300 group-hover:scale-110">
            {"</>"}
          </span>

          <span className="text-white text-2xl md:text-3xl font-extrabold tracking-wide">
            Code<span className="text-cyan-400">Candid</span>
          </span>
        </Link>


        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10 ml-auto">
          <div className="flex items-center gap-10">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/features" className={navLinkClass}>
              Features
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About Us
            </NavLink>
            <NavLink to="/how-it-works" className={navLinkClass}>
              How it works
            </NavLink>
          </div>

          {user ? (
            <>
              <NavLink
                to="/simulator-tool"
                className="ml-2 px-6 py-3 rounded-xl text-lg font-bold bg-cyan-400 text-black hover:bg-cyan-300 transition-all duration-300"
              >
                Launch
              </NavLink>
              <span className="ml-3 inline-flex items-center px-3 py-1.5 rounded-full border border-cyan-400/40 bg-white/5 text-cyan-200 text-sm md:text-base font-semibold max-w-[10rem] md:max-w-[14rem] truncate">
                {user.name}
              </span>
              <button
                onClick={logout}
                className="inline-flex items-center px-3 py-1.5 rounded-full border border-cyan-400/40 bg-white/5 text-cyan-200 text-sm md:text-base font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className="ml-2 px-6 py-3 rounded-xl text-lg font-bold bg-cyan-400 text-black hover:bg-cyan-300 transition-all duration-300">
                Register
              </NavLink>
            </>
          )}
            
        </nav>

        {/* HAMBURGER */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-3xl focus:outline-none"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
          <nav className="flex flex-col items-center gap-6 py-8">
            <NavLink onClick={() => setOpen(false)} to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink onClick={() => setOpen(false)} to="/features" className={navLinkClass}>
              Features
            </NavLink>
            <NavLink onClick={() => setOpen(false)} to="/about" className={navLinkClass}>
              About Us
            </NavLink>
            <NavLink onClick={() => setOpen(false)} to="/how-it-works" className={navLinkClass}>
              How it works
            </NavLink>

            {user ? (
              <>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="text-white/80 hover:text-white transition-all duration-300 text-lg font-semibold"
                >
                  Log out
                </button>
                <Link
                  onClick={() => setOpen(false)}
                  to="/simulator-tool"
                  className="mt-4 px-8 py-3 rounded-xl text-lg font-bold bg-cyan-400 text-black hover:bg-cyan-300 transition-all duration-300"
                >
                  Launch
                </Link>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-cyan-400/40 bg-white/5 text-cyan-200 text-base font-semibold max-w-[14rem] truncate">
                  {user.name}
                </span>
              </>
            ) : (
              <>
                <NavLink onClick={() => setOpen(false)} to="/login" className={navLinkClass}>
                  Login
                </NavLink>
                <NavLink onClick={() => setOpen(false)} to="/register" className={navLinkClass}>
                  Register
                </NavLink>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
