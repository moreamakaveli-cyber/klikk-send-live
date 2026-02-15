import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import Button from "../components/ui/button";

export default function OrderConfirmed() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Takk for bestillingen!
          </h1>
          
          <div className="space-y-4 text-lg text-gray-700 mb-12">
            <p className="font-medium">
              Du får straks en SMS fra budet vårt.
            </p>
            <p>
              Vi kontakter deg snart for bekrefting av ankomst og pris.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Link href="/">
              <Button variant="hero-primary" className="px-8 py-3">
                Tilbake til forsiden
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
