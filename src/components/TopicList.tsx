import Link from "next/link";
import type { TopicListProps, Area } from "@/lib/types";

const AREA_LABELS: Record<Area, string> = {
  aritmetica: "Aritmética",
  algebra: "Álgebra",
  geometria: "Geometría",
  estadistica: "Estadística",
  trigonometria: "Trigonometría",
  calculo: "Cálculo",
};

const AREA_EMOJIS: Record<Area, string> = {
  aritmetica: "🔢",
  algebra: "🧮",
  geometria: "📐",
  estadistica: "📊",
  trigonometria: "📈",
  calculo: "∫",
};

const AREA_COLORS: Record<Area, string> = {
  aritmetica: "#2196F3",
  algebra: "#9C27B0",
  geometria: "#FF9800",
  estadistica: "#009688",
  trigonometria: "#F44336",
  calculo: "#4CAF50",
};

const AREA_ORDER: Area[] = [
  "aritmetica",
  "algebra",
  "geometria",
  "estadistica",
  "trigonometria",
  "calculo",
];

export default function TopicList({ temas, gradoId }: TopicListProps) {
  const grouped = AREA_ORDER.reduce<Partial<Record<Area, typeof temas>>>(
    (acc, area) => {
      const areaTemas = temas.filter((t) => t.area === area);
      if (areaTemas.length > 0) {
        acc[area] = areaTemas;
      }
      return acc;
    },
    {}
  );

  const nonEmptyAreas = AREA_ORDER.filter((area) => grouped[area]);

  if (nonEmptyAreas.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {nonEmptyAreas.map((area) => (
        <section key={area} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span aria-hidden="true">{AREA_EMOJIS[area]}</span>
            <span style={{ color: AREA_COLORS[area] }}>{AREA_LABELS[area]}</span>
          </h2>
          <ul className="space-y-2 pl-2">
            {grouped[area]!.map((tema) => (
              <li key={tema.slug}>
                <Link
                  href={`/grado/${gradoId}/${tema.slug}`}
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 hover:underline font-medium transition-colors min-h-[44px]"
                >
                  <span className="text-secondary" aria-hidden="true">▸</span>
                  {tema.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
