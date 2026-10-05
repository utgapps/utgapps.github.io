"""PY102 - Platformer. The whole course as one data structure.

This is the only file to edit. ../pxp101/build.py replays WEEKS to produce the
playable milestones, the teacher curriculum, the textbook, the homework book
and the slides, so none of them can drift apart. Run `python build.py` here.

WHERE THIS COMES FROM

The UTG PY102 guide: fifteen days and a set of extra tasks building a
platformer in PixelPad - Pixelhead runs and jumps across grass platforms,
stomps wasps, and steps through portals into the next level. The game, its
classes and its order are the guide's. Day 8 is a review day and day 9 a
practice activity for the jump timer; here they are the talk at the start of
weeks 7 and 8. The guide's extra tasks - health, hearts and restarting - are
weeks 14 and 15.

WHAT CHANGED FROM THE GUIDE, AND WHY

  * The guide builds everything in Game start and moves it all into a Level1
    room on day 14 with copy, paste and delete. Here the Level1 room exists
    from week 1, so nothing is typed twice.
  * The guide places four wasps in the corners, then moves them, then deletes
    two; adds arrowUp and arrowDown movement that gravity deletes on day 6;
    writes self.x = self.x - 3 and replaces it with a speed; and prints values
    to the console and deletes the print. Here every line is written once,
    where it will stay. The rewrites kept are the ones that ARE the lesson:
    the instant jump that becomes a timer (week 8), the jump that learns to
    check the ground (week 9), the floor check that learns to look down
    (week 11), the portal that learns its own destination (week 13) and the
    sting that costs a life instead of the whole game (week 14).
  * The guide destroys the player and rebuilds three hearts by hand in two
    places, about forty lines. Here Game loop watches the health and restarts
    Level1 itself, and each heart hides when the health falls below its own
    number - the same game in a dozen lines, and nothing is destroyed and
    rebuilt.
  * The level is laid out so each lesson can be seen. The high platform is
    100 above the grass with a gap in front of it: walk off the grass and
    Pixelhead catches on its side and walks along inside it, which is the bug
    week 11 fixes. The wasps fly at y 200, out of reach of anyone standing,
    so a sting only ever comes from jumping up into one, and a stomp means
    jumping from the high ground and landing on top.
  * The guide uses new_object('Player') and new_sprite(...). This uses
    Player() and sprite(...), as PY101 does - the same calls, the form the
    engine documents, and the one the classroom editor runs.
"""

import re

import pixelpad

COURSE_CODE = "PY102"
TOOL = "py102"
AUDIENCE = "eleven-to-thirteen-year-olds"

# The guide's busiest day types about twenty lines. A week may not add more.
WEEK_LINE_CAP = 20
# One step shows at most this many lines before it stops to explain.
MAX_STEP_LINES = 6
# Indentation and one-line ifs - see pixelpad.check_python_rules.
check_code_rules = pixelpad.check_python_rules

DRAW_SIZE_NOTE = ("Draw it at this size. Draw the wasp facing LEFT and Pixelhead facing "
                  "RIGHT - the code flips them to face the way they move.")

CODE_HEADS = {"get_collision": "get_collision()", "key_is_pressed": "key_is_pressed()",
              "key_was_pressed": "key_was_pressed()", "destroy": "destroy()",
              "text": "text()", "set_room": "set_room()"}

COURSE_TITLE = "PY102 · Platformer"
COURSE_BLURB = (
    "Fifteen weeks building a platformer in Python. Pixelhead runs, falls, jumps and "
    "lands; wasps patrol the sky; portals lead to the next level. You write every line "
    "- gravity included."
)
PROJECT_BLURB = (
    "A two-level platformer. Run with the arrow keys, jump with space, stomp wasps from "
    "above and dodge them from below, and step through the portals to win - with three "
    "hearts, and a fresh start when you lose them."
)

TOTAL_WEEKS = 15

# The finished game is about 150 lines. This is the ceiling, not a target.
LINE_BUDGET = 200
BONUS_BUDGET = 60

DISCLAIMER = """
<p><strong>Nothing here needs the internet except the code editor itself.</strong> The
game runs entirely in the browser - there is no server, no account and no API key anywhere
in this course.</p>
<p><strong>The students draw the art.</strong> Every sprite is listed with the exact size
to draw it. The generated games use plain coloured rectangles as stand-ins so the code can
be tested; they are meant to be replaced.</p>
"""

TEACHER_PREAMBLE = """
<p><strong>Ask before you tell.</strong> The guide this course comes from is built on
questions - which class does this belong to, start or loop, why did that happen - and every
hour here keeps at least three of them. Let a student answer before the slide does.</p>
<p><strong>Let the bugs happen.</strong> Several steps are typed so that something goes
wrong on purpose: Pixelhead falls through the floor, flies off the top, jumps in mid-air,
lands inside a platform. The book says what they should see. Ask why before you fix it -
that conversation is the lesson.</p>
<p><strong>Indentation is the rule to be strict about.</strong> Four spaces, only after a
line ending in a colon, and eight for an if inside an if. Most errors are a missing colon,
a missing <code>self.</code> or a capital letter: read the red message together and find
its line.</p>
<p><strong>Pacing.</strong> A week that runs long drops its bonus, never its Play moments.
Weeks 4, 12 and 15 are the busiest; give them the whole hour. Students who have not
finished PY101 will need week 3's talk about start and loop slowed right down.</p>
"""


def TALK(at, title, *body, ask=None):
    """A stretch of talking, showing or arguing. No typing."""
    return {"kind": "talk", "at": at, "title": title, "body": list(body), "ask": ask}


def STEP(panel, block, title, notes, at=None, ask=None):
    """A stretch of typing. The block is split into pieces of at most six lines
    and each piece needs one note. build.py tells you the piece count."""
    return {"kind": "step", "at": at, "file": panel, "block": block,
            "title": title, "notes": notes, "ask": ask}


def ADD(panel, block, lines):
    return ("add", panel, block, lines)


def SET(panel, block, lines):
    return ("set", panel, block, lines)


# --- the code panels -------------------------------------------------------
GAME_START, GAME_LOOP = "Game start", "Game loop"
PLAYER_START, PLAYER_LOOP = "Player start", "Player loop"
WASP_START, WASP_LOOP = "FlyEnemy start", "FlyEnemy loop"
BACK_START = "Background start"
FLOOR_START = "Floor start"
PORTAL_START, PORTAL_LOOP = "Portal start", "Portal loop"
HEART_START, HEART_LOOP = "Heart start", "Heart loop"
LEVEL1_START = "Level1 start"
LEVEL2_START = "Level2 start"
WIN_START = "Win start"

PANELS = [GAME_START, GAME_LOOP,
          PLAYER_START, PLAYER_LOOP,
          WASP_START, WASP_LOOP,
          BACK_START,
          FLOOR_START,
          PORTAL_START, PORTAL_LOOP,
          HEART_START, HEART_LOOP,
          LEVEL1_START,
          LEVEL2_START,
          WIN_START]

# Level1 is there from week 1; Level2 arrives in week 12 and Win in week 13.
ROOMS = ["Level1", "Level2", "Win"]

ORDER = {
    # Health and the hearts go ABOVE week 1's set_room line: the room is
    # entered last, once everything the whole game keeps is ready.
    GAME_START: ["health", "hearts", "setup"],
    GAME_LOOP: ["restart"],
    PLAYER_START: ["look", "speed", "jumpTimer", "onGround"],
    PLAYER_LOOP: ["walk", "gravity", "floor", "jump", "rise", "countdown", "enemies", "fall"],
    WASP_START: ["look", "speed", "scale"],
    WASP_LOOP: ["fly", "turn"],
    BACK_START: ["look"],
    FLOOR_START: ["look"],
    PORTAL_START: ["look", "destination"],
    PORTAL_LOOP: ["travel"],
    HEART_START: ["look", "keep"],
    HEART_LOOP: ["show"],
    # The background is made first so it is drawn first, at the back - which
    # is why week 4 types it at the very top, above weeks 1 and 2.
    LEVEL1_START: ["back", "player", "wasps", "floors", "upper", "portal"],
    LEVEL2_START: ["back", "player", "floors", "top", "portal"],
    WIN_START: ["message"],
}

# name -> (stand-in colour, width, height) as the student draws it.
SPRITES = {
    "pixelhead.png": ("orange", 60, 80),
    "wasp.png": ("yellow", 80, 64),
    "coast.png": ("cyan", 1280, 720),
    "grassTile.png": ("green", 100, 100),
    "portal.png": ("purple", 80, 120),
    "heart.png": ("red", 40, 40),
}


