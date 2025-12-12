// assets/theme.js
(() => {
  const themeBtns = document.querySelectorAll('[data-theme]');
  const fontBtns  = document.querySelectorAll('[data-font]');

  const DEFAULT_THEME = 'a';
  const DEFAULT_FONT  = 'poppins';

  const savedTheme = localStorage.getItem('zifx-theme') || DEFAULT_THEME;
  const savedFont  = localStorage.getItem('zifx-font')  || DEFAULT_FONT;

  applyTheme(savedTheme);
  applyFont(savedFont);
  highlightActive();

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const t = btn.dataset.theme;
      applyTheme(t);
      localStorage.setItem('zifx-theme', t);
      highlightActive();
    });
  });

  fontBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.font;
      applyFont(f);
      localStorage.setItem('zifx-font', f);
      highlightActive();
    });
  });

  function applyTheme(name) {
    document.body.classList.remove('theme-a','theme-b','theme-c');
    document.body.classList.add(`theme-${name}`);
  }

  function applyFont(name) {
    // ❤️ INI YANG PENTING
    document.body.setAttribute("data-font", name);
  }

  function highlightActive() {
    const curTheme = localStorage.getItem('zifx-theme') || DEFAULT_THEME;
    const curFont  = localStorage.getItem('zifx-font')  || DEFAULT_FONT;

    themeBtns.forEach(b => b.classList.toggle('active', b.dataset.theme === curTheme));
    fontBtns.forEach(b => b.classList.toggle('active', b.dataset.font === curFont));
  }
})();

// theme.js - add this to bottom of the file
(() => {
  const themeButtons = document.querySelectorAll('.btn[data-theme]');
  const fontButtons  = document.querySelectorAll('.btn[data-font]');

  function setActive(list, clicked) {
    list.forEach(b => b.classList.toggle('active', b === clicked));
  }

  themeButtons.forEach(b => {
    b.addEventListener('click', () => setActive(themeButtons, b));
  });
  fontButtons.forEach(b => {
    b.addEventListener('click', () => setActive(fontButtons, b));
  });
})();

// assets/theme.js
(() => {
  const root = document.documentElement;

  function applyTheme(name) {
    document.body.classList.remove('body--theme-a','body--theme-b','body--theme-c');
    document.body.classList.add(`body--theme-${name}`);
    localStorage.setItem('zifx-theme', name);
  }

  function applyFont(name) {
    document.body.setAttribute('data-font', name);
    localStorage.setItem('zifx-font', name);
  }

  // restore saved prefs
  const savedTheme = localStorage.getItem('zifx-theme') || 'b';
  const savedFont = localStorage.getItem('zifx-font') || 'poppins';
  applyTheme(savedTheme);
  applyFont(savedFont);

  // wire up buttons
  document.addEventListener('click', (e) => {
    const t = e.target;
    if (t.matches('[data-theme]')) {
      applyTheme(t.getAttribute('data-theme'));
    } else if (t.matches('[data-font]')) {
      applyFont(t.getAttribute('data-font'));
    }
  });
})();