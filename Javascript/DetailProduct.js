document.addEventListener("DOMContentLoaded", function () {
  const commentBtn = document.querySelector(".comment-btn");
  const commentModal = document.getElementById("commentModal");
  const closeCommentModal = document.querySelector(".close-comment-modal");
  const submitCommentBtn = document.querySelector(".submit-comment-btn");
  const commentTextarea = document.querySelector(".comment-textarea");

  if (commentBtn) {
    commentBtn.addEventListener("click", function () {
      commentModal.style.display = "flex";
    });
  }

  closeCommentModal.addEventListener("click", function () {
    commentModal.style.display = "none";
  });

  commentModal.addEventListener("click", function (e) {
    if (e.target === commentModal) {
      commentModal.style.display = "none";
    }
  });

  submitCommentBtn.addEventListener("click", function () {
    const commentText = commentTextarea.value.trim();

    if (commentText) {
      console.log("Comment submitted:", commentText);

      showPopupNotification("Komentar berhasil dikirim!");

      commentTextarea.value = "";
      commentModal.style.display = "none";
    } else {
      alert("Silakan tulis komentar terlebih dahulu");
    }
  });

  function showPopupNotification(message) {
    const popup = document.getElementById("popupNotification");
    const popupMessage = document.getElementById("popupMessage");

    popupMessage.textContent = message;
    popup.classList.add("show");

    setTimeout(() => {
      popup.classList.remove("show");
    }, 3000);
  }
});

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

document.addEventListener("DOMContentLoaded", function () {
  const cartIcon = document.querySelector(".cart-icon");
  const cartCount = document.querySelector(".cart-count");
  const cartDropdown = document.querySelector(".cart-dropdown-content");
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartTotal = document.querySelector(".cart-total");
  const btnCart = document.querySelector(".btn-cart");
  const popupNotification = document.getElementById("popupNotification");
  const popupMessage = document.getElementById("popupMessage");

  const currentProduct = {
    name: "Sweater Rajut",
    price: 185000,
    image: "../asset/sweater.png",
    size: null,
  };

  let cart = [];

  loadCart();
  setupEventListeners();

  function loadCart() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      cart = JSON.parse(savedCart);
      updateCartUI();
    }
  }

  function setupEventListeners() {
    document.querySelectorAll(".size-btn").forEach((button) => {
      button.addEventListener("click", function () {
        document.querySelectorAll(".size-btn").forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");
        currentProduct.size = this.textContent;
      });
    });

    btnCart.addEventListener("click", function () {
      addToCart(currentProduct);
    });

    cartIcon.addEventListener("click", function (e) {
      e.preventDefault();
      cartDropdown.style.display = cartDropdown.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".cart-dropdown")) {
        cartDropdown.style.display = "none";
      }
    });
  }

  function updateCartUI() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-cart-message">Keranjang kosong</p>';
      cartTotal.textContent = "Rp0";
      return;
    }

    let totalPrice = 0;

    cart.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.className = "cart-item";
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}" width="50">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name} (${item.size})</div>
          <div class="cart-item-price">Rp${item.price.toLocaleString("id-ID")} x ${item.quantity}</div>
        </div>
        <button class="cart-item-remove" data-id="${item.id}">&times;</button>
      `;
      cartItemsContainer.appendChild(itemElement);
      totalPrice += item.price * item.quantity;

      itemElement.querySelector(".cart-item-remove").addEventListener("click", function () {
        removeFromCart(this.getAttribute("data-id"));
      });
    });

    cartTotal.textContent = `Rp${totalPrice.toLocaleString("id-ID")}`;
  }

  function addToCart(product) {
    if (!product.size) {
      showPopup("Silakan pilih ukuran terlebih dahulu!", true);
      return;
    }

    const existingItemIndex = cart.findIndex((item) => item.name === product.name && item.size === product.size);

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({
        id: Date.now().toString(),
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
    showPopup(`${product.name} (${product.size}) berhasil ditambahkan ke keranjang!`);
  }

  function removeFromCart(itemId) {
    cart = cart.filter((item) => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
  }

  function showPopup(message, isError = false) {
    popupMessage.textContent = message;
    popupNotification.className = isError ? "popup-notification error show" : "popup-notification success show";

    setTimeout(() => {
      popupNotification.classList.remove("show");
    }, 3000);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const mainImage = document.querySelector(".main-image");
  const thumbnails = document.querySelectorAll(".thumbnail");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      mainImage.src = this.src;

      thumbnails.forEach((t) => t.classList.remove("active-thumbnail"));
      this.classList.add("active-thumbnail");
    });
  });

  const style = document.createElement("style");
  style.textContent = `
    .active-thumbnail {
      border: 2px solid #7f4a2a !important;
      opacity: 0.8;
    }
  `;
  document.head.appendChild(style);

  if (thumbnails.length > 0) {
    thumbnails[0].classList.add("active-thumbnail");
  }
});

thumbnail.addEventListener("click", function () {
  mainImage.classList.add("fade-out");

  setTimeout(() => {
    mainImage.src = this.src;
    mainImage.classList.remove("fade-out");
  }, 300);
});
