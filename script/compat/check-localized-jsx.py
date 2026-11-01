#!/usr/bin/env python3
from pathlib import Path
import re
root = Path(__file__).resolve().parents[2]
p = root / "packages/incompatible-packages/lib/incompatible-packages-component.js"
source = p.read_text()
bad = "{tr('packages were rebuilt successfully. {tr('Reload Atom')} to activate them.')}"
good = "{tr('packages were rebuilt successfully. Reload Atom to activate them.')}"
if bad in source or good not in source:
    raise SystemExit("FAIL: localized incompatible-packages JSX regression")
# Reject likely nested tr calls within single-quoted translation arguments.
for file in (root / "packages").rglob("*.js"):
    text = file.read_text(errors="replace")
    for number, line in enumerate(text.splitlines(), 1):
        if re.search(r"\btr\('[^']*\{tr\('", line):
            raise SystemExit(f"FAIL: nested tr expression at {file}:{number}")
print("PASS: targeted JSX localization regression checks")
