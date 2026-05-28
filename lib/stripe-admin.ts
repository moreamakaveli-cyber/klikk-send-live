import Stripe from "stripe";

let stripeClient: Stripe | null = null;

/** Server-only Stripe client (brukes i API routes/webhook). */
export function getStripeAdmin(): Stripe {
  if (stripeClient) return stripeClient;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY in environment variables");
  }

  stripeClient = new Stripe(secretKey, {
    typescript: true,
  });

  return stripeClient;
}

/** Vipps krever Stripe private preview – kun aktiver når kontoen har tilgang. */
export function getCheckoutPaymentMethodTypes(): string[] {
  if (process.env.STRIPE_ENABLE_VIPPS === "true") {
    return ["card", "vipps"];
  }
  return ["card"];
}
