// =========================================================
// MI MUNDO EXPLORADOR — datos compartidos
// Fuente única de verdad para el estante (index) y las
// páginas de categoría. En producción, Kiro debe reemplazar
// este arreglo por una llamada a API/CMS con la misma forma.
// =========================================================

const CATEGORIES = [
  {
    id: "animales",
    label: "Animales",
    icon: "🦁",
    variant: "orange",
    tagline: "De la sabana a las profundidades del mar",
    description: "Descubre cómo viven, se alimentan, se comunican y se protegen los animales de todo el mundo.",
    mascotCostume: "safari",
    mascotMessages: [
      "¡Rugidos, aletas y plumas por todas partes! Elige un tema para empezar 🦁",
      "¿Sabías que un elefante puede oler agua a varios kilómetros de distancia?",
      "Con mi sombrero de explorador estoy listo para ir a la sabana contigo.",
    ],
    topics: [
      { title: "Mamíferos",           icon: "🐘", blurb: "Los animales que alimentan a sus crías con leche." },
      { title: "Aves",                icon: "🦜", blurb: "Plumas, picos y vuelos increíbles." },
      { title: "Animales marinos",    icon: "🐬", blurb: "La vida secreta bajo el mar." },
      { title: "Insectos",            icon: "🐝", blurb: "Pequeños, pero los más trabajadores." },
      { title: "Reptiles",            icon: "🦎", blurb: "Escamas, mudas de piel y sangre fría." },
      { title: "Especies en peligro", icon: "🐼", blurb: "Animales que el mundo debe proteger." },
    ],
  },
  {
    id: "espacio",
    label: "El Espacio",
    icon: "🚀",
    variant: "",
    tagline: "Un viaje por el universo, planeta a planeta",
    description: "Explora el sistema solar, las estrellas y los cohetes que nos llevan más allá del cielo.",
    mascotCostume: "astronauta",
    mascotMessages: [
      "¡Preparando el casco! Vamos a despegar hacia las estrellas 🚀",
      "¿Sabías que un día en Venus dura más que un año en Venus?",
      "Aquí arriba no hay sonido... pero mis datos curiosos siguen llegando.",
    ],
    topics: [
      { title: "El sistema solar", icon: "🪐", blurb: "Los ocho planetas y sus vecinos." },
      { title: "Las estrellas",    icon: "⭐", blurb: "Gigantes de luz muy, muy lejanas." },
      { title: "Cohetes",          icon: "🛰️", blurb: "Cómo viajamos fuera de la Tierra." },
      { title: "La Luna",         icon: "🌙", blurb: "Nuestra vecina más cercana." },
      { title: "Astronautas",      icon: "👩‍🚀", blurb: "Las personas que exploran el espacio." },
      { title: "Agujeros negros",  icon: "🌌", blurb: "Los misterios más extremos del universo." },
    ],
  },
  {
    id: "cuerpo",
    label: "Mi Cuerpo",
    icon: "🫀",
    variant: "pink",
    tagline: "Un recorrido por dentro y por fuera",
    description: "Conoce cómo funcionan tus huesos, tu corazón, tus sentidos y todo lo que te hace ser tú.",
    mascotCostume: "doctor",
    mascotMessages: [
      "¡Bata puesta y estetoscopio listo! Vamos a explorar tu cuerpo 🩺",
      "¿Sabías que tu corazón late más de 100,000 veces al día?",
      "Cuidar tu cuerpo también es aprender cómo funciona.",
    ],
    topics: [
      { title: "El esqueleto",  icon: "🦴", blurb: "Los huesos que te dan tu forma." },
      { title: "El corazón",    icon: "❤️", blurb: "El motor que nunca para." },
      { title: "Los sentidos",  icon: "👀", blurb: "Cómo ves, oyes, hueles y sientes." },
      { title: "El cerebro",    icon: "🧠", blurb: "El centro de mando de todo tu cuerpo." },
      { title: "La respiración",icon: "🫁", blurb: "El viaje del aire dentro de ti." },
      { title: "La alimentación",icon: "🍎", blurb: "Cómo tu cuerpo usa lo que comes." },
    ],
  },
  {
    id: "dinosaurios",
    label: "Dinosaurios",
    icon: "🦕",
    variant: "green",
    tagline: "Gigantes que caminaron la Tierra hace millones de años",
    description: "Desentierra fósiles, conoce a los dinosaurios más famosos y descubre por qué desaparecieron.",
    mascotCostume: "paleontologo",
    mascotMessages: [
      "¡Casco y brocha listos! Hay fósiles esperando ser descubiertos 🦴",
      "¿Sabías que algunos dinosaurios tenían plumas, como las aves de hoy?",
      "Cada hueso cuenta una historia de hace millones de años.",
    ],
    topics: [
      { title: "T-Rex",            icon: "🦖", blurb: "El feroz rey de los dinosaurios carnívoros." },
      { title: "Dinosaurios voladores", icon: "🦅", blurb: "Los que dominaron el cielo prehistórico." },
      { title: "Fósiles",          icon: "🪨", blurb: "Las pistas que dejaron en la roca." },
      { title: "Herbívoros gigantes", icon: "🌿", blurb: "Los cuellos más largos de la historia." },
      { title: "La extinción",     icon: "☄️", blurb: "Qué pasó hace 66 millones de años." },
      { title: "Excavaciones",     icon: "⛏️", blurb: "Cómo se buscan los dinosaurios hoy." },
    ],
  },
  {
    id: "historia",
    label: "Historia",
    icon: "🏺",
    variant: "yellow",
    tagline: "Civilizaciones, inventos y personajes que cambiaron el mundo",
    description: "Viaja al antiguo Egipto, a los castillos medievales y a los grandes inventos de la humanidad.",
    mascotCostume: "explorador",
    mascotMessages: [
      "¡Mapa y lupa en mano! Vamos a viajar al pasado 🗺️",
      "¿Sabías que las pirámides de Egipto tienen más de 4,500 años?",
      "La historia está llena de historias esperando ser contadas.",
    ],
    topics: [
      { title: "Antiguo Egipto",  icon: "🐫", blurb: "Faraones, pirámides y el río Nilo." },
      { title: "Grecia y Roma",   icon: "🏛️", blurb: "Cunas de la democracia y los grandes imperios." },
      { title: "Castillos y caballeros", icon: "🏰", blurb: "La vida en la Edad Media." },
      { title: "Grandes inventos",icon: "💡", blurb: "Ideas que cambiaron cómo vivimos." },
      { title: "Exploradores",    icon: "🧭", blurb: "Quienes se atrevieron a cruzar el mapa." },
      { title: "Culturas del mundo", icon: "🌍", blurb: "Tradiciones de todos los continentes." },
    ],
  },
  {
    id: "juegos",
    label: "Juegos",
    icon: "🧩",
    variant: "purple",
    tagline: "Aprende jugando",
    description: "Pon a prueba lo que aprendiste con juegos, retos y acertijos de todos los temas.",
    mascotCostume: "fiesta",
    mascotMessages: [
      "¡Es hora de jugar! ¿Listo para poner a prueba lo que sabes? 🎉",
      "Cada juego te ayuda a recordar lo que aprendiste explorando.",
      "¿Cuántas estrellas puedes ganar hoy?",
    ],
    topics: [
      { title: "Memorama de animales", icon: "🃏", blurb: "Encuentra las parejas a contrarreloj." },
      { title: "Trivia del espacio",   icon: "❓", blurb: "Preguntas para futuros astronautas." },
      { title: "Rompecabezas de huesos", icon: "🧩", blurb: "Arma el esqueleto completo." },
      { title: "Caza de fósiles",      icon: "🔍", blurb: "Encuentra los fósiles escondidos." },
      { title: "Línea del tiempo",     icon: "📜", blurb: "Ordena los eventos históricos." },
      { title: "Sopa de letras",       icon: "🔤", blurb: "Encuentra palabras de todos los temas." },
    ],
  },
];

function getCategoryById(id) {
  return CATEGORIES.find((c) => c.id === id) || null;
}
