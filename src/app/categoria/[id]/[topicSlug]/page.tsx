"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

/* =========================================================
   CATEGORY DATA (shared structure)
   ========================================================= */

interface TopicDetail {
  intro: string;
  stats: { icon: string; label: string; value: string }[];
  explanation: string;
  videoId: string;
  videoTitle: string;
  facts: string[];
  mascotLine: string;
}

interface Topic {
  title: string;
  slug: string;
  icon: string;
  blurb: string;
  detail?: TopicDetail;
}

interface Category {
  id: string;
  label: string;
  icon: string;
  variant: string;
  mascotCostume: string;
  mascotMessages: string[];
  topics: Topic[];
}

const CATEGORIES: Category[] = [
  {
    id: "aritmetica",
    label: "Aritmética",
    icon: "🔢",
    variant: "orange",
    mascotCostume: "abaco",
    mascotMessages: [
      "¡Números por todas partes! Elige un tema para empezar a contar 🔢",
      "¿Sabías que los números negativos tardaron siglos en ser aceptados?",
      "Con mi ábaco puedo hacer cualquier operación. ¡Vamos!",
    ],
    topics: [
      { title: "Números Naturales", slug: "numeros-naturales", icon: "1️⃣", blurb: "El conjunto ℕ: los números para contar." },
      { title: "Operaciones Básicas", slug: "operaciones-basicas", icon: "➕", blurb: "Suma, resta, multiplicación y división." },
      { title: "Números Enteros", slug: "numeros-enteros", icon: "➖", blurb: "Positivos, negativos y el cero." },
      { title: "Fracciones", slug: "fracciones", icon: "½", blurb: "Partes de un todo: numerador y denominador." },
      { title: "Potencias y Raíces", slug: "potencias-y-raices", icon: "²", blurb: "Elevar números y encontrar sus raíces." },
      { title: "Divisibilidad", slug: "divisibilidad", icon: "÷", blurb: "Primos, MCD, MCM y criterios." },
    ],
  },
  {
    id: "algebra",
    label: "Álgebra",
    icon: "𝑥",
    variant: "purple",
    mascotCostume: "profesor",
    mascotMessages: [
      "¡Pizarra lista! Vamos a despejar la incógnita 🧮",
      "¿Sabías que el álgebra viene del árabe 'al-jabr' que significa 'restauración'?",
      "Cada ecuación es un misterio esperando ser resuelto.",
    ],
    topics: [
      { title: "Expresiones Algebraicas", slug: "expresiones-algebraicas", icon: "📝", blurb: "Monomios, binomios y polinomios." },
      { title: "Ecuaciones Lineales", slug: "ecuaciones-lineales", icon: "⚖️", blurb: "Ecuaciones de primer grado y sus soluciones." },
      { title: "Sistemas de Ecuaciones", slug: "sistemas-de-ecuaciones", icon: "🔗", blurb: "Dos o más ecuaciones trabajando juntas." },
      { title: "Productos Notables", slug: "productos-notables", icon: "✖️", blurb: "Atajos algebraicos que simplifican todo." },
      { title: "Factorización", slug: "factorizacion", icon: "🧩", blurb: "Descomponer expresiones en sus factores." },
      { title: "Funciones", slug: "funciones", icon: "📈", blurb: "Relaciones entre variables: f(x)." },
    ],
  },
  {
    id: "geometria",
    label: "Geometría",
    icon: "📐",
    variant: "green",
    mascotCostume: "compas",
    mascotMessages: [
      "¡Compás y regla listos! Vamos a construir figuras perfectas 📐",
      "¿Sabías que el triángulo es la forma estructural más resistente?",
      "Cada forma tiene secretos geométricos esperando ser descubiertos.",
    ],
    topics: [
      { title: "Triángulos", slug: "triangulos", icon: "🔺", blurb: "Tipos, propiedades y el teorema de Pitágoras." },
      { title: "Circunferencia y Círculo", slug: "circunferencia-y-circulo", icon: "⭕", blurb: "Pi, radio, diámetro y más." },
      { title: "Polígonos", slug: "poligonos", icon: "⬡", blurb: "Figuras de muchos lados y sus propiedades." },
      { title: "Perímetro y Área", slug: "perimetro-y-area", icon: "📏", blurb: "Medir contornos y superficies." },
      { title: "Volumen", slug: "volumen", icon: "📦", blurb: "El espacio que ocupan los cuerpos 3D." },
      { title: "Geometría Analítica", slug: "geometria-analitica", icon: "📍", blurb: "Coordenadas, rectas y distancias." },
    ],
  },
  {
    id: "trigonometria",
    label: "Trigonometría",
    icon: "📈",
    variant: "pink",
    mascotCostume: "transportador",
    mascotMessages: [
      "¡Transportador en mano! Vamos a medir ángulos 📐",
      "¿Sabías que la trigonometría se inventó para estudiar las estrellas?",
      "Seno, coseno, tangente... ¡son más amigables de lo que parecen!",
    ],
    topics: [
      { title: "Razones Trigonométricas", slug: "razones-trigonometricas", icon: "📊", blurb: "Seno, coseno y tangente en triángulos rectángulos." },
      { title: "Círculo Unitario", slug: "circulo-unitario", icon: "🎯", blurb: "El círculo que explica toda la trigonometría." },
      { title: "Identidades", slug: "identidades", icon: "🔄", blurb: "Ecuaciones que siempre son verdaderas." },
      { title: "Ley de Senos y Cosenos", slug: "ley-de-senos-y-cosenos", icon: "⚖️", blurb: "Resolver cualquier triángulo." },
      { title: "Funciones Trigonométricas", slug: "funciones-trigonometricas", icon: "〰️", blurb: "Gráficas de seno, coseno y tangente." },
      { title: "Aplicaciones", slug: "aplicaciones-trigonometria", icon: "🏗️", blurb: "Alturas, distancias y problemas reales." },
    ],
  },
  {
    id: "calculo",
    label: "Cálculo",
    icon: "∫",
    variant: "",
    mascotCostume: "birrete",
    mascotMessages: [
      "¡Nivel avanzado! Vamos a explorar el infinito 🎓",
      "¿Sabías que Newton y Leibniz inventaron el cálculo casi al mismo tiempo?",
      "Cada derivada cuenta cómo cambian las cosas. Cada integral las acumula.",
    ],
    topics: [
      { title: "Límites", slug: "limites", icon: "🎯", blurb: "Qué pasa cuando x se acerca a un valor." },
      { title: "Derivadas", slug: "derivadas", icon: "📉", blurb: "La tasa de cambio instantánea." },
      { title: "Reglas de Derivación", slug: "reglas-de-derivacion", icon: "📋", blurb: "Potencia, cadena, producto y cociente." },
      { title: "Integrales", slug: "integrales", icon: "∫", blurb: "El camino inverso de la derivada." },
      { title: "Aplicaciones", slug: "aplicaciones-calculo", icon: "📊", blurb: "Áreas, volúmenes y problemas de optimización." },
      { title: "Teorema Fundamental", slug: "teorema-fundamental-calculo", icon: "⭐", blurb: "El puente entre derivadas e integrales." },
    ],
  },
  {
    id: "estadistica",
    label: "Estadística",
    icon: "📊",
    variant: "yellow",
    mascotCostume: "grafico",
    mascotMessages: [
      "¡Datos por analizar! Vamos a encontrar patrones 📊",
      "¿Sabías que la media, mediana y moda pueden dar resultados muy diferentes?",
      "Los datos cuentan historias si sabes cómo leerlos.",
    ],
    topics: [
      { title: "Medidas de Tendencia Central", slug: "medidas-tendencia-central", icon: "📏", blurb: "Media, mediana y moda." },
      { title: "Medidas de Dispersión", slug: "medidas-de-dispersion", icon: "↔️", blurb: "Rango, varianza y desviación estándar." },
      { title: "Gráficos Estadísticos", slug: "graficos-estadisticos", icon: "📈", blurb: "Barras, histogramas, circulares y más." },
      { title: "Distribución Normal", slug: "distribucion-normal", icon: "🔔", blurb: "La campana de Gauss y sus propiedades." },
      { title: "Muestreo", slug: "muestreo", icon: "🎣", blurb: "Cómo elegir datos representativos." },
      { title: "Regresión", slug: "regresion", icon: "📐", blurb: "Encontrar la línea que mejor se ajusta." },
    ],
  },
  {
    id: "probabilidad",
    label: "Probabilidad",
    icon: "🎲",
    variant: "orange",
    mascotCostume: "mago",
    mascotMessages: [
      "¡Abracadabra! ¿Cuál es la probabilidad de sacar un as? 🎩",
      "¿Sabías que lanzar una moneda NO siempre es 50/50 en la realidad?",
      "El azar tiene reglas. ¡Y podemos calcularlas!",
    ],
    topics: [
      {
        title: "Eventos y Espacio Muestral",
        slug: "eventos-espacio-muestral",
        icon: "🎯",
        blurb: "Los posibles resultados de un experimento.",
        detail: {
          intro: "El espacio muestral es el conjunto de todos los resultados posibles de un experimento aleatorio, y los eventos son subconjuntos de ese espacio. Comprender estos conceptos es el primer paso para calcular cualquier probabilidad, ya que definen el universo de posibilidades sobre el cual trabajamos.",
          stats: [
            { icon: "📝", label: "Notación", value: "S, Ω" },
            { icon: "🔀", label: "Tipos", value: "Simple / Compuesto" },
            { icon: "🎲", label: "Ejemplo", value: "Dado: 6 elementos" },
          ],
          explanation: `El espacio muestral (S o Ω) es el conjunto universal de un experimento aleatorio:\n\nS = {todos los resultados posibles}\n\nEjemplo — Lanzar un dado:\nS = {1, 2, 3, 4, 5, 6}\n\nTipos de eventos:\n• Evento simple: contiene un solo resultado. Ej: {3}\n• Evento compuesto: contiene más de un resultado. Ej: {2, 4, 6} (números pares)\n• Evento seguro: coincide con todo el espacio muestral S\n• Evento imposible: el conjunto vacío ∅\n• Eventos complementarios: A y A' donde A' = S - A\n• Eventos mutuamente excluyentes: A ∩ B = ∅ (no pueden ocurrir al mismo tiempo)\n\nEjemplo — Lanzar una moneda dos veces:\nS = {(cara, cara), (cara, sello), (sello, cara), (sello, sello)}\nEvento A = "al menos una cara" = {(C,C), (C,S), (S,C)}\nEvento complementario A' = "ninguna cara" = {(S,S)}`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Eventos y Espacio Muestral — Probabilidad",
          facts: [
            "Un espacio muestral puede ser finito (dado), infinito numerable (lanzar una moneda hasta obtener cara) o infinito no numerable (elegir un punto al azar en una recta).",
            "El concepto de espacio muestral fue formalizado por el matemático ruso Andréi Kolmogórov en 1933 con sus axiomas de probabilidad.",
            "En la vida real, definir correctamente el espacio muestral es la parte más difícil de un problema de probabilidad — un error aquí invalida todo el cálculo.",
          ],
          mascotLine: "¡Antes de calcular cualquier probabilidad, necesitas conocer TODAS las posibilidades! El espacio muestral es tu mapa del tesoro 🗺️",
        },
      },
      {
        title: "Probabilidad Clásica",
        slug: "probabilidad-clasica",
        icon: "🎲",
        blurb: "Casos favorables sobre casos posibles.",
        detail: {
          intro: "La probabilidad clásica es la forma más básica de medir las posibilidades de que un evento ocurra. Se calcula dividiendo el número de resultados favorables entre el número total de resultados posibles en un experimento donde todos los resultados son igualmente probables.",
          stats: [
            { icon: "📐", label: "Fórmula", value: "P(A) = n(A) / n(S)" },
            { icon: "📏", label: "Rango", value: "0 ≤ P(A) ≤ 1" },
            { icon: "🎯", label: "Condición", value: "Equiprobable" },
          ],
          explanation: `La fórmula fundamental de la probabilidad clásica es:\n\nP(A) = Casos favorables / Casos posibles\n\nDonde:\n• P(A) es la probabilidad del evento A\n• n(A) es el número de resultados favorables al evento A\n• n(S) es el número total de resultados en el espacio muestral S\n\nEjemplo: Al lanzar un dado justo de 6 caras, la probabilidad de obtener un número par es:\nP(par) = 3/6 = 1/2 = 0.5 = 50%\n\nLos resultados favorables son {2, 4, 6} (3 resultados) de un total de {1, 2, 3, 4, 5, 6} (6 resultados posibles).`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Probabilidad Clásica",
          facts: [
            "Si lanzas una moneda al aire, la probabilidad de obtener cara es exactamente 1/2, pero en la práctica necesitas miles de lanzamientos para acercarte a ese valor.",
            "El estudio formal de la probabilidad nació en el siglo XVII cuando dos matemáticos franceses (Pascal y Fermat) discutieron un problema de juegos de azar por carta.",
            "La probabilidad de que dos personas en un grupo de 23 compartan cumpleaños es mayor al 50% — esto se conoce como la Paradoja del Cumpleaños.",
          ],
          mascotLine: "¡Cada vez que lanzas un dado, las matemáticas están trabajando! La probabilidad nos ayuda a predecir el futuro... al menos un poquito 🎲",
        },
      },
      {
        title: "Probabilidad Condicional",
        slug: "probabilidad-condicional",
        icon: "🔗",
        blurb: "Cuando un evento depende de otro.",
        detail: {
          intro: "La probabilidad condicional mide la probabilidad de que ocurra un evento A, dado que ya sabemos que otro evento B ha ocurrido. Es fundamental para entender cómo la información nueva cambia nuestras expectativas sobre el mundo.",
          stats: [
            { icon: "📐", label: "Fórmula", value: "P(A|B)" },
            { icon: "⚠️", label: "Condición", value: "P(B) > 0" },
            { icon: "🔗", label: "Relación", value: "Dependencia" },
          ],
          explanation: `La fórmula de probabilidad condicional es:\n\nP(A|B) = P(A ∩ B) / P(B)\n\nDonde:\n• P(A|B) = probabilidad de A dado que B ocurrió\n• P(A ∩ B) = probabilidad de que ambos ocurran\n• P(B) = probabilidad del evento condicionante (debe ser > 0)\n\nEventos independientes vs dependientes:\n• Independientes: P(A|B) = P(A) — saber que B ocurrió no cambia la probabilidad de A\n• Dependientes: P(A|B) ≠ P(A) — la ocurrencia de B afecta a A\n\nEjemplo — Urna con 5 bolas rojas y 3 azules (sin reposición):\nP(2ª roja | 1ª fue roja) = 4/7\nComo sacamos una roja primero, quedan 4 rojas de 7 bolas totales.\n\nEjemplo — Baraja española (40 cartas):\nP(Rey | carta de oros) = 1/10\nSi sabemos que la carta es de oros (10 cartas), solo 1 es rey.\n\nRegla de la multiplicación:\nP(A ∩ B) = P(A|B) · P(B) = P(B|A) · P(A)`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Probabilidad Condicional — Fórmula y Ejemplos",
          facts: [
            "La probabilidad condicional es la base de los filtros de spam: P(spam | contiene 'oferta gratis') es mucho mayor que P(spam) sin esa información.",
            "El error más común con probabilidad condicional se llama 'falacia del fiscal': confundir P(evidencia|inocente) con P(inocente|evidencia).",
            "Los algoritmos de recomendación de Netflix y Spotify usan probabilidad condicional: P(te guste película X | te gustó película Y).",
          ],
          mascotLine: "¡Cuando ya tienes una pista, las probabilidades cambian! Es como ser detective matemático 🕵️",
        },
      },
      {
        title: "Combinatoria",
        slug: "combinatoria",
        icon: "🔢",
        blurb: "Permutaciones, combinaciones y variaciones.",
        detail: {
          intro: "La combinatoria es la rama de las matemáticas que estudia cómo contar agrupaciones de elementos sin necesidad de listarlos todos. Es la herramienta esencial para calcular espacios muestrales grandes y resolver problemas de probabilidad complejos.",
          stats: [
            { icon: "🔄", label: "Permutaciones", value: "nPr" },
            { icon: "🤝", label: "Combinaciones", value: "nCr" },
            { icon: "❗", label: "Factorial", value: "n!" },
          ],
          explanation: `Principio fundamental de conteo:\nSi una tarea se puede hacer en m formas y otra en n formas, ambas juntas se pueden hacer en m × n formas.\n\nFactorial:\nn! = n × (n-1) × (n-2) × ... × 2 × 1\nEjemplo: 5! = 5 × 4 × 3 × 2 × 1 = 120\nCaso especial: 0! = 1\n\nPermutaciones (el ORDEN importa):\nnPr = n! / (n-r)!\nEjemplo: ¿De cuántas formas puedo sentar a 3 personas de un grupo de 5 en una fila?\n5P3 = 5! / 2! = 120 / 2 = 60 formas\n\nCombinaciones (el ORDEN NO importa):\nnCr = n! / [r! × (n-r)!]\nEjemplo: ¿De cuántas formas puedo elegir un comité de 3 personas de un grupo de 5?\n5C3 = 5! / (3! × 2!) = 120 / 12 = 10 formas\n\nDiferencia clave:\n• Permutación: elegir presidente, vice y secretario (ABC ≠ BAC)\n• Combinación: elegir un equipo de 3 (ABC = BAC = CAB)`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Combinatoria — Permutaciones y Combinaciones",
          facts: [
            "El número de formas de ordenar una baraja de 52 cartas (52!) es tan grande que es prácticamente imposible que dos barajas hayan sido mezcladas en el mismo orden en toda la historia.",
            "La combinatoria se usa para calcular las probabilidades de ganar la lotería: en un 6/49, hay C(49,6) = 13,983,816 combinaciones posibles.",
            "Los códigos de seguridad de los candados usan permutaciones: un candado de 3 dígitos (0-9) tiene 10P3 = 720 posibilidades si no se repiten dígitos, o 10³ = 1000 si se permiten repeticiones.",
          ],
          mascotLine: "¡Contar sin contar uno por uno! La combinatoria es el superpoder secreto de la probabilidad 🦸‍♂️",
        },
      },
      {
        title: "Distribuciones",
        slug: "distribuciones",
        icon: "📊",
        blurb: "Binomial, Poisson y otras distribuciones.",
        detail: {
          intro: "Las distribuciones de probabilidad describen cómo se reparten las probabilidades entre los posibles valores de una variable aleatoria. Son modelos matemáticos que nos permiten predecir el comportamiento de fenómenos aleatorios en la vida real.",
          stats: [
            { icon: "🎯", label: "Binomial", value: "(n, p)" },
            { icon: "🔔", label: "Normal", value: "(μ, σ)" },
            { icon: "⚡", label: "Poisson", value: "(λ)" },
          ],
          explanation: `Una variable aleatoria asigna un valor numérico a cada resultado del espacio muestral.\n\nDistribución Binomial — "éxito o fracaso":\nP(X = k) = C(n,k) · p^k · (1-p)^(n-k)\n\nDonde:\n• n = número de ensayos independientes\n• k = número de éxitos deseados\n• p = probabilidad de éxito en cada ensayo\n\nEjemplo: Lanzar una moneda 10 veces, ¿probabilidad de exactamente 7 caras?\nP(X=7) = C(10,7) · (0.5)^7 · (0.5)^3 = 120 · 0.0078 · 0.125 ≈ 0.117\n\nDistribución Normal (Campana de Gauss):\n• Simétrica respecto a la media μ\n• El 68% de los datos está a ±1σ de μ\n• El 95% está a ±2σ de μ\n• El 99.7% está a ±3σ de μ\n\nDistribución Poisson — "eventos raros en un intervalo":\nP(X = k) = (λ^k · e^(-λ)) / k!\n• λ = número promedio de eventos en el intervalo\n• Ejemplo: si llegan en promedio 3 clientes/hora, P(lleguen 5) = (3^5 · e^(-3)) / 5! ≈ 0.1008\n\n¿Cuándo usar cada una?\n• Binomial: número fijo de intentos con sí/no\n• Normal: datos continuos con distribución simétrica\n• Poisson: contar eventos raros en tiempo/espacio`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Distribuciones de Probabilidad — Binomial, Normal y Poisson",
          facts: [
            "La distribución normal aparece en todas partes: alturas humanas, errores de medición, calificaciones de exámenes e incluso el movimiento de partículas en un líquido (movimiento browniano).",
            "La distribución Poisson debe su nombre a Siméon Denis Poisson, quien la usó en 1838 para modelar el número de soldados prusianos muertos por coces de caballo por año.",
            "Cuando n es grande y p es pequeño, la distribución binomial se aproxima a una Poisson con λ = np. Y cuando n es grande, la binomial se aproxima a la normal — todo está conectado.",
          ],
          mascotLine: "¡Cada distribución es como un molde que la naturaleza usa para repartir probabilidades! Aprende cuál usar y predecirás el mundo 🔮",
        },
      },
      {
        title: "Teorema de Bayes",
        slug: "teorema-de-bayes",
        icon: "🧠",
        blurb: "Actualizar probabilidades con nueva información.",
        detail: {
          intro: "El Teorema de Bayes es una herramienta poderosa que nos permite actualizar la probabilidad de una hipótesis cuando obtenemos nueva evidencia. Es la base de la inteligencia artificial moderna, el diagnóstico médico y el aprendizaje automático.",
          stats: [
            { icon: "📐", label: "Fórmula", value: "Bayes" },
            { icon: "🔄", label: "Uso", value: "Actualizar" },
            { icon: "🧩", label: "Componentes", value: "Prior / Posterior" },
          ],
          explanation: `El Teorema de Bayes:\n\nP(A|B) = [P(B|A) · P(A)] / P(B)\n\nComponentes:\n• P(A) = probabilidad a priori (lo que creemos ANTES de la evidencia)\n• P(A|B) = probabilidad a posteriori (lo que creemos DESPUÉS de la evidencia)\n• P(B|A) = verosimilitud (qué tan probable es ver la evidencia si A es verdad)\n• P(B) = probabilidad total de la evidencia\n\nEjemplo médico — Prueba de una enfermedad:\n• La enfermedad afecta al 1% de la población: P(E) = 0.01\n• La prueba detecta correctamente al 99% de los enfermos: P(+|E) = 0.99\n• La prueba da falso positivo en el 5% de los sanos: P(+|¬E) = 0.05\n\nSi das positivo, ¿cuál es la probabilidad real de estar enfermo?\n\nP(E|+) = P(+|E) · P(E) / P(+)\nP(+) = P(+|E)·P(E) + P(+|¬E)·P(¬E) = 0.99·0.01 + 0.05·0.99 = 0.0099 + 0.0495 = 0.0594\n\nP(E|+) = 0.0099 / 0.0594 ≈ 0.167 = 16.7%\n\n¡Aunque diste positivo, solo hay un 16.7% de probabilidad de estar enfermo! Esto ocurre porque la enfermedad es rara (baja probabilidad a priori).\n\nAplicaciones:\n• Filtros de spam (¿es spam dado estas palabras?)\n• Diagnóstico médico\n• Inteligencia artificial y machine learning\n• Predicción meteorológica`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Teorema de Bayes — Explicación y Ejemplo Médico",
          facts: [
            "El Teorema de Bayes fue descubierto por el reverendo Thomas Bayes en el siglo XVIII, pero su trabajo fue publicado póstumamente por su amigo Richard Price en 1763.",
            "Los filtros de spam de Gmail usan el Teorema de Bayes: calculan P(spam | palabras del correo) para decidir si un mensaje va a la bandeja de spam.",
            "Durante la Segunda Guerra Mundial, Alan Turing usó métodos bayesianos para descifrar el código Enigma de los nazis, acortando la guerra en aproximadamente 2 años.",
          ],
          mascotLine: "¡Bayes te enseña a cambiar de opinión con elegancia matemática! Nueva evidencia = nueva probabilidad 🧠✨",
        },
      },
    ],
  },
  {
    id: "discreta",
    label: "M. Discreta",
    icon: "🔗",
    variant: "purple",
    mascotCostume: "circuito",
    mascotMessages: [
      "¡Nodos y conexiones! Vamos a pensar como una computadora 🖥️",
      "¿Sabías que los grafos se usan para resolver laberintos y planear rutas?",
      "La lógica es el lenguaje secreto de las máquinas.",
    ],
    topics: [
      { title: "Teoría de Conjuntos", slug: "teoria-de-conjuntos", icon: "⊂", blurb: "Unión, intersección y complemento." },
      { title: "Lógica Proposicional", slug: "logica-proposicional", icon: "∧", blurb: "Verdadero, falso y conectivos lógicos." },
      { title: "Grafos", slug: "grafos", icon: "🕸️", blurb: "Nodos, aristas y caminos." },
      { title: "Árboles", slug: "arboles", icon: "🌳", blurb: "Estructuras jerárquicas sin ciclos." },
      { title: "Relaciones", slug: "relaciones", icon: "↔️", blurb: "Conexiones entre elementos de conjuntos." },
      { title: "Algoritmos Básicos", slug: "algoritmos-basicos", icon: "⚡", blurb: "Pasos para resolver problemas." },
    ],
  },
  {
    id: "numeros",
    label: "T. Números",
    icon: "∞",
    variant: "green",
    mascotCostume: "lupa",
    mascotMessages: [
      "¡Lupa lista! Vamos a buscar patrones en los números 🔍",
      "¿Sabías que nadie ha encontrado un patrón en los números primos?",
      "Cada número tiene una historia fascinante que contar.",
    ],
    topics: [
      { title: "Números Primos", slug: "numeros-primos", icon: "🔑", blurb: "Los bloques fundamentales de los enteros." },
      { title: "Divisibilidad", slug: "divisibilidad-numeros", icon: "➗", blurb: "Quién divide a quién y por qué importa." },
      { title: "Congruencias", slug: "congruencias", icon: "≡", blurb: "Aritmética modular y sus aplicaciones." },
      { title: "Sucesiones Famosas", slug: "sucesiones-famosas", icon: "🌀", blurb: "Fibonacci, triangulares y más patrones." },
      { title: "Teorema Fundamental", slug: "teorema-fundamental-aritmetica", icon: "⭐", blurb: "Todo entero es producto de primos." },
      { title: "Números Perfectos", slug: "numeros-perfectos", icon: "💎", blurb: "Números iguales a la suma de sus divisores." },
    ],
  },
];

