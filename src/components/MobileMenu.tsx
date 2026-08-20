"use client";

import { useState } from "react";
import Link from "next/link";

const grades = [
  { id: "6", nombre: "Grado 6°", color: "#2196F3" },
  { id: "7", nombre: "Grado 7°", color: "#4CAF50" },
  { id: "8", nombre: "Grado 8°", color: "#FF9800" },
  { id: "9", nombre: "Grado 9°", color: "#9C27B0" },
  { id: "10", nombre: "Grado 10°", color: "#009688" },
  { id: "11", nombre: "Grado 11°", color: "#F44336" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger button - min 44x44px touch target */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-secondary"
        aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        {isOpen ? (
          <span className="text-2xl font-bold" aria-hidden="true">✕</span>
        ) : (
          <span className="text-2xl" aria-hidden="true">☰</span>
        )}
      </button>

      {/* Dropdown navigation */}
      {isOpen && (
        <nav
          id="mobile-navigation"
          className="absolute left-0 right-0 top-full z-50 bg-gradient-to-b from-primary-700 to-primary-800 border-t border-primary-500/30 shadow-xl"
          aria-label="Navegación móvil"
        >
          <ul className="flex flex-col py-2">
            <li>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 min-h-[44px] flex items-center text-white hover:bg-primary-600 font-medium"
              >
                🏠 Inicio
              </Link>
            </li>
            {grades.map((grado) => (
              <li key={grado.id}>
                <Link
                  href={`/grado/${grado.id}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 min-h-[44px] flex items-center gap-3 text-white hover:bg-primary-600"
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: grado.color }}
                    aria-hidden="true"
                  />
                  {grado.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
