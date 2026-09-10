import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const LABELS: Record<string, string> = {
  "data-cursor-view": "View",
  "data-cursor-drag": "Drag",
  "data-cursor-explore": "Explore",
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export const MagneticCursor = () => {
  const [label, setLabel] = useState("");
  const [isPointer, setIsPointer] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 300, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 28 });
  const dotX = useSpring(cursorX, { stiffness: 900, damping: 45 });
  const dotY = useSpring(cursorY, { stiffness: 900, damping: 45 });

  useEffect(() => {
    if (typeof window === "undefined" || "ontouchstart" in window) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#00e5ff", "#dfff00", "#a855f7", "#ff007f"];

    const addParticle = (x: number, y: number) => {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 3 + 1,
        alpha: 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
      if (particlesRef.current.length > 50) {
        particlesRef.current.shift();
      }
    };

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.025;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      addParticle(e.clientX, e.clientY);

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
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      {/* Canvas Phosphor Particle Trail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[9998] pointer-events-none"
        aria-hidden="true"
      />

      {/* Outer ring */}
      <motion.div
        animate={{
          width: isPointer ? (label ? 80 : 44) : 32,
          height: isPointer ? (label ? 80 : 44) : 32,
          opacity: isPointer ? 0.95 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="fixed top-0 left-0 z-[9999] rounded-full border border-acid/80 pointer-events-none flex items-center justify-center mix-blend-difference shadow-[0_0_15px_rgba(223,255,0,0.4)]"
        style={{
          x: springX, y: springY,
          translateX: "-50%", translateY: "-50%",
          backdropFilter: label ? "invert(1)" : "none",
        }}
      >
        {label && (
          <span className="text-acid text-[10px] font-mono font-bold uppercase tracking-widest">
            {label}
          </span>
        )}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        className="fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-acid pointer-events-none shadow-[0_0_10px_#dfff00]"
      />
    </>
  );
};
