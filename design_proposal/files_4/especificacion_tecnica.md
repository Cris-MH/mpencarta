# Especificación Técnica — "Mi Mundo Explorador"
### Para implementación en Kiro (AWS) — Pantalla principal (shell de navegación)

---

## 1. Resumen del encargo

Construir la **pantalla principal (shell)** de una web app educativa infantil, responsive, en **HTML + CSS + JavaScript puro** (sin frameworks), siguiendo fielmente el mockup adjunto (`mockup/index.html`, `styles.css`, `app.js`) y el `brief_visual.md`.

El mockup entregado es funcional y navegable en el navegador — es la referencia pixel-a-pixel de layout, color, tipografía y micro-interacciones. Kiro debe:
1. Tomar el mockup como base de código real (no rehacerlo desde cero).
2. Conectar las acciones simuladas (toasts "Kiro: conectar…") a la navegación/lógica real de la aplicación.
3. Mantener el sistema de diseño (tokens en `styles.css`) para que las pantallas futuras (artículo, buscador, juegos) sean consistentes.

## 2. Stack y estructura de archivos

```
/mi-mundo-explorador
├── index.html
├── /assets
│   ├── /css
│   │   └── styles.css
│   ├── /js
│   │   └── app.js
│   └── /img            (íconos/ilustraciones adicionales, si se agregan)
└── /fonts               (opcional: alojar Baloo 2 / Nunito localmente en vez de Google Fonts, según política de privacidad del proyecto)
```

- HTML5 semántico, CSS3 (custom properties / variables), JavaScript ES6+ sin dependencias externas.
- Sin build step obligatorio — debe funcionar abriendo `index.html` directamente o servido de forma estática.
- Fuentes vía Google Fonts (`Baloo 2`, `Nunito`) — si el proyecto requiere evitar llamadas externas, empaquetar localmente en `/fonts`.

## 3. Design tokens (fuente de verdad: `:root` en `styles.css`)

Todos los colores, radios, sombras y tipografías están centralizados como custom properties de CSS. **No hardcodear valores nuevos** — extender el token system si se necesita un color adicional, y documentarlo.

Ver tabla completa de tokens en `brief_visual.md`, sección 4.

## 4. Inventario de componentes

| Componente | Archivo/clase | Estados requeridos |
|---|---|---|
| Barra de título | `.titlebar` | estático |
| Botón chip (sonido/ayuda/salir) | `.chip-btn` | default, hover, active/pressed, focus-visible, `aria-pressed` (solo sonido) |
| Tile de categoría | `.book-tile` | default (rotado), hover (enderezado + elevado), active (hundido), focus-visible |
| Buscador | `.searchbar` | default, focus del input, submit |
| Mascota + burbuja | `.mascot` | idle (animación bob), click (cambia mensaje) |
| Toast de notificación | `.toast` | oculto, visible (auto-oculta a los 2.2s) |

## 5. Comportamiento e integración (lo que Kiro debe conectar)

El mockup ya incluye la lógica de UI (hover, toasts, mensajes de mascota). Los puntos marcados con `// Kiro:` en `app.js` son los que requieren integración real:

1. **`openCategory(cat)`** — actualmente muestra un toast. Debe navegar a la ruta real de la categoría (ej. `/categoria/animales`) o disparar el router de la SPA que se use.
2. **Botón "Salir" (`exitBtn`)** — debe conectarse a la acción real de salida (cerrar sesión, volver a landing, etc., según defina producto).
3. **Envío del buscador (`searchForm`)** — debe navegar a la pantalla de resultados con el término ingresado, en vez de solo mostrar un toast.
4. **`playClick()`** — placeholder silencioso; agregar un efecto de sonido corto (`.mp3`/`.ogg`, <100kb) respetando el estado del toggle de sonido.

## 6. Datos de categorías

El estante se genera dinámicamente desde el arreglo `CATEGORIES` en `app.js`. Para producción, este arreglo debe reemplazarse por una fuente de datos real (API, JSON estático, o CMS), manteniendo la misma forma:

```js
{ id: "animales", label: "Animales", sub: "128 temas", icon: "🦁", variant: "orange" }
```

`variant` debe mapear a una clase `.book-tile--{variant}` ya definida en `styles.css` (o a una nueva, agregada siguiendo el mismo patrón).

## 7. Responsive

Breakpoints ya definidos en `styles.css`:

- **> 860px** — layout de 2 columnas (estante+buscador a la izquierda, mascota a la derecha).
- **≤ 860px** — una columna, mascota debajo del buscador, en fila.
- **≤ 560px** — grid de categorías pasa de 3 a 2 columnas, la consola pierde el margen/borde exterior para aprovechar el ancho completo de pantalla.

Kiro debe verificar estos tres puntos de quiebre en dispositivo real o emulador antes de dar por cerrada la implementación.

## 8. Accesibilidad (requisitos mínimos)

