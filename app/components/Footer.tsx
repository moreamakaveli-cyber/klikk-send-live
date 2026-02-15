"use client";
import Link from "next/link";
import { Package, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Klikk&Send</span>
            </Link>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Tjenester</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/bestill" className="hover:text-orange-500 transition-colors">
                  Bestill levering
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-orange-500 transition-colors">
                  Slik fungerer det
                </Link>
              </li>
              <li>
                <Link href="/priser" className="hover:text-orange-500 transition-colors">
                  Priser
                </Link>
              </li>
              <li>
                <Link href="/dette-lurer-mange-pa" className="hover:text-orange-500 transition-colors">
                  Ofte stilte spørsmål
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Bedrift</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/om-oss" className="hover:text-orange-500 transition-colors">
                  Om oss
                </Link>
              </li>
              <li>
                <Link href="/trygghet-og-sikkerhet" className="hover:text-orange-500 transition-colors">
                  Trygghet og sikkerhet
                </Link>
              </li>
              <li>
                <Link href="/kontakt-oss" className="hover:text-orange-500 transition-colors">
                  Kontakt oss
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500" />
                <a href="mailto:oslo@klikkogsend.no" className="hover:text-orange-500 transition-colors">
                  oslo@klikkogsend.no
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <a href="tel:+4797940097" className="hover:text-orange-500 transition-colors">
                  +47 979 40 097
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <a href="tel:+4792117289" className="hover:text-orange-500 transition-colors">
                  +47 921 17 289
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 mt-0.5" />
                <span>Oslo, Norge</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-end items-center gap-4 text-sm text-gray-400">
          <div className="flex gap-6">
            <Link href="#privacy" className="hover:text-orange-500 transition-colors">
              Personvern
            </Link>
            <Link href="#terms" className="hover:text-orange-500 transition-colors">
              Vilkår
            </Link>
            <Link href="#cookies" className="hover:text-orange-500 transition-colors">
              Informasjonskapsler
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
