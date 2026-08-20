"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { searchTopics } from "@/lib/search";
import type { SearchResult } from "@/lib/types";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    setError(false);

    if (value.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      setHasSearched(false);
      return;
    }

    try {
      const searchResults = searchTopics(value);
      setResults(searchResults);
      setHasSearched(true);
      setIsOpen(true);
    } catch {
      setError(true);
      setResults([]);
      setIsOpen(true);
      setHasSearched(false);
    }
  }, []);

  const handleRetry = () => {
    handleSearch(query);
  };

  const handleResultClick = (result: SearchResult) => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
    setHasSearched(false);
    router.push(`/grado/${result.gradoId}/${result.temaSlug}`);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex items-center gap-1">
        <span className="text-[10px] text-white/70 shrink-0 hidden sm:inline">Buscar:</span>
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => {
            if (query.trim().length >= 2) {
              setIsOpen(true);
            }
          }}
          placeholder="Buscar temas..."
          aria-label="Buscar temas"
          className="w-full h-6 bg-[var(--color-encarta-warm-white)] border border-[#5a5a5a] rounded-sm px-2 text-[12px] text-[var(--color-encarta-dark-text)] placeholder-[#8b7d5e] focus:outline-none focus:border-[var(--color-encarta-green)] transition-colors duration-120"
          style={{ boxShadow: "inset 0 1px 2px rgba(0,0,0,0.15)" }}
        />
      </div>

      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-1 bg-[var(--color-encarta-warm-white)] border border-[#8b7d5e] z-50 max-h-60 overflow-y-auto encarta-scroll"
          style={{ boxShadow: "0 3px 6px rgba(0,0,0,0.3)" }}
        >
          {error && (
            <div className="p-3 text-center">
              <p className="text-[var(--color-encarta-red)] text-[11px] mb-1">
                ⚠ Búsqueda no disponible
              </p>
              <button
                onClick={handleRetry}
                className="text-[11px] text-[var(--color-encarta-green)] hover:underline font-medium px-2 py-1"
              >
                Reintentar
              </button>
            </div>
          )}

          {!error && hasSearched && results.length === 0 && (
            <div className="p-3 text-center">
              <p className="text-[#6b5d3e] text-[11px]">
                No se encontraron temas
              </p>
            </div>
          )}

          {!error && results.length > 0 && (
            <ul role="listbox" aria-label="Resultados de búsqueda">
              {results.map((result) => (
                <li key={`${result.gradoId}-${result.temaSlug}`} role="option">
                  <button
                    onClick={() => handleResultClick(result)}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#e8e0c8] transition-colors duration-100 border-b border-[#e8e0c8] last:border-b-0 flex items-center gap-2"
                  >
                    <span className="text-[11px] text-[#6b5d3e] shrink-0">▸</span>
                    <span className="text-[12px] font-medium text-[var(--color-encarta-dark-text)] truncate">
                      {result.temaTitulo}
                    </span>
                    <span className="text-[10px] text-[#8b7d5e] shrink-0 ml-auto">
                      {result.gradoNombre}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
