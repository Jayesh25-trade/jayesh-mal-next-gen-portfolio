import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const LABELS: Record<string, string> = {
  "data-cursor-view": "View",
  "data-cursor-drag": "Drag",
  "data-cursor-explore": "Explore",
};

export const MagneticCursor = () => {
  const [label, setLabel] = useState("");
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Buttery spring easing for high-end feel
  const springX = useSpring(cursorX, { stiffness: 350, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 350, damping: 28 });
  const dotX = useSpring(cursorX, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(cursorY, { stiffness: 1000, damping: 50 });

  useEffect(() => {
    if (typeof window === "undefined" || "ontouchstart" in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) {
        setLabel("");
        setIsPointer(false);
        return;
      }

      let foundLabel = "";
      let isPtr = false;

      for (const [attr, lbl] of Object.entries(LABELS)) {
        if (el.closest(`[${attr}]`)) {
          foundLabel = lbl;
          isPtr = true;
          break;
        }
      }

      if (!isPtr) {
        const tag = el.tagName.toLowerCase();
        isPtr =
          ["a", "button", "input", "textarea"].includes(tag) ||
          el.closest("a, button, [role='button']") !== null ||
          window.getComputedStyle(el).cursor === "pointer";
      }

      setLabel(foundLabel);
      setIsPointer(isPtr);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <div className={`pointer-events-none transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      {/* Outer Magnetic Ring */}
      <motion.div
        animate={{
          width: isPointer ? (label ? 84 : 48) : 32,
          height: isPointer ? (label ? 84 : 48) : 32,
          borderColor: isPointer ? "var(--acid)" : "rgba(255, 255, 255, 0.25)",
          backgroundColor: label ? "rgba(184, 255, 0, 0.12)" : isPointer ? "rgba(255, 255, 255, 0.04)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed top-0 left-0 z-[9999] rounded-full border pointer-events-none flex items-center justify-center backdrop-blur-[2px]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {label && (
          <span className="text-acid text-[10px] font-mono font-bold uppercase tracking-widest px-2 text-center">
            {label}
          </span>
        )}
      </motion.div>

      {/* Inner Precision Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPointer ? (label ? 0 : 0.6) : 1,
          opacity: label ? 0 : 1,
        }}
        className="fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-acid pointer-events-none shadow-[0_0_8px_var(--acid)]"
      />
    </div>
  );
};

