<div align="center">

# NOT A ROBOT — Sitio Web Oficial

![NOT A ROBOT](website/images/NOTAROBOT-WHITE.png)

### *By humans, for humans.*

[![Website](https://img.shields.io/badge/Web-notarobot.es-C85A1E?style=flat-square)](https://notarobot.es)
[![Instagram](https://img.shields.io/badge/Instagram-@notarobot.es-E4405F?style=flat-square&logo=instagram&logoColor=white)](https://instagram.com/notarobot.es)

---

**Streaming · Producción Audiovisual · Podcast · Estudios de Grabación**

</div>

---

## Sobre el proyecto

Sitio web oficial de **NOT A ROBOT**, productora audiovisual en **Poble Nou, Barcelona**, especializada en streaming profesional, producción audiovisual, podcasts y alquiler de estudios de grabación.

Web estática multi-página, desarrollada con HTML5 + CSS3 + JavaScript vanilla, sin dependencias de frameworks ni CMS. Deploy en Netlify con HTTPS automático.

---

## Stack

| | |
|---|---|
| **Frontend** | HTML5, CSS3, JavaScript ES6+ |
| **Tipografía** | Aileron (Public Domain) |
| **Hosting** | Netlify |
| **Dominio** | GoDaddy → notarobot.es |
| **Versionado** | Git + GitHub |

---

## Estructura

```
WebFlow_NotaRobot/
├── website/                    # Directorio de deploy
│   ├── index.html              # Homepage con vídeo reel de fondo
│   ├── coming-soon.html        # Página temporal (rama main)
│   ├── pages/
│   │   ├── streaming.html
│   │   ├── produccion.html
│   │   ├── podcast.html
│   │   ├── estudio.html
│   │   ├── nosotros.html
│   │   ├── contacto.html
│   │   └── projects/           # 15 páginas de detalle de proyecto
│   ├── css/
│   │   ├── fonts.css           # @font-face Aileron
│   │   ├── home.css            # Estilos del homepage
│   │   └── pages.css           # Estilos compartidos
│   ├── js/
│   │   └── pages.js            # Nav mobile, scroll reveal, carruseles, lightbox
│   ├── images/                 # Solo imágenes en uso
│   │   ├── instalaciones/      # Fotos del estudio (galería)
│   │   ├── projects/           # Thumbnails de proyectos
│   │   └── team/               # Fotos del equipo
│   ├── videos/                 # Vídeos de preview
│   ├── _headers                # Security headers para Netlify
│   └── fonts/
├── recursos_web/               # Assets fuente (no se despliegan)
├── netlify.toml                # Configuración de build y cache
├── .gitignore
└── README.md
```

---

## Características

- **22 páginas** — Homepage, 6 secciones y 15 páginas de proyecto
- **Banners SVG inline** — Héroes con gradientes, infinitamente nítidos a cualquier resolución
- **Carruseles infinitos** — Equipo e instalaciones con scroll automático y pausa en hover
- **Lightbox** — Visor de imágenes fullscreen con navegación por teclado y touch
- **Textura de fondo sutil** — Distinta por sección usando `mix-blend-mode: screen`
- **Scroll reveal** — Animaciones de entrada con `IntersectionObserver` y stagger por columna
- **Diseño responsive** — Mobile-first, breakpoints a 1024px, 768px y 480px
- **Seguridad** — CSP, anti-clickjacking, HSTS, protección de emails en el DOM
- **Sin dependencias** — 0 librerías externas

---

## Despliegue

| Rama | Entorno | Contenido |
|------|---------|-----------|
| `main` | [notarobot.es](https://notarobot.es) | Coming soon (producción activa) |
| `preview` | Deploy preview de Netlify | Sitio completo |

**Publish directory:** `website`

### Archivos excluidos por tamaño (>100MB)

Los vídeos de preview de algunos proyectos superan el límite de GitHub/Netlify y no están en el repositorio. Se alojan o alojarán como embeds de YouTube (unlisted).

---

## Proyectos incluidos

BCN3D · Bizarrap x Paren la Mano · Ibai x Paren la Mano · Salta la Banca · AFA Estudio · NDN Mallorca · Aurora Corpo · Aurora Day · Favaloro · SBC Barcelona · FIFA World Cup · Destierra · Club Corchea · Juana Barba · NOTA Medio

---

## Agradecimientos

Este proyecto fue desarrollado por **Ranuk Studio** para **NOT A ROBOT**.

Quiero agradecer de verdad a todo el equipo de NOT A ROBOT por la confianza y la buena onda durante todo el proceso. Desde la primera reunión quedó claro que estaban haciendo algo con identidad propia y mucha personalidad, y eso hizo que trabajar en el sitio fuera genuinamente disfrutable.

Gracias por compartir referencias, darle vida al contenido y estar siempre disponibles para resolver dudas. El resultado es un reflejo directo de lo que son: un equipo de profesionales apasionados, creativos y con una visión muy clara de lo que quieren contar.

Ojalá el sitio les sirva mucho y les traiga muchos proyectos buenos. ¡Mucho éxito en todo lo que viene!

— *Emilio, Ranuk Studio*

---

<div align="center">

*© 2026 NOT A ROBOT — Todos los derechos reservados*

</div>
