# Informe de Desarrollo, Auditoría SEO y Verificación Local — NOT A ROBOT Studios

> [!IMPORTANT]
> **Servidor Local Activo para tus Pruebas (Rama `feat/studios-landing-ads-dashboard`):**
> Todo el desarrollo se encuentra corriendo localmente en el puerto `8090` sin tocar aún la rama `main` de producción. Puedes abrir y probar cada módulo directamente en tu navegador:
> - **Landing Integrada de Alquiler de Estudios (Calcada + Diseño NOT A ROBOT):** http://localhost:8090/pages/alquiler-estudios.html
> - **Command Center 24/7 (Dashboard de Tráfico, Google Ads y Leads — Clave `NAR2026`):** http://localhost:8090/pages/dashboard.html?key=NAR2026
> - **Página Nuestros Estudios (con botones actualizados hacia Alquiler Estudios):** http://localhost:8090/pages/estudio.html
> - **Home Principal Unificada:** http://localhost:8090/index.html

---

## 1. Evidencia Visual Renderizada (Verificación Local en Chrome)

````carousel
![Hero Video, Banner SVG ALQUILER DE ESTUDIOS y Sub-Navegación Sticky](/Users/emilioranucoli/.gemini/antigravity/brain/22cc9889-e3dd-40a2-be8a-8a09d22ee945/preview_alquiler_hero.png)
<!-- slide -->
![Galería de 12 Fotos de Estudio A (92 m²) con Lightbox y Tabla Interactiva de Tarifas](/Users/emilioranucoli/.gemini/antigravity/brain/22cc9889-e3dd-40a2-be8a-8a09d22ee945/preview_estudio_a_gallery_table.png)
<!-- slide -->
![Rider Técnico Interactivo (42 Equipos en 4 Categorías) con Carrito de Cotización](/Users/emilioranucoli/.gemini/antigravity/brain/22cc9889-e3dd-40a2-be8a-8a09d22ee945/preview_rider_and_form.png)
<!-- slide -->
![Formulario Unificado Netlify Forms, Mapa de Poblenou y Bloque Editorial SEO + FAQs](/Users/emilioranucoli/.gemini/antigravity/brain/22cc9889-e3dd-40a2-be8a-8a09d22ee945/preview_booking_map_seo.png)
<!-- slide -->
![NOT A ROBOT Command Center 24/7 — Telemetría en Vivo, Embudo Google Ads y Bandeja de Leads](/Users/emilioranucoli/.gemini/antigravity/brain/22cc9889-e3dd-40a2-be8a-8a09d22ee945/preview_dashboard.png)
````

---

## 2. Evidencias Numéricas y Auditoría Técnica Comprobada

| Métrica / Componente Auditado | Estado Anterior (`notarobotstudios.es` + `notarobot.es`) | Estado Actual (`feat/studios-landing-ads-dashboard`) | Variación / Evidencia Comprobada |
| :--- | :--- | :--- | :--- |
| **Peso Multimedia de Estudios (29 imágenes)** | `46.38 MB` (`48,630,449 bytes` sin comprimir) | **`11.58 MB`** (`12,141,934 bytes` optimizados a 1080p HD) | **-75.0% de reducción de peso** (`34.80 MB` ahorrados) |
| **Integridad de Recursos Locales (9 páginas)** | Tráfico dividido en 2 dominios | **285 recursos locales verificados (`HTTP 200 OK`)** | **0 errores / 0 enlaces rotos (`404`)** |
| **Tiempo de Respuesta HTML Local (`TTFB`)** | SPA externa renderizada en cliente (CSR) | **HTML semántico SSR/Estático (`0.5 ms – 1.3 ms`)** | **100% indexable por Googlebot en la primera lectura** |
| **Google Ads (`AW-18483251414`) & CSP** | Bloqueado por `Content-Security-Policy` en `_headers` | **Desbloqueado y activo junto a `GTM-KWW2HKVV`** | Dominios `googleadservices.com`, `doubleclick.net` y `maps.google.com` autorizados |
| **Conversiones Medidas en Tiempo Real** | Sin trazabilidad unificada entre dominios | **4 Eventos de Conversión + Atribución `GCLID`/`UTM`** | Envío Formulario, Clic WhatsApp (`wa.me`), Llamada (`tel:`) y Email (`mailto:`) |
| **Datos Estructurados Schema.org (`JSON-LD`)** | Básico (solo `ProductionCompany`) | **Grafo completo de 4 Entidades + 4 Ofertas de Producto** | `LocalBusiness` + `Service` + `AggregateOffer` (50€–1260€) + `FAQPage` (6 Q&A) + `BreadcrumbList` |
| **Fuga de Tráfico Interno** | 11 enlaces salientes hacia `notarobotstudios.es` | **11 enlaces migrados a `/pages/alquiler-estudios.html`** | **0 fugas de autoridad SEO o sesiones de campaña** |

