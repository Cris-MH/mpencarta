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

## 7. Fuera de alcance de esta entrega

Esta primera entrega cubre **solo el shell de navegación principal**. No incluye: pantallas de artículo, resultados de búsqueda, juegos individuales, ni sistema de autenticación/perfiles. Ver `especificacion_tecnica.md` para el detalle de qué debe implementar Kiro y qué queda pendiente para una siguiente fase.
