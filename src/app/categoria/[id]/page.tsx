"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

/* =========================================================
   CATEGORY DATA — 9 math categories
   ========================================================= */

interface Topic {
  title: string;
  icon: string;
  blurb: string;
}

interface Category {
  id: string;
  label: string;
  icon: string;
  variant: string;
  tagline: string;
  description: string;
  mascotCostume: string;
  mascotMessages: string[];
  topics: Topic[];
}

const CATEGORIES: Category[] = [
  {
    id: "aritmetica",
    label: "Aritmética",
    icon: "🔢",
    variant: "orange",
    tagline: "La base de todo: números y operaciones",
    description: "Explora los números naturales, enteros, racionales y las operaciones fundamentales que construyen toda la matemática.",
    mascotCostume: "abaco",
    mascotMessages: [
      "¡Números por todas partes! Elige un tema para empezar a contar 🔢",
      "¿Sabías que los números negativos tardaron siglos en ser aceptados?",
      "Con mi ábaco puedo hacer cualquier operación. ¡Vamos!",
    ],
    topics: [
      { title: "Números Naturales", icon: "1️⃣", blurb: "El conjunto ℕ: los números para contar." },
      { title: "Operaciones Básicas", icon: "➕", blurb: "Suma, resta, multiplicación y división." },
      { title: "Números Enteros", icon: "➖", blurb: "Positivos, negativos y el cero." },
      { title: "Fracciones", icon: "½", blurb: "Partes de un todo: numerador y denominador." },
      { title: "Potencias y Raíces", icon: "²", blurb: "Elevar números y encontrar sus raíces." },
      { title: "Divisibilidad", icon: "÷", blurb: "Primos, MCD, MCM y criterios." },
    ],
  },
  {
    id: "algebra",
    label: "Álgebra",
    icon: "𝑥",
    variant: "purple",
    tagline: "Variables, ecuaciones y el lenguaje de las matemáticas",
    description: "Domina las expresiones algebraicas, ecuaciones y sistemas que te permiten resolver cualquier problema.",
    mascotCostume: "profesor",
    mascotMessages: [
      "¡Pizarra lista! Vamos a despejar la incógnita 🧮",
      "¿Sabías que el álgebra viene del árabe 'al-jabr' que significa 'restauración'?",
      "Cada ecuación es un misterio esperando ser resuelto.",
    ],
    topics: [
      { title: "Expresiones Algebraicas", icon: "📝", blurb: "Monomios, binomios y polinomios." },
      { title: "Ecuaciones Lineales", icon: "⚖️", blurb: "Ecuaciones de primer grado y sus soluciones." },
      { title: "Sistemas de Ecuaciones", icon: "🔗", blurb: "Dos o más ecuaciones trabajando juntas." },
      { title: "Productos Notables", icon: "✖️", blurb: "Atajos algebraicos que simplifican todo." },
      { title: "Factorización", icon: "🧩", blurb: "Descomponer expresiones en sus factores." },
      { title: "Funciones", icon: "📈", blurb: "Relaciones entre variables: f(x)." },
    ],
  },
  {
    id: "geometria",
    label: "Geometría",
    icon: "📐",
    variant: "green",
    tagline: "Formas, espacio y la belleza de las figuras",
    description: "Desde triángulos hasta círculos, descubre las propiedades de las figuras y cómo medir el mundo.",
    mascotCostume: "compas",
    mascotMessages: [
      "¡Compás y regla listos! Vamos a construir figuras perfectas 📐",
      "¿Sabías que el triángulo es la forma estructural más resistente?",
      "Cada forma tiene secretos geométricos esperando ser descubiertos.",
    ],
    topics: [
      { title: "Triángulos", icon: "🔺", blurb: "Tipos, propiedades y el teorema de Pitágoras." },
      { title: "Circunferencia y Círculo", icon: "⭕", blurb: "Pi, radio, diámetro y más." },
      { title: "Polígonos", icon: "⬡", blurb: "Figuras de muchos lados y sus propiedades." },
      { title: "Perímetro y Área", icon: "📏", blurb: "Medir contornos y superficies." },
      { title: "Volumen", icon: "📦", blurb: "El espacio que ocupan los cuerpos 3D." },
      { title: "Geometría Analítica", icon: "📍", blurb: "Coordenadas, rectas y distancias." },
    ],
  },
  {
    id: "trigonometria",
    label: "Trigonometría",
    icon: "📈",
    variant: "pink",
    tagline: "Ángulos, triángulos y funciones trigonométricas",
    description: "Explora seno, coseno y tangente — las herramientas para medir ángulos y resolver triángulos.",
    mascotCostume: "transportador",
    mascotMessages: [
      "¡Transportador en mano! Vamos a medir ángulos 📐",
      "¿Sabías que la trigonometría se inventó para estudiar las estrellas?",
      "Seno, coseno, tangente... ¡son más amigables de lo que parecen!",
    ],
    topics: [
      { title: "Razones Trigonométricas", icon: "📊", blurb: "Seno, coseno y tangente en triángulos rectángulos." },
      { title: "Círculo Unitario", icon: "🎯", blurb: "El círculo que explica toda la trigonometría." },
      { title: "Identidades", icon: "🔄", blurb: "Ecuaciones que siempre son verdaderas." },
      { title: "Ley de Senos y Cosenos", icon: "⚖️", blurb: "Resolver cualquier triángulo." },
      { title: "Funciones Trigonométricas", icon: "〰️", blurb: "Gráficas de seno, coseno y tangente." },
      { title: "Aplicaciones", icon: "🏗️", blurb: "Alturas, distancias y problemas reales." },
    ],
  },
  {
    id: "calculo",
    label: "Cálculo",
    icon: "∫",
    variant: "",
    tagline: "Límites, derivadas e integrales",
    description: "La matemática del cambio y la acumulación. Comprende cómo varían las funciones y cómo calcular áreas bajo curvas.",
    mascotCostume: "birrete",
    mascotMessages: [
      "¡Nivel avanzado! Vamos a explorar el infinito 🎓",
      "¿Sabías que Newton y Leibniz inventaron el cálculo casi al mismo tiempo?",
      "Cada derivada cuenta cómo cambian las cosas. Cada integral las acumula.",
    ],
    topics: [
      { title: "Límites", icon: "🎯", blurb: "Qué pasa cuando x se acerca a un valor." },
      { title: "Derivadas", icon: "📉", blurb: "La tasa de cambio instantánea." },
      { title: "Reglas de Derivación", icon: "📋", blurb: "Potencia, cadena, producto y cociente." },
      { title: "Integrales", icon: "∫", blurb: "El camino inverso de la derivada." },
      { title: "Aplicaciones", icon: "📊", blurb: "Áreas, volúmenes y problemas de optimización." },
      { title: "Teorema Fundamental", icon: "⭐", blurb: "El puente entre derivadas e integrales." },
    ],
  },
  {
    id: "estadistica",
    label: "Estadística",
    icon: "📊",
    variant: "yellow",
    tagline: "Datos, análisis y decisiones informadas",
    description: "Aprende a recoger, organizar, analizar e interpretar datos para entender el mundo que te rodea.",
    mascotCostume: "grafico",
    mascotMessages: [
      "¡Datos por analizar! Vamos a encontrar patrones 📊",
      "¿Sabías que la media, mediana y moda pueden dar resultados muy diferentes?",
      "Los datos cuentan historias si sabes cómo leerlos.",
    ],
    topics: [
      { title: "Medidas de Tendencia Central", icon: "📏", blurb: "Media, mediana y moda." },
      { title: "Medidas de Dispersión", icon: "↔️", blurb: "Rango, varianza y desviación estándar." },
      { title: "Gráficos Estadísticos", icon: "📈", blurb: "Barras, histogramas, circulares y más." },
      { title: "Distribución Normal", icon: "🔔", blurb: "La campana de Gauss y sus propiedades." },
      { title: "Muestreo", icon: "🎣", blurb: "Cómo elegir datos representativos." },
      { title: "Regresión", icon: "📐", blurb: "Encontrar la línea que mejor se ajusta." },
    ],
  },
  {
    id: "probabilidad",
    label: "Probabilidad",
    icon: "🎲",
    variant: "orange",
    tagline: "El azar, los eventos y sus chances",
    description: "Comprende cómo calcular las posibilidades de que algo suceda y tomar decisiones ante la incertidumbre.",
    mascotCostume: "mago",
    mascotMessages: [
      "¡Abracadabra! ¿Cuál es la probabilidad de sacar un as? 🎩",
      "¿Sabías que lanzar una moneda NO siempre es 50/50 en la realidad?",
      "El azar tiene reglas. ¡Y podemos calcularlas!",
    ],
    topics: [
      { title: "Eventos y Espacio Muestral", icon: "🎯", blurb: "Los posibles resultados de un experimento." },
      { title: "Probabilidad Clásica", icon: "🎲", blurb: "Casos favorables sobre casos posibles." },
      { title: "Probabilidad Condicional", icon: "🔗", blurb: "Cuando un evento depende de otro." },
      { title: "Combinatoria", icon: "🔢", blurb: "Permutaciones, combinaciones y variaciones." },
      { title: "Distribuciones", icon: "📊", blurb: "Binomial, Poisson y otras distribuciones." },
      { title: "Teorema de Bayes", icon: "🧠", blurb: "Actualizar probabilidades con nueva información." },
    ],
  },
  {
    id: "discreta",
    label: "M. Discreta",
    icon: "🔗",
    variant: "purple",
    tagline: "Estructuras, lógica y algoritmos",
    description: "La matemática de las computadoras: grafos, conjuntos, lógica y estructuras discretas.",
    mascotCostume: "circuito",
    mascotMessages: [
      "¡Nodos y conexiones! Vamos a pensar como una computadora 🖥️",
      "¿Sabías que los grafos se usan para resolver laberintos y planear rutas?",
      "La lógica es el lenguaje secreto de las máquinas.",
    ],
    topics: [
      { title: "Teoría de Conjuntos", icon: "⊂", blurb: "Unión, intersección y complemento." },
      { title: "Lógica Proposicional", icon: "∧", blurb: "Verdadero, falso y conectivos lógicos." },
      { title: "Grafos", icon: "🕸️", blurb: "Nodos, aristas y caminos." },
      { title: "Árboles", icon: "🌳", blurb: "Estructuras jerárquicas sin ciclos." },
      { title: "Relaciones", icon: "↔️", blurb: "Conexiones entre elementos de conjuntos." },
      { title: "Algoritmos Básicos", icon: "⚡", blurb: "Pasos para resolver problemas." },
    ],
  },
  {
    id: "numeros",
    label: "T. Números",
    icon: "∞",
    variant: "green",
    tagline: "Patrones, primos y propiedades de los números",
    description: "La rama más pura de las matemáticas: descubre los secretos escondidos en los números.",
    mascotCostume: "lupa",
    mascotMessages: [
      "¡Lupa lista! Vamos a buscar patrones en los números 🔍",
      "¿Sabías que nadie ha encontrado un patrón en los números primos?",
      "Cada número tiene una historia fascinante que contar.",
    ],
    topics: [
      { title: "Números Primos", icon: "🔑", blurb: "Los bloques fundamentales de los enteros." },
      { title: "Divisibilidad", icon: "➗", blurb: "Quién divide a quién y por qué importa." },
      { title: "Congruencias", icon: "≡", blurb: "Aritmética modular y sus aplicaciones." },
      { title: "Sucesiones Famosas", icon: "🌀", blurb: "Fibonacci, triangulares y más patrones." },
      { title: "Teorema Fundamental", icon: "⭐", blurb: "Todo entero es producto de primos." },
      { title: "Números Perfectos", icon: "💎", blurb: "Números iguales a la suma de sus divisores." },
    ],
  },
];

