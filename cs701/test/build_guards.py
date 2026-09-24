"""Prove the build's own guards actually fire.

build.py refuses to ship a course that is wrong in a dozen specific ways - a
week over the line budget, an edit that no lesson beat types, a checkpoint that
runs code the class has not typed. Those guards are the only thing standing
between an authoring slip and fifteen printed handouts. A guard that has quietly
stopped firing is worse than no guard, because the green build says the content
was checked.

Each case below copies the course into a scratch directory, breaks exactly one
thing, runs the build, and requires it to fail with the right complaint. A case
that builds cleanly means that guard is gone.

    python build_guards.py
"""

import os
import re
import shutil
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
COURSE = os.path.dirname(HERE)
SOURCES = ("build.py", "course.py", "course_ops.py")


def sub_once(text, pattern, replacement, label):
    """Apply a regex substitution that MUST match exactly once.

    A mutation that silently fails to apply would run an unbroken build and
    report the guard as missing - the loudest possible false alarm.
    """
    out, count = re.subn(pattern, replacement, text, count=1, flags=re.S)
    if count != 1:
        raise SystemExit(f"mutation '{label}' did not apply - the source has moved on")
    return out


# Week 7 (WEEKS[6]) is the default victim: an ordinary expanded week with a
# checkpoint, several blocks and a seeded Random.
CASES = [
    ("a week is missing", "course.py",
     lambda s: s + "\nWEEKS = WEEKS[:-1]\n",
     "expected 15 weeks"),

    ("the weeks are out of order", "course.py",
     lambda s: s + "\nWEEKS[3], WEEKS[4] = WEEKS[4], WEEKS[3]\n",
     "out of order"),

    ("the project goes over the line budget", "build.py",
     lambda s: sub_once(s, r"LINE_BUDGET = 320", "LINE_BUDGET = 200", "budget"),
     "OVER BUDGET"),

    # The last week: emptying an earlier one breaks the replay of the weeks
    # after it before this guard is reached.
    ("a week changes no code", "course.py",
     lambda s: s + "\nWEEKS[14]['ops'] = []\n",
     "changes no code"),

    ("an edit is never typed in the lesson", "course.py",
     lambda s: s + "\nWEEKS[6]['flow'] = [b for b in WEEKS[6]['flow'] if b['kind'] != 'step']\n",
     "no STEP in the flow types"),

    # Week 5 wraps the guess in a while loop, so read..check move in a level.
    # Without the TAB beat nobody is told to select them and press Tab.
    ("a re-indent has no TAB beat", "course.py",
     lambda s: s + "\nWEEKS[4]['flow'] = [b for b in WEEKS[4]['flow'] if b['kind'] != 'tab']\n",
     "TAB beat"),

    # With one file, the "types a block that does not change" guard sees an
    # unknown file first. Either refusal will do; both name the file.
    ("the flow points at a file that does not exist", "course.py",
     lambda s: s + "\nWEEKS[6]['flow'].append({'kind': 'step', 'at': '0:59', 'title': 't',\n"
                   "    'file': 'Nope.java', 'block': 'ghost', 'notes': ['n']})\n",
     "Nope.java"),

    ("a week has too little call and response", "course.py",
     lambda s: s + "\nfor _b in WEEKS[6]['flow']: _b['ask'] = None\n",
     "call-and-response"),

    ("an edit never reaches a slide", "course.py",
     lambda s: s + "\nfor _s in WEEKS[6]['slides']: _s.pop('code', None)\n",
     "slide"),

    ("a typing beat has the wrong number of notes", "course.py",
     lambda s: s + "\nfor _b in WEEKS[6]['flow']:\n"
                   "    if _b['kind'] == 'step': _b['notes'] = _b['notes'] + ['spare']; break\n",
     "note(s)"),

    # Every week is expanded, so every typed line owes the class a sentence.
    ("a typed line has no line note", "course.py",
     lambda s: s + "\ndel LINE_NOTES[next(_k for _k in LINE_NOTES if _k[0] == 7)]\n",
     "no LINE_NOTES entry"),

    # Slides follow typing order, not concept order.
    ("the slides teach in a different order from the lesson", "course.py",
     lambda s: s + "\n_coded = [_i for _i, _s in enumerate(WEEKS[6]['slides']) if _s.get('code')]\n"
                   "_sl = WEEKS[6]['slides']\n"
                   "_sl[_coded[0]], _sl[_coded[-1]] = _sl[_coded[-1]], _sl[_coded[0]]\n",
     "does not match the typing order"),

    ("a checkpoint runs code the class has not typed yet", "course.py",
     lambda s: s + "\n_sl = WEEKS[6]['slides']\n"
                   "_sl.insert(0, _sl.pop(next(_i for _i, _s in enumerate(_sl) if _s.get('checkpoint'))))\n",
     "does not match the slides before it"),

    # Patched into the ops after course.py has aligned its line notes, so the
    # note guard does not refuse the changed line before the key guard sees it.
    # Every week's ops, because a later week that re-SETs the block would
    # otherwise look like it changed the line back.
    ("a real API key is about to be published", "course.py",
     lambda s: s + "\nfor _op in [_o for _w in WEEKS for _o in _w['ops']]:\n"
                   "    for _i, _line in enumerate(_op[3] or []):\n"
                   "        _op[3][_i] = _line.replace('apple', 'sk-class-a-real-looking-key-9f2b')\n",
     "real-looking key"),

    ("the lesson's clock runs backwards", "course.py",
     lambda s: s + "\nfor _b in WEEKS[6]['flow']:\n"
                   "    if _b.get('at'): _b['at'] = '0:02'\n",
     "clock goes"),

    # Flow bodies and STEP notes are markup, written raw, so they are the one
    # way a non-ASCII character can reach a printed page.
    ("a smart quote reaches a page that is meant to be 7-bit", "course.py",
     lambda s: s + "\nWEEKS[6]['flow'][0]['body'] = "
                   "[chr(8220) + 'not ascii' + chr(8221)]\n",
     "not 7-bit"),
]

