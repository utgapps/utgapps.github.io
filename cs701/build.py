"""CS701 course builder - AP Computer Science Prep Level 1.

Everything in this folder is generated. Never hand-edit the HTML - edit
course.py (what is said) and course_ops.py (the code) and re-run this. Same
contract as camp-coding-projects/workbooks.py.

    python build.py

Emits, all derived from the one WEEKS structure in course.py:

    index.html          course hub
    week-01..15.html    the programs every student should have by the end of week N
    teacher.html        full teaching curriculum, minute by minute
    workbook.html       15-chapter printable student homework book
    slides/week-NN.pptx one deck per week (needs `pip install python-pptx`)
    slides/week-NN.html the same deck as a web page, for the classroom
    milestones.json     every week's programs, for the classroom's catch-up copy
    slide-states.json   the programs as they stand at each slide, for the teacher

Copied from ai101/build.py and changed where the Java Level 1 guide differs
from a web page. A week is a handful of small console programs, one file
each, not one page that grows, and the guide changes a program several times
in one lesson: Task 1-1 prints two names, Task 1-2 moves the same names into
variables. So the unit here is the OP, not the week. Each op is one typing
beat and one run of slides, and every diff is taken across exactly one op,
which is what the student has in front of them at that moment.

Milestones are REPLAYED from the ops rather than stored, so week N is
provably week N-1 plus that week's changes - they cannot drift apart, and
neither can the teacher guide, the homework or the slides.
"""

import difflib
import functools
import hashlib
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
FILES = list(course.ORDER)   # every program in the course, in the order ORDER lists them
TYPED_BUDGET = 130           # lines typed in one hour; past this a lesson is copying, not learning


# --------------------------------------------------------------------------
# replaying the weeks
# --------------------------------------------------------------------------

# The guide changes a program more than once in a lesson, so everything below
# counts in OPS rather than weeks. A POINT is how many ops have been applied:
# point 0 is an empty course, and WEEK_END[n] is the point where week n ends.
# A typing beat is the diff across one op; a week page is the diff across the
# whole week.
TIMELINE = []       # [(week number, op)] - every op in the course, in teaching order
WEEK_END = {0: 0}   # week number -> the point at which it ends
for _course_week in course.WEEKS:
    for _op in _course_week["ops"]:
        TIMELINE.append((_course_week["n"], _op))
    WEEK_END[_course_week["n"]] = len(TIMELINE)


def week_points(week_number):
    """The points that end each of a week's ops, in teaching order."""
    return range(WEEK_END[week_number - 1] + 1, WEEK_END[week_number] + 1)


def point_op(point):
    """(kind, filename, block_id, lines) - the op that takes the course to `point`."""
    return TIMELINE[point - 1][1]


def week_files(week_number):
    """The programs a week works on, in course order: the ones its ops touch."""
    touched = {point_op(point)[1] for point in week_points(week_number)}
    return [name for name in FILES if name in touched]


@functools.lru_cache(maxsize=None)
def blocks_at(upto):
    """Ordered [(block_id, lines)] per file once `upto` ops have been applied."""
    blocks = {name: [] for name in FILES}
    for week_number, (kind, filename, block_id, lines) in TIMELINE[:upto]:
        if filename not in blocks:
            raise SystemExit(f"week {week_number}: {filename} is not in course.ORDER")
        existing = [index for index, (bid, _lines) in enumerate(blocks[filename]) if bid == block_id]
        if kind == "add":
            if existing:
                raise SystemExit(f"week {week_number}: block '{block_id}' already exists in {filename}; use SET")
            blocks[filename].append((block_id, lines))
        elif kind == "set":
            if not existing:
                raise SystemExit(f"week {week_number}: block '{block_id}' not in {filename} yet; use ADD")
            blocks[filename][existing[0]] = (block_id, lines)
        else:
            raise SystemExit(f"week {week_number}: unknown op '{kind}'")
    # Sort into reading order, not authoring order. A lesson can type the end
    # of a program before its middle, but the FILE is always read top to bottom.
    out = {}
    for name in FILES:
        order = course.ORDER[name]
        unknown = [bid for bid, _lines in blocks[name] if bid not in order]
        if unknown:
            raise SystemExit(f"{name}: block(s) {unknown} missing from course.ORDER[{name!r}]")
        out[name] = sorted(blocks[name], key=lambda pair: order.index(pair[0]))
    return out


@functools.lru_cache(maxsize=None)
def state_at(upto):
    """File contents once `upto` ops have been applied. A file not begun is ""."""
    return {name: "\n".join(line for _block_id, lines in ordered for line in lines)
            for name, ordered in blocks_at(upto).items()}


@functools.lru_cache(maxsize=None)
def block_spans(upto):
    """{filename: {block_id: (first_line, last_line)}} at point `upto`.

    This is what lets the teacher guide say "type into Hours.java, lines 4-9"
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


def week_state(point, week_number):
    """The week's programs as they stand at `point`, leaving out any not begun."""
    files = state_at(point)
    return {name: files[name] for name in week_files(week_number) if files[name]}


def flow_points(week):
    """{flow index: point} - the k-th typing beat of a week types its k-th op.

    One op, one beat: the lesson and the ops list are written in the same
    order, and main() refuses a week where they name different blocks."""
    steps = [index for index, beat in enumerate(week["flow"]) if beat["kind"] == "step"]
    return dict(zip(steps, week_points(week["n"])))


MAX_STEP_LINES = 6   # the PixelPad workbooks' rule, and it holds up here too

# A trailing comma IS here, unlike AI101: in Java it only ever ends a line in
# the middle of an array's { ... } list, which is one statement to a beginner.
_OPENERS = ("{", "(", "[", "&&", "||", "+", ",")
_HEADERS = ("if", "for", "while", "switch", "case", "default", "else", "do",
            "try", "catch", "static", "public", "return")


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
    first_word = previous.split("(")[0].split()[0].rstrip(":") if previous.split() else ""
    if previous.endswith(":"):
        return False                      # a case label belongs with what it runs
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


def block_code(point, filename, block_id):
    """(first_line_number, lines, changed_line_numbers, removals) for one block,
    as the op that reaches `point` leaves it."""
    start, end = block_spans(point)[filename][block_id]
    lines = state_at(point)[filename].split("\n")[start - 1:end]
    gone = removed_in_blocks(point)[filename].get(block_id, {})
    return start, lines, changed_lines(point)[filename], gone


def code_table(filename, start, lines, marks, ident=None, tag="", gone=None, moved=None):
    """One styled snippet: file chip, line range, the code, changes accented.

    Deleted lines are drawn back in where they used to be, struck through, so a
    week that removes something can say so. Green alone cannot.
    """
    gone = gone or {}
    moved = moved or set()
    rows = []

    def removals(at):
        return "".join(
            f'<tr class="gone"><td class="ln">{at}</td>'
            f'<td class="src">{esc(text) or "&nbsp;"}</td></tr>'
            for text in gone.get(at, []))

    for offset, line in enumerate(lines):
        number = start + offset
        rows.append(removals(number))
        cls = ' class="new"' if number in marks else (' class="moved"' if number in moved else "")
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
    """A call-and-response prompt, rendered the same way a beat's body is.

    Both are prose an author writes with markup in it, and seventeen prompts
    across ten weeks say things like "why Number(tempBox.value)?" with the
    name in <code>. Escaping those printed the tags at the teacher, mid
    sentence, on the one line they are meant to read out loud.
    """
    if not ask:
        return ""
    question, listening = ask
    return (f'<div class="say"><b>Ask the room:</b> {question}'
            f'<span class="listen">Listening for: {listening}</span></div>')


def placement(point):
    """Where in the file this op's block goes, said in a way you can act on.

    A teacher works down the guide, and the guide runs in the order things
    make sense in, not the order they sit in the file. Line numbers alone do
    not help there, because the file is still growing. Naming the neighbour
    does: "just above int totalHours" is unambiguous at any point. Only the
    blocks that exist at this moment are candidates - one typed later in the
    lesson is not on anybody's screen yet.

    Returns (chip, where): a one-word state and the rest of the sentence. They
    are separate because the guide sets them on one line under the beat's
    title.
    """
    kind, filename, block_id, _lines = point_op(point)

    def trimmed(line):
        # Trim on a word boundary so the anchor never ends mid-word.
        return esc(line) if len(line) <= 62 else esc(line[:62].rsplit(" ", 1)[0]) + "&hellip;"

    if kind == "set":
        # A program is one block, so "lines 1-40" says nothing. Name the spot:
        # the changed lines, and the line just above them that is already there.
        touched = sorted(set(changed_lines(point)[filename])
                         | set(removed_in_blocks(point)[filename].get(block_id, {})))
        runs = []
        for number in touched:
            if runs and number <= runs[-1][1] + 1:
                runs[-1][1] = number
            else:
                runs.append([number, number])
        if len(runs) != 1:
            return ("Edit", f"<b>{esc(filename)}</b>, in {len(runs)} places &mdash; only the green "
                            f"lines change, everything between them stays exactly as it is")
        first, last = runs[0]
        where = f"line {first}" if first == last else f"lines {first}&ndash;{last}"
        text = state_at(point)[filename].split("\n")
        earlier = [line for line in text[:first - 1] if line.strip()]
        anchor = ", at the very top"
        if earlier and not any(character.isalnum() for character in earlier[-1]):
            # Just below a lone brace. "Just below println()" would name the
            # last line INSIDE the loop that brace closes, and a student would
            # type the new code in there. Name the block the brace closes.
            depth = len(earlier[-1]) - len(earlier[-1].lstrip())
            opener = next((line.strip() for line in reversed(earlier[:-1])
                           if len(line) - len(line.lstrip()) == depth
                           and any(character.isalnum() for character in line)), "")
            anchor = (f", just below the <code>{esc(earlier[-1].strip())}</code> that closes "
                      f"<code>{trimmed(opener)}</code>")
        elif earlier:
            anchor = f", just below <code>{trimmed(earlier[-1].strip())}</code>"
        pure = not removed_in_blocks(point)[filename].get(block_id)
        verb = ("add it" if first == last else "add them") if pure else "only the green lines change"
        return ("Add" if pure else "Edit", f"<b>{esc(filename)}</b> {where}{anchor} &mdash; {verb}")

    ordered = blocks_at(point)[filename]
    if len(ordered) == 1:
        return ("New file", f"make a new file called <b>{esc(filename)}</b> in this week&rsquo;s "
                            f"project &mdash; these are its first lines")
    index = [bid for bid, _lines in ordered].index(block_id)
    if index == 0:
        return ("New", f"the very top of <b>{esc(filename)}</b>, above everything else")
    if index == len(ordered) - 1:
        return ("New", f"the end of <b>{esc(filename)}</b>")

    anchor = next((line.strip() for line in ordered[index + 1][1] if line.strip()), "")
    if any(character.isalnum() for character in anchor):
        return ("New", f"<b>{esc(filename)}</b>, just above <code>{trimmed(anchor)}</code>")
    # "just above }" is no use - a program is full of them. Name the line above instead.
    above = next((line.strip() for line in reversed(ordered[index - 1][1]) if line.strip()), "")
    return ("New", f"<b>{esc(filename)}</b>, just below <code>{trimmed(above)}</code>")


def render_step(week, beat, point):
    """A typing beat, broken into pieces of at most six code lines.

    Each piece a student actually types gets its own sentence of explanation,
    so the room stops and talks roughly every half-dozen lines instead of
    copying twenty in silence. A piece nobody touches in this op needs no
    note: the skip line says which lines to leave alone.
    """
    kind, filename, block_id, _lines = point_op(point)
    start, lines, marks, gone = block_code(point, filename, block_id)
    chunks = chunk_block(lines, filename)
    notes = list(beat.get("notes") or [])

    spans, cursor = [], start
    for index, chunk in enumerate(chunks):
        last = cursor + len(chunk) - 1
        final = index == len(chunks) - 1
        touched = any(number in marks for number in range(cursor, last + 1))
        # A line removed from the end of a block sits at the number of whatever
        # follows it, so only the last chunk reaches past its own end - or a
        # deletion at a chunk boundary is drawn twice.
        here = {at: text for at, text in gone.items()
                if cursor <= at <= (last + 1 if final else last)}
        spans.append((cursor, last, chunk, touched or bool(here), here))
        cursor += len(chunk)

    needed = sum(1 for span in spans if span[3])
    if len(notes) != needed:
        where = ", ".join(f"{first}-{last}" for first, last, _chunk, touched, _here in spans if touched)
        raise SystemExit(
            f"week {week['n']} STEP {filename}:{block_id} has {needed} chunk(s) to type "
            f"(lines {where}), but you wrote {len(notes)} note(s). "
            f"Add one short note per typed chunk."
        )

    pieces = []
    for first, last, chunk, touched, here in spans:
        if not touched:
            # Do not print twenty lines a student already has just to reach the
            # six that changed. Say what is there, say to leave it, move on.
            span = f"Line {first}" if first == last else f"Lines {first}&ndash;{last}"
            pieces.append(f'<p class="unchanged"><b>{span} do not change</b> &mdash; '
                          f'skip past them.</p>')
            continue
        pieces.append(code_table(filename, first, chunk, marks, gone=here))
        pieces.append(f'<p class="chunk-note">{notes.pop(0)}</p>')

    chip, where = placement(point)
    lead = (f'<p class="where"><span class="chip {"edit" if chip == "Edit" else "add"}">{chip}</span>'
            f'<span>{where}</span></p>')
    return (f'<div class="beat step"><h4>{esc(beat["title"])}</h4>{lead}'
            f'{"".join(pieces)}{render_ask(beat.get("ask"))}</div>')


HOUR = 60


