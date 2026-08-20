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
        className="text-blue-600 hover:text-blue-800 hover:underline mb-6 inline-block min-h-[44px] flex items-center"
      >
        ← Volver a {gradoNombre}
      </Link>

      {/* Topic title */}
      <h1 className="text-3xl font-bold mb-8">{tema.titulo}</h1>

      {/* Explanation text with formulas */}
      <section className="mb-8" aria-label="Explicación">
        <div className="prose prose-base max-w-none">
          <FormulaRenderer content={tema.contenido.explicacion} />
        </div>
      </section>

      {/* Image gallery */}
      <section className="mb-8" aria-label="Imágenes">
        <h2 className="text-xl font-semibold mb-4">Imágenes</h2>
        <ImageGallery imagenes={tema.contenido.imagenes} />
      </section>

      {/* Video players */}
      <section className="mb-8" aria-label="Videos">
        <h2 className="text-xl font-semibold mb-4">Videos</h2>
        <div className="space-y-6">
          {tema.contenido.videos.map((video, index) => (
            <div key={index} className="border rounded-lg p-4">
              <VideoPlayer video={video} />
              <a
                href={video.urlDirecta}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm mt-2 inline-block"
              >
                Ver en YouTube: {video.titulo}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Audio player */}
      <section className="mb-8" aria-label="Audio">
        <h2 className="text-xl font-semibold mb-4">Audio</h2>
        <AudioPlayer audio={tema.contenido.audio} />
      </section>

      {/* Quiz section */}
      <section className="mb-8" aria-label="Quiz">
        <QuizSection quiz={tema.quiz} />
      </section>
    </div>
  );
}
