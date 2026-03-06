"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<"banner" | "settings">("banner");
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [personalizationEnabled, setPersonalizationEnabled] = useState(true);
  const [showLesMerModal, setShowLesMerModal] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const consent = window.localStorage.getItem("cookie-consent");
    if (consent !== "accepted") {
      setVisible(true);
      setMode("banner");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => {
      try {
        setVisible(true);
        setMode("settings");
      } catch (_) {
        // avoid unhandled rejection in dev
      }
    };
    window.addEventListener("open-cookie-settings", handler);
    return () => {
      window.removeEventListener("open-cookie-settings", handler);
    };
  }, []);

  const accept = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("cookie-consent", "accepted");
      window.localStorage.setItem(
        "cookie-preferences",
        JSON.stringify({
          analytics: true,
          personalization: true,
        })
      );
    }
    setVisible(false);
  };

  const confirmSelection = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("cookie-consent", "accepted");
      window.localStorage.setItem(
        "cookie-preferences",
        JSON.stringify({
          analytics: analyticsEnabled,
          personalization: personalizationEnabled,
        })
      );
    }
    setVisible(false);
  };

  if (!visible) return null;

  const isSettings = mode === "settings";

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      {/* Les mer-modal */}
      {showLesMerModal && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setShowLesMerModal(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowLesMerModal(false)}>
            <div
              className="rounded-2xl bg-white shadow-xl border border-gray-200 p-5 md:p-6 max-w-lg max-h-[85vh] overflow-y-auto"
              style={{ fontFamily: 'var(--font-sans), sans-serif' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start gap-4 mb-4">
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  Om informasjonskapsler
                </h3>
                <button
                  type="button"
                  onClick={() => setShowLesMerModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl leading-none"
                  aria-label="Lukk"
                >
                  ×
                </button>
              </div>
              <div className="text-sm text-gray-700 space-y-3">
                <p>
                  Vi bruker informasjonskapsler (cookies) for å sikre at nettsiden fungerer som den skal og for å gi deg en god brukeropplevelse. Cookies hjelper oss med å huske dine valg, forbedre innholdet vårt og analysere hvordan siden brukes.
                </p>
                <p>
                  Noen cookies er nødvendige for grunnleggende funksjoner, mens andre brukes til statistikk og forbedring av våre tjenester. Du kan når som helst administrere eller endre dine cookie-innstillinger.
                </p>
                <p>
                  Ved å bruke nettsiden vår samtykker du til vår bruk av cookies i henhold til våre retningslinjer.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowLesMerModal(false)}
                className="mt-4 rounded-full px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                style={{ backgroundColor: 'oklch(70.5% 0.213 47.604)' }}
              >
                Lukk
              </button>
            </div>
          </div>
        </>
      )}

      <div className="mx-auto max-w-[1400px] px-4 pb-4">
        <div
          className="rounded-2xl bg-white/95 shadow-lg border border-gray-200 p-4 md:p-5 flex flex-col gap-4"
        >
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

            <div className="flex-1" style={{ fontFamily: 'var(--font-sans), sans-serif', color: '#111827' }}>
              {isSettings ? (
                <>
                  <h2 className="text-sm md:text-base font-semibold mb-1">
                    Tilpass cookies
                  </h2>
                  <p className="text-sm md:text-base">
                    Vi bruker cookies som hjelper oss å forstå hvordan nettsiden brukes, slik at vi kan gi deg en god
                    og trygg brukeropplevelse.
                  </p>
                  <div className="mt-4 space-y-3 text-sm">
                    <div>
                      <p className="font-semibold">Formål</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked
                          readOnly
                          className="mt-1 accent-gray-700"
                        />
                        <div>
                          <p className="font-semibold">Nødvendige cookies</p>
                          <p className="text-xs text-gray-600">
                            Brukes for at nettsiden til Hently skal fungere, for eksempel for å huske valg du gjør.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={analyticsEnabled}
                          onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                          className="mt-1 accent-gray-700"
                        />
                        <div>
                          <p className="font-semibold">Analyse- og produktutviklings-cookies</p>
                          <p className="text-xs text-gray-600">
                            Hjelper oss å forstå bruk av tjenesten, slik at vi kan forbedre Hently over tid.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={personalizationEnabled}
                          onChange={(e) => setPersonalizationEnabled(e.target.checked)}
                          className="mt-1 accent-gray-700"
                        />
                        <div>
                          <p className="font-semibold">Tilpassings-cookies</p>
                          <p className="text-xs text-gray-600">
                            Brukes for å huske preferanser og gjøre opplevelsen mer personlig.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm md:text-base">
                    Vi bruker informasjonskapsler (cookies) for å gi deg en bedre opplevelse på nettsiden.
                  </p>
                  <p className="mt-1 text-xs md:text-sm text-gray-600">
                    Du kan når som helst endre innstillinger via «Cookieinnstillinger» nederst på siden.
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowLesMerModal(true)}
                className="text-xs md:text-sm underline hover:opacity-80 text-left"
                style={{ fontFamily: 'var(--font-sans), sans-serif', color: '#111827' }}
              >
                Les mer
              </button>
              {!isSettings && (
                <button
                  type="button"
                  onClick={() => setMode("settings")}
                  className="text-xs md:text-sm underline hover:opacity-80"
                  style={{ fontFamily: 'var(--font-sans), sans-serif', color: '#111827' }}
                >
                  Tilpass cookies
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              {isSettings && (
                <button
                  type="button"
                  onClick={confirmSelection}
                  className="rounded-full px-4 py-2 text-xs md:text-sm font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 transition-colors"
                  style={{ fontFamily: 'var(--font-sans), sans-serif' }}
                >
                  Bekreft valg
                </button>
              )}
              <button
                onClick={accept}
                className="rounded-full px-4 py-2 text-xs md:text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: 'oklch(70.5% 0.213 47.604)', fontFamily: 'var(--font-sans), sans-serif' }}
              >
                Godta alle cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

