"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Package, Box, Archive, ArrowRight, ArrowLeft, Check } from "lucide-react";
import Button from "../components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

type PackageSize = "liten" | "medium" | "stor" | null;

const packageOptions = [
  {
    id: "liten" as PackageSize,
    title: "Liten",
    maxWeight: "Maks 10 kg",
    maxDimensions: "40 × 40 × 40 cm",
    icon: Package,
    emoji: "📦",
  },
  {
    id: "medium" as PackageSize,
    title: "Mellomstor",
    maxWeight: "Maks 20 kg",
    maxDimensions: "60 × 50 × 50 cm",
    icon: Box,
    emoji: "🗃️",
  },
  {
    id: "stor" as PackageSize,
    title: "Stor",
    maxWeight: "Maks 35 kg",
    maxDimensions: "80 × 60 × 60 cm",
    icon: Archive,
    emoji: "🛋️",
  },
];

const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

function Field({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium" style={{ color: "hsl(150, 30%, 15%)" }}>
          {label}
        </label>
      )}
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none bg-white text-gray-900 text-sm transition-all duration-150";

function BestillContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isKlikkHent = searchParams.get("type") === "klikk-hent";
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
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
  const [validationError, setValidationError] = useState<string | null>(null);

  const combineAddress = (street: string, postalCode: string, city: string) =>
    `${street}, ${postalCode} ${city}, Norway`;

  const validateAddress = (street: string, postalCode: string, city: string) =>
    !!street.trim() && /^\d{4}$/.test(postalCode) && !!city.trim();

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const handleNext = () => {
    if (step === 1 && selectedSize) {
      goTo(2);
      setValidationError(null);
    } else if (step === 2) {
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
        goTo(3);
      } else {
        setValidationError("Fyll inn alle obligatoriske felt.");
      }
    }
  };

  const handleBack = () => {
    if (step > 1) goTo(step - 1);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value = e.target.value;
    if (["pickupPostalCode", "deliveryPostalCode"].includes(e.target.name))
      value = value.replace(/\D/g, "");
    if (["pickupPhone", "deliveryPhone"].includes(e.target.name))
      value = value.replace(/\D/g, "").slice(0, 9);
    setFormData({ ...formData, [e.target.name]: value });
    if (validationError) setValidationError(null);
  };

  const isOrderValid = () => {
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

    return (
      !!pickupNameValid &&
      !!pickupPhoneValid &&
      isPickupValid &&
      !!formData.deliveryFirstName &&
      !!formData.deliveryLastName &&
      !!formData.deliveryPhone &&
      isDeliveryValid &&
      !!selectedSize
    );
  };

  const handleBestill = () => {
    if (!isOrderValid()) {
      alert("Vennligst fyll ut alle obligatoriske felt.");
      return;
    }
    router.push("/launch");
  };

  const stepLabels = ["Størrelse", "Adresser", "Bekreft"];

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Navbar />

      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Progress */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <motion.div
                    animate={{
                      backgroundColor:
                        step >= s ? "oklch(70.5% 0.213 47.604)" : "#E5E7EB",
                      scale: step === s ? 1.15 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm"
                    style={{ color: step >= s ? "#fff" : "#9CA3AF" }}
                  >
                    {step > s ? <Check className="w-4 h-4" /> : s}
                  </motion.div>
                  {s < 3 && (
                    <motion.div
                      animate={{
                        backgroundColor:
                          step > s ? "oklch(70.5% 0.213 47.604)" : "#E5E7EB",
                      }}
                      transition={{ duration: 0.4 }}
                      className="w-12 h-0.5 mx-1"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-12 text-xs" style={{ color: "hsl(150, 10%, 50%)" }}>
              {stepLabels.map((label, i) => (
                <span
                  key={label}
                  style={{
                    color:
                      step === i + 1
                        ? "oklch(70.5% 0.213 47.604)"
                        : "hsl(150, 10%, 60%)",
                    fontWeight: step === i + 1 ? 600 : 400,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Steps */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 40 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -40 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >

              {/* STEP 1 */}
              {step === 1 && (
                <div>
                  <h1
                    className="text-3xl font-normal mb-2 text-center"
                    style={{ fontFamily: "var(--font-serif), serif", color: "hsl(150, 30%, 15%)" }}
                  >
                    Hva skal sendes?
                  </h1>
                  <p className="text-center text-sm mb-8" style={{ color: "hsl(150, 10%, 50%)" }}>
                    Velg størrelsen som passer best
                  </p>

                  <div className="flex flex-col gap-3 mb-10">
                    {packageOptions.map((option) => {
                      const Icon = option.icon;
                      const isSelected = selectedSize === option.id;
                      return (
                        <motion.button
                          key={option.id}
                          onClick={() => setSelectedSize(option.id)}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center gap-5 p-5 rounded-2xl border-2 text-left transition-colors duration-150"
                          style={{
                            borderColor: isSelected
                              ? "oklch(70.5% 0.213 47.604)"
                              : "#E5E7EB",
                            backgroundColor: isSelected
                              ? "rgba(251,146,60,0.06)"
                              : "#FAFAFA",
                          }}
                        >
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                              backgroundColor: isSelected
                                ? "oklch(70.5% 0.213 47.604)"
                                : "#F3F4F6",
                            }}
                          >
                            <Icon
                              className="w-6 h-6"
                              style={{ color: isSelected ? "#fff" : "#6B7280" }}
                            />
                          </div>
                          <div className="flex-1">
                            <p
                              className="font-semibold text-base"
                              style={{
                                color: isSelected
                                  ? "oklch(70.5% 0.213 47.604)"
                                  : "hsl(150, 30%, 15%)",
                                fontFamily: "var(--font-serif), serif",
                              }}
                            >
                              {option.title}
                            </p>
                            <p className="text-sm mt-0.5" style={{ color: "hsl(150, 10%, 50%)" }}>
                              {option.maxWeight} · {option.maxDimensions}
                            </p>
                          </div>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: "oklch(70.5% 0.213 47.604)" }}
                            >
                              <Check className="w-3.5 h-3.5 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  <motion.div
                    whileHover={{ scale: selectedSize ? 1.02 : 1 }}
                    whileTap={{ scale: selectedSize ? 0.98 : 1 }}
                  >
                    <Button
                      variant="hero-primary"
                      onClick={handleNext}
                      disabled={!selectedSize}
                      className="w-full py-4 text-base rounded-2xl"
                    >
                      Fortsett
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </motion.div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div>
                  <h1
                    className="text-3xl font-normal mb-2 text-center"
                    style={{ fontFamily: "var(--font-serif), serif", color: "hsl(150, 30%, 15%)" }}
                  >
                    Henting og levering
                  </h1>
                  <p className="text-center text-sm mb-8" style={{ color: "hsl(150, 10%, 50%)" }}>
                    Fyll inn adressene – så tar vi oss av resten
                  </p>

                  <div className="flex flex-col gap-6 mb-6">

                    {/* Henting */}
                    <div className="bg-gray-50 rounded-2xl p-5 flex flex-col gap-4">
                      <p className="font-semibold text-sm uppercase tracking-wide" style={{ color: "hsl(150, 10%, 50%)" }}>
                        📍 Henter fra
                      </p>
                      {isKlikkHent ? (
                        <>
                          <Field>
                            <input
                              type="text"
                              name="pickupBusinessName"
                              placeholder="Navn på butikk (f.eks. Power, Elkjøp)"
                              value={formData.pickupBusinessName}
                              onChange={handleInputChange}
                              className={inputClass}
                            />
                          </Field>
                          <Field label="Hentekode (valgfritt)">
                            <input
                              type="text"
                              name="pickupPickupCode"
                              placeholder="Hentekode"
                              value={formData.pickupPickupCode}
                              onChange={handleInputChange}
                              className={inputClass}
                            />
                          </Field>
                        </>
                      ) : (
                        <>
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              name="pickupFirstName"
                              placeholder="Fornavn"
                              value={formData.pickupFirstName}
                              onChange={handleInputChange}
                              className={inputClass}
                            />
                            <input
                              type="text"
                              name="pickupLastName"
                              placeholder="Etternavn"
                              value={formData.pickupLastName}
                              onChange={handleInputChange}
                              className={inputClass}
                            />
                          </div>
                          <Field label="Telefon">
                            <input
                              type="tel"
                              name="pickupPhone"
                              placeholder="Telefonnummer"
                              value={formData.pickupPhone}
                              onChange={handleInputChange}
                              maxLength={9}
                              className={inputClass}
                            />
                          </Field>
                        </>
                      )}
                      <Field label="Adresse">
                        <input
                          type="text"
                          name="pickupStreet"
                          placeholder="Gateadresse"
                          value={formData.pickupStreet}
                          onChange={handleInputChange}
                          className={inputClass}
                        />
                        <div className="grid grid-cols-2 gap-3 mt-2">
                          <input
                            type="text"
                            name="pickupPostalCode"
                            placeholder="Postnummer"
                            value={formData.pickupPostalCode}
                            onChange={handleInputChange}
                            maxLength={4}
                            className={inputClass}
                          />
                          <input
                            type="text"
                            name="pickupCity"
                            placeholder="By"
                            value={formData.pickupCity}
                            onChange={handleInputChange}
                            className={inputClass}
                          />
                        </div>
                      </Field>
                    </div>

                    {/* Levering */}
                    <div className="bg-gray-50 rounded-2xl p-5 flex flex-col gap-4">
                      <p className="font-semibold text-sm uppercase tracking-wide" style={{ color: "hsl(150, 10%, 50%)" }}>
                        🏠 Leverer til
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="deliveryFirstName"
                          placeholder="Fornavn"
                          value={formData.deliveryFirstName}
                          onChange={handleInputChange}
                          className={inputClass}
                        />
                        <input
                          type="text"
                          name="deliveryLastName"
                          placeholder="Etternavn"
                          value={formData.deliveryLastName}
                          onChange={handleInputChange}
                          className={inputClass}
                        />
                      </div>
                      <Field label="Telefon">
                        <input
                          type="tel"
                          name="deliveryPhone"
                          placeholder="Telefonnummer"
                          value={formData.deliveryPhone}
                          onChange={handleInputChange}
                          maxLength={9}
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Adresse">
                        <input
                          type="text"
                          name="deliveryStreet"
                          placeholder="Gateadresse"
                          value={formData.deliveryStreet}
                          onChange={handleInputChange}
                          className={inputClass}
                        />
                        <div className="grid grid-cols-2 gap-3 mt-2">
                          <input
                            type="text"
                            name="deliveryPostalCode"
                            placeholder="Postnummer"
                            value={formData.deliveryPostalCode}
                            onChange={handleInputChange}
                            maxLength={4}
                            className={inputClass}
                          />
                          <input
                            type="text"
                            name="deliveryCity"
                            placeholder="By"
                            value={formData.deliveryCity}
                            onChange={handleInputChange}
                            className={inputClass}
                          />
                        </div>
                      </Field>
                    </div>

                    {/* Kommentar */}
                    <Field label="Beskjed til budet (valgfritt)">
                      <textarea
                        name="comment"
                        value={formData.comment}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Etasje, portkode, ringeklokke..."
                        className={inputClass + " resize-none"}
                      />
                    </Field>
                  </div>

                  <AnimatePresence>
                    {validationError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl"
                      >
                        <p className="text-red-600 text-sm">{validationError}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex gap-3">
                    <Button
                      variant="hero-secondary"
                      onClick={handleBack}
                      className="px-6 py-4 rounded-2xl"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="hero-primary"
                      onClick={handleNext}
                      className="flex-1 py-4 text-base rounded-2xl"
                    >
                      Se oppsummering
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div>
                  <h1
                    className="text-3xl font-normal mb-2 text-center"
                    style={{ fontFamily: "var(--font-serif), serif", color: "hsl(150, 30%, 15%)" }}
                  >
                    Se over bestillingen
                  </h1>
                  <p className="text-center text-sm mb-8" style={{ color: "hsl(150, 10%, 50%)" }}>
                    Ser alt riktig ut? Trykk Bestill for å fortsette.
                  </p>

                  <div className="flex flex-col gap-3 mb-8">

                    {/* Pakkestørrelse */}
                    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "oklch(70.5% 0.213 47.604)" }}
                      >
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "hsl(150, 10%, 55%)" }}>Pakkestørrelse</p>
                        <p className="font-semibold text-sm" style={{ color: "hsl(150, 30%, 15%)" }}>
                          {packageOptions.find((p) => p.id === selectedSize)?.title} · {packageOptions.find((p) => p.id === selectedSize)?.maxWeight}
                        </p>
                      </div>
                    </div>

                    {/* Henting */}
                    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: "hsl(150, 10%, 55%)" }}>📍 Henter fra</p>
                      <div className="text-sm flex flex-col gap-1" style={{ color: "hsl(150, 30%, 15%)" }}>
                        {isKlikkHent ? (
                          <>
                            <span className="font-semibold">{formData.pickupBusinessName}</span>
                            {formData.pickupPickupCode && <span>Hentekode: {formData.pickupPickupCode}</span>}
                          </>
                        ) : (
                          <>
                            <span className="font-semibold">{formData.pickupFirstName} {formData.pickupLastName}</span>
                            <span style={{ color: "hsl(150, 10%, 50%)" }}>{formData.pickupPhone}</span>
                          </>
                        )}
                        <span style={{ color: "hsl(150, 10%, 50%)" }}>
                          {formData.pickupStreet}, {formData.pickupPostalCode} {formData.pickupCity}
                        </span>
                      </div>
                    </div>

                    {/* Levering */}
                    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: "hsl(150, 10%, 55%)" }}>🏠 Leverer til</p>
                      <div className="text-sm flex flex-col gap-1" style={{ color: "hsl(150, 30%, 15%)" }}>
                        <span className="font-semibold">{formData.deliveryFirstName} {formData.deliveryLastName}</span>
                        <span style={{ color: "hsl(150, 10%, 50%)" }}>{formData.deliveryPhone}</span>
                        <span style={{ color: "hsl(150, 10%, 50%)" }}>
                          {formData.deliveryStreet}, {formData.deliveryPostalCode} {formData.deliveryCity}
                        </span>
                      </div>
                    </div>

                    {/* Pris */}
                    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-wide mb-3" style={{ color: "hsl(150, 10%, 55%)" }}>Pris</p>
                      <div className="flex flex-col gap-2 text-sm" style={{ color: "hsl(150, 30%, 15%)" }}>
                        <div className="flex justify-between">
                          <span>0–3 km</span>
                          <span className="font-semibold">119 kr</span>
                        </div>
                        <div className="flex justify-between">
                          <span>3–6 km</span>
                          <span className="font-semibold">169 kr</span>
                        </div>
                        <div className="flex justify-between">
                          <span>6–20 km</span>
                          <span className="font-semibold">219 kr</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 p-4 rounded-2xl border border-orange-100 bg-orange-50/50 text-sm text-center"
                    style={{ color: "hsl(150, 30%, 15%)" }}>
                    Online bestilling åpner snart. Du kommer til en side der du kan melde interesse.
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="hero-secondary"
                      onClick={handleBack}
                      className="px-6 py-4 rounded-2xl"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Button>

                    <motion.div
                      className="flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="hero-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          handleBestill();
                        }}
                        className="w-full py-4 text-base rounded-2xl"
                      >
                        Bestill
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default function Bestill() {
  return (
    <Suspense fallback={<div>Laster...</div>}>
      <BestillContent />
    </Suspense>
  );
}
