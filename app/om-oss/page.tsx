import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function OmOss() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      <Navbar />
      <section className="py-16 md:py-24 px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-8 md:mb-12 text-center" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
              Om oss
            </h1>
            
            <div className="space-y-6 leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              <p className="text-base md:text-lg">
                Klikk&Send ble startet for å gjøre lokal levering enklere og raskere. Vi tilbyr en effektiv løsning for henting og levering av små og mellomstore gjenstander, uten at du må betale for en dyr drosjetur eller vente flere dager på tradisjonell frakt.
              </p>
              
              <p className="text-base md:text-lg">
                Behovet oppstod fordi vi selv erfarte hvor upraktisk det er når man glemmer noe hjemme, skal sende noe til en venn, eller trenger rask levering av et kjøp.
              </p>
              
              <p className="text-base md:text-lg">
                Klikk&Send er en lokal leveringstjeneste som frakter ting fra A til B på kort tid. Vi jobber for å gjøre tjenesten trygg, rask og enkel å bruke.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
