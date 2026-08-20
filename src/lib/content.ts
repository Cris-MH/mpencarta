import fs from "fs";
import path from "path";
import type { Grado, Tema } from "./types";

/** Base path for the data directory (resolved at build time) */
const DATA_DIR = path.join(process.cwd(), "src", "data");

/** Metadata shape stored in grados.json */
interface GradoMeta {
  id: string;
  nombre: string;
  temas: string[]; // Topic slugs for this grade
}

// ---------------------------------------------------------------------------
// Content loading functions
// ---------------------------------------------------------------------------

/**
 * Returns all grados with their associated temas loaded from JSON files.
 * Reads grados.json for metadata, then loads each grado's topics from
 * src/data/temas/{gradoId}/*.json
 */
export function getAllGrados(): Grado[] {
  const gradosPath = path.join(DATA_DIR, "grados.json");

  if (!fs.existsSync(gradosPath)) {
    return [];
  }

  const raw = fs.readFileSync(gradosPath, "utf-8");
  const gradosMeta: GradoMeta[] = JSON.parse(raw);

  return gradosMeta.map((meta) => {
    const temas = loadTemasForGrado(meta.id);
    return { id: meta.id, nombre: meta.nombre, temas };
  });
}

/**
 * Returns a single grado by its id, with temas loaded.
 * Returns null if the grado is not found in grados.json.
 */
export function getGrado(gradoId: string): Grado | null {
  const gradosPath = path.join(DATA_DIR, "grados.json");

  if (!fs.existsSync(gradosPath)) {
    return null;
  }

  const raw = fs.readFileSync(gradosPath, "utf-8");
  const gradosMeta: GradoMeta[] = JSON.parse(raw);
  const meta = gradosMeta.find((g) => g.id === gradoId);

  if (!meta) {
    return null;
  }

  const temas = loadTemasForGrado(meta.id);
  return { id: meta.id, nombre: meta.nombre, temas };
}

/**
 * Returns a single tema by gradoId and slug.
 * Returns null if the file does not exist.
 */
export function getTema(gradoId: string, temaSlug: string): Tema | null {
  const temaPath = path.join(DATA_DIR, "temas", gradoId, `${temaSlug}.json`);

  if (!fs.existsSync(temaPath)) {
    return null;
  }

  const raw = fs.readFileSync(temaPath, "utf-8");
  return JSON.parse(raw) as Tema;
}

/**
 * Returns all temas across all grados as a flat array.
 */
export function getAllTemas(): Tema[] {
  const grados = getAllGrados();
  return grados.flatMap((g) => g.temas);
}

// ---------------------------------------------------------------------------
// Content validation
// ---------------------------------------------------------------------------

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/**
 * Validates a Tema object against content requirements:
 * - Explanation length: 50-5000 characters
 * - At least 1 image with non-empty alt text
 * - At least 1 video
 * - Audio duration: 30-900 seconds
 * - Quiz: at least 3 questions, each with exactly 4 options and a valid correct answer
 *
 * Returns an array of ValidationError objects. An empty array means the tema is valid.
 */
export function validateTema(tema: Tema): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate explanation length (50-5000 chars)
  if (!tema.contenido?.explicacion) {
    errors.push({
      field: "contenido.explicacion",
      message: "La explicación es requerida.",
    });
  } else {
    const len = tema.contenido.explicacion.length;
    if (len < 50) {
      errors.push({
        field: "contenido.explicacion",
        message: `La explicación debe tener al menos 50 caracteres (tiene ${len}).`,
      });
    }
    if (len > 5000) {
      errors.push({
        field: "contenido.explicacion",
        message: `La explicación no debe exceder 5000 caracteres (tiene ${len}).`,
      });
    }
  }

  // Validate at least 1 image with non-empty alt
  if (!tema.contenido?.imagenes || tema.contenido.imagenes.length === 0) {
    errors.push({
      field: "contenido.imagenes",
      message: "Se requiere al menos 1 imagen.",
    });
  } else {
    tema.contenido.imagenes.forEach((img, index) => {
      if (!img.alt || img.alt.trim() === "") {
        errors.push({
          field: `contenido.imagenes[${index}].alt`,
          message: `La imagen ${index + 1} debe tener texto alternativo (alt) no vacío.`,
        });
      }
    });
  }

  // Validate at least 1 video
  if (!tema.contenido?.videos || tema.contenido.videos.length === 0) {
    errors.push({
      field: "contenido.videos",
      message: "Se requiere al menos 1 video.",
    });
  }

  // Validate audio duration (30-900 seconds)
  if (!tema.contenido?.audio) {
    errors.push({
      field: "contenido.audio",
      message: "Se requiere un clip de audio.",
    });
  } else {
    const duracion = tema.contenido.audio.duracionSegundos;
    if (duracion < 30 || duracion > 900) {
      errors.push({
        field: "contenido.audio.duracionSegundos",
        message: `La duración del audio debe estar entre 30 y 900 segundos (tiene ${duracion}s).`,
      });
    }
  }

  // Validate quiz: at least 3 questions, each with exactly 4 options
  if (!tema.quiz?.preguntas || tema.quiz.preguntas.length < 3) {
    const count = tema.quiz?.preguntas?.length ?? 0;
    errors.push({
      field: "quiz.preguntas",
      message: `El quiz debe tener al menos 3 preguntas (tiene ${count}).`,
    });
  } else {
    tema.quiz.preguntas.forEach((pregunta, index) => {
      if (!pregunta.opciones || pregunta.opciones.length !== 4) {
        const optCount = pregunta.opciones?.length ?? 0;
        errors.push({
          field: `quiz.preguntas[${index}].opciones`,
          message: `La pregunta ${index + 1} debe tener exactamente 4 opciones (tiene ${optCount}).`,
        });
      }
      // Validate that respuestaCorrecta matches an existing option id
      if (pregunta.opciones && pregunta.opciones.length > 0) {
        const optionIds = pregunta.opciones.map((o) => o.id);
        if (!optionIds.includes(pregunta.respuestaCorrecta)) {
          errors.push({
            field: `quiz.preguntas[${index}].respuestaCorrecta`,
            message: `La respuesta correcta "${pregunta.respuestaCorrecta}" no corresponde a ninguna opción de la pregunta ${index + 1}.`,
          });
        }
      }
    });
  }

  return errors;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Loads all tema JSON files for a given grado from src/data/temas/{gradoId}/
 */
function loadTemasForGrado(gradoId: string): Tema[] {
  const temasDir = path.join(DATA_DIR, "temas", gradoId);

  if (!fs.existsSync(temasDir)) {
    return [];
  }

  const files = fs.readdirSync(temasDir).filter((f) => f.endsWith(".json"));

  return files.map((file) => {
    const filePath = path.join(temasDir, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as Tema;
  });
}
