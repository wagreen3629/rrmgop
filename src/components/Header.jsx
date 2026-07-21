import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";
import { nav, org } from "../data/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-white/95 shadow-md backdrop-blur" : "bg-white/10 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <a href="#home" className="flex items-center gap-3">
          <img src={logo} alt={`${org.name} emblem`} className="h-12 w-12" />
          <div className="leading-tight">
            <div
              className={`font-display text-lg font-bold transition-colors ${
                scrolled ? "text-navy" : "text-white"
              }`}
            >
              {org.name}
            </div>
            <div
              className={`text-xs font-medium tracking-wide transition-colors ${
                scrolled ? "text-navy-light" : "text-white/80"
              }`}
            >
              {org.tagline}
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold transition-colors hover:text-brand-red ${
                scrolled ? "text-navy-dark" : "text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#get-involved"
          className="hidden rounded-md bg-brand-red px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-red-dark md:inline-block"
        >
          Get Involved
        </a>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span className={`h-0.5 w-6 ${scrolled ? "bg-navy-dark" : "bg-white"}`} />
          <span className={`h-0.5 w-6 ${scrolled ? "bg-navy-dark" : "bg-white"}`} />
          <span className={`h-0.5 w-6 ${scrolled ? "bg-navy-dark" : "bg-white"}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-white shadow-lg md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 text-sm font-semibold text-navy-dark"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#get-involved"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-md bg-brand-red px-5 py-2.5 text-center text-sm font-bold text-white"
              >
                Get Involved
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
