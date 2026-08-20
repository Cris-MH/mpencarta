import styles from "./CategoryEntrance.module.css";
import ArithmeticIllustration from "@/components/icons/ArithmeticIllustration";
import AlgebraIllustration from "@/components/icons/AlgebraIllustration";
import GeometryIllustration from "@/components/icons/GeometryIllustration";
import TrigonometryIllustration from "@/components/icons/TrigonometryIllustration";
import CalculusIllustration from "@/components/icons/CalculusIllustration";
import StatisticsIllustration from "@/components/icons/StatisticsIllustration";
import ProbabilityIllustration from "@/components/icons/ProbabilityIllustration";
import DiscreteIllustration from "@/components/icons/DiscreteIllustration";
import NumberTheoryIllustration from "@/components/icons/NumberTheoryIllustration";

const illustrations: Record<string, React.ComponentType<{ size?: number }>> = {
  aritmetica: ArithmeticIllustration,
  algebra: AlgebraIllustration,
  geometria: GeometryIllustration,
  trigonometria: TrigonometryIllustration,
  calculo: CalculusIllustration,
  estadistica: StatisticsIllustration,
  probabilidad: ProbabilityIllustration,
  "matematica-discreta": DiscreteIllustration,
  "teoria-de-numeros": NumberTheoryIllustration,
};

interface CategoryEntranceProps {
  slug: string;
  name: string;
  color: string;
  desc: string;
  size?: "small" | "medium" | "large";
}

export default function CategoryEntrance({
  slug,
  name,
  color,
  desc,
  size = "medium",
}: CategoryEntranceProps) {
  const Illustration = illustrations[slug];
  const iconSize = size === "large" ? 64 : size === "small" ? 48 : 56;

  return (
    <a
      href={`/categoria/${slug}`}
      className={styles.entrance}
      style={{ "--cat-color": color } as React.CSSProperties}
      title={name}
    >
      <div className={styles.illustration}>
        {Illustration && <Illustration size={iconSize} />}
      </div>
      <div className={styles.textGroup}>
        <span className={styles.title}>{name}</span>
        <span className={styles.desc}>{desc}</span>
      </div>
    </a>
  );
}
