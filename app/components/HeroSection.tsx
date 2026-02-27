"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "./ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center px-6 py-16 md:py-24 bg-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left side: Text content */}
          <div>
            {/* Main headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', color: 'oklch(64.6% 0.222 41.116)' }}>
              Umiddelbar henting og levering.
            </h1>

            {/* Subtitle - Desktop */}
            <div className="hidden md:block text-lg md:text-xl text-gray-700 mb-10 leading-relaxed space-y-4">
              <p className="font-semibold">Har du bestilt via klikk og hent og ønsker levering hjem?</p>
              <p className="font-semibold">Har du kjøpt noe på en markedsplass og ønsker umiddelbar levering?</p>
              <p className="font-bold text-gray-900">Vi henter og leverer små og store gjenstander mellom privatpersoner og bedrifter.</p>
            </div>

            {/* Description - Mobile */}
            <div className="md:hidden text-sm text-gray-700 mb-8 leading-relaxed space-y-3">
              <p className="font-semibold">Har du bestilt via klikk og hent og ønsker levering hjem?</p>
              <p className="font-semibold">Har du kjøpt noe på en markedsplass og ønsker umiddelbar levering?</p>
              <p className="font-bold text-gray-900">Vi henter og leverer små og store gjenstander mellom privatpersoner og bedrifter.</p>
            </div>

            {/* CTA Button */}
            <div className="flex gap-4 mb-10 flex-wrap">
              <Link href="/bestill">
                <Button variant="hero-primary" className="text-lg px-8 py-4">
                  Bestill levering
                  <ArrowRight className="w-5 h-5 text-white" />
                </Button>
              </Link>
            </div>

            {/* Pricing text and button */}
            <div className="space-y-4">
              <p className="text-base text-gray-600">
                Faste og rimelige priser - beregnet etter avstand.
              </p>
              <Link href="/priser" className="inline-block text-green-700 hover:text-green-800 font-bold text-lg md:text-xl transition-colors">
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
    </section>
  );
}
