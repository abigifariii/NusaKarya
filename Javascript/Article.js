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

document.querySelectorAll(".social-media img").forEach((icon) => {
  icon.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)";
    this.style.transition = "transform 0.3s ease";
  });

  icon.addEventListener("mouseleave", function () {
    this.style.transform = "";
  });
});

const scrollToTopButton = document.createElement("button");
scrollToTopButton.innerHTML = "↑";
scrollToTopButton.className = "scroll-to-top";
scrollToTopButton.style.display = "none";
scrollToTopButton.style.position = "fixed";
scrollToTopButton.style.bottom = "20px";
scrollToTopButton.style.right = "20px";
scrollToTopButton.style.zIndex = "99";
scrollToTopButton.style.border = "none";
scrollToTopButton.style.outline = "none";
scrollToTopButton.style.backgroundColor = "#7b3b20";
scrollToTopButton.style.color = "white";
scrollToTopButton.style.cursor = "pointer";
scrollToTopButton.style.padding = "15px";
scrollToTopButton.style.borderRadius = "50%";
scrollToTopButton.style.fontSize = "18px";
scrollToTopButton.style.transition = "all 0.3s ease";

document.body.appendChild(scrollToTopButton);

scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
});

// Fitur Pencarian Artikel
document.addEventListener("DOMContentLoaded", function () {
  if (!document.querySelector(".search-container")) {
    const searchContainer = document.createElement("div");
    searchContainer.className = "search-container";
    searchContainer.style.margin = "20px auto";
    searchContainer.style.maxWidth = "600px";
    searchContainer.style.padding = "0 5%";

    searchContainer.innerHTML = `
            <input type="text" id="article-search" placeholder="Cari artikel..." 
                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
        `;

    const articlesSection = document.querySelector(".articles");
    articlesSection.insertBefore(searchContainer, articlesSection.firstChild);

    // Fungsi pencarian
    const searchInput = document.getElementById("article-search");
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      document.querySelectorAll(".article-card").forEach((card) => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const content = card.querySelector(".author").textContent.toLowerCase();

        if (title.includes(searchTerm) || content.includes(searchTerm)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }
});

document.querySelectorAll(".footer-section ul li a").forEach((link) => {
  link.addEventListener("mouseenter", function () {
    this.style.transform = "translateX(5px)";
    this.style.transition = "transform 0.3s ease";
  });

  link.addEventListener("mouseleave", function () {
    this.style.transform = "";
  });
});
