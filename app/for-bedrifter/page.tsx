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
              Få virksomheten din til å vokse med Klikk&Send. Nå flere kunder, øk salget og tilby <span style={{ color: 'oklch(70.5% 0.213 47.604)' }}>umiddelbar</span> levering fra butikk.
            </p>
            <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto md:mx-0 mb-6" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              Ønsker du å sende pakker eller varer med oss? Fyll ut skjemaet, så kontakter vi deg med et uforpliktende tilbud tilpasset ditt behov.
            </p>
            <div className="mt-4">
              <a href="/for-bedrifter/registrer" className="text-lg md:text-xl font-semibold underline" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'oklch(70.5% 0.213 47.604)' }}>
                Fyll ut skjema
              </a>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mb-6 md:mb-8" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
          Hvorfor du bør samarbeide med <span style={{ color: 'oklch(70.5% 0.213 47.604)' }}>Klikk&Send</span>
        </h2>

        <div className="space-y-8 md:space-y-12">
          {/* Nå ut til flere kunder */}
          <div className="p-6 md:p-8 rounded-3xl" style={{ backgroundColor: '#F7F7F7', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}>
            <h3 className="text-xl md:text-2xl font-normal mb-4 md:mb-6" style={{ fontFamily: 'var(--font-serif), serif', color: 'oklch(70.5% 0.213 47.604)' }}>
              Nå ut til flere kunder
            </h3>
            <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              Vi har tusenvis av kunder i ditt område som venter på å bestille fra deg, og vi hjelper deg med å levere varen umiddelbart. Når levering skjer umiddelbart, fjerner du ventetid som ofte stopper kjøp. Det gjør at flere fullfører handelen.
            </p>
          </div>

          {/* Øke salget */}
          <div className="p-6 md:p-8 rounded-3xl" style={{ backgroundColor: '#F7F7F7', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}>
            <h3 className="text-xl md:text-2xl font-normal mb-4 md:mb-6" style={{ fontFamily: 'var(--font-serif), serif', color: 'oklch(70.5% 0.213 47.604)' }}>
              Øke salget
            </h3>
            <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              Rask levering fra butikk øker konverteringsraten og gjennomsnittlig handlekurv. Kunder er villig til å legge til ekstra produkter når de får varen umiddelbart. Du selger mer av lageret du allerede har, uten ekstra belastning i butikk.
            </p>
          </div>

          {/* Styrk konkurransekraften */}
          <div className="p-6 md:p-8 rounded-3xl" style={{ backgroundColor: '#F7F7F7', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}>
            <h3 className="text-xl md:text-2xl font-normal mb-4 md:mb-6" style={{ fontFamily: 'var(--font-serif), serif', color: 'oklch(70.5% 0.213 47.604)' }}>
              Styrk konkurransekraften
            </h3>
            <div className="space-y-4 text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              <p>
                Skill deg ut fra konkurrenter som kun tilbyr standard frakt. Med oss kan du tilby en raskere og mer fleksibel løsning som gir bedre kundeopplevelse og flere tilbakevendende kunder. Det er en klar konkurransefordel mot andre butikker som bare tilbyr standard levering.
              </p>
              <p>
                Mange butikker taper penger på varer som blir stående. Med umiddelbar levering kan vi markedsføre "levering umiddelbart" og få fart på salget av lokalt lager.
              </p>
              <p>
                Med rask levering kan vi markedsføre "levering umiddelbart" og få fart på salget av lokalt lager. Det gir deg en tydelig fordel i et marked der leveringstid ofte avgjør hvor kunden handler.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
