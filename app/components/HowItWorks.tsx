"use client";

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
          <div id="why-choose" className="bg-orange-50 rounded-2xl p-8 border border-orange-100 scroll-mt-20 transition-transform duration-300 hover:scale-105 cursor-pointer">
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
              Hvordan kan du bruke oss?
            </h3>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold mt-1">•</span>
                <span>Planer om å kjøpe noe på finn eller tise som du trenger idag?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold mt-1">•</span>
                <span>Glemt AirPods eller nøkler hos en venn?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold mt-1">•</span>
                <span>Glemt noe hos bestemor?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold mt-1">•</span>
                <span>Trenger du å få levert en koffert eller esker?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold mt-1">•</span>
                <span>Skal du sende noe til en venn i byen?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold mt-1">•</span>
                <span>Er du rett og slett bare litt for lat?</span>
              </li>
            </ul>
            <p className="text-gray-700 mb-4">
              Spiller ingen rolle hva du trenger levert.
            </p>
            <p className="text-gray-700 mb-4">
              Vi frakter små og mellomstore ting i byen, direkte fra A til B på 123.
            </p>
            <p className="text-gray-700 font-medium">
              Med Klikk&Send slipper du å vente.
            </p>
          </div>

          {/* Sustainability */}
          <div id="sustainability" className="bg-green-50 rounded-2xl p-8 border border-green-100 scroll-mt-20 transition-transform duration-300 hover:scale-105 cursor-pointer">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Bærekraft
            </h3>
            <p className="text-gray-700 mb-4">
              Levering trenger ikke bety mer trafikk.
            </p>
            <p className="text-gray-700 mb-4">
              Vi fokuserer på korte leveranser i byen.
            </p>
            <p className="text-gray-700">
              Det gir rask levering og lavere utslipp.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
