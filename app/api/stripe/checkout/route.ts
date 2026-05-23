import { NextResponse } from "next/server";
import { getSiteUrl, getStripe } from "@/lib/stripe";

export async function POST() {
  try {
    const siteUrl = getSiteUrl();
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "klarna"],
      line_items: [
        {
          price_data: {
            currency: "nok",
            unit_amount: 11900,
            product_data: {
              name: "Hently levering (0–3 km)",
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/order-cancelled`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Kunne ikke opprette betalingslenke." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Kunne ikke starte betaling.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
