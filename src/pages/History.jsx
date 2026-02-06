import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { clearHistory, getHistory } from "../utils/history";

export default function History() {
  const { user } = useAuth();
  const [tick, setTick] = useState(0);

  const history = useMemo(() => {
    if (!user) return [];
    return getHistory(user.id);
  }, [user, tick]);

  const onClear = () => {
    if (!user) return;
    clearHistory(user.id);
    setTick((t) => t + 1);
  };

  return (
    <div className="min-h-screen bg-[#0b0f16] text-slate-100">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-16">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Your History</h1>
            <p className="text-white/70 mt-2">Algorithms you viewed most recently.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/simulator-tool"
              className="rounded-xl bg-cyan-400 text-black font-semibold px-4 py-2 text-sm hover:bg-cyan-300 transition"
            >
              Open Simulator
            </Link>
            <button
              onClick={onClear}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/80 hover:text-white hover:border-white/30 transition"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {history.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
              No history yet. Open the simulator to start exploring.
            </div>
          )}

          {history.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
            >
              <div>
                <div className="text-lg font-semibold">{item.name || item.algorithm}</div>
                {item.type && <div className="text-sm text-white/60">{item.type}</div>}
              </div>
              <div className="text-sm text-white/60">
                Last viewed: {new Date(item.at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
