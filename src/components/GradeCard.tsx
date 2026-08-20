import Link from "next/link";
import type { GradeCardProps } from "@/lib/types";

export default function GradeCard({ grado }: GradeCardProps) {
  return (
    <Link
      href={`/grado/${grado.id}`}
      className="block min-h-[44px] min-w-[44px] rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
    >
      <h2 className="text-xl font-semibold text-gray-900">{grado.nombre}</h2>
      <p className="mt-2 text-sm text-gray-600">
        {grado.temaCount} {grado.temaCount === 1 ? "tema disponible" : "temas disponibles"}
      </p>
    </Link>
  );
}
