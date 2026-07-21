import { useState } from "react";
import { motion } from "framer-motion";
import { products } from "../data/products";

function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

function ProductCard({ product, index }) {
  const [loading, setLoading] = useState(false);
  const ready = Boolean(product.printfulVariantId);

  async function handleBuy() {
    setLoading(true);
    try {
      const res = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout failed", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="overflow-hidden rounded-lg border border-navy/10 shadow-sm"
    >
      <div className="flex h-56 items-center justify-center bg-gradient-to-br from-offwhite to-navy/5">
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-sm font-medium text-navy-light/60">Mockup coming soon</span>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-display text-lg font-bold text-navy-dark">{product.name}</h3>
        <p className="mt-1.5 text-sm text-navy-light">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-lg font-bold text-navy">
            {formatPrice(product.priceCents)}
          </span>
          <button
            type="button"
            onClick={handleBuy}
            disabled={!ready || loading}
            className={`rounded-md px-4 py-2 text-sm font-bold transition-colors ${
              ready
                ? "bg-brand-red text-white hover:bg-brand-red-dark"
                : "cursor-not-allowed bg-navy/10 text-navy-light/50"
            }`}
          >
            {ready ? (loading ? "Loading…" : "Buy Now") : "Coming Soon"}
          </button>
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
