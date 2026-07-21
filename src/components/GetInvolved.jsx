import { useState } from "react";
import { motion } from "framer-motion";
import { getInvolved, org } from "../data/content";

const icons = {
  location: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 21s7-6.5 7-11.5A7 7 0 105 9.5C5 14.5 12 21 12 21z M12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
    />
  ),
  email: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 6h18v12H3z M3 6l9 7 9-7"
    />
  ),
  phone: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4 4h4l2 5-2.5 1.5a11 11 0 005 5L14 13l5 2v4a2 2 0 01-2 2C9.5 21 3 14.5 3 6a2 2 0 011-2z"
    />
  ),
};

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

function SignupForm({ initialInterest }) {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: initialInterest,
    message: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "get-involved", ...form }),
      });
      setStatus("success");
    } catch (err) {
      console.error("Form submission failed", err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-md bg-navy/5 p-6 text-center text-navy-dark">
        Thanks for reaching out — we'll be in touch soon.
      </p>
    );
  }

  return (
    <form
      name="get-involved"
      data-netlify="true"
      onSubmit={handleSubmit}
      className="grid gap-4 sm:grid-cols-2"
    >
      <input type="hidden" name="form-name" value="get-involved" />
      <input
        required
        placeholder="Full name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="rounded-md border border-navy/20 px-4 py-2.5 text-sm focus:border-navy focus:outline-none"
      />
      <input
        required
        type="email"
        placeholder="Email address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="rounded-md border border-navy/20 px-4 py-2.5 text-sm focus:border-navy focus:outline-none"
      />
      <input
        type="tel"
        placeholder="Phone (optional)"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="rounded-md border border-navy/20 px-4 py-2.5 text-sm focus:border-navy focus:outline-none"
      />
      <select
        value={form.interest}
        onChange={(e) => setForm({ ...form, interest: e.target.value })}
        className="rounded-md border border-navy/20 px-4 py-2.5 text-sm focus:border-navy focus:outline-none"
      >
        <option value="Membership">Become a Member</option>
        <option value="Volunteering">Volunteer With Us</option>
        <option value="Both">Both</option>
      </select>
      <textarea
        placeholder="Message (optional)"
        rows={3}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="rounded-md border border-navy/20 px-4 py-2.5 text-sm focus:border-navy focus:outline-none sm:col-span-2"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-md bg-brand-red px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-red-dark disabled:opacity-60 sm:col-span-2"
      >
        {status === "submitting" ? "Sending…" : "Submit"}
      </button>
      {status === "error" && (
        <p className="text-sm text-brand-red sm:col-span-2">
          Something went wrong — please try again.
        </p>
      )}
    </form>
  );
}

export default function GetInvolved() {
  const [interest, setInterest] = useState("Membership");

  return (
    <section id="get-involved" className="bg-offwhite py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl font-bold text-navy-dark sm:text-4xl"
        >
          {getInvolved.heading}
        </motion.h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded bg-brand-red" />
        <p className="mx-auto mt-5 max-w-xl text-navy-light">{getInvolved.intro}</p>

        <div id="contact" className="mt-14 grid gap-8 text-left md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
            className="rounded-xl border border-navy/10 bg-white p-8 shadow-sm"
          >
            <h3 className="font-display text-xl font-bold text-navy-dark">Contact Information</h3>
            <div className="mt-6 space-y-5">
              {[
                { key: "location", label: "Location", value: org.location },
                { key: "email", label: "Email", value: org.email },
                { key: "phone", label: "Phone", value: org.phone },
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy/10">
                    <svg className="h-5 w-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {icons[item.key]}
                    </svg>
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-navy-dark">{item.label}</div>
                    <div className="text-sm text-navy-light">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-xl bg-navy p-8 text-white shadow-sm"
          >
            <h3 className="font-display text-xl font-bold">{getInvolved.joinHeading}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/85">{getInvolved.joinCopy}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#get-involved-form"
                onClick={() => setInterest("Membership")}
                className="flex-1 rounded-md bg-brand-red px-5 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-brand-red-dark"
              >
                Become a Member
              </a>
              <a
                href="#get-involved-form"
                onClick={() => setInterest("Volunteering")}
                className="flex-1 rounded-md border border-white/40 px-5 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                Volunteer With Us
              </a>
            </div>
            <p className="mt-6 text-sm italic text-white/70">{getInvolved.closingTagline}</p>
          </motion.div>
        </div>

        <motion.div
          id="get-involved-form"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-10 max-w-2xl rounded-xl border border-navy/10 bg-white p-8 text-left shadow-sm"
        >
          <SignupForm initialInterest={interest} key={interest} />
        </motion.div>
      </div>
    </section>
  );
}
