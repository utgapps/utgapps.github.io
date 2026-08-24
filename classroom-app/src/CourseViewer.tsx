import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/* The week's slides and lesson plan, over the top of the classroom.

   Both are plain pages the course generator already writes, on this same
   origin, so they go in an iframe rather than being rebuilt in React - the
   deck and the guide stay one source of truth with the printed and .pptx
   versions, and a teacher who opens teacher.html directly sees the same thing.

   The frame is NOT sandboxed on purpose: the deck needs the fullscreen
   permission and the guide needs its own anchor scrolling, and both are our
   own files from our own origin.

   It renders through a portal into <body>. Mounted where it is used, it sits
   inside the details sidebar - which the class layout hides below about 900px,
   taking the overlay with it. position:fixed does not save an element whose
   ancestor is display:none. */

export type ViewerTab = "slides" | "plan";

const TABS: { id: ViewerTab; label: string; hint: string }[] = [
  { id: "slides", label: "Slides", hint: "arrows or space to move, f for full screen" },
  { id: "plan", label: "Lesson plan", hint: "opened at this week" },
];

export function CourseViewer({ classId, week, title, tab, onTab, onClose }: {
  classId: string;
  week: number;
  title: string;
  tab: ViewerTab;
  onTab: (tab: ViewerTab) => void;
  onClose: () => void;
}) {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const [ready, setReady] = useState(false);

  const pad = String(week).padStart(2, "0");
  const src = tab === "slides"
    ? `../${classId}/slides/week-${pad}.html`
    : `../${classId}/teacher.html?embed=1#week-${week}`;

  // Escape closes, from the classroom side. The deck posts a message for the
  // same key because a focused iframe swallows it before it reaches here.
  useEffect(() => {
    function onKey(event: KeyboardEvent) { if (event.key === "Escape") onClose(); }
    function onMessage(event: MessageEvent) {
      if (event.source !== frameRef.current?.contentWindow) return;
      if (event.data && event.data.utg === "deck" && event.data.action === "close") onClose();
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("message", onMessage);
    document.body.classList.add("viewer-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("message", onMessage);
      document.body.classList.remove("viewer-open");
    };
  }, [onClose]);

  // Switching tabs remounts the frame, so the loading state has to reset with
  // it or a slow second load looks like a blank panel.
  useEffect(() => { setReady(false); }, [tab, week]);

  return createPortal(<div className="viewer" role="dialog" aria-modal="true" aria-label={`Week ${week} ${tab}`}>
    <header className="viewer-bar">
      <strong>Week {week}</strong>
      <span className="viewer-title">{title}</span>
      <div className="viewer-tabs">
        {TABS.map((option) => (
          <button key={option.id} className={option.id === tab ? "vt on" : "vt"}
                  onClick={() => onTab(option.id)}>{option.label}</button>
        ))}
      </div>
      <span className="spacer" />
      <span className="viewer-hint">{TABS.find((t) => t.id === tab)?.hint}</span>
      <a className="text-button" href={tab === "slides" ? `../${classId}/slides/week-${pad}.pptx`
                                                        : `../${classId}/teacher.html#week-${week}`}
         target="_blank" rel="noreferrer">
        {tab === "slides" ? "Download .pptx" : "Open full page"}
      </a>
      <button className="viewer-close" onClick={onClose} title="Close (Esc)">Close</button>
    </header>
    {!ready && <p className="viewer-loading">Loading week {week}&hellip;</p>}
    <iframe key={`${tab}-${week}`} ref={frameRef} className="viewer-frame" src={src}
            title={`Week ${week} ${tab}`} allow="fullscreen"
            onLoad={() => {
              setReady(true);
              // An iframe gets no key events until something inside it has
              // focus, and a teacher should be able to press the right arrow
              // the moment the deck appears rather than clicking it first.
              if (tab === "slides") frameRef.current?.contentWindow?.focus();
            }} />
  </div>, document.body);
}
