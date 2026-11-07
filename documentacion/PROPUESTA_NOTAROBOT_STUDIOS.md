# RANUK IT SOLUTIONS — PROPUESTA TÉCNICA & COMERCIAL

**Cliente:** NOT A ROBOT (Barcelona, España)  
**Destinatarios:** Mauricio, Meli & Equipo Directivo  
**Fecha:** 29 de Octubre de 2026  
**Elaborado por:** Emilio Ranucoli — Lead Tech & Director, Ranuk IT Solutions  
**Referencia:** Consolidación de Dominio, Integración Landing Estudios, Full Tracking Google Ads & SEO Local

---

```
  ____                 _      ___ _____   ____        _       _   _                 
 |  _ \ __ _ _ __  _ _| | __ |_ _|_   _| / ___|  ___ | |_   _| |_(_) ___  _ __  ___ 
 | |_) / _` | '_ \| | | |/ /  | |  | |   \___ \ / _ \| | | | | __| |/ _ \| '_ \/ __|
 |  _ < (_| | | | | |_|   <   | |  | |    ___) | (_) | | |_| | |_| | (_) | | | \__ \
 |_| \_\__,_|_| |_|\__,_|_|\_\|___| |_|   |____/ \___/|_|\__,_|\__|_|\___/|_| |_|___/
                     S O F T W A R E  &  I N T E L L I G E N C E
