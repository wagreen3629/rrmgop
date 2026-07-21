import { motion } from "framer-motion";
import { mission } from "../data/content";

export default function Mission() {
  return (
    <section id="mission" className="bg-offwhite py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl font-bold text-navy-dark sm:text-4xl"
        >
          {mission.heading}
        </motion.h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded bg-brand-red" />

        <div className="mt-8 space-y-5">
          {mission.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-lg leading-relaxed text-navy-light"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
