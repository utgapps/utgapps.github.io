"""PixelPad engine knowledge for PXP101.

PixelPad (https://pixelpad.io) is a browser Python 2D game engine - PIXI.js for
drawing, Skulpt for running the Python. A whole game is ONE standalone HTML file
that boots from a CDN, so a milestone here is genuinely playable with no server,
no key and no network beyond the CDN itself. That is why every PXP101 checkpoint
can say "press Play and see what yours should do".

The rules a kid's code obeys are camp-coding-projects/RULES.md, proven over 21
games with nine-year-olds. PXP101 keeps them and ENFORCES them at build time
(see check_kid_rules) rather than rewriting the author's lines: what sits in
course.py is exactly what the child types and exactly what gets assembled.

    Game        holds the globals; its start() sets them and set_room('Play')
    Play room   makes the objects and the HUD; the game happens here
    GameOver    a separate room on losing; a tap goes back to Play

Coordinates: (0,0) is the CENTRE of the screen and y+ is UP.
"""

import base64
import json
import re
import struct
import zlib

CDN = "https://cdn.jsdelivr.net/gh/pixelpad-io/pixelpad.min@main/pixelpad.min.js"

# Colour name -> RGB. Sprites are placeholders in the generated game; the child
# draws the real art in PixelPad at the exact size the textbook lists, so the
# typed code never carries a scale multiplier.
RGB = {
    "white": (255, 255, 255), "dark": (20, 24, 31), "yellow": (244, 208, 63),
    "green": (90, 208, 107), "red": (230, 75, 75), "blue": (74, 163, 255),
    "brown": (156, 107, 63), "gray": (138, 147, 163), "orange": (239, 139, 59),
    "purple": (168, 107, 214), "dgreen": (47, 107, 58), "cyan": (80, 220, 200),
}


def solid_png(rgb, width, height):
    """A solid-colour PNG of exactly width x height, as a data URI - stand-in
    art so the assembled game runs before the child has drawn anything."""
    def chunk(kind, data):
        payload = kind + data
        return (struct.pack(">I", len(data)) + payload
                + struct.pack(">I", zlib.crc32(payload) & 0xffffffff))
    row = b"\x00" + bytes(tuple(rgb) + (255,)) * width
    raw = row * height
    png = (b"\x89PNG\r\n\x1a\n"
           + chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0))
           + chunk(b"IDAT", zlib.compress(raw))
           + chunk(b"IEND", b""))
    return "data:image/png;base64," + base64.b64encode(png).decode()


def textures(sprites):
    """{'monster.png': ('green', 48, 48)} -> {'monster.png': data-uri}."""
    return {name: solid_png(RGB[colour], width, height)
            for name, (colour, width, height) in sprites.items()}


# ---------------------------------------------------------------------------
# Panels
#
# A PixelPad game is not files, it is per-object code panels: every class and
# every room has a start() and a loop(). PXP101 names a panel "Monster loop" and
# treats it as one "file", so line numbers restart per panel - an eight-year-old
# is told "line 3 of Monster's loop", never "line 147 of script.js".
# ---------------------------------------------------------------------------

def split_panel(panel):
    """'Monster loop' -> ('Monster', 'loop')."""
    asset, _space, tab = panel.rpartition(" ")
    if tab not in ("start", "loop") or not asset:
        raise ValueError("panel %r must be '<Asset> start' or '<Asset> loop'" % panel)
    return asset, tab


def assemble(panel_code, sprites, rooms):
    """The PixelPad config for a game state.

    panel_code: {"Monster loop": "line\\nline", ...} - already-final Python.
    rooms:      room names, so everything else counts as a class.
    """
    classes, room_cfg = {}, {}
    for panel, body in panel_code.items():
        asset, tab = split_panel(panel)
        if asset == "Game":
            continue
        bucket = room_cfg if asset in rooms else classes
        bucket.setdefault(asset, {"start": "", "loop": ""})[tab] = body
    return {
        "autoplay": True, "theme": "dark", "layout": "vertical", "canEdit": True,
        "textures": textures(sprites),
        "start": panel_code.get("Game start", ""),
        "loop": panel_code.get("Game loop", ""),
        "classes": classes, "rooms": room_cfg,
    }


