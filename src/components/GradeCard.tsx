import Link from "next/link";
import type { GradeCardProps } from "@/lib/types";

interface ExtendedGradeCardProps extends GradeCardProps {
  color?: string;
  emoji?: string;
}

export default function GradeCard({ grado, color = "#176B3A", emoji = "📚" }: ExtendedGradeCardProps) {
  return (
    <Link
      href={`/grado/${grado.id}`}
      className="group flex items-center gap-2 p-2.5 border border-[#8b7d5e] bg-gradient-to-b from-[#f8f4e8] to-[#e8e0c8] rounded-sm hover:from-white hover:to-[#f0eaD4] active:from-[#d4c9a8] active:to-[#e8e0c8] transition-all duration-120 min-h-[36px]"
      style={{
        boxShadow: "0 1px 2px rgba(0,0,0,0.2), inset 0 1px rgba(255,255,255,0.5), inset 0 -1px rgba(0,0,0,0.1)",
      }}
    >
      <span
        className="w-7 h-7 flex items-center justify-center text-sm border border-[#c4b896] rounded-sm bg-white shrink-0"
        style={{ color }}
        aria-hidden="true"
      >
        {emoji}
      </span>
      <div className="flex flex-col">
        <span className="text-[12px] font-bold text-[var(--color-encarta-dark-text)] group-hover:text-[var(--color-encarta-green)]">
          {grado.nombre}
        </span>
        <span className="text-[10px] text-[#6b5d3e]">
          {grado.temaCount} {grado.temaCount === 1 ? "tema" : "temas"}
        </span>
      </div>
    </Link>
  );
}
