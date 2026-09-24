"""CS701 - the code of the course: every week's changes to Main.java.

Kept apart from course.py because it is the one part that has to compile.
course.py imports OPS and attaches each week's list to its week; nothing else
lives here. test/check_checkpoints.py compiles every checkpoint week and runs it.

Levels are how deep a line sits: 1 is inside the class, 2 inside main, 3
inside the play-again loop (week 8 on), 4 inside the guess loop once both
loops exist. A block that moves in a level is SET again at its new depth - the
builder sees that only the leading spaces changed and teaches it as a Tab,
not as typing.
"""

TAB = "(tab)"          # not a file: marks a flow beat or slide ref that re-indents
MAIN = "Main.java"


def ADD(filename, block, lines):
    return ("add", filename, block, lines)


def SET(filename, block, lines):
    return ("set", filename, block, lines)


def code(level, *lines):
    """Lines at a depth. Nesting inside the block is written into the strings."""
    return [("    " * level + line) if line else "" for line in lines]


# The order blocks sit in the FILE. Weeks add them in teaching order; the file
# is always read top to bottom in this one.
ORDER = {
    MAIN: ["imports", "header", "fields", "mainopen", "title", "numbers", "name", "rules",
           "mode", "summary", "words", "stats", "keyboard", "roundopen", "pick", "roundvars",
           "guessopen", "keyprint", "read", "quit", "length", "letters", "repeat", "count",
           "clue", "store", "check", "guessclose", "board", "result", "tally", "again",
           "roundclose", "goodbye", "chart", "mainclose", "isallletters", "winmessage",
           "askyesno", "classclose"],
}


# ---- blocks that move, written once per depth they ever sit at -------------

def pick_lines(level, week):
    if week < 7:
        return code(level, "", 'String secretWord = "plant";')
    first = [] if week >= 8 else [""]      # inside the round loop it follows the while line
    lines = first + code(level, "String secretWord = words[random.nextInt(words.length)];")
    if week >= 14:
        lines += code(level,
                      "while (usedWords.contains(secretWord)) {",
                      "    secretWord = words[random.nextInt(words.length)];",
                      "}",
                      "usedWords.add(secretWord);",
                      "if (usedWords.size() == words.length) {",
                      "    usedWords.clear();",
                      "}")
    return lines


def roundvars_lines(level, week):
    lines = code(level, "", "boolean won = false;")
    if week >= 4:
        lines += code(level, "boolean gaveUp = false;")
    if week >= 5:
        lines += code(level, "int guessesUsed = 0;")
    if week >= 7:
        lines += code(level,
                      "String[] board = new String[maxGuesses];",
                      "for (int row = 0; row < board.length; row++) {",
                      '    board[row] = "-----";',
                      "}")
    if week >= 8:
        lines += code(level, "String[] guesses = new String[maxGuesses];")
    if week >= 10:
        lines += code(level, 'String triedLetters = "";')
    return lines


def guessopen_lines(level):
    return code(level, "", "while (guessesUsed < maxGuesses && !won) {")


def read_lines(level, week):
    # Week 5 only moves these lines into the loop. The prompt learns to count
    # in week 6: changed in the same week as the Tab, it would sit in the
    # middle of the lines to select and be the one line the selection misses.
    if week < 5:
        lines = code(level, "", 'System.out.print("Your guess: ");',
                     "String guess = input.nextLine();")
    elif week == 5:
        lines = code(level, 'System.out.print("Your guess: ");',
                     "String guess = input.nextLine();")
    else:
        lines = code(level,
                     'System.out.print("Guess " + (guessesUsed + 1) + " of " + maxGuesses + ": ");',
                     "String guess = input.nextLine();")
    if week >= 6:
        lines += code(level, "guess = guess.trim().toLowerCase();")
    return lines


def quit_lines(level, week):
    lines = code(level, "", 'if (guess.equals("quit") || guess.equals("q")) {',
                 "    gaveUp = true;")
    if week >= 5:
        lines += code(level, "    break;")
    return lines + code(level, "}")


def length_lines(level):
    return code(level, "",
                "if (guess.length() != WORD_LENGTH) {",
                '    System.out.println("It has to be " + WORD_LENGTH + " letters.");',
                "    continue;",
                "}")


def count_lines(level):
    return code(level, "", "guessesUsed++;")


