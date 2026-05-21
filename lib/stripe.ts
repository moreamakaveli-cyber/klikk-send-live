import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error("STRIPE_SECRET_KEY is not configured");
}

export const stripe = new Stripe(secretKey, {
  apiVersion: "2025-02-24.acacia",
});

export function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:3000";
  return url.replace(/\/$/, "");
}
