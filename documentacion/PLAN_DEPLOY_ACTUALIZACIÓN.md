# Plan de Despliegue — Actualización Web NOT A ROBOT

**Fecha:** 15 Feb 2026  
**Estado actual:** Sitio en Netlify (`notarobot.es`) desplegado desde rama `main` de GitHub  
**Rama local:** `preview` (con todos los cambios nuevos)

---

## Situación Actual

### Lo que hay en producción (Netlify / `main`):
- Página coming-soon o versión antigua (commit `612787a`)

### Lo que tenemos listo en local (`preview`):
- **7 páginas HTML** completas: index, streaming, producción, podcast, estudio, nosotros, contacto
- **6 video previews** (0.1–1MB cada uno) para cards de proyectos
- **1 video hero** (Reel_NotARobot.mp4 — 84MB) para la página principal
- **8 assets sketch** (Asset_1 a Asset_8.png) para decoración de títulos
- **9 fotos estudio** (estudio-01 a estudio-09.jpg, ~3-6MB cada una)
- **CSS** completo (pages.css, home.css, fonts.css)
- **JS** (pages.js)

### Tamaño estimado para deploy:
| Tipo | Archivos | Tamaño |
|------|----------|--------|
| Videos (preview clips) | 6 | ~3 MB |
| Video hero (Reel) | 1 | ~84 MB |
| Imágenes (assets, fotos, projects) | ~37 | ~29 MB |
| PDF (dossier, no referenciado) | 1 | ~109 MB |
| Código (HTML, CSS, JS, fonts) | ~42 | ~1 MB |
| **TOTAL desplegable** | | **~226 MB** |

> ⚠️ Excluidos: `Aurora Live.mp4` (159MB, no se usa), `Fotos Estudio*.png` (137MB, no se usan), PDF dossier (109MB, no referenciado en HTML)

---

## Opción A: Deploy Manual via Netlify (RECOMENDADA ✅)

### ¿Por qué es mejor?
- **Sin límites de GitHub** (100MB máx por archivo)
- **Control total** de qué sube y qué no
- **No depende de Git LFS** (que ha fallado antes)
- **Inmediato**: arrastrar carpeta → online en 30 segundos

### Pasos:

#### 1. Preparar carpeta de deploy limpia
```powershell
# Crear carpeta temporal solo con lo que se despliega
$deploy = "$env:TEMP\notarobot-deploy"
Remove-Item $deploy -Recurse -Force -ErrorAction SilentlyContinue
New-Item $deploy -ItemType Directory

# Copiar toda la carpeta website (excluyendo archivos innecesarios)
robocopy "website" $deploy /E /XF "Aurora Live.mp4" "Fotos Estudio*" "NOT_A_ROBOT_Dossier*"

# Verificar tamaño
Get-ChildItem $deploy -Recurse -File | Measure-Object -Property Length -Sum | ForEach-Object { "{0:N1} MB" -f ($_.Sum/1MB) }
```

#### 2. Subir a Netlify
1. Ir a [app.netlify.com](https://app.netlify.com)
2. Seleccionar el sitio `notarobot.es`
3. Ir a **Deploys** → **Deploy settings** → verificar que el **Publish directory** es `/` o `website`
4. Arrastrar la carpeta `$deploy` a la zona de drop de Netlify
5. Esperar ~1 minuto a que procese
6. Verificar en `https://notarobot.es`

#### 3. Verificar después del deploy
- [ ] Página principal carga con video hero
- [ ] Navegación entre las 7 páginas funciona
- [ ] Assets sketch se ven blancos sobre fondo oscuro
- [ ] Video previews reproducen en streaming y producción
- [ ] Botones flotantes (WhatsApp + Contáctanos) aparecen
- [ ] Responsive funciona en móvil

---

## Opción B: Deploy via GitHub + Auto-deploy

### Pasos:

#### 1. Actualizar .gitignore
Ya actualizado para excluir archivos grandes no necesarios.

#### 2. Commit y push
```powershell
cd "c:\Users\emilio\Desktop\Oficina Ranuk\WebFlow_NotaRobot"

# Agregar todos los cambios del website
git add website/ .gitignore

# Commit descriptivo
git commit -m "feat: rediseño completo multi-página con assets, videos y páginas interiores"

# Merge a main
git checkout main
git merge preview

# Push
git push origin main
```

#### 3. Problema potencial: Video Reel (84MB)
- GitHub tiene límite de 100MB por archivo (sin LFS)
- `Reel_NotARobot.mp4` es 84MB → debería subir OK
- Si falla, usar **Git LFS** o **Opción A**

#### 4. Netlify auto-deploy
- Si Netlify está conectado a GitHub → deploya automáticamente al hacer push a `main`
- Verificar en Netlify que el **Base directory** apunta a `website/` o que el **Publish directory** es `website`

---

## Opción C: Híbrida (Código en GitHub + Videos externos) ❌ NO RECOMENDADA

El usuario quiere los videos integrados en la página, no cargados desde YouTube u otro servicio. Así que esta opción queda descartada.

---

## Sobre los Videos

### Decisión: Videos locales (integrados)
Todos los videos están integrados directamente en el HTML con `<video>` y `<source>`:

| Video | Uso | Tamaño | Página |
|-------|-----|--------|--------|
| Reel_NotARobot.mp4 | Hero principal | 84 MB | index.html |
| bcn3d-preview.mp4 | Card proyecto | 0.1 MB | streaming.html |
| biza-preview.mp4 | Card proyecto | 0.2 MB | streaming.html |
| ibai-preview.mp4 | Card proyecto | 0.5 MB | streaming.html |
| saltlabanca-preview.mp4 | Card proyecto | 0.3 MB | streaming.html |
| favaloro-preview.mp4 | Card proyecto | 0.7 MB | produccion.html |
| aurora-preview.mp4 | Card proyecto | 1.0 MB | produccion.html |

**Ventajas de tenerlos locales:**
- Sin dependencia de terceros
- Sin ads ni branding externo
- Carga más rápida (CDN de Netlify)
- Control total de calidad y formato

**Netlify free tier:** 100GB/mes de ancho de banda. Con el Reel de 84MB, eso permite ~1,190 visitas/mes a la home antes de llegar al límite. Para las demás páginas (clips de <1MB), el límite es irrelevante.

### Optimización futura del video hero
Si el tráfico crece, se puede:
1. **Comprimir más** el Reel (reducir de 84MB a ~30MB con CRF 30)
2. **Acortar** el video a 15-20 segundos
3. **Usar formato WebM** además de MP4 (mejor compresión)

---

## Checklist Pre-Deploy

- [x] Todas las páginas HTML actualizadas
- [x] Assets sketch posicionados correctamente
- [x] Videos preview funcionando
- [x] CSS sin errores
- [x] Navegación entre páginas consistente
- [x] .gitignore actualizado
- [ ] Hacer commit de todos los cambios
- [ ] Deploy a Netlify (Opción A o B)
- [ ] Verificar sitio en producción
- [ ] Verificar en móvil

---

## Próximos Pasos (post-deploy)

Una vez que el cliente entregue el contenido faltante:
1. Reemplazar fotos placeholder del equipo en nosotros.html
2. Agregar roles de cada miembro del equipo
3. Completar sección de podcasts con portadas y nombres reales
4. Agregar imagen/video de SBC Summit en producción
5. Crear favicon.png
6. Crear og-image.jpg para compartir en redes
7. Agregar hero-poster.jpg como fallback del video
8. Re-deploy con el contenido completo
