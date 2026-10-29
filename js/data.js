/**
 * The Daily Loaf Bakery - Master Configuration & Product Catalog
 * Currency: Namibian Dollar (N$)
 * All prices and configuration can be edited directly in this file.
 */

const BAKERY_CONFIG = {
  name: "The Daily Loaf Bakery",
  tagline: "Good Things Are Always Baked ♡",
  shortDesc: "From warm, fluffy breads to sweet, decadent treats, we bake happiness every day in Windhoek, Namibia.",
  currency: "N$",
  currencyCode: "NAD",
  phone: "+264 81 123 4567",
  whatsappNumber: "264811234567", // Format without '+' or spaces for wa.me link
  email: "hello@thedailyloafbakery.na",
  address: "42 Independence Avenue, Central Windhoek, Namibia",
  addressNote: "Demo location - replace with your physical bakery address",
  deliveryFee: 35,
  freeDeliveryThreshold: 300,
  openingHours: {
    weekdays: "Monday – Friday: 07:00 – 18:00",
    saturday: "Saturday: 07:30 – 16:00",
    sunday: "Sunday: 08:00 – 13:00"
  },
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    whatsapp: "https://wa.me/264811234567"
  }
};

const CATEGORIES = [
  { id: "all", name: "All Treats", icon: "sparkles" },
  { id: "pastries", name: "Pastries", icon: "croissant" },
  { id: "cakes", name: "Cakes", icon: "cake" },
  { id: "cupcakes", name: "Cupcakes", icon: "cherry" },
  { id: "bread", name: "Bread", icon: "wheat" },
  { id: "cookies", name: "Cookies & Sweets", icon: "cookie" },
  { id: "special", name: "Special Orders", icon: "gift" }
];

