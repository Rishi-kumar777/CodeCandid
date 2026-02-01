import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

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
        <nav className="hidden md:flex items-center gap-10">
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

          {/* <a
  href="https://code-candid-simulator.vercel.app"
  target="_blank"
  rel="noopener noreferrer"
  className="ml-4 px-6 py-3 rounded-xl text-lg font-bold 
  bg-cyan-400 text-black 
  hover:bg-cyan-300 transition-all duration-300"
  >
  Launch
  </a> */}


          <NavLink to="/simulator-tool" className="ml-4 px-6 py-3 rounded-xl text-lg font-bold 
  bg-cyan-400 text-black 
  hover:bg-cyan-300 transition-all duration-300">
            Launch
          </NavLink>
            
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

            <Link
              onClick={() => setOpen(false)}
              to="/simulator"
              className="mt-4 px-8 py-3 rounded-xl text-lg font-bold bg-cyan-400 text-black hover:bg-cyan-300 transition-all duration-300"
            >
              Launch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
