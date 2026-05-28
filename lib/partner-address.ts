export function titleCasePlace(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Gjenoppbygg felter fra lagret partner_orders.address + postal_code */
export function parsePartnerAddress(address: string, postalCode: string) {
  const parts = address
    .split(", ")
    .map((p) => p.trim())
    .filter((p) => p && !p.startsWith("Instruks:"));

  let street = parts[0] ?? "";
  let doorcode = "";
  let postnr = postalCode.trim();
  let city = "";

  for (let i = 1; i < parts.length; i++) {
    const placeMatch = parts[i].match(/^(\d{4})\s+(.+)$/i);
    if (placeMatch) {
      postnr = placeMatch[1];
      city = titleCasePlace(placeMatch[2]);
    } else if (!city) {
      doorcode = parts[i];
    }
  }

  const commaIdx = street.lastIndexOf(", ");
  if (commaIdx > 0 && doorcode === "") {
    doorcode = street.slice(commaIdx + 2);
    street = street.slice(0, commaIdx);
  }

  return { street, postnr, city, doorcode };
}
