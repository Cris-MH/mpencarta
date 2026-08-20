import styles from "./MathToolbar.module.css";

export default function MathToolbar() {
  return (
    <div className={styles.toolbar}>
      <span className={styles.breadcrumb}>
        <span className={styles.breadcrumbItem}>Inicio</span>
      </span>
    </div>
  );
}
