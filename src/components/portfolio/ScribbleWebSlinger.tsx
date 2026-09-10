import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useVelocity, useMotionValue } from "framer-motion";

export const ScribbleWebSlinger = () => {
  const [scrollDir, setScrollDir] = useState<"up" | "down" | "idle">("idle");
  const [isHovered, setIsHovered] = useState(false);
  const [showWebLine, setShowWebLine] = useState(false);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 200, damping: 25 });

  // Web line dynamic tension path
  const webLength = useMotionValue(0);
  const smoothWebLength = useSpring(webLength, { stiffness: 300, damping: 28 });

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const unsubscribe = scrollY.on("change", () => {
      const vel = scrollVelocity.get();
      if (vel < -30) {
        setScrollDir("up");
        setShowWebLine(true);
        webLength.set(120);
      } else if (vel > 30) {
        setScrollDir("down");
        setShowWebLine(true);
        webLength.set(160);
      } else {
        timeout = setTimeout(() => {
          setScrollDir("idle");
          setShowWebLine(false);
          webLength.set(0);
        }, 400);
      }
    });

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [scrollY, scrollVelocity, webLength]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto select-none flex flex-col items-end gap-2 group">
      {/* Scribble Web Line Canvas */}
      {showWebLine && (
        <svg
          className="absolute right-7 bottom-12 w-20 h-44 overflow-visible pointer-events-none z-0"
          viewBox="0 0 80 180"
          fill="none"
        >
          {/* Animated Scribble Web Thread */}
          <motion.path
            d={
              scrollDir === "up"
                ? "M 40 180 Q 20 90 40 0 Q 60 -40 40 -80"
                : "M 40 180 Q 70 230 40 280 L 40 320"
            }
            stroke="var(--acid)"
            strokeWidth="2.5"
            strokeDasharray="4 2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.85 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Web Impact Sparkles */}
          <circle cx="40" cy={scrollDir === "up" ? "-80" : "320"} r="4" fill="var(--acid)" />
          <circle cx="34" cy={scrollDir === "up" ? "-74" : "314"} r="2" fill="var(--cream)" />
          <circle cx="46" cy={scrollDir === "up" ? "-84" : "324"} r="2" fill="var(--acid)" />
        </svg>
      )}

      {/* Action Status Tooltip Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={isHovered || scrollDir !== "idle" ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.9 }}
        className="px-3 py-1.5 rounded-full bg-ink/90 border border-acid/40 text-acid font-mono text-[10px] uppercase tracking-widest backdrop-blur-md shadow-xl flex items-center gap-1.5"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-acid animate-ping" />
        {scrollDir === "up" ? "Pulling Web Up ⬆" : scrollDir === "down" ? "Releasing Web Line ⬇" : "Click to Web-Zip Top"}
      </motion.div>

      {/* Scribble Spiderman Character Mascot */}
      <motion.button
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.9 }}
        animate={
          scrollDir === "up"
            ? { y: [-2, -12, -2], rotate: [-4, 4, -4] }
            : scrollDir === "down"
            ? { y: [2, 10, 2], rotate: [4, -4, 4] }
            : { y: [0, -4, 0] }
        }
        transition={{
          y: { repeat: Infinity, duration: scrollDir === "idle" ? 2.5 : 0.4, ease: "easeInOut" },
          rotate: { repeat: Infinity, duration: 0.6, ease: "easeInOut" },
        }}
        className="relative w-14 h-14 rounded-full bg-ink border-2 border-acid/60 hover:border-acid shadow-[0_0_20px_rgba(184,255,0,0.3)] flex items-center justify-center cursor-pointer overflow-visible group/btn"
        aria-label="Scribble Web-Slinger Companion"
      >
        {/* Hand-drawn Scribble Spiderman Mascot SVG */}
        <svg className="w-9 h-9 overflow-visible" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Spiderman Head Mask Outline */}
          <path
            d="M32 8 C18 8 14 20 14 34 C14 48 24 58 32 58 C40 58 50 48 50 34 C50 20 46 8 32 8 Z"
            stroke="var(--cream)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover/btn:stroke-acid transition-colors"
          />

          {/* Web Grid Lines on Mask (Scribble Pattern) */}
          <path
            d="M32 8 L32 58 M14 34 L50 34 M20 20 C28 26 36 26 44 20 M18 46 C28 40 36 40 46 46"
            stroke="var(--muted)"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            opacity="0.6"
          />

          {/* Icon Eyes (Left & Right Spiderman Expressive Eyes) */}
          <motion.path
            d="M20 28 Q 26 24 30 32 Q 24 36 20 28 Z"
            fill="var(--acid)"
            stroke="var(--ink)"
            strokeWidth="1.5"
            animate={scrollDir === "up" ? { scaleY: 1.2 } : scrollDir === "down" ? { scaleY: 0.8 } : { scaleY: 1 }}
          />
          <motion.path
            d="M44 28 Q 38 24 34 32 Q 40 36 44 28 Z"
            fill="var(--acid)"
            stroke="var(--ink)"
            strokeWidth="1.5"
            animate={scrollDir === "up" ? { scaleY: 1.2 } : scrollDir === "down" ? { scaleY: 0.8 } : { scaleY: 1 }}
          />

          {/* Web Shooters Wrist Trigger Flash */}
          <circle cx="32" cy="54" r="3" fill="var(--acid)" className="animate-pulse" />
        </svg>

        {/* Dynamic Glow Aura */}
        <div className="absolute inset-0 rounded-full bg-acid/10 blur-md pointer-events-none group-hover/btn:bg-acid/20 transition-colors" />
      </motion.button>
    </div>
  );
};
