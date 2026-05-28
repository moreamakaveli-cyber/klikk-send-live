import { NextRequest, NextResponse } from "next/server";
import { parsePartnerAddress } from "@/lib/partner-address";
import { normalizeNorwegianPhone } from "@/lib/norwegian-phone";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function GET(request: NextRequest) {
  try {
    const phoneParam = request.nextUrl.searchParams.get("phone") ?? "";
    const phone = normalizeNorwegianPhone(phoneParam);

    if (!phone) {
      return NextResponse.json({ found: false });
    }

    const supabase = getSupabaseAdmin();
    const variants = [phone, `+47${phone}`, `47${phone}`];

    const { data, error } = await supabase
      .from("partner_orders")
      .select("customer_name, address, postal_code, phone")
      .in("phone", variants)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("customer lookup:", error);
      return NextResponse.json({ error: "Kunne ikke slå opp kunde" }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ found: false });
    }

    const parsed = parsePartnerAddress(data.address, data.postal_code);

    return NextResponse.json({
      found: true,
      customer: {
        name: data.customer_name,
        phone: data.phone,
        street: parsed.street,
        postnr: parsed.postnr,
        city: parsed.city,
        doorcode: parsed.doorcode,
      },
    });
  } catch (e) {
    console.error("GET /api/kvaernerbyen/customer:", e);
    return NextResponse.json({ error: "Noe gikk galt" }, { status: 500 });
  }
}
