# Matemática Interactiva — Propuesta de Arquitectura

## Objetivo

Recrear la EXPERIENCIA de una enciclopedia multimedia educativa de finales de los años 90 / principios de los 2000. La principal referencia conceptual es Mi Primera Encarta.

No es una web moderna con colores retro. Es software educativo multimedia de CD-ROM de aproximadamente 1999-2005, reconstruido con tecnología web moderna.

---

## 1. Arquitectura General del Proyecto

### Stack Técnico
- **Framework**: Next.js 16 (App Router) — SSG para máximo rendimiento
- **Lenguaje**: TypeScript
- **Estilos**: CSS Modules + variables CSS (NO Tailwind para este rediseño — CSS puro permite control total sobre bevels, gradients y sombras que Tailwind abstrae demasiado)
- **Fórmulas**: KaTeX
- **Gráficas interactivas**: Canvas API / SVG con manipulación directa
- **Búsqueda**: Fuse.js (client-side)
- **Estado**: React Context + useReducer para navegación tipo aplicación
- **Audio/Video**: HTML5 nativo
- **Deploy**: Vercel (estático)

### Modelo Mental
La aplicación NO es un sitio web con páginas. Es una **aplicación de ventana única** donde el contenido cambia dentro de un marco fijo (como Encarta). La URL cambia internamente pero el usuario nunca "navega a otra página" — siempre está dentro de la aplicación.

---

## 2. Estructura de Carpetas

```
mpencarta/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Frame de aplicación fijo
│   │   ├── page.tsx                # Pantalla principal (Home)
│   │   ├── grado/[id]/page.tsx     # Vista de grado
│   │   ├── tema/[slug]/page.tsx    # Artículo/tema
│   │   └── not-found.tsx           # Error estilo aplicación
│   │
│   ├── components/
│   │   ├── shell/                  # Frame de la aplicación
│   │   │   ├── AppFrame.tsx        # Marco exterior (bordes biselados)
│   │   │   ├── HeaderBar.tsx       # Barra superior verde
│   │   │   ├── Toolbar.tsx         # Barra de herramientas con botones
│   │   │   ├── StatusBar.tsx       # Barra inferior de estado
│   │   │   └── ContentArea.tsx     # Área central scrollable
│   │   │
│   │   ├── navigation/
│   │   │   ├── NavButton.tsx       # Botón físico (atrás, adelante, home)
│   │   │   ├── CategoryNav.tsx     # Navegación por categorías
│   │   │   ├── BreadcrumbBar.tsx   # Ubicación actual
│   │   │   ├── IndexPanel.tsx      # Panel lateral de índice
│   │   │   └── SearchPanel.tsx     # Panel de búsqueda integrado
│   │   │
│   │   ├── controls/
│   │   │   ├── EncartaButton.tsx   # Botón base con bevels y estados
│   │   │   ├── TabBar.tsx          # Pestañas biseladas
│   │   │   ├── DropdownMenu.tsx    # Menú desplegable estilo Win2000
│   │   │   ├── ScrollArea.tsx      # Scroll personalizado
│   │   │   └── ProgressBar.tsx     # Barra de progreso estilo CD-ROM
│   │   │
│   │   ├── panels/
│   │   │   ├── InfoPanel.tsx       # Panel de información genérico
│   │   │   ├── ArticlePanel.tsx    # Panel de artículo
│   │   │   ├── SidePanel.tsx       # Panel lateral
│   │   │   ├── MediaPanel.tsx      # Panel multimedia
│   │   │   └── QuizPanel.tsx       # Panel de evaluación
│   │   │
│   │   ├── media/
│   │   │   ├── VideoPlayer.tsx     # Reproductor con controles retro
│   │   │   ├── AudioPlayer.tsx     # Reproductor compacto
│   │   │   ├── ImageViewer.tsx     # Visor con marco y controles
│   │   │   └── Slideshow.tsx       # Presentación de imágenes
│   │   │
│   │   ├── math/
│   │   │   ├── FormulaRenderer.tsx # KaTeX con estilos retro
│   │   │   ├── GraphCanvas.tsx     # Gráficas interactivas
│   │   │   ├── GeometryCanvas.tsx  # Geometría interactiva
│   │   │   ├── Calculator.tsx      # Calculadora integrada
│   │   │   └── Timeline.tsx        # Línea de tiempo matemática
│   │   │
│   │   ├── content/
│   │   │   ├── ArticleBody.tsx     # Cuerpo del artículo
│   │   │   ├── RelatedTopics.tsx   # "Temas relacionados"
│   │   │   ├── DidYouKnow.tsx      # "¿Sabías que?"
│   │   │   └── SeeAlso.tsx         # "Ver también"
│   │   │
│   │   └── feedback/
│   │       ├── Tooltip.tsx         # Tooltip biselado
│   │       ├── LoadingState.tsx    # Carga estilo multimedia
│   │       └── ErrorPanel.tsx      # Error estilo aplicación
│   │
│   ├── styles/
│   │   ├── tokens.css              # Variables CSS (colores, sombras, bordes)
│   │   ├── globals.css             # Estilos base
│   │   ├── bevels.css              # Sistema de biselados
│   │   ├── buttons.css             # Sistema de botones
│   │   ├── panels.css              # Sistema de paneles
│   │   ├── typography.css          # Tipografía compacta
│   │   └── animations.css          # Microanimaciones
│   │
│   ├── lib/
│   │   ├── types.ts                # Interfaces de datos
│   │   ├── content.ts              # Carga de contenido
│   │   ├── search.ts               # Motor de búsqueda
│   │   ├── navigation.ts           # Lógica de navegación
│   │   └── formula-parser.ts       # Parser de fórmulas
│   │
│   ├── context/
│   │   ├── NavigationContext.tsx   # Estado de navegación (historial)
│   │   └── AppStateContext.tsx     # Estado global de la app
│   │
│   ├── data/
│   │   ├── categorias.json         # Metadata de categorías
│   │   ├── search-index.json       # Índice de búsqueda
│   │   └── temas/                  # Contenido por grado/tema
│   │
│   └── hooks/
│       ├── useNavHistory.ts        # Historial atrás/adelante
│       ├── useKeyboard.ts          # Atajos de teclado
│       └── useMediaState.ts        # Estado de multimedia
│
├── public/
│   ├── images/
│   ├── audio/
│   └── icons/                      # Iconos ilustrados (no SVG modernos)
│
└── package.json
```

