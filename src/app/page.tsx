import GradeCard from "@/components/GradeCard";
import { getAllGrados } from "@/lib/content";

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
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Enciclopedia de Matemáticas
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Explora temas de matemáticas del bachillerato colombiano. Grados 6° a
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
            <GradeCard key={grado.id} grado={grado} />
          ))}
        </div>
      )}
    </div>
  );
}
