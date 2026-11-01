#!/usr/bin/env python3
from pathlib import Path
import plistlib
import shutil

root = Path(__file__).resolve().parents[2]
apps = sorted((root / "out").glob("Atom*.app"))
if len(apps) != 1:
    raise SystemExit(f"Expected exactly one Atom app, found {len(apps)}: {apps}")
app = apps[0]
resources = app / "Contents/Resources"
plist_path = app / "Contents/Info.plist"
with plist_path.open("rb") as f:
    info = plistlib.load(f)
info["CFBundleDisplayName"] = "Atom"
info["CFBundleLocalizations"] = ["en", "el"]
info["CFBundleDevelopmentRegion"] = "en"
with plist_path.open("wb") as f:
    plistlib.dump(info, f)
for code in ("el", "en"):
    source = root / "resources/mac" / (code + ".lproj") / "InfoPlist.strings"
    if not source.is_file():
        raise SystemExit(f"Missing localization source: {source}")
    dest = resources / (code + ".lproj")
    dest.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, dest / "InfoPlist.strings")
print("Installed: Άτομο (el) / Atom (en) into", app)