WEEKS = [

# ---------------------------------------------------------------- week 1 ----
{
 "n": 1,
 "title": "Meet Pixelhead",
 "big_idea": "Every game is built from objects. Today you make a Player [[class]], give it a [[sprite]], and put Pixelhead into your first [[room]], Level1.",
 "new_concepts": ["class", "object", "sprite", "room", "start"],
 "draw": ["pixelhead.png"],
 "objectives": [
   "Say what a [[class]] is, and what an [[object]] made from it is",
   "Give a class its picture with [[sprite]]()",
   "Make an object inside a [[room]] and see it appear",
   "Read a red error message and find the line it names",
 ],
 "ops": [
  ADD(GAME_START, "setup", [
    "set_room('Level1')",
  ]),
  ADD(PLAYER_START, "look", [
    "self.image = sprite('pixelhead.png')",
  ]),
  ADD(LEVEL1_START, "player", [
    "self.player = Player()",
  ]),
 ],
 "flow": [
  TALK("0:00", "Play the game you are going to build",
       "<p>Open the week 15 page and play the finished Platformer on the board for two "
       "minutes. Run with the arrow keys, jump with space, stomp a wasp, fall off the edge "
       "once.</p>",
       "<p>Say the promise: <em>every line of that game, you are going to write.</em></p>",
       ask=("What different things can you see on the screen?",
            "Pixelhead, wasps, grass, a portal, hearts - each one is a different class")),
  TALK("0:08", "Classes and objects",
       "<p>A [[class]] is a kind of thing - a recipe. An [[object]] is one thing made from "
       "it. Floor is a class; every grass tile on the screen is a Floor object.</p>",
       "<p>In the editor, make a class called <strong>Player</strong> and a room called "
       "<strong>Level1</strong>. Capitals matter, and Level1 has no space.</p>",
       ask=("If Floor is the class, what is each grass tile?",
            "An object - one thing made from the Floor class")),
  TALK("0:14", "Draw Pixelhead",
       "<p>Make <code>pixelhead.png</code> at 60 by 80, facing RIGHT. Ten minutes at most - "
       "the art can be improved any week.</p>"),
  STEP(GAME_START, "setup", "Pick the first room",
       ["A [[room]] is one screen of your game. This line, in Game start, picks the room to "
        "show first: Level1."],
       at="0:25"),
  STEP(PLAYER_START, "look", "Give Pixelhead a picture",
       ["[[start]] runs ONCE, the moment a Player is made. <code>sprite('pixelhead.png')</code> "
        "finds the picture you drew and makes it this player's image."],
       at="0:28",
       ask=("Why does this go in start and not loop?", "The picture only needs to be set once")),
  STEP(LEVEL1_START, "player", "Make Pixelhead",
       ["<code>Player()</code> makes one player. <code>self.player</code> is the name the room "
        "keeps it under, so you can talk to it later. Press Play - Pixelhead is in the middle "
        "of the screen."],
       at="0:34",
       ask=("Where on the screen does Pixelhead appear, and why there?",
            "In the middle - nobody has said where to go, so it starts at 0, 0")),
  TALK("0:44", "Show each other",
       "<p>Everyone turns their screen to a neighbour for thirty seconds. Every Pixelhead is "
       "different, and that is the point.</p>"),
 ],
 "errors": [
   ("Nothing appears", "Level1 start is empty, or the class name has a typo. Player() must match the class name exactly, capital P included."),
   ("A grey box instead of your picture", "The picture is not called pixelhead.png. The name in sprite('pixelhead.png') and the sprite's own name must match, .png included."),
   ("NameError: name 'Level1' is not defined", "The room must be called Level1 exactly - capital L, no space."),
   ("The screen stays blank and there is no error", "Game start must say set_room('Level1'), and Pixelhead is made in Level1 start, not Level1 loop."),
 ],
 "recap": [
   "A [[class]] is a kind of thing; an [[object]] is one thing made from it.",
   "[[start]] runs once, the moment an object is made.",
   "[[sprite]]() puts the picture you drew onto an object.",
   "Player() makes one player; self.player is the name the room keeps it under.",
 ],
 "homework": [
   {"task": "Make Pixelhead yours", "detail": "Redraw pixelhead.png as a character you would want to play. Keep it 60 by 80, facing right.", "done": "You press Play and your own character is on the screen."},
   {"task": "Name the classes", "detail": "Write down every class you saw in the finished game, and one thing each one does.", "done": "You have a list of at least five classes."},
 ],
 "bonus": {"title": "Two of you",
           "body": "<p>Under the player line in <strong>Level1 start</strong>, add "
                   "<code>self.player2 = Player()</code>. Press Play. How many can you see? "
                   "(Two - in exactly the same spot. Take it out again: next week you learn "
                   "to move things.)</p>"},
 "slides": [
   {"title": "Platformer", "sub": "The game you are going to build", "bullets": [
     "Run with the arrow keys", "Jump with space", "Stomp the wasps", "Step through the portal"]},
   {"title": "Classes and objects", "sub": "One recipe, many things", "bullets": [
     "A class is a kind of thing: Player, Floor", "An object is one thing made from it",
     "Every grass tile is a Floor object"]},
   {"title": "Draw Pixelhead", "sub": "pixelhead.png - 60 x 80", "bullets": [
     "Facing RIGHT", "Exactly that name", "You can redraw it any week"]},
   {"title": "Pick the first room", "bullets": [], "code": [(GAME_START, "setup")]},
   {"title": "Give Pixelhead a picture", "bullets": [], "code": [(PLAYER_START, "look")]},
   {"title": "Checkpoint: no errors", "checkpoint": True,
    "say": "Press Play. The screen is empty and there is no red error. Nobody has MADE a player yet."},
   {"title": "Make Pixelhead", "bullets": [], "code": [(LEVEL1_START, "player")]},
   {"title": "Checkpoint: Pixelhead is here", "checkpoint": True,
    "say": "Press Play. Pixelhead stands in the middle of the screen."},
 ],
},

# ---------------------------------------------------------------- week 2 ----
{
 "n": 2,
 "title": "Wasps in the sky",
 "big_idea": "Every spot on the screen has an address. Today you learn the [[x and y|coordinates]] grid, make a FlyEnemy class, and use the [[dot]] to put two wasps exactly where you want them.",
 "new_concepts": ["x and y", "the dot", "variables"],
 "draw": ["wasp.png"],
 "objectives": [
   "Find a spot on the screen from its [[x and y|coordinates]]",
   "Say what a [[variable]] is: a name that holds a value",
   "Use the [[dot]] to change an object from inside the room",
   "Make two objects from one class",
 ],
 "ops": [
  ADD(WASP_START, "look", [
    "self.image = sprite('wasp.png')",
  ]),
  ADD(LEVEL1_START, "wasps", [
    "self.wasp1 = FlyEnemy()",
    "self.wasp1.x = 300",
    "self.wasp1.y = 200",
    "self.wasp2 = FlyEnemy()",
    "self.wasp2.x = -300",
    "self.wasp2.y = 200",
  ]),
 ],
 "flow": [
  TALK("0:00", "The grid",
       "<p>Draw the screen on the board as a grid. The middle is (0, 0). x runs from -640 on "
       "the left to 640 on the right; y from -360 at the bottom to 360 at the top. Plus y is "
       "UP, the way it is in maths class.</p>",
       ask=("Where is the point (300, 200)?", "Right of the middle, high up")),
  TALK("0:07", "Names that hold things",
       "<p>A [[variable]] is a name with a value in it. In <code>self.wasp1 = FlyEnemy()</code> "
       "the name is on the left and the value - a brand-new wasp - is on the right.</p>",
       "<p>The [[dot]] is like an apostrophe-s: <code>self.wasp1.x</code> is <em>wasp1's "
       "x</em>.</p>",
       ask=("How would you say self.wasp1.x out loud?", "wasp1's x - the x that belongs to wasp1")),
  TALK("0:12", "Draw a wasp",
       "<p>Make a class called <strong>FlyEnemy</strong> and draw <code>wasp.png</code> at 80 "
       "by 64, facing LEFT. Next week it flies left, so that is the way it should look.</p>"),
  STEP(WASP_START, "look", "Give the wasp its picture",
       ["The wasp gets its picture, the same way Pixelhead did."],
       at="0:20"),
  STEP(LEVEL1_START, "wasps", "Put two wasps in the sky",
       ["Under the player line: make a wasp, and use the dot to move it right 300 and up 200. "
        "Then a second wasp, the same height, on the left. Press Play."],
       at="0:23",
       ask=("Both wasps come from one class. How can they be in different places?",
            "Each object has its own x and y")),
  TALK("0:38", "Play with the numbers",
       "<p>Let them move the wasps to every corner and back, then return them to 300 and "
       "-300. A student who can say where (-600, 300) is has the grid.</p>"),
 ],
 "errors": [
   ("Only one wasp", "Both wasps need their own name: self.wasp1 and self.wasp2. Using the same name twice moves the first one."),
   ("AttributeError mentioning 'wasp1'", "The lines spell it differently. self.wasp1 must be spelled the same way every time."),
   ("A wasp went off the screen", "x only goes to about 640 and y to about 360. Check your numbers are inside the grid."),
   ("NameError: name 'FlyEnemy' is not defined", "The class must be called FlyEnemy exactly - capital F and capital E."),
 ],
 "recap": [
   "The middle of the screen is x 0, y 0. Plus y is up, minus y is down.",
   "A [[variable]] is a name holding a value - self.wasp1 holds one wasp.",
   "The [[dot]] reaches inside an object: self.wasp1.x is wasp1's x.",
   "One class can make as many objects as you like, each with its own x and y.",
 ],
 "homework": [
   {"task": "Map the screen", "detail": "Move one wasp to each corner of the screen, one at a time, and write down the x and y you used.", "done": "You have four pairs of numbers, one for each corner."},
   {"task": "Read it out loud", "detail": "Write self.wasp2.y = 200 as an English sentence.", "done": "Something like: set wasp2's y to 200."},
 ],
 "bonus": {"title": "A third wasp",
           "body": "<p>Add <code>self.wasp3</code> under the others, at x 0 and y 300. Press "
                   "Play. Keep it or take it out - the wasps learn to fly next week.</p>"},
 "slides": [
   {"title": "The grid", "sub": "x from -640 to 640 - y from -360 to 360", "bullets": [
     "The middle is 0, 0", "Plus x is right, minus x is left", "Plus y is up, minus y is down"]},
   {"title": "Names that hold things", "sub": "self.wasp1 = FlyEnemy()", "bullets": [
     "A variable is a name with a value in it", "The name goes on the left of =",
     "The dot is an apostrophe-s: wasp1's x"]},
   {"title": "Draw a wasp", "sub": "wasp.png - 80 x 64", "bullets": [
     "Make a class called FlyEnemy", "Facing LEFT"]},
   {"title": "Give the wasp its picture", "bullets": [], "code": [(WASP_START, "look")]},
   {"title": "Put two wasps in the sky", "bullets": [], "code": [(LEVEL1_START, "wasps")]},
   {"title": "Checkpoint: two wasps", "checkpoint": True,
    "say": "Press Play. Pixelhead is in the middle, a wasp high up on each side."},
 ],
},

# ---------------------------------------------------------------- week 3 ----
{
 "n": 3,
 "title": "Things that move",
 "big_idea": "Start runs once; loop runs forever. Today the wasps fly with [[loop]], and Pixelhead walks left and right while you hold the arrow keys.",
 "new_concepts": ["loop", "changing a value", "if", "key_is_pressed()"],
 "objectives": [
   "Say the difference between [[start]] and [[loop]]",
   "Read self.x = self.x + self.speed out loud and say what it does",
   "Use [[if]] and [[key_is_pressed]] to move only while a key is held",
   "Indent the line under an if by four spaces",
 ],
 "ops": [
  ADD(WASP_START, "speed", [
    "self.speed = -3",
  ]),
  ADD(WASP_LOOP, "fly", [
    "self.x = self.x + self.speed",
  ]),
  ADD(PLAYER_START, "speed", [
    "self.speed = 5",
  ]),
  ADD(PLAYER_LOOP, "walk", [
    "if key_is_pressed('arrowRight'):",
    "    self.x = self.x + self.speed",
    "if key_is_pressed('arrowLeft'):",
    "    self.x = self.x - self.speed",
  ]),
 ],
 "flow": [
  TALK("0:00", "Start and loop",
       "<p>[[start]] runs once, when the object is made. [[loop]] runs again and again, about "
       "sixty times every second, until the object is gone.</p>",
       ask=("If start only runs once, how could anything ever move?",
            "Something has to run again and again - that is loop")),
  STEP(WASP_START, "speed", "Give the wasp a speed",
       ["<code>self.speed</code> is how far this wasp moves each loop. Minus 3 means 3 steps "
        "to the LEFT. Nothing uses it yet."],
       at="0:05"),
  TALK("0:08", "Changing a value",
       "<p>Write <code>self.x = self.x + self.speed</code> on the board. Python works out the "
       "RIGHT side first - my x, plus my speed - then stores the answer back into x.</p>",
       "<p>Count it through from 300 with a speed of -3: 297, 294, 291...</p>",
       ask=("x is 300 and speed is -3. What is x after two loops?", "294")),
  STEP(WASP_LOOP, "fly", "Make the wasps fly",
       ["In FlyEnemy loop, so it happens every loop: add the speed to x. Press Play - both "
        "wasps fly off to the left."],
       at="0:14",
       ask=("Why do both wasps move, when you wrote this once?",
            "Every FlyEnemy runs the same loop")),
  STEP(PLAYER_START, "speed", "Give Pixelhead a speed",
       ["Pixelhead's own speed: 5 steps a loop."],
       at="0:20"),
  TALK("0:22", "if means only when",
       "<p>[[key_is_pressed('arrowRight')|key_is_pressed]] is a question: is that key held "
       "down right now? An [[if]] runs the lines under it only when the answer is yes.</p>",
       "<p>The if line ends with a colon. The line under it is pushed in four spaces - that "
       "is how Python knows it belongs to the if.</p>"),
  STEP(PLAYER_LOOP, "walk", "Walk left and right",
       ["Only while the right arrow is held, add the speed to x. Only while the left arrow is "
        "held, take it away. Click the game, then hold the arrows."],
       at="0:28",
       ask=("Why does the right arrow ADD to x?", "Plus x is to the right")),
  TALK("0:42", "Try the numbers",
       "<p>Have them try a wasp speed of -1 and -8, and a player speed of 2 and 12. Then put "
       "them back to -3 and 5.</p>"),
 ],
 "errors": [
   ("The wasps do not move", "The flying line is in FlyEnemy start. start runs once - it belongs in FlyEnemy loop."),
   ("IndentationError", "The line under each if must be pushed in four spaces, and the if line must end with a colon."),
   ("The arrow keys do nothing", "Click on the game first so it hears the keyboard. Then check the key is spelled 'arrowRight' with a capital R."),
   ("NameError: name 'speed' is not defined", "Every speed needs self. in front - self.speed in start AND in loop."),
 ],
 "recap": [
   "[[loop]] runs about sixty times every second.",
   "self.x = self.x + self.speed takes the old x, changes it, and stores it back.",
   "A minus speed moves left; a plus speed moves right.",
   "[[if]] [[key_is_pressed]]('arrowRight'): runs the pushed-in line only while the key is held.",
 ],
 "homework": [
   {"task": "Read it out loud", "detail": "Write self.x = self.x - self.speed as an English sentence.", "done": "Something like: take my speed off my x and keep the answer as my new x."},
   {"task": "Count it", "detail": "Pixelhead starts at x 0 with speed 5. Where is it after holding right for one second (60 loops)?", "done": "x is 300."},
 ],
 "bonus": {"title": "A slower wasp",
           "body": "<p>Give <code>self.wasp2</code> its own speed from <strong>Level1 start</strong>: "
                   "under its lines, add <code>self.wasp2.speed = -1</code>. Why does that one "
                   "wasp fly slower? (The room sets it after the wasp's start already set -3.)</p>"},
 "slides": [
   {"title": "start once, loop forever", "bullets": [
     "start runs one time, when the object is made", "loop runs about 60 times a second",
     "Anything that moves lives in loop"]},
   {"title": "Give the wasp a speed", "bullets": [], "code": [(WASP_START, "speed")]},
   {"title": "Changing a value", "sub": "self.x = self.x + self.speed", "bullets": [
     "Python works out the right side first", "Then stores the answer on the left",
     "300, 297, 294, 291..."]},
   {"title": "Make the wasps fly", "bullets": [], "code": [(WASP_LOOP, "fly")]},
   {"title": "Checkpoint: away they go", "checkpoint": True,
    "say": "Press Play. Both wasps fly off the left side of the screen."},
   {"title": "Give Pixelhead a speed", "bullets": [], "code": [(PLAYER_START, "speed")]},
   {"title": "if means only when", "sub": "if key_is_pressed('arrowRight'):", "bullets": [
     "The question goes after if", "The line ends with a colon",
     "The line under it is pushed in four spaces"]},
   {"title": "Walk left and right", "bullets": [], "code": [(PLAYER_LOOP, "walk")]},
   {"title": "Checkpoint: walk", "checkpoint": True,
    "say": "Press Play, click the game and hold the arrows. Pixelhead walks left and right."},
 ],
},

# ---------------------------------------------------------------- week 4 ----
{
 "n": 4,
 "title": "A world to stand in",
 "big_idea": "Pixelhead should face the way it walks, and stand on something. Today a minus [[scaleX|scale]] flips the picture, a background goes up behind everything, and grass tiles make the first floor.",
 "new_concepts": ["scaleX", "flipping", "draw order"],
 "draw": ["coast.png", "grassTile.png"],
 "objectives": [
   "Flip a picture with a minus [[scaleX|scale]]",
   "Explain why the background is made first",
   "Make three objects from one class in a row",
   "Say where a new line goes inside a block that is already there",
 ],
 "ops": [
  SET(PLAYER_LOOP, "walk", [
    "if key_is_pressed('arrowRight'):",
    "    self.x = self.x + self.speed",
    "    self.scaleX = 1",
    "if key_is_pressed('arrowLeft'):",
    "    self.x = self.x - self.speed",
    "    self.scaleX = -1",
  ]),
  ADD(BACK_START, "look", [
    "self.image = sprite('coast.png')",
  ]),
  ADD(LEVEL1_START, "back", [
    "self.background = Background()",
  ]),
  ADD(FLOOR_START, "look", [
    "self.image = sprite('grassTile.png')",
  ]),
  ADD(LEVEL1_START, "floors", [
    "self.floor1 = Floor()",
    "self.floor1.x = -100",
    "self.floor1.y = -100",
    "self.floor2 = Floor()",
    "self.floor2.x = 0",
    "self.floor2.y = -100",
    "self.floor3 = Floor()",
    "self.floor3.x = 100",
    "self.floor3.y = -100",
  ]),
 ],
 "flow": [
  TALK("0:00", "Moonwalking",
       "<p>Walk Pixelhead left. It slides backwards, still facing right. Ask how we could "
       "turn it around.</p>",
       "<p>[[scaleX|scale]] stretches a picture sideways: 1 is the size you drew. -1 is the "
       "same size, flipped like a mirror.</p>",
       ask=("What would scaleX = -1 do to the picture?", "Flip it to face the other way")),
  STEP(PLAYER_LOOP, "walk", "Face the way you walk",
       ["Two new lines, one inside each if - under the line that moves you. Walking right, "
        "face right: 1. Walking left, flip: -1. Four spaces in front of both."],
       at="0:06",
       ask=("Why does each scaleX line need four spaces?",
            "It should only happen while that key is held - it belongs to the if")),
  TALK("0:14", "Draw the world",
       "<p>Make a class called <strong>Background</strong> and draw <code>coast.png</code> at "
       "1280 by 720 - the whole screen. Make a class called <strong>Floor</strong> and draw "
       "<code>grassTile.png</code> at 100 by 100.</p>"),
  STEP(BACK_START, "look", "Give the background its picture",
       ["The background's picture."],
       at="0:24"),
  TALK("0:26", "Made first, drawn at the back",
       "<p>Objects are drawn in the order they are made. Make the background last and it is "
       "painted on top of everything - a wall covering the game.</p>",
       ask=("Where in Level1 start should the background be made?",
            "At the very top, before anything else")),
  STEP(LEVEL1_START, "back", "Put up the background",
       ["At the VERY TOP of Level1 start, above the player line: make the background first, "
        "so it is drawn behind everything. Press Play."],
       at="0:30"),
  STEP(FLOOR_START, "look", "Give the floor its picture",
       ["The grass tile's picture."],
       at="0:33"),
  STEP(LEVEL1_START, "floors", "Lay three grass tiles",
       ["At the bottom of Level1 start: three tiles in a row, 100 apart, all at y -100.",
        "The third tile, on the right. Press Play - a strip of grass under Pixelhead."],
       at="0:35",
       ask=("The tiles are 100 wide. Why are they 100 apart?",
            "So they sit edge to edge with no gap")),
  TALK("0:46", "Walk off the edge",
       "<p>Walk Pixelhead past the end of the grass. Nothing happens - it floats. Ask what is "
       "missing. (Gravity - in two weeks.)</p>"),
 ],
 "errors": [
   ("Pixelhead shrinks or stretches", "scaleX must be exactly 1 and -1. 2 doubles the width; 0.5 halves it."),
   ("Pixelhead always faces left", "The scaleX = 1 line is missing from the arrowRight if, or it is not pushed in."),
   ("Everything has vanished", "The background is covering it: Background() must be the FIRST line of Level1 start."),
   ("Only one tile shows", "Each tile needs its own name - floor1, floor2, floor3 - and its own x."),
 ],
 "recap": [
   "[[scaleX|scale]] = -1 flips a picture like a mirror; 1 puts it back.",
   "A new line inside an if is pushed in four spaces, like the line above it.",
   "Objects are drawn in the order they are made, so the background goes first.",
   "Tiles 100 wide, placed 100 apart, sit edge to edge.",
 ],
 "homework": [
   {"task": "Plan a level", "detail": "On squared paper, draw the screen and plan where you would put grass tiles for a whole level.", "done": "Each tile has an x and a y written next to it."},
   {"task": "Upside down", "detail": "What would scaleY = -1 do? Try it in Player start, then take it out.", "done": "You can say what it did."},
 ],
 "bonus": {"title": "A longer floor",
           "body": "<p>Add <code>self.floor0</code> at x -200, y -100, at the end of the floors. "
                   "Can you make the floor reach all the way to the left edge?</p>"},
 "slides": [
   {"title": "Moonwalking", "sub": "scaleX = -1", "bullets": [
     "1 is the size you drew", "-1 is the same size, flipped", "Flip when you walk left"]},
   {"title": "Face the way you walk", "bullets": [], "code": [(PLAYER_LOOP, "walk")]},
   {"title": "Checkpoint: turn around", "checkpoint": True,
    "say": "Press Play and walk both ways. Pixelhead faces the way it walks."},
   {"title": "Draw the world", "sub": "coast.png 1280 x 720 - grassTile.png 100 x 100", "bullets": [
     "Make a class called Background", "Make a class called Floor"]},
   {"title": "Give the background its picture", "bullets": [], "code": [(BACK_START, "look")]},
   {"title": "Made first, drawn at the back", "bullets": [
     "Objects are drawn in the order they are made", "Background goes at the very top",
     "Everything after it is drawn on top"]},
   {"title": "Put up the background", "bullets": [], "code": [(LEVEL1_START, "back")]},
   {"title": "Checkpoint: the coast", "checkpoint": True,
    "say": "Press Play. Your background fills the screen, with Pixelhead and the wasps in front."},
   {"title": "Give the floor its picture", "bullets": [], "code": [(FLOOR_START, "look")]},
   {"title": "Lay three grass tiles", "bullets": [], "code": [(LEVEL1_START, "floors")]},
   {"title": "Checkpoint: grass", "checkpoint": True,
    "say": "Press Play. A strip of three grass tiles sits under Pixelhead."},
 ],
},

# ---------------------------------------------------------------- week 5 ----
{
 "n": 5,
 "title": "Wasps on patrol",
 "big_idea": "The wasps fly away and never come back. Today they shrink to size, and two [[if]]s turn them around at each side of the screen - facing the way they fly.",
 "new_concepts": ["comparing numbers", "turning around"],
 "objectives": [
   "Shrink an object with [[scaleX and scaleY|scale]]",
   "Ask a question with &gt; and &lt;",
   "Turn an object around by changing its speed",
   "Explain why the flip uses 0.7 and not 1",
 ],
 "ops": [
  ADD(WASP_START, "scale", [
    "self.scaleX = 0.7",
    "self.scaleY = 0.7",
  ]),
  ADD(WASP_LOOP, "turn", [
    "if self.x > 500:",
    "    self.speed = -3",
    "    self.scaleX = 0.7",
    "if self.x < -500:",
    "    self.speed = 3",
    "    self.scaleX = -0.7",
  ]),
 ],
 "flow": [
  TALK("0:00", "Review",
       "<p>Ask: what does scaleX = -1 do? (Flips the picture.) What is a variable? (A name "
       "that holds a value.) How can we tell something is off the right of the screen? "
       "(Its x is bigger than about 640.)</p>",
       ask=("How can the computer tell a wasp is far to the right?",
            "Its x is a big number - bigger than 500, say")),
  STEP(WASP_START, "scale", "Shrink the wasps",
       ["Under the speed line: 0.7 is seven tenths of the size you drew. Change both by the "
        "same amount and the wasp keeps its shape. Press Play."],
       at="0:06"),
  TALK("0:10", "Comparing numbers",
       "<p><code>&gt;</code> means greater than and <code>&lt;</code> means less than. "
       "<code>if self.x &gt; 500:</code> asks: is my x bigger than 500? The pointy end points "
       "at the smaller number.</p>",
       ask=("Is 7 &gt; 5 true or false?", "True")),
  STEP(WASP_LOOP, "turn", "Turn around at each side",
       ["Under the flying line. Past 500 on the right: fly left again and face left. Past "
        "-500 on the left: fly right and face right - a minus scale flips it, the way it "
        "flipped Pixelhead."],
       at="0:15",
       ask=("Why 0.7 and -0.7, and not 1 and -1?",
            "1 would grow the wasp back to full size - start shrank it to 0.7")),
  TALK("0:30", "Watch them patrol",
       "<p>Press Play and watch for a full minute. The wasps sweep back and forth across the "
       "sky for ever.</p>",
       "<p>Ask what would happen with 300 instead of 500. Let them try.</p>"),
 ],
 "errors": [
   ("The wasps grow when they turn", "The flip lines must say 0.7 and -0.7, the size start gave them, not 1 and -1."),
   ("A wasp flies backwards", "Your wasp is drawn facing right. Draw it facing left, or swap the 0.7 and -0.7."),
   ("The wasps still fly away", "The turn lines are in FlyEnemy start. They have to be checked every loop - FlyEnemy loop."),
   ("The wasps shake on the spot", "Check the signs: past 500 the speed must be MINUS 3, past -500 PLUS 3."),
 ],
 "recap": [
   "[[scaleX and scaleY|scale]] of 0.7 shrinks a picture to seven tenths.",
   "&gt; is greater than, &lt; is less than.",
   "Changing the speed's sign turns an object around.",
   "The flip has to keep the size: 0.7 and -0.7.",
 ],
 "homework": [
   {"task": "Solve it", "detail": "Fill in &gt; or &lt;: 7 __ 5, -3 __ 2, -500 __ -400.", "done": "&gt;, &lt;, &lt;."},
   {"task": "A shorter patrol", "detail": "Make the wasps turn at 300 and -300. Is the game better or worse?", "done": "You picked the numbers you want and can say why."},
 ],
 "bonus": {"title": "A fast wasp",
           "body": "<p>Change the 3s to 5s. Does the wasp still turn around properly? Which "
                   "numbers have to change together?</p>"},
 "slides": [
   {"title": "Review", "bullets": [
     "scaleX = -1 flips the picture", "A variable holds a value",
     "Off to the right means a big x"]},
   {"title": "Shrink the wasps", "bullets": [], "code": [(WASP_START, "scale")]},
   {"title": "Checkpoint: smaller wasps", "checkpoint": True,
    "say": "Press Play. The wasps are smaller, and still fly away to the left."},
   {"title": "Comparing numbers", "sub": "if self.x > 500:", "bullets": [
     "&gt; is greater than", "&lt; is less than", "The pointy end points at the smaller number"]},
   {"title": "Turn around at each side", "bullets": [], "code": [(WASP_LOOP, "turn")]},
   {"title": "Checkpoint: patrol", "checkpoint": True,
    "say": "Press Play and wait. The wasps turn at each side, face the way they fly, and patrol for ever."},
 ],
},

# ---------------------------------------------------------------- week 6 ----
{
 "n": 6,
 "title": "Gravity and the ground",
 "big_idea": "In the real world things fall. Today Pixelhead falls all the time - and [[get_collision]] tells it when it is touching the floor, so it can stop.",
 "new_concepts": ["gravity", "get_collision()", "a name for right now"],
 "objectives": [
   "Make an object fall all the time with one line in [[loop]]",
   "Ask whether two objects touch with [[get_collision]]",
   "Explain why + 2 on the floor cancels - 2 of gravity",
   "Say why touchingFloor needs no self.",
 ],
 "ops": [
  ADD(PLAYER_LOOP, "gravity", [
    "self.y = self.y - 2",
  ]),
  ADD(LEVEL1_START, "player", [
    "self.player.y = 400",
  ]),
  ADD(PLAYER_LOOP, "floor", [
    "touchingFloor = get_collision(self, 'Floor')",
    "if touchingFloor:",
    "    self.y = self.y + 2",
  ]),
 ],
 "flow": [
  TALK("0:00", "Gravity",
       "<p>Pixelhead should fall when it is in the air. Falling is just y getting smaller, "
       "a little, every loop.</p>",
       ask=("Is falling a change to x or to y? Start or loop?",
            "y, and loop - it keeps happening")),
  STEP(PLAYER_LOOP, "gravity", "Fall all the time",
       ["Under the walking lines, not pushed in: take 2 off y every loop. Press Play."],
       at="0:05",
       ask=("Pixelhead falls straight through the grass. Why?",
            "Nothing tells it that it is touching the floor")),
  STEP(LEVEL1_START, "player", "Start up high",
       ["Under the player line: start at y 400, above the top of the screen, so you can "
        "watch Pixelhead drop in."],
       at="0:10"),
  TALK("0:13", "Collisions",
       "<p>A collision is two objects touching - like clapping your hands. "
       "[[get_collision(self, 'Floor')|get_collision]] asks: am I touching any Floor? It "
       "gives back the tile you touch, or False.</p>",
       "<p>Gravity takes 2 away every loop. On the floor we want no change at all - so on "
       "the floor, put 2 back.</p>",
       ask=("Gravity is - 2. What must we add on the floor to stay still?", "2")),
  STEP(PLAYER_LOOP, "floor", "Stand on the floor",
       ["Under the gravity line. Ask the question, keep the answer in "
        "<code>touchingFloor</code>, and only when it is a tile, add the 2 back. Press "
        "Play."],
       at="0:20"),
  TALK("0:32", "A name for right now",
       "<p><code>touchingFloor</code> has no <code>self.</code> in front. It is only needed "
       "right here, in this loop, this time round - next loop it is asked again.</p>",
       "<p>Walk off the end of the grass and fall. Then press Play again.</p>"),
 ],
 "errors": [
   ("Pixelhead falls through the floor", "'Floor' in the quotes must match the class name exactly, capital F."),
   ("Pixelhead floats up", "Gravity is self.y - 2. The floor line is + 2. Check the signs."),
   ("Pixelhead does not fall at all", "The gravity line is pushed in under an if. It must start at the left edge, so it happens every loop."),
   ("NameError: name 'touchingFloor' is not defined", "Spell it the same both times - touchingFloor, capital F, no self."),
 ],
 "recap": [
   "Gravity is self.y = self.y - 2, every loop.",
   "[[get_collision]](self, 'Floor') gives back the tile you are touching, or False.",
   "On the floor, + 2 cancels the - 2, so you stand still.",
   "A name without self. lives only inside this loop.",
 ],
 "homework": [
   {"task": "Heavy gravity", "detail": "Try - 5 for gravity. What else must change so you still stand on the floor?", "done": "The floor line must add 5 too."},
   {"task": "Explain it", "detail": "In two sentences, explain why Pixelhead does not fall through the grass.", "done": "Gravity takes 2 away; touching the floor puts 2 back."},
 ],
 "bonus": {"title": "A floating island",
           "body": "<p>Move <code>self.floor3</code> up to y 100. Can Pixelhead get onto it? "
                   "(Not yet - that needs a jump.) Put it back to -100.</p>"},
 "slides": [
   {"title": "Gravity", "sub": "self.y = self.y - 2", "bullets": [
     "Falling is y getting smaller", "A little, every loop", "So it goes in loop"]},
   {"title": "Fall all the time", "bullets": [], "code": [(PLAYER_LOOP, "gravity")]},
   {"title": "Checkpoint: falling", "checkpoint": True,
    "say": "Press Play. Pixelhead falls straight through the grass and off the bottom."},
   {"title": "Start up high", "bullets": [], "code": [(LEVEL1_START, "player")]},
   {"title": "Collisions", "sub": "get_collision(self, 'Floor')", "bullets": [
     "Am I touching any Floor?", "Gives back the tile, or False", "On the floor, put the 2 back"]},
   {"title": "Stand on the floor", "bullets": [], "code": [(PLAYER_LOOP, "floor")]},
   {"title": "Checkpoint: landed", "checkpoint": True,
    "say": "Press Play. Pixelhead drops in from the top and lands on the grass. Walk off the end and you fall."},
 ],
},

# ---------------------------------------------------------------- week 7 ----
{
 "n": 7,
 "title": "Jump!",
 "big_idea": "To reach high ground you have to jump. Today space throws Pixelhead upward with [[key_was_pressed]], and two more tiles make a platform worth jumping to.",
 "new_concepts": ["key_was_pressed()"],
 "objectives": [
   "Explain how gravity and the floor balance out",
   "Say the difference between [[key_is_pressed]] and [[key_was_pressed]]",
   "Make an object jump with one press",
   "Build a raised platform from tiles",
 ],
 "ops": [
  ADD(PLAYER_LOOP, "jump", [
    "if key_was_pressed(' '):",
    "    self.y = self.y + 50",
  ]),
  ADD(LEVEL1_START, "upper", [
    "self.floor4 = Floor()",
    "self.floor4.x = 300",
    "self.floor4.y = 0",
    "self.floor5 = Floor()",
    "self.floor5.x = 400",
    "self.floor5.y = 0",
  ]),
 ],
 "flow": [
  TALK("0:00", "Review",
       "<p>Ask: what makes Pixelhead fall? (self.y - 2 every loop.) Why does it not fall "
       "through the grass? (On the floor it adds 2 back - they balance out.) How does "
       "get_collision work? (Give it self and a class name; it answers with what you "
       "touch.)</p>",
       ask=("Why does Pixelhead not fall through the grass?",
            "Touching the floor adds back the 2 that gravity took")),
  TALK("0:06", "Held or pressed",
       "<p>[[key_is_pressed]] is True for EVERY loop a key is held - sixty times a second. "
       "Jumping with it would fling you off the top of the screen.</p>",
       "<p>[[key_was_pressed(' ')|key_was_pressed]] is True only for the ONE loop the key "
       "goes down. One press, one jump. The ' ' with a space inside is the space bar.</p>",
       ask=("Hold space for one second with key_is_pressed. How many jumps is that?",
            "About sixty")),
  STEP(PLAYER_LOOP, "jump", "Jump with space",
       ["Under the floor lines: on the one loop space goes down, throw Pixelhead up 50. Press "
        "Play and tap space."],
       at="0:12",
       ask=("Is that a good jump?", "No - it teleports up, and you can keep jumping in the air")),
  STEP(LEVEL1_START, "upper", "Build a high platform",
       ["At the very bottom of Level1 start: two tiles at y 0 - 100 higher than the grass, "
        "over on the right. Press Play and climb up."],
       at="0:20"),
  TALK("0:30", "Practise the fundamentals",
       "<p>The rest of the hour is the guide's practice activity (tinyurl.com/UTG-102): each "
       "task is tried before the answer is looked at. A student who finishes chapter 1 "
       "moves on to their own side game.</p>"),
 ],
 "errors": [
   ("Space does nothing", "Click the game first. The quotes hold ONE space: ' ' - not empty quotes ''."),
   ("Pixelhead shoots off the top", "That is key_is_pressed. Use key_was_pressed, so one press is one jump."),
   ("The jump goes down", "It should be self.y + 50. Plus y is up."),
   ("The high tiles are missing", "Each needs its own name - floor4 and floor5 - and y 0, not -100."),
 ],
 "recap": [
   "Gravity takes 2 away; the floor puts 2 back; they balance.",
   "[[key_is_pressed]] is True every loop a key is held.",
   "[[key_was_pressed]] is True only for the loop it goes down - one press, one jump.",
   "' ' with a space inside is the space bar.",
 ],
 "homework": [
   {"task": "Count the presses", "detail": "How many presses of space does it take to reach the high platform? Why?", "done": "Two - each press is 50, and the platform is 100 higher."},
   {"task": "Spot the problem", "detail": "Write down two things that are wrong with this jump.", "done": "It is instant, not smooth; and you can jump again in mid-air."},
 ],
 "bonus": {"title": "Super jump",
           "body": "<p>Try <code>+ 100</code> instead of 50. It reaches the platform in one "
                   "press - but does it look like jumping? Put it back to 50; next week "
                   "fixes it properly.</p>"},
 "slides": [
   {"title": "Review", "bullets": [
     "Gravity: self.y - 2 every loop", "The floor adds the 2 back", "get_collision(self, 'Floor')"]},
   {"title": "Held or pressed", "sub": "key_was_pressed(' ')", "bullets": [
     "key_is_pressed: every loop it is held", "key_was_pressed: only the loop it goes down",
     "' ' is the space bar"]},
   {"title": "Jump with space", "bullets": [], "code": [(PLAYER_LOOP, "jump")]},
   {"title": "Checkpoint: hop", "checkpoint": True,
    "say": "Press Play and tap space. Pixelhead pops up 50 and falls back down."},
   {"title": "Build a high platform", "bullets": [], "code": [(LEVEL1_START, "upper")]},
   {"title": "Checkpoint: climb", "checkpoint": True,
    "say": "Press Play. Tap space several times in a row to climb onto the high platform on the right."},
 ],
},

# ---------------------------------------------------------------- week 8 ----
{
 "n": 8,
 "title": "A smooth jump",
 "big_idea": "A real jump rises over time. Today a jump [[timer]] counts down: while it is above zero Pixelhead rises, and space only sets it going.",
 "new_concepts": ["a timer that counts down"],
 "objectives": [
   "Explain how a [[timer]] changes every loop",
   "Move an object only while a number is above zero",
   "Explain why the jump flew off the top before the countdown",
   "Say what space does now: it sets the timer, it does not move you",
 ],
 "ops": [
  ADD(PLAYER_START, "jumpTimer", [
    "self.jumpTimer = 0",
  ]),
  ADD(PLAYER_LOOP, "rise", [
    "if self.jumpTimer > 0:",
    "    self.y = self.y + 8",
  ]),
  SET(PLAYER_LOOP, "jump", [
    "if key_was_pressed(' '):",
    "    self.jumpTimer = 30",
  ]),
  ADD(PLAYER_LOOP, "countdown", [
    "self.jumpTimer = self.jumpTimer - 1",
  ]),
 ],
 "flow": [
  TALK("0:00", "How a timer works",
       "<p>Last week's jump is a teleport. A real jump rises for a while, then falls.</p>",
       "<p>A [[timer]] is a number that changes every loop. Ours counts DOWN, and while it "
       "is above zero, Pixelhead rises. Work through the guide's jump activity "
       "(tinyurl.com/UTG-Jump) together, one task at a time.</p>",
       ask=("When should Pixelhead move up?", "While the timer is a positive number")),
  STEP(PLAYER_START, "jumpTimer", "A jump timer",
       ["Under the speed line in Player start: the timer starts at 0 - not jumping."],
       at="0:12"),
  STEP(PLAYER_LOOP, "rise", "Rise while the timer runs",
       ["Under the jump lines: only while the timer is above 0, go up 8. Press Play - "
        "nothing changes."],
       at="0:15",
       ask=("Nothing changes. Why?", "The timer is stuck at 0, and 0 is not above 0")),
  STEP(PLAYER_LOOP, "jump", "Space starts the timer",
       ["Change one line: space no longer moves you - it sets the timer to 30. Press Play "
        "and tap space."],
       at="0:20",
       ask=("Pixelhead flies off the top and never comes back. Why?",
            "The timer stays at 30 - nothing counts it down")),
  STEP(PLAYER_LOOP, "countdown", "Count the timer down",
       ["At the bottom of Player loop, not pushed in: take one off the timer every loop. "
        "Press Play and jump."],
       at="0:28"),
  TALK("0:35", "Debrief",
       "<p>Ask: how does the timer go from positive to negative? (It counts down.) How does "
       "it get positive again? (Space sets it to 30.) It keeps going below zero - -1, -2, "
       "-500 - and that is fine: below zero just means not rising.</p>",
       "<p>Let them tune 30 and 8 for a jump that feels right.</p>"),
 ],
 "errors": [
   ("Pixelhead flies away for ever", "The countdown line is missing, or it is pushed in under an if. It must run every loop."),
   ("Nothing happens on space", "The jump line must set self.jumpTimer = 30 - with self. and the same spelling as in start."),
   ("NameError: name 'jumpTimer' is not defined", "Every jumpTimer needs self. in front."),
   ("The jump is tiny", "Check the rise line adds 8, and the timer is set to 30, not 3."),
 ],
 "recap": [
   "A [[timer]] is a number that changes every loop.",
   "While self.jumpTimer is above 0, Pixelhead rises 8 a loop.",
   "Space does not move you - it sets the timer to 30.",
   "The countdown takes 1 off every loop, so the rise stops by itself.",
 ],
 "homework": [
   {"task": "Do the maths", "detail": "Rising 8 and falling 2 every loop, for 30 loops - how high does Pixelhead go?", "done": "6 a loop for 30 loops: 180."},
   {"task": "Explain it", "detail": "Why did Pixelhead fly away before the countdown line was added?", "done": "The timer stayed at 30, so it was always above 0."},
 ],
 "bonus": {"title": "Moon jump",
           "body": "<p>Try a timer of 60 and a rise of 4. Is the jump the same height? "
                   "(Work it out: 2 a loop for 60 loops.) Which one feels better?</p>"},
 "slides": [
   {"title": "How a timer works", "bullets": [
     "A number that changes every loop", "Ours counts DOWN", "Above zero: rise"]},
   {"title": "A jump timer", "bullets": [], "code": [(PLAYER_START, "jumpTimer")]},
   {"title": "Rise while the timer runs", "bullets": [], "code": [(PLAYER_LOOP, "rise")]},
   {"title": "Checkpoint: no change", "checkpoint": True,
    "say": "Press Play and tap space. Pixelhead still hops up 50 - the timer is stuck at 0."},
   {"title": "Space starts the timer", "bullets": [], "code": [(PLAYER_LOOP, "jump")]},
   {"title": "Checkpoint: lift-off", "checkpoint": True,
    "say": "Press Play and tap space. Pixelhead flies up off the top and never comes back. That is right - for now."},
   {"title": "Count the timer down", "bullets": [], "code": [(PLAYER_LOOP, "countdown")]},
   {"title": "Checkpoint: a real jump", "checkpoint": True,
    "say": "Press Play and tap space. Pixelhead rises smoothly, then falls back to the grass."},
 ],
},

# ---------------------------------------------------------------- week 9 ----
{
 "n": 9,
 "title": "Only from the ground",
 "big_idea": "Pixelhead can still jump in mid-air. Today a [[boolean]] - True or False - remembers whether it is on the ground, [[else]] sets it back, and [[and]] makes the jump check both.",
 "new_concepts": ["True and False", "else", "and", "=="],
 "objectives": [
   "Say what a [[boolean]] is",
   "Use [[else]] to do something when an if is not true",
   "Ask two questions at once with [[and]]",
   "Explain why one = stores and two == ask",
 ],
 "ops": [
  ADD(PLAYER_START, "onGround", [
    "self.onGround = False",
  ]),
  SET(PLAYER_LOOP, "floor", [
    "touchingFloor = get_collision(self, 'Floor')",
    "if touchingFloor:",
    "    self.onGround = True",
    "    self.y = self.y + 2",
    "else:",
    "    self.onGround = False",
  ]),
  SET(PLAYER_LOOP, "jump", [
    "if key_was_pressed(' ') and self.onGround == True:",
    "    self.jumpTimer = 30",
  ]),
 ],
 "flow": [
  TALK("0:00", "True or False",
       "<p>A [[boolean]] is a value with only two answers: True or False - like a light "
       "switch, on or off. Python writes them with a capital letter.</p>",
       ask=("Should Pixelhead start on the ground, True or False?",
            "False - it starts up at 400 and falls in")),
  STEP(PLAYER_START, "onGround", "Remember the ground",
       ["At the bottom of Player start: not on the ground yet."],
       at="0:05"),
  TALK("0:07", "else",
       "<p>[[else]] goes under an if, at the same indent as the if. Its lines run when the "
       "if is NOT true. Touching the floor: on the ground. Otherwise: not.</p>",
       ask=("We already ask if we touch the floor. Where should onGround become True?",
            "Inside that if - where we add the 2 back")),
  STEP(PLAYER_LOOP, "floor", "Switch it on and off",
       ["Three new lines. Inside the floor if, ABOVE the + 2 line: on the ground. Then "
        "<code>else:</code> lined up with the <code>if</code>, and under it, pushed in: not "
        "on the ground. Press Play - nothing looks different."],
       at="0:12",
       ask=("Why does nothing look different?", "Nothing USES onGround yet")),
  TALK("0:20", "Two questions at once",
       "<p>[[and]] joins two questions: the if runs only when BOTH are true. Space was just "
       "pressed, and I am on the ground.</p>",
       "<p><code>=</code> stores a value. <code>==</code> ASKS whether two things are equal. "
       "Inside an if, it is always ==.</p>",
       ask=("What is the difference between = and ==?", "= stores, == asks")),
  STEP(PLAYER_LOOP, "jump", "Jump only from the ground",
       ["Change the jump line: add <code>and self.onGround == True</code> before the colon. "
        "Press Play and try to jump twice."],
       at="0:26"),
  TALK("0:35", "Test it hard",
       "<p>Jump in mid-air. Walk off the edge and try to jump while falling. Both should do "
       "nothing. Ask why walking off works too. (The else turns it off the moment you stop "
       "touching the floor.)</p>"),
 ],
 "errors": [
   ("NameError: name 'false' is not defined", "True and False need capital letters."),
   ("SyntaxError on the jump line", "Inside an if, ask with two equals: self.onGround == True."),
   ("You can never jump", "onGround = True must be inside the floor if, pushed in, so standing on grass turns it on."),
   ("SyntaxError at else", "else: lines up exactly with its if - no spaces in front - and ends with a colon."),
 ],
 "recap": [
   "A [[boolean]] is True or False, with a capital letter.",
   "[[else]] runs when its if is not true.",
   "[[and]] needs both questions to be true.",
   "= stores a value; == asks if two things are equal.",
 ],
 "homework": [
   {"task": "Booleans in real life", "detail": "Write three things in your house that are True or False, like a light switch.", "done": "You have three switches."},
   {"task": "Read it out loud", "detail": "Write the jump line as an English sentence.", "done": "Something like: if space was just pressed and I am on the ground, start the jump timer."},
 ],
 "bonus": {"title": "Double jump",
           "body": "<p>Some games let you jump once in mid-air. Without changing your game, "
                   "write in English what you would need to remember to allow exactly ONE "
                   "air jump.</p>"},
 "slides": [
   {"title": "True or False", "sub": "self.onGround = False", "bullets": [
     "A boolean has only two values", "Like a light switch", "Capital T, capital F"]},
   {"title": "Remember the ground", "bullets": [], "code": [(PLAYER_START, "onGround")]},
   {"title": "else", "sub": "if ... else", "bullets": [
     "else: lines up with its if", "Its lines run when the if is not true",
     "On the floor: True. Otherwise: False"]},
   {"title": "Switch it on and off", "bullets": [], "code": [(PLAYER_LOOP, "floor")]},
   {"title": "Checkpoint: nothing new", "checkpoint": True,
    "say": "Press Play. Everything works as before - nothing uses onGround yet."},
   {"title": "Two questions at once", "sub": "and - and ==", "bullets": [
     "and: both must be true", "= stores a value", "== asks if two things are equal"]},
   {"title": "Jump only from the ground", "bullets": [], "code": [(PLAYER_LOOP, "jump")]},
   {"title": "Checkpoint: no air jumps", "checkpoint": True,
    "say": "Press Play. You can jump from the grass, but not again until you land."},
 ],
},

# --------------------------------------------------------------- week 10 ----
{
 "n": 10,
 "title": "Stomp the wasps",
 "big_idea": "A wasp is dangerous from below and beaten from above. Today Pixelhead asks which wasp it touched, and an [[if]] inside an if decides who is [[destroyed|destroy]].",
 "new_concepts": ["destroy()", "an if inside an if"],
 "objectives": [
   "Get the wasp you touched with [[get_collision]]",
   "Compare two objects' y to see which is higher",
   "Put an [[if]] inside an if, with eight spaces",
   "[[destroy]] the right object",
 ],
 "ops": [
  ADD(PLAYER_LOOP, "enemies", [
    "enemyHit = get_collision(self, 'FlyEnemy')",
    "if enemyHit:",
    "    if self.y > enemyHit.y:",
    "        destroy(enemyHit)",
    "    else:",
    "        destroy(self)",
  ]),
 ],
 "flow": [
  TALK("0:00", "Review",
       "<p>Ask: what function tells us two things touch? (get_collision.) What does it give "
       "back? (The thing you touched, or False.) Which class should check for wasps? (Player "
       "- it is the one that gets hurt or does the stomping.)</p>",
       ask=("Start or loop - where do we check for wasps?", "Loop - it has to be checked all the time")),
  TALK("0:06", "Who is higher?",
       "<p><code>enemyHit</code> IS the wasp you touched, so <code>enemyHit.y</code> is that "
       "wasp's y. If my y is bigger, I came down on top of it.</p>",
       "<p>An if can go inside another if. The inside one is pushed in eight spaces, and only "
       "runs when the outside one is true.</p>",
       ask=("Pixelhead's y is 120 and the wasp's is 100. Who is on top?", "Pixelhead")),
  STEP(PLAYER_LOOP, "enemies", "Stomp or be stung",
       ["At the bottom of Player loop: which wasp am I touching? Only if there is one: if I "
        "am higher, it is destroyed; else, I am. Press Play and try both."],
       at="0:12",
       ask=("Why is destroy(self) under else, and not in its own if?",
            "If you are not above the wasp, you must be below it - else covers every other case")),
  TALK("0:26", "Learn to stomp",
       "<p>From the grass you can only reach a wasp from below - and that stings. Stomp "
       "from the high platform: jump BEFORE the wasp arrives, so you come down on it. Give "
       "everyone ten minutes to clear both wasps.</p>",
       "<p>When Pixelhead is destroyed, press Play again. A lost game that never restarts is "
       "fixed in week 14.</p>"),
 ],
 "errors": [
   ("AttributeError: 'bool' object has no attribute 'y'", "The inner if must be pushed in under if enemyHit:, so it only asks for enemyHit.y when there is a wasp."),
   ("Nothing happens when you touch a wasp", "'FlyEnemy' in the quotes must match the class exactly."),
   ("You are always stung", "Check the sign: self.y > enemyHit.y means I am higher."),
   ("IndentationError", "The lines under the inner if and the else are pushed in EIGHT spaces."),
 ],
 "recap": [
   "enemyHit is the wasp you touched; enemyHit.y is its y.",
   "A bigger y means higher up the screen.",
   "An [[if]] inside an if is pushed in eight spaces.",
   "[[destroy]](enemyHit) removes the wasp; destroy(self) removes Pixelhead.",
 ],
 "homework": [
   {"task": "Trace it", "detail": "Pixelhead is at y 150 and touches a wasp at y 200. Which line runs?", "done": "destroy(self) - 150 is not above 200."},
   {"task": "Say it in English", "detail": "Write the six lines as three English sentences.", "done": "Which wasp am I touching? If I am above it, it goes. Otherwise, I go."},
 ],
 "bonus": {"title": "A third wasp",
           "body": "<p>Add a third wasp to <strong>Level1 start</strong> at x 0, y 150 - low over "
                   "the grass. Can you stomp it without climbing the high platform?</p>"},
 "slides": [
   {"title": "Review", "bullets": [
     "get_collision gives back what you touch", "Player checks for wasps", "In loop, all the time"]},
   {"title": "Who is higher?", "sub": "if self.y > enemyHit.y:", "bullets": [
     "enemyHit is the wasp you touched", "Bigger y is higher", "An if inside an if: eight spaces"]},
   {"title": "Stomp or be stung", "bullets": [], "code": [(PLAYER_LOOP, "enemies")]},
   {"title": "Checkpoint: stomp", "checkpoint": True,
    "say": "Press Play. From the high platform, land on a wasp and it disappears. From the grass, jump up into one and Pixelhead disappears."},
 ],
},

# --------------------------------------------------------------- week 11 ----
{
 "n": 11,
 "title": "Bounce, and land on top",
 "big_idea": "What lifts Pixelhead is the jump timer, not the space bar. Today a stomp sets the timer for a bounce, and the floor check learns to look down - so you land ON a platform, not inside it.",
 "new_concepts": ["reusing the timer", "y is the middle"],
 "objectives": [
   "Explain that the timer, not space, lifts Pixelhead",
   "Give a bounce by setting the timer from somewhere new",
   "Explain why an object's y is its middle",
   "Land only on top of a tile",
 ],
 "ops": [
  SET(PLAYER_LOOP, "enemies", [
    "enemyHit = get_collision(self, 'FlyEnemy')",
    "if enemyHit:",
    "    if self.y > enemyHit.y:",
    "        destroy(enemyHit)",
    "        self.jumpTimer = 15",
    "    else:",
    "        destroy(self)",
  ]),
  SET(PLAYER_LOOP, "floor", [
    "touchingFloor = get_collision(self, 'Floor')",
    "if touchingFloor and self.y > touchingFloor.y + 50:",
    "    self.onGround = True",
    "    self.y = self.y + 2",
    "else:",
    "    self.onGround = False",
  ]),
 ],
 "flow": [
  TALK("0:00", "What really lifts you",
       "<p>Ask: when you press space, what moves Pixelhead up? Not space - space only sets "
       "the timer. The rise lines move you, whenever the timer is above 0.</p>",
       "<p>Try it: in Player start, set the timer to 50 and press Play. Pixelhead rises as "
       "the game begins, with no key pressed. Put it back to 0.</p>",
       ask=("To bounce off a wasp, do we need another key_was_pressed?",
            "No - just set the timer")),
  STEP(PLAYER_LOOP, "enemies", "Bounce off a stomp",
       ["The first line does not change.",
        "One new line, under <code>destroy(enemyHit)</code> and lined up with it: a short "
        "jump, 15. Press Play and stomp a wasp."],
       at="0:08"),
  TALK("0:14", "Walking inside a wall",
       "<p>Walk off the end of the grass toward the high platform, without jumping. "
       "Pixelhead drops a little, catches on the platform's SIDE, and walks along inside "
       "it. Ask why: touching a tile anywhere - even its side - adds the 2 back.</p>",
       "<p>An object's y is its MIDDLE. The grass tile is 100 tall, so its top is its y plus "
       "50. Only stand if your middle is above the tile's top.</p>",
       ask=("A tile's y is -100. Where is its top edge?", "-50 - half of 100 above its middle")),
  STEP(PLAYER_LOOP, "floor", "Land only on top",
       ["Change the if line: add <code>and self.y &gt; touchingFloor.y + 50</code> before "
        "the colon. Press Play and walk off the grass again."],
       at="0:20",
       ask=("Why does it need the same and as the jump line?",
            "Both things must be true: touching a tile, and above its top")),
  TALK("0:30", "Tune it",
       "<p>The guide lets students change the 50 until the landing looks right. Have them "
       "try 30 and 80 and watch where Pixelhead's feet end up.</p>"),
 ],
 "errors": [
   ("No bounce", "self.jumpTimer = 15 must be inside the if, lined up with destroy(enemyHit) - eight spaces."),
   ("Pixelhead falls through every tile, even from above", "The sign must be self.y > touchingFloor.y + 50. A &lt; means only stand when BELOW the tile."),
   ("AttributeError: 'bool' object has no attribute 'y'", "Write touchingFloor first: if touchingFloor and self.y &gt; ... Python stops at the first False, before it asks for .y."),
   ("You bounce when you are stung", "The bounce line is under else. It belongs under destroy(enemyHit)."),
 ],
 "recap": [
   "The jump timer lifts Pixelhead; space only sets it.",
   "A stomp sets the timer to 15 for a bounce.",
   "An object's y is its middle; a 100-tall tile's top is y + 50.",
   "With [[and]], you stand only when touching a tile AND above it.",
 ],
 "homework": [
   {"task": "Find the top", "detail": "A tile is at y 100. Where is its top? Its bottom?", "done": "150 and 50."},
   {"task": "Explain the bounce", "detail": "Explain in two sentences how setting jumpTimer makes Pixelhead bounce.", "done": "A timer above 0 makes the rise lines lift you; 15 is a short lift."},
 ],
 "bonus": {"title": "A bigger bounce",
           "body": "<p>Make the stomp bounce 40 instead of 15. Can you bounce off one wasp "
                   "onto the high platform?</p>"},
 "slides": [
   {"title": "What really lifts you", "bullets": [
     "Space only sets the timer", "Timer above 0: you rise", "So a stomp can set it too"]},
   {"title": "Bounce off a stomp", "bullets": [], "code": [(PLAYER_LOOP, "enemies")]},
   {"title": "Checkpoint: boing", "checkpoint": True,
    "say": "Press Play and stomp a wasp. Pixelhead bounces up off it."},
   {"title": "Walking inside a wall", "sub": "y is the middle", "bullets": [
     "Touching the side of a tile counts too", "A 100-tall tile's top is y + 50",
     "Stand only when above the top"]},
   {"title": "Land only on top", "bullets": [], "code": [(PLAYER_LOOP, "floor")]},
   {"title": "Checkpoint: through and onto", "checkpoint": True,
    "say": "Press Play and walk off the grass. You fall past the platform's side into the gap. Jump instead, and you land on top."},
 ],
},

# --------------------------------------------------------------- week 12 ----
{
 "n": 12,
 "title": "A portal to Level 2",
 "big_idea": "A game can have more than one level. Today you build a second [[room]], and a Portal that sends Pixelhead there the moment they touch.",
 "new_concepts": ["a second room", "set_room() from a class"],
 "draw": ["portal.png"],
 "objectives": [
   "List the three steps for adding any new object",
   "Build a second [[room]] with its own objects",
   "Change [[room]] when two objects touch",
   "Explain why each room makes its own Pixelhead",
 ],
 "ops": [
  ADD(PORTAL_START, "look", [
    "self.image = sprite('portal.png')",
  ]),
  ADD(LEVEL1_START, "portal", [
    "self.portal = Portal()",
    "self.portal.x = 500",
    "self.portal.y = 110",
  ]),
  ADD(LEVEL2_START, "back", [
    "self.background = Background()",
  ]),
  ADD(LEVEL2_START, "player", [
    "self.player = Player()",
    "self.player.x = -500",
    "self.player.y = 400",
  ]),
  ADD(LEVEL2_START, "floors", [
    "self.floor1 = Floor()",
    "self.floor1.x = -500",
    "self.floor1.y = -200",
    "self.floor2 = Floor()",
    "self.floor2.x = -300",
    "self.floor2.y = -100",
    "self.floor3 = Floor()",
    "self.floor3.x = -100",
    "self.floor3.y = 0",
  ]),
  ADD(PORTAL_LOOP, "travel", [
    "playerHit = get_collision(self, 'Player')",
    "if playerHit:",
    "    set_room('Level2')",
  ]),
 ],
 "flow": [
  TALK("0:00", "Review",
       "<p>Ask: where is an object's y? (In its middle.) What are the steps for putting any "
       "new object in the game? (Make a class, give it a sprite, make one in a room.)</p>",
       ask=("What are the three steps for a new kind of object?",
            "Make the class, give it a sprite, make one in a room")),
  TALK("0:04", "Draw a portal",
       "<p>Make a class called <strong>Portal</strong> and draw <code>portal.png</code> at "
       "80 by 120.</p>"),
  STEP(PORTAL_START, "look", "Give the portal its picture",
       ["The portal's picture."],
       at="0:10"),
  STEP(LEVEL1_START, "portal", "Put a portal on the high ground",
       ["At the very bottom of Level1 start: the portal, at the right-hand end of the high "
        "platform. Press Play and walk into it - nothing happens yet."],
       at="0:12"),
  TALK("0:16", "A second room",
       "<p>Make a new room called <strong>Level2</strong>. A room starts EMPTY: when the game "
       "changes room, everything from the old room is gone - Pixelhead included. So Level2 "
       "makes its own background, its own Pixelhead and its own floors.</p>",
       ask=("Why does Level2 need its own Player()?",
            "Changing room removes the old room's objects, Pixelhead too")),
  STEP(LEVEL2_START, "back", "Level 2's background",
       ["In Level2 start: the background first, as always."],
       at="0:20"),
  STEP(LEVEL2_START, "player", "Level 2's Pixelhead",
       ["A new Pixelhead, dropping in on the far left."],
       at="0:22"),
  STEP(LEVEL2_START, "floors", "A staircase",
       ["Three tiles, each 200 to the right and 100 higher than the last - steps up.",
        "The third step."],
       at="0:25"),
  STEP(PORTAL_LOOP, "travel", "Step through",
       ["In Portal loop: am I touching the Player? Only if I am, change to Level2. Press "
        "Play, climb to the portal and walk in."],
       at="0:34",
       ask=("Should this go in Portal or in Player?",
            "Either works; in Portal it keeps the portal's job in one place")),
  TALK("0:44", "Climb the stairs",
       "<p>Can everyone climb the Level2 staircase? It ends in mid-air - next week it gets a "
       "top and a way out.</p>"),
 ],
 "errors": [
   ("NameError: name 'Level2' is not defined", "Make the room first, called Level2 exactly - capital L, no space."),
   ("Level2 is empty", "Level2's objects go in Level2 start - its own background, player and floors."),
   ("The portal does nothing", "'Player' in the quotes must match the class exactly, and the lines go in Portal loop, not start."),
   ("You land in Level2 and fall straight through", "Check Level2's floors have the same y numbers as the slide; the first tile is at -500, -200, under Pixelhead."),
 ],
 "recap": [
   "A new object needs a class, a sprite, and to be made in a room.",
   "A [[room]] starts empty - each one makes its own objects.",
   "set_room('Level2') changes the room the moment it runs.",
   "A portal is a collision that changes room.",
 ],
 "homework": [
   {"task": "Design Level 3", "detail": "On squared paper, plan a third level: where the tiles go, where Pixelhead starts, where the portal is.", "done": "Every tile has an x and a y."},
   {"task": "Spot the bug", "detail": "Next week there will be a portal in Level2 as well. Where will it take you, with this code? Why?", "done": "Back to Level2 - every portal says set_room('Level2')."},
 ],
 "bonus": {"title": "A wasp in Level 2",
           "body": "<p>Add a wasp to <strong>Level2 start</strong> at x 0 and y 200. Can you get "
                   "past it on the stairs?</p>"},
 "slides": [
   {"title": "Review", "bullets": [
     "y is the middle", "New object: class, sprite, make one", "In a room"]},
   {"title": "Draw a portal", "sub": "portal.png - 80 x 120", "bullets": [
     "Make a class called Portal"]},
   {"title": "Give the portal its picture", "bullets": [], "code": [(PORTAL_START, "look")]},
   {"title": "Put a portal on the high ground", "bullets": [], "code": [(LEVEL1_START, "portal")]},
   {"title": "Checkpoint: a portal", "checkpoint": True,
    "say": "Press Play. A portal stands at the end of the high platform. Walking into it does nothing yet."},
   {"title": "A second room", "sub": "Level2", "bullets": [
     "A room starts empty", "Changing room removes the old objects",
     "Level2 makes its own Pixelhead"]},
   {"title": "Level 2's background", "bullets": [], "code": [(LEVEL2_START, "back")]},
   {"title": "Level 2's Pixelhead", "bullets": [], "code": [(LEVEL2_START, "player")]},
   {"title": "A staircase", "bullets": [], "code": [(LEVEL2_START, "floors")]},
   {"title": "Step through", "bullets": [], "code": [(PORTAL_LOOP, "travel")]},
   {"title": "Checkpoint: Level 2", "checkpoint": True,
    "say": "Press Play, climb up and walk into the portal. Level 2 begins: Pixelhead drops onto the bottom step."},
 ],
},

# --------------------------------------------------------------- week 13 ----
{
 "n": 13,
 "title": "Where does this portal go?",
 "big_idea": "Every portal goes to Level2 - even the one in Level2. Today each portal gets its own destination, a [[variable]] the room sets, and the last one leads to a Win room.",
 "new_concepts": ["a variable holding a room's name", "text()"],
 "objectives": [
   "Explain why a portal that always says 'Level2' is a bug",
   "Store a room's name in a [[variable]]",
   "Set one portal's destination from the room that made it",
   "Put words on the screen with [[text]]()",
 ],
 "ops": [
  ADD(LEVEL2_START, "top", [
    "self.floor4 = Floor()",
    "self.floor4.x = 100",
    "self.floor4.y = 100",
  ]),
  ADD(WIN_START, "message", [
    "self.message = text()",
    "self.message.color = 'white'",
    "self.message.fontSize = 60",
    "self.message.halign = 'center'",
    "self.message.text = 'YOU WIN!'",
  ]),
  ADD(PORTAL_START, "destination", [
    "self.destination = 'Level2'",
  ]),
  SET(PORTAL_LOOP, "travel", [
    "playerHit = get_collision(self, 'Player')",
    "if playerHit:",
    "    set_room(self.destination)",
  ]),
  ADD(LEVEL2_START, "portal", [
    "self.portal = Portal()",
    "self.portal.x = 300",
    "self.portal.y = 230",
    "self.portal.destination = 'Win'",
  ]),
 ],
 "flow": [
  TALK("0:00", "Review",
       "<p>Ask: what changes the room? (set_room.) How does the portal work? (It checks for "
       "the Player and changes room when they touch.) What does self.wasp1.x mean? (wasp1's "
       "x.)</p>",
       ask=("If Level2 has a portal too, where will it take you?",
            "Level2 again - every portal runs the same loop, and it says 'Level2'")),
  STEP(LEVEL2_START, "top", "Top of the stairs",
       ["Under Level2's floors: a fourth step at the top."],
       at="0:06"),
  TALK("0:09", "A Win room",
       "<p>Make a room called <strong>Win</strong>. It needs no Pixelhead - just words. "
       "[[text]]() makes a label; you set its colour, size and words with the dot.</p>"),
  STEP(WIN_START, "message", "Build the Win screen",
       ["In Win start: a label, white, big, lined up in the middle, saying YOU WIN!"],
       at="0:12"),
  TALK("0:18", "Each portal its own destination",
       "<p>A [[variable]] can hold a word as well as a number. Give every portal a "
       "<code>self.destination</code>, and have its loop go THERE instead of always to "
       "Level2.</p>",
       ask=("Why is a variable better than writing 'Level2' in the loop?",
            "Each portal can hold a different value; the loop stays the same")),
  STEP(PORTAL_START, "destination", "A destination",
       ["Under the picture line: every portal goes to Level2 unless it is told otherwise."],
       at="0:22"),
  STEP(PORTAL_LOOP, "travel", "Go to the destination",
       ["Change the last line: <code>'Level2'</code> in quotes becomes "
        "<code>self.destination</code>, no quotes. Press Play - the game plays the same as "
        "before."],
       at="0:25"),
  STEP(LEVEL2_START, "portal", "A portal to the Win room",
       ["At the bottom of Level2 start: a portal past the top step - and the dot changes "
        "THIS portal's destination to Win. Press Play and finish the game."],
       at="0:29",
       ask=("Level1's portal never sets a destination. Where does it go?",
            "Level2 - the one Portal start gives every portal")),
  TALK("0:40", "Play it through",
       "<p>Everyone plays from the start of Level1 to YOU WIN. Students who finish can add "
       "a Level3 between Level2 and Win - which two lines change?</p>"),
 ],
 "errors": [
   ("NameError: name 'Win' is not defined", "Make the room first, called Win exactly."),
   ("The Level2 portal sends you back to Level2", "The destination line must be in LEVEL2 start, under that portal: self.portal.destination = 'Win'."),
   ("The portal goes nowhere, with an error about 'self.destination'", "Take the quotes away: set_room(self.destination). With quotes it is the words 'self.destination', not the variable."),
   ("The Win screen is blank", "The label needs .text = 'YOU WIN!' and a colour that shows on your background."),
 ],
 "recap": [
   "A [[variable]] can hold a word, like 'Level2'.",
   "Portal start gives every portal a destination; the room can change one with the dot.",
   "set_room(self.destination) goes wherever this portal was told.",
   "[[text]]() puts words on the screen.",
 ],
 "homework": [
   {"task": "Quotes or not", "detail": "What is the difference between set_room('Level2') and set_room(self.destination)?", "done": "The first is always Level2; the second is whatever this portal holds."},
   {"task": "Add a Level 3", "detail": "Plan the lines you would change to go Level1, Level2, Level3, Win.", "done": "Level2's portal goes to Level3, and Level3's portal goes to Win."},
 ],
 "bonus": {"title": "Your own message",
           "body": "<p>Change <code>'YOU WIN!'</code> to your own words, and try a different "
                   "<code>color</code> like <code>'yellow'</code>.</p>"},
 "slides": [
   {"title": "Review", "bullets": [
     "set_room changes the room", "The portal checks for the Player", "Every portal says Level2..."]},
   {"title": "Top of the stairs", "bullets": [], "code": [(LEVEL2_START, "top")]},
   {"title": "A Win room", "sub": "self.message = text()", "bullets": [
     "Make a room called Win", "No Pixelhead - just words", "text() makes a label"]},
   {"title": "Build the Win screen", "bullets": [], "code": [(WIN_START, "message")]},
   {"title": "Each portal its own destination", "sub": "self.destination = 'Level2'", "bullets": [
     "A variable can hold a word", "Every portal has its own", "The loop goes there"]},
   {"title": "A destination", "bullets": [], "code": [(PORTAL_START, "destination")]},
   {"title": "Go to the destination", "bullets": [], "code": [(PORTAL_LOOP, "travel")]},
   {"title": "Checkpoint: the same game", "checkpoint": True,
    "say": "Press Play. The Level1 portal still takes you to Level2. Nothing looks different - and that is right."},
   {"title": "A portal to the Win room", "bullets": [], "code": [(LEVEL2_START, "portal")]},
   {"title": "Checkpoint: YOU WIN", "checkpoint": True,
    "say": "Press Play and play it through. The Level2 portal takes you to YOU WIN!"},
 ],
},

# --------------------------------------------------------------- week 14 ----
{
 "n": 14,
 "title": "Three lives",
 "big_idea": "One sting should not end everything. Today the [[game]] itself keeps three lives, a sting costs one, falling off costs them all - and Game loop starts Level1 again when they run out.",
 "new_concepts": ["game.", "Game loop", "&lt;="],
 "objectives": [
   "Explain why the health lives in Game and not in Player",
   "Reach Game's variables with [[game]]. from any class",
   "Change a sting so it costs health instead of Pixelhead",
   "Restart the game when the health runs out",
 ],
 "ops": [
  ADD(GAME_START, "health", [
    "self.health = 3",
  ]),
  SET(PLAYER_LOOP, "enemies", [
    "enemyHit = get_collision(self, 'FlyEnemy')",
    "if enemyHit:",
    "    if self.y > enemyHit.y:",
    "        destroy(enemyHit)",
    "        self.jumpTimer = 15",
    "    else:",
    "        destroy(enemyHit)",
    "        game.health = game.health - 1",
  ]),
  ADD(GAME_LOOP, "restart", [
    "if self.health <= 0:",
    "    self.health = 3",
    "    set_room('Level1')",
  ]),
  ADD(PLAYER_LOOP, "fall", [
    "if self.y < -400:",
    "    game.health = 0",
  ]),
 ],
 "flow": [
  TALK("0:00", "Where should the health live?",
       "<p>Ask which class should keep the health. Most will say Player. But every room "
       "makes a NEW Pixelhead - go through a portal and a Player health would start again "
       "at 3.</p>",
       "<p>The Game class is made once and lasts the whole game. Inside Game it is "
       "<code>self</code>; from every other class you reach it as [[game]].</p>",
       ask=("Why not keep the health in Player start?",
            "Every room makes a new Player, so it would reset at every portal")),
  STEP(GAME_START, "health", "Three lives",
       ["At the VERY TOP of Game start, above set_room: three lives, kept by the game."],
       at="0:08"),
  STEP(PLAYER_LOOP, "enemies", "A sting costs a life",
       ["The first line does not change.",
        "The last line changes: <code>destroy(self)</code> goes. In its place the WASP is "
        "destroyed - so it cannot sting you sixty times a second - and the game loses one "
        "life."],
       at="0:11",
       ask=("Why destroy the wasp when it stings you?",
            "Still touching, it would take a life every loop - all three in a blink")),
  TALK("0:18", "Game loop",
       "<p>Game has a loop too, running all game long, whichever room you are in. It is the "
       "right place to watch the lives. <code>&lt;=</code> means less than or equal.</p>"),
  STEP(GAME_LOOP, "restart", "Start again at zero",
       ["In Game loop: once the lives are 0 or less, refill them and start Level1 again. "
        "Two wasps cannot take three lives, so there is nothing to see until the next "
        "step."],
       at="0:22"),
  STEP(PLAYER_LOOP, "fall", "Falling off costs everything",
       ["At the very bottom of Player loop: below -400 you have fallen off the world. Set "
        "the lives to 0, and Game loop does the rest. Press Play and jump off the edge."],
       at="0:30",
       ask=("Why not call set_room here as well?",
            "Game loop already restarts at 0 - one place does it, for every way of losing")),
  TALK("0:40", "Play it",
       "<p>Count lives out loud as you play: a sting is one, a fall is all of them. Next week "
       "they appear on the screen.</p>",
       "<p>Ask: Level 2 has no wasps. How could you add one?</p>"),
 ],
 "errors": [
   ("NameError: name 'health' is not defined", "In Player it is game.health; in Game it is self.health."),
   ("All three lives go at once", "The sting must destroy(enemyHit), or the wasp keeps touching you every loop."),
   ("The game never restarts", "The restart lines go in Game LOOP, not Game start, and Level1 is spelled exactly."),
   ("Falling does nothing", "The fall lines are in Player loop, not pushed in under another if, and use &lt; -400."),
 ],
 "recap": [
   "Game is made once and lasts the whole game, so it keeps the lives.",
   "From another class, Game's health is [[game]].health.",
   "A sting destroys the wasp and costs one life.",
   "Game loop restarts Level1 whenever the lives reach 0.",
 ],
 "homework": [
   {"task": "Why game.", "detail": "Explain why game.health keeps its value through a portal, but a Player's own variables do not.", "done": "Game lasts the whole game; each room makes a new Player."},
   {"task": "Easier or harder", "detail": "Would five lives make a better game? Try it.", "done": "You picked a number and can say why."},
 ],
 "bonus": {"title": "A fair fall",
           "body": "<p>Change the fall to cost one life instead of all of them. What goes "
                   "wrong? (Pixelhead is still under the world, losing a life every loop.) "
                   "How could you fix it?</p>"},
 "slides": [
   {"title": "Where should the health live?", "sub": "game.health", "bullets": [
     "Every room makes a new Pixelhead", "Game lasts the whole game",
     "Inside Game: self. Everywhere else: game."]},
   {"title": "Three lives", "bullets": [], "code": [(GAME_START, "health")]},
   {"title": "A sting costs a life", "bullets": [], "code": [(PLAYER_LOOP, "enemies")]},
   {"title": "Checkpoint: stung, not gone", "checkpoint": True,
    "say": "Press Play and jump up into a wasp from the grass. The wasp disappears and Pixelhead survives."},
   {"title": "Game loop", "sub": "if self.health <= 0:", "bullets": [
     "Game's loop runs in every room", "&lt;= is less than or equal", "It watches the lives"]},
   {"title": "Start again at zero", "bullets": [], "code": [(GAME_LOOP, "restart")]},
   {"title": "Falling off costs everything", "bullets": [], "code": [(PLAYER_LOOP, "fall")]},
   {"title": "Checkpoint: off the edge", "checkpoint": True,
    "say": "Press Play and walk off the edge of the grass. Level 1 starts again."},
 ],
},

# --------------------------------------------------------------- week 15 ----
{
 "n": 15,
 "title": "Hearts on the screen",
 "big_idea": "You cannot see your lives yet. Today three Heart objects, made by the Game, survive every room change because they are [[persistent]], and each one hides when the lives drop below its number.",
 "new_concepts": ["persistent", "z", "visible"],
 "draw": ["heart.png"],
 "objectives": [
   "Make an object [[persistent]] so a room change does not remove it",
   "Bring an object to the front with z",
   "Give each object of a class its own number with the dot",
   "Show or hide an object with visible",
 ],
 "ops": [
  ADD(HEART_START, "look", [
    "self.image = sprite('heart.png')",
  ]),
  ADD(GAME_START, "hearts", [
    "self.heart1 = Heart()",
    "self.heart1.x = -590",
    "self.heart1.y = 300",
    "self.heart1.minimumHealth = 1",
    "self.heart2 = Heart()",
    "self.heart2.x = -540",
    "self.heart2.y = 300",
    "self.heart2.minimumHealth = 2",
    "self.heart3 = Heart()",
    "self.heart3.x = -490",
    "self.heart3.y = 300",
    "self.heart3.minimumHealth = 3",
  ]),
  ADD(HEART_START, "keep", [
    "self.persistent = True",
    "self.z = 1",
  ]),
  ADD(HEART_LOOP, "show", [
    "if game.health >= self.minimumHealth:",
    "    self.visible = True",
    "else:",
    "    self.visible = False",
  ]),
 ],
 "flow": [
  TALK("0:00", "Review",
       "<p>Ask: where do the lives live, and why? (In Game - it lasts the whole game.) How "
       "does Player reach them? (game.health.)</p>",
       ask=("If Game keeps the lives, who should make the hearts?",
            "Game - the hearts belong to the whole game too")),
  TALK("0:04", "Draw a heart",
       "<p>Make a class called <strong>Heart</strong> and draw <code>heart.png</code> at 40 "
       "by 40.</p>"),
  STEP(HEART_START, "look", "Give the heart its picture",
       ["The heart's picture."],
       at="0:08"),
  STEP(GAME_START, "hearts", "Three hearts, top left",
       ["In Game start, under the health line and ABOVE set_room: three hearts in a row, 50 "
        "apart. Each gets its own number: the lowest health at which it still shows.",
        "The third heart, which shows only at full health."],
       at="0:10",
       ask=("Press Play. Where are the hearts?",
            "Gone - set_room clears everything from before, and the background is drawn over them")),
  TALK("0:20", "Persistent, and in front",
       "<p>A room change removes every object - unless it is [[persistent]]. And objects "
       "made earlier are drawn further back; <code>z</code> brings one forward. 1 is in "
       "front of everything at 0.</p>"),
  STEP(HEART_START, "keep", "Keep the hearts in front",
       ["Under the picture line: survive every room change, and draw in front. Press Play "
        "- three hearts, top left."],
       at="0:24"),
  STEP(HEART_LOOP, "show", "Hide a lost heart",
       ["In Heart loop: while the game's lives are at least my number, show me; otherwise "
        "hide me. Press Play and get stung."],
       at="0:30",
       ask=("Why do the hearts come back after a restart without any new code?",
            "Game loop sets the lives back to 3, and every heart checks the lives every loop")),
  TALK("0:40", "Play the finished game",
       "<p>Everyone plays from Level1 to YOU WIN with their hearts showing. That is the whole "
       "Platformer - every line typed by them.</p>"),
 ],
 "errors": [
   ("No hearts at all", "self.persistent = True must be in Heart start - otherwise set_room removes them."),
   ("The hearts flash and vanish behind the background", "self.z = 1 in Heart start brings them to the front."),
   ("AttributeError: 'minimumHealth'", "Each heart needs its own minimumHealth set in Game start, spelled exactly the same as in Heart loop."),
   ("The hearts never disappear", "Heart loop compares game.health - with game. in front - to self.minimumHealth."),
 ],
 "recap": [
   "A [[persistent]] object survives every room change.",
   "z brings an object forward: 1 is in front of 0.",
   "Each heart holds its own minimumHealth, set with the dot.",
   "visible shows or hides an object without destroying it.",
 ],
 "homework": [
   {"task": "Trace it", "detail": "The lives are 2. Which hearts show?", "done": "heart1 and heart2 - heart3 needs 3."},
   {"task": "Your own level", "detail": "Build a Level3 from your plan, with its own portal to Win.", "done": "You can play Level1 to Level2 to Level3 to YOU WIN."},
 ],
 "bonus": {"title": "A heart pickup",
           "body": "<p>Make a class that gives a life back when Pixelhead touches it - but "
                   "never more than 3. Which of this course's patterns do you need?</p>"},
 "slides": [
   {"title": "Review", "bullets": [
     "Game keeps the lives", "Player uses game.health", "Game should make the hearts"]},
   {"title": "Draw a heart", "sub": "heart.png - 40 x 40", "bullets": [
     "Make a class called Heart"]},
   {"title": "Give the heart its picture", "bullets": [], "code": [(HEART_START, "look")]},
   {"title": "Three hearts, top left", "bullets": [], "code": [(GAME_START, "hearts")]},
   {"title": "Checkpoint: where are they?", "checkpoint": True,
    "say": "Press Play. No hearts! set_room removed them. Ask why before the next slide."},
   {"title": "Persistent, and in front", "sub": "self.persistent = True", "bullets": [
     "A room change removes every object...", "...unless it is persistent", "z = 1 draws it in front"]},
   {"title": "Keep the hearts in front", "bullets": [], "code": [(HEART_START, "keep")]},
   {"title": "Hide a lost heart", "bullets": [], "code": [(HEART_LOOP, "show")]},
   {"title": "Checkpoint: the whole game", "checkpoint": True,
    "say": "Press Play. Three hearts in the corner; a sting hides one; fall off and Level 1 starts again with three."},
 ],
},

]


