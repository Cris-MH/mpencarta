import Link from "next/link";
import { notFound } from "next/navigation";
import { getGrado } from "@/lib/content";
import TopicList from "@/components/TopicList";

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

export function generateStaticParams() {
  return [
    { gradoId: "6" },
    { gradoId: "7" },
    { gradoId: "8" },
    { gradoId: "9" },
    { gradoId: "10" },
    { gradoId: "11" },
  ];
}

interface GradePageProps {
  params: Promise<{ gradoId: string }>;
}

export default async function GradePage({ params }: GradePageProps) {
  const { gradoId } = await params;
  const grado = getGrado(gradoId);

  if (!grado) {
    notFound();
  }

  const color = GRADE_COLORS[gradoId] || "#6A0DAD";
  const emoji = GRADE_EMOJIS[gradoId] || "📚";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-800 hover:underline mb-6 font-medium min-h-[44px]"
      >
        ← Volver a grados
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <span className="text-4xl" aria-hidden="true">{emoji}</span>
        <h1
          className="text-3xl font-bold"
          style={{ color }}
        >
          {grado.nombre}
        </h1>
      </div>

      {grado.temas.length === 0 ? (
        <p className="text-gray-600">
          No hay temas disponibles para este grado
        </p>
      ) : (
        <TopicList temas={grado.temas} gradoId={gradoId} />
      )}
    </div>
  );
}
