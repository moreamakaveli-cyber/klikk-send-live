import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function OmOss() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'hsl(36, 50%, 95%)' }}>
      <Navbar />
      <section className="py-16 md:py-24 px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-8 md:mb-12 text-center" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
              Om oss
            </h1>
            
            <div className="space-y-6 leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              <p className="text-base md:text-lg">
                Klikk&Send drives av Morea og Camilla, to unge entreprenører i Oslo som ønsket en enklere måte å få ting hentet og levert raskt i byen.
              </p>
              
              <p className="text-base md:text-lg">
                Tjenesten startet som en enkel idé: gjøre det lettere å frakte små og mellomstore gjenstander uten å måtte bruke mye penger på drosje eller vente på posten.
              </p>
              
              <p className="text-base md:text-lg">
                Vi opplevde selv hvor tungvint det kan være når man glemmer noe hjemme, skal levere noe til en venn, eller trenger å få hentet et kjøp fra Finn eller Tise. Drosje kan være dyrt for slike oppdrag, og tradisjonell frakt kan ta flere dager.
              </p>
              
              <p className="text-base md:text-lg">
                Derfor startet vi Klikk&Send. En lokal leveringstjeneste som gjør det enkelt å få ting fraktet fra A til B på kort tid. Vi håndterer leveringene selv og jobber for å gjøre tjenesten trygg, rask og enkel å bruke.
              </p>
              
              <p className="text-base md:text-lg">
                Ved å fokusere på korte leveranser i byen ønsker vi også å bidra til mindre transport og en mer bærekraftig hverdag. Smartere lokal levering kan være et lite bidrag til en grønnere by.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
