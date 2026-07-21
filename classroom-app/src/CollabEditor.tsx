import { useEffect, useRef } from "react";
import * as Y from "yjs";
import type { Awareness } from "y-protocols/awareness";
import { basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { yCollab } from "y-codemirror.next";
import { fileText } from "./lib/collab";

function langFor(file: string) {
  if (file.endsWith(".css")) return css();
  if (file.endsWith(".js")) return javascript();
  return html();
}

// A CodeMirror editor bound to one file's Y.Text. Remote cursors/selections
// are rendered by yCollab from the shared awareness (their color + name).
export function CollabEditor({ doc, file, awareness, readOnly }: {
  doc: Y.Doc; file: string; awareness: Awareness; readOnly?: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!host.current) return;
    const ytext = fileText(doc, file);
    const extensions = [
      basicSetup,
      langFor(file),
      EditorView.lineWrapping,
      yCollab(ytext, awareness),
    ];
    if (readOnly) extensions.push(EditorState.readOnly.of(true), EditorView.editable.of(false));
    const view = new EditorView({
      state: EditorState.create({ doc: ytext.toString(), extensions }),
      parent: host.current,
    });
    return () => view.destroy();
  }, [doc, file, awareness, readOnly]);
  return <div className="cm-host" ref={host} />;
}