```

---

## 1. DIAGNÓSTICO DE SITUACIÓN ACTUAL

Tras auditar tanto la web oficial (**`notarobot.es`**) como la landing externa creada para el alquiler de estudios (**`notarobotstudios.es`**), identificamos con total precisión los cuellos de botella que están afectando la captación y rentabilidad de sus campañas publicitarias:

1. **Fragmentación y Canibalización de Tráfico:**  
   Al mantener la landing en un dominio externo secundario (`notarobotstudios.es`) montado en una plataforma aislada, el tráfico de pago no retroalimenta la autoridad del dominio principal (`notarobot.es`). Google Search Console no transfiere el valor de marca y se divide la fuerza del posicionamiento.

2. **Bloqueo Técnico de Google Ads por Política de Seguridad (CSP):**  
   Hemos detectado que la web oficial cuenta con una estricta directiva de seguridad (`Content-Security-Policy`) en sus cabeceras HTTP. Aunque esto es excelente para la ciberseguridad, **actualmente está bloqueando las peticiones salientes hacia los servidores de Google Ads** (`googleadservices.com`, `googleads.g.doubleclick.net`). Sin un ajuste quirúrgico de esta política, las etiquetas de conversión de Google Ads (`AW-18483251414`) fallan silenciosamente en el navegador del usuario y no registran los eventos.

3. **Ceguera de Atribución (Falta de Medición de Conversiones Reales):**  
   Hoy en día, las campañas no tienen trazabilidad exacta sobre qué anuncio o palabra clave genera un mensaje de WhatsApp, una llamada o un formulario enviado. Sin esta data, el algoritmo de Google Ads no puede optimizar a "Maximizar Conversiones" y el coste por clic (CPC) se encarece innecesariamente.

4. **Ruptura de Experiencia de Usuario (UX) e Indexación:**  
   La página actual de estudios no cuenta con la jerarquía semántica, estructura de microdatos Schema.org (Google Rich Snippets para estudios de alquiler en Barcelona) ni la integración armónica con el diseño editorial y minimalista propio de Not A Robot.

---

## 2. OBJETIVOS ESTRATÉGICOS DEL PROYECTO

1. **Centralización 100% en `notarobot.es`:** Llevar la experiencia completa de reserva de estudios a una URL nativa de alto rendimiento (`notarobot.es/alquiler-estudios` o `/studios`), con la tipografía oficial *Aileron*, banners vectoriales SVG y estética cinematográfica.
2. **Infraestructura de Tracking & Ads a Prueba de Balas:** Configurar Google Ads (`AW-18483251414`), Google Analytics 4 y Google Tag Manager, ajustando las políticas de CSP en Netlify para garantizar que el 100% de los leads sean computados.
3. **Preservación y Transferencia de Autoridad (Redirección 301):** Configurar una redirección permanente desde `notarobotstudios.es` hacia la nueva página para no perder tráfico histórico, enlaces existentes ni dinero invertido en anuncios previos.
4. **SEO Local de Élite (Poblenou, Barcelona):** Indexación inmediata para búsquedas con alta intención de compra ("estudio de podcast barcelona", "alquiler estudio rodaje poblenou", "set streaming barcelona").
5. **(Opcional de Alto Valor) Centro de Mando / Dashboard 24/7:** Brindar al equipo una herramienta ejecutiva para auditar visitas, leads, costes y rendimiento de campañas sin depender de entrar a interfaces complejas.

---

## 3. ALCANCE DE LA SOLUCIÓN — MÓDULOS DE TRABAJO

### MÓDULO 1: DESARROLLO E INTEGRACIÓN NATIVA DE LA PÁGINA DE ESTUDIOS
* **Maquetación Ultra-Rápida y Responsive:**  
  Desarrollo de la nueva página (`notarobot.es/alquiler-estudios`) bajo el estándar de rendimiento del sitio principal (cero dependencias pesadas, carga sub-segundo).
* **Presentación Editorial de Espacios:**
  * **Studio A (92 m²):** Espacio principal, gran ventanal con vistas a Barcelona, aislamiento acústico, ideal para streaming de gran escala, podcasts múltiples, rodajes y directos musicales.
  * **Studio B (14 m²):** Espacio íntimo, versátil, optimizado para podcast de 2 a 4 personas, entrevistas, videollamadas corporativas y sesiones fotográficas.
* **Ficha Técnica y Equipamiento Dinámico:**  
  Sección visual e interactiva con el desglose del equipamiento de alta gama (cámaras Sony FX6/FX3/FX30, micrófonos Shure SM7B/Sennheiser MKH 416, consolas Behringer/Rodecaster, iluminación Nanlite/Aputure, sistemas ATEM y vMix).
* **Formulario de Reserva Profesional (Netlify Forms):**  
  Formulario nativo integrado sin plugins lentos de terceros. Captura de datos esenciales: Nombre, Email, Teléfono, Estudio seleccionado (A o B), Tipo de producción (Podcast, Rodaje, Streaming, Evento) y Fecha tentativa. Envío instantáneo al email del equipo con confirmación visual elegante al usuario.
* **Navegación Interna Coherente:**  
  Actualización de todos los enlaces internos de la web (incluyendo el botón "Reservar Estudio" de la home y la sección actual de estudios) para que dirijan directamente a esta nueva experiencia de conversión.

### MÓDULO 2: TRACKING AVANZADO, GOOGLE ADS & AUDITORÍA CSP
* **Desbloqueo de Seguridad CSP (Content Security Policy):**  
  Modificación precisa de las reglas en el servidor Netlify para autorizar el tráfico de datos hacia `googleadservices.com`, `googleads.g.doubleclick.net`, `region1.google-analytics.com` y `googletagmanager.com`, manteniendo la máxima calificación de seguridad (A+ en SSL Labs) sin bloquear scripts legítimos.
* **Implementación de Conversiones Clave:**  
  Configuración en JavaScript y dataLayer para disparar eventos hacia Google Ads (`AW-18483251414`) y GA4:
  1. `conversion_lead_form`: Disparado exitosamente al enviar el formulario de reserva.
  2. `conversion_whatsapp_click`: Clics hacia el canal directo de WhatsApp.
  3. `conversion_phone_call`: Clics al teléfono directo (`tel:+34...`).
  4. `conversion_email_click`: Clics a la dirección de correo corporativa.
* **Soporte para Flor (Especialista en Ads):**  
  Entrega de documentación técnica con los identificadores exactos de los eventos (Conversion Labels / Event Names) para que pueda activar de inmediato la optimización de pujas automatizadas en Google Ads.

### MÓDULO 3: SEO LOCAL, SCHEMA.ORG & REDIRECCIÓN 301
* **SEO On-Page Quirúrgico:**  
  Optimización de títulos `<h1>`, jerarquía semántica, metadatos (`title` y `description` orientados al click-through rate) y etiquetas OpenGraph/Twitter Card para previsualizaciones impecables en WhatsApp, Instagram y LinkedIn.
* **Microdatos Estructurados (Schema.org / JSON-LD):**  
  Inyección de schema tipo `LocalBusiness` / `Place` especificando la dirección exacta en Carrer de Llacuna (Poblenou, Barcelona), geolocalización, servicios audiovisuales ofrecidos y rango de precios. Esto permite que Google muestre la ficha enriquecida en búsquedas de mapas y resultados locales.
* **Sitemap & Search Console:**  
  Actualización de `sitemap.xml`, directivas limpias en `robots.txt` (verificación de indexabilidad total, 0 etiquetas `noindex`) y solicitud de indexación prioritaria en Google Search Console.
* **Redirección 301 Permanente:**  
  Configuración técnica de redirección 301 desde el dominio `notarobotstudios.es` hacia `notarobot.es/alquiler-estudios` a nivel de DNS / Cloudflare / servidor para transferir el 100% del tráfico y evitar enlaces rotos.

---

### MÓDULO 4 (OPCIONAL / RECOMENDADO): NOT A ROBOT COMMAND CENTER
*Un centro de control privado para el equipo de Not A Robot y sus especialistas de marketing.*

* **¿Qué problema resuelve?**  
  Google Analytics 4 y Google Ads son plataformas complejas y poco amigables para consultar rápidamente en el día a día. Muchas veces el equipo no sabe con certeza si una campaña está funcionando o cuántos contactos entraron esta semana sin pedir un reporte manual.
* **¿Qué incluye el Command Center?**
  1. **Portal Web Privado (`notarobot.es/admin` o `/dashboard`):**  
     Acceso protegido con clave única para Mauricio, Meli y Flor. Interfaz minimalista en modo oscuro con métricas en tiempo real:
     * Visitas diarias y fuentes de tráfico (Google Ads vs Orgánico vs Redes).
     * Cantidad de formularios de reserva completados y clics a WhatsApp.
     * Tasa de conversión de la landing.
  2. **Sistema de Alerta Inmediata por Telegram / Webhook:**  
     Cada vez que un cliente potencial complete el formulario de reserva en la web, un bot privado envía una notificación instantánea al grupo de Telegram del equipo con los datos del prospecto (Nombre, Teléfono, Estudio de interés y Fecha). ¡Velocidad de respuesta inferior a 2 minutos para cerrar el alquiler!
  3. **Resumen Semanal Automático:**  
     Un reporte ejecutivo enviado todos los lunes por la mañana con el balance semanal de tráfico y leads captados.

---

## 4. ESTIMACIÓN DE INVERSIÓN & PLANES

Atendiendo a la relación de confianza construida, nuestro compromiso como partner tecnológico de Not A Robot y el historial del proyecto original:

| Concepto | Plan Core: Integración & Ads Ready | Plan Pro: Core + Command Center 24/7 |
| :--- | :---: | :---: |
| **Nueva Landing Nativa `/alquiler-estudios`** | Incluido | Incluido |
| **Diseño Editorial & Adaptación Responsive** | Incluido | Incluido |
| **Formulario de Reserva con Netlify Forms** | Incluido | Incluido |
| **Desbloqueo de CSP en Servidor Netlify** | Incluido | Incluido |
| **Integración Google Tag (`AW-18483251414`) & GA4** | Incluido | Incluido |
| **Trackeo de Conversiones (Form, WhatsApp, Teléfono)** | Incluido | Incluido |
| **SEO Local Barcelona + Schema.org JSON-LD** | Incluido | Incluido |
| **Actualización Sitemap, Robots & Search Console** | Incluido | Incluido |
| **Redirección 301 desde `notarobotstudios.es`** | Incluido | Incluido |
| **Actualización de Enlaces Internos del Sitio** | Incluido | Incluido |
| **Portal Web Privado de Métricas en Vivo** | — | **Incluido** |
| **Alertas Inmediatas de Nuevos Leads por Telegram** | — | **Incluido** |
| **Soporte y Ajustes Post-Lanzamiento (15 días)** | Incluido | Incluido |
| **PRECIO TOTAL (Euros)** | **420 €** | **590 €** *(Ahorro de 110 €)* |

> *Nota: Si desean comenzar exclusivamente con el **Plan Core (420 €)**, el sistema queda 100% operativo y listo para que las campañas de Ads funcionen de forma óptima. El módulo del Command Center puede activarse en cualquier momento posterior por 250 €.*

---

## 5. TIEMPOS ESTIMADOS DE IMPLEMENTACIÓN

* **Día 1:** Configuración de entorno, desbloqueo de CSP, arquitectura base y maquetación de la estructura visual de la landing.
* **Día 2:** Integración de contenidos, galerías de fotos de Studio A y B, fichas de equipamiento y conexión del formulario Netlify.
* **Día 3:** Implementación del sistema de tags de Google Ads (`AW-18483251414`), eventos dataLayer, GA4 y pruebas de disparo de conversiones.
* **Día 4:** SEO On-Page, Schema.org estructurado, actualización de sitemap, Search Console y configuración de la redirección 301.
* **Día 5:** *(Si se contrata Plan Pro)* Despliegue del Dashboard privado, configuración del bot de alertas de leads y control de calidad final en dispositivos móviles y de escritorio.
* **Plazo de Entrega Total:** **4 a 5 días laborables** a partir de la recepción de accesos y confirmación.

---

## 6. REQUERIMIENTOS Y ACCESOS NECESARIOS (CHECKLIST CLIENTE)

Para iniciar sin demoras técnicas, necesitaremos de su lado:
1. **Acceso al repositorio / despliegue en Netlify** (o invitación como colaborador).
2. **Acceso a la configuración DNS de `notarobotstudios.es`** (proveedor de dominio como DonDominio, Cloudflare, GoDaddy, etc.) para aplicar la redirección 301 definitiva.
3. **Identificador o acceso de lectura a Google Ads / Google Tag Manager** (para validar que Flor y el equipo vean las conversiones reflejadas en verde).
4. **Material Multimedia:** Confirmar si utilizamos las fotos de Studio A y Studio B actualmente cargadas en la landing externa o si disponen de tomas adicionales en alta resolución.
5. **Precios y Tarifas (Opcional):** Indicar si desean mostrar precios públicos de referencia (ej. "Packs desde 150 €", tarifas por hora/jornada) o mantener llamada a presupuesto personalizado.

---

**Ranuk IT Solutions**  
*Ingeniería de Software, Automatización y Soluciones Digitales*  
Contacto: Emilio Ranucoli · [emilioranucoli@gmail.com](mailto:emilioranucoli@gmail.com)
