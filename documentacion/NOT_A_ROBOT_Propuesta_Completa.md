# 🤖 NOT A ROBOT - Propuesta Web Completa

**Fecha:** 2 de febrero de 2026  
**Preparado por:** Ranuk  
**Cliente:** NOT A ROBOT Agency

---

## 📌 RESUMEN EJECUTIVO

Propuesta para desarrollo de presencia digital de NOT A ROBOT, agencia de producción audiovisual con especialización en live streaming y alquiler de estudio.

**Recomendación:** Continuar con Webflow + estrategia de marca dual para el estudio.

---

## 🏗️ ARQUITECTURA DEL SITIO PRINCIPAL

### Estructura de Navegación

```
NOT A ROBOT (notarobot.agency)
│
├── HOME
│   ├── Hero con video reel principal
│   ├── Tagline: "We bring ideas to life"
│   ├── Preview de servicios principales
│   └── Clientes/logos destacados
│
├── SERVICES
│   ├── 🎬 Producción Audiovisual
│   │   ├── Branded Content
│   │   ├── Documentales
│   │   ├── Videos Corporativos
│   │   └── Music Videos
│   │
│   ├── 📡 Live Production & Streaming (DESTACADO)
│   │   ├── Eventos en vivo
│   │   ├── Transmisiones multicanal
│   │   ├── Webinars corporativos
│   │   └── Shows en vivo
│   │
│   ├── 🎙️ Podcast Production
│   │   ├── Grabación profesional
│   │   ├── Edición y postproducción
│   │   └── Distribución
│   │
│   ├── 🎨 Creative Services
│   │   ├── Dirección creativa
│   │   ├── Estrategia de contenido
│   │   └── Social media content
│   │
│   └── 📍 Studio Rental → (Link a sitio del estudio)
│
├── WORK / PROJECTS
│   ├── Filtros por categoría
│   ├── Case studies destacados
│   └── Showreels por servicio
│
├── ABOUT
│   ├── Historia/Misión
│   ├── Equipo
│   ├── Equipamiento técnico
│   └── Partners/Colaboradores
│
├── STUDIO (Sección especial o subdomain)
│   └── Link al sitio del estudio
│
└── CONTACT
    ├── Formulario de proyecto
    ├── Info de ubicación
    └── Redes sociales
```

---

## 🎙️ ESTRATEGIA PARA EL ESTUDIO

### Opción Recomendada: Marca Separada

**Razones:**
1. Posicionamiento diferente (B2B alquiler vs servicios creativos)
2. SEO independiente para cada vertical
3. Audiencia distinta (productores/podcasters vs marcas)
4. Escalabilidad independiente

### Nombres Sugeridos para el Estudio

| Nombre | Concepto | Disponibilidad |
|--------|----------|----------------|
| **SIGNAL Studio** | Transmisión, señal, broadcasting | signalstudio.co |
| **LIVE HQ** | Headquarters del live streaming | livehq.studio |
| **THE BROADCAST ROOM** | Claro, directo | thebroadcastroom.com |
| **STUDIO ON AIR** | Concepto de "al aire" | studioonair.co |
| **PULSE Studio** | Energía, latido, en vivo | pulsestudio.co |
| **STREAMBOX** | Moderno, técnico | streambox.studio |
| **THE LIVE ROOM** | Simple, memorable | theliveroom.co |
| **BASECAMP Studio** | Centro de operaciones | basecampstudio.co |

### Estructura Sitio del Estudio

```
[NOMBRE ESTUDIO].studio
│
├── HOME
│   ├── Hero visual del espacio
│   ├── CTA: "Reserva tu sesión"
│   └── Características principales
│
├── SPACES / ESPACIOS
│   ├── Sala principal streaming
│   ├── Set podcast
│   ├── Control room
│   └── Green room / Prep area
│
├── EQUIPMENT / EQUIPAMIENTO
│   ├── Cámaras
│   ├── Audio
│   ├── Iluminación
│   ├── Streaming gear
│   └── Extras disponibles
│
├── PRICING / TARIFAS
│   ├── Por hora
│   ├── Media jornada
│   ├── Jornada completa
│   └── Paquetes especiales
│
├── BOOK / RESERVAR
│   ├── Calendario disponibilidad
│   └── Formulario de reserva
│
├── GALLERY
│   └── Fotos y videos del espacio
│
└── FAQ
    └── Preguntas frecuentes
```

---

## 🎨 DIRECCIÓN VISUAL RECOMENDADA

### Paleta de Colores (Basada en referencias)

