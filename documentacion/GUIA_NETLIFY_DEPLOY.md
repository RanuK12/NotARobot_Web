# 🚀 Guía de Despliegue - Netlify + GoDaddy

## Comparación: Netlify vs GitHub Pages

| Característica | Netlify | GitHub Pages |
|----------------|---------|--------------|
| **Costo** | Gratis (tier free) | Gratis |
| **Deploy automático** | ✅ Sí, desde GitHub | ✅ Sí |
| **HTTPS gratis** | ✅ Sí, automático | ✅ Sí |
| **Dominio custom** | ✅ Sí | ✅ Sí |
| **Previews de PR** | ✅ Sí | ❌ No |
| **Forms sin backend** | ✅ Sí (gratis, 100/mes) | ❌ No |
| **Funciones serverless** | ✅ Sí (125k/mes gratis) | ❌ No |
| **Redirects/rewrites** | ✅ Sí | ❌ Limitado |
| **Ancho de banda** | 100GB/mes | Limitado (no especificado) |
| **Velocidad CDN** | ✅ Excelente | ✅ Buena |
| **Rollback fácil** | ✅ 1 click | ❌ Via git |
| **Panel de control** | ✅ Muy completo | ❌ Básico |

### ✅ Recomendación: NETLIFY

Para NOT A ROBOT, Netlify es mejor porque:
1. **Forms gratis**: Pueden tener formulario de contacto sin backend
2. **Previews**: Antes de hacer deploy, pueden ver cómo queda
3. **Panel fácil**: Más intuitivo para gestionar el sitio
4. **Rollback**: Si algo sale mal, vuelven atrás en 1 click
5. **Funciones**: Si en el futuro necesitan algo dinámico

---

## PASO 1: Subir a GitHub (solo archivos de la web)

### Preparar el repositorio

```bash
# En la carpeta del proyecto
cd "c:\Users\emilio\Desktop\Oficina Ranuk\WebFlow_NotaRobot"

# Crear .gitignore para excluir archivos grandes
# (ya está creado)

# Agregar solo la carpeta website (lo que va a producción)
git add website/
git add .gitignore

# Commit
git commit -m "Initial commit - NOT A ROBOT website"

# Push al repositorio
git push -u origin main
```

### Estructura que se sube:
```
website/
├── index.html          ← Será coming-soon.html temporalmente
├── coming-soon.html    ← Página temporal
├── index-v2.html       ← Nueva versión (en desarrollo)
├── css/
│   ├── fonts.css
│   └── main.css
├── js/
│   └── main-v2.js
├── fonts/
│   └── Aileron-*.otf
├── images/
│   └── ...
└── videos/
    └── Reel_NotARobot.mp4
```

---

## PASO 2: Configurar Netlify

