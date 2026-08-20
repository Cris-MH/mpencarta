// =========================================================
// MI MUNDO EXPLORADOR — página de artículo
// Lee ?cat={id}&topic={slug}, busca el tema en data.js y
// arma la ficha completa: hero, datos rápidos, curiosidades
// y a Sabio narrando algo específico de ESE tema (no solo
// de la categoría).
// =========================================================

const params = new URLSearchParams(window.location.search);
const catId = params.get("cat");
const topicSlug = params.get("topic");
const found = getTopicBySlug(catId, topicSlug);

const stage = document.getElementById("art-stage");
const breadcrumb = document.getElementById("breadcrumb");
const toast = document.getElementById("toast");
const soundBtn = document.getElementById("btn-sound");
const soundIcon = document.getElementById("sound-icon");
const helpBtn = document.getElementById("btn-help");

let soundOn = true;

if (!found) {
  // Kiro: reemplazar por una pantalla 404 propia del sistema.
  window.location.href = "index.html";
} else {
  const { category, topic } = found;
  document.title = `${topic.title} — ${category.label} — Mi Mundo Explorador`;
  renderBreadcrumb(category, topic);
  renderArticle(category, topic);
}

function renderBreadcrumb(category, topic) {
  breadcrumb.innerHTML = `
    <a href="index.html">Estante</a>
    <span aria-hidden="true">›</span>
    <a href="categoria.html?cat=${category.id}">${category.label}</a>
    <span aria-hidden="true">›</span>
    <span class="breadcrumb__current">${topic.title}</span>
  `;
}

function renderArticle(category, topic) {
  const heroVariant = category.variant ? ` hero--${category.variant}` : "";

  if (!topic.detail) {
    // ---- Estado de respaldo para temas sin contenido cargado aún ----
    stage.innerHTML = `
      <section class="art-hero${heroVariant}" aria-label="${topic.title}">
        <div class="art-hero__icon" aria-hidden="true">${topic.icon}</div>
        <div class="art-hero__text">
          <span class="art-hero__badge">${category.icon} ${category.label}</span>
          <h2 class="art-hero__title">${topic.title}</h2>
          <p class="art-hero__intro">${topic.blurb}</p>
        </div>
      </section>
      <div class="empty-state">
        <span class="empty-state__icon" aria-hidden="true">🚧</span>
        <p class="empty-state__title">Este tema todavía se está armando</p>
        <p class="empty-state__text">Kiro: este es el estado vacío del artículo — se usa cuando <code>topic.detail</code> no existe en data.js. En cuanto se agregue el contenido (intro, datos y curiosidades), esta página se ve igual que la de T-Rex.</p>
      </div>
    `;
    setupMascot(category, `Este tema todavía no tiene contenido — ¡pero pronto lo tendrá! ${category.icon}`);
    return;
  }

  const d = topic.detail;
  stage.innerHTML = `
    <section class="art-hero${heroVariant}" aria-label="${topic.title}">
      <div class="art-hero__icon" aria-hidden="true">${topic.icon}</div>
      <div class="art-hero__text">
        <span class="art-hero__badge">${category.icon} ${category.label}</span>
        <h2 class="art-hero__title">${topic.title}</h2>
        <p class="art-hero__intro">${d.intro}</p>
      </div>
    </section>

    <section class="stats-row" aria-label="Datos rápidos">
      ${d.stats.map((s) => `
        <div class="stat-chip">
          <span class="stat-chip__icon" aria-hidden="true">${s.icon}</span>
          <span>
            <span class="stat-chip__label">${s.label}</span>
            <span class="stat-chip__value">${s.value}</span>
          </span>
        </div>
      `).join("")}
    </section>

    <section class="facts" aria-label="Datos curiosos">
      <h3>Datos curiosos</h3>
      <div class="facts-grid">
        ${d.facts.map((f) => `<div class="fact-card">${f}</div>`).join("")}
      </div>
    </section>

    <section class="cta-banner" aria-label="Poner a prueba lo aprendido">
      <span class="cta-banner__text">¿Listo para poner a prueba lo que aprendiste sobre ${topic.title}?</span>
      <a class="cta-banner__btn" href="categoria.html?cat=juegos">Ir a Juegos 🎉</a>
    </section>
  `;

  setupMascot(category, d.mascotLine);
}

// ---- Sabio narrador (fijo, con el disfraz de la categoría) ----
function setupMascot(category, message) {
  const dock = document.createElement("div");
  dock.className = "mascot-art";
  dock.innerHTML = `
    <div class="mascot-art__bubble" id="mascot-art-bubble">${message}</div>
    ${buildMascotSVG(category.mascotCostume, "mascot-art__figure")}
  `;
  document.body.appendChild(dock);

  const figure = dock.querySelector(".mascot-art__figure");
  const bubble = dock.querySelector("#mascot-art-bubble");
  let showingTopicLine = true;

  figure.addEventListener("click", () => {
    playClick();
    // Alterna entre el dato del tema y un mensaje general de la categoría,
    // para reforzar tanto el tema específico como el mundo al que pertenece.
    showingTopicLine = !showingTopicLine;
    bubble.textContent = showingTopicLine
      ? message
      : category.mascotMessages[Math.floor(Math.random() * category.mascotMessages.length)];
  });
}

