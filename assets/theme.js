// assets/theme.js
(() => {
  const themeBtns = document.querySelectorAll('.theme-btn');
  const fontBtns  = document.querySelectorAll('.font-btn');

  // fallback defaults
  const DEFAULT_THEME = 'a';
  const DEFAULT_FONT  = 'poppins';

  const savedTheme = localStorage.getItem('zifx-theme') || DEFAULT_THEME;
  const savedFont  = localStorage.getItem('zifx-font')  || DEFAULT_FONT;

  // apply initial
  applyTheme(savedTheme);
  applyFont(savedFont);
  setActiveButtons();

  // listen
  themeBtns.forEach(b => b.addEventListener('click', () => {
    const t = b.dataset.theme;
    if (!t) return;
    applyTheme(t);
    localStorage.setItem('zifx-theme', t);
    setActiveButtons();
  }));

  fontBtns.forEach(b => b.addEventListener('click', () => {
    const f = b.dataset.font;
    if (!f) return;
    applyFont(f);
    localStorage.setItem('zifx-font', f);
    setActiveButtons();
  }));

  // FUNCTIONS
  function applyTheme(name) {
    // remove all theme classes first
    document.body.classList.remove('theme-a', 'theme-b', 'theme-c');

    // add the one we want
    if (name === 'b') document.body.classList.add('theme-b');
    else if (name === 'c') document.body.classList.add('theme-c');
    else document.body.classList.add('theme-a'); // default A
  }

  function applyFont(name) {
    // set an attribute used by CSS to switch fonts
    document.body.setAttribute('data-font', name);
    // also set documentElement style fallback (not necessary but helps some browsers)
    // (no inline font-face; rely on Google Fonts link in HTML)
  }

  function setActiveButtons(){
    const curTheme = localStorage.getItem('zifx-theme') || DEFAULT_THEME;
    const curFont  = localStorage.getItem('zifx-font')  || DEFAULT_FONT;

    themeBtns.forEach(b => {
      b.classList.toggle('active', b.dataset.theme === curTheme);
      // aria
      b.setAttribute('aria-pressed', (b.dataset.theme === curTheme).toString());
    });

    fontBtns.forEach(b => {
      b.classList.toggle('active', b.dataset.font === curFont);
      b.setAttribute('aria-pressed', (b.dataset.font === curFont).toString());
    });
  }

  // ensure highlight after page fully loads (safety)
  window.addEventListener('load', setActiveButtons);
})();