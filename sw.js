/* CrossIce service worker.
   WHEN YOU UPLOAD A NEW index.html, SET THE LINE BELOW TO THE NEW VERSION.
   It must match APPVER near the top of index.html. Patch for fixes (0.9.1),
   minor for new features (0.10.0), major for anything that changes saved
   drills in a way an older build cannot read (1.0.0).
   That is what tells every coach's phone to pick up the new version. */
const CACHE = 'crossice-0.13.0';

const ASSETS = [
  './', './index.html', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './icon-maskable-512.png',
  './apple-touch-icon.png', './favicon-64.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (ks) {
        return Promise.all(ks.map(function (k) { return k === CACHE ? null : caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

/* Serve from the cache so the app opens with no signal at the rink, and
   quietly refresh it in the background so the next open is up to date. */
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).origin !== location.origin) return;
  if (new URL(e.request.url).pathname.indexOf('/drills.json') >= 0) return;
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      var net = fetch(e.request).then(function (res) {
        if (res && res.status === 200 && res.type === 'basic') {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        }
        return res;
      }).catch(function () { return hit; });
      return hit || net;
    })
  );
});
