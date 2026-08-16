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
    """(first_line_number, lines, set_of_changed_line_numbers) for one block."""
    start, end = block_spans(week_n)[filename][block_id]
    lines = state_at(week_n)[filename].split("\n")[start - 1:end]
    return start, lines, changed_lines(week_n)[filename]


def code_table(filename, start, lines, marks, ident=None, tag=""):
    """One styled snippet: file chip, line range, the code, changes accented."""
    rows = []
    for offset, line in enumerate(lines):
        number = start + offset
        cls = ' class="new"' if number in marks else ""
        rows.append(f'<tr{cls}><td class="ln">{number}</td>'
                    f'<td class="src">{esc(line) or "&nbsp;"}</td></tr>')
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


def render_step(week, beat):
    """A typing beat, broken into pieces of at most six code lines.

    Each piece gets its own sentence of explanation, so the room stops and
    talks roughly every half-dozen lines instead of copying twenty in silence.
    """
    filename, block_id = beat["file"], beat["block"]
    start, lines, marks = block_code(week["n"], filename, block_id)
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
    for chunk, note in zip(chunks, notes):
        pieces.append(code_table(filename, cursor, chunk, marks, tag=tag))
        pieces.append(f'<p class="chunk-note">{note}</p>')
        cursor += len(chunk)

    at = f'<span class="at">{esc(beat["at"])}</span>' if beat.get("at") else ""
    doing = "typed fresh" if kind == "add" else "replacing what is already there"
    lead = f'<p class="step-lead">{esc(filename)} &middot; {doing}</p>'
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


def guard(tool="ai101"):
    return (
        '<script>window.UTG_GUARD="../";window.UTG_TOOL="%s";'
        "document.write('<script src=\"../class-codes.js?t='+Date.now()+'\"><\\/script>');</script>\n"
        '<script src="../guard.js"></script>' % tool
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


def code_block(filename, text, marks, ident):
    """A whole file rendered with line numbers, this week's lines accented."""
    return code_table(filename, 1, text.split("\n"), marks,
                      ident=ident, tag="green = new this week")


def files_view(upto, ident_prefix):
    """The three files as clickable tabs, with the current week highlighted."""
    files = state_at(upto)
    marks = changed_lines(upto)
    tabs = "".join(
        f'<button class="tab{" active" if i == 0 else ""}" data-for="{ident_prefix}-{i}">{esc(name)}</button>'
        for i, name in enumerate(FILES)
    )
    panes = "".join(
        f'<div data-pane="{ident_prefix}-{i}"{"" if i == 0 else ' style="display:none"'}>'
        f'{code_block(name, files[name], marks[name], f"{ident_prefix}-code-{i}")}</div>'
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
<div class="note"><strong>Where you should be by the end of this week.</strong>
The green lines are what is new since week {n-1 if n > 1 else 0}. Everything else you already had.
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
        sections.append(f"""<section class="chapter">
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
    body = f"""<div class="wrap">
<p class="eyebrow">Teacher curriculum</p>
<h1>{esc(course.COURSE_TITLE)}</h1>
<p class="lead">Fifteen one-hour lessons. Every hour is built so you are talking for well under half of it.</p>
<button class="printbtn pill" onclick="window.print()">Print to PDF</button>
<div class="warn"><h3 style="margin-top:0">Say this in week 1</h3>{course.DISCLAIMER}</div>
<div class="card">
  <h3 style="margin-top:0">How to run this course</h3>
  {course.TEACHER_PREAMBLE}
</div>
{"".join(sections)}
</div>"""
    write("teacher.html", page("Teacher curriculum", body))


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
        start, lines, marks = block_code(week_n, filename, block_id)
        for offset in range(0, len(lines), CODE_LINES_PER_SLIDE):
            piece = lines[offset:offset + CODE_LINES_PER_SLIDE]
            chunks.append((filename, start + offset, piece, marks))
    return chunks


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
    DARK = RGBColor(0x10, 0x21, 0x27)

    def concept_slide(deck, spec):
        slide = deck.slides.add_slide(deck.slide_layouts[5])
        slide.shapes.title.text = spec["title"]
        run = slide.shapes.title.text_frame.paragraphs[0].runs[0]
        run.font.size, run.font.bold, run.font.color.rgb = Pt(38), True, INK
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

    def code_slide(deck, filename, start, lines, marks, part, parts):
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
        size = Pt(17) if len(lines) <= 11 else Pt(14)
        for i, line in enumerate(lines):
            number = start + i
            para = frame.paragraphs[0] if i == 0 else frame.add_paragraph()
            para.space_after = Pt(0)
            gutter = para.add_run()
            gutter.text = f"{number:>4}  "
            gutter.font.name, gutter.font.size, gutter.font.color.rgb = "Consolas", size, GUTTER
            code = para.add_run()
            code.text = line if line.strip() else " "
            code.font.name, code.font.size = "Consolas", size
            # green = new this week, matching the workbook and the week pages
            code.font.color.rgb = NEW if number in marks else PAPER

    made = 0
    for week in course.WEEKS:
        deck = Presentation()
        deck.slide_width, deck.slide_height = Inches(13.333), Inches(7.5)
        concept_slide(deck, {"title": f"Week {week['n']}", "sub": week["title"], "bullets": []})
        for spec in week["slides"]:
            concept_slide(deck, spec)
            refs = spec.get("code")
            if refs:
                chunks = code_chunks(week["n"], refs)
                for index, (filename, start, lines, marks) in enumerate(chunks, start=1):
                    code_slide(deck, filename, start, lines, marks, index, len(chunks))
        deck.save(os.path.join(SLIDES_DIR, f"week-{week['n']:02d}.pptx"))
        made += 1
    return made


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
    print(f"AI101 — final project is {total} lines "
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
        grew = line_count(state_at(week["n"])) - (line_count(state_at(week["n"] - 1)) if week["n"] > 1 else 0)
        print(f"  week {week['n']:2d}  +{grew:3d} lines  {week['title']}")

    build_index()
    build_weeks()
    build_teacher()
    build_workbook()
    decks = build_slides()
    print(f"built: index.html, week-01..15.html, teacher.html, workbook.html, {decks} slide decks")


if __name__ == "__main__":
    main()
