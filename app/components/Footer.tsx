"use client";
import Link from "next/link";
import { Package, Mail, Phone, MapPin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Main orange section - full width, starts directly against white background */}
      <div className="rounded-t-3xl p-8 md:p-12 w-full" style={{ backgroundColor: 'oklch(70.5% 0.213 47.604)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            {/* Left Column: Brand */}
            <div>
              <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'rgba(255,255,255,0.92)' }}>
                  Hently
                </h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'rgba(255,255,255,0.92)' }}>
                Vi tilbyr umiddelbar henting og levering i hele Oslo. Din tid er verdifull - la oss ta oss av leveransen.
              </p>
            </div>

            {/* Second Column: Links */}
            <div>
              <h3 className="font-semibold mb-4 text-lg" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'rgba(255,255,255,0.92)' }}>
                Lenker
              </h3>
              <ul className="space-y-3 text-sm md:text-base" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
                <li>
                  <Link href="/#how-it-works" className="hover:opacity-80 transition-opacity" style={{ color: 'rgba(255,255,255,0.92)' }}>
                    Tjenester
                  </Link>
                </li>
                <li>
                  <Link href="/#how-it-works" className="hover:opacity-80 transition-opacity" style={{ color: 'rgba(255,255,255,0.92)' }}>
                    Slik fungerer det
                  </Link>
                </li>
                <li>
                  <Link href="/om-oss" className="hover:opacity-80 transition-opacity" style={{ color: 'rgba(255,255,255,0.92)' }}>
                    Om oss
                  </Link>
                </li>
              </ul>
            </div>

            {/* Third Column: Bedrift */}
            <div>
              <h3 className="font-semibold mb-4 text-lg" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'rgba(255,255,255,0.92)' }}>
                Bedrift
              </h3>
              <ul className="space-y-3 text-sm md:text-base" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
                <li>
                  <Link href="/om-oss" className="hover:opacity-80 transition-opacity" style={{ color: 'rgba(255,255,255,0.92)' }}>
                    Om oss
                  </Link>
                </li>
                <li>
                  <Link href="/trygghet-og-sikkerhet" className="hover:opacity-80 transition-opacity" style={{ color: 'rgba(255,255,255,0.92)' }}>
                    Trygghet og sikkerhet
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt-oss" className="hover:opacity-80 transition-opacity" style={{ color: 'rgba(255,255,255,0.92)' }}>
                    Kontakt oss
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt-oss" className="hover:opacity-80 transition-opacity" style={{ color: 'rgba(255,255,255,0.92)' }}>
                    Jobb i Hently
                  </Link>
                </li>
              </ul>
            </div>

            {/* Right Column: Contact */}
            <div>
              <h3 className="font-semibold mb-4 text-lg" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'rgba(255,255,255,0.92)' }}>
                Kontakt
              </h3>
              <ul className="space-y-3 text-sm md:text-base" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 flex-shrink-0" strokeWidth={2} style={{ color: 'rgba(255,255,255,0.85)' }} />
                  <a href="mailto:oslo@hently.no" className="hover:opacity-80 transition-opacity" style={{ color: 'rgba(255,255,255,0.92)' }}>
                    oslo@hently.no
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 flex-shrink-0" strokeWidth={2} style={{ color: 'rgba(255,255,255,0.85)' }} />
                  <a href="tel:+4797940097" className="hover:opacity-80 transition-opacity" style={{ color: 'rgba(255,255,255,0.92)' }}>
                    +47 979 40 097
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 flex-shrink-0" strokeWidth={2} style={{ color: 'rgba(255,255,255,0.85)' }} />
                  <a href="tel:+4792117289" className="hover:opacity-80 transition-opacity" style={{ color: 'rgba(255,255,255,0.92)' }}>
                    +47 921 17 289
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 flex-shrink-0" strokeWidth={2} style={{ color: 'rgba(255,255,255,0.85)' }} />
                  <span style={{ color: 'rgba(255,255,255,0.92)' }}>Oslo, Norge</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section with privacy heading and legal links */}
        <div className="border-t border-white/20 mt-8 pt-6">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-3" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
            <div>
              <h3 className="text-sm md:text-base font-semibold" style={{ color: 'rgba(255,255,255,0.92)' }}>
                Personvern
              </h3>
              <button
                type="button"
                className="mt-1 text-xs md:text-sm underline hover:opacity-80"
                style={{ color: 'rgba(255,255,255,0.92)', background: 'transparent' }}
                onClick={() => {
                  try {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new CustomEvent("open-cookie-settings"));
                    }
                  } catch (_) {
                    // avoid unhandled rejection
                  }
                }}
              >
                Cookieinnstillinger
              </button>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm md:text-base">
              <div className="flex items-center gap-4">
                <div style={{ color: 'rgba(255,255,255,0.92)' }}>
                  © 2026 Hently. Alle rettigheter reservert.
                </div>
                <a
                  href="https://www.instagram.com/hentlynorge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-white/10 p-1.5 hover:bg-white/20 transition-colors"
                  aria-label="Hently på Instagram"
                >
                  <Instagram className="w-6 h-6" style={{ color: 'rgba(255,255,255,0.92)' }} />
                </a>
              </div>
              <div className="flex gap-6">
                <Link href="#privacy" className="hover:opacity-80 transition-opacity" style={{ color: 'rgba(255,255,255,0.92)' }}>
                  Personvernserklæring
                </Link>
                <Link href="#terms" className="hover:opacity-80 transition-opacity" style={{ color: 'rgba(255,255,255,0.92)' }}>
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
