"use client";

// Catches failures in the root layout itself (fonts, providers, etc.) —
// error.tsx alone can't cover this since it renders inside the layout.
// Deliberately plain inline styles: if the layout is what broke, we can't
// rely on it (or Tailwind's theme) being available.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          background: "#04040c",
          color: "#e4e4f0",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <h1 style={{ fontWeight: 700, fontSize: "1.5rem" }}>Something went wrong.</h1>
        <p style={{ color: "#8a8aaa", fontSize: "0.875rem", maxWidth: "28rem" }}>
          This isn&apos;t you — our systems hit a snag. Nothing you entered was lost.
        </p>
        <button
          onClick={reset}
          style={{
            background: "#2c6fed",
            color: "#fff",
            padding: "0.625rem 1.25rem",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            border: "none",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
        {error.digest && (
          <p style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#8a8aaa" }}>
            Reference: {error.digest}
          </p>
        )}
      </body>
    </html>
  );
}
