import styles from "./CuriosityWidget.module.css";

export default function CuriosityWidget() {
  return (
    <div className={styles.widget}>
      <div className={styles.iconArea}>
        <span className={styles.questionMark}>?</span>
        <span className={styles.sparkle} aria-hidden="true" />
      </div>
      <div className={styles.content}>
        <span className={styles.label}>¿Sabías que...?</span>
        <span className={styles.fact}>
          El número π tiene infinitas cifras decimales sin patrón repetitivo.
        </span>
      </div>
    </div>
  );
}
