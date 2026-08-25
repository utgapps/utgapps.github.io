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

A concept explainer is 1–2 short bullets. The teaching lives on these slides, so
keep code comments in the files light — do NOT rely on comments to explain.

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