def playable_html(panel_code, sprites, rooms, title, guard_html=""):
    """A standalone, playable page for one week's state. The little poller is
    what makes it autoplay inside a slide: PixelPad renders a PLAY button and
    only sizes itself on a resize, and a slide reveals the frame after load."""
    cfg = json.dumps(assemble(panel_code, sprites, rooms))
    return (
        '<!DOCTYPE html><html><head>' + guard_html + '<meta charset="utf-8">'
        '<title>' + title + '</title>'
        '<style>html,body{margin:0;height:100%;overflow:hidden;background:#0f1320}'
        '#game{height:100vh}'
        # Only the game. PixelPad's editor chrome - asset lists, the code pane,
        # the column drag handles, the SAVED/STOP toolbar and the console strip -
        # is noise on a projector, and it pushed the canvas into a scrollbar.
        '#game #pp-block0,#game #pp-block1,#game #pp-console,'
        '#game #pp-col-adjust-code,#game #pp-col-adjust-canvas{display:none!important}'
        '#game #pp-block2{width:100%!important}'
        '#game #pp-block2-child>.row:not(#canvasContainer){display:none!important}'
        '#game #canvasContainer{flex:1 1 auto}</style></head>'
        '<body><div id="game"></div><script src="' + CDN + '"></script><script>\n'
        'PixelPad.game("#game", ' + cfg + ');\n'
        '(function(){var n=0;var iv=setInterval(function(){n++;'
        'window.dispatchEvent(new Event("resize"));'
        'var b=document.querySelector("#game #pp-start");'
        'if(!window.ppApp&&b&&b.textContent.trim()==="PLAY")b.click();'
        'if(window.ppApp||n>80){window.dispatchEvent(new Event("resize"));clearInterval(iv);}'
        '},200);})();\n</script></body></html>'
    )


# ---------------------------------------------------------------------------
# Python-aware chunking (replaces AI101's brace/CSS splitter)
# ---------------------------------------------------------------------------

def chunk_units(lines):
    """Group a header line ending in ':' with its indented body, so a step can
    never show an `if` without the code it runs."""
    units, index = [], 0
    while index < len(lines):
        line = lines[index]
        indent = len(line) - len(line.lstrip())
        unit = [line]
        index += 1
        if line.rstrip().endswith(":"):
            while index < len(lines) and (lines[index].strip() == ""
                                          or len(lines[index]) - len(lines[index].lstrip()) > indent):
                unit.append(lines[index])
                index += 1
        units.append(unit)
    return units


def paginate(lines, max_lines=6):
    """Whole units packed into pages of at most max_lines lines. One
    indivisible block may exceed max_lines - RULES.md allows that rather
    than splitting an if."""
    pages, page = [], []
    for unit in chunk_units(lines):
        if page and len(page) + len(unit) > max_lines:
            pages.append(page)
            page = []
        page.extend(unit)
    if page:
        pages.append(page)
    return pages


# ---------------------------------------------------------------------------
# The kid-code rules, enforced
#
# RULES.md exists because each of these confused a real nine-year-old. PXP101 is
# for eight-year-olds, so the build refuses to ship code that breaks them rather
# than trusting an author to remember.
# ---------------------------------------------------------------------------

_INLINE_IF = re.compile(r"^\s*(if |elif |else\b).*:\s*\S")
_BARE_ASSIGN = re.compile(r"^\s*([a-z][A-Za-z0-9_]*)\s*=(?!=)")
_LIST_LIT = re.compile(r"(?<![\w')\]])\[")          # a [ that opens a literal, not an index


def check_kid_rules(panel, lines):
    """Return a list of complaints about one panel's code."""
    complaints = []
    for line_number, raw in enumerate(lines, 1):
        line = raw.split("#", 1)[0]                  # a comment may say anything
        quoteless = re.sub(r"'[^']*'|\"[^\"]*\"", "''", line)
        where = "%s line %d: %s" % (panel, line_number, raw.strip())
        if _INLINE_IF.match(quoteless):
            complaints.append("if/else must not share a line with what it runs - " + where)
        if "/" in quoteless:
            complaints.append("no division - use + - * only - " + where)
        if "%" in quoteless:
            complaints.append("no modulo - " + where)
        if "abs(" in quoteless:
            complaints.append("no abs() - " + where)
        if _LIST_LIT.search(quoteless):
            complaints.append("no lists - name each object instead - " + where)
        if _BARE_ASSIGN.match(quoteless):
            complaints.append("every name needs self. or Game. - " + where)
    return complaints
