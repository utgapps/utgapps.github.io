# Slide rules for UTG curriculums

How every course deck (AI101, AI102, and any future course) is written and
generated. These are requirements, not suggestions — the build enforces most of
them and fails if they are broken. AI101 (`ai101/course.py` + `ai101/build.py`)
is the reference implementation; copy its shape for a new course.

The deck is generated twice from ONE description — a `.pptx` for Google Slides
and an `.html` deck the classroom embeds — from the same `slide_plan()`. The two
can never disagree: the build fails on any drift in slide count.

---

## 1. Voice — write it for the student to read

Every word on a slide is read by a 12–17-year-old, on their own screen. So:

- **Second person, always.** "You type…", "your code reads…", "press Run and you
  should see…". Never "the student types", "the class compares", "have them…".
- **No teacher directions on slides.** Anything aimed at the teacher (timings,
  call-and-response prompts, what to watch for) belongs in the teacher guide
  (`teacher.html`), never in the deck.
- **Plain and concrete.** Short sentences. Name the thing and what it does. No
  jargon you have not introduced yet.

## 2. Explain every new idea BEFORE the line that uses it

Before the first line a student types that uses a new idea, show one short
explainer slide for it. **Once per course, the first time it appears** — never
repeat it. "Every new idea" is literal and includes the shape of the languages,
not just the named features:

- **HTML:** what a tag is (opening `<p>`, closing `</p>`, content between);
  self-closing tags (`<link>`, `<input>`); attributes (`class=`, `id=`, `href=`);
  and each specific tag the first time it is used.
- **CSS:** what a rule is (`selector { property: value; }`); how selectors are
  built — by element (`body`), by class (`.app`), nested (`.top h1`); units
  (`px`) and colours (hex); and each specific property the first time.
- **JavaScript:** how a line is built — a statement, strings, calling a function,
  dot notation, joining with `+`, comparing with `===`, objects `{ }`, lists
  `[ ]`, indexing `[0]`; the first variable ("what is a variable"), the first
  function ("what is a function"); and each built-in (`fetch`, `addEventListener`,
  `JSON.stringify`, `res.json()`, …) the first time.

A concept explainer carries three things: a **one-line code example** in the
monospace sub-line (the real line from the project, so they recognise it when
they type it), and — in the HTML deck — an **animated visual metaphor** that
SHOWS what the idea does, with a single caption line under it (not a wall of
bullets). A box slides onto the end of a list for `.push`; a token flows through
a machine for a function; a request bounces to a server and back for `fetch`; the
CSS box-model breathes its layers for `margin`. The metaphor is picked from a
small library of reusable "kinds" (see below), so authoring one concept is a
couple of lines.

In `course.py`:

- `CONCEPTS[key]` is `(kind, title, [bullets])` or, richer, `(kind, title,
  [bullets], "example")`. The bullets are still authored — they tie the idea to
  an earlier week ("the opposite end from .push (week 7)", "the reverse of
  JSON.stringify (week 4)") — and are what the **`.pptx`** shows, since it cannot
  animate. Keep them honest even when a visual exists.
- `VISUALS[key]` (optional) gives the concept a metaphor: `{"kind": ...,
  "cap": "one caption line", ...labels}`. When present, the **HTML** slide shows
  the animation + caption INSTEAD of the bullets. Kinds live in
  `build.concept_visual`: arr-add / arr-remove / loop / pick (lists), machine
  (transforms), network (fetch/await), glue (string +), box (variables), card
  (objects), fork (if/compare/try), event / dom (DOM & clicks), swap / tag
  (state & HTML tags), boxmodel / swatch / resize / round / textsize / linegap /
  flex / scroll / motion / tiles (CSS & structure). Each renders a self-contained
  inline `<svg>` with its own scoped, uniquely-named `@keyframes` — no JS, no
  libraries — so it loops forever on CSS alone.

Both decks stay ONE slide per concept, so the count-drift guard passes. The
teaching lives on these slides, so keep code comments in the files light — do NOT
rely on comments.

**On-the-page placement.** A concept that has a visible spot on the app is
followed by a second slide: a fixed wireframe of the chat app they are building,
with ONE region ringed (pulsing) to show where that piece lives — the `<header>`
strip, the Send `<button>`, the user bubble that `margin-left: auto` pushes
right, the log that `overflow-y` scrolls. The wireframe never changes shape (so
they learn to recognise it); only the ring moves. `course.PLACEMENTS[key] =
(region, caption)` — regions are `page / header / title / log / aibubble /
userbubble / inputrow / textbox / sendbtn / footer`. Only concepts with an honest
placement get one; pure behind-the-scenes logic (variables, loops, JSON, try) has
none and shows no mockup slide. `build.concept_mockup` draws it as inline SVG for
the HTML deck; `mockup_slide` draws the same wireframe with python-pptx shapes for
the `.pptx`, so both decks add the slide and stay in count-sync.

## 3. One line of code per slide

Each new or changed line gets its own slide:

- Show the block **built up so far**, with the **current line highlighted** and
  the earlier lines dimmed as context, so the student sees exactly where the new
  line goes.
- Below the code, one short note in the student voice saying what that line does.
- After a multi-line block, add one **"all together"** slide showing the whole
  finished block, so they can check theirs matches.

## 4. Rewrites and deletions

- A **rewritten (`set`) block** shows a "type this" slide only for the lines that
  actually **change**; lines carried over from an earlier week appear only as
  dimmed context. Never make a student retype unchanged code.
- A **removed line** gets its own slide: the block in context with that line
  struck through and a note telling them to delete it.

## 5. Slides follow TYPING order, not concept order

The deck is a type-along, so its code must appear in the order the lesson types
it (`week["flow"]` step order), not the author's preferred concept order. The
build fails if a week's slide code order does not match its flow order.

## 6. Checkpoints — run it and match

At each natural "run it now" moment, add a checkpoint slide: an instruction in
the student voice ("Press Run — you should see…") and a button the instructor
clicks to render the project exactly as it should look at that point, so the
class can compare their screen and see if they match. Work that needs the network
(AI replies) shows the interface and says the reply needs the classroom.

## 7. Everything is generated — never hand-edit the HTML/pptx

All of it comes from the course description. To change a slide, change the data
and rebuild. The build refuses to ship if: the project is over the line budget,
a week changes no code, an edit is never typed in the flow, an edit is not on a
slide, an expanded line has no note, the slide order does not match the typing
order, or the two decks drift in slide count.

---

## How it is wired (reference: `ai101`)

In `course.py`:

- `EXPANDED_WEEKS` — the set of week numbers that use the concept-first,
  one-line-per-slide format. Roll out a week at a time; un-listed weeks keep the
  older chunked deck so the build stays green while authoring is partial.
- `line_concepts(filename, line)` — returns the concept keys a line introduces,
  general shape first (e.g. "what a tag is") then the specific tag/property/
  built-in. Only keys that also exist in `CONCEPTS` produce a slide, so the
  glossary can grow gradually.
- `CONCEPTS` — `key -> (kind, title, [1–2 bullets])`. `kind` is `html`/`css`/`js`
  and shows as the slide's eyebrow.
- `LINE_NOTES` — `(filename, block_id) -> [one note per line]`. `None` for a
  blank line or a line folded into its neighbour. A `set` block only needs notes
  for the lines it changes.
- `DELETE_NOTES` — `(filename, block_id) -> note` for a removed line.
- A checkpoint is a slide spec with `"checkpoint": True` and a `"say"` string,
  placed in `week["slides"]` where the run-it moment belongs (usually just before
  "Your turn"). Optional `"checkpoint_week"` renders a different week's state.

In `build.py`: `slide_plan(week, seen)` turns all of the above into an ordered
list of slide descriptors; `deck_render_html` and the pptx builder both render
from it, so they cannot diverge.

## Adding a new course (e.g. AI102)

Copy `ai101/build.py` and give the course its own `course.py` with the same
structures. Start with `EXPANDED_WEEKS = {1}`, author week 1 fully, confirm the
format on the deployed deck, then roll out the rest a few weeks at a time. Run
the course's `test/` suites (milestone behaviour, build guards) before shipping.

## 8. Quiz checks — question slide, then reveal

After a code chunk is shown whole, add a short multiple-choice check so students
apply what they just typed and refresh older ideas:

- **A few questions on the new code**, plus **one or two from earlier weeks**
  (spaced repetition — keep long-term understanding honest).
- Each question is **two slides**: the question with its options (A, B, C, …) and
  "pick one — the answer is on the next slide", then a **reveal** slide with the
  correct option in green and a one-line "why".
- Authored in `course.py` as `QUIZZES[(week, filename, block)] = [ {q, options,
  answer (index), why}, … ]`; `slide_plan` emits them right after that block's
  "all together" slide. The build refuses a quiz missing `q`/`why`, with fewer
  than two options, or an out-of-range `answer`.
