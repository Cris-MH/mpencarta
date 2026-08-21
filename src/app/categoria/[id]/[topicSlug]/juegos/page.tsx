"use client";

import { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

/* =========================================================
   GAMES DATA
   ========================================================= */

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface GamesContent {
  questions: QuizQuestion[];
  formulaLabel: string;
  formulaAnswer: { numerator: string; denominator: string };
  formulaHint: string;
}

const GAMES_DATA: Record<string, GamesContent> = {
  "probabilidad-clasica": {
    questions: [
      {
        question: "Al lanzar un dado justo de 6 caras, ¿cuál es la probabilidad de obtener un 5?",
        options: ["1/2", "1/6", "1/3", "5/6"],
        correct: 1,
        explanation: "Hay 1 resultado favorable (el 5) entre 6 posibles. P = 1/6",
      },
      {
        question: "En una bolsa hay 3 bolas rojas y 7 azules. ¿Cuál es la probabilidad de sacar una roja?",
        options: ["3/7", "7/10", "3/10", "1/3"],
        correct: 2,
        explanation: "3 favorables (rojas) entre 10 posibles (total). P = 3/10",
      },
      {
        question: "¿Cuál es la probabilidad de obtener un número par al lanzar un dado?",
        options: ["1/3", "2/6", "1/2", "2/3"],
        correct: 2,
        explanation: "Los pares son {2, 4, 6} = 3 favorables entre 6 posibles. P = 3/6 = 1/2",
      },
    ],
    formulaLabel: "Completa la fórmula de probabilidad clásica:",
    formulaAnswer: { numerator: "casos favorables", denominator: "casos posibles" },
    formulaHint: "P(A) = casos favorables / casos posibles",
  },
};

/* =========================================================
   CATEGORY METADATA (for hero color + breadcrumb)
   ========================================================= */

interface CategoryMeta {
  label: string;
  icon: string;
  variant: string;
}

interface TopicMeta {
  title: string;
  slug: string;
  icon: string;
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  aritmetica: { label: "Aritmética", icon: "🔢", variant: "orange" },
  algebra: { label: "Álgebra", icon: "𝑥", variant: "purple" },
  geometria: { label: "Geometría", icon: "📐", variant: "green" },
  trigonometria: { label: "Trigonometría", icon: "📏", variant: "pink" },
  calculo: { label: "Cálculo", icon: "∫", variant: "blue" },
  estadistica: { label: "Estadística", icon: "📊", variant: "yellow" },
  probabilidad: { label: "Probabilidad", icon: "🎲", variant: "purple" },
  "matematica-discreta": { label: "Matemática Discreta", icon: "🔗", variant: "green" },
  "teoria-de-numeros": { label: "Teoría de Números", icon: "🔍", variant: "orange" },
};

const TOPIC_META: Record<string, TopicMeta> = {
  "probabilidad-clasica": { title: "Probabilidad Clásica", slug: "probabilidad-clasica", icon: "🎯" },
};

/* =========================================================
   SABIO MESSAGES
   ========================================================= */

function getSabioMessage(score: number): string {
  if (score === 4) return "¡Perfecto! Dominas la probabilidad clásica 🌟";
  if (score === 3) return "¡Muy bien! Casi perfecto, sigue practicando 👏";
  if (score === 2) return "¡Buen intento! Repasa el artículo y vuelve a intentar 📖";
  return "¡No te rindas! Vuelve al artículo para repasar 💪";
}

function getStars(score: number): string {
  if (score >= 3) return "⭐⭐⭐";
  if (score === 2) return "⭐⭐";
  return "⭐";
}

/* =========================================================
   COMPONENT
   ========================================================= */

type GamePhase = "quiz" | "formula" | "score";

export default function JuegosPage() {
  const params = useParams();
  const router = useRouter();
  const catId = params.id as string;
  const topicSlug = params.topicSlug as string;

  const category = CATEGORY_META[catId];
  const topic = TOPIC_META[topicSlug];
  const gamesContent = GAMES_DATA[topicSlug];

  // Game state
  const [phase, setPhase] = useState<GamePhase>("quiz");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [formulaNumerator, setFormulaNumerator] = useState("");
  const [formulaDenominator, setFormulaDenominator] = useState("");
  const [formulaChecked, setFormulaChecked] = useState(false);
  const [formulaCorrect, setFormulaCorrect] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const heroVariant = category ? ` art-hero--${category.variant}` : "";
  const articlePath = `/categoria/${catId}/${topicSlug}`;

  // Handle selecting a quiz option
  const handleOptionSelect = useCallback(
    (index: number) => {
      if (answered || !gamesContent) return;
      setSelectedAnswer(index);
      setAnswered(true);
      if (index === gamesContent.questions[currentQuestion].correct) {
        setQuizScore((prev) => prev + 1);
      }
    },
    [answered, currentQuestion, gamesContent]
  );

  // Handle next question / move to formula
  const handleNext = useCallback(() => {
    if (!gamesContent) return;
    if (currentQuestion < gamesContent.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setPhase("formula");
    }
  }, [currentQuestion, gamesContent]);

  // Handle formula check
  const handleFormulaCheck = useCallback(() => {
    if (!gamesContent) return;
    const numOk = formulaNumerator.trim().toLowerCase() === gamesContent.formulaAnswer.numerator;
    const denOk = formulaDenominator.trim().toLowerCase() === gamesContent.formulaAnswer.denominator;
    const correct = numOk && denOk;
    setFormulaChecked(true);
    setFormulaCorrect(correct);
    const final = quizScore + (correct ? 1 : 0);
    setTotalScore(final);
  }, [formulaNumerator, formulaDenominator, gamesContent, quizScore]);

  // Handle going to score
  const handleGoToScore = useCallback(() => {
    setPhase("score");
  }, []);

  // Reset the game
  const handleReset = useCallback(() => {
    setPhase("quiz");
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setQuizScore(0);
    setFormulaNumerator("");
    setFormulaDenominator("");
    setFormulaChecked(false);
    setFormulaCorrect(false);
    setTotalScore(0);
  }, []);

  // If no category/topic found, show fallback
  if (!category) {
    return (
      <main className="console" role="application" aria-label="Juegos — ChalkApp">
        <header className="titlebar">
          <div className="titlebar__brand">
            <Link href="/" className="chip-btn chip-btn--back" style={{ textDecoration: "none" }}>
              <span className="chip-btn__icon">⬅️</span>
              <span className="chip-btn__label">Estante</span>
            </Link>
          </div>
        </header>
        <div className="games-stage">
          <div className="empty-state">
            <span className="empty-state__icon" aria-hidden="true">🎮</span>
            <p className="empty-state__title">Categoría no encontrada</p>
            <p className="empty-state__text">Vuelve al estante para explorar las categorías disponibles.</p>
          </div>
        </div>
        <footer className="console-footer">Creado por Salomé Murcia Muñoz</footer>
      </main>
    );
  }

  // Render "coming soon" for topics without games
  if (!gamesContent) {
    const topicTitle = topic?.title || topicSlug;
    return (
      <main className="console" role="application" aria-label={`Juegos — ${topicTitle} — ChalkApp`}>
        <header className="titlebar">
          <div className="titlebar__brand">
            <Link href={articlePath} className="chip-btn chip-btn--back" style={{ textDecoration: "none" }}>
              <span className="chip-btn__icon">⬅️</span>
              <span className="chip-btn__label">Volver</span>
            </Link>
            <nav className="breadcrumb" aria-label="Ruta de navegación">
              <Link href="/">Estante</Link>
              <span aria-hidden="true">›</span>
              <Link href={`/categoria/${catId}`}>{category.label}</Link>
              <span aria-hidden="true">›</span>
              <Link href={articlePath}>{topicTitle}</Link>
              <span aria-hidden="true">›</span>
              <span className="breadcrumb__current">Juegos</span>
            </nav>
          </div>
        </header>
        <div className="games-stage">
          <section className={`art-hero${heroVariant}`} aria-label="Juegos">
            <div className="art-hero__icon" aria-hidden="true">🎮</div>
            <div className="art-hero__text">
              <span className="art-hero__badge">{category.icon} {category.label}</span>
              <h2 className="art-hero__title">Juegos — {topicTitle}</h2>
            </div>
          </section>
          <div className="empty-state">
            <span className="empty-state__icon" aria-hidden="true">🎮</span>
            <p className="empty-state__title">Juegos próximamente para este tema</p>
            <p className="empty-state__text">Estamos preparando ejercicios y juegos interactivos. ¡Vuelve pronto!</p>
          </div>
        </div>
        <footer className="console-footer">Creado por Salomé Murcia Muñoz</footer>
      </main>
    );
  }

  // Full games UI
  const topicTitle = topic?.title || topicSlug;

  return (
    <main className="console" role="application" aria-label={`Juegos — ${topicTitle} — ChalkApp`}>
      {/* Titlebar */}
      <header className="titlebar">
        <div className="titlebar__brand">
          <Link href={articlePath} className="chip-btn chip-btn--back" style={{ textDecoration: "none" }}>
            <span className="chip-btn__icon">⬅️</span>
            <span className="chip-btn__label">Volver</span>
          </Link>
          <nav className="breadcrumb" aria-label="Ruta de navegación">
            <Link href="/">Estante</Link>
            <span aria-hidden="true">›</span>
            <Link href={`/categoria/${catId}`}>{category.label}</Link>
            <span aria-hidden="true">›</span>
            <Link href={articlePath}>{topicTitle}</Link>
            <span aria-hidden="true">›</span>
            <span className="breadcrumb__current">Juegos</span>
          </nav>
        </div>
      </header>

      {/* Game Stage */}
      <div className="games-stage">
        {/* Hero Banner */}
        <section className={`art-hero${heroVariant}`} aria-label="Juegos">
          <div className="art-hero__icon" aria-hidden="true">🎮</div>
          <div className="art-hero__text">
            <span className="art-hero__badge">{category.icon} {category.label}</span>
            <h2 className="art-hero__title">Juegos — {topicTitle}</h2>
            <p className="art-hero__intro">Pon a prueba lo que aprendiste con preguntas y ejercicios interactivos.</p>
          </div>
        </section>

        {/* Quiz Phase */}
        {phase === "quiz" && (
          <section className="quiz-card" aria-label={`Pregunta ${currentQuestion + 1}`}>
            <p className="quiz-card__question">
              {currentQuestion + 1}. {gamesContent.questions[currentQuestion].question}
            </p>
            <div className="quiz-card__options" role="group" aria-label="Opciones">
              {gamesContent.questions[currentQuestion].options.map((option, idx) => {
                let optionClass = "quiz-option";
                if (answered) {
                  optionClass += " quiz-option--disabled";
                  if (idx === gamesContent.questions[currentQuestion].correct) {
                    optionClass += " quiz-option--correct";
                  } else if (idx === selectedAnswer && idx !== gamesContent.questions[currentQuestion].correct) {
                    optionClass += " quiz-option--incorrect";
                  }
                }
                return (
                  <button
                    key={idx}
                    className={optionClass}
                    type="button"
                    onClick={() => handleOptionSelect(idx)}
                    disabled={answered}
                    aria-label={`Opción ${String.fromCharCode(65 + idx)}: ${option}`}
                  >
                    <span aria-hidden="true">{String.fromCharCode(65 + idx)}.</span>
                    {option}
                  </button>
                );
              })}
            </div>
            {answered && (
              <>
                <p className="quiz-explanation">
                  💡 {gamesContent.questions[currentQuestion].explanation}
                </p>
                <button className="quiz-next-btn" type="button" onClick={handleNext}>
                  {currentQuestion < gamesContent.questions.length - 1 ? "Siguiente →" : "Ir al ejercicio →"}
                </button>
              </>
            )}
          </section>
        )}

        {/* Formula Phase */}
        {phase === "formula" && (
          <section className="formula-exercise" aria-label="Ejercicio de fórmula">
            <h3 className="formula-exercise__title">{gamesContent.formulaLabel}</h3>
            <div className="formula-exercise__display">
              <span>P(A) =</span>
              <input
                className="formula-exercise__input"
                type="text"
                placeholder="¿numerador?"
                value={formulaNumerator}
                onChange={(e) => setFormulaNumerator(e.target.value)}
                disabled={formulaChecked}
                aria-label="Numerador de la fórmula"
              />
              <span>/</span>
              <input
                className="formula-exercise__input"
                type="text"
                placeholder="¿denominador?"
                value={formulaDenominator}
                onChange={(e) => setFormulaDenominator(e.target.value)}
                disabled={formulaChecked}
                aria-label="Denominador de la fórmula"
              />
            </div>
            {!formulaChecked && (
              <button className="quiz-next-btn" type="button" onClick={handleFormulaCheck}>
                Comprobar ✓
              </button>
            )}
            {formulaChecked && (
              <>
                <p className="quiz-explanation">
                  {formulaCorrect
                    ? "✅ ¡Correcto! P(A) = casos favorables / casos posibles"
                    : `❌ La respuesta correcta es: P(A) = ${gamesContent.formulaAnswer.numerator} / ${gamesContent.formulaAnswer.denominator}`}
                </p>
                <button className="quiz-next-btn" type="button" onClick={handleGoToScore}>
                  Ver puntuación →
                </button>
              </>
            )}
          </section>
        )}

        {/* Score Phase */}
        {phase === "score" && (
          <section className="score-panel" aria-label="Resultado final">
            <div className="score-panel__stars" aria-hidden="true">{getStars(totalScore)}</div>
            <p className="score-panel__score">Tu puntuación: {totalScore}/4</p>
            <p className="score-panel__message">{getSabioMessage(totalScore)}</p>
            <div className="score-panel__actions">
              <button
                className="quiz-next-btn"
                type="button"
                onClick={() => router.push(articlePath)}
              >
                Volver al artículo
              </button>
              <button className="quiz-next-btn" type="button" onClick={handleReset}>
                Intentar de nuevo 🔄
              </button>
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="console-footer">Creado por Salomé Murcia Muñoz</footer>
    </main>
  );
}
