import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const KineticPillars = () => {
  const { scrollYProgress } = useScroll();

  // Smooth springs for 60fps kinetic motion
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  // Transforms for Left (Down) & Right (Up) counter-scroll
  const leftY = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);
  const rightY = useTransform(smoothProgress, [0, 1], ["-50%", "0%"]);
  
  // Laser line indicator height transform
  const laserHeight = useTransform(smoothProgress, [0, 1], ["5%", "100%"]);

  // Live scroll percentage state for desktop display
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setScrollPct(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <>
      {/* ── MOBILE FIRST: Top Slim Laser Progress Bar (Always visible on mobile & desktop) ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[1000] pointer-events-none origin-left"
        style={{
          scaleX: smoothProgress,
          background: "var(--acid)",
          boxShadow: "0 0 10px var(--acid), 0 0 20px var(--acid)",
        }}
      />

      {/* ── DESKTOP: Counter-Scrolling Kinetic Pillars (Hidden on mobile for performance) ── */}
      <div className="hidden lg:block pointer-events-none select-none z-30">

        {/* LEFT FLANK PILLAR — Scrolls Down */}
        <div className="fixed left-3 xl:left-6 top-1/2 -translate-y-1/2 h-[65vh] flex items-center gap-3">
          {/* Laser Progress Line Track */}
          <div className="relative h-full w-[1px] bg-white/10 overflow-hidden rounded-full">
            <motion.div
              style={{ height: laserHeight }}
              className="w-full bg-acid shadow-[0_0_12px_#dfff00]"
            />
          </div>

          {/* Kinetic Vertical Typography Pillar */}
          <div className="h-full overflow-hidden flex items-center">
            <motion.div
              style={{
                y: leftY,
                writingMode: "vertical-rl",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "rgba(255, 255, 255, 0.35)",
              }}
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-cream/40 font-semibold flex flex-col gap-12"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-acid inline-block" />
                DESIGN • MOTION • CODE • SCALABILITY • PERFORMANCE
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-acid inline-block" />
                DESIGN • MOTION • CODE • SCALABILITY • PERFORMANCE
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-acid inline-block" />
                DESIGN • MOTION • CODE • SCALABILITY • PERFORMANCE
              </span>
            </motion.div>
          </div>
        </div>

        {/* RIGHT FLANK PILLAR — Scrolls Up (Reverse) */}
        <div className="fixed right-3 xl:right-6 top-1/2 -translate-y-1/2 h-[65vh] flex items-center gap-3">
          {/* Kinetic Vertical Typography Pillar */}
          <div className="h-full overflow-hidden flex items-center">
            <motion.div
              style={{
                y: rightY,
                writingMode: "vertical-rl",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "rgba(255, 255, 255, 0.35)",
              }}
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-cream/40 font-semibold flex flex-col gap-12"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-acid inline-block" />
                JIMMZZZ DEVELOPERS ✦ ZERO TECHNICAL DEBT ✦ EST 2021
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-acid inline-block" />
                JIMMZZZ DEVELOPERS ✦ ZERO TECHNICAL DEBT ✦ EST 2021
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-acid inline-block" />
                JIMMZZZ DEVELOPERS ✦ ZERO TECHNICAL DEBT ✦ EST 2021
              </span>
            </motion.div>
          </div>

          {/* Right Laser Line Track & Live % Display */}
          <div className="relative h-full flex flex-col items-center justify-between py-2">
            <div className="relative h-full w-[1px] bg-white/10 overflow-hidden rounded-full">
              <motion.div
                style={{ height: laserHeight }}
                className="w-full bg-acid shadow-[0_0_12px_#dfff00]"
              />
            </div>
            <span
              className="mt-3 font-mono text-[9px] text-acid font-bold tracking-tighter"
              style={{ writingMode: "vertical-rl" }}
            >
              {scrollPct}%
            </span>
          </div>
        </div>

      </div>

      {/* ── MOBILE FIRST: Kinetic Horizontal Marquee Banner (Mobile & Small Screens) ── */}
      <div className="lg:hidden w-full overflow-hidden border-y border-wire/60 py-2.5 bg-ink/80 backdrop-blur-md relative z-20 pointer-events-none my-6">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          className="flex items-center whitespace-nowrap font-mono text-[11px] text-acid tracking-widest uppercase font-bold gap-6"
        >
          <span>✦ DESIGN • MOTION • FULL-STACK ENGINEERING ✦</span>
          <span>✦ 100% PRODUCTION READY ✦</span>
          <span>✦ ZERO TECHNICAL DEBT ✦</span>
          <span>✦ DESIGN • MOTION • FULL-STACK ENGINEERING ✦</span>
          <span>✦ 100% PRODUCTION READY ✦</span>
          <span>✦ ZERO TECHNICAL DEBT ✦</span>
        </motion.div>
      </div>
    </>
  );
};
