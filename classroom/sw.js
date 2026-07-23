/* Self-destruct. The classroom used to own this service worker, but caching is
   now site-wide (see /sw.js, registered from class-codes.js). Any browser that
   still has this worker installed will fetch this updated file, run it once,
   drop the old classroom caches, unregister itself, and reload — after which
   the site-wide worker takes over /classroom/ too. New visitors never install
   it, because the classroom no longer registers it. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter((k) => k.startsWith("utg-classroom")).map((k) => caches.delete(k)));
  await self.registration.unregister();
  const clients = await self.clients.matchAll({ type: "window" });
  for (const c of clients) { try { c.navigate(c.url); } catch (e) { /* older browsers */ } }
})()));
