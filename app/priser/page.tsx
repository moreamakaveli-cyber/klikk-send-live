import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Priser() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="py-12 md:py-24 px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 text-center">
            Priser og betaling
          </h1>
            
          <div className="space-y-4 mb-8 md:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 md:py-6 border-b border-gray-200 gap-2">
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  Kort levering (0–3 km)
                </h3>
              </div>
              <p className="text-lg md:text-xl font-semibold text-orange-600 sm:ml-4">119 kr</p>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 md:py-6 border-b border-gray-200 gap-2">
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  Medium levering (3–6 km)
                </h3>
              </div>
              <p className="text-lg md:text-xl font-semibold text-orange-600 sm:ml-4">169 kr</p>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 md:py-6 gap-2">
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  Lengre levering (6–20 km)
                </h3>
              </div>
              <p className="text-lg md:text-xl font-semibold text-orange-600 sm:ml-4">219 kr</p>
            </div>
          </div>
            
          <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base pt-6 md:pt-8 border-t border-gray-200">
            <p>Prisen beregnes etter at vi har mottatt bestillingen din.</p>
            <p>Du får en SMS med bekreftet pris før oppdraget gjennomføres.</p>
            <p>Du betaler med Vipps når pakken er levert.</p>
            <p className="mt-6 md:mt-8 font-bold text-base md:text-lg">
              Din trygghet er viktig for oss. Les mer om trygghet og sikkerhet{" "}
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
