import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionQuote {
  id: string;
  minProgress: number;
  maxProgress: number;
  pose: "perch" | "point" | "web_shoot" | "hang_upside_down" | "zipline" | "stand_hero" | "dual_shoot" | "relax" | "contact_shoot";
  message: string;
}

const SECTION_QUOTES: SectionQuote[] = [
  {
    id: "hero",
    minProgress: 0,
    maxProgress: 0.08,
    pose: "perch",
    message: "Hey! I'm Jayesh's Mascot 🕸️ Scroll down to explore!",
  },
  {
    id: "stats",
    minProgress: 0.08,
    maxProgress: 0.15,
    pose: "stand_hero",
    message: "60 FPS Motion, zero technical debt & ultra speed ⚡",
  },
  {
    id: "about",
    minProgress: 0.15,
    maxProgress: 0.25,
    pose: "point",
    message: "Led by Jayesh Mal — crafting high-impact digital experiences!",
  },
  {
    id: "values",
    minProgress: 0.25,
    maxProgress: 0.38,
    pose: "web_shoot",
    message: "Why work with us? Modern engineering meets business growth! 🔥",
  },
  {
    id: "featured",
    minProgress: 0.38,
    maxProgress: 0.48,
    pose: "hang_upside_down",
    message: "Check out our featured production platforms 👀",
  },
  {
    id: "projects",
    minProgress: 0.48,
    maxProgress: 0.58,
    pose: "zipline",
    message: "8+ enterprise projects shipped with zero compromise!",
  },
  {
    id: "process",
    minProgress: 0.58,
    maxProgress: 0.68,
    pose: "zipline",
    message: "4 Engineering Phases: Blueprint → Architecture → Motion → Ship 🚀",
  },
  {
    id: "services",
    minProgress: 0.68,
    maxProgress: 0.77,
    pose: "stand_hero",
    message: "Full-Stack Architecture: Next.js, Node, PostgreSQL & WebGL ⚡",
  },
  {
    id: "stack",
    minProgress: 0.77,
    maxProgress: 0.85,
    pose: "dual_shoot",
    message: "Equipped with the ultimate modern engineering arsenal!",
  },
  {
    id: "testimonials",
    minProgress: 0.85,
    maxProgress: 0.91,
    pose: "relax",
    message: "Trusted by founders & teams worldwide ⭐",
  },
  {
    id: "faq",
    minProgress: 0.91,
    maxProgress: 0.96,
    pose: "relax",
    message: "Got questions? We've got clear, transparent answers!",
  },
  {
    id: "contact",
    minProgress: 0.96,
    maxProgress: 1.0,
    pose: "contact_shoot",
    message: "You made it! Let's build something extraordinary together 📩",
  },
];

