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

## 10. Fuera de alcance (fase 2, no incluida aquí)

- Pantalla de artículo/contenido de una categoría.
- Pantalla de resultados de búsqueda.
- Los "Juegos" individuales (el tile navega, pero el juego en sí no está diseñado).
- Sistema de perfiles/progreso del niño.
- Panel para adultos (control parental, reportes de uso).

Estos puntos deben cotizarse y especificarse como brief separado una vez validado el shell principal.
