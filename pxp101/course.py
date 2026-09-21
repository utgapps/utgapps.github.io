"""PXP101 - Monster Munch. The whole course as one data structure.

This is the only file to edit. build.py replays WEEKS to produce the playable
milestones, the teacher curriculum, the textbook, the homework book and the
slides, so none of them can drift apart.

WHO THIS IS FOR, AND WHAT THAT CHANGES

Eight years old, never written a line of code, and a short attention span. That
is not a softer version of AI101 - it changes the shape of every week:

  * A week adds four to eight lines. Not forty.
  * Every week ends with something to SHOW. If a week cannot finish on "press
    Play and look", the week is wrong.
  * The code obeys camp-coding-projects/RULES.md, proven over 21 games: no
    lists, no division or modulo, every name prefixed, an `if` never sharing a
    line with what it runs. build.py refuses to ship code that breaks them.
  * The child draws every sprite. Ownership is most of the motivation at this
    age, so week 1 is "my monster, that I drew, is on the screen".

Each week carries the same keys AI101 uses: ops / objectives / flow / errors /
recap / homework / slides / bonus.
"""

import re

COURSE_TITLE = "PXP101 · Monster Munch"
COURSE_BLURB = (
    "Fifteen weeks making your own arcade game in PixelPad. You draw the monster, "
    "you write the Python, and every single week you press Play and see something new."
)
PROJECT_BLURB = (
    "A monster you drew, catching falling food and dodging bombs. It keeps score, "
    "it has hearts, it gets faster, and it has a real Game Over screen. Written in "
    "Python, one small piece at a time."
)

# Phase 1 authors weeks 1-2. Raise this as weeks land; the build refuses to run
# if WEEKS and this number disagree, so a week can never quietly go missing.
TOTAL_WEEKS = 2

# A whole game is about this many lines of Python by week 15. AI101's budget is
# 1000 for teenagers; eight-year-olds type slowly and read slower. The spine in
# spine.py plans the base game at 78, so this is the ceiling authoring may grow
# into, not a target to fill.
LINE_BUDGET = 150

# The bonus track is a parallel module for the child who finishes early: real
# code, checked by the same kid rules, counted against its own budget - and
# deliberately OUTSIDE state_at(), so a child who does every bonus and a child
# who does none can both follow week 9. See PLAN.md section 3.
BONUS_BUDGET = 100

DISCLAIMER = """
<p><strong>Nothing here needs the internet except PixelPad itself.</strong> The game runs
entirely in the browser - there is no server, no account and no API key anywhere in this
course. A finished week is a single file that plays on any computer.</p>
<p><strong>The child draws the art.</strong> Every sprite is listed with the exact size to
draw it. The generated games use plain coloured rectangles as stand-ins so the code can be
tested; they are meant to be replaced.</p>
"""

