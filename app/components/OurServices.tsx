"use client";

import Link from "next/link";
import { Shirt, Package, MapPin, Check } from "lucide-react";

const services = [
  {
    icon: Shirt,
    iconColor: "oklch(64.6% 0.222 41.116)",
    title: "Markedsplass-levering",
    description: "Kjøpt noe på Finn, Tise eller andre markedsplasser? Vi henter fra selger og leverer direkte til deg.",
  },
  {
    icon: Package,
    iconColor: "oklch(64.6% 0.222 41.116)",
    title: "Klikk&hent",
    description: "Bestilt med klikk&hent? Vi henter i butikken og leverer rett hjem til deg.",
  },
  {
    icon: MapPin,
    iconColor: "oklch(64.6% 0.222 41.116)",
    title: "Personlige ærender",
    description: "Skal noe leveres til en venn? Glemt nøkler et sted? Vi ordner det for deg.",
  },
];

const bottomPoints = [
  "Alt fra A til B",
  "For privatpersoner og bedrifter",
  "Umiddelbar respons",
];

export default function OurServices() {
  return (
    <div className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-6 md:mb-8">
          Våre tjenester
        </h2>
        <p className="text-base md:text-lg text-gray-700 text-center mb-16 md:mb-20 max-w-3xl mx-auto font-semibold">
          Vi leverer alt fra personlige ærender til klikk&hent og kjøp fra markedsplasser – raskt og enkelt.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-200 flex flex-col"
              >
                <div className="rounded-lg p-2 w-fit mb-4" style={{ backgroundColor: service.iconColor }}>
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base text-gray-700 mb-6 flex-grow leading-relaxed">
                  {service.description}
                </p>
                {service.features ? (
                  <div className="mb-6 space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                        <p className="text-gray-700 font-medium">{feature}</p>
                      </div>
                    ))}
                  </div>
                ) : service.feature && (
                  <div className="mb-6">
                    <p className="text-gray-700 font-medium">{service.feature}</p>
                  </div>
                )}
                <Link href="/bestill">
                  <button className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-2 px-4 rounded-lg border border-gray-300 transition-all duration-200 flex items-center justify-center gap-2 text-sm">
                    Bestill nå
                    <span className="text-gray-900">→</span>
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
