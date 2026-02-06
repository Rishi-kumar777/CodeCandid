import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const features = [
  {
    title: "Step-by-step Execution",
    desc: "Watch every line of code execute in real time. Pause, rewind, and step forward to deeply understand how algorithms evolve internally.",
    img: "./src/pages/features/15.png",
  },
  {
    title: "Call Stack Tracking",
    desc: "Understand recursion and nested function calls with a live call stack that grows and shrinks as functions execute.",
    img: "./src/pages/features/18.png",
  },
  {
    title: "Variable Tracking",
    desc: "Track how variables change at each step and instantly see state transitions during execution.",
    img: "./src/pages/features/19.png",
  },
  {
    title: "Graphs & Algorithms",
    desc: "Visualize graph traversals, sorting, and searching algorithms with animated transitions.",
    img: "./src/pages/features/12.png",
  },
  {
    title: "Dark Glass UI",
    desc: "A modern glass-morphism inspired dark UI designed for focus and clarity.",
    img: "./src/pages/features/16.png",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-20 text-center relative overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight group inline-block">
          <span className="text-white">Powerful </span>
          <span className="text-cyan-400 relative">
            Features
            {/* underline animation */}
            <span className="absolute left-0 -bottom-2 w-0 h-1 bg-cyan-400 transition-all duration-500 group-hover:w-full"></span>
          </span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-gray-400 text-lg transition-opacity duration-700 hover:opacity-100 opacity-80">
          CodeCandid gives you full visibility into how algorithms work —
          not just the output, but the thinking behind every step.
        </p>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 space-y-28 pb-32">
        {features.map((f, i) => (
          <div
            key={i}
            className={`grid md:grid-cols-2 gap-12 items-center group ${
              i % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* TEXT */}
            <div className="space-y-4 transform transition-all duration-500 group-hover:-translate-y-2">
              <h2 className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                {f.title}
              </h2>

              <p className="text-gray-400 leading-relaxed">
                {f.desc}
              </p>

              {/* progress line animation */}
              <div className="h-1 w-24 bg-gray-800 overflow-hidden rounded">
                <div className="h-full w-0 bg-cyan-400 transition-all duration-700 group-hover:w-full"></div>
              </div>
            </div>

            {/* IMAGE */}
            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl transform transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]">
              <img
                src={f.img}
                alt={f.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
