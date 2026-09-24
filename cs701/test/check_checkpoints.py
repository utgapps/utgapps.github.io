"""Prove every checkpoint slide shows what the program really prints.

A checkpoint is a sample console run, typed into course.py by hand. Nothing in
the build can tell whether that transcript is true - so this compiles each
checkpoint's week, types the same lines the transcript shows ([[typed]]), seeds
the Random the way the slide says, and compares the real output line for line.

    python check_checkpoints.py

Needs a JDK 17+ on PATH (javac and java).
"""
import difflib
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
sys.path.insert(0, HERE)

import course    # noqa: E402
import run_java  # noqa: E402

TYPED = re.compile(r"\[\[(.*?)\]\]")


def checkpoints():
    for week in course.WEEKS:
        for slide in week["slides"]:
            if slide.get("checkpoint"):
                yield slide.get("checkpoint_week", week["n"]), slide


def main():
    if not run_java.have_java():
        print("no javac/java on PATH - install a JDK 17+ to run this check")
        return 1
    sys.stdout.reconfigure(encoding="utf-8")
    failures = 0
    count = 0
    for week_number, slide in checkpoints():
        count += 1
        shown = slide["run"].strip("\n")
        typed = TYPED.findall(shown)
        actual = run_java.run(week_number, typed, slide.get("seed"))
        if actual == shown:
            print(f"  ok    week {week_number:2d}  {slide['title']}")
            continue
        failures += 1
        print(f"  WRONG week {week_number:2d}  {slide['title']}")
        for line in difflib.unified_diff(shown.splitlines(), actual.splitlines(),
                                         "slide", "real run", lineterm="", n=1):
            print("        " + line)
    print(f"\n{count} checkpoints, {failures} that do not match the real program")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
