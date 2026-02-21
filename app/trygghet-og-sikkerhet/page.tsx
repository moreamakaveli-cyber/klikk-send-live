import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TrygghetOgSikkerhet() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
            Trygghet og sikkerhet
          </h1>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg">
              Vi håndterer leveringen selv og tar ansvar for gjenstanden under transport.
            </p>
            
            <p className="text-lg">
              Du betaler først når leveringen er gjennomført.
            </p>
            
            <p className="text-lg">
              Du kan alltid kontakte oss underveis i leveringen.
            </p>
            
            <p className="text-lg">
              Ved henting kan vi vise legitimasjon dersom det er ønskelig.
            </p>
            
            <p className="text-lg">
              Du får beskjed når vi henter og når leveringen er fullført.
            </p>
            
            <p className="text-lg">
              Mottaker bekrefter når gjenstanden er levert.
            </p>
            
            <p className="text-lg mt-8">
              Vi håndterer alle leveringer med stor forsiktighet og ansvar.
            </p>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">
              Ansvar og erstatning
            </h2>
            <p className="text-lg">
              Dersom en gjenstand skulle bli skadet eller mistet under transport, tar vi fullt ansvar.
            </p>
            <p className="text-lg">
              Vi erstatter tap eller skade i dialog med kunden.
            </p>
            
            <p className="text-lg">
              Kundenes tillit betyr mye for oss, og vi jobber for å gjøre tjenesten trygg og pålitelig.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