def hour_plan(week):
    """{beat index: (start minute, length, whether the slot is typing)} per timed beat.

    The clock in course.py is real - a teacher reads these off the wall - so
    the shape of the hour is already in the data and nothing here invents a
    number. A beat runs until the next beat that names a time; the last one
    runs to the end of the hour.

    Only some beats carry a time. The rest belong to whichever timed beat they
    follow, which is exactly how they are taught - week 1 sets the clock once
    at 0:20 and then types four blocks under it. So a slot counts as typing if
    ANYTHING in it is typed, not just its first beat: counting the first alone
    said week 1 spends two minutes at the keyboard, which is nonsense.
    """
    marks = []
    for index, beat in enumerate(week["flow"]):
        if not beat.get("at"):
            continue
        hours, minutes = (int(part) for part in beat["at"].split(":"))
        marks.append((index, hours * 60 + minutes))
    plan = {}
    for position, (index, start) in enumerate(marks):
        after = marks[position + 1][0] if position + 1 < len(marks) else len(week["flow"])
        end = marks[position + 1][1] if position + 1 < len(marks) else HOUR
        typing = any(beat["kind"] == "step" for beat in week["flow"][index:after])
        plan[index] = (start, end - start, typing)
    return plan


def hour_bar(week, plan):
    """One thin bar showing how the hour actually divides between talk and typing.

    Every week's flow carries its own clock but nothing ever drew it, so a
    teacher had to read forty beats to find out whether they were about to
    lecture for twenty minutes. Segments are links, so it doubles as the
    within-week navigation the page had none of.
    """
    if not plan:
        return ""
    segments = []
    for index, (_start, length, typing) in sorted(plan.items()):
        beat = week["flow"][index]
        segments.append(
            f'<a class="{"type" if typing else "talk"}" href="#w{week["n"]}b{index}" '
            f'style="width:{length * 100.0 / HOUR:.4f}%" '
            f'title="{esc(beat["at"])} &ndash; {esc(beat["title"])}"></a>'
        )
    typed = sum(length for _s, length, typing in plan.values() if typing)
    return (f'<div class="hour" aria-hidden="true">{"".join(segments)}</div>'
            f'<p class="hour-key"><i class="talk">you talk and demonstrate</i>'
            f'<i class="type">they type &mdash; {typed} of the {HOUR} minutes</i></p>')


def render_flow(week):
    """The hour as a run sheet: a clock down the left, one beat to a row."""
    plan = hour_plan(week)
    points = flow_points(week)
    rows = []
    for index, beat in enumerate(week["flow"]):
        if index in plan:
            _start, length, _typing = plan[index]
            tick = (f'<div class="tick"><span class="t">{esc(beat["at"])}</span>'
                    f'<span class="dur">{length} min</span></div>')
        else:
            # A beat that shares the previous beat's slot. Left blank rather
            # than given a made-up time, so the times on the page are only
            # ever times the author actually set.
            tick = '<div class="tick cont"></div>'
        if beat["kind"] == "step":
            body = render_step(week, beat, points[index])
        else:
            paragraphs = "".join(f"<p>{para}</p>" for para in beat["body"])
            body = (f'<div class="beat"><h4>{esc(beat["title"])}</h4>'
                    f'{paragraphs}{render_ask(beat.get("ask"))}</div>')
        marks = ("at " if index in plan else "") + ("step" if beat["kind"] == "step" else "")
        rows.append(f'<li class="{marks.strip()}" id="w{week["n"]}b{index}">{tick}{body}</li>')
    return f'{hour_bar(week, plan)}<ol class="run">{"".join(rows)}</ol>'


@functools.lru_cache(maxsize=None)
def block_changes(upto, since=None):
    """{filename: (changed, moved)} - line numbers, 1-based, at point `upto`,
    compared with point `since` (by default the point just before: one op).

    Diffed per BLOCK and compared by code signature, the two rules AI101 learned
    the hard way. Whole-file, difflib pairs an edit with whatever sits nearby;
    by raw text, a line that only gained four spaces of indentation reads as
    rewritten. A line whose text is the same apart from its leading spaces is
    MOVED, not changed, and main() refuses one: this course never wraps code
    a student already has, so a moved line is an authoring slip.
    """
    since = upto - 1 if since is None else since
    after = blocks_at(upto)
    before = {name: dict(pairs) for name, pairs in blocks_at(since).items()}
    spans = block_spans(upto)
    out = {}
    for name in FILES:
        changed, moved = set(), set()
        for block_id, new_lines in after[name]:
            first = spans[name][block_id][0]
            old_lines = before[name].get(block_id)
            if old_lines is None:
                changed.update(range(first, first + len(new_lines)))
                continue
            if old_lines == new_lines:
                continue
            matcher = difflib.SequenceMatcher(None, [sig_or_text(line) for line in old_lines],
                                              [sig_or_text(line) for line in new_lines], autojunk=False)
            for tag, old_first, old_last, new_first, new_last in matcher.get_opcodes():
                if tag in ("insert", "replace"):
                    changed.update(first + offset for offset in range(new_first, new_last))
                elif tag == "equal":
                    for offset in range(old_last - old_first):
                        was, now = old_lines[old_first + offset], new_lines[new_first + offset]
                        if was == now:
                            continue
                        # Only leading spaces differ: it moved. Anything else -
                        # even just a comment - is something they type.
                        (moved if was.strip() == now.strip() else changed).add(first + new_first + offset)
        out[name] = (changed, moved)
    return out


def changed_lines(upto, since=None):
    """Line numbers (1-based, per file) a student types between the two points."""
    return {name: pair[0] for name, pair in block_changes(upto, since).items()}


def moved_lines(upto, since=None):
    """Line numbers (1-based, per file) that only changed indentation."""
    return {name: pair[1] for name, pair in block_changes(upto, since).items()}


def sig_or_text(line):
    """What two lines are compared on: the code signature, or for a line that is
    all comment, the comment itself - otherwise every comment would match every
    other comment and a new one would never turn green.

    A line with no letters or digits - a lone brace - is compared WITH its
    indentation. Its depth is the only thing that says which block it closes;
    without it, the brace closing a new if-block matches the one closing main,
    and the unchanged closing braces below read as re-indented."""
    signature = line_sig(line)
    if signature and not re.search(r"\w", signature):
        return line[:len(line) - len(line.lstrip())] + signature
    return signature or line.strip()


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


@functools.lru_cache(maxsize=None)
def removed_in_blocks(upto, since=None):
    """{filename: {block_id: {line_in_new_file: [text, ...]}}} - deletions,
    attributed to the block they were removed FROM.

    Per block and by signature, like block_changes. The block id is kept
    because a line dropped from the END of a block sits at the first line
    number of whatever follows it.
    """
    since = upto - 1 if since is None else since
    before = {name: dict(blocks) for name, blocks in blocks_at(since).items()}
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
            matcher = difflib.SequenceMatcher(None, [sig_or_text(line) for line in old_lines],
                                              [sig_or_text(line) for line in new_lines], autojunk=False)
            for tag, old_first, old_last, new_first, _new_last in matcher.get_opcodes():
                if tag not in ("delete", "replace"):
                    continue
                dropped = [line for line in old_lines[old_first:old_last] if line.strip()]
                if dropped:
                    per_block.setdefault(block_id, {}).setdefault(
                        block_start + new_first, []).extend(dropped)
        gone[name] = per_block
    return gone


def removed_lines(upto, since=None):
    """{filename: {line_in_new_file: [text, ...]}} - the same deletions, keyed
    only by position, for the whole-file views where no block is in play."""
    flat = {}
    for name, per_block in removed_in_blocks(upto, since).items():
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


def file_label(slide):
    """The program a slide works in. Its first slide this week says where the
    file comes from - a student cannot type into a file that is not there -
    and every later slide just names it."""
    name = f"<b>{esc(slide['file'])}</b>"
    return {"new": f"a new file, {name}",
            "carried": f"last week&rsquo;s {name}"}.get(slide.get("origin"), esc(slide["file"]))


def typing_label(slide):
    """The heading of a slide that types one line."""
    if slide.get("origin") == "new":
        return f"Make {file_label(slide)}, and type this in"
    return f"Type this into {file_label(slide)}"


def plain(markup):
    """A heading's text for PowerPoint, which takes no markup."""
    return html.unescape(re.sub(r"<[^>]+>", "", markup))


