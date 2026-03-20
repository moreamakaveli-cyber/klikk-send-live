"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HentingHosKundePage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Navbar />
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="max-w-3xl space-y-8 md:space-y-10">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-normal"
            style={{
              fontFamily: "var(--font-serif), serif",
              color: "hsl(150, 30%, 15%)",
            }}
          >
            Henting hos kunde
          </h1>

          <div
            className="space-y-6 md:space-y-8 text-base md:text-lg"
            style={{
              fontFamily: "var(--font-sans), sans-serif",
              color: "hsl(150, 30%, 15%)",
            }}
          >
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-semibold">1. Bestilling</h2>
              <p>Kunden bestiller via deg eller direkte hos oss.</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-semibold">2. Henting</h2>
              <p>Vi henter varen hos kunden til avtalt tidspunkt.</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-semibold">3. Levering</h2>
              <p>Vi leverer direkte til din butikk.</p>
            </div>

            <p
              className="text-base md:text-lg leading-relaxed pt-8 mt-8 border-t border-gray-200"
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                color: "hsl(150, 30%, 15%)",
              }}
            >
              Når en bestilling er klar, henter vi varen direkte hos kunden til avtalt tidspunkt.
              Deretter leverer vi den umiddelbart til din bedrift, uten unødvendige stopp underveis.
              Dette gir en rask, effektiv og enkel leveranse for både din bedrift og kunden.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
