// FlameLens Service Worker - Manual PWA Cache
const CACHE_NAME = "flamelens-cache-v1";
const STATIC_ASSETS = [
  "/",
  "/favicon.svg",
  "/manifest.webmanifest",
  "/experiments",
  "/rankings",
  "/compare",
  "/insights",
  "/safety-guide",
  "/learn",
  "/data-sources",
  "/about",
  "/team",
  "/roadmap",
  "/demo",
  "/contact"
];

// Install: Pre-cache static shell assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn("[FlameLens SW] Asset pre-cache warning:", err);
      });
    })
  );
  self.skipWaiting();
});

// Activate: Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Network-first for dynamic navigation, cache-fallback; skip /api
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Bypass API routes and non-GET requests
  if (event.request.method !== "GET" || url.pathname.startsWith("/api/")) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // If response is valid, clone and update cache for GET requests
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache).catch(() => {});
          });
        }
        return networkResponse;
      })
      .catch(async () => {
        // Offline fallback to cache
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        // If navigation request failed and not in cache, fallback to root
        if (event.request.mode === "navigate") {
          return caches.match("/");
        }
        return new Response("Network unavailable", { status: 503, statusText: "Offline" });
      })
  );
});
