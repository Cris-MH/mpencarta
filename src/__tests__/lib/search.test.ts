import { describe, it, expect } from "vitest";
import { searchTopics } from "@/lib/search";

describe("searchTopics", () => {
  it("returns empty array for empty string", () => {
    expect(searchTopics("")).toEqual([]);
  });

  it("returns empty array for single character query", () => {
    expect(searchTopics("a")).toEqual([]);
  });

  it("returns empty array for whitespace-only query", () => {
    expect(searchTopics("   ")).toEqual([]);
  });

  it("returns results for valid query matching a titulo", () => {
    const results = searchTopics("Números");
    expect(results.length).toBeGreaterThan(0);
    expect(results.length).toBeLessThanOrEqual(10);
    results.forEach((r) => {
      expect(r).toHaveProperty("temaSlug");
      expect(r).toHaveProperty("temaTitulo");
      expect(r).toHaveProperty("gradoId");
      expect(r).toHaveProperty("gradoNombre");
    });
  });

  it("is case-insensitive", () => {
    const upper = searchTopics("DERIVADAS");
    const lower = searchTopics("derivadas");
    expect(upper.length).toBeGreaterThan(0);
    expect(upper).toEqual(lower);
  });

  it("returns at most 10 results", () => {
    // A broad query that could match many topics
    const results = searchTopics("matemáticas");
    expect(results.length).toBeLessThanOrEqual(10);
  });

  it("matches by keywords", () => {
    const results = searchTopics("parábola");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.temaSlug === "funciones-cuadraticas")).toBe(
      true
    );
  });

  it("matches by area", () => {
    const results = searchTopics("calculo");
    expect(results.length).toBeGreaterThan(0);
    // Should find calculus-related topics
    const slugs = results.map((r) => r.temaSlug);
    expect(
      slugs.some(
        (s) => s === "limites" || s === "derivadas" || s === "integrales"
      )
    ).toBe(true);
  });

  it("returns results with correct structure", () => {
    const results = searchTopics("trigonometría");
    expect(results.length).toBeGreaterThan(0);
    const first = results[0];
    expect(typeof first.temaSlug).toBe("string");
    expect(typeof first.temaTitulo).toBe("string");
    expect(typeof first.gradoId).toBe("string");
    expect(typeof first.gradoNombre).toBe("string");
  });

  it("performs partial matching", () => {
    const results = searchTopics("ecuac");
    expect(results.length).toBeGreaterThan(0);
    // Should find "Ecuaciones Lineales" or "Sistemas de Ecuaciones"
    const titles = results.map((r) => r.temaTitulo);
    expect(titles.some((t) => t.toLowerCase().includes("ecuac"))).toBe(true);
  });
});
