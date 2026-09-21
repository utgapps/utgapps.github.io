"""The finished game, written down before the weeks that build it.

PLAN.md fixes the shape of Monster Munch - thirteen panels, seventy-eight lines,
every name chosen once - but a plan cannot be run. This module is the same game
as CODE: the exact lines a child has typed by the end of week 15, in file order,
split into the blocks the weeks add.

It exists so that weeks 3-15 are transcription, not invention. Authoring a week
means copying its block out of here into an ADD(), never inventing a line and
discovering in week 14 that it has to be rewritten - which is the one thing
SLIDE-RULES.md section 4 asks a course to avoid.

    python spine.py          # check the rules, the counts and the authored weeks

The checks are the point. `check` proves every line obeys RULES.md's kid rules,
that the panels and blocks match PLAN.md's table, that each week's additions sum
to the number the plan budgeted, and - the one that will actually catch a
mistake - that the weeks already authored in course.py are a prefix of this
spine, block by block. The moment week 3 says something this file does not, the
check goes red and one of the two is wrong on purpose.

What is NOT here: the bonus track. The machinery is real - week["bonus"]["lines"]
is counted against BONUS_BUDGET, rule-checked and rendered - but no week has
authored any yet, and when they do those lines stay out of state_at() by design.
That is what lets this spine stand for every child: the one who does every bonus
and the one who does none open week 9 to the same game.

Driven in the real engine, 2026-09-20
------------------------------------
`playable()` was served over http and driven frame by frame on the real
PixelPad CDN build: the title screen, the tap into Play, the monster tracking
the mouse and clamping at both edges, food falling at Game.fallSpeed, a catch
scoring and speeding up, the caught food riding week 4's recycle back to the
top, a bomb taking a life, the last life raising Game.dead and GAME OVER
arriving one frame later from Game loop rather than from the bomb, the final
score on the screen, the tap back to a clean game, and the speed cap holding 20
down to 9. Every week's promise in PLAN.md section 2 now has a run behind it.

Three things about driving it that cost an hour, so the next test suite does
not pay for them again:

- The engine's whole game loop is requestAnimationFrame. In a hidden or
  background tab rAF is suspended, so start panels run and then NOTHING moves -
  while get_fps() still cheerfully reports 60 and the button still reads STOP.
  Stop the ticker and call `ppApp._ticker.update(t)` yourself.
- Those timestamps must be monotonic AND above `ppApp._ticker.lastTime`, which
  starts at a real performance.now(). Stepping from t=0 silently does nothing.
- Synthetic DOM KeyboardEvents never reach the engine. Use the engine's own
  `simulate_key_down` / `simulate_key_up`, and step one frame after boot before
  the first tap - `keysDownOnce` is edge-triggered and the very first update
  after a room loads is spent on that room.
"""

import course
import pixelpad

