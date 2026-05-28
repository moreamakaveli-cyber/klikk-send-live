import { parsePartnerAddress } from "@/lib/partner-address";

const ASAP_ETA_LABEL = "Innen 45min – 2timer";

function formatScheduledEta(dateIso: string | null) {
  if (!dateIso) return "Planlagt levering";
  const d = new Date(dateIso);
  if (Number.isNaN(d.getTime())) return "Planlagt levering";

  const dayLabels = ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"] as const;
  const weekday = dayLabels[d.getDay()] ?? "";
  const dayNum = d.getDate();
  const startHour = d.getHours();

  const slotByStart: Record<number, string> = {
    9: "09–12",
    10: "10–12",
    12: "12–14",
    14: "14–16",
    16: "16–19",
  };

  const slotByStartSat: Record<number, string> = {
    10: "10–12",
    12: "12–14",
    14: "14–17",
  };

  const isSat = d.getDay() === 6;
  const slot = isSat ? slotByStartSat[startHour] : slotByStart[startHour] ?? "";
  if (weekday && slot) return `${weekday} ${dayNum}. · ${slot}`;
  return `Planlagt levering · ${d.toLocaleTimeString("nb-NO", { hour: "2-digit", minute: "2-digit" })}`;
}

export type PartnerOrderRow = {
  id: string;
  payment_status: string;
  total_amount: number | string | null;
  cleaning_amount?: number | string | null;
  delivery_fee?: number | string | null;
  shop_order_number: string | null;
  customer_name: string | null;
  phone?: string | null;
  address: string | null;
  postal_code: string | null;
  delivery_time_option: string;
  delivery_time_at: string | null;
};

export function buildOrderConfirmResponse(order: PartnerOrderRow) {
  const parsed = parsePartnerAddress(order.address ?? "", order.postal_code ?? "");
  const confirmAddr = [parsed.street, `${parsed.postnr} ${parsed.city}`].filter(Boolean).join(", ");
  const eta =
    order.delivery_time_option === "asap"
      ? ASAP_ETA_LABEL
      : formatScheduledEta(order.delivery_time_at);

  return {
    order_id: order.id,
    payment_status: order.payment_status,
    confirm: {
      name: order.customer_name ?? "",
      address: confirmAddr || "–",
      items: order.shop_order_number ?? "–",
      total: Number(order.total_amount ?? 0),
      etaLabel: eta,
    },
  };
}
