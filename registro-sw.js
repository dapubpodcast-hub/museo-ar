// Registra el service worker y muestra si el sitio ya está listo sin conexión.
(function () {
  const aviso = document.getElementById('estado-offline');
  function marcar(texto, ok) {
    if (!aviso) return;
    aviso.textContent = texto;
    aviso.style.background = ok ? '#2f6b3a' : '#7a5a1e';
  }
  if (!('serviceWorker' in navigator)) { marcar('Este navegador no guarda el sitio para usarlo sin conexión.', false); return; }
  navigator.serviceWorker.register('sw.js').then(() => navigator.serviceWorker.ready).then(() => {
    marcar('✔ Listo para usarse sin conexión', true);
  }).catch(() => marcar('No se pudo preparar el modo sin conexión (se necesita HTTPS).', false));
})();
