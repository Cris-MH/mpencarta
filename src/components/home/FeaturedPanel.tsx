import styles from "./FeaturedPanel.module.css";

function PythagorasTriangle() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      {/* Right triangle with labeled sides */}
      <polygon
        points="8,48 48,48 8,12"
        fill="rgba(229,184,63,0.08)"
        stroke="#E5B83F"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Right angle marker */}
      <polyline points="8,42 14,42 14,48" fill="none" stroke="#E5B83F" strokeWidth="0.8" opacity="0.6" />
      {/* Labels */}
      <text x="26" y="54" fontSize="8" fill="#F5EED7" textAnchor="middle" opacity="0.8">a</text>
      <text x="3" y="32" fontSize="8" fill="#F5EED7" textAnchor="middle" opacity="0.8">b</text>
      <text x="32" y="28" fontSize="8" fill="#E5B83F" fontWeight="bold" textAnchor="middle">c</text>
      {/* Small squares on sides */}
      <rect x="8" y="48" width="6" height="6" fill="rgba(229,184,63,0.15)" stroke="#E5B83F" strokeWidth="0.4" opacity="0.5" transform="translate(0,-6)" />
    </svg>
  );
}

export default function FeaturedPanel() {
  return (
    <div className={styles.panel}>
      <span className={styles.header}>Concepto Destacado</span>
      <div className={styles.body}>
        <div className={styles.illustration}>
          <PythagorasTriangle />
        </div>
        <div className={styles.textContent}>
          <span className={styles.title}>Teorema de Pitágoras</span>
          <span className={styles.description}>a² + b² = c²</span>
        </div>
      </div>
    </div>
  );
}
