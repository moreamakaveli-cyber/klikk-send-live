"use client";

/**
 * Egen global-error erstatter Next sin innebygde modul og unngår
 * «Could not find … global-error.js#default in the React Client Manifest» i dev.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="no">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          padding: 24,
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 22, marginBottom: 8 }}>Noe gikk galt</h1>
        <p style={{ color: "#555", marginBottom: 20, maxWidth: 360 }}>
          En uventet feil oppstod. Prøv å laste siden på nytt.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            padding: "12px 20px",
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
          <pre
            style={{
              marginTop: 24,
              fontSize: 11,
              color: "#888",
              maxWidth: "100%",
              overflow: "auto",
            }}
          >
            {error.message}
          </pre>
        )}
      </body>
    </html>
  );
}
