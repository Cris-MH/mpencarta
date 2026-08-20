import styles from "./CuriosityWidget.module.css";

export default function CuriosityWidget() {
  return (
    <div className={styles.widget}>
      <span className={styles.indicator} aria-hidden="true" />
      <div className={styles.content}>
        <span className={styles.label}>¿Sabías que...?</span>
        <span className={styles.fact}>
          El número π tiene infinitas cifras decimales sin patrón repetitivo.
        </span>
      </div>
    </div>
  );
}
