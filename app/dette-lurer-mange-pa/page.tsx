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
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            Ofte stilte spørsmål
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h2>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {item.question}
                </h3>
                <p className="text-gray-700 mb-6 flex-grow leading-relaxed">
                  {item.text}
                </p>
                <Link
                  href={item.linkHref}
                  className="text-orange-600 font-medium hover:text-orange-700 transition-colors text-sm"
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
