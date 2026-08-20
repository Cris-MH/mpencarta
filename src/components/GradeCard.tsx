import Link from "next/link";
import type { GradeCardProps } from "@/lib/types";

interface ExtendedGradeCardProps extends GradeCardProps {
  color?: string;
  emoji?: string;
}

export default function GradeCard({ grado, color = "#6A0DAD", emoji = "📚" }: ExtendedGradeCardProps) {
  return (
    <Link
      href={`/grado/${grado.id}`}
      className="group block min-h-[44px] min-w-[44px] rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500 border-l-4"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl" aria-hidden="true">{emoji}</span>
        <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
          {grado.nombre}
        </h2>
      </div>
      <p className="text-sm text-gray-600">
        {grado.temaCount} {grado.temaCount === 1 ? "tema disponible" : "temas disponibles"}
      </p>
      <div
        className="mt-3 h-1 w-12 rounded-full opacity-60 group-hover:w-full transition-all duration-300"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
    </Link>
  );
}
