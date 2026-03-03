"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function BedriftRegistrer() {
  const [formData, setFormData] = useState({
    bedriftsnavn: "",
    fornavn: "",
    etternavn: "",
    forretningsmail: "",
    bedriftstype: "",
    mobiltelefon: "+47",
    bedriftstelefon: "+47",
    akseptert: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      akseptert: e.target.checked,
    }));
    if (errors.akseptert) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.akseptert;
        return newErrors;
      });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    let value = e.target.value;
    // Ensure it starts with +47
    if (!value.startsWith("+47")) {
      value = "+47" + value.replace(/^\+47/, "");
    }
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.bedriftsnavn.trim()) {
      newErrors.bedriftsnavn = "Bedriftsnavn er påkrevd";
    }
    if (!formData.fornavn.trim()) {
      newErrors.fornavn = "Fornavn er påkrevd";
    }
    if (!formData.etternavn.trim()) {
      newErrors.etternavn = "Etternavn er påkrevd";
    }
    if (!formData.forretningsmail.trim()) {
      newErrors.forretningsmail = "Forretningsmail er påkrevd";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.forretningsmail)) {
      newErrors.forretningsmail = "Ugyldig e-postadresse";
    }
    if (!formData.bedriftstype) {
      newErrors.bedriftstype = "Bedriftstype er påkrevd";
    }
    if (!formData.mobiltelefon.trim() || formData.mobiltelefon === "+47") {
      newErrors.mobiltelefon = "Mobiltelefon er påkrevd";
    }
    if (!formData.bedriftstelefon.trim() || formData.bedriftstelefon === "+47") {
      newErrors.bedriftstelefon = "Bedriftstelefon er påkrevd";
    }
    if (!formData.akseptert) {
      newErrors.akseptert = "Du må akseptere personvernerklæringen";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSending(true);

    try {
      // Send email via EmailJS - using same template as bestill page
      const templateParams = {
        name: `${formData.fornavn} ${formData.etternavn}`,
        phone: formData.mobiltelefon,
        package: "Bedriftsforespørsel",
        pickup: `Bedrift: ${formData.bedriftsnavn}\nBedriftstype: ${formData.bedriftstype}\nE-post: ${formData.forretningsmail}`,
        delivery: `Bedriftstelefon: ${formData.bedriftstelefon}`,
        isKlikkHent: "Bedriftsforespørsel",
        pickupCode: "",
        deliveryName: formData.bedriftsnavn,
        deliveryPhone: formData.bedriftstelefon,
      };

      await emailjs.send(
        "service_476sm2p",
        "template_xmmnr9c",
        templateParams,
        "HLFNfJ-HvjqeXLMXL"
      );

      alert("Takk for din registrering! Vi kontakter deg snart.");
      
      // Reset form
      setFormData({
        bedriftsnavn: "",
        fornavn: "",
        etternavn: "",
        forretningsmail: "",
        bedriftstype: "",
        mobiltelefon: "+47",
        bedriftstelefon: "+47",
        akseptert: false,
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Det oppstod en feil ved sending av forespørselen. Vennligst prøv igjen eller kontakt oss direkte.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      <Navbar />
      <section className="py-12 md:py-16 px-6 md:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
            {/* Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-center mb-8 md:mb-12" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
              Er du klar til å utvide virksomheten din?
            </h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl p-6 md:p-8">
              {/* Bedriftsnavn */}
              <div>
                <label htmlFor="bedriftsnavn" className="block text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                  Bedriftsnavn <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="bedriftsnavn"
                  name="bedriftsnavn"
                  value={formData.bedriftsnavn}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                    errors.bedriftsnavn
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                  }`}
                  style={{ fontFamily: 'var(--font-sans), sans-serif' }}
                />
                {errors.bedriftsnavn && (
                  <p className="mt-1 text-sm text-red-500">{errors.bedriftsnavn}</p>
                )}
              </div>

              {/* Fornavn */}
              <div>
                <label htmlFor="fornavn" className="block text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                  Fornavn <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fornavn"
                  name="fornavn"
                  value={formData.fornavn}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                    errors.fornavn
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                  }`}
                  style={{ fontFamily: 'var(--font-sans), sans-serif' }}
                />
                {errors.fornavn && (
                  <p className="mt-1 text-sm text-red-500">{errors.fornavn}</p>
                )}
              </div>

              {/* Etternavn */}
              <div>
                <label htmlFor="etternavn" className="block text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                  Etternavn <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="etternavn"
                  name="etternavn"
                  value={formData.etternavn}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                    errors.etternavn
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                  }`}
                  style={{ fontFamily: 'var(--font-sans), sans-serif' }}
                />
                {errors.etternavn && (
                  <p className="mt-1 text-sm text-red-500">{errors.etternavn}</p>
                )}
              </div>

              {/* Forretningsmail */}
              <div>
                <label htmlFor="forretningsmail" className="block text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                  Forretningsmail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="forretningsmail"
                  name="forretningsmail"
                  value={formData.forretningsmail}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                    errors.forretningsmail
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                  }`}
                  style={{ fontFamily: 'var(--font-sans), sans-serif' }}
                />
                {errors.forretningsmail && (
                  <p className="mt-1 text-sm text-red-500">{errors.forretningsmail}</p>
                )}
              </div>

              {/* Bedriftstype */}
              <div>
                <label htmlFor="bedriftstype" className="block text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                  Bedriftstype <span className="text-red-500">*</span>
                </label>
                <select
                  id="bedriftstype"
                  name="bedriftstype"
                  value={formData.bedriftstype}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                    errors.bedriftstype
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                  }`}
                  style={{ fontFamily: 'var(--font-sans), sans-serif' }}
                >
                  <option value="">Velg bedriftstype</option>
                  <option value="e-handel">E-handel</option>
                  <option value="fysisk-butikk">Fysisk butikk</option>
                  <option value="varehus">Varehus</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="annet">Annet</option>
                </select>
                {errors.bedriftstype && (
                  <p className="mt-1 text-sm text-red-500">{errors.bedriftstype}</p>
                )}
              </div>

              {/* Mobiltelefon */}
              <div>
                <label htmlFor="mobiltelefon" className="block text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                  Mobiltelefon <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="mobiltelefon"
                  name="mobiltelefon"
                  value={formData.mobiltelefon}
                  onChange={(e) => handlePhoneChange(e, "mobiltelefon")}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                    errors.mobiltelefon
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                  }`}
                  style={{ fontFamily: 'var(--font-sans), sans-serif' }}
                />
                {errors.mobiltelefon && (
                  <p className="mt-1 text-sm text-red-500">{errors.mobiltelefon}</p>
                )}
              </div>

              {/* Bedriftstelefon */}
              <div>
                <label htmlFor="bedriftstelefon" className="block text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                  Bedriftstelefon <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="bedriftstelefon"
                  name="bedriftstelefon"
                  value={formData.bedriftstelefon}
                  onChange={(e) => handlePhoneChange(e, "bedriftstelefon")}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                    errors.bedriftstelefon
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                  }`}
                  style={{ fontFamily: 'var(--font-sans), sans-serif' }}
                />
                {errors.bedriftstelefon && (
                  <p className="mt-1 text-sm text-red-500">{errors.bedriftstelefon}</p>
                )}
              </div>

              {/* Checkbox */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="akseptert"
                  name="akseptert"
                  checked={formData.akseptert}
                  onChange={handleCheckboxChange}
                  className="mt-1 mr-3 w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="akseptert" className="text-sm" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                  Jeg har lest og akseptert{" "}
                  <a
                    href="/trygghet-og-sikkerhet"
                    className="underline hover:opacity-80"
                    style={{ color: 'oklch(70.5% 0.213 47.604)' }}
                  >
                    personvernerklæringen
                  </a>
                  <span className="text-red-500">*</span>
                </label>
              </div>
              {errors.akseptert && (
                <p className="text-sm text-red-500">{errors.akseptert}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSending}
                className="w-full py-4 px-6 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: 'oklch(70.5% 0.213 47.604)',
                  fontFamily: 'var(--font-sans), sans-serif',
                }}
              >
                {isSending ? "Sender..." : "Send forespørsel"}
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
