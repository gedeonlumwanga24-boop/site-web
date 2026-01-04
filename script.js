document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");
  const overlay = document.getElementById("overlay");
  const body = document.body;

  function openMenu() {
    menuBtn.classList.add("active");
    menu.classList.add("active");
    overlay.classList.add("active");
    body.style.overflow = "hidden";
  }

  function closeMenu() {
    menuBtn.classList.remove("active");
    menu.classList.remove("active");
    overlay.classList.remove("active");

    // laisse le temps à l'animation
    setTimeout(() => {
      document.body.style.overflow = "";
    }, 400);
  }

  // Bouton hamburger
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // empêche le clic global
    if (menu.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Empêche la fermeture quand on clique DANS le menu
  menu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // 🔥 CLIC PARTOUT AILLEURS → FERMETURE
  document.addEventListener("click", () => {
    if (menu.classList.contains("active")) {
      closeMenu();
    }
  });
});

// MODE SOMBRE ET CLAIR
const toggleBtn = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
  const theme = document.documentElement.getAttribute("data-theme");

  if (theme === "dark") {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀️";
  }
});

if (!localStorage.getItem("theme")) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDark) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
}


