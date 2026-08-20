"use client";

import { useState } from "react";
import Link from "next/link";

const grades = [
  { id: "6", nombre: "Grado 6°" },
  { id: "7", nombre: "Grado 7°" },
  { id: "8", nombre: "Grado 8°" },
  { id: "9", nombre: "Grado 9°" },
  { id: "10", nombre: "Grado 10°" },
  { id: "11", nombre: "Grado 11°" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Menu button - retro beveled style */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="min-w-[32px] min-h-[32px] flex items-center justify-center rounded-sm text-white border border-[#0a3a1e] transition-all duration-120"
        style={{
          background: isOpen
            ? "linear-gradient(180deg, #0D4A28 0%, #176B3A 100%)"
            : "linear-gradient(180deg, #2d8f52 0%, #176B3A 100%)",
          boxShadow: isOpen
            ? "inset 0 2px 3px rgba(0,0,0,0.3)"
            : "0 1px 2px rgba(0,0,0,0.3), inset 0 1px rgba(255,255,255,0.2)",
        }}
        aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        {isOpen ? (
          <span className="text-sm font-bold" aria-hidden="true">✕</span>
        ) : (
          <span className="text-sm" aria-hidden="true">☰</span>
        )}
      </button>

      {/* Slide-out panel from left */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <nav
            id="mobile-navigation"
            className="fixed left-0 top-0 bottom-0 w-56 z-50 flex flex-col border-r border-[#8b7d5e]"
            style={{
              background: "var(--color-encarta-warm-white)",
              boxShadow: "3px 0 8px rgba(0,0,0,0.3)",
            }}
            aria-label="Navegación móvil"
          >
            {/* Panel Header */}
            <div className="encarta-panel-header py-2 px-3">
              <span className="text-[12px]">📚 Mi Primera Encarta</span>
            </div>

            {/* Navigation Items */}
            <ul className="flex flex-col py-1 overflow-y-auto encarta-scroll flex-1">
              <li>
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-[12px] font-semibold text-[var(--color-encarta-dark-text)] hover:bg-[#e8e0c8] border-b border-[#e8e0c8] transition-colors duration-100"
                >
                  🏠 Inicio
                </Link>
              </li>
              <li className="px-3 pt-2 pb-1">
                <span className="text-[10px] font-bold uppercase text-[#8b7d5e] tracking-wider">
                  Grados
                </span>
              </li>
              {grades.map((grado) => (
                <li key={grado.id}>
                  <Link
                    href={`/grado/${grado.id}`}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-1.5 text-[12px] text-[var(--color-encarta-dark-text)] hover:bg-[#e8e0c8] transition-colors duration-100"
                  >
                    <span className="text-[var(--color-encarta-green)] mr-1">▸</span>
                    {grado.nombre}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Panel Footer */}
            <div className="encarta-statusbar text-[10px] py-1 px-3 border-t border-[#b0a582]">
              Matemáticas • Grados 6°–11°
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
