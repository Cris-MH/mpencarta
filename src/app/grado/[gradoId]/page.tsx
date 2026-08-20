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
    <div className="h-full flex flex-col">
      {/* Grade Header Bar */}
      <div
        className="shrink-0 flex items-center gap-2 px-3 py-1.5 border-b border-[#b0a582]"
        style={{
          background: "linear-gradient(180deg, #e8e0c8 0%, #d4c9a8 100%)",
          boxShadow: "inset 0 1px rgba(255,255,255,0.5)",
        }}
      >
        <Link
          href="/"
          className="text-[11px] px-2 py-0.5 rounded-sm border border-[#8b7d5e] bg-gradient-to-b from-[#f8f4e8] to-[#e8e0c8] text-[#26352B] font-medium hover:from-white hover:to-[#f0eaD4] active:from-[#d4c9a8] active:to-[#e8e0c8] transition-all duration-120 inline-flex items-center gap-1"
          style={{
            boxShadow: "0 1px 1px rgba(0,0,0,0.15), inset 0 1px rgba(255,255,255,0.5)",
          }}
        >
          ← Inicio
        </Link>
        <div className="w-px h-4 bg-[#b0a582]" />
        <span className="text-[12px] font-bold text-[var(--color-encarta-green-dark)]">
          {grado.nombre}
        </span>
        <span className="text-[10px] text-[#6b5d3e] ml-auto">
          {grado.temas.length} {grado.temas.length === 1 ? "tema" : "temas"}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto encarta-scroll p-4">
        <div className="max-w-3xl mx-auto">
          {grado.temas.length === 0 ? (
            <div className="encarta-panel p-4 text-center">
              <p className="text-[12px] text-[#6b5d3e]">
                No hay temas disponibles para este grado
              </p>
            </div>
          ) : (
            <TopicList temas={grado.temas} gradoId={gradoId} />
          )}
        </div>
      </div>
    </div>
  );
}
