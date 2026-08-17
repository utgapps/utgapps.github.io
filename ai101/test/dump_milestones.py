"""Dump every milestone's files as JSON so the Node harness can run them."""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))          # the ai101 folder above this one
import build

out = {str(n): build.state_at(n) for n in range(1, 16)}
path = os.path.join(HERE, "milestones.json")
with open(path, "w", encoding="utf-8") as fh:
    json.dump(out, fh)
print("wrote", path)
for n in range(1, 16):
    print(f"  week {n:2d}: " + ", ".join(f"{k} {len(v.splitlines())}L" for k, v in out[str(n)].items()))
