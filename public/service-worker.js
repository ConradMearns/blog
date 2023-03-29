const cacheName = "cons_cache_0.1.1";

const contentToCache = ["index.html", "/"];

self.addEventListener("install", (e) => {
  console.log("[SW] Install");
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("[SW] Caching all: app shell and content");
      return cache.addAll(contentToCache);
    })
  );
});

self.addEventListener("activate", (e) => {
  console.log("[SW] Activate");
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            console.log("[SW] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  console.log("[SW] Fetch");
  e.respondWith(
    caches.match(e.request).then((r) => {
      console.log(`[SW] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      return fetch(e.request).then((response) => {
        return caches.open(cacheName).then((cache) => {
          console.log(`[SW] Caching new resource: ${e.request.url}`);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});

self.addEventListener("message", (e) => {
  console.log("[SW] Message received:", e.data);
  if (e.data === "skipWaiting") {
    self.skipWaiting();
  }
});

self.addEventListener("install", (e) => {
  console.log("[SW] Install");
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("[SW] Caching all: app shell and content");
      return cache.addAll(contentToCache);
    })
  );
});

self.addEventListener("activate", (e) => {
  console.log("[SW] Activate");
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            console.log("[SW] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  console.log("[SW] Fetch");
  e.respondWith(
    caches.match(e.request).then((r) => {
      console.log(`[SW] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      return fetch(e.request).then((response) => {
        return caches.open(cacheName).then((cache) => {
          console.log(`[SW] Caching new resource: ${e.request.url}`);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});

self.addEventListener("message", (e) => {
  console.log("[SW] Message received:", e.data);
  if (e.data === "skipWaiting") {
    self.skipWaiting();
  }
});

self.addEventListener("install", (e) => {
  console.log("[SW] Install");
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("[SW] Caching all: app shell and content");
      return cache.addAll(contentToCache);
    })
  );
});

self.addEventListener("activate", (e) => {
  console.log("[SW] Activate");
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            console.log("[SW] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  console.log("[SW] Fetch", e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

self.addEventListener("message", (e) => {
  if (e.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
