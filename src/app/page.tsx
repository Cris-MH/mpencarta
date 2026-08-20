import GradeCard from "@/components/GradeCard";
import { getAllGrados } from "@/lib/content";

const GRADE_COLORS: Record<string, string> = {
  "6": "#2196F3",
  "7": "#4CAF50",
  "8": "#FF9800",
  "9": "#9C27B0",
  "10": "#009688",
  "11": "#F44336",
};

const GRADE_EMOJIS: Record<string, string> = {
  "6": "🔢",
  "7": "➗",
  "8": "📐",
  "9": "📈",
  "10": "📊",
  "11": "∫",
};

export default function Home() {
  let grados: { id: string; nombre: string; temaCount: number }[] = [];
  let error = false;

  try {
    const data = getAllGrados();
    grados = data.map((g) => ({
      id: g.id,
      nombre: g.nombre,
      temaCount: g.temas.length,
    }));
  } catch {
    error = true;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold sm:text-5xl bg-gradient-to-r from-primary-700 via-primary-500 to-secondary bg-clip-text text-transparent">
          Mi Primera Encarta
        </h1>
        <p className="mt-3 text-lg font-medium text-primary-600">
          Matemáticas • Bachillerato Colombiano
        </p>
        <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto">
          Tu enciclopedia interactiva de matemáticas. Explora temas de grados 6° a
          11° con explicaciones, videos, audio y ejercicios interactivos.
        </p>
      </header>

      {error ? (
        <p className="text-center text-error font-medium" role="alert">
          Contenido no disponible temporalmente
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {grados.map((grado) => (
            <GradeCard
              key={grado.id}
              grado={grado}
              color={GRADE_COLORS[grado.id] || "#6A0DAD"}
              emoji={GRADE_EMOJIS[grado.id] || "📚"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
