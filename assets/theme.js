document.addEventListener('DOMContentLoaded', function(){
  const themeButtons = document.querySelectorAll('[data-theme]');
  const fontButtons = document.querySelectorAll('[data-font]');
  const cards = document.querySelectorAll('.animate-card');

  const LS_THEME = 'zifx_theme';
  const LS_FONT = 'zifx_font';

  // load saved values
  const savedTheme = localStorage.getItem(LS_THEME) || 'a';
  const savedFont = localStorage.getItem(LS_FONT) || 'poppins';

  applyTheme(savedTheme);
  applyFont(savedFont);

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
    document.body.classList.remove('theme-a','theme-b','theme-c');
    document.body.classList.add('theme-'+(t||'a'));

    // update aria pressed and active class
    themeButtons.forEach(b=>{
      const is = b.getAttribute('data-theme')===t;
      b.setAttribute('aria-pressed', is ? 'true' : 'false');
      b.classList.toggle('active', is);
    });
  }

  function applyFont(f){
    document.body.setAttribute('data-font', f);
    fontButtons.forEach(b=>{
      b.classList.toggle('active', b.getAttribute('data-font')===f);
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
  // also reveal once now (in case already visible)
  revealCards();
});