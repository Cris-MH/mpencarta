# Brief Visual — "Mi Mundo Explorador"
### Interfaz inspirada en el software educativo infantil de finales de los 90 / 2000

---

## 1. Contexto y nota importante

El punto de partida creativo es el lenguaje visual de los CD-ROM educativos infantiles de esa época (como *Mi Primera Encarta*): cajas de software con estética de "libro/mochila", botones grandes y coloridos, tipografía redondeada, mascotas guía y navegación tipo estantería.

**No se reproducen** el logotipo, las ilustraciones, los textos ni ningún asset de ese producto comercial — son propiedad de Microsoft. Este brief define una identidad **original**: nombre, mascota, paleta e ilustraciones propias, que evocan la misma nostalgia y códigos de diseño sin copiar el producto.

## 2. Concepto y audiencia

- **Nombre de trabajo:** Mi Mundo Explorador *(placeholder — reemplazable por el nombre de marca real)*
- **Audiencia:** niños de 6 a 11 años, con supervisión ocasional de un adulto.
- **Trabajo de la pantalla principal:** que el niño entienda en 3 segundos "aquí hay temas para descubrir" y pueda elegir uno tocando un elemento grande, sin necesidad de leer instrucciones.
- **Tono:** cálido, juguetón, "hecho a mano" — no un dashboard corporativo con esquinas cuadradas.

## 3. Referencias de época (para calibrar el estilo, no para copiar)

- Cajas de software educativo infantil con ilustraciones tipo libro de cuentos.
- Interfaces "shell" tipo escritorio dentro del programa (ventana fija, no scroll infinito).
- Mascotas-guía animadas que acompañan la navegación.
- Botones grandes con efecto "prensado" (sombra sólida, no difusa) que simulan objetos físicos de cartón o plástico.

## 4. Sistema de diseño (tokens)

### 4.1 Color

| Token | Hex | Uso |
|---|---|---|
| `--color-cream` | `#FFF6E5` | Fondo principal de la consola |
| `--color-paper` | `#FFFDF7` | Tarjetas, burbujas de texto |
| `--color-navy` | `#1B3A4B` | Texto, bordes, marco general |
| `--color-orange` | `#FF6B35` | Acento primario / categoría "Animales" |
| `--color-blue` | `#29ABE2` | Categoría "Espacio", elementos neutros de acción |
| `--color-yellow` | `#FFC914` | Acentos, hover, elementos de atención |
| `--color-green` | `#4CAF50` | Categoría "Dinosaurios" |
| `--color-pink` | `#FF8FA3` | Categoría "Mi Cuerpo" |
| `--color-purple` | `#8E7CC3` | Categoría "Juegos" |

Regla 60/30/10: crema como dominante (60%), navy como estructural (30%), colores de categoría como acento puntual (10%).

### 4.2 Tipografía

- **Display (títulos, botones):** *Baloo 2* (peso 700–800) — redondeada, amigable, con peso suficiente para leerse a distancia.
- **Cuerpo (textos de apoyo, subtítulos):** *Nunito* (peso 600–800) — alta legibilidad para lectores infantiles.
- Tamaño mínimo de texto interactivo: 16px. Sin cursivas ni fuentes decorativas en texto largo.

### 4.3 Forma y "material"

- Bordes gruesos (4–6px) en navy en casi todos los componentes interactivos: simulan un trazo de marcador.
- Esquinas muy redondeadas (18–28px) — nada de esquinas vivas.
- Sombra sólida (`0 8px 0 navy`), no difusa — efecto "botón de cartón" que se presiona al hacer clic (`translateY` + reducción de sombra).
- Ligera rotación aleatoria (±1.5°) en los tiles de categoría, como libros apoyados en un estante — se enderezan al pasar el cursor.

### 4.4 Mascota

- Personaje guía original: un búho llamado **"Sabio"**, con lentes, que acompaña al niño con mensajes cortos en una burbuja de diálogo.
- Aparece siempre en la misma zona de la pantalla (esquina, no intrusivo).
- Reacciona a la interacción (rebote suave, mensajes rotativos al tocarlo).

## 5. Estructura de la pantalla principal (shell)

1. **Barra de título** — marca, y controles globales (sonido, ayuda, salir).
2. **Estante de categorías** — grid de "lomos de libro" grandes, cada uno con ícono + nombre + conteo de temas.
3. **Buscador** — campo de texto siempre visible, con botón de búsqueda diferenciado.
4. **Mascota guía** — fija, con burbuja de mensaje contextual.

