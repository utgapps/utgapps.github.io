import { useState } from "react";
import { ENTRY_FILE, openOutside, type PreviewMessage } from "./preview";

/* Which page of a web project the preview is showing, and the ones before it.

   A link in the running page cannot load another page itself: the frame is a
   srcdoc document with no server behind it, and its links resolve against the
   classroom app's own address. So the page asks - a "navigate" message - and
   the preview builds that page from the project's files, the way a browser
   would fetch it. Back walks the pages the student came through. */
export function usePreviewPages() {
  const [pages, setPages] = useState<string[]>([ENTRY_FILE]);
  const page = pages[pages.length - 1];
  const fileOf = (entry: string) => entry.split("#")[0];

  /** Acts on a request from the running page. Returns the console line that
   *  says what happened, or null when the message was not a request at all. */
  function follow(message: PreviewMessage, files: Record<string, string>): PreviewMessage | null {
    if (message.kind === "navigate") {
      // The frame said which file; check it, because anything in there can post.
      if (!(fileOf(message.text) in files)) return null;
      setPages((before) => [...before, message.text]);
      return { ...message, kind: "system", text: `Opened ${fileOf(message.text)}` };
    }
    if (message.kind === "open") {
      return openOutside(message.text)
        ? { ...message, kind: "system", text: `Opened ${message.text} in a new tab` }
        : { ...message, kind: "error", text: `Could not open ${message.text} - the browser blocked the new tab, or it is not a web address.` };
    }
    return null;
  }

  return {
    page,
    canGoBack: pages.length > 1,
    follow,
    back: () => setPages((before) => (before.length > 1 ? before.slice(0, -1) : before)),
    /** Run again stays on the page being worked on, as a reload would, unless
     *  that file has gone. Stop, or a first run, starts from index.html. */
    keep: (files: Record<string, string>) => setPages((before) => (fileOf(before[before.length - 1]) in files ? before : [ENTRY_FILE])),
    reset: () => setPages([ENTRY_FILE]),
  };
}
