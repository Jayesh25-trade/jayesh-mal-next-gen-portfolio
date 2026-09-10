import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useVelocity, useSpring } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

/* Custom minimal cursor that follows mouse */
const EditorialCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] hidden lg:block"
      style={{ background: "var(--acid)", mixBlendMode: "difference", transition: "transform 0.08s linear" }}
    />
  );
};

/* Clip-path curtain reveal per word */
const CurtainWord = ({ word, delay = 0 }: { word: string; delay?: number }) => (
  <span className="inline-block overflow-hidden leading-none">
    <motion.span
      className="inline-block"
      initial={{ y: "110%" }}
      animate={{ y: "0%" }}
      transition={{ delay, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
    >
      {word}
    </motion.span>
  </span>
);

export const Hero = () => {
  const { t } = useI18n();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress, scrollY } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  // Scroll Velocity tracking for kinetic skew
  const scrollVelocity = useVelocity(scrollY);
  const rawSkew = useTransform(scrollVelocity, [-2000, 2000], [-3, 3]);
  const skewY = useSpring(rawSkew, { stiffness: 300, damping: 30 });

  // 4-tier z-space depth parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  const shardY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const words1 = t.hero.title1.split(" ");
  const words2 = t.hero.title2.split(" ");

  return (
    <>
      <EditorialCursor />
      <section
        ref={containerRef}
        id="top"
        className="relative grain aurora-bg overflow-hidden"
        style={{ background: "var(--ink)", minHeight: "100svh" }}
      >
        {/* Tier 1 Depth: Ambient background line */}
        <motion.div
          style={{ y: bgY }}
          className="absolute top-0 left-0 h-[1px] w-[40%] origin-left z-0"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full"
            style={{ background: "var(--acid)", opacity: 0.7 }}
          />
        </motion.div>

        <div className="container-xl relative z-10 pt-32 pb-20 sm:pb-16">
          {/* Availability badge */}
          <motion.div
            style={{ y: shardY }}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-2 mb-10 sm:mb-14"
          >
            <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: "var(--acid)" }} />
            <span className="label-sm text-acid">{t.hero.badge}</span>
          </motion.div>

          {/* HERO LAYOUT: text left + portrait right */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-0">
            {/* LEFT: Massive kinetic headline (10vw) */}
            <motion.div
              style={{ y: textY, skewY, opacity }}
              className="relative flex-1 lg:max-w-none z-10"
            >
              <h1
                className="font-display font-black tracking-tighter leading-none text-cream"
                style={{ fontSize: "var(--h-hero)" }}
              >
                {/* Line 1 */}
                <span className="block">
                  {words1.map((word, i) => (
                    <CurtainWord key={i} word={word} delay={0.3 + i * 0.06} />
                  ))}
                  {" "}
                </span>
                {/* Line 2 — accent colored */}
                <span className="block" style={{ color: "var(--acid)" }}>
                  {words2.map((word, i) => (
                    <CurtainWord
                      key={i}
                      word={word}
                      delay={0.3 + words1.length * 0.06 + i * 0.06}
                    />
                  ))}
                </span>
              </h1>

              {/* Descriptor strip below headline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-8 sm:mt-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-10 max-w-[720px]"
              >
                <p
                  className="text-base sm:text-lg leading-relaxed max-w-[380px]"
                  style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
                >
                  {t.hero.subtitle}
                </p>

                {/* CTA buttons */}
                <div className="flex items-center gap-3 shrink-0">
                  <a href="#work" className="btn-primary">
                    {t.hero.ctaWork}
                    <ArrowDownRight className="w-4 h-4" />
                  </a>
                  <a href="#contact" className="btn-ghost">{t.hero.ctaContact}</a>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT: Portrait with 70% depth parallax */}
            <motion.div
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ y: portraitY }}
              className="relative lg:absolute lg:right-0 lg:bottom-0 lg:w-[38%] xl:w-[34%] h-[360px] sm:h-[480px] lg:h-[90vh] mt-10 lg:mt-0 z-0"
              data-cursor-view
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src="/jayesh-portrait.jpg"
                  alt="Jayesh Mal — founder of Jimmzzz Developers"
                  className="w-full h-full object-cover object-top"
                  style={{ filter: "grayscale(20%) contrast(1.05)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, var(--ink) 0%, transparent 40%)",
                  }}
                />
                <div
                  className="absolute inset-0 hidden lg:block"
                  style={{
                    background: "linear-gradient(to right, var(--ink) 0%, transparent 30%)",
                  }}
                />
              </div>

              {/* Floating meta tag */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="absolute bottom-16 left-4 sm:left-6 tag glass-slab"
                style={{ color: "var(--text)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-acid" />
                Available now
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom strip: stats preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="container-xl pb-8 lg:pb-10 z-10 relative"
          style={{ borderTop: "1px solid var(--wire)" }}
        >
          <div className="flex items-center gap-8 sm:gap-14 pt-6 overflow-x-auto">
            {[
              { n: "20+", l: "Projects shipped" },
              { n: "15+", l: "Happy clients" },
              { n: "3+", l: "Years" },
              { n: "99%", l: "Client retention" },
            ].map(({ n, l }) => (
              <div key={l} className="shrink-0">
                <span className="font-display font-black text-2xl sm:text-3xl text-acid">{n}</span>
                <span className="ml-2 text-xs sm:text-sm text-muted font-body">{l}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-6 right-6 sm:right-10 flex flex-col items-end gap-1 z-10"
        >
          <span className="label-sm">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            className="w-[1px] h-8 self-center bg-wire-2"
          />
        </motion.div>
      </section>
    </>
  );
};
