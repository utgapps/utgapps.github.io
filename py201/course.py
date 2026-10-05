"""PY201 - RPG. The whole course as one data structure.

This is the only file to edit. ../pxp101/build.py replays WEEKS to produce the
playable milestones, the teacher curriculum, the textbook, the homework book
and the slides, so none of them can drift apart. Run `python build.py` here.

WHERE THIS COMES FROM

The UTG PY201 guide: a top-down role-playing game in PixelPad. Pixelhead walks
a forest in four directions, collects ore for money, is stung by wasps, gets a
sword from a merchant, swings it the way it faces, and fights wasps that take
three hits and drop random loot - then walks off the edge of the screen into a
field and a swamp. The game, its classes and its order are the guide's; the
guide's extra-time tasks are the bonuses.

WHAT CHANGED FROM THE GUIDE, AND WHY

  * The guide builds everything in Game start and moves it into a Forest room
    with copy, paste and delete once the field arrives. Here the Forest room
    exists from week 1, so nothing is typed twice - and making Pixelhead
    persistent is week 1's own lesson, seen the moment set_room removes it.
  * The guide writes self.y = self.y + 10 and prints x and y to the console on
    every loop, then rewrites and deletes both. Here every line is written
    once, where it stays: Pixelhead walks 4 a loop from the start, and the
    console only ever says something worth reading - money, health and what
    the merchant tells you.
  * The guide spawns loot on every sword hit and then, in a debugging
    activity, moves it under the defeat check. Here it goes there the first
    time; the wrong place is the talk at the start of week 12.
  * The rewrites kept are the ones that ARE the lesson: the sting that costs
    health instead of Pixelhead (week 10), the wasp that takes three hits
    instead of one (week 11), the ore that picks its own colour (week 12) and
    the merchant who learns to charge (week 15).
  * The guide gives a wasp 20 loops between sword hits, but a slash lives
    30, so one swing often hit twice. Here the wasp waits 40 - longer than a
    slash lives - and why it must be longer is week 11's question.
  * The guide uses new_object('Player') and new_sprite(...). This uses
    Player() and sprite(...), as PY101 and PY102 do - the same calls, the form
    the engine documents, and the one the classroom editor runs.
"""

import re

import pixelpad

COURSE_CODE = "PY201"
TOOL = "py201"
AUDIENCE = "eleven-to-fourteen-year-olds"

# The guide's busiest day types about twenty lines. A week may not add more.
WEEK_LINE_CAP = 20
# One step shows at most this many lines before it stops to explain.
MAX_STEP_LINES = 6
# Indentation and one-line ifs - see pixelpad.check_python_rules.
check_code_rules = pixelpad.check_python_rules

DRAW_SIZE_NOTE = ("Draw it at this size. Draw the wasp facing LEFT, Pixelhead and the "
                  "sword slash facing RIGHT - the code flips and turns them.")

CODE_HEADS = {"get_collision": "get_collision()", "key_is_pressed": "key_is_pressed()",
              "key_was_pressed": "key_was_pressed()", "destroy": "destroy()",
              "set_room": "set_room()", "print": "print()", "str": "str()",
              "randint": "random.randint()"}

COURSE_TITLE = "PY201 · RPG"
COURSE_BLURB = (
    "Fifteen weeks building a role-playing game in Python. Pixelhead explores a forest, "
    "a field and a swamp, collects ore, buys a sword from a merchant and fights wasps "
    "that drop random loot. You write every line."
)
PROJECT_BLURB = (
    "A three-room adventure. Walk with the arrow keys, collect ore for money, trade with "
    "the merchant with E, swing your sword with F the way you face, and heal in the "
    "swamp - with health, wasps that take three hits, and loot that is never the same "
    "twice."
)

TOTAL_WEEKS = 15

# The finished game is about 170 lines. This is the ceiling, not a target.
LINE_BUDGET = 200
BONUS_BUDGET = 60

DISCLAIMER = """
<p><strong>Nothing here needs the internet except the code editor itself.</strong> The
game runs entirely in the browser - there is no server, no account and no API key anywhere
in this course.</p>
<p><strong>The students draw the art.</strong> Every sprite is listed with the exact size
to draw it. The generated games use plain coloured rectangles as stand-ins so the code can
be tested; they are meant to be replaced.</p>
<p><strong>Keep the console open.</strong> From week 3 the game writes money, health and
the merchant's words to the console under the game. If a student cannot see it, that is
the first thing to fix.</p>
"""

