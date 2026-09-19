import { useEffect, useRef } from "react";
import * as Y from "yjs";
import type { Awareness } from "y-protocols/awareness";
import { basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { type Completion, type CompletionContext } from "@codemirror/autocomplete";
import { yCollab } from "y-codemirror.next";
import { fileText } from "./lib/collab";
import { API_NAMES, ATTR_NAMES, PY_KEYWORDS } from "./lib/pixelpad-api";

/* The offline IDE suggests as you type, and a child who has met key_is_pressed
   once can find it again by typing "key". The words are the offline IDE's own
   lists, cut out of the vendored file by tools/build-engine.mjs - see
   src/lib/pixelpad-api.js - so neither editor drifts from the engine.

   Ordered the way that file orders them: what the engine can do first, then
   what a thing has on it, then Python. CodeMirror keeps that order for equally
   good matches, which puts sprite() above `str` when a child types "s". */
const GAME_WORDS: Completion[] = [
  ...API_NAMES.map((label: string) => ({ label, type: "function" })),
  ...ATTR_NAMES.map((label: string) => ({ label, type: "property" })),
  ...PY_KEYWORDS.map((label: string) => ({ label, type: "keyword" })),
];

function gameWords(context: CompletionContext) {
  const word = context.matchBefore(/[A-Za-z_][A-Za-z0-9_]*/);
  // Nothing typed yet: only offer the whole list if the child asked for it
  // with Ctrl-Space. Popping up over an empty line is noise.
  if (!word || (word.from === word.to && !context.explicit)) return null;
  return { from: word.from, options: GAME_WORDS, validFor: /^[A-Za-z0-9_]*$/ };
}

function langFor(file: string) {
  if (file.endsWith(".css")) return css();
  if (file.endsWith(".js")) return javascript();
  // PixelPad panels are Python, and indentation is the one thing that breaks a
  // game at this age - so it gets a mode that indents rather than plain text.
  if (file.endsWith(".py")) {
    const py = python();
    return [py, py.language.data.of({ autocomplete: gameWords })];
  }
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
      // basicSetup leaves Tab unbound on purpose (Tab normally moves focus for
      // accessibility). In a kids' code editor Tab-to-indent is expected, so
      // bind it: Tab indents the line/selection, Shift-Tab removes a level.
      // Undo/redo, find, select-all, comment-toggle (Ctrl-/) and move/copy line
      // (Alt-Arrows) already come from basicSetup's default keymaps.
      keymap.of([indentWithTab]),
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
