"use client";

import { QuizQuestionProps } from "@/lib/types";

export default function QuizQuestion({
  pregunta,
  onAnswer,
  answered,
  selectedOptionId,
}: QuizQuestionProps) {
  const isCorrect = selectedOptionId === pregunta.respuestaCorrecta;

  const getOptionStyles = (opcionId: string) => {
    const base = {
      boxShadow: "0 1px 1px rgba(0,0,0,0.1), inset 0 1px rgba(255,255,255,0.4)",
    };

    if (!answered) {
      return {
        ...base,
        background: "linear-gradient(180deg, #f8f4e8 0%, #e8e0c8 100%)",
        border: "1px solid #8b7d5e",
      };
    }

    if (opcionId === pregunta.respuestaCorrecta) {
      return {
        boxShadow: "0 1px 1px rgba(0,0,0,0.1), inset 0 1px rgba(255,255,255,0.4)",
        background: "linear-gradient(180deg, #c8e6c9 0%, #a5d6a7 100%)",
        border: "1px solid #2e7d32",
      };
    }

    if (opcionId === selectedOptionId && !isCorrect) {
      return {
        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.15)",
        background: "linear-gradient(180deg, #ffcdd2 0%, #ef9a9a 100%)",
        border: "1px solid #c62828",
      };
    }

    return {
      ...base,
      background: "#e8e0c8",
      border: "1px solid #c4b896",
      opacity: 0.6,
    };
  };

  const handleClick = (opcionId: string) => {
    if (answered) return;
    onAnswer(pregunta.id, opcionId);
  };

  return (
    <div
      className="p-3 border border-[#c4b896] bg-[var(--color-encarta-warm-white)]"
      style={{ boxShadow: "inset 0 1px rgba(255,255,255,0.5)" }}
    >
      <p className="text-[13px] font-medium text-[var(--color-encarta-dark-text)] mb-2">{pregunta.enunciado}</p>

      <div className="space-y-1">
        {pregunta.opciones.map((opcion) => (
          <button
            key={opcion.id}
            onClick={() => handleClick(opcion.id)}
            disabled={answered}
            className={`w-full text-left px-3 py-1.5 text-[12px] rounded-sm transition-all duration-120 ${
              !answered ? "hover:brightness-105 cursor-pointer" : "cursor-default"
            }`}
            style={getOptionStyles(opcion.id)}
            aria-disabled={answered}
          >
            {opcion.texto}
          </button>
        ))}
      </div>

      {answered && (
        <div
          className={`mt-2 p-2 text-[11px] flex items-start gap-1.5 border ${
            isCorrect
              ? "bg-[#e8f5ec] border-[#a5d6a7] text-[#1b5e20]"
              : "bg-[#fce4ec] border-[#ef9a9a] text-[#b71c1c]"
          }`}
        >
          <span className="text-sm shrink-0" aria-hidden="true">
            {isCorrect ? "✅" : "❌"}
          </span>
          <div>
            <p className="font-semibold">
              {isCorrect ? "¡Correcto!" : "Incorrecto"}
            </p>
            <p className="mt-0.5">{pregunta.explicacion}</p>
          </div>
        </div>
      )}
    </div>
  );
}
