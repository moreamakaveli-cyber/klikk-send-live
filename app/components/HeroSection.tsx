"use client";

import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import Button from "./ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center px-6 py-20 bg-[#FAF9F6] overflow-hidden">
      {/* Background decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-orange-600" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
          Umiddelbar henting og levering.
        </h1>
        
        {/* Subtitle */}
        <p className="text-2xl md:text-3xl lg:text-4xl text-gray-900 mb-8 font-bold">
          Billig, raskt, trygt og enkelt.
        </p>

        {/* Description */}
        <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto font-bold leading-relaxed">
          Vi henter og leverer smått og stort. Alt fra nøkler og klær til møbler og elektronikk. Fra A til B, samme dag.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center mb-6">
          <Link href="/bestill">
            <Button variant="hero-primary" className="w-full sm:w-auto text-lg px-8 py-4">
              Bestill levering
              <ArrowRight className="w-5 h-5 text-white" />
            </Button>
          </Link>
        </div>

        {/* Pricing text and button */}
        <div className="text-center mb-12">
          <p className="text-base text-gray-600 mb-4">
            Vi har alltid lave priser basert på avstand.
          </p>
          <Link href="/priser" className="text-green-600 hover:text-green-700 font-bold text-lg md:text-xl lg:text-2xl transition-colors">
            Sjekk våre priser her
          </Link>
        </div>

      </div>
    </section>
  );
}
