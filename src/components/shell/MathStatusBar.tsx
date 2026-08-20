import styles from "./MathStatusBar.module.css";

export default function MathStatusBar() {
  return (
    <footer className={styles.statusBar}>
      <span className={styles.left}>
        Matemática Interactiva • Enciclopedia de Matemáticas
      </span>
      <span className={styles.right}>v1.0</span>
    </footer>
  );
}
