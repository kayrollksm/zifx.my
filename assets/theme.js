// assets/theme.js
(function(){
  const themeButtons = document.querySelectorAll('[data-theme]');
  const fontButtons = document.querySelectorAll('[data-font]');
  const body = document.body;

  // load saved
  const savedTheme = localStorage.getItem('zifx_theme') || 'a';
  const savedFont = localStorage.getItem('zifx_font') || 'poppins';

  function applyTheme(name){
    // remove theme classes
    body.classList.remove('theme-b','theme-c');
    if(name === 'b') body.classList.add('theme-b');
    if(name === 'c') body.classList.add('theme-c');
    // update active state
    themeButtons.forEach(b=> b.classList.toggle('active', b.dataset.theme === name));
    localStorage.setItem('zifx_theme', name);
  }

  function applyFont(name){
    // set font family on root
    let fam = getComputedStyle(document.documentElement).getPropertyValue('--font-sans');
    if(name === 'poppins') fam = 'Poppins, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial';
    if(name === 'inter') fam = 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial';
    if(name === 'playfair') fam = '"Playfair Display", Georgia, serif';

    document.documentElement.style.setProperty('--font-sans', fam);
    fontButtons.forEach(b=> b.classList.toggle('active', b.dataset.font === name));
    localStorage.setItem('zifx_font', name);
  }

  // wire buttons
  themeButtons.forEach(btn => {
    btn.addEventListener('click', ()=> applyTheme(btn.dataset.theme));
  });

  fontButtons.forEach(btn => {
    btn.addEventListener('click', ()=> applyFont(btn.dataset.font));
  });

  // init
  applyTheme(savedTheme);
  applyFont(savedFont);

  // quick accessibility: keyboard shortcuts
  window.addEventListener('keydown', (e)=>{
    if(e.altKey && e.key === '1') applyTheme('a');
    if(e.altKey && e.key === '2') applyTheme('b');
    if(e.altKey && e.key === '3') applyTheme('c');
  });
})();