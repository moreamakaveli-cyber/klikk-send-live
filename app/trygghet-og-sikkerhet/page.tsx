import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TrygghetOgSikkerhet() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'hsl(36, 50%, 95%)' }}>
      <Navbar />
      <section className="py-16 md:py-24 px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-8 md:mb-12 text-center" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
              Trygghet og sikkerhet
            </h1>
            
            <div className="space-y-6 leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              <p className="text-base md:text-lg">
                Vi håndterer leveringen selv og tar ansvar for gjenstanden under transport.
              </p>
              
              <p className="text-base md:text-lg">
                Du betaler først når leveringen er gjennomført.
              </p>
              
              <p className="text-base md:text-lg">
                Du kan alltid kontakte oss underveis i leveringen.
              </p>
              
              <p className="text-base md:text-lg">
                Ved henting kan vi vise legitimasjon dersom det er ønskelig.
              </p>
              
              <p className="text-base md:text-lg">
                Du får beskjed når vi henter og når leveringen er fullført.
              </p>
              
              <p className="text-base md:text-lg">
                Mottaker bekrefter når gjenstanden er levert.
              </p>
              
              <p className="text-base md:text-lg mt-8">
                Vi håndterer alle leveringer med stor forsiktighet og ansvar.
              </p>
              
              <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4" style={{ fontFamily: 'var(--font-serif), serif' }}>
                Ansvar og erstatning
              </h2>
              <p className="text-base md:text-lg">
                Dersom en gjenstand skulle bli skadet eller mistet under transport, tar vi fullt ansvar.
              </p>
              <p className="text-base md:text-lg">
                Vi erstatter tap eller skade i dialog med kunden.
              </p>
              
              <p className="text-base md:text-lg">
                Kundenes tillit betyr mye for oss, og vi jobber for å gjøre tjenesten trygg og pålitelig.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
