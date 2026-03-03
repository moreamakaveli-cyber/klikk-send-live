import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

export default function BedriftTakk() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      <Navbar />
      <section className="py-16 md:py-24 px-6 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-6 md:mb-8" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
            Takk for forespørselen!
          </h1>
          
          <p className="text-lg md:text-xl leading-relaxed mb-8 md:mb-12" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
            Vi har mottatt informasjonen din. Vi kontakter deg innen 24 timer for å gå gjennom behovet deres og gi et tilpasset tilbud.
          </p>

          <p className="text-base md:text-lg mb-8 md:mb-12" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
            Har du spørsmål i mellomtiden? Kontakt oss på{" "}
            <a 
              href="mailto:oslo@klikkogsend.no" 
              className="underline hover:opacity-80 transition-opacity"
              style={{ color: 'oklch(70.5% 0.213 47.604)' }}
            >
              oslo@klikkogsend.no
            </a>
          </p>

          <Link href="/">
            <button 
              className="rounded-full px-8 py-4 font-semibold text-white transition-opacity hover:opacity-90"
              style={{ 
                backgroundColor: 'oklch(70.5% 0.213 47.604)',
                fontFamily: 'var(--font-sans), sans-serif'
              }}
            >
              Tilbake til forsiden
            </button>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
