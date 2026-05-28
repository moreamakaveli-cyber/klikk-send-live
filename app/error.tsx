"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        margin: "48px auto",
        maxWidth: 420,
        padding: 24,
        textAlign: "center",
        fontFamily: "var(--font-sans, system-ui, sans-serif)",
      }}
    >
      <h2 style={{ fontSize: 20, marginBottom: 8 }}>Noe gikk galt</h2>
      <p style={{ color: "#555", marginBottom: 16 }}>
        Kunne ikke vise siden. Prøv igjen.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        style={{
          padding: "10px 18px",
          borderRadius: 8,
          border: "none",
          background: "#0f2744",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Prøv igjen
      </button>
      {process.env.NODE_ENV === "development" && error.message && (
        <p style={{ marginTop: 16, fontSize: 12, color: "#888" }}>{error.message}</p>
      )}
    </div>
  );
}
