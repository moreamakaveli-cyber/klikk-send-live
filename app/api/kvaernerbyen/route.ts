import { NextRequest, NextResponse } from "next/server";
import {
  normalizePartnerOrderBody,
  validatePartnerOrderPayload,
} from "@/lib/partner-order-validate";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const PARTNER_SLUG = "kvaernerbyen";
const DELIVERY_FEE = 119;

export async function POST(request: NextRequest) {
  try {
    let raw: Record<string, unknown>;
    try {
      raw = (await request.json()) as Record<string, unknown>;
    } catch {
      console.warn("[POST /api/kvaernerbyen] invalid JSON body");
      return NextResponse.json(
        { error: "Ugyldig forespørsel (JSON)", field: "body" },
        { status: 400 },
      );
    }

    const normalized = normalizePartnerOrderBody(raw);
    const validation = validatePartnerOrderPayload(normalized);

    if (!validation.ok) {
      console.warn(
        `[POST /api/kvaernerbyen] validation failed: field=${validation.field} error=${validation.error}`,
      );
      return NextResponse.json(
        { error: validation.error, field: validation.field },
        { status: 400 },
      );
    }

    const body = validation.data;
    const supabase = getSupabaseAdmin();

    const { data, error: dbError } = await supabase
      .from("partner_orders")
      .insert({
        partner_slug: PARTNER_SLUG,
        customer_name: body.customer_name,
        phone: body.phone,
        address: body.address,
        postal_code: body.postal_code,
        shop_order_number: body.shop_order_number,
        garment_count: body.garment_count,
        cleaning_amount: body.cleaning_amount,
        delivery_fee: DELIVERY_FEE,
        delivery_time_option: body.delivery_time_option,
        delivery_time_at: body.delivery_time_at,
        payment_status: "pending",
        delivery_status: "new",
      })
      .select("id, total_amount, cleaning_amount, delivery_fee")
      .single();

    if (dbError) {
      console.error("partner_orders insert:", dbError);
      const details = `${dbError.message ?? ""} ${dbError.details ?? ""}`.toLowerCase();
      const isNetworkIssue =
        details.includes("enotfound") ||
        details.includes("fetch failed") ||
        details.includes("network");
      const isMissingTable =
        details.includes("relation") && details.includes("partner_orders");
      return NextResponse.json(
        {
          error: isMissingTable
            ? "Kunne ikke opprette ordre. Sjekk at tabellen partner_orders finnes i Supabase."
            : isNetworkIssue
              ? "Kunne ikke koble til Supabase akkurat nå. Sjekk nett/dns og prøv igjen."
              : "Kunne ikke opprette ordre i Supabase. Sjekk prosjekt-ID, nøkler og tabellstruktur.",
          field: "database",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      order_id: data.id,
      total_amount: data.total_amount,
      cleaning_amount: data.cleaning_amount,
      delivery_fee: data.delivery_fee,
    });
  } catch (e) {
    console.error("POST /api/kvaernerbyen:", e);
    const message =
      e instanceof Error && e.message.includes("SUPABASE_SERVICE_ROLE")
        ? "Server mangler SUPABASE_SERVICE_ROLE_KEY i miljøvariabler"
        : "Noe gikk galt";
    return NextResponse.json({ error: message, field: "server" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  return NextResponse.json(
    {
      error:
        "PATCH er deaktivert. Betaling må bekreftes via Stripe webhook og oppdateres server-side.",
    },
    { status: 405 },
  );
}
