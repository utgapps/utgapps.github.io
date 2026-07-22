/* UTG site configuration (public — no secrets here).

   Class codes and their permissions are NOT in this file. They live only as
   hashes in the Classroom API's D1 database and are managed from the Admin
   dashboard (/admin). This file just declares the curriculum classrooms and
   the TURN relay URL used by the live classroom. */
window.UTG_CLASSROOMS = [
  {
    id: "ai102",
    courseId: "AI102",
    className: "AI102 - Introduction to AI Integration"
  }
];

/* CLASSROOM RELAY (TURN) — needed for the live classroom on locked-down
   school / home Wi-Fi, where direct browser-to-browser WebRTC is blocked.
   The tiny worker in classroom-app/cloudflare-turn-worker.js mints fresh,
   short-lived credentials on demand; put its URL here. STUN is tried first;
   the relay is only used when a direct/STUN path fails. */
window.UTG_TURN_URL = "https://utg-turn.utgapps.workers.dev";
