import { motion } from "framer-motion";
import { values } from "../data/content";
import economicImg from "../assets/images/city-auditorium.jpg";
import familiesImg from "../assets/images/values-community.jpg";
import educationImg from "../assets/images/volunteers-working.jpg";

const images = [economicImg, familiesImg, educationImg];

export default function Values() {
  return (
    <section id="values" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl font-bold text-navy-dark sm:text-4xl"
          >
            Our Core Values
          </motion.h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded bg-brand-red" />
          <p className="mx-auto mt-5 max-w-xl text-navy-light">
            The principles that guide our work and unite our community
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="overflow-hidden rounded-lg border border-navy/10 shadow-sm"
            >
              <img src={images[i]} alt="" className="h-48 w-full object-cover" />
              <div className="p-6">
                <div className="mb-3 h-1 w-10 rounded bg-brand-red" />
                <h3 className="font-display text-xl font-bold text-navy-dark">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-light">{v.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
