#!/usr/bin/env python3
"""Patch only the exact settings-view source installed during bootstrap."""
from pathlib import Path
import shutil
root = Path(__file__).resolve().parents[2]
package = root / 'node_modules/settings-view/lib'
target = package / 'settings-view.js'
if not target.exists():
    raise SystemExit('settings-view not installed; bootstrap must run first')
s = target.read_text()
needle = '    etch.initialize(this)'
add = "    etch.initialize(this)\n    require('./atom-greek-i18n').install(this.element)"
if "require('./atom-greek-i18n')" not in s:
    if s.count(needle) != 1:
        raise SystemExit('Unexpected settings-view source; refusing to patch')
    target.write_text(s.replace(needle, add, 1))
# Translate the pane title at its source instead of manipulating the DOM.
title_old = "    return 'Settings'"
title_new = "    return require('./atom-greek-i18n').greek() ? 'Ρυθμίσεις' : 'Settings'"
if title_new not in s:
    if title_old not in s:
        raise SystemExit('Cannot find settings-view getTitle; refusing to patch')
    s = s.replace(title_old, title_new, 1)
    target.write_text(s)
shutil.copyfile(root/'script/compat/settings-view-el.js', package/'atom-greek-i18n.js')
shutil.copyfile(root/'script/compat/settings-extra-el.json', package/'settings-extra-el.json')
print('Localized settings-view installed into bundled dependency')
