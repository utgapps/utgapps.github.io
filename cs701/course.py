"""CS701 - AP Computer Science Prep Level 1. The whole course as one data structure.

Adapted from the Java Level 1 teacher guide (JV 401), rebuilt on AI101's
structure: one project that grows every week instead of fourteen throwaway
programs. The guide's exercises are still here - they are the homework - and
the fourteen lessons' concepts arrive in the guide's order.

This file and course_ops.py are the only files to edit. course_ops.py holds
the code (it has to compile, so it lives on its own); this file holds
everything said about it. build.py replays the weeks to produce the milestone
code, the teacher guide, the homework book and both slide decks, so none of
them can drift apart.

Each week carries:
  ops          code changes, from course_ops.OPS, replayed in order
  objectives   what a student can do at the end of the hour
  flow         the hour, beat by beat: TALK, STEP (typing) and TABIN (re-indent)
  errors       (symptom, fix) - what will actually go wrong in the room
  recap        plain-language summary for the homework book
  homework     the guide's exercises, each with task / detail / done
  slides       one dict per slide
  bonus        optional extension. NOTHING in a later week may depend on it.
"""

from course_ops import ADD, MAIN, OPS, ORDER, SET, TAB  # noqa: F401  (ADD/SET for readers)

COURSE_TITLE = "CS701 &middot; AP Computer Science Prep Level 1"
COURSE_BLURB = (
    "Fifteen weeks of Java, one program. You start with a title screen and finish with a "
    "complete word-guessing game you wrote line by line - and along the way you meet every "
    "idea an AP Computer Science course expects you to walk in with: variables, decisions, "
    "loops, strings, arrays, methods and lists."
)
PROJECT_BLURB = (
    "Five Letters: a console word game. The computer picks a secret five-letter word and you "
    "have six guesses. Every guess gets a clue - capital letters are in the right place, "
    "small letters are in the word but somewhere else - and by the end it has difficulty "
    "modes, a live keyboard, colour, a scoreboard and a chart of how you did."
)

DISCLAIMER = """
<p><strong>Java runs on a computer, not in a browser tab.</strong> Everything in this course
is one file, <code>Main.java</code>, and it runs in any Java code editor that lets you type
into the console. Your teacher will tell you which one the class uses.</p>

<p><strong>On your own computer.</strong> Install a Java Development Kit (version 17 or newer),
save the file as <code>Main.java</code>, open a terminal in that folder and type
<code>java Main.java</code>. That one command compiles and runs it.</p>

<p><strong>Every week's finished file is on the week's page.</strong> If you missed a lesson,
copy that week's <code>Main.java</code> and carry on from there - you will not be behind.</p>
"""

TEACHER_PREAMBLE = """
<p><strong>Where students write and run code.</strong> The course is one console program,
<code>Main.java</code>. Students keep it in the classroom editor at
<a href="../classroom/">/classroom/</a> - they sign in with the class student code and create
a <em>Java</em> project, which starts as <code>Main.java</code> - so their work is saved and you
can see it.</p>
<p><strong>The classroom editor cannot run Java yet.</strong> To run it, students need a Java
code editor that runs a console program and lets them type into it while it runs (the game reads
the keyboard from week 3), or a computer with a JDK 17+ installed, where
<code>java Main.java</code> compiles and runs the single file in one step. Decide which before
week 1 and test it on a student machine: a runner that cannot read keyboard input will look
fine for two weeks and then break in week 3. The original guide used an online editor with its
built-in AI assistant switched off - do the same with whatever you choose.</p>
<p><strong>One project, not fourteen.</strong> The original Java Level 1 guide wrote a new
small program every lesson. Here every lesson adds to one game, <em>Five Letters</em>, and the
guide's exercises became the homework. The concepts still arrive in the guide's order, so
anything written against it (quizzes, pacing) still lines up.</p>
<p><strong>Names are whole words, always.</strong> <code>index</code>, <code>row</code>,
<code>column</code>, <code>character</code> - never <code>i</code>, <code>j</code> or
<code>c</code>, including in homework. The guide itself asked for this in its nested-loop lesson;
we just start in week 1. When a student's own code uses a one-letter name, ask what it holds and
have them call it that.</p>
<p><strong>Tab weeks.</strong> Weeks 5 and 8 wrap code the students already have inside a new
loop. Java does not care about indentation, so nothing breaks if they skip re-indenting - which
is exactly why the lesson stops for it. Code inside a loop that is not indented as if it were is
the most confusing thing a beginner can be handed back. Every week page marks those lines with a
blue edge.</p>
<p><strong>Mistakes in the original guide, fixed here.</strong> The duplicates exercise started
its inner loop at 1 instead of one past the outer index (so every value "duplicated" itself); a
2D-array answer said <code>[2][3]</code> where the element is at <code>[2][2]</code>; one
exercise wrote <code>While</code> with a capital W, one had a <code>{</code> in the wrong place,
one read <code>String answer input.next()</code> with no <code>=</code>; a method was spelled
<code>sWordHasNonLetters</code>; Task 8-1 declared its variables outside <code>main</code>;
"payed" is "paid"; the day-of-week check only tested <code>&lt;= 7</code> and let 0 and negative
numbers through; and two loops never updated the variable in their own condition, so they could
never stop. The homework here is the corrected version.</p>
<p><strong>Pacing.</strong> The line counts per week are the pacing model. If a week runs long,
the bonus is the thing to drop - nothing later depends on any of them.</p>
"""


def TALK(at, title, *body, ask=None):
    """A stretch of talking, demonstrating or arguing. No typing."""
    return {"kind": "talk", "at": at, "title": title, "body": list(body), "ask": ask}


def STEP(filename, block, title, notes, at=None, ask=None):
    """A stretch of typing. The block is split into pieces of at most six code
    lines and each piece a student types needs one note, so the room stops and
    talks roughly every half-dozen lines. build.py says the piece count if the
    number of notes is wrong."""
    return {"kind": "step", "at": at, "file": filename, "block": block,
            "title": title, "notes": notes, "ask": ask}


def TABIN(first_block, last_block, title, notes, at=None, ask=None, say=None):
    """Select the lines from first_block to last_block and press Tab once:
    they are now inside a new loop. Nothing on them is retyped."""
    return {"kind": "tab", "at": at, "file": TAB, "block": f"{first_block}..{last_block}",
            "title": title, "notes": notes, "ask": ask, "say": say}


def TABREF(first_block, last_block):
    """A slide's code ref for the same re-indent."""
    return (TAB, f"{first_block}..{last_block}")


def M(block):
    """A slide's code ref for a block of Main.java."""
    return (MAIN, block)


