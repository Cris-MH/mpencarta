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
      { slug: "mamiferos",        title: "Mamíferos",           icon: "🐘", blurb: "Los animales que alimentan a sus crías con leche." },
      { slug: "aves",             title: "Aves",                icon: "🦜", blurb: "Plumas, picos y vuelos increíbles." },
      { slug: "animales-marinos", title: "Animales marinos",    icon: "🐬", blurb: "La vida secreta bajo el mar." },
      { slug: "insectos",         title: "Insectos",            icon: "🐝", blurb: "Pequeños, pero los más trabajadores." },
      { slug: "reptiles",         title: "Reptiles",            icon: "🦎", blurb: "Escamas, mudas de piel y sangre fría." },
      { slug: "especies-peligro", title: "Especies en peligro", icon: "🐼", blurb: "Animales que el mundo debe proteger." },
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
      { slug: "sistema-solar", title: "El sistema solar", icon: "🪐", blurb: "Los ocho planetas y sus vecinos." },
      { slug: "estrellas",     title: "Las estrellas",    icon: "⭐", blurb: "Gigantes de luz muy, muy lejanas." },
      { slug: "cohetes",       title: "Cohetes",          icon: "🛰️", blurb: "Cómo viajamos fuera de la Tierra." },
      { slug: "la-luna",       title: "La Luna",          icon: "🌙", blurb: "Nuestra vecina más cercana." },
      { slug: "astronautas",   title: "Astronautas",      icon: "👩‍🚀", blurb: "Las personas que exploran el espacio." },
      { slug: "agujeros-negros", title: "Agujeros negros", icon: "🌌", blurb: "Los misterios más extremos del universo." },
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
      { slug: "esqueleto",   title: "El esqueleto",   icon: "🦴", blurb: "Los huesos que te dan tu forma." },
      { slug: "corazon",     title: "El corazón",     icon: "❤️", blurb: "El motor que nunca para." },
      { slug: "sentidos",    title: "Los sentidos",   icon: "👀", blurb: "Cómo ves, oyes, hueles y sientes." },
      { slug: "cerebro",     title: "El cerebro",     icon: "🧠", blurb: "El centro de mando de todo tu cuerpo." },
      { slug: "respiracion", title: "La respiración", icon: "🫁", blurb: "El viaje del aire dentro de ti." },
      { slug: "alimentacion",title: "La alimentación",icon: "🍎", blurb: "Cómo tu cuerpo usa lo que comes." },
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
      {
        slug: "t-rex", title: "T-Rex", icon: "🦖",
        blurb: "El feroz rey de los dinosaurios carnívoros.",
        detail: {
          intro: "El Tyrannosaurus rex fue uno de los cazadores más grandes y poderosos que caminaron sobre la Tierra. Con su mordida capaz de triturar huesos, era el terror de otros dinosaurios hace más de 66 millones de años.",
          stats: [
            { icon: "📏", label: "Largo", value: "12 metros" },
            { icon: "⚖️", label: "Peso", value: "8 toneladas" },
            { icon: "🕰️", label: "Época", value: "Cretácico" },
          ],
          facts: [
            "Sus dientes podían medir hasta 20 cm — del tamaño de un plátano.",
            "A pesar de su tamaño, algunos científicos creen que podía correr casi tan rápido como un humano.",
            "Sus brazos eran pequeños, pero tan fuertes que podían levantar más de 180 kg.",
          ],
          mascotLine: "¡El T-Rex tenía la mordida más fuerte de todos los dinosaurios carnívoros! 🦖",
        },
      },
      {
        slug: "dinosaurios-voladores", title: "Dinosaurios voladores", icon: "🦅",
        blurb: "Los que dominaron el cielo prehistórico.",
        detail: {
          intro: "Mientras los dinosaurios dominaban la tierra, otros reptiles voladores como el Pterodáctilo surcaban los cielos. No eran dinosaurios exactamente, pero vivieron en la misma época y tamaño impresionante.",
          stats: [
            { icon: "📏", label: "Envergadura", value: "hasta 10 m" },
            { icon: "🍖", label: "Dieta", value: "Peces e insectos" },
            { icon: "🕰️", label: "Época", value: "Jurásico-Cretácico" },
          ],
          facts: [
            "El Quetzalcoatlus fue tan grande como una avioneta pequeña.",
            "Muchos tenían crestas en la cabeza que quizás usaban para atraer pareja.",
            "Sus huesos eran huecos, como los de las aves, para poder volar.",
          ],
          mascotLine: "¡Imagina ver volar un reptil del tamaño de una avioneta! 🦅",
        },
      },
      {
        slug: "fosiles", title: "Fósiles", icon: "🪨",
        blurb: "Las pistas que dejaron en la roca.",
        detail: {
          intro: "Los fósiles son los restos o huellas de seres vivos que quedaron atrapados en roca durante millones de años. Gracias a ellos sabemos cómo eran los dinosaurios aunque nadie los haya visto nunca.",
          stats: [
            { icon: "⏳", label: "Tiempo en formarse", value: "Millones de años" },
            { icon: "🪨", label: "Se forman en", value: "Sedimentos" },
            { icon: "🔬", label: "Los estudia", value: "Un paleontólogo" },
          ],
          facts: [
            "No solo se fosilizan huesos: también huellas, huevos e incluso excremento.",
            "El fósil de dinosaurio más completo encontrado tiene más del 90% de su esqueleto.",
            "Encontrar un fósil puede tomar años de excavación cuidadosa.",
          ],
          mascotLine: "Cada fósil es como una carta escrita hace millones de años 🪨",
        },
      },
      {
        slug: "herbivoros-gigantes", title: "Herbívoros gigantes", icon: "🌿",
        blurb: "Los cuellos más largos de la historia.",
        detail: {
          intro: "Dinosaurios como el Brontosaurio o el Diplodocus eran gigantes pacíficos que comían solo plantas. Su cuello largo les permitía alcanzar las hojas más altas de los árboles.",
          stats: [
            { icon: "📏", label: "Largo", value: "hasta 30 m" },
            { icon: "🌿", label: "Dieta", value: "Hojas y plantas" },
            { icon: "🍽️", label: "Comida al día", value: "Cientos de kg" },
          ],
          facts: [
            "Eran tan grandes que probablemente no tenían depredadores naturales de adultos.",
            "Se cree que comían piedras para ayudar a triturar la comida en su estómago.",
            "Vivían en manadas para proteger a las crías.",
          ],
          mascotLine: "¡Con ese cuello podían desayunar sin mover las patas! 🌿",
        },
      },
      {
        slug: "extincion", title: "La extinción", icon: "☄️",
        blurb: "Qué pasó hace 66 millones de años.",
        detail: {
          intro: "Hace 66 millones de años, un enorme asteroide chocó contra la Tierra y cambió el clima del planeta por completo. Ese evento acabó con la mayoría de los dinosaurios.",
          stats: [
            { icon: "☄️", label: "Causa principal", value: "Impacto de asteroide" },
            { icon: "🕰️", label: "Hace", value: "66 millones de años" },
            { icon: "🐊", label: "Sobrevivieron", value: "Aves y reptiles pequeños" },
          ],
          facts: [
            "El cráter que dejó el asteroide mide más de 150 km de ancho.",
            "El impacto provocó incendios, tsunamis y una nube de polvo que oscureció el cielo por años.",
            "Las aves de hoy son, en realidad, descendientes directas de los dinosaurios.",
          ],
          mascotLine: "¡Las aves que ves hoy son parientes de los dinosaurios! ☄️",
        },
      },
      {
        slug: "excavaciones", title: "Excavaciones", icon: "⛏️",
        blurb: "Cómo se buscan los dinosaurios hoy.",
        detail: {
          intro: "Encontrar un dinosaurio no es cosa de un día: los paleontólogos pasan semanas excavando con cuidado, cepillo en mano, para no dañar ni un solo hueso.",
          stats: [
            { icon: "🧰", label: "Herramientas", value: "Brochas y cinceles" },
            { icon: "🗺️", label: "Se buscan en", value: "Zonas rocosas" },
            { icon: "⏱️", label: "Puede tardar", value: "Semanas o meses" },
          ],
          facts: [
            "Los huesos frágiles se cubren con yeso antes de moverlos, como un yeso de brazo roto.",
            "A veces hace falta un helicóptero para sacar los huesos más pesados.",
            "Cualquier persona puede encontrar un fósil — ¡hasta niños lo han logrado!",
          ],
          mascotLine: "¡Con brocha y mucha paciencia se descubren gigantes! ⛏️",
        },
      },
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
      { slug: "antiguo-egipto",   title: "Antiguo Egipto",  icon: "🐫", blurb: "Faraones, pirámides y el río Nilo." },
      { slug: "grecia-roma",      title: "Grecia y Roma",   icon: "🏛️", blurb: "Cunas de la democracia y los grandes imperios." },
      { slug: "castillos",        title: "Castillos y caballeros", icon: "🏰", blurb: "La vida en la Edad Media." },
      { slug: "grandes-inventos", title: "Grandes inventos",icon: "💡", blurb: "Ideas que cambiaron cómo vivimos." },
      { slug: "exploradores",     title: "Exploradores",    icon: "🧭", blurb: "Quienes se atrevieron a cruzar el mapa." },
      { slug: "culturas-mundo",   title: "Culturas del mundo", icon: "🌍", blurb: "Tradiciones de todos los continentes." },
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
      { slug: "memorama-animales", title: "Memorama de animales", icon: "🃏", blurb: "Encuentra las parejas a contrarreloj." },
      { slug: "trivia-espacio",    title: "Trivia del espacio",   icon: "❓", blurb: "Preguntas para futuros astronautas." },
      { slug: "rompecabezas-huesos", title: "Rompecabezas de huesos", icon: "🧩", blurb: "Arma el esqueleto completo." },
      { slug: "caza-fosiles",      title: "Caza de fósiles",      icon: "🔍", blurb: "Encuentra los fósiles escondidos." },
      { slug: "linea-tiempo",      title: "Línea del tiempo",     icon: "📜", blurb: "Ordena los eventos históricos." },
      { slug: "sopa-letras",       title: "Sopa de letras",       icon: "🔤", blurb: "Encuentra palabras de todos los temas." },
    ],
  },
];

function getCategoryById(id) {
  return CATEGORIES.find((c) => c.id === id) || null;
}

function getTopicBySlug(catId, topicSlug) {
  const cat = getCategoryById(catId);
  if (!cat) return null;
  const topic = cat.topics.find((t) => t.slug === topicSlug) || null;
  return topic ? { category: cat, topic } : null;
}
