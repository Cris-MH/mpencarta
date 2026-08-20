import styles from "./ExplorePrompt.module.css";

export default function ExplorePrompt() {
  return (
    <div className={styles.prompt}>
      <span className={styles.ornament} aria-hidden="true" />
      <span className={styles.text}>Explora el mundo de las matemáticas</span>
    </div>
  );
}
