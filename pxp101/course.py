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
TOTAL_WEEKS = 15

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
BOMB_START, BOMB_LOOP = "Bomb start", "Bomb loop"
PLAY_START, PLAY_LOOP = "Play start", "Play loop"
OVER_START, OVER_LOOP = "GameOver start", "GameOver loop"
START_START, START_LOOP = "Start start", "Start loop"

# File (reading) order, which is what line numbers count in. Game and each
# class come before the rooms that make them; the rooms run in play order:
# Start, then Play, then GameOver.
PANELS = [GAME_START, GAME_LOOP,
          MON_START, MON_LOOP,
          FOOD_START, FOOD_LOOP,
          BOMB_START, BOMB_LOOP,
          PLAY_START, PLAY_LOOP,
          OVER_START, OVER_LOOP,
          START_START, START_LOOP]

# Play is where the game happens and the room every week up to 14 lives in;
# GameOver arrives in week 10, the Start title screen in week 15. Game start's
# set_room picks the room on boot, so the list order here is just which rooms
# exist, not which one shows first.
ROOMS = ["Play", "GameOver", "Start"]

# The order blocks appear inside a panel. A block missing from this list is an
# authoring error and build.py will say so; a block listed here but not yet
# written is harmless, so a panel can carry the slots later weeks will fill.
# Game start is built top-down out of order: week 4 adds speed, week 5 adds
# score and lives ABOVE it, and setup (week 1) stays at the bottom.
ORDER = {
    GAME_START: ["score", "lives", "speed", "flag", "setup"],
    GAME_LOOP: ["over"],
    MON_START: ["look"],
    MON_LOOP: ["follow", "edges"],
    FOOD_START: ["look", "place"],
    FOOD_LOOP: ["fall", "catch", "cap", "recycle"],
    BOMB_START: ["look", "place"],
    BOMB_LOOP: ["fall", "hit", "recycle"],
    PLAY_START: ["make", "makeFood", "makeBomb", "makeMore", "hud"],
    PLAY_LOOP: ["label"],
    OVER_START: ["message", "score"],
    OVER_LOOP: ["again"],
    START_START: ["title"],
    START_LOOP: ["begin"],
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
    "bomb.png": ("dark", 34, 34),
}