def clue_lines(level, week):
    if week < 13:
        exact = "    clue = clue + Character.toUpperCase(letter);"
        near = "    clue = clue + letter;"
    else:
        exact = "    clue = clue + GREEN + Character.toUpperCase(letter) + RESET;"
        near = "    clue = clue + YELLOW + letter + RESET;"
    return code(level,
                'String clue = "";',
                "for (int index = 0; index < WORD_LENGTH; index++) {",
                "    char letter = guess.charAt(index);",
                "    if (letter == secretWord.charAt(index)) {",
                "    " + exact,
                "    } else if (secretWord.indexOf(letter) >= 0) {",
                "    " + near,
                "    } else {",
                '        clue = clue + "_";',
                "    }",
                "}",
                "System.out.println(clue);")


def store_lines(level, week):
    lines = code(level, "board[guessesUsed - 1] = clue;")
    if week >= 8:
        lines += code(level, "guesses[guessesUsed - 1] = guess;")
    if week >= 10:
        lines += code(level, "triedLetters = triedLetters + guess;")
    return lines


def check_lines(level):
    return code(level, "", "if (guess.equals(secretWord)) {", "    won = true;", "}")


def board_lines(level):
    return code(level, "", "for (String row : board) {", "    System.out.println(row);", "}")


def result_lines(level, week):
    if week < 5:
        found = ['    System.out.println("You found it!");']
        lost = '    System.out.println("Not this time. The word was " + secretWord + ".");'
    else:
        found = ['    System.out.println("You found it in " + guessesUsed + "!");']
        lost = '    System.out.println("Out of guesses. The word was " + secretWord + ".");'
    if week >= 9:
        found.append("    System.out.println(winMessage(guessesUsed));")
    lines = ["", "if (won) {"] + found
    if week >= 4:
        lines += ["} else if (gaveUp) {",
                  '    System.out.println("You gave up. The word was " + secretWord + ".");']
    lines += ["} else {", lost, "}"]
    return code(level, *lines)


# Depths of the round (pick .. result) and of the guess body, by week.
def round_level(week):
    return 3 if week >= 8 else 2


def guess_level(week):
    return round_level(week) + (1 if week >= 5 else 0)


def replace_round(week, blocks):
    """SETs for the named round blocks, each at its depth for `week`."""
    outer, inner = round_level(week), guess_level(week)
    makers = {
        "pick": lambda: pick_lines(outer, week),
        "roundvars": lambda: roundvars_lines(outer, week),
        "guessopen": lambda: guessopen_lines(outer),
        "read": lambda: read_lines(inner, week),
        "quit": lambda: quit_lines(inner, week),
        "length": lambda: length_lines(inner),
        "count": lambda: count_lines(inner),
        "clue": lambda: clue_lines(inner, week),
        "store": lambda: store_lines(inner, week),
        "check": lambda: check_lines(inner),
        "guessclose": lambda: code(outer, "}"),
        "board": lambda: board_lines(outer),
        "result": lambda: result_lines(outer, week),
    }
    return [SET(MAIN, block, makers[block]()) for block in blocks]


def repeat_lines(level):
    return code(level, "",
                "boolean alreadyTried = false;",
                "for (int row = 0; row < guessesUsed; row++) {",
                "    if (guesses[row].equals(guess)) {",
                "        alreadyTried = true;",
                "    }",
                "}",
                "if (alreadyTried) {",
                '    System.out.println("You already tried " + guess + ".");',
                "    continue;",
                "}")


def letters_lines(level):
    return code(level, "",
                "if (!isAllLetters(guess)) {",
                '    System.out.println("Letters only, please.");',
                "    continue;",
                "}")


def keyprint_lines(level):
    return code(level,
                "for (int row = 0; row < keyboard.length; row++) {",
                "    for (int column = 0; column < keyboard[row].length; column++) {",
                "        char key = keyboard[row][column];",
                "        if (triedLetters.indexOf(key) >= 0 && secretWord.indexOf(key) < 0) {",
                '            System.out.print(". ");',
                "        } else {",
                '            System.out.print(key + " ");',
                "        }",
                "    }",
                "    System.out.println();",
                "}",
                "")


def stats_lines(week):
    lines = code(2, "", "int gamesPlayed = 0;", "int gamesWon = 0;", "int bestScore = 0;")
    if week >= 15:
        lines += code(2, "int[] winsByGuesses = new int[maxGuesses];")
    return lines


def tally_lines(week):
    won = ["    gamesWon++;"]
    if week >= 15:
        won.append("    winsByGuesses[guessesUsed - 1]++;")
    return code(3, "",
                "gamesPlayed++;",
                "if (won) {",
                *won,
                "    if (bestScore == 0 || guessesUsed < bestScore) {",
                "        bestScore = guessesUsed;",
                "    }",
                "}",
                "if (bestScore > 0) {",
                '    System.out.println("Fewest guesses so far: " + bestScore);',
                "}")


