// =========================================================
// MI MUNDO EXPLORADOR — página de categoría
// Lee ?cat={id} de la URL, busca los datos en CATEGORIES
// (data.js) y arma la página completa: hero, temas y a Sabio
// vestido/animado distinto según el tema.
// =========================================================

const params = new URLSearchParams(window.location.search);
const catId = params.get("cat");
const category = getCategoryById(catId);

const stage = document.getElementById("cat-stage");
const toast = document.getElementById("toast");
const pageTitle = document.getElementById("page-title");
const soundBtn = document.getElementById("btn-sound");
const soundIcon = document.getElementById("sound-icon");
const helpBtn = document.getElementById("btn-help");

let soundOn = true;

if (!category) {
  // Kiro: si la categoría no existe, mostrar una pantalla 404 propia
  // en vez de redirigir silenciosamente.
  window.location.href = "index.html";
} else {
  document.title = `${category.label} — Mi Mundo Explorador`;
  renderPage(category);
}

function renderPage(cat) {
  pageTitle.innerHTML = `${cat.label}`;

  stage.innerHTML = `
    <section class="hero${cat.variant ? " hero--" + cat.variant : ""}" aria-label="Introducción a ${cat.label}">
      <div class="mascot-cat" id="mascot-cat">
        <div class="mascot-cat__bubble is-entering" id="mascot-cat-bubble">${cat.mascotMessages[0]}</div>
        ${buildMascotSVG(cat.mascotCostume)}
      </div>
      <span class="hero__icon" aria-hidden="true">${cat.icon}</span>
      <h2 class="hero__title">${cat.label}</h2>
      <p class="hero__tagline">${cat.tagline}</p>
      <p class="hero__desc">${cat.description}</p>
    </section>

    <section aria-label="Temas de ${cat.label}">
      <div class="topics-grid" id="topics-grid"></div>
    </section>
  `;

  const grid = document.getElementById("topics-grid");
  cat.topics.forEach((topic) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "topic-card";
    card.innerHTML = `
      <span class="topic-card__icon" aria-hidden="true">${topic.icon}</span>
      <span class="topic-card__title">${topic.title}</span>
      <span class="topic-card__blurb">${topic.blurb}</span>
    `;
    card.addEventListener("click", () => {
      playClick();
      showToast(`Kiro: conectar a la pantalla de artículo de "${topic.title}"`);
    });
    grid.appendChild(card);
  });

  setupMascotInteraction(cat);
}

// ---- Construcción del SVG de Sabio + disfraz ----
function buildMascotSVG(costume) {
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
    // Explorador de safari — Animales
    safari: `
      <path d="M52 48 Q100 8 148 48 L152 58 Q100 42 48 58 Z" fill="#C9A66B" stroke="#1B3A4B" stroke-width="4"/>
      <rect x="48" y="52" width="104" height="11" rx="5" fill="#8C6B3F" stroke="#1B3A4B" stroke-width="3"/>
    `,
    // Astronauta — Espacio
    astronauta: `
      <circle cx="100" cy="96" r="60" fill="rgba(190,230,255,0.35)" stroke="#1B3A4B" stroke-width="5"/>
      <path d="M58 56 Q100 26 142 56" fill="none" stroke="#1B3A4B" stroke-width="5"/>
      <line x1="100" y1="30" x2="100" y2="42" stroke="#1B3A4B" stroke-width="4"/>
      <circle cx="100" cy="26" r="7" fill="#FF6B35" stroke="#1B3A4B" stroke-width="3"/>
    `,
    // Doctor(a) — Mi Cuerpo
    doctor: `
      <rect x="50" y="58" width="100" height="12" rx="6" fill="#FFFDF7" stroke="#1B3A4B" stroke-width="4"/>
      <path d="M92 58 L100 44 L108 58 Z" fill="#FF6B35" stroke="#1B3A4B" stroke-width="2"/>
      <path d="M70 152 Q70 178 100 178 Q130 178 130 152" fill="none" stroke="#1B3A4B" stroke-width="6" stroke-linecap="round"/>
      <circle cx="70" cy="152" r="6" fill="#1B3A4B"/>
      <circle cx="130" cy="152" r="6" fill="#1B3A4B"/>
      <circle cx="100" cy="182" r="11" fill="#C7D8DE" stroke="#1B3A4B" stroke-width="4"/>
    `,
    // Paleontólogo — Dinosaurios
    paleontologo: `
      <path d="M48 52 Q100 6 152 52 L157 65 Q100 46 43 65 Z" fill="#B7A98A" stroke="#1B3A4B" stroke-width="4"/>
      <circle cx="100" cy="28" r="6" fill="#4CAF50" stroke="#1B3A4B" stroke-width="3"/>
    `,
    // Explorador de mapas — Historia
    explorador: `
      <path d="M55 58 Q100 14 145 58 Z" fill="#8C6B3F" stroke="#1B3A4B" stroke-width="4"/>
      <rect x="48" y="55" width="104" height="10" rx="5" fill="#6F5230" stroke="#1B3A4B" stroke-width="3"/>
      <rect x="86" y="55" width="28" height="10" rx="2" fill="#FFC914" stroke="#1B3A4B" stroke-width="2"/>
    `,
    // Sombrero de fiesta — Juegos
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
    <svg class="mascot-cat__figure is-entering" id="mascot-cat-figure" viewBox="0 0 200 220" aria-hidden="true">
      ${base}
      ${accessory}
    </svg>
  `;
}

// ---- Interacción de la mascota en esta página ----
function setupMascotInteraction(cat) {
  const figure = document.getElementById("mascot-cat-figure");
  const bubble = document.getElementById("mascot-cat-bubble");
  let msgIndex = 0;

  // Al terminar la animación de entrada, pasa a estado idle (flotando)
  figure.addEventListener("animationend", () => {
    figure.classList.remove("is-entering");
    figure.classList.add("is-idle");
  }, { once: true });

  figure.addEventListener("click", () => {
    playClick();
    msgIndex = (msgIndex + 1) % cat.mascotMessages.length;
    bubble.textContent = cat.mascotMessages[msgIndex];
    bubble.style.animation = "none";
    // Forzar reflow para poder reiniciar una pequeña animación de énfasis
    void bubble.offsetWidth;
    bubble.style.animation = "mascot-enter-bubble 0.35s ease";
  });
}

// ---- Sonido / Ayuda (mismo patrón que el home) ----
soundBtn.addEventListener("click", () => {
  soundOn = !soundOn;
  soundBtn.setAttribute("aria-pressed", String(soundOn));
  soundIcon.textContent = soundOn ? "🔊" : "🔇";
  showToast(soundOn ? "Sonido activado" : "Sonido desactivado");
});

helpBtn.addEventListener("click", () => {
  playClick();
  showToast("Toca cualquier tema para explorarlo, o vuelve al estante con el botón de arriba");
});

// ---- Toast ----
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function playClick() {
  if (!soundOn) return;
  // Kiro: reemplazar por el mismo efecto de sonido usado en index.html
}
