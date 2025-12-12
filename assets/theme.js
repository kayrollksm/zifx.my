// assets/theme.js (replace existing)
(function(){
  const LS_THEME = 'zifx_theme';
  const LS_FONT  = 'zifx_font';

  const themeButtons = Array.from(document.querySelectorAll('[data-theme]'));
  const fontButtons  = Array.from(document.querySelectorAll('[data-font]'));
  const cards        = document.querySelectorAll('.animate-card');

  // safe default
  const DEFAULT_THEME = 'a';
  const DEFAULT_FONT  = 'poppins';

  // read saved or fallback
  const savedTheme = localStorage.getItem(LS_THEME) || DEFAULT_THEME;
  const savedFont  = localStorage.getItem(LS_FONT)  || DEFAULT_FONT;

  // apply initial values
  applyTheme(savedTheme, {persist:false});
  applyFont(savedFont, {persist:false});

  // attach listeners
  themeButtons.forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const t = btn.getAttribute('data-theme');
      if(!t) return;
      applyTheme(t, {persist:true});
    });
  });

  fontButtons.forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const f = btn.getAttribute('data-font');
      if(!f) return;
      applyFont(f, {persist:true});
    });
  });

  // apply theme function
  function applyTheme(t, opts = {persist:true}){
    const theme = (t || DEFAULT_THEME).toString();

    // remove any theme-xxx classes (safer than removing specific ones)
    document.body.className = document.body.className
      .split(/\s+/)
      .filter(c => !/^theme-/.test(c))
      .join(' ')
      .trim();

    // add new theme class
    document.body.classList.add('theme-' + theme);

    // also set data-theme attribute for CSS fallback / debugging
    document.body.setAttribute('data-theme', theme);

    // update buttons aria-pressed / active
    themeButtons.forEach(b=>{
      const is = b.getAttribute('data-theme') === theme;
      b.setAttribute('aria-pressed', is ? 'true' : 'false');
      b.classList.toggle('active', is);
    });

    if(opts.persist !== false){
      localStorage.setItem(LS_THEME, theme);
    }

    console.log('[theme] applied:', theme);
  }

  // apply font function
  function applyFont(f, opts = {persist:true}){
    const font = (f || DEFAULT_FONT).toString();
    document.body.setAttribute('data-font', font);

    fontButtons.forEach(b=>{
      const is = b.getAttribute('data-font') === font;
      b.classList.toggle('active', is);
    });

    if(opts.persist !== false){
      localStorage.setItem(LS_FONT, font);
    }

    console.log('[font] applied:', font);
  }

  // reveal animation for cards on load + scroll
  function revealCards(){
    cards.forEach((c,i)=>{
      const rect = c.getBoundingClientRect();
      if(rect.top < window.innerHeight - 80){
        setTimeout(()=> c.classList.add('show'), i*80);
      }
    });
  }
  window.addEventListener('load', revealCards, {passive:true});
  window.addEventListener('scroll', revealCards, {passive:true});

})();