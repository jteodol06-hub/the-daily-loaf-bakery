/**
 * The Daily Loaf Bakery - Cart, Wishlist & WhatsApp Ordering Engine
 * Manages reactive shopping cart state, persistence in localStorage,
 * order math, and WhatsApp order message formatting.
 */

(function () {
  const CART_STORAGE_KEY = "daily_loaf_cart_v1";
  const WISHLIST_STORAGE_KEY = "daily_loaf_wishlist_v1";

  class CartManager {
    constructor() {
      this.items = this.loadCart();
      this.wishlist = this.loadWishlist();
    }

    loadCart() {
      try {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        console.warn("Could not load cart from localStorage", e);
        return [];
      }
    }

    saveCart() {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
      } catch (e) {
        console.warn("Could not save cart to localStorage", e);
      }
      this.notifyCartChange();
    }

    loadWishlist() {
      try {
        const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        console.warn("Could not load wishlist from localStorage", e);
        return [];
      }
    }

    saveWishlist() {
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(this.wishlist));
      } catch (e) {
        console.warn("Could not save wishlist to localStorage", e);
      }
      this.notifyWishlistChange();
    }

    notifyCartChange() {
      window.dispatchEvent(
        new CustomEvent("cart:updated", {
          detail: {
            items: this.items,
            count: this.getItemCount(),
            subtotal: this.getSubtotal(),
            deliveryFee: this.getDeliveryFee(),
            total: this.getTotal()
          }
        })
      );
    }

    notifyWishlistChange() {
      window.dispatchEvent(
        new CustomEvent("wishlist:updated", {
          detail: {
            wishlist: this.wishlist,
            count: this.wishlist.length
          }
        })
      );
    }

    // --- Cart Actions ---
    addItem(productId, quantity = 1) {
      const product = (window.PRODUCTS || []).find((p) => p.id === productId);
      if (!product) return false;

      const existing = this.items.find((item) => item.id === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: quantity
        });
      }

      this.saveCart();
      return true;
    }

    removeItem(productId) {
      this.items = this.items.filter((item) => item.id !== productId);
      this.saveCart();
    }

    updateQuantity(productId, newQty) {
      const item = this.items.find((i) => i.id === productId);
      if (!item) return;

      if (newQty <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = newQty;
        this.saveCart();
      }
    }

    clearCart() {
      this.items = [];
      this.saveCart();
    }

    getItemCount() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    getSubtotal() {
      return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    getDeliveryFee(isDelivery = true) {
      if (!isDelivery) return 0;
      const subtotal = this.getSubtotal();
      if (subtotal === 0) return 0;
      if (subtotal >= (window.BAKERY_CONFIG?.freeDeliveryThreshold || 300)) {
        return 0; // Free delivery over threshold
      }
      return window.BAKERY_CONFIG?.deliveryFee || 35;
    }

    getTotal(isDelivery = true) {
      const subtotal = this.getSubtotal();
      if (subtotal === 0) return 0;
      return subtotal + this.getDeliveryFee(isDelivery);
    }

    // --- Wishlist Actions ---
    toggleWishlist(productId) {
      const index = this.wishlist.indexOf(productId);
      let added = false;
      if (index > -1) {
        this.wishlist.splice(index, 1);
      } else {
        this.wishlist.push(productId);
        added = true;
      }
      this.saveWishlist();
      return added;
    }

    isInWishlist(productId) {
      return this.wishlist.includes(productId);
    }

    getWishlistItems() {
      const products = window.PRODUCTS || [];
      return products.filter((p) => this.wishlist.includes(p.id));
    }

    // --- WhatsApp Order Link Generator ---
    generateWhatsAppOrderUrl(formData) {
      const config = window.BAKERY_CONFIG || {};
      const currency = config.currency || "N$";
      const orderRef = "DLB-" + Math.floor(10000 + Math.random() * 90000);
      const isDelivery = formData.orderType === "delivery";
      const deliveryFee = this.getDeliveryFee(isDelivery);
      const total = this.getTotal(isDelivery);

      let lines = [];
      lines.push("🍞 *NEW BAKERY ORDER - THE DAILY LOAF* 🍞");
      lines.push(`*Order Ref:* #${orderRef}`);
      lines.push("");
      lines.push(`*Customer Name:* ${formData.fullName || "Customer"}`);
      lines.push(`*Phone Number:* ${formData.phone || "Not provided"}`);
      if (formData.email) lines.push(`*Email:* ${formData.email}`);
      lines.push(`*Fulfillment:* ${isDelivery ? "🚚 Delivery to address" : "🏬 Bakery In-Store Pickup"}`);

      if (isDelivery) {
        lines.push(`*Delivery Address:* ${formData.address || "Please contact for location"}`);
      }
      if (formData.date) {
        lines.push(`*Preferred Date:* ${formData.date}${formData.time ? ` at ${formData.time}` : ""}`);
      }

      lines.push("");
      lines.push("*Items Ordered:*");
      this.items.forEach((item) => {
        const lineTotal = item.price * item.quantity;
        lines.push(`• ${item.quantity}x ${item.name} @ ${currency} ${item.price} = ${currency} ${lineTotal}`);
      });

      lines.push("");
      lines.push(`*Subtotal:* ${currency} ${this.getSubtotal().toFixed(2)}`);
      if (isDelivery) {
        lines.push(`*Delivery Fee:* ${deliveryFee === 0 ? "FREE (Orders over N$ 300)" : `${currency} ${deliveryFee.toFixed(2)}`}`);
      }
      lines.push(`*TOTAL AMOUNT:* ${currency} ${total.toFixed(2)}`);

      if (formData.instructions && formData.instructions.trim() !== "") {
        lines.push("");
        lines.push(`*Special Instructions / Notes:*`);
        lines.push(`${formData.instructions.trim()}`);
      }

      lines.push("");
      lines.push("_Sent via The Daily Loaf Bakery Web App_");

      const messageText = lines.join("\n");
      const phone = config.whatsappNumber || "264811234567";
      return `https://wa.me/${phone}?text=${encodeURIComponent(messageText)}`;
    }

    generateSingleProductWhatsAppUrl(product, quantity = 1) {
      const config = window.BAKERY_CONFIG || {};
      const currency = config.currency || "N$";
      const phone = config.whatsappNumber || "264811234567";
      const lineTotal = (product.price * quantity).toFixed(2);

      let lines = [];
      lines.push("🥖 *THE DAILY LOAF BAKERY ENQUIRY* 🥖");
      lines.push(`Hello! I'd love to order / check availability for:`);
      lines.push(`*${quantity}x ${product.name}*`);
      lines.push(`Price: ${currency} ${product.price} each (Total: ${currency} ${lineTotal})`);
      lines.push("");
      lines.push("Could you please let me know if this is fresh out of the oven today?");
      lines.push("");
      lines.push("_Sent via The Daily Loaf Bakery Website_");

      return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
    }
  }

  window.CartManager = new CartManager();
})();
