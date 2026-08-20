# Matemática Interactiva — Propuesta de Arquitectura v2

---

## 1. Estructura de Rutas

```
/                                    → Home (portada de enciclopedia)
/categoria/[categoriaSlug]           → Vista de categoría (temas)
/categoria/[categoriaSlug]/[temaSlug]         → Artículo de tema
/categoria/[categoriaSlug]/[temaSlug]/[subtemaSlug]  → Subtema / experiencia
/buscar                              → Resultados de búsqueda (panel interno)
/indice                              → Índice general alfabético
```

### Rutas internas (no visibles como URL para el usuario)
La experiencia se siente como navegación interna de una app. Las URLs cambian por accesibilidad y bookmarks, pero el frame nunca se recarga.

### Navegación lógica
```
HOME → CATEGORÍA → TEMA → SUBTEMA / EXPERIENCIA INTERACTIVA
                                  ↕
                          TEMAS RELACIONADOS
```

---

## 2. Estructura de Carpetas

```
mpencarta/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Shell fijo de la aplicación
│   │   ├── page.tsx                    # Home (portada enciclopedia)
│   │   ├── categoria/
│   │   │   └── [categoriaSlug]/
│   │   │       ├── page.tsx            # Vista de categoría
│   │   │       └── [temaSlug]/
│   │   │           ├── page.tsx        # Artículo del tema
│   │   │           └── [subtemaSlug]/
│   │   │               └── page.tsx    # Subtema / experiencia
│   │   ├── buscar/
│   │   │   └── page.tsx                # Búsqueda
│   │   ├── indice/
│   │   │   └── page.tsx                # Índice alfabético
│   │   └── not-found.tsx               # Error estilo app
│   │
│   ├── components/
│   │   ├── shell/                      # Marco de la aplicación
│   │   │   ├── AppFrame.tsx
│   │   │   ├── MathHeader.tsx
│   │   │   ├── MathToolbar.tsx
│   │   │   ├── MathStatusBar.tsx
│   │   │   └── MathContentArea.tsx
│   │   │
│   │   ├── navigation/
│   │   │   ├── NavButton.tsx           # Botón físico individual
│   │   │   ├── NavHistory.tsx          # Back / Forward
│   │   │   ├── Breadcrumb.tsx
│   │   │   ├── IndexPanel.tsx          # Índice lateral
│   │   │   └── SearchPanel.tsx
│   │   │
│   │   ├── controls/
│   │   │   ├── MathButton.tsx          # Botón base con estados
│   │   │   ├── MathTabBar.tsx
│   │   │   ├── MathDropdown.tsx
│   │   │   ├── MathScrollArea.tsx
│   │   │   └── MathProgressBar.tsx
│   │   │
│   │   ├── panels/
│   │   │   ├── MathPanel.tsx           # Panel genérico enmarcado
│   │   │   ├── ArticlePanel.tsx
│   │   │   ├── SidePanel.tsx
│   │   │   ├── MediaPanel.tsx
│   │   │   ├── QuizPanel.tsx
│   │   │   └── FactPanel.tsx           # "¿Sabías que?"
│   │   │
│   │   ├── media/
│   │   │   ├── MathMediaPlayer.tsx     # Video con controles retro
│   │   │   ├── MathAudioPlayer.tsx
│   │   │   ├── MathImageViewer.tsx
│   │   │   └── MathSlideshow.tsx
│   │   │
│   │   ├── math/
│   │   │   ├── FormulaRenderer.tsx     # KaTeX
│   │   │   ├── MathInteractiveModule.tsx  # Wrapper genérico
│   │   │   ├── GraphExplorer.tsx       # Gráficas de funciones
│   │   │   ├── GeometryLab.tsx         # Geometría interactiva
│   │   │   ├── EquationSolver.tsx      # Resolución paso a paso
│   │   │   ├── ProbabilityLab.tsx      # Simulaciones
│   │   │   ├── StatisticsViewer.tsx    # Datos interactivos
│   │   │   └── MathTimeline.tsx        # Historia matemática
│   │   │
│   │   ├── content/
│   │   │   ├── ArticleBody.tsx
│   │   │   ├── RelatedTopics.tsx
│   │   │   ├── SeeAlso.tsx
│   │   │   ├── DidYouKnow.tsx
│   │   │   └── ExampleBlock.tsx        # Ejemplo resuelto
│   │   │
│   │   ├── icons/
│   │   │   ├── CategoryIcon.tsx        # Wrapper con estados
│   │   │   ├── icons/                  # SVGs ilustrados por categoría
│   │   │   │   ├── ArithmeticIcon.tsx
│   │   │   │   ├── AlgebraIcon.tsx
│   │   │   │   ├── GeometryIcon.tsx
│   │   │   │   ├── TrigonometryIcon.tsx
│   │   │   │   ├── CalculusIcon.tsx
│   │   │   │   ├── StatisticsIcon.tsx
│   │   │   │   ├── ProbabilityIcon.tsx
│   │   │   │   ├── DiscreteIcon.tsx
│   │   │   │   └── NumberTheoryIcon.tsx
│   │   │   └── NavIcons.tsx            # Home, Back, Forward, Search, etc.
│   │   │
│   │   ├── home/
│   │   │   ├── HomeLayout.tsx          # Composición de la portada
│   │   │   ├── FeaturedPanel.tsx       # Concepto destacado
│   │   │   ├── CategoryEntrance.tsx    # Entrada a categoría (no card)
│   │   │   ├── CuriosityWidget.tsx     # Curiosidades rotativas
│   │   │   ├── InteractivePreview.tsx  # Preview de experiencia
│   │   │   └── ExplorePrompt.tsx       # "¿Qué puedo descubrir?"
│   │   │
│   │   └── feedback/
│   │       ├── MathTooltip.tsx
│   │       ├── LoadingState.tsx
│   │       └── ErrorPanel.tsx
│   │
│   ├── styles/
│   │   ├── tokens.css              # Variables CSS del sistema
│   │   ├── globals.css             # Base + reset
│   │   ├── shell.css               # Estilos del frame
│   │   ├── controls.css            # Botones y controles
│   │   ├── panels.css              # Paneles y marcos
│   │   ├── typography.css          # Sistema tipográfico
│   │   ├── icons.css               # Estados de iconos
│   │   └── animations.css          # Microanimaciones + math animations
│   │
│   ├── lib/
│   │   ├── types.ts
│   │   ├── content.ts
│   │   ├── search.ts
│   │   ├── navigation.ts
│   │   └── formula-parser.ts
│   │
│   ├── context/
│   │   ├── NavigationContext.tsx
│   │   └── AppStateContext.tsx
│   │
│   ├── data/
│   │   ├── categorias.json         # 9 categorías
│   │   ├── search-index.json
│   │   └── temas/
│   │       ├── aritmetica/
│   │       │   ├── _meta.json      # Metadata de categoría
│   │       │   ├── numeros-naturales.json
│   │       │   ├── operaciones-basicas.json
│   │       │   └── ...
│   │       ├── algebra/
│   │       ├── geometria/
│   │       ├── trigonometria/
│   │       ├── calculo/
│   │       ├── estadistica/
│   │       ├── probabilidad/
│   │       ├── matematica-discreta/
│   │       └── teoria-de-numeros/
│   │
│   └── hooks/
│       ├── useNavHistory.ts
│       ├── useKeyboard.ts
│       └── useAnimation.ts
│
├── public/
│   ├── images/
│   │   └── categorias/             # Ilustraciones de categorías
│   ├── audio/
│   └── icons/
│
└── package.json
```

