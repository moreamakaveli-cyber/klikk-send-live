import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function Samarbeid() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-8 md:mb-12" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
          Slik fungerer samarbeidet
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="lg:col-span-2 space-y-8 md:space-y-12">
            <div>
              <h2 className="text-xl md:text-2xl font-normal mb-4 md:mb-6" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
                Tilby hjemlevering til kundene dine uten ekstra arbeid i butikken.
              </h2>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div>
                <h3 className="text-lg md:text-xl font-normal mb-3 md:mb-4" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
                  Bestilling
                </h3>
                <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                  Når plagget er klart sender butikken en vanlig hentemelding til kunden. I meldingen kan kunden velge hjemlevering via en SMS-link fra Hently. Kunden kan også skanne en QR-kode i butikken og bestille levering selv.
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-normal mb-3 md:mb-4" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
                  Henting og levering
                </h3>
                <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                  Når kunden bestiller, mottar Hently oppdraget. Vi henter pakken i butikken og leverer den hjem til kunden.
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-normal mb-3 md:mb-4" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
                  Arbeid i butikken
                </h3>
                <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                  Butikken pakker varen som vanlig. Hently håndterer transport og levering.
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-normal mb-3 md:mb-4" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
                  Betaling
                </h3>
                <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                  Kunden betaler til butikken, inkludert leveringen. Butikken overfører deretter Hently sin andel, enten per oppdrag via Vipps eller samlet i et månedlig oppgjør.
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

          <div className="flex justify-end items-start">
            <Image
              src="/good-team.svg"
              alt="Samarbeid"
              width={250}
              height={250}
              className="w-full max-w-xs md:max-w-sm h-auto"
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
