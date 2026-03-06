import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Samarbeid() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-8 md:mb-12" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
          Slik fungerer samarbeid
        </h1>

        <div className="max-w-3xl space-y-8 md:space-y-12">
          <div>
            <h2 className="text-xl md:text-2xl font-normal mb-4 md:mb-6" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
              Tilby hjemlevering til dine kunder uten ekstra arbeid i butikken.
            </h2>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div>
              <h3 className="text-lg md:text-xl font-normal mb-3 md:mb-4" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
                SMS-link til kunden
              </h3>
              <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                Når plagget er klart sender bedriften en vanlig hentemelding til kunden. I meldingen kan kunden velge hjemmelevering med Hently.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-normal mb-3 md:mb-4" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
                QR-kode i butikken
              </h3>
              <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                Kunden kan også skanne en QR-kode i butikken og bestille levering selv.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-normal mb-3 md:mb-4" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
                Betaling
              </h3>
              <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                Kunden betaler én gang til bedriften, inkludert levering. Bedriften overfører deretter Hently sin andel, for eksempel via Vipps eller månedlig oppgjør.
              </p>
            </div>
          </div>

          <div className="pt-8">
            <Link href="/">
              <button className="rounded-full px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: 'oklch(70.5% 0.213 47.604)', fontFamily: 'var(--font-sans), sans-serif' }}>
                Tilbake til forsiden
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
