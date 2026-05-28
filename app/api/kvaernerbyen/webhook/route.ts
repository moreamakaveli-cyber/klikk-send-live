import { NextRequest, NextResponse } from "next/server";
import {
  PARTNER_ORDER_NOTIFY_SELECT,
  sendPaidOrderEmails,
} from "@/lib/partner-order-notify";
import { getStripeAdmin } from "@/lib/stripe-admin";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type Stripe from "stripe";

export const runtime = "nodejs";

const PARTNER_SLUG = "kvaernerbyen";

export async function POST(request: NextRequest) {
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripeWebhookSecret) {
    return NextResponse.json({ error: "Missing STRIPE_WEBHOOK_SECRET" }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  try {
    const stripe = getStripeAdmin();
    const rawBody = await request.text();
    const event = stripe.webhooks.constructEvent(rawBody, signature, stripeWebhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.order_id;
      if (orderId) {
        const supabase = getSupabaseAdmin();
        const paymentIntentId =
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id ?? null;

        const { data: order } = await supabase
          .from("partner_orders")
          .update({
            payment_status: "paid",
            delivery_status: "awaiting_dispatch",
            stripe_payment_intent_id: paymentIntentId,
          })
          .eq("id", orderId)
          .eq("partner_slug", PARTNER_SLUG)
          .select(PARTNER_ORDER_NOTIFY_SELECT)
          .single();

        if (order) {
          const customerEmail =
            session.customer_details?.email ?? session.customer_email ?? null;
          void sendPaidOrderEmails(order, customerEmail).catch((err) =>
            console.error("sendPaidOrderEmails:", err),
          );
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("Stripe webhook error:", e);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 400 });
  }
}

