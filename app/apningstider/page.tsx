import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Apningstider() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
            Åpningstider
          </h1>
          
          <div className="text-center">
            <p className="text-2xl md:text-3xl text-gray-700 font-medium">
              08:00 til 21:00 mandag til søndag
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
