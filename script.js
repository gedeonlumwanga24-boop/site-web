const cards = document.querySelectorAll(".card");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.querySelector(".dots");

let index = 2; // centre

// Create dots
cards.forEach((_, i) => {
    const dot = document.createElement("div");
    if (i === index) dot.classList.add("active-dot");
    dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll(".dots div");

function updateCarousel() {
    cards.forEach((card, i) => {
        card.className = "card"; // reset

        if (i === index) card.classList.add("active");
        else if (i === index - 1 || i === index + 1) card.classList.add("side");
        else card.classList.add("far");

        dots.forEach(d => d.classList.remove("active-dot"));
        dots[index].classList.add("active-dot");
    });
}

nextBtn.onclick = () => {
    index = (index + 1) % cards.length;
    updateCarousel();
};

prevBtn.onclick = () => {
    index = (index - 1 + cards.length) % cards.length;
    updateCarousel();
};

updateCarousel();

// Navigation au clavier
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevBtn.onclick();
    if (e.key === "ArrowRight") nextBtn.onclick();
});

// Hamburger
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

