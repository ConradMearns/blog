const cacheName = "cons_cache_0.1.2";

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

// Set up periodic update check
setInterval(() => {
  checkForUpdates();
}, 1000); // Check every hour
// }, 60 * 60 * 1000); // Check every hour

async function checkForUpdates() {
  console.log("[SW] Checking for Updates");

  try {
    const response = await fetch("/src-hash.json");
    const json = await response.json();
    const newHash = json;
    // const newHash = json.hash;

    const oldHash = localStorage.getItem("srcHash");
    if (newHash !== oldHash) {
      console.log('[SW] New updates found!')
      localStorage.setItem("srcHash", newHash);
      // Update application code

      // Notify user of new version
      self.registration.showNotification("Con's Site Updated!", {
        body: "Conrad's Website has an update.",
        icon: "icons/manifest-icon-192.maskable.png",
        vibrate: [200, 100, 200],
        data: {
          url: "https://conrads.website",
          // url: json.updateUrl
        },
      });
    }
  } catch (err) {
    console.error("[SW] Error checking for updates", err);
  }
}

// Handle notification click event
self.addEventListener("notificationclick", (event) => {
  const data = event.notification.data;

  event.notification.close();

  if (data.url) {
    clients.openWindow(data.url);
  }
});
