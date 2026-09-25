"""Prove every checkpoint slide shows what the program really prints.

A checkpoint is a sample console run, typed into course.py by hand. Nothing in
the build can tell whether that transcript is true - so this compiles each
checkpoint's program as it stands at that slide, types the same lines the
transcript shows ([[typed]]), seeds the Random the way the slide says, and
compares the real output line for line.

    python check_checkpoints.py

Needs a JDK 17+ on PATH (javac and java).
"""
import difflib
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
sys.path.insert(0, HERE)

import build     # noqa: E402
import run_java  # noqa: E402


def lines_of(text):
    """Line by line, without trailing spaces: a loop that prints each letter
    followed by a space leaves one at the end of the line, and nobody can see
    it on a slide."""
    return [line.rstrip() for line in text.split("\n")]


def main():
    if not run_java.have_java():
        print("no javac/java on PATH - install a JDK 17+ to run this check")
        return 1
    sys.stdout.reconfigure(encoding="utf-8")
    failures = 0
    checkpoints = build.checkpoint_list()
    for checkpoint in checkpoints:
        shown = checkpoint["run"]
        actual = run_java.run(checkpoint, run_java.TYPED.findall(shown))
        label = f"week {checkpoint['week']:2d}  {checkpoint['file']:34} {checkpoint['title']}"
        if lines_of(actual) == lines_of(shown):
            print(f"  ok    {label}")
            continue
        failures += 1
        print(f"  WRONG {label}")
        for line in difflib.unified_diff(lines_of(shown), lines_of(actual),
                                         "slide", "real run", lineterm="", n=1):
            print("        " + line)
    print(f"\n{len(checkpoints)} checkpoints, {failures} that do not match the real program")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
