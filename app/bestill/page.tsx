"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import emailjs from "@emailjs/browser";
import { saveOrder } from "@/lib/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Package, Box, Archive, ArrowRight, ArrowLeft, Check } from "lucide-react";
import Button from "../components/ui/button";

type PackageSize = "liten" | "medium" | "stor" | null;

interface PackageOption {
  id: PackageSize;
  title: string;
  text: string;
  maxWeight: string;
  maxDimensions: string;
  examples: string;
  icon: React.ComponentType<{ className?: string }>;
}

const packageOptions: PackageOption[] = [
  {
    id: "liten",
    title: "Liten",
    text: "Passer for små gjenstander som dokumenter, nøkler, små pakker, vesker eller en liten pose.",
    maxWeight: "Maks 10 kg",
    maxDimensions: "Maks 40 × 40 × 40 cm",
    examples: "Dokumenter, nøkler, små pakker, vesker, liten pose",
    icon: Package,
  },
  {
    id: "medium",
    title: "Mellomstor",
    text: "Passer for flere esker, ryggsekk, PC eller mindre kjøkkenutstyr.",
    maxWeight: "Maks 20 kg",
    maxDimensions: "Maks 60 × 50 × 50 cm",
    examples: "Flere esker, ryggsekk, PC, mindre kjøkkenutstyr",
    icon: Box,
  },
  {
    id: "stor",
    title: "Stor",
    text: "Passer for koffert, mikrobølgeovn, større esker eller lignende.",
    maxWeight: "Maks 35 kg",
    maxDimensions: "Maks 80 × 60 × 60 cm",
    examples: "Koffert, mikrobølgeovn, større esker",
    icon: Archive,
  },
];

function BestillContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isKlikkHent = searchParams.get('type') === 'klikk-hent';
  const [step, setStep] = useState(1);
  const [selectedSize, setSelectedSize] = useState<PackageSize>(null);
  const [formData, setFormData] = useState({
    pickupBusinessName: "",
    pickupPickupCode: "",
    pickupFirstName: "",
    pickupLastName: "",
    pickupPhone: "",
    pickupStreet: "",
    pickupPostalCode: "",
    pickupCity: "",
    deliveryFirstName: "",
    deliveryLastName: "",
    deliveryPhone: "",
    deliveryStreet: "",
    deliveryPostalCode: "",
    deliveryCity: "",
    comment: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Combine address fields into full address string
  const combineAddress = (street: string, postalCode: string, city: string): string => {
    return `${street}, ${postalCode} ${city}, Norway`;
  };

  // Validate address fields
  const validateAddress = (
    street: string,
    postalCode: string,
    city: string
  ): boolean => {
    if (!street.trim()) return false;
    if (!postalCode.trim() || !/^\d{4}$/.test(postalCode)) return false;
    if (!city.trim()) return false;
    return true;
  };

  const handleNext = () => {
    if (step === 1 && selectedSize) {
      setStep(2);
      setValidationError(null);
    } else if (step === 2) {
      // Validate all required fields
      const isPickupValid = validateAddress(
        formData.pickupStreet,
        formData.pickupPostalCode,
        formData.pickupCity
      );
      const isDeliveryValid = validateAddress(
        formData.deliveryStreet,
        formData.deliveryPostalCode,
        formData.deliveryCity
      );

      const pickupNameValid = isKlikkHent 
        ? formData.pickupBusinessName.trim() 
        : formData.pickupFirstName && formData.pickupLastName;
      
      const pickupPhoneValid = isKlikkHent ? true : formData.pickupPhone;

      if (
        pickupNameValid &&
        pickupPhoneValid &&
        isPickupValid &&
        formData.deliveryFirstName &&
        formData.deliveryLastName &&
        formData.deliveryPhone &&
        isDeliveryValid
      ) {
        setValidationError(null);
        setStep(3);
      } else {
        setValidationError("Vennligst fyll inn en gyldig adresse");
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    
    // Only allow numbers for postal code fields
    if (e.target.name === "pickupPostalCode" || e.target.name === "deliveryPostalCode") {
      value = value.replace(/\D/g, ""); // Remove non-numeric characters
    }
    
    // Only allow numbers for phone fields and limit to 9 digits
    if (e.target.name === "pickupPhone" || e.target.name === "deliveryPhone") {
      value = value.replace(/\D/g, ""); // Remove non-numeric characters
      if (value.length > 9) {
        value = value.slice(0, 9); // Limit to 9 digits
      }
    }
    
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError(null);
    }
  };


  const handleConfirm = async () => {
    setIsSending(true);
    
    try {
      // Validate input based on order type
      const isPickupValid = validateAddress(
        formData.pickupStreet,
        formData.pickupPostalCode,
        formData.pickupCity
      );
      const isDeliveryValid = validateAddress(
        formData.deliveryStreet,
        formData.deliveryPostalCode,
        formData.deliveryCity
      );

      const pickupNameValid = isKlikkHent
        ? formData.pickupBusinessName?.trim()
        : formData.pickupFirstName && formData.pickupLastName;

      const pickupPhoneValid = isKlikkHent ? true : formData.pickupPhone;

      if (
        !pickupNameValid ||
        !pickupPhoneValid ||
        !isPickupValid ||
        !formData.deliveryFirstName ||
        !formData.deliveryLastName ||
        !formData.deliveryPhone ||
        !isDeliveryValid ||
        !selectedSize
      ) {
        alert("Vennligst fyll ut alle obligatoriske felt.");
        setIsSending(false);
        return;
      }

      // Combine addresses
      const pickupAddress = combineAddress(
        formData.pickupStreet,
        formData.pickupPostalCode,
        formData.pickupCity
      );
      const deliveryAddress = combineAddress(
        formData.deliveryStreet,
        formData.deliveryPostalCode,
        formData.deliveryCity
      );

      // Prepare data based on order type
      const pickupName = isKlikkHent
        ? formData.pickupBusinessName
        : `${formData.pickupFirstName} ${formData.pickupLastName}`;
      const pickupPhone = isKlikkHent ? "" : formData.pickupPhone;
      const packageSize = packageOptions.find((p) => p.id === selectedSize)?.title || "";

      // Save order to Supabase (try, but don't fail if it errors)
      try {
        await saveOrder({
          name: pickupName,
          phone: pickupPhone,
          pickup_address: pickupAddress,
          delivery_address: deliveryAddress,
          package_size: packageSize,
        });
      } catch (saveError) {
        console.error("Failed to save to Supabase:", saveError);
        // Continue anyway
      }

      // Send email via EmailJS (try, but don't fail if it errors)
      try {
        const templateParams = {
          name: pickupName,
          phone: pickupPhone,
          package: packageSize,
          pickup: pickupAddress,
          delivery: deliveryAddress,
          isKlikkHent: isKlikkHent ? "Ja" : "Nei",
          pickupCode: formData.pickupPickupCode || "",
          deliveryName: `${formData.deliveryFirstName} ${formData.deliveryLastName}`,
          deliveryPhone: formData.deliveryPhone,
        };

        await emailjs.send(
          "service_476sm2p",
          "template_xmmnr9c",
          templateParams,
          "HLFNfJ-HvjqeXLMXL"
        );
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Continue anyway
      }

      // Navigate to thank you page after successful validation
      router.push("/takk");
    } catch (error: any) {
      console.error("Unexpected error:", error);
      alert(`Det oppstod en feil: ${error.message || "Vennligst prøv igjen."}`);
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Progress indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= s
                        ? "bg-orange-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-16 h-0.5 ${
                        step > s ? "bg-orange-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* STEP 1: Choose package size */}
          {step === 1 && (
            <div>
              <h1 className="text-3xl md:text-4xl font-normal mb-6 text-center" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
                Velg størrelse på levering
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                {packageOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = selectedSize === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelectedSize(option.id)}
                      className={`p-5 md:p-6 rounded-lg border transition-all duration-200 text-left ${
                        isSelected
                          ? "border-orange-600 bg-white shadow-sm"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                      style={{ backgroundColor: isSelected ? 'hsl(36, 40%, 97%)' : '#ffffff' }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isSelected ? "bg-orange-600" : "bg-gray-100"
                          }`}
                          style={isSelected ? { backgroundColor: 'oklch(70.5% 0.213 47.604)' } : {}}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              isSelected ? "text-white" : "text-gray-600"
                            }`}
                          />
                        </div>
                        <h3 className={`text-lg md:text-xl font-normal ${
                          isSelected ? "text-orange-600" : "text-gray-900"
                        }`} style={{ fontFamily: 'var(--font-serif), serif', color: isSelected ? 'oklch(70.5% 0.213 47.604)' : 'hsl(150, 30%, 15%)' }}>{option.title}</h3>
                      </div>
                      <div className="space-y-1 mb-2">
                        <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>{option.maxWeight}</p>
                        <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>{option.maxDimensions}</p>
                      </div>
                      <p className="text-xs text-gray-500" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>Eksempler: {option.examples}</p>
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-end">
                <Button
                  variant="hero-primary"
                  onClick={handleNext}
                  disabled={!selectedSize}
                  className="px-8 py-3"
                >
                  Neste
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Contact and addresses */}
          {step === 2 && (
            <div>
              <h1 className="text-3xl md:text-4xl font-normal mb-6 text-center" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
                Hvor skal vi hente og levere?
              </h1>
              <div className="max-w-6xl mx-auto">
                {/* Two-column layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 items-stretch">
                  {/* Left column: Henting */}
                  <div className="p-4 md:p-5 flex flex-col h-full">
                    <h2 className="text-lg md:text-xl font-normal mb-4" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
                      {isKlikkHent ? "Navn på butikk" : "Hvem henter vi fra?"}
                    </h2>
                    <div className="space-y-4 flex-grow">
                      {isKlikkHent && (
                        <>
                          <div>
                            <input
                              type="text"
                              id="pickupBusinessName"
                              name="pickupBusinessName"
                              placeholder="F.eks. Power, Elkjøp"
                              value={formData.pickupBusinessName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900 text-sm"
                              style={{ fontFamily: 'var(--font-sans), sans-serif' }}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="pickupPickupCode"
                              className="block text-sm font-medium mb-2"
                              style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}
                            >
                              Hentekode
                            </label>
                            <input
                              type="text"
                              id="pickupPickupCode"
                              name="pickupPickupCode"
                              placeholder="Hentekode hvis tilgjengelig"
                              value={formData.pickupPickupCode}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900 text-sm"
                              style={{ fontFamily: 'var(--font-sans), sans-serif' }}
                            />
                          </div>
                        </>
                      )}
                      {!isKlikkHent && (
                        <>
                          <div>
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                id="pickupFirstName"
                                name="pickupFirstName"
                                placeholder="Fornavn"
                                value={formData.pickupFirstName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900 text-sm"
                                style={{ fontFamily: 'var(--font-sans), sans-serif' }}
                              />
                              <input
                                type="text"
                                id="pickupLastName"
                                name="pickupLastName"
                                placeholder="Etternavn"
                                value={formData.pickupLastName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900 text-sm"
                                style={{ fontFamily: 'var(--font-sans), sans-serif' }}
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="pickupPhone"
                              className="block text-sm font-medium mb-2"
                              style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}
                            >
                              Telefonnummer *
                            </label>
                            <input
                              type="tel"
                              id="pickupPhone"
                              name="pickupPhone"
                              value={formData.pickupPhone}
                              onChange={handleInputChange}
                              maxLength={9}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900 text-sm"
                              style={{ fontFamily: 'var(--font-sans), sans-serif' }}
                            />
                          </div>
                        </>
                      )}
                      <div>
                        <label
                          htmlFor="pickupStreet"
                          className="block text-sm font-medium mb-2"
                          style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}
                        >
                          Henteadresse *
                        </label>
                        <div className="space-y-3">
                          <input
                            type="text"
                            id="pickupStreet"
                            name="pickupStreet"
                            placeholder="Gateadresse"
                            value={formData.pickupStreet}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900 text-sm"
                            style={{ fontFamily: 'var(--font-sans), sans-serif' }}
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              id="pickupPostalCode"
                              name="pickupPostalCode"
                              placeholder="Postnummer"
                              value={formData.pickupPostalCode}
                              onChange={handleInputChange}
                              required
                              maxLength={4}
                              pattern="[0-9]{4}"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900 text-sm"
                              style={{ fontFamily: 'var(--font-sans), sans-serif' }}
                            />
                            <input
                              type="text"
                              id="pickupCity"
                              name="pickupCity"
                              placeholder="By"
                              value={formData.pickupCity}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900 text-sm"
                              style={{ fontFamily: 'var(--font-sans), sans-serif' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right column: Levering */}
                  <div className="p-4 md:p-5 flex flex-col h-full">
                    <h2 className="text-lg md:text-xl font-normal mb-4" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>Levering til</h2>
                    <div className="space-y-4 flex-grow">
                      <div>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            id="deliveryFirstName"
                            name="deliveryFirstName"
                            placeholder="Fornavn"
                            value={formData.deliveryFirstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900 text-sm"
                            style={{ fontFamily: 'var(--font-sans), sans-serif' }}
                          />
                          <input
                            type="text"
                            id="deliveryLastName"
                            name="deliveryLastName"
                            placeholder="Etternavn"
                            value={formData.deliveryLastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900 text-sm"
                            style={{ fontFamily: 'var(--font-sans), sans-serif' }}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="deliveryPhone"
                          className="block text-sm font-medium mb-2"
                          style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}
                        >
                          Telefonnummer *
                        </label>
                        <input
                          type="tel"
                          id="deliveryPhone"
                          name="deliveryPhone"
                          value={formData.deliveryPhone}
                          onChange={handleInputChange}
                          maxLength={9}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900 text-sm"
                          style={{ fontFamily: 'var(--font-sans), sans-serif' }}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="deliveryStreet"
                          className="block text-sm font-medium mb-2"
                          style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}
                        >
                          Leveringsadresse *
                        </label>
                        <div className="space-y-3">
                          <input
                            type="text"
                            id="deliveryStreet"
                            name="deliveryStreet"
                            placeholder="Gateadresse"
                            value={formData.deliveryStreet}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900 text-sm"
                            style={{ fontFamily: 'var(--font-sans), sans-serif' }}
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              id="deliveryPostalCode"
                              name="deliveryPostalCode"
                              placeholder="Postnummer"
                              value={formData.deliveryPostalCode}
                              onChange={handleInputChange}
                              required
                              maxLength={4}
                              pattern="[0-9]{4}"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900 text-sm"
                              style={{ fontFamily: 'var(--font-sans), sans-serif' }}
                            />
                            <input
                              type="text"
                              id="deliveryCity"
                              name="deliveryCity"
                              placeholder="By"
                              value={formData.deliveryCity}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900 text-sm"
                              style={{ fontFamily: 'var(--font-sans), sans-serif' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comment textarea below both columns */}
                <div className="mb-6">
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium mb-2"
                    style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}
                  >
                    Beskjed til budet (valgfritt)
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="For eksempel: etasje, ringeklokke, portkode, hvor pakken står, eller andre leveringsinstrukser."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none bg-white text-gray-900 placeholder:text-gray-400 text-sm"
                    style={{ fontFamily: 'var(--font-sans), sans-serif' }}
                  />
                </div>

                {/* Validation error message */}
                {validationError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm font-medium">{validationError}</p>
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="flex justify-between">
                  <Button
                    variant="hero-secondary"
                    onClick={handleBack}
                    className="px-8 py-3"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Tilbake
                  </Button>
                  <Button
                    variant="hero-primary"
                    onClick={handleNext}
                    disabled={
                      (isKlikkHent 
                        ? !formData.pickupBusinessName?.trim()
                        : !formData.pickupFirstName || !formData.pickupLastName || !formData.pickupPhone) ||
                      !formData.pickupStreet ||
                      !formData.pickupPostalCode ||
                      !formData.pickupCity ||
                      !formData.deliveryFirstName ||
                      !formData.deliveryLastName ||
                      !formData.deliveryPhone ||
                      !formData.deliveryStreet ||
                      !formData.deliveryPostalCode ||
                      !formData.deliveryCity
                    }
                    className="px-8 py-3"
                  >
                    Fortsett
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Price confirmation */}
          {step === 3 && (
            <div>
              <h1 className="text-3xl md:text-4xl font-normal mb-6 text-center" style={{ fontFamily: 'var(--font-serif), serif', color: 'hsl(150, 30%, 15%)' }}>
                Bekreft bestilling
              </h1>
              <div className="max-w-3xl mx-auto space-y-4">
                {/* Henting og levering side-by-side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Henting */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="text-sm font-semibold mb-3" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>Vi henter fra</h4>
                    <div className="space-y-1.5 text-sm" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                      {isKlikkHent ? (
                        <>
                          <div><span className="font-medium">Butikk:</span> {formData.pickupBusinessName}</div>
                          {formData.pickupPickupCode && <div><span className="font-medium">Hentekode:</span> {formData.pickupPickupCode}</div>}
                        </>
                      ) : (
                        <>
                          <div><span className="font-medium">Navn:</span> {formData.pickupFirstName} {formData.pickupLastName}</div>
                          <div><span className="font-medium">Telefon:</span> {formData.pickupPhone}</div>
                        </>
                      )}
                      <div><span className="font-medium">Adresse:</span> {combineAddress(formData.pickupStreet, formData.pickupPostalCode, formData.pickupCity)}</div>
                    </div>
                  </div>

                  {/* Levering */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="text-sm font-semibold mb-3" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>Vi leverer til</h4>
                    <div className="space-y-1.5 text-sm" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                      <div><span className="font-medium">Navn:</span> {formData.deliveryFirstName} {formData.deliveryLastName}</div>
                      <div><span className="font-medium">Telefon:</span> {formData.deliveryPhone}</div>
                      <div><span className="font-medium">Adresse:</span> {combineAddress(formData.deliveryStreet, formData.deliveryPostalCode, formData.deliveryCity)}</div>
                    </div>
                  </div>
                </div>

                {/* Pakkestørrelse */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-sm" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                    <span className="font-medium">Pakkestørrelse:</span> {packageOptions.find((p) => p.id === selectedSize)?.title}
                  </div>
                </div>

                {/* Prisoppsummering */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="text-sm font-semibold mb-3" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>Pris</h4>
                  <div className="space-y-1.5 text-sm" style={{ fontFamily: 'var(--font-sans), sans-serif', color: 'hsl(150, 30%, 15%)' }}>
                    <div className="flex justify-between">
                      <span>Kort levering (0–3 km):</span>
                      <span className="font-semibold">119 kr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Medium levering (3–6 km):</span>
                      <span className="font-semibold">169 kr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lengre levering (6–20 km):</span>
                      <span className="font-semibold">219 kr</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-6 max-w-2xl mx-auto">
                <Button
                  variant="hero-secondary"
                  onClick={handleBack}
                  className="px-6 py-2.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Tilbake
                </Button>
                <Button
                  variant="hero-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleConfirm();
                  }}
                  disabled={isSending}
                  className="px-6 py-2.5"
                >
                  {isSending ? "Sender..." : "Bekreft bestilling"}
                  {!isSending && <Check className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default function Bestill() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BestillContent />
    </Suspense>
  );
}