---

## 3. Modelo de Contenido

```typescript
// === Categorías ===

interface Categoria {
  slug: string;                    // "aritmetica", "algebra", etc.
  nombre: string;                  // "Aritmética"
  descripcion: string;             // Descripción breve
  color: string;                   // Color identificativo
  temas: TemaResumen[];            // Lista de temas
}

// === Temas ===

interface TemaResumen {
  slug: string;
  titulo: string;
  descripcionCorta: string;
  subtemas?: SubtemaResumen[];
}

interface Tema {
  slug: string;
  titulo: string;
  categoria: string;               // Slug de la categoría
  contenido: {
    introduccion: string;          // Texto destacado inicial
    cuerpo: string;                // Texto con fórmulas KaTeX
    sabias_que: string | null;     // Dato curioso
    ejemplo: EjemploResuelto | null;
  };
  multimedia: {
    imagenes: Imagen[];
    videos: Video[];
    audio: AudioClip | null;
  };
  interactivo: InteractiveModuleConfig | null;
  quiz: Quiz | null;
  relacionados: string[];          // Slugs: "categoria/tema"
  ver_tambien: string[];
  subtemas?: SubtemaResumen[];
}

// === Subtemas / Experiencias ===

interface SubtemaResumen {
  slug: string;
  titulo: string;
  tipo: 'articulo' | 'interactivo' | 'experimento';
}

// === Ejemplos ===

interface EjemploResuelto {
  titulo: string;
  pasos: PasoEjemplo[];
}

interface PasoEjemplo {
  descripcion: string;
  formula: string;                 // KaTeX
}

// === Módulos Interactivos ===

interface InteractiveModuleConfig {
  type: 'graph' | 'geometry' | 'equation-solver' | 'probability' 
      | 'statistics' | 'trigonometry-circle' | 'timeline';
  config: Record<string, unknown>;
  titulo: string;
  descripcion: string;
}

// === Multimedia (sin cambios) ===

interface Imagen { src: string; alt: string; caption?: string; }
interface Video { youtubeId: string; titulo: string; urlDirecta: string; }
interface AudioClip { src: string; titulo: string; duracionSegundos: number; }

// === Quiz (sin cambios estructurales) ===

interface Quiz { preguntas: Pregunta[]; }
interface Pregunta {
  id: string;
  enunciado: string;
  opciones: Opcion[];
  respuestaCorrecta: string;
  explicacion: string;
}
interface Opcion { id: string; texto: string; }
```

