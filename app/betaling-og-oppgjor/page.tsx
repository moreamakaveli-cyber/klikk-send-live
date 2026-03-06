import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function BetalingOgOppgjor() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-8 md:mb-12" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
          Betaling og oppgjør
        </h1>

        <div className="max-w-3xl space-y-8 md:space-y-12">
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="text-xl md:text-2xl font-normal mb-3 md:mb-4" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
                Hvem betaler kunden til?
              </h2>
              <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                Kunden betaler én gang til bedriften, inkludert leveringen.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-normal mb-3 md:mb-4" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
                Hvordan får Hently sin andel?
              </h2>
              <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                Bedriften overfører Hently sin andel av leveringen, for eksempel via Vipps eller samlet oppgjør ukentlig eller månedlig.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-normal mb-3 md:mb-4" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
                Hvor mye koster levering?
              </h2>
              <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                Levering har en fast pris på 119 kr.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-normal mb-3 md:mb-4" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
                Må bedriften gjøre ekstra arbeid?
              </h2>
              <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                Nei. Kunden bestiller leveringen selv via SMS-link eller QR-kode. Bedriften fortsetter som før.
              </p>
            </div>

            <div className="pt-4">
              <p className="text-base md:text-lg leading-relaxed font-medium" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                Dette gjør betalingsflyten enkel for både bedriften og kunden.
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/for-bedrifter">
              <button className="rounded-full px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: 'oklch(70.5% 0.213 47.604)', fontFamily: 'var(--font-sans), sans-serif' }}>
                Start samarbeid
              </button>
            </Link>
            <Link href="/">
              <button className="rounded-full px-8 py-3 font-semibold transition-opacity hover:opacity-90 border-2" style={{ backgroundColor: 'transparent', borderColor: 'oklch(70.5% 0.213 47.604)', color: 'oklch(70.5% 0.213 47.604)', fontFamily: 'var(--font-sans), sans-serif' }}>
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
