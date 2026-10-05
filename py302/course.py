"""PY302 - Strategy Game. The whole course as one data structure.

This is the only file to edit. ../pxp101/build.py replays WEEKS to produce the
playable milestones, the teacher curriculum, the textbook, the homework book
and the slides, so none of them can drift apart. Run `python build.py` here.

WHERE THIS COMES FROM

The UTG PY302 guide: a lane-battle strategy game in PixelPad. Your three bases
stand on the left, the enemy's one on the right, and three bridges cross the
river between. Click a card to send a slime down its lane; the enemy base
sends bats, and now and then a golem, back. Units that meet fight, a unit that
reaches a base strikes it, and the first side to lose a base loses the game.
A cap on your army, a mana bar that shows it, a start screen with Easy and
Hard, and a ghost that walks through the fighting finish it. The game, its
classes and its order are the guide's; the guide's extra-time tasks are the
bonuses.

WHAT CHANGED FROM THE GUIDE, AND WHY

  * The guide builds everything in Game start and moves it into a Play room
    with copy, paste and delete on day 10. Here Play exists from week 1, so
    nothing is typed twice, and Game only ever holds what every room needs:
    the two sides of the field and the army cap.
  * The guide's LeftSide and RightSide become game.leftSide and
    game.rightSide - lower case first, like every other name the class types.
  * The guide places three bases and three bridges one line at a time. Here
    one for loop over the three lane heights makes both, because typing the
    same four lines three times is the thing loops are for.
  * The guide's start screen is a room called Start, which makes a code tab
    called "Start start". Here it is Menu.
  * The guide moves units right with x += 1 and then writes an if/else on the
    team to send the enemy left. Here a unit moves by self.speed, and an enemy
    is given a minus speed - a minus number walks the other way - so the line
    typed in week 4 never has to be taken out.
  * The guide has the enemy's units die after a base hit only on day 14.
    Here every unit spends itself on the base it strikes from week 7, so a
    single slime never wins the game by standing still on a base.
  * The guide prints, hovers without clicking and destroys on any touch
    before it builds the real code. Here each is a question asked in the
    talk, not code typed and then taken out.
  * The guide's ghost card picks its lane with an if/else and pays for itself
    in Unit. Here the card carries its own lane and cost, so the ghost card
    is the same Card with four values changed.
  * The guide flips the card and the units with scaleX. Here the art is drawn
    facing right, so only the enemy is flipped - with -1, and the golem with
    -2, which is week 11's question.
  * The golem's health bar flashes in the middle of the screen for one frame
    in the guide, which fixes it on day 15. Here the flash is seen and fixed
    in week 14, once the class can say why it happens.
  * The guide's day 9 is a review on an outside quiz site. That stays as a
    teacher note and week 8's bonus; nothing in the course depends on it.
"""

import re

import pixelpad

COURSE_CODE = "PY302"
TOOL = "py302"
AUDIENCE = "eleven-to-fourteen-year-olds"

# The guide's busiest day types about twenty lines. A week may not add more.
WEEK_LINE_CAP = 20
# One step shows at most this many lines before it stops to explain.
MAX_STEP_LINES = 6
# Indentation and one-line ifs - see pixelpad.check_python_rules.
check_code_rules = pixelpad.check_python_rules

DRAW_SIZE_NOTE = ("Draw it at this size. A sprite sheet is its frames side by side in a grid: "
                  "the slime, the bat, the golem and the ghost are each 1 row of 8 frames, "
                  "every frame 60 by 60.")

CODE_HEADS = {"get_collision": "get_collision()", "get_collision_list": "get_collision_list()",
              "mouse_x": "mouse_x()", "mouse_y": "mouse_y()",
              "mouse_was_pressed": "mouse_was_pressed()", "key_was_pressed": "key_was_pressed()",
              "destroy": "destroy()", "set_room": "set_room()", "text": "text()",
              "randint": "random.randint()", "min": "min()", "max": "max()",
              "animation": "animation()", "animation_set": "animation_set()"}

COURSE_TITLE = "PY302 · Strategy Game"
COURSE_BLURB = (
    "Fifteen weeks building a lane-battle strategy game in Python. Send slimes down "
    "three lanes, hold off bats and golems, and knock down the enemy's base before it "
    "knocks down yours. You write every line."
)
PROJECT_BLURB = (
    "A lane-battle strategy game. Click a card to send a slime down its lane; the enemy "
    "base sends bats, and now and then a golem, back. Units that meet fight, units that "
    "reach a base strike it, and health bars show who is winning. Your army has a cap, "
    "a mana bar shows what is left, a start screen picks Easy or Hard, and a ghost walks "
    "straight through the battle."
)

TOTAL_WEEKS = 15

# The finished game is about 170 lines. This is the ceiling, not a target.
LINE_BUDGET = 190
BONUS_BUDGET = 60

DISCLAIMER = """
<p><strong>Nothing here needs the internet except the code editor itself.</strong> The
game runs entirely in the browser - there is no server, no account and no API key anywhere
in this course.</p>
<p><strong>The students draw the art.</strong> Every sprite is listed with the exact size
to draw it. The generated games use plain coloured rectangles as stand-ins so the code can
be tested; they are meant to be replaced. The slime, the bat, the golem and the ghost are
sprite sheets - eight frames in one picture - and week 3 explains how to draw one.</p>
<p><strong>This game is played with the mouse, and one key.</strong> Click into the game
before you click a card. After a win or a loss, the space bar starts another round.</p>
"""

