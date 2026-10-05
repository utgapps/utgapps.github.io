"""PY202 - Balloon Fight. The whole course as one data structure.

This is the only file to edit. ../pxp101/build.py replays WEEKS to produce the
playable milestones, the teacher curriculum, the textbook, the homework book
and the slides, so none of them can drift apart. Run `python build.py` here.

WHERE THIS COMES FROM

The UTG PY202 guide: a physics game in PixelPad. Pixelhead floats under three
balloons, steers by building up speed, pops bubbles for a boost and falls
under gravity. Viruses patrol the sky - land on one from above and it is gone,
touch one from below and you lose a balloon and fall faster. Clear the sky and
you go to level 2; fall off the bottom and it is game over. The game, its
classes and its order are the guide's; the guide's extra-time tasks are the
bonuses.

WHAT CHANGED FROM THE GUIDE, AND WHY

  * The guide builds everything in Game start and moves it into a Level1 room
    with copy, paste and delete on day 10. Here Level1 exists from week 1, so
    nothing is typed twice, and Game only ever holds what has to outlast a
    room: the counts and gravity.
  * The guide names Pixelhead bob and the rest enemy1, bubble1 with no self.
    Here every room keeps what it makes as self.player, self.enemy1 - the form
    PY101 to PY201 use, so a room can still reach what it made.
  * The guide prints Pixelhead's position, the spawner's timer, the enemy
    count and the balloon count on every loop, then comments each one out.
    Here the console only says something worth reading - your speed when it
    changes, how many enemies are left, and what to press on the game over
    screen - and nothing is typed to be deleted.
  * The guide moves the enemy diagonally on day 2 and replaces that with the
    patrol on day 4, and sets gravity to -8 before replacing it with the boost
    timer. Here each is a question asked in the talk, not code typed and then
    taken out.
  * The guide creates gravity in Player start and moves it to Game on day 13
    because a new level rebuilds Pixelhead - and its final code still reads
    self.gravity, which no longer exists. Here gravity arrives in week 10,
    the week after levels, straight into Game as game.gravity, and why it
    lives there is that week's question.
  * The guide restarts from the game over screen without resetting the enemy
    count, so a second game whose first ended with an enemy alive can never
    be won. Here the restart puts back all three of Game's numbers, and why
    it must is week 14's question.
  * The rewrites kept are the ones that ARE the lesson: losing one balloon at
    a time instead of all three (week 11), the grace period after a hit
    (week 12) and the balloons a new level only builds if you still have them
    (week 13).
  * The guide uses new_object('Player') and new_sprite(...). This uses
    Player() and sprite(...), as PY101 to PY201 do - the same calls, the form
    the engine documents, and the one the classroom editor runs.
"""

import re

import pixelpad

COURSE_CODE = "PY202"
TOOL = "py202"
AUDIENCE = "eleven-to-fourteen-year-olds"

# The guide's busiest day types about twenty lines. A week may not add more.
WEEK_LINE_CAP = 20
# One step shows at most this many lines before it stops to explain.
MAX_STEP_LINES = 6
# Indentation and one-line ifs - see pixelpad.check_python_rules.
check_code_rules = pixelpad.check_python_rules

DRAW_SIZE_NOTE = ("Draw it at this size. Draw Pixelhead and the virus facing RIGHT - the "
                  "code flips them to face left.")

CODE_HEADS = {"get_collision": "get_collision()", "key_is_pressed": "key_is_pressed()",
              "key_was_pressed": "key_was_pressed()", "destroy": "destroy()",
              "set_room": "set_room()", "print": "print()", "str": "str()",
              "randint": "random.randint()", "play_sound": "play_sound()",
              "sound": "sound()"}

COURSE_TITLE = "PY202 · Balloon Fight"
COURSE_BLURB = (
    "Fifteen weeks building a physics game in Python. Pixelhead floats under three "
    "balloons, pops bubbles for a boost and falls under gravity, while viruses patrol "
    "the sky. You write every line."
)
PROJECT_BLURB = (
    "A two-level balloon fight. Steer with the arrow keys by building up speed, pop "
    "bubbles to float up, and land on viruses from above - touch one from below and a "
    "balloon pops and you fall faster. Clear both levels to win; fall off the bottom and "
    "it is game over."
)

TOTAL_WEEKS = 15

# The finished game is about 165 lines. This is the ceiling, not a target.
LINE_BUDGET = 200
BONUS_BUDGET = 60

DISCLAIMER = """
<p><strong>Nothing here needs the internet except the code editor itself.</strong> The
game runs entirely in the browser - there is no server, no account and no API key anywhere
in this course.</p>
<p><strong>The students draw the art.</strong> Every sprite is listed with the exact size
to draw it. The generated games use plain coloured rectangles as stand-ins so the code can
be tested; they are meant to be replaced. Week 15 also uses a sound called
<code>jump.mp3</code>; until a student uploads one, the editor plays a short beep in its
place.</p>
<p><strong>Keep the console open.</strong> From week 3 the game writes your speed, the
enemies left and the game over message to the console under the game. If a student cannot
see it, that is the first thing to fix.</p>
"""