# --- what each line teaches -------------------------------------------------
#
# Returns the concept keys a line introduces, general shape first. Only keys
# that also exist in CONCEPTS produce a slide, and each only the first time.
def line_concepts(panel, line):
    stripped = line.strip()
    keys = []
    if panel.endswith(" start"):
        keys.append("py:start")
    if panel.endswith(" loop"):
        keys.append("py:loop")
    if "set_room(" in stripped:
        keys.append("py:room")
    if "sprite(" in stripped:
        keys.append("py:sprite")
    if re.match(r"self\.\w+ = [A-Z]\w*\(\)$", stripped):
        keys.append("py:make")
    if re.match(r"self\.\w+\.\w+ = ", stripped):
        keys.append("py:dot")
    if re.match(r"self(\.\w+)?\.[xy] = -?\d+$", stripped):
        keys.append("py:coords")
    if re.match(r"self\.\w+ = -?\d", stripped):
        keys.append("py:variable")
    if re.match(r"self\.[xy] = self\.[xy] [-+]", stripped):
        keys.append("py:change")
    if stripped.startswith("if "):
        keys.append("py:if")
    if "key_is_pressed(" in stripped:
        keys.append("py:keys")
    if re.match(r"self\.scaleX = -", stripped):
        keys.append("py:flip")
    if "Background()" in stripped:
        keys.append("py:order")
    if "scaleY" in stripped:
        keys.append("py:scale")
    if re.search(r" (<|>|<=|>=) ", stripped):
        keys.append("py:compare")
    if "get_collision(" in stripped:
        keys.append("py:collision")
    if re.match(r"[a-z]\w* = get_collision", stripped):
        keys.append("py:local")
    if "key_was_pressed(" in stripped:
        keys.append("py:press")
    if "jumpTimer - 1" in stripped:
        keys.append("py:timer")
    if re.search(r"\b(True|False)\b", stripped):
        keys.append("py:bool")
    if stripped == "else:":
        keys.append("py:else")
    if " and " in stripped:
        keys.append("py:and")
    if " == " in stripped:
        keys.append("py:equals")
    if line.startswith("    if "):
        keys.append("py:nested")
    if "destroy(" in stripped:
        keys.append("py:destroy")
    if "= text()" in stripped:
        keys.append("py:text")
    if re.match(r"self(\.\w+)+ = '", stripped):
        keys.append("py:string")
    if "game." in stripped:
        keys.append("py:game")
    if "persistent" in stripped:
        keys.append("py:persistent")
    if stripped.startswith("self.z ="):
        keys.append("py:z")
    if "visible" in stripped:
        keys.append("py:visible")
    return keys


