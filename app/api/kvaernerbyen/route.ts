import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const PARTNER_SLUG = "kvaernerbyen";
const DELIVERY_FEE = 119;

type OrderBody = {
  customer_name?: string;
  phone?: string;
  address?: string;
  postal_code?: string;
  shop_order_number?: string;
  garment_count?: number;
  cleaning_amount?: number;
  delivery_time_option?: "asap" | "scheduled";
  delivery_time_at?: string | null;
};

function validateOrder(body: OrderBody): string | null {
  if (!body.customer_name?.trim()) return "Navn er påkrevd";
  if (!body.phone?.trim()) return "Telefon er påkrevd";
  if (!body.address?.trim()) return "Adresse er påkrevd";
  if (!body.postal_code?.trim()) return "Postnummer er påkrevd";
  if (!body.shop_order_number?.trim()) return "Beskriv hva som skal leveres";
  if (!body.garment_count || body.garment_count < 1) return "Velg antall varer";
  if (body.cleaning_amount == null || body.cleaning_amount <= 0) {
    return "Oppgi totalbeløp fra Kværnerbyen Rens & Skorep";
  }
  const digits = body.phone.replace(/\D/g, "");
  if (digits.length !== 8) return "Telefonnummer må være 8 siffer";
  if (body.delivery_time_option !== "asap" && body.delivery_time_option !== "scheduled") {
    return "Velg leveringstid";
  }
  if (body.delivery_time_option === "scheduled" && !body.delivery_time_at) {
    return "Velg tidspunkt for levering";
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as OrderBody;
    const error = validateOrder(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const phoneDigits = body.phone ? body.phone.replace(/\D/g, "") : "";
    const { data, error: dbError } = await supabase
      .from("partner_orders")
      .insert({
        partner_slug: PARTNER_SLUG,
        customer_name: body.customer_name!.trim(),
        phone: phoneDigits,
        address: body.address!.trim(),
        postal_code: body.postal_code!.trim(),
        shop_order_number: body.shop_order_number!.trim(),
        garment_count: body.garment_count,
        cleaning_amount: body.cleaning_amount,
        delivery_fee: DELIVERY_FEE,
        delivery_time_option: body.delivery_time_option,
        delivery_time_at:
          body.delivery_time_option === "scheduled" ? body.delivery_time_at : null,
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
        },
        { status: 500 },
      );
    }

    // Stripe PaymentIntent kan legges inn her når dere er klare:
    // const stripe = getStripe();
    // const intent = await stripe.paymentIntents.create({ amount: Math.round(data.total_amount * 100), ... });

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
    return NextResponse.json({ error: message }, { status: 500 });
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
