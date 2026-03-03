"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const consent = window.localStorage.getItem("cookie-consent");
    if (consent !== "accepted") {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("cookie-consent", "accepted");
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-[1400px] px-4 pb-4">
        <div className="rounded-2xl bg-white/95 shadow-lg border border-gray-200 p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-start gap-3 md:gap-4">
            {/* Icon: open package with cookie */}
            <div className="hidden md:flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                aria-hidden="true"
              >
                {/* Box base */}
                <rect
                  x="6"
                  y="16"
                  width="28"
                  height="16"
                  rx="4"
                  fill="oklch(70.5% 0.213 47.604)"
                />
                {/* Box lid */}
                <rect
                  x="4"
                  y="12"
                  width="32"
                  height="6"
                  rx="3"
                  fill="oklch(70.5% 0.213 47.604)"
                  opacity="0.9"
                />
                {/* Cookie */}
                <circle cx="20" cy="10" r="6" fill="#F4B980" />
                {/* Cookie bites/dots */}
                <circle cx="18" cy="8" r="0.7" fill="#C26A26" />
                <circle cx="22" cy="11" r="0.8" fill="#C26A26" />
                <circle cx="19" cy="12" r="0.6" fill="#C26A26" />
              </svg>
            </div>

            <div className="text-sm md:text-base" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'oklch(70.5% 0.213 47.604 / 0.9)' }}>
            <p>
              Vi bruker informasjonskapsler (cookies) for å gi deg en bedre opplevelse
              på nettsiden.
            </p>
            <p className="mt-1 text-xs md:text-sm text-gray-600">
              Du kan når som helst endre innstillinger i nettleseren din.
            </p>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <Link
              href="/personvern"
              className="text-xs md:text-sm underline hover:opacity-80"
              style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'oklch(70.5% 0.213 47.604 / 0.9)' }}
            >
              Les mer
            </Link>
            <button
              onClick={accept}
              className="rounded-full px-4 py-2 text-xs md:text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: 'oklch(70.5% 0.213 47.604)', fontFamily: 'var(--font-sans), sans-serif' }}
            >
              Godta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

