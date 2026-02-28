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

const questions = [
  "Skal du levere noe til en venn?",
  "Har du glemt nøkler hjemme?",
  "Ligger lommeboken igjen hos en venn?",
  "Må du levere en bok til en medstudent?",
  "Skal du sende noe til kjæresten på jobb?",
  "Har du glemt laderen hos en kompis?",
  "Må en jakke tilbake til en venn?",
  "Har du solgt noe som må overleveres?",
  "Har du lånt bort AirPods som må hentes?",
  "Skal en pakke sendes til søsteren din?",
  "Har du glemt PC-en hos en studiepartner?",
  "Skal en kake leveres til familien?",
  "Har du lånt bort en kjole som må tilbake?",
  "Har du glemt jakken på nach?",
  "Skal noe raskt fra deg til en venn?",
];

// Generate random colors for each question with opacity
const getRandomColor = (index: number) => {
  const colors = [
    'hsla(0, 0%, 60%, 0.4)',      // lys grå med opacity
    'hsla(0, 0%, 55%, 0.5)',      // litt mørkere grå
    'hsla(36, 20%, 65%, 0.4)',    // lys beige/brun
    'hsla(36, 15%, 60%, 0.5)',    // litt mørkere beige
    'hsla(0, 0%, 65%, 0.3)',      // lysere grå
    'hsla(36, 25%, 70%, 0.4)',    // lys beige
    'hsla(0, 0%, 58%, 0.45)',     // mellom grå
    'hsla(36, 18%, 62%, 0.4)',    // beige tone
    'hsla(150, 25%, 65%, 0.4)',   // lys grønn
    'hsla(150, 20%, 70%, 0.4)',   // lysere grønn
    'hsla(150, 30%, 60%, 0.5)',   // litt mørkere grønn
    'hsla(24, 60%, 70%, 0.4)',    // lys orange
    'hsla(24, 55%, 75%, 0.4)',    // lysere orange
    'hsla(24, 65%, 65%, 0.5)',    // litt mørkere orange
  ];
  // Use index to create pseudo-random but consistent colors
  return colors[(index * 7 + 13) % colors.length];
};

// Generate random font size between 16px and 28px
const getRandomFontSize = (index: number) => {
  // Use index to create pseudo-random but consistent sizes
  const baseSize = 16;
  const maxSize = 28;
  const variation = (index * 7 + 13) % (maxSize - baseSize + 1);
  return baseSize + variation;
};

// Base color: light gray
const baseColor = 'hsla(0, 0%, 65%, 0.4)';
// Highlight colors
const highlightOrange = 'hsla(24, 60%, 70%, 0.6)';
const highlightGreen = 'hsla(150, 25%, 65%, 0.6)';

// Fixed structure for each line
const line1Questions = [
  { text: "Kjøpt noe på Elkjøp og vil ha det levert i dag?", color: highlightOrange, isHighlight: true },
  { text: "Har du glemt jakken på nach?", color: baseColor },
  { text: "Skal du levere noe til en venn?", color: highlightGreen, isHighlight: true },
  { text: "Skal en kake leveres til familien?", color: baseColor },
  { text: "Skal du sende noe til kjæresten på jobb?", color: baseColor },
];

const line2Questions = [
  { text: "Ligger lommeboken igjen hos en venn?", color: baseColor },
  { text: "Har du glemt nøkler hjemme?", color: highlightOrange, isHighlight: true },
  { text: "Må du levere en bok til en medstudent?", color: baseColor },
];

