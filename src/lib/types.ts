// === Content Data Types ===

export interface Grado {
  id: string; // "6" | "7" | "8" | "9" | "10" | "11"
  nombre: string; // "Grado 6°"
  temas: Tema[];
}

export interface Tema {
  slug: string; // URL-friendly identifier
  titulo: string; // Nombre del tema
  area: Area; // Área matemática
  gradoId: string; // Referencia al grado
  contenido: ContenidoTema;
  quiz: Quiz;
  keywords: string[]; // Para búsqueda
}

export type Area =
  | "aritmetica"
  | "algebra"
  | "geometria"
  | "estadistica"
  | "trigonometria"
  | "calculo";

export interface ContenidoTema {
  explicacion: string; // 50-5000 caracteres, puede contener delimitadores KaTeX
  imagenes: Imagen[]; // Al menos 1
  videos: Video[]; // Al menos 1
  audio: AudioClip; // Exactamente 1
}

export interface Imagen {
  src: string; // Ruta relativa al directorio public
  alt: string; // Texto alternativo descriptivo (no vacío)
  caption?: string;
}

export interface Video {
  youtubeId: string; // ID del video de YouTube
  titulo: string;
  urlDirecta: string; // https://youtube.com/watch?v=...
}

export interface AudioClip {
  src: string; // Ruta al archivo de audio
  titulo: string;
  duracionSegundos: number; // 30-900 (30s a 15min)
}

// === Quiz Types ===

export interface Quiz {
  preguntas: Pregunta[]; // Mínimo 3
}

export interface Pregunta {
  id: string;
  enunciado: string;
  opciones: Opcion[]; // Exactamente 4
  respuestaCorrecta: string; // ID de la opción correcta
  explicacion: string; // Máx 150 caracteres
}

export interface Opcion {
  id: string;
  texto: string;
}

// === Search Types ===

export interface SearchResult {
  temaSlug: string;
  temaTitulo: string;
  gradoId: string;
  gradoNombre: string;
}

export interface SearchIndex {
  items: SearchIndexItem[];
}

export interface SearchIndexItem {
  slug: string;
  titulo: string;
  gradoId: string;
  gradoNombre: string;
  keywords: string[];
  area: Area;
}

// === Component Props ===

export interface GradeCardProps {
  grado: { id: string; nombre: string; temaCount: number };
}

export interface TopicListProps {
  temas: Tema[];
  gradoId: string;
}

export interface FormulaRendererProps {
  content: string; // Text with KaTeX delimiters ($...$ inline, $$...$$ block)
}

export interface VideoPlayerProps {
  video: Video;
}

export interface AudioPlayerProps {
  audio: AudioClip;
}

export interface QuizSectionProps {
  quiz: Quiz;
}

export interface QuizQuestionProps {
  pregunta: Pregunta;
  onAnswer: (preguntaId: string, opcionId: string) => void;
  answered: boolean;
  selectedOptionId?: string;
}