def guard(tool="cs701", up="../"):
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
/* a line that only moved in a level: a cool edge, no fill - nothing to type */
.snip tr.moved td.ln{color:#6fb6dd;box-shadow:inset 3px 0 #3d8fc0}
.snip tr.moved td.src{color:#a9cfe3}
.snip tr.gone td.ln{background:rgba(201,74,58,.10);color:#e39289;box-shadow:inset 3px 0 #c94a3a}

.teach-row{margin:14px 0 18px}
.pill.ghost{background:var(--surface);color:var(--brand-ink);border:1px solid var(--border)}
.pill.ghost:hover{border-color:var(--brand);background:var(--brand-tint)}
@media print{.teach-row{display:none}}

/* ---- week anchors ---- */
.chapter{scroll-margin-top:74px}
/* Opened inside the classroom the page is already inside a titled panel, so
   the site header, the intro and the print button would only be noise. */
body.embedded header.site,body.embedded .printbtn,body.embedded .wk-switch,
body.embedded .brief,body.embedded footer{display:none}
body.embedded .wrap{padding-top:8px}
.note{border-left:3px solid var(--brand);background:var(--brand-tint);padding:12px 14px;margin:14px 0;font-size:14px;border-radius:0 6px 6px 0}
.warn{border-left:3px solid #e9952a;background:#fff8e9;padding:12px 14px;margin:14px 0;font-size:14px;border-radius:0 6px 6px 0}
.bonus{border-left:3px solid var(--gold);background:#fffbea;padding:12px 14px;margin:14px 0;font-size:14px;border-radius:0 6px 6px 0}
.muted{color:var(--muted)}
.nav{display:flex;justify-content:space-between;gap:12px;margin-top:34px;padding-top:18px;border-top:1px solid var(--border)}
footer{color:var(--muted);font-size:13px;padding:24px 22px;text-align:center}
ul.tight li{margin-bottom:5px}
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

# The teacher guide's own stylesheet. It ships on teacher.html alone, because
# every rule here answers a problem that only the guide has: it is read
# standing up, in front of a class, at whichever week today is. So the page is
# one column of prose with a clock down the left, a week can be reached in one
# click from anywhere, and nothing is tinted, boxed or bordered unless the box
# is carrying information. The old page had six accent hues and three stacked
# panels before the first word of teaching; this has two hues and none.
TEACHER_CSS = """
.tg h2{font-size:27px;margin:0}
.tg h3{font:800 11.5px/1 Rubik,sans-serif;letter-spacing:.11em;text-transform:uppercase;
  color:#5a6b7b;margin:0 0 8px}

/* The week switcher. Fifteen bare digits could not tell you week 7 from week
   11, and the page is 200k of scroll, so the titles are the whole point of it. */
.wk-switch{position:sticky;top:0;z-index:5;display:flex;gap:6px;overflow-x:auto;
  scrollbar-width:thin;scrollbar-color:#c3cedb transparent;
  margin:0 -22px 26px;padding:10px 22px;background:rgba(238,242,247,.95);
  border-bottom:1px solid var(--border)}
.wk-switch a{flex:none;display:flex;align-items:baseline;gap:7px;padding:6px 11px;
  border:1px solid var(--border);border-radius:7px;background:var(--surface);
  color:var(--ink);font-size:12.5px;white-space:nowrap}
.wk-switch a b{color:var(--brand-ink);font-weight:800}
.wk-switch a:hover{border-color:var(--brand);background:var(--brand-tint)}
.brief{background:var(--surface);border:1px solid var(--border);border-radius:9px;margin:0 0 34px}
.brief > summary{cursor:pointer;padding:13px 18px;font-size:14px;font-weight:700;color:var(--brand-ink)}
.brief .inner{padding:2px 18px 4px;border-top:1px solid var(--border)}
.brief .inner h3{font:700 15px Rubik,sans-serif;letter-spacing:0;text-transform:none;
  color:var(--ink);margin:16px 0 6px}
.brief .inner p,.brief .inner li{font-size:14.5px;line-height:1.65;max-width:74ch}

/* ---- the week's front matter ---- */
.tg .chapter + .chapter{margin-top:58px}
.wk-n{margin:0 0 9px;color:var(--brand);font:800 12px/1 Rubik,sans-serif;
  letter-spacing:.12em;text-transform:uppercase}
.wk-idea{margin:9px 0 22px;color:#5a6b7b;font-size:17px;line-height:1.6;max-width:66ch}
.hour{display:flex;height:9px;margin:0;border-radius:5px;overflow:hidden;background:#dde5ee}
.hour a{display:block;background:#b6c8d6}
.hour a.type{background:var(--brand)}
.hour a:hover{background:var(--brand-dark)}
.hour-key{display:flex;gap:16px;margin:9px 0 26px;color:#5a6b7b;font-size:12px}
.hour-key i{font-style:normal;display:inline-flex;align-items:center;gap:6px}
.hour-key i::before{content:"";width:9px;height:9px;border-radius:2px;background:#b6c8d6}
.hour-key i.type::before{background:var(--brand)}
.wk-facts{margin:22px 0 26px;padding:19px 0;
  border-top:1px solid #e3e9f0;border-bottom:1px solid #e3e9f0}
.wk-facts ul{margin:0;padding-left:18px;max-width:78ch}
.wk-facts li{margin:0 0 5px;font-size:14.5px;line-height:1.55}
.wk-facts li:last-child{margin-bottom:0}
/* The week's three files, one tab each, green for what this week adds and
   struck-through red for what it removes. It is tall, so it scrolls in place
   rather than pushing the lesson itself off the bottom of the screen. */
.files-h{margin:0 0 9px}
.files{margin:0 0 30px}
.files .tabs{margin:0}
.files .snip{margin:0;border-radius:0 0 9px 9px}
.files .snip .code{max-height:390px}

/* ---- the hour, as a run sheet ---- */
.run{list-style:none;margin:0;padding:0}
.run > li{position:relative;display:grid;gap:26px;padding:0 0 28px;
  /* minmax(0,1fr), not 1fr: a track sized "auto" takes its minimum from the
     widest thing in it, and one long line inside a code block is wider than
     the page - which put the whole guide into sideways scroll. */
  grid-template-columns:62px minmax(0,1fr)}
.run > li::before{content:"";position:absolute;left:75px;top:0;bottom:0;width:1px;background:#e3e9f0}
.run > li:first-child::before{top:7px}
.run > li:last-child::before{bottom:auto;height:7px}
.run > li.at::after{content:"";position:absolute;left:69px;top:3px;width:9px;height:9px;
  border-radius:50%;background:var(--bg);border:2px solid #b6c8d6}
.run > li.at.step::after{border-color:var(--brand)}
.tick{text-align:right}
.tick .t{display:block;font:800 13px/1.15 Rubik,sans-serif;color:var(--brand-ink)}
.tick .dur{display:block;margin-top:5px;color:#96a4b2;font-size:11.5px}
.beat h4{margin:0 0 9px;font-size:17px;line-height:1.35}
.beat p{margin:0 0 10px;line-height:1.68;max-width:70ch}
.beat p:last-child{margin-bottom:0}
/* One line of placement under the title, where three separate texts used to
   surround every snippet: a sentence above it, the snippet's own header bar,
   and the note below. */
.where{margin:0 0 4px;color:#5a6b7b;font-size:13px;line-height:1.85;max-width:70ch}
.where .chip{display:inline-block;margin-right:8px;font:800 10.5px/1 Rubik,sans-serif;
  letter-spacing:.1em;text-transform:uppercase;padding:5px 7px;border-radius:5px;
  background:var(--brand-tint);color:var(--brand-ink)}
.where .chip.tab{background:#e3f1fb;color:#1f6d9c}
.where .chip.edit{background:#fdf1de;color:#96590f}
.where code{padding:2px 6px;border-radius:4px;background:#e4eaf1;color:#3f5764;
  font:600 12.5px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.chunk-note{margin:10px 0 0;color:#42566a;font-size:14.5px;line-height:1.62;max-width:70ch}
.unchanged{margin:16px 0 0;padding:11px 0 0;border-top:1px dashed #ccd7e1;
  color:#5a6b7b;font-size:13.5px;line-height:1.55;max-width:70ch}
.say{margin:15px 0 0;padding:1px 0 1px 15px;border-left:2px solid #c9e6f7;
  font-size:14.5px;line-height:1.62;max-width:70ch}
.say b{color:var(--brand-ink);font-weight:800}
.say .listen{display:block;margin-top:4px;color:#5a6b7b;font-size:13.5px}

/* ---- what will go wrong, and what they take home ---- */
.wk-foot{display:grid;gap:20px 40px;grid-template-columns:1fr 1fr;
  margin:6px 0 0;padding:22px 0 0;border-top:1px solid #e3e9f0}
.wk-foot ul{margin:0;padding-left:18px}
.wk-foot li{margin:0 0 7px;font-size:14.5px;line-height:1.55}
.snag{list-style:none;padding:0}
.snag li{margin:0 0 11px}
.snag b{display:block;margin-bottom:2px;color:#8c3a2e;
  font:600 13px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.snag span{color:#5a6b7b}
.tg .bonus{grid-column:1/-1;margin:16px 0 0;padding:1px 0 1px 15px;border:0;
  border-left:2px solid var(--gold);border-radius:0;background:none;font-size:14.5px}
.tg .bonus p{max-width:70ch}

@media (max-width:720px){
  .wk-foot{grid-template-columns:1fr}
  .run > li{grid-template-columns:46px minmax(0,1fr);gap:16px}
  .run > li::before,.run > li.at::after{display:none}
}
@media print{
  /* The bar and the switcher are navigation - on paper the run sheet's own
     times say the same thing and the links go nowhere. */
  /* The file view is a screen reference: it scrolls, only its open tab is
     visible, and printing all three files for all fifteen weeks would bury
     the lesson in a hundred pages of listing. The run sheet below already
     prints every line the week actually types. */
  .wk-switch,.hour,.hour-key,.files,.files-h{display:none}
  .brief,.brief .inner{border:0;padding-left:0;padding-right:0}
  .brief > summary{display:none}
  .run > li{break-inside:avoid;page-break-inside:avoid}
  .wk-facts,.wk-foot,.snag li{break-inside:avoid;page-break-inside:avoid}
  .wk-facts{margin-bottom:22px}
  .tg .chapter + .chapter{margin-top:0}
  /* On screen a long line scrolls sideways. On paper it is simply gone, and
     a teacher cannot scroll a handout - so wrap it instead of losing it. */
  .tg .snip .code{overflow:visible}
  .tg .snip td.src{white-space:pre-wrap;word-break:break-word}
}
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


def page(title, body, extra_js="", tool="cs701", extra_css=""):
    return f"""<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(title)} &middot; UTG Academy</title>
{FONT}
<style>{CSS}{extra_css}</style>
{guard(tool)}
<header class="site"><a href="../"><img src="{LOGO}" alt="UTG Academy"></a><span class="slash">/</span><strong>CS701</strong></header>
{body}
<footer>&copy; 2026 UTG Academy</footer>
<script>{COPY_JS}{extra_js}</script>
"""


def code_block(filename, text, marks, ident, gone=None):
    """A whole file rendered with line numbers, this week's changes accented."""
    label = ("green = new" + (", struck through = deleted" if gone else "") + " this week")
    return code_table(filename, 1, text.splitlines(), marks, ident=ident, tag=label, gone=gone)


def files_view(week_number, ident_prefix):
    """The week's programs as clickable tabs, with the week's changes marked."""
    point, since = WEEK_END[week_number], WEEK_END[week_number - 1]
    names = week_files(week_number)
    files = state_at(point)
    marks = changed_lines(point, since)
    gone = removed_lines(point, since)
    tabs = "".join(
        f'<button class="tab{" active" if index == 0 else ""}" data-for="{ident_prefix}-{index}">{esc(name)}</button>'
        for index, name in enumerate(names)
    )
    panes = "".join(
        f'<div data-pane="{ident_prefix}-{index}"{"" if index == 0 else ' style="display:none"'}>'
        f'{code_block(name, files[name], marks[name], f"{ident_prefix}-code-{index}", gone[name])}</div>'
        for index, name in enumerate(names)
    )
    return f'<div class="tabs" data-tabs>{tabs}</div>{panes}'

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
  both without leaving the room. Java runs right in the code editor &mdash; see <em>Before you
  start</em> below.</p>
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
        names = week_files(n)
        total = line_count({name: state_at(WEEK_END[n])[name] for name in names})
        dropped = sum(len(texts) for name in names
                      for texts in removed_lines(WEEK_END[n], WEEK_END[n - 1])[name].values())
        carried = [name for name in names if state_at(WEEK_END[n - 1])[name]]
        started = len(names) - len(carried)
        legend = ""
        if started == 1:
            legend = "This week you start one new program, in a new file named after its class. "
        elif started:
            legend = (f"This week you start {started} new programs, each in a new file named "
                      f"after its class. ")
        if carried:
            legend += (", ".join(carried) + (" carries" if len(carried) == 1 else " carry")
                       + " on from last week, so its other lines are ones you already had. ")
        legend += "The green lines are what you type this week."
        if dropped:
            legend += (" The struck-through line is one you DELETE this week - take it out."
                       if dropped == 1 else
                       f" The {dropped} struck-through lines are ones you DELETE this week"
                       " - take them out.")
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
Together they are {total} lines.</div>
{bonus}
<h2>Your programs after week {n}</h2>
{files_view(n, f"w{n}")}
<div class="nav">{prev}{nxt}</div>
</div>"""
        write(f"week-{n:02d}.html", page(f"Week {n} · {week['title']}", body))


def build_teacher():
    sections = []
    for week in course.WEEKS:
        # The week's programs as the class leaves them, one tab each, with
        # this week's lines green and anything it deletes struck through in
        # red. It is the same view the students get on their own week page,
        # so the room is looking at one picture of the week.
        files = f'<div class="files">{files_view(week["n"], "tg%d" % week["n"])}</div>'
        errors = "".join(
            f"<li><b>{esc(sym)}</b><span>{esc(fix)}</span></li>" for sym, fix in week["errors"]
        )
        bonus = ""
        if week.get("bonus"):
            bonus = (f'<div class="bonus"><strong>Bonus for fast finishers: {esc(week["bonus"]["title"])}</strong>'
                     f'<p style="margin:6px 0 0">{esc(week["bonus"]["body"])}</p></div>')
        sections.append(f"""<section class="chapter" id="week-{week["n"]}">
<p class="wk-n">Week {week["n"]}</p>
<h2>{esc(week["title"])}</h2>
<p class="wk-idea">{esc(week["big_idea"])}</p>
<div class="wk-facts">
<h3>They leave today able to</h3>
<ul>{"".join(f"<li>{esc(o)}</li>" for o in week["objectives"])}</ul>
</div>
<h3 class="files-h">The programs after this week</h3>
{files}
{render_flow(week)}
<div class="wk-foot">
<div><h3>What will go wrong</h3><ul class="snag">{errors}</ul></div>
<div><h3>Homework set today</h3>
<ul>{"".join(f"<li>{esc(c['task'])}</li>" for c in week["homework"])}</ul></div>
{bonus}
</div>
</section>""")
    switch = "".join(
        f'<a href="#week-{week["n"]}"><b>{week["n"]}</b>{esc(week["title"])}</a>'
        for week in course.WEEKS
    )
    body = f"""<div class="wrap tg">
<p class="eyebrow">Teacher curriculum</p>
<h1>{esc(course.COURSE_TITLE)}</h1>
<p class="lead">Fifteen one-hour lessons. Every hour is built so you are talking for well under half of it.</p>
<button class="printbtn pill" onclick="window.print()">Print to PDF</button>
<nav class="wk-switch" aria-label="Jump to a week">{switch}</nav>
<details class="brief">
<summary>Before you teach any of it &mdash; how to run this course, and what to say in week 1</summary>
<div class="inner">
  <h3>How to run this course</h3>
  {course.TEACHER_PREAMBLE}
  <h3>Say this in week 1</h3>
  {course.DISCLAIMER}
</div>
</details>
{"".join(sections)}
</div>"""
    # ?embed=1 strips the page furniture. The browser handles #week-N on its
    # own, but only if the element exists when it looks - so nudge it on load
    # too, and again on a hash change, which is how the panel switches weeks
    # without reloading the frame.
    #
    # The brief is collapsed on screen so the page opens on teaching rather
    # than on two screens of preamble, but a printed guide has no way to open
    # it, so printing expands it first.
    embed_js = (
        "if(new URLSearchParams(location.search).has('embed'))"
        "document.body.classList.add('embedded');"
        "function utgJump(){var id=location.hash.slice(1);if(!id)return;"
        "var el=document.getElementById(id);if(el)el.scrollIntoView();}"
        "addEventListener('load',utgJump);addEventListener('hashchange',utgJump);"
        "addEventListener('beforeprint',function(){document.querySelectorAll('details')"
        ".forEach(function(d){d.open=true;});});"
    )
    write("teacher.html", page("Teacher curriculum", body,
                               extra_js=embed_js, extra_css=TEACHER_CSS))


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
<p class="muted">Open <a href="week-{week["n"]:02d}.html">week {week["n"]}'s programs</a> and compare them with yours line by line.
The green lines are the ones typed that week.</p>
</section>""")
    body = f"""<div class="wrap">
<p class="eyebrow">Student homework book</p>
<h1>{esc(course.COURSE_TITLE)}</h1>
<p class="lead">One chapter per week. Each challenge is a program of its own: make a new file for it in that week&rsquo;s project, named after its class.</p>
<button class="printbtn pill" onclick="window.print()">Print to PDF</button>
<div class="warn"><h3 style="margin-top:0">Read this first</h3>{course.DISCLAIMER}</div>
{"".join(chapters)}
</div>"""
    write("workbook.html", page("Student homework book", body))


CODE_LINES_PER_SLIDE = 15   # beyond this the type is too small to read from the back


def checkpoint_files_json(point, filename):
    """The checkpoint's program exactly as a student has typed it by then, for
    the slide's download button. Every "<" is escaped so no file content can
    end the <script> block that carries it."""
    files = {filename: state_at(point)[filename] + "\n"}
    return json.dumps(files, ensure_ascii=False).replace("<", "\\u003c")


TRANSCRIPT_MARKS = (
    # (pattern on the ESCAPED text, replacement). [[typed]] is what the player
    # types; <<A>> and ((a)) are the green and yellow letters week 13's colour
    # codes print, so the sample run looks like the console will. {{clear}}
    # is where Wordle's clearConsole() wipes the screen: the console keeps only
    # what follows it, and a sample run that silently ran on would not match.
    (r"\{\{clear\}\}", r'<i class="cleared">the screen clears</i>'),
    (r"\[\[(.*?)\]\]", r'<b class="typed">\1</b>'),
    (r"&lt;&lt;(.*?)&gt;&gt;", r'<b class="clue-g">\1</b>'),
    (r"\(\((.*?)\)\)", r'<b class="clue-y">\1</b>'),
)


def transcript_html(run):
    """A console run as it should look, typed input picked out."""
    rows = []
    for line in run.strip("\n").split("\n"):
        text = esc(line)
        for pattern, replacement in TRANSCRIPT_MARKS:
            text = re.sub(pattern, replacement, text)
        rows.append(text)
    return ('<div class="cp-console"><div class="cp-console-head">Console &mdash; a sample run'
            '<span class="cp-key"><b class="typed">underlined</b> = what you type</span></div>'
            '<div class="cp-console-body cp-transcript">{0}</div></div>').format("\n".join(rows))


def transcript_text(run):
    """The same run with the markup taken out."""
    text = run.strip("\n").replace("{{clear}}", "(the screen clears)")
    for pattern in (r"\[\[(.*?)\]\]", r"<<(.*?)>>", r"\(\((.*?)\)\)"):
        text = re.sub(pattern, r"\1", text)
    return text


def balance_quiz(quiz):
    """Move the correct option off "always A". Quizzes are authored with the
    right answer first (easy to read); this deterministically reseats it at a
    position derived from the question text, so across a deck the answers land
    on A/B/C/D roughly evenly and the same question always renders the same way
    (stable across the .html, the .pptx, and rebuilds). The other options keep
    their relative order."""
    opts = quiz["options"]
    n = len(opts)
    correct = opts[quiz["answer"]]
    target = int(hashlib.md5(quiz["q"].encode("utf-8")).hexdigest(), 16) % n
    others = [o for i, o in enumerate(opts) if i != quiz["answer"]]
    new = []
    oi = 0
    for pos in range(n):
        if pos == target:
            new.append(correct)
        else:
            new.append(others[oi])
            oi += 1
    return {**quiz, "options": new, "answer": target}


CONTEXT_LINES = 14   # lines of a block shown above the one being typed


@functools.lru_cache(maxsize=None)
def line_notes(week_number):
    """{point: [note or None per line of the block the op leaves]}.

    Notes are written in course.NOTES[week][file][block] against a line's text
    without its indent, so a note can never land on the wrong line when a block
    is edited. They are shared out across the week's ops in order: a line takes
    the next unused note for its text when it is typed. A list gives notes to
    a text typed more than once. A closing brace or a blank line needs none
    unless it is given one. A typed line with no note gets "", which main()
    names; a note no typed line ever took fails here, so a stale note cannot
    hide either.
    """
    pools = {(filename, block): {text: list(note) if isinstance(note, list) else [note]
                                 for text, note in notes.items()}
             for filename, blocks in course.NOTES.get(week_number, {}).items()
             for block, notes in blocks.items()}
    out = {}
    for point in week_points(week_number):
        _kind, filename, block, _lines = point_op(point)
        start, lines, marks, _gone = block_code(point, filename, block)
        pool = pools.get((filename, block), {})
        notes = []
        for offset, line in enumerate(lines):
            text = line.strip()
            if start + offset not in marks:
                notes.append(None)
            elif pool.get(text):
                notes.append(pool[text].pop(0))
            elif not text or text == "}":
                notes.append(None)
            else:
                notes.append("")
        out[point] = notes
    unused = [(filename, block, text) for (filename, block), pool in pools.items()
              for text, left in pool.items() if left]
    if unused:
        raise SystemExit(f"NOTES week {week_number}: no typed line for "
                         + "; ".join(f"{filename}:{block} {text!r}" for filename, block, text in unused))
    return out


def slide_plan(week, seen):
    """Ordered slide descriptors for a week's body (the caller adds the title
    slide). Mutates `seen` - the concept keys already introduced course-wide -
    so a concept is explained only the first time it appears.

    A spec is one of four things:
      {"title", "sub", "bullets", "code": [(file, block), ...]}
          a concept slide, then the type-along for each op it names: an
          explainer before the first line that uses a new Java idea, one slide
          per typed line with its note, and the whole block to check against.
          The code refs, read down the week, are the week's ops in order.
      {"board": title, "lines": [...], "output": "...", "note": "..."}
          an example the teacher shows and nobody types - the guide's
          instructor demonstrations.
      {"quiz": [question, ...]}
          a quick check and its answer, for each question.
      {"checkpoint": True, "file", "title", "say", "run"}
          run that program as it stands now and compare the console.

    A line is shown with at most CONTEXT_LINES of its block above it, so a
    long program never shrinks past reading size.
    """
    points = list(week_points(week["n"]))
    typed = 0                                  # how many of the week's ops have had slides
    reached = WEEK_END[week["n"] - 1]          # the point the class has finished typing
    out = []
    opened = set()                             # programs that have had their first slide
    for spec in week["slides"]:
        if spec.get("checkpoint"):
            names = week_files(week["n"])
            filename = spec.get("file") or (names[0] if len(names) == 1 else None)
            if filename is None:
                raise SystemExit(f"week {week['n']}: checkpoint '{spec.get('title')}' must say "
                                 f"which program it runs - this week has {len(names)}")
            out.append(("checkpoint", {"point": reached, "file": filename, "week": week["n"],
                                       "title": spec.get("title", "Checkpoint"),
                                       "say": spec.get("say", ""), "run": spec.get("run", ""),
                                       "seed": spec.get("seed")}))
            continue
        if spec.get("quiz"):
            for quiz in spec["quiz"]:
                balanced = balance_quiz(quiz)
                out.append(("quiz", {"quiz": balanced}))
                out.append(("quizanswer", {"quiz": balanced}))
            continue
        if spec.get("board"):
            out.append(("board", {"title": spec["board"], "lines": spec["lines"],
                                  "output": spec.get("output", ""), "note": spec.get("note", "")}))
            continue
        out.append(("concept", {"eyebrow": "", "title": spec["title"],
                                 "sub": spec.get("sub", ""), "bullets": spec.get("bullets", [])}))
        for filename, block in spec.get("code") or []:
            if typed >= len(points):
                raise SystemExit(f"week {week['n']}: slide '{spec['title']}' shows {filename}:{block}, "
                                 f"but the week has only {len(points)} op(s)")
            point = points[typed]
            typed += 1
            op_kind, op_file, op_block, _lines = point_op(point)
            if (op_file, op_block) != (filename, block):
                raise SystemExit(
                    f"week {week['n']}: slide '{spec['title']}' shows {filename}:{block}, but op "
                    f"{typed} of the week types {op_file}:{op_block} - the slides must follow "
                    f"the typing order")
            start, lines, marks, gone = block_code(point, filename, block)
            notes = line_notes(week["n"])[point]
            shown = 0
            # The first slide of a program says where its file comes from, once:
            # a new file to make, or last week's to bring along. Every slide
            # after it just says "Type this into".
            origin = None
            if filename not in opened:
                opened.add(filename)
                if op_kind == "add":
                    origin = "new"
                elif state_at(WEEK_END[week["n"] - 1]).get(filename):
                    origin = "carried"

            def emit_deletes(at, index):
                nonlocal shown
                # Everything removed from this spot goes on ONE slide, struck
                # through together - the run a student deletes in one go.
                group = gone.get(at, [])
                if not group:
                    return
                replacing = at in marks
                many = len(group) > 1
                if replacing:
                    default = ("These lines change - take the old ones out; the new "
                               "version is next." if many else
                               "This line changes - take the old one out; the new "
                               "version is next.")
                else:
                    default = ("Delete these lines - take them out." if many
                               else "Delete this line - take it out.")
                low = max(0, index - CONTEXT_LINES)
                note = (course.DELETE_NOTES.get((week["n"], filename, block))
                        or course.DELETE_NOTES.get((filename, block)) or default)
                out.append(("delete", {"file": filename, "start": start + low,
                                       "lines": lines[low:index], "dropped": group, "at": at,
                                       "replacing": replacing, "note": note,
                                       "origin": origin if not shown else None}))
                shown += 1

            for index, line in enumerate(lines):
                number = start + index
                emit_deletes(number, index)
                if not line.strip() or number not in marks:
                    continue
                for key in course.line_concepts(filename, line):
                    concept = course.CONCEPTS.get(key)
                    if concept and key not in seen:
                        seen.add(key)
                        kind, title, bullets = concept[0], concept[1], concept[2]
                        example = concept[3] if len(concept) > 3 else ""
                        out.append(("concept", {"eyebrow": {"java": "Java"}[kind], "title": title,
                                                "sub": example, "bullets": bullets,
                                                "vis": course.VISUALS.get(key)}))
                note = notes[index]
                if note is None:
                    continue  # a closing brace, folded into the line that opened it
                low = max(0, index + 1 - CONTEXT_LINES)
                out.append(("linectx", {"file": filename, "start": start + low,
                                        "lines": lines[low:index + 1], "hi": index - low,
                                        "note": note, "marks": marks,
                                        "origin": origin if not shown else None}))
                shown += 1
            emit_deletes(start + len(lines), len(lines))
            if shown > 1:
                # The whole piece, so they can check theirs before moving on. A
                # long block that only gained a few lines shows just the part
                # around them: the rest is on their screen already.
                low, high = 0, len(lines)
                if len(lines) > CONTEXT_LINES + 4:
                    changed = [offset for offset in range(len(lines) + 1)
                               if start + offset in marks or start + offset in gone]
                    low, high = max(0, min(changed) - 2), min(len(lines), max(changed) + 3)
                whole = lines[low:high]
                while whole and not whole[-1].strip():
                    whole.pop()
                out.append(("block", {"file": filename, "start": start + low,
                                      "lines": whole, "marks": marks, "block": block}))
            # The op is fully typed as of the last slide it produced; the
            # teacher's per-slide snapshot counts it done from there.
            out[-1][1]["completes"] = point
            reached = point
    if typed != len(points):
        raise SystemExit(f"week {week['n']}: the slides show {typed} of the week's "
                         f"{len(points)} ops - every op needs a slide that shows it")
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


# ---------------------------------------------------------------------------
# Visual metaphors for concept slides.
#
# A concept slide replaces its text bullets with a small animated picture that
# SHOWS what the code does (a box sliding onto a list, a token flowing through a
# function, a request bouncing to a server and back). Each concept names one
# "kind" of metaphor in course.VISUALS and fills in a couple of labels; the code
# below turns that spec into a self-contained inline <svg> plus its own scoped
# <style> (concrete @keyframes, uniquely named so slides never clash). No JS and
# no external libraries - it loops forever on CSS alone, so whenever a student
# lands on the slide they see the motion play within a few seconds.
#
# The .pptx cannot animate, so there it falls back to the concept's text bullets
# (still authored in CONCEPTS). Both decks stay one slide, so the drift guard is
# happy.
# ---------------------------------------------------------------------------
_VIS_SEQ = [0]
_VW, _VH = 680, 210          # viewBox
_BW, _BH, _GAP, _PITCH, _ROWY = 88, 64, 16, 104, 73


def _vbox(x, label, cls=""):
    """A list/array cell: rounded box with centred monospace text."""
    return ('<g class="vb {cls}"><rect class="vb-rect" x="{x}" y="{y}" width="{w}" '
            'height="{h}" rx="13"/><text class="vb-txt" x="{tx}" y="{ty}">{t}</text></g>').format(
                cls=cls, x=x, y=_ROWY, w=_BW, h=_BH, tx=x + _BW // 2, ty=_ROWY + _BH // 2,
                t=esc(label))


def _vtile(x, y, w, h, label, cls=""):
    """A small labelled tile (function input/output, network node, string)."""
    return ('<g class="vtile {cls}"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10"/>'
            '<text x="{tx}" y="{ty}">{t}</text></g>').format(
                cls=cls, x=x, y=y, w=w, h=h, tx=x + w // 2, ty=y + h // 2, t=esc(label))


def concept_visual(vis):
    """An animated inline SVG for one concept metaphor. Returns HTML."""
    _VIS_SEQ[0] += 1
    cid = "v%d" % _VIS_SEQ[0]
    k = vis["kind"]
    css, body = [], []

    def kf(name, frames):
        css.append("@keyframes %s{%s}" % (name, frames))

    def anim(sel, name, dur, ease="ease-in-out"):
        css.append(".%s{animation:%s %ss %s infinite}" % (sel, name, dur, ease))

    if k in ("arr-add", "arr-remove"):
        items = vis["items"]
        end = vis.get("end", "right")
        n = len(items)
        if k == "arr-add":
            slots = n + 1
            totalw = slots * _BW + (slots - 1) * _GAP
            startx = (_VW - totalw) // 2
            if end == "right":
                xs = [startx + i * _PITCH for i in range(n)]
                fin = startx + n * _PITCH
                off = _VW + 140 - fin
            else:
                xs = [startx + (i + 1) * _PITCH for i in range(n)]
                fin = startx
                off = -(fin + _BW + 120)
            for i, it in enumerate(items):
                body.append(_vbox(xs[i], it))
            body.append('<g class="%s-in">%s</g>' % (cid, _vbox(fin, vis.get("incoming", "new"), "vb-in")))
            kf(cid + "k", "0%%{transform:translateX(%dpx);opacity:0}12%%{opacity:1}"
               "42%%{transform:translateX(0);opacity:1}80%%{transform:translateX(0);opacity:1}"
               "90%%{opacity:0}100%%{transform:translateX(%dpx);opacity:0}" % (off, off))
            anim(cid + "-in", cid + "k", "3.4", "cubic-bezier(.5,0,.2,1)")
        else:
            totalw = n * _BW + (n - 1) * _GAP
            startx = (_VW - totalw) // 2
            xs = [startx + i * _PITCH for i in range(n)]
            li = n - 1 if end == "right" else 0
            off = 240 if end == "right" else -240
            for i, it in enumerate(items):
                if i == li:
                    body.append('<g class="%s-out">%s</g>' % (cid, _vbox(xs[i], it, "vb-in")))
                elif end == "left":
                    body.append('<g class="%s-rest">%s</g>' % (cid, _vbox(xs[i], it)))
                else:
                    body.append(_vbox(xs[i], it))
            kf(cid + "o", "0%%{transform:translateX(0);opacity:1}28%%{transform:translateX(0);opacity:1}"
               "52%%{transform:translateX(%dpx);opacity:0}86%%{opacity:0}"
               "100%%{transform:translateX(0);opacity:1}" % off)
            anim(cid + "-out", cid + "o", "3.4")
            if end == "left":
                kf(cid + "r", "0%%{transform:translateX(0)}28%%{transform:translateX(0)}"
                   "52%%{transform:translateX(-%dpx)}86%%{transform:translateX(-%dpx)}"
                   "100%%{transform:translateX(0)}" % (_PITCH, _PITCH))
                anim(cid + "-rest", cid + "r", "3.4")

    elif k == "loop":
        items = vis["items"]
        n = len(items)
        totalw = n * _BW + (n - 1) * _GAP
        startx = (_VW - totalw) // 2
        body.append('<rect class="%s-hi vb-hi" x="%d" y="%d" width="%d" height="%d" rx="14"/>'
                     % (cid, startx, _ROWY - 6, _BW, _BH + 12))
        for i, it in enumerate(items):
            body.append(_vbox(startx + i * _PITCH, it))
        seg = 100 // n
        frames = []
        for i in range(n):
            a, hold = i * seg, i * seg + max(1, seg // 2)
            frames.append("%d%%{transform:translateX(%dpx)}" % (a, i * _PITCH))
            frames.append("%d%%{transform:translateX(%dpx)}" % (hold, i * _PITCH))
        frames.append("100%{transform:translateX(0)}")
        kf(cid + "k", "".join(frames))
        anim(cid + "-hi", cid + "k", "%.1f" % max(2.6, n * 0.9))

    elif k == "machine":
        mw, mh = 190, 96
        mx, my = (_VW - mw) // 2, (_VH - mh) // 2
        tw, th = 92, 54
        ty = (_VH - th) // 2
        body.append('<rect class="vmachine" x="%d" y="%d" width="%d" height="%d" rx="16"/>'
                     % (mx, my, mw, mh))
        body.append('<text class="vmlabel" x="%d" y="%d">%s</text>'
                     % (mx + mw // 2, my + mh // 2, esc(vis.get("label", "f()"))))
        body.append('<g class="%s-in">%s</g>' % (cid, _vtile(mx - tw - 66, ty, tw, th, vis.get("in", "in"), "vt-in")))
        body.append('<g class="%s-out">%s</g>' % (cid, _vtile(mx + mw + 66, ty, tw, th, vis.get("out", "out"), "vt-out")))
        d = tw + 66
        kf(cid + "i", "0%%{transform:translateX(0);opacity:0}9%%{opacity:1}"
           "40%%{transform:translateX(%dpx);opacity:1}48%%{transform:translateX(%dpx);opacity:0}"
           "100%%{opacity:0}" % (d, d + 20))
        anim(cid + "-in", cid + "i", "3.6")
        kf(cid + "o", "0%%{transform:translateX(-%dpx);opacity:0}52%%{transform:translateX(-%dpx);opacity:0}"
           "62%%{transform:translateX(0);opacity:1}92%%{transform:translateX(0);opacity:1}"
           "100%%{transform:translateX(-%dpx);opacity:0}" % (d, d, d))
        anim(cid + "-out", cid + "o", "3.6")

    elif k == "network":
        nh = 64
        lw, rw = 150, 176
        lx, rx = 66, _VW - 66 - rw
        cy = _ROWY + nh // 2
        body.append(_vtile(lx, _ROWY, lw, nh, vis.get("from", "you")))
        body.append(_vtile(rx, _ROWY, rw, nh, vis.get("to", "server"), "vt-cloud"))
        dist = rx - (lx + lw) - 16
        body.append('<circle class="%s-req" cx="%d" cy="%d" r="12"/>' % (cid, lx + lw + 8, cy))
        kf(cid + "q", "0%%{transform:translateX(0);opacity:0}6%%{opacity:1}"
           "40%%{transform:translateX(%dpx);opacity:1}46%%{transform:translateX(%dpx);opacity:0}"
           "100%%{opacity:0}" % (dist, dist))
        css.append(".%s-req{fill:#ffd633}" % cid)
        anim(cid + "-req", cid + "q", "3.6")
        body.append('<circle class="%s-rep" cx="%d" cy="%d" r="12"/>' % (cid, rx - 8, cy))
        kf(cid + "p", "0%%{opacity:0}54%%{transform:translateX(0);opacity:0}60%%{opacity:1}"
           "94%%{transform:translateX(-%dpx);opacity:1}100%%{transform:translateX(-%dpx);opacity:0}" % (dist, dist))
        css.append(".%s-rep{fill:#7fe0a0}" % cid)
        anim(cid + "-rep", cid + "p", "3.6")

    elif k == "glue":
        tw, th, y1 = 132, 58, 36
        ax, bx = _VW // 2 - tw - 42, _VW // 2 + 42
        body.append(_vtile(ax, y1, tw, th, vis.get("a", '"Hi "')))
        body.append('<text class="vplus" x="%d" y="%d">+</text>' % (_VW // 2, y1 + th // 2))
        body.append(_vtile(bx, y1, tw, th, vis.get("b", "name")))
        rw = 260
        body.append('<text class="varrow" x="%d" y="122">&#8595;</text>' % (_VW // 2))
        body.append('<g class="%s-r">%s</g>' % (cid, _vtile((_VW - rw) // 2, 138, rw, th, vis.get("out", '"Hi Sam"'), "vt-out")))
        kf(cid + "r", "0%{opacity:0}38%{opacity:0}52%{opacity:1}92%{opacity:1}100%{opacity:0}")
        anim(cid + "-r", cid + "r", "3.2")

    elif k == "swap":
        bw, bh = 240, 90
        bx, by = (_VW - bw) // 2, (_VH - bh) // 2
        tx, ty = bx + bw // 2, by + bh // 2
        body.append('<g class="%s-off"><rect class="vswap-off" x="%d" y="%d" width="%d" height="%d" rx="15"/>'
                     '<text class="vb-txt" x="%d" y="%d">%s</text></g>'
                     % (cid, bx, by, bw, bh, tx, ty, esc(vis.get("off", "off"))))
        body.append('<g class="%s-on"><rect class="vswap-on" x="%d" y="%d" width="%d" height="%d" rx="15"/>'
                     '<text class="vb-txt" x="%d" y="%d">%s</text></g>'
                     % (cid, bx, by, bw, bh, tx, ty, esc(vis.get("on", "on"))))
        kf(cid + "f", "0%{opacity:1}44%{opacity:1}56%{opacity:0}94%{opacity:0}100%{opacity:1}")
        kf(cid + "n", "0%{opacity:0}44%{opacity:0}56%{opacity:1}94%{opacity:1}100%{opacity:0}")
        anim(cid + "-off", cid + "f", "3.0")
        anim(cid + "-on", cid + "n", "3.0")

    elif k == "boxmodel":
        layer = vis.get("layer", "padding")
        w, h = 380, 156
        x, y = (_VW - w) // 2, (_VH - h) // 2
        rects = {
            "margin": (x, y, w, h),
            "border": (x + 26, y + 26, w - 52, h - 52),
            "padding": (x + 50, y + 50, w - 100, h - 100),
        }
        colours = {"margin": "#ffd633", "border": "#c98be0", "padding": "#7fe0a0"}
        for name in ("margin", "border", "padding"):
            rx, ry, rw2, rh2 = rects[name]
            dash = ' stroke-dasharray="7 6"' if name == "margin" else ""
            cls = ' class="%s-pulse"' % cid if name == layer else ""
            body.append('<rect%s x="%d" y="%d" width="%d" height="%d" rx="8" fill="none" '
                        'stroke="%s" stroke-width="3"%s/>' % (cls, rx, ry, rw2, rh2, colours[name], dash))
        cxr = rects["padding"]
        body.append('<rect x="%d" y="%d" width="%d" height="%d" rx="6" fill="#132833"/>'
                     % (cxr[0] + 20, cxr[1] + 18, cxr[2] - 40, cxr[3] - 36))
        body.append('<text class="vb-txt" x="%d" y="%d" style="font-size:22px">content</text>'
                     % (_VW // 2, _VH // 2))
        kf(cid + "k", "0%{stroke-width:3;opacity:.55}50%{stroke-width:7;opacity:1}100%{stroke-width:3;opacity:.55}")
        anim(cid + "-pulse", cid + "k", "1.8")

    elif k == "box":                                   # a variable = a labelled box
        bw, bh, by = 220, 90, 106
        bx = (_VW - bw) // 2
        body.append('<text class="vmlabel" x="%d" y="66" style="font-size:24px">%s</text>'
                     % (_VW // 2, esc(vis.get("name", "value"))))
        body.append('<rect class="vmachine" x="%d" y="%d" width="%d" height="%d" rx="14"/>' % (bx, by, bw, bh))
        tw, th = 130, 52
        body.append('<g class="%s-v">%s</g>' % (cid, _vtile((_VW - tw) // 2, by + (bh - th) // 2, tw, th, vis.get("value", "0"), "vt-in")))
        kf(cid + "k", "0%{transform:translateY(-92px);opacity:0}18%{opacity:1}44%{transform:translateY(6px);opacity:1}"
           "54%{transform:translateY(0)}86%{transform:translateY(0);opacity:1}94%{opacity:0}100%{transform:translateY(-92px);opacity:0}")
        anim(cid + "-v", cid + "k", "3.2")

    elif k == "pick":                                  # a pointer picking one cell
        items, at = vis["items"], vis.get("at", 0)
        n = len(items)
        totalw = n * _BW + (n - 1) * _GAP
        startx = (_VW - totalw) // 2
        tx = startx + at * _PITCH
        for i, it in enumerate(items):
            body.append(_vbox(startx + i * _PITCH, it, "vb-pick" if i == at else ""))
        body.append('<g class="%s-pt"><text class="vmlabel" x="%d" y="34" style="font-size:22px">%s</text>'
                     '<text class="varrow" x="%d" y="60" style="font-size:34px">&#8595;</text></g>'
                     % (cid, tx + _BW // 2, esc(vis.get("label", "[0]")), tx + _BW // 2))
        kf(cid + "k", "0%{transform:translateY(0)}50%{transform:translateY(-9px)}100%{transform:translateY(0)}")
        anim(cid + "-pt", cid + "k", "1.5")

    elif k == "fork":                                  # a check that branches two ways
        cxc = _VW // 2
        body.append('<rect class="vmachine" x="%d" y="16" width="180" height="58" rx="12"/>' % (cxc - 90))
        body.append('<text class="vmlabel" x="%d" y="45" style="font-size:21px">%s</text>' % (cxc, esc(vis.get("cond", "check"))))
        tw, th, ly = 156, 58, 140
        lx, rx = cxc - tw - 34, cxc + 34
        body.append('<path d="M%d,74 L%d,%d" stroke="#33586a" stroke-width="2.5" fill="none"/>' % (cxc, lx + tw // 2, ly))
        body.append('<path d="M%d,74 L%d,%d" stroke="#33586a" stroke-width="2.5" fill="none"/>' % (cxc, rx + tw // 2, ly))
        body.append(_vtile(lx, ly, tw, th, vis.get("yes", "true"), "vt-out"))
        body.append(_vtile(rx, ly, tw, th, vis.get("no", "false"), "vt-no"))
        body.append('<circle class="%s-tok" cx="%d" cy="74" r="10"/>' % (cid, cxc))
        dx, dy = lx + tw // 2 - cxc, ly - 74
        kf(cid + "k", "0%%{transform:translate(0,0);opacity:0}12%%{opacity:1}58%%{transform:translate(%dpx,%dpx);opacity:1}"
           "78%%{transform:translate(%dpx,%dpx);opacity:0}100%%{opacity:0}" % (dx, dy, dx, dy))
        css.append(".%s-tok{fill:#ffd633}" % cid)
        anim(cid + "-tok", cid + "k", "3.0")

    elif k == "event":                                 # a click sparks code to run
        bx, by, bw, bh = 84, _ROWY, 156, 64
        body.append(_vtile(bx, by, bw, bh, vis.get("btn", "button"), "vt-btn"))
        body.append('<circle class="%s-rip" cx="%d" cy="%d" r="16" fill="none" stroke="#ffd633" stroke-width="3"/>'
                     % (cid, bx + bw // 2, by + bh // 2))
        kf(cid + "r", "0%{r:14px;opacity:.9}70%{r:54px;opacity:0}100%{r:54px;opacity:0}")
        anim(cid + "-rip", cid + "r", "2.6")
        cx2 = _VW - 84 - 200
        body.append('<g class="%s-code">%s</g>' % (cid, _vtile(cx2, by, 200, bh, vis.get("action", "run code"), "vt-out")))
        body.append('<circle class="%s-sp" cx="%d" cy="%d" r="8"/>' % (cid, bx + bw + 8, by + bh // 2))
        dist = cx2 - (bx + bw) - 16
        kf(cid + "s", "0%%{transform:translateX(0);opacity:0}20%%{opacity:1}54%%{transform:translateX(%dpx);opacity:1}"
           "62%%{opacity:0}100%%{opacity:0}" % dist)
        css.append(".%s-sp{fill:#ffd633}" % cid)
        anim(cid + "-sp", cid + "s", "2.6")
        kf(cid + "f", "0%{opacity:.55}56%{opacity:.55}64%{opacity:1}90%{opacity:1}100%{opacity:.55}")
        anim(cid + "-code", cid + "f", "2.6")

    elif k == "dom":                                   # a child node nests in a parent
        pw, ph = 320, 128
        px, py = (_VW - pw) // 2, (_VH - ph) // 2
        body.append('<rect class="vmachine" x="%d" y="%d" width="%d" height="%d" rx="14"/>' % (px, py, pw, ph))
        body.append('<text class="vmlabel" x="%d" y="%d" style="font-size:20px">%s</text>'
                     % (px + pw // 2, py + 22, esc(vis.get("parent", "parent"))))
        tw, th = 168, 52
        tx, ty = px + (pw - tw) // 2, py + ph - th - 16
        body.append('<g class="%s-c">%s</g>' % (cid, _vtile(tx, ty, tw, th, vis.get("child", "child"), "vt-out")))
        if vis.get("mode", "add") == "add":
            kf(cid + "k", "0%{transform:translateY(-128px);opacity:0}20%{opacity:1}48%{transform:translateY(0);opacity:1}"
               "86%{transform:translateY(0);opacity:1}94%{opacity:0}100%{transform:translateY(-128px);opacity:0}")
        else:
            kf(cid + "k", "0%{transform:translateY(0);opacity:1}30%{transform:translateY(0);opacity:1}"
               "56%{transform:translateY(-128px);opacity:0}100%{transform:translateY(-128px);opacity:0}")
        anim(cid + "-c", cid + "k", "3.2")

    elif k == "tag":                                   # opening + closing tags hug content
        name = vis.get("tag", "p")
        if vis.get("selfclose"):
            lbl = vis.get("open", "<%s />" % name)
            body.append(_vtile((_VW - 300) // 2, _ROWY, 300, 64, lbl, "vt-tag"))
        else:
            openl = vis.get("open", "<%s>" % name)
            closel = vis.get("close", "</%s>" % name)
            ow, cw, conw, g = 130, 130, 230, 12
            total = ow + conw + cw + 2 * g
            sx = (_VW - total) // 2
            body.append('<g class="%s-o">%s</g>' % (cid, _vtile(sx, _ROWY, ow, 64, openl, "vt-tag")))
            body.append(_vtile(sx + ow + g, _ROWY, conw, 64, vis.get("content", "text")))
            body.append('<g class="%s-c">%s</g>' % (cid, _vtile(sx + ow + g + conw + g, _ROWY, cw, 64, closel, "vt-tag")))
            kf(cid + "o", "0%{transform:translateX(0)}50%{transform:translateX(11px)}100%{transform:translateX(0)}")
            kf(cid + "c", "0%{transform:translateX(0)}50%{transform:translateX(-11px)}100%{transform:translateX(0)}")
            anim(cid + "-o", cid + "o", "2.2")
            anim(cid + "-c", cid + "c", "2.2")

    elif k == "swatch":                                # a colour that shifts
        target = vis.get("target", "box")
        a, b = vis.get("a", "#1f6feb"), vis.get("b", "#7c5cff")
        bw, bh = 280, 108
        bx, by = (_VW - bw) // 2, (_VH - bh) // 2 - 8
        if target == "text":
            body.append('<rect x="%d" y="%d" width="%d" height="%d" rx="14" fill="#132833" stroke="#33586a" stroke-width="2.5"/>' % (bx, by, bw, bh))
            body.append('<text class="%s-sw" x="%d" y="%d" style="font:800 40px Rubik,sans-serif;text-anchor:middle;dominant-baseline:central">Text</text>' % (cid, _VW // 2, by + bh // 2))
            kf(cid + "k", "0%%{fill:%s}50%%{fill:%s}100%%{fill:%s}" % (a, b, a))
        elif target == "border":
            body.append('<rect class="%s-sw" x="%d" y="%d" width="%d" height="%d" rx="14" fill="#132833" stroke="%s" stroke-width="7"/>' % (cid, bx, by, bw, bh, a))
            kf(cid + "k", "0%%{stroke:%s}50%%{stroke:%s}100%%{stroke:%s}" % (a, b, a))
        else:
            body.append('<rect class="%s-sw" x="%d" y="%d" width="%d" height="%d" rx="14" stroke="#33586a" stroke-width="2" fill="%s"/>' % (cid, bx, by, bw, bh, a))
            kf(cid + "k", "0%%{fill:%s}50%%{fill:%s}100%%{fill:%s}" % (a, b, a))
        css.append(".%s-sw{animation:%sk 3.0s ease-in-out infinite}" % (cid, cid))
        body.append('<text x="%d" y="%d" style="font:700 20px Consolas,monospace;text-anchor:middle;fill:#8fb3bd">%s</text>'
                     % (_VW // 2, by + bh + 26, esc(vis.get("label", b))))

    elif k == "resize":                                # a box that grows on one axis
        bw, bh = 128, 128
        body.append('<rect class="%s-rz" x="%d" y="%d" width="%d" height="%d" rx="12" fill="#0f2c38" stroke="#01aefd" stroke-width="3"/>'
                     % (cid, (_VW - bw) // 2, (_VH - bh) // 2, bw, bh))
        if vis.get("axis", "w") == "w":
            kf(cid + "k", "0%{transform:scaleX(.45)}50%{transform:scaleX(1.7)}100%{transform:scaleX(.45)}")
        else:
            kf(cid + "k", "0%{transform:scaleY(.45)}50%{transform:scaleY(1.5)}100%{transform:scaleY(.45)}")
        css.append(".%s-rz{transform-box:fill-box;transform-origin:center;animation:%sk 2.6s ease-in-out infinite}" % (cid, cid))

    elif k == "round":                                 # corners rounding off
        bw, bh = 150, 150
        body.append('<rect class="%s-r" x="%d" y="%d" width="%d" height="%d" fill="#0f2c38" stroke="#01aefd" stroke-width="3"/>'
                     % (cid, (_VW - bw) // 2, (_VH - bh) // 2, bw, bh))
        kf(cid + "k", "0%{rx:2px;ry:2px}50%{rx:46px;ry:46px}100%{rx:2px;ry:2px}")
        css.append(".%s-r{animation:%sk 2.6s ease-in-out infinite}" % (cid, cid))

    elif k == "textsize":                              # text growing
        body.append('<text class="%s-t" x="%d" y="%d" style="fill:#01aefd;text-anchor:middle;dominant-baseline:central;font-weight:800;font-family:Rubik,sans-serif">Aa</text>'
                     % (cid, _VW // 2, _VH // 2))
        kf(cid + "k", "0%{font-size:32px}50%{font-size:96px}100%{font-size:32px}")
        css.append(".%s-t{animation:%sk 2.6s ease-in-out infinite}" % (cid, cid))

    elif k == "linegap":                               # line spacing opening up
        for tag2, lbl, base in (("a", "line one", -24), ("b", "line two", 24)):
            body.append('<g class="%s-%s"><text x="%d" y="%d" style="fill:#e6f2f6;text-anchor:middle;dominant-baseline:central;font:700 26px Rubik,sans-serif">%s</text></g>'
                         % (cid, tag2, _VW // 2, _VH // 2 + base, lbl))
        kf(cid + "a", "0%{transform:translateY(0)}50%{transform:translateY(-22px)}100%{transform:translateY(0)}")
        kf(cid + "b", "0%{transform:translateY(0)}50%{transform:translateY(22px)}100%{transform:translateY(0)}")
        anim(cid + "-a", cid + "a", "2.6")
        anim(cid + "-b", cid + "b", "2.6")

    elif k == "motion":                                # something moving on its own
        cy = _VH // 2
        body.append('<line x1="72" y1="%d" x2="%d" y2="%d" stroke="#33586a" stroke-width="2" stroke-dasharray="6 6"/>' % (cy, _VW - 72, cy))
        body.append('<circle class="%s-m" cx="90" cy="%d" r="18" fill="#01aefd"/>' % (cid, cy))
        kf(cid + "k", "0%%{transform:translateX(0)}50%%{transform:translateX(%dpx)}100%%{transform:translateX(0)}" % (_VW - 180))
        anim(cid + "-m", cid + "k", "2.4")

    elif k == "scroll":                                # content scrolling in a viewport
        vw2, vh2 = 300, 140
        vx, vy = (_VW - vw2) // 2, (_VH - vh2) // 2
        body.append('<clipPath id="%s-clip"><rect x="%d" y="%d" width="%d" height="%d" rx="10"/></clipPath>' % (cid, vx, vy, vw2, vh2))
        body.append('<rect x="%d" y="%d" width="%d" height="%d" rx="10" fill="#0f1b21" stroke="#33586a" stroke-width="2.5"/>' % (vx, vy, vw2, vh2))
        rowsn, lh = 8, 30
        inner = "".join('<rect x="%d" y="%d" width="%d" height="16" rx="4" fill="#2a4a57"/>' % (vx + 18, vy + 14 + i * lh, vw2 - 70) for i in range(rowsn))
        body.append('<g clip-path="url(#%s-clip)"><g class="%s-sc">%s</g></g>' % (cid, cid, inner))
        dist = rowsn * lh + 14 - vh2
        kf(cid + "k", "0%%{transform:translateY(0)}45%%{transform:translateY(-%dpx)}55%%{transform:translateY(-%dpx)}100%%{transform:translateY(0)}" % (dist, dist))
        anim(cid + "-sc", cid + "k", "4.0", "linear")
        body.append('<rect class="%s-th" x="%d" y="%d" width="6" height="40" rx="3" fill="#01aefd"/>' % (cid, vx + vw2 - 12, vy + 8))
        kf(cid + "t", "0%%{transform:translateY(0)}45%%{transform:translateY(%dpx)}55%%{transform:translateY(%dpx)}100%%{transform:translateY(0)}" % (vh2 - 56, vh2 - 56))
        anim(cid + "-th", cid + "t", "4.0", "linear")

    elif k == "card":                                  # an object as a key:value card
        rows = vis.get("rows", [("role", "user"), ("text", "hi")])
        n = len(rows)
        cw, rh = 380, 46
        ch = 30 + n * rh
        cx, cy = (_VW - cw) // 2, (_VH - ch) // 2
        body.append('<rect class="vmachine" x="%d" y="%d" width="%d" height="%d" rx="14"/>' % (cx, cy, cw, ch))
        for i, (kk, vv) in enumerate(rows):
            ry = cy + 22 + i * rh
            body.append('<text x="%d" y="%d" style="fill:#7fd8ff;font:700 22px Consolas,monospace;dominant-baseline:central">%s:</text>' % (cx + 26, ry, esc(kk)))
            body.append('<text x="%d" y="%d" style="fill:#e6f2f6;font:700 22px Consolas,monospace;text-anchor:end;dominant-baseline:central">%s</text>' % (cx + cw - 26, ry, esc(vv)))
        hy = cy + 22 - (rh - 8) // 2
        body.append('<rect class="%s-hl vb-hi" x="%d" y="%d" width="%d" height="%d" rx="8"/>' % (cid, cx + 10, hy, cw - 20, rh - 8))
        frames = []
        for i in range(n):
            a, hold = i * (100 // n), i * (100 // n) + (100 // n) // 2
            frames.append("%d%%{transform:translateY(%dpx)}" % (a, i * rh))
            frames.append("%d%%{transform:translateY(%dpx)}" % (hold, i * rh))
        frames.append("100%{transform:translateY(0)}")
        kf(cid + "k", "".join(frames))
        css.append(".%s-hl{opacity:.55;animation:%sk %.1fs ease-in-out infinite}" % (cid, cid, max(2.4, n * 0.9)))

    elif k == "tiles":                                 # labelled parts of a line, swept
        parts = vis["parts"]
        n = len(parts)
        ws = [max(84, 28 + len(str(p)) * 15) for p in parts]
        g = 14
        total = sum(ws) + g * (n - 1)
        x = (_VW - total) // 2
        xs = []
        for w in ws:
            xs.append(x)
            x += w + g
        for i, p in enumerate(parts):
            body.append(_vtile(xs[i], _ROWY, ws[i], 64, p))
        dur = max(2.4, n * 0.85)
        kf(cid + "k", "0%{opacity:0}12%{opacity:.85}26%{opacity:0}100%{opacity:0}")
        for i in range(n):
            body.append('<rect class="%s-h%d vb-hi" x="%d" y="%d" width="%d" height="76" rx="12"/>' % (cid, i, xs[i], _ROWY - 6, ws[i]))
            css.append(".%s-h%d{opacity:0;animation:%sk %.1fs ease-in-out infinite;animation-delay:%.2fs}" % (cid, i, cid, dur, i * dur / n))

    elif k == "flex":                                  # items settling into a layout
        mode = vis.get("mode", "row")
        items = vis.get("items", ["A", "B", "C"])
        n = len(items)
        tw, th = 104, 64
        rowy = _VH // 2 - th // 2

        def _spread(gap):
            tot = n * tw + (n - 1) * gap
            sx = (_VW - tot) // 2
            return [(sx + i * (tw + gap), rowy) for i in range(n)]

        if mode == "gap":
            start, target = _spread(2), _spread(48)
        elif mode == "column":
            start = _spread(20)
            th = 50
            ch = n * th + (n - 1) * 8
            sy = (_VH - ch) // 2
            target = [((_VW - tw) // 2, sy + i * (th + 8)) for i in range(n)]
        elif mode == "end":
            left = [(40 + i * (tw + 16), rowy) for i in range(n)]
            start = left[:]
            target = left[:]
            target[-1] = (_VW - 40 - tw, rowy)
        elif mode == "wrap":
            per = (n + 1) // 2

            def _rowpos(idxs, y):
                m = len(idxs)
                tot = m * tw + (m - 1) * 16
                sx = (_VW - tot) // 2
                return {idxs[j]: (sx + j * (tw + 16), y) for j in range(m)}
            tpos = {}
            tpos.update(_rowpos(list(range(per)), rowy - 40))
            tpos.update(_rowpos(list(range(per, n)), rowy + 40))
            start = [((_VW - tw) // 2, rowy)] * n
            target = [tpos[i] for i in range(n)]
        else:  # row
            start, target = [((_VW - tw) // 2, rowy)] * n, _spread(20)
        for i, it in enumerate(items):
            s, t = start[i], target[i]
            body.append('<g class="%s-i%d">%s</g>' % (cid, i, _vtile(s[0], s[1], tw, th, it)))
            kf("%si%d" % (cid, i), "0%%{transform:translate(0,0)}42%%{transform:translate(%dpx,%dpx)}"
               "84%%{transform:translate(%dpx,%dpx)}100%%{transform:translate(0,0)}"
               % (t[0] - s[0], t[1] - s[1], t[0] - s[0], t[1] - s[1]))
            anim("%s-i%d" % (cid, i), "%si%d" % (cid, i), "3.6")

    svg = '<svg viewBox="0 0 %d %d" role="img" aria-label="%s">%s</svg>' % (
        _VW, _VH, esc(vis.get("cap", "")), "".join(body))
    return '<div class="vis"><style>%s</style>%s</div>' % ("".join(css), svg)


def deck_render_html(desc):
    """One deck slide as HTML, for any descriptor slide_plan() produces."""
    kind, d = desc
    if kind == "concept":
        eyebrow = f'<p class="eyebrow">{esc(d["eyebrow"])}</p>' if d.get("eyebrow") else ""
        sub = ""
        if d.get("sub"):
            code_ish = any(mark in d["sub"] for mark in ("(", "{", "[", "=", ".", "/", ":", ";", "<"))
            sub = '<p class="sub{0}">{1}</p>'.format(" mono" if code_ish else "", esc(d["sub"]))
        # A concept with a visual metaphor shows the animation and one caption
        # in place of the text bullets; without one it keeps the bullet list.
        if d.get("vis"):
            vis = d["vis"]
            cap = '<p class="vis-cap">{0}</p>'.format(esc(vis["cap"])) if vis.get("cap") else ""
            return ('<section class="slide concept-vis">{0}<h2>{1}</h2>{2}{3}{4}</section>').format(
                eyebrow, esc(d["title"]), sub, concept_visual(vis), cap)
        pts = "".join("<li>{0}</li>".format(esc(pt)) for pt in d.get("bullets", []))
        pts = '<ul class="pts">{0}</ul>'.format(pts) if pts else ""
        return '<section class="slide">{0}<h2>{1}</h2>{2}{3}</section>'.format(
            eyebrow, esc(d["title"]), sub, pts)
    if kind == "board":
        output = ""
        if d.get("output"):
            output = ('<div class="board-out"><p>It prints</p><pre>{0}</pre></div>'
                      .format(esc(d["output"].strip("\n"))))
        return ('<section class="slide dark line board">'
                '<p class="filebar">On the board <span class="part">{0} &middot; watch, nothing to type</span></p>'
                '{1}{2}<p class="linenote">{3}</p></section>').format(
                    esc(d["title"]), _code_table_html(1, d["lines"], None, set()), output, esc(d["note"]))
    if kind == "checkpoint":
        _VIS_SEQ[0] += 1
        cid = "cp%d" % _VIS_SEQ[0]
        return ('<section class="slide checkpoint">'
                '<p class="eyebrow">Checkpoint &middot; run it</p>'
                '<h2>{0}</h2><p class="cp-say">{1}</p>'
                '<div class="cp-actions">'
                '<button class="cp-run" data-cp="{2}">&#9654; Show a sample run</button>'
                '<button class="cp-zip" data-cp="{2}">&#8595; Download {5}</button>'
                '</div>'
                '<div class="cp-out" id="out-{2}" hidden>{3}</div>'
                '<script type="application/json" id="files-{2}">{4}</script>'
                '</section>').format(esc(d["title"]), esc(d["say"]), cid,
                                     transcript_html(d["run"]),
                                     checkpoint_files_json(d["point"], d["file"]), esc(d["file"]))
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
        for j, line in enumerate(d["dropped"]):
            rows.append('<tr class="gone hi"><td class="ln">{0}</td><td>{1}</td></tr>'.format(
                d["at"] + j, esc(line) or "&nbsp;"))
        count = len(d["dropped"])
        what = "a line" if count == 1 else "%d lines" % count
        label = ("replace " if d.get("replacing") else "delete ") + what
        return ('<section class="slide dark line del">'
                '<p class="filebar"><span>In {0}</span> <span class="part">{1}</span></p>'
                '<table class="code">{2}</table><p class="linenote">{3}</p></section>').format(
                    file_label(d), label, "".join(rows), esc(d["note"]))
    # a single line in context, with its explanation
    return ('<section class="slide dark line">'
            '<p class="filebar"><span>{0}</span> <span class="part">line {1}</span></p>'
            '{2}<p class="linenote">{3}</p></section>').format(
                typing_label(d), d["start"] + d["hi"],
                _code_table_html(d["start"], d["lines"], d["hi"], d["marks"]),
                esc(d["note"]))


def build_slides():
    try:
        from pptx import Presentation
        from pptx.util import Inches, Pt
        from pptx.dml.color import RGBColor
        from pptx.enum.shapes import MSO_SHAPE
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

    def board_slide(deck, d):
        """An example the teacher shows and nobody types - the .pptx twin of
        the web deck's board slide. Code in the plain colour, what it prints
        in green below it."""
        slide = deck.slides.add_slide(deck.slide_layouts[6])
        bg = slide.background.fill; bg.solid(); bg.fore_color.rgb = DARK
        head = slide.shapes.add_textbox(Inches(0.55), Inches(0.3), Inches(12.2), Inches(0.6))
        head.text_frame.text = f"On the board   -   {d['title']}   (watch, nothing to type)"
        hr = head.text_frame.paragraphs[0].runs[0]
        hr.font.size, hr.font.bold, hr.font.color.rgb = Pt(22), True, BRAND
        output = d["output"].strip("\n").split("\n") if d.get("output") else []
        rows = [(line, PAPER) for line in d["lines"]]
        if output:
            rows += [(" ", PAPER), ("It prints:", GUTTER)] + [(line, NEW) for line in output]
        box = slide.shapes.add_textbox(Inches(0.55), Inches(1.05), Inches(12.2), Inches(4.7))
        frame = box.text_frame; frame.word_wrap = False
        size = Pt(18) if len(rows) <= 10 else Pt(13) if len(rows) <= 18 else Pt(10)
        for index, (line, colour) in enumerate(rows):
            para = frame.paragraphs[0] if index == 0 else frame.add_paragraph()
            para.space_after = Pt(0)
            code = para.add_run(); code.text = line if line.strip() else " "
            code.font.name, code.font.size, code.font.color.rgb = "Consolas", size, colour
        nb = slide.shapes.add_textbox(Inches(0.6), Inches(6.15), Inches(12.1), Inches(1.15))
        nf = nb.text_frame; nf.word_wrap = True
        nf.paragraphs[0].text = d["note"] or " "
        nr = nf.paragraphs[0].runs[0]; nr.font.size, nr.font.color.rgb = Pt(20), PAPER

    def ctx_slide(deck, filename, start, lines, hi, note, heading=None):
        """The block written so far, with line `hi` highlighted (or every line
        green when hi is None, for the whole-chunk slide), and a note below."""
        slide = deck.slides.add_slide(deck.slide_layouts[6])
        bg = slide.background.fill; bg.solid(); bg.fore_color.rgb = DARK
        head = slide.shapes.add_textbox(Inches(0.55), Inches(0.3), Inches(12.2), Inches(0.6))
        head.text_frame.text = (f"{heading}   -   line {start + hi}"
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

    def del_slide(deck, heading, start, context, dropped, note, replacing=False):
        """The block with the run of lines to remove struck through together."""
        slide = deck.slides.add_slide(deck.slide_layouts[6])
        bg = slide.background.fill; bg.solid(); bg.fore_color.rgb = DARK
        head = slide.shapes.add_textbox(Inches(0.55), Inches(0.3), Inches(12.2), Inches(0.6))
        what = "a line" if len(dropped) == 1 else f"{len(dropped)} lines"
        head.text_frame.text = f"In {heading}   -   {'replace' if replacing else 'delete'} {what}"
        hr = head.text_frame.paragraphs[0].runs[0]
        hr.font.size, hr.font.bold, hr.font.color.rgb = Pt(22), True, BRAND
        box = slide.shapes.add_textbox(Inches(0.55), Inches(1.05), Inches(12.2), Inches(4.7))
        frame = box.text_frame; frame.word_wrap = False
        rows = list(context) + list(dropped)
        size = Pt(18) if len(rows) <= 10 else Pt(13)
        first = [True]
        for j, line in enumerate(rows):
            para = frame.paragraphs[0] if first[0] else frame.add_paragraph()
            first[0] = False; para.space_after = Pt(0)
            struck = j >= len(context)
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
            elif kind == "board":
                board_slide(deck, d)
            elif kind == "checkpoint":
                # PowerPoint cannot reveal the run on a click, so it says where it is.
                concept_slide(deck, {"title": d["title"], "sub": d["say"],
                                     "bullets": ["Press Run in the classroom editor, or Ctrl+Enter.",
                                                 "Press Show a sample run in the web deck to compare."]},
                              eyebrow="Checkpoint - run it")
            elif kind == "block":
                ctx_slide(deck, d["file"], d["start"], d["lines"], None,
                          "That is the whole piece. Check yours looks the same before moving on.")
            elif kind == "delete":
                del_slide(deck, plain(file_label(d)), d["start"], d["lines"], d["dropped"], d["note"],
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
                ctx_slide(deck, d["file"], d["start"], d["lines"], d["hi"], d["note"],
                          heading=plain(typing_label(d)))
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
.cp-actions{display:flex;flex-wrap:wrap;gap:10px}
.cp-zip{font:inherit;font-weight:700;color:#0a6299;background:#fff;border:2px solid #0a6299;border-radius:8px;
padding:.45em 1em;font-size:clamp(14px,1.6vw,19px);cursor:pointer}
.cp-zip:hover{background:#e8f4fb}
.cp-out{margin-top:16px;width:100%}
.cp-out[hidden]{display:none}
.cp-transcript{max-height:none;white-space:pre;overflow-x:auto;font-size:clamp(12px,1.45vw,18px);line-height:1.5}
.cp-key{float:right;font-weight:600;color:#9fb9c2}
.typed{color:#9fd8ee;font-weight:700;text-decoration:underline;text-underline-offset:3px}
.clue-g{color:#7fe0a0;font-weight:800}
.clue-y{color:#f4c869;font-weight:800}
.cleared{display:block;color:#9fb9c2;font-style:italic;border-top:1px dashed #4d6a74;margin:.3em 0}
.slide.board .filebar{color:#ffd633}
.board-out{margin:0 0 .8em}
.board-out p{margin:0 0 .3em;color:#8fa9b3;font-size:clamp(13px,1.5vw,20px);font-weight:700;
letter-spacing:.05em;text-transform:uppercase}
.board-out pre{margin:0;padding:.5em .8em;border-radius:8px;background:#0b171c;color:#7fe0a0;
font:clamp(13px,1.8vw,24px)/1.45 Consolas,"SF Mono",Menlo,monospace;white-space:pre-wrap}
.cp-console{margin-top:12px;border:1px solid #21414c;border-radius:8px;overflow:hidden;background:#0f1b21}
.cp-console-head{padding:6px 12px;background:#16303a;color:#cfe3e8;font-size:13px;font-weight:700;
letter-spacing:.03em}
.cp-console-body{max-height:min(22vh,180px);overflow:auto;padding:8px 12px;
font:13px/1.5 Consolas,"SF Mono",Menlo,monospace;color:#dcecef}
.cp-console-body .cp-muted{color:#7f9aa4}
.cp-row{white-space:pre-wrap;overflow-wrap:anywhere;padding:1px 0}
.cp-row.error{color:#ff9d8e}.cp-row.warn{color:#f4c869}.cp-row.net{color:#8fb3bd}.cp-row.info{color:#9fd8ee}
@media (max-width:640px){.bar .hint{display:none}}
.slide.concept-vis{align-items:center;text-align:center;justify-content:center}
.slide.concept-vis .sub{margin-top:.4em}
.vis{width:100%;max-width:min(780px,94%);margin:clamp(12px,2.6vh,26px) auto 0}
.vis.mock{max-width:min(500px,66%)}
.vis svg{width:100%;height:auto;display:block;overflow:visible}
.vis-cap{color:#0a6299;text-align:center;font-size:clamp(16px,2.1vw,27px);font-weight:600;
margin:clamp(8px,1.8vh,18px) auto 0;max-width:40ch}
.vb-rect{fill:#132833;stroke:#33586a;stroke-width:2.5}
.vb-txt{fill:#e6f2f6;font:700 30px Consolas,"SF Mono",Menlo,monospace;text-anchor:middle;dominant-baseline:central}
.vb-in .vb-rect{fill:#20301b;stroke:#ffd633}
.vb-hi{fill:rgba(1,174,253,.30);stroke:#01aefd;stroke-width:3}
.vmachine{fill:#0f2c38;stroke:#01aefd;stroke-width:3}
.vmlabel{fill:#7fd8ff;font:800 26px Rubik,system-ui,sans-serif;text-anchor:middle;dominant-baseline:central}
.vtile rect{fill:#16303a;stroke:#33586a;stroke-width:2.5}
.vtile text{fill:#e6f2f6;font:700 23px Consolas,"SF Mono",Menlo,monospace;text-anchor:middle;dominant-baseline:central}
.vt-in rect{stroke:#ffd633}
.vt-out rect{fill:#16321f;stroke:#7fe0a0}
.vt-cloud rect{fill:#0f2c38;stroke:#01aefd}
.vplus{fill:#7fd8ff;font:800 42px Rubik,system-ui,sans-serif;text-anchor:middle;dominant-baseline:central}
.varrow{fill:#5b8aa0;font:800 30px Rubik,system-ui,sans-serif;text-anchor:middle;dominant-baseline:central}
.vswap-off{fill:#2a2030;stroke:#c98be0;stroke-width:3}
.vswap-on{fill:#16321f;stroke:#7fe0a0;stroke-width:3}
.vb-pick .vb-rect{fill:#16321f;stroke:#7fe0a0}
.vt-btn rect{fill:#0f2c38;stroke:#01aefd}
.vt-tag rect{fill:#0f2c38;stroke:#01aefd}
.vt-tag text{fill:#7fd8ff}
.vt-no rect{fill:#1a2730;stroke:#7c909d}
.vt-no text{fill:#aebfcb}
"""

DECK_JS = r"""
var slides = [].slice.call(document.querySelectorAll('.slide'));
var dots = [].slice.call(document.querySelectorAll('.dots i'));
var count = document.querySelector('.count');
var at = 0;
// The week this deck is (from its own filename), so the classroom shell knows
// which week + slide the teacher is on - that is the compare point for the
// teacher's "Identify problem" (only what the class has reached so far).
var DECK_WEEK = (function () { var m = location.pathname.match(/week-(\d+)/); return m ? parseInt(m[1], 10) : null; })();

function reportSlide() {
  if (window.parent === window) return;
  try { window.parent.postMessage({ utg: 'deck', action: 'slide', week: DECK_WEEK, index: at, total: slides.length }, location.origin); } catch (e) {}
}

function show(next, push) {
  at = Math.max(0, Math.min(slides.length - 1, next));
  slides.forEach(function (s, i) { s.classList.toggle('on', i === at); });
  dots.forEach(function (d, i) { d.classList.toggle('on', i === at); });
  count.textContent = (at + 1) + ' / ' + slides.length;
  if (push !== false) history.replaceState(null, '', '#' + (at + 1));
  focusTypedLine(slides[at]);
  reportSlide();
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

// Checkpoint slides: download the program exactly as it stands at this
// checkpoint, under its own name - Java insists the file is named after the
// public class in it. A student who fell behind saves it and runs it.
[].slice.call(document.querySelectorAll('.cp-zip')).forEach(function (btn) {
  btn.onclick = function (e) {
    e.stopPropagation();
    var files = JSON.parse(document.getElementById('files-' + btn.getAttribute('data-cp')).textContent);
    var name = Object.keys(files)[0];
    var url = URL.createObjectURL(new Blob([files[name]], { type: 'text/plain' }));
    var a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 10000);
  };
});

// Checkpoint slides: reveal the sample run so the class can compare consoles.
[].slice.call(document.querySelectorAll('.cp-run')).forEach(function (btn) {
  btn.onclick = function (e) {
    e.stopPropagation();
    var out = document.getElementById('out-' + btn.getAttribute('data-cp'));
    var opening = out.hasAttribute('hidden');
    if (opening) out.removeAttribute('hidden'); else out.setAttribute('hidden', '');
    btn.textContent = opening ? 'Hide the sample run' : '▶ Show a sample run';
  };
});
"""


def build_html_decks():
    """The same deck as a web page, so it can be presented from the classroom.

    Built from the same slide_plan() as the .pptx, slide for slide, and
    main() fails the build if the two ever disagree. The
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
<title>Week {n} slides &middot; CS701 &middot; UTG Academy</title>
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
""".format(n=week["n"], font=FONT, css=DECK_CSS, guard=guard("cs701", up="../../"),
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
    """Emit every week's programs as JSON, for the classroom editor to read.

    This is what lets an instructor catch up a student who missed a week: the
    editor fetches this and seeds week N's programs into their account as one
    project. Public on purpose - it is the same code already printed on the
    week pages.
    """
    payload = {
        "course": "cs701",
        "title": course.COURSE_TITLE,
        "weeks": [
            {"n": week["n"], "title": week["title"], "files": week_state(WEEK_END[week["n"]], week["n"])}
            for week in course.WEEKS
        ],
    }
    for week in payload["weeks"]:
        for name, text in week["files"].items():
            if "sk-class-" in text and "put-your-own-key-here" not in text:
                raise SystemExit(f"week {week['n']} {name} carries a real-looking key; refusing to publish")
    write("milestones.json", json.dumps(payload, separators=(",", ":")))
    return len(payload["weeks"])


def build_slide_states():
    """Per-slide expected programs, so a teacher's "Identify problem" can
    compare a student against ONLY what the class has reached, not the whole week.

    A snapshot at the last slide of every op and at every checkpoint, holding
    the week's programs as they should stand by that deck slide (a half-typed
    block does not count until its all-together slide). Slide 0 is the week
    before anything is typed; the last entry is the week's finished programs.
    Loaded lazily by the teacher tools, so it lives in its own file rather than
    bloating the milestones every student fetches.
    """
    seen = set()
    weeks_out = []
    for week in course.WEEKS:
        n = week["n"]
        plan = slide_plan(week, seen)   # advances `seen` exactly like the deck build
        snaps = [{"slide": 0, "files": week_state(WEEK_END[n - 1], n)}]
        for position, (kind, d) in enumerate(plan):
            index = position + 1        # deck index; slide 0 is the week-title slide
            if d.get("completes"):
                snaps.append({"slide": index, "files": week_state(d["completes"], n)})
            elif kind == "checkpoint":
                snaps.append({"slide": index, "files": week_state(d["point"], n)})
        snaps.append({"slide": len(plan), "files": week_state(WEEK_END[n], n)})
        by_index = {snap["slide"]: snap for snap in snaps}          # last write per index
        weeks_out.append({"n": n, "states": [by_index[key] for key in sorted(by_index)]})
    for week_out in weeks_out:
        for snap in week_out["states"]:
            for name, text in snap["files"].items():
                if "sk-class-" in text and "put-your-own-key-here" not in text:
                    raise SystemExit(f"week {week_out['n']} slide-state {name} carries a real-looking key")
    write("slide-states.json", json.dumps({"course": "cs701", "weeks": weeks_out}, separators=(",", ":")))
    return len(weeks_out)


def checkpoint_list():
    """Every checkpoint slide with the exact program it runs - for the tests
    that run each one and compare the console with the slide."""
    seen, found = set(), []
    for week in course.WEEKS:
        for kind, d in slide_plan(week, seen):
            if kind == "checkpoint":
                found.append({"week": week["n"], "title": d["title"], "file": d["file"],
                              "source": state_at(d["point"])[d["file"]] + "\n",
                              "seed": d["seed"], "run": d["run"].strip("\n")})
    return found


def write(name, text):
    # Everything here is meant to be 7-bit clean - see esc(). Most of it goes
    # through esc() and is clean by construction, but flow bodies and
    # call-and-response prompts are written as markup and pass through raw, so
    # one smart quote pasted into course.py would ship a page that renders as
    # mojibake wherever the encoding is guessed wrong. Refuse instead.
    try:
        text.encode("ascii")
    except UnicodeEncodeError as bad:
        line = text.count("\n", 0, bad.start) + 1
        raise SystemExit(
            f"{name}: line {line} is not 7-bit - {text[bad.start:bad.end]!r} in "
            f"{text[max(0, bad.start - 60):bad.start + 20].splitlines()[-1]!r}. "
            f"Write it as an HTML entity, or put the text through esc()."
        )
    with open(os.path.join(HERE, name), "w", encoding="utf-8") as handle:
        handle.write(text)


# --------------------------------------------------------------------------

def check_quiz(week_number, quiz):
    """A quiz with a bad answer index marks no option correct, silently - refuse."""
    options = quiz.get("options") or []
    if not quiz.get("q") or len(options) < 2 or not quiz.get("why"):
        raise SystemExit(f"week {week_number} quiz: needs q, why, and 2+ options - {quiz.get('q')!r}")
    if not isinstance(quiz.get("answer"), int) or not (0 <= quiz["answer"] < len(options)):
        raise SystemExit(f"week {week_number} quiz: answer index out of range - {quiz.get('q')!r}")


def main():
    if len(course.WEEKS) != 15:
        raise SystemExit(f"expected 15 weeks, found {len(course.WEEKS)}")
    for position, week in enumerate(course.WEEKS, start=1):
        if week["n"] != position:
            raise SystemExit(f"weeks are out of order at position {position}")

    final = state_at(WEEK_END[15])
    print(f"CS701 - {len(FILES)} programs, {line_count(final)} lines in all")
    unused = [name for name in FILES if not final[name]]
    if unused:
        raise SystemExit(f"course.ORDER lists {unused} but no week ever writes them")

    for week in course.WEEKS:
        n = week["n"]
        points = list(week_points(n))
        # A week that types nothing is almost always an authoring slip.
        if not points and not week.get("no_code_ok"):
            raise SystemExit(f"week {n} changes no code; set no_code_ok=True if that is deliberate")

        # Every op is one typing beat, in the same order, so the teacher knows
        # when in the hour each change happens and the slides can follow along.
        steps = [beat for beat in week["flow"] if beat["kind"] == "step"]
        for index, point in enumerate(points):
            _kind, filename, block, _lines = point_op(point)
            if index >= len(steps):
                raise SystemExit(f"week {n}: no STEP in the flow types {filename}:{block} "
                                 f"(op {index + 1} of {len(points)})")
            cited = (steps[index]["file"], steps[index]["block"])
            if cited != (filename, block):
                raise SystemExit(f"week {n}: STEP {index + 1} \"{steps[index]['title']}\" types "
                                 f"{cited[0]}:{cited[1]}, but op {index + 1} is {filename}:{block} - "
                                 f"the flow and the ops must run in the same order")
            typed = changed_lines(point)[filename]
            if not typed and not removed_in_blocks(point)[filename]:
                raise SystemExit(f"week {n}: op {index + 1} ({filename}:{block}) changes nothing")
            # This course never re-indents code a student already has; a line
            # whose only change is its leading spaces is an authoring slip, and
            # nothing in the guide would tell anyone to move it.
            moved = moved_lines(point)[filename]
            if moved:
                raise SystemExit(f"week {n}: op {index + 1} ({filename}:{block}) only re-indents "
                                 f"line(s) {sorted(moved)} - keep the indentation the class typed")
        if len(steps) > len(points):
            extra = ", ".join(f"{beat['file']}:{beat['block']}" for beat in steps[len(points):])
            raise SystemExit(f"week {n}: a STEP types {extra} but nothing in it changes this week")

        # The guide draws the hour as a run sheet, so the clock has to run
        # forwards. A beat at 0:56 in front of one at 0:53 reads as a typo but
        # is really a lesson talking about output before the class typed it.
        clock = [(beat["at"], beat["title"]) for beat in week["flow"] if beat.get("at")]
        for (earlier, _title), (later, title) in zip(clock, clock[1:]):
            if [int(part) for part in later.split(":")] <= [int(part) for part in earlier.split(":")]:
                raise SystemExit(
                    f"week {n}: the flow's clock goes {earlier} then {later} at "
                    f"\"{title}\" - reorder those beats, or fix the time")

        # A whole hour with nothing to say back is a lecture, not a lesson.
        prompts = sum(1 for beat in week["flow"] if beat.get("ask"))
        if prompts < 3:
            raise SystemExit(f"week {n}: only {prompts} call-and-response prompt(s) in the flow; "
                             f"aim for at least 3 spread through the hour")

        # The deck is the type-along, so its code must follow the typing order
        # exactly - every op, once, in turn. slide_plan() refuses a slide that
        # names the wrong op; this catches one no slide names at all.
        shown = [tuple(ref) for spec in week["slides"] for ref in (spec.get("code") or [])]
        expected = [(point_op(point)[1], point_op(point)[2]) for point in points]
        if shown != expected:
            raise SystemExit(f"week {n}: the slides show {shown} but the lesson types {expected} - "
                             f"one \"code\" entry per op, in the order they are typed")

        # Every typed line gets a slide, and a blank explanation slide is worse
        # than none - so every typed line needs its note.
        notes = line_notes(n)
        for point in points:
            _kind, filename, block, _lines = point_op(point)
            start, lines, _marks, _gone = block_code(point, filename, block)
            for offset, note in enumerate(notes[point]):
                if note == "":
                    raise SystemExit(f"week {n}: {filename}:{block} line {start + offset} "
                                     f"{lines[offset].strip()!r} has no NOTES entry")

        # A checkpoint runs a program the class has typed THIS week - never
        # code they have not reached, and never a program left over from last
        # week that nobody has touched since.
        seen_quiz = 0
        for spec in week["slides"]:
            for quiz in spec.get("quiz") or []:
                check_quiz(n, quiz)
                seen_quiz += 1
        for kind, descriptor in slide_plan(week, set()):
            if kind != "checkpoint":
                continue
            filename, point = descriptor["file"], descriptor["point"]
            if filename not in FILES:
                raise SystemExit(f"week {n}: checkpoint '{descriptor['title']}' runs unknown file {filename}")
            if not state_at(point)[filename]:
                raise SystemExit(f"week {n}: checkpoint '{descriptor['title']}' runs {filename} "
                                 f"before the class has typed any of it")
            if not (changed_lines(point, WEEK_END[n - 1])[filename]
                    or any(removed_in_blocks(point, WEEK_END[n - 1])[filename].values())):
                raise SystemExit(f"week {n}: checkpoint '{descriptor['title']}' runs {filename}, "
                                 f"but nothing in it has been typed yet this week")
            if not descriptor["run"].strip():
                raise SystemExit(f"week {n}: checkpoint '{descriptor['title']}' has no transcript")

        typed = sum(len(changed_lines(point)[point_op(point)[1]]) for point in points)
        if typed > TYPED_BUDGET:
            raise SystemExit(f"OVER BUDGET: week {n} types {typed} lines > {TYPED_BUDGET} in one hour. "
                             f"Move a program to homework.")
        print(f"  week {n:2d}  +{typed:3d} typed  {len(week_files(n))} program(s)  "
              f"{seen_quiz} quiz  {week['title']}")

    build_index()
    build_weeks()
    build_teacher()
    build_workbook()
    weeks_out = build_milestones()
    state_weeks = build_slide_states()
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
          f"milestones.json ({weeks_out} weeks), slide-states.json ({state_weeks} weeks)")


if __name__ == "__main__":
    main()
