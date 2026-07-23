/* UTG Academy — whole-site service worker.

   Goal: "always fresh when online." Every navigation and same-origin request
   goes to the NETWORK FIRST, so a visitor picks up the latest deploy right
   away. Unchanged files cost only a conditional 304 (GitHub Pages sends
   ETags), so this is version comparison — not a re-download. The cache is a
   fallback used only when the network is unavailable.

   Exceptions:
   - Content-hashed build assets (…/assets/index-<hash>.js) are immutable for a
     given URL, so they're served cache-first for speed.
   - Cross-origin requests (classroom API, TURN relay, Google Fonts) are left
     alone so their own freshness rules apply.

   Bump CACHE to force every client to drop its old cache on activate. */
const CACHE = "utg-site-v2";
const OFFLINE_URL = "/";

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then((c) => c.add(OFFLINE_URL).catch(() => {})));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Vite emits content-hashed files under an /assets/ folder; the hash in the
// name means a given URL's bytes never change, so it's safe to serve forever.
function isImmutable(url) {
  return url.pathname.includes("/assets/");
}

// Only cache real, complete same-origin responses. Skip cache-busted config
// (…?t=…) so the cache doesn't grow one entry per page load.
function cacheable(res, url) {
  return res && res.ok && res.type === "basic" && !url.searchParams.has("t");
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // API / TURN / fonts: hands off

  if (isImmutable(url)) {
    // cache-first: fast, and safe because the URL is unique per build
    event.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        if (cacheable(res, url)) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      }))
    );
    return;
  }

  // network-first for HTML, manifests, data JSON, unhashed scripts — always up
  // to date online, with a cached fallback offline.
  event.respondWith(
    fetch(req).then((res) => {
      if (cacheable(res, url)) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() =>
      caches.match(req).then((hit) => hit || (req.mode === "navigate" ? caches.match(OFFLINE_URL) : undefined))
    )
  );
});
