"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AddressSuggestion } from "@/app/api/address-suggest/route";
import { formatNorwegianPhoneDisplay, normalizeNorwegianPhone } from "@/lib/norwegian-phone";
import { validatePartnerOrderPayload } from "@/lib/partner-order-validate";
import { getMarketingHomeHref } from "@/lib/site-url";
import "./kvaernerbyen.css";

const MARKETING_HOME_HREF = getMarketingHomeHref();

const stepVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 28 : -28,
  }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -28 : 28,
  }),
};

const expandSheet = {
  hidden: { opacity: 0, height: 0 },
  show: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
};

const DELIVERY_FEE = 119;
const ASAP_ETA_LABEL = "Innen 45min – 2timer";

function parseAmountInput(value: string): number {
  const digits = value.replace(/\s/g, "").replace(/[^\d]/g, "");
  if (!digits) return 0;
  const n = parseInt(digits, 10);
  return Number.isFinite(n) ? n : 0;
}

function formatKr(amount: number): string {
  return amount.toLocaleString("nb-NO", { maximumFractionDigits: 0 });
}

type OrderOverviewProps = {
  cleaningAmount: number;
  itemCount: number;
  compact?: boolean;
};

function OrderOverview({ cleaningAmount, itemCount, compact }: OrderOverviewProps) {
  const total = cleaningAmount + DELIVERY_FEE;
  const serviceLabel =
    itemCount > 1 ? `Rens & skorep · ${itemCount} varer` : "Rens & skorep";

  return (
    <motion.div
      layout
      className={`kb-order-review ${compact ? "kb-order-review--compact" : ""}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="kb-order-review__head">
        <span>Ordreoversikt</span>
        <i className="ti ti-receipt" aria-hidden="true" />
      </div>
      <div className="kb-order-review__lines">
        <div className="kb-order-line">
          <span className="kb-order-line__label">{serviceLabel}</span>
          <span className="kb-order-line__dots" aria-hidden="true" />
          <span className="kb-order-line__amount">
            {cleaningAmount > 0 ? `${formatKr(cleaningAmount)} kr` : "–"}
          </span>
        </div>
        <div className="kb-order-line">
          <span className="kb-order-line__label">Levering via Hently</span>
          <span className="kb-order-line__dots" aria-hidden="true" />
          <span className="kb-order-line__amount">{formatKr(DELIVERY_FEE)} kr</span>
        </div>
      </div>
      <div className="kb-order-review__total">
        <span>Totalt</span>
        <motion.span
          key={total}
          initial={{ opacity: 0.6, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {cleaningAmount > 0 ? `${formatKr(total)} kr` : "–"}
        </motion.span>
      </div>
    </motion.div>
  );
}

const DAY_LABELS = ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"];

/** Leveringsvinduer (man–fre vs lør) */
const WEEKDAY_TIME_SLOTS = ["09–12", "12–14", "14–16", "16–19"];
const SATURDAY_TIME_SLOTS = ["10–12", "12–14", "14–17"];

type DelivMode = "asap" | "pick";

type DateChip = { key: string; day: string; num: string; date: Date };

function dateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isWeekday(date: Date): boolean {
  const d = date.getDay();
  return d >= 1 && d <= 5;
}

function isSaturday(date: Date): boolean {
  return date.getDay() === 6;
}

function parseSlotEndHour(label: string): number {
  return parseInt(label.split("–")[1] ?? "0", 10);
}

function getSlotsForDate(date: Date, now = new Date()): string[] {
  if (date.getDay() === 0) return [];

  let slots: string[];
  if (isSaturday(date)) {
    slots = [...SATURDAY_TIME_SLOTS];
  } else if (isWeekday(date)) {
    slots = [...WEEKDAY_TIME_SLOTS];
  } else {
    return [];
  }

  if (dateKey(date) === dateKey(now)) {
    const currentHour = now.getHours() + now.getMinutes() / 60;
    slots = slots.filter((label) => parseSlotEndHour(label) > currentHour);
  }

  return slots;
}

function isSelectableDate(date: Date, now = new Date()): boolean {
  if (date.getDay() === 0) return false;
  return getSlotsForDate(date, now).length > 0;
}

function buildDateChips(now = new Date()): DateChip[] {
  const chips: DateChip[] = [];
  const cursor = new Date(now);
  cursor.setHours(12, 0, 0, 0);

  let guard = 0;
  while (chips.length < 10 && guard < 28) {
    if (isSelectableDate(cursor, now)) {
      chips.push({
        key: dateKey(cursor),
        day: DAY_LABELS[cursor.getDay()]!,
        num: String(cursor.getDate()),
        date: new Date(cursor),
      });
    }
    cursor.setDate(cursor.getDate() + 1);
    guard++;
  }
  return chips;
}

function parseSlotStartHour(label: string): number {
  return parseInt(label.split("–")[0] ?? "9", 10);
}

export default function KvaernerbyenPage() {
  const dateChips = useMemo(() => buildDateChips(), []);
  const todayKey = useMemo(() => dateKey(new Date()), []);

  const [step, setStep] = useState(1);
  const [stepDirection, setStepDirection] = useState(1);
  const reduceMotion = useReducedMotion();
  const stepTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.32, ease: [0.4, 0, 0.2, 1] as const };
  const softTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.26, ease: [0.4, 0, 0.2, 1] as const };
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [postnr, setPostnr] = useState("");
  const [city, setCity] = useState("");
  const [doorcode, setDoorcode] = useState("");
  const [deliveryItems, setDeliveryItems] = useState("");
  const [shopAmount, setShopAmount] = useState("");
  const [itemCount, setItemCount] = useState(1);
  const [notes, setNotes] = useState("");

  const [profileHint, setProfileHint] = useState<string | null>(null);
  const [customerLookupLoading, setCustomerLookupLoading] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
  const [addressSuggestOpen, setAddressSuggestOpen] = useState(false);
  const lastLookupPhone = useRef<string | null>(null);
  const addressPickRef = useRef(false);

  const cleaningAmount = useMemo(() => parseAmountInput(shopAmount), [shopAmount]);
  const orderTotal = cleaningAmount + DELIVERY_FEE;

  const [delivMode, setDelivMode] = useState<DelivMode>("asap");
  const [selectedDateKey, setSelectedDateKey] = useState(dateChips[0]?.key ?? "");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const selectedDate = dateChips.find((d) => d.key === selectedDateKey);
  const availableSlots = useMemo(() => {
    if (!selectedDate) return [];
    return getSlotsForDate(selectedDate.date);
  }, [selectedDate]);

  useEffect(() => {
    if (availableSlots.length === 0) {
      setSelectedTimeSlot("");
      return;
    }
    if (!availableSlots.includes(selectedTimeSlot)) {
      setSelectedTimeSlot(availableSlots[0]!);
    }
  }, [availableSlots, selectedTimeSlot]);

  const applyCustomerProfile = useCallback(
    (customer: {
      name: string;
      street: string;
      postnr: string;
      city: string;
      doorcode: string;
    }) => {
      if (!fullName.trim()) setFullName(customer.name);
      if (!street.trim()) setStreet(customer.street);
      if (!postnr.trim()) setPostnr(customer.postnr);
      if (!city.trim()) setCity(customer.city);
      if (!doorcode.trim()) setDoorcode(customer.doorcode);
      setProfileHint("Vi har fylt inn detaljer fra forrige bestilling");
    },
    [fullName, street, postnr, city, doorcode],
  );

  useEffect(() => {
    const normalized = normalizeNorwegianPhone(phone);
    if (!normalized || normalized.length !== 8) {
      setProfileHint(null);
      return;
    }
    if (lastLookupPhone.current === normalized) return;

    const timer = window.setTimeout(async () => {
      setCustomerLookupLoading(true);
      try {
        const res = await fetch(
          `/api/kvaernerbyen/customer?phone=${encodeURIComponent(normalized)}`,
        );
        const data = await res.json();
        lastLookupPhone.current = normalized;
        if (data.found && data.customer) {
          applyCustomerProfile(data.customer);
        } else {
          setProfileHint(null);
        }
      } catch {
        /* stille feil – bruker fyller inn manuelt */
      } finally {
        setCustomerLookupLoading(false);
      }
    }, 550);

    return () => window.clearTimeout(timer);
  }, [phone, applyCustomerProfile]);

  useEffect(() => {
    if (addressPickRef.current) {
      addressPickRef.current = false;
      return;
    }
    const query = street.trim();
    if (query.length < 3) {
      setAddressSuggestions([]);
      setAddressSuggestOpen(false);
      return;
    }

    const timer = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/address-suggest?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setAddressSuggestions(data.suggestions ?? []);
        setAddressSuggestOpen((data.suggestions?.length ?? 0) > 0);
      } catch {
        setAddressSuggestions([]);
        setAddressSuggestOpen(false);
      }
    }, 320);

    return () => window.clearTimeout(timer);
  }, [street]);

  useEffect(() => {
    if (postnr.length !== 4 || city.trim()) return;

    const timer = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/address-suggest?q=${encodeURIComponent(postnr)}`);
        const data = await res.json();
        const match = (data.suggestions as AddressSuggestion[] | undefined)?.find(
          (s) => s.postnr === postnr,
        );
        if (match?.city) setCity(match.city);
      } catch {
        /* ignorer */
      }
    }, 400);

    return () => window.clearTimeout(timer);
  }, [postnr, city]);

  function selectAddressSuggestion(suggestion: AddressSuggestion) {
    addressPickRef.current = true;
    setStreet(suggestion.street);
    setPostnr(suggestion.postnr);
    setCity(suggestion.city);
    setAddressSuggestions([]);
    setAddressSuggestOpen(false);
  }

  function handlePhoneChange(value: string) {
    setPhone(formatNorwegianPhoneDisplay(value));
    const normalized = normalizeNorwegianPhone(value);
    if (normalized !== lastLookupPhone.current) {
      lastLookupPhone.current = null;
      if (!normalized) setProfileHint(null);
    }
  }

  const [confirmName, setConfirmName] = useState("–");
  const [confirmAddr, setConfirmAddr] = useState("–");
  const [confirmItems, setConfirmItems] = useState("–");
  const [confirmTotal, setConfirmTotal] = useState(DELIVERY_FEE);
  const [etaLabel, setEtaLabel] = useState(ASAP_ETA_LABEL);
  const [checkoutConfirming, setCheckoutConfirming] = useState(false);

  function applyOrderConfirm(data: {
    order_id: string;
    confirm?: {
      name?: string;
      address?: string;
      items?: string;
      total?: number;
      etaLabel?: string;
    };
  }) {
    setOrderId(data.order_id);
    setConfirmName(data.confirm?.name ?? "–");
    setConfirmAddr(data.confirm?.address ?? "–");
    setConfirmItems(data.confirm?.items ?? "–");
    setConfirmTotal(Number(data.confirm?.total ?? DELIVERY_FEE));
    setEtaLabel(data.confirm?.etaLabel ?? ASAP_ETA_LABEL);
  }

  // Etter Stripe Checkout: bekreft via session_id, vis «Takk for bestillingen» (steg 4).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const checkout = params.get("checkout");
    const incomingOrderId = params.get("order_id");
    const sessionId = params.get("session_id");

    if (checkout === "cancel") {
      setError("Betalingen ble avbrutt.");
      window.history.replaceState({}, "", "/kvaernerbyen");
      return;
    }

    if (checkout !== "success" || !incomingOrderId) return;

    setStepDirection(1);
    setStep(4);
    setCheckoutConfirming(true);
    setLoading(true);
    setError("");

    let cancelled = false;

    const finishSuccess = (data: {
      order_id: string;
      confirm?: {
        name?: string;
        address?: string;
        items?: string;
        total?: number;
        etaLabel?: string;
      };
    }) => {
      applyOrderConfirm(data);
      setCheckoutConfirming(false);
      setLoading(false);
      window.history.replaceState({}, "", "/kvaernerbyen");
    };

    const pollPaid = (attempt: number) => {
      if (cancelled) return;
      window.setTimeout(async () => {
        if (cancelled) return;
        try {
          const res = await fetch(
            `/api/kvaernerbyen/order?order_id=${encodeURIComponent(incomingOrderId)}`,
          );
          const data = await res.json();
          if (res.ok && data.payment_status === "paid") {
            finishSuccess(data);
            return;
          }
          if (attempt < 12) pollPaid(attempt + 1);
          else {
            setCheckoutConfirming(false);
            setLoading(false);
            setError(
              "Betalingen er mottatt, men vi venter på bekreftelse. Oppdater siden om et øyeblikk.",
            );
          }
        } catch {
          if (attempt < 12) pollPaid(attempt + 1);
          else {
            setCheckoutConfirming(false);
            setLoading(false);
            setError("Kunne ikke bekrefte betaling. Prøv å oppdatere siden.");
          }
        }
      }, 1000);
    };

    const run = async () => {
      if (sessionId) {
        try {
          const res = await fetch("/api/kvaernerbyen/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              order_id: incomingOrderId,
              session_id: sessionId,
            }),
          });
          const data = await res.json();
          if (res.ok && data.confirm) {
            finishSuccess(data);
            return;
          }
        } catch {
          /* fall through to poll */
        }
      }
      pollPaid(0);
    };

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  function getEtaLabel(): string {
    if (delivMode === "asap") return ASAP_ETA_LABEL;
    const chip = dateChips.find((d) => d.key === selectedDateKey);
    return chip ? `${chip.day} ${chip.num}. · ${selectedTimeSlot}` : selectedTimeSlot;
  }

  const scheduleSummary = selectedDate
    ? `${selectedDate.day} ${selectedDate.num}. · ${selectedTimeSlot}`
    : "Velg dag og tidspunkt";

  function validateStep1(): boolean {
    if (!fullName.trim()) {
      setError("Fyll inn fullt navn");
      return false;
    }
    const phoneNormalized = normalizeNorwegianPhone(phone);
    if (!phoneNormalized || phoneNormalized.length !== 8) {
      setError("Telefonnummer må være 8 siffer");
      return false;
    }
    if (!street.trim()) {
      setError("Fyll inn gateadresse");
      return false;
    }
    if (!postnr.trim()) {
      setError("Fyll inn postnummer");
      return false;
    }
    if (!deliveryItems.trim()) {
      setError("Beskriv hva som skal leveres");
      return false;
    }
    if (cleaningAmount <= 0) {
      setError("Oppgi totalbeløp fra Kværnerbyen Rens & Skorep");
      return false;
    }
    if (itemCount < 1) {
      setError("Velg antall varer");
      return false;
    }
    setError("");
    return true;
  }

  function validateStep2(): boolean {
    if (delivMode === "asap") {
      setError("");
      return true;
    }
    if (!selectedDate || availableSlots.length === 0) {
      setError("Ingen ledige leveringstider denne dagen. Velg en annen dag.");
      return false;
    }
    if (!selectedTimeSlot) {
      setError("Velg et tidspunkt");
      return false;
    }
    setError("");
    return true;
  }

  function selectDate(chip: DateChip) {
    setSelectedDateKey(chip.key);
    const slots = getSlotsForDate(chip.date);
    setSelectedTimeSlot(slots[0] ?? "");
  }

  function goStep(n: number) {
    if (n === 2 && !validateStep1()) return;
    if (n === 3 && !validateStep2()) return;
    if (n === 3) setEtaLabel(getEtaLabel());
    if (n === 4) return;
    setError("");
    setStepDirection(n > step ? 1 : -1);
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function buildAddress(): string {
    const parts = [street.trim()];
    if (doorcode.trim()) parts[0] += `, ${doorcode.trim()}`;
    const place = [postnr.trim(), city.trim()].filter(Boolean).join(" ");
    if (place) parts.push(place);
    if (notes.trim()) parts.push(`Instruks: ${notes.trim()}`);
    return parts.join(", ");
  }

  function buildDeliveryTimeAt(): string | null {
    if (delivMode === "asap") return null;
    const chip = dateChips.find((d) => d.key === selectedDateKey);
    if (!chip) return null;
    const d = new Date(chip.date);
    const startHour = parseSlotStartHour(selectedTimeSlot);
    d.setHours(startHour, 0, 0, 0);
    return d.toISOString();
  }

  async function handlePay() {
    if (!validateStep1() || !validateStep2()) return;

    const delivery_time_option =
      delivMode === "pick" ? ("scheduled" as const) : ("asap" as const);
    const delivery_time_at =
      delivery_time_option === "scheduled" ? buildDeliveryTimeAt() : null;

    const orderPayload = {
      customer_name: fullName.trim(),
      phone: normalizeNorwegianPhone(phone) ?? "",
      address: buildAddress(),
      postal_code: postnr.trim(),
      shop_order_number: deliveryItems.trim().slice(0, 240),
      garment_count: itemCount,
      cleaning_amount: cleaningAmount,
      delivery_time_option,
      delivery_time_at,
    };

    const validation = validatePartnerOrderPayload(orderPayload);
    if (!validation.ok) {
      setError(validation.error);
      return;
    }

    setLoading(true);
    setError("");
    const eta = getEtaLabel();
    setEtaLabel(eta);

    try {
      const res = await fetch("/api/kvaernerbyen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      const data = await res.json();
      if (!res.ok) {
        const fieldHint =
          typeof data.field === "string" ? ` (${data.field})` : "";
        setError((data.error || "Kunne ikke opprette ordre") + fieldHint);
        return;
      }

      setOrderId(data.order_id);

      const checkoutRes = await fetch("/api/kvaernerbyen/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: data.order_id,
          origin: window.location.origin,
        }),
      });

      const checkoutData = await checkoutRes.json();
      if (!checkoutRes.ok) {
        setError(checkoutData.error || "Kunne ikke starte betaling");
        return;
      }

      const url: string | undefined = checkoutData?.url;
      if (!url) {
        setError("Manglende Stripe checkout-URL");
        return;
      }

      // Vi redirect'er til Stripe. Bekreftelse skjer via webhook + oppslag når kunden kommer tilbake.
      window.location.href = url;
    } catch {
      setError("Nettverksfeil — prøv igjen");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="kb-page">
      <div className="kb-wrap">
        <div className="kb-topbar">
          <a
            href={MARKETING_HOME_HREF}
            className="kb-logo"
            aria-label="Hently forsiden"
          >
            <Image src="/logo.png" alt="Hently" width={280} height={93} priority />
          </a>
          <div className="kb-partner-tag">Kværnerbyen Rens &amp; Skorep</div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              className="kb-error"
              role="alert"
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={softTransition}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="kb-steps-host">
        <AnimatePresence mode="wait" custom={stepDirection}>
          <motion.div
            key={step}
            custom={stepDirection}
            className="kb-step"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={stepTransition}
          >
        {step === 1 && (
          <>
          <div className="kb-hero">
            <h1>
              Din ordre er klar
              <br />
              <em>for levering</em>
            </h1>
            <p>
              Hently henter fra Kværnerbyen Rens &amp; Skorep og leverer direkte hjem til deg.
            </p>
          </div>

          <div className="kb-card">
            <div className="kb-card-title">Kontaktinformasjon</div>
            <div className="kb-field">
              <input
                type="text"
                placeholder="Fullt navn"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="kb-field">
              <div className="kb-phone-wrap">
                <span className="kb-phone-prefix">🇳🇴 +47</span>
                <input
                  type="tel"
                  placeholder="Telefonnummer"
                  autoComplete="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                />
              </div>
              {customerLookupLoading && (
                <p className="kb-field-hint kb-field-hint--loading">Søker etter deg …</p>
              )}
              {profileHint && !customerLookupLoading && (
                <p className="kb-field-hint kb-field-hint--success">{profileHint}</p>
              )}
            </div>
          </div>

          <div className="kb-card">
            <div className="kb-card-title">Leveringsadresse</div>
            <div className="kb-field kb-field--autocomplete">
              <input
                type="text"
                placeholder="Søk gateadresse …"
                autoComplete="off"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                onFocus={() => {
                  if (addressSuggestions.length > 0) setAddressSuggestOpen(true);
                }}
                onBlur={() => {
                  window.setTimeout(() => setAddressSuggestOpen(false), 180);
                }}
                aria-autocomplete="list"
                aria-expanded={addressSuggestOpen}
                aria-controls="kb-address-suggest-list"
              />
              {addressSuggestOpen && addressSuggestions.length > 0 && (
                <ul
                  id="kb-address-suggest-list"
                  className="kb-address-suggest"
                  role="listbox"
                >
                  {addressSuggestions.map((s) => (
                    <li key={s.id} role="option">
                      <button
                        type="button"
                        className="kb-address-suggest__btn"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => selectAddressSuggestion(s)}
                      >
                        <span className="kb-address-suggest__street">{s.label}</span>
                        <span className="kb-address-suggest__place">
                          {s.postnr} {s.city}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="kb-field-row">
              <div className="kb-field">
                <input
                  type="text"
                  placeholder="Postnr."
                  maxLength={4}
                  inputMode="numeric"
                  autoComplete="postal-code"
                  value={postnr}
                  onChange={(e) => setPostnr(e.target.value.replace(/\D/g, "").slice(0, 4))}
                />
              </div>
              <div className="kb-field">
                <input
                  type="text"
                  placeholder="Sted"
                  autoComplete="address-level2"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <div className="kb-field">
              <input
                type="text"
                placeholder="Etasje / dørklokke (valgfritt)"
                value={doorcode}
                onChange={(e) => setDoorcode(e.target.value)}
              />
            </div>
          </div>

          <div className="kb-card">
            <div className="kb-card-title">Din leveranse</div>
            <div className="kb-field kb-field--labeled">
              <label className="kb-field-label" htmlFor="kb-delivery-items">
                Hva skal leveres?
              </label>
              <input
                id="kb-delivery-items"
                type="text"
                placeholder="f.eks. dress, sko, kjole eller reparasjon"
                value={deliveryItems}
                onChange={(e) => setDeliveryItems(e.target.value)}
              />
            </div>
            <div className="kb-field kb-field--labeled">
              <label className="kb-field-label" htmlFor="kb-shop-amount">
                Totalbeløp fra Kværnerbyen Rens &amp; Skorep
              </label>
              <div className="kb-amount-wrap">
                <input
                  id="kb-shop-amount"
                  type="text"
                  inputMode="numeric"
                  placeholder="f.eks. 390"
                  value={shopAmount}
                  onChange={(e) => setShopAmount(e.target.value)}
                />
                <span className="kb-amount-suffix">kr</span>
              </div>
            </div>
            <div className="kb-field kb-field--labeled kb-field--qty">
              <span className="kb-field-label" id="kb-item-count-label">
                Antall varer
              </span>
              <div
                className="kb-qty"
                role="group"
                aria-labelledby="kb-item-count-label"
                aria-live="polite"
              >
                <button
                  type="button"
                  className="kb-qty__btn"
                  aria-label="Fjern en vare"
                  disabled={itemCount <= 1}
                  onClick={() => setItemCount((n) => Math.max(1, n - 1))}
                >
                  <i className="ti ti-minus" aria-hidden="true" />
                </button>
                <span className="kb-qty__value" aria-atomic="true">
                  {itemCount}
                </span>
                <button
                  type="button"
                  className="kb-qty__btn"
                  aria-label="Legg til en vare"
                  disabled={itemCount >= 99}
                  onClick={() => setItemCount((n) => Math.min(99, n + 1))}
                >
                  <i className="ti ti-plus" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <OrderOverview cleaningAmount={cleaningAmount} itemCount={itemCount} />

          <motion.button
            type="button"
            className="kb-btn-primary"
            whileTap={{ scale: 0.98 }}
            transition={softTransition}
            onClick={() => goStep(2)}
          >
            Velg leveringstidspunkt <i className="ti ti-arrow-right" aria-hidden="true" />
          </motion.button>
          <div className="kb-trust-row">
            <div className="kb-trust-item">
              <i className="ti ti-shield-check" aria-hidden="true" /> Sikker betaling
            </div>
            <div className="kb-trust-item">
              <i className="ti ti-lock" aria-hidden="true" /> Kryptert
            </div>
            <div className="kb-trust-item">
              <i className="ti ti-star" aria-hidden="true" /> 5,0 av 5
            </div>
          </div>
          </>
        )}

        {step === 2 && (
          <>
          <button type="button" className="kb-btn-back" onClick={() => goStep(1)}>
            <i className="ti ti-arrow-left" aria-hidden="true" /> Tilbake
          </button>
          <section className="kb-delivery" aria-label="Leveringstidspunkt">
            <h2 className="kb-delivery-heading">Når vil du ha levering?</h2>

            <button
              type="button"
              className={`kb-delivery-mode ${delivMode === "asap" ? "kb-delivery-mode--on" : ""}`}
              onClick={() => setDelivMode("asap")}
            >
              <span className="kb-delivery-mode__radio" aria-hidden />
              <span className="kb-delivery-mode__body">
                <span className="kb-delivery-mode__title">Så snart som mulig</span>
                <AnimatePresence>
                  {delivMode === "asap" && (
                    <motion.span
                      className="kb-delivery-mode__meta kb-delivery-mode__meta--asap"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={softTransition}
                    >
                      {ASAP_ETA_LABEL}
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </button>

            <button
              type="button"
              className={`kb-delivery-mode ${delivMode === "pick" ? "kb-delivery-mode--on kb-delivery-mode--open" : ""}`}
              onClick={() => setDelivMode("pick")}
            >
              <span className="kb-delivery-mode__radio" aria-hidden />
              <span className="kb-delivery-mode__body">
                <span className="kb-delivery-mode__title">Velg tidspunkt</span>
                <span className="kb-delivery-mode__meta">
                  {delivMode === "pick" ? scheduleSummary : "Planlegg dag og vindu"}
                </span>
              </span>
            </button>

            <AnimatePresence>
            {delivMode === "pick" && (
              <motion.div
                className="kb-delivery-sheet"
                variants={expandSheet}
                initial="hidden"
                animate="show"
                exit="exit"
                transition={softTransition}
              >
                {dateChips.length === 0 ? (
                  <p className="kb-delivery-hours-hint">
                    Ingen ledige dager akkurat nå. Prøv igjen i morgen eller velg «Så snart
                    som mulig».
                  </p>
                ) : (
                  <>
                    <p className="kb-delivery-sheet-label">Dag (man–lør)</p>
                    <div className="kb-date-scroll" role="listbox" aria-label="Velg dag">
                      {dateChips.map((chip) => (
                        <button
                          key={chip.key}
                          type="button"
                          role="option"
                          aria-selected={selectedDateKey === chip.key}
                          className={`kb-date-pill ${selectedDateKey === chip.key ? "kb-date-pill--on" : ""}`}
                          onClick={() => selectDate(chip)}
                        >
                          <span className="kb-date-pill__day">
                            {chip.key === todayKey ? "I dag" : chip.day}
                          </span>
                          <span className="kb-date-pill__num">{chip.num}</span>
                        </button>
                      ))}
                    </div>

                    <div className="kb-time-field">
                      <label htmlFor="kb-time-select" className="kb-delivery-sheet-label">
                        Tid
                      </label>
                      <select
                        id="kb-time-select"
                        className="kb-time-select"
                        value={selectedTimeSlot}
                        onChange={(e) => setSelectedTimeSlot(e.target.value)}
                        disabled={availableSlots.length === 0}
                      >
                        {availableSlots.length === 0 ? (
                          <option value="">Ingen tider</option>
                        ) : (
                          availableSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))
                        )}
                      </select>
                    </div>
                  </>
                )}
              </motion.div>
            )}
            </AnimatePresence>
          </section>

          <div className="kb-card kb-card--soft">
            <div className="kb-card-title">Leveringsinstrukser</div>
            <div className="kb-field">
              <input
                type="text"
                placeholder="Ring på, legg ved døren... (valgfritt)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <motion.button
            type="button"
            className="kb-btn-primary"
            whileTap={{ scale: 0.98 }}
            transition={softTransition}
            onClick={() => goStep(3)}
          >
            Gå til betaling <i className="ti ti-arrow-right" aria-hidden="true" />
          </motion.button>
          </>
        )}

        {step === 3 && (
          <>
          <button type="button" className="kb-btn-back" onClick={() => goStep(2)}>
            <i className="ti ti-arrow-left" aria-hidden="true" /> Tilbake
          </button>

          <div className="kb-card">
            <div className="kb-card-title">Betalingsmetode</div>
            <div className="kb-pay-methods">
              <div className="kb-pay-method kb-selected">
                <i className="ti ti-credit-card" aria-hidden="true" />
                Kort
              </div>
              <div className="kb-pay-method">
                <i className="ti ti-brand-apple" aria-hidden="true" />
                Apple Pay
              </div>
              <div className="kb-pay-method">
                <i className="ti ti-device-mobile" aria-hidden="true" />
                Vipps
              </div>
            </div>
            <p className="kb-pay-note">
              <i
                className="ti ti-lock"
                style={{ fontSize: 11, verticalAlign: -1 }}
                aria-hidden="true"
              />{" "}
              Betal sikkert med kort via Stripe Checkout.
            </p>
          </div>

          <OrderOverview
            cleaningAmount={cleaningAmount}
            itemCount={itemCount}
            compact
          />

          <div className="kb-card kb-card--soft kb-card--eta">
            <div className="kb-confirm-row kb-confirm-row--flat">
              <span>Estimert levering</span>
              <span>{etaLabel}</span>
            </div>
          </div>

          <motion.button
            type="button"
            className="kb-btn-primary kb-btn-pay"
            disabled={loading || cleaningAmount <= 0}
            whileTap={{ scale: loading || cleaningAmount <= 0 ? 1 : 0.98 }}
            transition={softTransition}
            onClick={handlePay}
          >
            {loading ? "Behandler…" : `Betal kr ${formatKr(orderTotal)}`}{" "}
            <i className="ti ti-lock" aria-hidden="true" />
          </motion.button>
          <div className="kb-trust-row">
            <div className="kb-trust-item">
              <i className="ti ti-shield-check" aria-hidden="true" /> Sikker betaling
            </div>
            <div className="kb-trust-item">
              <i className="ti ti-brand-stripe" aria-hidden="true" /> Stripe
            </div>
          </div>
          </>
        )}

        {step === 4 && (
          <div className="kb-confirm-wrap">
            {checkoutConfirming ? (
              <>
                <div className="kb-confirm-icon kb-confirm-icon--loading" aria-hidden>
                  <i className="ti ti-loader-2" aria-hidden="true" />
                </div>
                <h2>Bekrefter betalingen…</h2>
                <p className="kb-confirm-sub">Et øyeblikk – du sendes til bekreftelsen.</p>
              </>
            ) : (
              <>
            <motion.div
              className="kb-confirm-icon"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 320, damping: 22 }
              }
            >
              <i className="ti ti-check" aria-hidden="true" />
            </motion.div>
            <h2>Takk for bestillingen!</h2>
            <p className="kb-confirm-sub">
              Hently henter varene dine og leverer dem til ønsket adresse.
            </p>

            <div className="kb-eta-card">
              <div className="kb-eta-label">
                <span className="kb-eta-dot" />
                Estimert levering
              </div>
              <div className="kb-eta-time">{etaLabel}</div>
              <div className="kb-eta-sub">Du får SMS når sjåføren er på vei</div>
            </div>

            <div className="kb-confirm-details">
              <div className="kb-confirm-row">
                <span>Navn</span>
                <span>{confirmName}</span>
              </div>
              <div className="kb-confirm-row">
                <span>Adresse</span>
                <span>{confirmAddr}</span>
              </div>
              <div className="kb-confirm-row">
                <span>Leveranse</span>
                <span>{confirmItems}</span>
              </div>
              <div className="kb-confirm-row">
                <span>Totalt betalt</span>
                <span>{formatKr(confirmTotal)} kr</span>
              </div>
              <div className="kb-confirm-row">
                <span>Partner</span>
                <span>Kværnerbyen Rens &amp; Skorep</span>
              </div>
              <div className="kb-confirm-row">
                <span>Status</span>
                <span style={{ color: "var(--kb-orange)" }}>Bekreftet ✓</span>
              </div>
              {orderId && (
                <div className="kb-confirm-row">
                  <span>Ordre-ID</span>
                  <span style={{ fontSize: 11, wordBreak: "break-all" }}>{orderId}</span>
                </div>
              )}
            </div>

            <div className="kb-sms-note">
              Vi sender deg en oppdatering snart.
              <br />
              Spørsmål? <a href="mailto:hei@hently.no">hei@hently.no</a>
            </div>
              </>
            )}
          </div>
        )}
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
