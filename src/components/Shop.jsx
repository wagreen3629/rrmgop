import { useState } from "react";
import { motion } from "framer-motion";
import { products } from "../data/products";

const images = import.meta.glob("../assets/images/*.{jpg,jpeg,webp,png}", {
  eager: true,
  import: "default",
});

function imageFor(name) {
  const match = Object.entries(images).find(([path]) => path.includes(`/${name}.`));
  return match ? match[1] : undefined;
}

function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

function ProductCard({ product, index }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="overflow-hidden rounded-lg border border-navy/10 shadow-sm"
    >
      <div className="flex h-72 items-center justify-center bg-offwhite">
        <img
          src={imageFor(product.images[activeImage])}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>
      {product.images.length > 1 && (
        <div className="flex justify-center gap-2 border-t border-navy/10 bg-white py-2">
          {product.images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActiveImage(i)}
              className={`h-14 w-14 overflow-hidden rounded border ${
                activeImage === i ? "border-navy" : "border-navy/15"
              }`}
            >
              <img src={imageFor(img)} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="p-6">
        <h3 className="font-display text-lg font-bold text-navy-dark">{product.name}</h3>
        <p className="mt-1.5 text-sm text-navy-light">{product.description}</p>
        {product.colors && (
          <p className="mt-2 text-xs font-medium uppercase tracking-wide text-navy-light/70">
            Colors: {product.colors.join(", ")}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-lg font-bold text-navy">
            {formatPrice(product.priceCents)}
          </span>
          <a
            href={product.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-brand-red px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-red-dark"
          >
            Buy Now
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Shop() {
  return (
    <section id="shop" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <svg className="mx-auto h-10 w-10 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M6 6h15l-1.5 9h-13z M6 6L5 3H2 M9 21a1 1 0 100-2 1 1 0 000 2z M18 21a1 1 0 100-2 1 1 0 000 2z"
          />
        </svg>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6 }}
          className="mt-4 font-display text-3xl font-bold text-navy-dark sm:text-4xl"
        >
          Official Merchandise
        </motion.h2>
        <p className="mx-auto mt-4 max-w-xl text-navy-light">
          Show your support with our exclusive merchandise. All proceeds help fund our community
          initiatives.
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
