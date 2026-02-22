"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, Menu, X, Home, Info, Star, Lightbulb, Leaf, DollarSign, Phone, Users, Shield, HelpCircle, Clock } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const menuItems = [
    { href: "/", label: "Hjem", icon: Home },
    { href: "/om-oss", label: "Om oss", icon: Users },
    { href: "/apningstider", label: "Åpningstider", icon: Clock },
    { href: "/trygghet-og-sikkerhet", label: "Trygghet og sikkerhet", icon: Shield },
    { href: "/dette-lurer-mange-pa", label: "Ofte stilte spørsmål", icon: HelpCircle },
    { href: "/pakkeinnhold", label: "Pakkeinnhold", icon: Package },
    { href: "/#how-it-works", label: "Slik fungerer det", icon: Info },
    { href: "/#why-choose", label: "Hvorfor velge Klikk&Send", icon: Star },
    { href: "/#how-to-use", label: "Hvordan kan du bruke oss", icon: Lightbulb },
    { href: "/#sustainability", label: "Bærekraft", icon: Leaf },
    { href: "/priser", label: "Priser", icon: DollarSign },
    { href: "/kontakt-oss", label: "Kontakt oss", icon: Phone },
  ];

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-5 flex items-center justify-between">
          {/* Left side: Menu button and Logo */}
          <div className="flex items-center gap-3">
          {/* Menu Button */}
          <button 
            onClick={toggleMenu}
            className="w-8 h-8 flex items-center justify-center text-gray-900"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Klikk&Send</span>
          </Link>
        </div>

        {/* Mobile: Contact icon - top right */}
        <div className="flex md:hidden items-center">
          <Link href="/kontakt-oss" className="flex flex-col items-center gap-1 group">
            <div className="w-10 h-10 rounded-full border-2 border-orange-600 flex items-center justify-center bg-white group-hover:bg-orange-50 transition-colors">
              <Phone className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-xs font-medium text-gray-900">Kontakt oss</span>
          </Link>
        </div>

        {/* Right side: Icon Navigation - Hidden on mobile, shown on desktop */}
        <div className="hidden md:flex items-center gap-4 md:gap-6">
          {/* Om oss */}
          <Link href="/om-oss" className="flex flex-col items-center gap-1 group">
            <div className="w-10 h-10 rounded-full border-2 border-orange-600 flex items-center justify-center bg-white group-hover:bg-orange-50 transition-colors">
              <Users className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-xs font-medium text-gray-900">Om oss</span>
          </Link>

          {/* Åpningstider */}
          <Link href="/apningstider" className="flex flex-col items-center gap-1 group">
            <div className="w-10 h-10 rounded-full border-2 border-orange-600 flex items-center justify-center bg-white group-hover:bg-orange-50 transition-colors">
              <Clock className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-xs font-medium text-gray-900">Åpningstider</span>
          </Link>

          {/* Sende pakke - Highlighted */}
          <Link href="/bestill" className="flex flex-col items-center gap-1 group">
            <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center group-hover:bg-orange-700 transition-colors shadow-md">
              <Package className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-medium text-gray-900">Sende pakke</span>
          </Link>

          {/* Kontakt oss */}
          <Link href="/kontakt-oss" className="flex flex-col items-center gap-1 group">
            <div className="w-10 h-10 rounded-full border-2 border-orange-600 flex items-center justify-center bg-white group-hover:bg-orange-50 transition-colors">
              <Phone className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-xs font-medium text-gray-900">Kontakt oss</span>
          </Link>
        </div>
        </div>
      </nav>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={closeMenu}
        />
      )}

      {/* Navigation Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Klikk&Send</span>
          </Link>
          <button
            onClick={closeMenu}
            className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Close menu"
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
                    <Icon className="w-5 h-5 text-gray-500 group-hover:text-orange-600 transition-colors" />
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