- Todos los elementos interactivos son `<button>` o `<input>` reales (no `<div>` con `onclick`) — ya cumplido en el mockup, mantener el patrón en pantallas nuevas.
- Estados de foco visibles (`:focus-visible`) en todos los controles — no remover el `outline` sin reemplazo.
- `aria-live="polite"` en el toast para que lectores de pantalla anuncien los mensajes.
- Contraste texto/fondo verificado para AA en combinaciones navy-sobre-crema y navy-sobre-color de acento.
- Respetar `prefers-reduced-motion` (ya implementado: desactiva el rebote de la mascota y transiciones).
- Tamaño mínimo de área táctil: 44×44px en botones (los `chip-btn` y `book-tile` ya cumplen).

## 9. Criterios de aceptación

- [ ] La pantalla principal replica el mockup en desktop, tablet y móvil (los 3 breakpoints).
- [ ] Los 6 tiles de categoría son navegables por teclado (tab + enter) y por mouse/touch.
- [ ] El buscador envía el término y limpia o mantiene el valor según defina producto.
- [ ] El toggle de sonido cambia visualmente y su estado se refleja en `aria-pressed`.
- [ ] Ningún asset, texto o ilustración del producto comercial original se usa en el proyecto — todo el contenido visual es propio o de bancos con licencia.
- [ ] Lighthouse (o herramienta equivalente) sin errores críticos de accesibilidad en la pantalla principal.

## 10. Pantalla de categoría — `categoria.html`

Página de nivel 2, alcanzable desde cada libro del estante. Es **una sola plantilla** que sirve a las 6 categorías: lee el parámetro de URL `?cat={id}` y renderiza todo dinámicamente contra `data.js`.

### 10.1 Archivos nuevos

```
├── categoria.html
├── /assets/css/categoria.css   (o junto a styles.css según convención del repo)
├── /assets/js/categoria.js
└── /assets/js/data.js          (fuente única de categorías/temas/mascota — también usada por index.html)
```

### 10.2 Flujo de datos

- `index.html` y `categoria.html` comparten `data.js`. **No duplicar** el arreglo de categorías en dos archivos — si se necesita, mover a un endpoint/API y que ambas páginas lo consuman.
- Ruta: `categoria.html?cat=animales`. Los tiles del home ya generan este link (`app.js`, sección "Construir el estante de categorías").
- Si `cat` no existe en `CATEGORIES` o el parámetro falta, el mock redirige a `index.html`. **Kiro debe reemplazar esto por una pantalla 404/estado vacío propio del sistema**, no un redirect silencioso, para no confundir al usuario.

### 10.3 Estructura de la página

1. **Barra de título** — igual que el home, pero el botón de marca se reemplaza por un botón "Estante" que vuelve a `index.html`.
2. **Hero** — franja de color (`--hero-color`, mapeado al `variant` de la categoría), con ícono, título, tagline y descripción. Aquí vive también la mascota, posicionada flotando sobre el borde superior del hero.
3. **Grid de temas** — tarjetas (`.topic-card`) generadas desde `cat.topics`. Cada tarjeta, al tocarse, debe navegar a la futura pantalla de artículo (`// Kiro:` marcado en `categoria.js`); en el mock solo muestra un toast.

### 10.4 Sistema de "disfraces" de Sabio

`buildMascotSVG(costume)` en `categoria.js` arma el SVG del mascota: reutiliza el mismo cuerpo base que en el home y le agrega un grupo `<g>` de accesorios según `cat.mascotCostume` (`safari`, `astronauta`, `doctor`, `paleontologo`, `explorador`, `fiesta`).

**Nota de producción:** los accesorios del mock son geometría simple (sombreros, cascos, diademas) para comunicar el concepto — no arte final. Para producción, Kiro/diseño debe reemplazar estos `<g>` por ilustración terminada (SVG o sprite), manteniendo el mismo sistema: un accesorio por costume, posicionado sobre el mismo cuerpo base, para que el trabajo de animación e integración no cambie.

### 10.5 Animación de entrada (distinta a la del home)

- **Home:** Sabio flota suavemente todo el tiempo (`bob`, 3.2s, loop).
- **Categoría:** Sabio **entra** con una animación de "aterrizaje" (`mascot-enter`, 0.9s, curva `cubic-bezier(.34,1.56,.64,1)` — efecto rebote) la primera vez que carga la página. Al terminar (evento `animationend`), pasa a un flotado idle propio (`mascot-float`, más sutil que el del home). La burbuja de diálogo entra con un fade+scale sincronizado (`mascot-enter-bubble`).
- Al tocar a Sabio, el mensaje rota dentro del set de `cat.mascotMessages` con una animación corta de énfasis en la burbuja.
- Todas las animaciones respetan `prefers-reduced-motion: reduce` (ya implementado en `categoria.css`).

### 10.6 Responsive

- **> 860px:** mascota flotando sobre el hero, en la esquina superior derecha.
- **≤ 860px:** la mascota se reacomoda debajo del hero, centrada (deja de superponerse para no tapar texto en pantallas angostas).
- **≤ 560px:** grid de temas a una columna.

### 10.7 Criterios de aceptación (categoría)

