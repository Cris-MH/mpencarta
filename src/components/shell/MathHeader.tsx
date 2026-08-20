import styles from "./MathHeader.module.css";

export default function MathHeader() {
  return (
    <header className={styles.header}>
      <span className={styles.logo}>Matemática Interactiva</span>

      <nav className={styles.navGroup} aria-label="Navegación principal">
        <button className={styles.navBtn} title="Inicio" aria-label="Inicio">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 2L2 7.5V14h4v-4h4v4h4V7.5L8 2z" fill="currentColor" />
          </svg>
        </button>
        <button className={styles.navBtn} title="Atrás" aria-label="Atrás">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className={styles.navBtn} title="Adelante" aria-label="Adelante">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className={styles.navBtn} title="Índice" aria-label="Índice">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="3" width="12" height="1.5" rx="0.5" fill="currentColor" />
            <rect x="2" y="7" width="12" height="1.5" rx="0.5" fill="currentColor" />
            <rect x="2" y="11" width="12" height="1.5" rx="0.5" fill="currentColor" />
          </svg>
        </button>
      </nav>

      <div className={styles.spacer} />

      <div className={styles.searchGroup}>
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Buscar tema..."
          aria-label="Buscar en la enciclopedia"
        />
        <button className={styles.searchBtn} title="Buscar" aria-label="Buscar">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="2" />
            <path d="M10 10l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}