# The game as the child leaves it in week 15. Panel -> [(block, [line, ...])].
# Block order inside a panel is FILE order, which is not always teaching order:
# Food loop is written fall, catch, cap, recycle but taught fall, recycle,
# catch, cap, because week 4 has to build the recycle that week 5's catch then
# reuses.
SPINE = {

    # ---------------------------------------------------------------- Game --
    # Game is the persistent root: its panels survive every room change, which
    # is why the room switch lives here and not in the object that died.
    # `Game.` is used even inside Game's own panels - see PLAN.md. self. would
    # work identically, and that is exactly why one vocabulary wins.
    "Game start": [
        ("score", ["Game.score = 0"]),                          # wk 5
        ("lives", ["Game.lives = 3"]),                          # wk 5
        ("speed", ["Game.fallSpeed = 3"]),                      # wk 4
        ("flag",  ["Game.dead = False"]),                       # wk 9
        ("setup", ["set_room('Start')"]),                       # wk 1, SET wk 15
    ],
    "Game loop": [
        # The flag pattern, and the whole reason week 10 exists. A Bomb must
        # never call set_room() from its own loop - the room change destroys it
        # halfway through the step it is still running. It raises a flag here
        # instead, and Game, which survives the switch, does the switching.
        ("over", [                                              # wk 10
            "if Game.dead:",
            "    Game.dead = False",
            "    set_room('GameOver')",
        ]),
    ],

    # ------------------------------------------------------------- Monster --
    "Monster start": [
        ("look", [                                              # wk 1
            "self.image = sprite('monster.png')",
            "self.y = -210",
        ]),
    ],
    "Monster loop": [
        ("follow", ["self.x = mouse_x()"]),                     # wk 2
        ("edges", [                                             # wk 2
            "if self.x > 320:",
            "    self.x = 320",
            "if self.x < -320:",
            "    self.x = -320",
        ]),
    ],

    # ---------------------------------------------------------------- Food --
    "Food start": [
        ("look", [                                              # wk 3
            "import random",
            "self.image = sprite('food.png')",
        ]),
        ("place", [                                             # wk 3
            "self.x = random.randint(-300, 300)",
            "self.y = random.randint(260, 600)",
        ]),
    ],
    "Food loop": [
        ("fall", [                                              # wk 4
            "import random",
            "self.y = self.y - Game.fallSpeed",
        ]),
        # Catching sends the food BELOW the floor rather than back to the top,
        # so the recycle block written in week 4 is what lifts it - one idea
        # paying for itself, which is the best thing an eight-year-old can see.
        ("catch", [                                             # wk 5, +1 wk 14
            "if get_collision(self, 'Monster'):",
            "    Game.score = Game.score + 1",
            "    Game.fallSpeed = Game.fallSpeed + 0.2",
            "    self.y = -300",
        ]),
        ("cap", [                                               # wk 14
            "if Game.fallSpeed > 9:",
            "    Game.fallSpeed = 9",
        ]),
        ("recycle", [                                           # wk 4
            "if self.y < -260:",
            "    self.x = random.randint(-300, 300)",
            "    self.y = random.randint(260, 600)",
        ]),
    ],

    # ---------------------------------------------------------------- Bomb --
    "Bomb start": [
        ("look", [                                              # wk 7
            "import random",
            "self.image = sprite('bomb.png')",
        ]),
        # Bombs start higher than food, so the first one gives you a moment.
        ("place", [                                             # wk 7
            "self.x = random.randint(-300, 300)",
            "self.y = random.randint(300, 700)",
        ]),
    ],
    "Bomb loop": [
        ("fall", [                                              # wk 8
            "import random",
            "self.y = self.y - Game.fallSpeed",
        ]),
        ("hit", [                                               # wk 9, +2 wk 10
            "if get_collision(self, 'Monster'):",
            "    Game.lives = Game.lives - 1",
            "    self.y = -300",
            "    if Game.lives < 1:",
            "        Game.dead = True",
        ]),
        ("recycle", [                                           # wk 8
            "if self.y < -260:",
            "    self.x = random.randint(-300, 300)",
            "    self.y = random.randint(300, 700)",
        ]),
    ],

    # ---------------------------------------------------------------- Play --
    "Play start": [
        ("make", [
            "Game.monster = Monster()",                         # wk 1
            "Game.foodA = Food()",                              # wk 3
            "Game.bomb = Bomb()",                               # wk 7
            "Game.foodB = Food()",                              # wk 14
            "Game.foodC = Food()",                              # wk 14
            "Game.bombB = Bomb()",                              # wk 14
        ]),
        # Lives are on the label from week 6, three weeks before anything can
        # take one. Writing it once means week 9 never rewrites it - and the
        # gap is a question worth asking the room.
        ("hud", [                                               # wk 6
            "Game.label = text()",
            'Game.label.color = "white"',
            "Game.label.y = 235",
            "Game.label.text = 'Score: 0'",
        ]),
    ],
    "Play loop": [
        ("label", [                                             # wk 6
            "Game.label.text = 'Score: ' + str(Game.score) + '   Lives: ' + str(Game.lives)",
        ]),
    ],

    # ------------------------------------------------------------ GameOver --
    "GameOver start": [
        ("message", [                                           # wk 11
            "Game.message = text()",
            'Game.message.color = "white"',
            "Game.message.fontSize = 40",
            'Game.message.halign = "center"',
            "Game.message.text = 'GAME OVER - tap to play again'",
        ]),
        ("score", [                                             # wk 12
            "Game.finalScore = text()",
            'Game.finalScore.color = "white"',
            "Game.finalScore.fontSize = 28",
            'Game.finalScore.halign = "center"',
            "Game.finalScore.y = -60",
            "Game.finalScore.text = 'Final Score: ' + str(Game.score)",
        ]),
    ],
    "GameOver loop": [
        # A room's own loop MAY call set_room - a room is not destroyed the way
        # an object in it is. This is the proven camp pattern, and the contrast
        # with Bomb.hit is worth drawing out loud in week 13.
        ("again", [                                             # wk 13
            "if key_was_pressed(' ') or mouse_was_pressed('left'):",
            "    Game.score = 0",
            "    Game.lives = 3",
            "    Game.fallSpeed = 3",
            "    set_room('Play')",
        ]),
    ],

    # --------------------------------------------------------------- Start --
    "Start start": [
        ("title", [                                             # wk 15
            "Game.title = text()",
            'Game.title.color = "white"',
            "Game.title.fontSize = 44",
            'Game.title.halign = "center"',
            "Game.title.text = 'MONSTER MUNCH - tap to begin'",
        ]),
    ],
    "Start loop": [
        ("begin", [                                             # wk 15
            "if key_was_pressed(' ') or mouse_was_pressed('left'):",
            "    set_room('Play')",
        ]),
    ],
}

