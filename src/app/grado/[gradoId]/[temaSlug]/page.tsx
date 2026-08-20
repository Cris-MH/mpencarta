import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTemas, getGrado, getTema } from "@/lib/content";
import FormulaRenderer from "@/components/FormulaRenderer";
import ImageGallery from "@/components/ImageGallery";
import VideoPlayer from "@/components/VideoPlayer";
import AudioPlayer from "@/components/AudioPlayer";
import QuizSection from "@/components/QuizSection";

export function generateStaticParams() {
  const temas = getAllTemas();
  return temas.map((tema) => ({
    gradoId: tema.gradoId,
    temaSlug: tema.slug,
  }));
}

interface TopicPageProps {
  params: Promise<{ gradoId: string; temaSlug: string }>;
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { gradoId, temaSlug } = await params;
  const tema = getTema(gradoId, temaSlug);

  if (!tema) {
    notFound();
  }

  const grado = getGrado(gradoId);
  const gradoNombre = grado?.nombre ?? `Grado ${gradoId}°`;

  // Get adjacent topics for navigation
  const allTemas = grado?.temas ?? [];
  const currentIndex = allTemas.findIndex((t) => t.slug === temaSlug);
  const prevTema = currentIndex > 0 ? allTemas[currentIndex - 1] : null;
  const nextTema = currentIndex < allTemas.length - 1 ? allTemas[currentIndex + 1] : null;

  return (
    <div className="h-full flex flex-col">
      {/* Topic Header Bar */}
      <div
        className="shrink-0 flex items-center gap-2 px-3 py-1.5 border-b border-[#b0a582]"
        style={{
          background: "linear-gradient(180deg, #e8e0c8 0%, #d4c9a8 100%)",
          boxShadow: "inset 0 1px rgba(255,255,255,0.5)",
        }}
      >
        <Link
          href={`/grado/${gradoId}`}
          className="text-[11px] px-2 py-0.5 rounded-sm border border-[#8b7d5e] bg-gradient-to-b from-[#f8f4e8] to-[#e8e0c8] text-[#26352B] font-medium hover:from-white hover:to-[#f0eaD4] active:from-[#d4c9a8] active:to-[#e8e0c8] transition-all duration-120 inline-flex items-center gap-1"
          style={{
            boxShadow: "0 1px 1px rgba(0,0,0,0.15), inset 0 1px rgba(255,255,255,0.5)",
          }}
        >
          ← {gradoNombre}
        </Link>
        <div className="w-px h-4 bg-[#b0a582]" />
        <span className="text-[12px] font-bold text-[var(--color-encarta-green-dark)] truncate">
          {tema.titulo}
        </span>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto encarta-scroll">
        <div className="max-w-3xl mx-auto p-4 space-y-3">
          {/* Article Title Panel */}
          <div className="encarta-panel">
            <div className="encarta-panel-header">
              {tema.titulo}
            </div>
            <div className="encarta-panel-content p-3">
              <span className="text-[10px] uppercase tracking-wider text-[#6b5d3e] font-semibold">
                {gradoNombre} • {tema.area === "aritmetica" ? "Aritmética" : tema.area === "algebra" ? "Álgebra" : tema.area === "geometria" ? "Geometría" : tema.area === "estadistica" ? "Estadística" : tema.area === "trigonometria" ? "Trigonometría" : "Cálculo"}
              </span>
            </div>
          </div>

          {/* Explanation */}
          <div className="encarta-panel">
            <div className="encarta-panel-header flex items-center gap-1.5">
              <span aria-hidden="true">📖</span>
              <span>Explicación</span>
            </div>
            <div className="encarta-panel-content p-4">
              <div className="text-[14px] leading-relaxed text-[var(--color-encarta-dark-text)]">
                <FormulaRenderer content={tema.contenido.explicacion} />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="encarta-panel">
            <div className="encarta-panel-header flex items-center gap-1.5">
              <span aria-hidden="true">🖼️</span>
              <span>Imágenes</span>
            </div>
            <div className="encarta-panel-content p-3">
              <ImageGallery imagenes={tema.contenido.imagenes} />
            </div>
          </div>

          {/* Videos */}
          <div className="encarta-panel">
            <div className="encarta-panel-header flex items-center gap-1.5">
              <span aria-hidden="true">🎬</span>
              <span>Videos</span>
            </div>
            <div className="encarta-panel-content p-3 space-y-3">
              {tema.contenido.videos.map((video, index) => (
                <VideoPlayer key={index} video={video} />
              ))}
            </div>
          </div>

          {/* Audio */}
          <div className="encarta-panel">
            <div className="encarta-panel-header flex items-center gap-1.5">
              <span aria-hidden="true">🎧</span>
              <span>Audio</span>
            </div>
            <div className="encarta-panel-content p-3">
              <AudioPlayer audio={tema.contenido.audio} />
            </div>
          </div>

          {/* Quiz */}
          <div className="encarta-panel">
            <div className="encarta-panel-header flex items-center gap-1.5">
              <span aria-hidden="true">✅</span>
              <span>Evaluación</span>
            </div>
            <div className="encarta-panel-content p-3">
              <QuizSection quiz={tema.quiz} />
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="flex items-center justify-between pt-2 pb-4">
            {prevTema ? (
              <Link
                href={`/grado/${gradoId}/${prevTema.slug}`}
                className="text-[11px] px-3 py-1 rounded-sm border border-[#8b7d5e] bg-gradient-to-b from-[#f8f4e8] to-[#e8e0c8] text-[#26352B] font-medium hover:from-white hover:to-[#f0eaD4] active:from-[#d4c9a8] active:to-[#e8e0c8] transition-all duration-120"
                style={{
                  boxShadow: "0 1px 1px rgba(0,0,0,0.15), inset 0 1px rgba(255,255,255,0.5)",
                }}
              >
                ← Anterior
              </Link>
            ) : (
              <span />
            )}
            {nextTema ? (
              <Link
                href={`/grado/${gradoId}/${nextTema.slug}`}
                className="text-[11px] px-3 py-1 rounded-sm border border-[#8b7d5e] bg-gradient-to-b from-[#f8f4e8] to-[#e8e0c8] text-[#26352B] font-medium hover:from-white hover:to-[#f0eaD4] active:from-[#d4c9a8] active:to-[#e8e0c8] transition-all duration-120"
                style={{
                  boxShadow: "0 1px 1px rgba(0,0,0,0.15), inset 0 1px rgba(255,255,255,0.5)",
                }}
              >
                Siguiente →
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