export const InteractiveRopeMascot = () => {
  const [mascotY, setMascotY] = useState(100);
  const [ropeCurve, setRopeCurve] = useState(0);
  const [activeQuote, setActiveQuote] = useState<SectionQuote>(SECTION_QUOTES[0]);

  const requestRef = useRef<number>();
  const lastScrollY = useRef(0);
  const currentY = useRef(100);
  const targetY = useRef(100);
  const velocity = useRef(0);
  const time = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(Math.max(scrollY / totalHeight, 0), 1) : 0;

      // Calculate vertical pixel target for mascot
      const minY = 90;
      const maxY = window.innerHeight - 140;
      targetY.current = minY + progress * (maxY - minY);

      // Scroll velocity calculation for dynamic tension bowing
      const delta = scrollY - lastScrollY.current;
      velocity.current = delta;
      lastScrollY.current = scrollY;

      // Match current section quote based on scroll progress
      const found = SECTION_QUOTES.find(
        (q) => progress >= q.minProgress && progress <= q.maxProgress
      );
      if (found && found.id !== activeQuote.id) {
        setActiveQuote(found);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // 60FPS Physics Animation Loop
    const animate = () => {
      time.current += 0.04;

      // Lerp vertical position with spring dampening
      currentY.current += (targetY.current - currentY.current) * 0.12;

      // Decay velocity for smooth inertia
      velocity.current *= 0.88;

      // Combine idle sine-wave sway with velocity bowed tension
      const idleSway = Math.sin(time.current * 2.5) * 8;
      const velocityFlex = Math.max(-25, Math.min(25, velocity.current * 0.4));
      const totalCurve = idleSway + velocityFlex;

      setMascotY(currentY.current);
      setRopeCurve(totalCurve);

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [activeQuote.id]);

  // Rope SVG Path Generator (Dynamic Quad Bezier)
  const ropeX = 36;
  const ropePath = `M ${ropeX} 0 Q ${ropeX + ropeCurve} ${mascotY / 2} ${ropeX} ${mascotY} Q ${ropeX - ropeCurve * 0.5} ${(mascotY + window.innerHeight) / 2} ${ropeX} ${window.innerHeight}`;

  return (
    <div className="fixed right-3 sm:right-8 top-0 bottom-0 w-24 sm:w-28 z-40 pointer-events-none select-none">
      {/* ── Dynamic Physics SVG Rope Track ── */}
      <svg className="absolute inset-0 w-full h-full overflow-visible">
        {/* Glow backdrop rope */}
        <path
          d={ropePath}
          fill="none"
          stroke="var(--acid)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.3"
          className="filter drop-shadow-[0_0_8px_#b8ff00]"
        />
        {/* Core neon wire rope */}
        <path
          d={ropePath}
          fill="none"
          stroke="var(--acid)"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          strokeLinecap="round"
        />
      </svg>

      {/* ── Interactive Vector Spider-Mascot Container ── */}
      <div
        className="absolute left-0 flex items-center justify-center transition-transform"
        style={{
          top: `${mascotY}px`,
          transform: `translate(-50%, -50%) translateX(${ropeCurve * 0.4}px)`,
        }}
      >
        {/* Floating Handwritten Cyber Dialogue Capsule */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeQuote.id}
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-16 sm:right-20 w-48 sm:w-60 p-3 sm:p-3.5 rounded-xl border pointer-events-auto shadow-2xl"
            style={{
              background: "rgba(12, 12, 12, 0.95)",
              borderColor: "rgba(184, 255, 0, 0.4)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(184, 255, 0, 0.15)",
            }}
          >
            {/* Speech bubble arrow pointer */}
            <div
              className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-l-8"
              style={{ borderLeftColor: "rgba(184, 255, 0, 0.5)" }}
            />

            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-acid animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-acid font-bold">
                SPIDER-BOT • SYSTEM LOG
              </span>
            </div>

            <p
              className="text-xs sm:text-sm font-display font-bold leading-snug tracking-tight text-cream"
              style={{ color: "#F2EDE4" }}
            >
              {activeQuote.message}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* ── Vector Spider-Mascot Character Model ── */}
        <motion.div
          animate={{
            rotate: ropeCurve * 0.8,
            scale: [1, 1.03, 1],
          }}
          transition={{
            rotate: { duration: 0.1 },
            scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
          }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center cursor-pointer pointer-events-auto"
        >
          {/* Cyber Aura Pulse */}
          <div className="absolute inset-0 rounded-full bg-acid/20 blur-md animate-pulse" />

          {/* SVG Vector Mascot Body */}
          <svg className="w-full h-full relative z-10" viewBox="0 0 100 100">
            {/* Hanging Web Thread */}
            <line x1="50" y1="0" x2="50" y2="25" stroke="var(--acid)" strokeWidth="2.5" strokeDasharray="3 2" />

            {/* Mascot Head Capsule */}
            <circle cx="50" cy="50" r="28" fill="#0C0C0C" stroke="var(--acid)" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="28" fill="rgba(184, 255, 0, 0.06)" />

            {/* Spider Eye Left (Glowing Hexagon/Oval) */}
            <polygon points="34,45 44,40 44,52 34,55" fill="#B8FF00" />
            <circle cx="39" cy="47" r="2" fill="#0C0C0C" />

            {/* Spider Eye Right */}
            <polygon points="66,45 56,40 56,52 66,55" fill="#B8FF00" />
            <circle cx="61" cy="47" r="2" fill="#0C0C0C" />

            {/* Spider Emblem Mask Accent */}
            <path d="M 44 58 L 50 66 L 56 58 L 50 61 Z" fill="var(--acid)" />

            {/* Pose Variations overlay */}
            {activeQuote.pose === "web_shoot" && (
              <>
                {/* Acid Web Shooter Beam to Left */}
                <line x1="30" y1="50" x2="-60" y2="40" stroke="#B8FF00" strokeWidth="2.5" strokeDasharray="4 2" className="animate-pulse" />
                <circle cx="-60" cy="40" r="4" fill="#B8FF00" />
              </>
            )}

            {activeQuote.pose === "dual_shoot" && (
              <>
                <line x1="30" y1="50" x2="-50" y2="30" stroke="#B8FF00" strokeWidth="2" strokeDasharray="3 2" />
                <line x1="30" y1="55" x2="-50" y2="70" stroke="#00E5FF" strokeWidth="2" strokeDasharray="3 2" />
              </>
            )}

            {activeQuote.pose === "contact_shoot" && (
              <path d="M 35 60 Q 10 90 -40 120" fill="none" stroke="#B8FF00" strokeWidth="2" strokeDasharray="4 2" />
            )}

            {/* Interactive Glow Ring */}
            <circle cx="50" cy="50" r="33" fill="none" stroke="var(--acid)" strokeWidth="1" strokeDasharray="6 8" opacity="0.6" className="animate-spin-slow" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};
