/**
 * Arabian Bakery (അറേബ്യൻ ബേക്കറി) — site content
 * Kulathupuzha, Kollam, Kerala · +91 99461 31881
 *
 * Edit this file to change menu items, gallery photos or reviews.
 * Products without a matching photo use an illustrated tile (set `image: null`).
 */

const BAKERY = {
  store: {
    name: "Arabian Bakery",
    malayalam: "അറേബ്യൻ ബേക്കറി",
    phone: "+919946131881",
    phoneDisplay: "+91 99461 31881",
    whatsapp: "919946131881",
    address: "Main Road, Kulathupuzha, Kollam, Kerala 691310",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Arabian+Bakery+Kulathupuzha+Kerala",
    // Hours are evaluated in India time (Asia/Kolkata), whatever the visitor's timezone.
    // 0 = Sunday … 6 = Saturday. Times are 24h "HH:MM".
    hours: {
      0: ["08:00", "20:00"],
      1: ["08:00", "21:00"],
      2: ["08:00", "21:00"],
      3: ["08:00", "21:00"],
      4: ["08:00", "21:00"],
      5: ["08:00", "21:00"],
      6: ["08:00", "21:00"]
    }
  },

  categories: [
    { id: "all", name: "Everything", icon: "✨" },
    { id: "cakes", name: "Celebration Cakes", icon: "🎂" },
    { id: "pastries", name: "Pastries", icon: "🍰" },
    { id: "breads", name: "Breads & Buns", icon: "🍞" },
    { id: "muffins-cookies", name: "Muffins & Cookies", icon: "🍪" },
    { id: "savories", name: "Hot Snacks", icon: "🥐" },
    { id: "sweets", name: "Arabian Sweets", icon: "🍯" },
    { id: "shakes", name: "Shakes & Drinks", icon: "🥤" }
  ],

  products: [
    // Cakes
    { id: "cake-1", category: "cakes", name: "Signature Black Forest Cake", ml: "ബ്ലാക്ക് ഫോറസ്റ്റ് കേക്ക്", size: "1 Kg / custom size", image: "assets/images/custom-cake.jpg", badge: "Bestseller", tags: ["Eggless available"], desc: "Moist chocolate sponge layered with fresh whipped cream and dark cherries, finished with shaved chocolate curls." },
    { id: "cake-2", category: "cakes", name: "Royal Chocolate Truffle Cake", ml: "ചോക്ലേറ്റ് ട്രഫിൾ കേക്ക്", size: "1 Kg / custom size", image: "assets/images/custom-cake.jpg", badge: "Chef's choice", tags: ["Rich chocolate"], desc: "Dark chocolate ganache over layers of silky chocolate mousse and soft chiffon sponge." },
    { id: "cake-3", category: "cakes", name: "Golden Butterscotch Crunch", ml: "ബട്ടർസ്കോച്ച് ക്രഞ്ച് കേക്ക്", size: "1 Kg / custom size", image: "assets/images/custom-cake.jpg", badge: "Popular", tags: ["Eggless available"], desc: "Caramel sponge with butterscotch cream and crunchy golden praline in every slice." },
    { id: "cake-4", category: "cakes", name: "Red Velvet Romance Cake", ml: "റെഡ് വെൽവെറ്റ് കേക്ക്", size: "1 Kg / custom size", image: "assets/images/custom-cake.jpg", badge: null, tags: ["Cream cheese"], desc: "Velvety crimson cake with a hint of cocoa, filled and frosted with smooth cream cheese frosting." },
    { id: "cake-5", category: "cakes", name: "Custom Birthday & Photo Cake", ml: "കസ്റ്റം ബർത്ത്ഡേ & ഫോട്ടോ കേക്ക്", size: "0.5 Kg – 10 Kg+", image: "assets/images/custom-cake.jpg", badge: "Made to order", tags: ["Your design"], desc: "Your theme, cartoon characters, tiers or an edible photo print. Pre-order on WhatsApp." },
    { id: "cake-6", category: "cakes", name: "Fresh Cream White Forest", ml: "വൈറ്റ് ഫോറസ്റ്റ് കേക്ക്", size: "1 Kg / custom size", image: "assets/images/custom-cake.jpg", badge: null, tags: ["Eggless available"], desc: "Vanilla sponge with white chocolate mousse, cherry compote and white chocolate ribbons." },

    // Pastries
    { id: "pst-1", category: "pastries", name: "Dark Chocolate Truffle Pastry", ml: "ഡാർക്ക് ചോക്ലേറ്റ് പേസ്ട്രി", size: "Single slice", image: "assets/images/pastries.jpg", badge: "Fresh today", tags: ["Chocolate"], desc: "Velvety truffle slice layered with ganache and crowned with a chocolate medallion." },
    { id: "pst-2", category: "pastries", name: "Butterscotch Praline Pastry", ml: "ബട്ടർസ്കോച്ച് പേസ്ട്രി", size: "Single slice", image: "assets/images/pastries.jpg", badge: null, tags: ["Vegetarian"], desc: "Creamy butterscotch slice with caramel drizzle and crunchy cashew praline." },
    { id: "pst-3", category: "pastries", name: "Classic Black Forest Pastry", ml: "ബ്ലാക്ക് ഫോറസ്റ്റ് പേസ്ട്രി", size: "Single slice", image: "assets/images/pastries.jpg", badge: null, tags: ["All-time favourite"], desc: "Chocolate sponge, sweet cherries and airy vanilla cream." },
    { id: "pst-4", category: "pastries", name: "Strawberry Glaze Slice", ml: "സ്ട്രോബെറി ഗ്ലേസ് പേസ്ട്രി", size: "Single slice", image: "assets/images/pastries.jpg", badge: null, tags: ["Fruity"], desc: "Light vanilla sponge with strawberry mousse and a ruby fruit glaze." },

    // Breads
    { id: "brd-1", category: "breads", name: "100% Whole Wheat Bread", ml: "ഹോൾ വീറ്റ് ബ്രഡ്", size: "400 g loaf", image: "assets/images/artisan-bread.jpg", badge: "Healthy choice", tags: ["High fibre", "No preservatives"], desc: "Baked daily with a golden crust and soft, hearty crumb." },
    { id: "brd-2", category: "breads", name: "Fresh Sliced Milk Bread", ml: "മിൽക്ക് ബ്രഡ്", size: "400 g loaf", image: "assets/images/artisan-bread.jpg", badge: "Daily essential", tags: ["Soft & fluffy"], desc: "Pillowy sandwich bread enriched with milk — perfect for toast and sandwiches." },
    { id: "brd-3", category: "breads", name: "Soft Burger Buns", ml: "ബർഗർ ബൺസ് (4 എണ്ണം)", size: "Pack of 4", image: "assets/images/artisan-bread.jpg", badge: null, tags: ["Sesame topped"], desc: "Golden buns crowned with toasted sesame seeds." },
    { id: "brd-4", category: "breads", name: "Kerala Dinner Pav", ml: "സോഫ്റ്റ് പാവ് ബൺ (6 എണ്ണം)", size: "Pack of 6", image: "assets/images/artisan-bread.jpg", badge: null, tags: ["Vegetarian"], desc: "Fluffy pull-apart pav for tea, curry or pav bhaji." },
    { id: "brd-5", category: "breads", name: "Coconut & Tutti-Frutti Bun", ml: "സ്വീറ്റ് ഫ്രൂട്ട് ബൺ", size: "1 piece", image: null, badge: "Kids' favourite", tags: ["Sweet"], desc: "Soft sweet bun loaded with tutti-frutti and coconut." },

    // Muffins & cookies
    { id: "muf-1", category: "muffins-cookies", name: "Choco-Chip Muffins", ml: "ചോക്കോ-ചിപ്പ് മഫിൻസ് (2 എണ്ണം)", size: "Pack of 2", image: "assets/images/muffins-cupcakes.jpg", badge: "Oven fresh", tags: ["Chocolate"], desc: "Tender cocoa muffins loaded with gooey chocolate chips." },
    { id: "muf-2", category: "muffins-cookies", name: "Blueberry Burst Cupcakes", ml: "ബ്ലൂബെറി കപ്പ്കേക്ക് (2 എണ്ണം)", size: "Pack of 2", image: "assets/images/muffins-cupcakes.jpg", badge: null, tags: ["Fruity"], desc: "Vanilla cupcakes with blueberry compote and streusel crumble." },
    { id: "cok-1", category: "muffins-cookies", name: "Cashew Butter Cookies", ml: "കശുവണ്ടി ബട്ടർ കുക്കീസ്", size: "250 g box", image: "assets/images/cookies.jpg", badge: "Bestseller", tags: ["Pure butter"], desc: "Crumbly golden butter cookies studded with roasted cashews." },
    { id: "cok-2", category: "muffins-cookies", name: "Chocolate Drizzle Biscuits", ml: "ചോക്ലേറ്റ് കുക്കീസ്", size: "250 g box", image: "assets/images/cookies.jpg", badge: null, tags: ["Crunchy"], desc: "Crisp biscuits finished with dark chocolate drizzle." },
    { id: "cok-3", category: "muffins-cookies", name: "Cardamom Tea Rusk", ml: "ഏലക്ക ടീ റസ്ക്", size: "300 g pack", image: null, badge: "Chai partner", tags: ["Double baked"], desc: "Twice-baked crunchy rusks with green cardamom." },

    // Hot snacks
    { id: "snk-1", category: "savories", name: "Kerala Chicken Puff", ml: "കേരള ചിക്കൻ പഫ്സ്", size: "1 piece", image: null, badge: "Hot batch daily", tags: ["Non-veg"], desc: "Flaky puff pastry filled with spiced chicken, onions and curry leaves." },
    { id: "snk-2", category: "savories", name: "Kerala Egg Puff", ml: "നാടൻ എഗ്ഗ് പഫ്സ്", size: "1 piece", image: null, badge: "All-time hit", tags: ["Egg"], desc: "Boiled egg in onion-tomato masala, wrapped in golden layered pastry." },
    { id: "snk-3", category: "savories", name: "Spicy Chicken Roll", ml: "സ്പൈസി ചിക്കൻ റോൾ", size: "1 piece", image: null, badge: null, tags: ["Non-veg"], desc: "Crumb-crusted roll stuffed with spicy minced chicken and potato." },
    { id: "snk-4", category: "savories", name: "Golden Veg Samosa", ml: "വെജ് സമൂസ (2 എണ്ണം)", size: "2 pieces", image: null, badge: null, tags: ["Vegetarian"], desc: "Crisp pastry with cumin-spiced potatoes and green peas." },

    // Arabian sweets
    { id: "swt-1", category: "sweets", name: "Pistachio Baklava", ml: "അറേബ്യൻ ബക്ലാവ", size: "250 g box", image: "assets/images/baklava.jpg", badge: "Royal Arabian", tags: ["Vegetarian"], desc: "Paper-thin filo, pure ghee and crushed pistachios in honey syrup." },
    { id: "swt-2", category: "sweets", name: "Sweet Cheese Kunafa", ml: "ചീസ് കുനാഫ", size: "Individual tray", image: "assets/images/kunafa.jpg", badge: "House special", tags: ["Served warm"], desc: "Crispy kataifi over stretchy sweet cheese, soaked in blossom syrup with pistachios." },
    { id: "swt-3", category: "sweets", name: "Basbousa Semolina Cake", ml: "ബസ്ബൂസ കേക്ക്", size: "Box of 4", image: "assets/images/basbousa.jpg", badge: null, tags: ["Vegetarian"], desc: "Semolina and coconut cake soaked in rose syrup, topped with almonds." },

    // Shakes
    { id: "drk-1", category: "shakes", name: "Signature Sharjah Shake", ml: "ഷാർജ ഷേക്ക്", size: "350 ml", image: null, badge: "Kerala legend", tags: ["Chilled"], desc: "Frozen milk, banana, malt and cashews — Kerala's favourite bakery shake." },
    { id: "drk-2", category: "shakes", name: "Tender Coconut Shake", ml: "ഇളനീർ ഷേക്ക്", size: "350 ml", image: null, badge: null, tags: ["Refreshing"], desc: "Tender coconut malai blended with milk and ice cream." },
    { id: "drk-3", category: "shakes", name: "Royal Ice Cream Falooda", ml: "റോയൽ ഫലൂദ", size: "Tall glass", image: null, badge: "Royal dessert", tags: ["Loaded"], desc: "Rose syrup, vermicelli, sabja seeds, jelly, nuts and vanilla ice cream." }
  ],

  // Illustrated tile used when a product has no photo
  tileArt: {
    "brd-5": "🥯", "cok-3": "🍞", "snk-1": "🥐", "snk-2": "🥚", "snk-3": "🌯", "snk-4": "🥟",
    "drk-1": "🍌", "drk-2": "🥥", "drk-3": "🍨"
  },

  gallery: [
    { src: "assets/images/storefront.jpg", title: "Our shop on Main Road, Kulathupuzha", ml: "അറേബ്യൻ ബേക്കറി, കുളത്തൂപ്പുഴ", size: "wide" },
    { src: "assets/images/sweets-showcase.jpg", title: "Arabian sweets platter", ml: "അറേബ്യൻ സ്വീറ്റ്സ്", size: "tall" },
    { src: "assets/images/pastries.jpg", title: "Premium pastries", ml: "പ്രീമിയം പേസ്ട്രികൾ" },
    { src: "assets/images/kunafa.jpg", title: "Cheese kunafa", ml: "ചീസ് കുനാഫ" },
    { src: "assets/images/cookies.jpg", title: "Cookies & biscuits", ml: "കുക്കീസും ബിസ്ക്കറ്റും" },
    { src: "assets/images/artisan-bread.jpg", title: "Whole wheat bread", ml: "ഹോൾ വീറ്റ് ബ്രഡ്", size: "tall" },
    { src: "assets/images/muffins-cupcakes.jpg", title: "Muffins & cupcakes", ml: "മഫിൻസും കപ്പ്കേക്കും" },
    { src: "assets/images/baklava.jpg", title: "Pistachio baklava", ml: "ബക്ലാവ" },
    { src: "assets/images/custom-cake.jpg", title: "Birthday cakes", ml: "ബർത്ത്ഡേ കേക്കുകൾ" },
    { src: "assets/images/manakish.jpg", title: "Fresh from the oven", ml: "ഓവനിൽ നിന്ന് നേരിട്ട്", size: "wide" }
  ],

  // Replace these with your real Google reviews when you have them.
  reviews: [
    { name: "Anas K.", place: "Kulathupuzha", text: "Our go-to bakery in Kulathupuzha! Ordered a 2 kg Black Forest for my daughter's birthday — super fresh, soft and delicious." },
    { name: "Sujith Kumar", place: "Kollam", text: "Their hot chicken puffs and Sharjah shake in the evening are unbeatable. Neat shop and friendly staff." },
    { name: "Fathima Rahman", place: "Kulathupuzha", text: "The whole wheat bread is truly wholesome. My kids love the cashew butter cookies. Ordering on WhatsApp is so easy." },
    { name: "Rahul M.", place: "Thenmala", text: "Ordered custom cakes many times. Always on time, perfect finishing and very reasonable pricing." }
  ]
};
