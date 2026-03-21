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
            <p className="font-semibold">Driver du en nettbutikk eller fysisk butikk?</p>
            <p className="font-semibold">
              Selger du produkter som kan leveres raskere til kundene dine?
            </p>

            <p className="leading-relaxed">
              Vi har et lager midt i Oslo sentrum. Oslo er Norges største marked, med høy
              etterspørsel og mange aktive netthandlere. Det spiller ingen rolle hva du selger –
              alt fra sykkelutstyr til håndlagde smykker.
            </p>

            <p className="leading-relaxed">
              Vi lagrer varene dine i vårt lager i Oslo og sender dem ut umiddelbart, eller på
              ønsket tidspunkt. Dette gjør at du kan nå flere kunder, øke synligheten og øke
              salget.
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
                  <p className="font-medium">
                    1. Du sender en batch med varer til oss, og vi håndterer resten.
                  </p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Kunden bestiller i nettbutikken din og velger Hently som leveringsalternativ</li>
                    <li>Vi mottar bestillingen automatisk</li>
                    <li>Vi pakker og sender varen direkte til kunden</li>
                  </ol>
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
                  <p>Du mottar hele beløpet fra kunden, både for produkt og frakt.</p>
                  <p>Vi får vår andel gjennom et avtalt oppgjør i etterkant.</p>
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
