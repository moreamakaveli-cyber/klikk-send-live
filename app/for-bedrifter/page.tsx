"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, TrendingUp, Trophy, Megaphone } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Rask levering – flere kjøp",
    text: "Når levering skjer umiddelbart, fjerner du friksjonen som ofte stopper kjøp. Det gjør at flere velger din bedrift.",
  },
  {
    icon: TrendingUp,
    title: "Øk omsetningen i din bedrift",
    text: "Vi jobber aktivt for å skaffe deg flere kunder. Gjennom vår plattform eksponeres produktene og tjenestene dine for riktig målgruppe – noe som gir økt synlighet og flere salg.",
  },
  {
    icon: Trophy,
    title: "Styrk konkurransekraften",
    text: "Skill deg ut fra konkurrenter som kun tilbyr vanlig henting i butikk. Med Hently kan du tilby en rask og fleksibel leveringsløsning som gir en bedre kundeopplevelse.",
  },
  {
    icon: Megaphone,
    title: "Synlighet og markedsføring",
    text: "Bedrifter som samarbeider med Hently kan også bli synlige på vår plattform. Dette kan bidra til at flere kunder oppdager og velger din bedrift.",
  },
];

export default function ForBedrifter() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Navbar />

      {/* Hero */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16 mt-10 md:mt-16 mb-16 md:mb-24">

          {/* Bilde */}
          <motion.div
            className="w-72 h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] flex-shrink-0 mx-auto md:mx-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src="/team-goals.svg"
              alt="Start samarbeid"
              width={448}
              height={448}
              className="w-full h-full"
            />
          </motion.div>

          {/* Tekst */}
          <div className="flex-grow text-center md:text-left">
            <motion.p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "oklch(70.5% 0.213 47.604)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              For bedrifter
            </motion.p>

            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-normal mb-6"
              style={{ fontFamily: "var(--font-serif), serif", color: "hsl(150, 30%, 15%)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Start samarbeid med{" "}
              <span style={{ color: "oklch(70.5% 0.213 47.604)" }}>Hently</span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0 mb-4"
              style={{ fontFamily: "var(--font-sans), sans-serif", color: "hsl(150, 20%, 30%)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Få virksomheten din til å vokse med Hently. Nå flere kunder, øk salget og tilby{" "}
              <span style={{ color: "oklch(70.5% 0.213 47.604)" }}>umiddelbar</span> levering fra butikk.
            </motion.p>

            <motion.p
              className="text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0 mb-8"
              style={{ fontFamily: "var(--font-sans), sans-serif", color: "hsl(150, 20%, 30%)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Fyll ut skjemaet, så kontakter vi deg med et{" "}
              <strong>uforpliktende tilbud tilpasset ditt behov</strong>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                href="/for-bedrifter/registrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white text-base transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "oklch(70.5% 0.213 47.604)",
                  fontFamily: "var(--font-sans), sans-serif",
                }}
              >
                Fyll ut skjema →
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Hvorfor samarbeide */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest mb-2 text-center"
            style={{ color: "oklch(70.5% 0.213 47.604)" }}>
            Fordeler
          </p>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-normal text-center"
            style={{ fontFamily: "var(--font-serif), serif", color: "hsl(150, 30%, 15%)" }}
          >
            Hvorfor samarbeide med{" "}
            <span style={{ color: "oklch(70.5% 0.213 47.604)" }}>Hently</span>?
          </h2>
        </motion.div>

        {/* Kort */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-16">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                className="p-6 md:p-8 rounded-3xl flex flex-col gap-4"
                style={{
                  backgroundColor: "#F7F7F7",
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -4, boxShadow: "0 8px 24px 0 rgba(0,0,0,0.08)" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "oklch(70.5% 0.213 47.604)" }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3
                  className="text-xl md:text-2xl font-normal"
                  style={{ fontFamily: "var(--font-serif), serif", color: "oklch(70.5% 0.213 47.604)" }}
                >
                  {reason.title}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ fontFamily: "var(--font-sans), sans-serif", color: "hsl(150, 20%, 30%)" }}
                >
                  {reason.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA bunn */}
        <motion.div
          className="rounded-3xl p-8 md:p-12 text-center mb-8"
          style={{ backgroundColor: "#F7F7F7" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3
            className="text-2xl md:text-3xl font-normal mb-4"
            style={{ fontFamily: "var(--font-serif), serif", color: "hsl(150, 30%, 15%)" }}
          >
            Klar til å komme i gang?
          </h3>
          <p
            className="text-base md:text-lg mb-8 max-w-lg mx-auto"
            style={{ fontFamily: "var(--font-sans), sans-serif", color: "hsl(150, 20%, 35%)" }}
          >
            Ta kontakt i dag – det er uforpliktende og gratis å registrere seg.
          </p>
          <Link
            href="/for-bedrifter/registrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white text-base transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "oklch(70.5% 0.213 47.604)",
              fontFamily: "var(--font-sans), sans-serif",
            }}
          >
            Start samarbeid →
          </Link>
        </motion.div>

      </div>
      <Footer />
    </main>
  );
}
