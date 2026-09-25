"""Compile one checkpoint's program and run it with scripted typing.

    python run_java.py WEEK CHECKPOINT_NUMBER

prints that checkpoint's real console run in the markup build.py understands:
[[typed]] for what was typed, <<A>> for a green letter, ((a)) for a yellow one
and {{clear}} where the program clears the screen. check_checkpoints.py uses
the same run() to prove every checkpoint slide shows what the program prints.

The program is the one build.checkpoint_list() hands over: the checkpoint's own
file, exactly as it stands at that slide - not the week's finished version,
because a checkpoint halfway through a lesson runs the half-typed program.

A seed swaps `new Random()` for `new Random(seed)` in a scratch copy, so the
numbers are the same every run. The student's file is never touched: the
seeded copy prints exactly what theirs would on the day it drew those numbers.
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

CLEAR = "\x1b[H\x1b[2J"
ANSI = (
    (re.compile("\x1b\\[32m(.*?)\x1b\\[0m"), r"<<\1>>"),
    (re.compile("\x1b\\[33m(.*?)\x1b\\[0m"), r"((\1))"),
)
TYPED = re.compile(r"\[\[(.*?)\]\]")


def have_java():
    return shutil.which("javac") is not None and shutil.which("java") is not None


def compile_program(checkpoint, workdir):
    """Write the checkpoint's program and the harness into workdir and compile
    both. Returns javac's complaints, or "" when it compiled."""
    source = checkpoint["source"]
    if checkpoint["seed"] is not None:
        if "new Random()" not in source:
            raise SystemExit(f"{checkpoint['title']}: {checkpoint['file']} has no Random to seed")
        source = source.replace("new Random()", f"new Random({checkpoint['seed']}L)")
    with open(os.path.join(workdir, checkpoint["file"]), "w", encoding="utf-8") as handle:
        handle.write(source)
    shutil.copy(os.path.join(HERE, "Harness.java"), workdir)
    result = subprocess.run(["javac", "-Xlint:all", "-encoding", "UTF-8", checkpoint["file"], "Harness.java"],
                            cwd=workdir, capture_output=True, text=True)
    return (result.stdout + result.stderr).strip()


def run(checkpoint, typed):
    """The marked-up console run of a checkpoint's program given the typed lines."""
    class_name = checkpoint["file"][:-len(".java")]
    with tempfile.TemporaryDirectory() as workdir:
        problems = compile_program(checkpoint, workdir)
        if problems:
            raise SystemExit(f"{checkpoint['title']}: {checkpoint['file']} does not compile cleanly:\n{problems}")
        with open(os.path.join(workdir, "typed.txt"), "w", encoding="utf-8") as handle:
            handle.write("".join(line + "\n" for line in typed))
        result = subprocess.run(["java", "-cp", ".", "Harness", "typed.txt", class_name], cwd=workdir,
                                capture_output=True, text=True, encoding="utf-8", timeout=30)
        if result.returncode != 0:
            raise SystemExit(f"{checkpoint['title']}: {checkpoint['file']} crashed:\n{result.stderr}")
    text = result.stdout.replace("\r\n", "\n")
    # The harness writes "[[line]]\n" right where the program stopped to wait,
    # which is straight after a print() prompt - so it lands on the prompt's line.
    # A clear is print(), not println(): whatever comes next starts on its line.
    text = text.replace(CLEAR, "{{clear}}\n")
    for pattern, replacement in ANSI:
        text = pattern.sub(replacement, text)
    return text.rstrip("\n")


if __name__ == "__main__":
    week_number, position = int(sys.argv[1]), int(sys.argv[2])
    chosen = [checkpoint for checkpoint in build.checkpoint_list() if checkpoint["week"] == week_number]
    checkpoint = chosen[position - 1]
    sys.stdout.reconfigure(encoding="utf-8")
    print(run(checkpoint, TYPED.findall(checkpoint["run"])))
