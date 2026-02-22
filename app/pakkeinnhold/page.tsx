"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Pakkeinnhold() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-6 md:mb-8">
            Pakkeinnhold
          </h1>
          
          <p className="text-base md:text-lg text-gray-700 text-center mb-8 md:mb-12 max-w-3xl mx-auto px-4">
            Vi har faste priser per størrelse. Så lenge gjenstanden holder seg innenfor oppgitt vekt og mål, er prisen den samme.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Liten */}
            <div className="bg-orange-50 rounded-2xl p-6 md:p-8 border border-orange-100">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Liten</h2>
              <div className="space-y-3 md:space-y-4">
                <div>
                  <p className="text-sm md:text-base text-gray-700 mb-2">
                    Passer for små gjenstander som dokumenter, nøkler, små pakker, vesker eller en liten pose.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Vekt:</p>
                  <p className="text-gray-700 text-sm md:text-base">Maks 10 kg</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Mål:</p>
                  <p className="text-gray-700 text-sm md:text-base">Maks 40 × 40 × 40 cm</p>
                </div>
              </div>
            </div>

            {/* Mellomstor */}
            <div className="bg-orange-50 rounded-2xl p-6 md:p-8 border border-orange-100">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Mellomstor</h2>
              <div className="space-y-3 md:space-y-4">
                <div>
                  <p className="text-sm md:text-base text-gray-700 mb-2">
                    Passer for flere esker, ryggsekk, PC eller mindre kjøkkenutstyr.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Vekt:</p>
                  <p className="text-gray-700 text-sm md:text-base">Maks 20 kg</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Mål:</p>
                  <p className="text-gray-700 text-sm md:text-base">Maks 60 × 50 × 50 cm</p>
                </div>
              </div>
            </div>

            {/* Stor */}
            <div className="bg-orange-50 rounded-2xl p-6 md:p-8 border border-orange-100">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Stor</h2>
              <div className="space-y-3 md:space-y-4">
                <div>
                  <p className="text-sm md:text-base text-gray-700 mb-2">
                    Passer for koffert, mikrobølgeovn, større esker eller lignende.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Vekt:</p>
                  <p className="text-gray-700 text-sm md:text-base">Maks 35 kg</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Mål:</p>
                  <p className="text-gray-700 text-sm md:text-base">Maks 80 × 60 × 60 cm</p>
                </div>
                <div>
                  <p className="text-gray-700 text-xs md:text-sm italic">
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