TEACHER_PREAMBLE = """
<p><strong>Ask before you tell.</strong> The guide this course comes from is built on
questions - which class does this belong to, start or loop, why did that happen - and every
hour here keeps at least three of them. Let a student answer before the slide does.</p>
<p><strong>Let the bugs happen.</strong> Several steps are typed so that something goes
wrong on purpose: the balloons appear in the middle of the screen, the bubble machine
floods the sky, and one touch pops all three balloons at once. The book says what they
should see. Ask why before you fix it - that conversation is the lesson.</p>
<p><strong>Draw the decision tree.</strong> Week 7's stomp-or-pop and week 11's three
balloons are ifs inside ifs. Draw the branches on the board before anyone types, and
point at the indentation: every step to the right is one more question answered.</p>
<p><strong>Pacing.</strong> A week that runs long drops its bonus, never its Play moments.
Weeks 1, 6 and 7 are the busiest; give them the whole hour. Weeks 2 and 13 are light on
purpose - use the spare time to redraw art and let everyone catch up.</p>
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
ENEMY_START, ENEMY_LOOP = "Enemy start", "Enemy loop"
BUBBLE_START, BUBBLE_LOOP = "Bubble start", "Bubble loop"
BACK_START = "Background start"
BALLOON_START = "Balloon start"
SPAWNER_START, SPAWNER_LOOP = "Spawner start", "Spawner loop"
LEVEL1_START, LEVEL1_LOOP = "Level1 start", "Level1 loop"
LEVEL2_START, LEVEL2_LOOP = "Level2 start", "Level2 loop"
OVER_START, OVER_LOOP = "GameOver start", "GameOver loop"
WIN_START = "Win start"

PANELS = [GAME_START,
          PLAYER_START, PLAYER_LOOP,
          ENEMY_START, ENEMY_LOOP,
          BUBBLE_START, BUBBLE_LOOP,
          BACK_START,
          BALLOON_START,
          SPAWNER_START, SPAWNER_LOOP,
          LEVEL1_START, LEVEL1_LOOP,
          LEVEL2_START, LEVEL2_LOOP,
          OVER_START, OVER_LOOP,
          WIN_START]

# Level1 is there from week 1; Level2 arrives in week 9, the end screens in 14 and 15.
ROOMS = ["Level1", "Level2", "GameOver", "Win"]

ORDER = {
    # Game holds only what must outlast a room. The counts are set before the
    # room is entered, because entering it makes the enemies that count.
    GAME_START: ["counts", "setup"],
    PLAYER_START: ["look", "speed", "balloons", "front", "boost", "invincible", "sound"],
    # The balloons follow before anything can pop them, as the guide has it.
    PLAYER_LOOP: ["drift", "steer", "follow", "enemy", "bubble", "fall", "boost",
                  "invincible", "falloff", "flash"],
    # import goes at the very top of the code that uses it.
    ENEMY_START: ["import", "look", "directions", "count", "place"],
    ENEMY_LOOP: ["updown", "sideways", "turnY", "turnX"],
    BUBBLE_START: ["import", "look", "place"],
    BUBBLE_LOOP: ["rise"],
    BACK_START: ["look"],
    BALLOON_START: ["look"],
    SPAWNER_START: ["setup"],
    SPAWNER_LOOP: ["spawn"],
    # The background is made first so it is drawn first, at the back - which
    # is why week 2 types it at the very top, above week 1's player.
    LEVEL1_START: ["back", "player", "enemies", "bubbles", "spawner"],
    LEVEL1_LOOP: ["next"],
    LEVEL2_START: ["back", "things", "enemies"],
    LEVEL2_LOOP: ["win"],
    OVER_START: ["screen", "hint"],
    OVER_LOOP: ["restart"],
    WIN_START: ["screen"],
}

# name -> (stand-in colour, width, height) as the student draws it.
SPRITES = {
    "pixelhead.png": ("orange", 60, 80),
    "virushead.png": ("green", 60, 60),
    "bubble.png": ("cyan", 50, 50),
    "mountains.png": ("blue", 1280, 720),
    "balloon.png": ("red", 40, 100),
    "night.png": ("purple", 1280, 720),
    "gameOver.png": ("gray", 1280, 720),
    "win.png": ("yellow", 1280, 720),
}


WEEKS = [

# ---------------------------------------------------------------- week 1 ----
{
 "n": 1,
 "title": "Pixelhead, a virus and two bubbles",
 "big_idea": "Every game is built from objects. Today you make three [[classes|class]] - Pixelhead, a virus and a bubble - and put one of each kind in a [[room]] called Level1.",
 "new_concepts": ["class", "object", "sprite", "room", "x and y"],
 "draw": ["pixelhead.png", "virushead.png", "bubble.png"],
 "objectives": [
   "Say what a [[class]] is, and what an [[object]] made from it is",
   "Give a class its picture with [[sprite]]()",
   "Make objects in a [[room]] and place them with x and y",
   "Say where 0, 0 is and which way plus x and plus y go",
 ],
 "ops": [
  ADD(PLAYER_START, "look", [
    "self.image = sprite('pixelhead.png')",
  ]),
  ADD(LEVEL1_START, "player", [
    "self.player = Player()",
    "self.player.x = 200",
    "self.player.y = 200",
  ]),
  ADD(GAME_START, "setup", [
    "set_room('Level1')",
  ]),
  ADD(ENEMY_START, "look", [
    "self.image = sprite('virushead.png')",
  ]),
  ADD(LEVEL1_START, "enemies", [
    "self.enemy1 = Enemy()",
    "self.enemy1.x = -300",
    "self.enemy1.y = -200",
  ]),
  ADD(BUBBLE_START, "look", [
    "self.image = sprite('bubble.png')",
  ]),
  ADD(LEVEL1_START, "bubbles", [
    "self.bubble1 = Bubble()",
    "self.bubble1.x = 400",
    "self.bubble1.y = -250",
    "self.bubble2 = Bubble()",
    "self.bubble2.x = -400",
    "self.bubble2.y = -250",
  ]),
 ],
 "flow": [
  TALK("0:00", "Play the game you are going to build",
       "<p>Open the week 15 page and play the finished balloon fight on the board for two "
       "minutes. Pop a bubble, land on a virus, lose a balloon.</p>",
       "<p>Say the promise: <em>every line of that game, you are going to write.</em></p>",
       ask=("What different kinds of thing can you see?",
            "Pixelhead, viruses, bubbles, balloons, the background - each one is a different class")),
  TALK("0:07", "Classes and objects",
       "<p>A [[class]] is a blueprint - a recipe for a kind of thing. An [[object]] is one "
       "thing built from it. Bubble is the class; every bubble on the screen is a Bubble "
       "object.</p>",
       "<p>In the editor, make the classes <strong>Player</strong>, <strong>Enemy</strong> "
       "and <strong>Bubble</strong>, and a room called <strong>Level1</strong>. Capitals "
       "matter.</p>",
       ask=("Which class holds the code for how a virus moves?",
            "The Enemy class - each class holds the look and behaviour of one kind of thing")),
  TALK("0:12", "Draw three things",
       "<p>Make <code>pixelhead.png</code> at 60 by 80, <code>virushead.png</code> at 60 by "
       "60 - both facing RIGHT - and <code>bubble.png</code> at 50 by 50. Fifteen minutes at "
       "most: the art can be improved any week.</p>"),
  STEP(PLAYER_START, "look", "Give Pixelhead a picture",
       ["[[start]] runs ONCE, the moment a Player is made. <code>sprite('pixelhead.png')</code> "
        "finds the picture you drew and makes it this player's image."],
       at="0:27"),
  STEP(LEVEL1_START, "player", "Pixelhead in Level1",
       ["In the Level1 room's start: <code>Player()</code> builds one player and "
        "<code>self.player</code> is the name the room keeps it under. The [[dot]] then "
        "places it: 200 right of the middle and 200 up."],
       at="0:30"),
  STEP(GAME_START, "setup", "Go to Level1",
       ["The Game class runs first, when you press Play. <code>set_room</code> changes to "
        "the Level1 [[room]], which builds Pixelhead. Press Play."],
       at="0:33",
       ask=("Where is Pixelhead - and which way is plus y?",
            "Up and to the right of the middle - plus x is right and plus y is UP")),
  STEP(ENEMY_START, "look", "Give the virus a picture",
       ["The virus gets its picture the same way Pixelhead did."],
       at="0:37"),
  STEP(LEVEL1_START, "enemies", "A virus, bottom left",
       ["Under Pixelhead: build one virus and place it. Minus x is left and minus y is "
        "down."],
       at="0:39"),
  STEP(BUBBLE_START, "look", "Give the bubble a picture",
       ["The bubble gets its picture."],
       at="0:42"),
  STEP(LEVEL1_START, "bubbles", "Two bubbles",
       ["Under the virus: two bubbles, near the bottom corners. Each needs its own name - "
        "two objects from one class."],
       at="0:44",
       ask=("Why bubble1 and bubble2, and not two lines called self.bubble?",
            "The second would take the name and the room could no longer reach the first")),
 ],
 "errors": [
   ("NameError: name 'Enemy' is not defined", "The class must be called Enemy exactly - capital E."),
   ("A grey box instead of your picture", "The picture's name and the name in sprite('...') must match exactly, capitals and .png included."),
   ("A black screen", "set_room('Level1') goes in Game start, and the room must be called Level1 exactly - capital L, no space."),
   ("Everything is in the middle", "The x and y lines need the object's name and a dot in front: self.player.x, not self.x."),
 ],
 "recap": [
   "A [[class]] is a blueprint; an [[object]] is one thing built from it.",
   "[[start]] runs once, the moment an object is made.",
   "A [[room]] builds what is in it; set_room picks the room.",
   "0, 0 is the middle. Plus x is right, plus y is up.",
 ],
 "homework": [
   {"task": "Make Pixelhead yours", "detail": "Redraw pixelhead.png as a hero you would want to float with. Keep it 60 by 80, facing right.", "done": "You press Play and your own hero is in Level1."},
   {"task": "Where is it?", "detail": "Without pressing Play: an object is at x -300, y -200. Which corner of the screen is it nearest?", "done": "Bottom left - minus x is left, minus y is down."},
 ],
 "bonus": {"title": "A third bubble",
           "body": "<p>Under the bubbles in <strong>Level1 start</strong>, add "
                   "<code>self.bubble3</code> at x 0 and y -300. Then try "
                   "<code>self.bubble3.scaleX = 2</code> - what happens? Keep it or take it "
                   "out.</p>"},
 "slides": [
   {"title": "Balloon Fight", "sub": "The game you are going to build", "bullets": [
     "Float under three balloons", "Pop bubbles to fly up", "Land on viruses from above",
     "Two levels, and a game over"]},
   {"title": "Classes and objects", "sub": "A blueprint, and the things built from it", "bullets": [
     "A class is a kind of thing: Player, Enemy, Bubble", "An object is one thing built from it",
     "Every bubble is a Bubble object"]},
   {"title": "Draw your art", "sub": "pixelhead.png 60 x 80 - virushead.png 60 x 60 - bubble.png 50 x 50", "bullets": [
     "Pixelhead and the virus facing RIGHT", "Exactly those names", "You can redraw them any week"]},
   {"title": "Give Pixelhead a picture", "bullets": [], "code": [(PLAYER_START, "look")]},
   {"title": "Pixelhead in Level1", "bullets": [], "code": [(LEVEL1_START, "player")]},
   {"title": "Go to Level1", "bullets": [], "code": [(GAME_START, "setup")]},
   {"title": "Checkpoint: Pixelhead is here", "checkpoint": True,
    "say": "Press Play. Pixelhead is up and to the right of the middle."},
   {"title": "Give the virus a picture", "bullets": [], "code": [(ENEMY_START, "look")]},
   {"title": "A virus, bottom left", "bullets": [], "code": [(LEVEL1_START, "enemies")]},
   {"title": "Give the bubble a picture", "bullets": [], "code": [(BUBBLE_START, "look")]},
   {"title": "Two bubbles", "bullets": [], "code": [(LEVEL1_START, "bubbles")]},
   {"title": "Checkpoint: four objects", "checkpoint": True,
    "say": "Press Play. Pixelhead up on the right, a virus bottom left, and a bubble near each bottom corner."},
 ],
},

# ---------------------------------------------------------------- week 2 ----
{
 "n": 2,
 "title": "Mountains, and a drift",
 "big_idea": "Start runs once; [[loop]] runs forever. Today the sky gets its mountains, the bubbles start to rise, and Pixelhead drifts at a speed kept in a [[variable]].",
 "new_concepts": ["draw order", "loop", "variable", "speed"],
 "draw": ["mountains.png"],
 "objectives": [
   "Explain why the background must be made first",
   "Say the difference between [[start]] and [[loop]]",
   "Read self.y = self.y + 1 out loud and say what it does",
   "Keep a number in a [[variable]] and use it every loop",
 ],
 "ops": [
  ADD(BACK_START, "look", [
    "self.image = sprite('mountains.png')",
  ]),
  ADD(LEVEL1_START, "back", [
    "self.background = Background()",
  ]),
  ADD(BUBBLE_LOOP, "rise", [
    "self.y = self.y + 1",
  ]),
  ADD(PLAYER_START, "speed", [
    "self.speed = 1",
  ]),
  ADD(PLAYER_LOOP, "drift", [
    "self.x = self.x + self.speed",
  ]),
 ],
 "flow": [
  TALK("0:00", "Draw the mountains",
       "<p>Make a class called <strong>Background</strong> and draw "
       "<code>mountains.png</code> at 1280 by 720 - the whole screen. Sky at the top, "
       "mountains along the bottom.</p>",
       ask=("If the background is made LAST, what will you see?",
            "Only the background - everything made before it is drawn underneath")),
  STEP(BACK_START, "look", "Give the background its picture",
       ["The background gets the mountains you drew."],
       at="0:10"),
  STEP(LEVEL1_START, "back", "Put up the mountains",
       ["At the VERY TOP of Level1 start, above Pixelhead: objects are drawn in the order "
        "they are made, like sheets of paper in a pile. Made first, it is the bottom sheet."],
       at="0:12"),
  TALK("0:15", "Start and loop",
       "<p>[[start]] runs once, when the object is made. [[loop]] runs again and again, about "
       "sixty times every second, until the object is gone.</p>",
       "<p>Read <code>self.y = self.y + 1</code> out loud: <em>my new y is my old y plus "
       "1</em>. Once is a tiny step; sixty times a second is floating.</p>",
       ask=("Which class should the code for rising go in?",
            "Bubble - it is how a bubble behaves")),
  STEP(BUBBLE_LOOP, "rise", "Bubbles rise",
       ["In Bubble LOOP: add 1 to y, every loop. Press Play and watch both bubbles float "
        "up and off the top."],
       at="0:20",
       ask=("What would you change to make them float sideways instead?",
            "x instead of y - self.x = self.x + 1")),
  STEP(PLAYER_START, "speed", "A speed for Pixelhead",
       ["A [[variable]] is a box that keeps a value. <code>self.speed</code> keeps 1, and "
        "<code>self.</code> makes it Pixelhead's, so loop can use it too."],
       at="0:26"),
  STEP(PLAYER_LOOP, "drift", "Drift",
       ["In Player LOOP: add the speed to x, every loop. Pixelhead drifts right, like a "
        "balloon in the wind - next week the arrows change the speed."],
       at="0:29",
       ask=("Why use self.speed instead of writing 1?",
            "The speed can change while the game runs - a 1 typed in the code cannot")),
  TALK("0:35", "Play with the numbers",
       "<p>Let them try a speed of 3 and of -1 in Player start. What does a minus speed "
       "do? Put it back to 1 before they leave.</p>"),
 ],
 "errors": [
   ("Only the mountains", "self.background = Background() must be the FIRST line of Level1 start, above Pixelhead."),
   ("NameError: name 'Background' is not defined", "The class must be called Background exactly - capital B."),
   ("Nothing moves", "The moving lines go in the LOOP tabs - Bubble loop and Player loop - not start."),
   ("AttributeError: speed", "self.speed = 1 goes in Player start, and is spelled the same in Player loop."),
 ],
 "recap": [
   "Objects are drawn in the order they are made: the background first.",
   "[[loop]] runs about sixty times a second.",
   "self.y = self.y + 1 means: my new y is my old y plus 1.",
   "A [[variable]] keeps a value, like the speed, for later.",
 ],
 "homework": [
   {"task": "Say it in English", "detail": "Write self.x = self.x + self.speed as an English sentence.", "done": "Something like: my new x is my old x plus my speed."},
   {"task": "A pile of paper", "detail": "Explain in one sentence why the background has to be made first.", "done": "Whatever is made first is drawn first, at the bottom of the pile."},
 ],
 "bonus": {"title": "A slow bubble",
           "body": "<p>Give the Bubble class its own speed: <code>self.speed = 1</code> in "
                   "Bubble start, and use it in Bubble loop. Then, in Level1 start, give "
                   "<code>self.bubble2.speed = 2</code>. One bubble now rises faster.</p>"},
 "slides": [
   {"title": "Draw the mountains", "sub": "mountains.png - 1280 x 720", "bullets": [
     "Make a class called Background", "The whole screen", "Sky above, mountains below"]},
   {"title": "Give the background its picture", "bullets": [], "code": [(BACK_START, "look")]},
   {"title": "Put up the mountains", "bullets": [], "code": [(LEVEL1_START, "back")]},
   {"title": "Checkpoint: the mountains", "checkpoint": True,
    "say": "Press Play. The mountains fill the screen, with Pixelhead, the virus and the bubbles on top."},
   {"title": "Start and loop", "sub": "Once, and over and over", "bullets": [
     "start runs once, when the object is made", "loop runs about 60 times a second",
     "Anything that moves lives in loop"]},
   {"title": "Bubbles rise", "bullets": [], "code": [(BUBBLE_LOOP, "rise")]},
   {"title": "A speed for Pixelhead", "bullets": [], "code": [(PLAYER_START, "speed")]},
   {"title": "Drift", "bullets": [], "code": [(PLAYER_LOOP, "drift")]},
   {"title": "Checkpoint: drifting", "checkpoint": True,
    "say": "Press Play. The bubbles float up and Pixelhead drifts slowly to the right."},
 ],
},

# ---------------------------------------------------------------- week 3 ----
{
 "n": 3,
 "title": "Steer",
 "big_idea": "Pixelhead does not walk - it builds up speed. Today each tap of an arrow changes the speed by one, Pixelhead turns to face the way you tapped, and the console tells you the speed.",
 "new_concepts": ["if", "key_was_pressed()", "scaleX", "print()", "str()"],
 "draw": [],
 "objectives": [
   "Use [[if]] and [[key_was_pressed]] to act once per tap",
   "Change a variable by adding to it or taking away from it",
   "Flip a picture with a minus [[scaleX|scale]]",
   "Write a message to the console with [[print]] and [[str]]",
 ],
 "ops": [
  ADD(PLAYER_LOOP, "steer", [
    "if key_was_pressed('arrowRight'):",
    "    self.speed = self.speed + 1",
    "    self.scaleX = 1",
    "    print('Speed: ' + str(self.speed))",
    "if key_was_pressed('arrowLeft'):",
    "    self.speed = self.speed - 1",
    "    self.scaleX = -1",
    "    print('Speed: ' + str(self.speed))",
  ]),
 ],
 "flow": [
  TALK("0:00", "Act it out",
       "<p>Have everyone make up an [[if]] and act it out: <em>if you are wearing shoes, "
       "stand up</em>. An if has a question, and something to do only when the answer is "
       "yes.</p>",
       ask=("What should make Pixelhead go faster to the right?",
            "Pressing the right arrow - then the speed goes up by one")),
  TALK("0:08", "One tap, one change",
       "<p>[[key_was_pressed]] is True for only the one loop the key goes down. Hold the "
       "key and it is still one tap. Each tap changes the speed by one - so Pixelhead "
       "speeds up and slows down like something floating, not walking.</p>"),
  STEP(PLAYER_LOOP, "steer", "Steer with the arrows",
       ["At the bottom of Player LOOP: each tap of right adds 1 to the speed and faces "
        "right. [[print]] writes the new speed in the console under the game, and [[str]]() "
        "turns the number into words so + can join them.",
        "Left takes 1 away. <code>scaleX = -1</code> flips the right-facing picture like a "
        "mirror. Click the game, then tap the arrows."],
       at="0:12",
       ask=("The speed is 3. You tap left once. Which way are you going?",
            "Still right, more slowly - the speed is 2. Two more taps to start going left")),
  TALK("0:30", "Read the console",
       "<p>Make sure every student can see the console. Tap left until it says a minus "
       "number: a minus speed takes away from x, so Pixelhead floats left.</p>",
       ask=("Why does print need str(self.speed)?",
            "+ cannot join words and a number - str turns the number into words")),
  TALK("0:38", "How wide is the sky?",
       "<p>Steer Pixelhead to each edge. The screen goes from about -640 on the left to 640 "
       "on the right. Past that, Pixelhead is still there - just off the screen.</p>"),
 ],
 "errors": [
   ("IndentationError", "The lines under an if start with exactly four spaces, and the if line ends with a colon."),
   ("Pixelhead does not change speed", "Click on the game first so it hears the keys, and check the code is in Player loop."),
   ("TypeError when you tap", "print needs str(self.speed). 'Speed: ' + self.speed tries to join words to a number."),
   ("Pixelhead faces the wrong way", "scaleX = 1 goes under right and scaleX = -1 under left - and the picture must be drawn facing right."),
 ],
 "recap": [
   "The lines under an [[if]] run only when its question is true.",
   "[[key_was_pressed]] is True for one loop only - one tap, one change.",
   "scaleX = -1 flips a picture; scaleX = 1 is the way you drew it.",
   "[[print]] writes to the console; [[str]] turns a number into words.",
 ],
 "homework": [
   {"task": "Trace the speed", "detail": "Pixelhead's speed is 1. You tap right, right, left, left, left. What does the console say after each tap?", "done": "Speed: 2, 3, 2, 1, 0."},
   {"task": "Say it in English", "detail": "Write if key_was_pressed('arrowLeft'): self.speed = self.speed - 1 as an English sentence.", "done": "Something like: each time left is tapped, my speed goes down by one."},
 ],
 "bonus": {"title": "Wrap around",
           "body": "<p>At the bottom of Player loop, add <code>if self.x &gt; 640:</code> "
                   "with <code>self.x = -640</code> pushed in under it. Pixelhead now comes "
                   "back on the left. Can you do the left side too?</p>"},
 "slides": [
   {"title": "if means only when", "sub": "Act it out", "bullets": [
     "If you are wearing shoes, stand up", "A question, and what to do when it is yes",
     "One tap changes the speed by one"]},
   {"title": "Steer with the arrows", "bullets": [], "code": [(PLAYER_LOOP, "steer")]},
   {"title": "Checkpoint: steer", "checkpoint": True,
    "say": "Press Play, click the game and tap the arrows. Pixelhead speeds up, slows down and turns round, and the console shows the speed."},
 ],
},

# ---------------------------------------------------------------- week 4 ----
{
 "n": 4,
 "title": "Up and down",
 "big_idea": "Today a virus patrols up and down. It remembers which way it is going in a variable that holds words, and changes it when it reaches the top or the bottom - using &lt; and &gt;.",
 "new_concepts": ["&lt; and &gt;", "==", "words in quotes"],
 "draw": [],
 "objectives": [
   "Compare numbers with &lt; and &gt;",
   "Keep words in a [[variable]], like 'up'",
   "Ask whether two things are equal with ==",
   "Make a second object from the same class",
 ],
 "ops": [
  ADD(ENEMY_START, "directions", [
    "self.verticalDirection = 'up'",
  ]),
  ADD(ENEMY_LOOP, "updown", [
    "if self.verticalDirection == 'up':",
    "    self.y = self.y + 1",
    "if self.verticalDirection == 'down':",
    "    self.y = self.y - 1",
  ]),
  ADD(ENEMY_LOOP, "turnY", [
    "if self.y > 300:",
    "    self.verticalDirection = 'down'",
    "if self.y < -300:",
    "    self.verticalDirection = 'up'",
  ]),
  ADD(LEVEL1_START, "enemies", [
    "self.enemy2 = Enemy()",
    "self.enemy2.x = 300",
    "self.enemy2.y = 0",
  ]),
 ],
 "flow": [
  TALK("0:00", "Bigger and smaller",
       "<p>Put pairs on the board and have the class fill in &lt; or &gt;: 8 __ 13, -2 __ "
       "-9, 0 __ -300. Use a number line for the minus numbers.</p>",
       "<p>Then: <em>if the number of pets you have &gt; 0, make an animal sound.</em></p>",
       ask=("Is -300 bigger or smaller than -200?",
            "Smaller - it is further down the number line")),
  STEP(ENEMY_START, "directions", "Which way am I going?",
       ["A [[variable]] can hold words in quotes as well as numbers. Each virus starts "
        "out going up."],
       at="0:10"),
  STEP(ENEMY_LOOP, "updown", "Move the way you are going",
       ["In Enemy LOOP: <code>==</code> asks whether two things are equal. Going up, add 1 "
        "to y; going down, take 1 away. Press Play and watch."],
       at="0:13",
       ask=("The virus flies up and off the top. Why does it never come down?",
            "Nothing ever changes verticalDirection to 'down'")),
  STEP(ENEMY_LOOP, "turnY", "Turn at the top and bottom",
       ["Under the moving lines: above 300, start going down. Below -300, start going up. "
        "One = stores a value; two == asks a question."],
       at="0:20",
       ask=("Why 300 and not 360, the very top?",
            "The virus turns while all of it is still on the screen")),
  STEP(LEVEL1_START, "enemies", "A second virus",
       ["Under the first virus in Level1 start: a second one, on the right. Same class, "
        "its own name, its own place."],
       at="0:30"),
  TALK("0:34", "Read it like a story",
       "<p>Have a student read the Enemy loop out loud, top to bottom, as if they were the "
       "virus: <em>if I am going up, I move up. If I am above 300, I go down now.</em></p>"),
 ],
 "errors": [
   ("SyntaxError on the if line", "Asking needs two equals signs: == 'up'. One = is for storing."),
   ("The virus never moves", "'up' in Enemy start and 'up' in Enemy loop must be spelled exactly the same, in quotes."),
   ("The virus flies off and never turns", "The turn lines go in Enemy loop: above 300 means going DOWN next."),
   ("Only one virus", "The second one needs its own name: self.enemy2."),
 ],
 "recap": [
   "&lt; is less than, &gt; is greater than.",
   "A [[variable]] can hold words in quotes, like 'up'.",
   "== asks whether two things are equal; = stores a value.",
   "Each virus remembers its own direction.",
 ],
 "homework": [
   {"task": "Fill in the sign", "detail": "Write &lt; or &gt; between each pair: 5 and -5, -100 and -10, 300 and 299.", "done": "5 &gt; -5, -100 &lt; -10, 300 &gt; 299."},
   {"task": "Where next?", "detail": "A virus is at y 301 going up. What happens in its next loop, line by line?", "done": "It moves up to 302, then sees it is above 300 and changes to going down."},
 ],
 "bonus": {"title": "A faster virus",
           "body": "<p>Change the 1s in Enemy loop to 2s. Then try giving the virus a "
                   "<code>self.speed</code> in Enemy start, like Pixelhead's, and use it "
                   "instead.</p>"},
 "slides": [
   {"title": "Bigger and smaller", "sub": "&lt; and &gt;", "bullets": [
     "8 &lt; 13", "-2 &gt; -9", "Further left on the number line is smaller"]},
   {"title": "Which way am I going?", "bullets": [], "code": [(ENEMY_START, "directions")]},
   {"title": "Move the way you are going", "bullets": [], "code": [(ENEMY_LOOP, "updown")]},
   {"title": "Checkpoint: up and away", "checkpoint": True,
    "say": "Press Play. The virus flies up and off the top of the screen. Ask why it never comes down."},
   {"title": "Turn at the top and bottom", "bullets": [], "code": [(ENEMY_LOOP, "turnY")]},
   {"title": "A second virus", "bullets": [], "code": [(LEVEL1_START, "enemies")]},
   {"title": "Checkpoint: patrol", "checkpoint": True,
    "say": "Press Play. Two viruses patrol up and down, turning at the top and the bottom."},
 ],
},

# ---------------------------------------------------------------- week 5 ----
{
 "n": 5,
 "title": "Side to side",
 "big_idea": "Today you build the sideways patrol yourself from the pattern you made last week - a direction, a move for each one, and a turn at each edge - and the virus faces the way it flies.",
 "new_concepts": ["a pattern, again"],
 "draw": [],
 "objectives": [
   "Plan code in plain English before typing it",
   "Build left and right from the up and down pattern",
   "Flip a virus to face the way it moves",
   "Read a loop and predict where an object will go",
 ],
 "ops": [
  ADD(ENEMY_START, "directions", [
    "self.horizontalDirection = 'right'",
  ]),
  ADD(ENEMY_LOOP, "sideways", [
    "if self.horizontalDirection == 'right':",
    "    self.x = self.x + 1",
    "    self.scaleX = 1",
    "if self.horizontalDirection == 'left':",
    "    self.x = self.x - 1",
    "    self.scaleX = -1",
  ]),
  ADD(ENEMY_LOOP, "turnX", [
    "if self.x > 625:",
    "    self.horizontalDirection = 'left'",
    "if self.x < -625:",
    "    self.horizontalDirection = 'right'",
  ]),
 ],
 "flow": [
  TALK("0:00", "Plan it in English",
       "<p>Brainstorm on the board, in plain English, what left-and-right needs. The class "
       "should arrive at three things: <em>a variable for the direction; an if that moves "
       "for each direction; an if at each edge that changes the direction.</em></p>",
       ask=("Which part of last week's code is the pattern for each of those?",
            "verticalDirection, the two move ifs, and the two turn ifs")),
  TALK("0:08", "Try it first",
       "<p>Give them ten minutes to write it from the plan without the slides. Help with "
       "the errors - colons, == and quotes. Then type along to check.</p>"),
  STEP(ENEMY_START, "directions", "Which way sideways?",
       ["Under verticalDirection: a second direction. Each virus starts going right."],
       at="0:18"),
  STEP(ENEMY_LOOP, "sideways", "Move sideways",
       ["Just above <code>if self.y &gt; 300:</code> - with the other moves: going right, "
        "add 1 to x and face right. Going left, take 1 away and flip the picture with "
        "<code>scaleX = -1</code>."],
       at="0:21",
       ask=("Why does scaleX go with the move, not with the turn?",
            "Either works - here the virus faces the way it is moving, every loop")),
  STEP(ENEMY_LOOP, "turnX", "Turn at the sides",
       ["At the bottom of Enemy loop: past 625 on the right, go left; past -625, go right. "
        "Press Play and wait."],
       at="0:28",
       ask=("Up-and-down and side-to-side both happen every loop. What path does the virus fly?",
            "Diagonally, bouncing off all four sides")),
  TALK("0:36", "Watch them bounce",
       "<p>Let the game run. The viruses bounce diagonally round the sky, like a screen "
       "saver. Ask what would happen if one virus started going 'left' instead.</p>"),
 ],
 "errors": [
   ("The virus slides off the side", "The turn lines check self.x, not self.y, and go at the bottom of Enemy loop."),
   ("The virus faces backwards", "Draw virushead.png facing RIGHT: scaleX = 1 is right, -1 is left."),
   ("NameError: horizontalDirection", "self.horizontalDirection = 'right' goes in Enemy start, spelled the same everywhere - capital D."),
   ("IndentationError", "Every line under an if is pushed in four spaces, and every if line ends with a colon."),
 ],
 "recap": [
   "Plan in plain English first; the code follows the plan.",
   "Left and right is the same pattern as up and down.",
   "Both happen every loop, so the virus flies diagonally.",
   "scaleX flips the virus to face the way it moves.",
 ],
 "homework": [
   {"task": "The three parts", "detail": "Write the three parts of a patrol in plain English, without any code.", "done": "A direction variable; a move for each direction; a turn at each edge."},
   {"task": "Which way?", "detail": "A virus is at x 626, going right and up. Which two directions does it have after its next loop?", "done": "Left and up - it turned at the side, and is still going up."},
 ],
 "bonus": {"title": "A virus that starts the other way",
           "body": "<p>In Level1 start, under enemy2's lines, add "
                   "<code>self.enemy2.horizontalDirection = 'left'</code>. Why does that "
                   "work? (The room runs after the virus's own start.)</p>"},
 "slides": [
   {"title": "Plan it in English", "sub": "Three parts", "bullets": [
     "A variable for the direction", "A move for each direction", "A turn at each edge"]},
   {"title": "Which way sideways?", "bullets": [], "code": [(ENEMY_START, "directions")]},
   {"title": "Move sideways", "bullets": [], "code": [(ENEMY_LOOP, "sideways")]},
   {"title": "Checkpoint: off the side", "checkpoint": True,
    "say": "Press Play. The viruses fly diagonally - and slide off the right side. Ask what is missing."},
   {"title": "Turn at the sides", "bullets": [], "code": [(ENEMY_LOOP, "turnX")]},
   {"title": "Checkpoint: bounce", "checkpoint": True,
    "say": "Press Play. Both viruses bounce round the sky, facing the way they fly."},
 ],
},

# ---------------------------------------------------------------- week 6 ----
{
 "n": 6,
 "title": "Three balloons",
 "big_idea": "Pixelhead gets three balloons. Pixelhead makes them in its own start, keeps a name for each, and moves them to sit above its head every loop - one object steering three others with the [[dot]].",
 "new_concepts": ["objects making objects", "angle", "z"],
 "draw": ["balloon.png"],
 "objectives": [
   "Make objects from inside another object's start",
   "Use the [[dot]] to move another object every loop",
   "Turn a picture with [[angle]]",
   "Bring an object to the front with [[z]]",
 ],
 "ops": [
  ADD(BALLOON_START, "look", [
    "self.image = sprite('balloon.png')",
  ]),
  ADD(PLAYER_START, "balloons", [
    "self.b1 = Balloon()",
    "self.b2 = Balloon()",
    "self.b2.angle = -30",
    "self.b3 = Balloon()",
    "self.b3.angle = 30",
  ]),
  ADD(PLAYER_LOOP, "follow", [
    "self.b1.x = self.x",
    "self.b1.y = self.y + 80",
    "self.b2.x = self.x + 30",
    "self.b2.y = self.y + 80",
    "self.b3.x = self.x - 30",
    "self.b3.y = self.y + 80",
  ]),
  ADD(PLAYER_START, "front", [
    "self.z = 2",
  ]),
 ],
 "flow": [
  TALK("0:00", "Draw a balloon",
       "<p>Make a class called <strong>Balloon</strong> and draw <code>balloon.png</code> at "
       "40 by 100: the balloon at the top, its string hanging down to the bottom edge.</p>",
       ask=("Which class should make the balloons - Level1 or Player?",
            "Player - the balloons belong to Pixelhead, in every level it is in")),
  STEP(BALLOON_START, "look", "Give the balloon a picture",
       ["The balloon gets the picture you drew."],
       at="0:10"),
  STEP(PLAYER_START, "balloons", "Three balloons",
       ["At the bottom of Player start: build three balloons and keep a name for each. "
        "[[angle]] turns a picture - b2 leans one way and b3 the other. Press Play."],
       at="0:12",
       ask=("Where are the balloons, and why there?",
            "In the middle of the screen - nobody has said where, so they start at 0, 0")),
  TALK("0:18", "Follow me",
       "<p>Pixelhead knows where it is: <code>self.x</code>. It knows its first balloon: "
       "<code>self.b1</code>. So <code>self.b1.x = self.x</code> puts the balloon's x on "
       "Pixelhead's - every loop, wherever it drifts.</p>",
       ask=("Start or loop - and why?",
            "Loop - Pixelhead keeps moving, so the balloons have to keep following")),
  STEP(PLAYER_LOOP, "follow", "Balloons follow Pixelhead",
       ["Under the steering in Player LOOP: b1 straight above, 80 up. b2 30 to the right "
        "and b3 30 to the left, so the three do not sit on top of each other."],
       at="0:22"),
  STEP(PLAYER_START, "front", "Pixelhead in front",
       ["At the bottom of Player start: the balloons were made after Pixelhead, so their "
        "strings are drawn over its head. A bigger [[z]] is drawn in front, whenever it was "
        "made."],
       at="0:30",
       ask=("Why does Pixelhead need a z, but the background never did?",
            "The background was made first; the balloons are made after Pixelhead")),
  TALK("0:34", "Find the look",
       "<p>Let them try other angles and other offsets - 40 instead of 30, 90 instead of 80 - "
       "until it looks right. Keep the three names.</p>"),
 ],
 "errors": [
   ("NameError: name 'Balloon' is not defined", "The class must be called Balloon exactly - capital B."),
   ("The balloons stay in the middle", "The follow lines go in Player LOOP, not start, and each starts with self.b1, self.b2 or self.b3."),
   ("All three balloons in one place", "b2 is self.x + 30 and b3 is self.x - 30 - check the plus and the minus."),
   ("AttributeError: b1", "self.b1 = Balloon() must be in Player start, spelled the same as in loop."),
 ],
 "recap": [
   "An object can make other objects in its own start.",
   "self.b1.x = self.x moves another object to where I am.",
   "[[angle]] turns a picture, in degrees.",
   "A bigger [[z]] is drawn in front.",
 ],
 "homework": [
   {"task": "Where is b2?", "detail": "Pixelhead is at x 100, y -50. Where is balloon b2?", "done": "x 130, y 30."},
   {"task": "Who made it?", "detail": "Explain why the balloons are made in Player start and not in Level1 start.", "done": "They belong to Pixelhead and should come with it into every level."},
 ],
 "bonus": {"title": "A bobbing balloon",
           "body": "<p>Give b1 a different height from the others: 90 instead of 80. Then try "
                   "<code>self.b1.angle = self.speed * 5</code> in Player loop - the balloon "
                   "leans as you speed up.</p>"},
 "slides": [
   {"title": "Draw a balloon", "sub": "balloon.png - 40 x 100", "bullets": [
     "Make a class called Balloon", "The balloon at the top", "The string to the bottom edge"]},
   {"title": "Give the balloon a picture", "bullets": [], "code": [(BALLOON_START, "look")]},
   {"title": "Three balloons", "bullets": [], "code": [(PLAYER_START, "balloons")]},
   {"title": "Checkpoint: where are they?", "checkpoint": True,
    "say": "Press Play. Three balloons in the middle of the screen, and Pixelhead drifting away. Ask why."},
   {"title": "Follow me", "sub": "self.b1.x = self.x", "bullets": [
     "self.x is where Pixelhead is", "self.b1 is its first balloon", "Every loop, so it keeps following"]},
   {"title": "Balloons follow Pixelhead", "bullets": [], "code": [(PLAYER_LOOP, "follow")]},
   {"title": "Pixelhead in front", "bullets": [], "code": [(PLAYER_START, "front")]},
   {"title": "Checkpoint: three balloons", "checkpoint": True,
    "say": "Press Play and steer. Three balloons float above Pixelhead wherever it goes, with its head in front of the strings."},
 ],
},

# ---------------------------------------------------------------- week 7 ----
{
 "n": 7,
 "title": "Stomp or pop",
 "big_idea": "Today things touch. Land on a virus from above and it is gone; touch one from below and Pixelhead is gone - an [[if]] inside an if, with [[else]] for the other way. And bubbles pop.",
 "new_concepts": ["get_collision()", "destroy()", "else", "an if inside an if"],
 "draw": [],
 "objectives": [
   "Use [[get_collision]] to find out what Pixelhead is touching",
   "Remove an object with [[destroy]]",
   "Decide between two things with [[if]] and [[else]]",
   "Read an if inside an if from its indentation",
 ],
 "ops": [
  ADD(PLAYER_LOOP, "enemy", [
    "enemyHit = get_collision(self, 'Enemy')",
    "if enemyHit:",
    "    if self.y > enemyHit.y:",
    "        destroy(enemyHit)",
    "    else:",
    "        destroy(self.b1)",
    "        destroy(self.b2)",
    "        destroy(self.b3)",
    "        destroy(self)",
  ]),
  ADD(PLAYER_LOOP, "bubble", [
    "bubbleHit = get_collision(self, 'Bubble')",
    "if bubbleHit:",
    "    destroy(bubbleHit)",
  ]),
 ],
 "flow": [
  TALK("0:00", "What is a collision?",
       "<p>Clap your hands: they collide. In the game, two objects collide when their "
       "pictures' boxes overlap - the see-through corners count too.</p>",
       "<p>[[get_collision]]<code>(self, 'Enemy')</code> answers with the virus Pixelhead is "
       "touching, or False if there is none.</p>",
       ask=("Which class should check for touching a virus - Player or Enemy?",
            "Player - what happens next is up to Pixelhead")),
  TALK("0:06", "Draw the decision",
       "<p>On the board, draw the tree. <em>Touching a virus?</em> No: carry on. Yes: "
       "<em>am I higher than it?</em> Yes: the virus is gone. No: Pixelhead and all three "
       "balloons are gone.</p>",
       "<p>Point at the shape: the second question is inside the first one's yes. In code, "
       "that is an if inside an if, pushed in further. [[else]] is the second question's "
       "no.</p>",
       ask=("How does Pixelhead know which of the two is higher?",
            "Compare the y's - self.y and the virus's y, enemyHit.y")),
  STEP(PLAYER_LOOP, "enemy", "Stomp or pop",
       ["At the bottom of Player LOOP: <code>enemyHit</code> is the virus you touch, or "
        "False. Touching one, ask whether you are higher - <code>enemyHit.y</code> is the "
        "virus's y. Higher, you [[destroy]] the virus.",
        "<code>else:</code> lines up with the inner if: not higher, you lose. Each "
        "balloon goes, then Pixelhead itself - <code>self</code> is the object whose code is "
        "running."],
       at="0:14",
       ask=("Why destroy the balloons too?",
            "They are objects of their own - destroying Pixelhead leaves them floating")),
  TALK("0:26", "Try it",
       "<p>Pixelhead cannot go up or down yet, so let the viruses come to it. A virus "
       "rising into Pixelhead from below is lower - Pixelhead wins. One coming down onto "
       "it is higher - Pixelhead loses.</p>"),
  STEP(PLAYER_LOOP, "bubble", "Pop the bubbles",
       ["Under the virus check: the same pattern for bubbles. Touch one, and it is gone. "
        "Next week a bubble will lift you."],
       at="0:32",
       ask=("Why is it enemyHit and not self.enemyHit?",
            "It is only needed right here, this loop - a name without self. lives only in this loop")),
 ],
 "errors": [
   ("Pixelhead disappears but the balloons stay", "All four destroy lines go under the else, pushed in eight spaces."),
   ("NameError: name 'enemyHit' is not defined", "The name must be spelled the same everywhere: enemyHit, capital H."),
   ("SyntaxError at else", "else: lines up with the if above it, ends with a colon, and has nothing else on its line."),
   ("Nothing happens when you touch", "The class names in quotes must match exactly: 'Enemy' and 'Bubble'."),
 ],
 "recap": [
   "[[get_collision]] gives back the thing you touch, or False.",
   "[[destroy]] takes an object out of the game.",
   "[[else]] runs when its if's question is not true.",
   "An if inside an if is pushed in further - you can see the decision in the shape.",
 ],
 "homework": [
   {"task": "Draw the tree", "detail": "Draw the stomp-or-pop decision as a tree with two questions and three endings.", "done": "Touching? No - carry on. Yes - higher? Yes - virus gone. No - Pixelhead gone."},
   {"task": "Who wins?", "detail": "Pixelhead is at y 100 and touches a virus at y 140. Which lines run?", "done": "The else lines - 100 is not higher than 140, so Pixelhead and its balloons are destroyed."},
 ],
 "bonus": {"title": "Say it",
           "body": "<p>Add a <code>print</code> under each ending - one when you stomp a virus "
                   "and one when you lose. Which line does each go under, and how far pushed "
                   "in?</p>"},
 "slides": [
   {"title": "What is a collision?", "sub": "Two boxes overlap", "bullets": [
     "Clap: your hands collide", "The see-through corners count",
     "get_collision gives back what you touch, or False"]},
   {"title": "Draw the decision", "sub": "An if inside an if", "bullets": [
     "Touching a virus? No: carry on", "Yes - am I higher? Yes: the virus is gone",
     "No: Pixelhead is gone"]},
   {"title": "Stomp or pop", "bullets": [], "code": [(PLAYER_LOOP, "enemy")]},
   {"title": "Checkpoint: stomp or pop", "checkpoint": True,
    "say": "Press Play and wait for a virus to reach Pixelhead. From below, the virus goes. From above, Pixelhead and its balloons go."},
   {"title": "Pop the bubbles", "bullets": [], "code": [(PLAYER_LOOP, "bubble")]},
   {"title": "Checkpoint: pop", "checkpoint": True,
    "say": "Press Play and steer into a rising bubble. It pops."},
 ],
},

# ---------------------------------------------------------------- week 8 ----
{
 "n": 8,
 "title": "A bubble machine",
 "big_idea": "Two bubbles are not a game. Today an invisible Spawner makes a new bubble every two seconds with a [[timer]], and each one starts somewhere [[random]] along the bottom.",
 "new_concepts": ["visible", "timer", "import", "random.randint()"],
 "draw": [],
 "objectives": [
   "Hide an object with [[visible]]",
   "Count loops with a [[timer]] and act when it is big enough",
   "Bring in a toolbox with [[import]]",
   "Pick a random number with [[random.randint()|random]]",
 ],
 "ops": [
  ADD(LEVEL1_START, "spawner", [
    "self.spawner = Spawner()",
  ]),
  ADD(SPAWNER_START, "setup", [
    "self.visible = False",
    "self.timer = 0",
  ]),
  ADD(SPAWNER_LOOP, "spawn", [
    "self.timer = self.timer + 1",
    "if self.timer > 120:",
    "    Bubble()",
    "    self.timer = 0",
  ]),
  ADD(BUBBLE_START, "import", [
    "import random",
  ]),
  ADD(BUBBLE_START, "place", [
    "self.x = random.randint(-600, 600)",
    "self.y = -400",
  ]),
 ],
 "flow": [
  TALK("0:00", "A machine that makes bubbles",
       "<p>Typing a line for every bubble would never end. Instead, one object makes them: "
       "a <strong>Spawner</strong>. Make the class - it needs no picture.</p>",
       ask=("How could the spawner know when two seconds have passed?",
            "Count the loops - 60 a second, so 120 is two seconds")),
  STEP(LEVEL1_START, "spawner", "Build the spawner",
       ["At the bottom of Level1 start: one spawner. It has no code yet."],
       at="0:06"),
  STEP(SPAWNER_START, "setup", "Hidden, with a timer",
       ["In Spawner start: [[visible]] False means it is never drawn, even as an empty "
        "box. The [[timer]] starts at 0."],
       at="0:08"),
  STEP(SPAWNER_LOOP, "spawn", "Make a bubble every two seconds",
       ["In Spawner LOOP: count up by one every loop. Past 120, make a bubble with "
        "<code>Bubble()</code> - no name needed, the spawner never talks to it again - and "
        "start counting from 0."],
       at="0:12",
       ask=("Without self.timer = 0, what would happen?",
            "The timer stays above 120, so it makes a bubble EVERY loop - a flood")),
  TALK("0:20", "Every bubble in one place",
       "<p>Press Play. A bubble every two seconds - all from the middle. The bubble should "
       "pick its own place when it is made: in its start.</p>",
       "<p>[[import]] <code>random</code> brings in Python's random number toolbox. "
       "<code>random.randint(-600, 600)</code> picks a whole number from -600 to 600.</p>"),
  STEP(BUBBLE_START, "import", "Bring in random",
       ["The VERY TOP of Bubble start, above the picture: bring in the toolbox before "
        "anything uses it."],
       at="0:25"),
  STEP(BUBBLE_START, "place", "Start somewhere along the bottom",
       ["At the bottom of Bubble start: anywhere across the screen, and just below the "
        "bottom edge, so it floats up into view."],
       at="0:27",
       ask=("Your two bubbles from week 1 still start where Level1 put them. Why?",
            "Level1 sets their x and y AFTER the bubble's own start has run")),
  TALK("0:35", "Tune the machine",
       "<p>Let them try 60 and 240 instead of 120. Which is more fun? Agree on a number.</p>"),
 ],
 "errors": [
   ("NameError: name 'random' is not defined", "import random goes at the very top of Bubble start."),
   ("Hundreds of bubbles", "self.timer = 0 must be pushed in under the if, with Bubble()."),
   ("No bubbles at all", "Check self.timer = self.timer + 1 is in Spawner LOOP, and the spawner is made in Level1 start."),
   ("NameError: name 'Spawner' is not defined", "The class must be called Spawner exactly - capital S."),
 ],
 "recap": [
   "[[visible]] False hides an object.",
   "A [[timer]] counts loops; 60 loops is one second.",
   "[[import]] random brings in the random toolbox, at the very top.",
   "random.randint(-600, 600) picks a different number each time.",
 ],
 "homework": [
   {"task": "Which numbers?", "detail": "Write every number random.randint(-2, 3) could pick.", "done": "-2, -1, 0, 1, 2, 3 - both ends included."},
   {"task": "Why reset?", "detail": "Explain in one sentence why the timer goes back to 0.", "done": "Otherwise it stays above 120 and makes a bubble every loop."},
 ],
 "bonus": {"title": "Tidy up",
           "body": "<p>Bubbles that float off the top are still there, forever. In Bubble "
                   "loop, add <code>if self.y &gt; 400:</code> with "
                   "<code>destroy(self)</code> pushed in under it.</p>"},
 "slides": [
   {"title": "A machine that makes bubbles", "sub": "One object makes all the others", "bullets": [
     "Make a class called Spawner", "No picture needed", "60 loops is one second"]},
   {"title": "Build the spawner", "bullets": [], "code": [(LEVEL1_START, "spawner")]},
   {"title": "Hidden, with a timer", "bullets": [], "code": [(SPAWNER_START, "setup")]},
   {"title": "Make a bubble every two seconds", "bullets": [], "code": [(SPAWNER_LOOP, "spawn")]},
   {"title": "Checkpoint: the machine runs", "checkpoint": True,
    "say": "Press Play. Every two seconds a bubble appears in the middle and floats up."},
   {"title": "Random numbers", "sub": "import random", "bullets": [
     "import brings in a toolbox", "random.randint(-600, 600) picks a number",
     "A different one each time"]},
   {"title": "Bring in random", "bullets": [], "code": [(BUBBLE_START, "import")]},
   {"title": "Start somewhere along the bottom", "bullets": [], "code": [(BUBBLE_START, "place")]},
   {"title": "Checkpoint: bubbles everywhere", "checkpoint": True,
    "say": "Press Play. Every two seconds a bubble floats up from somewhere new along the bottom."},
 ],
},

# ---------------------------------------------------------------- week 9 ----
{
 "n": 9,
 "title": "Level 2",
 "big_idea": "Clear the sky and you go to level 2. To know when the sky is clear, the [[game]] counts the viruses - in the Game class, the one object that lasts through every room.",
 "new_concepts": ["game.", "a count", "a second room"],
 "draw": ["night.png"],
 "objectives": [
   "Keep a number in the Game class and reach it with [[game]]",
   "Count up when something is made and down when it is destroyed",
   "Change rooms when a count reaches 0",
   "Build a second room with the same classes",
 ],
 "ops": [
  ADD(GAME_START, "counts", [
    "self.enemiesNumber = 0",
  ]),
  ADD(ENEMY_START, "count", [
    "game.enemiesNumber = game.enemiesNumber + 1",
  ]),
  SET(PLAYER_LOOP, "enemy", [
    "enemyHit = get_collision(self, 'Enemy')",
    "if enemyHit:",
    "    if self.y > enemyHit.y:",
    "        destroy(enemyHit)",
    "        game.enemiesNumber = game.enemiesNumber - 1",
    "        print('Enemies left: ' + str(game.enemiesNumber))",
    "    else:",
    "        destroy(self.b1)",
    "        destroy(self.b2)",
    "        destroy(self.b3)",
    "        destroy(self)",
  ]),
  ADD(LEVEL1_LOOP, "next", [
    "if game.enemiesNumber == 0:",
    "    set_room('Level2')",
  ]),
  ADD(LEVEL2_START, "back", [
    "self.background = Background()",
    "self.background.image = sprite('night.png')",
  ]),
  ADD(LEVEL2_START, "things", [
    "self.player = Player()",
    "self.spawner = Spawner()",
  ]),
 ],
 "flow": [
  TALK("0:00", "When is the sky clear?",
       "<p>Make a room called <strong>Level2</strong>. When should the game go there? When "
       "every virus is gone. But no virus knows how many others there are.</p>",
       "<p>The Game class is made once, before any room, and lasts the whole game. Inside "
       "Game it is <code>self</code>; from any other class it is [[game]].</p>",
       ask=("Why keep the count in Game and not in Level1?",
            "Level1 is removed when the room changes - Game lasts the whole game")),
  STEP(GAME_START, "counts", "Start counting at 0",
       ["Just above <code>set_room</code> in Game start: the count must exist before the "
        "room makes the viruses that add to it."],
       at="0:08"),
  STEP(ENEMY_START, "count", "Each virus counts itself",
       ["At the bottom of Enemy start: every virus adds one to the count as it is made. "
        "<code>game.</code> reaches the Game's number from inside an Enemy."],
       at="0:11"),
  STEP(PLAYER_LOOP, "enemy", "Count down on a stomp",
       ["The first three lines do not change.",
        "Under <code>destroy(enemyHit)</code>: one fewer virus, and the console says how "
        "many are left. The else lines do not change."],
       at="0:14",
       ask=("Two viruses. You stomp one. What does the console say?",
            "Enemies left: 1")),
  STEP(LEVEL1_LOOP, "next", "Level 2 when they are gone",
       ["In Level1's LOOP: once the count is 0, change to Level2. Stomp both viruses - the "
        "screen goes empty, because Level2 has nothing in it yet."],
       at="0:22"),
  TALK("0:26", "Draw the night sky",
       "<p>Draw <code>night.png</code> at 1280 by 720 - the same sky, later. Level 2 uses "
       "the Background class with a different picture.</p>"),
  STEP(LEVEL2_START, "back", "A night sky",
       ["In Level2 start: a background first, then the [[dot]] swaps its picture for the "
        "night sky."],
       at="0:32"),
  STEP(LEVEL2_START, "things", "Pixelhead and the bubble machine",
       ["Under the background: a new Pixelhead, who makes its own three balloons, and a "
        "spawner. No viruses yet - in week 12 they place themselves."],
       at="0:35",
       ask=("Is this the same Pixelhead as in Level1?",
            "No - Level1's was removed with the room; this is a new one, built fresh")),
 ],
 "errors": [
   ("AttributeError: enemiesNumber", "self.enemiesNumber = 0 must be in Game start ABOVE set_room('Level1')."),
   ("NameError: name 'Level2' is not defined", "Make the room in the editor and call it Level2 exactly."),
   ("The level never changes", "Enemies left must reach 0: check the count goes up with + 1 in Enemy start and down with - 1 in Player loop."),
   ("Level 2 is all night sky and nothing else", "The background must be the first line of Level2 start."),
 ],
 "recap": [
   "The Game class lasts the whole game; [[game]] reaches it from anywhere.",
   "Count up when a virus is made, down when it is stomped.",
   "When the count is 0, set_room changes level.",
   "A new room builds new objects - a new Pixelhead, too.",
 ],
 "homework": [
   {"task": "Count it", "detail": "Level1 makes three viruses. You stomp two. What is game.enemiesNumber, and which room are you in?", "done": "1, still Level1."},
   {"task": "self or game", "detail": "Explain why Enemy start writes game.enemiesNumber, but Game start writes self.enemiesNumber.", "done": "Inside Game, the Game is self; from any other class it is game."},
 ],
 "bonus": {"title": "A third virus",
           "body": "<p>Add <code>self.enemy3</code> to Level1 start, somewhere new. You change "
                   "nothing else - the count takes care of itself. Why?</p>"},
 "slides": [
   {"title": "When is the sky clear?", "sub": "The Game class counts", "bullets": [
     "Make a room called Level2", "Game is made once and lasts the whole game",
     "Inside Game: self - anywhere else: game."]},
   {"title": "Start counting at 0", "bullets": [], "code": [(GAME_START, "counts")]},
   {"title": "Each virus counts itself", "bullets": [], "code": [(ENEMY_START, "count")]},
   {"title": "Count down on a stomp", "bullets": [], "code": [(PLAYER_LOOP, "enemy")]},
   {"title": "Checkpoint: count down", "checkpoint": True,
    "say": "Press Play and stomp a virus. The console says Enemies left: 1."},
   {"title": "Level 2 when they are gone", "bullets": [], "code": [(LEVEL1_LOOP, "next")]},
   {"title": "Draw the night sky", "sub": "night.png - 1280 x 720", "bullets": [
     "The same sky, later", "The Background class", "A new picture"]},
   {"title": "A night sky", "bullets": [], "code": [(LEVEL2_START, "back")]},
   {"title": "Pixelhead and the bubble machine", "bullets": [], "code": [(LEVEL2_START, "things")]},
   {"title": "Checkpoint: level 2", "checkpoint": True,
    "say": "Press Play and stomp both viruses. The night sky appears, with Pixelhead, three balloons and rising bubbles."},
 ],
},

# --------------------------------------------------------------- week 10 ----
{
 "n": 10,
 "title": "Gravity, and a boost",
 "big_idea": "Today Pixelhead falls. [[gravity]] pulls it down a little every loop, and popping a bubble starts a [[timer]] that lifts it up for two-thirds of a second.",
 "new_concepts": ["gravity", "a timer that counts down"],
 "draw": [],
 "objectives": [
   "Make an object fall a little every loop",
   "Say why gravity lives in the Game class",
   "Set a [[timer]] and count it down",
   "Do something only while a timer is above 0",
 ],
 "ops": [
  ADD(GAME_START, "counts", [
    "self.gravity = 1",
  ]),
  ADD(PLAYER_LOOP, "fall", [
    "self.y = self.y - game.gravity",
  ]),
  ADD(PLAYER_START, "boost", [
    "self.boostTimer = 0",
  ]),
  SET(PLAYER_LOOP, "bubble", [
    "bubbleHit = get_collision(self, 'Bubble')",
    "if bubbleHit:",
    "    self.boostTimer = 40",
    "    destroy(bubbleHit)",
  ]),
  ADD(PLAYER_LOOP, "boost", [
    "self.boostTimer = self.boostTimer - 1",
    "if self.boostTimer > 0:",
    "    self.y = self.y + 5",
  ]),
 ],
 "flow": [
  TALK("0:00", "Falling",
       "<p>Pixelhead floats at one height forever. Real balloons sink. Ask what code makes "
       "something go down a little every loop: take from its y.</p>",
       "<p>The amount is [[gravity]]. It goes in Game, with the count: in week 13, popped "
       "balloons make you fall faster, and Pixelhead is rebuilt in every level - so its own "
       "variables start over, but Game's do not.</p>",
       ask=("Gravity is in Game. How does Player loop reach it?",
            "game.gravity - the same way Enemy start reached the count")),
  STEP(GAME_START, "counts", "Gravity",
       ["Under the count in Game start: gravity is 1."],
       at="0:07"),
  STEP(PLAYER_LOOP, "fall", "Fall",
       ["At the bottom of Player LOOP: take gravity off y, every loop. Press Play and watch "
        "Pixelhead sink - and fall off the bottom."],
       at="0:09",
       ask=("What would gravity of -8 do?",
            "Taking away -8 adds 8 - Pixelhead would shoot up and never come down")),
  TALK("0:14", "A boost that stops",
       "<p>A bubble should lift Pixelhead - but only for a moment. Something has to "
       "remember how much longer the lift lasts: a [[timer]]. Pop a bubble and it is set "
       "to 40; every loop it goes down by one; while it is above 0, Pixelhead goes up.</p>",
       ask=("40 loops - how long is that?",
            "Two-thirds of a second - 60 loops is one second")),
  STEP(PLAYER_START, "boost", "A boost timer",
       ["At the bottom of Player start: no boost to begin with."],
       at="0:19"),
  STEP(PLAYER_LOOP, "bubble", "Popping a bubble starts the boost",
       ["Above <code>destroy(bubbleHit)</code>: set the timer to 40. Nothing lifts you "
        "yet - that is the next step."],
       at="0:21"),
  STEP(PLAYER_LOOP, "boost", "Lift while the timer runs",
       ["At the bottom of Player LOOP: count the timer down. While it is above 0, add 5 to "
        "y. Gravity still takes 1, so you rise 4 a loop."],
       at="0:25",
       ask=("Why does the timer go below 0 and keep going?",
            "Nothing stops it - but below 0 the if is false, so it does nothing")),
  TALK("0:33", "Stay up",
       "<p>Play: catch bubbles to stay in the sky, and land on the viruses from above. "
       "Falling off the bottom is the end for now - week 14 adds a game over screen.</p>"),
 ],
 "errors": [
   ("AttributeError: gravity", "self.gravity = 1 goes in Game start, above set_room, and Player loop reads it as game.gravity."),
   ("Pixelhead shoots up and never stops", "self.y = self.y + 5 must be pushed in under if self.boostTimer > 0."),
   ("A bubble does nothing", "self.boostTimer = 40 goes inside if bubbleHit, pushed in four spaces."),
   ("Pixelhead falls upwards", "Falling is minus: self.y = self.y - game.gravity."),
 ],
 "recap": [
   "[[gravity]] takes a little off y every loop.",
   "It lives in Game, so it lasts from level to level.",
   "A [[timer]] is set, counts down, and does something while above 0.",
   "Up 5 and down 1 every loop: you rise 4 a loop.",
 ],
 "homework": [
   {"task": "Trace the boost", "detail": "Pixelhead is at y 0 and pops a bubble. Where is it after 10 loops?", "done": "y 40 - up 5 and down 1, ten times."},
   {"task": "Why Game?", "detail": "Explain why gravity is in Game and not in Player start.", "done": "Pixelhead is rebuilt in each level; Game lasts, so a change to gravity lasts too."},
 ],
 "bonus": {"title": "A ceiling",
           "body": "<p>Too many bubbles carry Pixelhead off the top. At the bottom of Player "
                   "loop, add <code>if self.y &gt; 330:</code> with <code>self.y = 330</code> "
                   "pushed in under it.</p>"},
 "slides": [
   {"title": "Falling", "sub": "gravity", "bullets": [
     "Take a little off y every loop", "Gravity lives in Game", "Player reaches it with game.gravity"]},
   {"title": "Gravity", "bullets": [], "code": [(GAME_START, "counts")]},
   {"title": "Fall", "bullets": [], "code": [(PLAYER_LOOP, "fall")]},
   {"title": "Checkpoint: falling", "checkpoint": True,
    "say": "Press Play. Pixelhead sinks slowly with its balloons, and off the bottom."},
   {"title": "A boost that stops", "sub": "A timer", "bullets": [
     "Pop a bubble: the timer is 40", "Every loop: one less", "Above 0: go up"]},
   {"title": "A boost timer", "bullets": [], "code": [(PLAYER_START, "boost")]},
   {"title": "Popping a bubble starts the boost", "bullets": [], "code": [(PLAYER_LOOP, "bubble")]},
   {"title": "Lift while the timer runs", "bullets": [], "code": [(PLAYER_LOOP, "boost")]},
   {"title": "Checkpoint: boost", "checkpoint": True,
    "say": "Press Play and steer into a bubble. Pixelhead floats up for a moment, then starts to sink again."},
 ],
},

# --------------------------------------------------------------- week 11 ----
{
 "n": 11,
 "title": "One balloon at a time",
 "big_idea": "Losing everything at the first touch is harsh. Today a virus pops one balloon at a time, the [[game]] counts how many are left, and [[elif]] picks which one to pop.",
 "new_concepts": ["elif", "&gt;="],
 "draw": [],
 "objectives": [
   "Choose between three things with [[if]], [[elif]] and [[else]]",
   "Keep the balloon count in the Game class",
   "Use &gt;= to ask whether a number is at least something",
   "Explain why a popped balloon must not be moved",
 ],
 "ops": [
  ADD(GAME_START, "counts", [
    "self.balloonCount = 3",
  ]),
  SET(PLAYER_LOOP, "enemy", [
    "enemyHit = get_collision(self, 'Enemy')",
    "if enemyHit:",
    "    if self.y > enemyHit.y:",
    "        destroy(enemyHit)",
    "        game.enemiesNumber = game.enemiesNumber - 1",
    "        print('Enemies left: ' + str(game.enemiesNumber))",
    "    else:",
    "        if game.balloonCount == 3:",
    "            destroy(self.b1)",
    "            game.balloonCount = 2",
    "        elif game.balloonCount == 2:",
    "            destroy(self.b2)",
    "            game.balloonCount = 1",
    "        else:",
    "            destroy(self.b3)",
    "            destroy(self)",
  ]),
  SET(PLAYER_LOOP, "follow", [
    "if game.balloonCount >= 3:",
    "    self.b1.x = self.x",
    "    self.b1.y = self.y + 80",
    "if game.balloonCount >= 2:",
    "    self.b2.x = self.x + 30",
    "    self.b2.y = self.y + 80",
    "if game.balloonCount >= 1:",
    "    self.b3.x = self.x - 30",
    "    self.b3.y = self.y + 80",
  ]),
 ],
 "flow": [
  TALK("0:00", "Three chances",
       "<p>On the board, grow week 7's tree. When the virus wins, ask a new question: "
       "<em>how many balloons are left?</em> Three: pop the first. Two: pop the second. One: "
       "pop the last, and Pixelhead is gone.</p>",
       "<p>Three answers to one question is [[elif]] - short for <em>else if</em>. Python "
       "tries each question in turn and runs the first one that is true; [[else]] catches "
       "whatever is left.</p>",
       ask=("Where should the balloon count live - Player or Game?",
            "Game - Pixelhead is rebuilt in level 2, and the count must not start over")),
  STEP(GAME_START, "counts", "Count the balloons",
       ["Under gravity in Game start: three balloons to begin with."],
       at="0:08"),
  STEP(PLAYER_LOOP, "enemy", "Pop one balloon",
       ["The first line does not change.",
        "The stomp does not change. In the else, each destroy line gets a question above "
        "it: with three balloons left, pop b1 and say there are two. <code>elif</code> asks "
        "only when the question above it was no; the last else pops b3 and Pixelhead."],
       at="0:12",
       ask=("The count is 2. Which lines run?",
            "Only the elif's - destroy(self.b2) and the count becomes 1")),
  TALK("0:22", "A balloon that is gone",
       "<p>The follow lines still move all three balloons, every loop - even one that has "
       "been popped. Telling a balloon that is gone where to go is a mistake waiting to "
       "happen. Only move the ones that are left.</p>",
       "<p><code>&gt;=</code> means <em>at least</em>: <code>balloonCount &gt;= 2</code> is "
       "true for 2 and for 3.</p>"),
  STEP(PLAYER_LOOP, "follow", "Only move the balloons you have",
       ["The follow lines do not change - each pair is pushed in under a question. b1 "
        "moves only while you have all three, b2 while you have at least two,",
        "and b3 while you have any at all."],
       at="0:26",
       ask=("Why &gt;= 2 and not == 2 for b2?",
            "With three balloons b2 is still there too - == 2 would leave it behind")),
  TALK("0:34", "Too fast",
       "<p>Play, and touch a virus from below. All three balloons pop at once and Pixelhead "
       "is gone. Do not fix it today - ask why it happens and leave the question on the "
       "board for next week.</p>",
       ask=("How many loops does one touch last?",
            "Many - the pictures overlap for several loops, and each one pops a balloon")),
 ],
 "errors": [
   ("SyntaxError at elif", "elif lines up with its if, has a question, and ends with a colon."),
   ("AttributeError: balloonCount", "self.balloonCount = 3 goes in Game start, above set_room, and the Player reads game.balloonCount."),
   ("A popped balloon floats in the middle", "Each pair of follow lines must be pushed in under its if game.balloonCount question."),
   ("Nothing pops", "The balloon ifs go under the else, pushed in eight spaces, and use == to ask."),
 ],
 "recap": [
   "[[elif]] is asked only when every question above it was no.",
   "[[else]] catches whatever is left.",
   "The balloon count lives in Game, so it lasts from level to level.",
   "&gt;= means at least; only move the balloons you still have.",
 ],
 "homework": [
   {"task": "Which branch?", "detail": "For each balloon count - 3, 2 and 1 - write which balloon pops when a virus wins.", "done": "3: b1. 2: b2. 1: b3, and Pixelhead goes too."},
   {"task": "Why all at once?", "detail": "Explain in one sentence why one touch pops all three balloons.", "done": "The touch lasts several loops, and every loop pops one more."},
 ],
 "bonus": {"title": "Say how many",
           "body": "<p>Add a <code>print</code> under each <code>game.balloonCount =</code> "
                   "line that says how many balloons are left. Which number goes in each?</p>"},
 "slides": [
   {"title": "Three chances", "sub": "if, elif, else", "bullets": [
     "Three balloons: pop the first", "Two: pop the second", "One: pop the last, and you are out"]},
   {"title": "Count the balloons", "bullets": [], "code": [(GAME_START, "counts")]},
   {"title": "Pop one balloon", "bullets": [], "code": [(PLAYER_LOOP, "enemy")]},
   {"title": "A balloon that is gone", "sub": "&gt;= means at least", "bullets": [
     "Only move the balloons you still have", "balloonCount &gt;= 2 is true for 2 and 3"]},
   {"title": "Only move the balloons you have", "bullets": [], "code": [(PLAYER_LOOP, "follow")]},
   {"title": "Checkpoint: too fast", "checkpoint": True,
    "say": "Press Play and let a virus touch Pixelhead from above. All three balloons pop at once. Ask why - next week fixes it."},
 ],
},

# --------------------------------------------------------------- week 12 ----
{
 "n": 12,
 "title": "Invincible",
 "big_idea": "After a hit, Pixelhead gets a moment of safety: a [[timer]] that must run out before the next virus counts. Then the viruses learn to place themselves, so level 2 can have some.",
 "new_concepts": ["and", "a grace period"],
 "draw": [],
 "objectives": [
   "Ask two questions at once with [[and]]",
   "Use a [[timer]] for a grace period after a hit",
   "Let objects place themselves with [[random]]",
   "Say why a room's own x and y win over the object's",
 ],
 "ops": [
  ADD(PLAYER_START, "invincible", [
    "self.invincibleTimer = 0",
  ]),
  ADD(PLAYER_LOOP, "invincible", [
    "self.invincibleTimer = self.invincibleTimer - 1",
  ]),
  SET(PLAYER_LOOP, "enemy", [
    "enemyHit = get_collision(self, 'Enemy')",
    "if enemyHit and self.invincibleTimer < 0:",
    "    if self.y > enemyHit.y:",
    "        destroy(enemyHit)",
    "        game.enemiesNumber = game.enemiesNumber - 1",
    "        print('Enemies left: ' + str(game.enemiesNumber))",
    "    else:",
    "        self.invincibleTimer = 90",
    "        if game.balloonCount == 3:",
    "            destroy(self.b1)",
    "            game.balloonCount = 2",
    "        elif game.balloonCount == 2:",
    "            destroy(self.b2)",
    "            game.balloonCount = 1",
    "        else:",
    "            destroy(self.b3)",
    "            destroy(self)",
  ]),
  ADD(ENEMY_START, "import", [
    "import random",
  ]),
  ADD(ENEMY_START, "place", [
    "self.x = random.randint(-600, 600)",
    "self.y = random.randint(-300, 150)",
  ]),
  ADD(LEVEL2_START, "enemies", [
    "self.enemy1 = Enemy()",
    "self.enemy2 = Enemy()",
    "self.enemy3 = Enemy()",
  ]),
 ],
 "flow": [
  TALK("0:00", "A moment of safety",
       "<p>Last week one touch popped three balloons. Arcade games fix this with a grace "
       "period: after a hit, nothing can hurt you for a moment. That moment is a [[timer]] "
       "- set when you are hit, counting down every loop.</p>",
       ask=("90 loops of safety - how long is that?",
            "A second and a half - 60 loops is one second")),
  STEP(PLAYER_START, "invincible", "A safety timer",
       ["At the bottom of Player start: the timer starts at 0."],
       at="0:06"),
  STEP(PLAYER_LOOP, "invincible", "Count it down",
       ["At the bottom of Player LOOP: one less every loop, like the boost timer."],
       at="0:08"),
  STEP(PLAYER_LOOP, "enemy", "Only hit when it has run out",
       ["The first line does not change. The if asks two questions joined by [[and]]: "
        "touching a virus AND the timer has run out. Both must be yes.",
        "The first line of the else, above the balloon ifs: a hit starts 90 loops of "
        "safety. The rest does not change."],
       at="0:10",
       ask=("Why does the timer start at 0 and not 90?",
            "You have not been hit yet - and 0 runs out after one loop")),
  TALK("0:20", "Viruses for level 2",
       "<p>Level 2 has no viruses yet - and it is already won, the moment it starts. "
       "Instead of placing each one in the room, let each virus pick its own place "
       "with [[random]], in its start.</p>"),
  STEP(ENEMY_START, "import", "Bring in random",
       ["The VERY TOP of Enemy start: the same toolbox the bubbles use."],
       at="0:24"),
  STEP(ENEMY_START, "place", "Start somewhere in the sky",
       ["At the bottom of Enemy start: anywhere across, and no higher than 150, so they do "
        "not start on top of Pixelhead."],
       at="0:26",
       ask=("Level1's viruses still start where Level1 puts them. Why?",
            "The room sets their x and y after the virus's own start has run")),
  STEP(LEVEL2_START, "enemies", "Three viruses in level 2",
       ["At the bottom of Level2 start: three viruses, and no x or y - each places itself."],
       at="0:31"),
 ],
 "errors": [
   ("Pixelhead can never be hit", "The question is self.invincibleTimer &lt; 0, and the timer counts DOWN with - 1."),
   ("Still loses all three at once", "self.invincibleTimer = 90 is the first line under the else, pushed in eight spaces."),
   ("NameError: name 'random' is not defined", "import random goes at the very top of Enemy start."),
   ("Level 2 ends at once", "The three viruses go in Level2 start, and each one adds to the count in Enemy start."),
 ],
 "recap": [
   "[[and]] needs both questions to be yes.",
   "A grace period is a timer set when you are hit.",
   "An object can place itself in its start with [[random]].",
   "A room's own x and y come after, so they win.",
 ],
 "homework": [
   {"task": "When is it safe?", "detail": "Pixelhead is hit, and the timer is set to 90. After how many loops can it be hit again?", "done": "91 - the timer must go below 0."},
   {"task": "Both or one?", "detail": "Touching a virus is yes, the timer is 40. Does Pixelhead lose a balloon? Why?", "done": "No - and needs both, and 40 is not below 0."},
 ],
 "bonus": {"title": "A bigger level 2",
           "body": "<p>Add a fourth virus to Level2 start. Then try "
                   "<code>self.enemy4.verticalDirection = 'down'</code> - one virus starts "
                   "the other way.</p>"},
 "slides": [
   {"title": "A moment of safety", "sub": "A grace period", "bullets": [
     "Hit: the timer is 90", "Every loop: one less", "Only hit when it has run out"]},
   {"title": "A safety timer", "bullets": [], "code": [(PLAYER_START, "invincible")]},
   {"title": "Count it down", "bullets": [], "code": [(PLAYER_LOOP, "invincible")]},
   {"title": "Only hit when it has run out", "bullets": [], "code": [(PLAYER_LOOP, "enemy")]},
   {"title": "Checkpoint: one at a time", "checkpoint": True,
    "say": "Press Play and let a virus touch Pixelhead from above. One balloon pops, and the next touch only counts after a moment."},
   {"title": "Viruses for level 2", "sub": "Each one places itself", "bullets": [
     "Pick a random place in start", "No x and y in the room"]},
   {"title": "Bring in random", "bullets": [], "code": [(ENEMY_START, "import")]},
   {"title": "Start somewhere in the sky", "bullets": [], "code": [(ENEMY_START, "place")]},
   {"title": "Three viruses in level 2", "bullets": [], "code": [(LEVEL2_START, "enemies")]},
   {"title": "Checkpoint: level 2 fights back", "checkpoint": True,
    "say": "Press Play and clear level 1. Level 2 has three viruses, somewhere new each time."},
 ],
},

# --------------------------------------------------------------- week 13 ----
{
 "n": 13,
 "title": "New level, same balloons",
 "big_idea": "Lose a balloon in level 1 and level 2 hands it back - and it never follows you. Today the balloons a level builds come from the count, and every lost balloon makes Pixelhead heavier.",
 "new_concepts": ["state that lasts", "a decimal number"],
 "draw": [],
 "objectives": [
   "Build only as many balloons as the count says",
   "Change [[gravity]] from inside another class",
   "Use a decimal number like 1.5",
   "Bounce off a stomped virus with the boost timer",
 ],
 "ops": [
  SET(PLAYER_START, "balloons", [
    "if game.balloonCount >= 3:",
    "    self.b1 = Balloon()",
    "if game.balloonCount >= 2:",
    "    self.b2 = Balloon()",
    "    self.b2.angle = -30",
    "if game.balloonCount >= 1:",
    "    self.b3 = Balloon()",
    "    self.b3.angle = 30",
  ]),
  SET(PLAYER_LOOP, "enemy", [
    "enemyHit = get_collision(self, 'Enemy')",
    "if enemyHit and self.invincibleTimer < 0:",
    "    if self.y > enemyHit.y:",
    "        destroy(enemyHit)",
    "        game.enemiesNumber = game.enemiesNumber - 1",
    "        print('Enemies left: ' + str(game.enemiesNumber))",
    "        self.boostTimer = 30",
    "    else:",
    "        self.invincibleTimer = 90",
    "        if game.balloonCount == 3:",
    "            destroy(self.b1)",
    "            game.balloonCount = 2",
    "            game.gravity = 1.5",
    "        elif game.balloonCount == 2:",
    "            destroy(self.b2)",
    "            game.balloonCount = 1",
    "            game.gravity = 2",
    "        else:",
    "            destroy(self.b3)",
    "            destroy(self)",
  ]),
 ],
 "flow": [
  TALK("0:00", "A balloon left behind",
       "<p>Play: lose a balloon in level 1, then clear it. In level 2 a balloon sits in the "
       "middle of the sky, going nowhere. Ask the class to work out why before anyone "
       "types.</p>",
       ask=("Where did that balloon come from?",
            "Player start always builds three - but the count says two, so b1 is never moved")),
  STEP(PLAYER_START, "balloons", "Build only what you have",
       ["The balloon lines do not change - each one is pushed in under the same questions "
        "the follow lines ask. b1 only with all three, b2 with at least two,",
        "and b3 with any at all."],
       at="0:08"),
  TALK("0:16", "Heavier",
       "<p>Real balloons hold you up. Lose one and you should sink faster: [[gravity]] goes "
       "up to 1.5, then 2. A number with a point in it works like any other.</p>",
       "<p>And a stomp should feel like a bounce - the boost timer you already have can "
       "do it.</p>",
       ask=("Gravity changes from inside Player. Why does it still hold in level 2?",
            "It lives in Game, and Game is not rebuilt with the level")),
  STEP(PLAYER_LOOP, "enemy", "Bounce, and sink faster",
       ["The first line does not change.",
        "Under the stomp's print: 30 loops of boost - Pixelhead bounces off the virus. "
        "Under each <code>game.balloonCount =</code> line: one balloon fewer, so heavier."],
       at="0:20",
       ask=("Why is there no gravity line in the last branch?",
            "Pixelhead is gone - there is nothing left to fall")),
  TALK("0:30", "Play it through",
       "<p>Play both levels. With one balloon left, Pixelhead drops fast - every bubble "
       "counts. Use the spare time to redraw art.</p>"),
 ],
 "errors": [
   ("AttributeError: b1 in level 2", "Each balloon in Player start needs the same if game.balloonCount question as its follow lines."),
   ("No bounce on a stomp", "self.boostTimer = 30 goes under the stomp's print, pushed in eight spaces."),
   ("Gravity never changes", "game.gravity, not self.gravity - the gravity lives in Game."),
   ("Pixelhead falls through the floor from the start", "game.gravity = 1.5 goes under game.balloonCount = 2, pushed in twelve spaces, not in Game start."),
 ],
 "recap": [
   "Player start builds only the balloons the count says.",
   "Game's numbers last from level to level.",
   "Fewer balloons, more [[gravity]].",
   "The boost timer makes a stomp into a bounce.",
 ],
 "homework": [
   {"task": "How heavy?", "detail": "Write the gravity for 3, 2 and 1 balloons.", "done": "1, 1.5 and 2."},
   {"task": "How many balloons?", "detail": "You lost one balloon in level 1. Which balloons does Player start build in level 2?", "done": "b2 and b3 - the count is 2."},
 ],
 "bonus": {"title": "Your own physics",
           "body": "<p>Change the gravity numbers and the bounce. Can you make the game feel "
                   "floaty, or heavy? Write down the numbers you liked best.</p>"},
 "slides": [
   {"title": "A balloon left behind", "sub": "Lose one, clear the level", "bullets": [
     "Player start always builds three", "The count says two", "So one never follows"]},
   {"title": "Build only what you have", "bullets": [], "code": [(PLAYER_START, "balloons")]},
   {"title": "Checkpoint: same balloons", "checkpoint": True,
    "say": "Press Play, lose a balloon in level 1 and clear it. Level 2 starts with two balloons, and nothing in the middle."},
   {"title": "Heavier", "sub": "Gravity 1, then 1.5, then 2", "bullets": [
     "Fewer balloons, more gravity", "A stomp is a bounce"]},
   {"title": "Bounce, and sink faster", "bullets": [], "code": [(PLAYER_LOOP, "enemy")]},
   {"title": "Checkpoint: heavier", "checkpoint": True,
    "say": "Press Play. Stomp a virus and Pixelhead bounces up. Lose a balloon and it sinks faster."},
 ],
},

# --------------------------------------------------------------- week 14 ----
{
 "n": 14,
 "title": "Game over",
 "big_idea": "A game needs an ending. Today losing your last balloon or falling off the bottom goes to a game over room, and space starts again - after putting back every number the last game changed.",
 "new_concepts": ["key_is_pressed()", "resetting state"],
 "draw": ["gameOver.png"],
 "objectives": [
   "End the game in two ways with set_room",
   "Use [[key_is_pressed]] to start again",
   "Put back every number in Game before playing again",
   "Explain what goes wrong if a number is not reset",
 ],
 "ops": [
  ADD(OVER_START, "screen", [
    "self.screen = Background()",
    "self.screen.image = sprite('gameOver.png')",
  ]),
  ADD(OVER_START, "hint", [
    "print('Press space to play again')",
  ]),
  SET(PLAYER_LOOP, "enemy", [
    "enemyHit = get_collision(self, 'Enemy')",
    "if enemyHit and self.invincibleTimer < 0:",
    "    if self.y > enemyHit.y:",
    "        destroy(enemyHit)",
    "        game.enemiesNumber = game.enemiesNumber - 1",
    "        print('Enemies left: ' + str(game.enemiesNumber))",
    "        self.boostTimer = 30",
    "    else:",
    "        self.invincibleTimer = 90",
    "        if game.balloonCount == 3:",
    "            destroy(self.b1)",
    "            game.balloonCount = 2",
    "            game.gravity = 1.5",
    "        elif game.balloonCount == 2:",
    "            destroy(self.b2)",
    "            game.balloonCount = 1",
    "            game.gravity = 2",
    "        else:",
    "            destroy(self.b3)",
    "            destroy(self)",
    "            set_room('GameOver')",
  ]),
  ADD(PLAYER_LOOP, "falloff", [
    "if self.y < -400:",
    "    set_room('GameOver')",
  ]),
  ADD(OVER_LOOP, "restart", [
    "if key_is_pressed(' '):",
    "    game.enemiesNumber = 0",
    "    game.balloonCount = 3",
    "    game.gravity = 1",
    "    set_room('Level1')",
  ]),
 ],
 "flow": [
  TALK("0:00", "Two ways to lose",
       "<p>Make a room called <strong>GameOver</strong> and draw <code>gameOver.png</code> "
       "at 1280 by 720.</p>",
       ask=("Which two things should end the game?",
            "Losing the last balloon, and falling off the bottom of the screen")),
  STEP(OVER_START, "screen", "The game over screen",
       ["In GameOver start: the Background class again, with the game over picture."],
       at="0:10"),
  STEP(OVER_START, "hint", "Say what to do",
       ["Under the screen: tell the player how to start again."],
       at="0:12"),
  STEP(PLAYER_LOOP, "enemy", "Game over on the last balloon",
       ["The first line does not change.",
        "Under <code>destroy(self)</code>, pushed in just as far: go to the game over "
        "room. Everything above it does not change."],
       at="0:14"),
  STEP(PLAYER_LOOP, "falloff", "Game over off the bottom",
       ["At the bottom of Player LOOP, under the "
        "safety timer: below -400, Pixelhead has fallen out of the sky."],
       at="0:18",
       ask=("Why -400 and not -360, the bottom edge?",
            "Pixelhead is 80 tall - at -400 all of it has gone")),
  TALK("0:24", "Again!",
       "<p>[[key_is_pressed]] is True for every loop the key is held down - fine for "
       "starting again. <code>' '</code> is the space bar.</p>",
       "<p>Before going back to Level1, the game must put back what the last game "
       "changed. Ask what, and why.</p>",
       ask=("You lose with one virus still alive, and nothing is reset. What goes wrong?",
            "The count starts at 1, so it never reaches 0 - you can never reach level 2")),
  STEP(OVER_LOOP, "restart", "Press space to play again",
       ["In GameOver's LOOP: on space, put back all three of Game's numbers, then go to "
        "Level1. Level1 builds everything fresh."],
       at="0:30"),
 ],
 "errors": [
   ("NameError: name 'GameOver' is not defined", "Make the room in the editor and call it GameOver exactly - two capitals, no space."),
   ("Space does nothing", "Click the game first, and check the space between the quotes: ' '."),
   ("Level 2 never comes after a restart", "The restart must set game.enemiesNumber back to 0."),
   ("Two balloons after a restart", "The restart sets game.balloonCount back to 3 and game.gravity back to 1."),
 ],
 "recap": [
   "set_room('GameOver') ends the game - from anywhere.",
   "[[key_is_pressed]] is True as long as the key is held.",
   "Starting again means putting back every number that changed.",
   "A new room builds everything fresh - but Game remembers.",
 ],
 "homework": [
   {"task": "Find the bug", "detail": "The restart forgets game.gravity = 1. You lost two balloons last game. What happens?", "done": "The new game starts with three balloons but falls as fast as with one - gravity is still 2."},
   {"task": "Two endings", "detail": "Write both ways the game can end, and the line that does each.", "done": "Losing the last balloon - set_room in the enemy else; falling below -400 - the falloff if."},
 ],
 "bonus": {"title": "A best score",
           "body": "<p>Add <code>self.games = 0</code> to Game start, add one in the restart, "
                   "and print it in GameOver start. How many times have you tried?</p>"},
 "slides": [
   {"title": "Two ways to lose", "sub": "gameOver.png - 1280 x 720", "bullets": [
     "Make a room called GameOver", "The last balloon pops", "You fall off the bottom"]},
   {"title": "The game over screen", "bullets": [], "code": [(OVER_START, "screen")]},
   {"title": "Say what to do", "bullets": [], "code": [(OVER_START, "hint")]},
   {"title": "Game over on the last balloon", "bullets": [], "code": [(PLAYER_LOOP, "enemy")]},
   {"title": "Game over off the bottom", "bullets": [], "code": [(PLAYER_LOOP, "falloff")]},
   {"title": "Checkpoint: game over", "checkpoint": True,
    "say": "Press Play and fall off the bottom. The game over screen appears and the console says what to press."},
   {"title": "Again!", "sub": "Put back what changed", "bullets": [
     "key_is_pressed: as long as it is held", "' ' is the space bar",
     "Reset all three of Game's numbers"]},
   {"title": "Press space to play again", "bullets": [], "code": [(OVER_LOOP, "restart")]},
   {"title": "Checkpoint: again", "checkpoint": True,
    "say": "Press Play, lose, and press space. Level 1 starts again with three balloons and two viruses."},
 ],
},

# --------------------------------------------------------------- week 15 ----
{
 "n": 15,
 "title": "Sound, a flash and a win",
 "big_idea": "The last week makes it feel finished: a sound when you pop a bubble, Pixelhead flashing while it is safe, and a win screen when level 2 is clear.",
 "new_concepts": ["sound()", "play_sound()", "alpha"],
 "draw": ["win.png"],
 "objectives": [
   "Load a sound in start and play it when something happens",
   "Show a timer to the player with [[alpha]]",
   "Finish the game with a win room",
   "Play the whole game from start to end",
 ],
 "ops": [
  ADD(PLAYER_START, "sound", [
    "self.jumpSound = sound('jump.mp3')",
  ]),
  SET(PLAYER_LOOP, "bubble", [
    "bubbleHit = get_collision(self, 'Bubble')",
    "if bubbleHit:",
    "    self.boostTimer = 40",
    "    play_sound(self.jumpSound)",
    "    destroy(bubbleHit)",
  ]),
  ADD(PLAYER_LOOP, "flash", [
    "if self.invincibleTimer > 0:",
    "    self.alpha = 0.5",
    "else:",
    "    self.alpha = 1",
  ]),
  ADD(LEVEL2_LOOP, "win", [
    "if game.enemiesNumber == 0:",
    "    set_room('Win')",
  ]),
  ADD(WIN_START, "screen", [
    "self.screen = Background()",
    "self.screen.image = sprite('win.png')",
    "print('You win!')",
  ]),
 ],
 "flow": [
  TALK("0:00", "A sound",
       "<p>Upload a short sound called <code>jump.mp3</code> to the game's assets - or "
       "skip it: until there is one, the editor plays a beep in its place.</p>",
       ask=("Load the sound in start or in loop?",
            "Start - load it once; play it as often as you like")),
  STEP(PLAYER_START, "sound", "Load the sound",
       ["At the bottom of Player start: [[sound]] finds the file and keeps it ready under a "
        "name."],
       at="0:06"),
  STEP(PLAYER_LOOP, "bubble", "Play it on a bubble",
       ["The first lines do not change. Under the boost timer: [[play_sound]] plays it, "
        "every time you pop one."],
       at="0:08"),
  TALK("0:12", "Show the safety",
       "<p>The player cannot see the safety timer. [[alpha]] is how solid a picture is: 1 "
       "is solid, 0.5 is half see-through, 0 is gone. See-through while safe.</p>"),
  STEP(PLAYER_LOOP, "flash", "See-through while safe",
       ["At the bottom of Player LOOP: while the safety timer is above 0, half "
        "see-through; otherwise solid."],
       at="0:15",
       ask=("Why is the else needed?",
            "Without it Pixelhead stays see-through forever after the first hit")),
  TALK("0:20", "Winning",
       "<p>Make a room called <strong>Win</strong> and draw <code>win.png</code> at 1280 by "
       "720. Clear level 2, and you win.</p>",
       ask=("Which room should check that level 2 is clear?",
            "Level2 - the same way Level1 checks for level 1")),
  STEP(LEVEL2_LOOP, "win", "Win when level 2 is clear",
       ["In Level2's LOOP: the same check as Level1's, going to Win."],
       at="0:28"),
  STEP(WIN_START, "screen", "The win screen",
       ["In Win start: the win picture, and a message in the console."],
       at="0:30"),
  TALK("0:33", "Play it",
       "<p>Play the whole game, start to end. Then swap: play someone else's, and tell them "
       "one thing you liked.</p>"),
 ],
 "errors": [
   ("No sound at all", "Check the sound's name matches the file exactly, and that the computer's sound is on."),
   ("Pixelhead stays see-through", "The else and self.alpha = 1 must line up with the if above them."),
   ("NameError: name 'Win' is not defined", "Make the room in the editor and call it Win exactly - capital W."),
   ("You win at once in level 2", "Level2 start must make its three viruses; each adds one to the count."),
 ],
 "recap": [
   "[[sound]] loads a sound once; [[play_sound]] plays it.",
   "[[alpha]] is how solid a picture is, from 0 to 1.",
   "A win room is just another room.",
   "Every line of the game is yours.",
 ],
 "homework": [
   {"task": "Teach it", "detail": "Show someone at home your game and explain how stomping a virus works, line by line.", "done": "They can say why landing from above is safe and from below is not."},
   {"task": "Your next idea", "detail": "Write down one thing you would add next, and which class it would go in.", "done": "One idea and one class name."},
 ],
 "bonus": {"title": "Make it yours",
           "body": "<p>Add a third level, a second sound for losing a balloon, or a virus that "
                   "moves faster. Use what you know: a room, a sound, a variable.</p>"},
 "slides": [
   {"title": "A sound", "sub": "jump.mp3", "bullets": [
     "Upload it to the game's assets", "No file? A beep plays instead",
     "Load once in start, play any time"]},
   {"title": "Load the sound", "bullets": [], "code": [(PLAYER_START, "sound")]},
   {"title": "Play it on a bubble", "bullets": [], "code": [(PLAYER_LOOP, "bubble")]},
   {"title": "Show the safety", "sub": "alpha", "bullets": [
     "1 is solid", "0.5 is half see-through", "0 is gone"]},
   {"title": "See-through while safe", "bullets": [], "code": [(PLAYER_LOOP, "flash")]},
   {"title": "Checkpoint: sound and flash", "checkpoint": True,
    "say": "Press Play. Pop a bubble and hear it. Get touched from above and Pixelhead goes see-through for a moment."},
   {"title": "Winning", "sub": "win.png - 1280 x 720", "bullets": [
     "Make a room called Win", "Clear level 2 to get there"]},
   {"title": "Win when level 2 is clear", "bullets": [], "code": [(LEVEL2_LOOP, "win")]},
   {"title": "The win screen", "bullets": [], "code": [(WIN_START, "screen")]},
   {"title": "Checkpoint: you win", "checkpoint": True,
    "say": "Press Play and clear both levels. The win screen appears and the console says You win!"},
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
    if re.search(r" (<|>|<=|>=) ", stripped):
        keys.append("py:compare")
    if "get_collision(" in stripped:
        keys.append("py:collision")
    if re.match(r"[a-z]\w* = get_collision", stripped):
        keys.append("py:local")
    if "key_was_pressed(" in stripped:
        keys.append("py:press")
    if re.search(r"[tT]imer [-+] 1", stripped):
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
    if stripped.startswith("print("):
        keys.append("py:print")
    if "str(" in stripped:
        keys.append("py:str")
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
    if "gravity" in stripped:
        keys.append("py:gravity")
    if stripped.startswith("self.z ="):
        keys.append("py:z")
    if stripped.startswith("self.visible ="):
        keys.append("py:visible")
    if stripped.startswith("self.alpha ="):
        keys.append("py:alpha")
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
        "self.image = sprite('pixelhead.png')"),
    "py:loop": ("game", "loop runs over and over",
        ["[[loop]] runs about 60 times every second, until the object is gone.",
         "Anything that moves or keeps checking lives in loop."],
        "self.y = self.y + 1"),
    "py:room": ("game", "A room is one screen",
        ["Your game can have more than one screen. Each one is a [[room]].",
         "set_room changes to another, and removes everything from the one before."],
        "set_room('Level1')"),
    "py:sprite": ("art", "A sprite is your picture",
        ["[[sprite]]() finds the picture you drew and puts it on the [[object]].",
         "The name has to match exactly, including the .png."],
        "self.image = sprite('pixelhead.png')"),
    "py:make": ("py", "Making an object",
        ["Player() builds one player from the Player [[class]].",
         "The name on the left is how you talk to it afterwards."],
        "self.player = Player()"),
    "py:dot": ("py", "The dot reaches inside",
        ["self.player.x means: the x that belongs to self.player - the player's x.",
         "The [[dot]] lets one object change another it made."],
        "self.player.x = 200"),
    "py:coords": ("game", "x and y",
        ["The middle of the screen is x 0, y 0.",
         "Plus x is right, plus y is UP. Minus goes left and down."],
        "self.player.x = 200"),
    "py:variable": ("py", "A variable holds a value",
        ["A [[variable]] is a name with a value in it. The name goes left of =.",
         "self. in front makes it belong to this object, so start and loop can share it."],
        "self.speed = 1"),
    "py:change": ("py", "Change a value using itself",
        ["Python works out the right side first, then stores the answer on the left.",
         "Do it every [[loop]] and the object moves."],
        "self.x = self.x + self.speed"),
    "py:if": ("py", "if means only when",
        ["The lines under an [[if]] run only when its question is true.",
         "The if line ends with a colon; the lines under it start with four spaces."],
        "if self.y > 300:"),
    "py:keys": ("game", "key_is_pressed()",
        ["[[key_is_pressed(' ')|key_is_pressed]] is True for every loop you hold the key.",
         "' ' with a space between the quotes is the space bar."],
        "if key_is_pressed(' '):"),
    "py:flip": ("art", "A minus scaleX flips",
        ["[[scaleX|scale]] = 1 is the picture as you drew it.",
         "scaleX = -1 is the same size, flipped like a mirror."],
        "self.scaleX = -1"),
    "py:order": ("game", "Made first, drawn at the back",
        ["Objects are drawn in the order they were made.",
         "Make the background first so everything else is drawn on top."],
        "self.background = Background()"),
    "py:compare": ("py", "Comparing numbers",
        ["&lt; is less than, &gt; is greater than.",
         "&lt;= and &gt;= also count the number itself."],
        "if self.y > 300:"),
    "py:collision": ("game", "get_collision - are they touching?",
        ["[[get_collision(self, 'Enemy')|get_collision]] gives back the virus you touch, or False.",
         "An [[if]] treats the virus as yes and False as no."],
        "enemyHit = get_collision(self, 'Enemy')"),
    "py:local": ("py", "A name for right now",
        ["A name with no self. in front lives only inside this loop.",
         "Use it for an answer you need right here and nowhere else."],
        "enemyHit = get_collision(self, 'Enemy')"),
    "py:press": ("game", "key_was_pressed()",
        ["[[key_was_pressed('arrowRight')|key_was_pressed]] is True for only the one loop the key goes down.",
         "One tap, one change - however long you hold it."],
        "if key_was_pressed('arrowRight'):"),
    "py:timer": ("py", "A timer counts",
        ["A [[timer]] changes by one every loop. 60 loops is one second.",
         "Set it, let it count, and act when it passes a number."],
        "self.boostTimer = self.boostTimer - 1"),
    "py:bool": ("py", "True or False",
        ["A [[boolean]] has only two values: True and False.",
         "Like a light switch. Python writes them with a capital letter."],
        "self.visible = False"),
    "py:else": ("py", "else - otherwise",
        ["[[else]]: lines up with its if, and ends with a colon.",
         "Its lines run when the if is NOT true."],
        "else:"),
    "py:elif": ("py", "elif - else if",
        ["[[elif]] asks another question, only when every one above it was no.",
         "Python runs the first branch that is true, and skips the rest."],
        "elif game.balloonCount == 2:"),
    "py:and": ("py", "and - both at once",
        ["[[and]] joins two questions.",
         "The if runs only when BOTH are true."],
        "if enemyHit and self.invincibleTimer < 0:"),
    "py:equals": ("py", "== asks, = stores",
        ["One = puts a value into a name.",
         "Two == asks whether two things are exactly equal."],
        "if self.verticalDirection == 'up':"),
    "py:nested": ("py", "An if inside an if",
        ["The inside if only gets asked when the outside one is true.",
         "Its lines are pushed in eight spaces."],
        "    if self.y > enemyHit.y:"),
    "py:destroy": ("game", "destroy() removes an object",
        ["[[destroy]](enemyHit) takes the virus you touched out of the game.",
         "destroy(self) removes the object whose code is running."],
        "destroy(enemyHit)"),
    "py:print": ("py", "print() writes to the console",
        ["[[print]]() puts a line of words in the console under the game.",
         "Players never see it - you use it to check what your code is doing."],
        "print('Speed: ' + str(self.speed))"),
    "py:str": ("py", "str() turns a number into words",
        ["+ can add two numbers or join two pieces of words - not one of each.",
         "[[str]](self.speed) turns 3 into '3', so + can join it."],
        "'Speed: ' + str(self.speed)"),
    "py:string": ("py", "Words in quotes",
        ["Writing in quotes is a value too, like 'up' or 'right'.",
         "A [[variable]] can hold words as well as numbers."],
        "self.verticalDirection = 'up'"),
    "py:angle": ("art", "angle turns a picture",
        ["[[angle]] is how far the picture is turned, in degrees.",
         "0 is as you drew it; 30 leans one way and -30 the other."],
        "self.b2.angle = -30"),
    "py:import": ("py", "import brings in a toolbox",
        ["[[import]] random gives this code Python's random number tools.",
         "It goes at the very top of the code that uses it."],
        "import random"),
    "py:random": ("py", "random.randint() picks a number",
        ["[[random.randint(-600, 600)|random]] picks a whole number from -600 to 600.",
         "Both ends can be picked, and it is a different one each time."],
        "self.x = random.randint(-600, 600)"),
    "py:game": ("game", "game. reaches the Game",
        ["The Game class is made once and lasts the whole game.",
         "Inside Game it is self; from any other class it is [[game]]."],
        "game.enemiesNumber = game.enemiesNumber + 1"),
    "py:gravity": ("game", "Gravity pulls down",
        ["[[gravity]] is how much Pixelhead falls every loop.",
         "It lives in Game, so it lasts from level to level."],
        "self.y = self.y - game.gravity"),
    "py:z": ("game", "z brings it forward",
        ["Objects with a bigger [[z]] are drawn in front.",
         "Everything starts at 0, so 2 is in front of all of it."],
        "self.z = 2"),
    "py:visible": ("art", "visible hides an object",
        ["[[visible]] = False means the object is never drawn.",
         "It still runs its start and its loop."],
        "self.visible = False"),
    "py:alpha": ("art", "alpha is how solid it is",
        ["[[alpha]] = 1 is solid, 0.5 is half see-through, 0 is gone.",
         "Anything in between works."],
        "self.alpha = 0.5"),
    "py:sound": ("game", "sound() loads a sound",
        ["[[sound]]('jump.mp3') finds the sound file and keeps it ready.",
         "Load it once, in start."],
        "self.jumpSound = sound('jump.mp3')"),
    "py:play": ("game", "play_sound() plays it",
        ["[[play_sound]](self.jumpSound) plays the sound you loaded.",
         "As often as you like."],
        "play_sound(self.jumpSound)"),
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
    "py:compare":    ("idea", "Comparing numbers", ""),
    "py:collision":  ("word", "get_collision()", ""),
    "py:local":      ("idea", "A name for right now", ""),
    "py:press":      ("word", "key_was_pressed()", ""),
    "py:timer":      ("idea", "A timer", ""),
    "py:bool":       ("word", "True and False", "A boolean is True or False."),
    "py:else":       ("word", "else", ""),
    "py:elif":       ("word", "elif", ""),
    "py:and":        ("word", "and", ""),
    "py:equals":     ("word", "==", "== asks whether two things are equal."),
    "py:nested":     ("idea", "An if inside an if", ""),
    "py:destroy":    ("word", "destroy()", ""),
    "py:print":      ("word", "print()", ""),
    "py:str":        ("word", "str()", ""),
    "py:string":     ("idea", "Words in quotes", ""),
    "py:angle":      ("word", "angle", "angle turns an object's picture."),
    "py:import":     ("word", "import", ""),
    "py:random":     ("word", "random.randint()", ""),
    "py:game":       ("word", "game.", "game. reaches the Game class from anywhere."),
    "py:gravity":    ("idea", "Gravity", ""),
    "py:z":          ("word", "z", "z decides what is drawn in front."),
    "py:visible":    ("word", "visible", ""),
    "py:alpha":      ("word", "alpha", "alpha is how solid a picture is."),
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
    "class":   "A KIND of thing in your game - Player, Enemy, Bubble. Every object is built from one, like a house from a blueprint.",
    "object":  "One thing built from a class: Pixelhead, one virus, one bubble. You can see it and give it orders.",
    "sprite":  "The picture you drew, put onto an object. The name has to match exactly, including the .png.",
    "room":    "One screen of your game - Level1, Level2, GameOver and Win. set_room picks which one you see, and removes everything from the room before.",
    "start":   "The part of an object that runs once, the moment it is made - for its picture, its place and its starting numbers.",
    "loop":    "The part of an object that runs over and over, about sixty times a second. Anything that moves or keeps checking lives here.",
    "dot":     "The . between two names. self.b1.x means b1's x - the x that belongs to Pixelhead's first balloon.",
    "variable": "A name that holds a value, like self.speed = 1 or self.verticalDirection = 'up'. With self. in front it belongs to the object.",
    "scale":   "scaleX stretches a picture side to side: 1 is the way you drew it, and -1 flips it like a mirror.",
    "if":      "Runs the lines under it only when its question is true. The if ends with a colon and the lines under it are pushed in four spaces.",
    "key_is_pressed": "True for every loop you hold a key down. Space on the game over screen starts again.",
    "key_was_pressed": "True for only the one loop a key goes down, so one tap of an arrow changes the speed by one.",
    "get_collision": "Asks whether this object is touching one of a class. It gives back the thing it touches, or False.",
    "timer":   "A number that changes by one every loop. The spawner's counts up to 120; the boost and safety timers count down.",
    "boolean": "A value that is either True or False, like self.visible = False - a switch that is on or off.",
    "else":    "Goes under an if, lined up with it. Its lines run when the if's question is not true.",
    "elif":    "Short for else if. It asks another question, only when every question above it was no.",
    "and":     "Joins two questions in one if. The if runs only when both are true.",
    "destroy": "Takes an object out of the game for good. destroy(enemyHit) removes the virus you landed on.",
    "print":   "Writes a line of words in the console under the game - Speed: 2, Enemies left: 1 - so you can see what your code is doing.",
    "str":     "Turns a number into words, so + can join it to other words: 'Speed: ' + str(self.speed).",
    "angle":   "How far an object's picture is turned, in degrees. Your side balloons lean at 30 and -30.",
    "z":       "Decides what is drawn in front. Everything starts at 0; Pixelhead's z of 2 keeps it in front of its balloons.",
    "visible": "Whether an object is drawn. The spawner has visible = False - it works, but you never see it.",
    "import":  "Brings one of Python's toolboxes into your code. import random lets you pick random numbers.",
    "random":  "random.randint(-600, 600) picks a whole number from -600 to 600, a different one each time - how each bubble picks where to start.",
    "game":    "The Game class, made once and lasting the whole game. From any other class you reach its numbers as game.enemiesNumber.",
    "gravity": "How far Pixelhead falls every loop. It lives in Game as game.gravity, and goes up as you lose balloons.",
    "alpha":   "How solid a picture is: 1 is solid, 0.5 half see-through, 0 gone. Pixelhead is half see-through while it is safe.",
    "sound":   "sound('jump.mp3') loads a sound file once and keeps it ready under a name.",
    "play_sound": "Plays a sound you loaded with sound(). Pixelhead plays its jump sound every time it pops a bubble.",
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
    "py:make": {"kind": "dom", "parent": "Level1", "child": "a Player", "mode": "add",
                "cap": "Player() builds one from the blueprint."},
    "py:coords": {"kind": "resize", "axis": "w",
                  "cap": "x is left and right. Minus numbers go LEFT."},
    "py:variable": {"kind": "machine", "in": "1", "label": "self.speed", "out": "kept",
                    "cap": "A [[variable]] is a name that keeps a value for later."},
    "py:change": {"kind": "machine", "in": "100", "label": "+ 1", "out": "101",
                  "cap": "The old value goes in on the right; the new one is stored on the left."},
    "py:if": {"kind": "fork", "cond": "above 300?", "yes": "go down", "no": "carry on",
              "cap": "[[if]] means only when - the pushed-in lines run only if it is true."},
    "py:keys": {"kind": "event", "btn": "hold space", "action": "play again",
                "cap": "[[key_is_pressed]] is True for as long as you hold the key."},
    "py:flip": {"kind": "swap", "off": "scaleX = 1", "on": "scaleX = -1",
                "cap": "A minus [[scaleX|scale]] flips the picture to face the other way."},
    "py:collision": {"kind": "fork", "cond": "touching?", "yes": "stomp or pop", "no": "carry on",
                     "cap": "[[get_collision]] answers with the virus you touch, or False."},
    "py:press": {"kind": "event", "btn": "tap right", "action": "speed + 1",
                 "cap": "[[key_was_pressed]] is True for one loop only - one tap, one change."},
    "py:timer": {"kind": "loop", "items": ["40", "39", "...", "0"],
                 "cap": "The boost [[timer]] counts down; above 0, Pixelhead rises."},
    "py:bool": {"kind": "swap", "off": "True", "on": "False",
                "cap": "A [[boolean]] is a switch: True or False."},
    "py:else": {"kind": "fork", "cond": "higher?", "yes": "virus gone", "no": "balloon pops",
                "cap": "[[else]] runs when the if is not true."},
    "py:elif": {"kind": "fork", "cond": "3 balloons?", "yes": "pop b1", "no": "ask: 2 balloons?",
                "cap": "[[elif]] is asked only when the question above it was no."},
    "py:destroy": {"kind": "swap", "off": "a virus", "on": "(gone)",
                   "cap": "[[destroy]] takes an object out of the game for good."},
    "py:print": {"kind": "swap", "off": "(console)", "on": "Speed: 2",
                 "cap": "[[print]] writes a line in the console."},
    "py:angle": {"kind": "swap", "off": "angle = 0", "on": "angle = 30",
                 "cap": "[[angle]] turns the picture: 30 leans it over."},
    "py:random": {"kind": "machine", "in": "-600 to 600", "label": "randint", "out": "217",
                  "cap": "[[random.randint|random]] picks a number - a different one each time."},
    "py:gravity": {"kind": "machine", "in": "y = 100", "label": "- gravity", "out": "y = 99",
                   "cap": "[[gravity]] takes a little off y, every loop."},
    "py:visible": {"kind": "swap", "off": "visible = True", "on": "visible = False",
                   "cap": "[[visible]] False hides the object, but it still runs."},
    "py:alpha": {"kind": "swap", "off": "alpha = 1", "on": "alpha = 0.5",
                 "cap": "[[alpha]] 0.5 is half see-through."},
    "py:play": {"kind": "event", "btn": "pop a bubble", "action": "a sound",
                "cap": "[[play_sound]] plays the sound you loaded."},
}

LINE_NOTES = {
    (PLAYER_START, "look"): ["Use the Pixelhead picture you drew."],
    (LEVEL1_START, "player"): [
        "Build one player and keep it as self.player.",
        "200 to the right of the middle.",
        "200 up.",
    ],
    (GAME_START, "setup"): ["Change to the Level1 room."],
    (ENEMY_START, "look"): ["Use the virus picture you drew."],
    (LEVEL1_START, "enemies"): [
        "Build one virus and keep it as self.enemy1.",
        "300 to the LEFT - minus.",
        "200 down - minus.",
        "A second virus, self.enemy2.",
        "300 to the right.",
        "Halfway up.",
    ],
    (BUBBLE_START, "look"): ["Use the bubble picture you drew."],
    (LEVEL1_START, "bubbles"): [
        "Build one bubble, self.bubble1.",
        "400 to the right.",
        "Near the bottom.",
        "A second bubble, self.bubble2.",
        "400 to the LEFT.",
        "Near the bottom.",
    ],
    (BACK_START, "look"): ["Use the mountains you drew."],
    (LEVEL1_START, "back"): ["At the VERY TOP: make the background first, so it is drawn at the back."],
    (BUBBLE_LOOP, "rise"): ["My new y is my old y plus 1: up, every loop."],
    (PLAYER_START, "speed"): ["Start drifting right, slowly."],
    (PLAYER_LOOP, "drift"): ["Add my speed to my x, every loop."],
    (PLAYER_LOOP, "steer"): [
        "Only on the loop right is tapped...",
        "...one faster to the right...",
        "...face right...",
        "...and write the new speed in the console.",
        "Only on the loop left is tapped...",
        "...one faster to the left...",
        "...face left - flipped...",
        "...and write the new speed.",
    ],
    (ENEMY_START, "directions"): [
        "Start out going up.",
        "And start out going right.",
    ],
    (ENEMY_LOOP, "updown"): [
        "Only while I am going up...",
        "...add 1 to y.",
        "Only while I am going down...",
        "...take 1 off y.",
    ],
    (ENEMY_LOOP, "turnY"): [
        "Above 300?",
        "Go down from now on.",
        "Below -300?",
        "Go up from now on.",
    ],
    (ENEMY_LOOP, "sideways"): [
        "Only while I am going right...",
        "...add 1 to x...",
        "...and face right.",
        "Only while I am going left...",
        "...take 1 off x...",
        "...and face left - flipped.",
    ],
    (ENEMY_LOOP, "turnX"): [
        "Past 625 on the right?",
        "Go left from now on.",
        "Past -625 on the left?",
        "Go right from now on.",
    ],
    (BALLOON_START, "look"): ["Use the balloon picture you drew."],
    (PLAYER_START, "balloons"): [
        "Build the first balloon, b1.",
        "Build b2...",
        "...leaning one way.",
        "Build b3...",
        "...leaning the other way.",
    ],
    (13, PLAYER_START, "balloons"): [
        "NEW: Only with all three balloons left...",
        "...build b1.",
        "NEW: Only with at least two...",
        "...build b2...",
        "...leaning one way.",
        "NEW: Only with any at all...",
        "...build b3...",
        "...leaning the other way.",
    ],
    (PLAYER_LOOP, "follow"): [
        "b1's x is my x...",
        "...and it floats 80 above me.",
        "b2: 30 to my right...",
        "...80 above me.",
        "b3: 30 to my left...",
        "...80 above me.",
    ],
    (11, PLAYER_LOOP, "follow"): [
        "NEW: Only while I have all three...",
        "...b1 goes where I am...",
        "...80 above me.",
        "NEW: Only while I have at least two...",
        "...b2 to my right...",
        "...80 above me.",
        "NEW: Only while I have any at all...",
        "...b3 to my left...",
        "...80 above me.",
    ],
    (PLAYER_START, "front"): ["Draw Pixelhead in front of its balloons."],
    (PLAYER_LOOP, "enemy"): [
        "Am I touching a virus? Keep the answer in enemyHit.",
        "Only when I am...",
        "...am I higher than it?",
        "Yes: take the virus out of the game.",
        "Otherwise...",
        "...pop the first balloon...",
        "...the second...",
        "...the third...",
        "...and take Pixelhead out too.",
    ],
    (9, PLAYER_LOOP, "enemy"): [
        "Am I touching a virus?",
        "Only when I am...",
        "...am I higher than it?",
        "Yes: the virus is gone...",
        "NEW: ...one virus fewer...",
        "NEW: ...and say how many are left.",
        "Otherwise...",
        "...pop the first balloon...",
        "...the second...",
        "...the third...",
        "...and Pixelhead.",
    ],
    (11, PLAYER_LOOP, "enemy"): [
        "Am I touching a virus?",
        "Only when I am...",
        "...am I higher than it?",
        "Yes: the virus is gone...",
        "...one virus fewer...",
        "...and say how many are left.",
        "Otherwise...",
        "NEW: ...with all three balloons...",
        "...pop the first...",
        "NEW: ...and two are left.",
        "NEW: With two...",
        "...pop the second...",
        "NEW: ...and one is left.",
        "NEW: With only one...",
        "...pop the last...",
        "...and Pixelhead goes with it.",
    ],
    (12, PLAYER_LOOP, "enemy"): [
        "Am I touching a virus?",
        "CHANGED: Only when I am AND my safety has run out...",
        "...am I higher than it?",
        "Yes: the virus is gone...",
        "...one virus fewer...",
        "...and say how many are left.",
        "Otherwise...",
        "NEW: ...I am hit: 90 loops of safety.",
        "With all three balloons...",
        "...pop the first...",
        "...and two are left.",
        "With two...",
        "...pop the second...",
        "...and one is left.",
        "With only one...",
        "...pop the last...",
        "...and Pixelhead goes with it.",
    ],
    (13, PLAYER_LOOP, "enemy"): [
        "Am I touching a virus?",
        "Only when I am and my safety has run out...",
        "...am I higher than it?",
        "Yes: the virus is gone...",
        "...one virus fewer...",
        "...say how many are left...",
        "NEW: ...and bounce up for 30 loops.",
        "Otherwise...",
        "...I am hit: 90 loops of safety.",
        "With all three balloons...",
        "...pop the first...",
        "...two are left...",
        "NEW: ...and I am heavier.",
        "With two...",
        "...pop the second...",
        "...one is left...",
        "NEW: ...and I am heavier still.",
        "With only one...",
        "...pop the last...",
        "...and Pixelhead goes with it.",
    ],
    (14, PLAYER_LOOP, "enemy"): [
        "Am I touching a virus?",
        "Only when I am and my safety has run out...",
        "...am I higher than it?",
        "Yes: the virus is gone...",
        "...one virus fewer...",
        "...say how many are left...",
        "...and bounce up.",
        "Otherwise...",
        "...I am hit: 90 loops of safety.",
        "With all three balloons...",
        "...pop the first...",
        "...two are left...",
        "...and I am heavier.",
        "With two...",
        "...pop the second...",
        "...one is left...",
        "...and I am heavier still.",
        "With only one...",
        "...pop the last...",
        "...Pixelhead goes with it...",
        "NEW: ...and the game is over.",
    ],
    (PLAYER_LOOP, "bubble"): [
        "Am I touching a bubble? Keep the answer in bubbleHit.",
        "Only when I am...",
        "...pop it.",
    ],
    (10, PLAYER_LOOP, "bubble"): [
        "Am I touching a bubble?",
        "Only when I am...",
        "NEW: ...boost for 40 loops...",
        "...and pop it.",
    ],
    (15, PLAYER_LOOP, "bubble"): [
        "Am I touching a bubble?",
        "Only when I am...",
        "...boost for 40 loops...",
        "NEW: ...play the jump sound...",
        "...and pop it.",
    ],
    (LEVEL1_START, "spawner"): ["Build one spawner. It has no picture."],
    (SPAWNER_START, "setup"): [
        "Never draw me.",
        "Start counting at 0.",
    ],
    (SPAWNER_LOOP, "spawn"): [
        "One more loop counted.",
        "Past 120 - two seconds?",
        "Make a bubble...",
        "...and count from 0 again.",
    ],
    (BUBBLE_START, "import"): ["At the VERY TOP: bring in Python's random toolbox."],
    (BUBBLE_START, "place"): [
        "Anywhere from -600 to 600 across.",
        "Just below the bottom edge.",
    ],
    (GAME_START, "counts"): [
        "No viruses counted yet.",
        "Fall 1 every loop.",
        "Three balloons to start with.",
    ],
    (ENEMY_START, "count"): ["One more virus in the game."],
    (LEVEL1_LOOP, "next"): [
        "No viruses left?",
        "Go to level 2.",
    ],
    (LEVEL2_START, "back"): [
        "Make the background first, at the back...",
        "...and give it the night sky.",
    ],
    (LEVEL2_START, "things"): [
        "A new Pixelhead, with its own balloons.",
        "A new bubble machine.",
    ],
    (PLAYER_LOOP, "fall"): ["Fall by the Game's gravity, every loop."],
    (PLAYER_START, "boost"): ["No boost to start with."],
    (PLAYER_LOOP, "boost"): [
        "One loop less of boost.",
        "Still boosting?",
        "Up 5.",
    ],
    (PLAYER_START, "invincible"): ["Not safe yet - nothing has hit me."],
    (PLAYER_LOOP, "invincible"): ["One loop less of safety."],
    (ENEMY_START, "import"): ["At the VERY TOP: bring in Python's random toolbox."],
    (ENEMY_START, "place"): [
        "Anywhere from -600 to 600 across.",
        "From -300 up to 150 - never on top of Pixelhead.",
    ],
    (LEVEL2_START, "enemies"): [
        "Three viruses, each placing itself.",
        "The second.",
        "The third.",
    ],
    (OVER_START, "screen"): [
        "A background...",
        "...with the game over picture.",
    ],
    (OVER_START, "hint"): ["Say how to play again."],
    (PLAYER_LOOP, "falloff"): [
        "Fallen out of the sky?",
        "The game is over.",
    ],
    (OVER_LOOP, "restart"): [
        "Only while space is held...",
        "...no viruses counted...",
        "...three balloons...",
        "...gravity back to 1...",
        "...and start again in Level1.",
    ],
    (PLAYER_START, "sound"): ["Load the jump sound once."],
    (PLAYER_LOOP, "flash"): [
        "Still safe?",
        "Half see-through.",
        "Otherwise...",
        "...solid.",
    ],
    (LEVEL2_LOOP, "win"): [
        "No viruses left?",
        "You win.",
    ],
    (WIN_START, "screen"): [
        "A background...",
        "...with the win picture...",
        "...and say so.",
    ],
}

# A note for a slide that strikes lines out. Keyed (week, panel, block) when one
# block changes in more than one week, so each week's says what that week does.
DELETE_NOTES = {
    (12, PLAYER_LOOP, "enemy"): "This line changes - a virus only counts once your safety has run out. Take it out; the new if goes in its place.",
}


# --- what pressing Play should show you -------------------------------------
#
# One line per step, keyed (week, panel, block). A step that changes nothing
# you can see says so, so working code is never mistaken for broken code.
CHECKS = {
    (1, PLAYER_START, "look"):
        "Nothing to see yet - you have described Pixelhead, but nobody has MADE one. "
        "You are checking there is no red error.",
    (1, LEVEL1_START, "player"):
        "Still nothing - nothing goes to Level1 yet.",
    (1, GAME_START, "setup"):
        "Pixelhead appears up and to the right of the middle.",
    (1, ENEMY_START, "look"):
        "No change - no virus has been made yet.",
    (1, LEVEL1_START, "enemies"):
        "A virus appears in the bottom left.",
    (1, BUBBLE_START, "look"):
        "No change - no bubble has been made yet.",
    (1, LEVEL1_START, "bubbles"):
        "Two bubbles appear near the bottom corners.",
    (2, BACK_START, "look"):
        "No change - no Background has been made yet.",
    (2, LEVEL1_START, "back"):
        "The mountains fill the screen, with everything else on top.",
    (2, BUBBLE_LOOP, "rise"):
        "Both bubbles float up and off the top of the screen.",
    (2, PLAYER_START, "speed"):
        "No change - nothing uses the speed yet.",
    (2, PLAYER_LOOP, "drift"):
        "Pixelhead drifts slowly to the right, and off the side.",
    (3, PLAYER_LOOP, "steer"):
        "Click the game and tap the arrows. Pixelhead speeds up, slows down and turns "
        "round, and the console shows Speed: 2, Speed: 1 and so on.",
    (4, ENEMY_START, "directions"):
        "No change - nothing reads the direction yet.",
    (4, ENEMY_LOOP, "updown"):
        "The virus flies straight up and off the top of the screen.",
    (4, ENEMY_LOOP, "turnY"):
        "The virus goes up, turns near the top, comes down and turns near the bottom.",
    (4, LEVEL1_START, "enemies"):
        "A second virus patrols up and down on the right.",
    (5, ENEMY_START, "directions"):
        "No change - nothing reads the new direction yet.",
    (5, ENEMY_LOOP, "sideways"):
        "The viruses fly diagonally, facing right - and slide off the right side.",
    (5, ENEMY_LOOP, "turnX"):
        "Both viruses bounce round the sky, turning at all four sides and facing the "
        "way they fly.",
    (6, BALLOON_START, "look"):
        "No change - no balloon has been made yet.",
    (6, PLAYER_START, "balloons"):
        "Three balloons appear in the middle of the screen, and stay there while "
        "Pixelhead drifts away.",
    (6, PLAYER_LOOP, "follow"):
        "The three balloons float above Pixelhead wherever it goes - but their strings "
        "are drawn over its head.",
    (6, PLAYER_START, "front"):
        "Pixelhead's head is drawn in front of the strings.",
    (7, PLAYER_LOOP, "enemy"):
        "Wait for a virus to reach Pixelhead. Rising into it from below, the virus goes. "
        "Coming down onto it, Pixelhead and its balloons go.",
    (7, PLAYER_LOOP, "bubble"):
        "Steer into a rising bubble. It pops.",
    (8, LEVEL1_START, "spawner"):
        "No change - the spawner has no picture, so you cannot see it.",
    (8, SPAWNER_START, "setup"):
        "No change - the timer is not counting yet.",
    (8, SPAWNER_LOOP, "spawn"):
        "Every two seconds a new bubble appears in the middle and floats up.",
    (8, BUBBLE_START, "import"):
        "No change - nothing uses random yet.",
    (8, BUBBLE_START, "place"):
        "Every two seconds a bubble floats up from somewhere new along the bottom. The "
        "two from week 1 still start where Level1 puts them.",
    (9, GAME_START, "counts"):
        "No change - nothing counts yet.",
    (9, ENEMY_START, "count"):
        "No change you can see - the count is 2, but nothing shows it.",
    (9, PLAYER_LOOP, "enemy"):
        "Stomp a virus from below. The console says Enemies left: 1.",
    (9, LEVEL1_LOOP, "next"):
        "Stomp both viruses. The screen goes empty - Level2 has nothing in it yet.",
    (9, LEVEL2_START, "back"):
        "Stomp both viruses. The night sky appears.",
    (9, LEVEL2_START, "things"):
        "Stomp both viruses. The night sky appears with Pixelhead, three balloons and "
        "bubbles rising.",
    (10, GAME_START, "counts"):
        "No change - nothing uses gravity yet.",
    (10, PLAYER_LOOP, "fall"):
        "Pixelhead sinks slowly with its balloons, and off the bottom.",
    (10, PLAYER_START, "boost"):
        "No change - nothing sets the boost yet.",
    (10, PLAYER_LOOP, "bubble"):
        "No change you can see - a bubble still just pops.",
    (10, PLAYER_LOOP, "boost"):
        "Steer into a bubble. Pixelhead floats up for a moment, then starts to sink "
        "again.",
    (11, GAME_START, "counts"):
        "No change - nothing reads the balloon count yet.",
    (11, PLAYER_LOOP, "enemy"):
        "Let a virus come down onto Pixelhead. Balloons pop one after another, very "
        "fast, and Pixelhead is gone.",
    (11, PLAYER_LOOP, "follow"):
        "Still all three pop at once - one touch lasts several loops. That is next "
        "week's job.",
    (12, PLAYER_START, "invincible"):
        "No change - nothing uses the timer yet.",
    (12, PLAYER_LOOP, "invincible"):
        "No change - nothing reads the timer yet.",
    (12, PLAYER_LOOP, "enemy"):
        "Let a virus come down onto Pixelhead. One balloon pops, and the next touch "
        "only counts a moment later.",
    (12, ENEMY_START, "import"):
        "No change - nothing uses random yet.",
    (12, ENEMY_START, "place"):
        "No change - Level1 still puts its viruses where it says.",
    (12, LEVEL2_START, "enemies"):
        "Clear level 1. Level 2 has three viruses, somewhere new each time.",
    (13, PLAYER_START, "balloons"):
        "Lose a balloon in level 1 and clear it. Level 2 starts with two balloons above "
        "Pixelhead, and none left in the middle.",
    (13, PLAYER_LOOP, "enemy"):
        "Stomp a virus and Pixelhead bounces up. Lose a balloon and it sinks faster.",
    (14, OVER_START, "screen"):
        "No change - nothing goes to GameOver yet.",
    (14, OVER_START, "hint"):
        "No change - nothing goes to GameOver yet.",
    (14, PLAYER_LOOP, "enemy"):
        "Lose all three balloons. The game over screen appears, and the console says "
        "Press space to play again.",
    (14, PLAYER_LOOP, "falloff"):
        "Fall off the bottom. The game over screen appears.",
    (14, OVER_LOOP, "restart"):
        "Lose, then press space. Level 1 starts again with three balloons and two "
        "viruses.",
    (15, PLAYER_START, "sound"):
        "No change - nothing plays the sound yet.",
    (15, PLAYER_LOOP, "bubble"):
        "Pop a bubble. You hear it - your sound, or a beep if you have not uploaded one.",
    (15, PLAYER_LOOP, "flash"):
        "Let a virus come down onto Pixelhead. A balloon pops and Pixelhead goes half "
        "see-through for a moment.",
    (15, LEVEL2_LOOP, "win"):
        "Clear level 2. The screen goes empty - Win has nothing in it yet.",
    (15, WIN_START, "screen"):
        "Clear both levels. The win screen appears and the console says You win!",
}


def check_for(week_n, panel, block):
    """What to look for after Play, for one step. The build refuses to ship a
    step that has no line, so this may raise rather than return nothing."""
    return CHECKS[(week_n, panel, block)]

QUIZZES = {
    (1, LEVEL1_START, "bubbles"): [
        {"q": "What is a class?",
         "options": ["A blueprint for a kind of thing", "One bubble on the screen",
                     "A picture", "A room"], "answer": 0,
         "why": "A class is the blueprint; every bubble is an object built from it."},
        {"q": "Where is x 0, y 0?",
         "options": ["The middle of the screen", "The top left", "The bottom left",
                     "The top right"], "answer": 0,
         "why": "0, 0 is the middle; plus x is right and plus y is up."},
        {"q": "Why two names, bubble1 and bubble2? (this week)",
         "options": ["So the room can reach each one", "Python needs numbers in names",
                     "To make them different colours", "It does not matter"], "answer": 0,
         "why": "With one name, the second would take it and the first could not be reached."},
    ],
    (2, PLAYER_LOOP, "drift"): [
        {"q": "Why is the background made first?",
         "options": ["So it is drawn at the back", "So it loads faster",
                     "Python needs it first", "So it is bigger"], "answer": 0,
         "why": "Objects are drawn in the order they are made."},
        {"q": "y is 10. What is it after three loops of self.y = self.y + 1?",
         "options": ["13", "11", "10", "3"], "answer": 0,
         "why": "11, 12, 13."},
        {"q": "Why self.speed instead of a 1? (this week)",
         "options": ["The speed can change while the game runs", "It is shorter",
                     "Numbers are not allowed in loop", "It makes it faster"], "answer": 0,
         "why": "A variable can change; a 1 typed in the code cannot."},
    ],
    (3, PLAYER_LOOP, "steer"): [
        {"q": "How long is key_was_pressed True?",
         "options": ["One loop, when the key goes down", "As long as you hold it",
                     "Until you press another key", "Always"], "answer": 0,
         "why": "One tap, one change."},
        {"q": "The speed is 2. You tap left three times. What is it now?",
         "options": ["-1", "1", "5", "-3"], "answer": 0,
         "why": "1, 0, -1."},
        {"q": "What does scaleX = -1 do? (this week)",
         "options": ["Flips the picture like a mirror", "Makes it smaller",
                     "Moves it left", "Hides it"], "answer": 0,
         "why": "The same size, the other way round."},
    ],
    (4, LEVEL1_START, "enemies"): [
        {"q": "Which is bigger, -300 or -200?",
         "options": ["-200", "-300", "They are the same", "You cannot compare them"], "answer": 0,
         "why": "-200 is further right on the number line."},
        {"q": "What is the difference between = and ==?",
         "options": ["= stores, == asks", "= asks, == stores", "None", "== is faster"], "answer": 0,
         "why": "One = puts a value in; two == compares."},
        {"q": "A virus is at y 301, going up. What happens next? (this week)",
         "options": ["It starts going down", "It keeps going up", "It stops",
                     "It disappears"], "answer": 0,
         "why": "Above 300, verticalDirection becomes 'down'."},
    ],
    (5, ENEMY_LOOP, "turnX"): [
        {"q": "What are the three parts of a patrol?",
         "options": ["A direction, a move for each, a turn at each edge",
                     "A picture, a room, a speed", "An if, an else, a print",
                     "A start, a loop, a room"], "answer": 0,
         "why": "The same pattern, up and down or side to side."},
        {"q": "Why does the virus fly diagonally?",
         "options": ["It moves up-down and sideways every loop", "It is told to",
                     "The angle is 45", "Gravity"], "answer": 0,
         "why": "Both moves happen in the same loop."},
        {"q": "Why 625 and not 640? (this week)",
         "options": ["It turns while still on the screen", "640 is not allowed",
                     "It is faster", "It does not matter"], "answer": 0,
         "why": "The virus turns before any of it goes off the edge."},
    ],
    (6, PLAYER_START, "front"): [
        {"q": "Where do the balloons start before the follow lines?",
         "options": ["In the middle, at 0, 0", "Above Pixelhead",
                     "Off the screen", "Nowhere"], "answer": 0,
         "why": "Nobody had said where, so they start at 0, 0."},
        {"q": "Pixelhead is at x 100. Where is b2?",
         "options": ["x 130", "x 100", "x 70", "x 30"], "answer": 0,
         "why": "b2 is self.x + 30."},
        {"q": "Why does Pixelhead need z = 2? (this week)",
         "options": ["The balloons are made after it", "To move faster",
                     "To be bigger", "To float"], "answer": 0,
         "why": "Made later is drawn on top - a bigger z is drawn in front."},
    ],
    (7, PLAYER_LOOP, "bubble"): [
        {"q": "What does get_collision give back when you touch nothing?",
         "options": ["False", "True", "0", "An error"], "answer": 0,
         "why": "It gives back the thing you touch, or False."},
        {"q": "Pixelhead is at y 50, a virus at y 20. Who wins?",
         "options": ["Pixelhead - it is higher", "The virus", "Nobody", "Both"], "answer": 0,
         "why": "50 is higher than 20, so the virus is destroyed."},
        {"q": "When do the lines under else run? (this week)",
         "options": ["When the if's question is not true", "Always", "Never",
                     "When the if is true"], "answer": 0,
         "why": "else means otherwise."},
    ],
    (8, BUBBLE_START, "place"): [
        {"q": "60 loops is how long?",
         "options": ["One second", "One minute", "Ten seconds", "Half a second"], "answer": 0,
         "why": "Loop runs about 60 times a second."},
        {"q": "What happens without self.timer = 0?",
         "options": ["A bubble every loop", "No bubbles", "One bubble only",
                     "An error"], "answer": 0,
         "why": "The timer stays above 120, so the if is true every loop."},
        {"q": "Where does import random go? (this week)",
         "options": ["At the very top", "At the bottom", "In loop",
                     "Anywhere"], "answer": 0,
         "why": "Bring in the toolbox before anything uses it."},
    ],
    (9, LEVEL2_START, "things"): [
        {"q": "Why does the count live in Game?",
         "options": ["Game lasts the whole game", "Game is faster",
                     "Only Game can count", "It does not matter"], "answer": 0,
         "why": "A room is removed when you change level; Game is not."},
        {"q": "Inside Enemy, how do you reach the count?",
         "options": ["game.enemiesNumber", "self.enemiesNumber", "enemiesNumber",
                     "Game()"], "answer": 0,
         "why": "From any class but Game, the Game is game."},
        {"q": "Is level 2's Pixelhead the one from level 1? (this week)",
         "options": ["No - a new one is built", "Yes", "Only its balloons",
                     "Only if persistent"], "answer": 0,
         "why": "Level1's objects are removed; Level2 builds its own."},
    ],
    (10, PLAYER_LOOP, "boost"): [
        {"q": "Why is gravity in Game?",
         "options": ["Pixelhead is rebuilt each level, Game is not", "It is shorter",
                     "Player cannot hold numbers", "So it falls faster"], "answer": 0,
         "why": "A change to gravity has to last from level to level."},
        {"q": "Boosting, Pixelhead goes up 5 and down 1. How far each loop?",
         "options": ["Up 4", "Up 5", "Up 6", "Down 1"], "answer": 0,
         "why": "5 - 1 = 4."},
        {"q": "How long is a boost of 40 loops? (this week)",
         "options": ["Two-thirds of a second", "40 seconds", "4 seconds",
                     "One second"], "answer": 0,
         "why": "60 loops is one second."},
    ],
    (11, PLAYER_LOOP, "follow"): [
        {"q": "When is an elif asked?",
         "options": ["Only when every question above it was no", "Always",
                     "Only when the one above was yes", "Never"], "answer": 0,
         "why": "Python runs the first branch that is true."},
        {"q": "With 3 balloons, is game.balloonCount >= 2 true?",
         "options": ["Yes", "No", "Only once", "It is an error"], "answer": 0,
         "why": "&gt;= means at least; 3 is at least 2."},
        {"q": "Why does one touch pop all three? (this week)",
         "options": ["The touch lasts several loops", "There is a bug in Python",
                     "The virus is too big", "The balloons are connected"], "answer": 0,
         "why": "Every loop the pictures overlap pops one more balloon."},
    ],
    (12, LEVEL2_START, "enemies"): [
        {"q": "When does an if with and run?",
         "options": ["When both questions are true", "When either is true",
                     "Never", "Always"], "answer": 0,
         "why": "and needs both."},
        {"q": "The safety timer is set to 90. How long are you safe?",
         "options": ["A second and a half", "90 seconds", "9 seconds",
                     "Half a second"], "answer": 0,
         "why": "60 loops is one second."},
        {"q": "Why do Level1's viruses ignore their random place? (this week)",
         "options": ["The room sets x and y after their start", "random is broken",
                     "They are persistent", "Level1 has no random"], "answer": 0,
         "why": "Level1's own x and y lines run last, so they win."},
    ],
    (13, PLAYER_LOOP, "enemy"): [
        {"q": "Why was a balloon stuck in the middle of level 2?",
         "options": ["Player start always built three", "A virus took it",
                     "Gravity", "It was persistent"], "answer": 0,
         "why": "The count said two, so b1 was built but never moved."},
        {"q": "What is the gravity with one balloon left?",
         "options": ["2", "1", "1.5", "0"], "answer": 0,
         "why": "Fewer balloons, more gravity: 1, 1.5, then 2."},
        {"q": "What makes a stomp a bounce? (this week)",
         "options": ["self.boostTimer = 30", "game.gravity = 2",
                     "destroy(enemyHit)", "self.y = 0"], "answer": 0,
         "why": "The boost timer you already had lifts Pixelhead for 30 loops."},
    ],
    (14, OVER_LOOP, "restart"): [
        {"q": "Which two things end the game?",
         "options": ["The last balloon pops, or you fall off the bottom",
                     "Pressing space, or a bubble", "A stomp, or a bubble",
                     "Level 2, or the win screen"], "answer": 0,
         "why": "Both go to set_room('GameOver')."},
        {"q": "How long is key_is_pressed True?",
         "options": ["As long as the key is held", "One loop", "Never",
                     "Until the next room"], "answer": 0,
         "why": "It is True for every loop the key is down."},
        {"q": "Why reset game.enemiesNumber? (this week)",
         "options": ["A virus left over would stop the count reaching 0",
                     "To make it faster", "It resets itself", "To save memory"], "answer": 0,
         "why": "Without it, level 2 never comes."},
    ],
    (15, WIN_START, "screen"): [
        {"q": "Where should a sound be loaded?",
         "options": ["In start, once", "In loop", "In the room", "Anywhere"], "answer": 0,
         "why": "Load once; play as often as you like."},
        {"q": "What does alpha = 0.5 do?",
         "options": ["Half see-through", "Half size", "Half speed",
                     "Hides it"], "answer": 0,
         "why": "alpha is how solid a picture is."},
        {"q": "Why does the flash need an else? (this week)",
         "options": ["Otherwise Pixelhead stays see-through", "Python needs one",
                     "To play a sound", "It does not"], "answer": 0,
         "why": "The else puts it back to solid once the timer runs out."},
    ],
}

EXPANDED_WEEKS = set(range(1, 16))
