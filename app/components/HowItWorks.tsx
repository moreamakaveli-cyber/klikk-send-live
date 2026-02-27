"use client";

import Link from "next/link";
import { Search, Hand, Package } from "lucide-react";
import OurServices from "./OurServices";

const steps = [
  {
    number: 1,
    icon: Search,
    title: "Bestill",
    description: "Legg inn hente- og leveringsadresse.",
  },
  {
    number: 2,
    icon: Hand,
    title: "Vi henter",
    description: "Henting på avtalt tidspunkt. Du får varsling når budet ankommer.",
  },
  {
    number: 3,
    icon: Package,
    title: "Vi leverer",
    description: "Leveres til mottaker. Du betaler når pakken er levert.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="pt-8 md:pt-12 pb-16 md:pb-24 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <OurServices />
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12 md:mb-20 mt-8">
          Slik fungerer Klikk&Send
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative">
                {/* Connector line (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-orange-200 -z-10">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-orange-500 rounded-full"></div>
                  </div>
                )}

                <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-10 h-full flex flex-col items-center text-center shadow-sm border border-gray-100">
                  {/* Icon circle */}
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-orange-600 rounded-full flex items-center justify-center mb-5 md:mb-6 shadow-lg">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xs mx-auto flex-grow">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why Choose & How to Use & Sustainability Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 mt-16 md:mt-24">
          {/* Why Choose Klikk&Send */}
          <div id="why-choose" className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200 scroll-mt-20">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
              Hvorfor velge Klikk&Send?
            </h3>
            <ul className="space-y-4 text-sm md:text-base text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold mt-1">•</span>
                <span>God pris. Rask henting og levering. Ingen ventetid.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold mt-1">•</span>
                <span>Vi frakter små og mellomstore gjenstander — fra nøkler og klær til møbler og elektronikk.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold mt-1">•</span>
                <span>Vi leverer mellom bedrifter og privatpersoner.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold mt-1">•</span>
                <span>Billigere enn taxi. Raskere enn posten.</span>
              </li>
            </ul>
          </div>

          {/* How to Use */}
          <div id="how-to-use" className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200 scroll-mt-20">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
              Slik kan du bruke Klikk&Send
            </h3>
            <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold mt-1">•</span>
                <span>Glemt AirPods eller nøkler hos en venn?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold mt-1">•</span>
                <span>Har du glemt dokumenter som må frem før møtet starter?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold mt-1">•</span>
                <span>Skal du sende noe til en venn i byen?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold mt-1">•</span>
                <span>Planer om å kjøpe noe på finn eller tise som du trenger idag?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold mt-1">•</span>
                <span>Bestilt noe med Klikk&Hent? Vi henter det for deg!</span>
              </li>
            </ul>
          </div>

          {/* Priser og betaling */}
          <div id="prices" className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200 scroll-mt-20">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
              Priser og betaling
            </h3>
            <div className="space-y-4 text-sm md:text-base text-gray-700">
              <div className="flex items-center justify-between">
                <span>Kort levering (0–3 km)</span>
                <span className="font-bold text-orange-600">119 kr</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Medium levering (3–6 km)</span>
                <span className="font-bold text-orange-600">169 kr</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Lengre levering (6–20 km)</span>
                <span className="font-bold text-orange-600">219 kr</span>
              </div>
            </div>
            <div className="text-sm md:text-base text-gray-700 mt-6 md:mt-8 space-y-4">
              <p className="max-w-md">Prisen beregnes ut fra avstand.</p>
              <p className="max-w-md">Du får en SMS med bekreftet pris før oppdraget gjennomføres.</p>
              <p className="max-w-md">Du betaler med Vipps når pakken er levert.</p>
              <p className="mt-8 font-bold text-base md:text-lg">
                Les mer om trygghet og sikkerhet{" "}
                <Link href="/trygghet-og-sikkerhet" className="text-orange-600 hover:text-orange-700 underline">
                  her
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
