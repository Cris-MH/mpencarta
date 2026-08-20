import styles from "./HomeLayout.module.css";
import BackgroundScene from "./BackgroundScene";
import CategoryEntrance from "./CategoryEntrance";
import FeaturedPanel from "./FeaturedPanel";
import CuriosityWidget from "./CuriosityWidget";
import ExplorePrompt from "./ExplorePrompt";

const categories = [
  { slug: "aritmetica", name: "Aritmética", color: "#3C79A8", desc: "Números y operaciones" },
  { slug: "algebra", name: "Álgebra", color: "#7B4B9E", desc: "Variables y ecuaciones" },
  { slug: "geometria", name: "Geometría", color: "#D98236", desc: "Formas y espacio" },
  { slug: "trigonometria", name: "Trigonometría", color: "#B94A42", desc: "Ángulos y funciones" },
  { slug: "calculo", name: "Cálculo", color: "#176B3A", desc: "Límites y derivadas" },
  { slug: "estadistica", name: "Estadística", color: "#2E7D6E", desc: "Datos y análisis" },
  { slug: "probabilidad", name: "Probabilidad", color: "#E5B83F", desc: "Azar y eventos" },
  { slug: "matematica-discreta", name: "Matemática Discreta", color: "#5C6BC0", desc: "Estructuras y grafos" },
  { slug: "teoria-de-numeros", name: "Teoría de Números", color: "#8D6E63", desc: "Patrones y primos" },
];

function IdentityIllustration() {
  return (
    <svg width="120" height="32" viewBox="0 0 120 32" fill="none" aria-hidden="true">
      {/* Compass */}
      <circle cx="16" cy="16" r="10" fill="none" stroke="#176B3A" strokeWidth="0.8" opacity="0.4" />
      <line x1="16" y1="6" x2="16" y2="26" stroke="#176B3A" strokeWidth="0.5" opacity="0.3" />
      <line x1="6" y1="16" x2="26" y2="16" stroke="#176B3A" strokeWidth="0.5" opacity="0.3" />
      {/* Graph curve */}
      <path d="M 40 26 C 48 26 52 6 60 6 C 68 6 72 26 80 26" stroke="#3C79A8" strokeWidth="1" fill="none" opacity="0.5" />
      {/* Formula elements */}
      <text x="90" y="14" fontSize="8" fill="#7B4B9E" opacity="0.5" fontFamily="serif" fontStyle="italic">f(x)</text>
      <text x="92" y="26" fontSize="7" fill="#D98236" opacity="0.5" fontFamily="serif">= x²</text>
    </svg>
  );
}

export default function HomeLayout() {
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.backgroundLayer}>
        <BackgroundScene />
      </div>

      <div className={styles.content}>
        {/* Identity block */}
        <header className={styles.identity}>
          <h1 className={styles.identityTitle}>MATEMÁTICA INTERACTIVA</h1>
          <p className={styles.identitySubtitle}>Enciclopedia de Matemáticas</p>
          <div className={styles.identityIllustration}>
            <IdentityIllustration />
          </div>
        </header>

        {/* Main composition */}
        <div className={styles.composition}>
          {/* Top row: 3 categories */}
          <div className={styles.topRow}>
            <CategoryEntrance {...categories[0]} size="medium" />
            <CategoryEntrance {...categories[1]} size="medium" />
            <CategoryEntrance {...categories[2]} size="medium" />
          </div>

          {/* Left sidebar */}
          <aside className={styles.leftSidebar}>
            <FeaturedPanel />
            <CategoryEntrance {...categories[6]} size="small" />
          </aside>

          {/* Middle area: 4 categories in varying layout */}
          <div className={styles.middleArea}>
            <CategoryEntrance {...categories[3]} size="large" />
            <CategoryEntrance {...categories[4]} size="large" />
            <CategoryEntrance {...categories[5]} size="medium" />
            <CuriosityWidget />
          </div>

          {/* Right sidebar */}
          <aside className={styles.rightSidebar}>
            <CategoryEntrance {...categories[7]} size="small" />
            <CategoryEntrance {...categories[8]} size="small" />
          </aside>

          {/* Bottom explore prompt */}
          <div className={styles.exploreArea}>
            <ExplorePrompt />
          </div>
        </div>
      </div>
    </div>
  );
}
