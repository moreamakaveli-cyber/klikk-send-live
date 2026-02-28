import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const faqItems = [
  {
    id: 1,
    title: "Sporing",
    question: "Lurer du på hvor pakken din er?",
    text: "Vi jobber med å få på plass sporingsløsning så snart som mulig. Inntil videre kan du når som helst ta kontakt med oss dersom du lurer på hvor bestillingen din er. Vi svarer raskt og hjelper deg hele veien.",
    linkText: "Kontakt oss",
    linkHref: "/kontakt-oss",
  },
  {
    id: 2,
    title: "Leveringstid",
    question: "Når blir pakken levert?",
    text: "Vi leverer så snart som mulig. Når bestillingen er mottatt, kontakter vi umiddelbart et bud som henter pakken og sørger for sikker levering innenfor leveringsområdet. Du vil få bekreftelse på SMS når budet ankommer.",
    linkText: "Bestill nå",
    linkHref: "/bestill",
  },
  {
    id: 3,
    title: "Hva kan vi levere?",
    question: "Vi leverer små og mellomstore gjenstander",
    text: "Vi hjelper deg med levering av små og mellomstore ting, alltid raskt og trygt. Dette kan for eksempel være pakker, dokumenter, mindre esker og andre hverdagslige leveranser.",
    linkText: "Les mer",
    linkHref: "/pakkeinnhold",
  },
  {
    id: 4,
    title: "Betaling",
    question: "Når betaler jeg?",
    text: "Hos oss betaler du først når pakken er levert. Dette gir deg en trygg og enkel handel – ingen betaling før du har mottatt bestillingen din.",
    linkText: "Les mer",
    linkHref: "/trygghet-og-sikkerhet",
  },
  {
    id: 5,
    title: "Kundeservice",
    question: "Har du spørsmål eller trenger hjelp?",
    text: "Hvis du ikke finner svaret du leter etter, er du alltid velkommen til å kontakte oss. Vi svarer raskt og gjør vårt beste for å hjelpe deg.",
    linkText: "Kontakt oss",
    linkHref: "/kontakt-oss",
  },
];

export default function DetteLurerMangePa() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'hsl(36, 50%, 95%)' }}>
      <Navbar />
      <section className="py-16 md:py-24 px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-12 md:mb-16 text-center" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
            Ofte stilte spørsmål
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
              >
                <h2 className="text-xl md:text-2xl font-semibold mb-2" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                  {item.title}
                </h2>
                <h3 className="text-lg md:text-xl font-semibold mb-3" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                  {item.question}
                </h3>
                <p className="mb-6 flex-grow leading-relaxed text-base md:text-lg" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                  {item.text}
                </p>
                <Link
                  href={item.linkHref}
                  className="font-semibold transition-opacity hover:opacity-80 text-sm md:text-base"
                  style={{ color: 'hsl(24, 85%, 50%)' }}
                >
                  {item.linkText} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
