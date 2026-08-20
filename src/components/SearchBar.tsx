"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { searchTopics } from "@/lib/search";
import type { SearchResult } from "@/lib/types";

const GRADE_COLORS: Record<string, string> = {
  "6": "#2196F3",
  "7": "#4CAF50",
  "8": "#FF9800",
  "9": "#9C27B0",
  "10": "#009688",
  "11": "#F44336",
};

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
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => {
          if (query.trim().length >= 2) {
            setIsOpen(true);
          }
        }}
        placeholder="🔍 Buscar temas..."
        aria-label="Buscar temas"
        className="w-full h-10 bg-primary-800/50 rounded-full border border-primary-400/30 px-4 text-white placeholder-primary-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
      />

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 z-50 max-h-80 overflow-y-auto">
          {error && (
            <div className="p-4 text-center">
              <p className="text-red-600 text-sm mb-2">
                Búsqueda no disponible temporalmente
              </p>
              <button
                onClick={handleRetry}
                className="text-sm text-primary-700 hover:text-primary-900 font-medium underline min-h-[44px] min-w-[44px] px-3 py-2"
              >
                Reintentar
              </button>
            </div>
          )}

          {!error && hasSearched && results.length === 0 && (
            <div className="p-4 text-center">
              <p className="text-gray-500 text-sm">
                No se encontraron temas relacionados
              </p>
            </div>
          )}

          {!error && results.length > 0 && (
            <ul role="listbox" aria-label="Resultados de búsqueda">
              {results.map((result) => (
                <li key={`${result.gradoId}-${result.temaSlug}`} role="option">
                  <button
                    onClick={() => handleResultClick(result)}
                    className="w-full text-left px-4 py-3 hover:bg-primary-50 transition-colors border-b border-gray-50 last:border-b-0 min-h-[44px] flex items-center gap-3"
                  >
                    <span
                      className="w-2 h-8 rounded-full shrink-0"
                      style={{ backgroundColor: GRADE_COLORS[result.gradoId] || "#6A0DAD" }}
                      aria-hidden="true"
                    />
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        {result.temaTitulo}
                      </span>
                      <span className="text-xs text-gray-500">
                        {result.gradoNombre}
                      </span>
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
