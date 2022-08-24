const cacheName = 'v2';

const contentToCache = [
  'index.html'
]

self.addEventListener('install', (e) => {
  console.log('[SW] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[SW] Caching all: app shell and content');
    await cache.addAll(contentToCache);
  })());
});

/*
Intercept all fetches
*/
self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[SW] Fetching resource: ${e.request.url}`);
    if (r) { return r; }
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[SW] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});


/*
Clear out all old caches
*/
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
      if (key === cacheName) { return; }
      return caches.delete(key);
    }))
  }));
});