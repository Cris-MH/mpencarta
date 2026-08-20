// =========================================================
// MI MUNDO EXPLORADOR — lógica de la pantalla principal
// Este mock no navega a contenido real: simula los estados
// de interacción para que Kiro implemente las rutas finales.
// =========================================================

const CATEGORIES = [
  { id: "animales",    label: "Animales",     sub: "128 temas",  icon: "🦁", variant: "orange" },
  { id: "espacio",     label: "El Espacio",   sub: "64 temas",   icon: "🚀", variant: "" /* blue */ },
  { id: "cuerpo",      label: "Mi Cuerpo",    sub: "42 temas",   icon: "🫀", variant: "pink" },
  { id: "dinosaurios", label: "Dinosaurios",  sub: "51 temas",   icon: "🦕", variant: "green" },
  { id: "historia",    label: "Historia",     sub: "77 temas",   icon: "🏺", variant: "yellow" },
  { id: "juegos",      label: "Juegos",       sub: "12 juegos",  icon: "🧩", variant: "purple" },
];

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
CATEGORIES.forEach((cat) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = `book-tile${cat.variant ? " book-tile--" + cat.variant : ""}`;
  btn.setAttribute("data-category", cat.id);
  btn.innerHTML = `
    <span class="book-tile__icon" aria-hidden="true">${cat.icon}</span>
    <span class="book-tile__label">${cat.label}</span>
    <span class="book-tile__sub">${cat.sub}</span>
  `;
  btn.addEventListener("click", () => openCategory(cat));
  shelfGrid.appendChild(btn);
});

function openCategory(cat) {
  playClick();
  showToast(`Abriendo: ${cat.label}…`);
  setMascotMessage(`¡Buena elección! Vamos a descubrir todo sobre ${cat.label.toLowerCase()} 🔎`);
  // Kiro: aquí debe ir la navegación real a la ruta /categoria/{cat.id}
}

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
