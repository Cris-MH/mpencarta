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
      {/* Hamburger button - min 44x44px touch target */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
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
          className="absolute left-0 right-0 top-full z-50 bg-white border-t border-gray-200 shadow-lg"
          aria-label="Navegación móvil"
        >
          <ul className="flex flex-col py-2">
            <li>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 min-h-[44px] flex items-center text-gray-700 hover:bg-primary-50 hover:text-primary-700 font-medium"
              >
                Inicio
              </Link>
            </li>
            {grades.map((grado) => (
              <li key={grado.id}>
                <Link
                  href={`/grado/${grado.id}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 min-h-[44px] flex items-center text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                >
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
