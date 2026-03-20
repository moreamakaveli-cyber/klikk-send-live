"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import emailjs from "@emailjs/browser";

export default function LaunchPage() {
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;

    setIsSending(true);
    setSubmitError("");

    const trimmedContact = contact.trim();
    const isEmail = trimmedContact.includes("@");

    const templateParams = {
      name: "Lanseringsinteresse",
      phone: isEmail ? "" : trimmedContact,
      package: "Launch-notifisering",
      pickup: "Interesse registrert fra launch-siden",
      delivery: "Bruker vil ha beskjed ved lansering.",
      isKlikkHent: "Nei",
      pickupCode: "",
      deliveryName: "Launch lead",
      deliveryPhone: isEmail ? "" : trimmedContact,
      email: isEmail ? trimmedContact : "",
    };

    try {
      await emailjs.send(
        "service_476sm2p",
        "template_xmmnr9c",
        templateParams,
        "HLFNfJ-HvjqeXLMXL"
      );

      setSubmitted(true);
    } catch (error) {
      console.error("Kunne ikke sende launch-interesse pa e-post:", error);
      setSubmitError("Noe gikk galt ved sending. Prov igjen.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <Image
            src="/processing-bro.svg"
            alt="Illustrasjon av lansering"
            width={260}
            height={260}
            className="h-auto w-full max-w-[260px]"
            priority
          />
        </div>
        <h1 className="text-3xl md:text-5xl font-semibold mb-4" style={{ color: 'hsl(150, 30%, 15%)', fontFamily: 'var(--font-serif), serif' }}>
          Vi lanserer snart!
        </h1>
        <p className="text-base md:text-lg mb-2" style={{ color: 'hsl(150, 30%, 15%)', fontFamily: 'var(--font-sans), sans-serif' }}>
          Hently er fortsatt under utvikling. Vi åpner for bestillinger snart.
        </p>
        <p className="text-sm md:text-base mb-6" style={{ color: 'hsl(150, 30%, 15%)', fontFamily: 'var(--font-sans), sans-serif' }}>
          Legg igjen e-post eller nummer, så gir vi deg beskjed når vi er live.
        </p>

        {submitted ? (
          <div className="rounded-xl p-4" style={{ backgroundColor: '#F7F7F7' }}>
            <p className="text-base md:text-lg" style={{ color: 'hsl(150, 30%, 15%)', fontFamily: 'var(--font-sans), sans-serif' }}>
              Takk. Vi gir deg beskjed så snart vi er live.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Skriv e-post eller telefonnummer"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2"
              style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)', caretColor: 'hsl(150, 30%, 15%)' }}
            />
            <button
              type="submit"
              disabled={isSending}
              className="w-full rounded-lg px-4 py-3 font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'oklch(70.5% 0.213 47.604)', fontFamily: 'var(--font-sans), sans-serif' }}
            >
              {isSending ? "Sender..." : "Få beskjed ved lansering"}
            </button>
            {submitError && (
              <p className="text-sm text-red-600" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                {submitError}
              </p>
            )}
          </form>
        )}

        <Link href="/" className="inline-block mt-6">
          <button
            type="button"
            className="rounded-lg px-4 py-2.5 font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#F7F7F7', color: 'hsl(150, 30%, 15%)', fontFamily: 'var(--font-sans), sans-serif' }}
          >
            Tilbake til forsiden
          </button>
        </Link>
      </div>
    </main>
  );
}