---

## 4. Jerarquía de Componentes

```
AppFrame (borde exterior, height: 100vh)
│
├── MathHeader (barra superior, ~40px)
│   ├── Logo "Matemática Interactiva"
│   ├── NavHistory (Back, Forward)
│   ├── NavButton (Home)
│   ├── NavButton (Index)
│   ├── SearchPanel (integrado, compacto)
│   └── NavButton (Help)
│
├── MathToolbar (contextual, ~28px)
│   ├── Breadcrumb (Home > Geometría > Triángulos)
│   └── Controles contextuales (según vista)
│
├── MathContentArea (flexible, scroll interno)
│   │
│   ├── [HOME] HomeLayout
│   │   ├── FeaturedPanel (concepto/curiosidad destacada)
│   │   ├── CategoryEntrance × 9 (distintos tamaños/posiciones)
│   │   ├── CuriosityWidget
│   │   ├── InteractivePreview
│   │   └── ExplorePrompt
│   │
│   ├── [CATEGORÍA] CategoryView
│   │   ├── CategoryHeader (icon + nombre + descripción)
│   │   ├── TemaList (compacta, con descripciones)
│   │   └── SidePanel (curiosidades de la categoría)
│   │
│   └── [TEMA] ArticleView
│       ├── ArticlePanel (contenido principal)
│       │   ├── Título + introducción
│       │   ├── FormulaRenderer (cuerpo)
│       │   ├── ExampleBlock
│       │   ├── MathImageViewer
│       │   ├── MathMediaPlayer
│       │   ├── MathInteractiveModule
│       │   └── QuizPanel
│       │
│       └── SidePanel (lateral derecho)
│           ├── FactPanel ("¿Sabías que?")
│           ├── RelatedTopics
│           ├── SeeAlso
│           └── MediaPanel (accesos rápidos a multimedia)
│
└── MathStatusBar (barra inferior, ~22px)
    ├── Ruta actual
    ├── Info contextual
    └── "Matemática Interactiva v1.0"
```

---

## 5. Sistema Visual

### Principios

