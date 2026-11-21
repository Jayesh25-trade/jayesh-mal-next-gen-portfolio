import { motion, useScroll, useSpring } from "framer-motion";

export const KineticPillars = () => {
  const { scrollYProgress } = useScroll();

  // Smooth spring for 60fps laser progress indicator
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <>
      {/* ── Ultra-Slim Top Laser Scroll Progress Bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[1000] pointer-events-none origin-left"
        style={{
          scaleX: smoothProgress,
          background: "linear-gradient(to right, var(--acid), #00E5FF)",
          boxShadow: "0 0 10px rgba(184, 255, 0, 0.6)",
        }}
      />
    </>
  );
};
