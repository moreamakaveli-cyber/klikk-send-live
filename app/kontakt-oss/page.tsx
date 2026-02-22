import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone } from "lucide-react";

export default function KontaktOss() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="py-20 px-6 bg-white w-full" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side: Kontakt oss */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 w-full" style={{ backgroundColor: '#ffffff' }}>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border-4 border-orange-600 flex items-center justify-center mb-6">
                    <Phone className="w-10 h-10 text-orange-600" />
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
                    Kontakt oss
                  </h1>
                </div>
              </div>
            </div>
            
            {/* Right side: Content */}
            <div className="lg:col-span-2 bg-white w-full" style={{ backgroundColor: '#ffffff' }}>
              <div className="space-y-8 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Har du spørsmål om en levering eller trenger hjelp med en bestilling?
                </p>
                <p className="text-lg font-medium">
                  Vi svarer så raskt vi kan!
                </p>

                <div className="pt-8 space-y-6">
                  {/* E-post */}
                  <div>
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <Mail className="w-6 h-6 text-orange-600" />
                      <span className="text-lg font-semibold text-gray-900">E-post:</span>
                    </div>
                    <a
                      href="mailto:oslo@klikkogsend.no"
                      className="text-xl text-orange-600 hover:text-orange-700 font-medium transition-colors"
                    >
                      oslo@klikkogsend.no
                    </a>
                  </div>

                  {/* Telefonnumre */}
                  <div>
                    <p className="text-lg mb-2">
                      For rask respons, kontakt oss på telefon:
                    </p>
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Phone className="w-6 h-6 text-orange-600" />
                      <span className="text-lg font-semibold text-gray-900">Telefon:</span>
                    </div>
                    <div className="space-y-2">
                      <a
                        href="tel:+4797940097"
                        className="block text-xl text-orange-600 hover:text-orange-700 font-medium transition-colors"
                      >
                        +47 979 40 097
                      </a>
                      <a
                        href="tel:+4792117289"
                        className="block text-xl text-orange-600 hover:text-orange-700 font-medium transition-colors"
                      >
                        +47 921 17 289
                      </a>
                    </div>
                  </div>
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
