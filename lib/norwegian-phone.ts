/** Normaliser til 8 siffer (norsk mobil/fastlinje uten landskode). */
export function normalizeNorwegianPhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 8) return digits;
  if (digits.length === 10 && digits.startsWith("47")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("047")) return digits.slice(3);
  return null;
}

export function formatNorwegianPhoneDisplay(input: string): string {
  const n = normalizeNorwegianPhone(input);
  if (!n) return input.replace(/\D/g, "").slice(0, 8);
  return `${n.slice(0, 3)} ${n.slice(3, 5)} ${n.slice(5)}`;
}
