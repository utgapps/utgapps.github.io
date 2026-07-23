import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);

// The service worker is now site-wide (registered from class-codes.js → /sw.js),
// so the classroom no longer registers its own. /classroom/sw.js is kept only
// as a self-destruct that unregisters any previously-installed classroom worker.
