"""CS701 - AP Computer Science Prep Level 1. The whole course as one data structure.

Adapted from the Java Level 1 teacher guide (JV 401), day by day, on AI101's
structure. The guide's fourteen days are fifteen weeks here: Day 1 is two
(it is two hours of material), Days 2 to 14 are weeks 3 to 15. Every program
the guide has students type is here, in the guide's order, with the guide's
output; the instructor examples are the "board" slides nobody types.

This file and course_ops.py are the only files to edit. course_ops.py holds
the code (it has to compile, so it lives on its own); this file holds
everything said about it. build.py replays the weeks to produce the milestone
code, the teacher guide, the homework book and both slide decks, so none of
them can drift apart.

Each week carries:
  ops          code changes, from course_ops.OPS, replayed in order
  objectives   what a student can do at the end of the hour
  flow         the hour, beat by beat: TALK and STEP (typing)
  errors       (symptom, fix) - what will actually go wrong in the room
  recap        plain-language summary for the homework book
  homework     each with task / detail / done
  slides       one dict per slide
  bonus        optional extension. NOTHING in a later week may depend on it.

Every week is one project holding several programs, one file each. Its line
notes sit right beside it, in NOTES[n][file][block], keyed by a line's text
without its indent (a list gives notes to a text typed more than once, and a
None folds a line into the slide before it, the way a closing brace is).
"""

from course_ops import ADD, BLOCK, OPS, ORDER, SET  # noqa: F401  (ADD/SET for readers)

COURSE_TITLE = "CS701 &middot; AP Computer Science Prep Level 1"
COURSE_BLURB = (
    "Fifteen weeks of Java. You start by printing one line and finish with Wordle, a complete "
    "two-player word game you wrote line by line - and along the way you meet every idea an AP "
    "Computer Science course expects you to walk in with: variables, types, decisions, loops, "
    "strings, arrays, methods, 2D arrays and lists."
)
PROJECT_BLURB = (
    "Every week is one project in the classroom editor with a few short programs in it - a "
    "grade calculator, a guessing game, a palindrome checker, a shopping list, a times table. "
    "The last four weeks build one program together: Wordle, where one player types a secret "
    "word and the other has six guesses, with green and yellow letters as clues."
)

DISCLAIMER = """
<p><strong>Run it in the classroom editor.</strong> Each week is one <em>Java</em> project in the
classroom editor, and each program in it is its own file - <code>HelloWorld.java</code>,
<code>MyName.java</code> and so on. Add a file with the <strong>+</strong> in the file list and
give it exactly the name the lesson says. Press <strong>Run</strong> (or Ctrl+Enter) and the file
that is open runs in the console beside your code. When it asks you something, click the
console, type and press Enter. <strong>Stop</strong> ends a program that will not finish.</p>

<p><strong>On your own computer.</strong> Install a Java Development Kit (version 17 or newer),
save the file under its class name, open a terminal in that folder and type, for example,
<code>java MyName.java</code>. That one command compiles and runs it.</p>

<p><strong>Every week's finished programs are on the week's page.</strong> If you missed a lesson,
copy them and carry on from there - you will not be behind.</p>
"""

TEACHER_PREAMBLE = """
<p><strong>Where students write and run code.</strong> Students keep their work in the classroom
editor at <a href="../classroom/">/classroom/</a>. They sign in with the class student code and
make one <em>Java</em> project per week, named after the week. Each program in the week is its
own file, added with the <strong>+</strong> in the file list, and the file's name must match the
class name inside it - <code>public class MyName</code> lives in <code>MyName.java</code>.</p>
<p><strong>Java runs in the classroom editor.</strong> <strong>Run</strong> compiles the open file
(and any other file in the project it uses) in the browser and runs it in a console the student
types into, so keyboard input works as it would in a terminal. Compile errors come out in
javac's own format, with a plain-English hint under each. Every program in this course has been
run through it, and each checkpoint slide's transcript is what it prints. It covers the Java
this course uses and a good deal more, but not all of Java: enums, records, lambdas and generic
classes a student writes are reported as "can't run here yet", never as mistakes.</p>
<p><strong>Day by day.</strong> The course follows the Java Level 1 guide (JV 401) in order.
Day 1 is split over weeks 1 and 2 - it is two hours of material. Days 2 to 14 are weeks 3 to 15.
Every program the guide has students type is typed here, in the guide's order; the guide's
<em>Instructor Examples</em> are the board slides, shown and talked through but not typed; its
bonus predictions and multiple-choice questions are the quizzes. The guide used Replit, with a
new project per task; here each task is a new file in the week's project, which is why several
programs are named after what they do rather than all being called <code>Main</code>.</p>
<p><strong>Names are whole words, always.</strong> <code>index</code>, <code>otherIndex</code>,
<code>row</code>, <code>column</code>, <code>firstNumber</code> - never <code>i</code>,
<code>j</code>, <code>x</code> or <code>num1</code>, including on the board and in homework. The
guide itself asks for descriptive names in its variables lesson; we hold it to that everywhere.
A <code>Scanner</code> is always called <code>input</code> and a <code>Random</code> is always
called <code>random</code>. When a student's own code uses a one-letter name, ask what it holds
and have them call it that.</p>
<p><strong>Prompts use print, not println,</strong> so the answer is typed on the same line as the
question - the way the console transcripts show it.</p>
<p><strong>Mistakes in the original guide, fixed here.</strong> The grade calculator gave a
letter to a negative mark and its top band stopped at <code>&lt; 100</code>, so 100 was not an
A; the day-of-week check only tested <code>&lt;= 7</code> and let 0 and negative numbers through
(week 4 keeps that bug for one step, on purpose, and fixes it); "payed" is "paid"; the
duplicates exercise started its inner loop at 1 instead of one past the outer index, so every
value "duplicated" itself; a 2D-array answer said <code>[2][3]</code> where the element is at
<code>[2][2]</code>; the Day 9 text set an element to 50 where its screenshot sets it to 10 (we
follow the screenshot); the review's answer for <code>charAt</code> described
<code>indexOf</code>; one loop compared against the wrong variable (<code>i &lt; userGuesses</code>);
Wordle read the secret word before printing the question that asks for it, kept going after a
win because nothing returned, only replayed on a capital <code>P</code>, never cleared its lists
between games, never told the loser the word, named its letters-only check the opposite of what
it returned (and once spelled it <code>sWordHasNonLetters</code>), wrote <code>While</code> with a
capital W, read <code>String answer input.next()</code> with no <code>=</code>, and read
<code>userGuessChar</code> outside the loop that needs it. Its last version named the two halves
of the validation condition as booleans but never worked them out again inside the loop, so one
bad guess made it ask for ever; week 15 updates both after each new guess, and says why. The
code here is the corrected version.</p>
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


def TYPE(filename, title, notes, at=None, ask=None):
    """A STEP in one of this course's programs, which are each a single block."""
    return STEP(filename, BLOCK, title, notes, at=at, ask=ask)


def CODE(*filenames):
    """A slide's code refs: one per op, in typing order."""
    return [(filename, BLOCK) for filename in filenames]


NOTES = {}
DELETE_NOTES = {}


def notes_for(week, filename, notes):
    """Record a week's line notes for one program."""
    NOTES.setdefault(week, {})[filename] = {BLOCK: notes}


# The whole rule once, on the first program; after that the slide heading has
# already said "make a new file", so the note only ties the two names together.
FIRST_CLASS_NOTE = ("Opens the class. Its name must be the file's name without .java - "
                    "HelloWorld lives in HelloWorld.java - and every other line goes "
                    "inside its braces.")
CLASS_NOTE = "Opens the class: {name}, the file's name without .java."
MAIN_NOTE = "The main method: where the program starts. Same line as always - copy it exactly."
SCANNER_IMPORT_NOTE = ("At the very top, above the class: borrow Scanner from Java's "
                       "library so the program can read the keyboard.")
SCANNER_NOTE = "Make the Scanner, called input, that every question in this program reads from."


def class_note(name):
    return CLASS_NOTE.format(name=name)



# ---------------------------------------------------------------- week 1 ----
# Day 1, first hour: Hello World, print and println, comments, variables,
# concatenation, the primitive types.

