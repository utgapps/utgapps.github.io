"""PY101 - Space Shooter. The whole course as one data structure.

This is the only file to edit. ../pxp101/build.py replays WEEKS to produce the
playable milestones, the teacher curriculum, the textbook, the homework book
and the slides, so none of them can drift apart. Run `python build.py` here.

WHERE THIS COMES FROM

The UTG PY101 guide: sixteen days of building a space shooter in PixelPad, for
students around grade five or six who have never written code. The game, its
classes and its order are the guide's. Fifteen weeks hold the sixteen days -
days 1 and 2 are one week, both being "see the game, make your first class".

WHAT CHANGED FROM THE GUIDE, AND WHY

  * The guide types a line and deletes it a day later several times over: a
    ship placed at x 600 then moved, asteroids made in start and then removed,
    a background added on top and then reordered, print() timers taken out
    again. Here a name and a line are written once, where they will stay. The
    one rewrite kept is week 10's, where a hit stops destroying the ship and
    costs health instead - that deletion IS the lesson.
  * The guide switches to the End room from the Spaceship's own loop. A room
    change destroys the object that asked for it, mid-loop, so here the Space
    room watches the player's health and switches itself.
  * Health is shown on the screen with a text label rather than print(), so
    every week ends on something you can see.
  * The guide uses new_object('Spaceship') and new_sprite(...). This uses
    Spaceship() and sprite(...), as PXP101 does - the same calls, the form the
    engine documents, and the one the classroom editor runs.
"""

import re

import pixelpad

COURSE_CODE = "PY101"
TOOL = "py101"
AUDIENCE = "ten-to-twelve-year-olds"

# The guide's busiest day types about twenty lines. A week may not add more.
WEEK_LINE_CAP = 20
# One step shows at most this many lines before it stops to explain.
MAX_STEP_LINES = 6
# Indentation and one-line ifs - see pixelpad.check_python_rules.
check_code_rules = pixelpad.check_python_rules

DRAW_SIZE_NOTE = ("Draw it at this size. Two of them get resized by the code &mdash; "
                  "the asteroid and the boss's ray &mdash; and that is a lesson of its own.")

CODE_HEADS = {"get_collision": "get_collision()", "key_is_pressed": "key_is_pressed()",
              "key_was_pressed": "key_was_pressed()", "destroy": "destroy()",
              "text": "text()", "str": "str()"}

COURSE_TITLE = "PY101 · Space Shooter"
COURSE_BLURB = (
    "Fifteen weeks building a real space shooter in Python. You fly the ship, you write "
    "every line, and each week the game gets something new: falling rocks, lasers, health, "
    "enemies that shoot back, and a boss."
)
PROJECT_BLURB = (
    "A ship you fly with W A S D through a storm of asteroids and enemy ships. It fires "
    "lasers, loses and wins back health, ends on a Game Over screen, and finishes with a "
    "boss and its death ray."
)

TOTAL_WEEKS = 15

# The finished game is about 155 lines. This is the ceiling, not a target.
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
questions - which class does this belong to, start or loop, what is the trigger - and every
hour here keeps at least three of them. Let a student answer before the slide does.</p>
<p><strong>Press Play constantly.</strong> Every step ends at a Play, and the book says what
should happen when they press it - including the steps where nothing visible changes yet.</p>
<p><strong>Indentation is the rule to be strict about.</strong> Four spaces, only after a
line ending in a colon. Most errors in the first month are a missing colon, a missing
<code>self.</code> or a capital letter: read the red message together and find its line.</p>
<p><strong>Pacing.</strong> A week that runs long drops its bonus, never its Play moments.
The busiest weeks (9, 13, 14) are about twenty lines; give them the whole hour.</p>
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
SHIP_START, SHIP_LOOP = "Spaceship start", "Spaceship loop"
ROCK_START, ROCK_LOOP = "Asteroid start", "Asteroid loop"
ENEMY_START, ENEMY_LOOP = "Enemy start", "Enemy loop"
BACK_START = "Background start"
LASER_START, LASER_LOOP = "Projectile start", "Projectile loop"
PICKUP_START, PICKUP_LOOP = "HealthPickup start", "HealthPickup loop"
SHOT_START, SHOT_LOOP = "EnemyProjectile start", "EnemyProjectile loop"
BOSS_START, BOSS_LOOP = "Boss start", "Boss loop"
RAY_START, RAY_LOOP = "BossRay start", "BossRay loop"
SPACE_START, SPACE_LOOP = "Space start", "Space loop"
END_START, END_LOOP = "End start", "End loop"

PANELS = [GAME_START,
          SHIP_START, SHIP_LOOP,
          ROCK_START, ROCK_LOOP,
          ENEMY_START, ENEMY_LOOP,
          BACK_START,
          LASER_START, LASER_LOOP,
          PICKUP_START, PICKUP_LOOP,
          SHOT_START, SHOT_LOOP,
          BOSS_START, BOSS_LOOP,
          RAY_START, RAY_LOOP,
          SPACE_START, SPACE_LOOP,
          END_START, END_LOOP]

# Space is where the game happens; End arrives in week 10.
ROOMS = ["Space", "End"]

ORDER = {
    GAME_START: ["setup"],
    SHIP_START: ["look", "speed", "health"],
    SHIP_LOOP: ["sideways", "updown", "shoot", "rockHits", "enemyHits", "heal", "zapped", "rayed"],
    ROCK_START: ["look", "scale", "speed"],
    ROCK_LOOP: ["fall", "spin", "gone"],
    ENEMY_START: ["imports", "look", "speed", "drift", "shooting"],
    ENEMY_LOOP: ["fall", "drift", "shoot", "gone"],
    BACK_START: ["look"],
    LASER_START: ["look"],
    LASER_LOOP: ["fly", "rocks", "enemies", "gone"],
    PICKUP_START: ["look"],
    PICKUP_LOOP: ["fall", "gone"],
    SHOT_START: ["look"],
    SHOT_LOOP: ["fly", "gone"],
    BOSS_START: ["look", "speed", "health", "ray"],
    BOSS_LOOP: ["hover", "ray", "hit"],
    RAY_START: ["look"],
    RAY_LOOP: ["fall", "gone"],
    # The background is made first so it is drawn first, at the back - which
    # is why week 5 types it at the very top, above week 1's lines.
    SPACE_START: ["back", "make", "rock", "enemy", "timers", "hud"],
    SPACE_LOOP: ["imports", "asteroids", "pickups", "enemies", "boss", "hud", "over"],
    END_START: ["message"],
    END_LOOP: [],
}

# name -> (stand-in colour, width, height) as the student draws it.
SPRITES = {
    "ship.png": ("cyan", 64, 64),
    "asteroid.png": ("brown", 100, 100),
    "enemy.png": ("red", 56, 56),
    "space.png": ("purple", 1280, 720),
    "laser.png": ("yellow", 8, 24),
    "pickup.png": ("green", 40, 40),
    "enemyLaser.png": ("orange", 8, 24),
    "boss.png": ("gray", 160, 100),
    "ray.png": ("white", 20, 60),
}


