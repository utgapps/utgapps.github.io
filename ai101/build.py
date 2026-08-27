"""AI101 course builder.

Everything in this folder is generated. Never hand-edit the HTML - edit
course.py and re-run this. Same contract as camp-coding-projects/workbooks.py.

    python build.py

Emits, all derived from the one WEEKS structure in course.py:

    index.html          course hub
    week-01..15.html    the code every student should have by the end of week N
    teacher.html        full teaching curriculum, minute by minute
    workbook.html       15-chapter printable student homework book
    slides/week-NN.pptx one deck per week (needs `pip install python-pptx`)

Milestones are REPLAYED from the week ops rather than stored, so week N is
provably week N-1 plus that week's changes - they cannot drift apart, and
neither can the teacher guide, the homework or the slides.
"""

import difflib
import html
import json
import os
import re
import sys

import course

HERE = os.path.dirname(os.path.abspath(__file__))
SLIDES_DIR = os.path.join(HERE, "slides")

LOGO = "https://s3.us-west-1.amazonaws.com/utg.pictures.videos/UTGWeb/utglogoh.svg"
FONT = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800&display=swap" rel="stylesheet">'
FILES = ["index.html", "style.css", "script.js"]
LINE_BUDGET = 1000


# --------------------------------------------------------------------------
# replaying the weeks
# --------------------------------------------------------------------------

def blocks_at(upto):
    """Ordered [(block_id, lines)] per file at the END of week `upto` (1-based)."""
    blocks = {name: [] for name in FILES}
    for week in course.WEEKS[:upto]:
        for kind, filename, block_id, lines in week["ops"]:
            existing = [i for i, (bid, _) in enumerate(blocks[filename]) if bid == block_id]
            if kind == "add":
                if existing:
                    raise SystemExit(f"week {week['n']}: block '{block_id}' already exists in {filename}; use SET")
                blocks[filename].append((block_id, lines))
            elif kind == "set":
                if not existing:
                    raise SystemExit(f"week {week['n']}: block '{block_id}' not in {filename} yet; use ADD")
                blocks[filename][existing[0]] = (block_id, lines)
            else:
                raise SystemExit(f"week {week['n']}: unknown op '{kind}'")
    # Sort into reading order, not authoring order. Week 2 teaches the submit
    # handler and week 3 the config it depends on, but the FILE has to put the
    # config first or students read a page that uses things it has not defined.
    out = {}
    for name in FILES:
        order = course.ORDER[name]
        unknown = [bid for bid, _ in blocks[name] if bid not in order]
        if unknown:
            raise SystemExit(f"{name}: block(s) {unknown} missing from course.ORDER[{name!r}]")
        out[name] = sorted(blocks[name], key=lambda pair: order.index(pair[0]))
    return out


def state_at(upto):
    """File contents as they stand at the END of week `upto`."""
    return {name: "\n".join(line for _, lines in ordered for line in lines)
            for name, ordered in blocks_at(upto).items()}


def block_spans(upto):
    """{filename: {block_id: (first_line, last_line)}} at the end of week `upto`.

    This is what lets the teacher guide say "type into script.js, lines 34-52"
    and be right. The numbers come out of the same replay that produces the
    milestone pages, so they cannot drift from what students actually see.
    """
    spans = {}
    for name, ordered in blocks_at(upto).items():
        spans[name] = {}
        line = 1
        for block_id, lines in ordered:
            spans[name][block_id] = (line, line + len(lines) - 1)
            line += len(lines)
    return spans


def week_ops(week):
    """{(filename, block_id): 'add' | 'set'} for one week."""
    return {(filename, block_id): kind for kind, filename, block_id, _ in week["ops"]}


MAX_STEP_LINES = 6   # the PixelPad workbooks' rule, and it holds up here too

# A trailing comma is NOT here on purpose: between two object properties it is a
# natural place to stop, and without that askAI's fetch call has no legal break
# point at all and lands as one fourteen-line wall.
_OPENERS = ("{", "(", "[", "=>", "&&", "||", "+")
_HEADERS = ("if", "for", "while", "function", "async", "try", "catch", "else", "return")


def _is_code(line):
    """Does this line count toward the six? Blanks and comments do not -
    they are the explanation, not the thing a student has to get right."""
    stripped = line.strip()
    return bool(stripped) and not stripped.startswith("//") and not stripped.startswith("/*")


def _depth_before(lines):
    """Nesting depth at the start of each line, relative to the block."""
    depth, out = 0, []
    for line in lines:
        code = line.split("//")[0]
        out.append(depth)
        depth += code.count("{") + code.count("(") + code.count("[")
        depth -= code.count("}") + code.count(")") + code.count("]")
    return out


def _can_break_before(lines, index, depths, css):
    """Never strand an `if` from its body, cut a half-finished expression, or
    start a piece on a bare closing brace."""
    if index == 0 or index >= len(lines):
        return False

    # A CSS rule is one idea to a beginner - never cut one open.
    if css and depths[index] > 0:
        return False

    # Starting a chunk with "}," or "})" reads as gibberish on a slide.
    following = lines[index].strip()
    if following.startswith(("}", ")", "]")):
        return False

    previous = lines[index - 1].strip()
    if not previous:
        return True                       # a blank line is the nicest place to stop
    if previous.endswith(_OPENERS):
        return False
    if previous.startswith("//"):
        return False                      # a comment belongs with what it describes
    first_word = previous.split("(")[0].split()[0] if previous.split() else ""
    if first_word in _HEADERS and not previous.endswith((";", "}")):
        return False
    return True


def chunk_block(lines, filename=""):
    """Split a block into pieces of at most six code lines each.

    Six is the cap the PixelPad workbooks use, and the reason is the same: past
    that a student is copying rather than following. Split points are chosen so
    an `if` never gets separated from the body it runs, a comment always travels
    with the code it explains, a CSS rule is never cut open, and no piece opens
    on a bare closing brace.

    An indivisible run with no legal break point may exceed six - the same
    allowance RULES.md makes for a single long `if` block.
    """
    css = filename.endswith(".css")
    depths = _depth_before(lines)
    chunks, current, code_count = [], [], 0
    for index, line in enumerate(lines):
        if code_count >= MAX_STEP_LINES and _can_break_before(lines, index, depths, css):
            # A chunk should not END on blank lines - they introduce whatever
            # comes next, so they travel forward rather than being dropped.
            carry = []
            while current and not current[-1].strip():
                carry.insert(0, current.pop())
            chunks.append(current)
            current, code_count = list(carry), 0
        current.append(line)
        if _is_code(line):
            code_count += 1
    if current:
        chunks.append(current)

    # Fold any all-blank chunk into its neighbour so no line is ever lost.
    merged = []
    for chunk in chunks:
        if merged and not any(line.strip() for line in chunk):
            merged[-1].extend(chunk)
        else:
            merged.append(list(chunk))
    assert [line for chunk in merged for line in chunk] == list(lines), \
        "chunking lost or reordered lines"
    return merged


def block_code(week_n, filename, block_id):
    """(first_line_number, lines, changed_line_numbers, removals) for one block."""
    start, end = block_spans(week_n)[filename][block_id]
    lines = state_at(week_n)[filename].split("\n")[start - 1:end]
    gone = removed_in_blocks(week_n)[filename].get(block_id, {})
    return start, lines, changed_lines(week_n)[filename], gone


def code_table(filename, start, lines, marks, ident=None, tag="", gone=None):
    """One styled snippet: file chip, line range, the code, changes accented.

    Deleted lines are drawn back in where they used to be, struck through, so a
    week that removes something can say so. Green alone cannot.
    """
    gone = gone or {}
    rows = []

    def removals(at):
        return "".join(
            f'<tr class="gone"><td class="ln">{at}</td>'
            f'<td class="src">{esc(text) or "&nbsp;"}</td></tr>'
            for text in gone.get(at, []))

    for offset, line in enumerate(lines):
        number = start + offset
        rows.append(removals(number))
        cls = ' class="new"' if number in marks else ""
        rows.append(f'<tr{cls}><td class="ln">{number}</td>'
                    f'<td class="src">{esc(line) or "&nbsp;"}</td></tr>')
    rows.append(removals(start + len(lines)))
    end = start + len(lines) - 1
    rng = f"line {start}" if start == end else f"lines {start}&ndash;{end}"
    copy = f'<button data-copy="{ident}">Copy</button>' if ident else ""
    table_id = f' id="{ident}"' if ident else ""
    return (f'<div class="snip"><div class="snip-head">'
            f'<span class="file">{esc(filename)}</span><span class="rng">{rng}</span>'
            f'<span class="tag">{tag}</span>{copy}</div>'
            f'<div class="code"><table{table_id}>{"".join(rows)}</table></div></div>')


def render_ask(ask):
    if not ask:
        return ""
    question, listening = ask
    return (f'<div class="say"><b>Ask the room:</b> {esc(question)}'
            f'<span class="listen">Listening for: {esc(listening)}</span></div>')


def placement(week_n, filename, block_id, kind):
    """Where in the file this block goes, said in a way you can act on.

    A teacher works down the guide, but the guide's order is the order things
    make sense in, not the order they sit in the file - week 5 teaches the
    error check inside askAI and only then the explain() function that lives
    above it. Line numbers alone do not help there, because they are the
    end-of-week numbers and the file is still growing. Naming the neighbour
    does: "goes just above function explain" is unambiguous at any point.
    """
    if kind == "set":
        start, end = block_spans(week_n)[filename][block_id]
        where = f"line {start}" if start == end else f"lines {start}&ndash;{end}"
        return (f"Already in <b>{esc(filename)}</b> at {where}. "
                f"<b>Only the green lines change</b> &mdash; everything else stays exactly as it is.")

    ordered = [bid for bid, _ in blocks_at(week_n)[filename]]
    index = ordered.index(block_id)
    if index == 0:
        return f"New. Goes at the very top of <b>{esc(filename)}</b>, above everything else."
    if index == len(ordered) - 1:
        return f"New. Goes at the end of <b>{esc(filename)}</b>."
    following = dict(blocks_at(week_n)[filename])[ordered[index + 1]]
    anchor = next((line.strip() for line in following if line.strip()), "")
    # Trim on a word boundary so the anchor never ends mid-word.
    trimmed = esc(anchor) if len(anchor) <= 62 else esc(anchor[:62].rsplit(" ", 1)[0]) + "&hellip;"
    return (f"New. Goes in <b>{esc(filename)}</b>, just above the line "
            f"<code>{trimmed}</code>")


