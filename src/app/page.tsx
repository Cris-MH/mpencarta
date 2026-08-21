"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  { id: "aritmetica", label: "Aritmética", sub: "45 temas", icon: "🔢", variant: "orange" },
  { id: "algebra", label: "Álgebra", sub: "52 temas", icon: "𝑥", variant: "purple" },
  { id: "geometria", label: "Geometría", sub: "38 temas", icon: "📐", variant: "green" },
  { id: "trigonometria", label: "Trigonometría", sub: "28 temas", icon: "📈", variant: "pink" },
  { id: "calculo", label: "Cálculo", sub: "34 temas", icon: "∫", variant: "" },
  { id: "estadistica", label: "Estadística", sub: "31 temas", icon: "📊", variant: "yellow" },
  { id: "probabilidad", label: "Probabilidad", sub: "24 temas", icon: "🎲", variant: "orange" },
  { id: "discreta", label: "M. Discreta", sub: "18 temas", icon: "🔗", variant: "purple" },
  { id: "numeros", label: "T. Números", sub: "22 temas", icon: "∞", variant: "green" },
];

const MASCOT_TIPS = [
  "¡Hola! Soy Sabio. Toca un libro del estante para explorar matemáticas 🦉",
  "¿Sabías que puedes escribir lo que quieras aprender? Prueba 'triángulos' o 'ecuaciones'.",
  "Consejo: cada categoría tiene temas, ejemplos y ejercicios interactivos.",
  "¡El cálculo y la geometría son mis temas favoritos! ¿Cuál es el tuyo?",
];

interface SearchResult {
  catId: string;
  catLabel: string;
  catIcon: string;
  topicSlug: string;
  topicTitle: string;
  topicIcon: string;
}

