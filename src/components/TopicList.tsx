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

const AREA_ICONS: Record<Area, string> = {
  aritmetica: "🔢",
  algebra: "𝑥",
  geometria: "△",
  estadistica: "📊",
  trigonometria: "∠",
  calculo: "∫",
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
    <div className="space-y-3">
      {nonEmptyAreas.map((area) => (
        <div key={area} className="encarta-panel">
          <div className="encarta-panel-header flex items-center gap-1.5">
            <span aria-hidden="true">{AREA_ICONS[area]}</span>
            <span>{AREA_LABELS[area]}</span>
            <span className="ml-auto text-[10px] opacity-70">
              {grouped[area]!.length} {grouped[area]!.length === 1 ? "tema" : "temas"}
            </span>
          </div>
          <div className="encarta-panel-content py-1">
            <ul>
              {grouped[area]!.map((tema) => (
                <li key={tema.slug}>
                  <Link
                    href={`/grado/${gradoId}/${tema.slug}`}
                    className="flex items-center gap-2 px-2 py-1.5 text-[13px] text-[var(--color-encarta-dark-text)] hover:bg-[#e8e0c8] transition-colors duration-100 border-b border-[#f0eaD4] last:border-b-0"
                  >
                    <span className="text-[var(--color-encarta-green)] text-[10px]" aria-hidden="true">▸</span>
                    <span className="font-medium">{tema.titulo}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
