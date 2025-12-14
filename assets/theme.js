(function () {
  const themeBtns = document.querySelectorAll('[data-theme]');
  const fontBtns = document.querySelectorAll('[data-font]');

  const LS_THEME = 'zifx_theme';
  const LS_FONT = 'zifx_font';

  const savedTheme = localStorage.getItem(LS_THEME) || 'a';
  const savedFont = localStorage.getItem(LS_FONT) || 'poppins';

  applyTheme(savedTheme);
  applyFont(savedFont);

  themeBtns.forEach(btn => {
    btn.onclick = () => {
      applyTheme(btn.dataset.theme);
      localStorage.setItem(LS_THEME, btn.dataset.theme);
    };
  });

  fontBtns.forEach(btn => {
    btn.onclick = () => {
      applyFont(btn.dataset.font);
      localStorage.setItem(LS_FONT, btn.dataset.font);
    };
  });

  function applyTheme(t) {
    document.body.className = document.body.className.replace(/theme-\w/g, '');
    document.body.classList.add(`theme-${t}`);
  }

  function applyFont(f) {
    document.body.setAttribute('data-font', f);
  }
})();