WEEKS = [

# ---------------------------------------------------------------- week 1 ----
{
 "n": 1,
 "title": "Hello, console",
 "big_idea": "A Java program is a class with a main method, and main is a list of instructions the computer follows from top to bottom. Today you write the title screen of the game you will spend fifteen weeks building.",
 "new_concepts": ["class", "main method", "statement", "System.out.println", "System.out.print", "string literal", "comment"],
 "objectives": [
   "Say what a class and the main method are for, in one sentence each",
   "Write statements that print to the console, each ending in a semicolon",
   "Explain the difference between print and println by predicting the output",
   "Write a comment and say who it is for",
   "Run a program and read a compile error without panicking",
 ],
 "ops": OPS[1],
 "flow": [
  TALK("0:00", "Get everyone into a project",
       "Everyone opens <a href=\"../classroom/\">the classroom editor</a>, signs in with the student code and makes a new <strong>Java</strong> project called <em>Five Letters</em>. They keep this same project all fifteen weeks.",
       "Then everyone opens the Java editor the class runs code in (see <em>Before you start</em>). Walk the room until every screen has both. Nobody starts typing until then."),
  TALK("0:06", "Show them where this ends up",
       "Run the finished week-15 game on the projector. Play one round - make a wrong guess or two so they see the clues. Then close it.",
       "Say what it is: a word game in a black text window. No buttons, no graphics. Everything is words going in and words coming out, and that is what a console program is.",
       ask=("That whole game is one file. How many lines do you think it is?",
            "Guesses will be wild. It is about 245 lines by week 15 - roughly sixteen a week. Say that: nobody writes it in one go, and nobody has to.")),
  TALK("0:12", "The shape of every Java program",
       "On the board draw two boxes, one inside the other. The outer box is labelled <code>class Main</code>, the inner one <code>main</code>. Java keeps all code inside a class, and it starts running at the method called <code>main</code>.",
       "Say plainly: the first two lines and the last two lines are the same in every program you will write this year. They are the frame. The interesting part goes in the middle.",
       ask=("If Java starts at main, what do you think happens to code outside it?",
            "It never runs by itself. That is the right intuition; methods in week 9 are how code outside main gets used.")),
  STEP(MAIN, "header", "The class", at="0:18", notes=[
       "The first line is a comment - two slashes, then anything. Java ignores it. The second opens the class; its <code>{</code> is closed by the very last line of the file.",
  ]),
  STEP(MAIN, "mainopen", "The main method", notes=[
       "A blank line, then the line Java looks for when it starts. Every word in it matters and nobody memorises it today - copy it exactly. The <code>{</code> opens main.",
  ], ask=("Why do you think the line is indented?",
          "So you can see it is inside the class. Java does not care; people do. That will matter a great deal in week 5.")),
  STEP(MAIN, "mainclose", "Close main", notes=[
       "Four spaces, then <code>}</code>. It closes main - line up the brace with the line that opened it.",
  ]),
  STEP(MAIN, "classclose", "Close the class", notes=[
       "The last line of the file, against the left edge. Every <code>{</code> needs its <code>}</code>: count them, two and two.",
  ]),
  TALK("0:26", "Run the empty program",
       "Run it. Nothing prints - and that is a success. It compiled, it started at main, main had nothing in it, it stopped.",
       "Now delete the last <code>}</code> and run again. Read the error together. Put it back.",
       ask=("What did the error tell you?",
            "Something like 'reached end of file while parsing'. The win is noticing it names a line. Java reads the whole file before it runs any of it.")),
  STEP(MAIN, "title", "The title screen", at="0:31", notes=[
       "A comment, then three <code>println</code> lines. Each one is a statement and each ends with <code>;</code>. The words in double quotes are printed exactly as typed - spaces included. Two more: a <code>print</code> and then a <code>println</code>. Run it before anyone asks why, and look at where the text lands.",
  ], ask=("print and println: what is the difference?",
          "println moves to a new line after printing; print stays on the same line. The sentence came out as one line even though it was two statements.")),
  TALK("0:40", "Break it on purpose",
       "Delete one semicolon and run. Put it back. Delete one double quote and run. Put it back. Spell <code>println</code> as <code>printline</code> and run.",
       "Three errors, three different messages. Do it now while nothing is at stake - a student who has read a red error on purpose does not freeze on an accidental one in week 6.",
       ask=("Which error message was the most helpful?",
            "Usually the missing semicolon (';' expected). Point out the caret under the spot. Error messages are Java trying to help, badly.")),
  TALK("0:47", "Comments are for people",
       "Point at the two comments. Java skips them completely. They are notes for the next person to read the file - usually you, in three weeks.",
       "Show the other kind on the board: <code>/* ... */</code> can run over several lines. We will mostly use <code>//</code>."),
  TALK("0:50", "Make it yours",
       "Change the title's border to different characters, or add a line under it. Run. Everyone gets to see their own title on their own screen.",
       ask=("If I wanted a blank line between the border and the sentence, what would I type?",
            "System.out.println(); with nothing between the brackets. Let someone try it.")),
  TALK("0:57", "Homework", "Chapter 1 of the workbook."),
 ],
 "errors": [
  ("';' expected", "A missing semicolon at the end of a statement. The caret points just after where it belongs."),
  ("class Main is public, should be declared in a file named Main.java", "The file is called something else. It must be Main.java, capital M."),
  ("reached end of file while parsing", "A missing }. Count the braces: every { needs a }."),
  ("unclosed string literal", "A missing double quote. Strings start and end with \" on the same line."),
  ("cannot find symbol ... printline", "A typo in println. Java spells it p-r-i-n-t-l-n, and capital letters matter: System has a capital S."),
 ],
 "recap": [
   "Every Java program lives inside a class. Ours is called Main and lives in Main.java.",
   "Java starts running at the main method, and runs its statements from top to bottom.",
   "A statement is one instruction. It ends with a semicolon.",
   "System.out.println prints a line and then moves to the next one. System.out.print prints and stays on the same line.",
   "Text in double quotes is a string literal: printed exactly as written.",
   "// starts a comment. Java ignores it; it is a note for people.",
   "Every { needs a matching }.",
 ],
 "homework": [
  {"task": "Two names", "detail": "In a new program, use two separate println statements: the first prints My name is (your name). and the second prints My friend's name is (a friend's name).", "done": "Two lines appear, one under the other."},
  {"task": "Hours in a day", "detail": "Print the sentence There are 24 hours in a day using a single string literal.", "done": "The sentence appears exactly once, on one line."},
  {"task": "Predict, then run", "detail": "Without running it, write down what this prints: System.out.print(\"one \"); System.out.println(\"two\"); System.out.print(\"three\"); System.out.println(\" four\"); Then run it and check.", "done": "Your prediction matches: one two on the first line, three four on the second."},
  {"task": "Break it three ways", "detail": "In your Five Letters file, remove a semicolon, then a quote, then the last }. Run each time and write down the first line of each error. Fix each one before the next.", "done": "You have three error messages written down and your game runs again."},
 ],
 "bonus": {"title": "A bigger title", "body": "Draw the words FIVE LETTERS in large letters made of # characters, one println per row. Keep it under ten rows."},
 "slides": [
  {"title": "What you are building", "sub": "Five Letters: a word game in the console", "bullets": ["The computer picks a secret five-letter word", "You have six guesses", "Every guess gets a clue", "By week 15, every line of it is yours"]},
  {"title": "The frame of every Java program", "sub": "A class, with a main method inside it", "bullets": ["Java keeps all code inside a class", "It starts running at main", "The first two and last two lines are the same in every program"],
   "code": [M("header"), M("mainopen"), M("mainclose"), M("classclose")]},
  {"title": "Printing", "sub": "Statements run top to bottom", "bullets": ["println prints a line, then moves down", "print prints and stays on the same line", "Every statement ends with ;"],
   "code": [M("title")]},
  {"title": "Checkpoint: your title screen", "checkpoint": True,
   "say": "Run it. You should see the title between two borders, and the sentence under it on one line - even though you wrote it as two statements.",
   "run": """
=======================
     FIVE  LETTERS
=======================
Find the secret word before your guesses run out.
"""},
  {"title": "Errors are Java trying to help", "sub": "", "bullets": ["Read the first line of the error", "Look at the line number", "The caret ^ points at the spot", "Fix the first error first - one mistake can cause several messages"]},
  {"title": "Your turn", "sub": "Make the title yours", "bullets": ["Change the border characters", "Add a blank line with System.out.println();", "Run it"]},
 ],
},

# ---------------------------------------------------------------- week 2 ----
{
 "n": 2,
 "title": "Numbers and names",
 "big_idea": "A variable is a named box that holds a value. Today the game gets its first two numbers - how long the word is and how many guesses you get - and does its first sum.",
 "new_concepts": ["variable", "int", "String", "final (a constant)", "assignment", "string concatenation", "arithmetic operators", "operator precedence"],
 "objectives": [
   "Declare an int variable and give it a value",
   "Make a value that must never change final, and name it in CAPITALS",
   "Join text and numbers with + and predict the result",
   "Use * to calculate a new value from two variables",
   "Predict what \"5\" + 5 + 5 and 5 + 5 + \"5\" print, and explain why they differ",
 ],
 "ops": OPS[2],
 "flow": [
  TALK("0:00", "Open last week's game",
       "Everyone opens Five Letters and runs it. Anyone who missed week 1 copies the week 1 file from the course page - nobody starts behind.",
       ask=("What does the program do right now?",
            "Prints a title. That is all. Today it learns to count.")),
  TALK("0:04", "A variable is a named box",
       "On the board draw a box, write <code>maxGuesses</code> on the side and <code>6</code> inside. A variable has a <em>type</em> (what kind of thing fits in the box), a <em>name</em> and a <em>value</em>.",
       "The type comes first. <code>int</code> is a whole number. <code>String</code> is text. Java will not let you put text in an int box - it refuses to compile, which is a good thing.",
       ask=("Why do you think Java makes you say the type?",
            "So it can stop you putting the wrong thing in. Mistakes caught before the program runs are the cheap ones.")),
  STEP(MAIN, "numbers", "The game's two numbers", at="0:12", notes=[
       "A comment, then two variables. <code>WORD_LENGTH</code> is <code>final</code>: once set, it can never change, and Java refuses to compile any line that tries. Constants are written in CAPITALS so you can spot them.",
  ], ask=("Why is WORD_LENGTH final but maxGuesses not?",
          "The word is always five letters. The number of guesses will change - in week 4 you pick easy or hard. A good answer names what might change.")),
  TALK("0:18", "Prove final means final",
       "Everyone adds <code>WORD_LENGTH = 6;</code> on the next line and runs. Read the error: <em>cannot assign a value to final variable</em>. Delete the line.",
       "That error is the whole point of <code>final</code>: a mistake that would have been a bug becomes a message instead."),
  STEP(MAIN, "summary", "The first sum", at="0:22", notes=[
       "<code>*</code> multiplies. The new variable is worked out from the other two, so if either ever changes, this changes with it. The two printlns join text and numbers with <code>+</code>.",
  ], ask=("What will the second line print?",
          "That is up to 30 letters of typing. Five times six. Let them predict before running.")),
  TALK("0:30", "+ means two different things",
       "On the board: <code>System.out.println(\"5\" + 5 + 5);</code> and <code>System.out.println(5 + 5 + \"5\");</code>. Everyone predicts both, then runs them.",
       "Java works left to right. Once one side of a <code>+</code> is a String, the <code>+</code> means join. <code>\"5\" + 5</code> is <code>\"55\"</code>, then <code>\"555\"</code>. But <code>5 + 5</code> is 10 first, then <code>\"105\"</code>.",
       ask=("How would you make \"5\" + 5 + 5 print 510?",
            "Brackets: \"5\" + (5 + 5). Brackets happen first, exactly like in maths.")),
  TALK("0:38", "The other operators",
       "Quickly, on the board: <code>+ - * /</code> and <code>%</code>. Division between two ints throws away the remainder: <code>7 / 2</code> is 3. <code>%</code> gives you the remainder: <code>7 % 2</code> is 1.",
       "<code>*</code> and <code>/</code> happen before <code>+</code> and <code>-</code>. <code>2 + 3 * 4</code> is 14, not 20.",
       ask=("What is 17 % 5?",
            "2. Five goes into seventeen three times with 2 left over. If anyone says 3.4, that is the bit of division ints throw away.")),
  TALK("0:45", "Shortcuts you will see everywhere",
       "<code>maxGuesses = maxGuesses + 1;</code> can be written <code>maxGuesses += 1;</code> or, for exactly one, <code>maxGuesses++;</code>. The game uses <code>++</code> from week 5 - point at it now so it is not new then."),
  TALK("0:50", "Change the numbers",
       "Everyone sets maxGuesses to 10 and runs. The summary changes by itself. Put it back to 6.",
       ask=("We changed one number and two lines of output changed. Why?",
            "lettersToType is calculated from maxGuesses. That is the payoff of variables: say a thing once and use it everywhere.")),
  TALK("0:57", "Homework", "Chapter 2 of the workbook."),
 ],
 "errors": [
  ("cannot assign a value to final variable WORD_LENGTH", "Something tries to change a constant. That is what final is for - remove the line."),
  ("incompatible types: String cannot be converted to int", "Text in quotes given to an int. Numbers have no quotes."),
  ("cannot find symbol ... maxguesses", "Capital letters matter. maxGuesses and maxguesses are different names to Java."),
  ("Output says 56 instead of 11", "A + joined text instead of adding. Put the sum in brackets."),
 ],
 "recap": [
   "A variable is a named box. It has a type, a name and a value: int maxGuesses = 6;",
   "int holds whole numbers. String holds text.",
   "final makes a constant: Java refuses to compile any line that changes it. Constants are named in CAPITALS.",
   "+ adds numbers, but once either side is a String it joins text instead. Java works left to right.",
   "* and / happen before + and -. Brackets happen first of all.",
   "Dividing two ints throws away the remainder; % gives you the remainder.",
   "x++ adds one to x. x += 3 adds three.",
 ],
 "homework": [
  {"task": "Names in variables", "detail": "Rewrite last week's two-names program so the names are in variables called myName and friendName, and the printlns join them in: \"My name is \" + myName + \".\"", "done": "The same two lines print, and changing a name means changing one word."},
  {"task": "Hours without a literal", "detail": "Make an int called hoursInDay holding 24, and print There are 24 hours in a day using the variable instead of typing 24 into the string.", "done": "Changing hoursInDay changes the sentence."},
  {"task": "Hours in a week", "detail": "Make HOURS_IN_DAY and NUMBER_OF_DAYS constants with final, set to 24 and 7. Make totalHours by multiplying them, and print There are 168 hours in 7 days using all three.", "done": "Adding a line that changes HOURS_IN_DAY refuses to compile."},
  {"task": "Predict, then run", "detail": "Write down what each prints, then check: (a) 10 / 4  (b) 10 % 4  (c) 2 + 3 * 4  (d) (2 + 3) * 4  (e) \"2\" + 3 + 4  (f) 2 + 3 + \"4\"", "done": "Your answers: 2, 2, 14, 20, 234, 54."},
 ],
 "bonus": {"title": "Seconds in a year", "body": "Using constants for seconds in a minute, minutes in an hour, hours in a day and days in a year, calculate and print the number of seconds in a year. (It is 31,536,000.)"},
 "slides": [
  {"title": "A variable is a named box", "sub": "type  name  =  value;", "bullets": ["int holds a whole number", "String holds text", "The type comes first, and Java holds you to it"],
   "code": [M("numbers")]},
  {"title": "Variables that work together", "sub": "Say a number once, use it everywhere", "bullets": ["* multiplies", "+ joins text and numbers into one line", "Change maxGuesses and every line that uses it follows"],
   "code": [M("summary")]},
  {"title": "+ means two things", "sub": "\"5\" + 5 + 5  versus  5 + 5 + \"5\"", "bullets": ["Java works left to right", "Once one side is a String, + joins", "\"5\" + 5 + 5 prints 555", "5 + 5 + \"5\" prints 105"]},
  {"title": "Checkpoint: the game knows its numbers", "checkpoint": True,
   "say": "Run it. Under the title you should see how many guesses you get and how much typing that could be.",
   "run": """
=======================
     FIVE  LETTERS
=======================
Find the secret word before your guesses run out.
You get 6 guesses at a 5-letter word.
That is up to 30 letters of typing.
"""},
  {"title": "Your turn", "sub": "", "bullets": ["Set maxGuesses to 10 and run", "Try WORD_LENGTH = 6; and read the error", "Put them both back"]},
 ],
},

# ---------------------------------------------------------------- week 3 ----
{
 "n": 3,
 "title": "Your first guess",
 "big_idea": "A program that only prints is a poster. Today it reads the keyboard: it asks your name, lets you guess the secret word once, and decides whether you were right.",
 "new_concepts": ["import", "Scanner", "nextLine", "boolean", ".equals", "if / else", "block"],
 "objectives": [
   "Import a class from Java's library and say why it is needed",
   "Read a line the player types into a String",
   "Store true or false in a boolean",
   "Compare two Strings with .equals and say why == is the wrong tool",
   "Write an if / else that runs one of two blocks",
 ],
 "ops": OPS[3],
 "flow": [
  TALK("0:00", "Programs that listen",
       "Run last week's game. It talks, but it cannot hear you. Today it asks questions and does something different depending on the answers.",
       ask=("What does the game need to know from the player?",
            "Their name, their guess - later a mode, and whether to play again. List them; every one is a keyboard read.")),
  TALK("0:04", "Borrowing from Java's library",
       "Reading the keyboard is a job Java already has a tool for, called <code>Scanner</code>. It lives in a package called <code>java.util</code>, and an <code>import</code> line at the very top of the file is how you say you want it.",
       "Imports go above the class, before anything else in the file."),
  STEP(MAIN, "imports", "Import the Scanner", at="0:08", notes=[
       "One line above everything, then a blank line. Without it, the next step fails with <em>cannot find symbol: Scanner</em>.",
  ]),
  STEP(MAIN, "name", "Ask for a name", notes=[
       "The first line makes a Scanner reading <code>System.in</code> - the keyboard. The next three ask a question, wait for the player to press Enter, and use the answer.",
  ], ask=("Why is the question a print and not a println?",
          "So the cursor waits on the same line as the question. That is exactly what week 1's print/println difference was for.")),
  TALK("0:16", "Run it and type",
       "Run. The program stops and waits - that is <code>nextLine()</code> doing its job. Type a name, press Enter.",
       "If the runner cannot take keyboard input, find out now, not in week 5."),
  TALK("0:19", "true or false",
       "A <code>boolean</code> holds one of two values: <code>true</code> or <code>false</code>. That is all. It is how a program remembers the answer to a yes-or-no question - here, <em>did you win?</em>"),
  STEP(MAIN, "pick", "The secret word", at="0:22", notes=[
       "Fixed for now: it is always plant. Week 7 makes the computer choose one at random. A fixed word is how you test a game - you know what should happen.",
  ]),
  STEP(MAIN, "roundvars", "Did you win?", notes=[
       "Every round starts as not won. This line only sets the starting value; something later has to change it.",
  ]),
  STEP(MAIN, "read", "Read a guess", notes=[
       "Same pattern as the name: ask with <code>print</code>, read with <code>nextLine()</code>.",
  ]),
  STEP(MAIN, "check", "Was it right?", at="0:30", notes=[
       "The <code>if</code> checks a condition in brackets. Only when it is true does the block inside the braces run. <code>.equals</code> compares two Strings letter by letter.",
  ], ask=("Why not guess == secretWord?",
          "== asks whether they are the same object in memory, not the same letters. It sometimes works by luck and then fails on a typed guess. For Strings, always .equals.")),
  STEP(MAIN, "result", "Say what happened", notes=[
       "<code>if (won)</code> is enough - won already is true or false. The <code>else</code> block runs only when the if's did not. Exactly one of the two messages prints, every time.",
  ]),
  TALK("0:40", "Play it",
       "Run it three times: guess plant, guess PLANT, guess plant with a space after it.",
       "Only the first one wins. Capitals and spaces make it a different String. Do not fix it today - week 6 does, and they will remember why.",
       ask=("Why did PLANT lose?",
            ".equals compares exactly, and P is not p. Leave the problem open; it is a good one to come back to.")),
  TALK("0:47", "The other comparisons",
       "For numbers: <code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>. Numbers are compared with symbols; Strings with <code>.equals</code>. One <code>=</code> puts a value in a box; two <code>==</code> ask a question.",
       "<code>double</code> holds numbers with a decimal point. Dividing two ints throws the fraction away, which is why the average homework uses doubles.",
       ask=("What is the difference between = and ==?",
            "= stores a value; == compares two. Mixing them up is the most common bug in every C-family language.")),
  TALK("0:57", "Homework", "Chapter 3 of the workbook."),
 ],
 "errors": [
  ("cannot find symbol: class Scanner", "The import line is missing or misspelled. It goes at the very top: import java.util.Scanner;"),
  ("The program seems frozen", "It is waiting at nextLine() for someone to type. Click in the console and type."),
  ("The runner never lets you type", "That code editor cannot take console input. Switch to one that can before week 4."),
  ("The right guess says Not this time", "A capital letter or a space. .equals compares exactly - week 6 fixes it."),
  ("incompatible types: String cannot be converted to boolean", "if (guess = secretWord) - one = where .equals was meant."),
 ],
 "recap": [
   "import java.util.Scanner; at the top of the file lets you use Java's Scanner.",
   "Scanner input = new Scanner(System.in); makes a Scanner that reads the keyboard.",
   "input.nextLine() waits for the player to press Enter and gives you everything they typed as a String.",
   "A boolean holds true or false.",
   "Compare Strings with .equals, never ==. Compare numbers with == != < > <= >=.",
   "An if runs its block only when its condition is true. An else runs its block only when the if did not.",
   "double holds numbers with a decimal point.",
 ],
 "homework": [
  {"task": "An average", "detail": "Make three double variables, score1, score2 and score3, holding 20.3, 33.1 and 10.0. Print each one, then work out their average in a double called average and print it.", "done": "The average prints as 21.133333333333333."},
  {"task": "Average as a whole number", "detail": "Add a line that prints the average as an int: (int) average. Write down what happened to the decimals.", "done": "It prints 21. Casting to int cuts the fraction off - it does not round."},
  {"task": "Old enough", "detail": "Ask for the user's age with a Scanner (use input.nextInt() to read a whole number). Make a boolean legalAge that starts false. If the age is 19 or more, set legalAge to true and print The user is of legal age; otherwise print The user is a minor.", "done": "18 prints minor; 19 prints legal age."},
  {"task": "Grades", "detail": "Ask for a mark from 0 to 100 and print the letter grade: below 25 is F, 25 to 44 is E, 45 to 49 is D, 50 to 59 is C, 60 to 79 is B, 80 and up is A. You will need if, else if and else.", "done": "24 prints F, 25 prints E, 80 prints A, and every mark prints exactly one letter."},
 ],
 "bonus": {"title": "Say it back", "body": "After the name is read, print how many letters it has with playerName.length(). Then try a name with a space in it and see whether the space counts."},
 "slides": [
  {"title": "Borrowing a tool", "sub": "import java.util.Scanner;", "bullets": ["Java comes with a huge library", "import says which piece you want", "Imports go at the very top"],
   "code": [M("imports")]},
  {"title": "Reading the keyboard", "sub": "The program waits for Enter", "bullets": ["new Scanner(System.in) reads the keyboard", "nextLine() gives back everything typed", "Ask with print, so the cursor waits on the same line"],
   "code": [M("name")]},
  {"title": "One guess", "sub": "", "bullets": ["The secret word is fixed for now", "won starts as false", "The guess is read like the name was"],
   "code": [M("pick"), M("roundvars"), M("read")]},
  {"title": "Deciding", "sub": "if (condition) { ... } else { ... }", "bullets": ["The block runs only when the condition is true", "else runs when it was not", "Strings are compared with .equals"],
   "code": [M("check"), M("result")]},
  {"title": "Checkpoint: one guess", "checkpoint": True,
   "say": "Run it, type your name, then guess plant. Then run it again and guess PLANT - and notice that it loses.",
   "run": """
=======================
     FIVE  LETTERS
=======================
Find the secret word before your guesses run out.
What is your name? [[Sam]]
Good luck, Sam!
You get 6 guesses at a 5-letter word.
That is up to 30 letters of typing.
Your guess: [[plant]]
You found it!
"""},
  {"title": "= is not ==", "sub": "", "bullets": ["= puts a value in a box", "== asks whether two numbers are equal", ".equals asks whether two Strings are equal"]},
 ],
},

# ---------------------------------------------------------------- week 4 ----
{
 "n": 4,
 "title": "Choices",
 "big_idea": "Real programs make more than one decision. Today the player picks a difficulty with a switch, can give up with a quit command, and the ending has three possibilities instead of two.",
 "new_concepts": ["nextInt", "switch / case / break / default", "else if", "|| (or)", "&& and ! (preview)"],
 "objectives": [
   "Read a whole number with nextInt, and clear the leftover Enter with nextLine",
   "Write a switch with cases, break and a default",
   "Combine two conditions with ||",
   "Extend an if / else into an if / else if / else chain",
 ],
 "ops": OPS[4],
 "flow": [
  TALK("0:00", "Easy, normal, hard",
       "Run last week's game. Everyone gets the same six guesses. Today the player chooses.",
       ask=("How many guesses should easy and hard get?",
            "Anything reasonable. We will use 8 and 4. The point is that one choice sets a number.")),
  TALK("0:04", "switch",
       "When one value picks between several fixed options, a <code>switch</code> reads better than a stack of ifs. Each <code>case</code> is one possible value. <code>break</code> means <em>done - leave the switch</em>. <code>default</code> catches anything no case matched.",
       "Forget a break and Java carries on into the next case. That is called falling through, and it is almost always a bug."),
  STEP(MAIN, "mode", "Pick a mode", at="0:08", notes=[
       "<code>nextInt()</code> reads a whole number. The line after it is the odd one: it reads and throws away the Enter key left behind - without it, the next <code>nextLine()</code> gets an empty line.",
       "Three cases and a default. Each case changes maxGuesses and breaks out.",
       "The default catches any number that is not 1, 2 or 3, and says so instead of guessing.",
  ], ask=("Why can't maxGuesses be final?",
          "Because this switch changes it. final was right for WORD_LENGTH and would be wrong here - that is why week 2 made only one of them final.")),
  TALK("0:18", "Prove the leftover Enter",
       "Comment out the <code>input.nextLine();</code> line (put <code>//</code> in front) and run. Pick a mode. Watch the game skip straight past the guess.",
       "nextInt read the 2 and left the Enter sitting there. The guess's nextLine read that Enter as an empty guess. Put the line back.",
       ask=("Why does nextLine not have this problem?",
            "nextLine reads up to and including the Enter. nextInt stops at the end of the number.")),
  TALK("0:23", "Giving up",
       "A player should be able to type <code>quit</code>. The game needs to remember that they gave up, so the ending can say so. That is another boolean."),
  STEP(MAIN, "roundvars", "Remember giving up", at="0:25", notes=[
       "A second boolean next to won. It starts false too.",
  ]),
  STEP(MAIN, "quit", "The quit command", notes=[
       "<code>||</code> means <em>or</em>: the block runs if the guess is quit, or if it is q. Only one side has to be true.",
  ], ask=("What would happen with && here instead?",
          "It would need the guess to be quit AND q at the same time, which is impossible - so it would never run. && is next week.")),
  STEP(MAIN, "result", "Three endings", at="0:32", notes=[
       "Insert the two middle lines. <code>else if</code> adds a second condition, checked only when the first was false. The chain always runs exactly one block.",
  ]),
  TALK("0:36", "Play all the paths",
       "Run it four times: win on normal, lose on hard, type q, and pick mode 7.",
       "Every line of the program has now run at least once. That is what testing a change means.",
       ask=("Is there a way to see both 'You found it' and 'You gave up' in one run?",
            "No. An if / else if / else runs exactly one block. That is the promise of the chain.")),
  TALK("0:42", "&& and !",
       "Two more on the board. <code>&amp;&amp;</code> is <em>and</em>: both sides must be true. <code>!</code> is <em>not</em>: it flips true and false. Next week's loop needs both.",
       "Write <code>age &gt;= 13 &amp;&amp; age &lt;= 19</code> and ask who in the room it is true for. Then <code>!(age &gt;= 13)</code>.",
       ask=("How do you check that a day number is a real weekday, 1 to 7?",
            "day >= 1 && day <= 7. Checking only day <= 7 lets 0 and -3 through - which is a real bug in the original exercise.")),
  TALK("0:52", "Order matters in a chain",
       "Show a grade chain written in the wrong order: <code>if (mark &gt;= 50)</code> C before <code>else if (mark &gt;= 80)</code> A. A mark of 90 prints C. The first true condition wins and the rest are skipped."),
  TALK("0:57", "Homework", "Chapter 4 of the workbook."),
 ],
 "errors": [
  ("The game skips the guess after choosing a mode", "The input.nextLine() after nextInt() is missing. nextInt leaves the Enter behind."),
  ("InputMismatchException", "Someone typed a word where nextInt wanted a number. Expected for now - it is a real crash, and handling it is a later course."),
  ("Mode 1 gives 6 guesses", "A missing break: case 1 fell through into case 2."),
  ("'else' without 'if'", "A stray semicolon after if (...) or a } in the wrong place. Check the braces line up."),
 ],
 "recap": [
   "nextInt() reads a whole number. It leaves the Enter key behind, so follow it with nextLine() to clear it.",
   "A switch picks one case by value. break leaves the switch; default catches everything else.",
   "Forgetting break makes Java fall through into the next case.",
   "|| is or: true if either side is true. && is and: true only if both are. ! is not.",
   "else if adds another condition to a chain. The first true condition wins; exactly one block runs.",
 ],
 "homework": [
  {"task": "Day of the week", "detail": "Ask for a number from 1 to 7 and store it in an int called dayNumber. Make a String day that starts as \"not a day\". Use if / else if to set day to Monday for 1 up to Sunday for 7. If dayNumber is from 1 to 7 (check both ends with &&), print day + \" is day \" + dayNumber + \" of the week\"; otherwise print dayNumber + \" is not a day of the week\".", "done": "5 prints Friday; 0, 8 and -2 all print the not-a-day message."},
  {"task": "Months with a switch", "detail": "Ask for a month number and store it in monthNumber. Use a switch with twelve cases to set a String month, and a default that sets it to \"no such month\". Print the result.", "done": "12 prints December, 13 prints no such month, and removing one break visibly breaks it."},
  {"task": "Registration", "detail": "A student may register if their mark is 70 or more AND they have paid the fee. Ask for the mark with nextInt (then clear the Enter), and ask Has the student paid? (y/n) with nextLine. Print You are registered or You are not eligible for registration.", "done": "Mark 75 and y registers; 75 and n does not; 60 and y does not."},
  {"task": "Predict", "detail": "With boolean sunny = true; boolean warm = false; write down, then check: sunny && warm, sunny || warm, !sunny, !(sunny && warm), !sunny || !warm", "done": "false, true, false, true, true. The last two always agree - that is De Morgan's law."},
 ],
 "bonus": {"title": "A secret mode", "body": "Add case 4 that gives just 2 guesses - but leave it out of the prompt. Only people who read the code know it is there."},
 "slides": [
  {"title": "switch", "sub": "One value, several fixed choices", "bullets": ["case 1: runs when mode is 1", "break leaves the switch", "default catches anything else", "nextInt() leaves the Enter behind - clear it"],
   "code": [M("mode")]},
  {"title": "Quitting", "sub": "|| means or", "bullets": ["A second boolean remembers giving up", "quit or q both work", "Only one side of || needs to be true"],
   "code": [M("roundvars"), M("quit")]},
  {"title": "Three endings", "sub": "if / else if / else", "bullets": ["Checked top to bottom", "The first true condition wins", "Exactly one block runs"],
   "code": [M("result")]},
  {"title": "Checkpoint: pick a mode, then quit", "checkpoint": True,
   "say": "Run it, pick hard, and type quit. Then run it again and try mode 7.",
   "run": """
=======================
     FIVE  LETTERS
=======================
Find the secret word before your guesses run out.
What is your name? [[Sam]]
Good luck, Sam!
Pick a mode - 1 easy, 2 normal, 3 hard: [[3]]
You get 4 guesses at a 5-letter word.
That is up to 20 letters of typing.
Your guess: [[quit]]
You gave up. The word was plant.
"""},
  {"title": "and, or, not", "sub": "&&   ||   !", "bullets": ["&& - both sides must be true", "|| - either side will do", "! - flips true and false", "day >= 1 && day <= 7 checks both ends"]},
 ],
},

# ---------------------------------------------------------------- week 5 ----
{
 "n": 5,
 "title": "Again and again",
 "big_idea": "A loop runs the same block again while a condition stays true. Today the single guess becomes six: the guessing code moves inside a while loop, and the game counts.",
 "new_concepts": ["while loop", "loop condition", "++", "&& and ! in a condition", "break", "for loop (homework)", "Random (homework)"],
 "objectives": [
   "Write a while loop and say exactly when it stops",
   "Make sure something inside the loop changes the condition",
   "Count with ++",
   "Leave a loop early with break",
   "Re-indent code that has moved inside a loop",
 ],
 "ops": OPS[5],
 "flow": [
  TALK("0:00", "Six guesses, one question",
       "Run last week's game. It says you get six guesses, then gives you one. Today it keeps its promise.",
       ask=("We could copy the guess code six times. Why not?",
            "It would be six times as long, and hard mode needs four and easy eight. A loop runs the same code as many times as needed.")),
  TALK("0:04", "while",
       "<code>while (condition) { ... }</code> checks the condition, runs the block, and goes back to check again. It stops the first time the condition is false.",
       "Something inside the loop <em>must</em> change the condition, or it never stops. Draw the loop on the board as an arrow going back up.",
       ask=("When should our guessing stop?",
            "When you have used all your guesses, or when you have won. Turn that around: keep going while guesses are left AND you have not won.")),
  STEP(MAIN, "roundvars", "Count the guesses", at="0:10", notes=[
       "A counter that starts at zero. The loop will add one each real guess.",
  ]),
  STEP(MAIN, "guessopen", "Open the loop", notes=[
       "Say it out loud: <em>while guesses used is less than the maximum, and not won</em>. <code>&amp;&amp;</code> needs both; <code>!won</code> is true while won is false.",
  ]),
  STEP(MAIN, "guessclose", "Close it", notes=[
       "The loop's closing brace goes after the win check, just above the ending. Everything between the two braces now repeats.",
  ]),
  TABIN("read", "check", "Move the guess code inside", at="0:18", notes=[
       "The code between the loop's braces is now inside the loop, but it does not look like it. Select from the prompt down to the end of the win check and press Tab once. Nothing on those lines changes.",
  ], ask=("Java does not care about indentation. Why bother?",
          "Because people do. Indentation is how you see what is inside what - and in week 8 a second loop goes round all of this.")),
  STEP(MAIN, "quit", "Leave the loop on quit", at="0:24", notes=[
       "<code>break</code> leaves the loop right away, skipping the rest of the block. It is the same word the switch used, doing the same job: <em>get out of here</em>.",
  ]),
  STEP(MAIN, "count", "Count a guess", notes=[
       "<code>++</code> adds one. This is the line that changes the loop's condition - without it, a player who never wins would guess forever.",
  ], ask=("Delete this line in your head. What happens when you keep guessing wrong?",
          "The loop never ends: guessesUsed stays 0, which is always less than 6. That is an infinite loop.")),
  STEP(MAIN, "result", "Say how many", at="0:30", notes=[
       "Two messages change: the win says how many guesses it took, and the loss says it ran out. Only the text changes; the chain is the same.",
  ]),
  TALK("0:34", "Play the whole game",
       "Run it. Make wrong guesses until it runs out. Then run again and win on the third guess. Then quit on the second.",
       ask=("After a quit, why doesn't the loop ask again?",
            "break jumped straight out, past the loop's condition check.")),
  TALK("0:40", "Make an infinite loop on purpose",
       "Comment out <code>guessesUsed++;</code> and run. Guess wrong a few times - it never stops. Stop the program with the editor's stop button (or Ctrl+C in a terminal). Put the line back.",
       "Every infinite loop anyone ever writes is this: nothing inside the loop changes the condition."),
  TALK("0:45", "for: the counting loop",
       "When you know how many times, Java has a shorter loop. <code>for (int count = 1; count &lt;= 10; count++)</code> has three parts: start, keep-going condition, step.",
       "It does exactly what a while with a counter does, on one line. The game uses its first one next week.",
       ask=("Write the while loop that does the same as that for.",
            "int count = 1; while (count <= 10) { ... count++; }. Same three parts, spread out.")),
  TALK("0:52", "Random numbers",
       "<code>import java.util.Random;</code>, <code>Random random = new Random();</code>, then <code>random.nextInt(100)</code> gives a whole number from 0 to 99. Add 1 for 1 to 100. The homework's guessing game uses it; the game itself uses it in week 7."),
  TALK("0:57", "Homework", "Chapter 5 of the workbook."),
 ],
 "errors": [
  ("The game never stops asking", "guessesUsed++ is missing, or it is outside the loop's braces."),
  ("It only ever asks once", "The closing } of the loop is in the wrong place - above the guess, not after the win check."),
  ("The result prints after every guess", "The result is inside the loop. The loop's } belongs just above if (won)."),
  ("variable guess is already defined", "Old guess lines left in after moving the code. There should be exactly one String guess line."),
 ],
 "recap": [
   "A while loop repeats its block while its condition is true, checking before each run.",
   "Something inside the loop must change the condition, or it never ends - an infinite loop.",
   "&& joins two conditions that must both be true. !won means won is false.",
   "count++ adds one to count.",
   "break leaves a loop immediately.",
   "A for loop puts start, condition and step on one line: for (int count = 1; count <= 10; count++).",
   "When code moves inside a loop, select it and press Tab so it looks like it is inside.",
 ],
 "homework": [
  {"task": "Times table", "detail": "Ask for a number from 1 to 10 and store it in numberInput. Use a while loop with an int counter from 1 to 10 to print the table: 7 x 1 = 7 up to 7 x 10 = 70.", "done": "Ten lines print and the counter is increased inside the loop."},
  {"task": "Count to five", "detail": "Make int count = 1. Write a while loop that prints count while it is 5 or less, adding one each time. Then write the same thing as a for loop.", "done": "Both print 1 to 5."},
  {"task": "Guess the number", "detail": "Pick a random number from 1 to 100 with random.nextInt(100) + 1. Keep asking for a guess while it is wrong, printing too high or too low. Read the guess again INSIDE the loop - if you only read it before the loop, the condition never changes and it runs forever.", "done": "You can win, and it tells you how many guesses it took."},
  {"task": "Number series", "detail": "Ask for a starting number, an ending number and a step. Use a for loop to print every number from start to end going up by step: start 3, end 20, step 5 prints 3 8 13 18.", "done": "Step 1 prints every number; a start bigger than the end prints nothing."},
 ],
 "bonus": {"title": "Guesses left", "body": "Before each guess, print how many guesses are left: maxGuesses - guessesUsed."},
 "slides": [
  {"title": "while", "sub": "while (condition) { ... }", "bullets": ["Checks the condition, runs the block, checks again", "Stops the first time it is false", "Something inside must change the condition"],
   "code": [M("roundvars"), M("guessopen"), M("guessclose"), TABREF("read", "check")]},
  {"title": "Getting out", "sub": "", "bullets": ["break leaves the loop at once", "guessesUsed++ counts - and lets the loop end", "The result waits until the loop is finished"],
   "code": [M("quit"), M("count"), M("result")]},
  {"title": "Checkpoint: six guesses", "checkpoint": True,
   "say": "Run it. Guess wrong, then right. Then run it again and guess wrong until it runs out.",
   "run": """
=======================
     FIVE  LETTERS
=======================
Find the secret word before your guesses run out.
What is your name? [[Sam]]
Good luck, Sam!
Pick a mode - 1 easy, 2 normal, 3 hard: [[2]]
You get 6 guesses at a 5-letter word.
That is up to 30 letters of typing.
Your guess: [[house]]
Your guess: [[plant]]
You found it in 2!
"""},
  {"title": "for: the counting loop", "sub": "for (int count = 1; count <= 10; count++)", "bullets": ["Start: int count = 1", "Keep going while: count <= 10", "After each run: count++", "The same as a while with a counter, on one line"]},
 ],
},

# ---------------------------------------------------------------- week 6 ----
{
 "n": 6,
 "title": "Reading a word",
 "big_idea": "A String is a row of characters you can measure, clean up and take apart one letter at a time. Today the game tidies every guess, refuses ones that are the wrong length, and prints its first real clue.",
 "new_concepts": ["trim", "toLowerCase", "length()", "continue", "for loop", "char", "charAt", "indexOf", "Character.toUpperCase"],
 "objectives": [
   "Clean up typed text with trim and toLowerCase",
   "Measure a String with length()",
   "Skip the rest of one loop pass with continue",
   "Walk through a word one letter at a time with a for loop and charAt",
   "Use indexOf to ask whether a letter is anywhere in a word",
 ],
 "ops": OPS[6],
 "flow": [
  TALK("0:00", "The PLANT problem",
       "Week 3 left a problem open: typing PLANT, or plant with a space after it, lost. Run the game and show it again.",
       ask=("What would have to happen to a guess before we compare it?",
            "Take the spaces off the ends and make it all small letters. That is two String methods, and it is the first line today.")),
  TALK("0:03", "A String is a row of characters",
       "On the board write <code>p l a n t</code> in five boxes and number them underneath <strong>0 1 2 3 4</strong>. Java counts from zero. The first letter is at index 0 and the last is at <code>length() - 1</code>.",
       "A single character is its own type, <code>char</code>, written in single quotes: <code>'p'</code>. A String is in double quotes, even if it is one letter long.",
       ask=("plant has five letters. What is the index of the t?",
            "4. Getting that wrong by one is so common it has a name: an off-by-one error.")),
  STEP(MAIN, "read", "Tidy every guess", at="0:08", notes=[
       "Two changes. The prompt now says which guess this is - <code>guessesUsed + 1</code> is in brackets so Java adds before it joins. And a new line cleans the guess: <code>trim()</code> removes spaces from both ends, <code>toLowerCase()</code> makes every letter small.",
  ], ask=("Why guessesUsed + 1 and not just guessesUsed?",
          "guessesUsed counts guesses already made, so before the first guess it is 0. People count from 1.")),
  STEP(MAIN, "length", "Five letters or nothing", at="0:15", notes=[
       "Put this just below the quit check. <code>continue</code> skips the rest of this pass and goes straight back to the loop's condition. The guess is not counted, because the counting line is further down and never runs.",
  ], ask=("What's the difference between continue and break?",
          "break leaves the loop completely. continue only abandons this one pass and goes round again.")),
  TALK("0:21", "The clue, in words",
       "Before typing: every letter gets one of three marks. Right letter, right place: a capital. In the word but somewhere else: a small letter. Not in the word: an underscore.",
       "So for each of the five positions we ask two questions, in that order. That is a loop with an if / else if / else inside it."),
  STEP(MAIN, "clue", "Build the clue", at="0:25", notes=[
       "Just below the counting line. The clue starts empty and grows one mark per letter. The <code>for</code> loop runs <code>index</code> from 0 to 4; <code>charAt(index)</code> gives the letter at that position as a <code>char</code>.",
       "<code>indexOf(letter)</code> returns where the letter is in the secret word, or -1 if it is not there at all - so <code>&gt;= 0</code> means <em>it is in there somewhere</em>. The last line prints the finished clue.",
  ], ask=("Why is the right-place check first?",
          "Because a right-place letter is also 'in the word somewhere'. Checked second, it would always come out small. Order matters in a chain - week 4 again.")),
  TALK("0:36", "Play it",
       "Run and try: <code>cat</code>, then <code>  CRANE </code> with spaces, then words that share letters with plant.",
       ask=("The clue for plans was PLAN_. Why is the s an underscore?",
            "There is no s in plant. Every mark is checked against the secret word, position by position.")),
  TALK("0:42", "Char and String are different",
       "<code>letter == secretWord.charAt(index)</code> uses <code>==</code>, and that is correct: chars are simple values like ints, so <code>==</code> compares them properly. Strings are the ones that need <code>.equals</code>.",
       "Show <code>'a' + 1</code> printing 98 - a char is secretly a number. That surprises everyone once, which is better than once in a test."),
  TALK("0:50", "More String methods",
       "On the board: <code>toUpperCase()</code>, <code>contains(\"an\")</code>, <code>startsWith</code>, <code>substring(1, 3)</code>, <code>replace('a', 'o')</code>. The homework uses a few. They all give back a new String - the original never changes.",
       ask=("If word is \"plant\", what is word.substring(1, 3)?",
            "\"la\". From index 1 up to but not including index 3.")),
  TALK("0:57", "Homework", "Chapter 6 of the workbook."),
 ],
 "errors": [
  ("StringIndexOutOfBoundsException", "charAt was given an index past the end. The loop's condition must be index < WORD_LENGTH, not <=."),
  ("incomparable types: char and String", "A letter compared with \"a\" in double quotes. A single char uses single quotes: 'a'."),
  ("A padded guess says It has to be 5 letters", "The trim line is missing, so the spaces are counted."),
  ("The clue shows every letter as small", "The two checks are in the wrong order - the right-place check must come first."),
  ("A wrong-length guess uses up a turn", "The length check is below guessesUsed++. It belongs just below the quit check."),
 ],
 "recap": [
   "A String is a row of characters numbered from 0. The last one is at length() - 1.",
   "charAt(index) gives one character, a char. chars use single quotes and can be compared with ==.",
   "trim() removes spaces from both ends; toLowerCase() makes every letter small. They return a new String.",
   "indexOf(letter) says where a letter is, or -1 if it is not there.",
   "A for loop is the natural way to visit every position in a word.",
   "continue skips the rest of this loop pass; break leaves the loop altogether.",
 ],
 "homework": [
  {"task": "Vowels and consonants", "detail": "Ask for a word. Loop over it with a for loop and charAt, and count how many letters are vowels (a, e, i, o, u) and how many are consonants. Hint: \"aeiou\".indexOf(letter) >= 0 is true for a vowel. Lower-case the word first.", "done": "Banana gives 3 vowels and 3 consonants."},
  {"task": "Backwards", "detail": "Ask for a word and print it backwards, using a for loop that starts at the last index and counts down with index--.", "done": "plant prints tnalp."},
  {"task": "Palindrome", "detail": "Using your backwards word, print whether the word is a palindrome - the same forwards and backwards, like level or racecar. Compare with .equals.", "done": "Level is a palindrome (lower-case it first); plant is not."},
  {"task": "Initials", "detail": "Ask for a first name and a last name and print the initials in capitals: sam lee prints S.L.", "done": "It works whatever capitals the names were typed with."},
 ],
 "bonus": {"title": "Shout the win", "body": "When the player wins, print the secret word in capitals with toUpperCase()."},
 "slides": [
  {"title": "Tidy the guess", "sub": "trim() and toLowerCase()", "bullets": ["trim() drops spaces from both ends", "toLowerCase() makes every letter small", "The prompt counts: Guess 1 of 6"],
   "code": [M("read")]},
  {"title": "Wrong length? Go round again", "sub": "continue", "bullets": ["length() counts the characters", "continue skips the rest of this pass", "The guess is not counted"],
   "code": [M("length")]},
  {"title": "A word, letter by letter", "sub": "p l a n t  =  0 1 2 3 4", "bullets": ["Java counts from 0", "charAt(index) gives one char", "indexOf(letter) is -1 when it is not there"]},
  {"title": "The clue", "sub": "Capital, small or _", "bullets": ["Right letter, right place: a capital", "In the word, wrong place: small", "Not in the word: _"],
   "code": [M("clue")]},
  {"title": "Checkpoint: clues", "checkpoint": True,
   "say": "Run it, pick normal, and try cat, then CRANE with spaces round it, then plans and plant.",
   "run": """
=======================
     FIVE  LETTERS
=======================
Find the secret word before your guesses run out.
What is your name? [[Sam]]
Good luck, Sam!
Pick a mode - 1 easy, 2 normal, 3 hard: [[2]]
You get 6 guesses at a 5-letter word.
That is up to 30 letters of typing.
Guess 1 of 6: [[cat]]
It has to be 5 letters.
Guess 1 of 6: [[  CRANE ]]
__AN_
Guess 2 of 6: [[plans]]
PLAN_
Guess 3 of 6: [[plant]]
PLANT
You found it in 3!
"""},
 ],
},

# ---------------------------------------------------------------- week 7 ----
{
 "n": 7,
 "title": "A list of words",
 "big_idea": "An array holds many values under one name, numbered from 0. Today the game gets a list of twelve words and picks one at random, and it keeps a board of every clue so far.",
 "new_concepts": ["array", "index", "array.length", "new String[size]", "Random", "nextInt(bound)", "for-each loop"],
 "objectives": [
   "Make an array with values already in it, and an empty one of a given size",
   "Read and change one element by its index",
   "Pick a random element with random.nextInt(array.length)",
   "Fill an array with a for loop and print it with a for-each loop",
 ],
 "ops": OPS[7],
 "flow": [
  TALK("0:00", "Everybody knows the word",
       "Ask the room what the secret word is. Everyone knows: plant. A game with one answer is only a game once.",
       ask=("Where could more words come from?",
            "A list the program keeps. Java calls a fixed-size list an array.")),
  TALK("0:03", "An array is a row of boxes",
       "Draw twelve boxes in a row, numbered 0 to 11, one word in each. The whole row has one name, <code>words</code>. <code>words[0]</code> is the first box; <code>words.length</code> is 12; the last box is <code>words[11]</code>.",
       "It is the same numbering as a String's letters last week. An array's size is fixed when it is made.",
       ask=("What does words[12] give you?",
            "A crash: ArrayIndexOutOfBoundsException. There is no box 12. Same off-by-one as last week.")),
  STEP(MAIN, "imports", "Import Random", at="0:08", notes=[
       "One new import at the top, above the Scanner one.",
  ]),
  STEP(MAIN, "words", "Twelve words", notes=[
       "Just below the summary. The curly braces list the values; Java counts them and makes the array that size. It runs over two lines because Java lets a statement run on until its semicolon. Then one <code>Random</code> for the whole program.",
  ]),
  STEP(MAIN, "pick", "Pick one at random", at="0:15", notes=[
       "Replace the plant line. <code>random.nextInt(words.length)</code> gives a whole number from 0 to 11 - exactly the valid indexes - and <code>words[...]</code> takes the word in that box.",
  ], ask=("Why words.length and not 12?",
          "So adding a thirteenth word just works. Same idea as WORD_LENGTH: say a number in one place.")),
  TALK("0:19", "Play a few rounds",
       "Run it three times. Different words. Now the game is a game.",
       "Temporarily add <code>System.out.println(secretWord);</code> after the pick to cheat while testing, then delete it."),
  STEP(MAIN, "roundvars", "A board of clues", at="0:23", notes=[
       "<code>new String[maxGuesses]</code> makes an empty array with one box per guess. The for loop visits every box by index and fills it with a row of dashes, so unused rows show on the board.",
  ], ask=("Why maxGuesses and not 6?",
          "Hard mode gets 4 rows and easy gets 8. The board has as many rows as you have guesses.")),
  STEP(MAIN, "store", "Keep the clue", notes=[
       "Just below the line that prints the clue. <code>guessesUsed</code> has already been counted, so this guess's row is <code>guessesUsed - 1</code>: the first guess goes in row 0.",
  ]),
  STEP(MAIN, "board", "Show the board", at="0:31", notes=[
       "After the guessing loop, above the result. This is a <em>for-each</em> loop: read it as <em>for each String row in board</em>. It hands you every element in turn, with no index to manage.",
  ], ask=("When is a for-each loop not enough?",
          "When you need the index, or want to change the boxes - like the loop that filled the board with dashes.")),
  TALK("0:38", "Play to the end",
       "Play a full game. The board prints at the end, one row per guess, with dashes for the ones you did not need.",
       ask=("What would print if we showed the board before the loop?",
            "Six rows of dashes. Nothing has been stored yet.")),
  TALK("0:44", "Arrays of numbers",
       "On the board: <code>int[] scores = {72, 85, 91};</code> and a loop that adds them into a <code>total</code>. The total starts at 0 and each pass adds one element. Then find the smallest: start with <code>scores[0]</code>, and replace it every time you meet something smaller.",
       "That pattern - a variable that starts somewhere sensible and is updated in a loop - is in nearly every program you will ever write."),
  TALK("0:57", "Homework", "Chapter 7 of the workbook."),
 ],
 "errors": [
  ("ArrayIndexOutOfBoundsException: Index 6 out of bounds for length 6", "An index past the end. The last element is at length - 1."),
  ("The board is full of null", "The loop that fills it with dashes is missing."),
  ("cannot find symbol: class Random", "The import java.util.Random; line is missing."),
  ("The first clue lands in row 1", "It should be guessesUsed - 1 - the counter is already one ahead."),
 ],
 "recap": [
   "An array holds many values of one type under one name: String[] words = {\"apple\", \"brick\"};",
   "Elements are numbered from 0. words[0] is the first; the last is words[words.length - 1].",
   "new String[6] makes an array of six empty boxes. An array's size cannot change.",
   "random.nextInt(bound) gives a whole number from 0 up to bound - 1 - so random.nextInt(words.length) is always a valid index.",
   "for (String row : board) visits every element without an index.",
 ],
 "homework": [
  {"task": "Shopping list", "detail": "Make a String array shoppingList with milk, bread, eggs, apples and rice. Print the whole list with a for-each loop.", "done": "Five lines print."},
  {"task": "The third item", "detail": "Print the third item on the list. Then change it to cheese and print the list again.", "done": "The third item is shoppingList[2] - it prints eggs, then the list shows cheese in its place."},
  {"task": "Count and number", "detail": "Print how many items are on the list using shoppingList.length, then print every item with its number using a normal for loop: 1. milk, 2. bread...", "done": "The numbers start at 1 even though the indexes start at 0."},
  {"task": "Smallest number", "detail": "Make int[] numbers = {42, 17, 88, 5, 23}. Find and print the smallest with a loop, without sorting. Start smallest at numbers[0].", "done": "It prints 5, and still works if you move the 5 to the front or the end."},
 ],
 "bonus": {"title": "More words", "body": "Add six more five-letter words to the array. Nothing else in the program needs to change - check that it doesn't."},
 "slides": [
  {"title": "An array", "sub": "Many values, one name, numbered from 0", "bullets": ["words[0] is the first", "words.length is how many", "The last is words[words.length - 1]"],
   "code": [M("imports"), M("words")]},
  {"title": "A random word", "sub": "random.nextInt(words.length)", "bullets": ["A whole number from 0 to 11", "Exactly the valid indexes", "Add a word and it still works"],
   "code": [M("pick")]},
  {"title": "A board of clues", "sub": "", "bullets": ["new String[maxGuesses] makes empty boxes", "A for loop fills them with dashes", "Each clue goes in row guessesUsed - 1"],
   "code": [M("roundvars"), M("store")]},
  {"title": "for-each", "sub": "for (String row : board)", "bullets": ["Every element, in order", "No index to get wrong", "Read it as: for each row in board"],
   "code": [M("board")]},
  {"title": "Checkpoint: a random word", "checkpoint": True,
   "say": "Run it and play a whole game. Your word will be different from this one - it is random now.",
   "seed": 12,
   "run": """
=======================
     FIVE  LETTERS
=======================
Find the secret word before your guesses run out.
What is your name? [[Sam]]
Good luck, Sam!
Pick a mode - 1 easy, 2 normal, 3 hard: [[2]]
You get 6 guesses at a 5-letter word.
That is up to 30 letters of typing.
Guess 1 of 6: [[cloud]]
__ou_
Guess 2 of 6: [[mouse]]
_OUSE
Guess 3 of 6: [[house]]
HOUSE
__ou_
_OUSE
HOUSE
-----
-----
-----
You found it in 3!
"""},
 ],
},

# ---------------------------------------------------------------- week 8 ----
{
 "n": 8,
 "title": "Another round",
 "big_idea": "A loop can sit inside another loop. Today the whole round goes inside a play-again loop, the game remembers your scores across rounds, and a loop inside the guessing loop catches repeated guesses.",
 "new_concepts": ["nested loops", "outer and inner loop", "flag variable", "running total", "searching an array"],
 "objectives": [
   "Wrap existing code in an outer loop and re-indent it",
   "Say which variables belong outside the loop and which inside, and why",
   "Keep a running total and a best score across rounds",
   "Search an array for a value with a loop and a boolean flag",
 ],
 "ops": OPS[8],
 "flow": [
  TALK("0:00", "One game, then goodbye",
       "Play a game. It ends, and to play again you run it again, and type your name and pick a mode again.",
       ask=("Which parts should happen once, and which every round?",
            "Once: title, name, mode, the word list. Every round: pick a word, reset the board, guess, show the result. Draw the two lists on the board.")),
  STEP(MAIN, "stats", "Scores that outlive a round", at="0:05", notes=[
       "Just below the word list, and <em>outside</em> the loop you are about to make. Anything that must survive from one round to the next has to be made before the round starts.",
  ], ask=("What would happen to gamesPlayed if it were made inside the round?",
          "It would be set back to 0 every round, so it could never get past 1.")),
  STEP(MAIN, "roundopen", "Open the round loop", notes=[
       "Just above the line that picks the word. A boolean that starts true, and a loop that keeps going while it stays true. Something inside will set it false.",
  ]),
  STEP(MAIN, "roundclose", "Close it", notes=[
       "The very last line inside main: one closing brace, after the result. Now the whole round is inside the loop.",
  ]),
  TABIN("pick", "result", "Move the round inside", at="0:12", notes=[
       "Everything from the random pick down to the end of the result is now inside the round loop. Select it all and press Tab once. It is a lot of lines and none of them change - that is why we never retype them.",
  ], ask=("The guess code is now two loops deep. How can you tell?",
          "Count the indentation: main, the round loop, the guess loop. Sixteen spaces before the guess prompt.")),
  STEP(MAIN, "tally", "Count the round", at="0:18", notes=[
       "Just below the result. Every round adds to gamesPlayed; a win also adds to gamesWon.",
       "bestScore is the fewest guesses so far. 0 means <em>no win yet</em>, so the first win always counts; after that, only a smaller number replaces it.",
  ], ask=("Why bestScore == 0 || ...?",
          "0 is not a real score, it means nothing has been won yet. Without it, 0 would always be the 'best'.")),
  STEP(MAIN, "again", "Ask to play again", at="0:25", notes=[
       "This is the line that changes the loop's condition. Any answer that is not y or yes ends the game.",
  ]),
  TALK("0:28", "Play two rounds",
       "Run it. Win or lose, answer y, play again - the title and name do not repeat. Answer n to stop.",
       "Now guess the same word twice in one round. It uses up a turn. That is next."),
  STEP(MAIN, "roundvars", "Remember every guess", at="0:32", notes=[
       "A second array next to the board, the same size. The board keeps clues; this keeps the words that made them.",
  ]),
  STEP(MAIN, "repeat", "Already tried that?", notes=[
       "Just below the length check. A <em>flag</em> starts false; the loop looks at every guess made so far and raises the flag if one matches. It is a loop inside the guess loop, inside the round loop.",
       "After the search, if the flag is up, say so and <code>continue</code> - the repeat is not counted.",
  ], ask=("Why is the loop's limit guessesUsed and not guesses.length?",
          "The boxes after guessesUsed are still empty (null). Calling .equals on nothing crashes.")),
  STEP(MAIN, "store", "Keep the guess", at="0:42", notes=[
       "Below the line that stores the clue: store the guess in the same row.",
  ]),
  TALK("0:45", "Try to break it",
       "Guess the same word twice. Then play three rounds and watch <em>Fewest guesses so far</em> change only when you beat it.",
       ask=("How many times does the repeat check's inner loop run on the sixth guess?",
            "Five - once for each earlier guess. Nested loops multiply.")),
  TALK("0:50", "Nested loops on paper",
       "On the board: <code>for (int row = 1; row &lt;= 3; row++) { for (int column = 1; column &lt;= 4; column++) { print(\"*\"); } println(); }</code>. Predict it: 3 rows of 4 stars. The inner loop runs all the way through for every pass of the outer one."),
  TALK("0:57", "Homework", "Chapter 8 of the workbook."),
 ],
 "errors": [
  ("gamesPlayed is always 1", "The stats lines are inside the round loop. They go above boolean keepPlaying."),
  ("NullPointerException in the repeat check", "The inner loop runs to guesses.length; it must stop at guessesUsed."),
  ("It never asks to play again", "The again lines are outside the round loop's closing brace."),
  ("cannot find symbol: guesses", "The guesses array line is missing from the round variables."),
 ],
 "recap": [
   "A loop can sit inside another. The inner one runs all the way through for every pass of the outer one.",
   "Variables made inside a loop start fresh every pass. Anything that must survive, like a score, is made before the loop.",
   "A running total starts at 0 and has something added each pass.",
   "To search an array: a boolean flag starts false, a loop checks each element, and the flag is set true on a match.",
   "When code moves inside a new loop, select it and press Tab once.",
 ],
 "homework": [
  {"task": "Stars", "detail": "Use nested for loops, with counters called row and column, to print 3 rows of 4 stars.", "done": "The output is a 3 by 4 block of * characters."},
  {"task": "A triangle", "detail": "Change the inner loop's condition so row 1 has one star, row 2 has two, and so on up to 5.", "done": "A right-angled triangle of stars."},
  {"task": "Duplicates", "detail": "Make int[] numbers = {4, 7, 2, 7, 9, 4}. Use two nested loops to print every value that appears twice. The inner loop must start at index + 1, not at 0 or 1, or numbers will match themselves.", "done": "It prints 4 and 7, each once."},
  {"task": "Times grid", "detail": "Print a 10 by 10 multiplication grid with nested loops. Use System.out.print(product + \"\\t\") to line the columns up with a tab.", "done": "The bottom-right number is 100."},
 ],
 "bonus": {"title": "A goodbye", "body": "After the round loop closes, print how many games were played. (Week 11 does this properly, so keep it short.)"},
 "slides": [
  {"title": "Once, or every round?", "sub": "", "bullets": ["Scores must outlive a round - they go first", "A boolean keeps the round loop going", "The loop closes after the result"],
   "code": [M("stats"), M("roundopen"), M("roundclose")]},
  {"title": "Move the round inside", "sub": "Select, then Tab", "bullets": ["Nothing on these lines is retyped", "They are now one level deeper", "The guess loop is now inside the round loop"],
   "code": [TABREF("pick", "result")]},
  {"title": "Keep score, ask again", "sub": "", "bullets": ["Every round counts; a win counts twice", "bestScore: the fewest guesses so far", "Any answer but y or yes ends it"],
   "code": [M("tally"), M("again")]},
  {"title": "Already tried that?", "sub": "A loop inside a loop inside a loop", "bullets": ["guesses remembers every word", "A flag starts false and goes up on a match", "Search only the boxes already filled"],
   "code": [M("roundvars"), M("repeat"), M("store")]},
  {"title": "Checkpoint: two rounds", "checkpoint": True,
   "say": "Run it. Guess the same word twice, win, play again, quit the second round and answer n.",
   "seed": 11,
   "run": """
=======================
     FIVE  LETTERS
=======================
Find the secret word before your guesses run out.
What is your name? [[Sam]]
Good luck, Sam!
Pick a mode - 1 easy, 2 normal, 3 hard: [[2]]
You get 6 guesses at a 5-letter word.
That is up to 30 letters of typing.
Guess 1 of 6: [[cloud]]
__ou_
Guess 2 of 6: [[cloud]]
You already tried cloud.
Guess 2 of 6: [[house]]
HOUSE
__ou_
HOUSE
-----
-----
-----
-----
You found it in 2!
Fewest guesses so far: 2
Play again? (y/n) [[y]]
Guess 1 of 6: [[quit]]
-----
-----
-----
-----
-----
-----
You gave up. The word was night.
Fewest guesses so far: 2
Play again? (y/n) [[n]]
"""},
 ],
},

# ---------------------------------------------------------------- week 9 ----
{
 "n": 9,
 "title": "Methods",
 "big_idea": "A method is a named piece of code you can call from anywhere. Today you write two: one that answers a yes-or-no question about a word, and one that turns a number into a message.",
 "new_concepts": ["method", "static", "parameter", "return type", "return", "calling a method", "toCharArray", "Character.isLetter", "scope"],
 "objectives": [
   "Write a method with a parameter and a return type",
   "Call a method and use the value it returns",
   "Say what return does, and why code after it does not run",
   "Explain why a variable made in main cannot be used inside another method",
 ],
 "ops": OPS[9],
 "flow": [
  TALK("0:00", "main is getting long",
       "Scroll through main. It is over a hundred lines and all of it is in one place.",
       "A <em>method</em> is a named piece of code that does one job. You have been calling them since week 1: <code>println</code>, <code>nextLine</code>, <code>charAt</code>. Today you write your own.",
       ask=("What does a method need to be told, and what does it give back?",
            "Its inputs (parameters) and its result (the return value). charAt is told an index and gives back a char.")),
  TALK("0:05", "The shape of a method",
       "On the board: <code>static boolean isAllLetters(String word)</code>. Read it right to left: it is called isAllLetters, it takes one String and calls it word, and it gives back a boolean. <code>static</code> means it belongs to the class, like main.",
       "Methods go inside the class but outside main - after main's closing brace."),
  STEP(MAIN, "isallletters", "Is it all letters?", at="0:09", notes=[
       "Below main's closing brace, inside the class. <code>toCharArray()</code> turns the word into an array of chars, and the for-each loop visits each one.",
       "<code>return</code> ends the method at once and hands a value back. The first non-letter returns false; only if the loop finishes without one do we reach return true.",
  ], ask=("Why can't the return true go inside the loop?",
          "It would return after checking only the first letter. You can only say 'all letters' after looking at all of them.")),
  STEP(MAIN, "letters", "Use it", at="0:18", notes=[
       "Just below the length check, in main. <code>!isAllLetters(guess)</code> calls the method with the guess, gets true or false back, and flips it.",
  ], ask=("Inside the method it is called word; out here it is guess. How?",
          "The value is copied into the parameter. The method never knows what the caller called it.")),
  STEP(MAIN, "winmessage", "A message for every score", at="0:23", notes=[
       "Below isAllLetters. This one returns a String. A switch picks the message; each case <em>returns</em>, so no break is needed - return leaves the whole method.",
       "The default covers five guesses and more.",
  ]),
  STEP(MAIN, "result", "Say it", at="0:30", notes=[
       "One new line inside the win block: call winMessage with the number of guesses, and print whatever comes back.",
  ]),
  TALK("0:33", "Try it",
       "Run it. Guess <code>cl0ud</code> with a zero. Then win in two and read the message.",
       ask=("The method has a variable called guessesUsed and so does main. Are they the same variable?",
            "No. Each method has its own variables. The parameter only has the same name because it is the clearest name.")),
  TALK("0:40", "Scope",
       "Inside <code>winMessage</code>, try to use <code>secretWord</code>. It will not compile: <em>cannot find symbol</em>. A variable exists only inside the braces where it was made - that is its <em>scope</em>. Anything a method needs, you pass in.",
       ask=("How could winMessage use the secret word?",
            "Add a second parameter and pass it in the call. Delete the experiment afterwards.")),
  TALK("0:47", "void",
       "A method that gives nothing back has return type <code>void</code> - main is one. On the board: <code>static void printLine(int width)</code> printing that many dashes. You call it as a statement, not inside a println.",
       ask=("Can you println(printLine(5))?",
            "No - there is nothing to print. void means no value comes back.")),
  TALK("0:57", "Homework", "Chapter 9 of the workbook."),
 ],
 "errors": [
  ("missing return statement", "Some path through the method ends without a return. The last line of isAllLetters must be return true;."),
  ("illegal start of expression at static", "The method is inside main. It goes after main's closing brace."),
  ("cannot find symbol in winMessage", "A variable from main used inside another method. Pass it in as a parameter."),
  ("unreachable statement", "Code placed after a return. return ends the method, so nothing after it can run."),
 ],
 "recap": [
   "A method is a named block of code: static returnType name(parameters) { ... }.",
   "Parameters are the method's inputs. The caller's value is copied in.",
   "return hands a value back and ends the method at once.",
   "void means the method gives nothing back.",
   "Methods go inside the class, outside main.",
   "A variable only exists inside the braces it was made in - its scope.",
 ],
 "homework": [
  {"task": "Add two numbers", "detail": "Write static int addNumbers(int first, int second) that returns their sum. In main, read two numbers and print addNumbers of them. Make every variable inside main or inside the method - none outside.", "done": "3 and 4 prints 7."},
  {"task": "A calculator", "detail": "Write static double performCalculation(double first, double second, String operation), using a switch on operation to add, subtract, multiply or divide. Return 0 for an operation it does not know. Call it four times from main.", "done": "performCalculation(8, 2, \"/\") returns 4.0."},
  {"task": "Is it even?", "detail": "Write static boolean isEven(int number) using %. Use it to print every even number from 1 to 20.", "done": "It prints 2 to 20, ten numbers."},
  {"task": "Count a letter", "detail": "Write static int countLetter(String word, char letter) that returns how many times the letter appears.", "done": "countLetter(\"banana\", 'a') returns 3."},
 ],
 "bonus": {"title": "Longest word", "body": "Write static String longestWord(String[] words) that returns the longest word in an array, and test it on a small array of your own."},
 "slides": [
  {"title": "A method", "sub": "static boolean isAllLetters(String word)", "bullets": ["Name, parameter, return type", "return hands back a value and ends the method", "It lives outside main"],
   "code": [M("isallletters")]},
  {"title": "Calling it", "sub": "", "bullets": ["The guess is copied into word", "The answer comes back as true or false", "! flips it"],
   "code": [M("letters")]},
  {"title": "A method that returns a String", "sub": "", "bullets": ["Each case returns", "No break needed - return leaves the method", "Call it wherever you need the message"],
   "code": [M("winmessage"), M("result")]},
  {"title": "Scope", "sub": "A variable lives inside its braces", "bullets": ["main's variables are invisible to other methods", "Pass in what a method needs", "Same name in two methods = two variables"]},
  {"title": "Checkpoint: letters only", "checkpoint": True,
   "say": "Run it. Guess cl0ud with a zero, then play on until you win.",
   "seed": 3,
   "run": """
=======================
     FIVE  LETTERS
=======================
Find the secret word before your guesses run out.
What is your name? [[Sam]]
Good luck, Sam!
Pick a mode - 1 easy, 2 normal, 3 hard: [[2]]
You get 6 guesses at a 5-letter word.
That is up to 30 letters of typing.
Guess 1 of 6: [[cl0ud]]
Letters only, please.
Guess 1 of 6: [[clown]]
CLO__
Guess 2 of 6: [[cloud]]
CLOUD
CLO__
CLOUD
-----
-----
-----
-----
You found it in 2!
Brilliant!
Fewest guesses so far: 2
Play again? (y/n) [[n]]
"""},
 ],
},

# --------------------------------------------------------------- week 10 ----
{
 "n": 10,
 "title": "A keyboard grid",
 "big_idea": "An array can hold arrays: a grid with rows and columns. Today the game shows a keyboard before each guess and blanks out the letters you have ruled out.",
 "new_concepts": ["2D array", "row and column", "grid[row][column]", "grid[row].length", "char[]"],
 "objectives": [
   "Make a 2D array and read one element with two indexes",
   "Loop over a grid with a nested loop, using row and column as names",
   "Explain why rows of a 2D array can have different lengths",
 ],
 "ops": OPS[10],
 "flow": [
  TALK("0:00", "Which letters have I used?",
       "Play a round. After three guesses, ask the room which letters are ruled out. Nobody can say without scrolling.",
       ask=("What would a real word game show you?",
            "A keyboard, with the used letters greyed out. We will blank them with a dot.")),
  TALK("0:04", "An array of arrays",
       "Draw a grid: three rows, the keyboard's letters in each. <code>keyboard[0]</code> is the whole top row. <code>keyboard[0][2]</code> is the letter in row 0, column 2: e.",
       "First index: which row. Second index: which column in it.",
       ask=("What is keyboard[2][0]?",
            "z. Row 2 is the bottom row; column 0 is its first letter.")),
  STEP(MAIN, "keyboard", "The keyboard", at="0:08", notes=[
       "Just above the round loop - it never changes. Each row is a String turned into an array of chars, so this is an array of three char arrays. The rows are different lengths, and that is allowed.",
  ], ask=("How long is keyboard[1]?",
          "9 - asdfghjkl. And keyboard.length is 3: the number of rows.")),
  STEP(MAIN, "roundvars", "Letters tried this round", at="0:14", notes=[
       "One more round variable, starting empty. It is a String we will keep adding guesses to.",
  ]),
  STEP(MAIN, "store", "Remember the letters", notes=[
       "Below the two store lines: add the whole guess to it. Repeated letters do no harm; we only ever ask whether a letter is in there.",
  ]),
  STEP(MAIN, "keyprint", "Print the keyboard", at="0:20", notes=[
       "At the very top of the guess loop, above the prompt. The outer loop picks a row; the inner loop walks along it with <code>column</code> and pulls out one key.",
       "A key is blanked if it has been tried and is not in the secret word. Otherwise it prints. After each row, <code>println()</code> moves down.",
  ], ask=("Why keyboard[row].length and not 10?",
          "The rows are 10, 9 and 7 long. Each row knows its own length.")),
  TALK("0:32", "Play it",
       "Run and guess crane, then a second word. Watch letters turn into dots.",
       ask=("Letters in the word never turn into dots. Why is that right?",
            "They are not ruled out - they are clues. The && needs both: tried AND not in the word.")),
  TALK("0:40", "Grids everywhere",
       "On the board: <code>int[][] seats = new int[3][4];</code> - 3 rows of 4, all zeros. <code>seats[1][2] = 1;</code> books one. Where does it sit? Row 1, column 2 - second row, third seat.",
       ask=("A 3 by 3 grid holds 1 to 9 in order. Where is 9?",
            "grid[2][2]. The last row and last column are both index 2, not 3.")),
  TALK("0:57", "Homework", "Chapter 10 of the workbook."),
 ],
 "errors": [
  ("ArrayIndexOutOfBoundsException in the keyboard", "The inner loop uses keyboard.length instead of keyboard[row].length."),
  ("The keyboard prints as one long line", "The System.out.println(); after the inner loop is missing or inside it."),
  ("Every tried letter goes to a dot", "The secretWord.indexOf(key) < 0 half of the condition is missing."),
  ("No letter ever goes to a dot", "The triedLetters line is missing from the store lines, or it reads triedLetters = guess."),
 ],
 "recap": [
   "A 2D array is an array of arrays: a grid of rows and columns.",
   "grid[row][column] is one element. grid[row] is a whole row.",
   "grid.length is the number of rows; grid[row].length is the length of that row.",
   "Rows can be different lengths.",
   "Loop over a grid with a loop over rows and, inside it, a loop over columns.",
 ],
 "homework": [
  {"task": "Where is it?", "detail": "Make int[][] grid = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}. Print the element that is 9 using its indexes, then the middle one, then the first element of the last row.", "done": "grid[2][2] is 9, grid[1][1] is 5, grid[2][0] is 7."},
  {"task": "Print the grid", "detail": "Print the whole grid with nested loops named row and column, one row per line, numbers separated by spaces.", "done": "It looks like a 3 by 3 square."},
  {"task": "Stars again", "detail": "Make a char[][] of 3 rows and 4 columns with new char[3][4]. Fill every element with '*' using nested loops, then print it.", "done": "3 rows of 4 stars, made from the array."},
  {"task": "Row totals", "detail": "For the grid in the first challenge, print the total of each row.", "done": "It prints 6, 15 and 24."},
 ],
 "bonus": {"title": "Found letters in capitals", "body": "Change the keyboard so letters that are in the secret word print as capitals. Character.toUpperCase(key) does the converting."},
 "slides": [
  {"title": "An array of arrays", "sub": "keyboard[row][column]", "bullets": ["keyboard[0] is the top row", "keyboard[0][2] is e", "Rows can be different lengths"],
   "code": [M("keyboard")]},
  {"title": "Letters tried", "sub": "", "bullets": ["A String that starts empty", "Every guess is added on"],
   "code": [M("roundvars"), M("store")]},
  {"title": "Walking the grid", "sub": "One loop for rows, one for columns", "bullets": ["keyboard[row].length: each row's own length", "Tried and not in the word: a dot", "println() after each row"],
   "code": [M("keyprint")]},
  {"title": "Checkpoint: the keyboard", "checkpoint": True,
   "say": "Run it and guess crane. Every letter of crane that is not in your word becomes a dot.",
   "seed": 6,
   "run": """
=======================
     FIVE  LETTERS
=======================
Find the secret word before your guesses run out.
What is your name? [[Sam]]
Good luck, Sam!
Pick a mode - 1 easy, 2 normal, 3 hard: [[2]]
You get 6 guesses at a 5-letter word.
That is up to 30 letters of typing.
q w e r t y u i o p 
a s d f g h j k l 
z x c v b n m 
Guess 1 of 6: [[crane]]
___ne
q w e . t y u i o p 
. s d f g h j k l 
z x . v b n m 
Guess 2 of 6: [[lemon]]
LEMON
___ne
LEMON
-----
-----
-----
-----
You found it in 2!
Brilliant!
Fewest guesses so far: 2
Play again? (y/n) [[n]]
"""},
 ],
},

# --------------------------------------------------------------- week 11 ----
{
 "n": 11,
 "title": "Decimals and a goodbye",
 "big_idea": "Whole numbers throw fractions away, so a percentage needs a double - and a cast to get one. Today the game says goodbye with your record and your win rate, formatted to one decimal place.",
 "new_concepts": ["double", "cast (double)", "integer division", "printf", "format specifier %.1f", "%% and %n"],
 "objectives": [
   "Explain why 1 / 2 is 0 in Java, and fix it with a cast",
   "Turn an int into a double with (double) and a double into an int with (int)",
   "Print a number to a fixed number of decimal places with printf",
 ],
 "ops": OPS[11],
 "flow": [
  TALK("0:00", "How good are you?",
       "Play three rounds and win two. The game knows gamesPlayed and gamesWon - but when you answer n it just stops.",
       ask=("What percentage is 2 wins out of 3 games?",
            "66.7%. Wins divided by games, times 100. Let us see what Java makes of that.")),
  TALK("0:03", "Integer division",
       "On the board: <code>2 / 3 * 100</code>. Everyone predicts, then someone tries it. It prints 0. Two ints divide into an int, and the 0.666 is thrown away <em>before</em> the times 100.",
       "A <em>cast</em> changes a value's type for one use: <code>(double) gamesWon</code> is 2.0. A double divided by an int is a double, so nothing is thrown away.",
       ask=("Does (double) (gamesWon / gamesPlayed) fix it?",
            "No. The brackets divide first - still as ints, still 0 - and then turn 0 into 0.0. The cast has to happen before the division.")),
  STEP(MAIN, "goodbye", "The goodbye", at="0:10", notes=[
       "After the round loop's closing brace - outside it, so it runs once, at the very end. The first line casts before dividing. The next two thank the player by name and give the record. <code>printf</code> prints with a pattern. <code>%.1f</code> means <em>a decimal number, one place after the point</em>, and the value after the comma fills it in. <code>%%</code> prints a percent sign and <code>%n</code> ends the line.",
  ], ask=("Why can playerName be used down here?",
          "It was made in main, outside both loops, and this is still main. Its scope is the whole of main.")),
  TALK("0:20", "Play and quit",
       "Run: win one round, lose one, then answer n. The goodbye says 50.0%.",
       ask=("What if we cast to int instead: (int) 66.666?",
            "66. Casting to int cuts the fraction off. It does not round. Math.round does that.")),
  TALK("0:26", "printf patterns",
       "On the board: <code>%d</code> a whole number, <code>%f</code> a decimal, <code>%.2f</code> two places, <code>%s</code> a String, <code>%5d</code> right-aligned in five spaces. One value per pattern, in order.",
       "<code>System.out.printf(\"%s scored %d%n\", playerName, gamesWon);</code> Everyone rewrites one of the goodbye's println lines as a printf, runs it, and puts it back."),
  TALK("0:36", "Review: the first ten weeks",
       "This is the halfway point of the content. Put these on the board and ask the room to explain each, out loud, in one sentence: variable, if, while, for, array, method.",
       "Anything the room cannot explain gets five minutes now. Use the week pages' checkpoints.",
       ask=("Which one of those would you find hardest to explain to someone new?",
            "There is no right answer - it tells you what to review. Methods and nested loops are the usual ones.")),
  TALK("0:50", "Read someone else's code",
       "Swap seats. Read a neighbour's Main.java for three minutes and find one thing they did differently from you. Swap back.",
       ask=("Did anyone find a bug in their neighbour's code?",
            "Often yes - a missing trim, a wrong-way comparison. Reading code is how you get good at writing it.")),
  TALK("0:57", "Homework", "Chapter 11 of the workbook."),
 ],
 "errors": [
  ("The win rate says 0.0%", "The division happened before the cast. It must be (double) gamesWon / gamesPlayed."),
  ("UnknownFormatConversionException", "A single % in the printf pattern. A literal percent sign is %%."),
  ("The percent line runs into the next line", "The %n at the end of the printf pattern is missing."),
  ("The goodbye prints after every round", "It is inside the round loop. It goes after the loop's closing brace."),
 ],
 "recap": [
   "An int divided by an int is an int: the fraction is thrown away.",
   "A cast changes a value's type for one use: (double) gamesWon, (int) average.",
   "Casting a double to int cuts the fraction off. It does not round.",
   "printf prints with a pattern: %d for whole numbers, %.1f for a decimal to one place, %s for a String.",
   "In a printf pattern %% prints a percent sign and %n ends the line.",
 ],
 "homework": [
  {"task": "Average, again", "detail": "Make int score1 = 7, score2 = 8, score3 = 8. Print (score1 + score2 + score3) / 3, then print the correct average with a cast, then print it to two decimal places with printf.", "done": "It prints 7, then 7.666666666666667, then 7.67."},
  {"task": "Receipt", "detail": "Make three prices as doubles and a quantity for each. Print a receipt with printf: each line shows the item, quantity and line total to 2 decimal places, then a grand total.", "done": "Every money amount has exactly two decimal places."},
  {"task": "Review quiz", "detail": "Without running anything, answer: (a) what does 17 / 5 print? (b) 17 % 5? (c) what is the index of the last element of an array of length 8? (d) what does \"abc\".charAt(1) give? (e) name the loop you use when you know how many times. Then check each one in code.", "done": "3, 2, 7, 'b', a for loop."},
  {"task": "Temperature", "detail": "Ask for a temperature in Celsius as a double (input.nextDouble()). Print it in Fahrenheit, F = C * 9 / 5 + 32, to one decimal place.", "done": "37 prints 98.6."},
 ],
 "bonus": {"title": "Average guesses", "body": "Keep a running total of guesses used in winning rounds, and add the average guesses per win to the goodbye, to one decimal place."},
 "slides": [
  {"title": "2 / 3 is 0", "sub": "Integer division", "bullets": ["Two ints divide into an int", "The fraction is thrown away", "Cast first: (double) gamesWon / gamesPlayed"]},
  {"title": "The goodbye", "sub": "", "bullets": ["After the round loop: it runs once", "Cast before dividing", "printf: %.1f is one decimal place, %% is %"],
   "code": [M("goodbye")]},
  {"title": "Checkpoint: your win rate", "checkpoint": True,
   "say": "Run it. Win one round and quit the next, then answer n.",
   "seed": 2,
   "run": """
=======================
     FIVE  LETTERS
=======================
Find the secret word before your guesses run out.
What is your name? [[Sam]]
Good luck, Sam!
Pick a mode - 1 easy, 2 normal, 3 hard: [[2]]
You get 6 guesses at a 5-letter word.
That is up to 30 letters of typing.
q w e r t y u i o p 
a s d f g h j k l 
z x c v b n m 
Guess 1 of 6: [[flame]]
FLAME
FLAME
-----
-----
-----
-----
-----
You found it in 1!
Unbelievable!
Fewest guesses so far: 1
Play again? (y/n) [[y]]
q w e r t y u i o p 
a s d f g h j k l 
z x c v b n m 
Guess 1 of 6: [[quit]]
-----
-----
-----
-----
-----
-----
You gave up. The word was apple.
Fewest guesses so far: 1
Play again? (y/n) [[n]]
Thanks for playing, Sam!
You played 2 and won 1.
That is 50.0% of your games.
"""},
  {"title": "printf patterns", "sub": "One value per pattern, in order", "bullets": ["%d  a whole number", "%.2f  a decimal to two places", "%s  a String", "%n  end the line"]},
 ],
},

# --------------------------------------------------------------- week 12 ----
{
 "n": 12,
 "title": "Asking properly",
 "big_idea": "Code you write twice is code you will fix twice. Today one method asks every yes-or-no question and keeps asking until it gets a real answer - and the Scanner moves out of main so that method can use it.",
 "new_concepts": ["static field", "class-level scope", "while (true)", "return from inside a loop", "reusing a method"],
 "objectives": [
   "Move a variable out of main into the class so every method can use it",
   "Write a method with a while (true) loop that only ends with a return",
   "Replace repeated code with a call to one method",
 ],
 "ops": OPS[12],
 "flow": [
  TALK("0:00", "Type yes",
       "Play a round and answer the play-again question with <code>Yes please</code>. The game ends - anything that is not y or yes counts as no.",
       ask=("What should a program do with an answer it does not understand?",
            "Ask again. That is a loop - and we want the same behaviour for every yes-or-no question, so it belongs in a method.")),
  TALK("0:04", "The Scanner has to move",
       "A method cannot see main's variables - week 9. But a new askYesNo method needs to read the keyboard, and the Scanner is in main.",
       "A variable made in the class, outside every method, can be used by all of them. It is called a <em>field</em>, and like the methods it is <code>static</code>."),
  STEP(MAIN, "fields", "The Scanner, for everyone", at="0:07", notes=[
       "Just under <code>public class Main {</code>, above main. The comment says why it is here, because it is the only variable in the file that lives outside a method.",
  ]),
  STEP(MAIN, "name", "Remove main's Scanner", notes=[
       "Delete the <code>Scanner input = ...</code> line in main. The rest of main still says <code>input</code>, and now means the field.",
  ], ask=("What happens if you leave both?",
          "It compiles, but main's own input hides the field. Two Scanners on one keyboard is asking for trouble - keep one.")),
  STEP(MAIN, "askyesno", "Ask until it makes sense", at="0:14", notes=[
       "After winMessage. It takes the question as a parameter and returns true or false. <code>while (true)</code> would loop forever - except that each <code>return</code> leaves the whole method, loop and all.",
       "The answer is cleaned like a guess. Yes answers return true, no answers return false, and anything else gets a message and goes round again. Then the loop's closing brace, and the method's.",
  ], ask=("while (true) looks like a mistake. Why is it fine here?",
          "Every way out is a return. It is an infinite loop on purpose, with doors.")),
  STEP(MAIN, "again", "Use it for play again", at="0:25", notes=[
       "Replace the three play-again lines with one. The question is passed in; what comes back goes straight into keepPlaying.",
  ]),
  STEP(MAIN, "rules", "Use it again for the rules", at="0:29", notes=[
       "Just below the name. The call is the if's condition - it returns a boolean, so it can go anywhere a boolean can.",
  ], ask=("How many lines would the rules question have cost without the method?",
          "About ten, with its own loop. With the method it is one line. That is what methods are for.")),
  TALK("0:34", "Try to confuse it",
       "Run. Answer the rules question with <code>maybe</code>, then <code>Y</code>, then play and answer play-again with <code>YES</code>.",
       ask=("Why does YES work?",
            "toLowerCase turns it into yes before comparing. Same trick as the guess in week 6.")),
  TALK("0:42", "What else could be a method?",
       "Scroll through main together and point at blocks: the clue, the keyboard, the board, the tally. Any of them could be a method.",
       "Ask the room to pick one and say what it would need as parameters and what it would return. Do not write it - that is the bonus.",
       ask=("What would a buildClue method need to be given?",
            "The guess and the secret word. It would return the clue as a String.")),
  TALK("0:57", "Homework", "Chapter 12 of the workbook."),
 ],
 "errors": [
  ("non-static variable input cannot be referenced from a static context", "The field is missing the word static."),
  ("cannot find symbol: input inside askYesNo", "The Scanner is still in main. Move it to the class as a static field."),
  ("missing return statement", "Something is after the while (true) loop. Java knows nothing after it can run - remove it."),
  ("The rules question never stops asking", "The answers are compared before trim().toLowerCase(), or with == instead of .equals."),
 ],
 "recap": [
   "A static field is a variable made in the class, outside every method. Every method can use it.",
   "Keep fields rare: only what several methods really share.",
   "while (true) loops forever, unless something inside leaves it - return leaves the whole method.",
   "A method that returns a boolean can be called anywhere a condition goes: if (askYesNo(...)).",
   "When the same code appears twice, make it a method and call it twice.",
 ],
 "homework": [
  {"task": "Ask for a number", "detail": "Write static int askNumber(String question, int lowest, int highest) that keeps asking until the answer is in range, and returns it. Use it to ask for a month from 1 to 12.", "done": "13 and 0 are refused with a message; 5 is returned."},
  {"task": "Use it twice", "detail": "Use askNumber to ask for a day of the week from 1 to 7 as well, then print both answers.", "done": "The asking code is written once and used twice."},
  {"task": "A counter field", "detail": "Add a static int field questionsAsked. Make askNumber add one to it every time it prints the question. Print it at the end of main.", "done": "It counts every time the question was asked, including the repeats."},
  {"task": "Explain it", "detail": "In a comment at the top of your file, write two sentences: why the Scanner had to move out of main this week, and what would go wrong if every method made its own Scanner.", "done": "Your comment mentions scope."},
 ],
 "bonus": {"title": "buildClue", "body": "Move the clue-building loop into static String buildClue(String guess, String secretWord) and call it from main. The game must play exactly the same."},
 "slides": [
  {"title": "A field", "sub": "static Scanner input", "bullets": ["Made in the class, outside every method", "Every method can use it", "main's own Scanner line goes"],
   "code": [M("fields"), M("name")]},
  {"title": "Ask until it makes sense", "sub": "while (true) with doors", "bullets": ["Each return leaves the method, loop and all", "Anything else: a message, then ask again", "The question is a parameter"],
   "code": [M("askyesno")]},
  {"title": "One method, two questions", "sub": "", "bullets": ["Play again: one line now", "The rules: the call is the if's condition"],
   "code": [M("again"), M("rules")]},
  {"title": "Checkpoint: asking properly", "checkpoint": True,
   "say": "Run it. Answer the rules question with maybe, then y. Play a round, then answer n.",
   "seed": 5,
   "run": """
=======================
     FIVE  LETTERS
=======================
Find the secret word before your guesses run out.
What is your name? [[Sam]]
Good luck, Sam!
Read the rules first? (y/n) [[maybe]]
Please answer y or n.
Read the rules first? (y/n) [[y]]
CAPITAL letter = right letter, right place.
small letter   = in the word, wrong place.
_              = not in the word at all.
Pick a mode - 1 easy, 2 normal, 3 hard: [[2]]
You get 6 guesses at a 5-letter word.
That is up to 30 letters of typing.
q w e r t y u i o p 
a s d f g h j k l 
z x c v b n m 
Guess 1 of 6: [[tiger]]
TIGER
TIGER
-----
-----
-----
-----
-----
You found it in 1!
Unbelievable!
Fewest guesses so far: 1
Play again? (y/n) [[n]]
Thanks for playing, Sam!
You played 1 and won 1.
That is 100.0% of your games.
"""},
 ],
},

# --------------------------------------------------------------- week 13 ----
{
 "n": 13,
 "title": "Colour",
 "big_idea": "A String can carry instructions as well as letters. Today the clue turns green and yellow, using escape codes the console reads as colour changes instead of printing.",
 "new_concepts": ["escape sequence", "\\n and \\t", "\\u001B", "ANSI colour codes", "static final constant"],
 "objectives": [
   "Use escape sequences such as \\n, \\t and \\\" in a String",
   "Explain how an ANSI colour code works: switch on, print, switch back",
   "Make class-wide constants with static final",
 ],
 "ops": OPS[13],
 "flow": [
  TALK("0:00", "Capitals are a clue, not a colour",
       "Play a round. The capital-and-small clue works, but every real word game uses colour: green for the right place, yellow for the wrong place.",
       ask=("The console only prints text. How could text make colour?",
            "Some characters are instructions, not letters. The console reads them and changes colour instead of printing them.")),
  TALK("0:04", "Escape sequences",
       "A backslash in a String means <em>the next character is special</em>. On the board: <code>\\n</code> new line, <code>\\t</code> tab, <code>\\\"</code> a double quote inside a String, <code>\\\\</code> a backslash.",
       "<code>\\u001B</code> is the <em>escape</em> character, number 27. The console reads escape, then <code>[32m</code>, as <em>switch to green</em>. <code>[0m</code> switches back.",
       ask=("How do you print a double quote inside a String?",
            "\\\" - otherwise the quote ends the String.")),
  STEP(MAIN, "fields", "The colour codes", at="0:10", notes=[
       "Below the Scanner field. Three constants, all <code>static final</code>: shared by the whole class, and never changing. The comment says what they are, because the Strings look like nonsense.",
  ], ask=("Why constants instead of typing the codes into the clue?",
          "GREEN says what it means; \\u001B[32m does not. And a typo in a name will not compile, but a typo in a code prints junk.")),
  STEP(MAIN, "clue", "Colour the clue", at="0:17", notes=[
       "Two lines change in the clue loop. Each colour is switched on, one letter printed, then switched off with RESET - leave RESET out and everything after it stays green.",
  ]),
  TALK("0:22", "Play it",
       "Run a round. The capitals are still there - colour is extra, not instead. Someone who cannot tell green from yellow can still read the clue.",
       ask=("What happens if you forget the RESET?",
            "The colour leaks into everything printed after it. Try it, then put RESET back.")),
  TALK("0:29", "If it prints junk",
       "Some code editors do not understand colour codes and print them as <code>[32m</code>. That is the editor, not the program - the capitals still carry the clue.",
       "On a terminal that shows junk, the codes can be switched off by making all three constants empty Strings. Nothing else changes."),
  TALK("0:34", "Escape sequences on paper",
       "On the board: <code>System.out.println(\"Name\\tScore\\nSam\\t3\");</code>. Predict it, then run it: two lines, lined up by the tab.",
       ask=("How many lines does println(\"a\\nb\\nc\") print?",
            "Three. Each \\n is a line break inside the String.")),
  TALK("0:45", "Constants everywhere",
       "Scroll up through the file. Which numbers or words appear more than once and could become constants? The word list? The number of guesses per mode?",
       "Constants are how you make a program easy to change: one name, one place."),
  TALK("0:57", "Homework", "Chapter 13 of the workbook."),
 ],
 "errors": [
  ("The clue shows [32mC[0m", "That code editor does not understand colour codes. The clue still works; switch to a console that shows colour, or make the constants empty."),
  ("Everything after the clue is green", "A missing RESET after a coloured letter."),
  ("illegal escape character", "A backslash followed by something Java does not know. A real backslash is \\\\."),
  ("cannot find symbol: GREEN", "The colour fields are missing, or were put inside main."),
 ],
 "recap": [
   "A backslash in a String starts an escape sequence: \\n new line, \\t tab, \\\" a quote, \\\\ a backslash.",
   "\\u001B is the escape character. The console reads \\u001B[32m as switch to green, and \\u001B[0m as switch back.",
   "Always switch a colour back with RESET, or it leaks into everything after it.",
   "static final makes a constant the whole class can use.",
   "Colour should add to meaning, not carry it alone - the capitals still work without it.",
 ],
 "homework": [
  {"task": "A table", "detail": "Print a three-row table of names and scores with \\t between the columns and a header row, using one println per row.", "done": "The columns line up."},
  {"task": "Quotes", "detail": "Print this exact line: She said \"five letters\" and left.", "done": "The quotes appear in the output."},
  {"task": "Traffic light", "detail": "Make RED, YELLOW, GREEN and RESET constants (red is \\u001B[31m). Print the words STOP, WAIT and GO each in its colour.", "done": "Three colours, and the next line prints in normal colour."},
  {"task": "Colour a message", "detail": "Write static String colour(String text, String code) that returns code + text + RESET. Use it for the traffic light instead.", "done": "Each colour is a call, not three pieces glued by hand."},
 ],
 "bonus": {"title": "Colour the keyboard", "body": "Print keyboard letters that are in the secret word and have been tried in yellow."},
 "slides": [
  {"title": "Escape sequences", "sub": "A backslash means: the next character is special", "bullets": ["\\n new line", "\\t tab", "\\\" a quote inside a String", "\\u001B the escape character"]},
  {"title": "Colour codes", "sub": "Switch on, print, switch back", "bullets": ["GREEN, YELLOW and RESET as constants", "static final: shared, and never changing"],
   "code": [M("fields")]},
  {"title": "A coloured clue", "sub": "", "bullets": ["Green: right letter, right place", "Yellow: in the word, wrong place", "RESET after every coloured letter"],
   "code": [M("clue")]},
  {"title": "Checkpoint: colour", "checkpoint": True,
   "say": "Run it. The right-place letters are green capitals; the wrong-place ones are yellow.",
   "seed": 3,
   "run": """
=======================
     FIVE  LETTERS
=======================
Find the secret word before your guesses run out.
What is your name? [[Sam]]
Good luck, Sam!
Read the rules first? (y/n) [[n]]
Pick a mode - 1 easy, 2 normal, 3 hard: [[2]]
You get 6 guesses at a 5-letter word.
That is up to 30 letters of typing.
q w e r t y u i o p 
a s d f g h j k l 
z x c v b n m 
Guess 1 of 6: [[could]]
<<C>>((o))((u))((l))<<D>>
q w e r t y u i o p 
a s d f g h j k l 
z x c v b n m 
Guess 2 of 6: [[cloud]]
<<C>><<L>><<O>><<U>><<D>>
<<C>>((o))((u))((l))<<D>>
<<C>><<L>><<O>><<U>><<D>>
-----
-----
-----
-----
You found it in 2!
Brilliant!
Fewest guesses so far: 2
Play again? (y/n) [[n]]
Thanks for playing, Sam!
You played 1 and won 1.
That is 100.0% of your games.
"""},
 ],
},

# --------------------------------------------------------------- week 14 ----
{
 "n": 14,
 "title": "A list that grows",
 "big_idea": "An array's size is fixed; an ArrayList grows and shrinks. Today the game remembers which words it has already used, so you do not get the same word twice until every word has had a turn.",
 "new_concepts": ["ArrayList", "<String> (a type parameter)", "add", "contains", "size", "clear", "array vs ArrayList"],
 "objectives": [
   "Make an ArrayList of Strings and add to it",
   "Use contains, size and clear",
   "Say when to use an array and when to use an ArrayList",
 ],
 "ops": OPS[14],
 "flow": [
  TALK("0:00", "Didn't we just have that?",
       "Play five quick rounds. With twelve words, the same one comes up again surprisingly often.",
       ask=("How could the game avoid picking a word it has already used?",
            "Remember the used words and pick again if the new one is on the list. The list starts empty and grows - an array cannot do that.")),
  TALK("0:04", "ArrayList",
       "An <code>ArrayList</code> is a list that grows. <code>ArrayList&lt;String&gt;</code> means a list of Strings - the type goes in angle brackets. It has methods instead of square brackets: <code>add</code>, <code>get(index)</code>, <code>size()</code>, <code>contains</code>, <code>remove</code>, <code>clear</code>.",
       "Array: <code>words.length</code>, <code>words[0]</code>. ArrayList: <code>usedWords.size()</code>, <code>usedWords.get(0)</code>. Same idea, different spelling.",
       ask=("Why not use an ArrayList for everything?",
            "An array is simpler and fixed when the size really is fixed - like the word list or the board. Use a list when the size changes.")),
  STEP(MAIN, "imports", "Import ArrayList", at="0:10", notes=[
       "One more import, at the top of the list.",
  ]),
  STEP(MAIN, "words", "A list of used words", notes=[
       "Below the Random line. It starts empty; the <code>&lt;&gt;</code> on the right copies the type from the left.",
  ]),
  STEP(MAIN, "pick", "Pick an unused word", at="0:15", notes=[
       "Below the pick. While the word has been used, pick again. Then add it to the list. When every word has been used, empty the list so the next round can use any word again.",
  ], ask=("What would happen without the clear?",
          "After twelve rounds every word is used and the while loop never ends. The clear is what stops the thirteenth round hanging.")),
  TALK("0:25", "Play it",
       "Run and play several rounds. No repeats. While testing, print <code>usedWords</code> after the pick - an ArrayList prints as [apple, night].",
       ask=("How could you prove the clear works without playing twelve rounds?",
            "Make the word list three words long for a moment. Good testers make the rare case happen on purpose.")),
  TALK("0:33", "Looping over a list",
       "The for-each loop works on lists too: <code>for (String word : usedWords)</code>. And the index loop: <code>for (int index = 0; index &lt; usedWords.size(); index++)</code> with <code>usedWords.get(index)</code>.",
       "Show <code>remove</code>: <code>usedWords.remove(\"apple\")</code> takes one out and everything after it moves down one."),
  TALK("0:42", "StringBuilder, in passing",
       "The original course built its clue with a <code>StringBuilder</code>, a String you can add to without making a new one each time. We used <code>clue = clue + ...</code>, which is fine for five letters. For thousands of additions StringBuilder is faster, and you will meet it in AP.",
       ask=("Our clue is rebuilt five times per guess. Is that worth optimising?",
            "No. Clear code first; speed when it is actually slow.")),
  TALK("0:57", "Homework", "Chapter 14 of the workbook."),
 ],
 "errors": [
  ("cannot find symbol: class ArrayList", "The import java.util.ArrayList; line is missing."),
  ("The game hangs after twelve rounds", "The if that clears usedWords is missing, so no unused word is left."),
  ("unexpected type: required reference, found int", "ArrayList<int> - lists need the object type: ArrayList<Integer>."),
  ("The same word still comes twice in a row", "usedWords.add(secretWord) is missing, so the list stays empty."),
 ],
 "recap": [
   "An ArrayList grows and shrinks. ArrayList<String> is a list of Strings.",
   "add puts an item on the end; get(index) reads one; size() says how many; contains asks if it is there; remove and clear take items out.",
   "An array's size is fixed; use one when that is true. Use an ArrayList when the size changes.",
   "for-each works on lists as well as arrays.",
   "Lists of numbers use Integer, not int: ArrayList<Integer>.",
 ],
 "homework": [
  {"task": "A to-do list", "detail": "Make an ArrayList<String> called tasks. Keep asking for a task until the user types done, adding each one. Then print how many there are and list them with numbers.", "done": "Any number of tasks works - try zero."},
  {"task": "Cross one off", "detail": "After the list is printed, ask which task is finished and remove it by name with tasks.remove. Print the list again.", "done": "It is gone, and the numbering closes up."},
  {"task": "No duplicates", "detail": "Change the to-do list so adding a task that is already on the list prints Already on the list instead of adding it.", "done": "contains stops the duplicate."},
  {"task": "Array or list?", "detail": "For each, write array or ArrayList and one reason: the days of the week; the names of players who joined a game; the twelve months; every guess a player makes in a game with unlimited guesses.", "done": "Array, list, array, list - fixed things in arrays, growing things in lists."},
 ],
 "bonus": {"title": "Words you have seen", "body": "In the goodbye, print every word that came up this session by looping over usedWords."},
 "slides": [
  {"title": "ArrayList", "sub": "A list that grows", "bullets": ["ArrayList<String>: a list of Strings", "add, get, size, contains, remove, clear", "Import it from java.util"],
   "code": [M("imports"), M("words")]},
  {"title": "No repeats", "sub": "", "bullets": ["While it has been used, pick again", "Then add it to the list", "Every word used? Clear the list"],
   "code": [M("pick")]},
  {"title": "Array or ArrayList?", "sub": "", "bullets": ["Fixed size: array - words.length, words[0]", "Growing: ArrayList - size(), get(0)", "Both work with for-each"]},
  {"title": "Checkpoint: no repeats", "checkpoint": True,
   "say": "Run it and play two rounds. However many rounds you play, a word only comes back after all twelve have had a turn.",
   "seed": 8,
   "run": """
=======================
     FIVE  LETTERS
=======================
Find the secret word before your guesses run out.
What is your name? [[Sam]]
Good luck, Sam!
Read the rules first? (y/n) [[n]]
Pick a mode - 1 easy, 2 normal, 3 hard: [[2]]
You get 6 guesses at a 5-letter word.
That is up to 30 letters of typing.
q w e r t y u i o p 
a s d f g h j k l 
z x c v b n m 
Guess 1 of 6: [[flame]]
<<F>><<L>><<A>><<M>><<E>>
<<F>><<L>><<A>><<M>><<E>>
-----
-----
-----
-----
-----
You found it in 1!
Unbelievable!
Fewest guesses so far: 1
Play again? (y/n) [[y]]
q w e r t y u i o p 
a s d f g h j k l 
z x c v b n m 
Guess 1 of 6: [[river]]
<<R>><<I>><<V>><<E>><<R>>
<<R>><<I>><<V>><<E>><<R>>
-----
-----
-----
-----
-----
You found it in 1!
Unbelievable!
Fewest guesses so far: 1
Play again? (y/n) [[n]]
Thanks for playing, Sam!
You played 2 and won 2.
That is 100.0% of your games.
"""},
 ],
},

# --------------------------------------------------------------- week 15 ----
{
 "n": 15,
 "title": "Your scoreboard",
 "big_idea": "Everything comes together: an array of counters, a loop inside a loop, and printf. Today the game ends with a chart of how many guesses your wins took - and then you look back at the whole program you wrote.",
 "new_concepts": ["an array of counters", "array[index]++", "a bar chart from nested loops", "reviewing a whole program"],
 "objectives": [
   "Use an array of counters, one per possible outcome",
   "Draw a bar chart in the console with nested loops",
   "Explain any part of the finished game to someone else",
 ],
 "ops": OPS[15],
 "flow": [
  TALK("0:00", "How do you usually win?",
       "Play a few rounds. The goodbye gives a percentage, but not <em>how</em> you win: mostly in three? Always at the last second?",
       ask=("How could the game count wins in 1, in 2, in 3...?",
            "One counter for each number of guesses. Six counters in a row is an array of ints.")),
  STEP(MAIN, "stats", "One counter per guess count", at="0:04", notes=[
       "Below bestScore. <code>new int[maxGuesses]</code> makes one counter per possible number of guesses, all starting at 0. Wins in 1 guess are counted in box 0.",
  ]),
  STEP(MAIN, "tally", "Count the win", at="0:08", notes=[
       "Inside the win block, below gamesWon++. <code>winsByGuesses[guessesUsed - 1]++</code> adds one to the box for this many guesses - the same minus one as the board.",
  ], ask=("Why guessesUsed - 1?",
          "A win in 1 guess goes in box 0. Arrays count from 0, people count from 1 - same as the board in week 7.")),
  STEP(MAIN, "chart", "Draw the chart", at="0:13", notes=[
       "After the goodbye. One row per possible guess count; <code>(row + 1)</code> in brackets so Java adds before it joins.",
       "The inner loop prints one # per win, then the row ends with the number itself.",
  ], ask=("Which loop decides how long each bar is?",
          "The inner one: it runs winsByGuesses[row] times.")),
  TALK("0:22", "Play for the chart",
       "Play three or four rounds, win some, then answer n. Your chart is your record.",
       ask=("Why don't gave-up rounds show on the chart?",
            "Only wins are counted into winsByGuesses. A give-up is counted in gamesPlayed and nowhere else.")),
  TALK("0:30", "Look at what you built",
       "Scroll from the top of Main.java to the bottom, slowly. About 245 lines. Every one of them was typed by the person in your seat.",
       "Point at each part and name the week: the title (1), the numbers (2), the first if (3), the switch (4), the guess loop (5), the clue (6), the array (7), the round loop (8), the methods (9), the keyboard grid (10), printf (11), askYesNo (12), colour (13), the ArrayList (14), the chart (15)."),
  TALK("0:40", "Explain a part",
       "In pairs, each person picks a block of the game they did not find easy and explains it to their partner, line by line, as if the partner had never seen Java.",
       ask=("Which part was hardest to explain?",
            "Whatever they say, that is the part to review before AP. Explaining is the real test of understanding.")),
  TALK("0:50", "What comes next",
       "AP Computer Science builds straight on this: classes of your own (objects), more on ArrayLists and 2D arrays, and recursion. Everything this term - variables, decisions, loops, arrays, methods - is the ground floor.",
       ask=("If you added one feature to Five Letters, what would it be?",
            "Anything goes: a hint command, a two-player mode, a longer word list from a file. That is the start of Level 2.")),
  TALK("0:57", "Homework", "Chapter 15 of the workbook."),
 ],
 "errors": [
  ("ArrayIndexOutOfBoundsException in the tally", "winsByGuesses[guessesUsed] without the - 1."),
  ("cannot find symbol: winsByGuesses in the tally", "The array line was put in the wrong place - it goes with the stats, before the round loop."),
  ("Every bar is empty", "winsByGuesses[guessesUsed - 1]++ is outside the if (won) block, or missing."),
  ("The chart's numbers start at 0", "The row label needs (row + 1), in brackets."),
 ],
 "recap": [
   "An array of counters counts several outcomes at once: counts[outcome]++.",
   "A bar chart is a loop over rows with a loop inside that prints one mark per unit.",
   "Five Letters uses every idea from the course: variables, if, switch, while, for, Strings, arrays, 2D arrays, methods, fields, printf and an ArrayList.",
   "Explaining your code to someone else is the best test of whether you understand it.",
 ],
 "homework": [
  {"task": "Dice chart", "detail": "Roll a die 60 times with random.nextInt(6) + 1, counting each face in int[] counts = new int[6]. Print a bar chart with one # per roll.", "done": "Six bars, and the counts add up to 60."},
  {"task": "Review: scope", "detail": "In your own words: why are gamesPlayed and winsByGuesses made before the round loop, but board and guesses inside it?", "done": "Your answer says what would go wrong each way round."},
  {"task": "Review: find the bug", "detail": "This should print 1 to 5 but never stops: int count = 1; while (count <= 5) { System.out.println(count); } Fix it and explain what was wrong.", "done": "Nothing changed count, so the condition could never become false."},
  {"task": "Your feature", "detail": "Add one small feature of your own to Five Letters - a hint that reveals one letter, a new mode, more words - and write a comment above it saying what it does.", "done": "It compiles, it works, and the rest of the game is unchanged."},
 ],
 "bonus": {"title": "Scale the chart", "body": "If someone wins 30 times, the bar is 30 characters long. Make each # stand for 5 wins when the biggest count is over 20."},
 "slides": [
  {"title": "An array of counters", "sub": "winsByGuesses[guessesUsed - 1]++", "bullets": ["One box per possible guess count", "A win in 1 goes in box 0", "++ on one box of the array"],
   "code": [M("stats"), M("tally")]},
  {"title": "The chart", "sub": "A loop inside a loop", "bullets": ["The outer loop: one row per guess count", "The inner loop: one # per win", "(row + 1) so people see 1 to 6"],
   "code": [M("chart")]},
  {"title": "Checkpoint: the finished game", "checkpoint": True,
   "say": "Run it and play two rounds - win both if you can - then answer n and read your chart.",
   "seed": 4,
   "run": """
=======================
     FIVE  LETTERS
=======================
Find the secret word before your guesses run out.
What is your name? [[Sam]]
Good luck, Sam!
Read the rules first? (y/n) [[n]]
Pick a mode - 1 easy, 2 normal, 3 hard: [[2]]
You get 6 guesses at a 5-letter word.
That is up to 30 letters of typing.
q w e r t y u i o p 
a s d f g h j k l 
z x c v b n m 
Guess 1 of 6: [[could]]
<<C>>((o))((u))((l))<<D>>
q w e r t y u i o p 
a s d f g h j k l 
z x c v b n m 
Guess 2 of 6: [[cloud]]
<<C>><<L>><<O>><<U>><<D>>
<<C>>((o))((u))((l))<<D>>
<<C>><<L>><<O>><<U>><<D>>
-----
-----
-----
-----
You found it in 2!
Brilliant!
Fewest guesses so far: 2
Play again? (y/n) [[y]]
q w e r t y u i o p 
a s d f g h j k l 
z x c v b n m 
Guess 1 of 6: [[flame]]
<<F>><<L>><<A>><<M>><<E>>
<<F>><<L>><<A>><<M>><<E>>
-----
-----
-----
-----
-----
You found it in 1!
Unbelievable!
Fewest guesses so far: 1
Play again? (y/n) [[n]]
Thanks for playing, Sam!
You played 2 and won 2.
That is 100.0% of your games.
Wins by number of guesses:
1 | # 1
2 | # 1
3 |  0
4 |  0
5 |  0
6 |  0
"""},
  {"title": "What you built", "sub": "Fifteen weeks, one program", "bullets": ["Variables, if and switch", "while and for loops", "Strings, arrays and a 2D grid", "Methods, printf and an ArrayList", "About 245 lines, all yours"]},
 ],
},
]


