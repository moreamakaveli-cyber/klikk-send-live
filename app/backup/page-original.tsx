"use client";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: '#FFFFFF' }}>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