# key -> (kind, title, [bullets], example). kind picks the slide's eyebrow.
CONCEPTS = {
    "py:start": ("game", "start runs once",
        ["Everything in [[start]] runs one time, the moment the [[object]] is made.",
         "Use it to set a picture, a place or a starting number."],
        "self.image = sprite('pixelhead.png')"),
    "py:loop": ("game", "loop runs over and over",
        ["[[loop]] runs about 60 times every second, until the object is gone.",
         "Anything that moves lives in loop."],
        "self.x = self.x + self.speed"),
    "py:room": ("game", "A room is one screen",
        ["Your game can have more than one screen. Each one is a [[room]].",
         "set_room picks which screen to show."],
        "set_room('Level1')"),
    "py:sprite": ("art", "A sprite is your picture",
        ["[[sprite]]() finds the picture you drew and puts it on the [[object]].",
         "The name has to match exactly, including the .png."],
        "self.image = sprite('pixelhead.png')"),
    "py:make": ("py", "Making an object",
        ["Player() makes one player from the Player [[class]].",
         "The name on the left is how you talk to it afterwards."],
        "self.player = Player()"),
    "py:dot": ("py", "The dot reaches inside",
        ["self.wasp1.x means: the x that belongs to self.wasp1 - wasp1's x.",
         "The [[dot]] lets the room change an object it made."],
        "self.wasp1.x = 300"),
    "py:coords": ("game", "x and y",
        ["The middle of the screen is x 0, y 0.",
         "Plus x is right, plus y is UP. Minus goes left and down."],
        "self.wasp1.x = 300"),
    "py:variable": ("py", "A variable holds a value",
        ["A [[variable]] is a name with a value in it. The name goes left of =.",
         "self. in front makes it belong to this object, so start and loop can share it."],
        "self.speed = -3"),
    "py:change": ("py", "Change a value using itself",
        ["Python works out the right side first, then stores the answer on the left.",
         "Do it every [[loop]] and the object moves."],
        "self.x = self.x + self.speed"),
    "py:if": ("py", "if means only when",
        ["The lines under an [[if]] run only when its question is true.",
         "The if line ends with a colon; the lines under it start with four spaces."],
        "if key_is_pressed('arrowRight'):"),
    "py:keys": ("game", "key_is_pressed()",
        ["[[key_is_pressed('arrowRight')|key_is_pressed]] is True for every loop you hold the key.",
         "Put it in an if to move while a key is held."],
        "if key_is_pressed('arrowRight'):"),
    "py:flip": ("art", "A minus scaleX flips",
        ["[[scaleX|scale]] = 1 is the picture as you drew it.",
         "scaleX = -1 is the same size, flipped like a mirror."],
        "self.scaleX = -1"),
    "py:order": ("game", "Made first, drawn at the back",
        ["Objects are drawn in the order they were made.",
         "Make the background first so everything else is drawn on top."],
        "self.background = Background()"),
    "py:scale": ("art", "scaleX and scaleY",
        ["1 is the size you drew. 0.7 is seven tenths, 2 is double.",
         "Change both by the same amount to keep the shape."],
        "self.scaleY = 0.7"),
    "py:compare": ("py", "Comparing numbers",
        ["&lt; is less than, &gt; is greater than.",
         "&lt;= and &gt;= also count the number itself."],
        "if self.x > 500:"),
    "py:collision": ("game", "get_collision - are they touching?",
        ["[[get_collision(self, 'Floor')|get_collision]] gives back the tile you are touching, or False.",
         "An [[if]] treats the tile as yes and False as no."],
        "touchingFloor = get_collision(self, 'Floor')"),
    "py:local": ("py", "A name for right now",
        ["A name with no self. in front lives only inside this loop.",
         "Use it for an answer you need right here and nowhere else."],
        "touchingFloor = get_collision(self, 'Floor')"),
    "py:press": ("game", "key_was_pressed()",
        ["[[key_was_pressed(' ')|key_was_pressed]] is True for only the one loop the key goes down.",
         "One press, one jump - however long you hold it."],
        "if key_was_pressed(' '):"),
    "py:timer": ("py", "A timer counts down",
        ["A [[timer]] changes by one every loop. 60 loops is one second.",
         "Set it, let it count down, and act while it is above 0."],
        "self.jumpTimer = self.jumpTimer - 1"),
    "py:bool": ("py", "True or False",
        ["A [[boolean]] has only two values: True and False.",
         "Like a light switch. Python writes them with a capital letter."],
        "self.onGround = False"),
    "py:else": ("py", "else - otherwise",
        ["[[else]]: lines up with its if, and ends with a colon.",
         "Its lines run when the if is NOT true."],
        "else:"),
    "py:and": ("py", "and - both at once",
        ["[[and]] joins two questions.",
         "The if runs only when BOTH are true."],
        "if key_was_pressed(' ') and self.onGround == True:"),
    "py:equals": ("py", "== asks, = stores",
        ["One = puts a value into a name.",
         "Two == asks whether two things are exactly equal."],
        "self.onGround == True"),
    "py:nested": ("py", "An if inside an if",
        ["The inside if only gets asked when the outside one is true.",
         "Its lines are pushed in eight spaces."],
        "    if self.y > enemyHit.y:"),
    "py:destroy": ("game", "destroy() removes an object",
        ["[[destroy]](enemyHit) takes the wasp you touched out of the game.",
         "destroy(self) removes the object whose code is running."],
        "destroy(enemyHit)"),
    "py:text": ("game", "text() puts words on the screen",
        ["[[text]]() makes a label. Its .text is the words it shows.",
         "Set its color, size and place like any object."],
        "self.message = text()"),
    "py:string": ("py", "Words in quotes",
        ["Writing in quotes is a value too, like 'white' or 'Level2'.",
         "A [[variable]] can hold words as well as numbers."],
        "self.destination = 'Level2'"),
    "py:game": ("game", "game. reaches the Game",
        ["The Game class is made once and lasts the whole game.",
         "Inside Game it is self; from any other class it is [[game]]."],
        "game.health = game.health - 1"),
    "py:persistent": ("game", "persistent survives a room change",
        ["set_room removes every object from the old room...",
         "...except a [[persistent]] one."],
        "self.persistent = True"),
    "py:z": ("game", "z brings it forward",
        ["Objects with a bigger z are drawn in front.",
         "Everything starts at 0, so 1 is in front of all of it."],
        "self.z = 1"),
    "py:visible": ("game", "visible shows or hides",
        ["visible = False hides an object without destroying it.",
         "visible = True shows it again."],
        "self.visible = False"),
}


