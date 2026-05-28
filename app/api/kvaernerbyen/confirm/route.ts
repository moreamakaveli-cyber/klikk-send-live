import { NextRequest, NextResponse } from "next/server";
import { buildOrderConfirmResponse } from "@/lib/kvaerner-order-confirm";
import {
  PARTNER_ORDER_NOTIFY_SELECT,
  sendPaidOrderEmails,
} from "@/lib/partner-order-notify";
import { getStripeAdmin } from "@/lib/stripe-admin";
import { getSupabaseAdmin, getSupabaseProjectRef } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const PARTNER_SLUG = "kvaernerbyen";

type ConfirmBody = {
  order_id?: string;
  session_id?: string;
};

function shortId(id: string): string {
  return id.length > 12 ? `${id.slice(0, 8)}…` : id;
}

export async function POST(request: NextRequest) {
  const supabaseProject = getSupabaseProjectRef();

  try {
    const { order_id, session_id } = (await request.json()) as ConfirmBody;
    if (!order_id || !session_id) {
      return NextResponse.json({ error: "order_id og session_id mangler" }, { status: 400 });
    }

    const stripe = getStripeAdmin();
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const metaOrderId = session.metadata?.order_id;
    if (metaOrderId !== order_id) {
      console.warn("[POST /api/kvaernerbyen/confirm] metadata mismatch", {
        supabase_project: supabaseProject,
        body_order_id: shortId(order_id),
        stripe_metadata_order_id: metaOrderId ? shortId(metaOrderId) : null,
        stripe_session: shortId(session_id),
      });
      return NextResponse.json({ error: "Ordre stemmer ikke med betaling" }, { status: 400 });
    }

    const isPaid =
      session.payment_status === "paid" || session.status === "complete";

    if (!isPaid) {
      console.warn("[POST /api/kvaernerbyen/confirm] stripe session not paid yet", {
        supabase_project: supabaseProject,
        order_id: shortId(order_id),
        stripe_session: shortId(session_id),
        payment_status: session.payment_status,
        status: session.status,
      });
      return NextResponse.json({ error: "Betalingen er ikke fullført ennå" }, { status: 402 });
    }

    const supabase = getSupabaseAdmin();

    const { data: before } = await supabase
      .from("partner_orders")
      .select("payment_status")
      .eq("id", order_id)
      .eq("partner_slug", PARTNER_SLUG)
      .maybeSingle();

    const wasAlreadyPaid = before?.payment_status === "paid";

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
      console.error("[POST /api/kvaernerbyen/confirm] order update failed", {
        supabase_project: supabaseProject,
        order_id: shortId(order_id),
        stripe_session: shortId(session_id),
        db_error: error?.message ?? "no row returned",
      });
      return NextResponse.json({ error: "Ordre ikke funnet" }, { status: 404 });
    }

    const customerEmail =
      session.customer_details?.email ?? session.customer_email ?? null;

    const emailResult = await sendPaidOrderEmails(data, customerEmail, {
      skipIfAlreadyPaid: wasAlreadyPaid,
    });

    console.info("[POST /api/kvaernerbyen/confirm] ok", {
      supabase_project: supabaseProject,
      order_id: data.id,
      stripe_session: shortId(session_id),
      payment_status: data.payment_status,
      was_already_paid: wasAlreadyPaid,
      email: emailResult,
    });

    return NextResponse.json(buildOrderConfirmResponse(data));
  } catch (e) {
    console.error("[POST /api/kvaernerbyen/confirm] error", {
      supabase_project: supabaseProject,
      message: e instanceof Error ? e.message : String(e),
    });
    return NextResponse.json({ error: "Kunne ikke bekrefte betaling" }, { status: 500 });
  }
}
