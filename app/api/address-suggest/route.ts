import { NextRequest, NextResponse } from "next/server";
import { titleCasePlace } from "@/lib/partner-address";

type GeonorgeAddress = {
  adressetekst: string;
  postnummer: string;
  poststed: string;
  adressekode: number;
  nummer: number;
  bokstav?: string;
};

export type AddressSuggestion = {
  id: string;
  label: string;
  street: string;
  postnr: string;
  city: string;
};

export async function GET(request: NextRequest) {
  try {
    const q = (request.nextUrl.searchParams.get("q") ?? "").trim();
    if (q.length < 2) {
      return NextResponse.json({ suggestions: [] as AddressSuggestion[] });
    }

    const url = new URL("https://ws.geonorge.no/adresser/v1/sok");
    url.searchParams.set("sok", q);
    url.searchParams.set("fuzzy", "true");
    url.searchParams.set("treffPerSide", "8");

    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return NextResponse.json({ suggestions: [] });
    }

    const json = (await res.json()) as { adresser?: GeonorgeAddress[] };
    const seen = new Set<string>();
    const suggestions: AddressSuggestion[] = [];

    for (const a of json.adresser ?? []) {
      const postnr = a.postnummer?.trim();
      const city = titleCasePlace(a.poststed ?? "");
      const street = a.adressetekst?.trim();
      if (!street || !postnr) continue;

      const key = `${street}|${postnr}`;
      if (seen.has(key)) continue;
      seen.add(key);

      suggestions.push({
        id: `${a.adressekode}-${a.nummer}${a.bokstav ?? ""}-${postnr}`,
        label: street,
        street,
        postnr,
        city,
      });
    }

    return NextResponse.json({ suggestions });
  } catch (e) {
    console.error("GET /api/address-suggest:", e);
    return NextResponse.json({ suggestions: [] });
  }
}
