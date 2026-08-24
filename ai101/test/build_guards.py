"""Prove the build's own guards actually fire.

build.py refuses to ship a course that is wrong in a dozen specific ways - a
week over the line budget, an edit that no lesson beat types, a slide deck that
has drifted from the .pptx. Those guards are the only thing standing between an
authoring slip and fifteen printed handouts, and until now nothing checked that
any of them still work. A guard that has quietly stopped firing is worse than no
guard, because the green build says the content was checked.

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


def sub_once(text, pattern, replacement, label):
    """Apply a regex substitution that MUST match exactly once.

    A mutation that silently fails to apply would run an unbroken build and
    report the guard as missing - the loudest possible false alarm.
    """
    out, count = re.subn(pattern, replacement, text, count=1, flags=re.S)
    if count != 1:
        raise SystemExit(f"mutation '{label}' did not apply - the source has moved on")
    return out


# Each case: (name, which file, how to break it, what the build should say)
CASES = [
    ("a week is missing", "course.py",
     lambda s: sub_once(s, r"\nWEEKS = \[", "\nWEEKS = [", "weeks head") + "\nWEEKS = WEEKS[:-1]\n",
     "expected 15 weeks"),

    ("the weeks are out of order", "course.py",
     lambda s: s + "\nWEEKS[3], WEEKS[4] = WEEKS[4], WEEKS[3]\n",
     "out of order"),

    ("the project goes over the line budget", "build.py",
     lambda s: sub_once(s, r"LINE_BUDGET = 1000", "LINE_BUDGET = 400", "budget"),
     "OVER BUDGET"),

    ("a week changes no code", "course.py",
     lambda s: s + "\nWEEKS[6]['ops'] = []\n",
     "changes no code"),

    ("an edit is never typed in the lesson", "course.py",
     lambda s: s + "\nWEEKS[6]['flow'] = [b for b in WEEKS[6]['flow'] if b['kind'] != 'step']\n",
     "no STEP in the flow types"),

    # Retargeting an existing beat also un-cites the op it used to type, so the
    # orphan guard fires first and this one is never reached. Add a beat.
    ("the flow points at a file that does not exist", "course.py",
     lambda s: s + "\nWEEKS[6]['flow'].append({'kind': 'step', 'at': 'x', 'title': 't',\n"
                   "    'file': 'nope.js', 'block': 'ghost', 'notes': ['n']})\n",
     "unknown file"),

    ("a week has too little call and response", "course.py",
     lambda s: s + "\nfor _b in WEEKS[6]['flow']: _b.pop('ask', None)\n",
     "call-and-response"),

    ("an edit never reaches a slide", "course.py",
     lambda s: s + "\nfor _s in WEEKS[6]['slides']: _s.pop('code', None)\n",
     "slide"),

    # Truncating to one note is a no-op on a block that only splits into one
    # chunk. Adding a note always changes the count.
    ("a typing beat has the wrong number of notes", "course.py",
     lambda s: s + "\nfor _b in WEEKS[6]['flow']:\n"
                   "    if _b['kind'] == 'step': _b['notes'] = _b['notes'] + ['spare']; break\n",
     "note(s)"),

    ("a real API key is about to be published", "course.py",
     lambda s: sub_once(s, r"sk-class-put-your-own-key-here",
                        "sk-class-a-real-looking-key-9f2b", "key"),
     "key"),

    ("the web deck drifts from the .pptx", "build.py",
     lambda s: sub_once(s, r"counts\[week\[.n.\]\] = 1 \+ len\(slide_plan",
                        'counts[week["n"]] = 2 + len(slide_plan', "pptx count"),
     "deck drift"),

    ("a block is missing from the file ordering", "course.py",
     lambda s: sub_once(s, r'JS:   \["hello", ', 'JS:   [', "order"),
     ""),   # any failure will do - the message differs by which block is dropped
]


def run_case(name, filename, mutate, expected):
    with tempfile.TemporaryDirectory() as work:
        for item in ("build.py", "course.py"):
            shutil.copy(os.path.join(COURSE, item), os.path.join(work, item))
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
        for item in ("build.py", "course.py"):
            shutil.copy(os.path.join(COURSE, item), os.path.join(work, item))
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

    print(f"\n{len(CASES)} deliberate breakages, {len(missed)} slipped through unnoticed")
    return 1 if missed else 0


if __name__ == "__main__":
    sys.exit(main())
