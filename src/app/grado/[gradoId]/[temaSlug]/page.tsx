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

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-base">
      {/* Back link */}
      <Link
        href={`/grado/${gradoId}`}
        className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-800 hover:underline mb-6 font-medium min-h-[44px]"
      >
        ← Volver a {gradoNombre}
      </Link>

      {/* Topic title */}
      <h1 className="text-3xl font-bold mb-8 text-primary-800">{tema.titulo}</h1>

      {/* Explanation text with formulas */}
      <section className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100" aria-label="Explicación">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary-700">
          <span aria-hidden="true">📖</span> Explicación
        </h2>
        <div className="prose prose-base max-w-none font-serif">
          <FormulaRenderer content={tema.contenido.explicacion} />
        </div>
      </section>

      {/* Image gallery */}
      <section className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100" aria-label="Imágenes">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary-700">
          <span aria-hidden="true">🖼️</span> Imágenes
        </h2>
        <ImageGallery imagenes={tema.contenido.imagenes} />
      </section>

      {/* Video players */}
      <section className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100" aria-label="Videos">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary-700">
          <span aria-hidden="true">🎬</span> Videos
        </h2>
        <div className="space-y-6">
          {tema.contenido.videos.map((video, index) => (
            <div key={index} className="border border-gray-100 rounded-xl p-4 shadow-sm">
              <VideoPlayer video={video} />
              <a
                href={video.urlDirecta}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-dark hover:text-secondary hover:underline text-sm mt-2 inline-flex items-center gap-1 font-medium"
              >
                Ver en YouTube ↗
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Audio player */}
      <section className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100" aria-label="Audio">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary-700">
          <span aria-hidden="true">🎧</span> Audio
        </h2>
        <AudioPlayer audio={tema.contenido.audio} />
      </section>

      {/* Quiz section */}
      <section className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100" aria-label="Quiz">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary-700">
          <span aria-hidden="true">✅</span> Quiz
        </h2>
        <QuizSection quiz={tema.quiz} />
      </section>
    </div>
  );
}