def words_lines(week):
    lines = code(2, "",
                 'String[] words = {"apple", "brick", "cloud", "dream", "flame", "ghost",',
                 '                  "house", "lemon", "night", "plant", "river", "tiger"};',
                 "Random random = new Random();")
    if week >= 14:
        lines += code(2, "ArrayList<String> usedWords = new ArrayList<>();")
    return lines


def fields_lines(week):
    lines = ["",
             "    // Out here, outside main, so every method in the class can use it.",
             "    static Scanner input = new Scanner(System.in);"]
    if week >= 13:
        lines += ["",
                  "    // Colour codes. The console reads these as instructions, not as letters.",
                  '    static final String RESET = "\\u001B[0m";',
                  '    static final String GREEN = "\\u001B[32m";',
                  '    static final String YELLOW = "\\u001B[33m";']
    return lines


def name_lines(week):
    lines = code(2, "")
    if week < 12:
        lines += code(2, "Scanner input = new Scanner(System.in);")
    return lines + code(2,
                        'System.out.print("What is your name? ");',
                        "String playerName = input.nextLine();",
                        'System.out.println("Good luck, " + playerName + "!");')


def imports_lines(week):
    lines = []
    if week >= 14:
        lines.append("import java.util.ArrayList;")
    if week >= 7:
        lines.append("import java.util.Random;")
    return lines + ["import java.util.Scanner;", ""]


