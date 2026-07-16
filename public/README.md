# Carpeta public/ — tus imágenes van acá

Todo lo que pongas en esta carpeta se sirve desde la raíz del sitio.

## Tu foto (sección "Sobre mí")

1. Dejá tu foto acá, por ejemplo: `public/justino.jpg`
2. En `src/data/site.js` poné la ruta con `/` adelante:

   ```js
   photo: '/justino.jpg',
   ```

Mientras `photo` esté vacío, se muestra un placeholder elegante con tus iniciales.

Formatos recomendados: `.jpg`, `.png` o `.webp`. Para un retrato, ideal vertical
(relación ~4:5) y al menos 600 px de ancho. Si la imagen es muy pesada, conviene
optimizarla (por ejemplo en squoosh.app).