# --- the same concept, as the BOOK announces it -----------------------------
#
# key -> (kind, name, lead). "word" is something you type, printed as code;
# "idea" is a thing the code does. See pxp101/course.py for why.
BOOK_TERMS = {
    "py:start":      ("word", "start", ""),
    "py:loop":       ("word", "loop", ""),
    "py:room":       ("word", "room", ""),
    "py:sprite":     ("word", "sprite()", ""),
    "py:make":       ("idea", "Making an object", ""),
    "py:dot":        ("idea", "The dot", "The dot reaches inside an object."),
    "py:coords":     ("word", "x and y", "x and y are where an object is on the screen."),
    "py:variable":   ("idea", "A variable", ""),
    "py:change":     ("idea", "Changing a value", ""),
    "py:if":         ("word", "if", ""),
    "py:keys":       ("word", "key_is_pressed()", ""),
    "py:flip":       ("idea", "Flipping a picture", ""),
    "py:order":      ("idea", "Draw order", ""),
    "py:scale":      ("word", "scaleX and scaleY", "They stretch or shrink an object's picture."),
    "py:compare":    ("idea", "Comparing numbers", ""),
    "py:collision":  ("word", "get_collision()", ""),
    "py:local":      ("idea", "A name for right now", ""),
    "py:press":      ("word", "key_was_pressed()", ""),
    "py:timer":      ("idea", "A timer", ""),
    "py:bool":       ("word", "True and False", "A boolean is True or False."),
    "py:else":       ("word", "else", ""),
    "py:and":        ("word", "and", ""),
    "py:equals":     ("word", "==", "== asks whether two things are equal."),
    "py:nested":     ("idea", "An if inside an if", ""),
    "py:destroy":    ("word", "destroy()", ""),
    "py:text":       ("word", "text()", ""),
    "py:string":     ("idea", "Words in quotes", ""),
    "py:game":       ("word", "game.", "game. reaches the Game class from anywhere."),
    "py:persistent": ("word", "persistent", ""),
    "py:z":          ("word", "z", "z decides what is drawn in front."),
    "py:visible":    ("word", "visible", ""),
}


