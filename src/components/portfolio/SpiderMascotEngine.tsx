import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ── Pose 1: Rooftop Perch (Hero Stage 1) ── */
const RooftopPerchSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
    {/* Skyscraper Steel Beam */}
    <rect x="10" y="75" width="80" height="12" fill="var(--wire)" rx="2" />
    <line x1="15" y1="81" x2="85" y2="81" stroke="var(--wire-2)" strokeWidth="2" strokeDasharray="4 4" />

    {/* Spider Mascot Crouched Body */}
    <path
      d="M30 75 Q 25 55 40 45 Q 50 40 60 45 Q 75 55 70 75 Z"
      fill="var(--ink)"
      stroke="var(--acid)"
      strokeWidth="3"
    />
    {/* Spider Head */}
    <ellipse cx="50" cy="35" rx="14" ry="16" fill="var(--ink)" stroke="var(--acid)" strokeWidth="3" />
    {/* Web Pattern on Mask */}
    <path d="M50 19 L50 51 M36 35 L64 35" stroke="var(--acid-dim)" strokeWidth="1.5" strokeDasharray="2 2" />
    {/* Glowing Eyes */}
    <polygon points="40,30 46,27 48,34 42,37" fill="var(--acid)" />
    <polygon points="60,30 54,27 52,34 58,37" fill="var(--acid)" />
    {/* Wrist Web Shooter Glow */}
    <circle cx="66" cy="62" r="4" fill="var(--acid)" className="animate-ping" />
  </svg>
);

/* ── Pose 2: Reticle Target Aim (About/Values Stage 2) ── */
const ReticleAimSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
    {/* Spider Body Crouched Forward */}
    <path
      d="M20 70 Q 30 40 50 42 Q 70 44 80 65 Q 65 80 35 78 Z"
      fill="var(--ink)"
      stroke="var(--acid)"
      strokeWidth="3"
    />
    {/* Head Turned Toward Reticle */}
    <ellipse cx="40" cy="32" rx="15" ry="14" fill="var(--ink)" stroke="var(--acid)" strokeWidth="3" />
    <polygon points="32,27 38,25 40,32 34,34" fill="var(--acid)" />
    <polygon points="48,27 44,25 42,32 46,34" fill="var(--acid)" />

    {/* Extended Arm Firing Web */}
    <path d="M50 48 L85 28" stroke="var(--cream)" strokeWidth="4" strokeLinecap="round" />
    {/* Web Muzzle Flash Ring */}
    <circle cx="85" cy="28" r="6" fill="var(--acid)" />
    <circle cx="85" cy="28" r="10" stroke="var(--acid)" strokeWidth="1.5" strokeDasharray="3 3" />
  </svg>
);

/* ── Pose 3: Web-Slinging Air Jump (Process/Featured Stage 3) ── */
const WebSlingSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
    {/* Dynamic Swinging Body in Mid-Air */}
    <path
      d="M25 35 Q 40 20 60 30 Q 75 45 65 70 Q 40 85 20 60 Z"
      fill="var(--ink)"
      stroke="var(--acid)"
      strokeWidth="3"
    />
    {/* Head Dynamic Angle */}
    <ellipse cx="60" cy="28" rx="14" ry="15" fill="var(--ink)" stroke="var(--acid)" strokeWidth="3" />
    <polygon points="52,23 58,21 60,28 54,30" fill="var(--acid)" />
    <polygon points="68,23 64,21 62,28 66,30" fill="var(--acid)" />

    {/* Both Arms Gripping Web Lines */}
    <path d="M60 40 L85 10" stroke="var(--acid)" strokeWidth="3" strokeDasharray="4 2" />
    <path d="M40 30 L10 5" stroke="var(--acid)" strokeWidth="3" strokeDasharray="4 2" />
  </svg>
);