---

## 3. Componentes Reutilizables

### Jerarquía de Componentes Clave

```
AppFrame
├── HeaderBar (fijo)
│   ├── Logo "Matemática Interactiva"
│   ├── NavButton (Back)
│   ├── NavButton (Forward)
│   ├── NavButton (Home)
│   ├── NavButton (Index)
│   ├── SearchPanel
│   └── NavButton (Help)
│
├── Toolbar (fijo, contextual)
│   ├── TabBar (categorías o grados)
│   └── BreadcrumbBar
│
├── ContentArea (scrollable)
│   ├── [Home] CategoryGrid + FeaturedPanel
│   ├── [Grade] TopicList + SidePanel
│   └── [Topic] ArticleBody + MediaPanel + QuizPanel
│
└── StatusBar (fijo)
    ├── Ubicación actual
    ├── Info contextual
    └── Versión
```

### Componente Base: EncartaButton

Todos los botones heredan de un componente base que implementa:
- Gradiente de fondo (raised)
- Borde exterior oscuro (1px)
- Highlight interior superior (inset)
- Sombra inferior (inset)
- Estado hover: brillo +10%
- Estado pressed: inversión de sombras, translateY(1px)
- Estado disabled: opacity 0.5, desaturación
- Transición: 120ms ease

---

## 4. Sistema de Diseño

### Design Tokens (tokens.css)

