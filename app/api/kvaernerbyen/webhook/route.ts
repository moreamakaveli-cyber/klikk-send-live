import { NextRequest, NextResponse } from "next/server";
import {
  PARTNER_ORDER_NOTIFY_SELECT,
  sendPaidOrderEmails,
} from "@/lib/partner-order-notify";
import { getStripeAdmin } from "@/lib/stripe-admin";
import { getSupabaseAdmin, getSupabaseProjectRef } from "@/lib/supabase-admin";
import type Stripe from "stripe";

export const runtime = "nodejs";

const PARTNER_SLUG = "kvaernerbyen";

function shortId(id: string): string {
  return id.length > 12 ? `${id.slice(0, 8)}…` : id;
}

export async function POST(request: NextRequest) {
  const supabaseProject = getSupabaseProjectRef();
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

        const { data: before } = await supabase
          .from("partner_orders")
          .select("payment_status")
          .eq("id", orderId)
          .eq("partner_slug", PARTNER_SLUG)
          .maybeSingle();

        const wasAlreadyPaid = before?.payment_status === "paid";

        const paymentIntentId =
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id ?? null;

        const { data: order, error } = await supabase
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

        if (error || !order) {
          console.error("[POST /api/kvaernerbyen/webhook] order update failed", {
            supabase_project: supabaseProject,
            order_id: shortId(orderId),
            stripe_session: session.id ? shortId(session.id) : null,
            db_error: error?.message ?? "no row returned",
          });
        } else {
          const customerEmail =
            session.customer_details?.email ?? session.customer_email ?? null;

          const emailResult = await sendPaidOrderEmails(order, customerEmail, {
            skipIfAlreadyPaid: wasAlreadyPaid,
          });

          console.info("[POST /api/kvaernerbyen/webhook] checkout.session.completed", {
            supabase_project: supabaseProject,
            order_id: order.id,
            stripe_session: session.id ? shortId(session.id) : null,
            payment_status: order.payment_status,
            was_already_paid: wasAlreadyPaid,
            email: emailResult,
          });
        }
      } else {
        console.warn("[POST /api/kvaernerbyen/webhook] missing metadata.order_id", {
          supabase_project: supabaseProject,
          stripe_session: session.id ? shortId(session.id) : null,
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("[POST /api/kvaernerbyen/webhook] error", {
      supabase_project: supabaseProject,
      message: e instanceof Error ? e.message : String(e),
    });
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 400 });
  }
}