# The deck drift guard compares the web deck with the .pptx, so it can only
# fire where python-pptx is installed (the ai box). Elsewhere it has nothing to
# compare, and claiming it was caught would be a lie.
try:
    import pptx  # noqa: F401
    CASES.append(
        ("the web deck drifts from the .pptx", "build.py",
         lambda s: sub_once(s, r"counts\[week\[.n.\]\] = 1 \+ len\(slide_plan",
                            'counts[week["n"]] = 2 + len(slide_plan', "pptx count"),
         "deck drift"))
    HAVE_PPTX = True
except ImportError:
    HAVE_PPTX = False


def copy_course(work):
    for item in SOURCES:
        shutil.copy(os.path.join(COURSE, item), os.path.join(work, item))


def run_case(name, filename, mutate, expected):
    with tempfile.TemporaryDirectory() as work:
        copy_course(work)
        target = os.path.join(work, filename)
        with open(target, encoding="utf-8") as handle:
            source = handle.read()
        with open(target, "w", encoding="utf-8") as handle:
            handle.write(mutate(source))

        proc = subprocess.run([sys.executable, "build.py"], cwd=work,
                              capture_output=True, text=True, timeout=300)
        output = (proc.stdout or "") + (proc.stderr or "")

        if proc.returncode == 0:
            return False, "the build PASSED - that guard is not doing anything"
        if expected and expected.lower() not in output.lower():
            last = [line for line in output.strip().splitlines() if line.strip()][-1:]
            return False, f"failed for the wrong reason: {last[0] if last else '(no output)'}"
        return True, ""


def main():
    # A control run: the untouched course must build, or every 'caught' below
    # would just be measuring a broken scratch copy.
    with tempfile.TemporaryDirectory() as work:
        copy_course(work)
        control = subprocess.run([sys.executable, "build.py"], cwd=work,
                                 capture_output=True, text=True, timeout=300)
    if control.returncode != 0:
        print("CONTROL FAILED - the unmodified course does not build:")
        print((control.stdout or "") + (control.stderr or ""))
        return 1
    print("control  ok    the unmodified course builds\n")

    missed = []
    for name, filename, mutate, expected in CASES:
        try:
            caught, why = run_case(name, filename, mutate, expected)
        except SystemExit as stop:
            caught, why = False, str(stop)
        if caught:
            print(f"  caught  {name}")
        else:
            print(f"  MISSED  {name}\n          -> {why}")
            missed.append(name)

    if not HAVE_PPTX:
        print("  skipped the web deck drifts from the .pptx (no python-pptx here)")
    print(f"\n{len(CASES)} deliberate breakages, {len(missed)} slipped through unnoticed")
    return 1 if missed else 0


if __name__ == "__main__":
    sys.exit(main())