def render_step(week, beat):
    """A typing beat, broken into pieces of at most six code lines.

    Each piece gets its own sentence of explanation, so the room stops and
    talks roughly every half-dozen lines instead of copying twenty in silence.
    """
    filename, block_id = beat["file"], beat["block"]
    start, lines, marks, gone = block_code(week["n"], filename, block_id)
    chunks = chunk_block(lines, filename)
    notes = beat.get("notes") or []

    if len(notes) != len(chunks):
        offsets, cursor = [], start
        for chunk in chunks:
            offsets.append(f"{cursor}-{cursor + len(chunk) - 1}")
            cursor += len(chunk)
        raise SystemExit(
            f"week {week['n']} STEP {filename}:{block_id} splits into {len(chunks)} "
            f"chunk(s) at lines {', '.join(offsets)}, but you wrote {len(notes)} note(s). "
            f"Add one short note per chunk."
        )

    kind = week_ops(week).get((filename, block_id))
    tag = {"add": "new this week", "set": "replaces what is there"}.get(kind, "already written")
    pieces, cursor = [], start
    for index, (chunk, note) in enumerate(zip(chunks, notes)):
        last = cursor + len(chunk) - 1
        final = index == len(chunks) - 1
        touched = any(number in marks for number in range(cursor, last + 1))
        # A line removed from the end of a block sits at the number of whatever
        # follows it, so only the last chunk reaches past its own end - or a
        # deletion at a chunk boundary is drawn twice.
        here = {at: text for at, text in gone.items()
                if cursor <= at <= (last + 1 if final else last)}
        if kind == "set" and not touched and not here:
            # Do not print twenty lines a student already has just to reach the
            # six that changed. Say what is there, say to leave it, move on.
            span = f"Line {cursor}" if cursor == last else f"Lines {cursor}&ndash;{last}"
            pieces.append(f'<p class="unchanged"><b>{span} do not change</b> &mdash; '
                          f'skip past them. <span class="muted">{note}</span></p>')
        else:
            # `here` is why the skip above also tests for removals. Week 4's
            # only edit to the models block is that a line LEAVES it, and
            # nothing in the block goes green - so on the count of changed
            # lines alone this printed "lines 29-38 do not change" for the one
            # block the week is about.
            pieces.append(code_table(filename, cursor, chunk, marks, tag=tag, gone=here))
            pieces.append(f'<p class="chunk-note">{note}</p>')
        cursor += len(chunk)

    at = f'<span class="at">{esc(beat["at"])}</span>' if beat.get("at") else ""
    lead = f'<p class="step-lead">{placement(week["n"], filename, block_id, kind)}</p>'
    return (f'<section class="beat step"><h4>{at}{esc(beat["title"])}</h4>{lead}'
            f'{"".join(pieces)}{render_ask(beat.get("ask"))}</section>')


def render_flow(week):
    out = []
    for beat in week["flow"]:
        if beat["kind"] == "step":
            out.append(render_step(week, beat))
        else:
            at = f'<span class="at">{esc(beat["at"])}</span>' if beat.get("at") else ""
            body = "".join(f"<p>{para}</p>" for para in beat["body"])
            out.append(f'<section class="beat"><h4>{at}{esc(beat["title"])}</h4>'
                       f'{body}{render_ask(beat.get("ask"))}</section>')
    return "".join(out)


def changed_lines(upto):
    """Line numbers (1-based, per file) that are new or changed this week.

    Computed by diffing the replayed state rather than tracked by hand, so a
    week that rewrites an earlier function highlights correctly without the
    author having to say so.
    """
    before = state_at(upto - 1) if upto > 1 else {name: "" for name in FILES}
    after = state_at(upto)
    marks = {}
    for name in FILES:
        old = before[name].split("\n") if before[name] else []
        new = after[name].split("\n") if after[name] else []
        hits = set()
        matcher = difflib.SequenceMatcher(None, old, new, autojunk=False)
        for tag, _i1, _i2, j1, j2 in matcher.get_opcodes():
            if tag in ("insert", "replace"):
                hits.update(range(j1 + 1, j2 + 1))
        marks[name] = hits
    return marks


def line_sig(text):
    """A line's CODE signature: whitespace collapsed and any comment stripped, so
    two lines match when only their indentation or comments differ. It lets us
    tell a line that truly went away from one that merely moved or lost a comment.
    A comment here is set off by two-plus spaces or starts the line, so a URL's
    '://' survives. Deliberately simple, matching the light comment style the
    decks use. A whole-line comment returns '' - it has no code to match on."""
    text = re.sub(r"\s{2,}//.*$", "", text)   # a trailing, space-aligned comment
    text = re.sub(r"^\s*//.*$", "", text)     # a whole-line comment
    return " ".join(text.split())


def removed_in_blocks(upto):
    """{filename: {block_id: {line_in_new_file: [text, ...]}}} - deletions,
    attributed to the block they were removed FROM.

    Green-only highlighting cannot show a deletion: a removed line is not in
    the new file to colour. Week 4 drops the listModels() call and the page had
    no way to say so, leaving a student comparing their file against the page
    with one extra line and no explanation.

    Diffed per BLOCK, not per file. Across a whole file, difflib pairs a
    deletion with whatever was inserted nearby and calls the result "replace" -
    week 4's dropped call came back as replace(old[39:40] -> new[39:58]),
    tangled up with the askAI block appearing above it. Inside a single block
    there is nothing to tangle with, so a delete is unambiguously a delete.

    The block id is kept rather than only the line number, because a line
    dropped from the END of a block sits at the first line number of whatever
    follows it. Week 4's removal is at position 39, which is one past `models`
    AND the first line of `ask` - a range test cannot tell those apart, and
    showing it on both is wrong twice over.
    """
    if upto <= 1:
        return {name: {} for name in FILES}
    before = {name: dict(blocks) for name, blocks in blocks_at(upto - 1).items()}
    after = blocks_at(upto)
    spans = block_spans(upto)
    gone = {}
    for name in FILES:
        per_block = {}
        for block_id, new_lines in after[name]:
            old_lines = before[name].get(block_id)
            if old_lines is None or old_lines == new_lines:
                continue
            block_start = spans[name][block_id][0]
            new_sigs = {sig for sig in (line_sig(l) for l in new_lines) if sig}
            matcher = difflib.SequenceMatcher(None, old_lines, new_lines, autojunk=False)
            for tag, i1, i2, j1, j2 in matcher.get_opcodes():
                # A line the student must take out - whether it simply vanished
                # (a delete) or was swapped for something else (a replace). The
                # trap is a block that is only re-indented or re-commented:
                # difflib calls every such line "replace", and striking the ones
                # that really survive - week 5 wraps three lines in try/catch,
                # unchanged but indented - would bury the line that truly went
                # AND make them retype code that did not change. So compare by
                # CODE SIGNATURE (whitespace collapsed, comments dropped) and
                # strike a line only when nothing with its signature remains.
                if tag not in ("delete", "replace"):
                    continue
                dropped = [line for line in old_lines[i1:i2]
                           if line.strip() and line_sig(line) not in new_sigs]
                if dropped:
                    per_block.setdefault(block_id, {}).setdefault(
                        block_start + j1, []).extend(dropped)
        gone[name] = per_block
    return gone


def removed_lines(upto):
    """{filename: {line_in_new_file: [text, ...]}} - the same deletions, keyed
    only by position, for the whole-file views where no block is in play."""
    flat = {}
    for name, per_block in removed_in_blocks(upto).items():
        at = {}
        for positions in per_block.values():
            for position, texts in positions.items():
                at.setdefault(position, []).extend(texts)
        flat[name] = at
    return flat


def line_count(files):
    return sum(len(text.split("\n")) for text in files.values() if text)


# --------------------------------------------------------------------------
# shared page furniture
# --------------------------------------------------------------------------

def esc(text):
    """HTML-escape, and force the result to pure ASCII.

    Every page this builder writes is 7-bit clean. Non-ASCII becomes a numeric
    character reference, which renders identically but survives being opened by
    something that guesses the encoding wrong - Word, an old editor, a
    PowerShell round-trip. These files get printed, emailed and dropped into
    Google Drive, so that is a real risk, and a mojibake page in front of a
    class is worse than a slightly longer file.
    """
    return html.escape(str(text)).encode("ascii", "xmlcharrefreplace").decode("ascii")


def guard(tool="ai101", up="../"):
    """The site access gate. `up` is the path back to the site root - the slide
    decks sit one folder deeper than everything else this builder writes."""
    return (
        '<script>window.UTG_GUARD="%(up)s";window.UTG_TOOL="%(tool)s";'
        "document.write('<script src=\"%(up)sclass-codes.js?t='+Date.now()+'\"><\\/script>');</script>\n"
        '<script src="%(up)sguard.js"></script>' % {"tool": tool, "up": up}
    )