// ---- Construcción del SVG de Sabio + disfraz (mismo sistema que categoria.js) ----
function buildMascotSVG(costume, className) {
  const base = `
    <ellipse cx="100" cy="200" rx="70" ry="14" fill="rgba(27,58,75,0.12)"/>
    <path d="M40 110 C40 50 70 15 100 15 C130 15 160 50 160 110 C160 165 135 200 100 200 C65 200 40 165 40 110 Z" fill="#F2A65A"/>
    <path d="M40 110 C40 50 70 15 100 15 C112 15 123 20 132 28 C108 24 78 45 68 90 C60 122 68 155 90 180 C68 172 40 150 40 110 Z" fill="#EC934B"/>
    <circle cx="76" cy="98" r="26" fill="#FFF8E7"/>
    <circle cx="124" cy="98" r="26" fill="#FFF8E7"/>
    <circle cx="76" cy="98" r="24" fill="none" stroke="#1B3A4B" stroke-width="5"/>
    <circle cx="124" cy="98" r="24" fill="none" stroke="#1B3A4B" stroke-width="5"/>
    <line x1="52" y1="92" x2="40" y2="86" stroke="#1B3A4B" stroke-width="5" stroke-linecap="round"/>
    <line x1="148" y1="92" x2="160" y2="86" stroke="#1B3A4B" stroke-width="5" stroke-linecap="round"/>
    <circle cx="76" cy="98" r="9" fill="#1B3A4B"/>
    <circle cx="124" cy="98" r="9" fill="#1B3A4B"/>
    <circle cx="79" cy="95" r="3" fill="#fff"/>
    <circle cx="127" cy="95" r="3" fill="#fff"/>
    <path d="M92 118 L108 118 L100 130 Z" fill="#FF6B35"/>
    <path d="M100 130 Q80 150 70 148 Q88 165 100 152 Q112 165 130 148 Q120 150 100 130Z" fill="#1B3A4B" opacity="0.85"/>
    <path d="M20 130 Q45 150 55 190" fill="none" stroke="#EC934B" stroke-width="26" stroke-linecap="round"/>
    <path d="M180 130 Q155 150 145 190" fill="none" stroke="#EC934B" stroke-width="26" stroke-linecap="round"/>
  `;

  const costumes = {
    safari: `
      <path d="M52 48 Q100 8 148 48 L152 58 Q100 42 48 58 Z" fill="#C9A66B" stroke="#1B3A4B" stroke-width="4"/>
      <rect x="48" y="52" width="104" height="11" rx="5" fill="#8C6B3F" stroke="#1B3A4B" stroke-width="3"/>
    `,
    astronauta: `
      <circle cx="100" cy="96" r="60" fill="rgba(190,230,255,0.35)" stroke="#1B3A4B" stroke-width="5"/>
      <path d="M58 56 Q100 26 142 56" fill="none" stroke="#1B3A4B" stroke-width="5"/>
      <line x1="100" y1="30" x2="100" y2="42" stroke="#1B3A4B" stroke-width="4"/>
      <circle cx="100" cy="26" r="7" fill="#FF6B35" stroke="#1B3A4B" stroke-width="3"/>
    `,
    doctor: `
      <rect x="50" y="58" width="100" height="12" rx="6" fill="#FFFDF7" stroke="#1B3A4B" stroke-width="4"/>
      <path d="M92 58 L100 44 L108 58 Z" fill="#FF6B35" stroke="#1B3A4B" stroke-width="2"/>
      <path d="M70 152 Q70 178 100 178 Q130 178 130 152" fill="none" stroke="#1B3A4B" stroke-width="6" stroke-linecap="round"/>
      <circle cx="70" cy="152" r="6" fill="#1B3A4B"/>
      <circle cx="130" cy="152" r="6" fill="#1B3A4B"/>
      <circle cx="100" cy="182" r="11" fill="#C7D8DE" stroke="#1B3A4B" stroke-width="4"/>
    `,
    paleontologo: `
      <path d="M48 52 Q100 6 152 52 L157 65 Q100 46 43 65 Z" fill="#B7A98A" stroke="#1B3A4B" stroke-width="4"/>
      <circle cx="100" cy="28" r="6" fill="#4CAF50" stroke="#1B3A4B" stroke-width="3"/>
    `,
    explorador: `
      <path d="M55 58 Q100 14 145 58 Z" fill="#8C6B3F" stroke="#1B3A4B" stroke-width="4"/>
      <rect x="48" y="55" width="104" height="10" rx="5" fill="#6F5230" stroke="#1B3A4B" stroke-width="3"/>
      <rect x="86" y="55" width="28" height="10" rx="2" fill="#FFC914" stroke="#1B3A4B" stroke-width="2"/>
    `,
    fiesta: `
      <path d="M100 2 L132 56 L68 56 Z" fill="#8E7CC3" stroke="#1B3A4B" stroke-width="4"/>
      <circle cx="100" cy="2" r="7" fill="#FFC914" stroke="#1B3A4B" stroke-width="3"/>
      <circle cx="86" cy="30" r="3" fill="#FF8FA3"/>
      <circle cx="114" cy="38" r="3" fill="#FFC914"/>
      <circle cx="100" cy="18" r="3" fill="#4CAF50"/>
    `,
  };

  const accessory = costumes[costume] || "";

  return `
    <svg class="${className}" viewBox="0 0 200 220" aria-hidden="true">
      ${base}
      ${accessory}
    </svg>
  `;
}

// ---- Sonido / Ayuda ----
soundBtn.addEventListener("click", () => {
  soundOn = !soundOn;
  soundBtn.setAttribute("aria-pressed", String(soundOn));
  soundIcon.textContent = soundOn ? "🔊" : "🔇";
  showToast(soundOn ? "Sonido activado" : "Sonido desactivado");
});

helpBtn.addEventListener("click", () => {
  playClick();
  showToast("Toca a Sabio para escuchar otro dato, o usa la ruta de arriba para volver");
});

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function playClick() {
  if (!soundOn) return;
  // Kiro: mismo efecto de sonido usado en index.html / categoria.html
}
