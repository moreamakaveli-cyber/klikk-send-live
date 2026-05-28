import { normalizeNorwegianPhone } from "@/lib/norwegian-phone";

export type PartnerOrderPayload = {
  customer_name: string;
  phone: string;
  address: string;
  postal_code: string;
  shop_order_number: string;
  garment_count: number;
  cleaning_amount: number;
  delivery_time_option: "asap" | "scheduled";
  delivery_time_at: string | null;
};

export type PartnerOrderValidationResult =
  | { ok: true; data: PartnerOrderPayload }
  | { ok: false; error: string; field: string };

/** Aksepterer rå JSON fra klient (inkl. eventuelle legacy-feltnavn). */
export function normalizePartnerOrderBody(
  raw: Record<string, unknown>,
): Partial<PartnerOrderPayload> {
  const str = (v: unknown) => (typeof v === "string" ? v : v != null ? String(v) : "");

  const cleaningRaw = raw.cleaning_amount ?? raw.service_amount;
  const garmentRaw = raw.garment_count ?? raw.item_count;
  const shopRaw = raw.shop_order_number ?? raw.delivery_items;

  let deliveryOption = str(raw.delivery_time_option);
  if (deliveryOption === "pick") deliveryOption = "scheduled";

  return {
    customer_name: str(raw.customer_name),
    phone: str(raw.phone),
    address: str(raw.address),
    postal_code: str(raw.postal_code ?? raw.postnr),
    shop_order_number: str(shopRaw),
    garment_count:
      typeof garmentRaw === "number"
        ? garmentRaw
        : garmentRaw != null
          ? Number(garmentRaw)
          : undefined,
    cleaning_amount:
      typeof cleaningRaw === "number"
        ? cleaningRaw
        : cleaningRaw != null
          ? Number(cleaningRaw)
          : undefined,
    delivery_time_option:
      deliveryOption === "asap" || deliveryOption === "scheduled"
        ? deliveryOption
        : undefined,
    delivery_time_at:
      raw.delivery_time_at === null || raw.delivery_time_at === undefined
        ? null
        : str(raw.delivery_time_at) || null,
  };
}

export function validatePartnerOrderPayload(
  body: Partial<PartnerOrderPayload>,
): PartnerOrderValidationResult {
  const customer_name = body.customer_name?.trim() ?? "";
  if (!customer_name) {
    return { ok: false, field: "customer_name", error: "Navn er påkrevd" };
  }

  const phoneNormalized = normalizeNorwegianPhone(body.phone ?? "");
  if (!phoneNormalized) {
    return {
      ok: false,
      field: "phone",
      error: "Telefonnummer må være 8 siffer",
    };
  }

  const address = body.address?.trim() ?? "";
  if (!address) {
    return { ok: false, field: "address", error: "Adresse er påkrevd" };
  }

  const postal_code = body.postal_code?.trim() ?? "";
  if (!postal_code) {
    return { ok: false, field: "postal_code", error: "Postnummer er påkrevd" };
  }

  const shop_order_number = body.shop_order_number?.trim() ?? "";
  if (!shop_order_number) {
    return {
      ok: false,
      field: "shop_order_number",
      error: "Beskriv hva som skal leveres",
    };
  }

  const garment_count = Math.floor(Number(body.garment_count));
  if (!Number.isFinite(garment_count) || garment_count < 1) {
    return { ok: false, field: "garment_count", error: "Velg antall varer" };
  }

  const cleaning_amount = Number(body.cleaning_amount);
  if (!Number.isFinite(cleaning_amount) || cleaning_amount <= 0) {
    return {
      ok: false,
      field: "cleaning_amount",
      error: "Oppgi totalbeløp fra Kværnerbyen Rens & Skorep",
    };
  }

  const delivery_time_option = body.delivery_time_option;
  if (delivery_time_option !== "asap" && delivery_time_option !== "scheduled") {
    return {
      ok: false,
      field: "delivery_time_option",
      error: "Velg leveringstid (snarest eller planlagt)",
    };
  }

  const delivery_time_at =
    body.delivery_time_at && String(body.delivery_time_at).trim()
      ? String(body.delivery_time_at).trim()
      : null;

  if (delivery_time_option === "scheduled" && !delivery_time_at) {
    return {
      ok: false,
      field: "delivery_time_at",
      error: "Velg tidspunkt for levering",
    };
  }

  return {
    ok: true,
    data: {
      customer_name,
      phone: phoneNormalized,
      address,
      postal_code,
      shop_order_number,
      garment_count,
      cleaning_amount,
      delivery_time_option,
      delivery_time_at:
        delivery_time_option === "scheduled" ? delivery_time_at : null,
    },
  };
}
