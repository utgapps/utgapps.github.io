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

# Raise this as weeks land; the build refuses to run if WEEKS and this number
# disagree, so a week can never quietly go missing.
TOTAL_WEEKS = 5

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
FOOD_START, FOOD_LOOP = "Food start", "Food loop"
PLAY_START, PLAY_LOOP = "Play start", "Play loop"

PANELS = [GAME_START, MON_START, MON_LOOP, FOOD_START, FOOD_LOOP, PLAY_START]
ROOMS = ["Play"]

# The order blocks appear inside a panel. A block missing from this list is an
# authoring error and build.py will say so; a block listed here but not yet
# written is harmless, so a panel can carry the slots later weeks will fill.
# Game start is built top-down out of order: week 4 adds speed, week 5 adds
# score and lives ABOVE it, and setup (week 1) stays at the bottom.
ORDER = {
    GAME_START: ["score", "lives", "speed", "flag", "setup"],
    MON_START: ["look"],
    MON_LOOP: ["follow", "edges"],
    FOOD_START: ["look", "place"],
    FOOD_LOOP: ["fall", "catch", "recycle"],
    PLAY_START: ["make", "makeFood"],
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
    "food.png": ("orange", 30, 30),
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

# ---------------------------------------------------------------- week 3 ----
{
 "n": 3,
 "title": "Food to catch",
 "big_idea": "A game needs something to DO. Today you draw food and make a new KIND of thing - a Food - that shows up high on the screen at a surprise spot every time you press Play.",
 "new_concepts": ["a second class", "import random", "random.randint()"],
 "draw": ["food.png"],
 "objectives": [
   "Draw a second sprite at the size the book asks for",
   "Make a new class - a Food - the same way they made a Monster",
   "Use random.randint() to put it in a surprise place",
   "Press Play and find food up high, somewhere new every time",
 ],
 "ops": [
  ADD(FOOD_START, "look", [
    "import random",
    "self.image = sprite('food.png')",
  ]),
  ADD(FOOD_START, "place", [
    "self.x = random.randint(-300, 300)",
    "self.y = random.randint(260, 600)",
  ]),
  ADD(PLAY_START, "makeFood", [
    "Game.foodA = Food()",
  ]),
 ],
 "flow": [
  TALK("0:00", "Where we are",
       "<p>Press Play on last week's game. The monster follows the mouse and stops at the edges. "
       "It works - but there is nothing to do with it yet.</p>",
       "<p>Say the plan out loud: <em>today we draw a piece of food and put it on the screen. Next "
       "week we make it fall.</em> One small step at a time.</p>",
       ask=("What can our monster already do?", "Follow the mouse and stop at the edges")),
  TALK("0:06", "Draw your food",
       "<p>Make a new sprite called <code>food.png</code> and draw it <strong>30 by 30</strong> - "
       "smaller than the monster. An apple, a slice of pizza, a doughnut, anything you would want "
       "to catch.</p>",
       "<p>Five minutes only, the same as the monster. It can be redrawn any week.</p>",
       ask=("What size is the food?", "30 by 30 - smaller than the 48 monster")),
  TALK("0:12", "A second kind of thing",
       "<p>Monster is a <em>class</em> - a kind of thing in your game. Now we make a second kind: "
       "Food. It gets its own <code>start</code> and <code>loop</code>, exactly like Monster did.</p>",
       "<p>In PixelPad, add a new Class and call it <strong>Food</strong>. Open its empty Food start "
       "panel, ready to type.</p>",
       ask=("What was our first class called?", "Monster - Food is the second one")),
  STEP(FOOD_START, "look", "Give the food its picture",
       ["<code>import random</code> is a helper for surprise numbers - you use it in the very next "
        "step. The line under it picks the food picture you drew."],
       at="0:18"),
  STEP(FOOD_START, "place", "Put it somewhere surprising",
       ["<code>random.randint(-300, 300)</code> is a surprise number between those two. So the food "
        "lands at a different spot left-to-right, up high above the screen, every single time."],
       at="0:26",
       ask=("The y number is big - 260 to 600. Why so high?", "It starts up high, ready to fall next week")),
  STEP(PLAY_START, "makeFood", "Make one piece of food",
       ["Just like <code>Monster()</code> made a monster, <code>Food()</code> makes one piece of "
        "food and drops it into the Play room. Press Play - your food is up there!"],
       at="0:34"),
  TALK("0:44", "Press Play again and again",
       "<p>Have everyone press Play five or six times and watch the top of the screen. The food "
       "appears in a new place each time - sometimes right at the top edge, sometimes just above it. "
       "Next week it will fall down where you can always see it.</p>"),
 ],
 "errors": [
   ("A grey box instead of food", "The sprite is not called food.png. The name in sprite('food.png') and the name of the sprite must match exactly, including the .png."),
   ("An error about 'random'", "import random has to be there, spelled exactly, as the first line of Food start - before any random.randint is used."),
   ("The food does not move", "That is right for this week! It only appears. Making it fall is next week's job."),
   ("Nothing appears at all", "Game.foodA = Food() is missing from Play start, or the new class is not called Food."),
 ],
 "recap": [
   "A class is a kind of thing. Food is our second one.",
   "import random gives you surprise numbers.",
   "random.randint(-300, 300) is a random number between two numbers.",
   "Food() makes one piece of food, just like Monster() makes a monster.",
 ],
 "homework": [
   {"task": "Draw a better snack", "detail": "Redraw food.png as something you would really want to catch. Same size, 30 by 30.", "done": "You press Play and your own food is on the screen."},
   {"task": "Change the spread", "detail": "Change the -300 and 300 to -100 and 100 and press Play a few times. Then try -400 and 400.", "done": "You can say what those two numbers change about where the food lands."},
 ],
 "bonus": {"title": "A second snack",
           "body": "<p>Add one more line under the first in <strong>Play start</strong>: "
                   "<code>Game.foodB = Food()</code>. Press Play. Two pieces of food, each in its own "
                   "random spot - because every <code>Food()</code> picks its own surprise numbers.</p>"},
 "slides": [
   {"title": "Something to catch", "sub": "Today: draw food and make it appear", "bullets": [
     "Monster is one class", "Food is a brand-new class", "It shows up high, somewhere random"]},
   {"title": "Draw your food", "sub": "food.png - 30 by 30", "bullets": [
     "Smaller than the monster", "An apple, a pizza, anything", "You can redraw it any week"]},
   {"title": "Give the food its picture", "bullets": [], "code": [(FOOD_START, "look")]},
   {"title": "Put it somewhere surprising", "bullets": [], "code": [(FOOD_START, "place")]},
   {"title": "Make one piece of food", "bullets": [], "code": [(PLAY_START, "makeFood")]},
   {"title": "Checkpoint: food appears", "checkpoint": True,
    "say": "Press Play a few times and watch the top of the screen. Your food should appear up high in a new spot each time. It does not fall yet - that is next week."},
 ],
},

# ---------------------------------------------------------------- week 4 ----
{
 "n": 4,
 "title": "It falls",
 "big_idea": "loop runs about sixty times a second. If you take a little off y every single loop, the food slides down the screen. And when it drops off the bottom, we send it back up to fall again - for ever.",
 "new_concepts": ["a number you can change", "falling by changing y", "recycling an object"],
 "objectives": [
   "Make a number - fallSpeed - that the whole game can use",
   "Make the food fall by changing its y in loop",
   "Send the food back to the top when it drops off the bottom",
   "Press Play and watch food rain down without stopping",
 ],
 "ops": [
  ADD(GAME_START, "speed", [
    "Game.fallSpeed = 3",
  ]),
  ADD(FOOD_LOOP, "fall", [
    "import random",
    "self.y = self.y - Game.fallSpeed",
  ]),
  ADD(FOOD_LOOP, "recycle", [
    "if self.y < -260:",
    "    self.x = random.randint(-300, 300)",
    "    self.y = random.randint(260, 600)",
  ]),
 ],
 "flow": [
  TALK("0:00", "It just sits there",
       "<p>Press Play on last week's game. The food appears up high and does nothing. Today we make "
       "it fall.</p>",
       "<p>Remember from week 2: <code>loop</code> runs about <strong>sixty times a second</strong>. "
       "That is the engine we are about to use to move the food.</p>",
       ask=("Where do we put code that has to happen over and over?", "loop - start only happens once")),
  STEP(GAME_START, "speed", "Make a speed the game can use",
       ["<code>Game.fallSpeed</code> is a number the WHOLE game can see, not just one food. Start it "
        "at 3. Later we can change this one number to make the whole game harder."],
       at="0:08",
       ask=("Why keep the speed in Game and not inside Food?", "So every food shares it - change it once, all of them change")),
  STEP(FOOD_LOOP, "fall", "Make the food fall",
       ["Open <strong>Food loop</strong>. <code>import random</code> again because a loop is its own "
        "panel. Then take <code>Game.fallSpeed</code> off <code>self.y</code> every loop - a little "
        "lower, sixty times a second, so it slides down. Press Play - it falls!"],
       at="0:16",
       ask=("It falls off the bottom and never comes back. What should we do?", "Send it back up to the top")),
  STEP(FOOD_LOOP, "recycle", "Send it back to the top",
       ["<code>if</code> means only when. Only when the food has dropped below the bottom (-260) do "
        "these two lines run: they pick a new random spot high above the screen, so it falls again. "
        "Press Play - the food rains down for ever."],
       at="0:28",
       ask=("Why is -260 a little past the bottom edge, not right at it?", "So it is fully gone before it jumps, and you do not see it flick")),
  TALK("0:44", "Rain",
       "<p>Everyone presses Play and just watches for a moment. Food falling over and over is the "
       "first time the game really feels alive. Let them enjoy it.</p>"),
 ],
 "errors": [
   ("The food does not move", "The fall line is in Food start instead of Food loop. Falling has to happen over and over, so it lives in loop."),
   ("An error about Game.fallSpeed", "Game.fallSpeed = 3 is missing from Game start, or it is spelled differently in the two places. The name must match exactly."),
   ("It falls once and vanishes", "The recycle if is missing, or its two lines are not indented four spaces under it."),
   ("The food flies UP instead of down", "The line says plus instead of minus. Falling is self.y = self.y - Game.fallSpeed."),
 ],
 "recap": [
   "Game.fallSpeed is a number the whole game shares.",
   "Taking a little off y every loop makes something fall.",
   "if means only when.",
   "When the food drops off the bottom, we send it back to the top to fall again.",
 ],
 "homework": [
   {"task": "Faster, slower", "detail": "Change Game.fallSpeed = 3 to 1, press Play, then to 8. Watch the difference.", "done": "You can say what fallSpeed does to the game."},
   {"task": "Change the bottom", "detail": "Change the -260 in the recycle if to -100 and press Play. Where does the food jump back now?", "done": "You can explain what the -260 is measuring."},
 ],
 "bonus": {"title": "A slow and a fast food",
           "body": "<p>This one is just to think about: if two foods both use <code>Game.fallSpeed</code>, "
                   "can one fall faster than the other? Try it and see. (They cannot yet - they share the "
                   "one speed. That is a puzzle for a much later week.)</p>"},
 "slides": [
   {"title": "Make it fall", "sub": "loop runs ~60 times a second", "bullets": [
     "A little lower each loop", "Off the bottom? Back to the top", "Food that never stops coming"]},
   {"title": "A speed the game can use", "bullets": [
     "Game.fallSpeed belongs to the whole game", "Start it at 3", "One number, every food obeys it"],
    "code": [(GAME_START, "speed")]},
   {"title": "Make the food fall", "bullets": [], "code": [(FOOD_LOOP, "fall")]},
   {"title": "Checkpoint: it falls away", "checkpoint": True,
    "say": "Press Play. The food should slide down the screen - and then fall off the bottom and never come back. Let them see the problem before we fix it."},
   {"title": "Send it back to the top", "bullets": [], "code": [(FOOD_LOOP, "recycle")]},
   {"title": "Checkpoint: it rains", "checkpoint": True,
    "say": "Press Play. Now the food should fall, drop off the bottom, and reappear up high to fall again - over and over."},
 ],
},

# ---------------------------------------------------------------- week 5 ----
{
 "n": 5,
 "title": "Catch it",
 "big_idea": "get_collision asks: are these two things touching? When the monster touches the food, we add one to the score and send the food below the floor - so last week's recycle lifts it straight back to the top.",
 "new_concepts": ["a score you keep", "get_collision()", "changing a number by adding"],
 "objectives": [
   "Start a score and some lives at the beginning of the game",
   "Use get_collision() to tell when the monster touches the food",
   "Add one to the score when they touch",
   "Press Play and catch food - watch it jump back to the top",
 ],
 "ops": [
  ADD(GAME_START, "score", [
    "Game.score = 0",
  ]),
  ADD(GAME_START, "lives", [
    "Game.lives = 3",
  ]),
  ADD(FOOD_LOOP, "catch", [
    "if get_collision(self, 'Monster'):",
    "    Game.score = Game.score + 1",
    "    self.y = -300",
  ]),
 ],
 "flow": [
  TALK("0:00", "It falls, but you cannot catch it",
       "<p>Press Play on last week's game. Food rains down, the monster follows the mouse - but they "
       "go right through each other. Today we make catching count.</p>",
       "<p>Say the plan: <em>when the monster touches the food, the score goes up and the food jumps "
       "back to the top.</em></p>",
       ask=("What do we already have that we need for catching?", "The monster and the falling food")),
  STEP(GAME_START, "score", "Start the score",
       ["At the very top of <strong>Game start</strong>: the game begins with a score of zero. It is "
        "a number the whole game shares, like fallSpeed."],
       at="0:08"),
  STEP(GAME_START, "lives", "Start with three lives",
       ["Just under it: three lives. Nothing takes a life yet - bombs come in a few weeks - but we "
        "set it up now so it is ready and waiting."],
       at="0:14",
       ask=("Why write lives now when nothing uses it yet?", "So it is ready - we build a piece at a time")),
  STEP(FOOD_LOOP, "catch", "Catch the food",
       ["Open <strong>Food loop</strong>. <code>get_collision(self, 'Monster')</code> is True only "
        "when this food is touching the monster. When it is: add one to the score, and drop the food "
        "to -300 - below the floor, so last week's recycle catches it and lifts it back up."],
       at="0:22",
       ask=("We set self.y to -300. What does the recycle if do next?", "It sees the food is past the bottom and sends it back to the top")),
  TALK("0:40", "Catch some food",
       "<p>Everyone plays for a couple of minutes. Move the monster under the food and catch it - it "
       "jumps back to the top. The score is going up too, even though you cannot see it yet. Showing "
       "the score on the screen is next week.</p>",
       ask=("You caught food but see no number. Where did the score go?", "It is counting inside the game - we show it next week")),
 ],
 "errors": [
   ("Catching does nothing", "The catch code is in Food start instead of Food loop. Checking for a touch has to happen over and over, so it lives in loop."),
   ("An error about Game.score", "Game.score = 0 is missing from Game start. It has to exist before Game.score = Game.score + 1 can add to it."),
   ("The food disappears when caught and never comes back", "Last week's recycle if is missing or changed. self.y = -300 relies on it to lift the food back up."),
   ("An error about get_collision", "Check the quotes and the comma: get_collision(self, 'Monster'). 'Monster' is the class name, in single quotes."),
 ],
 "recap": [
   "Game.score and Game.lives are numbers the whole game shares.",
   "get_collision(self, 'Monster') is True when two things are touching.",
   "Game.score = Game.score + 1 means take the score and make it one bigger.",
   "Sending the food to -300 lets last week's recycle lift it back up.",
 ],
 "homework": [
   {"task": "Worth more", "detail": "Change the + 1 in the catch to + 5 and press Play. Catch some food.", "done": "You can say what the number after the plus controls."},
   {"task": "Predict it", "detail": "Before you press Play, tell someone what will happen if you change Game.score = 0 to Game.score = 100.", "done": "You made a guess first, then checked it."},
 ],
 "bonus": {"title": "Golden food",
           "body": "<p>Just to imagine for now: what if catching one special food was worth 5 points instead "
                   "of 1? You would need a way to tell that food apart from the others. Hold that thought - "
                   "the bonus track builds it in a later week.</p>"},
 "slides": [
   {"title": "Make catching count", "sub": "Today: score, lives, and a real catch", "bullets": [
     "Are the monster and food touching?", "If so, score goes up", "The food jumps back to the top"]},
   {"title": "Start the score", "bullets": [], "code": [(GAME_START, "score")]},
   {"title": "Start with three lives", "bullets": [], "code": [(GAME_START, "lives")]},
   {"title": "Catch the food", "bullets": [], "code": [(FOOD_LOOP, "catch")]},
   {"title": "Checkpoint: you can catch it", "checkpoint": True,
    "say": "Press Play. Move the monster under the falling food. When it touches, the food should jump straight back to the top. The score is going up inside - we show it next week."},
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
    if "random.randint(" in stripped:
        keys.append("pp:random")
    if re.match(r"self\.y = self\.y -", stripped):
        keys.append("pp:fall")
    if "get_collision(" in stripped:
        keys.append("pp:collision")
    if re.match(r"Game\.\w+ = Game\.\w+ \+", stripped):
        keys.append("pp:change")
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
    "pp:random": ("py", "A surprise number",
        ["random.randint(a, b) gives a different number between a and b every time.",
         "It is how the food lands somewhere new on every press of Play."],
        "self.x = random.randint(-300, 300)"),
    "pp:fall": ("game", "Falling is just changing y",
        ["Take a little off y every loop and the object slides down the screen.",
         "The bigger the number you take off, the faster it falls."],
        "self.y = self.y - Game.fallSpeed"),
    "pp:collision": ("game", "get_collision - are they touching?",
        ["get_collision(self, 'Monster') is True only when this object is touching a Monster.",
         "Put it in an if to make something happen the moment they touch."],
        "if get_collision(self, 'Monster'):"),
    "pp:change": ("py", "Change a number by adding to it",
        ["Game.score = Game.score + 1 takes the score and makes it one bigger.",
         "The old value goes in on the right, the new value comes out on the left."],
        "Game.score = Game.score + 1"),
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
    "pp:random": {"kind": "pick", "items": ["-300", "-100", "0", "100", "300"], "at": 3, "label": "?",
                  "cap": "random.randint lands on a different number every time."},
    # pp:fall has no visual on purpose: the only "moving" metaphor is horizontal,
    # and a sideways picture for falling would teach the wrong thing. The text
    # bullets carry it.
    "pp:collision": {"kind": "fork", "cond": "touching?", "yes": "score!", "no": "keep falling",
                     "cap": "get_collision asks a yes/no question: are they touching?"},
    "pp:change": {"kind": "machine", "in": "3", "label": "+ 1", "out": "4",
                  "cap": "Take the number in, add one, the new number comes out."},
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
    (FOOD_START, "look"): [
        "This gives you surprise numbers - you use it in the very next line.",
        "Use the food picture you drew.",
    ],
    (FOOD_START, "place"): [
        "Pick a random spot across the screen, left to right.",
        "Start it up high, above the top, ready to fall next week.",
    ],
    (PLAY_START, "makeFood"): ["Make one piece of food. Press Play - it appears up high!"],
    (GAME_START, "speed"): ["How fast the food falls. One number the whole game shares."],
    (FOOD_LOOP, "fall"): [
        "Food loop is its own panel, so it needs its own import.",
        "Take the speed off y every loop, so the food slides down.",
    ],
    (FOOD_LOOP, "recycle"): [
        "Only when the food has dropped off the bottom...",
        "...pick a new spot across the screen...",
        "...back up high, ready to fall all over again.",
    ],
    (GAME_START, "score"): ["Start the score at zero when the game begins."],
    (GAME_START, "lives"): ["Three lives to start. Nothing takes one yet - that comes later."],
    (FOOD_LOOP, "catch"): [
        "Only when this food is touching the monster...",
        "...add one to the score...",
        "...and drop it below the floor, so the recycle lifts it back to the top.",
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
    (3, PLAY_START, "makeFood"): [
        {"q": "What does random.randint(-300, 300) give you?",
         "options": ["A surprise number between -300 and 300", "Always -300",
                     "The number 300 every time", "A random word"], "answer": 0,
         "why": "randint picks a new number between the two ends every time."},
        {"q": "Food is our second what?",
         "options": ["Class - a kind of thing", "Colour", "Room", "Number"], "answer": 0,
         "why": "A class is a kind of thing. Monster was the first, Food is the second."},
        {"q": "Where does code go if it should happen only once? (from week 1)",
         "options": ["start", "loop", "Anywhere", "In the picture"], "answer": 0,
         "why": "start happens once; loop happens over and over."},
    ],
    (4, FOOD_LOOP, "recycle"): [
        {"q": "How do you make something fall down the screen?",
         "options": ["Take a little off its y every loop", "Add to its y every loop",
                     "Change its picture", "Press Play twice"], "answer": 0,
         "why": "y is up and down, so taking a little off it each loop moves it down."},
        {"q": "What is Game.fallSpeed?",
         "options": ["A number the whole game shares", "The food's picture",
                     "A room", "A kind of thing"], "answer": 0,
         "why": "It lives on Game, so every food falls at the same speed."},
        {"q": "What does if mean? (from week 2)",
         "options": ["Only when", "Always", "Never", "Sixty times"], "answer": 0,
         "why": "The indented line runs only when the if is true."},
    ],
    (5, FOOD_LOOP, "catch"): [
        {"q": "When is get_collision(self, 'Monster') True?",
         "options": ["When this food is touching the monster", "Always",
                     "When you press Play", "Never"], "answer": 0,
         "why": "get_collision is True only while the two things are touching."},
        {"q": "What does Game.score = Game.score + 1 do?",
         "options": ["Makes the score one bigger", "Sets the score to 1",
                     "Takes a point away", "Shows the score on screen"], "answer": 0,
         "why": "It takes the score and adds one to it."},
        {"q": "Why send the caught food to -300? (this week)",
         "options": ["So last week's recycle lifts it back to the top", "To delete it",
                     "To make it bigger", "To end the game"], "answer": 0,
         "why": "-300 is below the floor, so the recycle if sends it back up high."},
    ],
}

EXPANDED_WEEKS = {1, 2, 3, 4, 5}
