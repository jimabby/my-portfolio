// Registers the service worker generated at build time.
//
// Production only. In dev there is no dist/sw.js to register, and a worker
// caching the dev server's modules is a reliable way to spend an afternoon
// debugging stale code.
//
// Registration is deferred until after load so it never competes with the
// first paint for bandwidth.
export function registerServiceWorker() {
  if (!import.meta.env.PROD) return;
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // A failed registration costs offline support and nothing else, so it
      // is not worth surfacing to the visitor.
    });
  });
}

export default registerServiceWorker;