def book_term(key):
    """One concept's box heading in the book: (label, name, lead). The build
    refuses to ship a concept with no entry, so this may raise."""
    kind, name, lead = BOOK_TERMS[key]
    return "New word" if kind == "word" else "New idea", name, lead

# The words you have to learn to read this game. Prose marks a term the first
# time it is used in its coding sense - [[loop]], or [[destroyed|destroy]] - and
# every slug a mark names must exist here. One sentence, second person, true of
# what you actually did.
GLOSSARY = {
    "class":   "A KIND of thing in your game - Player, FlyEnemy, Floor. Every object is made from one.",
    "object":  "One thing made from a class: Pixelhead, one wasp, one grass tile. You can see it and give it orders.",
    "sprite":  "The picture you drew, put onto an object. The name has to match exactly, including the .png.",
    "room":    "One screen of your game - Level1, Level2 and Win. set_room picks which one you see, and removes everything from the room before.",
    "start":   "The part of an object that runs once, the moment it is made - for its picture, its place and its starting numbers.",
    "loop":    "The part of an object that runs over and over, about sixty times a second. Anything that moves lives here.",
    "coordinates": "x and y, the address of a spot on the screen. The middle is 0, 0; plus x is right and plus y is up.",
    "dot":     "The . between two names. self.wasp1.x means wasp1's x - the x that belongs to self.wasp1.",
    "variable": "A name that holds a value, like self.speed = 5 or self.destination = 'Level2'. With self. in front it belongs to the object.",
    "scale":   "scaleX and scaleY stretch a picture: 1 is the size you drew, 0.7 is smaller, and a minus flips it like a mirror.",
    "if":      "Runs the lines under it only when its question is true. The if ends with a colon and the lines under it are pushed in four spaces.",
    "key_is_pressed": "True for every loop you hold a key down, so holding the right arrow keeps Pixelhead walking.",
    "key_was_pressed": "True for only the one loop a key goes down, so one press of space is one jump.",
    "get_collision": "Asks whether this object is touching one of a class. It gives back the thing it touches, or False.",
    "timer":   "A number that changes by one every loop. Your jump timer is set to 30 and counts down; while it is above 0 you rise.",
    "boolean": "A value that is either True or False, like self.onGround - a switch that is on or off.",
    "else":    "Goes under an if, lined up with it. Its lines run when the if's question is not true.",
    "and":     "Joins two questions in one if. The if runs only when both are true.",
    "destroy": "Takes an object out of the game for good. destroy(enemyHit) removes the wasp you touched.",
    "text":    "A label that shows words on the screen. You make one with text() and set its .text to what it says.",
    "game":    "The Game class, made once and lasting the whole game. From any other class you reach its variables as game.health.",
    "persistent": "An object with self.persistent = True survives set_room, so your hearts stay through every portal.",
}

