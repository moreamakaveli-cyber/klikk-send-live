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
    title: "Vi leverer ferdige varer til kunden.",
    description:
      "Når varen er klar, henter vi den i butikk og leverer direkte til kunden.",
  } as Service,
  {
    icon: ShoppingBag,
    iconColor: "oklch(70.5% 0.213 47.604)", // primary (oransje)
    title: "Henting hos kunde",
    description:
      "Har en kunde varer som skal sendes til en bedrift? Vi henter hos kunden og leverer direkte til bedriften.",
  } as Service,
  {
    icon: Heart,
    iconColor: "hsl(220, 70%, 55%)", // highlight (blå)
    title: "Umiddelbar levering i Oslo",
    description: "Vi leverer små varer umiddelbart fra bedrift til kunde i hele Oslo.",
  } as Service,
];

const bottomPoints = [
  "Alt fra A til B",
  "For privatpersoner og bedrifter",
  "Umiddelbar respons",
];

export default function OurServices() {
  return (
    <div className="pt-0 pb-12 md:pt-2 md:pb-16" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-center mb-3" style={{ fontFamily: 'var(--font-serif), serif', color: 'oklch(70.5% 0.213 47.604)' }}>
          Våre tjenester
        </h2>
        <p
          className="text-center mb-8 max-w-xl mx-auto"
          style={{ fontFamily: "var(--font-sans), sans-serif", color: "hsl(150, 10%, 40%)" }}
        >
          Levering til kunde
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
                  {index === 0 ? "Bestill levering" : index === 1 ? "Bestill henting" : "Les mer"}
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