CSS = """
:root{--brand:#01aefd;--brand-dark:#0294d8;--brand-ink:#0a6299;--brand-tint:#e7f7ff;
--gold:#ffd633;--ink:#1f2a37;--muted:#6b7787;--bg:#eef2f7;--surface:#fff;--border:#dbe3ec;
--add:#e8f8ec;--add-edge:#37a95d;}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.6 Rubik,system-ui,-apple-system,"Segoe UI",sans-serif}
a{color:var(--brand);text-decoration:none}
.wrap{max-width:1080px;margin:0 auto;padding:26px 22px 80px}
header.site{display:flex;align-items:center;gap:12px;padding:16px 22px;background:var(--surface);border-bottom:1px solid var(--border)}
header.site img{height:26px}
header.site .slash{color:#b8c8ce}
header.site strong{font-size:15px;letter-spacing:.02em}
.eyebrow{color:var(--brand);font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;margin:0 0 10px}
h1{font-size:34px;margin:0 0 10px;line-height:1.2}
h2{font-size:23px;margin:34px 0 12px}
h3{font-size:17px;margin:22px 0 8px}
.lead{color:var(--muted);font-size:17px;max-width:70ch}
.card{background:var(--surface);border:1px solid var(--border);border-radius:9px;padding:20px;margin:16px 0}
.grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(230px,1fr))}
.wk-card{display:block;background:var(--surface);border:1px solid var(--border);border-radius:9px;padding:16px;color:inherit}
.wk-card:hover{border-color:var(--brand)}
.wk-card .n{color:var(--brand);font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}
.wk-card h3{margin:6px 0 4px;font-size:16px}
.wk-card p{margin:0;color:var(--muted);font-size:13px;line-height:1.5}
.pill{display:inline-block;background:var(--brand-tint);color:var(--brand-ink);border-radius:20px;padding:5px 12px;font-size:12px;font-weight:700;margin:0 6px 6px 0}
.tabs{display:flex;gap:0;border-bottom:1px solid var(--border);margin-top:6px}
.tab{border:0;border-right:1px solid var(--border);background:#f7fafb;color:#52707a;padding:10px 14px;font:700 12px Rubik,sans-serif;cursor:pointer}
.tab.active{background:var(--surface);color:var(--brand);box-shadow:inset 0 -2px var(--brand)}
/* ---- code ---- */
.snip{margin:14px 0;border:1px solid #223f49;border-radius:9px;overflow:hidden;background:#0f1b21}
.snip-head{display:flex;align-items:center;gap:10px;padding:9px 14px;background:#16303a;
  color:#9fc4cf;font-size:12px;letter-spacing:.02em}
.snip-head .file{color:#8fd7f0;font:700 12px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.snip-head .rng{color:#6d8c97}
.snip-head .tag{margin-left:auto;color:#6d8c97}
.snip-head button{border:1px solid #33586a;background:transparent;color:#a8ccd8;border-radius:5px;
  padding:4px 10px;font:600 11px Rubik,sans-serif;cursor:pointer}
.snip-head button:hover{border-color:#5f93a8;color:#dff0f6}
.snip .code{overflow:auto;margin:0;padding:10px 0}
.snip table{border-collapse:collapse;width:100%;
  font:13px/1.85 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.snip td{padding:0;white-space:pre;vertical-align:top}
.snip td.ln{width:1%;padding:0 14px 0 16px;text-align:right;color:#44646f;user-select:none}
.snip td.src{color:#d7e6ea;padding-right:18px}
/* new lines get a quiet tint and an accent bar, not a solid block of colour */
.snip tr.new td.src{background:rgba(63,186,110,.12)}
.snip tr.new td.ln{background:rgba(63,186,110,.12);color:#79d3a0;box-shadow:inset 3px 0 #3fba6e}
/* a line this week removes - shown where it used to be, struck through */
.snip tr.gone td.src{background:rgba(201,74,58,.10);color:#e39289;text-decoration:line-through;
  text-decoration-color:rgba(227,146,137,.65)}
.snip tr.gone td.ln{background:rgba(201,74,58,.10);color:#e39289;box-shadow:inset 3px 0 #c94a3a}

.teach-row{margin:14px 0 18px}
.pill.ghost{background:var(--surface);color:var(--brand-ink);border:1px solid var(--border)}
.pill.ghost:hover{border-color:var(--brand);background:var(--brand-tint)}
@media print{.teach-row{display:none}}

/* ---- week anchors and the jump bar ---- */
.chapter{scroll-margin-top:74px}
.jump{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:0 0 18px}
.jump span{font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;
color:var(--muted);margin-right:4px}
.jump a{display:grid;place-items:center;min-width:30px;height:30px;padding:0 7px;
background:var(--surface);border:1px solid var(--border);border-radius:7px;
font-size:13px;font-weight:700;color:var(--brand-ink);text-decoration:none}
.jump a:hover{border-color:var(--brand);background:var(--brand-tint)}
/* Opened inside the classroom the page is already inside a titled panel, so
   the site header, the intro and the print button would only be noise. */
body.embedded header.site,body.embedded .printbtn,body.embedded .jump,
body.embedded footer{display:none}
body.embedded .wrap{padding-top:8px}
@media print{.jump{display:none}}

/* ---- lesson flow ---- */
.beat{margin:0 0 4px;padding:14px 0 14px 20px;border-left:2px solid var(--border)}
.beat:hover{border-left-color:#c3d3dd}
.beat.step{border-left-color:var(--brand)}
.beat h4{margin:0 0 8px;font-size:16.5px;display:flex;align-items:baseline;gap:11px}
.beat h4 .at{color:var(--brand);font:800 11.5px/1 Rubik,sans-serif;letter-spacing:.09em;
  min-width:40px;flex:none;padding-top:2px}
.beat p{margin:0 0 9px;line-height:1.68;max-width:74ch}
.beat p:last-child{margin-bottom:0}
.chunk-note{margin:2px 0 0;color:#3f5764;font-size:14.5px;line-height:1.62;max-width:74ch}
.unchanged{margin:10px 0;padding:9px 13px;border-left:3px solid #c3d3dd;background:#f4f7f9;
  border-radius:0 6px 6px 0;color:#4a5f6b;font-size:13.5px;line-height:1.55;max-width:74ch}
.step-lead{color:var(--muted);font-size:13.5px;margin:0 0 4px}
.note{border-left:3px solid var(--brand);background:var(--brand-tint);padding:12px 14px;margin:14px 0;font-size:14px;border-radius:0 6px 6px 0}
.warn{border-left:3px solid #e9952a;background:#fff8e9;padding:12px 14px;margin:14px 0;font-size:14px;border-radius:0 6px 6px 0}
.bonus{border-left:3px solid var(--gold);background:#fffbea;padding:12px 14px;margin:14px 0;font-size:14px;border-radius:0 6px 6px 0}
.muted{color:var(--muted)}
.nav{display:flex;justify-content:space-between;gap:12px;margin-top:34px;padding-top:18px;border-top:1px solid var(--border)}
footer{color:var(--muted);font-size:13px;padding:24px 22px;text-align:center}
table.plan{width:100%;border-collapse:collapse;margin:10px 0;font-size:14px}
table.plan th,table.plan td{border:1px solid var(--border);padding:8px 10px;text-align:left;vertical-align:top}
table.plan th{background:var(--brand-tint);color:var(--brand-ink);font-size:12px;text-transform:uppercase;letter-spacing:.06em}
table.plan td.t{width:70px;white-space:nowrap;color:var(--muted);font-weight:700}
ul.tight li{margin-bottom:5px}
.say{background:#f6f2fd;border:1px solid #e2d8f6;padding:11px 14px;margin:11px 0 0;
  border-radius:7px;font-size:14.2px;line-height:1.6;max-width:74ch}
.say b{color:#5b3fa0}
.say .listen{display:block;margin-top:5px;color:#6b6280;font-size:13.2px}
@media print{
  @page{size:letter;margin:14mm}
  body{background:#fff}
  header.site,.nav,.snip-head button,.noprint{display:none}
  .beat{break-inside:avoid;page-break-inside:avoid}
  .snip{break-inside:avoid;page-break-inside:avoid}
  .chapter{page-break-before:always;page-break-inside:avoid}
  .chapter:first-of-type{page-break-before:avoid}
  .card,.note,.warn,.bonus{page-break-inside:avoid}
}
html:not(.utg-can-print) .printbtn{display:none}
@media print{html:not(.utg-can-print) body{display:none}}
"""

COPY_JS = """
document.querySelectorAll('[data-copy]').forEach(function(btn){
  btn.addEventListener('click', function(){
    var pre = document.getElementById(btn.getAttribute('data-copy'));
    var text = Array.prototype.map.call(pre.querySelectorAll('td.src'), function(td){ return td.textContent; }).join('\\n');
    navigator.clipboard.writeText(text).then(function(){
      var was = btn.textContent; btn.textContent = 'Copied'; setTimeout(function(){ btn.textContent = was; }, 1400);
    });
  });
});
document.querySelectorAll('[data-tabs]').forEach(function(group){
  group.querySelectorAll('.tab').forEach(function(tab){
    tab.addEventListener('click', function(){
      group.querySelectorAll('.tab').forEach(function(t){ t.classList.remove('active'); });
      tab.classList.add('active');
      var owner = group.parentElement;
      owner.querySelectorAll('[data-pane]').forEach(function(pane){
        pane.style.display = pane.getAttribute('data-pane') === tab.getAttribute('data-for') ? '' : 'none';
      });
    });
  });
});
"""


def page(title, body, extra_js="", tool="ai101"):
    return f"""<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(title)} &middot; UTG Academy</title>
{FONT}
<style>{CSS}</style>
{guard(tool)}
<header class="site"><a href="../"><img src="{LOGO}" alt="UTG Academy"></a><span class="slash">/</span><strong>AI101</strong></header>
{body}
<footer>&copy; 2026 UTG Academy</footer>
<script>{COPY_JS}{extra_js}</script>
"""


def code_block(filename, text, marks, ident, gone=None):
    """A whole file rendered with line numbers, this week's changes accented."""
    label = "green = new" + (", struck through = deleted" if gone else "") + " this week"
    return code_table(filename, 1, text.splitlines(), marks,
                      ident=ident, tag=label, gone=gone)


def files_view(upto, ident_prefix):
    """The three files as clickable tabs, with the current week highlighted."""
    files = state_at(upto)
    marks = changed_lines(upto)
    gone = removed_lines(upto)
    tabs = "".join(
        f'<button class="tab{" active" if i == 0 else ""}" data-for="{ident_prefix}-{i}">{esc(name)}</button>'
        for i, name in enumerate(FILES)
    )
    panes = "".join(
        f'<div data-pane="{ident_prefix}-{i}"{"" if i == 0 else ' style="display:none"'}>'
        f'{code_block(name, files[name], marks[name], f"{ident_prefix}-code-{i}", gone[name])}</div>'
        for i, name in enumerate(FILES)
    )
    return f'<div class="tabs" data-tabs>{tabs}</div>{panes}'


# --------------------------------------------------------------------------
# the four deliverables
# --------------------------------------------------------------------------

def build_index():
    cards = "".join(
        f'<a class="wk-card" href="week-{w["n"]:02d}.html"><span class="n">Week {w["n"]}</span>'
        f'<h3>{esc(w["title"])}</h3><p>{esc(w["big_idea"])}</p></a>'
        for w in course.WEEKS
    )
    body = f"""<div class="wrap">
<p class="eyebrow">15-week course</p>
<h1>{esc(course.COURSE_TITLE)}</h1>
<p class="lead">{esc(course.COURSE_BLURB)}</p>
<div class="card">
  <h3 style="margin-top:0">What you are building</h3>
  <p class="muted">{esc(course.PROJECT_BLURB)}</p>
  <p><a class="pill" href="teacher.html">Teacher curriculum</a>
     <a class="pill" href="workbook.html">Student homework book</a>
     <a class="pill" href="../classroom/">Open the code editor</a></p>
  <p class="muted" style="margin:10px 0 0;font-size:13px">Each week page carries that week&rsquo;s
  slides and links straight to its lesson plan. In the classroom, opening a week gives the teacher
  both without leaving the room.</p>
</div>
<div class="warn"><h3 style="margin-top:0">Before you start &mdash; read this</h3>{course.DISCLAIMER}</div>
<h2>The weeks</h2>
<div class="grid">{cards}</div>
</div>"""
    write("index.html", page(course.COURSE_TITLE, body))


def build_weeks():
    for index, week in enumerate(course.WEEKS):
        n = week["n"]
        prev = f'<a href="week-{n-1:02d}.html">&larr; Week {n-1}</a>' if n > 1 else "<span></span>"
        nxt = f'<a href="week-{n+1:02d}.html">Week {n+1} &rarr;</a>' if n < len(course.WEEKS) else "<span></span>"
        concepts = "".join(f'<span class="pill">{esc(c)}</span>' for c in week["new_concepts"])
        total = line_count(state_at(n))
        dropped = sum(len(v) for name in FILES for v in removed_lines(n)[name].values())
        legend = (f"The green lines are what is new since week {n-1}."
                  if n > 1 else "Everything here is new - this is week 1.")
        if dropped:
            legend += (" The struck-through line is one you DELETE this week - take it out."
                       if dropped == 1 else
                       f" The {dropped} struck-through lines are ones you DELETE this week"
                       " - take them out.")
        if n > 1:
            legend += " Everything else you already had."
        bonus = ""
        if week.get("bonus"):
            bonus = (
                f'<div class="bonus"><strong>Finished early? {esc(week["bonus"]["title"])}</strong>'
                f'<p style="margin:6px 0 0">{esc(week["bonus"]["body"])}</p>'
                '<p class="muted" style="margin:6px 0 0;font-size:13px">Nothing in a later week depends on this, '
                'so it is safe to skip and safe to keep.</p></div>'
            )
        body = f"""<div class="wrap">
<p class="eyebrow">Week {n} of {len(course.WEEKS)}</p>
<h1>{esc(week["title"])}</h1>
<p class="lead">{esc(week["big_idea"])}</p>
<p>{concepts}</p>
<p class="teach-row"><a class="pill" href="slides/week-{n:02d}.html">Slides for week {n}</a>
   <a class="pill ghost" href="slides/week-{n:02d}.pptx">.pptx</a>
   <a class="pill ghost" href="teacher.html#week-{n}">Lesson plan for week {n}</a></p>
<div class="note"><strong>Where you should be by the end of this week.</strong>
{legend}
Your project is now {total} lines.</div>
{bonus}
<h2>Your code after week {n}</h2>
{files_view(n, f"w{n}")}
<div class="nav">{prev}{nxt}</div>
</div>"""
        write(f"week-{n:02d}.html", page(f"Week {n} · {week['title']}", body))