```css
:root {
  /* Colores Primarios */
  --enc-green-deep: #176B3A;
  --enc-green-dark: #0D4A28;
  --enc-green-medium: #3D9A5B;
  --enc-green-light: #8FCB8F;
  --enc-cream: #F5EED7;
  --enc-warm-white: #FFFDF3;
  --enc-dark-text: #26352B;

  /* Acentos */
  --enc-gold: #E5B83F;
  --enc-orange: #D98236;
  --enc-blue: #3C79A8;
  --enc-red: #B94A42;

  /* Sombras del Sistema de Biselado */
  --enc-shadow-outer: 0 2px 4px rgba(0,0,0,0.25);
  --enc-shadow-inner-top: inset 0 1px 0 rgba(255,255,255,0.45);
  --enc-shadow-inner-bottom: inset 0 -1px 0 rgba(0,0,0,0.20);
  --enc-bevel: var(--enc-shadow-outer), var(--enc-shadow-inner-top), var(--enc-shadow-inner-bottom);

  /* Bordes */
  --enc-border-dark: 1px solid #5a5a5a;
  --enc-border-light: 1px solid rgba(255,255,255,0.3);
  --enc-border-panel: 1px solid #8b7d5e;

  /* Tipografía */
  --enc-font-family: system-ui, Tahoma, "Segoe UI", sans-serif;
  --enc-font-size-body: 13px;
  --enc-font-size-label: 11px;
  --enc-font-size-heading: 15px;
  --enc-font-size-title: 18px;
  --enc-line-height: 1.4;

  /* Espaciado (compacto) */
  --enc-spacing-xs: 2px;
  --enc-spacing-sm: 4px;
  --enc-spacing-md: 8px;
  --enc-spacing-lg: 12px;
  --enc-spacing-xl: 16px;

  /* Animaciones */
  --enc-duration-micro: 120ms;
  --enc-duration-button: 150ms;
  --enc-duration-panel: 250ms;
  --enc-duration-navigation: 350ms;
  --enc-easing: ease;
}
```

### Principios Visuales

1. **Densidad**: Máxima información visible sin scroll
2. **Tactilidad**: Todo se ve como si se pudiera tocar/presionar
3. **Jerarquía**: Paneles claros con headers identificables
4. **Cohesión**: Todo pertenece a la misma aplicación
5. **Affordance**: Si es clickeable, se ve clickeable
6. **Contención**: El contenido vive dentro de marcos/paneles

---

## 5. Sistema de Navegación

### Modelo

```
NavigationState {
  history: Route[]          // Historial completo
  currentIndex: number      // Posición en historial
  currentRoute: Route       // Ruta actual
  canGoBack: boolean
  canGoForward: boolean
}

Route {
  type: 'home' | 'category' | 'grade' | 'topic' | 'search'
  params: Record<string, string>
  title: string
}
```

### Flujo
- **Home** → seleccionar categoría/grado → lista de temas → tema individual
- **Back/Forward** navegan por el historial interno
- **Home** siempre regresa a la pantalla principal
- **Índice** abre un panel lateral con el árbol de contenido
- **Búsqueda** abre un panel contextual de resultados

### Transiciones
- El frame (header, toolbar, statusbar) NUNCA cambia
- Solo el ContentArea transiciona
- Transición: opacity fade 250ms + translateY(-4px → 0)
- No hay page transitions modernas

---

## 6. Modelo de Estados

### Estados de la Aplicación

```typescript
interface AppState {
  navigation: NavigationState;
  search: SearchState;
  audio: AudioState;
  ui: UIState;
}

interface UIState {
  indexPanelOpen: boolean;
  searchPanelOpen: boolean;
  helpOpen: boolean;
  currentTooltip: string | null;
}
```

### Estados de Componentes Interactivos

Cada componente interactivo tiene:
```
idle → hover → pressed → (selected | idle)
idle → disabled
idle → loading → idle
```

---

## 7. Sistema de Animaciones

### Principios
- Cortas (120-350ms)
- Funcionales (comunican estado)
- Sutiles (no distraen)
- Mecánicas (no elásticas/bouncy)

