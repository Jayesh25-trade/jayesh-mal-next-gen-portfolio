import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const LABELS: Record<string, string> = {
  "data-cursor-view": "View",
  "data-cursor-drag": "Drag",
  "data-cursor-explore": "Explore",
};

export const MagneticCursor = () => {
  const [label, setLabel] = useState("");
  const [isPointer, setIsPointer] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 300, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 28 });
  const dotX = useSpring(cursorX, { stiffness: 900, damping: 45 });
  const dotY = useSpring(cursorY, { stiffness: 900, damping: 45 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check for special cursor elements
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) { setLabel(""); setIsPointer(false); return; }

      let foundLabel = "";
      let isPtr = false;

      for (const [attr, lbl] of Object.entries(LABELS)) {
        if (el.closest(`[${attr}]`)) { foundLabel = lbl; isPtr = true; break; }
      }

      if (!isPtr) {
        const tag = el.tagName.toLowerCase();
        isPtr = ["a", "button"].includes(tag) || 
                el.closest("a, button") !== null ||
                window.getComputedStyle(el).cursor === "pointer";
      }

      setLabel(foundLabel);
      setIsPointer(isPtr);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  // Hide on mobile
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        animate={{
          width: isPointer ? (label ? 80 : 40) : 32,
          height: isPointer ? (label ? 80 : 40) : 32,
          opacity: isPointer ? 0.9 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="fixed top-0 left-0 z-[9999] rounded-full border border-neon-cyan/60 pointer-events-none flex items-center justify-center mix-blend-difference"
        style={{
          x: springX, y: springY,
          translateX: "-50%", translateY: "-50%",
          backdropFilter: label ? "invert(1)" : "none",
        }}
      >
        {label && (
          <span className="text-white text-[10px] font-semibold uppercase tracking-wider">
            {label}
          </span>
        )}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        className="fixed top-0 left-0 z-[9999] w-1.5 h-1.5 rounded-full bg-neon-cyan pointer-events-none"
      />
    </>
  );
};