# Animated metaphors. Reuses build.concept_visual's library - see SLIDE-RULES.
VISUALS = {
    "py:start": {"kind": "machine", "in": "object made", "label": "start", "out": "done once",
                 "cap": "[[start]] runs one time, then never again."},
    "py:loop": {"kind": "loop", "items": ["1", "2", "3", "4"],
                "cap": "[[loop]] runs again and again, about 60 times a second."},
    "py:room": {"kind": "swap", "off": "nothing", "on": "Level1",
                "cap": "A [[room]] is one screen. set_room picks which one you see."},
    "py:sprite": {"kind": "swap", "off": "nothing", "on": "your art",
                  "cap": "[[sprite]]() puts the picture you drew onto the [[object]]."},
    "py:make": {"kind": "dom", "parent": "Level1 room", "child": "a Player", "mode": "add",
                "cap": "Player() makes one and puts it in the [[room]]."},
    "py:coords": {"kind": "resize", "axis": "w",
                  "cap": "x is left and right. Minus numbers go LEFT."},
    "py:variable": {"kind": "machine", "in": "-3", "label": "self.speed", "out": "kept",
                    "cap": "A [[variable]] is a name that keeps a value for later."},
    "py:change": {"kind": "machine", "in": "300", "label": "+ -3", "out": "297",
                  "cap": "The old value goes in on the right; the new one is stored on the left."},
    "py:if": {"kind": "fork", "cond": "right held?", "yes": "walk right", "no": "carry on",
              "cap": "[[if]] means only when - the pushed-in lines run only if it is true."},
    "py:keys": {"kind": "event", "btn": "hold right", "action": "x goes up",
                "cap": "[[key_is_pressed]] is True for as long as you hold the key."},
    "py:flip": {"kind": "swap", "off": "scaleX = 1", "on": "scaleX = -1",
                "cap": "A minus [[scaleX|scale]] flips the picture to face the other way."},
    "py:scale": {"kind": "resize", "axis": "w",
                 "cap": "[[scaleX and scaleY|scale]] stretch and shrink the picture."},
    "py:collision": {"kind": "fork", "cond": "touching?", "yes": "stand", "no": "keep falling",
                     "cap": "[[get_collision]] answers with the tile you touch, or False."},
    "py:press": {"kind": "event", "btn": "space", "action": "one jump",
                 "cap": "[[key_was_pressed]] is True for one loop only - one press, one jump."},
    "py:timer": {"kind": "loop", "items": ["30", "29", "...", "0"],
                 "cap": "The jump [[timer]] counts down; above 0, you rise."},
    "py:bool": {"kind": "swap", "off": "False", "on": "True",
                "cap": "A [[boolean]] is a switch: True or False."},
    "py:else": {"kind": "fork", "cond": "touching floor?", "yes": "onGround True", "no": "onGround False",
                "cap": "[[else]] runs when the if is not true."},
    "py:destroy": {"kind": "swap", "off": "a wasp", "on": "(gone)",
                   "cap": "[[destroy]] takes an object out of the game for good."},
    "py:text": {"kind": "swap", "off": "(nothing)", "on": "YOU WIN!",
                "cap": "[[text]]() puts words on the screen; .text is what they say."},
    "py:persistent": {"kind": "swap", "off": "removed", "on": "kept",
                      "cap": "A [[persistent]] object survives a room change."},
    "py:visible": {"kind": "swap", "off": "visible = True", "on": "visible = False",
                   "cap": "visible hides an object without destroying it."},
}

LINE_NOTES = {
    (GAME_START, "setup"): ["Open the game on the room called Level1."],
    (PLAYER_START, "look"): ["Use the Pixelhead picture you drew."],
    (LEVEL1_START, "player"): [
        "Make one player and keep it as self.player. Press Play!",
        "Start it at y 400, above the top, so it drops in.",
    ],
    (WASP_START, "look"): ["Use the wasp picture you drew."],
    (LEVEL1_START, "wasps"): [
        "Make one wasp and keep it as self.wasp1.",
        "300 to the right of the middle.",
        "200 up, high in the sky.",
        "A second wasp, self.wasp2.",
        "300 to the LEFT - minus.",
        "The same height.",
    ],
    (WASP_START, "speed"): ["3 steps a loop - minus, so to the left."],
    (WASP_LOOP, "fly"): ["Add the speed to x, every loop."],
    (PLAYER_START, "speed"): ["Pixelhead moves 5 steps every loop an arrow is held."],
    (PLAYER_LOOP, "walk"): [
        "Only while the right arrow is held...",
        "...add the speed to x: right. Four spaces in front!",
        "Only while the left arrow is held...",
        "...take the speed off x: left.",
    ],
    # Week 4 slots a line into each if; its notes line up with the new block.
    (4, PLAYER_LOOP, "walk"): [
        "Only while the right arrow is held...",
        "...walk right...",
        "NEW: face right - the picture as you drew it. Four spaces in front.",
        "Only while the left arrow is held...",
        "...walk left...",
        "NEW: flip to face left.",
    ],
    (BACK_START, "look"): ["Use the coast picture you drew."],
    (LEVEL1_START, "back"): ["At the VERY TOP: make the background first, so it is drawn at the back."],
    (FLOOR_START, "look"): ["Use the grass tile you drew."],
    (LEVEL1_START, "floors"): [
        "The first grass tile.",
        "100 left of the middle.",
        "Below the middle.",
        "The second tile.",
        "Right in the middle.",
        "The same height.",
        "The third tile.",
        "100 to the right.",
        "The same height again.",
    ],
    (WASP_START, "scale"): [
        "Seven tenths as wide...",
        "...and seven tenths as tall.",
    ],
    (WASP_LOOP, "turn"): [
        "Only once the wasp is past 500 on the right...",
        "...fly left again...",
        "...and face left - the size start gave it.",
        "Only once it is past -500 on the left...",
        "...fly right...",
        "...and flip to face right.",
    ],
    (PLAYER_LOOP, "gravity"): ["Gravity: down 2, every loop. Not pushed in."],
    (PLAYER_LOOP, "floor"): [
        "Am I touching a Floor? Keep the answer in touchingFloor.",
        "Only when I am...",
        "...put back the 2 that gravity took.",
    ],
    # Week 9 adds onGround around the + 2.
    (9, PLAYER_LOOP, "floor"): [
        "Am I touching a Floor?",
        "Only when I am...",
        "NEW: I am on the ground. Above the + 2 line.",
        "...put back the 2 that gravity took.",
        "NEW: otherwise - lined up with the if...",
        "NEW: ...I am not on the ground.",
    ],
    # Week 11 rewrites the if line; the rest stays.
    (11, PLAYER_LOOP, "floor"): [
        "Am I touching a Floor?",
        "CHANGED: only when I am touching one AND my middle is above its top...",
        "...I am on the ground...",
        "...and gravity is cancelled.",
        "Otherwise...",
        "...I am not on the ground.",
    ],
    (PLAYER_LOOP, "jump"): [
        "Only on the one loop space goes down...",
        "...jump up 50.",
    ],
    # Week 8 swaps the 50 for the timer.
    (8, PLAYER_LOOP, "jump"): [
        "Only on the one loop space goes down...",
        "CHANGED: ...start the jump timer at 30.",
    ],
    # Week 9 makes the jump check the ground too.
    (9, PLAYER_LOOP, "jump"): [
        "CHANGED: only when space goes down AND I am on the ground...",
        "...start the jump timer.",
    ],
    (LEVEL1_START, "upper"): [
        "A fourth tile.",
        "Over on the right.",
        "100 higher than the grass.",
        "A fifth tile.",
        "Next to it.",
        "The same height.",
    ],
    (PLAYER_START, "jumpTimer"): ["The jump timer starts at 0: not jumping."],
    (PLAYER_LOOP, "rise"): [
        "Only while the timer is above 0...",
        "...go up 8.",
    ],
    (PLAYER_LOOP, "countdown"): ["Take one off the timer, every loop. Not pushed in."],
    (PLAYER_START, "onGround"): ["Not on the ground yet - False, capital F."],
    (PLAYER_LOOP, "enemies"): [
        "Which wasp am I touching, if any? Keep it in enemyHit.",
        "Only when I am touching one...",
        "...if I am higher than it - eight spaces in front...",
        "...that wasp is destroyed.",
        "Otherwise - lined up with the inner if...",
        "...I am.",
    ],
    # Week 11 slots a bounce in under the stomp.
    (11, PLAYER_LOOP, "enemies"): [
        "Which wasp am I touching?",
        "Only when I am touching one...",
        "...if I am higher...",
        "...the wasp is destroyed...",
        "NEW: ...and I bounce. Lined up with destroy(enemyHit).",
        "Otherwise...",
        "...I am destroyed.",
    ],
    # Week 14 swaps the last line for two.
    (14, PLAYER_LOOP, "enemies"): [
        "Which wasp am I touching?",
        "Only when I am touching one...",
        "...if I am higher...",
        "...the wasp is destroyed...",
        "...and I bounce.",
        "Otherwise...",
        "NEW: ...the wasp that stung me is destroyed...",
        "NEW: ...and the game loses one life.",
    ],
    (PORTAL_START, "look"): ["Use the portal picture you drew."],
    (LEVEL1_START, "portal"): [
        "Make a portal.",
        "At the right-hand end of the high platform.",
        "Standing on it.",
    ],
    (LEVEL2_START, "back"): ["Level2's own background, made first."],
    (LEVEL2_START, "player"): [
        "Level2's own Pixelhead.",
        "Over on the far left.",
        "Dropping in from the top.",
    ],
    (LEVEL2_START, "floors"): [
        "The bottom step.",
        "Under Pixelhead, on the far left.",
        "Low down.",
        "The second step.",
        "200 to the right.",
        "100 higher.",
        "The third step.",
        "200 further.",
        "100 higher again.",
    ],
    (PORTAL_LOOP, "travel"): [
        "Am I touching the Player?",
        "Only when I am...",
        "...change to Level2.",
    ],
    # Week 13 swaps the room name for the variable.
    (13, PORTAL_LOOP, "travel"): [
        "Am I touching the Player?",
        "Only when I am...",
        "CHANGED: ...go to MY destination. No quotes.",
    ],
    (LEVEL2_START, "top"): [
        "The top step.",
        "200 further right.",
        "100 higher.",
    ],
    (WIN_START, "message"): [
        "A label for the Win room.",
        "White writing.",
        "Big - 60.",
        "Lined up in the middle.",
        "The words to show.",
    ],
    (PORTAL_START, "destination"): ["Every portal goes to Level2 unless it is told otherwise."],
    (LEVEL2_START, "portal"): [
        "Level2's portal.",
        "Past the top step.",
        "A jump up from it.",
        "THIS portal goes to the Win room.",
    ],
    (GAME_START, "health"): ["Three lives, kept by the Game - at the very top."],
    (GAME_LOOP, "restart"): [
        "Only once the lives are 0 or less...",
        "...refill them...",
        "...and start Level1 again.",
    ],
    (PLAYER_LOOP, "fall"): [
        "Only once I am below -400, off the bottom...",
        "...the game has no lives left.",
    ],
    (HEART_START, "look"): ["Use the heart picture you drew."],
    (GAME_START, "hearts"): [
        "The first heart.",
        "Top left.",
        "Near the top.",
        "It shows while there is at least 1 life.",
        "The second heart.",
        "50 to the right.",
        "The same height.",
        "It needs at least 2.",
        "The third heart.",
        "50 further.",
        "The same height.",
        "It needs all 3.",
    ],
    (HEART_START, "keep"): [
        "Survive every room change.",
        "Draw in front of everything at 0.",
    ],
    (HEART_LOOP, "show"): [
        "While the game's lives are at least my number...",
        "...show me.",
        "Otherwise...",
        "...hide me.",
    ],
}

# A note for a slide that strikes lines out. Keyed (week, panel, block) when one
# block changes in more than one week, so each week's says what that week does.
DELETE_NOTES = {
    (8, PLAYER_LOOP, "jump"): "This line changes - space no longer moves you itself. Take it out; the timer line goes in its place.",
    (9, PLAYER_LOOP, "jump"): "The jump line changes - it learns to check the ground. Take it out; the new version is next.",
    (11, PLAYER_LOOP, "floor"): "The if line changes - it learns to look down. Take it out; the new version is next.",
    (13, PORTAL_LOOP, "travel"): "This line changes - not always Level2 any more. Take it out; the new version is next.",
    (14, PLAYER_LOOP, "enemies"): "This line changes - a sting no longer ends the game. Take out destroy(self); two new lines go in its place.",
}


