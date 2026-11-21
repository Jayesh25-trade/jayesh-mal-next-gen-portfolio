import { motion, useScroll, useTransform } from "framer-motion";
import { useIsDeck } from "@/hooks/use-deck";

/**
 * Phone replacement for the WebGL canvas: a drawn perspective grid, one drifting
 * light and a vignette. Two transforms on scroll, no shaders, no battery cost.
 */
export const Atmosphere = () => {
  const isDeck = useIsDeck();
  const { scrollYProgress } = useScroll();

  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const glowO = useTransform(scrollYProgress, [0, 0.2, 0.65], [1, 0.75, 0.4]);

  if (!isDeck) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      <motion.div style={{ y: glowY, opacity: glowO }} className="absolute inset-0">
        <div className="atmos-glow absolute inset-[-20%]" />
      </motion.div>

      <motion.div style={{ y: gridY }} className="absolute inset-x-0 top-0 h-[130%]">
        <div className="atmos-grid absolute inset-0" />
      </motion.div>

      <div className="atmos-vignette absolute inset-0" />
    </div>
  );
};
