'use strict';
// Atom 2.0: Greek UI translations for the bundled settings-view.
// Unrecognized strings remain English; package identifiers are not changed.
const words = {
  'Settings':'Ρυθμίσεις', 'Core':'Γενικά', 'Editor':'Επεξεργαστής',
  'System':'Σύστημα', 'Keybindings':'Συντομεύσεις πληκτρολογίου',
  'Packages':'Πακέτα', 'Themes':'Θέματα', 'Install':'Εγκατάσταση',
  'Updates':'Ενημερώσεις', 'Open Config Folder':'Άνοιγμα φακέλου ρυθμίσεων',
  'General':'Γενικά', 'Installed Packages':'Εγκατεστημένα πακέτα',
  'Installed Themes':'Εγκατεστημένα θέματα', 'Community Packages':'Πακέτα κοινότητας',
  'Core Packages':'Ενσωματωμένα πακέτα', 'Featured Packages':'Προτεινόμενα πακέτα',
  'Featured Themes':'Προτεινόμενα θέματα', 'Search packages':'Αναζήτηση πακέτων',
  'Search themes':'Αναζήτηση θεμάτων', 'Search':'Αναζήτηση',
  'Install Packages':'Εγκατάσταση πακέτων', 'Install Themes':'Εγκατάσταση θεμάτων',
  'Install a Package':'Εγκατάσταση πακέτου', 'Install a Theme':'Εγκατάσταση θέματος',
  'Package Settings':'Ρυθμίσεις πακέτου', 'Enable':'Ενεργοποίηση',
  'Disable':'Απενεργοποίηση', 'Uninstall':'Απεγκατάσταση',
  'Install':'Εγκατάσταση', 'Update':'Ενημέρωση', 'Update All':'Ενημέρωση όλων',
  'Check for Updates':'Έλεγχος ενημερώσεων', 'No Updates Available':'Δεν υπάρχουν διαθέσιμες ενημερώσεις',
  'View Code':'Προβολή κώδικα', 'View on Atom.io':'Προβολή στο Atom.io',
  'Settings':'Ρυθμίσεις', 'Show':'Εμφάνιση', 'Hide':'Απόκρυψη',
  'Description':'Περιγραφή', 'Version':'Έκδοση', 'Author':'Δημιουργός',
  'License':'Άδεια χρήσης', 'Repository':'Αποθετήριο',
  'Open Source':'Ανοιχτός κώδικας', 'Show in Finder':'Εμφάνιση στο Finder',
  'Installed':'Εγκατεστημένα', 'Available':'Διαθέσιμα',
  'Reload':'Επαναφόρτωση', 'Reload Atom':'Επαναφόρτωση του Ατόμου',
  'Key Binding':'Συντόμευση', 'Command':'Εντολή',
  'Source':'Προέλευση', 'Selector':'Επιλογέας',
  'Filter keybindings':'Φιλτράρισμα συντομεύσεων',
  'Themes':'Θέματα', 'UI Theme':'Θέμα διεπαφής',
  'Syntax Theme':'Θέμα σύνταξης', 'Font Family':'Οικογένεια γραμματοσειράς',
  'Font Size':'Μέγεθος γραμματοσειράς', 'Tab Length':'Πλάτος στηλοθέτη',
  'Soft Tabs':'Στηλοθέτες με κενά', 'Soft Wrap':'Αναδίπλωση γραμμών',
  'Show Line Numbers':'Εμφάνιση αριθμών γραμμών',
  'Show Invisibles':'Εμφάνιση μη ορατών χαρακτήρων',
  'Scroll Past End':'Κύλιση μετά το τέλος',
  'Confirm':'Επιβεβαίωση', 'Cancel':'Ακύρωση',
  'Save':'Αποθήκευση', 'Reset':'Επαναφορά',
  'Learn More':'Μάθε περισσότερα', 'Loading…':'Φόρτωση…', 'Loading...':'Φόρτωση…'
};
Object.assign(words, require('./settings-extra-el.json'));
function greek() {
  let locale = '';
  try { locale = navigator.language || ''; } catch (_) {}
  if (!locale && typeof process !== 'undefined') locale = (process.env || {}).LANG || '';
  return /^el(?:[-_]|$)/i.test(locale);
}
function translate(root) {
  if (!greek() || !root || !root.ownerDocument) return;
  const doc = root.ownerDocument;
  const walk = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  const nodes = [];
  while (walk.nextNode()) nodes.push(walk.currentNode);
  for (const node of nodes) {
    if (node.parentElement && /^(SCRIPT|STYLE|CODE|PRE|TEXTAREA)$/.test(node.parentElement.tagName)) continue;
    const old = node.nodeValue, match = old.match(/^(\s*)(.*?)(\s*)$/s);
    if (match && Object.prototype.hasOwnProperty.call(words, match[2])) {
      const result = match[1] + words[match[2]] + match[3];
      if (old !== result) node.nodeValue = result;
    }
  }
  const elements = root.querySelectorAll('input[placeholder], [title], [aria-label]');
  for (const element of elements) for (const key of ['placeholder','title','aria-label']) {
    const old = element.getAttribute(key);
    if (old && Object.prototype.hasOwnProperty.call(words, old)) element.setAttribute(key, words[old]);
  }
}
function install(root) {
  if (!root || !greek()) return;
  translate(root);
  const observer = new MutationObserver(() => translate(root));
  observer.observe(root, {subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['title','placeholder','aria-label']});
  return observer;
}
module.exports = {install, translate, words, greek};
