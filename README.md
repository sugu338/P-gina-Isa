# Para mi aceitunita 💗

PWA romántica para Agustín e Isabella, con la foto original incluida en `assets/foto-pareja.jpg`.

## Incluye
- Rompecabezas deslizante 4×4 (16 piezas) con controles táctiles: tocar una pieza vecina al espacio vacío o deslizarla con el dedo en la dirección del espacio.
- Vista previa de la foto, contador de movimientos y cronómetro.
- Carta final con el mensaje «Te amo 3 millones amorcito mío».
- Corazón SVG animado descargable.
- Manifest, service worker e icono para instalación como PWA.
- Diseño responsive, pastel rosa y crema.

## Probar localmente
Desde esta carpeta ejecutá:
- Windows: `py -m http.server 8080`
- macOS/Linux: `python3 -m http.server 8080`

Abrí `http://localhost:8080`. Para probar instalación PWA se requiere localhost o HTTPS.

## Publicar gratis con GitHub Pages
1. Subí el contenido de esta carpeta a un repositorio de GitHub.
2. Entrá a Settings → Pages.
3. Elegí Deploy from a branch, branch `main`, carpeta `/ (root)` y guardá.
4. Compartí el enlace HTTPS con Isabella.
5. En Android, abrí el enlace en Chrome → menú ⋮ → “Instalar aplicación” o “Agregar a pantalla de inicio”.

## Nota sobre Android
Una PWA se puede instalar como app web, pero no puede crear un widget nativo independiente en la pantalla de inicio. El corazón animado vive dentro de la experiencia web y también se puede guardar como SVG animado.


## Si antes no aparecía la foto
Esta versión incluye `assets/foto-pareja.jpg` y cambia la caché de la PWA a `v2`. Después de reemplazar los archivos en GitHub Pages, cerrá la app instalada y abrí el enlace en Chrome. Si todavía aparece la versión anterior, borrá los datos del sitio en Chrome (Configuración del sitio → Almacenamiento → Borrar) y volvé a instalarla.


## Actualización de diagnóstico v3
Esta versión calcula la ruta de la imagen a partir de la URL de `app.js`, lo que admite repositorios de GitHub Pages publicados en subrutas (`usuario.github.io/repositorio/`). La caché se incrementó a v3 y HTML/JS/CSS usan red primero para facilitar actualizaciones. Si la foto falla, se mostrará la URL exacta que no pudo cargar.

**Importante al subir:** subí los archivos y carpetas sueltos a la raíz publicada, no el ZIP como un solo archivo. Verificá que `assets/foto-pareja.jpg` sea accesible en el sitio.


## Versión v4: foto incorporada dentro del código
Esta versión incorpora la foto directamente en `app.js` como imagen embebida. Así, el rompecabezas ya no depende de que GitHub Pages encuentre `assets/foto-pareja.jpg` en una ruta separada. La carpeta `assets/` se conserva como copia de la foto, pero no es necesaria para que el tablero la muestre.

Para actualizar: subí/reemplazá todos los archivos del ZIP en la raíz publicada del repositorio y esperá a que GitHub Pages termine. Luego cerrá la PWA instalada por completo y abrí la URL del sitio en Chrome. Si Chrome sigue usando la anterior, desinstalá el acceso PWA, borrá los datos del sitio y volvé a abrir la URL. El service worker se actualizó a `v4`.
