
import Antigravity from "./Antigravity";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* ===== ANTI-GRAVITY BACKGROUND ===== */}
      <div className="absolute inset-0 z-0">
        <Antigravity
          count={300}
          magnetRadius={6}
          ringRadius={7}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.5}
          lerpSpeed={0.05}
          color="#22d3ee"
          autoAnimate
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={10}
        />
      </div>

      {/* ===== DARK GRADIENT OVERLAY (READABILITY) ===== */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#020617]/90 via-[#020617]/75 to-black" />

      {/* ===== SOFT GLOW ===== */}
      <div className="absolute z-10 w-[800px] h-[800px] bg-cyan-500/20 blur-3xl rounded-full" />

      {/* ===== HERO CONTENT (CENTERED) ===== */}
      <div className="relative z-20 text-center px-6 max-w-3xl">
        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
          See Inside <br />
          <span className="text-cyan-400">Algorithms</span>
        </h1>

        <p className="mt-6 text-slate-400 text-lg">
          CodeCandid is a glass-box algorithm simulator that lets you visualize
          execution, variables, call stack, and logic — step by step.
        </p>

        <div className="mt-10 flex justify-center gap-6">
         <button
  onClick={() => window.open(
    "https://code-candid-simulator.vercel.app",
    "_blank",
    "noopener,noreferrer"
  )}
  className="px-8 py-4 bg-cyan-400 text-black rounded-2xl font-semibold
             hover:scale-110 hover:shadow-[0_0_40px_#22d3ee]
             transition"
>
  Launch Simulator
</button>

          

          <button
           onClick={() => window.open(
    "https://youtu.be/rFGNNeH_CxY",
    "_blank",
    "noopener,noreferrer"
  )}
            className="px-8 py-4 border border-white/20 rounded-2xl
                       hover:border-cyan-400 transition"
          >
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
}