/* =========================================================
   MASCOT COSTUMES
   ========================================================= */

const COSTUMES: Record<string, string> = {
  abaco: `
    <rect x="65" y="140" width="30" height="4" rx="2" fill="#8C6B3F" stroke="#1B3A4B" stroke-width="2"/>
    <circle cx="72" cy="142" r="3" fill="#FF6B35"/>
    <circle cx="80" cy="142" r="3" fill="#29ABE2"/>
    <circle cx="88" cy="142" r="3" fill="#4CAF50"/>
  `,
  profesor: `
    <rect x="62" y="90" width="15" height="10" rx="3" fill="none" stroke="#1B3A4B" stroke-width="3"/>
    <rect x="123" y="90" width="15" height="10" rx="3" fill="none" stroke="#1B3A4B" stroke-width="3"/>
    <line x1="77" y1="95" x2="123" y2="95" stroke="#1B3A4B" stroke-width="2"/>
    <rect x="140" y="160" width="24" height="5" rx="2" fill="#FFFDF7" stroke="#1B3A4B" stroke-width="2"/>
  `,
  compas: `
    <line x1="55" y1="50" x2="45" y2="80" stroke="#8C8C8C" stroke-width="3" stroke-linecap="round"/>
    <line x1="55" y1="50" x2="65" y2="80" stroke="#8C8C8C" stroke-width="3" stroke-linecap="round"/>
    <circle cx="55" cy="50" r="3" fill="#1B3A4B"/>
    <polygon points="42,80 48,80 45,86" fill="#1B3A4B"/>
  `,
  transportador: `
    <path d="M55 55 A35 35 0 0 1 145 55" fill="rgba(255,107,53,0.3)" stroke="#1B3A4B" stroke-width="3"/>
    <line x1="100" y1="55" x2="100" y2="30" stroke="#1B3A4B" stroke-width="2"/>
    <line x1="100" y1="55" x2="130" y2="35" stroke="#FF6B35" stroke-width="2"/>
    <circle cx="100" cy="55" r="3" fill="#1B3A4B"/>
  `,
  birrete: `
    <polygon points="60,52 100,38 140,52 100,66" fill="#1B3A4B"/>
    <rect x="85" y="52" width="30" height="8" fill="#2E5266"/>
    <line x1="130" y1="52" x2="140" y2="70" stroke="#FFC914" stroke-width="2"/>
    <circle cx="140" cy="72" r="4" fill="#FFC914"/>
  `,
  grafico: `
    <rect x="135" y="120" width="30" height="38" rx="3" fill="#FFFDF7" stroke="#1B3A4B" stroke-width="3"/>
    <rect x="140" y="116" width="20" height="8" rx="2" fill="#8C6B3F" stroke="#1B3A4B" stroke-width="2"/>
    <rect x="140" y="132" width="5" height="12" fill="#4CAF50"/>
    <rect x="147" y="128" width="5" height="16" fill="#29ABE2"/>
    <rect x="154" y="135" width="5" height="9" fill="#FF6B35"/>
  `,
  mago: `
    <ellipse cx="100" cy="58" rx="40" ry="8" fill="#2E5266" stroke="#1B3A4B" stroke-width="3"/>
    <path d="M75 58 L80 20 L120 20 L125 58" fill="#1B3A4B" stroke="#1B3A4B" stroke-width="2"/>
    <rect x="78" y="48" width="44" height="10" fill="#8E7CC3"/>
    <text x="96" y="40" font-size="12" fill="#FFC914" font-weight="bold">✦</text>
  `,
  circuito: `
    <line x1="100" y1="10" x2="100" y2="30" stroke="#8C8C8C" stroke-width="3"/>
    <circle cx="100" cy="8" r="4" fill="#FF6B35" stroke="#1B3A4B" stroke-width="2"/>
    <circle cx="92" cy="15" r="2" fill="#4CAF50"/>
    <circle cx="108" cy="15" r="2" fill="#29ABE2"/>
  `,
  lupa: `
    <circle cx="50" cy="60" r="14" fill="rgba(200,230,255,0.3)" stroke="#1B3A4B" stroke-width="4"/>
    <line x1="60" y1="70" x2="72" y2="82" stroke="#8C6B3F" stroke-width="4" stroke-linecap="round"/>
    <text x="44" y="65" font-size="10" fill="#1B3A4B" font-weight="bold">7</text>
  `,
};

