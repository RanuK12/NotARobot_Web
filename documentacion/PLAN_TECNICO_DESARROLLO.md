# PLAN TÉCNICO DE DESARROLLO — NOT A ROBOT STUDIOS
**Ranuk IT Solutions — Documentación de Ingeniería Interna**  
**Proyecto:** Integración de Landing Alquiler de Estudios, Tracking Google Ads, SEO Local & Command Center  
**Repositorio Base:** `https://github.com/RanuK12/NotARobot_Web`  
**Entorno de Producción:** Netlify Edge + DNS / Cloudflare

---

## 1. ARQUITECTURA DE ARCHIVOS & MODIFICACIONES

```text
NotARobot_Web/
├── index.html                           <- Actualizar botón "Reservar Estudio"
├── pages/
│   ├── estudio.html                     <- Actualizar enlaces hacia /alquiler-estudios
│   ├── alquiler-estudios.html           <- [NUEVO] Landing de conversión centralizada
│   └── ...
├── css/
│   ├── studios-landing.css              <- [NUEVO] Estilos específicos de la landing
│   ├── pages.css                        <- Ajustes de componentes compartidos
│   └── fonts.css
├── js/
│   ├── tracking-ads.js                  <- [NUEVO] Listener de conversiones Google Ads + GA4
│   └── studios-interactions.js          <- [NUEVO] Tabs de equipamiento, galería modal y form handler
├── images/
│   ├── banners/alquiler-estudios.svg    <- [NUEVO] Banner vectorial con tipografía Aileron
│   └── studios/                         <- Imágenes optimizadas en WebP (Studio A & B)
├── netlify.toml                         <- Reglas de redirect 301, headers y CSP
├── _headers                             <- Cabeceras HTTP con CSP desbloqueada para Google Ads
├── _redirects                           <- Reglas de fallback y redirección de URLs
├── sitemap.xml                          <- Inclusión de /alquiler-estudios con prioridad 0.9
└── netlify/functions/                   <- [SI SE ACTIVA DASHBOARD / ALERTAS]
    ├── lead-alert.js                    <- Webhook serverless que notifica a Telegram en tiempo real
    └── get-stats.js                     <- Endpoint para alimentar el dashboard de métricas
```

---

## 2. RESOLUCIÓN QUIRÚRGICA DE LA CONTENT SECURITY POLICY (CSP)

### El Problema
Actualmente, `notarobot.es` tiene configurada la siguiente cabecera CSP:
```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; ... connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://region1.google-analytics.com;
```
Google Ads necesita descargar scripts de `www.googleadservices.com` y `googleads.g.doubleclick.net`, y enviar pings de conversión hacia `google.com` y `googleads.g.doubleclick.net`. Como estos dominios no están en la lista blanca de la CSP, el navegador arroja errores de tipo `Refused to connect / Refused to load script` y **las conversiones de Ads nunca llegan al panel de Google**.

### La Solución Definitiva (en `_headers` y `<meta>` tag):
```http
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: https://www.google.com https://www.googleadservices.com https://googleads.g.doubleclick.net; media-src 'self' https://www.youtube.com https://youtube.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://region1.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://stats.g.doubleclick.net https://www.google.com; frame-src 'self' https://www.youtube.com https://www.googletagmanager.com https://www.google.com https://bid.g.doubleclick.net; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://wa.me; object-src 'none';
```

---

## 3. IMPLEMENTACIÓN DE TRACKING & EVENTOS DE GOOGLE ADS (`tracking-ads.js`)

Se inyecta el script global de Google Tag (`AW-18483251414`) y se orquestan los disparos con deduplicación y manejo de fallos de red.

