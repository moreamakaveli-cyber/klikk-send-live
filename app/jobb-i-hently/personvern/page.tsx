import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function PersonvernBudPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Navbar />
      <section className="pt-6 pb-12 md:pt-8 md:pb-16 px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-4xl space-y-6 md:space-y-8">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-normal"
              style={{ fontFamily: "var(--font-serif), serif", color: "hsl(150, 30%, 15%)" }}
            >
              Personvernerklaering - Hently
            </h1>

            <p
              className="text-base md:text-lg"
              style={{ fontFamily: "var(--font-sans), sans-serif", color: "hsl(150, 10%, 40%)" }}
            >
              Sist oppdatert: 20.03.2026
            </p>

            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ fontFamily: "var(--font-sans), sans-serif", color: "hsl(150, 30%, 15%)" }}
            >
              Denne erklæringen forklarer hvilke opplysninger vi samler inn, hvorfor vi gjør det, og hvordan vi bruker dem.
            </p>

            <div className="space-y-5 md:space-y-6" style={{ color: "hsl(150, 30%, 15%)" }}>
              <div className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                  1. Hvilke opplysninger vi samler inn
                </h2>
                <p className="text-base md:text-lg" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                  Når du søker som budpartner eller bruker våre tjenester, kan vi samle inn:
                </p>
                <ul className="space-y-1 text-base md:text-lg" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                  <li>Navn</li>
                  <li>E-postadresse</li>
                  <li>Telefonnummer</li>
                  <li>Informasjon om kjoretoy</li>
                  <li>Lokasjon (ved bruk av tjenesten)</li>
                  <li>Annen informasjon du selv oppgir</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                  2. Hva vi bruker opplysningene til
                </h2>
                <p className="text-base md:text-lg" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                  Vi bruker opplysningene for å:
                </p>
                <ul className="space-y-1 text-base md:text-lg" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                  <li>Behandle soknader fra budpartnere</li>
                  <li>Administrere og levere tjenester</li>
                  <li>Koble bud med oppdrag</li>
                  <li>Kommunisere med deg</li>
                  <li>Forbedre tjenesten</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                  3. Deling av opplysninger
                </h2>
                <p className="text-base md:text-lg" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                  Vi deler ikke dine personopplysninger med tredjeparter, med mindre det er nodvendig for å:
                </p>
                <ul className="space-y-1 text-base md:text-lg" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                  <li>Levere tjenesten (for eksempel koble bud og kunde)</li>
                  <li>Overholde lovpalagte krav</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                  4. Lagring av data
                </h2>
                <p className="text-base md:text-lg" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                  Vi lagrer opplysningene dine så lenge det er nodvendig for formalene beskrevet over, eller så lenge loven krever det.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                  5. Dine rettigheter
                </h2>
                <p className="text-base md:text-lg" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                  Du har rett til å:
                </p>
                <ul className="space-y-1 text-base md:text-lg" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                  <li>Fa innsyn i hvilke opplysninger vi har om deg</li>
                  <li>Be om retting eller sletting</li>
                  <li>Trekke tilbake samtykke</li>
                </ul>
                <p className="text-base md:text-lg" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                  Kontakt oss pa:{" "}
                  <a href="mailto:morea0605@outlook.com" className="underline" style={{ color: "oklch(70.5% 0.213 47.604)" }}>
                    morea0605@outlook.com
                  </a>
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                  6. Sikkerhet
                </h2>
                <p className="text-base md:text-lg" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                  Vi tar rimelige tiltak for å beskytte dine personopplysninger mot uautorisert tilgang og misbruk.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                  7. Kontakt
                </h2>
                <p className="text-base md:text-lg" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                  Har du spørsmål om personvern, kan du kontakte oss på:
                </p>
                <a
                  href="mailto:morea0605@outlook.com"
                  className="text-base md:text-lg underline"
                  style={{ fontFamily: "var(--font-sans), sans-serif", color: "oklch(70.5% 0.213 47.604)" }}
                >
                  morea0605@outlook.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