TEACHER_PREAMBLE = """
<p><strong>Press Play constantly.</strong> The single biggest difference from an older
class: an eight-year-old needs to see the effect of what they typed within a minute or two.
Every step in this book ends at a Play. If you are more than two steps from a Play, stop and
run it anyway.</p>
<p><strong>Typing is the hard part, not the thinking.</strong> Expect
<code>self</code> to become <code>slef</code>, missing colons, and lost indentation. Those
are not comprehension failures. The error box tells you the line number - read it together.</p>
<p><strong>Indentation is the one rule to be strict about.</strong> Four spaces, always,
and only after a line ending in a colon. Everything else can be fixed later.</p>
<p><strong>Pacing.</strong> The line counts per week are the pacing model. A week that runs
long should drop its bonus, never its Play moments.</p>
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
#
# A PixelPad game is not files, it is per-object code panels: every class and
# every room has a start() and a loop(). Naming a panel "Monster loop" and
# treating it as one file means line numbers restart per panel, so a child is
# told "line 3 of Monster's loop" - never "line 147 of script.js".
GAME_START, GAME_LOOP = "Game start", "Game loop"
MON_START, MON_LOOP = "Monster start", "Monster loop"
PLAY_START, PLAY_LOOP = "Play start", "Play loop"

PANELS = [GAME_START, MON_START, MON_LOOP, PLAY_START]
ROOMS = ["Play"]

# The order blocks appear inside a panel. A block missing from this list is an
# authoring error and build.py will say so.
ORDER = {
    GAME_START: ["setup"],
    MON_START: ["look"],
    MON_LOOP: ["follow", "edges"],
    PLAY_START: ["make"],
}

# Every sprite the child draws: name -> (colour, width, height) in real pixels.
# The typed code never scales a sprite, so these ARE the sizes on screen.
#
# The colour is for this build alone. Nobody's drawing exists when the demo
# games and the checkpoint pages are generated, so a sprite runs as a solid
# block of it. Students are never shown it: they are told the name and the
# size, and what the thing looks like is theirs.
SPRITES = {
    "monster.png": ("green", 48, 48),
}


WEEKS = [

# ---------------------------------------------------------------- week 1 ----
{
 "n": 1,
 "title": "Your monster appears",
 "big_idea": "A game is made of objects you draw and then tell what to do. Today you draw a monster and write four lines of Python that put it on the screen.",
 "new_concepts": ["sprite", "start", "room", "x and y", "making an object"],
 "draw": ["monster.png"],
 "objectives": [
   "Draw a sprite at the size the book asks for",
   "Say what start means - it happens once",
   "Put an object into a room and see it appear",
   "Press Play and find their own monster on the screen",
 ],
 "ops": [
  ADD(GAME_START, "setup", [
    "set_room('Play')",
  ]),
  ADD(MON_START, "look", [
    "self.image = sprite('monster.png')",
    "self.y = -210",
  ]),
  ADD(PLAY_START, "make", [
    "Game.monster = Monster()",
  ]),
 ],
 "flow": [
  TALK("0:00", "Look at the game you are going to make",
       "<p>Play the finished Monster Munch on the board for about a minute. Catch some food. "
       "Let one bomb hit. Then close it.</p>",
       "<p>Say the promise out loud: <em>by the end of today your own monster is on the screen, "
       "and it is one you drew.</em></p>",
       ask=("What is the monster doing when you catch food?", "Anything - they are just looking closely")),
  TALK("0:06", "Draw your monster",
       "<p>Open PixelPad, make a new sprite called <code>monster.png</code> and draw it "
       "<strong>48 by 48</strong>. Big blocky shapes. Two eyes is plenty.</p>",
       "<p>Do not let this run long - eight-year-olds will happily draw for the whole hour. "
       "Five minutes, then move on. They can improve it any week.</p>",
       ask=("What size are we drawing?", "48 by 48 - point at the number in the corner")),
  STEP(GAME_START, "setup", "Tell the game which screen to show",
       ["A <em>room</em> is one screen of your game. This says: start on the screen called Play."]),
  STEP(MON_START, "look", "Give the monster its picture and put it near the bottom",
       ["<code>start</code> happens ONCE, the moment the monster is made. It picks the picture "
        "you drew, then sits it near the bottom of the screen."],
       ask=("y is -210. Is that near the top or the bottom?", "Bottom - minus means down")),
  STEP(PLAY_START, "make", "Make one monster in the Play room",
       ["This is the line that actually makes it. Press Play - your monster is there!"],
       at="0:35"),
  TALK("0:45", "Show each other",
       "<p>Everyone turns their screen to the person next to them. Thirty seconds. Every monster "
       "looks different and that is the whole point.</p>"),
 ],
 "errors": [
   ("Nothing appears at all", "The Play room's start is empty, or the class is called something other than Monster. The name in Play start must match the class name exactly."),
   ("A grey box instead of a monster", "The sprite is not called monster.png. The name in the code and the name of the sprite must be identical, including .png."),
   ("An error about 'sprite'", "Check the quotes: sprite('monster.png') needs both single quotes."),
 ],
 "recap": [
   "A sprite is a picture you draw.",
   "start happens once, right at the beginning.",
   "y is up and down. Minus numbers are down.",
   "Monster() makes one monster.",
 ],
 "homework": [
   {"task": "Make it yours", "detail": "Redraw monster.png so it looks like a monster YOU invented. Same size, 48 by 48.", "done": "You press Play and your own drawing is on the screen."},
   {"task": "Move it", "detail": "Change -210 to a different number and press Play. Try -100. Try 0. Try 200.", "done": "You can say what bigger and smaller numbers do to the monster."},
 ],
 "bonus": {"title": "Two monsters",
           "body": "<p>Add a second line under the first one in <strong>Play start</strong>: "
                   "<code>Game.monster2 = Monster()</code>. Press Play. Why can you only see one? "
                   "(They are in exactly the same spot.)</p>"},
 "slides": [
   {"title": "Monster Munch", "sub": "The game you are going to build", "bullets": [
     "You draw the monster", "It catches food", "It dodges bombs", "By week 15 it is yours"]},
   {"title": "Draw your monster", "sub": "monster.png - 48 by 48", "bullets": [
     "Big blocky shapes work best", "Two eyes is plenty", "You can redraw it any week"]},
   {"title": "Start on the Play screen", "bullets": [], "code": [(GAME_START, "setup")]},
   {"title": "Give it a picture", "bullets": [], "code": [(MON_START, "look")]},
   {"title": "Make one monster", "bullets": [], "code": [(PLAY_START, "make")]},
   {"title": "Checkpoint: your monster is here", "checkpoint": True,
    "say": "Press Play. Your monster should be sitting near the bottom of the screen. Press the button to see what it should look like."},
 ],
},

# ---------------------------------------------------------------- week 2 ----
{
 "n": 2,
 "title": "It follows your mouse",
 "big_idea": "loop happens over and over, many times every second. That is what makes a game move. Today your monster follows your mouse, and learns to stop at the edges.",
 "new_concepts": ["loop", "mouse_x()", "if", "the edges of the screen"],
 "objectives": [
   "Say the difference between start and loop",
   "Use mouse_x() to move an object",
   "Write an if and indent the line under it",
   "Stop the monster running off the screen",
 ],
 "ops": [
  ADD(MON_LOOP, "follow", [
    "self.x = mouse_x()",
  ]),
  ADD(MON_LOOP, "edges", [
    "if self.x > 320:",
    "    self.x = 320",
    "if self.x < -320:",
    "    self.x = -320",
  ]),
 ],
 "flow": [
  TALK("0:00", "start once, loop for ever",
       "<p>Ask one child to stand up ONCE. That is start. Now ask them to wave, and keep waving, "
       "and keep waving. That is loop.</p>",
       "<p>Say the number out loud: loop runs about <strong>sixty times a second</strong>. That is "
       "why things look like they are moving.</p>",
       ask=("Which one would you put 'give the monster its picture' in?", "start - it only needs doing once")),
  STEP(MON_LOOP, "follow", "Make the monster follow your mouse",
       ["<code>mouse_x()</code> is where your mouse is, left to right. Because this is in loop, it "
        "happens again and again - so the monster keeps up with you. Press Play and move the mouse!"],
       at="0:12",
       ask=("What would happen if we put this line in start instead?", "It would move once and then stop")),
  TALK("0:22", "It runs off the screen",
       "<p>Let them find it. Push the mouse right out past the edge - the monster keeps going and "
       "disappears. Everyone should see the problem before you fix it.</p>",
       ask=("Where did it go?", "Off the side - the screen stops but the monster did not")),
  STEP(MON_LOOP, "edges", "Stop it at the edges",
       ["<code>if</code> means <em>only when</em>. If the monster has gone past 320, put it back to "
        "320. The line underneath is indented FOUR SPACES - that is how Python knows it belongs to "
        "the if. Press Play - now it stops at both sides."],
       at="0:30",
       ask=("Why is the second line pushed in?", "It only runs when the if is true")),
  TALK("0:45", "Play each other's games",
       "<p>Swap seats. Everyone plays the game of the person next to them for one minute.</p>"),
 ],
 "errors": [
   ("The monster does not move", "The line is in Monster start instead of Monster loop. start happens once."),
   ("An error about indentation", "The line under the if needs exactly four spaces in front of it, and nothing else on the if line after the colon."),
   ("It stops in the middle of the screen", "One of the numbers is too small - check for 320, not 32."),
   ("It still runs off one side only", "The second if uses a minus: -320, not 320."),
 ],
 "recap": [
   "loop happens over and over, about sixty times a second.",
   "mouse_x() is where your mouse is, left to right.",
   "if means only when.",
   "The line under an if is indented four spaces.",
 ],
 "homework": [
   {"task": "Squeeze it in", "detail": "Change both 320s to 150 and press Play. Then try 400.", "done": "You can explain what the number is measuring."},
   {"task": "Upside down", "detail": "Add self.y = mouse_y() under the follow line and press Play.", "done": "Your monster follows the mouse everywhere, and you can say why."},
 ],
 "bonus": {"title": "A shy monster",
           "body": "<p>Try <code>self.x = mouse_x() - 100</code>. The monster now hangs back from "
                   "your mouse. Change the 100 and see how far behind it stays.</p>"},
 "slides": [
   {"title": "start once. loop for ever.", "bullets": [
     "start happens one time", "loop happens about 60 times a second", "Moving things live in loop"]},
   {"title": "Follow the mouse", "bullets": [], "code": [(MON_LOOP, "follow")]},
   {"title": "Checkpoint: it follows you", "checkpoint": True,
    "say": "Press Play and move your mouse. Your monster should slide along the bottom. Now push it off the side - it escapes!"},
   {"title": "Stop it at the edges", "bullets": [], "code": [(MON_LOOP, "edges")]},
   {"title": "Checkpoint: it stays on screen", "checkpoint": True,
    "say": "Press Play. However far you push, your monster should stop at the edge."},
 ],
},

]


# --- what each line teaches -------------------------------------------------
#
# Returns the concept keys a line introduces, general shape first. Only keys
# that also exist in CONCEPTS produce a slide, so this can list more than the
# glossary covers and grow gradually.
def line_concepts(panel, line):
    stripped = line.strip()
    keys = []
    if panel.endswith(" start"):
        keys.append("pp:start")
    if panel.endswith(" loop"):
        keys.append("pp:loop")
    if "set_room(" in stripped:
        keys.append("pp:room")
    if "sprite(" in stripped:
        keys.append("pp:sprite")
    if re.match(r"self\.y = -?\d", stripped):
        keys.append("pp:y")
    if "mouse_x()" in stripped:
        keys.append("pp:mouse")
    if re.match(r"Game\.\w+ = [A-Z]\w*\(\)", stripped):
        keys.append("pp:make")
    if stripped.startswith("if "):
        keys.append("pp:if")
    return keys


# key -> (kind, title, [bullets], example). kind picks the slide's eyebrow.
CONCEPTS = {
    "pp:start": ("game", "start happens once",
        ["Everything in start runs one time, right at the beginning.",
         "Use it to set a picture, a place, or a starting number."],
        "self.image = sprite('monster.png')"),
    "pp:loop": ("game", "loop happens over and over",
        ["loop runs about 60 times every second, for as long as the game is on.",
         "Anything that moves lives in loop."],
        "self.x = mouse_x()"),
    "pp:room": ("game", "A room is one screen",
        ["Your game can have more than one screen. Each one is a room.",
         "set_room picks which screen to show."],
        "set_room('Play')"),
    "pp:sprite": ("art", "A sprite is your picture",
        ["sprite() finds the picture you drew and puts it on the object.",
         "The name has to match exactly, including the .png."],
        "self.image = sprite('monster.png')"),
    "pp:y": ("game", "y is up and down",
        ["The middle of the screen is 0. Bigger numbers go UP.",
         "Minus numbers go DOWN, so -210 is near the bottom."],
        "self.y = -210"),
    "pp:mouse": ("py", "mouse_x()",
        ["This is where your mouse is, left to right.",
         "Put it in loop and your monster keeps up with you."],
        "self.x = mouse_x()"),
    "pp:make": ("py", "Making an object",
        ["Monster() makes one monster and puts it in the room.",
         "Nothing appears until you make it."],
        "Game.monster = Monster()"),
    "pp:if": ("py", "if means only when",
        ["The line under an if only runs when the if is true.",
         "That line is indented four spaces - that is how Python knows it belongs to the if."],
        "if self.x > 320:"),
}

# Animated metaphors. Reuses build.concept_visual's library - see SLIDE-RULES.
VISUALS = {
    "pp:start": {"kind": "machine", "in": "game opens", "label": "start", "out": "done once",
                 "cap": "start runs one time, then never again."},
    "pp:loop": {"kind": "loop", "items": ["1", "2", "3", "4"],
                "cap": "loop runs again and again, about 60 times a second."},
    "pp:room": {"kind": "swap", "off": "Play room", "on": "another room",
                "cap": "A room is one screen. set_room swaps which one you see."},
    "pp:sprite": {"kind": "swap", "off": "nothing", "on": "your art",
                  "cap": "sprite() puts the picture you drew onto the object."},
    "pp:y": {"kind": "resize", "axis": "h",
             "cap": "y is up and down. Minus numbers go DOWN."},
    "pp:mouse": {"kind": "motion",
                 "cap": "mouse_x() follows your mouse, left and right."},
    "pp:make": {"kind": "dom", "parent": "Play room", "child": "a Monster", "mode": "add",
                "cap": "Monster() makes one and puts it in the room."},
    "pp:if": {"kind": "fork", "cond": "self.x > 320", "yes": "put it back", "no": "carry on",
              "cap": "if means only when - the indented line runs only if it is true."},
}

LINE_NOTES = {
    (GAME_START, "setup"): ["Start the game on the screen called Play."],
    (MON_START, "look"): [
        "Use the picture you drew.",
        "Put the monster near the bottom. Minus is down.",
    ],
    (PLAY_START, "make"): ["Make one monster. Press Play - it appears!"],
    (MON_LOOP, "follow"): ["Follow the mouse, left and right."],
    (MON_LOOP, "edges"): [
        "Only when the monster has gone too far right...",
        "...put it back to the edge. Four spaces in front!",
        "Only when it has gone too far left...",
        "...put it back to that edge too.",
    ],
}

DELETE_NOTES = {}

QUIZZES = {
    (2, MON_LOOP, "edges"): [
        {"q": "Where does a line go if you want it to happen over and over?",
         "options": ["loop", "start", "It does not matter", "In the picture"], "answer": 0,
         "why": "start happens once. loop happens again and again."},
        {"q": "What does if mean?",
         "options": ["Only when", "Always", "Never", "Twice"], "answer": 0,
         "why": "The line underneath only runs when the if is true."},
        {"q": "Why is the line under the if pushed in four spaces? (from week 2)",
         "options": ["So Python knows it belongs to the if", "To look tidy",
                     "Because it is a long line", "It does not need to be"], "answer": 0,
         "why": "Indenting is how Python sees which lines belong to the if."},
    ],
}

EXPANDED_WEEKS = {1, 2}
