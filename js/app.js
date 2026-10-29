/**
 * The Daily Loaf Bakery - Master Application Controller
 * Handles routing, UI state, rendering, filtering, modals, drawers,
 * search, wishlist, forms validation, and WhatsApp interactions.
 */

(function () {
  // DOM References Cache
  const elements = {
    headerWrapper: document.getElementById("headerWrapper"),
    navLinks: document.querySelectorAll(".nav-link"),
    mobileMenuBtn: document.getElementById("mobileMenuBtn"),
    mobileDrawer: document.getElementById("mobileDrawer"),
    closeMobileDrawer: document.getElementById("closeMobileDrawer"),
    
    // Page Views
    views: {
      home: document.getElementById("viewHome"),
      shop: document.getElementById("viewShop"),
      about: document.getElementById("viewAbout"),
      gallery: document.getElementById("viewGallery"),
      contact: document.getElementById("viewContact")
    },

    // Cart Drawer
    cartBtn: document.getElementById("cartBtn"),
    cartDrawer: document.getElementById("cartDrawer"),
    closeCartDrawer: document.getElementById("closeCartDrawer"),
    cartItemsContainer: document.getElementById("cartItemsContainer"),
    cartEmptyState: document.getElementById("cartEmptyState"),
    cartSummaryBox: document.getElementById("cartSummaryBox"),
    cartBadge: document.getElementById("cartBadge"),
    cartSubtotal: document.getElementById("cartSubtotal"),
    cartDeliveryFee: document.getElementById("cartDeliveryFee"),
    cartTotal: document.getElementById("cartTotal"),
    btnProceedCheckout: document.getElementById("btnProceedCheckout"),
    btnEmptyShop: document.getElementById("btnEmptyShop"),

    // Wishlist Drawer
    wishlistBtn: document.getElementById("wishlistBtn"),
    wishlistDrawer: document.getElementById("wishlistDrawer"),
    closeWishlistDrawer: document.getElementById("closeWishlistDrawer"),
    wishlistBadge: document.getElementById("wishlistBadge"),
    wishlistItemsContainer: document.getElementById("wishlistItemsContainer"),
    wishlistEmptyState: document.getElementById("wishlistEmptyState"),

    // Search Modal
    searchBtn: document.getElementById("searchBtn"),
    searchModal: document.getElementById("searchModal"),
    closeSearchModal: document.getElementById("closeSearchModal"),
    searchInput: document.getElementById("globalSearchInput"),
    searchResults: document.getElementById("globalSearchResults"),

    // Product Detail Modal
    productModal: document.getElementById("productModal"),
    closeProductModal: document.getElementById("closeProductModal"),
    modalProductImg: document.getElementById("modalProductImg"),
    modalProductCat: document.getElementById("modalProductCat"),
    modalProductTitle: document.getElementById("modalProductTitle"),
    modalProductPrice: document.getElementById("modalProductPrice"),
    modalProductRating: document.getElementById("modalProductRating"),
    modalProductDesc: document.getElementById("modalProductDesc"),
    modalProductIngredients: document.getElementById("modalProductIngredients"),
    modalProductAllergens: document.getElementById("modalProductAllergens"),
    modalProductDietary: document.getElementById("modalProductDietary"),
    modalQtyMinus: document.getElementById("modalQtyMinus"),
    modalQtyPlus: document.getElementById("modalQtyPlus"),
    modalQtyVal: document.getElementById("modalQtyVal"),
    modalBtnAddToCart: document.getElementById("modalBtnAddToCart"),
    modalBtnWhatsApp: document.getElementById("modalBtnWhatsApp"),

    // Checkout Modal
    checkoutModal: document.getElementById("checkoutModal"),
    closeCheckoutModal: document.getElementById("closeCheckoutModal"),
    checkoutForm: document.getElementById("checkoutForm"),
    checkoutItemsList: document.getElementById("checkoutItemsList"),
    checkoutSubtotal: document.getElementById("checkoutSubtotal"),
    checkoutDeliveryFee: document.getElementById("checkoutDeliveryFee"),
    checkoutTotal: document.getElementById("checkoutTotal"),
    btnSubmitWhatsAppOrder: document.getElementById("btnSubmitWhatsAppOrder"),
    btnSubmitDemoOrder: document.getElementById("btnSubmitDemoOrder"),
    deliveryOptionBtn: document.getElementById("optDelivery"),
    pickupOptionBtn: document.getElementById("optPickup"),
    deliveryAddressGroup: document.getElementById("deliveryAddressGroup"),

    // Order Success Confirmation Modal
    orderSuccessModal: document.getElementById("orderSuccessModal"),
    closeOrderSuccessModal: document.getElementById("closeOrderSuccessModal"),
    orderSuccessRef: document.getElementById("orderSuccessRef"),
    orderSuccessDetails: document.getElementById("orderSuccessDetails"),

    // Lightbox Modal
    lightboxModal: document.getElementById("lightboxModal"),
    closeLightboxModal: document.getElementById("closeLightboxModal"),
    lightboxImg: document.getElementById("lightboxImg"),
    lightboxCaption: document.getElementById("lightboxCaption"),

    // Best Sellers Grid
    bestSellersGrid: document.getElementById("bestSellersGrid"),

    // Shop Controls & Grid
    categoryButtons: document.querySelectorAll(".category-btn"),
    shopSearchInput: document.getElementById("shopSearchInput"),
    shopSortSelect: document.getElementById("shopSortSelect"),
    shopProductsGrid: document.getElementById("shopProductsGrid"),
    shopEmptyState: document.getElementById("shopEmptyState"),
    btnResetShopFilters: document.getElementById("btnResetShopFilters"),

    // Gallery Grid
    galleryGrid: document.getElementById("galleryGrid"),
    galleryFilterBtns: document.querySelectorAll(".gallery-filter-btn"),

    // Forms
    newsletterForm: document.getElementById("newsletterForm"),
    newsletterInput: document.getElementById("newsletterInput"),
    newsletterFeedback: document.getElementById("newsletterFeedback"),
    contactForm: document.getElementById("contactForm"),
    contactSuccessAlert: document.getElementById("contactSuccessAlert"),

    // Toast Container
    toastContainer: document.getElementById("toastContainer")
  };

  // State
  let activeCategory = "all";
  let activeSearchTerm = "";
  let activeSort = "featured";
  let currentModalProduct = null;
  let modalQuantity = 1;
  let currentOrderType = "delivery";
  let activeGalleryFilter = "all";

  // --- Initializer ---
  function init() {
    setupRouting();
    setupHeaderScroll();
    setupCartListeners();
    setupWishlistListeners();
    setupShopFilters();
    setupModalsAndDrawers();
    setupForms();
    renderBestSellers();
    renderShopProducts();
    renderGallery();
    updateCartUI();
    updateWishlistUI();
    setupLucideIcons();
  }

  // --- Lucide Icons Initializer ---
  function setupLucideIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  // --- Header Scroll Effect ---
  function setupHeaderScroll() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        elements.headerWrapper.classList.add("header-scrolled");
      } else {
        elements.headerWrapper.classList.remove("header-scrolled");
      }
    });
  }

  // --- View Routing ---
  function setupRouting() {
    function handleRoute() {
      const hash = (window.location.hash || "#home").toLowerCase();
      const viewKey = hash.replace("#", "") || "home";

      // Hide all views
      Object.keys(elements.views).forEach((key) => {
        if (elements.views[key]) {
          elements.views[key].style.display = "none";
        }
      });

      // Show targeted view or default to home
      if (elements.views[viewKey]) {
        elements.views[viewKey].style.display = "block";
      } else {
        elements.views.home.style.display = "block";
      }

      // Update active nav links
      elements.navLinks.forEach((link) => {
        const linkHash = link.getAttribute("href");
        if (linkHash === hash || (hash === "" && linkHash === "#home")) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });

      // Close mobile drawer on route change
      closeDrawer(elements.mobileDrawer);

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
      setupLucideIcons();
    }

    window.addEventListener("hashchange", handleRoute);
    handleRoute();

    // Attach click listeners to all data-nav links
    document.querySelectorAll("[data-nav]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const target = btn.getAttribute("data-nav");
        window.location.hash = target;
      });
    });
  }

  // --- Toast Notification ---
  function showToast(message, icon = "check-circle") {
    if (!elements.toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <i data-lucide="${icon}" style="width: 18px; height: 18px; color: var(--caramel-light);"></i>
      <span>${message}</span>
    `;
    elements.toastContainer.appendChild(toast);
    setupLucideIcons();

    setTimeout(() => {
      toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // --- Best Sellers Rendering ---
  function renderBestSellers() {
    if (!elements.bestSellersGrid) return;
    const bestSellers = (window.PRODUCTS || []).filter((p) => p.isBestSeller).slice(0, 4);

    elements.bestSellersGrid.innerHTML = bestSellers
      .map((product) => createProductCardHtml(product, "bestseller"))
      .join("");

    attachProductCardEvents(elements.bestSellersGrid);
    setupLucideIcons();
  }

  // --- Shop Products Rendering ---
  function renderShopProducts() {
    if (!elements.shopProductsGrid) return;
    let products = [...(window.PRODUCTS || [])];

    // Filter by category
    if (activeCategory !== "all") {
      products = products.filter((p) => p.category === activeCategory);
    }

    // Filter by search term
    if (activeSearchTerm.trim() !== "") {
      const q = activeSearchTerm.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort products
    if (activeSort === "price-low") {
      products.sort((a, b) => a.price - b.price);
    } else if (activeSort === "price-high") {
      products.sort((a, b) => b.price - a.price);
    } else if (activeSort === "rating") {
      products.sort((a, b) => b.rating - a.rating);
    } else if (activeSort === "name") {
      products.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Handle Empty State
    if (products.length === 0) {
      elements.shopProductsGrid.innerHTML = "";
      elements.shopEmptyState.classList.add("visible");
    } else {
      elements.shopEmptyState.classList.remove("visible");
      elements.shopProductsGrid.innerHTML = products
        .map((product) => createProductCardHtml(product, "shop"))
        .join("");
    }

    attachProductCardEvents(elements.shopProductsGrid);
    setupLucideIcons();
  }

  // --- Product Card HTML Template ---
  function createProductCardHtml(product, context = "shop") {
    const isWishlisted = window.CartManager.isInWishlist(product.id);
    const currency = window.BAKERY_CONFIG?.currency || "N$";

    return `
      <div class="product-card" data-product-id="${product.id}">
        <div class="card-img-wrapper" data-action="quickview" data-product-id="${product.id}">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <span class="card-category-pill">${product.category}</span>
          <button class="card-wishlist-btn ${isWishlisted ? "active" : ""}" 
                  data-action="wishlist" 
                  data-product-id="${product.id}" 
                  title="${isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}"
                  aria-label="Wishlist">
            <i data-lucide="heart" style="width: 16px; height: 16px;"></i>
          </button>
        </div>
        <div class="card-content">
          <h3 class="card-title" data-action="quickview" data-product-id="${product.id}">${product.name}</h3>
          <p class="card-price">${currency} ${product.price}</p>
          <div class="card-actions-row">
            <button class="btn-card-add" data-action="add-cart" data-product-id="${product.id}">
              Add to Cart
            </button>
            <button class="btn-card-heart ${isWishlisted ? "active" : ""}" data-action="wishlist" data-product-id="${product.id}" aria-label="Wishlist">
              <i data-lucide="heart" style="width: 17px; height: 17px;"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // --- Attach Product Card Events ---
  function attachProductCardEvents(container) {
    if (!container) return;

    container.querySelectorAll("[data-action='add-cart']").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-product-id");
        window.CartManager.addItem(id, 1);
        const prod = (window.PRODUCTS || []).find((p) => p.id === id);
        showToast(`Added ${prod ? prod.name : "item"} to cart!`);
      });
    });

    container.querySelectorAll("[data-action='wishlist']").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-product-id");
        const added = window.CartManager.toggleWishlist(id);
        const prod = (window.PRODUCTS || []).find((p) => p.id === id);
        showToast(added ? `Saved ${prod ? prod.name : "item"} to Wishlist ♡` : `Removed from Wishlist`);
      });
    });

    container.querySelectorAll("[data-action='quickview']").forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("data-product-id");
        openProductModal(id);
      });
    });
  }

  // --- Shop Filters Setup ---
  function setupShopFilters() {
    elements.categoryButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        elements.categoryButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeCategory = btn.getAttribute("data-category");
        renderShopProducts();
      });
    });

    if (elements.shopSearchInput) {
      elements.shopSearchInput.addEventListener("input", (e) => {
        activeSearchTerm = e.target.value;
        renderShopProducts();
      });
    }

    if (elements.shopSortSelect) {
      elements.shopSortSelect.addEventListener("change", (e) => {
        activeSort = e.target.value;
        renderShopProducts();
      });
    }

    if (elements.btnResetShopFilters) {
      elements.btnResetShopFilters.addEventListener("click", () => {
        activeCategory = "all";
        activeSearchTerm = "";
        activeSort = "featured";
        if (elements.shopSearchInput) elements.shopSearchInput.value = "";
        if (elements.shopSortSelect) elements.shopSortSelect.value = "featured";
        elements.categoryButtons.forEach((b) => {
          if (b.getAttribute("data-category") === "all") b.classList.add("active");
          else b.classList.remove("active");
        });
        renderShopProducts();
      });
    }
  }

  // --- Product Detail Modal ---
  function openProductModal(productId) {
    const product = (window.PRODUCTS || []).find((p) => p.id === productId);
    if (!product) return;

    currentModalProduct = product;
    modalQuantity = 1;

    const currency = window.BAKERY_CONFIG?.currency || "N$";
    elements.modalProductImg.src = product.image;
    elements.modalProductImg.alt = product.name;
    elements.modalProductCat.textContent = product.category;
    elements.modalProductTitle.textContent = product.name;
    elements.modalProductPrice.textContent = `${currency} ${product.price}`;
    elements.modalProductRating.textContent = `★ ${product.rating.toFixed(1)} (${product.reviewsCount} customer reviews)`;
    elements.modalProductDesc.textContent = product.fullDescription;
    elements.modalProductIngredients.textContent = product.ingredients;
    elements.modalProductAllergens.textContent = product.allergens;
    elements.modalQtyVal.textContent = "1";

    // Render dietary pills
    if (elements.modalProductDietary) {
      elements.modalProductDietary.innerHTML = (product.dietary || [])
        .map((tag) => `<span class="card-category-pill" style="position: static; margin-right: 6px;">${tag}</span>`)
        .join("");
    }

    // Direct WhatsApp Button
    if (elements.modalBtnWhatsApp) {
      elements.modalBtnWhatsApp.onclick = () => {
        const url = window.CartManager.generateSingleProductWhatsAppUrl(currentModalProduct, modalQuantity);
        window.open(url, "_blank");
      };
    }

    openModal(elements.productModal);
    setupLucideIcons();
  }

  // Quantity Stepper in Product Modal
  if (elements.modalQtyMinus) {
    elements.modalQtyMinus.addEventListener("click", () => {
      if (modalQuantity > 1) {
        modalQuantity--;
        elements.modalQtyVal.textContent = modalQuantity;
      }
    });
  }

  if (elements.modalQtyPlus) {
    elements.modalQtyPlus.addEventListener("click", () => {
      modalQuantity++;
      elements.modalQtyVal.textContent = modalQuantity;
    });
  }

  if (elements.modalBtnAddToCart) {
    elements.modalBtnAddToCart.addEventListener("click", () => {
      if (currentModalProduct) {
        window.CartManager.addItem(currentModalProduct.id, modalQuantity);
        showToast(`Added ${modalQuantity}x ${currentModalProduct.name} to cart!`);
        closeModal(elements.productModal);
      }
    });
  }

  // --- Cart Drawer & State Sync ---
  function setupCartListeners() {
    window.addEventListener("cart:updated", () => {
      updateCartUI();
      renderBestSellers();
      renderShopProducts();
    });

    if (elements.cartBtn) {
      elements.cartBtn.addEventListener("click", () => openDrawer(elements.cartDrawer));
    }

    if (elements.closeCartDrawer) {
      elements.closeCartDrawer.addEventListener("click", () => closeDrawer(elements.cartDrawer));
    }

    if (elements.btnEmptyShop) {
      elements.btnEmptyShop.addEventListener("click", () => {
        closeDrawer(elements.cartDrawer);
        window.location.hash = "#shop";
      });
    }

    if (elements.btnProceedCheckout) {
      elements.btnProceedCheckout.addEventListener("click", () => {
        closeDrawer(elements.cartDrawer);
        openCheckoutModal();
      });
    }
  }

  function updateCartUI() {
    const items = window.CartManager.items;
    const count = window.CartManager.getItemCount();
    const currency = window.BAKERY_CONFIG?.currency || "N$";

    // Update Badge
    if (elements.cartBadge) {
      elements.cartBadge.textContent = count;
      elements.cartBadge.classList.add("bounce");
      setTimeout(() => elements.cartBadge.classList.remove("bounce"), 300);
    }

    // Toggle Empty State vs Items
    if (items.length === 0) {
      elements.cartEmptyState.style.display = "block";
      elements.cartItemsContainer.innerHTML = "";
      elements.cartSummaryBox.style.display = "none";
    } else {
      elements.cartEmptyState.style.display = "none";
      elements.cartSummaryBox.style.display = "block";

      elements.cartItemsContainer.innerHTML = items
        .map((item) => `
          <div class="cart-item-row">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
            <div>
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">${currency} ${item.price} each</div>
              <div class="cart-item-qty">
                <button class="qty-btn" data-cart-action="dec" data-id="${item.id}">-</button>
                <span class="qty-val">${item.quantity}</span>
                <button class="qty-btn" data-cart-action="inc" data-id="${item.id}">+</button>
              </div>
            </div>
            <button class="cart-item-delete" data-cart-action="del" data-id="${item.id}" title="Remove">
              <i data-lucide="trash-2" style="width: 18px; height: 18px;"></i>
            </button>
          </div>
        `)
        .join("");

      // Attach Cart Item Events
      elements.cartItemsContainer.querySelectorAll("[data-cart-action]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const action = btn.getAttribute("data-cart-action");
          const id = btn.getAttribute("data-id");
          const item = items.find((i) => i.id === id);
          if (!item) return;

          if (action === "inc") {
            window.CartManager.updateQuantity(id, item.quantity + 1);
          } else if (action === "dec") {
            window.CartManager.updateQuantity(id, item.quantity - 1);
          } else if (action === "del") {
            window.CartManager.removeItem(id);
          }
        });
      });

      // Update Summary Math
      const subtotal = window.CartManager.getSubtotal();
      const fee = window.CartManager.getDeliveryFee(true);
      const total = window.CartManager.getTotal(true);

      if (elements.cartSubtotal) elements.cartSubtotal.textContent = `${currency} ${subtotal.toFixed(2)}`;
      if (elements.cartDeliveryFee) {
        elements.cartDeliveryFee.textContent = fee === 0 ? "FREE" : `${currency} ${fee.toFixed(2)}`;
      }
      if (elements.cartTotal) elements.cartTotal.textContent = `${currency} ${total.toFixed(2)}`;
    }

    setupLucideIcons();
  }

  // --- Wishlist Drawer & State Sync ---
  function setupWishlistListeners() {
    window.addEventListener("wishlist:updated", () => {
      updateWishlistUI();
      renderBestSellers();
      renderShopProducts();
    });

    if (elements.wishlistBtn) {
      elements.wishlistBtn.addEventListener("click", () => openDrawer(elements.wishlistDrawer));
    }

    if (elements.closeWishlistDrawer) {
      elements.closeWishlistDrawer.addEventListener("click", () => closeDrawer(elements.wishlistDrawer));
    }
  }

  function updateWishlistUI() {
    const wishlistItems = window.CartManager.getWishlistItems();
    const count = wishlistItems.length;
    const currency = window.BAKERY_CONFIG?.currency || "N$";

    if (elements.wishlistBadge) {
      elements.wishlistBadge.textContent = count;
      elements.wishlistBadge.style.display = count > 0 ? "flex" : "none";
    }

    if (count === 0) {
      elements.wishlistEmptyState.style.display = "block";
      elements.wishlistItemsContainer.innerHTML = "";
    } else {
      elements.wishlistEmptyState.style.display = "none";
      elements.wishlistItemsContainer.innerHTML = wishlistItems
        .map(
          (product) => `
            <div class="cart-item-row">
              <img src="${product.image}" alt="${product.name}" class="cart-item-img" />
              <div>
                <div class="cart-item-name">${product.name}</div>
                <div class="cart-item-price">${currency} ${product.price}</div>
                <button class="btn-card-add" style="margin-top: 6px; padding: 4px 10px; font-size: 0.78rem;" data-wishlist-action="add-cart" data-id="${product.id}">
                  Move to Cart
                </button>
              </div>
              <button class="cart-item-delete" data-wishlist-action="remove" data-id="${product.id}" title="Remove">
                <i data-lucide="x" style="width: 18px; height: 18px;"></i>
              </button>
            </div>
          `
        )
        .join("");

      elements.wishlistItemsContainer.querySelectorAll("[data-wishlist-action]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const action = btn.getAttribute("data-wishlist-action");
          const id = btn.getAttribute("data-id");

          if (action === "add-cart") {
            window.CartManager.addItem(id, 1);
            window.CartManager.toggleWishlist(id);
            const p = (window.PRODUCTS || []).find((item) => item.id === id);
            showToast(`Moved ${p ? p.name : "item"} to Cart!`);
          } else if (action === "remove") {
            window.CartManager.toggleWishlist(id);
          }
        });
      });
    }

    setupLucideIcons();
  }

  // --- Checkout Modal & Form Logic ---
  function openCheckoutModal() {
    if (window.CartManager.items.length === 0) {
      showToast("Your cart is empty! Add treats first.", "alert-circle");
      return;
    }

    updateCheckoutSummary();
    openModal(elements.checkoutModal);
    setupLucideIcons();
  }

  function updateCheckoutSummary() {
    const items = window.CartManager.items;
    const isDelivery = currentOrderType === "delivery";
    const currency = window.BAKERY_CONFIG?.currency || "N$";
    const subtotal = window.CartManager.getSubtotal();
    const fee = window.CartManager.getDeliveryFee(isDelivery);
    const total = window.CartManager.getTotal(isDelivery);

    if (elements.checkoutItemsList) {
      elements.checkoutItemsList.innerHTML = items
        .map(
          (item) => `
            <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 0.5rem;">
              <span>${item.quantity}x ${item.name}</span>
              <span style="font-weight: 600;">${currency} ${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          `
        )
        .join("");
    }

    if (elements.checkoutSubtotal) elements.checkoutSubtotal.textContent = `${currency} ${subtotal.toFixed(2)}`;
    if (elements.checkoutDeliveryFee) {
      elements.checkoutDeliveryFee.textContent = isDelivery ? (fee === 0 ? "FREE" : `${currency} ${fee.toFixed(2)}`) : "N$ 0.00 (Pickup)";
    }
    if (elements.checkoutTotal) elements.checkoutTotal.textContent = `${currency} ${total.toFixed(2)}`;
  }

  // Fulfillment selector toggle (Delivery vs Pickup)
  if (elements.deliveryOptionBtn && elements.pickupOptionBtn) {
    elements.deliveryOptionBtn.addEventListener("click", () => {
      currentOrderType = "delivery";
      elements.deliveryOptionBtn.classList.add("active");
      elements.pickupOptionBtn.classList.remove("active");
      if (elements.deliveryAddressGroup) elements.deliveryAddressGroup.style.display = "block";
      updateCheckoutSummary();
    });

    elements.pickupOptionBtn.addEventListener("click", () => {
      currentOrderType = "pickup";
      elements.pickupOptionBtn.classList.add("active");
      elements.deliveryOptionBtn.classList.remove("active");
      if (elements.deliveryAddressGroup) elements.deliveryAddressGroup.style.display = "none";
      updateCheckoutSummary();
    });
  }

  function validateCheckoutForm() {
    let isValid = true;
    const form = elements.checkoutForm;
    if (!form) return false;

    // Helper to validate
    function checkField(id, errorId, validator) {
      const input = document.getElementById(id);
      const err = document.getElementById(errorId);
      if (!input || !err) return true;

      const valid = validator(input.value.trim());
      if (!valid) {
        err.classList.add("visible");
        input.style.borderColor = "var(--error)";
        isValid = false;
      } else {
        err.classList.remove("visible");
        input.style.borderColor = "";
      }
      return valid;
    }

    checkField("checkoutFullName", "errFullName", (val) => val.length >= 2);
    checkField("checkoutPhone", "errPhone", (val) => val.length >= 7);
    checkField("checkoutEmail", "errEmail", (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));

    if (currentOrderType === "delivery") {
      checkField("checkoutAddress", "errAddress", (val) => val.length >= 5);
    }

    return isValid;
  }

  function getCheckoutFormData() {
    return {
      fullName: document.getElementById("checkoutFullName")?.value.trim() || "",
      phone: document.getElementById("checkoutPhone")?.value.trim() || "",
      email: document.getElementById("checkoutEmail")?.value.trim() || "",
      orderType: currentOrderType,
      address: document.getElementById("checkoutAddress")?.value.trim() || "",
      date: document.getElementById("checkoutDate")?.value || "",
      time: document.getElementById("checkoutTime")?.value || "",
      instructions: document.getElementById("checkoutInstructions")?.value.trim() || ""
    };
  }

  // Submit via WhatsApp
  if (elements.btnSubmitWhatsAppOrder) {
    elements.btnSubmitWhatsAppOrder.addEventListener("click", (e) => {
      e.preventDefault();
      if (!validateCheckoutForm()) {
        showToast("Please fill all required fields correctly", "alert-circle");
        return;
      }

      const formData = getCheckoutFormData();
      const whatsappUrl = window.CartManager.generateWhatsAppOrderUrl(formData);
      window.open(whatsappUrl, "_blank");

      closeModal(elements.checkoutModal);
      showOrderSuccessReceipt(formData, true);
    });
  }

  // Submit Demo Order
  if (elements.btnSubmitDemoOrder) {
    elements.btnSubmitDemoOrder.addEventListener("click", (e) => {
      e.preventDefault();
      if (!validateCheckoutForm()) {
        showToast("Please fill all required fields correctly", "alert-circle");
        return;
      }

      const formData = getCheckoutFormData();
      closeModal(elements.checkoutModal);
      showOrderSuccessReceipt(formData, false);
      window.CartManager.clearCart();
    });
  }

  function showOrderSuccessReceipt(formData, isWhatsApp = false) {
    const orderRef = "DLB-" + Math.floor(10000 + Math.random() * 90000);
    const currency = window.BAKERY_CONFIG?.currency || "N$";

    if (elements.orderSuccessRef) elements.orderSuccessRef.textContent = `#${orderRef}`;
    if (elements.orderSuccessDetails) {
      elements.orderSuccessDetails.innerHTML = `
        <div style="background-color: var(--warm-cream); padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--soft-blush); margin-bottom: 1.5rem; text-align: left; font-size: 0.92rem;">
          <p><strong>Customer:</strong> ${formData.fullName}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Fulfillment:</strong> ${formData.orderType === "delivery" ? `Delivery to: ${formData.address}` : "Bakery In-Store Pickup"}</p>
          ${formData.date ? `<p><strong>Preferred Timing:</strong> ${formData.date} ${formData.time}</p>` : ""}
          <p style="margin-top: 0.5rem; color: var(--text-muted); font-size: 0.84rem;">
            <em>Note: This is a demo transaction. Real payments and order management will be activated upon live gateway configuration.</em>
          </p>
        </div>
      `;
    }

    openModal(elements.orderSuccessModal);
    setupLucideIcons();
  }

  // --- Global Search Modal ---
  if (elements.searchBtn) {
    elements.searchBtn.addEventListener("click", () => {
      openModal(elements.searchModal);
      setTimeout(() => elements.searchInput?.focus(), 150);
    });
  }

  if (elements.searchInput) {
    elements.searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (q === "") {
        elements.searchResults.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 2rem 0;">Type to search our freshly baked breads, pastries, and cakes...</p>`;
        return;
      }

      const matches = (window.PRODUCTS || []).filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );

      if (matches.length === 0) {
        elements.searchResults.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 2rem 0;">No bakery treats found matching "${q}".</p>`;
      } else {
        const currency = window.BAKERY_CONFIG?.currency || "N$";
        elements.searchResults.innerHTML = matches
          .map(
            (p) => `
              <div class="cart-item-row" style="cursor: pointer;" data-search-result-id="${p.id}">
                <img src="${p.image}" alt="${p.name}" class="cart-item-img" />
                <div>
                  <div class="cart-item-name">${p.name}</div>
                  <div class="cart-item-price">${currency} ${p.price} • <span style="text-transform: capitalize; color: var(--text-muted);">${p.category}</span></div>
                </div>
                <button class="btn-card-add" data-search-action="add" data-id="${p.id}" style="font-size: 0.78rem; padding: 4px 10px;">
                  Add
                </button>
              </div>
            `
          )
          .join("");

        elements.searchResults.querySelectorAll("[data-search-result-id]").forEach((row) => {
          row.addEventListener("click", (e) => {
            if (e.target.closest("[data-search-action]")) return;
            const id = row.getAttribute("data-search-result-id");
            closeModal(elements.searchModal);
            openProductModal(id);
          });
        });

        elements.searchResults.querySelectorAll("[data-search-action]").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = btn.getAttribute("data-id");
            window.CartManager.addItem(id, 1);
            const p = (window.PRODUCTS || []).find((prod) => prod.id === id);
            showToast(`Added ${p ? p.name : "item"} to cart!`);
          });
        });
      }

      setupLucideIcons();
    });
  }

  // --- Gallery & Lightbox ---
  function renderGallery() {
    if (!elements.galleryGrid) return;
    let items = [...(window.GALLERY_ITEMS || [])];

    if (activeGalleryFilter !== "all") {
      items = items.filter((item) => item.category === activeGalleryFilter);
    }

    elements.galleryGrid.innerHTML = items
      .map(
        (item) => `
          <div class="gallery-card" data-gallery-id="${item.id}">
            <img src="${item.image}" alt="${item.title}" loading="lazy" />
            <div class="gallery-overlay">
              <h4 class="gallery-overlay-title">${item.title}</h4>
              <p class="gallery-overlay-caption">${item.caption}</p>
            </div>
          </div>
        `
      )
      .join("");

    elements.galleryGrid.querySelectorAll(".gallery-card").forEach((card) => {
      card.addEventListener("click", () => {
        const id = parseInt(card.getAttribute("data-gallery-id"), 10);
        const item = (window.GALLERY_ITEMS || []).find((g) => g.id === id);
        if (item && elements.lightboxModal) {
          elements.lightboxImg.src = item.image;
          elements.lightboxImg.alt = item.title;
          elements.lightboxCaption.textContent = `${item.title} — ${item.caption}`;
          openModal(elements.lightboxModal);
        }
      });
    });

    // Filter Buttons
    elements.galleryFilterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        elements.galleryFilterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeGalleryFilter = btn.getAttribute("data-gallery-filter");
        renderGallery();
      });
    });
  }

  // --- Forms Validation (Newsletter & Contact) ---
  function setupForms() {
    // Newsletter
    if (elements.newsletterForm) {
      elements.newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = elements.newsletterInput.value.trim();
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!isValid) {
          elements.newsletterFeedback.className = "newsletter-form-feedback error";
          elements.newsletterFeedback.textContent = "Please enter a valid email address.";
          return;
        }

        elements.newsletterFeedback.className = "newsletter-form-feedback success";
        elements.newsletterFeedback.textContent = "♡ Thank you for subscribing! (Demo: no marketing emails are stored without a backend service).";
        elements.newsletterInput.value = "";
      });
    }

    // Contact Form
    if (elements.contactForm) {
      elements.contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("contactName")?.value.trim();
        const email = document.getElementById("contactEmail")?.value.trim();
        const message = document.getElementById("contactMessage")?.value.trim();

        if (!name || !email || !message) {
          showToast("Please complete all required fields", "alert-circle");
          return;
        }

        if (elements.contactSuccessAlert) {
          elements.contactSuccessAlert.style.display = "block";
        }
        elements.contactForm.reset();
        showToast("Your message has been sent successfully!");
      });
    }
  }

  // --- Modal & Drawer Helpers ---
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openDrawer(drawer) {
    if (!drawer) return;
    drawer.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer(drawer) {
    if (!drawer) return;
    drawer.classList.remove("open");
    document.body.style.overflow = "";
  }

  function setupModalsAndDrawers() {
    // Close on overlay backdrop click
    document.querySelectorAll(".modal-overlay").forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal(modal);
      });
    });

    // Close buttons
    if (elements.closeSearchModal) elements.closeSearchModal.onclick = () => closeModal(elements.searchModal);
    if (elements.closeProductModal) elements.closeProductModal.onclick = () => closeModal(elements.productModal);
    if (elements.closeCheckoutModal) elements.closeCheckoutModal.onclick = () => closeModal(elements.checkoutModal);
    if (elements.closeOrderSuccessModal) {
      elements.closeOrderSuccessModal.onclick = () => closeModal(elements.orderSuccessModal);
    }
    if (elements.closeLightboxModal) elements.closeLightboxModal.onclick = () => closeModal(elements.lightboxModal);

    // Mobile Hamburger
    if (elements.mobileMenuBtn) {
      elements.mobileMenuBtn.addEventListener("click", () => openDrawer(elements.mobileDrawer));
    }
    if (elements.closeMobileDrawer) {
      elements.closeMobileDrawer.addEventListener("click", () => closeDrawer(elements.mobileDrawer));
    }

    // Escape Key Listener
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.active").forEach((m) => closeModal(m));
        document.querySelectorAll(".drawer-wrapper.open").forEach((d) => closeDrawer(d));
      }
    });
  }

  // Run on DOM Ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
