import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Pakkeinnhold() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
            Pakkeinnhold
          </h1>
          
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 mb-2">
              Vi har faste priser per størrelse.
            </p>
            <p className="text-lg text-gray-700">
              Så lenge gjenstanden holder seg innenfor oppgitt vekt og mål, er prisen den samme.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Liten pakke */}
            <div className="bg-orange-50 rounded-2xl p-8 border-2 border-orange-200 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold text-orange-600 mb-4">
                Liten
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  Passer for små gjenstander som dokumenter, nøkler, små pakker, vesker eller en liten pose.
                </p>
                <p className="font-semibold">Maks 10 kg</p>
                <p className="font-semibold">Maks 40 × 40 × 40 cm</p>
              </div>
            </div>

            {/* Mellomstor pakke */}
            <div className="bg-orange-50 rounded-2xl p-8 border-2 border-orange-200 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold text-orange-600 mb-4">
                Mellomstor
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  Passer for flere esker, ryggsekk, PC eller mindre kjøkkenutstyr.
                </p>
                <p className="font-semibold">Maks 20 kg</p>
                <p className="font-semibold">Maks 60 × 50 × 50 cm</p>
              </div>
            </div>

            {/* Stor pakke */}
            <div className="bg-orange-50 rounded-2xl p-8 border-2 border-orange-200 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold text-orange-600 mb-4">
                Stor
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>
                  Passer for koffert, mikrobølgeovn, større esker eller lignende.
                </p>
                <p className="font-semibold">Maks 35 kg</p>
                <p className="font-semibold">Maks 80 × 60 × 60 cm</p>
                <p className="text-sm italic">Må kunne transporteres forsvarlig av én person.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