const PRODUCTS = [
  {
    id: "prod-1",
    name: "Chocolate Chip Muffins",
    category: "cookies",
    price: 45,
    isBestSeller: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 38,
    image: "images/chocolate_muffins.jpg",
    shortDescription: "Tender, bakery-style muffins overflowing with premium dark Belgian chocolate morsels.",
    fullDescription: "Our chocolate chip muffins are baked fresh every morning with pure creamery butter, Madagascar vanilla, and generous folded-in chunks of 60% Belgian chocolate. Crisp golden tops with an irresistibly tender, melt-in-your-mouth crumb.",
    ingredients: "Unbleached wheat flour, Belgian chocolate chunks, butter, fresh farm eggs, brown sugar, whole milk, vanilla extract, sea salt.",
    allergens: "Contains gluten, dairy, eggs. Made in a facility handling tree nuts.",
    dietary: ["Vegetarian", "Nut-Free"]
  },
  {
    id: "prod-2",
    name: "Classic Croissants",
    category: "pastries",
    price: 40,
    isBestSeller: true,
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 52,
    image: "images/classic_croissants.jpg",
    shortDescription: "72 delicate buttery layers baked to deep golden perfection. Crispy outside, airy within.",
    fullDescription: "Prepared using traditional French Viennoiserie techniques with an intensive 3-day lamination process. Crafted exclusively with 100% natural Namibian cultured butter for unmatched aroma, honeycomb interior, and delicate flakiness.",
    ingredients: "French T55 wheat flour, 84% cultured butter, filtered water, fresh yeast, cane sugar, sea salt.",
    allergens: "Contains gluten, dairy.",
    dietary: ["Vegetarian"]
  },
  {
    id: "prod-3",
    name: "Cinnamon Rolls",
    category: "pastries",
    price: 50,
    isBestSeller: true,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 44,
    image: "images/cinnamon_rolls.jpg",
    shortDescription: "Soft pillowy dough swirled with aromatic Ceylon cinnamon and topped with silky vanilla glaze.",
    fullDescription: "Warmed right from our morning ovens. Brioche dough rolled around brown sugar, fragrant Ceylon cinnamon, and velvety butter, drizzled lavishly while still warm with our signature Madagascar vanilla cream cheese frosting.",
    ingredients: "Enriched wheat flour, Ceylon cinnamon, brown sugar, cream cheese, cultured butter, eggs, milk, vanilla bean.",
    allergens: "Contains gluten, dairy, eggs.",
    dietary: ["Vegetarian"]
  },
  {
    id: "prod-4",
    name: "Chocolate Fudge Cake",
    category: "cakes",
    price: 120,
    isBestSeller: true,
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 67,
    image: "images/chocolate_fudge_cake.jpg",
    shortDescription: "Decadent multi-layered chocolate sponge covered in dark ganache drip and fresh berries.",
    fullDescription: "The ultimate indulgence for chocolate connoisseurs. Three tiers of moist Dutch-processed chocolate sponge filled with chocolate mousse and enveloped in a velvety chocolate fudge buttercream, crowned with dark chocolate ganache and seasonal berries.",
    ingredients: "Dutch cocoa powder, dark chocolate (70%), cake flour, espresso, buttermilk, eggs, European butter, raspberries, strawberries.",
    allergens: "Contains gluten, dairy, eggs.",
    dietary: ["Vegetarian"]
  },
  {
    id: "prod-5",
    name: "Artisan Sourdough Loaf",
    category: "bread",
    price: 55,
    isBestSeller: false,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 29,
    image: "images/sourdough_bread.jpg",
    shortDescription: "36-hour naturally fermented loaf with a blistered, crunchy crust and open, chewy crumb.",
    fullDescription: "Our sourdough is leavened solely with our heritage wild yeast starter dating back to 2018. Fermented over 36 hours for optimal gut digestibility, deep complex sour notes, and baked directly on stone hearths.",
    ingredients: "Stoneground wheat flour, whole rye flour, mineral water, wild sourdough culture, Kalahari desert salt.",
    allergens: "Contains gluten.",
    dietary: ["Vegan", "Naturally Leavened", "Dairy-Free"]
  },
  {
    id: "prod-6",
    name: "Almond Frangipane Croissant",
    category: "pastries",
    price: 48,
    isBestSeller: false,
    isFeatured: false,
    rating: 4.9,
    reviewsCount: 31,
    image: "images/almond_croissant.jpg",
    shortDescription: "Twice-baked butter croissant loaded with rich almond frangipane and toasted sliced almonds.",
    fullDescription: "Dipped in pure vanilla syrup, stuffed generously with roasted almond frangipane cream, baked until golden brown, and showered with crisp toasted almonds and confectioner's sugar.",
    ingredients: "Butter croissant, California almonds, butter, eggs, sugar, dark rum essence, vanilla.",
    allergens: "Contains gluten, dairy, eggs, tree nuts.",
    dietary: ["Vegetarian"]
  },
  {
    id: "prod-7",
    name: "Vanilla Raspberry Cupcakes (4-Pack)",
    category: "cupcakes",
    price: 65,
    isBestSeller: false,
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 22,
    image: "images/vanilla_cupcakes.jpg",
    shortDescription: "Light Madagascar vanilla sponge filled with tart raspberry compote and swirled Swiss meringue.",
    fullDescription: "Fluffy vanilla sponge filled with a secret tart raspberry center and crowned with silky, not-too-sweet Swiss meringue buttercream. A delicate and refreshing treat for tea time.",
    ingredients: "Cake flour, fresh raspberries, egg whites, butter, Madagascar vanilla, sugar.",
    allergens: "Contains gluten, dairy, eggs.",
    dietary: ["Vegetarian"]
  },
  {
    id: "prod-8",
    name: "Velvet Crimson Cake Slice",
    category: "cakes",
    price: 75,
    isBestSeller: false,
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 19,
    image: "images/red_velvet_cake.jpg",
    shortDescription: "Silky buttermilk crimson sponge paired with tangy cream cheese frosting and cocoa hints.",
    fullDescription: "A classic Southern recipe made with true buttermilk, light cocoa notes, and our signature whipped cream cheese frosting that balances the richness with a gentle citrus tang.",
    ingredients: "Flour, cocoa, cultured buttermilk, cream cheese, butter, natural coloring, vanilla.",
    allergens: "Contains gluten, dairy, eggs.",
    dietary: ["Vegetarian"]
  },
  {
    id: "prod-9",
    name: "French Traditional Baguette",
    category: "bread",
    price: 32,
    isBestSeller: false,
    isFeatured: false,
    rating: 4.9,
    reviewsCount: 27,
    image: "images/french_baguette.jpg",
    shortDescription: "Long crispy crust with airy crumb, baked daily every 3 hours for peak table freshness.",
    fullDescription: "Made strictly according to the French bread tradition: flour, water, salt, and yeast with an overnight poolish fermentation. Perfect for sandwiches, cheeses, and breakfast butter spreads.",
    ingredients: "French flour, spring water, sea salt, yeast.",
    allergens: "Contains gluten.",
    dietary: ["Vegan", "Dairy-Free"]
  },
  {
    id: "prod-10",
    name: "Sea Salt Choc Chip Cookies (6-Pack)",
    category: "cookies",
    price: 60,
    isBestSeller: false,
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 49,
    image: "images/chocolate_cookies.jpg",
    shortDescription: "Crispy edges, gooey chewy center, pools of dark chocolate, and crunchy flaky sea salt flakes.",
    fullDescription: "Aged for 48 hours to develop rich toffee and caramel notes in the dough before baking. Generously loaded with two types of chocolate and finished with hand-harvested sea salt flakes.",
    ingredients: "Brown butter, dark chocolate, unbleached flour, brown sugar, eggs, flaky sea salt.",
    allergens: "Contains gluten, dairy, eggs.",
    dietary: ["Vegetarian"]
  },
  {
    id: "prod-11",
    name: "Parisian Macarons (Box of 8)",
    category: "cookies",
    price: 95,
    isBestSeller: false,
    isFeatured: false,
    rating: 4.9,
    reviewsCount: 35,
    image: "images/french_macarons.jpg",
    shortDescription: "Delicate almond meringue shells filled with chocolate ganache, pistachio, and berry fillings.",
    fullDescription: "An exquisite assortment of 8 handcrafted macarons including dark chocolate ganache, pistachio praline, raspberry rose, and salted caramel. Beautifully packaged in our gift box.",
    ingredients: "Almond flour, powdered sugar, egg whites, cream, white/dark chocolate, fruit purées.",
    allergens: "Contains tree nuts (almonds, pistachio), dairy, eggs.",
    dietary: ["Gluten-Free", "Vegetarian"]
  },
  {
    id: "prod-12",
    name: "Tiered Celebration Cake (Custom)",
    category: "special",
    price: 450,
    isBestSeller: false,
    isFeatured: false,
    rating: 5.0,
    reviewsCount: 16,
    image: "images/custom_wedding_cake.jpg",
    shortDescription: "Bespoke handcrafted centerpiece cake with customized flavours, colours, and floral accents.",
    fullDescription: "Tailored specifically for birthdays, anniversaries, and weddings. Choose from our signature flavour profiles including Vanilla Bean & Passionfruit, Belgian Dark Truffle, or Lemon Elderflower. Please order at least 48 hours in advance.",
    ingredients: "Custom tailored according to order preferences.",
    allergens: "Custom tailored per order.",
    dietary: ["Customizable"]
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Helena Nangolo",
    role: "Regular Morning Customer",
    rating: 5,
    text: "The croissants here are truly in a league of their own! That buttery, flaky crunch takes me straight back to Europe. The WhatsApp ordering makes morning pickups effortless.",
    date: "Windhoek, Namibia"
  },
  {
    id: 2,
    name: "Markus Steenkamp",
    role: "Birthday Cake Customer",
    rating: 5,
    text: "We ordered the Chocolate Fudge Cake for my wife's 40th celebration. It was rich, gorgeously decorated, and everybody asked where we got it. Top-tier craftsmanship!",
    date: "Klein Windhoek"
  },
  {
    id: 3,
    name: "Grace Amupanda",
    role: "Weekend Sourdough Enthusiast",
    rating: 5,
    text: "Real, authentic artisan sourdough in Namibia! The crumb structure and tang are phenomenal. You can tell they put true love and slow fermentation into every single loaf.",
    date: "Eros, Windhoek"
  }
];