# ==========================================================================
# EXPANDED SLIDES - one slide per typed line, with an explainer before the
# first line that uses each new Java idea.
# ==========================================================================

EXPANDED_WEEKS = set(range(1, 16))


def line_concepts(filename, line):
    """Concept keys a line uses, in reading order. build.py shows each one's
    slide only the first time it appears in the course, and skips any key that
    has no entry in CONCEPTS."""
    import re
    text = line.strip()
    keys = []
    if text.startswith("//"):
        return ["java:comment"]
    if re.search(r"\bclass\b", text):
        keys.append("java:class")
    if "static void main" in text:
        keys.append("java:main")
    if re.match(r"static (boolean|String|int) \w+\(", text):
        keys.append("java:method")
    if re.match(r"static (final )?\w+ \w+ =", text):
        keys.append("java:staticfield")
    if text.startswith("import "):
        keys.append("java:import")
    if text.endswith(";") and not text.startswith("import"):
        keys.append("java:statement")
    if re.match(r"(final )?(int|String|boolean|double|char)(\[\])* \w+ =", text):
        keys.append("java:variable")
    if text.startswith("final "):
        keys.append("java:final")
    if "System.out.println" in text:
        keys.append("java:println")
    if "System.out.print(" in text:
        keys.append("java:print")
    if "System.out.printf" in text:
        keys.append("java:printf")
    if '"' in text:
        keys.append("java:string")
    if re.search(r"\bint\b", text):
        keys.append("java:int")
    if re.search(r'" \+|\+ "', text):
        keys.append("java:concat")
    if re.search(r"\w \* \w", text):
        keys.append("java:arith")
    if "new Scanner" in text:
        keys.append("java:scanner")
    if "input.nextLine()" in text:
        keys.append("java:nextline")
    if re.search(r"\bboolean\b", text):
        keys.append("java:boolean")
    if ".equals(" in text:
        keys.append("java:equals")
    if text.startswith("} else if"):
        keys.append("java:elseif")
    elif text.startswith("} else"):
        keys.append("java:else")
    elif text.startswith("if ("):
        keys.append("java:if")
    if "input.nextInt()" in text:
        keys.append("java:nextint")
    if text.startswith("switch"):
        keys.append("java:switch")
    if text.startswith("case "):
        keys.append("java:case")
    if text == "break;":
        keys.append("java:break")
    if text == "default:":
        keys.append("java:default")
    if "||" in text:
        keys.append("java:or")
    if "&&" in text:
        keys.append("java:and")
    if re.search(r"!\w", text):
        keys.append("java:not")
    if "ArrayList" not in text and re.search(r" (<|>|<=|>=|==|!=) ", text):
        keys.append("java:compare")
    if text.startswith("while ("):
        keys.append("java:while")
    if "++" in text:
        keys.append("java:increment")
    if text == "continue;":
        keys.append("java:continue")
    if ".trim()" in text:
        keys.append("java:trim")
    if ".toLowerCase()" in text:
        keys.append("java:tolowercase")
    if ".length()" in text:
        keys.append("java:length")
    if re.match(r"for \(int ", text):
        keys.append("java:for")
    if re.match(r"for \(\w+ \w+ : ", text):
        keys.append("java:foreach")
    if re.match(r"char \w+ =", text):
        keys.append("java:char")
    if ".charAt(" in text:
        keys.append("java:charat")
    if ".indexOf(" in text:
        keys.append("java:indexof")
    if "toUpperCase" in text:
        keys.append("java:touppercase")
    if "[][]" in text:
        keys.append("java:2darray")
    elif "[]" in text:
        keys.append("java:array")
    if re.search(r"\w\[[^\]]+\]", text):
        keys.append("java:index")
    if re.search(r"\.length\b(?!\()", text):
        keys.append("java:arraylength")
    if "Random" in text or "random.nextInt" in text:
        keys.append("java:random")
    if text.startswith("return "):
        keys.append("java:return")
    if "toCharArray" in text:
        keys.append("java:tochararray")
    if "isLetter" in text:
        keys.append("java:isletter")
    if re.match(r"\w+ = \w+\(", text) or re.search(r"[(!]\w+\(", text.replace("System.out.", "")):
        if re.search(r"\b(isAllLetters|winMessage|askYesNo)\(", text):
            keys.append("java:call")
    if re.search(r"\bdouble\b", text):
        keys.append("java:double")
    if "(double)" in text:
        keys.append("java:cast")
    if "\\u001B" in text:
        keys.append("java:ansi")
    if "ArrayList" in text:
        keys.append("java:arraylist")
    if re.search(r"usedWords\.(contains|add|size|clear)\(", text):
        keys.append("java:listmethods")
    return keys


