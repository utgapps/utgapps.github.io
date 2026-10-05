"""PY301 - Fruit Slasher. The whole course as one data structure.

This is the only file to edit. ../pxp101/build.py replays WEEKS to produce the
playable milestones, the teacher curriculum, the textbook, the homework book
and the slides, so none of them can drift apart. Run `python build.py` here.

WHERE THIS COMES FROM

The UTG PY301 guide: a mobile-style slicing game in PixelPad. Fruit leaps up
from the bottom of the screen and falls back under gravity; you hold the mouse
button and swipe to slice it, leaving a trail behind. Every fruit is a point,
a bomb takes them all away, and the clock gives you one minute. The game, its
classes and its order are the guide's; the guide's extra-time tasks are the
bonuses.

WHAT CHANGED FROM THE GUIDE, AND WHY

  * The guide builds everything in Game start and moves it into a Play room
    with copy, paste and delete on day 13. Here Play exists from week 1, so
    nothing is typed twice, and Game only ever holds what other classes must
    reach: the score and the clock.
  * The guide makes a fruit with Fruit().x, turns things with angle += 90,
    prints Hello, then deletes all of it; prints the fruit's y and the
    spawner's timer and later comments them out; and hides the spawner at
    y = 600 before using visible. Here each is a question asked in the talk,
    not code typed and then taken out.
  * The guide's score goes to the console with print until day 11 brings the
    on-screen text, and the print is then deleted. Here the score is on the
    screen from the week the slicer arrives, so nothing is typed to be deleted.
  * The guide stores the fruit's kind in tag on day 6 and changes every tag
    to self.tag on day 7, when the slicer cannot see it. Here it is self.tag
    from the start, and why it needs self. is a question in week 6.
  * The guide's spawner says 100 on day 3 and changes it to self.spawnTime
    on day 14. Here self.spawnTime is there from week 3, so week 14 only adds
    the lines that change it.
  * The guide moves the clock from self.timeLeft to game.timeLeft on day 15
    because the slicer cannot reach it. Here it is game.timeLeft from the
    week it arrives.
  * The guide writes four splash classes that differ only in their picture.
    Here one Splash class picks its sprite sheet from the fruit's tag - the
    string joining of week 6 again - and the slicer leaves the tag in
    game.splashTag before it makes the splash, because start runs the moment
    Splash() is called. That timing is week 13's lesson.
  * The guide's sprites are scaled down by 0.8 and 0.5. Here every picture is
    drawn at the size it is used, so the code carries no scale.
  * The guide's bugs are not copied: x moved by velocityY, randomint, a
    trail that shrinks past nothing into a flipped picture, and a bonus that
    adds no time when there is room for all of it. The bonus clamp is the
    simpler form: add the bonus, then cut it back to the most allowed.
  * The guide's loop counter is i. Here it is step, because a name should
    say what it holds.
  * The guide's day 9 is a review: rebuild the game from nothing with silly
    new art. That stays as week 8's bonus and the teacher notes; week 9 is
    the clock, which the guide teaches later, so the game has an end sooner.
"""

import re

import pixelpad

COURSE_CODE = "PY301"
TOOL = "py301"
AUDIENCE = "eleven-to-fourteen-year-olds"

# The guide's busiest day types about twenty lines. A week may not add more.
WEEK_LINE_CAP = 20
# One step shows at most this many lines before it stops to explain.
MAX_STEP_LINES = 6
# Indentation and one-line ifs - see pixelpad.check_python_rules.
check_code_rules = pixelpad.check_python_rules

DRAW_SIZE_NOTE = ("Draw it at this size. A sprite sheet is its frames side by side in a grid: "
                  "the splashes are 2 rows of 4 frames, each 150 by 150, and the explosion is "
                  "2 rows of 3.")

CODE_HEADS = {"get_collision": "get_collision()", "mouse_x": "mouse_x()",
              "mouse_y": "mouse_y()", "mouse_is_pressed": "mouse_is_pressed()",
              "mouse_was_pressed": "mouse_was_pressed()", "destroy": "destroy()",
              "set_room": "set_room()", "str": "str()", "int": "int()", "text": "text()",
              "randint": "random.randint()", "play_sound": "play_sound()",
              "sound": "sound()", "range": "range()", "animation": "animation()",
              "animation_set": "animation_set()", "set_camera": "set_camera()"}

COURSE_TITLE = "PY301 · Fruit Slasher"
COURSE_BLURB = (
    "Fifteen weeks building a slicing game in Python. Fruit leaps up and falls under "
    "gravity; swipe with the mouse to slice it, and never touch a bomb. You write every "
    "line."
)
PROJECT_BLURB = (
    "A one-minute fruit slicer. Fruit of five kinds leaps from the bottom of the screen; "
    "hold the mouse button and swipe to slice it into a splash. Every fruit is a point, a "
    "bomb explodes, shakes the screen and takes them all, and a treasure chest buys you "
    "five more seconds."
)

TOTAL_WEEKS = 15

# The finished game is about 125 lines. This is the ceiling, not a target.
LINE_BUDGET = 160
BONUS_BUDGET = 60

DISCLAIMER = """
<p><strong>Nothing here needs the internet except the code editor itself.</strong> The
game runs entirely in the browser - there is no server, no account and no API key anywhere
in this course.</p>
<p><strong>The students draw the art.</strong> Every sprite is listed with the exact size
to draw it. The generated games use plain coloured rectangles as stand-ins so the code can
be tested; they are meant to be replaced. The splashes and the explosion are sprite sheets
- several frames in one picture - and week 12 explains how to draw one. Week 11 also uses a
sound called <code>woosh.mp3</code>; until a student uploads one, the editor plays a short
beep in its place.</p>
<p><strong>This game is played with the mouse.</strong> Click into the game before you
slice. On a laptop's touchpad, hold the button down and drag.</p>
"""