def build_teacher():
    sections = []
    for week in course.WEEKS:
        spans = block_spans(week["n"])
        # An at-a-glance list of every edit the week makes, straight from the ops.
        typed = "".join(
            '<tr><td><b>{f}</b></td><td>{r}</td><td>{k}</td></tr>'.format(
                f=esc(filename),
                r=("line {0}".format(spans[filename][block_id][0])
                   if spans[filename][block_id][0] == spans[filename][block_id][1]
                   else "lines {0}&ndash;{1}".format(*spans[filename][block_id])),
                k="type it in fresh" if kind == "add" else "replace what is already there")
            for kind, filename, block_id, _ in week["ops"]
        )
        typed_table = (
            '<div class="card"><strong>Everything typed this week</strong>'
            '<table class="plan"><tr><th>File</th><th>Where</th><th>What to do</th></tr>'
            f'{typed}</table>'
            '<p class="muted" style="margin:8px 0 0;font-size:13px">Line numbers are as the file '
            'stands at the END of this week, which is what the student sees on the week page. '
            'Work top to bottom and they will line up.</p></div>'
            if typed else '<div class="card"><strong>No new code this week.</strong></div>'
        )
        errors = "".join(
            f"<li><strong>{esc(sym)}</strong> &mdash; {esc(fix)}</li>" for sym, fix in week["errors"]
        )
        bonus = ""
        if week.get("bonus"):
            bonus = (f'<div class="bonus"><strong>Bonus for fast finishers: {esc(week["bonus"]["title"])}</strong>'
                     f'<p style="margin:6px 0 0">{esc(week["bonus"]["body"])}</p></div>')
        sections.append(f"""<section class="chapter" id="week-{week["n"]}">
<h2>Week {week["n"]} &middot; {esc(week["title"])}</h2>
<p class="lead">{esc(week["big_idea"])}</p>
<div class="card"><strong>They leave today able to:</strong>
<ul class="tight">{"".join(f"<li>{esc(o)}</li>" for o in week["objectives"])}</ul></div>
{typed_table}
<h3>How the hour goes</h3>
{render_flow(week)}
<h3>What will go wrong</h3>
<ul class="tight">{errors}</ul>
{bonus}
<h3>Homework set today</h3>
<ul class="tight">{"".join(f"<li>{esc(c['task'])}</li>" for c in week["homework"])}</ul>
</section>""")
    jump = "".join(
        f'<a href="#week-{week["n"]}">{week["n"]}</a>' for week in course.WEEKS
    )
    body = f"""<div class="wrap">
<p class="eyebrow">Teacher curriculum</p>
<h1>{esc(course.COURSE_TITLE)}</h1>
<p class="lead">Fifteen one-hour lessons. Every hour is built so you are talking for well under half of it.</p>
<nav class="jump" aria-label="Jump to a week"><span>Week</span>{jump}</nav>
<button class="printbtn pill" onclick="window.print()">Print to PDF</button>
<div class="warn"><h3 style="margin-top:0">Say this in week 1</h3>{course.DISCLAIMER}</div>
<div class="card">
  <h3 style="margin-top:0">How to run this course</h3>
  {course.TEACHER_PREAMBLE}
</div>
{"".join(sections)}
</div>"""
    # ?embed=1 strips the page furniture. The browser handles #week-N on its
    # own, but only if the element exists when it looks - so nudge it on load
    # too, and again on a hash change, which is how the panel switches weeks
    # without reloading the frame.
    embed_js = (
        "if(new URLSearchParams(location.search).has('embed'))"
        "document.body.classList.add('embedded');"
        "function utgJump(){var id=location.hash.slice(1);if(!id)return;"
        "var el=document.getElementById(id);if(el)el.scrollIntoView();}"
        "addEventListener('load',utgJump);addEventListener('hashchange',utgJump);"
    )
    write("teacher.html", page("Teacher curriculum", body, extra_js=embed_js))


def build_workbook():
    chapters = []
    for week in course.WEEKS:
        challenges = "".join(
            f'<div class="card"><strong>Challenge {i}. {esc(c["task"])}</strong>'
            f'<p style="margin:8px 0 0">{esc(c["detail"])}</p>'
            f'<p class="muted" style="margin:8px 0 0;font-size:13px"><strong>Done when:</strong> {esc(c["done"])}</p></div>'
            for i, c in enumerate(week["homework"], start=1)
        )
        recap = "".join(f"<li>{esc(r)}</li>" for r in week["recap"])
        chapters.append(f"""<section class="chapter">
<p class="eyebrow">Chapter {week["n"]}</p>
<h2>{esc(week["title"])}</h2>
<p class="lead">{esc(week["big_idea"])}</p>
<h3>What you learned</h3>
<ul class="tight">{recap}</ul>
<h3>Words to know</h3>
<p>{"".join(f'<span class="pill">{esc(c)}</span>' for c in week["new_concepts"])}</p>
<h3>Challenges</h3>
{challenges}
<h3>Stuck?</h3>
<p class="muted">Open <a href="week-{week["n"]:02d}.html">week {week["n"]}'s code</a> and compare it with yours line by line.
The green lines are the ones added that week.</p>
</section>""")
    body = f"""<div class="wrap">
<p class="eyebrow">Student homework book</p>
<h1>{esc(course.COURSE_TITLE)}</h1>
<p class="lead">One chapter per week. Do the challenges on your own project - there is no separate file to make.</p>
<button class="printbtn pill" onclick="window.print()">Print to PDF</button>
<div class="warn"><h3 style="margin-top:0">Read this first</h3>{course.DISCLAIMER}</div>
{"".join(chapters)}
</div>"""
    write("workbook.html", page("Student homework book", body))


CODE_LINES_PER_SLIDE = 15   # beyond this the type is too small to read from the back


def code_chunks(week_n, refs):
    """[(filename, first_line, lines, changed)] split into slide-sized pieces.

    A thirty-line function will not fit on one readable slide, so it becomes two
    slides rather than shrinking to eight point. Line numbers keep running, so
    a student can always match the slide against their own file.
    """
    chunks = []
    for filename, block_id in refs:
        start, lines, marks, gone = block_code(week_n, filename, block_id)
        pieces = list(range(0, len(lines), CODE_LINES_PER_SLIDE)) or [0]
        for offset in pieces:
            piece = lines[offset:offset + CODE_LINES_PER_SLIDE]
            first = start + offset
            last = first + len(piece) - 1
            # A deletion belongs to the piece holding the line it used to sit
            # at. The final piece also takes anything past its end, so a block
            # that ends by removing its last line still says so.
            final = offset == pieces[-1]
            here = {at: text for at, text in gone.items()
                    if first <= at <= (last + 1 if final else last)}
            chunks.append((filename, first, piece, marks, here))
    return chunks


def notes_for(week_n, filename, block):
    """Per-line notes for a block, this week. A block that changes across weeks
    (ask, submit) keeps a (week, file, block) entry so each week's arrangement
    gets its own notes; blocks that appear once use the plain (file, block) key."""
    return (course.LINE_NOTES.get((week_n, filename, block))
            or course.LINE_NOTES.get((filename, block)))


# A tiny bridge injected at the TOP of a checkpoint page, so it runs before the
# project's own script. It forwards console output, errors and fetch outcomes up
# to the deck, which shows them in a console under the output. That is how a
# silent failure becomes visible: week 4 has no error handling, so a rejected
# request just leaves "thinking..." on screen - here the console says why (a 401
# bad key, or a blocked/failed fetch off the school network).
CP_BRIDGE = """<script>(function () {
  if (window.parent === window) return;            // only when embedded in the deck
  function say(level, parts) {
    try {
      var text = Array.prototype.map.call(parts, function (a) {
        if (a instanceof Error) return a.message;
        if (a && typeof a === 'object') { try { return JSON.stringify(a); } catch (e) { return String(a); } }
        return String(a);
      }).join(' ');
      window.parent.postMessage({ utg: 'cp-log', level: level, text: text }, '*');
    } catch (e) {}
  }
  ['log', 'info', 'warn', 'error'].forEach(function (name) {
    var orig = console[name];
    console[name] = function () { say(name, arguments); if (orig) orig.apply(console, arguments); };
  });
  window.addEventListener('error', function (e) {
    say('error', [e.message + (e.filename ? ' (' + e.filename + ':' + e.lineno + ')' : '')]);
  });
  window.addEventListener('unhandledrejection', function (e) {
    var r = e.reason; say('error', ['Uncaught (in promise) ' + (r && r.message ? r.message : r)]);
  });
  var f = window.fetch;
  if (f) window.fetch = function () {
    var url = (arguments[0] && arguments[0].url) || arguments[0];
    say('net', ['\\u2192 ' + url]);
    return f.apply(this, arguments).then(function (res) {
      say(res.ok ? 'net' : 'error', [(res.ok ? '\\u2190 ' : '\\u2717 ') + res.status + ' ' + url]);
      return res;
    }, function (err) {
      say('error', ['\\u2717 could not reach ' + url + ' \\u2014 ' + (err && err.message || err)]);
      throw err;
    });
  };
})();</script>
"""


def checkpoint_page(week_n):
    """The runnable project at the end of week_n: index.html with its CSS and JS
    inlined, so a deck slide can render exactly what a student should be seeing,
    with a console bridge on top so the deck can show what it logs and where it
    fails. Weeks 1-2 run fully in the slide (no network); weeks that call the AI
    show the interface, and their reply needs the classroom key and network."""
    files = state_at(week_n)
    html = files.get("index.html", "")
    html = html.replace('<link rel="stylesheet" href="style.css">',
                        "<style>\n" + files.get("style.css", "") + "\n</style>")
    html = html.replace('<script src="script.js"></script>',
                        "<script>\n" + files.get("script.js", "") + "\n</script>")
    return CP_BRIDGE + html


