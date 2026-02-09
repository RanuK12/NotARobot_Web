# 🚀 Plan de Lanzamiento NOT A ROBOT

## Estado Actual

✅ **Presupuesto aprobado**: €850 (versión código)  
✅ **Página temporal**: Creada (`coming-soon.html`)  
✅ **Recursos recibidos**: Carpeta `recursos_web` con todos los assets  
✅ **Dominio**: notarobot.es (GoDaddy)  

---

## FASE 1: Página Temporal "En Construcción" 🏗️

### Objetivo
Mostrar una carátula profesional mientras se desarrolla la web completa.

### Archivos creados
```
website/
├── coming-soon.html      ← Página temporal
├── images/
│   └── coming-soon-bg.svg   ← Carátula de fondo
```

### Pasos para publicar

#### Opción A: GitHub Pages (Recomendado - Gratis)

1. **Verificar que el repositorio está en GitHub**
   - Ir a: https://github.com/RanuK12/NotARobot_Web
   - Verificar que los archivos estén subidos

2. **Activar GitHub Pages**
   - Ir a: Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/website` (o raíz si movemos los archivos)
   - Guardar

3. **Configurar página temporal como index**
   ```bash
   # Temporalmente, renombrar coming-soon.html a index.html
   # O crear un index.html que redirija
   ```

4. **Conectar dominio GoDaddy**
   - Ver sección "Configuración DNS GoDaddy" abajo

#### Opción B: Hosting propio
Si tenés hosting propio, simplemente subí la carpeta `website/` via FTP.

---

## Configuración DNS GoDaddy → GitHub Pages 🌐

### Paso 1: En GitHub
1. Ir a Settings → Pages → Custom domain
2. Escribir: `notarobot.es`
3. Guardar

### Paso 2: En GoDaddy
1. Ir a tu panel de GoDaddy → Dominio → DNS
2. **Eliminar** cualquier registro A o CNAME existente para @ y www
3. **Agregar estos registros A** (para apex domain: notarobot.es):

| Tipo | Nombre | Valor | TTL |
|------|--------|-------|-----|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |

4. **Agregar registro CNAME** (para www.notarobot.es):

| Tipo | Nombre | Valor | TTL |
|------|--------|-------|-----|
| CNAME | www | ranuk12.github.io | 600 |

### Paso 3: Esperar propagación DNS
- Puede tardar hasta 24-48 horas (usualmente menos)
- Verificar en: https://dnschecker.org

### Paso 4: Activar HTTPS en GitHub
- En GitHub Pages settings, marcar "Enforce HTTPS"

---

## FASE 2: Rediseño Web Estilo Vitapictura 🎬

### Referencia
- **Web de inspiración**: https://vitapictura.co/
- **Estilo**: Video fullscreen en hero, navegación por secciones, diseño limpio y cinematográfico

### Características a implementar

#### Hero Section
- **Video de fondo fullscreen** (como Vitapictura)
- Logo NOT A ROBOT centrado
- Subtítulo/tagline
- Links a showreels/servicios principales
- Navegación superior minimalista

#### Navegación
Basado en la información recibida, las secciones serán:

| Sección | Contenido |
|---------|-----------|
| **Home** | Video hero + showreel + resumen servicios |
| **Estudio** | Información sobre el estudio físico en Barcelona |
| **Podcast** | Servicios de producción de podcast |
| **Agencia** | Servicios de agencia creativa |
| **NotA** | Información sobre el proyecto NotA (productora/sello) |
| **Proyectos/Work** | Portfolio de trabajos (Aurora Live, FIFA WC 2022, Favaloro) |
| **Contacto** | Formulario + Calendly |

### Recursos disponibles
```
recursos_web/
├── Reel_NotARobot.mp4          ← Video para hero
├── Caratula Web en Construcción.svg
├── LOGOS/
│   └── NOTAROBOT/
│       ├── 01. LOGOS/          ← Logos en diferentes formatos
│       ├── 02. NOTAROBOT/      ← Variantes del logo
│       ├── 03. NOTA/           ← Branding NotA
│       └── 04. TIPOGRAFIAS/    ← Fuentes
├── NUESTROS ESTUDIOS/           ← Fotos del estudio
│   └── FOTOS NOTA ENERO-*.jpg
├── PROYECTOS/
│   ├── AURORA LIVE/            ← Video case study
│   ├── FAVALORO/               ← (pendiente contenido)
│   └── FIFA WORLD CUP 2022/    ← Fotos del proyecto
├── 02. ELEMENTOS GRÁFICOS/
│   ├── 01. VECTORES/
│   ├── 02. SKETCHES/
│   └── 03. PRINTS&SCANS/
└── TIPOGRAFIA/
    └── aileron/                ← Fuente para web
```

### Stack Técnico
- **HTML/CSS/JS puro** (como acordado en presupuesto)
- **Cursor personalizado** estilo dossier
- **Blur blobs animados** como elementos decorativos
- **Elementos SVG dibujados a mano**
- **Animaciones suaves** con CSS/JS
- **Responsive** mobile-first
- **Integración Calendly** para reservas

---

## FASE 3: Desarrollo por Secciones 📋

### Semana 1: Estructura base
- [ ] Setup de fuentes (Aileron + Helvetica Now)
- [ ] Implementar video hero fullscreen
- [ ] Navegación responsive
- [ ] Footer con contacto

### Semana 2: Secciones principales
- [ ] Página Estudio (con fotos del espacio)
- [ ] Página Podcast (servicios)
- [ ] Página Agencia (servicios)
- [ ] Página NotA (info del proyecto)

### Semana 3: Portfolio y detalles
- [ ] Grid de proyectos
- [ ] Página individual: Aurora Live
- [ ] Página individual: FIFA World Cup 2022
- [ ] Página individual: Favaloro (cuando llegue contenido)

### Semana 4: Polish y lanzamiento
- [ ] Cursor personalizado
- [ ] Animaciones y transiciones
- [ ] Optimización de imágenes/videos
- [ ] Testing en dispositivos
- [ ] SEO básico
- [ ] Lanzamiento

---

## Preguntas pendientes para el cliente 🤔

1. **Video hero**: ¿Usar `Reel_NotARobot.mp4` o quieren uno específico?
2. **Textos**: ¿Tienen copywriting para cada sección o lo desarrollo yo?
3. **Favaloro**: La carpeta está vacía, ¿viene contenido?
4. **Calendly**: ¿Cuál es el link de Calendly para el botón de reserva?
5. **Email de contacto**: team@notarobot.es confirmado
6. **Redes sociales**: Links a Instagram, YouTube, etc.

---

## Notas técnicas 📝

### Sobre los videos
- Los videos grandes (>100MB) están excluidos de Git
- Para la web se necesitarán versiones comprimidas
- Recomendación: Usar servicio externo (Vimeo/CDN) para videos

### Sobre el dominio
- GoDaddy solo permite 1 transferencia
- Mejor conectar via DNS (no transferir)
- El dominio sigue siendo de ustedes en GoDaddy

---

*Última actualización: 9 de febrero de 2026*
