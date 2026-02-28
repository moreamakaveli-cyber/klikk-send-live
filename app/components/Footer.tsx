"use client";
import Link from "next/link";
import { Package, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="pt-16 w-full">
      {/* Main orange section - full width */}
      <div className="rounded-t-3xl p-8 md:p-12 text-white w-full" style={{ backgroundColor: 'hsl(24, 85%, 50%)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            {/* Left Column: Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6" style={{ color: 'hsl(24, 85%, 50%)' }} strokeWidth={2} fill="none" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
                  Klikk og Send
                </h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
                Vi leverer rask og pålitelig henting og levering i hele Oslo-området. Din tid er verdifull - la oss ta oss av leveransen.
              </p>
            </div>

            {/* Second Column: Links */}
            <div>
              <h3 className="font-semibold mb-4 text-lg" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
                Lenker
              </h3>
              <ul className="space-y-3 text-sm md:text-base" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
                <li>
                  <Link href="/#how-it-works" className="hover:opacity-80 transition-opacity">
                    Tjenester
                  </Link>
                </li>
                <li>
                  <Link href="/#how-it-works" className="hover:opacity-80 transition-opacity">
                    Slik fungerer det
                  </Link>
                </li>
                <li>
                  <Link href="/om-oss" className="hover:opacity-80 transition-opacity">
                    Om oss
                  </Link>
                </li>
              </ul>
            </div>

            {/* Third Column: Bedrift */}
            <div>
              <h3 className="font-semibold mb-4 text-lg" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
                Bedrift
              </h3>
              <ul className="space-y-3 text-sm md:text-base" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
                <li>
                  <Link href="/om-oss" className="hover:opacity-80 transition-opacity">
                    Om oss
                  </Link>
                </li>
                <li>
                  <Link href="/trygghet-og-sikkerhet" className="hover:opacity-80 transition-opacity">
                    Trygghet og sikkerhet
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt-oss" className="hover:opacity-80 transition-opacity">
                    Kontakt oss
                  </Link>
                </li>
              </ul>
            </div>

            {/* Right Column: Contact */}
            <div>
              <h3 className="font-semibold mb-4 text-lg" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
                Kontakt
              </h3>
              <ul className="space-y-3 text-sm md:text-base" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                  <a href="mailto:oslo@klikkogsend.no" className="hover:opacity-80 transition-opacity">
                    oslo@klikkogsend.no
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                  <a href="tel:+4797940097" className="hover:opacity-80 transition-opacity">
                    +47 979 40 097
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                  <a href="tel:+4792117289" className="hover:opacity-80 transition-opacity">
                    +47 921 17 289
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                  <span>Oslo, Norge</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright and legal links */}
        <div className="border-t border-white/20 mt-8 pt-6">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm md:text-base" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
              <div>
                © 2026 Klikk og Send. Alle rettigheter reservert.
              </div>
              <div className="flex gap-6">
                <Link href="#privacy" className="hover:opacity-80 transition-opacity">
                  Personvern
                </Link>
                <Link href="#terms" className="hover:opacity-80 transition-opacity">
                  Vilkår
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