const TOPICS_INDEX: SearchResult[] = [
  // Aritmética
  { catId: "aritmetica", catLabel: "Aritmética", catIcon: "🔢", topicSlug: "numeros-naturales", topicTitle: "Números Naturales", topicIcon: "1️⃣" },
  { catId: "aritmetica", catLabel: "Aritmética", catIcon: "🔢", topicSlug: "operaciones-basicas", topicTitle: "Operaciones Básicas", topicIcon: "➕" },
  { catId: "aritmetica", catLabel: "Aritmética", catIcon: "🔢", topicSlug: "numeros-enteros", topicTitle: "Números Enteros", topicIcon: "➖" },
  { catId: "aritmetica", catLabel: "Aritmética", catIcon: "🔢", topicSlug: "fracciones", topicTitle: "Fracciones", topicIcon: "½" },
  { catId: "aritmetica", catLabel: "Aritmética", catIcon: "🔢", topicSlug: "potencias-y-raices", topicTitle: "Potencias y Raíces", topicIcon: "²" },
  { catId: "aritmetica", catLabel: "Aritmética", catIcon: "🔢", topicSlug: "divisibilidad", topicTitle: "Divisibilidad", topicIcon: "÷" },
  // Álgebra
  { catId: "algebra", catLabel: "Álgebra", catIcon: "𝑥", topicSlug: "expresiones-algebraicas", topicTitle: "Expresiones Algebraicas", topicIcon: "📝" },
  { catId: "algebra", catLabel: "Álgebra", catIcon: "𝑥", topicSlug: "ecuaciones-lineales", topicTitle: "Ecuaciones Lineales", topicIcon: "⚖️" },
  { catId: "algebra", catLabel: "Álgebra", catIcon: "𝑥", topicSlug: "sistemas-de-ecuaciones", topicTitle: "Sistemas de Ecuaciones", topicIcon: "🔗" },
  { catId: "algebra", catLabel: "Álgebra", catIcon: "𝑥", topicSlug: "productos-notables", topicTitle: "Productos Notables", topicIcon: "✖️" },
  { catId: "algebra", catLabel: "Álgebra", catIcon: "𝑥", topicSlug: "factorizacion", topicTitle: "Factorización", topicIcon: "🧩" },
  { catId: "algebra", catLabel: "Álgebra", catIcon: "𝑥", topicSlug: "funciones", topicTitle: "Funciones", topicIcon: "📈" },
  // Geometría
  { catId: "geometria", catLabel: "Geometría", catIcon: "📐", topicSlug: "triangulos", topicTitle: "Triángulos", topicIcon: "🔺" },
  { catId: "geometria", catLabel: "Geometría", catIcon: "📐", topicSlug: "circunferencia-y-circulo", topicTitle: "Circunferencia y Círculo", topicIcon: "⭕" },
  { catId: "geometria", catLabel: "Geometría", catIcon: "📐", topicSlug: "poligonos", topicTitle: "Polígonos", topicIcon: "⬡" },
  { catId: "geometria", catLabel: "Geometría", catIcon: "📐", topicSlug: "perimetro-y-area", topicTitle: "Perímetro y Área", topicIcon: "📏" },
  { catId: "geometria", catLabel: "Geometría", catIcon: "📐", topicSlug: "volumen", topicTitle: "Volumen", topicIcon: "📦" },
  { catId: "geometria", catLabel: "Geometría", catIcon: "📐", topicSlug: "geometria-analitica", topicTitle: "Geometría Analítica", topicIcon: "📍" },
  // Trigonometría
  { catId: "trigonometria", catLabel: "Trigonometría", catIcon: "📈", topicSlug: "razones-trigonometricas", topicTitle: "Razones Trigonométricas", topicIcon: "📊" },
  { catId: "trigonometria", catLabel: "Trigonometría", catIcon: "📈", topicSlug: "circulo-unitario", topicTitle: "Círculo Unitario", topicIcon: "🎯" },
  { catId: "trigonometria", catLabel: "Trigonometría", catIcon: "📈", topicSlug: "identidades", topicTitle: "Identidades", topicIcon: "🔄" },
  { catId: "trigonometria", catLabel: "Trigonometría", catIcon: "📈", topicSlug: "ley-de-senos-y-cosenos", topicTitle: "Ley de Senos y Cosenos", topicIcon: "⚖️" },
  { catId: "trigonometria", catLabel: "Trigonometría", catIcon: "📈", topicSlug: "funciones-trigonometricas", topicTitle: "Funciones Trigonométricas", topicIcon: "〰️" },
  { catId: "trigonometria", catLabel: "Trigonometría", catIcon: "📈", topicSlug: "aplicaciones-trigonometria", topicTitle: "Aplicaciones", topicIcon: "🏗️" },
  // Cálculo
  { catId: "calculo", catLabel: "Cálculo", catIcon: "∫", topicSlug: "limites", topicTitle: "Límites", topicIcon: "🎯" },
  { catId: "calculo", catLabel: "Cálculo", catIcon: "∫", topicSlug: "derivadas", topicTitle: "Derivadas", topicIcon: "📉" },
  { catId: "calculo", catLabel: "Cálculo", catIcon: "∫", topicSlug: "reglas-de-derivacion", topicTitle: "Reglas de Derivación", topicIcon: "📋" },
  { catId: "calculo", catLabel: "Cálculo", catIcon: "∫", topicSlug: "integrales", topicTitle: "Integrales", topicIcon: "∫" },
  { catId: "calculo", catLabel: "Cálculo", catIcon: "∫", topicSlug: "aplicaciones-calculo", topicTitle: "Aplicaciones", topicIcon: "📊" },
  { catId: "calculo", catLabel: "Cálculo", catIcon: "∫", topicSlug: "teorema-fundamental-calculo", topicTitle: "Teorema Fundamental", topicIcon: "⭐" },
  // Estadística
  { catId: "estadistica", catLabel: "Estadística", catIcon: "📊", topicSlug: "medidas-tendencia-central", topicTitle: "Medidas de Tendencia Central", topicIcon: "📏" },
  { catId: "estadistica", catLabel: "Estadística", catIcon: "📊", topicSlug: "medidas-de-dispersion", topicTitle: "Medidas de Dispersión", topicIcon: "↔️" },
  { catId: "estadistica", catLabel: "Estadística", catIcon: "📊", topicSlug: "graficos-estadisticos", topicTitle: "Gráficos Estadísticos", topicIcon: "📈" },
  { catId: "estadistica", catLabel: "Estadística", catIcon: "📊", topicSlug: "distribucion-normal", topicTitle: "Distribución Normal", topicIcon: "🔔" },
  { catId: "estadistica", catLabel: "Estadística", catIcon: "📊", topicSlug: "muestreo", topicTitle: "Muestreo", topicIcon: "🎣" },
  { catId: "estadistica", catLabel: "Estadística", catIcon: "📊", topicSlug: "regresion", topicTitle: "Regresión", topicIcon: "📐" },
  // Probabilidad
  { catId: "probabilidad", catLabel: "Probabilidad", catIcon: "🎲", topicSlug: "eventos-espacio-muestral", topicTitle: "Eventos y Espacio Muestral", topicIcon: "🎯" },
  { catId: "probabilidad", catLabel: "Probabilidad", catIcon: "🎲", topicSlug: "probabilidad-clasica", topicTitle: "Probabilidad Clásica", topicIcon: "🎲" },
  { catId: "probabilidad", catLabel: "Probabilidad", catIcon: "🎲", topicSlug: "probabilidad-condicional", topicTitle: "Probabilidad Condicional", topicIcon: "🔗" },
  { catId: "probabilidad", catLabel: "Probabilidad", catIcon: "🎲", topicSlug: "combinatoria", topicTitle: "Combinatoria", topicIcon: "🔢" },
  { catId: "probabilidad", catLabel: "Probabilidad", catIcon: "🎲", topicSlug: "distribuciones", topicTitle: "Distribuciones", topicIcon: "📊" },
  { catId: "probabilidad", catLabel: "Probabilidad", catIcon: "🎲", topicSlug: "teorema-de-bayes", topicTitle: "Teorema de Bayes", topicIcon: "🧠" },
  // M. Discreta
  { catId: "discreta", catLabel: "M. Discreta", catIcon: "🔗", topicSlug: "teoria-de-conjuntos", topicTitle: "Teoría de Conjuntos", topicIcon: "⊂" },
  { catId: "discreta", catLabel: "M. Discreta", catIcon: "🔗", topicSlug: "logica-proposicional", topicTitle: "Lógica Proposicional", topicIcon: "∧" },
  { catId: "discreta", catLabel: "M. Discreta", catIcon: "🔗", topicSlug: "grafos", topicTitle: "Grafos", topicIcon: "🕸️" },
  { catId: "discreta", catLabel: "M. Discreta", catIcon: "🔗", topicSlug: "arboles", topicTitle: "Árboles", topicIcon: "🌳" },
  { catId: "discreta", catLabel: "M. Discreta", catIcon: "🔗", topicSlug: "relaciones", topicTitle: "Relaciones", topicIcon: "↔️" },
  { catId: "discreta", catLabel: "M. Discreta", catIcon: "🔗", topicSlug: "algoritmos-basicos", topicTitle: "Algoritmos Básicos", topicIcon: "⚡" },
  // T. Números
  { catId: "numeros", catLabel: "T. Números", catIcon: "∞", topicSlug: "numeros-primos", topicTitle: "Números Primos", topicIcon: "🔑" },
  { catId: "numeros", catLabel: "T. Números", catIcon: "∞", topicSlug: "divisibilidad-numeros", topicTitle: "Divisibilidad", topicIcon: "➗" },
  { catId: "numeros", catLabel: "T. Números", catIcon: "∞", topicSlug: "congruencias", topicTitle: "Congruencias", topicIcon: "≡" },
  { catId: "numeros", catLabel: "T. Números", catIcon: "∞", topicSlug: "sucesiones-famosas", topicTitle: "Sucesiones Famosas", topicIcon: "🌀" },
  { catId: "numeros", catLabel: "T. Números", catIcon: "∞", topicSlug: "teorema-fundamental-aritmetica", topicTitle: "Teorema Fundamental", topicIcon: "⭐" },
  { catId: "numeros", catLabel: "T. Números", catIcon: "∞", topicSlug: "numeros-perfectos", topicTitle: "Números Perfectos", topicIcon: "💎" },
];

