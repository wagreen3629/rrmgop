import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { chapters } from "../data/content";

const images = import.meta.glob("../assets/images/*.{jpg,jpeg,webp,png}", {
  eager: true,
  import: "default",
});

function imageFor(name) {
  const match = Object.entries(images).find(([path]) => path.includes(`/${name}.`));
  return match ? match[1] : undefined;
}

const VH_PER_CHAPTER = 140;

function ChapterLayer({ chapter, index, total, scrollYProgress }) {
  const isFirst = index === 0;
  const segment = 1 / total;
  const entryFade = segment * 0.35;
  const fadeEnd = index * segment;
  const fadeStart = Math.max(0, fadeEnd - entryFade);
  const segmentEnd = (index + 1) * segment;

  // Chapter One is visible the moment the page loads, so it has nothing to
  // fade in from; every later chapter crossfades in over the tail of the
  // previous one's segment. All input ranges must stay within [0, 1] and be
  // non-decreasing or Framer Motion's WAAPI-accelerated bindings throw.
  const opacityRange = isFirst ? [0, 0.001] : [fadeStart, fadeEnd];
  const opacityOutput = isFirst ? [1, 1] : [0, 1];
  const scaleRange = isFirst ? [0, segmentEnd] : [fadeStart, fadeEnd, segmentEnd];
  const scaleOutput = isFirst ? [1.02, 0.94] : [1.16, 1.02, 0.94];
  const textYOutput = isFirst ? [0, 0] : [32, 0];

  const opacity = useTransform(scrollYProgress, opacityRange, opacityOutput);
  const scale = useTransform(scrollYProgress, scaleRange, scaleOutput);
  const textY = useTransform(scrollYProgress, opacityRange, textYOutput);
  const textOpacity = useTransform(scrollYProgress, opacityRange, opacityOutput);

  const HeadingTag = isFirst ? "h1" : "h2";

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div style={{ scale }} className="absolute inset-0 will-change-transform">
        <img src={imageFor(chapter.image)} alt="" className="absolute inset-0 h-full w-full object-cover" />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/45 to-navy-dark/25" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(20,41,67,0.55)_100%)]" />

      <div className="absolute inset-x-0 bottom-0">
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="mx-auto w-full max-w-6xl px-6 pb-[12vh] will-change-transform"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              {chapter.number} — {chapter.title}
            </span>
          </div>

          <HeadingTag className="font-display max-w-4xl text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl">
            {chapter.title}
          </HeadingTag>

          <p className="mt-5 max-w-xl text-lg text-white/90 sm:text-xl">{chapter.copy}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ChapterScroll() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const tickOpacity = useTransform(scrollYProgress, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);

  return (
    <div
      ref={containerRef}
      id="home"
      className="relative"
      style={{ height: `${chapters.length * VH_PER_CHAPTER}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {chapters.map((chapter, i) => (
          <ChapterLayer
            key={chapter.number}
            chapter={chapter}
            index={i}
            total={chapters.length}
            scrollYProgress={scrollYProgress}
          />
        ))}

        <motion.div
          style={{ opacity: tickOpacity }}
          className="pointer-events-none absolute right-5 top-1/2 z-10 hidden h-40 w-px -translate-y-1/2 bg-white/20 md:block"
        >
          <motion.div style={{ scaleY: scrollYProgress }} className="h-full w-full origin-top bg-gold" />
        </motion.div>

        <motion.div
          style={{ opacity: tickOpacity }}
          className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        >
          <svg width="20" height="32" viewBox="0 0 20 32" fill="none" className="text-white/70">
            <rect x="1" y="1" width="18" height="30" rx="9" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="10" cy="10" r="2" fill="currentColor" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
