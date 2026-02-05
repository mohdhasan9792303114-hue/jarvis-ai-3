const CACHE_NAME = "jarvis-cache-v1";

const urlsToCache = [
  "/jarvis-ai-3/",
  "/jarvis-ai-3/index.html",
  "/jarvis-ai-3/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
