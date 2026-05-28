import { NextRequest, NextResponse } from "next/server";
import { buildOrderConfirmResponse } from "@/lib/kvaerner-order-confirm";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const PARTNER_SLUG = "kvaernerbyen";

export async function GET(request: NextRequest) {
  try {
    const orderId = request.nextUrl.searchParams.get("order_id") ?? "";
    if (!orderId) return NextResponse.json({ error: "order_id mangler" }, { status: 400 });

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("partner_orders")
      .select(
        "id, payment_status, total_amount, cleaning_amount, delivery_fee, shop_order_number, customer_name, address, postal_code, delivery_time_option, delivery_time_at"
      )
      .eq("id", orderId)
      .eq("partner_slug", PARTNER_SLUG)
      .maybeSingle();

    if (error) {
      console.error("GET /api/kvaernerbyen/order:", error);
      return NextResponse.json({ error: "Kunne ikke hente ordre" }, { status: 500 });
    }
    if (!data) return NextResponse.json({ error: "Ordre ikke funnet" }, { status: 404 });

    return NextResponse.json(buildOrderConfirmResponse(data));
  } catch (e) {
    console.error("GET /api/kvaernerbyen/order:", e);
    return NextResponse.json({ error: "Noe gikk galt" }, { status: 500 });
  }
}