1. **Enciclopedia multimedia educativa de 2001** — no web moderna con colores retro, no Windows viejo con bevels.
2. **Jerarquía visual clara**: los bevels son para CONTROLES INTERACTIVOS (botones, tabs). Los paneles de contenido son más sutiles (bordes finos, sombras leves).
3. **Densidad informativa**: mucho visible sin scroll.
4. **Composición diseñada**: la home NO es un grid automático. Cada elemento tiene posición y tamaño intencional.

### Paleta

| Token | Valor | Uso |
|-------|-------|-----|
| `--mi-green-deep` | #176B3A | Header, botones principales |
| `--mi-green-dark` | #0D4A28 | Bordes de header, acentos oscuros |
| `--mi-green-medium` | #3D9A5B | Hovers, highlights activos |
| `--mi-green-light` | #8FCB8F | Fondos de paneles destacados |
| `--mi-cream` | #F5EED7 | Fondo principal |
| `--mi-warm-white` | #FFFDF3 | Interior de paneles |
| `--mi-dark-text` | #26352B | Texto principal |
| `--mi-gold` | #E5B83F | Acentos, títulos, highlights |
| `--mi-orange` | #D98236 | Elementos de atención |
| `--mi-blue` | #3C79A8 | Links, elementos interactivos |
| `--mi-red` | #B94A42 | Errores, advertencias |

### Donde SÍ usar bevels (controles interactivos)
- Botones de navegación (Back, Forward, Home)
- Botones de acción (Search, Index, Help)
- Tabs activos
- Controles de multimedia (play, pause)
- Opciones de quiz
- Botones de navegación anterior/siguiente

### Donde NO usar bevels fuertes (contenido)
- Paneles de artículo → borde fino 1px + sombra sutil
- Paneles laterales → borde + fondo ligeramente distinto
- Áreas de texto → sin bevel
- Imágenes → marco sutil, no biselado agresivo
- Headers de panel → gradiente suave, no bevel industrial

### Sombras según contexto

| Elemento | Sombra |
|----------|--------|
| Frame exterior | `0 0 8px rgba(0,0,0,0.3)` |
| Botones (raised) | `0 1px 2px rgba(0,0,0,0.2), inset 0 1px rgba(255,255,255,0.4)` |
| Botones (pressed) | `inset 0 2px 3px rgba(0,0,0,0.25)` |
| Paneles contenido | `0 1px 3px rgba(0,0,0,0.1)` |
| Tooltips | `0 2px 4px rgba(0,0,0,0.2)` |

---

## 6. Sistema de Navegación

### Estado

```typescript
interface NavigationState {
  history: NavEntry[];
  currentIndex: number;
  canGoBack: boolean;
  canGoForward: boolean;
}

interface NavEntry {
  path: string;
  title: string;
  type: 'home' | 'categoria' | 'tema' | 'subtema' | 'buscar' | 'indice';
  params?: Record<string, string>;
}
```

### Comportamiento
- **Home**: siempre regresa a la portada
- **Back/Forward**: historial interno tipo aplicación
- **Índice**: panel lateral que se abre/cierra sin cambiar la vista principal
- **Búsqueda**: panel integrado en toolbar con resultados inline

### Transiciones entre vistas
- ContentArea hace fade-out (200ms) → carga nuevo contenido → fade-in (200ms)
- El shell (header, toolbar, statusbar) NUNCA se recarga
- Los paneles laterales se abren con slide (250ms)

---

## 7. Modelo de Categorías

### Las 9 categorías

| Slug | Nombre | Color Identificativo |
|------|--------|---------------------|
| aritmetica | Aritmética | #3C79A8 (azul) |
| algebra | Álgebra | #7B4B9E (púrpura) |
| geometria | Geometría | #D98236 (naranja) |
| trigonometria | Trigonometría | #B94A42 (rojo) |
| calculo | Cálculo | #176B3A (verde) |
| estadistica | Estadística | #2E7D6E (teal) |
| probabilidad | Probabilidad | #E5B83F (dorado) |
| matematica-discreta | Matemática Discreta | #5C6BC0 (índigo) |
| teoria-de-numeros | Teoría de Números | #8D6E63 (marrón) |

