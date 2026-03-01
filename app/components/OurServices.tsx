"use client";

import Link from "next/link";
import { Shirt, ShoppingBag, Heart } from "lucide-react";

// Custom HeartHandshake icon component
const HeartHandshake = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    style={style}
  >
    <path d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762"/>
  </svg>
);

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
    <div className="pt-4 pb-12 md:pt-6 md:pb-16" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'hsl(16, 85%, 55%)' }}>
            <HeartHandshake className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={2} />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-center mb-3" style={{ fontFamily: 'var(--font-serif), serif', color: 'oklch(70.5% 0.213 47.604)' }}>
          Våre tjenester
        </h2>
        <p className="text-center mb-8 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 10%, 40%)' }}>
          Vi leverer alt fra personlige ærender til klikk&hent og kjøp fra markedsplasser – raskt og enkelt.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="p-6 flex flex-col items-start gap-3 transition-shadow"
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