CONCEPTS = {
    "java:comment": ("java", "Comments", ["// starts a comment: Java ignores the rest of the line.", "Comments are notes for people - usually you, later."], "// The title screen."),
    "java:class": ("java", "A class", ["All Java code lives inside a class.", "Ours is called Main, so the file must be called Main.java.", "Its { opens here and its } is the last line of the file."], "public class Main {"),
    "java:main": ("java", "The main method", ["Java starts running your program here.", "Copy the line exactly - every word matters.", "Its statements run from top to bottom."], "public static void main(String[] args) {"),
    "java:statement": ("java", "A statement", ["One instruction for the computer.", "It ends with a semicolon ;", "Leave the ; off and Java will not compile the file."], 'System.out.println("Hi");'),
    "java:println": ("java", "println", ["Prints what is in the brackets, then moves to a new line.", "System.out is the console."], 'System.out.println("Hello");'),
    "java:print": ("java", "print", ["Prints, but stays on the same line.", "Handy for a question: the answer is typed right after it."], 'System.out.print("Your guess: ");'),
    "java:string": ("java", "A String", ["Text in double quotes.", "Printed exactly as written, spaces and all."], '"FIVE  LETTERS"'),
    "java:variable": ("java", "A variable", ["A named box that holds a value.", "type  name  =  value;", "Use the name anywhere after this line."], "int maxGuesses = 6;"),
    "java:final": ("java", "final", ["A constant: once set, it can never change.", "Java refuses to compile a line that tries.", "Constants are named in CAPITALS."], "final int WORD_LENGTH = 5;"),
    "java:int": ("java", "int", ["A whole number: 5, 0, -12.", "No decimal point, no quotes."], "int maxGuesses = 6;"),
    "java:concat": ("java", "Joining with +", ["Once either side of + is a String, + joins.", "Java works left to right.", "Brackets make a sum happen first."], '"You get " + maxGuesses + " guesses"'),
    "java:arith": ("java", "Arithmetic", ["+  -  *  /  and  % (the remainder).", "* and / happen before + and -.", "An int divided by an int throws the fraction away."], "WORD_LENGTH * maxGuesses"),
    "java:import": ("java", "import", ["Borrows a class from Java's library.", "Imports go at the very top of the file."], "import java.util.Scanner;"),
    "java:scanner": ("java", "A Scanner", ["Reads what the player types.", "System.in is the keyboard.", "Make one, and use it for every question."], "Scanner input = new Scanner(System.in);"),
    "java:nextline": ("java", "nextLine()", ["Waits for the player to press Enter.", "Gives back everything they typed, as a String."], "String playerName = input.nextLine();"),
    "java:boolean": ("java", "boolean", ["Holds one of two values: true or false.", "Perfect for a yes-or-no fact, like did you win?"], "boolean won = false;"),
    "java:equals": ("java", ".equals", ["Compares two Strings letter by letter.", "Never compare Strings with ==.", "Capitals count: PLANT is not plant."], 'guess.equals(secretWord)'),
    "java:if": ("java", "if", ["Runs its block only when the condition in brackets is true.", "The block is everything between { and }."], "if (guess.equals(secretWord)) {"),
    "java:else": ("java", "else", ["Runs its block only when the if's condition was false.", "Exactly one of the two blocks runs."], "} else {"),
    "java:elseif": ("java", "else if", ["Another condition in the same chain.", "Checked only if everything above it was false.", "The first true condition wins."], "} else if (gaveUp) {"),
    "java:nextint": ("java", "nextInt()", ["Reads a whole number.", "It leaves the Enter key behind - clear it with input.nextLine()."], "int mode = input.nextInt();"),
    "java:switch": ("java", "switch", ["Picks one case by value.", "Neater than a stack of ifs when one value chooses."], "switch (mode) {"),
    "java:case": ("java", "case", ["One possible value, followed by a colon.", "Its lines run when the value matches."], "case 1:"),
    "java:break": ("java", "break", ["Leave the switch (or loop) right now.", "Forget it in a switch and Java falls into the next case."], "break;"),
    "java:default": ("java", "default", ["Runs when no case matched.", "The switch's safety net."], "default:"),
    "java:or": ("java", "|| (or)", ["True if either side is true.", "Only one side has to be."], 'guess.equals("quit") || guess.equals("q")'),
    "java:and": ("java", "&& (and)", ["True only if both sides are true."], "guessesUsed < maxGuesses && !won"),
    "java:not": ("java", "! (not)", ["Flips true and false.", "!won is true while won is false."], "!won"),
    "java:compare": ("java", "Comparing numbers", ["<  >  <=  >=  ==  !=", "Each gives back true or false.", "One = stores a value; == compares."], "guessesUsed < maxGuesses"),
    "java:while": ("java", "while", ["Repeats its block while the condition is true.", "Checks before every pass.", "Something inside must change the condition."], "while (guessesUsed < maxGuesses && !won) {"),
    "java:increment": ("java", "++", ["Adds one to a variable.", "count++ is short for count = count + 1."], "guessesUsed++;"),
    "java:continue": ("java", "continue", ["Skip the rest of this pass of the loop.", "The loop goes straight back to its condition."], "continue;"),
    "java:trim": ("java", "trim()", ["Removes spaces from both ends of a String.", "Gives back a new String - the old one is unchanged."], '"  crane ".trim()  is  "crane"'),
    "java:tolowercase": ("java", "toLowerCase()", ["Makes every letter small.", "So PLANT and plant compare equal."], '"PLANT".toLowerCase()'),
    "java:length": ("java", "length()", ["How many characters a String has.", "Spaces count too."], '"plant".length()  is  5'),
    "java:for": ("java", "for", ["A counting loop: start; keep going while; step.", "The same as a while with a counter, on one line."], "for (int index = 0; index < 5; index++) {"),
    "java:char": ("java", "char", ["A single character, in single quotes: 'p'.", "chars are compared with ==."], "char letter = 'p';"),
    "java:charat": ("java", "charAt(index)", ["The character at a position.", "Positions start at 0.", "The last is at length() - 1."], '"plant".charAt(0)  is  \'p\''),
    "java:indexof": ("java", "indexOf", ["Where a character is in a String.", "-1 means it is not there at all."], '"plant".indexOf(\'a\')  is  2'),
    "java:touppercase": ("java", "Upper case", ["Character.toUpperCase turns one char into a capital.", "Strings have toUpperCase() too."], "Character.toUpperCase('p')"),
    "java:array": ("java", "An array", ["Many values of one type under one name.", "Its size is fixed when it is made.", "String[] means an array of Strings."], 'String[] words = {"apple", "brick"};'),
    "java:index": ("java", "An index", ["Square brackets pick one element.", "Counting starts at 0.", "An index past the end crashes the program."], "words[0]"),
    "java:arraylength": ("java", ".length on an array", ["How many elements an array has.", "No brackets - unlike a String's length()."], "words.length"),
    "java:random": ("java", "Random", ["Makes random numbers.", "nextInt(12) gives 0 to 11 - never 12."], "random.nextInt(words.length)"),
    "java:foreach": ("java", "for-each", ["Visits every element in turn.", "Read it as: for each row in board.", "No index to manage."], "for (String row : board) {"),
    "java:method": ("java", "A method", ["A named piece of code that does one job.", "static  returnType  name(parameters)", "It lives in the class, outside main."], "static boolean isAllLetters(String word) {"),
    "java:return": ("java", "return", ["Hands a value back to whoever called the method.", "Ends the method at once."], "return true;"),
    "java:call": ("java", "Calling your method", ["Write its name and pass the values in brackets.", "What it returns takes the call's place."], "isAllLetters(guess)"),
    "java:tochararray": ("java", "toCharArray()", ["Turns a String into an array of chars.", "Handy with a for-each loop."], '"plant".toCharArray()'),
    "java:isletter": ("java", "Character.isLetter", ["True if a char is a letter.", "False for digits, spaces and symbols."], "Character.isLetter('0')  is  false"),
    "java:2darray": ("java", "A 2D array", ["An array of arrays: a grid.", "grid[row][column] is one element.", "Rows can be different lengths."], "keyboard[0][2]"),
    "java:double": ("java", "double", ["A number with a decimal point.", "Use it when a fraction matters."], "double winRate = 66.7;"),
    "java:cast": ("java", "A cast", ["Changes a value's type for one use.", "(double) before a division keeps the fraction.", "(int) cuts a fraction off - it does not round."], "(double) gamesWon / gamesPlayed"),
    "java:printf": ("java", "printf", ["Prints with a pattern.", "%.1f: a decimal to one place. %d: a whole number. %s: a String.", "%% prints % and %n ends the line."], 'System.out.printf("%.1f%%%n", winRate);'),
    "java:staticfield": ("java", "A static field", ["A variable made in the class, outside every method.", "Every method in the class can use it."], "static Scanner input = new Scanner(System.in);"),
    "java:ansi": ("java", "Colour codes", ["\\u001B is the escape character.", "The console reads escape then [32m as switch to green.", "[0m switches back to normal."], '"\\u001B[32m"'),
    "java:arraylist": ("java", "ArrayList", ["A list that grows and shrinks.", "ArrayList<String> is a list of Strings.", "Import it from java.util."], "ArrayList<String> usedWords = new ArrayList<>();"),
    "java:listmethods": ("java", "List methods", ["add(item) puts it on the end.", "contains(item) is true if it is there.", "size() says how many; clear() empties it."], "usedWords.add(secretWord);"),
}

