"use client";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: '#FFFFFF', margin: 0, padding: 0 }}>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <div className="mt-auto">
      <Footer />
      </div>
    </main>
  );
}
