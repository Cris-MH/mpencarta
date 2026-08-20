import Link from "next/link";
import { getAllGrados } from "@/lib/content";

const CATEGORY_INFO = [
  { area: "aritmetica", label: "Aritmética", icon: "🔢", color: "#3C79A8" },
  { area: "algebra", label: "Álgebra", icon: "𝑥", color: "#9C27B0" },
  { area: "geometria", label: "Geometría", icon: "△", color: "#D98236" },
  { area: "estadistica", label: "Estadística", icon: "📊", color: "#176B3A" },
  { area: "trigonometria", label: "Trigonometría", icon: "∠", color: "#B94A42" },
  { area: "calculo", label: "Cálculo", icon: "∫", color: "#E5B83F" },
];

const GRADES = [
  { id: "6", label: "Grado 6°" },
  { id: "7", label: "Grado 7°" },
  { id: "8", label: "Grado 8°" },
  { id: "9", label: "Grado 9°" },
  { id: "10", label: "Grado 10°" },
  { id: "11", label: "Grado 11°" },
];

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
    <div className="h-full flex flex-col">
      {/* Toolbar - Grade Navigation */}
      <div
        className="shrink-0 flex items-center gap-0.5 px-3 py-1 border-b border-[#b0a582]"
        style={{
          background: "linear-gradient(180deg, #e8e0c8 0%, #d4c9a8 100%)",
          boxShadow: "inset 0 1px rgba(255,255,255,0.5)",
        }}
      >
        <span className="text-[11px] font-semibold text-[#4a4030] mr-2 shrink-0">Grados:</span>
        {GRADES.map((grade) => (
          <Link
            key={grade.id}
            href={`/grado/${grade.id}`}
            className="text-[11px] px-2.5 py-1 rounded-sm border border-[#8b7d5e] bg-gradient-to-b from-[#f8f4e8] to-[#e8e0c8] text-[#26352B] font-medium hover:from-white hover:to-[#f0eaD4] active:from-[#d4c9a8] active:to-[#e8e0c8] transition-all duration-120"
            style={{
              boxShadow: "0 1px 1px rgba(0,0,0,0.15), inset 0 1px rgba(255,255,255,0.5)",
            }}
          >
            {grade.label}
          </Link>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto encarta-scroll p-4">
        {error ? (
          <div className="encarta-panel p-4 text-center">
            <p className="text-[var(--color-encarta-red)] font-medium text-sm" role="alert">
              ⚠ Contenido no disponible temporalmente
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Featured Topic / Welcome Panel */}
            <div className="encarta-panel mb-4">
              <div className="encarta-panel-header">
                Enciclopedia de Matemáticas — Bachillerato Colombiano
              </div>
              <div className="encarta-panel-content p-4 text-center">
                <h1 className="text-xl font-bold text-[var(--color-encarta-green-dark)] mb-1">
                  Mi Primera Encarta
                </h1>
                <p className="text-[13px] text-[#6b5d3e] mb-3">
                  Enciclopedia interactiva de matemáticas. Explora temas de grados 6° a 11°
                  con explicaciones, videos, audio y ejercicios interactivos.
                </p>
                <div className="inline-block px-3 py-1 bg-[var(--color-encarta-cream)] border border-[#c4b896] text-[11px] text-[#6b5d3e]">
                  📖 {grados.reduce((acc, g) => acc + g.temaCount, 0)} temas disponibles en 6 grados
                </div>
              </div>
            </div>

            {/* Categories Grid */}
            <div className="encarta-panel mb-4">
              <div className="encarta-panel-header">
                Áreas de Matemáticas
              </div>
              <div className="encarta-panel-content">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2">
                  {CATEGORY_INFO.map((cat) => (
                    <div
                      key={cat.area}
                      className="flex items-center gap-2 p-2.5 border border-[#c4b896] bg-gradient-to-b from-[var(--color-encarta-warm-white)] to-[#f0eaD4] rounded-sm cursor-default hover:from-white hover:border-[#8b7d5e] transition-all duration-120"
                      style={{
                        boxShadow: "0 1px 2px rgba(0,0,0,0.12), inset 0 1px rgba(255,255,255,0.6)",
                      }}
                    >
                      <span
                        className="w-8 h-8 flex items-center justify-center text-lg border border-[#c4b896] rounded-sm bg-white"
                        style={{ color: cat.color }}
                        aria-hidden="true"
                      >
                        {cat.icon}
                      </span>
                      <span className="text-[12px] font-semibold text-[var(--color-encarta-dark-text)]">
                        {cat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Grade Cards */}
            <div className="encarta-panel">
              <div className="encarta-panel-header">
                Selecciona un Grado
              </div>
              <div className="encarta-panel-content">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2">
                  {grados.map((grado) => (
                    <Link
                      key={grado.id}
                      href={`/grado/${grado.id}`}
                      className="group flex flex-col items-center gap-1 p-3 border border-[#8b7d5e] bg-gradient-to-b from-[#f8f4e8] to-[#e8e0c8] rounded-sm hover:from-white hover:to-[#f0eaD4] active:from-[#d4c9a8] active:to-[#e8e0c8] transition-all duration-120"
                      style={{
                        boxShadow: "0 1px 2px rgba(0,0,0,0.2), inset 0 1px rgba(255,255,255,0.5), inset 0 -1px rgba(0,0,0,0.1)",
                      }}
                    >
                      <span className="text-sm font-bold text-[var(--color-encarta-green-dark)] group-hover:text-[var(--color-encarta-green)]">
                        {grado.nombre}
                      </span>
                      <span className="text-[10px] text-[#6b5d3e]">
                        {grado.temaCount} {grado.temaCount === 1 ? "tema" : "temas"}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
