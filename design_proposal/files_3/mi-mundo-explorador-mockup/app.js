// =========================================================
// MI MUNDO EXPLORADOR — lógica de la pantalla principal
// Este mock no navega a contenido real: simula los estados
// de interacción para que Kiro implemente las rutas finales.
// =========================================================

// CATEGORIES ahora vive en data.js (fuente compartida con categoria.html)

const MASCOT_TIPS = [
  "¡Hola! Soy Sabio. Toca un libro del estante para empezar a explorar 🦉",
  "¿Sabías que puedes escribir lo que quieras aprender en la barra de búsqueda?",
  "Consejo: el botón de sonido apaga o enciende los efectos de la consola.",
  "¡Los dinosaurios y el espacio son mis temas favoritos! ¿Cuál es el tuyo?",
];

const shelfGrid   = document.getElementById("shelf-grid");
const toast       = document.getElementById("toast");
const soundBtn    = document.getElementById("btn-sound");
const soundIcon   = document.getElementById("sound-icon");
const helpBtn     = document.getElementById("btn-help");
const exitBtn     = document.getElementById("btn-exit");
const searchForm  = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const mascotFigure = document.querySelector(".mascot__figure");
const mascotBubble = document.getElementById("mascot-bubble");

let soundOn = true;

// ---- Construir el estante de categorías ----
// Cada lomo es un <a> real: navega a categoria.html?cat={id}.
// Kiro: si el proyecto usa un router de SPA, reemplazar el href
// por la ruta correspondiente (ej. /categoria/{id}) manteniendo
// el mismo markup y clases.
CATEGORIES.forEach((cat) => {
  const link = document.createElement("a");
  link.href = `categoria.html?cat=${cat.id}`;
  link.className = `book-tile${cat.variant ? " book-tile--" + cat.variant : ""}`;
  link.setAttribute("data-category", cat.id);
  link.innerHTML = `
    <span class="book-tile__icon" aria-hidden="true">${cat.icon}</span>
    <span class="book-tile__label">${cat.label}</span>
    <span class="book-tile__sub">${cat.topics.length} temas</span>
  `;
  link.addEventListener("click", () => playClick());
  shelfGrid.appendChild(link);
});

// ---- Toast ----
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

// ---- Mascota ----
function setMascotMessage(text) {
  mascotBubble.textContent = text;
}
mascotFigure.addEventListener("click", () => {
  playClick();
  const tip = MASCOT_TIPS[Math.floor(Math.random() * MASCOT_TIPS.length)];
  setMascotMessage(tip);
});

// ---- Sonido (toggle visual; el audio real lo conecta Kiro) ----
soundBtn.addEventListener("click", () => {
  soundOn = !soundOn;
  soundBtn.setAttribute("aria-pressed", String(soundOn));
  soundIcon.textContent = soundOn ? "🔊" : "🔇";
  showToast(soundOn ? "Sonido activado" : "Sonido desactivado");
});

// ---- Ayuda ----
helpBtn.addEventListener("click", () => {
  playClick();
  setMascotMessage("Toca cualquier libro del estante para explorar un tema, o escribe en la barra de búsqueda 🔍");
  showToast("Modo ayuda");
});

// ---- Salir ----
exitBtn.addEventListener("click", () => {
  playClick();
  showToast("Kiro: conectar esta acción a la salida real de la app");
});

// ---- Buscador ----
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = searchInput.value.trim();
  if (!value) {
    setMascotMessage("Escribe algo primero, ¡y lo buscamos juntos!");
    return;
  }
  playClick();
  showToast(`Buscando “${value}”…`);
  setMascotMessage(`Estoy buscando “${value}” en todos los libros del estante 📚`);
  // Kiro: conectar a la ruta real de resultados de búsqueda
});

// ---- Sonido de clic (placeholder silencioso, respeta el toggle) ----
function playClick() {
  if (!soundOn) return;
  // Kiro: reemplazar por un efecto de sonido corto (ej. click.mp3)
}
