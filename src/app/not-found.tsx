import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="encarta-panel max-w-sm w-full">
        <div
          className="text-[12px] font-semibold text-[var(--color-encarta-cream)] px-3 py-1.5 border-b border-[#0a3a1e] flex items-center gap-1.5"
          style={{
            background: "linear-gradient(180deg, #c0392b 0%, #922b21 100%)",
            boxShadow: "inset 0 1px rgba(255,255,255,0.2)",
          }}
        >
          <span aria-hidden="true">⚠️</span>
          <span>Error — Página no encontrada</span>
        </div>
        <div className="p-4 text-center">
          <p className="text-[32px] font-bold text-[var(--color-encarta-red)] mb-2">404</p>
          <p className="text-[13px] text-[var(--color-encarta-dark-text)] mb-4">
            La página que buscas no existe en esta enciclopedia.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-1.5 text-[12px] font-semibold text-white rounded-sm border border-[#0a3a1e] transition-all duration-120"
            style={{
              background: "linear-gradient(180deg, #2d8f52 0%, #176B3A 100%)",
              boxShadow: "0 1px 2px rgba(0,0,0,0.3), inset 0 1px rgba(255,255,255,0.2)",
            }}
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
