import Link from "next/link";
import { notFound } from "next/navigation";
import { getGrado } from "@/lib/content";
import TopicList from "@/components/TopicList";

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

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-blue-600 hover:text-blue-800 hover:underline mb-6 inline-block"
      >
        ← Volver a grados
      </Link>

      <h1 className="text-3xl font-bold mb-8">{grado.nombre}</h1>

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
