import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function UmiddelbarLeveringISlo() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-12 md:py-16">
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-normal mb-8 md:mb-12"
          style={{
            fontFamily: "var(--font-serif), serif",
            color: "hsl(150, 30%, 15%)",
          }}
        >
          <span style={{ color: "oklch(70.5% 0.213 47.604)" }}>Umiddelbar</span>{" "}
          levering i hele Oslo
        </h1>

        <div className="max-w-3xl">
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{
              fontFamily: "var(--font-sans), sans-serif",
              color: "hsl(150, 30%, 15%)",
            }}
          >
            <span style={{ color: "#000000", fontWeight: 600 }}>
              Tilby umiddelbar levering direkte hjem til dine kunder i hele Oslo.
            </span>
            <br />
            <br />
            Vi henter og leverer varer raskt etter bestilling og håndterer hele leveringsprosessen, fra henting til levering.
            Med dekning i hele Oslo kan du nå kunder i alle bydeler.
            <br />
            <br />
            Med oss får du en fleksibel og effektiv løsning som styrker både kundeopplevelse og konkurransekraft.
          </p>
        </div>

        <div className="pt-8">
          <Link href="/">
            <button
              className="rounded-full px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "oklch(70.5% 0.213 47.604)",
                fontFamily: "var(--font-sans), sans-serif",
              }}
            >
              Tilbake til forsiden
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}

