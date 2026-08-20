import styles from "./HomeLayout.module.css";
import BackgroundScene from "./BackgroundScene";
import CategoryEntrance from "./CategoryEntrance";
import FeaturedPanel from "./FeaturedPanel";
import CuriosityWidget from "./CuriosityWidget";
import ExplorePrompt from "./ExplorePrompt";

const categories = [
  { slug: "aritmetica", name: "Aritmética", color: "#3C79A8", desc: "Números y operaciones", size: "medium" as const },
  { slug: "algebra", name: "Álgebra", color: "#7B4B9E", desc: "Variables y ecuaciones", size: "large" as const },
  { slug: "geometria", name: "Geometría", color: "#D98236", desc: "Formas y espacio", size: "large" as const },
  { slug: "trigonometria", name: "Trigonometría", color: "#B94A42", desc: "Ángulos y funciones", size: "medium" as const },
  { slug: "calculo", name: "Cálculo", color: "#176B3A", desc: "Límites y derivadas", size: "large" as const },
  { slug: "estadistica", name: "Estadística", color: "#2E7D6E", desc: "Datos y análisis", size: "small" as const },
  { slug: "probabilidad", name: "Probabilidad", color: "#E5B83F", desc: "Azar y eventos", size: "small" as const },
  { slug: "matematica-discreta", name: "M. Discreta", color: "#5C6BC0", desc: "Estructuras y grafos", size: "small" as const },
  { slug: "teoria-de-numeros", name: "T. Números", color: "#8D6E63", desc: "Patrones y primos", size: "small" as const },
];

function IdentityIllustration() {
  return (
    <svg width="320" height="180" viewBox="0 0 320 180" fill="none" aria-hidden="true">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Coordinate axes behind text — very subtle */}
      <line x1="60" y1="90" x2="260" y2="90" stroke="#4a9fbf" strokeWidth="0.5" opacity="0.15" />
      <line x1="160" y1="30" x2="160" y2="150" stroke="#4a9fbf" strokeWidth="0.5" opacity="0.15" />

      {/* Compass arc above text — golden, with pulsing glow */}
      <path
        d="M 80 55 A 90 90 0 0 1 240 55"
        stroke="#E5B83F"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
        className="compassArc"
      >
        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />
      </path>

      {/* Ruler/straightedge below text */}
      <line x1="90" y1="130" x2="230" y2="130" stroke="#E5B83F" strokeWidth="0.8" opacity="0.3" />
      {/* Tick marks on ruler */}
      {Array.from({ length: 15 }, (_, i) => (
        <line
          key={i}
          x1={90 + i * 10}
          y1="128"
          x2={90 + i * 10}
          y2={i % 5 === 0 ? "133" : "131"}
          stroke="#E5B83F"
          strokeWidth="0.4"
          opacity="0.3"
        />
      ))}

      {/* Small triangle to the left */}
      <polygon points="50,100 70,100 60,80" fill="none" stroke="#D98236" strokeWidth="0.8" opacity="0.4" />

      {/* Integral symbol to the right */}
      <text x="265" y="100" fontSize="18" fill="#7B4B9E" opacity="0.35" fontFamily="serif">∫</text>

      {/* Floating numbers scattered around */}
      <text x="75" y="50" fontSize="10" fill="#E5B83F" opacity="0.3" fontFamily="serif">π</text>
      <text x="245" y="50" fontSize="9" fill="#4a9fbf" opacity="0.25" fontFamily="serif">e</text>
      <text x="55" y="130" fontSize="10" fill="#2E7D6E" opacity="0.3" fontFamily="serif">3</text>
      <text x="258" y="135" fontSize="9" fill="#B94A42" opacity="0.25" fontFamily="serif">∞</text>
      <text x="100" y="42" fontSize="8" fill="#5C6BC0" opacity="0.2" fontFamily="serif">1</text>
      <text x="215" y="40" fontSize="8" fill="#D98236" opacity="0.2" fontFamily="serif">2</text>
      <text x="280" y="75" fontSize="8" fill="#E5B83F" opacity="0.2" fontFamily="serif">7</text>
      <text x="40" y="75" fontSize="8" fill="#3C79A8" opacity="0.2" fontFamily="serif">5</text>

      {/* Small glowing dots at key positions */}
      <circle cx="80" cy="55" r="2" fill="#E5B83F" opacity="0.5" filter="url(#glow)" />
      <circle cx="240" cy="55" r="2" fill="#E5B83F" opacity="0.5" filter="url(#glow)" />
      <circle cx="160" cy="38" r="1.5" fill="#4a9fbf" opacity="0.4" filter="url(#glow)" />
      <circle cx="90" cy="130" r="1.5" fill="#E5B83F" opacity="0.4" />
      <circle cx="230" cy="130" r="1.5" fill="#E5B83F" opacity="0.4" />

      {/* Main title text */}
      <text
        x="160"
        y="82"
        textAnchor="middle"
        fontSize="30"
        fontWeight="700"
        fill="#F5EED7"
        letterSpacing="3"
        fontFamily="system-ui, Tahoma, sans-serif"
        style={{ textShadow: "0 0 12px rgba(229,184,63,0.3)" }}
      >
        MATEMÁTICA
      </text>
      <text
        x="160"
        y="112"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#F5EED7"
        letterSpacing="5"
        fontFamily="system-ui, Tahoma, sans-serif"
        style={{ textShadow: "0 0 12px rgba(229,184,63,0.3)" }}
      >
        INTERACTIVA
      </text>
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
        {/* Scene composition */}
        <div className={styles.sceneContainer}>
          {/* Top row categories */}
          <div className={styles["pos-aritmetica"]}>
            <CategoryEntrance {...categories[0]} />
          </div>
          <div className={styles["pos-algebra"]}>
            <CategoryEntrance {...categories[1]} />
          </div>
          <div className={styles["pos-geometria"]}>
            <CategoryEntrance {...categories[2]} />
          </div>

          {/* Left side */}
          <div className={styles["pos-probabilidad"]}>
            <CategoryEntrance {...categories[6]} />
          </div>

          {/* Center identity */}
          <div className={styles.centerIdentity}>
            <header className={styles.identity}>
              <div className={styles.identityBlock}>
                <IdentityIllustration />
              </div>
            </header>
          </div>

          {/* Right side */}
          <div className={styles["pos-trigonometria"]}>
            <CategoryEntrance {...categories[3]} />
          </div>

          {/* Lower sides */}
          <div className={styles["pos-discreta"]}>
            <CategoryEntrance {...categories[7]} />
          </div>

          <div className={styles.curiosityArea}>
            <CuriosityWidget />
          </div>

          <div className={styles["pos-calculo"]}>
            <CategoryEntrance {...categories[4]} />
          </div>

          {/* Bottom row */}
          <div className={styles["pos-teoria"]}>
            <CategoryEntrance {...categories[8]} />
          </div>
          <div className={styles["pos-estadistica"]}>
            <CategoryEntrance {...categories[5]} />
          </div>
          <div className={styles["pos-featured"]}>
            <FeaturedPanel />
          </div>
        </div>

        {/* Explore prompt */}
        <div className={styles.exploreArea}>
          <ExplorePrompt />
        </div>
      </div>
    </div>
  );
}
