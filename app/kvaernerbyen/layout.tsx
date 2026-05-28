import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hently – Kværnerbyen Rens & Skorep",
  description: "Bestill henting og levering fra Kværnerbyen Rens & Skorep med Hently.",
};

export default function KvaernerbyenLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      {children}
    </>
  );
}
