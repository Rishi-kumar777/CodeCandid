import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import HowItWorksTimeline from "../components/HowItWorksTimeline";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0b0f16] text-slate-100">
      <Navbar />
      <Hero />
      <HowItWorksTimeline />
      <Features />
      <Footer />
    </div>
  );
}
