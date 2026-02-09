# 🎬 Rediseño Web - Estilo Vitapictura

## Referencia visual
**Web de inspiración**: https://vitapictura.co/

### Características clave de Vitapictura:
1. **Hero con video fullscreen** que ocupa todo el viewport
2. **Navegación superior minimalista** (casi invisible hasta hover)
3. **Links a showreels** superpuestos en el video
4. **Botón "Start Project"** prominente
5. **Diseño oscuro** (predominio de negro)
6. **Tipografía grande y limpia**
7. **Secciones por categoría** en navegación

---

## Estructura propuesta NOT A ROBOT

### 1. Navegación principal
```
[LOGO NOT A ROBOT]     Estudio | Podcast | Agencia | NotA     [CONTACTO]
```

### 2. Página HOME

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    ╔════════════════════════════╗              │
│                    ║    VIDEO FULLSCREEN        ║              │
│                    ║    (Reel_NotARobot.mp4)    ║              │
│                    ╚════════════════════════════╝              │
│                                                                 │
│                    [LOGO NOT A ROBOT]                          │
│                                                                 │
│          "By humans, for humans."                              │
│                                                                 │
│    [Aurora Live]  [FIFA WC 2022]  [Favaloro]  [Ver Showreel]   │
│                                                                 │
│                       ↓ scroll                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   WHAT WE DO                                                    │
│   ───────────                                                   │
│                                                                 │
│   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌──────────┐ │
│   │   ESTUDIO   │ │  PODCAST    │ │  AGENCIA    │ │   NOTA   │ │
│   │   Alquiler  │ │ Producción  │ │  Creativa   │ │  Sello   │ │
│   │   espacio   │ │  integral   │ │  Estrategia │ │ propio   │ │
│   │     [→]     │ │    [→]      │ │    [→]      │ │   [→]    │ │
│   └─────────────┘ └─────────────┘ └─────────────┘ └──────────┘ │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   PROYECTOS DESTACADOS                           [Ver todos →] │
│   ════════════════════                                          │
│                                                                 │
│   ┌─────────────────────┐  ┌─────────────────────┐             │
│   │                     │  │                     │             │
│   │   AURORA LIVE       │  │  FIFA WORLD CUP     │             │
│   │   Live Experience   │  │  Qatar 2022         │             │
│   │                     │  │                     │             │
│   └─────────────────────┘  └─────────────────────┘             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │          FOTOS ESTUDIO + EQUIPO                        │  │
│   │          (Carousel horizontal)                          │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ¿LISTO PARA TU PRÓXIMO PROYECTO?                             │
│                                                                 │
│   [AGENDAR LLAMADA]                                            │
│        ↓                                                        │
│   (Calendly popup)                                              │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│   FOOTER                                                        │
│   ───────                                                       │
│   [LOGO]   team@notarobot.es     IG  YT  LI                    │
│            notarobot.es                                         │
│                                                                 │
│   © 2026 NOT A ROBOT. By humans, for humans.                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Páginas internas

### /estudio
- Hero con fotos del estudio
- Capacidades técnicas
- Galería del espacio
- Botón de reserva

### /podcast
- Servicios de producción
- Equipamiento disponible
- Ejemplos de podcasts producidos
- Planes/paquetes

### /agencia
- Servicios creativos
- Metodología de trabajo
- Casos de éxito
- Formulario de contacto

### /nota
- Historia del proyecto NotA
- Filosofía
- Team
- Producciones bajo el sello

### /proyectos
- Grid de proyectos
- Filtros por categoría
- Cada proyecto lleva a página individual

### /proyecto/[nombre]
- Video/galería del proyecto
- Descripción
- Ficha técnica
- Proyectos relacionados

---

## 4. Elementos visuales especiales

### Cursor personalizado
Como el dossier original, cursor custom que cambia según contexto:
- Default: Círculo pequeño
- Hover links: Círculo grande con "Ver"
- Hover video: Play icon

### Blur blobs
Elementos decorativos animados en colores de la marca:
- Naranja/rojo (#E94E1B)
- Gradientes suaves

### Elementos dibujados a mano
Usar los assets de `02. ELEMENTOS GRÁFICOS/` para:
- Líneas decorativas
- Flechas
- Subrayados
- Marcos

### Transiciones
- Page transitions suaves
- Scroll animations con GSAP o CSS
- Parallax en algunas secciones

---

## 5. Archivos de la nueva web

```
website/
├── index.html              ← Página principal nueva
├── coming-soon.html        ← Mantener para backup
├── estudio.html
├── podcast.html
├── agencia.html
├── nota.html
├── proyectos.html
├── proyecto-aurora.html
├── proyecto-fifa.html
├── proyecto-favaloro.html
├── css/
│   ├── styles.css         ← Estilos principales
│   ├── components.css     ← Componentes reutilizables
│   └── animations.css     ← Animaciones
├── js/
│   ├── main.js            ← Lógica principal
│   ├── cursor.js          ← Cursor personalizado
│   ├── video.js           ← Control de video hero
│   └── animations.js      ← Animaciones scroll
├── fonts/
│   └── aileron/           ← Fuente principal
├── images/
│   ├── logos/
│   ├── estudio/
│   ├── proyectos/
│   └── elementos/
└── videos/
    └── (enlaces externos o versiones comprimidas)
```

---

## 6. Paleta de colores

| Color | Uso | Hex |
|-------|-----|-----|
| Negro | Fondos | #000000, #111111 |
| Blanco | Texto | #FFFFFF, #F5F5F5 |
| Naranja/Rojo | Acentos, logo | #E94E1B |
| Gris | Texto secundario | #888888 |

---

## 7. Tipografía

| Uso | Fuente | Peso |
|-----|--------|------|
| Títulos grandes | Helvetica Now Display | ExtraBold |
| Subtítulos | Aileron | Bold |
| Body text | Aileron | Regular |
| Labels/botones | Helvetica Now Micro | Bold |

---

## 8. Responsive breakpoints

| Breakpoint | Ancho | Cambios |
|------------|-------|---------|
| Desktop | 1200px+ | Layout completo |
| Tablet | 768-1199px | 2 columnas |
| Mobile | <768px | 1 columna, menú hamburguesa |

---

*Documento de trabajo - Actualizar según avance*
