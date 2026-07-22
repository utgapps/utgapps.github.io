import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);

// Only the classroom itself owns the service worker; the /admin page reuses
// the same bundle but must not register an out-of-scope worker.
if ("serviceWorker" in navigator && location.pathname.startsWith("/classroom")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("/classroom/sw.js"));
}
