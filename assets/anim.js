// assets/anim.js
(() => {
  // small helpers
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  // ripple effect
  function addRipple(e) {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const span = document.createElement('span');
    span.className = 'ripple';
    const size = Math.max(rect.width, rect.height) * 0.9;
    span.style.width = span.style.height = `${size}px`;
    span.style.left = `${e.clientX - rect.left - size/2}px`;
    span.style.top = `${e.clientY - rect.top - size/2}px`;
    btn.appendChild(span);
    span.addEventListener('animationend', () => span.remove());
  }

  // reveal using IntersectionObserver with optional stagger
  function initReveal() {
    const revealEls = Array.from(document.querySelectorAll('.reveal'));
    if (!revealEls.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          // if container has children that are grid items, stagger them
          if (el.dataset && el.dataset.stagger === 'true') {
            const items = Array.from(el.children);
            items.forEach((it, i) => {
              it.style.transitionDelay = `${i * 80}ms`;
              it.classList.add('is-visible');
            });
          } else {
            el.classList.add('is-visible');
          }
          io.unobserve(el);
        }
      });
    }, { threshold: 0.18 });

    revealEls.forEach(el => io.observe(el));
  }

  // small parallax: move hero-bg slightly based on cursor or tilt
  function initParallax() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;
    // For pointer devices
    window.addEventListener('pointermove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 18; // -9 .. 9
      const y = (e.clientY / window.innerHeight - 0.5) * 10; // -5 .. 5
      heroBg.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }, { passive: true });

    // small slow beat for mobile (no pointer)
    let t = 0;
    setInterval(() => {
      t += 0.018;
      const bx = Math.sin(t) * 6;
      const by = Math.cos(t*0.6) * 3;
      if (!('onpointermove' in window)) heroBg.style.transform = `translate3d(${bx}px, ${by}px,0)`;
    }, 140);
  }

  // logo + hero initial sequence
  function initialSequence() {
    const heroTitle = document.querySelector('.hero h1');
    const heroText  = document.querySelector('.hero p');
    const heroCard  = document.querySelector('.hero-card');
    const brand     = document.querySelector('.brand');

    // brand slide in
    setTimeout(() => brand && brand.classList.add('is-visible'), 90);
    setTimeout(() => heroTitle && heroTitle.classList.add('is-visible'), 180);
    setTimeout(() => heroText && heroText.classList.add('is-visible'), 320);
    setTimeout(() => {
      if (heroCard) {
        heroCard.classList.add('is-visible', 'floating');
      }
    }, 480);
  }

  // attach ripple to buttons & micro-interaction for theme buttons
  function initButtons() {
    $$('.btn').forEach(b => {
      b.addEventListener('click', addRipple);
    });

    // micro interaction for theme/font buttons if they exist
    $$('.btn[data-theme], .btn[data-font]').forEach(b => {
      b.addEventListener('click', () => {
        // add small press animation
        b.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-4px)' }, { transform: 'translateY(0)' }], { duration: 240, easing: 'ease-out' });
      });
    });
  }

  // stagger reveal for grid cards (if user put data-stagger="true" on wrapper)
  function autoStaggerChildren() {
    // If there are grids with .grid and children .card:
    const grids = document.querySelectorAll('.grid');
    grids.forEach(g => {
      // mark only if children exists
      if (g.children.length > 0) {
        g.setAttribute('data-stagger', 'true');
        // set each child to reveal class (if not already)
        Array.from(g.children).forEach(child => {
          if (!child.classList.contains('reveal')) child.classList.add('reveal');
        });
      }
    });
  }

  // init all
  window.addEventListener('DOMContentLoaded', () => {
    initialSequence();
    initReveal();
    initParallax();
    initButtons();
    autoStaggerChildren();
  });
})();