### 2.1 Crear cuenta
1. Ir a [netlify.com](https://netlify.com)
2. "Sign up" → "Sign up with GitHub"
3. Autorizar acceso a tu cuenta GitHub

### 2.2 Conectar repositorio
1. Click en "Add new site" → "Import an existing project"
2. Elegir "Deploy with GitHub"
3. Seleccionar el repositorio: `RanuK12/NotARobot_Web`
4. Configurar:
   - **Branch to deploy**: `main`
   - **Base directory**: `website` (⚠️ IMPORTANTE)
   - **Build command**: (dejar vacío - es sitio estático)
   - **Publish directory**: `.` (punto)
5. Click "Deploy site"

### 2.3 Primera vez - Página temporal
Para que la página temporal sea el index:

```bash
# Renombrar temporalmente
cd website
# Hacer backup del index actual
mv index.html index-original.html
# Usar coming-soon como index
cp coming-soon.html index.html
# Commit y push
git add .
git commit -m "feat: página temporal como index"
git push
```

Netlify desplegará automáticamente.

---

## PASO 3: Conectar dominio GoDaddy

### 3.1 En Netlify
1. Ir a tu sitio en Netlify
2. "Domain settings" → "Add custom domain"
3. Escribir: `notarobot.es`
4. Click "Verify" → "Add domain"
5. También agregar: `www.notarobot.es`

### 3.2 Obtener los nameservers de Netlify
Netlify te dará nameservers como:
```
dns1.p01.nsone.net
dns2.p01.nsone.net
dns3.p01.nsone.net
dns4.p01.nsone.net
```

### 3.3 En GoDaddy - OPCIÓN A: Cambiar Nameservers (Recomendado)
1. Ir a GoDaddy → Mis Dominios → notarobot.es
2. "Administrar DNS"
3. Buscar "Nameservers" → "Cambiar"
4. Elegir "Introduciré mis propios nameservers"
5. Pegar los 4 nameservers de Netlify
6. Guardar

⏱️ **Tiempo de propagación**: 24-48 horas (usualmente menos)

### 3.3 En GoDaddy - OPCIÓN B: Solo DNS (si no querés cambiar nameservers)
Si preferís mantener GoDaddy como DNS:

1. Ir a "Administrar DNS"
2. Borrar registros A existentes para @
3. Agregar registro A:
   ```
   Tipo: A
   Nombre: @
   Valor: 75.2.60.5  (IP de Netlify load balancer)
   TTL: 600
   ```
4. Agregar registro CNAME:
   ```
   Tipo: CNAME
   Nombre: www
   Valor: [tu-sitio].netlify.app
   TTL: 600
   ```

### 3.4 Activar HTTPS
1. En Netlify → Domain settings
2. Buscar "HTTPS"
3. Click "Verify DNS configuration"
4. Una vez verificado, click "Provision certificate"
5. Activar "Force HTTPS"

---

## PASO 4: Deploy de la web final

Cuando la web esté lista:

```bash
# Restaurar el index original
cd website
mv index-original.html index-backup.html
# Usar la nueva versión como index
cp index-v2.html index.html
# Commit y push
git add .
git commit -m "feat: lanzamiento web final"
git push
```

Netlify desplegará automáticamente en ~30 segundos.

### Ver preview antes de publicar
Netlify crea previews automáticos para cada commit:
- Cada push genera una URL tipo: `deploy-preview-123--notarobot.netlify.app`
- Podés revisar antes de que vaya a producción

### Rollback si algo sale mal
1. En Netlify → "Deploys"
2. Buscar un deploy anterior que funcionaba
3. Click → "Publish deploy"
4. Listo, vuelve a la versión anterior

---

## Resumen de URLs

| Estado | URL |
|--------|-----|
| **Temporal Netlify** | `[tu-sitio].netlify.app` |
| **Con dominio** | `https://notarobot.es` |
| **www** | `https://www.notarobot.es` (redirige a sin www) |

---

## Checklist de lanzamiento

### Fase 1: Página temporal
- [ ] Subir código a GitHub
- [ ] Crear cuenta Netlify
- [ ] Conectar repositorio
- [ ] Configurar `website` como base directory
- [ ] Poner `coming-soon.html` como index
- [ ] Conectar dominio en Netlify
- [ ] Configurar DNS en GoDaddy
- [ ] Esperar propagación DNS (verificar en dnschecker.org)
- [ ] Activar HTTPS

### Fase 2: Web final
- [ ] Desarrollar todas las secciones
- [ ] Agregar contenido real (fotos, textos)
- [ ] Testing en móvil y desktop
- [ ] Reemplazar index temporal por index final
- [ ] Push a GitHub → deploy automático
- [ ] Verificar que todo funciona
- [ ] ¡Lanzamiento! 🚀

---

## Comandos útiles

```bash
# Ver estado del repo
git status

# Ver logs de commits
git log --oneline -5

# Agregar cambios
git add .

# Commit con mensaje
git commit -m "descripción del cambio"

# Subir cambios (deploy automático)
git push

# Si hay conflictos, traer cambios remotos
git pull --rebase
```

---

## Soporte

- **Netlify Docs**: https://docs.netlify.com/
- **GoDaddy DNS Help**: https://www.godaddy.com/help/change-nameservers-for-my-domains-664
- **Verificar DNS**: https://dnschecker.org/

---

*Documento creado: 9 de febrero de 2026*
