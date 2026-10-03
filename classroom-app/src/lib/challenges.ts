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
      "Every frame the missile works out the direction to the target (for example with math.atan2) and turns towards it by a LIMITED amount, so it curves instead of snapping straight at it.",
      "The missile moves forward along the direction it is facing (for example with math.cos and math.sin) and is rotated to point that way.",
      "When a missile hits the target, the score goes up by 1, the missile is destroyed, and the target moves to a new random place.",
      "A missile that has flown for too long without hitting is destroyed.",
      "The score is shown on the screen.",
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
];

export const challengeById = (id: string) => CHALLENGES.find((challenge) => challenge.id === id) || null;

export const CHALLENGE_POINTS = 1000;