### Catálogo

| Interacción | Duración | Easing | Efecto |
|-------------|----------|--------|--------|
| Botón hover | 120ms | ease | brillo +10% |
| Botón press | 100ms | ease | translateY(1px), shadow invert |
| Panel open | 250ms | ease | opacity + translateY(-4px) |
| Content change | 350ms | ease | fade out → fade in |
| Tooltip show | 150ms | ease | opacity + translateY(2px) |
| Search expand | 200ms | ease | width expansion |
| Icon hover | 120ms | ease | scale(1.03) + brightness |

### Reglas
- `prefers-reduced-motion: reduce` → sin movimiento, solo opacity
- No spring animations
- No parallax
- No scale > 1.05

---

## 8. Sistema de Iconos

### Estilo
- Ilustrados (no line-icons modernos)
- 24x24px y 32x32px como tamaños base
- Colores sólidos con ligero sombreado
- Bordes definidos
- Estilo reminiscente a iconos de Windows 2000/XP

### Iconos Necesarios
- Home, Back, Forward, Search, Index, Help
- Cada categoría: Aritmética (ábaco), Álgebra (x), Geometría (compás), Trigonometría (triángulo), Cálculo (integral), Estadística (gráfica), Probabilidad (dado), Discreta (nodos), Números (∞)
- Media: Play, Pause, Stop, Volumen
- UI: Expandir, Cerrar, Más info, Relacionados

### Implementación
- SVG con colores del sistema de diseño
- Cada icono soporta estados via CSS (filter, opacity, transform)
- NO se usan librerías de iconos modernos (Lucide, Heroicons, etc.)

---

## 9. Sistema de Artículos

### Estructura de un Artículo

```typescript
interface Article {
  slug: string;
  titulo: string;
  categoria: Categoria;
  grado: string;
  contenido: {
    introduccion: string;        // Párrafo inicial (destacado)
    cuerpo: string;              // Texto principal con fórmulas
    sabias_que: string;          // Dato curioso (panel lateral)
    ejemplo_resuelto: string;    // Ejemplo paso a paso
  };
  multimedia: {
    imagenes: Imagen[];
    videos: Video[];
    audio: AudioClip;
  };
  interactivo: InteractiveModule | null;
  quiz: Quiz;
  relacionados: string[];        // Slugs de temas relacionados
  ver_tambien: string[];         // Slugs adicionales
}
```

### Layout del Artículo

```
┌──────────────────────────────────────────────┐
│ [Header Bar - fijo]                          │
├──────────────────────────────────────────────┤
│ [Toolbar: ← → 🏠 | Aritmética > Números]    │
├────────────────────────────┬─────────────────┤
│                            │ ┌─────────────┐ │
│  TÍTULO DEL TEMA           │ │ ¿Sabías que?│ │
│                            │ │ ...         │ │
│  [Imagen principal]        │ └─────────────┘ │
│                            │                 │
│  Introducción...           │ ┌─────────────┐ │
│                            │ │ Multimedia  │ │
│  Explicación con           │ │ 🎬 Video    │ │
│  fórmulas $...$            │ │ 🎧 Audio    │ │
│                            │ └─────────────┘ │
│  Ejemplo resuelto...       │                 │
│                            │ ┌─────────────┐ │
│  [Interactivo]             │ │ Ver también │ │
│                            │ │ - Tema 1    │ │
│  ┌──── Quiz ─────┐        │ │ - Tema 2    │ │
│  │ Pregunta...   │        │ └─────────────┘ │
│  └───────────────┘        │                 │
├────────────────────────────┴─────────────────┤
│ [← Anterior]              [Siguiente →]      │
├──────────────────────────────────────────────┤
│ [Status Bar]                                 │
└──────────────────────────────────────────────┘
```

---

## 10. Sistema de Multimedia

### Componentes

**VideoPlayer**: Frame biselado, barra de controles inferior con botones retro (play/pause/stop), progress bar con groove border, tiempo en monospace.

