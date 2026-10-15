# Para Isabella 💗 — rompecabezas 3×3 corregido (v7)

Esta versión corrige el error que impedía que el tablero 3×3 funcionara: el código aún buscaba la pieza vacía de un tablero 4×4 (valor 15). Ahora usa la pieza vacía correcta para 3×3 (valor 8), y los gestos táctiles usan el tamaño real de la cuadrícula.

Al tocar **Descubrir la sorpresa**, se muestra primero la foto original durante unos 2,2 segundos y luego se puede resolver el rompecabezas de 9 piezas. La foto está incorporada en `app.js`; no depende de una ruta externa. La caché del service worker se actualizó a v7.

## Publicar
1. Descomprimí este ZIP.
2. Subí el contenido completo a la raíz del repositorio GitHub, reemplazando los archivos anteriores.
3. Confirmá con **Commit changes** y esperá la publicación de GitHub Pages.
4. Abrí la web en Chrome. Si ves una versión anterior, cerrá la PWA y probá una pestaña de incógnito.
