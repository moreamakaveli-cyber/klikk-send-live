import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Apningstider() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'hsl(36, 50%, 95%)' }}>
      <Navbar />
      <section className="py-16 md:py-24 px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-8 md:mb-12 text-center" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
              Åpningstider
            </h1>
            
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                08:00 til 23:00 mandag til søndag
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
