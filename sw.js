// Service worker: guarda el sitio completo para usarlo sin conexión.
// Al cambiar cualquier archivo, subir el número de VERSION para que los teléfonos actualicen.
const VERSION = 'museo-ar-v3';
const ARCHIVOS = [
  './', 'index.html', 'ver.html', 'marcador.html', 'estilo.css', 'experimentos.js', 'registro-sw.js',
  'manifest.webmanifest', 'icono-192.png', 'icono-512.png', 'stickers.pdf', 'stickers.png', 'stickers_astrobio.png',
  'lib/aframe.min.js', 'lib/aframe-extras.min.js', 'lib/aframe-ar.js', 'lib/model-viewer.min.js',
  'lib/camera_para.dat',
  'lib/patt-punto_ciego.patt', 'lib/patt-evaporacion.patt', 'lib/patt-uv.patt', 'lib/patt-remolino.patt',
  'lib/patt-sputnik1.patt', 'lib/patt-tess.patt', 'lib/patt-chandrayaan2.patt',
  'modelos/punto_ciego.glb', 'modelos/punto_ciego.usdz',
  'modelos/evaporacion.glb', 'modelos/evaporacion.usdz',
  'modelos/uv.glb', 'modelos/uv.usdz',
  'modelos/remolino.glb', 'modelos/remolino.usdz',
  'modelos/sputnik1.glb', 'modelos/sputnik1.usdz',
  'modelos/tess.glb', 'modelos/tess.usdz',
  'modelos/chandrayaan2.glb', 'modelos/chandrayaan2.usdz',
  'audio/sputnik.mp3', 'audio/tess.mp3', 'audio/chandrayaan2.mp3'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Safari pide el audio por rangos (Range); hay que responder 206 desde el caché.
async function respuestaConRango(req) {
  const r = await caches.match(req, { ignoreSearch: true, ignoreVary: true });
  if (!r) return fetch(req);
  const buf = await r.arrayBuffer();
  const m = /bytes=(\d*)-(\d*)/.exec(req.headers.get('range') || '');
  if (!m) return r;
  const ini = m[1] === '' ? Math.max(0, buf.byteLength - Number(m[2])) : Number(m[1]);
  const fin = m[1] === '' || m[2] === '' ? buf.byteLength - 1 : Math.min(Number(m[2]), buf.byteLength - 1);
  return new Response(buf.slice(ini, fin + 1), {
    status: 206, statusText: 'Partial Content',
    headers: {
      'Content-Type': r.headers.get('Content-Type') || 'application/octet-stream',
      'Content-Range': `bytes ${ini}-${fin}/${buf.byteLength}`,
      'Content-Length': String(fin - ini + 1)
    }
  });
}

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  if (e.request.headers.has('range')) { e.respondWith(respuestaConRango(e.request)); return; }
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
