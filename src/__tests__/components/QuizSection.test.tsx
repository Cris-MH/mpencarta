import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import QuizSection from "@/components/QuizSection";
import type { Quiz } from "@/lib/types";

const mockQuiz: Quiz = {
  preguntas: [
    {
      id: "q1",
      enunciado: "¿Cuánto es 2 + 2?",
      opciones: [
        { id: "a", texto: "Opción A1" },
        { id: "b", texto: "Opción B1" },
        { id: "c", texto: "Opción C1" },
        { id: "d", texto: "Opción D1" },
      ],
      respuestaCorrecta: "b",
      explicacion: "2 + 2 = 4 por definición de suma.",
    },
    {
      id: "q2",
      enunciado: "¿Cuánto es 3 × 3?",
      opciones: [
        { id: "a", texto: "Opción A2" },
        { id: "b", texto: "Opción B2" },
        { id: "c", texto: "Opción C2" },
        { id: "d", texto: "Opción D2" },
      ],
      respuestaCorrecta: "b",
      explicacion: "3 × 3 = 9 por tabla de multiplicar.",
    },
    {
      id: "q3",
      enunciado: "¿Cuánto es 10 - 7?",
      opciones: [
        { id: "a", texto: "Opción A3" },
        { id: "b", texto: "Opción B3" },
        { id: "c", texto: "Opción C3" },
        { id: "d", texto: "Opción D3" },
      ],
      respuestaCorrecta: "c",
      explicacion: "10 - 7 = 3 por resta simple.",
    },
  ],
};

describe("QuizSection", () => {
  it("renders quiz title and all questions", () => {
    render(<QuizSection quiz={mockQuiz} />);

    expect(screen.getByText("Quiz de Evaluación")).toBeInTheDocument();
    expect(screen.getByText("¿Cuánto es 2 + 2?")).toBeInTheDocument();
    expect(screen.getByText("¿Cuánto es 3 × 3?")).toBeInTheDocument();
    expect(screen.getByText("¿Cuánto es 10 - 7?")).toBeInTheDocument();
  });

  it("shows each question with 4 options", () => {
    render(<QuizSection quiz={mockQuiz} />);

    expect(screen.getByRole("button", { name: "Opción A1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Opción B1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Opción C1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Opción D1" })).toBeInTheDocument();
  });

  it("shows green feedback for correct answer", async () => {
    const user = userEvent.setup();
    render(<QuizSection quiz={mockQuiz} />);

    // Answer q1 correctly (option "b" = "Opción B1")
    await user.click(screen.getByRole("button", { name: "Opción B1" }));

    expect(screen.getByText("✓ ¡Correcto!")).toBeInTheDocument();
    expect(
      screen.getByText("2 + 2 = 4 por definición de suma.")
    ).toBeInTheDocument();
  });

  it("shows red feedback for incorrect answer and reveals correct answer", async () => {
    const user = userEvent.setup();
    render(<QuizSection quiz={mockQuiz} />);

    // Answer q1 incorrectly (option "a" = "Opción A1")
    await user.click(screen.getByRole("button", { name: "Opción A1" }));

    expect(screen.getByText("✗ Incorrecto")).toBeInTheDocument();
    expect(
      screen.getByText("2 + 2 = 4 por definición de suma.")
    ).toBeInTheDocument();
    // Correct answer should have green styling
    const correctButton = screen.getByRole("button", { name: "Opción B1" });
    expect(correctButton.className).toContain("border-green-500");
    expect(correctButton.className).toContain("bg-green-100");
    // Incorrect answer should have red styling
    const incorrectButton = screen.getByRole("button", { name: "Opción A1" });
    expect(incorrectButton.className).toContain("border-red-500");
    expect(incorrectButton.className).toContain("bg-red-100");
  });

  it("disables options after answering a question", async () => {
    const user = userEvent.setup();
    render(<QuizSection quiz={mockQuiz} />);

    // Answer q1 correctly
    await user.click(screen.getByRole("button", { name: "Opción B1" }));

    // All q1 options should be disabled
    expect(screen.getByRole("button", { name: "Opción A1" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Opción B1" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Opción C1" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Opción D1" })).toBeDisabled();

    // q2 options should still be enabled
    expect(screen.getByRole("button", { name: "Opción A2" })).not.toBeDisabled();
  });

  it("does not allow changing answer once selected (immutable)", async () => {
    const user = userEvent.setup();
    render(<QuizSection quiz={mockQuiz} />);

    // Answer q1 incorrectly
    await user.click(screen.getByRole("button", { name: "Opción A1" }));

    // Try clicking the correct answer - button is disabled
    await user.click(screen.getByRole("button", { name: "Opción B1" }));

    // Should still show incorrect feedback
    expect(screen.getByText("✗ Incorrecto")).toBeInTheDocument();
    expect(screen.queryByText("✓ ¡Correcto!")).not.toBeInTheDocument();
  });

  it("shows score when all questions are answered", async () => {
    const user = userEvent.setup();
    render(<QuizSection quiz={mockQuiz} />);

    // Answer all 3 questions - q1 correct, q2 correct, q3 incorrect
    await user.click(screen.getByRole("button", { name: "Opción B1" })); // q1 correct
    await user.click(screen.getByRole("button", { name: "Opción B2" })); // q2 correct
    await user.click(screen.getByRole("button", { name: "Opción A3" })); // q3 incorrect

    expect(screen.getByText("Puntaje: 2/3")).toBeInTheDocument();
  });

  it("does not show score before all questions are answered", async () => {
    const user = userEvent.setup();
    render(<QuizSection quiz={mockQuiz} />);

    // Answer only 1 question
    await user.click(screen.getByRole("button", { name: "Opción B1" }));

    expect(screen.queryByText(/Puntaje:/)).not.toBeInTheDocument();
  });
});
