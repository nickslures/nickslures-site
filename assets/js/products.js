/*
  Fish On Nick's Lures — product data source

  This is the simple static-data version, designed so the site feels dynamic now
  and can be replaced by a real control panel later.

  CONTROL PANEL MAPPING IDEA:
  - status: "active" means the product can appear on the public site.
  - homePage.show: true means the product is selected for the special homepage area.
  - homePage.order: controls the position/spot in the Featured Products row.
  - homePage.label: customer-facing badge for that homepage spot.
  - heroSpot: true chooses the product image used in the homepage hero.
  - slug drives product.html?product=the-product-slug.

  Later, an admin panel can write these same fields to a database or JSON API.
*/
window.FISH_ON_STORE = {
  business: {
    name: "Fish On Nick's Lures",
    phone: "702-510-3365",
    email: "info@nickslures.com",
    location: "Las Vegas, NV"
  },

  categories: [
    {
      slug: "soft-plastics",
      name: "Soft Plastics",
      headline: "Hand-poured soft baits built for real bites.",
      image: "assets/images/chartreuse-swimbaits.png",
      alt: "Soft plastic paddle tail swimbaits",
      featuredProductSlug: "paddle-tail-swim-bait-chartreuse",
      buttonText: "Shop Now"
    },
    {
      slug: "jig-heads",
      name: "Jigs & Terminal Tackle",
      headline: "Darter heads, diamond heads, ball jigs, and terminal tackle.",
      image: "assets/images/silver-red-eye-jigs.png",
      alt: "Silver red-eye jig heads",
      featuredProductSlug: "darter-head-jig-silver-red-eye",
      buttonText: "Shop Now"
    },
    {
      slug: "tackle-accessories",
      name: "Tackle & Accessories",
      headline: "Spinner rigs and add-ons for better action.",
      image: "assets/images/swim-rig-spinner.png",
      alt: "Swim rig spinner with silver and gold blades",
      featuredProductSlug: "swim-rig-spinner",
      buttonText: "Shop Now"
    },
    {
      slug: "apparel-gear",
      name: "Apparel & Gear",
      headline: "Fish On gear can be added later.",
      image: "assets/images/soft-plastics-assortment.png",
      alt: "Assorted soft plastics",
      featuredProductSlug: "paddle-tail-swim-bait-chartreuse",
      buttonText: "Coming Soon",
      comingSoon: true
    }
  ],

  products: [
    {
      id: "p001",
      slug: "paddle-tail-swim-bait-chartreuse",
      name: "Paddle Tail Swim Bait – Chartreuse",
      categorySlug: "soft-plastics",
      categoryName: "Soft Plastics",
      price: 5.49,
      rating: 5,
      reviewCount: 45,
      status: "active",
      heroSpot: true,
      homePage: { show: true, order: 1, label: "Homepage Pick" },
      image: "assets/images/chartreuse-swimbaits.png",
      alt: "Paddle Tail Swim Bait in chartreuse",
      gallery: ["assets/images/chartreuse-swimbaits.png", "assets/images/soft-plastics-assortment.png"],
      shortDescription: "Bright chartreuse paddle-tail swim bait with a clean swimming action for stained water, reaction bites, and aggressive fish.",
      description: "A high-visibility paddle-tail profile for anglers who want movement, flash, and a bait that stands out. Use this product page as the reusable template for each lure in the catalog.",
      specs: {
        style: "Paddle Tail Swim Bait",
        color: "Chartreuse",
        packSize: "Confirm pack count",
        material: "Hand-poured soft plastic",
        notes: "Confirm exact sizes and scent/salt details with Nick before publishing."
      }
    },
    {
      id: "p002",
      slug: "darter-head-jig-silver-red-eye",
      name: "Darter Head Jig – Silver / Red Eye",
      categorySlug: "jig-heads",
      categoryName: "Jig Heads",
      price: 5.79,
      rating: 5,
      reviewCount: 38,
      status: "active",
      homePage: { show: true, order: 2, label: "Featured Jig" },
      image: "assets/images/silver-red-eye-jigs.png",
      alt: "Silver red-eye darter head jig",
      gallery: ["assets/images/silver-red-eye-jigs.png"],
      shortDescription: "Silver darter head jig with red-eye detail and a black hook, built for clean rigging and bait presentation.",
      description: "A polished darter-style jig head that pairs well with soft plastics. The red-eye detail gives the bait a finished, fish-catching look.",
      specs: {
        style: "Darter Head Jig",
        color: "Silver fish head / red eye / black hook",
        weightOptions: ["1/8 oz", "3/16 oz", "1/4 oz", "5/16 oz", "3/8 oz"],
        hookOptions: ["#1", "1/0", "2/0", "3/0", "4/0"],
        pronunciationNote: "1/0, 2/0, 3/0, and 4/0 are pronounced one aught, two aught, three aught, and four aught."
      }
    },
    {
      id: "p003",
      slug: "diamond-head-jig-silver-red-eye",
      name: "Diamond Head Jig – Silver / Red Eye",
      categorySlug: "jig-heads",
      categoryName: "Jig Heads",
      price: 5.79,
      rating: 5,
      reviewCount: 33,
      status: "active",
      homePage: { show: true, order: 3, label: "Featured Jig" },
      image: "assets/images/silver-red-eye-jigs.png",
      alt: "Silver red-eye diamond head jig",
      gallery: ["assets/images/silver-red-eye-jigs.png"],
      shortDescription: "Diamond head jig in silver with red-eye detail for a sharp, baitfish-inspired presentation.",
      description: "A compact diamond head profile designed to give soft plastics a clean profile and dependable hook placement.",
      specs: {
        style: "Diamond Head Jig",
        color: "Silver fish head / red eye / black hook",
        weightOptions: ["1/8 oz", "3/16 oz", "1/4 oz", "5/16 oz", "3/8 oz"],
        hookOptions: ["#1", "1/0", "2/0", "3/0", "4/0"],
        pronunciationNote: "Use aught for /0 hook sizes."
      }
    },
    {
      id: "p004",
      slug: "ball-jig-heads-3-pack",
      name: "Ball Jig Heads – 3 Pack",
      categorySlug: "jig-heads",
      categoryName: "Jig Heads",
      price: 4.99,
      rating: 5,
      reviewCount: 41,
      status: "active",
      homePage: { show: true, order: 4, label: "Small Batch" },
      image: "assets/images/ball-jig-heads.png",
      alt: "Unpainted metallic ball jig heads",
      gallery: ["assets/images/ball-jig-heads.png"],
      shortDescription: "Simple, clean ball jig heads for everyday fishing and versatile soft plastic rigging.",
      description: "A reliable 3-pack option for anglers who want a straightforward jig head that works across multiple presentations.",
      specs: {
        style: "Ball Jig Heads",
        packSize: "3 pack",
        finish: "Unpainted metallic",
        weightOptions: ["Confirm available weights"],
        hookOptions: ["Confirm available hook sizes"]
      }
    },
    {
      id: "p005",
      slug: "swim-rig-spinner",
      name: "Swim Rig Spinner",
      categorySlug: "tackle-accessories",
      categoryName: "Tackle & Accessories",
      price: 3.99,
      rating: 5,
      reviewCount: 27,
      status: "active",
      homePage: { show: true, order: 5, label: "Add-On" },
      image: "assets/images/swim-rig-spinner.png",
      alt: "Swim rig spinner with silver and gold blades",
      gallery: ["assets/images/swim-rig-spinner.png"],
      shortDescription: "Spinner rig add-on with flash and vibration for swimbaits, jig heads, and search-bait presentations.",
      description: "A compact swim rig spinner for anglers who want to add extra flash, thump, and attention to their presentation.",
      specs: {
        style: "Swim Rig Spinner",
        bladeColors: ["Silver", "Gold"],
        useCase: "Adds flash and vibration",
        notes: "Confirm blade sizes and wire details before publishing."
      }
    },
    {
      id: "p006",
      slug: "soft-plastics-assortment",
      name: "Soft Plastics Assortment",
      categorySlug: "soft-plastics",
      categoryName: "Soft Plastics",
      price: null,
      rating: 0,
      reviewCount: 0,
      status: "draft",
      homePage: { show: false, order: null, label: "Draft" },
      image: "assets/images/soft-plastics-assortment.png",
      alt: "Assorted soft plastics",
      gallery: ["assets/images/soft-plastics-assortment.png"],
      shortDescription: "Draft placeholder product for future soft plastic assortments.",
      description: "This draft item shows how new products can be added without changing the HTML templates.",
      specs: {
        style: "Assortment",
        statusNote: "Draft only. Confirm before publishing."
      }
    }
  ]
};