const line3Questions = [
  { text: "Skal du sende noe til kjæresten på jobb?", color: baseColor },
  { text: "Kjøpt noe på finn og vil ha den levert nå?", color: highlightGreen, isHighlight: true },
  { text: "Har du glemt jakken på nach?", color: baseColor },
  { text: "Må du levere en bok til en medstudent?", color: baseColor },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="pt-0 pb-16 md:pb-24" style={{ backgroundColor: 'hsl(36, 50%, 95%)' }}>
      {/* Questions section - full width */}
      <section 
        className="mb-8 md:mb-12 question-wall"
        style={{ 
          width: '100vw',
          margin: '0',
          padding: '0',
          overflow: 'hidden',
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {/* Line 1: Large - 56px */}
        <div 
          className="line line-1"
          style={{
            whiteSpace: 'nowrap',
            display: 'block',
            width: '100vw',
            textAlign: 'left',
            lineHeight: '1',
            margin: '0',
            padding: '0',
            fontSize: '56px',
          }}
        >
          {line1Questions.map((item, idx) => (
            <span
              key={`line1-${idx}`}
              className="font-semibold"
              style={{
                fontFamily: 'var(--font-serif), serif',
                color: item.color,
                marginRight: '1.5rem',
              }}
            >
              {item.text}
            </span>
          ))}
        </div>

        {/* Line 2: Medium - 42px */}
        <div 
          className="line line-2"
          style={{
            whiteSpace: 'nowrap',
            display: 'block',
            width: '100vw',
            textAlign: 'left',
            lineHeight: '1',
            margin: '0',
            padding: '0',
            fontSize: '42px',
          }}
        >
          {line2Questions.map((item, idx) => (
            <span
              key={`line2-${idx}`}
              className="font-semibold"
              style={{
                fontFamily: 'var(--font-serif), serif',
                color: item.color,
                marginRight: '1.2rem',
              }}
            >
              {item.text}
            </span>
          ))}
        </div>

        {/* Line 3: Smaller - 32px */}
        <div 
          className="line line-3"
          style={{
            whiteSpace: 'nowrap',
            display: 'block',
            width: '100vw',
            textAlign: 'left',
            lineHeight: '1',
            margin: '0',
            padding: '0',
            fontSize: '32px',
          }}
        >
          {line3Questions.map((item, idx) => (
            <span
              key={`line3-${idx}`}
              className="font-semibold"
              style={{
                fontFamily: 'var(--font-serif), serif',
                color: item.color,
                marginRight: '1rem',
              }}
            >
              {item.text}
            </span>
          ))}
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-8">

        <OurServices />
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-center mb-12 md:mb-16 mt-8" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
          Slik fungerer Klikk&Send
        </h2>

        {/* Large rounded container with secondary background */}
        <div className="rounded-3xl p-6 md:p-8 lg:p-10 mb-16 md:mb-24" style={{ backgroundColor: 'hsl(140, 25%, 82%)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="flex flex-col items-start">
                  {/* Icon with colored background circle */}
                  <div className="mb-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: index === 0 ? 'hsl(220, 70%, 55%)' : index === 1 ? 'hsl(24, 85%, 50%)' : 'hsl(16, 85%, 55%)' }}>
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Title with number */}
                  <h3 className="text-xl md:text-2xl font-bold mb-3 flex items-baseline gap-2" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                    <span className="text-lg md:text-xl font-bold">{index + 1}.</span>
                    <span>{step.title}</span>
                  </h3>

                  {/* Description */}
                  <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Choose & How to Use & Sustainability Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 mt-16 md:mt-24">
          {/* Why Choose Klikk&Send */}
          <div id="why-choose" className="bg-white rounded-3xl p-6 md:p-8 shadow-sm scroll-mt-20">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 md:mb-8" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              Hvorfor velge Klikk&Send?
            </h3>
            <ul className="space-y-4 text-sm md:text-base" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              <li className="flex items-start gap-3">
                <span className="font-bold mt-1" style={{ color: 'hsl(24, 85%, 50%)' }}>•</span>
                <span>God pris. Rask henting og levering. Ingen ventetid.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold mt-1" style={{ color: 'hsl(24, 85%, 50%)' }}>•</span>
                <span>Vi frakter små og mellomstore gjenstander — fra nøkler og klær til møbler og elektronikk.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold mt-1" style={{ color: 'hsl(24, 85%, 50%)' }}>•</span>
                <span>Vi leverer mellom bedrifter og privatpersoner.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold mt-1" style={{ color: 'hsl(24, 85%, 50%)' }}>•</span>
                <span>Billigere enn taxi. Raskere enn posten.</span>
              </li>
            </ul>
          </div>

          {/* How to Use */}
          <div id="how-to-use" className="bg-white rounded-3xl p-6 md:p-8 shadow-sm scroll-mt-20">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 md:mb-8" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              Slik kan du bruke Klikk&Send
            </h3>
            <ul className="space-y-3 md:space-y-4 text-sm md:text-base" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              <li className="flex items-start gap-3">
                <span className="font-bold mt-1" style={{ color: 'hsl(24, 85%, 50%)' }}>•</span>
                <span>Glemt AirPods eller nøkler hos en venn?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold mt-1" style={{ color: 'hsl(24, 85%, 50%)' }}>•</span>
                <span>Har du glemt dokumenter som må frem før møtet starter?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold mt-1" style={{ color: 'hsl(24, 85%, 50%)' }}>•</span>
                <span>Skal du sende noe til en venn i byen?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold mt-1" style={{ color: 'hsl(24, 85%, 50%)' }}>•</span>
                <span>Planer om å kjøpe noe på finn eller tise som du trenger idag?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold mt-1" style={{ color: 'hsl(24, 85%, 50%)' }}>•</span>
                <span>Bestilt noe med Klikk&Hent? Vi henter det for deg!</span>
              </li>
            </ul>
          </div>

          {/* Priser og betaling */}
          <div id="prices" className="bg-white rounded-3xl p-6 md:p-8 shadow-sm scroll-mt-20">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 md:mb-8" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              Priser og betaling
            </h3>
            <div className="space-y-4 text-sm md:text-base" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              <div className="flex items-center justify-between">
                <span>Kort levering (0–3 km)</span>
                <span className="font-bold" style={{ color: 'hsl(24, 85%, 50%)' }}>119 kr</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Medium levering (3–6 km)</span>
                <span className="font-bold" style={{ color: 'hsl(24, 85%, 50%)' }}>169 kr</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Lengre levering (6–20 km)</span>
                <span className="font-bold" style={{ color: 'hsl(24, 85%, 50%)' }}>219 kr</span>
              </div>
            </div>
            <div className="text-sm md:text-base mt-6 md:mt-8 space-y-4" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
              <p className="max-w-md">Prisen beregnes ut fra avstand.</p>
              <p className="max-w-md">Du får en SMS med bekreftet pris før oppdraget gjennomføres.</p>
              <p className="max-w-md">Du betaler med Vipps når pakken er levert.</p>
              <p className="mt-8 font-semibold text-base md:text-lg">
                Les mer om trygghet og sikkerhet{" "}
                <Link href="/trygghet-og-sikkerhet" className="underline hover:opacity-80" style={{ color: 'hsl(24, 85%, 50%)' }}>
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
