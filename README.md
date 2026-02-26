<div align="center">

# 🎬 NOT A ROBOT — Estudio Audiovisual

<img src="website/images/logos/nar-logo-completo-blanco.svg" alt="NOT A ROBOT Logo" width="400"/>

### *By humans, for humans.*

[![Website](https://img.shields.io/badge/Web-notarobot.es-FF4D4D?style=flat-square)](https://notarobot.es)
[![Instagram](https://img.shields.io/badge/Instagram-@notarobot.es-E4405F?style=flat-square&logo=instagram&logoColor=white)](https://instagram.com/notarobot.es)

---

**Streaming · Producción Audiovisual · Podcast · Estudio de Grabación**

</div>

---

## 🚀 Sobre el Proyecto

Sitio web oficial de **NOT A ROBOT**, estudio audiovisual en **Poble Nou, Barcelona**, especializado en streaming profesional, producción audiovisual, podcasts y alquiler de estudios de grabación.

Web estática multi-página, desarrollada con enfoque **mobile-first** y sin dependencias de frameworks ni CMS. Desplegada con CI/CD en Netlify.

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnología |
|-----------|------------|
| **Frontend** | HTML5, CSS3 (Custom Properties), JavaScript ES6+ |
| **Tipografía** | Aileron (Public Domain) |
| **Hosting** | Netlify (CDN Global + HTTPS automático) |
| **Dominio** | GoDaddy → notarobot.es |
| **Multimedia** | Git LFS para vídeos, YouTube embeds para contenido extenso |
| **Versionado** | Git + GitHub (ramas `main` y `preview`) |

---

## 📁 Estructura del Proyecto

```
NotARobot_Web/
├── website/                        # Sitio web (deploy directory)
│   ├── index.html                  # Homepage — hero con vídeo reel
│   ├── coming-soon.html            # Página temporal (rama main)
│   ├── pages/                      # Secciones principales
│   │   ├── streaming.html          # 6 proyectos de streaming
│   │   ├── produccion.html         # 5 proyectos de producción
│   │   ├── podcast.html            # 4 podcasts
│   │   ├── estudio.html            # Studio A (92m²) + Studio B (14m²)
│   │   ├── nosotros.html           # Equipo + carrusel
│   │   ├── contacto.html           # Datos + WhatsApp directo
│   │   └── projects/               # 15 páginas de detalle de proyecto
│   │       ├── bcn3d.html
│   │       ├── bizarrap-paren-la-mano.html
│   │       ├── ibai-paren-la-mano.html
│   │       ├── salta-la-banca.html
│   │       ├── afa-estudio.html
│   │       ├── ndn-mallorca.html
│   │       ├── aurora-corpo.html
│   │       ├── aurora-day.html
│   │       ├── favaloro.html
│   │       ├── sbc-barcelona.html
│   │       ├── fifa-worldcup.html
│   │       ├── destierra.html
│   │       ├── club-corchea.html
│   │       ├── juana-barba.html
│   │       └── nota-medio.html
│   ├── css/
│   │   ├── fonts.css               # @font-face Aileron
│   │   ├── home.css                # Estilos del homepage
│   │   └── pages.css               # Estilos compartidos (~1400 líneas)
│   ├── js/
│   │   └── pages.js                # Navegación, scroll, carruseles, lightbox
│   ├── images/
│   │   ├── banners/                # 9 banners PNG (héroes + secundarios)
│   │   ├── team/                   # 6 fotos del equipo
│   │   ├── instalaciones/          # 13 fotos del estudio
│   │   └── projects/               # Imágenes de proyectos
│   └── videos/                     # Vídeos de preview y portadas
├── recursos_web/                   # Assets fuente (no se despliegan)
│   ├── BANNERS TÍTULOS/            # PNGs originales de banners
│   ├── FOTOS EQUIPO/               # Fotos originales del equipo
│   ├── NUESTROS ESTUDIOS/          # Fotos originales de estudios
│   ├── PROYECTOS/                  # Vídeos fuente de proyectos
│   └── STREAMING/                  # Vídeos fuente de streaming
├── documentacion/                  # Documentación interna
└── README.md
```

---

## ✨ Características

- **22 páginas** — Homepage + 6 secciones + 15 páginas de detalle de proyecto
- **Banners PNG personalizados** — Héroes visuales con gradientes integrados en la imagen
- **Carruseles infinitos** — Equipo (8 miembros) e instalaciones (13 fotos) con scroll automático
- **Lightbox** — Visor fullscreen para galería de instalaciones con navegación por teclado
- **Tarjetas de proyecto clickeables** — Con vídeo autoplay como preview
- **Diseño responsive** — Breakpoints a 1024px, 768px y 480px
- **Seguridad** — CSP headers, anti-clickjacking, protección anti-scraping de emails
- **WhatsApp directo** — Botón flotante y enlace de contacto vía wa.me
- **Sin dependencias** — 0 librerías externas, carga ultrarrápida

---

## 🌐 Despliegue

| Rama | Entorno | Contenido |
|------|---------|-----------|
| `main` | [notarobot.es](https://notarobot.es) | Página "coming soon" (producción) |
| `preview` | Deploy preview en Netlify | Sitio web completo |

**Base directory:** `website` · **Publish directory:** `.`

### Archivos excluidos (>100MB, no compatibles con GitHub/Netlify)

| Archivo | Tamaño |
|---------|--------|
| `corchea-preview.mp4` | 2,238 MB |
| `nota-preview.mp4` | 399.6 MB |
| `destierra-preview.mp4` | 309 MB |
| `Aurora Live.mp4` | 158.9 MB |

Estos vídeos se alojarán como embeds de YouTube (unlisted) cuando estén disponibles.

---

## 👥 Equipo NOT A ROBOT

Un grupo de profesionales audiovisuales en Barcelona que combinan creatividad, tecnología y una filosofía de trabajo centrada en la calidad y la innovación.

---

## 📄 Licencia

Este proyecto es propiedad de **NOT A ROBOT Estudio Audiovisual**.  
Código desarrollado exclusivamente para uso del cliente.

---

<div align="center">

**Hecho con 🖤 en Barcelona**

*© 2026 NOT A ROBOT — Todos los derechos reservados*

</div>
