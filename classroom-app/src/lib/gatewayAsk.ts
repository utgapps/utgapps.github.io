// Ask the school AI gateway a question from the teacher tools.
//
// The gateway sits on a Tailscale 100.x private address. The classroom app's
// OWN origin cannot reach it - only a frame that has been handed the
// `local-network-access` permission can (the same reason the preview frame
// exists; see preview.ts). So the request is made from a throwaway sandboxed,
// opaque-origin iframe that holds that permission, and the answer comes back by
// postMessage. The teacher's key is handed to the frame AFTER it loads, so it is
// never written into the DOM as srcdoc text.
//
// This is best-effort: on a home machine (or the in-app browser) the gateway is
// simply unreachable and this rejects with a plain-language message.

const GATEWAY = "https://ai.tail5091fc.ts.net/v1/chat/completions";

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export function gatewayAsk(
  key: string,
  body: { model: string; messages: ChatMessage[]; temperature?: number; max_tokens?: number },
  timeoutMs = 45000,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const nonce = crypto.randomUUID();
    const frame = document.createElement("iframe");
    frame.setAttribute("sandbox", "allow-scripts");     // opaque origin: no same-origin
    frame.setAttribute("allow", "local-network-access *");
    frame.style.display = "none";
    // The frame waits for the request (so the key is not in the srcdoc), fetches
    // the gateway, and posts the JSON (or the error) back. The closing script
    // tag is split so this file never contains a literal one.
    frame.srcdoc =
      "<script>" +
      "var N=" + JSON.stringify(nonce) + ",U=" + JSON.stringify(GATEWAY) + ";" +
      "window.addEventListener('message',function(e){" +
      "  if(!e.data||e.data.__ask!==N||!e.data.go)return;" +
      "  fetch(U,{method:'POST',headers:{'content-type':'application/json','authorization':'Bearer '+e.data.key},body:JSON.stringify(e.data.body)})" +
      "   .then(function(r){return r.text().then(function(t){return {status:r.status,text:t};});})" +
      "   .then(function(d){parent.postMessage({__ask:N,done:true,status:d.status,text:d.text},'*');})" +
      "   .catch(function(err){parent.postMessage({__ask:N,done:true,error:String(err&&err.message||err)},'*');});" +
      "});" +
      "parent.postMessage({__ask:N,ready:true},'*');" +
      "<\/script>";

    let settled = false;
    const timer = window.setTimeout(() => finish(() =>
      reject(new Error("The classroom AI did not answer. It is only reachable on a school computer on the school network."))), timeoutMs);

    function finish(action: () => void) {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      window.removeEventListener("message", onMessage);
      frame.remove();
      action();
    }

    function onMessage(event: MessageEvent) {
      if (event.source !== frame.contentWindow) return;
      const data = event.data as { __ask?: string; ready?: boolean; done?: boolean; status?: number; text?: string; error?: string } | null;
      if (!data || data.__ask !== nonce) return;
      if (data.ready) {
        frame.contentWindow?.postMessage({ __ask: nonce, go: true, key, body }, "*");
        return;
      }
      if (!data.done) return;
      finish(() => {
        if (data.error) {
          // A rejected fetch here is almost always "this machine cannot see the
          // gateway" - a bare "Failed to fetch" tells a teacher nothing.
          const offline = /failed to fetch|networkerror|load failed|blocked/i.test(data.error);
          reject(new Error(offline
            ? "Could not reach the classroom AI. This works on a school computer on the school network, with the class AI running."
            : data.error));
          return;
        }
        if (typeof data.status === "number" && data.status >= 400) {
          reject(new Error(`The AI gateway refused the request (${data.status}).`));
          return;
        }
        try {
          const parsed = JSON.parse(data.text || "{}");
          const text = parsed?.choices?.[0]?.message?.content;
          if (typeof text === "string" && text.trim()) resolve(text.trim());
          else reject(new Error("The AI gateway sent back an empty answer."));
        } catch { reject(new Error("The AI gateway sent back something unreadable.")); }
      });
    }

    window.addEventListener("message", onMessage);
    document.body.appendChild(frame);
  });
}
