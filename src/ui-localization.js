// Atom 2.0: non-destructive translation of bundled package UI.
// Keep identifiers, code editors and input values unchanged.
'use strict';

const el = {
  'Project': 'Έργο',
  'Your project is currently empty': 'Το έργο είναι προς το παρόν κενό',
  'Add folders': 'Προσθήκη φακέλων',
  'Reopen a project': 'Επανάνοιγμα έργου',
  'Welcome Guide': 'Οδηγός καλωσορίσματος',
  'Sunsetting Atom': 'Το μέλλον του Ατόμου',
  'untitled': 'χωρίς τίτλο',
  'Find in Buffer': 'Εύρεση στο τρέχον αρχείο',
  'Replace in Buffer': 'Αντικατάσταση στο τρέχον αρχείο',
  'Select Next': 'Επιλογή επόμενου',
  'Toggle Find in Buffer': 'Εναλλαγή εύρεσης στο αρχείο',
  'Find in Project': 'Εύρεση στο έργο',
  'Toggle Find in Project': 'Εναλλαγή εύρεσης στο έργο',
  'Find All': 'Εύρεση όλων',
  'Find Next': 'Εύρεση επόμενου',
  'Find Previous': 'Εύρεση προηγούμενου',
  'Replace Next': 'Αντικατάσταση επόμενου',
  'Replace All': 'Αντικατάσταση όλων',
  'Clear History': 'Εκκαθάριση ιστορικού',
  'Find Buffer': 'Εύρεση ανοιχτού αρχείου',
  'Find File': 'Εύρεση αρχείου',
  'Find Modified File': 'Εύρεση τροποποιημένου αρχείου',
  'Select Inside Brackets': 'Επιλογή μέσα στις αγκύλες',
  'Toggle Command Palette': 'Εναλλαγή παλέτας εντολών',
  'Toggle Git Tab': 'Εναλλαγή καρτέλας Git',
  'Toggle GitHub Tab': 'Εναλλαγή καρτέλας GitHub',
  'Open Reviews Tab': 'Άνοιγμα καρτέλας αξιολογήσεων',
  'Toggle Tree View': 'Εναλλαγή δέντρου αρχείων',
  'Reflow Selection': 'Αναδιάταξη επιλεγμένου κειμένου',
  'Bookmark': 'Σελιδοδείκτης',
  'Select Encoding': 'Επιλογή κωδικοποίησης',
  'Go to Line': 'Μετάβαση σε γραμμή',
  'Select Grammar': 'Επιλογή σύνταξης',
  'Close All Tabs': 'Κλείσιμο όλων των καρτελών',
  'Show Tab Bar': 'Εμφάνιση γραμμής καρτελών',
  'Show All Tabs': 'Εμφάνιση όλων των καρτελών',
  'Settings': 'Ρυθμίσεις',
  'Open Config Folder': 'Άνοιγμα φακέλου ρυθμίσεων',
  'Install Packages': 'Εγκατάσταση πακέτων',
  'Installed Packages': 'Εγκατεστημένα πακέτα',
  'Themes': 'Θέματα',
  'Updates': 'Ενημερώσεις',
  'Keybindings': 'Συντομεύσεις πληκτρολογίου',
  'Search': 'Αναζήτηση',
  'Loading...': 'Φόρτωση…'
};

function greekLocale() {
  const value = (typeof navigator !== 'undefined' && navigator.language) || 'en';
  return /^el(?:[-_]|$)/i.test(value);
}
function excluded(node) {
  const parent = node.nodeType === 3 ? node.parentElement : node;
  return !parent || !!parent.closest('atom-text-editor, .editor, .text-editor, [contenteditable], input, textarea, code, pre, script, style, .terminal, .xterm');
}
function translate(root) {
  if (!greekLocale() || !root) return;
  const doc = root.ownerDocument || document;
  const walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    if (excluded(node)) continue;
    const match = /^(\s*)(.*?)(\s*)$/s.exec(node.nodeValue);
    if (match && Object.prototype.hasOwnProperty.call(el, match[2])) {
      node.nodeValue = match[1] + el[match[2]] + match[3];
    }
  }
  if (root.querySelectorAll) {
    for (const element of root.querySelectorAll('[title], [placeholder], [aria-label]')) {
      if (excluded(element)) continue;
      for (const key of ['title', 'placeholder', 'aria-label']) {
        const original = element.getAttribute(key);
        if (Object.prototype.hasOwnProperty.call(el, original)) element.setAttribute(key, el[original]);
      }
    }
  }
}
function install() {
  if (!greekLocale() || typeof document === 'undefined' || !document.body) return;
  translate(document.body);
  const observer = new MutationObserver(() => translate(document.body));
  observer.observe(document.body, {subtree:true, childList:true, characterData:true, attributes:true, attributeFilter:['title','placeholder','aria-label']});
  return observer;
}
module.exports = {install, translate, el};
