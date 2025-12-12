// assets/theme.js
(function(){
  const root = document.body;
  const themeButtons = document.querySelectorAll('[data-theme]');
  const fontButtons = document.querySelectorAll('[data-font]');
  const cards = document.querySelectorAll('.animate-card');

  const LS_THEME = 'zifx_theme';
  const LS_FONT = 'zifx_font';

  // load saved
  const savedTheme = localStorage.getItem(LS_THEME) || 'a';
  const savedFont = localStorage.getItem(LS_FONT) || 'poppins';

  // apply initial
  applyTheme(savedTheme);
  applyFont(savedFont);

  // buttons
  themeButtons.forEach(btn=>{
    btn.addEventListener('click', ()=> {
      const t = btn.getAttribute('data-theme');
      applyTheme(t);
      localStorage.setItem(LS_THEME, t);
    });
  });

  fontButtons.forEach(btn=>{
    btn.addEventListener('click', ()=> {
      const f = btn.getAttribute('data-font');
      applyFont(f);
      localStorage.setItem(LS_FONT, f);
    });
  });

  function applyTheme(t){
    // remove classes then set body class
    document.body.classList.remove('theme-a','theme-b','theme-c');
    document.body.classList.add('theme-'+(t||'a'));
    // set aria-pressed and active class
    themeButtons.forEach(b=>{
      const is = b.getAttribute('data-theme')===t;
      b.setAttribute('aria-pressed', is ? 'true' : 'false');
      b.classList.toggle('active', is);
    });
  }

  function applyFont(f){
    document.body.setAttribute('data-font', f);
    fontButtons.forEach(b=>{
      const is = b.getAttribute('data-font')===f;
      b.classList.toggle('active', is);
    });
  }

  // reveal animation for cards on load + on scroll
  function revealCards(){
    cards.forEach((c,i)=>{
      const rect = c.getBoundingClientRect();
      if(rect.top < window.innerHeight - 80){
        setTimeout(()=> c.classList.add('show'), i*80);
      }
    });
  }
  window.addEventListener('load', revealCards);
  window.addEventListener('scroll', revealCards);

})();