```css
/* Colores Principales */
--primary-dark: #0A0A0A;      /* Negro profundo - elegancia */
--primary-accent: #FF4D4D;    /* Rojo vibrante - energía live */
--secondary-accent: #00FF88;  /* Verde neón - tech/streaming */
--neutral-light: #F5F5F5;     /* Blanco roto */
--neutral-mid: #888888;       /* Gris medio */

/* Alternativa más corporate */
--alt-primary: #1A1A2E;       /* Azul oscuro */
--alt-accent: #E94560;        /* Coral/Rojo */
```

### Tipografía Sugerida

| Uso | Fuente | Estilo |
|-----|--------|--------|
| Headlines | **Space Grotesk** o **Clash Display** | Bold, impactante |
| Body | **Inter** o **Satoshi** | Clean, legible |
| Accents | **JetBrains Mono** | Tech feel (opcional) |

### Estilo Visual

- **Fotos/Videos:** Alta calidad, detrás de cámaras, equipo en acción
- **Animaciones:** Sutiles, transiciones suaves (scroll-triggered)
- **Iconografía:** Line icons minimalistas
- **Layout:** Asimétrico, uso de espacio negativo
- **Hover effects:** Revelado de contenido, cambios de color

---

## 📄 CONTENIDO NECESARIO (Checklist para el cliente)

### Textos
- [ ] Descripción de la agencia (quiénes son, qué hacen)
- [ ] Descripción de cada servicio (3-4 párrafos c/u)
- [ ] Biografías del equipo
- [ ] Testimonios de clientes
- [ ] FAQs del estudio

### Visuales
- [ ] Logo en formatos (SVG, PNG transparente)
- [ ] Video reel principal (30-60 seg)
- [ ] Showreels por categoría
- [ ] Fotos del equipo
- [ ] Fotos del estudio (mínimo 15-20)
- [ ] Screenshots/clips de proyectos
- [ ] Logos de clientes (con permiso)

### Información
- [ ] Lista de servicios con precios (si aplica)
- [ ] Tarifas del estudio
- [ ] Horarios de disponibilidad
- [ ] Ubicación exacta
- [ ] Redes sociales activas

---

## 💰 ESTIMACIÓN DE COSTOS

### Opción A: Solo Webflow (Recomendada)

| Item | Costo Estimado |
|------|----------------|
| Diseño + Desarrollo sitio principal | $800 - $1,500 USD |
| Diseño + Desarrollo sitio estudio | $500 - $900 USD |
| Hosting Webflow (anual x2 sitios) | $300 - $500 USD/año |
| **Total inicial** | **$1,600 - $2,900 USD** |

### Opción B: Código Custom (Next.js)

| Item | Costo Estimado |
|------|----------------|
| Diseño UI/UX | $600 - $1,000 USD |
| Desarrollo frontend | $1,500 - $3,000 USD |
| CMS setup (Sanity/Strapi) | $300 - $500 USD |
| Hosting (Vercel - anual) | $0 - $240 USD/año |
| **Total inicial** | **$2,400 - $4,740 USD** |

---

## 📅 TIMELINE ESTIMADO

### Fase 1: Discovery & Diseño (2 semanas)
- Definir branding del estudio
- Wireframes
- Diseño visual

### Fase 2: Desarrollo Sitio Principal (2-3 semanas)
- Setup Webflow
- Desarrollo de páginas
- Integración de contenido

### Fase 3: Desarrollo Sitio Estudio (1-2 semanas)
- Setup segundo proyecto
- Sistema de reservas
- Contenido

### Fase 4: Testing & Launch (1 semana)
- QA en dispositivos
- Optimización SEO
- Lanzamiento

**Total estimado: 6-8 semanas**

---

## ✅ PRÓXIMOS PASOS

1. **Reunión de kick-off** - Validar propuesta y resolver dudas
2. **Definir nombre del estudio** - Decisión de marca
3. **Recopilar assets** - Según checklist
4. **Aprobar dirección visual** - Moodboard/referencias finales
5. **Iniciar desarrollo** - Comenzar con wireframes

---

## 📎 REFERENCIAS ANALIZADAS

| Referencia | Qué tomar |
|------------|-----------|
| [vitapictura.co](https://vitapictura.co) | Estética showreels, navegación por categorías, hero videos |
| [weup.la](https://www.weup.la/services.html) | Estructura de servicios numerados, estilo agency creativa |
| [platoh.cat](https://platoh.cat) | Modelo de sitio de estudio, secciones, booking, pricing |

---

## 📞 CONTACTO

**Ranuk**  
[Tu email]  
[Tu teléfono]

---

*Documento preparado exclusivamente para NOT A ROBOT Agency*