**AudioPlayer**: Barra horizontal compacta, botón circular play/pause biselado, progress bar ridge, display de tiempo.

**ImageViewer**: Marco con borde doble, título en barra superior del panel, botones de navegación si hay múltiples imágenes.

**Slideshow**: ImageViewer con controles de avance/retroceso y indicador de posición (1/5).

### Estilo de Controles Multimedia
- Mismos bevels que el sistema de botones
- Gradientes sutiles
- Bordes groove/ridge para barras de progreso
- Colores verdes/crema del sistema

---

## 11. Arquitectura para Experimentos Matemáticos

### Módulos Interactivos (fase futura)

```typescript
interface InteractiveModule {
  type: 'graph' | 'geometry' | 'calculator' | 'probability' | 'statistics';
  config: Record<string, unknown>;
}
```

### Tipos Planeados

1. **GraphCanvas**: Gráficas de funciones con zoom/pan, cambio de parámetros
2. **GeometryCanvas**: Figuras manipulables (ángulos, triángulos, círculos)
3. **Calculator**: Calculadora paso a paso para ecuaciones
4. **ProbabilitySimulator**: Dados, monedas, urnas
5. **StatisticsViewer**: Datasets con media/mediana/moda interactivos
6. **Timeline**: Línea de tiempo de descubrimientos matemáticos

### Implementación
- Canvas 2D o SVG según complejidad
- Controles biselados consistentes con el resto de la app
- Panel enmarcado dentro del artículo
- Interacción mediante clicks y sliders retro

---

## 12. Sistema Responsive

### Principio
Desktop es la experiencia primaria. El diseño replica software de escritorio.

### Breakpoints

| Viewport | Comportamiento |
|----------|---------------|
| ≥1024px | Experiencia completa: sidebar + contenido + paneles laterales |
| 768-1023px | Sin sidebar permanente, paneles colapsables |
| <768px | Contenido single-column, toolbar simplificado, panels stacked |

### Reglas Mobile
- NO hamburger menu genérico
- Mantener la barra de herramientas (comprimida)
- Paneles se stackean verticalmente
- Bevels y colores se mantienen
- Tipografía se mantiene compacta (no escalar a mobile-first)
- La experiencia debe seguir sintiéndose como "aplicación" no como "web mobile"

---

## 13. Accesibilidad

### Requisitos (sin cambiar la estética)
- Todos los botones son `<button>` semánticos
- `aria-label` en controles con iconos
- `aria-current` en navegación activa
- `role="navigation"`, `role="main"`, `role="status"`
- Focus visible (borde gold del sistema)
- Tab order lógico
- `prefers-reduced-motion` respetado
- Contraste mínimo 4.5:1 (los colores del sistema ya cumplen)
- Skip links ocultos visualmente

---

## 14. Gestión de Contenido

### Formato
- Archivos JSON estáticos por tema
- Fórmulas en notación KaTeX dentro del texto
- Imágenes en `/public/images/`
- Audio placeholder (graceful fallback)
- Videos: YouTube IDs reales

### Estructura de Datos

```
src/data/
├── categorias.json          # 9 categorías con metadata
├── grados.json              # 6 grados con metadata
├── search-index.json        # Índice pre-generado
└── temas/
    ├── 6/                   # 3 temas por grado (prototipo)
    ├── 7/
    ├── 8/
    ├── 9/
    ├── 10/
    └── 11/
```

---

## 15. Estrategia para Mantener la Estética Coherente

### Checklist de Calidad Visual

Antes de considerar un componente terminado:

1. ¿Se ve como software multimedia de 2001? → SI/NO
2. ¿Tiene bevels/sombras apropiados? → SI/NO
3. ¿Los botones se ven como botones físicos? → SI/NO
4. ¿La densidad de información es alta? → SI/NO
5. ¿Hay estados hover/pressed? → SI/NO
6. ¿Pertenece visualmente al mismo programa? → SI/NO
7. ¿Se coló algún patrón web moderno? → SI/NO
8. ¿Se siente como parte de un CD-ROM educativo? → SI/NO