/* =========================================================
   MASCOT COSTUMES — SVG accessories per category
   ========================================================= */

const COSTUMES: Record<string, string> = {
  abaco: `
    <rect x="65" y="140" width="30" height="4" rx="2" fill="#8C6B3F" stroke="#1B3A4B" stroke-width="2"/>
    <circle cx="72" cy="142" r="3" fill="#FF6B35"/>
    <circle cx="80" cy="142" r="3" fill="#29ABE2"/>
    <circle cx="88" cy="142" r="3" fill="#4CAF50"/>
  `,
  profesor: `
    <rect x="62" y="90" width="15" height="10" rx="3" fill="none" stroke="#1B3A4B" stroke-width="3"/>
    <rect x="123" y="90" width="15" height="10" rx="3" fill="none" stroke="#1B3A4B" stroke-width="3"/>
    <line x1="77" y1="95" x2="123" y2="95" stroke="#1B3A4B" stroke-width="2"/>
    <rect x="140" y="160" width="24" height="5" rx="2" fill="#FFFDF7" stroke="#1B3A4B" stroke-width="2"/>
  `,
  compas: `
    <line x1="55" y1="50" x2="45" y2="80" stroke="#8C8C8C" stroke-width="3" stroke-linecap="round"/>
    <line x1="55" y1="50" x2="65" y2="80" stroke="#8C8C8C" stroke-width="3" stroke-linecap="round"/>
    <circle cx="55" cy="50" r="3" fill="#1B3A4B"/>
    <polygon points="42,80 48,80 45,86" fill="#1B3A4B"/>
  `,
  transportador: `
    <path d="M55 55 A35 35 0 0 1 145 55" fill="rgba(255,107,53,0.3)" stroke="#1B3A4B" stroke-width="3"/>
    <line x1="100" y1="55" x2="100" y2="30" stroke="#1B3A4B" stroke-width="2"/>
    <line x1="100" y1="55" x2="130" y2="35" stroke="#FF6B35" stroke-width="2"/>
    <circle cx="100" cy="55" r="3" fill="#1B3A4B"/>
  `,
  birrete: `
    <polygon points="60,52 100,38 140,52 100,66" fill="#1B3A4B"/>
    <rect x="85" y="52" width="30" height="8" fill="#2E5266"/>
    <line x1="130" y1="52" x2="140" y2="70" stroke="#FFC914" stroke-width="2"/>
    <circle cx="140" cy="72" r="4" fill="#FFC914"/>
  `,
  grafico: `
    <rect x="135" y="120" width="30" height="38" rx="3" fill="#FFFDF7" stroke="#1B3A4B" stroke-width="3"/>
    <rect x="140" y="116" width="20" height="8" rx="2" fill="#8C6B3F" stroke="#1B3A4B" stroke-width="2"/>
    <rect x="140" y="132" width="5" height="12" fill="#4CAF50"/>
    <rect x="147" y="128" width="5" height="16" fill="#29ABE2"/>
    <rect x="154" y="135" width="5" height="9" fill="#FF6B35"/>
  `,
  mago: `
    <ellipse cx="100" cy="58" rx="40" ry="8" fill="#2E5266" stroke="#1B3A4B" stroke-width="3"/>
    <path d="M75 58 L80 20 L120 20 L125 58" fill="#1B3A4B" stroke="#1B3A4B" stroke-width="2"/>
    <rect x="78" y="48" width="44" height="10" fill="#8E7CC3"/>
    <text x="96" y="40" font-size="12" fill="#FFC914" font-weight="bold">✦</text>
  `,
  circuito: `
    <line x1="100" y1="10" x2="100" y2="30" stroke="#8C8C8C" stroke-width="3"/>
    <circle cx="100" cy="8" r="4" fill="#FF6B35" stroke="#1B3A4B" stroke-width="2"/>
    <circle cx="92" cy="15" r="2" fill="#4CAF50"/>
    <circle cx="108" cy="15" r="2" fill="#29ABE2"/>
  `,
  lupa: `
    <circle cx="50" cy="60" r="14" fill="rgba(200,230,255,0.3)" stroke="#1B3A4B" stroke-width="4"/>
    <line x1="60" y1="70" x2="72" y2="82" stroke="#8C6B3F" stroke-width="4" stroke-linecap="round"/>
    <text x="44" y="65" font-size="10" fill="#1B3A4B" font-weight="bold">7</text>
  `,
};

