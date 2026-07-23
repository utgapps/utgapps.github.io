/* Shared access guard for tool pages. It verifies the saved code with the
   Classroom API, so the browser never receives a list of usable codes. */
(function () {
  function deny(to) { location.replace(to || ((window.UTG_GUARD || "../") + "?locked=1")); }
  function allow(perm, key) {
    return perm === true || perm === "all" || (!!perm && perm.indexOf && perm.indexOf(key) >= 0);
  }
  var API = window.UTG_API_URL || ((location.hostname === "localhost" || location.hostname === "127.0.0.1") ? "http://127.0.0.1:8787" : "https://utg-classroom-api.utgapps.workers.dev");
  var deviceKey = "utg_classroom_access_device";
  function accessDevice() {
    var id = localStorage.getItem(deviceKey);
    if (!id) { id = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random()).replace(/[^a-zA-Z0-9-]/g, ""); localStorage.setItem(deviceKey, id); }
    return id;
  }
  function grant(entry) {
    window.UTG = { entry: entry, canPlay: function (slug) { return allow(entry.play, slug); } };
    if (entry.print) document.documentElement.classList.add("utg-can-print");
    if (window.UTG_PLAY && !window.UTG.canPlay(window.UTG_PLAY)) { deny(window.UTG_PLAY + "-workbook.html"); return; }
    document.documentElement.style.visibility = "visible";
  }
  // Staff (admin/instructor) sign in with an account, not a class code, and
  // get every tool. Verified against the API so a spoofed role can't pass.
  function tryAccount(next) {
    var acct = null;
    try { acct = JSON.parse(localStorage.getItem("utg_account") || "null"); } catch (e) { acct = null; }
    var role = acct && acct.account && acct.account.role;
    if (!acct || !acct.token || (role !== "admin" && role !== "instructor")) { next(); return; }
    fetch(API + "/me", { cache: "no-store", headers: { authorization: "Bearer " + acct.token } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        var r = d && d.account && d.account.role;
        if (r === "admin" || r === "instructor") grant({ tools: "all", print: true, play: "all", label: d.account.name });
        else next();
      })
      .catch(function () { next(); });
  }
  function verifyCode() {
    var saved = (localStorage.getItem("utg_class_code") || "").trim().toUpperCase();
    if (!saved) { deny(); return; }
    fetch(API + "/access/verify", { method: "POST", cache: "no-store", headers: { "content-type": "application/json", "x-utg-access-device": accessDevice() }, body: JSON.stringify({ code: saved }) })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (result) {
        var entry = result.d && result.d.profile;
        var ok = result.ok && entry && (!window.UTG_TOOL || entry.tools === "all" || (entry.tools && entry.tools.indexOf(window.UTG_TOOL) >= 0));
        if (!ok) { deny(); return; }
        grant(entry);
      })
      .catch(function () { deny(); });
  }
  document.documentElement.style.visibility = "hidden";
  tryAccount(verifyCode);
})();
