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
      {
        title: "Números Naturales", slug: "numeros-naturales", icon: "1️⃣", blurb: "El conjunto ℕ: los números para contar.",
        detail: {
          intro: "Los números naturales son los primeros que aprendemos: 1, 2, 3, 4... Son la base de toda la matemática y nos permiten contar objetos, establecer orden y construir los demás sistemas numéricos. Acompañan a la humanidad desde que empezó a necesitar registrar cantidades.",
          stats: [
            { icon: "📝", label: "Símbolo", value: "ℕ" },
            { icon: "🔢", label: "Inicio", value: "0 ó 1" },
            { icon: "♾️", label: "Cantidad", value: "Infinitos" },
          ],
          explanation: `Los números naturales forman el conjunto:\n\nℕ = {0, 1, 2, 3, 4, 5, ...}\n\n(Algunos autores excluyen el 0 y escriben ℕ = {1, 2, 3, ...})\n\nPropiedades fundamentales:\n• Cada número natural tiene un sucesor: si n ∈ ℕ, entonces n + 1 ∈ ℕ\n• No existe un número natural máximo (el conjunto es infinito)\n• Es un conjunto cerrado para la suma y la multiplicación (la suma o producto de dos naturales siempre es natural)\n• NO es cerrado para la resta ni la división (3 − 5 no es natural, 7 ÷ 2 no es natural)\n\nAxiomas de Peano (definen formalmente a ℕ):\n1. 0 es un número natural\n2. Todo número natural n tiene un sucesor S(n)\n3. No existe un natural cuyo sucesor sea 0\n4. Si S(n) = S(m), entonces n = m\n5. Principio de inducción: si un conjunto contiene a 0 y contiene al sucesor de cada uno de sus elementos, entonces contiene a todos los naturales\n\nEjemplo — Verificar que ℕ no es cerrado para la resta:\n5 − 3 = 2 ✓ (es natural)\n3 − 5 = −2 ✗ (no es natural)\n\nPor eso se inventaron los números enteros.`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Números Naturales — Definición y Propiedades",
          facts: [
            "El concepto de número natural es tan antiguo como la humanidad: se han encontrado huesos con marcas de conteo de hace 40,000 años.",
            "La disputa de si el 0 es natural o no depende del país y la tradición matemática — en lógica y computación se incluye, en álgebra a veces no.",
            "Giuseppe Peano formalizó los axiomas de los números naturales en 1889, pero el concepto intuitivo ya llevaba milenios de uso.",
          ],
          mascotLine: "¡1, 2, 3 y hasta el infinito! Los naturales son donde todo comienza 🚀",
        },
      },
      {
        title: "Operaciones Básicas", slug: "operaciones-basicas", icon: "➕", blurb: "Suma, resta, multiplicación y división.",
        detail: {
          intro: "Las cuatro operaciones básicas — suma, resta, multiplicación y división — son los cimientos de toda la aritmética. Dominarlas es esencial para avanzar en cualquier rama de las matemáticas, desde el álgebra hasta el cálculo.",
          stats: [
            { icon: "➕", label: "Operaciones", value: "4 básicas" },
            { icon: "🔄", label: "Inversas", value: "+/− y ×/÷" },
            { icon: "📐", label: "Propiedades", value: "Conmutativa, asociativa" },
          ],
          explanation: `Las cuatro operaciones fundamentales:\n\n1. Suma (adición): a + b = c\n• Propiedad conmutativa: a + b = b + a\n• Propiedad asociativa: (a + b) + c = a + (b + c)\n• Elemento neutro: a + 0 = a\n\n2. Resta (sustracción): a − b = c\n• Operación inversa de la suma\n• NO es conmutativa: 5 − 3 ≠ 3 − 5\n• NO es asociativa\n\n3. Multiplicación: a × b = c\n• Propiedad conmutativa: a × b = b × a\n• Propiedad asociativa: (a × b) × c = a × (b × c)\n• Elemento neutro: a × 1 = a\n• Distributiva: a × (b + c) = a × b + a × c\n\n4. División: a ÷ b = c (con b ≠ 0)\n• Operación inversa de la multiplicación\n• NO es conmutativa: 6 ÷ 3 ≠ 3 ÷ 6\n• División por cero: ¡PROHIBIDA! No está definida\n\nJerarquía de operaciones (PEMDAS):\n1° Paréntesis\n2° Exponentes\n3° Multiplicación y División (izquierda a derecha)\n4° Suma y Resta (izquierda a derecha)\n\nEjemplo: 2 + 3 × 4 = 2 + 12 = 14 (NO es 20)`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Operaciones Básicas — Suma, Resta, Multiplicación y División",
          facts: [
            "El signo + apareció por primera vez en un libro alemán de 1489, antes se escribía la palabra latina 'et' (y).",
            "Los babilonios ya hacían multiplicaciones hace 4000 años usando tablillas de arcilla con tablas precalculadas.",
            "La división por cero no solo 'no se puede': en una computadora puede causar un error fatal que cierre todo el programa.",
          ],
          mascotLine: "¡Sumar, restar, multiplicar, dividir! Con estas cuatro puedes conquistar el mundo numérico ✨",
        },
      },
      {
        title: "Números Enteros", slug: "numeros-enteros", icon: "➖", blurb: "Positivos, negativos y el cero.",
        detail: {
          intro: "Los números enteros amplían los naturales incluyendo los negativos y el cero. Nos permiten representar deudas, temperaturas bajo cero, profundidades y cualquier situación donde necesitemos indicar dirección o sentido opuesto.",
          stats: [
            { icon: "📝", label: "Símbolo", value: "ℤ" },
            { icon: "↔️", label: "Rango", value: "−∞ a +∞" },
            { icon: "0️⃣", label: "Neutro", value: "0" },
          ],
          explanation: `El conjunto de los números enteros:\n\nℤ = {..., −3, −2, −1, 0, 1, 2, 3, ...}\n\nIncluye:\n• Enteros positivos: ℤ⁺ = {1, 2, 3, ...} (son los naturales sin el 0)\n• Cero: 0\n• Enteros negativos: ℤ⁻ = {..., −3, −2, −1}\n\nReglas de signos para multiplicación y división:\n• (+)(+) = + Ejemplo: 3 × 4 = 12\n• (−)(−) = + Ejemplo: (−3)(−4) = 12\n• (+)(−) = − Ejemplo: 3 × (−4) = −12\n• (−)(+) = − Ejemplo: (−3) × 4 = −12\n\nRegla nemotécnica: signos iguales dan positivo, signos diferentes dan negativo.\n\nValor absoluto:\n|a| = distancia de a al cero en la recta numérica\n|5| = 5, |−5| = 5, |0| = 0\n\nOrden en los enteros:\n... < −3 < −2 < −1 < 0 < 1 < 2 < 3 < ...\n\nEjemplo — Suma con signos diferentes:\n(−8) + 5 = −3 (se restan los valores absolutos y se usa el signo del mayor)\n7 + (−10) = −3 (|−10| > |7|, resultado negativo)`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Números Enteros — Positivos, Negativos y Operaciones",
          facts: [
            "Los matemáticos europeos rechazaron los números negativos hasta el siglo XVII, llamándolos 'números absurdos' o 'ficticios'.",
            "En China e India los negativos se usaban desde el siglo II a.C. para representar deudas comerciales.",
            "La letra ℤ para los enteros viene del alemán 'Zahlen' que significa 'números'.",
          ],
          mascotLine: "¡Bajo cero, sobre cero, y el mismísimo cero! Los enteros cubren TODAS las direcciones 🧭",
        },
      },
      {
        title: "Fracciones", slug: "fracciones", icon: "½", blurb: "Partes de un todo: numerador y denominador.",
        detail: {
          intro: "Las fracciones permiten representar partes de un entero, dividir en porciones iguales y expresar razones entre cantidades. Son la puerta de entrada a los números racionales y una herramienta indispensable en la vida cotidiana.",
          stats: [
            { icon: "📝", label: "Forma", value: "a/b" },
            { icon: "⚠️", label: "Condición", value: "b ≠ 0" },
            { icon: "🔄", label: "Tipos", value: "Propia / Impropia" },
          ],
          explanation: `Una fracción tiene la forma:\n\na/b donde b ≠ 0\n\n• a = numerador (cuántas partes tomamos)\n• b = denominador (en cuántas partes se dividió el entero)\n\nTipos de fracciones:\n• Propia: numerador < denominador (3/7 — vale menos que 1)\n• Impropia: numerador ≥ denominador (9/4 — vale más que 1)\n• Mixta: parte entera + fracción propia (2 ¼ = 9/4)\n\nFracciones equivalentes:\na/b = (a×k)/(b×k) para cualquier k ≠ 0\nEjemplo: 2/3 = 4/6 = 6/9 = 8/12\n\nOperaciones con fracciones:\n• Suma/Resta (mismo denominador): a/c ± b/c = (a ± b)/c\n• Suma/Resta (diferente denominador): buscar MCM\n  2/3 + 1/4 = 8/12 + 3/12 = 11/12\n• Multiplicación: (a/b) × (c/d) = (a×c)/(b×d)\n  2/3 × 4/5 = 8/15\n• División: (a/b) ÷ (c/d) = (a/b) × (d/c) = (a×d)/(b×c)\n  3/4 ÷ 2/5 = 3/4 × 5/2 = 15/8\n\nSimplificación: dividir numerador y denominador por su MCD\n12/18 → MCD(12,18) = 6 → 12/18 = 2/3`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Fracciones — Tipos, Operaciones y Simplificación",
          facts: [
            "Los egipcios solo usaban fracciones con numerador 1 (fracciones unitarias). Para expresar 2/5 escribían 1/3 + 1/15.",
            "La barra de fracción fue inventada por los árabes en el siglo XII y popularizada en Europa por Fibonacci.",
            "En programación, las fracciones decimales como 0.1 no se pueden representar exactamente en binario, causando errores famosos de redondeo.",
          ],
          mascotLine: "¡La pizza se reparte en fracciones! Nunca subestimes el poder de un buen numerador y denominador 🍕",
        },
      },
      {
        title: "Potencias y Raíces", slug: "potencias-y-raices", icon: "²", blurb: "Elevar números y encontrar sus raíces.",
        detail: {
          intro: "Las potencias son una forma abreviada de escribir multiplicaciones repetidas, y las raíces son su operación inversa. Juntas permiten expresar números muy grandes o muy pequeños y resolver ecuaciones que de otro modo serían imposibles.",
          stats: [
            { icon: "📝", label: "Potencia", value: "aⁿ" },
            { icon: "√", label: "Raíz", value: "ⁿ√a" },
            { icon: "🔗", label: "Relación", value: "Inversas" },
          ],
          explanation: `Potencia:\naⁿ = a × a × a × ... × a  (n veces)\n\nDonde:\n• a = base\n• n = exponente\n\nPropiedades de potencias:\n• aᵐ × aⁿ = aᵐ⁺ⁿ\n• aᵐ ÷ aⁿ = aᵐ⁻ⁿ\n• (aᵐ)ⁿ = aᵐˣⁿ\n• (a × b)ⁿ = aⁿ × bⁿ\n• a⁰ = 1 (para a ≠ 0)\n• a⁻ⁿ = 1/aⁿ\n\nRaíz n-ésima:\nⁿ√a = b  significa que  bⁿ = a\n\nRelación potencia-raíz:\nⁿ√a = a^(1/n)\n\nPropiedades de raíces:\n• ⁿ√(a × b) = ⁿ√a × ⁿ√b\n• ⁿ√(a/b) = ⁿ√a / ⁿ√b\n• ᵐ√(ⁿ√a) = ᵐˣⁿ√a\n\nEjemplo — Simplificar:\n√48 = √(16 × 3) = √16 × √3 = 4√3\n\nEjemplo — Exponentes negativos:\n2⁻³ = 1/2³ = 1/8 = 0.125\n\nNotación científica (usa potencias de 10):\n3,200,000 = 3.2 × 10⁶\n0.00045 = 4.5 × 10⁻⁴`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Potencias y Raíces — Propiedades y Ejemplos",
          facts: [
            "El símbolo √ viene de una 'r' estilizada por 'radix' (raíz en latín), y fue introducido por el matemático alemán Christoph Rudolff en 1525.",
            "2¹⁰ = 1024 ≈ 1000, por eso en informática se usa el prefijo 'kilo' para referirse a 1024 bytes.",
            "√2 fue el primer número irracional descubierto por los pitagóricos, lo que causó una crisis filosófica en la antigua Grecia.",
          ],
          mascotLine: "¡Elevar al cuadrado es fácil, pero sacar raíces cuadradas era un misterio en la antigüedad! Hoy tú puedes hacerlo ⚡",
        },
      },
      {
        title: "Divisibilidad", slug: "divisibilidad", icon: "÷", blurb: "Primos, MCD, MCM y criterios.",
        detail: {
          intro: "La divisibilidad estudia cuándo un número se puede dividir exactamente entre otro sin dejar residuo. Los criterios de divisibilidad, el MCD y el MCM son herramientas fundamentales para simplificar fracciones y resolver problemas de reparto.",
          stats: [
            { icon: "📝", label: "Notación", value: "a | b" },
            { icon: "🔑", label: "MCD", value: "Factor común mayor" },
            { icon: "🔗", label: "MCM", value: "Múltiplo común menor" },
          ],
          explanation: `Definición: a divide a b (a | b) si existe un entero k tal que b = a × k.\nEjemplo: 3 | 12 porque 12 = 3 × 4\n\nCriterios de divisibilidad:\n• Por 2: el último dígito es par (0, 2, 4, 6, 8)\n• Por 3: la suma de sus dígitos es divisible por 3\n• Por 4: los dos últimos dígitos forman un número divisible por 4\n• Por 5: termina en 0 o 5\n• Por 6: es divisible por 2 Y por 3\n• Por 9: la suma de sus dígitos es divisible por 9\n• Por 10: termina en 0\n\nMCD (Máximo Común Divisor):\nEl mayor número que divide a ambos.\nMétodo: descomposición en primos → tomar factores comunes con menor exponente\n\nMCD(12, 18):\n12 = 2² × 3\n18 = 2 × 3²\nMCD = 2¹ × 3¹ = 6\n\nMCM (Mínimo Común Múltiplo):\nEl menor múltiplo compartido.\nMétodo: tomar TODOS los factores con mayor exponente\n\nMCM(12, 18):\nMCM = 2² × 3² = 36\n\nRelación importante:\nMCD(a,b) × MCM(a,b) = a × b`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Divisibilidad — Criterios, MCD y MCM",
          facts: [
            "El algoritmo de Euclides para hallar el MCD tiene más de 2300 años y sigue siendo uno de los algoritmos más eficientes que existen.",
            "Los criterios de divisibilidad funcionan gracias a las propiedades del sistema decimal — en base 12, los criterios serían completamente diferentes.",
            "El MCM se usa cada vez que sincronizas semáforos: si uno cambia cada 30 segundos y otro cada 45, coinciden cada MCM(30,45) = 90 segundos.",
          ],
          mascotLine: "¡Dividir sin residuo es como cortar un pastel perfectamente! El MCD y MCM son tus mejores aliados 🎂",
        },
      },
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
      {
        title: "Expresiones Algebraicas", slug: "expresiones-algebraicas", icon: "📝", blurb: "Monomios, binomios y polinomios.",
        detail: {
          intro: "Las expresiones algebraicas combinan números, variables y operaciones para representar relaciones matemáticas generales. Son el lenguaje del álgebra y la base para ecuaciones, funciones y modelos matemáticos.",
          stats: [
            { icon: "📝", label: "Tipos", value: "Mono/Bi/Polinomio" },
            { icon: "🔢", label: "Grado", value: "Mayor exponente" },
            { icon: "🔤", label: "Variables", value: "x, y, z..." },
          ],
          explanation: `Una expresión algebraica combina constantes, variables y operaciones (+, −, ×, ÷, potencias).\n\nTerminología:\n• Término: cada sumando de la expresión (ej: 3x², −5xy, 7)\n• Coeficiente: el número que multiplica a las variables (en 3x², el coeficiente es 3)\n• Grado de un término: suma de los exponentes de sus variables (en 5x²y³, grado = 2+3 = 5)\n• Grado del polinomio: el mayor grado entre sus términos\n\nClasificación por número de términos:\n• Monomio: un solo término → 3x²\n• Binomio: dos términos → x² + 5x\n• Trinomio: tres términos → x² + 5x − 3\n• Polinomio: dos o más términos\n\nTérminos semejantes: tienen las mismas variables con los mismos exponentes.\n• 3x² y 7x² son semejantes → se pueden sumar: 10x²\n• 3x² y 3x³ NO son semejantes (diferente exponente)\n\nOperaciones básicas:\nSuma/Resta: solo se combinan términos semejantes\n(3x² + 2x − 1) + (x² − 5x + 4) = 4x² − 3x + 3\n\nMultiplicación: se usa la propiedad distributiva\n2x(x + 3) = 2x² + 6x\n(x + 2)(x + 3) = x² + 3x + 2x + 6 = x² + 5x + 6`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Expresiones Algebraicas — Clasificación y Operaciones",
          facts: [
            "La palabra 'álgebra' viene del árabe 'al-jabr' del libro de Al-Juarismi del año 820, que significa 'restauración' o 'recomposición'.",
            "Antes del álgebra simbólica, las ecuaciones se escribían en palabras completas. François Viète introdujo las letras para las incógnitas en el siglo XVI.",
            "El polinomio más largo jamás factorizado por una computadora tenía más de un millón de términos.",
          ],
          mascotLine: "¡Las letras y los números juntos son un equipo invencible! El álgebra te da superpoderes matemáticos 🦸",
        },
      },
      {
        title: "Ecuaciones Lineales", slug: "ecuaciones-lineales", icon: "⚖️", blurb: "Ecuaciones de primer grado y sus soluciones.",
        detail: {
          intro: "Una ecuación lineal es una igualdad con una incógnita elevada a la primera potencia. Resolverla significa encontrar el valor que hace verdadera la igualdad. Es la base para resolver problemas del mundo real traducidos al lenguaje matemático.",
          stats: [
            { icon: "📐", label: "Forma", value: "ax + b = 0" },
            { icon: "🎯", label: "Solución", value: "x = −b/a" },
            { icon: "📈", label: "Gráfica", value: "Línea recta" },
          ],
          explanation: `Forma general de una ecuación lineal:\n\nax + b = 0  (con a ≠ 0)\n\nSolución: x = −b/a\n\nPasos para resolver una ecuación lineal:\n1. Eliminar paréntesis (propiedad distributiva)\n2. Agrupar términos con x a un lado y constantes al otro\n3. Reducir términos semejantes\n4. Despejar x dividiendo por su coeficiente\n\nEjemplo resuelto:\n3(x − 2) + 4 = 2x + 5\n\nPaso 1: 3x − 6 + 4 = 2x + 5\nPaso 2: 3x − 2 = 2x + 5\nPaso 3: 3x − 2x = 5 + 2\nPaso 4: x = 7\n\nVerificación: 3(7−2) + 4 = 15 + 4 = 19 ✓ y 2(7) + 5 = 14 + 5 = 19 ✓\n\nCasos especiales:\n• Sin solución (inconsistente): 2x + 3 = 2x + 7 → 3 = 7 (¡falso!)\n• Infinitas soluciones (identidad): 2(x+1) = 2x + 2 → siempre verdadero\n\nEcuación de la recta:\ny = mx + b\n• m = pendiente (inclinación)\n• b = ordenada al origen (donde cruza el eje y)`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Ecuaciones Lineales — Cómo Resolverlas Paso a Paso",
          facts: [
            "Los antiguos egipcios ya resolvían ecuaciones lineales hace 3800 años, como consta en el Papiro de Rhind.",
            "El símbolo = fue inventado por Robert Recorde en 1557 porque estaba cansado de escribir 'es igual a' repetidamente.",
            "Cada vez que resuelves un problema tipo '¿a qué hora se encuentran dos autos?' estás resolviendo una ecuación lineal.",
          ],
          mascotLine: "¡Despejar la x es como resolver un misterio paso a paso! Tú eres el detective algebraico 🕵️",
        },
      },
      {
        title: "Sistemas de Ecuaciones", slug: "sistemas-de-ecuaciones", icon: "🔗", blurb: "Dos o más ecuaciones trabajando juntas.",
        detail: {
          intro: "Un sistema de ecuaciones es un conjunto de dos o más ecuaciones que deben cumplirse simultáneamente. Resolverlo significa encontrar los valores de las incógnitas que satisfacen TODAS las ecuaciones al mismo tiempo.",
          stats: [
            { icon: "🔗", label: "Métodos", value: "3 principales" },
            { icon: "📍", label: "Solución", value: "Punto de intersección" },
            { icon: "📐", label: "Forma", value: "2×2, 3×3..." },
          ],
          explanation: `Sistema de 2 ecuaciones con 2 incógnitas:\n\na₁x + b₁y = c₁\na₂x + b₂y = c₂\n\nMétodos de resolución:\n\n1. Sustitución:\n• Despejar una variable de una ecuación\n• Sustituir en la otra\n\n2. Eliminación (reducción):\n• Multiplicar ecuaciones para igualar coeficientes\n• Sumar o restar para eliminar una variable\n\n3. Igualación:\n• Despejar la misma variable en ambas ecuaciones\n• Igualar las expresiones\n\nEjemplo — Método de eliminación:\n2x + 3y = 12\nx − y = 1\n\nMultiplico la 2ª por 3: 3x − 3y = 3\nSumo con la 1ª: 5x = 15 → x = 3\nSustituyo: 3 − y = 1 → y = 2\n\nSolución: (3, 2)\n\nClasificación:\n• Compatible determinado: una solución (rectas que se cortan)\n• Compatible indeterminado: infinitas soluciones (rectas coincidentes)\n• Incompatible: sin solución (rectas paralelas)`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Sistemas de Ecuaciones — Sustitución, Eliminación e Igualación",
          facts: [
            "Los chinos resolvían sistemas de ecuaciones con un método equivalente a la eliminación de Gauss ¡2000 años antes que Gauss!",
            "Los sistemas de ecuaciones lineales se usan en videojuegos 3D para calcular las intersecciones de rayos de luz con objetos.",
            "Google PageRank, el algoritmo original de Google, resuelve un sistema gigante de ecuaciones con miles de millones de incógnitas.",
          ],
          mascotLine: "¡Dos ecuaciones, dos incógnitas, una solución! Es como resolver un acertijo con dos pistas 🧩",
        },
      },
      {
        title: "Productos Notables", slug: "productos-notables", icon: "✖️", blurb: "Atajos algebraicos que simplifican todo.",
        detail: {
          intro: "Los productos notables son fórmulas que permiten multiplicar expresiones algebraicas especiales sin necesidad de aplicar la distributiva paso a paso. Son atajos esenciales que ahorran tiempo y reducen errores.",
          stats: [
            { icon: "📐", label: "Fórmulas", value: "5 principales" },
            { icon: "⚡", label: "Ventaja", value: "Rapidez" },
            { icon: "🔄", label: "Inverso", value: "Factorización" },
          ],
          explanation: `Principales productos notables:\n\n1. Cuadrado de un binomio (suma):\n(a + b)² = a² + 2ab + b²\nEjemplo: (x + 3)² = x² + 6x + 9\n\n2. Cuadrado de un binomio (diferencia):\n(a − b)² = a² − 2ab + b²\nEjemplo: (2x − 5)² = 4x² − 20x + 25\n\n3. Diferencia de cuadrados (suma por diferencia):\n(a + b)(a − b) = a² − b²\nEjemplo: (x + 4)(x − 4) = x² − 16\n\n4. Cubo de un binomio (suma):\n(a + b)³ = a³ + 3a²b + 3ab² + b³\nEjemplo: (x + 2)³ = x³ + 6x² + 12x + 8\n\n5. Cubo de un binomio (diferencia):\n(a − b)³ = a³ − 3a²b + 3ab² − b³\n\nError común:\n• (a + b)² ≠ a² + b² ← ¡FALTA el término 2ab!\n• Correcto: (a + b)² = a² + 2ab + b²\n\nTriángulo de Pascal (para potencias mayores):\n(a+b)⁰ → 1\n(a+b)¹ → 1 1\n(a+b)² → 1 2 1\n(a+b)³ → 1 3 3 1\n(a+b)⁴ → 1 4 6 4 1`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Productos Notables — Las 5 Fórmulas Esenciales",
          facts: [
            "El error de creer que (a+b)² = a² + b² es tan común que los profesores lo llaman 'la falacia del estudiante de primer año'.",
            "El Triángulo de Pascal fue descubierto independientemente por matemáticos chinos (Jia Xian), persas (Khayyam) y franceses (Pascal) en diferentes siglos.",
            "Las fórmulas de productos notables se usan en criptografía moderna para factorizar números grandes y en algoritmos de compresión de datos.",
          ],
          mascotLine: "¡Memoriza estas fórmulas y multiplicarás como un rayo! Son los atajos secretos del álgebra ⚡",
        },
      },
      {
        title: "Factorización", slug: "factorizacion", icon: "🧩", blurb: "Descomponer expresiones en sus factores.",
        detail: {
          intro: "Factorizar es descomponer una expresión algebraica en un producto de factores más simples. Es la operación inversa de los productos notables y es esencial para simplificar fracciones algebraicas, resolver ecuaciones y encontrar raíces.",
          stats: [
            { icon: "🧩", label: "Métodos", value: "6+ técnicas" },
            { icon: "🔄", label: "Inverso de", value: "Expandir" },
            { icon: "🎯", label: "Uso", value: "Hallar raíces" },
          ],
          explanation: `Factorizar = escribir como producto de factores\n\nMétodos principales:\n\n1. Factor común:\nab + ac = a(b + c)\nEjemplo: 6x³ + 9x² = 3x²(2x + 3)\n\n2. Diferencia de cuadrados:\na² − b² = (a + b)(a − b)\nEjemplo: x² − 25 = (x + 5)(x − 5)\n\n3. Trinomio cuadrado perfecto:\na² + 2ab + b² = (a + b)²\nEjemplo: x² + 10x + 25 = (x + 5)²\n\n4. Trinomio de la forma x² + bx + c:\nBuscar dos números que sumen b y multipliquen c\nEjemplo: x² + 7x + 12 = (x + 3)(x + 4)\n(porque 3 + 4 = 7 y 3 × 4 = 12)\n\n5. Trinomio de la forma ax² + bx + c:\nMétodo del producto-suma o fórmula general\nEjemplo: 2x² + 5x + 3 = (2x + 3)(x + 1)\n\n6. Suma/diferencia de cubos:\na³ + b³ = (a + b)(a² − ab + b²)\na³ − b³ = (a − b)(a² + ab + b²)\n\nEjemplo completo:\nFactorizar 3x³ − 12x\n= 3x(x² − 4)          ← factor común\n= 3x(x + 2)(x − 2)    ← diferencia de cuadrados`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Factorización — Todos los Métodos con Ejemplos",
          facts: [
            "Factorizar números grandes es tan difícil que toda la seguridad de Internet (RSA) se basa en esa dificultad: un número de 300 dígitos puede tomar millones de años.",
            "Évariste Galois demostró a los 19 años que no existe fórmula general para factorizar polinomios de grado 5 o mayor, antes de morir en un duelo.",
            "Los métodos de factorización algebraica se enseñan desde el siglo IX gracias a los trabajos de Al-Juarismi en la Casa de la Sabiduría de Bagdad.",
          ],
          mascotLine: "¡Factorizar es como desarmar un Lego para ver sus piezas! Cada pieza te revela información oculta 🧱",
        },
      },
      {
        title: "Funciones", slug: "funciones", icon: "📈", blurb: "Relaciones entre variables: f(x).",
        detail: {
          intro: "Una función es una regla que asigna a cada valor de entrada (x) exactamente un valor de salida f(x). Las funciones son el concepto central del análisis matemático y modelan prácticamente todo en ciencia, economía e ingeniería.",
          stats: [
            { icon: "📝", label: "Notación", value: "f(x)" },
            { icon: "📍", label: "Dominio", value: "Valores de x" },
            { icon: "🎯", label: "Rango", value: "Valores de f(x)" },
          ],
          explanation: `Definición formal:\nUna función f: A → B asigna a cada elemento x ∈ A exactamente un elemento f(x) ∈ B.\n\n• Dominio: conjunto de valores válidos de entrada (x)\n• Rango (imagen): conjunto de valores de salida f(x)\n• Criterio: la regla que transforma x en f(x)\n\nPrueba de la línea vertical:\nUna gráfica representa una función si toda línea vertical la corta en A LO SUMO un punto.\n\nTipos de funciones:\n• Lineal: f(x) = mx + b (línea recta)\n• Cuadrática: f(x) = ax² + bx + c (parábola)\n• Cúbica: f(x) = ax³ + ... \n• Raíz: f(x) = √x\n• Valor absoluto: f(x) = |x|\n• Exponencial: f(x) = aˣ\n• Logarítmica: f(x) = log_a(x)\n\nEjemplo — Evaluar f(x) = 2x² − 3x + 1:\nf(2) = 2(4) − 3(2) + 1 = 8 − 6 + 1 = 3\nf(−1) = 2(1) − 3(−1) + 1 = 2 + 3 + 1 = 6\n\nDominio:\n• Polinomios: todos los reales ℝ\n• Fracciones: excluir donde el denominador = 0\n• Raíces pares: el radicando debe ser ≥ 0\n• Logaritmos: el argumento debe ser > 0`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Funciones — Dominio, Rango y Tipos",
          facts: [
            "El concepto de función fue introducido por Leibniz en 1694 y formalizado por Dirichlet en 1837 con la definición que usamos hoy.",
            "Una función puede tener infinitos valores pero a cada x le corresponde exactamente UN f(x). Esto es lo que la distingue de una relación cualquiera.",
            "Las funciones modelan desde el crecimiento de poblaciones (exponencial) hasta la órbita de planetas (trigonométrica) y el precio de acciones (estocástica).",
          ],
          mascotLine: "¡f(x) es como una máquina: metes un número y sale otro! Descubre qué hace cada función 🏭",
        },
      },
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
      {
        title: "Triángulos", slug: "triangulos", icon: "🔺", blurb: "Tipos, propiedades y el teorema de Pitágoras.",
        detail: {
          intro: "Los triángulos son las figuras geométricas más fundamentales: con solo tres lados pueden modelar puentes, techos y hasta señales de tránsito. El teorema de Pitágoras es probablemente el resultado más famoso de toda la matemática.",
          stats: [
            { icon: "📐", label: "Ángulos", value: "Suman 180°" },
            { icon: "🔺", label: "Tipos", value: "6 clasificaciones" },
            { icon: "⭐", label: "Pitágoras", value: "a²+b²=c²" },
          ],
          explanation: `Un triángulo tiene 3 lados, 3 vértices y 3 ángulos que siempre suman 180°.\n\nClasificación por lados:\n• Equilátero: 3 lados iguales (y 3 ángulos de 60°)\n• Isósceles: 2 lados iguales\n• Escaleno: 3 lados diferentes\n\nClasificación por ángulos:\n• Acutángulo: todos los ángulos < 90°\n• Rectángulo: un ángulo = 90°\n• Obtusángulo: un ángulo > 90°\n\nTeorema de Pitágoras (solo para triángulos rectángulos):\na² + b² = c²\n\nDonde c es la hipotenusa (lado opuesto al ángulo recto) y a, b son los catetos.\n\nEjemplo: Si los catetos miden 3 y 4:\nc² = 3² + 4² = 9 + 16 = 25\nc = √25 = 5\n\nÁrea del triángulo:\nA = (base × altura) / 2\n\nFórmula de Herón (cuando se conocen los 3 lados a, b, c):\ns = (a + b + c) / 2 (semiperímetro)\nA = √[s(s−a)(s−b)(s−c)]\n\nDesigualdad triangular:\nLa suma de dos lados siempre debe ser mayor que el tercer lado:\na + b > c, a + c > b, b + c > a`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Triángulos — Clasificación, Pitágoras y Área",
          facts: [
            "El Teorema de Pitágoras se conocía en Babilonia 1000 años antes de Pitágoras. Hay una tablilla de arcilla (Plimpton 322) que lista ternas pitagóricas del 1800 a.C.",
            "El triángulo es la única figura rígida: un triángulo de varillas no se deforma, por eso se usa en puentes, techos y grúas.",
            "Existen infinitas ternas pitagóricas (3,4,5), (5,12,13), (8,15,17)... pero nunca se ha encontrado una con los tres números primos.",
          ],
          mascotLine: "¡Tres lados, tres ángulos y un mundo de posibilidades! Pitágoras estaría orgulloso de ti 🏛️",
        },
      },
      {
        title: "Circunferencia y Círculo", slug: "circunferencia-y-circulo", icon: "⭕", blurb: "Pi, radio, diámetro y más.",
        detail: {
          intro: "La circunferencia es el conjunto de puntos equidistantes de un centro, y el círculo es toda la región interior. El número π conecta el diámetro con el perímetro de forma misteriosa y universal — aparece en todas las ciencias.",
          stats: [
            { icon: "🔵", label: "π", value: "3.14159..." },
            { icon: "📏", label: "Perímetro", value: "2πr" },
            { icon: "📐", label: "Área", value: "πr²" },
          ],
          explanation: `Definiciones:\n• Circunferencia: conjunto de puntos a distancia r del centro (es una línea curva)\n• Círculo: la región interior incluyendo la circunferencia (es una superficie)\n• Radio (r): distancia del centro a cualquier punto de la circunferencia\n• Diámetro (d): d = 2r (cuerda que pasa por el centro)\n\nFórmulas fundamentales:\n• Perímetro (longitud de la circunferencia): C = 2πr = πd\n• Área del círculo: A = πr²\n\nElementos de la circunferencia:\n• Cuerda: segmento que une dos puntos de la circunferencia\n• Secante: recta que corta la circunferencia en dos puntos\n• Tangente: recta que toca la circunferencia en exactamente un punto\n• Arco: porción de la circunferencia entre dos puntos\n• Sector circular: "rebanada de pizza" (región entre dos radios y un arco)\n\nEjemplo — Calcular perímetro y área con r = 5 cm:\nC = 2π(5) = 10π ≈ 31.42 cm\nA = π(5²) = 25π ≈ 78.54 cm²\n\nEcuación de la circunferencia (centro (h,k), radio r):\n(x − h)² + (y − k)² = r²\n\nÁngulo central vs ángulo inscrito:\nEl ángulo inscrito es SIEMPRE la mitad del ángulo central que abarca el mismo arco.`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Circunferencia y Círculo — Fórmulas y Propiedades",
          facts: [
            "π tiene infinitos decimales sin patrón repetitivo. El récord actual es más de 100 billones de dígitos calculados, y nunca se ha encontrado una secuencia predecible.",
            "Arquímedes fue el primero en calcular π con precisión (entre 3 10/71 y 3 1/7) usando polígonos de 96 lados inscritos en un círculo.",
            "La Pizza es circular, se corta en triángulos (sectores) y viene en una caja cuadrada — ¡tres formas geométricas en un producto!",
          ],
          mascotLine: "¡Pi es infinito, irracional y fascinante! Cada vez que ves una rueda, π está trabajando 🎡",
        },
      },
      {
        title: "Polígonos", slug: "poligonos", icon: "⬡", blurb: "Figuras de muchos lados y sus propiedades.",
        detail: {
          intro: "Los polígonos son figuras cerradas formadas por segmentos rectos. Desde el humilde triángulo hasta los polígonos regulares de muchos lados, sus propiedades geométricas siguen patrones elegantes y predecibles.",
          stats: [
            { icon: "📐", label: "Ángulos int.", value: "(n−2)×180°" },
            { icon: "🔷", label: "Regulares", value: "Todos iguales" },
            { icon: "📊", label: "Diagonales", value: "n(n−3)/2" },
          ],
          explanation: `Un polígono es una figura plana cerrada formada por n segmentos rectos (lados), con n ≥ 3.\n\nNombres según número de lados:\n• 3: triángulo    • 7: heptágono\n• 4: cuadrilátero • 8: octágono\n• 5: pentágono    • 9: nonágono\n• 6: hexágono     • 10: decágono\n\nPolígono regular: todos los lados y ángulos son iguales.\n\nFórmulas importantes:\n• Suma de ángulos interiores: S = (n − 2) × 180°\n• Cada ángulo interior (regular): α = (n − 2) × 180° / n\n• Suma de ángulos exteriores: siempre 360°\n• Número de diagonales: D = n(n − 3) / 2\n\nEjemplo — Hexágono regular (n = 6):\nSuma ángulos = (6−2) × 180° = 720°\nCada ángulo = 720° / 6 = 120°\nDiagonales = 6(6−3) / 2 = 9\n\nClasificación:\n• Convexo: todos los ángulos interiores < 180° (no tiene "entrantes")\n• Cóncavo: al menos un ángulo interior > 180°\n\nTeselaciones: solo 3 polígonos regulares teselan el plano (cubren sin huecos ni superposiciones): triángulo equilátero, cuadrado y hexágono regular.`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Polígonos — Clasificación, Ángulos y Diagonales",
          facts: [
            "Las abejas construyen celdas hexagonales porque el hexágono regular es la forma que maximiza el área con el mínimo perímetro al teselar un plano.",
            "El pentágono regular esconde la proporción áurea (φ ≈ 1.618): la diagonal entre el lado da exactamente φ.",
            "Los copos de nieve siempre tienen simetría hexagonal debido a la estructura molecular del hielo, nunca verás un copo pentagonal.",
          ],
          mascotLine: "¡Cuantos más lados tiene un polígono, más se parece a un círculo! La geometría está llena de sorpresas 🔷",
        },
      },
      {
        title: "Perímetro y Área", slug: "perimetro-y-area", icon: "📏", blurb: "Medir contornos y superficies.",
        detail: {
          intro: "El perímetro mide el contorno de una figura (cuánto alambre necesitas para rodearla) y el área mide la superficie interior (cuánta pintura necesitas para cubrirla). Son las mediciones más prácticas de la geometría.",
          stats: [
            { icon: "📏", label: "Perímetro", value: "Longitud" },
            { icon: "📐", label: "Área", value: "Superficie" },
            { icon: "🔢", label: "Unidades", value: "m vs m²" },
          ],
          explanation: `Perímetro = suma de todos los lados\nÁrea = medida de la superficie interior\n\nFórmulas de área por figura:\n\n• Cuadrado (lado a): A = a²\n• Rectángulo (base b, altura h): A = b × h\n• Triángulo: A = (b × h) / 2\n• Paralelogramo: A = b × h\n• Trapecio (bases B y b, altura h): A = (B + b) × h / 2\n• Rombo (diagonales D y d): A = (D × d) / 2\n• Círculo (radio r): A = πr²\n\nPerímetros:\n• Cuadrado: P = 4a\n• Rectángulo: P = 2(b + h)\n• Triángulo: P = a + b + c (suma de lados)\n• Circunferencia: P = 2πr\n\nEjemplo — Área de un trapecio:\nBases: B = 10 cm, b = 6 cm, altura h = 4 cm\nA = (10 + 6) × 4 / 2 = 16 × 4 / 2 = 32 cm²\n\nUnidades:\n• Perímetro se mide en unidades lineales: cm, m, km\n• Área se mide en unidades cuadradas: cm², m², km²\n\nConversiones de área:\n1 m² = 10,000 cm²\n1 km² = 1,000,000 m²\n1 hectárea = 10,000 m²`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Perímetro y Área — Todas las Fórmulas con Ejemplos",
          facts: [
            "Una cancha de fútbol mide entre 6,400 y 8,250 m² — eso es más o menos una hectárea, igual que un campo de cultivo mediano.",
            "El isoperimétrico: de todas las figuras con el mismo perímetro, el CÍRCULO es la que tiene mayor área. Por eso las burbujas son esféricas.",
            "Los antiguos egipcios usaban cuerdas con nudos equidistantes para medir áreas de terrenos después de las inundaciones del Nilo.",
          ],
          mascotLine: "¡Medir superficies y contornos es la geometría más útil del día a día! ¿Cuánta pintura necesitas? 🎨",
        },
      },
      {
        title: "Volumen", slug: "volumen", icon: "📦", blurb: "El espacio que ocupan los cuerpos 3D.",
        detail: {
          intro: "El volumen mide el espacio tridimensional que ocupa un cuerpo. Desde calcular cuánta agua cabe en una piscina hasta diseñar empaques, el volumen es la medida fundamental del mundo 3D que nos rodea.",
          stats: [
            { icon: "📦", label: "Unidad", value: "m³, cm³, litros" },
            { icon: "🔷", label: "Cuerpos", value: "Prismas, cilindros..." },
            { icon: "💧", label: "Equivalencia", value: "1L = 1000cm³" },
          ],
          explanation: `Volumen = espacio tridimensional ocupado por un cuerpo.\n\nFórmulas de volumen:\n\n• Cubo (arista a): V = a³\n• Prisma rectangular (largo l, ancho w, alto h): V = l × w × h\n• Prisma (cualquiera): V = Área de la base × altura\n• Cilindro (radio r, altura h): V = πr²h\n• Esfera (radio r): V = (4/3)πr³\n• Cono (radio r, altura h): V = (1/3)πr²h\n• Pirámide: V = (1/3) × Área de la base × altura\n\nRelación cono/cilindro/esfera con mismo radio r y altura h = 2r:\n• Cono: (1/3)πr²(2r) = (2/3)πr³\n• Cilindro: πr²(2r) = 2πr³\n• Esfera: (4/3)πr³\n\nEjemplo — Volumen de un cilindro:\nRadio = 3 cm, altura = 10 cm\nV = π(3²)(10) = 90π ≈ 282.74 cm³\n\nConversiones importantes:\n• 1 litro = 1,000 cm³ = 1 dm³\n• 1 m³ = 1,000 litros\n• 1 ml = 1 cm³`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Volumen — Fórmulas de Cuerpos Geométricos 3D",
          facts: [
            "Arquímedes descubrió cómo medir el volumen de objetos irregulares metiéndolos en agua. Según la leyenda, gritó '¡Eureka!' y salió corriendo desnudo.",
            "La relación V(esfera) = (2/3) × V(cilindro circunscrito) fue el descubrimiento favorito de Arquímedes y pidió que lo grabaran en su tumba.",
            "Un metro cúbico de agua pesa exactamente 1000 kg (1 tonelada). Esta relación fue diseñada intencionalmente al crear el sistema métrico.",
          ],
          mascotLine: "¡El mundo es 3D y el volumen es su medida! Cada vaso, cada piscina, cada planeta tiene un volumen calculable 🌍",
        },
      },
      {
        title: "Geometría Analítica", slug: "geometria-analitica", icon: "📍", blurb: "Coordenadas, rectas y distancias.",
        detail: {
          intro: "La geometría analítica une el álgebra con la geometría usando un sistema de coordenadas. Gracias a Descartes, podemos representar figuras como ecuaciones y resolver problemas geométricos con técnicas algebraicas.",
          stats: [
            { icon: "📍", label: "Plano", value: "Cartesiano (x,y)" },
            { icon: "📏", label: "Distancia", value: "√[(x₂−x₁)²+(y₂−y₁)²]" },
            { icon: "📐", label: "Pendiente", value: "m = Δy/Δx" },
          ],
          explanation: `El plano cartesiano tiene dos ejes perpendiculares (x horizontal, y vertical) que se cruzan en el origen (0,0).\n\nDistancia entre dos puntos A(x₁,y₁) y B(x₂,y₂):\nd = √[(x₂ − x₁)² + (y₂ − y₁)²]\n\nPunto medio de un segmento:\nM = ((x₁ + x₂)/2, (y₁ + y₂)/2)\n\nPendiente de una recta:\nm = (y₂ − y₁) / (x₂ − x₁) = Δy / Δx\n\nFormas de la ecuación de la recta:\n• Pendiente-ordenada: y = mx + b\n• Punto-pendiente: y − y₁ = m(x − x₁)\n• General: Ax + By + C = 0\n\nRectas paralelas: m₁ = m₂ (misma pendiente)\nRectas perpendiculares: m₁ × m₂ = −1\n\nEjemplo — Hallar la ecuación de la recta que pasa por (2, 3) y (4, 7):\nm = (7 − 3)/(4 − 2) = 4/2 = 2\ny − 3 = 2(x − 2)\ny = 2x − 1\n\nDistancia de un punto P(x₀, y₀) a una recta Ax + By + C = 0:\nd = |Ax₀ + By₀ + C| / √(A² + B²)`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Geometría Analítica — Distancia, Pendiente y Ecuación de la Recta",
          facts: [
            "René Descartes inventó el plano cartesiano (que lleva su nombre) supuestamente mientras observaba una mosca en el techo desde su cama.",
            "La geometría analítica fusionó dos ramas que los griegos mantuvieron separadas por más de 2000 años: la geometría (figuras) y el álgebra (ecuaciones).",
            "Los GPS funcionan con geometría analítica en 3D: calculan tu posición midiendo distancias a satélites y resolviendo sistemas de ecuaciones.",
          ],
          mascotLine: "¡Con coordenadas puedes ubicar cualquier punto del universo! Descartes nos dio el mapa perfecto 🗺️",
        },
      },
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
      {
        title: "Razones Trigonométricas", slug: "razones-trigonometricas", icon: "📊", blurb: "Seno, coseno y tangente en triángulos rectángulos.",
        detail: {
          intro: "Las razones trigonométricas — seno, coseno y tangente — relacionan los ángulos de un triángulo rectángulo con la proporción de sus lados. Son la puerta de entrada a la trigonometría y se aplican en navegación, ingeniería y física.",
          stats: [
            { icon: "📐", label: "sin θ", value: "opuesto/hipotenusa" },
            { icon: "📐", label: "cos θ", value: "adyacente/hipotenusa" },
            { icon: "📐", label: "tan θ", value: "opuesto/adyacente" },
          ],
          explanation: `En un triángulo rectángulo con un ángulo θ:\n\nLas 6 razones trigonométricas:\n• sen θ = cateto opuesto / hipotenusa (SOH)\n• cos θ = cateto adyacente / hipotenusa (CAH)\n• tan θ = cateto opuesto / cateto adyacente (TOA)\n\nRecíprocas:\n• csc θ = 1/sen θ = hipotenusa / opuesto\n• sec θ = 1/cos θ = hipotenusa / adyacente\n• cot θ = 1/tan θ = adyacente / opuesto\n\nNemotécnica SOH-CAH-TOA:\n• Seno = Opuesto / Hipotenusa\n• Coseno = Adyacente / Hipotenusa\n• Tangente = Opuesto / Adyacente\n\nÁngulos notables:\n      30°      45°      60°\nsen   1/2      √2/2     √3/2\ncos   √3/2     √2/2     1/2\ntan   √3/3     1        √3\n\nEjemplo: En un triángulo rectángulo con hipotenusa 10 y ángulo de 30°:\nCateto opuesto = 10 × sen 30° = 10 × 0.5 = 5\nCateto adyacente = 10 × cos 30° = 10 × (√3/2) ≈ 8.66\n\nIdentidad fundamental:\nsen²θ + cos²θ = 1`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Razones Trigonométricas — SOH CAH TOA",
          facts: [
            "La trigonometría fue inventada por los astrónomos babilonios y griegos para calcular distancias a estrellas sin poder medirlas directamente.",
            "El nemotécnico SOH-CAH-TOA se usa mundialmente en inglés y español para recordar las tres razones básicas.",
            "Las calculadoras tienen botones de sin, cos y tan porque estas funciones se usan millones de veces al día en GPS, videojuegos y telecomunicaciones.",
          ],
          mascotLine: "¡SOH-CAH-TOA! Con estas tres palabritas mágicas puedes medir cualquier triángulo rectángulo 📐",
        },
      },
      {
        title: "Círculo Unitario", slug: "circulo-unitario", icon: "🎯", blurb: "El círculo que explica toda la trigonometría.",
        detail: {
          intro: "El círculo unitario es un círculo de radio 1 centrado en el origen. Es la herramienta definitiva para entender las funciones trigonométricas más allá de los triángulos rectángulos, permitiendo definir seno y coseno para cualquier ángulo.",
          stats: [
            { icon: "🔵", label: "Radio", value: "r = 1" },
            { icon: "📍", label: "Punto", value: "(cos θ, sen θ)" },
            { icon: "🔄", label: "Vuelta", value: "360° = 2π rad" },
          ],
          explanation: `El círculo unitario tiene centro en (0,0) y radio 1.\n\nCada punto sobre el círculo tiene coordenadas:\nP(θ) = (cos θ, sen θ)\n\nEsto define seno y coseno para CUALQUIER ángulo θ:\n• cos θ = coordenada x del punto\n• sen θ = coordenada y del punto\n• tan θ = sen θ / cos θ = y/x\n\nConversión grados-radianes:\nRadianes = Grados × (π/180)\nGrados = Radianes × (180/π)\n\nÁngulos clave en el círculo unitario:\n• 0° (0): (1, 0)\n• 30° (π/6): (√3/2, 1/2)\n• 45° (π/4): (√2/2, √2/2)\n• 60° (π/3): (1/2, √3/2)\n• 90° (π/2): (0, 1)\n• 180° (π): (−1, 0)\n• 270° (3π/2): (0, −1)\n• 360° (2π): (1, 0)\n\nSignos por cuadrante:\n• I (0°-90°): sen +, cos +, tan +\n• II (90°-180°): sen +, cos −, tan −\n• III (180°-270°): sen −, cos −, tan +\n• IV (270°-360°): sen −, cos +, tan −\n\nEjemplo: cos(150°) = cos(180°−30°) = −cos 30° = −√3/2`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Círculo Unitario — Coordenadas y Ángulos Clave",
          facts: [
            "El radián es la unidad 'natural' de ángulo: un radián es el ángulo que abarca un arco de longitud igual al radio. Una vuelta completa = 2π radianes.",
            "Los egipcios dividieron el círculo en 360° porque creían que el año tenía 360 días y que el Sol recorría 1° por día.",
            "En el círculo unitario, la identidad sen²θ + cos²θ = 1 es simplemente el Teorema de Pitágoras aplicado al triángulo formado con el radio.",
          ],
          mascotLine: "¡Un solo círculo contiene TODA la trigonometría! Es la herramienta más elegante de las matemáticas 🎯",
        },
      },
      {
        title: "Identidades", slug: "identidades", icon: "🔄", blurb: "Ecuaciones que siempre son verdaderas.",
        detail: {
          intro: "Las identidades trigonométricas son ecuaciones que se cumplen para TODOS los valores del ángulo. Son herramientas esenciales para simplificar expresiones, resolver ecuaciones trigonométricas y demostrar otras identidades.",
          stats: [
            { icon: "⭐", label: "Pitagórica", value: "sen²+cos²=1" },
            { icon: "🔄", label: "Ángulo doble", value: "sen(2θ)" },
            { icon: "➕", label: "Suma", value: "sen(α±β)" },
          ],
          explanation: `Identidades pitagóricas:\n• sen²θ + cos²θ = 1\n• 1 + tan²θ = sec²θ\n• 1 + cot²θ = csc²θ\n\nIdentidades de cociente:\n• tan θ = sen θ / cos θ\n• cot θ = cos θ / sen θ\n\nIdentidades de ángulo doble:\n• sen(2θ) = 2·sen θ·cos θ\n• cos(2θ) = cos²θ − sen²θ = 2cos²θ − 1 = 1 − 2sen²θ\n• tan(2θ) = 2tan θ / (1 − tan²θ)\n\nIdentidades de suma y diferencia:\n• sen(α + β) = sen α·cos β + cos α·sen β\n• sen(α − β) = sen α·cos β − cos α·sen β\n• cos(α + β) = cos α·cos β − sen α·sen β\n• cos(α − β) = cos α·cos β + sen α·sen β\n\nEjemplo — Simplificar:\n(1 − cos²θ) / sen θ\n= sen²θ / sen θ    (usando sen² + cos² = 1)\n= sen θ\n\nEjemplo — Calcular sen 75°:\nsen 75° = sen(45° + 30°)\n= sen 45°·cos 30° + cos 45°·sen 30°\n= (√2/2)(√3/2) + (√2/2)(1/2)\n= (√6 + √2) / 4`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Identidades Trigonométricas — Pitagóricas, Doble Ángulo y Suma",
          facts: [
            "La identidad sen²θ + cos²θ = 1 es en realidad el Teorema de Pitágoras disfrazado: en el círculo unitario, x² + y² = 1.",
            "Euler demostró la identidad más bella de las matemáticas: e^(iπ) + 1 = 0, que conecta la trigonometría con los números complejos.",
            "Las identidades trigonométricas se usaron extensivamente en la navegación marítima del siglo XV para calcular posiciones con las estrellas.",
          ],
          mascotLine: "¡Las identidades son verdades eternas! Siempre funcionan, sin importar el ángulo 🔄✨",
        },
      },
      {
        title: "Ley de Senos y Cosenos", slug: "ley-de-senos-y-cosenos", icon: "⚖️", blurb: "Resolver cualquier triángulo.",
        detail: {
          intro: "La Ley de Senos y la Ley de Cosenos permiten resolver CUALQUIER triángulo, no solo los rectángulos. Son las herramientas generales de la trigonometría para encontrar lados y ángulos desconocidos.",
          stats: [
            { icon: "📐", label: "Ley Senos", value: "a/senA = b/senB" },
            { icon: "📐", label: "Ley Cosenos", value: "c²=a²+b²−2ab·cosC" },
            { icon: "🎯", label: "Aplica a", value: "Todo triángulo" },
          ],
          explanation: `Ley de Senos:\na/sen A = b/sen B = c/sen C = 2R\n\nDonde R es el radio de la circunferencia circunscrita.\n\nSe usa cuando conocemos:\n• Dos ángulos y un lado (ALA o AAL)\n• Dos lados y el ángulo opuesto a uno de ellos (caso ambiguo)\n\nLey de Cosenos:\nc² = a² + b² − 2ab·cos C\n\nSe usa cuando conocemos:\n• Dos lados y el ángulo comprendido (LAL)\n• Los tres lados (LLL) — para hallar ángulos\n\nNota: cuando C = 90°, cos 90° = 0 y se reduce a Pitágoras: c² = a² + b²\n\nEjemplo — Ley de Cosenos:\nTriángulo con a = 5, b = 7, C = 60°\nc² = 25 + 49 − 2(5)(7)cos 60°\nc² = 74 − 70(0.5) = 74 − 35 = 39\nc = √39 ≈ 6.24\n\nEjemplo — Ley de Senos:\nTriángulo con A = 40°, B = 60°, a = 8\nC = 180° − 40° − 60° = 80°\nb/sen 60° = 8/sen 40°\nb = 8 × sen 60° / sen 40° = 8 × 0.866 / 0.643 ≈ 10.78\n\nCaso ambiguo (Ley de Senos):\nCuando se dan 2 lados y un ángulo no comprendido, pueden existir 0, 1 o 2 soluciones.`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Ley de Senos y Cosenos — Resolver Cualquier Triángulo",
          facts: [
            "La Ley de Cosenos fue conocida por Euclides (300 a.C.) pero en forma geométrica, no trigonométrica. La versión moderna es del siglo XV.",
            "Los ingenieros de topografía usan la Ley de Senos diariamente para medir terrenos sin recorrerlos completamente.",
            "El 'caso ambiguo' de la Ley de Senos causa más errores en exámenes que cualquier otro tema de trigonometría — un ángulo obtuso y uno agudo pueden dar el mismo seno.",
          ],
          mascotLine: "¡Con estas dos leyes puedes resolver CUALQUIER triángulo del universo! No necesitas que sea rectángulo ⚖️",
        },
      },
      {
        title: "Funciones Trigonométricas", slug: "funciones-trigonometricas", icon: "〰️", blurb: "Gráficas de seno, coseno y tangente.",
        detail: {
          intro: "Las funciones trigonométricas son funciones periódicas que modelan todo lo que oscila: sonido, luz, mareas, corriente alterna y hasta el latido del corazón. Sus gráficas son ondas con patrones predecibles y elegantes.",
          stats: [
            { icon: "🔄", label: "Período sen/cos", value: "2π" },
            { icon: "📏", label: "Amplitud", value: "|A|" },
            { icon: "〰️", label: "Forma", value: "y=A·sen(Bx+C)+D" },
          ],
          explanation: `Forma general:\ny = A·sen(Bx + C) + D\n\nParámetros:\n• A = amplitud (altura de la onda)\n• B = frecuencia angular → Período T = 2π/|B|\n• C = desfase (desplazamiento horizontal)\n• D = desplazamiento vertical\n\nCaracterísticas de y = sen x:\n• Dominio: todos los reales\n• Rango: [−1, 1]\n• Período: 2π (se repite cada 2π)\n• Cruza el origen: sen 0 = 0\n\nCaracterísticas de y = cos x:\n• Dominio: todos los reales\n• Rango: [−1, 1]\n• Período: 2π\n• Empieza en máximo: cos 0 = 1\n\nCaracterísticas de y = tan x:\n• Dominio: x ≠ π/2 + nπ (asíntotas verticales)\n• Rango: todos los reales (−∞, +∞)\n• Período: π\n\nEjemplo — y = 3sen(2x) + 1:\nAmplitud = 3\nPeríodo = 2π/2 = π\nDesplazamiento vertical = 1\nRango: [1−3, 1+3] = [−2, 4]\n\nRelación: cos x = sen(x + π/2) — el coseno es un seno desplazado.`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Funciones Trigonométricas — Gráficas y Transformaciones",
          facts: [
            "La voz humana es una combinación de funciones seno de diferentes frecuencias. Fourier demostró que CUALQUIER sonido se puede descomponer en senos.",
            "La corriente alterna en tu casa sigue la función V(t) = 170·sen(120πt). Los 120V que dice el enchufe son un promedio especial (RMS).",
            "Las mareas siguen un patrón casi sinusoidal con período de ~12.4 horas debido a la atracción gravitacional de la Luna.",
          ],
          mascotLine: "¡Todo lo que vibra, oscila o se repite es una función trigonométrica disfrazada! El universo es una onda 〰️",
        },
      },
      {
        title: "Aplicaciones", slug: "aplicaciones-trigonometria", icon: "🏗️", blurb: "Alturas, distancias y problemas reales.",
        detail: {
          intro: "La trigonometría tiene aplicaciones prácticas increíbles: medir la altura de un edificio sin subir, calcular la distancia a una estrella o diseñar un puente. Aquí convertimos ángulos y razones en soluciones a problemas del mundo real.",
          stats: [
            { icon: "🏗️", label: "Elevación", value: "Ángulo hacia arriba" },
            { icon: "⬇️", label: "Depresión", value: "Ángulo hacia abajo" },
            { icon: "📍", label: "Navegación", value: "Rumbos y distancias" },
          ],
          explanation: `Conceptos clave para problemas aplicados:\n\nÁngulo de elevación: ángulo medido desde la horizontal HACIA ARRIBA\nÁngulo de depresión: ángulo medido desde la horizontal HACIA ABAJO\n\n(El ángulo de elevación desde A es igual al ángulo de depresión desde B, por ángulos alternos internos)\n\nEjemplo 1 — Altura de un edificio:\nDesde un punto a 50 m de la base, el ángulo de elevación a la azotea es 35°.\ntan 35° = h / 50\nh = 50 × tan 35° = 50 × 0.7002 ≈ 35.01 m\n\nEjemplo 2 — Distancia inaccesible:\nDesde dos puntos A y B separados 100 m, se mide el ángulo a un punto C:\nÁngulo A = 65°, Ángulo B = 48°, Ángulo C = 180° − 65° − 48° = 67°\nPor Ley de Senos: AC/sen 48° = 100/sen 67°\nAC = 100 × sen 48° / sen 67° ≈ 80.7 m\n\nEjemplo 3 — Navegación:\nUn barco navega 30 km al Norte y luego 20 km a N60°E.\n¿A qué distancia está del punto de partida?\nUsando Ley de Cosenos con ángulo incluido de 60°:\nd² = 30² + 20² − 2(30)(20)cos 120° = 900 + 400 + 600 = 1900\nd ≈ 43.6 km\n\nAplicaciones profesionales:\n• Topografía y agrimensura\n• Diseño de antenas y telecomunicaciones\n• Animación 3D y videojuegos\n• Astronomía y cálculo de distancias estelares`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Aplicaciones de Trigonometría — Problemas del Mundo Real",
          facts: [
            "Eratóstenes calculó la circunferencia de la Tierra en el 240 a.C. usando trigonometría básica y la sombra de un palo. ¡Se equivocó solo en un 2%!",
            "Los videojuegos 3D usan funciones trigonométricas miles de veces por segundo para calcular ángulos de visión, iluminación y movimiento de personajes.",
            "Los astrónomos miden la distancia a estrellas cercanas usando paralaje trigonométrico: observan la estrella desde dos puntos de la órbita terrestre y calculan el ángulo.",
          ],
          mascotLine: "¡La trigonometría mide lo imposible! Alturas sin escalar, distancias sin caminar... ¡es casi magia! 🪄",
        },
      },
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
      {
        title: "Límites", slug: "limites", icon: "🎯", blurb: "Qué pasa cuando x se acerca a un valor.",
        detail: {
          intro: "Los límites son la base del cálculo: describen el comportamiento de una función cuando la variable se acerca a un valor sin necesariamente alcanzarlo. Sin límites no existirían ni las derivadas ni las integrales.",
          stats: [
            { icon: "📝", label: "Notación", value: "lim x→a f(x)" },
            { icon: "🎯", label: "Concepto", value: "Tendencia" },
            { icon: "♾️", label: "Especial", value: "Límites al ∞" },
          ],
          explanation: `Definición intuitiva:\nlím(x→a) f(x) = L significa que f(x) se acerca a L cuando x se acerca a a.\n\nPropiedades de los límites:\n• lím [f(x) ± g(x)] = lím f(x) ± lím g(x)\n• lím [f(x) · g(x)] = lím f(x) · lím g(x)\n• lím [f(x) / g(x)] = lím f(x) / lím g(x) (si lím g(x) ≠ 0)\n• lím [c · f(x)] = c · lím f(x)\n\nFormas indeterminadas:\n0/0, ∞/∞, 0·∞, ∞−∞, 0⁰, 1^∞, ∞⁰\n\nTécnicas para resolver 0/0:\n• Factorización\n• Racionalización (multiplicar por conjugado)\n• Regla de L'Hôpital: lím f(x)/g(x) = lím f'(x)/g'(x)\n\nEjemplo — Factorización:\nlím(x→2) (x² − 4)/(x − 2)\n= lím(x→2) (x+2)(x−2)/(x−2)\n= lím(x→2) (x + 2) = 4\n\nLímite notable:\nlím(x→0) sen(x)/x = 1\n\nLímites al infinito:\nlím(x→∞) (3x² + 1)/(x² − 5) = 3/1 = 3\n(Se dividen los coeficientes del término de mayor grado)\n\nContinuidad: f es continua en a si lím(x→a) f(x) = f(a)`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Límites — Concepto, Técnicas y Ejemplos",
          facts: [
            "Los griegos ya usaban ideas de límites (método de exhaución de Arquímedes) pero sin formalizarlas. La definición rigurosa llegó con Cauchy y Weierstrass en el siglo XIX.",
            "La paradoja de Zenón ('Aquiles nunca alcanza a la tortuga') se resuelve con límites: la suma infinita de intervalos cada vez menores SÍ converge.",
            "lím(n→∞) (1 + 1/n)^n = e ≈ 2.71828... Este límite define el número e, base de los logaritmos naturales.",
          ],
          mascotLine: "¡Los límites son como espiar a una función: ver a dónde va sin necesidad de que llegue! 🔭",
        },
      },
      {
        title: "Derivadas", slug: "derivadas", icon: "📉", blurb: "La tasa de cambio instantánea.",
        detail: {
          intro: "La derivada mide cómo cambia una función en cada instante. Es la pendiente de la recta tangente a la curva en un punto. Con ella podemos calcular velocidades instantáneas, tasas de crecimiento y encontrar máximos y mínimos.",
          stats: [
            { icon: "📝", label: "Notación", value: "f'(x), dy/dx" },
            { icon: "📐", label: "Geométrica", value: "Pendiente tangente" },
            { icon: "🏎️", label: "Física", value: "Velocidad" },
          ],
          explanation: `Definición de derivada:\nf'(x) = lím(h→0) [f(x+h) − f(x)] / h\n\nInterpretaciones:\n• Geométrica: pendiente de la recta tangente en el punto\n• Física: velocidad instantánea (si f es posición)\n• General: tasa de cambio instantánea\n\nNotaciones equivalentes:\nf'(x) = dy/dx = df/dx = Df(x)\n\nDerivadas básicas:\n• d/dx [c] = 0\n• d/dx [x^n] = nx^(n−1)\n• d/dx [e^x] = e^x\n• d/dx [ln x] = 1/x\n• d/dx [sen x] = cos x\n• d/dx [cos x] = −sen x\n• d/dx [tan x] = sec²x\n\nEjemplo — Derivada desde la definición:\nf(x) = x², hallar f'(x):\nf'(x) = lím(h→0) [(x+h)² − x²] / h\n= lím(h→0) [x² + 2xh + h² − x²] / h\n= lím(h→0) [2xh + h²] / h\n= lím(h→0) (2x + h) = 2x\n\nAplicación — Velocidad:\nSi posición s(t) = 5t² + 3t, la velocidad es:\nv(t) = s'(t) = 10t + 3\nEn t = 2: v(2) = 23 m/s`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Derivadas — Definición, Interpretación y Cálculo",
          facts: [
            "Newton y Leibniz inventaron el cálculo independientemente en la década de 1670, lo que provocó una disputa de plagio que duró décadas entre matemáticos ingleses y alemanes.",
            "La derivada de la posición es la velocidad, y la derivada de la velocidad es la aceleración. ¡Newton las necesitó para describir la gravedad!",
            "La notación dy/dx de Leibniz resultó más práctica que la de Newton (ẏ), por eso hoy dominamos el estilo continental.",
          ],
          mascotLine: "¡La derivada es la velocidad de las funciones! Te dice exactamente qué tan rápido cambian las cosas 🏎️",
        },
      },
      {
        title: "Reglas de Derivación", slug: "reglas-de-derivacion", icon: "📋", blurb: "Potencia, cadena, producto y cociente.",
        detail: {
          intro: "Las reglas de derivación son fórmulas que permiten derivar cualquier función compuesta sin volver a la definición de límite. La regla de la cadena, producto y cociente son las tres herramientas esenciales del cálculo diferencial.",
          stats: [
            { icon: "⚡", label: "Potencia", value: "nxⁿ⁻¹" },
            { icon: "🔗", label: "Cadena", value: "f'(g(x))·g'(x)" },
            { icon: "✖️", label: "Producto", value: "f'g + fg'" },
          ],
          explanation: `Reglas fundamentales de derivación:\n\n1. Regla de la potencia:\nd/dx [x^n] = n·x^(n−1)\nEjemplo: d/dx [x⁵] = 5x⁴\n\n2. Constante multiplicativa:\nd/dx [c·f(x)] = c·f'(x)\nEjemplo: d/dx [3x⁴] = 12x³\n\n3. Regla de la suma:\nd/dx [f ± g] = f' ± g'\n\n4. Regla del producto:\nd/dx [f·g] = f'·g + f·g'\nEjemplo: d/dx [x²·sen x] = 2x·sen x + x²·cos x\n\n5. Regla del cociente:\nd/dx [f/g] = (f'·g − f·g') / g²\nEjemplo: d/dx [x/(x+1)] = [(1)(x+1) − x(1)] / (x+1)² = 1/(x+1)²\n\n6. Regla de la cadena:\nd/dx [f(g(x))] = f'(g(x)) · g'(x)\nEjemplo: d/dx [sen(3x²)] = cos(3x²) · 6x\n\nEjemplo combinado:\nd/dx [(2x+1)⁵]\n= 5(2x+1)⁴ · 2 = 10(2x+1)⁴\n\nDerivación logarítmica (útil para funciones complicadas):\nSi y = f(x), tomar ln de ambos lados y derivar:\ny'/y = [ln f(x)]' → y' = f(x) · [ln f(x)]'`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Reglas de Derivación — Cadena, Producto y Cociente",
          facts: [
            "La regla de la cadena se usa millones de veces por segundo en inteligencia artificial: el algoritmo de backpropagation en redes neuronales es esencialmente la regla de la cadena aplicada repetidamente.",
            "La regla del producto fue descubierta por Leibniz y a veces se llama 'regla de Leibniz'. La escribió en una sola línea en sus cuadernos de 1684.",
            "Un polinomio de grado n se puede derivar n veces antes de volverse 0. La derivada número n+1 y todas las siguientes son 0.",
          ],
          mascotLine: "¡Con estas reglas puedes derivar CUALQUIER función sin volver a los límites! Son atajos poderosos 📋⚡",
        },
      },
      {
        title: "Integrales", slug: "integrales", icon: "∫", blurb: "El camino inverso de la derivada.",
        detail: {
          intro: "La integral es la operación inversa de la derivada. Mientras la derivada descompone, la integral acumula. Permite calcular áreas bajo curvas, volúmenes de revolución y reconstruir funciones a partir de sus tasas de cambio.",
          stats: [
            { icon: "∫", label: "Indefinida", value: "∫f(x)dx = F(x)+C" },
            { icon: "📐", label: "Definida", value: "∫[a,b] f(x)dx" },
            { icon: "📏", label: "Resultado", value: "Área bajo la curva" },
          ],
          explanation: `Integral indefinida (antiderivada):\n∫f(x)dx = F(x) + C, donde F'(x) = f(x)\n\nC es la constante de integración (hay infinitas antiderivadas).\n\nIntegrales básicas:\n• ∫x^n dx = x^(n+1)/(n+1) + C  (n ≠ −1)\n• ∫(1/x) dx = ln|x| + C\n• ∫e^x dx = e^x + C\n• ∫sen x dx = −cos x + C\n• ∫cos x dx = sen x + C\n• ∫sec²x dx = tan x + C\n\nIntegral definida:\n∫[a,b] f(x)dx = F(b) − F(a)\n\nRepresenta el área neta bajo la curva f(x) entre x = a y x = b.\n\nEjemplo — Integral indefinida:\n∫(3x² + 2x − 1)dx = x³ + x² − x + C\n\nEjemplo — Integral definida (área):\n∫[0,2] x² dx = [x³/3] de 0 a 2 = 8/3 − 0 = 8/3\n\nTécnicas de integración:\n• Sustitución: ∫f(g(x))·g'(x)dx → ∫f(u)du\n• Por partes: ∫u dv = uv − ∫v du\n• Fracciones parciales\n• Sustitución trigonométrica`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Integrales — Indefinidas, Definidas y Técnicas",
          facts: [
            "El símbolo ∫ fue inventado por Leibniz en 1675 y es una S estilizada que significa 'summa' (suma en latín), porque la integral es una suma infinita de rectángulos infinitesimales.",
            "Calcular ∫e^(−x²)dx es imposible con funciones elementales, pero su integral de −∞ a +∞ es exactamente √π. Esta integral es fundamental en estadística.",
            "Los métodos numéricos de integración (Simpson, trapecios) se usan en la NASA para calcular trayectorias de cohetes cuando no existe antiderivada exacta.",
          ],
          mascotLine: "¡Integrar es sumar infinitas porciones infinitesimales! Es el superpoder que calcula áreas imposibles ∫✨",
        },
      },
      {
        title: "Aplicaciones", slug: "aplicaciones-calculo", icon: "📊", blurb: "Áreas, volúmenes y problemas de optimización.",
        detail: {
          intro: "El cálculo cobra vida en sus aplicaciones: encontrar el máximo beneficio, el mínimo costo, el área exacta de una región irregular o el volumen de un sólido de revolución. Aquí es donde la teoría se convierte en herramienta práctica.",
          stats: [
            { icon: "📈", label: "Optimización", value: "f'(x) = 0" },
            { icon: "📐", label: "Área", value: "∫[a,b] f(x)dx" },
            { icon: "🔄", label: "Volumen rev.", value: "π∫[a,b] f²(x)dx" },
          ],
          explanation: `Aplicaciones del cálculo diferencial (derivadas):\n\nOptimización — encontrar máximos y mínimos:\n1. Encontrar f'(x) = 0 (puntos críticos)\n2. Usar f''(x) para clasificar:\n   • f''(x) < 0 → máximo local\n   • f''(x) > 0 → mínimo local\n\nEjemplo — Maximizar área:\nCon 100 m de cerca, ¿qué rectángulo tiene área máxima?\nPerímetro: 2x + 2y = 100 → y = 50 − x\nÁrea: A(x) = x(50 − x) = 50x − x²\nA'(x) = 50 − 2x = 0 → x = 25, y = 25 (¡un cuadrado!)\nÁrea máxima = 625 m²\n\nAplicaciones del cálculo integral:\n\nÁrea entre curvas:\nA = ∫[a,b] [f(x) − g(x)] dx  (f arriba, g abajo)\n\nVolumen de revolución (método del disco):\nV = π ∫[a,b] [f(x)]² dx\n\nVolumen (método de cascarones):\nV = 2π ∫[a,b] x·f(x) dx\n\nRecorrido (longitud de arco):\nL = ∫[a,b] √[1 + (f'(x))²] dx\n\nTrabajo en física:\nW = ∫[a,b] F(x) dx`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Aplicaciones del Cálculo — Optimización y Volúmenes",
          facts: [
            "Las empresas usan cálculo para maximizar beneficios: la condición 'ingreso marginal = costo marginal' es simplemente igualar derivadas.",
            "El volumen de una esfera V = (4/3)πr³ se puede demostrar integrando discos circulares apilados — ¡Arquímedes lo hizo sin cálculo formal!",
            "SpaceX usa cálculo en tiempo real para optimizar el consumo de combustible durante el aterrizaje de sus cohetes Falcon 9.",
          ],
          mascotLine: "¡El cálculo resuelve problemas que ninguna otra herramienta puede! Optimizar, medir, predecir... ¡todo! 🚀",
        },
      },
      {
        title: "Teorema Fundamental", slug: "teorema-fundamental-calculo", icon: "⭐", blurb: "El puente entre derivadas e integrales.",
        detail: {
          intro: "El Teorema Fundamental del Cálculo es quizás el resultado más importante de toda la matemática moderna. Conecta las dos operaciones centrales del cálculo — derivación e integración — revelando que son procesos inversos.",
          stats: [
            { icon: "🌉", label: "Conecta", value: "Derivada ↔ Integral" },
            { icon: "📝", label: "Partes", value: "TFC-1 y TFC-2" },
            { icon: "⭐", label: "Importancia", value: "Fundamental" },
          ],
          explanation: `El Teorema Fundamental del Cálculo tiene dos partes:\n\nParte 1 (TFC-1):\nSi F(x) = ∫[a,x] f(t) dt, entonces F'(x) = f(x)\n\nEs decir: la derivada de la integral de f... es f misma. La integración y la derivación se cancelan.\n\nParte 2 (TFC-2):\n∫[a,b] f(x) dx = F(b) − F(a)\n\nDonde F es cualquier antiderivada de f (es decir, F' = f).\n\nEsto nos dice que para calcular una integral definida NO necesitamos hacer sumas de Riemann infinitas — basta encontrar una antiderivada y evaluar.\n\nEjemplo — TFC-2:\n∫[1,3] 2x dx = [x²] de 1 a 3 = 9 − 1 = 8\n\nVerificación con área:\nEs el área bajo y = 2x de x=1 a x=3.\nTrapecio con bases 2 y 6, altura 2:\nA = (2+6)×2/2 = 8 ✓\n\nEjemplo — TFC-1:\nSi F(x) = ∫[0,x] sen(t²) dt\nEntonces F'(x) = sen(x²)\n\nCon regla de la cadena:\nSi G(x) = ∫[0,x²] sen(t) dt\nEntonces G'(x) = sen(x²) · 2x\n\nImportancia histórica:\nAntes del TFC, calcular áreas requería sumar infinitos rectángulos (método de exhaución). El TFC transformó un problema infinito en un cálculo finito.`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Teorema Fundamental del Cálculo — La Conexión Derivada-Integral",
          facts: [
            "Newton y Leibniz descubrieron el TFC independientemente en la década de 1670, pero James Gregory lo había intuido unos años antes sin publicarlo formalmente.",
            "Antes del TFC, calcular el área bajo una parábola le tomaba a Arquímedes páginas de argumentos geométricos. Con el TFC se hace en una línea.",
            "El TFC es tan importante que algunos lo llaman 'el teorema más útil de todas las matemáticas' — sin él, la física, ingeniería y economía modernas no existirían.",
          ],
          mascotLine: "¡El TFC es el puente de oro entre derivar e integrar! Newton y Leibniz estarían orgullosos de que lo aprendas ⭐🌉",
        },
      },
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
      {
        title: "Medidas de Tendencia Central", slug: "medidas-tendencia-central", icon: "📏", blurb: "Media, mediana y moda.",
        detail: {
          intro: "Las medidas de tendencia central resumen un conjunto de datos con un solo valor 'típico'. Media, mediana y moda responden la pregunta: ¿cuál es el valor representativo de estos datos? Cada una tiene fortalezas diferentes según el contexto.",
          stats: [
            { icon: "📊", label: "Media", value: "x̄ = Σx/n" },
            { icon: "📍", label: "Mediana", value: "Valor central" },
            { icon: "🔝", label: "Moda", value: "Más frecuente" },
          ],
          explanation: `Medidas de tendencia central:\n\n1. Media aritmética (promedio):\nx̄ = (x₁ + x₂ + ... + xₙ) / n = Σxᵢ / n\n\nVentaja: usa todos los datos\nDesventaja: sensible a valores extremos (outliers)\n\n2. Mediana:\nEl valor central cuando los datos están ordenados.\n• Si n es impar: el dato en la posición (n+1)/2\n• Si n es par: promedio de los dos centrales\n\nVentaja: no se afecta por valores extremos\n\n3. Moda:\nEl valor que más se repite.\n• Puede no existir (todos diferentes)\n• Puede haber varias (bimodal, multimodal)\n\nEjemplo:\nDatos: {2, 3, 5, 5, 7, 8, 100}\nMedia = (2+3+5+5+7+8+100)/7 = 130/7 ≈ 18.6\nMediana = 5 (el dato central)\nModa = 5 (el más repetido)\n\n¡La media (18.6) no es representativa por culpa del 100!\nLa mediana (5) describe mejor el "centro" del grupo.\n\n¿Cuándo usar cada una?\n• Media: datos simétricos sin outliers (calificaciones de una clase)\n• Mediana: datos con valores extremos (salarios de un país)\n• Moda: datos categóricos (color favorito, talla más vendida)\n\nMedia ponderada:\nx̄ₚ = Σ(wᵢ · xᵢ) / Σwᵢ\nÚtil cuando los datos tienen diferente importancia.`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Medidas de Tendencia Central — Media, Mediana y Moda",
          facts: [
            "El salario promedio de un país puede ser muy engañoso: si Bill Gates entra a un bar, el 'promedio' de riqueza del bar se dispara, pero nadie se vuelve rico. Por eso se prefiere la mediana.",
            "La moda es la única medida de tendencia central que puede usarse con datos no numéricos: '¿cuál es el color de carro más popular?'",
            "Karl Pearson propuso una relación aproximada: Media − Moda ≈ 3(Media − Mediana), útil para estimar la asimetría de una distribución.",
          ],
          mascotLine: "¡Media, mediana y moda son tres formas de decir 'lo típico'! Cada una cuenta una historia diferente 📊",
        },
      },
      {
        title: "Medidas de Dispersión", slug: "medidas-de-dispersion", icon: "↔️", blurb: "Rango, varianza y desviación estándar.",
        detail: {
          intro: "Las medidas de dispersión indican qué tan esparcidos están los datos alrededor del centro. Dos grupos pueden tener la misma media pero dispersiones muy diferentes — y eso cambia todo el análisis.",
          stats: [
            { icon: "↔️", label: "Rango", value: "máx − mín" },
            { icon: "📐", label: "Varianza", value: "σ²" },
            { icon: "📏", label: "Desv. Est.", value: "σ" },
          ],
          explanation: `Medidas de dispersión — ¿qué tan dispersos están los datos?\n\n1. Rango:\nR = valor máximo − valor mínimo\nSimple pero ignora los datos intermedios.\n\n2. Varianza:\nσ² = Σ(xᵢ − x̄)² / n      (poblacional)\ns² = Σ(xᵢ − x̄)² / (n−1)   (muestral)\n\nMide el promedio de las desviaciones al cuadrado respecto a la media.\n\n3. Desviación estándar:\nσ = √(varianza)\n\nTiene las mismas unidades que los datos (la varianza está en unidades²).\n\n4. Coeficiente de variación:\nCV = (σ / x̄) × 100%\n\nPermite comparar dispersiones de datos con diferentes unidades.\n\nEjemplo:\nDatos: {4, 7, 8, 9, 12}\nMedia = 40/5 = 8\nDesviaciones: (−4, −1, 0, 1, 4)\nDesviaciones²: (16, 1, 0, 1, 16)\nVarianza = 34/5 = 6.8\nDesv. Est. = √6.8 ≈ 2.61\n\nInterpretación:\n• σ pequeña: datos concentrados cerca de la media\n• σ grande: datos muy dispersos\n\nRegla empírica (para datos normales):\n• ~68% de datos dentro de x̄ ± 1σ\n• ~95% dentro de x̄ ± 2σ\n• ~99.7% dentro de x̄ ± 3σ`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Medidas de Dispersión — Varianza y Desviación Estándar",
          facts: [
            "Se divide entre n−1 (en lugar de n) en la varianza muestral para corregir un sesgo: la muestra tiende a subestimar la variabilidad real. Esto se llama corrección de Bessel.",
            "En control de calidad industrial, un producto está 'fuera de control' si cae más allá de 3 desviaciones estándar de la media — un evento con probabilidad < 0.3%.",
            "La desviación estándar del IQ se fijó artificialmente en 15 puntos por diseño de la prueba: un IQ de 130 significa estar a 2σ por encima de la media.",
          ],
          mascotLine: "¡La media sin dispersión es como un mapa sin escala! La desviación estándar te dice cuánto varían las cosas ↔️",
        },
      },
      {
        title: "Gráficos Estadísticos", slug: "graficos-estadisticos", icon: "📈", blurb: "Barras, histogramas, circulares y más.",
        detail: {
          intro: "Los gráficos estadísticos convierten tablas de números en imágenes que el cerebro procesa instantáneamente. Elegir el gráfico correcto puede revelar patrones, tendencias y anomalías que son invisibles en los datos crudos.",
          stats: [
            { icon: "📊", label: "Barras", value: "Comparación" },
            { icon: "📈", label: "Líneas", value: "Tendencias" },
            { icon: "🥧", label: "Circular", value: "Proporciones" },
          ],
          explanation: `Tipos de gráficos y cuándo usarlos:\n\n1. Gráfico de barras:\n• Compara categorías\n• Barras separadas (datos discretos/categóricos)\n• Ejemplo: votos por candidato, ventas por mes\n\n2. Histograma:\n• Distribución de frecuencias (datos continuos)\n• Barras pegadas (intervalos consecutivos)\n• Ejemplo: alturas de estudiantes, tiempos de espera\n\n3. Gráfico circular (pie chart):\n• Muestra proporciones del total (porcentajes)\n• Máximo 5-6 categorías para ser legible\n• Ejemplo: distribución del presupuesto\n\n4. Gráfico de líneas:\n• Muestra tendencias en el tiempo\n• Ideal para series temporales\n• Ejemplo: temperatura diaria, precio de acciones\n\n5. Diagrama de caja (box plot):\n• Muestra mediana, cuartiles y valores atípicos\n• Q1 (25%), Q2 (mediana), Q3 (75%)\n• Rango intercuartil: IQR = Q3 − Q1\n• Outliers: datos más allá de 1.5×IQR de Q1 o Q3\n\n6. Diagrama de dispersión:\n• Relación entre dos variables\n• Muestra correlación (positiva, negativa, nula)\n\nEjemplo — Interpretar un box plot:\nSi la caja está desplazada a la derecha con bigote largo a la izquierda → asimetría negativa (cola izquierda).`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Gráficos Estadísticos — Cuándo y Cómo Usarlos",
          facts: [
            "Florence Nightingale no solo fue enfermera: inventó el 'diagrama de rosa' (un gráfico polar) para convencer al gobierno británico de mejorar la sanidad militar.",
            "Edward Tufte demostró que un gráfico mal diseñado contribuyó al desastre del transbordador Challenger en 1986 — los ingenieros no pudieron comunicar el riesgo visualmente.",
            "El cerebro procesa imágenes 60,000 veces más rápido que texto. Un buen gráfico puede comunicar en 3 segundos lo que una tabla no comunica en 3 minutos.",
          ],
          mascotLine: "¡Una imagen vale más que mil datos! El gráfico correcto hace que los números hablen 📊🎨",
        },
      },
      {
        title: "Distribución Normal", slug: "distribucion-normal", icon: "🔔", blurb: "La campana de Gauss y sus propiedades.",
        detail: {
          intro: "La distribución normal (o campana de Gauss) es la distribución más importante de la estadística. Aparece naturalmente cuando muchos factores aleatorios independientes se suman, y es la base de la mayoría de las pruebas estadísticas.",
          stats: [
            { icon: "📐", label: "Parámetros", value: "μ (media), σ (desv.)" },
            { icon: "🔔", label: "Forma", value: "Campana simétrica" },
            { icon: "📊", label: "Estándar", value: "Z ~ N(0,1)" },
          ],
          explanation: `La distribución normal N(μ, σ²):\n\nFunción de densidad:\nf(x) = (1/(σ√(2π))) · e^(−(x−μ)²/(2σ²))\n\nPropiedades:\n• Simétrica respecto a la media μ\n• Media = Mediana = Moda = μ\n• Forma de campana\n• Determinada completamente por μ y σ\n• El área total bajo la curva = 1\n\nRegla 68-95-99.7:\n• 68.27% de datos en [μ−σ, μ+σ]\n• 95.45% de datos en [μ−2σ, μ+2σ]\n• 99.73% de datos en [μ−3σ, μ+3σ]\n\nDistribución normal estándar Z ~ N(0, 1):\nPara estandarizar: Z = (X − μ) / σ\n\nEjemplo:\nLas alturas de hombres adultos siguen N(175, 7²) cm.\n¿Qué % mide más de 189 cm?\n\nZ = (189 − 175) / 7 = 2\nP(Z > 2) ≈ 2.28%\n\nSolo ~2.3% de los hombres mide más de 189 cm.\n\nTeorema del Límite Central:\nSin importar la distribución original, la media de n muestras grandes se distribuye NORMALMENTE. ¡Por eso la normal aparece en todas partes!`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Distribución Normal — La Campana de Gauss",
          facts: [
            "Carl Friedrich Gauss usó la distribución normal para predecir la órbita del asteroide Ceres en 1801, encontrándolo exactamente donde calculó. Desde entonces se llama 'campana de Gauss'.",
            "El Teorema del Límite Central explica por qué la normal aparece en todas partes: cualquier suma de muchas variables aleatorias independientes tiende a la normal, sin importar su distribución original.",
            "Las pruebas estandarizadas (SAT, IQ, TOEFL) están diseñadas para que los resultados sigan una distribución normal con media y desviación estándar predeterminadas.",
          ],
          mascotLine: "¡La campana de Gauss está en TODAS partes! Alturas, pesos, errores... la naturaleza ama la simetría 🔔",
        },
      },
      {
        title: "Muestreo", slug: "muestreo", icon: "🎣", blurb: "Cómo elegir datos representativos.",
        detail: {
          intro: "El muestreo es el arte de elegir una parte (muestra) de un grupo grande (población) de manera que las conclusiones obtenidas sean válidas para todo el grupo. Un mal muestreo invalida cualquier análisis estadístico.",
          stats: [
            { icon: "👥", label: "Población", value: "N (todos)" },
            { icon: "📋", label: "Muestra", value: "n (seleccionados)" },
            { icon: "🎯", label: "Clave", value: "Representatividad" },
          ],
          explanation: `Conceptos fundamentales:\n• Población: el grupo completo que queremos estudiar\n• Muestra: subconjunto seleccionado de la población\n• Parámetro: medida de la población (μ, σ)\n• Estadístico: medida de la muestra (x̄, s)\n\nTipos de muestreo probabilístico:\n\n1. Aleatorio simple:\nCada individuo tiene la misma probabilidad de ser elegido.\nEjemplo: numerar a todos y usar un generador aleatorio.\n\n2. Estratificado:\nDividir la población en grupos homogéneos (estratos) y muestrear de cada uno.\nEjemplo: 60% mujeres, 40% hombres → muestra proporcional.\n\n3. Sistemático:\nElegir cada k-ésimo elemento de una lista.\nEjemplo: de 1000 personas, elegir cada 10ª → n = 100.\n\n4. Por conglomerados:\nDividir en grupos (conglomerados) y elegir algunos al azar completos.\nEjemplo: elegir 5 escuelas al azar y encuestar a TODOS sus alumnos.\n\nTamaño de muestra:\nn = (Z² · p · q) / E²\nDonde Z = nivel de confianza, p = proporción estimada, E = error máximo.\n\nEjemplo: Para 95% de confianza, proporción desconocida (p=0.5), error 3%:\nn = (1.96² × 0.5 × 0.5) / 0.03² = 0.9604 / 0.0009 ≈ 1068 personas\n\nSesgos comunes:\n• Sesgo de selección: la muestra no es aleatoria\n• Sesgo de no respuesta: los que no contestan son diferentes\n• Sesgo del superviviente: solo vemos a los que "sobrevivieron"`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Muestreo — Tipos y Tamaño de Muestra",
          facts: [
            "En 1936, la revista Literary Digest predijo que Landon ganaría las elecciones de EE.UU. con una encuesta de 2.4 millones de personas — pero perdió. Su muestra estaba sesgada (solo encuestaron a suscriptores ricos).",
            "Con una muestra aleatoria de ~1000 personas puedes estimar la opinión de un país de 300 millones con un margen de error de solo ±3%.",
            "El 'sesgo del superviviente' es famoso en aviación: en WWII, Abraham Wald recomendó blindar las partes de los aviones que NO tenían agujeros, porque los que tenían agujeros allí ¡no volvieron!",
          ],
          mascotLine: "¡No necesitas preguntar a TODOS para saber qué piensa un país! El muestreo es magia estadística 🎣✨",
        },
      },
      {
        title: "Regresión", slug: "regresion", icon: "📐", blurb: "Encontrar la línea que mejor se ajusta.",
        detail: {
          intro: "La regresión lineal encuentra la recta que mejor se ajusta a un conjunto de datos, permitiendo predecir valores futuros y entender la relación entre variables. Es la herramienta predictiva más usada en ciencia y negocios.",
          stats: [
            { icon: "📐", label: "Ecuación", value: "ŷ = a + bx" },
            { icon: "📊", label: "Correlación", value: "r ∈ [−1, 1]" },
            { icon: "🎯", label: "Ajuste", value: "R² (0 a 1)" },
          ],
          explanation: `Regresión lineal simple:\nŷ = a + bx (recta de mejor ajuste)\n\nDonde:\n• b = pendiente = n·Σ(xy) − Σx·Σy / [n·Σx² − (Σx)²]\n• a = intercepto = ȳ − b·x̄\n\nMétodo de mínimos cuadrados:\nMinimiza la suma de los cuadrados de las diferencias entre valores reales y predichos:\nMinimizar Σ(yᵢ − ŷᵢ)²\n\nCoeficiente de correlación (r de Pearson):\nr = [n·Σxy − Σx·Σy] / √{[n·Σx² − (Σx)²][n·Σy² − (Σy)²]}\n\nInterpretación de r:\n• r = 1: correlación positiva perfecta\n• r = −1: correlación negativa perfecta\n• r = 0: no hay correlación lineal\n• |r| > 0.7: correlación fuerte\n• 0.3 < |r| < 0.7: correlación moderada\n\nCoeficiente de determinación R²:\nR² = r² → proporción de variabilidad explicada por el modelo\nR² = 0.85 significa que el modelo explica el 85% de la variación.\n\nEjemplo simplificado:\nDatos: (1,2), (2,4), (3,5), (4,4), (5,5)\nCalculando: b ≈ 0.6, a ≈ 2.2\nRecta: ŷ = 2.2 + 0.6x\nPredicción para x = 6: ŷ = 2.2 + 3.6 = 5.8\n\n¡Cuidado! Correlación NO implica causalidad.\nEl consumo de helados y los ahogamientos están correlacionados — pero el helado no causa ahogamientos (ambos se relacionan con el calor).`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Regresión Lineal — Correlación y Predicción",
          facts: [
            "Francis Galton inventó la regresión en 1886 al estudiar alturas de padres e hijos: los hijos de padres muy altos tendían a ser más bajos (regresaban a la media). De ahí el nombre 'regresión'.",
            "La correlación más famosa falsa: el consumo de queso per cápita en EE.UU. está correlacionado con el número de personas que mueren enredadas en sus sábanas (r = 0.95). Pura coincidencia.",
            "Los algoritmos de Machine Learning más sofisticados (deep learning) son en esencia extensiones no lineales de la regresión con millones de parámetros.",
          ],
          mascotLine: "¡La regresión encuentra la línea escondida en la nube de puntos! Predecir el futuro con datos del pasado 🔮",
        },
      },
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
      {
        title: "Teoría de Conjuntos", slug: "teoria-de-conjuntos", icon: "⊂", blurb: "Unión, intersección y complemento.",
        detail: {
          intro: "La teoría de conjuntos es el lenguaje fundamental de las matemáticas modernas. Define cómo agrupar, combinar y relacionar colecciones de objetos, y es la base sobre la cual se construyen todas las demás ramas matemáticas.",
          stats: [
            { icon: "∪", label: "Unión", value: "A ∪ B" },
            { icon: "∩", label: "Intersección", value: "A ∩ B" },
            { icon: "∁", label: "Complemento", value: "A'" },
          ],
          explanation: `Un conjunto es una colección bien definida de objetos (elementos).\n\nNotación:\n• Pertenencia: x ∈ A (x pertenece a A)\n• No pertenencia: x ∉ A\n• Subconjunto: A ⊂ B (todo elemento de A está en B)\n• Conjunto vacío: ∅ (no tiene elementos)\n\nOperaciones:\n• Unión: A ∪ B = {x | x ∈ A o x ∈ B}\n• Intersección: A ∩ B = {x | x ∈ A y x ∈ B}\n• Diferencia: A − B = {x | x ∈ A y x ∉ B}\n• Complemento: A' = {x | x ∈ U y x ∉ A}\n• Producto cartesiano: A × B = {(a,b) | a ∈ A, b ∈ B}\n\nLeyes de De Morgan:\n• (A ∪ B)' = A' ∩ B'\n• (A ∩ B)' = A' ∪ B'\n\nDiagramas de Venn:\nRepresentación visual de conjuntos como círculos. La zona sombreada indica el resultado de la operación.\n\nCardinalidad (número de elementos):\n|A ∪ B| = |A| + |B| − |A ∩ B|\n\nEjemplo:\nA = {1,2,3,4,5}, B = {3,4,5,6,7}\nA ∪ B = {1,2,3,4,5,6,7}\nA ∩ B = {3,4,5}\nA − B = {1,2}\n|A ∪ B| = 5 + 5 − 3 = 7 ✓\n\nConjunto potencia: P(A) = todos los subconjuntos de A\nSi |A| = n, entonces |P(A)| = 2ⁿ`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Teoría de Conjuntos — Operaciones y Diagramas de Venn",
          facts: [
            "Georg Cantor, creador de la teoría de conjuntos, demostró que hay infinitos 'más grandes' que otros: los reales son 'más infinitos' que los naturales.",
            "La Paradoja de Russell (1901) sacudió las matemáticas: '¿el conjunto de todos los conjuntos que no se contienen a sí mismos se contiene a sí mismo?' Esto llevó a reformular toda la teoría.",
            "Las bases de datos SQL usan operaciones de conjuntos directamente: UNION, INTERSECT y EXCEPT corresponden a ∪, ∩ y −.",
          ],
          mascotLine: "¡Los conjuntos son las cajas donde guardamos las ideas matemáticas! Unir, intersecar, excluir... ¡todo es conjuntos! 📦",
        },
      },
      {
        title: "Lógica Proposicional", slug: "logica-proposicional", icon: "∧", blurb: "Verdadero, falso y conectivos lógicos.",
        detail: {
          intro: "La lógica proposicional es el sistema formal para razonar con enunciados verdaderos o falsos. Es la base de la programación, los circuitos digitales y la demostración matemática. Todo 'si/entonces' que usas es lógica proposicional.",
          stats: [
            { icon: "∧", label: "Conjunción", value: "AND (y)" },
            { icon: "∨", label: "Disyunción", value: "OR (o)" },
            { icon: "→", label: "Condicional", value: "Si...entonces" },
          ],
          explanation: `Una proposición es un enunciado que es verdadero (V) o falso (F), nunca ambos.\n\nConectivos lógicos:\n• Negación (¬p): invierte el valor de verdad\n• Conjunción (p ∧ q): verdadera solo si AMBAS son V\n• Disyunción (p ∨ q): verdadera si AL MENOS UNA es V\n• Condicional (p → q): falsa SOLO si p es V y q es F\n• Bicondicional (p ↔ q): verdadera si ambas tienen el MISMO valor\n\nTabla de verdad del condicional (p → q):\np  q  | p → q\nV  V  |   V\nV  F  |   F\nF  V  |   V\nF  F  |   V\n\nNota: "si p entonces q" solo es falso cuando la promesa se rompe (p verdadero, q falso).\n\nEquivalencias importantes:\n• p → q ≡ ¬p ∨ q\n• ¬(p ∧ q) ≡ ¬p ∨ ¬q (De Morgan)\n• ¬(p ∨ q) ≡ ¬p ∧ ¬q (De Morgan)\n• Contrapositiva: p → q ≡ ¬q → ¬p\n\nTautología: proposición siempre verdadera (p ∨ ¬p)\nContradicción: proposición siempre falsa (p ∧ ¬p)\n\nEjemplo en programación:\nif (edad >= 18 AND tieneID == true) → permitir acceso\nEsto es: p ∧ q → r`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Lógica Proposicional — Conectivos y Tablas de Verdad",
          facts: [
            "George Boole creó el álgebra booleana en 1854: V=1, F=0, AND=multiplicación, OR=suma. ¡Es exactamente cómo funcionan las computadoras a nivel de circuitos!",
            "Cada chip de computadora contiene miles de millones de puertas lógicas (AND, OR, NOT) que implementan la lógica proposicional en silicio.",
            "La contrapositiva es el truco más poderoso en demostraciones: para probar 'si llueve entonces hay nubes', es equivalente probar 'si no hay nubes entonces no llueve'.",
          ],
          mascotLine: "¡Verdadero o falso, sin grises! La lógica es el idioma de las computadoras y de las demostraciones matemáticas 🤖",
        },
      },
      {
        title: "Grafos", slug: "grafos", icon: "🕸️", blurb: "Nodos, aristas y caminos.",
        detail: {
          intro: "Un grafo es una estructura de nodos (vértices) conectados por líneas (aristas). Modelan redes sociales, mapas de carreteras, conexiones de internet y cualquier relación entre objetos. Son la herramienta favorita de la informática.",
          stats: [
            { icon: "⚪", label: "Vértices", value: "V (nodos)" },
            { icon: "➖", label: "Aristas", value: "E (conexiones)" },
            { icon: "🗺️", label: "Aplicación", value: "Redes, rutas" },
          ],
          explanation: `Un grafo G = (V, E) consiste en:\n• V = conjunto de vértices (nodos)\n• E = conjunto de aristas (conexiones entre vértices)\n\nTipos de grafos:\n• No dirigido: las aristas no tienen dirección (amistad)\n• Dirigido (digrafo): las aristas tienen dirección (seguir en Instagram)\n• Ponderado: las aristas tienen un peso/costo (distancia entre ciudades)\n• Completo Kₙ: todos conectados con todos\n\nConceptos clave:\n• Grado de un vértice: número de aristas que inciden en él\n• Camino: secuencia de vértices conectados por aristas\n• Ciclo: camino que empieza y termina en el mismo vértice\n• Grafo conexo: existe camino entre cualquier par de vértices\n\nTeorema de Euler:\nUn grafo tiene un circuito euleriano (recorre TODAS las aristas sin repetir) si y solo si todos los vértices tienen grado par.\n\nAlgoritmos famosos:\n• BFS (búsqueda en amplitud): explora nivel por nivel\n• DFS (búsqueda en profundidad): explora rama por rama\n• Dijkstra: camino más corto en grafos ponderados\n\nEjemplo — Grado:\nEn un grafo con V = {A,B,C,D} y aristas AB, AC, BC, BD:\ngrado(A) = 2, grado(B) = 3, grado(C) = 2, grado(D) = 1\nSuma de grados = 8 = 2 × |E| = 2 × 4 ✓`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Teoría de Grafos — Nodos, Aristas y Algoritmos",
          facts: [
            "La teoría de grafos nació en 1736 cuando Euler resolvió el problema de los puentes de Königsberg: demostró que era imposible cruzar los 7 puentes exactamente una vez.",
            "Google Maps usa el algoritmo de Dijkstra (o variantes como A*) para encontrar la ruta más corta entre dos puntos en un grafo con millones de nodos.",
            "Facebook es un grafo con más de 2 mil millones de nodos (personas) y cientos de miles de millones de aristas (amistades). La teoría de grafos es esencial para sus recomendaciones.",
          ],
          mascotLine: "¡Los grafos conectan todo! Desde amigos en redes sociales hasta ciudades en un mapa — ¡el mundo es un grafo gigante! 🕸️",
        },
      },
      {
        title: "Árboles", slug: "arboles", icon: "🌳", blurb: "Estructuras jerárquicas sin ciclos.",
        detail: {
          intro: "Un árbol es un grafo conexo sin ciclos: una estructura jerárquica perfecta para organizar datos. Desde los archivos de tu computadora hasta los árboles genealógicos y las decisiones de IA, los árboles están en todas partes en la informática.",
          stats: [
            { icon: "🌳", label: "Definición", value: "Conexo sin ciclos" },
            { icon: "🔢", label: "Aristas", value: "n − 1" },
            { icon: "💻", label: "Uso", value: "Datos jerárquicos" },
          ],
          explanation: `Un árbol es un grafo conexo acíclico.\n\nPropiedades de un árbol con n vértices:\n• Tiene exactamente n − 1 aristas\n• Existe un ÚNICO camino entre cualquier par de vértices\n• Eliminar una arista lo desconecta\n• Agregar una arista crea un ciclo\n\nTerminología:\n• Raíz: nodo superior (en árboles con raíz)\n• Padre: nodo inmediatamente superior\n• Hijo: nodo inmediatamente inferior\n• Hoja: nodo sin hijos\n• Profundidad: distancia desde la raíz\n• Altura: máxima profundidad del árbol\n\nÁrbol binario:\nCada nodo tiene como máximo 2 hijos (izquierdo y derecho).\n\nÁrbol binario de búsqueda (BST):\n• Hijo izquierdo < padre < hijo derecho\n• Búsqueda eficiente: O(log n) en promedio\n\nRecorridos de un árbol binario:\n• Preorden: raíz → izquierdo → derecho\n• Inorden: izquierdo → raíz → derecho (¡da orden ascendente en BST!)\n• Postorden: izquierdo → derecho → raíz\n\nÁrbol de expansión mínima (MST):\nSubgrafo que conecta todos los vértices con el menor costo total.\nAlgoritmos: Kruskal, Prim\n\nEjemplo — BST con valores 5, 3, 7, 1, 4:\n       5\n      / \\\n     3   7\n    / \\\n   1   4\nInorden: 1, 3, 4, 5, 7 (¡ordenado!)`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Árboles — Estructura de Datos Jerárquica",
          facts: [
            "El sistema de archivos de tu computadora es un árbol: carpetas contienen carpetas que contienen archivos, sin ciclos.",
            "Los motores de ajedrez (como Stockfish) exploran un árbol de decisiones con millones de nodos por segundo para elegir la mejor jugada.",
            "HTML, JSON y XML son estructuras de árbol. Cada página web que visitas es un árbol de elementos anidados (el DOM).",
          ],
          mascotLine: "¡Los árboles crecen hacia abajo en informática! Cada decisión ramifica el camino hacia la solución 🌳",
        },
      },
      {
        title: "Relaciones", slug: "relaciones", icon: "↔️", blurb: "Conexiones entre elementos de conjuntos.",
        detail: {
          intro: "Una relación es una conexión formal entre elementos de uno o más conjuntos. Las relaciones de equivalencia particionan conjuntos en clases, y las relaciones de orden los organizan en jerarquías. Son la base de las bases de datos y el álgebra abstracta.",
          stats: [
            { icon: "📝", label: "Notación", value: "R ⊂ A × B" },
            { icon: "≡", label: "Equivalencia", value: "Ref+Sim+Trans" },
            { icon: "≤", label: "Orden", value: "Ref+Anti+Trans" },
          ],
          explanation: `Una relación R de A en B es un subconjunto del producto cartesiano A × B.\nSi (a, b) ∈ R, escribimos aRb.\n\nPropiedades de relaciones (en A × A):\n• Reflexiva: ∀a ∈ A, aRa\n• Simétrica: si aRb entonces bRa\n• Antisimétrica: si aRb y bRa, entonces a = b\n• Transitiva: si aRb y bRc, entonces aRc\n\nRelación de equivalencia (reflexiva + simétrica + transitiva):\nParticiona el conjunto en clases de equivalencia.\n\nEjemplo: "tener el mismo resto al dividir por 3"\n[0] = {0, 3, 6, 9, ...}\n[1] = {1, 4, 7, 10, ...}\n[2] = {2, 5, 8, 11, ...}\n\nRelación de orden parcial (reflexiva + antisimétrica + transitiva):\nOrganiza elementos en jerarquía (algunos incomparables).\n\nEjemplo: ≤ en los naturales es un orden total.\n"divide a" (|) en los naturales es un orden parcial: 2|6 y 3|6, pero 2 y 3 son incomparables.\n\nRelación de orden total: todo par de elementos es comparable.\n\nRepresentaciones:\n• Matriz de relación: matriz booleana n×n\n• Digrafo: grafo dirigido\n• Diagrama de Hasse: para órdenes parciales (sin flechas implícitas)`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Relaciones — Equivalencia, Orden y Propiedades",
          facts: [
            "Las bases de datos 'relacionales' (SQL) se llaman así porque formalizan datos como relaciones matemáticas entre conjuntos (tablas).",
            "La igualdad (=) es la relación de equivalencia más simple: es reflexiva (a=a), simétrica (si a=b entonces b=a) y transitiva (si a=b y b=c entonces a=c).",
            "El modelo de internet con dominios y subdominios (google.com, mail.google.com) es una relación de orden parcial representable con un diagrama de Hasse.",
          ],
          mascotLine: "¡Las relaciones ponen orden en el caos! Clasificar, jerarquizar, conectar... todo empieza con una relación ↔️",
        },
      },
      {
        title: "Algoritmos Básicos", slug: "algoritmos-basicos", icon: "⚡", blurb: "Pasos para resolver problemas.",
        detail: {
          intro: "Un algoritmo es una secuencia finita de pasos bien definidos para resolver un problema. Los algoritmos son el corazón de la programación y la informática: antes de escribir código, necesitas diseñar el algoritmo correcto.",
          stats: [
            { icon: "📋", label: "Definición", value: "Pasos finitos" },
            { icon: "⏱️", label: "Complejidad", value: "O(n), O(n²)..." },
            { icon: "🔍", label: "Tipos", value: "Búsqueda, orden..." },
          ],
          explanation: `Propiedades de un algoritmo:\n• Finito: termina en un número finito de pasos\n• Definido: cada paso es preciso y no ambiguo\n• Entrada: recibe cero o más datos\n• Salida: produce al menos un resultado\n• Efectivo: cada paso es realizable\n\nComplejidad temporal (notación Big-O):\n• O(1): constante (acceder a un arreglo por índice)\n• O(log n): logarítmica (búsqueda binaria)\n• O(n): lineal (buscar en una lista)\n• O(n log n): cuasilineal (merge sort)\n• O(n²): cuadrática (bubble sort)\n• O(2ⁿ): exponencial (fuerza bruta)\n\nAlgoritmos de búsqueda:\n• Búsqueda lineal: revisar uno por uno → O(n)\n• Búsqueda binaria: dividir a la mitad → O(log n) (requiere datos ordenados)\n\nAlgoritmos de ordenamiento:\n• Bubble sort: comparar pares adyacentes → O(n²)\n• Merge sort: dividir, ordenar, fusionar → O(n log n)\n• Quick sort: pivote + partición → O(n log n) promedio\n\nEjemplo — Búsqueda binaria:\nBuscar 7 en [1, 3, 5, 7, 9, 11, 13]\n1. Medio = 7 → ¡encontrado! (solo 1 paso)\n\nSin búsqueda binaria tendríamos que revisar hasta 4 elementos.\n\nRecursión: un algoritmo que se llama a sí mismo.\nFactorial: n! = n × (n−1)!\nCaso base: 0! = 1`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Algoritmos Básicos — Búsqueda, Ordenamiento y Complejidad",
          facts: [
            "La palabra 'algoritmo' viene de Al-Juarismi, el mismo matemático persa del siglo IX que nos dio 'álgebra'. Su nombre latinizado es 'Algoritmi'.",
            "Si tienes 1 millón de datos, bubble sort (O(n²)) toma ~1 billón de operaciones, pero merge sort (O(n log n)) solo ~20 millones. ¡La diferencia entre minutos y horas!",
            "El problema P vs NP (¿todo problema verificable rápidamente se puede resolver rápidamente?) es uno de los 7 Problemas del Milenio con premio de $1 millón.",
          ],
          mascotLine: "¡Un algoritmo es una receta perfecta: pasos claros, entrada definida, resultado garantizado! El alma de la programación ⚡",
        },
      },
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
      {
        title: "Números Primos", slug: "numeros-primos", icon: "🔑", blurb: "Los bloques fundamentales de los enteros.",
        detail: {
          intro: "Los números primos son los 'átomos' de la aritmética: números mayores que 1 que solo son divisibles por 1 y por sí mismos. Toda la seguridad de Internet depende de que factorizar números grandes en primos sea extremadamente difícil.",
          stats: [
            { icon: "🔑", label: "Definición", value: "Solo 2 divisores" },
            { icon: "♾️", label: "Cantidad", value: "Infinitos" },
            { icon: "🔐", label: "Aplicación", value: "Criptografía" },
          ],
          explanation: `Un número primo p > 1 tiene exactamente dos divisores: 1 y p.\n\nPrimeros primos: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37...\n\nNota: 2 es el ÚNICO primo par. 1 NO es primo (por convención).\n\nCriba de Eratóstenes (encontrar primos hasta n):\n1. Escribir todos los números de 2 a n\n2. El primer número no tachado (2) es primo\n3. Tachar todos sus múltiplos\n4. Repetir con el siguiente no tachado\n5. Continuar hasta √n\n\nTeorema de Euclides: hay infinitos primos.\nDemostración (por contradicción):\nSupongamos que solo hay k primos: p₁, p₂, ..., pₖ\nConsideremos N = p₁·p₂·...·pₖ + 1\nN no es divisible por ningún pᵢ (resto 1)\nEntonces N es primo o tiene un factor primo nuevo → contradicción.\n\nTest de primalidad (básico):\nPara verificar si n es primo, probar divisores de 2 a √n.\nSi ninguno divide a n, entonces n es primo.\n\nEjemplo: ¿Es 97 primo?\n√97 ≈ 9.8 → probar 2, 3, 5, 7\n97/2, 97/3, 97/5, 97/7 → ninguno divide exactamente\n∴ 97 es primo ✓\n\nConjetura de Goldbach (no demostrada):\nTodo número par > 2 es suma de dos primos.\n4=2+2, 6=3+3, 8=3+5, 10=5+5, 12=5+7...`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Números Primos — Definición, Criba y Propiedades",
          facts: [
            "El mayor primo conocido (2024) es 2^136,279,841 − 1, un número con más de 41 millones de dígitos. Fue encontrado por el proyecto GIMPS.",
            "La seguridad RSA de Internet se basa en que multiplicar dos primos de 300 dígitos es instantáneo, pero factorizar su producto tomaría millones de años con computadoras actuales.",
            "Las cigarras emergen cada 13 o 17 años (ambos primos) para evitar sincronizarse con depredadores que tengan ciclos de 2, 3, 4, 5 o 6 años.",
          ],
          mascotLine: "¡Los primos son los ladrillos indestructibles de los números! Sin ellos, la criptografía no existiría 🔐",
        },
      },
      {
        title: "Divisibilidad", slug: "divisibilidad-numeros", icon: "➗", blurb: "Quién divide a quién y por qué importa.",
        detail: {
          intro: "La divisibilidad en la teoría de números estudia las relaciones profundas entre divisores y múltiplos. El algoritmo de Euclides, la función de Euler y las propiedades de divisibilidad son herramientas poderosas con aplicaciones en criptografía y computación.",
          stats: [
            { icon: "📝", label: "Notación", value: "a | b" },
            { icon: "🔄", label: "Euclides", value: "MCD eficiente" },
            { icon: "φ", label: "Euler", value: "φ(n)" },
          ],
          explanation: `a divide a b (a | b) si existe k ∈ ℤ tal que b = a·k.\n\nPropiedades de divisibilidad:\n• Si a | b y a | c, entonces a | (b ± c)\n• Si a | b, entonces a | (b·c) para todo c\n• Si a | b y b | c, entonces a | c (transitiva)\n• Si a | b y b | a, entonces a = ±b\n\nAlgoritmo de Euclides (MCD):\nMCD(a, b) = MCD(b, a mod b) hasta que b = 0\n\nEjemplo: MCD(252, 105)\n252 = 2 × 105 + 42\n105 = 2 × 42 + 21\n42 = 2 × 21 + 0\nMCD(252, 105) = 21\n\nIdentidad de Bézout:\nPara cualquier a, b existen enteros x, y tales que:\nax + by = MCD(a, b)\n\nFunción de Euler φ(n):\nCuenta cuántos números entre 1 y n son coprimos con n.\n• φ(p) = p − 1 (si p es primo)\n• φ(p·q) = (p−1)(q−1) (si p, q primos distintos)\n• φ(pᵏ) = pᵏ − pᵏ⁻¹\n\nEjemplo: φ(12) = |{1, 5, 7, 11}| = 4\n\nTeorema de Euler:\nSi MCD(a, n) = 1, entonces a^φ(n) ≡ 1 (mod n)\n\nEsto es la base del algoritmo RSA de criptografía.`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Divisibilidad — Euclides, Bézout y Función de Euler",
          facts: [
            "El algoritmo de Euclides tiene más de 2300 años y sigue siendo uno de los algoritmos más rápidos para calcular el MCD. Se usa millones de veces por segundo en criptografía.",
            "La función φ de Euler es la clave del algoritmo RSA: para descifrar un mensaje necesitas conocer φ(n), y eso requiere conocer la factorización de n.",
            "La identidad de Bézout permite encontrar el inverso modular, esencial para resolver ecuaciones en aritmética modular y en criptografía de clave pública.",
          ],
          mascotLine: "¡Euclides nos regaló un algoritmo hace 2300 años que seguimos usando HOY para proteger Internet! 🏛️🔐",
        },
      },
      {
        title: "Congruencias", slug: "congruencias", icon: "≡", blurb: "Aritmética modular y sus aplicaciones.",
        detail: {
          intro: "La aritmética modular (o 'aritmética del reloj') estudia los residuos de la división. Es fundamental en criptografía, teoría de códigos, y aparece cada vez que miras la hora: después de las 12 vuelve a 1.",
          stats: [
            { icon: "≡", label: "Notación", value: "a ≡ b (mod n)" },
            { icon: "🕐", label: "Analogía", value: "Reloj de n horas" },
            { icon: "🔐", label: "Aplicación", value: "RSA, hash" },
          ],
          explanation: `a ≡ b (mod n) significa que n | (a − b), es decir, a y b tienen el mismo residuo al dividir por n.\n\nEjemplo: 17 ≡ 2 (mod 5) porque 17 − 2 = 15, y 5 | 15.\n\nPropiedades (si a ≡ b y c ≡ d, mod n):\n• a + c ≡ b + d (mod n)\n• a − c ≡ b − d (mod n)\n• a × c ≡ b × d (mod n)\n• aᵏ ≡ bᵏ (mod n)\n\n¡Cuidado! NO se puede dividir directamente. Se usa el inverso modular.\n\nInverso modular:\na⁻¹ (mod n) existe si y solo si MCD(a, n) = 1\nSe encuentra con el algoritmo extendido de Euclides.\n\nPequeño Teorema de Fermat:\nSi p es primo y p ∤ a, entonces:\naᵖ⁻¹ ≡ 1 (mod p)\n\nEjemplo: 2⁶ ≡ 1 (mod 7) → 64 mod 7 = 1 ✓\n\nTeorema Chino del Resto:\nSi n₁, n₂ son coprimos, el sistema:\nx ≡ a₁ (mod n₁)\nx ≡ a₂ (mod n₂)\ntiene solución única módulo n₁·n₂.\n\nAplicación — Verificar ISBN:\nISBN-10: la suma ponderada de los 10 dígitos ≡ 0 (mod 11)\n\nAplicación — RSA:\nCifrar: c = mᵉ mod n\nDescifrar: m = cᵈ mod n`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Congruencias y Aritmética Modular",
          facts: [
            "Gauss introdujo la notación ≡ (mod n) en 1801 en su obra 'Disquisitiones Arithmeticae', cuando tenía solo 24 años.",
            "Tu tarjeta de crédito usa aritmética modular: el algoritmo de Luhn verifica que los dígitos satisfagan una congruencia específica para detectar errores de escritura.",
            "El Teorema Chino del Resto tiene más de 1700 años: el matemático chino Sun Zi lo usó para contar soldados en grupos de 3, 5 y 7.",
          ],
          mascotLine: "¡La aritmética modular es como un reloj: después del último número, ¡vuelves al principio! Simple pero poderosa 🕐",
        },
      },
      {
        title: "Sucesiones Famosas", slug: "sucesiones-famosas", icon: "🌀", blurb: "Fibonacci, triangulares y más patrones.",
        detail: {
          intro: "Las sucesiones numéricas son patrones que aparecen una y otra vez en la naturaleza, el arte y las matemáticas. Fibonacci se esconde en girasoles y galaxias, los triangulares en bolos de bowling, y los primos siguen siendo un misterio.",
          stats: [
            { icon: "🌀", label: "Fibonacci", value: "1,1,2,3,5,8,13..." },
            { icon: "🔺", label: "Triangulares", value: "1,3,6,10,15..." },
            { icon: "📐", label: "Cuadrados", value: "1,4,9,16,25..." },
          ],
          explanation: `Sucesiones famosas:\n\n1. Fibonacci:\nF₁ = 1, F₂ = 1, Fₙ = Fₙ₋₁ + Fₙ₋₂\n1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144...\n\nPropiedad: Fₙ₊₁/Fₙ → φ ≈ 1.618 (proporción áurea)\n\n2. Números triangulares:\nTₙ = n(n+1)/2\n1, 3, 6, 10, 15, 21, 28, 36...\n(Suman 1+2+3+...+n)\n\n3. Números cuadrados:\nn²: 1, 4, 9, 16, 25, 36, 49...\n\n4. Números de Catalan:\nCₙ = C(2n,n)/(n+1)\n1, 1, 2, 5, 14, 42, 132...\n(Cuentan formas de parentizar, caminos en cuadrícula, etc.)\n\n5. Potencias de 2:\n1, 2, 4, 8, 16, 32, 64, 128, 256...\n(Fundamentales en informática)\n\nFórmula de Binet (Fibonacci exacto):\nFₙ = (φⁿ − ψⁿ) / √5\ndonde φ = (1+√5)/2 y ψ = (1−√5)/2\n\nEjemplo — Verificar que T₁₀ = 55:\nT₁₀ = 10 × 11 / 2 = 55 ✓\n\nSerie aritmética: aₙ = a₁ + (n−1)d, Sₙ = n(a₁ + aₙ)/2\nSerie geométrica: aₙ = a₁ · rⁿ⁻¹, Sₙ = a₁(1 − rⁿ)/(1 − r)`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Sucesiones Famosas — Fibonacci, Triangulares y Patrones",
          facts: [
            "Los pétalos de las flores siguen números de Fibonacci: los lirios tienen 3, los ranúnculos 5, las margaritas 21 o 34. Esto se debe al ángulo áureo de crecimiento.",
            "Gauss, a los 9 años, sumó los números del 1 al 100 en segundos: notó que 1+100 = 2+99 = 3+98 = ... = 50 pares de 101, total = 5050. Es la fórmula Tₙ.",
            "La proporción áurea φ = (1+√5)/2 aparece en el Partenón, la Mona Lisa, las tarjetas de crédito y hasta en las espirales de galaxias.",
          ],
          mascotLine: "¡Los patrones numéricos son la poesía de las matemáticas! Fibonacci escribe sus versos en girasoles y caracoles 🌻",
        },
      },
      {
        title: "Teorema Fundamental", slug: "teorema-fundamental-aritmetica", icon: "⭐", blurb: "Todo entero es producto de primos.",
        detail: {
          intro: "El Teorema Fundamental de la Aritmética garantiza que cada número entero mayor que 1 se puede expresar como un producto ÚNICO de números primos. Es la razón por la cual los primos son los 'átomos' de los números enteros.",
          stats: [
            { icon: "⭐", label: "Teorema", value: "Factorización única" },
            { icon: "🔢", label: "Forma", value: "n = p₁^a₁ · p₂^a₂..." },
            { icon: "🏛️", label: "Autor", value: "Euclides (~300 a.C.)" },
          ],
          explanation: `Teorema Fundamental de la Aritmética:\n\nTodo entero n > 1 se puede escribir como:\nn = p₁^a₁ · p₂^a₂ · ... · pₖ^aₖ\n\ndonde p₁ < p₂ < ... < pₖ son primos y a₁, a₂, ..., aₖ son enteros positivos.\n\nAdemás, esta factorización es ÚNICA (salvo el orden de los factores).\n\nEjemplos:\n• 12 = 2² × 3\n• 60 = 2² × 3 × 5\n• 100 = 2² × 5²\n• 360 = 2³ × 3² × 5\n• 2310 = 2 × 3 × 5 × 7 × 11\n\nAplicaciones de la factorización:\n• MCD: tomar factores comunes con MENOR exponente\n• MCM: tomar TODOS los factores con MAYOR exponente\n• Contar divisores: si n = p₁^a₁ · p₂^a₂ · ... · pₖ^aₖ,\n  número de divisores = (a₁+1)(a₂+1)...(aₖ+1)\n\nEjemplo — Contar divisores de 60:\n60 = 2² × 3¹ × 5¹\nDivisores = (2+1)(1+1)(1+1) = 3×2×2 = 12\nSon: 1,2,3,4,5,6,10,12,15,20,30,60 ✓\n\n¿Por qué 1 NO es primo?\nSi 1 fuera primo, la factorización no sería única:\n6 = 2 × 3 = 1 × 2 × 3 = 1² × 2 × 3 = ...\nExcluir al 1 garantiza unicidad.\n\nMétodo de factorización (división sucesiva):\n252 ÷ 2 = 126\n126 ÷ 2 = 63\n63 ÷ 3 = 21\n21 ÷ 3 = 7\n7 ÷ 7 = 1\n∴ 252 = 2² × 3² × 7`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Teorema Fundamental de la Aritmética — Factorización Única",
          facts: [
            "Euclides demostró este teorema hace más de 2300 años en el Libro VII de los Elementos, pero la primera demostración rigurosa moderna fue de Gauss en 1801.",
            "Existen sistemas numéricos donde la factorización NO es única. En ℤ[√−5], el número 6 = 2×3 = (1+√−5)(1−√−5) tiene dos factorizaciones diferentes.",
            "La dificultad de factorizar números grandes es la base de la criptografía RSA: multiplicar dos primos de 150 dígitos toma microsegundos, pero encontrar esos primos a partir del producto puede tomar miles de años.",
          ],
          mascotLine: "¡Cada número tiene una 'receta de primos' única e irrepetible! Como un ADN numérico ⭐🧬",
        },
      },
      {
        title: "Números Perfectos", slug: "numeros-perfectos", icon: "💎", blurb: "Números iguales a la suma de sus divisores.",
        detail: {
          intro: "Un número perfecto es igual a la suma de todos sus divisores propios (excluyéndose a sí mismo). Son extremadamente raros y misteriosos — solo se conocen 51, todos pares. Nadie sabe si existen números perfectos impares.",
          stats: [
            { icon: "💎", label: "Primeros", value: "6, 28, 496" },
            { icon: "🔗", label: "Relación", value: "Primos de Mersenne" },
            { icon: "❓", label: "Misterio", value: "¿Existen impares?" },
          ],
          explanation: `Un número n es perfecto si:\nσ(n) − n = n, es decir, σ(n) = 2n\n\ndonde σ(n) es la suma de TODOS los divisores de n.\n\nEquivalente: la suma de divisores propios (sin incluir n) es igual a n.\n\nEjemplos:\n• 6: divisores propios = 1 + 2 + 3 = 6 ✓\n• 28: divisores propios = 1 + 2 + 4 + 7 + 14 = 28 ✓\n• 496: divisores propios = 1+2+4+8+16+31+62+124+248 = 496 ✓\n• 8128: el cuarto número perfecto\n\nTeorema de Euclides-Euler:\nUn número par es perfecto si y solo si tiene la forma:\nn = 2^(p−1) × (2^p − 1)\ndonde 2^p − 1 es primo (primo de Mersenne).\n\nPrimos de Mersenne: Mₚ = 2^p − 1\nM₂ = 3, M₃ = 7, M₅ = 31, M₇ = 127...\nNo todo 2^p − 1 es primo: M₁₁ = 2047 = 23 × 89\n\nNúmeros relacionados:\n• Deficientes: suma de divisores propios < n (ejemplo: 8, suma = 1+2+4 = 7 < 8)\n• Abundantes: suma de divisores propios > n (ejemplo: 12, suma = 1+2+3+4+6 = 16 > 12)\n• Amigos (amicables): cada uno es la suma de los divisores propios del otro\n  220 y 284: div(220) = 284, div(284) = 220\n\nPreguntas abiertas:\n• ¿Existen números perfectos impares? (Nadie ha encontrado uno ni demostrado que no existan)\n• ¿Hay infinitos números perfectos pares? (Depende de si hay infinitos primos de Mersenne)`,
          videoId: "WeeEE8o1aqM",
          videoTitle: "Números Perfectos — Definición y Conexión con Mersenne",
          facts: [
            "Los pitagóricos (500 a.C.) consideraban al 6 y al 28 como números sagrados por ser perfectos. San Agustín escribió que Dios creó el mundo en 6 días porque 6 es un número perfecto.",
            "El par de números amigos (220, 284) fue conocido por los pitagóricos, pero el segundo par (1184, 1210) no fue descubierto hasta 1866 por un estudiante de 16 años.",
            "Si existiera un número perfecto impar, tendría que ser mayor que 10^1500 y tener al menos 75 factores primos. La mayoría de matemáticos creen que no existe.",
          ],
          mascotLine: "¡Los números perfectos son tan raros que en 2000 años solo hemos encontrado 51! Son las joyas de la teoría de números 💎",
        },
      },
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
