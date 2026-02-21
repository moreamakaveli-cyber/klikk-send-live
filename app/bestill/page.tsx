"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function Bestill() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedSize, setSelectedSize] = useState<PackageSize>(null);
  const [formData, setFormData] = useState({
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

      if (
        formData.pickupFirstName &&
        formData.pickupLastName &&
        formData.pickupPhone &&
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
      // Validate input
      if (
        !formData.pickupFirstName ||
        !formData.pickupLastName ||
        !formData.pickupPhone ||
        !formData.pickupStreet ||
        !formData.pickupPostalCode ||
        !formData.pickupCity ||
        !formData.deliveryStreet ||
        !formData.deliveryPostalCode ||
        !formData.deliveryCity ||
        !selectedSize
      ) {
        alert("Vennligst fyll ut alle felter.");
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

      // Save order to Supabase
      const fullName = `${formData.pickupFirstName} ${formData.pickupLastName}`;
      const packageSize = packageOptions.find((p) => p.id === selectedSize)?.title || "";

      await saveOrder({
        name: fullName,
        phone: formData.pickupPhone,
        pickup_address: pickupAddress,
        delivery_address: deliveryAddress,
        package_size: packageSize,
      });

      // Send email via EmailJS
      const templateParams = {
        name: fullName,
        phone: formData.pickupPhone,
        package: packageSize,
        pickup: pickupAddress,
        delivery: deliveryAddress,
      };

      await emailjs.send(
        "service_476sm2p",
        "template_xmmnr9c",
        templateParams,
        "HLFNfJ-HvjqeXLMXL"
      );

      // Navigate to thank you page after successful save and email send
      router.push("/takk");
    } catch (error: any) {
      console.error("Failed to save order or send email:", error);
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
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
                Velg størrelse på levering
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {packageOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = selectedSize === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelectedSize(option.id)}
                      className={`p-8 rounded-2xl border-2 transition-all duration-200 text-left ${
                        isSelected
                          ? "border-orange-200 bg-orange-50 shadow-sm"
                          : "border-orange-200 bg-orange-50 hover:border-orange-300 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            isSelected ? "bg-orange-600" : "bg-orange-200"
                          }`}
                        >
                          <Icon
                            className={`w-6 h-6 ${
                              isSelected ? "text-white" : "text-orange-600"
                            }`}
                          />
                        </div>
                        <h3 className={`text-2xl md:text-3xl font-bold ${
                          isSelected ? "text-orange-600" : "text-gray-900"
                        }`}>{option.title}</h3>
                      </div>
                      <div className="space-y-2 mb-3">
                        <p className="font-semibold text-gray-700">{option.maxWeight}</p>
                        <p className="font-semibold text-gray-700">{option.maxDimensions}</p>
                      </div>
                      <p className="text-sm text-gray-500">Eksempler: {option.examples}</p>
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
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
                Hvor skal vi hente og levere?
              </h1>
              <div className="max-w-6xl mx-auto">
                {/* Two-column layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Left column: Henting */}
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Henting</h2>
                    <p className="text-gray-600 mb-6">Hvem henter vi fra?</p>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="pickupFirstName"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Navn (person vi henter fra) *
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            id="pickupFirstName"
                            name="pickupFirstName"
                            placeholder="Fornavn"
                            value={formData.pickupFirstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900"
                          />
                          <input
                            type="text"
                            id="pickupLastName"
                            name="pickupLastName"
                            placeholder="Etternavn"
                            value={formData.pickupLastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="pickupPhone"
                          className="block text-sm font-medium text-gray-700 mb-2"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="pickupStreet"
                          className="block text-sm font-medium text-gray-700 mb-2"
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900"
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
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900"
                            />
                            <input
                              type="text"
                              id="pickupCity"
                              name="pickupCity"
                              placeholder="By"
                              value={formData.pickupCity}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right column: Levering */}
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Levering</h2>
                    <p className="text-gray-600 mb-6">Hvem leverer vi til?</p>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="deliveryFirstName"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Navn (mottaker) *
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            id="deliveryFirstName"
                            name="deliveryFirstName"
                            placeholder="Fornavn"
                            value={formData.deliveryFirstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900"
                          />
                          <input
                            type="text"
                            id="deliveryLastName"
                            name="deliveryLastName"
                            placeholder="Etternavn"
                            value={formData.deliveryLastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="deliveryPhone"
                          className="block text-sm font-medium text-gray-700 mb-2"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="deliveryStreet"
                          className="block text-sm font-medium text-gray-700 mb-2"
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900"
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
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900"
                            />
                            <input
                              type="text"
                              id="deliveryCity"
                              name="deliveryCity"
                              placeholder="By"
                              value={formData.deliveryCity}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-900"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comment textarea below both columns */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 mb-6">
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700 mb-2"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none bg-white text-gray-900 placeholder:text-gray-400"
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
                      !formData.pickupFirstName ||
                      !formData.pickupLastName ||
                      !formData.pickupPhone ||
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
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
                Bekreft bestilling
              </h1>
              <div className="max-w-4xl mx-auto space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Bestillingsdetaljer</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Henting boks */}
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h4 className="text-base font-semibold text-gray-900 mb-3">Vi henter fra</h4>
                      <div className="space-y-2 text-gray-700">
                        <div>
                          <span className="font-medium">Navn:</span>{" "}
                          {formData.pickupFirstName} {formData.pickupLastName}
                        </div>
                        <div>
                          <span className="font-medium">Telefonnummer:</span>{" "}
                          {formData.pickupPhone}
                        </div>
                        <div>
                          <span className="font-medium">Adresse:</span>{" "}
                          {combineAddress(
                            formData.pickupStreet,
                            formData.pickupPostalCode,
                            formData.pickupCity
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Levering boks */}
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h4 className="text-base font-semibold text-gray-900 mb-3">Vi leverer til</h4>
                      <div className="space-y-2 text-gray-700">
                        <div>
                          <span className="font-medium">Navn:</span>{" "}
                          {formData.deliveryFirstName} {formData.deliveryLastName}
                        </div>
                        <div>
                          <span className="font-medium">Telefonnummer:</span>{" "}
                          {formData.deliveryPhone}
                        </div>
                        <div>
                          <span className="font-medium">Adresse:</span>{" "}
                          {combineAddress(
                            formData.deliveryStreet,
                            formData.deliveryPostalCode,
                            formData.deliveryCity
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pakkestørrelse */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="text-gray-700">
                    <span className="font-medium">Pakkestørrelse:</span>{" "}
                    {packageOptions.find((p) => p.id === selectedSize)?.title}
                  </div>
                </div>
                {/* Pricing guide */}
                <div className="rounded-2xl p-6" style={{ background: '#eef6ef', border: '1px solid #d1e5d4' }}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Prisguide</h3>
                  <div className="space-y-2 text-sm text-gray-700 mb-4">
                    <div>Kort levering (0–3 km) – 119 kr</div>
                    <div>Medium levering (3–6 km) – 169 kr</div>
                    <div>Lengre levering (6–20 km) – 219 kr</div>
                  </div>
                  <p className="text-base font-bold text-gray-900">
                    Endelig pris bekreftes på SMS før henting.
                  </p>
                </div>
              </div>
              <div className="flex justify-between mt-8 max-w-2xl mx-auto">
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
                  onClick={handleConfirm}
                  disabled={isSending}
                  className="px-8 py-3"
                >
                  {isSending ? "Sender..." : "Bekreft bestilling"}
                  {!isSending && <Check className="w-5 h-5" />}
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
