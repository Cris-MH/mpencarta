import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Tema } from "@/lib/types";
import { validateTema } from "@/lib/content";

/**
 * Creates a valid Tema object for testing purposes.
 */
function createValidTema(overrides?: Partial<Tema>): Tema {
  return {
    slug: "numeros-naturales",
    titulo: "Números Naturales",
    area: "aritmetica",
    gradoId: "6",
    contenido: {
      explicacion:
        "Los números naturales son aquellos que usamos para contar: 1, 2, 3, 4... Forman el conjunto N.",
      imagenes: [
        {
          src: "/images/temas/6/numeros-naturales.png",
          alt: "Recta numérica mostrando números naturales",
        },
      ],
      videos: [
        {
          youtubeId: "abc123",
          titulo: "Intro a Números Naturales",
          urlDirecta: "https://www.youtube.com/watch?v=abc123",
        },
      ],
      audio: {
        src: "/audio/temas/6/numeros-naturales.mp3",
        titulo: "Explicación de Números Naturales",
        duracionSegundos: 180,
      },
    },
    quiz: {
      preguntas: [
        {
          id: "q1",
          enunciado: "¿Cuál es el primer número natural?",
          opciones: [
            { id: "a", texto: "0" },
            { id: "b", texto: "1" },
            { id: "c", texto: "-1" },
            { id: "d", texto: "2" },
          ],
          respuestaCorrecta: "b",
          explicacion: "El 1 es el primer número natural.",
        },
        {
          id: "q2",
          enunciado: "¿Qué operación es cerrada en los naturales?",
          opciones: [
            { id: "a", texto: "Suma" },
            { id: "b", texto: "Resta" },
            { id: "c", texto: "División" },
            { id: "d", texto: "Raíz cuadrada" },
          ],
          respuestaCorrecta: "a",
          explicacion: "La suma siempre da un natural.",
        },
        {
          id: "q3",
          enunciado: "¿Cuántos números naturales hay?",
          opciones: [
            { id: "a", texto: "100" },
            { id: "b", texto: "1000" },
            { id: "c", texto: "Infinitos" },
            { id: "d", texto: "Un millón" },
          ],
          respuestaCorrecta: "c",
          explicacion: "Los naturales son un conjunto infinito.",
        },
      ],
    },
    keywords: ["naturales", "contar", "aritmética"],
    ...overrides,
  };
}

describe("validateTema", () => {
  it("returns no errors for a valid tema", () => {
    const tema = createValidTema();
    const errors = validateTema(tema);
    expect(errors).toEqual([]);
  });

  it("returns error when explanation is too short", () => {
    const tema = createValidTema({
      contenido: {
        ...createValidTema().contenido,
        explicacion: "Muy corto",
      },
    });
    const errors = validateTema(tema);
    expect(errors.some((e) => e.field === "contenido.explicacion")).toBe(true);
  });

  it("returns error when explanation exceeds 5000 characters", () => {
    const tema = createValidTema({
      contenido: {
        ...createValidTema().contenido,
        explicacion: "x".repeat(5001),
      },
    });
    const errors = validateTema(tema);
    expect(errors.some((e) => e.field === "contenido.explicacion")).toBe(true);
  });

  it("returns error when no images are provided", () => {
    const tema = createValidTema({
      contenido: {
        ...createValidTema().contenido,
        imagenes: [],
      },
    });
    const errors = validateTema(tema);
    expect(errors.some((e) => e.field === "contenido.imagenes")).toBe(true);
  });

  it("returns error when an image has empty alt text", () => {
    const tema = createValidTema({
      contenido: {
        ...createValidTema().contenido,
        imagenes: [{ src: "/img.png", alt: "" }],
      },
    });
    const errors = validateTema(tema);
    expect(
      errors.some((e) => e.field === "contenido.imagenes[0].alt")
    ).toBe(true);
  });

  it("returns error when no videos are provided", () => {
    const tema = createValidTema({
      contenido: {
        ...createValidTema().contenido,
        videos: [],
      },
    });
    const errors = validateTema(tema);
    expect(errors.some((e) => e.field === "contenido.videos")).toBe(true);
  });

  it("returns error when audio duration is below 30 seconds", () => {
    const tema = createValidTema({
      contenido: {
        ...createValidTema().contenido,
        audio: {
          src: "/audio.mp3",
          titulo: "Test",
          duracionSegundos: 10,
        },
      },
    });
    const errors = validateTema(tema);
    expect(
      errors.some((e) => e.field === "contenido.audio.duracionSegundos")
    ).toBe(true);
  });

  it("returns error when audio duration exceeds 900 seconds", () => {
    const tema = createValidTema({
      contenido: {
        ...createValidTema().contenido,
        audio: {
          src: "/audio.mp3",
          titulo: "Test",
          duracionSegundos: 1000,
        },
      },
    });
    const errors = validateTema(tema);
    expect(
      errors.some((e) => e.field === "contenido.audio.duracionSegundos")
    ).toBe(true);
  });

  it("returns error when quiz has fewer than 3 questions", () => {
    const tema = createValidTema({
      quiz: {
        preguntas: [
          {
            id: "q1",
            enunciado: "Test?",
            opciones: [
              { id: "a", texto: "A" },
              { id: "b", texto: "B" },
              { id: "c", texto: "C" },
              { id: "d", texto: "D" },
            ],
            respuestaCorrecta: "a",
            explicacion: "Explanation",
          },
        ],
      },
    });
    const errors = validateTema(tema);
    expect(errors.some((e) => e.field === "quiz.preguntas")).toBe(true);
  });

  it("returns error when a question does not have exactly 4 options", () => {
    const baseTema = createValidTema();
    const tema = createValidTema({
      quiz: {
        preguntas: [
          ...baseTema.quiz.preguntas.slice(0, 2),
          {
            id: "q3",
            enunciado: "Test?",
            opciones: [
              { id: "a", texto: "A" },
              { id: "b", texto: "B" },
            ],
            respuestaCorrecta: "a",
            explicacion: "Explanation",
          },
        ],
      },
    });
    const errors = validateTema(tema);
    expect(
      errors.some((e) => e.field === "quiz.preguntas[2].opciones")
    ).toBe(true);
  });

  it("returns error when respuestaCorrecta does not match any option id", () => {
    const baseTema = createValidTema();
    const tema = createValidTema({
      quiz: {
        preguntas: [
          ...baseTema.quiz.preguntas.slice(0, 2),
          {
            id: "q3",
            enunciado: "Test?",
            opciones: [
              { id: "a", texto: "A" },
              { id: "b", texto: "B" },
              { id: "c", texto: "C" },
              { id: "d", texto: "D" },
            ],
            respuestaCorrecta: "z",
            explicacion: "Explanation",
          },
        ],
      },
    });
    const errors = validateTema(tema);
    expect(
      errors.some((e) => e.field === "quiz.preguntas[2].respuestaCorrecta")
    ).toBe(true);
  });
});
