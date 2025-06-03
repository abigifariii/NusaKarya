//navbar
const body = document.body;
let lastScroll = 0;

window.addEventListener("scroll", function () {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    body.classList.remove("scroll-up");
  }

  if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-up");
    body.classList.add("scroll-down");
  }

  if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-down");
    body.classList.add("scroll-up");
  }

  lastScroll = currentScroll;
});

// hamburger
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const authButtons = document.querySelector(".auth-buttons");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    authButtons.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      authButtons.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });
});
