const CACHE = "jarvis-cache-v1";

const ASSETS = [
  "/jarvis-ai-3/",
  "/jarvis-ai-3/index.html",
  "/jarvis-ai-3/icon-192.png",
  "/jarvis-ai-3/icon-512.png",
  "/jarvis-ai-3/manifest.json"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