VISUALS = {
    "java:statement": {"kind": "tiles", "parts": ["System.out.println", '("Hi")', ";"],
                       "cap": "What to do, what to do it with, and a semicolon to end it."},
    "java:variable": {"kind": "box", "name": "maxGuesses", "value": "6",
                      "cap": "A variable is a labelled box holding one value."},
    "java:final": {"kind": "box", "name": "final WORD_LENGTH", "value": "5",
                   "cap": "final seals the box: its value can never change."},
    "java:concat": {"kind": "glue", "a": '"Good luck, "', "b": "playerName", "out": '"Good luck, Sam"',
                    "cap": "+ glues text together into one String."},
    "java:scanner": {"kind": "network", "from": "keyboard", "to": "program",
                     "cap": "A Scanner carries what the player types into the program."},
    "java:nextline": {"kind": "machine", "in": "Sam + Enter", "label": "nextLine()", "out": '"Sam"',
                      "cap": "nextLine waits for Enter and gives back the typed text."},
    "java:boolean": {"kind": "swap", "off": "false", "on": "true",
                     "cap": "A boolean is a switch with two positions."},
    "java:if": {"kind": "fork", "cond": "guess.equals(secretWord)", "yes": "won = true", "no": "skip",
                "cap": "The block runs only on the true branch."},
    "java:else": {"kind": "fork", "cond": "won", "yes": "You found it!", "no": "Not this time",
                  "cap": "if / else: exactly one of the two blocks runs."},
    "java:switch": {"kind": "pick", "items": ["case 1", "case 2", "case 3"], "at": 1, "label": "mode = 2",
                    "cap": "switch jumps straight to the case that matches."},
    "java:while": {"kind": "loop", "items": ["guess 1", "guess 2", "guess 3"],
                   "cap": "Round and round while the condition stays true."},
    "java:for": {"kind": "loop", "items": ["0", "1", "2", "3", "4"],
                 "cap": "index visits 0, 1, 2, 3, 4 - then the loop stops."},
    "java:trim": {"kind": "machine", "in": '"  CRANE "', "label": ".trim()", "out": '"CRANE"',
                  "cap": "trim takes the spaces off both ends."},
    "java:tolowercase": {"kind": "machine", "in": '"CRANE"', "label": ".toLowerCase()", "out": '"crane"',
                         "cap": "Every letter comes out small."},
    "java:charat": {"kind": "pick", "items": ["p", "l", "a", "n", "t"], "at": 0, "label": "charAt(0)",
                    "cap": "charAt(0) picks the FIRST letter - counting starts at zero."},
    "java:indexof": {"kind": "fork", "cond": "indexOf(letter) >= 0", "yes": "in the word", "no": "-1: not there",
                     "cap": "indexOf gives a position, or -1 when the letter is missing."},
    "java:array": {"kind": "loop", "items": ["apple", "brick", "cloud"],
                   "cap": "An array holds many values in a row, in order."},
    "java:index": {"kind": "pick", "items": ["apple", "brick", "cloud"], "at": 0, "label": "words[0]",
                   "cap": "[0] picks the first element."},
    "java:arraylength": {"kind": "tiles", "parts": ["words", ".length", "= 12"],
                         "cap": ".length says how many elements the array has."},
    "java:foreach": {"kind": "loop", "items": ["row 0", "row 1", "row 2", "row 3"],
                     "cap": "Each element in turn, no index needed."},
    "java:method": {"kind": "machine", "in": '"cl0ud"', "label": "isAllLetters", "out": "false",
                    "cap": "A method is a machine: a value goes in, an answer comes out."},
    "java:return": {"kind": "machine", "in": "2", "label": "winMessage", "out": '"Brilliant!"',
                    "cap": "return hands the answer back out of the method."},
    "java:2darray": {"kind": "card", "rows": [("keyboard[0]", "q w e r t y u i o p"), ("keyboard[1]", "a s d f g h j k l"), ("keyboard[2]", "z x c v b n m")],
                     "cap": "Each row of the grid is an array of its own."},
    "java:cast": {"kind": "machine", "in": "1  (int)", "label": "(double)", "out": "1.0",
                  "cap": "A cast changes the type before the division happens."},
    "java:arraylist": {"kind": "arr-add", "items": ["apple", "night"], "end": "right", "incoming": "cloud",
                       "cap": "add puts a new item on the end - the list grows."},
}


