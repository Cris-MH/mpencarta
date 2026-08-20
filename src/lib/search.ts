import Fuse from "fuse.js";
import type { SearchResult, SearchIndexItem } from "./types";
import searchIndexData from "../data/search-index.json";

const searchIndex: SearchIndexItem[] = searchIndexData.items as SearchIndexItem[];

const fuse = new Fuse(searchIndex, {
  keys: [
    { name: "titulo", weight: 2 },
    { name: "keywords", weight: 1.5 },
    { name: "area", weight: 0.5 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
});

/**
 * Searches topics by query using fuzzy matching.
 * Returns max 10 results with topic slug, title, grade ID and grade name.
 * Returns empty array for queries with less than 2 characters.
 */
export function searchTopics(query: string): SearchResult[] {
  const trimmed = query.trim();
  if (trimmed.length < 2) {
    return [];
  }

  const results = fuse.search(trimmed, { limit: 10 });

  return results.map((result) => ({
    temaSlug: result.item.slug,
    temaTitulo: result.item.titulo,
    gradoId: result.item.gradoId,
    gradoNombre: result.item.gradoNombre,
  }));
}