TEACHER_PREAMBLE = """
<p><strong>Ask before you tell.</strong> The guide this course comes from is built on
questions - which class does this belong to, start or loop, what will happen if - and every
hour here keeps at least three of them. Let a student answer before the slide does.</p>
<p><strong>Send them to the documentation.</strong> The guide's habit is worth keeping:
before a slide shows get_collision_list(), min(), key_was_pressed() or text(), give the
class two minutes to find it in the PixelPad documentation themselves. The slide is the
answer they check against.</p>
<p><strong>Let the bugs happen.</strong> Several steps are typed so that something goes
wrong on purpose: the slime walks straight off the screen, the enemy walks the wrong way,
the golem's health bar flashes in the middle. The book says what they should see. Ask why
before you fix it - that conversation is the lesson.</p>
<p><strong>Play each other.</strong> A strategy game is only tested by playing it. From
week 7 there is a win and a loss; give the last five minutes of an hour to swapping seats
and playing a classmate's game, and ask what they would change.</p>
<p><strong>The review day.</strong> The guide spends day 9 on a review quiz. It is week
8's bonus here; if your class is ahead, give it a whole hour before the army cap arrives
in week 9.</p>
<p><strong>Pacing.</strong> A week that runs long drops its bonus, never its Play moments.
Weeks 1, 7 and 10 are the busiest; give them the whole hour. Weeks 9, 11 and 14 are light
on purpose - use the spare time to draw, and to play.</p>
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
BACK_START = "Background start"
BASE_START, BASE_LOOP = "Base start", "Base loop"
BRIDGE_START = "Bridge start"
CARD_START, CARD_LOOP = "Card start", "Card loop"
UNIT_START, UNIT_LOOP = "Unit start", "Unit loop"
CURSOR_START, CURSOR_LOOP = "Cursor start", "Cursor loop"
BAR_START = "HealthBar start"
MANA_START = "ManaBar start"
BUTTON_START, BUTTON_LOOP = "DifficultyButton start", "DifficultyButton loop"
PLAY_START, PLAY_LOOP = "Play start", "Play loop"
WIN_START, WIN_LOOP = "YouWin start", "YouWin loop"
LOSE_START, LOSE_LOOP = "YouLose start", "YouLose loop"
MENU_START = "Menu start"

PANELS = [GAME_START,
          BACK_START,
          BASE_START, BASE_LOOP,
          BRIDGE_START,
          CARD_START, CARD_LOOP,
          UNIT_START, UNIT_LOOP,
          CURSOR_START, CURSOR_LOOP,
          BAR_START,
          MANA_START,
          BUTTON_START, BUTTON_LOOP,
          PLAY_START, PLAY_LOOP,
          WIN_START, WIN_LOOP,
          LOSE_START, LOSE_LOOP,
          MENU_START]

# Play is there from week 1; YouWin and YouLose arrive in week 7, Menu in week 10.
ROOMS = ["Play", "YouWin", "YouLose", "Menu"]

ORDER = {
    GAME_START: ["sides", "count", "room"],
    BACK_START: ["look"],
    BASE_START: ["look", "team", "health"],
    # import goes at the very top of the code that uses it. Everything from
    # "enemy" to "ramp" sits inside the spawn's if; the golem is a second roll
    # made after the bat is set up, so it can change what the bat chose.
    BASE_LOOP: ["import", "spawn", "enemy", "golem", "reset", "bar", "over"],
    BRIDGE_START: ["look"],
    CARD_START: ["look"],
    CARD_LOOP: ["click", "make", "ghost"],
    UNIT_START: ["look", "setup"],
    # Move, then fight, then strike, then show the bar - and only then ask
    # whether this unit is dead, so nothing below the die block runs on it.
    UNIT_LOOP: ["march", "path", "fight", "strike", "bar", "die"],
    CURSOR_START: ["look"],
    CURSOR_LOOP: ["follow"],
    BAR_START: ["look"],
    MANA_START: ["look"],
    BUTTON_START: ["look"],
    BUTTON_LOOP: ["click"],
    # The background is made first so it is drawn first, at the back.
    PLAY_START: ["back", "lanes", "enemy", "cards", "ghost", "count", "mana", "cursor"],
    PLAY_LOOP: ["mana"],
    WIN_START: ["screen", "hint"],
    WIN_LOOP: ["restart"],
    LOSE_START: ["screen", "hint"],
    LOSE_LOOP: ["restart"],
    MENU_START: ["labels", "buttons"],
}

# name -> (stand-in colour, width, height) as the student draws it. A sprite
# sheet is the whole grid: 1 row of 8 frames of 60 x 60 is 480 x 60.
SPRITES = {
    "background.png": ("dgreen", 1280, 720),
    "base.png": ("brown", 120, 120),
    "bridge.png": ("gray", 160, 80),
    "slimeCard.png": ("cyan", 90, 120),
    "mouseCollider.png": ("red", 10, 10),
    "slimeUnit.png": ("green", 480, 60),
    "bat.png": ("purple", 480, 60),
    "healthBar.png": ("red", 100, 12),
    "button.png": ("orange", 300, 120),
    "golem.png": ("dark", 480, 60),
    "ghostCard.png": ("white", 90, 120),
    "ghost.png": ("white", 480, 60),
    "manaBar.png": ("blue", 600, 20),
}


WEEKS = [

# ---------------------------------------------------------------- week 1 ----
{
 "n": 1,
 "title": "The battlefield",
 "big_idea": "A strategy game starts with its map. Today you build the field - a background, three bases of yours, three bridges and the enemy's base - and a [[for]] loop places the three lanes so you only type them once.",
 "new_concepts": ["class", "room", "game.", "for over a list"],
 "draw": ["background.png", "base.png", "bridge.png"],
 "objectives": [
   "Make objects in a [[room]], and go to it from Game",
   "Keep a number every class can reach with [[game]].",
   "Repeat lines once for each value in a [[list]] with [[for]]",
   "Change one object after it is made with the [[dot]]",
 ],
 "ops": [
  ADD(BACK_START, "look", [
    "self.image = sprite('background.png')",
  ]),
  ADD(PLAY_START, "back", [
    "Background()",
  ]),
  ADD(GAME_START, "sides", [
    "game.leftSide = -400",
    "game.rightSide = 500",
  ]),
  ADD(GAME_START, "room", [
    "set_room('Play')",
  ]),
  ADD(BASE_START, "look", [
    "self.image = sprite('base.png')",
    "self.x = game.leftSide",
  ]),
  ADD(BRIDGE_START, "look", [
    "self.image = sprite('bridge.png')",
    "self.x = 50",
  ]),
  ADD(PLAY_START, "lanes", [
    "for laneY in [250, 0, -250]:",
    "    base = Base()",
    "    base.y = laneY",
    "    bridge = Bridge()",
    "    bridge.y = laneY",
  ]),
  ADD(PLAY_START, "enemy", [
    "enemyBase = Base()",
    "enemyBase.x = game.rightSide",
  ]),
 ],
 "flow": [
  TALK("0:00", "Play the game you are going to build",
       "<p>Open the week 15 page and play the finished strategy game on the board for three "
       "minutes. Pick Easy. Click the cards on the left; watch the bats come back.</p>",
       "<p>Say the promise: <em>every line of that game, you are going to write.</em></p>",
       ask=("What different kinds of thing can you see?",
            "Bases, bridges, cards, slimes, bats, a golem, health bars - each kind is a class")),
  TALK("0:06", "Classes and rooms",
       "<p>Make the classes <strong>Background</strong>, <strong>Base</strong> and "
       "<strong>Bridge</strong>, and a room called <strong>Play</strong>. Capitals matter. "
       "Draw <code>background.png</code> at 1280 by 720, <code>base.png</code> at 120 by "
       "120 and <code>bridge.png</code> at 160 by 80 - ten minutes, the art can get better "
       "any week.</p>"),
  STEP(BACK_START, "look", "The background's picture",
       ["[[start]] runs once, the moment a Background is made: give it the picture you drew."],
       at="0:16"),
  STEP(PLAY_START, "back", "Make it in Play",
       ["The Play [[room]] makes the background first, so it is drawn at the back."],
       at="0:18"),
  STEP(GAME_START, "sides", "Where the two sides stand",
       ["Your bases stand at x -400 and the enemy's at 500. [[game]]. keeps the numbers "
        "where every class can reach them, so the field is described once."],
       at="0:20",
       ask=("Why not just type -400 in the Base class?",
            "The cards and the units need it too - change it here and everything follows")),
  STEP(GAME_START, "room", "Go to Play",
       ["The Game class runs first, when you press Play. set_room changes to the Play room."],
       at="0:24"),
  STEP(BASE_START, "look", "A base",
       ["Every base gets the picture you drew and stands on your side - the left."],
       at="0:26"),
  STEP(BRIDGE_START, "look", "A bridge",
       ["The bridges cross the river at x 50, halfway between the two sides."],
       at="0:28"),
  TALK("0:30", "Three of everything",
       "<p>You need a base and a bridge in each of three lanes, at y 250, 0 and -250. "
       "That is the same four lines three times, with one number changed.</p>",
       "<p>A [[list]] is values in square brackets. <code>for laneY in [250, 0, -250]:</code> "
       "runs the lines under it once for each value, and each time laneY holds the next "
       "one.</p>",
       ask=("How many times do the lines under the for run?",
            "Three - once for each number in the list")),
  STEP(PLAY_START, "lanes", "Three lanes in one loop",
       ["Under the background: once for every lane height, make a base and a bridge and move "
        "both to that height. base is only a name for right now - the next time round it "
        "names the next base."],
       at="0:34"),
  STEP(PLAY_START, "enemy", "The enemy's base",
       ["After the loop: one more base, moved across to the enemy's side with the [[dot]]."],
       at="0:42",
       ask=("Where is the enemy base up and down? Why?",
            "In the middle - y starts at 0, and nothing moved it")),
 ],
 "errors": [
   ("NameError: name 'Base' is not defined", "The class must be called Base exactly - capital B."),
   ("AttributeError: 'Game' has no attribute 'leftSide'", "game.leftSide = -400 goes in Game start, ABOVE set_room('Play')."),
   ("Only one base", "The four lines under the for start with four spaces, so all of them repeat."),
   ("The bases are hidden", "Background() goes at the very top of Play start, so it is drawn first."),
 ],
 "recap": [
   "A [[room]] builds what is in it; set_room picks the room.",
   "[[game]]. keeps a number every class can reach.",
   "A [[list]] holds values in square brackets; [[for]] runs its lines once for each.",
   "The [[dot]] changes one object after it is made.",
 ],
 "homework": [
   {"task": "Four lanes", "detail": "What would you change to have four lanes instead of three?", "done": "Add a fourth height to the list, like [300, 100, -100, -300]."},
   {"task": "Count the lines", "detail": "Without the loop, how many lines would Play start need for the three lanes?", "done": "Twelve - four for each lane."},
 ],
 "bonus": {"title": "A river",
           "body": "<p>Draw a river down the middle of background.png, under the bridges, so "
                   "the bridges look like they cross something.</p>"},
 "slides": [
   {"title": "Classes and rooms", "sub": "background.png 1280 x 720 - base.png 120 x 120 - bridge.png 160 x 80", "bullets": [
     "Background, Base, Bridge", "A room called Play", "Capitals matter"]},
   {"title": "The background's picture", "bullets": [], "code": [(BACK_START, "look")]},
   {"title": "Make it in Play", "bullets": [], "code": [(PLAY_START, "back")]},
   {"title": "Where the two sides stand", "bullets": [], "code": [(GAME_START, "sides")]},
   {"title": "Go to Play", "bullets": [], "code": [(GAME_START, "room")]},
   {"title": "Checkpoint: the field", "checkpoint": True,
    "say": "Press Play. Your background fills the screen."},
   {"title": "A base", "bullets": [], "code": [(BASE_START, "look")]},
   {"title": "A bridge", "bullets": [], "code": [(BRIDGE_START, "look")]},
   {"title": "Three of everything", "sub": "A list, and a for", "bullets": [
     "[250, 0, -250] is a list", "for runs once for each value", "laneY holds the value"]},
   {"title": "Three lanes in one loop", "bullets": [], "code": [(PLAY_START, "lanes")]},
   {"title": "Checkpoint: three lanes", "checkpoint": True,
    "say": "Press Play. Three bases stand on the left, and three bridges cross the middle."},
   {"title": "The enemy's base", "bullets": [], "code": [(PLAY_START, "enemy")]},
   {"title": "Checkpoint: two sides", "checkpoint": True,
    "say": "Press Play. The enemy's base stands on the right, level with your middle base."},
 ],
},

# ---------------------------------------------------------------- week 2 ----
{
 "n": 2,
 "title": "Cards and a cursor",
 "big_idea": "You play this game by clicking cards. A card is just an object with a picture - and to know when the mouse is on one, you give the mouse an object of its own that follows it everywhere.",
 "new_concepts": ["local names", "mouse_x() and mouse_y()", "the dot"],
 "draw": ["slimeCard.png", "mouseCollider.png"],
 "objectives": [
   "Make three objects from one class and place each one",
   "Use a name for right now to change an object",
   "Make an object follow the mouse with [[mouse_x]]() and mouse_y()",
   "Say why the mouse needs an object of its own",
 ],
 "ops": [
  ADD(CARD_START, "look", [
    "self.image = sprite('slimeCard.png')",
    "self.x = game.leftSide - 150",
  ]),
  ADD(PLAY_START, "cards", [
    "topCard = Card()",
    "topCard.y = 250",
    "bottomCard = Card()",
    "bottomCard.y = -250",
    "Card()",
  ]),
  ADD(CURSOR_START, "look", [
    "self.image = sprite('mouseCollider.png')",
  ]),
  ADD(CURSOR_LOOP, "follow", [
    "self.x = mouse_x()",
    "self.y = mouse_y()",
  ]),
  ADD(PLAY_START, "cursor", [
    "Cursor()",
  ]),
 ],
 "flow": [
  TALK("0:00", "Cards",
       "<p>Make a class called <strong>Card</strong> and draw <code>slimeCard.png</code> at "
       "90 by 120 - a card with a slime on it. Every card stands to the left of your "
       "bases, one in each lane.</p>",
       ask=("Your bases are at game.leftSide. How do you say 150 further left?",
            "game.leftSide - 150")),
  STEP(CARD_START, "look", "A card",
       ["Every card gets the slime picture and stands 150 to the left of your bases."],
       at="0:08"),
  STEP(PLAY_START, "cards", "Three cards",
       ["After the enemy base: make a card for the top lane and one for the bottom, each "
        "with a name for right now so the next line can move it. The middle one needs no "
        "name - y 0 is where every card starts."],
       at="0:11",
       ask=("Why does the middle card need no name?",
            "Nothing is changed after it is made, so nothing needs to talk to it")),
  TALK("0:18", "How does a card know it is clicked?",
       "<p>The game can tell when two objects touch. So give the mouse an object of its "
       "own - a tiny dot that goes wherever the mouse goes - and next week a card can ask "
       "whether the dot is touching it.</p>",
       "<p>Make a class called <strong>Cursor</strong> and draw "
       "<code>mouseCollider.png</code> at 10 by 10.</p>"),
  STEP(CURSOR_START, "look", "The cursor's picture",
       ["The dot you drew."],
       at="0:24"),
  STEP(CURSOR_LOOP, "follow", "Follow the mouse",
       ["[[loop]] runs sixty times a second. Every time, go to the mouse: [[mouse_x]]() "
        "and mouse_y() give back where it is right now."],
       at="0:26",
       ask=("Put these two lines in start instead. What happens?",
            "The dot goes to the mouse once, when it is made, and stays there")),
  STEP(PLAY_START, "cursor", "Make the cursor",
       ["At the end of Play start: make the cursor. Made last, it is drawn on top of "
        "everything."],
       at="0:30"),
  TALK("0:33", "Play with it",
       "<p>Move the mouse over the game. The red dot follows it over the cards, the bases "
       "and the bridges.</p>",
       ask=("Move the mouse off the game. Where does the dot stay?",
            "Where the mouse last was over the game")),
 ],
 "errors": [
   ("Only one card", "topCard and bottomCard each have a line that changes their y."),
   ("The cards are on top of the bases", "self.x = game.leftSide - 150 - minus, not plus."),
   ("The dot does not move", "The two mouse lines go in Cursor LOOP, not start."),
   ("NameError: name 'mouse_X' is not defined", "mouse_x() is all small letters, with the brackets."),
 ],
 "recap": [
   "One class can make many objects; each can be moved after it is made.",
   "A name with no self. is only for right now.",
   "[[mouse_x]]() and mouse_y() say where the mouse is, right now.",
   "Made last is drawn on top.",
 ],
 "homework": [
   {"task": "Name it or not", "detail": "Which of the three cards could you not move after it was made? Why?", "done": "The middle one - Card() has no name to reach it by."},
   {"task": "A bigger dot", "detail": "Would a 100 by 100 cursor be better or worse? Why?", "done": "Worse - it would touch two things at once and you could not tell which you meant."},
 ],
 "bonus": {"title": "A fourth card",
           "body": "<p>Make a fourth card above the top one, at y 400. Can you see it? Why "
                   "not? (Take it out again afterwards.)</p>"},
 "slides": [
   {"title": "Cards", "sub": "slimeCard.png 90 x 120", "bullets": [
     "One in each lane", "150 left of your bases"]},
   {"title": "A card", "bullets": [], "code": [(CARD_START, "look")]},
   {"title": "Three cards", "bullets": [], "code": [(PLAY_START, "cards")]},
   {"title": "Checkpoint: three cards", "checkpoint": True,
    "say": "Press Play. A card stands to the left of each of your bases."},
   {"title": "How does a card know it is clicked?", "sub": "mouseCollider.png 10 x 10", "bullets": [
     "Give the mouse an object", "A card asks if it is touching it"]},
   {"title": "The cursor's picture", "bullets": [], "code": [(CURSOR_START, "look")]},
   {"title": "Follow the mouse", "bullets": [], "code": [(CURSOR_LOOP, "follow")]},
   {"title": "Make the cursor", "bullets": [], "code": [(PLAY_START, "cursor")]},
   {"title": "Checkpoint: a red dot", "checkpoint": True,
    "say": "Press Play and move the mouse over the game. A red dot follows it everywhere."},
 ],
},

# ---------------------------------------------------------------- week 3 ----
{
 "n": 3,
 "title": "A slime from a card",
 "big_idea": "Click a card and a slime appears. The card asks two questions every loop - is the cursor touching me, and was the button just pressed - and only when both are yes does it make a unit.",
 "new_concepts": ["sprite sheets and animation", "get_collision()", "and", "mouse_was_pressed()"],
 "draw": ["slimeUnit.png"],
 "objectives": [
   "Cut a sprite sheet into frames and play them with [[animation]]()",
   "Ask whether two objects touch with [[get_collision]]()",
   "Join two questions with [[and]]",
   "Say why mouse_was_pressed() makes one slime per click",
 ],
 "ops": [
  ADD(UNIT_START, "look", [
    "slimeSheet = sprite('slimeUnit.png', 1, 8)",
    "slimeAnimation = animation(slimeSheet, 20, 0, 7)",
    "animation_set(self, slimeAnimation)",
  ]),
  ADD(CARD_LOOP, "click", [
    "cardClicked = get_collision(self, 'Cursor')",
    "if cardClicked and mouse_was_pressed('left'):",
  ]),
  ADD(CARD_LOOP, "make", [
    "    unit = Unit()",
    "    unit.x = game.leftSide",
    "    unit.y = self.y",
  ]),
  ADD(CURSOR_START, "look", [
    "self.visible = False",
  ]),
 ],
 "flow": [
  TALK("0:00", "A sprite sheet",
       "<p>Make a class called <strong>Unit</strong>. A slime that wobbles is eight "
       "pictures shown one after another. You draw all eight side by side in ONE picture - "
       "a sprite sheet: <code>slimeUnit.png</code>, 480 by 60, eight frames of 60 by 60.</p>",
       "<p>Draw the slime facing RIGHT - it walks towards the enemy.</p>",
       ask=("If the slime is shown 20 frames a second, how long does its wobble take?",
            "Eight frames at 20 a second - under half a second")),
  STEP(UNIT_START, "look", "A slime that wobbles",
       ["sprite('slimeUnit.png', 1, 8) cuts the picture into 1 row of 8 frames. "
        "[[animation]] plays frames 0 to 7, 20 a second, and animation_set gives it to this "
        "unit."],
       at="0:15"),
  TALK("0:18", "Two questions",
       "<p>The card has to ask: is the cursor touching me? [[get_collision]](self, "
       "'Cursor') gives back the cursor if it is, and False if not. And: was the button "
       "just pressed? [[and]] joins the two questions - the if runs only when both are "
       "yes.</p>",
       ask=("Leave out the mouse question. What would happen?",
            "A slime every time the mouse passed over a card - no click needed")),
  STEP(CARD_LOOP, "click", "Is the card clicked?",
       ["Ask whether the cursor touches this card, and keep the answer in a name for right "
        "now. Then the if: touching AND the button just went down."],
       at="0:22"),
  STEP(CARD_LOOP, "make", "Make a unit",
       ["Under the if, pushed in four spaces: make a unit, put it at your bases, and at this "
        "card's height - self.y is the y of the card that was clicked."],
       at="0:26",
       ask=("Why self.y and not 250?",
            "One Card class makes all three cards - self.y is whichever card was clicked")),
  TALK("0:31", "Once per click",
       "<p>[[mouse_was_pressed('left')|mouse_was_pressed]] is True for only the ONE loop "
       "the button goes down. Hold it as long as you like: one click, one slime.</p>"),
  STEP(CURSOR_START, "look", "Hide the dot",
       ["The red dot was for checking. [[visible]] = False stops it being drawn - but it "
        "still follows the mouse, and the cards can still touch it."],
       at="0:35"),
 ],
 "errors": [
   ("One frame, no wobble", "sprite('slimeUnit.png', 1, 8) - the 1 and the 8 cut the sheet into frames."),
   ("A slime every loop while you hold the button", "mouse_was_pressed, not mouse_is_pressed."),
   ("Nothing happens on click", "'Cursor' in get_collision has a capital C, like the class."),
   ("IndentationError", "The three lines under the if start with four spaces."),
 ],
 "recap": [
   "A sprite sheet is many frames in one picture; [[animation]] plays them.",
   "[[get_collision]] gives back what you touch, or False.",
   "[[and]] needs both questions to be yes.",
   "[[mouse_was_pressed]] is True for one loop - one click, one slime.",
 ],
 "homework": [
   {"task": "Faster wobble", "detail": "Which number makes the slime wobble twice as fast?", "done": "The 20 in animation - make it 40."},
   {"task": "Hidden but there", "detail": "The dot is hidden. Explain why the cards still work.", "done": "visible only stops it being drawn; it still moves and still touches the cards."},
 ],
 "bonus": {"title": "A puff",
           "body": "<p>Draw a second sheet of a slime squashing, and play it on the card's "
                   "own picture for a moment when you click. Which class does that code "
                   "belong in?</p>"},
 "slides": [
   {"title": "A sprite sheet", "sub": "slimeUnit.png 480 x 60 - 8 frames of 60 x 60", "bullets": [
     "Eight pictures in one", "Facing right"]},
   {"title": "A slime that wobbles", "bullets": [], "code": [(UNIT_START, "look")]},
   {"title": "Two questions", "sub": "Touching? Just clicked?", "bullets": [
     "get_collision gives back the cursor or False", "and needs both"]},
   {"title": "Is the card clicked?", "bullets": [], "code": [(CARD_LOOP, "click")]},
   {"title": "Make a unit", "bullets": [], "code": [(CARD_LOOP, "make")]},
   {"title": "Checkpoint: slimes", "checkpoint": True,
    "say": "Press Play and click a card. A wobbling slime appears on the base beside it."},
   {"title": "Once per click", "sub": "mouse_was_pressed()", "bullets": [
     "True for one loop", "Hold the button: still one slime"]},
   {"title": "Hide the dot", "bullets": [], "code": [(CURSOR_START, "look")]},
   {"title": "Checkpoint: no dot", "checkpoint": True,
    "say": "Press Play. The red dot is gone, but clicking a card still makes a slime."},
 ],
},

# ---------------------------------------------------------------- week 4 ----
{
 "n": 4,
 "title": "Down the lanes",
 "big_idea": "A slime marches by its speed, and the outer lanes bend in towards the enemy. [[min]]() and [[max]]() pick the smaller and the bigger of two numbers - which is all a bend in the road needs.",
 "new_concepts": ["speed", "min() and max()", "elif"],
 "draw": [],
 "objectives": [
   "Move an object by a [[variable]] it keeps",
   "Pick the smaller of two numbers with [[min]]() and the bigger with [[max]]()",
   "Choose between paths with [[if]] and [[elif]]",
   "Pass a value from one object to another",
 ],
 "ops": [
  ADD(UNIT_START, "setup", [
    "self.speed = 2",
    "self.lane = 2",
  ]),
  ADD(UNIT_LOOP, "march", [
    "self.x += self.speed",
  ]),
  ADD(CARD_START, "look", [
    "self.lane = 2",
  ]),
  ADD(PLAY_START, "cards", [
    "topCard.lane = 1",
    "bottomCard.lane = 3",
  ]),
  ADD(CARD_LOOP, "make", [
    "    unit.lane = self.lane",
  ]),
  ADD(UNIT_LOOP, "path", [
    "if self.lane == 1:",
    "    self.y = min(250, game.rightSide - self.x)",
    "elif self.lane == 3:",
    "    self.y = max(-250, self.x - game.rightSide)",
  ]),
 ],
 "flow": [
  TALK("0:00", "Marching",
       "<p>A unit needs a speed: how far it moves every loop. Keep it in a [[variable]], "
       "because later units will move at different speeds.</p>",
       ask=("Speed 2 at sixty loops a second - how far in one second?",
            "120 - two, sixty times")),
  STEP(UNIT_START, "setup", "A speed and a lane",
       ["Under the animation: move 2 every loop, and remember which lane you walk in - "
        "2, the middle, unless you are told otherwise."],
       at="0:05"),
  STEP(UNIT_LOOP, "march", "March",
       ["Every loop, move right by your speed."],
       at="0:08",
       ask=("Click the top card. Where does its slime walk?",
            "Straight along the top, past the enemy base and off the screen")),
  TALK("0:12", "Which lane?",
       "<p>The cards know which lane they are in, and the units have to be told. A card "
       "passes its lane to the unit it makes.</p>"),
  STEP(CARD_START, "look", "Every card has a lane",
       ["Under the picture: every card starts in lane 2."],
       at="0:14"),
  STEP(PLAY_START, "cards", "The top and bottom lanes",
       ["Under the cards: the top card is lane 1...",
        "...and the bottom card lane 3. The middle card keeps its 2."],
       at="0:16"),
  STEP(CARD_LOOP, "make", "Pass the lane on",
       ["At the end, still under the if: the new unit walks in this card's lane."],
       at="0:19"),
  TALK("0:21", "A bend in the road",
       "<p>The enemy base stands in the middle. A top-lane slime walks along y 250, and "
       "when it is close it has to bend down to reach the base.</p>",
       "<p>[[min]](250, number) gives back whichever is smaller. Far away, "
       "<code>game.rightSide - self.x</code> is bigger than 250, so y stays 250. Close to "
       "the base it shrinks below 250 - and y goes down with it, all the way to 0. "
       "[[max]] does the same for the bottom lane, from below.</p>",
       ask=("A top slime is at x 300. What is its y?",
            "500 - 300 is 200, smaller than 250, so 200")),
  STEP(UNIT_LOOP, "path", "Bend towards the base",
       ["Lane 1: the smaller of 250 and the distance left - flat, then down to the base. "
        "Lane 3 is the mirror: the bigger of -250 and minus that distance - flat, then up. "
        "[[elif]] is only asked when the first question was no. Lane 2 needs nothing."],
       at="0:28"),
  TALK("0:36", "Send an army",
       "<p>Click all three cards, over and over. Every slime walks its lane and meets the "
       "others at the enemy base - and then walks on through it, off the screen. The enemy "
       "fights back next week.</p>"),
 ],
 "errors": [
   ("Every slime walks the middle", "unit.lane = self.lane goes under the if in Card loop, pushed in four spaces."),
   ("The top slime walks along the bottom", "Lane 1 uses min and 250; lane 3 uses max and -250."),
   ("NameError: name 'speed' is not defined", "It is self.speed - in start and in loop."),
   ("SyntaxError on elif", "elif lines up with its if, and ends with a colon."),
 ],
 "recap": [
   "An object moves by a [[variable]] it keeps.",
   "[[min]]() gives back the smaller number, [[max]]() the bigger.",
   "[[elif]] is asked only when the question above it was no.",
   "One object can pass a value to another it makes.",
 ],
 "homework": [
   {"task": "Work it out", "detail": "A bottom-lane slime is at x 400. What is its y?", "done": "400 - 500 is -100, bigger than -250, so -100."},
   {"task": "Why no lane 2?", "detail": "Why does the path code say nothing about lane 2?", "done": "A middle slime stays at y 0, where it started - there is no bend to make."},
 ],
 "bonus": {"title": "A faster card",
           "body": "<p>Give Card a <code>self.speed</code> too, pass it to the unit like the "
                   "lane, and make the bottom card's slimes walk at 4.</p>"},
 "slides": [
   {"title": "Marching", "sub": "Speed is how far every loop", "bullets": [
     "Kept in a variable", "Speed 2: 120 a second"]},
   {"title": "A speed and a lane", "bullets": [], "code": [(UNIT_START, "setup")]},
   {"title": "March", "bullets": [], "code": [(UNIT_LOOP, "march")]},
   {"title": "Checkpoint: they march", "checkpoint": True,
    "say": "Press Play and click a card. The slime walks straight to the right, off the screen."},
   {"title": "Which lane?", "sub": "The card tells the unit", "bullets": [
     "Every card has a lane", "It passes it on"]},
   {"title": "Every card has a lane", "bullets": [], "code": [(CARD_START, "look")]},
   {"title": "The top and bottom lanes", "bullets": [], "code": [(PLAY_START, "cards")]},
   {"title": "Pass the lane on", "bullets": [], "code": [(CARD_LOOP, "make")]},
   {"title": "A bend in the road", "sub": "min() and max()", "bullets": [
     "min(250, 400) is 250", "min(250, 200) is 200", "max does the same from below"]},
   {"title": "Bend towards the base", "bullets": [], "code": [(UNIT_LOOP, "path")]},
   {"title": "Checkpoint: three lanes", "checkpoint": True,
    "say": "Press Play and click all three cards. The top and bottom slimes bend in to meet at the enemy base."},
 ],
},

# ---------------------------------------------------------------- week 5 ----
{
 "n": 5,
 "title": "The enemy sends its own",
 "big_idea": "The enemy base runs a [[timer]]: every second it makes a unit of its own. Every unit knows its [[team]], and an enemy is given a minus speed - a minus number walks the other way.",
 "new_concepts": ["timer", "team", "a minus speed"],
 "draw": [],
 "objectives": [
   "Build a [[timer]]: set it, count it, check it, reset it",
   "Tell objects of one class apart with a [[team]]",
   "Join a timer question and a team question with [[and]]",
   "Send a unit the other way with a minus speed",
 ],
 "ops": [
  ADD(BASE_START, "team", [
    "self.team = 'player'",
    "self.spawnTimer = 0",
    "self.spawnTime = 60",
  ]),
  ADD(PLAY_START, "enemy", [
    "enemyBase.team = 'enemy'",
  ]),
  ADD(BASE_LOOP, "spawn", [
    "self.spawnTimer += 1",
    "if self.spawnTimer >= self.spawnTime and self.team == 'enemy':",
  ]),
  ADD(BASE_LOOP, "enemy", [
    "    enemy = Unit()",
    "    enemy.team = 'enemy'",
    "    enemy.x = self.x",
    "    enemy.speed = -2",
  ]),
  ADD(BASE_LOOP, "reset", [
    "    self.spawnTimer = 0",
  ]),
  ADD(UNIT_START, "setup", [
    "self.team = 'player'",
  ]),
 ],
 "flow": [
  TALK("0:00", "Which side are you on?",
       "<p>All four bases come from one Base class. To tell yours from the enemy's, every "
       "base keeps a [[team]]: words in quotes, 'player' or 'enemy'.</p>",
       ask=("Every Base runs the same code. How can only one of them make enemies?",
            "It asks which team it is on - only the enemy's answers yes")),
  STEP(BASE_START, "team", "A team, and a timer",
       ["Every base starts on your team. The [[timer]] starts at 0, and spawnTime is how "
        "many loops to wait - 60 is one second."],
       at="0:05"),
  STEP(PLAY_START, "enemy", "The enemy's team",
       ["Under the enemy base's x: it changes team. Start set 'player'; this line runs "
        "after start, so 'enemy' is what it keeps."],
       at="0:09"),
  TALK("0:11", "The four parts of a timer",
       "<p><strong>Set</strong> it in start, <strong>count</strong> it in loop, "
       "<strong>check</strong> it with an if, <strong>reset</strong> it. This if has two "
       "questions: has the timer run out AND is this the enemy's base?</p>"),
  STEP(BASE_LOOP, "spawn", "Count, and check",
       ["Every base counts one every loop. Only the enemy's, and only when it has counted "
        "far enough, goes on."],
       at="0:14"),
  STEP(BASE_LOOP, "enemy", "Make an enemy",
       ["Under the if: make a unit, put it on the enemy team at this base's x - and give it "
        "a speed of MINUS 2. self.x += self.speed adds -2: it walks left."],
       at="0:18",
       ask=("Why does the enemy need no new march code?",
            "Adding a minus number takes away - the same line walks it the other way")),
  STEP(BASE_LOOP, "reset", "Count again",
       ["Still under the if: back to 0, so the next enemy comes a second later."],
       at="0:23",
       ask=("Leave this line out. What happens?",
            "The timer stays past 60, so an enemy is made EVERY loop - a flood")),
  TALK("0:27", "Your units have a team too",
       "<p>A unit made by a card is yours, and one made by the enemy base is theirs. The "
       "enemy base sets its units' team as it makes them; yours need one to start with.</p>"),
  STEP(UNIT_START, "setup", "Every unit starts on your team",
       ["At the end of Unit start: 'player', unless the enemy base changes it."],
       at="0:30"),
  TALK("0:32", "Not much of a fight",
       "<p>Press Play. Every second a slime leaves the enemy base and walks left through "
       "your slimes as if they were not there. They are on different teams - next week they "
       "fight.</p>"),
 ],
 "errors": [
   ("Every base makes enemies", "enemyBase.team = 'enemy' goes in Play start, and the if asks self.team == 'enemy' - two = signs."),
   ("A flood of enemies", "self.spawnTimer = 0 goes inside the if, pushed in four spaces."),
   ("The enemies walk right", "enemy.speed = -2 - a minus sign."),
   ("AttributeError: 'Base' has no attribute 'spawnTimer'", "self.spawnTimer = 0 goes in Base START."),
 ],
 "recap": [
   "A [[timer]] is set, counted, checked and reset.",
   "A [[team]] in quotes tells objects of one class apart.",
   "[[and]] needs both questions to be yes.",
   "Adding a minus speed walks the other way.",
 ],
 "homework": [
   {"task": "Faster enemies", "detail": "What would you change to get an enemy every half a second?", "done": "self.spawnTime = 30 in Base start."},
   {"task": "Why only one?", "detail": "Your three bases count too. Explain why they never make enemies.", "done": "Their team is 'player', so the and is never true for them."},
 ],
 "bonus": {"title": "An enemy army",
           "body": "<p>Make the enemy base send two units at once: what has to change so "
                   "they do not stand on top of each other?</p>"},
 "slides": [
   {"title": "Which side are you on?", "sub": "A team", "bullets": [
     "'player' or 'enemy'", "Words in quotes"]},
   {"title": "A team, and a timer", "bullets": [], "code": [(BASE_START, "team")]},
   {"title": "The enemy's team", "bullets": [], "code": [(PLAY_START, "enemy")]},
   {"title": "The four parts of a timer", "sub": "Set, count, check, reset", "bullets": [
     "Set it in start", "Count it in loop", "Check it with an if", "Reset it"]},
   {"title": "Count, and check", "bullets": [], "code": [(BASE_LOOP, "spawn")]},
   {"title": "Make an enemy", "bullets": [], "code": [(BASE_LOOP, "enemy")]},
   {"title": "Count again", "bullets": [], "code": [(BASE_LOOP, "reset")]},
   {"title": "Checkpoint: they come", "checkpoint": True,
    "say": "Press Play. Every second a slime leaves the enemy base and walks left."},
   {"title": "Your units have a team too", "sub": "Yours unless told otherwise", "bullets": [
     "The enemy base sets its own", "Yours start as 'player'"]},
   {"title": "Every unit starts on your team", "bullets": [], "code": [(UNIT_START, "setup")]},
   {"title": "Not much of a fight", "sub": "They walk straight through", "bullets": [
     "Different teams", "Next week: they fight"]},
 ],
},

# ---------------------------------------------------------------- week 6 ----
{
 "n": 6,
 "title": "Bats, and a battle",
 "big_idea": "The enemy sends bats down a [[random]] lane, flipped to face you. When units of two teams touch, each takes the other's attack off its health - [[get_collision_list]]() finds everything you touch at once, and a [[for]] loop deals with each one.",
 "new_concepts": ["import and random", "flipping with scaleX", "get_collision_list()", "!="],
 "draw": ["bat.png"],
 "objectives": [
   "Pick a random lane with [[random.randint()|random]]",
   "Flip a picture with a minus [[scale]]",
   "Go through everything you touch with [[get_collision_list]]() and [[for]]",
   "Ask whether two things are different with [[!=|notequal]]",
 ],
 "ops": [
  ADD(BASE_LOOP, "import", [
    "import random",
  ]),
  ADD(BASE_LOOP, "enemy", [
    "    enemy.scaleX = -1",
    "    batSheet = sprite('bat.png', 1, 8)",
    "    batAnimation = animation(batSheet, 20, 0, 7)",
    "    animation_set(enemy, batAnimation)",
    "    enemy.lane = random.randint(1, 3)",
  ]),
  ADD(UNIT_START, "setup", [
    "self.health = 1",
    "self.attack = 1",
  ]),
  ADD(UNIT_LOOP, "fight", [
    "for otherUnit in get_collision_list(self, 'Unit'):",
    "    if otherUnit.team != self.team:",
    "        otherUnit.health -= self.attack",
  ]),
  ADD(UNIT_LOOP, "die", [
    "if self.health <= 0:",
    "    destroy(self)",
  ]),
 ],
 "flow": [
  TALK("0:00", "The enemy needs its own look",
       "<p>Draw <code>bat.png</code>: a sprite sheet of 8 frames of 60 by 60, 480 by 60 in "
       "all - and draw the bat facing RIGHT, like your slime.</p>",
       ask=("The bat walks left, but faces right. How could the code turn it round?",
            "Flip it - a minus scaleX draws the picture back to front")),
  STEP(BASE_LOOP, "import", "Bring in random",
       ["The VERY TOP of Base loop: [[import]] random brings in Python's random toolbox."],
       at="0:12"),
  STEP(BASE_LOOP, "enemy", "A bat in a random lane",
       ["At the end of the enemy lines, still under the if: scaleX -1 draws it back to "
        "front, facing you. Then the bat's sheet...",
        "...and its animation, in place of the slime's - and a lane picked at [[random]]: "
        "1, 2 or 3."],
       at="0:14",
       ask=("randint(1, 3) - can it pick 3?",
            "Yes - both ends can be picked")),
  TALK("0:20", "Health and attack",
       "<p>A fight needs two numbers on every unit: its health, and how much it takes off "
       "whatever it hits. A slime and a bat have 1 of each.</p>"),
  STEP(UNIT_START, "setup", "Health and attack",
       ["At the end of Unit start: one hit kills you, and you hit for one."],
       at="0:22"),
  TALK("0:24", "Everything you touch",
       "<p>In a crowd a unit can touch three enemies at once. [[get_collision_list]](self, "
       "'Unit') gives back a [[list]] of every unit you touch, and [[for]] takes them one at "
       "a time, calling each one otherUnit.</p>",
       "<p><code>!=</code> asks: are these different? A slime does not hit a slime.</p>",
       ask=("This code only takes health off the OTHER unit. Who takes it off this one?",
            "The other unit, in its own loop - every unit runs the same code")),
  STEP(UNIT_LOOP, "fight", "Fight everything you touch",
       ["Under the path: for every unit you are touching - if it is on the other team - take "
        "your attack off its health."],
       at="0:30"),
  STEP(UNIT_LOOP, "die", "Out of health",
       ["At the very end of Unit loop: at 0 health or less, this unit is [[destroy]]ed."],
       at="0:36",
       ask=("Why is this the LAST thing in Unit loop?",
            "Nothing below it should run on a unit that is gone")),
 ],
 "errors": [
   ("NameError: name 'random' is not defined", "import random goes at the very top of Base loop."),
   ("The bat faces away", "enemy.scaleX = -1 - a minus sign."),
   ("My slimes kill each other", "!= in the if, so only the other team is hit."),
   ("They walk straight through", "self.health and self.attack go in Unit start; the die if goes at the end of Unit loop."),
 ],
 "recap": [
   "[[random.randint()|random]] picks a whole number, both ends included.",
   "A minus [[scale]] flips the picture.",
   "[[get_collision_list]]() is everything you touch; [[for]] goes through it.",
   "[[!=|notequal]] asks whether two things are different.",
 ],
 "homework": [
   {"task": "Who hits whom?", "detail": "A slime and a bat touch. Whose loop takes the bat's health away?", "done": "The slime's - and the bat's loop takes the slime's."},
   {"task": "Only the middle", "detail": "What would you change so bats only come down the middle lane?", "done": "Take out the random lane - lane 2 is what every unit starts with."},
 ],
 "bonus": {"title": "A tougher slime",
           "body": "<p>Give your slimes 2 health. Who wins a fight now? Is it still a fair "
                   "game?</p>"},
 "slides": [
   {"title": "The enemy needs its own look", "sub": "bat.png 480 x 60 - 8 frames", "bullets": [
     "Facing right", "The code flips it"]},
   {"title": "Bring in random", "bullets": [], "code": [(BASE_LOOP, "import")]},
   {"title": "A bat in a random lane", "bullets": [], "code": [(BASE_LOOP, "enemy")]},
   {"title": "Checkpoint: bats", "checkpoint": True,
    "say": "Press Play. Bats leave the enemy base, facing you, each down a lane of its own."},
   {"title": "Health and attack", "sub": "Two numbers for a fight", "bullets": [
     "health: how much you can take", "attack: how much you hit for"]},
   {"title": "Health and attack", "bullets": [], "code": [(UNIT_START, "setup")]},
   {"title": "Everything you touch", "sub": "get_collision_list() and for", "bullets": [
     "A list of every unit you touch", "for takes them one at a time", "!= means different"]},
   {"title": "Fight everything you touch", "bullets": [], "code": [(UNIT_LOOP, "fight")]},
   {"title": "Out of health", "bullets": [], "code": [(UNIT_LOOP, "die")]},
   {"title": "Checkpoint: a battle", "checkpoint": True,
    "say": "Press Play and send slimes. When a slime meets a bat, both disappear."},
 ],
},

# ---------------------------------------------------------------- week 7 ----
{
 "n": 7,
 "title": "Win or lose",
 "big_idea": "A unit that reaches a base on the other team strikes it and is spent. A base keeps its own health, and the moment one falls the game changes [[room]] - to YouWin or to YouLose.",
 "new_concepts": ["a second room", "text()", "an if inside an if"],
 "draw": [],
 "objectives": [
   "Strike a base with [[get_collision]]() and two questions",
   "Write on the screen with [[text]]() and change its size and colour",
   "Put an [[if]] inside an if, with an [[else]]",
   "End the game by changing [[room]]",
 ],
 "ops": [
  ADD(BASE_START, "health", [
    "self.health = 25",
  ]),
  ADD(UNIT_LOOP, "strike", [
    "baseHit = get_collision(self, 'Base')",
    "if baseHit and baseHit.team != self.team:",
    "    baseHit.health -= self.attack",
    "    self.health = 0",
  ]),
  ADD(WIN_START, "screen", [
    "winText = text('You Win', -380, 120)",
    "winText.color = 'green'",
    "winText.fontSize = 200",
  ]),
  ADD(LOSE_START, "screen", [
    "loseText = text('You Lose', -440, 120)",
    "loseText.color = 'red'",
    "loseText.fontSize = 200",
  ]),
  ADD(BASE_LOOP, "over", [
    "if self.health <= 0:",
    "    if self.team == 'player':",
    "        set_room('YouLose')",
    "    else:",
    "        set_room('YouWin')",
  ]),
 ],
 "flow": [
  TALK("0:00", "Reaching a base",
       "<p>Right now a slime walks through the enemy base and off the screen. When it "
       "reaches a base on the other team, it should hit it - and be spent.</p>",
       ask=("A slime is made standing on YOUR base. Why must it not hit that one?",
            "It is on your team - the strike has to ask about the team too")),
  STEP(BASE_START, "health", "A base's health",
       ["At the end of Base start: every base can take 25 hits."],
       at="0:05"),
  STEP(UNIT_LOOP, "strike", "Strike the base",
       ["Under the fight: which base am I touching, if any? Only if it is on the other team: "
        "take my attack off its health, and set my own health to 0 - the die block just "
        "below removes me."],
       at="0:08",
       ask=("Why not destroy(self) here?",
            "The die block already does it - one place that removes a unit is easier to change")),
  TALK("0:14", "Two more rooms",
       "<p>Make two rooms, <strong>YouWin</strong> and <strong>YouLose</strong>. Each "
       "writes on the screen with [[text]]('words', x, y) - the words' top left corner at "
       "x, y. A text's fontSize and color change how it looks.</p>"),
  STEP(WIN_START, "screen", "You Win",
       ["Big green words across the middle of the screen."],
       at="0:18"),
  STEP(LOSE_START, "screen", "You Lose",
       ["The same, in red."],
       at="0:21"),
  STEP(BASE_LOOP, "over", "Who lost a base?",
       ["At the end of Base loop: at no health, this base has fallen. If it was yours, you "
        "lose; [[else]] it was the enemy's, and you win. The inside if is pushed in eight "
        "spaces."],
       at="0:24",
       ask=("You have three bases. How many have to fall for you to lose?",
            "One - the first base on your team to reach 0 changes the room")),
  TALK("0:30", "Play to the end",
       "<p>Send slimes until the enemy base falls. Then let the bats through and lose on "
       "purpose. Swap seats and play a classmate's game.</p>",
       ask=("Is it too easy? What number would you change?",
            "The base's health, the spawnTime, or a unit's attack")),
 ],
 "errors": [
   ("The game ends the moment it starts", "baseHit.team != self.team - your units must not hit your own base."),
   ("Nothing happens at the base", "The strike goes in Unit LOOP, above the die block."),
   ("NameError: name 'YouWin' is not defined", "The rooms are called YouWin and YouLose exactly."),
   ("I win when I should lose", "set_room('YouLose') goes under if self.team == 'player'."),
 ],
 "recap": [
   "A strike asks two questions: touching a base, and on the other team.",
   "[[text]]() writes words; fontSize and color change them.",
   "An [[if]] inside an if is pushed in eight spaces; [[else]] catches the rest.",
   "Changing [[room]] ends the game.",
 ],
 "homework": [
   {"task": "Count the hits", "detail": "How many slimes must reach the enemy base to win?", "done": "25 - each takes 1 off its 25 health."},
   {"task": "Spent", "detail": "What would happen if self.health = 0 were left out of the strike?", "done": "A slime standing on the base would hit it every loop - sixty hits a second."},
 ],
 "bonus": {"title": "A message",
           "body": "<p>Add a second, smaller line of text to each room that tells the player "
                   "something about the battle - a joke, or a tip.</p>"},
 "slides": [
   {"title": "Reaching a base", "sub": "Hit it, and be spent", "bullets": [
     "Only a base on the other team", "Then the unit is gone"]},
   {"title": "A base's health", "bullets": [], "code": [(BASE_START, "health")]},
   {"title": "Strike the base", "bullets": [], "code": [(UNIT_LOOP, "strike")]},
   {"title": "Checkpoint: strikes", "checkpoint": True,
    "say": "Press Play and send slimes. Each one vanishes when it reaches the enemy base."},
   {"title": "Two more rooms", "sub": "YouWin and YouLose", "bullets": [
     "text('words', x, y)", "fontSize and color"]},
   {"title": "You Win", "bullets": [], "code": [(WIN_START, "screen")]},
   {"title": "You Lose", "bullets": [], "code": [(LOSE_START, "screen")]},
   {"title": "Who lost a base?", "bullets": [], "code": [(BASE_LOOP, "over")]},
   {"title": "Checkpoint: the end", "checkpoint": True,
    "say": "Press Play. Let the bats through: when one of your bases falls, You Lose fills the screen."},
   {"title": "Play to the end", "sub": "Win once, lose once", "bullets": [
     "Swap seats", "Too easy? Too hard?"]},
 ],
},

# ---------------------------------------------------------------- week 8 ----
{
 "n": 8,
 "title": "Health bars, and another round",
 "big_idea": "A base shows its health as a bar that shrinks. The bar is an object of its own that the base keeps under a name, moves to itself every loop, and squeezes with [[scale]] - health divided by the most it ever had.",
 "new_concepts": ["an object that owns an object", "division", "z", "key_was_pressed()"],
 "draw": ["healthBar.png"],
 "objectives": [
   "Keep an object under a name with self. and move it every loop",
   "Turn health into a size with / and [[scale]]",
   "Draw one object above another with [[z]]",
   "Start again with [[key_was_pressed]]()",
 ],
 "ops": [
  ADD(BAR_START, "look", [
    "self.image = sprite('healthBar.png')",
    "self.z = 1",
  ]),
  ADD(BASE_START, "health", [
    "self.healthBar = HealthBar()",
    "self.maxHealth = self.health",
  ]),
  ADD(BASE_LOOP, "bar", [
    "self.healthBar.x = self.x",
    "self.healthBar.y = self.y + 80",
    "self.healthBar.scaleX = self.health / self.maxHealth",
  ]),
  ADD(WIN_START, "hint", [
    "hintText = text('Press space to play again', -300, -150)",
    "hintText.fontSize = 50",
  ]),
  ADD(WIN_LOOP, "restart", [
    "if key_was_pressed('space'):",
    "    set_room('Play')",
  ]),
  ADD(LOSE_START, "hint", [
    "hintText = text('Press space to play again', -300, -150)",
    "hintText.fontSize = 50",
  ]),
  ADD(LOSE_LOOP, "restart", [
    "if key_was_pressed('space'):",
    "    set_room('Play')",
  ]),
 ],
 "flow": [
  TALK("0:00", "A bar that shrinks",
       "<p>Make a class called <strong>HealthBar</strong> and draw "
       "<code>healthBar.png</code>, 100 by 12. Every base makes one and keeps it, so it can "
       "move it and shrink it.</p>",
       ask=("Units are made after the bases, so they are drawn on top. What will a bat do to a bar?",
            "Cover it - unless the bar is told to be drawn above everything")),
  STEP(BAR_START, "look", "The bar, on top",
       ["The red bar you drew. [[z]] 1 draws it above everything at z 0 - which is "
        "everything else."],
       at="0:08"),
  STEP(BASE_START, "health", "Every base makes a bar",
       ["Under the health: make a bar and keep it as self.healthBar. And remember the "
        "health you started with - the most you will ever have."],
       at="0:11"),
  TALK("0:14", "From health to a size",
       "<p>[[scale]] 1 is the bar as you drew it, 0.5 is half, 0 is nothing. Health "
       "divided by the most health is exactly that: 25 / 25 is 1, 12 / 25 is about a "
       "half.</p>",
       ask=("What is the bar's scaleX after 5 hits?",
            "20 / 25 - 0.8, four-fifths of the bar")),
  STEP(BASE_LOOP, "bar", "Keep the bar on the base",
       ["Under the spawn, not inside it: every loop, put the bar on this base, 80 above its "
        "middle, and squeeze it to the health that is left."],
       at="0:19",
       ask=("Why in loop, and not once in start?",
            "The health changes, so the size has to be worked out again every loop")),
  TALK("0:27", "Another round",
       "<p>[[key_was_pressed]]('space') is True for the one loop the space bar goes down, "
       "like mouse_was_pressed. Going back to Play makes everything again from the "
       "start.</p>"),
  STEP(WIN_START, "hint", "Tell them how",
       ["Under You Win: smaller words, lower down."],
       at="0:30"),
  STEP(WIN_LOOP, "restart", "Space to play again",
       ["In the room's loop: when space is pressed, back to Play."],
       at="0:33"),
  STEP(LOSE_START, "hint", "The same on You Lose",
       ["The same two lines."],
       at="0:35"),
  STEP(LOSE_LOOP, "restart", "Space here too",
       ["And the same restart."],
       at="0:37"),
 ],
 "errors": [
   ("The bars stay in the middle", "The three bar lines go in Base LOOP, outside the spawn if - not pushed in."),
   ("The bats hide the bars", "self.z = 1 goes in HealthBar start."),
   ("Space does nothing", "Click into the game first, so it hears the keyboard."),
   ("ZeroDivisionError", "self.maxHealth = self.health goes UNDER self.health = 25."),
 ],
 "recap": [
   "An object can keep another under a name with self.",
   "Health / the most health is a size from 1 down to 0.",
   "A higher [[z]] is drawn on top.",
   "[[key_was_pressed]]() is True for one loop.",
 ],
 "homework": [
   {"task": "Half a bar", "detail": "maxHealth is 25. How much health is left when the bar is half its size?", "done": "12.5 - in hits, after 12 or 13."},
   {"task": "Order matters", "detail": "Why must self.maxHealth = self.health come after self.health = 25?", "done": "Before it, there is no health to copy."},
 ],
 "bonus": {"title": "The review",
           "body": "<p>Without looking at your code, write down every class in your game and "
                   "what its start and its loop do. Then check. What did you forget?</p>"},
 "slides": [
   {"title": "A bar that shrinks", "sub": "healthBar.png 100 x 12", "bullets": [
     "A HealthBar class", "Every base keeps one"]},
   {"title": "The bar, on top", "bullets": [], "code": [(BAR_START, "look")]},
   {"title": "Every base makes a bar", "bullets": [], "code": [(BASE_START, "health")]},
   {"title": "From health to a size", "sub": "health / maxHealth", "bullets": [
     "25 / 25 is 1", "12 / 25 is about a half", "0 / 25 is nothing"]},
   {"title": "Keep the bar on the base", "bullets": [], "code": [(BASE_LOOP, "bar")]},
   {"title": "Checkpoint: health bars", "checkpoint": True,
    "say": "Press Play. A red bar sits above every base, and the enemy's shrinks as your slimes strike it."},
   {"title": "Another round", "sub": "key_was_pressed('space')", "bullets": [
     "True for one loop", "Back to Play makes everything again"]},
   {"title": "Tell them how", "bullets": [], "code": [(WIN_START, "hint")]},
   {"title": "Space to play again", "bullets": [], "code": [(WIN_LOOP, "restart")]},
   {"title": "The same on You Lose", "bullets": [], "code": [(LOSE_START, "hint")]},
   {"title": "Space here too", "bullets": [], "code": [(LOSE_LOOP, "restart")]},
   {"title": "Checkpoint: again", "checkpoint": True,
    "say": "Press Play and lose. Press space: a fresh battle starts, every base at full health."},
 ],
},

# ---------------------------------------------------------------- week 9 ----
{
 "n": 9,
 "title": "Only so many",
 "big_idea": "Strategy needs a limit. The game counts how many units you have out in [[game]]. - every card adds its cost, every unit that dies gives it back - and a card only works while there is room.",
 "new_concepts": ["a count every class shares", "three questions with and", "<="],
 "draw": [],
 "objectives": [
   "Share a count between classes with [[game]].",
   "Add to it when a unit is made and take away when it dies",
   "Ask three questions at once with [[and]]",
   "Explain why the cap makes the game a strategy game",
 ],
 "ops": [
  ADD(GAME_START, "count", [
    "game.maxCount = 30",
  ]),
  ADD(PLAY_START, "count", [
    "game.unitCount = 0",
  ]),
  ADD(CARD_START, "look", [
    "self.cost = 1",
  ]),
  SET(CARD_LOOP, "click", [
    "cardClicked = get_collision(self, 'Cursor')",
    "if cardClicked and mouse_was_pressed('left') and game.unitCount + self.cost <= game.maxCount:",
  ]),
  ADD(CARD_LOOP, "make", [
    "    unit.cost = self.cost",
    "    game.unitCount += self.cost",
  ]),
  SET(UNIT_LOOP, "die", [
    "if self.health <= 0:",
    "    if self.team == 'player':",
    "        game.unitCount -= self.cost",
    "    destroy(self)",
  ]),
 ],
 "flow": [
  TALK("0:00", "Click, click, click",
       "<p>Right now the way to win is to click as fast as you can. That is not strategy. "
       "Give the player an army of at most 30 - and make them choose where to send it.</p>",
       ask=("The cards, the units and the Game all need the count. Where should it live?",
            "In game. - every class can reach it")),
  STEP(GAME_START, "count", "The most you can have",
       ["Between the sides and set_room: at most 30 units out at once."],
       at="0:05"),
  STEP(PLAY_START, "count", "Start at none",
       ["Under the cards: every round starts with no units out. In Play, not Game, so "
        "playing again starts at 0 too."],
       at="0:07",
       ask=("Why not set it to 0 in Game start?",
            "Game start runs once; Play start runs every round")),
  STEP(CARD_START, "look", "Every card has a cost",
       ["At the end of Card start: a slime costs 1 of your 30."],
       at="0:10"),
  STEP(CARD_LOOP, "click", "Only while there is room",
       ["The if gets a third question: would this card's cost still fit under the cap? "
        "&lt;= is less than or equal - exactly 30 is allowed."],
       at="0:12"),
  STEP(CARD_LOOP, "make", "Pay for the unit",
       ["At the end, under the if: the unit remembers what it cost, and the count goes up by "
        "that much."],
       at="0:16"),
  STEP(UNIT_LOOP, "die", "Give it back",
       ["Inside the die block, ABOVE the destroy: if it was one of yours, take its cost off "
        "the count. Enemies were never counted."],
       at="0:19",
       ask=("Why above destroy(self), and not under it?",
            "Lines after a destroy run on a unit that is already gone - say it where it is still there")),
  TALK("0:24", "Try to break it",
       "<p>Click as fast as you can. After 30 slimes the cards stop - until some of them "
       "die or strike, and room comes back. Now it is a strategy game: which lane gets your "
       "next slime?</p>"),
 ],
 "errors": [
   ("The cards never work", "game.unitCount = 0 goes in Play start."),
   ("The cards stop for good after 30", "game.unitCount -= self.cost goes in the die block, ABOVE destroy(self)."),
   ("AttributeError: 'Unit' has no attribute 'cost'", "unit.cost = self.cost goes under the if in Card loop - and the count goes down only for the player's units."),
   ("The cap is 29", "<= - less than OR equal."),
 ],
 "recap": [
   "[[game]]. holds a count every class can change.",
   "Add the cost when a unit is made; give it back when it dies.",
   "[[and]] can join three questions - all must be yes.",
   "A limit turns clicking into choosing.",
 ],
 "homework": [
   {"task": "Room for one?", "detail": "unitCount is 29 and a card costs 1. Can you click it? What if unitCount is 30?", "done": "29 + 1 is 30, <= 30: yes. 30 + 1 is 31: no."},
   {"task": "Where it lives", "detail": "Why is maxCount set in Game start, but unitCount in Play start?", "done": "The cap never changes between rounds; the count starts again every round."},
 ],
 "bonus": {"title": "A count on screen",
           "body": "<p>Write the count on the screen with <code>text()</code> in Play start, "
                   "and change its <code>.text</code> in a Play loop with "
                   "<code>str(game.unitCount)</code>. (Week 15 shows it a better way.)</p>"},
 "slides": [
   {"title": "Click, click, click", "sub": "That is not strategy", "bullets": [
     "At most 30 out at once", "Choose where to send them"]},
   {"title": "The most you can have", "bullets": [], "code": [(GAME_START, "count")]},
   {"title": "Start at none", "bullets": [], "code": [(PLAY_START, "count")]},
   {"title": "Every card has a cost", "bullets": [], "code": [(CARD_START, "look")]},
   {"title": "Only while there is room", "bullets": [], "code": [(CARD_LOOP, "click")]},
   {"title": "Pay for the unit", "bullets": [], "code": [(CARD_LOOP, "make")]},
   {"title": "Give it back", "bullets": [], "code": [(UNIT_LOOP, "die")]},
   {"title": "Checkpoint: a cap", "checkpoint": True,
    "say": "Press Play and click as fast as you can. After 30 slimes the cards stop until some are gone."},
   {"title": "Try to break it", "sub": "Now you choose", "bullets": [
     "30 at most", "Which lane next?"]},
 ],
},

# ---------------------------------------------------------------- week 10 ---
{
 "n": 10,
 "title": "Easy or hard",
 "big_idea": "A game starts with a menu. A Menu [[room]] shows two buttons, and the one you click sets how big your army can be before it sends you to Play.",
 "new_concepts": ["a start screen", "if and else inside an if", "a value that picks"],
 "draw": ["button.png"],
 "objectives": [
   "Start the game in a menu [[room]]",
   "Make two buttons from one class, told apart by a value",
   "Choose with [[if]] and [[else]] inside another if",
   "Change a [[game]]. value from a button",
 ],
 "ops": [
  SET(GAME_START, "room", [
    "set_room('Menu')",
  ]),
  ADD(MENU_START, "labels", [
    "easyText = text('Easy', -480, 200)",
    "easyText.fontSize = 120",
    "hardText = text('Hard', 170, 200)",
    "hardText.fontSize = 120",
  ]),
  ADD(BUTTON_START, "look", [
    "self.image = sprite('button.png')",
    "self.difficulty = 'easy'",
  ]),
  ADD(MENU_START, "buttons", [
    "easyButton = DifficultyButton()",
    "easyButton.x = -350",
    "hardButton = DifficultyButton()",
    "hardButton.x = 300",
    "hardButton.difficulty = 'hard'",
    "Cursor()",
  ]),
  ADD(BUTTON_LOOP, "click", [
    "buttonClicked = get_collision(self, 'Cursor')",
    "if buttonClicked and mouse_was_pressed('left'):",
    "    if self.difficulty == 'easy':",
    "        game.maxCount = 35",
    "    else:",
    "        game.maxCount = 25",
    "    set_room('Play')",
  ]),
 ],
 "flow": [
  TALK("0:00", "A menu",
       "<p>Make a room called <strong>Menu</strong>. The game goes there first, and you "
       "pick how hard the battle is. Easy gives you an army of 35; Hard, 25.</p>",
       ask=("Which line decides the first room you see?",
            "set_room in Game start")),
  STEP(GAME_START, "room", "Start in the menu",
       ["The last line of Game start changes: the Menu room first."],
       at="0:04"),
  STEP(MENU_START, "labels", "Two words",
       ["Big words for the two choices, high on the screen."],
       at="0:06"),
  TALK("0:10", "Two buttons, one class",
       "<p>Make a class called <strong>DifficultyButton</strong> and draw "
       "<code>button.png</code>, 300 by 120. Both buttons come from it, so each keeps a "
       "value that says which one it is - like a base's team.</p>"),
  STEP(BUTTON_START, "look", "A button",
       ["The picture, and a difficulty: 'easy', unless it is told otherwise."],
       at="0:14"),
  STEP(MENU_START, "buttons", "Make both buttons",
       ["Under the words: one button under Easy, one under Hard - and the hard one is told "
        "it is hard. The menu needs a cursor of its own: the room before is gone."],
       at="0:16",
       ask=("Why does the menu need its own Cursor()?",
            "Changing room removes everything in the room before - the cursor too")),
  TALK("0:20", "Clicked - but which one?",
       "<p>The button asks the same two questions as a card. Inside, a second if asks which "
       "button it is.</p>"),
  STEP(BUTTON_LOOP, "click", "Set the army, and go",
       ["Ask whether the cursor touches this button, and keep the answer.",
        "Clicked? Then if this is the easy button, an army of 35; [[else]], 25. Either way "
        "- lined up with the inside if, not under the else - go to Play."],
       at="0:23",
       ask=("Why is set_room('Play') lined up with the inside if?",
            "So it runs for both buttons, after the if and the else")),
  TALK("0:30", "Easy, hard, again",
       "<p>Play Easy, then Hard. After a win or a loss, space starts another round - at the "
       "same difficulty. Why? game.maxCount was set by the button and is never set back.</p>",
       ask=("How could the player pick again after a round?",
            "Send space to Menu instead of Play")),
 ],
 "errors": [
   ("NameError: name 'Menu' is not defined", "Make a room called Menu, capital M."),
   ("The buttons do nothing", "Cursor() goes at the end of Menu start - the menu needs its own."),
   ("Both buttons are easy", "hardButton.difficulty = 'hard' goes in Menu start."),
   ("Only Easy starts the game", "set_room('Play') is pushed in four spaces, lined up with the inside if."),
 ],
 "recap": [
   "The first room is whatever Game start sets.",
   "Objects of one class are told apart by a value they keep.",
   "An [[if]] and [[else]] inside another if pick between two.",
   "A button can set a [[game]]. value that lasts into the next room.",
 ],
 "homework": [
   {"task": "Medium", "detail": "What would you add for a Medium button with an army of 30?", "done": "A third button with difficulty 'medium', and an elif before the else."},
   {"task": "Lined up", "detail": "If set_room('Play') were pushed in under the else, what would Easy do?", "done": "Nothing visible - it would set 35 and stay in the menu."},
 ],
 "bonus": {"title": "A title",
           "body": "<p>Give the menu a title across the top with the name of your game, and "
                   "a background of its own.</p>"},
 "slides": [
   {"title": "A menu", "sub": "Easy 35 - Hard 25", "bullets": [
     "A Menu room", "Pick how hard"]},
   {"title": "Start in the menu", "bullets": [], "code": [(GAME_START, "room")]},
   {"title": "Two words", "bullets": [], "code": [(MENU_START, "labels")]},
   {"title": "Checkpoint: a menu", "checkpoint": True,
    "say": "Press Play. Easy and Hard are written across the top of a black screen."},
   {"title": "Two buttons, one class", "sub": "button.png 300 x 120", "bullets": [
     "DifficultyButton", "Each keeps which one it is"]},
   {"title": "A button", "bullets": [], "code": [(BUTTON_START, "look")]},
   {"title": "Make both buttons", "bullets": [], "code": [(MENU_START, "buttons")]},
   {"title": "Clicked - but which one?", "sub": "An if inside an if", "bullets": [
     "Clicked?", "Easy or hard?"]},
   {"title": "Set the army, and go", "bullets": [], "code": [(BUTTON_LOOP, "click")]},
   {"title": "Checkpoint: pick one", "checkpoint": True,
    "say": "Press Play and click a button. The battle starts."},
   {"title": "Easy, hard, again", "sub": "game.maxCount stays", "bullets": [
     "Space plays again", "At the same difficulty"]},
 ],
},

# ---------------------------------------------------------------- week 11 ---
{
 "n": 11,
 "title": "The golem",
 "big_idea": "One enemy in ten is a golem: twice the size, ten times the health, and half the speed. A second [[random]] roll, inside the spawn, turns a bat into a golem after it is made.",
 "new_concepts": ["a one-in-ten chance", "scale for size and direction", "an if inside an if"],
 "draw": ["golem.png"],
 "objectives": [
   "Make something happen one time in ten with [[random.randint()|random]] and ==",
   "Change an object that has just been made",
   "Flip and grow a picture at once with a minus [[scale]]",
   "Balance a stronger enemy with a slower speed",
 ],
 "ops": [
  ADD(BASE_LOOP, "golem", [
    "    if random.randint(1, 10) == 1:",
    "        golemSheet = sprite('golem.png', 1, 8)",
    "        golemAnimation = animation(golemSheet, 20, 0, 7)",
    "        animation_set(enemy, golemAnimation)",
    "        enemy.scaleX = -2",
    "        enemy.scaleY = 2",
    "        enemy.health = 10",
    "        enemy.speed = -1",
  ]),
 ],
 "flow": [
  TALK("0:00", "A heavy",
       "<p>Draw <code>golem.png</code>: 8 frames of 60 by 60, 480 by 60, facing right. Draw "
       "it small - the code makes it twice the size.</p>",
       ask=("Pick a number from 1 to 10. How often is it 1?",
            "One time in ten - about one enemy in ten will be a golem")),
  TALK("0:12", "Rolling again",
       "<p>The enemy base has just made a bat. Now it rolls again: on a 1, the same enemy "
       "becomes a golem. Every line changes something the bat already had - its picture, "
       "its size, its health, its speed.</p>",
       ask=("A bat has scaleX -1. What should a golem's be - and why the minus?",
            "-2: twice as wide, and still flipped to face you")),
  STEP(BASE_LOOP, "golem", "One in ten is a golem",
       ["Under the bat's lane, still inside the spawn - pushed in four spaces: roll 1 to 10. "
        "On a 1, pushed in eight: the golem's animation in place of the bat's, twice the "
        "size and still facing you, ten health, and half the speed."],
       at="0:16",
       ask=("Why is the golem slower?",
            "Ten health AND fast would be too strong - slow gives you time to answer it")),
  TALK("0:26", "Fight a golem",
       "<p>Play until a golem comes. How many slimes does it take to stop one? Is it fair? "
       "Try one in 5, and one in 20. Which is the most fun?</p>",
       ask=("A golem walks into five slimes. How much health has it left?",
            "Five - each slime takes off 1")),
 ],
 "errors": [
   ("A golem every time", "== 1 - two = signs, and the roll is randint(1, 10)."),
   ("The golem faces away", "enemy.scaleX = -2 - a minus sign."),
   ("IndentationError", "The if is pushed in four spaces; the seven lines under it, eight."),
   ("The golem is a giant bat", "animation_set(enemy, golemAnimation) - the golem's animation, on the enemy."),
 ],
 "recap": [
   "randint(1, 10) == 1 is true about one time in ten.",
   "Code can change an object straight after it is made.",
   "A minus [[scale]] of 2 flips the picture and doubles it.",
   "Strong and slow is a fair trade.",
 ],
 "homework": [
   {"task": "Rarer", "detail": "What would you change so a golem comes one time in 20?", "done": "random.randint(1, 20) == 1."},
   {"task": "Twice the size", "detail": "The golem's frames are 60 by 60. How big is it on screen?", "done": "120 by 120 - scale 2 on both."},
 ],
 "bonus": {"title": "A golem card",
           "body": "<p>Should the player have a golem of their own? What would it cost? "
                   "Write the plan down - week 13 shows how one class makes a different "
                   "card.</p>"},
 "slides": [
   {"title": "A heavy", "sub": "golem.png 480 x 60 - 8 frames", "bullets": [
     "Facing right", "Drawn small - the code doubles it"]},
   {"title": "Rolling again", "sub": "One in ten", "bullets": [
     "The bat is already made", "On a 1 it becomes a golem"]},
   {"title": "One in ten is a golem", "bullets": [], "code": [(BASE_LOOP, "golem")]},
   {"title": "Checkpoint: a golem", "checkpoint": True,
    "say": "Press Play and wait. Now and then a big, slow golem comes instead of a bat."},
   {"title": "Fight a golem", "sub": "How many slimes?", "bullets": [
     "One in 5? One in 20?", "Which is most fun?"]},
 ],
},

# ---------------------------------------------------------------- week 12 ---
{
 "n": 12,
 "title": "A bar for the golem",
 "big_idea": "Every unit gets a health bar, hidden - and the golem shows its own. A unit that owns an object must take it away when it goes, or the bar is left floating where it died.",
 "new_concepts": ["hidden until needed", "cleaning up what you own"],
 "draw": [],
 "objectives": [
   "Give every unit a bar that starts hidden with [[visible]]",
   "Show it for only the golem",
   "Reuse the base's health bar code for a unit",
   "Remove an object you own with [[destroy]]() before you go",
 ],
 "ops": [
  ADD(UNIT_START, "setup", [
    "self.healthBar = HealthBar()",
    "self.healthBar.visible = False",
    "self.maxHealth = self.health",
  ]),
  ADD(UNIT_LOOP, "bar", [
    "self.healthBar.x = self.x",
    "self.healthBar.y = self.y + 70",
    "self.healthBar.scaleX = self.health / self.maxHealth",
  ]),
  SET(UNIT_LOOP, "die", [
    "if self.health <= 0:",
    "    if self.team == 'player':",
    "        game.unitCount -= self.cost",
    "    destroy(self.healthBar)",
    "    destroy(self)",
  ]),
  ADD(BASE_LOOP, "golem", [
    "        enemy.maxHealth = 10",
    "        enemy.healthBar.visible = True",
  ]),
 ],
 "flow": [
  TALK("0:00", "How hurt is that golem?",
       "<p>A golem takes ten hits, and you cannot see how many it has left. Your bases "
       "already have bars - every unit can have one the same way. But a bar over every "
       "slime and bat would be a mess.</p>",
       ask=("How can every unit have a bar, but only the golem show one?",
            "Make every bar hidden, and show the golem's")),
  STEP(UNIT_START, "setup", "A hidden bar",
       ["At the end of Unit start: make a bar and keep it...",
        "...hide it - and remember the most health this unit has."],
       at="0:06"),
  STEP(UNIT_LOOP, "bar", "Keep it on the unit",
       ["Above the die block: the same three lines as the base's bar, 70 above the "
        "unit."],
       at="0:09"),
  STEP(UNIT_LOOP, "die", "Take the bar with you",
       ["Inside the die block, above destroy(self): destroy your bar first."],
       at="0:13",
       ask=("Leave this line out. Where do the bars go when the units die?",
            "Nowhere - each is left where its unit died, hidden for now, but still there")),
  TALK("0:17", "Show the golem's",
       "<p>Unit start set maxHealth from a health of 1. The golem's health becomes 10 "
       "afterwards, so its maxHealth has to change too - or its bar would be ten times too "
       "wide.</p>",
       ask=("health 10, maxHealth 1: what scaleX does the bar get?",
            "10 - ten times as wide as you drew it")),
  STEP(BASE_LOOP, "golem", "The golem shows its bar",
       ["At the end of the golem lines: its most health is 10, and its bar is shown."],
       at="0:21"),
  TALK("0:25", "Watch closely",
       "<p>Play until a golem comes and watch the middle of the screen as it appears. "
       "Something flashes there. Write down what you think it is - week 14 explains it.</p>"),
 ],
 "errors": [
   ("A bar over every unit", "self.healthBar.visible = False goes in Unit start."),
   ("The golem's bar is huge", "enemy.maxHealth = 10 goes under enemy.health = 10."),
   ("AttributeError: 'Unit' has no attribute 'healthBar'", "self.healthBar = HealthBar() goes in Unit START."),
   ("Bars left where golems died", "destroy(self.healthBar) goes inside the die block, above destroy(self)."),
 ],
 "recap": [
   "Hidden with [[visible]] = False is still there, and still runs.",
   "One class's bar code works for another.",
   "A value set in start can be changed straight after.",
   "[[destroy]] what you own before you go.",
 ],
 "homework": [
   {"task": "Half a golem", "detail": "A golem has 5 health left. What is its bar's scaleX?", "done": "5 / 10 is 0.5 - half the bar."},
   {"task": "Order", "detail": "Why must destroy(self.healthBar) come before destroy(self)?", "done": "After destroy(self) the unit is gone - say everything it has to do first."},
 ],
 "bonus": {"title": "Every bar",
           "body": "<p>Show every unit's bar for a minute. Can you still see the battle? "
                   "Then give your slimes 3 health and decide whether theirs should "
                   "show.</p>"},
 "slides": [
   {"title": "How hurt is that golem?", "sub": "Every unit gets a bar", "bullets": [
     "Hidden for most", "Shown for the golem"]},
   {"title": "A hidden bar", "bullets": [], "code": [(UNIT_START, "setup")]},
   {"title": "Keep it on the unit", "bullets": [], "code": [(UNIT_LOOP, "bar")]},
   {"title": "Take the bar with you", "bullets": [], "code": [(UNIT_LOOP, "die")]},
   {"title": "Checkpoint: nothing new", "checkpoint": True,
    "say": "Press Play. The game looks the same - every unit's bar is there, but hidden."},
   {"title": "Show the golem's", "sub": "maxHealth was 1", "bullets": [
     "Change it to 10", "Then show the bar"]},
   {"title": "The golem shows its bar", "bullets": [], "code": [(BASE_LOOP, "golem")]},
   {"title": "Checkpoint: a golem's bar", "checkpoint": True,
    "say": "Press Play and wait for a golem. A bar above it shrinks as your slimes hit it."},
   {"title": "Watch closely", "sub": "Something flashes", "bullets": [
     "In the middle of the screen", "When a golem appears"]},
 ],
},

# ---------------------------------------------------------------- week 13 ---
{
 "n": 13,
 "title": "The ghost card",
 "big_idea": "A fourth card makes a ghost. It is the same Card class with four values changed - its lane, its cost, its picture and one [[boolean]] that says it is a ghost - and the card passes the difference on to the unit it makes.",
 "new_concepts": ["a boolean that marks a kind", "one class, many kinds"],
 "draw": ["ghostCard.png", "ghost.png"],
 "objectives": [
   "Mark one kind of object with a [[boolean]]",
   "Make a different card from the same class by changing its values",
   "Ask a True-or-False value straight in an [[if]]",
   "Explain what a cost of 10 does to your army",
 ],
 "ops": [
  ADD(CARD_START, "look", [
    "self.isGhost = False",
  ]),
  ADD(UNIT_START, "setup", [
    "self.isGhost = False",
  ]),
  ADD(PLAY_START, "ghost", [
    "ghostCard = Card()",
    "ghostCard.x = game.rightSide",
    "ghostCard.y = -250",
    "ghostCard.lane = 3",
    "ghostCard.cost = 10",
    "ghostCard.isGhost = True",
    "ghostCard.image = sprite('ghostCard.png')",
  ]),
  ADD(CARD_LOOP, "ghost", [
    "    if self.isGhost:",
    "        ghostSheet = sprite('ghost.png', 1, 8)",
    "        ghostAnimation = animation(ghostSheet, 20, 0, 7)",
    "        animation_set(unit, ghostAnimation)",
    "        unit.isGhost = True",
    "        unit.attack = 5",
  ]),
 ],
 "flow": [
  TALK("0:00", "A special card",
       "<p>Draw <code>ghostCard.png</code> at 90 by 120 and <code>ghost.png</code> - 8 "
       "frames of 60 by 60, 480 by 60, facing right. A ghost hits for 5, but costs 10 of "
       "your army.</p>",
       ask=("Do we need a GhostCard class?",
            "No - it is a Card with a different picture, lane and cost")),
  STEP(CARD_START, "look", "Not a ghost",
       ["At the end of Card start: a [[boolean]], True or False. Every card is not a ghost "
        "unless it is told otherwise."],
       at="0:12"),
  STEP(UNIT_START, "setup", "Not a ghost either",
       ["Everything above is not changed - skip past it.",
        "At the end of Unit start: the same for every unit."],
       at="0:14"),
  STEP(PLAY_START, "ghost", "The ghost card",
       ["Under the other cards: a fourth card, at the bottom on the right. Its lane is 3, "
        "it costs 10, it is a ghost...",
        "...and the last line swaps its picture."],
       at="0:16",
       ask=("Card start set the slime picture. Why does the ghost card show the ghost?",
            "These lines run after start - the last picture set is the one you see")),
  TALK("0:22", "The card tells the unit",
       "<p>The card already passes on its lane and its cost. A ghost card also has to make "
       "the unit a ghost. <code>if self.isGhost:</code> needs no == True - isGhost is "
       "already a True or a False.</p>"),
  STEP(CARD_LOOP, "ghost", "Make it a ghost",
       ["At the end of Card loop, still under the click's if - pushed in four spaces: if "
        "this card is a ghost, the unit gets the ghost's animation, is marked a ghost, and "
        "hits for 5."],
       at="0:25",
       ask=("unitCount is 25 and the cap is 30. Can you play the ghost?",
            "No - 25 + 10 is 35, over 30")),
  TALK("0:32", "Try it",
       "<p>Play the ghost card. It walks the bottom lane - and dies to the first bat, like "
       "any slime. A ghost should be harder to stop than that. Next week it walks through "
       "the fight.</p>"),
 ],
 "errors": [
   ("The ghost card makes slimes", "ghostCard.isGhost = True goes in Play start - capital T."),
   ("The ghost card is a slime card", "ghostCard.image = sprite('ghostCard.png') is the last of the ghost card's lines."),
   ("The ghost never appears", "Wait for room: the ghost needs 10 free in your army."),
   ("AttributeError: 'Card' has no attribute 'isGhost'", "self.isGhost = False goes in Card start."),
 ],
 "recap": [
   "A [[boolean]] can mark one kind of object.",
   "One class makes many kinds when its values change.",
   "An [[if]] can ask a True-or-False value straight.",
   "A cost of 10 is a third of your army.",
 ],
 "homework": [
   {"task": "Worth it?", "detail": "A ghost costs 10 and hits a base for 5. Ten slimes cost 10. Which is better, and when?", "done": "Ten slimes hit for 10 if they all get through - the ghost wins when the lane is full of bats."},
   {"task": "Straight", "detail": "Is if self.isGhost == True: wrong?", "done": "No - it works. == True just asks the question twice."},
 ],
 "bonus": {"title": "A ghost's lane",
           "body": "<p>Move the ghost card to the top and send its ghost down lane 1. Which "
                   "values do you change?</p>"},
 "slides": [
   {"title": "A special card", "sub": "ghostCard.png 90 x 120 - ghost.png 480 x 60", "bullets": [
     "Hits for 5", "Costs 10"]},
   {"title": "Not a ghost", "bullets": [], "code": [(CARD_START, "look")]},
   {"title": "Not a ghost either", "bullets": [], "code": [(UNIT_START, "setup")]},
   {"title": "The ghost card", "bullets": [], "code": [(PLAY_START, "ghost")]},
   {"title": "Checkpoint: a fourth card", "checkpoint": True,
    "say": "Press Play. The ghost card sits at the bottom on the right. Clicking it makes a slime - for now."},
   {"title": "The card tells the unit", "sub": "if self.isGhost:", "bullets": [
     "No == True needed", "It already is True or False"]},
   {"title": "Make it a ghost", "bullets": [], "code": [(CARD_LOOP, "ghost")]},
   {"title": "Checkpoint: a ghost", "checkpoint": True,
    "say": "Press Play and click the ghost card. A ghost walks the bottom lane - and dies at the first bat, like any slime."},
 ],
},

# ---------------------------------------------------------------- week 14 ---
{
 "n": 14,
 "title": "Ghost powers",
 "big_idea": "A ghost walks through the battle: nothing hits it and it hits nothing, until it reaches the base. [[not]] turns a True into a False - and the golem's bar stops flashing once it is put in place the moment it is made.",
 "new_concepts": ["not", "a new object's first frame"],
 "draw": [],
 "objectives": [
   "Turn a question round with [[not]]",
   "Join two nots with [[and]]",
   "Explain why a new object is drawn once before its loop runs",
   "Fix a flash by placing an object as it is made",
 ],
 "ops": [
  SET(UNIT_LOOP, "fight", [
    "for otherUnit in get_collision_list(self, 'Unit'):",
    "    if otherUnit.team != self.team:",
    "        if not self.isGhost and not otherUnit.isGhost:",
    "            otherUnit.health -= self.attack",
  ]),
  ADD(CARD_LOOP, "ghost", [
    "        unit.speed = 3",
  ]),
  ADD(BASE_LOOP, "golem", [
    "        enemy.healthBar.x = self.x",
    "        enemy.healthBar.y = self.y + 70",
  ]),
 ],
 "flow": [
  TALK("0:00", "Through the battle",
       "<p>A ghost should neither hit nor be hit. In a fight, that means: only take "
       "health off when NEITHER of us is a ghost.</p>",
       "<p>[[not]] turns True into False and False into True. "
       "<code>not self.isGhost</code> is True for every unit that is not a ghost.</p>",
       ask=("A slime touches a ghost. Is not self.isGhost and not otherUnit.isGhost True?",
            "No - the slime is not a ghost, but the other one is")),
  STEP(UNIT_LOOP, "fight", "Ghosts do not fight",
       ["One new line between the team question and the hit - and push the hit in four "
        "more spaces, under it."],
       at="0:06"),
  STEP(CARD_LOOP, "ghost", "A fast ghost",
       ["At the end of the ghost's lines: it moves at 3, faster than a slime."],
       at="0:12",
       ask=("Does the ghost still strike the base?",
            "Yes - the strike asks about the base's team, not about ghosts")),
  TALK("0:15", "The flash",
       "<p>Last week something flashed in the middle when a golem came. It is the golem's "
       "bar. A new object is drawn once before its loop ever runs - and the bar is made at "
       "x 0, y 0, the middle. The unit's loop moves it, but one frame too late.</p>",
       ask=("Why did no bat's bar flash?",
            "A bat's bar is hidden - it is in the middle too, but nobody can see it")),
  STEP(BASE_LOOP, "golem", "Put the bar in place at once",
       ["At the end of the golem's lines: put its bar where the golem stands, straight "
        "away, so its first frame is already in the right place."],
       at="0:22"),
  TALK("0:26", "Play each other",
       "<p>Swap seats and play a classmate's game on Hard. When is the ghost worth its "
       "10?</p>"),
 ],
 "errors": [
   ("The ghost still dies to bats", "not self.isGhost and not otherUnit.isGhost - two nots, joined by and."),
   ("Nobody fights at all", "The hit line is pushed in under the new if, and the if says not."),
   ("IndentationError", "The hit is pushed in twelve spaces now - four more than before."),
   ("The bar still flashes", "The two new lines use self.x and self.y + 70 - the base's place, where the golem starts."),
 ],
 "recap": [
   "[[not]] turns True into False.",
   "[[and]] can join two nots: neither is a ghost.",
   "A new object is drawn once before its loop runs.",
   "Place what you make as you make it.",
 ],
 "homework": [
   {"task": "Read it aloud", "detail": "Say not self.isGhost and not otherUnit.isGhost in plain words.", "done": "I am not a ghost, and the other one is not a ghost either."},
   {"task": "Hit, but not be hit", "detail": "How would you change the line so ghosts still hit, but are never hit?", "done": "Ask only not otherUnit.isGhost."},
 ],
 "bonus": {"title": "A ghost trail",
           "body": "<p>Make the ghost see-through with <code>unit.alpha = 0.5</code> in its "
                   "card's lines. Does it look more like a ghost?</p>"},
 "slides": [
   {"title": "Through the battle", "sub": "not", "bullets": [
     "not True is False", "Hit only when neither is a ghost"]},
   {"title": "Ghosts do not fight", "bullets": [], "code": [(UNIT_LOOP, "fight")]},
   {"title": "A fast ghost", "bullets": [], "code": [(CARD_LOOP, "ghost")]},
   {"title": "Checkpoint: a ghost", "checkpoint": True,
    "say": "Press Play and send a ghost. It drifts through the bats and strikes the enemy base for 5."},
   {"title": "The flash", "sub": "Drawn once before its loop", "bullets": [
     "The bar is made at 0, 0", "The loop moves it one frame late"]},
   {"title": "Put the bar in place at once", "bullets": [], "code": [(BASE_LOOP, "golem")]},
   {"title": "Checkpoint: no flash", "checkpoint": True,
    "say": "Press Play and wait for a golem. Its bar appears above it - nothing flashes in the middle."},
 ],
},

# ---------------------------------------------------------------- week 15 ---
{
 "n": 15,
 "title": "Mana, and a stronger enemy",
 "big_idea": "A mana bar shows how much of your army is left to spend, and the enemy sends its units a little faster every time - [[max]]() keeps it from getting impossibly fast.",
 "new_concepts": ["a bar that shows a count", "max() as a floor"],
 "draw": ["manaBar.png"],
 "objectives": [
   "Show a count as a bar with / and [[scale]]",
   "Give a room a loop of its own",
   "Make a game harder over time",
   "Stop a number going too far with [[max]]()",
 ],
 "ops": [
  ADD(MANA_START, "look", [
    "self.image = sprite('manaBar.png')",
  ]),
  ADD(PLAY_START, "mana", [
    "self.manaBar = ManaBar()",
    "self.manaBar.y = -330",
  ]),
  ADD(PLAY_LOOP, "mana", [
    "self.manaBar.scaleX = 1 - game.unitCount / game.maxCount",
  ]),
  ADD(BASE_LOOP, "reset", [
    "    self.spawnTime = max(20, self.spawnTime - 1)",
  ]),
 ],
 "flow": [
  TALK("0:00", "How much is left?",
       "<p>You cannot see how many more units you can send. A mana bar can show it: full "
       "when your army is all at home, empty at the cap. Make a class called "
       "<strong>ManaBar</strong> and draw <code>manaBar.png</code>, 600 by 20.</p>",
       ask=("unitCount is 15 and maxCount 30. How full should the bar be?",
            "Half - 1 - 15 / 30 is 0.5")),
  STEP(MANA_START, "look", "The mana bar",
       ["The blue bar you drew."],
       at="0:07"),
  STEP(PLAY_START, "mana", "Make it in Play",
       ["Above the cursor: the room makes the bar, keeps it, and puts it along the "
        "bottom."],
       at="0:09"),
  STEP(PLAY_LOOP, "mana", "Shrink it as you spend",
       ["In Play loop: the part of your army used up is unitCount / maxCount. One minus "
        "that is the part left - the bar's width."],
       at="0:12",
       ask=("Why in the room's loop, and not ManaBar's?",
            "The room made the bar and keeps it - either works; the room already has its name")),
  TALK("0:17", "A stronger enemy",
       "<p>Right now the enemy sends one unit a second, for ever. A real battle builds. "
       "Every time the enemy base makes a unit, take one loop off the wait - but never let "
       "it go under 20, three a second.</p>",
       "<p>[[max]](20, number) gives back the bigger: once the wait reaches 20, it stays "
       "20.</p>"),
  STEP(BASE_LOOP, "reset", "Faster every time",
       ["Under the timer's reset: the next wait is one loop shorter - but the bigger of "
        "that and 20."],
       at="0:21",
       ask=("spawnTime starts at 60. After how many enemies does it reach 20?",
            "40 - one loop shorter each time")),
  TALK("0:26", "Make it yours",
       "<p>The game is finished - and it is yours. Change one thing and defend it to the "
       "class: a new card, a new enemy, a faster ramp, a bigger army. Then play each "
       "other.</p>",
       ask=("What one number would you change to make Hard really hard?",
            "The cap of 25, the ramp's floor of 20, or the golem's one in ten")),
 ],
 "errors": [
   ("The bar never shrinks", "The scaleX line goes in Play LOOP."),
   ("The bar is full when the army is out", "1 - at the front: the part LEFT, not the part used."),
   ("The enemy floods the screen", "max(20, ...) - max, not min."),
   ("AttributeError: 'Play' has no attribute 'manaBar'", "self.manaBar = ManaBar() goes in Play start."),
 ],
 "recap": [
   "1 - used / most is the part left.",
   "A room can have a loop of its own.",
   "A game can get harder over time.",
   "[[max]]() puts a floor under a number.",
 ],
 "homework": [
   {"task": "A ghost on the bar", "detail": "maxCount is 30 and you send a ghost. How much of the bar disappears?", "done": "A third - 10 / 30."},
   {"task": "Never easier", "detail": "Why max and not min in the ramp?", "done": "min(20, ...) would make the wait 20 straight away - max lets it come down to 20 and stop."},
 ],
 "bonus": {"title": "Your own card",
           "body": "<p>Add a fifth card for a unit of your own design: its picture, its "
                   "lane, its cost and what makes it different. Everything it needs is "
                   "already in your game.</p>"},
 "slides": [
   {"title": "How much is left?", "sub": "manaBar.png 600 x 20", "bullets": [
     "Full: all at home", "Empty: at the cap"]},
   {"title": "The mana bar", "bullets": [], "code": [(MANA_START, "look")]},
   {"title": "Make it in Play", "bullets": [], "code": [(PLAY_START, "mana")]},
   {"title": "Shrink it as you spend", "bullets": [], "code": [(PLAY_LOOP, "mana")]},
   {"title": "Checkpoint: mana", "checkpoint": True,
    "say": "Press Play and send slimes. The blue bar along the bottom shrinks, and grows back as they fall."},
   {"title": "A stronger enemy", "sub": "max() is a floor", "bullets": [
     "One loop shorter each time", "Never under 20"]},
   {"title": "Faster every time", "bullets": [], "code": [(BASE_LOOP, "reset")]},
   {"title": "Checkpoint: the whole game", "checkpoint": True,
    "say": "Press Play and hold out. The bats come faster and faster - can you still win?"},
   {"title": "Make it yours", "sub": "Change one thing", "bullets": [
     "A new card or enemy", "Defend it to the class", "Play each other"]},
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
    if (re.match(r"self\.\w+(\.\w+)+ = ", stripped)
            or re.match(r"(?!self\.|game\.)[a-z]\w*(\.\w+)+ = ", stripped)):
        keys.append("py:dot")
    if re.match(r"self\.[xy] = -?\d+$", stripped):
        keys.append("py:coords")
    if re.match(r"self\.\w+ = -?\d", stripped):
        keys.append("py:variable")
    if " += " in stripped or " -= " in stripped:
        keys.append("py:change")
    if stripped.startswith("if "):
        keys.append("py:if")
    if "Background()" in stripped:
        keys.append("py:order")
    if re.search(r" (<|>|<=|>=) ", stripped):
        keys.append("py:compare")
    if "get_collision(" in stripped:
        keys.append("py:collision")
    if "get_collision_list(" in stripped:
        keys.append("py:collisionlist")
    if re.match(r"(?!self\b|game\b)[a-z]\w* = ", stripped):
        keys.append("py:local")
    if "mouse_x(" in stripped or "mouse_y(" in stripped:
        keys.append("py:mouse")
    if "mouse_was_pressed(" in stripped:
        keys.append("py:tap")
    if "key_was_pressed(" in stripped:
        keys.append("py:key")
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
    if " != " in stripped:
        keys.append("py:notequal")
    if re.search(r"\bnot ", stripped):
        keys.append("py:not")
    if re.match(r" {4,}(if|for) ", line):
        keys.append("py:nested")
    if "destroy(" in stripped:
        keys.append("py:destroy")
    if " / " in stripped:
        keys.append("py:divide")
    if re.search(r"= '", stripped):
        keys.append("py:string")
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
    if ".visible = " in stripped:
        keys.append("py:visible")
    if "scaleX" in stripped or "scaleY" in stripped:
        keys.append("py:scale")
    if re.search(r"scaleX = -\d", stripped):
        keys.append("py:flip")
    if stripped.startswith("self.z = "):
        keys.append("py:z")
    if stripped.startswith("for "):
        keys.append("py:for")
    if re.search(r"in \[", stripped):
        keys.append("py:list")
    if re.search(r"(?<![\w.])min\(", stripped):
        keys.append("py:min")
    if re.search(r"(?<![\w.])max\(", stripped):
        keys.append("py:max")
    if "animation(" in stripped or "animation_set(" in stripped:
        keys.append("py:animation")
    return keys


# key -> (kind, title, [bullets], example). kind picks the slide's eyebrow.
CONCEPTS = {
    "py:start": ("game", "start runs once",
        ["Everything in [[start]] runs one time, the moment the [[object]] is made.",
         "Use it to set a picture, a place or a starting number."],
        "self.image = sprite('base.png')"),
    "py:loop": ("game", "loop runs over and over",
        ["[[loop]] runs about 60 times every second, until the object is gone.",
         "Anything that moves or keeps checking lives in loop."],
        "self.x += self.speed"),
    "py:room": ("game", "A room is one screen",
        ["Your game can have more than one screen. Each one is a [[room]].",
         "set_room changes to another, and removes everything from the one before."],
        "set_room('Play')"),
    "py:sprite": ("art", "A sprite is your picture",
        ["[[sprite]]() finds the picture you drew and puts it on the [[object]].",
         "The name has to match exactly, including the .png."],
        "self.image = sprite('base.png')"),
    "py:sheet": ("art", "A sprite sheet",
        ["Two more numbers cut the picture into frames: rows, then columns.",
         "sprite('bat.png', 1, 8) is 1 row of 8 - eight frames."],
        "batSheet = sprite('bat.png', 1, 8)"),
    "py:make": ("py", "Making an object",
        ["Base() builds one base from the Base [[class]].",
         "A name on the left is how you talk to it afterwards."],
        "enemyBase = Base()"),
    "py:dot": ("py", "The dot reaches inside",
        ["base.y means: the y that belongs to base - that base's y.",
         "The [[dot]] lets one object change another."],
        "enemyBase.x = game.rightSide"),
    "py:coords": ("game", "x and y",
        ["The middle of the screen is x 0, y 0.",
         "Plus x is right, plus y is UP. Minus goes left and down."],
        "self.x = 50"),
    "py:variable": ("py", "A variable holds a value",
        ["A [[variable]] is a name with a value in it. The name goes left of =.",
         "self. in front makes it belong to this object, so start and loop can share it."],
        "self.speed = 2"),
    "py:change": ("py", "+= and -=",
        ["self.x += 2 means: my x becomes my x plus 2.",
         "-= takes away the same way. Do it every [[loop]] and things move."],
        "self.x += self.speed"),
    "py:if": ("py", "if means only when",
        ["The lines under an [[if]] run only when its question is true.",
         "The if line ends with a colon; the lines under it start with four spaces."],
        "if self.health <= 0:"),
    "py:order": ("game", "Made first, drawn at the back",
        ["Objects are drawn in the order they were made.",
         "Make the background first so everything else is drawn on top."],
        "Background()"),
    "py:compare": ("py", "Comparing numbers",
        ["&lt; is less than, &gt; is greater than.",
         "&lt;= and &gt;= also count the number itself."],
        "if self.health <= 0:"),
    "py:collision": ("game", "get_collision - are they touching?",
        ["[[get_collision(self, 'Base')|get_collision]] gives back the base you touch, or False.",
         "An [[if]] treats the base as yes and False as no."],
        "baseHit = get_collision(self, 'Base')"),
    "py:collisionlist": ("game", "Everything you touch",
        ["[[get_collision_list(self, 'Unit')|get_collision_list]] gives back a [[list]] of every unit you touch.",
         "Touching nothing, the list is empty and a [[for]] over it runs no times."],
        "for otherUnit in get_collision_list(self, 'Unit'):"),
    "py:local": ("py", "A name for right now",
        ["A name with no self. in front lives only inside this start or loop.",
         "Use it for a value you need right here and nowhere else."],
        "cardClicked = get_collision(self, 'Cursor')"),
    "py:mouse": ("game", "Where is the mouse?",
        ["[[mouse_x]]() and mouse_y() give back the mouse's x and y, right now.",
         "In loop, they are asked again sixty times a second."],
        "self.x = mouse_x()"),
    "py:tap": ("game", "mouse_was_pressed()",
        ["[[mouse_was_pressed('left')|mouse_was_pressed]] is True for only the one loop the button goes down.",
         "One click, one unit - however long you hold it."],
        "if cardClicked and mouse_was_pressed('left'):"),
    "py:key": ("game", "key_was_pressed()",
        ["[[key_was_pressed('space')|key_was_pressed]] is True for the one loop the key goes down.",
         "Click into the game first, so it hears the keyboard."],
        "if key_was_pressed('space'):"),
    "py:timer": ("py", "A timer counts",
        ["A [[timer]] changes by one every loop. 60 loops is one second.",
         "Set it, count it, check it, and reset it."],
        "self.spawnTimer += 1"),
    "py:bool": ("py", "True or False",
        ["A [[boolean]] has only two values: True and False.",
         "Like a light switch. Python writes them with a capital letter."],
        "self.isGhost = False"),
    "py:else": ("py", "else - otherwise",
        ["[[else]]: lines up with its if, and ends with a colon.",
         "Its lines run when nothing above it was true."],
        "else:"),
    "py:elif": ("py", "elif - else if",
        ["[[elif]] asks another question, only when every one above it was no.",
         "Python runs the first branch that is true, and skips the rest."],
        "elif self.lane == 3:"),
    "py:and": ("py", "and - all at once",
        ["[[and]] joins questions.",
         "The if runs only when EVERY one is true."],
        "if cardClicked and mouse_was_pressed('left'):"),
    "py:equals": ("py", "== asks, = stores",
        ["One = puts a value into a name.",
         "Two == asks whether two things are exactly equal."],
        "if self.lane == 1:"),
    "py:notequal": ("py", "!= asks: different?",
        ["[[!=|notequal]] is the opposite of ==.",
         "It is True when the two things are NOT the same."],
        "if otherUnit.team != self.team:"),
    "py:not": ("py", "not turns it round",
        ["[[not]] True is False, and not False is True.",
         "not self.isGhost is True for every unit that is not a ghost."],
        "if not self.isGhost and not otherUnit.isGhost:"),
    "py:nested": ("py", "Inside another",
        ["An if inside an if - or inside a for - only runs when the outside one lets it.",
         "Its lines are pushed in four more spaces."],
        "    if self.team == 'player':"),
    "py:destroy": ("game", "destroy() removes an object",
        ["[[destroy]](self) removes the object whose code is running.",
         "destroy(self.healthBar) removes the bar this unit made."],
        "destroy(self)"),
    "py:divide": ("py", "/ divides",
        ["12 / 24 is 0.5.",
         "Health divided by the most health is how full a bar should be."],
        "self.health / self.maxHealth"),
    "py:string": ("py", "Words in quotes",
        ["Writing in quotes is a value too, like 'player' or 'enemy'.",
         "A [[variable]] can hold words as well as numbers."],
        "self.team = 'player'"),
    "py:text": ("game", "text() writes on the screen",
        ["[[text]]('You Win', -380, 120) puts the words on the screen, their top left corner at x -380, y 120.",
         "Its fontSize and color change how it looks."],
        "winText = text('You Win', -380, 120)"),
    "py:look": ("art", "Size and colour of words",
        [".fontSize is how big the [[text]] is; 30 to start with.",
         ".color is its colour, like 'green'."],
        "winText.color = 'green'"),
    "py:import": ("py", "import brings in a toolbox",
        ["[[import]] random gives this code Python's random number tools.",
         "It goes at the very top of the code that uses it."],
        "import random"),
    "py:random": ("py", "random.randint() picks a number",
        ["[[random.randint(1, 3)|random]] picks a whole number from 1 to 3.",
         "Both ends can be picked, and it is a different one each time."],
        "enemy.lane = random.randint(1, 3)"),
    "py:game": ("game", "game. reaches the Game",
        ["The Game class is made once and lasts the whole game.",
         "From any class, [[game]]. reaches it - the place for the sides and the army."],
        "game.unitCount += self.cost"),
    "py:visible": ("art", "visible hides an object",
        ["[[visible]] = False means the object is never drawn.",
         "It still runs its start and its loop, and still touches things."],
        "self.visible = False"),
    "py:scale": ("art", "scale is size",
        ["[[scale]] 1 is the picture as you drew it; 0.5 is half; 2 is double.",
         "scaleX is the width and scaleY the height."],
        "self.healthBar.scaleX = self.health / self.maxHealth"),
    "py:flip": ("art", "A minus scale flips",
        ["scaleX -1 draws the picture back to front, the same size.",
         "-2 flips it and makes it twice as wide."],
        "enemy.scaleX = -1"),
    "py:z": ("art", "z is in front or behind",
        ["Everything starts at [[z]] 0, drawn in the order it was made.",
         "A higher z is drawn on top of everything lower."],
        "self.z = 1"),
    "py:for": ("py", "for repeats",
        ["[[for]] laneY in [250, 0, -250]: runs the lines under it once for each value.",
         "Each time round, laneY holds the next one."],
        "for laneY in [250, 0, -250]:"),
    "py:list": ("py", "A list",
        ["A [[list]] is values in square brackets, with commas between.",
         "[250, 0, -250] is three numbers in one."],
        "[250, 0, -250]"),
    "py:min": ("py", "min() gives the smaller",
        ["[[min]](250, 400) is 250; min(250, 100) is 100.",
         "It puts a ceiling on a number: never more than 250."],
        "self.y = min(250, game.rightSide - self.x)"),
    "py:max": ("py", "max() gives the bigger",
        ["[[max]](-250, -400) is -250; max(20, 35) is 35.",
         "It puts a floor under a number: never less than the first."],
        "self.spawnTime = max(20, self.spawnTime - 1)"),
    "py:animation": ("art", "An animation plays frames",
        ["[[animation]](sheet, 20, 0, 7) plays frames 0 to 7 of a sheet, 20 a second.",
         "animation_set(self, ...) gives it to this object."],
        "animation_set(self, slimeAnimation)"),
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
    "py:if":         ("word", "if", ""),
    "py:order":      ("idea", "Draw order", ""),
    "py:compare":    ("idea", "Comparing numbers", ""),
    "py:collision":  ("word", "get_collision()", ""),
    "py:collisionlist": ("word", "get_collision_list()", ""),
    "py:local":      ("idea", "A name for right now", ""),
    "py:mouse":      ("word", "mouse_x() and mouse_y()", ""),
    "py:tap":        ("word", "mouse_was_pressed()", ""),
    "py:key":        ("word", "key_was_pressed()", ""),
    "py:timer":      ("idea", "A timer", ""),
    "py:bool":       ("word", "True and False", "A boolean is True or False."),
    "py:else":       ("word", "else", ""),
    "py:elif":       ("word", "elif", ""),
    "py:and":        ("word", "and", ""),
    "py:equals":     ("word", "==", "== asks whether two things are equal."),
    "py:notequal":   ("word", "!=", "!= asks whether two things are different."),
    "py:not":        ("word", "not", ""),
    "py:nested":     ("idea", "One inside another", ""),
    "py:destroy":    ("word", "destroy()", ""),
    "py:divide":     ("word", "/", "/ divides one number by another."),
    "py:string":     ("idea", "Words in quotes", ""),
    "py:text":       ("word", "text()", ""),
    "py:look":       ("word", "fontSize and color", "fontSize and color change how words look."),
    "py:import":     ("word", "import", ""),
    "py:random":     ("word", "random.randint()", ""),
    "py:game":       ("word", "game.", "game. reaches the Game class from anywhere."),
    "py:visible":    ("word", "visible", ""),
    "py:scale":      ("word", "scaleX and scaleY", ""),
    "py:flip":       ("idea", "Flipping a picture", ""),
    "py:z":          ("word", "z", "z says what is drawn in front."),
    "py:for":        ("word", "for", ""),
    "py:list":       ("idea", "A list", ""),
    "py:min":        ("word", "min()", ""),
    "py:max":        ("word", "max()", ""),
    "py:animation":  ("word", "animation()", ""),
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
    "class":   "A KIND of thing in your game - Base, Card, Unit. Every object is built from one, like a house from a blueprint.",
    "object":  "One thing built from a class: one base, one slime, one health bar. You can see it and give it orders.",
    "sprite":  "The picture you drew, put onto an object. The name has to match exactly, including the .png.",
    "room":    "One screen of your game - Menu, Play, YouWin and YouLose. set_room picks which one you see, and removes everything from the room before.",
    "start":   "The part of an object that runs once, the moment it is made - for its picture, its place and its starting numbers.",
    "loop":    "The part of an object that runs over and over, about sixty times a second. Anything that moves or keeps checking lives here.",
    "variable": "A name that holds a value, like self.speed = 2 or self.team = 'player'. With self. in front it belongs to the object.",
    "game":    "The Game class, made once and lasting the whole game. From any other class you reach its numbers as game.leftSide or game.unitCount.",
    "list":    "Values in square brackets with commas between, like [250, 0, -250]. A for goes through them one at a time.",
    "for":     "Runs the lines under it once for each value. for laneY in [250, 0, -250]: runs them three times, laneY holding each height in turn.",
    "dot":     "The . between two names. enemyBase.x means the x that belongs to the enemy's base.",
    "mouse_x": "mouse_x() and mouse_y() give back where the mouse is right now. The cursor goes there every loop.",
    "get_collision": "Asks whether this object is touching one of a class. It gives back the thing it touches, or False.",
    "get_collision_list": "Gives back a list of everything of a class this object is touching - every unit in a crowd.",
    "and":     "Joins questions in one if. A card works only when the cursor touches it and the button was just pressed.",
    "mouse_was_pressed": "True for only the one loop the mouse button goes down - one click, one slime.",
    "key_was_pressed": "True for only the one loop a key goes down. Space starts another round.",
    "animation": "A run of pictures shown one after another. animation(sheet, 20, 0, 7) plays frames 0 to 7 of a sprite sheet, 20 a second.",
    "visible": "Whether an object is drawn. The cursor has visible = False - it works, but you never see it.",
    "if":      "Runs the lines under it only when its question is true. The if ends with a colon and the lines under it are pushed in four spaces.",
    "elif":    "Short for else if. It asks another question, only when every question above it was no.",
    "else":    "Goes under an if, lined up with it. Its lines run when nothing above it was true.",
    "min":     "Gives back the smaller of two numbers. min(250, ...) keeps a top-lane unit from ever going above 250.",
    "max":     "Gives back the bigger of two numbers. max(20, ...) keeps the enemy's wait from ever going under 20.",
    "timer":   "A number that changes by one every loop. The enemy base counts to spawnTime, makes a unit and starts again.",
    "team":    "Words a base or a unit keeps - 'player' or 'enemy' - so objects of one class can tell friend from foe.",
    "import":  "Brings one of Python's toolboxes into your code. import random lets you pick random numbers.",
    "random":  "random.randint(1, 3) picks a whole number from 1 to 3, a different one each time - how each bat picks its lane.",
    "scale":   "How big a picture is drawn: 1 as you drew it, 0.5 half, 2 double. A minus scaleX flips it too.",
    "notequal": "!= asks whether two things are different. A unit only hits units whose team != its own.",
    "destroy": "Takes an object out of the game for good. destroy(self) removes the unit whose health ran out.",
    "text":    "Words on the screen. text('You Win', -380, 120) writes them with their top left corner at x -380, y 120.",
    "z":       "Which objects are drawn in front. Everything starts at 0; the health bars have z 1, so nothing covers them.",
    "boolean": "A value that is either True or False, like self.isGhost = False - a switch that is on or off.",
    "not":     "Turns True into False and False into True. not self.isGhost is True for every unit that is not a ghost.",
}

# Animated metaphors. Reuses build.concept_visual's library - see SLIDE-RULES.
VISUALS = {
    "py:start": {"kind": "machine", "in": "object made", "label": "start", "out": "done once",
                 "cap": "[[start]] runs one time, then never again."},
    "py:loop": {"kind": "loop", "items": ["1", "2", "3", "4"],
                "cap": "[[loop]] runs again and again, about 60 times a second."},
    "py:room": {"kind": "swap", "off": "Menu", "on": "Play",
                "cap": "A [[room]] is one screen. set_room picks which one you see."},
    "py:sprite": {"kind": "swap", "off": "nothing", "on": "your art",
                  "cap": "[[sprite]]() puts the picture you drew onto the [[object]]."},
    "py:make": {"kind": "dom", "parent": "Play", "child": "a Base", "mode": "add",
                "cap": "Base() builds one from the blueprint."},
    "py:coords": {"kind": "resize", "axis": "w",
                  "cap": "x is left and right. Minus numbers go LEFT."},
    "py:variable": {"kind": "machine", "in": "2", "label": "self.speed", "out": "kept",
                    "cap": "A [[variable]] is a name that keeps a value for later."},
    "py:change": {"kind": "machine", "in": "x = 100", "label": "+= 2", "out": "x = 102",
                  "cap": "+= adds to what is already there."},
    "py:if": {"kind": "fork", "cond": "health <= 0?", "yes": "destroy", "no": "keep going",
              "cap": "[[if]] means only when - the pushed-in lines run only if it is true."},
    "py:collision": {"kind": "fork", "cond": "touching a base?", "yes": "strike it", "no": "march on",
                     "cap": "[[get_collision]] answers with the base you touch, or False."},
    "py:collisionlist": {"kind": "loop", "items": ["bat", "bat", "golem"],
                         "cap": "[[get_collision_list]] is everything you touch, one after another."},
    "py:mouse": {"kind": "event", "btn": "move the mouse", "action": "cursor follows",
                 "cap": "[[mouse_x]]() is where the mouse is, right now."},
    "py:tap": {"kind": "event", "btn": "click", "action": "one slime",
               "cap": "[[mouse_was_pressed]] is True for one loop only - one click, one slime."},
    "py:key": {"kind": "event", "btn": "space", "action": "play again",
               "cap": "[[key_was_pressed]] is True for the one loop the key goes down."},
    "py:timer": {"kind": "loop", "items": ["0", "1", "...", "60"],
                 "cap": "The base's [[timer]] counts up; at 60 an enemy comes."},
    "py:bool": {"kind": "swap", "off": "True", "on": "False",
                "cap": "A [[boolean]] is a switch: True or False."},
    "py:else": {"kind": "fork", "cond": "your base?", "yes": "You Lose", "no": "You Win",
                "cap": "[[else]] runs when the if is not true."},
    "py:elif": {"kind": "fork", "cond": "lane 1?", "yes": "bend down", "no": "ask: lane 3?",
                "cap": "[[elif]] is asked only when the question above it was no."},
    "py:notequal": {"kind": "fork", "cond": "other team?", "yes": "hit it", "no": "leave it",
                    "cap": "[[!=|notequal]] is True when the two are different."},
    "py:not": {"kind": "machine", "in": "True", "label": "not", "out": "False",
               "cap": "[[not]] turns the answer round."},
    "py:destroy": {"kind": "swap", "off": "a slime", "on": "(gone)",
                   "cap": "[[destroy]] takes an object out of the game for good."},
    "py:divide": {"kind": "machine", "in": "20 / 25", "label": "/", "out": "0.8",
                  "cap": "Health / the most health is how full the bar is."},
    "py:text": {"kind": "swap", "off": "(nothing)", "on": "You Win",
                "cap": "[[text]]() writes words on the screen."},
    "py:random": {"kind": "machine", "in": "1 to 3", "label": "randint", "out": "2",
                  "cap": "[[random.randint|random]] picks a number - a different one each time."},
    "py:visible": {"kind": "swap", "off": "visible = True", "on": "visible = False",
                   "cap": "[[visible]] False hides the object, but it still runs."},
    "py:scale": {"kind": "resize", "axis": "w",
                 "cap": "[[scale]] shrinks the bar: 1 is full size, 0 is nothing."},
    "py:flip": {"kind": "swap", "off": "scaleX 1", "on": "scaleX -1",
                "cap": "A minus [[scale]] draws the picture back to front."},
    "py:for": {"kind": "loop", "items": ["250", "0", "-250"],
               "cap": "[[for]] runs its lines once for every value in the [[list]]."},
    "py:min": {"kind": "machine", "in": "250, 400", "label": "min", "out": "250",
               "cap": "[[min]]() gives back the smaller."},
    "py:max": {"kind": "machine", "in": "20, 35", "label": "max", "out": "35",
               "cap": "[[max]]() gives back the bigger."},
    "py:animation": {"kind": "loop", "items": ["0", "1", "...", "7"],
                     "cap": "An [[animation]] shows its frames one after another."},
}

LINE_NOTES = {
    (GAME_START, "sides"): [
        "Your bases stand at x -400.",
        "The enemy's at 500.",
    ],
    (GAME_START, "count"): ["At most 30 units out at once."],
    (1, GAME_START, "room"): ["Change to the Play room."],
    (GAME_START, "room"): ["CHANGED: start in the Menu room."],
    (BACK_START, "look"): ["Use the background you drew."],
    (BASE_START, "look"): [
        "Use the base you drew.",
        "Stand on your side - the left.",
    ],
    (BASE_START, "team"): [
        "Every base starts on your team.",
        "The timer starts at 0.",
        "Wait 60 loops - one second.",
    ],
    (BASE_START, "health"): [
        "25 hits to knock it down.",
        "Make a bar, and keep it.",
        "The most health it will ever have.",
    ],
    (BASE_LOOP, "import"): ["At the VERY TOP: bring in Python's random toolbox."],
    (BASE_LOOP, "spawn"): [
        "One more loop counted.",
        "Counted far enough - and the enemy's base?",
    ],
    (BASE_LOOP, "enemy"): [
        "Make a unit...",
        "...on the enemy team...",
        "...at this base.",
        "A minus speed: it walks left.",
        "Flip it to face you.",
        "Cut the bat's sheet into 8 frames.",
        "Play them, 20 a second.",
        "Give the bat's animation to the enemy.",
        "A random lane: 1, 2 or 3.",
    ],
    (BASE_LOOP, "golem"): [
        "Roll 1 to 10 - on a 1:",
        "Cut the golem's sheet into 8 frames.",
        "Play them, 20 a second.",
        "Give the golem's animation to the enemy.",
        "Twice as wide, and still facing you.",
        "Twice as tall.",
        "Ten hits to stop it.",
        "Half a bat's speed.",
        "The most health it has.",
        "Show its bar.",
        "Put the bar on the golem now...",
        "...70 above it.",
    ],
    (BASE_LOOP, "reset"): [
        "Count from 0 again.",
        "Next time one loop sooner - but never under 20.",
    ],
    (BASE_LOOP, "bar"): [
        "Put the bar on this base...",
        "...80 above its middle...",
        "...as wide as the health left.",
    ],
    (BASE_LOOP, "over"): [
        "Out of health?",
        "Your base?",
        "You lose.",
        "Otherwise...",
        "...it was theirs: you win.",
    ],
    (BRIDGE_START, "look"): [
        "Use the bridge you drew.",
        "Halfway between the two sides.",
    ],
    (CARD_START, "look"): [
        "Use the slime card you drew.",
        "150 left of your bases.",
        "Lane 2, unless told otherwise.",
        "A slime costs 1.",
        "Not a ghost, unless told otherwise.",
    ],
    (3, CARD_LOOP, "click"): [
        "Am I touching the cursor?",
        "Touching, and just clicked?",
    ],
    (CARD_LOOP, "click"): [
        "Am I touching the cursor?",
        "CHANGED: touching, just clicked - and room in the army for this card?",
    ],
    (CARD_LOOP, "make"): [
        "Make a unit...",
        "...at your bases...",
        "...at this card's height.",
        "It walks this card's lane.",
        "It remembers what it cost...",
        "...and the army grows by that much.",
    ],
    (CARD_LOOP, "ghost"): [
        "A ghost card?",
        "Cut the ghost's sheet into 8 frames.",
        "Play them, 20 a second.",
        "Give the ghost's animation to the unit.",
        "Mark it a ghost.",
        "It hits for 5.",
        "It moves at 3.",
    ],
    (UNIT_START, "look"): [
        "Cut the slime's sheet into 1 row of 8 frames.",
        "Play frames 0 to 7, 20 a second.",
        "Give the animation to this unit.",
    ],
    (UNIT_START, "setup"): [
        "Move 2 every loop.",
        "The middle lane, unless told otherwise.",
        "Your team, unless told otherwise.",
        "One hit and you are gone.",
        "You hit for one.",
        "Make a bar, and keep it...",
        "...hidden.",
        "The most health you will ever have.",
        "Not a ghost, unless told otherwise.",
    ],
    (UNIT_LOOP, "march"): ["Move by your speed - a minus speed walks left."],
    (UNIT_LOOP, "path"): [
        "Top lane?",
        "The smaller of 250 and the distance left to go.",
        "Bottom lane?",
        "The bigger of -250 and minus that distance.",
    ],
    (6, UNIT_LOOP, "fight"): [
        "For every unit I am touching...",
        "...on the other team...",
        "...take my attack off its health.",
    ],
    (UNIT_LOOP, "fight"): [
        "For every unit I am touching...",
        "...on the other team...",
        "NEW: ...and if neither of us is a ghost...",
        "Do not retype this line - push it in four more spaces, under the new if.",
    ],
    (UNIT_LOOP, "strike"): [
        "Which base am I touching, if any?",
        "Touching one on the other team?",
        "Hit it.",
        "And be spent.",
    ],
    (UNIT_LOOP, "bar"): [
        "Put the bar on this unit...",
        "...70 above its middle...",
        "...as wide as the health left.",
    ],
    (6, UNIT_LOOP, "die"): [
        "Out of health?",
        "Remove this unit.",
    ],
    (9, UNIT_LOOP, "die"): [
        "Out of health?",
        "NEW: One of yours?",
        "NEW: Give its cost back to the army.",
        "Remove this unit.",
    ],
    (UNIT_LOOP, "die"): [
        "Out of health?",
        "One of yours?",
        "Give its cost back to the army.",
        "NEW: Remove its bar first.",
        "Remove this unit.",
    ],
    (CURSOR_START, "look"): [
        "Use the dot you drew.",
        "Never draw me.",
    ],
    (CURSOR_LOOP, "follow"): [
        "Go to the mouse's x...",
        "...and its y.",
    ],
    (BAR_START, "look"): [
        "Use the bar you drew.",
        "Drawn above everything else.",
    ],
    (MANA_START, "look"): ["Use the mana bar you drew."],
    (BUTTON_START, "look"): [
        "Use the button you drew.",
        "Easy, unless told otherwise.",
    ],
    (BUTTON_LOOP, "click"): [
        "Am I touching the cursor?",
        "Touching, and just clicked?",
        "The easy button?",
        "An army of 35.",
        "Otherwise...",
        "...an army of 25.",
        "Either way, to the battle.",
    ],
    (PLAY_START, "back"): ["Make the background first, so it is drawn at the back."],
    (PLAY_START, "lanes"): [
        "For each lane's height...",
        "...make a base...",
        "...at that height...",
        "...and a bridge...",
        "...at that height too.",
    ],
    (PLAY_START, "enemy"): [
        "One more base...",
        "...on the enemy's side.",
        "It is the enemy's.",
    ],
    (PLAY_START, "cards"): [
        "A card for the top...",
        "...at y 250.",
        "A card for the bottom...",
        "...at y -250.",
        "And one in the middle, at y 0.",
        "The top card sends to lane 1...",
        "...and the bottom card to lane 3.",
    ],
    (PLAY_START, "ghost"): [
        "A fourth card...",
        "...on the right...",
        "...at the bottom.",
        "Its ghost walks lane 3.",
        "It costs 10.",
        "It is a ghost card.",
        "With the ghost card's picture.",
    ],
    (PLAY_START, "count"): ["No units out yet - every round."],
    (PLAY_START, "mana"): [
        "Make the mana bar, and keep it...",
        "...along the bottom.",
    ],
    (PLAY_START, "cursor"): ["Make the cursor - last, so on top."],
    (PLAY_LOOP, "mana"): ["As wide as the part of your army that is left."],
    (WIN_START, "screen"): [
        "Write You Win across the middle...",
        "...in green...",
        "...and big.",
    ],
    (WIN_START, "hint"): [
        "Tell them how to play again...",
        "...a little smaller.",
    ],
    (WIN_LOOP, "restart"): [
        "Space just pressed?",
        "Back to the battle.",
    ],
    (LOSE_START, "screen"): [
        "Write You Lose across the middle...",
        "...in red...",
        "...and big.",
    ],
    (LOSE_START, "hint"): [
        "Tell them how to play again...",
        "...a little smaller.",
    ],
    (LOSE_LOOP, "restart"): [
        "Space just pressed?",
        "Back to the battle.",
    ],
    (MENU_START, "labels"): [
        "Easy, on the left...",
        "...big.",
        "Hard, on the right...",
        "...big.",
    ],
    (MENU_START, "buttons"): [
        "The easy button...",
        "...under Easy.",
        "The hard button...",
        "...under Hard...",
        "...and it is the hard one.",
        "A cursor for the menu - the one in Play is gone.",
    ],
}

# A note for a slide that strikes lines out. Keyed (week, panel, block) when one
# block changes in more than one week, so each week's says what that week does.
DELETE_NOTES = {
    (9, CARD_LOOP, "click"): "This line changes - the if asks a third question. Take it out; the new if goes in its place.",
    (10, GAME_START, "room"): "This line changes - the game starts in the menu now. Take it out; the new line goes in its place.",
}


# --- what pressing Play should show you -------------------------------------
#
# One line per step, keyed (week, panel, block). A step that changes nothing
# you can see says so, so working code is never mistaken for broken code.
CHECKS = {
    (1, BACK_START, "look"):
        "Nothing to see yet - you have described a background, but nothing goes to Play. "
        "You are checking there is no red error.",
    (1, PLAY_START, "back"):
        "Still nothing - nothing goes to Play yet.",
    (1, GAME_START, "sides"):
        "Still nothing - nothing goes to Play yet.",
    (1, GAME_START, "room"):
        "Your background fills the screen.",
    (1, BASE_START, "look"):
        "No change - nothing makes a base yet.",
    (1, BRIDGE_START, "look"):
        "No change - nothing makes a bridge yet.",
    (1, PLAY_START, "lanes"):
        "Three bases stand on the left, one above the other, and three bridges cross the "
        "middle.",
    (1, PLAY_START, "enemy"):
        "A fourth base stands on the right, level with your middle one.",
    (2, CARD_START, "look"):
        "No change - nothing makes a card yet.",
    (2, PLAY_START, "cards"):
        "Three cards stand to the left of your bases, one beside each.",
    (2, CURSOR_START, "look"):
        "No change - nothing makes a cursor yet.",
    (2, CURSOR_LOOP, "follow"):
        "No change - nothing makes a cursor yet.",
    (2, PLAY_START, "cursor"):
        "A red dot follows the mouse over the game.",
    (3, UNIT_START, "look"):
        "No change - nothing makes a unit yet.",
    (3, CARD_LOOP, "click"):
        "Do not press Play yet - an if with nothing under it is an error until the next "
        "step.",
    (3, CARD_LOOP, "make"):
        "Click a card: a wobbling slime appears on the base beside it.",
    (3, CURSOR_START, "look"):
        "The red dot is gone, but clicking a card still makes a slime.",
    (4, UNIT_START, "setup"):
        "No change you can see - nothing uses the speed yet.",
    (4, UNIT_LOOP, "march"):
        "Click a card: its slime walks straight to the right, off the screen.",
    (4, CARD_START, "look"):
        "No change you can see.",
    (4, PLAY_START, "cards"):
        "No change you can see - the units are not told the lane yet.",
    (4, CARD_LOOP, "make"):
        "No change you can see - nothing reads the lane yet.",
    (4, UNIT_LOOP, "path"):
        "Click all three cards: the top and bottom slimes bend in to meet at the enemy "
        "base.",
    (5, BASE_START, "team"):
        "No change you can see.",
    (5, PLAY_START, "enemy"):
        "No change you can see.",
    (5, BASE_LOOP, "spawn"):
        "Do not press Play yet - an if with nothing under it is an error until the next "
        "step.",
    (5, BASE_LOOP, "enemy"):
        "After a second, a flood of slimes pours out of the enemy base - the timer never "
        "starts again yet.",
    (5, BASE_LOOP, "reset"):
        "Every second a slime leaves the enemy base and walks left.",
    (5, UNIT_START, "setup"):
        "No change you can see - the enemy base already sets its own units' team.",
    (6, BASE_LOOP, "import"):
        "No change - nothing uses random yet.",
    (6, BASE_LOOP, "enemy"):
        "Bats leave the enemy base facing you, each down a lane of its own.",
    (6, UNIT_START, "setup"):
        "No change you can see.",
    (6, UNIT_LOOP, "fight"):
        "No change you can see - units lose health, but nothing removes them yet.",
    (6, UNIT_LOOP, "die"):
        "When a slime meets a bat, both disappear.",
    (7, BASE_START, "health"):
        "No change you can see.",
    (7, UNIT_LOOP, "strike"):
        "Units vanish when they reach a base on the other team.",
    (7, WIN_START, "screen"):
        "No change - nothing goes to YouWin yet.",
    (7, LOSE_START, "screen"):
        "No change - nothing goes to YouLose yet.",
    (7, BASE_LOOP, "over"):
        "Let the bats through: when one of your bases falls, You Lose fills the screen.",
    (8, BAR_START, "look"):
        "No change - nothing makes a bar yet.",
    (8, BASE_START, "health"):
        "Red bars sit in the middle of the screen, all on top of each other - nothing "
        "moves them yet.",
    (8, BASE_LOOP, "bar"):
        "A red bar sits above every base, and shrinks as the base is hit.",
    (8, WIN_START, "hint"):
        "Win, and the hint is written under You Win.",
    (8, WIN_LOOP, "restart"):
        "Win, then press space: a fresh battle starts.",
    (8, LOSE_START, "hint"):
        "Lose, and the hint is written under You Lose.",
    (8, LOSE_LOOP, "restart"):
        "Lose, then press space: a fresh battle starts.",
    (9, GAME_START, "count"):
        "No change you can see.",
    (9, PLAY_START, "count"):
        "No change you can see.",
    (9, CARD_START, "look"):
        "No change you can see.",
    (9, CARD_LOOP, "click"):
        "No change you can see - nothing adds to the count yet.",
    (9, CARD_LOOP, "make"):
        "Send 30 slimes: then the cards stop working for good - nothing gives the count "
        "back yet.",
    (9, UNIT_LOOP, "die"):
        "After 30 slimes the cards stop, until some are gone.",
    (10, GAME_START, "room"):
        "A black screen - the Menu room has nothing in it yet.",
    (10, MENU_START, "labels"):
        "Easy and Hard are written across the top.",
    (10, BUTTON_START, "look"):
        "No change - nothing makes a button yet.",
    (10, MENU_START, "buttons"):
        "Two orange buttons sit under the words. Clicking does nothing yet.",
    (10, BUTTON_LOOP, "click"):
        "Click a button: the battle starts.",
    (11, BASE_LOOP, "golem"):
        "Now and then a big, slow golem comes instead of a bat.",
    (12, UNIT_START, "setup"):
        "No change you can see - every unit's bar is hidden.",
    (12, UNIT_LOOP, "bar"):
        "No change you can see.",
    (12, UNIT_LOOP, "die"):
        "No change you can see.",
    (12, BASE_LOOP, "golem"):
        "A golem has a bar above it that shrinks as it is hit.",
    (13, CARD_START, "look"):
        "No change you can see.",
    (13, UNIT_START, "setup"):
        "No change you can see.",
    (13, PLAY_START, "ghost"):
        "A ghost card sits at the bottom on the right. Clicking it makes a slime in the "
        "bottom lane.",
    (13, CARD_LOOP, "ghost"):
        "Click the ghost card: a ghost walks the bottom lane - and dies at the first bat.",
    (14, UNIT_LOOP, "fight"):
        "A ghost drifts through the bats, and they through it.",
    (14, CARD_LOOP, "ghost"):
        "The ghost moves faster than the slimes, and strikes the enemy base for 5.",
    (14, BASE_LOOP, "golem"):
        "A golem's bar appears above it - nothing flashes in the middle.",
    (15, MANA_START, "look"):
        "No change - nothing makes a mana bar yet.",
    (15, PLAY_START, "mana"):
        "A full blue bar lies along the bottom of the screen.",
    (15, PLAY_LOOP, "mana"):
        "Send slimes: the blue bar shrinks, and grows back as they fall.",
    (15, BASE_LOOP, "reset"):
        "The bats come a little faster every time.",
}


def check_for(week_n, panel, block):
    """What to look for after Play, for one step. The build refuses to ship a
    step that has no line, so this may raise rather than return nothing."""
    return CHECKS[(week_n, panel, block)]

QUIZZES = {
    (1, PLAY_START, "enemy"): [
        {"q": "What is a room?",
         "options": ["One screen of your game", "A class", "A picture", "A base"], "answer": 0,
         "why": "Play is a room; set_room picks which one you see."},
        {"q": "Why is game.leftSide kept in game.?",
         "options": ["So every class can reach it", "So it is drawn first",
                     "Python needs it", "So it can not change"], "answer": 0,
         "why": "The cards and units need it too - it is described once."},
        {"q": "for laneY in [250, 0, -250]: - how many times do its lines run? (this week)",
         "options": ["3", "1", "250", "4"], "answer": 0,
         "why": "Once for each value in the list."},
    ],
    (2, PLAY_START, "cursor"): [
        {"q": "Where is x 0, y 0?",
         "options": ["The middle of the screen", "The top left", "The bottom left",
                     "The top right"], "answer": 0,
         "why": "0, 0 is the middle; plus x is right and plus y is up."},
        {"q": "Which is made first in Play start?",
         "options": ["The background", "The cursor", "The cards", "The enemy base"], "answer": 0,
         "why": "Made first is drawn at the back."},
        {"q": "Why does the mouse need a Cursor object? (this week)",
         "options": ["So a card can ask whether it is touching it", "To draw the mouse",
                     "To make the mouse faster", "Python needs one"], "answer": 0,
         "why": "Touching is between two objects - the cursor stands in for the mouse."},
    ],
    (3, CURSOR_START, "look"): [
        {"q": "The bottom card is at game.leftSide - 150. Where is that?",
         "options": ["-550", "-250", "150", "-400"], "answer": 0,
         "why": "-400 - 150 is -550."},
        {"q": "What does mouse_x() give back?",
         "options": ["Where the mouse is across, right now", "Whether it was clicked",
                     "The cursor's picture", "Always 0"], "answer": 0,
         "why": "Asked every loop, it follows the mouse."},
        {"q": "Why mouse_was_pressed and not mouse_is_pressed? (this week)",
         "options": ["One click makes one slime", "It is faster", "It works on a touchpad",
                     "The other does not exist"], "answer": 0,
         "why": "mouse_was_pressed is True for one loop only."},
    ],
    (4, UNIT_LOOP, "path"): [
        {"q": "sprite('slimeUnit.png', 1, 8) - how many frames?",
         "options": ["8", "1", "9", "18"], "answer": 0,
         "why": "1 row of 8."},
        {"q": "cardClicked is False. Does the if run?",
         "options": ["No", "Yes", "Only if you click", "Only once"], "answer": 0,
         "why": "and needs both to be yes."},
        {"q": "min(250, 400) is? (this week)",
         "options": ["250", "400", "650", "-150"], "answer": 0,
         "why": "min gives back the smaller."},
    ],
    (5, UNIT_START, "setup"): [
        {"q": "A slime has speed 2. How far does it go in one second?",
         "options": ["120", "2", "60", "30"], "answer": 0,
         "why": "2 every loop, 60 loops a second."},
        {"q": "When is elif asked?",
         "options": ["Only when the if above was no", "Always", "Only when the if was yes",
                     "Never"], "answer": 0,
         "why": "elif is else if."},
        {"q": "Why does an enemy with speed -2 walk left? (this week)",
         "options": ["Adding a minus number takes away", "It is flipped",
                     "The enemy base pushes it", "Its team is 'enemy'"], "answer": 0,
         "why": "self.x += -2 takes 2 off x every loop."},
    ],
    (6, UNIT_LOOP, "die"): [
        {"q": "What are the four parts of a timer?",
         "options": ["Set, count, check, reset", "Start, loop, stop, go",
                     "Make, move, hide, show", "if, elif, else, end"], "answer": 0,
         "why": "Every timer in this game has those four."},
        {"q": "Why does only the enemy base make enemies?",
         "options": ["The if asks for the enemy team", "It is on the right",
                     "It is made last", "The others have no timer"], "answer": 0,
         "why": "self.team == 'enemy' is only true for that one."},
        {"q": "What does != ask? (this week)",
         "options": ["Are these different?", "Are these equal?", "Is it bigger?",
                     "Is it True?"], "answer": 0,
         "why": "!= is the opposite of ==."},
    ],
    (7, BASE_LOOP, "over"): [
        {"q": "enemy.scaleX = -1 does what?",
         "options": ["Flips the picture", "Hides it", "Makes it tiny", "Moves it left"], "answer": 0,
         "why": "A minus scale draws it back to front."},
        {"q": "Touching nothing, how many times does a for over get_collision_list run?",
         "options": ["None", "Once", "Sixty", "For ever"], "answer": 0,
         "why": "The list is empty."},
        {"q": "Why does a slime set its own health to 0 after a strike? (this week)",
         "options": ["So it is spent, and the die block removes it", "To win the game",
                     "To heal the base", "To change team"], "answer": 0,
         "why": "Otherwise it would hit the base every loop."},
    ],
    (8, LOSE_LOOP, "restart"): [
        {"q": "How many slimes must strike the enemy base to win?",
         "options": ["25", "1", "30", "3"], "answer": 0,
         "why": "Its health is 25, and each strike takes 1."},
        {"q": "An if inside an if is pushed in how far?",
         "options": ["Eight spaces", "Four spaces", "None", "Two spaces"], "answer": 0,
         "why": "Four more than the if it sits in."},
        {"q": "Health 20, maxHealth 25. What is the bar's scaleX? (this week)",
         "options": ["0.8", "20", "0.2", "1"], "answer": 0,
         "why": "20 / 25 is 0.8."},
    ],
    (9, UNIT_LOOP, "die"): [
        {"q": "Why is self.z = 1 in HealthBar start?",
         "options": ["So bars are drawn on top", "So they move", "So they are hidden",
                     "So they shrink"], "answer": 0,
         "why": "A higher z is drawn above everything at 0."},
        {"q": "What does key_was_pressed('space') give back?",
         "options": ["True for the one loop space goes down", "The space bar's name",
                     "True while space is held", "A number"], "answer": 0,
         "why": "Like mouse_was_pressed, but for a key."},
        {"q": "unitCount is 30 and maxCount 30. Can you play a slime? (this week)",
         "options": ["No", "Yes", "Only in lane 2", "Only on Easy"], "answer": 0,
         "why": "30 + 1 is 31, over 30."},
    ],
    (10, BUTTON_LOOP, "click"): [
        {"q": "Why is game.unitCount = 0 in Play start, not Game start?",
         "options": ["So every round starts at 0", "So it runs first",
                     "Play is faster", "Game start can not hold numbers"], "answer": 0,
         "why": "Game start runs once; Play start runs every round."},
        {"q": "A unit dies. Why is its cost given back ABOVE destroy(self)?",
         "options": ["Say everything before the unit is gone", "It is shorter",
                     "destroy needs the cost", "It does not matter"], "answer": 0,
         "why": "Do what you need before you go."},
        {"q": "Why is set_room('Play') lined up with the inside if? (this week)",
         "options": ["So both buttons start the game", "So only Easy starts it",
                     "So only Hard starts it", "It does not matter"], "answer": 0,
         "why": "It runs after the if and the else, for either button."},
    ],
    (11, BASE_LOOP, "golem"): [
        {"q": "Why does the menu need its own Cursor()?",
         "options": ["Changing room removes the one before", "It is a different colour",
                     "Menus need two", "It does not"], "answer": 0,
         "why": "set_room removes everything from the room before."},
        {"q": "You pick Hard. What is game.maxCount?",
         "options": ["25", "35", "30", "0"], "answer": 0,
         "why": "The hard button sets 25."},
        {"q": "random.randint(1, 10) == 1 is true about how often? (this week)",
         "options": ["One time in ten", "Always", "Never", "Half the time"], "answer": 0,
         "why": "One number out of ten."},
    ],
    (12, BASE_LOOP, "golem"): [
        {"q": "scaleX -2 does what?",
         "options": ["Flips the picture and doubles its width", "Halves it",
                     "Hides it", "Moves it 2 left"], "answer": 0,
         "why": "The minus flips; the 2 doubles."},
        {"q": "Why is the golem slower than a bat?",
         "options": ["To make it fair", "It is bigger, so the engine slows it",
                     "It has more frames", "It is not"], "answer": 0,
         "why": "Ten health and fast would be too strong."},
        {"q": "Why must the golem's maxHealth be set to 10? (this week)",
         "options": ["Otherwise its bar is ten times too wide", "So it has more health",
                     "So it moves", "So its bar is hidden"], "answer": 0,
         "why": "Unit start set maxHealth from a health of 1."},
    ],
    (13, CARD_LOOP, "ghost"): [
        {"q": "Why does a unit destroy its bar before itself?",
         "options": ["Otherwise the bar is left where it died", "To win",
                     "So the bar is shown", "It does not"], "answer": 0,
         "why": "Clean up what you own before you go."},
        {"q": "A bar with visible = False - does it still exist?",
         "options": ["Yes, it is only not drawn", "No", "Only in start",
                     "Only on Hard"], "answer": 0,
         "why": "Hidden is still there, and still runs."},
        {"q": "Why is there no GhostCard class? (this week)",
         "options": ["The ghost card is a Card with different values", "Python allows one card class",
                     "Ghosts are not cards", "It would be slower"], "answer": 0,
         "why": "Its picture, lane, cost and isGhost are changed in Play start."},
    ],
    (14, BASE_LOOP, "golem"): [
        {"q": "if self.isGhost: - why no == True?",
         "options": ["isGhost already is True or False", "It is shorter",
                     "== does not work on words", "Python forbids it"], "answer": 0,
         "why": "The value is already the answer."},
        {"q": "maxCount 30, unitCount 25. Can you play the ghost?",
         "options": ["No", "Yes", "Only in lane 3", "Only once"], "answer": 0,
         "why": "25 + 10 is 35, over 30."},
        {"q": "not True is? (this week)",
         "options": ["False", "True", "0", "Nothing"], "answer": 0,
         "why": "not turns the answer round."},
    ],
    (15, BASE_LOOP, "reset"): [
        {"q": "Why did the golem's bar flash in the middle?",
         "options": ["A new object is drawn once before its loop runs", "The bar was too big",
                     "The golem was hidden", "random picked 0"], "answer": 0,
         "why": "The bar is made at 0, 0, and the unit's loop moves it a frame late."},
        {"q": "A slime touches a ghost. Do they fight?",
         "options": ["No", "Yes", "Only the slime is hit", "Only the ghost is hit"], "answer": 0,
         "why": "The hit needs neither to be a ghost."},
        {"q": "max(20, 19) is? (this week)",
         "options": ["20", "19", "39", "1"], "answer": 0,
         "why": "max gives back the bigger - the wait never goes under 20."},
    ],
}

# Every week explains each line it adds, one slide per line.
EXPANDED_WEEKS = set(range(1, 16))
