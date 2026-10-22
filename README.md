# Museo AR · COMETA y ASTEROIDE

Cuatro experimentos de física con demostración en realidad aumentada.

- `index.html`: menú de los experimentos.
- `ver.html?m=<id>`: RA sin marcador con `<model-viewer>` (GLB en Android, USDZ en iPhone/iPad).
- `marcador.html`: RA con stickers; cada experimento tiene su propio marcador (`lib/patt-<id>.patt`), con A-Frame + AR.js.
- `modelos/`: GLB y USDZ de `punto_ciego`, `evaporacion`, `uv` y `remolino`.
- `experimentos.js`: textos y escala de cada modelo (ajustar `escala` y `y` si el modelo se ve grande o chico sobre el marcador).
- `prueba-ar-robot.html`, `prueba.html`: pruebas originales.

Los modelos son esquemas: no están a escala. Falta probar en iPhone (USDZ en AR Quick Look) y con cámara real en el marcador.

## Uso sin conexión
El sitio es una PWA: `sw.js` guarda páginas, librerías (`lib/`) y modelos en el teléfono.
- Abrir una vez con internet (HTTPS) y esperar el aviso "Listo para usarse sin conexión" en `index.html`.
- En iPhone: Compartir → Agregar a pantalla de inicio. Abrirlo el día antes de cada jornada (iOS puede borrar el caché de sitios sin uso).
- Si se cambia cualquier archivo, subir `VERSION` en `sw.js` para que los teléfonos actualicen.
- `stickers.pdf` es la hoja de stickers para imprimir al 100 % (un marcador distinto por experimento; papel mate, sin brillo).
