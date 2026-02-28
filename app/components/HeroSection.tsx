"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "./ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center px-8 py-16 md:py-24" style={{ backgroundColor: 'hsl(36, 50%, 95%)' }}>

      <div className="max-w-[1400px] mx-auto w-full px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left side: Text content */}
            <div>
              {/* Main headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 leading-tight" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
                Umiddelbar henting og levering.
              </h1>

            {/* Subtitle - Desktop */}
            <div className="hidden md:block text-lg md:text-xl mb-10 leading-relaxed space-y-4" style={{ color: 'hsl(150, 30%, 15%)', fontFamily: 'var(--font-sans), sans-serif' }}>
              <p className="font-medium">Har du bestilt via klikk&hent og ønsker levering hjem?</p>
              <p className="font-medium">Har du kjøpt noe på en markedsplass og ønsker umiddelbar levering?</p>
              <p className="font-semibold">Vi henter og leverer små og store gjenstander mellom privatpersoner og bedrifter.</p>
            </div>

            {/* Description - Mobile */}
            <div className="md:hidden text-base mb-8 leading-relaxed space-y-3" style={{ color: 'hsl(150, 30%, 15%)', fontFamily: 'var(--font-sans), sans-serif' }}>
              <p className="font-medium">Har du bestilt via klikk&hent og ønsker levering hjem?</p>
              <p className="font-medium">Har du kjøpt noe på en markedsplass og ønsker umiddelbar levering?</p>
              <p className="font-semibold">Vi henter og leverer små og store gjenstander mellom privatpersoner og bedrifter.</p>
            </div>

            {/* CTA Button */}
            <div className="flex gap-4 mb-10 flex-wrap">
              <Link href="/bestill">
                <button className="rounded-full px-8 py-4 text-lg font-semibold text-white flex items-center gap-2 transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'hsl(24, 85%, 50%)', fontFamily: 'var(--font-sans), sans-serif' }}>
                  Bestill levering
                  <ArrowRight className="w-5 h-5 text-white" />
                </button>
              </Link>
            </div>

            {/* Pricing text and button */}
            <div className="space-y-4" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
              <p className="text-base" style={{ color: 'hsl(150, 30%, 15%)' }}>
                Faste og rimelige priser - beregnet etter avstand.
              </p>
              <Link href="/priser" className="inline-block font-semibold text-lg md:text-xl transition-colors hover:opacity-80" style={{ color: 'hsl(150, 30%, 15%)' }}>
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
