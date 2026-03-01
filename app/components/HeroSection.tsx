"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "./ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[400px] md:min-h-[600px] flex items-center justify-center px-4 py-8 md:px-8 md:py-12 lg:py-16" style={{ backgroundColor: '#FFFFFF' }}>

      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8">
        <div className="rounded-3xl p-6 md:p-12 lg:p-16" style={{ backgroundColor: '#F7F7F7', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left side: Text content */}
            <div>
              {/* Main headline */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-normal mb-4 md:mb-6 leading-tight" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
                Umiddelbar henting og levering.
              </h1>

            {/* Subtitle - Desktop */}
            <div className="hidden md:block text-lg md:text-xl mb-10 leading-relaxed space-y-4" style={{ color: 'hsl(150, 30%, 15%)', fontFamily: 'var(--font-sans), sans-serif' }}>
              <p className="font-medium">Har du bestilt via klikk&hent eller kjøpt noe på en markedsplass og ønsker levering hjem umiddelbart?</p>
              <p className="font-semibold">Vi henter og leverer små og store gjenstander mellom privatpersoner og bedrifter.</p>
            </div>

            {/* Description - Mobile */}
            <div className="md:hidden text-sm mb-6 leading-relaxed space-y-3" style={{ color: 'hsl(150, 30%, 15%)', fontFamily: 'var(--font-sans), sans-serif' }}>
              <p className="font-medium">Har du bestilt via klikk&hent eller kjøpt noe på en markedsplass og ønsker levering hjem umiddelbart?</p>
              <p className="font-semibold">Vi henter og leverer små og store gjenstander mellom privatpersoner og bedrifter.</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-2 md:gap-3 mb-6 md:mb-10 flex-nowrap overflow-x-auto">
              <Link href="/bestill?type=klikk-hent" className="flex-shrink-0">
                <button className="rounded-lg px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm font-medium flex items-center gap-1.5 transition-all duration-200 hover:opacity-90 whitespace-nowrap" style={{ backgroundColor: 'oklch(70.5% 0.213 47.604)', color: '#ffffff', fontFamily: 'var(--font-sans), sans-serif' }}>
                  Klikk&hent
                  <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" style={{ color: '#ffffff' }} />
                </button>
              </Link>
              <Link href="/bestill" className="flex-shrink-0">
                <button className="rounded-lg px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm font-medium flex items-center gap-1.5 transition-all duration-200 hover:opacity-90 whitespace-nowrap" style={{ backgroundColor: 'oklch(70.5% 0.213 47.604)', color: '#ffffff', fontFamily: 'var(--font-sans), sans-serif' }}>
                  Markedsplass-levering
                  <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" style={{ color: '#ffffff' }} />
                </button>
              </Link>
              <Link href="/bestill" className="flex-shrink-0">
                <button className="rounded-lg px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm font-medium flex items-center gap-1.5 transition-all duration-200 hover:opacity-90 whitespace-nowrap" style={{ backgroundColor: 'oklch(70.5% 0.213 47.604)', color: '#ffffff', fontFamily: 'var(--font-sans), sans-serif' }}>
                  Personlige ærender
                  <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" style={{ color: '#ffffff' }} />
                </button>
              </Link>
            </div>

            {/* Pricing text and button */}
            <div className="space-y-2 md:space-y-4" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
              <p className="hidden md:block text-base" style={{ color: 'hsl(150, 30%, 15%)' }}>
                Faste og rimelige priser - beregnet etter avstand.
              </p>
              <Link href="/priser" className="inline-block font-semibold text-base md:text-lg lg:text-xl transition-colors hover:opacity-80" style={{ color: 'hsl(150, 50%, 45%)' }}>
                Se våre priser her
              </Link>
            </div>
          </div>

            {/* Right side: Image */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-2xl">
                <Image
                  src="/delivery-illustration.svg"
                  alt="Bud som leverer pakke"
                  width={800}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
