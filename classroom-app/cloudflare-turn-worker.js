/* ============================================================
   UTG Classroom — Cloudflare TURN credential Worker
   ------------------------------------------------------------
   Cloudflare's free TURN service has a big free tier, but its
   credentials EXPIRE, so they can't be pasted into a static site.
   This tiny Worker keeps your secret token server-side and hands the
   classroom fresh, short-lived credentials on demand.

   ------------------------------------------------------------
   SETUP (about 10 minutes, no credit card for the free tier)

   1. In the Cloudflare dashboard: Realtime  ->  TURN  ->  Create.
      You get a  TURN Key ID  and a  TURN Key Token  (the Token is a
      secret — treat it like a password).

   2. Create a Worker:  Workers & Pages  ->  Create  ->  Worker.
      Name it e.g.  utg-turn . Open "Edit code", paste THIS file's
      contents, and Deploy.

   3. Give the Worker your key as variables:
      Worker  ->  Settings  ->  Variables and Secrets  ->  add:
         TURN_KEY_ID            = <your TURN Key ID>       (plain text is fine)
         TURN_KEY_API_TOKEN     = <your TURN Key Token>    (mark as "Secret")
      Deploy again so the variables take effect.

   4. Copy the Worker URL (e.g. https://utg-turn.YOURNAME.workers.dev)
      and put it in class-codes.js as:
         window.UTG_TURN_URL = "https://utg-turn.YOURNAME.workers.dev";

   Test it by opening the Worker URL in a browser — you should see JSON
   like { "iceServers": [ { "urls": [...], "username": "...", "credential": "..." } ] }.

   (Endpoint + response shape follow Cloudflare's Realtime TURN docs; if
   Cloudflare changes them, adjust the fetch URL / parsing below.)
   ============================================================ */

const ALLOWED_ORIGINS = new Set(["https://utgapps.github.io", "http://localhost:5173", "http://127.0.0.1:5173"]);

function cors(request) {
  const origin = request.headers.get("origin");
  return origin && ALLOWED_ORIGINS.has(origin) ? {
    "Access-Control-Allow-Origin": origin,
    "Vary": "Origin",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "authorization",
  } : {};
}

export default {
  async fetch(request, env) {
    const headers = cors(request);
    if (request.method === "OPTIONS") return new Response(null, { headers });

    const authorization = request.headers.get("authorization") || "";
    const session = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
    // A service binding keeps this authorization check private between Workers.
    const verification = await env.CLASSROOM_API.fetch("https://classroom-api.internal/turn/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: session }),
    });
    if (!verification.ok) return json(request, { iceServers: [], error: "Sign in before opening a classroom connection." }, 401);

    if (!env.TURN_KEY_ID || !env.TURN_KEY_API_TOKEN) {
      return json(request, { iceServers: [], error: "TURN is not configured." }, 500);
    }

    try {
      const ttl = 86400; // seconds (24h) — comfortably covers a class session
      const res = await fetch(
        `https://rtc.live.cloudflare.com/v1/turn/keys/${env.TURN_KEY_ID}/credentials/generate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.TURN_KEY_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ttl }),
        }
      );
      if (!res.ok) return json(request, { iceServers: [], error: "TURN service is unavailable." }, 502);

      const data = await res.json();
      // Cloudflare returns { iceServers: { urls:[...], username, credential } }.
      // Wrap that single entry in an array (the shape the classroom expects).
      const ice = data && data.iceServers ? [data.iceServers] : [];
      return json(request, { iceServers: ice }, 200);
    } catch (e) {
      return json(request, { iceServers: [], error: "TURN service is unavailable." }, 502);
    }
  },
};

function json(request, body, status) {
  return new Response(JSON.stringify(body), {
    status, headers: { ...cors(request), "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
