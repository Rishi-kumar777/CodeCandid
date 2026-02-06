import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#050B16] to-[#02050D] text-gray-300 pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Code<span className="text-cyan-400">Candid</span>
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Glass-Box Algorithm Simulator for deep learning and clarity.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-cyan-400 transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/how-it-works"
                className="hover:text-cyan-400 transition-colors duration-300"
              >
                How it works
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                className="hover:text-cyan-400 transition-colors duration-300"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-cyan-400 transition-colors duration-300"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <p className="text-sm text-gray-400">
            Kota <br />
            Rajasthan, India
          </p>
          <p className="text-sm mt-2 text-cyan-400">
            team@codecandid.dev
          </p>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Follow</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-cyan-400/20 transition"
            >
              🌐
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-cyan-400/20 transition"
            >
              💼
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-cyan-400/20 transition"
            >
              🐦
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-14 border-t border-white/10 pt-6 text-center text-xs text-gray-500">
        © 2026 CodeCandid — All rights reserved
      </div>
    </footer>
  );
}
