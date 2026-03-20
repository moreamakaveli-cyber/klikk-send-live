"use client";

import { FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

type FormData = {
  fornavn: string;
  etternavn: string;
  epost: string;
  telefon: string;
  over18: boolean;
  transport: string;
  tilgjengelighet: string[];
  frekvens: string;
  personvernGodkjent: boolean;
};

const inputBaseClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm md:text-base outline-none transition-all hover:border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100";

const labelClass = "mb-2 block text-sm md:text-base font-medium text-slate-800";

export default function SokJobbPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fornavn: "",
    etternavn: "",
    epost: "",
    telefon: "",
    over18: false,
    transport: "",
    tilgjengelighet: [],
    frekvens: "",
    personvernGodkjent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!formData.fornavn.trim()) nextErrors.fornavn = "Fornavn er påkrevd.";
    if (!formData.etternavn.trim()) nextErrors.etternavn = "Etternavn er påkrevd.";
    if (!formData.epost.trim()) {
      nextErrors.epost = "E-post er påkrevd.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.epost)) {
      nextErrors.epost = "Skriv en gyldig e-postadresse.";
    }
    if (!formData.telefon.trim()) nextErrors.telefon = "Telefon er påkrevd.";
    if (!formData.over18) nextErrors.over18 = "Du må bekrefte at du er over 18 år.";
    if (!formData.personvernGodkjent) nextErrors.personvernGodkjent = "Du må godkjenne personvernserklæringen.";
    return nextErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSending(true);
    setSubmitError("");

    try {
      const templateParams = {
        name: `${formData.fornavn} ${formData.etternavn}`,
        phone: formData.telefon,
        package: "Jobbsoknad",
        pickup: "Soknad sendt fra skjema: Jobb i Hently",
        delivery: `Transport: ${formData.transport || "Ikke oppgitt"} | Tilgjengelighet: ${
          formData.tilgjengelighet.length > 0 ? formData.tilgjengelighet.join(", ") : "Ikke oppgitt"
        } | Frekvens: ${formData.frekvens || "Ikke oppgitt"}`,
        isKlikkHent: `Over 18: ${formData.over18 ? "Ja" : "Nei"}`,
        pickupCode: "",
        deliveryName: `${formData.fornavn} ${formData.etternavn}`,
        deliveryPhone: formData.telefon,
        email: formData.epost,
      };

      await emailjs.send(
        "service_476sm2p",
        "template_xmmnr9c",
        templateParams,
        "HLFNfJ-HvjqeXLMXL"
      );

      router.push("/takk");
    } catch (error) {
      console.error("Kunne ikke sende soknad pa e-post:", error);
      setSubmitError("Noe gikk galt ved sending. Prov igjen.");
    } finally {
      setIsSending(false);
    }
  };

  const toggleTilgjengelighet = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      tilgjengelighet: prev.tilgjengelighet.includes(value)
        ? prev.tilgjengelighet.filter((item) => item !== value)
        : [...prev.tilgjengelighet, value],
    }));
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Navbar />
      <section className="pt-6 pb-12 md:pt-8 md:pb-16 px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl rounded-3xl bg-[#F7F7F7] p-6 md:p-8">
            <h1
              className="text-3xl md:text-4xl font-normal mb-6 md:mb-8"
              style={{ fontFamily: "var(--font-serif), serif", color: "hsl(150, 30%, 15%)" }}
            >
              Bli budpartner i Hently
            </h1>

            <form className="space-y-8 md:space-y-10" onSubmit={handleSubmit} noValidate>
              <div className="space-y-4 md:space-y-5">
                <h2
                  className="text-xl md:text-2xl font-normal"
                  style={{ fontFamily: "var(--font-serif), serif", color: "oklch(70.5% 0.213 47.604)" }}
                >
                  Grunnleggende informasjon
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} htmlFor="fornavn">Fornavn</label>
                    <input
                      id="fornavn"
                      type="text"
                      className={inputBaseClass}
                      value={formData.fornavn}
                      onChange={(e) => setFormData({ ...formData, fornavn: e.target.value })}
                    />
                    {errors.fornavn && <p className="mt-1 text-sm text-red-600">{errors.fornavn}</p>}
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="etternavn">Etternavn</label>
                    <input
                      id="etternavn"
                      type="text"
                      className={inputBaseClass}
                      value={formData.etternavn}
                      onChange={(e) => setFormData({ ...formData, etternavn: e.target.value })}
                    />
                    {errors.etternavn && <p className="mt-1 text-sm text-red-600">{errors.etternavn}</p>}
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="epost">E-post</label>
                  <input
                    id="epost"
                    type="email"
                    className={inputBaseClass}
                    value={formData.epost}
                    onChange={(e) => setFormData({ ...formData, epost: e.target.value })}
                  />
                  {errors.epost && <p className="mt-1 text-sm text-red-600">{errors.epost}</p>}
                </div>

                <div>
                  <label className={labelClass} htmlFor="telefon">Telefon</label>
                  <input
                    id="telefon"
                    type="tel"
                    className={inputBaseClass}
                    value={formData.telefon}
                    onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                  />
                  {errors.telefon && <p className="mt-1 text-sm text-red-600">{errors.telefon}</p>}
                </div>

                <div>
                  <p className={labelClass}>Alder</p>
                  <div className="flex items-center gap-6">
                    <label className="inline-flex items-center gap-2 text-sm md:text-base text-slate-700">
                      <input
                        type="checkbox"
                        checked={formData.over18}
                        onChange={(e) => setFormData({ ...formData, over18: e.target.checked })}
                        className="accent-orange-500"
                      />
                      Jeg er over 18 år
                    </label>
                  </div>
                  {errors.over18 && <p className="mt-1 text-sm text-red-600">{errors.over18}</p>}
                </div>

                <div>
                  <label className={labelClass} htmlFor="transport">Hvilket transportmiddel vil du bruke?</label>
                  <select
                    id="transport"
                    className={inputBaseClass}
                    value={formData.transport}
                    onChange={(e) => setFormData({ ...formData, transport: e.target.value })}
                  >
                    <option value="">Velg transportmiddel</option>
                    <option>Bil</option>
                    <option>Sykkel</option>
                    <option>Moped</option>
                    <option>Elektrisk sparkesykkel</option>
                    <option>Kollektivtransport</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 md:space-y-5">
                <h2
                  className="text-xl md:text-2xl font-normal"
                  style={{ fontFamily: "var(--font-serif), serif", color: "oklch(70.5% 0.213 47.604)" }}
                >
                  Tilgjengelighet
                </h2>

                <div>
                  <p className={labelClass}>Når ønsker du å jobbe?</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Dagtid", "Kvelder", "Helger", "Fleksibelt"].map((item) => (
                      <label key={item} className="inline-flex items-center gap-2 text-sm md:text-base text-slate-700">
                        <input
                          type="checkbox"
                          checked={formData.tilgjengelighet.includes(item)}
                          onChange={() => toggleTilgjengelighet(item)}
                          className="accent-orange-500"
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="frekvens">Hvor ofte ønsker du å jobbe?</label>
                  <select
                    id="frekvens"
                    className={inputBaseClass}
                    value={formData.frekvens}
                    onChange={(e) => setFormData({ ...formData, frekvens: e.target.value })}
                  >
                    <option value="">Velg alternativ</option>
                    <option>Av og til</option>
                    <option>1-2 ganger i uken</option>
                    <option>Flere ganger i uken</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="inline-flex items-start gap-2 text-sm md:text-base text-slate-700 mb-4">
                  <input
                    type="checkbox"
                    checked={formData.personvernGodkjent}
                    onChange={(e) =>
                      setFormData({ ...formData, personvernGodkjent: e.target.checked })
                    }
                    className="accent-orange-500 mt-1"
                  />
                  <span>
                    Jeg har lest og forstått
                    <br />
                    <Link
                      href="/jobb-i-hently/personvern"
                      className="underline hover:opacity-80 transition-opacity"
                      style={{ color: "oklch(70.5% 0.213 47.604)" }}
                    >
                      Personvernserklæringen for bud.
                    </Link>
                  </span>
                </label>
                {errors.personvernGodkjent && (
                  <p className="mb-3 -mt-1 text-sm text-red-600">{errors.personvernGodkjent}</p>
                )}
                <br />
                <button
                  type="submit"
                  disabled={isSending}
                  className="rounded-full px-6 py-3 text-white font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "oklch(70.5% 0.213 47.604)" }}
                >
                  {isSending ? "Sender..." : "Send søknad"}
                </button>
                {submitError && <p className="mt-3 text-sm md:text-base text-red-600">{submitError}</p>}
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