```javascript
// js/tracking-ads.js
(function () {
  const GOOGLE_ADS_ID = 'AW-18483251414';

  // Helper para disparar conversiones a Google Ads y GA4
  window.reportConversion = function (conversionLabel, eventData = {}) {
    if (typeof gtag === 'function') {
      // Evento para Google Ads
      gtag('event', 'conversion', {
        'send_to': `${GOOGLE_ADS_ID}/${conversionLabel}`,
        ...eventData
      });

      // Evento enriquecido para Google Analytics 4
      gtag('event', eventData.action_name || 'custom_conversion', {
        'event_category': 'Leads & Studios',
        'event_label': eventData.target || '',
        'value': eventData.estimated_value || 1.0
      });

      console.log(`[Ranuk Tracking] Disparada conversión: ${conversionLabel}`);
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    // 1. Clics en botones y enlaces de WhatsApp
    document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]').forEach(function (el) {
      el.addEventListener('click', function () {
        reportConversion('WHATSAPP_CONV_LABEL_HERE', {
          action_name: 'lead_whatsapp_click',
          target: el.getAttribute('href')
        });
      });
    });

    // 2. Clics en llamadas telefónicas
    document.querySelectorAll('a[href^="tel:"]').forEach(function (el) {
      el.addEventListener('click', function () {
        reportConversion('PHONE_CONV_LABEL_HERE', {
          action_name: 'lead_phone_click',
          target: el.getAttribute('href')
        });
      });
    });

    // 3. Clics en enlaces de email
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (el) {
      el.addEventListener('click', function () {
        reportConversion('EMAIL_CONV_LABEL_HERE', {
          action_name: 'lead_email_click',
          target: el.getAttribute('href')
        });
      });
    });

    // 4. Envío exitoso de formulario de reserva
    const studioForm = document.getElementById('studio-booking-form');
    if (studioForm) {
      studioForm.addEventListener('submit', function (e) {
        // En Netlify Forms el evento submit normal dispara el evento
        reportConversion('FORM_CONV_LABEL_HERE', {
          action_name: 'lead_form_submitted',
          studio: studioForm.querySelector('[name="studio"]')?.value || 'Not specified'
        });
      });
    }
  });
})();
```

---

## 4. FORMULARIO NATIVO NETLIFY FORMS (`alquiler-estudios.html`)

Para evitar costes de backends y dependencias externas que ralenticen la carga:

```html
<form name="reserva-estudios" method="POST" data-netlify="true" netlify-honeypot="bot-field" id="studio-booking-form" class="studio-form-grid">
  <!-- Anti-Spam Honeypot -->
  <p class="hidden" style="display:none;">
    <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
  </p>
  <input type="hidden" name="form-name" value="reserva-estudios" />

  <div class="form-group">
    <label for="name">Nombre y Apellido *</label>
    <input type="text" id="name" name="name" required placeholder="Tu nombre" class="form-input">
  </div>

  <div class="form-group">
    <label for="email">Email de contacto *</label>
    <input type="email" id="email" name="email" required placeholder="ejemplo@productora.com" class="form-input">
  </div>

  <div class="form-group">
    <label for="phone">Teléfono / WhatsApp *</label>
    <input type="tel" id="phone" name="phone" required placeholder="+34 600 000 000" class="form-input">
  </div>

  <div class="form-group">
    <label for="studio">Estudio de Interés *</label>
    <select id="studio" name="studio" required class="form-select">
      <option value="" disabled selected>Selecciona un estudio</option>
      <option value="Studio A (92 m²)">Studio A — 92 m² (Multicámara, Rodajes, Stream)</option>
      <option value="Studio B (14 m²)">Studio B — 14 m² (Podcast, Streaming íntimo)</option>
      <option value="Ambos Estudios">Ambos Estudios / Jornada Completa</option>
    </select>
  </div>

  <div class="form-group">
    <label for="production_type">Tipo de Producción</label>
    <select id="production_type" name="production_type" class="form-select">
      <option value="Podcast">Podcast</option>
      <option value="Streaming / Live">Streaming en Directo</option>
      <option value="Rodaje / Spot">Rodaje Publicitario / Spot</option>
      <option value="Sesión de Fotos">Sesión Fotográfica</option>
      <option value="Otro">Otro proyecto</option>
    </select>
  </div>

  <div class="form-group">
    <label for="date">Fecha Tentativa</label>
    <input type="date" id="date" name="tentative_date" class="form-input">
  </div>

  <div class="form-group full-width">
    <label for="message">Detalles del proyecto o requerimientos técnicos</label>
    <textarea id="message" name="message" rows="4" placeholder="¿Necesitás operadores de cámara, sonido, iluminación especial o edición?" class="form-textarea"></textarea>
  </div>

  <div class="form-actions full-width">
    <button type="submit" class="btn-submit-booking">
      <span>Solicitar Reserva & Presupuesto</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </button>
  </div>
</form>
```

