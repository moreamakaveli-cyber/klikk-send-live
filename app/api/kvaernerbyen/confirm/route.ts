import { NextRequest, NextResponse } from "next/server";
import { buildOrderConfirmResponse } from "@/lib/kvaerner-order-confirm";
import {
  PARTNER_ORDER_NOTIFY_SELECT,
  sendPaidOrderEmails,
} from "@/lib/partner-order-notify";
import { getStripeAdmin } from "@/lib/stripe-admin";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const PARTNER_SLUG = "kvaernerbyen";

type ConfirmBody = {
  order_id?: string;
  session_id?: string;
};

export async function POST(request: NextRequest) {
  try {
    const { order_id, session_id } = (await request.json()) as ConfirmBody;
    if (!order_id || !session_id) {
      return NextResponse.json({ error: "order_id og session_id mangler" }, { status: 400 });
    }

    const stripe = getStripeAdmin();
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.metadata?.order_id !== order_id) {
      return NextResponse.json({ error: "Ordre stemmer ikke med betaling" }, { status: 400 });
    }

    const isPaid =
      session.payment_status === "paid" ||
      session.status === "complete";

    if (!isPaid) {
      return NextResponse.json({ error: "Betalingen er ikke fullført ennå" }, { status: 402 });
    }

    const supabase = getSupabaseAdmin();
    const paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id ?? null;

    const { data, error } = await supabase
      .from("partner_orders")
      .update({
        payment_status: "paid",
        delivery_status: "awaiting_dispatch",
        stripe_payment_intent_id: paymentIntentId,
      })
      .eq("id", order_id)
      .eq("partner_slug", PARTNER_SLUG)
      .select(PARTNER_ORDER_NOTIFY_SELECT)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Ordre ikke funnet" }, { status: 404 });
    }

    const customerEmail =
      session.customer_details?.email ?? session.customer_email ?? null;

    void sendPaidOrderEmails(data, customerEmail).catch((err) =>
      console.error("sendPaidOrderEmails:", err),
    );

    return NextResponse.json(buildOrderConfirmResponse(data));
  } catch (e) {
    console.error("POST /api/kvaernerbyen/confirm:", e);
    return NextResponse.json({ error: "Kunne ikke bekrefte betaling" }, { status: 500 });
  }
}
