import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import HowItWorksTimeline from "../components/HowItWorksTimeline";
export default function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorksTimeline />
      <Features />
      <Footer />
    </>
  );
}