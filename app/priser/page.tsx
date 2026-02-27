import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Priser() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-center">
            Priser og betaling
          </h1>
            
          <div className="space-y-4 mb-12">
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
            
          <div className="space-y-4 text-gray-700 pt-8 border-t border-gray-200">
            <p>Vi følger faste satser. Prisen beregnes ut fra avstand etter at vi har mottatt bestillingen din. Du får en SMS med bekreftet pris før oppdraget utføres.</p>
            <p>Betaling skjer med Vipps når pakken er levert.</p>
            <p className="mt-8 font-bold">
              Les mer om trygghet og sikkerhet{" "}
              <Link href="/trygghet-og-sikkerhet" className="text-orange-600 hover:text-orange-700 underline">
                her
              </Link>.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