---

## 3. Desglose de lo Construido Paso a Paso

### Fase 1 — Extracción Total y Optimización Multimedia desde Lovable
- Se extrajeron los **29 recursos gráficos** (22 fotografías de Estudio A y Estudio B en alta definición + iconos oficiales) y el vídeo hero (`estudio.mp4`) desde `notarobotstudios.es` hacia [website/images/studios/](file:///Users/emilioranucoli/Apps/NotARobot_Web/website/images/studios/) y [website/videos/estudio.mp4](file:///Users/emilioranucoli/Apps/NotARobot_Web/website/videos/estudio.mp4).
- Se creó el nuevo banner vectorial [alquiler-estudios.svg](file:///Users/emilioranucoli/Apps/NotARobot_Web/website/images/banners/alquiler-estudios.svg) con la textura grunge original y la tipografía corporativa `Aileron` de `notarobot.es`.

### Fase 2 — Réplica 100% Calcada de la Landing de Estudios dentro de `notarobot.es`
Archivos creados:
- [alquiler-estudios.html](file:///Users/emilioranucoli/Apps/NotARobot_Web/website/pages/alquiler-estudios.html)
- [alquiler-estudios.css](file:///Users/emilioranucoli/Apps/NotARobot_Web/website/css/alquiler-estudios.css)
- [alquiler-estudios.js](file:///Users/emilioranucoli/Apps/NotARobot_Web/website/js/alquiler-estudios.js)

Incluye todas las vistas y funcionalidades de la landing original integradas en una sola experiencia:
1. **Sub-barra de navegación sticky** (`Visión General`, `Estudio A 92 m²`, `Estudio B 14 m²`, `Rider Técnico 42`, `Ubicación Poblenou`, selector de idioma `ES | EN` y CTA `Haz tu reserva`).
2. **Hero con Vídeo en Bucle (`estudio.mp4`)**, H1 optimizado para SEO local en Barcelona y accesos directos a tarifas y reserva.
3. **Comparativa de Estudios (`Estudio A · 92 m²` y `Estudio B · 14 m²`)**, **Servicios a medida** (Producción integral, Escenografía, Edición express <24h, Tarifas recurrentes) y **Equipo Audiovisual Profesional** (Cámaras Sony, Sonido Shure/Rodecaster, Iluminación LED, Realización Blackmagic ATEM).
4. **Vista Detallada Estudio A (92 m²)**: Galería de **12 fotografías** con visor **Lightbox a pantalla completa**, tabla interactiva de **Tarifas del Estudio A** (`70 €` a `1.260 €` — al hacer clic en cualquier precio se preselecciona automáticamente en el formulario de reserva) y 4 tarjetas de especificaciones técnicas y sets.
5. **Vista Detallada Estudio B (14 m²)**: Galería de **10 fotografías** con visor **Lightbox**, tabla interactiva de **Tarifas del Estudio B** (`50 €` a `900 €`) y 4 tarjetas de especificaciones.
6. **Rider Técnico Interactivo (42 equipos reales)**: Filtro por categorías (*Cámaras y ópticas*: 15, *Sonido y microfonía*: 17, *Realización*: 5, *Soportes y grip*: 5), selector de cantidades `+` / `−` respetando el stock real de cada equipo y carrito lateral (`Tu selección`) que transfiere la lista de equipos directamente al formulario de presupuesto.
7. **Formulario Unificado de Reserva y Presupuesto (`data-netlify="true" name="reserva-estudios"`)**: Con todos los campos pedidos por Meli (Nombre, Email, Teléfono, Fecha tentativa, Estudio, Tipo de uso, Modalidad/Pack, Equipos del Rider y Mensaje) + confirmación instantánea con enlace directo a WhatsApp pre-rellenado.

### Fase 3 — Unificación de Google Ads (`AW-18483251414`), GTM (`GTM-KWW2HKVV`), GA4 y Desbloqueo de CSP
- Se creó el motor [tracking-ads.js](file:///Users/emilioranucoli/Apps/NotARobot_Web/website/js/tracking-ads.js) conectado en las 9 páginas del sitio.
- Se actualizaron [website/_headers](file:///Users/emilioranucoli/Apps/NotARobot_Web/website/_headers) y las etiquetas `<meta http-equiv="Content-Security-Policy">` de todas las páginas eliminando la directiva `frame-src` duplicada y habilitando `googleadservices.com`, `googleads.g.doubleclick.net`, `pagead2.googlesyndication.com`, `stats.g.doubleclick.net` y `maps.google.com`.

### Fase 4 — NOT A ROBOT Command Center 24/7 (`/pages/dashboard.html`)
Archivos creados:
- [dashboard.html](file:///Users/emilioranucoli/Apps/NotARobot_Web/website/pages/dashboard.html)
- [dashboard.css](file:///Users/emilioranucoli/Apps/NotARobot_Web/website/css/dashboard.css)
- [dashboard.js](file:///Users/emilioranucoli/Apps/NotARobot_Web/website/js/dashboard.js)

Características:
- Acceso protegido con clave (`NAR2026`) y etiqueta `noindex, nofollow`.
- **6 KPIs en vivo**: Sesiones unificadas, Conversiones totales (`CR %`), Formularios enviados, Clics en WhatsApp, Llamadas/Emails y distribución de demanda `Estudio A vs Estudio B`.
- **Auditoría Técnica en Vivo**: Verifica automáticamente en tiempo real el estado de `AW-18483251414`, `GTM-KWW2HKVV`, CSP, Schema.org JSON-LD y formulario Netlify.
- **Bandeja de Leads en Tiempo Real + Simulador 1-Click + Exportación CSV**: Cualquier prueba que hagas en el formulario de `alquiler-estudios.html` o clic en WhatsApp aparece al instante en el Command Center.
- **Alertas por Telegram y Labels de Google Ads**: Panel de configuración integrado para recibir cada lead al instante en el móvil.

### Fase 5 — SEO Local Nivel Máximo, Enlaces Internos y Redirecciones 301
- En [estudio.html](file:///Users/emilioranucoli/Apps/NotARobot_Web/website/pages/estudio.html) el botón *"Conocé nuestros estudios y tarifas →"* lleva a `alquiler-estudios.html` y *"Reservar estudio"* lleva a `alquiler-estudios.html#reservar` (tal como pidió Meli).
- Se actualizaron [sitemap.xml](file:///Users/emilioranucoli/Apps/NotARobot_Web/website/sitemap.xml), [robots.txt](file:///Users/emilioranucoli/Apps/NotARobot_Web/website/robots.txt) y [_redirects](file:///Users/emilioranucoli/Apps/NotARobot_Web/website/_redirects) con las reglas de redirección `301` desde `notarobotstudios.es/*` y rutas limpias (`/alquiler-estudios`, `/estudio-a`, `/estudio-b`, `/alquiler-material`, `/dashboard`).