def slide_plan(week, seen):
    """Ordered slide descriptors for a week's body (the caller adds the title
    slide). Mutates `seen` - the concept keys already introduced course-wide -
    so a concept is explained only the first time it appears.

    An EXPANDED week gets a short explainer slide before the first line that uses
    a new HTML tag / CSS property / JavaScript idea, and one code slide per line
    with a note. Other weeks keep the chunked format, unchanged."""
    expanded = week["n"] in getattr(course, "EXPANDED_WEEKS", set())
    out = []
    for spec in week["slides"]:
        if spec.get("checkpoint"):
            # A "run it and check" slide: the deck can render the project as it
            # stands at this point, so the class can compare their screen to it.
            out.append(("checkpoint", {"week": spec.get("checkpoint_week", week["n"]),
                                       "title": spec.get("title", "Checkpoint"),
                                       "say": spec.get("say", "")}))
            continue
        out.append(("concept", {"eyebrow": "", "title": spec["title"],
                                 "sub": spec.get("sub", ""), "bullets": spec.get("bullets", [])}))
        refs = spec.get("code")
        if not refs:
            continue
        if not expanded:
            chunks = code_chunks(week["n"], refs)
            for index, (filename, start, lines, marks, gone) in enumerate(chunks, start=1):
                out.append(("chunk", {"file": filename, "start": start, "lines": lines,
                                      "marks": marks, "gone": gone, "part": index, "parts": len(chunks)}))
            continue
        eyebrow_for = {"html": "HTML", "css": "CSS", "js": "JavaScript"}
        delete_notes = getattr(course, "DELETE_NOTES", {})
        for filename, block in refs:
            start, lines, marks, gone = block_code(week["n"], filename, block)
            notes = notes_for(week["n"], filename, block)
            shown = 0

            def emit_deletes(at, context):
                nonlocal shown
                # A new line landing at this spot means the old one is being
                # swapped out, not just cut - say so, and the green "type this"
                # slide for its replacement comes right after.
                replacing = at in marks
                default = ("This line changes - take the old one out; the new "
                           "version is next." if replacing
                           else "Delete this line - take it out.")
                for dropped in gone.get(at, []):
                    out.append(("delete", {"file": filename, "start": start,
                                           "lines": context, "dropped": dropped, "at": at,
                                           "replacing": replacing,
                                           "note": delete_notes.get((filename, block), default)}))
                    shown += 1

            for i, line in enumerate(lines):
                lineno = start + i
                emit_deletes(lineno, lines[:i])   # a line removed from this spot
                if not line.strip():
                    continue
                # Only a line that is NEW or CHANGED this week gets its own "type
                # this" slide; a line carried over from an earlier week just shows
                # as dimmed context. So a rewritten block teaches only its edits.
                if lineno not in marks:
                    continue
                for key in course.line_concepts(filename, line):
                    concept = course.CONCEPTS.get(key)
                    if concept and key not in seen:
                        seen.add(key)
                        kind, title, bullets = concept
                        out.append(("concept", {"eyebrow": eyebrow_for[kind], "title": title,
                                                "sub": "", "bullets": bullets}))
                note = notes[i] if notes and i < len(notes) else ""
                if note is None:
                    continue  # a line deliberately folded into its neighbour
                # Show the block built up so far, with THIS line highlighted, so
                # the student sees exactly where the new line goes.
                out.append(("linectx", {"file": filename, "start": start,
                                        "lines": lines[:i + 1], "hi": i,
                                        "note": note, "marks": marks}))
                shown += 1
            emit_deletes(start + len(lines), lines[:])   # a line removed from the end
            # One slide with the whole chunk together, once it is more than a
            # single line, so they can check theirs matches before moving on.
            if shown > 1:
                whole = lines[:]
                while whole and not whole[-1].strip():
                    whole.pop()
                out.append(("block", {"file": filename, "start": start,
                                      "lines": whole, "marks": marks}))
            # After the chunk is whole, a quick multiple-choice check: a few
            # questions on the code just typed, plus one or two from earlier weeks
            # to keep old ideas fresh. Each is a question slide then a reveal
            # slide. Authored per block in course.QUIZZES.
            for quiz in getattr(course, "QUIZZES", {}).get((week["n"], filename, block), []):
                out.append(("quiz", {"quiz": quiz}))
                out.append(("quizanswer", {"quiz": quiz}))
    return out


def _code_table_html(start, lines, hi, marks):
    """A block of code with line numbers. If hi is set, that row is highlighted
    and the rest are dimmed context; if hi is None, new lines are green."""
    rows = []
    for j, line in enumerate(lines):
        lineno = start + j
        if hi is not None:
            cls = "hi" if j == hi else "ctx"
        else:
            cls = "new" if lineno in marks else ""
        attr = ' class="%s"' % cls if cls else ""
        rows.append('<tr%s><td class="ln">%d</td><td>%s</td></tr>'
                    % (attr, lineno, esc(line) or "&nbsp;"))
    return '<table class="code">%s</table>' % "".join(rows)


def deck_render_html(desc):
    """One deck slide as HTML, for any descriptor slide_plan() produces."""
    kind, d = desc
    if kind == "concept":
        eyebrow = f'<p class="eyebrow">{esc(d["eyebrow"])}</p>' if d.get("eyebrow") else ""
        sub = ""
        if d.get("sub"):
            code_ish = any(mark in d["sub"] for mark in ("(", "{", "[", "=", ".", "/"))
            sub = '<p class="sub{0}">{1}</p>'.format(" mono" if code_ish else "", esc(d["sub"]))
        pts = "".join("<li>{0}</li>".format(esc(pt)) for pt in d.get("bullets", []))
        pts = '<ul class="pts">{0}</ul>'.format(pts) if pts else ""
        return '<section class="slide">{0}<h2>{1}</h2>{2}{3}</section>'.format(
            eyebrow, esc(d["title"]), sub, pts)
    if kind == "checkpoint":
        page = checkpoint_page(d["week"]).replace("</script", "<\\/script")
        cid = "cp%d" % d["week"]
        return ('<section class="slide checkpoint">'
                '<p class="eyebrow">Checkpoint &middot; run it</p>'
                '<h2>{0}</h2><p class="cp-say">{1}</p>'
                '<button class="cp-run" data-cp="{2}">&#9654; Show the output</button>'
                '<div class="cp-out" id="out-{2}"></div>'
                '<script type="text/plain" id="src-{2}">{3}</script>'
                '</section>').format(esc(d["title"]), esc(d["say"]), cid, page)
    if kind in ("quiz", "quizanswer"):
        q = d["quiz"]
        answered = kind == "quizanswer"
        opts = "".join(
            '<li class="{0}">{1}</li>'.format(
                "right" if (answered and i == q["answer"]) else "", esc(opt))
            for i, opt in enumerate(q["options"]))
        tail = ('<p class="quiz-why">{0}</p>'.format(esc(q["why"]))
                if answered else
                '<p class="quiz-hint">Pick one &mdash; the answer is on the next slide.</p>')
        return ('<section class="slide quiz{0}"><p class="eyebrow">{1}</p>'
                '<h2>{2}</h2><ol class="opts">{3}</ol>{4}</section>').format(
                    " answered" if answered else "", "Answer" if answered else "Quick check",
                    esc(q["q"]), opts, tail)
    if kind == "chunk":
        return deck_code_slide(d["file"], d["start"], d["lines"], d["marks"], d["gone"],
                               d["part"], d["parts"])
    if kind == "block":
        return ('<section class="slide dark line whole">'
                '<p class="filebar">All together in {0}</p>{1}'
                '<p class="linenote">That is the whole piece. Check yours looks the '
                'same before moving on.</p></section>').format(
                    esc(d["file"]), _code_table_html(d["start"], d["lines"], None, d["marks"]))
    if kind == "delete":
        rows = ['<tr class="ctx"><td class="ln">{0}</td><td>{1}</td></tr>'.format(
                    d["start"] + j, esc(line) or "&nbsp;") for j, line in enumerate(d["lines"])]
        # Show the real line number of the line to remove (it sits just below the
        # context), not a dash - a student cannot find "the struck line" without
        # the number they see in their own editor.
        rows.append('<tr class="gone hi"><td class="ln">{0}</td><td>{1}</td></tr>'.format(
            d["at"], esc(d["dropped"]) or "&nbsp;"))
        label = "replace a line" if d.get("replacing") else "delete a line"
        return ('<section class="slide dark line del">'
                '<p class="filebar">In {0} <span class="part">{1}</span></p>'
                '<table class="code">{2}</table><p class="linenote">{3}</p></section>').format(
                    esc(d["file"]), label, "".join(rows), esc(d["note"]))
    # a single line in context, with its explanation
    return ('<section class="slide dark line">'
            '<p class="filebar">Type this into {0} <span class="part">line {1}</span></p>'
            '{2}<p class="linenote">{3}</p></section>').format(
                esc(d["file"]), d["start"] + d["hi"],
                _code_table_html(d["start"], d["lines"], d["hi"], d["marks"]),
                esc(d["note"]))