/* =========================================================
   COMPONENT
   ========================================================= */

export default function ArticuloPage() {
  const params = useParams();
  const router = useRouter();
  const catId = params.id as string;
  const topicSlug = params.topicSlug as string;

  const category = CATEGORIES.find((c) => c.id === catId);
  const topic = category?.topics.find((t) => t.slug === topicSlug);

  const [soundOn, setSoundOn] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [mascotMessage, setMascotMessage] = useState("");
  const [showMascotBubble, setShowMascotBubble] = useState(true);
  const msgIndexRef = useRef(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Set initial mascot message
  useEffect(() => {
    if (topic?.detail) {
      setMascotMessage(topic.detail.mascotLine);
    } else if (category) {
      setMascotMessage(`Este tema todavía no tiene contenido — ¡pero pronto lo tendrá! ${category.icon}`);
    }
  }, [topic, category]);

  // Redirect if not found
  useEffect(() => {
    if (!category || !topic) {
      router.replace("/");
    }
  }, [category, topic, router]);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2400);
  }, []);

  const playClick = useCallback(() => {
    if (!soundOn) return;
  }, [soundOn]);

  const handleSoundToggle = useCallback(() => {
    setSoundOn((prev) => {
      const next = !prev;
      showToast(next ? "Sonido activado" : "Sonido desactivado");
      return next;
    });
  }, [showToast]);

  const handleHelp = useCallback(() => {
    playClick();
    showToast("Toca a Sabio para escuchar otro dato, o usa la ruta de arriba para volver");
  }, [playClick, showToast]);

  const handleMascotClick = useCallback(() => {
    if (!category || !topic) return;
    playClick();
    setShowMascotBubble(true);

    if (topic.detail) {
      // Toggle between topic mascot line and category messages
      msgIndexRef.current = (msgIndexRef.current + 1) % (category.mascotMessages.length + 1);
      if (msgIndexRef.current === 0) {
        setMascotMessage(topic.detail.mascotLine);
      } else {
        setMascotMessage(category.mascotMessages[msgIndexRef.current - 1]);
      }
    } else {
      msgIndexRef.current = (msgIndexRef.current + 1) % category.mascotMessages.length;
      setMascotMessage(category.mascotMessages[msgIndexRef.current]);
    }
  }, [category, topic, playClick]);

  if (!category || !topic) {
    return null;
  }

  const costumeMarkup = COSTUMES[category.mascotCostume] || "";
  const heroVariant = category.variant ? ` art-hero--${category.variant}` : "";

  // Render full article for topics with detail
  const renderFullArticle = () => {
    const d = topic.detail!;

    // Parse explanation into paragraphs
    const explanationParts = d.explanation.split("\n\n");

    return (
      <>
        {/* Hero */}
        <section className={`art-hero${heroVariant}`} aria-label={topic.title}>
          <div className="art-hero__icon" aria-hidden="true">{topic.icon}</div>
          <div className="art-hero__text">
            <span className="art-hero__badge">{category.icon} {category.label}</span>
            <h2 className="art-hero__title">{topic.title}</h2>
            <p className="art-hero__intro">{d.intro}</p>
          </div>
        </section>

        {/* Stats row */}
        <section className="stats-row" aria-label="Datos rápidos">
          {d.stats.map((s) => (
            <div className="stat-chip" key={s.label}>
              <span className="stat-chip__icon" aria-hidden="true">{s.icon}</span>
              <span>
                <span className="stat-chip__label">{s.label}</span>
                <span className="stat-chip__value">{s.value}</span>
              </span>
            </div>
          ))}
        </section>

        {/* Content / Explanation */}
        <section className="content-section" aria-label="Explicación">
          <h3>Explicación detallada</h3>
          {explanationParts.map((part, i) => {
            // Check if it's the formula line
            if (part.includes("P(A) = Casos favorables / Casos posibles")) {
              return (
                <span className="formula-highlight" key={i}>
                  P(A) = Casos favorables / Casos posibles
                </span>
              );
            }
            // Check if it contains bullet points
            if (part.includes("• ")) {
              const lines = part.split("\n");
              const title = lines[0].endsWith(":") ? lines[0] : null;
              const items = lines.filter((l) => l.startsWith("• "));
              return (
                <div key={i}>
                  {title && <p>{title}</p>}
                  <ul>
                    {items.map((item, j) => (
                      <li key={j}>{item.replace("• ", "")}</li>
                    ))}
                  </ul>
                </div>
              );
            }
            return <p key={i}>{part}</p>;
          })}
        </section>

        {/* Video section */}
        <section className="video-section" aria-label="Video educativo">
          <div className="video-section__title">🎬 {d.videoTitle}</div>
          <iframe
            src={`https://www.youtube.com/embed/${d.videoId}`}
            title={d.videoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </section>

        {/* Facts */}
        <section className="facts" aria-label="Datos curiosos">
          <h3>Datos curiosos</h3>
          <div className="facts-grid">
            {d.facts.map((fact, i) => (
              <div className="fact-card" key={i}>{fact}</div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="cta-banner" aria-label="Poner a prueba lo aprendido">
          <span className="cta-banner__text">¿Listo para practicar? Pon a prueba lo que aprendiste sobre {topic.title}</span>
          <button className="cta-banner__btn" type="button" onClick={() => showToast("¡Juegos próximamente!")}>
            Ir a Juegos 🎉
          </button>
        </section>
      </>
    );
  };

  // Render empty state for topics without detail
  const renderEmptyState = () => (
    <>
      <section className={`art-hero${heroVariant}`} aria-label={topic.title}>
        <div className="art-hero__icon" aria-hidden="true">{topic.icon}</div>
        <div className="art-hero__text">
          <span className="art-hero__badge">{category.icon} {category.label}</span>
          <h2 className="art-hero__title">{topic.title}</h2>
          <p className="art-hero__intro">{topic.blurb}</p>
        </div>
      </section>

      <div className="empty-state">
        <span className="empty-state__icon" aria-hidden="true">🚧</span>
        <p className="empty-state__title">Este tema todavía se está armando</p>
        <p className="empty-state__text">
          Pronto encontrarás aquí la explicación completa, datos curiosos y ejercicios.
        </p>
      </div>
    </>
  );

  return (
    <main className="console" role="application" aria-label={`${topic.title} — ${category.label} — ChalkApp`}>
      {/* Titlebar */}
      <header className="titlebar">
        <div className="titlebar__brand">
          <Link href="/" className="chip-btn chip-btn--back" style={{ textDecoration: "none" }}>
            <span className="chip-btn__icon">⬅️</span>
            <span className="chip-btn__label">Estante</span>
          </Link>
          <nav className="breadcrumb" aria-label="Ruta de navegación">
            <Link href="/">Estante</Link>
            <span aria-hidden="true">›</span>
            <Link href={`/categoria/${category.id}`}>{category.label}</Link>
            <span aria-hidden="true">›</span>
            <span className="breadcrumb__current">{topic.title}</span>
          </nav>
        </div>
        <div className="titlebar__controls">
          <button
            className="chip-btn"
            type="button"
            aria-pressed={soundOn}
            onClick={handleSoundToggle}
          >
            <span className="chip-btn__icon">{soundOn ? "🔊" : "🔇"}</span>
            <span className="chip-btn__label">Sonido</span>
          </button>
          <button className="chip-btn" type="button" onClick={handleHelp}>
            <span className="chip-btn__icon">❓</span>
            <span className="chip-btn__label">Ayuda</span>
          </button>
        </div>
      </header>

      {/* Article stage */}
      <div className="art-stage">
        {topic.detail ? renderFullArticle() : renderEmptyState()}
      </div>

      {/* Mascot (fixed bottom-right) */}
      <div className="mascot-art">
        {showMascotBubble && (
          <div className="mascot-art__bubble">{mascotMessage}</div>
        )}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <svg
          className="mascot-art__figure"
          viewBox="0 0 200 220"
          aria-hidden="true"
          onClick={handleMascotClick}
          dangerouslySetInnerHTML={{
            __html: `
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
              ${costumeMarkup}
            `,
          }}
        />
      </div>

      {/* Toast */}
      <div
        className={`toast${toastVisible ? " is-visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {toastMessage}
      </div>

      {/* Footer */}
      <footer className="console-footer">
        Creado por Salomé Murcia Muñoz
      </footer>
    </main>
  );
}
