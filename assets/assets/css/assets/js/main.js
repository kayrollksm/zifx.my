// main.js - small helpers
document.addEventListener('DOMContentLoaded',function(){
  // mobile nav toggle (if you add a burger later)
  const burger = document.querySelector('.burger');
  if(burger){
    const nav = document.querySelector('nav');
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }
});