# Everything the child draws, at the size the code runs it at.
SPRITES = {
    "monster.png": ("green", 48, 48),
    "food.png": ("orange", 30, 30),
    "bomb.png": ("dark", 34, 34),
}

ROOMS = ["Start", "Play", "GameOver"]

LINE_BUDGET = 150        # PLAN.md section 4, as revised. course.LINE_BUDGET matches.

# PLAN.md section 1: lines per panel. Kept here so the plan and the code cannot
# drift apart silently - if a panel grows, one of the two is wrong on purpose.
PANEL_LINES = {
    "Game start": 5, "Game loop": 3,
    "Monster start": 2, "Monster loop": 5,
    "Food start": 4, "Food loop": 11,
    "Bomb start": 4, "Bomb loop": 10,
    "Play start": 10, "Play loop": 1,
    "GameOver start": 11, "GameOver loop": 5,
    "Start start": 5, "Start loop": 2,          # 7 together, in the plan's table
}

# PLAN.md section 2: how many NEW lines each week adds. Weeks 1-2 are authored
# in course.py; the rest are what this spine promises they will cost.
WEEK_LINES = {1: 4, 2: 5, 3: 5, 4: 6, 5: 5, 6: 5, 7: 5, 8: 5,
              9: 4, 10: 5, 11: 5, 12: 6, 13: 5, 14: 6, 15: 7}

# Which week adds which lines of which block. A block a single week writes whole
# is just its week number; a block two weeks share lists (week, line count) in
# the order the lines appear in the block.
WEEK_OF = {
    ("Game start", "score"): 5, ("Game start", "lives"): 5,
    ("Game start", "speed"): 4, ("Game start", "flag"): 9,
    ("Game start", "setup"): 1,                  # SET again in week 15, +0 lines
    ("Game loop", "over"): 10,
    ("Monster start", "look"): 1,
    ("Monster loop", "follow"): 2, ("Monster loop", "edges"): 2,
    ("Food start", "look"): 3, ("Food start", "place"): 3,
    ("Food loop", "fall"): 4,
    ("Food loop", "catch"): [(5, 2), (14, 1), (5, 1)],
    ("Food loop", "cap"): 14, ("Food loop", "recycle"): 4,
    ("Bomb start", "look"): 7, ("Bomb start", "place"): 7,
    ("Bomb loop", "fall"): 8,
    ("Bomb loop", "hit"): [(9, 3), (10, 2)],
    ("Bomb loop", "recycle"): 8,
    ("Play start", "make"): [(1, 1), (3, 1), (7, 1), (14, 3)],
    ("Play start", "hud"): 6,
    ("Play loop", "label"): 6,
    ("GameOver start", "message"): 11, ("GameOver start", "score"): 12,
    ("GameOver loop", "again"): 13,
    ("Start start", "title"): 15, ("Start loop", "begin"): 15,
}