### Cada categoría contiene
- Metadata (nombre, descripción, color, icono)
- Lista de temas con descripciones
- Curiosidades propias
- Temas destacados

---

## 8. Sistema de Iconos

### Estilo
Los iconos NO son emoji ni símbolos tipográficos. Son **ilustraciones SVG** con estilo de enciclopedia educativa (~2001):
- Contornos definidos (2px stroke)
- Colores sólidos con sombreado sutil
- Nivel de detalle medio (no minimalista, no hiperrealista)
- Tamaño base: 48×48px (home) y 24×24px (toolbar)
- Reminiscentes a las ilustraciones de Encarta Kids / software educativo Zeta Multimedia

### Iconos por categoría

| Categoría | Elementos del icono |
|-----------|-------------------|
| Aritmética | Ábaco con cuentas de colores, números 1-2-3 |
| Álgebra | Pizarra con ecuación x+2=5, variable resaltada |
| Geometría | Compás abierto trazando un arco, triángulo |
| Trigonometría | Círculo unitario con ángulo marcado, seno visualizado |
| Cálculo | Curva con área sombreada debajo (integral visual) |
| Estadística | Gráfico de barras con línea de tendencia |
| Probabilidad | Dos dados en perspectiva, uno mostrando 6 |
| Matemática Discreta | Grafo con 4 nodos conectados |
| Teoría de Números | Espiral de Ulam o criba de Eratóstenes |

### Estados de iconos

```css
.category-icon          { opacity: 1; transform: scale(1); filter: none; }
.category-icon:hover    { transform: scale(1.04); filter: brightness(1.1); }
.category-icon:active   { transform: scale(0.97); filter: brightness(0.9); }
.category-icon.selected { outline: 2px solid var(--mi-gold); outline-offset: 3px; }
```

Transición: 120ms ease.

### Microanimaciones de iconos (idle/hover)
- **Geometría**: El compás rota sutilmente 3° en hover
- **Probabilidad**: Un dado rota ligeramente
- **Cálculo**: El área sombreada pulsa levemente
- **Estadística**: Las barras se elevan un pixel
- Estas animaciones son opcionales y muy sutiles (escala < 5% de movimiento)

---

## 9. Sistema de Animaciones

### Animaciones de interfaz (UI)

| Acción | Duración | Efecto |
|--------|----------|--------|
| Botón hover | 120ms | brillo +10% |
| Botón press | 100ms | translateY(1px), shadow invert |
| Panel abrir | 250ms | opacity + translateX (sidebar) |
| Vista cambiar | 350ms | fade out → fade in |
| Tooltip show | 150ms | opacity + translateY(2px) |
| Dropdown open | 200ms | scaleY(0→1) desde arriba |

### Animaciones matemáticas (contenido)

| Tipo | Descripción | Uso |
|------|-------------|-----|
| Función dibujándose | La curva se traza progresivamente de izquierda a derecha | GraphExplorer |
| Triángulo morphing | El triángulo cambia proporciones al mover un vértice | GeometryLab |
| Ángulo rotando | El ángulo se abre/cierra mostrando seno/coseno | Trigonometría interactiva |
| Ecuación resolviéndose | Pasos aparecen secuencialmente con highlight | EquationSolver |
| Distribución cambiando | La campana de Gauss se estira/comprime con controles | StatisticsViewer |
| Dado lanzándose | Rotación 3D → resultado | ProbabilityLab |
| Área bajo curva | Se rellena progresivamente el área (integral) | Cálculo interactivo |

### Principios
- Las animaciones matemáticas COMUNICAN un concepto, no decoran
- Duración de animaciones matemáticas: 600-1200ms (más lentas que UI para que se entiendan)
- El usuario puede controlarlas (pause, step, repeat)
- `prefers-reduced-motion`: reduce a transiciones instantáneas

---

## 10. Arquitectura de Módulos Matemáticos

### Wrapper genérico

