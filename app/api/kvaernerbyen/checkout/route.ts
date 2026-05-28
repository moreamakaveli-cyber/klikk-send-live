import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { getCheckoutPaymentMethodTypes, getStripeAdmin } from "@/lib/stripe-admin";
import Stripe from "stripe";
import { parsePartnerAddress } from "@/lib/partner-address";

export const runtime = "nodejs";

const PARTNER_SLUG = "kvaernerbyen";

type CheckoutBody = {
  order_id?: string;
  /** Origin fra nettleseren (f.eks. http://127.0.0.1:3010) – sikrer riktig retur-URL etter Stripe. */
  origin?: string;
};

function isAllowedCheckoutOrigin(origin: string): boolean {
  try {
    const u = new URL(origin);
    if (u.protocol !== "http:" && u.protocol !== "https:") return false;
    const host = u.hostname.toLowerCase();
    if (host === "hently.no" || host === "www.hently.no") return true;
    if (host === "localhost" || host === "127.0.0.1") return true;
    if (host.endsWith(".vercel.app")) return true;
    return false;
  } catch {
    return false;
  }
}

function resolveSiteUrl(request: NextRequest, clientOrigin?: string): string {
  const trimmed = clientOrigin?.replace(/\/$/, "");
  if (trimmed && isAllowedCheckoutOrigin(trimmed)) return trimmed;

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? "http";
  if (host) return `${proto}://${host}`;

  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://127.0.0.1:3000";
}

export async function POST(request: NextRequest) {
  try {
    const { order_id, origin: clientOrigin } = (await request.json()) as CheckoutBody;
    if (!order_id) return NextResponse.json({ error: "order_id mangler" }, { status: 400 });

    const supabase = getSupabaseAdmin();
    const order = await supabase
      .from("partner_orders")
      .select(
        "id, total_amount, cleaning_amount, delivery_fee, shop_order_number, customer_name, phone, address, postal_code, delivery_time_option, delivery_time_at, garment_count"
      )
      .eq("id", order_id)
      .eq("partner_slug", PARTNER_SLUG)
      .single();

    if (order.error || !order.data) {
      return NextResponse.json({ error: "Ordre ikke funnet" }, { status: 404 });
    }

    const o = order.data;
    const total = Number(o.total_amount);
    const amountMinor = Math.round(total * 100); // NOK: 1 kr = 100 øre

    if (!Number.isFinite(amountMinor) || amountMinor <= 0) {
      return NextResponse.json({ error: "Ugyldig beløp" }, { status: 400 });
    }

    const siteUrl = resolveSiteUrl(request, clientOrigin);
    const successUrl = `${siteUrl}/kvaernerbyen?checkout=success&order_id=${encodeURIComponent(o.id)}&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${siteUrl}/kvaernerbyen?checkout=cancel&order_id=${encodeURIComponent(o.id)}`;

    const customerAddress = parsePartnerAddress(o.address ?? "", o.postal_code ?? "");
    const labelParts = [
      "Kværnerbyen levering",
      o.shop_order_number ? `· ${o.shop_order_number}` : "",
    ].filter(Boolean);

    const stripe = getStripeAdmin();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      currency: "nok",
      // E-post samles kun her på Stripe – ikke i Hently-skjemaet (unngår dobbelt utfylling).
      payment_method_types: getCheckoutPaymentMethodTypes() as Stripe.Checkout.SessionCreateParams["payment_method_types"],
      line_items: [
        {
          price_data: {
            currency: "nok",
            unit_amount: amountMinor,
            product_data: {
              name: labelParts.join(" "),
              description: `${customerAddress.street ? customerAddress.street + ", " : ""}${customerAddress.postnr} ${customerAddress.city}`.trim(),
            },
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        order_id: o.id,
        partner_slug: PARTNER_SLUG,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("POST /api/kvaernerbyen/checkout:", e);
    const stripeMsg =
      e instanceof Stripe.errors.StripeError ? e.message : null;
    return NextResponse.json(
      {
        error: stripeMsg?.includes("vipps")
          ? "Vipps er ikke aktivert på Stripe-kontoen ennå. Bruk kort, eller be Stripe om Vipps-tilgang."
          : "Kunne ikke starte betaling. Sjekk Stripe-nøkler og prøv igjen.",
      },
      { status: 500 },
    );
  }
}

