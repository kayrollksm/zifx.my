// theme.js
(function(){
  const themeButtons = document.querySelectorAll('.theme-btn');
  const fontButtons = document.querySelectorAll('.font-btn');

  // read saved
  const savedTheme = localStorage.getItem('zifx-theme') || 'a';
  const savedFont = localStorage.getItem('zifx-font') || 'poppins';

  // apply initial
  applyTheme(savedTheme);
  applyFont(savedFont);
  highlightButtons();

  // listeners
  themeButtons.forEach(btn => btn.addEventListener('click', () => {
    const t = btn.dataset.theme;
    applyTheme(t);
    localStorage.setItem('zifx-theme', t);
    highlightButtons();
  }));

  fontButtons.forEach(btn => btn.addEventListener('click', () => {
    const f = btn.dataset.font;
    applyFont(f);
    localStorage.setItem('zifx-font', f);
    highlightButtons();
  }));

  function applyTheme(name){
    document.body.classList.remove('theme-a','theme-b','theme-c');
    if(name === 'b') document.body.classList.add('theme-b');
    else if(name === 'c') document.body.classList.add('theme-c');
    else document.body.classList.add('theme-a');
  }

  function applyFont(name){
    document.body.setAttribute('data-font', name);
  }

  function highlightButtons(){
    const currentTheme = localStorage.getItem('zifx-theme') || savedTheme;
    const currentFont  = localStorage.getItem('zifx-font')  || savedFont;

    themeButtons.forEach(b=>{
      b.classList.toggle('active', b.dataset.theme === currentTheme);
    });
    fontButtons.forEach(b=>{
      b.classList.toggle('active', b.dataset.font === currentFont);
    });
  }

  // make sure buttons are highlighted at load
  window.addEventListener('load', highlightButtons);
})();