function searchAllTopics(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];

  const results: SearchResult[] = [];
  for (const topic of TOPICS_INDEX) {
    if (
      topic.topicTitle.toLowerCase().includes(q) ||
      topic.catLabel.toLowerCase().includes(q)
    ) {
      results.push(topic);
    }
    if (results.length >= 8) break;
  }
  return results;
}

export default function Home() {
  const router = useRouter();
  const [soundOn, setSoundOn] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [mascotMessage, setMascotMessage] = useState(MASCOT_TIPS[0]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2200);
  }, []);

  const playClick = useCallback(() => {
    if (!soundOn) return;
    // Placeholder for click sound effect
  }, [soundOn]);

  const openCategory = useCallback(
    (cat: (typeof CATEGORIES)[number]) => {
      playClick();
      showToast(`Abriendo: ${cat.label}…`);
      setMascotMessage(
        `¡Buena elección! Vamos a descubrir todo sobre ${cat.label.toLowerCase()} 🔎`
      );
      router.push(`/categoria/${cat.id}`);
    },
    [playClick, showToast, router]
  );

  const handleSoundToggle = useCallback(() => {
    setSoundOn((prev) => {
      const next = !prev;
      showToast(next ? "Sonido activado" : "Sonido desactivado");
      return next;
    });
  }, [showToast]);

  const handleHelp = useCallback(() => {
    playClick();
    setMascotMessage(
      "Toca cualquier libro del estante para explorar un tema, o escribe en la barra de búsqueda 🔍"
    );
    showToast("Modo ayuda");
  }, [playClick, showToast]);

  const handleExit = useCallback(() => {
    playClick();
    showToast("Saliendo de la aplicación…");
  }, [playClick, showToast]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const value = searchInputRef.current?.value.trim() || "";
      if (!value) {
        setMascotMessage("Escribe algo primero, ¡y lo buscamos juntos!");
        return;
      }
      playClick();
      const results = searchAllTopics(value);
      if (results.length > 0) {
        setShowResults(false);
        setSearchQuery("");
        router.push(`/categoria/${results[0].catId}/${results[0].topicSlug}`);
      } else {
        setMascotMessage(`No encontré nada sobre "${value}" 🤔 ¡Prueba con otra palabra!`);
        showToast(`Sin resultados para "${value}"`);
        setShowResults(false);
      }
    },
    [playClick, showToast, router]
  );

  const handleMascotClick = useCallback(() => {
    playClick();
    const tip = MASCOT_TIPS[Math.floor(Math.random() * MASCOT_TIPS.length)];
    setMascotMessage(tip);
  }, [playClick]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      const results = searchAllTopics(value);
      setSearchResults(results);
      setShowResults(value.trim().length >= 2);
    },
    []
  );

  const handleResultClick = useCallback(
    (result: SearchResult) => {
      playClick();
      setShowResults(false);
      setSearchQuery("");
      router.push(`/categoria/${result.catId}/${result.topicSlug}`);
    },
    [playClick, router]
  );

  // Click outside to close results
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <main className="console" role="application" aria-label="ChalkApp, pantalla principal">
      {/* Barra de título */}
      <header className="titlebar">
        <div className="titlebar__brand">
          <div className="logo-badge" aria-hidden="true">
            <svg viewBox="0 0 64 64" className="logo-badge__star">
              <path d="M32 4 L39 24 L60 24 L43 37 L49 58 L32 46 L15 58 L21 37 L4 24 L25 24 Z" />
            </svg>
            <span className="logo-badge__symbol">π</span>
          </div>
          <h1 className="titlebar__title">
            Chalk<span>App</span>
          </h1>
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
          <a href="/documentacion" className="chip-btn" style={{ textDecoration: "none" }}>
            <span className="chip-btn__icon">📋</span>
            <span className="chip-btn__label">Proyecto</span>
          </a>
          <button
            className="chip-btn chip-btn--exit"
            type="button"
            onClick={handleExit}
          >
            <span className="chip-btn__icon">🚪</span>
            <span className="chip-btn__label">Salir</span>
          </button>
        </div>
      </header>

      <div className="stage">
        {/* Estantería de categorías */}
        <section className="shelf" aria-label="Categorías para explorar">
          <p className="shelf__eyebrow">¿Qué quieres descubrir hoy?</p>
          <div className="shelf__grid">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`book-tile${cat.variant ? ` book-tile--${cat.variant}` : ""}`}
                data-category={cat.id}
                onClick={() => openCategory(cat)}
              >
                <span className="book-tile__icon" aria-hidden="true">
                  {cat.icon}
                </span>
                <span className="book-tile__label">{cat.label}</span>
                <span className="book-tile__sub">{cat.sub}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Barra de búsqueda */}
        <div className="searchbar-wrapper" ref={searchContainerRef}>
          <form className="searchbar" onSubmit={handleSearch}>
            <label htmlFor="search-input" className="searchbar__label">
              Buscar un tema
            </label>
            <div className="searchbar__field">
              <input
                type="text"
                id="search-input"
                ref={searchInputRef}
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder='Escribe algo, como "ecuaciones" o "triángulos"…'
                autoComplete="off"
              />
              <button type="submit" className="searchbar__btn" aria-label="Buscar">
                <span>🔍</span>
              </button>
            </div>
          </form>

          {/* Search results dropdown */}
          {showResults && (
            <div className="search-results" role="listbox" aria-label="Resultados de búsqueda">
              {searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <button
                    key={`${result.catId}-${result.topicSlug}`}
                    type="button"
                    className="search-results__item"
                    role="option"
                    onClick={() => handleResultClick(result)}
                  >
                    <span className="search-results__icon" aria-hidden="true">
                      {result.topicIcon}
                    </span>
                    <span className="search-results__text">
                      <span className="search-results__title">{result.topicTitle}</span>
                      <span className="search-results__cat">
                        {result.catIcon} {result.catLabel}
                      </span>
                    </span>
                  </button>
                ))
              ) : (
                <div className="search-results__empty">
                  🦉 No encontré resultados. ¡Prueba con otra palabra!
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mascota guía */}
        <div className="mascot">
          <div className="mascot__bubble">{mascotMessage}</div>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <svg
            className="mascot__figure"
            viewBox="0 0 200 220"
            aria-hidden="true"
            onClick={handleMascotClick}
          >
            <ellipse cx="100" cy="200" rx="70" ry="14" fill="rgba(27,58,75,0.12)" />
            <path
              d="M40 110 C40 50 70 15 100 15 C130 15 160 50 160 110 C160 165 135 200 100 200 C65 200 40 165 40 110 Z"
              fill="#F2A65A"
            />
            <path
              d="M40 110 C40 50 70 15 100 15 C112 15 123 20 132 28 C108 24 78 45 68 90 C60 122 68 155 90 180 C68 172 40 150 40 110 Z"
              fill="#EC934B"
            />
            <circle cx="76" cy="98" r="26" fill="#FFF8E7" />
            <circle cx="124" cy="98" r="26" fill="#FFF8E7" />
            <circle cx="76" cy="98" r="24" fill="none" stroke="#1B3A4B" strokeWidth="5" />
            <circle cx="124" cy="98" r="24" fill="none" stroke="#1B3A4B" strokeWidth="5" />
            <line x1="100" y1="98" x2="100" y2="98" stroke="#1B3A4B" strokeWidth="5" />
            <line x1="52" y1="92" x2="40" y2="86" stroke="#1B3A4B" strokeWidth="5" strokeLinecap="round" />
            <line x1="148" y1="92" x2="160" y2="86" stroke="#1B3A4B" strokeWidth="5" strokeLinecap="round" />
            <circle cx="76" cy="98" r="9" fill="#1B3A4B" />
            <circle cx="124" cy="98" r="9" fill="#1B3A4B" />
            <circle cx="79" cy="95" r="3" fill="#fff" />
            <circle cx="127" cy="95" r="3" fill="#fff" />
            <path d="M92 118 L108 118 L100 130 Z" fill="#FF6B35" />
            <path
              d="M100 130 Q80 150 70 148 Q88 165 100 152 Q112 165 130 148 Q120 150 100 130Z"
              fill="#1B3A4B"
              opacity="0.85"
            />
            <path
              d="M20 130 Q45 150 55 190"
              fill="none"
              stroke="#EC934B"
              strokeWidth="26"
              strokeLinecap="round"
            />
            <path
              d="M180 130 Q155 150 145 190"
              fill="none"
              stroke="#EC934B"
              strokeWidth="26"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Toast notification */}
      <div
        className={`toast${toastVisible ? " is-visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {toastMessage}
      </div>

      {/* Footer / Autor */}
      <footer className="console-footer">
        Creado por Salomé Murcia Muñoz
      </footer>
    </main>
  );
}
