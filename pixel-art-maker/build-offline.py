# Builds a single self-contained Pixel Art Maker HTML file that runs with no
# network at all - straight off a USB stick, over file://, on a locked-down PC.
#
#   python build-offline.py [output.html]
#
# What it folds in / strips out:
#   style.css, app.js            -> inlined
#   UTG logo (remote SVG)        -> inlined as a data: URI, cached next to this
#                                   script as utglogoh.svg so later builds need
#                                   no network either
#   Google Fonts <link>s         -> dropped; the CSS font stack already falls
#                                   back to system-ui
#   guard.js / class-codes.js    -> dropped, because the access guard checks a
#                                   class code against the Classroom API and
#                                   would bounce the page with no network
#
# NOTE: because the guard is stripped, the result is an UNGATED copy of the
# tool. Hand it out deliberately - putting it on the public site would let
# anyone use it without a class code.
import base64, os, re, sys, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
LOGO_URL = "https://s3.us-west-1.amazonaws.com/utg.pictures.videos/UTGWeb/utglogoh.svg"
LOGO_CACHE = os.path.join(HERE, "utglogoh.svg")


def read(name):
    with open(os.path.join(HERE, name), encoding="utf-8") as f:
        return f.read()


def logo_data_uri():
    if not os.path.exists(LOGO_CACHE):
        print("logo not cached, fetching %s" % LOGO_URL)
        with urllib.request.urlopen(LOGO_URL, timeout=30) as r:
            data = r.read()
        with open(LOGO_CACHE, "wb") as f:
            f.write(data)
    with open(LOGO_CACHE, "rb") as f:
        data = f.read()
    if b"<script" in data.lower():
        raise SystemExit("refusing to inline an SVG containing a script")
    return "data:image/svg+xml;base64," + base64.b64encode(data).decode()


def build(out_path):
    html = read("index.html")
    css = read("style.css")
    js = read("app.js")

    # A literal </style> or </script> inside the payload would close the tag early.
    css = css.replace("</style", "<\\/style")
    js = js.replace("</script", "<\\/script")

    # 1. the access guard - see the note at the top. The tag it lives in also
    # sets UTG_EMBED, which is only ever true in an iframe on the live site;
    # dropping the whole tag leaves it undefined, which is what an offline copy
    # wants anyway - Save downloads a PNG, with no editor to hand it to.
    html, n_guard = re.subn(r'\s*<script id="utg-guard-boot">.*?</script>', "", html, flags=re.S)

    # 2. Google Fonts preconnects + stylesheet
    html, n_font = re.subn(r'\s*<link rel="preconnect"[^>]*>', "", html)
    n_font += re.subn(r'\s*<link rel="stylesheet" href="https://fonts\.googleapis\.com[^>]*>', "", html)[1]
    html = re.sub(r'\s*<link rel="stylesheet" href="https://fonts\.googleapis\.com[^>]*>', "", html)

    # 3. local stylesheet -> inline <style>
    html, n_css = re.subn(r'<link rel="stylesheet" href="style\.css"\s*/?>',
                          "<style>\n" + css + "\n</style>", html)

    # 4. local script -> inline <script>
    html, n_js = re.subn(r'<script src="app\.js"></script>',
                         "<script>\n" + js + "\n</script>", html)

    # 5. remote logo -> data: URI
    html, n_logo = re.subn(re.escape(LOGO_URL), logo_data_uri(), html)

    for label, got, want in (("guard", n_guard, 1), ("stylesheet", n_css, 1),
                             ("script", n_js, 1), ("logo", n_logo, 2)):
        if got != want:
            raise SystemExit("expected %d %s replacement(s), made %d - "
                             "index.html has changed shape" % (want, label, got))

    leftovers = [u for u in re.findall(r'(?:src|href)="(https?://[^"]+)"', html)]
    if leftovers:
        raise SystemExit("still references the network: %s" % leftovers)

    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)

    kb = os.path.getsize(out_path) / 1024.0
    print("wrote %s (%.0f KB)" % (out_path, kb))
    print("  inlined: style.css, app.js, UTG logo   dropped: guard, Google Fonts (%d tags)" % n_font)
    print("  remaining network references: none")


if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "pixel-art-maker-offline.html")
    build(out)
