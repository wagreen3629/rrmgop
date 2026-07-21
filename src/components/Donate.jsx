import { motion } from "framer-motion";
import { donate } from "../data/content";

export default function Donate() {
  return (
    <section id="donate" className="bg-offwhite py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <svg className="mx-auto h-10 w-10 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 21c-4.97-3.6-9-7.05-9-11.2C3 6.9 5.2 5 7.7 5c1.6 0 3.1.8 4.3 2.2C13.2 5.8 14.7 5 16.3 5 18.8 5 21 6.9 21 9.8c0 4.15-4.03 7.6-9 11.2z"
          />
        </svg>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6 }}
          className="mt-4 font-display text-3xl font-bold text-navy-dark sm:text-4xl"
        >
          {donate.heading}
        </motion.h2>

        <p className="mx-auto mt-5 max-w-2xl text-navy-light">{donate.intro}</p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-10 max-w-md rounded-xl border border-navy/10 bg-white p-8 shadow-md"
        >
          <h3 className="font-display text-xl font-bold text-navy-dark">{donate.cardHeading}</h3>
          <p className="mt-3 text-sm leading-relaxed text-navy-light">{donate.cardCopy}</p>
          <a
            href={donate.anedotUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block w-full rounded-md bg-navy px-6 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-navy-dark"
          >
            Donate Now
          </a>
          <p className="mt-3 text-xs text-navy-light/70">{donate.secureNote}</p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {donate.funds.map((f) => (
            <div key={f.title} className="rounded-lg border border-navy/10 bg-white p-5 text-left shadow-sm">
              <h4 className="font-display text-base font-bold text-navy-dark">{f.title}</h4>
              <p className="mt-1.5 text-sm text-navy-light">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
