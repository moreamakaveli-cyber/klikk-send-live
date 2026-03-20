import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function JobbIHently() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Navbar />
      <section className="pt-6 pb-12 md:pt-8 md:pb-16 px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="w-full space-y-4 md:space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
                <div className="space-y-6 text-center lg:text-left lg:max-w-2xl lg:mx-auto mt-8 md:mt-12 lg:ml-12">
                  <h1
                    className="text-5xl md:text-6xl lg:text-6xl font-normal"
                    style={{ fontFamily: "var(--font-serif), serif", color: "hsl(150, 30%, 15%)" }}
                  >
                    Jobb i Hently
                  </h1>
                  <div
                    className="text-lg md:text-xl leading-relaxed"
                    style={{ fontFamily: "var(--font-sans), sans-serif", color: "hsl(150, 30%, 15%)" }}
                  >
                    <p>
                      <span className="text-xl md:text-2xl" style={{ color: "oklch(70.5% 0.213 47.604)" }}>Bli budpartner i Hently</span>
                      <br />
                      Tjen penger på dine egne premisser.
                      <br />
                      Ser du etter en fleksibel jobb der du styrer din egen hverdag?
                      <br />
                      Som bud i Hently velger du selv når og hvor mye du vil jobbe. Du kan ta noen få oppdrag i ny og ne, eller jobbe mer fast – det er opp til deg.
                    </p>
                    <Link
                      href="/jobb-i-hently/sok"
                      className="inline-block mt-4 text-base md:text-lg font-semibold hover:opacity-80 transition-opacity"
                      style={{ color: "oklch(70.5% 0.213 47.604)" }}
                    >
                      Søk her
                    </Link>
                  </div>
                </div>

                <div className="w-full max-w-md lg:ml-auto lg:-translate-x-4 lg:-translate-y-6">
                  <Image
                    src="/messenger-rafiki.svg"
                    alt="Jobb i Hently illustrasjon"
                    width={700}
                    height={700}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>

              <div className="space-y-3">
                <details className="group rounded-2xl p-4 md:p-5" style={{ backgroundColor: "#F7F7F7" }}>
                  <summary
                    className="list-none cursor-pointer flex items-center justify-between gap-4"
                    style={{ fontFamily: "var(--font-serif), serif", color: "oklch(70.5% 0.213 47.604)" }}
                  >
                    <span className="text-2xl md:text-3xl font-normal">Slik fungerer det</span>
                    <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <div
                    className="mt-4 space-y-5 text-base md:text-lg leading-relaxed"
                    style={{ fontFamily: "var(--font-sans), sans-serif", color: "hsl(150, 30%, 15%)" }}
                  >
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold mb-1">1. Motta oppdrag</h3>
                      <p>Når du er tilgjengelig, mottar du forespørsler om oppdrag i vårt system.</p>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold mb-1">2. Hent vare</h3>
                      <p>
                        Du får oppdrag nær deg gjennom systemet vårt, slik at du slipper unødvendig reising. Du kan også velge oppdrag i andre områder. Ofte får du flere leveringer fra samme sted, slik at du kan hente og levere flere ordre samtidig.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold mb-1">3. Lever</h3>
                      <p>Du leverer direkte til mottaker – raskt og profesjonelt.</p>
                    </div>
                  </div>
                </details>
              </div>

              <div className="space-y-3">
                <details className="group rounded-2xl p-4 md:p-5" style={{ backgroundColor: "#F7F7F7" }}>
                  <summary
                    className="list-none cursor-pointer flex items-center justify-between gap-4"
                    style={{ fontFamily: "var(--font-serif), serif", color: "oklch(70.5% 0.213 47.604)" }}
                  >
                    <span className="text-2xl md:text-3xl font-normal">Hvorfor jobbe med oss</span>
                    <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <ul
                    className="mt-4 space-y-2 text-base md:text-lg"
                    style={{ fontFamily: "var(--font-sans), sans-serif", color: "hsl(150, 30%, 15%)" }}
                  >
                    <li>Fleksibel arbeidstid – jobb når det passer deg</li>
                    <li>Ukentlige utbetalinger</li>
                    <li>Enkelt system og tydelige oppdrag</li>
                  </ul>
                </details>

                <details className="group rounded-2xl p-4 md:p-5" style={{ backgroundColor: "#F7F7F7" }}>
                  <summary
                    className="list-none cursor-pointer flex items-center justify-between gap-4"
                    style={{ fontFamily: "var(--font-serif), serif", color: "oklch(70.5% 0.213 47.604)" }}
                  >
                    <span className="text-2xl md:text-3xl font-normal">Hva vi tilbyr</span>
                    <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <ul
                    className="mt-4 space-y-2 text-base md:text-lg"
                    style={{ fontFamily: "var(--font-sans), sans-serif", color: "hsl(150, 30%, 15%)" }}
                  >
                    <li>Mulighet for utvikling og nye roller over tid</li>
                    <li>Opplæring og tett oppfølging</li>
                    <li>Sosiale samlinger og et inkluderende miljø</li>
                    <li>Støtte til transport, som månedskort (der det er aktuelt).</li>
                  </ul>
                </details>

                <details className="group rounded-2xl p-4 md:p-5" style={{ backgroundColor: "#F7F7F7" }}>
                  <summary
                    className="list-none cursor-pointer flex items-center justify-between gap-4"
                    style={{ fontFamily: "var(--font-serif), serif", color: "oklch(70.5% 0.213 47.604)" }}
                  >
                    <span className="text-2xl md:text-3xl font-normal">Hva vi ser etter</span>
                    <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <ul
                    className="mt-4 space-y-2 text-base md:text-lg"
                    style={{ fontFamily: "var(--font-sans), sans-serif", color: "hsl(150, 30%, 15%)" }}
                  >
                    <li>Du er pålitelig og møter opp til avtalt tid</li>
                    <li>Du gir god kundeservice</li>
                    <li>Du snakker norsk eller engelsk</li>
                    <li>Du kan levere med bil, sykkel, scooter eller kollektivtransport</li>
                  </ul>
                </details>
              </div>

          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
