const images = document.querySelectorAll(".slides img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const pagination = document.querySelector(".pagination");
const carousel = document.querySelector(".carousel");

let index = 5;
const total = images.length;

// Générer pagination
for (let i = 0; i < total; i++) {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    pagination.appendChild(dot);

    dot.addEventListener("click", () => {
        index = i;
        updateCarousel();
    });
}

const dots = document.querySelectorAll(".pagination span");

function updateCarousel() {
    images.forEach((img, i) => {
        const diff = i - index;

        if (i === index) {
            img.style.transform = "translate(-50%, -50%) scale(1.3)";
            img.style.opacity = "1";
            img.style.zIndex = "5";
        }
        else if (Math.abs(diff) === 1) {
            img.style.transform =
                `translate(calc(-50% + ${diff * 140}px), -50%) 
                 scale(0.9) rotateY(${diff * -35}deg)`;
            img.style.opacity = "0.6";
            img.style.zIndex = "3";
        }
        else {
            img.style.transform =
                `translate(calc(-50% + ${diff * 220}px), -50%) 
                 scale(0.6) rotateY(${diff * -50}deg)`;
            img.style.opacity = "0.2";
            img.style.zIndex = "1";
        }
    });

    dots.forEach((d, i) =>
        i === index ? d.classList.add("active") : d.classList.remove("active")
    );
}

// Boutons
prevBtn.onclick = () => {
    index = (index - 1 + total) % total;
    updateCarousel();
};

nextBtn.onclick = () => {
    index = (index + 1) % total;
    updateCarousel();
};

// Navigation clavier
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevBtn.onclick();
    if (e.key === "ArrowRight") nextBtn.onclick();
});

// =====================
// SWIPE TACTILE + SOURIS
// =====================

let startX = 0;
let isDragging = false;

// Touch (mobile)
carousel.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    isDragging = true;
}, { passive: true });

carousel.addEventListener("touchend", e => {
    if (!isDragging) return;

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
        diff > 0 ? nextBtn.onclick() : prevBtn.onclick();
    }

    isDragging = false;
}, { passive: true });

// Souris (PC)
carousel.addEventListener("mousedown", e => {
    startX = e.clientX;
    isDragging = true;
});

carousel.addEventListener("mouseup", e => {
    if (!isDragging) return;

    const diff = startX - e.clientX;
    if (Math.abs(diff) > 60) {
        diff > 0 ? nextBtn.onclick() : prevBtn.onclick();
    }

    isDragging = false;
});

// Init
updateCarousel();




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

