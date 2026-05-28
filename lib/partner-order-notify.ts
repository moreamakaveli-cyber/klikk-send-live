import { Resend } from "resend";
import {
  buildOrderConfirmResponse,
  type PartnerOrderRow,
} from "@/lib/kvaerner-order-confirm";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const PARTNER_SLUG = "kvaernerbyen";

/** Felter som trengs for varsler etter betalt ordre. */
export const PARTNER_ORDER_NOTIFY_SELECT =
  "id, payment_status, total_amount, cleaning_amount, delivery_fee, shop_order_number, customer_name, phone, address, postal_code, delivery_time_option, delivery_time_at";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function formatKr(amount: number): string {
  return amount.toLocaleString("nb-NO", { maximumFractionDigits: 0 });
}

function formatOrderRef(orderId: string): string {
  return orderId.replace(/-/g, "").slice(0, 8).toUpperCase();
}

function deliveryPreferenceLabel(order: PartnerOrderRow, etaLabel: string): string {
  if (order.delivery_time_option === "asap") {
    return `Så snart som mulig (${etaLabel})`;
  }
  return `Planlagt (${etaLabel})`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildOpsNotificationHtml(order: PartnerOrderRow): string {
  const { confirm } = buildOrderConfirmResponse(order);
  const cleaning = Number(order.cleaning_amount ?? 0);
  const deliveryFee = Number(order.delivery_fee ?? 0);
  const total = Number(order.total_amount ?? 0);
  const orderRef = formatOrderRef(order.id);

  const rows: [string, string][] = [
    ["Ordrenummer", orderRef],
    ["Navn", order.customer_name ?? "–"],
    ["Telefon", order.phone ?? "–"],
    ["Adresse", order.address ?? confirm.address],
    ["Hva skal leveres", order.shop_order_number ?? "–"],
    ["Levering", deliveryPreferenceLabel(order, confirm.etaLabel)],
    ["Beløp renseri", `${formatKr(cleaning)} kr`],
    ["Levering Hently", `${formatKr(deliveryFee)} kr`],
    ["Totalt", `${formatKr(total)} kr`],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px 8px 0;color:#64748B;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 0;font-weight:500">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family:system-ui,sans-serif;color:#0D1B2E;max-width:560px">
      <h1 style="font-size:20px;font-weight:600;margin:0 0 4px">Ny betalt ordre</h1>
      <p style="color:#64748B;font-size:13px;margin:0 0 20px">Kværnerbyen Rens &amp; Skorep · Hently</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">${tableRows}</table>
      <p style="color:#94A3B8;font-size:11px;margin-top:20px">Ordre-ID: ${escapeHtml(order.id)}</p>
    </div>
  `;
}

function buildCustomerReceiptHtml(
  confirm: ReturnType<typeof buildOrderConfirmResponse>["confirm"],
) {
  return `
    <div style="font-family:system-ui,sans-serif;color:#0D1B2E;max-width:520px">
      <h1 style="font-size:22px;font-weight:600;margin:0 0 8px">Takk for bestillingen!</h1>
      <p style="color:#64748B;line-height:1.5;margin:0 0 20px">
        Hently henter varene dine og leverer dem til ønsket adresse.
      </p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:8px 0;color:#64748B">Leveranse</td><td style="padding:8px 0;text-align:right">${escapeHtml(confirm.items)}</td></tr>
        <tr><td style="padding:8px 0;color:#64748B">Adresse</td><td style="padding:8px 0;text-align:right">${escapeHtml(confirm.address)}</td></tr>
        <tr><td style="padding:8px 0;color:#64748B">Estimert levering</td><td style="padding:8px 0;text-align:right">${escapeHtml(confirm.etaLabel)}</td></tr>
        <tr><td style="padding:8px 0;color:#64748B;font-weight:600">Totalt betalt</td><td style="padding:8px 0;text-align:right;font-weight:600">${formatKr(confirm.total)} kr</td></tr>
      </table>
      <p style="color:#64748B;font-size:12px;margin-top:24px">Spørsmål? <a href="mailto:hei@hently.no">hei@hently.no</a></p>
    </div>
  `;
}

/**
 * Etter vellykket betaling: operasjonelle varsler til Hently + Kværnerbyen.
 * Valgfritt kvittering til kunde (e-post fra Stripe Checkout).
 * Uten RESEND_API_KEY: returnerer stille (betaling/ordre påvirkes ikke).
 */
export async function sendPaidOrderEmails(
  order: PartnerOrderRow,
  customerEmail: string | null,
): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  const supabase = getSupabaseAdmin();
  const { data: claimed, error: claimError } = await supabase
    .from("partner_orders")
    .update({ confirmation_email_sent_at: new Date().toISOString() })
    .eq("id", order.id)
    .eq("partner_slug", PARTNER_SLUG)
    .is("confirmation_email_sent_at", null)
    .select("id")
    .maybeSingle();

  if (claimError) {
    console.error("partner_orders confirmation_email_sent_at:", claimError);
    return;
  }
  if (!claimed) return;

  const payload = buildOrderConfirmResponse(order);
  const opsHtml = buildOpsNotificationHtml(order);
  const from =
    process.env.RESEND_FROM_EMAIL ?? "Hently <onboarding@resend.dev>";
  const orderRef = formatOrderRef(order.id);
  const customerName = order.customer_name ?? "Kunde";

  const sends: Promise<unknown>[] = [];

  const hentlyTo = process.env.HENTLY_NOTIFY_EMAIL?.trim();
  if (hentlyTo) {
    sends.push(
      resend.emails.send({
        from,
        to: hentlyTo,
        subject: `[Hently] Ny ordre ${orderRef} – ${customerName}`,
        html: opsHtml,
      }),
    );
  }

  const partnerTo = process.env.KVARNERBYEN_NOTIFY_EMAIL?.trim();
  if (partnerTo) {
    sends.push(
      resend.emails.send({
        from,
        to: partnerTo,
        subject: `[Kværnerbyen] Ny levering ${orderRef} – ${customerName}`,
        html: opsHtml,
      }),
    );
  }

  const email = customerEmail?.trim();
  if (email) {
    sends.push(
      resend.emails.send({
        from,
        to: email,
        subject: "Takk for bestillingen – Hently",
        html: buildCustomerReceiptHtml(payload.confirm),
      }),
    );
  }

  if (sends.length === 0) return;

  const results = await Promise.allSettled(sends);
  for (const r of results) {
    if (r.status === "rejected") {
      console.error("sendPaidOrderEmails:", r.reason);
    }
  }
}
