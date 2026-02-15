import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone } from "lucide-react";

export default function KontaktOss() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
            Kontakt oss
          </h1>

          <div className="space-y-8 text-gray-700 leading-relaxed text-center">
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
      </section>
      <Footer />
    </main>
  );
}
