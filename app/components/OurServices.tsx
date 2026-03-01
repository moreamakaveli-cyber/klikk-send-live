"use client";

import Link from "next/link";
import { Shirt, ShoppingBag, Heart } from "lucide-react";

interface Service {
  icon: React.ComponentType<{ className?: string; color?: string; strokeWidth?: number }>;
  iconColor: string;
  title: string;
  description: string;
  features?: string[];
  feature?: string;
}

const services: Service[] = [
  {
    icon: Shirt,
    iconColor: "hsl(16, 85%, 55%)", // accent (korall)
    title: "Markedsplass-levering",
    description: "Kjøpt noe på Finn, Tise eller andre markedsplasser? Vi henter fra selger og leverer direkte til deg.",
  } as Service,
  {
    icon: ShoppingBag,
    iconColor: "oklch(70.5% 0.213 47.604)", // primary (oransje)
    title: "Klikk&hent",
    description: "Bestilt med klikk&hent? Vi henter i butikken og leverer rett hjem til deg.",
  } as Service,
  {
    icon: Heart,
    iconColor: "hsl(220, 70%, 55%)", // highlight (blå)
    title: "Personlige ærender",
    description: "Skal noe leveres til en venn? Glemt nøkler et sted? Vi ordner det for deg.",
  } as Service,
];

const bottomPoints = [
  "Alt fra A til B",
  "For privatpersoner og bedrifter",
  "Umiddelbar respons",
];

export default function OurServices() {
  return (
    <div className="py-20 md:py-32" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-center mb-4" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
          Våre tjenester
        </h2>
        <p className="text-center mb-12 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 10%, 40%)' }}>
          Vi leverer alt fra personlige ærender til klikk&hent og kjøp fra markedsplasser – raskt og enkelt.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="p-8 flex flex-col items-start gap-4 transition-shadow"
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  borderRadius: '20px',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                }}
              >
                {/* Ikon-badge */}
                <div className="rounded-2xl p-3" style={{ backgroundColor: '#F7F7F7' }}>
                  <Icon className="w-7 h-7" color={service.iconColor} strokeWidth={2} />
                </div>

                {/* Tittel */}
                <h3 className="text-xl font-normal" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
                  {service.title}
                </h3>

                {/* Beskrivelse */}
                <p className="text-sm leading-relaxed flex-grow" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 10%, 40%)' }}>
                  {service.description}
                </p>

                {/* Lenke */}
                <Link 
                  href="/bestill" 
                  className="text-sm font-semibold flex items-center gap-1 transition-colors service-link" 
                  style={{ color: 'hsl(150, 30%, 15%)' }}
                >
                  Bestill nå
                  <span className="service-arrow">→</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
