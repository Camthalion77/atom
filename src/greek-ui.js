// Atom 2.0 Greek/English UI translations. Preserve programmatic keys.
'use strict';
const greek = {
  " grammar": "",
  "File uses the ": "Το αρχείο χρησιμοποιεί τη σύνταξη ",
  " line endings": " ως χαρακτήρες τέλους γραμμής",
  "File uses ": "Το αρχείο χρησιμοποιεί ",
  "unknown": "άγνωστα",
  "mixed": "μεικτά",
  "Mixed": "Μεικτά",
  " of ": " από ",
  "packages were rebuilt successfully. Reload Atom to activate them.": "πακέτα μεταγλωττίστηκαν ξανά με επιτυχία. Επανεκκινήστε το Άτομο για να ενεργοποιηθούν.",
  "Some installed packages could not be loaded because they contain native modules that were compiled for an earlier version of Atom.": "Ορισμένα εγκατεστημένα πακέτα δεν φορτώθηκαν, επειδή περιέχουν εγγενείς μονάδες μεταγλωττισμένες για παλαιότερη έκδοση του Atom.",
  "None of your packages contain incompatible native modules.": "Κανένα από τα πακέτα σας δεν περιέχει μη συμβατές εγγενείς μονάδες.",
  "Incompatible Packages": "Μη συμβατά πακέτα",
  "Rebuild Failed": "Η επαναμεταγλώττιση απέτυχε",
  "Rebuild Succeeded": "Η επαναμεταγλώττιση ολοκληρώθηκε",
  "Rebuilding": "Επαναμεταγλώττιση",
  "Package Settings": "Ρυθμίσεις πακέτου",
  "Rebuild Packages": "Επαναμεταγλώττιση πακέτων",
  "Reload Atom": "Επανεκκίνηση του Ατόμου",
  "Loading...": "Φόρτωση…",
  "Plain Text": "Απλό κείμενο",
  "File uses the {name} grammar": "Το αρχείο χρησιμοποιεί τη σύνταξη {name}",
  "File uses {name} line endings": "Το αρχείο χρησιμοποιεί χαρακτήρες τέλους γραμμής {name}",

  "Auto Detect": "Αυτόματη αναγνώριση",
  "(Recommended) A faster parser with improved syntax highlighting & code navigation support.": "(Προτεινόμενο) Ταχύτερος αναλυτής με βελτιωμένο χρωματισμό σύνταξης και πλοήγηση στον κώδικα.",
  "Enter a <row> or <row>:<column> to go there. Examples: \"3\" for row 3 or \"2:7\" for row 2 and column 7": "Πληκτρολόγησε <γραμμή> ή <γραμμή>:<στήλη>. Παραδείγματα: «3» για τη γραμμή 3 ή «2:7» για τη γραμμή 2 και τη στήλη 7."
};
function language() {
  // macOS language is reflected by Electron/Chromium navigator.language.
  const locale = (typeof navigator !== 'undefined' && navigator.language) ||
    (typeof process !== 'undefined' && process.env && process.env.LANG) || 'en';
  return /^el(?:[-_]|$)/i.test(locale) ? 'el' : 'en';
}
function tr(text) {return language() === 'el' && Object.prototype.hasOwnProperty.call(greek,text) ? greek[text] : text;}
module.exports = {tr,language,greek};
