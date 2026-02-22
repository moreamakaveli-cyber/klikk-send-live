"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Pakkeinnhold() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-8">
            Pakkeinnhold
          </h1>
          
          <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
            Vi har faste priser per størrelse. Så lenge gjenstanden holder seg innenfor oppgitt vekt og mål, er prisen den samme.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Liten */}
            <div className="bg-orange-50 rounded-2xl p-8 border border-orange-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Liten</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-700 mb-2">
                    Passer for små gjenstander som dokumenter, nøkler, små pakker, vesker eller en liten pose.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Vekt:</p>
                  <p className="text-gray-700">Maks 10 kg</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Mål:</p>
                  <p className="text-gray-700">Maks 40 × 40 × 40 cm</p>
                </div>
              </div>
            </div>

            {/* Mellomstor */}
            <div className="bg-orange-50 rounded-2xl p-8 border border-orange-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Mellomstor</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-700 mb-2">
                    Passer for flere esker, ryggsekk, PC eller mindre kjøkkenutstyr.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Vekt:</p>
                  <p className="text-gray-700">Maks 20 kg</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Mål:</p>
                  <p className="text-gray-700">Maks 60 × 50 × 50 cm</p>
                </div>
              </div>
            </div>

            {/* Stor */}
            <div className="bg-orange-50 rounded-2xl p-8 border border-orange-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Stor</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-700 mb-2">
                    Passer for koffert, mikrobølgeovn, større esker eller lignende.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Vekt:</p>
                  <p className="text-gray-700">Maks 35 kg</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Mål:</p>
                  <p className="text-gray-700">Maks 80 × 60 × 60 cm</p>
                </div>
                <div>
                  <p className="text-gray-700 text-sm italic">
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
