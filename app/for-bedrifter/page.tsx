import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

export default function ForBedrifter() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 lg:gap-10 mb-6 md:mb-8 mt-12 md:mt-16 lg:mt-20">
          <div className="w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] flex-shrink-0 mx-auto md:mx-0">
            <Image
              src="/team-goals.svg"
              alt="Bli kunde"
              width={448}
              height={448}
              className="w-full h-full"
            />
          </div>
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-6 md:mb-8" style={{ fontFamily: 'var(--font-serif), serif', color: 'oklch(70.5% 0.213 47.604)' }}>
              Bli kunde
            </h1>
            <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto md:mx-0 mb-6" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              Få virksomheten din til å vokse med Hently. Nå flere kunder, øk salget og tilby <span style={{ color: 'oklch(70.5% 0.213 47.604)' }}>umiddelbar</span> levering fra butikk.
            </p>
            <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto md:mx-0 mb-6" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              Ønsker du å sende pakker eller varer med oss? Fyll ut skjemaet, så kontakter vi deg med et <strong>uforpliktende tilbud tilpasset ditt behov</strong>.
            </p>
            <div className="mt-4 space-y-2">
              <a href="/for-bedrifter/registrer" className="text-lg md:text-xl font-semibold underline" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'oklch(70.5% 0.213 47.604)' }}>
                Fyll ut skjema
              </a>
              <p className="text-base md:text-lg" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                Spørsmål? <a href="mailto:oslo@hently.no" className="underline" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>oslo@hently.no</a>
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mb-6 md:mb-8" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
          Hvorfor du bør samarbeide med <span style={{ color: 'oklch(70.5% 0.213 47.604)' }}>Hently</span>
        </h2>

        <div className="space-y-8 md:space-y-12">
          {/* Nå ut til flere kunder */}
          <div className="p-6 md:p-8 rounded-3xl" style={{ backgroundColor: '#F7F7F7', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}>
            <h3 className="text-xl md:text-2xl font-normal mb-4 md:mb-6" style={{ fontFamily: 'var(--font-serif), serif', color: 'oklch(70.5% 0.213 47.604)' }}>
              Nå ut til flere kunder
            </h3>
            <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              Vi hjelper deg å nå flere kunder i ditt område ved å tilby rask levering direkte fra din bedrift. Når levering kan skje umiddelbart, fjerner du ventetid som ofte stopper kjøp. Det gjør at flere velger din bedrift.
            </p>
          </div>

          {/* Øk verdien av tjenesten */}
          <div className="p-6 md:p-8 rounded-3xl" style={{ backgroundColor: '#F7F7F7', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}>
            <h3 className="text-xl md:text-2xl font-normal mb-4 md:mb-6" style={{ fontFamily: 'var(--font-serif), serif', color: 'oklch(70.5% 0.213 47.604)' }}>
              Øk verdien av tjenesten
            </h3>
            <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              Når du kan tilby hjemlevering av ferdige klær eller vask, blir tjenesten mer attraktiv for kundene. Mange setter pris på å slippe en ekstra tur til butikken.
            </p>
          </div>

          {/* Styrk konkurransekraften */}
          <div className="p-6 md:p-8 rounded-3xl" style={{ backgroundColor: '#F7F7F7', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}>
            <h3 className="text-xl md:text-2xl font-normal mb-4 md:mb-6" style={{ fontFamily: 'var(--font-serif), serif', color: 'oklch(70.5% 0.213 47.604)' }}>
              Styrk konkurransekraften
            </h3>
            <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              Skill deg ut fra konkurrenter som kun tilbyr vanlig henting i butikk. Med Hently kan du tilby en rask og fleksibel leveringsløsning som gir en bedre kundeopplevelse og flere fornøyde kunder.
            </p>
          </div>

          {/* Synlighet og markedsføring */}
          <div className="p-6 md:p-8 rounded-3xl" style={{ backgroundColor: '#F7F7F7', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}>
            <h3 className="text-xl md:text-2xl font-normal mb-4 md:mb-6" style={{ fontFamily: 'var(--font-serif), serif', color: 'oklch(70.5% 0.213 47.604)' }}>
              Synlighet og markedsføring
            </h3>
            <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              Bedrifter som samarbeider med Hently kan også bli synlige på vår plattform. Dette kan bidra til at flere kunder oppdager og velger din bedrift.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