WEEKS = [

# ---------------------------------------------------------------- week 1 ----
{
 "n": 1,
 "title": "Your monster appears",
 "big_idea": "A game is made of [[objects|object]] you draw and then tell what to do. Today you draw a monster and write four lines of Python that put it on the screen.",
 "new_concepts": ["sprite", "start", "room", "x and y", "making an object"],
 "draw": ["monster.png"],
 "objectives": [
   "Draw a [[sprite]] at the size the book asks for",
   "Say what [[start]] means - it happens once",
   "Put an [[object]] into a [[room]] and see it appear",
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
       ["A [[room]] is one screen of your game. This says: start on the screen called Play."]),
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
   ("Nothing appears at all", "The Play room's start is empty, or the [[class]] is called something other than Monster. The name in Play start must match the class name exactly."),
   ("A grey box instead of a monster", "The sprite is not called monster.png. The name in the code and the name of the sprite must be identical, including .png."),
   ("An error about 'sprite'", "Check the quotes: sprite('monster.png') needs both single quotes."),
 ],
 "recap": [
   "A [[sprite]] is a picture you draw.",
   "[[start]] happens once, right at the beginning.",
   "y is up and down. Minus numbers are down.",
   "Monster() makes one [[monster|object]].",
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
 "big_idea": "[[loop]] happens over and over, many times every second. That is what makes a game move. Today your monster follows your mouse, and learns to stop at the edges.",
 "new_concepts": ["loop", "mouse_x()", "if", "the edges of the screen"],
 "objectives": [
   "Say the difference between [[start]] and [[loop]]",
   "Use mouse_x() to move an [[object]]",
   "Write an [[if]] and indent the line under it",
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
       "<p>Ask one child to stand up ONCE. That is [[start]]. Now ask them to wave, and keep waving, "
       "and keep waving. That is [[loop]].</p>",
       "<p>Say the number out loud: loop runs about <strong>sixty times a second</strong>. That is "
       "why things look like they are moving.</p>",
       ask=("Which one would you put 'give the monster its picture' in?", "start - it only needs doing once")),
  STEP(MON_LOOP, "follow", "Make the monster follow your mouse",
       ["<code>mouse_x()</code> is where your mouse is, left to right. Because this is in [[loop]], it "
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
   ("The monster does not move", "The line is in Monster start instead of Monster loop. [[start]] happens once."),
   ("An error about indentation", "The line under the if needs exactly four spaces in front of it, and nothing else on the if line after the colon."),
   ("It stops in the middle of the screen", "One of the numbers is too small - check for 320, not 32."),
   ("It still runs off one side only", "The second if uses a minus: -320, not 320."),
 ],
 "recap": [
   "[[loop]] happens over and over, about sixty times a second.",
   "[[mouse_x()|mouse_x]] is where your mouse is, left to right.",
   "[[if]] means only when.",
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
 "big_idea": "A game needs something to DO. Today you draw food and make a new [[KIND of thing|class]] - a Food - that shows up high on the screen at a [[random]] spot every time you press Play.",
 "new_concepts": ["a second class", "import random", "random.randint()"],
 "draw": ["food.png"],
 "objectives": [
   "Draw a second sprite at the size the book asks for",
   "Make a new [[class]] - a Food - the same way they made a Monster",
   "Use [[random.randint()|random]] to put it in a surprise place",
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
       "<p>Monster is a [[class]] - a kind of thing in your game. Now we make a second kind: "
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
   "A [[class]] is a kind of thing. Food is our second one.",
   "import [[random]] gives you surprise numbers.",
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
 "big_idea": "[[loop]] runs about sixty times a second. If you take a little off y every single loop, the food slides down the screen. And when it drops off the bottom, we send it back up to [[fall]] again - for ever.",
 "new_concepts": ["a number you can change", "falling by changing y", "recycling an object"],
 "objectives": [
   "Make a number - fallSpeed - that the whole game can use",
   "Make the food [[fall]] by changing its y in [[loop]]",
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
   ("It falls once and vanishes", "The [[recycle]] if is missing, or its two lines are not indented four spaces under it."),
   ("The food flies UP instead of down", "The line says plus instead of minus. Falling is self.y = self.y - Game.fallSpeed."),
 ],
 "recap": [
   "Game.fallSpeed is a number the whole game shares.",
   "Taking a little off y every [[loop]] makes something [[fall]].",
   "[[if]] means only when.",
   "When the food drops off the bottom, we [[recycle]] it - back to the top to fall again.",
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
 "big_idea": "[[get_collision]] asks: are these two things touching? When the monster touches the food, we add one to the [[score]] and send the food below the floor - so last week's [[recycle]] lifts it straight back to the top.",
 "new_concepts": ["a score you keep", "get_collision()", "changing a number by adding"],
 "objectives": [
   "Start a [[score]] and some [[lives]] at the beginning of the game",
   "Use [[get_collision()|get_collision]] to tell when the monster touches the food",
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
   "Your [[score]] and your [[lives]] are numbers the whole game shares.",
   "get_collision(self, 'Monster') is True when two things are touching.",
   "Game.score = Game.score + 1 means take the score and make it one bigger.",
   "Sending the food to -300 lets last week's [[recycle]] lift it back up.",
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

# ---------------------------------------------------------------- week 6 ----
{
 "n": 6,
 "title": "Show the score",
 "big_idea": "The [[score]] has been climbing since last week, hidden inside the game. Today we put it on the screen. [[text]]() makes a label, and in [[loop]] we rewrite it every frame so it always shows the score and [[lives]] right now.",
 "new_concepts": ["a label with text()", "str() to show a number", "a label that updates every loop"],
 "objectives": [
   "Make a label on the screen with [[text]]()",
   "Show the [[score]] and [[lives]] on it",
   "Rewrite the label every [[loop]] so it stays right",
   "Press Play and watch the number climb as you catch food",
 ],
 "ops": [
  ADD(PLAY_START, "hud", [
    "Game.label = text()",
    'Game.label.color = "white"',
    "Game.label.y = 235",
    "Game.label.text = 'Score: 0'",
  ]),
  ADD(PLAY_LOOP, "label", [
    "Game.label.text = 'Score: ' + str(Game.score) + '   Lives: ' + str(Game.lives)",
  ]),
 ],
 "flow": [
  TALK("0:00", "The score you cannot see",
       "<p>Press Play on last week's game and catch some food. The score is going up - but "
       "you cannot see it anywhere. Today we put it on the screen.</p>",
       ask=("You caught food last week but saw no number. Where was the score?", "Counting inside the game - today we show it")),
  STEP(PLAY_START, "hud", "Make the label",
       ["Open <strong>Play start</strong>, under where you make the food. <code>text()</code> makes a "
        "label - a bit of writing on the screen. Make it white so it shows on the dark background, put "
        "it near the top (<code>y = 235</code>, big y is up), and start it saying <code>Score: 0</code>."],
       at="0:08",
       ask=("Why start the label saying Score: 0 and not leave it blank?", "So there is something to see the moment the game starts")),
  STEP(PLAY_LOOP, "label", "Keep it up to date",
       ["Open <strong>Play loop</strong>. Every loop, rewrite the label with the score and lives as they "
        "are <em>right now</em>. <code>str()</code> turns each number into writing so it can join the "
        "sentence. Press Play - the number climbs as you catch food!"],
       at="0:22",
       ask=("Why rewrite the label every loop instead of just once?", "The score keeps changing - a one-time label would stay stuck at 0")),
  TALK("0:40", "Watch it climb",
       "<p>Everyone plays for a minute and watches the score go up as they catch food. Seeing the "
       "number move is the first time the counting feels real.</p>"),
 ],
 "errors": [
   ("The label does not show", "The text() line is missing from Play start, or the colour is the same as the background so you cannot see it."),
   ("The number never changes", "The label line is in Play start instead of Play loop. It has to be rewritten over and over, so it lives in loop."),
   ("An error about str", "Check the + signs and quotes: 'Score: ' + str(Game.score) + '   Lives: ' + str(Game.lives). Every bit of writing is in quotes and joined with +."),
   ("It says Score: 0 and stays there", "The Play loop label line is missing - only the starting label from Play start is showing."),
 ],
 "recap": [
   "[[text]]() makes a label - writing on the screen.",
   "str() turns a number into writing so you can show it.",
   "Rewriting the label every [[loop]] keeps it up to date.",
   "The [[score]] and [[lives]] were there all along - now you can see them.",
 ],
 "homework": [
   {"task": "Move it", "detail": "Change Game.label.y = 235 to 0 and press Play. Where is the score now?", "done": "You can say what the label's y controls."},
   {"task": "Change the words", "detail": "Change 'Score: ' to 'Points: ' and press Play.", "done": "You can find and change the words a label shows."},
 ],
 "bonus": {"title": "A label of your own",
           "body": "<p>Just to try: add a second <code>text()</code> label somewhere on the screen that says your "
                   "name. You already know every line you need - make one, set its colour, and set its .text.</p>"},
 "slides": [
   {"title": "Show the score", "sub": "text() puts words on the screen", "bullets": [
     "A label made with text()", "Rewritten every loop", "The score at last"]},
   {"title": "Make the label", "bullets": [], "code": [(PLAY_START, "hud")]},
   {"title": "Keep it up to date", "bullets": [], "code": [(PLAY_LOOP, "label")]},
   {"title": "Checkpoint: the score shows", "checkpoint": True,
    "say": "Press Play. A white 'Score: 0   Lives: 3' should sit near the top, and the number should climb every time you catch food."},
 ],
},

# ---------------------------------------------------------------- week 7 ----
{
 "n": 7,
 "title": "A bomb appears",
 "big_idea": "Time for danger. You draw a [[sprite]] for a bomb, make a new [[class]] for it - your third, after Monster and Food - and drop one into the [[room]]. It just sits there for now; next week it falls.",
 "new_concepts": ["a third class: Bomb", "drawing the bomb sprite", "making a Bomb object"],
 "draw": ["bomb.png"],
 "objectives": [
   "Draw a bomb [[sprite]]",
   "Give the Bomb [[class]] its picture and a starting spot",
   "Make one Bomb and drop it in the [[room]]",
   "Press Play and see the bomb waiting up high",
 ],
 "ops": [
  ADD(BOMB_START, "look", [
    "import random",
    "self.image = sprite('bomb.png')",
  ]),
  ADD(BOMB_START, "place", [
    "self.x = random.randint(-300, 300)",
    "self.y = random.randint(300, 700)",
  ]),
  ADD(PLAY_START, "makeBomb", [
    "Game.bomb = Bomb()",
  ]),
 ],
 "flow": [
  TALK("0:00", "A new danger",
       "<p>We have a monster you steer and food to catch. A game needs something to avoid too. "
       "Today we add a bomb.</p>",
       ask=("We have made a Monster and a Food. What do you call a kind of thing like that?", "A class")),
  STEP(BOMB_START, "look", "Give the bomb its picture",
       ["Draw a bomb first. Then open <strong>Bomb start</strong>. <code>import random</code> at the top - "
        "this panel is on its own - and give the bomb the picture you drew with <code>sprite('bomb.png')</code>."],
       at="0:08",
       ask=("Why does Bomb start need its own import random when Food start already has one?", "Each panel is on its own - it cannot borrow another panel's import")),
  STEP(BOMB_START, "place", "Put it somewhere random and high",
       ["Just under it: a random spot across the screen, and a starting height even higher than the food "
        "(300 to 700), so the very first bomb takes a moment to arrive."],
       at="0:18",
       ask=("Why start the bomb higher than the food?", "So the first bomb takes a moment and does not hit you the instant you press Play")),
  STEP(PLAY_START, "makeBomb", "Make one bomb",
       ["Open <strong>Play start</strong>. <code>Game.bomb = Bomb()</code> makes one bomb and drops it in the "
        "room, exactly the way we make a Food. Press Play - a bomb is waiting up high."],
       at="0:28"),
  TALK("0:38", "It just sits there",
       "<p>The bomb hangs up high and does nothing - it has no loop yet. That is next week, when it "
       "starts to fall. For now, enjoy that your game has a third kind of thing in it.</p>"),
 ],
 "errors": [
   ("No bomb appears", "Game.bomb = Bomb() is missing from Play start, so no bomb was ever made."),
   ("An error about the picture", "The sprite name must match the file you drew exactly: sprite('bomb.png')."),
   ("An error about random", "Bomb start needs its own import random at the top - a panel cannot use another panel's import."),
   ("The bomb falls already", "If it moves, a falling line ended up in Bomb start by mistake. Falling comes next week, in Bomb loop."),
 ],
 "recap": [
   "Bomb is your third [[class]], after Monster and Food.",
   "A [[class]] needs its own [[sprite]] and its own import.",
   "Bomb() makes one bomb and puts it in the [[room]].",
   "It just waits for now - next week it falls.",
 ],
 "homework": [
   {"task": "Two bombs", "detail": "In Play start, add a second line Game.bombX = Bomb() and press Play. How many bombs wait up high?", "done": "You can make more than one of the same class."},
   {"task": "Lower start", "detail": "Change the bomb's random.randint(300, 700) to (100, 300) and press Play. Where does it wait now?", "done": "You can say what the two numbers control."},
 ],
 "bonus": {"title": "A whole new class",
           "body": "<p>Think ahead: making a Bomb was the same three steps as making a Food - a picture, a "
                   "place, and one line in Play start to make it. Any new thing you dream up follows the same "
                   "three steps. The bonus track builds a bonus class this way in a later week.</p>"},
 "slides": [
   {"title": "A bomb appears", "sub": "your third class", "bullets": [
     "Draw a bomb sprite", "A new class with its own picture", "Made and dropped in the room"]},
   {"title": "Give the bomb its picture", "bullets": [], "code": [(BOMB_START, "look")]},
   {"title": "Put it random and high", "bullets": [], "code": [(BOMB_START, "place")]},
   {"title": "Make one bomb", "bullets": [], "code": [(PLAY_START, "makeBomb")]},
   {"title": "Checkpoint: a bomb is waiting", "checkpoint": True,
    "say": "Press Play. A bomb should appear somewhere up high and just hang there. It does not move yet - that is next week."},
 ],
},

# ---------------------------------------------------------------- week 8 ----
{
 "n": 8,
 "title": "The bomb falls",
 "big_idea": "The bomb learns the trick the food knows: take a little off its y every [[loop]] and it [[falls|fall]]. When it drops off the bottom, [[recycle]] sends it back up - for ever.",
 "new_concepts": ["the bomb falls like the food", "sharing Game.fallSpeed", "recycling the bomb"],
 "objectives": [
   "Make the bomb [[fall]] by changing its y in [[loop]]",
   "Use the same Game.fallSpeed the food uses",
   "[[recycle]] the bomb back to the top when it drops off the bottom",
   "Press Play and dodge the falling bomb",
 ],
 "ops": [
  ADD(BOMB_LOOP, "fall", [
    "import random",
    "self.y = self.y - Game.fallSpeed",
  ]),
  ADD(BOMB_LOOP, "recycle", [
    "if self.y < -260:",
    "    self.x = random.randint(-300, 300)",
    "    self.y = random.randint(300, 700)",
  ]),
 ],
 "flow": [
  TALK("0:00", "It just hangs there",
       "<p>Press Play. The bomb sits up high doing nothing. We taught the food to fall a few weeks "
       "ago - today the bomb learns the exact same trick.</p>",
       ask=("How did we make the food fall?", "Take Game.fallSpeed off its y every loop")),
  STEP(BOMB_LOOP, "fall", "Make the bomb fall",
       ["Open <strong>Bomb loop</strong>. <code>import random</code> again - its own panel - then the same "
        "falling line the food uses: take <code>Game.fallSpeed</code> off <code>self.y</code> every loop. "
        "Press Play - the bomb falls!"],
       at="0:08",
       ask=("The bomb and food both use Game.fallSpeed. Can one fall faster than the other right now?", "No - they share the one speed")),
  STEP(BOMB_LOOP, "recycle", "Send it back to the top",
       ["Just like the food: only when the bomb drops past the bottom (-260) do these lines pick a new "
        "random spot up high, so it falls again for ever. Press Play - bombs keep coming."],
       at="0:20",
       ask=("Why send it a bit past the bottom (-260) before it jumps back?", "So it is fully gone before it reappears and you do not see it flick")),
  TALK("0:36", "Dodge it",
       "<p>Everyone plays and dodges the falling bomb. Notice that touching it still does nothing - no "
       "life is lost yet. That is next week.</p>"),
 ],
 "errors": [
   ("The bomb does not move", "The fall line is in Bomb start instead of Bomb loop. Falling happens over and over, so it lives in loop."),
   ("It falls once and vanishes", "The [[recycle]] if is missing, or its lines are not indented four spaces under it."),
   ("An error about random", "Bomb loop needs its own import random - the recycle uses random.randint."),
   ("Touching the bomb does nothing", "That is right for this week. Losing a life when it hits you is next week."),
 ],
 "recap": [
   "The bomb [[falls|fall]] the same way the food does - off its y every [[loop]].",
   "Every falling thing shares the one Game.fallSpeed.",
   "[[recycle]] sends the bomb back up when it drops off the bottom.",
   "Touching it still does nothing - the hit comes next week.",
 ],
 "homework": [
   {"task": "A slow bomb", "detail": "You cannot make just the bomb slow yet - it shares fallSpeed. Change Game.fallSpeed = 3 to 1, press Play, and watch BOTH the food and the bomb slow down.", "done": "You can explain why the food slowed down too."},
   {"task": "Predict it", "detail": "Before pressing Play, tell someone what the bomb will do if you delete its recycle if.", "done": "You made a guess, then checked it."},
 ],
 "bonus": {"title": "A bomb of its own speed",
           "body": "<p>Just to wonder about: what would it take for the bomb to fall faster than the food? "
                   "It would need a speed of its own, not the shared <code>Game.fallSpeed</code>. Hold that "
                   "thought - the bonus track gives the bomb its own speed later.</p>"},
 "slides": [
   {"title": "The bomb falls", "sub": "the same trick as the food", "bullets": [
     "Off its y every loop", "Shares Game.fallSpeed", "Recycled back to the top"]},
   {"title": "Make the bomb fall", "bullets": [], "code": [(BOMB_LOOP, "fall")]},
   {"title": "Send it back to the top", "bullets": [], "code": [(BOMB_LOOP, "recycle")]},
   {"title": "Checkpoint: bombs rain down", "checkpoint": True,
    "say": "Press Play. The bomb should fall, drop off the bottom, and come back up high to fall again - over and over. Touching it does nothing yet."},
 ],
},

# ---------------------------------------------------------------- week 9 ----
{
 "n": 9,
 "title": "A bomb costs a life",
 "big_idea": "Now a bomb bites. When it touches the monster you lose a [[life|lives]]. We also set up a [[flag]] - Game.dead - that starts False and will flip to True when the last life is gone. Next week the flag ends the game.",
 "new_concepts": ["a flag: Game.dead", "losing a life on a hit", "reusing recycle for the bomb"],
 "objectives": [
   "Set up a [[flag]], Game.dead, that starts off False",
   "Lose a [[life|lives]] when a bomb touches the monster",
   "Send the hit bomb below the floor so [[recycle]] lifts it back",
   "Press Play - watch the lives go down (the game does not end yet)",
 ],
 "ops": [
  ADD(GAME_START, "flag", [
    "Game.dead = False",
  ]),
  ADD(BOMB_LOOP, "hit", [
    "if get_collision(self, 'Monster'):",
    "    Game.lives = Game.lives - 1",
    "    self.y = -300",
  ]),
 ],
 "flow": [
  TALK("0:00", "It falls right through you",
       "<p>Press Play. The bomb falls, but you can walk the monster right into it and nothing happens. "
       "Today a bomb starts to cost you.</p>",
       ask=("The bomb falls right through you. What should touching one cost?", "A life")),
  STEP(GAME_START, "flag", "Set up the dead flag",
       ["Open <strong>Game start</strong>. <code>Game.dead = False</code> is a <strong>flag</strong> - a "
        "True/False the whole game remembers. It starts False: nothing has ended the game. In a moment the "
        "bomb will flip it, and next week Game will watch for it."],
       at="0:08",
       ask=("Game.dead is False now. What could make it True?", "Losing your last life to a bomb")),
  STEP(BOMB_LOOP, "hit", "Lose a life on a hit",
       ["Open <strong>Bomb loop</strong>. Just like catching food, <code>get_collision</code> checks the "
        "touch. When a bomb touches the monster: take one off <code>Game.lives</code>, and drop the bomb to "
        "-300 so its recycle lifts it back up. Press Play and let a bomb hit you - a life is gone."],
       at="0:18",
       ask=("Why drop the hit bomb to -300, the same as a caught food?", "So the recycle we already wrote sends it back to the top")),
  TALK("0:34", "It does not end yet",
       "<p>Lives go down, and can even drop below zero, and the game keeps going. That is on purpose - "
       "ending the game on the last life is next week's whole lesson.</p>"),
 ],
 "errors": [
   ("Lives do not go down", "The hit code is in Bomb start instead of Bomb loop, or get_collision is misspelled."),
   ("An error about Game.dead", "Game.dead = False is missing from Game start. It has to exist before anything can set it True."),
   ("The bomb vanishes on a hit and never comes back", "The bomb's [[recycle]] if is missing or changed - self.y = -300 relies on it."),
   ("Lives go below zero and nothing happens", "That is right for now - ending the game on the last life is next week."),
 ],
 "recap": [
   "A [[flag]] is a True/False the game remembers, like Game.dead.",
   "get_collision catches a bomb touching the monster.",
   "A hit takes one off your [[lives]] and sends the bomb to -300 for its [[recycle]].",
   "The game does not end yet - that is next week.",
 ],
 "homework": [
   {"task": "Harder", "detail": "Change Game.lives = 3 (in Game start) to 1 and press Play. How forgiving is the game now?", "done": "You can say what Game.lives controls."},
   {"task": "Two lost at once", "detail": "Change the - 1 in the hit to - 2 and press Play. What happens on a hit?", "done": "You can say what the number after the minus controls."},
 ],
 "bonus": {"title": "A shield",
           "body": "<p>Just to imagine: what if one special catch gave you a life back instead of a point? You "
                   "would write <code>Game.lives = Game.lives + 1</code> somewhere. Hold that thought - the "
                   "bonus track builds a power-up later.</p>"},
 "slides": [
   {"title": "A bomb costs a life", "sub": "and a flag to remember it", "bullets": [
     "A flag: Game.dead starts False", "A hit takes a life", "The bomb rides its recycle back up"]},
   {"title": "Set up the dead flag", "bullets": [], "code": [(GAME_START, "flag")]},
   {"title": "Lose a life on a hit", "bullets": [], "code": [(BOMB_LOOP, "hit")]},
   {"title": "Checkpoint: hits hurt", "checkpoint": True,
    "say": "Press Play. Steer into a bomb - a life should drop on the label, and the bomb should jump back to the top. The game keeps going even past zero for now."},
 ],
},

# --------------------------------------------------------------- week 10 ----
{
 "n": 10,
 "title": "Game over",
 "big_idea": "The last life should end the game. We finish the bomb's hit with an [[if]] inside an [[if]] - only when that was the last life, raise the [[flag]]. Then Game [[loop]] watches the flag and, because Game lives through a [[room]] change when the bomb would not, does the switch to GameOver.",
 "new_concepts": ["an if inside an if", "raising the flag on the last life", "Game loop ends the game"],
 "objectives": [
   "Raise the Game.dead [[flag]] only on the very last life",
   "Have Game [[loop]] watch the flag every frame",
   "Switch to the GameOver [[room]] when the flag is up",
   "Press Play, lose all three lives, and see the game react",
 ],
 "ops": [
  ADD(BOMB_LOOP, "hit", [
    "    if Game.lives < 1:",
    "        Game.dead = True",
  ]),
  ADD(GAME_LOOP, "over", [
    "if Game.dead:",
    "    Game.dead = False",
    "    set_room('GameOver')",
  ]),
 ],
 "flow": [
  TALK("0:00", "One life too many",
       "<p>Press Play and lose every life. The number goes past zero and the game just keeps going. "
       "Today the last life actually ends the game.</p>",
       ask=("Lives go below zero right now. When should the game actually end?", "When the last life is gone - at zero")),
  STEP(BOMB_LOOP, "hit", "End it on the last life",
       ["Back in <strong>Bomb loop</strong>, add two more lines under the hit. An <code>if</code> "
        "<em>inside</em> the collision if - pushed in eight spaces - only when <code>Game.lives</code> drops "
        "below 1: raise the flag, <code>Game.dead = True</code>. The bomb does not switch rooms itself - "
        "watch why next."],
       at="0:08",
       ask=("Why does the bomb raise a flag instead of switching to GameOver itself?", "Switching rooms would destroy the bomb halfway through this very step")),
  STEP(GAME_LOOP, "over", "Let Game end the game",
       ["Open <strong>Game loop</strong> - Game's own loop, which keeps running through any room change. "
        "Every frame it checks the flag. When <code>Game.dead</code> is True: lower it again, then "
        "<code>set_room('GameOver')</code>. Game survives the switch, so it is the safe one to do it."],
       at="0:20",
       ask=("Why is Game the safe place to call set_room, when the bomb was not?", "Game is not destroyed by the room change - the bomb was")),
  TALK("0:34", "The screen goes blank",
       "<p>Lose all three lives and the screen goes blank. That is the GameOver [[room]] - it exists now, "
       "but it is empty. We decorate it next week. Seeing the switch happen is the win for today.</p>"),
 ],
 "errors": [
   ("The game never ends", "The over block is missing from Game loop, or Game.dead is never set True in the bomb's hit."),
   ("It ends after one hit, not three", "The if Game.lives < 1 test is wrong or not nested inside the collision if - it must be pushed in eight spaces."),
   ("An error about set_room", "GameOver is spelled differently in set_room('GameOver') than the room's name will be. They must match exactly."),
   ("The game ends but the screen is blank", "That is right this week - GameOver is an empty room until next week fills it."),
 ],
 "recap": [
   "An [[if]] inside an [[if]] runs only when both are true - here, only on the last life.",
   "The bomb raises the [[flag]] instead of switching rooms, because the switch would destroy it.",
   "Game [[loop]] watches the flag and does the switch, because Game survives a [[room]] change.",
   "GameOver exists now, but it is empty until next week.",
 ],
 "homework": [
   {"task": "Two lives", "detail": "Change Game.lives = 3 to 2 and play until GAME OVER. Does it end a hit sooner?", "done": "You can connect the starting lives to when the game ends."},
   {"task": "Trace it", "detail": "Tell someone the order: bomb hit, last life, flag up, Game loop sees it, room switches. Say it without looking.", "done": "You can explain how the flag passes the message."},
 ],
 "bonus": {"title": "A different ending",
           "body": "<p>Just to think about: the flag lets one part of the game tell another that something "
                   "happened. What else could raise a flag? Winning, maybe - reaching a score. The bonus track "
                   "adds a You Win screen the same way, later.</p>"},
 "slides": [
   {"title": "Game over", "sub": "the flag ends the game", "bullets": [
     "An if inside an if - the last life", "Raise the flag", "Game loop does the switch"]},
   {"title": "End it on the last life", "bullets": [], "code": [(BOMB_LOOP, "hit")]},
   {"title": "Let Game end the game", "bullets": [], "code": [(GAME_LOOP, "over")]},
   {"title": "Checkpoint: it ends", "checkpoint": True,
    "say": "Press Play and lose all three lives. The game should switch away from Play to a blank screen - the empty GameOver room. We fill it next week."},
 ],
},

# --------------------------------------------------------------- week 11 ----
{
 "n": 11,
 "title": "The GameOver screen",
 "big_idea": "Last week the game switched to an empty GameOver [[room]]. Today we give that [[room]] a big message: GAME OVER. It is [[text]]() - the same label trick from week 6 - on a different screen.",
 "new_concepts": ["decorating the GameOver room", "a big centered message", "fontSize and halign"],
 "objectives": [
   "Give the GameOver [[room]] a GAME OVER message",
   "Use [[text]]() again, on a different screen",
   "Make it big and centered with fontSize and halign",
   "Press Play, lose, and read the message",
 ],
 "ops": [
  ADD(OVER_START, "message", [
    "Game.message = text()",
    'Game.message.color = "white"',
    "Game.message.fontSize = 40",
    'Game.message.halign = "center"',
    "Game.message.text = 'GAME OVER - tap to play again'",
  ]),
 ],
 "flow": [
  TALK("0:00", "The blank screen",
       "<p>Press Play and lose. The screen goes blank - that empty GameOver [[room]] from last week. "
       "Today we put words on it.</p>",
       ask=("Last week the screen went blank when you lost. Which room were you looking at?", "The empty GameOver room")),
  STEP(OVER_START, "message", "Write GAME OVER",
       ["Open <strong>GameOver start</strong>. This is <code>text()</code> again, just like the score label: "
        "make a label, make it white, then two new tricks - <code>fontSize = 40</code> to make it big and "
        "<code>halign = \"center\"</code> to line it up in the middle. Its words: GAME OVER - tap to play again."],
       at="0:08",
       ask=("This is text() again, like the score label. What is different this time?", "It is in the GameOver room, and it is big and centered")),
  TALK("0:24", "Tapping does nothing yet",
       "<p>The message invites a tap to play again, but tapping does nothing so far. That is honest - we "
       "write the code that listens for the tap in week 13.</p>",
       ask=("The message says 'tap to play again' but tapping does nothing. When will it work?", "In two weeks, when we write the loop that listens")),
  TALK("0:34", "Lose on purpose",
       "<p>Everyone plays, loses on purpose, and reads their GAME OVER screen. A real ending makes the "
       "game feel finished.</p>"),
 ],
 "errors": [
   ("No message appears", "The message block is missing from GameOver start, or its colour matches the background."),
   ("The message is tiny or off to the side", "Check fontSize = 40 and halign = \"center\"."),
   ("Tapping does nothing", "That is expected until week 13, when the GameOver loop starts listening."),
   ("An error about text", "Game.message = text() has to come first, before you set its .color, .fontSize and .text."),
 ],
 "recap": [
   "GameOver is a [[room]] - a whole screen the game switches to.",
   "[[text]]() makes a label on any screen, not just Play.",
   "fontSize makes writing bigger; halign center lines it up in the middle.",
   "The tap does nothing yet - that is week 13.",
 ],
 "homework": [
   {"task": "Bigger", "detail": "Change fontSize = 40 to 60 and press Play, then lose. How does the message look?", "done": "You can say what fontSize controls."},
   {"task": "Your words", "detail": "Change 'GAME OVER - tap to play again' to your own message and lose to see it.", "done": "You can change what a label says."},
 ],
 "bonus": {"title": "Two lines of message",
           "body": "<p>Just to try: add a second label under GAME OVER with a message of your own. You know every "
                   "line - make a label, colour it, set its .y lower, and set its .text.</p>"},
 "slides": [
   {"title": "The GameOver screen", "sub": "text() on a new room", "bullets": [
     "A big GAME OVER message", "Centered with halign", "Read after you lose"]},
   {"title": "Write GAME OVER", "bullets": [], "code": [(OVER_START, "message")]},
   {"title": "Checkpoint: GAME OVER shows", "checkpoint": True,
    "say": "Press Play and lose all three lives. A big white 'GAME OVER - tap to play again' should be centered on the screen. Tapping does nothing yet."},
 ],
},

# --------------------------------------------------------------- week 12 ----
{
 "n": 12,
 "title": "Show the final score",
 "big_idea": "Under GAME OVER, show how well you did. A second [[text]]() label reads your final [[score]], with str() turning the number into writing - and because a [[room]]'s [[start]] runs every time you enter it, it is fresh each game.",
 "new_concepts": ["a second label on GameOver", "showing the final score with str()", "start runs each time you enter a room"],
 "objectives": [
   "Add a second label to the GameOver [[room]]",
   "Show the final [[score]] with str()",
   "Put it just under the GAME OVER message",
   "Play, lose, and read your score",
 ],
 "ops": [
  ADD(OVER_START, "score", [
    "Game.finalScore = text()",
    'Game.finalScore.color = "white"',
    "Game.finalScore.fontSize = 28",
    'Game.finalScore.halign = "center"',
    "Game.finalScore.y = -60",
    "Game.finalScore.text = 'Final Score: ' + str(Game.score)",
  ]),
 ],
 "flow": [
  TALK("0:00", "How did I do?",
       "<p>GAME OVER shows, but not how you did. Today we add your final score right under it.</p>",
       ask=("GAME OVER shows, but not how you did. What should we add?", "Your final score")),
  STEP(OVER_START, "score", "Show the score you got",
       ["Open <strong>GameOver start</strong>, under the message. A second label: white, a little smaller "
        "(<code>fontSize = 28</code>), centered, and set lower with <code>y = -60</code> so it sits under "
        "GAME OVER. Its words join writing and the number: <code>'Final Score: ' + str(Game.score)</code>."],
       at="0:08",
       ask=("How do we put the number Game.score inside the writing?", "str() turns it into writing so it joins the sentence")),
  TALK("0:24", "Fresh every game",
       "<p>Play twice and lose with different scores. The number is right each time - because "
       "GameOver's [[start]] runs every time you enter the [[room]], so it reads the score fresh.</p>",
       ask=("Play twice and get different scores. Why is the number right each time?", "GameOver start runs every time you enter the room, so it reads the score fresh")),
  TALK("0:36", "A real ending",
       "<p>Everyone plays a full game and reads their final score. The game now has a real ending - one "
       "more week and you can play again.</p>"),
 ],
 "errors": [
   ("The score does not show", "The score block is missing from GameOver start, or it sits on top of the message - check its y = -60."),
   ("It always shows the same number", "str(Game.score) is missing, or the number was written straight into the words - it must read Game.score."),
   ("An error about +", "Join writing and the number with +: 'Final Score: ' + str(Game.score)."),
   ("The two labels overlap", "Give the final score a different y, like -60, so it sits under the GAME OVER message."),
 ],
 "recap": [
   "A [[room]] can hold more than one label.",
   "str() turns the [[score]] number into writing to show it.",
   "A different .y keeps two labels from overlapping.",
   "A [[room]]'s [[start]] runs every time you enter it, so the score is fresh.",
 ],
 "homework": [
   {"task": "Move it", "detail": "Change the final score's y = -60 to -120 and lose. Where is it now?", "done": "You can place a label where you want it."},
   {"task": "Best yet", "detail": "Play three games and write down your three final scores. Which is your best?", "done": "You can read the final score off the screen."},
 ],
 "bonus": {"title": "A high score",
           "body": "<p>Just to wonder: how would the game remember your BEST score across games? It would need a "
                   "number on Game that only ever goes up. Hold that thought - the bonus track keeps a high "
                   "score later.</p>"},
 "slides": [
   {"title": "Show the final score", "sub": "str() on the GameOver screen", "bullets": [
     "A second label", "Reads your final score", "Sits under GAME OVER"]},
   {"title": "Show the score you got", "bullets": [], "code": [(OVER_START, "score")]},
   {"title": "Checkpoint: your score shows", "checkpoint": True,
    "say": "Press Play, catch some food, then lose. Under GAME OVER you should read 'Final Score:' and the number you got - and a different number after a different game."},
 ],
},

# --------------------------------------------------------------- week 13 ----
{
 "n": 13,
 "title": "Play again",
 "big_idea": "One tap should start a fresh game. In the GameOver [[loop]], [[key_was_pressed]](' ') or a click sends you back to Play - after putting the [[score]], [[lives]] and speed back to the start. A [[room]] is allowed to switch itself, unlike the bomb.",
 "new_concepts": ["waiting for a tap with key_was_pressed", "resetting the game", "a room may switch itself"],
 "objectives": [
   "Listen for a tap in the GameOver [[loop]]",
   "Reset the [[score]], [[lives]] and speed",
   "Go back to the Play [[room]] for a fresh game",
   "Play a whole game, lose, tap, and go again",
 ],
 "ops": [
  ADD(OVER_LOOP, "again", [
    "if key_was_pressed(' ') or mouse_was_pressed('left'):",
    "    Game.score = 0",
    "    Game.lives = 3",
    "    Game.fallSpeed = 3",
    "    set_room('Play')",
  ]),
 ],
 "flow": [
  TALK("0:00", "Make the tap work",
       "<p>The GameOver screen says tap to play again, but nothing happens. Today we make it real.</p>",
       ask=("The message says tap to play again. Where should the code that listens live?", "In GameOver loop - it has to check over and over")),
  STEP(OVER_LOOP, "again", "Listen and reset",
       ["Open <strong>GameOver loop</strong>. <code>key_was_pressed(' ')</code> is true the moment the space "
        "bar goes down, and <code>mouse_was_pressed('left')</code> the moment you click. When either happens: "
        "put the score back to 0, lives back to 3, speed back to 3, then <code>set_room('Play')</code> for a "
        "clean game."],
       at="0:08",
       ask=("Why set the score and lives back before going to Play?", "So the new game starts fresh, not with 0 lives and top speed")),
  TALK("0:24", "A room may switch itself",
       "<p>Week 10 said the bomb must never call <code>set_room</code>. But GameOver loop just did. The "
       "difference: a [[room]] is not destroyed by a room change the way an [[object]] in it is.</p>",
       ask=("Why can GameOver loop call set_room safely when the bomb could not?", "A room is not destroyed by a room change the way an object is")),
  TALK("0:36", "A whole game",
       "<p>Everyone plays a full loop: catch food, lose to bombs, read the score, tap, and go again. The "
       "game is a real game now.</p>"),
 ],
 "errors": [
   ("Tapping does nothing", "The again block is in GameOver start instead of GameOver loop - listening has to happen over and over."),
   ("The new game starts already over", "The reset lines are missing - Game.lives = 3 and the others must run before set_room('Play')."),
   ("It goes to Play but the speed is still fast", "Game.fallSpeed = 3 is missing from the reset."),
   ("An error about key_was_pressed", "Check the quotes: key_was_pressed(' ') with a space in the quotes, and mouse_was_pressed('left')."),
 ],
 "recap": [
   "[[key_was_pressed]](' ') or a click lets a screen wait for a tap.",
   "Resetting the [[score]], [[lives]] and speed makes the next game fresh.",
   "A [[room]] may call set_room on itself - it survives the switch.",
   "That is the whole game loop: play, lose, play again.",
 ],
 "homework": [
   {"task": "Space or click", "detail": "Play, lose, and try both: press the space bar, and click the mouse. Do both start a new game?", "done": "You can name two ways to trigger the same code."},
   {"task": "Keep the score", "detail": "Delete the Game.score = 0 reset line, play twice, and watch what the score does. Then put it back.", "done": "You can say why the reset lines matter."},
 ],
 "bonus": {"title": "A pause",
           "body": "<p>Just to imagine: the same tap trick could pause the game - a key that flips a Game.paused "
                   "flag the loops check. Hold that thought - the bonus track adds a pause later.</p>"},
 "slides": [
   {"title": "Play again", "sub": "a tap starts a fresh game", "bullets": [
     "Listen with key_was_pressed", "Reset score, lives, speed", "Back to Play"]},
   {"title": "Listen and reset", "bullets": [], "code": [(OVER_LOOP, "again")]},
   {"title": "Checkpoint: play again works", "checkpoint": True,
    "say": "Press Play, lose all your lives, then tap space or click. The game should start over fresh - full lives, score at zero, slow again."},
 ],
},

# --------------------------------------------------------------- week 14 ----
{
 "n": 14,
 "title": "Harder and busier",
 "big_idea": "Make it a real game. Every catch now nudges Game.fallSpeed up, so it gets faster the better you do - with a cap at 9 so it never becomes impossible. Then fill the screen: more Food and more Bomb [[objects|object]].",
 "new_concepts": ["every catch speeds it up", "a cap so it stays possible", "more food and bombs at once"],
 "objectives": [
   "Speed the game up a little on every catch",
   "Cap the speed so it stays possible",
   "Make more food and bombs for a busy screen",
   "Play a fast, full game",
 ],
 "ops": [
  ADD(FOOD_LOOP, "catch", [
    "    Game.fallSpeed = Game.fallSpeed + 0.2",
  ]),
  ADD(FOOD_LOOP, "cap", [
    "if Game.fallSpeed > 9:",
    "    Game.fallSpeed = 9",
  ]),
  ADD(PLAY_START, "makeMore", [
    "Game.foodB = Food()",
    "Game.foodC = Food()",
    "Game.bombB = Bomb()",
  ]),
 ],
 "flow": [
  TALK("0:00", "Too easy",
       "<p>The game works, but it never gets harder and there is only one food and one bomb. Today we "
       "fix both.</p>",
       ask=("A good game gets harder as you play. What could we change on every catch?", "The falling speed")),
  STEP(FOOD_LOOP, "catch", "Speed up on every catch",
       ["Back in <strong>Food loop</strong>, add one line to the catch, inside the if: each catch nudges "
        "<code>Game.fallSpeed</code> up by 0.2. The better you do, the faster it falls."],
       at="0:08",
       ask=("If the speed keeps climbing with no limit, what happens?", "It gets impossible - too fast to catch anything")),
  STEP(FOOD_LOOP, "cap", "Put a lid on the speed",
       ["Under the catch, a cap: only when <code>Game.fallSpeed</code> climbs past 9, hold it at 9. Hard, "
        "but always possible."],
       at="0:20",
       ask=("Why hold it at 9 instead of letting it climb for ever?", "So a great player is challenged, but the game never becomes unplayable")),
  STEP(PLAY_START, "makeMore", "Fill the screen",
       ["Open <strong>Play start</strong> and make more objects: two more foods and a second bomb. Each "
        "needs its own name - <code>Game.foodB</code>, <code>Game.foodC</code>, <code>Game.bombB</code>. Now "
        "there is more to catch and more to dodge at once."],
       at="0:30"),
  TALK("0:40", "A fast, full game",
       "<p>Everyone plays. The screen is busy and the speed climbs the longer you last. It feels like a "
       "real arcade game now.</p>"),
 ],
 "errors": [
   ("It does not speed up", "The + 0.2 line is missing from the catch, or it is not indented under the collision if."),
   ("It gets impossibly fast", "The cap is missing - if Game.fallSpeed > 9 then Game.fallSpeed = 9."),
   ("Only one food and one bomb still", "The makeMore lines are missing from Play start, or they were put in a loop instead of start."),
   ("An error about a name", "Each new object needs its own name: Game.foodB, Game.foodC, Game.bombB - all different."),
 ],
 "recap": [
   "Adding to Game.fallSpeed on every catch makes the game get faster.",
   "A cap holds the speed at 9 so it stays hard but possible.",
   "Every [[object]] you make needs its own name.",
   "More food and bombs make a busy, real game.",
 ],
 "homework": [
   {"task": "Steeper", "detail": "Change the + 0.2 in the catch to + 1 and play. How fast does it get now?", "done": "You can say what the 0.2 controls."},
   {"task": "A crowd", "detail": "Add one more Game.foodD = Food() to Play start and play. Is it more fun or too much?", "done": "You can add another object of a class."},
 ],
 "bonus": {"title": "Even more",
           "body": "<p>Just to try: how many foods and bombs can you add before the game is too busy to play? Each "
                   "one is a single line in Play start with a new name. Find your limit.</p>"},
 "slides": [
   {"title": "Harder and busier", "sub": "speed up, cap, and crowd the screen", "bullets": [
     "Every catch speeds it up", "A cap at 9", "More food and bombs"]},
   {"title": "Speed up on every catch", "bullets": [], "code": [(FOOD_LOOP, "catch")]},
   {"title": "Put a lid on the speed", "bullets": [], "code": [(FOOD_LOOP, "cap")]},
   {"title": "Fill the screen", "bullets": [], "code": [(PLAY_START, "makeMore")]},
   {"title": "Checkpoint: fast and full", "checkpoint": True,
    "say": "Press Play. There should be more food and more bombs, and the longer you catch food the faster everything falls - up to a hard but playable limit."},
 ],
},

# --------------------------------------------------------------- week 15 ----
{
 "n": 15,
 "title": "A title screen",
 "big_idea": "A finished game needs a front door. You build a Start [[room]] with the title MONSTER MUNCH, listen for a tap to go to Play, and - the one time all course long - change Game [[start]] to boot on Start instead of Play.",
 "new_concepts": ["a title screen room", "tap to begin", "the game's one rewrite: boot on Start"],
 "objectives": [
   "Build a Start [[room]] with a big title",
   "Tap to begin - go from Start to Play",
   "Change the game to boot on the Start [[room]]",
   "Play your finished game from the title screen",
 ],
 "ops": [
  ADD(START_START, "title", [
    "Game.title = text()",
    'Game.title.color = "white"',
    "Game.title.fontSize = 44",
    'Game.title.halign = "center"',
    "Game.title.text = 'MONSTER MUNCH - tap to begin'",
  ]),
  ADD(START_LOOP, "begin", [
    "if key_was_pressed(' ') or mouse_was_pressed('left'):",
    "    set_room('Play')",
  ]),
  SET(GAME_START, "setup", [
    "set_room('Start')",
  ]),
 ],
 "flow": [
  TALK("0:00", "A front door",
       "<p>Your game jumps straight into playing. Finished games show a title first - a front door you "
       "tap to begin. Today you build one.</p>",
       ask=("Your game jumps straight into Play. What do finished games show first?", "A title screen")),
  STEP(START_START, "title", "Make the title",
       ["In a new <strong>Start</strong> room's start, a big centered label - the same <code>text()</code> "
        "trick, one more time: white, <code>fontSize = 44</code>, centered, saying MONSTER MUNCH - tap to "
        "begin."],
       at="0:08",
       ask=("This is text() a fourth time. What have you learned to reuse?", "A label: text(), then colour, fontSize, halign, and text")),
  STEP(START_LOOP, "begin", "Tap to begin",
       ["Open <strong>Start loop</strong>. Listen the same way GameOver does: when the player taps space or "
        "clicks, <code>set_room('Play')</code>. A [[room]] may switch itself."],
       at="0:18",
       ask=("Why does this go in Start loop and not Start start?", "Listening for a tap has to happen over and over")),
  STEP(GAME_START, "setup", "Boot on the title",
       ["One change in <strong>Game start</strong>: the old <code>set_room('Play')</code> becomes "
        "<code>set_room('Start')</code>. Back in week 1 there was no Start room to open on - now there is. "
        "This is the only line the whole course ever rewrites."],
       at="0:28"),
  TALK("0:40", "You built a game",
       "<p>Press Play. Your title screen shows, you tap to begin, you play, you lose, you read your score, "
       "you tap again. Fifteen weeks, one line at a time, and it is a whole game. Well done.</p>"),
 ],
 "errors": [
   ("No title shows", "The title block is missing from Start start, or the game still boots on Play - check set_room('Start') in Game start."),
   ("Tapping the title does nothing", "The begin block is in Start start instead of Start loop - listening has to happen over and over."),
   ("The game still opens on Play", "Game start still says set_room('Play'). Change it to set_room('Start')."),
   ("An error about the room name", "Start must be spelled the same in set_room('Start') and as the room's name."),
 ],
 "recap": [
   "A [[room]] can be a title screen, not just where you play.",
   "[[key_was_pressed]] or a click lets a screen wait for a tap.",
   "Game [[start]]'s set_room picks which [[room]] the game opens on.",
   "You changed one line - the whole course's only rewrite - and the game is done.",
 ],
 "homework": [
   {"task": "Your title", "detail": "Change 'MONSTER MUNCH - tap to begin' to your own game's name and press Play.", "done": "You named your game."},
   {"task": "Show a friend", "detail": "Let someone play your whole game, from the title screen to GAME OVER and back.", "done": "Someone else played the game you built."},
 ],
 "bonus": {"title": "Where next",
           "body": "<p>Your game is done, but the bonus track never was - a high score, a power-up, a pause, a "
                   "second level. Every one is the same moves you already know: a new [[object]], a [[flag]], a "
                   "line in a [[loop]]. Pick one and keep going.</p>"},
 "slides": [
   {"title": "A title screen", "sub": "a front door for your game", "bullets": [
     "A Start room with the title", "Tap to begin", "The game boots on Start"]},
   {"title": "Make the title", "bullets": [], "code": [(START_START, "title")]},
   {"title": "Tap to begin", "bullets": [], "code": [(START_LOOP, "begin")]},
   {"title": "Boot on the title", "bullets": [], "code": [(GAME_START, "setup")]},
   {"title": "Checkpoint: the whole game", "checkpoint": True,
    "say": "Press Play. The title screen shows first. Tap to begin, play a full game with food and bombs, lose, read your score, and tap to play again from a fresh start."},
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
    if "= text()" in stripped:
        keys.append("pp:text")
    if re.match(r"Game\.\w+ = (True|False)$", stripped):
        keys.append("pp:flag")
    if "key_was_pressed(" in stripped or "mouse_was_pressed(" in stripped:
        keys.append("pp:press")
    if stripped.startswith("if "):
        keys.append("pp:if")
    return keys


# key -> (kind, title, [bullets], example). kind picks the slide's eyebrow.
CONCEPTS = {
    "pp:start": ("game", "start happens once",
        ["Everything in [[start]] runs one time, right at the beginning.",
         "Use it to set a picture, a place, or a starting number."],
        "self.image = sprite('monster.png')"),
    "pp:loop": ("game", "loop happens over and over",
        ["[[loop]] runs about 60 times every second, for as long as the game is on.",
         "Anything that moves lives in loop."],
        "self.x = mouse_x()"),
    "pp:room": ("game", "A room is one screen",
        ["Your game can have more than one screen. Each one is a [[room]].",
         "set_room picks which screen to show."],
        "set_room('Play')"),
    "pp:sprite": ("art", "A sprite is your picture",
        ["[[sprite]]() finds the picture you drew and puts it on the [[object]].",
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
        ["[[random.randint(a, b)|random]] gives a different number between a and b every time.",
         "It is how the food lands somewhere new on every press of Play."],
        "self.x = random.randint(-300, 300)"),
    "pp:fall": ("game", "Falling is just changing y",
        ["Take a little off y every [[loop]] and the [[object]] slides down the screen.",
         "The bigger the number you take off, the faster it [[falls|fall]]."],
        "self.y = self.y - Game.fallSpeed"),
    "pp:collision": ("game", "get_collision - are they touching?",
        ["[[get_collision(self, 'Monster')|get_collision]] is True only when this [[object]] is touching a Monster.",
         "Put it in an [[if]] to make something happen the moment they touch."],
        "if get_collision(self, 'Monster'):"),
    "pp:change": ("py", "Change a number by adding to it",
        ["Game.score = Game.score + 1 takes the [[score]] and makes it one bigger.",
         "The old value goes in on the right, the new value comes out on the left."],
        "Game.score = Game.score + 1"),
    "pp:if": ("py", "if means only when",
        ["The line under an [[if]] only runs when the if is true.",
         "That line is indented four spaces - that is how Python knows it belongs to the if."],
        "if self.x > 320:"),
    "pp:text": ("game", "text() shows words on the screen",
        ["[[text]]() makes a label. Set its .text to the words you want to show.",
         "Add str() when the words include a number, so 3 becomes the writing '3'."],
        "Game.label = text()"),
    "pp:flag": ("py", "A flag the game remembers",
        ["A [[flag]] is a True/False the game keeps, like Game.dead.",
         "One part of the game sets it, and another part checks it and acts."],
        "Game.dead = False"),
    "pp:press": ("py", "Waiting for a tap",
        ["[[key_was_pressed(' ')|key_was_pressed]] is true the moment the space bar goes down; mouse_was_pressed('left') the moment you click.",
         "Put it in an [[if]] to wait on a screen until the player taps to go on."],
        "if key_was_pressed(' ') or mouse_was_pressed('left'):"),
}

# The words a child has to learn to read this game. Prose across every page
# marks a term the FIRST time it is used in its real coding sense - written
# [[loop]], or [[falls|fall]] when the sentence bends the word - and the build
# turns that first use into a link to the entry here, and any later use on the
# same page into the same blue-bold, no link. A plain English "start typing" or
# "the room is dark" is never marked, so it never lights up. Every slug a mark
# names must exist here or the build refuses to ship. Keep a definition to one
# sentence, second person, true of what the child actually did.
GLOSSARY = {
    "start":   "The part of an object that runs once, the moment the object is made - you use it to set a picture or a starting spot.",
    "loop":    "The part of an object that runs over and over, about sixty times a second, for as long as the game is on. Anything that moves lives here.",
    "room":    "One screen of your game. A game can have more than one room, and set_room picks which one you see.",
    "object":  "A thing in your game you can see and give orders to - the monster, a piece of food, a bomb.",
    "class":   "A KIND of thing. Food is a class, and every single piece of food is made from it.",
    "sprite":  "The picture you drew, put onto an object. The name has to match exactly, including the .png.",
    "mouse_x": "Where your mouse is, left to right. Put it in loop and your object keeps up with your hand.",
    "if":      "Runs the line under it only when something is true. That line is pushed in four spaces so Python knows it belongs to the if.",
    "random":  "A surprise number. random.randint(a, b) gives a different number between a and b every time, so the food lands somewhere new on every Play.",
    "fall":    "Taking a little off y every loop so an object slides down the screen. The more you take off, the faster it falls.",
    "recycle": "Sending an object back up to the top after it drops off the bottom, so it can fall again for ever.",
    "get_collision": "Asks whether two objects are touching. It is true only at the moment they touch - put it in an if to catch that moment.",
    "score":   "The number that counts what you have caught. You make it bigger by adding one to it.",
    "lives":   "How many hearts you have left. When they run out, the game is over.",
    "text":    "A label that shows words or numbers on the screen. You make one with text() and set its .text to what it should say.",
    "flag":    "A True/False the game remembers, like Game.dead. One part of the game sets it and another part checks it.",
    "key_was_pressed": "True for the one moment a key goes down - key_was_pressed(' ') for the space bar. mouse_was_pressed('left') does the same for a click, so a screen can wait for a tap.",
}

# Animated metaphors. Reuses build.concept_visual's library - see SLIDE-RULES.
VISUALS = {
    "pp:start": {"kind": "machine", "in": "game opens", "label": "start", "out": "done once",
                 "cap": "[[start]] runs one time, then never again."},
    "pp:loop": {"kind": "loop", "items": ["1", "2", "3", "4"],
                "cap": "[[loop]] runs again and again, about 60 times a second."},
    "pp:room": {"kind": "swap", "off": "Play room", "on": "another room",
                "cap": "A [[room]] is one screen. set_room swaps which one you see."},
    "pp:sprite": {"kind": "swap", "off": "nothing", "on": "your art",
                  "cap": "[[sprite]]() puts the picture you drew onto the [[object]]."},
    "pp:y": {"kind": "resize", "axis": "h",
             "cap": "y is up and down. Minus numbers go DOWN."},
    "pp:mouse": {"kind": "motion",
                 "cap": "[[mouse_x()|mouse_x]] follows your mouse, left and right."},
    "pp:make": {"kind": "dom", "parent": "Play room", "child": "a Monster", "mode": "add",
                "cap": "Monster() makes one and puts it in the [[room]]."},
    "pp:random": {"kind": "pick", "items": ["-300", "-100", "0", "100", "300"], "at": 3, "label": "?",
                  "cap": "[[random.randint|random]] lands on a different number every time."},
    # pp:fall has no visual on purpose: the only "moving" metaphor is horizontal,
    # and a sideways picture for falling would teach the wrong thing. The text
    # bullets carry it.
    "pp:collision": {"kind": "fork", "cond": "touching?", "yes": "score!", "no": "keep falling",
                     "cap": "[[get_collision]] asks a yes/no question: are they touching?"},
    "pp:change": {"kind": "machine", "in": "3", "label": "+ 1", "out": "4",
                  "cap": "Take the number in, add one, the new number comes out."},
    "pp:if": {"kind": "fork", "cond": "self.x > 320", "yes": "put it back", "no": "carry on",
              "cap": "[[if]] means only when - the indented line runs only if it is true."},
    "pp:text": {"kind": "swap", "off": "(nothing)", "on": "Score: 0",
                "cap": "[[text]]() puts words on the screen; .text is what they say."},
    "pp:flag": {"kind": "swap", "off": "Game.dead = False", "on": "Game.dead = True",
                "cap": "A [[flag]] is a True/False the game remembers and checks."},
    "pp:press": {"kind": "event", "btn": "tap", "action": "set_room('Play')",
                 "cap": "[[key_was_pressed|key_was_pressed]] or a click lets a screen wait for a tap."},
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
        "...and speed the whole game up a little - every catch makes it harder.",
    ],
    # --- weeks 6-15 -------------------------------------------------------
    (PLAY_START, "hud"): [
        "Make a label - a bit of writing on the screen.",
        "White, so it shows up on the dark background.",
        "Put it near the top. Big y is up.",
        "What it says before you have caught anything.",
    ],
    (PLAY_LOOP, "label"): [
        "Every loop, rewrite the label with the score and lives right now. str() turns each number into writing.",
    ],
    (BOMB_START, "look"): [
        "Bomb start is its own panel, so it needs its own import.",
        "Use the bomb picture you drew.",
    ],
    (BOMB_START, "place"): [
        "A random spot across the screen, the same as the food.",
        "Higher than the food starts, so the first bomb gives you a moment.",
    ],
    (PLAY_START, "makeBomb"): ["Make one bomb and drop it in the room, just like a Food."],
    (BOMB_LOOP, "fall"): [
        "Bomb loop is its own panel too - its own import.",
        "The same falling line the food uses. Bombs share the one speed.",
    ],
    (BOMB_LOOP, "recycle"): [
        "Only when the bomb has dropped off the bottom...",
        "...pick a new spot across the screen...",
        "...back up high, ready to fall again.",
    ],
    (GAME_START, "flag"): ["A flag: not dead yet. Nothing has ended the game."],
    # hit is written across two weeks: week 9 types the first three lines, week
    # 10 the last two. One notes list covers both - week 9 uses the first three,
    # week 10 the last two, because a note lines up with the line it explains.
    (BOMB_LOOP, "hit"): [
        "Only when this bomb is touching the monster...",
        "...take one life away...",
        "...and drop the bomb below the floor, so the recycle lifts it back up.",
        "Only when that was the last life...",
        "...raise the dead flag. Game loop is watching for it.",
    ],
    (GAME_LOOP, "over"): [
        "Every loop, Game checks the flag. Only when it is True...",
        "...lower it again, ready for next time...",
        "...switch to the GameOver screen. Game does it, because it lives through the room change.",
    ],
    (OVER_START, "message"): [
        "A label for the GameOver screen.",
        "White, so it shows on the dark room.",
        "Big writing - this is the main message.",
        "Line it up in the middle of the screen.",
        "The words to show. The tap part starts working in two weeks.",
    ],
    (OVER_START, "score"): [
        "A second label, for the score you got.",
        "White again.",
        "A little smaller than the GAME OVER line.",
        "Middle of the screen, left to right.",
        "A bit below the middle, under the message.",
        "The words plus your score. str() turns the number into writing.",
    ],
    (OVER_LOOP, "again"): [
        "Only when the player taps space or clicks the mouse...",
        "...set the score back to zero...",
        "...give back all three lives...",
        "...slow it back to the start speed...",
        "...and go to Play for a fresh game. A room is allowed to switch itself.",
    ],
    (FOOD_LOOP, "cap"): [
        "Only when the speed has climbed past 9...",
        "...hold it at 9, so it gets hard but never impossible.",
    ],
    (PLAY_START, "makeMore"): [
        "A second piece of food.",
        "A third.",
        "And a second bomb. Now the screen is busy.",
    ],
    (START_START, "title"): [
        "A label for the title screen.",
        "White writing.",
        "Big - it is the name of your game.",
        "Middle of the screen.",
        "The name, and how to start.",
    ],
    (START_LOOP, "begin"): [
        "Only when the player taps...",
        "...start the game by going to the Play room.",
    ],
    # Week 15 rewrites setup, so its changed line needs its own note - the week-1
    # note ("start on Play") would be wrong here. notes_for reads the (week, ...)
    # key first, so week 1 keeps its note and week 15 gets this one.
    (15, GAME_START, "setup"): ["Now start on the Start screen - your title - instead of Play."],
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
    (6, PLAY_LOOP, "label"): [
        {"q": "What does text() make?",
         "options": ["A label - words on the screen", "A new room",
                     "A falling food", "A random number"], "answer": 0,
         "why": "text() makes a label; its .text is the words it shows."},
        {"q": "Why do we put str() around Game.score?",
         "options": ["To turn the number into writing we can show", "To make it bigger",
                     "To make it random", "To hide it"], "answer": 0,
         "why": "The label holds writing, so str() turns the number 3 into the writing '3'."},
        {"q": "Why is the label line in Play loop, not Play start? (this week)",
         "options": ["So it updates every loop as the score changes", "To make it appear once",
                     "loop is tidier", "It does not matter"], "answer": 0,
         "why": "The score keeps changing, so the label has to be rewritten over and over in loop."},
    ],
    (7, PLAY_START, "makeBomb"): [
        {"q": "Bomb is our third what?",
         "options": ["Class - a kind of thing", "Room", "Score", "Colour"], "answer": 0,
         "why": "A class is a kind of thing. Monster, Food, and now Bomb."},
        {"q": "What does Game.bomb = Bomb() do?",
         "options": ["Makes one bomb and puts it in the room", "Draws the bomb picture",
                     "Ends the game", "Adds to the score"], "answer": 0,
         "why": "Bomb() makes one bomb; nothing appears until you make it."},
        {"q": "Where does the falling code for the bomb go next week?",
         "options": ["Bomb loop", "Bomb start", "Play start", "Game start"], "answer": 0,
         "why": "Anything that moves lives in loop, so the bomb falls from Bomb loop."},
    ],
    (8, BOMB_LOOP, "recycle"): [
        {"q": "How does the bomb fall?",
         "options": ["Take Game.fallSpeed off its y every loop", "Add to its y every loop",
                     "Change its picture", "Press Play twice"], "answer": 0,
         "why": "Falling is taking a little off y each loop - the same line the food uses."},
        {"q": "Why does the bomb need its own recycle?",
         "options": ["So it comes back after it drops off the bottom", "To make it bigger",
                     "To end the game", "To change its colour"], "answer": 0,
         "why": "Recycle sends it back up high so it can fall again for ever."},
        {"q": "Do the bomb and food share Game.fallSpeed? (this week)",
         "options": ["Yes - it is one number the whole game shares", "No, each has its own",
                     "Only the food falls", "Only the bomb falls"], "answer": 0,
         "why": "fallSpeed lives on Game, so every falling thing uses the same speed."},
    ],
    (9, BOMB_LOOP, "hit"): [
        {"q": "What happens when a bomb touches the monster?",
         "options": ["You lose a life", "You score a point",
                     "The game speeds up", "Nothing"], "answer": 0,
         "why": "get_collision catches the touch, and Game.lives goes down by one."},
        {"q": "What is Game.dead?",
         "options": ["A flag - a True/False the game remembers", "A room",
                     "A picture", "The score"], "answer": 0,
         "why": "A flag is a True/False. Game.dead starts False and turns True on the last life."},
        {"q": "Why send the hit bomb to -300 too? (this week)",
         "options": ["So its recycle lifts it back to the top", "To delete it",
                     "To end the game", "To score a point"], "answer": 0,
         "why": "Just like the food, -300 is below the floor so the recycle sends it back up."},
    ],
    (10, GAME_LOOP, "over"): [
        {"q": "Why does Game loop do the room switch, not the bomb?",
         "options": ["Game lives through a room change; the bomb is destroyed by it",
                     "Game is faster", "The bomb cannot use set_room", "It looks nicer"], "answer": 0,
         "why": "Switching rooms destroys the bomb mid-step, so Game, which survives, does it."},
        {"q": "How does Game loop know the game is over?",
         "options": ["It checks the Game.dead flag", "It counts the score",
                     "It looks at the mouse", "It asks the food"], "answer": 0,
         "why": "The bomb raises the flag; Game loop watches it and acts when it is True."},
        {"q": "What is a flag good for? (this week)",
         "options": ["One part of the game tells another part something happened",
                     "Making things fall", "Drawing pictures", "Keeping score"], "answer": 0,
         "why": "The bomb sets it and Game loop checks it - a flag passes a message between them."},
    ],
    (11, OVER_START, "message"): [
        {"q": "What is GameOver?",
         "options": ["Another room - a second screen", "A kind of thing",
                     "A number", "A picture"], "answer": 0,
         "why": "GameOver is a room, a whole screen the game switches to when you lose."},
        {"q": "What does halign = \"center\" do?",
         "options": ["Lines the words up in the middle", "Makes them white",
                     "Makes them bigger", "Makes them fall"], "answer": 0,
         "why": "halign is how the writing lines up left-to-right; center puts it in the middle."},
        {"q": "The tap-to-play-again words show now, but tapping does nothing yet. Why? (this week)",
         "options": ["We write the code that listens for the tap in two weeks", "It is broken",
                     "You tapped wrong", "The room is asleep"], "answer": 0,
         "why": "The message is just writing for now; the loop that listens comes in week 13."},
    ],
    (12, OVER_START, "score"): [
        {"q": "How do we show the score you got inside the words?",
         "options": ["str(Game.score) turns the number into writing", "get_collision",
                     "random.randint", "set_room"], "answer": 0,
         "why": "str() makes the number into writing so it can join the rest of the sentence."},
        {"q": "Why is Game.finalScore.y set to -60?",
         "options": ["To put it a little below the middle, under the message", "To hide it",
                     "To make it fall", "To make it white"], "answer": 0,
         "why": "y is up and down; -60 is just below the centre, under the GAME OVER line."},
        {"q": "Does GameOver.start run again every time you lose? (this week)",
         "options": ["Yes - start runs each time the room is shown", "No, only once ever",
                     "Only on the first game", "Never"], "answer": 0,
         "why": "A room's start runs each time you enter it, so the final score is fresh every game."},
    ],
    (13, OVER_LOOP, "again"): [
        {"q": "What does key_was_pressed(' ') check?",
         "options": ["Whether the space bar was just pressed", "The score",
                     "Where the mouse is", "If a bomb hit"], "answer": 0,
         "why": "It is true for the one moment the space bar goes down."},
        {"q": "Why set the score, lives, and fallSpeed back before Play?",
         "options": ["So the next game starts fresh, not where the last one ended",
                     "To end the game", "To make it harder", "To draw the bomb"], "answer": 0,
         "why": "Without resetting, you would start the new game with 0 lives and full speed."},
        {"q": "GameOver loop is allowed to call set_room on itself. Why is that safe? (this week)",
         "options": ["A room is not destroyed by a room change the way an object is",
                     "Rooms are faster", "It is not really safe", "set_room only works in rooms"], "answer": 0,
         "why": "A room survives the switch, unlike the bomb - that is why week 10 used a flag instead."},
    ],
    (14, FOOD_LOOP, "cap"): [
        {"q": "What makes the game speed up as you play?",
         "options": ["Each catch adds a little to Game.fallSpeed", "The clock",
                     "Pressing Play", "The mouse"], "answer": 0,
         "why": "The catch now adds 0.2 to fallSpeed, so every catch makes the food fall faster."},
        {"q": "What does the cap do?",
         "options": ["Stops the speed climbing past 9", "Speeds it up more",
                     "Adds a life", "Makes a new food"], "answer": 0,
         "why": "Only when fallSpeed goes over 9, it is held at 9 - hard but not impossible."},
        {"q": "Why make more food and bombs this week? (this week)",
         "options": ["A busier screen makes the game more fun and harder", "To slow it down",
                     "To end the game", "To show the score"], "answer": 0,
         "why": "More Food() and Bomb() objects means more to catch and more to dodge at once."},
    ],
    (15, START_LOOP, "begin"): [
        {"q": "What is the Start room for?",
         "options": ["A title screen you tap to begin", "Keeping score",
                     "Making the bomb fall", "Ending the game"], "answer": 0,
         "why": "Start is the first screen the player sees, with the title and 'tap to begin'."},
        {"q": "Week 15 changes set_room('Play') to set_room('Start'). Why?",
         "options": ["So the game boots on the new title screen", "To make it faster",
                     "To add a life", "To delete Play"], "answer": 0,
         "why": "Game start's set_room picks the boot room; now the game opens on the title."},
        {"q": "This is the whole course's ONE rewrite. Why is it allowed? (this week)",
         "options": ["It teaches a real lesson about rooms, it is not just churn",
                     "Rewrites are always fine", "It saves typing", "It was a mistake"], "answer": 0,
         "why": "A rewrite that carries a real lesson earns its place; week 1 had no Start room to boot into yet."},
    ],
}

EXPANDED_WEEKS = set(range(1, 16))
