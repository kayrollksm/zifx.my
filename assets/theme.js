(function(){
  const themeButtons = document.querySelectorAll('[data-theme]');
  const fontButtons = document.querySelectorAll('[data-font]');
  const root = document.documentElement;

  const THEMES = { a: 'theme-a', b: 'theme-b', c: 'theme-c' };
  const FONTS = {
    poppins: `"Poppins", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial`,
    inter: `"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial`,
    playfair: `"Playfair Display", "Georgia", serif`
  };

  function applyTheme(key){
    Object.values(THEMES).forEach(cls => root.classList.remove(cls));
    const cls = THEMES[key] || THEMES.b;
    root.classList.add(cls);
    localStorage.setItem('zifx-theme', key);
    themeButtons.forEach(b => b.classList.toggle('active', b.dataset.theme === key));
  }

  function applyFont(key){
    const val = FONTS[key] || FONTS.poppins;
    root.style.setProperty('--font-family', val);
    localStorage.setItem('zifx-font', key);
    fontButtons.forEach(b => b.classList.toggle('active', b.dataset.font === key));
  }

  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
  });
  fontButtons.forEach(btn => {
    btn.addEventListener('click', () => applyFont(btn.dataset.font));
  });

  const savedTheme = localStorage.getItem('zifx-theme') || 'b';
  const savedFont  = localStorage.getItem('zifx-font') || 'poppins';
  applyTheme(savedTheme);
  applyFont(savedFont);

})();
