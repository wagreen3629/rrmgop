// Checkout is handled entirely by Printful's embeddable "Buy" widget, not our
// own code. Once a product is synced in the Printful store (dashboard.printful.com/
// dashboard/sync?store=17170069), grab its embed snippet from the product's
// "Embed" button and paste the full snippet (script + container markup) as
// `embedCode` below. Products with `embedCode: null` show a "Coming Soon" state.
export const products = [
  {
    id: "hoodie",
    name: "Slate Blue Hoodie",
    description: "Comfortable pullover hoodie featuring our signature River Region logo.",
    embedCode: null,
  },
  {
    id: "tshirt",
    name: "Classic White T-Shirt",
    description: "Premium cotton tee with bold logo design, perfect for rallies and events.",
    embedCode: null,
  },
  {
    id: "button-up",
    name: "Denim Button-Up Shirt",
    description: "Professional denim work shirt with embroidered logo on chest.",
    embedCode: null,
  },
  {
    id: "cap",
    name: "White Baseball Cap",
    description: "Classic adjustable cap with embroidered River Region Minority GOP logo.",
    embedCode: null,
  },
  {
    id: "polo",
    name: "Golf Polo",
    description: "Premium golf polo with embroidered logo, perfect for the course.",
    embedCode: null,
  },
];
