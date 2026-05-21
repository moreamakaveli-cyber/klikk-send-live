import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import Button from "../components/ui/button";

export default function OrderCancelled() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-normal mb-4" style={{ fontFamily: "var(--font-serif), serif", color: "hsl(150, 30%, 15%)" }}>
            Betaling avbrutt
          </h1>
          <p className="text-lg mb-10" style={{ color: "hsl(150, 10%, 45%)" }}>
            Du kan prøve igjen når du er klar.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/bestill">
              <Button variant="hero-primary" className="px-8 py-3">
                Tilbake til bestilling
              </Button>
            </Link>
            <Link href="/">
              <Button variant="hero-secondary" className="px-8 py-3">
                Forside
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