/* =========================================================
   COMPONENT
   ========================================================= */

export default function CategoriaPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const category = CATEGORIES.find((c) => c.id === id);

  const [soundOn, setSoundOn] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [mascotMessage, setMascotMessage] = useState(category?.mascotMessages[0] ?? "");
  const [mascotState, setMascotState] = useState<"entering" | "idle">("entering");
  const msgIndexRef = useRef(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Redirect if category not found
  useEffect(() => {
    if (!category) {
      router.replace("/");
    }
  }, [category, router]);

  // Mascot animation: entering → idle
  useEffect(() => {
    const timer = setTimeout(() => {
      setMascotState("idle");
    }, 900); // Match animation duration
    return () => clearTimeout(timer);
  }, []);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2400);
  }, []);

  const playClick = useCallback(() => {
    if (!soundOn) return;
    // Placeholder for click sound
  }, [soundOn]);

  const handleSoundToggle = useCallback(() => {
    setSoundOn((prev) => {
      const next = !prev;
      showToast(next ? "Sonido activado" : "Sonido desactivado");
      return next;
    });
  }, [showToast]);

  const handleHelp = useCallback(() => {
    playClick();
    showToast("Toca cualquier tema para explorarlo, o vuelve al estante con el botón de arriba");
  }, [playClick, showToast]);

  const handleTopicClick = useCallback(
    (topicTitle: string) => {
      playClick();
      showToast(`Próximamente: ${topicTitle}`);
    },
    [playClick, showToast]
  );

  const handleMascotClick = useCallback(() => {
    if (!category) return;
    playClick();
    msgIndexRef.current = (msgIndexRef.current + 1) % category.mascotMessages.length;
    setMascotMessage(category.mascotMessages[msgIndexRef.current]);
  }, [category, playClick]);

  if (!category) {
    return null; // Will redirect via useEffect
  }

  const costumeMarkup = COSTUMES[category.mascotCostume] || "";

  return (
    <main className="console" role="application" aria-label={`${category.label} — Matemática Interactiva`}>
      {/* Titlebar */}
      <header className="titlebar">
        <div className="titlebar__brand">
          <Link href="/" className="chip-btn chip-btn--back" style={{ textDecoration: "none" }}>
            <span className="chip-btn__icon">⬅️</span>
            <span className="chip-btn__label">Estante</span>
          </Link>
          <h1 className="titlebar__title">{category.label}</h1>
        </div>
        <div className="titlebar__controls">
          <button
            className="chip-btn"
            type="button"
            aria-pressed={soundOn}
            onClick={handleSoundToggle}
          >
            <span className="chip-btn__icon">{soundOn ? "🔊" : "🔇"}</span>
            <span className="chip-btn__label">Sonido</span>
          </button>
          <button className="chip-btn" type="button" onClick={handleHelp}>
            <span className="chip-btn__icon">❓</span>
            <span className="chip-btn__label">Ayuda</span>
          </button>
        </div>
      </header>

      {/* Category stage */}
      <div className="cat-stage">
        {/* Hero section */}
        <section
          className={`hero${category.variant ? ` hero--${category.variant}` : ""}`}
          aria-label={`Introducción a ${category.label}`}
        >
          {/* Mascot floating over hero */}
          <div className="mascot-cat">
            <div className={`mascot-cat__bubble ${mascotState === "entering" ? "is-entering" : ""}`}>
              {mascotMessage}
            </div>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <svg
              className={`mascot-cat__figure ${mascotState === "entering" ? "is-entering" : "is-idle"}`}
              viewBox="0 0 200 220"
              aria-hidden="true"
              onClick={handleMascotClick}
              dangerouslySetInnerHTML={{
                __html: `
                  <ellipse cx="100" cy="200" rx="70" ry="14" fill="rgba(27,58,75,0.12)"/>
                  <path d="M40 110 C40 50 70 15 100 15 C130 15 160 50 160 110 C160 165 135 200 100 200 C65 200 40 165 40 110 Z" fill="#F2A65A"/>
                  <path d="M40 110 C40 50 70 15 100 15 C112 15 123 20 132 28 C108 24 78 45 68 90 C60 122 68 155 90 180 C68 172 40 150 40 110 Z" fill="#EC934B"/>
                  <circle cx="76" cy="98" r="26" fill="#FFF8E7"/>
                  <circle cx="124" cy="98" r="26" fill="#FFF8E7"/>
                  <circle cx="76" cy="98" r="24" fill="none" stroke="#1B3A4B" stroke-width="5"/>
                  <circle cx="124" cy="98" r="24" fill="none" stroke="#1B3A4B" stroke-width="5"/>
                  <line x1="52" y1="92" x2="40" y2="86" stroke="#1B3A4B" stroke-width="5" stroke-linecap="round"/>
                  <line x1="148" y1="92" x2="160" y2="86" stroke="#1B3A4B" stroke-width="5" stroke-linecap="round"/>
                  <circle cx="76" cy="98" r="9" fill="#1B3A4B"/>
                  <circle cx="124" cy="98" r="9" fill="#1B3A4B"/>
                  <circle cx="79" cy="95" r="3" fill="#fff"/>
                  <circle cx="127" cy="95" r="3" fill="#fff"/>
                  <path d="M92 118 L108 118 L100 130 Z" fill="#FF6B35"/>
                  <path d="M100 130 Q80 150 70 148 Q88 165 100 152 Q112 165 130 148 Q120 150 100 130Z" fill="#1B3A4B" opacity="0.85"/>
                  <path d="M20 130 Q45 150 55 190" fill="none" stroke="#EC934B" stroke-width="26" stroke-linecap="round"/>
                  <path d="M180 130 Q155 150 145 190" fill="none" stroke="#EC934B" stroke-width="26" stroke-linecap="round"/>
                  ${costumeMarkup}
                `,
              }}
            />
          </div>

          <span className="hero__icon" aria-hidden="true">{category.icon}</span>
          <h2 className="hero__title">{category.label}</h2>
          <p className="hero__tagline">{category.tagline}</p>
          <p className="hero__desc">{category.description}</p>
        </section>

        {/* Topics grid */}
        <section aria-label={`Temas de ${category.label}`}>
          <div className="topics-grid">
            {category.topics.map((topic) => (
              <button
                key={topic.title}
                type="button"
                className="topic-card"
                onClick={() => handleTopicClick(topic.title)}
              >
                <span className="topic-card__icon" aria-hidden="true">{topic.icon}</span>
                <span className="topic-card__title">{topic.title}</span>
                <span className="topic-card__blurb">{topic.blurb}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Toast notification */}
      <div
        className={`toast${toastVisible ? " is-visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {toastMessage}
      </div>

      {/* Footer */}
      <footer className="console-footer">
        Creado por Salomé Murcia Muñoz
      </footer>
    </main>
  );
}
