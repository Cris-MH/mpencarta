"use client";

import { QuizQuestionProps } from "@/lib/types";

export default function QuizQuestion({
  pregunta,
  onAnswer,
  answered,
  selectedOptionId,
}: QuizQuestionProps) {
  const isCorrect = selectedOptionId === pregunta.respuestaCorrecta;

  const getOptionClasses = (opcionId: string): string => {
    const base =
      "w-full min-h-[44px] px-4 py-3 text-left border-2 rounded-xl transition-all duration-200";

    if (!answered) {
      return `${base} border-gray-200 hover:border-primary-400 hover:bg-primary-50 hover:shadow-sm cursor-pointer`;
    }

    // After answering - show feedback
    if (opcionId === pregunta.respuestaCorrecta) {
      return `${base} border-green-500 bg-green-50 cursor-default`;
    }

    if (opcionId === selectedOptionId && !isCorrect) {
      return `${base} border-red-500 bg-red-50 cursor-default`;
    }

    return `${base} border-gray-200 bg-gray-50 cursor-default opacity-60`;
  };

  const handleClick = (opcionId: string) => {
    if (answered) return;
    onAnswer(pregunta.id, opcionId);
  };

  return (
    <div className="mb-6 p-5 border border-gray-100 rounded-2xl bg-white shadow-sm">
      <p className="font-medium text-gray-800 mb-4">{pregunta.enunciado}</p>

      <div className="space-y-2">
        {pregunta.opciones.map((opcion) => (
          <button
            key={opcion.id}
            onClick={() => handleClick(opcion.id)}
            disabled={answered}
            className={getOptionClasses(opcion.id)}
            aria-disabled={answered}
          >
            {opcion.texto}
          </button>
        ))}
      </div>

      {answered && (
        <div
          className={`mt-4 p-3 rounded-xl text-sm flex items-start gap-2 ${
            isCorrect
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <span className="text-lg shrink-0" aria-hidden="true">
            {isCorrect ? "✅" : "❌"}
          </span>
          <div>
            <p className="font-semibold mb-1">
              {isCorrect ? "¡Correcto!" : "Incorrecto"}
            </p>
            <p>{pregunta.explicacion}</p>
          </div>
        </div>
      )}
    </div>
  );
}
