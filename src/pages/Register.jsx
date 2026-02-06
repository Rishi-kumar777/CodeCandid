import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    try {
      register(name, email, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err?.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f16] text-slate-100">
      <Navbar />
      <div className="max-w-xl mx-auto px-6 pt-28 pb-16">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="text-white/70 mt-2">Register and jump straight into the simulator.</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm text-white/70">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="text-sm text-white/70">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="text-sm text-white/70">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="••••••••"
                required
              />
            </div>

            {error && <div className="text-sm text-rose-300">{error}</div>}

            <button
              type="submit"
              className="w-full rounded-xl bg-cyan-400 text-black font-bold py-3 hover:bg-cyan-300 transition"
            >
              Register & Log In
            </button>
          </form>

          <div className="mt-6 text-sm text-white/70">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-300 hover:text-cyan-200">
              Log in
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
