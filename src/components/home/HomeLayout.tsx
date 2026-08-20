import styles from "./HomeLayout.module.css";
import CentralEmblem from "./CentralEmblem";
import SceneConnectors from "./SceneConnectors";
import GeometryIllustration from "@/components/icons/GeometryIllustration";
import CalculusIllustration from "@/components/icons/CalculusIllustration";
import AlgebraIllustration from "@/components/icons/AlgebraIllustration";
import ArithmeticIllustration from "@/components/icons/ArithmeticIllustration";
import TrigonometryIllustration from "@/components/icons/TrigonometryIllustration";
import StatisticsIllustration from "@/components/icons/StatisticsIllustration";
import ProbabilityIllustration from "@/components/icons/ProbabilityIllustration";
import DiscreteIllustration from "@/components/icons/DiscreteIllustration";
import NumberTheoryIllustration from "@/components/icons/NumberTheoryIllustration";

const zones = [
  { slug: "geometria", name: "Geometría", color: "#D98236", size: 140, className: "zoneGeometria", Illustration: GeometryIllustration },
  { slug: "calculo", name: "Cálculo", color: "#176B3A", size: 140, className: "zoneCalculo", Illustration: CalculusIllustration },
  { slug: "algebra", name: "Álgebra", color: "#7B4B9E", size: 130, className: "zoneAlgebra", Illustration: AlgebraIllustration },
  { slug: "aritmetica", name: "Aritmética", color: "#3C79A8", size: 120, className: "zoneAritmetica", Illustration: ArithmeticIllustration },
  { slug: "trigonometria", name: "Trigonometría", color: "#B94A42", size: 120, className: "zoneTrigonometria", Illustration: TrigonometryIllustration },
  { slug: "estadistica", name: "Estadística", color: "#2E7D6E", size: 100, className: "zoneEstadistica", Illustration: StatisticsIllustration },
  { slug: "probabilidad", name: "Probabilidad", color: "#E5B83F", size: 100, className: "zoneProbabilidad", Illustration: ProbabilityIllustration },
  { slug: "matematica-discreta", name: "M. Discreta", color: "#5C6BC0", size: 90, className: "zoneDiscreta", Illustration: DiscreteIllustration },
  { slug: "teoria-de-numeros", name: "T. Números", color: "#8D6E63", size: 90, className: "zoneTeoria", Illustration: NumberTheoryIllustration },
] as const;

export default function HomeLayout() {
  return (
    <div className={styles.scene}>
      {/* Connecting decorative elements SVG */}
      <SceneConnectors />

      {/* Central identity emblem */}
      <div className={styles.emblem}>
        <CentralEmblem />
      </div>

      {/* Category zones — absolute positioned hotspots */}
      {zones.map((zone) => (
        <a
          key={zone.slug}
          href={`/categoria/${zone.slug}`}
          className={`${styles.zone} ${styles[zone.className]}`}
          style={{ "--zone-color": zone.color } as React.CSSProperties}
          title={zone.name}
        >
          <div className={styles.zoneIllustration}>
            <zone.Illustration size={zone.size} />
          </div>
          <span className={styles.zoneLabel}>{zone.name}</span>
        </a>
      ))}

      {/* Atmospheric curiosity text */}
      <div className={styles.curiosity}>
        <span className={styles.curiosityIcon}>?</span>
        <span className={styles.curiosityText}>
          ¿Sabías que π tiene infinitas cifras sin patrón repetitivo?
        </span>
      </div>

      {/* Featured concept — subtle */}
      <div className={styles.featured}>
        <svg className={styles.featuredIcon} viewBox="0 0 30 30" fill="none">
          <polygon
            points="5,25 25,25 5,5"
            fill="rgba(229,184,63,0.15)"
            stroke="#E5B83F"
            strokeWidth="1"
          />
          <polyline points="5,21 9,21 9,25" fill="none" stroke="#E5B83F" strokeWidth="0.6" opacity="0.6" />
        </svg>
        <div className={styles.featuredText}>
          <span className={styles.featuredTitle}>Teorema de Pitágoras</span>
          <span className={styles.featuredFormula}>a² + b² = c²</span>
        </div>
      </div>
    </div>
  );
}