## 6. Principios de interacción

- Todo elemento interactivo tiene un estado hover (realce) y un estado de presión (se "hunde").
- Los mensajes de la mascota cambian según la acción del usuario (categoría elegida, ayuda solicitada, búsqueda enviada) — refuerza la sensación de compañía.
- Sin scroll en la pantalla principal en escritorio: todo cabe en una "pantalla-libro" fija, como el original.
- Motion discreto: rebote ambiental de la mascota, transiciones cortas (120–250ms) en botones. Se respeta `prefers-reduced-motion`.

## 7. Pantalla de categoría (nivel 2)

Al tocar un libro del estante (ej. "Animales"), se abre una página propia de esa categoría con tres partes:

1. **Hero de bienvenida** — franja de color de la categoría con ícono, nombre, una frase corta ("tagline") y una descripción de una línea.
2. **Estante de temas** — grid de tarjetas más pequeñas con los subtemas de esa categoría (ej. dentro de "Animales": Mamíferos, Aves, Animales marinos…).
3. **Sabio, en otro personaje** — la mascota **no se repite igual** que en el home: aparece **disfrazada según el tema** y con **una animación de entrada distinta** (llega "aterrizando" con un salto, en vez del flotar suave del home), con un globo de diálogo que dice algo específico de esa categoría (un dato curioso, una frase de bienvenida al tema).

### 7.1 Disfraces de Sabio por categoría

| Categoría | Disfraz | Idea visual |
|---|---|---|
| Animales | Explorador de safari | Sombrero de safari con banda |
| El Espacio | Astronauta | Casco transparente + antena |
| Mi Cuerpo | Doctor(a) | Diadema con cruz + estetoscopio |
| Dinosaurios | Paleontólogo | Casco de excavación |
| Historia | Explorador de mapas | Sombrero tipo fedora + insignia |
| Juegos | Modo fiesta | Gorro de fiesta con confeti |

Cada disfraz es un elemento ilustrado adicional sobre el mismo cuerpo de Sabio (no un personaje nuevo desde cero) — así se mantiene la identidad del mascota mientras se nota claramente "en qué mundo está".

### 7.2 Mensajes de Sabio por categoría

Cada categoría tiene su propio set de 2–3 mensajes (dato curioso + frase de bienvenida) que Sabio va rotando cada vez que el niño lo toca, igual que en el home pero con contenido propio del tema — ver el detalle completo en `mockup/data.js`.

## 8. Pantalla de artículo (nivel 3)

Al tocar un tema dentro de una categoría (ej. "T-Rex" dentro de Dinosaurios), se abre su ficha propia:

1. **Ruta de navegación** ("Estante › Dinosaurios › T-Rex") para que el niño (o el adulto) siempre sepa dónde está y pueda volver.
2. **Encabezado del tema** — ícono grande, insignia de la categoría, título y una introducción de 2–3 líneas.
3. **Datos rápidos** — 3 tarjetas tipo "ficha" con un dato numérico o corto (ej. Largo: 12 metros, Peso: 8 toneladas, Época: Cretácico).
4. **Datos curiosos** — 3 notas tipo scrapbook, cada una con un dato llamativo y fácil de recordar.
5. **Sabio narrador** — ahora fijo en una esquina (como una guía que te acompaña mientras lees), con el mismo disfraz de la categoría, pero diciendo algo **específico del tema** (no de la categoría completa). Al tocarlo, alterna entre el dato del tema y un mensaje general de la categoría.
6. **Invitación a jugar** — banner al final que conecta con la categoría "Juegos", para cerrar el ciclo aprender → jugar.

### 8.1 Estado "en construcción"

No todos los temas van a tener contenido de artículo el mismo día. La plantilla incluye un **estado de respaldo**: si un tema no tiene el contenido cargado, se muestra un encabezado igual de cuidado (ícono, título, descripción corta) más una tarjeta que indica que el contenido está en camino — nunca una pantalla rota o vacía.

## 9. Fuera de alcance de esta entrega

No incluye todavía: la pantalla de **artículo individual** (el contenido real de cada tema, ej. al tocar "Mamíferos"), los juegos jugables, resultados de búsqueda, ni sistema de autenticación/perfiles. Ver `especificacion_tecnica.md` para el detalle de qué debe implementar Kiro y qué queda pendiente para una siguiente fase.
