# 📋 Guía de Implementación en Webflow - NOT A ROBOT

## Estructura de Archivos Creada

```
website/
├── index.html          → Página principal completa
├── css/
│   └── styles.css      → Todos los estilos del sitio
├── js/
│   └── main.js         → Animaciones e interacciones
├── images/             → Assets copiados
│   ├── ASSET-01.png a ASSET-08.png
│   ├── Fotos Estudio - X.png
│   └── 01.png a 07.png
├── videos/             → Carpeta para videos (vacía)
└── fonts/
    └── Helvetica Now Display XBold.otf
```

---

## 🎯 Pasos para Implementar en Webflow

### 1. **Crear el Proyecto en Webflow**
   - Crear nuevo proyecto desde cero
   - Nombre sugerido: `NOT A ROBOT Website`

### 2. **Subir Assets**
   - Ir a **Assets** panel en Webflow
   - Subir todas las imágenes de `/images/`
   - Subir videos cuando estén disponibles a `/videos/`

### 3. **Configurar Variables Globales (Custom Code)**
   
   Ir a **Project Settings → Custom Code → Head**:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
   <style>
     :root {
       --color-primary: #0A0A0A;
       --color-secondary: #141414;
       --color-accent-1: #FF3D3D;
       --color-accent-2: #00FF88;
       --color-text-primary: #FFFFFF;
       --color-text-secondary: #A0A0A0;
       --color-text-muted: #666666;
       --color-border: #2A2A2A;
     }
   </style>
   ```

### 4. **Crear Clases en Webflow**

   Las clases principales a crear son:

   | Clase | Uso |
   |-------|-----|
   | `.page-wrapper` | Contenedor principal |
   | `.page-padding` | Padding horizontal responsive |
   | `.nav` | Navegación principal |
   | `.nav_logo` | Logo en navbar |
   | `.nav_menu` | Menú de navegación |
   | `.nav_menu_link-wrap` | Wrapper para links con hover |
   | `.hero` | Sección hero principal |
   | `.hero_bg_video` | Video de fondo |
   | `.headling-large` | Títulos grandes |
   | `.work-card-container` | Cards de proyectos |
   | `.service-list_item` | Items de servicios |
   | `.footer` | Pie de página |

### 5. **Estructura de Navegación (Crear páginas)**

   - **Home** (/)
   - **Services** (/services)
   - **Work** (/work)
   - **About** (/about)
   - **Studio** (/studio)
   - **Contact** (/contact)

---

## 🖼️ Mapeo de Assets a Secciones

### Hero Section
- **Video Background**: Usar reel principal (pendiente de subir)
- **Poster Image**: `ASSET-01.png` o similar

### Intro Section
- **Background**: `Fotos Estudio - 1.png`
- **Shape Follow**: `Fotos Estudio - 9.png`

### Work Section (Proyectos)
- **Proyecto 1**: `ASSET-02.png` + video
- **Proyecto 2**: `ASSET-03.png` + video
- **Proyecto 3**: `ASSET-04.png` + video
- **Proyecto 4**: `ASSET-05.png` + video

### Services Section
- **Production**: `Fotos Estudio - 14.png`, `Fotos Estudio - 16.png`
- **Live Streaming**: `Fotos Estudio - 21.png`, `Fotos Estudio - 22.png`
- **Podcast**: `Fotos Estudio - 27.png`, `Fotos Estudio - 32.png`
- **Creative**: `Fotos Estudio - 33.png`, `Fotos Estudio - 35.png`
- **Studio**: `Fotos Estudio - 5.png`, `ASSET-06.png`

### Testimonial Section
- **Background**: `ASSET-07.png` o `ASSET-08.png`

### Clients Section (NUEVO)
- **Logos**: Subir logos de clientes cuando estén disponibles
- **Placeholder actual**: `client-logo-placeholder.svg`
- **Tagline**: "We bring your ideas to life, on air."

---

## 🎬 Videos Necesarios

Para completar el sitio necesitas los siguientes videos:

1. **REEL-NOTAROBOT.mp4** - Reel principal para hero (10-30 seg)
2. **project-01.mp4** - Video card proyecto 1
3. **project-02.mp4** - Video card proyecto 2
4. **project-03.mp4** - Video card proyecto 3
5. **project-04.mp4** - Video card proyecto 4

**Formato recomendado**: MP4 + WebM, 1080p max, optimizados para web

---

## ✨ Animaciones con Webflow Interactions

### Navbar Scroll
- **Trigger**: Page scrolled
- **At 100px**: Add class `.scrolled` (background blur)

### Hero Fade In
- **Trigger**: Page load
- **Animation**: Opacity 0→1, Y translate 50→0

### Service Item Hover
- **Trigger**: Mouse hover
- **Animation**: Show left/right images with opacity

### Text Link Hover
- **Trigger**: Mouse hover on `.nav_menu_link-wrap`
- **Animation**: Translate Y -100% for text swap effect

### Marquee
- **Usar**: Native Webflow marquee component
- **Speed**: 30s linear infinite

---

## 📱 Breakpoints Responsive

| Breakpoint | Ancho | Cambios |
|------------|-------|---------|
| Desktop | 1440px+ | Grid 12 columnas |
| Tablet | 991px | Grid 6 columnas, ocultar menú |
| Mobile L | 767px | Grid 1 columna |
| Mobile S | 479px | Reducir padding |

---

## 🔧 Custom Code (Footer)

Agregar en **Project Settings → Custom Code → Footer**:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script>
  // Inicializar animaciones adicionales
  gsap.registerPlugin(ScrollTrigger);
  
  // Parallax en testimonial
  gsap.to('.parallax-img', {
    y: -80,
    scrollTrigger: {
      trigger: '.testimonial',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  });
</script>
```

---

## ✅ Checklist Final

- [ ] Todas las imágenes subidas
- [ ] Videos del reel subidos
- [ ] Fuentes configuradas (Space Grotesk + Inter)
- [ ] Colores definidos en variables
- [ ] Navegación funcional
- [ ] Formulario de contacto conectado
- [ ] SEO meta tags configurados
- [ ] Favicon subido
- [ ] Responsive probado en todos los breakpoints
- [ ] Animaciones funcionando
- [ ] Links de redes sociales actualizados
- [ ] Email team@notarobot.es configurado

---

## 📧 Información de Contacto del Sitio

- **Email**: team@notarobot.es
- **Instagram**: @notarobot.es
- **Dirección**: C/ Llacuna, 11, Barcelona, Spain
- **Tagline**: "Communication: By Humans, For Humans"
- **Subtítulo**: "We bring ideas to life"

---

*Documento generado el 3 de febrero de 2026*
*Proyecto: NOT A ROBOT Website*
