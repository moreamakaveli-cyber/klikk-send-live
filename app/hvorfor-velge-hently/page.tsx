import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function HvorforVelgeHently() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-8 md:mb-12" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
          Hvorfor velge Hently?
        </h1>

        <div className="max-w-3xl space-y-6 md:space-y-8">
          <ul className="space-y-6 md:space-y-8 text-base md:text-lg" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
            <li className="flex items-start gap-4">
              <span className="font-bold mt-1 text-xl" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>•</span>
              <div>
                <span className="font-semibold text-lg md:text-xl block mb-2">Umiddelbar henting og levering</span>
                <p>Vi henter varer hos bedriften og leverer direkte til kunden.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="font-bold mt-1 text-xl" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>•</span>
              <div>
                <span className="font-semibold text-lg md:text-xl block mb-2">Bedre service til kundene</span>
                <p>Gi kundene mulighet til å få varer levert hjem.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="font-bold mt-1 text-xl" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>•</span>
              <div>
                <span className="font-semibold text-lg md:text-xl block mb-2">Ingen ekstra arbeid</span>
                <p>Kunden bestiller leveringen selv via SMS-link eller QR-kode. En enkel løsning for både bedriften og kunden.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="font-bold mt-1 text-xl" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>•</span>
              <div>
                <span className="font-semibold text-lg md:text-xl block mb-2">Enkelt samarbeid</span>
                <p>Bedriften fortsetter som før – Hently håndterer transporten.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="font-bold mt-1 text-xl" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>•</span>
              <div>
                <span className="font-semibold text-lg md:text-xl block mb-2">God kundeservice</span>
                <p>Vi sørger for god oppfølging og en trygg levering for kundene.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="font-bold mt-1 text-xl" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>•</span>
              <div>
                <span className="font-semibold text-lg md:text-xl block mb-2">Ingen binding</span>
                <p>Samarbeidet er fleksibelt, og kan avsluttes når som helst.</p>
              </div>
            </li>
          </ul>

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
