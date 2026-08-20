"use client";

import { useState } from "react";
import { QuizSectionProps } from "@/lib/types";
import QuizQuestion from "./QuizQuestion";

export default function QuizSection({ quiz }: QuizSectionProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const totalQuestions = quiz.preguntas.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === totalQuestions;

  const correctCount = quiz.preguntas.filter(
    (p) => answers[p.id] === p.respuestaCorrecta
  ).length;

  const handleAnswer = (preguntaId: string, opcionId: string) => {
    if (answers[preguntaId]) return;

    setAnswers((prev) => ({
      ...prev,
      [preguntaId]: opcionId,
    }));
  };

  return (
    <section className="mt-1">
      <p className="text-[12px] text-[#6b5d3e] mb-3">
        Responde las siguientes preguntas para evaluar tu comprensión del tema.
      </p>

      <div className="space-y-2">
        {quiz.preguntas.map((pregunta) => (
          <QuizQuestion
            key={pregunta.id}
            pregunta={pregunta}
            onAnswer={handleAnswer}
            answered={!!answers[pregunta.id]}
            selectedOptionId={answers[pregunta.id]}
          />
        ))}
      </div>

      {allAnswered && (
        <div
          className="mt-3 p-3 border border-[#8b7d5e] text-center"
          style={{
            background: correctCount === totalQuestions
              ? "linear-gradient(180deg, #e8f5ec 0%, #c8e6c9 100%)"
              : "linear-gradient(180deg, #f8f4e8 0%, #e8e0c8 100%)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.15), inset 0 1px rgba(255,255,255,0.5)",
          }}
        >
          <p className="text-[14px] font-bold text-[var(--color-encarta-green-dark)]">
            {correctCount === totalQuestions ? "🎉 " : ""}
            Puntaje: {correctCount}/{totalQuestions}
            {correctCount === totalQuestions ? " 🎉" : ""}
          </p>
          <p className="text-[11px] text-[#4a4030] mt-1">
            {correctCount === totalQuestions
              ? "¡Excelente! Respondiste todas correctamente."
              : correctCount >= totalQuestions / 2
              ? "¡Buen trabajo! Sigue practicando."
              : "Revisa el contenido e intenta de nuevo."}
          </p>
        </div>
      )}
    </section>
  );
}
