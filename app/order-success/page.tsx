"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { CheckCircle } from "lucide-react";
import { saveOrder } from "@/lib/supabase";
import { clearPendingOrder, loadPendingOrder } from "@/lib/pending-order";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/button";

function OrderSuccessContent() {
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    const completeOrder = async () => {
      const pending = loadPendingOrder();
      if (!pending) {
        setStatus("error");
        return;
      }

      try {
        await saveOrder({
          name: pending.name,
          phone: pending.phone,
          pickup_address: pending.pickup_address,
          delivery_address: pending.delivery_address,
          package_size: pending.package_size,
        });

        await emailjs.send(
          "service_476sm2p",
          "template_xmmnr9c",
          pending.emailParams,
          "HLFNfJ-HvjqeXLMXL"
        );

        clearPendingOrder();
        setStatus("ok");
      } catch (error) {
        console.error("Kunne ikke fullføre bestilling:", error);
        setStatus("error");
      }
    };

    completeOrder();
  }, []);

  return (
    <section className="py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        {status === "loading" && (
          <p className="text-lg" style={{ color: "hsl(150, 30%, 15%)" }}>
            Fullfører bestillingen...
          </p>
        )}

        {status === "ok" && (
          <>
            <div className="mb-8 flex justify-center">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <h1
              className="text-3xl md:text-4xl font-normal mb-4"
              style={{ fontFamily: "var(--font-serif), serif", color: "hsl(150, 30%, 15%)" }}
            >
              Betaling mottatt!
            </h1>
            <p className="text-lg mb-10" style={{ color: "hsl(150, 10%, 45%)" }}>
              Du får snart SMS med bekreftet pris og tidspunkt.
            </p>
            <Link href="/takk">
              <Button variant="hero-primary" className="px-8 py-3">
                Fortsett
              </Button>
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <h1
              className="text-3xl md:text-4xl font-normal mb-4"
              style={{ fontFamily: "var(--font-serif), serif", color: "hsl(150, 30%, 15%)" }}
            >
              Noe gikk galt
            </h1>
            <p className="text-lg mb-10" style={{ color: "hsl(150, 10%, 45%)" }}>
              Kontakt oss hvis betalingen gikk gjennom, men bestillingen ikke ble registrert.
            </p>
            <Link href="/kontakt-oss">
              <Button variant="hero-primary" className="px-8 py-3">
                Kontakt oss
              </Button>
            </Link>
          </>
        )}
      </div>
    </section>
  );
}

export default function OrderSuccess() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Suspense fallback={<div className="py-20 text-center">Laster...</div>}>
        <OrderSuccessContent />
      </Suspense>
      <Footer />
    </main>
  );
}
