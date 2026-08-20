import Link from "next/link";

export default function NotFound() {
  return (
    <main className="console" style={{ justifyContent: "center", alignItems: "center", textAlign: "center", padding: "48px 24px" }}>
      <span style={{ fontSize: "64px", marginBottom: "16px", display: "block" }} aria-hidden="true">🔍</span>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 800, color: "var(--color-navy)", marginBottom: "16px" }}>404</h1>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "18px", color: "var(--color-navy-soft)", marginBottom: "32px" }}>
        ¡Ups! Esta página no existe
      </p>
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 32px",
          background: "var(--color-blue)",
          border: "4px solid var(--color-navy)",
          borderRadius: "999px",
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "16px",
          color: "var(--color-navy)",
          textDecoration: "none",
          boxShadow: "var(--shadow-pop-sm)",
        }}
      >
        Volver al inicio
      </Link>
    </main>
  );
}
