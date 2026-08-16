/* UTG site configuration (public — no secrets here).

   Class codes and their permissions are NOT in this file. They live only as
   hashes in the Classroom API's D1 database and are managed from the Admin
   dashboard (/admin). This file just declares the curriculum classrooms and
   the TURN relay URL used by the live classroom. */
window.UTG_CLASSROOMS = [
  {
    id: "ai101",
    courseId: "AI101",
    className: "AI101 - Talk to the Machine"
  },
  {
    id: "ai102",
    courseId: "AI102",
    className: "AI102 - AI Creative Studio"
  }
];

/* CLASSROOM RELAY (TURN) — needed for the live classroom on locked-down
   school / home Wi-Fi, where direct browser-to-browser WebRTC is blocked.
   The tiny worker in classroom-app/cloudflare-turn-worker.js mints fresh,
   short-lived credentials on demand; put its URL here. STUN is tried first;
   the relay is only used when a direct/STUN path fails. */
window.UTG_TURN_URL = "https://utg-turn.utgapps.workers.dev";

/* SITE-WIDE SERVICE WORKER — keeps every tool up to date. It's network-first,
   so an online visitor always gets the latest deploy (unchanged files cost a
   cheap 304); the cache is only an offline fallback. Registered here because
   class-codes.js loads on every page, giving the worker whole-site scope. */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js").catch(function () {});
  });
}