const GALLERY_ITEMS = [
  { id: 1, title: "Morning Viennoiserie Basket", category: "pastries", image: "images/hero_basket.jpg", caption: "Golden croissants and fresh pastries fresh from our hearth ovens at 6 AM." },
  { id: 2, title: "Dark Chocolate Fudge Cake", category: "cakes", image: "images/chocolate_fudge_cake.jpg", caption: "Belgian chocolate ganache drip with fresh garden berries." },
  { id: 3, title: "Stone-Baked Sourdough", category: "bread", image: "images/sourdough_bread.jpg", caption: "Crispy hearth-baked crust with our 36-hour heritage wild yeast." },
  { id: 4, title: "Fresh Cinnamon Rolls", category: "pastries", image: "images/cinnamon_rolls.jpg", caption: "Ceylon cinnamon swirl with sweet Madagascar vanilla cream glaze." },
  { id: 5, title: "Handcrafted Cupcakes", category: "cupcakes", image: "images/vanilla_cupcakes.jpg", caption: "Fluffy sponge with delicate Swiss meringue buttercream swirls." },
  { id: 6, title: "Artisan Baker at Work", category: "behind", image: "images/baker_crafting.jpg", caption: "Our master baker hand-shaping brioche and sourdough dough." },
  { id: 7, title: "Crisp Traditional Baguettes", category: "bread", image: "images/french_baguette.jpg", caption: "Classic French baguettes scored and baked directly on stone." },
  { id: 8, title: "Bakery Storefront & Café", category: "behind", image: "images/bakery_interior.jpg", caption: "Warm lights, wooden counters, and the smell of roasting coffee." },
  { id: 9, title: "Assorted French Macarons", category: "cookies", image: "images/french_macarons.jpg", caption: "Delicate Parisian macarons in vibrant seasonal flavours." }
];

// Export to window scope for global modular usage without bundler lock-in
if (typeof window !== "undefined") {
  window.BAKERY_CONFIG = BAKERY_CONFIG;
  window.CATEGORIES = CATEGORIES;
  window.PRODUCTS = PRODUCTS;
  window.TESTIMONIALS = TESTIMONIALS;
  window.GALLERY_ITEMS = GALLERY_ITEMS;
}
