import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY     = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity   = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const words1 = t.hero.title1.split(" ");
  const words2 = t.hero.title2.split(" ");
  const allWords = [...words1, ...words2];

  return (
    <>
      <EditorialCursor />
      <section
        ref={containerRef}
        id="top"
        className="relative grain overflow-hidden"
        style={{ background: "var(--ink)", minHeight: "100svh" }}
      >
        {/* ─── Accent line top-left ─── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 h-[1px] w-[40%] origin-left"
          style={{ background: "var(--acid)", opacity: 0.7 }}
        />

        <div className="container-xl relative z-10 pt-32 pb-20 sm:pb-16">
          {/* ─── Availability badge — top left ─── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-2 mb-10 sm:mb-14"
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--acid)" }} />
            <span className="label-sm">{t.hero.badge}</span>
          </motion.div>

          {/* ─── HERO LAYOUT: text left + portrait right ─── */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-0">

            {/* LEFT: Massive headline (10vw) — left-aligned, breaks grid right edge */}
            <motion.div
              style={{ y: textY, opacity }}
              className="relative flex-1 lg:max-w-none"
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

              {/* ─── Descriptor strip below headline ─── */}
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

                {/* CTA — placed right of subtitle, not centered below headline */}
                <div className="flex items-center gap-3 shrink-0">
                  <a href="#work" className="btn-primary">
                    {t.hero.ctaWork}
                    <ArrowDownRight className="w-4 h-4" />
                  </a>
                  <a href="#contact" className="btn-ghost">{t.hero.ctaContact}</a>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT: Portrait — tall, crops on left edge, parallaxes up */}
            <motion.div
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ y: portraitY }}
              className="relative lg:absolute lg:right-0 lg:bottom-0 lg:w-[38%] xl:w-[34%] h-[360px] sm:h-[480px] lg:h-[90vh] mt-10 lg:mt-0"
              data-cursor-view
            >
              {/* Duotone-treated portrait */}
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src="/jayesh-portrait.jpg"
                  alt="Jayesh Mal — founder of Jimmzzz Developers"
                  className="w-full h-full object-cover object-top"
                  style={{ filter: "grayscale(20%) contrast(1.05)" }}
                />
                {/* Bottom gradient fade into background */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, var(--ink) 0%, transparent 40%)",
                  }}
                />
                {/* Left edge fade */}
                <div
                  className="absolute inset-0 hidden lg:block"
                  style={{
                    background: "linear-gradient(to right, var(--ink) 0%, transparent 30%)",
                  }}
                />
              </div>

              {/* Floating meta tags on portrait */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="absolute bottom-16 left-4 sm:left-6 tag"
                style={{ background: "var(--ink-2)", borderColor: "var(--wire-2)", color: "var(--text)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--acid)" }} />
                Available now
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ─── Bottom strip: stats preview ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="container-xl pb-8 lg:pb-10"
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
                <span className="font-display font-black text-2xl sm:text-3xl" style={{ color: "var(--acid)" }}>{n}</span>
                <span className="ml-2 text-xs sm:text-sm" style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>{l}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-6 right-6 sm:right-10 flex flex-col items-end gap-1"
        >
          <span className="label-sm">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            className="w-[1px] h-8 self-center"
            style={{ background: "var(--wire-2)" }}
          />
        </motion.div>
      </section>
    </>
  );
};
