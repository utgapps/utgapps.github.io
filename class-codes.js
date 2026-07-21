/* ============================================================
   CLASS CODES  —  edit this file to control who gets in.

   Kids enter a 4-letter code on the home page. A code only works
   while  enabled: true . To lock a class out (after class / at home)
   set its  enabled  to  false  and push. To let them in, set it  true .

     code    : the 4 letters kids type (not case sensitive)
     label   : a name just for you (shown after they sign in)
     enabled : true = works now,  false = locked
     tools   : "all", or a list of what this code unlocks —
               "pixel-art" , "animator" , "digital-art" , "modeling" , "camp" , and/or "classroom"
     print   : true = may use "Print to PDF" on the coding workbooks;
               leave it out (or false) to block printing for that code.
     play    : who may PLAY the finished games (the "Play" buttons).
               "all", a list of game slugs, or [] / leave out for none.
               Game slugs:
                 catch whack flappy subway geo crossy pong brick doodle
                 shooter heli slice dodge stack fishing rhythm lander
                 platformer cookie pacman drift
               e.g.  play: ["flappy","drift"]  lets them play only those.
     hours   : (optional) only works during this Pacific-time window, e.g.
               "09:00-12:15". Outside it the code is auto-disabled (and it
               turns back on inside the window). Uses Los Angeles time and
               follows daylight saving automatically. Leave out for all-day.
   This is a simple gate, NOT real security — the codes are public
    in this file. It just keeps kids out of the resources outside class.
    Classroom student and instructor codes are held only as hashes by the API.
   (Note: browsers may cache this file for a few minutes, so a lock
   can take a little while to take effect at home.)
   ============================================================ */
window.UTG_CLASSROOMS = [
  {
    id: "ai102",
    courseId: "AI102",
    className: "AI102 - Introduction to AI Integration"
  }
];

/* ------------------------------------------------------------------
   CLASSROOM RELAY (TURN)  —  needed for the live classroom to work on
   locked-down school / home Wi-Fi.

   The classroom connects the teacher and each student directly, browser
   to browser (WebRTC). Many school and home networks block that unless
   the traffic can bounce through a "TURN relay" server on port 443.
   Without one, a student sees "we found your class but could not open a
   live link to your teacher" even though the class shows as open.

   TWO WAYS to provide a relay (use either one):

   1) UTG_TURN_URL (recommended — Cloudflare, big free tier): deploy the tiny
      worker in classroom-app/cloudflare-turn-worker.js, then put its URL here.
      The app fetches fresh credentials from it each time (Cloudflare creds
      expire, so they can't be pasted directly). See that file for setup.

   2) UTG_TURN (static creds — e.g. Metered, ~5 min, no card): make an account
      at metered.ca, open Metered TURN, and paste the "ICE Servers" array it
      gives you (username + credential included) into the array below.

   STUN is always tried first; the relay is only used when a direct/STUN path
   fails. Leave both empty to use PeerJS's built-in defaults (often blocked). */
window.UTG_TURN_URL = "https://utg-turn.utgapps.workers.dev";

window.CLASS_CODES = [
  { code: "POIU", label: "Students",  enabled: false, tools: "all", print: false, play: [], hours: "08:50-12:15" },
  { code: "CVBN", label: "Art + Animation", enabled: true, tools: ["pixel-art", "animator", "digital-art", "modeling"], print: false, play: [] },
  { code: "ASDF", label: "Teacher",   enabled: true, tools: "all", print: true,  play: "all" },
];

// Is this code usable RIGHT NOW? (enabled, and within its Pacific-time `hours`.)
window.UTG_isActive = function (entry) {
  if (!entry || !entry.enabled) return false;
  if (!entry.hours) return true;
  var m = /^(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})$/.exec(entry.hours);
  if (!m) return true;
  var start = (+m[1]) * 60 + (+m[2]), end = (+m[3]) * 60 + (+m[4]);
  var hh = 0, mm = 0;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", hour12: false,
      hour: "2-digit", minute: "2-digit" }).formatToParts(new Date()).forEach(function (p) {
      if (p.type === "hour") hh = +p.value; if (p.type === "minute") mm = +p.value;
    });
  } catch (e) { return true; }  // if the timezone lookup fails, don't lock anyone out
  if (hh === 24) hh = 0;
  var now = hh * 60 + mm;
  return now >= start && now < end;
};
