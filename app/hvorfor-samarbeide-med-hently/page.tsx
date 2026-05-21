import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const benefits = [
  {
    title: "Tilby en rask og fleksibel tjeneste som møter dagens kundebehov",
    points: [
      {
        subtitle: "Gjør bedriften mer attraktiv for kunder",
        text: "Ved å tilby Hently fremstår bedriften som rask, innovativ og kundevennlig.",
      },
    ],
  },
  {
    title: "Øk konkurransekraften",
    text: "Skill deg ut fra bedrifter som fortsatt tilbyr treg levering — eller ingen levering i det hele tatt.",
  },
  {
    title: "Tiltrekk flere kunder",
    text: "Mange velger bort kjøp når levering tar for lang tid eller henting er upraktisk.",
  },
  {
    title: "Øk kundelojaliteten",
    text: "Raske og gode opplevelser gjør at kunder kommer tilbake.",
  },
  {
    title: "Bedre utnyttelse av klikk & hent",
    text: "Perfekt for kunder som ønsker varen raskt, men ikke har tid til å hente selv.",
  },
  {
    title: "Styrk merkevaren",
    text: "Bedriften fremstår mer serviceorientert, effektiv og kundevennlig.",
  },
  {
    title: "Tilpasset moderne forbrukere",
    text: "I dag forventer kunder at ting skal være raskt, enkelt og tilgjengelig med én gang.",
  },
];

export default function HvorforSamarbeideMedHentlyPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-12 md:py-16">
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-normal mb-4"
          style={{
            fontFamily: "var(--font-serif), serif",
            color: "hsl(150, 30%, 15%)",
          }}
        >
          <span style={{ color: "oklch(70.5% 0.213 47.604)" }}>Hvorfor</span> samarbeide
          med Hently?
        </h1>
        <p
          className="text-lg md:text-xl mb-10 md:mb-12 max-w-3xl"
          style={{
            fontFamily: "var(--font-sans), sans-serif",
            color: "hsl(150, 10%, 45%)",
          }}
        >
          Gjør bedriften mer moderne og fremtidsrettet
        </p>

        <div className="max-w-3xl space-y-8 md:space-y-10">
          <ul
            className="space-y-8 md:space-y-10"
            style={{
              fontFamily: "var(--font-sans), sans-serif",
              color: "hsl(150, 30%, 15%)",
            }}
          >
            {benefits.map((item) => (
              <li key={item.title} className="flex items-start gap-4">
                <span
                  className="font-bold mt-1 text-xl flex-shrink-0"
                  style={{ color: "oklch(70.5% 0.213 47.604)" }}
                >
                  •
                </span>
                <div className="space-y-3">
                  <span className="font-semibold text-lg md:text-xl block">
                    {item.title}
                  </span>
                  {"points" in item && item.points ? (
                    item.points.map((point) => (
                      <div key={point.subtitle} className="space-y-1 pl-0">
                        <p className="font-semibold text-base md:text-lg">
                          {point.subtitle}
                        </p>
                        <p className="text-base md:text-lg leading-relaxed">
                          {point.text}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-base md:text-lg leading-relaxed">
                      {item.text}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <blockquote
            className="rounded-2xl p-6 md:p-8 border-l-4"
            style={{
              backgroundColor: "#F7F7F7",
              borderColor: "oklch(70.5% 0.213 47.604)",
              fontFamily: "var(--font-serif), serif",
              color: "hsl(150, 30%, 15%)",
            }}
          >
            <p className="text-base md:text-lg leading-relaxed italic">
              «I fremtiden konkurrerer ikke bedrifter bare på pris og produkt — men på
              hvor raskt og enkelt kunden får det.»
            </p>
          </blockquote>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link href="/for-bedrifter">
              <button
                className="rounded-full px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "oklch(70.5% 0.213 47.604)",
                  fontFamily: "var(--font-sans), sans-serif",
                }}
              >
                Start samarbeid
              </button>
            </Link>
            <Link href="/">
              <button
                className="rounded-full px-8 py-3 font-semibold transition-opacity hover:opacity-90 border border-gray-200"
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  color: "hsl(150, 30%, 15%)",
                }}
              >
                Tilbake til forsiden
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
