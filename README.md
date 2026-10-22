# Museo AR · COMETA y ASTEROIDE

Cuatro experimentos de física con demostración en realidad aumentada.

- `index.html`: menú de los experimentos.
- `ver.html?m=<id>`: RA sin marcador con `<model-viewer>` (GLB en Android, USDZ en iPhone/iPad).
- `marcador.html?m=<id>`: RA con marcador Hiro (A-Frame + AR.js).
- `modelos/`: GLB y USDZ de `punto_ciego`, `evaporacion`, `uv` y `remolino`.
- `experimentos.js`: textos y escala de cada modelo (ajustar `escala` y `y` si el modelo se ve grande o chico sobre el marcador).
- `prueba-ar-robot.html`, `prueba.html`: pruebas originales.

Los modelos son esquemas: no están a escala. Falta probar en iPhone (USDZ en AR Quick Look) y con cámara real en el marcador.