# --- what pressing Play should show you -------------------------------------
#
# One line per step, keyed (week, panel, block). A step that changes nothing
# you can see says so, so working code is never mistaken for broken code.
CHECKS = {
    (1, GAME_START, "setup"):
        "Nothing to see yet - the screen stays empty. You are checking there is no "
        "red error.",
    (1, PLAYER_START, "look"):
        "Still nothing. You have described Pixelhead, but nobody has MADE one yet - "
        "that is the next step.",
    (1, LEVEL1_START, "player"):
        "Pixelhead appears in the middle of the screen.",
    (2, WASP_START, "look"):
        "No change - no FlyEnemy has been made yet.",
    (2, LEVEL1_START, "wasps"):
        "Two wasps appear high up, one each side of Pixelhead.",
    (3, WASP_START, "speed"):
        "No change - the speed is a number waiting to be used.",
    (3, WASP_LOOP, "fly"):
        "Both wasps fly off the left side of the screen.",
    (3, PLAYER_START, "speed"):
        "Nothing changes - nothing uses Pixelhead's speed yet.",
    (3, PLAYER_LOOP, "walk"):
        "Click the game, then hold the arrows. Pixelhead walks left and right - "
        "facing right the whole time.",
    (4, PLAYER_LOOP, "walk"):
        "Walk both ways. Pixelhead turns to face the way it walks.",
    (4, BACK_START, "look"):
        "No change - no Background has been made yet.",
    (4, LEVEL1_START, "back"):
        "Your coast picture fills the screen, behind everything else.",
    (4, FLOOR_START, "look"):
        "No change - no Floor has been made yet.",
    (4, LEVEL1_START, "floors"):
        "A strip of three grass tiles appears under Pixelhead.",
    (5, WASP_START, "scale"):
        "The wasps are smaller - and still fly away to the left.",
    (5, WASP_LOOP, "turn"):
        "Wait a few seconds. The wasps turn around at each side and patrol back and "
        "forth, always facing the way they fly.",
    (6, PLAYER_LOOP, "gravity"):
        "Pixelhead falls straight through the grass and off the bottom of the screen.",
    (6, LEVEL1_START, "player"):
        "Pixelhead now starts above the top and falls through everything. That is "
        "right for now.",
    (6, PLAYER_LOOP, "floor"):
        "Pixelhead drops in and lands on the grass. Walk off the end and you fall.",
    (7, PLAYER_LOOP, "jump"):
        "Tap space. Pixelhead pops up 50 and drifts back down. Tap it in mid-air and "
        "you go higher.",
    (7, LEVEL1_START, "upper"):
        "Two more tiles appear, higher up on the right. Tap space a few times in a row "
        "to climb onto them.",
    (8, PLAYER_START, "jumpTimer"):
        "Nothing changes - the timer is 0 and nothing uses it.",
    (8, PLAYER_LOOP, "rise"):
        "Still no change. The timer is stuck at 0, and 0 is not above 0.",
    (8, PLAYER_LOOP, "jump"):
        "Tap space. Pixelhead flies up off the top of the screen and never comes back. "
        "That is right - the next step fixes it.",
    (8, PLAYER_LOOP, "countdown"):
        "Tap space. Pixelhead rises smoothly, slows, and falls back to the grass.",
    (9, PLAYER_START, "onGround"):
        "Nothing changes - onGround is a switch nothing reads yet.",
    (9, PLAYER_LOOP, "floor"):
        "Nothing looks different. The switch flips on and off, but nothing uses it "
        "until the next step.",
    (9, PLAYER_LOOP, "jump"):
        "Jump, and tap space again in mid-air. The second press does nothing until "
        "you land.",
    (10, PLAYER_LOOP, "enemies"):
        "Jump up into a wasp from the grass and Pixelhead disappears - press Play to "
        "start again. From the high platform, come down on top of one and the wasp "
        "disappears.",
    (11, PLAYER_LOOP, "enemies"):
        "From the high platform, stomp a wasp. Pixelhead bounces up off it.",
    (11, PLAYER_LOOP, "floor"):
        "Walk off the end of the grass. Pixelhead no longer catches on the platform's "
        "side - it falls into the gap. Jump across instead and land on top.",
    (12, PORTAL_START, "look"):
        "No change - no Portal has been made yet.",
    (12, LEVEL1_START, "portal"):
        "A portal stands at the right-hand end of the high platform. Walking into it "
        "does nothing yet.",
    (12, LEVEL2_START, "back"):
        "No change - nothing takes you to Level2 yet.",
    (12, LEVEL2_START, "player"):
        "Still no change. Level2 is only built when you go there.",
    (12, LEVEL2_START, "floors"):
        "Still no change. The portal is the next step.",
    (12, PORTAL_LOOP, "travel"):
        "Climb up and walk into the portal. Level 2 begins: Pixelhead drops onto the "
        "bottom step on the left.",
    (13, LEVEL2_START, "top"):
        "In Level 2, a fourth step appears at the top of the staircase.",
    (13, WIN_START, "message"):
        "No change - nothing goes to the Win room yet.",
    (13, PORTAL_START, "destination"):
        "No change - the loop does not use the destination yet.",
    (13, PORTAL_LOOP, "travel"):
        "The game plays exactly as before: the Level1 portal still takes you to Level2.",
    (13, LEVEL2_START, "portal"):
        "Play it through. In Level 2, jump from the top step into the portal: YOU WIN!",
    (14, GAME_START, "health"):
        "Nothing changes - the game has three lives, but nothing uses them yet.",
    (14, PLAYER_LOOP, "enemies"):
        "From the grass, jump up into a wasp. The wasp disappears and Pixelhead "
        "survives.",
    (14, GAME_LOOP, "restart"):
        "No change you can see. Level 1 has only two wasps, and each one stings once, so "
        "nothing can take all three lives yet - the next step can.",
    (14, PLAYER_LOOP, "fall"):
        "Walk off the edge of the grass. As you drop off the bottom, Level 1 starts "
        "again, with both wasps back.",
    (15, HEART_START, "look"):
        "No change - no Heart has been made yet.",
    (15, GAME_START, "hearts"):
        "No hearts! Changing to Level1 removed them. That is right - ask why before "
        "the next step.",
    (15, HEART_START, "keep"):
        "Three hearts sit in the top-left corner, in front of the background.",
    (15, HEART_LOOP, "show"):
        "Get stung. One heart disappears. Walk off the edge and Level 1 starts again "
        "with all three hearts back.",
}


def check_for(week_n, panel, block):
    """What to look for after Play, for one step. The build refuses to ship a
    step that has no line, so this may raise rather than return nothing."""
    return CHECKS[(week_n, panel, block)]

QUIZZES = {
    (1, LEVEL1_START, "player"): [
        {"q": "What is a class?",
         "options": ["A kind of thing, like Floor", "One grass tile on the screen",
                     "A picture", "A room"], "answer": 0,
         "why": "A class is the kind; every tile is an object made from it."},
        {"q": "When does start run?",
         "options": ["Once, when the object is made", "Sixty times a second",
                     "When you press a key", "Never"], "answer": 0,
         "why": "start runs one time, the moment the object is made."},
        {"q": "Which line picks the first room? (this week)",
         "options": ["set_room('Level1')", "self.player = Player()",
                     "self.image = sprite('pixelhead.png')", "Level1()"], "answer": 0,
         "why": "set_room in Game start chooses the room the game opens on."},
    ],
    (2, LEVEL1_START, "wasps"): [
        {"q": "Where is x = -300?",
         "options": ["Left of the middle", "Right of the middle", "Near the top", "Near the bottom"], "answer": 0,
         "why": "Plus x is right, minus x is left."},
        {"q": "What does self.wasp1.x mean?",
         "options": ["wasp1's x", "A new wasp", "The room's x", "The wasp's picture"], "answer": 0,
         "why": "The dot is like an apostrophe-s."},
        {"q": "Two wasps come from one class. Why are they in different places? (this week)",
         "options": ["Each object has its own x and y", "The class has two pictures",
                     "It is random", "They are not"], "answer": 0,
         "why": "Every object keeps its own values."},
    ],
    (3, PLAYER_LOOP, "walk"): [
        {"q": "Why does the flying line go in loop, not start?",
         "options": ["start runs once; loop keeps moving it", "loop is faster to type",
                     "start cannot use x", "It does not matter"], "answer": 0,
         "why": "Moving means a small change again and again - that is loop."},
        {"q": "x is 300 and speed is -3. What is x after two loops?",
         "options": ["294", "306", "300", "-6"], "answer": 0,
         "why": "Each loop adds -3: 297, 294."},
        {"q": "How does Python know a line belongs to the if? (this week)",
         "options": ["It is pushed in four spaces", "It has a capital letter",
                     "It is on the next page", "It ends with a colon"], "answer": 0,
         "why": "Indenting under the colon is how Python groups lines."},
    ],
    (4, LEVEL1_START, "floors"): [
        {"q": "What does scaleX = -1 do?",
         "options": ["Flips the picture like a mirror", "Makes it disappear",
                     "Moves it left", "Makes it twice as wide"], "answer": 0,
         "why": "Same size, the other way round."},
        {"q": "Why is the background made first?",
         "options": ["Made first means drawn at the back", "It is the biggest",
                     "Python needs it", "It loads faster"], "answer": 0,
         "why": "Objects are drawn in the order they are made."},
        {"q": "Why are the 100-wide tiles placed 100 apart? (this week)",
         "options": ["So they sit edge to edge", "To leave gaps",
                     "Because the screen is 100 wide", "To make them smaller"], "answer": 0,
         "why": "Each tile's middle is 100 from the next, so the edges just meet."},
    ],
    (5, WASP_LOOP, "turn"): [
        {"q": "What does if self.x > 500: ask?",
         "options": ["Is my x bigger than 500?", "Is my x smaller than 500?",
                     "Is my x exactly 500?", "Am I touching something?"], "answer": 0,
         "why": "&gt; means greater than."},
        {"q": "How does the wasp turn around?",
         "options": ["Its speed changes sign", "Its picture flips first",
                     "It is destroyed and remade", "Its y changes"], "answer": 0,
         "why": "-3 moves left, 3 moves right."},
        {"q": "Why 0.7 and -0.7 in the turn? (this week)",
         "options": ["To keep the size start gave it", "To make it faster",
                     "Because 1 is not allowed", "To make it see-through"], "answer": 0,
         "why": "1 would grow it back to full size."},
    ],
    (6, PLAYER_LOOP, "floor"): [
        {"q": "What does get_collision(self, 'Floor') give back?",
         "options": ["The tile you touch, or False", "Always True",
                     "A new floor", "The number of tiles"], "answer": 0,
         "why": "It answers with the thing you are touching, or False if nothing."},
        {"q": "Gravity takes 2 off y every loop. What keeps you on the grass?",
         "options": ["Adding 2 back while touching it", "The grass is solid",
                     "Taking 2 more", "set_room"], "answer": 0,
         "why": "- 2 and + 2 balance, so y does not change."},
        {"q": "Why is touchingFloor written without self.? (this week)",
         "options": ["It is only needed right here in this loop", "It is a mistake",
                     "self. is only for numbers", "To make it faster"], "answer": 0,
         "why": "A name without self. lives only inside this loop."},
    ],
    (7, LEVEL1_START, "upper"): [
        {"q": "Why key_was_pressed for the jump?",
         "options": ["One press is one jump", "It is faster",
                     "key_is_pressed does not work for space", "It looks nicer"], "answer": 0,
         "why": "key_is_pressed would jump every loop space is held."},
        {"q": "How do you write the space bar?",
         "options": ["' ' - a space inside quotes", "'' - empty quotes", "'spacebar'", "space"], "answer": 0,
         "why": "The quotes hold one space."},
        {"q": "How many presses of 50 reach a platform 100 higher? (this week)",
         "options": ["Two", "Four", "One", "Fifty"], "answer": 0,
         "why": "50 twice is 100."},
    ],
    (8, PLAYER_LOOP, "countdown"): [
        {"q": "When does Pixelhead rise?",
         "options": ["While jumpTimer is above 0", "While space is held",
                     "Only on the loop space goes down", "Never"], "answer": 0,
         "why": "The rise lines check the timer, not the key."},
        {"q": "Before the countdown line, why did Pixelhead fly away?",
         "options": ["The timer stayed at 30", "Gravity was turned off",
                     "Space was stuck", "The floor was gone"], "answer": 0,
         "why": "Nothing took it below 0."},
        {"q": "Rising 8 and falling 2 for 30 loops - how high? (this week)",
         "options": ["180", "240", "30", "60"], "answer": 0,
         "why": "6 a loop, 30 times."},
    ],
    (9, PLAYER_LOOP, "jump"): [
        {"q": "What values can a boolean have?",
         "options": ["True or False", "Any number", "Any word", "0 to 100"], "answer": 0,
         "why": "Just the two - like a switch."},
        {"q": "When does the line under else run?",
         "options": ["When the if is not true", "Always", "Never", "When the if is true"], "answer": 0,
         "why": "else means otherwise."},
        {"q": "What is the difference between = and ==? (this week)",
         "options": ["= stores a value, == asks if two things are equal", "None",
                     "== is faster", "= is only for numbers"], "answer": 0,
         "why": "One equals stores; two equals compares."},
    ],
    (10, PLAYER_LOOP, "enemies"): [
        {"q": "Pixelhead is at y 120 and the wasp at y 100. What happens?",
         "options": ["The wasp is destroyed", "Pixelhead is destroyed",
                     "Both are destroyed", "Nothing"], "answer": 0,
         "why": "120 is above 100, so it is a stomp."},
        {"q": "How far is a line under an if inside an if pushed in?",
         "options": ["Eight spaces", "Four spaces", "No spaces", "Two spaces"], "answer": 0,
         "why": "Four for each if it is inside."},
        {"q": "What is enemyHit? (this week)",
         "options": ["The wasp you are touching, or False", "The number of wasps",
                     "Always the first wasp", "Pixelhead"], "answer": 0,
         "why": "get_collision gives back the thing you touch."},
    ],
    (11, PLAYER_LOOP, "floor"): [
        {"q": "What actually lifts Pixelhead up?",
         "options": ["The jump timer being above 0", "The space bar",
                     "The floor", "Gravity"], "answer": 0,
         "why": "Space only sets the timer; the rise lines do the lifting."},
        {"q": "A tile 100 tall is at y -100. Where is its top?",
         "options": ["-50", "-150", "0", "-100"], "answer": 0,
         "why": "y is the middle; the top is 50 above it."},
        {"q": "Why did Pixelhead walk along inside the high platform? (this week)",
         "options": ["Touching its side also cancelled gravity", "The tile was too big",
                     "The jump was too strong", "The timer stopped"], "answer": 0,
         "why": "Any touch counted - until the check looked at where you were."},
    ],
    (12, PORTAL_LOOP, "travel"): [
        {"q": "Why does Level2 make its own Pixelhead?",
         "options": ["Changing room removes the old room's objects", "Level2 is a class",
                     "Pixelhead is too big", "It does not need one"], "answer": 0,
         "why": "A room starts empty."},
        {"q": "What are the three steps for a new kind of object?",
         "options": ["Class, sprite, make one in a room", "Room, class, sprite",
                     "Sprite, room, delete", "Just draw it"], "answer": 0,
         "why": "Every object in the game came that way."},
        {"q": "What does set_room('Level2') do? (this week)",
         "options": ["Changes to the Level2 room", "Makes a Level2 object",
                     "Moves the portal", "Restarts Level1"], "answer": 0,
         "why": "set_room shows another room."},
    ],
    (13, LEVEL2_START, "portal"): [
        {"q": "Why was every portal taking you to Level2?",
         "options": ["The loop always said 'Level2'", "There is only one portal",
                     "Level2 is the default", "The Win room was missing"], "answer": 0,
         "why": "Every portal runs the same loop."},
        {"q": "What is the difference between 'self.destination' and self.destination?",
         "options": ["With quotes it is just words; without, it is the variable", "None",
                     "Quotes make it faster", "Without quotes it is an error"], "answer": 0,
         "why": "Quotes make writing, not a name."},
        {"q": "Level1's portal never sets a destination. Where does it go? (this week)",
         "options": ["Level2", "Win", "Nowhere", "Level1"], "answer": 0,
         "why": "Portal start gives every portal 'Level2'."},
    ],
    (14, PLAYER_LOOP, "fall"): [
        {"q": "Why does the health live in Game?",
         "options": ["Game lasts the whole game; every room makes a new Player",
                     "Player cannot hold numbers", "It is shorter", "It does not matter"], "answer": 0,
         "why": "A Player's own health would reset at every portal."},
        {"q": "From Player loop, how do you reach Game's health?",
         "options": ["game.health", "self.health", "health", "Game.start.health"], "answer": 0,
         "why": "game. reaches the Game from any class."},
        {"q": "Why destroy the wasp when it stings you? (this week)",
         "options": ["Still touching, it would take a life every loop", "To score a point",
                     "It is not needed", "To make it come back"], "answer": 0,
         "why": "Sixty stings a second would end the game at once."},
    ],
    (15, HEART_LOOP, "show"): [
        {"q": "What does self.persistent = True do?",
         "options": ["Keeps the object through a room change", "Makes it solid",
                     "Makes it move", "Hides it"], "answer": 0,
         "why": "set_room removes everything that is not persistent."},
        {"q": "The lives are 2. Which hearts show?",
         "options": ["heart1 and heart2", "Only heart3", "All three", "None"], "answer": 0,
         "why": "heart3 needs at least 3."},
        {"q": "What does self.z = 1 do? (this week)",
         "options": ["Draws the heart in front", "Moves it up", "Makes it bigger",
                     "Makes it persistent"], "answer": 0,
         "why": "Bigger z is drawn in front of everything at 0."},
    ],
}

EXPANDED_WEEKS = set(range(1, 16))
