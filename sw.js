const CACHE = 'cyber-abdallah-v14';
const ASSETS = [
  '/', '/index.html', '/favicon.svg', '/manifest.json',
  '/css/styles.css',
  '/js/config.js', '/js/data.js', '/js/ui.js', '/js/app.js', '/js/particles.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
