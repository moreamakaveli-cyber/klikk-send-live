"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import ImageSlideshow from "../components/ImageSlideshow";

export default function VoksBedriftenDin() {
  // Slideshow images
  const slideshowImages = [
    "/slideshow-1.png",
    "/slideshow-2.png",
  ];

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-8 md:mb-12" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
          Få bedriften din til å vokse med Hently
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left side: Text content */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4 md:space-y-6 text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              <p>
                Hos Hently hjelper vi bedrifter med å nå ut til flere relevante kunder og øke omsetningen på en effektiv måte. Når du samarbeider med oss, får du tilgang til en ny kundedatabase med brukere som allerede er interessert i det du tilbyr.
              </p>

              <p>
                Vi fungerer som en kobling mellom deg og potensielle kunder. Gjennom vår plattform eksponeres produktene og tjenestene dine for riktig målgruppe. Du slipper å bruke tid og penger på bred og lite målrettet markedsføring.
              </p>

              <p>
                I tillegg jobber vi aktivt med synlighet. Vi løfter frem bedriften din gjennom våre egne kanaler, inkludert sosiale medier og digitale plattformer der målgruppen din allerede er. Dette gir økt eksponering, styrker merkevaren din og skaper flere konkrete henvendelser.
              </p>

              <p>
                Målet vårt er enkelt: å skape flere kundemøter for din bedrift. Flere relevante leads gir flere salg, og flere salg gir økt inntekt og vekst.
              </p>

              <p>
                Med Hently får du ikke bare synlighet – du får et system som kontinuerlig jobber for å skaffe deg nye kunder.{" "}
                <Link href="/for-bedrifter" className="font-semibold transition-opacity hover:opacity-80" style={{ color: 'oklch(70.5% 0.213 47.604)', fontFamily: 'var(--font-sans), sans-serif' }}>
                  Samarbeid med oss
                </Link>
              </p>
            </div>
          </div>

          {/* Right side: Slideshow */}
          <div className="lg:sticky lg:top-24">
            <ImageSlideshow images={slideshowImages} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
