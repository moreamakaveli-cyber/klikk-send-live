"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[400px] md:min-h-[600px] flex items-center justify-center px-4 pt-0 pb-4 md:px-8 md:pt-0 md:pb-6 lg:pt-0 lg:pb-8"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8">
        <div
          className="rounded-3xl p-4 md:p-8 lg:p-10"
          style={{ backgroundColor: "#F7F7F7", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)] gap-6 md:gap-8 lg:gap-10 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="text-3xl md:text-5xl lg:text-6xl font-normal mb-3 md:mb-4 leading-tight"
                style={{ fontFamily: "var(--font-serif), serif", color: "hsl(150, 30%, 15%)" }}
              >
                Umiddelbar henting og levering.
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="hidden md:block text-lg md:text-xl mb-6 leading-relaxed space-y-3"
                style={{ color: "hsl(150, 30%, 15%)", fontFamily: "var(--font-sans), sans-serif" }}
              >
                <p className="font-semibold">
                  Tilby <span style={{ color: "oklch(70.5% 0.213 47.604)" }}>umiddelbar</span> levering til dine kunder
                </p>
                <p className="font-semibold">Direkte levering fra bedrift til kunde.</p>
                <p>Din tid er verdifull – la oss ta oss av leveransen.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="md:hidden text-sm mb-6 leading-relaxed space-y-3"
                style={{ color: "hsl(150, 30%, 15%)", fontFamily: "var(--font-sans), sans-serif" }}
              >
                <p className="font-semibold">
                  Tilby <span style={{ color: "oklch(70.5% 0.213 47.604)" }}>umiddelbar</span> levering til dine kunder
                </p>
                <p className="font-semibold">Direkte levering fra bedrift til kunde.</p>
                <p>Din tid er verdifull – la oss ta oss av leveransen.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="flex flex-row gap-2 md:gap-3 mb-4 md:mb-6 flex-nowrap overflow-x-auto"
              >
                <Link href="/bestill" className="flex-shrink-0">
                  <motion.button
                    className="rounded-lg px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm font-medium flex items-center gap-1.5 whitespace-nowrap"
                    style={{
                      backgroundColor: "oklch(70.5% 0.213 47.604)",
                      color: "#ffffff",
                      fontFamily: "var(--font-sans), sans-serif",
                    }}
                    whileHover={{ scale: 1.04, opacity: 0.92 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Levering
                    <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" style={{ color: "#ffffff" }} />
                  </motion.button>
                </Link>
                <Link href="/bestill?type=klikk-hent" className="flex-shrink-0">
                  <motion.button
                    className="rounded-lg px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm font-medium flex items-center gap-1.5 whitespace-nowrap"
                    style={{
                      backgroundColor: "oklch(70.5% 0.213 47.604)",
                      color: "#ffffff",
                      fontFamily: "var(--font-sans), sans-serif",
                    }}
                    whileHover={{ scale: 1.04, opacity: 0.92 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Henting
                    <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" style={{ color: "#ffffff" }} />
                  </motion.button>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.25, ease: "easeOut" }}
              className="flex items-center justify-center lg:justify-end w-full"
            >
              <div className="w-full max-w-xl sm:max-w-2xl lg:max-w-none">
                <Image
                  src="/hently-team-hero.png"
                  alt="Hently-team i uniform med Hently-logo"
                  width={1024}
                  height={674}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="w-full h-auto rounded-2xl object-cover lg:min-h-[380px] lg:object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
