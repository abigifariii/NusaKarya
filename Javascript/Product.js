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

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchResults = document.createElement("div");
searchResults.className = "search-results";
document.querySelector(".search-box").appendChild(searchResults);

function collectProducts() {
  const productCards = document.querySelectorAll(".product-card");
  const products = [];

  productCards.forEach((card) => {
    const product = {
      name: card.querySelector(".product-name").textContent,
      brand: card.querySelector(".product-brand").textContent,
      price: card.querySelector(".product-price").textContent,
      rating: card.querySelector(".product-rating span").textContent,
      image: card.querySelector(".product-image img").src,
      element: card,
    };
    products.push(product);
  });

  return products;
}

const allProducts = collectProducts();

// Search functionality
function performSearch() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  if (searchTerm === "") {
    searchResults.style.display = "none";
    return;
  }

  const filteredProducts = allProducts.filter((product) => product.name.toLowerCase().includes(searchTerm) || product.brand.toLowerCase().includes(searchTerm));

  displaySearchResults(filteredProducts);
}

function displaySearchResults(results) {
  searchResults.innerHTML = "";

  if (results.length === 0) {
    searchResults.innerHTML = '<div class="no-results">Produk tidak ditemukan</div>';
    searchResults.style.display = "block";
    return;
  }

  results.forEach((product) => {
    const resultItem = document.createElement("div");
    resultItem.className = "search-result-item";
    resultItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="search-result-info">
          <h4>${product.name}</h4>
          <p>${product.price}</p>
        </div>
      `;
    resultItem.addEventListener("click", () => {
      product.element.scrollIntoView({ behavior: "smooth", block: "center" });

      setTimeout(() => {
        product.element.style.boxShadow = "";
      }, 2000);

      searchResults.style.display = "none";
    });
    searchResults.appendChild(resultItem);
  });

  searchResults.style.display = "block";
}

searchInput.addEventListener("input", performSearch);
searchButton.addEventListener("click", performSearch);

searchInput.addEventListener("focus", () => {
  if (searchInput.value.trim() !== "") {
    performSearch();
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-box")) {
    searchResults.style.display = "none";
  }
});
