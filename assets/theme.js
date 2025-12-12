(function () {
  const body = document.body;
  const themeButtons = document.querySelectorAll("[data-theme]");
  const fontButtons = document.querySelectorAll("[data-font]");
  const cards = document.querySelectorAll(".animate-card");

  const LS_THEME = "zifx_theme";
  const LS_FONT = "zifx_font";

  // Load saved settings
  const savedTheme = localStorage.getItem(LS_THEME) || "a";
  const savedFont = localStorage.getItem(LS_FONT) || "poppins";

  applyTheme(savedTheme);
  applyFont(savedFont);

  // Theme buttons
  themeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const t = btn.dataset.theme;
      applyTheme(t);
      localStorage.setItem(LS_THEME, t);
    });
  });

  function applyTheme(t) {
    body.dataset.theme = t; // UPDATE HERE — FIXED
    themeButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.theme === t);
    });
  }

  // Font buttons
  fontButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const f = btn.dataset.font;
      applyFont(f);
      localStorage.setItem(LS_FONT, f);
    });
  });

  function applyFont(f) {
    body.dataset.font = f;
    fontButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.font === f);
    });
  }

  // Animate cards
  function revealCards() {
    cards.forEach((c, i) => {
      const rect = c.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        setTimeout(() => c.classList.add("show"), i * 100);
      }
    });
  }

  window.addEventListener("load", revealCards);
  window.addEventListener("scroll", revealCards);
})();