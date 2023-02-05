const cacheName = 'cons_cache_0.1.0';

const contentToCache = [
  'index.html',
  '/',
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

  // const url = new URL(e.request.url);
  // if (e.request.method === 'POST' && url.pathname === '/bookmark') {
  if (e.request.method === 'POST') {
    e.respondWith((async () => {
      // const formData = await e.request.formData();
      // const link = formData.get('link') || '';
      // const responseUrl = await saveBookmark(link);
      
      return Response.redirect('/breadboard/share_targets/ParsePost/', 303);
    })());
  } else {
    // Caching
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
    
  }

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

/*
Look for updates
*/
// const registration = await navigator.serviceWorker.ready;

self.addEventListener('updateFound', (e) => {
  e.waitUntil(async () => {
    const newSW = await navigator.serviceWorker.ready.installing;
    newSW.addEventListener('statechange', event => {
      if (newSW.state == 'installed') {
        console.log('[SW] New Service Worker Installed, Pending Activation');
      }
    });
  })
});