TEACHER_PREAMBLE = """
<p><strong>Ask before you tell.</strong> The guide this course comes from is built on
questions - which class does this belong to, start or loop, what will happen if - and every
hour here keeps at least three of them. Let a student answer before the slide does.</p>
<p><strong>Send them to the documentation.</strong> The guide's habit is worth keeping:
before a slide shows mouse_x(), get_collision(), text() or set_camera(), give the class
two minutes to find it in the PixelPad documentation themselves. The slide is the answer
they check against.</p>
<p><strong>Let the bugs happen.</strong> Several steps are typed so that something goes
wrong on purpose: the fruit flies off and never comes back, the bomb resets the score to 1
instead of 0, a fast swipe leaves a dotted line. The book says what they should see. Ask
why before you fix it - that conversation is the lesson.</p>
<p><strong>The review day.</strong> The guide spends a day rebuilding the game from nothing
with silly new art. It is week 8's bonus here; if your class is ahead, give it a whole
hour - rebuilding without looking is the best test of what they know.</p>
<p><strong>Pacing.</strong> A week that runs long drops its bonus, never its Play moments.
Weeks 6, 9 and 10 are the busiest; give them the whole hour. Weeks 2 and 7 are light on
purpose - use the spare time to draw the fruit and let everyone catch up.</p>
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
GAME_START = "Game start"
FRUIT_START, FRUIT_LOOP = "Fruit start", "Fruit loop"
BACK_START = "Background start"
SPAWNER_START, SPAWNER_LOOP = "Spawner start", "Spawner loop"
SLICER_START, SLICER_LOOP = "Slicer start", "Slicer loop"
TRAIL_START, TRAIL_LOOP = "Trail start", "Trail loop"
EXPLOSION_START, EXPLOSION_LOOP = "Explosion start", "Explosion loop"
SPLASH_START, SPLASH_LOOP = "Splash start", "Splash loop"
PLAY_START, PLAY_LOOP = "Play start", "Play loop"
END_START, END_LOOP = "End start", "End loop"

PANELS = [GAME_START,
          FRUIT_START, FRUIT_LOOP,
          BACK_START,
          SPAWNER_START, SPAWNER_LOOP,
          SLICER_START, SLICER_LOOP,
          TRAIL_START, TRAIL_LOOP,
          EXPLOSION_START, EXPLOSION_LOOP,
          SPLASH_START, SPLASH_LOOP,
          PLAY_START, PLAY_LOOP,
          END_START, END_LOOP]

# Play is there from week 1; End arrives with the clock in week 9.
ROOMS = ["Play", "End"]

ORDER = {
    GAME_START: ["setup"],
    # import goes at the very top of the code that uses it, and the picture
    # comes after the random kind that picks it.
    FRUIT_START: ["import", "look", "launch", "place"],
    FRUIT_LOOP: ["fly", "drift", "gone"],
    BACK_START: ["look"],
    SPAWNER_START: ["setup"],
    SPAWNER_LOOP: ["spawn", "rate"],
    SLICER_START: ["look", "sound"],
    # Where the mouse WAS has to be kept before the slicer moves to where it IS.
    SLICER_LOOP: ["previous", "follow", "moved", "woosh", "trail", "slice"],
    TRAIL_START: ["look", "timer"],
    TRAIL_LOOP: ["fade", "shrink"],
    EXPLOSION_START: ["look", "timer"],
    EXPLOSION_LOOP: ["import", "shake", "fade"],
    SPLASH_START: ["look", "timer"],
    SPLASH_LOOP: ["fade"],
    # The background is made first so it is drawn first, at the back.
    PLAY_START: ["back", "maker", "slicer", "score", "clock", "bonus"],
    PLAY_LOOP: ["score", "clock", "over"],
    END_START: ["screen", "hint"],
    END_LOOP: ["restart"],
}

# name -> (stand-in colour, width, height) as the student draws it. A sprite
# sheet is the whole grid: 2 rows of 4 frames of 150 x 150 is 600 x 300.
SPRITES = {
    "orange.png": ("orange", 100, 100),
    "mountains.png": ("blue", 1280, 720),
    "watermelon.png": ("dgreen", 130, 100),
    "eggplant.png": ("purple", 80, 120),
    "pear.png": ("yellow", 90, 120),
    "bomb.png": ("dark", 90, 90),
    "slicer.png": ("white", 30, 30),
    "explosion.png": ("red", 450, 300),
    "orangeSplash.png": ("orange", 600, 300),
    "watermelonSplash.png": ("red", 600, 300),
    "eggplantSplash.png": ("purple", 600, 300),
    "pearSplash.png": ("yellow", 600, 300),
    "treasure.png": ("brown", 110, 90),
    "treasureSplash.png": ("cyan", 600, 300),
}


WEEKS = [

# ---------------------------------------------------------------- week 1 ----
{
 "n": 1,
 "title": "A fruit in a room",
 "big_idea": "Every game is built from objects. Today you make two [[classes|class]] - a fruit and a background - and put one of each in a [[room]] called Play.",
 "new_concepts": ["class", "object", "sprite", "room"],
 "draw": ["orange.png", "mountains.png"],
 "objectives": [
   "Say what a [[class]] is, and what an [[object]] made from it is",
   "Give a class its picture with [[sprite]]()",
   "Make objects in a [[room]], and go to it from Game",
   "Say why the background is made first",
 ],
 "ops": [
  ADD(FRUIT_START, "look", [
    "self.image = sprite('orange.png')",
  ]),
  ADD(PLAY_START, "maker", [
    "Fruit()",
  ]),
  ADD(GAME_START, "setup", [
    "set_room('Play')",
  ]),
  ADD(BACK_START, "look", [
    "self.image = sprite('mountains.png')",
  ]),
  ADD(PLAY_START, "back", [
    "self.background = Background()",
  ]),
 ],
 "flow": [
  TALK("0:00", "Play the game you are going to build",
       "<p>Open the week 15 page and play the finished fruit slasher on the board for two "
       "minutes. Hold the mouse button and swipe. Slice a bomb on purpose.</p>",
       "<p>Say the promise: <em>every line of that game, you are going to write.</em></p>",
       ask=("What different kinds of thing can you see?",
            "Fruit, a bomb, the slicer and its trail, splashes, the background - each kind is a class")),
  TALK("0:07", "Classes and objects",
       "<p>A [[class]] is a blueprint - a recipe for a kind of thing. An [[object]] is one "
       "thing built from it. Fruit is the class; every orange flying across the screen is "
       "a Fruit object.</p>",
       "<p>In the editor, make the classes <strong>Fruit</strong> and "
       "<strong>Background</strong>, and a room called <strong>Play</strong>. Capitals "
       "matter.</p>",
       ask=("A bomb flies just like a fruit. Should it be a class of its own?",
            "Hold the thought - in week 6 you find out why it is a Fruit with a different picture")),
  TALK("0:12", "Draw two things",
       "<p>Make <code>orange.png</code> at 100 by 100 and <code>mountains.png</code> at 1280 "
       "by 720 - the whole screen. Ten minutes at most: the art can be improved any week.</p>"),
  STEP(FRUIT_START, "look", "Give the fruit a picture",
       ["[[start]] runs ONCE, the moment a Fruit is made. <code>sprite('orange.png')</code> "
        "finds the picture you drew and makes it this fruit's image."],
       at="0:22"),
  STEP(PLAY_START, "maker", "Make a fruit in Play",
       ["In the Play room's start: <code>Fruit()</code> builds one fruit from the blueprint. "
        "Nothing is put in front of it, because nothing needs to talk to it again."],
       at="0:25"),
  STEP(GAME_START, "setup", "Go to Play",
       ["The Game class runs first, when you press Play. <code>set_room</code> changes to "
        "the Play [[room]], which builds the fruit. Press Play."],
       at="0:28",
       ask=("Where is the fruit?",
            "In the middle - an object starts at x 0, y 0, the middle of the screen")),
  STEP(BACK_START, "look", "Give the background a picture",
       ["The background gets its picture the same way."],
       at="0:33"),
  STEP(PLAY_START, "back", "The background, made first",
       ["At the VERY TOP of Play start, above the fruit: make the background. "
        "<code>self.background</code> is the name the room keeps it under."],
       at="0:35",
       ask=("Why at the top, and not under Fruit()?",
            "Objects are drawn in the order they are made - made first is drawn at the back")),
 ],
 "errors": [
   ("NameError: name 'Fruit' is not defined", "The class must be called Fruit exactly - capital F."),
   ("A grey box instead of your picture", "The picture's name and the name in sprite('...') must match exactly, capitals and .png included."),
   ("A black screen", "set_room('Play') goes in Game start, and the room must be called Play exactly."),
   ("The fruit is hidden", "self.background = Background() goes ABOVE Fruit(), so the background is drawn first."),
 ],
 "recap": [
   "A [[class]] is a blueprint; an [[object]] is one thing built from it.",
   "[[start]] runs once, the moment an object is made.",
   "A [[room]] builds what is in it; set_room picks the room.",
   "Made first is drawn at the back.",
 ],
 "homework": [
   {"task": "Make the orange yours", "detail": "Redraw orange.png so it looks juicy. Keep it 100 by 100.", "done": "You press Play and your own orange is in the middle."},
   {"task": "Draw order", "detail": "Without pressing Play: if Fruit() were above the background in Play start, what would you see?", "done": "Only the mountains - the background is drawn on top of the fruit."},
 ],
 "bonus": {"title": "A second fruit",
           "body": "<p>Type <code>Fruit()</code> a second time in Play start. How many fruit "
                   "can you see? Why? (Take it out again afterwards.)</p>"},
 "slides": [
   {"title": "Classes and objects", "sub": "Blueprint and thing", "bullets": [
     "Fruit is the class", "Every orange is a Fruit object", "Capitals matter"]},
   {"title": "Draw two things", "sub": "orange.png 100 x 100 - mountains.png 1280 x 720", "bullets": [
     "The mountains fill the screen", "Ten minutes at most"]},
   {"title": "Give the fruit a picture", "bullets": [], "code": [(FRUIT_START, "look")]},
   {"title": "Make a fruit in Play", "bullets": [], "code": [(PLAY_START, "maker")]},
   {"title": "Go to Play", "bullets": [], "code": [(GAME_START, "setup")]},
   {"title": "Checkpoint: an orange", "checkpoint": True,
    "say": "Press Play. Your orange sits in the middle of a black screen."},
   {"title": "Give the background a picture", "bullets": [], "code": [(BACK_START, "look")]},
   {"title": "The background, made first", "bullets": [], "code": [(PLAY_START, "back")]},
   {"title": "Checkpoint: a scene", "checkpoint": True,
    "say": "Press Play. The mountains fill the screen with your orange in front."},
 ],
},

# ---------------------------------------------------------------- week 2 ----
{
 "n": 2,
 "title": "Up, then down",
 "big_idea": "A fruit leaps because it has a [[velocity]] - how far it moves every loop - and it falls because [[gravity]] takes a little of that velocity away, every loop.",
 "new_concepts": ["loop", "variable", "+= and -=", "velocity and gravity"],
 "draw": [],
 "objectives": [
   "Say the difference between [[start]] and [[loop]]",
   "Keep a number in a [[variable]] with self.",
   "Change a value using itself with += and -=",
   "Explain why a velocity that shrinks makes a curve",
 ],
 "ops": [
  ADD(FRUIT_START, "launch", [
    "self.y = -400",
    "self.velocityY = 30",
  ]),
  ADD(FRUIT_LOOP, "fly", [
    "self.y += self.velocityY",
    "self.velocityY -= 1",
  ]),
 ],
 "flow": [
  TALK("0:00", "Start and loop",
       "<p>Every class has two tabs. [[start]] runs once, when the object is made. "
       "[[loop]] runs about sixty times every second, until the object is gone.</p>",
       ask=("If you put angle += 90 in start, what happens? And in loop?",
            "In start it turns once and stops; in loop it spins round and round")),
  STEP(FRUIT_START, "launch", "Start below the screen",
       ["Under the picture: start 400 below the middle - off the bottom of the screen - and "
        "keep a [[variable]] called velocityY: how far up to move every loop."],
       at="0:06"),
  TALK("0:09", "A shortcut: +=",
       "<p><code>self.y += self.velocityY</code> means: my y becomes my y plus my velocity. "
       "<code>-=</code> takes away the same way.</p>"),
  STEP(FRUIT_LOOP, "fly", "Fly, and slow down",
       ["Every loop, move up by the velocity - and then take one off the velocity. "
        "30, 29, 28... until it is below 0, and the fruit comes back down."],
       at="0:12",
       ask=("Without the second line, what would the fruit do?",
            "Fly straight up at 30 every loop and never come back")),
  TALK("0:20", "Why a curve?",
       "<p>Draw the numbers on the board: velocity 30 moves it 30, then 29, then 28. Near "
       "the top it moves 2, 1, 0 - it hangs there - and then -1, -2: it falls faster and "
       "faster. That is [[gravity]].</p>",
       ask=("Make velocityY 40. Does the fruit go higher or lower?",
            "Higher - more speed takes longer to use up")),
 ],
 "errors": [
   ("AttributeError: 'Fruit' has no attribute 'velocityY'", "self.velocityY = 30 goes in Fruit START, spelled exactly the same."),
   ("The fruit never moves", "The two lines with += and -= go in Fruit LOOP, not start."),
   ("It falls straight away", "The velocity starts at a plus number - 30 - and += adds it to y."),
   ("It flies off the top for ever", "self.velocityY -= 1 is the second line of Fruit loop."),
 ],
 "recap": [
   "[[start]] runs once; [[loop]] runs sixty times a second.",
   "A [[variable]] with self. belongs to the object, so start and loop share it.",
   "+= adds to a value; -= takes away.",
   "[[velocity|velocity]] that shrinks every loop is [[gravity]].",
 ],
 "homework": [
   {"task": "Count the climb", "detail": "velocityY starts at 3 and goes down by 1 every loop. How far up does the fruit go before it starts to fall?", "done": "3 + 2 + 1 = 6."},
   {"task": "Moon gravity", "detail": "What would you change so the fruit floats like it is on the moon?", "done": "Take off less each loop, like self.velocityY -= 0.5."},
 ],
 "bonus": {"title": "From the side",
           "body": "<p>Give the fruit a <code>self.velocityX</code> too, and add it to "
                   "<code>self.x</code> every loop. Start it at x -600 and throw it in from "
                   "the left.</p>"},
 "slides": [
   {"title": "Start and loop", "sub": "Once, or over and over", "bullets": [
     "start: the moment it is made", "loop: sixty times a second"]},
   {"title": "Start below the screen", "bullets": [], "code": [(FRUIT_START, "launch")]},
   {"title": "A shortcut", "sub": "+= and -=", "bullets": [
     "self.y += 5 is self.y = self.y + 5", "-= takes away"]},
   {"title": "Fly, and slow down", "bullets": [], "code": [(FRUIT_LOOP, "fly")]},
   {"title": "Checkpoint: a leap", "checkpoint": True,
    "say": "Press Play. The orange leaps up from the bottom, slows, hangs, and falls back down."},
   {"title": "Why a curve?", "sub": "30, 29, 28 ... 0, -1, -2", "bullets": [
     "Fast, slower, hang", "Then faster and faster down", "That is gravity"]},
 ],
},

# ---------------------------------------------------------------- week 3 ----
{
 "n": 3,
 "title": "The fruit machine",
 "big_idea": "One fruit is not a game. A spawner is an invisible object with a [[timer]]: every time it counts to a number, it makes a fruit and starts counting again.",
 "new_concepts": ["timer", "if", "True and False"],
 "draw": [],
 "objectives": [
   "Build a [[timer]]: set it, count it, check it, reset it",
   "Run lines only when a question is true with [[if]]",
   "Hide an object with [[visible]] = False",
 ],
 "ops": [
  ADD(SPAWNER_START, "setup", [
    "self.timer = 0",
    "self.spawnTime = 100",
    "self.visible = False",
  ]),
  ADD(SPAWNER_LOOP, "spawn", [
    "self.timer += 1",
    "if self.timer >= self.spawnTime:",
    "    Fruit()",
    "    self.timer = 0",
  ]),
  SET(PLAY_START, "maker", [
    "self.spawner = Spawner()",
  ]),
 ],
 "flow": [
  TALK("0:00", "A machine for fruit",
       "<p>Make a new class called <strong>Spawner</strong>. It never moves and you never "
       "see it: its whole job is to make a fruit every so often.</p>",
       ask=("How does a game know that some time has passed?",
            "It counts loops - sixty loops is one second")),
  TALK("0:04", "The four parts of a timer",
       "<p>Write them on the board: <strong>set</strong> it in start, <strong>count</strong> "
       "it in loop, <strong>check</strong> it with an if, <strong>reset</strong> it. Every "
       "timer in this game has those four parts.</p>"),
  STEP(SPAWNER_START, "setup", "Set the timer, and hide",
       ["The [[timer]] starts at 0, and self.spawnTime is how many loops to wait. A spawner "
        "with no picture shows as a box in the editor - [[visible]] = False hides it, though it "
        "still runs."],
       at="0:08"),
  STEP(SPAWNER_LOOP, "spawn", "Count, check, make, reset",
       ["Count one every loop. Only when it reaches spawnTime: make a fruit and start "
        "counting again from 0."],
       at="0:12",
       ask=("Leave out self.timer = 0. What happens?",
            "After 100 the timer stays above 100, so a fruit is made EVERY loop - a flood")),
  STEP(PLAY_START, "maker", "The spawner makes the fruit now",
       ["Fruit() moves out of the room and into the spawner. In its place, the room makes "
        "the spawner."],
       at="0:20"),
  TALK("0:24", "True and False",
       "<p><code>self.timer &gt;= self.spawnTime</code> is a question, and its answer is "
       "True or False - a [[boolean]]. [[visible]] holds one too.</p>",
       ask=("100 loops - how many seconds between fruit?",
            "A little under two - 60 loops is one second")),
 ],
 "errors": [
   ("A flood of fruit", "self.timer = 0 goes inside the if, pushed in four spaces."),
   ("No fruit at all", "self.spawner = Spawner() goes in Play start, and the if asks >= self.spawnTime."),
   ("IndentationError", "The two lines under the if start with exactly four spaces."),
   ("A box in the middle", "self.visible = False, with a capital F, goes in Spawner start."),
 ],
 "recap": [
   "A [[timer]] is set, counted, checked and reset.",
   "The lines under an [[if]] run only when its question is True.",
   "A question's answer is a [[boolean]]: True or False.",
   "[[visible]] = False hides an object that still runs.",
 ],
 "homework": [
   {"task": "Faster fruit", "detail": "What would you change to get a fruit every half a second?", "done": "self.spawnTime = 30."},
   {"task": "The flood", "detail": "Explain in one sentence why leaving out self.timer = 0 floods the screen.", "done": "The timer never goes back under spawnTime, so the if is true every loop."},
 ],
 "bonus": {"title": "Two at once",
           "body": "<p>Put a second <code>Fruit()</code> under the first one in the spawner. "
                   "Do they fly apart? Why not - and what would make them? (Week 4 "
                   "answers it.)</p>"},
 "slides": [
   {"title": "A machine for fruit", "sub": "The Spawner class", "bullets": [
     "Never moves", "Never seen", "Makes a fruit every so often"]},
   {"title": "The four parts of a timer", "sub": "Set, count, check, reset", "bullets": [
     "Set it in start", "Count it in loop", "Check it with an if", "Reset it"]},
   {"title": "Set the timer, and hide", "bullets": [], "code": [(SPAWNER_START, "setup")]},
   {"title": "Count, check, make, reset", "bullets": [], "code": [(SPAWNER_LOOP, "spawn")]},
   {"title": "The spawner makes the fruit now", "bullets": [], "code": [(PLAY_START, "maker")]},
   {"title": "Checkpoint: a fountain", "checkpoint": True,
    "say": "Press Play. Every couple of seconds an orange leaps up from the same spot."},
   {"title": "True and False", "sub": "A boolean", "bullets": [
     "A question's answer is True or False", "visible holds one too"]},
 ],
},

# ---------------------------------------------------------------- week 4 ----
{
 "n": 4,
 "title": "Never the same twice",
 "big_idea": "Every fruit picks its own place, height and drift with [[random]] numbers - and [[destroy|destroy]]s itself once it has fallen off the screen, so the game never fills up.",
 "new_concepts": ["import", "random.randint()", "destroy()", "comparing numbers"],
 "draw": [],
 "objectives": [
   "Bring in a toolbox with [[import]]",
   "Pick a number with [[random.randint()|random]]",
   "Remove an object with [[destroy]](self)",
   "Explain why off-screen objects must be removed",
 ],
 "ops": [
  ADD(FRUIT_START, "import", [
    "import random",
  ]),
  SET(FRUIT_START, "launch", [
    "self.y = -400",
    "self.velocityY = random.randint(25, 35)",
  ]),
  ADD(FRUIT_START, "place", [
    "self.x = random.randint(-500, 500)",
    "self.velocityX = random.randint(-3, 3)",
  ]),
  ADD(FRUIT_LOOP, "drift", [
    "self.x += self.velocityX",
  ]),
  ADD(FRUIT_LOOP, "gone", [
    "if self.y < -500:",
    "    destroy(self)",
  ]),
 ],
 "flow": [
  TALK("0:00", "Too predictable",
       "<p>Every fruit leaps from the same spot to the same height. A game you can predict "
       "is a game you stop playing. Python has a toolbox of random numbers.</p>",
       ask=("Which numbers should be different for every fruit?",
            "Where it starts across, how high it goes, and which way it drifts")),
  STEP(FRUIT_START, "import", "Bring in random",
       ["The VERY TOP of Fruit start: [[import]] random brings in Python's random toolbox."],
       at="0:05"),
  STEP(FRUIT_START, "launch", "A random height",
       ["The 30 becomes [[random.randint(25, 35)|random]]: a whole number from 25 to 35, "
        "both ends included, different every fruit."],
       at="0:08"),
  STEP(FRUIT_START, "place", "A random place and drift",
       ["At the bottom of Fruit start: anywhere from -500 to 500 across, and a sideways "
        "velocity from -3 (left) to 3 (right)."],
       at="0:12"),
  STEP(FRUIT_LOOP, "drift", "Drift sideways",
       ["Under the two flying lines: the sideways velocity moves x, the way velocityY moves "
        "y. Nothing takes it away, so the drift stays the same."],
       at="0:16",
       ask=("Why does gravity change velocityY but not velocityX?",
            "Gravity only pulls down - nothing pushes a thrown fruit sideways")),
  TALK("0:20", "Where do the fruit go?",
       "<p>Leave the game running for a minute. Every fruit that falls off the bottom keeps "
       "falling for ever - hundreds of them, still running their loop.</p>",
       ask=("What happens to a game with thousands of objects nobody can see?",
            "It slows down - each one still runs its loop sixty times a second")),
  STEP(FRUIT_LOOP, "gone", "Gone when it has fallen",
       ["At the bottom of Fruit loop: only when the fruit is below -500 - off the bottom - "
        "[[destroy]](self) takes this fruit out of the game."],
       at="0:26",
       ask=("The fruit STARTS at -400. Why does it not vanish at once?",
            "-400 is not less than -500 - it only vanishes after it has risen and fallen past -500")),
 ],
 "errors": [
   ("NameError: name 'random' is not defined", "import random goes at the very top of Fruit start."),
   ("AttributeError: module 'random' has no attribute 'randomint'", "It is randint - rand, int."),
   ("Fruit vanish the moment they appear", "The question is self.y &lt; -500, and the fruit starts at -400."),
   ("Every fruit drifts right", "self.x += self.velocityX - x and velocityX, not velocityY."),
 ],
 "recap": [
   "[[import]] random brings in Python's random toolbox.",
   "[[random.randint(25, 35)|random]] picks a whole number, both ends included.",
   "[[destroy]](self) removes the object whose code is running.",
   "An object nobody can see still costs time - remove it.",
 ],
 "homework": [
   {"task": "Dice", "detail": "Write the randint that rolls a normal dice.", "done": "random.randint(1, 6)."},
   {"task": "Which fruit go?", "detail": "Three fruit are at y -300, -500 and -501. Which are destroyed this loop?", "done": "Only -501 - -500 is not less than -500."},
 ],
 "bonus": {"title": "A spin",
           "body": "<p>Give each fruit <code>self.spin = random.randint(-5, 5)</code> in "
                   "start and <code>self.angle += self.spin</code> in loop. Now they "
                   "tumble.</p>"},
 "slides": [
   {"title": "Too predictable", "sub": "Random numbers", "bullets": [
     "Where it starts", "How high it goes", "Which way it drifts"]},
   {"title": "Bring in random", "bullets": [], "code": [(FRUIT_START, "import")]},
   {"title": "A random height", "bullets": [], "code": [(FRUIT_START, "launch")]},
   {"title": "A random place and drift", "bullets": [], "code": [(FRUIT_START, "place")]},
   {"title": "Drift sideways", "bullets": [], "code": [(FRUIT_LOOP, "drift")]},
   {"title": "Checkpoint: a scatter", "checkpoint": True,
    "say": "Press Play. Every fruit starts somewhere new, goes a different height and drifts its own way."},
   {"title": "Where do the fruit go?", "sub": "Down for ever", "bullets": [
     "Each still runs its loop", "Hundreds of them", "The game slows down"]},
   {"title": "Gone when it has fallen", "bullets": [], "code": [(FRUIT_LOOP, "gone")]},
   {"title": "Checkpoint: tidy", "checkpoint": True,
    "say": "Press Play. Nothing looks different - but every fruit is now removed once it falls off the bottom."},
 ],
},

# ---------------------------------------------------------------- week 5 ----
{
 "n": 5,
 "title": "The slicer",
 "big_idea": "The slicer is an object that sits wherever the mouse is. When it touches a fruit, [[get_collision]] gives you that fruit - and you take it away and count a point that everyone can see.",
 "new_concepts": ["mouse_x() and mouse_y()", "get_collision()", "game.", "text()"],
 "draw": ["slicer.png"],
 "objectives": [
   "Make an object follow the mouse with [[mouse_x]]() and mouse_y()",
   "Find what an object is touching with [[get_collision]]",
   "Keep a number every class can reach in [[game]].",
   "Show words and numbers on the screen with [[text]]()",
 ],
 "ops": [
  ADD(SLICER_START, "look", [
    "self.image = sprite('slicer.png')",
  ]),
  ADD(PLAY_START, "slicer", [
    "self.slicer = Slicer()",
  ]),
  ADD(SLICER_LOOP, "follow", [
    "self.x = mouse_x()",
    "self.y = mouse_y()",
  ]),
  ADD(PLAY_START, "score", [
    "game.score = 0",
    "self.scoreText = text('0', 0, 350)",
    "self.scoreText.fontSize = 80",
  ]),
  ADD(SLICER_LOOP, "slice", [
    "fruitHit = get_collision(self, 'Fruit')",
    "if fruitHit:",
    "    game.score += 1",
    "    destroy(fruitHit)",
  ]),
  ADD(PLAY_LOOP, "score", [
    "self.scoreText.text = str(game.score)",
  ]),
 ],
 "flow": [
  TALK("0:00", "Find it yourself",
       "<p>Make a class called <strong>Slicer</strong> and draw <code>slicer.png</code>: a "
       "small white dot, 30 by 30. Then open the editor's documentation and find how to "
       "read where the mouse is. Two minutes.</p>",
       ask=("What did you find?",
            "mouse_x() and mouse_y() - the mouse's x and y, right now")),
  STEP(SLICER_START, "look", "The slicer's picture",
       ["The slicer gets its picture like everything else."],
       at="0:06"),
  STEP(PLAY_START, "slicer", "Make the slicer",
       ["Under the spawner in Play start: one slicer, kept as self.slicer."],
       at="0:08"),
  STEP(SLICER_LOOP, "follow", "Follow the mouse",
       ["Every loop, the slicer jumps to wherever the mouse is now. [[mouse_x]]() gives back "
        "the mouse's x."],
       at="0:10",
       ask=("Why in loop and not in start?",
            "In start it would go to the mouse once, and never follow it again")),
  TALK("0:15", "A number every class can reach",
       "<p>The slicer counts the score, but the room shows it. A [[variable]] with self. "
       "belongs to one object; the Game is made once and every class can reach it as "
       "[[game]]. - so the score lives there.</p>"),
  STEP(PLAY_START, "score", "The score, on the screen",
       ["At the bottom of Play start: the score starts at 0, and [[text]]() puts words on "
        "the screen - '0', at x 0, near the top - in big 80-point writing."],
       at="0:18"),
  STEP(SLICER_LOOP, "slice", "Touching a fruit?",
       ["At the bottom of Slicer loop: [[get_collision]] gives back the fruit you touch, or "
        "False. Only if it gave one back: a point, and the fruit is gone."],
       at="0:23",
       ask=("Why is fruitHit not self.fruitHit?",
            "It is only needed right here, this loop - a name with no self. lives only inside this loop")),
  STEP(PLAY_LOOP, "score", "Show the score",
       ["In the Play room's loop: every loop, the words on the screen become the score. "
        "[[str]]() turns the number 3 into the words '3'."],
       at="0:30",
       ask=("Every fruit you touch is sliced - even if you do not mean to. Is that a good game?",
            "No - next you will only slice while the button is held")),
 ],
 "errors": [
   ("The slicer does not move", "self.x = mouse_x() goes in Slicer LOOP, with the brackets."),
   ("NameError: name 'fruitHit' is not defined", "fruitHit is spelled the same, capital H, on all three lines."),
   ("Nothing is sliced", "The class name in get_collision is 'Fruit' - capital F, in quotes."),
   ("AttributeError: 'Game' has no attribute 'score'", "game.score = 0 goes in Play start."),
 ],
 "recap": [
   "[[mouse_x]]() and mouse_y() say where the mouse is, right now.",
   "[[get_collision]] gives back what you touch, or False.",
   "[[game]]. is reached from every class - the place for the score.",
   "[[text]]() puts words on the screen; change its .text to change them.",
 ],
 "homework": [
   {"task": "Where is the score?", "detail": "What would you change to put the score in the top left corner?", "done": "The x in text('0', 0, 350) - a minus number, like -600."},
   {"task": "Words and numbers", "detail": "Why does the score line need str()?", "done": "game.score is a number; .text holds words, so the number is turned into words."},
 ],
 "bonus": {"title": "A bigger blade",
           "body": "<p>Draw <code>slicer.png</code> at 60 by 60. Is the game easier? Why? "
                   "(Then put it back.)</p>"},
 "slides": [
   {"title": "Find it yourself", "sub": "The documentation", "bullets": [
     "Make the Slicer class", "Draw slicer.png - 30 x 30", "How do you read the mouse?"]},
   {"title": "The slicer's picture", "bullets": [], "code": [(SLICER_START, "look")]},
   {"title": "Make the slicer", "bullets": [], "code": [(PLAY_START, "slicer")]},
   {"title": "Follow the mouse", "bullets": [], "code": [(SLICER_LOOP, "follow")]},
   {"title": "Checkpoint: a blade", "checkpoint": True,
    "say": "Press Play and move the mouse over the game. The white dot follows it."},
   {"title": "A number every class can reach", "sub": "game.", "bullets": [
     "self. belongs to one object", "game. is reached from every class"]},
   {"title": "The score, on the screen", "bullets": [], "code": [(PLAY_START, "score")]},
   {"title": "Touching a fruit?", "bullets": [], "code": [(SLICER_LOOP, "slice")]},
   {"title": "Show the score", "bullets": [], "code": [(PLAY_LOOP, "score")]},
   {"title": "Checkpoint: slice", "checkpoint": True,
    "say": "Press Play and touch a fruit with the mouse. It vanishes and the score at the top goes up."},
 ],
},

# ---------------------------------------------------------------- week 6 ----
{
 "n": 6,
 "title": "Five kinds of fruit",
 "big_idea": "Every fruit rolls a dice when it is made, and an [[if]] with [[elif]]s turns the number into a kind - and the kind into the name of its picture.",
 "new_concepts": ["elif and else", "==", "words in quotes", "joining words with +"],
 "draw": ["watermelon.png", "eggplant.png", "pear.png", "bomb.png"],
 "objectives": [
   "Ask whether two things are equal with ==",
   "Choose one of many with [[if]], [[elif]] and [[else]]",
   "Keep words in a [[variable]]",
   "Join words together with +",
 ],
 "ops": [
  SET(FRUIT_START, "look", [
    "number = random.randint(1, 5)",
    "if number == 1:",
    "    self.tag = 'orange'",
    "elif number == 2:",
    "    self.tag = 'watermelon'",
    "elif number == 3:",
    "    self.tag = 'eggplant'",
    "elif number == 4:",
    "    self.tag = 'pear'",
    "else:",
    "    self.tag = 'bomb'",
    "self.image = sprite(self.tag + '.png')",
  ]),
 ],
 "flow": [
  TALK("0:00", "Draw four more",
       "<p>Draw <code>watermelon.png</code>, <code>eggplant.png</code>, <code>pear.png</code> "
       "and <code>bomb.png</code>, each about the size of the orange. Fifteen minutes - "
       "make the bomb look dangerous.</p>",
       ask=("How could ONE Fruit class be five different things?",
            "Roll a dice when it is made, and pick a picture from the number")),
  TALK("0:15", "Asking, not storing",
       "<p>One = puts a value into a name. Two == ASKS whether two things are equal - "
       "<code>number == 1</code> is True or False.</p>",
       "<p>[[elif]] means else if: it is only asked when every question above it was no. "
       "[[else]] catches everything that is left.</p>"),
  STEP(FRUIT_START, "look", "Roll for a kind",
       ["The orange picture line goes; in its place, roll a number from 1 to 5. One branch "
        "runs - the first whose question is yes - and keeps the kind's name in self.tag.",
        "Each [[elif]] is only asked when every question above it was no; [[else]] catches "
        "the number that is left.",
        "The tag joined to '.png' is the picture's name: 'pear' + '.png' is 'pear.png'."],
       at="0:20",
       ask=("Why self.tag and not just tag?",
            "Next week the slicer has to read it - only a name with self. belongs to the fruit")),
  TALK("0:32", "Count the bombs",
       "<p>Play for a minute and count. About one fruit in five should be a bomb.</p>",
       ask=("Why did the last one need no question?",
            "It is the only number left - if it is not 1, 2, 3 or 4, it must be 5")),
 ],
 "errors": [
   ("SyntaxError on the if line", "== asks; = stores. if number == 1: with two equals signs and a colon."),
   ("A grey box", "The picture's name is the tag plus '.png' - draw pear.png, not Pear.png."),
   ("Only oranges", "randint(1, 5), and each elif asks a different number."),
   ("IndentationError", "if, elif and else line up at the left; the self.tag lines are pushed in four spaces."),
 ],
 "recap": [
   "== asks whether two things are equal; = stores.",
   "[[elif]] is asked only when every question above it was no.",
   "[[else]] runs when nothing above it was yes.",
   "+ joins words: 'pear' + '.png' is 'pear.png'.",
 ],
 "homework": [
   {"task": "Fewer bombs", "detail": "How could you make bombs one fruit in ten?", "done": "randint(1, 10), elif up to 9 with fruit, and else is the bomb - or several numbers for each fruit."},
   {"task": "What is the picture?", "detail": "self.tag is 'eggplant'. What does sprite(self.tag + '.png') look for?", "done": "eggplant.png."},
 ],
 "bonus": {"title": "A sixth fruit",
           "body": "<p>Draw a banana. Change the roll to 1 to 6 and add an "
                   "<code>elif number == 5:</code> for it, above the else.</p>"},
 "slides": [
   {"title": "Draw four more", "sub": "watermelon, eggplant, pear, bomb", "bullets": [
     "About the size of the orange", "Make the bomb look dangerous"]},
   {"title": "Asking, not storing", "sub": "== and elif", "bullets": [
     "= stores", "== asks", "elif: else if", "else: everything left"]},
   {"title": "Roll for a kind", "bullets": [], "code": [(FRUIT_START, "look")]},
   {"title": "Checkpoint: a fruit bowl", "checkpoint": True,
    "say": "Press Play. Oranges, watermelons, eggplants, pears and bombs all leap up."},
 ],
},

# ---------------------------------------------------------------- week 7 ----
{
 "n": 7,
 "title": "Click to slice, and never a bomb",
 "big_idea": "The slicer only cuts while the button is held - [[and]] asks two questions at once - and the fruit it hits has a tag the slicer can read with the [[dot]].",
 "new_concepts": ["mouse_is_pressed()", "and", "an if inside an if"],
 "draw": [],
 "objectives": [
   "Ask whether the mouse button is held with [[mouse_is_pressed]]()",
   "Join two questions with [[and]]",
   "Read another object's variable with the [[dot]]",
   "Put an if inside an if",
 ],
 "ops": [
  SET(SLICER_LOOP, "slice", [
    "fruitHit = get_collision(self, 'Fruit')",
    "if fruitHit and mouse_is_pressed('left'):",
    "    if fruitHit.tag == 'bomb':",
    "        game.score = 0",
    "    else:",
    "        game.score += 1",
    "    destroy(fruitHit)",
  ]),
 ],
 "flow": [
  TALK("0:00", "Too easy",
       "<p>Right now every fruit you wave past is sliced, and so is every bomb.</p>",
       ask=("What should happen when you slice a bomb?",
            "You lose your points - the score goes back to 0")),
  TALK("0:04", "Two questions at once",
       "<p>Look up the mouse button in the documentation. [[and]] joins two questions: the "
       "if runs only when both are true - touching a fruit AND the button held.</p>",
       "<p>fruitHit is the fruit itself, so <code>fruitHit.tag</code> is that fruit's tag. "
       "That is why it had to be self.tag.</p>"),
  STEP(SLICER_LOOP, "slice", "Slice only when clicking - and watch for bombs",
       ["The first line does not change - fruitHit is found the same way.",
        "The if now asks two questions. Under it, a new if asks whether this fruit is a "
        "bomb: a bomb sets the score to 0, and [[else]] - any other fruit - counts the "
        "point. Push game.score += 1 in four more spaces. Every fruit you slice is gone "
        "either way."],
       at="0:10",
       ask=("What if you had written game.score = 0 and then game.score += 1, with no else?",
            "A bomb would set it to 0 and then add 1 - you would have 1 point, not 0")),
  TALK("0:25", "Why is destroy not inside the else?",
       "<p>Read the spaces: destroy(fruitHit) lines up with the inner if, so it runs for "
       "a bomb AND for a fruit.</p>",
       ask=("Push destroy in four more spaces. What changes?",
            "Bombs are never removed - you can slice the same bomb over and over")),
 ],
 "errors": [
   ("Nothing is sliced", "The button is mouse_is_pressed('left') - with the brackets and quotes."),
   ("A bomb leaves you with 1 point", "game.score += 1 goes under the else, pushed in eight spaces."),
   ("Bombs stay on the screen", "destroy(fruitHit) is pushed in only four spaces, under the outside if."),
   ("AttributeError: no attribute 'tag'", "The fruit keeps self.tag - with self. - in Fruit start."),
 ],
 "recap": [
   "[[mouse_is_pressed]]() is True while the button is held.",
   "[[and]] runs the if only when both questions are true.",
   "fruitHit.tag reads the tag of the fruit you hit.",
   "How far a line is pushed in says which if it belongs to.",
 ],
 "homework": [
   {"task": "Read the spaces", "detail": "In the slice block, which lines run when you slice a bomb?", "done": "game.score = 0 and destroy(fruitHit)."},
   {"task": "Order matters", "detail": "Explain the reset-to-1 bug in one sentence.", "done": "Without else, a bomb sets the score to 0 and the next line adds 1."},
 ],
 "bonus": {"title": "A bonus eggplant",
           "body": "<p>Add an <code>elif fruitHit.tag == 'eggplant':</code> between the if "
                   "and the else that adds 10. Where does it have to go, and why?</p>"},
 "slides": [
   {"title": "Too easy", "sub": "Every fruit, every bomb", "bullets": [
     "Waving is not slicing", "A bomb should cost you"]},
   {"title": "Two questions at once", "sub": "and", "bullets": [
     "Touching a fruit", "and the button held", "fruitHit.tag is that fruit's tag"]},
   {"title": "Slice only when clicking - and watch for bombs", "bullets": [], "code": [(SLICER_LOOP, "slice")]},
   {"title": "Checkpoint: careful", "checkpoint": True,
    "say": "Press Play. Waving does nothing; hold the button to slice. Slice a bomb and the score goes back to 0."},
 ],
},

# ---------------------------------------------------------------- week 8 ----
{
 "n": 8,
 "title": "A trail behind the blade",
 "big_idea": "A trail is lots of little objects, one dropped every loop while the button is held. Each one [[times|timer]] itself out and shrinks to nothing as it goes.",
 "new_concepts": ["objects that remove themselves", "scaleX and scaleY", "the dot on a new object"],
 "draw": [],
 "objectives": [
   "Make an object and place it with the [[dot]]",
   "Give an object its own countdown [[timer]]",
   "Shrink a picture with [[scale]]",
 ],
 "ops": [
  ADD(TRAIL_START, "look", [
    "self.image = sprite('slicer.png')",
  ]),
  ADD(TRAIL_START, "timer", [
    "self.timer = 10",
  ]),
  ADD(TRAIL_LOOP, "fade", [
    "self.timer -= 1",
    "if self.timer <= 0:",
    "    destroy(self)",
  ]),
  ADD(SLICER_LOOP, "trail", [
    "if mouse_is_pressed('left'):",
    "    trail = Trail()",
    "    trail.x = self.x",
    "    trail.y = self.y",
  ]),
  ADD(TRAIL_LOOP, "shrink", [
    "self.scaleX -= 0.1",
    "self.scaleY -= 0.1",
  ]),
 ],
 "flow": [
  TALK("0:00", "Where has the blade been?",
       "<p>In a slicing game you see the swipe. Make a class called <strong>Trail</strong>. "
       "It uses the slicer's picture - no new drawing.</p>",
       ask=("How long should one piece of trail last?",
            "Not long - a sixth of a second, 10 loops, or the screen fills with dots")),
  STEP(TRAIL_START, "look", "The trail's picture",
       ["The same white dot as the slicer."],
       at="0:04"),
  STEP(TRAIL_START, "timer", "Ten loops to live",
       ["Each piece of trail starts with a [[timer]] of 10."],
       at="0:06"),
  STEP(TRAIL_LOOP, "fade", "Count down, then go",
       ["A timer that counts DOWN: one less every loop, and at 0 the piece removes itself."],
       at="0:08"),
  STEP(SLICER_LOOP, "trail", "Drop a trail while clicking",
       ["Between follow and slice in Slicer loop: while the button is held, make a trail "
        "and put it where the slicer is. trail.x is the new trail's x - the [[dot]] reaches "
        "inside it."],
       at="0:12",
       ask=("Why trail and not self.trail?",
            "A new one is made every loop - nothing needs to reach it again once it is placed")),
  STEP(TRAIL_LOOP, "shrink", "Shrink as it goes",
       ["At the bottom of Trail loop: [[scale]] 1 is full size. 0.1 less every loop, and "
        "after ten loops it is 0 - nothing - just as the timer runs out."],
       at="0:20",
       ask=("What if it shrank by 0.2?",
            "It would reach 0 after five loops and keep going below - a minus scale flips the picture")),
  TALK("0:26", "Swipe fast",
       "<p>Swipe as fast as you can. The trail is dots with gaps between them.</p>",
       ask=("Why are there gaps?",
            "One dot is made every loop - a fast mouse moves further than one dot between loops. Week 10 fills them")),
 ],
 "errors": [
   ("The screen fills with dots", "self.timer -= 1 goes in Trail LOOP, and the if asks <= 0."),
   ("A trail appears in the middle", "trail.x = self.x and trail.y = self.y - the slicer's x and y."),
   ("A trail while you just move", "The trail lines go under if mouse_is_pressed('left'):, pushed in four spaces."),
   ("The dots grow, or flip", "-= 0.1, not += and not 0.2."),
 ],
 "recap": [
   "An object can [[time|timer]] itself out and [[destroy]] itself.",
   "trail.x reaches inside the new trail with the [[dot]].",
   "[[scale]] 1 is full size; 0 is nothing.",
   "One object per loop leaves gaps when the mouse moves fast.",
 ],
 "homework": [
   {"task": "A longer trail", "detail": "What two numbers would you change so a trail lasts 20 loops and still shrinks to 0?", "done": "self.timer = 20, and -= 0.05 on both scales."},
   {"task": "Rebuild it", "detail": "On paper, without looking: the four parts of the trail's timer.", "done": "Set it to 10, count it down, check it is 0, destroy."},
 ],
 "bonus": {"title": "Rebuild the game",
           "body": "<p>Start a new project and build what you have so far without looking, "
                   "with silly new art: flying shoes and a hammer, or anything you like. "
                   "What could you not remember?</p>"},
 "slides": [
   {"title": "Where has the blade been?", "sub": "The Trail class", "bullets": [
     "Uses slicer.png", "Lasts ten loops"]},
   {"title": "The trail's picture", "bullets": [], "code": [(TRAIL_START, "look")]},
   {"title": "Ten loops to live", "bullets": [], "code": [(TRAIL_START, "timer")]},
   {"title": "Count down, then go", "bullets": [], "code": [(TRAIL_LOOP, "fade")]},
   {"title": "Drop a trail while clicking", "bullets": [], "code": [(SLICER_LOOP, "trail")]},
   {"title": "Checkpoint: a trail", "checkpoint": True,
    "say": "Press Play and hold the button while you move. A short trail of dots follows the blade."},
   {"title": "Shrink as it goes", "bullets": [], "code": [(TRAIL_LOOP, "shrink")]},
   {"title": "Checkpoint: a tail", "checkpoint": True,
    "say": "Press Play and swipe slowly. The trail tapers to a point behind the blade."},
   {"title": "Swipe fast", "sub": "Gaps in the trail", "bullets": [
     "One dot every loop", "Fast mouse, big gaps", "Week 10 fills them"]},
 ],
},

# ---------------------------------------------------------------- week 9 ----
{
 "n": 9,
 "title": "One minute on the clock",
 "big_idea": "A game needs an end. A clock is a [[timer]] that counts down from a minute's worth of loops; dividing by 60 turns loops into seconds, and at nothing left a second [[room]] takes over.",
 "new_concepts": ["division", "int()", "a second room", "text colour"],
 "draw": [],
 "objectives": [
   "Turn loops into seconds with / and [[int]]()",
   "Change a text's colour and size",
   "End the game by changing [[room]]",
   "Join words and a number with + and [[str]]()",
 ],
 "ops": [
  ADD(PLAY_START, "clock", [
    "game.timeLeft = 3600",
    "self.timeText = text('60', -600, 330)",
    "self.timeText.color = 'red'",
    "self.timeText.fontSize = 40",
  ]),
  ADD(PLAY_LOOP, "clock", [
    "game.timeLeft -= 1",
    "self.timeText.text = str(int(game.timeLeft / 60))",
  ]),
  ADD(END_START, "screen", [
    "self.gameOverText = text('Game Over', -300, 150)",
    "self.gameOverText.fontSize = 120",
    "self.finalScoreText = text('Your final score is: ' + str(game.score), -330, -50)",
    "self.finalScoreText.fontSize = 60",
  ]),
  ADD(PLAY_LOOP, "over", [
    "if game.timeLeft <= 0:",
    "    set_room('End')",
  ]),
 ],
 "flow": [
  TALK("0:00", "How long is a minute?",
       "<p>The loop runs 60 times a second.</p>",
       ask=("How many loops is one minute?",
            "60 times 60 - 3600")),
  STEP(PLAY_START, "clock", "The clock starts full",
       ["At the bottom of Play start: 3600 loops left, kept in [[game]]. so every class can "
        "reach it. A second [[text]] in the top left, red and smaller than the score."],
       at="0:04"),
  TALK("0:08", "Loops into seconds",
       "<p>3600 loops divided by 60 is 60 seconds; / divides. But 3599 / 60 is 59.983... - "
       "nobody wants to read that. [[int]]() cuts off everything after the point: 59.</p>"),
  STEP(PLAY_LOOP, "clock", "Count down, and show it",
       ["Under the score line in Play loop: one loop less, then show the seconds - loops "
        "divided by 60, cut to a whole number, turned into words."],
       at="0:12",
       ask=("Waiting a minute to test is slow. What could you change while you test?",
            "game.timeLeft = 180 - three seconds. Put it back to 3600 afterwards")),
  TALK("0:18", "A second room",
       "<p>Make a room called <strong>End</strong>. When it starts it says the game is "
       "over and what you scored.</p>"),
  STEP(END_START, "screen", "The game over screen",
       ["Two texts in End start. + joins words; [[str]]() turns the score into words so + "
        "can join it: 'Your final score is: ' + '12'."],
       at="0:20"),
  STEP(PLAY_LOOP, "over", "Time is up",
       ["At the bottom of Play loop: at no time left, change to the End [[room]]. Changing "
        "room removes the fruit, the slicer and everything else in Play."],
       at="0:26",
       ask=("Why <= 0 and not == 0?",
            "If the clock ever skipped past 0 - a bonus, a bug - == would never be true and the game would never end")),
 ],
 "errors": [
   ("The clock shows 59.983333", "int() goes round the division: str(int(game.timeLeft / 60))."),
   ("TypeError: can only concatenate str", "str(game.score) - + cannot join words and a number."),
   ("The game never ends", "The if asks game.timeLeft <= 0, and the room is called End exactly."),
   ("A black screen at the end", "The two texts go in End START."),
 ],
 "recap": [
   "/ divides; [[int]]() cuts off everything after the point.",
   "A [[text]]'s .color and .fontSize change how it looks.",
   "set_room ends one [[room]] and starts another.",
   "+ joins words; [[str]]() turns a number into words first.",
 ],
 "homework": [
   {"task": "Thirty seconds", "detail": "What would you change for a thirty-second game?", "done": "game.timeLeft = 1800, and the text could start at '30'."},
   {"task": "int()", "detail": "What is int(7.9)?", "done": "7 - int() cuts off, it does not round."},
 ],
 "bonus": {"title": "Hurry up",
           "body": "<p>When there are less than ten seconds left, make the clock bigger. Which "
                   "line goes where?</p>"},
 "slides": [
   {"title": "How long is a minute?", "sub": "60 loops a second", "bullets": [
     "60 x 60", "3600 loops"]},
   {"title": "The clock starts full", "bullets": [], "code": [(PLAY_START, "clock")]},
   {"title": "Loops into seconds", "sub": "/ and int()", "bullets": [
     "3599 / 60 is 59.98...", "int() cuts it to 59"]},
   {"title": "Count down, and show it", "bullets": [], "code": [(PLAY_LOOP, "clock")]},
   {"title": "Checkpoint: a clock", "checkpoint": True,
    "say": "Press Play. A red 60 in the top left counts down, one a second, and keeps going below 0."},
   {"title": "A second room", "sub": "End", "bullets": [
     "Make the End room", "It says what you scored"]},
   {"title": "The game over screen", "bullets": [], "code": [(END_START, "screen")]},
   {"title": "Time is up", "bullets": [], "code": [(PLAY_LOOP, "over")]},
   {"title": "Checkpoint: the end", "checkpoint": True,
    "say": "Slice some fruit and wait out the minute. Game Over appears with your score."},
 ],
},

# --------------------------------------------------------------- week 10 ----
{
 "n": 10,
 "title": "A smooth slash",
 "big_idea": "To fill the gaps in a fast swipe, the slicer remembers where it was and lays twenty pieces of trail along the line to where it is - a [[for]] loop does it twenty times without twenty copies of the code.",
 "new_concepts": ["a name for right now", "for and range()", "multiplying"],
 "draw": [],
 "objectives": [
   "Keep a value from before it changes",
   "Work out how far something moved",
   "Repeat lines a number of times with [[for]] and range()",
   "Use the loop's counting name in the lines it repeats",
 ],
 "ops": [
  ADD(SLICER_LOOP, "previous", [
    "previousX = self.x",
    "previousY = self.y",
  ]),
  ADD(SLICER_LOOP, "moved", [
    "speedX = self.x - previousX",
    "speedY = self.y - previousY",
  ]),
  SET(SLICER_LOOP, "trail", [
    "if mouse_is_pressed('left'):",
    "    for step in range(20):",
    "        trail = Trail()",
    "        trail.x = previousX + speedX * step / 20",
    "        trail.y = previousY + speedY * step / 20",
  ]),
 ],
 "flow": [
  TALK("0:00", "Fill the gap",
       "<p>Draw two dots on the board: where the slicer was last loop, and where it is now. "
       "The gap between is what a fast swipe misses.</p>",
       ask=("What do you need to know to fill it?",
            "Where it was, and how far it moved")),
  STEP(SLICER_LOOP, "previous", "Where was I?",
       ["At the VERY TOP of Slicer loop, before the slicer moves: keep where it is now. "
        "After the next two lines it will have moved, and this is where it WAS."],
       at="0:05",
       ask=("Why at the top and not the bottom?",
            "At the bottom the slicer has already moved - previousX would be the same as self.x")),
  STEP(SLICER_LOOP, "moved", "How far did I move?",
       ["Just under the two mouse lines: where I am take away where I was is how far I "
        "moved this loop - a minus number when it moved left or down."],
       at="0:10"),
  TALK("0:14", "Twenty times, without twenty copies",
       "<p><code>for step in range(20):</code> runs the lines under it 20 times. step is 0 "
       "the first time, then 1, 2, and so on up to 19 - never 20.</p>",
       "<p>So <code>step / 20</code> goes 0, 0.05, 0.1 ... 0.95: from where the slicer was "
       "to almost where it is.</p>",
       ask=("Without for, how many lines would twenty trails take?",
            "Sixty - three lines, twenty times")),
  STEP(SLICER_LOOP, "trail", "A trail all along the swipe",
       ["The three trail lines move in under a [[for]], pushed in four more spaces. Instead "
        "of one trail at the slicer, twenty: each placed a step further along the line "
        "from where it was. * multiplies."],
       at="0:20",
       ask=("What is trail.x when step is 0? And when step is 10?",
            "previousX - where it was. previousX + speedX / 2 - halfway")),
 ],
 "errors": [
   ("A straight line from the middle", "previousX = self.x goes at the very TOP of Slicer loop."),
   ("No trail at all", "The trail lines are pushed in eight spaces, under the for."),
   ("NameError: name 'speedX' is not defined", "The two speed lines go ABOVE the trail lines in Slicer loop."),
   ("The trail runs ahead of the blade", "previousX + speedX - plus, not minus."),
 ],
 "recap": [
   "Keep a value before it changes to know what it was.",
   "Now take away before is how far it moved.",
   "[[for]] step in range(20): runs its lines 20 times, step 0 to 19.",
   "step / 20 walks from 0 to almost 1.",
 ],
 "homework": [
   {"task": "Count them", "detail": "How many trail objects are made in one second of holding the button?", "done": "20 every loop, 60 loops - 1200. Each lasts only 10 loops."},
   {"task": "range()", "detail": "What numbers does step take in for step in range(4):?", "done": "0, 1, 2 and 3."},
 ],
 "bonus": {"title": "Fewer pieces",
           "body": "<p>Try range(5) and step / 5. Then range(50) and step / 50. Which looks "
                   "best - and which makes the game slow down?</p>"},
 "slides": [
   {"title": "Fill the gap", "sub": "Where it was, where it is", "bullets": [
     "A fast swipe leaves gaps", "Remember where it was", "Work out how far it moved"]},
   {"title": "Where was I?", "bullets": [], "code": [(SLICER_LOOP, "previous")]},
   {"title": "How far did I move?", "bullets": [], "code": [(SLICER_LOOP, "moved")]},
   {"title": "Twenty times, without twenty copies", "sub": "for step in range(20):", "bullets": [
     "Runs its lines 20 times", "step is 0, 1, 2 ... 19", "step / 20 is 0 to 0.95"]},
   {"title": "A trail all along the swipe", "bullets": [], "code": [(SLICER_LOOP, "trail")]},
   {"title": "Checkpoint: a smooth slash", "checkpoint": True,
    "say": "Press Play and swipe as fast as you can. The trail is one smooth line, with no gaps."},
 ],
},

# --------------------------------------------------------------- week 11 ----
{
 "n": 11,
 "title": "Woosh, and play again",
 "big_idea": "[[mouse_was_pressed]] is true for one loop only - the moment you click - which is just right for a sound you want once per swipe, and for a click that starts the game again.",
 "new_concepts": ["sound() and play_sound()", "mouse_was_pressed()"],
 "draw": [],
 "objectives": [
   "Load a sound once with [[sound]]() and play it with [[play_sound]]()",
   "Tell [[mouse_was_pressed]] from [[mouse_is_pressed]]",
   "Start the game again by changing [[room]]",
 ],
 "ops": [
  ADD(SLICER_START, "sound", [
    "self.wooshSound = sound('woosh.mp3')",
  ]),
  ADD(SLICER_LOOP, "woosh", [
    "if mouse_was_pressed('left'):",
    "    play_sound(self.wooshSound)",
  ]),
  ADD(END_START, "hint", [
    "self.replayText = text('Click to play again', -170, -200)",
    "self.replayText.fontSize = 40",
  ]),
  ADD(END_LOOP, "restart", [
    "if mouse_was_pressed('left'):",
    "    set_room('Play')",
  ]),
 ],
 "flow": [
  TALK("0:00", "A sound for every swipe",
       "<p>Upload a sound called <code>woosh.mp3</code>, or record one - a quick "
       "<em>whoosh</em> with your mouth works. Until you do, the editor beeps.</p>",
       ask=("If the sound plays while mouse_is_pressed, what do you hear?",
            "Sixty wooshes a second - it starts again every loop the button is held")),
  STEP(SLICER_START, "sound", "Load the sound",
       ["Under the picture in Slicer start: [[sound]]() loads it once and keeps it ready."],
       at="0:06"),
  STEP(SLICER_LOOP, "woosh", "Woosh once per click",
       ["Just above the trail in Slicer loop: [[mouse_was_pressed]] is True for only the "
        "one loop the button goes down. Hold as long as you like - one woosh."],
       at="0:08"),
  TALK("0:14", "Play again",
       "<p>The End screen is the end of everything. One click should start a new game.</p>",
       ask=("Where is the score set back to 0?",
            "Play start - so going to Play again starts a fresh score and a fresh clock")),
  STEP(END_START, "hint", "Say how",
       ["Under the final score in End start: tell the player what to do."],
       at="0:18"),
  STEP(END_LOOP, "restart", "Click to play again",
       ["In End loop: one click, and back to Play - which sets the score, the clock and "
        "everything else up as new."],
       at="0:20",
       ask=("Why mouse_was_pressed here, not mouse_is_pressed?",
            "Either works here - but the click that slices the last fruit could still be held as the End screen appears")),
 ],
 "errors": [
   ("A beep, not your sound", "Upload woosh.mp3 - the name must match exactly."),
   ("A buzzing noise while you hold the button", "mouse_was_pressed, not mouse_is_pressed, for the woosh."),
   ("Clicking End does nothing", "The two lines go in End LOOP, and the room is Play exactly."),
   ("The old score is still there", "game.score = 0 is in Play start, so Play sets it again."),
 ],
 "recap": [
   "[[sound]]() loads once; [[play_sound]]() plays as often as you like.",
   "[[mouse_was_pressed]]() is True for one loop - the click.",
   "[[mouse_is_pressed]]() is True every loop the button is held.",
   "Going to a [[room]] runs its start again - a fresh game.",
 ],
 "homework": [
   {"task": "was or is?", "detail": "Firing one arrow per click - mouse_was_pressed or mouse_is_pressed?", "done": "mouse_was_pressed - one click, one arrow."},
   {"task": "Find your sound", "detail": "Record or find a short swish sound, under one second.", "done": "A woosh.mp3 ready to upload."},
 ],
 "bonus": {"title": "A splat",
           "body": "<p>Load a second sound in the slicer and play it in the slice block, "
                   "when a fruit is hit. Where in the block?</p>"},
 "slides": [
   {"title": "A sound for every swipe", "sub": "woosh.mp3", "bullets": [
     "Upload or record one", "The editor beeps until you do"]},
   {"title": "Load the sound", "bullets": [], "code": [(SLICER_START, "sound")]},
   {"title": "Woosh once per click", "bullets": [], "code": [(SLICER_LOOP, "woosh")]},
   {"title": "Checkpoint: woosh", "checkpoint": True,
    "say": "Press Play and click. One woosh - or one beep - each time the button goes down."},
   {"title": "Play again", "sub": "One click", "bullets": [
     "Play start sets everything up", "Going to Play again starts fresh"]},
   {"title": "Say how", "bullets": [], "code": [(END_START, "hint")]},
   {"title": "Click to play again", "bullets": [], "code": [(END_LOOP, "restart")]},
   {"title": "Checkpoint: again", "checkpoint": True,
    "say": "Wait out the minute, then click. A new game starts at 0 with a full clock."},
 ],
},

# --------------------------------------------------------------- week 12 ----
{
 "n": 12,
 "title": "Boom",
 "big_idea": "An [[animation]] is a run of pictures shown one after another. A sprite sheet holds them all in one picture, and a bomb you slice leaves an explosion that plays them, then removes itself.",
 "new_concepts": ["sprite sheets", "animation()", "animation_set()"],
 "draw": ["explosion.png"],
 "objectives": [
   "Draw a sprite sheet: frames in a grid",
   "Cut a sheet into frames with [[sprite]](name, rows, columns)",
   "Play the frames with [[animation]]() and animation_set()",
   "Make an object where another one was",
 ],
 "ops": [
  ADD(EXPLOSION_START, "look", [
    "explosionSheet = sprite('explosion.png', 2, 3)",
    "explosionAnimation = animation(explosionSheet, 20, 0, 4)",
    "animation_set(self, explosionAnimation)",
  ]),
  ADD(EXPLOSION_START, "timer", [
    "self.timer = 20",
  ]),
  ADD(EXPLOSION_LOOP, "fade", [
    "self.timer -= 1",
    "if self.timer <= 0:",
    "    destroy(self)",
  ]),
  SET(SLICER_LOOP, "slice", [
    "fruitHit = get_collision(self, 'Fruit')",
    "if fruitHit and mouse_is_pressed('left'):",
    "    if fruitHit.tag == 'bomb':",
    "        game.score = 0",
    "        explosion = Explosion()",
    "        explosion.x = fruitHit.x",
    "        explosion.y = fruitHit.y",
    "    else:",
    "        game.score += 1",
    "    destroy(fruitHit)",
  ]),
 ],
 "flow": [
  TALK("0:00", "A flip book in one picture",
       "<p>A sprite sheet is a flip book laid out flat: frames in a grid, left to right, "
       "top row first. Draw <code>explosion.png</code> at 450 by 300 - 2 rows of 3 frames, "
       "each 150 by 150. Use five of them: small flash, big, bigger, smoke, a puff.</p>",
       ask=("Why draw it on a grid of exact squares?",
            "The computer cuts the sheet into equal pieces - a frame over the line is cut in half")),
  TALK("0:15", "Find it yourself",
       "<p>Make a class called <strong>Explosion</strong>, then look up "
       "<code>animation</code> in the documentation.</p>"),
  STEP(EXPLOSION_START, "look", "Play the frames",
       ["[[sprite]] with two more numbers cuts the sheet: 2 rows, 3 columns. [[animation]] "
        "plays frames 0 to 4 of it, 20 a second, and animation_set gives it to this "
        "explosion."],
       at="0:18",
       ask=("Frames 0 to 4 - how many is that?",
            "Five - counting starts at 0, and both ends are played")),
  STEP(EXPLOSION_START, "timer", "A third of a second",
       ["Five frames at 20 a second takes a quarter of a second; 20 loops is a third, so "
        "the last frame stays a moment."],
       at="0:24"),
  STEP(EXPLOSION_LOOP, "fade", "Then go",
       ["The same countdown as the trail."],
       at="0:26"),
  STEP(SLICER_LOOP, "slice", "A bomb explodes",
       ["The first line does not change - fruitHit is found the same way.",
        "Under game.score = 0, inside the bomb's if: make an explosion and put it where the "
        "bomb was. fruitHit is still the bomb - it is only destroyed on the last line."],
       at="0:28",
       ask=("What if destroy(fruitHit) came before the explosion lines?",
            "The bomb is gone - fruitHit.x would belong to an object that is no longer in the game")),
 ],
 "errors": [
   ("A tiny piece of the picture, or all frames at once", "sprite('explosion.png', 2, 3) - 2 rows, then 3 columns."),
   ("The explosion appears in the middle", "explosion.x = fruitHit.x - the bomb's x."),
   ("The explosion never goes away", "self.timer -= 1 in Explosion LOOP, and destroy(self) under the if."),
   ("Every fruit explodes", "The explosion lines go under the bomb's if, pushed in eight spaces."),
 ],
 "recap": [
   "A sprite sheet holds an [[animation]]'s frames in a grid.",
   "[[sprite]](name, rows, columns) cuts the sheet into frames.",
   "[[animation]](sheet, speed, first, last) plays them.",
   "Make the new object before you destroy the old one.",
 ],
 "homework": [
   {"task": "Sheet sums", "detail": "A sheet is 2 rows of 4 frames, each 150 by 150. How big is the picture?", "done": "600 wide, 300 tall."},
   {"task": "Slow motion", "detail": "How would you make the explosion play half as fast?", "done": "10 instead of 20 in animation(), and a longer timer - 40."},
 ],
 "bonus": {"title": "A bigger bang",
           "body": "<p>Make the explosion's picture twice the size with "
                   "<code>self.scaleX = 2</code> and <code>self.scaleY = 2</code> in "
                   "Explosion start.</p>"},
 "slides": [
   {"title": "A flip book in one picture", "sub": "explosion.png - 450 x 300", "bullets": [
     "2 rows of 3 frames", "Each 150 x 150", "Left to right, top row first"]},
   {"title": "Find it yourself", "sub": "The Explosion class", "bullets": [
     "Look up animation"]},
   {"title": "Play the frames", "bullets": [], "code": [(EXPLOSION_START, "look")]},
   {"title": "A third of a second", "bullets": [], "code": [(EXPLOSION_START, "timer")]},
   {"title": "Then go", "bullets": [], "code": [(EXPLOSION_LOOP, "fade")]},
   {"title": "A bomb explodes", "bullets": [], "code": [(SLICER_LOOP, "slice")]},
   {"title": "Checkpoint: boom", "checkpoint": True,
    "say": "Press Play and slice a bomb. It bursts into your explosion, and the score goes to 0."},
 ],
},

# --------------------------------------------------------------- week 13 ----
{
 "n": 13,
 "title": "Splash",
 "big_idea": "Every sliced fruit bursts into a splash of its own colour. One Splash class does it for all of them, by building the sheet's name from the fruit's tag - left in [[game]]. just before the splash is made, because [[start]] runs the moment it is.",
 "new_concepts": ["one class for many pictures", "when start runs"],
 "draw": ["orangeSplash.png", "watermelonSplash.png", "eggplantSplash.png", "pearSplash.png"],
 "objectives": [
   "Build a picture's name from words with +",
   "Pass a value to a new object through [[game]].",
   "Explain why the value is set BEFORE the object is made",
 ],
 "ops": [
  ADD(SPLASH_START, "look", [
    "splashSheet = sprite(game.splashTag + 'Splash.png', 2, 4)",
    "splashAnimation = animation(splashSheet, 35, 0, 7)",
    "animation_set(self, splashAnimation)",
  ]),
  ADD(SPLASH_START, "timer", [
    "self.timer = 16",
  ]),
  ADD(SPLASH_LOOP, "fade", [
    "self.timer -= 1",
    "if self.timer <= 0:",
    "    destroy(self)",
  ]),
  SET(SLICER_LOOP, "slice", [
    "fruitHit = get_collision(self, 'Fruit')",
    "if fruitHit and mouse_is_pressed('left'):",
    "    if fruitHit.tag == 'bomb':",
    "        game.score = 0",
    "        explosion = Explosion()",
    "        explosion.x = fruitHit.x",
    "        explosion.y = fruitHit.y",
    "    else:",
    "        game.score += 1",
    "        game.splashTag = fruitHit.tag",
    "        splash = Splash()",
    "        splash.x = fruitHit.x",
    "        splash.y = fruitHit.y",
    "    destroy(fruitHit)",
  ]),
 ],
 "flow": [
  TALK("0:00", "Four sheets",
       "<p>Draw <code>orangeSplash.png</code>, <code>watermelonSplash.png</code>, "
       "<code>eggplantSplash.png</code> and <code>pearSplash.png</code>: 600 by 300 each, "
       "2 rows of 4 frames - the fruit bursting, from whole to drops. Copy one and recolour "
       "it to save time.</p>",
       ask=("Four splashes. Do you need four classes?",
            "No - they only differ in their picture, and the picture's name can be built from the tag")),
  TALK("0:20", "Building the name",
       "<p>The fruit's tag is 'pear'; 'pear' + 'Splash.png' is 'pearSplash.png'. That is "
       "why the sheets are named the way they are.</p>",
       ask=("What would a bomb's splash sheet have to be called?",
            "bombSplash.png - but a bomb never splashes, it explodes")),
  STEP(SPLASH_START, "look", "Pick the sheet from the tag",
       ["Make a class called <strong>Splash</strong>. Its sheet's name is game.splashTag - "
        "the kind of fruit that was sliced - joined to 'Splash.png'. Eight frames, 0 to 7, "
        "35 a second."],
       at="0:22"),
  STEP(SPLASH_START, "timer", "Just long enough",
       ["Eight frames at 35 a second is about 14 loops; 16 lets the last one show."],
       at="0:26"),
  STEP(SPLASH_LOOP, "fade", "Then go",
       ["The same countdown again."],
       at="0:28"),
  STEP(SLICER_LOOP, "slice", "Leave the tag, then splash",
       ["The first line does not change - fruitHit is found the same way.",
        "Under game.score += 1, inside the else: leave the fruit's tag in game.splashTag "
        "FIRST, then make the splash where the fruit was."],
       at="0:30",
       ask=("Swap the order: Splash() first, then game.splashTag. What goes wrong?",
            "start runs the moment Splash() is called - the splash would pick its sheet from the LAST fruit's tag, or fail on the first")),
 ],
 "errors": [
   ("AttributeError: 'Game' has no attribute 'splashTag'", "game.splashTag = fruitHit.tag goes ABOVE splash = Splash()."),
   ("Each splash is the colour of the fruit before", "The same: set game.splashTag before Splash()."),
   ("A grey box", "The sheets are orangeSplash.png and so on - capital S, and matching the tags exactly."),
   ("Bombs splash", "The splash lines go in the else, pushed in eight spaces."),
 ],
 "recap": [
   "+ builds a picture's name from a tag.",
   "[[start]] runs the moment an object is made.",
   "So whatever start reads must be set before you make it.",
   "One class with a chosen picture beats four copies.",
 ],
 "homework": [
   {"task": "Name it", "detail": "game.splashTag is 'watermelon'. What sheet does the splash load?", "done": "watermelonSplash.png."},
   {"task": "Why first?", "detail": "In one sentence: why does game.splashTag have to be set before Splash()?", "done": "Splash's start reads it, and start runs the moment Splash() is called."},
 ],
 "bonus": {"title": "A juicier splash",
           "body": "<p>Give the splash <code>self.angle = random.randint(0, 360)</code> in "
                   "start (remember import random) so no two splashes look the same.</p>"},
 "slides": [
   {"title": "Four sheets", "sub": "600 x 300 - 2 rows of 4", "bullets": [
     "orangeSplash, watermelonSplash", "eggplantSplash, pearSplash", "Copy one and recolour it"]},
   {"title": "Building the name", "sub": "'pear' + 'Splash.png'", "bullets": [
     "is 'pearSplash.png'", "One class, any fruit"]},
   {"title": "Pick the sheet from the tag", "bullets": [], "code": [(SPLASH_START, "look")]},
   {"title": "Just long enough", "bullets": [], "code": [(SPLASH_START, "timer")]},
   {"title": "Then go", "bullets": [], "code": [(SPLASH_LOOP, "fade")]},
   {"title": "Leave the tag, then splash", "bullets": [], "code": [(SLICER_LOOP, "slice")]},
   {"title": "Checkpoint: splash", "checkpoint": True,
    "say": "Press Play and slice. Every fruit bursts into a splash of its own colour."},
 ],
},

# --------------------------------------------------------------- week 14 ----
{
 "n": 14,
 "title": "Shake, and speed up",
 "big_idea": "Game feel: a bomb shakes the screen by moving the [[camera]] somewhere random every loop, and the better you play, the faster the fruit comes.",
 "new_concepts": ["the camera", "a ladder of elifs"],
 "draw": [],
 "objectives": [
   "Move the view with [[set_camera]]()",
   "Shake it with [[random]] numbers, and put it back",
   "Use an [[elif]] ladder to choose from ranges",
 ],
 "ops": [
  ADD(EXPLOSION_LOOP, "import", [
    "import random",
  ]),
  ADD(EXPLOSION_LOOP, "shake", [
    "shakeX = random.randint(-30, 30)",
    "shakeY = random.randint(-30, 30)",
    "set_camera(shakeX, shakeY)",
  ]),
  SET(EXPLOSION_LOOP, "fade", [
    "self.timer -= 1",
    "if self.timer <= 0:",
    "    set_camera(0, 0)",
    "    destroy(self)",
  ]),
  ADD(SPAWNER_LOOP, "rate", [
    "if game.score < 5:",
    "    self.spawnTime = 100",
    "elif game.score < 20:",
    "    self.spawnTime = 60",
    "elif game.score < 30:",
    "    self.spawnTime = 30",
    "else:",
    "    self.spawnTime = 15",
  ]),
 ],
 "flow": [
  TALK("0:00", "Game feel",
       "<p>Play two games on the board: one where a bomb just explodes, one where the screen "
       "jolts too. Which one hurts more? That jolt is a camera shake.</p>",
       ask=("The camera looks at x 0, y 0. What would moving it do?",
            "Everything on the screen seems to move the other way")),
  STEP(EXPLOSION_LOOP, "import", "Bring in random",
       ["At the VERY TOP of Explosion loop."],
       at="0:05"),
  STEP(EXPLOSION_LOOP, "shake", "Jolt the camera",
       ["Under the import: every loop of the explosion, point the [[camera]] at a different "
        "random spot up to 30 away from the middle."],
       at="0:07",
       ask=("Press Play and slice a bomb. What is wrong?",
            "The screen stays shifted after the explosion - nothing puts the camera back")),
  STEP(EXPLOSION_LOOP, "fade", "Put the camera back",
       ["Inside the if, above destroy: point the camera back at the middle before the "
        "explosion goes."],
       at="0:14"),
  TALK("0:18", "Faster as you score",
       "<p>At the start a fruit every 100 loops is fine. At 30 points it is boring. The "
       "spawner already waits self.spawnTime - so change it.</p>",
       ask=("Score 25. Which line sets the time?",
            "Not < 5, not < 20, but < 30 - so 30. Python stops at the first yes")),
  STEP(SPAWNER_LOOP, "rate", "A ladder of speeds",
       ["At the bottom of Spawner loop: under 5 points, a fruit every 100 loops; under 20, "
        "every 60; under 30, every 30; anything more, every 15.",
        "The order matters: every elif is only asked if the questions above were no."],
       at="0:22",
       ask=("Why does elif game.score < 20 not need to say 'and more than 5'?",
            "It is only asked when game.score < 5 was no - so it is already 5 or more")),
 ],
 "errors": [
   ("The screen stays shifted", "set_camera(0, 0) inside the if, ABOVE destroy(self)."),
   ("NameError: name 'random' is not defined", "import random at the very top of Explosion LOOP."),
   ("It never speeds up", "The ladder asks game.score - and it sets self.spawnTime, the same name as in Spawner start."),
   ("Always the fastest", "if comes first with < 5; then elif < 20, elif < 30, else - in that order."),
 ],
 "recap": [
   "[[set_camera]](x, y) moves what the screen looks at.",
   "A random camera every loop is a shake; (0, 0) puts it back.",
   "An [[elif]] ladder picks the first range that fits.",
   "Python stops at the first yes.",
 ],
 "homework": [
   {"task": "Read the ladder", "detail": "Score 4, 19, 20 and 100: what is spawnTime for each?", "done": "100, 60, 30 and 15."},
   {"task": "A gentle shake", "detail": "What would you change for a smaller shake?", "done": "randint(-10, 10) on both lines."},
 ],
 "bonus": {"title": "Shake on a fruit too",
           "body": "<p>Give the splash a tiny shake of its own - randint(-5, 5) - and "
                   "remember to put the camera back.</p>"},
 "slides": [
   {"title": "Game feel", "sub": "A camera shake", "bullets": [
     "Move the camera", "Everything seems to jolt"]},
   {"title": "Bring in random", "bullets": [], "code": [(EXPLOSION_LOOP, "import")]},
   {"title": "Jolt the camera", "bullets": [], "code": [(EXPLOSION_LOOP, "shake")]},
   {"title": "Checkpoint: a jolt", "checkpoint": True,
    "say": "Press Play and slice a bomb. The screen shakes - and stays a little off when it stops."},
   {"title": "Put the camera back", "bullets": [], "code": [(EXPLOSION_LOOP, "fade")]},
   {"title": "Faster as you score", "sub": "self.spawnTime", "bullets": [
     "100 loops at the start", "Less and less as you score"]},
   {"title": "A ladder of speeds", "bullets": [], "code": [(SPAWNER_LOOP, "rate")]},
   {"title": "Checkpoint: feel it", "checkpoint": True,
    "say": "Press Play. Bombs shake the screen and it settles back. Score 20 and the fruit comes much faster."},
 ],
},

# --------------------------------------------------------------- week 15 ----
{
 "n": 15,
 "title": "Treasure",
 "big_idea": "A treasure chest buys you five more seconds - but never more than a full minute. Adding first and then cutting back to the most allowed is called clamping.",
 "new_concepts": ["a new kind in the chain", "clamping a number"],
 "draw": ["treasure.png", "treasureSplash.png"],
 "objectives": [
   "Add a kind to the [[elif]] chain",
   "Keep the rules of the game in [[game]]. where they are easy to change",
   "Clamp a number so it never goes past a limit",
 ],
 "ops": [
  SET(FRUIT_START, "look", [
    "number = random.randint(1, 6)",
    "if number == 1:",
    "    self.tag = 'orange'",
    "elif number == 2:",
    "    self.tag = 'watermelon'",
    "elif number == 3:",
    "    self.tag = 'eggplant'",
    "elif number == 4:",
    "    self.tag = 'pear'",
    "elif number == 5:",
    "    self.tag = 'treasure'",
    "else:",
    "    self.tag = 'bomb'",
    "self.image = sprite(self.tag + '.png')",
  ]),
  ADD(PLAY_START, "bonus", [
    "game.bonusTime = 300",
    "game.maxTime = 3600",
  ]),
  SET(SLICER_LOOP, "slice", [
    "fruitHit = get_collision(self, 'Fruit')",
    "if fruitHit and mouse_is_pressed('left'):",
    "    if fruitHit.tag == 'bomb':",
    "        game.score = 0",
    "        explosion = Explosion()",
    "        explosion.x = fruitHit.x",
    "        explosion.y = fruitHit.y",
    "    else:",
    "        game.score += 1",
    "        game.splashTag = fruitHit.tag",
    "        splash = Splash()",
    "        splash.x = fruitHit.x",
    "        splash.y = fruitHit.y",
    "        if fruitHit.tag == 'treasure':",
    "            game.timeLeft += game.bonusTime",
    "            if game.timeLeft > game.maxTime:",
    "                game.timeLeft = game.maxTime",
    "    destroy(fruitHit)",
  ]),
 ],
 "flow": [
  TALK("0:00", "Draw the treasure",
       "<p>Draw <code>treasure.png</code> - a chest, a gem, a golden fruit - and "
       "<code>treasureSplash.png</code>, 600 by 300 like the others. Because the splash "
       "is built from the tag, that is all it takes to give treasure its own burst.</p>",
       ask=("Where does a sixth kind go in the chain?",
            "An elif above the else - the else must stay last, catching what is left")),
  STEP(FRUIT_START, "look", "A sixth kind",
       ["The dice now rolls 1 to 6. A new elif for 5 makes treasure, just above the else - "
        "so a bomb is now one roll in six.",
        "Everything else in the chain stays the same.",
        "The else stays last, and the picture line does not change: 'treasure' + '.png'."],
       at="0:18"),
  STEP(PLAY_START, "bonus", "The rules, in one place",
       ["At the bottom of Play start: a treasure is worth 300 loops - five seconds - and "
        "the clock can never hold more than 3600. Kept in [[game]]. with names, they are "
        "easy to find and change."],
       at="0:24"),
  TALK("0:27", "Clamping",
       "<p>Add the bonus. Then, if that went over the most allowed, cut it back to the most "
       "allowed. Two short steps, and the clock can never pass a minute.</p>",
       ask=("55 seconds left and you slice a treasure. How long is left?",
            "60: 55 + 5 is exactly the most allowed. At 58 it would be 63, cut back to 60")),
  STEP(SLICER_LOOP, "slice", "Treasure buys time",
       ["The first line does not change - fruitHit is found the same way.",
        "At the bottom of the else, under the splash: only for treasure, add the bonus to "
        "the clock - then if it went past the most allowed, cut it back. Treasure still "
        "counts a point and splashes, like any fruit."],
       at="0:30",
       ask=("Why is this if inside the else, and not next to the bomb's?",
            "Treasure is a fruit - it should score and splash too. Inside the else it does both")),
  TALK("0:45", "Play it",
       "<p>Play the whole game. You wrote every line of it.</p>",
       ask=("What would you add next?",
            "A menu room, a high score, a penalty fruit - every one is something you can now build")),
 ],
 "errors": [
   ("No treasure ever comes", "randint(1, 6), and elif number == 5: above the else."),
   ("The clock goes over 60", "The clamp: if game.timeLeft > game.maxTime: inside the treasure's if."),
   ("AttributeError: no attribute 'bonusTime'", "game.bonusTime = 300 goes in Play start."),
   ("Treasure does not splash", "Draw treasureSplash.png - the name is the tag plus Splash.png."),
 ],
 "recap": [
   "A new kind is an [[elif]] above the [[else]].",
   "Rules kept in [[game]]. with names are easy to change.",
   "Clamping: add, then cut back to the most allowed.",
   "You wrote a whole game.",
 ],
 "homework": [
   {"task": "Clamp it", "detail": "game.timeLeft is 3500 and you slice a treasure. What is it after the slice block?", "done": "3800 is over 3600, so it is cut back to 3600."},
   {"task": "Design one", "detail": "Plan a penalty fruit that takes away five seconds. Which lines would you add, and where?", "done": "A new kind in the chain, and an if in the slice that takes game.bonusTime away."},
 ],
 "bonus": {"title": "A menu",
           "body": "<p>Make a Menu room with the game's name and 'Click to start', and send "
                   "Game start there instead of Play. Its loop goes to Play on a click - "
                   "just like End.</p>"},
 "slides": [
   {"title": "Draw the treasure", "sub": "treasure.png and treasureSplash.png", "bullets": [
     "A chest, a gem, a golden fruit", "The splash is 600 x 300 like the others"]},
   {"title": "A sixth kind", "bullets": [], "code": [(FRUIT_START, "look")]},
   {"title": "The rules, in one place", "bullets": [], "code": [(PLAY_START, "bonus")]},
   {"title": "Clamping", "sub": "Add, then cut back", "bullets": [
     "Add the bonus", "Over the most allowed?", "Cut it back"]},
   {"title": "Treasure buys time", "bullets": [], "code": [(SLICER_LOOP, "slice")]},
   {"title": "Checkpoint: the whole game", "checkpoint": True,
    "say": "Press Play. Slice a treasure and the clock jumps up five seconds - but never past 60."},
 ],
},

]


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
    if re.search(r"sprite\(.*, \d+, \d+\)", stripped):
        keys.append("py:sheet")
    if re.match(r"((self\.)?\w+ = )?[A-Z]\w*\(\)$", stripped):
        keys.append("py:make")
    if (re.match(r"self\.\w+\.\w+ = ", stripped)
            or re.match(r"(?!self\.|game\.)[a-z]\w*\.\w+ = ", stripped)):
        keys.append("py:dot")
    if re.match(r"self\.[xy] = -?\d+$", stripped):
        keys.append("py:coords")
    if re.match(r"self\.\w+ = -?\d", stripped):
        keys.append("py:variable")
    if " += " in stripped or " -= " in stripped:
        keys.append("py:change")
    if "velocity" in stripped:
        keys.append("py:velocity")
    if stripped == "self.velocityY -= 1":
        keys.append("py:gravity")
    if stripped.startswith("if "):
        keys.append("py:if")
    if "Background()" in stripped:
        keys.append("py:order")
    if re.search(r" (<|>|<=|>=) ", stripped):
        keys.append("py:compare")
    if "get_collision(" in stripped:
        keys.append("py:collision")
    if re.match(r"(?!self\b|game\b)[a-z]\w* = ", stripped):
        keys.append("py:local")
    if "mouse_x(" in stripped or "mouse_y(" in stripped:
        keys.append("py:mouse")
    if "mouse_is_pressed(" in stripped:
        keys.append("py:click")
    if "mouse_was_pressed(" in stripped:
        keys.append("py:tap")
    if re.search(r"[tT]imer [-+]= 1", stripped):
        keys.append("py:timer")
    if re.search(r"\b(True|False)\b", stripped):
        keys.append("py:bool")
    if stripped == "else:":
        keys.append("py:else")
    if stripped.startswith("elif "):
        keys.append("py:elif")
    if " and " in stripped:
        keys.append("py:and")
    if " == " in stripped:
        keys.append("py:equals")
    if line.startswith("    if "):
        keys.append("py:nested")
    if "destroy(" in stripped:
        keys.append("py:destroy")
    if re.search(r"(?<!\w)str\(", stripped):
        keys.append("py:str")
    if re.search(r"(?<!\w)int\(", stripped):
        keys.append("py:int")
    if " / " in stripped:
        keys.append("py:divide")
    if re.search(r"= '", stripped):
        keys.append("py:string")
    if re.search(r"' \+ |\+ '", stripped):
        keys.append("py:join")
    if re.search(r"(?<![\w.])text\(", stripped):
        keys.append("py:text")
    if re.search(r"\.(fontSize|color) = ", stripped):
        keys.append("py:look")
    if stripped.startswith("import "):
        keys.append("py:import")
    if "randint(" in stripped:
        keys.append("py:random")
    if "game." in stripped:
        keys.append("py:game")
    if stripped.startswith("self.visible ="):
        keys.append("py:visible")
    if "scaleX" in stripped or "scaleY" in stripped:
        keys.append("py:scale")
    if stripped.startswith("for "):
        keys.append("py:for")
    if "animation(" in stripped or "animation_set(" in stripped:
        keys.append("py:animation")
    if "set_camera(" in stripped:
        keys.append("py:camera")
    if re.search(r"(?<!_)sound\(", stripped):
        keys.append("py:sound")
    if "play_sound(" in stripped:
        keys.append("py:play")
    return keys


# key -> (kind, title, [bullets], example). kind picks the slide's eyebrow.
CONCEPTS = {
    "py:start": ("game", "start runs once",
        ["Everything in [[start]] runs one time, the moment the [[object]] is made.",
         "Use it to set a picture, a place or a starting number."],
        "self.image = sprite('orange.png')"),
    "py:loop": ("game", "loop runs over and over",
        ["[[loop]] runs about 60 times every second, until the object is gone.",
         "Anything that moves or keeps checking lives in loop."],
        "self.y += self.velocityY"),
    "py:room": ("game", "A room is one screen",
        ["Your game can have more than one screen. Each one is a [[room]].",
         "set_room changes to another, and removes everything from the one before."],
        "set_room('Play')"),
    "py:sprite": ("art", "A sprite is your picture",
        ["[[sprite]]() finds the picture you drew and puts it on the [[object]].",
         "The name has to match exactly, including the .png."],
        "self.image = sprite('orange.png')"),
    "py:sheet": ("art", "A sprite sheet",
        ["Two more numbers cut the picture into frames: rows, then columns.",
         "sprite('explosion.png', 2, 3) is 2 rows of 3 - six frames."],
        "explosionSheet = sprite('explosion.png', 2, 3)"),
    "py:make": ("py", "Making an object",
        ["Fruit() builds one fruit from the Fruit [[class]].",
         "A name on the left is how you talk to it afterwards."],
        "self.spawner = Spawner()"),
    "py:dot": ("py", "The dot reaches inside",
        ["trail.x means: the x that belongs to trail - that trail's x.",
         "The [[dot]] lets one object change another."],
        "trail.x = self.x"),
    "py:coords": ("game", "x and y",
        ["The middle of the screen is x 0, y 0.",
         "Plus x is right, plus y is UP. Minus goes left and down."],
        "self.y = -400"),
    "py:variable": ("py", "A variable holds a value",
        ["A [[variable]] is a name with a value in it. The name goes left of =.",
         "self. in front makes it belong to this object, so start and loop can share it."],
        "self.velocityY = 30"),
    "py:change": ("py", "+= and -=",
        ["self.y += 5 means: my y becomes my y plus 5.",
         "-= takes away the same way. Do it every [[loop]] and things move."],
        "self.y += self.velocityY"),
    "py:velocity": ("game", "Velocity is speed",
        ["[[velocity]] is how far an object moves every loop.",
         "velocityY is up and down; velocityX is side to side."],
        "self.velocityY = 30"),
    "py:gravity": ("game", "Gravity",
        ["[[gravity]] takes a little off the velocity every loop.",
         "Up, slower, stop, then down faster and faster - a curve."],
        "self.velocityY -= 1"),
    "py:if": ("py", "if means only when",
        ["The lines under an [[if]] run only when its question is true.",
         "The if line ends with a colon; the lines under it start with four spaces."],
        "if self.timer >= self.spawnTime:"),
    "py:order": ("game", "Made first, drawn at the back",
        ["Objects are drawn in the order they were made.",
         "Make the background first so everything else is drawn on top."],
        "self.background = Background()"),
    "py:compare": ("py", "Comparing numbers",
        ["&lt; is less than, &gt; is greater than.",
         "&lt;= and &gt;= also count the number itself."],
        "if self.y < -500:"),
    "py:collision": ("game", "get_collision - are they touching?",
        ["[[get_collision(self, 'Fruit')|get_collision]] gives back the fruit you touch, or False.",
         "An [[if]] treats the fruit as yes and False as no."],
        "fruitHit = get_collision(self, 'Fruit')"),
    "py:local": ("py", "A name for right now",
        ["A name with no self. in front lives only inside this start or loop.",
         "Use it for a value you need right here and nowhere else."],
        "fruitHit = get_collision(self, 'Fruit')"),
    "py:mouse": ("game", "Where is the mouse?",
        ["[[mouse_x]]() and mouse_y() give back the mouse's x and y, right now.",
         "In loop, they are asked again sixty times a second."],
        "self.x = mouse_x()"),
    "py:click": ("game", "mouse_is_pressed()",
        ["[[mouse_is_pressed('left')|mouse_is_pressed]] is True for every loop you hold the button.",
         "'left' is the left button."],
        "if fruitHit and mouse_is_pressed('left'):"),
    "py:tap": ("game", "mouse_was_pressed()",
        ["[[mouse_was_pressed('left')|mouse_was_pressed]] is True for only the one loop the button goes down.",
         "One click, one thing - however long you hold it."],
        "if mouse_was_pressed('left'):"),
    "py:timer": ("py", "A timer counts",
        ["A [[timer]] changes by one every loop. 60 loops is one second.",
         "Set it, count it, check it, and reset it - or let it run out."],
        "self.timer += 1"),
    "py:bool": ("py", "True or False",
        ["A [[boolean]] has only two values: True and False.",
         "Like a light switch. Python writes them with a capital letter."],
        "self.visible = False"),
    "py:else": ("py", "else - otherwise",
        ["[[else]]: lines up with its if, and ends with a colon.",
         "Its lines run when nothing above it was true."],
        "else:"),
    "py:elif": ("py", "elif - else if",
        ["[[elif]] asks another question, only when every one above it was no.",
         "Python runs the first branch that is true, and skips the rest."],
        "elif number == 2:"),
    "py:and": ("py", "and - both at once",
        ["[[and]] joins two questions.",
         "The if runs only when BOTH are true."],
        "if fruitHit and mouse_is_pressed('left'):"),
    "py:equals": ("py", "== asks, = stores",
        ["One = puts a value into a name.",
         "Two == asks whether two things are exactly equal."],
        "if number == 1:"),
    "py:nested": ("py", "An if inside an if",
        ["The inside if only gets asked when the outside one is true.",
         "Its lines are pushed in eight spaces."],
        "    if fruitHit.tag == 'bomb':"),
    "py:destroy": ("game", "destroy() removes an object",
        ["[[destroy]](fruitHit) takes the fruit you sliced out of the game.",
         "destroy(self) removes the object whose code is running."],
        "destroy(fruitHit)"),
    "py:str": ("py", "str() turns a number into words",
        ["+ can add two numbers or join two pieces of words - not one of each.",
         "[[str]](game.score) turns 3 into '3'."],
        "self.scoreText.text = str(game.score)"),
    "py:int": ("py", "int() cuts to a whole number",
        ["[[int]](59.98) is 59: everything after the point is cut off.",
         "It does not round - int(7.9) is 7."],
        "str(int(game.timeLeft / 60))"),
    "py:divide": ("py", "/ divides",
        ["3600 / 60 is 60. * multiplies.",
         "Dividing can leave a part after the point: 3599 / 60 is 59.98..."],
        "game.timeLeft / 60"),
    "py:string": ("py", "Words in quotes",
        ["Writing in quotes is a value too, like 'orange' or 'red'.",
         "A [[variable]] can hold words as well as numbers."],
        "self.tag = 'orange'"),
    "py:join": ("py", "+ joins words",
        ["'pear' + '.png' is 'pear.png'.",
         "Both sides must be words - use [[str]]() on a number first."],
        "sprite(self.tag + '.png')"),
    "py:text": ("game", "text() writes on the screen",
        ["[[text]]('0', 0, 350) puts the words '0' on the screen, its top left corner at x 0, y 350.",
         "Change its .text and the words on the screen change."],
        "self.scoreText = text('0', 0, 350)"),
    "py:look": ("art", "Size and colour of words",
        [".fontSize is how big the [[text]] is; 30 to start with.",
         ".color is its colour, like 'red'."],
        "self.timeText.color = 'red'"),
    "py:import": ("py", "import brings in a toolbox",
        ["[[import]] random gives this code Python's random number tools.",
         "It goes at the very top of the code that uses it."],
        "import random"),
    "py:random": ("py", "random.randint() picks a number",
        ["[[random.randint(-500, 500)|random]] picks a whole number from -500 to 500.",
         "Both ends can be picked, and it is a different one each time."],
        "self.x = random.randint(-500, 500)"),
    "py:game": ("game", "game. reaches the Game",
        ["The Game class is made once and lasts the whole game.",
         "From any class, [[game]]. reaches it - the place for the score and the clock."],
        "game.score += 1"),
    "py:visible": ("art", "visible hides an object",
        ["[[visible]] = False means the object is never drawn.",
         "It still runs its start and its loop."],
        "self.visible = False"),
    "py:scale": ("art", "scale is size",
        ["[[scale]] 1 is the picture as you drew it; 0.5 is half; 0 is nothing.",
         "scaleX is the width and scaleY the height."],
        "self.scaleX -= 0.1"),
    "py:for": ("py", "for repeats",
        ["[[for]] step in range(20): runs the lines under it 20 times.",
         "step counts 0, 1, 2 ... 19 as it goes."],
        "for step in range(20):"),
    "py:animation": ("art", "An animation plays frames",
        ["[[animation]](sheet, 20, 0, 4) plays frames 0 to 4 of a sheet, 20 a second.",
         "animation_set(self, ...) gives it to this object."],
        "animation_set(self, explosionAnimation)"),
    "py:camera": ("game", "The camera",
        ["[[set_camera]](x, y) points the screen at another spot.",
         "(0, 0) looks at the middle, where it starts."],
        "set_camera(shakeX, shakeY)"),
    "py:sound": ("game", "sound() loads a sound",
        ["[[sound]]('woosh.mp3') finds the sound file and keeps it ready.",
         "Load it once, in start."],
        "self.wooshSound = sound('woosh.mp3')"),
    "py:play": ("game", "play_sound() plays it",
        ["[[play_sound]](self.wooshSound) plays the sound you loaded.",
         "As often as you like."],
        "play_sound(self.wooshSound)"),
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
    "py:sheet":      ("idea", "A sprite sheet", "A sprite sheet is many frames in one picture."),
    "py:make":       ("idea", "Making an object", ""),
    "py:dot":        ("idea", "The dot", "The dot reaches inside an object."),
    "py:coords":     ("word", "x and y", "x and y are where an object is on the screen."),
    "py:variable":   ("idea", "A variable", ""),
    "py:change":     ("word", "+= and -=", "+= adds to a value, and -= takes away."),
    "py:velocity":   ("idea", "Velocity", ""),
    "py:gravity":    ("idea", "Gravity", ""),
    "py:if":         ("word", "if", ""),
    "py:order":      ("idea", "Draw order", ""),
    "py:compare":    ("idea", "Comparing numbers", ""),
    "py:collision":  ("word", "get_collision()", ""),
    "py:local":      ("idea", "A name for right now", ""),
    "py:mouse":      ("word", "mouse_x() and mouse_y()", ""),
    "py:click":      ("word", "mouse_is_pressed()", ""),
    "py:tap":        ("word", "mouse_was_pressed()", ""),
    "py:timer":      ("idea", "A timer", ""),
    "py:bool":       ("word", "True and False", "A boolean is True or False."),
    "py:else":       ("word", "else", ""),
    "py:elif":       ("word", "elif", ""),
    "py:and":        ("word", "and", ""),
    "py:equals":     ("word", "==", "== asks whether two things are equal."),
    "py:nested":     ("idea", "An if inside an if", ""),
    "py:destroy":    ("word", "destroy()", ""),
    "py:str":        ("word", "str()", ""),
    "py:int":        ("word", "int()", ""),
    "py:divide":     ("word", "/", "/ divides one number by another."),
    "py:string":     ("idea", "Words in quotes", ""),
    "py:join":       ("idea", "Joining words", ""),
    "py:text":       ("word", "text()", ""),
    "py:look":       ("word", "fontSize and color", "fontSize and color change how words look."),
    "py:import":     ("word", "import", ""),
    "py:random":     ("word", "random.randint()", ""),
    "py:game":       ("word", "game.", "game. reaches the Game class from anywhere."),
    "py:visible":    ("word", "visible", ""),
    "py:scale":      ("word", "scaleX and scaleY", ""),
    "py:for":        ("word", "for", ""),
    "py:animation":  ("word", "animation()", ""),
    "py:camera":     ("word", "set_camera()", ""),
    "py:sound":      ("word", "sound()", ""),
    "py:play":       ("word", "play_sound()", ""),
}


def book_term(key):
    """One concept's box heading in the book: (label, name, lead). The build
    refuses to ship a concept with no entry, so this may raise."""
    kind, name, lead = BOOK_TERMS[key]
    return "New word" if kind == "word" else "New idea", name, lead

# The words you have to learn to read this game. Prose marks a term the first
# time it is used in its coding sense - [[loop]], or [[classes|class]] - and
# every slug a mark names must exist here. One sentence, second person, true of
# what you actually did.
GLOSSARY = {
    "class":   "A KIND of thing in your game - Fruit, Slicer, Trail. Every object is built from one, like a house from a blueprint.",
    "object":  "One thing built from a class: one orange, one piece of trail, one splash. You can see it and give it orders.",
    "sprite":  "The picture you drew, put onto an object. The name has to match exactly, including the .png.",
    "room":    "One screen of your game - Play and End. set_room picks which one you see, and removes everything from the room before.",
    "start":   "The part of an object that runs once, the moment it is made - for its picture, its place and its starting numbers.",
    "loop":    "The part of an object that runs over and over, about sixty times a second. Anything that moves or keeps checking lives here.",
    "variable": "A name that holds a value, like self.velocityY = 30 or self.tag = 'pear'. With self. in front it belongs to the object.",
    "velocity": "How far an object moves every loop. A fruit's velocityY starts at about 30 - 30 up, every loop.",
    "gravity": "Taking a little off a fruit's velocity every loop, so it slows, stops at the top and falls back faster and faster.",
    "timer":   "A number that changes by one every loop. The spawner's counts up; the trail's, the explosion's and the clock count down.",
    "if":      "Runs the lines under it only when its question is true. The if ends with a colon and the lines under it are pushed in four spaces.",
    "visible": "Whether an object is drawn. The spawner has visible = False - it works, but you never see it.",
    "boolean": "A value that is either True or False, like self.visible = False - a switch that is on or off.",
    "import":  "Brings one of Python's toolboxes into your code. import random lets you pick random numbers.",
    "random":  "random.randint(-500, 500) picks a whole number from -500 to 500, a different one each time - how each fruit picks where to start.",
    "destroy": "Takes an object out of the game for good. destroy(fruitHit) removes the fruit you sliced.",
    "mouse_x": "mouse_x() and mouse_y() give back where the mouse is right now. The slicer goes there every loop.",
    "get_collision": "Asks whether this object is touching one of a class. It gives back the thing it touches, or False.",
    "game":    "The Game class, made once and lasting the whole game. From any other class you reach its numbers as game.score.",
    "text":    "Words on the screen. text('0', 0, 350) writes 0 near the top; change its .text and the words change.",
    "str":     "Turns a number into words, so + can join it to other words: 'Your final score is: ' + str(game.score).",
    "elif":    "Short for else if. It asks another question, only when every question above it was no.",
    "else":    "Goes under an if, lined up with it. Its lines run when nothing above it was true.",
    "and":     "Joins two questions in one if. The slice runs only when you touch a fruit and the button is held.",
    "dot":     "The . between two names. fruitHit.tag means the tag that belongs to the fruit you hit.",
    "mouse_is_pressed": "True for every loop you hold the mouse button down. You only slice while it is.",
    "scale":   "How big a picture is drawn: 1 as you drew it, 0.5 half, 0 nothing. Each piece of trail shrinks to 0.",
    "int":     "Cuts a number down to a whole number: int(59.98) is 59. The clock shows whole seconds.",
    "for":     "Runs the lines under it a number of times. for step in range(20): runs them 20 times, step counting 0 to 19.",
    "mouse_was_pressed": "True for only the one loop the mouse button goes down - one woosh per click.",
    "sound":   "sound('woosh.mp3') loads a sound file once and keeps it ready under a name.",
    "play_sound": "Plays a sound you loaded with sound(). The slicer wooshes every time you click.",
    "animation": "A run of pictures shown one after another. animation(sheet, 20, 0, 4) plays frames 0 to 4 of a sprite sheet, 20 a second.",
    "camera":  "What the screen is looking at. Moving it makes everything on the screen seem to move the other way.",
    "set_camera": "set_camera(x, y) points the camera at a spot; set_camera(0, 0) looks at the middle again.",
}

# Animated metaphors. Reuses build.concept_visual's library - see SLIDE-RULES.
VISUALS = {
    "py:start": {"kind": "machine", "in": "object made", "label": "start", "out": "done once",
                 "cap": "[[start]] runs one time, then never again."},
    "py:loop": {"kind": "loop", "items": ["1", "2", "3", "4"],
                "cap": "[[loop]] runs again and again, about 60 times a second."},
    "py:room": {"kind": "swap", "off": "nothing", "on": "Play",
                "cap": "A [[room]] is one screen. set_room picks which one you see."},
    "py:sprite": {"kind": "swap", "off": "nothing", "on": "your art",
                  "cap": "[[sprite]]() puts the picture you drew onto the [[object]]."},
    "py:make": {"kind": "dom", "parent": "Play", "child": "a Fruit", "mode": "add",
                "cap": "Fruit() builds one from the blueprint."},
    "py:coords": {"kind": "resize", "axis": "h",
                  "cap": "y is up and down. Minus numbers go DOWN."},
    "py:variable": {"kind": "machine", "in": "30", "label": "self.velocityY", "out": "kept",
                    "cap": "A [[variable]] is a name that keeps a value for later."},
    "py:change": {"kind": "machine", "in": "y = 100", "label": "+= 30", "out": "y = 130",
                  "cap": "+= adds to what is already there."},
    "py:gravity": {"kind": "loop", "items": ["30", "29", "...", "-5"],
                   "cap": "[[gravity]] takes one off the velocity every loop."},
    "py:if": {"kind": "fork", "cond": "timer >= 100?", "yes": "make a fruit", "no": "keep counting",
              "cap": "[[if]] means only when - the pushed-in lines run only if it is true."},
    "py:collision": {"kind": "fork", "cond": "touching?", "yes": "slice it", "no": "carry on",
                     "cap": "[[get_collision]] answers with the fruit you touch, or False."},
    "py:mouse": {"kind": "event", "btn": "move the mouse", "action": "slicer follows",
                 "cap": "[[mouse_x]]() is where the mouse is, right now."},
    "py:click": {"kind": "event", "btn": "hold the button", "action": "slicing",
                 "cap": "[[mouse_is_pressed]] is True for as long as you hold it."},
    "py:tap": {"kind": "event", "btn": "click", "action": "one woosh",
               "cap": "[[mouse_was_pressed]] is True for one loop only - one click, one woosh."},
    "py:timer": {"kind": "loop", "items": ["10", "9", "...", "0"],
                 "cap": "The trail's [[timer]] counts down; at 0 it is gone."},
    "py:bool": {"kind": "swap", "off": "True", "on": "False",
                "cap": "A [[boolean]] is a switch: True or False."},
    "py:else": {"kind": "fork", "cond": "a bomb?", "yes": "score 0", "no": "score + 1",
                "cap": "[[else]] runs when the if is not true."},
    "py:elif": {"kind": "fork", "cond": "number 1?", "yes": "orange", "no": "ask: number 2?",
                "cap": "[[elif]] is asked only when the question above it was no."},
    "py:destroy": {"kind": "swap", "off": "a fruit", "on": "(gone)",
                   "cap": "[[destroy]] takes an object out of the game for good."},
    "py:int": {"kind": "machine", "in": "59.98", "label": "int()", "out": "59",
               "cap": "[[int]] cuts off everything after the point."},
    "py:join": {"kind": "machine", "in": "'pear'", "label": "+ '.png'", "out": "'pear.png'",
                "cap": "+ joins words together."},
    "py:text": {"kind": "swap", "off": "0", "on": "12",
                "cap": "Change a [[text]]'s .text and the screen changes."},
    "py:random": {"kind": "machine", "in": "-500 to 500", "label": "randint", "out": "217",
                  "cap": "[[random.randint|random]] picks a number - a different one each time."},
    "py:visible": {"kind": "swap", "off": "visible = True", "on": "visible = False",
                   "cap": "[[visible]] False hides the object, but it still runs."},
    "py:scale": {"kind": "resize", "axis": "w",
                 "cap": "[[scale]] shrinks the picture: 1 is full size, 0 is nothing."},
    "py:for": {"kind": "loop", "items": ["0", "1", "...", "19"],
               "cap": "[[for]] runs its lines once for every step: 0 up to 19."},
    "py:animation": {"kind": "loop", "items": ["0", "1", "2", "3", "4"],
                     "cap": "An [[animation]] shows its frames one after another."},
    "py:camera": {"kind": "swap", "off": "camera (0, 0)", "on": "camera (20, -10)",
                  "cap": "[[set_camera]] moves the view; everything seems to jolt."},
    "py:play": {"kind": "event", "btn": "click", "action": "a sound",
                "cap": "[[play_sound]] plays the sound you loaded."},
}

LINE_NOTES = {
    (FRUIT_START, "look"): ["Use the orange you drew."],
    (PLAY_START, "maker"): ["Build one fruit."],
    (3, PLAY_START, "maker"): ["CHANGED: build the spawner instead - it makes the fruit now."],
    (GAME_START, "setup"): ["Change to the Play room."],
    (BACK_START, "look"): ["Use the mountains you drew."],
    (PLAY_START, "back"): ["Build the background first, so it is drawn at the back."],
    (FRUIT_START, "launch"): [
        "Start 400 below the middle - off the bottom.",
        "Move up 30 every loop, to begin with.",
    ],
    (4, FRUIT_START, "launch"): [
        "Still start off the bottom.",
        "CHANGED: a speed from 25 to 35, different every fruit.",
    ],
    (FRUIT_LOOP, "fly"): [
        "Move up by the velocity...",
        "...and a little slower every loop - gravity.",
    ],
    (SPAWNER_START, "setup"): [
        "Start counting at 0.",
        "Wait 100 loops between fruit.",
        "Never draw me.",
    ],
    (SPAWNER_LOOP, "spawn"): [
        "One more loop counted.",
        "Counted far enough?",
        "Make a fruit...",
        "...and count from 0 again.",
    ],
    (FRUIT_START, "import"): ["At the VERY TOP: bring in Python's random toolbox."],
    (FRUIT_START, "place"): [
        "Anywhere from -500 to 500 across.",
        "Drift left, right, or not at all.",
    ],
    (FRUIT_LOOP, "drift"): ["Move sideways by the drift."],
    (FRUIT_LOOP, "gone"): [
        "Fallen off the bottom?",
        "Remove this fruit.",
    ],
    (SLICER_START, "look"): ["Use the white dot you drew."],
    (PLAY_START, "slicer"): ["Build the slicer."],
    (SLICER_LOOP, "follow"): [
        "Go to the mouse's x...",
        "...and its y.",
    ],
    (PLAY_START, "score"): [
        "No points yet - kept in game. so every class can reach it.",
        "Write 0 near the top of the screen.",
        "Big.",
    ],
    (SLICER_LOOP, "slice"): [
        "Which fruit am I touching, if any?",
        "Touching one?",
        "A point...",
        "...and the fruit is gone.",
    ],
    (PLAY_LOOP, "score"): ["Show the score, as words."],
    (6, FRUIT_START, "look"): [
        "NEW: roll a number from 1 to 5.",
        "NEW: a 1?",
        "NEW: an orange.",
        "NEW: otherwise, a 2?",
        "NEW: a watermelon.",
        "NEW: otherwise, a 3?",
        "NEW: an eggplant.",
        "NEW: otherwise, a 4?",
        "NEW: a pear.",
        "NEW: anything else...",
        "NEW: ...is a bomb.",
        "CHANGED: the picture is the tag plus '.png'.",
    ],
    (7, SLICER_LOOP, "slice"): [
        "Which fruit am I touching, if any?",
        "CHANGED: touching one AND holding the button?",
        "NEW: is it a bomb?",
        "NEW: then all your points are gone.",
        "NEW: otherwise...",
        "...a point.",
        "Slice it, bomb or fruit.",
    ],
    (TRAIL_START, "look"): ["The same white dot as the slicer."],
    (TRAIL_START, "timer"): ["Ten loops to live."],
    (TRAIL_LOOP, "fade"): [
        "One loop less.",
        "Run out?",
        "Remove this piece of trail.",
    ],
    (SLICER_LOOP, "trail"): [
        "Holding the button?",
        "Make a piece of trail...",
        "...at my x...",
        "...and my y.",
    ],
    (TRAIL_LOOP, "shrink"): [
        "A little narrower...",
        "...and a little shorter.",
    ],
    (PLAY_START, "clock"): [
        "A minute of loops: 60 times 60.",
        "Write 60 in the top left.",
        "Red.",
        "Smaller than the score.",
    ],
    (PLAY_LOOP, "clock"): [
        "One loop less.",
        "Loops into whole seconds, as words.",
    ],
    (END_START, "screen"): [
        "Say the game is over...",
        "...very big.",
        "Join the words and the score.",
        "Not quite so big.",
    ],
    (PLAY_LOOP, "over"): [
        "Time run out?",
        "Go to the End room.",
    ],
    (SLICER_LOOP, "previous"): [
        "Keep where I am, before I move...",
        "...across and up.",
    ],
    (SLICER_LOOP, "moved"): [
        "How far across I moved this loop.",
        "How far up.",
    ],
    (10, SLICER_LOOP, "trail"): [
        "Holding the button?",
        "NEW: twenty times, step going 0 to 19...",
        "...make a piece of trail...",
        "CHANGED: ...a step further along from where I was...",
        "CHANGED: ...across and up.",
    ],
    (SLICER_START, "sound"): ["Load the woosh once."],
    (SLICER_LOOP, "woosh"): [
        "Did the button just go down?",
        "Woosh.",
    ],
    (END_START, "hint"): [
        "Say how to play again...",
        "...a little smaller.",
    ],
    (END_LOOP, "restart"): [
        "A click?",
        "Back to Play - a fresh game.",
    ],
    (EXPLOSION_START, "look"): [
        "Cut the sheet into 2 rows of 3 frames.",
        "Play frames 0 to 4, 20 a second...",
        "...on this explosion.",
    ],
    (EXPLOSION_START, "timer"): ["Twenty loops to live."],
    (EXPLOSION_LOOP, "fade"): [
        "One loop less.",
        "Run out?",
        "Remove this explosion.",
    ],
    (12, SLICER_LOOP, "slice"): [
        "Which fruit am I touching, if any?",
        "Touching one and holding the button?",
        "Is it a bomb?",
        "All your points are gone...",
        "NEW: ...make an explosion...",
        "NEW: ...where the bomb is across...",
        "NEW: ...and up.",
        "Otherwise...",
        "...a point.",
        "Slice it, bomb or fruit.",
    ],
    (SPLASH_START, "look"): [
        "The sliced fruit's sheet: 2 rows of 4 frames.",
        "Play frames 0 to 7, 35 a second...",
        "...on this splash.",
    ],
    (SPLASH_START, "timer"): ["Sixteen loops to live."],
    (SPLASH_LOOP, "fade"): [
        "One loop less.",
        "Run out?",
        "Remove this splash.",
    ],
    (13, SLICER_LOOP, "slice"): [
        "Which fruit am I touching, if any?",
        "Touching one and holding the button?",
        "Is it a bomb?",
        "All your points are gone...",
        "...make an explosion...",
        "...where the bomb is across...",
        "...and up.",
        "Otherwise...",
        "...a point...",
        "NEW: ...leave its kind for the splash FIRST...",
        "NEW: ...then make the splash...",
        "NEW: ...where the fruit is across...",
        "NEW: ...and up.",
        "Slice it, bomb or fruit.",
    ],
    (EXPLOSION_LOOP, "import"): ["At the VERY TOP: bring in Python's random toolbox."],
    (EXPLOSION_LOOP, "shake"): [
        "Somewhere up to 30 left or right...",
        "...and up to 30 up or down.",
        "Point the camera there.",
    ],
    (14, EXPLOSION_LOOP, "fade"): [
        "One loop less.",
        "Run out?",
        "NEW: put the camera back on the middle...",
        "...and remove this explosion.",
    ],
    (SPAWNER_LOOP, "rate"): [
        "Under 5 points?",
        "A fruit every 100 loops.",
        "Otherwise, under 20?",
        "Every 60.",
        "Otherwise, under 30?",
        "Every 30.",
        "30 or more...",
        "...every 15.",
    ],
    (15, FRUIT_START, "look"): [
        "CHANGED: roll a number from 1 to 6.",
        "A 1?",
        "An orange.",
        "Otherwise, a 2?",
        "A watermelon.",
        "Otherwise, a 3?",
        "An eggplant.",
        "Otherwise, a 4?",
        "A pear.",
        "NEW: otherwise, a 5?",
        "NEW: treasure.",
        "Anything else...",
        "...is a bomb.",
        "The picture is the tag plus '.png'.",
    ],
    (PLAY_START, "bonus"): [
        "A treasure is worth 300 loops - five seconds.",
        "The clock never holds more than a minute.",
    ],
    (15, SLICER_LOOP, "slice"): [
        "Which fruit am I touching, if any?",
        "Touching one and holding the button?",
        "Is it a bomb?",
        "All your points are gone...",
        "...make an explosion...",
        "...where the bomb is across...",
        "...and up.",
        "Otherwise...",
        "...a point...",
        "...leave its kind for the splash first...",
        "...then make the splash...",
        "...where the fruit is across...",
        "...and up.",
        "NEW: and if it is treasure...",
        "NEW: ...add the bonus to the clock.",
        "NEW: Gone past the most allowed?",
        "NEW: Cut it back to the most allowed.",
        "Slice it, bomb or fruit.",
    ],
}

# A note for a slide that strikes lines out. Keyed (week, panel, block) when one
# block changes in more than one week, so each week's says what that week does.
DELETE_NOTES = {
    (3, PLAY_START, "maker"): "The room no longer makes the fruit - the spawner will. Take this line out; the spawner goes in its place.",
    (4, FRUIT_START, "launch"): "This line changes - the speed is picked at random. Take it out; the new line goes in its place.",
    (6, FRUIT_START, "look"): "Every fruit is not an orange any more. Take this line out; the roll for a kind goes in its place.",
    (7, SLICER_LOOP, "slice"): "This line changes - the if asks a second question. Take it out; the new if goes in its place.",
    (10, SLICER_LOOP, "trail"): "These lines change - each trail goes a step along the swipe. Take them out; the new ones go in their place.",
    (15, FRUIT_START, "look"): "This line changes - the dice now has six sides. Take it out; the new line goes in its place.",
}


# --- what pressing Play should show you -------------------------------------
#
# One line per step, keyed (week, panel, block). A step that changes nothing
# you can see says so, so working code is never mistaken for broken code.
CHECKS = {
    (1, FRUIT_START, "look"):
        "Nothing to see yet - you have described a fruit, but nothing goes to Play. "
        "You are checking there is no red error.",
    (1, PLAY_START, "maker"):
        "Still nothing - nothing goes to Play yet.",
    (1, GAME_START, "setup"):
        "Your orange appears in the middle of a black screen.",
    (1, BACK_START, "look"):
        "No change - no Background has been made yet.",
    (1, PLAY_START, "back"):
        "The mountains fill the screen, with the orange in front.",
    (2, FRUIT_START, "launch"):
        "The orange sits near the bottom of the screen, half off it.",
    (2, FRUIT_LOOP, "fly"):
        "The orange leaps up, slows, hangs near the middle, falls back down and off the "
        "bottom.",
    (3, SPAWNER_START, "setup"):
        "No change - nothing has made a spawner yet.",
    (3, SPAWNER_LOOP, "spawn"):
        "No change - nothing has made a spawner yet.",
    (3, PLAY_START, "maker"):
        "Every couple of seconds an orange leaps up from the same spot.",
    (4, FRUIT_START, "import"):
        "No change - nothing uses random yet.",
    (4, FRUIT_START, "launch"):
        "Each orange leaps to a different height.",
    (4, FRUIT_START, "place"):
        "Each orange starts somewhere new along the bottom - but still goes straight up.",
    (4, FRUIT_LOOP, "drift"):
        "Each orange drifts its own way as it flies.",
    (4, FRUIT_LOOP, "gone"):
        "No change you can see - each orange is now removed once it falls off the bottom.",
    (5, SLICER_START, "look"):
        "No change - nothing has made a slicer yet.",
    (5, PLAY_START, "slicer"):
        "A white dot sits in the middle of the screen.",
    (5, SLICER_LOOP, "follow"):
        "Move the mouse over the game. The white dot follows it.",
    (5, PLAY_START, "score"):
        "A big 0 appears near the top.",
    (5, SLICER_LOOP, "slice"):
        "Touch an orange with the mouse. It vanishes - but the 0 does not change.",
    (5, PLAY_LOOP, "score"):
        "Touch an orange. It vanishes and the score at the top goes up by one.",
    (6, FRUIT_START, "look"):
        "Oranges, watermelons, eggplants, pears and bombs all leap up.",
    (7, SLICER_LOOP, "slice"):
        "Waving does nothing; hold the button to slice. Slice a bomb and the score goes "
        "back to 0.",
    (8, TRAIL_START, "look"):
        "No change - nothing makes a trail yet.",
    (8, TRAIL_START, "timer"):
        "No change - nothing makes a trail yet.",
    (8, TRAIL_LOOP, "fade"):
        "No change - nothing makes a trail yet.",
    (8, SLICER_LOOP, "trail"):
        "Hold the button and move. A short trail of dots follows the blade.",
    (8, TRAIL_LOOP, "shrink"):
        "Swipe slowly. The trail tapers to a point behind the blade.",
    (9, PLAY_START, "clock"):
        "A red 60 appears in the top left. It does not change yet.",
    (9, PLAY_LOOP, "clock"):
        "The 60 counts down, one a second - and keeps going below 0.",
    (9, END_START, "screen"):
        "No change - nothing goes to End yet.",
    (9, PLAY_LOOP, "over"):
        "Wait out the minute. Game Over appears with your score.",
    (10, SLICER_LOOP, "previous"):
        "No change - nothing uses it yet.",
    (10, SLICER_LOOP, "moved"):
        "No change - nothing uses it yet.",
    (10, SLICER_LOOP, "trail"):
        "Swipe as fast as you can. The trail is one smooth line, with no gaps.",
    (11, SLICER_START, "sound"):
        "No change - nothing plays the sound yet.",
    (11, SLICER_LOOP, "woosh"):
        "Click. One woosh - or one beep - each time the button goes down.",
    (11, END_START, "hint"):
        "Wait out the minute. Click to play again is under your score - but clicking "
        "does nothing yet.",
    (11, END_LOOP, "restart"):
        "Wait out the minute, then click. A new game starts at 0 with a full clock.",
    (12, EXPLOSION_START, "look"):
        "No change - nothing makes an explosion yet.",
    (12, EXPLOSION_START, "timer"):
        "No change - nothing makes an explosion yet.",
    (12, EXPLOSION_LOOP, "fade"):
        "No change - nothing makes an explosion yet.",
    (12, SLICER_LOOP, "slice"):
        "Slice a bomb. It bursts into your explosion, and the score goes to 0.",
    (13, SPLASH_START, "look"):
        "No change - nothing makes a splash yet.",
    (13, SPLASH_START, "timer"):
        "No change - nothing makes a splash yet.",
    (13, SPLASH_LOOP, "fade"):
        "No change - nothing makes a splash yet.",
    (13, SLICER_LOOP, "slice"):
        "Slice a fruit. It bursts into a splash of its own colour.",
    (14, EXPLOSION_LOOP, "import"):
        "No change - nothing uses random yet.",
    (14, EXPLOSION_LOOP, "shake"):
        "Slice a bomb. The screen shakes - and stays a little off when it stops.",
    (14, EXPLOSION_LOOP, "fade"):
        "Slice a bomb. The screen shakes, then settles back where it was.",
    (14, SPAWNER_LOOP, "rate"):
        "Score 5 and the fruit comes faster; score 20 and faster again.",
    (15, FRUIT_START, "look"):
        "Treasure leaps up now and then. Slicing it scores a point and splashes - nothing "
        "else yet.",
    (15, PLAY_START, "bonus"):
        "No change - nothing uses the bonus yet.",
    (15, SLICER_LOOP, "slice"):
        "Wait until the clock is below 50, then slice a treasure. The clock jumps up five "
        "seconds - but never past 60.",
}


def check_for(week_n, panel, block):
    """What to look for after Play, for one step. The build refuses to ship a
    step that has no line, so this may raise rather than return nothing."""
    return CHECKS[(week_n, panel, block)]

QUIZZES = {
    (1, PLAY_START, "back"): [
        {"q": "What is a class?",
         "options": ["A blueprint for a kind of thing", "One orange on the screen",
                     "A picture", "A room"], "answer": 0,
         "why": "A class is the blueprint; every orange is an object built from it."},
        {"q": "When does start run?",
         "options": ["Once, the moment the object is made", "Sixty times a second",
                     "When you click", "Never"], "answer": 0,
         "why": "start runs once; loop runs over and over."},
        {"q": "Why is the background made first? (this week)",
         "options": ["So it is drawn at the back", "So it loads faster",
                     "Python needs it first", "So it is bigger"], "answer": 0,
         "why": "Objects are drawn in the order they are made."},
    ],
    (2, FRUIT_LOOP, "fly"): [
        {"q": "Where is x 0, y 0?",
         "options": ["The middle of the screen", "The top left", "The bottom left",
                     "The top right"], "answer": 0,
         "why": "0, 0 is the middle; plus x is right and plus y is up."},
        {"q": "y is 10. What is it after self.y += 5?",
         "options": ["15", "5", "10", "105"], "answer": 0,
         "why": "+= adds 5 to what is already there."},
        {"q": "Why does the fruit come back down? (this week)",
         "options": ["Its velocity shrinks every loop until it is below 0",
                     "The editor pulls everything down", "y can not be more than 100",
                     "The loop stops"], "answer": 0,
         "why": "velocityY -= 1 every loop: 30, 29 ... 0, then minus - down."},
    ],
    (3, PLAY_START, "maker"): [
        {"q": "velocityY starts at 30 and loses 1 every loop. When does the fruit start to fall?",
         "options": ["After about 30 loops", "Straight away", "After 1 loop",
                     "Never"], "answer": 0,
         "why": "It takes 30 loops to use up a velocity of 30."},
        {"q": "What are the four parts of a timer?",
         "options": ["Set, count, check, reset", "Start, loop, stop, go",
                     "Make, move, hide, show", "if, elif, else, end"], "answer": 0,
         "why": "Set it in start, count it in loop, check it with an if, reset it."},
        {"q": "What happens without self.timer = 0 under the if? (this week)",
         "options": ["A fruit every loop - a flood", "No fruit at all",
                     "One fruit, then none", "An error"], "answer": 0,
         "why": "The timer stays past 100, so the if is true every loop."},
    ],
    (4, FRUIT_LOOP, "gone"): [
        {"q": "What does self.visible = False do to the spawner?",
         "options": ["Hides it - it still runs", "Stops it", "Removes it",
                     "Makes it see-through"], "answer": 0,
         "why": "An invisible object still runs its start and loop."},
        {"q": "What can random.randint(1, 3) give you?",
         "options": ["1, 2 or 3", "1 or 2", "Any number", "0, 1, 2 or 3"], "answer": 0,
         "why": "Both ends can be picked."},
        {"q": "Why destroy a fruit that falls off the bottom? (this week)",
         "options": ["It still runs its loop - hundreds would slow the game",
                     "It would come back up", "It costs a point", "Python needs it"], "answer": 0,
         "why": "An object nobody can see still costs time sixty times a second."},
    ],
    (5, PLAY_LOOP, "score"): [
        {"q": "A fruit is at y -400. Is it destroyed by if self.y < -500?",
         "options": ["No - -400 is not less than -500", "Yes", "Only if it is falling",
                     "It is an error"], "answer": 0,
         "why": "-400 is above -500."},
        {"q": "What does get_collision(self, 'Fruit') give back?",
         "options": ["The fruit you touch, or False", "True or False only",
                     "How many fruit you touch", "The slicer"], "answer": 0,
         "why": "It gives the fruit itself, so you can destroy it."},
        {"q": "Why is the score game.score and not self.score? (this week)",
         "options": ["The slicer changes it and the room shows it - both can reach game.",
                     "self. is not allowed in a room", "It is shorter",
                     "game. is faster"], "answer": 0,
         "why": "self. belongs to one object; game. is reached from every class."},
    ],
    (6, FRUIT_START, "look"): [
        {"q": "Why does the score line say str(game.score)?",
         "options": ["A text holds words, and str() turns the number into words",
                     "To make it bigger", "To add one", "It does not need it"], "answer": 0,
         "why": "str(3) is '3'."},
        {"q": "What is the difference between = and ==?",
         "options": ["= stores a value; == asks whether two are equal",
                     "There is none", "== stores twice", "= asks; == stores"], "answer": 0,
         "why": "One = puts a value into a name; two == ask a question."},
        {"q": "number is 3. Which branch runs? (this week)",
         "options": ["The eggplant", "The orange, then the eggplant",
                     "Every branch", "The bomb"], "answer": 0,
         "why": "Python runs the first branch that is true and skips the rest."},
    ],
    (7, SLICER_LOOP, "slice"): [
        {"q": "self.tag is 'pear'. What does sprite(self.tag + '.png') look for?",
         "options": ["pear.png", "self.tag.png", "tag.png", "pear"], "answer": 0,
         "why": "+ joins the words: 'pear' + '.png'."},
        {"q": "When does an if with and run?",
         "options": ["When both questions are true", "When either is true",
                     "When neither is", "Always"], "answer": 0,
         "why": "and needs both."},
        {"q": "Without the else, what is the score after slicing a bomb? (this week)",
         "options": ["1", "0", "The same as before", "-1"], "answer": 0,
         "why": "It is set to 0, then the next line adds 1."},
    ],
    (8, TRAIL_LOOP, "shrink"): [
        {"q": "Why must the fruit keep its kind in self.tag, not just tag?",
         "options": ["So the slicer can read it as fruitHit.tag", "tag is not allowed",
                     "It is faster", "To change its picture"], "answer": 0,
         "why": "A name without self. lives only inside Fruit start."},
        {"q": "What is scale 0?",
         "options": ["Nothing - too small to see", "The size you drew it",
                     "Twice the size", "Upside down"], "answer": 0,
         "why": "1 is full size, 0.5 half, 0 nothing."},
        {"q": "Why does a fast swipe leave gaps in the trail? (this week)",
         "options": ["One trail is made each loop, and the mouse moves far between loops",
                     "The timer is too short", "The picture is too small",
                     "It is a bug in the editor"], "answer": 0,
         "why": "Week 10 fills the gaps."},
    ],
    (9, PLAY_LOOP, "over"): [
        {"q": "How long does a piece of trail last with self.timer = 10?",
         "options": ["Ten loops - a sixth of a second", "Ten seconds", "One loop",
                     "For ever"], "answer": 0,
         "why": "One less every loop; at 0 it is gone."},
        {"q": "What is int(7.9)?",
         "options": ["7", "8", "7.9", "79"], "answer": 0,
         "why": "int() cuts off everything after the point."},
        {"q": "How many loops is one minute? (this week)",
         "options": ["3600", "60", "600", "1000"], "answer": 0,
         "why": "60 loops a second, 60 seconds."},
    ],
    (10, SLICER_LOOP, "trail"): [
        {"q": "Why does 'Your final score is: ' + str(game.score) need str()?",
         "options": ["+ can not join words and a number", "To round it",
                     "To make it red", "It does not"], "answer": 0,
         "why": "Both sides of + must be words to join them."},
        {"q": "What numbers does step take in for step in range(3):?",
         "options": ["0, 1 and 2", "1, 2 and 3", "0, 1, 2 and 3", "3"], "answer": 0,
         "why": "range(3) counts from 0, three times."},
        {"q": "Why is previousX kept at the very top of Slicer loop? (this week)",
         "options": ["Before the slicer moves, so it is where it WAS",
                     "Python needs it first", "So it is always 0",
                     "To make the slicer faster"], "answer": 0,
         "why": "Kept after the move, it would be the same as self.x."},
    ],
    (11, END_LOOP, "restart"): [
        {"q": "What is trail.x when step is 0?",
         "options": ["previousX - where the slicer was", "self.x", "0", "speedX"], "answer": 0,
         "why": "speedX * 0 / 20 is 0, so it is just previousX."},
        {"q": "Which is True for only one loop?",
         "options": ["mouse_was_pressed", "mouse_is_pressed", "mouse_x", "Both"], "answer": 0,
         "why": "was is the click; is is every loop you hold."},
        {"q": "Why does going back to Play start a fresh game? (this week)",
         "options": ["Play start sets the score and the clock again",
                     "The editor remembers nothing", "End deletes the score",
                     "The Game class starts again"], "answer": 0,
         "why": "Going to a room runs its start again."},
    ],
    (12, SLICER_LOOP, "slice"): [
        {"q": "Why one woosh per click, not one per loop?",
         "options": ["mouse_was_pressed is True for one loop only",
                     "Sounds can only play once", "The sound is short",
                     "play_sound waits"], "answer": 0,
         "why": "was is the click; is would be sixty a second."},
        {"q": "sprite('explosion.png', 2, 3) - what are 2 and 3?",
         "options": ["Rows, then columns", "Columns, then rows",
                     "The size", "The first and last frame"], "answer": 0,
         "why": "2 rows of 3 frames."},
        {"q": "Why are the explosion lines above destroy(fruitHit)? (this week)",
         "options": ["They read the bomb's x and y - it must still be there",
                     "Python reads from the bottom", "It does not matter",
                     "So the bomb explodes twice"], "answer": 0,
         "why": "Make the new object before you destroy the old one."},
    ],
    (13, SLICER_LOOP, "slice"): [
        {"q": "animation(sheet, 20, 0, 4) - how many frames does it play?",
         "options": ["5", "4", "20", "24"], "answer": 0,
         "why": "0, 1, 2, 3 and 4."},
        {"q": "game.splashTag is 'orange'. Which sheet does the splash load?",
         "options": ["orangeSplash.png", "orange.png", "Splash.png",
                     "splashTag.png"], "answer": 0,
         "why": "'orange' + 'Splash.png'."},
        {"q": "Why is game.splashTag set BEFORE Splash()? (this week)",
         "options": ["Splash's start reads it, and start runs the moment Splash() is called",
                     "Python needs it first", "To make it faster",
                     "It does not matter"], "answer": 0,
         "why": "After would be too late - start has already run."},
    ],
    (14, SPAWNER_LOOP, "rate"): [
        {"q": "Why one Splash class and not four?",
         "options": ["They only differ in their picture, built from the tag",
                     "Python allows only one", "Four would be slower",
                     "Splash is a special name"], "answer": 0,
         "why": "One class with a chosen picture beats four copies."},
        {"q": "Why set_camera(0, 0) before destroy(self)?",
         "options": ["To put the view back - or it stays shifted",
                     "To make it shake more", "To destroy the camera",
                     "It is not needed"], "answer": 0,
         "why": "Nothing else puts the camera back."},
        {"q": "Score is 20. What is spawnTime? (this week)",
         "options": ["30", "60", "100", "15"], "answer": 0,
         "why": "Not < 5, not < 20, but < 30 - the first yes."},
    ],
    (15, SLICER_LOOP, "slice"): [
        {"q": "Score is 4. What is spawnTime?",
         "options": ["100", "60", "30", "15"], "answer": 0,
         "why": "4 is under 5 - the first question is yes."},
        {"q": "Where does a new kind of fruit go in the chain?",
         "options": ["An elif above the else", "After the else", "Before the if",
                     "In the slicer"], "answer": 0,
         "why": "else stays last, catching what is left."},
        {"q": "timeLeft is 3500 and you slice treasure (+300, most 3600). What is it after? (this week)",
         "options": ["3600", "3800", "3500", "300"], "answer": 0,
         "why": "3800 is over the most allowed, so it is cut back to 3600."},
    ],
}

# Every week explains each line it adds, one slide per line.
EXPANDED_WEEKS = set(range(1, 16))
