"use client";

import { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

/* =========================================================
   GAMES DATA
   ========================================================= */

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface GamesContent {
  questions: QuizQuestion[];
  formulaLabel: string;
  formulaLeft: string;
  formulaRight: string;
  formulaAnswer: string;
  formulaHint: string;
}

const GAMES_DATA: Record<string, GamesContent> = {
  /* ─── PROBABILIDAD ─── */
  "probabilidad-clasica": {
    questions: [
      {
        question: "Al lanzar un dado justo de 6 caras, ¿cuál es la probabilidad de obtener un 5?",
        options: ["1/2", "1/6", "1/3", "5/6"],
        correct: 1,
        explanation: "Hay 1 resultado favorable (el 5) entre 6 posibles. P = 1/6",
      },
      {
        question: "En una bolsa hay 3 bolas rojas y 7 azules. ¿Cuál es la probabilidad de sacar una roja?",
        options: ["3/7", "7/10", "3/10", "1/3"],
        correct: 2,
        explanation: "3 favorables (rojas) entre 10 posibles (total). P = 3/10",
      },
      {
        question: "¿Cuál es la probabilidad de obtener un número par al lanzar un dado?",
        options: ["1/3", "2/6", "1/2", "2/3"],
        correct: 2,
        explanation: "Los pares son {2, 4, 6} = 3 favorables entre 6 posibles. P = 3/6 = 1/2",
      },
    ],
    formulaLabel: "Completa la fórmula de probabilidad clásica:",
    formulaLeft: "P(A) = casos favorables /",
    formulaRight: "",
    formulaAnswer: "casos posibles",
    formulaHint: "P(A) = casos favorables / casos posibles",
  },
  "eventos-espacio-muestral": {
    questions: [
      {
        question: "¿Qué es el espacio muestral de un experimento?",
        options: ["Solo los eventos favorables", "El conjunto de todos los resultados posibles", "La probabilidad total", "Los eventos imposibles"],
        correct: 1,
        explanation: "El espacio muestral (S) es el conjunto de todos los resultados posibles de un experimento.",
      },
      {
        question: "Al lanzar una moneda dos veces, ¿cuántos elementos tiene el espacio muestral?",
        options: ["2", "3", "4", "6"],
        correct: 2,
        explanation: "S = {CC, CS, SC, SS} → tiene 4 elementos.",
      },
      {
        question: "Si A y B son eventos mutuamente excluyentes, ¿cuánto vale P(A ∩ B)?",
        options: ["P(A) + P(B)", "P(A) × P(B)", "0", "1"],
        correct: 2,
        explanation: "Eventos mutuamente excluyentes no pueden ocurrir juntos, por lo que P(A ∩ B) = 0.",
      },
    ],
    formulaLabel: "Si S es el espacio muestral, ¿cuánto vale P(S)?",
    formulaLeft: "P(S) =",
    formulaRight: "",
    formulaAnswer: "1",
    formulaHint: "La probabilidad del espacio muestral completo siempre es 1.",
  },
  "probabilidad-condicional": {
    questions: [
      {
        question: "¿Qué representa P(A|B)?",
        options: ["Probabilidad de A y B juntos", "Probabilidad de A dado que B ocurrió", "Probabilidad de B dado A", "Probabilidad de A o B"],
        correct: 1,
        explanation: "P(A|B) es la probabilidad de que ocurra A, dado que ya sabemos que B ocurrió.",
      },
      {
        question: "Si P(A ∩ B) = 0.12 y P(B) = 0.4, ¿cuánto vale P(A|B)?",
        options: ["0.48", "0.3", "0.52", "0.12"],
        correct: 1,
        explanation: "P(A|B) = P(A ∩ B) / P(B) = 0.12 / 0.4 = 0.3",
      },
      {
        question: "Si A y B son independientes, ¿cuánto vale P(A|B)?",
        options: ["P(B)", "P(A ∩ B)", "P(A)", "0"],
        correct: 2,
        explanation: "Si A y B son independientes, saber que B ocurrió no cambia la probabilidad de A: P(A|B) = P(A).",
      },
    ],
    formulaLabel: "Completa la fórmula de probabilidad condicional:",
    formulaLeft: "P(A|B) = P(A ∩ B) /",
    formulaRight: "",
    formulaAnswer: "P(B)",
    formulaHint: "Se divide la probabilidad conjunta entre la probabilidad del evento condicionante.",
  },
  "combinatoria": {
    questions: [
      {
        question: "¿Cuántas permutaciones hay de 3 elementos tomados de 5?",
        options: ["60", "10", "15", "120"],
        correct: 0,
        explanation: "P(5,3) = 5!/(5-3)! = 5×4×3 = 60",
      },
      {
        question: "¿Cuántas combinaciones de 2 elementos se pueden tomar de 4?",
        options: ["12", "6", "8", "4"],
        correct: 1,
        explanation: "C(4,2) = 4! / (2! × 2!) = 6",
      },
      {
        question: "¿Cuánto vale 5! (factorial de 5)?",
        options: ["25", "60", "120", "720"],
        correct: 2,
        explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120",
      },
    ],
    formulaLabel: "¿Cuánto vale 0! (factorial de cero)?",
    formulaLeft: "0! =",
    formulaRight: "",
    formulaAnswer: "1",
    formulaHint: "Por convención, el factorial de 0 se define como 1.",
  },
  "distribuciones": {
    questions: [
      {
        question: "¿Qué tipo de variable aleatoria puede tomar solo valores aislados (enteros)?",
        options: ["Continua", "Discreta", "Normal", "Uniforme"],
        correct: 1,
        explanation: "Una variable discreta toma valores aislados y contables, como el número de caras al lanzar monedas.",
      },
      {
        question: "En una distribución binomial con n=10, p=0.5, ¿cuál es la media (μ)?",
        options: ["2.5", "5", "10", "0.5"],
        correct: 1,
        explanation: "μ = n × p = 10 × 0.5 = 5",
      },
      {
        question: "La distribución de Poisson modela eventos que ocurren:",
        options: ["En pares", "De forma continua", "Con frecuencia fija en un intervalo", "Solo una vez"],
        correct: 2,
        explanation: "Poisson modela el número de eventos que ocurren en un intervalo fijo de tiempo o espacio.",
      },
    ],
    formulaLabel: "En una distribución binomial, la media μ es:",
    formulaLeft: "μ = n ×",
    formulaRight: "",
    formulaAnswer: "p",
    formulaHint: "La media de una binomial es el producto del número de ensayos por la probabilidad de éxito.",
  },
  "teorema-de-bayes": {
    questions: [
      {
        question: "El Teorema de Bayes permite:",
        options: ["Calcular factoriales", "Actualizar probabilidades con nueva información", "Sumar eventos independientes", "Encontrar la moda"],
        correct: 1,
        explanation: "Bayes permite actualizar la probabilidad de una hipótesis al obtener nueva evidencia.",
      },
      {
        question: "Si P(B|A)=0.8, P(A)=0.3, P(B)=0.5, ¿cuánto vale P(A|B)?",
        options: ["0.48", "0.24", "0.8", "0.16"],
        correct: 0,
        explanation: "P(A|B) = P(B|A)×P(A)/P(B) = 0.8×0.3/0.5 = 0.48",
      },
      {
        question: "¿Qué nombre recibe P(A) antes de considerar la evidencia B?",
        options: ["Posterior", "Verosimilitud", "Prior (a priori)", "Marginal"],
        correct: 2,
        explanation: "P(A) se llama probabilidad a priori (prior): lo que creemos antes de ver la evidencia.",
      },
    ],
    formulaLabel: "Completa el Teorema de Bayes: P(A|B) = P(B|A) × P(A) /",
    formulaLeft: "P(A|B) = P(B|A)·P(A) /",
    formulaRight: "",
    formulaAnswer: "P(B)",
    formulaHint: "El denominador es la probabilidad total del evento B.",
  },

  /* ─── ARITMÉTICA ─── */
  "numeros-naturales": {
    questions: [
      {
        question: "¿Cuál de estos NO es un número natural?",
        options: ["0", "5", "-3", "100"],
        correct: 2,
        explanation: "Los números naturales son 0, 1, 2, 3, ... Los negativos no son naturales.",
      },
      {
        question: "¿Cuál es el sucesor de 99?",
        options: ["98", "100", "999", "101"],
        correct: 1,
        explanation: "El sucesor de un número natural n es n + 1. Sucesor de 99 = 100.",
      },
      {
        question: "La propiedad que dice que a + b = b + a se llama:",
        options: ["Asociativa", "Distributiva", "Conmutativa", "Identidad"],
        correct: 2,
        explanation: "La propiedad conmutativa indica que el orden de los sumandos no altera la suma.",
      },
    ],
    formulaLabel: "El sucesor de un número n es:",
    formulaLeft: "sucesor(n) = n +",
    formulaRight: "",
    formulaAnswer: "1",
    formulaHint: "Para obtener el sucesor, se suma 1 al número.",
  },
  "operaciones-basicas": {
    questions: [
      {
        question: "¿Cuál es el resultado de 15 × 4 + 10?",
        options: ["100", "70", "250", "80"],
        correct: 1,
        explanation: "Primero la multiplicación: 15 × 4 = 60. Luego la suma: 60 + 10 = 70.",
      },
      {
        question: "¿Qué operación es inversa a la multiplicación?",
        options: ["Suma", "Resta", "División", "Potencia"],
        correct: 2,
        explanation: "La división deshace la multiplicación: si 3 × 4 = 12, entonces 12 ÷ 4 = 3.",
      },
      {
        question: "En la expresión 8 + 2 × 3, ¿cuál operación se realiza primero?",
        options: ["La suma", "La multiplicación", "Da igual el orden", "Ninguna"],
        correct: 1,
        explanation: "Por jerarquía de operaciones, la multiplicación se realiza antes que la suma: 2×3=6, luego 8+6=14.",
      },
    ],
    formulaLabel: "El elemento neutro de la multiplicación es:",
    formulaLeft: "a ×",
    formulaRight: "= a",
    formulaAnswer: "1",
    formulaHint: "Cualquier número multiplicado por este valor da el mismo número.",
  },
  "numeros-enteros": {
    questions: [
      {
        question: "¿Cuál es el resultado de (-5) + (+3)?",
        options: ["-8", "2", "-2", "8"],
        correct: 2,
        explanation: "(-5) + (+3) = -2. Se restan los valores absolutos y se toma el signo del mayor.",
      },
      {
        question: "¿Cuánto es (-4) × (-3)?",
        options: ["-12", "12", "-7", "7"],
        correct: 1,
        explanation: "Negativo por negativo da positivo: (-4) × (-3) = +12.",
      },
      {
        question: "El valor absoluto de -7 es:",
        options: ["-7", "7", "0", "1/7"],
        correct: 1,
        explanation: "El valor absoluto mide la distancia al cero: |-7| = 7.",
      },
    ],
    formulaLabel: "Regla de signos: negativo × negativo =",
    formulaLeft: "(-) × (-) =",
    formulaRight: "",
    formulaAnswer: "+",
    formulaHint: "El producto de dos números negativos siempre es positivo.",
  },
  "fracciones": {
    questions: [
      {
        question: "¿Cuánto es 1/2 + 1/3?",
        options: ["2/5", "5/6", "1/5", "2/6"],
        correct: 1,
        explanation: "Se busca MCM(2,3)=6. Entonces 3/6 + 2/6 = 5/6.",
      },
      {
        question: "¿Cuál es la fracción equivalente a 4/8?",
        options: ["2/3", "1/2", "3/4", "4/6"],
        correct: 1,
        explanation: "4/8 se simplifica dividiendo numerador y denominador entre 4: 4÷4 / 8÷4 = 1/2.",
      },
      {
        question: "¿Cuánto es (2/3) × (3/4)?",
        options: ["6/7", "5/12", "1/2", "2/4"],
        correct: 2,
        explanation: "(2/3) × (3/4) = (2×3)/(3×4) = 6/12 = 1/2.",
      },
    ],
    formulaLabel: "Para dividir fracciones, se multiplica por el:",
    formulaLeft: "a/b ÷ c/d = a/b ×",
    formulaRight: "",
    formulaAnswer: "d/c",
    formulaHint: "Dividir entre una fracción es multiplicar por su inverso (recíproco).",
  },
  "potencias-y-raices": {
    questions: [
      {
        question: "¿Cuánto es 2⁴?",
        options: ["8", "16", "32", "6"],
        correct: 1,
        explanation: "2⁴ = 2 × 2 × 2 × 2 = 16.",
      },
      {
        question: "¿Cuál es la raíz cuadrada de 144?",
        options: ["14", "12", "11", "13"],
        correct: 1,
        explanation: "√144 = 12 porque 12 × 12 = 144.",
      },
      {
        question: "¿Cuánto vale 5⁰?",
        options: ["0", "5", "1", "50"],
        correct: 2,
        explanation: "Cualquier número (distinto de cero) elevado a la potencia 0 es igual a 1.",
      },
    ],
    formulaLabel: "Cualquier número a⁰ (con a ≠ 0) es igual a:",
    formulaLeft: "a⁰ =",
    formulaRight: "(a ≠ 0)",
    formulaAnswer: "1",
    formulaHint: "Todo número distinto de cero elevado a la cero es 1.",
  },
  "divisibilidad": {
    questions: [
      {
        question: "¿Cuál de estos números es divisible entre 3?",
        options: ["22", "25", "27", "28"],
        correct: 2,
        explanation: "27 ÷ 3 = 9 (división exacta). La suma de dígitos de 27 es 9, múltiplo de 3.",
      },
      {
        question: "¿Cuál es el MCD de 12 y 18?",
        options: ["2", "3", "6", "36"],
        correct: 2,
        explanation: "Factores de 12: 2²×3. Factores de 18: 2×3². MCD = 2×3 = 6.",
      },
      {
        question: "¿Cuál es el MCM de 4 y 6?",
        options: ["2", "12", "24", "10"],
        correct: 1,
        explanation: "MCM(4,6) = 12. Es el menor número que es múltiplo tanto de 4 como de 6.",
      },
    ],
    formulaLabel: "Si a divide exactamente a b, el residuo es:",
    formulaLeft: "b mod a =",
    formulaRight: "",
    formulaAnswer: "0",
    formulaHint: "Si a|b (a divide a b), entonces el residuo de la división es cero.",
  },

  /* ─── ÁLGEBRA ─── */
  "expresiones-algebraicas": {
    questions: [
      {
        question: "¿Cuál es el coeficiente en la expresión 7x²?",
        options: ["x²", "2", "7", "7x"],
        correct: 2,
        explanation: "El coeficiente es el número que multiplica a la variable: en 7x², es 7.",
      },
      {
        question: "¿Cuántos términos tiene la expresión 3x² + 5x - 2?",
        options: ["2", "3", "4", "1"],
        correct: 1,
        explanation: "Los términos se separan por + o -: 3x², 5x y -2. Son 3 términos (trinomio).",
      },
      {
        question: "Simplifica: 4x + 3x",
        options: ["7x²", "7x", "12x", "x⁷"],
        correct: 1,
        explanation: "Se suman los coeficientes de términos semejantes: 4x + 3x = 7x.",
      },
    ],
    formulaLabel: "El grado de un monomio axⁿ es:",
    formulaLeft: "grado(axⁿ) =",
    formulaRight: "",
    formulaAnswer: "n",
    formulaHint: "El grado de un monomio es el exponente de la variable.",
  },
  "ecuaciones-lineales": {
    questions: [
      {
        question: "¿Cuál es el valor de x en: 2x + 4 = 10?",
        options: ["2", "3", "4", "7"],
        correct: 1,
        explanation: "2x = 10 - 4 = 6 → x = 6/2 = 3.",
      },
      {
        question: "¿Cuántas soluciones tiene una ecuación lineal con una incógnita?",
        options: ["Ninguna", "Exactamente una", "Dos", "Infinitas"],
        correct: 1,
        explanation: "Una ecuación lineal ax + b = 0 (con a ≠ 0) tiene exactamente una solución: x = -b/a.",
      },
      {
        question: "Si 5x - 15 = 0, ¿cuánto vale x?",
        options: ["5", "-3", "3", "15"],
        correct: 2,
        explanation: "5x = 15 → x = 15/5 = 3.",
      },
    ],
    formulaLabel: "En ax + b = 0, la solución x es:",
    formulaLeft: "x = -b /",
    formulaRight: "",
    formulaAnswer: "a",
    formulaHint: "Se despeja x dividiendo -b entre el coeficiente a.",
  },
  "sistemas-de-ecuaciones": {
    questions: [
      {
        question: "Un sistema de 2 ecuaciones con 2 incógnitas tiene solución única cuando:",
        options: ["Las rectas son paralelas", "Las rectas se intersectan en un punto", "Las rectas son coincidentes", "No tiene gráfica"],
        correct: 1,
        explanation: "Si las rectas se cortan en un punto, ese punto es la solución única del sistema.",
      },
      {
        question: "Resuelve: x + y = 5, x - y = 1. ¿Cuánto vale x?",
        options: ["2", "3", "4", "1"],
        correct: 1,
        explanation: "Sumando ambas ecuaciones: 2x = 6 → x = 3.",
      },
      {
        question: "¿Qué método consiste en despejar una variable y sustituirla en la otra ecuación?",
        options: ["Igualación", "Sustitución", "Reducción", "Gráfico"],
        correct: 1,
        explanation: "El método de sustitución despeja una variable en una ecuación y la reemplaza en la otra.",
      },
    ],
    formulaLabel: "Si un sistema tiene infinitas soluciones, las rectas son:",
    formulaLeft: "Las rectas son",
    formulaRight: "",
    formulaAnswer: "coincidentes",
    formulaHint: "Cuando las dos ecuaciones representan la misma recta, hay infinitas soluciones.",
  },
  "productos-notables": {
    questions: [
      {
        question: "¿Cuál es el desarrollo de (a + b)²?",
        options: ["a² + b²", "a² + 2ab + b²", "a² - 2ab + b²", "2a + 2b"],
        correct: 1,
        explanation: "(a + b)² = a² + 2ab + b² (cuadrado de un binomio).",
      },
      {
        question: "¿Cuánto es (x + 3)(x - 3)?",
        options: ["x² - 9", "x² + 9", "x² - 6", "x² + 6x + 9"],
        correct: 0,
        explanation: "Es una diferencia de cuadrados: (a+b)(a-b) = a² - b² → x² - 9.",
      },
      {
        question: "El desarrollo de (a - b)² es:",
        options: ["a² + 2ab + b²", "a² - 2ab + b²", "a² - b²", "a² + b²"],
        correct: 1,
        explanation: "(a - b)² = a² - 2ab + b².",
      },
    ],
    formulaLabel: "Completa la diferencia de cuadrados: (a+b)(a-b) =",
    formulaLeft: "(a+b)(a-b) = a² -",
    formulaRight: "",
    formulaAnswer: "b²",
    formulaHint: "El producto de la suma por la diferencia es igual a la diferencia de sus cuadrados.",
  },
  "factorizacion": {
    questions: [
      {
        question: "¿Cuál es la factorización de x² - 9?",
        options: ["(x-3)²", "(x+3)²", "(x+3)(x-3)", "(x+9)(x-1)"],
        correct: 2,
        explanation: "x² - 9 = x² - 3² = (x+3)(x-3) (diferencia de cuadrados).",
      },
      {
        question: "Factoriza: 6x + 12",
        options: ["6(x+2)", "3(2x+4)", "2(3x+6)", "12(x+1)"],
        correct: 0,
        explanation: "Factor común: MCD(6,12) = 6. Entonces 6x + 12 = 6(x + 2).",
      },
      {
        question: "Factoriza: x² + 5x + 6",
        options: ["(x+1)(x+6)", "(x+2)(x+3)", "(x+5)(x+1)", "(x-2)(x-3)"],
        correct: 1,
        explanation: "Se buscan dos números que sumen 5 y multipliquen 6: 2 y 3. → (x+2)(x+3).",
      },
    ],
    formulaLabel: "El primer paso para factorizar es buscar el:",
    formulaLeft: "Paso 1: extraer el",
    formulaRight: "",
    formulaAnswer: "factor comun",
    formulaHint: "Siempre se inicia buscando un factor que sea común a todos los términos.",
  },
  "funciones": {
    questions: [
      {
        question: "Si f(x) = 2x + 1, ¿cuánto vale f(3)?",
        options: ["5", "6", "7", "9"],
        correct: 2,
        explanation: "f(3) = 2(3) + 1 = 6 + 1 = 7.",
      },
      {
        question: "¿Cuál es el dominio de f(x) = 1/x?",
        options: ["Todos los reales", "x > 0", "x ≠ 0", "x ≥ 0"],
        correct: 2,
        explanation: "No se puede dividir entre 0, así que el dominio es todos los reales excepto x = 0.",
      },
      {
        question: "Una función lineal f(x) = mx + b tiene gráfica de:",
        options: ["Parábola", "Línea recta", "Circunferencia", "Hipérbola"],
        correct: 1,
        explanation: "f(x) = mx + b es la ecuación de una línea recta donde m es la pendiente.",
      },
    ],
    formulaLabel: "En f(x) = mx + b, la pendiente es:",
    formulaLeft: "pendiente =",
    formulaRight: "",
    formulaAnswer: "m",
    formulaHint: "En la ecuación y = mx + b, el coeficiente m representa la pendiente.",
  },

  /* ─── GEOMETRÍA ─── */
  "triangulos": {
    questions: [
      {
        question: "¿Cuánto suman los ángulos internos de un triángulo?",
        options: ["90°", "180°", "270°", "360°"],
        correct: 1,
        explanation: "La suma de los ángulos internos de cualquier triángulo es siempre 180°.",
      },
      {
        question: "Un triángulo con todos los lados iguales se llama:",
        options: ["Isósceles", "Escaleno", "Equilátero", "Rectángulo"],
        correct: 2,
        explanation: "El triángulo equilátero tiene sus 3 lados y sus 3 ángulos iguales (60° cada uno).",
      },
      {
        question: "El Teorema de Pitágoras aplica a triángulos:",
        options: ["Equiláteros", "Isósceles", "Rectángulos", "Cualquier triángulo"],
        correct: 2,
        explanation: "Pitágoras solo aplica a triángulos rectángulos: a² + b² = c² (c es la hipotenusa).",
      },
    ],
    formulaLabel: "La suma de ángulos internos de un triángulo es:",
    formulaLeft: "α + β + γ =",
    formulaRight: "grados",
    formulaAnswer: "180",
    formulaHint: "Los tres ángulos internos de cualquier triángulo suman 180°.",
  },
  "circunferencia-y-circulo": {
    questions: [
      {
        question: "¿Cuál es la fórmula del perímetro (circunferencia) de un círculo?",
        options: ["πr²", "2πr", "πd²", "2r"],
        correct: 1,
        explanation: "La circunferencia = 2πr (o πd, donde d es el diámetro).",
      },
      {
        question: "El diámetro de un círculo con radio 5 cm es:",
        options: ["2.5 cm", "10 cm", "25 cm", "15 cm"],
        correct: 1,
        explanation: "El diámetro es el doble del radio: d = 2r = 2×5 = 10 cm.",
      },
      {
        question: "¿Cuál es el área de un círculo con radio 3?",
        options: ["6π", "9π", "3π", "12π"],
        correct: 1,
        explanation: "Área = πr² = π(3)² = 9π.",
      },
    ],
    formulaLabel: "El área de un círculo es:",
    formulaLeft: "A = π ×",
    formulaRight: "",
    formulaAnswer: "r²",
    formulaHint: "El área se calcula multiplicando π por el radio al cuadrado.",
  },
  "poligonos": {
    questions: [
      {
        question: "¿Cuántos lados tiene un hexágono?",
        options: ["5", "6", "7", "8"],
        correct: 1,
        explanation: "El prefijo 'hexa' significa 6. Un hexágono tiene 6 lados.",
      },
      {
        question: "La suma de los ángulos internos de un cuadrilátero es:",
        options: ["180°", "270°", "360°", "540°"],
        correct: 2,
        explanation: "Para un polígono de n lados: (n-2)×180°. Con n=4: (4-2)×180° = 360°.",
      },
      {
        question: "¿Cuántas diagonales tiene un pentágono?",
        options: ["3", "5", "7", "10"],
        correct: 1,
        explanation: "Diagonales = n(n-3)/2 = 5(5-3)/2 = 5×2/2 = 5.",
      },
    ],
    formulaLabel: "La suma de ángulos internos de un polígono de n lados es:",
    formulaLeft: "(n - 2) ×",
    formulaRight: "grados",
    formulaAnswer: "180",
    formulaHint: "Se multiplica (n-2) por 180° para obtener la suma de ángulos internos.",
  },
  "perimetro-y-area": {
    questions: [
      {
        question: "¿Cuál es el área de un rectángulo de 5 cm × 8 cm?",
        options: ["13 cm²", "26 cm²", "40 cm²", "80 cm²"],
        correct: 2,
        explanation: "Área del rectángulo = base × altura = 5 × 8 = 40 cm².",
      },
      {
        question: "¿Cuál es el perímetro de un cuadrado de lado 6 cm?",
        options: ["12 cm", "24 cm", "36 cm", "18 cm"],
        correct: 1,
        explanation: "Perímetro del cuadrado = 4 × lado = 4 × 6 = 24 cm.",
      },
      {
        question: "El área de un triángulo con base 10 y altura 4 es:",
        options: ["40", "14", "20", "80"],
        correct: 2,
        explanation: "Área del triángulo = (base × altura) / 2 = (10 × 4) / 2 = 20.",
      },
    ],
    formulaLabel: "El área de un triángulo es:",
    formulaLeft: "A = (b × h) /",
    formulaRight: "",
    formulaAnswer: "2",
    formulaHint: "El área del triángulo es la mitad del producto de la base por la altura.",
  },
  "volumen": {
    questions: [
      {
        question: "¿Cuál es el volumen de un cubo de arista 3 cm?",
        options: ["9 cm³", "18 cm³", "27 cm³", "81 cm³"],
        correct: 2,
        explanation: "Volumen del cubo = a³ = 3³ = 27 cm³.",
      },
      {
        question: "El volumen de un cilindro se calcula con:",
        options: ["πr²h", "2πrh", "4πr³/3", "πr²"],
        correct: 0,
        explanation: "Volumen del cilindro = πr²h (área de la base circular por la altura).",
      },
      {
        question: "¿Cuál es el volumen de una esfera de radio 3? (usar π ≈ 3.14)",
        options: ["36π", "12π", "27π", "9π"],
        correct: 0,
        explanation: "V = (4/3)πr³ = (4/3)π(27) = 36π.",
      },
    ],
    formulaLabel: "El volumen de un cubo de arista a es:",
    formulaLeft: "V =",
    formulaRight: "",
    formulaAnswer: "a³",
    formulaHint: "El volumen del cubo es el cubo de su arista: a × a × a.",
  },
  "geometria-analitica": {
    questions: [
      {
        question: "¿Cuál es la distancia entre los puntos (0,0) y (3,4)?",
        options: ["7", "5", "25", "12"],
        correct: 1,
        explanation: "d = √((3-0)² + (4-0)²) = √(9+16) = √25 = 5.",
      },
      {
        question: "El punto medio entre (2,6) y (4,8) es:",
        options: ["(6,14)", "(3,7)", "(2,2)", "(1,1)"],
        correct: 1,
        explanation: "Punto medio = ((2+4)/2, (6+8)/2) = (3, 7).",
      },
      {
        question: "La pendiente de la recta que pasa por (1,2) y (3,6) es:",
        options: ["1", "2", "4", "1/2"],
        correct: 1,
        explanation: "m = (y₂-y₁)/(x₂-x₁) = (6-2)/(3-1) = 4/2 = 2.",
      },
    ],
    formulaLabel: "La fórmula de la pendiente entre dos puntos es:",
    formulaLeft: "m = (y₂ - y₁) /",
    formulaRight: "",
    formulaAnswer: "(x₂ - x₁)",
    formulaHint: "La pendiente es el cambio en y dividido entre el cambio en x.",
  },

  /* ─── TRIGONOMETRÍA ─── */
  "razones-trigonometricas": {
    questions: [
      {
        question: "En un triángulo rectángulo, sen(θ) es:",
        options: ["adyacente/hipotenusa", "opuesto/hipotenusa", "opuesto/adyacente", "hipotenusa/opuesto"],
        correct: 1,
        explanation: "Seno = cateto opuesto / hipotenusa.",
      },
      {
        question: "¿Cuál es el valor de cos(60°)?",
        options: ["√3/2", "1/2", "√2/2", "1"],
        correct: 1,
        explanation: "cos(60°) = 1/2. Es uno de los valores notables de trigonometría.",
      },
      {
        question: "La razón tan(θ) equivale a:",
        options: ["sen(θ)/cos(θ)", "cos(θ)/sen(θ)", "1/sen(θ)", "1/cos(θ)"],
        correct: 0,
        explanation: "Tangente = seno / coseno = cateto opuesto / cateto adyacente.",
      },
    ],
    formulaLabel: "Seno se define como:",
    formulaLeft: "sen(θ) = opuesto /",
    formulaRight: "",
    formulaAnswer: "hipotenusa",
    formulaHint: "El seno es la razón entre el cateto opuesto y la hipotenusa.",
  },
  "circulo-unitario": {
    questions: [
      {
        question: "¿Cuál es el radio del círculo unitario?",
        options: ["2", "π", "1", "0.5"],
        correct: 2,
        explanation: "El círculo unitario tiene radio = 1 y está centrado en el origen.",
      },
      {
        question: "En el círculo unitario, el punto a 90° (π/2 rad) es:",
        options: ["(1, 0)", "(0, 1)", "(-1, 0)", "(0, -1)"],
        correct: 1,
        explanation: "A 90° el punto en el círculo unitario es (cos90°, sen90°) = (0, 1).",
      },
      {
        question: "¿Cuántos radianes hay en una vuelta completa (360°)?",
        options: ["π", "2π", "π/2", "4π"],
        correct: 1,
        explanation: "Una vuelta completa = 360° = 2π radianes.",
      },
    ],
    formulaLabel: "Para convertir grados a radianes se multiplica por:",
    formulaLeft: "radianes = grados ×",
    formulaRight: "",
    formulaAnswer: "π/180",
    formulaHint: "Se multiplica el ángulo en grados por π/180 para obtener radianes.",
  },
  "identidades": {
    questions: [
      {
        question: "¿Cuál es la identidad pitagórica fundamental?",
        options: ["sen²θ + cos²θ = 1", "sen²θ - cos²θ = 1", "tanθ + cotθ = 1", "senθ × cosθ = 1"],
        correct: 0,
        explanation: "La identidad pitagórica fundamental es sen²θ + cos²θ = 1.",
      },
      {
        question: "Si sen(θ) = 3/5, ¿cuánto vale cos(θ) en el primer cuadrante?",
        options: ["4/5", "2/5", "3/5", "5/3"],
        correct: 0,
        explanation: "cos²θ = 1 - sen²θ = 1 - 9/25 = 16/25 → cos θ = 4/5.",
      },
      {
        question: "¿Cuál es el valor de 1 + tan²θ?",
        options: ["cos²θ", "sen²θ", "sec²θ", "csc²θ"],
        correct: 2,
        explanation: "1 + tan²θ = sec²θ. Es una de las identidades pitagóricas derivadas.",
      },
    ],
    formulaLabel: "Completa la identidad pitagórica: sen²θ + cos²θ =",
    formulaLeft: "sen²θ + cos²θ =",
    formulaRight: "",
    formulaAnswer: "1",
    formulaHint: "La suma del seno al cuadrado y coseno al cuadrado siempre es 1.",
  },
  "ley-de-senos-y-cosenos": {
    questions: [
      {
        question: "La Ley de Senos establece que a/sen(A) =",
        options: ["b/sen(B)", "b × sen(B)", "c/cos(C)", "a × sen(A)"],
        correct: 0,
        explanation: "Ley de Senos: a/sen(A) = b/sen(B) = c/sen(C).",
      },
      {
        question: "¿Cuándo se usa la Ley de Cosenos?",
        options: ["Con triángulos rectángulos", "Cuando se conocen los 3 lados o 2 lados y el ángulo entre ellos", "Solo con triángulos equiláteros", "Nunca"],
        correct: 1,
        explanation: "La Ley de Cosenos se usa cuando se conocen 3 lados (LLL) o 2 lados y el ángulo incluido (LAL).",
      },
      {
        question: "En la Ley de Cosenos: c² = a² + b² - 2ab·cos(C). Si C = 90°, se reduce a:",
        options: ["c² = a² + b²", "c² = a² - b²", "c² = 2ab", "c² = a + b"],
        correct: 0,
        explanation: "Si C=90°, cos(90°)=0, así c² = a² + b² - 0 = a² + b² (Teorema de Pitágoras).",
      },
    ],
    formulaLabel: "En la Ley de Cosenos, c² = a² + b² -",
    formulaLeft: "c² = a² + b² -",
    formulaRight: "",
    formulaAnswer: "2ab·cos(C)",
    formulaHint: "Se resta el doble producto de los dos lados por el coseno del ángulo entre ellos.",
  },
  "funciones-trigonometricas": {
    questions: [
      {
        question: "¿Cuál es el período de la función sen(x)?",
        options: ["π", "2π", "π/2", "4π"],
        correct: 1,
        explanation: "La función seno tiene período 2π: se repite cada 2π radianes.",
      },
      {
        question: "La amplitud de f(x) = 3sen(x) es:",
        options: ["1", "2", "3", "6"],
        correct: 2,
        explanation: "La amplitud es el coeficiente que multiplica al seno: |3| = 3.",
      },
      {
        question: "¿Cuál es el rango de la función cos(x)?",
        options: ["[0, 1]", "[-1, 1]", "[0, 2π]", "(-∞, ∞)"],
        correct: 1,
        explanation: "El coseno oscila entre -1 y 1: su rango es [-1, 1].",
      },
    ],
    formulaLabel: "El período de sen(x) es:",
    formulaLeft: "T =",
    formulaRight: "",
    formulaAnswer: "2π",
    formulaHint: "La función seno completa un ciclo cada 2π radianes.",
  },
  "aplicaciones-trigonometria": {
    questions: [
      {
        question: "Desde un punto a 50 m de una torre, el ángulo de elevación es 30°. ¿Cuál expresión da la altura?",
        options: ["50·cos(30°)", "50·tan(30°)", "50·sen(30°)", "50/tan(30°)"],
        correct: 1,
        explanation: "tan(30°) = altura/50, por lo que altura = 50·tan(30°).",
      },
      {
        question: "El ángulo de depresión se mide desde:",
        options: ["El suelo hacia arriba", "La horizontal hacia abajo", "El objeto hacia el observador", "La vertical hacia el lado"],
        correct: 1,
        explanation: "El ángulo de depresión se mide desde la línea horizontal del observador hacia abajo.",
      },
      {
        question: "Un avión vuela a 1000 m de altura. El ángulo de depresión a un punto es 45°. ¿Distancia horizontal?",
        options: ["500 m", "1000 m", "2000 m", "1414 m"],
        correct: 1,
        explanation: "tan(45°) = 1000/d → d = 1000/tan(45°) = 1000/1 = 1000 m.",
      },
    ],
    formulaLabel: "Si se conoce el ángulo y el cateto adyacente, la altura se calcula con:",
    formulaLeft: "altura = adyacente ×",
    formulaRight: "",
    formulaAnswer: "tan(θ)",
    formulaHint: "Tangente = opuesto/adyacente, por lo que opuesto = adyacente × tan(θ).",
  },

  /* ─── CÁLCULO ─── */
  "limites": {
    questions: [
      {
        question: "¿Cuánto vale lím(x→2) de (x² - 4)/(x - 2)?",
        options: ["0", "2", "4", "No existe"],
        correct: 2,
        explanation: "Factorizando: (x²-4)/(x-2) = (x+2)(x-2)/(x-2) = x+2. Cuando x→2: 2+2 = 4.",
      },
      {
        question: "lím(x→0) de sen(x)/x es:",
        options: ["0", "1", "∞", "No existe"],
        correct: 1,
        explanation: "Es un límite notable fundamental: lím(x→0) sen(x)/x = 1.",
      },
      {
        question: "Si lím(x→a) f(x) = L, esto significa que f(a) = L:",
        options: ["Siempre verdadero", "A veces verdadero", "Siempre falso", "Solo si f es polinómica"],
        correct: 1,
        explanation: "El límite puede existir sin que f(a)=L (por ejemplo, en discontinuidades removibles).",
      },
    ],
    formulaLabel: "Completa el límite notable: lím(x→0) sen(x)/x =",
    formulaLeft: "lím(x→0) sen(x)/x =",
    formulaRight: "",
    formulaAnswer: "1",
    formulaHint: "Este es uno de los límites fundamentales más importantes del cálculo.",
  },
  "derivadas": {
    questions: [
      {
        question: "¿Cuál es la derivada de f(x) = x³?",
        options: ["x²", "3x²", "3x³", "x⁴/4"],
        correct: 1,
        explanation: "Regla de la potencia: d/dx(xⁿ) = nxⁿ⁻¹. d/dx(x³) = 3x².",
      },
      {
        question: "La derivada de una constante c es:",
        options: ["c", "1", "0", "cx"],
        correct: 2,
        explanation: "La derivada de una constante siempre es 0, ya que no cambia.",
      },
      {
        question: "Geométricamente, la derivada en un punto representa:",
        options: ["El área bajo la curva", "La pendiente de la recta tangente", "El valor máximo", "La intersección con el eje x"],
        correct: 1,
        explanation: "La derivada f'(a) es la pendiente de la recta tangente a la curva en x = a.",
      },
    ],
    formulaLabel: "La derivada de xⁿ es:",
    formulaLeft: "d/dx(xⁿ) =",
    formulaRight: "",
    formulaAnswer: "nxⁿ⁻¹",
    formulaHint: "Se baja el exponente como coeficiente y se reduce el exponente en 1.",
  },
  "reglas-de-derivacion": {
    questions: [
      {
        question: "La derivada de f(x)·g(x) es (regla del producto):",
        options: ["f'·g'", "f'·g + f·g'", "f·g' - f'·g", "(f/g)'"],
        correct: 1,
        explanation: "Regla del producto: (f·g)' = f'·g + f·g'.",
      },
      {
        question: "Si h(x) = f(g(x)), entonces h'(x) = (regla de la cadena):",
        options: ["f'(x)·g'(x)", "f'(g(x))·g'(x)", "f(g'(x))", "f'(g(x))"],
        correct: 1,
        explanation: "Regla de la cadena: derivada de la función externa evaluada en la interna, por la derivada de la interna.",
      },
      {
        question: "¿Cuál es la derivada de sen(x)?",
        options: ["-cos(x)", "cos(x)", "sen(x)", "-sen(x)"],
        correct: 1,
        explanation: "d/dx[sen(x)] = cos(x).",
      },
    ],
    formulaLabel: "La regla del producto: (f·g)' =",
    formulaLeft: "(f·g)' = f'·g +",
    formulaRight: "",
    formulaAnswer: "f·g'",
    formulaHint: "Derivada del primero por el segundo, más el primero por derivada del segundo.",
  },
  "integrales": {
    questions: [
      {
        question: "¿Cuál es la integral de 2x dx?",
        options: ["x² + C", "2x² + C", "x + C", "2 + C"],
        correct: 0,
        explanation: "∫2x dx = 2·(x²/2) + C = x² + C.",
      },
      {
        question: "La integral es la operación inversa de:",
        options: ["La suma", "El límite", "La derivada", "La raíz"],
        correct: 2,
        explanation: "Integrar es el proceso inverso de derivar (antiderivada).",
      },
      {
        question: "¿Qué representa la integral definida geométricamente?",
        options: ["La pendiente", "El área bajo la curva", "El valor máximo", "La recta tangente"],
        correct: 1,
        explanation: "La integral definida ∫[a,b] f(x)dx representa el área neta bajo la curva entre a y b.",
      },
    ],
    formulaLabel: "La integral de xⁿ dx (n≠-1) es:",
    formulaLeft: "∫xⁿ dx =",
    formulaRight: "+ C",
    formulaAnswer: "xⁿ⁺¹/(n+1)",
    formulaHint: "Se aumenta el exponente en 1 y se divide entre el nuevo exponente.",
  },
  "aplicaciones-calculo": {
    questions: [
      {
        question: "Para encontrar máximos y mínimos de f(x), se buscan los puntos donde:",
        options: ["f(x) = 0", "f'(x) = 0", "f''(x) = 0", "f(x) = 1"],
        correct: 1,
        explanation: "Los puntos críticos se encuentran donde f'(x) = 0 o f'(x) no existe.",
      },
      {
        question: "Si f''(a) > 0, el punto crítico en x=a es:",
        options: ["Un máximo", "Un mínimo", "Un punto de inflexión", "No se puede determinar"],
        correct: 1,
        explanation: "Si f''(a) > 0, la curva es cóncava hacia arriba → el punto es un mínimo local.",
      },
      {
        question: "La velocidad instantánea es la derivada de:",
        options: ["La aceleración", "La posición", "La fuerza", "El tiempo"],
        correct: 1,
        explanation: "v(t) = s'(t): la velocidad es la derivada de la posición respecto al tiempo.",
      },
    ],
    formulaLabel: "Para hallar puntos críticos se resuelve:",
    formulaLeft: "f'(x) =",
    formulaRight: "",
    formulaAnswer: "0",
    formulaHint: "Los puntos críticos ocurren donde la derivada se anula.",
  },
  "teorema-fundamental-calculo": {
    questions: [
      {
        question: "El Teorema Fundamental del Cálculo conecta:",
        options: ["Álgebra y geometría", "Derivación e integración", "Límites y series", "Funciones y ecuaciones"],
        correct: 1,
        explanation: "El TFC establece que la derivación y la integración son procesos inversos.",
      },
      {
        question: "Si F'(x) = f(x), entonces ∫[a,b] f(x)dx =",
        options: ["F(a) - F(b)", "F(b) - F(a)", "F(a) + F(b)", "F(a) × F(b)"],
        correct: 1,
        explanation: "Por el TFC: ∫[a,b] f(x)dx = F(b) - F(a), donde F es antiderivada de f.",
      },
      {
        question: "Si F(x) = ∫[0,x] t² dt, entonces F'(x) =",
        options: ["x³/3", "x²", "2x", "0"],
        correct: 1,
        explanation: "Por el TFC parte 1: si F(x) = ∫[a,x] f(t)dt, entonces F'(x) = f(x). Aquí f(t)=t², así F'(x)=x².",
      },
    ],
    formulaLabel: "∫[a,b] f(x)dx = F(b) -",
    formulaLeft: "∫[a,b] f(x)dx = F(b) -",
    formulaRight: "",
    formulaAnswer: "F(a)",
    formulaHint: "Se evalúa la antiderivada en el límite superior menos el límite inferior.",
  },

  /* ─── ESTADÍSTICA ─── */
  "medidas-tendencia-central": {
    questions: [
      {
        question: "¿Cuál es la media de los datos {2, 4, 6, 8, 10}?",
        options: ["4", "5", "6", "8"],
        correct: 2,
        explanation: "Media = (2+4+6+8+10)/5 = 30/5 = 6.",
      },
      {
        question: "En el conjunto {3, 5, 7, 9, 11}, la mediana es:",
        options: ["5", "7", "9", "35"],
        correct: 1,
        explanation: "Con datos ordenados, la mediana es el valor central. Con 5 datos, es el 3º: 7.",
      },
      {
        question: "La moda del conjunto {2, 3, 3, 5, 7, 3, 8} es:",
        options: ["2", "3", "5", "7"],
        correct: 1,
        explanation: "La moda es el valor que más se repite. El 3 aparece 3 veces.",
      },
    ],
    formulaLabel: "La media aritmética se calcula como la suma de datos dividida entre:",
    formulaLeft: "Media = Σxᵢ /",
    formulaRight: "",
    formulaAnswer: "n",
    formulaHint: "Se divide la suma total entre el número de datos.",
  },
  "medidas-de-dispersion": {
    questions: [
      {
        question: "¿Qué mide la desviación estándar?",
        options: ["El valor central", "La dispersión de los datos", "El dato más frecuente", "El rango"],
        correct: 1,
        explanation: "La desviación estándar mide cuánto se dispersan los datos respecto a la media.",
      },
      {
        question: "El rango del conjunto {3, 7, 12, 5, 20} es:",
        options: ["15", "17", "10", "20"],
        correct: 1,
        explanation: "Rango = valor máximo - valor mínimo = 20 - 3 = 17.",
      },
      {
        question: "La varianza es:",
        options: ["La media de los datos", "El cuadrado de la desviación estándar", "La raíz de la media", "El rango dividido entre 2"],
        correct: 1,
        explanation: "La varianza (σ²) es el cuadrado de la desviación estándar (σ).",
      },
    ],
    formulaLabel: "La desviación estándar σ es la raíz cuadrada de la:",
    formulaLeft: "σ = √",
    formulaRight: "",
    formulaAnswer: "varianza",
    formulaHint: "σ = √(σ²). La desviación estándar es la raíz cuadrada de la varianza.",
  },
  "graficos-estadisticos": {
    questions: [
      {
        question: "¿Qué gráfico es más adecuado para mostrar proporciones de un todo?",
        options: ["Histograma", "Gráfico de barras", "Gráfico circular (pastel)", "Diagrama de dispersión"],
        correct: 2,
        explanation: "El gráfico circular muestra las partes de un todo como sectores proporcionales.",
      },
      {
        question: "Un histograma se usa para representar:",
        options: ["Datos cualitativos", "Frecuencias de datos agrupados en intervalos", "Relaciones entre 2 variables", "Datos categóricos"],
        correct: 1,
        explanation: "El histograma muestra la distribución de frecuencias de datos cuantitativos agrupados.",
      },
      {
        question: "¿Qué gráfico usa un diagrama de caja (boxplot) para mostrar?",
        options: ["Solo la media", "Mediana, cuartiles y valores atípicos", "Solo frecuencias", "Proporciones"],
        correct: 1,
        explanation: "El boxplot muestra la mediana, Q1, Q3, rango intercuartil y valores atípicos.",
      },
    ],
    formulaLabel: "En un gráfico circular, cada sector representa un ángulo de:",
    formulaLeft: "ángulo = (frecuencia/total) ×",
    formulaRight: "grados",
    formulaAnswer: "360",
    formulaHint: "El círculo completo tiene 360° y se reparte proporcionalmente.",
  },
  "distribucion-normal": {
    questions: [
      {
        question: "La distribución normal tiene forma de:",
        options: ["Rectángulo", "Campana simétrica", "Triángulo", "Línea recta"],
        correct: 1,
        explanation: "La distribución normal tiene la clásica forma de campana, simétrica respecto a la media.",
      },
      {
        question: "En una distribución normal, ¿qué porcentaje de datos está dentro de ±1σ de la media?",
        options: ["50%", "68%", "95%", "99.7%"],
        correct: 1,
        explanation: "Regla empírica: ~68% de los datos están dentro de una desviación estándar de la media.",
      },
      {
        question: "Si μ = 100 y σ = 15, el valor z de un dato x = 130 es:",
        options: ["1", "2", "3", "0.5"],
        correct: 1,
        explanation: "z = (x - μ)/σ = (130 - 100)/15 = 30/15 = 2.",
      },
    ],
    formulaLabel: "El puntaje z se calcula como:",
    formulaLeft: "z = (x - μ) /",
    formulaRight: "",
    formulaAnswer: "σ",
    formulaHint: "El puntaje z es la diferencia del dato menos la media, dividido entre la desviación estándar.",
  },
  "muestreo": {
    questions: [
      {
        question: "¿Qué tipo de muestreo da a cada individuo la misma probabilidad de ser elegido?",
        options: ["Estratificado", "Por conveniencia", "Aleatorio simple", "Sistemático"],
        correct: 2,
        explanation: "En el muestreo aleatorio simple, todos los elementos tienen igual probabilidad de selección.",
      },
      {
        question: "El error muestral tiende a disminuir cuando:",
        options: ["Disminuye el tamaño de muestra", "Aumenta el tamaño de muestra", "Se usa muestreo por conveniencia", "La población es más grande"],
        correct: 1,
        explanation: "A mayor tamaño de muestra, menor error muestral (la estimación es más precisa).",
      },
      {
        question: "Dividir la población en grupos homogéneos y muestrear de cada grupo es:",
        options: ["Aleatorio simple", "Sistemático", "Estratificado", "Por conglomerados"],
        correct: 2,
        explanation: "El muestreo estratificado divide en estratos homogéneos y toma muestra de cada uno.",
      },
    ],
    formulaLabel: "El margen de error es inversamente proporcional a la raíz de:",
    formulaLeft: "Error ∝ 1/√",
    formulaRight: "",
    formulaAnswer: "n",
    formulaHint: "A mayor tamaño de muestra (n), menor es el error muestral.",
  },
  "regresion": {
    questions: [
      {
        question: "La recta de regresión lineal tiene la forma:",
        options: ["y = ax²+b", "y = mx + b", "y = a/x", "y = logx"],
        correct: 1,
        explanation: "La regresión lineal busca la mejor recta y = mx + b que se ajusta a los datos.",
      },
      {
        question: "El coeficiente de correlación r varía entre:",
        options: ["0 y 1", "-∞ y +∞", "-1 y 1", "0 y 100"],
        correct: 2,
        explanation: "El coeficiente de correlación r siempre está entre -1 y 1.",
      },
      {
        question: "Si r = -0.95, la relación entre las variables es:",
        options: ["Fuerte positiva", "Débil negativa", "Fuerte negativa", "No hay relación"],
        correct: 2,
        explanation: "r cercano a -1 indica una correlación lineal negativa fuerte.",
      },
    ],
    formulaLabel: "El coeficiente de determinación R² indica el porcentaje de variabilidad explicada. Si r=0.8, R² =",
    formulaLeft: "R² = r² = (0.8)² =",
    formulaRight: "",
    formulaAnswer: "0.64",
    formulaHint: "R² se obtiene elevando el coeficiente de correlación al cuadrado.",
  },

  /* ─── MATEMÁTICA DISCRETA ─── */
  "teoria-de-conjuntos": {
    questions: [
      {
        question: "Si A = {1,2,3} y B = {2,3,4}, ¿cuánto es A ∩ B?",
        options: ["{1,2,3,4}", "{2,3}", "{1,4}", "∅"],
        correct: 1,
        explanation: "A ∩ B (intersección) son los elementos comunes: {2, 3}.",
      },
      {
        question: "Si A = {1,2,3} y B = {2,3,4}, ¿cuánto es A ∪ B?",
        options: ["{2,3}", "{1,2,3,4}", "{1,4}", "{1,2,3}"],
        correct: 1,
        explanation: "A ∪ B (unión) incluye todos los elementos de ambos: {1, 2, 3, 4}.",
      },
      {
        question: "¿Cuántos subconjuntos tiene un conjunto de 3 elementos?",
        options: ["3", "6", "8", "9"],
        correct: 2,
        explanation: "Un conjunto con n elementos tiene 2ⁿ subconjuntos. 2³ = 8.",
      },
    ],
    formulaLabel: "El número de subconjuntos de un conjunto con n elementos es:",
    formulaLeft: "Subconjuntos =",
    formulaRight: "",
    formulaAnswer: "2ⁿ",
    formulaHint: "Cada elemento puede estar o no estar en un subconjunto: 2 opciones por elemento.",
  },
  "logica-proposicional": {
    questions: [
      {
        question: "Si p es verdadero y q es falso, ¿cuánto vale p ∧ q (conjunción)?",
        options: ["Verdadero", "Falso", "Indefinido", "Depende"],
        correct: 1,
        explanation: "La conjunción (Y) solo es verdadera cuando ambas proposiciones son verdaderas.",
      },
      {
        question: "¿Cuál es la negación de 'Todos los gatos son negros'?",
        options: ["Ningún gato es negro", "Existe al menos un gato que no es negro", "Todos los gatos son blancos", "Algunos gatos son negros"],
        correct: 1,
        explanation: "La negación de 'para todo' es 'existe al menos uno que no'.",
      },
      {
        question: "La implicación p → q es falsa solo cuando:",
        options: ["p es V y q es V", "p es V y q es F", "p es F y q es V", "p es F y q es F"],
        correct: 1,
        explanation: "La implicación es falsa únicamente cuando la hipótesis es verdadera y la conclusión es falsa.",
      },
    ],
    formulaLabel: "La implicación p → q es equivalente a:",
    formulaLeft: "p → q ≡ ¬p ∨",
    formulaRight: "",
    formulaAnswer: "q",
    formulaHint: "Una implicación es equivalente a 'no p, o q'.",
  },
  "grafos": {
    questions: [
      {
        question: "Un grafo con 4 vértices y cada par conectado tiene el nombre de:",
        options: ["Grafo vacío", "Grafo completo K₄", "Árbol", "Grafo bipartito"],
        correct: 1,
        explanation: "Un grafo completo Kₙ tiene todos sus vértices conectados entre sí. K₄ tiene 4 vértices.",
      },
      {
        question: "¿Cuántas aristas tiene el grafo completo K₄?",
        options: ["4", "6", "8", "12"],
        correct: 1,
        explanation: "K₄ tiene C(4,2) = 4×3/2 = 6 aristas.",
      },
      {
        question: "El grado de un vértice es:",
        options: ["El número de vértices del grafo", "El número de aristas incidentes en ese vértice", "El número de ciclos", "La distancia al centro"],
        correct: 1,
        explanation: "El grado de un vértice es la cantidad de aristas que llegan a él.",
      },
    ],
    formulaLabel: "El número de aristas de un grafo completo Kₙ es:",
    formulaLeft: "Aristas(Kₙ) = n(n-1)/",
    formulaRight: "",
    formulaAnswer: "2",
    formulaHint: "Se eligen 2 vértices de n para formar cada arista: C(n,2) = n(n-1)/2.",
  },
  "arboles": {
    questions: [
      {
        question: "Un árbol con n vértices tiene exactamente:",
        options: ["n aristas", "n-1 aristas", "n+1 aristas", "2n aristas"],
        correct: 1,
        explanation: "Un árbol con n vértices siempre tiene exactamente n-1 aristas.",
      },
      {
        question: "¿Qué propiedad distingue a un árbol de otros grafos?",
        options: ["Es dirigido", "Es conexo y sin ciclos", "Tiene ciclos", "No es conexo"],
        correct: 1,
        explanation: "Un árbol es un grafo conexo (hay camino entre cualquier par) y acíclico (sin ciclos).",
      },
      {
        question: "En un árbol binario completo de altura 3, ¿cuántas hojas hay como máximo?",
        options: ["4", "7", "8", "15"],
        correct: 2,
        explanation: "En un árbol binario completo, las hojas en nivel h son 2ʰ = 2³ = 8.",
      },
    ],
    formulaLabel: "Un árbol con n vértices tiene exactamente ___ aristas:",
    formulaLeft: "aristas =",
    formulaRight: "",
    formulaAnswer: "n-1",
    formulaHint: "Todo árbol con n vértices tiene n-1 aristas.",
  },
  "relaciones": {
    questions: [
      {
        question: "Una relación R sobre un conjunto A es reflexiva si:",
        options: ["(a,b) ∈ R implica (b,a) ∈ R", "(a,a) ∈ R para todo a ∈ A", "(a,b) y (b,c) implican (a,c)", "R es vacía"],
        correct: 1,
        explanation: "Reflexiva: todo elemento está relacionado consigo mismo: (a,a) ∈ R ∀a ∈ A.",
      },
      {
        question: "Una relación es simétrica si:",
        options: ["(a,a) ∈ R", "(a,b) ∈ R implica (b,a) ∈ R", "(a,b) y (b,c) implican (a,c) ∈ R", "R tiene un solo par"],
        correct: 1,
        explanation: "Simétrica: si a está relacionado con b, entonces b está relacionado con a.",
      },
      {
        question: "Una relación que es reflexiva, simétrica y transitiva se llama:",
        options: ["Función", "Relación de equivalencia", "Orden parcial", "Biyección"],
        correct: 1,
        explanation: "Una relación de equivalencia cumple las tres propiedades: reflexiva, simétrica y transitiva.",
      },
    ],
    formulaLabel: "Una relación de equivalencia debe ser reflexiva, simétrica y:",
    formulaLeft: "Equivalencia = reflexiva + simétrica +",
    formulaRight: "",
    formulaAnswer: "transitiva",
    formulaHint: "La tercera propiedad es: si aRb y bRc, entonces aRc.",
  },
  "algoritmos-basicos": {
    questions: [
      {
        question: "¿Cuál es la complejidad de la búsqueda lineal en el peor caso?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correct: 2,
        explanation: "En el peor caso, se recorren todos los n elementos: complejidad O(n).",
      },
      {
        question: "La búsqueda binaria requiere que los datos estén:",
        options: ["Desordenados", "En una lista enlazada", "Ordenados", "En un árbol"],
        correct: 2,
        explanation: "La búsqueda binaria solo funciona con datos previamente ordenados.",
      },
      {
        question: "¿Cuál es la complejidad de la búsqueda binaria?",
        options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
        correct: 2,
        explanation: "La búsqueda binaria divide el espacio a la mitad en cada paso: O(log n).",
      },
    ],
    formulaLabel: "La búsqueda binaria tiene complejidad:",
    formulaLeft: "Complejidad =",
    formulaRight: "",
    formulaAnswer: "O(log n)",
    formulaHint: "Se divide el espacio de búsqueda a la mitad en cada iteración.",
  },

  /* ─── TEORÍA DE NÚMEROS ─── */
  "numeros-primos": {
    questions: [
      {
        question: "¿Cuál de estos números es primo?",
        options: ["15", "21", "17", "27"],
        correct: 2,
        explanation: "17 solo es divisible entre 1 y 17. Los otros tienen más divisores.",
      },
      {
        question: "¿Cuál es el único número primo par?",
        options: ["1", "2", "4", "0"],
        correct: 1,
        explanation: "2 es el único primo par. Todos los demás pares son divisibles entre 2.",
      },
      {
        question: "¿El número 1 es primo?",
        options: ["Sí", "No", "A veces", "Es compuesto"],
        correct: 1,
        explanation: "Por definición, un primo tiene exactamente 2 divisores. El 1 solo tiene 1 divisor.",
      },
    ],
    formulaLabel: "Un número primo tiene exactamente ___ divisores:",
    formulaLeft: "Divisores de un primo =",
    formulaRight: "",
    formulaAnswer: "2",
    formulaHint: "Un primo solo es divisible entre 1 y sí mismo: exactamente 2 divisores.",
  },
  "divisibilidad-numeros": {
    questions: [
      {
        question: "Un número es divisible entre 4 si:",
        options: ["Su último dígito es par", "Sus dos últimos dígitos forman un múltiplo de 4", "La suma de sus dígitos es múltiplo de 4", "Termina en 0"],
        correct: 1,
        explanation: "Un número es divisible entre 4 si sus dos últimos dígitos forman un número divisible entre 4.",
      },
      {
        question: "¿Cuántos divisores positivos tiene el número 12?",
        options: ["4", "5", "6", "12"],
        correct: 2,
        explanation: "Divisores de 12: {1, 2, 3, 4, 6, 12} = 6 divisores.",
      },
      {
        question: "Si a|b y a|c, entonces a también divide a:",
        options: ["b × c solamente", "b + c", "b - c solamente", "b + c y b - c"],
        correct: 3,
        explanation: "Si a divide a b y a c, entonces divide a cualquier combinación lineal: b+c y b-c.",
      },
    ],
    formulaLabel: "Si n = p₁^a₁ × p₂^a₂, el número de divisores es:",
    formulaLeft: "d(n) = (a₁+1) ×",
    formulaRight: "",
    formulaAnswer: "(a₂+1)",
    formulaHint: "Se multiplican los exponentes incrementados en 1 de la factorización prima.",
  },
  "congruencias": {
    questions: [
      {
        question: "17 ≡ ? (mod 5)",
        options: ["0", "1", "2", "3"],
        correct: 2,
        explanation: "17 ÷ 5 = 3 con residuo 2. Por lo tanto 17 ≡ 2 (mod 5).",
      },
      {
        question: "Si a ≡ b (mod n), significa que:",
        options: ["a = b", "n divide a (a - b)", "a divide a n", "a + b = n"],
        correct: 1,
        explanation: "a ≡ b (mod n) significa que n | (a - b), es decir, a y b dejan el mismo residuo al dividir entre n.",
      },
      {
        question: "¿Cuál es el último dígito de 7¹⁰⁰?",
        options: ["1", "3", "7", "9"],
        correct: 0,
        explanation: "Los últimos dígitos de 7ⁿ ciclan: 7,9,3,1. 100÷4=25 resto 0, así que el último dígito es 1.",
      },
    ],
    formulaLabel: "a ≡ b (mod n) significa que n divide a:",
    formulaLeft: "n |",
    formulaRight: "",
    formulaAnswer: "(a - b)",
    formulaHint: "La congruencia módulo n significa que la diferencia es divisible por n.",
  },
  "sucesiones-famosas": {
    questions: [
      {
        question: "¿Cuáles son los primeros 6 números de Fibonacci?",
        options: ["1,2,3,4,5,6", "1,1,2,3,5,8", "2,4,6,8,10,12", "1,3,5,7,9,11"],
        correct: 1,
        explanation: "Fibonacci: cada número es la suma de los dos anteriores: 1, 1, 2, 3, 5, 8.",
      },
      {
        question: "En una sucesión aritmética 2, 5, 8, 11, ..., ¿cuál es la diferencia común?",
        options: ["2", "3", "5", "6"],
        correct: 1,
        explanation: "La diferencia común es 5-2 = 8-5 = 11-8 = 3.",
      },
      {
        question: "La sucesión 3, 6, 12, 24, ... es de tipo:",
        options: ["Aritmética", "Geométrica", "Fibonacci", "Armónica"],
        correct: 1,
        explanation: "Es geométrica: cada término se obtiene multiplicando por 2 (razón común = 2).",
      },
    ],
    formulaLabel: "En Fibonacci, cada término es la suma de los:",
    formulaLeft: "F(n) = F(n-1) +",
    formulaRight: "",
    formulaAnswer: "F(n-2)",
    formulaHint: "Cada número de Fibonacci es la suma de los dos términos anteriores.",
  },
  "teorema-fundamental-aritmetica": {
    questions: [
      {
        question: "El Teorema Fundamental de la Aritmética establece que todo entero mayor que 1:",
        options: ["Es primo", "Tiene exactamente 2 divisores", "Se descompone de forma única en primos", "Es par o impar"],
        correct: 2,
        explanation: "Todo entero > 1 tiene una factorización prima única (salvo el orden de los factores).",
      },
      {
        question: "La factorización prima de 60 es:",
        options: ["2² × 3 × 5", "2 × 3 × 10", "4 × 15", "2³ × 5"],
        correct: 0,
        explanation: "60 = 4 × 15 = 2² × 3 × 5. Esta descomposición es única.",
      },
      {
        question: "¿Cuántos factores primos distintos tiene 30?",
        options: ["2", "3", "4", "5"],
        correct: 1,
        explanation: "30 = 2 × 3 × 5. Tiene 3 factores primos distintos.",
      },
    ],
    formulaLabel: "La factorización prima de cualquier n > 1 es:",
    formulaLeft: "n = p₁^a₁ × p₂^a₂ × ... ×",
    formulaRight: "",
    formulaAnswer: "pₖ^aₖ",
    formulaHint: "Todo entero mayor que 1 se escribe como producto de potencias de primos.",
  },
  "numeros-perfectos": {
    questions: [
      {
        question: "Un número perfecto es aquel que es igual a:",
        options: ["El doble de sí mismo", "La suma de sus divisores propios", "El producto de sus dígitos", "Un número primo grande"],
        correct: 1,
        explanation: "Un número perfecto es igual a la suma de sus divisores propios (sin contar al número mismo).",
      },
      {
        question: "¿Cuál es el primer número perfecto?",
        options: ["4", "6", "8", "10"],
        correct: 1,
        explanation: "6 es perfecto: sus divisores propios son 1, 2, 3. Y 1+2+3 = 6.",
      },
      {
        question: "¿Cuál es el segundo número perfecto?",
        options: ["12", "24", "28", "36"],
        correct: 2,
        explanation: "28 es perfecto: divisores propios = {1, 2, 4, 7, 14}. 1+2+4+7+14 = 28.",
      },
    ],
    formulaLabel: "Un número perfecto n cumple que la suma de sus divisores propios es:",
    formulaLeft: "σ(n) - n =",
    formulaRight: "",
    formulaAnswer: "n",
    formulaHint: "La suma de los divisores propios (sin incluir n) es igual a n.",
  },
};

/* =========================================================
   CATEGORY METADATA (for hero color + breadcrumb)
   ========================================================= */

interface CategoryMeta {
  label: string;
  icon: string;
  variant: string;
}

interface TopicMeta {
  title: string;
  slug: string;
  icon: string;
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  aritmetica: { label: "Aritmética", icon: "🔢", variant: "orange" },
  algebra: { label: "Álgebra", icon: "𝑥", variant: "purple" },
  geometria: { label: "Geometría", icon: "📐", variant: "green" },
  trigonometria: { label: "Trigonometría", icon: "📏", variant: "pink" },
  calculo: { label: "Cálculo", icon: "∫", variant: "blue" },
  estadistica: { label: "Estadística", icon: "📊", variant: "yellow" },
  probabilidad: { label: "Probabilidad", icon: "🎲", variant: "purple" },
  "matematica-discreta": { label: "Matemática Discreta", icon: "🔗", variant: "green" },
  "teoria-de-numeros": { label: "Teoría de Números", icon: "🔍", variant: "orange" },
};

const TOPIC_META: Record<string, TopicMeta> = {
  /* Aritmética */
  "numeros-naturales": { title: "Números Naturales", slug: "numeros-naturales", icon: "🔢" },
  "operaciones-basicas": { title: "Operaciones Básicas", slug: "operaciones-basicas", icon: "➕" },
  "numeros-enteros": { title: "Números Enteros", slug: "numeros-enteros", icon: "±" },
  "fracciones": { title: "Fracciones", slug: "fracciones", icon: "½" },
  "potencias-y-raices": { title: "Potencias y Raíces", slug: "potencias-y-raices", icon: "√" },
  "divisibilidad": { title: "Divisibilidad", slug: "divisibilidad", icon: "÷" },
  /* Álgebra */
  "expresiones-algebraicas": { title: "Expresiones Algebraicas", slug: "expresiones-algebraicas", icon: "📝" },
  "ecuaciones-lineales": { title: "Ecuaciones Lineales", slug: "ecuaciones-lineales", icon: "⚖️" },
  "sistemas-de-ecuaciones": { title: "Sistemas de Ecuaciones", slug: "sistemas-de-ecuaciones", icon: "🔗" },
  "productos-notables": { title: "Productos Notables", slug: "productos-notables", icon: "✖️" },
  "factorizacion": { title: "Factorización", slug: "factorizacion", icon: "🧩" },
  "funciones": { title: "Funciones", slug: "funciones", icon: "📈" },
  /* Geometría */
  "triangulos": { title: "Triángulos", slug: "triangulos", icon: "🔺" },
  "circunferencia-y-circulo": { title: "Circunferencia y Círculo", slug: "circunferencia-y-circulo", icon: "⭕" },
  "poligonos": { title: "Polígonos", slug: "poligonos", icon: "⬡" },
  "perimetro-y-area": { title: "Perímetro y Área", slug: "perimetro-y-area", icon: "📏" },
  "volumen": { title: "Volumen", slug: "volumen", icon: "📦" },
  "geometria-analitica": { title: "Geometría Analítica", slug: "geometria-analitica", icon: "📊" },
  /* Trigonometría */
  "razones-trigonometricas": { title: "Razones Trigonométricas", slug: "razones-trigonometricas", icon: "📐" },
  "circulo-unitario": { title: "Círculo Unitario", slug: "circulo-unitario", icon: "⭕" },
  "identidades": { title: "Identidades Trigonométricas", slug: "identidades", icon: "🔑" },
  "ley-de-senos-y-cosenos": { title: "Ley de Senos y Cosenos", slug: "ley-de-senos-y-cosenos", icon: "📏" },
  "funciones-trigonometricas": { title: "Funciones Trigonométricas", slug: "funciones-trigonometricas", icon: "〰️" },
  "aplicaciones-trigonometria": { title: "Aplicaciones de Trigonometría", slug: "aplicaciones-trigonometria", icon: "🏗️" },
  /* Cálculo */
  "limites": { title: "Límites", slug: "limites", icon: "→" },
  "derivadas": { title: "Derivadas", slug: "derivadas", icon: "📉" },
  "reglas-de-derivacion": { title: "Reglas de Derivación", slug: "reglas-de-derivacion", icon: "📋" },
  "integrales": { title: "Integrales", slug: "integrales", icon: "∫" },
  "aplicaciones-calculo": { title: "Aplicaciones del Cálculo", slug: "aplicaciones-calculo", icon: "🎯" },
  "teorema-fundamental-calculo": { title: "Teorema Fundamental del Cálculo", slug: "teorema-fundamental-calculo", icon: "🏆" },
  /* Estadística */
  "medidas-tendencia-central": { title: "Medidas de Tendencia Central", slug: "medidas-tendencia-central", icon: "📊" },
  "medidas-de-dispersion": { title: "Medidas de Dispersión", slug: "medidas-de-dispersion", icon: "↔️" },
  "graficos-estadisticos": { title: "Gráficos Estadísticos", slug: "graficos-estadisticos", icon: "📈" },
  "distribucion-normal": { title: "Distribución Normal", slug: "distribucion-normal", icon: "🔔" },
  "muestreo": { title: "Muestreo", slug: "muestreo", icon: "🎯" },
  "regresion": { title: "Regresión", slug: "regresion", icon: "📉" },
  /* Probabilidad */
  "probabilidad-clasica": { title: "Probabilidad Clásica", slug: "probabilidad-clasica", icon: "🎯" },
  "eventos-espacio-muestral": { title: "Eventos y Espacio Muestral", slug: "eventos-espacio-muestral", icon: "🎲" },
  "probabilidad-condicional": { title: "Probabilidad Condicional", slug: "probabilidad-condicional", icon: "🔀" },
  "combinatoria": { title: "Combinatoria", slug: "combinatoria", icon: "🔢" },
  "distribuciones": { title: "Distribuciones", slug: "distribuciones", icon: "📊" },
  "teorema-de-bayes": { title: "Teorema de Bayes", slug: "teorema-de-bayes", icon: "🧠" },
  /* Matemática Discreta */
  "teoria-de-conjuntos": { title: "Teoría de Conjuntos", slug: "teoria-de-conjuntos", icon: "{ }" },
  "logica-proposicional": { title: "Lógica Proposicional", slug: "logica-proposicional", icon: "🧠" },
  "grafos": { title: "Grafos", slug: "grafos", icon: "🔗" },
  "arboles": { title: "Árboles", slug: "arboles", icon: "🌳" },
  "relaciones": { title: "Relaciones", slug: "relaciones", icon: "↔️" },
  "algoritmos-basicos": { title: "Algoritmos Básicos", slug: "algoritmos-basicos", icon: "⚙️" },
  /* Teoría de Números */
  "numeros-primos": { title: "Números Primos", slug: "numeros-primos", icon: "🔢" },
  "divisibilidad-numeros": { title: "Divisibilidad", slug: "divisibilidad-numeros", icon: "➗" },
  "congruencias": { title: "Congruencias", slug: "congruencias", icon: "≡" },
  "sucesiones-famosas": { title: "Sucesiones Famosas", slug: "sucesiones-famosas", icon: "🔄" },
  "teorema-fundamental-aritmetica": { title: "Teorema Fundamental de la Aritmética", slug: "teorema-fundamental-aritmetica", icon: "🏆" },
  "numeros-perfectos": { title: "Números Perfectos", slug: "numeros-perfectos", icon: "✨" },
};

/* =========================================================
   SABIO MESSAGES
   ========================================================= */

function getSabioMessage(score: number): string {
  if (score === 4) return "¡Perfecto! Dominas este tema por completo 🌟";
  if (score === 3) return "¡Muy bien! Casi perfecto, sigue practicando 👏";
  if (score === 2) return "¡Buen intento! Repasa el artículo y vuelve a intentar 📖";
  return "¡No te rindas! Vuelve al artículo para repasar 💪";
}

function getStars(score: number): string {
  if (score >= 3) return "⭐⭐⭐";
  if (score === 2) return "⭐⭐";
  return "⭐";
}

/* =========================================================
   COMPONENT
   ========================================================= */

type GamePhase = "quiz" | "formula" | "score";

export default function JuegosPage() {
  const params = useParams();
  const router = useRouter();
  const catId = params.id as string;
  const topicSlug = params.topicSlug as string;

  const category = CATEGORY_META[catId];
  const topic = TOPIC_META[topicSlug];
  const gamesContent = GAMES_DATA[topicSlug];

  // Game state
  const [phase, setPhase] = useState<GamePhase>("quiz");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [formulaInput, setFormulaInput] = useState("");
  const [formulaChecked, setFormulaChecked] = useState(false);
  const [formulaCorrect, setFormulaCorrect] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const heroVariant = category ? ` art-hero--${category.variant}` : "";
  const articlePath = `/categoria/${catId}/${topicSlug}`;

  // Handle selecting a quiz option
  const handleOptionSelect = useCallback(
    (index: number) => {
      if (answered || !gamesContent) return;
      setSelectedAnswer(index);
      setAnswered(true);
      if (index === gamesContent.questions[currentQuestion].correct) {
        setQuizScore((prev) => prev + 1);
      }
    },
    [answered, currentQuestion, gamesContent]
  );

  // Handle next question / move to formula
  const handleNext = useCallback(() => {
    if (!gamesContent) return;
    if (currentQuestion < gamesContent.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setPhase("formula");
    }
  }, [currentQuestion, gamesContent]);

  // Handle formula check
  const handleFormulaCheck = useCallback(() => {
    if (!gamesContent) return;
    const correct = formulaInput.trim().toLowerCase() === gamesContent.formulaAnswer.toLowerCase();
    setFormulaChecked(true);
    setFormulaCorrect(correct);
    const final = quizScore + (correct ? 1 : 0);
    setTotalScore(final);
  }, [formulaInput, gamesContent, quizScore]);

  // Handle going to score
  const handleGoToScore = useCallback(() => {
    setPhase("score");
  }, []);

  // Reset the game
  const handleReset = useCallback(() => {
    setPhase("quiz");
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setQuizScore(0);
    setFormulaInput("");
    setFormulaChecked(false);
    setFormulaCorrect(false);
    setTotalScore(0);
  }, []);

  // If no category/topic found, show fallback
  if (!category) {
    return (
      <main className="console" role="application" aria-label="Quiz interactivo — ChalkApp">
        <header className="titlebar">
          <div className="titlebar__brand">
            <Link href="/" className="chip-btn chip-btn--back" style={{ textDecoration: "none" }}>
              <span className="chip-btn__icon">⬅️</span>
              <span className="chip-btn__label">Estante</span>
            </Link>
          </div>
        </header>
        <div className="games-stage">
          <div className="empty-state">
            <span className="empty-state__icon" aria-hidden="true">🎮</span>
            <p className="empty-state__title">Categoría no encontrada</p>
            <p className="empty-state__text">Vuelve al estante para explorar las categorías disponibles.</p>
          </div>
        </div>
        <footer className="console-footer">Creado por Salomé Murcia Muñoz</footer>
      </main>
    );
  }

  // Render "coming soon" for topics without games
  if (!gamesContent) {
    const topicTitle = topic?.title || topicSlug;
    return (
      <main className="console" role="application" aria-label={`Quiz interactivo — ${topicTitle} — ChalkApp`}>
        <header className="titlebar">
          <div className="titlebar__brand">
            <Link href={articlePath} className="chip-btn chip-btn--back" style={{ textDecoration: "none" }}>
              <span className="chip-btn__icon">⬅️</span>
              <span className="chip-btn__label">Volver</span>
            </Link>
            <nav className="breadcrumb" aria-label="Ruta de navegación">
              <Link href="/">Estante</Link>
              <span aria-hidden="true">›</span>
              <Link href={`/categoria/${catId}`}>{category.label}</Link>
              <span aria-hidden="true">›</span>
              <Link href={articlePath}>{topicTitle}</Link>
              <span aria-hidden="true">›</span>
              <span className="breadcrumb__current">Quiz interactivo</span>
            </nav>
          </div>
        </header>
        <div className="games-stage">
          <section className={`art-hero${heroVariant}`} aria-label="Quiz interactivo">
            <div className="art-hero__icon" aria-hidden="true">🎮</div>
            <div className="art-hero__text">
              <span className="art-hero__badge">{category.icon} {category.label}</span>
              <h2 className="art-hero__title">Quiz interactivo — {topicTitle}</h2>
            </div>
          </section>
          <div className="empty-state">
            <span className="empty-state__icon" aria-hidden="true">🎮</span>
            <p className="empty-state__title">Quiz interactivo próximamente para este tema</p>
            <p className="empty-state__text">Estamos preparando ejercicios y quizzes interactivos. ¡Vuelve pronto!</p>
          </div>
        </div>
        <footer className="console-footer">Creado por Salomé Murcia Muñoz</footer>
      </main>
    );
  }

  // Full games UI
  const topicTitle = topic?.title || topicSlug;

  return (
    <main className="console" role="application" aria-label={`Quiz interactivo — ${topicTitle} — ChalkApp`}>
      {/* Titlebar */}
      <header className="titlebar">
        <div className="titlebar__brand">
          <Link href={articlePath} className="chip-btn chip-btn--back" style={{ textDecoration: "none" }}>
            <span className="chip-btn__icon">⬅️</span>
            <span className="chip-btn__label">Volver</span>
          </Link>
          <nav className="breadcrumb" aria-label="Ruta de navegación">
            <Link href="/">Estante</Link>
            <span aria-hidden="true">›</span>
            <Link href={`/categoria/${catId}`}>{category.label}</Link>
            <span aria-hidden="true">›</span>
            <Link href={articlePath}>{topicTitle}</Link>
            <span aria-hidden="true">›</span>
            <span className="breadcrumb__current">Quiz interactivo</span>
          </nav>
        </div>
      </header>

      {/* Game Stage */}
      <div className="games-stage">
        {/* Hero Banner */}
        <section className={`art-hero${heroVariant}`} aria-label="Quiz interactivo">
          <div className="art-hero__icon" aria-hidden="true">🎮</div>
          <div className="art-hero__text">
            <span className="art-hero__badge">{category.icon} {category.label}</span>
            <h2 className="art-hero__title">Quiz interactivo — {topicTitle}</h2>
            <p className="art-hero__intro">Pon a prueba lo que aprendiste con preguntas y ejercicios interactivos.</p>
          </div>
        </section>

        {/* Quiz Phase */}
        {phase === "quiz" && (
          <section className="quiz-card" aria-label={`Pregunta ${currentQuestion + 1}`}>
            <p className="quiz-card__question">
              {currentQuestion + 1}. {gamesContent.questions[currentQuestion].question}
            </p>
            <div className="quiz-card__options" role="group" aria-label="Opciones">
              {gamesContent.questions[currentQuestion].options.map((option, idx) => {
                let optionClass = "quiz-option";
                if (answered) {
                  optionClass += " quiz-option--disabled";
                  if (idx === gamesContent.questions[currentQuestion].correct) {
                    optionClass += " quiz-option--correct";
                  } else if (idx === selectedAnswer && idx !== gamesContent.questions[currentQuestion].correct) {
                    optionClass += " quiz-option--incorrect";
                  }
                }
                return (
                  <button
                    key={idx}
                    className={optionClass}
                    type="button"
                    onClick={() => handleOptionSelect(idx)}
                    disabled={answered}
                    aria-label={`Opción ${String.fromCharCode(65 + idx)}: ${option}`}
                  >
                    <span aria-hidden="true">{String.fromCharCode(65 + idx)}.</span>
                    {option}
                  </button>
                );
              })}
            </div>
            {answered && (
              <>
                <p className="quiz-explanation">
                  💡 {gamesContent.questions[currentQuestion].explanation}
                </p>
                <button className="quiz-next-btn" type="button" onClick={handleNext}>
                  {currentQuestion < gamesContent.questions.length - 1 ? "Siguiente →" : "Ir al ejercicio →"}
                </button>
              </>
            )}
          </section>
        )}

        {/* Formula Phase */}
        {phase === "formula" && (
          <section className="formula-exercise" aria-label="Ejercicio de fórmula">
            <h3 className="formula-exercise__title">{gamesContent.formulaLabel}</h3>
            <div className="formula-exercise__display">
              <span>{gamesContent.formulaLeft}</span>
              <input
                className="formula-exercise__input"
                type="text"
                placeholder="¿respuesta?"
                value={formulaInput}
                onChange={(e) => setFormulaInput(e.target.value)}
                disabled={formulaChecked}
                aria-label="Respuesta de la fórmula"
              />
              {gamesContent.formulaRight && <span>{gamesContent.formulaRight}</span>}
            </div>
            <p className="formula-exercise__hint">💡 Pista: {gamesContent.formulaHint}</p>
            {!formulaChecked && (
              <button className="quiz-next-btn" type="button" onClick={handleFormulaCheck}>
                Comprobar ✓
              </button>
            )}
            {formulaChecked && (
              <>
                <p className="quiz-explanation">
                  {formulaCorrect
                    ? `✅ ¡Correcto! ${gamesContent.formulaLeft} ${gamesContent.formulaAnswer} ${gamesContent.formulaRight}`
                    : `❌ La respuesta correcta es: ${gamesContent.formulaLeft} ${gamesContent.formulaAnswer} ${gamesContent.formulaRight}`}
                </p>
                <button className="quiz-next-btn" type="button" onClick={handleGoToScore}>
                  Ver puntuación →
                </button>
              </>
            )}
          </section>
        )}

        {/* Score Phase */}
        {phase === "score" && (
          <section className="score-panel" aria-label="Resultado final">
            <div className="score-panel__stars" aria-hidden="true">{getStars(totalScore)}</div>
            <p className="score-panel__score">Tu puntuación: {totalScore}/4</p>
            <p className="score-panel__message">{getSabioMessage(totalScore)}</p>
            <div className="score-panel__actions">
              <button
                className="quiz-next-btn"
                type="button"
                onClick={() => router.push(articlePath)}
              >
                Volver al artículo
              </button>
              <button className="quiz-next-btn" type="button" onClick={handleReset}>
                Intentar de nuevo 🔄
              </button>
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="console-footer">Creado por Salomé Murcia Muñoz</footer>
    </main>
  );
}
