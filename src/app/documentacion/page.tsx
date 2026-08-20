import Link from "next/link";

export default function Documentacion() {
  return (
    <main className="console" style={{ minHeight: "auto" }}>
      {/* Barra de título */}
      <header className="titlebar">
        <div className="titlebar__brand">
          <div className="logo-badge" aria-hidden="true">
            <svg viewBox="0 0 64 64" className="logo-badge__star">
              <path d="M32 4 L39 24 L60 24 L43 37 L49 58 L32 46 L15 58 L21 37 L4 24 L25 24 Z" />
            </svg>
            <span className="logo-badge__symbol">π</span>
          </div>
          <h1 className="titlebar__title">
            Matemática <span>Interactiva</span>
          </h1>
        </div>
        <div className="titlebar__controls">
          <Link href="/" className="chip-btn" style={{ textDecoration: "none" }}>
            <span className="chip-btn__icon">🏠</span>
            <span className="chip-btn__label">Inicio</span>
          </Link>
        </div>
      </header>

      {/* Contenido de documentación */}
      <div className="doc-content">
        <h2 className="doc-title">Acerca del Proyecto</h2>

        {/* Qué es */}
        <section className="doc-section">
          <h3 className="doc-section__title">📖 ¿Qué es Matemática Interactiva?</h3>
          <p>
            Matemática Interactiva es una enciclopedia digital de conocimiento matemático, diseñada
            para acompañar a los estudiantes de grado 6° a 11° en su proceso de aprendizaje.
          </p>
          <p>
            Funciona como una herramienta de consulta y refuerzo donde los estudiantes pueden explorar
            temas de matemáticas de forma interactiva, resolver dudas por su cuenta y profundizar en
            conceptos que necesitan fortalecer, todo desde cualquier dispositivo con acceso a internet.
          </p>
          <p>
            No reemplaza al docente — lo complementa. Es el recurso que el estudiante puede abrir en
            casa, en la biblioteca o en cualquier momento para repasar lo que vio en clase.
          </p>
        </section>

        {/* Para quién */}
        <section className="doc-section">
          <h3 className="doc-section__title">🎯 ¿Para quién es?</h3>
          <ul className="doc-list">
            <li>
              <strong>Estudiantes de bachillerato (grados 6° a 11°)</strong> que necesitan reforzar
              temas de matemáticas, resolver dudas o practicar con ejercicios interactivos.
            </li>
            <li>
              <strong>Docentes de matemáticas</strong> que buscan un recurso de apoyo para recomendar
              a sus estudiantes como complemento a las clases presenciales.
            </li>
            <li>
              <strong>Padres de familia</strong> que quieren ayudar a sus hijos con las matemáticas
              pero no siempre tienen el conocimiento específico del tema.
            </li>
          </ul>
        </section>

        {/* Qué contiene */}
        <section className="doc-section">
          <h3 className="doc-section__title">📚 ¿Qué contiene?</h3>
          <p>
            La enciclopedia está organizada en 9 grandes categorías de matemáticas, cada una con
            múltiples temas, explicaciones, ejemplos resueltos y ejercicios:
          </p>
          <div className="doc-categories">
            <span className="doc-cat doc-cat--orange">🔢 Aritmética</span>
            <span className="doc-cat doc-cat--purple">𝑥 Álgebra</span>
            <span className="doc-cat doc-cat--green">📐 Geometría</span>
            <span className="doc-cat doc-cat--pink">📈 Trigonometría</span>
            <span className="doc-cat doc-cat--blue">∫ Cálculo</span>
            <span className="doc-cat doc-cat--yellow">📊 Estadística</span>
            <span className="doc-cat doc-cat--orange">🎲 Probabilidad</span>
            <span className="doc-cat doc-cat--purple">🔗 Matemática Discreta</span>
            <span className="doc-cat doc-cat--green">∞ Teoría de Números</span>
          </div>
          <p>
            Cada tema incluye explicaciones claras, fórmulas renderizadas, ejemplos paso a paso,
            contenido multimedia (videos y audio) y evaluaciones interactivas para medir la comprensión.
          </p>
        </section>

        {/* Inspiración */}
        <section className="doc-section">
          <h3 className="doc-section__title">💡 ¿Cuál es la inspiración?</h3>
          <p>
            Este es mi primer proyecto que integra Inteligencia Artificial como herramienta de
            desarrollo educativo. Nace de la convicción de que la tecnología y la IA pueden ser
            aliadas poderosas en la formación académica.
          </p>
          <p>
            La visión es que tanto estudiantes como docentes puedan contar con recursos digitales
            inteligentes que se adapten a sus necesidades, refuercen el aprendizaje y estén
            disponibles en cualquier momento.
          </p>
          <p>
            Matemática Interactiva es el primer paso de una serie de proyectos educativos que
            aprovecharán la IA para hacer la educación más accesible, personalizada y efectiva.
          </p>
        </section>

        {/* El futuro con IA */}
        <section className="doc-section">
          <h3 className="doc-section__title">🤖 La Educación y la Inteligencia Artificial</h3>
          <p>
            Vivimos en un momento donde la Inteligencia Artificial está transformando todas las
            áreas del conocimiento. La educación no es la excepción.
          </p>
          <p>
            Este proyecto es una muestra de que podemos trabajar de la mano con la IA para crear
            herramientas educativas de calidad. Desde ahora y hacia el futuro, los proyectos
            educativos incorporarán IA de manera natural — y es importante que como comunidad
            educativa empecemos a entenderla, utilizarla y aprovecharla responsablemente.
          </p>
          <p>
            No se trata de reemplazar al docente sino de potenciar su labor, dándole al estudiante
            herramientas complementarias que el profesor por sí solo no puede ofrecer por
            limitaciones de tiempo.
          </p>
        </section>

        {/* Objetivo educativo */}
        <section className="doc-section">
          <h3 className="doc-section__title">🎓 Objetivo Educativo</h3>
          <p>
            En el aula de clases, el tiempo es limitado. Un profesor tiene entre 45 y 90 minutos
            para explicar un tema a 30 o más estudiantes, cada uno con un ritmo de aprendizaje
            diferente. Es natural que muchos estudiantes se queden con dudas que no alcanzan a
            resolver en ese espacio.
          </p>
          <p>
            <strong>Matemática Interactiva existe para cubrir ese vacío.</strong> Es un apoyo
            adicional y un refuerzo a los temas matemáticos que se ven en clase. El estudiante
            puede tomarse el tiempo que necesite para entender un concepto, repetir los ejemplos,
            practicar con ejercicios y avanzar a su propio ritmo.
          </p>
          <p>
            No compite con la clase presencial — la complementa. Es el "profesor disponible 24/7"
            que el estudiante puede consultar cuando lo necesite, sin presión de tiempo ni pena
            de preguntar.
          </p>
        </section>

        {/* Autora */}
        <section className="doc-section doc-section--author">
          <h3 className="doc-section__title">✨ Creado por</h3>
          <p className="doc-author">Salomé Murcia Muñoz</p>
          <p className="doc-author-sub">
            Proyecto educativo • 2026
          </p>
        </section>

        {/* Botón volver */}
        <div className="doc-back">
          <Link href="/" className="chip-btn" style={{ textDecoration: "none" }}>
            <span className="chip-btn__icon">←</span>
            <span className="chip-btn__label">Volver al inicio</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
