import { motion } from "framer-motion";

const features = [
  "Step-by-step execution",
  "Call stack Tracking",
  "Variable tracking",
  "Sorting & graph algorithms",
  "Mentor learning mode",
  "Dark glass UI"
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const card = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-32 px-6 bg-[#020617] overflow-hidden"
    >
      {/* 🔹 Scanning Line */}
      <motion.div
        initial={{ x: "-100%" }}
        whileInView={{ x: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-full h-px bg-cyan-400/40"
      />

      {/* 🔹 Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center text-4xl font-extrabold mb-20"
      >
        <span className="text-white">Features</span>
      </motion.h2>

      {/* 🔹 Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {features.map((title, i) => (
          <motion.div
            key={i}
            variants={card}
            whileHover={{
              scale: 1.05,
              rotateX: 6,
              rotateY: -6,
              boxShadow: "0 0 40px rgba(34,211,238,0.25)"
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="
              relative rounded-2xl p-8
              bg-white/5 backdrop-blur-xl
              border border-white/10
              text-white
              cursor-pointer
              group
            "
          >
            {/* Glow Dot */}
            <div className="
              w-3 h-3 rounded-full mb-4
              bg-cyan-400
              group-hover:scale-125
              transition
            " />

            <h3 className="font-semibold text-lg">{title}</h3>

            {/* Hover glow */}
            <div className="
              absolute inset-0 rounded-2xl
              bg-cyan-400/10 opacity-0
              group-hover:opacity-100
              transition
              pointer-events-none
            " />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}