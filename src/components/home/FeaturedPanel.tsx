import styles from "./FeaturedPanel.module.css";

function PythagorasTriangle() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      {/* Right triangle */}
      <polygon points="6,42 42,42 6,10" fill="rgba(60,121,168,0.1)" stroke="#3C79A8" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Right angle marker */}
      <polyline points="6,36 12,36 12,42" fill="none" stroke="#3C79A8" strokeWidth="0.8" />
      {/* Labels */}
      <text x="20" y="46" fontSize="7" fill="#555" textAnchor="middle">a</text>
      <text x="2" y="28" fontSize="7" fill="#555" textAnchor="middle">b</text>
      <text x="27" y="24" fontSize="7" fill="#3C79A8" fontWeight="bold" textAnchor="middle">c</text>
      {/* Formula hint */}
      <text x="24" y="8" fontSize="6" fill="#666" textAnchor="middle">a² + b² = c²</text>
    </svg>
  );
}

export default function FeaturedPanel() {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>Concepto Destacado</div>
      <div className={styles.body}>
        <div className={styles.illustration}>
          <PythagorasTriangle />
        </div>
        <div className={styles.textContent}>
          <span className={styles.title}>El Teorema de Pitágoras</span>
          <span className={styles.description}>
            La relación fundamental entre los lados de un triángulo rectángulo.
          </span>
        </div>
      </div>
    </div>
  );
}
