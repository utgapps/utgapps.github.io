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

def state_at(upto):
    """File contents as they stand at the END of week `upto` (1-based)."""
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
        ordered = sorted(blocks[name], key=lambda pair: order.index(pair[0]))
        out[name] = "\n".join(line for _, lines in ordered for line in lines)
    return out


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
.code{background:#102127;border-radius:0 0 8px 8px;overflow:auto;margin:0}
.code table{border-collapse:collapse;width:100%;font:13px/1.6 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.code td{padding:0 10px;white-space:pre;vertical-align:top}
.code td.ln{width:1%;text-align:right;color:#4d6b76;user-select:none;background:rgba(255,255,255,.03)}
.code td.src{color:#dcecef}
.code tr.new td.src{background:rgba(55,169,93,.18)}
.code tr.new td.ln{background:rgba(55,169,93,.28);color:#a9e8bf}
.filebar{display:flex;align-items:center;gap:10px;justify-content:space-between;background:#16303a;color:#cfe3e8;padding:7px 12px;font-size:12px}
.filebar button{border:1px solid #3c6272;background:transparent;color:#cfe3e8;border-radius:5px;padding:4px 9px;font:600 11px Rubik,sans-serif;cursor:pointer}
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
.say{border-left:3px solid #8e6bd4;background:#f6f2fd;padding:10px 13px;margin:9px 0;border-radius:0 6px 6px 0;font-size:14px}
.say b{color:#5b3fa0}
@media print{
  @page{size:letter;margin:14mm}
  body{background:#fff}
  header.site,.nav,.filebar button,.noprint{display:none}
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
<title>{html.escape(title)} · UTG Academy</title>
{FONT}
<style>{CSS}</style>
{guard(tool)}
<header class="site"><a href="../"><img src="{LOGO}" alt="UTG Academy"></a><span class="slash">/</span><strong>AI101</strong></header>
{body}
<footer>&copy; 2026 UTG Academy</footer>
<script>{COPY_JS}{extra_js}</script>
"""


def code_block(filename, text, marks, ident):
    """A file rendered with line numbers, this week's lines highlighted."""
    rows = []
    for i, line in enumerate(text.split("\n"), start=1):
        cls = ' class="new"' if i in marks else ""
        rows.append(f'<tr{cls}><td class="ln">{i}</td><td class="src">{html.escape(line) or "&nbsp;"}</td></tr>')
    return (
        f'<div class="filebar"><span>{html.escape(filename)}</span>'
        f'<button data-copy="{ident}">Copy this file</button></div>'
        f'<div class="code"><table id="{ident}">{"".join(rows)}</table></div>'
    )


def files_view(upto, ident_prefix):
    """The three files as clickable tabs, with the current week highlighted."""
    files = state_at(upto)
    marks = changed_lines(upto)
    tabs = "".join(
        f'<button class="tab{" active" if i == 0 else ""}" data-for="{ident_prefix}-{i}">{html.escape(name)}</button>'
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
        f'<h3>{html.escape(w["title"])}</h3><p>{html.escape(w["big_idea"])}</p></a>'
        for w in course.WEEKS
    )
    body = f"""<div class="wrap">
<p class="eyebrow">15-week course</p>
<h1>{html.escape(course.COURSE_TITLE)}</h1>
<p class="lead">{html.escape(course.COURSE_BLURB)}</p>
<div class="card">
  <h3 style="margin-top:0">What you are building</h3>
  <p class="muted">{html.escape(course.PROJECT_BLURB)}</p>
  <p><a class="pill" href="teacher.html">Teacher curriculum</a>
     <a class="pill" href="workbook.html">Student homework book</a>
     <a class="pill" href="../classroom/">Open the code editor</a></p>
</div>
<h2>The weeks</h2>
<div class="grid">{cards}</div>
</div>"""
    write("index.html", page(course.COURSE_TITLE, body))


def build_weeks():
    for index, week in enumerate(course.WEEKS):
        n = week["n"]
        prev = f'<a href="week-{n-1:02d}.html">&larr; Week {n-1}</a>' if n > 1 else "<span></span>"
        nxt = f'<a href="week-{n+1:02d}.html">Week {n+1} &rarr;</a>' if n < len(course.WEEKS) else "<span></span>"
        concepts = "".join(f'<span class="pill">{html.escape(c)}</span>' for c in week["new_concepts"])
        total = line_count(state_at(n))
        bonus = ""
        if week.get("bonus"):
            bonus = (
                f'<div class="bonus"><strong>Finished early? {html.escape(week["bonus"]["title"])}</strong>'
                f'<p style="margin:6px 0 0">{html.escape(week["bonus"]["body"])}</p>'
                '<p class="muted" style="margin:6px 0 0;font-size:13px">Nothing in a later week depends on this, '
                'so it is safe to skip and safe to keep.</p></div>'
            )
        body = f"""<div class="wrap">
<p class="eyebrow">Week {n} of {len(course.WEEKS)}</p>
<h1>{html.escape(week["title"])}</h1>
<p class="lead">{html.escape(week["big_idea"])}</p>
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
        rows = "".join(
            f'<tr><td class="t">{html.escape(t)}</td><td>{html.escape(what)}</td><td>{detail}</td></tr>'
            for t, what, detail in week["plan"]
        )
        asks = "".join(
            f'<div class="say"><b>Ask:</b> {html.escape(q)}<br><span class="muted">Listening for: {html.escape(a)}</span></div>'
            for q, a in week["ask"]
        )
        errors = "".join(
            f"<li><strong>{html.escape(sym)}</strong> — {html.escape(fix)}</li>" for sym, fix in week["errors"]
        )
        bonus = ""
        if week.get("bonus"):
            bonus = (f'<div class="bonus"><strong>Bonus for fast finishers: {html.escape(week["bonus"]["title"])}</strong>'
                     f'<p style="margin:6px 0 0">{html.escape(week["bonus"]["body"])}</p></div>')
        sections.append(f"""<section class="chapter">
<h2>Week {week["n"]} &middot; {html.escape(week["title"])}</h2>
<p class="lead">{html.escape(week["big_idea"])}</p>
<div class="card"><strong>They leave today able to:</strong>
<ul class="tight">{"".join(f"<li>{html.escape(o)}</li>" for o in week["objectives"])}</ul></div>
<h3>The hour</h3>
<table class="plan"><tr><th>Time</th><th>What</th><th>How</th></tr>{rows}</table>
<h3>Questions to throw at the room</h3>
{asks}
<h3>What will go wrong</h3>
<ul class="tight">{errors}</ul>
{bonus}
<h3>Homework set today</h3>
<ul class="tight">{"".join(f"<li>{html.escape(c['task'])}</li>" for c in week["homework"])}</ul>
</section>""")
    body = f"""<div class="wrap">
<p class="eyebrow">Teacher curriculum</p>
<h1>{html.escape(course.COURSE_TITLE)}</h1>
<p class="lead">Fifteen one-hour lessons. Every hour is built so you are talking for well under half of it.</p>
<button class="printbtn pill" onclick="window.print()">Print to PDF</button>
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
            f'<div class="card"><strong>Challenge {i}. {html.escape(c["task"])}</strong>'
            f'<p style="margin:8px 0 0">{html.escape(c["detail"])}</p>'
            f'<p class="muted" style="margin:8px 0 0;font-size:13px"><strong>Done when:</strong> {html.escape(c["done"])}</p></div>'
            for i, c in enumerate(week["homework"], start=1)
        )
        recap = "".join(f"<li>{html.escape(r)}</li>" for r in week["recap"])
        chapters.append(f"""<section class="chapter">
<p class="eyebrow">Chapter {week["n"]}</p>
<h2>{html.escape(week["title"])}</h2>
<p class="lead">{html.escape(week["big_idea"])}</p>
<h3>What you learned</h3>
<ul class="tight">{recap}</ul>
<h3>Words to know</h3>
<p>{"".join(f'<span class="pill">{html.escape(c)}</span>' for c in week["new_concepts"])}</p>
<h3>Challenges</h3>
{challenges}
<h3>Stuck?</h3>
<p class="muted">Open <a href="week-{week["n"]:02d}.html">week {week["n"]}'s code</a> and compare it with yours line by line.
The green lines are the ones added that week.</p>
</section>""")
    body = f"""<div class="wrap">
<p class="eyebrow">Student homework book</p>
<h1>{html.escape(course.COURSE_TITLE)}</h1>
<p class="lead">One chapter per week. Do the challenges on your own project - there is no separate file to make.</p>
<button class="printbtn pill" onclick="window.print()">Print to PDF</button>
{"".join(chapters)}
</div>"""
    write("workbook.html", page("Student homework book", body))


def build_slides():
    try:
        from pptx import Presentation
        from pptx.util import Inches, Pt
        from pptx.dml.color import RGBColor
    except ImportError:
        print("  slides SKIPPED - run: pip install python-pptx")
        return 0
    os.makedirs(SLIDES_DIR, exist_ok=True)
    brand = RGBColor(0x01, 0xAE, 0xFD)
    ink = RGBColor(0x1F, 0x2A, 0x37)
    made = 0
    for week in course.WEEKS:
        deck = Presentation()
        deck.slide_width, deck.slide_height = Inches(13.333), Inches(7.5)
        for slide_def in [{"title": f"Week {week['n']}", "sub": week["title"], "bullets": []}] + week["slides"]:
            layout = deck.slide_layouts[5 if slide_def.get("bullets") else 5]
            slide = deck.slides.add_slide(layout)
            slide.shapes.title.text = slide_def["title"]
            title_run = slide.shapes.title.text_frame.paragraphs[0].runs[0]
            title_run.font.size = Pt(38)
            title_run.font.bold = True
            title_run.font.color.rgb = ink
            body_lines = ([slide_def["sub"]] if slide_def.get("sub") else []) + slide_def.get("bullets", [])
            if body_lines:
                box = slide.shapes.add_textbox(Inches(0.9), Inches(2.0), Inches(11.5), Inches(4.6))
                frame = box.text_frame
                frame.word_wrap = True
                for i, line in enumerate(body_lines):
                    para = frame.paragraphs[0] if i == 0 else frame.add_paragraph()
                    para.text = ("• " + line) if slide_def.get("bullets") and line in slide_def["bullets"] else line
                    run = para.runs[0]
                    run.font.size = Pt(24 if line in slide_def.get("bullets", []) else 28)
                    run.font.color.rgb = ink if line in slide_def.get("bullets", []) else brand
                    para.space_after = Pt(14)
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
