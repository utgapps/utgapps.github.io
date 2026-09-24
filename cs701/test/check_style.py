"""Hold every week's Main.java to the course's two code rules.

1. Whole-word names. No one-letter variable, parameter or loop counter - not
   even i. A student reads `for (int row = 0; ...)` as a sentence; `i` is a
   habit copied from somewhere else, and this course is where habits start.
2. Strings are compared with .equals(), never ==. `==` asks whether two names
   point at the same object, compiles without a word, and works just often
   enough in a test to ship. It is the classic AP mistake.

Checks the replayed state of every week, so a rule broken in week 4 and fixed
in week 9 is still caught in week 4.

    python check_style.py
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))

import build  # noqa: E402

TYPES = r"(?:int|long|char|double|float|boolean|byte|short|String|var|Scanner|Random)(?:\[\])*"
ONE_LETTER = re.compile(rf"\b{TYPES}(?:<[^>]*>)?\s+([A-Za-z_])\s*[=;:,)]")
STRING_LITERAL = re.compile(r'"(?:\\.|[^"\\])*"')
CHAR_LITERAL = re.compile(r"'(?:\\.|[^'\\])'")
STRING_NAME = re.compile(r"\bString\s+(\w+)\s*[=;,)]")


def code_only(line):
    """The line with every literal replaced by a placeholder and any trailing
    // comment removed, so "=====" in a title is not mistaken for code."""
    line = STRING_LITERAL.sub("STR", line)
    line = CHAR_LITERAL.sub("CHR", line)
    return line.split("//", 1)[0]


def problems(source):
    found = []
    stripped_lines = [code_only(line) for line in source.splitlines()]
    # Any name declared as a String anywhere in the file, plus "STR" for a
    # literal: == or != beside one of these is comparing Strings.
    strings = {"STR"}
    for stripped in stripped_lines:
        strings.update(STRING_NAME.findall(stripped))
    names = "|".join(sorted(map(re.escape, strings)))
    string_eq = re.compile(rf"\b(?:{names})\b\s*(?:==|!=)|(?:==|!=)\s*\b(?:{names})\b(?!\s*[.(\[])")
    for number, (line, stripped) in enumerate(zip(source.splitlines(), stripped_lines), 1):
        for match in ONE_LETTER.finditer(stripped):
            found.append((number, f"one-letter name '{match.group(1)}'", line.strip()))
        if string_eq.search(stripped):
            found.append((number, "a String compared with == or !=", line.strip()))
    return found


def main():
    total = 0
    for week in build.course.WEEKS:
        for filename, source in build.state_at(week["n"]).items():
            for number, what, line in problems(source):
                total += 1
                print(f"  week {week['n']:2d}  {filename}:{number}  {what}\n            {line}")
    # The rules are only worth something if they can fire. Prove both on
    # lines that break them, so a regex that has quietly stopped matching
    # cannot pass the whole course.
    # Two lines that must NOT fire ride along: a char comparison through
    # charAt, and a title full of = signs.
    control = problems('String guess = "";\nString secret = "";\n'
                       'for (int i = 0; i < 5; i++) {\n'
                       'if (guess == "quit") {\nif (secret != guess) {\n'
                       'if (guess.charAt(0) == secret.charAt(0)) {\n'
                       'System.out.println("==== == ====");\n')
    if len(control) != 3:
        print(f"CONTROL FAILED - the checks found {len(control)} of 3 planted problems")
        return 1
    print(f"{len(build.course.WEEKS)} weeks checked, {total} style problem(s)")
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main())
