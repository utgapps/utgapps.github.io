// Python Coding Challenges: the library.
//
// Each challenge is one game mechanic - a double jump, a bouncing fireball -
// with a finished example the student can PLAY but not read, and a list of
// what their own game has to do. The same list is what the checker grades
// against, so what a student is told and what they are judged on are one
// thing and cannot drift apart.
//
// The examples are ordinary game projects in the shape the editor saves
// (panel files plus game.txt), run by the same inlined engine as the editor's
// preview. Their pictures are plain colour blocks named in game.txt, so an
// example needs no network and no media of its own.
//
// "Hidden" means not shown on the page. The example still has to reach the
// browser to run, so a student who opens the developer tools can find it;
// that is a gate for a ten-year-old, not a vault.

export type Difficulty = "starter" | "explorer" | "master";

export const DIFFICULTIES: { id: Difficulty; title: string; blurb: string }[] = [
  { id: "starter", title: "Starter", blurb: "One idea at a time: moving, falling, touching." },
  { id: "explorer", title: "Explorer", blurb: "Mechanics with memory: counting jumps, timers, things you throw." },
  { id: "master", title: "Master", blurb: "Mechanics that think: who hit whom, from where, and how hard." },
];

export type Challenge = {
  id: string;
  title: string;
  difficulty: Difficulty;
  /** One line for the library card. */
  summary: string;
  /** What the challenge is, for the challenge page. Second person. */
  description: string;
  /** What your game has to do. Shown on the page AND sent to the checker. */
  requirements: string[];
  /** The controls of the example, one per line: [keys, what they do]. */
  controls: [string, string][];
  /** The example game, as the editor would save it. */
  files: Record<string, string>;
};

/* A game, spelled the way the editor saves one. Every example has one room
   called Play, and Game.start.py does nothing but go there. */
function game(sprites: string[], panels: Record<string, string>): Record<string, string> {
  const files: Record<string, string> = {
    "game.txt": ["room Play", ...sprites.map((line) => "sprite " + line)].join("\n") + "\n",
    "Game.start.py": "set_room('Play')\n",
  };
  for (const [name, code] of Object.entries(panels)) files[name] = code.replace(/^\n/, "");
  return files;
}

/* The floor most of the examples stand on: a green strip along the bottom
   whose top edge is at y = -320. A hero 56 tall stands with its middle at
   -292. */
const GROUND_SPRITE = "ground.png green 1280 40";
const GROUND = { "Ground.start.py": "self.image = sprite('ground.png')\nself.y = -340\n" };

const WALK_AND_FACE = `
if key_is_pressed('left'):
    self.x = self.x - 6
    self.scaleX = -1
if key_is_pressed('right'):
    self.x = self.x + 6
    self.scaleX = 1
if self.x > 620:
    self.x = 620
if self.x < -620:
    self.x = -620
`;

/* Up and down, for a hero who goes anywhere on the screen. */
const UP_AND_DOWN = `
if key_is_pressed('up'):
    self.y = self.y + 6
if key_is_pressed('down'):
    self.y = self.y - 6
`;

/* A line of white text across the top of the screen, for a score. It goes
   at the end of Play.start.py; Play.loop.py sets Game.label.text. */
const LABEL = `
Game.label = text()
Game.label.color = "white"
Game.label.fontSize = 28
Game.label.halign = "center"
Game.label.y = 320
`;

