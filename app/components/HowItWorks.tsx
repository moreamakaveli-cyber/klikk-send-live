"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Hand, Package, ShoppingBag, Heart, Cake, KeyRound, BookOpen, Wallet } from "lucide-react";
import OurServices from "./OurServices";

// Custom HandHeart icon component
const HandHeart = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
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
    <path d="M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/>
    <path d="m14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95"/>
    <path d="m2 15 6 6"/>
    <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91"/>
  </svg>
);

const useCases = [
  { icon: ShoppingBag, text: "Vil du tilby umiddelbar hjemlevering fra din bedrift?" },
  { icon: Package, text: "Vil kunden sende varer til butikk?" },
  { icon: Heart, text: "Kunden vil ha varen levert samme dag?" },
  { icon: ShoppingBag, text: "Vil din bedrift tilby bedre service uten ekstra arbeid?" },
];

const steps = [
  {
    number: 1,
    icon: Search,
    title: "Kunden får SMS når varen er klar.",
    description: "Når varen er klar får kunden tilbud om umiddelbar hjemmelevering med Hently",
  },
  {
    number: 2,
    icon: Hand,
    title: "Vi henter hos bedrift",
    description: "Våre bud henter i butikken på oppgitt tidspunkt.",
  },
  {
    number: 3,
    icon: HandHeart,
    title: "Kunden mottar leveringen",
    description: "Vi leverer direkte til kundens angitte adresse.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="pt-0 pb-12 md:pb-16" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-[1400px] mx-auto px-8">

        <OurServices />

        {/* Slik fungerer Hently - først */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-center mb-6 md:mb-8 mt-4" style={{ fontFamily: 'var(--font-serif), serif', color: 'oklch(70.5% 0.213 47.604)' }}>
          Slik fungerer Hently
        </h2>

        {/* Large rounded container with secondary background */}
        <div className="rounded-3xl p-6 md:p-8 lg:p-10 mb-8 md:mb-12" style={{ backgroundColor: '#F7F7F7', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="flex flex-col items-center md:items-start">
                  {/* Icon with colored background circle */}
                  <div className="mb-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'hsl(16, 85%, 55%)' }}>
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Title with number */}
                  <h3 className="text-xl md:text-2xl font-normal mb-3 flex items-baseline gap-2 text-center md:text-left" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
                    <span className="text-lg md:text-xl font-normal">{index + 1}.</span>
                    <span>{step.title}</span>
                  </h3>

                  {/* Description */}
                  <p className="text-base md:text-lg leading-relaxed text-center md:text-left" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Use cases - Når passer Hently? */}
        <div className="mb-6 md:mb-8 mt-2 md:mt-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-center mb-4 md:mb-6" style={{ fontFamily: 'var(--font-serif), serif', color: 'oklch(70.5% 0.213 47.604)' }}>
            Når passer Hently?
          </h2>
          <p className="text-center mb-8 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 10%, 40%)' }}>
            Vi frakter fra A til B. Tiden din er verdifull. La oss ta leveringen.
          </p>
          <div
            className="rounded-2xl p-6 md:p-8"
            style={{
              backgroundColor: 'transparent',
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {useCases.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 md:p-4 rounded-xl transition-colors"
                    style={{ backgroundColor: '#F7F7F7', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-100">
                      <Icon className="w-5 h-5 text-orange-600" strokeWidth={2} />
                    </div>
                    <span className="text-sm md:text-base" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Why Choose & How to Use & Sustainability Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">
          {/* Why Choose Hently */}
          <div id="why-choose" className="p-6 md:p-8 scroll-mt-20" style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-normal mb-4 md:mb-6" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
              Hvorfor velge Hently?
            </h3>
            <p className="text-base md:text-lg mb-6" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              Tilby <span style={{ color: 'oklch(70.5% 0.213 47.604)' }}>umiddelbar</span> hjemlevering til dine kunder og styrk servicen i din bedrift.
            </p>
            <Link href="/hvorfor-velge-hently" className="text-sm font-semibold flex items-center gap-1 transition-colors hover:opacity-80" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>
              Les mer
              <span>→</span>
            </Link>
          </div>

          {/* How to Use */}
          <div id="how-to-use" className="p-6 md:p-8 scroll-mt-20" style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-normal mb-6 md:mb-8" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
              Slik fungerer samarbeid
            </h3>
            <div className="space-y-4 text-sm md:text-base" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              <p>
                En enkel løsning for både bedrift og kunde.
              </p>
              <Link href="/samarbeid" className="text-sm font-semibold flex items-center gap-1 transition-colors hover:opacity-80" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>
                Les mer
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Voks bedriften din med Hently */}
          <div id="grow-business" className="p-6 md:p-8 scroll-mt-20" style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-normal mb-6 md:mb-8" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
              Voks bedriften din med Hently
            </h3>
            <div className="space-y-4 text-sm md:text-base" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              <p>
                Med Hently får du ikke bare synlighet – du får et system som kontinuerlig jobber for å skaffe deg nye kunder.
              </p>
              <Link href="/voks-bedriften-din" className="text-sm font-semibold flex items-center gap-1 transition-colors hover:opacity-80" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>
                Les mer
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
