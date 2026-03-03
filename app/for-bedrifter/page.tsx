import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

export default function ForBedrifter() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 lg:gap-10 mb-6 md:mb-8">
          <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex-shrink-0">
            <Image
              src="/collaboration-icon-3.svg"
              alt="Bli kunde"
              width={384}
              height={384}
              className="w-full h-full"
            />
          </div>
          <div className="flex-grow">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-6 md:mb-8" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
              Bli kunde
            </h1>
            <div className="space-y-4 md:space-y-6">
              <p className="text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                Få virksomheten din til å vokse med Klikk&Send. Nå flere kunder, øk salget og tilby umiddelbar levering fra butikk.
              </p>
              <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                Ønsker du å sende pakker eller post med oss? Fyll ut skjemaet, så kontakter vi deg med et uforpliktende tilbud tilpasset ditt behov.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mb-6 md:mb-8" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
          Hvorfor du bør samarbeide med oss
        </h2>

        <div className="space-y-8 md:space-y-12">
          {/* Nå ut til flere kunder */}
          <div className="p-6 md:p-8 rounded-3xl" style={{ backgroundColor: '#F7F7F7', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}>
            <h3 className="text-xl md:text-2xl font-normal mb-4 md:mb-6" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
              Nå ut til flere kunder
            </h3>
            <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              Vi har tusenvis av kunder i ditt område som venter på å bestille fra deg, og vi hjelper deg med å levere varen umiddelbart. Når levering skjer umiddelbart, fjerner du ventetid som ofte stopper kjøp. Det gjør at flere fullfører handelen.
            </p>
          </div>

          {/* Øke salget */}
          <div className="p-6 md:p-8 rounded-3xl" style={{ backgroundColor: '#F7F7F7', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}>
            <h3 className="text-xl md:text-2xl font-normal mb-4 md:mb-6" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
              Øke salget
            </h3>
            <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              Rask levering fra butikk øker konverteringsraten og gjennomsnittlig handlekurv. Kunder er villig til å legge til ekstra produkter når de får varen umiddelbart. Du selger mer av lageret du allerede har, uten ekstra belastning i butikk.
            </p>
          </div>

          {/* Styrk konkurransekraften */}
          <div className="p-6 md:p-8 rounded-3xl" style={{ backgroundColor: '#F7F7F7', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}>
            <h3 className="text-xl md:text-2xl font-normal mb-4 md:mb-6" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
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

        <div className="mt-12 md:mt-16 pt-8 border-t" style={{ borderColor: '#E5E5E5' }}>
          <p className="text-base md:text-lg" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
            For english version click here
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