WEEKS = [

# ---------------------------------------------------------------- week 1 ----
{
 "n": 1,
 "title": "Your ship on the screen",
 "big_idea": "Every game is built from objects. Today you make a Spaceship [[class]] and an Asteroid class, give each one a [[sprite]], and put one of each into your first [[room]].",
 "new_concepts": ["class", "object", "sprite", "room", "start"],
 "draw": ["ship.png", "asteroid.png"],
 "objectives": [
   "Say what a [[class]] is, and what an [[object]] made from it is",
   "Give a class its picture with [[sprite]]()",
   "Make an object inside a [[room]] and see it appear",
   "Read a red error message and find the line it names",
 ],
 "ops": [
  ADD(GAME_START, "setup", [
    "set_room('Space')",
  ]),
  ADD(SHIP_START, "look", [
    "self.image = sprite('ship.png')",
  ]),
  ADD(SPACE_START, "make", [
    "self.player = Spaceship()",
  ]),
  ADD(ROCK_START, "look", [
    "self.image = sprite('asteroid.png')",
  ]),
  ADD(SPACE_START, "rock", [
    "self.rock = Asteroid()",
  ]),
 ],
 "flow": [
  TALK("0:00", "Play the game you are going to build",
       "<p>Open the week 15 page and play the finished Space Shooter on the board for two "
       "minutes. Fly with W A S D, fire with space, take a hit or two.</p>",
       "<p>Say the promise: <em>every line of that game, you are going to write.</em></p>",
       ask=("What different things can you see on the screen?",
            "The ship, rocks, enemies, lasers, pickups - each one is a different class")),
  TALK("0:08", "Classes and objects",
       "<p>A [[class]] is a kind of thing - a recipe. An [[object]] is one thing made from "
       "it. Asteroid is a class; every rock on the screen is an Asteroid object.</p>",
       "<p>In the editor, make two classes, <strong>Spaceship</strong> and "
       "<strong>Asteroid</strong>, and a room called <strong>Space</strong>. Capitals "
       "matter.</p>",
       ask=("If Asteroid is the class, what is each rock on the screen?",
            "An object - one thing made from the Asteroid class")),
  TALK("0:14", "Draw your pictures",
       "<p>Make <code>ship.png</code> at 64 by 64 and <code>asteroid.png</code> at 100 by "
       "100. The asteroid is drawn big on purpose: next week the code shrinks it.</p>",
       "<p>Ten minutes at most. They can improve the art any week.</p>"),
  STEP(GAME_START, "setup", "Pick the first screen",
       ["A [[room]] is one screen of your game. This line, in Game start, picks the first "
        "screen to show: the one called Space."],
       at="0:25"),
  STEP(SHIP_START, "look", "Give the ship its picture",
       ["[[start]] runs ONCE, the moment a spaceship is made. <code>sprite('ship.png')</code> "
        "finds the picture you drew and makes it this ship's image."],
       at="0:28",
       ask=("Why does this go in start and not loop?", "The ship only needs its picture set once")),
  STEP(SPACE_START, "make", "Make your ship",
       ["<code>Spaceship()</code> makes one spaceship. <code>self.player</code> is the name the "
        "room keeps it under, so you can talk to it later. Press Play - your ship is in the "
        "middle of the screen."],
       at="0:32"),
  STEP(ROCK_START, "look", "Give the rock its picture",
       ["The same idea for the rock: its start gives it the asteroid picture."],
       at="0:38"),
  STEP(SPACE_START, "rock", "Make a rock",
       ["Make one asteroid and keep it as <code>self.rock</code>. Press Play - it sits right on "
        "top of your ship."],
       at="0:41",
       ask=("Why are they both in the middle?",
            "Nobody has told them where to go - every object starts at 0, 0")),
  TALK("0:50", "Show each other",
       "<p>Everyone turns their screen to a neighbour for thirty seconds. Every ship is "
       "different, and that is the point.</p>"),
 ],
 "errors": [
   ("Nothing appears", "Space start is empty, or the class name has a typo. Spaceship() must match the class name exactly, capital S included."),
   ("A grey box instead of your picture", "The picture is not called ship.png. The name in sprite('ship.png') and the sprite's own name must match, .png included."),
   ("NameError: name 'spaceship' is not defined", "Python cares about capitals. The class is Spaceship, so you write Spaceship() with a capital S."),
   ("The screen stays blank and there is no error", "Game start must say set_room('Space'), and the room must be called Space exactly."),
 ],
 "recap": [
   "A [[class]] is a kind of thing; an [[object]] is one thing made from it.",
   "[[start]] runs once, the moment an object is made.",
   "[[sprite]]() puts the picture you drew onto an object.",
   "Spaceship() makes one spaceship; self.player is the name you keep it under.",
 ],
 "homework": [
   {"task": "Make the ship yours", "detail": "Redraw ship.png so it looks like a ship you would want to fly. Keep it 64 by 64.", "done": "You press Play and your own ship is on the screen."},
   {"task": "Name the classes", "detail": "Write down every class you saw in the finished game, and one thing each one does.", "done": "You have a list of at least five classes."},
 ],
 "bonus": {"title": "Two rocks",
           "body": "<p>Under the rock line in <strong>Space start</strong>, add "
                   "<code>self.rock2 = Asteroid()</code>. Press Play. How many rocks can you see? "
                   "(Two - but in exactly the same spot. Next week you learn to move them.)</p>"},
 "slides": [
   {"title": "Space Shooter", "sub": "The game you are going to build", "bullets": [
     "You fly the ship with W A S D", "Rocks and enemies come at you", "Space fires your laser",
     "A boss arrives at the end"]},
   {"title": "Classes and objects", "sub": "One recipe, many things", "bullets": [
     "A class is a kind of thing: Spaceship, Asteroid", "An object is one thing made from it",
     "Every rock on the screen is an Asteroid object"]},
   {"title": "Draw your pictures", "sub": "ship.png 64 x 64 - asteroid.png 100 x 100", "bullets": [
     "Give each one exactly that name", "The asteroid is big on purpose", "You can redraw them any week"]},
   {"title": "Pick the first screen", "bullets": [], "code": [(GAME_START, "setup")]},
   {"title": "Give the ship its picture", "bullets": [], "code": [(SHIP_START, "look")]},
   {"title": "Make your ship", "bullets": [], "code": [(SPACE_START, "make")]},
   {"title": "Checkpoint: your ship is here", "checkpoint": True,
    "say": "Press Play. Your ship should sit in the middle of the screen."},
   {"title": "Give the rock its picture", "bullets": [], "code": [(ROCK_START, "look")]},
   {"title": "Make a rock", "bullets": [], "code": [(SPACE_START, "rock")]},
   {"title": "Checkpoint: a rock on your ship", "checkpoint": True,
    "say": "Press Play. A big rock sits right on top of your ship. That is right for today."},
 ],
},

# ---------------------------------------------------------------- week 2 ----
{
 "n": 2,
 "title": "Everything in its place",
 "big_idea": "Every spot on the screen has an address. Today you learn the [[x and y|coordinates]] grid, reach into an object with the [[dot]], and shrink the rock with scaleX and scaleY.",
 "new_concepts": ["x and y", "the dot", "variables", "scaleX and scaleY"],
 "objectives": [
   "Find a spot on the screen from its [[x and y|coordinates]]",
   "Say what a [[variable]] is: a name that holds a value",
   "Use the [[dot]] to change an object from inside the room",
   "Resize an object with [[scaleX and scaleY|scale]]",
 ],
 "ops": [
  ADD(SPACE_START, "make", [
    "self.player.y = -250",
  ]),
  ADD(SPACE_START, "rock", [
    "self.rock.x = 200",
    "self.rock.y = 250",
  ]),
  ADD(ROCK_START, "scale", [
    "self.scaleX = 0.5",
    "self.scaleY = 0.5",
  ]),
 ],
 "flow": [
  TALK("0:00", "The grid",
       "<p>Draw the screen on the board as a grid. The middle is (0, 0). x runs from -640 on "
       "the left to 640 on the right; y from -360 at the bottom to 360 at the top. Plus y is "
       "UP, the way it is in maths class.</p>",
       ask=("Where is the point (0, -300)?", "In the middle, near the bottom")),
  TALK("0:08", "Names that hold things",
       "<p>A [[variable]] is a name with a value in it. In <code>self.player = Spaceship()</code> "
       "the name is on the left and the value - a brand-new spaceship - is on the right.</p>",
       ask=("In self.player = Spaceship(), which side is the name?",
            "The left - the new spaceship on the right goes into it")),
  STEP(SPACE_START, "make", "Move the ship down",
       ["The [[dot]] reaches inside an object. <code>self.player.y</code> is the y of the ship "
        "the room made. -250 is near the bottom. Press Play - the ship drops to the bottom."],
       at="0:14"),
  STEP(SPACE_START, "rock", "Move the rock",
       ["The same dot on the rock: 200 to the right, 250 up. Press Play - it is in the top "
        "right now."],
       at="0:22",
       ask=("What would self.rock.x = -200 do?", "Put the rock on the left side instead")),
  STEP(ROCK_START, "scale", "Shrink the rock",
       ["<code>scaleX</code> and <code>scaleY</code> stretch a picture. 1 is normal size, 0.5 is "
        "half. Change both by the same amount and the rock keeps its shape. Press Play - the "
        "rock is half as big."],
       at="0:32",
       ask=("What would scaleX = 2 and scaleY = 0.5 do?", "Twice as wide and half as tall - squashed")),
  TALK("0:44", "Play with the numbers",
       "<p>Let them move the rock to every corner and back. A student who can say where "
       "(600, 300) is has the grid.</p>"),
 ],
 "errors": [
   ("The ship does not move", "self.player.y = -250 has to come AFTER self.player = Spaceship(). You cannot move a ship you have not made yet."),
   ("AttributeError mentioning 'player'", "The two lines spell it differently. self.player must be spelled the same way on both."),
   ("The rock went off the screen", "x only goes to about 640 and y to about 360. Check your numbers are inside the grid."),
   ("The rock looks squashed", "scaleX and scaleY need the same number to keep the shape."),
 ],
 "recap": [
   "The middle of the screen is x 0, y 0. Plus y is up, minus y is down.",
   "A [[variable]] is a name holding a value - self.player holds your ship.",
   "The [[dot]] reaches inside an object: self.player.y is the ship's y.",
   "[[scaleX and scaleY|scale]] change the size: 1 is normal, 0.5 is half.",
 ],
 "homework": [
   {"task": "Map the screen", "detail": "Move the rock to each corner of the screen, one at a time, and write down the x and y you used.", "done": "You have four pairs of numbers, one for each corner."},
   {"task": "Find the size", "detail": "Try the rock at scale 2, then 0.25. Which size makes a good asteroid?", "done": "You picked a size and can say why."},
 ],
 "bonus": {"title": "Squash and stretch",
           "body": "<p>Give the rock a different <code>scaleX</code> and <code>scaleY</code>, like "
                   "1 and 0.3. What happens to its shape? Put both back to 0.5 when you are done.</p>"},
 "slides": [
   {"title": "The grid", "sub": "x from -640 to 640 - y from -360 to 360", "bullets": [
     "The middle is 0, 0", "Plus x is right, minus x is left", "Plus y is up, minus y is down"]},
   {"title": "Names that hold things", "sub": "self.player = Spaceship()", "bullets": [
     "A variable is a name with a value in it", "The name goes on the left of =",
     "The value goes on the right"]},
   {"title": "Move the ship down", "bullets": [], "code": [(SPACE_START, "make")]},
   {"title": "Checkpoint: the ship at the bottom", "checkpoint": True,
    "say": "Press Play. Your ship is near the bottom now, and the rock is still in the middle."},
   {"title": "Move the rock", "bullets": [], "code": [(SPACE_START, "rock")]},
   {"title": "Shrink the rock", "bullets": [], "code": [(ROCK_START, "scale")]},
   {"title": "Checkpoint: a small rock, top right", "checkpoint": True,
    "say": "Press Play. The ship is at the bottom and a half-size rock is up in the top right."},
 ],
},

# ---------------------------------------------------------------- week 3 ----
{
 "n": 3,
 "title": "Things that move",
 "big_idea": "Start runs once; loop runs forever. Today an Enemy ship joins the game and uses [[loop]] to fly slowly down the screen at its own speed.",
 "new_concepts": ["loop", "a number variable", "changing a value"],
 "draw": ["enemy.png"],
 "objectives": [
   "Say the difference between [[start]] and [[loop]]",
   "Give an object its own [[variable]] with self.",
   "Read self.y = self.y - self.speed out loud and say what it does",
   "Make an object move by changing it a little every loop",
 ],
 "ops": [
  ADD(ENEMY_START, "look", [
    "self.image = sprite('enemy.png')",
  ]),
  ADD(ENEMY_START, "speed", [
    "self.speed = 1",
  ]),
  ADD(SPACE_START, "enemy", [
    "self.enemy = Enemy()",
    "self.enemy.x = -200",
    "self.enemy.y = 300",
  ]),
  ADD(ENEMY_LOOP, "fall", [
    "self.y = self.y - self.speed",
  ]),
 ],
 "flow": [
  TALK("0:00", "Start and loop",
       "<p>[[start]] runs once, when the object is made. [[loop]] runs again and again, about "
       "sixty times every second, until the object is gone.</p>",
       ask=("If start only runs once, how could anything ever move?",
            "Something has to run again and again - that is loop")),
  TALK("0:05", "Draw an enemy",
       "<p>Make <code>enemy.png</code> at 56 by 56 and a new class called "
       "<strong>Enemy</strong>.</p>"),
  STEP(ENEMY_START, "look", "Give the enemy its picture",
       ["The enemy gets its picture, the same way the ship did."],
       at="0:12"),
  STEP(ENEMY_START, "speed", "Give the enemy a speed",
       ["<code>self.speed</code> is a [[variable]] that belongs to this enemy: how many steps it "
        "moves each loop. Nothing uses it yet."],
       at="0:14",
       ask=("Why self.speed and not just speed?",
            "self. makes it belong to the enemy, so its loop can use it too")),
  STEP(SPACE_START, "enemy", "Put an enemy in the room",
       ["Make one enemy and use the dot to put it on the left, up high. Press Play - it waits "
        "there."],
       at="0:18"),
  TALK("0:24", "Changing a value",
       "<p>Write <code>self.y = self.y - self.speed</code> on the board. Python works out the "
       "RIGHT side first - my y, take away my speed - then stores the answer back into y.</p>",
       "<p>Count it through: 300, 299, 298...</p>",
       ask=("If y is 300 and speed is 1, what is y after three loops?", "297")),
  STEP(ENEMY_LOOP, "fall", "Make the enemy fly down",
       ["In Enemy loop, so it happens every loop: take the speed off y. Press Play - the enemy "
        "creeps down the screen."],
       at="0:32"),
  TALK("0:42", "Speed it up",
       "<p>Have them try a speed of 5, then 0.5. Ask which feels like an enemy coming for "
       "you.</p>"),
 ],
 "errors": [
   ("The enemy does not move", "The falling line is in Enemy start. start runs once - it belongs in Enemy loop."),
   ("NameError: name 'speed' is not defined", "Every speed needs self. in front - self.speed in start AND in loop."),
   ("The enemy flies up", "It should be self.y - self.speed. A plus sends it up."),
   ("There is no enemy", "Space start must make it: self.enemy = Enemy(), with a capital E."),
 ],
 "recap": [
   "[[loop]] runs about sixty times every second.",
   "self.y = self.y - self.speed takes the old y, makes it smaller, and stores it back.",
   "Do that every loop and the enemy moves.",
   "self.speed belongs to the enemy, so its start and its loop can both use it.",
 ],
 "homework": [
   {"task": "Fast and slow", "detail": "Try self.speed = 5, then 0.5. Which feels right for an enemy?", "done": "You picked a speed and can say what the number means."},
   {"task": "Sideways", "detail": "Add self.x = self.x + 1 under the falling line and press Play. Which way does it go? Take it out afterwards.", "done": "You made it fly at an angle, and put it back."},
 ],
 "bonus": {"title": "A rising rock",
           "body": "<p>Give <strong>Asteroid loop</strong> one line: <code>self.y = self.y + 1</code>. "
                   "What does the rock do? Delete it again before next week - real asteroids "
                   "fall, and you write that in week 5.</p>"},
 "slides": [
   {"title": "start once, loop forever", "bullets": [
     "start runs one time, when the object is made", "loop runs about 60 times a second",
     "Anything that moves lives in loop"]},
   {"title": "Draw an enemy", "sub": "enemy.png - 56 x 56", "bullets": [
     "Make a class called Enemy", "Capital E"]},
   {"title": "Give the enemy its picture", "bullets": [], "code": [(ENEMY_START, "look")]},
   {"title": "Give the enemy a speed", "bullets": [], "code": [(ENEMY_START, "speed")]},
   {"title": "Put an enemy in the room", "bullets": [], "code": [(SPACE_START, "enemy")]},
   {"title": "Checkpoint: the enemy waits", "checkpoint": True,
    "say": "Press Play. An enemy sits up on the left. It does not move yet."},
   {"title": "Changing a value", "sub": "self.y = self.y - self.speed", "bullets": [
     "Python works out the right side first", "Then stores the answer on the left",
     "300, 299, 298, 297..."]},
   {"title": "Make the enemy fly down", "bullets": [], "code": [(ENEMY_LOOP, "fall")]},
   {"title": "Checkpoint: here it comes", "checkpoint": True,
    "say": "Press Play. The enemy creeps slowly down the left side of the screen."},
 ],
},

# ---------------------------------------------------------------- week 4 ----
{
 "n": 4,
 "title": "Fly the ship",
 "big_idea": "A game listens to you. Today an [[if]] asks whether a key is held down, and W, A, S and D fly your ship around the screen.",
 "new_concepts": ["if", "key_is_pressed()", "indentation"],
 "objectives": [
   "Write an [[if]] and push the line under it in by four spaces",
   "Use [[key_is_pressed()|key_is_pressed]] to read the keyboard",
   "Move the ship with its own speed variable",
   "Fix an IndentationError from its message",
 ],
 "ops": [
  ADD(SHIP_START, "speed", [
    "self.speed = 5",
  ]),
  ADD(SHIP_LOOP, "sideways", [
    "if key_is_pressed('A'):",
    "    self.x = self.x - self.speed",
    "if key_is_pressed('D'):",
    "    self.x = self.x + self.speed",
  ]),
  ADD(SHIP_LOOP, "updown", [
    "if key_is_pressed('W'):",
    "    self.y = self.y + self.speed",
    "if key_is_pressed('S'):",
    "    self.y = self.y - self.speed",
  ]),
 ],
 "flow": [
  TALK("0:00", "If",
       "<p>An [[if]] asks a yes-or-no question. The lines pushed in under it run only when the "
       "answer is yes. The line ends in a colon, and the lines under it start with four "
       "spaces.</p>",
       ask=("'If you are hungry, eat.' When does the eating happen?", "Only when you are hungry")),
  STEP(SHIP_START, "speed", "Give the ship a speed",
       ["The ship gets its own speed: 5 steps every loop. The enemy has a speed too - each "
        "object keeps its own."],
       at="0:06"),
  STEP(SHIP_LOOP, "sideways", "Fly left and right",
       ["<code>key_is_pressed('A')</code> is True while you hold A. Only then does the pushed-in "
        "line run and move the ship left. D is the same, to the right. Press Play and hold A, "
        "then D."],
       at="0:10",
       ask=("Why is the line under the if pushed in?", "That is how Python knows it belongs to the if")),
  TALK("0:22", "Up and down",
       "<p>Walk the room: everyone should be flying side to side.</p>",
       ask=("What will W and S need?", "Two more ifs that change y instead of x")),
  STEP(SHIP_LOOP, "updown", "Fly up and down",
       ["W adds to y, so the ship climbs; S takes away, so it drops. Press Play and fly "
        "everywhere."],
       at="0:26"),
  TALK("0:38", "Fly it",
       "<p>Two minutes of flying. Then ask who can fly into the rock - next month that will "
       "hurt.</p>"),
 ],
 "errors": [
   ("IndentationError", "The line under each if needs exactly four spaces. Do not mix spaces and tabs."),
   ("SyntaxError on the if line", "Every if line ends with a colon."),
   ("The ship does not move", "The ifs belong in Spaceship loop, and self.speed = 5 in Spaceship start."),
   ("It moves the wrong way", "A takes away from x (left), D adds (right), W adds to y (up), S takes away (down)."),
 ],
 "recap": [
   "An [[if]] runs the pushed-in lines under it only when its question is true.",
   "[[key_is_pressed('A')|key_is_pressed]] is True for as long as you hold A.",
   "The line under an if starts with four spaces.",
   "x changes left and right, y changes up and down.",
 ],
 "homework": [
   {"task": "Find your speed", "detail": "Try the ship at speed 2, then 12. What speed makes it fun to fly?", "done": "You picked a speed and can say why."},
   {"task": "Explain the keys", "detail": "Write one sentence for each of W, A, S and D saying what it does to x or y.", "done": "You have four sentences, and each names x or y."},
 ],
 "bonus": {"title": "Turbo",
           "body": "<p>Add another <code>if</code> to <strong>Spaceship loop</strong>: while you hold "
                   "<code>Q</code>, move left by <code>self.speed * 2</code>. Now Q is a fast dash. "
                   "Can you make E dash right?</p>"},
 "slides": [
   {"title": "if asks a question", "sub": "if key_is_pressed('A'):", "bullets": [
     "The line ends with a colon", "The lines under it start with four spaces",
     "They run only when the answer is yes"]},
   {"title": "Give the ship a speed", "bullets": [], "code": [(SHIP_START, "speed")]},
   {"title": "Fly left and right", "bullets": [], "code": [(SHIP_LOOP, "sideways")]},
   {"title": "Checkpoint: side to side", "checkpoint": True,
    "say": "Press Play and click the game. Hold A and D - the ship flies left and right."},
   {"title": "Fly up and down", "bullets": [], "code": [(SHIP_LOOP, "updown")]},
   {"title": "Checkpoint: fly anywhere", "checkpoint": True,
    "say": "Press Play and click the game. W, A, S and D fly the ship all over the screen."},
 ],
},

# ---------------------------------------------------------------- week 5 ----
{
 "n": 5,
 "title": "A sky full of rocks",
 "big_idea": "Space should look like space. Today you add a background behind everything, make the rock fall, and use [[destroy]] to clean it up once it leaves the screen.",
 "new_concepts": ["draw order", "less than and greater than", "destroy()"],
 "draw": ["space.png"],
 "objectives": [
   "Say why the object made first is drawn at the back",
   "Make the rock fall with its own speed",
   "Read &lt; and &gt; as less than and greater than",
   "Use [[destroy]] to take an object out of the game",
 ],
 "ops": [
  ADD(BACK_START, "look", [
    "self.image = sprite('space.png')",
  ]),
  ADD(SPACE_START, "back", [
    "self.background = Background()",
  ]),
  ADD(ROCK_START, "speed", [
    "self.speed = 2",
  ]),
  ADD(ROCK_LOOP, "fall", [
    "self.y = self.y - self.speed",
  ]),
  ADD(ROCK_LOOP, "gone", [
    "if self.y < -400:",
    "    destroy(self)",
  ]),
 ],
 "flow": [
  TALK("0:00", "Draw order",
       "<p>A painter paints the sky before the trees. The game does the same: whatever is made "
       "FIRST is drawn first, at the back, and everything made after it goes on top.</p>",
       ask=("If you make the background last, what will you see?",
            "Only the background - it covers everything made before it")),
  TALK("0:05", "Draw space",
       "<p>Make <code>space.png</code> at 1280 by 720 - the whole screen. Stars, planets, "
       "anything. Make a class called <strong>Background</strong>.</p>"),
  STEP(BACK_START, "look", "Give the background its picture",
       ["The background's picture: the space you drew."],
       at="0:12"),
  STEP(SPACE_START, "back", "Make the background first",
       ["Type this at the VERY TOP of Space start, above the player line. Made first, so drawn "
        "first - at the back. Press Play - space is behind everything."],
       at="0:14",
       ask=("Why at the very top?", "So it is made first and drawn behind everything else")),
  STEP(ROCK_START, "speed", "Give the rock a speed",
       ["The rock gets its own speed, 2. The enemy's speed and the ship's speed are different "
        "numbers with the same name - each lives inside its own object."],
       at="0:22"),
  STEP(ROCK_LOOP, "fall", "Make the rock fall",
       ["The same falling line the enemy uses. Press Play - the rock falls."],
       at="0:25"),
  TALK("0:30", "Where does it go?",
       "<p>Point out that a rock below the screen keeps falling forever where nobody can see it "
       "- y is -1000, then -5000 - and the game keeps working on it every loop.</p>",
       ask=("Is the rock still there after it leaves the screen?",
            "Yes - it keeps falling forever where you cannot see it")),
  STEP(ROCK_LOOP, "gone", "Clean up the rock",
       ["<code>&lt;</code> means less than. Once the rock's y is below -400 - past the bottom "
        "edge - <code>destroy(self)</code> takes it out of the game for good."],
       at="0:36"),
  TALK("0:44", "Nothing to see is the point",
       "<p>Press Play: it looks exactly the same. Say why that is right - the rock is cleaned "
       "up after it is already out of sight. Next week rocks start to hurt.</p>"),
 ],
 "errors": [
   ("Everything disappeared behind the background", "self.background = Background() must be the FIRST line of Space start, above the player."),
   ("The rock does not fall", "Asteroid start needs self.speed = 2 and Asteroid loop needs the falling line."),
   ("NameError: name 'destroy' is not defined", "Spelling: destroy(self), all lowercase, with self inside the brackets."),
   ("The rock vanishes the moment you press Play", "It must be &lt; -400, with a minus. Below 400 is true straight away, so the rock is destroyed at once."),
 ],
 "recap": [
   "Objects made first are drawn first, at the back.",
   "Every object keeps its own self.speed.",
   "&lt; means less than, &gt; means greater than.",
   "[[destroy]](self) takes an object out of the game for good.",
 ],
 "homework": [
   {"task": "Better space", "detail": "Improve space.png. Keep it 1280 by 720 so it fills the screen.", "done": "Your own space is behind the game."},
   {"task": "Read it aloud", "detail": "Write the line if self.y < -400: as a full English sentence.", "done": "Your sentence says what has to be true, and what happens then."},
 ],
 "bonus": {"title": "Pick the danger",
           "body": "<p>Change the rock's speed in <strong>Asteroid start</strong> to 6. Is it harder "
                   "to dodge? Try a few, then keep the one you like best.</p>"},
 "slides": [
   {"title": "Made first, drawn at the back", "bullets": [
     "A painter paints the sky first", "The game draws objects in the order they were made",
     "So the background is made first"]},
   {"title": "Draw space", "sub": "space.png - 1280 x 720", "bullets": [
     "The size of the whole screen", "Make a class called Background"]},
   {"title": "Give the background its picture", "bullets": [], "code": [(BACK_START, "look")]},
   {"title": "Make the background first", "bullets": [], "code": [(SPACE_START, "back")]},
   {"title": "Checkpoint: space behind everything", "checkpoint": True,
    "say": "Press Play. Your space picture fills the screen, with the ship, rock and enemy on top."},
   {"title": "Give the rock a speed", "bullets": [], "code": [(ROCK_START, "speed")]},
   {"title": "Make the rock fall", "bullets": [], "code": [(ROCK_LOOP, "fall")]},
   {"title": "Checkpoint: a falling rock", "checkpoint": True,
    "say": "Press Play. The rock falls down the right side and off the bottom."},
   {"title": "Gone, but still there", "bullets": [
     "Off the screen is not the same as gone", "A forgotten rock keeps falling forever",
     "destroy(self) really removes it"]},
   {"title": "Clean up the rock", "bullets": [], "code": [(ROCK_LOOP, "gone")]},
 ],
},

# ---------------------------------------------------------------- week 6 ----
{
 "n": 6,
 "title": "Crash!",
 "big_idea": "Games are about things touching. Today [[get_collision]] tells your ship the moment it hits a rock or an enemy - and both of them are destroyed.",
 "new_concepts": ["get_collision()", "a name for right now", "True and False"],
 "objectives": [
   "Use [[get_collision]] to ask whether two objects are touching",
   "Keep the answer in a name that lives only inside this loop",
   "Say what an [[if]] does with an object or with False",
   "Destroy both objects in a crash",
 ],
 "ops": [
  ADD(SHIP_LOOP, "rockHits", [
    "asteroidHit = get_collision(self, 'Asteroid')",
    "if asteroidHit:",
    "    destroy(asteroidHit)",
    "    destroy(self)",
  ]),
  ADD(SHIP_LOOP, "enemyHits", [
    "enemyHit = get_collision(self, 'Enemy')",
    "if enemyHit:",
    "    destroy(enemyHit)",
    "    destroy(self)",
  ]),
 ],
 "flow": [
  TALK("0:00", "Touching",
       "<p><code>get_collision(self, 'Asteroid')</code> asks: am I touching an Asteroid? The "
       "answer is the rock you are touching, or False if you are touching none.</p>",
       "<p>An [[if]] treats a rock as yes and False as no.</p>",
       ask=("What should happen when your ship hits a rock?", "Something bad - the ship blows up")),
  STEP(SHIP_LOOP, "rockHits", "Crash into a rock",
       ["At the bottom of Spaceship loop. <code>asteroidHit</code> holds the answer: the rock, or "
        "False. Only when it is a rock, destroy the rock and then the ship. Press Play and fly "
        "into the rock."],
       at="0:08",
       ask=("Why is it asteroidHit and not self.asteroidHit?",
            "It is only needed right here in this loop - nothing else uses it")),
  TALK("0:20", "Test it",
       "<p>Everyone crashes once. A ship that will not die means the class name in quotes is "
       "wrong - check the capital A.</p>"),
  STEP(SHIP_LOOP, "enemyHits", "Crash into an enemy",
       ["The same pattern for enemies. Press Play and fly into the enemy."],
       at="0:24",
       ask=("What is different between the rock lines and the enemy lines?",
            "Only the class name in quotes and the variable name")),
  TALK("0:36", "Fair or not?",
       "<p>Ask whether one crash should end the whole game. Week 10 changes it - for now, let "
       "them enjoy the explosions.</p>"),
 ],
 "errors": [
   ("Nothing happens when they touch", "The class name in quotes must match exactly: 'Asteroid' with a capital A, 'Enemy' with a capital E."),
   ("NameError: name 'asteroidHit' is not defined", "The name must be spelled the same on both lines, capital H included."),
   ("The ship dies the moment you press Play", "Something starts on top of the ship. Check the rock and enemy positions in Space start."),
   ("Only one of them disappears", "You need both destroy lines: one for the thing you hit, one for self."),
 ],
 "recap": [
   "[[get_collision]](self, 'Asteroid') gives back the rock you touch, or False.",
   "A name without self. lives only inside this loop.",
   "if asteroidHit: runs only when something was really hit.",
   "[[destroy]] takes away both the rock and the ship.",
 ],
 "homework": [
   {"task": "Spot the pattern", "detail": "Write down which words are the same in the rock lines and the enemy lines, and which are different.", "done": "You found the two words that change."},
   {"task": "Invincible", "detail": "Put a # in front of destroy(self) in both crashes. What happens now? Take the # out again.", "done": "You can say what # does to a line."},
 ],
 "bonus": {"title": "A tougher enemy",
           "body": "<p>Put a <code>#</code> in front of <code>destroy(enemyHit)</code>. Now the enemy "
                   "survives a crash and only your ship goes. Fair? Take the <code>#</code> out before "
                   "next week.</p>"},
 "slides": [
   {"title": "Are they touching?", "sub": "get_collision(self, 'Asteroid')", "bullets": [
     "The answer is the rock you touch", "Or False if you touch none",
     "An if treats a rock as yes, False as no"]},
   {"title": "Crash into a rock", "bullets": [], "code": [(SHIP_LOOP, "rockHits")]},
   {"title": "Checkpoint: rock crash", "checkpoint": True,
    "say": "Press Play, click the game, and fly into the falling rock. The rock and your ship both disappear."},
   {"title": "Crash into an enemy", "bullets": [], "code": [(SHIP_LOOP, "enemyHits")]},
   {"title": "Checkpoint: enemy crash", "checkpoint": True,
    "say": "Press Play and fly into the enemy. Both of you are gone."},
 ],
},

# ---------------------------------------------------------------- week 7 ----
{
 "n": 7,
 "title": "A rock every two seconds",
 "big_idea": "One rock is not a storm. Today a [[timer]] in the Space room counts loops, and every 120 of them - two seconds - it makes a brand-new asteroid.",
 "new_concepts": ["timer", "greater than or equal", "a room's own variables"],
 "objectives": [
   "Count loops with a [[timer]] that goes up by one",
   "Turn a number of loops into seconds",
   "Make a new object from the room's loop",
   "Reset a timer so it counts again",
 ],
 "ops": [
  ADD(SPACE_START, "timers", [
    "self.asteroidTimer = 0",
  ]),
  ADD(SPACE_LOOP, "asteroids", [
    "self.asteroidTimer = self.asteroidTimer + 1",
    "if self.asteroidTimer >= 120:",
    "    self.newAsteroid = Asteroid()",
    "    self.newAsteroid.y = 400",
    "    self.asteroidTimer = 0",
  ]),
 ],
 "flow": [
  TALK("0:00", "Counting loops",
       "<p>Loop runs sixty times a second. Add one to a number every loop and you have a clock: "
       "60 is one second, 120 is two.</p>",
       ask=("How many loops are there in two seconds?", "120 - sixty every second")),
  STEP(SPACE_START, "timers", "Start the timer",
       ["A room can have its own variables too. This one starts at 0. Place it at the bottom of "
        "Space start."],
       at="0:06"),
  STEP(SPACE_LOOP, "asteroids", "Count, make a rock, reset",
       ["In Space loop: add one to the timer every loop. Once it reaches 120, make a new rock up "
        "at y 400, above the top, and set the timer back to 0 so it counts again. Press Play and "
        "wait."],
       at="0:10",
       ask=("What would happen without the line that sets the timer back to 0?",
            "After 120 it would make a rock every single loop - sixty a second")),
  TALK("0:26", "Trigger and reset",
       "<p>Name the three parts out loud: the COUNT (+ 1), the TRIGGER (the if), the RESET "
       "(back to 0). Every spawner in this game has all three.</p>",
       ask=("Why &gt;= and not just &gt;?", "&gt;= means 120 or more, so it fires the moment the count reaches 120")),
  TALK("0:36", "Tune it",
       "<p>Let them try 60 and 240. Ask what number makes the game fun rather than "
       "impossible.</p>"),
 ],
 "errors": [
   ("No new rocks", "The counting lines go in Space loop - the room's loop - and self.asteroidTimer = 0 in Space start."),
   ("Rocks pour out like a waterfall", "self.asteroidTimer = 0 is missing at the end, or it is not pushed in under the if."),
   ("AttributeError mentioning 'asteroidTimer'", "Space start needs self.asteroidTimer = 0, spelled exactly the same, capital T."),
   ("The new rocks all fall down the middle", "That is right for this week. Next week they land somewhere random."),
 ],
 "recap": [
   "A [[timer]] is a number that counts loops: + 1 every time.",
   "120 loops is two seconds.",
   "&gt;= means greater than or equal to.",
   "Set the timer back to 0 and it starts counting again.",
 ],
 "homework": [
   {"task": "Seconds to loops", "detail": "How many loops are there in 1 second? 3 seconds? 5 seconds?", "done": "You have three numbers: 60, 180 and 300."},
   {"task": "Find the storm", "detail": "Change 120 to 30. Then 300. Which number feels best to play?", "done": "You picked a number and can say how many seconds it is."},
 ],
 "bonus": {"title": "Faster and faster",
           "body": "<p>In <strong>Space loop</strong>, try resetting the timer to 30 instead of 0. "
                   "What happens to how often the rocks come? Why?</p>"},
 "slides": [
   {"title": "A clock made of loops", "sub": "60 loops is one second", "bullets": [
     "Add 1 every loop", "120 means two seconds have passed", "Then start again from 0"]},
   {"title": "Start the timer", "bullets": [], "code": [(SPACE_START, "timers")]},
   {"title": "Count, make a rock, reset", "bullets": [], "code": [(SPACE_LOOP, "asteroids")]},
   {"title": "Checkpoint: a rock storm", "checkpoint": True,
    "say": "Press Play and wait. Every two seconds a new rock falls down the middle of the screen."},
 ],
},

# ---------------------------------------------------------------- week 8 ----
{
 "n": 8,
 "title": "Random rocks",
 "big_idea": "A game that does the same thing every time gets boring. Today [[random]] picks a different spot for every new rock, and the rocks start to spin.",
 "new_concepts": ["import random", "random.randint()", "chance", "angle"],
 "objectives": [
   "Bring in Python's random numbers with import random",
   "Say which numbers random.randint(1, 6) can give, and how likely each is",
   "Drop each new rock at a random x",
   "Spin an object with its [[angle]]",
 ],
 "ops": [
  ADD(SPACE_LOOP, "imports", [
    "import random",
  ]),
  SET(SPACE_LOOP, "asteroids", [
    "self.asteroidTimer = self.asteroidTimer + 1",
    "if self.asteroidTimer >= 120:",
    "    self.newAsteroid = Asteroid()",
    "    self.newAsteroid.x = random.randint(-600, 600)",
    "    self.newAsteroid.y = 400",
    "    self.asteroidTimer = 0",
  ]),
  ADD(ROCK_LOOP, "spin", [
    "self.angle = self.angle + 2",
  ]),
 ],
 "flow": [
  TALK("0:00", "Chance",
       "<p>Roll a die a few times. <code>random.randint(1, 6)</code> is that die: any whole "
       "number from 1 to 6, each one just as likely - a one-in-six chance each.</p>",
       ask=("What numbers can random.randint(1, 6) give?",
            "1, 2, 3, 4, 5 or 6 - each one just as likely")),
  STEP(SPACE_LOOP, "imports", "Bring in random",
       ["<code>import random</code> brings in Python's dice. It goes at the very top of Space "
        "loop, above the timer line."],
       at="0:08"),
  STEP(SPACE_LOOP, "asteroids", "A random spot for every rock",
       ["One new line, between making the rock and setting its y - pushed in four spaces, "
        "inside the if. Each new rock gets a random x from -600 to 600. Press Play - rocks rain "
        "down all across the screen."],
       at="0:12",
       ask=("Why -600 and 600, not -640 and 640?", "So a rock is never half off the edge")),
  STEP(ROCK_LOOP, "spin", "Make the rocks spin",
       ["<code>angle</code> is how far an object is turned. Add 2 every loop and it spins. Type "
        "it just under the falling line. Press Play."],
       at="0:26"),
  TALK("0:34", "Your turn to choose",
       "<p>Let them play with the numbers: a wider or narrower range, a faster spin.</p>",
       ask=("How would you make the rocks spin the other way?", "Take 2 away instead of adding it")),
 ],
 "errors": [
   ("NameError: name 'random' is not defined", "import random has to be at the very top of Space loop."),
   ("IndentationError on the new line", "It belongs inside the if: four spaces in front, lined up with the line above it."),
   ("Every rock still falls down the middle", "The random line must be inside the if, after the rock is made."),
   ("The rocks spin far too fast", "Add 2, not 20."),
 ],
 "recap": [
   "import [[random]] brings in Python's random numbers.",
   "random.randint(-600, 600) is any whole number from -600 to 600, each as likely.",
   "Every new rock gets its own random x.",
   "[[angle]] turns an object; adding to it every loop spins it.",
 ],
 "homework": [
   {"task": "Roll the dice", "detail": "Write down what random.randint(1, 2) is like in real life. And random.randint(1, 100)?", "done": "You compared one to a coin and one to a 100-sided die."},
   {"task": "Where can they fall?", "detail": "Change the range to random.randint(-200, 200). What changes? Put it back afterwards.", "done": "You can explain what the two numbers do."},
 ],
 "bonus": {"title": "Random spin",
           "body": "<p>Give each rock its own spin. Put <code>import random</code> at the top of "
                   "<strong>Asteroid start</strong>, add <code>self.spin = random.randint(-4, 4)</code>, "
                   "and in <strong>Asteroid loop</strong> add <code>self.spin</code> to the angle "
                   "instead of 2.</p>"},
 "slides": [
   {"title": "A die in your code", "sub": "random.randint(1, 6)", "bullets": [
     "Any whole number from 1 to 6", "Each one just as likely", "A different one every time"]},
   {"title": "Bring in random", "bullets": [], "code": [(SPACE_LOOP, "imports")]},
   {"title": "A random spot for every rock", "bullets": [], "code": [(SPACE_LOOP, "asteroids")]},
   {"title": "Checkpoint: rocks everywhere", "checkpoint": True,
    "say": "Press Play and wait. New rocks fall from a different place every time."},
   {"title": "Make the rocks spin", "bullets": [], "code": [(ROCK_LOOP, "spin")]},
   {"title": "Checkpoint: spinning rocks", "checkpoint": True,
    "say": "Press Play. Every rock turns slowly as it falls."},
 ],
},

# ---------------------------------------------------------------- week 9 ----
{
 "n": 9,
 "title": "Fire!",
 "big_idea": "Now you fight back. Space fires a laser from the nose of your ship, and the laser blasts any rock or enemy it touches.",
 "new_concepts": ["key_was_pressed()", "making an object at another object's spot", "a new class that does the hitting"],
 "draw": ["laser.png"],
 "objectives": [
   "Tell [[key_was_pressed()|key_was_pressed]] apart from [[key_is_pressed()|key_is_pressed]]",
   "Make a new laser right where the ship is",
   "Give the laser its own hits with [[get_collision]]",
   "Clean up a laser that leaves the top of the screen",
 ],
 "ops": [
  ADD(LASER_START, "look", [
    "self.image = sprite('laser.png')",
  ]),
  ADD(LASER_LOOP, "fly", [
    "self.y = self.y + 8",
  ]),
  ADD(SHIP_LOOP, "shoot", [
    "if key_was_pressed(' '):",
    "    self.laser = Projectile()",
    "    self.laser.x = self.x",
    "    self.laser.y = self.y",
  ]),
  ADD(LASER_LOOP, "rocks", [
    "asteroidHit = get_collision(self, 'Asteroid')",
    "if asteroidHit:",
    "    destroy(asteroidHit)",
    "    destroy(self)",
  ]),
  ADD(LASER_LOOP, "enemies", [
    "enemyHit = get_collision(self, 'Enemy')",
    "if enemyHit:",
    "    destroy(enemyHit)",
    "    destroy(self)",
  ]),
  ADD(LASER_LOOP, "gone", [
    "if self.y > 400:",
    "    destroy(self)",
  ]),
 ],
 "flow": [
  TALK("0:00", "Held or pressed?",
       "<p><code>key_is_pressed</code> is True for every loop you HOLD a key - that is why the "
       "ship glides. <code>key_was_pressed</code> is True for only the one loop the key goes "
       "down. One press, one laser.</p>",
       ask=("What would happen if the laser used key_is_pressed?",
            "Holding space would fire sixty lasers a second - a solid beam")),
  TALK("0:06", "Draw a laser",
       "<p>Make <code>laser.png</code> at 8 by 24 - a thin bright bolt - and a class called "
       "<strong>Projectile</strong>.</p>"),
  STEP(LASER_START, "look", "Give the laser its picture",
       ["The laser's picture."],
       at="0:10"),
  STEP(LASER_LOOP, "fly", "Make the laser fly up",
       ["Plus 8 every loop - up, and fast. Nothing makes a laser yet."],
       at="0:12"),
  STEP(SHIP_LOOP, "shoot", "Fire on space",
       ["In Spaceship loop, under the W and S lines. On the one loop space goes down, make a "
        "Projectile and put it exactly where the ship is: the laser's x and y are copied from "
        "the ship's own <code>self.x</code> and <code>self.y</code>. Press Play and fire."],
       at="0:15",
       ask=("Inside this if, what is self - the ship or the laser?",
            "The ship - these lines are in Spaceship loop, so self.x is the ship's x")),
  TALK("0:26", "The laser does the hitting",
       "<p>Lasers fly straight through rocks right now. Ask who should check for the hit.</p>",
       ask=("Which class should check whether a laser touched a rock?",
            "Projectile - the laser is the one doing the hitting")),
  STEP(LASER_LOOP, "rocks", "Blast rocks",
       ["The same crash pattern as week 6, in Projectile loop: when the laser touches a rock, "
        "both go."],
       at="0:30"),
  STEP(LASER_LOOP, "enemies", "Blast enemies",
       ["And the same for enemies. Press Play and shoot the enemy before it reaches you."],
       at="0:38"),
  STEP(LASER_LOOP, "gone", "Clean up missed shots",
       ["A missed laser flies off the top for ever. <code>&gt;</code> means greater than: once "
        "it is above 400, destroy it."],
       at="0:44"),
 ],
 "errors": [
   ("Holding space makes a beam", "It should be key_was_pressed, not key_is_pressed."),
   ("Lasers appear in the middle of the screen", "The laser's x and y must be copied from self.x and self.y, the ship's own position."),
   ("Lasers go through rocks", "The rocks block goes in Projectile loop, with 'Asteroid' spelled exactly."),
   ("Lasers fall instead of rise", "Projectile loop adds 8 to y. A minus sends it down."),
 ],
 "recap": [
   "[[key_was_pressed]] is True for one loop; [[key_is_pressed]] for as long as you hold.",
   "self.laser.x = self.x puts the new laser where the ship is.",
   "The laser checks its own hits with [[get_collision]].",
   "&gt; means greater than: a laser above 400 is [[destroyed|destroy]].",
 ],
 "homework": [
   {"task": "Held or pressed", "detail": "Write two things in a game you know that use 'held' and two that use 'pressed once'.", "done": "You have four examples, two of each."},
   {"task": "Faster bolts", "detail": "Try the laser at + 3 and + 20. Which feels best?", "done": "You picked a laser speed."},
 ],
 "bonus": {"title": "Double shot",
           "body": "<p>Inside the fire <code>if</code>, make a second laser called "
                   "<code>self.laser2</code> at <code>self.x + 20</code>. Now every press fires "
                   "two side by side.</p>"},
 "slides": [
   {"title": "Held or pressed?", "sub": "key_was_pressed(' ')", "bullets": [
     "key_is_pressed is True while you hold the key", "key_was_pressed is True for one loop",
     "One press, one laser"]},
   {"title": "Draw a laser", "sub": "laser.png - 8 x 24", "bullets": [
     "Thin and bright", "Make a class called Projectile"]},
   {"title": "Give the laser its picture", "bullets": [], "code": [(LASER_START, "look")]},
   {"title": "Make the laser fly up", "bullets": [], "code": [(LASER_LOOP, "fly")]},
   {"title": "Fire on space", "bullets": [], "code": [(SHIP_LOOP, "shoot")]},
   {"title": "Checkpoint: pew", "checkpoint": True,
    "say": "Press Play, click the game and tap space. A laser leaves your ship and flies up. It goes straight through rocks for now."},
   {"title": "Blast rocks", "bullets": [], "code": [(LASER_LOOP, "rocks")]},
   {"title": "Blast enemies", "bullets": [], "code": [(LASER_LOOP, "enemies")]},
   {"title": "Checkpoint: blast them", "checkpoint": True,
    "say": "Press Play and shoot. A laser that touches a rock or the enemy takes it out."},
   {"title": "Clean up missed shots", "bullets": [], "code": [(LASER_LOOP, "gone")]},
 ],
},

# --------------------------------------------------------------- week 10 ----
{
 "n": 10,
 "title": "Health and Game Over",
 "big_idea": "One crash should not end everything. Today your ship gets five health, a label shows it on the screen, and when it reaches zero a new [[room]] says GAME OVER.",
 "new_concepts": ["health", "text()", "str()", "a second room"],
 "objectives": [
   "Change a crash so it takes health instead of the ship",
   "Show a number on the screen with [[text]]() and [[str]]()",
   "Explain why every health needs self. in front",
   "Switch to an End [[room]] when health runs out",
 ],
 "ops": [
  ADD(SHIP_START, "health", [
    "self.health = 5",
  ]),
  SET(SHIP_LOOP, "rockHits", [
    "asteroidHit = get_collision(self, 'Asteroid')",
    "if asteroidHit:",
    "    destroy(asteroidHit)",
    "    self.health = self.health - 1",
  ]),
  SET(SHIP_LOOP, "enemyHits", [
    "enemyHit = get_collision(self, 'Enemy')",
    "if enemyHit:",
    "    destroy(enemyHit)",
    "    self.health = self.health - 1",
  ]),
  ADD(SPACE_START, "hud", [
    "self.healthLabel = text()",
    "self.healthLabel.color = 'white'",
    "self.healthLabel.x = -600",
    "self.healthLabel.y = 320",
  ]),
  ADD(SPACE_LOOP, "hud", [
    "self.healthLabel.text = 'Health: ' + str(self.player.health)",
  ]),
  ADD(END_START, "message", [
    "self.message = text()",
    "self.message.color = 'white'",
    "self.message.fontSize = 60",
    "self.message.halign = 'center'",
    "self.message.text = 'GAME OVER'",
  ]),
  ADD(SPACE_LOOP, "over", [
    "if self.player.health <= 0:",
    "    set_room('End')",
  ]),
 ],
 "flow": [
  TALK("0:00", "Five lives in one number",
       "<p>Right now one touch ends you. Instead the ship will keep a number - its health - "
       "and every hit takes one away.</p>",
       ask=("Where should the health start: Spaceship start or Spaceship loop?",
            "start - it is set once, then hits change it")),
  STEP(SHIP_START, "health", "Give the ship health",
       ["Five health, set once, in Spaceship start."],
       at="0:05"),
  STEP(SHIP_LOOP, "rockHits", "A rock costs health",
       ["Change one line: <code>destroy(self)</code> goes, and in its place the ship loses one "
        "health. The rock is still destroyed."],
       at="0:08"),
  STEP(SHIP_LOOP, "enemyHits", "An enemy costs health",
       ["The same swap in the enemy crash."],
       at="0:13"),
  TALK("0:16", "Why self. every time",
       "<p>Write <code>health = health - 1</code> on the board and run it: NameError. Without "
       "<code>self.</code>, Python looks for a name that lives only in this loop, and there "
       "isn't one. <code>self.health</code> is the one that belongs to the ship.</p>",
       ask=("Why does health = health - 1 give a NameError?",
            "Without self. Python looks for a name in this loop only, and there is none")),
  STEP(SPACE_START, "hud", "Make a health label",
       ["[[text]]() makes words on the screen. White, and up in the top-left corner."],
       at="0:22"),
  STEP(SPACE_LOOP, "hud", "Show the health",
       ["Every loop, rewrite the label. <code>str()</code> turns the number 5 into the writing "
        "'5' so it can join 'Health: '. The room reaches the ship's health through "
        "<code>self.player</code>. Press Play and take a hit."],
       at="0:28",
       ask=("What is 'Health: ' + 5 without str()?",
            "An error - you cannot add writing and a number")),
  STEP(END_START, "message", "Build the Game Over screen",
       ["Make a room called <strong>End</strong>. Its start puts big white centred words in the "
        "middle."],
       at="0:36"),
  STEP(SPACE_LOOP, "over", "Lose at zero",
       ["At the bottom of Space loop: <code>&lt;=</code> means less than or equal. Once health "
        "is 0 or less, the room switches itself to End. Press Play and crash five times."],
       at="0:44"),
 ],
 "errors": [
   ("NameError: name 'health' is not defined", "Every health needs self. in front: self.health = self.health - 1."),
   ("TypeError about str and int", "'Health: ' + self.player.health needs str() around the number."),
   ("The label never changes", "The .text line goes in Space loop, not Space start, so it is rewritten every loop."),
   ("Health goes below zero and nothing happens", "The over block goes in Space loop, and End must be spelled the same as the room."),
 ],
 "recap": [
   "A hit now takes one health instead of [[destroying|destroy]] the ship.",
   "self.health belongs to the ship; health on its own is a NameError.",
   "[[text]]() makes a label, and [[str]]() turns a number into writing.",
   "&lt;= means less than or equal; at 0 the game switches to the End [[room]].",
 ],
 "homework": [
   {"task": "Tough or fragile", "detail": "Try the ship with 1 health and with 20. Which makes a better game?", "done": "You picked a starting health and can say why."},
   {"task": "Read the error", "detail": "Write down what NameError means in your own words.", "done": "Your sentence says Python could not find a name."},
 ],
 "bonus": {"title": "Your own message",
           "body": "<p>Change <code>'GAME OVER'</code> to your own words, and try a different "
                   "<code>color</code> like <code>'red'</code>.</p>"},
 "slides": [
   {"title": "Health", "sub": "self.health = 5", "bullets": [
     "One number holds all your lives", "Every hit takes one away", "At zero, the game is over"]},
   {"title": "Give the ship health", "bullets": [], "code": [(SHIP_START, "health")]},
   {"title": "A rock costs health", "bullets": [], "code": [(SHIP_LOOP, "rockHits")]},
   {"title": "An enemy costs health", "bullets": [], "code": [(SHIP_LOOP, "enemyHits")]},
   {"title": "Why self. every time", "sub": "health = health - 1", "bullets": [
     "NameError: Python cannot find health", "self.health is the ship's own",
     "Always write the self."]},
   {"title": "Make a health label", "bullets": [], "code": [(SPACE_START, "hud")]},
   {"title": "Show the health", "bullets": [], "code": [(SPACE_LOOP, "hud")]},
   {"title": "Checkpoint: Health 5", "checkpoint": True,
    "say": "Press Play. Health: 5 shows in the top left. Fly into a rock - it drops to 4, and your ship survives."},
   {"title": "Build the Game Over screen", "bullets": [], "code": [(END_START, "message")]},
   {"title": "Lose at zero", "bullets": [], "code": [(SPACE_LOOP, "over")]},
   {"title": "Checkpoint: GAME OVER", "checkpoint": True,
    "say": "Press Play and crash until your health reaches 0. The screen changes to GAME OVER."},
 ],
},

# --------------------------------------------------------------- week 11 ----
{
 "n": 11,
 "title": "Health pickups",
 "big_idea": "A good game gives back as well as takes. Today green pickups drift down every five seconds, and catching one adds a health.",
 "new_concepts": ["reusing a pattern", "adding instead of taking away"],
 "draw": ["pickup.png"],
 "objectives": [
   "Build a whole new falling class from what you already know",
   "Copy the [[timer]] pattern with a new timer and a new number",
   "Catch a pickup with [[get_collision]] and add to health",
   "Say which parts of a pattern stay the same and which change",
 ],
 "ops": [
  ADD(PICKUP_START, "look", [
    "self.image = sprite('pickup.png')",
  ]),
  ADD(PICKUP_LOOP, "fall", [
    "self.y = self.y - 2",
  ]),
  ADD(PICKUP_LOOP, "gone", [
    "if self.y < -400:",
    "    destroy(self)",
  ]),
  ADD(SPACE_START, "timers", [
    "self.healthPickupTimer = 0",
  ]),
  ADD(SPACE_LOOP, "pickups", [
    "self.healthPickupTimer = self.healthPickupTimer + 1",
    "if self.healthPickupTimer >= 300:",
    "    self.newPickup = HealthPickup()",
    "    self.newPickup.x = random.randint(-600, 600)",
    "    self.newPickup.y = 400",
    "    self.healthPickupTimer = 0",
  ]),
  ADD(SHIP_LOOP, "heal", [
    "pickupHit = get_collision(self, 'HealthPickup')",
    "if pickupHit:",
    "    destroy(pickupHit)",
    "    self.health = self.health + 1",
  ]),
 ],
 "flow": [
  TALK("0:00", "You already know all of this",
       "<p>Today is a test of everything so far: a class with a picture, a fall, a clean-up, a "
       "timer and a collision. Nothing new to learn, a lot to remember.</p>",
       ask=("A pickup should fall. Which line do you already know that makes something fall?",
            "self.y = self.y - a number, in its loop")),
  TALK("0:04", "Draw a pickup",
       "<p>Make <code>pickup.png</code> at 40 by 40 - a green cross or a heart - and a class "
       "called <strong>HealthPickup</strong>.</p>"),
  STEP(PICKUP_START, "look", "Give the pickup its picture",
       ["The pickup's picture."],
       at="0:08"),
  STEP(PICKUP_LOOP, "fall", "Make it fall",
       ["Falling, at a gentle 2 - this time the number is written right in."],
       at="0:10"),
  STEP(PICKUP_LOOP, "gone", "Clean it up",
       ["The same clean-up the rocks use."],
       at="0:13"),
  STEP(SPACE_START, "timers", "A second timer",
       ["A new timer, under the asteroid timer. Each spawner needs its own clock."],
       at="0:16",
       ask=("Why not reuse self.asteroidTimer?",
            "It resets to 0 every two seconds - pickups need their own count")),
  STEP(SPACE_LOOP, "pickups", "Spawn a pickup every five seconds",
       ["Under the asteroid lines - the asteroid spawner again, with three changes: a new timer, "
        "300 loops (five seconds), and a HealthPickup. Press Play and wait five seconds."],
       at="0:19"),
  STEP(SHIP_LOOP, "heal", "Catch a pickup",
       ["At the bottom of Spaceship loop: the crash pattern, but this time health goes UP."],
       at="0:32",
       ask=("What is the one difference from the rock crash?", "+ 1 instead of - 1")),
  TALK("0:42", "Balance",
       "<p>Ask whether pickups make the game too easy. Let them tune the 300.</p>"),
 ],
 "errors": [
   ("No pickups appear", "The spawner goes in Space loop, and self.healthPickupTimer = 0 in Space start, spelled the same."),
   ("Pickups fill the screen", "The reset line self.healthPickupTimer = 0 must be inside the if."),
   ("Catching does nothing", "'HealthPickup' in the quotes must match the class name exactly, capital H and P."),
   ("NameError: name 'random' is not defined", "Space loop already has import random at the top - check it is still there."),
 ],
 "recap": [
   "A new falling class is: picture, fall, clean up.",
   "A spawner is: count, trigger, reset - with its own [[timer]].",
   "300 loops is five seconds.",
   "A pickup is the crash pattern with + 1 instead of - 1.",
 ],
 "homework": [
   {"task": "Spot the copy", "detail": "Put the asteroid spawner and the pickup spawner side by side. Circle every word that is different.", "done": "You found exactly what changed between them."},
   {"task": "Seconds", "detail": "How many loops is 10 seconds? 2.5 seconds?", "done": "600 and 150."},
 ],
 "bonus": {"title": "A health cap",
           "body": "<p>Under the heal lines, add an <code>if</code>: when <code>self.health</code> "
                   "is greater than 5, set it back to 5. Now pickups can never take you past "
                   "full health.</p>"},
 "slides": [
   {"title": "You know all of this", "bullets": [
     "A picture, a fall, a clean-up", "A timer that spawns", "A collision that changes health"]},
   {"title": "Draw a pickup", "sub": "pickup.png - 40 x 40", "bullets": [
     "Green, so it looks good to catch", "Make a class called HealthPickup"]},
   {"title": "Give the pickup its picture", "bullets": [], "code": [(PICKUP_START, "look")]},
   {"title": "Make it fall", "bullets": [], "code": [(PICKUP_LOOP, "fall")]},
   {"title": "Clean it up", "bullets": [], "code": [(PICKUP_LOOP, "gone")]},
   {"title": "A second timer", "bullets": [], "code": [(SPACE_START, "timers")]},
   {"title": "Spawn a pickup every five seconds", "bullets": [], "code": [(SPACE_LOOP, "pickups")]},
   {"title": "Checkpoint: pickups fall", "checkpoint": True,
    "say": "Press Play and wait five seconds. A pickup drifts down. Catching it does nothing yet."},
   {"title": "Catch a pickup", "bullets": [], "code": [(SHIP_LOOP, "heal")]},
   {"title": "Checkpoint: heal up", "checkpoint": True,
    "say": "Press Play. Take a hit, then catch a pickup. Your health goes back up."},
 ],
},

# --------------------------------------------------------------- week 12 ----
{
 "n": 12,
 "title": "An enemy fleet",
 "big_idea": "Real enemies are not all the same. Today every enemy picks its own random speed and its own sideways drift, and a timer sends a new one every six seconds.",
 "new_concepts": ["random once, in start", "a negative number that moves you left"],
 "objectives": [
   "Use [[random]] in start so each object is different",
   "Move an object sideways with a number that may be negative",
   "Build a third spawner from the same pattern",
   "Clean up enemies that slip past you",
 ],
 "ops": [
  ADD(ENEMY_START, "imports", [
    "import random",
  ]),
  SET(ENEMY_START, "speed", [
    "self.speed = random.randint(1, 3)",
  ]),
  ADD(ENEMY_START, "drift", [
    "self.drift = random.randint(-2, 2)",
  ]),
  ADD(ENEMY_LOOP, "drift", [
    "self.x = self.x + self.drift",
  ]),
  ADD(SPACE_START, "timers", [
    "self.enemyTimer = 0",
  ]),
  ADD(SPACE_LOOP, "enemies", [
    "self.enemyTimer = self.enemyTimer + 1",
    "if self.enemyTimer >= 360:",
    "    self.newEnemy = Enemy()",
    "    self.newEnemy.x = random.randint(-600, 600)",
    "    self.newEnemy.y = 400",
    "    self.enemyTimer = 0",
  ]),
  ADD(ENEMY_LOOP, "gone", [
    "if self.y < -425:",
    "    destroy(self)",
  ]),
 ],
 "flow": [
  TALK("0:00", "Picked once",
       "<p>Put <code>random.randint</code> in an object's START and it is rolled once, when "
       "that object is made. Each enemy gets its own roll - and keeps it.</p>",
       ask=("If random speed were rolled in loop instead, what would the enemy do?",
            "Change speed sixty times a second - it would stutter")),
  STEP(ENEMY_START, "imports", "Bring in random",
       ["Enemy start needs its own <code>import random</code>, at the very top."],
       at="0:06"),
  STEP(ENEMY_START, "speed", "A random speed",
       ["Change one line: the speed is no longer always 1, but any of 1, 2 or 3."],
       at="0:08"),
  STEP(ENEMY_START, "drift", "A random drift",
       ["A second roll, from -2 to 2. Minus drifts left, plus drifts right, 0 goes straight "
        "down."],
       at="0:11",
       ask=("What does a drift of 0 do?", "Nothing sideways - the enemy falls straight down")),
  STEP(ENEMY_LOOP, "drift", "Drift sideways",
       ["Under the falling line: add the drift to x every loop. Adding a negative number moves "
        "it left. Press Play a few times."],
       at="0:15"),
  STEP(SPACE_START, "timers", "An enemy timer",
       ["A third timer, under the other two."],
       at="0:22"),
  STEP(SPACE_LOOP, "enemies", "Send a new enemy every six seconds",
       ["Under the pickup lines: the spawner pattern a third time. 360 loops is six seconds. "
        "Press Play and wait."],
       at="0:25",
       ask=("Which three words change from the pickup spawner?",
            "The timer's name, the number 360, and Enemy() instead of HealthPickup()")),
  STEP(ENEMY_LOOP, "gone", "Clean up enemies",
       ["At the bottom of Enemy loop: once it is below -425, destroy it."],
       at="0:38"),
  TALK("0:44", "The fleet",
       "<p>Press Play and watch for a while. No two enemies move the same way.</p>"),
 ],
 "errors": [
   ("NameError: name 'random' is not defined", "Enemy start needs its own import random at the very top. Each panel imports what it uses."),
   ("Enemies change speed all the time", "The random lines belong in Enemy start, not Enemy loop."),
   ("Enemies never drift", "Enemy loop needs self.x = self.x + self.drift."),
   ("No new enemies", "The enemyTimer lines go in Space loop, with self.enemyTimer = 0 in Space start."),
 ],
 "recap": [
   "[[random]] in [[start]] picks once, so each object keeps its own number.",
   "Adding a negative number makes x smaller - the enemy drifts left.",
   "A third spawner, the same three parts: count, trigger, reset.",
   "Every falling thing needs a clean-up.",
 ],
 "homework": [
   {"task": "Name the range", "detail": "List every number random.randint(-2, 2) can give.", "done": "-2, -1, 0, 1, 2."},
   {"task": "Harder", "detail": "Change the enemy speed range to (2, 5). Is it still fair?", "done": "You can say whether you kept the change, and why."},
 ],
 "bonus": {"title": "Bigger and smaller",
           "body": "<p>In <strong>Enemy start</strong>, give each enemy a random size: "
                   "<code>self.scaleX = random.randint(5, 15) / 10</code>, and set "
                   "<code>self.scaleY</code> to <code>self.scaleX</code>.</p>"},
 "slides": [
   {"title": "Rolled once, kept for ever", "bullets": [
     "random in start rolls one time", "Each enemy gets its own roll", "And keeps it all game"]},
   {"title": "Bring in random", "bullets": [], "code": [(ENEMY_START, "imports")]},
   {"title": "A random speed", "bullets": [], "code": [(ENEMY_START, "speed")]},
   {"title": "A random drift", "bullets": [], "code": [(ENEMY_START, "drift")]},
   {"title": "Drift sideways", "bullets": [], "code": [(ENEMY_LOOP, "drift")]},
   {"title": "Checkpoint: a wandering enemy", "checkpoint": True,
    "say": "Press Play a few times. The enemy falls at a different speed and drifts a different way each time."},
   {"title": "An enemy timer", "bullets": [], "code": [(SPACE_START, "timers")]},
   {"title": "Send a new enemy every six seconds", "bullets": [], "code": [(SPACE_LOOP, "enemies")]},
   {"title": "Checkpoint: the fleet", "checkpoint": True,
    "say": "Press Play and wait. Every six seconds a new enemy arrives somewhere along the top."},
   {"title": "Clean up enemies", "bullets": [], "code": [(ENEMY_LOOP, "gone")]},
 ],
},

# --------------------------------------------------------------- week 13 ----
{
 "n": 13,
 "title": "They shoot back",
 "big_idea": "Now the enemies fight too. Every enemy gets its own timer, and every two seconds it fires an orange laser straight down at you.",
 "new_concepts": ["a timer inside every object", "one class making another"],
 "draw": ["enemyLaser.png"],
 "objectives": [
   "Give every enemy its own [[timer]]",
   "Make one object from inside another object's loop",
   "Make an enemy laser cost you health",
   "Say why each enemy's timer is separate",
 ],
 "ops": [
  ADD(SHOT_START, "look", [
    "self.image = sprite('enemyLaser.png')",
  ]),
  ADD(SHOT_LOOP, "fly", [
    "self.y = self.y - 6",
  ]),
  ADD(SHOT_LOOP, "gone", [
    "if self.y < -425:",
    "    destroy(self)",
  ]),
  ADD(ENEMY_START, "shooting", [
    "self.shootTimer = 0",
  ]),
  ADD(ENEMY_LOOP, "shoot", [
    "self.shootTimer = self.shootTimer + 1",
    "if self.shootTimer >= 120:",
    "    self.shot = EnemyProjectile()",
    "    self.shot.x = self.x",
    "    self.shot.y = self.y",
    "    self.shootTimer = 0",
  ]),
  ADD(SHIP_LOOP, "zapped", [
    "shotHit = get_collision(self, 'EnemyProjectile')",
    "if shotHit:",
    "    destroy(shotHit)",
    "    self.health = self.health - 1",
  ]),
 ],
 "flow": [
  TALK("0:00", "A clock in every enemy",
       "<p>The Space room has ONE asteroid timer. But each enemy should fire on its own "
       "schedule - so the timer goes in Enemy, and every enemy gets its own.</p>",
       ask=("If there are four enemies, how many shootTimers are there?",
            "Four - one inside each enemy")),
  TALK("0:05", "Draw an enemy laser",
       "<p>Make <code>enemyLaser.png</code> at 8 by 24, in a different colour from yours, and a "
       "class called <strong>EnemyProjectile</strong>.</p>"),
  STEP(SHOT_START, "look", "Give the enemy laser its picture",
       ["The enemy laser's picture."],
       at="0:09"),
  STEP(SHOT_LOOP, "fly", "Fly down",
       ["Minus 6 - down, towards you."],
       at="0:11"),
  STEP(SHOT_LOOP, "gone", "Clean up",
       ["Destroyed once it passes the bottom."],
       at="0:13"),
  STEP(ENEMY_START, "shooting", "Every enemy's own timer",
       ["At the bottom of Enemy start. Because it is <code>self.shootTimer</code> inside Enemy, "
        "every enemy gets its own."],
       at="0:16"),
  STEP(ENEMY_LOOP, "shoot", "Fire every two seconds",
       ["Between the drift line and the clean-up. The spawner pattern, inside an enemy: count, "
        "and at 120 make an EnemyProjectile right where THIS enemy is. Press Play."],
       at="0:19",
       ask=("Here, self.x is whose x?", "The enemy's - these lines are in Enemy loop")),
  STEP(SHIP_LOOP, "zapped", "Getting shot hurts",
       ["At the bottom of Spaceship loop: the crash pattern a fifth time. An enemy laser costs "
        "one health."],
       at="0:32",
       ask=("Name every class your ship now checks for a crash.",
            "Asteroid, Enemy, HealthPickup and EnemyProjectile")),
  TALK("0:42", "Dodge",
       "<p>Two minutes of play. Ask who survived longest, and what they did.</p>"),
 ],
 "errors": [
   ("Enemies never fire", "self.shootTimer = 0 goes in Enemy start and the counting lines in Enemy loop - spelled the same."),
   ("Lasers come from the middle", "The shot's x and y must be copied from self.x and self.y."),
   ("Getting shot does nothing", "'EnemyProjectile' must be spelled exactly like the class."),
   ("Enemies fire a solid stream", "The reset self.shootTimer = 0 must be inside the if."),
 ],
 "recap": [
   "A [[timer]] inside Enemy means every enemy counts on its own.",
   "An enemy can make an EnemyProjectile at its own x and y.",
   "Getting shot is the crash pattern, costing one health.",
   "self always means the object whose code is running.",
 ],
 "homework": [
   {"task": "Who is self?", "detail": "For each panel you typed in today, write which object self is there.", "done": "You named four different selves."},
   {"task": "Fire rate", "detail": "Try enemies firing at 60 and at 240. Which is fair?", "done": "You picked a number."},
 ],
 "bonus": {"title": "Random fire",
           "body": "<p>In <strong>Enemy start</strong>, start the timer at "
                   "<code>random.randint(0, 100)</code> instead of 0. Now enemies made at the "
                   "same time do not all fire together.</p>"},
 "slides": [
   {"title": "A clock in every enemy", "bullets": [
     "self.shootTimer lives inside Enemy", "So every enemy has its own",
     "Each one fires on its own schedule"]},
   {"title": "Draw an enemy laser", "sub": "enemyLaser.png - 8 x 24", "bullets": [
     "A different colour from yours", "Make a class called EnemyProjectile"]},
   {"title": "Give the enemy laser its picture", "bullets": [], "code": [(SHOT_START, "look")]},
   {"title": "Fly down", "bullets": [], "code": [(SHOT_LOOP, "fly")]},
   {"title": "Clean up", "bullets": [], "code": [(SHOT_LOOP, "gone")]},
   {"title": "Every enemy's own timer", "bullets": [], "code": [(ENEMY_START, "shooting")]},
   {"title": "Fire every two seconds", "bullets": [], "code": [(ENEMY_LOOP, "shoot")]},
   {"title": "Checkpoint: incoming", "checkpoint": True,
    "say": "Press Play. Every two seconds the enemy fires a laser straight down. It passes through you for now."},
   {"title": "Getting shot hurts", "bullets": [], "code": [(SHIP_LOOP, "zapped")]},
   {"title": "Checkpoint: dodge", "checkpoint": True,
    "say": "Press Play and let an enemy laser hit you. Your health drops by one."},
 ],
},

# --------------------------------------------------------------- week 14 ----
{
 "n": 14,
 "title": "The boss",
 "big_idea": "Every shooter ends with a boss. After twenty seconds a huge ship arrives, sweeps from side to side, and takes ten hits to bring down.",
 "new_concepts": ["== exactly equal", "turning around with a minus", "a health bar for an enemy"],
 "draw": ["boss.png"],
 "objectives": [
   "Use == to make something happen exactly once",
   "Reverse a direction by making a speed negative",
   "Give the boss its own health that lasers take away",
   "Tell = (store) apart from == (compare)",
 ],
 "ops": [
  ADD(BOSS_START, "look", [
    "self.image = sprite('boss.png')",
  ]),
  ADD(BOSS_START, "speed", [
    "self.bossSpeed = 2",
  ]),
  ADD(SPACE_START, "timers", [
    "self.bossTimer = 0",
  ]),
  ADD(SPACE_LOOP, "boss", [
    "self.bossTimer = self.bossTimer + 1",
    "if self.bossTimer == 1200:",
    "    self.boss = Boss()",
    "    self.boss.y = 250",
  ]),
  ADD(BOSS_LOOP, "hover", [
    "self.x = self.x - self.bossSpeed",
    "if self.x < -400:",
    "    self.bossSpeed = -self.bossSpeed",
    "if self.x > 400:",
    "    self.bossSpeed = -self.bossSpeed",
  ]),
  ADD(BOSS_START, "health", [
    "self.bossHealth = 10",
  ]),
  ADD(BOSS_LOOP, "hit", [
    "bossHit = get_collision(self, 'Projectile')",
    "if bossHit:",
    "    destroy(bossHit)",
    "    self.bossHealth = self.bossHealth - 1",
    "if self.bossHealth <= 0:",
    "    destroy(self)",
  ]),
 ],
 "flow": [
  TALK("0:00", "Once, exactly",
       "<p>The other spawners reset and go again. The boss must come exactly once. "
       "<code>==</code> asks: is it EXACTLY this number? The timer passes 1200 once and never "
       "again.</p>",
       "<p>Write <code>=</code> and <code>==</code> side by side: one equals stores, two equals "
       "asks.</p>",
       ask=("What is the difference between = and ==?",
            "= puts a value into a name; == asks whether two things are equal")),
  TALK("0:06", "Draw the boss",
       "<p>Make <code>boss.png</code> at 160 by 100 - big and scary - and a class called "
       "<strong>Boss</strong>.</p>"),
  STEP(BOSS_START, "look", "Give the boss its picture",
       ["The boss's picture."],
       at="0:12"),
  STEP(BOSS_START, "speed", "Give the boss a speed",
       ["The boss's own speed, 2."],
       at="0:14"),
  STEP(SPACE_START, "timers", "A boss timer",
       ["A fourth timer, under the others."],
       at="0:16"),
  STEP(SPACE_LOOP, "boss", "The boss arrives",
       ["Under the enemy lines. Count every loop; at EXACTLY 1200 - twenty seconds - make the "
        "boss near the top. No reset: it happens once. Press Play and survive twenty seconds."],
       at="0:18",
       ask=("Why is there no line setting bossTimer back to 0?",
            "Then it would reach 1200 again - a new boss every twenty seconds")),
  STEP(BOSS_LOOP, "hover", "Sweep side to side",
       ["Move by the speed. Past -400 or past 400, <code>-self.bossSpeed</code> flips it: 2 "
        "becomes -2, and taking away -2 moves it the other way."],
       at="0:28"),
  STEP(BOSS_START, "health", "Give the boss health",
       ["Ten hits to bring it down."],
       at="0:36"),
  STEP(BOSS_LOOP, "hit", "Shoot the boss",
       ["The boss checks for YOUR lasers. A hit destroys the laser and costs the boss one "
        "health; at 0 the boss is destroyed."],
       at="0:38",
       ask=("Why does the boss check for Projectile, not the other way round?",
            "Either works - here the boss keeps its own health, so it counts its own hits")),
 ],
 "errors": [
   ("The boss never comes", "It is == 1200 with two equals signs, and the bossTimer lines go in Space loop."),
   ("A boss every twenty seconds", "There must be no reset line in the boss block."),
   ("The boss slides off the screen", "Both ifs flip self.bossSpeed with a minus in front: -self.bossSpeed."),
   ("SyntaxError on the if", "if self.bossTimer = 1200 is wrong - comparing needs ==."),
 ],
 "recap": [
   "== asks whether two things are exactly equal; = stores.",
   "A [[timer]] with no reset fires only once.",
   "-self.bossSpeed flips the direction.",
   "The boss keeps its own health and counts the lasers that hit it.",
 ],
 "homework": [
   {"task": "= or ==", "detail": "Write three lines from your game that use =, and the one that uses ==.", "done": "You can explain why the boss line needs two."},
   {"task": "Boss balance", "detail": "Try bossHealth 3 and 30. What makes a good fight?", "done": "You picked a number."},
 ],
 "bonus": {"title": "A boss that drops",
           "body": "<p>Inside the hover lines, take 0.1 off <code>self.y</code> every loop. The "
                   "boss sinks slowly towards you - the longer it lives, the closer it gets.</p>"},
 "slides": [
   {"title": "= stores, == asks", "sub": "if self.bossTimer == 1200:", "bullets": [
     "One equals puts a value in a name", "Two equals asks: exactly equal?",
     "The timer passes 1200 exactly once"]},
   {"title": "Draw the boss", "sub": "boss.png - 160 x 100", "bullets": [
     "Big and scary", "Make a class called Boss"]},
   {"title": "Give the boss its picture", "bullets": [], "code": [(BOSS_START, "look")]},
   {"title": "Give the boss a speed", "bullets": [], "code": [(BOSS_START, "speed")]},
   {"title": "A boss timer", "bullets": [], "code": [(SPACE_START, "timers")]},
   {"title": "The boss arrives", "bullets": [], "code": [(SPACE_LOOP, "boss")]},
   {"title": "Checkpoint: here it is", "checkpoint": True,
    "say": "Press Play and survive for twenty seconds. A huge boss appears near the top and waits there."},
   {"title": "Sweep side to side", "bullets": [], "code": [(BOSS_LOOP, "hover")]},
   {"title": "Checkpoint: it moves", "checkpoint": True,
    "say": "Press Play and wait for the boss. It sweeps left and right across the top, turning at each side."},
   {"title": "Give the boss health", "bullets": [], "code": [(BOSS_START, "health")]},
   {"title": "Shoot the boss", "bullets": [], "code": [(BOSS_LOOP, "hit")]},
   {"title": "Checkpoint: bring it down", "checkpoint": True,
    "say": "Press Play, wait for the boss and shoot it ten times. It disappears."},
 ],
},

# --------------------------------------------------------------- week 15 ----
{
 "n": 15,
 "title": "The boss fires back",
 "big_idea": "A boss that cannot hurt you is not a boss. Today it fires a wide death ray every three seconds, and a ray hit costs two health.",
 "new_concepts": ["stretching one way only", "a bigger penalty"],
 "draw": ["ray.png"],
 "objectives": [
   "Stretch a picture in one direction with scaleX",
   "Give the boss a firing [[timer]] of its own",
   "Make a ray hit cost two health",
   "Play the finished game from start to GAME OVER",
 ],
 "ops": [
  ADD(RAY_START, "look", [
    "self.image = sprite('ray.png')",
    "self.scaleX = 3",
  ]),
  ADD(RAY_LOOP, "fall", [
    "self.y = self.y - 5",
  ]),
  ADD(RAY_LOOP, "gone", [
    "if self.y < -425:",
    "    destroy(self)",
  ]),
  ADD(BOSS_START, "ray", [
    "self.rayTimer = 0",
  ]),
  ADD(BOSS_LOOP, "ray", [
    "self.rayTimer = self.rayTimer + 1",
    "if self.rayTimer >= 180:",
    "    self.ray = BossRay()",
    "    self.ray.x = self.x",
    "    self.ray.y = self.y",
    "    self.rayTimer = 0",
  ]),
  ADD(SHIP_LOOP, "rayed", [
    "rayHit = get_collision(self, 'BossRay')",
    "if rayHit:",
    "    destroy(rayHit)",
    "    self.health = self.health - 2",
  ]),
 ],
 "flow": [
  TALK("0:00", "The last piece",
       "<p>Everything in the boss's attack is something you have done before: a picture, a "
       "fall, a clean-up, a timer, a crash. Today you put it together without help.</p>",
       ask=("Which earlier class is the boss ray most like?",
            "EnemyProjectile - fired from an object's spot, falling, costing health")),
  TALK("0:04", "Draw the ray",
       "<p>Make <code>ray.png</code> at 20 by 60 and a class called <strong>BossRay</strong>. "
       "The code will stretch it three times wider.</p>"),
  STEP(RAY_START, "look", "The ray's picture, stretched",
       ["The ray's picture, then <code>scaleX = 3</code> on its own: three times as wide, the "
        "same height."],
       at="0:08",
       ask=("What would scaleY = 3 do instead?", "Make it three times taller, not wider")),
  STEP(RAY_LOOP, "fall", "Fall",
       ["Minus 5 every loop."],
       at="0:12"),
  STEP(RAY_LOOP, "gone", "Clean up",
       ["Destroyed past the bottom."],
       at="0:14"),
  STEP(BOSS_START, "ray", "The boss's firing timer",
       ["At the bottom of Boss start."],
       at="0:17"),
  STEP(BOSS_LOOP, "ray", "Fire every three seconds",
       ["Between the hover lines and the hit lines: count, and at 180 make a BossRay where the "
        "boss is."],
       at="0:19"),
  STEP(SHIP_LOOP, "rayed", "The ray hurts more",
       ["At the very bottom of Spaceship loop: the crash pattern one last time, minus 2."],
       at="0:30",
       ask=("How many ray hits can a full-health ship take?", "Two - 5, then 3, then 1, and the third ends it")),
  TALK("0:40", "You built a game",
       "<p>Play the whole thing: dodge, shoot, heal, survive the fleet, beat the boss. Every "
       "line of it, they wrote. Have them show each other.</p>"),
 ],
 "errors": [
   ("The ray is thin", "scaleX = 3 goes in BossRay start, under the picture line."),
   ("The boss never fires", "self.rayTimer = 0 in Boss start, and the counting lines in Boss loop, spelled the same."),
   ("A ray hit does nothing", "'BossRay' in the quotes must match the class name exactly."),
   ("The game goes to GAME OVER at once", "The ray takes 2 - check it says self.health - 2, not = 2."),
 ],
 "recap": [
   "scaleX on its own stretches one way.",
   "The boss fires with its own [[timer]], like every enemy does.",
   "A ray hit takes two health.",
   "Your Space Shooter is finished - every line typed by you.",
 ],
 "homework": [
   {"task": "Show it off", "detail": "Let someone at home play your game from start to GAME OVER.", "done": "Someone else played the game you built."},
   {"task": "Your next feature", "detail": "Write down one thing you would add next, and which classes it would touch.", "done": "You have a plan for one more feature."},
 ],
 "bonus": {"title": "Play again",
           "body": "<p>Open <strong>End loop</strong> and add: if <code>key_was_pressed(' ')</code>, "
                   "<code>set_room('Space')</code>. The Space room's start runs again, so a fresh "
                   "game begins with a new ship at full health.</p>"},
 "slides": [
   {"title": "The last piece", "bullets": [
     "A picture, a fall, a clean-up", "A timer inside the boss", "A crash that costs two"]},
   {"title": "Draw the ray", "sub": "ray.png - 20 x 60", "bullets": [
     "The code stretches it three times wider", "Make a class called BossRay"]},
   {"title": "The ray's picture, stretched", "bullets": [], "code": [(RAY_START, "look")]},
   {"title": "Fall", "bullets": [], "code": [(RAY_LOOP, "fall")]},
   {"title": "Clean up", "bullets": [], "code": [(RAY_LOOP, "gone")]},
   {"title": "The boss's firing timer", "bullets": [], "code": [(BOSS_START, "ray")]},
   {"title": "Fire every three seconds", "bullets": [], "code": [(BOSS_LOOP, "ray")]},
   {"title": "Checkpoint: the death ray", "checkpoint": True,
    "say": "Press Play and wait for the boss. Every three seconds it fires a wide ray straight down."},
   {"title": "The ray hurts more", "bullets": [], "code": [(SHIP_LOOP, "rayed")]},
   {"title": "Checkpoint: the whole game", "checkpoint": True,
    "say": "Press Play and play it all: dodge, shoot, heal, face the boss. A ray hit costs two health. Reach zero and it is GAME OVER."},
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
    if "scaleX" in stripped:
        keys.append("py:scale")
    if re.match(r"self\.\w+ = -?\d", stripped):
        keys.append("py:variable")
    if re.match(r"self\.[xy] = self\.[xy] [-+]", stripped):
        keys.append("py:change")
    if stripped.startswith("if "):
        keys.append("py:if")
    if "key_is_pressed(" in stripped:
        keys.append("py:keys")
    if "Background()" in stripped:
        keys.append("py:order")
    if re.search(r" (<|>|<=|>=) ", stripped):
        keys.append("py:compare")
    if "destroy(" in stripped:
        keys.append("py:destroy")
    if "get_collision(" in stripped:
        keys.append("py:collision")
    if re.match(r"[a-z]\w* = get_collision", stripped):
        keys.append("py:local")
    if re.match(r"self\.\w*Timer = self\.\w*Timer \+ 1", stripped):
        keys.append("py:timer")
    if stripped == "import random":
        keys.append("py:import")
    if "random.randint(" in stripped:
        keys.append("py:random")
    if "angle" in stripped:
        keys.append("py:angle")
    if "key_was_pressed(" in stripped:
        keys.append("py:press")
    if "= text()" in stripped:
        keys.append("py:text")
    if "str(" in stripped:
        keys.append("py:str")
    if " == " in stripped:
        keys.append("py:equals")
    if re.search(r"= -self\.", stripped):
        keys.append("py:negate")
    return keys


# key -> (kind, title, [bullets], example). kind picks the slide's eyebrow.
CONCEPTS = {
    "py:start": ("game", "start runs once",
        ["Everything in [[start]] runs one time, the moment the [[object]] is made.",
         "Use it to set a picture, a place or a starting number."],
        "self.image = sprite('ship.png')"),
    "py:loop": ("game", "loop runs over and over",
        ["[[loop]] runs about 60 times every second, until the object is gone.",
         "Anything that moves lives in loop."],
        "self.y = self.y - self.speed"),
    "py:room": ("game", "A room is one screen",
        ["Your game can have more than one screen. Each one is a [[room]].",
         "set_room picks which screen to show."],
        "set_room('Space')"),
    "py:sprite": ("art", "A sprite is your picture",
        ["[[sprite]]() finds the picture you drew and puts it on the [[object]].",
         "The name has to match exactly, including the .png."],
        "self.image = sprite('ship.png')"),
    "py:make": ("py", "Making an object",
        ["Spaceship() makes one spaceship from the Spaceship [[class]].",
         "The name on the left is how you talk to it afterwards."],
        "self.player = Spaceship()"),
    "py:dot": ("py", "The dot reaches inside",
        ["self.player.y means: the y that belongs to self.player.",
         "The [[dot]] lets the room change an object it made."],
        "self.player.y = -250"),
    "py:coords": ("game", "x and y",
        ["The middle of the screen is x 0, y 0.",
         "Plus x is right, plus y is UP. Minus goes left and down."],
        "self.rock.x = 200"),
    "py:scale": ("art", "scaleX and scaleY",
        ["1 is the size you drew. 0.5 is half, 2 is double.",
         "Change both by the same amount to keep the shape."],
        "self.scaleX = 0.5"),
    "py:variable": ("py", "A variable holds a value",
        ["A [[variable]] is a name with a value in it. The name goes left of =.",
         "self. in front makes it belong to this object, so start and loop can share it."],
        "self.speed = 1"),
    "py:change": ("py", "Change a value using itself",
        ["Python works out the right side first, then stores the answer on the left.",
         "Do it every [[loop]] and the object moves."],
        "self.y = self.y - self.speed"),
    "py:if": ("py", "if means only when",
        ["The lines under an [[if]] run only when its question is true.",
         "The if line ends with a colon; the lines under it start with four spaces."],
        "if key_is_pressed('A'):"),
    "py:keys": ("game", "key_is_pressed()",
        ["[[key_is_pressed('A')|key_is_pressed]] is True for every loop you hold A down.",
         "Put it in an if to move while a key is held."],
        "if key_is_pressed('A'):"),
    "py:order": ("game", "Made first, drawn at the back",
        ["Objects are drawn in the order they were made.",
         "Make the background first so everything else is drawn on top."],
        "self.background = Background()"),
    "py:compare": ("py", "Comparing numbers",
        ["&lt; is less than, &gt; is greater than.",
         "&lt;= and &gt;= also count the number itself."],
        "if self.y < -400:"),
    "py:destroy": ("game", "destroy() removes an object",
        ["[[destroy]](self) takes this object out of the game for good.",
         "Off the screen is not gone - something has to destroy it."],
        "destroy(self)"),
    "py:collision": ("game", "get_collision - are they touching?",
        ["[[get_collision(self, 'Asteroid')|get_collision]] gives back the rock you are touching, or False.",
         "An [[if]] treats the rock as yes and False as no."],
        "asteroidHit = get_collision(self, 'Asteroid')"),
    "py:local": ("py", "A name for right now",
        ["A name with no self. in front lives only inside this loop.",
         "Use it for an answer you need right here and nowhere else."],
        "asteroidHit = get_collision(self, 'Asteroid')"),
    "py:timer": ("py", "A timer counts loops",
        ["A [[timer]] goes up by one every loop. 60 loops is one second.",
         "Count, trigger at a number, reset to 0 - and it repeats."],
        "self.asteroidTimer = self.asteroidTimer + 1"),
    "py:import": ("py", "import brings in more Python",
        ["import random brings in Python's random numbers.",
         "Each panel imports what it uses, at the very top."],
        "import random"),
    "py:random": ("py", "A random number",
        ["[[random.randint(a, b)|random]] gives any whole number from a to b, each one as likely.",
         "Like rolling a die with that many sides."],
        "random.randint(-600, 600)"),
    "py:angle": ("game", "angle turns an object",
        ["[[angle]] is how far the object is turned.",
         "Add to it every loop and it spins."],
        "self.angle = self.angle + 2"),
    "py:press": ("game", "key_was_pressed()",
        ["[[key_was_pressed(' ')|key_was_pressed]] is True for only the one loop the key goes down.",
         "One press, one action - however long you hold it."],
        "if key_was_pressed(' '):"),
    "py:text": ("game", "text() puts words on the screen",
        ["[[text]]() makes a label. Its .text is the words it shows.",
         "Set its color, x and y like any object."],
        "self.healthLabel = text()"),
    "py:str": ("py", "str() turns a number into writing",
        ["You cannot add writing and a number.",
         "[[str]](5) is the writing '5', which can join 'Health: '."],
        "'Health: ' + str(self.player.health)"),
    "py:equals": ("py", "== asks, = stores",
        ["One = puts a value into a name.",
         "Two == asks whether two things are exactly equal."],
        "if self.bossTimer == 1200:"),
    "py:negate": ("py", "A minus turns it around",
        ["-self.bossSpeed is the same number, the other way: 2 becomes -2.",
         "Taking away -2 is the same as adding 2, so the boss turns back."],
        "self.bossSpeed = -self.bossSpeed"),
}


# --- the same concept, as the BOOK announces it -----------------------------
#
# key -> (kind, name, lead). "word" is something you type, printed as code;
# "idea" is a thing the code does. See pxp101/course.py for why.
BOOK_TERMS = {
    "py:start":     ("word", "start", ""),
    "py:loop":      ("word", "loop", ""),
    "py:room":      ("word", "room", ""),
    "py:sprite":    ("word", "sprite()", ""),
    "py:make":      ("idea", "Making an object", ""),
    "py:dot":       ("idea", "The dot", "The dot reaches inside an object."),
    "py:coords":    ("word", "x and y", "x and y are where an object is on the screen."),
    "py:scale":     ("word", "scaleX and scaleY", "They stretch or shrink an object's picture."),
    "py:variable":  ("idea", "A variable", ""),
    "py:change":    ("idea", "Changing a value", ""),
    "py:if":        ("word", "if", ""),
    "py:keys":      ("word", "key_is_pressed()", ""),
    "py:order":     ("idea", "Draw order", ""),
    "py:compare":   ("idea", "Comparing numbers", ""),
    "py:destroy":   ("word", "destroy()", ""),
    "py:collision": ("word", "get_collision()", ""),
    "py:local":     ("idea", "A name for right now", ""),
    "py:timer":     ("idea", "A timer", ""),
    "py:import":    ("word", "import", ""),
    "py:random":    ("word", "random.randint()", ""),
    "py:angle":     ("word", "angle", ""),
    "py:press":     ("word", "key_was_pressed()", ""),
    "py:text":      ("word", "text()", ""),
    "py:str":       ("word", "str()", ""),
    "py:equals":    ("word", "==", "== asks whether two things are equal."),
    "py:negate":    ("idea", "Turning around", ""),
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
    "class":   "A KIND of thing in your game - Spaceship, Asteroid, Enemy. Every object is made from one.",
    "object":  "One thing made from a class: your ship, one rock, one laser. You can see it and give it orders.",
    "sprite":  "The picture you drew, put onto an object. The name has to match exactly, including the .png.",
    "room":    "One screen of your game. Space is where you play and End says GAME OVER; set_room picks which one you see.",
    "start":   "The part of an object that runs once, the moment it is made - for its picture, its place and its starting numbers.",
    "loop":    "The part of an object that runs over and over, about sixty times a second. Anything that moves lives here.",
    "coordinates": "x and y, the address of a spot on the screen. The middle is 0, 0; plus x is right and plus y is up.",
    "dot":     "The . between two names. self.player.y means the y that belongs to self.player.",
    "variable": "A name that holds a value, like self.speed = 5. With self. in front it belongs to the object.",
    "scale":   "scaleX and scaleY stretch a picture: 1 is the size you drew, 0.5 is half, 2 is double.",
    "if":      "Runs the lines under it only when its question is true. The if ends with a colon and the lines under it are pushed in four spaces.",
    "key_is_pressed": "True for every loop you hold a key down, so holding A keeps the ship moving left.",
    "destroy": "Takes an object out of the game for good. destroy(self) removes the object whose code is running.",
    "get_collision": "Asks whether this object is touching one of a class. It gives back the thing it touches, or False.",
    "timer":   "A number that goes up by one every loop. 60 is one second; at the number you choose, something happens and the timer goes back to 0.",
    "random":  "Python's dice. random.randint(a, b) gives any whole number from a to b, each one just as likely.",
    "angle":   "How far an object is turned. Adding to it every loop makes it spin.",
    "key_was_pressed": "True for only the one loop a key goes down, so one press fires one laser.",
    "text":    "A label that shows words on the screen. You make one with text() and set its .text to what it says.",
    "str":     "Turns a number into writing, so str(5) is '5' and can be joined onto 'Health: '.",
}

# Animated metaphors. Reuses build.concept_visual's library - see SLIDE-RULES.
VISUALS = {
    "py:start": {"kind": "machine", "in": "object made", "label": "start", "out": "done once",
                 "cap": "[[start]] runs one time, then never again."},
    "py:loop": {"kind": "loop", "items": ["1", "2", "3", "4"],
                "cap": "[[loop]] runs again and again, about 60 times a second."},
    "py:room": {"kind": "swap", "off": "nothing", "on": "Space room",
                "cap": "A [[room]] is one screen. set_room picks which one you see."},
    "py:sprite": {"kind": "swap", "off": "nothing", "on": "your art",
                  "cap": "[[sprite]]() puts the picture you drew onto the [[object]]."},
    "py:make": {"kind": "dom", "parent": "Space room", "child": "a Spaceship", "mode": "add",
                "cap": "Spaceship() makes one and puts it in the [[room]]."},
    "py:coords": {"kind": "resize", "axis": "h",
                  "cap": "y is up and down. Minus numbers go DOWN."},
    "py:scale": {"kind": "resize", "axis": "w",
                 "cap": "[[scaleX and scaleY|scale]] stretch and shrink the picture."},
    "py:variable": {"kind": "machine", "in": "1", "label": "self.speed", "out": "kept",
                    "cap": "A [[variable]] is a name that keeps a value for later."},
    "py:change": {"kind": "machine", "in": "300", "label": "- 1", "out": "299",
                  "cap": "The old value goes in on the right; the new one is stored on the left."},
    "py:if": {"kind": "fork", "cond": "A held?", "yes": "move left", "no": "carry on",
              "cap": "[[if]] means only when - the pushed-in lines run only if it is true."},
    "py:keys": {"kind": "event", "btn": "hold A", "action": "x goes down",
                "cap": "[[key_is_pressed]] is True for as long as you hold the key."},
    "py:destroy": {"kind": "swap", "off": "a rock", "on": "(gone)",
                   "cap": "[[destroy]] takes an object out of the game for good."},
    "py:collision": {"kind": "fork", "cond": "touching?", "yes": "crash!", "no": "keep flying",
                     "cap": "[[get_collision]] answers with the thing you touch, or False."},
    "py:timer": {"kind": "loop", "items": ["118", "119", "120", "0"],
                 "cap": "A [[timer]] counts up, fires at its number, and starts again from 0."},
    "py:random": {"kind": "pick", "items": ["-600", "-200", "0", "200", "600"], "at": 1, "label": "?",
                  "cap": "[[random.randint|random]] lands on a different number every time."},
    "py:angle": {"kind": "motion",
                 "cap": "Add to [[angle]] every loop and the object spins."},
    "py:press": {"kind": "event", "btn": "space", "action": "one laser",
                 "cap": "[[key_was_pressed]] is True for one loop only - one press, one laser."},
    "py:text": {"kind": "swap", "off": "(nothing)", "on": "Health: 5",
                "cap": "[[text]]() puts words on the screen; .text is what they say."},
    "py:str": {"kind": "machine", "in": "5", "label": "str()", "out": "'5'",
               "cap": "[[str]]() turns a number into writing."},
    "py:negate": {"kind": "swap", "off": "bossSpeed = 2", "on": "bossSpeed = -2",
                  "cap": "A minus in front turns the boss around."},
}

LINE_NOTES = {
    (GAME_START, "setup"): ["Open the game on the room called Space."],
    (SHIP_START, "look"): ["Use the ship picture you drew."],
    (SPACE_START, "make"): [
        "Make one spaceship and keep it as self.player. Press Play!",
        "Move it down near the bottom. Minus y is down.",
    ],
    (ROCK_START, "look"): ["Use the asteroid picture you drew."],
    (SPACE_START, "rock"): [
        "Make one asteroid and keep it as self.rock.",
        "200 to the right of the middle.",
        "250 up from the middle.",
    ],
    (ROCK_START, "scale"): [
        "Half as wide...",
        "...and half as tall, so it keeps its shape.",
    ],
    (ENEMY_START, "look"): ["Use the enemy picture you drew."],
    (ENEMY_START, "speed"): ["How many steps this enemy moves every loop."],
    # Week 12 rewrites the speed; its own note, so week 3 keeps the first one.
    (12, ENEMY_START, "speed"): ["Now a random speed - 1, 2 or 3 - rolled once for this enemy."],
    (SPACE_START, "enemy"): [
        "Make one enemy.",
        "Over on the left.",
        "Up high, near the top.",
    ],
    (ENEMY_LOOP, "fall"): ["Take the speed off y, every loop. Down it goes."],
    (SHIP_START, "speed"): ["The ship moves 5 steps every loop a key is held."],
    (SHIP_LOOP, "sideways"): [
        "Only while A is held...",
        "...take the speed off x: left. Four spaces in front!",
        "Only while D is held...",
        "...add the speed to x: right.",
    ],
    (SHIP_LOOP, "updown"): [
        "Only while W is held...",
        "...add the speed to y: up.",
        "Only while S is held...",
        "...take the speed off y: down.",
    ],
    (BACK_START, "look"): ["Use the space picture you drew."],
    (SPACE_START, "back"): ["At the VERY TOP: make the background first, so it is drawn at the back."],
    (ROCK_START, "speed"): ["The rock's own speed."],
    (ROCK_LOOP, "fall"): ["Take the speed off y every loop, so the rock falls."],
    (ROCK_LOOP, "gone"): [
        "Only once the rock is below -400, past the bottom...",
        "...take it out of the game for good.",
    ],
    (SHIP_LOOP, "rockHits"): [
        "Am I touching an Asteroid? Keep the answer in asteroidHit.",
        "Only when I really am...",
        "...destroy the rock I hit...",
        "...and destroy myself.",
    ],
    # Week 10 swaps the last line, so the notes for that week say so.
    (10, SHIP_LOOP, "rockHits"): [
        "Am I touching an Asteroid?",
        "Only when I am...",
        "...destroy the rock...",
        "...and lose one health instead of the whole ship.",
    ],
    (SHIP_LOOP, "enemyHits"): [
        "Am I touching an Enemy? Keep the answer in enemyHit.",
        "Only when I really am...",
        "...destroy the enemy I hit...",
        "...and destroy myself.",
    ],
    (10, SHIP_LOOP, "enemyHits"): [
        "Am I touching an Enemy?",
        "Only when I am...",
        "...destroy the enemy...",
        "...and lose one health instead.",
    ],
    # timers grows a line in weeks 7, 11, 12 and 14; one list covers them all.
    (SPACE_START, "timers"): [
        "The asteroid timer starts at 0.",
        "A second timer, for pickups.",
        "A third, for enemies.",
        "A fourth, for the boss.",
    ],
    (SPACE_LOOP, "asteroids"): [
        "Add one to the timer, every loop.",
        "Only once it reaches 120 - two seconds...",
        "...make a new asteroid...",
        "...up above the top of the screen...",
        "...and set the timer back to 0, so it counts again.",
    ],
    # Week 8 slots one line into the middle; its notes line up with the new block.
    (8, SPACE_LOOP, "asteroids"): [
        "Add one to the timer, every loop.",
        "Only once it reaches 120...",
        "...make a new asteroid...",
        "NEW: drop it at a random x, from -600 to 600. Four spaces in front.",
        "...up above the top...",
        "...and reset the timer.",
    ],
    (SPACE_LOOP, "imports"): ["Bring in Python's random numbers, at the very top of Space loop."],
    (ROCK_LOOP, "spin"): ["Turn a little more every loop, so the rock spins."],
    (LASER_START, "look"): ["Use the laser picture you drew."],
    (LASER_LOOP, "fly"): ["Up 8 every loop - fast."],
    (SHIP_LOOP, "shoot"): [
        "Only on the one loop space goes down...",
        "...make a laser...",
        "...at the ship's own x...",
        "...and the ship's own y.",
    ],
    (LASER_LOOP, "rocks"): [
        "Is this laser touching an Asteroid?",
        "Only when it is...",
        "...destroy the rock...",
        "...and the laser.",
    ],
    (LASER_LOOP, "enemies"): [
        "Is this laser touching an Enemy?",
        "Only when it is...",
        "...destroy the enemy...",
        "...and the laser.",
    ],
    (LASER_LOOP, "gone"): [
        "Only once the laser is above 400, past the top...",
        "...destroy it.",
    ],
    (SHIP_START, "health"): ["Five health to start."],
    (SPACE_START, "hud"): [
        "Make a label - words on the screen.",
        "White, so it shows on space.",
        "Over on the left.",
        "Up at the top.",
    ],
    (SPACE_LOOP, "hud"): [
        "Every loop, rewrite it with the ship's health. str() turns the number into writing.",
    ],
    (END_START, "message"): [
        "A label for the End room.",
        "White writing.",
        "Big - 60.",
        "Lined up in the middle.",
        "The words to show.",
    ],
    (SPACE_LOOP, "over"): [
        "Only once the ship's health is 0 or less...",
        "...switch to the End room.",
    ],
    (PICKUP_START, "look"): ["Use the pickup picture you drew."],
    (PICKUP_LOOP, "fall"): ["Down 2 every loop - gently."],
    (PICKUP_LOOP, "gone"): [
        "Only once it is below -400...",
        "...destroy it.",
    ],
    (SPACE_LOOP, "pickups"): [
        "Count the pickup timer up, every loop.",
        "Only once it reaches 300 - five seconds...",
        "...make a pickup...",
        "...at a random x...",
        "...above the top...",
        "...and reset this timer.",
    ],
    (SHIP_LOOP, "heal"): [
        "Am I touching a HealthPickup?",
        "Only when I am...",
        "...destroy the pickup...",
        "...and gain one health.",
    ],
    (ENEMY_START, "imports"): ["Enemy start needs its own random, at the very top."],
    (ENEMY_START, "drift"): ["A random drift from -2 to 2, rolled once. Minus drifts left."],
    (ENEMY_LOOP, "drift"): ["Add the drift to x every loop, so the enemy slides sideways."],
    (SPACE_LOOP, "enemies"): [
        "Count the enemy timer up, every loop.",
        "Only once it reaches 360 - six seconds...",
        "...make an enemy...",
        "...at a random x...",
        "...above the top...",
        "...and reset this timer.",
    ],
    (ENEMY_LOOP, "gone"): [
        "Only once the enemy is below -425...",
        "...destroy it.",
    ],
    (SHOT_START, "look"): ["Use the enemy laser picture you drew."],
    (SHOT_LOOP, "fly"): ["Down 6 every loop, towards you."],
    (SHOT_LOOP, "gone"): [
        "Only once it is below -425...",
        "...destroy it.",
    ],
    (ENEMY_START, "shooting"): ["This enemy's own firing timer, starting at 0."],
    (ENEMY_LOOP, "shoot"): [
        "Count this enemy's timer up.",
        "Only once it reaches 120...",
        "...make an enemy laser...",
        "...at this enemy's x...",
        "...and this enemy's y...",
        "...and reset the timer.",
    ],
    (SHIP_LOOP, "zapped"): [
        "Am I touching an EnemyProjectile?",
        "Only when I am...",
        "...destroy the shot...",
        "...and lose one health.",
    ],
    (BOSS_START, "look"): ["Use the boss picture you drew."],
    (BOSS_START, "speed"): ["The boss's own speed."],
    (SPACE_LOOP, "boss"): [
        "Count the boss timer up, every loop.",
        "Only at EXACTLY 1200 - twenty seconds, once...",
        "...make the boss...",
        "...near the top. No reset: one boss only.",
    ],
    (BOSS_LOOP, "hover"): [
        "Move by the boss's speed.",
        "Only once it is past the left side...",
        "...turn it around: 2 becomes -2.",
        "Only once it is past the right side...",
        "...turn it around again.",
    ],
    (BOSS_START, "health"): ["Ten hits to bring it down."],
    (BOSS_LOOP, "hit"): [
        "Is one of your lasers touching me?",
        "Only when it is...",
        "...destroy that laser...",
        "...and lose one boss health.",
        "Only once the boss health reaches 0...",
        "...the boss is destroyed.",
    ],
    (RAY_START, "look"): [
        "Use the ray picture you drew.",
        "Three times as wide - and the same height.",
    ],
    (RAY_LOOP, "fall"): ["Down 5 every loop."],
    (RAY_LOOP, "gone"): [
        "Only once it is below -425...",
        "...destroy it.",
    ],
    (BOSS_START, "ray"): ["The boss's firing timer, starting at 0."],
    (BOSS_LOOP, "ray"): [
        "Count the ray timer up.",
        "Only once it reaches 180 - three seconds...",
        "...make a ray...",
        "...at the boss's x...",
        "...and the boss's y...",
        "...and reset the timer.",
    ],
    (SHIP_LOOP, "rayed"): [
        "Am I touching a BossRay?",
        "Only when I am...",
        "...destroy the ray...",
        "...and lose TWO health.",
    ],
}

DELETE_NOTES = {
    (SHIP_LOOP, "rockHits"): "This line changes - a rock no longer destroys your ship. Take out destroy(self); the health line goes in its place.",
    (SHIP_LOOP, "enemyHits"): "The same change here: take out destroy(self), and the health line goes in its place.",
    (ENEMY_START, "speed"): "This line changes - the speed is no longer always 1. Take it out; the random version is next.",
}


# --- what pressing Play should show you -------------------------------------
#
# One line per step, keyed (week, panel, block). A step that changes nothing
# you can see says so, so working code is never mistaken for broken code.
CHECKS = {
    (1, GAME_START, "setup"):
        "Nothing to see yet - the screen stays empty. You are checking there is no "
        "red error.",
    (1, SHIP_START, "look"):
        "Still nothing. You have described the ship, but nobody has MADE one yet - "
        "that is the next step.",
    (1, SPACE_START, "make"):
        "Your ship appears in the middle of the screen.",
    (1, ROCK_START, "look"):
        "No change - no Asteroid has been made yet.",
    (1, SPACE_START, "rock"):
        "A big rock appears right on top of your ship. That is right for today.",
    (2, SPACE_START, "make"):
        "Your ship drops to near the bottom of the screen.",
    (2, SPACE_START, "rock"):
        "The rock moves up to the top right.",
    (2, ROCK_START, "scale"):
        "The rock is half the size it was.",
    (3, ENEMY_START, "look"):
        "No change - no Enemy has been made yet.",
    (3, ENEMY_START, "speed"):
        "Still no change. The speed is a number waiting to be used.",
    (3, SPACE_START, "enemy"):
        "An enemy appears up on the left. It does not move yet.",
    (3, ENEMY_LOOP, "fall"):
        "The enemy creeps slowly down the screen and off the bottom.",
    (4, SHIP_START, "speed"):
        "Nothing changes - nothing uses the ship's speed yet.",
    (4, SHIP_LOOP, "sideways"):
        "Click the game, then hold A and D. Your ship flies left and right.",
    (4, SHIP_LOOP, "updown"):
        "W and S fly up and down too. Fly all over the screen.",
    (5, BACK_START, "look"):
        "No change - no Background has been made yet.",
    (5, SPACE_START, "back"):
        "Your space picture fills the screen, behind everything else.",
    (5, ROCK_START, "speed"):
        "No change - nothing uses the rock's speed yet.",
    (5, ROCK_LOOP, "fall"):
        "The rock falls down the screen and off the bottom.",
    (5, ROCK_LOOP, "gone"):
        "It looks exactly the same - the rock is cleaned up after it has already "
        "gone out of sight. No red error means it worked.",
    (6, SHIP_LOOP, "rockHits"):
        "Fly into the falling rock. The rock and your ship both disappear.",
    (6, SHIP_LOOP, "enemyHits"):
        "Fly into the enemy. Both of you are gone.",
    (7, SPACE_START, "timers"):
        "Nothing changes - the timer is a number the room keeps, and nothing counts "
        "it yet.",
    (7, SPACE_LOOP, "asteroids"):
        "Wait two seconds: a new rock falls down the middle. Then another, every two "
        "seconds.",
    (8, SPACE_LOOP, "imports"):
        "Nothing changes - random is ready, but nothing uses it until the next step.",
    (8, SPACE_LOOP, "asteroids"):
        "New rocks now fall from all across the top - a different spot every time.",
    (8, ROCK_LOOP, "spin"):
        "Every rock turns slowly as it falls.",
    (9, LASER_START, "look"):
        "No change - no Projectile is made yet.",
    (9, LASER_LOOP, "fly"):
        "Still no change. Nothing makes a laser until the next step.",
    (9, SHIP_LOOP, "shoot"):
        "Click the game and tap space. A laser leaves your ship and flies up. It goes "
        "straight through rocks for now.",
    (9, LASER_LOOP, "rocks"):
        "Shoot a rock. The rock and the laser both disappear.",
    (9, LASER_LOOP, "enemies"):
        "Shoot the enemy. It is gone.",
    (9, LASER_LOOP, "gone"):
        "Nothing you can see changes - missed lasers are cleaned up above the screen. "
        "No red error means it worked.",
    (10, SHIP_START, "health"):
        "Nothing changes - the ship has a health now, but nothing uses it yet.",
    (10, SHIP_LOOP, "rockHits"):
        "Fly into a rock. The rock goes, but your ship stays!",
    (10, SHIP_LOOP, "enemyHits"):
        "Fly into the enemy. It goes, and your ship stays.",
    (10, SPACE_START, "hud"):
        "A white label appears in the top left - empty for now, so you may see "
        "nothing. The next step gives it words.",
    (10, SPACE_LOOP, "hud"):
        "Health: 5 shows in the top left. Hit a rock and watch it drop to 4.",
    (10, END_START, "message"):
        "Nothing changes - nothing goes to the End room yet. That is the next step.",
    (10, SPACE_LOOP, "over"):
        "Crash until your health reaches 0. The screen changes to GAME OVER.",
    (11, PICKUP_START, "look"):
        "No change - no HealthPickup is made yet.",
    (11, PICKUP_LOOP, "fall"):
        "Still no change, for the same reason.",
    (11, PICKUP_LOOP, "gone"):
        "Still no change. The spawner is two steps away.",
    (11, SPACE_START, "timers"):
        "Nothing changes - a second timer, not counting yet.",
    (11, SPACE_LOOP, "pickups"):
        "Wait five seconds: a pickup drifts down. Catching it does nothing yet.",
    (11, SHIP_LOOP, "heal"):
        "Take a hit, then catch a pickup. Your health goes back up.",
    (12, ENEMY_START, "imports"):
        "Nothing changes - random is ready for the next line.",
    (12, ENEMY_START, "speed"):
        "Press Play a few times. The enemy falls at a different speed each time.",
    (12, ENEMY_START, "drift"):
        "Nothing new to see - the drift is rolled, but nothing uses it yet.",
    (12, ENEMY_LOOP, "drift"):
        "Press Play a few times. The enemy drifts left, right or straight down.",
    (12, SPACE_START, "timers"):
        "Nothing changes - a third timer, not counting yet.",
    (12, SPACE_LOOP, "enemies"):
        "Wait six seconds: a new enemy arrives at the top. Every six seconds, another.",
    (12, ENEMY_LOOP, "gone"):
        "Nothing you can see changes - enemies are cleaned up once they are past the "
        "bottom. No red error means it worked.",
    (13, SHOT_START, "look"):
        "No change - no EnemyProjectile is made yet.",
    (13, SHOT_LOOP, "fly"):
        "Still no change.",
    (13, SHOT_LOOP, "gone"):
        "Still no change. Enemies start firing two steps from now.",
    (13, ENEMY_START, "shooting"):
        "Nothing changes - each enemy has a timer, but it does not count yet.",
    (13, ENEMY_LOOP, "shoot"):
        "Every two seconds each enemy fires a laser straight down. It passes through "
        "you for now.",
    (13, SHIP_LOOP, "zapped"):
        "Let an enemy laser hit you. Your health drops by one.",
    (14, BOSS_START, "look"):
        "No change - there is no boss yet.",
    (14, BOSS_START, "speed"):
        "Still no change.",
    (14, SPACE_START, "timers"):
        "Nothing changes - the boss timer is not counting yet.",
    (14, SPACE_LOOP, "boss"):
        "Survive for twenty seconds. A huge boss appears near the top and waits there.",
    (14, BOSS_LOOP, "hover"):
        "Wait for the boss. It sweeps left and right, turning at each side.",
    (14, BOSS_START, "health"):
        "Nothing changes - lasers do not hurt the boss until the next step.",
    (14, BOSS_LOOP, "hit"):
        "Shoot the boss ten times. It disappears.",
    (15, RAY_START, "look"):
        "No change - no BossRay is made yet.",
    (15, RAY_LOOP, "fall"):
        "Still no change.",
    (15, RAY_LOOP, "gone"):
        "Still no change. The boss starts firing two steps from now.",
    (15, BOSS_START, "ray"):
        "Nothing changes - the boss's firing timer is not counting yet.",
    (15, BOSS_LOOP, "ray"):
        "Wait for the boss. Every three seconds it fires a wide ray straight down. It "
        "passes through you for now.",
    (15, SHIP_LOOP, "rayed"):
        "Let a ray hit you. Your health drops by two. That is the whole game.",
}


def check_for(week_n, panel, block):
    """What to look for after Play, for one step. The build refuses to ship a
    step that has no line, so this may raise rather than return nothing."""
    return CHECKS[(week_n, panel, block)]

QUIZZES = {
    (1, SPACE_START, "rock"): [
        {"q": "What is a class?",
         "options": ["A kind of thing, like Asteroid", "One rock on the screen",
                     "A picture", "A room"], "answer": 0,
         "why": "A class is the kind; every rock is an object made from it."},
        {"q": "When does start run?",
         "options": ["Once, when the object is made", "Sixty times a second",
                     "When you press a key", "Never"], "answer": 0,
         "why": "start runs one time, the moment the object is made."},
        {"q": "Why are the ship and the rock both in the middle?",
         "options": ["Every object starts at 0, 0 until you move it", "The room is too small",
                     "It is an error", "The pictures are the same"], "answer": 0,
         "why": "Nothing has told them where to go yet, so both start at x 0, y 0."},
    ],
    (2, ROCK_START, "scale"): [
        {"q": "Where is y = -250?",
         "options": ["Near the bottom", "Near the top", "On the left", "In the middle"], "answer": 0,
         "why": "Plus y is up, minus y is down."},
        {"q": "What does self.player.y mean?",
         "options": ["The y that belongs to self.player", "A new player",
                     "The room's y", "The ship's picture"], "answer": 0,
         "why": "The dot reaches inside self.player to its y."},
        {"q": "What does scaleX = 0.5 do? (this week)",
         "options": ["Makes the picture half as wide", "Moves it left",
                     "Makes it twice as wide", "Turns it"], "answer": 0,
         "why": "1 is normal size; 0.5 is half."},
    ],
    (3, ENEMY_LOOP, "fall"): [
        {"q": "Why does the falling line go in loop, not start?",
         "options": ["start runs once; loop keeps moving it", "loop is faster to type",
                     "start cannot use y", "It does not matter"], "answer": 0,
         "why": "Moving means a small change again and again - that is loop."},
        {"q": "y is 300 and speed is 1. What is y after three loops?",
         "options": ["297", "303", "300", "3"], "answer": 0,
         "why": "Each loop takes 1 off: 299, 298, 297."},
        {"q": "Why self.speed and not just speed? (this week)",
         "options": ["So it belongs to the enemy and loop can use it",
                     "To make it faster", "Python likes long names", "It is a picture"], "answer": 0,
         "why": "self. makes it the enemy's own, shared by its start and its loop."},
    ],
    (4, SHIP_LOOP, "updown"): [
        {"q": "When does the line under an if run?",
         "options": ["Only when the if is true", "Always", "Never", "Twice"], "answer": 0,
         "why": "if means only when."},
        {"q": "How does Python know a line belongs to the if?",
         "options": ["It is pushed in four spaces", "It is on the next page",
                     "It has a capital letter", "It ends with a colon"], "answer": 0,
         "why": "Indenting under the colon is how Python groups lines."},
        {"q": "Which key adds to y? (this week)",
         "options": ["W", "S", "A", "D"], "answer": 0,
         "why": "Plus y is up, and W flies up."},
    ],
    (5, ROCK_LOOP, "gone"): [
        {"q": "Why is the background made first?",
         "options": ["Made first means drawn at the back", "It is the biggest",
                     "Python needs it", "It loads faster"], "answer": 0,
         "why": "Objects are drawn in the order they are made."},
        {"q": "What does if self.y < -400: ask?",
         "options": ["Is y less than -400?", "Is y more than -400?",
                     "Is y exactly -400?", "Is the rock spinning?"], "answer": 0,
         "why": "&lt; means less than."},
        {"q": "Why destroy a rock you cannot see? (this week)",
         "options": ["Otherwise it keeps falling for ever", "To score a point",
                     "To make a new one", "It is not needed"], "answer": 0,
         "why": "Off the screen is not gone - the game keeps working on it every loop."},
    ],
    (6, SHIP_LOOP, "enemyHits"): [
        {"q": "What does get_collision(self, 'Asteroid') give back?",
         "options": ["The rock you touch, or False", "Always True",
                     "A new asteroid", "The number of rocks"], "answer": 0,
         "why": "It answers with the thing you are touching, or False if nothing."},
        {"q": "Why is asteroidHit written without self.?",
         "options": ["It is only needed right here in this loop", "It is a mistake",
                     "self. is only for numbers", "To make it faster"], "answer": 0,
         "why": "A name without self. lives only inside this loop."},
        {"q": "What changes between the rock crash and the enemy crash? (this week)",
         "options": ["The class name and the variable name", "Everything",
                     "Nothing at all", "Only the indentation"], "answer": 0,
         "why": "Same pattern: only 'Enemy' and enemyHit are new."},
    ],
    (7, SPACE_LOOP, "asteroids"): [
        {"q": "How many loops are there in two seconds?",
         "options": ["120", "60", "2", "200"], "answer": 0,
         "why": "Loop runs sixty times a second."},
        {"q": "What does &gt;= mean?",
         "options": ["Greater than or equal to", "Less than", "Exactly equal", "Not equal"], "answer": 0,
         "why": "&gt;= counts the number itself as well."},
        {"q": "What happens without the reset line? (this week)",
         "options": ["After two seconds, a rock every loop", "No rocks at all",
                     "One rock only", "An error"], "answer": 0,
         "why": "The timer would stay above 120, so the if would fire every loop."},
    ],
    (8, ROCK_LOOP, "spin"): [
        {"q": "What can random.randint(1, 6) give?",
         "options": ["Any of 1 to 6, each as likely", "Only 1 or 6",
                     "Always 3", "A random word"], "answer": 0,
         "why": "Like a die: every whole number from 1 to 6."},
        {"q": "Where does import random go?",
         "options": ["At the very top of the panel", "Inside the if",
                     "At the bottom", "In Game start only"], "answer": 0,
         "why": "Imports come first, before anything uses them."},
        {"q": "How would you spin the other way? (this week)",
         "options": ["Take 2 away from angle instead", "Use scaleX",
                     "Add 20", "Destroy the rock"], "answer": 0,
         "why": "Adding turns one way, taking away turns the other."},
    ],
    (9, SHIP_LOOP, "shoot"): [
        {"q": "Why key_was_pressed for the laser?",
         "options": ["One press makes one laser", "It is faster",
                     "key_is_pressed does not work for space", "It looks nicer"], "answer": 0,
         "why": "key_is_pressed would fire every loop you held space."},
        {"q": "In Spaceship loop, what is self.x?",
         "options": ["The ship's x", "The laser's x", "The room's x", "Always 0"], "answer": 0,
         "why": "self is the object whose code is running - here, the ship."},
        {"q": "Why copy the ship's x and y to the laser? (this week)",
         "options": ["So the laser starts where the ship is", "To move the ship",
                     "To make two ships", "To destroy it"], "answer": 0,
         "why": "A new object starts at 0, 0 unless you tell it otherwise."},
    ],
    (10, SPACE_LOOP, "hud"): [
        {"q": "Why does health = health - 1 give a NameError?",
         "options": ["Without self. Python looks for a name in this loop only", "Health is a picture",
                     "You cannot take away 1", "The ship is destroyed"], "answer": 0,
         "why": "self.health is the ship's own; plain health does not exist."},
        {"q": "What does str() do?",
         "options": ["Turns a number into writing", "Makes a label",
                     "Rounds a number", "Prints an error"], "answer": 0,
         "why": "Writing and a number cannot be added, so str(5) makes '5'."},
        {"q": "Why does the label line go in Space loop? (this week)",
         "options": ["Health keeps changing, so it is rewritten every loop", "start is full",
                     "Labels only work in loop", "It does not matter"], "answer": 0,
         "why": "Written once in start, it would say 5 for ever."},
    ],
    (11, SHIP_LOOP, "heal"): [
        {"q": "Why does the pickup spawner need its own timer?",
         "options": ["The asteroid timer keeps resetting every two seconds",
                     "Timers cannot be shared by law", "To use less memory", "It does not"], "answer": 0,
         "why": "Each spawner counts its own time."},
        {"q": "How many loops is five seconds?",
         "options": ["300", "500", "5", "60"], "answer": 0,
         "why": "60 a second, times five."},
        {"q": "What is different from the rock crash? (this week)",
         "options": ["Health goes up by one instead of down", "Nothing",
                     "It destroys the ship", "It uses key_was_pressed"], "answer": 0,
         "why": "The same pattern with + 1."},
    ],
    (12, SPACE_LOOP, "enemies"): [
        {"q": "Why roll the enemy's speed in start?",
         "options": ["So each enemy picks once and keeps it", "start is faster",
                     "random only works in start", "To make every enemy the same"], "answer": 0,
         "why": "Rolled in loop it would change sixty times a second."},
        {"q": "What does a drift of -2 do?",
         "options": ["Slides the enemy left", "Slides it right",
                     "Makes it fall faster", "Nothing"], "answer": 0,
         "why": "Adding a negative number makes x smaller."},
        {"q": "How many seconds is 360 loops? (this week)",
         "options": ["6", "3", "36", "60"], "answer": 0,
         "why": "360 divided by 60."},
    ],
    (13, SHIP_LOOP, "zapped"): [
        {"q": "Four enemies are on the screen. How many shootTimers are there?",
         "options": ["Four - one in each enemy", "One", "None", "Sixty"], "answer": 0,
         "why": "self.shootTimer lives inside Enemy, so every enemy has its own."},
        {"q": "In Enemy loop, whose x is self.x?",
         "options": ["This enemy's", "The ship's", "The room's", "The laser's"], "answer": 0,
         "why": "self is the object whose code is running."},
        {"q": "How much health does an enemy laser cost? (this week)",
         "options": ["One", "Two", "All of it", "None"], "answer": 0,
         "why": "self.health = self.health - 1."},
    ],
    (14, BOSS_LOOP, "hit"): [
        {"q": "What is the difference between = and ==?",
         "options": ["= stores a value, == asks if two things are equal", "None",
                     "== is faster", "= is only for numbers"], "answer": 0,
         "why": "One equals stores; two equals compares."},
        {"q": "Why is there no reset in the boss spawner?",
         "options": ["The boss should come only once", "It was forgotten",
                     "Resets only work with >=", "To save a line"], "answer": 0,
         "why": "Without a reset the timer passes 1200 exactly once."},
        {"q": "What does self.bossSpeed = -self.bossSpeed do? (this week)",
         "options": ["Turns the boss around", "Stops the boss",
                     "Makes it twice as fast", "Destroys it"], "answer": 0,
         "why": "2 becomes -2, so the boss moves the other way."},
    ],
    (15, SHIP_LOOP, "rayed"): [
        {"q": "What does scaleX = 3 on its own do?",
         "options": ["Three times as wide, same height", "Three times as tall",
                     "Three times bigger all over", "Moves it 3 right"], "answer": 0,
         "why": "scaleX stretches only left to right."},
        {"q": "Which class is the boss ray most like?",
         "options": ["EnemyProjectile", "Background", "HealthPickup", "Spaceship"], "answer": 0,
         "why": "Fired from an object's spot, falling, and costing health."},
        {"q": "A full-health ship takes ray hits. How many end the game? (this week)",
         "options": ["Three", "One", "Five", "Two"], "answer": 0,
         "why": "5, then 3, then 1, then -1 - the third ray takes it to zero or below."},
    ],
}

EXPANDED_WEEKS = set(range(1, 16))