# ---- line notes ------------------------------------------------------------
#
# Every typed line in an expanded week gets a slide with one note. Notes are
# written against the line's text, and _notes() lines them up with the block
# as it stands that week, so a note can never land on the wrong line when a
# block is edited. A line with no note fails the build - it prints "" and the
# guard names it - and a note that matches no line fails here, so a stale note
# cannot hide either.

def _block_at(week, block):
    lines = None
    for number in range(1, week + 1):
        for _kind, _filename, block_id, block_lines in OPS[number]:
            if block_id == block:
                lines = block_lines
    return lines


def _notes(week, block, notes):
    """Notes for (week, block), keyed by a line's text without its indent. A
    list gives notes to repeated lines in order. A closing brace is folded
    into its opening line unless it has a note of its own."""
    remaining = {text: list(note) if isinstance(note, list) else [note]
                 for text, note in notes.items()}
    out = []
    for line in _block_at(week, block):
        text = line.strip()
        if text in remaining and remaining[text]:
            out.append(remaining[text].pop(0))
        elif not text or text == "}":
            out.append(None)
        else:
            out.append("")
    unused = [text for text, left in remaining.items() if left]
    if unused:
        raise SystemExit(f"LINE_NOTES week {week} {block}: no line for {unused}")
    return out


NOTES = {
 1: {
  "header": {
    "// Five Letters: find the secret word before your guesses run out.": "A comment at the very top says what the program is. Java skips it.",
    "public class Main {": "Opens the class. Everything else in the file goes inside its braces.",
  },
  "mainopen": {
    "public static void main(String[] args) {": "A blank line, then main. Indent it four spaces - it is inside the class.",
  },
  "mainclose": {"}": "Close main: four spaces, then a brace lined up with the main line."},
  "classclose": {"}": "Close the class: the last line of the file, against the left edge."},
  "title": {
    "// The title screen.": "Inside main, indented eight spaces. A comment says what this part does.",
    'System.out.println("=======================");': ["The top border. Everything in the quotes prints exactly.", "The bottom border - the same line again."],
    'System.out.println("     FIVE  LETTERS");': "The name. The spaces in front centre it under the border.",
    'System.out.print("Find the secret word ");': "print, not println: the next text lands on this same line. Note the space before the quote.",
    'System.out.println("before your guesses run out.");': "println finishes the sentence and moves to a new line.",
  },
 },
 2: {
  "numbers": {
    "// The numbers the whole game is built on.": "Just below the title. A comment for the numbers.",
    "final int WORD_LENGTH = 5;": "A constant: the word is always 5 letters. final means it can never change.",
    "int maxGuesses = 6;": "How many guesses you get. Not final - week 4 changes it.",
  },
  "summary": {
    "int lettersToType = WORD_LENGTH * maxGuesses;": "A new number worked out from the other two. * multiplies.",
    'System.out.println("You get " + maxGuesses + " guesses at a " + WORD_LENGTH + "-letter word.");': "+ joins text and numbers into one line. Watch the spaces inside the quotes.",
    'System.out.println("That is up to " + lettersToType + " letters of typing.");': "The worked-out number, joined into a sentence.",
  },
 },
 3: {
  "imports": {"import java.util.Scanner;": "The very first line of the file, above the comment. It lets you use Scanner."},
  "name": {
    "Scanner input = new Scanner(System.in);": "Below the numbers. A Scanner called input, reading the keyboard.",
    'System.out.print("What is your name? ");': "Ask with print so the answer is typed on the same line.",
    "String playerName = input.nextLine();": "Wait for Enter, then keep what was typed in playerName.",
    'System.out.println("Good luck, " + playerName + "!");': "Use the name straight away.",
  },
  "pick": {'String secretWord = "plant";': "Below the summary. The secret word - always plant, for now."},
  "roundvars": {"boolean won = false;": "Every game starts not won."},
  "read": {
    'System.out.print("Your guess: ");': "Ask for a guess.",
    "String guess = input.nextLine();": "Keep what was typed in guess.",
  },
  "check": {
    "if (guess.equals(secretWord)) {": "If the guess has exactly the same letters as the secret word...",
    "won = true;": "...remember that you won. Indent it: it is inside the if.",
    "}": "Close the if.",
  },
  "result": {
    "if (won) {": "won is already true or false, so it can be the whole condition.",
    'System.out.println("You found it!");': "Printed only when won is true.",
    "} else {": "Otherwise...",
    'System.out.println("Not this time. The word was " + secretWord + ".");': "...say what the word was.",
    "}": "Close the else.",
  },
 },
 4: {
  "mode": {
    'System.out.print("Pick a mode - 1 easy, 2 normal, 3 hard: ");': "Below the name. Ask for a mode.",
    "int mode = input.nextInt();": "nextInt reads a whole number.",
    "input.nextLine();   // nextInt leaves the Enter key behind, so eat it": "Throw away the Enter that nextInt left behind. The comment says why.",
    "switch (mode) {": "Choose by the value of mode.",
    "case 1:": "If mode is 1...",
    "maxGuesses = 8;": "...easy: eight guesses.",
    "break;": ["Done - leave the switch.", "Leave the switch.", "Leave the switch."],
    "case 2:": "If mode is 2...",
    "maxGuesses = 6;": "...normal: six.",
    "case 3:": "If mode is 3...",
    "maxGuesses = 4;": "...hard: four.",
    "default:": "Anything else...",
    'System.out.println("No mode " + mode + " - normal it is.");': "...says so, and keeps the normal six.",
    "}": "Close the switch.",
  },
  "roundvars": {"boolean gaveUp = false;": "A second boolean: nobody has given up yet."},
  "quit": {
    'if (guess.equals("quit") || guess.equals("q")) {': "Below the guess. quit or q - either one.",
    "gaveUp = true;": "Remember that the player gave up.",
    "}": "Close the if.",
  },
  "result": {
    "} else if (gaveUp) {": "A middle case: checked only if they did not win.",
    'System.out.println("You gave up. The word was " + secretWord + ".");': "Show the word to someone who gave up.",
  },
 },
 5: {
  "roundvars": {"int guessesUsed = 0;": "A counter: no guesses used yet."},
  "guessopen": {"while (guessesUsed < maxGuesses && !won) {": "Below the round variables. Keep going while there are guesses left and you have not won."},
  "guessclose": {"}": "Just above if (won): close the loop. Everything between the braces repeats."},
  "quit": {"break;": "Inside the quit check: leave the loop at once."},
  "count": {"guessesUsed++;": "Below the quit check: count this guess. This line lets the loop end."},
  "result": {
    'System.out.println("You found it in " + guessesUsed + "!");': "The win now says how many guesses it took.",
    'System.out.println("Out of guesses. The word was " + secretWord + ".");': "The loss says you ran out.",
  },
 },
 6: {
  "read": {
    'System.out.print("Guess " + (guessesUsed + 1) + " of " + maxGuesses + ": ");': "The prompt counts. The brackets make Java add before it joins.",
    "guess = guess.trim().toLowerCase();": "Below the read: take spaces off the ends and make it all small letters.",
  },
  "length": {
    "if (guess.length() != WORD_LENGTH) {": "Below the quit check. != means is not equal to.",
    'System.out.println("It has to be " + WORD_LENGTH + " letters.");': "Tell the player why.",
    "continue;": "Skip the rest of this pass - the guess does not count.",
    "}": "Close the if.",
  },
  "clue": {
    'String clue = "";': "Below guessesUsed++. The clue starts empty.",
    "for (int index = 0; index < WORD_LENGTH; index++) {": "index goes 0, 1, 2, 3, 4 - one pass per letter.",
    "char letter = guess.charAt(index);": "The guess's letter at this position.",
    "if (letter == secretWord.charAt(index)) {": "Same letter in the same place? chars compare with ==.",
    "clue = clue + Character.toUpperCase(letter);": "Right place: add it as a capital.",
    "} else if (secretWord.indexOf(letter) >= 0) {": "Otherwise, is it anywhere in the word?",
    "clue = clue + letter;": "Wrong place: add it small.",
    "} else {": "Not in the word at all...",
    'clue = clue + "_";': "...add an underscore.",
    "}": [None, "Close the for loop."],
    "System.out.println(clue);": "After the loop, print the whole clue.",
  },
 },
 7: {
  "imports": {"import java.util.Random;": "At the top, above the Scanner import."},
  "words": {
    'String[] words = {"apple", "brick", "cloud", "dream", "flame", "ghost",': "Below the summary. An array of words - it carries on to the next line.",
    '"house", "lemon", "night", "plant", "river", "tiger"};': "The rest of the list, lined up under the first. The ; ends the statement.",
    "Random random = new Random();": "One Random for the whole program.",
  },
  "pick": {"String secretWord = words[random.nextInt(words.length)];": "A random index from 0 to 11, and the word in that box."},
  "roundvars": {
    "String[] board = new String[maxGuesses];": "An empty array with one box per guess.",
    "for (int row = 0; row < board.length; row++) {": "Visit every box by its index...",
    'board[row] = "-----";': "...and fill it with dashes.",
    "}": "Close the loop.",
  },
  "store": {"board[guessesUsed - 1] = clue;": "Below the clue's println. The first guess goes in row 0."},
  "board": {
    "for (String row : board) {": "After the loop's closing brace: for each row in the board...",
    "System.out.println(row);": "...print it.",
    "}": "Close the loop.",
  },
 },
 8: {
  "stats": {
    "int gamesPlayed = 0;": "Below the word list: games played this session.",
    "int gamesWon = 0;": "Games won.",
    "int bestScore = 0;": "Fewest guesses in a win. 0 means no win yet.",
  },
  "roundopen": {
    "boolean keepPlaying = true;": "Just above the pick: we are playing.",
    "while (keepPlaying) {": "Every round happens inside this loop.",
  },
  "roundclose": {"}": "The last line inside main: close the round loop."},
  "tally": {
    "gamesPlayed++;": "Below the result. One more game played.",
    "if (won) {": "And if it was a win...",
    "gamesWon++;": "...one more game won.",
    "if (bestScore == 0 || guessesUsed < bestScore) {": "First win, or fewer guesses than the best?",
    "bestScore = guessesUsed;": "Then this is the new best.",
    "}": [None, "Close the win check."],
    "if (bestScore > 0) {": "Once there is a best...",
    'System.out.println("Fewest guesses so far: " + bestScore);': "...show it.",
  },
  "again": {
    'System.out.print("Play again? (y/n) ");': "Ask.",
    "String answer = input.nextLine().trim().toLowerCase();": "Read and tidy the answer in one line.",
    'keepPlaying = answer.equals("y") || answer.equals("yes");': "Only y or yes keeps the loop going.",
  },
  "roundvars": {"String[] guesses = new String[maxGuesses];": "Below the board's loop: an array for the words guessed."},
  "repeat": {
    "boolean alreadyTried = false;": "Below the length check. A flag: not found yet.",
    "for (int row = 0; row < guessesUsed; row++) {": "Look at every guess made so far.",
    "if (guesses[row].equals(guess)) {": "Is this one the same as the new guess?",
    "alreadyTried = true;": "Raise the flag.",
    "}": [None, "Close the search loop."],
    "if (alreadyTried) {": "After the search: if the flag is up...",
    'System.out.println("You already tried " + guess + ".");': "...say so...",
    "continue;": "...and go round again without counting it.",
  },
  "store": {"guesses[guessesUsed - 1] = guess;": "Keep the word next to its clue."},
 },
 9: {
  "isallletters": {
    "// True only when every character in the word is a letter.": "Below main's closing brace. A comment says what the method answers.",
    "static boolean isAllLetters(String word) {": "A method: takes a String called word, gives back a boolean.",
    "for (char character : word.toCharArray()) {": "Every character in the word.",
    "if (!Character.isLetter(character)) {": "Not a letter?",
    "return false;": "Then the answer is false - and the method ends here.",
    "}": [None, "Close the loop.", "Close the method."],
    "return true;": "Only reached if every character was a letter.",
  },
  "letters": {
    "if (!isAllLetters(guess)) {": "Below the length check. Call your method with the guess.",
    'System.out.println("Letters only, please.");': "Tell the player.",
    "continue;": "Go round again without counting it.",
    "}": "Close the if.",
  },
  "winmessage": {
    "// A message for how quickly the word was found.": "Below isAllLetters.",
    "static String winMessage(int guessesUsed) {": "Takes a number, gives back a String.",
    "switch (guessesUsed) {": "Choose by the number of guesses.",
    "case 1:": "One guess...",
    'return "Unbelievable!";': "...return straight away - no break needed.",
    "case 2:": "Two...",
    'return "Brilliant!";': "Return a message.",
    "case 3:": "Three...",
    'return "Great work!";': "Return a message.",
    "case 4:": "Four...",
    'return "Nice one.";': "Return a message.",
    "default:": "Five or more...",
    'return "Phew - just made it.";': "...the last-second message.",
    "}": ["Close the switch.", "Close the method."],
  },
  "result": {"System.out.println(winMessage(guessesUsed));": "Inside the win block: print whatever winMessage returns."},
 },
 10: {
  "keyboard": {
    "char[][] keyboard = {": "Above boolean keepPlaying. An array of char arrays.",
    '"qwertyuiop".toCharArray(),': "Row 0.",
    '"asdfghjkl".toCharArray(),': "Row 1.",
    '"zxcvbnm".toCharArray()': "Row 2 - no comma after the last one.",
    "};": "Close the grid.",
  },
  "roundvars": {'String triedLetters = "";': "Letters tried this round - none yet."},
  "store": {"triedLetters = triedLetters + guess;": "Add this guess's letters on."},
  "keyprint": {
    "for (int row = 0; row < keyboard.length; row++) {": "The first lines inside the guess loop. Each row...",
    "for (int column = 0; column < keyboard[row].length; column++) {": "...each key along that row.",
    "char key = keyboard[row][column];": "The key at this row and column.",
    "if (triedLetters.indexOf(key) >= 0 && secretWord.indexOf(key) < 0) {": "Tried, and not in the word?",
    'System.out.print(". ");': "Blank it with a dot.",
    "} else {": "Otherwise...",
    'System.out.print(key + " ");': "...print the key.",
    "}": [None, "Close the column loop.", "Close the row loop."],
    "System.out.println();": "End the row.",
  },
 },
 11: {
  "goodbye": {
    "double winRate = (double) gamesWon / gamesPlayed * 100;": "After the round loop. Cast first so the fraction survives.",
    'System.out.println("Thanks for playing, " + playerName + "!");': "Thank the player by name.",
    'System.out.println("You played " + gamesPlayed + " and won " + gamesWon + ".");': "The record.",
    'System.out.printf("That is %.1f%% of your games.%n", winRate);': "%.1f prints winRate to one decimal place; %% is a percent sign.",
  },
 },
 12: {
  "fields": {
    "// Out here, outside main, so every method in the class can use it.": "Just under public class Main. Say why it lives here.",
    "static Scanner input = new Scanner(System.in);": "The Scanner, as a field every method can use.",
  },
  "askyesno": {
    "// Asks a yes-or-no question until it gets an answer it understands.": "Below winMessage.",
    "static boolean askYesNo(String question) {": "Takes the question, gives back true or false.",
    "while (true) {": "Loop forever - the returns are the way out.",
    "System.out.print(question);": "Ask whatever question was passed in.",
    "String answer = input.nextLine().trim().toLowerCase();": "Read and tidy the answer.",
    'if (answer.equals("y") || answer.equals("yes")) {': "A yes...",
    "return true;": "...returns true and ends the method.",
    'if (answer.equals("n") || answer.equals("no")) {': "A no...",
    "return false;": "...returns false.",
    'System.out.println("Please answer y or n.");': "Anything else: ask again.",
    "}": [None, None, "Close the loop.", "Close the method."],
  },
  "again": {'keepPlaying = askYesNo("Play again? (y/n) ");': "One line does what three did."},
  "rules": {
    'if (askYesNo("Read the rules first? (y/n) ")) {': "Below the name. The call is the condition.",
    'System.out.println("CAPITAL letter = right letter, right place.");': "The rules, one line each.",
    'System.out.println("small letter   = in the word, wrong place.");': "The spaces line the = signs up.",
    'System.out.println("_              = not in the word at all.");': "The last rule.",
    "}": "Close the if.",
  },
 },
 13: {
  "fields": {
    "// Colour codes. The console reads these as instructions, not as letters.": "Below the Scanner field.",
    'static final String RESET = "\\u001B[0m";': "Back to normal colour.",
    'static final String GREEN = "\\u001B[32m";': "Switch to green.",
    'static final String YELLOW = "\\u001B[33m";': "Switch to yellow.",
  },
  "clue": {
    "clue = clue + GREEN + Character.toUpperCase(letter) + RESET;": "Right place: green, the capital, then back to normal.",
    "clue = clue + YELLOW + letter + RESET;": "Wrong place: yellow, then back to normal.",
  },
 },
 14: {
  "imports": {"import java.util.ArrayList;": "The top line of the file now."},
  "words": {"ArrayList<String> usedWords = new ArrayList<>();": "Below the Random line. An empty list of Strings."},
  "pick": {
    "while (usedWords.contains(secretWord)) {": "Below the pick. Already used?",
    "secretWord = words[random.nextInt(words.length)];": "Pick again - no String in front: the variable exists already.",
    "}": [None, "Close the if."],
    "usedWords.add(secretWord);": "Remember this word.",
    "if (usedWords.size() == words.length) {": "Every word used?",
    "usedWords.clear();": "Empty the list so they can all come back.",
  },
 },
 15: {
  "stats": {"int[] winsByGuesses = new int[maxGuesses];": "Below bestScore. One counter per guess count, all 0."},
  "tally": {"winsByGuesses[guessesUsed - 1]++;": "Below gamesWon++. Add one to this guess count's box."},
  "chart": {
    'System.out.println("Wins by number of guesses:");': "After the goodbye. A heading.",
    "for (int row = 0; row < winsByGuesses.length; row++) {": "One row per guess count.",
    'System.out.print((row + 1) + " | ");': "The label, counted from 1.",
    "for (int count = 0; count < winsByGuesses[row]; count++) {": "Once per win...",
    'System.out.print("#");': "...one #.",
    "}": [None, "Close the row loop."],
    'System.out.println(" " + winsByGuesses[row]);': "End the bar with the number.",
  },
 },
}

