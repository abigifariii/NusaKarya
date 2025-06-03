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

document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("promoShown")) {
    const promoPopup = document.createElement("div");
    promoPopup.className = "promo-popup";
    promoPopup.innerHTML = `
            <div class="promo-content">
                <span class="close-promo">&times;</span>
                <img src="../asset/knittshirt.png" alt="Promo Product" class="promo-image">
                <div class="promo-text">
                    <h3>Special Discount 80% OFF!</h3>
                    <p>Limited time offer for our best sellers</p>
                    <button class="promo-btn">Shop Now</button>
                </div>
            </div>
        `;

    document.body.appendChild(promoPopup);
    document.body.style.overflow = "hidden";

    const closeBtn = promoPopup.querySelector(".close-promo");
    closeBtn.addEventListener("click", function () {
      promoPopup.style.display = "none";
      document.body.style.overflow = "auto";
      localStorage.setItem("promoShown", "true");
    });

    const promoBtn = promoPopup.querySelector(".promo-btn");
    promoBtn.addEventListener("click", function () {
      window.location.href = "#";
      localStorage.setItem("promoShown", "true");
    });

    promoPopup.addEventListener("click", function (e) {
      if (e.target === promoPopup) {
        promoPopup.style.display = "none";
        document.body.style.overflow = "auto";
        localStorage.setItem("promoShown", "true");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let cart = {
    items: [],
    total: 0,
    count: 0,
  };

  const cartDropdown = document.querySelector(".cart-dropdown");
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartCount = document.querySelector(".cart-count");
  const cartTotal = document.querySelector(".cart-total");

  const sampleProducts = [
    {
      id: 1,
      name: "Kerajinan Hias Batik",
      price: 150000,
      image: "./asset/batik.png",
    },
    {
      id: 2,
      name: "Kemeja",
      price: 250000,
      image: "./asset/shirt.png",
    },
    {
      id: 3,
      name: "totebag",
      price: 120000,
      image: "./asset/totebagg.png",
    },
  ];

  function addToCart(productId, quantity = 1) {
    const product = sampleProducts.find((p) => p.id === productId);
    if (!product) return;

    const existingItem = cart.items.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
      });
    }

    updateCart();
  }

  function removeFromCart(productId) {
    cart.items = cart.items.filter((item) => item.id !== productId);
    updateCart();
  }

  function updateCart() {
    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cart.count = cart.items.reduce((count, item) => count + item.quantity, 0);

    cartCount.textContent = cart.count;

    cartTotal.textContent = `Rp${cart.total.toLocaleString()}`;
    if (cart.items.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-cart-message">Keranjang belanja kosong</p>';
    } else {
      cartItemsContainer.innerHTML = cart.items
        .map(
          (item) => `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-info">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">Rp${item.price.toLocaleString()} x ${item.quantity}</div>
          </div>
          <button class="cart-item-remove" aria-label="Remove item">&times;</button>
        </div>
      `
        )
        .join("");

      document.querySelectorAll(".cart-item-remove").forEach((button) => {
        button.addEventListener("click", function () {
          const itemId = parseInt(this.closest(".cart-item").dataset.id);
          removeFromCart(itemId);
        });
      });
    }
  }

  updateCart();

  addToCart(1);
  addToCart(2, 2);
});

document.addEventListener("DOMContentLoaded", function () {
  const promoImages = document.querySelectorAll(".promo-products img");

  const promoPopup = document.createElement("div");
  promoPopup.className = "promo-popup";
  promoPopup.style.display = "none";

  const promoContent = document.createElement("div");
  promoContent.className = "promo-content";

  const closePromo = document.createElement("span");
  closePromo.className = "close-promo";
  closePromo.innerHTML = "&times;";

  const promoImage = document.createElement("img");
  promoImage.className = "promo-image";

  const promoText = document.createElement("div");
  promoText.className = "promo-text";

  const promoTitle = document.createElement("h3");
  const promoDesc = document.createElement("p");
  const promoCode = document.createElement("p");
  promoCode.style.fontWeight = "bold";
  promoCode.style.margin = "1rem 0";

  const promoBtn = document.createElement("button");
  promoBtn.className = "promo-btn";
  promoBtn.textContent = "Lihat Produk";

  promoText.appendChild(promoTitle);
  promoText.appendChild(promoDesc);
  promoText.appendChild(promoCode);
  promoText.appendChild(promoBtn);

  promoContent.appendChild(closePromo);
  promoContent.appendChild(promoImage);
  promoContent.appendChild(promoText);

  promoPopup.appendChild(promoContent);
  document.body.appendChild(promoPopup);

  promoImages.forEach((img) => {
    img.addEventListener("click", function () {
      const title = this.getAttribute("data-promo-title");
      const desc = this.getAttribute("data-promo-desc");
      const code = this.getAttribute("data-promo-code");

      promoImage.src = this.src;
      promoImage.alt = this.alt;
      promoTitle.textContent = title;
      promoDesc.textContent = desc;
      promoCode.textContent = `Kode Promo: ${code}`;

      promoBtn.onclick = function () {
        window.location.href = "./DetailProduct.html";
      };

      promoPopup.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  closePromo.addEventListener("click", function () {
    promoPopup.style.display = "none";
    document.body.style.overflow = "auto";
  });

  promoPopup.addEventListener("click", function (e) {
    if (e.target === promoPopup) {
      promoPopup.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && promoPopup.style.display === "flex") {
      promoPopup.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
});