def build_slides():
    try:
        from pptx import Presentation
        from pptx.util import Inches, Pt
        from pptx.dml.color import RGBColor
    except ImportError:
        print("  slides SKIPPED - run: pip install python-pptx")
        return 0
    os.makedirs(SLIDES_DIR, exist_ok=True)
    BRAND = RGBColor(0x01, 0xAE, 0xFD)
    INK = RGBColor(0x1F, 0x2A, 0x37)
    PAPER = RGBColor(0xDC, 0xEC, 0xEF)
    NEW = RGBColor(0x7F, 0xE0, 0xA0)
    GUTTER = RGBColor(0x6D, 0x8C, 0x97)
    DROP = RGBColor(0xF3, 0x92, 0x8B)   # a line taken out this week
    DARK = RGBColor(0x10, 0x21, 0x27)

    def concept_slide(deck, spec, eyebrow=""):
        slide = deck.slides.add_slide(deck.slide_layouts[5])
        slide.shapes.title.text = spec["title"]
        run = slide.shapes.title.text_frame.paragraphs[0].runs[0]
        run.font.size, run.font.bold, run.font.color.rgb = Pt(38), True, INK
        if eyebrow:
            eb = slide.shapes.add_textbox(Inches(0.95), Inches(0.55), Inches(6), Inches(0.5))
            eb.text_frame.text = eyebrow.upper()
            er = eb.text_frame.paragraphs[0].runs[0]
            er.font.size, er.font.bold, er.font.color.rgb = Pt(15), True, BRAND
        body = ([spec["sub"]] if spec.get("sub") else []) + spec.get("bullets", [])
        if not body:
            return
        box = slide.shapes.add_textbox(Inches(0.9), Inches(2.0), Inches(11.5), Inches(4.6))
        frame = box.text_frame
        frame.word_wrap = True
        for i, line in enumerate(body):
            para = frame.paragraphs[0] if i == 0 else frame.add_paragraph()
            is_bullet = line in spec.get("bullets", [])
            para.text = ("• " + line) if is_bullet else line
            para.runs[0].font.size = Pt(24 if is_bullet else 28)
            para.runs[0].font.color.rgb = INK if is_bullet else BRAND
            para.space_after = Pt(14)

    def code_slide(deck, filename, start, lines, marks, gone, part, parts):
        """A dark, monospaced 'type this now' slide, matching the editor."""
        slide = deck.slides.add_slide(deck.slide_layouts[6])   # blank
        bg = slide.background.fill
        bg.solid()
        bg.fore_color.rgb = DARK

        head = slide.shapes.add_textbox(Inches(0.55), Inches(0.3), Inches(12.2), Inches(0.8))
        label = f"Type this into {filename}"
        if parts > 1:
            label += f"  ({part} of {parts})"
        head.text_frame.text = label
        run = head.text_frame.paragraphs[0].runs[0]
        run.font.size, run.font.bold, run.font.color.rgb = Pt(26), True, BRAND

        box = slide.shapes.add_textbox(Inches(0.55), Inches(1.15), Inches(12.2), Inches(5.9))
        frame = box.text_frame
        frame.word_wrap = False
        total = len(lines) + sum(len(v) for v in gone.values())
        size = Pt(17) if total <= 11 else Pt(14)
        first = [True]   # the first paragraph already exists; the rest are added

        def row(text, colour, gutter_text, struck=False):
            para = frame.paragraphs[0] if first[0] else frame.add_paragraph()
            first[0] = False
            para.space_after = Pt(0)
            edge = para.add_run()
            edge.text = gutter_text
            edge.font.name, edge.font.size, edge.font.color.rgb = "Consolas", size, GUTTER
            code = para.add_run()
            code.text = text if text.strip() else " "
            code.font.name, code.font.size, code.font.color.rgb = "Consolas", size, colour
            if struck:
                # python-pptx has no strikethrough property, so set the
                # attribute the OOXML run properties element already supports.
                code.font._rPr.set("strike", "sngStrike")

        for i, line in enumerate(lines + [None]):
            number = start + i
            # Anything removed from this position is drawn back in where it
            # used to be. Green alone cannot show a week that deletes a line.
            for dropped in gone.get(number, []):
                row(dropped, DROP, "   -  ", struck=True)
            if line is None:
                break
            # green = new this week, matching the workbook and the week pages
            row(line, NEW if number in marks else PAPER, f"{number:>4}  ")

    def ctx_slide(deck, filename, start, lines, hi, note):
        """The block written so far, with line `hi` highlighted (or every line
        green when hi is None, for the whole-chunk slide), and a note below."""
        slide = deck.slides.add_slide(deck.slide_layouts[6])
        bg = slide.background.fill; bg.solid(); bg.fore_color.rgb = DARK
        head = slide.shapes.add_textbox(Inches(0.55), Inches(0.3), Inches(12.2), Inches(0.6))
        head.text_frame.text = (f"Type this into {filename}   -   line {start + hi}"
                                if hi is not None else f"All together in {filename}")
        hr = head.text_frame.paragraphs[0].runs[0]
        hr.font.size, hr.font.bold, hr.font.color.rgb = Pt(22), True, BRAND
        box = slide.shapes.add_textbox(Inches(0.55), Inches(1.05), Inches(12.2), Inches(4.7))
        frame = box.text_frame; frame.word_wrap = False
        size = Pt(18) if len(lines) <= 10 else Pt(13)
        first = [True]
        for j, line in enumerate(lines):
            para = frame.paragraphs[0] if first[0] else frame.add_paragraph()
            first[0] = False; para.space_after = Pt(0)
            gut = para.add_run(); gut.text = f"{start + j:>4}  "
            gut.font.name, gut.font.size, gut.font.color.rgb = "Consolas", size, GUTTER
            code = para.add_run(); code.text = line if line.strip() else " "
            code.font.name, code.font.size = "Consolas", size
            # highlighted (or whole-block) line is green; already-typed context is muted
            code.font.color.rgb = GUTTER if (hi is not None and j != hi) else NEW
        nb = slide.shapes.add_textbox(Inches(0.6), Inches(6.15), Inches(12.1), Inches(1.15))
        nf = nb.text_frame; nf.word_wrap = True
        nf.paragraphs[0].text = note
        nr = nf.paragraphs[0].runs[0]; nr.font.size, nr.font.color.rgb = Pt(20), PAPER

    def del_slide(deck, filename, start, context, dropped, note, replacing=False):
        """The block with one line struck through: the line to remove this week."""
        slide = deck.slides.add_slide(deck.slide_layouts[6])
        bg = slide.background.fill; bg.solid(); bg.fore_color.rgb = DARK
        head = slide.shapes.add_textbox(Inches(0.55), Inches(0.3), Inches(12.2), Inches(0.6))
        head.text_frame.text = f"In {filename}   -   {'replace a line' if replacing else 'delete a line'}"
        hr = head.text_frame.paragraphs[0].runs[0]
        hr.font.size, hr.font.bold, hr.font.color.rgb = Pt(22), True, BRAND
        box = slide.shapes.add_textbox(Inches(0.55), Inches(1.05), Inches(12.2), Inches(4.7))
        frame = box.text_frame; frame.word_wrap = False
        rows = list(context) + [dropped]
        size = Pt(18) if len(rows) <= 10 else Pt(13)
        first = [True]
        for j, line in enumerate(rows):
            para = frame.paragraphs[0] if first[0] else frame.add_paragraph()
            first[0] = False; para.space_after = Pt(0)
            struck = j == len(rows) - 1
            # The struck line sits right after the context, so start + j is its
            # real number - show it, not a dash, so the line is findable.
            gut = para.add_run(); gut.text = f"{start + j:>4}  "
            gut.font.name, gut.font.size, gut.font.color.rgb = "Consolas", size, GUTTER
            code = para.add_run(); code.text = line if line.strip() else " "
            code.font.name, code.font.size, code.font.color.rgb = "Consolas", size, (DROP if struck else GUTTER)
            if struck:
                code.font._rPr.set("strike", "sngStrike")
        nb = slide.shapes.add_textbox(Inches(0.6), Inches(6.15), Inches(12.1), Inches(1.15))
        nf = nb.text_frame; nf.word_wrap = True
        nf.paragraphs[0].text = note
        nr = nf.paragraphs[0].runs[0]; nr.font.size, nr.font.color.rgb = Pt(20), PAPER

    made = 0
    seen = set()
    for week in course.WEEKS:
        deck = Presentation()
        deck.slide_width, deck.slide_height = Inches(13.333), Inches(7.5)
        concept_slide(deck, {"title": f"Week {week['n']}", "sub": week["title"], "bullets": []})
        for kind, d in slide_plan(week, seen):
            if kind == "concept":
                concept_slide(deck, {"title": d["title"], "sub": d["sub"], "bullets": d["bullets"]}, eyebrow=d.get("eyebrow", ""))
            elif kind == "checkpoint":
                # No live iframe in PowerPoint, so it points at the classroom.
                concept_slide(deck, {"title": d["title"], "sub": d["say"],
                                     "bullets": ["Run it in the classroom, or press Show the output in the web deck.",
                                                 "Everyone's screen should match this."]},
                              eyebrow="Checkpoint - run it")
            elif kind == "chunk":
                code_slide(deck, d["file"], d["start"], d["lines"], d["marks"], d["gone"], d["part"], d["parts"])
            elif kind == "block":
                ctx_slide(deck, d["file"], d["start"], d["lines"], None,
                          "That is the whole piece. Check yours looks the same before moving on.")
            elif kind == "delete":
                del_slide(deck, d["file"], d["start"], d["lines"], d["dropped"], d["note"],
                          d.get("replacing", False))
            elif kind in ("quiz", "quizanswer"):
                q = d["quiz"]
                answered = kind == "quizanswer"
                letters = "ABCDEFGH"
                bullets = [f"{letters[i]}. {opt}" + (" (correct)" if answered and i == q["answer"] else "")
                           for i, opt in enumerate(q["options"])]
                bullets.append(q["why"] if answered else "Pick one - the answer is on the next slide.")
                concept_slide(deck, {"title": q["q"], "sub": "", "bullets": bullets},
                              eyebrow="Answer" if answered else "Quick check")
            else:  # linectx
                ctx_slide(deck, d["file"], d["start"], d["lines"], d["hi"], d["note"])
        deck.save(os.path.join(SLIDES_DIR, f"week-{week['n']:02d}.pptx"))
        made += 1
    return made


# --------------------------------------------------------------------------
# the same deck as a web page
# --------------------------------------------------------------------------

