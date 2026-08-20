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
    // Immutable: don't allow changing an answer once given
    if (answers[preguntaId]) return;

    setAnswers((prev) => ({
      ...prev,
      [preguntaId]: opcionId,
    }));
  };

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Quiz de Evaluación
      </h2>
      <p className="text-gray-600 mb-6">
        Responde las siguientes preguntas para evaluar tu comprensión del tema.
      </p>

      <div>
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
        <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-xl text-center">
          <p className="text-lg font-bold text-primary-800">
            Puntaje: {correctCount}/{totalQuestions}
          </p>
          <p className="text-sm text-primary-600 mt-1">
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
