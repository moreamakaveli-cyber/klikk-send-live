"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronDown } from "lucide-react";

export default function LagringLagerOsloPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Navbar />
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="max-w-3xl space-y-8 md:space-y-10">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-normal"
            style={{
              fontFamily: "var(--font-serif), serif",
              color: "hsl(150, 30%, 15%)",
            }}
          >
            Vi tilbyr lagring i vårt lager i Oslo
          </h1>

          <div
            className="space-y-6 md:space-y-8 text-base md:text-lg"
            style={{
              fontFamily: "var(--font-sans), sans-serif",
              color: "hsl(150, 30%, 15%)",
            }}
          >
            <p className="font-semibold leading-relaxed">
              Driver du en nett- eller fysisk butikk? Selger du produkter som kan leveres raskere
              til kundene dine?
            </p>

            <p className="leading-relaxed">
              Vi har et lager midt i Oslo sentrum. Oslo er Norges største marked, med høy
              etterspørsel og mange aktive netthandlere. Det spiller ingen rolle hva du selger –
              alt fra sykkelutstyr til håndlagde smykker.
            </p>

            <p className="leading-relaxed">
              Dette fungerer spesielt godt for nettbutikker med lager utenfor Oslo. Med Hently slipper
              kundene dine i Oslo å vente i flere dager på levering – de kan få varen levert{" "}
              <span style={{ color: "oklch(70.5% 0.213 47.604)" }}>umiddelbart</span>.
            </p>

            <p className="leading-relaxed">
              Vi lagrer varene dine i vårt lager i Oslo. Vi pakker dem slik du ønsker og sender
              dem ut umiddelbart, eller på ønsket tidspunkt. Dette gjør at du kan nå flere kunder,
              øke synligheten og øke salget.
            </p>

            <div className="space-y-4 pt-4">
              <details
                className="group rounded-2xl p-4 md:p-5"
                style={{ backgroundColor: "#F7F7F7" }}
              >
                <summary
                  className="list-none cursor-pointer flex items-center justify-between gap-4"
                  style={{
                    fontFamily: "var(--font-serif), serif",
                    color: "oklch(70.5% 0.213 47.604)",
                  }}
                >
                  <span className="text-xl md:text-2xl font-normal">Hvordan fungerer det?</span>
                  <ChevronDown className="w-5 h-5 flex-shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div
                  className="mt-4 space-y-4 text-base md:text-lg"
                  style={{ fontFamily: "var(--font-sans), sans-serif", color: "hsl(150, 30%, 15%)" }}
                >
                  <p>Du sender en batch med varer til oss – vi tar oss av resten.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Kunden bestiller i nettbutikken din og velger Hently som leveringsalternativ.</li>
                    <li>Vi mottar bestillingen automatisk.</li>
                    <li>Vi plukker, pakker og sender varen direkte til kunden.</li>
                  </ul>
                </div>
              </details>

              <details
                className="group rounded-2xl p-4 md:p-5"
                style={{ backgroundColor: "#F7F7F7" }}
              >
                <summary
                  className="list-none cursor-pointer flex items-center justify-between gap-4"
                  style={{
                    fontFamily: "var(--font-serif), serif",
                    color: "oklch(70.5% 0.213 47.604)",
                  }}
                >
                  <span className="text-xl md:text-2xl font-normal">
                    Hvordan fungerer betaling?
                  </span>
                  <ChevronDown className="w-5 h-5 flex-shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div
                  className="mt-4 space-y-3 text-base md:text-lg"
                  style={{ fontFamily: "var(--font-sans), sans-serif", color: "hsl(150, 30%, 15%)" }}
                >
                  <p>Du mottar hele beløpet fra kunden – både for produkt og frakt.</p>
                  <p>Vi får vår andel gjennom et avtalt oppgjør i etterkant.</p>
                </div>
              </details>

              <details
                className="group rounded-2xl p-4 md:p-5"
                style={{ backgroundColor: "#F7F7F7" }}
              >
                <summary
                  className="list-none cursor-pointer flex items-center justify-between gap-4"
                  style={{
                    fontFamily: "var(--font-serif), serif",
                    color: "oklch(70.5% 0.213 47.604)",
                  }}
                >
                  <span className="text-xl md:text-2xl font-normal">Hva koster det?</span>
                  <ChevronDown className="w-5 h-5 flex-shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div
                  className="mt-4 space-y-4 text-base md:text-lg leading-relaxed"
                  style={{ fontFamily: "var(--font-sans), sans-serif", color: "hsl(150, 30%, 15%)" }}
                >
                  <p>
                    Vi blir enige om en pris som er tilpasset din bedrift. Prisen avhenger av hvor
                    mye du lagrer hos oss, om du ønsker plukk og pakk, og om du vil bli markedsført
                    gjennom våre kanaler.
                  </p>
                  <p>
                    Vi skreddersyr en løsning som passer deg – og vi er konkurransedyktige på pris,
                    ofte lavere enn tradisjonelle 3PL-aktører.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