/* ── Pose 4: Contact Button Web-Shot (Contact Stage 4) ── */
const ContactBlastSVG = () => (
  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
    {/* Superhero Ground Impact Pose */}
    <path
      d="M15 75 Q 35 45 55 50 Q 75 55 85 75 Q 50 85 20 80 Z"
      fill="var(--ink)"
      stroke="var(--acid)"
      strokeWidth="3"
    />
    <ellipse cx="35" cy="42" rx="14" ry="14" fill="var(--ink)" stroke="var(--acid)" strokeWidth="3" />
    <polygon points="27,37 33,35 35,42 29,44" fill="var(--acid)" />
    <polygon points="43,37 39,35 37,42 41,44" fill="var(--acid)" />

    {/* Ground Shockwave Ripple Ring */}
    <ellipse cx="50" cy="80" rx="35" ry="10" stroke="var(--acid)" strokeWidth="2" strokeDasharray="6 4" />
    {/* Arm Firing Direct Web Shot */}
    <path d="M45 52 L92 48" stroke="var(--acid)" strokeWidth="4" strokeLinecap="round" />
    <circle cx="92" cy="48" r="7" fill="var(--acid)" className="animate-ping" />
  </svg>
);

export const SpiderMascotEngine = () => {
  const [stage, setStage] = useState<1 | 2 | 3 | 4>(1);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 25 });

  // Update Stage based on Scroll Depth
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (latest) => {
      if (latest < 0.22) {
        setStage(1);
      } else if (latest < 0.50) {
        setStage(2);
      } else if (latest < 0.78) {
        setStage(3);
      } else {
        setStage(4);
      }
    });
    return () => unsub();
  }, [scrollYProgress]);

  // Stage 1-4 Mascot Coordinates & Text Labels
  const getStageConfig = () => {
    switch (stage) {
      case 1:
        return {
          title: "STAGE 01 — ROOFTOP PERCH",
          subtitle: "Observing System Architecture",
          pose: <RooftopPerchSVG />,
          anchorY: "15%",
        };
      case 2:
        return {
          title: "STAGE 02 — RETICLE LOCK-ON",
          subtitle: "Targeting Enterprise KPIs",
          pose: <ReticleAimSVG />,
          anchorY: "38%",
        };
      case 3:
        return {
          title: "STAGE 03 — WEB-ZIP SLING",
          subtitle: "Snapping 4 Delivery Phases",
          pose: <WebSlingSVG />,
          anchorY: "65%",
        };
      case 4:
      default:
        return {
          title: "STAGE 04 — CONTACT WEB-BLAST",
          subtitle: "Connecting Web Line to Submit",
          pose: <ContactBlastSVG />,
          anchorY: "88%",
        };
    }
  };

  const config = getStageConfig();

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden" aria-hidden="true">
      {/* ── Concept 4: Elastic Web-Tension Vertical Cord ── */}
      <svg className="absolute inset-0 w-full h-full overflow-visible">
        <motion.path
          d="M 50 0 Q 70 500 50 1000 T 50 2000"
          stroke="var(--acid)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          fill="none"
          opacity="0.3"
        />
      </svg>

      {/* ── Concept 1 & 2: Floating Morphing Spider-Mascot ── */}
      <motion.div
        className="fixed right-4 sm:right-10 pointer-events-auto z-50 flex flex-col items-end gap-3"
        style={{ top: config.anchorY, transition: "top 0.8s cubic-bezier(0.22, 1, 0.36, 1)" }}
      >
        {/* Stage Status Telemetry Tag */}
        <motion.div
          key={stage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="px-3.5 py-2 rounded-xl bg-ink/95 border border-acid/50 text-cream backdrop-blur-xl shadow-2xl flex flex-col items-end text-right"
        >
          <span className="text-[10px] font-mono text-acid font-bold tracking-widest uppercase">
            {config.title}
          </span>
          <span className="text-xs font-body text-muted font-medium mt-0.5">
            {config.subtitle}
          </span>
        </motion.div>

        {/* Mascot Character Avatar Container */}
        <motion.div
          key={`pose-${stage}`}
          initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          whileHover={{ scale: 1.15 }}
          className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-ink/90 border-2 border-acid/60 shadow-[0_0_30px_rgba(184,255,0,0.35)] backdrop-blur-md p-2 relative group cursor-pointer"
        >
          {config.pose}

          {/* Web shooter spark indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-acid animate-ping opacity-75" />
        </motion.div>
      </motion.div>
    </div>
  );
};
