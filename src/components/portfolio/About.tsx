import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

/* Curtain reveal used for the pull-quote */
const Curtain = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        animate={inView ? { y: "0%" } : { y: "105%" }}
        initial={{ y: "105%" }}
        transition={{ delay, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const ABOUT_POINTS = [
  "Pixel-perfect UI built with React, Next.js & Tailwind",
  "Scalable backends with Node, PostgreSQL & Supabase",
  "Conversion-focused design with motion & micro-interactions",
  "SEO, Core Web Vitals & accessibility — built in",
];

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const lineScale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative grain"
      style={{ background: "var(--cream)", color: "var(--ink)", paddingBlock: "var(--section-py)" }}
    >
      {/* Dot grid texture */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="container-xl relative">
        {/* ─── Top row: section label + index ─── */}
        <div className="flex items-center justify-between mb-12 sm:mb-16">
          <span className="label-sm" style={{ color: "var(--muted-2)" }}>About us</span>
          <span className="label-sm" style={{ color: "var(--muted-2)" }}>02</span>
        </div>

        {/* ─── Main: 30/70 asymmetric split ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_5fr] gap-10 lg:gap-20">

          {/* LEFT narrow: oversized pull-quote number / accent */}
          <div className="flex flex-col justify-between">
            {/* Big oversized "03" marker */}
            <div
              className="font-display font-black select-none hidden lg:block"
              style={{ fontSize: "clamp(80px, 10vw, 130px)", color: "var(--cream-2)", lineHeight: 1, letterSpacing: "-0.04em" }}
              aria-hidden
            >
              JD.
            </div>
            {/* Animated rule */}
            <div className="mt-8 lg:mt-0 flex flex-col gap-4">
              <motion.div
                style={{ scaleX: lineScale, transformOrigin: "left", background: "var(--ink)", height: "1px" }}
                className="w-full"
              />
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}>
                Since 2021, building fast and thoughtfully.
              </p>
            </div>
          </div>

          {/* RIGHT wide: content */}
          <div>
            {/* Pull-quote in oversized Syne */}
            <Curtain delay={0.1}>
              <p
                className="font-display font-bold leading-tight tracking-tighter"
                style={{ fontSize: "clamp(26px, 3.5vw, 48px)", color: "var(--ink)" }}
              >
                We are{" "}
                <em className="not-italic" style={{ color: "inherit" }}>Jimmzzz Developers</em>
                {" "}— a next-gen web development agency building products people love.
              </p>
            </Curtain>

            {/* Body text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 sm:mt-8 text-base sm:text-lg leading-relaxed max-w-xl"
              style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
            >
              Led by founder Jayesh Mal, our studio obsesses over performance, motion,
              and the tiny details that make a product feel premium. We design and
              engineer modern web experiences end-to-end — from concept to production.
            </motion.p>

            {/* Fact list — staggered */}
            <ul className="mt-8 sm:mt-10 space-y-0">
              {ABOUT_POINTS.map((pt, i) => (
                <motion.li
                  key={pt}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.1 + 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-4 py-4 text-sm sm:text-base"
                  style={{
                    borderBottom: "1px solid var(--cream-2)",
                    color: "var(--ink)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <span
                    className="shrink-0 font-display font-black text-xs"
                    style={{ color: "var(--acid-dim)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {pt}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
