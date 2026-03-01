"use client";

import Link from "next/link";
import { Search, Hand, Package, ShoppingBag, Shirt, Heart, Cake, KeyRound, BookOpen, Wallet } from "lucide-react";
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
  { icon: ShoppingBag, text: "Kjøpte en kaffemaskin på Elkjøp og vil ha det levert idag?" },
  { icon: Shirt, text: "Ble jakken lagt igjen på nach? Vi henter den." },
  { icon: ShoppingBag, text: "Kjøpt noe på nett som har en fysisk butikk? Vi henter og leverer umiddelbart." },
  { icon: Wallet, text: "Ligger lommeboken hos en venn? Vi ordner det!" },
  { icon: Shirt, text: "Ble klærne hos skredderen klare? Vi henter og leverer!" },
  { icon: BookOpen, text: "Bok som må leveres til en medstudent? Ingen stress." },
  { icon: ShoppingBag, text: "Kjøpt på Finn eller Tise og vil ha den levert nå?" },
  { icon: ShoppingBag, text: "Har barnet glemt gymsekken hjemme? Vi henter og leverer!" },
];

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
    icon: HandHeart,
    title: "Vi leverer",
    description: "Leveres til mottaker. Du betaler når pakken er levert.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="pt-0 pb-12 md:pb-16" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-[1400px] mx-auto px-8">

        <OurServices />

        {/* Use cases - under Våre tjenester */}
        <div className="mb-6 md:mb-8 mt-2 md:mt-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-center mb-4 md:mb-6" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
            Når passer Klikk&Send?
          </h2>
          <div className="mb-6 md:mb-8 text-center space-y-2">
            <p className="text-base md:text-lg" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              Uansett hva som skal leveres – vi frakter det fra A til B.
            </p>
            <p className="text-base md:text-lg" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              Tiden din er verdifull. La oss ta leveringen.
            </p>
          </div>
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
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-center mb-6 md:mb-8 mt-4" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
          Slik fungerer Klikk&Send
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
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: index === 0 ? 'hsl(150, 50%, 35%)' : index === 1 ? 'oklch(70.5% 0.213 47.604)' : 'hsl(16, 85%, 55%)' }}>
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

        {/* Why Choose & How to Use & Sustainability Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">
          {/* Why Choose Klikk&Send */}
          <div id="why-choose" className="p-6 md:p-8 scroll-mt-20" style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-normal mb-6 md:mb-8" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
              Hvorfor velge Klikk&Send?
            </h3>
            <ul className="space-y-4 text-sm md:text-base" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              <li className="flex items-start gap-3">
                <span className="font-bold mt-1" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>•</span>
                <span>Umiddelbar henting og levering.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold mt-1" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>•</span>
                <span>Vi henter fra alle butikker som tilbyr klikk og hent eller click and collect.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold mt-1" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>•</span>
                <span>Billigere enn taxi. Raskere enn posten.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold mt-1" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>•</span>
                <span>Faste, lave priser.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold mt-1" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>•</span>
                <span>Direkte levering der du ønsker.</span>
              </li>
            </ul>
          </div>

          {/* How to Use */}
          <div id="how-to-use" className="p-6 md:p-8 scroll-mt-20" style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-normal mb-6 md:mb-8" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
              Slik kan du bruke Klikk&Send
            </h3>
            <ul className="space-y-3 md:space-y-4 text-sm md:text-base" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              <li className="flex items-start gap-3">
                <span className="font-bold mt-1" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>•</span>
                <span>Glemt AirPods eller nøkler hos en venn?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold mt-1" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>•</span>
                <span>Skal du sende noe til en venn i byen?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold mt-1" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>•</span>
                <span>Bestilt en kaffemaskin på elkjøp? Vi leverer til deg.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold mt-1" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>•</span>
                <span>Har du noe klart til henting? Vi plukker det opp og leverer det hjem til deg.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold mt-1" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>•</span>
                <span>Privat eller bedrift – vi leverer fra A til B.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold mt-1" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>•</span>
                <span>Din tid er verdifull, la oss ta oss av leveransen.</span>
              </li>
            </ul>
          </div>

          {/* Priser og betaling */}
          <div id="prices" className="p-6 md:p-8 scroll-mt-20" style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-normal mb-6 md:mb-8" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
              Priser og betaling
            </h3>
            <div className="space-y-4 text-sm md:text-base" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              <div className="flex items-center justify-between">
                <span>Kort levering (0–3 km)</span>
                    <span className="font-bold" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>119 kr</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Medium levering (3–6 km)</span>
                    <span className="font-bold" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>169 kr</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Lengre levering (6–20 km)</span>
                    <span className="font-bold" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>219 kr</span>
              </div>
            </div>
            <div className="text-sm md:text-base mt-6 md:mt-8 space-y-4" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              <p className="max-w-md">Prisen beregnes ut fra avstand.</p>
              <p className="max-w-md">Du får en SMS med bekreftet pris før oppdraget gjennomføres.</p>
              <p className="max-w-md">Du betaler med Vipps når pakken er levert.</p>
              <p className="mt-8 font-semibold text-base md:text-lg">
                Les mer om trygghet og sikkerhet{" "}
                    <Link href="/trygghet-og-sikkerhet" className="underline hover:opacity-80" style={{ color: 'oklch(70.5% 0.213 47.604)' }}>
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