DECK_CSS = """
*{box-sizing:border-box}
html,body{height:100%;margin:0}
body{background:#0d1b21;color:#1f2a37;font:16px/1.55 Rubik,system-ui,-apple-system,"Segoe UI",sans-serif;
overflow:hidden}
.deck{position:absolute;inset:0}
.slide{position:absolute;inset:0;display:none;flex-direction:column;justify-content:center;
padding:min(6vh,58px) min(6vw,72px) calc(min(6vh,58px) + 54px);background:#f4f8fb}
.slide.on{display:flex}
.slide.dark{background:#102127;color:#dcecef;justify-content:flex-start}
.eyebrow{color:#01aefd;font-size:clamp(13px,1.5vw,19px);font-weight:800;letter-spacing:.09em;
text-transform:uppercase;margin:0 0 .5em}
.slide h1{font-size:clamp(38px,7vw,92px);line-height:1.05;margin:0;font-weight:800;letter-spacing:-.02em}
.slide h2{font-size:clamp(28px,4.4vw,58px);line-height:1.1;margin:0;font-weight:800;letter-spacing:-.015em}
.sub{color:#0a6299;font-size:clamp(19px,2.4vw,33px);font-weight:600;margin:.55em 0 0}
.sub.mono{font-family:Consolas,"SF Mono",Menlo,monospace;font-weight:500;letter-spacing:-.01em}
ul.pts{list-style:none;margin:clamp(20px,3.4vh,44px) 0 0;padding:0;display:grid;
gap:clamp(10px,1.9vh,22px)}
ul.pts li{position:relative;padding-left:1.5em;font-size:clamp(18px,2.3vw,32px);line-height:1.4}
ul.pts li:before{content:"";position:absolute;left:0;top:.52em;width:.62em;height:.62em;
border-radius:50%;background:#01aefd}
.filebar{display:flex;flex-wrap:wrap;gap:10px;align-items:baseline;
font-size:clamp(16px,2vw,27px);font-weight:700;color:#01aefd;margin:0 0 .6em}
.filebar .part{color:#7f9aa4;font-weight:600;font-size:.72em}
.code{font-family:Consolas,"SF Mono",Menlo,monospace;border-collapse:collapse;width:100%;
font-size:clamp(11px,1.55vw,23px);line-height:1.42}
.code td{padding:0;white-space:pre;vertical-align:top}
.code .ln{width:3.4em;text-align:right;padding-right:1.1em;color:#6d8c97;user-select:none}
.code .new td:last-child{color:#7fe0a0}
.code .gone td:last-child{color:#f3928b;text-decoration:line-through}
.code .gone .ln{color:#a8635e}
.bar{position:absolute;left:0;right:0;bottom:0;height:54px;display:flex;align-items:center;
gap:12px;padding:0 18px;background:rgba(16,33,39,.9);color:#dcecef;
font-size:13px;backdrop-filter:blur(6px)}
.bar button{font:inherit;font-weight:600;color:#dcecef;background:#22424d;border:0;
border-radius:6px;padding:7px 13px;cursor:pointer}
.bar button:hover{background:#2d5361}
.bar .count{font-variant-numeric:tabular-nums;letter-spacing:.03em}
.bar .spacer{flex:1}
.bar .hint{color:#8fa9b3}
.dots{display:flex;gap:5px}
.dots i{width:7px;height:7px;border-radius:50%;background:#3a5c68;cursor:pointer}
.dots i.on{background:#01aefd}
.slide.line{overflow-y:auto}
.slide.line .filebar{margin-bottom:.55em}
.slide.line .code{font-size:clamp(13px,1.9vw,26px);margin:0 0 .7em}
.code tr.ctx td{color:#aebfcb}
.code tr.ctx .ln{color:#7c909d}
.code tr.hi td:last-child{color:#7fe0a0;background:rgba(127,224,160,.14);
box-shadow:-.5em 0 0 rgba(127,224,160,.14),4px 0 0 rgba(127,224,160,.14)}
.code tr.hi .ln{color:#7fe0a0;background:rgba(127,224,160,.14);font-weight:700}
.code tr.gone.hi td:last-child{color:#f3928b;background:rgba(243,146,139,.16);text-decoration:line-through}
.code tr.gone.hi .ln{color:#f3928b;background:rgba(243,146,139,.16)}
.linenote{color:#dcecef;font-size:clamp(16px,2vw,28px);line-height:1.45;margin:0;max-width:40ch}
.slide.line.whole .linenote{color:#8fa9b3;font-size:clamp(14px,1.6vw,22px)}
.slide.quiz{justify-content:flex-start;overflow-y:auto}
.slide.quiz .eyebrow{color:#8a5cd0}
.slide.quiz.answered .eyebrow{color:#0f8a4c}
.opts{list-style:upper-alpha;margin:clamp(16px,3vh,34px) 0 0;padding-left:1.5em;
display:grid;gap:clamp(9px,1.7vh,18px)}
.opts li{font-size:clamp(17px,2.2vw,29px);line-height:1.35;padding-left:.3em}
.slide.quiz.answered .opts li{color:#8a9aa5}
.slide.quiz.answered .opts li.right{color:#0f8a4c;font-weight:800}
.quiz-hint{color:#5b7178;font-size:clamp(14px,1.7vw,22px);margin-top:clamp(16px,3vh,30px)}
.quiz-why{color:#0a6299;font-size:clamp(16px,2vw,27px);line-height:1.5;
margin-top:clamp(16px,3vh,30px);max-width:46ch}
.slide.checkpoint{justify-content:flex-start;overflow-y:auto}
.cp-say{color:#0a6299;font-size:clamp(16px,2.1vw,27px);line-height:1.5;margin:.5em 0 1em;max-width:44ch}
.cp-run{font:inherit;font-weight:800;color:#04222f;background:#ffd633;border:0;border-radius:8px;
padding:12px 22px;cursor:pointer;font-size:clamp(15px,1.8vw,22px)}
.cp-run:hover{background:#ffdf5c}
.cp-out{margin-top:16px;width:100%}
.cp-out iframe{width:100%;height:min(42vh,440px);border:1px solid #cbd9dd;border-radius:8px;background:#fff}
.cp-console{margin-top:12px;border:1px solid #21414c;border-radius:8px;overflow:hidden;background:#0f1b21}
.cp-console-head{padding:6px 12px;background:#16303a;color:#cfe3e8;font-size:13px;font-weight:700;
letter-spacing:.03em}
.cp-console-body{max-height:min(22vh,180px);overflow:auto;padding:8px 12px;
font:13px/1.5 Consolas,"SF Mono",Menlo,monospace;color:#dcecef}
.cp-console-body .cp-muted{color:#7f9aa4}
.cp-row{white-space:pre-wrap;overflow-wrap:anywhere;padding:1px 0}
.cp-row.error{color:#ff9d8e}.cp-row.warn{color:#f4c869}.cp-row.net{color:#8fb3bd}.cp-row.info{color:#9fd8ee}
@media (max-width:640px){.bar .hint{display:none}}
"""

DECK_JS = r"""
var slides = [].slice.call(document.querySelectorAll('.slide'));
var dots = [].slice.call(document.querySelectorAll('.dots i'));
var count = document.querySelector('.count');
var at = 0;

function show(next, push) {
  at = Math.max(0, Math.min(slides.length - 1, next));
  slides.forEach(function (s, i) { s.classList.toggle('on', i === at); });
  dots.forEach(function (d, i) { d.classList.toggle('on', i === at); });
  count.textContent = (at + 1) + ' / ' + slides.length;
  if (push !== false) history.replaceState(null, '', '#' + (at + 1));
  focusTypedLine(slides[at]);
}

// A code slide can be taller than the screen. The line to type is always the
// newest (last) line of the block, so when a scrollable code slide opens, jump
// to the bottom - the line they type and its note land on screen and nobody has
// to scroll down to find them. Review ("all together") slides have no such line,
// so they read from the top.
function focusTypedLine(slide) {
  if (!slide || !slide.classList.contains('line')) return;
  var hasTarget = !!slide.querySelector('tr.hi');
  function go() {
    // Bail if the class moved on before a late callback (font load) fires.
    if (slides[at] !== slide || !slide.classList.contains('on')) return;
    slide.scrollTop = hasTarget ? slide.scrollHeight : 0;
  }
  requestAnimationFrame(go);
  // Rubik/Consolas can load after first paint and make the code taller; without
  // re-running once fonts are in, the jump uses the pre-font height and stops
  // short, leaving the line off-screen - exactly the bug this fixes.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(go);
}
// Deep link, so a reload - or opening straight at a slide - keeps the place.
show(parseInt((location.hash || '').slice(1), 10) - 1 || 0, false);

document.querySelector('.prev').onclick = function () { show(at - 1); };
document.querySelector('.next').onclick = function () { show(at + 1); };
dots.forEach(function (d, i) { d.onclick = function () { show(i); }; });
document.querySelector('.full').onclick = function () {
  if (document.fullscreenElement) document.exitFullscreen();
  else document.documentElement.requestFullscreen();
};
// Full screen and any projector/window resize change the slide height, so
// re-pin the line-to-type to the bottom of whatever code slide is showing.
window.addEventListener('resize', function () { focusTypedLine(slides[at]); });

document.addEventListener('keydown', function (event) {
  var key = event.key;
  if (key === 'ArrowRight' || key === 'PageDown' || key === ' ' || key === 'Enter') show(at + 1);
  else if (key === 'ArrowLeft' || key === 'PageUp' || key === 'Backspace') show(at - 1);
  else if (key === 'Home') show(0);
  else if (key === 'End') show(slides.length - 1);
  else if (key === 'f') document.querySelector('.full').click();
  else if (key === 'Escape') {
    // Inside the classroom this deck is an iframe: tell the page holding it to
    // close rather than leaving the teacher stuck in a panel with no exit.
    if (document.fullscreenElement) return;   // the browser handles that one
    if (window.parent !== window) window.parent.postMessage({ utg: 'deck', action: 'close' }, location.origin);
  } else return;
  event.preventDefault();
});
// An iframe gets no keys until something in it is focused.
window.addEventListener('load', function () { window.focus(); });
document.addEventListener('click', function () { window.focus(); });

// The demo AI key, so a checkpoint on an AI week can reply for real. It lives in
// the classroom database, never in these published files, and is handed only to
// a TEACHER. A teacher proves it either with a signed-in instructor/admin
// account token, or - the common case - with the instructor 4-letter code they
// used to open the curriculum, which the access gate saved as utg_class_code. A
// student has a STUDENT code, which the server refuses, so the checkpoint just
// shows the interface for them. Fetched once and cached.
var _cpKey;
function cpDemoKey() {
  if (_cpKey) return _cpKey;
  _cpKey = new Promise(function (resolve) {
    var host = location.hostname;
    var api = (host === 'localhost' || host === '127.0.0.1')
      ? 'http://127.0.0.1:8787' : 'https://utg-classroom-api.utgapps.workers.dev';
    var token = null, code = null;
    try { token = (JSON.parse(localStorage.getItem('utg_account') || 'null') || {}).token; } catch (e) {}
    try { code = (localStorage.getItem('utg_class_code') || '').trim(); } catch (e) {}
    var req;
    if (token) {
      req = fetch(api + '/demo-key', { cache: 'no-store', headers: { authorization: 'Bearer ' + token } });
    } else if (code) {
      req = fetch(api + '/demo-key', { method: 'POST', cache: 'no-store',
        headers: { 'content-type': 'application/json' }, body: JSON.stringify({ code: code }) });
    } else { resolve(null); return; }
    req.then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { resolve((d && d.key) || null); })
      .catch(function () { resolve(null); });
  });
  return _cpKey;
}

// Checkpoint slides: reveal the project's live output so the class can compare.
[].slice.call(document.querySelectorAll('.cp-run')).forEach(function (btn) {
  btn.onclick = function (e) {
    e.stopPropagation();
    var id = btn.getAttribute('data-cp');
    var out = document.getElementById('out-' + id);
    if (out.firstChild) {
      if (out._cpStop) out._cpStop();       // drop the console listener
      out.innerHTML = ''; btn.textContent = '▶ Show the output'; return;
    }
    // The stored page escapes the script close tag so the text/plain box is not
    // closed early; undo that before it becomes a real document, or the first
    // script tag never closes and none of the project's JS runs. (The close tag
    // is built from pieces so this very file does not contain a literal one.)
    var CLOSE = '<' + '/script';
    var raw = document.getElementById('src-' + id).textContent.split('<\\' + '/script').join(CLOSE);
    var frame = document.createElement('iframe');
    frame.setAttribute('sandbox', 'allow-scripts allow-forms');
    frame.setAttribute('allow', 'local-network-access *');
    out.appendChild(frame);

    // A console under the output, fed by the bridge inside the page. It is how
    // the class sees a console.log, an error, or a request that failed.
    var con = document.createElement('div');
    con.className = 'cp-console';
    con.innerHTML = '<div class="cp-console-head">Console</div>'
                  + '<div class="cp-console-body"><span class="cp-muted">console.log, errors '
                  + 'and network requests from the output show up here.</span></div>';
    out.appendChild(con);
    var body = con.querySelector('.cp-console-body');
    var first = true;
    function onMsg(ev) {
      if (ev.source !== frame.contentWindow) return;          // only this output
      var d = ev.data; if (!d || d.utg !== 'cp-log') return;
      if (first) { body.innerHTML = ''; first = false; }       // clear the hint
      var row = document.createElement('div');
      row.className = 'cp-row ' + (d.level || 'log');
      row.textContent = d.text;
      body.appendChild(row); body.scrollTop = body.scrollHeight;
    }
    window.addEventListener('message', onMsg);
    out._cpStop = function () { window.removeEventListener('message', onMsg); };

    // If this page calls the AI, put the teacher's demo key where the student's
    // key would go, so it can reply for real. No key (or not a teacher) leaves
    // the placeholder - the interface still runs, the request just says why.
    var needsKey = raw.indexOf('sk-class-put-your-own-key-here') >= 0;
    (needsKey ? cpDemoKey() : Promise.resolve(null)).then(function (key) {
      frame.srcdoc = key ? raw.split('sk-class-put-your-own-key-here').join(key) : raw;
    });
    btn.textContent = 'Hide the output';
  };
});
"""


