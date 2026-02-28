import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone } from "lucide-react";

export default function KontaktOss() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'hsl(36, 50%, 95%)' }}>
      <Navbar />
      <section className="py-16 md:py-24 px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <div className="flex flex-col items-center mb-8 md:mb-12">
              <div className="w-20 h-20 rounded-full border-4 flex items-center justify-center mb-6" style={{ borderColor: 'hsl(24, 85%, 50%)' }}>
                <Phone className="w-10 h-10" style={{ color: 'hsl(24, 85%, 50%)' }} />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-center" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
                Kontakt oss
              </h1>
            </div>
            
            <div className="space-y-8 leading-relaxed text-center" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              <p className="text-base md:text-lg">
                Har du spørsmål om en levering eller trenger hjelp med en bestilling?
              </p>
              <p className="text-base md:text-lg font-semibold">
                Vi svarer så raskt vi kan!
              </p>

              <div className="pt-8 space-y-6">
                {/* E-post */}
                <div>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <Mail className="w-6 h-6" style={{ color: 'hsl(24, 85%, 50%)' }} />
                    <span className="text-lg font-semibold">E-post:</span>
                  </div>
                  <a
                    href="mailto:oslo@klikkogsend.no"
                    className="text-xl font-semibold transition-opacity hover:opacity-80"
                    style={{ color: 'hsl(24, 85%, 50%)' }}
                  >
                    oslo@klikkogsend.no
                  </a>
                </div>

                {/* Telefonnumre */}
                <div>
                  <p className="text-base md:text-lg mb-2">
                    For rask respons, kontakt oss på telefon:
                  </p>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Phone className="w-6 h-6" style={{ color: 'hsl(24, 85%, 50%)' }} />
                    <span className="text-lg font-semibold">Telefon:</span>
                  </div>
                  <div className="space-y-2">
                    <a
                      href="tel:+4797940097"
                      className="block text-xl font-semibold transition-opacity hover:opacity-80"
                      style={{ color: 'hsl(24, 85%, 50%)' }}
                    >
                      +47 979 40 097
                    </a>
                    <a
                      href="tel:+4792117289"
                      className="block text-xl font-semibold transition-opacity hover:opacity-80"
                      style={{ color: 'hsl(24, 85%, 50%)' }}
                    >
                      +47 921 17 289
                    </a>
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