---

## 5. SEO LOCAL AVANZADO & MICRODATOS SCHEMA.ORG (JSON-LD)

Se integrará en el `<head>` de `/pages/alquiler-estudios.html`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://notarobot.es/#studios",
      "name": "NOT A ROBOT Studios | Alquiler de Estudios en Barcelona",
      "alternateName": "Not A Robot Estudios de Grabación Poblenou",
      "url": "https://notarobot.es/alquiler-estudios",
      "telephone": "+34674562776",
      "email": "team@notarobot.es",
      "priceRange": "€€",
      "image": [
        "https://notarobot.es/images/Studio_A_1.png",
        "https://notarobot.es/images/Studio_B-1.jpg"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Carrer de Llacuna, 11, Piso 5",
        "addressLocality": "Barcelona",
        "postalCode": "08005",
        "addressRegion": "Cataluña",
        "addressCountry": "ES"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 41.3985,
        "longitude": 2.1994
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "20:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "10:00",
          "closes": "18:00"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Alquiler de Espacios Audiovisuales",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Alquiler Studio A (92 m²)",
              "description": "Estudio de gran formato con ventana de 5m con vistas a Barcelona, multicámara Sony FX6/FX3, microfonía broadcast e iluminación Nanlite/Aputure."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Alquiler Studio B (14 m²)",
              "description": "Estudio acústico íntimo optimizado para podcasts, streaming y entrevistas con Rodecaster Pro y micrófonos Shure SM7B."
            }
          }
        ]
      }
    }
  ]
}
</script>
```

---

## 6. CONFIGURACIÓN DE REDIRECCIÓN 301 DESDE `notarobotstudios.es`

Para no perder el link equity ni los clics de campañas activas, se configurará la redirección en el proveedor de DNS / Cloudflare o servidor del dominio antiguo:

```apache
# Regla 301 Nginx / Apache / Cloudflare Page Rule:
# De: https://notarobotstudios.es/*
# A:  https://notarobot.es/alquiler-estudios (o paths equivalentes)

RewriteEngine On
RewriteCond %{HTTP_HOST} ^(www\.)?notarobotstudios\.es$ [NC]
RewriteRule ^(.*)$ https://notarobot.es/alquiler-estudios [R=301,L]
```

En `netlify.toml` del repositorio principal, se añade el rewrite limpio para URLs amigables:
```toml
[[redirects]]
  from = "/alquiler-estudios"
  to = "/pages/alquiler-estudios.html"
  status = 200

[[redirects]]
  from = "/studios"
  to = "/pages/alquiler-estudios.html"
  status = 301
```

---

## 7. ARQUITECTURA TÉCNICA DEL COMMAND CENTER (PLAN PRO)

Si Not A Robot opta por el módulo Pro, implementaremos una solución liviana, elegante y con cero coste recurrente de servidores:

1. **Notificación Inmediata por Telegram (Serverless Netlify Function):**
   * Creamos `netlify/functions/submission-created.js` (hook nativo que Netlify ejecuta cada vez que un formulario es enviado).
   * El script extrae el payload (nombre, email, teléfono, estudio, fecha) y hace un `fetch` a la API de Telegram:
     `https://api.telegram.org/bot<BOT_TOKEN>/sendMessage?chat_id=<CHAT_ID>&text=<MENSAJE_FORMATEADO>`.
   * En menos de 1 segundo de haber hecho clic el cliente, el móvil de Mauricio y Meli vibra con los datos para llamarlo al instante.

2. **Dashboard Web Privado (`notarobot.es/admin`):**
   * Página protegida con token criptográfico en localStorage o basic-auth.
   * Gráficas renderizadas en el cliente (Chart.js minimalista en tema oscuro con la paleta de Not A Robot).
   * Muestra:
     - Total de visitas a la landing de estudios.
     - Leads recibidos (Formularios completados).
     - Clics a WhatsApp procedentes de Google Ads.
     - Tasa de conversión global (% de visitantes que solicitaron presupuesto).

---
**Ranuk IT Solutions** — Ingeniería & Excelencia Operativa
