"use client";

import Link from "next/link";
import { Package, ShoppingBag, Heart, Users, Megaphone, TrendingUp, Zap } from "lucide-react";

interface Service {
  icon: React.ComponentType<{ className?: string; color?: string; strokeWidth?: number }>;
  iconColor: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  features?: string[];
  feature?: string;
}

const services: Service[] = [
  {
    icon: Package,
    iconColor: "hsl(16, 85%, 55%)", // accent (korall)
    title: "Lever vare til kunde",
    description: "Vi henter fra lager og leverer direkte til kunde.",
    href: "/lever-vare-til-kunde",
    cta: "Les mer",
  } as Service,
  {
    icon: ShoppingBag,
    iconColor: "oklch(70.5% 0.213 47.604)", // primary (oransje)
    title: "Henting hos kunde",
    description: "Har en kunde varer som skal sendes til en bedrift? Vi henter!",
    href: "/henting-hos-kunde",
    cta: "Les mer",
  } as Service,
  {
    icon: Heart,
    iconColor: "hsl(220, 70%, 55%)", // highlight (blå)
    title: "Umiddelbar levering i Oslo",
    description: "Vi leverer små varer umiddelbart fra bedrift til kunde i hele Oslo.",
    href: "/umiddelbar-levering-i-oslo",
    cta: "Les mer",
  } as Service,
];

const growthCards = [
  {
    icon: Users,
    title: "Nå ut til flere kunder",
    text: "Når du samarbeider med oss, får du tilgang til en ny kundebase med kjøpsklare brukere.",
    href: "/voks-bedriften-din",
  },
  {
    icon: Megaphone,
    title: "Økt synlighet",
    text: "Vi markedsfører produktene dine gjennom våre egne kanaler og plattformer der målgruppen din allerede er.",
  },
  {
    icon: TrendingUp,
    title: "Flere kunder - økt omsetning",
    text: "Økt synlighet og flere henvendelser gir høyere konvertering og økt inntekt.",
  },
  {
    icon: Zap,
    title: "Tilby umiddelbar levering",
    text: "Gi kundene dine muligheten til å få varen levert på døren umiddelbart, i stedet for å vente flere dager på tradisjonell frakt.",
  },
];

export default function OurServices() {
  return (
    <div className="pt-0 pb-12 md:pt-2 md:pb-16" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-center mb-3" style={{ fontFamily: 'var(--font-serif), serif', color: 'oklch(70.5% 0.213 47.604)' }}>
          Våre tjenester
        </h2>
        <p className="text-center mb-8 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 10%, 40%)' }}>
          Vi hjelper bedrifter med å hente og levere varer direkte til kundene – raskt og enkelt.
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
                  href={service.href}
                  className="text-sm font-semibold flex items-center gap-1 transition-colors service-link" 
                  style={{ color: 'hsl(150, 30%, 15%)' }}
                >
                  {service.cta}
                  <span className="service-arrow">→</span>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-12 md:mt-16 max-w-6xl mx-auto px-4 md:px-6">
          <h3
            className="text-3xl md:text-4xl lg:text-5xl font-normal text-center mb-8 md:mb-10"
            style={{ fontFamily: "var(--font-serif), serif", color: "oklch(70.5% 0.213 47.604)" }}
          >
            Få bedriften din til å vokse med Hently
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {growthCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="h-full rounded-2xl p-6 md:p-7 border border-white/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(245,115,32,0.14)] hover:border-orange-200/80"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(247,247,247,0.92) 100%)",
                    boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
                  }}
                >
                  <div className="mb-4 inline-flex items-center justify-center rounded-xl p-2.5 bg-white/80 border border-orange-100">
                    <Icon className="w-5 h-5" style={{ color: "oklch(70.5% 0.213 47.604)" }} />
                  </div>
                  <h4
                    className="text-xl font-normal mb-3"
                    style={{ fontFamily: "var(--font-serif), serif", color: "hsl(150, 30%, 15%)" }}
                  >
                    {card.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-sans), sans-serif", color: "hsl(150, 10%, 40%)" }}
                  >
                    {card.text}
                  </p>
                  {card.href && (
                    <Link
                      href={card.href}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-80"
                      style={{ color: "oklch(70.5% 0.213 47.604)" }}
                    >
                      Les mer <span>→</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