notes_for(1, "HelloWorld.java", {
    "public class HelloWorld {": FIRST_CLASS_NOTE,
    "public static void main(String[] args) {": "The main method. Java starts running your program here. Nobody memorises this line today - copy it exactly, every word matters.",
    'System.out.println("Hello world!");': "One statement: print what is in the brackets, then move to a new line. The text in double quotes is a string literal, printed exactly as written. It ends with a semicolon, like every statement.",
})
notes_for(1, "MyName.java", {
    "public class MyName {": class_note("MyName"),
    "public static void main(String[] args) {": MAIN_NOTE,
    'System.out.println("My name is Joshua");': "Task 1-1. Put your own name in place of Joshua if you like.",
    'System.out.println("My friend\'s name is Sarah");': "A second println, so it prints on a second line. The apostrophe in friend's is fine inside double quotes.",
    "// Prints my name and my friend's name": "At the very top, above the class: a comment. Two slashes, then anything - Java ignores the rest of the line. It is a note for people.",
    'String myName = "Joshua";': "A variable: a labelled box. String is its type (text), myName its name, = puts the value in.",
    'String friendName = "Sarah";': "A second box. The names are camelCase: small first word, capital on each word after.",
    'System.out.println("My name is " + myName);': "+ joins the text and whatever is in the box. Note the space before the closing quote.",
    'System.out.println("My friend\'s name is " + friendName);': "Same again for your friend. Change a name now and it changes in one place only.",
})
notes_for(1, "Primitives.java", {
    "public class Primitives {": class_note("Primitives"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "int age = 15;": "int: a whole number. No decimal point, no quotes.",
    "double height = 1.75;": "double: a number with a decimal point.",
    "char initial = 'A';": "char: exactly one character, in single quotes.",
    "boolean isStudent = true;": "boolean: true or false, nothing else. Like a light switch.",
    'System.out.println("age is: " + age);': ["Print each one with a label, so you can tell them apart.", "Print it again: same line as before, new value."],
    'System.out.println("height is: " + height);': None,
    'System.out.println("initial is: " + initial);': None,
    'System.out.println("isStudent is: " + isStudent);': None,
    "age = 17;": "No type this time - the box already exists. This puts a new value in it; the 15 is gone.",
})
DELETE_NOTES[(1, "MyName.java", BLOCK)] = ("The two printlns change: the names move into variables. "
                                           "Take these two lines out - the new four are next.")

WEEK_1 = {
 "n": 1,
 "title": "Hello, Java",
 "big_idea": "A Java program is a class with a main method, and main is a list of statements the computer follows from top to bottom. A variable is a labelled box that holds one value of one type.",
 "new_concepts": ["class", "main method", "statement", "println and print", "string literal", "comment", "variable", "concatenation", "int, double, char, boolean"],
 "objectives": [
   "Say what a class and the main method are for, in one sentence each",
   "Print to the console, and predict the difference between print and println",
   "Write a comment and say who it is for",
   "Declare a variable with a type, a name and a value, and choose a good name for it",
   "Join text and variables with +, and predict what \"5\" + 5 prints",
 ],
 "ops": OPS[1],
 "flow": [
  TALK("0:00", "Get everyone into a project",
       "Everyone opens <a href=\"../classroom/\">the classroom editor</a>, signs in with the student code and makes a new <strong>Java</strong> project called <em>Week 1</em>. It opens with a <b>Main.java</b> already in it; leave that alone. Every program today is a new file in this one project: press the <strong>+</strong> in the file list and give it exactly the name on the slide, capitals and all.",
       "Show the three parts of the screen: the file list on the left, the code in the middle, the console where output appears. Walk the room until every screen has a project open."),
  TALK("0:05", "What programming is, and why Java",
       "A program is a list of instructions written in a language the computer understands. Java's trick is that it compiles to <em>bytecode</em>, which any Java Virtual Machine can run - like a universal remote that works on every TV. Write once, run anywhere.",
       ask=("Why would a universal remote be handy for a programmer?",
            "You write the program once and it runs on Windows, Mac, Linux, phones - you never rewrite it for each machine.")),
  TYPE("HelloWorld.java", "Hello world", at="0:09", notes=[
       "Five lines: the class, the main method inside it, one statement inside that, and a closing brace for each. Every <code>{</code> needs its <code>}</code>.",
  ]),
  TALK("0:14", "Run it, then read it",
       "Run it. <em>Hello world!</em> appears in the console. Now name the parts: the <em>class</em> is the blueprint the code lives in; <em>main</em> is where Java starts; the line in the middle is a <em>statement</em>, and statements end with a semicolon.",
       "Java only allows double quotes around text. Single quotes mean something else - you will see that in twenty minutes.",
       ask=("Delete the semicolon and run it. What happens?",
            "It will not compile: ';' expected, with a caret under the spot. Put it back. Reading an error on purpose now means nobody freezes on one later.")),
  TYPE("MyName.java", "Your name and a friend's", at="0:19", notes=[
       "Student Task 1-1: two separate println statements. Give the room three minutes, then show this.",
  ], ask=("Why do the two sentences come out on two lines?",
          "println moves to a new line after printing. That is the ln.")),
  TALK("0:24", "print and println",
       "Show Instructor Example 1A on the board (not typed). <code>print</code> stays on the same line; <code>println</code> moves down after printing. Leave the space off the end of <em>My name is </em> and you get <em>My name isJoshua</em>.",
       ask=("If print never moves down, how does the next line ever start?",
            "Whatever prints next with println ends the line. Or System.out.println() with nothing in the brackets.")),
  TYPE("MyName.java", "A comment", at="0:27", notes=[
       "At the very top of <b>MyName.java</b>, above the class. There is also a <code>/* ... */</code> kind that runs over several lines; we will mostly use <code>//</code>.",
  ]),
  TALK("0:29", "Variables",
       "A variable is a box that stores one piece of information. It has four parts: a <em>type</em> (what can go in), a <em>name</em>, the assignment operator <code>=</code> (read it as <em>gets</em>, not <em>equals</em>) and a <em>value</em>.",
       "A name may use letters, digits, <code>_</code> and <code>$</code>, may not start with a digit and may not contain a space. <code>9Age</code> and <code>my variable</code> are not allowed. We write them in camelCase: <code>myAge</code>.",
       ask=("What would be a good name for a variable that holds a person's age?",
            "age, myAge, studentAge - anything that says what is in the box. Never a single letter: a year from now, nobody knows what a is.")),
  TYPE("MyName.java", "Names in variables", at="0:34", notes=[
       "Student Task 1-2. The two old printlns go; two variables and two new printlns come in. <code>+</code> joins a String and a variable into one piece of text.",
  ], ask=("You move house. Why is one variable better than typing your address in ten printlns?",
          "Change it in one place and all ten messages change. That is Instructor Example 1B, on the board next.")),
  TALK("0:38", "Joining with +",
       "Show the address example (1B), then the four <code>\"5\" + 5</code> lines one at a time and let the room call out each answer before you reveal it. Java works left to right: once either side of <code>+</code> is a String, <code>+</code> joins; while both sides are numbers, it adds.",
       ask=("What does System.out.println(5 + 5 + \"5\") print?",
            "105. 5 + 5 is 10 first, because both are numbers; then 10 joins \"5\".")),
  TYPE("Primitives.java", "Four primitive types", at="0:43", notes=[
       "Four variables of four types - Instructor Example 1C, typed this time. Java has eight primitive types; these are the four you will use most.",
       "Print each one. The value, not the name, is what appears.",
  ]),
  TYPE("Primitives.java", "Change a value", at="0:50", notes=[
       "Just below the last println. A variable's value can change; its type cannot.",
  ], ask=("Now try age = isStudent; and age = height; - what does Java say?",
          "Both refuse to compile. A boolean is never an int, and a double would lose its fraction going into an int (possible lossy conversion). Undo them.")),
  TALK("0:55", "Homework", "The week 1 homework in the workbook: three short programs, each its own file."),
 ],
 "errors": [
  ("';' expected", "A missing semicolon at the end of a statement. The caret points just after where it belongs."),
  ("class MyName is public, should be declared in a file named MyName.java", "The file and the class have different names. Rename the file, or the class - capital letters count."),
  ("reached end of file while parsing", "A missing }. Count the braces: every { needs a }."),
  ("unclosed string literal", "A missing double quote. Text starts and ends with \" on the same line."),
  ("cannot find symbol ... myname", "Capitals count: myName and myname are different names."),
  ("incompatible types: possible lossy conversion from double to int", "A decimal cannot go into an int box. Week 3 shows how to force it."),
 ],
 "recap": [
   "Every Java program lives inside a class, in a file with the class's name.",
   "Java starts running at the main method, and runs its statements from top to bottom. Each statement ends with ;",
   "println prints and moves to a new line; print prints and stays on the same line.",
   "// starts a comment: a note for people that Java ignores.",
   "A variable has a type, a name, = and a value. Its value can change; its type cannot.",
   "int is a whole number, double has a decimal point, char is one character in single quotes, boolean is true or false. String (capital S) is text in double quotes.",
   "+ joins text. Java works left to right: \"5\" + 5 is \"55\", but 5 + 5 + \"5\" is \"105\".",
 ],
 "homework": [
  {"task": "About me", "detail": "New file AboutMe.java. Make four variables: your name (String), your age (int), your height in metres (double) and your first initial (char). Print one sentence for each, joined with +.", "done": "Four sentences, each with the value from its variable."},
  {"task": "Predict the joins", "detail": "Without running it, write down what each prints: \"7\" + 3, 7 + 3, 7 + 3 + \"7\", \"7\" + 3 + 7. Then print all four and check.", "done": "73, 10, 107, 737 - and you can say why for each."},
  {"task": "print then println", "detail": "Use one print and one println to put your name and your favourite food on a single line, with a space between them.", "done": "One line, with a space between the two."},
 ],
 "bonus": {"title": "Your address, once", "body": "Put your school's address in a String variable and print it in three different sentences. Then change the variable once and run again: all three change."},
 "slides": [
  {"title": "Hello world", "sub": "Every Java program starts from this frame", "bullets": ["A class, with a main method inside it", "main runs its statements top to bottom", "Each statement ends with ;"],
   "code": CODE("HelloWorld.java")},
  {"title": "Checkpoint: hello", "checkpoint": True, "file": "HelloWorld.java",
   "say": "Run HelloWorld.java. One line in the console.",
   "run": """
Hello world!
"""},
  {"title": "Your name and a friend's", "sub": "Student Task 1-1", "bullets": ["A new file, MyName.java", "Two println statements", "Each one prints on its own line"],
   "code": CODE("MyName.java")},
  {"board": "print and println (Instructor Example 1A)",
   "lines": ['System.out.print("My name is ");', 'System.out.println("Joshua");', 'System.out.println("My friend\'s name is Sarah");'],
   "output": "My name is Joshua\nMy friend's name is Sarah",
   "note": "print stays on the line, so Joshua lands right after it. Without the space at the end of \"My name is \" you would get My name isJoshua."},
  {"title": "Comments", "sub": "Notes for people", "bullets": ["// starts a comment - Java ignores the rest of the line", "/* ... */ can run over several lines", "Write them for the next person to read the file: usually you"],
   "code": CODE("MyName.java")},
  {"title": "Variables", "sub": "A labelled box that holds one value", "bullets": ["type  name  =  value;", "Names: letters, digits, _ and $, never starting with a digit, no spaces", "camelCase: myName, friendName"],
   "code": CODE("MyName.java")},
  {"title": "Checkpoint: names in variables", "checkpoint": True, "file": "MyName.java",
   "say": "Run MyName.java. The output is the same as before - but now each name lives in one place.",
   "run": """
My name is Joshua
My friend's name is Sarah
"""},
  {"board": "Why variables (Instructor Example 1B)",
   "lines": ['String address = "6824 Station Hill Drive, Brooklyn, NY 11201";', 'System.out.println("Address: " + address);'],
   "output": "Address: 6824 Station Hill Drive, Brooklyn, NY 11201",
   "note": "Print the address in ten places and you type it once. Move house and you change one line."},
  {"board": "Joining text and numbers",
   "lines": ['System.out.println("5" + 5);', 'System.out.println("5" + 5 + 5);', "System.out.println(5 + 5);", 'System.out.println(5 + 5 + "5");'],
   "output": "55\n555\n10\n105",
   "note": "Left to right. Once one side of + is a String, + joins. While both sides are numbers, + adds."},
  {"quiz": [
    {"q": "What does System.out.println(\"3\" + 4 + 5); print?", "options": ["345", "12", "75", "An error"], "answer": 0,
     "why": "Left to right: \"3\" + 4 is the String \"34\", and \"34\" + 5 is \"345\"."},
  ]},
  {"title": "Four primitive types", "sub": "int, double, char, boolean", "bullets": ["int: whole numbers", "double: numbers with a decimal point", "char: one character, in single quotes", "boolean: true or false", "String is not primitive - it has a capital S"],
   "code": CODE("Primitives.java", "Primitives.java")},
  {"board": "A type never changes (Instructor Example 1C)",
   "lines": ["age = isStudent;", "age = height;"],
   "output": "error: incompatible types: boolean cannot be converted to int\nerror: incompatible types: possible lossy conversion from double to int",
   "note": "The value in a box can change; the kind of box cannot. Neither line compiles."},
  {"title": "Checkpoint: four types", "checkpoint": True, "file": "Primitives.java",
   "say": "Run Primitives.java. age prints twice: 15, then 17.",
   "run": """
age is: 15
height is: 1.75
initial is: A
isStudent is: true
age is: 17
"""},
 ],
}


# ---------------------------------------------------------------- week 2 ----
# Day 1, second hour: expressions, arithmetic, integer division and modulus,
# final constants, precedence, compound assignment, ++ and --.

notes_for(2, "HoursInDay.java", {
    "public class HoursInDay {": class_note("HoursInDay"),
    "public static void main(String[] args) {": MAIN_NOTE,
    'System.out.println("There are 24 hours in a day");': "Student Task 1-3a: only a string literal. The 24 is just text here.",
    "int hoursInDay = 24;": "Task 1-3b: the 24 moves into an int variable.",
    'System.out.println("There are " + hoursInDay + " hours in a day");': "Join the text, the variable and more text. Mind the spaces inside the quotes.",
    "int numberOfDays = 7;": "Just below hoursInDay: a second variable for the days.",
    'System.out.println("There are " + hoursInDay * numberOfDays + " hours in " + numberOfDays + " days");': "At the end of main. * multiplies, and it happens before the joining - multiplication comes first.",
})
notes_for(2, "HoursInWeek.java", {
    "public class HoursInWeek {": class_note("HoursInWeek"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "final int HOURS_IN_DAY = 24;": "Student Task 1-4. final seals the box: once set, the value can never change. Constants are written in CAPITALS with underscores.",
    "final int NUMBER_OF_DAYS = 7;": "A second constant.",
    "int totalHours = HOURS_IN_DAY * NUMBER_OF_DAYS;": "A variable can hold the result of an expression. The right side is worked out first, then stored.",
    'System.out.println("There are " + totalHours + " hours in " + NUMBER_OF_DAYS + " days");': "Print the stored result.",
})
notes_for(2, "MysteryNumber.java", {
    "public class MysteryNumber {": class_note("MysteryNumber"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "int mysteryNumber = ((10 * 3) / 5) - 2;": "Before you run it: what will it be? Brackets first, innermost first - 30, then 6, then 4.",
    'System.out.println("Mystery number is " + mysteryNumber);': "Run it and check your prediction.",
})
notes_for(2, "Counter.java", {
    "public class Counter {": class_note("Counter"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "int counter = 0;": "Instructor Example 1D, typed. A counter that starts at 0.",
    "System.out.println(counter);": ["Print it after every change.", None, None, None, None],
    "counter = counter + 1;": "A variable can change its own value: work out counter + 1, then store it back in counter.",
    "counter += 1;": "The same thing, shorter: a compound assignment. There are -=, *=, /= and %= too.",
    "counter++;": "Shorter still: ++ adds exactly one. The increment operator.",
    "counter--;": "And -- takes one away: the decrement operator.",
})

WEEK_2 = {
 "n": 2,
 "title": "Numbers and operators",
 "big_idea": "An expression is worked out to one value, following precedence - brackets first, then * / %, then + -. A final variable is a constant that can never change, and a variable can use its own old value to get a new one.",
 "new_concepts": ["expression", "arithmetic operators", "integer division", "modulus", "final", "precedence", "compound assignment", "++ and --"],
 "objectives": [
   "Use + - * / and % in an expression and predict the result",
   "Explain why 10 / 3 is 3 and 10 % 3 is 1",
   "Make a constant with final and name it in CAPITALS",
   "Work out an expression in precedence order, brackets first",
   "Change a variable with =, +=, ++ and --",
 ],
 "ops": OPS[2],
 "flow": [
  TALK("0:00", "Open week 2",
       "New Java project called <em>Week 2</em>. Quick recall from last week: what are the four parts of a variable?",
       ask=("What are the four parts of int age = 15;?",
            "The type (int), the name (age), the assignment operator (=) and the value (15).")),
  TYPE("HoursInDay.java", "Hours in a day, as text", at="0:03", notes=[
       "Student Task 1-3a: one println with only a string literal.",
  ]),
  TYPE("HoursInDay.java", "Hours in a day, in a variable", at="0:06", notes=[
       "Task 1-3b: the old println goes; a variable and a println that uses it come in.",
  ]),
  TALK("0:09", "Expressions",
       "An <em>expression</em> is anything that works out to a value: <code>hoursInDay * numberOfDays</code> is one. An <em>assignment</em> works out the right-hand side and stores it in the variable on the left.",
       "The arithmetic operators are <code>+ - * /</code> and <code>%</code>. Show the integer division and modulus board: <code>10 / 3</code> is 3, because an int divided by an int throws the fraction away; <code>10 % 3</code> is 1, the remainder.",
       ask=("What is 17 % 5?",
            "2. Five goes into seventeen three times, with two left over.")),
  TYPE("HoursInDay.java", "Hours in a week", at="0:15", notes=[
       "Two places: <code>numberOfDays</code> just below <code>hoursInDay</code>, and a new println at the end of main that multiplies them.",
  ], ask=("Why does hoursInDay * numberOfDays not become \"247\"?",
          "* comes before +. The multiplication happens first, so the joining sees 168.")),
  TALK("0:20", "Constants",
       "Some values never change: there will always be 24 hours in a day. <code>final</code> is a shield around a variable - try to change it and Java refuses to compile. Constants are named in CAPITALS_WITH_UNDERSCORES so they stand out.",
       "Show the final board: <code>PI_VALUE</code> and <code>EARTH_RADIUS</code>, then the error you get assigning to one."),
  TYPE("HoursInWeek.java", "Constants", at="0:24", notes=[
       "Student Task 1-4: two constants, a variable for their product, and a println. Five minutes, then show this.",
  ], ask=("Add HOURS_IN_DAY = 25; under the constants. What does Java say?",
          "cannot assign a value to final variable HOURS_IN_DAY. That is the shield working. Take it out.")),
  TYPE("MysteryNumber.java", "The mystery number", at="0:31", notes=[
       "Everyone writes down a prediction before running it.",
  ]),
  TALK("0:34", "Precedence",
       "Order of operations, like in maths: brackets first, then <code>* / %</code>, then <code>+ -</code>. Operators of the same rank go left to right. Assignment happens last of all, which is why the right-hand side is always finished before anything is stored.",
       ask=("What is 3 + 5 * 3? And (3 + 5) * 3?",
            "18, then 24. The brackets change which operation goes first.")),
  TYPE("Counter.java", "Counting", at="0:39", notes=[
       "Start at 0 and print. Add one the long way, then with <code>+=</code>.",
       "Then with <code>++</code>, and take one away with <code>--</code>. Print after each. Predict the five numbers before running.",
  ]),
  TALK("0:46", "Predict, don't run",
       "The bonus predictions from the guide, as the quiz slides. Everyone answers on paper before you reveal. The tricky one is <code>println(count++)</code>: it prints the old value, then adds one.",
       ask=("int count = 3; count++; then println(count++) - what prints?",
            "4. count is already 4, println(count++) prints 4 and only then makes it 5.")),
  TALK("0:55", "Homework", "The week 2 homework in the workbook."),
 ],
 "errors": [
  ("cannot assign a value to final variable HOURS_IN_DAY", "A constant was changed. That is what final is for - remove the line that changes it."),
  ("The answer is 3, not 3.33", "int / int throws the fraction away. That is integer division, not a bug. Week 3 shows how to keep the fraction."),
  ("There are 247 hours", "The multiplication is inside a String join without being worked out first - check the * is between the two variables, not a + ."),
  ("cannot find symbol ... hoursinday", "Capitals count: hoursInDay, exactly as declared."),
 ],
 "recap": [
   "An expression works out to one value. An assignment stores that value in a variable.",
   "+ - * / % are the arithmetic operators. % is the remainder.",
   "An int divided by an int is an int: 10 / 3 is 3. The fraction is thrown away, not rounded.",
   "final makes a constant that can never change. Constants are named in CAPITALS.",
   "Precedence: brackets, then * / %, then + -, left to right. Assignment is last.",
   "counter = counter + 1, counter += 1 and counter++ all add one. counter-- takes one away.",
 ],
 "homework": [
  {"task": "Seconds in a day", "detail": "New file SecondsInDay.java. Make constants SECONDS_IN_MINUTE, MINUTES_IN_HOUR and HOURS_IN_DAY, multiply them into a variable and print it in a sentence.", "done": "It prints 86400."},
  {"task": "Split the pizza", "detail": "New file Pizza.java. 17 slices, 5 people. Use / to print how many slices each person gets and % to print how many are left over.", "done": "3 each, 2 left over."},
  {"task": "Predict the counter", "detail": "Write down what this prints before running it: int score = 10; score -= 3; System.out.println(score); score *= 2; System.out.println(score); score++; System.out.println(score);", "done": "7, 14, 15."},
 ],
 "bonus": {"title": "Hours in a month", "body": "Add a DAYS_IN_MONTH constant to HoursInWeek.java and print the hours in a 30-day month as well."},
 "slides": [
  {"title": "Hours in a day", "sub": "Student Task 1-3", "bullets": ["First as text", "Then with an int variable", "Then multiplied by the number of days"],
   "code": CODE("HoursInDay.java", "HoursInDay.java")},
  {"board": "Integer division and modulus",
   "lines": ["System.out.println(10 / 3);", "System.out.println(10 % 3);"],
   "output": "3\n1",
   "note": "An int divided by an int is an int: the fraction is thrown away. % gives the remainder: 10 is 3 threes, with 1 left over."},
  {"title": "Arithmetic", "sub": "An expression works out to one value", "bullets": ["+  -  *  /  and  % (the remainder)", "* / % happen before + -", "The whole right side is worked out, then stored"],
   "code": CODE("HoursInDay.java")},
  {"title": "Checkpoint: hours", "checkpoint": True, "file": "HoursInDay.java",
   "say": "Run HoursInDay.java. The second line is worked out, not typed.",
   "run": """
There are 24 hours in a day
There are 168 hours in 7 days
"""},
  {"board": "Constants",
   "lines": ["final double PI_VALUE = 3.14159;", "final double EARTH_RADIUS = 6371.0;", "PI_VALUE = 3;"],
   "output": "error: cannot assign a value to final variable PI_VALUE",
   "note": "final seals the box. The first two lines are fine; the third will not compile."},
  {"title": "final", "sub": "Student Task 1-4", "bullets": ["A constant can never change", "Named in CAPITALS_WITH_UNDERSCORES", "totalHours holds the result of an expression"],
   "code": CODE("HoursInWeek.java")},
  {"title": "Precedence", "sub": "Brackets first, then * / %, then + -", "bullets": ["Innermost brackets first", "Same rank: left to right", "Predict before you run"],
   "code": CODE("MysteryNumber.java")},
  {"title": "Changing a variable", "sub": "Instructor Example 1D", "bullets": ["counter = counter + 1", "counter += 1", "counter++ and counter--"],
   "code": CODE("Counter.java")},
  {"title": "Checkpoint: counting", "checkpoint": True, "file": "Counter.java",
   "say": "Run Counter.java. Did your five predictions match?",
   "run": """
0
1
2
3
2
"""},
  {"quiz": [
    {"q": "int count = 3; count++; System.out.println(count++); What prints?", "options": ["4", "3", "5", "6"], "answer": 0,
     "why": "count++ on its own line makes count 4. println(count++) prints the value first (4) and adds one afterwards."},
    {"q": "What is 10 / 4 * 6 % 10 in Java?", "options": ["2", "5", "15", "0"], "answer": 0,
     "why": "Left to right, all the same rank: 10 / 4 is 2 (integer division), 2 * 6 is 12, 12 % 10 is 2."},
    {"q": "String first = \"abc\"; String second = \"4\"; int number = 5; What does first + second + number print?", "options": ["abc45", "abc9", "abc4 5", "An error"], "answer": 0,
     "why": "Once the left side is a String, every + joins: \"abc\" + \"4\" is \"abc4\", then + 5 is \"abc45\"."},
    {"q": "Which of these is NOT a primitive type?", "options": ["String", "int", "float", "char"], "answer": 0,
     "why": "String is a class - that is why it has a capital S. The eight primitives are byte, short, int, long, float, double, char and boolean."},
    {"q": "Which keyword makes a constant?", "options": ["final", "static", "const", "immutable"], "answer": 0,
     "why": "final. const is reserved in Java but does nothing."},
    {"q": "Which type holds a number with a fractional part?", "options": ["double", "int", "char", "boolean"], "answer": 0,
     "why": "double - a number with a decimal point."},
  ]},
 ],
}


# ---------------------------------------------------------------- week 3 ----
# Day 2: casting, the ranges of the types, boolean expressions, if / else,
# else if, the Scanner, relational operators.

notes_for(3, "Scores.java", {
    "public class Scores {": class_note("Scores"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "double firstScore = 20.30;": "Scores can have a fraction, so they are doubles.",
    "double secondScore = 33.10;": None,
    "double thirdScore = 10.00;": None,
    'System.out.println("firstScore = " + firstScore);': "Print each one. Java prints 20.3, not 20.30 - a double does not remember trailing zeros.",
    'System.out.println("secondScore = " + secondScore);': None,
    'System.out.println("thirdScore = " + thirdScore);': None,
    "double average = (firstScore + secondScore + thirdScore) / 3;": "Brackets first: add all three, then divide. Without them only the third would be divided.",
    'System.out.println("Average score = " + average);': "Print the average. Run it: 21.133333333333336 - correct, but not friendly.",
    'System.out.println("Average score = " + (int) average);': "Student Task 2-2. (int) in front of the variable converts the value to an int just for this print. The fraction is cut off, not rounded; average itself still holds every decimal.",
})
notes_for(3, "LegalAge.java", {
    "import java.util.Scanner;": SCANNER_IMPORT_NOTE,
    "public class LegalAge {": class_note("LegalAge"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "Scanner input = new Scanner(System.in);": SCANNER_NOTE,
    "boolean legalAge = false;": "A boolean that starts false. We only switch it on when we know it is true.",
    'System.out.print("Enter your age: ");': "The question. print, not println, so the answer is typed on the same line.",
    "int userAge = input.nextInt();": "nextInt() waits for the user to type a whole number and press Enter, and gives it back. It goes straight into an int.",
    "if (userAge >= 19) {": "Student Task 2-3. if, then a condition in brackets. The block in braces runs only when the condition is true. >= means greater than or equal to.",
    "legalAge = true;": "Switch the boolean on. One = stores; it does not compare.",
    'System.out.println("The user is of legal age");': None,
    "} else {": "else: runs only when the if's condition was false. Exactly one of the two blocks runs.",
    'System.out.println("The user is a minor");': None,
    "if (legalAge) {": "A boolean is already true or false, so it can be the whole condition. No == true needed.",
    'System.out.println("The user is allowed to vote");': "Only for users of legal age.",
    "} else if (userAge == 18) {": "Student Task 2-4. A third branch between the other two: checked only when the first condition was false. == compares; it is two equals signs.",
    'System.out.println("The user is allowed to apply for a credit card");': None,
    'System.out.println("The user is allowed to vote and apply for a credit card");': "Anyone of legal age can apply for a card too, so this message changes. Only this line - the if around it stays.",
})
notes_for(3, "StudentGrading.java", {
    "import java.util.Scanner;": SCANNER_IMPORT_NOTE,
    "public class StudentGrading {": class_note("StudentGrading"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "Scanner input = new Scanner(System.in);": SCANNER_NOTE,
    'System.out.print("Enter your mark: ");': "Ask for the mark.",
    "int mark = input.nextInt();": "Read it as a whole number.",
    'String grade = "Not a correct mark";': "Start with the answer for a mark that fits no band. If no branch below changes it, this is what prints.",
    "if (mark >= 0 && mark < 25) {": "Student Task 2-5. && means and: both sides must be true. A mark from 0 up to, but not including, 25.",
    'grade = "F";': None,
    "} else if (mark >= 25 && mark < 45) {": "Each band starts exactly where the one before stops, so no mark falls between two bands.",
    'grade = "E";': None,
    "} else if (mark >= 45 && mark < 50) {": None,
    'grade = "D";': None,
    "} else if (mark >= 50 && mark < 60) {": None,
    'grade = "C";': None,
    "} else if (mark >= 60 && mark < 80) {": None,
    'grade = "B";': None,
    "} else if (mark >= 80 && mark <= 100) {": "The top band includes 100: <=, not <.",
    'grade = "A";': None,
    'System.out.println("Your grade is: " + grade);': "After the chain, print whatever grade ended up holding.",
})
notes_for(3, "Registration.java", {
    "import java.util.Scanner;": SCANNER_IMPORT_NOTE,
    "public class Registration {": class_note("Registration"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "Scanner input = new Scanner(System.in);": SCANNER_NOTE,
    'System.out.print("Please enter the student\'s mark (0-100): ");': "Student Task 2-6. The first requirement is the mark.",
    "int mark = input.nextInt();": None,
    "if (mark >= 70) {": "Task 2-7: 70 or more passes the first requirement.",
    'System.out.print("Has the student paid tuition? (Y/N): ");': "Task 2-8: only students with the mark are asked the second question - so it goes inside the if.",
    "String tuitionAnswer = input.next();": "next() reads one word - here Y or N - as a String.",
    "} else {": "Below 70: not eligible, and the tuition question is never asked.",
    'System.out.println("You are not eligible for registration.");': None,
})

WEEK_3 = {
 "n": 3,
 "title": "Casting and decisions",
 "big_idea": "A cast converts a value from one type to another; Java widens by itself but only narrows when you ask. An if statement runs a block only when its condition is true, and else if and else pick exactly one branch of a chain.",
 "new_concepts": ["casting", "widening and narrowing", "long and float", "boolean expression", "if", "else", "else if", "Scanner and nextInt", "relational operators", "&&"],
 "objectives": [
   "Cast a double to an int, and say what happens to the fraction",
   "Say which conversions Java does by itself and which need a cast",
   "Read a number from the keyboard with a Scanner",
   "Write an if / else if / else chain and predict which branch runs",
   "Use == != < > <= >= and say the difference between = and ==",
 ],
 "ops": OPS[3],
 "flow": [
  TALK("0:00", "Review day 1",
       "New Java project called <em>Week 3</em>. Five quick questions, answers from the room: what a variable is, how to make one final, which operator joins Strings, which quotes a String uses, what main is for.",
       ask=("Which quotes make a String, and which make a char?",
            "Double quotes for a String, \"like this\". Single quotes for exactly one char, like 'A'.")),
  TYPE("Scores.java", "Three scores and their average", at="0:04", notes=[
       "Student Task 2-1. Five minutes, then show this. Three doubles, and a println for the first.",
       "Print the other two, then work out the average and print it.",
  ]),
  TALK("0:10", "Casting",
       "Run it: <em>21.133333333333336</em>. Correct, and ugly. <em>Casting</em> converts a value from one type to another.",
       "Show Instructor Example 2A: an int goes into a double by itself. That is a <em>widening</em> conversion - nothing can be lost, so Java does it for you. Then 2B: a double into an int needs <code>(int)</code> in front. That is <em>narrowing</em>: the fraction is lost, so Java makes you say you mean it. boolean is the only primitive that never converts.",
       ask=("What is (int) 9.99?",
            "9. A cast cuts the fraction off; it never rounds.")),
  TYPE("Scores.java", "Cast the average", at="0:15", notes=[
       "Student Task 2-2: three minutes. Only the last println changes.",
  ]),
  TALK("0:18", "Why types have sizes",
       "Every type takes a fixed amount of memory, and that sets its range - like choosing a shoebox or a suitcase. Show the data-type table and Instructor Example 2C: an int stops just past two billion, so three billion needs a <code>long</code> with an <code>L</code> on the end. Decimals are doubles unless you write an <code>F</code> for float. In practice: int for whole numbers, double for decimals.",
       ask=("long anotherLong = 3000000000; will not compile. Why not?",
            "Any whole number written without an L is an int, and three billion is too big for an int. 3000000000L fixes it.")),
  TALK("0:22", "if and else",
       "A <em>boolean expression</em> works out to true or false. An <code>if</code> runs its block once, only when its condition is true. Show Instructor Example 2D with <code>testScore</code> at 90, then at 20, then at 50: with two separate ifs, 50 prints nothing at all.",
       "Add the <code>== 50</code> case, then turn the three ifs into one if / else if / else chain. Statements run top to bottom; a chain is how a program takes a different path depending on a value.",
       ask=("In the if / else if / else chain, can two of the blocks ever run?",
            "No. Java takes the first branch whose condition is true and skips the rest; else only runs if none was.")),
  TYPE("LegalAge.java", "Read an age", at="0:28", notes=[
       "Exercise 2. The keyboard needs a Scanner, and Scanner lives in Java's library, so the file starts with an import.",
       "Read the age into an int. Run it: it waits for you to type.",
  ]),
  TYPE("LegalAge.java", "Legal age", at="0:32", notes=[
       "Student Task 2-3, five minutes. Just below the line that reads the age: an if / else that sets legalAge.",
       "Then a second if that uses it.",
  ]),
  TALK("0:37", "Relational operators",
       "The six comparisons: <code>== != &gt; &lt; &gt;= &lt;=</code>. Each gives true or false. One <code>=</code> stores a value; two compare.",
       ask=("What does Java say to if (userAge = 18)?",
            "incompatible types: int cannot be converted to boolean. One = stores 18; it does not ask a question. It has to be ==.")),
  TYPE("LegalAge.java", "Eighteen", at="0:39", notes=[
       "Student Task 2-4. An else if goes between the if's block and the else.",
       "And the message for legal age mentions the card too.",
  ]),
  TYPE("StudentGrading.java", "The grading system", at="0:43", notes=[
       "Student Task 2-5. Five minutes. Ask for the mark.",
       "One else if per band. Each needs both ends, joined with &amp;&amp;: at least the bottom and less than the top.",
       "Print the grade.",
  ], ask=("What grade does 100 get? And -5?",
          "A, because the top band uses <code>&lt;= 100</code>. -5 fits no band, so grade keeps its first value and prints Not a correct mark.")),
  TYPE("Registration.java", "The registration system", at="0:50", notes=[
       "Student Tasks 2-6 to 2-8. Read the mark.",
       "The tuition question goes inside the if, because only students with the mark need to answer it.",
  ], ask=("An if inside an if is a nested if. When does the inner code run?",
          "Only when both conditions are true - the outer one lets you in, the inner one decides. We finish this next week.")),
  TALK("0:55", "Homework", "The week 3 homework in the workbook. Keep Registration.java: next week starts from it."),
 ],
 "errors": [
  ("incompatible types: possible lossy conversion from double to int", "A double is going into an int. Cast it with (int) if losing the fraction is what you want."),
  ("integer number too large", "A whole number past two billion. Put L on the end and make the variable a long."),
  ("cannot find symbol ... class Scanner", "The import is missing. import java.util.Scanner; goes at the very top of the file."),
  ("InputMismatchException", "The program asked for a whole number and got something else - a word, or 17.5. Run it again and type a whole number."),
  ("incompatible types: int cannot be converted to boolean", "One = inside an if. Comparing takes two: ==."),
  ("'else' without 'if'", "Usually a stray semicolon straight after if (...) or a missing }. The if's block has to end with } right before the else."),
 ],
 "recap": [
   "Casting converts a value to another type. Widening (int to double) happens by itself; narrowing (double to int) needs (int), and cuts the fraction off.",
   "Every type has a range. int goes to about two billion; past that, use a long with an L on the number.",
   "A Scanner reads the keyboard. import java.util.Scanner; goes at the top; nextInt() reads a whole number, next() reads one word.",
   "if runs its block when the condition is true; else runs when it was false.",
   "In an if / else if / else chain, only the first true branch runs.",
   "== != < > <= >= compare and give true or false. = stores; == compares.",
   "&& means and: both sides must be true.",
 ],
 "homework": [
  {"task": "Temperature", "detail": "New file Temperature.java. Ask for a temperature as a whole number. Print Freezing below 0, Cold from 0 to 14, Mild from 15 to 24 and Hot from 25 up.", "done": "Try -3, 0, 14, 15 and 30: each prints the right word, and exactly one word."},
  {"task": "Cast it", "detail": "New file Cast.java. Put 7.89 in a double, cast it into an int and print both. Then put 7 in an int, store it in a double without a cast and print both.", "done": "7.89 and 7, then 7 and 7.0."},
  {"task": "Even or odd", "detail": "New file EvenOrOdd.java. Ask for a whole number and print whether it is even or odd. Hint: what is number % 2 for an even number?", "done": "It gets 4, 7, 0 and -3 right."},
 ],
 "bonus": {"title": "Grade with a plus", "body": "Change StudentGrading.java so a mark of 95 or more prints A+ instead of A. Where in the chain does the new branch have to go?"},
 "slides": [
  {"title": "Three scores", "sub": "Student Task 2-1", "bullets": ["Scores can have a fraction: double", "Brackets make the sum happen before the division", "The answer has sixteen digits"],
   "code": CODE("Scores.java")},
  {"board": "Widening (Instructor Example 2A)",
   "lines": ["int myInt = 9;", "double myDouble = myInt;", 'System.out.println("This is the int: " + myInt);', 'System.out.println("This is the double: " + myDouble);'],
   "output": "This is the int: 9\nThis is the double: 9.0",
   "note": "An int fits in a double with nothing lost, so Java converts it by itself - as if you had written (double) myInt."},
  {"board": "Narrowing (Instructor Example 2B)",
   "lines": ["double toBeConvertedToInt = 9.175;", "int nowIsAnInt = (int) toBeConvertedToInt;", 'System.out.println("This is the double: " + toBeConvertedToInt);', 'System.out.println("This is the int: " + nowIsAnInt);'],
   "output": "This is the double: 9.175\nThis is the int: 9",
   "note": "A double into an int loses the fraction, so Java only does it when you write (int). The .175 is cut off, not rounded."},
  {"title": "Casting", "sub": "Student Task 2-2", "bullets": ["(int) in front converts for this one use", "The fraction is cut off, not rounded", "average itself is unchanged"],
   "code": CODE("Scores.java")},
  {"title": "Checkpoint: the average", "checkpoint": True, "file": "Scores.java",
   "say": "Run Scores.java. The average is a whole number now.",
   "run": """
firstScore = 20.3
secondScore = 33.1
thirdScore = 10.0
Average score = 21
"""},
  {"board": "Ranges (Instructor Example 2C)",
   "lines": ["long myLong = 17;", "long anotherLong = 3000000000L;", "double myDouble = 17;", "float myFloat = 17.5F;"],
   "output": "(no output - these are declarations)",
   "note": "int holds up to 2,147,483,647. Past that, use a long and put L on the number. A decimal is a double unless it ends in F. Most of the time: int and double."},
  {"board": "if / else if / else (Instructor Example 2D)",
   "lines": ["int testScore = 50;", "if (testScore > 50) {", '    System.out.println("You passed! Well done!");', "} else if (testScore == 50) {", '    System.out.println("Maybe you passed, maybe you didn\'t");', "} else {", '    System.out.println("You failed!");', "}"],
   "output": "Maybe you passed, maybe you didn't",
   "note": "Exactly one branch runs: the first whose condition is true. Try 90 and 20 too."},
  {"title": "Reading the keyboard", "sub": "Exercise 2", "bullets": ["import java.util.Scanner; at the very top", "Make one Scanner, called input", "input.nextInt() waits for a whole number"],
   "code": CODE("LegalAge.java")},
  {"title": "Legal age", "sub": "Student Task 2-3", "bullets": ["if (condition) { ... } else { ... }", ">= means at least", "A boolean can be the whole condition"],
   "code": CODE("LegalAge.java")},
  {"title": "Checkpoint: a minor", "checkpoint": True, "file": "LegalAge.java",
   "say": "Run LegalAge.java and type 16. Then run it again with 20.",
   "run": """
Enter your age: [[16]]
The user is a minor
"""},
  {"board": "Relational operators",
   "lines": ["==   equal to", "!=   not equal to", ">    greater than", "<    less than", ">=   greater than or equal to", "<=   less than or equal to"],
   "output": "Each one gives true or false",
   "note": "One = stores a value. Two == compare."},
  {"title": "Eighteen", "sub": "Student Task 2-4", "bullets": ["else if adds a branch in the middle of the chain", "It is checked only if the if was false", "== compares"],
   "code": CODE("LegalAge.java")},
  {"title": "Checkpoint: eighteen", "checkpoint": True, "file": "LegalAge.java",
   "say": "Run LegalAge.java and type 18.",
   "run": """
Enter your age: [[18]]
The user is allowed to apply for a credit card
"""},
  {"title": "The grading system", "sub": "Student Task 2-5", "bullets": ["One branch per band", "&& joins the two ends of a band", "grade starts as the answer for a mark that fits nowhere"],
   "code": CODE("StudentGrading.java")},
  {"title": "Checkpoint: grading", "checkpoint": True, "file": "StudentGrading.java",
   "say": "Run StudentGrading.java and type 87. Then run it again with -5, and with 100.",
   "run": """
Enter your mark: [[87]]
Your grade is: A
"""},
  {"title": "Checkpoint: a mark that fits nowhere", "checkpoint": True, "file": "StudentGrading.java",
   "say": "Run it with -5. No branch matches, so grade keeps its first value.",
   "run": """
Enter your mark: [[-5]]
Your grade is: Not a correct mark
"""},
  {"title": "The registration system", "sub": "Student Tasks 2-6 to 2-8", "bullets": ["First requirement: a mark of 70 or more", "Only then ask about tuition - an if inside an if", "next() reads one word"],
   "code": CODE("Registration.java")},
  {"title": "Checkpoint: registration so far", "checkpoint": True, "file": "Registration.java",
   "say": "Run Registration.java: 75, then Y. It asks both questions and stops - deciding what to do with the answer is next week.",
   "run": """
Please enter the student's mark (0-100): [[75]]
Has the student paid tuition? (Y/N): [[Y]]
"""},
  {"quiz": [
    {"q": "What does (int) 7.9 give?", "options": ["7", "8", "7.9", "An error"], "answer": 0,
     "why": "A cast to int cuts the fraction off. It never rounds."},
    {"q": "Which of these does Java do without a cast?", "options": ["int to double", "double to int", "long to int", "double to float"], "answer": 0,
     "why": "int to double is widening: nothing can be lost. The others are narrowing and need a cast."},
    {"q": "int age = 18; Which branch runs? if (age >= 19) {...} else if (age == 18) {...} else {...}", "options": ["The else if", "The if", "The else", "Both the else if and the else"], "answer": 0,
     "why": "18 >= 19 is false, so Java tries the else if; 18 == 18 is true, so that block runs and the else is skipped."},
    {"q": "What is the difference between = and ==?", "options": ["= stores a value; == compares two values", "They are the same", "== stores; = compares", "= is for ints, == is for Strings"], "answer": 0,
     "why": "One stores, two compare. if (age = 18) does not compile."},
  ]},
 ],
}


# ---------------------------------------------------------------- week 4 ----
# Day 3: ||, &&, !, nested ifs, switch, short-circuit evaluation, precedence,
# De Morgan's law.

notes_for(4, "Registration.java", {
    'if (tuitionAnswer.equals("y") || tuitionAnswer.equals("Y")) {': "Just below the line that reads the answer. Strings are compared with .equals, never ==. || means or: a small y or a capital Y will do.",
    'System.out.println("You may register for the course.");': "Both requirements met.",
    "} else {": ["Anything else means they have not paid.", "Now the else catches everything that is neither Y nor N."],
    'System.out.println("You need to pay tuition first.");': None,
    '} else if (tuitionAnswer.equals("n") || tuitionAnswer.equals("N")) {': "Only this line changes: the else becomes an else if that checks for N. Type p and nothing prints now.",
    'System.out.println("Invalid answer. It should be Y or N.");': "The last branch: an answer that is neither.",
})
notes_for(4, "DayOfWeek.java", {
    "import java.util.Scanner;": SCANNER_IMPORT_NOTE,
    "public class DayOfWeek {": class_note("DayOfWeek"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "Scanner input = new Scanner(System.in);": SCANNER_NOTE,
    'System.out.print("Enter a number (1-7): ");': "Student Task 3-1. Ask for the number of the day.",
    "int dayNumber = input.nextInt();": None,
    'String day = " is not a day of the week";': "The message for a number that is not a day. The leading space is there because the number gets printed in front of it.",
    "if (dayNumber == 1) {": "One branch per day. Seven of them.",
    'day = "Monday";': None,
    "} else if (dayNumber == 2) {": None,
    'day = "Tuesday";': None,
    "} else if (dayNumber == 3) {": None,
    'day = "Wednesday";': None,
    "} else if (dayNumber == 4) {": None,
    'day = "Thursday";': None,
    "} else if (dayNumber == 5) {": None,
    'day = "Friday";': None,
    "} else if (dayNumber == 6) {": None,
    'day = "Saturday";': None,
    "} else if (dayNumber == 7) {": None,
    'day = "Sunday";': "Seven branches to find one name. There is a neater way - after the checkpoint.",
    "if (dayNumber <= 7) {": "A number that is a day gets one sentence, anything else the other. Type it exactly like this - the checkpoint shows why it is wrong.",
    'System.out.println(day + " is day " + dayNumber + " of the week");': None,
    "} else {": None,
    "System.out.println(dayNumber + day);": "The number, then the not-a-day message.",
    "if (dayNumber >= 1 && dayNumber <= 7) {": "The fix: a day needs both ends checked. && means and - both must be true.",
})
notes_for(4, "MonthName.java", {
    "import java.util.Scanner;": SCANNER_IMPORT_NOTE,
    "public class MonthName {": class_note("MonthName"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "Scanner input = new Scanner(System.in);": SCANNER_NOTE,
    'System.out.print("Enter a number (1-12) for the month: ");': "Student Task 3-2: the same job as DayOfWeek, with a switch.",
    "int monthNumber = input.nextInt();": None,
    'String month = "";': "An empty String: two double quotes with nothing between them.",
    "switch (monthNumber) {": "A switch compares one value against many. Java jumps straight to the case that matches.",
    "case 1:": "case, a value and a colon. Its lines run when monthNumber is 1.",
    'month = "January";': None,
    "break;": ["break leaves the switch. Without it Java carries straight on into the next case.", None, None, None, None, None, None, None, None, None, None, None, None],
    "case 2:": None, 'month = "February";': None,
    "case 3:": None, 'month = "March";': None,
    "case 4:": None, 'month = "April";': None,
    "case 5:": None, 'month = "May";': None,
    "case 6:": None, 'month = "June";': None,
    "case 7:": None, 'month = "July";': None,
    "case 8:": None, 'month = "August";': None,
    "case 9:": None, 'month = "September";': None,
    "case 10:": None, 'month = "October";': None,
    "case 11:": None, 'month = "November";': None,
    "case 12:": None, 'month = "December";': None,
    "default:": "default runs when no case matched: the switch's safety net.",
    'month = " is not a month";': None,
    "if (monthNumber >= 1 && monthNumber <= 12) {": "Both ends checked this time, from the start.",
    'System.out.println(month + " is month " + monthNumber);': None,
    "} else {": None,
    "System.out.println(monthNumber + month);": None,
})
notes_for(4, "BetterRegistration.java", {
    "import java.util.Scanner;": SCANNER_IMPORT_NOTE,
    "public class BetterRegistration {": class_note("BetterRegistration"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "Scanner input = new Scanner(System.in);": SCANNER_NOTE,
    'System.out.print("Please enter the student\'s mark (0-100): ");': "The same first question as Registration.java.",
    "int mark = input.nextInt();": None,
    "boolean isValidMark = false;": "A boolean for the first requirement. It starts false, so there is no else to write.",
    "if (mark >= 70 && mark <= 100) {": "Both ends: at least 70 and no more than 100.",
    "isValidMark = true;": None,
    "boolean isTuitionPaid = false;": "The same again for the second requirement.",
    'System.out.print("Has the student paid tuition? (Y/N): ");': "Everyone is asked now - no nesting.",
    "String tuitionAnswer = input.next();": None,
    'if (tuitionAnswer.equals("y") || tuitionAnswer.equals("Y")) {': "y or Y switches it on.",
    "isTuitionPaid = true;": None,
    "if (!isValidMark || !isTuitionPaid) {": "! means not: it flips true and false. Read it aloud: if the mark is not valid, or tuition is not paid.",
    'System.out.println("The student is not allowed to register.");': None,
    "} else {": "Otherwise both requirements are met.",
    'System.out.println("The student may register for the course.");': None,
})

WEEK_4 = {
 "n": 4,
 "title": "And, or, not, and switch",
 "big_idea": "|| is true when either side is, && only when both are, and ! flips a boolean. They let one condition say what used to take nested ifs. A switch picks one case out of many by value.",
 "new_concepts": ["|| (or)", "&& (and)", "! (not)", ".equals", "nested if", "switch, case, break, default", "short-circuit evaluation", "De Morgan's law"],
 "objectives": [
   "Fill in the truth tables for || and &&",
   "Compare Strings with .equals, and accept a small or a capital letter with ||",
   "Find and fix a range check that tests only one end",
   "Write a switch with a default, and say what a missing break does",
   "Replace nested ifs with booleans and !",
 ],
 "ops": OPS[4],
 "flow": [
  TALK("0:00", "Review day 2",
       "New Java project called <em>Week 4</em>, and copy <b>Registration.java</b> across from last week (its finished code is on the week 3 page). Quick review: what casting is, the two kinds, and when an else if runs.",
       ask=("When does an else if's block run?",
            "Only when every condition above it in the chain was false and its own is true.")),
  TALK("0:03", "Or",
       "A boolean holds true or false, and the <em>logical operators</em> combine them: <code>&amp;&amp;</code>, <code>||</code> and <code>!</code>. Start with <em>or</em>, <code>||</code> (Shift and backslash): true when at least one side is true. Show the truth table.",
       ask=("If p is false and q is true, what is p || q?",
            "true. Only one side has to be.")),
  TYPE("Registration.java", "Y or y", at="0:06", notes=[
       "Back in <b>Registration.java</b>, inside the if, just below the line that reads the answer. Strings are compared with .equals.",
  ], ask=("Run it with 80 and then p. What happens?",
          "It says You need to pay tuition first - p is treated like N. That is a bug.")),
  TYPE("Registration.java", "N or n", at="0:11", notes=[
       "The else becomes an else if that checks for N.",
  ]),
  TYPE("Registration.java", "Anything else", at="0:13", notes=[
       "A new else at the end of the inner chain, for any other answer.",
  ], ask=("Count the braces around the tuition answer. Why does this feel hard to read?",
          "An if / else if / else inside another if / else. It works, but nesting gets messy fast - by the end of the lesson there is a flatter way.")),
  TYPE("DayOfWeek.java", "The day of the week", at="0:16", notes=[
       "Student Task 3-1. Ten minutes. Ask for a number.",
       "One branch per day.",
       "Print the answer. Test it with 5 - then with 0.",
  ]),
  TYPE("DayOfWeek.java", "Check both ends", at="0:27", notes=[
       "Only the condition changes.",
  ], ask=("What did 0 print before the fix, and why?",
          "\" is not a day of the week is day 0 of the week\". 0 &lt;= 7 is true, so a non-day went down the day path. A range has two ends and both need checking.")),
  TALK("0:30", "switch",
       "Seven else ifs to pick a name is a lot to read. A <code>switch</code> compares one value with a list of <code>case</code>s and jumps to the one that matches; <code>break</code> leaves the switch; <code>default</code> runs if nothing matched.",
       ask=("What happens if you forget the break at the end of a case?",
            "Java falls through and runs the next case's lines as well, until it reaches a break.")),
  TYPE("MonthName.java", "The name of the month", at="0:33", notes=[
       "Student Task 3-2. Ask for a month number.",
       "The switch. Every case is a value, a colon, what to do, and a break.",
       "Cases 3 and 4.", "Cases 5 and 6.", "Cases 7 and 8.", "Cases 9 and 10.", "Cases 11 and 12.",
       "The default, then print the answer - both ends of the range checked from the start.",
  ]),
  TALK("0:41", "Leaving out break on purpose",
       "Instructor Example 3A: several cases can share one block by leaving out break. Cases 1 to 5 print Weekday, 6 and 7 print Weekend.",
       "Then <code>&amp;&amp;</code>: true only when both sides are. And short-circuiting: in <code>first &amp;&amp; second</code>, if first is false Java never looks at second; in <code>first || second</code>, if first is true it never looks at second. Last, <code>!</code> (Instructor Example 3B) flips a value - without changing the variable.",
       ask=("A student says: our Registration.java could be flatter. How?",
            "Keep a boolean for each requirement and set it from its own if, then check both at the end with one condition. No nesting.")),
  TYPE("BetterRegistration.java", "A better registration system", at="0:45", notes=[
       "The same first question.",
       "A boolean for each requirement, each starting false.",
       "Switch the second on for y or Y, then one flat if at the end decides.",
  ]),
  TALK("0:51", "Precedence and De Morgan",
       "<code>!</code> comes before <code>&amp;&amp;</code>, which comes before <code>||</code>. Show Instructor Example 3C: evaluation is still left to right, and short-circuiting can skip an assignment entirely.",
       "De Morgan's law (3D): <code>!(A &amp;&amp; B)</code> is the same as <code>!A || !B</code>, and <code>!(A || B)</code> is the same as <code>!A &amp;&amp; !B</code>. That is exactly what BetterRegistration's last condition uses: not allowed means not (valid and paid).",
       ask=("Rewrite !isValidMark || !isTuitionPaid with a single !.",
            "<code>!(isValidMark &amp;&amp; isTuitionPaid)</code> - not both requirements met.")),
  TALK("0:56", "Homework", "The week 4 homework in the workbook."),
 ],
 "errors": [
  ("Two answers print for one input", "A break is missing in a switch, and Java fell through into the next case."),
  ("0 is called a day", "A range checks only one end. Check both, with &&."),
  ("bad operand types for binary operator '||'", "Each side of || must be a whole condition: answer.equals(\"y\") || answer.equals(\"Y\"), not answer.equals(\"y\" || \"Y\")."),
  ("A String compared with == says false", "Compare Strings with .equals. == asks whether they are the same object, not the same letters."),
  ("duplicate case label", "Two cases have the same value. Each case in a switch must be different."),
 ],
 "recap": [
   "|| (or) is true when at least one side is true. && (and) is true only when both are. ! (not) flips true and false.",
   "Compare Strings with .equals, never ==.",
   "A range has two ends: check both with &&.",
   "A switch jumps to the case that matches its value. break leaves the switch; without it Java falls into the next case. default runs when nothing matched.",
   "Java stops early: in a && b, a false a means b is never looked at; in a || b, a true a means b is never looked at.",
   "! comes first, then &&, then ||.",
   "De Morgan: !(a && b) is !a || !b, and !(a || b) is !a && !b.",
 ],
 "homework": [
  {"task": "Weekday or weekend", "detail": "New file WeekdayOrWeekend.java. Ask for a day number and use a switch with shared cases (leave out the break on purpose) to print Weekday for 1 to 5, Weekend for 6 and 7, and Not a day otherwise.", "done": "1 to 5, 6, 7 and 9 all print the right word, once."},
  {"task": "Ticket price", "detail": "New file TicketPrice.java. Ask for an age. Children under 12 and seniors 65 and over pay 5; everyone else pays 10. Use one if with || for the cheap ticket.", "done": "8, 12, 64 and 70 give 5, 10, 10 and 5."},
  {"task": "Predict", "detail": "Without running it: boolean isOpen = true; System.out.println(!isOpen); System.out.println(!(!isOpen)); System.out.println(isOpen);", "done": "false, true, true - and isOpen was never changed."},
 ],
 "bonus": {"title": "Registration in one condition", "body": "In BetterRegistration.java, rewrite the final condition with a single ! and brackets, the way De Morgan's law says. Test that 90 / Y and 60 / Y still give the right answers."},
 "slides": [
  {"board": "Or: ||",
   "lines": ["p      q      p || q", "true   true   true", "true   false  true", "false  true   true", "false  false  false"],
   "output": "True when at least one side is true",
   "note": "|| is Shift and backslash."},
  {"title": "Y or y", "sub": "Comparing Strings", "bullets": [".equals compares the letters of two Strings", "|| accepts either answer", "The else catches everything else - too much"],
   "code": CODE("Registration.java")},
  {"title": "Checkpoint: may register", "checkpoint": True, "file": "Registration.java",
   "say": "Run Registration.java: 80, then y.",
   "run": """
Please enter the student's mark (0-100): [[80]]
Has the student paid tuition? (Y/N): [[y]]
You may register for the course.
"""},
  {"title": "Y, N, or neither", "sub": "Fixing the p bug", "bullets": ["The else becomes an else if for N", "A new else catches anything else", "It works, and the nesting is getting hard to read"],
   "code": CODE("Registration.java", "Registration.java")},
  {"title": "Checkpoint: an invalid answer", "checkpoint": True, "file": "Registration.java",
   "say": "Run it with 80, then maybe.",
   "run": """
Please enter the student's mark (0-100): [[80]]
Has the student paid tuition? (Y/N): [[maybe]]
Invalid answer. It should be Y or N.
"""},
  {"title": "The day of the week", "sub": "Student Task 3-1", "bullets": ["One else if per day", "day starts as the not-a-day message", "Test it with a number that is not a day"],
   "code": CODE("DayOfWeek.java")},
  {"title": "Checkpoint: a bug", "checkpoint": True, "file": "DayOfWeek.java",
   "say": "Run DayOfWeek.java and type 0. Read it aloud. What went wrong?",
   "run": """
Enter a number (1-7): [[0]]
 is not a day of the week is day 0 of the week
"""},
  {"title": "Both ends", "sub": "&& means and", "bullets": ["0 <= 7 is true, so 0 looked like a day", "A range has two ends", "dayNumber >= 1 && dayNumber <= 7"],
   "code": CODE("DayOfWeek.java")},
  {"title": "Checkpoint: fixed", "checkpoint": True, "file": "DayOfWeek.java",
   "say": "Run it with 0 again, then with 5.",
   "run": """
Enter a number (1-7): [[0]]
0 is not a day of the week
"""},
  {"title": "Checkpoint: Friday", "checkpoint": True, "file": "DayOfWeek.java",
   "say": "And 5.",
   "run": """
Enter a number (1-7): [[5]]
Friday is day 5 of the week
"""},
  {"title": "The name of the month", "sub": "Student Task 3-2", "bullets": ["switch (value) { case 1: ... break; }", "default: when no case matches", "Twelve cases and a default"],
   "code": CODE("MonthName.java")},
  {"title": "Checkpoint: September", "checkpoint": True, "file": "MonthName.java",
   "say": "Run MonthName.java and type 9. Then 13.",
   "run": """
Enter a number (1-12) for the month: [[9]]
September is month 9
"""},
  {"title": "Checkpoint: not a month", "checkpoint": True, "file": "MonthName.java",
   "say": "13 matches no case, so default runs.",
   "run": """
Enter a number (1-12) for the month: [[13]]
13 is not a month
"""},
  {"board": "Sharing a block (Instructor Example 3A)",
   "lines": ["int day = 5;", "switch (day) {", "    case 1:", "    case 2:", "    case 3:", "    case 4:", "    case 5:", '        System.out.println("Weekday");', "        break;", "    case 6:", "    case 7:", '        System.out.println("Weekend");', "        break;", "    default:", '        System.out.println("Invalid day");', "}"],
   "output": "Weekday",
   "note": "No break after case 1 to 4, so they all fall through to the same println. Leaving out break on purpose is fine; by accident it is a bug."},
  {"board": "And: &&",
   "lines": ["p      q      p && q", "true   true   true", "true   false  false", "false  true   false", "false  false  false"],
   "output": "True only when both sides are true",
   "note": "Short circuit: in first && second, a false first means Java never looks at second. In first || second, a true first means it never looks at second."},
  {"board": "Not: ! (Instructor Example 3B)",
   "lines": ["boolean isTrue = true;", 'System.out.println("The initial value is " + isTrue);', 'System.out.println("the value becomes " + !isTrue);', 'System.out.println("isTrue is still " + isTrue);'],
   "output": "The initial value is true\nthe value becomes false\nisTrue is still true",
   "note": "! gives the opposite value. It does not change the variable - there is no = anywhere."},
  {"title": "A better registration system", "sub": "Booleans instead of nesting", "bullets": ["One boolean per requirement, starting false", "Each set by its own if", "One flat check at the end, with ! and ||"],
   "code": CODE("BetterRegistration.java")},
  {"title": "Checkpoint: not allowed", "checkpoint": True, "file": "BetterRegistration.java",
   "say": "Run BetterRegistration.java: 90, then N. Then try 90 and Y.",
   "run": """
Please enter the student's mark (0-100): [[90]]
Has the student paid tuition? (Y/N): [[N]]
The student is not allowed to register.
"""},
  {"board": "Evaluation order (Instructor Example 3C)",
   "lines": ["boolean first = false, second = false, third = false;", "boolean result = (first = true) || (second = true) && (third = true);", "System.out.println(result);", 'System.out.println(first + ", " + second + ", " + third);'],
   "output": "true\ntrue, false, false",
   "note": "&& binds tighter, but Java still evaluates left to right: first = true makes the || true straight away, so the right side never runs and second and third stay false."},
  {"board": "De Morgan's law (Instructor Example 3D)",
   "lines": ["boolean hasTicket = false, hasId = false;", "if (!(hasTicket && hasId)) {", '    System.out.print("not(A && B) ");', "}", "if (!hasTicket || !hasId) {", '    System.out.println("is the same as not(A) || not(B)");', "}"],
   "output": "not(A && B) is the same as not(A) || not(B)",
   "note": "Also: !(A || B) is the same as !A && !B. Flip each part and swap && for ||."},
  {"quiz": [
    {"q": "boolean isOpen = true; What does System.out.println(!(!isOpen)); print?", "options": ["true", "false", "!true", "An error"], "answer": 0,
     "why": "Two nots cancel out: !isOpen is false, and !false is true."},
    {"q": "boolean isLate = false; boolean isTired = true; boolean result = (isLate && (isTired = false)); What are isLate, isTired and result?", "options": ["false true false", "false false false", "true false true", "false true true"], "answer": 0,
     "why": "isLate is false, so && stops there - the assignment isTired = false never runs. result is false."},
    {"q": "boolean isRaining = false; boolean isCold = true; boolean result = isCold || (isRaining = true); What are isRaining and result?", "options": ["false true", "true true", "false false", "true false"], "answer": 0,
     "why": "isCold is true, so || already knows the answer and skips the right side. isRaining stays false."},
    {"q": "A switch case has no break, and its value matches. What happens?", "options": ["The next case's lines run too", "It will not compile", "Only that case runs", "default runs"], "answer": 0,
     "why": "Without break, Java falls through into the following case until it meets a break or the end of the switch."},
  ]},
 ],
}

# ---------------------------------------------------------------- week 5 (Day 4)

RANDOM_IMPORT_NOTE = ("At the very top, above the class: borrow Random from Java's library, "
                      "the same way Scanner is borrowed.")
RANDOM_NOTE = "Make the Random, called random. Every number this program picks comes from it."

notes_for(5, "MultiplicationTable.java", {
    "import java.util.Scanner;": SCANNER_IMPORT_NOTE,
    "public class MultiplicationTable {": class_note("MultiplicationTable"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "Scanner input = new Scanner(System.in);": SCANNER_NOTE,
    'System.out.print("Enter a whole number (1-10): ");': "Student Task 4-1. Ask which table to print.",
    "int number = input.nextInt();": None,
    "int counter = 1;": "The counter: which line of the table we are on. It starts at 1.",
    "while (counter <= 10) {": "while, a condition in brackets, and a block. The block runs again and again for as long as the condition is true.",
    'System.out.println(number + " x " + counter + " = " + (number * counter));': "One line of the table. The brackets around number * counter make Java multiply before it joins.",
    "counter++;": "++ adds one to the counter. Leave it out and counter is 1 forever - the loop never ends.",
})
notes_for(5, "RandomNumbers.java", {
    "import java.util.Random;": RANDOM_IMPORT_NOTE,
    "public class RandomNumbers {": class_note("RandomNumbers"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "Random random = new Random();": RANDOM_NOTE,
    "int count = 1;": "Student Task 4-2: five numbers, so count from 1 to 5.",
    "while (count <= 5) {": None,
    "int randomNumber = random.nextInt(100);": "nextInt(100) picks a whole number from 0 up to 99 - a hundred possibilities, starting at zero.",
    "System.out.println(randomNumber);": None,
    "count++;": None,
    "int randomNumber = random.nextInt(100) + 1;": "Add one to whatever was picked: 0 to 99 becomes 1 to 100.",
})
notes_for(5, "GuessingGame.java", {
    "import java.util.Random;": RANDOM_IMPORT_NOTE,
    "import java.util.Scanner;": "And Scanner, just below it: this program needs both.",
    "public class GuessingGame {": class_note("GuessingGame"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "Scanner input = new Scanner(System.in);": SCANNER_NOTE,
    "Random random = new Random();": RANDOM_NOTE,
    "int randomNumber = random.nextInt(100) + 1;": "Student Task 4-3. The secret number, from 1 to 100.",
    'System.out.print("Guess a number between 1 and 100: ");': None,
    "int userGuess = input.nextInt();": "The first guess is read before the loop, so the loop has something to check.",
    "while (userGuess != randomNumber) {": "Keep going for as long as the guess is wrong. != means is not equal to.",
    "if (userGuess > randomNumber) {": "A hint: was the guess too big or too small?",
    'System.out.print("Too high, ");': None,
    "} else {": None,
    'System.out.print("Too low, ");': None,
    'System.out.print("guess again: ");': "Either way, ask again on the same line.",
    "userGuess = input.nextInt();": "Read the next guess into the same variable - no int this time, it already exists. Then the loop checks it.",
    'System.out.println("You guessed it!");': "After the loop, so it only runs once the guess is right.",
})
notes_for(5, "NumberSeriesPrinter.java", {
    "import java.util.Scanner;": SCANNER_IMPORT_NOTE,
    "public class NumberSeriesPrinter {": class_note("NumberSeriesPrinter"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "Scanner input = new Scanner(System.in);": SCANNER_NOTE,
    'System.out.println("Number Series Printer!");': "Student Task 4-4. A title first.",
    'System.out.print("Enter a starting number: ");': "Three questions: where to start, where to stop, and how far to jump each time.",
    "int startingNumber = input.nextInt();": None,
    'System.out.print("Enter an ending number: ");': None,
    "int endingNumber = input.nextInt();": None,
    'System.out.print("Enter a step: ");': None,
    "int stepNumber = input.nextInt();": None,
    'System.out.println("The numbers in the series are:");': None,
    "for (int number = startingNumber; number <= endingNumber; number += stepNumber) {": "A for loop: start, condition, update, separated by semicolons. number += stepNumber means number = number + stepNumber.",
    'System.out.print(number + " ");': "print, not println, so the series stays on one line with a space after each number.",
    "System.out.println();": "An empty println ends the line.",
})

WEEK_5 = {
 "n": 5,
 "title": "Loops and random numbers",
 "big_idea": "A while loop repeats its block for as long as its condition is true, so something inside has to change or it never stops. A for loop puts the start, the condition and the update on one line. Random picks the numbers a game needs.",
 "new_concepts": ["while loop", "counter", "++", "infinite loop", "Random", "nextInt", "for loop", "+= and -=", "!="],
 "objectives": [
   "Write a while loop with a counter, and say what happens without the counter++",
   "Pick a random number in a range with nextInt and + 1",
   "Keep asking until the answer is right, with a while loop around the question",
   "Name the three parts of a for loop and count up, down and in steps",
 ],
 "ops": OPS[5],
 "flow": [
  TALK("0:00", "Review day 3",
       "New Java project called <em>Week 5</em>. Quick review of last week: what <code>&amp;&amp;</code>, <code>||</code> and <code>!</code> do, and what a switch's <code>break</code> is for.",
       ask=("A switch case has no break. What happens?",
            "Java falls through and runs the next case's lines as well, until it meets a break.")),
  TALK("0:03", "while",
       "A loop repeats a block. A <code>while</code> loop is an if that goes round again: check the condition, run the block, check again, for as long as the condition is true. Show Instructor Example 4A: a counter that starts at 1, prints, and goes up by one until it passes 5.",
       ask=("If the condition is false the very first time, how many times does the block run?",
            "None. while checks before it runs anything.")),
  TYPE("MultiplicationTable.java", "A times table", at="0:07", notes=[
       "Student Task 4-1. Five minutes. Ask which table.",
       "A counter from 1 to 10, one line of the table each time round.",
  ]),
  TALK("0:13", "Loops that never end, and Random",
       "Show the countdown on the board: nothing inside it changes <code>countdown</code>, so its condition is true forever. That is an <em>infinite loop</em>. In the classroom editor <strong>Stop</strong> ends it.",
       "Games need numbers nobody chose. <code>Random</code> lives in the same library as <code>Scanner</code>, and <code>random.nextInt(100)</code> picks one of a hundred whole numbers, counting from zero.",
       ask=("What range does random.nextInt(20) give?",
            "0 to 19. Twenty numbers, starting at zero.")),
  TYPE("RandomNumbers.java", "Five random numbers", at="0:16", notes=[
       "Student Task 4-2. Two or three minutes.",
       "Print five of them, one per line.",
  ], ask=("Run it a few times. Could it ever print 100? Could it print 0?",
          "Never 100, but 0 is possible: nextInt(100) is 0 to 99.")),
  TYPE("RandomNumbers.java", "One to a hundred", at="0:20", notes=[
       "Only this line changes.",
  ]),
  TYPE("GuessingGame.java", "A guessing game", at="0:22", notes=[
       "Student Task 4-3. Ten minutes. It needs both imports.",
       "Pick the secret, read the first guess, and loop while it is wrong - with a hint each time.",
       "Ask again inside the loop, and congratulate after it.",
  ], ask=("What would happen if userGuess = input.nextInt(); were missing from inside the loop?",
          "The guess would never change, so a wrong first guess would print Too high or Too low forever - an infinite loop.")),
  TALK("0:33", "for",
       "Most loops count, and a counter needs three things: a start, a condition and an update. A <code>for</code> loop puts all three on one line, in that order, separated by semicolons. Show Instructor Example 4B: 0 to 200 counting in tens.",
       ask=("What do you change to count down from 200 to 0 in fives?",
            "Start at 200, keep going while <code>number &gt;= 0</code>, and update with <code>number -= 5</code>.")),
  TYPE("NumberSeriesPrinter.java", "A number series", at="0:40", notes=[
       "Student Task 4-4. Ten minutes. A title, then the first question.",
       "The other two questions: where to stop and how big a step.",
       "The for loop does the rest.",
  ]),
  TALK("0:52", "Homework", "The week 5 homework in the workbook."),
 ],
 "errors": [
  ("The program never stops printing", "An infinite loop: nothing inside the loop changes what the condition checks. Press Stop, then add the counter++ (or the new input)."),
  ("cannot find symbol: class Random", "import java.util.Random; is missing from the very top."),
  ("The loop runs once too few, or once too many", "< and <= differ by exactly one pass. counter <= 10 includes 10; counter < 10 stops at 9."),
  ("Nothing inside the loop runs, or it runs forever", "A semicolon straight after while (...) or for (...) makes the loop's body empty. Delete it."),
  ("The guess is right but it still says guess again", "The new guess must go into the same variable: userGuess = input.nextInt(); with no int in front."),
 ],
 "recap": [
   "while (condition) { ... } runs its block again and again for as long as the condition is true. If it is false the first time, the block never runs.",
   "Something inside the loop must change what the condition checks, or it is an infinite loop.",
   "counter++ adds one; counter-- takes one away. number += 5 means number = number + 5.",
   "random.nextInt(100) gives 0 to 99. Add 1 for 1 to 100.",
   "for (start; condition; update) { ... } keeps a counting loop on one line.",
   "!= means is not equal to.",
 ],
 "homework": [
  {"task": "Countdown", "detail": "New file Countdown.java. Use a while loop to print 10, 9, 8 ... 1, one per line, then Liftoff!", "done": "Ten numbers and Liftoff!, and it stops by itself."},
  {"task": "Even numbers", "detail": "New file EvenNumbers.java. Use a for loop to print the even numbers from 2 to 20 on one line.", "done": "2 4 6 8 10 12 14 16 18 20"},
  {"task": "Two dice", "detail": "New file TwoDice.java. Roll two dice with random.nextInt(6) + 1, print each, and print their total.", "done": "Run it ten times: every die is 1 to 6 and the total is 2 to 12."},
 ],
 "bonus": {"title": "Count the guesses", "body": "In GuessingGame.java, keep a counter that goes up with every guess, and finish with You guessed it in 5 tries! (or however many it took)."},
 "slides": [
  {"board": "while (Instructor Example 4A)",
   "lines": ["int count = 1;", "while (count <= 5) {", "    System.out.println(count);", "    count++;", "}"],
   "output": "1\n2\n3\n4\n5",
   "note": "Check the condition, run the block, check again. When count reaches 6, 6 <= 5 is false and the loop ends."},
  {"title": "A times table", "sub": "Student Task 4-1", "bullets": ["A counter that starts at 1", "while (counter <= 10) repeats the block", "counter++ moves it on each time round"],
   "code": CODE("MultiplicationTable.java")},
  {"title": "Checkpoint: the seven times table", "checkpoint": True, "file": "MultiplicationTable.java",
   "say": "Run MultiplicationTable.java and type 7.",
   "run": """
Enter a whole number (1-10): [[7]]
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35
7 x 6 = 42
7 x 7 = 49
7 x 8 = 56
7 x 9 = 63
7 x 10 = 70
"""},
  {"board": "A loop that never ends",
   "lines": ["int countdown = 5;", "while (countdown >= 0) {", '    System.out.println(countdown + "...");', "}"],
   "output": "5...\n5...\n5...\n(and on, forever)",
   "note": "Nothing inside changes countdown, so countdown >= 0 is true forever. Press Stop. The fix is one line: countdown--; inside the loop."},
  {"board": "Picking a number",
   "lines": ["Random random = new Random();", "random.nextInt(100)        0 to 99", "random.nextInt(100) + 1    1 to 100", "random.nextInt(20)         0 to 19"],
   "output": "nextInt(n) gives one of n numbers, starting at 0",
   "note": "Random needs import java.util.Random; at the top, the way Scanner does."},
  {"title": "Five random numbers", "sub": "Student Task 4-2", "bullets": ["import java.util.Random;", "random.nextInt(100) is 0 to 99", "The loop picks a new one each time round"],
   "code": CODE("RandomNumbers.java")},
  {"title": "One to a hundred", "sub": "Shifting the range", "bullets": ["0 to 99, plus one, is 1 to 100", "Only one line changes"],
   "code": CODE("RandomNumbers.java")},
  {"title": "Checkpoint: five numbers", "checkpoint": True, "file": "RandomNumbers.java", "seed": 42,
   "say": "Run RandomNumbers.java a few times. Your numbers will be different from these, and different every run - that is the point.",
   "run": """
31
64
49
85
71
"""},
  {"title": "A guessing game", "sub": "Student Task 4-3", "bullets": ["Read the first guess before the loop", "while (userGuess != randomNumber) keeps asking", "A hint each time, then read the next guess"],
   "code": CODE("GuessingGame.java")},
  {"title": "Checkpoint: guessed it", "checkpoint": True, "file": "GuessingGame.java", "seed": 42,
   "say": "Play it. Your secret number is different, so your game will be too - halve the gap every time and you never need more than seven guesses.",
   "run": """
Guess a number between 1 and 100: [[50]]
Too high, guess again: [[25]]
Too low, guess again: [[37]]
Too high, guess again: [[31]]
You guessed it!
"""},
  {"board": "for (Instructor Example 4B)",
   "lines": ["for (int number = 0; number <= 200; number += 10) {", '    System.out.print(number + " ");', "}"],
   "output": "0 10 20 30 40 50 60 70 80 90 100 110 120 130 140 150 160 170 180 190 200",
   "note": "Start: int number = 0. Condition: number <= 200. Update: number += 10, done after each pass. Fives: number += 5."},
  {"board": "Counting down",
   "lines": ["for (int number = 200; number >= 0; number -= 5) {", '    System.out.print(number + " ");', "}"],
   "output": "200 195 190 185 ... 10 5 0",
   "note": "All three parts change: start at the top, keep going while it is at least 0, and take 5 away each time."},
  {"title": "A number series", "sub": "Student Task 4-4", "bullets": ["Three questions: start, end and step", "for (start; condition; update)", "print keeps the series on one line"],
   "code": CODE("NumberSeriesPrinter.java")},
  {"title": "Checkpoint: in threes", "checkpoint": True, "file": "NumberSeriesPrinter.java",
   "say": "Run NumberSeriesPrinter.java: 2, 20 and 3. Then try 5, 20 and 5.",
   "run": """
Number Series Printer!
Enter a starting number: [[2]]
Enter an ending number: [[20]]
Enter a step: [[3]]
The numbers in the series are:
2 5 8 11 14 17 20
"""},
  {"quiz": [
    {"q": "int count = 10; while (count < 5) { count++; } How many times does count++ run?", "options": ["0", "5", "10", "Forever"], "answer": 0,
     "why": "10 < 5 is false the very first time, so the block never runs."},
    {"q": "Which numbers can random.nextInt(100) + 1 give?", "options": ["1 to 100", "0 to 100", "0 to 99", "1 to 99"], "answer": 0,
     "why": "nextInt(100) is 0 to 99, and adding 1 shifts that to 1 to 100."},
    {"q": "for (int number = 0; number <= 10; number += 5) { System.out.print(number + \" \"); } What does it print?", "options": ["0 5 10", "0 5", "5 10", "0 5 10 15"], "answer": 0,
     "why": "0, then 5, then 10. The next would be 15, and 15 <= 10 is false."},
    {"q": "What is an infinite loop?", "options": ["A loop whose condition never becomes false", "A loop that runs exactly once", "A loop with no block", "A loop that counts past 100"], "answer": 0,
     "why": "If nothing inside the loop changes what the condition checks, it stays true forever."},
    {"q": "In a for loop, when does the update (number += 5) happen?", "options": ["After each pass through the block", "Once, before the loop starts", "Before each check of the condition only the first time", "Only when the condition is false"], "answer": 0,
     "why": "Start once, then: check, run the block, update - and round again."},
  ]},
 ],
}


# ---------------------------------------------------------------- week 6 (Day 5)

notes_for(6, "StringMethods.java", {
    "public class StringMethods {": class_note("StringMethods"),
    "public static void main(String[] args) {": MAIN_NOTE,
    'String greeting = "Hello, world";': "One String to try every method on.",
    "System.out.println(greeting.length());": "length() is the number of characters, counting the comma and the space.",
    'System.out.println(greeting.indexOf("world"));': "indexOf says where some text starts. Counting starts at 0.",
    "System.out.println(greeting.toUpperCase());": "A copy in capitals. greeting itself does not change.",
    "System.out.println(greeting.toLowerCase());": "And a copy in small letters.",
    "System.out.println(greeting.charAt(0));": "charAt gives the one character at an index. Index 0 is the first.",
    "System.out.println(greeting.substring(7, 12));": "substring cuts out a piece: from index 7 up to, but not including, index 12.",
    "System.out.println(greeting.substring(7));": "With one number it runs from there to the end.",
})
notes_for(6, "Palindrome.java", {
    "import java.util.Scanner;": SCANNER_IMPORT_NOTE,
    "public class Palindrome {": class_note("Palindrome"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "Scanner input = new Scanner(System.in);": SCANNER_NOTE,
    'System.out.print("Enter a word to see if it is a palindrome: ");': "A palindrome reads the same backwards: racecar, radar, level.",
    "String word = input.nextLine();": "nextLine reads everything typed up to Enter.",
    "boolean isPalindrome = true;": "Assume it is, until a pair of letters proves otherwise.",
    "for (int index = 0; index < word.length() / 2; index++) {": "Walk from the front to the middle. Each letter is checked against its partner, so half the word is enough.",
    "char frontLetter = word.charAt(index);": "char holds one character. This one counts from the front.",
    "char backLetter = word.charAt(word.length() - 1 - index);": "Its partner counts from the back. The last index is length - 1, not length.",
    "if (frontLetter != backLetter) {": "One mismatch is enough.",
    "isPalindrome = false;": None,
    "break;": "break leaves the loop straight away - there is no point checking the rest.",
    "if (isPalindrome) {": "After the loop, the boolean holds the answer.",
    'System.out.println("The word " + word + " is a palindrome");': None,
    "} else {": None,
    'System.out.println("The word " + word + " is not a palindrome");': None,
})
notes_for(6, "VowelsAndConsonants.java", {
    "import java.util.Scanner;": SCANNER_IMPORT_NOTE,
    "public class VowelsAndConsonants {": class_note("VowelsAndConsonants"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "Scanner input = new Scanner(System.in);": SCANNER_NOTE,
    'System.out.println("This program counts the vowels and consonants in a word or phrase.");': "Student Task 5-1. Say what the program does.",
    'System.out.print("Enter a word or phrase: ");': None,
    "String phrase = input.nextLine();": "nextLine, so a phrase with spaces is read whole.",
    "int vowelCounter = 0;": "Two counters, both starting at zero.",
    "int consonantCounter = 0;": None,
    "for (int index = 0; index < phrase.length(); index++) {": "Visit every character, from index 0 to the last.",
    "char letter = phrase.charAt(index);": "The character we are looking at this time round.",
    "switch (letter) {": "A switch on a char. The cases are single characters, in single quotes.",
    "case 'a':": "Five cases share one block - no break between them, on purpose.",
    "case 'e':": None,
    "case 'i':": None,
    "case 'o':": None,
    "case 'u':": None,
    "vowelCounter++;": "Any of the five: one more vowel.",
    "break;": None,
    'System.out.println(phrase + " has " + vowelCounter + " vowels and " + consonantCounter + " consonants.");': "After the loop: the result.",
    "default:": "Just above the switch's closing brace. Anything that is not a vowel lands here.",
    "if (letter >= 'b' && letter <= 'z') {": "Characters are numbers underneath, in alphabetical order, so this is true for small letters b to z. Digits and spaces are left out.",
    "consonantCounter++;": None,
    "String phrase = input.nextLine().toLowerCase();": "Only this line changes: turn the phrase into small letters the moment it is read.",
})

WEEK_6 = {
 "n": 6,
 "title": "Strings and algorithms",
 "big_idea": "A String is an object with methods that answer questions about it - how long, what is at this index, where is this word - and none of them changes it. An algorithm is a step-by-step plan, and walking through a String one character at a time is the plan behind a palindrome check and a letter counter.",
 "new_concepts": [".equals versus ==", "length()", "indexOf", "toUpperCase / toLowerCase", "charAt", "substring", "char", "nextLine", "break in a loop", "algorithm"],
 "objectives": [
   "Explain why Strings are compared with .equals and not ==",
   "Use length, indexOf, toUpperCase, toLowerCase, charAt and substring",
   "Walk through a String with a for loop and charAt",
   "Find a character's partner from the back with length() - 1 - index",
   "Count vowels and consonants with a switch on a char",
 ],
 "ops": OPS[6],
 "flow": [
  TALK("0:00", "Review day 4",
       "New Java project called <em>Week 6</em>. Quick review: what a while loop is for, what an infinite loop is, and the three parts of a for loop.",
       ask=("What does the update part of a for loop do, and when?",
            "It changes the counter - <code>index++</code> - after each pass through the block, before the condition is checked again.")),
  TALK("0:03", "Comparing Strings",
       "A String literal is any characters between double quotes - <code>\"\"</code> and <code>\"12345\"</code> are both Strings. Instructor Example 5A: two Strings with the same letters can be different objects. <code>==</code> asks whether two variables point at the same object; <code>.equals</code> asks whether the letters are the same.",
       ask=("Which one do you use to check a password somebody typed?",
            "<code>.equals</code>. What they typed is a new object, so <code>==</code> would say false even for the right password.")),
  TALK("0:08", "Strings have methods",
       "A String is an object, and objects come with methods - things you can ask them. Put a dot after the variable, then the method's name and brackets. Go through the table: length, indexOf, toUpperCase, toLowerCase, charAt, substring.",
       ask=("Indexes start at 0. What index is the last character of a 5-letter word?",
            "4. The last index is always length() - 1.")),
  TYPE("StringMethods.java", "String methods", at="0:10", notes=[
       "One String and the first three methods. Count the characters before you run it.",
       "The rest of the table.",
  ]),
  TALK("0:16", "An algorithm",
       "An <em>algorithm</em> is a step-by-step plan for solving a problem. A palindrome reads the same both ways. The plan: compare the first letter with the last, the second with the second-last, and stop at the middle. Draw RADAR's indexes on the board and work out each partner with <code>5 - 1 - index</code>.",
       ask=("Why do we only need to go halfway?",
            "Every comparison checks two letters, one from each end. By the middle, every letter has been checked.")),
  TYPE("Palindrome.java", "A palindrome checker", at="0:20", notes=[
       "Read a word.",
       "Assume it is a palindrome, then walk to the middle comparing partners.",
       "One mismatch makes it false and stops the loop. Print the verdict.",
  ]),
  TYPE("VowelsAndConsonants.java", "Counting vowels", at="0:32", notes=[
       "Student Task 5-1. Ten minutes. Say what it does and read a phrase.",
       "Two counters, and a loop that looks at every character with a switch.",
       "Print the counts after the loop.",
  ], ask=("Run it with Hello World. Why are there 0 consonants?",
          "Nothing counts them yet. A switch has a <code>default</code> that runs when no case matched - that is where they go.")),
  TYPE("VowelsAndConsonants.java", "Counting consonants", at="0:42", notes=[
       "The default case, with a check that the character is a small letter.",
  ], ask=("Why does the check start at <code>'b'</code> and not <code>'a'</code>?",
          "Every vowel, a included, was already counted by a case above, and its break means it never reaches the default.")),
  TYPE("VowelsAndConsonants.java", "Capital letters", at="0:47", notes=[
       "Run it with Hello World again: 5 consonants, not 7. H and W are capitals, so they are not between <code>'b'</code> and <code>'z'</code>.",
  ]),
  TALK("0:52", "Homework", "The week 6 homework in the workbook."),
 ],
 "errors": [
  ("StringIndexOutOfBoundsException", "An index past the end. The last character is at length() - 1; a loop over a String uses index < length(), not <=."),
  ("incompatible types: String cannot be converted to char", "A char goes in single quotes: case 'a':, not case \"a\":."),
  ("Vowels are counted as consonants too", "The break after vowelCounter++; is missing, so a vowel falls through into default."),
  ("Capital letters are not counted", "Read the phrase with .toLowerCase() on the end, so every letter is small."),
  ("Two equal Strings compared with == give false", "Use .equals. == checks whether they are the same object."),
 ],
 "recap": [
   "Compare Strings with .equals. == asks whether they are the same object.",
   "Indexes start at 0. The last character of a String is at length() - 1.",
   "length(), indexOf, toUpperCase, toLowerCase, charAt and substring all give you something new. The String itself never changes.",
   "substring(start, end) stops just before end.",
   "A char holds one character, in single quotes. Characters can be compared: letter >= 'b' && letter <= 'z'.",
   "break leaves a loop straight away.",
   "An algorithm is a step-by-step plan for solving a problem.",
 ],
 "homework": [
  {"task": "Initials", "detail": "New file Initials.java. Ask for a first name and a last name, and print the two initials in capitals, using charAt(0) and toUpperCase.", "done": "ada lovelace prints AL."},
  {"task": "Count one letter", "detail": "New file CountLetter.java. Ask for a phrase and count how many times the letter s appears in it, with a for loop and charAt.", "done": "Mississippi gives 4."},
  {"task": "Predict", "detail": "Without running it: String word = \"Computer\"; System.out.println(word.length()); System.out.println(word.substring(3)); System.out.println(word.indexOf(\"put\"));", "done": "8, puter, 3 - then run it to check."},
 ],
 "bonus": {"title": "Backwards", "body": "New file Reverse.java. Ask for a word and build it backwards, one character at a time, with a for loop that counts down from length() - 1 to 0 and a String you add each character to. Then use .equals to say whether the word is a palindrome - a second algorithm for the same problem."},
 "slides": [
  {"board": "== or .equals (Instructor Example 5A)",
   "lines": ['String firstWord = "hello";', 'String secondWord = "hello";', 'String thirdWord = new String("hello");', "System.out.println(firstWord == secondWord);", "System.out.println(firstWord == thirdWord);", "System.out.println(firstWord.equals(thirdWord));"],
   "output": "true\nfalse\ntrue",
   "note": "Java shares one object for the two identical literals, so == happens to say true. new String makes another object, so == says false. .equals compares the letters: always use it."},
  {"title": "String methods", "sub": "Asking a String questions", "bullets": ["length(), indexOf(text), charAt(index)", "toUpperCase(), toLowerCase()", "substring(start, end) stops before end", "None of them changes greeting"],
   "code": CODE("StringMethods.java")},
  {"title": "Checkpoint: Hello, world", "checkpoint": True, "file": "StringMethods.java",
   "say": "Run StringMethods.java. Match each line to the method that printed it.",
   "run": """
12
7
HELLO, WORLD
hello, world
H
world
world
"""},
  {"board": "Partners in RADAR",
   "lines": ["index    0  1  2  3  4", "letter   R  A  D  A  R", "", "index 0 pairs with 5 - 1 - 0 = 4", "index 1 pairs with 5 - 1 - 1 = 3", "index 2 is the middle: stop"],
   "output": "R = R and A = A, so RADAR is a palindrome",
   "note": "5 / 2 is 2 in whole numbers, so the loop runs for index 0 and 1. The middle letter has no partner to check."},
  {"title": "A palindrome checker", "sub": "An algorithm on a String", "bullets": ["Assume true until a pair differs", "charAt(index) from the front, charAt(length() - 1 - index) from the back", "break stops at the first mismatch"],
   "code": CODE("Palindrome.java")},
  {"title": "Checkpoint: racecar", "checkpoint": True, "file": "Palindrome.java",
   "say": "Run Palindrome.java with racecar, then with rocket.",
   "run": """
Enter a word to see if it is a palindrome: [[racecar]]
The word racecar is a palindrome
"""},
  {"title": "Checkpoint: rocket", "checkpoint": True, "file": "Palindrome.java",
   "say": "r and t differ, so the loop stops at the very first pair.",
   "run": """
Enter a word to see if it is a palindrome: [[rocket]]
The word rocket is not a palindrome
"""},
  {"title": "Counting vowels", "sub": "Student Task 5-1", "bullets": ["A for loop visits every character", "A switch on a char, cases in single quotes", "Five cases share one block"],
   "code": CODE("VowelsAndConsonants.java")},
  {"title": "Checkpoint: no consonants yet", "checkpoint": True, "file": "VowelsAndConsonants.java",
   "say": "Run it with Hello World.",
   "run": """
This program counts the vowels and consonants in a word or phrase.
Enter a word or phrase: [[Hello World]]
Hello World has 3 vowels and 0 consonants.
"""},
  {"title": "Counting consonants", "sub": "default", "bullets": ["default runs when no case matched", "letter >= 'b' && letter <= 'z' is a small letter", "Vowels never get here: they broke out already"],
   "code": CODE("VowelsAndConsonants.java")},
  {"title": "Checkpoint: five consonants?", "checkpoint": True, "file": "VowelsAndConsonants.java",
   "say": "Hello World has seven consonants. Which two are missing, and why?",
   "run": """
This program counts the vowels and consonants in a word or phrase.
Enter a word or phrase: [[Hello World]]
Hello World has 3 vowels and 5 consonants.
"""},
  {"title": "Capital letters", "sub": "toLowerCase", "bullets": ["H and W are not between 'b' and 'z'", "Make the whole phrase small the moment it is read"],
   "code": CODE("VowelsAndConsonants.java")},
  {"title": "Checkpoint: all seven", "checkpoint": True, "file": "VowelsAndConsonants.java",
   "say": "Run it once more. Then try aeiou, 123 and h3ll0.",
   "run": """
This program counts the vowels and consonants in a word or phrase.
Enter a word or phrase: [[Hello World]]
hello world has 3 vowels and 7 consonants.
"""},
  {"board": "Test it",
   "lines": ["hello         2 vowels  3 consonants", "aeiou         5 vowels  0 consonants", "123           0 vowels  0 consonants", "h3ll0         0 vowels  3 consonants", "hello world   3 vowels  7 consonants"],
   "output": "Digits and spaces are neither",
   "note": "Good tests include the odd cases: no vowels, no letters at all, digits mixed in."},
  {"quiz": [
    {"q": "Why should you not compare two Strings with ==?", "options": ["It checks whether they are the same object, not whether they have the same letters", "It only compares the first letter", "It does not compile for Strings", "It ignores capital letters"], "answer": 0,
     "why": "Two Strings with the same letters can be different objects. .equals compares the letters."},
    {"q": "String greeting = \"Hello, world\"; What is greeting.charAt(4)?", "options": ["o", "l", ",", "H"], "answer": 0,
     "why": "H is 0, e is 1, l is 2, l is 3, o is 4."},
    {"q": "What does \"Hello, world\".indexOf(\"z\") give?", "options": ["-1", "0", "12", "An error"], "answer": 0,
     "why": "indexOf gives -1 when the text is not there at all."},
    {"q": "What does \"palindrome\".substring(0, 4) give?", "options": ["pali", "palin", "alin", "p"], "answer": 0,
     "why": "From index 0 up to, but not including, index 4: p, a, l, i."},
    {"q": "In the consonant check, why letter >= 'b' and not letter >= 'a'?", "options": ["a is a vowel and was already counted", "a is not a letter", "Java has no 'a'", "It is a mistake - it should be 'a'"], "answer": 0,
     "why": "Vowels are counted by the cases above and break out before default. a never gets that far."},
  ]},
 ],
}


# ---------------------------------------------------------------- week 7 (Day 6)

notes_for(7, "ShoppingList.java", {
    "public class ShoppingList {": class_note("ShoppingList"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "String[] shoppingList = new String[5];": "Student Task 6-1. String[] is an array of Strings. new String[5] makes room for five, all empty (null) for now.",
    'shoppingList[0] = "Milk";': "Square brackets and an index pick one slot. The first is 0.",
    'shoppingList[1] = "Celery";': "Student Task 6-2: fill the other four slots.",
    'shoppingList[2] = "Tomatoes";': None,
    'shoppingList[3] = "Apples";': "The last slot is 4, not 5: five slots are numbered 0 to 4.",
    'shoppingList[4] = "Eggs";': None,
    "System.out.println(shoppingList[2]);": "Student Task 6-3: read one item back. Index 2 is the third.",
    'System.out.println("The items in the shopping list are:");': "A heading, then every item.",
    "for (int index = 0; index < shoppingList.length; index++) {": [
        "length is how many slots the array has - no brackets after it, unlike a String's length(). index < length stops at the last slot.",
        "The same loop again.",
    ],
    'System.out.print(shoppingList[index] + " ");': "The item at this index, and a space.",
    "System.out.println();": ["End the line.", None, None],
    'shoppingList[0] = "Strawberries";': "An array's slots can be changed: put a new item into slot 0, and another into slot 4.",
    'shoppingList[4] = "Blueberries";': None,
    'System.out.println("After the changes, in capitals:");': None,
    'System.out.print(shoppingList[index].toUpperCase() + " ");': "Each item, in capitals. Does this change what is in the array? The next part answers it.",
    'System.out.println("And the list itself:");': "Print the array once more, with a for-each loop.",
    "for (String item : shoppingList) {": "Read it as: for each String item in shoppingList. item is every element in turn - no index needed.",
    'System.out.print(item + " ");': None,
})

WEEK_7 = {
 "n": 7,
 "title": "Arrays",
 "big_idea": "A variable holds one value; an array holds many, in numbered slots that start at 0. Its length is fixed when it is made, a for loop visits every slot by index, and a for-each loop visits every element when you do not need the index.",
 "new_concepts": ["array", "index", "new String[5]", "null", "length", "ArrayIndexOutOfBoundsException", "for-each loop"],
 "objectives": [
   "Make an array, set its elements and read one back by index",
   "Loop over every element with a for loop and length",
   "Say what ArrayIndexOutOfBoundsException means and how to avoid it",
   "Change an element, and explain why toUpperCase alone does not",
   "Choose between a for loop and a for-each loop",
 ],
 "ops": OPS[7],
 "flow": [
  TALK("0:00", "Review day 5",
       "New Java project called <em>Week 7</em>. Quick review: why not <code>==</code> for Strings, what <code>length()</code> and <code>charAt</code> give, and what an algorithm is.",
       ask=("What does charAt(index) give you?",
            "The single character at that index. (The guide's answer - the index of a character - is <code>indexOf</code>.)")),
  TALK("0:03", "Arrays",
       "A variable holds one value at a time. A shopping list has many items, and five variables called <code>item1</code> to <code>item5</code> would be clumsy. An <em>array</em> holds many values of one type, in numbered slots. The numbers are <em>indexes</em>, and the first is 0.",
       "Two ways to make one: with the items in braces, <code>{\"Mercedes\", \"BMW\", \"Ford\", \"Mazda\"}</code>, or empty with <code>new String[5]</code> - five slots, each holding <code>null</code> (nothing) until you fill it.",
       ask=("An array has 4 items. What is the index of the last one?",
            "3. The last index is always length - 1.")),
  TYPE("ShoppingList.java", "An empty list", at="0:08", notes=[
       "Student Task 6-1. Three minutes. Make room for five items and put Milk in the first slot.",
  ]),
  TYPE("ShoppingList.java", "Fill it", at="0:11", notes=[
       "Student Task 6-2. Just below Milk, the next two items.",
       "And the last two.",
  ]),
  TYPE("ShoppingList.java", "Read one back", at="0:15", notes=[
       "Student Task 6-3, just below Eggs. Which item is at index 2?",
  ]),
  TALK("0:18", "Traversing",
       "To <em>traverse</em> an array is to visit every element. A for loop's counter makes a perfect index: start at 0, stop before <code>length</code>.",
       ask=("Why index &lt; shoppingList.length and not &lt;=?",
            "length is 5 and the slots are 0 to 4. With <code>&lt;=</code> the loop would ask for slot 5, which does not exist.")),
  TYPE("ShoppingList.java", "Every item", at="0:21", notes=[
       "Just below the println of shoppingList[2]. A heading and a for loop.",
       "End the line after the loop.",
  ]),
  TALK("0:26", "Staying inside the bounds",
       "Show the board: change the loop to <code>index &lt; 6</code> and run it. Five items print, then the program crashes with <code>ArrayIndexOutOfBoundsException</code> - Java's way of saying there is no slot 5. The same happens with <code>shoppingList[6]</code>.",
       ask=("The message says Index 5 out of bounds for length 5. Which line would you look at first?",
            "The loop's condition: something let index reach 5.")),
  TYPE("ShoppingList.java", "Change two items", at="0:31", notes=[
       "At the end of main. Assign to a slot to change it, then a heading.",
       "Loop again, printing each item in capitals, and end the line.",
  ], ask=("After that loop, is the array in capitals?",
          "No. <code>toUpperCase()</code> makes a capital copy to print; the array still holds the originals. To change it you would assign it back: <code>shoppingList[index] = shoppingList[index].toUpperCase();</code>")),
  TALK("0:40", "for-each",
       "When you only need each element and not its index, Java has a shorter loop: <code>for (String item : shoppingList)</code>. The type before the colon must match the array's type.",
       ask=("Could a for-each loop put the capitals back into the array?",
            "No. item is a copy of each element, and there is no index to assign back to. Changing an array needs the ordinary for loop.")),
  TYPE("ShoppingList.java", "For each item", at="0:43", notes=[
       "At the end of main: print the array itself with a for-each loop.",
  ]),
  TALK("0:47", "Which loop?",
       "A for loop when you need the index: to show it, to change elements, or to visit only some of them. A for-each loop when you only read or print every element.",
       ask=("You want to print 1. Milk, 2. Celery and so on. Which loop?",
            "A for loop: the number is <code>index + 1</code>, and for-each has no index.")),
  TALK("0:52", "Homework", "The week 7 homework in the workbook."),
 ],
 "errors": [
  ("ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5", "The last index is length - 1. Loops use index < length, not <=."),
  ("null is printed", "That slot was never given a value. new String[5] starts every slot as null."),
  ("cannot find symbol: method length()", "An array's length has no brackets: shoppingList.length. A String's does: word.length()."),
  ("The array is still not in capitals", "toUpperCase() makes a copy. Assign it back into the slot to change the array."),
  ("incompatible types in a for-each loop", "The variable before the colon must be the array's type: String item for a String[]."),
 ],
 "recap": [
   "An array holds many values of one type in numbered slots. Indexes start at 0.",
   "new String[5] makes five empty (null) slots. {\"a\", \"b\"} makes an array with those items.",
   "array[index] reads a slot, and array[index] = value changes one.",
   "length is the number of slots, with no brackets. The last index is length - 1.",
   "Asking for a slot that does not exist crashes with ArrayIndexOutOfBoundsException.",
   "for (String item : list) visits every element with no index. Use a for loop when you need the index or want to change elements.",
 ],
 "homework": [
  {"task": "Favourite foods", "detail": "New file FavouriteFoods.java. Make an array of four foods with braces, then print them with a for-each loop.", "done": "All four print on one line."},
  {"task": "A week of temperatures", "detail": "New file Temperatures.java. An int array of seven temperatures. Use a for loop to add them up and print the total.", "done": "The total matches what you get by hand."},
  {"task": "Predict", "detail": "Without running it: int[] numbers = new int[3]; numbers[1] = 7; for (int number : numbers) { System.out.print(number + \" \"); }", "done": "0 7 0 - an int array starts full of zeros."},
 ],
 "bonus": {"title": "A numbered list", "body": "Print the shopping list as 1. Milk, 2. Celery and so on, one per line. Which kind of loop do you need, and why?"},
 "slides": [
  {"board": "An array",
   "lines": ["index   0       1        2      3", "item    Apple   Celery   Milk   Eggs"],
   "output": "Four items in one variable, at indexes 0 to 3",
   "note": "The first index is always 0, so the last is always length - 1."},
  {"board": "Making an array",
   "lines": ['String[] cars = {"Mercedes", "BMW", "Ford", "Mazda"};', "int[] numbers = {1, 2, 3, 4};", "String[] shoppingList = new String[5];"],
   "output": "cars.length is 4\nshoppingList holds null, null, null, null, null",
   "note": "Braces when you know the items; new with a size when you will fill it later. Either way the length is fixed from then on."},
  {"title": "An empty list", "sub": "Student Task 6-1", "bullets": ["String[] is an array of Strings", "new String[5]: five empty slots", "shoppingList[0] is the first"],
   "code": CODE("ShoppingList.java")},
  {"title": "Fill it", "sub": "Student Task 6-2", "bullets": ["Slots 1 to 4", "Five slots are numbered 0 to 4"],
   "code": CODE("ShoppingList.java")},
  {"title": "Read one back", "sub": "Student Task 6-3", "bullets": ["shoppingList[2] is the third item"],
   "code": CODE("ShoppingList.java")},
  {"title": "Checkpoint: the third item", "checkpoint": True, "file": "ShoppingList.java",
   "say": "Run ShoppingList.java.",
   "run": """
Tomatoes
"""},
  {"title": "Every item", "sub": "Traversing an array", "bullets": ["index from 0 while index < shoppingList.length", "length has no brackets on an array"],
   "code": CODE("ShoppingList.java")},
  {"title": "Checkpoint: the whole list", "checkpoint": True, "file": "ShoppingList.java",
   "say": "Run it again.",
   "run": """
Tomatoes
The items in the shopping list are:
Milk Celery Tomatoes Apples Eggs
"""},
  {"board": "Out of bounds",
   "lines": ["for (int index = 0; index < 6; index++) {", '    System.out.print(shoppingList[index] + " ");', "}"],
   "output": "Milk Celery Tomatoes Apples Eggs\nException in thread \"main\" java.lang.ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5",
   "note": "There is no slot 5 in an array of five. System.out.println(shoppingList[6]); crashes the same way."},
  {"title": "Change two items", "sub": "Assigning to a slot", "bullets": ["shoppingList[0] = \"Strawberries\"; replaces Milk", "toUpperCase() in the loop prints capitals"],
   "code": CODE("ShoppingList.java")},
  {"board": "Changing every element",
   "lines": ["for (int index = 0; index < shoppingList.length; index++) {", "    shoppingList[index] = shoppingList[index].toUpperCase();", "}"],
   "output": "Now the array itself holds STRAWBERRIES, CELERY, ...",
   "note": "toUpperCase() only makes a copy. Assigning the copy back into the slot is what changes the array - and that needs the index."},
  {"title": "For each item", "sub": "for (String item : shoppingList)", "bullets": ["item is each element in turn", "No index, so it cannot change the array", "The type before the colon matches the array"],
   "code": CODE("ShoppingList.java")},
  {"title": "Checkpoint: the list itself", "checkpoint": True, "file": "ShoppingList.java",
   "say": "Run it. The capitals were only printed; the array still holds the originals.",
   "run": """
Tomatoes
The items in the shopping list are:
Milk Celery Tomatoes Apples Eggs
After the changes, in capitals:
STRAWBERRIES CELERY TOMATOES APPLES BLUEBERRIES
And the list itself:
Strawberries Celery Tomatoes Apples Blueberries
"""},
  {"quiz": [
    {"q": "String[] shoppingList = new String[5]; What is the index of the last slot?", "options": ["4", "5", "6", "0"], "answer": 0,
     "why": "Five slots are numbered 0 to 4. The last index is length - 1."},
    {"q": "What does each slot of new String[3] hold before you set it?", "options": ["null", "An empty String", "0", "A random word"], "answer": 0,
     "why": "A new array of Strings starts with nothing in each slot: null."},
    {"q": "An array has length 5. What happens on System.out.println(shoppingList[5]);?", "options": ["ArrayIndexOutOfBoundsException", "It prints null", "It prints the last item", "It will not compile"], "answer": 0,
     "why": "There is no slot 5. The program compiles, then crashes when it runs."},
    {"q": "When must you use a for loop instead of a for-each loop?", "options": ["When you need the index, for example to change elements", "When the array holds Strings", "When the array is short", "Never - they are the same"], "answer": 0,
     "why": "for-each gives you each element but no index, so it cannot assign back into a slot."},
    {"q": "int[] numbers = {4, 8, 15}; What is numbers.length?", "options": ["3", "2", "15", "27"], "answer": 0,
     "why": "length counts the slots, not the values in them."},
  ]},
 ],
}


# ---------------------------------------------------------------- week 8 (Day 7)

notes_for(8, "FindMinimum.java", {
    "import java.util.Random;": RANDOM_IMPORT_NOTE,
    "public class FindMinimum {": class_note("FindMinimum"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "Random random = new Random();": RANDOM_NOTE,
    "int numberOfElements = random.nextInt(19) + 2;": "How long the list is: nextInt(19) is 0 to 18, and + 2 makes it 2 to 20.",
    'System.out.println("The list has " + numberOfElements + " elements");': None,
    "int[] randomNumbers = new int[numberOfElements];": "An int array with that many slots. An int array starts full of zeros.",
    "for (int index = 0; index < randomNumbers.length; index++) {": [
        "Visit every slot by index.",
        "The outer loop: every element in turn.",
    ],
    "randomNumbers[index] = random.nextInt(100) + 1;": "A new number, 1 to 100, picked inside the loop so every slot gets its own.",
    "for (int element : randomNumbers) {": "Printing only reads, so for-each will do.",
    'System.out.print(element + " ");': None,
    "System.out.println();": "End the line.",
    "int minimum = randomNumbers[0];": "Step 1 of the algorithm: the first element is the smallest seen so far.",
    "for (int index = 1; index < randomNumbers.length; index++) {": "Step 2: compare every other element with it. Index 1, because element 0 is already the minimum.",
    "if (randomNumbers[index] < minimum) {": "Smaller than the smallest so far?",
    "minimum = randomNumbers[index];": "Then it is the new minimum.",
    'System.out.println("The minimum value in the list is: " + minimum);': "Step 3: after the loop, minimum holds the smallest.",
    "boolean hasDuplicate = false;": "Student Task 7-1, at the end of main. No duplicates found - yet.",
    "for (int otherIndex = index + 1; otherIndex < randomNumbers.length; otherIndex++) {": "The inner loop: every element after it. The same brute force as FindingDuplicates.",
    "if (randomNumbers[index] == randomNumbers[otherIndex]) {": None,
    "hasDuplicate = true;": None,
    'System.out.println("Duplicate value: " + randomNumbers[index]);': "Say which value was repeated.",
    "if (hasDuplicate) {": "After both loops, the verdict.",
    'System.out.println("The array contains duplicates.");': None,
    "} else {": None,
    'System.out.println("The array does not contain duplicates.");': None,
})
notes_for(8, "FindingDuplicates.java", {
    "public class FindingDuplicates {": class_note("FindingDuplicates"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "int[] numbers = {1, 5, 3, 4, 1, 5};": "A small list with duplicates we can see: 1 and 5 each appear twice.",
    "boolean hasDuplicate = false;": "No duplicate found yet.",
    "for (int index = 0; index < numbers.length; index++) {": "The outer loop picks each element in turn.",
    "for (int otherIndex = index + 1; otherIndex < numbers.length; otherIndex++) {": "A loop inside a loop. The inner one visits every element after the outer one - index + 1, so nothing is compared with itself.",
    "if (numbers[index] == numbers[otherIndex]) {": "Two different slots, the same value.",
    "hasDuplicate = true;": None,
    'System.out.println("Has duplicate: " + hasDuplicate);': "After both loops.",
})

WEEK_8 = {
 "n": 8,
 "title": "Algorithms on arrays",
 "big_idea": "Many problems are solved by walking through an array with a plan: keep the smallest seen so far to find the minimum, or compare every element with every one after it - brute force - to find duplicates.",
 "new_concepts": ["int array", "filling an array in a loop", "minimum algorithm", "brute force", "nested loops", "otherIndex = index + 1"],
 "objectives": [
   "Fill an array of random length with random numbers",
   "Find the smallest value by keeping the smallest seen so far",
   "Compare every pair of elements with nested loops",
   "Explain why the inner loop starts at index + 1",
 ],
 "ops": OPS[8],
 "flow": [
  TALK("0:00", "Review day 6",
       "New Java project called <em>Week 8</em>. Quick review: what an array is, the index of the first item, what <code>length</code> is, and the difference between a for loop and a for-each loop.",
       ask=("What exception do you get for an index past the end of an array?",
            "<code>ArrayIndexOutOfBoundsException</code>.")),
  TALK("0:03", "Finding the minimum",
       "An algorithm for the smallest value: take the first element as the smallest so far; compare each of the others with it, and whenever one is smaller, it becomes the smallest so far; at the end, the smallest so far is the minimum. Trace it on the board with 5, 3, 9, 1, 7, 2, 4.",
       ask=("Why start with the first element and not with 0?",
            "If every value is bigger than 0, the minimum would stay 0 - a number that is not even in the list.")),
  TYPE("FindMinimum.java", "A random list", at="0:08", notes=[
       "A list of random length, from 2 to 20.",
       "Fill every slot with its own random number.",
       "Print the list with for-each.",
  ], ask=("What would the list look like if the random number were picked once, before the loop?",
          "The same number in every slot - it is picked once and copied each time round.")),
  TYPE("FindMinimum.java", "The minimum", at="0:18", notes=[
       "At the end of main. Start with the first element, then compare the rest.",
       "Print it after the loop.",
  ]),
  TALK("0:25", "Brute force",
       "<em>Brute force</em> means trying every possibility. To find duplicates, compare every element with every other one. That needs a loop inside a loop: the outer picks an element, the inner walks through the ones after it.",
       ask=("If the inner loop started at 0, what would happen?",
            "Every element would be compared with itself, and match - so every list would seem to have duplicates. (The guide's version started at 1 and has the same problem.)")),
  TYPE("FindingDuplicates.java", "Finding duplicates", at="0:29", notes=[
       "A small list, and two loops, one inside the other.",
       "Print the answer after both loops.",
  ]),
  TALK("0:36", "How many comparisons?",
       "With six elements the outer loop runs six times, and the inner loop 5, 4, 3, 2, 1 and 0 times: fifteen comparisons, every pair exactly once. Brute force is simple and always right, but it gets slow fast: a thousand elements is nearly half a million comparisons.",
       ask=("How many comparisons for 4 elements?",
            "3 + 2 + 1 = 6.")),
  TYPE("FindMinimum.java", "Duplicates in the random list", at="0:40", notes=[
       "Student Task 7-1: the same idea in FindMinimum.java, at the end of main. Ten minutes.",
       "Print each duplicate as it is found, then the verdict.",
  ]),
  TALK("0:52", "Homework", "The week 8 homework in the workbook."),
 ],
 "errors": [
  ("Every element is the same number", "The random number is picked once, outside the loop. Pick it inside, straight into randomNumbers[index]."),
  ("Every list has duplicates", "The inner loop starts at 0 or 1, so elements are compared with themselves. Start it at index + 1."),
  ("The minimum is always 0", "minimum started at 0. Start it at randomNumbers[0]."),
  ("ArrayIndexOutOfBoundsException", "A loop condition uses <= length. It must be < length."),
  ("array dimension missing", "new int[] needs a size in the brackets: new int[numberOfElements]."),
 ],
 "recap": [
   "An int array starts full of zeros. Fill it in a loop, picking a new value each time round.",
   "To find the minimum: start with the first element, compare each of the others, keep whichever is smaller.",
   "Brute force tries every possibility. For duplicates, compare every element with every element after it.",
   "A loop can go inside another loop. The inner one runs all the way through for every pass of the outer one.",
   "The inner loop starts at index + 1, so nothing is compared with itself and no pair is compared twice.",
 ],
 "homework": [
  {"task": "The maximum", "detail": "In FindMinimum.java, add the largest value as well: The maximum value in the list is: ...", "done": "Check it against the printed list, three runs in a row."},
  {"task": "The average", "detail": "New file Average.java. An int array of five marks with braces. Add them up with a loop and print the average as a double, with a cast so 7 / 2 is not 3.", "done": "{70, 80, 90, 85, 76} gives 80.2."},
  {"task": "Over fifty", "detail": "In FindMinimum.java, count how many of the numbers are over 50 and print the count.", "done": "The count matches the list, three runs in a row."},
 ],
 "bonus": {"title": "Where is it?", "body": "In FindMinimum.java, also keep the index where the minimum was found, and print The minimum value is at index 4 (or wherever it was). You need a second variable that changes whenever minimum does."},
 "slides": [
  {"board": "Finding the minimum",
   "lines": ["values:   5  3  9  1  7  2  4", "start:    minimum = 5", "3 < 5     minimum = 3", "9 < 3?    no", "1 < 3     minimum = 1", "7, 2, 4   none smaller than 1"],
   "output": "The minimum is 1",
   "note": "The smallest so far starts as the first element, never as 0."},
  {"board": "A list of random length",
   "lines": ["random.nextInt(19)        0 to 18", "random.nextInt(19) + 2    2 to 20", "new int[3]                0 0 0"],
   "output": "A list of 2 to 20 elements, each 1 to 100",
   "note": "An int array starts full of zeros until you fill it."},
  {"title": "A random list", "sub": "Filling an array", "bullets": ["A length from 2 to 20", "A new random number for every slot", "for-each to print it"],
   "code": CODE("FindMinimum.java")},
  {"title": "Checkpoint: a random list", "checkpoint": True, "file": "FindMinimum.java", "seed": 6,
   "say": "Run FindMinimum.java a few times. Your list will be different every time.",
   "run": """
The list has 9 elements
77 67 79 42 4 78 5 91 42
"""},
  {"board": "The same number everywhere",
   "lines": ["int randomNumber = random.nextInt(100) + 1;", "for (int index = 0; index < randomNumbers.length; index++) {", "    randomNumbers[index] = randomNumber;", "}"],
   "output": "42 42 42 42 42 42 42 42 42",
   "note": "Picked once, before the loop, so every slot gets a copy of the same number. The pick belongs inside the loop."},
  {"title": "The minimum", "sub": "Smallest so far", "bullets": ["minimum starts as randomNumbers[0]", "The loop starts at index 1", "Smaller? Then it is the new minimum"],
   "code": CODE("FindMinimum.java")},
  {"title": "Checkpoint: the minimum", "checkpoint": True, "file": "FindMinimum.java", "seed": 6,
   "say": "Run it. Check the minimum against the list by eye.",
   "run": """
The list has 9 elements
77 67 79 42 4 78 5 91 42
The minimum value in the list is: 4
"""},
  {"board": "Every pair once",
   "lines": ["numbers:  1 5 3 4 1 5", "index 0 is compared with 1, 2, 3, 4, 5", "index 1 is compared with 2, 3, 4, 5", "index 2 is compared with 3, 4, 5", "index 3 is compared with 4, 5", "index 4 is compared with 5"],
   "output": "15 comparisons, every pair exactly once",
   "note": "otherIndex starts at index + 1. Start it at 0 (or 1) and elements are compared with themselves, so every list has duplicates."},
  {"title": "Finding duplicates", "sub": "Brute force", "bullets": ["A loop inside a loop", "The inner loop starts at index + 1", "hasDuplicate starts false"],
   "code": CODE("FindingDuplicates.java")},
  {"title": "Checkpoint: has duplicate", "checkpoint": True, "file": "FindingDuplicates.java",
   "say": "Run FindingDuplicates.java. Then change the list so it has no duplicates and run it again.",
   "run": """
Has duplicate: true
"""},
  {"title": "Duplicates in the random list", "sub": "Student Task 7-1", "bullets": ["The same nested loops, in FindMinimum.java", "Print each duplicate as it is found", "Then the verdict"],
   "code": CODE("FindMinimum.java")},
  {"title": "Checkpoint: a duplicate", "checkpoint": True, "file": "FindMinimum.java", "seed": 6,
   "say": "Run it until you get a list with a duplicate in it - short lists rarely have one.",
   "run": """
The list has 9 elements
77 67 79 42 4 78 5 91 42
The minimum value in the list is: 4
Duplicate value: 42
The array contains duplicates.
"""},
  {"quiz": [
    {"q": "Which lengths can random.nextInt(19) + 2 give?", "options": ["2 to 20", "2 to 21", "0 to 19", "1 to 20"], "answer": 0,
     "why": "nextInt(19) is 0 to 18, and + 2 shifts it to 2 to 20."},
    {"q": "Why does minimum start as randomNumbers[0] and not 0?", "options": ["If every value is above 0, the minimum would wrongly stay 0", "Arrays cannot hold 0", "It is faster", "0 would crash the program"], "answer": 0,
     "why": "The starting value has to be one of the elements, or it might never be replaced."},
    {"q": "In the duplicates check, the inner loop starts at 0 instead of index + 1. What happens?", "options": ["Every list reports duplicates", "No list reports duplicates", "It crashes", "Nothing changes"], "answer": 0,
     "why": "When otherIndex equals index, an element is compared with itself - and always matches."},
    {"q": "What does new int[4] hold before you fill it?", "options": ["0 0 0 0", "null null null null", "Nothing - it is an error", "Four random numbers"], "answer": 0,
     "why": "An int array starts full of zeros; a String array starts full of null."},
    {"q": "An array has 4 elements. How many times does the duplicates comparison run?", "options": ["6", "16", "12", "4"], "answer": 0,
     "why": "3 + 2 + 1: every pair exactly once."},
  ]},
 ],
}


# ---------------------------------------------------------------- week 9 (Day 8)

notes_for(9, "FirstMethod.java", {
    "public class FirstMethod {": class_note("FirstMethod"),
    "public static void main(String[] args) {": MAIN_NOTE,
    'System.out.println("This line runs before the method is called.");': "Instructor Example 8A, typed. The first thing main prints.",
    'System.out.println("This line runs after the method\'s call.");': "And the second. Nothing in main mentions the method - yet.",
    "public static void myFirstMethod() {": "Below main's closing brace, still inside the class: your first method. void means it hands nothing back; the empty brackets mean it needs nothing to start.",
    'System.out.println("Now myFirstMethod is executing");': "Its body: the one job it does when it is called.",
    "myFirstMethod();": "Between the two lines: call it. Its name and brackets are enough - the program jumps to the method, runs it, and comes back.",
})
notes_for(9, "AddNumbers.java", {
    "public class AddNumbers {": class_note("AddNumbers"),
    "public static void main(String[] args) {": MAIN_NOTE,
    'System.out.println("Let\'s create a method that performs the addition of two integer numbers!");': "Student Task 8-1. Say what the program is for.",
    "int firstNumber = 5;": "The two numbers to add.",
    "int secondNumber = 10;": None,
    "public static int addNumbers(int firstNumber, int secondNumber) {": "Below main. int before the name: this method hands back a whole number. The two parameters are what it needs to do its job.",
    "int sum = firstNumber + secondNumber;": "The job itself.",
    "return sum;": "return hands sum back to whoever called and ends the method. An int method will not compile without one.",
    "int sum = addNumbers(firstNumber, secondNumber);": "Just below int secondNumber: call the method and keep its answer in a variable.",
    'System.out.println(firstNumber + " + " + secondNumber + " = " + sum);': "Then print it.",
})
notes_for(9, "StringsEqual.java", {
    "public class StringsEqual {": class_note("StringsEqual"),
    "public static void main(String[] args) {": MAIN_NOTE,
    'String firstWord = "hello";': "Two words that differ only in their capitals.",
    'String secondWord = "HELLO";': None,
    'System.out.println("Are the Strings equal? " + areStringsEqual(firstWord, secondWord));': "The method is called right inside println, so its answer is printed directly and never stored.",
    "public static boolean areStringsEqual(String firstWord, String secondWord) {": "A boolean method answers a yes-or-no question, so its name reads like one: are..., is..., has....",
    "boolean stringsEqual = firstWord.equalsIgnoreCase(secondWord);": "equalsIgnoreCase is .equals that treats capital and small letters as the same.",
    "return stringsEqual;": "Hand back true or false.",
})
notes_for(9, "ArithmeticOperation.java", {
    "import java.util.Scanner;": SCANNER_IMPORT_NOTE,
    "public class ArithmeticOperation {": class_note("ArithmeticOperation"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "Scanner input = new Scanner(System.in);": SCANNER_NOTE,
    'System.out.println("Let\'s perform an arithmetic operation.");': "Student Task 8-2. Say what the program does.",
    'System.out.print("Enter +, -, *, /, or %: ");': "print, not println, so the answer is typed on the same line.",
    "String operation = input.nextLine();": "nextLine reads the whole line as a String: the operator's symbol.",
    'System.out.print("Enter the first number: ");': "Then the two numbers.",
    "int firstNumber = input.nextInt();": None,
    'System.out.print("Enter the second number: ");': None,
    "int secondNumber = input.nextInt();": None,
    "int result = performCalculation(operation, firstNumber, secondNumber);": "Hand all three answers to the method, and keep what it gives back in result.",
    'System.out.println("Result: " + result);': "Print what came back.",
    "public static int performCalculation(String operation, int firstNumber, int secondNumber) {": "Below main, inside the class. It takes the operator and two numbers and returns an int. These firstNumber and secondNumber belong to the method: copies of what main passed in.",
    "int result = 0;": "The answer starts at 0 - what comes back if no case matches.",
    "switch (operation) {": "A switch on a String. Its cases are Strings, in double quotes.",
    'case "+":': "One case per operator.",
    "result = firstNumber + secondNumber;": None,
    "break;": ["Leave the switch. Without break, Java falls through into the next case.", None, None, None, None],
    'case "-":': None,
    "result = firstNumber - secondNumber;": None,
    'case "*":': "In Java, * multiplies.",
    "result = firstNumber * secondNumber;": None,
    'case "/":': "Two ints divide as whole numbers: 17 / 5 is 3.",
    "result = firstNumber / secondNumber;": None,
    'case "%":': "% is the remainder: 17 % 5 is 2.",
    "result = firstNumber % secondNumber;": None,
    "return result;": "After the switch: hand the answer back.",
})

WEEK_9 = {
 "n": 9,
 "title": "Methods",
 "big_idea": "A method is a named block of code that does one job. You write it once and call it by name whenever you need the job done; it can take parameters in and hand one value back with return.",
 "new_concepts": ["method", "calling a method", "flow of control", "void", "return type", "return", "parameters", "method signature and header", "public and private", "boolean method names", "equalsIgnoreCase", "switch on a String"],
 "objectives": [
   "Explain why programs are split into methods",
   "Name every part of a method declaration",
   "Write and call a void method and a method that returns a value",
   "Use a method's answer by storing it or printing it",
   "Name a boolean method so it reads like a question",
 ],
 "ops": OPS[9],
 "flow": [
  TALK("0:00", "Review day 7",
       "New Java project called <em>Week 9</em>. Quick review: how to find the minimum of an array, and what brute force means.",
       ask=("Why does the duplicates check's inner loop start at <code>index + 1</code>?",
            "So nothing is compared with itself, and no pair is compared twice.")),
  TALK("0:03", "Why methods?",
       "A <em>method</em> is a named block of code that does one job. Write it once and call it as often as you like, instead of copying the same lines - <em>don't repeat yourself</em>. A program made of small methods is easier to read, and to fix: each method does a single task. You have been calling methods for weeks: <code>println</code>, <code>nextInt</code>, <code>charAt</code>. Java wrote those - they are <em>predefined</em>. Today you write your own: <em>user-defined</em>.",
       ask=("Name three methods you have used that you did not write.",
            "<code>println</code>, <code>nextInt</code>, <code>length</code>, <code>charAt</code>, <code>equals</code>...")),
  TYPE("FirstMethod.java", "Two lines and a method", at="0:07", notes=[
       "main prints two lines; below it, a method of its own.",
  ], ask=("Predict: does <em>Now myFirstMethod is executing</em> print?",
          "No. A method only runs when it is called, and nothing calls it yet.")),
  TALK("0:12", "Flow of control",
       "Instructor Example 8A. A program runs main from the top. When it reaches a method's name, it jumps to that method, runs its body, then comes back to the line after the call and carries on. Draw it on the board with arrows.",
       ask=("Where does the program go after the method's last line?",
            "Back to main, to the line just after the call.")),
  TYPE("FirstMethod.java", "Calling it", at="0:14", notes=[
       "Between the two println lines in main, call the method.",
  ]),
  TALK("0:17", "A method declaration",
       "Take one apart: <code>public static int addNumbers(int firstNumber, int secondNumber)</code>. <code>public</code> is the <em>access specifier</em> - who may call it. A public method is a public park: anyone may come in. A private one is the swing set in your own back yard: only this class may use it. <code>static</code> means it belongs to the class, so main can call it straight away. <code>int</code> is the <em>return type</em>, what it hands back; <code>void</code> means nothing. Then the name, in camelCase, and the <em>parameter list</em> in brackets. The name and the parameters together are the method's <em>signature</em>; the whole first line is its <em>header</em>; the braces hold its <em>body</em>.",
       ask=("What is the signature of that method?",
            "<code>addNumbers(int firstNumber, int secondNumber)</code> - its name and its parameters.")),
  TYPE("AddNumbers.java", "A method that adds", at="0:22", notes=[
       "Student Task 8-1: main has two numbers.",
       "Below main, a method that adds them and returns the sum. Type the header first and the editor complains until <code>return</code> is there - an int method must hand back an int.",
  ], ask=("Predict: what does it print?",
          "Only the first line. The method is written but never called.")),
  TALK("0:28", "Using the answer",
       "Calling a method that returns something is like taking money out of a cash machine: the money comes out, but if you walk away without picking it up, it does you no good. Calling <code>addNumbers(firstNumber, secondNumber);</code> on its own works out 15 and throws it away. Pick it up: store it in a variable, or use it directly - inside <code>println</code>, say.",
       ask=("What does <code>addNumbers(firstNumber, secondNumber);</code> on its own print?",
            "Nothing. The sum is returned and nobody keeps it.")),
  TYPE("AddNumbers.java", "Keeping the sum", at="0:30", notes=[
       "In main, just below <code>int secondNumber = 10;</code>, call the method and keep its answer.",
       "Then print it.",
  ]),
  TALK("0:34", "A method that answers yes or no",
       "A method can return a boolean. Name it like a question, so the code reads like English: <code>isEmpty</code>, <code>hasDuplicate</code>, <code>canVote</code>, <code>shouldRetry</code>, <code>isValidEmail</code>. <code>if (canVote(age))</code> says exactly what it checks. And a new String method: <code>equalsIgnoreCase</code>, which compares two Strings but treats capital and small letters as the same.",
       ask=("A method checks whether a password is long enough. What is a good name for it?",
            "<code>isLongEnough</code>, <code>hasEnoughCharacters</code> - anything that reads as a yes-or-no question.")),
  TYPE("StringsEqual.java", "Are they equal?", at="0:37", notes=[
       "Two words, and the method's answer printed directly.",
       "Below main, the boolean method.",
  ]),
  TYPE("ArithmeticOperation.java", "A calculator", at="0:42", notes=[
       "Student Task 8-2: ask for an operator.",
       "Then two numbers, and hand all three to a method.",
       "Print the result. Below main, the method: its answer starts at 0, and a switch picks the operation.",
       "Subtraction, and multiplication with <code>*</code>.",
       "Division, and the remainder.",
       "Close the switch and return the answer.",
  ], ask=("What would <em>Result</em> be for <code>x</code>, 6 and 7?",
          "0. No case matches <code>x</code>, so result keeps its starting value.")),
  TALK("0:57", "Homework", "The week 9 homework in the workbook."),
 ],
 "errors": [
  ("The method's message never prints", "The method is never called. Write its name and brackets in main: myFirstMethod();"),
  ("missing return statement", "A method with a return type (int, boolean, String) must end with return and a value of that type."),
  ("cannot find symbol: method addnumbers", "The call and the method are spelled differently. Java is case-sensitive: addNumbers is not addnumbers."),
  ("method addNumbers in class AddNumbers cannot be applied to given types", "The call passes the wrong number or type of arguments. It must match the parameter list: two ints."),
  ("non-static method cannot be referenced from a static context", "static is missing from the method's header. Every method this course writes is public static (or private static)."),
  ("The sum is worked out but nothing prints", "The answer was not kept. Store it in a variable or put the call inside println."),
  ("Result: 0", "The operator matched no case - a typo, or a space before it. Only + - * / and % are cases."),
  ("ArithmeticException: / by zero", "The second number was 0 with / or %. You cannot divide by zero."),
 ],
 "recap": [
   "A method is a named block of code that does one job. Write it once, call it as often as you need.",
   "A method runs only when it is called. The program jumps to it, runs it, and comes back to the line after the call.",
   "The header: access specifier (public or private), static, return type (void for nothing), name, parameters. The signature is the name and the parameters.",
   "return hands a value back and ends the method. A method with a return type must return a value of that type.",
   "Use a returned value, or it is lost: store it in a variable or use it directly, inside println.",
   "Name a boolean method like a question: is..., has..., can..., should....",
 ],
 "homework": [
  {"task": "Greetings", "detail": "New file Greetings.java. Write a void method sayGoodMorning() that prints Good morning!, and call it three times from main.", "done": "Good morning! prints three times, and the println is typed only once."},
  {"task": "A bigger number", "detail": "In AddNumbers.java, add a method biggerNumber(int firstNumber, int secondNumber) that returns the larger of the two. Print what it returns for 5 and 10, and for 10 and 5.", "done": "Both print 10."},
  {"task": "Old enough", "detail": "New file VotingAge.java. A boolean method canVote(int age) returns whether age is 18 or more. Ask for an age with a Scanner and print You can vote: true (or false).", "done": "17 prints false and 18 prints true."},
 ],
 "bonus": {"title": "Power", "body": "In ArithmeticOperation.java, add a case for ^ that raises the first number to the power of the second, with a for loop that multiplies result by firstNumber secondNumber times. Where must result start for this case - 0 or 1?"},
 "slides": [
  {"title": "Methods", "sub": "A named block of code that does one job", "bullets": ["Write it once, call it as often as you like", "Each method does a single task", "Predefined: println, nextInt, charAt - Java wrote them", "User-defined: the ones you write"]},
  {"title": "Your first method", "sub": "Instructor Example 8A", "bullets": ["main prints two lines", "Below main, a method of its own", "void: it hands nothing back"],
   "code": CODE("FirstMethod.java")},
  {"title": "Checkpoint: no call", "checkpoint": True, "file": "FirstMethod.java",
   "say": "Run FirstMethod.java. Where is the method's line?",
   "run": """
This line runs before the method is called.
This line runs after the method's call.
"""},
  {"board": "Flow of control",
   "lines": ["main starts at the top", "  prints the first line", "  myFirstMethod();      jump to the method", "    its body runs", "  back to the line after the call", "  prints the last line"],
   "output": "before, the method, after",
   "note": "A method runs only when it is called, and the program always comes back to where it left."},
  {"title": "Calling it", "sub": "Flow of control", "bullets": ["The method's name and brackets", "Between the two lines in main", "The program jumps there and back"],
   "code": CODE("FirstMethod.java")},
  {"title": "Checkpoint: the call", "checkpoint": True, "file": "FirstMethod.java",
   "say": "Run it. The method's line is in the middle now - where you called it.",
   "run": """
This line runs before the method is called.
Now myFirstMethod is executing
This line runs after the method's call.
"""},
  {"board": "A method declaration",
   "lines": ["public static int addNumbers(int firstNumber, int secondNumber) {", "public       who may call it (private: only this class)", "static       belongs to the class", "int          the return type (void: nothing)", "addNumbers   the name, in camelCase", "(int firstNumber, int secondNumber)   the parameters"],
   "output": "signature: addNumbers(int firstNumber, int secondNumber)",
   "note": "The signature is the name and the parameters; the header is the whole first line. Public is a public park, private is the swing set in your own back yard."},
  {"title": "A method that returns", "sub": "Student Task 8-1", "bullets": ["int before the name: it hands back a whole number", "Two parameters: the numbers to add", "return sum; hands the answer back"],
   "code": CODE("AddNumbers.java")},
  {"title": "Checkpoint: where is 15?", "checkpoint": True, "file": "AddNumbers.java",
   "say": "Run AddNumbers.java. Why is there no sum?",
   "run": """
Let's create a method that performs the addition of two integer numbers!
"""},
  {"board": "Money left in the machine",
   "lines": ["addNumbers(firstNumber, secondNumber);", "int sum = addNumbers(firstNumber, secondNumber);", "System.out.println(addNumbers(firstNumber, secondNumber));"],
   "output": "15 thrown away / 15 kept in sum / 15 printed",
   "note": "A returned value is like cash from a machine: pick it up, or it does you no good. Store it, or use it directly."},
  {"title": "Using the answer", "sub": "Store it, then print it", "bullets": ["int sum = addNumbers(...) keeps the answer", "Then println can use it"],
   "code": CODE("AddNumbers.java")},
  {"title": "Checkpoint: the sum", "checkpoint": True, "file": "AddNumbers.java",
   "say": "Run it again. Change the numbers and run it once more.",
   "run": """
Let's create a method that performs the addition of two integer numbers!
5 + 10 = 15
"""},
  {"board": "Naming a boolean",
   "lines": ["isEmpty", "hasDuplicate", "canVote", "shouldRetry", "isValidEmail"],
   "output": "if (canVote(age)) reads like English",
   "note": "A boolean answers yes or no, so name it like a question."},
  {"title": "A boolean method", "sub": "equalsIgnoreCase", "bullets": ["It returns true or false", "Named like a question: areStringsEqual", "equalsIgnoreCase ignores capitals"],
   "code": CODE("StringsEqual.java")},
  {"title": "Checkpoint: equal?", "checkpoint": True, "file": "StringsEqual.java",
   "say": "Run StringsEqual.java. Then change equalsIgnoreCase to equals and run it again.",
   "run": """
Are the Strings equal? true
"""},
  {"title": "A calculator", "sub": "Student Task 8-2", "bullets": ["Read the operator as a String with nextLine", "performCalculation takes all three answers", "A switch on the operator picks the sum"],
   "code": CODE("ArithmeticOperation.java")},
  {"title": "Checkpoint: multiply", "checkpoint": True, "file": "ArithmeticOperation.java",
   "say": "Run ArithmeticOperation.java and multiply 6 by 7.",
   "run": """
Let's perform an arithmetic operation.
Enter +, -, *, /, or %: [[*]]
Enter the first number: [[6]]
Enter the second number: [[7]]
Result: 42
"""},
  {"title": "Checkpoint: divide", "checkpoint": True, "file": "ArithmeticOperation.java",
   "say": "Run it again and divide 17 by 5. Then try % with the same numbers.",
   "run": """
Let's perform an arithmetic operation.
Enter +, -, *, /, or %: [[/]]
Enter the first number: [[17]]
Enter the second number: [[5]]
Result: 3
"""},
  {"quiz": [
    {"q": "A method is written below main but never called. What happens when the program runs?", "options": ["Its body never runs", "It runs after main", "It runs before main", "The program will not compile"], "answer": 0,
     "why": "A method runs only when something calls it."},
    {"q": "What does void mean in a method's header?", "options": ["It returns nothing", "It takes no parameters", "Anyone may call it", "It is empty"], "answer": 0,
     "why": "void is the return type for a method that hands nothing back."},
    {"q": "Which is the signature of public static int addNumbers(int firstNumber, int secondNumber)?", "options": ["addNumbers(int firstNumber, int secondNumber)", "public static int", "int addNumbers", "The whole line"], "answer": 0,
     "why": "The signature is the name and the parameters. The whole line is the header."},
    {"q": "Which is the best name for a method that checks whether a list has no items?", "options": ["isEmpty", "empty", "checkList", "listItems"], "answer": 0,
     "why": "A boolean method is named like a yes-or-no question."},
    {"q": "addNumbers(5, 10); is on a line by itself. What prints?", "options": ["Nothing", "15", "5 + 10", "An error"], "answer": 0,
     "why": "The sum is returned and nobody keeps it or prints it."},
  ]},
 ],
}


# ---------------------------------------------------------------- week 10 (Day 9)

notes_for(10, "Matrix.java", {
    "public class Matrix {": class_note("Matrix"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "int[][] matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}};": "A 2D array: two pairs of square brackets. Each inner set of braces is one row - three rows of four.",
    "System.out.println(matrix[2][3]);": "Row first, then column, both counting from 0. Row 2, column 3 is the last element.",
    "matrix[0][0] = 10;": "Change an element as you would in any array: name its row and column, then =.",
    "matrix[0][3] = 40;": None,
    "matrix[1][1] = 50;": None,
    "for (int row = 0; row < matrix.length; row++) {": "To print it all, a loop inside a loop. matrix.length is the number of rows.",
    "for (int column = 0; column < matrix[row].length; column++) {": "matrix[row].length is the number of columns in that row.",
    'System.out.print(matrix[row][column] + " ");': "print, with a space, keeps a row on one line.",
    "System.out.println();": "After each row: end the line.",
})
notes_for(10, "MultiplicationTableGenerator.java", {
    "// Prints the times tables from 1 to 10 as a grid": "A comment saying what the program is for.",
    "public class MultiplicationTableGenerator {": class_note("MultiplicationTableGenerator"),
    "public static void main(String[] args) {": MAIN_NOTE,
    'System.out.println("Multiplication Table (1-10)");': "The title.",
    "for (int row = 1; row <= 10; row++) {": "The outer loop: one row for each times table, 1 to 10.",
    "for (int column = 1; column <= 10; column++) {": "The inner loop: ten columns in every row.",
    "System.out.print(row * column);": "Each cell is the row times the column.",
    'System.out.print(row * column + " ");': "A space after each number.",
    "System.out.println();": "After the inner loop's closing brace, still inside the outer loop: end the row.",
    'System.out.printf("%4d", row * column);': "printf prints to a format. %4d is a whole number in four spaces, pushed to the right.",
})
notes_for(10, "NestedLoop.java", {
    "public class NestedLoop {": class_note("NestedLoop"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "for (int row = 0; row <= 2; row++) {": "Student Task 9-1. Three rows: 0, 1 and 2.",
    "for (int column = 0; column <= 3; column++) {": "Four columns: 0 to 3.",
    'System.out.print("*");': "One star for each column.",
    "System.out.println();": "After the inner loop: end the row.",
})

WEEK_10 = {
 "n": 10,
 "title": "2D arrays and nested loops",
 "big_idea": "A 2D array is a table: rows of columns, reached with two indexes, row first. A loop inside a loop visits every cell - the outer loop picks the row, the inner loop walks along it.",
 "new_concepts": ["2D array", "int[][]", "matrix[row][column]", "matrix.length and matrix[row].length", "nested loops", "printf", "%4d"],
 "objectives": [
   "Make a 2D array with new or with braces",
   "Read and change an element by its row and column",
   "Print a 2D array with nested loops",
   "Line numbers up in columns with printf",
 ],
 "ops": OPS[10],
 "flow": [
  TALK("0:00", "Review day 8",
       "New Java project called <em>Week 10</em>. Quick review: what a method is, <code>public</code> against <code>private</code>, what <code>void</code> means, and how to name a boolean method.",
       ask=("A method returns a value and the call is on a line by itself. Where does the value go?",
            "Nowhere - it is lost. Store it or use it directly.")),
  TALK("0:04", "Two-dimensional arrays",
       "An array can hold arrays. <code>int[][] matrix = new int[3][4];</code> is a table of 3 rows and 4 columns, all 0 to start with. Or fill it with braces, one inner set per row. The first index is the row, the second the column, and both count from 0.",
       ask=("How many elements does <code>new int[3][4]</code> have, and what are they?",
            "Twelve, and all of them 0.")),
  TYPE("Matrix.java", "A 2D array", at="0:09", notes=[
       "A table of three rows, and its last element. Then change two elements of the first row.",
       "One more change, then print the whole table with a loop inside a loop.",
  ]),
  TALK("0:17", "Practice",
       "On the board, the original table. Which index holds 12? Change it to 120. Where is the 7 - make it 70. And the 11 - make it 110. (The original guide said <code>[2][3]</code> for the 11; count again.)",
       ask=("Where is the 11?",
            "<code>matrix[2][2]</code>: row 2, column 2.")),
  TALK("0:21", "Nested loops",
       "A loop inside a loop: for every pass of the outer loop, the inner loop runs all the way through. The guide calls them <code>i</code> and <code>j</code>; we call them what they are - <code>row</code> and <code>column</code>.",
       ask=("The outer loop runs 2 times and the inner loop 3. How many times does the inner body run?",
            "Six: three for each of the two rows.")),
  TYPE("MultiplicationTableGenerator.java", "The times tables", at="0:25", notes=[
       "Ten rows of ten, each cell the row times the column.",
  ], ask=("Run it. What went wrong?",
          "Every number is jammed together on one line: no spaces, and no new rows.")),
  TYPE("MultiplicationTableGenerator.java", "Spaces and rows", at="0:29", notes=[
       "A space after each number.",
       "And a new line after each row - after the inner loop, inside the outer one.",
  ]),
  TALK("0:34", "Lining it up",
       "The numbers have one, two or three digits, so the columns wobble. <code>printf</code> prints to a <em>format</em>: <code>%d</code> is a whole number, and <code>%4d</code> is a whole number given four spaces, pushed to the right. Other formats: <code>%s</code> for a String, <code>%.2f</code> for a double with two decimal places.",
       ask=("Why four and not three?",
            "100 needs three spaces, and one more keeps it apart from its neighbour.")),
  TYPE("MultiplicationTableGenerator.java", "printf", at="0:37", notes=[
       "Change the print to printf.",
  ]),
  TYPE("NestedLoop.java", "A block of stars", at="0:42", notes=[
       "Student Task 9-1: three rows of four stars.",
       "End each row after the inner loop.",
  ], ask=("How would you make it five rows of two?",
          "<code>row &lt;= 4</code> and <code>column &lt;= 1</code>.")),
  TALK("0:50", "Homework", "The week 10 homework in the workbook."),
 ],
 "errors": [
  ("Everything prints on one line", "The println that ends a row is missing. It goes after the inner loop's closing brace, inside the outer loop."),
  ("One number per line", "println is inside the inner loop. Use print for a cell and println only at the end of the row."),
  ("ArrayIndexOutOfBoundsException: Index 4 out of bounds for length 4", "A column index went past the end. Loop while column < matrix[row].length."),
  ("The wrong element changes", "Row first, then column, both from 0: matrix[1][2] is row 1, column 2."),
  ("The columns do not line up", "Use printf with %4d, which gives every number four spaces."),
  ("printf prints %4d", "The format is in quotes and the value goes after a comma: printf(\"%4d\", row * column)."),
 ],
 "recap": [
   "A 2D array is a table of rows and columns: int[][] matrix = new int[3][4]; starts full of zeros.",
   "Fill one with braces, one inner set per row: {{1, 2}, {3, 4}}.",
   "matrix[row][column]: the row first, then the column, both counting from 0.",
   "matrix.length is the number of rows; matrix[row].length is the number of columns in that row.",
   "In nested loops the inner loop runs all the way through for every pass of the outer loop.",
   "printf prints to a format: %4d is a whole number in four spaces, so columns line up.",
 ],
 "homework": [
  {"task": "The practice, for real", "detail": "In Matrix.java, change 7 to 70 and 11 to 110 the way the practice on the board did, and print the table again.", "done": "70 is in the middle row and 110 in the last."},
  {"task": "Add it all up", "detail": "New file MatrixSum.java. Make the {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}} table and add every element up with nested loops.", "done": "It prints 78."},
  {"task": "A triangle", "detail": "New file Triangle.java. With nested loops, print a triangle of stars: 1 star, then 2, then 3, up to 5. The inner loop's end depends on the row.", "done": "Five rows, each one star longer."},
 ],
 "bonus": {"title": "Row totals", "body": "In MultiplicationTableGenerator.java, keep a total for each row and print it at the end of the row, with printf so the totals line up too."},
 "slides": [
  {"title": "Two-dimensional arrays", "sub": "A table of rows and columns", "bullets": ["int[][] matrix = new int[3][4]; - 3 rows, 4 columns", "It starts full of zeros", "Or fill it with braces, one inner set per row", "matrix[row][column], both from 0"]},
  {"board": "new int[3][4]",
   "lines": ["int[][] matrix = new int[3][4];", "          column 0  1  2  3", "row 0            0  0  0  0", "row 1            0  0  0  0", "row 2            0  0  0  0"],
   "output": "12 elements, all 0",
   "note": "The first number is the rows, the second the columns."},
  {"title": "A 2D array", "sub": "Rows first, then columns", "bullets": ["Braces inside braces: one set per row", "matrix[2][3] is row 2, column 3", "Nested loops print it"],
   "code": CODE("Matrix.java")},
  {"title": "Checkpoint: the table", "checkpoint": True, "file": "Matrix.java",
   "say": "Run Matrix.java. Find the three numbers you changed.",
   "run": """
12
10 2 3 40
5 50 7 8
9 10 11 12
"""},
  {"board": "Practice",
   "lines": ["{{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}}", "the last element:  matrix[2][3] = 120;", "the 7:             matrix[1][2] = 70;", "the 11:            matrix[2][2] = 110;"],
   "output": "row, then column, both from 0",
   "note": "Count the rows down and the columns across, starting at 0."},
  {"board": "Nested loops",
   "lines": ["for (int row = 0; row < 2; row++) {", "    for (int column = 0; column < 3; column++) {", '        System.out.println("row " + row + ", column " + column);', "    }", "}"],
   "output": "row 0, column 0 / row 0, column 1 / row 0, column 2 / row 1, column 0 / row 1, column 1 / row 1, column 2",
   "note": "Six lines: the inner loop runs all the way through for each row."},
  {"title": "The times tables", "sub": "A grid from nested loops", "bullets": ["The outer loop: the row, 1 to 10", "The inner loop: the column, 1 to 10", "Each cell is row * column"],
   "code": CODE("MultiplicationTableGenerator.java")},
  {"board": "What came out",
   "lines": ["System.out.print(row * column);"],
   "output": "Multiplication Table (1-10) / 12345678910246810121416182036912...",
   "note": "Every number jammed together on one line: nothing prints a space, and nothing ends a row."},
  {"title": "Spaces and rows", "sub": "print, then println", "bullets": ["A space after each number", "println after the inner loop ends each row"],
   "code": CODE("MultiplicationTableGenerator.java")},
  {"title": "Checkpoint: a grid", "checkpoint": True, "file": "MultiplicationTableGenerator.java",
   "say": "Run it. It is a grid now - but do the columns line up?",
   "run": """
Multiplication Table (1-10)
1 2 3 4 5 6 7 8 9 10
2 4 6 8 10 12 14 16 18 20
3 6 9 12 15 18 21 24 27 30
4 8 12 16 20 24 28 32 36 40
5 10 15 20 25 30 35 40 45 50
6 12 18 24 30 36 42 48 54 60
7 14 21 28 35 42 49 56 63 70
8 16 24 32 40 48 56 64 72 80
9 18 27 36 45 54 63 72 81 90
10 20 30 40 50 60 70 80 90 100
"""},
  {"title": "printf", "sub": "Printing to a format", "bullets": ["%d is a whole number", "%4d gives it four spaces, pushed right", "%s is a String, %.2f a double to two places"],
   "code": CODE("MultiplicationTableGenerator.java")},
  {"title": "Checkpoint: lined up", "checkpoint": True, "file": "MultiplicationTableGenerator.java",
   "say": "Run it. Every column lines up now.",
   "run": """
Multiplication Table (1-10)
   1   2   3   4   5   6   7   8   9  10
   2   4   6   8  10  12  14  16  18  20
   3   6   9  12  15  18  21  24  27  30
   4   8  12  16  20  24  28  32  36  40
   5  10  15  20  25  30  35  40  45  50
   6  12  18  24  30  36  42  48  54  60
   7  14  21  28  35  42  49  56  63  70
   8  16  24  32  40  48  56  64  72  80
   9  18  27  36  45  54  63  72  81  90
  10  20  30  40  50  60  70  80  90 100
"""},
  {"title": "A block of stars", "sub": "Student Task 9-1", "bullets": ["Three rows, 0 to 2", "Four columns, 0 to 3", "println after the inner loop"],
   "code": CODE("NestedLoop.java")},
  {"title": "Checkpoint: stars", "checkpoint": True, "file": "NestedLoop.java",
   "say": "Run NestedLoop.java. Then make it five rows of two.",
   "run": """
****
****
****
"""},
  {"quiz": [
    {"q": "int[][] grid = new int[2][5]; How many rows does it have?", "options": ["2", "5", "10", "7"], "answer": 0,
     "why": "The first number is the rows: 2 rows of 5 columns."},
    {"q": "In {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}}, which element is 7?", "options": ["matrix[1][2]", "matrix[2][1]", "matrix[1][3]", "matrix[2][3]"], "answer": 0,
     "why": "Row 1 (the second row), column 2 (the third column)."},
    {"q": "What is matrix[0].length for that table?", "options": ["4", "3", "12", "0"], "answer": 0,
     "why": "matrix[0] is the first row, which has 4 elements."},
    {"q": "The outer loop runs 3 times and the inner loop 4. How many stars print?", "options": ["12", "7", "4", "3"], "answer": 0,
     "why": "The inner loop runs all 4 times for each of the 3 rows."},
    {"q": "What does %4d do in printf?", "options": ["Prints a whole number in four spaces", "Prints four digits of a number", "Prints the number 4", "Divides by 4"], "answer": 0,
     "why": "The 4 is the width: the number is pushed right in a space four characters wide."},
  ]},
 ],
}


# ---------------------------------------------------------------- week 11 (Day 10)

notes_for(11, "ReviewCheck.java", {
    "public class ReviewCheck {": class_note("ReviewCheck"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "double answer = 13 / 5;": "Question 4. 13 and 5 are both ints, so they divide as whole numbers first - 2 - and only then is 2 stored as a double.",
    'System.out.println("13/5 = " + answer);': "So this prints 2.0, not 2.6.",
    "System.out.println(13 - 3 * 6 / 4 % 3);": "Question 5. * / % go left to right before -: 3 * 6 is 18, 18 / 4 is 4, 4 % 3 is 1, and 13 - 1 is 12.",
    "System.out.println((5 > 3) && (8 < 10));": "Question 6. True and true.",
    "System.out.println((5 > 3) || (8 < 5));": "True or false.",
    "System.out.println(!(5 == 3));": "Not false.",
    "for (int row = 0; row < 4; row++) {": "Question 7. Four rows.",
    "for (int column = row; column < 4; column++) {": "The inner loop starts at row, so each row is one star shorter than the last.",
    'System.out.print("*");': None,
    "System.out.println();": ["End the row.", "End the row."],
    "for (int row = 1; row <= 2; row++) {": "Question 8. Two rows, 1 and 2.",
    "for (int column = 1; column <= 3; column++) {": "Three columns, 1 to 3.",
    'System.out.print(row * column + " ");': "The row times the column, and a space.",
})

WEEK_11 = {
 "n": 11,
 "title": "Review",
 "big_idea": "Everything so far, checked two ways: first predict what a piece of code does on paper, then type it and let Java prove you right or wrong.",
 "new_concepts": ["integer division stored in a double", "precedence of * / %", "short-circuit evaluation", "an inner loop that starts at the outer loop's variable"],
 "objectives": [
   "Say the difference between print and println",
   "Say which conversions need a cast",
   "Predict integer division, precedence and boolean expressions, then check them",
   "Trace nested loops and predict their output",
 ],
 "ops": OPS[11],
 "flow": [
  TALK("0:00", "Review day",
       "New Java project called <em>Week 11</em>. Today is the guide's review: eight questions. Answer each one on paper first. Then, for the ones about code, type the code and let Java tell you whether you were right.",
       ask=("What is the difference between <code>print</code> and <code>println</code>?",
            "<code>println</code> moves to a new line after printing; <code>print</code> stays on the same line.")),
  TALK("0:04", "Casting",
       "Question 2. Java widens without being asked - an int fits in a double, so <code>double price = 5;</code> is fine. It never narrows without being asked, because a double's fraction would be lost: <code>int count = 2.5;</code> will not compile. Write the cast and you take responsibility for it: <code>int count = (int) 2.5;</code> is 2.",
       ask=("Which one will not compile: <code>double average = 7;</code> or <code>int total = 7.5;</code>?",
            "<code>int total = 7.5;</code> - a double to an int needs a cast.")),
  TALK("0:08", "Short-circuit",
       "Question 3. <code>int n = 0;</code> then <code>if (n != 0 &amp;&amp; x / n &gt; 100)</code> prints statement 1, <code>else</code> statement 2. With <code>&amp;&amp;</code>, if the left side is false the whole thing is false, so Java never works out the right side - and never divides by zero.",
       ask=("What prints, and why does it not crash?",
            "Statement 2. <code>n != 0</code> is false, so <code>&amp;&amp;</code> stops there and <code>x / n</code> never runs.")),
  TYPE("ReviewCheck.java", "Division and precedence", at="0:12", notes=[
       "Questions 4 and 5: write your predictions down before you run it.",
  ], ask=("Before running: what is <code>13 / 5</code> stored in a double?",
          "2.0. Two ints divide as whole numbers first; the double only gets the 2.")),
  TYPE("ReviewCheck.java", "And, or, not", at="0:20", notes=[
       "Question 6, at the end of main: three boolean expressions.",
       "Predict each one before you run.",
  ], ask=("Is <code>(5 &gt; 3) || (8 &lt; 5)</code> true or false?",
          "True: <code>||</code> needs only one side to be true.")),
  TYPE("ReviewCheck.java", "A triangle", at="0:26", notes=[
       "Question 7, at the end of main. The inner loop starts at the outer loop's row.",
       "End each row.",
  ], ask=("How many stars in the first row, and in the last?",
          "Four, then one. Each row starts one column further along.")),
  TYPE("ReviewCheck.java", "A little table", at="0:34", notes=[
       "Question 8, below the triangle's loops.",
       "End each row.",
  ]),
  TALK("0:40", "Look back",
       "Ten minutes of your questions. Anything from the first ten weeks: variables, casting, decisions, loops, Strings, arrays, methods, 2D arrays. Then check last week's homework together.",
       ask=("What does <code>matrix[1].length</code> give for a table of 3 rows and 4 columns?",
            "4: the number of columns in row 1.")),
  TALK("0:50", "Next week: Wordle",
       "The last four weeks build one program together: Wordle. Play a round on the board. One player picks a five-letter word; the other has six guesses, and each guess comes back with its letters coloured: green if the letter is in the right place, yellow if it is in the word somewhere else, grey if it is not in the word at all.",
       ask=("The word is <em>plant</em> and the guess is <em>paint</em>. Which letters are green?",
            "p, n and t. The a is yellow; the i is grey.")),
  TALK("0:56", "Homework", "The week 11 homework in the workbook."),
 ],
 "errors": [
  ("incompatible types: possible lossy conversion from double to int", "A double is stored in an int. Add a cast, (int), if you mean to cut off the fraction."),
  ("13/5 = 2.0, but I expected 2.6", "Both numbers are ints, so they divide as whole numbers. Make one a double: 13.0 / 5."),
  ("A square instead of a triangle", "The inner loop starts at 0. Start it at row."),
  ("bad operand types for binary operator '&&'", "Each side of && must be a boolean. Put each comparison in its own brackets."),
  ("The numbers run together", "print(row * column) needs + \" \" after it."),
 ],
 "recap": [
   "println moves to a new line after printing; print does not.",
   "Java widens without being asked (int to double) but never narrows (double to int) without a cast.",
   "With &&, if the left side is false the right side is never worked out. That is short-circuit evaluation.",
   "Two ints divide as whole numbers, even when the answer is stored in a double.",
   "* / and % go before + and -, left to right.",
   "An inner loop can start at the outer loop's variable, so each row is a different length.",
 ],
 "homework": [
  {"task": "Predict, then prove", "detail": "In ReviewCheck.java, predict and then print 17 / 4, 17.0 / 4, 17 % 4 and 20 - 4 * 6 / 5 % 3.", "done": "Your predictions are written as comments next to each line, and they match."},
  {"task": "The other triangle", "detail": "Add a triangle that grows instead of shrinking: 1, 2, 3, 4 stars. Only one loop's start or end changes.", "done": "Four rows, each one star longer."},
  {"task": "A table method", "detail": "New file TableMethod.java. Write a void method printTable(int rows, int columns) that prints a times table that size, and call it twice from main with different sizes.", "done": "printTable(2, 3) prints 1 2 3 and 2 4 6."},
 ],
 "bonus": {"title": "Short-circuit, proved", "body": "In ReviewCheck.java, set int divisor = 0; and print (divisor != 0 && 10 / divisor > 1). Then swap the two sides of && and run it again. Explain why one crashes and the other does not."},
 "slides": [
  {"title": "Review", "sub": "Predict on paper, then prove it in Java", "bullets": ["Eight questions from the first ten weeks", "Write your answer before anyone runs anything", "Java has the last word"]},
  {"quiz": [
    {"q": "What is the difference between print and println?", "options": ["println moves to a new line after printing; print does not", "print moves to a new line; println does not", "println prints numbers, print prints text", "There is none"], "answer": 0,
     "why": "That is why prompts use print: the answer is typed on the same line."},
    {"q": "Which one will not compile?", "options": ["int total = 7.5;", "double average = 7;", "int total = (int) 7.5;", "double average = 7.5;"], "answer": 0,
     "why": "A double to an int would lose the fraction, so Java insists on a cast."},
    {"q": "int n = 0; if (n != 0 && x / n > 100) prints statement 1, else statement 2. What prints?", "options": ["Statement 2", "Statement 1", "It crashes: division by zero", "Nothing"], "answer": 0,
     "why": "n != 0 is false, so && stops there and x / n is never worked out."},
  ]},
  {"board": "Two ints divide first",
   "lines": ["double answer = 13 / 5;", "13 / 5          2    (whole numbers)", "stored as       2.0"],
   "output": "13/5 = 2.0",
   "note": "The double only receives the answer; the division already happened with ints. 13.0 / 5 would give 2.6."},
  {"title": "Division and precedence", "sub": "Questions 4 and 5", "bullets": ["Predict, then run", "13 / 5 in a double", "13 - 3 * 6 / 4 % 3"],
   "code": CODE("ReviewCheck.java")},
  {"title": "Checkpoint: questions 4 and 5", "checkpoint": True, "file": "ReviewCheck.java",
   "say": "Run ReviewCheck.java. Were your predictions right?",
   "run": """
13/5 = 2.0
12
"""},
  {"title": "And, or, not", "sub": "Question 6", "bullets": ["&& is true when both sides are", "|| when either side is", "! flips true and false"],
   "code": CODE("ReviewCheck.java")},
  {"title": "Checkpoint: question 6", "checkpoint": True, "file": "ReviewCheck.java",
   "say": "Run it. All three are true.",
   "run": """
13/5 = 2.0
12
true
true
true
"""},
  {"title": "A triangle", "sub": "Question 7", "bullets": ["Four rows", "The inner loop starts at row", "Each row is one star shorter"],
   "code": CODE("ReviewCheck.java")},
  {"title": "Checkpoint: question 7", "checkpoint": True, "file": "ReviewCheck.java",
   "say": "Run it. Does the triangle match what you drew?",
   "run": """
13/5 = 2.0
12
true
true
true
****
***
**
*
"""},
  {"title": "A little table", "sub": "Question 8", "bullets": ["Rows 1 and 2", "Columns 1 to 3", "Each cell is row * column"],
   "code": CODE("ReviewCheck.java")},
  {"title": "Checkpoint: question 8", "checkpoint": True, "file": "ReviewCheck.java",
   "say": "Run it. The last two lines are the answer to question 8.",
   "run": """
13/5 = 2.0
12
true
true
true
****
***
**
*
1 2 3
2 4 6
"""},
  {"quiz": [
    {"q": "What does double answer = 17 / 4; hold?", "options": ["4.0", "4.25", "4", "It will not compile"], "answer": 0,
     "why": "17 / 4 is 4 with whole numbers, then stored as 4.0."},
    {"q": "What is 20 - 4 * 6 / 5 % 3?", "options": ["19", "17", "2", "16"], "answer": 0,
     "why": "4 * 6 is 24, 24 / 5 is 4, 4 % 3 is 1, and 20 - 1 is 19."},
    {"q": "What is (3 > 2) && !(4 == 4)?", "options": ["false", "true", "It will not compile", "4"], "answer": 0,
     "why": "The left side is true, but !(4 == 4) is false, and && needs both."},
    {"q": "In the triangle, row and column both go up to 5 instead of 4. How many stars in the last row?", "options": ["1", "5", "0", "4"], "answer": 0,
     "why": "The last row starts at column 4 and stops before 5: one star."},
  ]},
 ],
}


# ---------------------------------------------------------------- week 12 (Day 11)

notes_for(12, "Wordle.java", {
    "import java.util.Scanner;": SCANNER_IMPORT_NOTE,
    "public class Wordle {": class_note("Wordle"),
    "public static void main(String[] args) {": MAIN_NOTE,
    "Scanner input = new Scanner(System.in);": SCANNER_NOTE,
    'System.out.println("******************************************");': ["A banner: a line of stars, the title, and another line of stars.", None],
    'System.out.println("   WELCOME TO WORDLE, a very fun game!");': None,
    'System.out.println("This game is for 2 people.");': "Say how it is played.",
    'System.out.print("Player 1, please type a 5-letter word: ");': "Player 1 goes first. print, so the word is typed on the same line.",
    "String answer = input.next();": "next() reads one word: the secret.",
    "gameIntro();": "main's first line now only calls the introduction.",
    "public static void gameIntro() {": "Close main and open a method for the introduction. Every line below it, down to the old closing brace, is now its body.",
    "public static Scanner input;": "At the top of the class, above main: a field. It belongs to the whole class, so every method can use it.",
    "input = new Scanner(System.in);": "No Scanner in front any more: this fills in the field instead of making a new local variable.",
    "public static String[] guesses;": "Two more fields, below input: the rows of the board...",
    "public static int numberOfGuesses;": "...and how many guesses there are.",
    "gameSetup();": "In main, after the introduction: set the board up...",
    "displayGuesses();": "...then show it.",
    "public static void gameSetup() {": "Below gameIntro. Its job: get the board ready.",
    "numberOfGuesses = 6;": "Six guesses - written once, here. Everything else uses the name.",
    "guesses = new String[numberOfGuesses];": "An array with one String for each guess.",
    "public static void displayGuesses() {": "Its job: print the board.",
    "for (int index = 0; index < numberOfGuesses; index++) {": ["One row for each guess.", "The same loop, to fill every row in."],
    "System.out.println(guesses[index]);": None,
    "initializeGuesses();": "At the end of gameSetup, fill the board in.",
    "public static void initializeGuesses() {": "Below gameSetup: a method that fills every row.",
    'guesses[index] = "-----";': "Five dashes: an empty row.",
    "clearConsole();": ["Just below reading the answer: wipe the screen, so player 2 cannot see the word.",
                        "Wipe the screen after every guess."],
    'System.out.println("Now, player 2 can start guessing:");': "Then hand over to player 2.",
    "public static void clearConsole() {": "At the end of the class: a method that clears the console.",
    r'System.out.print("\u001B[H\u001B[2J");': "A code the console understands: go to the top and wipe everything. Copy it exactly.",
    "runGame();": "The last line of main: play.",
    "public static void runGame() {": "At the end of the class: the game itself.",
    "for (int guessNumber = 0; guessNumber < numberOfGuesses; guessNumber++) {": "One pass for each guess.",
    "String userGuess = input.next();": "Read player 2's guess.",
})

WEEK_12 = {
 "n": 12,
 "title": "Wordle: the board",
 "big_idea": "A big program is built from small helper methods, and main just calls them in order. A variable made inside a method lives only there; a field, declared in the class outside every method, is shared by all of them.",
 "new_concepts": ["helper methods", "scope", "local variable", "field (static variable)", "null", "clearing the console", "game loop"],
 "objectives": [
   "Split a program into helper methods that main calls in order",
   "Explain why a variable made in one method cannot be used in another",
   "Share a variable between methods by making it a field",
   "Explain why a String array prints null until it is filled",
 ],
 "ops": OPS[12],
 "flow": [
  TALK("0:00", "Play Wordle",
       "New Java project called <em>Week 12</em>. Before any code: play Wordle. One player picks a secret five-letter word; the other has six guesses. After each guess, a letter in the right place turns green, a letter that is in the word but somewhere else turns yellow, and the rest stay grey.",
       ask=("The word is <em>plant</em> and the guess is <em>train</em>. What colour is each letter?",
            "t yellow, r grey, a green, i grey, n yellow.")),
  TALK("0:05", "The plan",
       "Our Wordle is for two people at one computer. Player 1 types the secret word; the screen clears; player 2 guesses. Over four weeks it grows: the board and the turns today, the colours next week, playing again and a list of letters after that, and checking the guesses last.",
       ask=("Why does the screen have to clear after player 1 types?",
            "Otherwise player 2 can read the secret word.")),
  TYPE("Wordle.java", "The welcome", at="0:07", notes=[
       "A Scanner and a banner.",
       "Then ask player 1 for the secret word.",
  ]),
  TALK("0:13", "Helper methods",
       "main is going to get long. Instead, give each job a method of its own - a <em>helper method</em> - and let main call them in order, so it reads like a table of contents. The introduction is the first job.",
       ask=("What will main look like when the game is finished?",
            "A short list of calls: the introduction, the setup, the board, the game.")),
  TYPE("Wordle.java", "gameIntro", at="0:15", notes=[
       "At the top of main, call the introduction; then close main and open the new method. The lines you already typed become its body.",
  ]),
  TALK("0:18", "Scope",
       "A variable made inside a method is <em>local</em>: it exists only between that method's braces. Put <code>System.out.println(input);</code> in main now and Java says <em>cannot find symbol</em> - input lives in gameIntro. A variable every method can use is declared in the class, outside every method: a <em>field</em>. Ours are <code>static</code>, like the methods.",
       ask=("runGame will need to read guesses with input. Where must input be declared?",
            "In the class, outside every method - a field.")),
  TYPE("Wordle.java", "input, for everyone", at="0:22", notes=[
       "At the top of the class, above main, declare input as a field.",
       "In gameIntro, fill it in - without <code>Scanner</code> in front.",
  ]),
  TALK("0:25", "The board",
       "The board is six rows, one per guess: an array of Strings. And how many guesses? We could write 6 wherever it is needed, but then changing it means hunting for every 6. Give it a name, <code>numberOfGuesses</code>, set it once, and use the name everywhere.",
       ask=("Why numberOfGuesses, and not 6?",
            "Change it in one place and the whole game follows. And the name says what the number means.")),
  TYPE("Wordle.java", "Six rows", at="0:28", notes=[
       "Two more fields, below input.",
       "In main, just below <code>gameIntro();</code>, call the two new methods.",
       "Below gameIntro, the two methods: one makes the board, one prints it.",
  ], ask=("Predict: what does the board look like?",
          "Six lines of <code>null</code>. A new String array holds null - nothing - until you fill it.")),
  TYPE("Wordle.java", "Five dashes", at="0:36", notes=[
       "At the end of gameSetup, call a method that fills every row with dashes - and write it below.",
  ]),
  TYPE("Wordle.java", "Hiding the word", at="0:40", notes=[
       "In gameIntro, just below reading the answer, clear the screen.",
       "Then hand over to player 2.",
       "At the end of the class, the method that clears it.",
  ]),
  TYPE("Wordle.java", "The game loop", at="0:46", notes=[
       "The last line of main: call runGame.",
       "At the end of the class, runGame: one pass for each guess, reading it and clearing the screen.",
  ], ask=("Play it. What is missing?",
          "Nothing checks the guesses yet - no colours, and no winner. That is next week.")),
  TALK("0:55", "Homework", "The week 12 homework in the workbook."),
 ],
 "errors": [
  ("cannot find symbol: variable input", "input is declared inside a method, so other methods cannot see it. Declare it as a field, at the top of the class."),
  ("The board prints null six times", "The array is made but never filled. gameSetup must call initializeGuesses()."),
  ("NullPointerException", "guesses is used before gameSetup makes the array. Call gameSetup() before displayGuesses() in main."),
  ("The secret word is still on the screen", "clearConsole() is missing just after the answer is read."),
  ("The screen does not clear", "The code in clearConsole must be copied exactly, backslashes and capital letters included."),
  ("missing return type", "Every method header needs a return type. These are all void."),
 ],
 "recap": [
   "Helper methods each do one job; main calls them in order and reads like a table of contents.",
   "A local variable exists only inside the method that made it. That is its scope.",
   "A field is declared in the class, outside every method, and every method can use it.",
   "To fill in a field, leave the type off: input = new Scanner(System.in);",
   "A new String array holds null until each element is given a value.",
   "Name a number once (numberOfGuesses) and use the name everywhere.",
 ],
 "homework": [
  {"task": "Your own banner", "detail": "Change the banner in gameIntro to your own design, and add a line with the rules: six guesses, five letters.", "done": "It still clears before player 2 starts."},
  {"task": "Five guesses", "detail": "Change the game to five guesses. How many lines did you change?", "done": "One line changed, and the board has five rows."},
  {"task": "Scope on paper", "detail": "In your notebook, list every variable in Wordle.java and write whether it is a field or local, and to which method.", "done": "input, guesses, numberOfGuesses are fields; answer, userGuess, index and guessNumber are local."},
 ],
 "bonus": {"title": "Which guess?", "body": "In runGame, print Guess 1:, Guess 2: and so on before reading each guess. The loop counts from 0, so what do you add?"},
 "slides": [
  {"title": "Wordle", "sub": "Four weeks, one program", "bullets": ["Player 1 types a secret five-letter word", "Player 2 has six guesses", "Green: right letter, right place", "Yellow: in the word, somewhere else"]},
  {"title": "The welcome", "sub": "Day 11", "bullets": ["A banner", "Player 1 types the secret word", "next() reads one word"],
   "code": CODE("Wordle.java")},
  {"title": "Checkpoint: the welcome", "checkpoint": True, "file": "Wordle.java",
   "say": "Run Wordle.java and type a secret word.",
   "run": """
******************************************
   WELCOME TO WORDLE, a very fun game!
******************************************
This game is for 2 people.
Player 1, please type a 5-letter word: [[plant]]
"""},
  {"title": "gameIntro", "sub": "A helper method", "bullets": ["Each job gets a method", "main calls them in order", "The welcome is the first job"],
   "code": CODE("Wordle.java")},
  {"board": "Scope",
   "lines": ["public static void gameIntro() {", "    Scanner input = new Scanner(System.in);", "}", "public static void main(String[] args) {", "    System.out.println(input);", "}"],
   "output": "error: cannot find symbol - variable input",
   "note": "input was made inside gameIntro, so it only exists there. A field, declared in the class, can be used by every method."},
  {"title": "input, for everyone", "sub": "A field", "bullets": ["Declared in the class, outside every method", "static, like the methods", "gameIntro fills it in - no type in front"],
   "code": CODE("Wordle.java")},
  {"title": "Six rows", "sub": "An array for the board", "bullets": ["guesses: one String per guess", "numberOfGuesses, set once", "gameSetup makes it, displayGuesses prints it"],
   "code": CODE("Wordle.java")},
  {"title": "Checkpoint: null", "checkpoint": True, "file": "Wordle.java",
   "say": "Run it. Why null?",
   "run": """
******************************************
   WELCOME TO WORDLE, a very fun game!
******************************************
This game is for 2 people.
Player 1, please type a 5-letter word: [[plant]]
null
null
null
null
null
null
"""},
  {"title": "Five dashes", "sub": "Filling the board", "bullets": ["A new String array holds null", "initializeGuesses puts ----- in every row", "gameSetup calls it"],
   "code": CODE("Wordle.java")},
  {"title": "Checkpoint: an empty board", "checkpoint": True, "file": "Wordle.java",
   "say": "Run it. Six empty rows - but the secret word is still on the screen.",
   "run": """
******************************************
   WELCOME TO WORDLE, a very fun game!
******************************************
This game is for 2 people.
Player 1, please type a 5-letter word: [[plant]]
-----
-----
-----
-----
-----
-----
"""},
  {"title": "Hiding the word", "sub": "Clearing the console", "bullets": ["clearConsole() just after the answer is read", "A code the console understands", "Then hand over to player 2"],
   "code": CODE("Wordle.java")},
  {"title": "Checkpoint: hidden", "checkpoint": True, "file": "Wordle.java",
   "say": "Run it. The word disappears the moment you press Enter.",
   "run": """
******************************************
   WELCOME TO WORDLE, a very fun game!
******************************************
This game is for 2 people.
Player 1, please type a 5-letter word: [[plant]]
{{clear}}
Now, player 2 can start guessing:
-----
-----
-----
-----
-----
-----
"""},
  {"title": "The game loop", "sub": "One pass per guess", "bullets": ["runGame is the last call in main", "A for loop, once per guess", "Read the guess, clear the screen"],
   "code": CODE("Wordle.java")},
  {"title": "Checkpoint: six guesses", "checkpoint": True, "file": "Wordle.java",
   "say": "Run it and make six guesses. Nothing checks them yet.",
   "run": """
******************************************
   WELCOME TO WORDLE, a very fun game!
******************************************
This game is for 2 people.
Player 1, please type a 5-letter word: [[plant]]
{{clear}}
Now, player 2 can start guessing:
-----
-----
-----
-----
-----
-----
[[house]]
{{clear}}
[[train]]
{{clear}}
[[plant]]
{{clear}}
[[crane]]
{{clear}}
[[stamp]]
{{clear}}
[[grape]]
{{clear}}
"""},
  {"quiz": [
    {"q": "A variable is made inside gameIntro. Where can it be used?", "options": ["Only inside gameIntro", "Anywhere in the class", "Only in main", "Anywhere in the project"], "answer": 0,
     "why": "A local variable's scope is the method that made it."},
    {"q": "What does a new String[6] hold before it is filled?", "options": ["null six times", "Six empty Strings", "Six dashes", "Nothing - it is an error"], "answer": 0,
     "why": "A String array starts full of null, which means no String at all."},
    {"q": "Why is input declared outside every method?", "options": ["So every method can use it", "So it runs first", "Because Scanner must be", "To make it faster"], "answer": 0,
     "why": "A field belongs to the whole class; runGame reads guesses with it."},
    {"q": "Why write numberOfGuesses instead of 6 everywhere?", "options": ["Change it once and everything follows", "Java cannot use 6 in a loop", "Numbers are slower", "6 is not an int"], "answer": 0,
     "why": "A number written in many places has to be changed in many places."},
  ]},
 ],
}


# ---------------------------------------------------------------- week 13 (Day 12)

notes_for(13, "Wordle.java", {
    "for (int index = 0; index < userGuess.length(); index++) {": "Inside the guess loop, just below clearConsole(): a loop over every letter of the guess. A loop inside a loop.",
    "if (userGuess.charAt(index) == answer.charAt(index)) {": "The same letter in the same place? chars compare with ==.",
    'System.out.println("Letter is in the correct place");': "For now, just say so.",
    "private static String answer;": "Below the other fields: answer becomes a field too. private: only this class needs it.",
    "answer = input.next();": "In gameIntro, take String off the front, so this fills in the field.",
    "public static int maxWordLength;": "A field for the length of a word...",
    "maxWordLength = 5;": "...set in gameSetup, so there is no unexplained 5 in the middle of the code.",
    "StringBuilder coloredGuess = new StringBuilder(maxWordLength);": "Just above the letter loop: a StringBuilder, a String you can add to. It will hold the coloured guess.",
    "// These constants colour the output.": "Just below answer: a comment, then three constants.",
    r'private static final String ANSI_RESET = "\u001B[0m";': "final means it never changes. Each is an ANSI code, which tells the console to change colour; RESET changes it back.",
    r'private static final String ANSI_GREEN = "\u001B[32m";': None,
    r'private static final String ANSI_YELLOW = "\u001B[33m";': None,
    "coloredGuess.append(ANSI_GREEN + userGuess.charAt(index) + ANSI_RESET);": "append adds to the end of the StringBuilder: green on, the letter, colour off.",
    "} // inner loop": "A comment on the closing brace, so you can tell which loop it closes.",
    "guesses[guessNumber] = coloredGuess.toString();": "Put the coloured guess in its row of the board...",
    "displayGuesses();": "...and show the board.",
    "} else {": ["Not in the right place?", "Not in the word at all:"],
    "int position = answer.indexOf(userGuess.charAt(index));": "indexOf says where the letter is in the answer, or -1 if it is not there.",
    "if (position >= 0) {": "Anywhere in the word: yellow.",
    "coloredGuess.append(ANSI_YELLOW + userGuess.charAt(index) + ANSI_RESET);": None,
    "coloredGuess.append(userGuess.charAt(index));": "Plain, with no colour.",
    "char userGuessChar = userGuess.charAt(index);": "userGuess.charAt(index) is written five times. Say it once, at the top of the letter loop, as a variable.",
    "if (userGuessChar == answer.charAt(index)) {": "Then use the variable everywhere.",
    "coloredGuess.append(ANSI_GREEN + userGuessChar + ANSI_RESET);": None,
    "int position = answer.indexOf(userGuessChar);": "The same swap in the else.",
    "coloredGuess.append(ANSI_YELLOW + userGuessChar + ANSI_RESET);": None,
    "coloredGuess.append(userGuessChar);": None,
    "if (userGuess.equals(answer)) {": "Just below displayGuesses(), inside the guess loop: the whole word matches? Strings compare with .equals.",
    'System.out.println("Congratulations! You have guessed the word correctly!");': None,
    "return;": ["return ends runGame at once - no more guesses after a win.", "The game is over."],
    "if (guessNumber == numberOfGuesses - 1) {": "Was that the last guess? They count from 0, so the last is numberOfGuesses - 1.",
    'System.out.println("You have run out of guesses! The word was " + answer + ".");': "Tell player 2 the word.",
})

WEEK_13 = {
 "n": 13,
 "title": "Wordle: the colours",
 "big_idea": "Checking a guess is a loop inside a loop: for every guess, look at every letter. A StringBuilder collects the coloured letters one at a time, and return ends the game the moment it is won or lost.",
 "new_concepts": ["comparing chars with ==", "private fields", "StringBuilder and append", "String is immutable", "magic numbers", "ANSI colour codes", "final constants", "indexOf returns -1", "return from a void method"],
 "objectives": [
   "Compare a guess with the answer letter by letter",
   "Build a String piece by piece with StringBuilder",
   "Colour letters green and yellow with ANSI codes",
   "End a loop early with return when the game is won or lost",
 ],
 "ops": OPS[13],
 "flow": [
  TALK("0:00", "Review day 11",
       "New Java project called <em>Week 13</em> - copy last week's Wordle.java into it, or carry on in last week's. Quick review: what a helper method is, and the difference between a local variable and a field.",
       ask=("Why can runGame use input?",
            "input is a field: declared in the class, so every method can use it.")),
  TALK("0:03", "The rules, as code",
       "For each letter of the guess: if it is the same as the answer's letter in the same place, green. Otherwise, if it is anywhere in the answer, yellow. Otherwise, no colour. \"For each letter\" is a loop - inside the loop that goes round once per guess.",
       ask=("How do you get the letter at position index of userGuess?",
            "<code>userGuess.charAt(index)</code>.")),
  TYPE("Wordle.java", "Comparing letters", at="0:07", notes=[
       "In runGame, just below <code>clearConsole();</code>, loop over the guess's letters and compare each with the answer's.",
  ], ask=("It will not compile. Why?",
          "answer is local to gameIntro, so runGame cannot see it.")),
  TYPE("Wordle.java", "answer, for everyone", at="0:11", notes=[
       "Make answer a field.",
       "In gameIntro, fill in the field instead of making a new variable.",
  ]),
  TALK("0:16", "StringBuilder",
       "A String can never change - it is <em>immutable</em>. <code>+</code> makes a brand-new String every time. A <code>StringBuilder</code> can change: <code>append</code> adds to its end. We will build the coloured guess in one, letter by letter. It needs a length, and 5 written in the middle of the code is a <em>magic number</em>: nobody knows what it means. Name it.",
       ask=("Why not just write 5?",
            "A bare 5 says nothing about what it is, and has to be found and changed in every place it appears.")),
  TYPE("Wordle.java", "The coloured guess", at="0:19", notes=[
       "A field for the word's length.",
       "Set it in gameSetup.",
       "In runGame, just above the letter loop, a StringBuilder for the coloured guess.",
  ]),
  TALK("0:23", "Colour codes",
       "Consoles understand <em>ANSI codes</em>: characters that change the colour of whatever is printed next. We keep them as constants: <code>private</code>, because only this class needs them, <code>static</code>, and <code>final</code>, because they never change. A constant's name is in CAPITALS.",
       ask=("What would happen if ANSI_RESET were left off after a green letter?",
            "Everything printed after it would be green too.")),
  TYPE("Wordle.java", "Three constants", at="0:26", notes=[
       "Just below <code>private static String answer;</code>, a comment and three constants.",
  ]),
  TYPE("Wordle.java", "Green", at="0:28", notes=[
       "Instead of the message, append the letter in green.",
  ]),
  TYPE("Wordle.java", "Onto the board", at="0:30", notes=[
       "Label the letter loop's closing brace. Then store the coloured guess in its row.",
       "And show the board.",
  ]),
  TYPE("Wordle.java", "Yellow, and the rest", at="0:34", notes=[
       "Just below the green append: otherwise, look for the letter anywhere in the answer.",
       "Found: yellow. Not found: no colour.",
  ]),
  TYPE("Wordle.java", "userGuessChar", at="0:41", notes=[
       "At the top of the letter loop, name the letter once.",
       "Then use the name in every place <code>userGuess.charAt(index)</code> was.",
  ], ask=("The game plays exactly the same. Why change it?",
          "It is shorter and easier to read, and the letter is looked up once instead of five times.")),
  TYPE("Wordle.java", "Winning", at="0:45", notes=[
       "Just below <code>displayGuesses();</code> in runGame: a win, and return to end the game.",
  ]),
  TALK("0:49", "The last guess",
       "Losing means the last guess was wrong. guessNumber counts 0, 1, 2, 3, 4, 5 - so the last guess is when guessNumber is 5, which is <code>numberOfGuesses - 1</code>.",
       ask=("Why not <code>guessNumber == numberOfGuesses</code>?",
            "guessNumber never reaches 6: the loop stops before it does.")),
  TYPE("Wordle.java", "Losing", at="0:51", notes=[
       "Below the win: on the last guess, tell player 2 the word and end the game.",
  ]),
  TALK("0:56", "Homework", "The week 13 homework in the workbook."),
 ],
 "errors": [
  ("cannot find symbol: variable answer", "answer is still local to gameIntro. Declare it as a field and take String off the front in gameIntro."),
  ("Everything after a green letter is green", "ANSI_RESET is missing after the letter."),
  ("The board still shows dashes", "guesses[guessNumber] = coloredGuess.toString(); is missing, or it is inside the letter loop."),
  ("The game carries on after a win", "return; is missing after the congratulations."),
  ("A letter that is not in the word is yellow", "The test must be position >= 0: indexOf gives -1 when the letter is not there."),
  ("incomparable types: char and String", "charAt gives a char; compare it with another char, not with a String in double quotes."),
 ],
 "recap": [
   "chars compare with ==; Strings compare with .equals.",
   "A String is immutable. A StringBuilder can grow: append adds to its end, toString gives the finished String.",
   "Give a magic number a name. Give a value that never changes a final constant, in CAPITALS.",
   "indexOf gives a character's position, or -1 when it is not there.",
   "return ends a void method at once, loop and all.",
   "Loops count from 0, so the last of numberOfGuesses guesses is numberOfGuesses - 1.",
 ],
 "homework": [
  {"task": "Guess by guess", "detail": "Play three games against someone at home, or against yourself. Before each Enter, predict each letter's colour.", "done": "Every prediction matched the screen."},
  {"task": "In how many?", "detail": "Change the win message to say how many guesses it took. guessNumber starts at 0.", "done": "A win on the second guess says 2."},
  {"task": "On paper", "detail": "The answer is apple and the guess is paper. Write each letter's colour, and then check it in the game.", "done": "p yellow, a yellow, p green, e yellow, r plain."},
 ],
 "bonus": {"title": "A red miss", "body": "Add an ANSI_RED constant, \\u001B[31m, and colour the letters that are not in the word red instead of plain."},
 "slides": [
  {"title": "The rules, as code", "sub": "Day 12", "bullets": ["For every guess, look at every letter", "Same place: green", "Anywhere else in the word: yellow", "Not in the word: no colour"]},
  {"board": "Green, yellow, grey",
   "lines": ["answer:  p l a n t", "guess:   t r a i n", "t   in the word, wrong place    yellow", "r   not in the word", "a   same place                  green", "i   not in the word", "n   in the word, wrong place    yellow"],
   "output": "t r a i n",
   "note": "Green is checked first. Only a letter that is not green can be yellow."},
  {"title": "Comparing letters", "sub": "A loop inside a loop", "bullets": ["The letter loop goes inside the guess loop", "charAt(index) on both words", "chars compare with =="],
   "code": CODE("Wordle.java")},
  {"title": "answer, for everyone", "sub": "Another field", "bullets": ["runGame needs the answer", "private: only this class uses it", "gameIntro fills it in"],
   "code": CODE("Wordle.java")},
  {"title": "Checkpoint: correct places", "checkpoint": True, "file": "Wordle.java",
   "say": "Run it with plant as the secret word and the same guesses as last week.",
   "run": """
******************************************
   WELCOME TO WORDLE, a very fun game!
******************************************
This game is for 2 people.
Player 1, please type a 5-letter word: [[plant]]
{{clear}}
Now, player 2 can start guessing:
-----
-----
-----
-----
-----
-----
[[house]]
{{clear}}
[[train]]
{{clear}}
Letter is in the correct place
[[plant]]
{{clear}}
Letter is in the correct place
Letter is in the correct place
Letter is in the correct place
Letter is in the correct place
Letter is in the correct place
[[crane]]
{{clear}}
Letter is in the correct place
Letter is in the correct place
[[stamp]]
{{clear}}
Letter is in the correct place
[[grape]]
{{clear}}
Letter is in the correct place
"""},
  {"board": "String or StringBuilder",
   "lines": ['String word = "pl";', 'word = word + "a";          a brand-new String', "StringBuilder coloredGuess = new StringBuilder(5);", 'coloredGuess.append("a");   the same one, longer'],
   "output": "coloredGuess.toString() gives the finished String",
   "note": "A String is immutable - it never changes. A StringBuilder is built up in place."},
  {"title": "The coloured guess", "sub": "StringBuilder", "bullets": ["maxWordLength instead of a magic 5", "A new StringBuilder for every guess", "append adds to its end"],
   "code": CODE("Wordle.java")},
  {"title": "Three constants", "sub": "ANSI colour codes", "bullets": ["private static final", "Names in CAPITALS", "RESET puts the colour back"],
   "code": CODE("Wordle.java")},
  {"title": "Green", "sub": "append", "bullets": ["Green on, the letter, colour off"],
   "code": CODE("Wordle.java")},
  {"title": "Onto the board", "sub": "toString", "bullets": ["} // inner loop labels the brace", "The coloured guess goes in its row", "Then show the board"],
   "code": CODE("Wordle.java")},
  {"title": "Yellow, and the rest", "sub": "indexOf", "bullets": ["indexOf gives -1 when the letter is not there", "position >= 0: yellow", "Otherwise no colour"],
   "code": CODE("Wordle.java")},
  {"title": "Checkpoint: colours", "checkpoint": True, "file": "Wordle.java",
   "say": "Run it with plant again. Check each colour against the rules.",
   "run": """
******************************************
   WELCOME TO WORDLE, a very fun game!
******************************************
This game is for 2 people.
Player 1, please type a 5-letter word: [[plant]]
{{clear}}
Now, player 2 can start guessing:
-----
-----
-----
-----
-----
-----
[[house]]
{{clear}}
house
-----
-----
-----
-----
-----
[[train]]
{{clear}}
house
((t))r<<a>>i((n))
-----
-----
-----
-----
[[plant]]
{{clear}}
house
((t))r<<a>>i((n))
<<p>><<l>><<a>><<n>><<t>>
-----
-----
-----
[[crane]]
{{clear}}
house
((t))r<<a>>i((n))
<<p>><<l>><<a>><<n>><<t>>
cr<<a>><<n>>e
-----
-----
[[stamp]]
{{clear}}
house
((t))r<<a>>i((n))
<<p>><<l>><<a>><<n>><<t>>
cr<<a>><<n>>e
s((t))<<a>>m((p))
-----
[[grape]]
{{clear}}
house
((t))r<<a>>i((n))
<<p>><<l>><<a>><<n>><<t>>
cr<<a>><<n>>e
s((t))<<a>>m((p))
gr<<a>>((p))e
"""},
  {"title": "userGuessChar", "sub": "Say it once", "bullets": ["One variable for the letter", "Used in five places", "The game plays the same"],
   "code": CODE("Wordle.java")},
  {"title": "Winning", "sub": "return", "bullets": ["The whole word matches: .equals", "return ends runGame at once"],
   "code": CODE("Wordle.java")},
  {"title": "Checkpoint: a win", "checkpoint": True, "file": "Wordle.java",
   "say": "Run it and win on the third guess. The game stops there.",
   "run": """
******************************************
   WELCOME TO WORDLE, a very fun game!
******************************************
This game is for 2 people.
Player 1, please type a 5-letter word: [[plant]]
{{clear}}
Now, player 2 can start guessing:
-----
-----
-----
-----
-----
-----
[[house]]
{{clear}}
house
-----
-----
-----
-----
-----
[[train]]
{{clear}}
house
((t))r<<a>>i((n))
-----
-----
-----
-----
[[plant]]
{{clear}}
house
((t))r<<a>>i((n))
<<p>><<l>><<a>><<n>><<t>>
-----
-----
-----
Congratulations! You have guessed the word correctly!
"""},
  {"title": "Losing", "sub": "The last guess", "bullets": ["guessNumber counts from 0", "The last guess is numberOfGuesses - 1", "Tell player 2 the word"],
   "code": CODE("Wordle.java")},
  {"title": "Checkpoint: a loss", "checkpoint": True, "file": "Wordle.java",
   "say": "Run it and lose on purpose.",
   "run": """
******************************************
   WELCOME TO WORDLE, a very fun game!
******************************************
This game is for 2 people.
Player 1, please type a 5-letter word: [[plant]]
{{clear}}
Now, player 2 can start guessing:
-----
-----
-----
-----
-----
-----
[[house]]
{{clear}}
house
-----
-----
-----
-----
-----
[[train]]
{{clear}}
house
((t))r<<a>>i((n))
-----
-----
-----
-----
[[crane]]
{{clear}}
house
((t))r<<a>>i((n))
cr<<a>><<n>>e
-----
-----
-----
[[stamp]]
{{clear}}
house
((t))r<<a>>i((n))
cr<<a>><<n>>e
s((t))<<a>>m((p))
-----
-----
[[grape]]
{{clear}}
house
((t))r<<a>>i((n))
cr<<a>><<n>>e
s((t))<<a>>m((p))
gr<<a>>((p))e
-----
[[pilot]]
{{clear}}
house
((t))r<<a>>i((n))
cr<<a>><<n>>e
s((t))<<a>>m((p))
gr<<a>>((p))e
<<p>>i((l))o<<t>>
You have run out of guesses! The word was plant.
"""},
  {"quiz": [
    {"q": "What does \"apple\".indexOf('z') give?", "options": ["-1", "0", "5", "An error"], "answer": 0,
     "why": "indexOf gives -1 when the character is not there, which is why yellow checks position >= 0."},
    {"q": "Why is the coloured guess a StringBuilder and not a String?", "options": ["A StringBuilder can be added to; a String never changes", "Strings cannot hold colours", "StringBuilder is shorter to type", "A String can only hold five letters"], "answer": 0,
     "why": "A String is immutable. append grows the same StringBuilder."},
    {"q": "Which declaration is a constant?", "options": ["private static final String ANSI_RESET", "private static String answer", "public static int numberOfGuesses", "String userGuess"], "answer": 0,
     "why": "final means it can never be changed."},
    {"q": "With six guesses, what is guessNumber on the last one?", "options": ["5", "6", "0", "7"], "answer": 0,
     "why": "It counts 0 to 5: numberOfGuesses - 1."},
    {"q": "The answer is plant. What colour is the p in grape?", "options": ["Yellow", "Green", "No colour", "Red"], "answer": 0,
     "why": "p is in plant, but at position 0, not position 3."},
  ]},
 ],
}


# ---------------------------------------------------------------- week 14 (Day 13)

notes_for(14, "Wordle.java", {
    "handleWinScenario();": "In runGame, the win's println becomes a call to a method of its own.",
    "public static void handleWinScenario() {": "At the end of the class. Everything a win needs, in one place.",
    'System.out.println("Congratulations! You have guessed the word! Press P to play again.");': "The message, and an offer.",
    "if (input.next().toLowerCase().charAt(0) == 'p') {": [
        "Read the answer, make it small letters, take its first character: p or P both play again. A char goes in single quotes.",
        "The same check.",
    ],
    "replayGame();": ["Then start over.", None],
    "public static void replayGame() {": "Below it: a new game.",
    "gameIntro();": "The same four calls as main, in the same order.",
    "gameSetup();": None,
    "displayGuesses();": None,
    "runGame();": None,
    "handleLoseScenario();": "The loss's println becomes a call too.",
    "public static void handleLoseScenario() {": "Just below handleWinScenario: the same shape, for a loss.",
    'System.out.println("You have run out of guesses! The word was " + answer + ". Press P to play again.");': "The word, and the same offer.",
    "import java.util.ArrayList;": "At the very top, above Scanner: borrow ArrayList, a list that can grow.",
    "private static ArrayList<Character> guessedLetters = new ArrayList<Character>();": "Below the constants: a list of every letter guessed so far. Character, in angle brackets, is what it holds.",
    "guessedLetters.clear();": "At the end of gameSetup: every game starts with an empty list.",
    "if (!guessedLetters.contains(userGuessChar)) {": "Just below userGuessChar: not in the list yet?",
    "guessedLetters.add(userGuessChar);": "Then add it to the end.",
    "displayGuessedLetters();": "In runGame, just above displayGuesses(): show the letters first.",
    "public static void displayGuessedLetters() {": "At the end of the class.",
    'System.out.println("You have guessed the letters:");': None,
    "for (char letter : guessedLetters) {": "for-each walks a list the way it walks an array.",
    'System.out.print(letter + " ");': None,
    "System.out.println();": "End the line.",
    "private static ArrayList<String> alreadyGuessedWords = new ArrayList<String>();": "The guide's bonus. Below guessedLetters: a list of whole words.",
    "alreadyGuessedWords.clear();": "Emptied for every new game too.",
    "if (!alreadyGuessedWords.contains(userGuess)) {": "In runGame, just below clearConsole(): a new word goes in the list...",
    "alreadyGuessedWords.add(userGuess);": None,
    "} else {": "...and a word already in it gets a warning.",
    'System.out.println("You have already chosen this word");': None,
})

WEEK_14 = {
 "n": 14,
 "title": "Wordle: again, and a list",
 "big_idea": "Methods let the game call itself again to replay, without copying a line. An ArrayList is an array that grows: you add to it, ask whether it contains something, and clear it.",
 "new_concepts": ["replaying with methods", "don't repeat yourself", "ArrayList", "add, contains, clear, remove", "Character", "for-each over a list", "char literals in single quotes"],
 "objectives": [
   "Replay a game by calling its methods again",
   "Move repeated code into a method of its own",
   "Explain the difference between an array and an ArrayList",
   "Add to, search and clear an ArrayList",
 ],
 "ops": OPS[14],
 "flow": [
  TALK("0:00", "Review day 12",
       "New Java project called <em>Week 14</em>, with last week's Wordle.java in it. Quick review: what a StringBuilder is for, and what indexOf gives for a letter that is not there.",
       ask=("Why does the game end straight after a win?",
            "<code>return</code> ends runGame at once.")),
  TALK("0:03", "Play again",
       "To play again, the program does what main does: gameIntro, gameSetup, displayGuesses, runGame, in that order. We could copy those four lines into the win and into the loss - or put them in one method, <code>replayGame</code>, and call it from both. Don't repeat yourself. The win and the loss get a method each too.",
       ask=("What order must a new game's four calls go in?",
            "gameIntro, gameSetup, displayGuesses, runGame - the same as main.")),
  TYPE("Wordle.java", "Winning, and playing again", at="0:08", notes=[
       "In runGame, replace the win's println with a call.",
       "At the end of the class, the method: the message, and a check for P.",
       "Then replayGame: the four calls.",
  ]),
  TYPE("Wordle.java", "Losing", at="0:17", notes=[
       "Replace the loss's println with a call.",
       "Just below handleWinScenario, handleLoseScenario.",
       "The same check, and the same replayGame.",
  ], ask=("Why does <code>toLowerCase()</code> come before <code>charAt(0)</code>?",
          "So P and p both count. The guide's version only replayed on a capital P.")),
  TALK("0:22", "ArrayList",
       "An array's size is fixed when it is made. An <code>ArrayList</code> grows as you add to it. <code>add</code> puts a value on the end, <code>remove(index)</code> takes one out, <code>contains</code> says whether a value is in it, <code>clear</code> empties it and <code>size()</code> says how many it holds. It holds objects, so for chars you write <code>Character</code> in the angle brackets.",
       ask=("Why an ArrayList for the guessed letters, and not an array?",
            "Nobody knows in advance how many different letters will be guessed.")),
  TYPE("Wordle.java", "Letters guessed", at="0:27", notes=[
       "At the very top, import ArrayList.",
       "Below the constants, the list.",
       "Empty it at the end of gameSetup.",
       "In the letter loop, add each letter that is not already there.",
  ]),
  TYPE("Wordle.java", "Showing them", at="0:32", notes=[
       "In runGame, just above <code>displayGuesses();</code>, show the letters.",
       "At the end of the class, the method that prints them.",
  ], ask=("Why clear the list in gameSetup?",
          "Otherwise a second game would start with the first game's letters.")),
  TALK("0:38", "The same word twice",
       "The guide's bonus: warn player 2 when they guess a word they have already tried. Another list - of whole words, so <code>ArrayList&lt;String&gt;</code>.",
       ask=("Which ArrayList method tells you whether a word has been guessed?",
            "<code>contains</code>.")),
  TYPE("Wordle.java", "The same word twice", at="0:40", notes=[
       "Below guessedLetters, a list of words.",
       "Empty it in gameSetup too.",
       "In runGame, just below <code>clearConsole();</code>, add a new word or warn about an old one.",
  ]),
  TALK("0:48", "Play it",
       "Play a few games in pairs, and play again at least once. Try guessing the same word twice.",
       ask=("After playing again, are the letters from the last game gone?",
            "Yes - gameSetup clears both lists.")),
  TALK("0:55", "Homework", "The week 14 homework in the workbook."),
 ],
 "errors": [
  ("cannot find symbol: class ArrayList", "import java.util.ArrayList; is missing from the top of the file."),
  ("unexpected type: required reference, found char", "An ArrayList holds objects. Write ArrayList<Character>, not ArrayList<char>."),
  ("The last game's letters are still there", "guessedLetters.clear(); is missing from gameSetup."),
  ("Pressing p does nothing", "toLowerCase() is missing, or the check compares with a capital 'P'."),
  ("incomparable types: char and String", "charAt(0) is a char. Compare it with 'p' in single quotes, not \"p\"."),
  ("Letters appear twice in the list", "Check contains before add: if (!guessedLetters.contains(userGuessChar))."),
 ],
 "recap": [
   "Code that would be copied goes in a method, called from every place that needs it.",
   "To play again, call the same methods main calls, in the same order.",
   "An array's size is fixed; an ArrayList grows.",
   "add puts a value on the end, contains asks whether it is there, remove(index) takes one out, clear empties the list.",
   "An ArrayList holds objects: ArrayList<Character> for chars, ArrayList<String> for words.",
   "A char goes in single quotes: 'p'. A String goes in double quotes: \"p\".",
 ],
 "homework": [
  {"task": "How many letters?", "detail": "In displayGuessedLetters, also print how many letters have been guessed, using size().", "done": "After house and plant it says 10."},
  {"task": "A list of your own", "detail": "New file Groceries.java. An ArrayList<String>; add four things, remove the second with remove(1), and print the list and its size.", "done": "Three things are printed, and the size is 3."},
  {"task": "Play three games", "detail": "Play three games in a row using P, one of them a loss.", "done": "Each new game starts with an empty board and no guessed letters."},
 ],
 "bonus": {"title": "Score", "body": "Add a field that counts wins, add one in handleWinScenario, and print Games won: 2 (or however many) in gameIntro."},
 "slides": [
  {"title": "Play again", "sub": "Day 13", "bullets": ["A new game is gameIntro, gameSetup, displayGuesses, runGame", "One method for them: replayGame", "The win and the loss call it"]},
  {"board": "Don't repeat yourself",
   "lines": ["main():            gameIntro(); gameSetup(); displayGuesses(); runGame();", "after a win:       the same four lines?", "after a loss:      the same four lines again?", "replayGame():      the four lines, once"],
   "output": "handleWinScenario and handleLoseScenario both call replayGame()",
   "note": "Copied code has to be fixed in every copy. A method is fixed once."},
  {"title": "Winning, and playing again", "sub": "handleWinScenario", "bullets": ["The message and the offer", "p or P: toLowerCase first", "replayGame: the four calls"],
   "code": CODE("Wordle.java")},
  {"title": "Checkpoint: play again?", "checkpoint": True, "file": "Wordle.java",
   "say": "Run it and win. Type n to stop - or p to play again.",
   "run": """
******************************************
   WELCOME TO WORDLE, a very fun game!
******************************************
This game is for 2 people.
Player 1, please type a 5-letter word: [[plant]]
{{clear}}
Now, player 2 can start guessing:
-----
-----
-----
-----
-----
-----
[[house]]
{{clear}}
house
-----
-----
-----
-----
-----
[[plant]]
{{clear}}
house
<<p>><<l>><<a>><<n>><<t>>
-----
-----
-----
-----
Congratulations! You have guessed the word! Press P to play again.
[[n]]
"""},
  {"title": "Losing", "sub": "handleLoseScenario", "bullets": ["The same shape as a win", "It tells player 2 the word", "It calls the same replayGame"],
   "code": CODE("Wordle.java")},
  {"board": "An array or an ArrayList",
   "lines": ["String[] guesses = new String[6];          6, for ever", "ArrayList<Character> guessedLetters = new ArrayList<Character>();", "guessedLetters.add('h');         on the end", "guessedLetters.contains('h')     true", "guessedLetters.remove(0);        take out the first", "guessedLetters.clear();          empty"],
   "output": "guessedLetters.size() says how many it holds",
   "note": "An array's size is fixed; an ArrayList grows. It holds objects: Character, not char."},
  {"title": "Letters guessed", "sub": "ArrayList", "bullets": ["import java.util.ArrayList;", "A list of Character", "Cleared in gameSetup", "Added to only if it does not contain the letter"],
   "code": CODE("Wordle.java")},
  {"title": "Showing them", "sub": "for-each over a list", "bullets": ["Just above the board", "for (char letter : guessedLetters)"],
   "code": CODE("Wordle.java")},
  {"title": "Checkpoint: the letters", "checkpoint": True, "file": "Wordle.java",
   "say": "Run it. Each letter is listed once, however often you guess it.",
   "run": """
******************************************
   WELCOME TO WORDLE, a very fun game!
******************************************
This game is for 2 people.
Player 1, please type a 5-letter word: [[plant]]
{{clear}}
Now, player 2 can start guessing:
-----
-----
-----
-----
-----
-----
[[house]]
{{clear}}
You have guessed the letters:
h o u s e
house
-----
-----
-----
-----
-----
[[plant]]
{{clear}}
You have guessed the letters:
h o u s e p l a n t
house
<<p>><<l>><<a>><<n>><<t>>
-----
-----
-----
-----
Congratulations! You have guessed the word! Press P to play again.
[[n]]
"""},
  {"title": "The same word twice", "sub": "The guide's bonus", "bullets": ["ArrayList<String> of whole words", "Cleared in gameSetup", "contains, then add or warn"],
   "code": CODE("Wordle.java")},
  {"title": "Checkpoint: already chosen", "checkpoint": True, "file": "Wordle.java",
   "say": "Run it and guess house twice.",
   "run": """
******************************************
   WELCOME TO WORDLE, a very fun game!
******************************************
This game is for 2 people.
Player 1, please type a 5-letter word: [[plant]]
{{clear}}
Now, player 2 can start guessing:
-----
-----
-----
-----
-----
-----
[[house]]
{{clear}}
You have guessed the letters:
h o u s e
house
-----
-----
-----
-----
-----
[[house]]
{{clear}}
You have already chosen this word
You have guessed the letters:
h o u s e
house
house
-----
-----
-----
-----
[[plant]]
{{clear}}
You have guessed the letters:
h o u s e p l a n t
house
house
<<p>><<l>><<a>><<n>><<t>>
-----
-----
-----
Congratulations! You have guessed the word! Press P to play again.
[[n]]
"""},
  {"quiz": [
    {"q": "Why does replayGame exist, instead of copying its four lines?", "options": ["So the lines are written once and called from the win and the loss", "Java cannot call gameIntro twice", "It makes the game faster", "main cannot be called"], "answer": 0,
     "why": "Don't repeat yourself: copied code has to be fixed in every copy."},
    {"q": "Which is true of an ArrayList, but not an array?", "options": ["It grows as you add to it", "It counts from 0", "It holds many values", "It has a type"], "answer": 0,
     "why": "An array's size is fixed when it is made."},
    {"q": "Which declaration compiles?", "options": ["ArrayList<Character> letters", "ArrayList<char> letters", "ArrayList[char] letters", "ArrayList letters<char>"], "answer": 0,
     "why": "An ArrayList holds objects, so chars go in as Character."},
    {"q": "Why does gameSetup clear both lists?", "options": ["So a new game does not start with the last game's letters and words", "Lists must be cleared before they are used", "To save memory", "clear makes the list longer"], "answer": 0,
     "why": "gameSetup runs at the start of every game, including a replay."},
    {"q": "The player types P. What is input.next().toLowerCase().charAt(0)?", "options": ["'p'", "'P'", "\"p\"", "0"], "answer": 0,
     "why": "toLowerCase makes it p, and charAt gives the char 'p'."},
  ]},
 ],
}


# ---------------------------------------------------------------- week 15 (Day 14)

notes_for(15, "Wordle.java", {
    "String userGuess = getValidGuess();": "In runGame, the guess comes from a method that only ever hands back a good one.",
    "public static String getValidGuess() {": "At the end of the class. It returns a String: the guess.",
    "String userGuess = input.next();": "Read a guess.",
    "while (userGuess.length() != maxWordLength) {": "The wrong length? Keep asking. A while loop, because nobody knows how many tries it will take.",
    'System.out.println("Please enter a word of exactly 5 letters");': None,
    "userGuess = input.next();": "Read again, into the same variable.",
    "return userGuess;": "Out of the loop, the guess is good: hand it back.",
    "while (userGuess.length() != maxWordLength || hasNonLetters(userGuess)) {": "Keep asking while the length is wrong OR the word has something in it that is not a letter.",
    "// Checks whether any character in a word is not a letter": "At the end of the class: a comment saying what the method is for.",
    "public static boolean hasNonLetters(String word) {": "A boolean method, named like a question.",
    "for (int index = 0; index < word.length(); index++) {": "Look at every character.",
    "if (!Character.isLetter(word.charAt(index))) {": "Character.isLetter says whether a char is a letter. ! flips it: not a letter?",
    "return true;": "Then the answer is yes - stop looking.",
    "return false;": "Through every character without finding one: the answer is no.",
    "for (char letter : word.toCharArray()) {": "toCharArray turns the word into an array of chars, so for-each can walk it - no index needed.",
    "if (!Character.isLetter(letter)) {": None,
    "boolean isFiveLetters = userGuess.length() == maxWordLength;": "Just above the while: give each half of the condition a name.",
    "boolean containsNonLetters = hasNonLetters(userGuess);": None,
    "while (!isFiveLetters || containsNonLetters) {": "The condition now reads like English.",
    "isFiveLetters = userGuess.length() == maxWordLength;": "Inside the loop, just below reading again: work both out again. Leave this out and the loop never ends.",
    "containsNonLetters = hasNonLetters(userGuess);": None,
    "answer = input.next().toLowerCase();": "In gameIntro: keep the answer in small letters.",
    "String userGuess = input.next().toLowerCase();": "In getValidGuess: every guess too...",
    "userGuess = input.next().toLowerCase();": "...including the ones read again.",
})

WEEK_15 = {
 "n": 15,
 "title": "Wordle: checking the guesses",
 "big_idea": "A program should never trust what it is typed. A while loop keeps asking until the input is good, a boolean method answers whether it is, and testing with bad input on purpose is how you find what you missed.",
 "new_concepts": ["validating input", "a while loop that keeps asking", "Character.isLetter", "toCharArray", "for-each over a String's characters", "naming a condition with booleans", "test cases", "toLowerCase for comparisons"],
 "objectives": [
   "Keep asking until the input is valid",
   "Write a boolean method that checks every character of a word",
   "Name the parts of a condition with boolean variables, and keep them up to date",
   "Test a program with input chosen to break it",
 ],
 "ops": OPS[15],
 "flow": [
  TALK("0:00", "Review day 13",
       "New Java project called <em>Week 15</em>, with last week's Wordle.java in it. Quick review: what an ArrayList can do that an array cannot, and why replayGame exists.",
       ask=("Which ArrayList method empties the list?",
            "<code>clear</code>.")),
  TALK("0:03", "Never trust the input",
       "Guess <em>hous</em>, or <em>house1</em>, and the game takes it. <em>Error handling</em> means expecting bad input and dealing with it: here, asking again until the guess is exactly five letters. We don't know how many tries that will take, so it is a while loop.",
       ask=("What makes a guess valid?",
            "Exactly five characters, and every one of them a letter.")),
  TYPE("Wordle.java", "A valid guess", at="0:07", notes=[
       "In runGame, read the guess from a new method.",
       "At the end of the class, getValidGuess: read a guess, and keep asking while it is the wrong length.",
       "Then hand it back.",
  ]),
  TYPE("Wordle.java", "Letters only", at="0:14", notes=[
       "Add the second half of the condition.",
       "At the end of the class, the boolean method.",
       "Look at each character; the first one that is not a letter answers the question.",
  ], ask=("Test it with <em>hous1</em>, <em>9hous</em> and <em>;[dog</em>. Why are all three refused?",
          "Each has five characters, but one of them is not a letter.")),
  TALK("0:21", "toCharArray",
       "<code>word.toCharArray()</code> gives the word's characters as an array of chars, and a for-each loop can walk an array without an index. When you only need each character, not where it is, it is shorter.",
       ask=("When do you still need the index version?",
            "When you need the position - Wordle's letter loop compares with <code>answer.charAt(index)</code>.")),
  TYPE("Wordle.java", "for-each", at="0:23", notes=[
       "In hasNonLetters, swap the index loop for a for-each over the word's characters.",
  ]),
  TALK("0:25", "Naming the condition",
       "<code>userGuess.length() != maxWordLength || hasNonLetters(userGuess)</code> is hard to read. Name each half with a boolean and the condition reads like English. One catch, which the original guide fell into: the booleans are worked out once. Inside the loop, after reading a new guess, they must be worked out again - or they keep the old answer and the loop never ends.",
       ask=("If the booleans are not updated inside the loop, what happens after one bad guess?",
            "The loop runs for ever: isFiveLetters stays false whatever is typed next.")),
  TYPE("Wordle.java", "Booleans with names", at="0:28", notes=[
       "In getValidGuess, name both halves and use the names in the while.",
       "Inside the loop, just below reading the guess again, update both.",
  ]),
  TALK("0:35", "Capital letters",
       "Test it: type <em>plant</em> as the answer and guess <em>Plant</em>. The P is not green, and the guess does not win - <code>'P'</code> and <code>'p'</code> are different chars. The fix: make every word small letters the moment it is read.",
       ask=("Where does toLowerCase need to go?",
            "Everywhere a word is read: the answer, and both places a guess is read.")),
  TYPE("Wordle.java", "Small letters", at="0:37", notes=[
       "In gameIntro, the answer.",
       "In getValidGuess, the first guess.",
       "And the guess read again.",
  ]),
  TALK("0:44", "Test it to break it",
       "In pairs: one of you plays, the other tries to break the game. Capital letters, digits, symbols, four letters, six, the same word twice, playing again. Write down every input you try and what happened.",
       ask=("Name a test case that is not on the list.",
            "A space in the middle, a very long word, just pressing Enter...")),
  TALK("0:52", "Fifteen weeks",
       "You started by printing one line. Wordle uses almost everything since: variables, decisions, loops, Strings, arrays, methods, fields and lists. AP Computer Science goes on to classes and objects - you have been using them all along, in Scanner, Random, StringBuilder and ArrayList.",
       ask=("Which part of Wordle was hardest to get right, and why?",
            "Any honest answer. The colours and the validation loop are the usual ones.")),
  TALK("0:57", "Homework", "The week 15 homework in the workbook."),
 ],
 "errors": [
  ("The game never stops asking", "isFiveLetters and containsNonLetters are not worked out again inside the loop. Update both just after reading the new guess."),
  ("missing return statement", "hasNonLetters must end with return false; after the loop, for a word with no non-letters."),
  ("Every word is refused", "The ! is missing before Character.isLetter, so letters count as non-letters."),
  ("Plant does not win against plant", "toLowerCase() is missing somewhere a word is read."),
  ("cannot find symbol: method isLetter(char)", "isLetter belongs to Character: Character.isLetter(letter)."),
  ("A guess of hous1 is accepted", "The while condition checks only the length. Add || hasNonLetters(userGuess)."),
 ],
 "recap": [
   "Never trust input. A while loop keeps asking until it is valid.",
   "Character.isLetter(letter) says whether a char is a letter.",
   "toCharArray gives a word's characters as an array, so a for-each loop can walk it.",
   "A boolean variable can name part of a condition - but it must be updated whenever what it describes changes.",
   "Compare words in small letters: toLowerCase as each one is read.",
   "Test with input chosen to break the program: that is how you find what you missed.",
 ],
 "homework": [
  {"task": "Your test log", "detail": "Write down ten inputs that tried to break Wordle and what happened to each. Include at least three that are not from the lesson.", "done": "Every one was refused, or was a real five-letter word."},
  {"task": "A good secret", "detail": "Player 1's word is not checked at all. Make gameIntro keep asking until it is five letters too - which method can you reuse?", "done": "Typing hous1 as the secret word is refused."},
  {"task": "What next", "detail": "Pick one improvement - a score, a timer, a word list for one player - and write in your notebook how you would build it, method by method.", "done": "Each method is named, with one sentence saying its job."},
 ],
 "bonus": {"title": "One player", "body": "Make an array of twenty five-letter words, and let a Random pick the answer from it, so one person can play alone. Where does the Random go, and which method no longer asks player 1 anything?"},
 "slides": [
  {"title": "Never trust the input", "sub": "Day 14", "bullets": ["hous, house1, 9hous: all accepted so far", "Keep asking until the guess is valid", "Valid: exactly five characters, all letters"]},
  {"title": "A valid guess", "sub": "getValidGuess", "bullets": ["It returns the guess", "while the length is wrong, ask again", "runGame uses what it returns"],
   "code": CODE("Wordle.java")},
  {"title": "Checkpoint: four letters", "checkpoint": True, "file": "Wordle.java",
   "say": "Run it. Guess hous first.",
   "run": """
******************************************
   WELCOME TO WORDLE, a very fun game!
******************************************
This game is for 2 people.
Player 1, please type a 5-letter word: [[plant]]
{{clear}}
Now, player 2 can start guessing:
-----
-----
-----
-----
-----
-----
[[hous]]
Please enter a word of exactly 5 letters
[[house]]
{{clear}}
You have guessed the letters:
h o u s e
house
-----
-----
-----
-----
-----
[[plant]]
{{clear}}
You have guessed the letters:
h o u s e p l a n t
house
<<p>><<l>><<a>><<n>><<t>>
-----
-----
-----
-----
Congratulations! You have guessed the word! Press P to play again.
[[n]]
"""},
  {"title": "Letters only", "sub": "Character.isLetter", "bullets": ["|| hasNonLetters(userGuess)", "A boolean method: is anything not a letter?", "return true at the first one; false after the loop"],
   "code": CODE("Wordle.java")},
  {"board": "Test cases",
   "lines": ["hous1     five characters, a digit", "9hous     five characters, a digit first", ";[dog     five characters, two symbols", "coding    six letters", "house     valid"],
   "output": "Every one but house is refused",
   "note": "Test with input chosen to break the program, not just input you expect to work."},
  {"title": "Checkpoint: the test cases", "checkpoint": True, "file": "Wordle.java",
   "say": "Run it and try hous1, 9hous and ;[dog before a real word.",
   "run": """
******************************************
   WELCOME TO WORDLE, a very fun game!
******************************************
This game is for 2 people.
Player 1, please type a 5-letter word: [[plant]]
{{clear}}
Now, player 2 can start guessing:
-----
-----
-----
-----
-----
-----
[[hous1]]
Please enter a word of exactly 5 letters
[[9hous]]
Please enter a word of exactly 5 letters
[[;[dog]]
Please enter a word of exactly 5 letters
[[house]]
{{clear}}
You have guessed the letters:
h o u s e
house
-----
-----
-----
-----
-----
[[plant]]
{{clear}}
You have guessed the letters:
h o u s e p l a n t
house
<<p>><<l>><<a>><<n>><<t>>
-----
-----
-----
-----
Congratulations! You have guessed the word! Press P to play again.
[[n]]
"""},
  {"title": "for-each", "sub": "toCharArray", "bullets": ["word.toCharArray() is an array of chars", "for-each walks it without an index"],
   "code": CODE("Wordle.java")},
  {"board": "A condition with names",
   "lines": ["boolean isFiveLetters = userGuess.length() == maxWordLength;", "boolean containsNonLetters = hasNonLetters(userGuess);", "while (!isFiveLetters || containsNonLetters) {", "    userGuess = input.next();", "    // work both out again here, or they never change", "}"],
   "output": "Not five letters, or contains non-letters: ask again",
   "note": "A boolean holds an answer, not a question. Update it when the guess changes."},
  {"title": "Booleans with names", "sub": "Readable conditions", "bullets": ["Name each half of the condition", "The while reads like English", "Update both inside the loop"],
   "code": CODE("Wordle.java")},
  {"title": "Checkpoint: a capital P", "checkpoint": True, "file": "Wordle.java",
   "say": "Run it and guess Plant with a capital P. It should win - but does it?",
   "run": """
******************************************
   WELCOME TO WORDLE, a very fun game!
******************************************
This game is for 2 people.
Player 1, please type a 5-letter word: [[plant]]
{{clear}}
Now, player 2 can start guessing:
-----
-----
-----
-----
-----
-----
[[coding]]
Please enter a word of exactly 5 letters
[[house]]
{{clear}}
You have guessed the letters:
h o u s e
house
-----
-----
-----
-----
-----
[[Plant]]
{{clear}}
You have guessed the letters:
h o u s e P l a n t
house
P<<l>><<a>><<n>><<t>>
-----
-----
-----
-----
[[plant]]
{{clear}}
You have guessed the letters:
h o u s e P l a n t p
house
P<<l>><<a>><<n>><<t>>
<<p>><<l>><<a>><<n>><<t>>
-----
-----
-----
Congratulations! You have guessed the word! Press P to play again.
[[n]]
"""},
  {"title": "Small letters", "sub": "toLowerCase", "bullets": ["'P' and 'p' are different chars", "Make every word small the moment it is read", "The answer, and both places a guess is read"],
   "code": CODE("Wordle.java")},
  {"title": "Checkpoint: the finished game", "checkpoint": True, "file": "Wordle.java",
   "say": "Run it. Type the secret word in capitals and try every bad guess you can think of.",
   "run": """
******************************************
   WELCOME TO WORDLE, a very fun game!
******************************************
This game is for 2 people.
Player 1, please type a 5-letter word: [[PLANT]]
{{clear}}
Now, player 2 can start guessing:
-----
-----
-----
-----
-----
-----
[[hous1]]
Please enter a word of exactly 5 letters
[[coding]]
Please enter a word of exactly 5 letters
[[House]]
{{clear}}
You have guessed the letters:
h o u s e
house
-----
-----
-----
-----
-----
[[plant]]
{{clear}}
You have guessed the letters:
h o u s e p l a n t
house
<<p>><<l>><<a>><<n>><<t>>
-----
-----
-----
-----
Congratulations! You have guessed the word! Press P to play again.
[[n]]
"""},
  {"quiz": [
    {"q": "Why is getValidGuess a while loop and not a for loop?", "options": ["Nobody knows how many tries it will take", "for loops cannot read input", "while loops are faster", "A for loop cannot return"], "answer": 0,
     "why": "A for loop suits a known number of passes; a while loop runs until its condition is false."},
    {"q": "What does Character.isLetter('9') give?", "options": ["false", "true", "9", "An error"], "answer": 0,
     "why": "9 is a digit, not a letter."},
    {"q": "isFiveLetters is worked out before the loop and never inside it. The first guess is hous. What happens?", "options": ["The loop never ends", "The next guess is checked properly", "It will not compile", "The game ends"], "answer": 0,
     "why": "isFiveLetters stays false whatever is typed next."},
    {"q": "What does \"dog\".toCharArray() give?", "options": ["An array of the chars d, o, g", "The String \"dog\"", "3", "An ArrayList"], "answer": 0,
     "why": "It is an array of the word's characters, which for-each can walk."},
    {"q": "Why does the answer get toLowerCase too, not only the guesses?", "options": ["Player 1 might type it in capitals", "toLowerCase makes it shorter", "Java needs it for charAt", "It does not need it"], "answer": 0,
     "why": "PLANT and plant must be the same word, so both sides are made small."},
  ]},
 ],
}

WEEKS = [WEEK_1, WEEK_2, WEEK_3, WEEK_4, WEEK_5, WEEK_6, WEEK_7, WEEK_8, WEEK_9, WEEK_10, WEEK_11, WEEK_12, WEEK_13, WEEK_14, WEEK_15]

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
    elif re.match(r"(public |private )?static [\w<>\[\]]+ \w+\(.*\) \{$", text):
        keys.append("java:method")
    if re.match(r"(public |private )?static (final )?[\w<>\[\]]+ \w+( = .*)?;$", text):
        keys.append("java:staticfield")
    if text.startswith("import "):
        keys.append("java:import")
    if text.endswith(";") and not text.startswith("import"):
        keys.append("java:statement")
    if re.match(r"(final )?(int|String|boolean|double|char)(\[\])* \w+ =", text):
        keys.append("java:variable")
    if re.search(r"\bfinal\b", text):
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
    elif "[]" in text and "String[] args" not in text:
        keys.append("java:array")
    if re.search(r"(?<!new )\b[a-z]\w*\[[^\]]+\]", text):
        keys.append("java:index")
    if re.search(r"\.length\b(?!\()", text):
        keys.append("java:arraylength")
    if "new Random" in text or "random.nextInt" in text:
        keys.append("java:random")
    if text.startswith("return"):
        keys.append("java:return")
    if "toCharArray" in text:
        keys.append("java:tochararray")
    if "isLetter" in text:
        keys.append("java:isletter")
    if re.match(r"([\w<>\[\]]+ )?(\w+ = )?[a-z]\w*\(.*\);$", text):
        keys.append("java:call")
    if re.search(r"\bdouble\b", text):
        keys.append("java:double")
    if re.search(r"\((int|double|char)\) ", text):
        keys.append("java:cast")
    if "StringBuilder" in text:
        keys.append("java:stringbuilder")
    if ".append(" in text:
        keys.append("java:append")
    if "\\u001B" in text:
        keys.append("java:ansi")
    if "ArrayList" in text:
        keys.append("java:arraylist")
    if re.search(r"(guessedLetters|alreadyGuessedWords)\.(contains|add|size|clear|remove)\(", text):
        keys.append("java:listmethods")
    return keys


CONCEPTS = {
    "java:comment": ("java", "Comments", ["// starts a comment: Java ignores the rest of the line.", "Comments are notes for people - usually you, later."], "// Prints my name and my friend's name"),
    "java:class": ("java", "A class", ["All Java code lives inside a class.", "The class name must match the file name: HelloWorld lives in HelloWorld.java.", "Its { opens here and its } is the last line of the file."], "public class HelloWorld {"),
    "java:main": ("java", "The main method", ["Java starts running your program here.", "Copy the line exactly - every word matters.", "Its statements run from top to bottom."], "public static void main(String[] args) {"),
    "java:statement": ("java", "A statement", ["One instruction for the computer.", "It ends with a semicolon ;", "Leave the ; off and Java will not compile the file."], 'System.out.println("Hello world!");'),
    "java:println": ("java", "println", ["Prints what is in the brackets, then moves to a new line.", "System.out is the console."], 'System.out.println("Hello world!");'),
    "java:print": ("java", "print", ["Prints, but stays on the same line.", "Handy for a question: the answer is typed right after it."], 'System.out.print("Enter your age: ");'),
    "java:string": ("java", "A String", ["Text in double quotes.", "Printed exactly as written, spaces and all."], '"Hello world!"'),
    "java:variable": ("java", "A variable", ["A named box that holds a value.", "type  name  =  value;", "Use the name anywhere after this line."], "int age = 15;"),
    "java:final": ("java", "final", ["A constant: once set, it can never change.", "Java refuses to compile a line that tries.", "Constants are named in CAPITALS."], "final int HOURS_IN_DAY = 24;"),
    "java:int": ("java", "int", ["A whole number: 15, 0, -12.", "No decimal point, no quotes."], "int age = 15;"),
    "java:concat": ("java", "Joining with +", ["Once either side of + is a String, + joins.", "Java works left to right.", "Brackets make a sum happen first."], '"My name is " + myName'),
    "java:arith": ("java", "Arithmetic", ["+  -  *  /  and  % (the remainder).", "* and / happen before + and -.", "An int divided by an int throws the fraction away."], "hoursInDay * numberOfDays"),
    "java:import": ("java", "import", ["Borrows a class from Java's library.", "Imports go at the very top of the file."], "import java.util.Scanner;"),
    "java:scanner": ("java", "A Scanner", ["Reads what you type.", "System.in is the keyboard.", "Make one, and use it for every question."], "Scanner input = new Scanner(System.in);"),
    "java:nextline": ("java", "nextLine()", ["Waits for Enter.", "Gives back everything typed on the line, spaces too, as a String."], "String word = input.nextLine();"),
    "java:boolean": ("java", "boolean", ["Holds one of two values: true or false.", "Name it like a yes-or-no question: isStudent."], "boolean isStudent = true;"),
    "java:equals": ("java", ".equals", ["Compares two Strings letter by letter.", "Never compare Strings with ==.", "Capitals count: Y is not y."], 'tuitionAnswer.equals("y")'),
    "java:if": ("java", "if", ["Runs its block only when the condition in brackets is true.", "The block is everything between { and }."], "if (userAge >= 19) {"),
    "java:else": ("java", "else", ["Runs its block only when the if's condition was false.", "Exactly one of the two blocks runs."], "} else {"),
    "java:elseif": ("java", "else if", ["Another condition in the same chain.", "Checked only if everything above it was false.", "The first true condition wins."], "} else if (userAge == 18) {"),
    "java:nextint": ("java", "nextInt()", ["Reads a whole number.", "It leaves the Enter key behind - clear it with input.nextLine() before reading a line."], "int userAge = input.nextInt();"),
    "java:switch": ("java", "switch", ["Picks one case by value.", "Neater than a stack of ifs when one value chooses."], "switch (monthNumber) {"),
    "java:case": ("java", "case", ["One possible value, followed by a colon.", "Its lines run when the value matches."], "case 1:"),
    "java:break": ("java", "break", ["Leave the switch right now.", "Forget it and Java falls into the next case."], "break;"),
    "java:default": ("java", "default", ["Runs when no case matched.", "The switch's safety net."], "default:"),
    "java:or": ("java", "|| (or)", ["True if either side is true.", "Only one side has to be."], 'tuitionAnswer.equals("y") || tuitionAnswer.equals("Y")'),
    "java:and": ("java", "&& (and)", ["True only if both sides are true."], "mark >= 0 && mark < 25"),
    "java:not": ("java", "! (not)", ["Flips true and false.", "!isValidMark is true while isValidMark is false."], "!isValidMark"),
    "java:compare": ("java", "Comparing numbers", ["<  >  <=  >=  ==  !=", "Each gives back true or false.", "One = stores a value; == compares."], "userAge >= 19"),
    "java:while": ("java", "while", ["Repeats its block while the condition is true.", "Checks before every pass.", "Something inside must change the condition."], "while (counter <= 10) {"),
    "java:increment": ("java", "++", ["Adds one to a variable.", "counter++ is short for counter = counter + 1."], "counter++;"),
    "java:tolowercase": ("java", "toLowerCase()", ["Makes every letter small.", "Gives back a new String - the old one is unchanged."], '"Hello, world".toLowerCase()  is  "hello, world"'),
    "java:length": ("java", "length()", ["How many characters a String has.", "Spaces and commas count too."], '"Hello, world".length()  is  12'),
    "java:for": ("java", "for", ["A counting loop: start; keep going while; step.", "The same as a while with a counter, on one line."], "for (int index = 0; index < shoppingList.length; index++) {"),
    "java:char": ("java", "char", ["A single character, in single quotes: 'A'.", "chars are compared with ==."], "char initial = 'A';"),
    "java:charat": ("java", "charAt(index)", ["The character at a position.", "Positions start at 0.", "The last is at length() - 1."], '"Hello, world".charAt(0)  is  \'H\''),
    "java:indexof": ("java", "indexOf", ["Where something starts in a String.", "-1 means it is not there at all."], '"Hello, world".indexOf("world")  is  7'),
    "java:touppercase": ("java", "toUpperCase()", ["Makes every letter a capital.", "Gives back a new String."], '"Hello, world".toUpperCase()  is  "HELLO, WORLD"'),
    "java:array": ("java", "An array", ["Many values of one type under one name.", "Its size is fixed when it is made.", "String[] means an array of Strings."], "String[] shoppingList = new String[5];"),
    "java:index": ("java", "An index", ["Square brackets pick one element.", "Counting starts at 0.", "An index past the end crashes the program."], 'shoppingList[0] = "Milk";'),
    "java:arraylength": ("java", ".length on an array", ["How many elements an array has.", "No brackets - unlike a String's length()."], "shoppingList.length"),
    "java:random": ("java", "Random", ["Makes random numbers.", "nextInt(100) gives 0 to 99 - never 100.", "+ 1 moves it to 1 to 100."], "random.nextInt(100) + 1"),
    "java:foreach": ("java", "for-each", ["Visits every element in turn.", "Read it as: for each item in shoppingList.", "No index to manage."], "for (String item : shoppingList) {"),
    "java:method": ("java", "A method", ["A named piece of code that does one job.", "static  returnType  name(parameters)", "It lives in the class, outside main. void means it gives nothing back."], "public static void myFirstMethod() {"),
    "java:call": ("java", "Calling a method", ["Write its name and the values it needs, in brackets.", "Its code runs, then Java comes back to the next line.", "What it returns takes the call's place."], "myFirstMethod();"),
    "java:return": ("java", "return", ["Hands a value back to whoever called the method.", "Ends the method at once."], "return sum;"),
    "java:tochararray": ("java", "toCharArray()", ["Turns a String into an array of chars.", "Handy with a for-each loop."], "for (char letter : word.toCharArray()) {"),
    "java:isletter": ("java", "Character.isLetter", ["True if a char is a letter.", "False for digits, spaces and symbols."], "Character.isLetter('9')  is  false"),
    "java:2darray": ("java", "A 2D array", ["An array of arrays: a grid.", "matrix[row][column] is one element.", "Both count from 0."], "int[][] matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}};"),
    "java:double": ("java", "double", ["A number with a decimal point.", "Use it when a fraction matters."], "double height = 1.75;"),
    "java:cast": ("java", "A cast", ["Changes a value's type for one use.", "(int) cuts a fraction off - it does not round.", "(double) before a division keeps the fraction."], "(int) average"),
    "java:printf": ("java", "printf", ["Prints with a pattern.", "%4d: a whole number, four characters wide, so columns line up.", "It does not end the line."], 'System.out.printf("%4d", row * column);'),
    "java:staticfield": ("java", "A field", ["A variable declared in the class, outside every method.", "Every method in the class can use it.", "A variable made inside a method is local to that method."], "public static Scanner input;"),
    "java:stringbuilder": ("java", "StringBuilder", ["A String that can grow.", "A String is immutable - it never changes.", "toString() gives the finished String."], "StringBuilder coloredGuess = new StringBuilder(maxWordLength);"),
    "java:append": ("java", "append", ["Adds to the end of a StringBuilder.", "The same StringBuilder, one piece longer."], "coloredGuess.append(userGuessChar);"),
    "java:ansi": ("java", "Console codes", ["\\u001B is the escape character.", "The console reads escape then [32m as switch to green, and [H[2J as clear the screen.", "[0m switches back to normal."], '"\\u001B[32m"'),
    "java:arraylist": ("java", "ArrayList", ["A list that grows as you add to it.", "ArrayList<Character> holds chars; ArrayList<String> holds Strings.", "Import it from java.util."], "private static ArrayList<Character> guessedLetters = new ArrayList<Character>();"),
    "java:listmethods": ("java", "List methods", ["add(item) puts it on the end; remove(index) takes one out.", "contains(item) is true if it is there.", "size() says how many; clear() empties it."], "guessedLetters.add(userGuessChar);"),
}

VISUALS = {
    "java:statement": {"kind": "tiles", "parts": ["System.out.println", '("Hello world!")', ";"],
                       "cap": "What to do, what to do it with, and a semicolon to end it."},
    "java:variable": {"kind": "box", "name": "age", "value": "15",
                      "cap": "A variable is a labelled box holding one value."},
    "java:final": {"kind": "box", "name": "final HOURS_IN_DAY", "value": "24",
                   "cap": "final seals the box: its value can never change."},
    "java:concat": {"kind": "glue", "a": '"My name is "', "b": "myName", "out": '"My name is Joshua"',
                    "cap": "+ glues text together into one String."},
    "java:scanner": {"kind": "network", "from": "keyboard", "to": "program",
                     "cap": "A Scanner carries what you type into the program."},
    "java:nextline": {"kind": "machine", "in": "racecar + Enter", "label": "nextLine()", "out": '"racecar"',
                      "cap": "nextLine waits for Enter and gives back the typed text."},
    "java:boolean": {"kind": "swap", "off": "false", "on": "true",
                     "cap": "A boolean is a switch with two positions."},
    "java:if": {"kind": "fork", "cond": "userAge >= 19", "yes": "run the block", "no": "skip it",
                "cap": "The block runs only on the true branch."},
    "java:else": {"kind": "fork", "cond": "userAge >= 19", "yes": "the if block", "no": "the else block",
                  "cap": "if / else: exactly one of the two blocks runs."},
    "java:switch": {"kind": "pick", "items": ["case 1", "case 2", "case 3"], "at": 1, "label": "monthNumber = 2",
                    "cap": "switch jumps straight to the case that matches."},
    "java:while": {"kind": "loop", "items": ["1", "2", "3", "...", "10"],
                   "cap": "Round and round while the condition stays true."},
    "java:for": {"kind": "loop", "items": ["0", "1", "2", "3", "4"],
                 "cap": "index visits 0, 1, 2, 3, 4 - then the loop stops."},
    "java:tolowercase": {"kind": "machine", "in": '"Hello, world"', "label": ".toLowerCase()", "out": '"hello, world"',
                         "cap": "Every letter comes out small."},
    "java:charat": {"kind": "pick", "items": ["H", "e", "l", "l", "o"], "at": 0, "label": "charAt(0)",
                    "cap": "charAt(0) picks the FIRST character - counting starts at zero."},
    "java:indexof": {"kind": "fork", "cond": "indexOf(...) >= 0", "yes": "it is there", "no": "-1: not there",
                     "cap": "indexOf gives a position, or -1 when it is missing."},
    "java:array": {"kind": "loop", "items": ["Milk", "Celery", "Tomatoes", "Apples", "Eggs"],
                   "cap": "An array holds many values in a row, in order."},
    "java:index": {"kind": "pick", "items": ["Milk", "Celery", "Tomatoes", "Apples", "Eggs"], "at": 0, "label": "shoppingList[0]",
                   "cap": "[0] picks the first element."},
    "java:arraylength": {"kind": "tiles", "parts": ["shoppingList", ".length", "= 5"],
                         "cap": ".length says how many elements the array has."},
    "java:foreach": {"kind": "loop", "items": ["Milk", "Celery", "Tomatoes", "Apples", "Eggs"],
                     "cap": "Each element in turn, no index needed."},
    "java:method": {"kind": "tiles", "parts": ["public static", "void", "myFirstMethod()", "{"],
                    "cap": "Who can use it, what it gives back, its name, and its body."},
    "java:return": {"kind": "machine", "in": "5, 10", "label": "return sum;", "out": "15",
                    "cap": "return hands the answer back out of the method."},
    "java:2darray": {"kind": "card", "rows": [("matrix[0]", "1 2 3 4"), ("matrix[1]", "5 6 7 8"), ("matrix[2]", "9 10 11 12")],
                     "cap": "Each row of the grid is an array of its own."},
    "java:cast": {"kind": "machine", "in": "21.133333333333336", "label": "(int)", "out": "21",
                  "cap": "(int) cuts the fraction off. It does not round."},
    "java:stringbuilder": {"kind": "glue", "a": '"pl"', "b": "'a'", "out": '"pla"',
                           "cap": "A StringBuilder grows in place, one append at a time."},
    "java:arraylist": {"kind": "arr-add", "items": ["h", "o"], "end": "right", "incoming": "u",
                       "cap": "add puts a new item on the end - the list grows."},
}
