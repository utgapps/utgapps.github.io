const cacheName = "utg-classroom-v2";
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(["./"])));
  self.skipWaiting();
});
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  // Always ask the network for the app shell first, so an instructor does not
  // stay on an old classroom version after a GitHub Pages update.
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).then((response) => {
      caches.open(cacheName).then((cache) => cache.put(event.request, response.clone()));
      return response;
    }).catch(() => caches.match(event.request).then((cached) => cached || caches.match("./"))));
    return;
  }
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    const copy = response.clone();
    caches.open(cacheName).then((cache) => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match("./"))));
});
