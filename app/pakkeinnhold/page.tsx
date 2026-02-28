"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Pakkeinnhold() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'hsl(36, 50%, 95%)' }}>
      <Navbar />
      <section className="py-16 md:py-24 px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-center mb-8 md:mb-12" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
            Pakkeinnhold
          </h1>
          
          <p className="text-base md:text-lg text-center mb-12 md:mb-16 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
            Vi har faste priser per størrelse. Så lenge gjenstanden holder seg innenfor oppgitt vekt og mål, er prisen den samme.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Liten */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>Liten</h2>
              <div className="space-y-4" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                <div>
                  <p className="text-base md:text-lg mb-2">
                    Passer for små gjenstander som dokumenter, nøkler, små pakker, vesker eller en liten pose.
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Vekt:</p>
                  <p>Maks 10 kg</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Mål:</p>
                  <p>Maks 40 × 40 × 40 cm</p>
                </div>
              </div>
            </div>

            {/* Mellomstor */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>Mellomstor</h2>
              <div className="space-y-4" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                <div>
                  <p className="text-base md:text-lg mb-2">
                    Passer for flere esker, ryggsekk, PC eller mindre kjøkkenutstyr.
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Vekt:</p>
                  <p>Maks 20 kg</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Mål:</p>
                  <p>Maks 60 × 50 × 50 cm</p>
                </div>
              </div>
            </div>

            {/* Stor */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>Stor</h2>
              <div className="space-y-4" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                <div>
                  <p className="text-base md:text-lg mb-2">
                    Passer for koffert, mikrobølgeovn, større esker eller lignende.
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Vekt:</p>
                  <p>Maks 35 kg</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Mål:</p>
                  <p>Maks 80 × 60 × 60 cm</p>
                </div>
                <div>
                  <p className="text-sm md:text-base italic">
                    Må kunne transporteres forsvarlig av én person.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
