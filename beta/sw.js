
const CACHE = 'registro-beta-offline-firstpaint-v1';
const ASSETS = ["./app.js", "./appearance-editor.js", "./atualizar.html", "./beta-patches.js", "./beta-tools.js", "./boot.js", "./dev-editor.html", "./diagnostico.html", "./environment.json", "./icon-beta.jpeg", "./icon-editor.html", "./icon.svg", "./index.html", "./launch.html", "./manifest.webmanifest", "./med-package-patch.js", "./med-package-ui.js", "./medication-administration-selection.js", "./medication-emotions.js", "./medication-inventory.js", "./medication-related-notes.js", "./medication-reminders.js", "./mood-bar-v2.js", "./mood-lab-review.html", "./mood-lab.html", "./official-appearance.js", "./official-approved-ui.js", "./patches.js", "./preview-escala-humor.html", "./recover.html", "./release-guard.js", "./safe.html", "./semantic-glow.js", "./sleep-wake.js", "./stable-sync.js", "./styles.css", "./sw.js", "./tabbar-editor.html", "./tabbar-lab.html", "./v04demo.js", "./v04navicons.js", "./v04tabbar.js"];
const REQUIRED = new Set(["./app.js", "./atualizar.html", "./boot.js", "./icon-beta.jpeg", "./index.html", "./manifest.webmanifest", "./medication-administration-selection.js", "./medication-emotions.js", "./medication-related-notes.js", "./medication-reminders.js", "./official-appearance.js", "./official-approved-ui.js", "./patches.js", "./semantic-glow.js", "./sleep-wake.js", "./styles.css"]);
const ROOT = new URL(self.registration.scope);

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const results = await Promise.all(ASSETS.map(async path => {
      const url = new URL(path, ROOT).href;
      try {
        const res = await fetch(new Request(url,{cache:'reload'}));
        if (!res.ok) throw Error(String(res.status));
        await cache.put(url,res);
        return null;
      } catch (_) {
        return path;
      }
    }));
    const missing = results.filter(p => p && REQUIRED.has(p));
    if (missing.length) throw Error('Arquivos ausentes: '+missing);
    // Atualizações esperam o encerramento das abas antigas; evita recarga durante edição.
    if (!self.registration.active) await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith('registro-beta-offline-') && key !== CACHE)
        await caches.delete(key);
    }
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== ROOT.origin ||
      !url.pathname.startsWith(ROOT.pathname)) return;

  const file = './' + (url.pathname.slice(ROOT.pathname.length) || 'index.html');
  // Consulta explícita de versão deve alcançar a rede, não o cache.
  if (url.searchParams.has('verificar')) return;
  if (!ASSETS.includes(file)) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const key = new URL(file,ROOT).href;

    // Abertura imediata: usar cópia completa do aplicativo já instalada.
    const cached = await cache.match(key);
    if (cached) return cached;
    try {
      const response = await fetch(req);
      if (response.ok) {
        try { await cache.put(key, response.clone()); } catch (_) {}
      }
      return response;
    } catch (_) {
      return Response.error();
    }
  })());
});
