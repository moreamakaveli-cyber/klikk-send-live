"use client";

import Link from "next/link";
import { Search, Hand, Package, CheckCircle } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: Search,
    title: "Bestill",
    description: "Legg inn kontaktinfo, henteadresse og leveringsadresse.",
  },
  {
    number: 2,
    icon: Hand,
    title: "Vi henter",
    description: "Vi henter på avtalt tidspunkt. Du får varsel om forventet ankomst.",
  },
  {
    number: 3,
    icon: Package,
    title: "Vi leverer",
    description: "Vi leverer raskt og trygt til mottakeren.",
  },
  {
    number: 4,
    icon: CheckCircle,
    title: "Ferdig",
    description: "Mottakeren bekrefter at leveringen er mottatt. Du betaler når pakken er levert.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
          Slik fungerer Klikk&Send
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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

                <div className="bg-white rounded-2xl p-8 h-full flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                  {/* Icon circle */}
                  <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Step number badge */}
                  <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                    <span className="text-sm font-semibold text-orange-500">{step.number}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>

                  {/* Description */}
                  <p className="text-gray-600 text-base leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why Choose & How to Use & Sustainability Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20">
          {/* Why Choose Klikk&Send */}
          <div id="why-choose" className="bg-gray-50 rounded-2xl p-8 border border-gray-200 scroll-mt-20 transition-transform duration-300 hover:scale-105 cursor-pointer">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Hvorfor velge Klikk&Send?
            </h3>
            <ul className="space-y-4 text-gray-700">
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
                <span>Direkte fra A til B.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold mt-1">•</span>
                <span>Billigere enn taxi. Raskere enn posten.</span>
              </li>
            </ul>
          </div>

          {/* How to Use */}
          <div id="how-to-use" className="bg-gray-50 rounded-2xl p-8 border border-gray-200 scroll-mt-20 transition-transform duration-300 hover:scale-105 cursor-pointer">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Slik kan du bruke Klikk&Send
            </h3>
            <ul className="space-y-3 text-gray-700 mb-6">
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
                <span>Er du rett og slett bare litt for lat?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold mt-1">•</span>
                <span>Vi leverer både for bedrifter og mellom privatpersoner.</span>
              </li>
            </ul>
            <p className="text-gray-700 mb-4">
              Spiller ingen rolle hva du trenger levert. Vi frakter små og mellomstore ting i byen, direkte fra A til B på 123.
            </p>
          </div>

          {/* Priser og betaling */}
          <div id="prices" className="bg-gray-50 rounded-2xl p-4 md:p-8 border border-gray-200 scroll-mt-20 transition-transform duration-300 hover:scale-105 cursor-pointer">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
              Priser og betaling
            </h3>
            <div className="space-y-3 text-gray-700 text-sm md:text-base">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                <span className="flex-1">Kort levering (0–3 km)</span>
                <span className="font-bold text-orange-600 sm:ml-4">119 kr</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                <span className="flex-1">Medium levering (3–6 km)</span>
                <span className="font-bold text-orange-600 sm:ml-4">169 kr</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                <span className="flex-1">Lengre levering (6–20 km)</span>
                <span className="font-bold text-orange-600 sm:ml-4">219 kr</span>
              </div>
            </div>
            <div className="text-gray-700 mt-4 md:mt-6 space-y-2 md:space-y-3 text-sm md:text-base">
              <p>Prisen beregnes etter at vi har mottatt bestillingen din.</p>
              <p>Du får en SMS med bekreftet pris før oppdraget gjennomføres.</p>
              <p>Du betaler med Vipps når pakken er levert.</p>
              <p className="mt-6 md:mt-8 font-bold text-base md:text-lg">
                Din trygghet er viktig for oss. Les mer om trygghet og sikkerhet{" "}
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
