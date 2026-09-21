# PXP101 — the fifteen-week plan

Monster Munch, from the four lines that exist in week 1 to a finished arcade
game. Written before the authoring so that every name is chosen once and no week
has to rewrite an earlier week's line (SLIDE-RULES §4: "a name introduced in week
2 should be the name that survives to week 15").

**Budget: 150 lines of base game, 100 lines of bonus.** The base game plans out
at **78 lines** and `spine.py` now realises it at exactly that, so the ceiling is
room to grow into rather than a target to fill. The bonus track is
a parallel ~6-line-a-week module that never enters the milestone replay.

---

## 1. The finished game

Thirteen panels. Every line obeys `pixelpad.check_kid_rules` — no lists, no `/`,
no `%`, no `abs()`, no inline `if`, every name prefixed.

| Panel | Lines | Blocks (file order) |
|---|---:|---|
| `Game start` | 5 | score, lives, speed, flag, setup |
| `Game loop` | 3 | over |
| `Monster start` | 2 | look |
| `Monster loop` | 5 | follow, edges |
| `Food start` | 4 | look, place |
| `Food loop` | 11 | fall, catch, cap, recycle |
| `Bomb start` | 4 | look, place |
| `Bomb loop` | 10 | fall, hit, recycle |
| `Play start` | 10 | make, hud |
| `Play loop` | 1 | label |
| `GameOver start` | 11 | message, score |
| `GameOver loop` | 5 | again |
| `Start start` / `Start loop` | 7 | title / begin |
| **Total** | **78** | |

Rooms: `Start`, `Play`, `GameOver`. Classes: `Monster`, `Food`, `Bomb`.
Sprites: `monster.png` green 48×48, `food.png` orange 30×30, `bomb.png` dark 34×34.

### Naming decided now, used to the end

`Game.score`, `Game.lives`, `Game.fallSpeed`, `Game.dead`, `Game.monster`,
`Game.foodA/B/C`, `Game.bomb`, `Game.bombB`, `Game.label`. Chosen so weeks 5-15
only ever ADD lines.

**`Game.` everywhere, including inside `Game`'s own panels.** Settled by running
both forms in the real engine: `Game.score = 7` and `self.score = 7` written in
`Game start` are both readable as `Game.score` from the Play room, with no error
either way. They are the same object, so the choice is free — and one vocabulary
wins. A child never has to learn that `self` and `Game` mean the same thing on
adjacent lines, and a line can be moved between panels without being rewritten.
(The camp workbooks use `self.` there; PXP101 deliberately differs.)

### The one planned deletion

Week 1 writes `set_room('Play')`. Week 15 adds the title screen and changes it to
`set_room('Start')`. That is a real lesson about rooms, not churn, so it is worth
the strike-through slide (SLIDE-RULES §4). It is the only rewrite in the course.

---

## 2. Week by week

Each week ends on "press Play and see something", per `course.py`'s own rule.

| Wk | Title | Adds | New code | Ends on |
|---:|---|---:|---|---|
| 1 | Your monster appears | 4 | `Game.setup`, `Monster.look`, `Play.make` | *done* — your monster is on screen |
| 2 | It follows your mouse | 5 | `Monster.follow`, `Monster.edges` | *done* — it tracks you and stops at the edges |
| 3 | Food at the top | 5 | `Food.look`, `Food.place`, one `Food()` | a piece of food sits up high |
| 4 | It falls | 6 | `Game.speed`, `Food.fall`, `Food.recycle` | food rains down for ever |
| 5 | Catch it | 5 | `Game.score`, `Game.lives`, `Food.catch` | the food jumps back to the top when you catch it |
| 6 | Show the score | 5 | `Play.hud`, `Play.label` | a white Score / Lives line that counts up |
| 7 | A bomb appears | 5 | `Bomb.look`, `Bomb.place`, one `Bomb()` | a bomb waiting at the top |
| 8 | Bombs fall too | 5 | `Bomb.fall`, `Bomb.recycle` | bombs falling — harmless so far |
| 9 | Bombs hurt | 4 | `Game.flag`, `Bomb.hit` | the Lives number drops when one hits you |
| 10 | Losing | 5 | `Bomb.hit` +2, `Game.over` | at zero lives the screen switches (to an empty room) |
| 11 | The Game Over screen | 5 | `GameOver.message` | a real GAME OVER in the middle |
| 12 | Your final score | 6 | `GameOver.score` | your score under the message |
| 13 | Play again | 5 | `GameOver.again` | tap to restart — the whole loop closes |
| 14 | It gets harder | 6 | `Food.catch` +1, `Food.cap`, two more `Food()`, a second `Bomb()` | it speeds up as you score, and stays winnable |
| 15 | A front door | 7 | `Start start`, `Start loop`, `Game.setup` rewritten | a title screen, tap to begin |

**Pacing.** Weeks 1-2 are 4-5 lines because the children are also drawing. The
hardest weeks are 4 (the first `if` inside a moving object) and 10 (the flag
pattern), both budgeted light for that reason.

### Two structural beats worth protecting

