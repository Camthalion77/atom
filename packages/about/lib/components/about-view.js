const { Disposable } = require('atom');
const etch = require('etch');
const AtomLogo = require('./atom-logo');
const EtchComponent = require('../etch-component');
const $ = etch.dom;

function greek() {
  const locale = (typeof navigator !== 'undefined' && navigator.language) || 'en';
  return /^el(?:[-_]|$)/i.test(locale);
}

function label(el, en) {
  return greek() ? el : en;
}

module.exports = class AboutView extends EtchComponent {
  copyVersion() {
    atom.clipboard.write(this.props.currentAtomVersion);
  }

  openLicense() {
    atom.commands.dispatch(atom.views.getView(atom.workspace), 'application:open-license');
  }

  render() {
    return $.div(
      { className: 'pane-item native-key-bindings about' },
      $.div(
        { className: 'about-container' },
        $.header(
          { className: 'about-header' },
          $(AtomLogo),
          $.div({ className: 'about-header-info' },
            $.h2({}, label('Άτομο', 'Atom')),
            $.span({
              className: 'about-version-container inline-block atom',
              onclick: this.copyVersion.bind(this)
            }, ` ${this.props.currentAtomVersion} ${process.arch} `,
               $.span({ className: 'icon icon-clippy about-copy-version' }))
          ),
          $.div({ className: 'about-more-info' },
            $.div({}, `Electron: ${this.props.currentElectronVersion}`),
            $.div({}, `Chromium: ${this.props.currentChromeVersion}`),
            $.div({}, `Node.js: ${this.props.currentNodeVersion}`)
          )
        ),
        $.div({ className: 'about-actions group-item' },
          $.div({ className: 'about-updates-box' },
            $.span({ className: 'icon icon-info' },
              label(
                'Οι αυτόματες ενημερώσεις του παλιού Atom είναι απενεργοποιημένες σε αυτή την έκδοση.',
                'The original Atom automatic updates are disabled in this edition.'
              )
            )
          ),
          $.button({ className: 'btn view-license', onclick: this.openLicense.bind(this) },
            label('Άδεια χρήσης', 'License'))
        ),
        $.div({ className: 'about-credits group-item' },
          $.span({}, label(
            'Βασίζεται στο έργο ανοιχτού κώδικα Atom και στους συνεισφέροντές του.',
            'Based on the open-source Atom project and its contributors.'
          )),
          $.a({ href: 'https://github.com/atom/atom/contributors' },
            ' Atom contributors')
        )
      )
    );
  }

  serialize() {
    return { deserializer: this.constructor.name, uri: this.props.uri };
  }

  onDidChangeTitle() { return new Disposable(); }
  onDidChangeModified() { return new Disposable(); }
  getTitle() { return label('Πληροφορίες', 'About'); }
  getIconName() { return 'info'; }
};
