"""PY102 course builder.

Everything in this folder is generated. Never hand-edit the HTML - edit
course.py and re-run this.

    python build.py

PY102 is a PixelPad course like PXP101, so it is built by PXP101's builder:
this runs ../pxp101/build.py against the course.py next to it, and every page
lands here. The builder's guards are the same ones, with this course's own
audience, step size and code rules read out of course.py.
"""

import os
import runpy
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PXP101 = os.path.join(HERE, os.pardir, "pxp101")

# After this folder, so `import course` finds PY102's course.py and
# `import pixelpad` finds the engine helpers that live with the builder.
sys.path.insert(1, PXP101)
runpy.run_path(os.path.join(PXP101, "build.py"), run_name="__main__")