**Week 4 teaches recycling before week 5 teaches catching.** So when week 5's
catch says `self.y = -300`, it is *reusing* the recycle block that already
exists — the food drops below the floor and the code they already wrote sends it
back to the top. One idea paying for itself is the best thing an eight-year-old
can see.

**Week 10 is the flag.** `RULES.md` is absolute: never call `set_room()` from an
object's own loop — the room change destroys that object mid-step and crashes the
engine. So `Bomb.hit` sets `Game.dead = True` and `Game loop` does the switch.
Week 10 is where that is taught, and it must be taught as the rule it is.

### Verified in the engine, not assumed

A probe ran the spine of this plan on the real PixelPad CDN build: `Game.`
globals assigned in `Game start` and read from three other panels,
`get_collision(self, 'Monster')` scoring a catch, and a falling object setting
`Game.dead` while `Game loop` — not the object — called `set_room('GameOver')`.
It scored two catches and landed on a GAME OVER screen reading
`Final Score: 2`, with no JavaScript error and the Play room's label correctly
torn down. Weeks 5, 9, 10, 11 and 12 rest on patterns that are now known to work
in this engine.

### Lives shown before they can be lost

Week 6's label prints score *and* lives, though nothing takes a life until week 9.
That is deliberate: writing the label once means week 9 never rewrites it. The
teacher guide should turn the three-week gap into the question — *what do you
think the 3 is for?*

---

## 3. The bonus track — 100 lines

Bonus is currently free prose in `week["bonus"]`, uncounted and unbuilt. To make
it 100 lines of real code it has to become code the build checks:

- `week["bonus"]` gains `lines` — `[(panel, [line, ...])]`, authored exactly as a
  child types it. *(Done: `build.bonus_lines` reads it and every bonus card —
  week page, teacher guide and textbook chapter — renders the code under the
  prose. No week has authored any yet.)*
- Those lines go through `pixelpad.check_kid_rules` like any other, so a bonus
  cannot teach something the base game forbids.
- They are counted against a new `BONUS_BUDGET = 100`, reported next to the base
  count, and the build fails over it the same way.
- They are **excluded from `state_at()`**, so milestones, checkpoints and the
  slide states stay the base game. A child who does every bonus and a child who
  does none must both be able to follow week 9.

Sketch, ~6 lines a week:

| Wk | Bonus | ~Lines |
|---:|---|---:|
| 1 | A second monster, and why you can only see one | 2 |
| 2 | A shy monster that hangs back from the mouse; follow `y` too | 3 |
| 3 | Food that starts somewhere new every time | 4 |
| 4 | A slow-motion switch and a fast-forward one | 4 |
| 5 | Golden food worth two points | 6 |
| 6 | Move and recolour the label; put your name on it | 5 |
| 7 | A bomb that starts higher, so you get warning | 3 |
| 8 | A second bomb on a different rhythm | 4 |
| 9 | Start with five lives; lose two to a bomb | 4 |
| 10 | Sudden death — one hit and it is over | 3 |
| 11 | Your own Game Over words, size and colour | 6 |
| 12 | A rank for your score (an `if` ladder: Good / Great / Amazing) | 9 |
| 13 | Restart with the space bar only | 3 |
| 14 | Tune the speed cap; find the fastest you can still play | 4 |
| 15 | A high score that survives between games | 8 |
| Spare | for what authoring turns up | ~32 |

The spare is real: the weeks above come to ~68, and bonuses grow when they meet a
real class.

---

## 4. Code changes this plan needs

In `course.py`:

- `LINE_BUDGET` **300 → 150**, and a new `BONUS_BUDGET = 100`. *(Done: both
  live in `course.py`, and `build.py` counts, rule-checks and enforces each.)*
- `TOTAL_WEEKS` raised a week at a time as each lands (the build refuses if it
  disagrees with `WEEKS`).
- `PANELS` gains `Game loop`, `Food start/loop`, `Bomb start/loop`, `Play loop`,
  `GameOver start/loop`, `Start start/loop`; `ROOMS` gains `GameOver` and `Start`.
- `ORDER` gains an entry per panel — file order, not teaching order. Note
  `Food loop` is fall, catch, cap, recycle, while it is *taught* fall, recycle,
  catch, cap. Same for `Bomb loop`.
- `SPRITES` gains `food.png` and `bomb.png`.
- `CONCEPTS`, `VISUALS`, `LINE_NOTES` and one `QUIZZES` set per week, as each
  week is authored.

In `build.py`: the bonus budget and its rule check; everything else already
handles multiple rooms.

## 5. Before any of it ships

`pxp101/` has **no `test/`**, and `SLIDE-RULES.md` says to run a course's
milestone and guard suites before shipping. It also is not registered in
`window.UTG_CLASSROOMS`, so the classroom cannot open it. Both are separate jobs,
and both should land before week 3 reaches real children — a milestone suite that
drives each week's game in the real engine (`RULES.md` §9: assert on
`Sk.globals.Game` state, never on pixels) is what proves the plan above actually
plays.
