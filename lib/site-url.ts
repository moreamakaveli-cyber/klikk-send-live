/**
 * Marketing-forsiden (hero, tjenester, navbar) – ikke /kvaernerbyen, /launch eller /bestill.
 */
export function getMarketingHomeHref(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return `${fromEnv}/`;
  if (process.env.NODE_ENV === "production") return "https://www.hently.no/";
  return "/";
}
