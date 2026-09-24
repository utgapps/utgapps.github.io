"""Compile a week's Main.java and run it with scripted typing.

    python run_java.py WEEK [--seed N] [typed line] [typed line] ...

prints the console run in the checkpoint markup build.py understands:
[[typed]] for what the player typed, <<A>> for a green letter and ((a)) for a
yellow one. check_checkpoints.py uses the same run() to prove every checkpoint
slide shows what the program really prints.

A seed swaps `new Random()` for `new Random(seed)` in a scratch copy, so the
secret word is the same every run. The student's file is never touched: the
seeded copy prints exactly what theirs would on the day it picked that word.
"""
import os
import re
import shutil
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))

import build  # noqa: E402  - the same replay that makes the milestone pages

ANSI = (
    (re.compile("\x1b\\[32m(.*?)\x1b\\[0m"), r"<<\1>>"),
    (re.compile("\x1b\\[33m(.*?)\x1b\\[0m"), r"((\1))"),
)


def have_java():
    return shutil.which("javac") is not None and shutil.which("java") is not None


def compile_week(week, workdir, seed=None):
    """Write the week's file and the harness into workdir and compile both.
    Returns javac's complaints, or "" when it compiled."""
    source = build.state_at(week)["Main.java"] + "\n"
    if seed is not None:
        if "new Random()" not in source:
            raise SystemExit(f"week {week} has no Random to seed")
        source = source.replace("new Random()", f"new Random({seed}L)")
    with open(os.path.join(workdir, "Main.java"), "w", encoding="utf-8") as handle:
        handle.write(source)
    shutil.copy(os.path.join(HERE, "Harness.java"), workdir)
    result = subprocess.run(["javac", "-Xlint:all", "-encoding", "UTF-8", "Main.java", "Harness.java"],
                            cwd=workdir, capture_output=True, text=True)
    return (result.stdout + result.stderr).strip()


def run(week, typed, seed=None):
    """The marked-up console run of week `week` given the typed lines."""
    with tempfile.TemporaryDirectory() as workdir:
        problems = compile_week(week, workdir, seed)
        if problems:
            raise SystemExit(f"week {week} does not compile cleanly:\n{problems}")
        with open(os.path.join(workdir, "typed.txt"), "w", encoding="utf-8") as handle:
            handle.write("".join(line + "\n" for line in typed))
        result = subprocess.run(["java", "-cp", ".", "Harness", "typed.txt"], cwd=workdir,
                                capture_output=True, text=True, encoding="utf-8", timeout=30)
        if result.returncode != 0:
            raise SystemExit(f"week {week} crashed:\n{result.stderr}")
    text = result.stdout.replace("\r\n", "\n")
    # The harness writes "[[line]]\n" right where the program stopped to wait,
    # which is straight after a print() prompt - so it lands on the prompt's line.
    for pattern, replacement in ANSI:
        text = pattern.sub(replacement, text)
    return text.rstrip("\n")


if __name__ == "__main__":
    arguments = sys.argv[1:]
    week_number = int(arguments.pop(0))
    seed_value = None
    if arguments[:1] == ["--seed"]:
        seed_value = int(arguments[1])
        arguments = arguments[2:]
    sys.stdout.reconfigure(encoding="utf-8")
    print(run(week_number, arguments, seed_value))
