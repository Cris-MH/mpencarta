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
        <section key={area}>
          <h2 className="text-xl font-semibold mb-3">{AREA_LABELS[area]}</h2>
          <ul className="space-y-2">
            {grouped[area]!.map((tema) => (
              <li key={tema.slug}>
                <Link
                  href={`/grado/${gradoId}/${tema.slug}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
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
