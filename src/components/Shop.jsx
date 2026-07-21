import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { products } from "../data/products";

// Renders a third-party embed snippet (markup + <script> tags). Script tags
// inserted via innerHTML never execute, so each one is recreated manually.
function PrintfulEmbed({ embedCode }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!embedCode || !container) return;

    container.innerHTML = "";
    const template = document.createElement("template");
    template.innerHTML = embedCode.trim();

    Array.from(template.content.childNodes).forEach((node) => {
      if (node.nodeType === 1 && node.tagName === "SCRIPT") {
        const script = document.createElement("script");
        Array.from(node.attributes).forEach((attr) => script.setAttribute(attr.name, attr.value));
        script.textContent = node.textContent;
        container.appendChild(script);
      } else {
        container.appendChild(node.cloneNode(true));
      }
    });
  }, [embedCode]);

  return <div ref={containerRef} />;
}

function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="overflow-hidden rounded-lg border border-navy/10 shadow-sm"
    >
      <div className="p-6">
        <h3 className="font-display text-lg font-bold text-navy-dark">{product.name}</h3>
        <p className="mt-1.5 text-sm text-navy-light">{product.description}</p>

        <div className="mt-4">
          {product.embedCode ? (
            <PrintfulEmbed embedCode={product.embedCode} />
          ) : (
            <span className="inline-block rounded-md bg-navy/10 px-4 py-2 text-sm font-bold text-navy-light/50">
              Coming Soon
            </span>
          )}
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
