import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Priser() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-center">
            Priser
          </h1>
          
          <p className="text-xl text-gray-900 text-center mb-16 max-w-xl mx-auto font-medium">
            Vi ønsker at levering skal være enkelt og billig. Derfor har vi faste, lave priser basert på distanse.
          </p>
            
          <div className="space-y-4 mb-16">
            <div className="flex items-center justify-between py-6 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Kort levering (0–3 km)
                </h3>
              </div>
              <p className="text-xl font-semibold text-orange-600">119 kr</p>
            </div>
            
            <div className="flex items-center justify-between py-6 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Medium levering (3–6 km)
                </h3>
              </div>
              <p className="text-xl font-semibold text-orange-600">169 kr</p>
            </div>
            
            <div className="flex items-center justify-between py-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Lengre levering (6–20 km)
                </h3>
              </div>
              <p className="text-xl font-semibold text-orange-600">219 kr</p>
            </div>
          </div>
            
          <div className="text-center space-y-3 pt-8 border-t border-gray-200">
            <p className="text-lg text-gray-900 font-medium">
              Skriv inn adressen din for å se riktig pris.
            </p>
            <p className="text-lg text-gray-900 font-medium">
              Vi fokuserer på rask levering og lave kostnader.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