def deck_code_slide(filename, start, lines, marks, gone, part, parts):
    """One dark 'type this now' slide, matching the editor and the pptx."""
    rows = []
    for index, line in enumerate(lines + [None]):
        number = start + index
        for dropped in gone.get(number, []):
            rows.append('<tr class="gone"><td class="ln">{0}</td><td>{1}</td></tr>'
                        .format(number, esc(dropped) or "&nbsp;"))
        if line is None:
            break
        rows.append('<tr class="{0}"><td class="ln">{1}</td><td>{2}</td></tr>'.format(
            "new" if number in marks else "", number, esc(line) or "&nbsp;"))
    part_label = ('<span class="part">{0} of {1}</span>'.format(part, parts)) if parts > 1 else ""
    return ('<section class="slide dark">'
            '<p class="filebar">Type this into {0} {1}</p>'
            '<table class="code">{2}</table></section>').format(esc(filename), part_label, "".join(rows))


def deck_concept_slide(spec):
    sub = ""
    if spec.get("sub"):
        # A sub-heading that is really a line of code should look like one.
        code_ish = any(mark in spec["sub"] for mark in ("(", "{", "[", "=", ".", "/"))
        sub = '<p class="sub{0}">{1}</p>'.format(" mono" if code_ish else "", esc(spec["sub"]))
    points = "".join("<li>{0}</li>".format(esc(point)) for point in spec.get("bullets", []))
    return ('<section class="slide"><h2>{0}</h2>{1}{2}</section>'.format(
        esc(spec["title"]), sub,
        '<ul class="pts">{0}</ul>'.format(points) if points else ""))


def build_html_decks():
    """The same deck as a web page, so it can be presented from the classroom.

    Built from the same week["slides"] and the same code_chunks() as the .pptx,
    slide for slide, and main() fails the build if the two ever disagree. The
    .pptx stays for Google Slides; this is what the teacher screen embeds.
    """
    os.makedirs(SLIDES_DIR, exist_ok=True)
    counts = {}
    seen = set()
    for week in course.WEEKS:
        slides = ['<section class="slide"><p class="eyebrow">Week {0}</p><h1>{1}</h1></section>'
                  .format(week["n"], esc(week["title"]))]
        for desc in slide_plan(week, seen):
            slides.append(deck_render_html(desc))
        dots = "".join("<i></i>" for _ in slides)
        html_out = """<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Week {n} slides &middot; AI101 &middot; UTG Academy</title>
{font}
<style>{css}</style>
{guard}
<div class="deck">{slides}</div>
<div class="bar">
  <button class="prev" title="Previous slide (left arrow)">&lsaquo;</button>
  <button class="next" title="Next slide (right arrow, space)">&rsaquo;</button>
  <span class="count"></span>
  <div class="dots">{dots}</div>
  <span class="spacer"></span>
  <span class="hint">arrows or space to move &middot; f for full screen</span>
  <button class="full" title="Full screen (f)">Full screen</button>
</div>
<script>{js}</script>
""".format(n=week["n"], font=FONT, css=DECK_CSS, guard=guard("ai101", up="../../"),
           slides="".join(slides), dots=dots, js=DECK_JS)
        with open(os.path.join(SLIDES_DIR, "week-%02d.html" % week["n"]), "w",
                  encoding="utf-8") as handle:
            handle.write(html_out)
        counts[week["n"]] = len(slides)
    return counts


def pptx_slide_counts():
    """Slide count per week, from the same plan the decks render, so the
    .pptx and .html can never disagree."""
    counts = {}
    seen = set()
    for week in course.WEEKS:
        counts[week["n"]] = 1 + len(slide_plan(week, seen))
    return counts

def build_milestones():
    """Emit every week's file set as JSON, for the classroom editor to read.

    This is what lets an instructor catch up a student who missed a week: the
    editor fetches this and seeds week N's canonical code into their account.
    Public on purpose - it is the same code already printed on the week pages,
    and it contains no key, only the placeholder every student replaces.
    """
    payload = {
        "course": "ai101",
        "title": course.COURSE_TITLE,
        "weeks": [
            {"n": week["n"], "title": week["title"], "files": state_at(week["n"])}
            for week in course.WEEKS
        ],
    }
    for week in payload["weeks"]:
        for name, text in week["files"].items():
            if "sk-class-" in text and "put-your-own-key-here" not in text:
                raise SystemExit(f"week {week['n']} {name} carries a real-looking key; refusing to publish")
    write("milestones.json", json.dumps(payload, separators=(",", ":")))
    return len(payload["weeks"])


def write(name, text):
    with open(os.path.join(HERE, name), "w", encoding="utf-8") as handle:
        handle.write(text)


# --------------------------------------------------------------------------

def main():
    if len(course.WEEKS) != 15:
        raise SystemExit(f"expected 15 weeks, found {len(course.WEEKS)}")
    for i, week in enumerate(course.WEEKS, start=1):
        if week["n"] != i:
            raise SystemExit(f"weeks are out of order at position {i}")

    final = state_at(15)
    total = line_count(final)
    print(f"AI101 - final project is {total} lines "
          f"({', '.join(f'{n}: {len(final[n].splitlines())}' for n in FILES)})")
    if total > LINE_BUDGET:
        raise SystemExit(f"OVER BUDGET: {total} lines > {LINE_BUDGET}. Move something to a bonus module.")

    # A week that adds nothing is almost always an authoring slip.
    for week in course.WEEKS:
        if not week["ops"] and not week.get("no_code_ok"):
            raise SystemExit(f"week {week['n']} changes no code; set no_code_ok=True if that is deliberate")

        # Every edit must be pinned to a moment in the lesson, or the teacher is
        # left guessing when in the hour it happens.
        touched = {(filename, block_id) for _, filename, block_id, _ in week["ops"]}
        cited = {(beat["file"], beat["block"]) for beat in week["flow"] if beat["kind"] == "step"}
        orphans = touched - cited
        if orphans:
            raise SystemExit(
                f"week {week['n']}: no STEP in the flow types "
                + ", ".join(f"{f}:{b}" for f, b in sorted(orphans))
            )
        ghosts = {ref for ref in cited if ref[0] not in FILES}
        if ghosts:
            raise SystemExit(f"week {week['n']}: flow cites unknown file(s) {sorted(ghosts)}")

        # A whole hour with nothing to say back is a lecture, not a lesson.
        prompts = sum(1 for beat in week["flow"] if beat.get("ask"))
        if prompts < 3:
            raise SystemExit(
                f"week {week['n']}: only {prompts} call-and-response prompt(s) in the flow; "
                f"aim for at least 3 spread through the hour"
            )

        # The deck is what is on the projector while students type, so every
        # edit has to be on a slide too - not only in the teacher's own notes.
        on_slides = {ref for spec in week["slides"] for ref in spec.get("code", [])}
        unshown = touched - on_slides
        if unshown:
            raise SystemExit(
                f"week {week['n']}: no slide shows "
                + ", ".join(f"{f}:{b}" for f, b in sorted(unshown))
                + " - add a \"code\" key to one of that week's slides"
            )

        # An expanded deck IS the type-along, so its code must appear in the
        # order the lesson types it - not the author's concept order. Otherwise
        # a slide says "type line 24" before "line 9".
        if week["n"] in getattr(course, "EXPANDED_WEEKS", set()):
            slide_blocks = [ref for spec in week["slides"] for ref in spec.get("code", [])]
            flow_blocks = [(beat["file"], beat["block"]) for beat in week["flow"]
                           if beat["kind"] == "step"]
            if slide_blocks != flow_blocks:
                raise SystemExit(
                    f"week {week['n']} is expanded but its slide code order "
                    f"{slide_blocks} does not match the typing order {flow_blocks} - "
                    f"reorder that week's slides so the type-along follows the lesson"
                )

        # An expanded week teaches line by line, so every code line it shows on
        # a slide needs a note. A blank explanation slide is worse than none, so
        # refuse to ship one - this is the guard that keeps the roll-out honest.
        if week["n"] in getattr(course, "EXPANDED_WEEKS", set()):
            for spec in week["slides"]:
                for filename, block in (spec.get("code") or []):
                    start, lines, marks, _gone = block_code(week["n"], filename, block)
                    notes = notes_for(week["n"], filename, block)
                    for i, line in enumerate(lines):
                        # Only a changed/new line gets a slide, so only it needs a
                        # note; a carried-over line just shows as context.
                        if not line.strip() or (start + i) not in marks:
                            continue
                        note = notes[i] if notes and i < len(notes) else ""
                        if note is None:
                            continue
                        if not note:
                            raise SystemExit(
                                f"week {week['n']} is expanded but {filename}:{block} "
                                f"line {start + i} has no LINE_NOTES entry"
                            )

        grew = line_count(state_at(week["n"])) - (line_count(state_at(week["n"] - 1)) if week["n"] > 1 else 0)
        print(f"  week {week['n']:2d}  +{grew:3d} lines  {week['title']}")

    # A quiz with a bad answer index marks no option correct, silently - refuse.
    for key, quiz_set in getattr(course, "QUIZZES", {}).items():
        for q in quiz_set:
            opts = q.get("options") or []
            if not q.get("q") or len(opts) < 2 or not q.get("why"):
                raise SystemExit(f"quiz {key}: needs q, why, and 2+ options - {q.get('q')!r}")
            if not isinstance(q.get("answer"), int) or not (0 <= q["answer"] < len(opts)):
                raise SystemExit(f"quiz {key}: answer index out of range - {q.get('q')!r}")

    build_index()
    build_weeks()
    build_teacher()
    build_workbook()
    weeks_out = build_milestones()
    decks = build_slides()
    web = build_html_decks()
    # The .pptx is for Google Slides and the .html is what the classroom
    # embeds. They are generated from the same week data, so if they ever
    # disagree on slide count, one of the two renderers has drifted.
    expected = pptx_slide_counts()
    drift = {n: (web[n], expected[n]) for n in expected if web[n] != expected[n]}
    if drift:
        raise SystemExit("deck drift - week: (html, pptx) " + repr(drift))
    print(f"built: index.html, week-01..15.html, teacher.html, workbook.html, "
          f"{decks} slide decks (.pptx and .html, {sum(web.values())} slides), "
          f"milestones.json ({weeks_out} weeks)")


if __name__ == "__main__":
    main()