# The whole course has exactly ONE rewrite, and it is here so that nothing else
# can quietly become a second one. Week 1 writes set_room('Play') because there
# is no other room yet; week 15 adds the title screen and SETs it to 'Start'.
# That is a real lesson about rooms, not churn, so it earns its strike-through
# slide (SLIDE-RULES.md section 4). Block -> (the week that rewrites it, the
# lines it holds until then).
REWRITES = {
    ("Game start", "setup"): (15, ["set_room('Play')"]),
}


def panel_code(panel):
    """The finished panel as one block of Python, exactly as the child sees it."""
    return "\n".join(line for _block, lines in SPINE[panel] for line in lines)


def code():
    """{panel: source} for the whole finished game."""
    return {panel: panel_code(panel) for panel in SPINE}


def playable(title="Monster Munch"):
    """The finished game as a standalone page, for driving in a real browser."""
    return pixelpad.playable_html(code(), SPRITES, ROOMS, title)


# ---------------------------------------------------------------------------

def check():
    """Every complaint about the spine, as a list. Empty means it holds."""
    complaints = []

    # 1. RULES.md's code style, the same check the build runs on a week.
    for panel, blocks in SPINE.items():
        complaints += pixelpad.check_kid_rules(panel, panel_code(panel).split("\n"))

    # 2. A block named twice in a panel would make WEEK_OF ambiguous.
    for panel, blocks in SPINE.items():
        names = [name for name, _lines in blocks]
        if len(names) != len(set(names)):
            complaints.append("%s: a block name is used twice - %s" % (panel, names))

    # 3. The panel table in PLAN.md section 1.
    for panel in sorted(set(SPINE) | set(PANEL_LINES)):
        if panel not in SPINE:
            complaints.append("%s: in PLAN.md's table but not in the spine" % panel)
            continue
        if panel not in PANEL_LINES:
            complaints.append("%s: in the spine but not in PLAN.md's table" % panel)
            continue
        panel_length = len(panel_code(panel).split("\n"))
        if panel_length != PANEL_LINES[panel]:
            complaints.append("%s: %d lines, PLAN.md says %d"
                              % (panel, panel_length, PANEL_LINES[panel]))

    game_length = sum(len(panel_code(panel).split("\n")) for panel in SPINE)
    if game_length > LINE_BUDGET:
        complaints.append("OVER BUDGET: %d lines > %d" % (game_length, LINE_BUDGET))

    # 4. Every block is claimed by a week, and the weeks sum to the plan's table.
    lines_added_in = {week: 0 for week in WEEK_LINES}
    for panel, blocks in SPINE.items():
        for name, lines in blocks:
            claimed_by = WEEK_OF.get((panel, name))
            if claimed_by is None:
                complaints.append("%s:%s is not claimed by any week in WEEK_OF"
                                  % (panel, name))
                continue
            if isinstance(claimed_by, int):
                claimed_by = [(claimed_by, len(lines))]
            claimed_length = sum(count for _week, count in claimed_by)
            if claimed_length != len(lines):
                complaints.append("%s:%s is %d lines but WEEK_OF splits %d"
                                  % (panel, name, len(lines), claimed_length))
            for week, count in claimed_by:
                lines_added_in[week] = lines_added_in.get(week, 0) + count
    for week in sorted(WEEK_LINES):
        if lines_added_in.get(week, 0) != WEEK_LINES[week]:
            complaints.append("week %d adds %d lines, PLAN.md budgets %d"
                              % (week, lines_added_in.get(week, 0), WEEK_LINES[week]))

    # 5. The weeks already authored must BE this spine, not merely resemble it.
    # This is the check with teeth: it goes red the day week 3 invents a line.
    for panel, blocks in SPINE.items():
        for name, lines in blocks:
            ops = [op for week in course.WEEKS for op in week["ops"]
                   if op[1] == panel and op[2] == name]
            if not ops:
                continue
            authored_lines = []
            for kind, _panel, _block, body in ops:
                authored_lines = (list(body) if kind == "set"
                                  else authored_lines + list(body))
            # Until the week that rewrites it lands, a rewritten block holds
            # its earlier lines - that is the point of the rewrite.
            spine_lines = lines
            rewrite = REWRITES.get((panel, name))
            if rewrite:
                rewrite_week, lines_before_rewrite = rewrite
                if len(course.WEEKS) < rewrite_week:
                    spine_lines = lines_before_rewrite
                    if any(kind == "set" for kind, _panel, _block, _body in ops):
                        complaints.append(
                            "%s:%s is SET before week %d, which is the week "
                            "the spine says rewrites it" % (panel, name, rewrite_week))
            if authored_lines != spine_lines[:len(authored_lines)]:
                complaints.append("%s:%s - course.py has %r, the spine wants %r"
                                  % (panel, name, authored_lines,
                                     spine_lines[:len(authored_lines)]))

    # 5b. An unplanned rewrite is the thing SLIDE-RULES.md section 4 warns
    # about, so a SET the spine has not sanctioned is an error, not a surprise.
    for rewrite_panel, rewrite_block in REWRITES:
        blocks_in_panel = [name for name, _lines in SPINE.get(rewrite_panel, [])]
        if rewrite_block not in blocks_in_panel:
            complaints.append("REWRITES names %s:%s, which is not in the spine"
                              % (rewrite_panel, rewrite_block))
    for week in course.WEEKS:
        for kind, panel, block, _body in week["ops"]:
            if kind == "set" and (panel, block) not in REWRITES:
                complaints.append("week %d rewrites %s:%s, which the spine does not "
                                  "plan for - add it to REWRITES or avoid the rewrite"
                                  % (week["n"], panel, block))

    # 6. A panel or sprite course.py does not know about yet is fine (it is
    # ahead of the authoring), but one course.py has and the spine lacks is not.
    for panel in course.PANELS:
        if panel not in SPINE:
            complaints.append("course.py has panel %r, the spine does not" % panel)
    for name in course.SPRITES:
        if name not in SPRITES:
            complaints.append("course.py draws %r, the spine does not" % name)
        elif course.SPRITES[name] != SPRITES[name]:
            complaints.append("%s is %r in course.py, %r in the spine"
                              % (name, course.SPRITES[name], SPRITES[name]))
    for room in course.ROOMS:
        if room not in ROOMS:
            complaints.append("course.py has room %r, the spine does not" % room)

    return complaints


def main():
    complaints = check()
    game_length = sum(len(panel_code(panel).split("\n")) for panel in SPINE)
    for panel in PANEL_LINES:
        print("  %-16s %2d" % (panel, len(panel_code(panel).split("\n"))))
    print("Monster Munch - %d lines of %d, %d panels, %d blocks"
          % (game_length, LINE_BUDGET, len(SPINE),
             sum(len(blocks) for blocks in SPINE.values())))
    op_count = sum(len(week["ops"]) for week in course.WEEKS)
    print("course.py has %d weeks authored (%d ops), checked against the spine"
          % (len(course.WEEKS), op_count))
    if complaints:
        print("\n%d problem(s):" % len(complaints))
        for complaint in complaints:
            print("  - " + complaint)
        raise SystemExit(1)
    print("the spine holds")


if __name__ == "__main__":
    main()