OPS = {
 1: [
  ADD(MAIN, "header", ["// Five Letters: find the secret word before your guesses run out.",
                       "public class Main {"]),
  ADD(MAIN, "mainopen", ["", "    public static void main(String[] args) {"]),
  ADD(MAIN, "title", code(2,
      "// The title screen.",
      'System.out.println("=======================");',
      'System.out.println("     FIVE  LETTERS");',
      'System.out.println("=======================");',
      'System.out.print("Find the secret word ");',
      'System.out.println("before your guesses run out.");')),
  ADD(MAIN, "mainclose", ["    }"]),
  ADD(MAIN, "classclose", ["}"]),
 ],
 2: [
  ADD(MAIN, "numbers", code(2, "",
      "// The numbers the whole game is built on.",
      "final int WORD_LENGTH = 5;",
      "int maxGuesses = 6;")),
  ADD(MAIN, "summary", code(2, "",
      "int lettersToType = WORD_LENGTH * maxGuesses;",
      'System.out.println("You get " + maxGuesses + " guesses at a " + WORD_LENGTH + "-letter word.");',
      'System.out.println("That is up to " + lettersToType + " letters of typing.");')),
 ],
 3: [
  ADD(MAIN, "imports", imports_lines(3)),
  ADD(MAIN, "name", name_lines(3)),
  ADD(MAIN, "pick", pick_lines(2, 3)),
  ADD(MAIN, "roundvars", roundvars_lines(2, 3)),
  ADD(MAIN, "read", read_lines(2, 3)),
  ADD(MAIN, "check", check_lines(2)),
  ADD(MAIN, "result", result_lines(2, 3)),
 ],
 4: [
  ADD(MAIN, "mode", code(2, "",
      'System.out.print("Pick a mode - 1 easy, 2 normal, 3 hard: ");',
      "int mode = input.nextInt();",
      "input.nextLine();   // nextInt leaves the Enter key behind, so eat it",
      "switch (mode) {",
      "    case 1:",
      "        maxGuesses = 8;",
      "        break;",
      "    case 2:",
      "        maxGuesses = 6;",
      "        break;",
      "    case 3:",
      "        maxGuesses = 4;",
      "        break;",
      "    default:",
      '        System.out.println("No mode " + mode + " - normal it is.");',
      "}")),
  *replace_round(4, ["roundvars"]),
  ADD(MAIN, "quit", quit_lines(2, 4)),
  *replace_round(4, ["result"]),
 ],
 5: [
  *replace_round(5, ["roundvars"]),
  ADD(MAIN, "guessopen", guessopen_lines(2)),
  *replace_round(5, ["read", "quit"]),
  ADD(MAIN, "count", count_lines(3)),
  *replace_round(5, ["check"]),
  ADD(MAIN, "guessclose", code(2, "}")),
  *replace_round(5, ["result"]),
 ],
 6: [
  *replace_round(6, ["read"]),
  ADD(MAIN, "length", length_lines(3)),
  ADD(MAIN, "clue", clue_lines(3, 6)),
 ],
 7: [
  SET(MAIN, "imports", imports_lines(7)),
  ADD(MAIN, "words", words_lines(7)),
  *replace_round(7, ["pick", "roundvars"]),
  ADD(MAIN, "store", store_lines(3, 7)),
  ADD(MAIN, "board", board_lines(2)),
 ],
 8: [
  ADD(MAIN, "stats", stats_lines(8)),
  ADD(MAIN, "roundopen", code(2, "", "boolean keepPlaying = true;", "while (keepPlaying) {")),
  *replace_round(8, ["pick", "roundvars", "guessopen", "read", "quit", "length", "count",
                     "clue", "store", "check", "guessclose", "board", "result"]),
  ADD(MAIN, "repeat", repeat_lines(4)),
  ADD(MAIN, "tally", tally_lines(8)),
  ADD(MAIN, "again", code(3, "",
      'System.out.print("Play again? (y/n) ");',
      "String answer = input.nextLine().trim().toLowerCase();",
      'keepPlaying = answer.equals("y") || answer.equals("yes");')),
  ADD(MAIN, "roundclose", code(2, "}")),
 ],
 9: [
  ADD(MAIN, "letters", letters_lines(4)),
  *replace_round(9, ["result"]),
  ADD(MAIN, "isallletters", [
      "",
      "    // True only when every character in the word is a letter.",
      "    static boolean isAllLetters(String word) {",
      "        for (char character : word.toCharArray()) {",
      "            if (!Character.isLetter(character)) {",
      "                return false;",
      "            }",
      "        }",
      "        return true;",
      "    }"]),
  ADD(MAIN, "winmessage", [
      "",
      "    // A message for how quickly the word was found.",
      "    static String winMessage(int guessesUsed) {",
      "        switch (guessesUsed) {",
      "            case 1:",
      '                return "Unbelievable!";',
      "            case 2:",
      '                return "Brilliant!";',
      "            case 3:",
      '                return "Great work!";',
      "            case 4:",
      '                return "Nice one.";',
      "            default:",
      '                return "Phew - just made it.";',
      "        }",
      "    }"]),
 ],
 10: [
  ADD(MAIN, "keyboard", code(2, "",
      "char[][] keyboard = {",
      '    "qwertyuiop".toCharArray(),',
      '    "asdfghjkl".toCharArray(),',
      '    "zxcvbnm".toCharArray()',
      "};")),
  *replace_round(10, ["roundvars"]),
  ADD(MAIN, "keyprint", keyprint_lines(4)),
  *replace_round(10, ["store"]),
 ],
 11: [
  ADD(MAIN, "goodbye", code(2, "",
      "double winRate = (double) gamesWon / gamesPlayed * 100;",
      'System.out.println("Thanks for playing, " + playerName + "!");',
      'System.out.println("You played " + gamesPlayed + " and won " + gamesWon + ".");',
      'System.out.printf("That is %.1f%% of your games.%n", winRate);')),
 ],
 12: [
  ADD(MAIN, "fields", fields_lines(12)),
  SET(MAIN, "name", name_lines(12)),
  ADD(MAIN, "askyesno", [
      "",
      "    // Asks a yes-or-no question until it gets an answer it understands.",
      "    static boolean askYesNo(String question) {",
      "        while (true) {",
      "            System.out.print(question);",
      "            String answer = input.nextLine().trim().toLowerCase();",
      '            if (answer.equals("y") || answer.equals("yes")) {',
      "                return true;",
      "            }",
      '            if (answer.equals("n") || answer.equals("no")) {',
      "                return false;",
      "            }",
      '            System.out.println("Please answer y or n.");',
      "        }",
      "    }"]),
  SET(MAIN, "again", code(3, "", 'keepPlaying = askYesNo("Play again? (y/n) ");')),
  ADD(MAIN, "rules", code(2, "",
      'if (askYesNo("Read the rules first? (y/n) ")) {',
      '    System.out.println("CAPITAL letter = right letter, right place.");',
      '    System.out.println("small letter   = in the word, wrong place.");',
      '    System.out.println("_              = not in the word at all.");',
      "}")),
 ],
 13: [
  SET(MAIN, "fields", fields_lines(13)),
  *replace_round(13, ["clue"]),
 ],
 14: [
  SET(MAIN, "imports", imports_lines(14)),
  SET(MAIN, "words", words_lines(14)),
  *replace_round(14, ["pick"]),
 ],
 15: [
  SET(MAIN, "stats", stats_lines(15)),
  SET(MAIN, "tally", tally_lines(15)),
  ADD(MAIN, "chart", code(2, "",
      'System.out.println("Wins by number of guesses:");',
      "for (int row = 0; row < winsByGuesses.length; row++) {",
      '    System.out.print((row + 1) + " | ");',
      "    for (int count = 0; count < winsByGuesses[row]; count++) {",
      '        System.out.print("#");',
      "    }",
      '    System.out.println(" " + winsByGuesses[row]);',
      "}")),
 ],
}