TEACHER_PREAMBLE = """
<p><strong>Ask before you tell.</strong> The guide this course comes from is built on
questions - which class does this belong to, start or loop, why did that happen - and every
hour here keeps at least three of them. Let a student answer before the slide does.</p>
<p><strong>Let the bugs happen.</strong> Several steps are typed so that something goes
wrong on purpose: Pixelhead vanishes when the room changes, hides behind the forest, and
sword slashes pile up on the screen. The book says what they should see. Ask why before you
fix it - that conversation is the lesson.</p>
<p><strong>Indentation is the rule to be strict about.</strong> Four spaces, only after a
line ending in a colon, and eight for an if inside an if. Most errors are a missing colon,
a missing <code>self.</code> or a capital letter: read the red message together and find
its line.</p>
<p><strong>Pacing.</strong> A week that runs long drops its bonus, never its Play moments.
Weeks 10, 12 and 13 are the busiest; give them the whole hour. Week 9 is light on purpose -
use the spare time to let everyone catch up and redraw their art.</p>
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
PLAYER_START, PLAYER_LOOP = "Player start", "Player loop"
ORE_START = "Collectible start"
BACK_START = "Background start"
WASP_START, WASP_LOOP = "FlyEnemy start", "FlyEnemy loop"
NPC_START, NPC_LOOP = "NPC start", "NPC loop"
SLASH_START, SLASH_LOOP = "PlayerAttack start", "PlayerAttack loop"
HEALER_START, HEALER_LOOP = "Healer start", "Healer loop"
FOREST_START, FOREST_LOOP = "Forest start", "Forest loop"
FIELD_START, FIELD_LOOP = "Field start", "Field loop"
SWAMP_START, SWAMP_LOOP = "Swamp start", "Swamp loop"

PANELS = [GAME_START,
          PLAYER_START, PLAYER_LOOP,
          ORE_START,
          BACK_START,
          WASP_START, WASP_LOOP,
          NPC_START, NPC_LOOP,
          SLASH_START, SLASH_LOOP,
          HEALER_START, HEALER_LOOP,
          FOREST_START, FOREST_LOOP,
          FIELD_START, FIELD_LOOP,
          SWAMP_START, SWAMP_LOOP]

# The Forest is there from week 1; the Field arrives in week 13, the Swamp in 14.
ROOMS = ["Forest", "Field", "Swamp"]

ORDER = {
    # Pixelhead is made in Game, once, and kept through every room change;
    # the room is entered last.
    GAME_START: ["player", "setup"],
    PLAYER_START: ["look", "keep", "front", "money", "sword", "direction", "health"],
    PLAYER_LOOP: ["sideways", "updown", "collect", "enemies", "attack", "dead"],
    # import goes at the very top of the code that uses it.
    ORE_START: ["import", "look"],
    BACK_START: ["look"],
    WASP_START: ["look", "speed", "health"],
    WASP_LOOP: ["import", "fly", "turn", "swordhit", "defeat"],
    NPC_START: ["look"],
    NPC_LOOP: ["talk"],
    SLASH_START: ["look", "timer"],
    SLASH_LOOP: ["fade"],
    HEALER_START: ["look"],
    HEALER_LOOP: ["heal"],
    # The background is made first so it is drawn first, at the back - which
    # is why week 3 types it at the very top, above week 1's ores.
    FOREST_START: ["back", "ores", "wasps", "npc", "wasp3", "hint"],
    FOREST_LOOP: ["east", "south"],
    FIELD_START: ["back", "things"],
    FIELD_LOOP: ["west"],
    SWAMP_START: ["back", "stretch", "wasps", "healer"],
    SWAMP_LOOP: ["north"],
}

# name -> (stand-in colour, width, height) as the student draws it.
SPRITES = {
    "pixelheadRight.png": ("orange", 60, 80),
    "pixelheadUp.png": ("orange", 60, 80),
    "pixelheadDown.png": ("orange", 60, 80),
    "yellowOre.png": ("yellow", 40, 40),
    "pinkOre.png": ("red", 40, 40),
    "blueOre.png": ("blue", 40, 40),
    "forest.png": ("dgreen", 1280, 720),
    "field.png": ("green", 1280, 720),
    "swamp.png": ("gray", 1280, 360),
    "wasp.png": ("dark", 80, 64),
    "npc.png": ("brown", 60, 80),
    "swordSlash.png": ("white", 80, 80),
    "healer.png": ("purple", 60, 80),
}


WEEKS = [

# ---------------------------------------------------------------- week 1 ----
{
 "n": 1,
 "title": "Into the forest",
 "big_idea": "Every game is built from objects. Today you make Pixelhead and two ores, put the ores in a [[room]] called Forest - and find out why Pixelhead has to be [[persistent]] to go there too.",
 "new_concepts": ["class", "object", "sprite", "room", "persistent"],
 "draw": ["pixelheadRight.png", "yellowOre.png"],
 "objectives": [
   "Say what a [[class]] is, and what an [[object]] made from it is",
   "Give a class its picture with [[sprite]]() and place objects with x and y",
   "Change rooms with set_room, and say what happens to the objects in the old one",
   "Keep an object through a room change with [[persistent]]",
 ],
 "ops": [
  ADD(PLAYER_START, "look", [
    "self.image = sprite('pixelheadRight.png')",
  ]),
  ADD(GAME_START, "player", [
    "self.player = Player()",
  ]),
  ADD(ORE_START, "look", [
    "self.image = sprite('yellowOre.png')",
  ]),
  ADD(FOREST_START, "ores", [
    "self.ore1 = Collectible()",
    "self.ore1.x = 300",
    "self.ore1.y = 100",
    "self.ore2 = Collectible()",
    "self.ore2.x = -250",
    "self.ore2.y = -80",
  ]),
  ADD(GAME_START, "setup", [
    "set_room('Forest')",
  ]),
  ADD(PLAYER_START, "keep", [
    "self.persistent = True",
  ]),
 ],
 "flow": [
  TALK("0:00", "Play the game you are going to build",
       "<p>Open the week 15 page and play the finished RPG on the board for two minutes. "
       "Collect an ore, trade with the merchant, swing the sword, walk into the field.</p>",
       "<p>Say the promise: <em>every line of that game, you are going to write.</em></p>",
       ask=("What different kinds of thing can you see?",
            "Pixelhead, ores, wasps, a merchant - each one is a different class")),
  TALK("0:07", "Classes and objects",
       "<p>A [[class]] is a blueprint - a recipe for a kind of thing. An [[object]] is one "
       "thing built from it. Collectible is the class; every ore on the screen is a "
       "Collectible object.</p>",
       "<p>In the editor, make the classes <strong>Player</strong> and "
       "<strong>Collectible</strong>, and a room called <strong>Forest</strong>. Capitals "
       "matter.</p>",
       ask=("If Collectible is the class, what is each ore?",
            "An object - one thing built from the Collectible blueprint")),
  TALK("0:12", "Draw Pixelhead and an ore",
       "<p>Make <code>pixelheadRight.png</code> at 60 by 80, facing RIGHT, and "
       "<code>yellowOre.png</code> at 40 by 40. Ten minutes at most - the art can be "
       "improved any week.</p>"),
  STEP(PLAYER_START, "look", "Give Pixelhead a picture",
       ["[[start]] runs ONCE, the moment a Player is made. <code>sprite('pixelheadRight.png')</code> "
        "finds the picture you drew and makes it this player's image."],
       at="0:22"),
  STEP(GAME_START, "player", "Make Pixelhead",
       ["The Game class runs first, when you press Play. <code>Player()</code> builds one "
        "player and <code>self.player</code> is the name the game keeps it under. Press Play."],
       at="0:25",
       ask=("Where does Pixelhead appear, and why there?",
            "In the middle - nobody has said where, so it starts at x 0, y 0")),
  STEP(ORE_START, "look", "Give the ore a picture",
       ["The ore gets its picture the same way Pixelhead did."],
       at="0:30"),
  STEP(FOREST_START, "ores", "Two ores in the forest",
       ["In the Forest room's start: build two ores and use the [[dot]] to place them. "
        "The middle of the screen is 0, 0; plus x is right and plus y is up."],
       at="0:32"),
  STEP(GAME_START, "setup", "Go to the forest",
       ["Under the player line: <code>set_room</code> changes to the Forest [[room]]. Press "
        "Play. The ores appear - and Pixelhead is gone!"],
       at="0:38",
       ask=("Where did Pixelhead go?",
            "set_room removed every object from before - Pixelhead included")),
  STEP(PLAYER_START, "keep", "Keep Pixelhead",
       ["A [[persistent]] object survives a room change. Press Play: Pixelhead and the two "
        "ores, together."],
       at="0:42"),
 ],
 "errors": [
   ("NameError: name 'Collectible' is not defined", "The class must be called Collectible exactly - capital C, two l's."),
   ("A grey box instead of your picture", "The picture's name and the name in sprite('...') must match exactly, capitals and .png included."),
   ("Only the ores - no Pixelhead", "self.persistent = True goes in Player start, and True has a capital T."),
   ("NameError: name 'Forest' is not defined", "The room must be called Forest exactly, and set_room('Forest') needs the quotes."),
 ],
 "recap": [
   "A [[class]] is a blueprint; an [[object]] is one thing built from it.",
   "[[start]] runs once, the moment an object is made.",
   "set_room changes the screen and removes every object from before.",
   "A [[persistent]] object survives the change.",
 ],
 "homework": [
   {"task": "Make Pixelhead yours", "detail": "Redraw pixelheadRight.png as a hero you would want to play. Keep it 60 by 80, facing right.", "done": "You press Play and your own hero is in the forest."},
   {"task": "Blueprint and building", "detail": "Write one sentence that uses the words class and object about something that is not a game - a house, a cake, a car.", "done": "Something like: the recipe is the class, each cake is an object."},
 ],
 "bonus": {"title": "A third ore",
           "body": "<p>Under the ores in <strong>Forest start</strong>, add "
                   "<code>self.ore3</code> at x 0 and y -250. Then try <code>self.ore3.scaleX = 2</code> "
                   "- what happens? Keep it or take it out.</p>"},
 "slides": [
   {"title": "RPG", "sub": "The game you are going to build", "bullets": [
     "Walk in four directions", "Collect ore for money", "Fight wasps with a sword",
     "Explore three rooms"]},
   {"title": "Classes and objects", "sub": "A blueprint, and the things built from it", "bullets": [
     "A class is a kind of thing: Player, Collectible", "An object is one thing built from it",
     "Every ore is a Collectible object"]},
   {"title": "Draw your art", "sub": "pixelheadRight.png 60 x 80 - yellowOre.png 40 x 40", "bullets": [
     "Pixelhead facing RIGHT", "Exactly those names", "You can redraw them any week"]},
   {"title": "Give Pixelhead a picture", "bullets": [], "code": [(PLAYER_START, "look")]},
   {"title": "Make Pixelhead", "bullets": [], "code": [(GAME_START, "player")]},
   {"title": "Checkpoint: Pixelhead is here", "checkpoint": True,
    "say": "Press Play. Pixelhead stands in the middle of the screen."},
   {"title": "Give the ore a picture", "bullets": [], "code": [(ORE_START, "look")]},
   {"title": "Two ores in the forest", "bullets": [], "code": [(FOREST_START, "ores")]},
   {"title": "Go to the forest", "bullets": [], "code": [(GAME_START, "setup")]},
   {"title": "Checkpoint: where did Pixelhead go?", "checkpoint": True,
    "say": "Press Play. Two ores - and no Pixelhead. Ask why before the next slide."},
   {"title": "Keep Pixelhead", "bullets": [], "code": [(PLAYER_START, "keep")]},
   {"title": "Checkpoint: into the forest", "checkpoint": True,
    "say": "Press Play. Pixelhead stands in the middle with an ore on each side."},
 ],
},

# ---------------------------------------------------------------- week 2 ----
{
 "n": 2,
 "title": "Four directions",
 "big_idea": "Start runs once; [[loop]] runs forever. Today Pixelhead walks in all four directions while you hold the arrows - and changes picture to face the way it walks.",
 "new_concepts": ["loop", "if", "key_is_pressed()", "scaleX"],
 "draw": ["pixelheadUp.png", "pixelheadDown.png"],
 "objectives": [
   "Say the difference between [[start]] and [[loop]]",
   "Read self.x = self.x + 4 out loud and say what it does",
   "Use [[if]] and [[key_is_pressed]] to move only while a key is held",
   "Change an object's picture, and flip it with a minus [[scaleX|scale]]",
 ],
 "ops": [
  ADD(PLAYER_LOOP, "sideways", [
    "if key_is_pressed('arrowRight'):",
    "    self.x = self.x + 4",
    "    self.image = sprite('pixelheadRight.png')",
    "    self.scaleX = 1",
    "if key_is_pressed('arrowLeft'):",
    "    self.x = self.x - 4",
    "    self.image = sprite('pixelheadRight.png')",
    "    self.scaleX = -1",
  ]),
  ADD(PLAYER_LOOP, "updown", [
    "if key_is_pressed('arrowUp'):",
    "    self.y = self.y + 4",
    "    self.image = sprite('pixelheadUp.png')",
    "    self.scaleX = 1",
    "if key_is_pressed('arrowDown'):",
    "    self.y = self.y - 4",
    "    self.image = sprite('pixelheadDown.png')",
    "    self.scaleX = 1",
  ]),
 ],
 "flow": [
  TALK("0:00", "Start and loop",
       "<p>[[start]] runs once, when the object is made. [[loop]] runs again and again, about "
       "sixty times every second, until the object is gone.</p>",
       "<p>Read <code>self.x = self.x + 4</code> out loud: <em>my new x is my old x plus "
       "4</em>. Once is a tiny step; sixty times a second is walking.</p>",
       ask=("If start only runs once, how could anything ever move?",
            "Something has to run again and again - that is loop")),
  TALK("0:07", "Draw two more Pixelheads",
       "<p>Make <code>pixelheadUp.png</code> (Pixelhead's back) and "
       "<code>pixelheadDown.png</code> (its face), both 60 by 80. There is no left picture: "
       "the code flips the right one.</p>"),
  STEP(PLAYER_LOOP, "sideways", "Walk left and right",
       ["In Player LOOP: only while the right arrow is held, add 4 to x and face right. "
        "The lines under the [[if]] are pushed in four spaces.",
        "The left arrow takes 4 away, and <code>scaleX = -1</code> flips the right-facing "
        "picture like a mirror. Click the game, then hold the arrows."],
       at="0:15",
       ask=("Why does left use the RIGHT picture?",
            "scaleX = -1 flips it, so one drawing faces both ways")),
  STEP(PLAYER_LOOP, "updown", "Walk up and down",
       ["Up adds to y - plus y is up the screen - and shows Pixelhead's back.",
        "Down takes away from y and shows its face. Each picture is set back to "
        "<code>scaleX = 1</code>, so walking left and then up does not leave it mirrored."],
       at="0:28",
       ask=("What would happen without the scaleX = 1 under up?",
            "After walking left, the up picture would still be flipped")),
  TALK("0:40", "Play with the numbers",
       "<p>Let them try 2 and 10 instead of 4. Which feels right for walking? Agree on a "
       "number and keep it the same in all four directions.</p>"),
 ],
 "errors": [
   ("IndentationError", "The lines under an if start with exactly four spaces, and the if line ends with a colon."),
   ("Pixelhead does not move", "Click on the game first so it hears the keys, and check the code is in Player loop, not Player start."),
   ("Pixelhead flies off and never stops", "That line is not pushed in under the if, so it runs every loop whether you hold the key or not."),
   ("Left goes right", "Left takes 4 away: self.x - 4. Plus is right, minus is left."),
 ],
 "recap": [
   "[[loop]] runs about sixty times a second.",
   "self.x = self.x + 4 means: my new x is my old x plus 4.",
   "The lines under an [[if]] run only while its question is true.",
   "scaleX = -1 flips a picture; scaleX = 1 is the way you drew it.",
 ],
 "homework": [
   {"task": "Say it in English", "detail": "Write if key_is_pressed('arrowUp'): self.y = self.y + 4 as an English sentence.", "done": "Something like: while up is held, my y goes up by 4."},
   {"task": "Redraw", "detail": "Make your up and down pictures match your right one - same colours, same hero.", "done": "Walking around, your hero looks like one character from every side."},
 ],
 "bonus": {"title": "Run",
           "body": "<p>Inside the right-arrow if, add a nested if: <code>if key_is_pressed('shift'):</code> "
                   "with <code>self.x = self.x + 4</code> pushed in eight spaces. Now shift and right "
                   "runs twice as fast. Can you do it for the other three directions?</p>"},
 "slides": [
   {"title": "Start and loop", "sub": "Once, and over and over", "bullets": [
     "start runs once, when the object is made", "loop runs about 60 times a second",
     "Anything that moves lives in loop"]},
   {"title": "Draw two more", "sub": "pixelheadUp.png and pixelheadDown.png - 60 x 80", "bullets": [
     "Up shows Pixelhead's back", "Down shows its face", "No left picture - the code flips right"]},
   {"title": "Walk left and right", "bullets": [], "code": [(PLAYER_LOOP, "sideways")]},
   {"title": "Checkpoint: left and right", "checkpoint": True,
    "say": "Press Play, click the game and hold the arrows. Pixelhead walks left and right, facing the way it walks."},
   {"title": "Walk up and down", "bullets": [], "code": [(PLAYER_LOOP, "updown")]},
   {"title": "Checkpoint: four directions", "checkpoint": True,
    "say": "Press Play. Pixelhead walks in all four directions and shows a different side each way."},
 ],
},

# ---------------------------------------------------------------- week 3 ----
{
 "n": 3,
 "title": "Collect the ore",
 "big_idea": "Today the forest gets its picture, Pixelhead learns to stay in front of it, and walking into an ore picks it up - with your money counted in the [[console|print]].",
 "new_concepts": ["draw order", "z", "get_collision()", "destroy()", "print()", "str()"],
 "draw": ["forest.png"],
 "objectives": [
   "Explain why the background must be made first, and what [[z]] does",
   "Use [[get_collision]] to find out what Pixelhead is touching",
   "Remove an object with [[destroy]]",
   "Write a message to the console with [[print]] and [[str]]",
 ],
 "ops": [
  ADD(BACK_START, "look", [
    "self.image = sprite('forest.png')",
  ]),
  ADD(FOREST_START, "back", [
    "self.background = Background()",
  ]),
  ADD(PLAYER_START, "front", [
    "self.z = 1",
  ]),
  ADD(PLAYER_START, "money", [
    "self.money = 0",
  ]),
  ADD(PLAYER_LOOP, "collect", [
    "oreHit = get_collision(self, 'Collectible')",
    "if oreHit:",
    "    destroy(oreHit)",
    "    self.money = self.money + 1",
    "    print('Money: ' + str(self.money))",
  ]),
 ],
 "flow": [
  TALK("0:00", "Draw the forest",
       "<p>Make a class called <strong>Background</strong> and draw <code>forest.png</code> "
       "at 1280 by 720 - the whole screen. Paths, trees, a pond: anything Pixelhead could "
       "walk around in.</p>"),
  STEP(BACK_START, "look", "Give the background its picture",
       ["The background gets the forest you drew."],
       at="0:10"),
  STEP(FOREST_START, "back", "Put up the forest",
       ["At the VERY TOP of Forest start, above the ores: make the background first, so it "
        "is drawn at the back. Press Play. The ores are there - but where is Pixelhead?"],
       at="0:12",
       ask=("The ores are in front of the forest. Why is Pixelhead behind it?",
            "Objects are drawn in the order they are made, and Pixelhead was made first, in Game")),
  STEP(PLAYER_START, "front", "Stay in front",
       ["Everything starts at a [[z]] of 0. A bigger z is drawn in front, whenever it was "
        "made."],
       at="0:18"),
  TALK("0:20", "Money",
       "<p>Which class should keep the money - the ore or Pixelhead? Pixelhead: the ore is "
       "about to be destroyed, and the money has to last.</p>",
       ask=("Should collecting go in Player start or Player loop?",
            "Loop - it has to keep checking for a touch, again and again")),
  STEP(PLAYER_START, "money", "Start with no money",
       ["A [[variable]] called money, starting at 0. <code>self.</code> makes it Pixelhead's, "
        "so loop can use it too."],
       at="0:24"),
  STEP(PLAYER_LOOP, "collect", "Pick up the ore",
       ["At the bottom of Player loop: [[get_collision]] answers with the ore you are touching, "
        "or False. Touching one, you [[destroy]] it, add 1 to your money, and [[print]] it to "
        "the console. [[str]]() turns the number into words so + can join them."],
       at="0:27",
       ask=("Why does print need str(self.money)?",
            "+ cannot join words and a number - str turns the number into words")),
  TALK("0:40", "Read the console",
       "<p>Make sure every student can see the console under the game. Collect both ores and "
       "read it together: <em>Money: 1</em>, <em>Money: 2</em>.</p>"),
 ],
 "errors": [
   ("Pixelhead is still hidden", "self.z = 1 goes in Player start, and z is a small letter."),
   ("TypeError when you touch an ore", "print needs str(self.money). 'Money: ' + self.money tries to add words to a number."),
   ("The ore disappears but the money stays 0", "self.money = self.money + 1 must be pushed in under the if, and spelled the same as in Player start."),
   ("NameError: name 'oreHit' is not defined", "The name must be spelled the same in all three places: oreHit, capital H."),
 ],
 "recap": [
   "Objects are drawn in the order they are made, unless [[z]] says otherwise.",
   "[[get_collision]] gives back what you touch, or False.",
   "[[destroy]] takes an object out of the game.",
   "[[print]] writes to the console; [[str]] turns a number into words.",
 ],
 "homework": [
   {"task": "Why z?", "detail": "Explain in one sentence why the ores were in front of the forest but Pixelhead was not.", "done": "The ores were made after the background; Pixelhead was made before it."},
   {"task": "Read the console", "detail": "Without pressing Play: Pixelhead has 4 money and touches an ore. What does the console say?", "done": "Money: 5"},
 ],
 "bonus": {"title": "Say thank you",
           "body": "<p>Under the money print, add a second <code>print</code> that says "
                   "something when the money reaches 2. You need an if inside the if: "
                   "<code>if self.money == 2:</code>.</p>"},
 "slides": [
   {"title": "Draw the forest", "sub": "forest.png - 1280 x 720", "bullets": [
     "Make a class called Background", "The whole screen", "Somewhere Pixelhead can explore"]},
   {"title": "Give the background its picture", "bullets": [], "code": [(BACK_START, "look")]},
   {"title": "Put up the forest", "bullets": [], "code": [(FOREST_START, "back")]},
   {"title": "Checkpoint: where is Pixelhead?", "checkpoint": True,
    "say": "Press Play. The forest and the ores - but Pixelhead is hidden behind the forest. Ask why."},
   {"title": "Stay in front", "bullets": [], "code": [(PLAYER_START, "front")]},
   {"title": "Who keeps the money?", "sub": "Player, not Collectible", "bullets": [
     "The ore is about to be destroyed", "The money has to last", "Collecting is checked every loop"]},
   {"title": "Start with no money", "bullets": [], "code": [(PLAYER_START, "money")]},
   {"title": "Pick up the ore", "bullets": [], "code": [(PLAYER_LOOP, "collect")]},
   {"title": "Checkpoint: collect them both", "checkpoint": True,
    "say": "Press Play and walk into both ores. Each one disappears, and the console says Money: 1, then Money: 2."},
 ],
},

# ---------------------------------------------------------------- week 4 ----
{
 "n": 4,
 "title": "Wasps",
 "big_idea": "The forest gets dangerous. Today you make a FlyEnemy class whose wasps fly across the forest - and a sting removes Pixelhead from the game.",
 "new_concepts": ["speed", "local names"],
 "draw": ["wasp.png"],
 "objectives": [
   "Give a class its own speed and use it every loop",
   "Make two objects from one class in two different places",
   "Check for a touch between two different classes",
   "Say why a name like waspHit has no self. in front",
 ],
 "ops": [
  ADD(WASP_START, "look", [
    "self.image = sprite('wasp.png')",
  ]),
  ADD(WASP_START, "speed", [
    "self.speed = 2",
  ]),
  ADD(WASP_LOOP, "fly", [
    "self.x = self.x - self.speed",
  ]),
  ADD(FOREST_START, "wasps", [
    "self.wasp1 = FlyEnemy()",
    "self.wasp1.x = 400",
    "self.wasp1.y = -200",
    "self.wasp2 = FlyEnemy()",
    "self.wasp2.x = 600",
    "self.wasp2.y = 200",
  ]),
  ADD(PLAYER_LOOP, "enemies", [
    "waspHit = get_collision(self, 'FlyEnemy')",
    "if waspHit:",
    "    destroy(self)",
  ]),
 ],
 "flow": [
  TALK("0:00", "Draw a wasp",
       "<p>Make a class called <strong>FlyEnemy</strong> and draw <code>wasp.png</code> at 80 "
       "by 64, facing LEFT - it flies left first.</p>",
       ask=("Where should the line that makes a wasp fly go - start or loop?",
            "Loop - flying is a small move, again and again")),
  STEP(WASP_START, "look", "Give the wasp its picture",
       ["The wasp gets its picture, like every class before it."],
       at="0:10"),
  STEP(WASP_START, "speed", "Give the wasp a speed",
       ["<code>self.speed</code> is how far this wasp flies each loop. Keeping it in a "
        "[[variable]] means one number to change, and each wasp could have its own."],
       at="0:12"),
  STEP(WASP_LOOP, "fly", "Fly left",
       ["In FlyEnemy LOOP: take the speed off x, every loop. Nothing has made a wasp yet, so "
        "there is nothing to see."],
       at="0:14"),
  STEP(FOREST_START, "wasps", "Two wasps in the forest",
       ["Under the ores: two wasps, one low and one high. Press Play and watch them fly."],
       at="0:16",
       ask=("Where do the wasps go?", "Off the left side of the screen - nothing turns them round yet")),
  STEP(PLAYER_LOOP, "enemies", "Stung",
       ["At the bottom of Player loop: touching a FlyEnemy, Pixelhead destroys ITSELF. "
        "<code>self</code> is the object whose code is running - Pixelhead. Press Play again "
        "to start over."],
       at="0:25",
       ask=("Why is it waspHit and not self.waspHit?",
            "It is only needed right here, this loop - a name without self. lives only in this loop")),
  TALK("0:36", "Dodge them",
       "<p>Play for two minutes: collect both ores without being stung. Ask what is "
       "missing - the wasps fly away and never come back. Next week they turn round.</p>"),
 ],
 "errors": [
   ("The wasps fly right", "self.x - self.speed: minus is left."),
   ("NameError: name 'FlyEnemy' is not defined", "The class must be called FlyEnemy exactly - capital F and capital E."),
   ("Pixelhead disappears at once", "A wasp is sitting on Pixelhead at the start. Check the wasp numbers: 400, -200 and 600, 200."),
   ("Only one wasp", "Each wasp needs its own name: self.wasp1 and self.wasp2."),
 ],
 "recap": [
   "self.speed keeps a number each wasp uses every loop.",
   "One class can make many objects, each with its own x and y.",
   "destroy(self) removes the object whose code is running.",
   "A name without self., like waspHit, lives only inside this loop.",
 ],
 "homework": [
   {"task": "Faster or slower", "detail": "Try a speed of 1 and of 6. Which makes a better game? Write down why.", "done": "You picked a speed and have a reason."},
   {"task": "self or not", "detail": "Explain why money is self.money but the ore you touch is oreHit.", "done": "Money must last; oreHit is only needed this loop."},
 ],
 "bonus": {"title": "A unique enemy",
           "body": "<p>Give <code>self.wasp2</code> a different speed from the room: under its "
                   "y line, add <code>self.wasp2.speed = 4</code>. Why does that work? (The room "
                   "runs after the wasp's own start.)</p>"},
 "slides": [
   {"title": "Draw a wasp", "sub": "wasp.png - 80 x 64", "bullets": [
     "Make a class called FlyEnemy", "Facing LEFT"]},
   {"title": "Give the wasp its picture", "bullets": [], "code": [(WASP_START, "look")]},
   {"title": "Give the wasp a speed", "bullets": [], "code": [(WASP_START, "speed")]},
   {"title": "Fly left", "bullets": [], "code": [(WASP_LOOP, "fly")]},
   {"title": "Two wasps in the forest", "bullets": [], "code": [(FOREST_START, "wasps")]},
   {"title": "Checkpoint: wasps", "checkpoint": True,
    "say": "Press Play. Two wasps fly left across the forest and off the side."},
   {"title": "Stung", "bullets": [], "code": [(PLAYER_LOOP, "enemies")]},
   {"title": "Checkpoint: stung", "checkpoint": True,
    "say": "Press Play and walk into a wasp. Pixelhead disappears."},
 ],
},

# ---------------------------------------------------------------- week 5 ----
{
 "n": 5,
 "title": "Patrols and a merchant",
 "big_idea": "Today the wasps turn round at the edges and patrol, and a merchant moves into the forest who speaks when you press E - using [[and]] to ask two questions at once.",
 "new_concepts": ["&lt; and &gt;", "a minus in front", "key_was_pressed()", "and"],
 "draw": ["npc.png"],
 "objectives": [
   "Compare numbers with &lt; and &gt;",
   "Flip a number's sign with a minus in front",
   "Use [[key_was_pressed]] for one press",
   "Ask two questions in one if with [[and]]",
 ],
 "ops": [
  ADD(WASP_LOOP, "turn", [
    "if self.x < -600:",
    "    self.speed = -self.speed",
    "    self.scaleX = -1",
    "if self.x > 600:",
    "    self.speed = -self.speed",
    "    self.scaleX = 1",
  ]),
  ADD(NPC_START, "look", [
    "self.image = sprite('npc.png')",
  ]),
  ADD(FOREST_START, "npc", [
    "self.npc = NPC()",
    "self.npc.x = -400",
  ]),
  ADD(NPC_LOOP, "talk", [
    "playerHit = get_collision(self, 'Player')",
    "if playerHit and key_was_pressed('e'):",
    "    print('It is dangerous out there. Take this sword!')",
  ]),
 ],
 "flow": [
  TALK("0:00", "Turning round",
       "<p>The wasps fly off the left edge. Ask how a wasp could know it has reached the edge - "
       "its x. The screen goes from -640 to 640.</p>",
       "<p><code>-self.speed</code> is the speed with its sign flipped: 2 becomes -2, and -2 "
       "becomes 2.</p>",
       ask=("The wasp's x goes down by 2 each loop. What makes it go up instead?",
            "A speed of -2 - taking away -2 adds 2")),
  STEP(WASP_LOOP, "turn", "Turn round at the edges",
       ["At the bottom of FlyEnemy loop: past -600 on the left, flip the speed and the picture "
        "to face right. Past 600 on the right, flip them back. Press Play and wait."],
       at="0:08",
       ask=("Why scaleX = -1 on the LEFT edge?",
            "The wasp was drawn facing left; turning to fly right, it must flip")),
  TALK("0:18", "A merchant",
       "<p>Make a class called <strong>NPC</strong> - a non-player character - and draw "
       "<code>npc.png</code> at 60 by 80.</p>"),
  STEP(NPC_START, "look", "Give the merchant a picture",
       ["The merchant gets the picture you drew."],
       at="0:25"),
  STEP(FOREST_START, "npc", "Put the merchant in the forest",
       ["Under the wasps: one merchant, 400 to the left."],
       at="0:27"),
  STEP(NPC_LOOP, "talk", "Talk with E",
       ["In NPC loop: is Pixelhead touching me? Only when it is [[and]] E was just pressed, the "
        "merchant speaks in the console. [[key_was_pressed]] is True for the one loop the key "
        "goes down."],
       at="0:30",
       ask=("Why key_was_pressed and not key_is_pressed?",
            "Holding E would print the message sixty times a second")),
  TALK("0:40", "Talk to the merchant",
       "<p>Everyone walks over and presses E. Ask: the merchant talks about a sword - who has "
       "it? Nobody, yet. That is next week.</p>"),
 ],
 "errors": [
   ("The wasp shakes at the edge", "Both lines must flip: self.speed = -self.speed, with the minus in front of self."),
   ("The wasp flies backwards", "scaleX = -1 belongs under the LEFT edge (x < -600) and scaleX = 1 under the right."),
   ("Pressing E does nothing", "Click the game first, stand touching the merchant, and use a small e in quotes."),
   ("NameError: name 'NPC' is not defined", "The class is NPC, all capitals."),
 ],
 "recap": [
   "&lt; is less than; &gt; is greater than.",
   "-self.speed flips the sign: 2 becomes -2.",
   "[[key_was_pressed]] is True for one loop only.",
   "[[and]] runs the if only when both questions are true.",
 ],
 "homework": [
   {"task": "Follow the numbers", "detail": "A wasp is at x -602 with speed 2. Work out its speed and x after the next loop.", "done": "Speed -2, x -600."},
   {"task": "Write a line", "detail": "Write something better for your merchant to say. Keep the quotes.", "done": "Your merchant says it when you press E."},
 ],
 "bonus": {"title": "Up and down patrol",
           "body": "<p>Give one wasp a <code>speedY</code> and make it patrol up and down "
                   "instead, turning at y 300 and y -300. You need three new lines in start "
                   "and loop - try it before looking at the left-right code.</p>"},
 "slides": [
   {"title": "Turning round", "sub": "-self.speed", "bullets": [
     "The screen is -640 to 640", "&lt; less than, &gt; greater than",
     "A minus in front flips the sign"]},
   {"title": "Turn round at the edges", "bullets": [], "code": [(WASP_LOOP, "turn")]},
   {"title": "Checkpoint: patrols", "checkpoint": True,
    "say": "Press Play and wait. The wasps reach each edge, turn round and fly back, facing the way they fly."},
   {"title": "A merchant", "sub": "npc.png - 60 x 80", "bullets": [
     "Make a class called NPC", "A non-player character"]},
   {"title": "Give the merchant a picture", "bullets": [], "code": [(NPC_START, "look")]},
   {"title": "Put the merchant in the forest", "bullets": [], "code": [(FOREST_START, "npc")]},
   {"title": "Talk with E", "bullets": [], "code": [(NPC_LOOP, "talk")]},
   {"title": "Checkpoint: the merchant speaks", "checkpoint": True,
    "say": "Press Play, walk to the merchant and press E. The console says: It is dangerous out there. Take this sword!"},
 ],
},

# ---------------------------------------------------------------- week 6 ----
{
 "n": 6,
 "title": "A sword",
 "big_idea": "The merchant keeps a promise. Today Pixelhead gets a [[boolean]] that says whether it has a sword, the merchant switches it on, and F swings it.",
 "new_concepts": ["True and False", "==", "reaching into another object"],
 "draw": ["swordSlash.png"],
 "objectives": [
   "Store True or False in a [[boolean]]",
   "Change another object's variable through the name you found it by",
   "Ask a question with == and say how it differs from =",
   "Make a new object at Pixelhead's position",
 ],
 "ops": [
  ADD(PLAYER_START, "sword", [
    "self.hasSword = False",
  ]),
  SET(NPC_LOOP, "talk", [
    "playerHit = get_collision(self, 'Player')",
    "if playerHit and key_was_pressed('e'):",
    "    print('It is dangerous out there. Take this sword!')",
    "    playerHit.hasSword = True",
  ]),
  ADD(SLASH_START, "look", [
    "self.image = sprite('swordSlash.png')",
  ]),
  ADD(PLAYER_LOOP, "attack", [
    "if self.hasSword == True and key_was_pressed('f'):",
    "    swordSlash = PlayerAttack()",
    "    swordSlash.x = self.x",
    "    swordSlash.y = self.y",
  ]),
 ],
 "flow": [
  TALK("0:00", "True or False",
       "<p>A [[boolean]] has only two values, True and False - a switch. Pixelhead starts "
       "without a sword, so its switch starts off.</p>",
       "<p>Show what happens without <code>self.</code>: type <code>hasSword = False</code> in "
       "Player start, and the loop cannot find it. Then put self. back.</p>",
       ask=("Why does hasSword need self. in front?",
            "Without it, the name is gone when start finishes - loop could never read it")),
  STEP(PLAYER_START, "sword", "No sword yet",
       ["Pixelhead starts without a sword. True and False always have a capital letter."],
       at="0:08"),
  STEP(NPC_LOOP, "talk", "The merchant gives the sword",
       ["One new line, under the print and pushed in to match it: <code>playerHit</code> is "
        "the Pixelhead you are touching, so <code>playerHit.hasSword</code> is ITS switch."],
       at="0:11",
       ask=("Why playerHit.hasSword and not self.hasSword?",
            "In NPC code, self is the merchant - Pixelhead is the one in playerHit")),
  TALK("0:16", "Draw the slash",
       "<p>Make a class called <strong>PlayerAttack</strong> and draw "
       "<code>swordSlash.png</code> at 80 by 80, swinging to the RIGHT.</p>"),
  STEP(SLASH_START, "look", "Give the slash a picture",
       ["The slash gets the picture you drew."],
       at="0:24"),
  STEP(PLAYER_LOOP, "attack", "Swing with F",
       ["At the bottom of Player loop: only with a sword AND on the press of F, build a "
        "slash and put it exactly where Pixelhead is. <code>==</code> asks; one = stores."],
       at="0:26",
       ask=("What happens if you un-indent swordSlash.x = self.x?",
            "It runs every loop, even when no slash was made - and swordSlash does not exist")),
  TALK("0:38", "Try it",
       "<p>Press F before visiting the merchant: nothing. Get the sword, then press F a few "
       "times. Ask what is wrong - the slashes never go away, and they all point right. The "
       "next two weeks fix both.</p>"),
 ],
 "errors": [
   ("F does nothing, even with the sword", "self.hasSword == True needs two equals signs, and True a capital T. Talk to the merchant first."),
   ("NameError: name 'swordSlash' is not defined", "The three slash lines must all be pushed in under the if."),
   ("AttributeError: hasSword", "Player start must say self.hasSword = False, spelled exactly the same."),
   ("The merchant talks but F still does nothing", "playerHit.hasSword = True must be pushed in under the merchant's if."),
 ],
 "recap": [
   "A [[boolean]] is True or False.",
   "= stores a value; == asks whether two things are equal.",
   "playerHit.hasSword changes the Pixelhead you are touching.",
   "A new object can be put wherever another one is: swordSlash.x = self.x.",
 ],
 "homework": [
   {"task": "= or ==", "detail": "Write one line that uses = and one that uses ==, and say what each one does.", "done": "One stores a value; the other asks a question."},
   {"task": "Whose self?", "detail": "In NPC loop, what is self? In Player loop, what is self?", "done": "The merchant; Pixelhead."},
 ],
 "bonus": {"title": "A cheaper merchant",
           "body": "<p>Make the merchant say something different the second time you press E. "
                   "You need an if inside the if that asks <code>playerHit.hasSword == True</code> "
                   "before the sword is given.</p>"},
 "slides": [
   {"title": "True or False", "sub": "self.hasSword = False", "bullets": [
     "A boolean is a switch", "Only True or False, with a capital letter",
     "self. keeps it for loop"]},
   {"title": "No sword yet", "bullets": [], "code": [(PLAYER_START, "sword")]},
   {"title": "The merchant gives the sword", "bullets": [], "code": [(NPC_LOOP, "talk")]},
   {"title": "Draw the slash", "sub": "swordSlash.png - 80 x 80", "bullets": [
     "Make a class called PlayerAttack", "Swinging to the RIGHT"]},
   {"title": "Give the slash a picture", "bullets": [], "code": [(SLASH_START, "look")]},
   {"title": "Swing with F", "bullets": [], "code": [(PLAYER_LOOP, "attack")]},
   {"title": "Checkpoint: a sword", "checkpoint": True,
    "say": "Press Play. F does nothing. Get the sword from the merchant, press F: a slash appears on Pixelhead - and stays."},
 ],
},

# ---------------------------------------------------------------- week 7 ----
{
 "n": 7,
 "title": "Which way you face",
 "big_idea": "Pixelhead should swing the way it faces. Today a [[string|variable]] remembers the last direction you walked, and [[angle]] turns the slash to point that way.",
 "new_concepts": ["words in quotes", "an if inside an if", "angle"],
 "objectives": [
   "Store a word in a variable, and compare it with ==",
   "Push a line in eight spaces for an if inside an if",
   "Turn an object with [[angle]]",
   "Say why 90 is up and -90 is down",
 ],
 "ops": [
  ADD(PLAYER_START, "direction", [
    "self.direction = 'right'",
  ]),
  SET(PLAYER_LOOP, "sideways", [
    "if key_is_pressed('arrowRight'):",
    "    self.x = self.x + 4",
    "    self.image = sprite('pixelheadRight.png')",
    "    self.scaleX = 1",
    "    self.direction = 'right'",
    "if key_is_pressed('arrowLeft'):",
    "    self.x = self.x - 4",
    "    self.image = sprite('pixelheadRight.png')",
    "    self.scaleX = -1",
    "    self.direction = 'left'",
  ]),
  SET(PLAYER_LOOP, "updown", [
    "if key_is_pressed('arrowUp'):",
    "    self.y = self.y + 4",
    "    self.image = sprite('pixelheadUp.png')",
    "    self.scaleX = 1",
    "    self.direction = 'up'",
    "if key_is_pressed('arrowDown'):",
    "    self.y = self.y - 4",
    "    self.image = sprite('pixelheadDown.png')",
    "    self.scaleX = 1",
    "    self.direction = 'down'",
  ]),
  SET(PLAYER_LOOP, "attack", [
    "if self.hasSword == True and key_was_pressed('f'):",
    "    swordSlash = PlayerAttack()",
    "    swordSlash.x = self.x",
    "    swordSlash.y = self.y",
    "    if self.direction == 'up':",
    "        swordSlash.angle = 90",
    "    if self.direction == 'down':",
    "        swordSlash.angle = -90",
    "    if self.direction == 'left':",
    "        swordSlash.angle = 180",
  ]),
 ],
 "flow": [
  TALK("0:00", "Remembering a direction",
       "<p>The picture shows which way Pixelhead faces, but the code cannot look at a "
       "picture. It needs a [[variable]] that holds a word: 'right', 'left', 'up' or "
       "'down'. Words go in quotes.</p>",
       ask=("Pixelhead walks left, then lets go. Which way is it facing?",
            "Still left - the direction is whatever it was last set to")),
  STEP(PLAYER_START, "direction", "Start facing right",
       ["Pixelhead starts facing right, the way you drew it."],
       at="0:06"),
  STEP(PLAYER_LOOP, "sideways", "Remember left and right",
       ["One new line at the bottom of the right-arrow if: you face right.",
        "One at the bottom of the left-arrow if: you face left."],
       at="0:09"),
  STEP(PLAYER_LOOP, "updown", "Remember up and down",
       ["The same for up...",
        "...and for down. Nothing looks different yet - the next step reads it."],
       at="0:13"),
  TALK("0:16", "Turning a picture",
       "<p>[[angle]] turns an object, in degrees. 0 is the way you drew it. 90 is a quarter "
       "turn the other way from a clock - pointing up. -90 points down, and 180 is all the "
       "way round.</p>",
       ask=("The slash is drawn pointing right. What angle points it left?",
            "180 - half a turn")),
  STEP(PLAYER_LOOP, "attack", "Swing the way you face",
       ["Three ifs at the bottom of the attack if, each pushed in FOUR spaces so they are "
        "inside it, with their own lines pushed in EIGHT. Facing right needs no turn - 0 is "
        "already right."],
       at="0:22",
       ask=("Why are the direction ifs pushed in four spaces?",
            "They only make sense when a slash was just made - so they live inside that if")),
  TALK("0:36", "Swing in every direction",
       "<p>Get the sword and swing facing each way. Ask what is still wrong: the slash is "
       "on top of Pixelhead, not in front of it. Next week moves it.</p>"),
 ],
 "errors": [
   ("Every slash points right", "self.direction must be set in all four arrow ifs, spelled the same, with quotes."),
   ("IndentationError", "The direction ifs are pushed in four spaces; their angle lines eight."),
   ("Up swings down", "Up is 90 and down is -90."),
   ("NameError: name 'right' is not defined", "Words need quotes: 'right', not right."),
 ],
 "recap": [
   "A variable can hold words in quotes: self.direction = 'up'.",
   "== compares words as well as numbers.",
   "An if inside an if is pushed in four more spaces.",
   "[[angle]] turns an object: 90 up, -90 down, 180 the other way.",
 ],
 "homework": [
   {"task": "Turn it", "detail": "What angle would point the slash diagonally up and to the right?", "done": "45."},
   {"task": "Trace it", "detail": "Pixelhead walks up, then right, then lets go and presses F. What is self.direction, and what angle does the slash get?", "done": "'right' - no turn, angle 0."},
 ],
 "bonus": {"title": "Spin",
           "body": "<p>Make a class that spins: in its loop, <code>self.angle = self.angle + 5</code>. "
                   "Put one in the forest. What happens with + 90?</p>"},
 "slides": [
   {"title": "Remembering a direction", "sub": "self.direction = 'right'", "bullets": [
     "The code cannot see the picture", "A variable can hold a word", "Words go in quotes"]},
   {"title": "Start facing right", "bullets": [], "code": [(PLAYER_START, "direction")]},
   {"title": "Remember left and right", "bullets": [], "code": [(PLAYER_LOOP, "sideways")]},
   {"title": "Remember up and down", "bullets": [], "code": [(PLAYER_LOOP, "updown")]},
   {"title": "Turning a picture", "sub": "angle", "bullets": [
     "0 is the way you drew it", "90 is up, -90 is down", "180 is the other way"]},
   {"title": "Swing the way you face", "bullets": [], "code": [(PLAYER_LOOP, "attack")]},
   {"title": "Checkpoint: four ways", "checkpoint": True,
    "say": "Press Play, get the sword, and swing facing each way. Each slash points the way Pixelhead faced."},
 ],
},

# ---------------------------------------------------------------- week 8 ----
{
 "n": 8,
 "title": "Swing and fade",
 "big_idea": "Today the slash appears in FRONT of Pixelhead instead of on top of it, and a [[timer]] makes each one disappear half a second after you swing.",
 "new_concepts": ["a timer", "&lt;="],
 "objectives": [
   "Move a new object relative to where it was made",
   "Count down with a [[timer]]",
   "Remove an object when its timer runs out",
   "Explain why each slash needs its own timer",
 ],
 "ops": [
  SET(PLAYER_LOOP, "attack", [
    "if self.hasSword == True and key_was_pressed('f'):",
    "    swordSlash = PlayerAttack()",
    "    swordSlash.x = self.x",
    "    swordSlash.y = self.y",
    "    if self.direction == 'up':",
    "        swordSlash.angle = 90",
    "        swordSlash.y = swordSlash.y + 80",
    "    if self.direction == 'down':",
    "        swordSlash.angle = -90",
    "        swordSlash.y = swordSlash.y - 80",
    "    if self.direction == 'left':",
    "        swordSlash.angle = 180",
    "        swordSlash.x = swordSlash.x - 80",
    "    if self.direction == 'right':",
    "        swordSlash.x = swordSlash.x + 80",
  ]),
  ADD(SLASH_START, "timer", [
    "self.timer = 30",
  ]),
  ADD(SLASH_LOOP, "fade", [
    "self.timer = self.timer - 1",
    "if self.timer <= 0:",
    "    destroy(self)",
  ]),
 ],
 "flow": [
  TALK("0:00", "In front, not on top",
       "<p>The slash is 80 wide. To sit in front of Pixelhead it moves 80 the way you face: "
       "up adds to y, down takes from y, left takes from x - and right, which had no if "
       "last week, needs one now.</p>",
       ask=("Facing down, which number changes, and which way?",
            "y goes down by 80")),
  STEP(PLAYER_LOOP, "attack", "Slash in front",
       ["One new line under each angle line, and a fourth if at the bottom for facing "
        "right. Each moves the slash 80 the way you face."],
       at="0:06"),
  TALK("0:15", "A timer",
       "<p>A [[timer]] is a number that goes down by one every loop. Sixty loops is a second, "
       "so 30 is half a second. Every slash gets its own timer in its own start.</p>",
       ask=("Why does the timer go in PlayerAttack and not in Player?",
            "Each slash needs its own countdown - two slashes would share one in Player")),
  STEP(SLASH_START, "timer", "Half a second",
       ["Each slash starts with 30 loops to live."],
       at="0:20"),
  STEP(SLASH_LOOP, "fade", "Fade away",
       ["In PlayerAttack LOOP: count down by one every loop, and at 0 or below, the slash "
        "destroys itself. <code>&lt;=</code> means less than or equal."],
       at="0:22",
       ask=("Why destroy(self) and not destroy(swordSlash)?",
            "In PlayerAttack's own code, the slash is self - swordSlash was a name in Player loop")),
  TALK("0:32", "Swing away",
       "<p>Swing fast in a circle. Each slash appears in front and fades. Ask: what still "
       "happens when you swing at a wasp? Nothing - next week the wasps notice.</p>"),
 ],
 "errors": [
   ("The slash still sits on Pixelhead", "Each offset line goes under its own angle line, pushed in eight spaces."),
   ("Slashes never disappear", "The timer lines go in PlayerAttack LOOP; self.timer = 30 in PlayerAttack start."),
   ("Slashes disappear at once", "self.timer = 30 in start, and the loop takes away 1, not 30."),
   ("Facing right, the slash is on top", "The fourth if, for 'right', moves x by + 80."),
 ],
 "recap": [
   "A new object can be moved relative to where it was made.",
   "A [[timer]] counts down by one every loop; 60 is a second.",
   "&lt;= is less than or equal.",
   "Each slash has its own timer, so each fades on its own.",
 ],
 "homework": [
   {"task": "How long?", "detail": "How many loops would make the slash last a whole second? A quarter of a second?", "done": "60 and 15."},
   {"task": "Trace it", "detail": "Pixelhead is at x 100, y 50, facing left, and presses F. Where is the slash?", "done": "x 20, y 50, angle 180."},
 ],
 "bonus": {"title": "A longer sword",
           "body": "<p>Change all four 80s to 120 and see how it feels. Then try making the "
                   "slash fade by making it smaller each loop: <code>self.scaleX = self.scaleX - 0.03</code>.</p>"},
 "slides": [
   {"title": "In front, not on top", "sub": "80 the way you face", "bullets": [
     "Up: y + 80", "Down: y - 80", "Left: x - 80", "Right: x + 80"]},
   {"title": "Slash in front", "bullets": [], "code": [(PLAYER_LOOP, "attack")]},
   {"title": "Checkpoint: in front", "checkpoint": True,
    "say": "Press Play, get the sword and swing each way. The slash appears in front of Pixelhead - and still stays."},
   {"title": "A timer", "sub": "self.timer = 30", "bullets": [
     "Down by one every loop", "60 loops is a second", "Every slash has its own"]},
   {"title": "Half a second", "bullets": [], "code": [(SLASH_START, "timer")]},
   {"title": "Fade away", "bullets": [], "code": [(SLASH_LOOP, "fade")]},
   {"title": "Checkpoint: swing and fade", "checkpoint": True,
    "say": "Press Play, get the sword and swing. Each slash appears in front of Pixelhead and is gone half a second later."},
 ],
},

# ---------------------------------------------------------------- week 9 ----
{
 "n": 9,
 "title": "Fight back",
 "big_idea": "A short week to catch up. Today the wasps notice the sword - a slash destroys the wasp it touches - and a third wasp joins the forest.",
 "new_concepts": ["review"],
 "objectives": [
   "Check for a touch from the wasp's side",
   "Explain why the check goes in FlyEnemy and not in PlayerAttack",
   "Add another object to a room without help",
   "Find and fix your own bugs from the week's checklist",
 ],
 "ops": [
  ADD(WASP_LOOP, "swordhit", [
    "swordHit = get_collision(self, 'PlayerAttack')",
    "if swordHit:",
    "    destroy(self)",
  ]),
  ADD(FOREST_START, "wasp3", [
    "self.wasp3 = FlyEnemy()",
    "self.wasp3.x = 200",
    "self.wasp3.y = -100",
  ]),
 ],
 "flow": [
  TALK("0:00", "Review",
       "<p>Put the eight weeks on the board as a list of classes: Player, Collectible, "
       "Background, FlyEnemy, NPC, PlayerAttack, and the Forest room. For each one, ask what "
       "its start does and what its loop does.</p>",
       ask=("Which class has no loop at all?",
            "Collectible and Background - they never move or check anything")),
  TALK("0:10", "Who checks?",
       "<p>A slash touching a wasp could be checked by either one. Put it in FlyEnemy: the "
       "wasp is the one that changes, and next week it will have health to lose.</p>",
       ask=("If the slash destroyed the wasp, which object's code would run destroy?",
            "PlayerAttack's - but the wasp is the one that should decide")),
  STEP(WASP_LOOP, "swordhit", "Hit by the sword",
       ["At the bottom of FlyEnemy loop: touching a slash, the wasp destroys itself. The "
        "same shape as collecting an ore."],
       at="0:14",
       ask=("Which earlier code has the same shape?",
            "Collecting an ore - get_collision, an if, and destroy")),
  STEP(FOREST_START, "wasp3", "A third wasp",
       ["At the bottom of the wasps in Forest start - type it after <code>self.npc.x</code>: "
        "a third wasp, low in the middle."],
       at="0:20"),
  TALK("0:24", "Catch up and redraw",
       "<p>The rest of the hour is for anyone behind, and for art. Everyone checks: four "
       "directions, ore and money, merchant and sword, slashes that point and fade, wasps "
       "that die. Students who are done redraw a sprite.</p>"),
 ],
 "errors": [
   ("Swinging does not hurt the wasp", "The check is in FlyEnemy LOOP and asks for 'PlayerAttack', spelled exactly."),
   ("NameError: name 'PlayerAttack' is not defined", "The class name must match the one you made in week 6."),
   ("The third wasp stings Pixelhead at once", "It goes at x 200, y -100 - check the numbers."),
   ("All the wasps disappear when you swing", "destroy(self), not destroy(swordHit) - and the if is in FlyEnemy loop."),
 ],
 "recap": [
   "The object that changes is usually the one that checks.",
   "get_collision works from either side of a touch.",
   "Every new object in a room is two or three lines in that room's start.",
   "A short week is for catching up - everything works before week 10.",
 ],
 "homework": [
   {"task": "Start or loop", "detail": "For each class in the game, write what its start does and what its loop does.", "done": "A table with seven classes."},
   {"task": "Redraw", "detail": "Redraw the sprite you like least.", "done": "Your game looks more like yours."},
 ],
 "bonus": {"title": "Clear the forest",
           "body": "<p>Make the console say something when the last wasp is gone. "
                   "<code>len(get_objects('FlyEnemy'))</code> is how many are left - but think "
                   "about where it goes: the wasp destroying itself is still counted that "
                   "loop.</p>"},
 "slides": [
   {"title": "Review", "sub": "Eight weeks, seven classes", "bullets": [
     "What does each start do?", "What does each loop do?", "Which have no loop?"]},
   {"title": "Who checks?", "sub": "The one that changes", "bullets": [
     "The wasp is the one destroyed", "Next week it will have health", "So the check lives in FlyEnemy"]},
   {"title": "Hit by the sword", "bullets": [], "code": [(WASP_LOOP, "swordhit")]},
   {"title": "A third wasp", "bullets": [], "code": [(FOREST_START, "wasp3")]},
   {"title": "Checkpoint: fight back", "checkpoint": True,
    "say": "Press Play. Three wasps. Get the sword and swing at one: it disappears."},
 ],
},

# --------------------------------------------------------------- week 10 ----
{
 "n": 10,
 "title": "Health",
 "big_idea": "One sting should not end everything. Today Pixelhead gets three health, a sting costs one, a second [[timer]] stops one wasp taking all three at once - and at 0 the forest starts again.",
 "new_concepts": ["health", "invincibility"],
 "objectives": [
   "Change a sting so it costs health instead of Pixelhead",
   "Use a timer so a touch only counts once a second",
   "Reset several variables at once when the health runs out",
   "Explain why Pixelhead is moved and not destroyed",
 ],
 "ops": [
  ADD(PLAYER_START, "health", [
    "self.health = 3",
    "self.invTimer = 0",
  ]),
  SET(PLAYER_LOOP, "enemies", [
    "self.invTimer = self.invTimer - 1",
    "waspHit = get_collision(self, 'FlyEnemy')",
    "if waspHit and self.invTimer <= 0:",
    "    self.health = self.health - 1",
    "    self.invTimer = 60",
    "    print('Health: ' + str(self.health))",
  ]),
  ADD(PLAYER_LOOP, "dead", [
    "if self.health <= 0:",
    "    self.health = 3",
    "    self.money = 0",
    "    self.hasSword = False",
    "    self.x = 0",
    "    self.y = 0",
    "    set_room('Forest')",
  ]),
 ],
 "flow": [
  TALK("0:00", "Three health",
       "<p>Ask what should happen when a wasp stings. Most will say: lose some health. But a "
       "wasp touches you for many loops in a row - sixty stings a second would take all "
       "three at once.</p>",
       "<p>The fix is a [[timer]]: after a sting, Pixelhead cannot be stung again until it "
       "runs out. That is <em>invincibility</em> - invTimer for short.</p>",
       ask=("A wasp touches Pixelhead for 30 loops. Without a timer, how much health is lost?",
            "30 - all of it, in half a second")),
  STEP(PLAYER_START, "health", "Three health",
       ["Pixelhead starts with three health, and an invincibility timer at 0 - so the first "
        "sting counts."],
       at="0:08"),
  STEP(PLAYER_LOOP, "enemies", "A sting costs one",
       ["Take out the if and destroy(self). A new first line counts the timer down every "
        "loop. A sting only counts when the timer has run out: it costs one health, sets the "
        "timer to a second, and prints what is left."],
       at="0:12",
       ask=("Why is the timer counted down OUTSIDE the if?",
            "It has to run every loop, sting or not - inside, it would only count while stung")),
  TALK("0:22", "When it runs out",
       "<p>Destroying Pixelhead ends the game. Instead, put everything back the way it "
       "started: full health, no money, no sword, the middle of the screen - and the forest, "
       "made fresh with all its ores and wasps.</p>",
       ask=("Why not just destroy(self) at 0 health?",
            "Then there is no Pixelhead to play - you would have to press Play again")),
  STEP(PLAYER_LOOP, "dead", "Start again",
       ["At the bottom of Player loop: at 0 or below, reset health, money and the sword, "
        "move to the middle, and go back to the Forest - which builds it again."],
       at="0:27"),
  TALK("0:38", "Test it",
       "<p>Walk into a wasp three times, counting the console out loud. Ask what is unfair: "
       "the wasp keeps flying through you. Next week, a sting pushes it away.</p>"),
 ],
 "errors": [
   ("All three health go at once", "self.invTimer = 60 must be pushed in under the if, and the if must ask self.invTimer <= 0."),
   ("Health never goes down", "self.invTimer = self.invTimer - 1 is the first line, not pushed in."),
   ("Pixelhead disappears at 0", "The old destroy(self) is still there - take it out."),
   ("The forest does not reset", "set_room('Forest') is the last line of the health check, pushed in."),
 ],
 "recap": [
   "A sting costs one health instead of the whole game.",
   "An invincibility timer makes one touch count only once.",
   "A timer counted down outside the if runs every loop.",
   "At 0 health, everything resets and the Forest starts again.",
 ],
 "homework": [
   {"task": "Trace it", "detail": "invTimer is 1 and a wasp is touching. What happens this loop? The next?", "done": "It goes to 0 and the sting counts, health - 1, invTimer 60. Next loop it is 59: no sting."},
   {"task": "Easier or harder", "detail": "Would 5 health be a better game? 1? Try both.", "done": "You picked a number and can say why."},
 ],
 "bonus": {"title": "Flash",
           "body": "<p>While invincible, make Pixelhead see-through: at the bottom of Player "
                   "loop, an if that sets <code>self.alpha = 0.5</code> while "
                   "<code>self.invTimer > 0</code>, and an else that sets it back to 1.</p>"},
 "slides": [
   {"title": "Three health", "sub": "and a second of invincibility", "bullets": [
     "A wasp touches you for many loops", "Without a timer, each loop is a sting",
     "invTimer: one sting a second"]},
   {"title": "Three health", "bullets": [], "code": [(PLAYER_START, "health")]},
   {"title": "A sting costs one", "bullets": [], "code": [(PLAYER_LOOP, "enemies")]},
   {"title": "Checkpoint: stung, not gone", "checkpoint": True,
    "say": "Press Play and walk into a wasp. Pixelhead stays, and the console says Health: 2."},
   {"title": "When it runs out", "sub": "Reset, do not destroy", "bullets": [
     "Full health, no money, no sword", "Back to the middle", "The forest, made fresh"]},
   {"title": "Start again", "bullets": [], "code": [(PLAYER_LOOP, "dead")]},
   {"title": "Checkpoint: three stings", "checkpoint": True,
    "say": "Press Play and get stung three times. Health 2, 1, 0 - and the forest starts again with Pixelhead in the middle."},
 ],
},

# --------------------------------------------------------------- week 11 ----
{
 "n": 11,
 "title": "Tougher wasps",
 "big_idea": "Today a sting pushes the wasp away, and the wasps get health of their own: three hits to defeat, each slash counting once.",
 "new_concepts": ["reaching into what you touched"],
 "objectives": [
   "Change the object you touched through its local name",
   "Give a second class the same health and timer pattern",
   "Explain why the wasp's timer must be longer than a slash lives",
   "Split 'hit' and 'defeated' into two checks",
 ],
 "ops": [
  SET(PLAYER_LOOP, "enemies", [
    "self.invTimer = self.invTimer - 1",
    "waspHit = get_collision(self, 'FlyEnemy')",
    "if waspHit and self.invTimer <= 0:",
    "    self.health = self.health - 1",
    "    self.invTimer = 60",
    "    print('Health: ' + str(self.health))",
    "    waspHit.speed = -waspHit.speed",
    "    waspHit.scaleX = -waspHit.scaleX",
  ]),
  ADD(WASP_START, "health", [
    "self.health = 3",
    "self.invTimer = 0",
  ]),
  SET(WASP_LOOP, "swordhit", [
    "self.invTimer = self.invTimer - 1",
    "swordHit = get_collision(self, 'PlayerAttack')",
    "if swordHit and self.invTimer <= 0:",
    "    self.health = self.health - 1",
    "    self.invTimer = 40",
  ]),
  ADD(WASP_LOOP, "defeat", [
    "if self.health <= 0:",
    "    destroy(self)",
  ]),
 ],
 "flow": [
  TALK("0:00", "Push it away",
       "<p><code>waspHit</code> is the wasp that stung you. Anything you could do to a wasp "
       "in its own code, you can do through that name - like turning it round.</p>",
       ask=("How do you turn a wasp round from Player loop?",
            "Flip waspHit.speed and waspHit.scaleX - the same as the wasp does at the edge")),
  STEP(PLAYER_LOOP, "enemies", "A sting turns the wasp",
       ["The first two lines do not change.",
        "Two new lines at the bottom of the sting: the wasp you touched flips its speed and "
        "its picture, and flies away."],
       at="0:06"),
  TALK("0:12", "The same pattern again",
       "<p>Wasps get the same health and timer as Pixelhead. A slash lives for 30 loops, so "
       "the wasp's timer has to last LONGER - 40 - or the same slash hits it again before "
       "it fades.</p>",
       ask=("What if the wasp's timer were 20?",
            "The slash is still there after 20 loops - one swing would hit twice")),
  STEP(WASP_START, "health", "Wasp health",
       ["Under the speed in FlyEnemy start: three health, and a timer at 0."],
       at="0:16"),
  STEP(WASP_LOOP, "swordhit", "A hit costs one",
       ["Take out the if and destroy(self). The same shape as week 10: count the timer down, "
        "and a slash only counts when it has run out - one health, and 40 loops before the "
        "next."],
       at="0:19"),
  STEP(WASP_LOOP, "defeat", "Defeated",
       ["At the bottom of FlyEnemy loop: at 0 health, the wasp is gone."],
       at="0:27",
       ask=("Why not put destroy(self) inside the hit check?",
            "Then the first hit would destroy it - the check is how much health is left")),
  TALK("0:33", "Fight",
       "<p>Count hits out loud: one, two, three. Ask what a defeated wasp should leave "
       "behind. Next week: loot.</p>"),
 ],
 "errors": [
   ("A wasp dies in one swing", "Its invTimer = 40 must be pushed in under the if, and the if asks self.invTimer <= 0."),
   ("Wasps never die", "The defeat if goes in FlyEnemy LOOP, not pushed in under the hit check."),
   ("The stinging wasp keeps stinging", "waspHit.speed = -waspHit.speed is pushed in under the sting if."),
   ("AttributeError: invTimer", "FlyEnemy start must say self.invTimer = 0."),
 ],
 "recap": [
   "The name you found an object by lets you change it: waspHit.speed.",
   "The same pattern - health and a timer - works for any class.",
   "The wasp's timer outlasts a slash, so a swing counts once.",
   "Being hit and being defeated are two separate checks.",
 ],
 "homework": [
   {"task": "Count the swings", "detail": "How many swings does a wasp take with health 3? With health 5?", "done": "Three; five."},
   {"task": "Same shape", "detail": "Put Player's sting check and FlyEnemy's hit check side by side. Circle what is different.", "done": "The class name, the timer number, and the push away."},
 ],
 "bonus": {"title": "A boss",
           "body": "<p>Make one wasp in Forest start a boss: after it is made, set "
                   "<code>self.wasp3.health = 10</code> and make it twice the size with "
                   "scaleX and scaleY. Mind the turn code - it sets scaleX back to 1.</p>"},
 "slides": [
   {"title": "Push it away", "sub": "waspHit.speed = -waspHit.speed", "bullets": [
     "waspHit is the wasp that stung you", "Change it through that name", "Flip its speed and picture"]},
   {"title": "A sting turns the wasp", "bullets": [], "code": [(PLAYER_LOOP, "enemies")]},
   {"title": "Checkpoint: pushed away", "checkpoint": True,
    "say": "Press Play and walk into a wasp. It turns round and flies away from you."},
   {"title": "The same pattern again", "sub": "Health and a timer", "bullets": [
     "Wasps get three health", "A slash lives 30 loops", "Their timer is 40 - one swing, one hit"]},
   {"title": "Wasp health", "bullets": [], "code": [(WASP_START, "health")]},
   {"title": "A hit costs one", "bullets": [], "code": [(WASP_LOOP, "swordhit")]},
   {"title": "Defeated", "bullets": [], "code": [(WASP_LOOP, "defeat")]},
   {"title": "Checkpoint: three hits", "checkpoint": True,
    "say": "Press Play, get the sword, and swing at a wasp three times. It disappears on the third."},
 ],
},

# --------------------------------------------------------------- week 12 ----
{
 "n": 12,
 "title": "Random loot",
 "big_idea": "Today Python picks numbers for you. [[import]] brings in the random toolbox, every ore picks its own colour, and a defeated wasp drops loot - half the time.",
 "new_concepts": ["import", "random.randint()"],
 "draw": ["pinkOre.png", "blueOre.png"],
 "objectives": [
   "Bring in a toolbox with [[import]]",
   "Pick a whole number with [[random.randint|random]]",
   "Choose between three pictures with three ifs",
   "Make something happen only some of the time",
 ],
 "ops": [
  ADD(ORE_START, "import", [
    "import random",
  ]),
  SET(ORE_START, "look", [
    "lootNum = random.randint(1, 3)",
    "if lootNum == 1:",
    "    self.image = sprite('yellowOre.png')",
    "if lootNum == 2:",
    "    self.image = sprite('pinkOre.png')",
    "if lootNum == 3:",
    "    self.image = sprite('blueOre.png')",
  ]),
  ADD(WASP_LOOP, "import", [
    "import random",
  ]),
  SET(WASP_LOOP, "defeat", [
    "if self.health <= 0:",
    "    lootChance = random.randint(1, 100)",
    "    if lootChance > 50:",
    "        loot = Collectible()",
    "        loot.x = self.x",
    "        loot.y = self.y",
    "    destroy(self)",
  ]),
 ],
 "flow": [
  TALK("0:00", "Random numbers",
       "<p>Python keeps extra tools in toolboxes. [[import]] random opens the one for random "
       "numbers, at the very top of the code that uses it.</p>",
       "<p><code>random.randint(1, 3)</code> picks 1, 2 or 3 - both ends included.</p>",
       ask=("What could random.randint(1, 6) be used for?",
            "Rolling a dice - it picks 1 to 6")),
  TALK("0:06", "Draw two more ores",
       "<p>Draw <code>pinkOre.png</code> and <code>blueOre.png</code>, 40 by 40.</p>"),
  STEP(ORE_START, "import", "Open the random toolbox",
       ["At the VERY TOP of Collectible start."],
       at="0:12"),
  STEP(ORE_START, "look", "Pick a colour",
       ["Pick 1, 2 or 3. Your picture line moves under the first if, pushed in four spaces.",
        "Two more ifs pick the other two colours. Press Play a few times."],
       at="0:14",
       ask=("Why do ores get different colours every time you press Play?",
            "Each ore picks its own number when it is made")),
  TALK("0:22", "Where does the loot go?",
       "<p>Ask where to put the loot. Under the hit check? Then every hit could drop loot - "
       "three per wasp. Under the defeat check, ABOVE destroy(self), while the wasp's x and "
       "y still mean something.</p>",
       ask=("Why above destroy(self) and not below it?",
            "The loot is placed where the wasp is - do it before the wasp is gone")),
  STEP(WASP_LOOP, "import", "The toolbox for wasps",
       ["At the VERY TOP of FlyEnemy loop. Every class that uses random needs its own "
        "import."],
       at="0:28"),
  STEP(WASP_LOOP, "defeat", "Drop loot",
       ["Just above <code>destroy(self)</code>, pushed in four spaces: pick a number from 1 "
        "to 100. Over 50 - half the time - make an ore where the wasp is."],
       at="0:30"),
  TALK("0:40", "Farm the forest",
       "<p>Defeat all three wasps a few times. Count the loot. Ask how to make loot rarer - "
       "a bigger number than 50.</p>"),
 ],
 "errors": [
   ("NameError: name 'random' is not defined", "import random goes at the very top of the code that uses it - Collectible start and FlyEnemy loop both need one."),
   ("Every ore is the same colour", "lootNum is picked again for each ore, and the three ifs ask 1, 2 and 3 with ==."),
   ("Loot drops on every hit", "The loot lines go under the defeat check, if self.health <= 0, not under the hit."),
   ("The loot appears in the middle", "loot.x = self.x and loot.y = self.y, pushed in eight spaces, above destroy(self)."),
 ],
 "recap": [
   "[[import]] random brings in Python's random toolbox.",
   "random.randint(1, 3) picks 1, 2 or 3.",
   "Over 50 out of 100 happens about half the time.",
   "Loot is made where the wasp is, before the wasp is destroyed.",
 ],
 "homework": [
   {"task": "How often?", "detail": "lootChance > 75 - how often does a wasp drop loot? lootChance > 90?", "done": "About a quarter of the time; about a tenth."},
   {"task": "Dice", "detail": "Write the line that rolls a six-sided dice into a name called roll.", "done": "roll = random.randint(1, 6)"},
 ],
 "bonus": {"title": "Rare ore",
           "body": "<p>Make blue ore rare. Pick from 1 to 10 instead, and use "
                   "<code>and</code> ranges: <code>if lootNum >= 1 and lootNum <= 6:</code> for "
                   "yellow, 7 to 9 for pink, 10 for blue.</p>"},
 "slides": [
   {"title": "Random numbers", "sub": "import random", "bullets": [
     "import opens a toolbox", "random.randint(1, 3) picks 1, 2 or 3",
     "Both ends can be picked"]},
   {"title": "Draw two more ores", "sub": "pinkOre.png and blueOre.png - 40 x 40", "bullets": [
     "Same size as the yellow one"]},
   {"title": "Open the random toolbox", "bullets": [], "code": [(ORE_START, "import")]},
   {"title": "Pick a colour", "bullets": [], "code": [(ORE_START, "look")]},
   {"title": "Checkpoint: colours", "checkpoint": True,
    "say": "Press Play a few times. The ores are a different mix of colours each time."},
   {"title": "Where does the loot go?", "sub": "Under defeated, above destroy", "bullets": [
     "Under a hit: up to three per wasp", "Under defeated: one chance per wasp",
     "Above destroy, while the wasp is still there"]},
   {"title": "The toolbox for wasps", "bullets": [], "code": [(WASP_LOOP, "import")]},
   {"title": "Drop loot", "bullets": [], "code": [(WASP_LOOP, "defeat")]},
   {"title": "Checkpoint: loot", "checkpoint": True,
    "say": "Press Play, get the sword and defeat the wasps. About half of them leave an ore behind."},
 ],
},

# --------------------------------------------------------------- week 13 ----
{
 "n": 13,
 "title": "The field",
 "big_idea": "Today the game gets bigger than one screen. Walk off the right edge of the forest and you are in a field; walk off its left edge and you are back. [[game]]. lets a room reach Pixelhead.",
 "new_concepts": ["game.", "a room loop"],
 "draw": ["field.png"],
 "objectives": [
   "Reach Pixelhead from a room with [[game]].player",
   "Change rooms when Pixelhead walks off an edge",
   "Reuse the Background class with a different picture",
   "Build a second room's things in its own start",
 ],
 "ops": [
  ADD(FOREST_LOOP, "east", [
    "if game.player.x > 600:",
    "    game.player.x = -600",
    "    set_room('Field')",
  ]),
  ADD(FIELD_START, "back", [
    "self.background = Background()",
    "self.background.image = sprite('field.png')",
  ]),
  ADD(FIELD_START, "things", [
    "self.ore1 = Collectible()",
    "self.ore1.x = 450",
    "self.ore1.y = 300",
    "self.wasp1 = FlyEnemy()",
    "self.wasp1.x = 400",
    "self.wasp1.y = 200",
    "self.wasp2 = FlyEnemy()",
    "self.wasp2.x = -300",
    "self.wasp2.y = -200",
  ]),
  ADD(FIELD_LOOP, "west", [
    "if game.player.x < -600:",
    "    game.player.x = 600",
    "    set_room('Forest')",
  ]),
 ],
 "flow": [
  TALK("0:00", "A bigger world",
       "<p>Make a room called <strong>Field</strong>. Ask how Pixelhead could get there - "
       "remind them how the wasps knew they had reached an edge.</p>",
       "<p>The Forest room needs to know where Pixelhead is. Game made it, as "
       "<code>self.player</code>; from anywhere else, that is <code>game.player</code>.</p>",
       ask=("How does the forest know Pixelhead has reached the right edge?",
            "Check game.player.x, the way the wasps check their own x")),
  STEP(FOREST_LOOP, "east", "Walk off the right edge",
       ["In Forest LOOP: past 600, move Pixelhead to the far LEFT and change to the Field - "
        "so you come in from the side you were walking toward. Press Play and walk right."],
       at="0:08",
       ask=("Why move Pixelhead to -600?",
            "Walking right, you should come into the new room on its left side")),
  TALK("0:16", "Draw the field",
       "<p>Draw <code>field.png</code> at 1280 by 720.</p>"),
  STEP(FIELD_START, "back", "The field's background",
       ["The same Background class, then a different picture - Background start gives it "
        "the forest, and the next line swaps it."],
       at="0:24"),
  STEP(FIELD_START, "things", "Things in the field",
       ["An ore, high on the right...",
        "...and two wasps. A new room is empty until its start builds it."],
       at="0:27"),
  STEP(FIELD_LOOP, "west", "Walk back",
       ["In Field LOOP: past -600 on the left, come into the Forest on its right."],
       at="0:34",
       ask=("Walk back into the forest. Why are the ores back?",
            "Going to a room builds it fresh - its start runs again")),
  TALK("0:40", "Explore",
       "<p>Walk back and forth. Ask: the merchant's sword is free and the ores come back every "
       "visit. Is that a good game? Week 15 makes the sword cost money.</p>"),
 ],
 "errors": [
   ("NameError: name 'player' is not defined", "From a room it is game.player - Game made it as self.player."),
   ("You flick back and forth between rooms", "Coming in at -600 must not be past the Field's -600 check: use < -600, not <= -600."),
   ("The field shows the forest", "The second back line changes the picture: self.background.image = sprite('field.png')."),
   ("Nothing happens at the edge", "The edge check goes in Forest LOOP, not Forest start."),
 ],
 "recap": [
   "Rooms have loops too, running while you are in them.",
   "From anywhere but Game, Pixelhead is [[game]].player.",
   "One class can show different pictures in different places.",
   "A room is built fresh every time you go there.",
 ],
 "homework": [
   {"task": "Map it", "detail": "Draw the two rooms side by side and mark where Pixelhead leaves and arrives.", "done": "Leave at 600, arrive at -600; and back."},
   {"task": "Why game.", "detail": "Why can the Forest not say self.player.x?", "done": "self is the Forest; Pixelhead belongs to Game."},
 ],
 "bonus": {"title": "A field of your own",
           "body": "<p>Add two more ores and a third wasp to the field. Make one wasp a boss "
                   "with <code>self.wasp2.health = 6</code>.</p>"},
 "slides": [
   {"title": "A bigger world", "sub": "game.player", "bullets": [
     "Make a room called Field", "Game made Pixelhead as self.player",
     "From anywhere else: game.player"]},
   {"title": "Walk off the right edge", "bullets": [], "code": [(FOREST_LOOP, "east")]},
   {"title": "Checkpoint: an empty field", "checkpoint": True,
    "say": "Press Play and walk off the right edge. Pixelhead comes in on the left of an empty room."},
   {"title": "Draw the field", "sub": "field.png - 1280 x 720", "bullets": [
     "The whole screen"]},
   {"title": "The field's background", "bullets": [], "code": [(FIELD_START, "back")]},
   {"title": "Things in the field", "bullets": [], "code": [(FIELD_START, "things")]},
   {"title": "Walk back", "bullets": [], "code": [(FIELD_LOOP, "west")]},
   {"title": "Checkpoint: there and back", "checkpoint": True,
    "say": "Press Play. Walk right into the field - an ore and two wasps - and left again into the forest."},
 ],
},

# --------------------------------------------------------------- week 14 ----
{
 "n": 14,
 "title": "The swamp",
 "big_idea": "Today you build the third room on your own pattern: walk off the bottom of the forest into a swamp, stretch its half-height picture to fill the screen with [[scaleY|scale]], and walk back up.",
 "new_concepts": ["scaleY", "edges up and down"],
 "draw": ["swamp.png"],
 "objectives": [
   "Change rooms at the top and bottom edges",
   "Stretch a picture with [[scaleY|scale]]",
   "Build a room from the pattern without help",
   "Say which numbers change for a door going down",
 ],
 "ops": [
  ADD(FOREST_LOOP, "south", [
    "if game.player.y < -360:",
    "    game.player.y = 360",
    "    set_room('Swamp')",
  ]),
  ADD(SWAMP_START, "back", [
    "self.background = Background()",
    "self.background.image = sprite('swamp.png')",
  ]),
  ADD(SWAMP_START, "stretch", [
    "self.background.scaleY = 2",
  ]),
  ADD(SWAMP_START, "wasps", [
    "self.wasp1 = FlyEnemy()",
    "self.wasp1.x = 300",
    "self.wasp1.y = 0",
    "self.wasp2 = FlyEnemy()",
    "self.wasp2.x = -300",
    "self.wasp2.y = -150",
  ]),
  ADD(SWAMP_LOOP, "north", [
    "if game.player.y > 360:",
    "    game.player.y = -360",
    "    set_room('Forest')",
  ]),
 ],
 "flow": [
  TALK("0:00", "Your turn",
       "<p>Make a room called <strong>Swamp</strong>. Ask the class to write the door going "
       "down before showing it: which number, which sign, which edge?</p>",
       ask=("The screen goes from -360 to 360 up and down. Where is the bottom door?",
            "y less than -360 - and you arrive at the top, y 360")),
  STEP(FOREST_LOOP, "south", "Walk off the bottom",
       ["Under the east door in Forest loop: below -360, arrive at the TOP of the Swamp."],
       at="0:06"),
  TALK("0:10", "Draw the swamp",
       "<p>Draw <code>swamp.png</code> at 1280 by 360 - half the height of the screen, on "
       "purpose.</p>"),
  STEP(SWAMP_START, "back", "The swamp's background",
       ["The same two lines as the field, with the swamp's picture. Press Play and walk "
        "down."],
       at="0:18",
       ask=("Why does the swamp only fill the middle of the screen?",
            "The picture is 360 tall and the screen is 720")),
  STEP(SWAMP_START, "stretch", "Stretch it",
       ["<code>scaleY = 2</code> makes it twice as tall - 720, the whole screen."],
       at="0:22"),
  STEP(SWAMP_START, "wasps", "Swamp wasps",
       ["Two wasps, in the middle and low on the left."],
       at="0:25"),
  STEP(SWAMP_LOOP, "north", "Walk back up",
       ["In Swamp LOOP: above 360, arrive at the BOTTOM of the Forest."],
       at="0:30",
       ask=("Why not set_room('Field') at the top of the swamp?",
            "The swamp is below the forest - going up leads back there")),
  TALK("0:36", "The whole map",
       "<p>Draw the map on the board: the field to the right of the forest, the swamp below "
       "it. Ask what a fourth room would need: a door each way, a background, its things.</p>"),
 ],
 "errors": [
   ("You flick between the forest and swamp", "Arrive at 360 and check > 360, not >= 360."),
   ("The swamp is squashed", "self.background.scaleY = 2 goes after the background is made."),
   ("NameError: name 'Swamp' is not defined", "Make a ROOM called Swamp, capital S."),
   ("Walking down does nothing", "The south door goes in Forest LOOP and checks game.player.y, not x."),
 ],
 "recap": [
   "Up and down doors use y; left and right doors use x.",
   "Arrive just inside the other edge, so you do not bounce back.",
   "[[scaleY|scale]] = 2 makes a picture twice as tall.",
   "Every room is a door, a background and its things.",
 ],
 "homework": [
   {"task": "A fourth room", "detail": "Write the two doors for a room ABOVE the forest, called Mountain.", "done": "Forest: y > 360 to Mountain at -360; Mountain: y < -360 to Forest at 360."},
   {"task": "Stretch", "detail": "A picture is 640 wide. What scaleX fills the screen?", "done": "2."},
 ],
 "bonus": {"title": "A swamp of your own",
           "body": "<p>Add ores to the swamp. Then make the swamp slow you down: in the "
                   "Swamp's loop, take 2 off <code>game.player.x</code> every loop while "
                   "right is held.</p>"},
 "slides": [
   {"title": "Your turn", "sub": "A door going down", "bullets": [
     "Which number? y", "Which edge? Below -360", "Where do you arrive? The top"]},
   {"title": "Walk off the bottom", "bullets": [], "code": [(FOREST_LOOP, "south")]},
   {"title": "Draw the swamp", "sub": "swamp.png - 1280 x 360", "bullets": [
     "Half the screen's height, on purpose"]},
   {"title": "The swamp's background", "bullets": [], "code": [(SWAMP_START, "back")]},
   {"title": "Checkpoint: a thin swamp", "checkpoint": True,
    "say": "Press Play and walk off the bottom of the forest. The swamp only fills the middle of the screen."},
   {"title": "Stretch it", "bullets": [], "code": [(SWAMP_START, "stretch")]},
   {"title": "Swamp wasps", "bullets": [], "code": [(SWAMP_START, "wasps")]},
   {"title": "Walk back up", "bullets": [], "code": [(SWAMP_LOOP, "north")]},
   {"title": "Checkpoint: three rooms", "checkpoint": True,
    "say": "Press Play. Down into the swamp - two wasps, the whole screen - and back up into the forest."},
 ],
},

# --------------------------------------------------------------- week 15 ----
{
 "n": 15,
 "title": "Trade and heal",
 "big_idea": "Today the money means something. The merchant charges three for the sword and tells you when you cannot pay - with [[else]] - and a healer in the swamp gives your health back.",
 "new_concepts": ["else", "&gt;="],
 "draw": ["healer.png"],
 "objectives": [
   "Use [[else]] to do one thing or the other",
   "Take money away only when there is enough",
   "Build a new character from the merchant's pattern",
   "Play the whole game from start to finish",
 ],
 "ops": [
  SET(NPC_LOOP, "talk", [
    "playerHit = get_collision(self, 'Player')",
    "if playerHit and key_was_pressed('e'):",
    "    if playerHit.money >= 3:",
    "        playerHit.money = playerHit.money - 3",
    "        print('It is dangerous out there. Take this sword!')",
    "        playerHit.hasSword = True",
    "    else:",
    "        print('Come back when you have 3 money.')",
  ]),
  ADD(FOREST_START, "hint", [
    "print('Press e to trade with the merchant')",
  ]),
  ADD(HEALER_START, "look", [
    "self.image = sprite('healer.png')",
  ]),
  ADD(HEALER_LOOP, "heal", [
    "playerHit = get_collision(self, 'Player')",
    "if playerHit and key_was_pressed('e'):",
    "    playerHit.health = 3",
    "    print('You feel better!')",
  ]),
  ADD(SWAMP_START, "healer", [
    "self.healer = Healer()",
    "self.healer.x = 0",
    "self.healer.y = -250",
  ]),
 ],
 "flow": [
  TALK("0:00", "Nothing is free",
       "<p>The sword is free. Make it cost 3 money: the merchant asks <em>do you have 3?</em> "
       "Yes - take it and give the sword. Otherwise - [[else]] - say so.</p>",
       ask=("Where does the money check go - around the whole talk, or inside it?",
            "Inside - you still need to touch the merchant and press E first")),
  STEP(NPC_LOOP, "talk", "The sword costs 3",
       ["The first line does not change.",
        "A new if inside the old one: with 3 or more, take 3 away. Your print and sword "
        "lines move under it, pushed in eight spaces. The else lines up with the new if."],
       at="0:06",
       ask=("Why playerHit.money and not self.money?",
            "In NPC code, self is the merchant - the money is Pixelhead's")),
  STEP(FOREST_START, "hint", "A hint",
       ["At the very bottom of Forest start: tell the player what E does, every time the "
        "forest is built."],
       at="0:15"),
  TALK("0:17", "A healer",
       "<p>Make a class called <strong>Healer</strong> and draw <code>healer.png</code> at 60 "
       "by 80. Ask the class to say the healer's code before seeing it - it is the merchant's "
       "pattern.</p>",
       ask=("What does the healer change, and on whom?",
            "playerHit.health - Pixelhead's health, back to 3")),
  STEP(HEALER_START, "look", "Give the healer a picture",
       ["The healer gets the picture you drew."],
       at="0:24"),
  STEP(HEALER_LOOP, "heal", "Heal with E",
       ["The merchant's pattern: touching Pixelhead and E pressed, set its health back to 3."],
       at="0:26"),
  STEP(SWAMP_START, "healer", "A healer in the swamp",
       ["At the bottom of Swamp start: the healer, low in the middle."],
       at="0:30"),
  TALK("0:34", "Play it through",
       "<p>The whole game: collect three ore, buy the sword, clear the forest, explore the "
       "field and swamp, heal. Everyone plays someone else's game for the last five "
       "minutes.</p>"),
 ],
 "errors": [
   ("The sword is still free", "The print and hasSword lines must be pushed in eight spaces, under the money check."),
   ("The else message never shows", "else: lines up with if playerHit.money, four spaces in, and ends with a colon."),
   ("Money goes negative", "Take the 3 away inside the money check, not before it."),
   ("The healer does nothing", "Healer loop needs its own playerHit line, and health = 3 is pushed in under the if."),
 ],
 "recap": [
   "[[else]] runs when its if is not true.",
   "&gt;= is greater than or equal: 3 is enough for >= 3.",
   "A new character is the same pattern with a different change.",
   "Every class in the game came the same way: a class, a picture, made in a room.",
 ],
 "homework": [
   {"task": "Trace it", "detail": "Pixelhead has 2 money and presses E at the merchant. Then collects one ore and presses E again. What does the console say each time?", "done": "Come back when you have 3 money. Then Money: 3, and It is dangerous out there. Take this sword!"},
   {"task": "Your game", "detail": "Write down one thing you would add to this game next, and which class it would go in.", "done": "One idea and one class."},
 ],
 "bonus": {"title": "A healer that charges",
           "body": "<p>Make healing cost 1 money, the same way the sword costs 3 - with an if, "
                   "a subtraction and an else.</p>"},
 "slides": [
   {"title": "Nothing is free", "sub": "if ... else", "bullets": [
     "Do you have 3? Take it, give the sword", "Otherwise: say so", "else lines up with its if"]},
   {"title": "The sword costs 3", "bullets": [], "code": [(NPC_LOOP, "talk")]},
   {"title": "A hint", "bullets": [], "code": [(FOREST_START, "hint")]},
   {"title": "Checkpoint: pay up", "checkpoint": True,
    "say": "Press Play. The console tells you to press E. Try the merchant with no money, then with three."},
   {"title": "A healer", "sub": "healer.png - 60 x 80", "bullets": [
     "Make a class called Healer", "The merchant's pattern", "It changes playerHit.health"]},
   {"title": "Give the healer a picture", "bullets": [], "code": [(HEALER_START, "look")]},
   {"title": "Heal with E", "bullets": [], "code": [(HEALER_LOOP, "heal")]},
   {"title": "A healer in the swamp", "bullets": [], "code": [(SWAMP_START, "healer")]},
   {"title": "Checkpoint: the whole game", "checkpoint": True,
    "say": "Press Play. Get stung, walk down to the swamp and press E at the healer: You feel better!"},
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
    if re.search(r"[tT]imer - 1", stripped):
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
    if stripped.startswith("print("):
        keys.append("py:print")
    if "str(" in stripped:
        keys.append("py:str")
    if re.search(r"= -[a-z]", stripped):
        keys.append("py:negate")
    if re.match(r"self(\.\w+)+ = '", stripped):
        keys.append("py:string")
    if ".angle" in stripped:
        keys.append("py:angle")
    if stripped.startswith("import "):
        keys.append("py:import")
    if "randint(" in stripped:
        keys.append("py:random")
    if "game." in stripped:
        keys.append("py:game")
    if "persistent" in stripped:
        keys.append("py:persistent")
    if stripped.startswith("self.z ="):
        keys.append("py:z")
    return keys


# key -> (kind, title, [bullets], example). kind picks the slide's eyebrow.
CONCEPTS = {
    "py:start": ("game", "start runs once",
        ["Everything in [[start]] runs one time, the moment the [[object]] is made.",
         "Use it to set a picture, a place or a starting number."],
        "self.image = sprite('pixelheadRight.png')"),
    "py:loop": ("game", "loop runs over and over",
        ["[[loop]] runs about 60 times every second, until the object is gone.",
         "Anything that moves or keeps checking lives in loop."],
        "self.x = self.x + 4"),
    "py:room": ("game", "A room is one screen",
        ["Your game can have more than one screen. Each one is a [[room]].",
         "set_room changes to another, and removes everything from the one before."],
        "set_room('Forest')"),
    "py:sprite": ("art", "A sprite is your picture",
        ["[[sprite]]() finds the picture you drew and puts it on the [[object]].",
         "The name has to match exactly, including the .png."],
        "self.image = sprite('pixelheadRight.png')"),
    "py:make": ("py", "Making an object",
        ["Player() builds one player from the Player [[class]].",
         "The name on the left is how you talk to it afterwards."],
        "self.player = Player()"),
    "py:dot": ("py", "The dot reaches inside",
        ["self.ore1.x means: the x that belongs to self.ore1 - ore1's x.",
         "The [[dot]] lets a room change an object it made."],
        "self.ore1.x = 300"),
    "py:coords": ("game", "x and y",
        ["The middle of the screen is x 0, y 0.",
         "Plus x is right, plus y is UP. Minus goes left and down."],
        "self.ore1.x = 300"),
    "py:variable": ("py", "A variable holds a value",
        ["A [[variable]] is a name with a value in it. The name goes left of =.",
         "self. in front makes it belong to this object, so start and loop can share it."],
        "self.money = 0"),
    "py:change": ("py", "Change a value using itself",
        ["Python works out the right side first, then stores the answer on the left.",
         "Do it every [[loop]] and the object moves."],
        "self.x = self.x + 4"),
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
        ["1 is the size you drew. 2 is double, 0.5 is half.",
         "scaleY stretches up and down; scaleX side to side."],
        "self.background.scaleY = 2"),
    "py:compare": ("py", "Comparing numbers",
        ["&lt; is less than, &gt; is greater than.",
         "&lt;= and &gt;= also count the number itself."],
        "if self.x < -600:"),
    "py:collision": ("game", "get_collision - are they touching?",
        ["[[get_collision(self, 'Collectible')|get_collision]] gives back the ore you touch, or False.",
         "An [[if]] treats the ore as yes and False as no."],
        "oreHit = get_collision(self, 'Collectible')"),
    "py:local": ("py", "A name for right now",
        ["A name with no self. in front lives only inside this loop.",
         "Use it for an answer you need right here and nowhere else."],
        "oreHit = get_collision(self, 'Collectible')"),
    "py:press": ("game", "key_was_pressed()",
        ["[[key_was_pressed('e')|key_was_pressed]] is True for only the one loop the key goes down.",
         "One press, one action - however long you hold it."],
        "key_was_pressed('e')"),
    "py:timer": ("py", "A timer counts down",
        ["A [[timer]] changes by one every loop. 60 loops is one second.",
         "Set it, let it count down, and act when it reaches 0."],
        "self.timer = self.timer - 1"),
    "py:bool": ("py", "True or False",
        ["A [[boolean]] has only two values: True and False.",
         "Like a light switch. Python writes them with a capital letter."],
        "self.hasSword = False"),
    "py:else": ("py", "else - otherwise",
        ["[[else]]: lines up with its if, and ends with a colon.",
         "Its lines run when the if is NOT true."],
        "else:"),
    "py:and": ("py", "and - both at once",
        ["[[and]] joins two questions.",
         "The if runs only when BOTH are true."],
        "if playerHit and key_was_pressed('e'):"),
    "py:equals": ("py", "== asks, = stores",
        ["One = puts a value into a name.",
         "Two == asks whether two things are exactly equal."],
        "self.hasSword == True"),
    "py:nested": ("py", "An if inside an if",
        ["The inside if only gets asked when the outside one is true.",
         "Its lines are pushed in eight spaces."],
        "    if self.direction == 'up':"),
    "py:destroy": ("game", "destroy() removes an object",
        ["[[destroy]](oreHit) takes the ore you touched out of the game.",
         "destroy(self) removes the object whose code is running."],
        "destroy(oreHit)"),
    "py:print": ("py", "print() writes to the console",
        ["[[print]]() puts a line of words in the console under the game.",
         "Players never see it - you use it to check what your code is doing."],
        "print('Money: ' + str(self.money))"),
    "py:str": ("py", "str() turns a number into words",
        ["+ can add two numbers or join two pieces of words - not one of each.",
         "[[str]](self.money) turns 3 into '3', so + can join it."],
        "'Money: ' + str(self.money)"),
    "py:negate": ("py", "A minus in front flips the sign",
        ["-self.speed is the speed, the other way round.",
         "2 becomes -2, and -2 becomes 2."],
        "self.speed = -self.speed"),
    "py:string": ("py", "Words in quotes",
        ["Writing in quotes is a value too, like 'right' or 'Forest'.",
         "A [[variable]] can hold words as well as numbers."],
        "self.direction = 'right'"),
    "py:angle": ("art", "angle turns a picture",
        ["[[angle]] is how far the picture is turned, in degrees.",
         "0 is as you drew it; 90 points up, -90 down, 180 the other way."],
        "swordSlash.angle = 90"),
    "py:import": ("py", "import brings in a toolbox",
        ["[[import]] random gives this code Python's random number tools.",
         "It goes at the very top of the code that uses it."],
        "import random"),
    "py:random": ("py", "random.randint() picks a number",
        ["[[random.randint(1, 3)|random]] picks 1, 2 or 3 - a different one each time.",
         "Both ends can be picked."],
        "lootNum = random.randint(1, 3)"),
    "py:game": ("game", "game. reaches the Game",
        ["The Game class is made once and lasts the whole game.",
         "Inside Game it is self; from any other class it is [[game]]."],
        "game.player.x = -600"),
    "py:persistent": ("game", "persistent survives a room change",
        ["set_room removes every object from the old room...",
         "...except a [[persistent]] one."],
        "self.persistent = True"),
    "py:z": ("game", "z brings it forward",
        ["Objects with a bigger [[z]] are drawn in front.",
         "Everything starts at 0, so 1 is in front of all of it."],
        "self.z = 1"),
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
    "py:print":      ("word", "print()", ""),
    "py:str":        ("word", "str()", ""),
    "py:negate":     ("idea", "Flipping a sign", ""),
    "py:string":     ("idea", "Words in quotes", ""),
    "py:angle":      ("word", "angle", "angle turns an object's picture."),
    "py:import":     ("word", "import", ""),
    "py:random":     ("word", "random.randint()", ""),
    "py:game":       ("word", "game.", "game. reaches the Game class from anywhere."),
    "py:persistent": ("word", "persistent", ""),
    "py:z":          ("word", "z", "z decides what is drawn in front."),
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
    "class":   "A KIND of thing in your game - Player, Collectible, FlyEnemy. Every object is built from one, like a house from a blueprint.",
    "object":  "One thing built from a class: Pixelhead, one ore, one wasp. You can see it and give it orders.",
    "sprite":  "The picture you drew, put onto an object. The name has to match exactly, including the .png.",
    "room":    "One screen of your game - the Forest, the Field and the Swamp. set_room picks which one you see, and removes everything from the room before.",
    "start":   "The part of an object that runs once, the moment it is made - for its picture, its place and its starting numbers.",
    "loop":    "The part of an object that runs over and over, about sixty times a second. Anything that moves or keeps checking lives here.",
    "dot":     "The . between two names. self.ore1.x means ore1's x - the x that belongs to self.ore1.",
    "variable": "A name that holds a value, like self.money = 0 or self.direction = 'up'. With self. in front it belongs to the object.",
    "scale":   "scaleX and scaleY stretch a picture: 1 is the size you drew, 2 is double, and a minus flips it like a mirror.",
    "if":      "Runs the lines under it only when its question is true. The if ends with a colon and the lines under it are pushed in four spaces.",
    "key_is_pressed": "True for every loop you hold a key down, so holding an arrow keeps Pixelhead walking.",
    "key_was_pressed": "True for only the one loop a key goes down, so one press of F is one swing.",
    "get_collision": "Asks whether this object is touching one of a class. It gives back the thing it touches, or False.",
    "timer":   "A number that goes down by one every loop. Your sword slash starts at 30 and is destroyed when it reaches 0.",
    "boolean": "A value that is either True or False, like self.hasSword - a switch that is on or off.",
    "else":    "Goes under an if, lined up with it. Its lines run when the if's question is not true.",
    "and":     "Joins two questions in one if. The if runs only when both are true.",
    "destroy": "Takes an object out of the game for good. destroy(oreHit) removes the ore you touched.",
    "print":   "Writes a line of words in the console under the game - Money: 2, Health: 1 - so you can see what your code is doing.",
    "str":     "Turns a number into words, so + can join it to other words: 'Money: ' + str(self.money).",
    "angle":   "How far an object's picture is turned, in degrees. Your slash uses 90 to point up and 180 to point left.",
    "import":  "Brings one of Python's toolboxes into your code. import random lets you pick random numbers.",
    "random":  "random.randint(1, 3) picks a whole number from 1 to 3, a different one each time - how each ore picks its colour.",
    "game":    "The Game class, made once and lasting the whole game. From any other class you reach Pixelhead as game.player.",
    "persistent": "An object with self.persistent = True survives set_room, so Pixelhead walks from room to room.",
    "z":       "Decides what is drawn in front. Everything starts at 0; Pixelhead's z of 1 keeps it in front of the background.",
}

# Animated metaphors. Reuses build.concept_visual's library - see SLIDE-RULES.
VISUALS = {
    "py:start": {"kind": "machine", "in": "object made", "label": "start", "out": "done once",
                 "cap": "[[start]] runs one time, then never again."},
    "py:loop": {"kind": "loop", "items": ["1", "2", "3", "4"],
                "cap": "[[loop]] runs again and again, about 60 times a second."},
    "py:room": {"kind": "swap", "off": "nothing", "on": "Forest",
                "cap": "A [[room]] is one screen. set_room picks which one you see."},
    "py:sprite": {"kind": "swap", "off": "nothing", "on": "your art",
                  "cap": "[[sprite]]() puts the picture you drew onto the [[object]]."},
    "py:make": {"kind": "dom", "parent": "the Game", "child": "a Player", "mode": "add",
                "cap": "Player() builds one from the blueprint."},
    "py:coords": {"kind": "resize", "axis": "w",
                  "cap": "x is left and right. Minus numbers go LEFT."},
    "py:variable": {"kind": "machine", "in": "0", "label": "self.money", "out": "kept",
                    "cap": "A [[variable]] is a name that keeps a value for later."},
    "py:change": {"kind": "machine", "in": "100", "label": "+ 4", "out": "104",
                  "cap": "The old value goes in on the right; the new one is stored on the left."},
    "py:if": {"kind": "fork", "cond": "right held?", "yes": "walk right", "no": "carry on",
              "cap": "[[if]] means only when - the pushed-in lines run only if it is true."},
    "py:keys": {"kind": "event", "btn": "hold right", "action": "x goes up",
                "cap": "[[key_is_pressed]] is True for as long as you hold the key."},
    "py:flip": {"kind": "swap", "off": "scaleX = 1", "on": "scaleX = -1",
                "cap": "A minus [[scaleX|scale]] flips the picture to face the other way."},
    "py:scale": {"kind": "resize", "axis": "h",
                 "cap": "[[scaleY|scale]] = 2 makes the picture twice as tall."},
    "py:collision": {"kind": "fork", "cond": "touching?", "yes": "collect it", "no": "carry on",
                     "cap": "[[get_collision]] answers with the ore you touch, or False."},
    "py:press": {"kind": "event", "btn": "E", "action": "one message",
                 "cap": "[[key_was_pressed]] is True for one loop only - one press, one action."},
    "py:timer": {"kind": "loop", "items": ["30", "29", "...", "0"],
                 "cap": "The slash's [[timer]] counts down; at 0 it is gone."},
    "py:bool": {"kind": "swap", "off": "False", "on": "True",
                "cap": "A [[boolean]] is a switch: True or False."},
    "py:else": {"kind": "fork", "cond": "3 money?", "yes": "sell the sword", "no": "come back later",
                "cap": "[[else]] runs when the if is not true."},
    "py:destroy": {"kind": "swap", "off": "an ore", "on": "(gone)",
                   "cap": "[[destroy]] takes an object out of the game for good."},
    "py:print": {"kind": "swap", "off": "(console)", "on": "Money: 1",
                 "cap": "[[print]] writes a line in the console."},
    "py:negate": {"kind": "machine", "in": "2", "label": "-", "out": "-2",
                  "cap": "A minus in front flips the sign."},
    "py:angle": {"kind": "swap", "off": "angle = 0", "on": "angle = 90",
                 "cap": "[[angle]] turns the picture: 90 points it up."},
    "py:random": {"kind": "machine", "in": "1 to 3", "label": "randint", "out": "2",
                  "cap": "[[random.randint|random]] picks a number - a different one each time."},
    "py:persistent": {"kind": "swap", "off": "removed", "on": "kept",
                      "cap": "A [[persistent]] object survives a room change."},
}

LINE_NOTES = {
    (PLAYER_START, "look"): ["Use the Pixelhead picture you drew."],
    (GAME_START, "player"): ["Build one player and keep it as self.player."],
    (ORE_START, "look"): ["Use the ore picture you drew."],
    (FOREST_START, "ores"): [
        "Build one ore and keep it as self.ore1.",
        "300 to the right of the middle.",
        "100 up.",
        "A second ore, self.ore2.",
        "250 to the LEFT - minus.",
        "80 down - minus.",
    ],
    (GAME_START, "setup"): ["Change to the Forest room."],
    (PLAYER_START, "keep"): ["Survive every room change. Capital T."],
    (PLAYER_LOOP, "sideways"): [
        "Only while the right arrow is held...",
        "...add 4 to x: right. Four spaces in front!",
        "...show the right-facing picture...",
        "...the way you drew it.",
        "Only while the left arrow is held...",
        "...take 4 off x: left.",
        "...the same right-facing picture...",
        "...flipped like a mirror.",
    ],
    (7, PLAYER_LOOP, "sideways"): [
        "Only while the right arrow is held...",
        "...walk right...",
        "...face right...",
        "...the way you drew it...",
        "NEW: ...and remember you face right.",
        "Only while the left arrow is held...",
        "...walk left...",
        "...the right-facing picture...",
        "...flipped...",
        "NEW: ...and remember you face left.",
    ],
    (PLAYER_LOOP, "updown"): [
        "Only while the up arrow is held...",
        "...add 4 to y: up.",
        "...show Pixelhead's back...",
        "...not flipped.",
        "Only while the down arrow is held...",
        "...take 4 off y: down.",
        "...show Pixelhead's face...",
        "...not flipped.",
    ],
    (7, PLAYER_LOOP, "updown"): [
        "Only while the up arrow is held...",
        "...walk up...",
        "...show the back...",
        "...not flipped...",
        "NEW: ...and remember you face up.",
        "Only while the down arrow is held...",
        "...walk down...",
        "...show the face...",
        "...not flipped...",
        "NEW: ...and remember you face down.",
    ],
    (BACK_START, "look"): ["Use the forest picture you drew."],
    (FOREST_START, "back"): ["At the VERY TOP: make the background first, so it is drawn at the back."],
    (PLAYER_START, "front"): ["Draw Pixelhead in front of everything at 0."],
    (PLAYER_START, "money"): ["No money to start with."],
    (PLAYER_LOOP, "collect"): [
        "Am I touching an ore? Keep the answer in oreHit.",
        "Only when I am...",
        "...take that ore out of the game...",
        "...add 1 to my money...",
        "...and write it in the console.",
    ],
    (WASP_START, "look"): ["Use the wasp picture you drew."],
    (WASP_START, "speed"): ["2 steps every loop."],
    (WASP_LOOP, "fly"): ["Take the speed off x, every loop: left."],
    (FOREST_START, "wasps"): [
        "Build one wasp, self.wasp1.",
        "400 to the right.",
        "200 down - low.",
        "A second wasp, self.wasp2.",
        "600 to the right, at the edge.",
        "200 up - high.",
    ],
    (PLAYER_LOOP, "enemies"): [
        "Am I touching a wasp?",
        "Only when I am...",
        "...take ME out of the game.",
    ],
    (10, PLAYER_LOOP, "enemies"): [
        "NEW: count the invincibility timer down, every loop.",
        "Am I touching a wasp?",
        "CHANGED: only when I am AND the timer has run out...",
        "NEW: ...lose one health...",
        "NEW: ...be safe for 60 loops - one second...",
        "NEW: ...and write the health in the console.",
    ],
    (11, PLAYER_LOOP, "enemies"): [
        "Count the timer down.",
        "Am I touching a wasp?",
        "Only when I am and the timer has run out...",
        "...lose one health...",
        "...be safe for a second...",
        "...write the health...",
        "NEW: ...turn the wasp round...",
        "NEW: ...and flip its picture.",
    ],
    (WASP_LOOP, "turn"): [
        "Only once the wasp is past -600 on the left...",
        "...flip the sign of its speed: now it flies right...",
        "...and flip the picture to face right.",
        "Only once it is past 600 on the right...",
        "...flip the speed again: left...",
        "...and face left, the way you drew it.",
    ],
    (NPC_START, "look"): ["Use the merchant picture you drew."],
    (FOREST_START, "npc"): [
        "Build one merchant.",
        "400 to the left.",
    ],
    (NPC_LOOP, "talk"): [
        "Am I touching Pixelhead? Keep it in playerHit.",
        "Only when I am AND E was just pressed...",
        "...say this in the console.",
    ],
    (6, NPC_LOOP, "talk"): [
        "Am I touching Pixelhead?",
        "Only when I am and E was just pressed...",
        "...say this...",
        "NEW: ...and switch on THAT Pixelhead's sword.",
    ],
    (15, NPC_LOOP, "talk"): [
        "Am I touching Pixelhead?",
        "Only when I am and E was just pressed...",
        "NEW: ...and only when it has 3 money or more...",
        "NEW: ...take 3 away...",
        "CHANGED: ...say this - pushed in eight spaces now...",
        "CHANGED: ...and give the sword - eight spaces.",
        "NEW: Otherwise - lined up with the money if...",
        "NEW: ...say what it costs.",
    ],
    (PLAYER_START, "sword"): ["No sword yet. Capital F."],
    (SLASH_START, "look"): ["Use the slash picture you drew."],
    (PLAYER_LOOP, "attack"): [
        "Only with a sword AND on the press of F...",
        "...build a slash, called swordSlash for now...",
        "...at my x...",
        "...and my y.",
    ],
    (7, PLAYER_LOOP, "attack"): [
        "With a sword, on the press of F...",
        "...build a slash...",
        "...at my x...",
        "...and my y.",
        "NEW: Facing up? Four spaces in...",
        "NEW: ...turn it to point up. Eight spaces in.",
        "NEW: Facing down?",
        "NEW: ...point it down.",
        "NEW: Facing left?",
        "NEW: ...turn it all the way round.",
    ],
    (8, PLAYER_LOOP, "attack"): [
        "With a sword, on the press of F...",
        "...build a slash...",
        "...at my x...",
        "...and my y.",
        "Facing up?",
        "...point up...",
        "NEW: ...and move it 80 up.",
        "Facing down?",
        "...point down...",
        "NEW: ...and move it 80 down.",
        "Facing left?",
        "...point left...",
        "NEW: ...and move it 80 left.",
        "NEW: Facing right?",
        "NEW: ...move it 80 right. No turn needed.",
    ],
    (PLAYER_START, "direction"): ["Start facing right. The word goes in quotes."],
    (SLASH_START, "timer"): ["30 loops to live - half a second."],
    (SLASH_LOOP, "fade"): [
        "One less, every loop.",
        "Once it reaches 0...",
        "...the slash removes itself.",
    ],
    (WASP_LOOP, "swordhit"): [
        "Am I touching a sword slash?",
        "Only when I am...",
        "...remove me.",
    ],
    (11, WASP_LOOP, "swordhit"): [
        "NEW: count my timer down, every loop.",
        "Am I touching a sword slash?",
        "CHANGED: only when I am AND my timer has run out...",
        "NEW: ...lose one health...",
        "NEW: ...and wait 40 loops - longer than a slash lives.",
    ],
    (FOREST_START, "wasp3"): [
        "A third wasp.",
        "200 to the right.",
        "100 down.",
    ],
    (PLAYER_START, "health"): [
        "Three health to start.",
        "The invincibility timer starts at 0, so the first sting counts.",
    ],
    (PLAYER_LOOP, "dead"): [
        "Once my health is 0 or less...",
        "...full health again...",
        "...no money...",
        "...no sword...",
        "...back to the middle...",
        "...of the screen...",
        "...and the forest, built fresh.",
    ],
    (WASP_START, "health"): [
        "Three health.",
        "A hit timer at 0.",
    ],
    (WASP_LOOP, "defeat"): [
        "Once my health is 0 or less...",
        "...remove me.",
    ],
    (12, WASP_LOOP, "defeat"): [
        "Once my health is 0 or less...",
        "NEW: ...pick a number from 1 to 100...",
        "NEW: ...over 50 - half the time...",
        "NEW: ...build an ore...",
        "NEW: ...where I am...",
        "NEW: ...across and up.",
        "...then remove me.",
    ],
    (ORE_START, "import"): ["Bring in the random toolbox. The very top."],
    (12, ORE_START, "look"): [
        "NEW: pick 1, 2 or 3, and keep it in lootNum.",
        "NEW: Only when it is 1...",
        "CHANGED: ...yellow. Your line, pushed in four spaces.",
        "NEW: When it is 2...",
        "NEW: ...pink.",
        "NEW: When it is 3...",
        "NEW: ...blue.",
    ],
    (WASP_LOOP, "import"): ["The random toolbox, at the very top of FlyEnemy loop."],
    (FOREST_LOOP, "east"): [
        "Once Pixelhead is past 600 on the right...",
        "...move it to the far left...",
        "...and change to the Field.",
    ],
    (FIELD_START, "back"): [
        "The same Background class...",
        "...with the field picture instead.",
    ],
    (FIELD_START, "things"): [
        "One ore.",
        "Over to the right...",
        "...and high up.",
        "A wasp.",
        "On the right...",
        "...high.",
        "A second wasp.",
        "On the left...",
        "...low.",
    ],
    (FIELD_LOOP, "west"): [
        "Once Pixelhead is past -600 on the left...",
        "...move it to the far right...",
        "...and change to the Forest.",
    ],
    (FOREST_LOOP, "south"): [
        "Once Pixelhead is below -360...",
        "...move it to the top...",
        "...and change to the Swamp.",
    ],
    (SWAMP_START, "back"): [
        "A background...",
        "...with the swamp picture.",
    ],
    (SWAMP_START, "stretch"): ["Twice as tall: 360 becomes 720."],
    (SWAMP_START, "wasps"): [
        "A wasp.",
        "On the right...",
        "...in the middle.",
        "A second wasp.",
        "On the left...",
        "...lower down.",
    ],
    (SWAMP_LOOP, "north"): [
        "Once Pixelhead is above 360...",
        "...move it to the bottom...",
        "...and change to the Forest.",
    ],
    (FOREST_START, "hint"): ["Tell the player what E does, every time the forest is built."],
    (HEALER_START, "look"): ["Use the healer picture you drew."],
    (HEALER_LOOP, "heal"): [
        "Am I touching Pixelhead?",
        "Only when I am and E was just pressed...",
        "...full health for THAT Pixelhead...",
        "...and say so.",
    ],
    (SWAMP_START, "healer"): [
        "Build one healer.",
        "In the middle...",
        "...low down.",
    ],
}

# A note for a slide that strikes lines out. Keyed (week, panel, block) when one
# block changes in more than one week, so each week's says what that week does.
DELETE_NOTES = {
    (10, PLAYER_LOOP, "enemies"): "These two lines change - a sting no longer removes Pixelhead. Take them out; the new if and its four lines go in their place.",
    (11, WASP_LOOP, "swordhit"): "These two lines change - one hit no longer removes the wasp. Take them out; the new if and its two lines go in their place.",
}


# --- what pressing Play should show you -------------------------------------
#
# One line per step, keyed (week, panel, block). A step that changes nothing
# you can see says so, so working code is never mistaken for broken code.
CHECKS = {
    (1, PLAYER_START, "look"):
        "Nothing to see yet - you have described Pixelhead, but nobody has MADE one. "
        "You are checking there is no red error.",
    (1, GAME_START, "player"):
        "Pixelhead appears in the middle of the screen.",
    (1, ORE_START, "look"):
        "No change - no ore has been made yet.",
    (1, FOREST_START, "ores"):
        "No change - nothing goes to the Forest yet.",
    (1, GAME_START, "setup"):
        "Two ores appear - and Pixelhead is gone. That is right; ask why before the "
        "next step.",
    (1, PLAYER_START, "keep"):
        "Pixelhead is back in the middle, with an ore on each side.",
    (2, PLAYER_LOOP, "sideways"):
        "Click the game, then hold the arrows. Pixelhead walks left and right, facing "
        "the way it walks.",
    (2, PLAYER_LOOP, "updown"):
        "Pixelhead walks in all four directions, showing its back going up and its "
        "face going down.",
    (3, BACK_START, "look"):
        "No change - no Background has been made yet.",
    (3, FOREST_START, "back"):
        "Your forest fills the screen and the ores sit on it - but Pixelhead is hidden "
        "behind it. That is right for now.",
    (3, PLAYER_START, "front"):
        "Pixelhead is back, in front of the forest.",
    (3, PLAYER_START, "money"):
        "No change - nothing uses the money yet.",
    (3, PLAYER_LOOP, "collect"):
        "Walk into an ore. It disappears, and the console says Money: 1. The second "
        "says Money: 2.",
    (4, WASP_START, "look"):
        "No change - no FlyEnemy has been made yet.",
    (4, WASP_START, "speed"):
        "No change - the speed is a number waiting to be used.",
    (4, WASP_LOOP, "fly"):
        "No change - there are no wasps yet.",
    (4, FOREST_START, "wasps"):
        "Two wasps fly left across the forest, one low and one high, and off the left "
        "side.",
    (4, PLAYER_LOOP, "enemies"):
        "Walk into a wasp. Pixelhead disappears - press Play to start again.",
    (5, WASP_LOOP, "turn"):
        "Wait a few seconds. The wasps turn round at each side and patrol back and "
        "forth, always facing the way they fly.",
    (5, NPC_START, "look"):
        "No change - no NPC has been made yet.",
    (5, FOREST_START, "npc"):
        "The merchant stands on the left of the forest.",
    (5, NPC_LOOP, "talk"):
        "Walk to the merchant and press E. The console says: It is dangerous out "
        "there. Take this sword!",
    (6, PLAYER_START, "sword"):
        "No change - nothing reads the switch yet.",
    (6, NPC_LOOP, "talk"):
        "The merchant says the same - and now really hands over the sword, though "
        "you cannot see it yet.",
    (6, SLASH_START, "look"):
        "No change - no PlayerAttack has been made yet.",
    (6, PLAYER_LOOP, "attack"):
        "Press F: nothing. Get the sword from the merchant and press F again - a slash "
        "appears on Pixelhead, pointing right, and stays.",
    (7, PLAYER_START, "direction"):
        "No change - nothing uses the direction yet.",
    (7, PLAYER_LOOP, "sideways"):
        "No change you can see. The direction is remembered, but nothing reads it yet.",
    (7, PLAYER_LOOP, "updown"):
        "Still no change - the next step reads it.",
    (7, PLAYER_LOOP, "attack"):
        "Get the sword and swing facing each way. The slash points the way you face - "
        "still on top of Pixelhead.",
    (8, PLAYER_LOOP, "attack"):
        "Swing each way. The slash appears 80 in front of Pixelhead - and still stays "
        "there.",
    (8, SLASH_START, "timer"):
        "No change - nothing counts the timer down yet.",
    (8, SLASH_LOOP, "fade"):
        "Swing. Each slash disappears half a second later.",
    (9, WASP_LOOP, "swordhit"):
        "Get the sword and swing at a wasp. It disappears.",
    (9, FOREST_START, "wasp3"):
        "A third wasp patrols low in the middle of the forest.",
    (10, PLAYER_START, "health"):
        "No change - nothing uses the health yet. A sting still removes Pixelhead.",
    (10, PLAYER_LOOP, "enemies"):
        "Walk into a wasp. Pixelhead stays, and the console says Health: 2. Stay in its "
        "way and a second later it says Health: 1.",
    (10, PLAYER_LOOP, "dead"):
        "Get stung three times. At Health: 0 the forest starts again: Pixelhead in the "
        "middle, both ores back, and no sword.",
    (11, PLAYER_LOOP, "enemies"):
        "Walk into a wasp. It turns round and flies away from you.",
    (11, WASP_START, "health"):
        "No change - one swing still removes a wasp.",
    (11, WASP_LOOP, "swordhit"):
        "Swing at a wasp. It does not disappear any more - nothing checks its health "
        "yet. That is the next step.",
    (11, WASP_LOOP, "defeat"):
        "Swing at a wasp three times. It disappears on the third.",
    (12, ORE_START, "import"):
        "No change - nothing uses random yet.",
    (12, ORE_START, "look"):
        "Press Play a few times. The ores are a different mix of yellow, pink and blue "
        "each time.",
    (12, WASP_LOOP, "import"):
        "No change.",
    (12, WASP_LOOP, "defeat"):
        "Defeat the wasps. About half of them leave an ore where they were.",
    (13, FOREST_LOOP, "east"):
        "Walk off the right edge. Pixelhead comes in on the left of an empty room - "
        "and cannot get back.",
    (13, FIELD_START, "back"):
        "Walk right again: the field picture fills the screen.",
    (13, FIELD_START, "things"):
        "The field has an ore up on the right and two wasps.",
    (13, FIELD_LOOP, "west"):
        "Walk off the left edge of the field. You come into the forest on its right, "
        "with its ores back.",
    (14, FOREST_LOOP, "south"):
        "Walk off the bottom of the forest. Pixelhead comes in at the top of an empty "
        "room.",
    (14, SWAMP_START, "back"):
        "Walk down again. The swamp fills only the middle of the screen. That is right "
        "for now.",
    (14, SWAMP_START, "stretch"):
        "The swamp fills the whole screen.",
    (14, SWAMP_START, "wasps"):
        "Two wasps patrol the swamp.",
    (14, SWAMP_LOOP, "north"):
        "Walk off the top of the swamp. You come into the forest at the bottom.",
    (15, NPC_LOOP, "talk"):
        "Press E at the merchant with no money: Come back when you have 3 money. Collect "
        "three ore and try again: the sword, and your money drops by 3.",
    (15, FOREST_START, "hint"):
        "The console says Press e to trade with the merchant when the game starts, and "
        "each time you come back to the forest.",
    (15, HEALER_START, "look"):
        "No change - no Healer has been made yet.",
    (15, HEALER_LOOP, "heal"):
        "Still no change - the healer is not in a room yet.",
    (15, SWAMP_START, "healer"):
        "Get stung, then walk down to the swamp and press E at the healer. The console "
        "says You feel better! and your health is 3.",
}


def check_for(week_n, panel, block):
    """What to look for after Play, for one step. The build refuses to ship a
    step that has no line, so this may raise rather than return nothing."""
    return CHECKS[(week_n, panel, block)]

QUIZZES = {
    (1, PLAYER_START, "keep"): [
        {"q": "What is a class?",
         "options": ["A blueprint for a kind of thing", "One ore on the screen",
                     "A picture", "A room"], "answer": 0,
         "why": "A class is the blueprint; every ore is an object built from it."},
        {"q": "What does set_room do to the objects already there?",
         "options": ["Removes them", "Keeps them", "Moves them to the middle",
                     "Makes them bigger"], "answer": 0,
         "why": "Every object from before is removed - unless it is persistent."},
        {"q": "Why did Pixelhead need self.persistent = True? (this week)",
         "options": ["To survive the change to the Forest", "To move",
                     "To get a picture", "To be drawn in front"], "answer": 0,
         "why": "It was made in Game, before set_room removed everything."},
    ],
    (2, PLAYER_LOOP, "updown"): [
        {"q": "Why does walking go in loop, not start?",
         "options": ["start runs once; loop keeps moving it", "loop is faster to type",
                     "start cannot use x", "It does not matter"], "answer": 0,
         "why": "Walking is a small move again and again - that is loop."},
        {"q": "x is 100. What is it after three loops of self.x = self.x + 4?",
         "options": ["112", "104", "100", "12"], "answer": 0,
         "why": "104, 108, 112."},
        {"q": "Why is there no pixelheadLeft picture? (this week)",
         "options": ["scaleX = -1 flips the right one", "Left is not allowed",
                     "It is the same as up", "It is drawn by the computer"], "answer": 0,
         "why": "One drawing, flipped like a mirror."},
    ],
    (3, PLAYER_LOOP, "collect"): [
        {"q": "Why was Pixelhead hidden behind the forest?",
         "options": ["It was made before the background", "The forest is too big",
                     "Its picture was missing", "It was not persistent"], "answer": 0,
         "why": "Objects are drawn in the order they are made."},
        {"q": "What does get_collision(self, 'Collectible') give back?",
         "options": ["The ore you touch, or False", "Always True",
                     "A new ore", "The number of ores"], "answer": 0,
         "why": "It answers with the thing you are touching, or False if nothing."},
        {"q": "Why str(self.money) in the print? (this week)",
         "options": ["+ cannot join words and a number", "To make it bigger",
                     "print only takes numbers", "To save the money"], "answer": 0,
         "why": "str turns the number into words, so + can join them."},
    ],
    (4, PLAYER_LOOP, "enemies"): [
        {"q": "What does destroy(self) remove in Player loop?",
         "options": ["Pixelhead", "The wasp", "Every object", "The room"], "answer": 0,
         "why": "self is the object whose code is running."},
        {"q": "Why is it waspHit and not self.waspHit?",
         "options": ["It is only needed in this loop", "It is a mistake",
                     "self. is only for numbers", "To make it faster"], "answer": 0,
         "why": "A name without self. lives only inside this loop."},
        {"q": "Two wasps come from one class. How are they in different places? (this week)",
         "options": ["Each object has its own x and y", "The class has two pictures",
                     "It is random", "They are not"], "answer": 0,
         "why": "Every object keeps its own values."},
    ],
    (5, NPC_LOOP, "talk"): [
        {"q": "The speed is 2. What is -self.speed?",
         "options": ["-2", "2", "0", "-4"], "answer": 0,
         "why": "A minus in front flips the sign."},
        {"q": "Why key_was_pressed('e') and not key_is_pressed('e')?",
         "options": ["One press, one message", "It is faster",
                     "key_is_pressed does not work for letters", "It looks nicer"], "answer": 0,
         "why": "key_is_pressed would print every loop E is held."},
        {"q": "When does the merchant speak? (this week)",
         "options": ["When Pixelhead touches it AND E is pressed", "When E is pressed anywhere",
                     "When Pixelhead touches it", "Every loop"], "answer": 0,
         "why": "and needs both questions to be true."},
    ],
    (6, PLAYER_LOOP, "attack"): [
        {"q": "What values can a boolean have?",
         "options": ["True or False", "Any number", "Any word", "0 to 100"], "answer": 0,
         "why": "Just the two - like a switch."},
        {"q": "In NPC loop, what is playerHit?",
         "options": ["The Pixelhead the merchant is touching", "The merchant",
                     "Always False", "The sword"], "answer": 0,
         "why": "get_collision gives back the Player it touches."},
        {"q": "What is the difference between = and ==? (this week)",
         "options": ["= stores a value, == asks if two things are equal", "None",
                     "== is faster", "= is only for numbers"], "answer": 0,
         "why": "One equals stores; two equals compares."},
    ],
    (7, PLAYER_LOOP, "attack"): [
        {"q": "Which angle points the slash up?",
         "options": ["90", "-90", "180", "0"], "answer": 0,
         "why": "90 is a quarter turn up; -90 is down."},
        {"q": "Why does 'right' have quotes?",
         "options": ["It is words, not a name", "Quotes make it faster",
                     "All variables need quotes", "It does not need them"], "answer": 0,
         "why": "Without quotes Python looks for a variable called right."},
        {"q": "How far in is a line under an if inside an if? (this week)",
         "options": ["Eight spaces", "Four spaces", "No spaces", "Two spaces"], "answer": 0,
         "why": "Four for each if it is inside."},
    ],
    (8, SLASH_LOOP, "fade"): [
        {"q": "How many loops is one second?",
         "options": ["60", "30", "1", "100"], "answer": 0,
         "why": "loop runs about 60 times a second."},
        {"q": "Facing left, where does the slash go?",
         "options": ["80 to the left of Pixelhead", "80 to the right",
                     "On top of Pixelhead", "80 up"], "answer": 0,
         "why": "Left takes 80 off x."},
        {"q": "Why does each slash have its own timer? (this week)",
         "options": ["So each one fades on its own", "To make it faster",
                     "Player cannot hold numbers", "It does not"], "answer": 0,
         "why": "The timer is in PlayerAttack start, so every slash gets one."},
    ],
    (9, FOREST_START, "wasp3"): [
        {"q": "Why does the sword check go in FlyEnemy?",
         "options": ["The wasp is the one that changes", "PlayerAttack has no loop",
                     "It is shorter", "It does not matter"], "answer": 0,
         "why": "The object that changes usually does the checking."},
        {"q": "Which class has no loop code?",
         "options": ["Background", "Player", "FlyEnemy", "PlayerAttack"], "answer": 0,
         "why": "The background never moves or checks anything."},
        {"q": "In FlyEnemy loop, what does destroy(self) remove? (this week)",
         "options": ["The wasp", "The slash", "Pixelhead", "Every wasp"], "answer": 0,
         "why": "self is the wasp whose code is running."},
    ],
    (10, PLAYER_LOOP, "dead"): [
        {"q": "Without the invincibility timer, what would one long sting do?",
         "options": ["Take a health every loop", "Nothing", "Take one health",
                     "Give health back"], "answer": 0,
         "why": "Every loop of touching would count as a sting."},
        {"q": "Why is invTimer counted down outside the if?",
         "options": ["It must run every loop", "It is shorter",
                     "The if would break", "It does not matter"], "answer": 0,
         "why": "Inside the if it would only count down while being stung."},
        {"q": "At 0 health, why move Pixelhead instead of destroying it? (this week)",
         "options": ["So the game goes on", "destroy does not work on Player",
                     "It is faster", "To keep the money"], "answer": 0,
         "why": "With no Pixelhead there is nothing left to play."},
    ],
    (11, WASP_LOOP, "defeat"): [
        {"q": "How does a sting turn the wasp round?",
         "options": ["waspHit.speed = -waspHit.speed", "destroy(waspHit)",
                     "self.speed = -self.speed", "set_room"], "answer": 0,
         "why": "waspHit is the wasp you touched; flip its speed."},
        {"q": "Why is the wasp's hit timer 40?",
         "options": ["It outlasts a slash, so one swing is one hit", "40 is the most allowed",
                     "To match Pixelhead", "It is random"], "answer": 0,
         "why": "The same slash cannot hit twice."},
        {"q": "Why is defeat a separate if? (this week)",
         "options": ["A hit only costs health; defeat is when it reaches 0", "It is shorter",
                     "Python needs two ifs", "It is not"], "answer": 0,
         "why": "Being hit and being defeated are different questions."},
    ],
    (12, WASP_LOOP, "defeat"): [
        {"q": "What can random.randint(1, 3) give?",
         "options": ["1, 2 or 3", "Only 1 or 3", "Any number", "0 to 3"], "answer": 0,
         "why": "Both ends can be picked."},
        {"q": "Why does FlyEnemy loop need its own import random?",
         "options": ["Every class that uses random needs one", "It does not",
                     "To make the wasps random", "To make it faster"], "answer": 0,
         "why": "Collectible's import only works in Collectible."},
        {"q": "Why does the loot go above destroy(self)? (this week)",
         "options": ["It is placed where the wasp is, before it is gone", "It looks nicer",
                     "Python reads from the bottom", "It does not matter"], "answer": 0,
         "why": "Make the loot while the wasp's x and y are still there."},
    ],
    (13, FIELD_LOOP, "west"): [
        {"q": "From the Forest room, how do you reach Pixelhead?",
         "options": ["game.player", "self.player", "Player", "self"], "answer": 0,
         "why": "Game made it as self.player; elsewhere that is game.player."},
        {"q": "Why arrive at -600 when walking right?",
         "options": ["You come in on the side you were walking toward", "-600 is the middle",
                     "To be safe from wasps", "It is random"], "answer": 0,
         "why": "Walking right, the new room starts on its left."},
        {"q": "Why are the ores back when you return to the forest? (this week)",
         "options": ["The room is built fresh every visit", "They were persistent",
                     "They never left", "Loot"], "answer": 0,
         "why": "Forest start runs again each time you go there."},
    ],
    (14, SWAMP_LOOP, "north"): [
        {"q": "Which number does a door going down check?",
         "options": ["y", "x", "z", "scaleY"], "answer": 0,
         "why": "Up and down are y."},
        {"q": "What does scaleY = 2 do?",
         "options": ["Makes the picture twice as tall", "Makes it twice as wide",
                     "Moves it up", "Flips it"], "answer": 0,
         "why": "scaleY stretches up and down."},
        {"q": "Why arrive at 360, not past it? (this week)",
         "options": ["Past it, you would bounce straight back", "360 is the middle",
                     "It is faster", "It does not matter"], "answer": 0,
         "why": "The other room's door checks for > 360."},
    ],
    (15, SWAMP_START, "healer"): [
        {"q": "When do the lines under else run?",
         "options": ["When the if is not true", "Always", "Never", "When the if is true"], "answer": 0,
         "why": "else means otherwise."},
        {"q": "Pixelhead has 3 money. Is playerHit.money >= 3 true?",
         "options": ["Yes", "No", "Only once", "It is an error"], "answer": 0,
         "why": "&gt;= counts the number itself."},
        {"q": "What does the healer change? (this week)",
         "options": ["Pixelhead's health, through playerHit", "Its own health",
                     "The money", "The room"], "answer": 0,
         "why": "playerHit.health = 3 changes the Pixelhead it touches."},
    ],
}

EXPANDED_WEEKS = set(range(1, 16))
