"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, Menu, X, Phone, Users, Shield, HelpCircle, Clock, Building } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const orange = "oklch(70.5% 0.213 47.604)";
const dark = "hsl(150, 30%, 15%)";

function TopNavLink({
  href,
  label,
  isOrange,
  className = "",
}: {
  href: string;
  label: string;
  isOrange?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`relative font-normal group transition-opacity hover:opacity-80 ${className}`}
      style={{
        fontFamily: "var(--font-serif), serif",
        color: isOrange ? orange : dark,
      }}
    >
      {label}
      <span
        className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full group-focus-visible:w-full group-active:w-full transition-all duration-200 rounded-full"
        style={{ backgroundColor: orange }}
      />
    </Link>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMenuOpen]);

  const menuItems = [
    { href: "/for-bedrifter", label: "For bedrifter", icon: Building },
    { href: "/om-oss", label: "Om oss", icon: Users },
    { href: "/apningstider", label: "Åpningstider", icon: Clock },
    { href: "/trygghet-og-sikkerhet", label: "Trygghet og sikkerhet", icon: Shield },
    { href: "/dette-lurer-mange-pa", label: "Ofte stilte spørsmål", icon: HelpCircle },
    { href: "/pakkeinnhold", label: "Pakkeinnhold", icon: Package },
    { href: "/kontakt-oss", label: "Kontakt oss", icon: Phone },
    { href: "/jobb-i-hently", label: "Jobb i Hently", icon: Users },
  ];

  return (
    <>
      <nav className="w-full" style={{ backgroundColor: "#FFFFFF", marginTop: 0, paddingTop: 0 }}>
        <div
          className="max-w-[1400px] mx-auto px-6 md:px-8 pt-0 pb-2 md:pt-0 md:pb-3 flex items-center justify-between"
          style={{ minHeight: "160px" }}
        >
          <div className="flex items-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleMenu();
              }}
              className="w-8 h-8 flex items-center justify-center z-[60] relative"
              style={{ color: dark }}
              aria-label="Toggle menu"
              type="button"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link href="/" className="hidden md:flex items-center" style={{ marginLeft: "-19px" }}>
              <img src="/logo.png" alt="Hently" style={{ height: "130px", width: "auto" }} />
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-3 flex-1 justify-center">
            <Link
              href="/voks-bedriften-din"
              className="font-normal transition-opacity hover:opacity-80"
              style={{ fontFamily: "var(--font-serif), serif", color: orange, fontSize: "0.875rem" }}
            >
              For bedrifter
            </Link>
            <Link
              href="/for-bedrifter"
              className="font-normal transition-opacity hover:opacity-80"
              style={{ fontFamily: "var(--font-serif), serif", color: dark, fontSize: "0.875rem" }}
            >
              Start samarbeid
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6 md:gap-8 ml-auto">
            <TopNavLink
              href="/voks-bedriften-din"
              label="Få bedriften din til å vokse"
              isOrange
              className="text-base"
            />
            <TopNavLink href="/for-bedrifter" label="Start samarbeid" className="text-base" />
            <TopNavLink href="/#how-it-works" label="Tjenester" className="text-base" />
          </div>

          <div className="md:hidden" />
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-[45]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-[50] shadow-2xl"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <Link href="/" className="flex items-center" onClick={closeMenu}>
                <img src="/logo.png" alt="Hently" style={{ height: "130px", width: "auto" }} />
              </Link>
              <button
                onClick={closeMenu}
                className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors"
                type="button"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="p-4">
              <ul className="space-y-2">
                {menuItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.25 }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors group"
                      >
                        <Icon className="w-5 h-5 text-orange-600 group-hover:text-orange-700 transition-colors flex-shrink-0" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