LINE_NOTES = {(week, MAIN, block): _notes(week, block, notes)
              for week, blocks in NOTES.items() for block, notes in blocks.items()}

DELETE_NOTES = {
    (MAIN, "result"): "These two messages change. Take them out; the new versions say how many guesses.",
    (MAIN, "read"): "The prompt changes - take the old one out; the counting one is next.",
    (MAIN, "pick"): "No more plant every time. Take this line out; the random pick replaces it.",
    (MAIN, "name"): "Delete this line. The Scanner is a field now, at the top of the class.",
    (MAIN, "again"): "Delete these three lines. askYesNo does all of this now, and better.",
    (MAIN, "clue"): "These two lines change - take them out; the coloured versions are next.",
}


QUIZZES = {
    (1, MAIN, "title"): [
        {"q": "What is the difference between print and println?",
         "options": ["println moves to a new line after printing; print does not",
                     "print is for numbers, println is for text",
                     "println prints twice", "There is no difference"],
         "answer": 0,
         "why": "That is why the sentence came out on one line even though it was two statements."},
    ],
    (2, MAIN, "summary"): [
        {"q": "What does System.out.println(\"5\" + 5 + 5); print?",
         "options": ["555", "15", "510", "It will not compile"],
         "answer": 0,
         "why": "Java works left to right: \"5\" + 5 is \"55\", then \"555\". Once a String is involved, + joins."},
    ],
    (3, MAIN, "check"): [
        {"q": "Why compare Strings with .equals and not ==?",
         "options": ["== checks for the same object in memory, not the same letters",
                     ".equals is faster", "== only works on booleans", "They always give the same answer"],
         "answer": 0,
         "why": "== can be true or false for two Strings with the same letters. .equals compares the letters."},
    ],
    (4, MAIN, "mode"): [
        {"q": "What happens if case 1 has no break?",
         "options": ["It falls through and runs case 2's lines too",
                     "It will not compile", "Nothing - break is optional", "The program stops"],
         "answer": 0,
         "why": "Without break, Java carries on into the next case. Easy would set 8, then 6."},
    ],
    (5, MAIN, "count"): [
        {"q": "What happens if guessesUsed++ is deleted and the player keeps guessing wrong?",
         "options": ["The loop never ends", "The loop ends after six guesses",
                     "It will not compile", "The game says Out of guesses at once"],
         "answer": 0,
         "why": "Nothing changes the loop's condition, so guessesUsed < maxGuesses stays true forever."},
    ],
    (6, MAIN, "clue"): [
        {"q": "What is \"plant\".charAt(4)?",
         "options": ["'t'", "'n'", "A crash - there is no index 4", "'p'"],
         "answer": 0,
         "why": "Indexes start at 0, so the five letters are at 0 to 4 and index 4 is the last one."},
        {"q": "What does secretWord.indexOf(letter) give when the letter is not in the word?",
         "options": ["-1", "0", "null", "A crash"],
         "answer": 0,
         "why": "-1 means not found. That is why the check is >= 0."},
    ],
    (7, MAIN, "pick"): [
        {"q": "random.nextInt(words.length) with 12 words can give ...",
         "options": ["any whole number from 0 to 11", "any whole number from 1 to 12",
                     "0 to 12", "only even numbers"],
         "answer": 0,
         "why": "nextInt(12) never gives 12 - exactly the valid indexes of a 12-element array."},
    ],
    (8, MAIN, "stats"): [
        {"q": "Why are gamesPlayed and gamesWon made before the round loop?",
         "options": ["So they are not reset to 0 at the start of every round",
                     "Because Java needs all ints at the top", "To make the program faster",
                     "They could go anywhere"],
         "answer": 0,
         "why": "A variable made inside the loop starts fresh every pass. Scores must outlive a round."},
    ],
    (9, MAIN, "isallletters"): [
        {"q": "When does isAllLetters reach return true?",
         "options": ["Only after the loop has checked every character",
                     "After the first letter", "Never", "Whenever the word has five characters"],
         "answer": 0,
         "why": "The first non-letter returns false and ends the method. Getting past the loop means none was found."},
    ],
    (10, MAIN, "keyboard"): [
        {"q": "What is keyboard[1][0]?",
         "options": ["'a'", "'q'", "'w'", "'z'"],
         "answer": 0,
         "why": "Row 1 is asdfghjkl, and column 0 is its first letter."},
    ],
    (11, MAIN, "goodbye"): [
        {"q": "gamesWon is 1 and gamesPlayed is 2. What is gamesWon / gamesPlayed?",
         "options": ["0", "0.5", "1", "50"],
         "answer": 0,
         "why": "An int divided by an int is an int - the .5 is thrown away. That is why the cast comes first."},
    ],
    (12, MAIN, "askyesno"): [
        {"q": "How does askYesNo ever leave its while (true) loop?",
         "options": ["A return ends the whole method, loop and all",
                     "while (true) stops after ten passes", "break is hidden in the println",
                     "It never does"],
         "answer": 0,
         "why": "return leaves the method at once, wherever it is. The loop is infinite on purpose, with two doors."},
    ],
    (13, MAIN, "clue"): [
        {"q": "What happens if the RESET is left off the green letter?",
         "options": ["Everything printed after it stays green", "Nothing changes",
                     "It will not compile", "The letter disappears"],
         "answer": 0,
         "why": "The console keeps the last colour it was told until told otherwise."},
    ],
    (14, MAIN, "pick"): [
        {"q": "Why does the pick clear usedWords when it is full?",
         "options": ["Otherwise the while loop could never find an unused word",
                     "To save memory", "ArrayLists can only hold twelve items", "It does not need to"],
         "answer": 0,
         "why": "With every word used, usedWords.contains(secretWord) is always true, and the loop would never end."},
    ],
    (15, MAIN, "chart"): [
        {"q": "winsByGuesses is {0, 3, 1, 0, 0, 0}. How long is the bar labelled 2?",
         "options": ["3 #s", "1 #", "2 #s", "0"],
         "answer": 0,
         "why": "The label is row + 1, so the bar labelled 2 is row 1 and shows winsByGuesses[1], which is 3 - three wins in two guesses."},
    ],
}