### Prohibiciones Explícitas
- ❌ Card grids con sombras flotantes modernas
- ❌ Botones pill/rounded-full
- ❌ Hero sections
- ❌ Glassmorphism/neumorphism
- ❌ Grandes espacios vacíos
- ❌ Tipografía gigante
- ❌ Animaciones spring/bounce
- ❌ Gradientes modernos suaves
- ❌ Iconos line-art minimalistas
- ❌ Mobile-first design patterns

### Mandatorios
- ✅ Bevels en todo panel y botón
- ✅ Gradientes de 2 tonos (light→dark)
- ✅ Bordes de 1px frecuentes
- ✅ Sombras compactas (2-4px)
- ✅ Tipografía 11-14px
- ✅ Colores verdes/cream/gold
- ✅ Frame de aplicación fijo
- ✅ Status bar
- ✅ Botones con estados físicos
- ✅ Paneles con headers de color

---

## 16. Orden Recomendado de Implementación

### Fase 1: Sistema de Diseño
- tokens.css con todas las variables
- bevels.css, buttons.css, panels.css
- typography.css, animations.css

### Fase 2: Shell de Aplicación
- AppFrame (marco exterior biselado)
- HeaderBar + StatusBar
- ContentArea (scroll interno)

### Fase 3: Navegación
- NavButton component
- Toolbar con botones
- NavigationContext (historial)
- BreadcrumbBar

### Fase 4: Pantalla Principal
- Home con categorías y grados
- CategoryNav con iconos
- Panel destacado central

### Fase 5: Sistema de Artículos
- ArticlePanel layout
- FormulaRenderer
- SidePanel (¿Sabías que?, Ver también)
- Navegación anterior/siguiente

### Fase 6: Multimedia
- VideoPlayer (YouTube embed con controles retro)
- AudioPlayer (fallback graceful)
- ImageViewer

### Fase 7: Quiz
- QuizPanel
- Preguntas con opciones biseladas
- Feedback visual retro
- Score panel

### Fase 8: Búsqueda
- SearchPanel integrado en toolbar
- Resultados en panel contextual
- Navegación a artículos

### Fase 9: Interactivos (futuro)
- GraphCanvas
- GeometryCanvas
- Módulos de probabilidad/estadística

### Fase 10: Polish
- Responsive
- Accesibilidad
- Contenido real
- Optimización de rendimiento

---

## Riesgos Identificados

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| La estética retro se ve "fea" o inconsistente | Alto | Seguir estrictamente los tokens y checklist. No improvisar. |
| Los bevels CSS son difíciles de mantener | Medio | Centralizar en clases reutilizables. Un componente base por tipo. |
| Performance con muchos box-shadows | Bajo | Los shadows son simples (2-4px). No hay blur pesado. |
| Responsive difícil con layout fijo | Medio | Priorizar desktop. Mobile como adaptación, no como diseño primario. |
| El contenido placeholder no luce bien | Medio | Usar videos reales de YouTube + imágenes placeholder decentes. |
| KaTeX + CSS retro pueden conflictuar | Bajo | Contener fórmulas en paneles con overflow controlado. |
| Usuarios esperan interacción moderna | Alto | Documentar que ES intencional. El proyecto es una recreación. |
| Scope creep con módulos interactivos | Alto | Implementar en fases. Los interactivos son fase 9 (futuro). |

---

## Esperando Aprobación

Este documento define la arquitectura completa antes de escribir código. Los cambios principales vs. el estado actual serían:

1. Reemplazar Tailwind por CSS Modules + variables (control total de bevels)
2. Reestructurar componentes en la jerarquía shell/navigation/controls/panels
3. Implementar NavigationContext para historial tipo aplicación
4. Nuevo sistema visual completo basado en los design tokens

**¿Apruebas esta propuesta para proceder con la implementación?**
