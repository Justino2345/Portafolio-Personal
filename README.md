# Portafolio · Justino Santos

Portafolio personal — un canvas oscuro tipo "instrumento de precisión": grilla
modular con coordenadas, un único color señal lima y movimiento elástico.
Dirección de diseño: **ES·TÁTICA / GRID·SYS**. Sin imágenes: cada preview es una
textura generativa (no hay huecos rotos).

## Stack

- **React 18** + **Vite**
- **Tailwind CSS** (tokens de color/tipografía)
- **Framer Motion** (animaciones)
- **Lenis** (scroll suave)

## Flujo

1. **Carga** — boot de terminal animado + contador; el nombre se ensambla y el panel se levanta.
2. **Intro** — hero con tu nombre, estudios, ubicación y stack; accesos a Proyectos y Contacto.
3. **Sobre mí** — tu foto + bio.
4. **Proyectos** — cards (vista previa en vivo si el proyecto tiene `previewUrl`, y datos del repo en vivo si tiene `repo`).
5. **Servicios** — tu método de trabajo, paso a paso.
6. **Contacto** — formularios de WhatsApp y de email real (EmailJS), botón a Gmail, copiar email y links.

Con **bilingüe ES/EN** y **modo claro/oscuro** (ambos toggles en la status bar de abajo).

## Comandos

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción (dist/)
npm run preview  # previsualizar el build
```

## Editar contenido

El contenido vive en `src/data/` y los textos de UI en `src/i18n/`. Los campos con `{ es, en }` son bilingües:

- [`src/data/site.js`](src/data/site.js) — nombre, rol, bio, ubicación, estudios, email, WhatsApp y redes.
- [`src/data/projects.js`](src/data/projects.js) — tus proyectos (`title`, `desc`, `tags`, `links`, `previewUrl`, `repo`…).
- [`src/data/services.js`](src/data/services.js) — los pasos de "Cómo trabajo" (ES/EN).
- [`src/i18n/strings.js`](src/i18n/strings.js) — todos los textos de UI (botones, labels) en ES y EN.
- Tu **foto**: dejá el archivo en `public/` y poné la ruta en `site.photo` (ver [`public/README.md`](public/README.md)).

### Pendientes antes de publicar

- [x] GitHub, LinkedIn, Instagram, ciudad y WhatsApp cargados en `site.js`.
- [ ] **EmailJS**: crear cuenta y completar `.env.local` para que el form de email envíe de verdad (ver abajo).
- [ ] **Dominio + OG**: reemplazar `TU-DOMINIO.com` en `index.html` y generar `public/og-image.png` (1200×630) al deployar.
- [ ] Sumar más proyectos (y su `repo` para datos en vivo de GitHub).

## Detalles

- **Accesibilidad**: respeta `prefers-reduced-motion` (desactiva cursor custom,
  parallax, marquee, etc. y deja fades simples). Foco visible en lima.
- **Performance**: la grilla es una sola capa fija; los efectos del puntero van
  throttleados con `requestAnimationFrame`.
- El boot completo corre una vez por sesión (`sessionStorage`); en recargas hace un fade corto.
- **Tema claro/oscuro**: toggle en la status bar. Respeta la preferencia del sistema la primera vez y recuerda tu elección (`localStorage`); sin parpadeo gracias a un script inline en `index.html`.

## Configuración de features

### Idioma (ES/EN)
Toggle en la status bar. Textos de UI en `src/i18n/strings.js`; contenido bilingüe en `src/data/*` (campos `{ es, en }`). Arranca según el idioma del navegador y recuerda tu elección.

### Email real (EmailJS)
El form de email usa EmailJS (client-side, sin backend). Para activarlo:
1. Crear cuenta gratis en **emailjs.com** (200 emails/mes).
2. *Email Services* → conectar Gmail → copiar el **Service ID**.
3. *Email Templates* → crear un template con las variables `{{nombre}}`, `{{email}}`, `{{mensaje}}` y "To Email" = tu casilla → copiar el **Template ID**.
4. *Account* → copiar la **Public Key**.
5. Copiá `.env.example` a `.env.local`, pegá las 3 claves y reiniciá `npm run dev`.

Mientras no esté configurado, el form muestra un aviso y el botón queda deshabilitado (el resto del sitio anda igual).

### Datos del repo en vivo (GitHub)
Agregá `repo: 'usuario/repo'` a un proyecto en `projects.js` y la card muestra lenguaje, ★ stars, ⑂ forks y último push (cacheado 6 h para no gastar el rate-limit). Sin `repo`, no muestra nada.

## Deploy

Subí el repo a GitHub y conectalo a **Vercel** o **Netlify** (detectan Vite solo).
Build: `npm run build` · carpeta de salida: `dist`. Acordate de cargar las variables
`VITE_EMAILJS_*` en el panel del hosting y de actualizar `TU-DOMINIO.com` en `index.html`.