- [ ] Las 6 categorías cargan correctamente desde `data.js` vía `?cat=`.
- [ ] Sabio muestra el disfraz correcto para cada categoría y el mensaje inicial corresponde a esa categoría.
- [ ] La animación de entrada de Sabio se reproduce una sola vez por carga de página (no se repite en loop).
- [ ] Tocar a Sabio rota su mensaje sin recargar la página.
- [ ] El botón "Estante" regresa a `index.html`.
- [ ] Las tarjetas de tema son accesibles por teclado y disparan la acción marcada como `// Kiro:` (pendiente de conectar a la pantalla de artículo real).

## 11. Pantalla de artículo — `articulo.html`

Página de nivel 3, alcanzable desde cada tarjeta de tema en `categoria.html`. Igual que ésta, es **una sola plantilla** para todos los temas: lee `?cat={id}&topic={slug}` y renderiza contra `data.js`.

### 11.1 Archivos nuevos

```
├── articulo.html
├── /assets/css/articulo.css
└── /assets/js/articulo.js
```

### 11.2 Modelo de datos — `topic.detail`

Cada tema en `data.js` puede tener un objeto `detail` opcional:

```js
{
  slug: "t-rex", title: "T-Rex", icon: "🦖", blurb: "...",
  detail: {
    intro: "string — 2-3 líneas",
    stats: [{ icon: "📏", label: "Largo", value: "12 metros" }, /* x3 */],
    facts: ["string", "string", "string"],
    mascotLine: "string — lo que dice Sabio sobre ESTE tema",
  },
}
```

Actualmente **los 6 temas de la categoría "Dinosaurios" tienen `detail` completo** (incluyendo T-Rex) como referencia de calidad y formato. El resto de temas (Animales, Espacio, Mi Cuerpo, Historia, Juegos) todavía no lo tiene — la plantilla no falla en ese caso: cae en el estado "en construcción" descrito abajo. Completar `detail` para los temas restantes es contenido pendiente, no un cambio de código.

### 11.3 Ruta y navegación

- Cada tarjeta de tema en `categoria.js` ya enlaza a `articulo.html?cat={categoria}&topic={slug}`.
- El breadcrumb superior ("Estante › {Categoría} › {Tema}") permite volver a cualquier nivel.
- Si `cat`/`topic` no existen en `data.js`, el mock redirige a `index.html`. **Kiro debe reemplazar esto por una pantalla 404 propia**, igual que en `categoria.html`.

### 11.4 Sabio en el artículo — tercera variante

Este es el tercer "modo" de la mascota (después del home y la categoría): aquí es una guía **fija en una esquina** mientras el niño lee, no protagonista de un hero. Mantiene el disfraz de la categoría (mismo sistema `buildMascotSVG`, duplicado en `articulo.js` con el mismo mapa de costumes — si se refactoriza a un archivo compartido `mascot.js`, ambas páginas deben consumir la misma función). Alterna, al tocarlo, entre:
- el dato específico del tema (`topic.detail.mascotLine`), y
- un mensaje general de la categoría (`category.mascotMessages`, aleatorio).

### 11.5 Estado "en construcción"

Cuando `topic.detail` no existe, la página muestra el encabezado normal (ícono, insignia, título, `blurb` como descripción) y, en vez de las secciones de datos/curiosidades, una tarjeta con borde punteado indicando que el contenido está pendiente. Esto es intencional: Kiro no debe ocultar el tema del estante ni mostrar una página vacía — cada tema es visitable desde el día uno, aunque su contenido llegue después.

### 11.6 Responsive

- **> 860px:** hero horizontal (ícono a la izquierda, texto a la derecha), 3 columnas en datos rápidos y curiosidades, Sabio fijo en la esquina inferior derecha.
- **≤ 860px:** hero se apila centrado, 2 columnas en datos/curiosidades, Sabio pasa a estar en el flujo normal (no fijo) para no tapar contenido.
- **≤ 560px:** todo a una columna.

### 11.7 Criterios de aceptación (artículo)

- [ ] Los 6 temas de "Dinosaurios" muestran su ficha completa (intro, 3 datos rápidos, 3 curiosidades, línea de Sabio) sin errores.
- [ ] Un tema sin `detail` (ej. cualquiera de "Animales" por ahora) muestra el estado "en construcción", no una página rota.
- [ ] El breadcrumb navega correctamente en sus 3 niveles.
- [ ] Tocar a Sabio alterna su mensaje sin recargar la página.
- [ ] El banner final navega a `categoria.html?cat=juegos`.

## 12. Fuera de alcance (fase 4, no incluida aquí)

- Contenido de `detail` para los temas fuera de "Dinosaurios" (Animales, Espacio, Mi Cuerpo, Historia, Juegos) — la plantilla ya soporta esto, solo falta redactar el contenido.
- Pantalla de resultados de búsqueda.
- Los "Juegos" jugables en sí (el tile de tema navega, pero el juego no está diseñado).
- Arte final de los disfraces de Sabio (el mock usa geometría simple, no ilustración terminada).
- Sistema de perfiles/progreso del niño.
- Panel para adultos (control parental, reportes de uso).

Estos puntos deben cotizarse y especificarse como brief separado una vez validada esta fase.
