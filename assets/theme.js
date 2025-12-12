// theme.js - simple theme & font switcher with persistence
(function(){
  const body = document.body;
  const themeBtns = document.querySelectorAll('[data-theme]');
  const fontBtns = document.querySelectorAll('[data-font]');

  // load saved
  const savedTheme = localStorage.getItem('zifx_theme') || 'a';
  const savedFont = localStorage.getItem('zifx_font') || 'poppins';

  // apply
  body.setAttribute('data-theme', savedTheme);
  body.setAttribute('data-font', savedFont);
  markActive();

  // click handlers
  themeBtns.forEach(b => b.addEventListener('click', e => {
    const t = b.dataset.theme;
    body.setAttribute('data-theme', t);
    localStorage.setItem('zifx_theme', t);
    markActive();
  }));

  fontBtns.forEach(b => b.addEventListener('click', e => {
    const f = b.dataset.font;
    body.setAttribute('data-font', f);
    localStorage.setItem('zifx_font', f);
    markActive();
  }));

  function markActive(){
    // theme
    themeBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === body.getAttribute('data-theme'));
    });
    // font
    fontBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.font === body.getAttribute('data-font'));
    });
  }

  // small: animate nav-cta when in view on load
  window.addEventListener('load', () => {
    const cta = document.querySelector('.nav-cta');
    if(cta) cta.animate([{transform:'translateY(6px)'},{transform:'translateY(0)'}],{duration:700,fill:'forwards',easing:'cubic-bezier(.2,.9,.3,1)'});
  });
})();