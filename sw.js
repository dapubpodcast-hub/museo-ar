// Service worker: guarda el sitio completo para usarlo sin conexión.
// Al cambiar cualquier archivo, subir el número de VERSION para que los teléfonos actualicen.
const VERSION = 'museo-ar-v1';
const ARCHIVOS = [
  './', 'index.html', 'ver.html', 'marcador.html', 'estilo.css', 'experimentos.js', 'registro-sw.js',
  'manifest.webmanifest', 'icono-192.png', 'icono-512.png', 'marcador-hiro.png',
  'lib/aframe.min.js', 'lib/aframe-extras.min.js', 'lib/aframe-ar.js', 'lib/model-viewer.min.js',
  'lib/camera_para.dat', 'lib/patt.hiro',
  'modelos/punto_ciego.glb', 'modelos/punto_ciego.usdz',
  'modelos/evaporacion.glb', 'modelos/evaporacion.usdz',
  'modelos/uv.glb', 'modelos/uv.usdz',
  'modelos/remolino.glb', 'modelos/remolino.usdz'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  // Se ignora la cadena de consulta (?m=uv) para encontrar la página guardada.
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true, ignoreVary: true }).then(r => r ||
      fetch(e.request).then(res => {
        const copia = res.clone();
        caches.open(VERSION).then(c => c.put(e.request, copia));
        return res;
      })
    )
  );
});
