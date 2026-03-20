"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LeverVareTilKundePage() {
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
            Levering til kunde
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
              <p>Vi får automatisk beskjed når en kunde bestiller fra din nettbutikk.</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-semibold">2. Henting</h2>
              <p>Når varen er klar, henter budet vårt – umiddelbart eller til avtalt tid.</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-semibold">3. Levering</h2>
              <p>Vi leverer varen direkte til kunden.</p>
            </div>

            <p
              className="text-base md:text-lg leading-relaxed pt-8 mt-8 border-t border-gray-200"
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                color: "hsl(150, 30%, 15%)",
              }}
            >
              Når en kunde legger inn en bestilling i nettbutikken din, mottas ordreinformasjonen
              automatisk i vårt system. Når varen er klargjort, organiserer vi henting enten
              umiddelbart eller til et avtalt tidspunkt, tilpasset kundens behov. Vi sørger for en
              sikker og presis levering direkte til kunden, med fokus på kvalitet, pålitelighet og
              en profesjonell kundeopplevelse gjennom hele leveransen.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
