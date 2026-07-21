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
];