```typescript
interface MathInteractiveModuleProps {
  type: ModuleType;
  config: Record<string, unknown>;
  titulo: string;
  descripcion: string;
}

type ModuleType = 
  | 'graph'              // Gráficas de funciones
  | 'geometry'           // Figuras manipulables
  | 'equation-solver'    // Resolución paso a paso
  | 'probability'        // Simulaciones
  | 'statistics'         // Datos y distribuciones
  | 'trig-circle'        // Círculo trigonométrico
  | 'timeline'           // Línea de tiempo
  | 'number-visualizer'  // Visualizador de patrones numéricos
  ;
```

### Arquitectura interna de un módulo

```
MathInteractiveModule (wrapper con panel y título)
├── ControlBar (controles del módulo: sliders, inputs, botones)
├── CanvasArea (visualización: SVG o Canvas 2D)
├── InfoPanel (valores actuales, explicación)
└── ActionBar (reset, step, animate, export)
```

### Controles de módulo
Los sliders, inputs y botones dentro de módulos usan el mismo sistema visual (MathButton, etc.) pero adaptados a controles de parámetros:
- Sliders con groove border
- Inputs numéricos compactos
- Botones step/play/reset en una toolbar interna

### Módulos planeados para el prototipo inicial
1. **GraphExplorer**: graficar y=f(x) con controles de parámetros
2. **GeometryLab**: triángulo con vértices arrastrables + cálculo de área/ángulos
3. **ProbabilityLab**: lanzamiento de dados con histograma de resultados

Los demás se implementarán en fases posteriores.

---

## Riesgos Actualizados

| Riesgo | Mitigación |
|--------|------------|
| La home "diseñada manualmente" es difícil sin assets gráficos | Usar composición CSS con paneles de distintos tamaños + iconos SVG. No requiere Photoshop. |
| 9 categorías sin contenido real se ven vacías | Iniciar con 2-3 temas por categoría. Las categorías con menos contenido muestran "Próximamente". |
| Los iconos ilustrados SVG toman tiempo de diseño | Diseñar versiones simplificadas primero. Iterar el detalle después. |
| Las animaciones matemáticas son complejas | Implementar en la fase final (fase 9). El artículo funciona sin ellas. |
| Sin grados, la organización es menos obvia para estudiantes | La búsqueda y el índice compensan. Agregar tags de dificultad/nivel como metadata opcional. |

---

## Orden de Implementación Actualizado

### Fase 1: Sistema de diseño
- tokens.css (variables `--mi-*`)
- globals.css, controls.css, panels.css, typography.css, animations.css

### Fase 2: Shell de aplicación
- AppFrame, MathHeader, MathToolbar, MathStatusBar, MathContentArea

### Fase 3: Navegación
- NavButton, NavHistory, Breadcrumb
- NavigationContext (historial)
- SearchPanel (interfaz, sin resultados aún)

### Fase 4: Home (portada)
- HomeLayout con composición diseñada
- CategoryEntrance × 9 (con iconos placeholder)
- FeaturedPanel, CuriosityWidget

### Fase 5: Categorías
- Vista de categoría con lista de temas
- SidePanel con info de la categoría

### Fase 6: Artículos
- ArticlePanel + FormulaRenderer
- SidePanel (¿Sabías que?, relacionados)
- ExampleBlock
- Navegación anterior/siguiente

### Fase 7: Multimedia
- MathMediaPlayer (YouTube)
- MathAudioPlayer
- MathImageViewer

### Fase 8: Quiz
- QuizPanel con preguntas
- Feedback visual

### Fase 9: Búsqueda e Índice
- SearchPanel funcional
- Índice alfabético

### Fase 10: Módulos interactivos
- MathInteractiveModule wrapper
- GraphExplorer (primer módulo)
- GeometryLab
- ProbabilityLab

### Fase 11: Iconos ilustrados
- SVGs para cada categoría
- Estados y microanimaciones

### Fase 12: Polish
- Responsive
- Accesibilidad
- Animaciones matemáticas
- Contenido real

---

**Esperando aprobación antes de implementar.**