export const CHALLENGES: Challenge[] = [
  {
    id: "walk-and-face",
    title: "Walk and Face",
    difficulty: "starter",
    summary: "A hero who walks in four directions, turns to face the way they walk, and never leaves the screen.",
    description:
      "Make a hero you can steer around the whole screen with the arrow keys. When you walk left, " +
      "the hero turns to face left; when you walk right, they turn back. However hard you hold a key, " +
      "the hero stops at the edge of the screen instead of walking off it.",
    requirements: [
      "The four arrow keys move the hero left, right, up and down while they are held.",
      "The hero flips to face left when moving left and right when moving right (for example with scaleX).",
      "The hero cannot leave the screen on any side.",
    ],
    controls: [["Arrow keys", "walk"]],
    files: game(["hero.png blue 40 56", "eye.png white 10 10"], {
      "Play.start.py": "Game.hero = Hero()\nGame.eye = Eye()\n",
      "Hero.start.py": "self.image = sprite('hero.png')\n",
      "Hero.loop.py": WALK_AND_FACE + `
if key_is_pressed('up'):
    self.y = self.y + 6
if key_is_pressed('down'):
    self.y = self.y - 6
if self.y > 330:
    self.y = 330
if self.y < -330:
    self.y = -330
`,
      "Eye.start.py": "self.image = sprite('eye.png')\n",
      "Eye.loop.py": "self.x = Game.hero.x + 10 * Game.hero.scaleX\nself.y = Game.hero.y + 14\n",
    }),
  },
  {
    id: "jump-with-gravity",
    title: "Jump with Gravity",
    difficulty: "starter",
    summary: "Jump into the air and let gravity pull you back down to the ground.",
    description:
      "Make a hero who stands on the ground, walks left and right, and jumps when you press Space. " +
      "A jump is fast at first, slows down at the top, and speeds up again on the way down - that is " +
      "gravity. The hero lands back on the ground and can only jump again once they have landed.",
    requirements: [
      "The hero walks left and right with the arrow keys.",
      "Pressing Space (or Up) makes the hero jump upward.",
      "Gravity pulls the hero down a little more every frame, so the jump curves smoothly up and back down (a vertical speed that changes every frame, not a fixed teleport).",
      "The hero lands on the ground and stops there instead of falling through it.",
      "The hero cannot jump again while they are already in the air.",
    ],
    controls: [["Left / Right", "walk"], ["Space or Up", "jump"]],
    files: game(["hero.png blue 40 56", GROUND_SPRITE], {
      "Play.start.py": "Ground()\nGame.hero = Hero()\n",
      ...GROUND,
      "Hero.start.py": "self.image = sprite('hero.png')\nself.y = -292\nself.speedY = 0\nself.onGround = True\n",
      "Hero.loop.py": WALK_AND_FACE + `
self.speedY = self.speedY - 1
self.y = self.y + self.speedY
if self.y <= -292:
    self.y = -292
    self.speedY = 0
    self.onGround = True
if self.onGround and (key_was_pressed('space') or key_was_pressed('up')):
    self.speedY = 20
    self.onGround = False
`,
    }),
  },
  {
    id: "coin-collector",
    title: "Coin Collector",
    difficulty: "starter",
    summary: "Touch a coin to collect it, add one to your score, and watch it pop up somewhere new.",
    description:
      "Scatter coins around the screen and steer a hero into them. Every coin you touch adds one to " +
      "the score at the top of the screen, then jumps to a new random place so there is always " +
      "another one to chase.",
    requirements: [
      "The hero moves around the screen with the arrow keys.",
      "There are at least three coins on the screen at once.",
      "Touching a coin adds 1 to a score (for example with get_collision).",
      "The score is shown on the screen as text and updates as coins are collected.",
      "A collected coin moves to a new random position (or is replaced by a new coin) instead of staying where it was.",
    ],
    controls: [["Arrow keys", "move"]],
    files: game(["hero.png blue 40 40", "coin.png yellow 24 24"], {
      "Play.start.py": `
Game.score = 0
Game.hero = Hero()
Coin()
Coin()
Coin()
Game.label = text()
Game.label.color = "white"
Game.label.fontSize = 32
Game.label.halign = "center"
Game.label.y = 320
`,
      "Play.loop.py": "Game.label.text = 'Coins: ' + str(Game.score)\n",
      "Hero.start.py": "self.image = sprite('hero.png')\n",
      "Hero.loop.py": `
if key_is_pressed('left'):
    self.x = self.x - 7
if key_is_pressed('right'):
    self.x = self.x + 7
if key_is_pressed('up'):
    self.y = self.y + 7
if key_is_pressed('down'):
    self.y = self.y - 7
`,
      "Coin.start.py": `
import random
self.image = sprite('coin.png')
self.x = random.randint(-600, 600)
self.y = random.randint(-320, 280)
`,
      "Coin.loop.py": `
import random
self.angle = self.angle + 3
if get_collision(self, 'Hero'):
    Game.score = Game.score + 1
    self.x = random.randint(-600, 600)
    self.y = random.randint(-320, 280)
`,
    }),
  },
  {
    id: "screen-wrap",
    title: "Screen Wrap",
    difficulty: "starter",
    summary: "Fly off one side of the screen and come straight back in on the other.",
    description:
      "Make a spaceship you steer with the arrow keys. The edges of the screen are not walls: fly off " +
      "the right edge and you come back in on the left, fly off the top and you come back in at the " +
      "bottom. A comet drifts across the screen and wraps around the same way.",
    requirements: [
      "The arrow keys move the ship left, right, up and down while they are held.",
      "When the ship goes off the right edge it comes back in on the left edge, and the other way round.",
      "When the ship goes off the top edge it comes back in at the bottom edge, and the other way round.",
      "A second object moves across the screen on its own and wraps around the edges in the same way.",
    ],
    controls: [["Arrow keys", "fly"]],
    files: game(["ship.png cyan 40 40", "comet.png orange 24 24"], {
      "Play.start.py": "Ship()\nComet()\n",
      "Ship.start.py": "self.image = sprite('ship.png')\n",
      "Ship.loop.py": `
if key_is_pressed('left'):
    self.x = self.x - 6
if key_is_pressed('right'):
    self.x = self.x + 6
` + UP_AND_DOWN + `
if self.x > 660:
    self.x = -660
if self.x < -660:
    self.x = 660
if self.y > 380:
    self.y = -380
if self.y < -380:
    self.y = 380
`,
      "Comet.start.py": "self.image = sprite('comet.png')\nself.x = -300\nself.y = 200\n",
      "Comet.loop.py": `
self.x = self.x + 5
self.y = self.y - 2
self.angle = self.angle + 4
if self.x > 660:
    self.x = -660
if self.y < -380:
    self.y = 380
`,
    }),
  },
  {
    id: "bouncing-ball",
    title: "Bouncing Ball",
    difficulty: "starter",
    summary: "A ball that bounces off all four edges of the screen, counting every bounce.",
    description:
      "Make a ball that moves on its own, sideways and up at the same time, and bounces off every " +
      "edge of the screen like a ball in a box. Count every bounce at the top of the screen. Press " +
      "Space to throw in another ball - they all bounce, and they all count.",
    requirements: [
      "A ball moves on its own, sideways and up or down at the same time (a speed for x and a speed for y).",
      "When the ball reaches the left or right edge it bounces back the other way (its x speed flips).",
      "When the ball reaches the top or bottom edge it bounces back too (its y speed flips).",
      "Every bounce adds 1 to a counter that is shown on the screen.",
      "Pressing Space adds another ball that bounces the same way.",
    ],
    controls: [["Space", "throw in another ball"]],
    files: game(["ball.png yellow 30 30"], {
      "Play.start.py": "Game.bounces = 0\nBall()\n" + LABEL,
      "Play.loop.py": `
if key_was_pressed('space'):
    Ball()
Game.label.text = 'Bounces: ' + str(Game.bounces)
`,
      "Ball.start.py": `
import random
self.image = sprite('ball.png')
self.speedX = random.randint(3, 7)
self.speedY = random.randint(3, 7)
`,
      "Ball.loop.py": `
self.x = self.x + self.speedX
self.y = self.y + self.speedY
if self.x > 625 or self.x < -625:
    self.speedX = -self.speedX
    Game.bounces = Game.bounces + 1
if self.y > 345 or self.y < -345:
    self.speedY = -self.speedY
    Game.bounces = Game.bounces + 1
`,
    }),
  },
  {
    id: "slippery-ice",
    title: "Slippery Ice",
    difficulty: "starter",
    summary: "Walking on ice: you speed up slowly, there is a top speed, and you slide when you let go.",
    description:
      "Put your hero on a frozen lake. Holding an arrow key does not move them at one fixed speed: " +
      "they speed up a little every frame, up to a top speed. Let go and they keep sliding, slowing " +
      "down bit by bit until they stop. Turning round takes a moment too, because you have to slow " +
      "down before you can go the other way.",
    requirements: [
      "Holding Left or Right makes the hero speed up a little every frame (a speed variable that grows), instead of moving at one fixed speed.",
      "The hero has a top speed they can never go faster than, in either direction.",
      "When no arrow key is held, the hero keeps sliding and slowly slows down until they stop (friction).",
      "The hero stops at the edges of the screen.",
    ],
    controls: [["Left / Right", "skate"]],
    files: game(["hero.png blue 40 56", "ice.png cyan 1280 40"], {
      "Play.start.py": "Ice()\nHero()\n",
      "Ice.start.py": "self.image = sprite('ice.png')\nself.y = -340\n",
      "Hero.start.py": "self.image = sprite('hero.png')\nself.y = -292\nself.speedX = 0\n",
      "Hero.loop.py": `
if key_is_pressed('left'):
    self.speedX = self.speedX - 0.4
if key_is_pressed('right'):
    self.speedX = self.speedX + 0.4
if not key_is_pressed('left') and not key_is_pressed('right'):
    self.speedX = self.speedX * 0.96
if self.speedX > 10:
    self.speedX = 10
if self.speedX < -10:
    self.speedX = -10
self.x = self.x + self.speedX
if self.x > 620:
    self.x = 620
    self.speedX = 0
if self.x < -620:
    self.x = -620
    self.speedX = 0
`,
    }),
  },
  {
    id: "follow-the-leader",
    title: "Follow the Leader",
    difficulty: "starter",
    summary: "A pet that follows you everywhere - quickly when it is far behind, gently when it catches up.",
    description:
      "Give your hero a pet. Wherever the hero goes, the pet follows, but it does not stick to them: " +
      "every frame it moves part of the way towards a spot just behind the hero. Far away it rushes, " +
      "close up it slows right down, so it glides to a stop at your heels. It always looks at you.",
    requirements: [
      "The hero moves with the arrow keys and faces the way they walk.",
      "Every frame the pet moves part of the way (for example a tenth of the gap) towards the hero, so it moves fast when far away and slows down as it gets close.",
      "The pet stops a little behind the hero instead of sitting exactly on top of them.",
      "The pet flips to face the hero, left or right.",
    ],
    controls: [["Arrow keys", "walk"]],
    files: game(["hero.png blue 40 56", "pet.png orange 28 24"], {
      "Play.start.py": "Game.hero = Hero()\nPet()\n",
      "Hero.start.py": "self.image = sprite('hero.png')\n",
      "Hero.loop.py": WALK_AND_FACE + UP_AND_DOWN,
      "Pet.start.py": "self.image = sprite('pet.png')\nself.x = -400\nself.y = -200\n",
      "Pet.loop.py": `
hero = Game.hero
spotX = hero.x - 60 * hero.scaleX
spotY = hero.y - 16
self.x = self.x + (spotX - self.x) / 10
self.y = self.y + (spotY - self.y) / 10
if hero.x > self.x:
    self.scaleX = 1
else:
    self.scaleX = -1
`,
    }),
  },
  {
    id: "dodge-the-rocks",
    title: "Dodge the Rocks",
    difficulty: "starter",
    summary: "Rocks rain down from the sky. Dodge them for as long as you can.",
    description:
      "Your hero runs along the bottom of the screen while rocks fall from the top, each from a random " +
      "place at its own speed. A rock that reaches the bottom goes back up to the top to fall again. " +
      "A timer counts how many seconds you have survived - and goes back to zero when a rock hits you.",
    requirements: [
      "The hero moves left and right along the bottom of the screen and cannot leave it.",
      "Rocks fall from the top of the screen, each starting at a random x.",
      "A rock that falls past the bottom goes back to the top at a new random x (or is replaced by a new rock).",
      "A timer counts how long you have survived and is shown on the screen.",
      "When a rock hits the hero, the timer goes back to zero.",
    ],
    controls: [["Left / Right", "run"]],
    files: game(["hero.png blue 40 56", "rock.png gray 36 36"], {
      "Play.start.py": "Game.time = 0\nHero()\nRock()\nRock()\nRock()\n" + LABEL,
      "Play.loop.py": "Game.time = Game.time + 1\nGame.label.text = 'Survived: ' + str(int(Game.time / 60)) + ' s'\n",
      "Hero.start.py": "self.image = sprite('hero.png')\nself.y = -320\n",
      "Hero.loop.py": WALK_AND_FACE,
      "Rock.start.py": `
import random
self.image = sprite('rock.png')
self.x = random.randint(-600, 600)
self.y = random.randint(400, 800)
self.speedY = random.randint(4, 9)
`,
      "Rock.loop.py": `
import random
self.y = self.y - self.speedY
self.angle = self.angle + 3
hit = get_collision(self, 'Hero')
if hit:
    Game.time = 0
if hit or self.y < -400:
    self.x = random.randint(-600, 600)
    self.y = 400
    self.speedY = random.randint(4, 9)
`,
    }),
  },
  {
    id: "grow-by-eating",
    title: "Grow by Eating",
    difficulty: "starter",
    summary: "Every snack makes your hero a little bigger - up to a limit.",
    description:
      "Steer a hungry hero to the food. Each bite makes the hero grow a little bigger, and the food " +
      "pops up somewhere new. The hero cannot grow for ever: past a certain size they stay that big. " +
      "Count the bites at the top of the screen.",
    requirements: [
      "The hero moves with the arrow keys.",
      "There is food on the screen at a random place.",
      "When the hero touches the food, the hero grows bigger (for example scaleX and scaleY go up) and the food moves to a new random place.",
      "The hero stops growing at a maximum size.",
      "The number of bites is shown on the screen.",
    ],
    controls: [["Arrow keys", "move"]],
    files: game(["hero.png blue 32 32", "food.png green 20 20"], {
      "Play.start.py": "Game.bites = 0\nHero()\nFood()\n" + LABEL,
      "Play.loop.py": "Game.label.text = 'Bites: ' + str(Game.bites)\n",
      "Hero.start.py": "self.image = sprite('hero.png')\nself.size = 1\n",
      "Hero.loop.py": `
import random
if key_is_pressed('left'):
    self.x = self.x - 6
if key_is_pressed('right'):
    self.x = self.x + 6
` + UP_AND_DOWN + `
food = get_collision(self, 'Food')
if food:
    Game.bites = Game.bites + 1
    if self.size < 3:
        self.size = self.size + 0.25
    self.scaleX = self.size
    self.scaleY = self.size
    food.x = random.randint(-600, 600)
    food.y = random.randint(-320, 280)
`,
      "Food.start.py": `
import random
self.image = sprite('food.png')
self.x = random.randint(-600, 600)
self.y = random.randint(-320, 280)
`,
    }),
  },
  {
    id: "double-jump",
    title: "Double Jump",
    difficulty: "explorer",
    summary: "Jump, then jump again in mid-air - but only once until you land.",
    description:
      "Start from a hero with gravity and a jump, then give them a second jump they can use while " +
      "they are still in the air. After the second jump there are no more until the hero lands - " +
      "then both jumps come back. The example shows how many jumps are left at the top of the screen.",
    requirements: [
      "The hero walks left and right and is pulled down by gravity onto the ground.",
      "Pressing Space (or Up) on the ground makes the hero jump.",
      "Pressing Space again while in the air makes the hero jump a second time from where they are.",
      "A third press in the air does nothing: the hero gets exactly two jumps before landing (count the jumps used with a variable).",
      "Landing on the ground gives both jumps back.",
    ],
    controls: [["Left / Right", "walk"], ["Space or Up", "jump (press again in the air to double jump)"]],
    files: game(["hero.png blue 40 56", GROUND_SPRITE], {
      "Play.start.py": `
Ground()
Game.hero = Hero()
Game.label = text()
Game.label.color = "white"
Game.label.fontSize = 28
Game.label.halign = "center"
Game.label.y = 320
`,
      "Play.loop.py": "Game.label.text = 'Jumps left: ' + str(Game.hero.jumpsLeft)\n",
      ...GROUND,
      "Hero.start.py": "self.image = sprite('hero.png')\nself.y = -292\nself.speedY = 0\nself.jumpsLeft = 2\n",
      "Hero.loop.py": WALK_AND_FACE + `
self.speedY = self.speedY - 1
self.y = self.y + self.speedY
if self.y <= -292:
    self.y = -292
    self.speedY = 0
    self.jumpsLeft = 2
if self.jumpsLeft > 0 and (key_was_pressed('space') or key_was_pressed('up')):
    self.speedY = 17
    self.jumpsLeft = self.jumpsLeft - 1
`,
    }),
  },
  {
    id: "bouncing-fireball",
    title: "Bouncing Fireball",
    difficulty: "explorer",
    summary: "Throw a fireball that bounces along the ground the way you are facing, like a certain plumber.",
    description:
      "Give your hero a fireball to throw. Press F and a fireball shoots out the way the hero is " +
      "facing, falls to the ground and bounces along it in little hops until it leaves the screen. " +
      "Only two fireballs can be out at once, so you cannot just fill the screen.",
    requirements: [
      "The hero walks left and right, faces the way they walk, and can jump.",
      "Pressing F creates a new fireball object next to the hero.",
      "The fireball travels in the direction the hero is facing (left or right).",
      "Gravity pulls the fireball down, and when it reaches the ground it bounces back up, so it hops along the floor.",
      "A fireball that leaves the screen is destroyed.",
      "No more than two fireballs can exist at the same time (for example by checking count_objects).",
    ],
    controls: [["Left / Right", "walk"], ["Space", "jump"], ["F", "throw a fireball"]],
    files: game(["hero.png red 40 56", GROUND_SPRITE, "fireball.png orange 18 18"], {
      "Play.start.py": "Ground()\nGame.hero = Hero()\n",
      ...GROUND,
      "Hero.start.py": "self.image = sprite('hero.png')\nself.y = -292\nself.speedY = 0\nself.facing = 1\n",
      "Hero.loop.py": WALK_AND_FACE + `
self.facing = self.scaleX
self.speedY = self.speedY - 1
self.y = self.y + self.speedY
if self.y <= -292:
    self.y = -292
    self.speedY = 0
    if key_was_pressed('space'):
        self.speedY = 18
if key_was_pressed('f') and count_objects('Fireball') < 2:
    ball = Fireball()
    ball.x = self.x + 30 * self.facing
    ball.y = self.y + 6
    ball.speedX = 9 * self.facing
`,
      "Fireball.start.py": "self.image = sprite('fireball.png')\nself.speedX = 9\nself.speedY = 0\n",
      "Fireball.loop.py": `
self.x = self.x + self.speedX
self.speedY = self.speedY - 1
self.y = self.y + self.speedY
if self.y <= -311:
    self.y = -311
    self.speedY = 10
self.angle = self.angle + 20
if self.x > 660 or self.x < -660:
    destroy(self)
`,
    }),
  },
  {
    id: "dash-with-cooldown",
    title: "Dash with Cooldown",
    difficulty: "explorer",
    summary: "Burst forward in a quick dash, then wait for it to recharge before you can dash again.",
    description:
      "Give your hero a dash. Press Shift and they zoom forward the way they are facing, much faster " +
      "than walking, for a short moment. Then the dash needs time to recharge: the hero turns grey " +
      "while it does, and Shift does nothing until they turn back.",
    requirements: [
      "The hero walks left and right and faces the way they walk.",
      "Pressing Shift starts a dash: for a short, fixed time (a timer counted in frames) the hero moves much faster in the direction they face.",
      "After a dash ends, a cooldown timer starts, and pressing Shift during the cooldown does nothing.",
      "The player can see when the dash is recharging (for example the hero changes colour or picture) and when it is ready again.",
      "The hero still cannot leave the screen, even while dashing.",
    ],
    controls: [["Left / Right", "walk"], ["Shift", "dash"]],
    files: game(["hero.png blue 40 56", "tired.png gray 40 56", GROUND_SPRITE], {
      "Play.start.py": "Ground()\nGame.hero = Hero()\n",
      ...GROUND,
      "Hero.start.py": "self.image = sprite('hero.png')\nself.y = -292\nself.dashTime = 0\nself.cooldown = 0\n",
      "Hero.loop.py": `
if self.dashTime > 0:
    self.x = self.x + 24 * self.scaleX
    self.dashTime = self.dashTime - 1
    if self.dashTime == 0:
        self.cooldown = 45
        self.image = sprite('tired.png')
else:
    if key_is_pressed('left'):
        self.x = self.x - 6
        self.scaleX = -1
    if key_is_pressed('right'):
        self.x = self.x + 6
        self.scaleX = 1
if self.cooldown > 0:
    self.cooldown = self.cooldown - 1
    if self.cooldown == 0:
        self.image = sprite('hero.png')
if key_was_pressed('shift') and self.dashTime == 0 and self.cooldown == 0:
    self.dashTime = 10
if self.x > 620:
    self.x = 620
if self.x < -620:
    self.x = -620
`,
    }),
  },
  {
    id: "hold-to-jump-higher",
    title: "Hold to Jump Higher",
    difficulty: "explorer",
    summary: "Tap for a little hop, hold for a big leap - the jump listens to how long you press.",
    description:
      "In most platform games you control how high you jump. Make a hero who starts every jump at " +
      "full speed, but if you let go of Space while they are still going up, the jump is cut short. " +
      "A quick tap is a little hop; holding Space all the way is a full leap.",
    requirements: [
      "The hero walks left and right and is pulled down by gravity onto the ground.",
      "Pressing Space on the ground starts a jump.",
      "Letting go of Space while the hero is still rising cuts the jump short (for example by making the upward speed smaller), so a tap makes a small hop and a long hold makes a high jump.",
      "The hero cannot jump again until they land.",
    ],
    controls: [["Left / Right", "walk"], ["Space", "jump - tap for a hop, hold for a leap"]],
    files: game(["hero.png blue 40 56", GROUND_SPRITE], {
      "Play.start.py": "Ground()\nHero()\n",
      ...GROUND,
      "Hero.start.py": "self.image = sprite('hero.png')\nself.y = -292\nself.speedY = 0\nself.onGround = True\n",
      "Hero.loop.py": WALK_AND_FACE + `
self.speedY = self.speedY - 1
self.y = self.y + self.speedY
if self.y <= -292:
    self.y = -292
    self.speedY = 0
    self.onGround = True
if self.onGround and key_was_pressed('space'):
    self.speedY = 20
    self.onGround = False
if key_was_released('space') and self.speedY > 5:
    self.speedY = 5
`,
    }),
  },
  {
    id: "ladder-climb",
    title: "Ladder Climb",
    difficulty: "explorer",
    summary: "Climb a ladder up to a high ledge - no gravity while you hold on.",
    description:
      "A ladder leads from the ground up to a ledge. Walk to it and press Up to climb: on the ladder " +
      "gravity lets go of you, so you can climb, stop halfway and hang there, or climb back down. At " +
      "the top, step off sideways onto the ledge and stand on it. Away from the ladder, Up does nothing.",
    requirements: [
      "The hero walks left and right and falls with gravity onto the ground.",
      "While the hero is touching the ladder, Up and Down climb it, and gravity does not pull them down, so they can stop halfway.",
      "When the hero is not touching the ladder, Up does not move them and gravity works as normal.",
      "At the top of the ladder the hero can step off onto a ledge and stand on it.",
    ],
    controls: [["Left / Right", "walk"], ["Up / Down", "climb (on the ladder)"]],
    files: game(["hero.png blue 40 56", "ladder.png brown 40 440", "ledge.png dgreen 300 20", GROUND_SPRITE], {
      "Play.start.py": "Ground()\nLadder()\nLedge()\nHero()\n",
      ...GROUND,
      "Ladder.start.py": "self.image = sprite('ladder.png')\nself.y = -100\n",
      "Ledge.start.py": "self.image = sprite('ledge.png')\nself.x = 170\nself.y = 100\n",
      "Hero.start.py": "self.image = sprite('hero.png')\nself.x = -300\nself.y = -292\nself.speedY = 0\n",
      "Hero.loop.py": WALK_AND_FACE + `
if get_collision(self, 'Ladder'):
    self.speedY = 0
    if key_is_pressed('up'):
        self.y = self.y + 4
    if key_is_pressed('down'):
        self.y = self.y - 4
else:
    self.speedY = self.speedY - 1
    self.y = self.y + self.speedY
ledge = get_collision(self, 'Ledge')
if ledge and self.speedY <= 0 and self.y > ledge.y:
    self.y = ledge.y + 38
    self.speedY = 0
if self.y < -292:
    self.y = -292
    self.speedY = 0
`,
    }),
  },
  {
    id: "gravity-flip",
    title: "Gravity Flip",
    difficulty: "explorer",
    summary: "Press Space and the world turns upside down: fall up, and walk on the ceiling.",
    description:
      "Your hero walks along the floor - until you press Space. Then gravity flips, and the hero falls " +
      "UP to the ceiling, lands on it upside down and walks along it. Press Space again and they fall " +
      "back down. You can only flip while standing on something, not in mid-air.",
    requirements: [
      "The hero walks left and right and faces the way they walk.",
      "Gravity pulls the hero towards the floor, and they land on it.",
      "Pressing Space flips gravity: the hero falls up to the ceiling and lands on it, and pressing it again flips gravity back.",
      "The hero is drawn upside down while gravity is flipped (for example with scaleY = -1).",
      "Gravity can only be flipped while the hero is standing on the floor or the ceiling, not in mid-air.",
    ],
    controls: [["Left / Right", "walk"], ["Space", "flip gravity"]],
    files: game(["hero.png blue 40 56", GROUND_SPRITE], {
      "Play.start.py": "Ground()\nCeiling()\nHero()\n",
      ...GROUND,
      "Ceiling.start.py": "self.image = sprite('ground.png')\nself.y = 340\n",
      "Hero.start.py": "self.image = sprite('hero.png')\nself.y = -292\nself.speedY = 0\nself.gravity = -1\nself.standing = True\n",
      "Hero.loop.py": WALK_AND_FACE + `
self.speedY = self.speedY + self.gravity
self.y = self.y + self.speedY
if self.y < -292:
    self.y = -292
    self.speedY = 0
    self.standing = True
if self.y > 292:
    self.y = 292
    self.speedY = 0
    self.standing = True
if self.standing and key_was_pressed('space'):
    self.gravity = -self.gravity
    self.scaleY = -self.gravity
    self.standing = False
`,
    }),
  },
  {
    id: "key-and-door",
    title: "Key and Door",
    difficulty: "explorer",
    summary: "A locked door stands in your way. Find the key, then the door opens.",
    description:
      "A locked door blocks the path to the flag. Walk into it without the key and it stops you dead. " +
      "The key is somewhere behind you: touch it to pick it up, then go back to the door, which opens " +
      "for you now. Reach the flag on the other side to win.",
    requirements: [
      "The hero walks left and right along the ground.",
      "A locked door blocks the hero: without the key they cannot walk through it.",
      "Touching the key picks it up: it disappears from where it was, and a variable remembers that the hero has it.",
      "When the hero touches the door while carrying the key, the door opens (for example it is destroyed) and the hero can walk on.",
      "Reaching the flag on the far side of the door shows a winning message on the screen.",
    ],
    controls: [["Left / Right", "walk"]],
    files: game(["hero.png blue 40 56", "key.png yellow 24 14", "door.png brown 30 120", "flag.png red 30 80", GROUND_SPRITE], {
      "Play.start.py": "Ground()\nKey()\nDoor()\nFlag()\nHero()\n" + LABEL,
      ...GROUND,
      "Key.start.py": "self.image = sprite('key.png')\nself.x = -500\nself.y = -290\n",
      "Door.start.py": "self.image = sprite('door.png')\nself.x = 300\nself.y = -260\n",
      "Flag.start.py": "self.image = sprite('flag.png')\nself.x = 520\nself.y = -280\n",
      "Hero.start.py": "self.image = sprite('hero.png')\nself.x = -100\nself.y = -292\nself.hasKey = False\n",
      "Hero.loop.py": WALK_AND_FACE + `
key = get_collision(self, 'Key')
if key:
    destroy(key)
    self.hasKey = True
door = get_collision(self, 'Door')
if door:
    if self.hasKey:
        destroy(door)
    else:
        self.x = door.x - 45
if get_collision(self, 'Flag'):
    Game.label.text = 'You made it!'
`,
    }),
  },
  {
    id: "sprint-with-stamina",
    title: "Sprint with Stamina",
    difficulty: "explorer",
    summary: "Hold Shift to sprint - until you run out of breath and have to walk while it comes back.",
    description:
      "Give your hero a sprint. Hold Shift while walking and they run more than twice as fast, but " +
      "every frame of running uses up stamina, shown as a bar above their head. When it is empty they " +
      "can only walk. Let go of Shift to catch your breath, and the stamina slowly fills back up.",
    requirements: [
      "The hero walks left and right and faces the way they walk.",
      "Holding Shift while walking makes the hero run much faster, but only while they have stamina left.",
      "Running uses up stamina every frame; when it runs out, the hero can only walk, even with Shift held.",
      "When Shift is let go, stamina slowly fills back up, to a maximum.",
      "A bar on the screen shrinks and grows with the stamina.",
    ],
    controls: [["Left / Right", "walk"], ["Hold Shift", "sprint"]],
    files: game(["hero.png blue 40 56", "bar.png green 60 8", GROUND_SPRITE], {
      "Play.start.py": "Ground()\nGame.hero = Hero()\nBar()\n",
      ...GROUND,
      "Hero.start.py": "self.image = sprite('hero.png')\nself.y = -292\nself.stamina = 100\n",
      "Hero.loop.py": `
walking = key_is_pressed('left') or key_is_pressed('right')
speed = 5
if walking and key_is_pressed('shift') and self.stamina >= 1:
    speed = 12
    self.stamina = self.stamina - 1
elif not key_is_pressed('shift') and self.stamina < 100:
    self.stamina = self.stamina + 0.5
if key_is_pressed('left'):
    self.x = self.x - speed
    self.scaleX = -1
if key_is_pressed('right'):
    self.x = self.x + speed
    self.scaleX = 1
if self.x > 620:
    self.x = 620
if self.x < -620:
    self.x = -620
`,
      "Bar.start.py": "self.image = sprite('bar.png')\n",
      "Bar.loop.py": `
hero = Game.hero
self.scaleX = hero.stamina / 100 + 0.01
self.x = hero.x
self.y = hero.y + 44
`,
    }),
  },
  {
    id: "magnet-coins",
    title: "Magnet Coins",
    difficulty: "explorer",
    summary: "Your hero is a magnet: coins that come close fly into your pocket by themselves.",
    description:
      "Scatter coins around the screen. They sit still - until your hero comes near. Then a coin " +
      "flies straight towards the hero by itself, wherever the hero goes, until it is caught. Every " +
      "coin caught scores a point and pops up somewhere new.",
    requirements: [
      "The hero moves around with the arrow keys.",
      "A coin stays still while the hero is far away.",
      "When the hero comes within a set distance of a coin (for example measured with math.sqrt), the coin moves towards the hero by itself.",
      "Touching a coin adds 1 to a score shown on the screen, and the coin reappears somewhere new.",
    ],
    controls: [["Arrow keys", "move"]],
    files: game(["hero.png purple 40 40", "coin.png yellow 20 20"], {
      "Play.start.py": "Game.score = 0\nGame.hero = Hero()\nCoin()\nCoin()\nCoin()\nCoin()\nCoin()\n" + LABEL,
      "Play.loop.py": "Game.label.text = 'Coins: ' + str(Game.score)\n",
      "Hero.start.py": "self.image = sprite('hero.png')\n",
      "Hero.loop.py": `
if key_is_pressed('left'):
    self.x = self.x - 6
if key_is_pressed('right'):
    self.x = self.x + 6
` + UP_AND_DOWN,
      "Coin.start.py": `
import random
self.image = sprite('coin.png')
self.x = random.randint(-600, 600)
self.y = random.randint(-320, 280)
`,
      "Coin.loop.py": `
import math
import random
hero = Game.hero
gapX = hero.x - self.x
gapY = hero.y - self.y
gap = math.sqrt(gapX * gapX + gapY * gapY)
if gap < 160 and gap > 0:
    self.x = self.x + gapX / gap * 8
    self.y = self.y + gapY / gap * 8
if get_collision(self, 'Hero'):
    Game.score = Game.score + 1
    self.x = random.randint(-600, 600)
    self.y = random.randint(-320, 280)
`,
    }),
  },
  {
    id: "checkpoints",
    title: "Checkpoints",
    difficulty: "explorer",
    summary: "Fall into a pit and you come back at the last flag you touched, not at the very start.",
    description:
      "The ground has pits in it. Jump over them - or fall in. A hero who falls in comes back, but " +
      "where? At the last checkpoint flag they touched. Touching a flag turns it from red to yellow, so " +
      "you can see which one you will come back to. Before you touch any, you come back at the start.",
    requirements: [
      "The hero walks, jumps and falls with gravity, landing on the ground.",
      "There are gaps in the ground the hero can jump over or fall into.",
      "Touching a checkpoint flag remembers it as the place to come back to, and the flag changes to show it is active.",
      "A hero who falls into a gap (off the bottom of the screen) comes back at the last checkpoint touched, or at the start if they have not touched one.",
    ],
    controls: [["Left / Right", "walk"], ["Space", "jump"]],
    files: game(["hero.png blue 40 56", "floor.png green 300 40", "flag.png red 20 60", "flagon.png yellow 20 60"], {
      "Play.start.py": `
Game.comeBackX = -560
Game.flag = False
floor = Floor()
floor.x = -490
Floor()
floor = Floor()
floor.x = 490
flag = Flag()
flag.x = 490
Flag()
Hero()
`,
      "Floor.start.py": "self.image = sprite('floor.png')\nself.y = -340\n",
      "Flag.start.py": "self.image = sprite('flag.png')\nself.y = -290\n",
      "Flag.loop.py": `
if get_collision(self, 'Hero') and Game.flag != self:
    if Game.flag:
        Game.flag.image = sprite('flag.png')
    Game.flag = self
    Game.comeBackX = self.x
    self.image = sprite('flagon.png')
`,
      "Hero.start.py": "self.image = sprite('hero.png')\nself.x = -560\nself.y = -292\nself.speedY = 0\n",
      "Hero.loop.py": WALK_AND_FACE + `
self.speedY = self.speedY - 1
self.y = self.y + self.speedY
floor = get_collision(self, 'Floor')
if floor and self.speedY < 0 and self.y > floor.y + 20:
    self.y = floor.y + 48
    self.speedY = 0
    if key_was_pressed('space'):
        self.speedY = 18
if self.y < -420:
    self.x = Game.comeBackX
    self.y = -292
    self.speedY = 0
`,
    }),
  },
  {
    id: "stomp-the-patrol",
    title: "Stomp the Patrol",
    difficulty: "master",
    summary: "Jump on an enemy's head to squash it - but walk into it and you are sent back to the start.",
    description:
      "An enemy walks back and forth along the ground. Land on top of it and it is squashed, you " +
      "bounce up off it, and you score a point; a new enemy turns up a moment later. Touch it from the " +
      "side instead and you are sent back to where you started. The trick is telling the two apart.",
    requirements: [
      "The hero walks, jumps and falls with gravity onto the ground.",
      "An enemy patrols back and forth along the ground, turning around at the edges.",
      "When the hero touches the enemy while FALLING onto it from above, the enemy is destroyed, the hero bounces upward, and a score goes up by 1.",
      "When the hero touches the enemy from the side (not falling onto it from above), the hero is sent back to a starting position instead.",
      "After an enemy is squashed, a new one appears after a short delay.",
      "The score is shown on the screen.",
    ],
    controls: [["Left / Right", "walk"], ["Space", "jump"]],
    files: game(["hero.png blue 40 56", "enemy.png purple 48 40", GROUND_SPRITE], {
      "Play.start.py": `
Game.score = 0
Game.respawnTimer = 0
Ground()
Game.hero = Hero()
Enemy()
Game.label = text()
Game.label.color = "white"
Game.label.fontSize = 28
Game.label.halign = "center"
Game.label.y = 320
`,
      "Play.loop.py": `
if count_objects('Enemy') == 0:
    Game.respawnTimer = Game.respawnTimer - 1
    if Game.respawnTimer <= 0:
        newEnemy = Enemy()
        if Game.hero.x > 0:
            newEnemy.x = -500
Game.label.text = 'Stomped: ' + str(Game.score)
`,
      ...GROUND,
      "Enemy.start.py": "self.image = sprite('enemy.png')\nself.x = 500\nself.y = -300\nself.speedX = -3\n",
      "Enemy.loop.py": `
self.x = self.x + self.speedX
if self.x > 600:
    self.speedX = -3
if self.x < -600:
    self.speedX = 3
`,
      "Hero.start.py": "self.image = sprite('hero.png')\nself.x = -500\nself.y = -292\nself.speedY = 0\n",
      "Hero.loop.py": WALK_AND_FACE + `
self.speedY = self.speedY - 1
self.y = self.y + self.speedY
if self.y <= -292:
    self.y = -292
    self.speedY = 0
    if key_was_pressed('space'):
        self.speedY = 19
enemy = get_collision(self, 'Enemy')
if enemy:
    if self.speedY < 0 and self.y > enemy.y + 20:
        destroy(enemy)
        self.speedY = 14
        Game.score = Game.score + 1
        Game.respawnTimer = 60
    else:
        self.x = -500
        self.y = -292
        self.speedY = 0
`,
    }),
  },
  {
    id: "charge-shot",
    title: "Charge Shot",
    difficulty: "master",
    summary: "Hold to charge, let go to fire - the longer you hold, the bigger and faster the shot.",
    description:
      "Hold Space and your hero charges up: a meter above their head fills while you hold. Let go " +
      "and a shot flies out the way they are facing. A quick tap fires a small, slow shot; a full " +
      "charge fires a big, fast one in a different colour. The meter stops filling when it is full.",
    requirements: [
      "The hero walks left and right and faces the way they walk.",
      "While Space is HELD, a charge value goes up every frame, and it stops at a maximum.",
      "The charge is visible while charging (for example a bar that grows above the hero).",
      "When Space is RELEASED, a shot is created that travels the way the hero faces, and the charge resets to zero.",
      "The size and the speed of the shot depend on how long Space was held: more charge means a bigger, faster shot.",
      "A fully charged shot looks different from a partly charged one (for example a different colour or picture).",
      "A shot that leaves the screen is destroyed.",
    ],
    controls: [["Left / Right", "walk"], ["Hold Space", "charge"], ["Let go of Space", "fire"]],
    files: game(["hero.png blue 40 56", "bar.png yellow 60 8", "shot.png orange 20 20", "bigshot.png cyan 20 20", GROUND_SPRITE], {
      "Play.start.py": "Ground()\nGame.hero = Hero()\nBar()\n",
      ...GROUND,
      "Hero.start.py": "self.image = sprite('hero.png')\nself.y = -292\nself.charge = 0\n",
      "Hero.loop.py": WALK_AND_FACE + `
if key_is_pressed('space'):
    self.charge = self.charge + 1
    if self.charge > 60:
        self.charge = 60
if key_was_released('space'):
    shot = Shot()
    shot.x = self.x + 30 * self.scaleX
    shot.y = self.y
    size = 0.6 + self.charge / 20
    shot.scaleX = size
    shot.scaleY = size
    shot.speedX = (6 + self.charge / 5) * self.scaleX
    if self.charge == 60:
        shot.image = sprite('bigshot.png')
    self.charge = 0
`,
      "Bar.start.py": "self.image = sprite('bar.png')\nself.visible = False\n",
      "Bar.loop.py": `
hero = Game.hero
self.visible = hero.charge > 0
self.scaleX = hero.charge / 60 + 0.01
self.x = hero.x
self.y = hero.y + 44
`,
      "Shot.start.py": "self.image = sprite('shot.png')\nself.speedX = 6\n",
      "Shot.loop.py": `
self.x = self.x + self.speedX
self.angle = self.angle + 10
if self.x > 700 or self.x < -700:
    destroy(self)
`,
    }),
  },
  {
    id: "homing-missile",
    title: "Homing Missile",
    difficulty: "master",
    summary: "Launch a missile that steers itself towards a moving target, turning a little every frame.",
    description:
      "A target drifts around the top of the screen. Press Space and a missile launches straight up " +
      "from your launcher, then curves towards the target - not by jumping onto it, but by turning a " +
      "few degrees at a time, so it swoops. Hit the target and you score; the target jumps somewhere " +
      "new. A missile that misses for too long burns out.",
    requirements: [
      "A target moves around the screen on its own.",
      "Pressing Space launches a missile from the player's launcher.",
      "Every frame the missile turns towards the target (for example with math.atan2) by a LIMITED amount, so it curves instead of snapping at it.",
      "The missile flies forward the way it faces (for example with math.cos and math.sin) and is rotated to point that way.",
      "Hitting the target adds 1 to a score shown on the screen, destroys the missile and moves the target to a new random place.",
      "A missile that flies too long without a hit is destroyed.",
    ],
    controls: [["Left / Right", "move the launcher"], ["Space", "launch a missile"]],
    files: game(["launcher.png gray 60 30", "target.png red 44 44", "missile.png white 28 8"], {
      "Play.start.py": `
Game.score = 0
Game.launcher = Launcher()
Game.target = Target()
Game.label = text()
Game.label.color = "white"
Game.label.fontSize = 28
Game.label.halign = "center"
Game.label.y = 320
`,
      "Play.loop.py": "Game.label.text = 'Hits: ' + str(Game.score)\n",
      "Launcher.start.py": "self.image = sprite('launcher.png')\nself.y = -320\n",
      "Launcher.loop.py": `
if key_is_pressed('left'):
    self.x = self.x - 7
if key_is_pressed('right'):
    self.x = self.x + 7
if self.x > 610:
    self.x = 610
if self.x < -610:
    self.x = -610
if key_was_pressed('space'):
    missile = Missile()
    missile.x = self.x
    missile.y = self.y + 20
`,
      "Target.start.py": "self.image = sprite('target.png')\nself.y = 200\nself.speedX = 4\nself.speedY = 2\n",
      "Target.loop.py": `
self.x = self.x + self.speedX
self.y = self.y + self.speedY
if self.x > 600 or self.x < -600:
    self.speedX = -self.speedX
if self.y > 320 or self.y < 0:
    self.speedY = -self.speedY
self.angle = self.angle + 2
`,
      "Missile.start.py": "self.image = sprite('missile.png')\nself.heading = 90\nself.angle = 90\nself.life = 150\n",
      "Missile.loop.py": `
import math
import random
target = Game.target
wanted = math.degrees(math.atan2(target.y - self.y, target.x - self.x))
turn = wanted - self.heading
if turn > 180:
    turn = turn - 360
if turn < -180:
    turn = turn + 360
if turn > 4:
    turn = 4
if turn < -4:
    turn = -4
self.heading = self.heading + turn
self.x = self.x + math.cos(math.radians(self.heading)) * 9
self.y = self.y + math.sin(math.radians(self.heading)) * 9
self.angle = self.heading
self.life = self.life - 1
if get_collision(self, 'Target'):
    Game.score = Game.score + 1
    target.x = random.randint(-560, 560)
    target.y = random.randint(40, 300)
    destroy(self)
elif self.life <= 0:
    destroy(self)
`,
    }),
  },
  {
    id: "moving-platform",
    title: "Moving Platform",
    difficulty: "master",
    summary: "Jump onto a platform that glides back and forth - and ride along on it.",
    description:
      "A platform glides back and forth above the ground. Jump up onto it and stand there: the " +
      "platform carries you with it, so you ride along instead of it sliding out from under your " +
      "feet. You can still walk while you ride, and walk or jump off to drop back to the ground.",
    requirements: [
      "The hero walks, jumps and falls with gravity onto the ground.",
      "A platform moves back and forth on its own, turning round at each end.",
      "The hero can land on top of the platform and stand on it, without falling through.",
      "While standing on the platform, the hero moves along with it (the platform's movement is added to the hero's x).",
      "The hero can walk or jump off the platform and fall back to the ground.",
    ],
    controls: [["Left / Right", "walk"], ["Space", "jump"]],
    files: game(["hero.png blue 40 56", "platform.png brown 200 20", GROUND_SPRITE], {
      "Play.start.py": "Ground()\nPlatform()\nHero()\n",
      ...GROUND,
      "Platform.start.py": "self.image = sprite('platform.png')\nself.x = -300\nself.y = -150\nself.speedX = 3\n",
      "Platform.loop.py": `
self.x = self.x + self.speedX
if self.x > 300 or self.x < -300:
    self.speedX = -self.speedX
`,
      "Hero.start.py": "self.image = sprite('hero.png')\nself.x = 400\nself.y = -292\nself.speedY = 0\n",
      "Hero.loop.py": WALK_AND_FACE + `
self.speedY = self.speedY - 1
self.y = self.y + self.speedY
standing = False
if self.y <= -292:
    self.y = -292
    self.speedY = 0
    standing = True
platform = get_collision(self, 'Platform')
if platform and self.speedY <= 0 and self.y > platform.y + 10:
    self.y = platform.y + 38
    self.speedY = 0
    self.x = self.x + platform.speedX
    standing = True
if standing and key_was_pressed('space'):
    self.speedY = 20
`,
    }),
  },
  {
    id: "wall-jump",
    title: "Wall Jump",
    difficulty: "master",
    summary: "Slide down a wall, kick off it, and climb a shaft by bouncing from wall to wall.",
    description:
      "Your hero is at the bottom of a narrow shaft with a star at the top. Walls stop you, and if you " +
      "touch one in mid-air you slide down it slowly instead of dropping. Press Space while sliding " +
      "and you kick off the wall, up and away towards the other wall - then kick off that one too.",
    requirements: [
      "The hero walks left and right, jumps from the ground and falls with gravity.",
      "Walls stop the hero: they cannot walk through them.",
      "Touching a wall in mid-air makes the hero slide down it slowly (their falling speed is limited).",
      "Pressing Space while touching a wall in mid-air jumps up and away from the wall, pushing the hero towards the other side for a short time even if no arrow key is held.",
      "Reaching the star at the top shows a message on the screen.",
    ],
    controls: [["Left / Right", "walk"], ["Space", "jump, or kick off a wall"]],
    files: game(["hero.png blue 40 56", "wall.png gray 40 640", "star.png yellow 30 30", GROUND_SPRITE], {
      "Play.start.py": "Ground()\nwall = Wall()\nwall.x = -130\nwall = Wall()\nwall.x = 130\nStar()\nHero()\n" + LABEL,
      ...GROUND,
      "Wall.start.py": "self.image = sprite('wall.png')\n",
      "Star.start.py": "self.image = sprite('star.png')\nself.y = 290\n",
      "Hero.start.py": "self.image = sprite('hero.png')\nself.y = -292\nself.speedX = 0\nself.speedY = 0\nself.pushTime = 0\n",
      "Hero.loop.py": `
if self.pushTime > 0:
    self.pushTime = self.pushTime - 1
elif key_is_pressed('left'):
    self.speedX = -6
elif key_is_pressed('right'):
    self.speedX = 6
else:
    self.speedX = 0
self.x = self.x + self.speedX
wall = get_collision(self, 'Wall')
side = 1
if wall:
    if wall.x > self.x:
        side = -1
    self.x = wall.x + 39 * side
self.speedY = self.speedY - 1
if wall and self.speedY < -2:
    self.speedY = -2
self.y = self.y + self.speedY
if self.y > 300:
    self.y = 300
    self.speedY = 0
if self.y <= -292:
    self.y = -292
    self.speedY = 0
    if key_was_pressed('space'):
        self.speedY = 18
elif wall and key_was_pressed('space'):
    self.speedY = 16
    self.speedX = 10 * side
    self.pushTime = 20
if get_collision(self, 'Star'):
    Game.label.text = 'You reached the star!'
`,
    }),
  },
  {
    id: "pick-up-and-throw",
    title: "Pick Up and Throw",
    difficulty: "master",
    summary: "Lift a crate over your head, carry it, and throw it in an arc.",
    description:
      "Crates sit on the ground. Walk up to one and press E to lift it over your head; it comes with " +
      "you wherever you walk. Press E again to throw it the way you are facing: it flies up and " +
      "forward, gravity brings it down in an arc, and it lands on the ground and stays there.",
    requirements: [
      "The hero walks left and right and faces the way they walk.",
      "Pressing E while touching a crate picks it up, and it is carried above the hero's head as they walk.",
      "The hero can only carry one crate at a time.",
      "Pressing E while carrying throws the crate forward the way the hero faces and upward at the same time.",
      "Gravity pulls a thrown crate down in an arc, and it lands on the ground and stops there, inside the screen.",
    ],
    controls: [["Left / Right", "walk"], ["E", "pick up, then throw"]],
    files: game(["hero.png blue 40 56", "crate.png brown 40 40", GROUND_SPRITE], {
      "Play.start.py": "Ground()\nGame.hero = Hero()\ncrate = Crate()\ncrate.x = 200\ncrate = Crate()\ncrate.x = -300\n",
      ...GROUND,
      "Hero.start.py": "self.image = sprite('hero.png')\nself.y = -292\nself.carrying = False\n",
      "Hero.loop.py": WALK_AND_FACE + `
if key_was_pressed('e'):
    if self.carrying:
        crate = self.carrying
        crate.held = False
        crate.speedX = 9 * self.scaleX
        crate.speedY = 12
        self.carrying = False
    else:
        crate = get_collision(self, 'Crate')
        if crate:
            crate.held = True
            self.carrying = crate
`,
      "Crate.start.py": "self.image = sprite('crate.png')\nself.y = -300\nself.speedX = 0\nself.speedY = 0\nself.held = False\n",
      "Crate.loop.py": `
if self.held:
    self.x = Game.hero.x
    self.y = Game.hero.y + 50
else:
    self.x = self.x + self.speedX
    self.speedY = self.speedY - 1
    self.y = self.y + self.speedY
    if self.y <= -300:
        self.y = -300
        self.speedY = 0
        self.speedX = 0
    if self.x > 620:
        self.x = 620
    if self.x < -620:
        self.x = -620
`,
    }),
  },
  {
    id: "guard-chase",
    title: "Guard Chase",
    difficulty: "master",
    summary: "A guard walks its beat, spots you when you get close, chases - and gives up if you get away.",
    description:
      "A guard walks back and forth on patrol. Get too close and it spots you: it turns red and runs " +
      "at you, faster than it patrols. If it catches you, you are sent back to the start and it goes " +
      "back to its post. But you are " +
      "faster than the guard - get far enough away and it gives up, calms down, and walks back to its beat.",
    requirements: [
      "The hero walks left and right.",
      "While the hero is far away, a guard patrols back and forth between two points.",
      "When the hero comes within a set distance, the guard chases: it moves towards the hero, faster than it patrols, and looks different (for example a different picture).",
      "When the hero gets far enough away, the guard gives up, goes back to patrolling between its two points, and looks normal again.",
      "If the guard touches the hero, the hero is sent back to the start and the guard goes back to its patrol.",
    ],
    controls: [["Left / Right", "walk"]],
    files: game(["hero.png blue 40 56", "guard.png purple 44 60", "alert.png red 44 60", GROUND_SPRITE], {
      "Play.start.py": "Ground()\nGame.hero = Hero()\nGuard()\n",
      ...GROUND,
      "Hero.start.py": "self.image = sprite('hero.png')\nself.x = -550\nself.y = -292\n",
      "Hero.loop.py": WALK_AND_FACE,
      "Guard.start.py": "self.image = sprite('guard.png')\nself.x = 300\nself.y = -290\nself.speedX = 2\nself.chasing = False\n",
      "Guard.loop.py": `
hero = Game.hero
gap = abs(hero.x - self.x)
if gap < 250:
    self.chasing = True
    self.image = sprite('alert.png')
if gap > 400:
    self.chasing = False
    self.image = sprite('guard.png')
if self.chasing:
    if hero.x > self.x:
        self.x = self.x + 4
    else:
        self.x = self.x - 4
else:
    self.x = self.x + self.speedX
    if self.x > 450:
        self.speedX = -2
    if self.x < 150:
        self.speedX = 2
if get_collision(self, 'Hero'):
    hero.x = -550
    self.x = 300
    self.chasing = False
`,
    }),
  },
  {
    id: "knockback",
    title: "Knockback",
    difficulty: "master",
    summary: "Touch the enemy and you are knocked flying - then blink, safe, for a moment.",
    description:
      "An enemy patrols the ground. Touch it and you are hurt: you are knocked up and away from it - " +
      "left if it hit you from the right, right if it hit you from the left - and the hit is counted. " +
      "For a moment after that you blink on and off and nothing can hurt you, so one touch never " +
      "counts as ten.",
    requirements: [
      "The hero walks, jumps and falls with gravity.",
      "Touching the enemy counts a hit, and the number of hits is shown on the screen.",
      "When hit, the hero is knocked up into the air and AWAY from the enemy: left if the enemy is on the right, right if it is on the left.",
      "After a hit the hero is safe for a short time (a timer counted in frames): touching the enemy does nothing, and the hero blinks (for example by turning visible on and off).",
      "When the safe time ends, the hero stops blinking and can be hit again.",
    ],
    controls: [["Left / Right", "walk"], ["Space", "jump"]],
    files: game(["hero.png blue 40 56", "enemy.png purple 48 40", GROUND_SPRITE], {
      "Play.start.py": "Game.hits = 0\nGround()\nHero()\nEnemy()\n" + LABEL,
      "Play.loop.py": "Game.label.text = 'Hits: ' + str(Game.hits)\n",
      ...GROUND,
      "Enemy.start.py": "self.image = sprite('enemy.png')\nself.y = -300\nself.speedX = 2\n",
      "Enemy.loop.py": `
self.x = self.x + self.speedX
if self.x > 300 or self.x < -300:
    self.speedX = -self.speedX
`,
      "Hero.start.py": "self.image = sprite('hero.png')\nself.x = -500\nself.y = -292\nself.speedX = 0\nself.speedY = 0\nself.safeTime = 0\n",
      "Hero.loop.py": `
if self.safeTime > 70:
    self.x = self.x + self.speedX
else:` + WALK_AND_FACE.replace(/\n(?=.)/g, "\n    ") + `
self.speedY = self.speedY - 1
self.y = self.y + self.speedY
if self.y <= -292:
    self.y = -292
    self.speedY = 0
    if key_was_pressed('space'):
        self.speedY = 18
if self.safeTime > 0:
    self.safeTime = self.safeTime - 1
    self.visible = self.safeTime % 10 < 5
else:
    enemy = get_collision(self, 'Enemy')
    if enemy:
        Game.hits = Game.hits + 1
        self.safeTime = 90
        self.speedY = 12
        if enemy.x > self.x:
            self.speedX = -10
        else:
            self.speedX = 10
`,
    }),
  },
  {
    id: "cannon-arc",
    title: "Cannon Arc",
    difficulty: "master",
    summary: "Aim a cannon, choose the power, and lob a cannonball in a curve onto the target.",
    description:
      "A cannon sits at the left of the screen and a target sits on the ground somewhere to the right. " +
      "Tilt the cannon with Up and Down and choose how hard it fires with Left and Right. Press Space " +
      "and the cannonball flies out along the barrel, then gravity bends it into a curve. Hit the " +
      "target and it moves somewhere new.",
    requirements: [
      "Up and Down change the cannon's angle, and Left and Right change its power, each kept between a smallest and a biggest value.",
      "The cannon is rotated to show its angle, and the angle and power are shown on the screen.",
      "Pressing Space fires a cannonball whose starting speed comes from the angle and the power (for example with math.cos and math.sin).",
      "Gravity pulls the cannonball down every frame so it flies in a curve, and it is destroyed when it hits the ground or leaves the screen.",
      "Hitting the target adds 1 to a score and moves the target to a new random place.",
    ],
    controls: [["Up / Down", "aim"], ["Left / Right", "less or more power"], ["Space", "fire"]],
    files: game(["cannon.png gray 60 20", "ball.png dark 16 16", "target.png red 60 30", GROUND_SPRITE], {
      "Play.start.py": "Game.score = 0\nGround()\nGame.cannon = Cannon()\nGame.target = Target()\n" + LABEL,
      "Play.loop.py": `
cannon = Game.cannon
Game.label.text = 'Angle: ' + str(cannon.aim) + '   Power: ' + str(cannon.power) + '   Hits: ' + str(Game.score)
`,
      ...GROUND,
      "Cannon.start.py": "self.image = sprite('cannon.png')\nself.x = -560\nself.y = -300\nself.aim = 45\nself.power = 14\n",
      "Cannon.loop.py": `
import math
if key_is_pressed('up') and self.aim < 80:
    self.aim = self.aim + 1
if key_is_pressed('down') and self.aim > 10:
    self.aim = self.aim - 1
if key_was_pressed('right') and self.power < 25:
    self.power = self.power + 1
if key_was_pressed('left') and self.power > 5:
    self.power = self.power - 1
self.angle = self.aim
if key_was_pressed('space'):
    ball = Ball()
    ball.x = self.x
    ball.y = self.y
    ball.speedX = math.cos(math.radians(self.aim)) * self.power
    ball.speedY = math.sin(math.radians(self.aim)) * self.power
`,
      "Target.start.py": "self.image = sprite('target.png')\nself.x = 200\nself.y = -305\n",
      "Ball.start.py": "self.image = sprite('ball.png')\n",
      "Ball.loop.py": `
import random
self.x = self.x + self.speedX
self.speedY = self.speedY - 0.3
self.y = self.y + self.speedY
if get_collision(self, 'Target'):
    Game.score = Game.score + 1
    Game.target.x = random.randint(-300, 600)
    destroy(self)
elif self.y < -320 or self.x > 660:
    destroy(self)
`,
    }),
  },
  {
    id: "enemy-waves",
    title: "Enemy Waves",
    difficulty: "master",
    summary: "Clear a wave of enemies and the next one arrives - with one more enemy than before.",
    description:
      "Enemies drift back and forth across the sky and your ship shoots straight up at them. Clear " +
      "every enemy and the next wave flies in, with one more enemy than the wave before, so every " +
      "wave is a little harder. The wave number is shown at the top of the screen.",
    requirements: [
      "The player moves left and right along the bottom of the screen and shoots upward with Space.",
      "A shot that hits an enemy destroys both of them, and a shot that leaves the screen is destroyed.",
      "When every enemy is gone (for example count_objects('Enemy') is 0), the next wave of enemies appears.",
      "Each wave has one more enemy than the wave before it.",
      "The wave number is shown on the screen.",
    ],
    controls: [["Left / Right", "move"], ["Space", "shoot"]],
    files: game(["player.png cyan 50 30", "shot.png yellow 6 16", "enemy.png purple 40 30"], {
      "Play.start.py": "Game.wave = 0\nGame.toMake = 0\nPlayer()\n" + LABEL,
      "Play.loop.py": `
if count_objects('Enemy') == 0 and Game.toMake == 0:
    Game.wave = Game.wave + 1
    Game.toMake = Game.wave + 2
if Game.toMake > 0:
    Enemy()
    Game.toMake = Game.toMake - 1
Game.label.text = 'Wave ' + str(Game.wave)
`,
      "Player.start.py": "self.image = sprite('player.png')\nself.y = -320\n",
      "Player.loop.py": `
if key_is_pressed('left') and self.x > -610:
    self.x = self.x - 7
if key_is_pressed('right') and self.x < 610:
    self.x = self.x + 7
if key_was_pressed('space'):
    shot = Shot()
    shot.x = self.x
    shot.y = self.y + 24
`,
      "Shot.start.py": "self.image = sprite('shot.png')\n",
      "Shot.loop.py": `
self.y = self.y + 12
enemy = get_collision(self, 'Enemy')
if enemy:
    destroy(enemy)
    destroy(self)
elif self.y > 380:
    destroy(self)
`,
      "Enemy.start.py": `
import random
self.image = sprite('enemy.png')
self.x = random.randint(-560, 560)
self.y = random.randint(60, 300)
self.speedX = random.randint(2, 5)
`,
      "Enemy.loop.py": `
self.x = self.x + self.speedX
if self.x > 600 or self.x < -600:
    self.speedX = -self.speedX
`,
    }),
  },
];

export const challengeById = (id: string) => CHALLENGES.find((challenge) => challenge.id === id) || null;

export const CHALLENGE_POINTS = 1000;
