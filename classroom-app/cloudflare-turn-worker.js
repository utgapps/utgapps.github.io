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

const CORS = {
  "Access-Control-Allow-Origin": "*",           // or lock to "https://utgapps.github.io"
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });

    if (!env.TURN_KEY_ID || !env.TURN_KEY_API_TOKEN) {
      return json({ iceServers: [], error: "Worker is missing TURN_KEY_ID / TURN_KEY_API_TOKEN variables." }, 500);
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
      if (!res.ok) return json({ iceServers: [], error: `Cloudflare TURN error ${res.status}` }, 502);

      const data = await res.json();
      // Cloudflare returns { iceServers: { urls:[...], username, credential } }.
      // Wrap that single entry in an array (the shape the classroom expects).
      const ice = data && data.iceServers ? [data.iceServers] : [];
      return json({ iceServers: ice }, 200);
    } catch (e) {
      return json({ iceServers: [], error: String(e) }, 502);
    }
  },
};

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
