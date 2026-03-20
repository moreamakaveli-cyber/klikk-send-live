"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, Menu, X, Phone, Users, Shield, HelpCircle, Clock, Building, Handshake, DollarSign } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
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
      <nav className="w-full" style={{ backgroundColor: '#FFFFFF', marginTop: 0, paddingTop: 0 }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 pt-0 pb-2 md:pt-0 md:pb-3 flex items-center justify-between" style={{ minHeight: '160px' }}>
          {/* Left side: Menu button and Logo text */}
          <div className="flex items-center">
            {/* Menu Button - Always visible */}
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleMenu();
              }}
              className="w-8 h-8 flex items-center justify-center z-[60] relative"
              style={{ color: 'hsl(150, 30%, 15%)' }}
              aria-label="Toggle menu"
              type="button"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Logo - Desktop only */}
            <Link href="/" className="hidden md:flex items-center" style={{ marginLeft: "-19px" }}>
              <img src="/logo.png" alt="Hently" style={{ height: "130px", width: "auto" }} />
            </Link>
          </div>

          {/* Center: Mobile nav links */}
          <div className="flex md:hidden items-center gap-3 flex-1 justify-center">
            <Link href="/voks-bedriften-din" className="font-normal transition-opacity hover:opacity-80" style={{ fontFamily: 'var(--font-serif), serif', color: 'oklch(70.5% 0.213 47.604)', fontSize: '0.875rem' }}>
              For bedrifter
            </Link>
            <Link href="/for-bedrifter" className="font-normal transition-opacity hover:opacity-80" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)', fontSize: '0.875rem' }}>
              Bli kunde
            </Link>
          </div>

          {/* Right side: Nav links + Bestill nå - Desktop only */}
          <div className="hidden md:flex items-center gap-6 md:gap-8 ml-auto">
            <Link href="/voks-bedriften-din" className="font-normal transition-opacity hover:opacity-80" style={{ fontFamily: 'var(--font-serif), serif', color: 'oklch(70.5% 0.213 47.604)', fontSize: '1rem' }}>
              Få bedriften din til å vokse
            </Link>
            <Link href="/for-bedrifter" className="font-normal transition-opacity hover:opacity-80" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)', fontSize: '1rem' }}>
              Bli kunde
            </Link>
            <Link href="/#how-it-works" className="font-normal transition-opacity hover:opacity-80" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)', fontSize: '1rem' }}>
              Tjenester
            </Link>
            <Link href="/launch">
              <button className="rounded-full px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: 'oklch(70.5% 0.213 47.604)', fontFamily: 'var(--font-sans), sans-serif' }}>
                Bestill nå
              </button>
            </Link>
          </div>

          {/* Mobile right side intentionally empty */}
          <div className="md:hidden" />
        </div>
      </nav>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[45] transition-opacity duration-300"
          onClick={closeMenu}
          style={{ pointerEvents: 'auto' }}
        />
      )}

      {/* Navigation Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-[50] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ pointerEvents: isMenuOpen ? 'auto' : 'none' }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <Link href="/" className="flex items-center" onClick={closeMenu}>
            <img src="/logo.png" alt="Hently" style={{ height: "130px", width: "auto" }} />
          </Link>
          <button
            onClick={closeMenu}
            className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Close menu"
            type="button"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors group"
                  >
                    <Icon className="w-5 h-5 text-orange-600 group-hover:text-orange-700 transition-colors" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
