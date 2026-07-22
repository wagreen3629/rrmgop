// Checkout happens entirely on Printful's own Quick Store (mcmgop.printful.me) —
// Quick Stores can't be reached through the Printful API, so "Buy" links out
// to the live product page there rather than a custom checkout on this site.
export const products = [
  {
    id: "hoodie",
    name: "Unisex Full Zip Hoodie",
    description:
      "A heavyweight full zip hoodie designed for everyday comfort with a clean, modern look. Made from soft 10 oz fleece, it features a structured unisex fit, a sleek silver metal zipper, and a no-drawcord design for a streamlined finish.",
    priceCents: 5500,
    colors: ["Black", "Navy", "Heather", "Tan", "Cream"],
    buyUrl: "https://mcmgop.printful.me/product/unisex-full-zip-hoodie",
    images: ["product-hoodie-front", "product-hoodie-back"],
  },
  {
    id: "tshirt",
    name: "Short Sleeve T-shirt",
    description:
      "This t-shirt is comfortable, soft, lightweight, and form-fitting. It's an ideal staple piece for any wardrobe!",
    priceCents: 2200,
    colors: ["Black", "Midnight Navy", "Red", "Heather Grey", "White"],
    buyUrl: "https://mcmgop.printful.me/product/short-sleeve-t-shirt",
    images: ["product-tshirt-1", "product-tshirt-2"],
  },
  {
    id: "bottle-copper",
    name: "Copper Vacuum Insulated Bottle",
    description:
      "Stay refreshed on the go with our copper vacuum-insulated bottle, designed to keep your drinks at the perfect temperature while preventing condensation. Its durable stainless steel construction with a powder-coat finish is scratch and fade-resistant, while the spill-proof design and wide opening make it practical for everyday use.",
    priceCents: 3350,
    colors: ["Black", "Navy", "Red", "Grey", "Orange", "Pebble Blue", "Mint Green", "White"],
    buyUrl: "https://mcmgop.printful.me/product/copper-vacuum-insulated-bottle-6a602926d56ee",
    images: ["product-bottle-copper-1", "product-bottle-copper-2", "product-bottle-copper-3"],
  },
  {
    id: "long-sleeve-tee",
    name: "Unisex Long Sleeve Tee",
    description:
      "Enrich your wardrobe with a versatile long sleeve tee. For a casual look, combine it with your favorite jeans, and layer it with a button-up shirt, a zip-up hoodie, or a snazzy jacket. Dress it up with formal trousers or chinos to achieve a more professional look.",
    priceCents: 2550,
    colors: [
      "Black Heather",
      "Black",
      "Navy",
      "Maroon",
      "Red",
      "Heather Forest",
      "Dark Grey Heather",
      "True Royal",
      "Heather Navy",
      "Heather Deep Teal",
      "Military Green",
      "Heather Mauve",
      "Storm",
      "Athletic Heather",
      "White",
    ],
    buyUrl: "https://mcmgop.printful.me/product/unisex-long-sleeve-tee",
    images: ["product-long-sleeve-tee-1", "product-long-sleeve-tee-2", "product-long-sleeve-tee-3"],
  },
  {
    id: "bottle-flip-straw",
    name: "Flip Straw Water Bottle",
    description:
      "Stay hydrated in style with this flip straw water bottle, made from 50% recycled plastic. Resistant to stains, shattering, and odors, it keeps your drinks fresh, while the leak-proof cover and bite valve prevent spills. This extra-large bottle is ideal for extended gym, work, or study sessions!",
    priceCents: 3500,
    colors: ["Oxford Blue", "Charcoal", "Clear"],
    buyUrl: "https://mcmgop.printful.me/product/flip-straw-water-bottle",
    images: ["product-bottle-flip-straw-1"],
  },
  {
    id: "rocks-glass",
    name: "Rocks Glass",
    description:
      "Keep it classy with this elegant rocks glass. Ideal for whiskey and cocktail lovers, it features a classic style and is made from sturdy, quality glass.",
    priceCents: 1200,
    buyUrl: "https://mcmgop.printful.me/product/rocks-glass",
    images: ["product-rocks-glass-1", "product-rocks-glass-2", "product-rocks-glass-3"],
  },
  {
    id: "can-glass",
    name: "Can-Shaped Glass",
    description:
      "Whether you enjoy drinking refreshing sodas, iced coffees, cocktails, or even fancy mocktails, this glass is a perfect choice. With its trendy design and the timeless appeal of glassware, it will become a staple for your beverages.",
    priceCents: 1500,
    buyUrl: "https://mcmgop.printful.me/product/can-shaped-glass",
    images: ["product-can-glass-1", "product-can-glass-2", "product-can-glass-3"],
  },
  {
    id: "two-tone-cap",
    name: "Class Two-Tone Cap",
    description:
      "Modern, versatile, and effortlessly stylish — this two-tone cap is designed for everyday wear. Crafted from premium 100% cotton, it offers the perfect combination of comfort, durability, and contemporary design.",
    priceCents: 2450,
    colors: [
      "Black / Natural",
      "Midnight / Cardinal",
      "Midnight / Light Grey",
      "Forest / Walnut",
      "Walnut / Black",
      "Shadow / Black",
      "Khaki / Black",
      "Light Grey / Midnight",
      "Natural / Black",
      "Natural / Cardinal",
      "Natural / Midnight",
      "Natural / Liberty",
      "Natural / Forest",
      "Natural / Army",
      "Natural / Walnut",
      "Natural / Shadow",
      "Natural / Charlotte",
    ],
    buyUrl: "https://mcmgop.printful.me/product/class-two-tone-cap-6a60230be2d61",
    images: ["product-two-tone-cap-1", "product-two-tone-cap-2"],
  },
  {
    id: "ua-polo",
    name: "Under Armour® Men's Polo",
    description:
      "Designed for high performance, this shirt features anti-odor technology and breathable, light fabric to keep you cool. Whether for sports or casual wear, it's a versatile choice.",
    priceCents: 6650,
    colors: ["Black", "Navy", "Forest Green", "Grey"],
    buyUrl: "https://mcmgop.printful.me/product/under-armour-mens-polo-6a6021c667db8",
    images: ["product-ua-polo-1"],
  },
  {
    id: "bucket-hat",
    name: "Distressed Denim Bucket Hat",
    description:
      "Ready for your next streetwear staple? This denim bucket hat with a distressed brim is a real statement piece — with the comfort of 100% cotton to boot. It's an on-trend style that'll be sure to get you a ton of compliments.",
    priceCents: 2500,
    colors: ["Classic / Light Denim", "Light Denim"],
    buyUrl: "https://mcmgop.printful.me/product/distressed-denim-bucket-hat",
    images: ["product-bucket-hat-1"],
  },
  {
    id: "beanie",
    name: "Cuffed Beanie",
    description:
      "A snug, form-fitting beanie. It's not only a great head-warming piece but a staple accessory in anyone's wardrobe.",
    priceCents: 1700,
    buyUrl: "https://mcmgop.printful.me/product/cuffed-beanie-6a601b3fbfcd5",
    images: ["product-beanie-1"],
  },
  {
    id: "twill-cap",
    name: "Vintage Cotton Twill Cap",
    description:
      "Everybody knows that dad caps are no longer just for dads, so get an embroidered cotton twill cap for yourself! This one's really special thanks to the intricate embroidery detail and the washed out vintage feel.",
    priceCents: 2200,
    colors: ["Navy", "Red"],
    buyUrl: "https://mcmgop.printful.me/product/vintage-cotton-twill-cap-6a5fc33e54bc5",
    images: ["product-twill-cap-1", "product-twill-cap-2"],
  },
  {
    id: "ua-dad-hat",
    name: "Under Armour® Dad Hat",
    description:
      "Elevate your performance and style with this classic dad hat from Under Armour®, designed for comfort and durability. The built-in HeatGear® sweatband wicks away moisture, making this hat ideal for hot summers and dynamic workouts.",
    priceCents: 3250,
    colors: ["Navy", "Red", "White"],
    buyUrl: "https://mcmgop.printful.me/product/under-armour-dad-hat-6a5fc260771a3",
    images: ["product-ua-dad-hat-1", "product-ua-dad-hat-2", "product-ua-dad-hat-3"],
  },
  {
    id: "premium-sweatshirt",
    name: "Unisex Premium Sweatshirt",
    description:
      "Rock a classic sweatshirt silhouette with ribbed crew neck, long sleeve cuffs, and a flat hem. Layer it up or wear it on its own for a contemporary streetwear look. With the soft fleece inside and comfortable fit, it's sure to become your favorite everyday sweater right away!",
    priceCents: 3350,
    buyUrl: "https://mcmgop.printful.me/product/unisex-premium-sweatshirt",
    images: ["product-premium-sweatshirt-1", "product-premium-sweatshirt-2"],
  },
  {
    id: "hoodie-pullover",
    name: "Unisex Hoodie",
    description:
      "Who knew that the softest hoodie you'll ever own comes with such a cool design. You won't regret buying this classic streetwear piece of apparel with a convenient pouch pocket and warm hood for chilly evenings.",
    priceCents: 3850,
    buyUrl: "https://mcmgop.printful.me/product/unisex-hoodie",
    images: ["product-hoodie-pullover-1"],
  },
];
