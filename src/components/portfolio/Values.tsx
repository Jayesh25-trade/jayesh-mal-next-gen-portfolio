import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Palette, Target, Cpu, Zap, Activity, ArrowRight, ShieldCheck, Gauge, Sparkles } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

/* ── HUD Graphic Widget 01: Rotating Circular Radar Dial (Modern UI/UX) ── */
const HudDialWidget = ({ active }: { active: boolean }) => (
  <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
    {/* Outer rotating dashed tech ring */}
    <motion.svg
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
      className="absolute inset-0 w-full h-full text-acid opacity-70"
      viewBox="0 0 100 100"
    >
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
      <circle cx="50" cy="50" r="38" stroke="var(--wire-2)" strokeWidth="1" fill="none" />
      {/* Ticks */}
      <line x1="50" y1="2" x2="50" y2="8" stroke="currentColor" strokeWidth="2" />
      <line x1="98" y1="50" x2="92" y2="50" stroke="currentColor" strokeWidth="2" />
      <line x1="50" y1="98" x2="50" y2="92" stroke="currentColor" strokeWidth="2" />
      <line x1="2" y1="50" x2="8" y2="50" stroke="currentColor" strokeWidth="2" />
    </motion.svg>

    {/* Inner counter-rotating telemetry ring */}
    <motion.svg
      animate={{ rotate: -360 }}
      transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] text-cyan-400 opacity-60"
      viewBox="0 0 100 100"
    >
      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="12 8 4 8" fill="none" />
    </motion.svg>

    {/* Center Icon Glow Badge */}
    <div
      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 ${
        active
          ? "bg-acid/20 border-2 border-acid text-acid shadow-[0_0_20px_#dfff00]"
          : "bg-white/[0.04] border border-white/10 text-muted"
      }`}
    >
      <Palette className="w-5 h-5 sm:w-6 sm:h-6" />
    </div>
  </div>
);

/* ── HUD Graphic Widget 02: Target Reticle & Heartbeat Waveform (Business-focused) ── */
const HudTargetWidget = ({ active }: { active: boolean }) => (
  <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
    {/* Target reticle crosshairs */}
    <svg className="absolute inset-0 w-full h-full text-acid/40" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" fill="none" />
      <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
    </svg>

    {/* Pulsing Lock-On Target Ring */}
    <motion.div
      animate={active ? { scale: [1, 1.25, 1], opacity: [0.8, 0.3, 0.8] } : {}}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      className="absolute inset-2 rounded-full border-2 border-acid/50 pointer-events-none"
    />

    {/* Center Icon Badge */}
    <div
      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 ${
        active
          ? "bg-acid/20 border-2 border-acid text-acid shadow-[0_0_20px_#dfff00]"
          : "bg-white/[0.04] border border-white/10 text-muted"
      }`}
    >
      <Target className="w-5 h-5 sm:w-6 sm:h-6" />
    </div>
  </div>
);

/* ── HUD Graphic Widget 03: Cyber Matrix Data Node Network (Automation) ── */
const HudMatrixWidget = ({ active }: { active: boolean }) => (
  <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
    {/* Connecting Matrix Beam Lines */}
    <svg className="absolute inset-0 w-full h-full text-cyan-400/60" viewBox="0 0 100 100">
      <motion.path
        d="M 20 20 L 50 50 L 80 20 M 50 50 L 50 85 M 20 80 L 50 50 L 80 80"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        fill="none"
        animate={{ strokeDashoffset: [0, -20] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      />
      <circle cx="20" cy="20" r="4" fill="var(--acid)" />
      <circle cx="80" cy="20" r="4" fill="var(--acid)" />
      <circle cx="20" cy="80" r="4" fill="var(--acid)" />
      <circle cx="80" cy="80" r="4" fill="var(--acid)" />
    </svg>

    {/* Center Icon Badge */}
    <div
      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 ${
        active
          ? "bg-cyan-400/20 border-2 border-cyan-400 text-cyan-300 shadow-[0_0_20px_#00e5ff]"
          : "bg-white/[0.04] border border-white/10 text-muted"
      }`}
    >
      <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />
    </div>
  </div>
);

/* ── HUD Graphic Widget 04: High-Voltage Lightning Shield (High-performance apps) ── */
const HudVoltageWidget = ({ active }: { active: boolean }) => (
  <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
    {/* High-Voltage Rotating Energy Shield */}
    <motion.svg
      animate={{ rotate: [0, 90, 180, 270, 360] }}
      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      className="absolute inset-0 w-full h-full text-acid"
      viewBox="0 0 100 100"
    >
      <polygon points="50,5 95,50 50,95 5,50" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 6" fill="none" />
    </motion.svg>

    {/* Center Icon Badge */}
    <div
      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 ${
        active
          ? "bg-acid/25 border-2 border-acid text-acid shadow-[0_0_24px_#dfff00]"
          : "bg-white/[0.04] border border-white/10 text-muted"
      }`}
    >
      <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
    </div>
  </div>
);

export const Values = () => {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(0);

  const getWidget = (idx: number, active: boolean) => {
    switch (idx) {
      case 0:
        return <HudDialWidget active={active} />;
      case 1:
        return <HudTargetWidget active={active} />;
      case 2:
        return <HudMatrixWidget active={active} />;
      case 3:
      default:
        return <HudVoltageWidget active={active} />;
    }
  };

  const getMetricBadge = (idx: number) => {
    switch (idx) {
      case 0:
        return { label: "TELEMETRY", value: "60 FPS Motion UX", tag: "Pixel Perfect" };
      case 1:
        return { label: "BUSINESS KPI", value: "+340% Conversion", tag: "Zero Debt" };
      case 2:
        return { label: "AUTOMATION", value: "Smart CI/CD Pipelines", tag: "AI Integrated" };
      case 3:
      default:
        return { label: "LIGHTHOUSE", value: "99+ Core Web Vitals", tag: "Ultra Speed" };
    }
  };

  return (
    <section
      ref={ref}
      id="values"
      className="grain relative overflow-hidden"
      style={{ background: "var(--ink)", paddingBlock: "var(--section-py)" }}
    >
      {/* Background Cyber Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(184, 255, 0, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 229, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-xl relative z-10">
        {/* Label + section header with glowing laser accent */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-acid animate-ping" />
              <span className="label-sm text-acid uppercase tracking-widest text-xs font-semibold">
                03 — WHY WORK WITH US
              </span>
            </div>
            <h2
              className="font-display font-black tracking-tighter text-text uppercase relative"
              style={{ fontSize: "var(--h-section)", lineHeight: 1 }}
            >
              Why work with us
              <span className="block text-acid text-2xl sm:text-4xl mt-1 tracking-normal font-mono">
                Modern engineering meets business goals
              </span>
            </h2>
          </div>

          <p
            className="max-w-[320px] text-sm text-muted font-body leading-relaxed border-l-2 border-acid/40 pl-4"
          >
            We don't just write code — we engineer scalable digital assets designed to convert, perform, and scale seamlessly.
          </p>
        </div>

        <div className="rule bg-wire mb-10 sm:mb-12" />

        {/* Futuristic Cyberpunk HUD Interactive Card List */}
        <div className="flex flex-col gap-6">
          {t.values.items.map((item, i) => {
            const isHovered = hoveredIdx === i;
            const metric = getMetricBadge(i);

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12 + 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredIdx(i)}
                onFocus={() => setHoveredIdx(i)}
                className={`group relative p-6 sm:p-8 rounded-2xl border transition-all duration-500 overflow-hidden cursor-pointer ${
                  isHovered
                    ? "border-acid/60 bg-white/[0.03] backdrop-blur-xl shadow-[0_10px_40px_rgba(184,255,0,0.12)] scale-[1.01]"
                    : "border-white/10 bg-white/[0.01] hover:border-white/20"
                }`}
              >
                {/* Active HUD Glow Bar Accent */}
                {isHovered && (
                  <motion.div
                    layoutId="activeGlowBar"
                    className="absolute top-0 left-0 bottom-0 w-1.5 bg-acid shadow-[0_0_15px_#dfff00]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">
                  {/* Left: Step Index + Animated HUD Widget */}
                  <div className="flex items-center gap-6">
                    <span
                      className="font-display font-black text-2xl sm:text-3xl shrink-0 select-none"
                      style={{
                        color: isHovered ? "var(--acid)" : "var(--wire-2)",
                        transition: "color 0.3s ease",
                      }}
                    >
                      0{i + 1}
                    </span>

                    {/* HUD Graphic Dial/Crosshair/Matrix Widget */}
                    {getWidget(i, isHovered)}
                  </div>

                  {/* Middle: Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-acid px-2 py-0.5 rounded bg-acid/10 border border-acid/30">
                        {metric.tag}
                      </span>
                    </div>

                    <h3
                      className={`font-display font-bold tracking-tight text-text transition-colors duration-300 ${
                        isHovered ? "text-acid" : "group-hover:text-acid"
                      }`}
                      style={{ fontSize: "clamp(22px, 3vw, 36px)", lineHeight: 1.15 }}
                    >
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-muted font-body max-w-xl">
                      {item.desc}
                    </p>
                  </div>

                  {/* Right: Real-time Telemetry Card Badge + Interactive Arrow */}
                  <div className="flex items-center justify-between md:flex-col md:items-end gap-4 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
                    <div className="text-left md:text-right">
                      <span className="text-[10px] font-mono uppercase text-muted tracking-wider block">
                        {metric.label}
                      </span>
                      <span className="text-xs sm:text-sm font-mono font-bold text-cream block mt-0.5">
                        {metric.value}
                      </span>
                    </div>

                    {/* Futuristic Lock-On Arrow */}
                    <div
                      className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isHovered
                          ? "border-acid bg-acid text-ink shadow-[0_0_15px_#dfff00] translate-x-1"
                          : "border-white/20 text-muted group-hover:border-acid group-hover:text-acid"
                      }`}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Cyber Scanner Line Effect on Hover */}
                {isHovered && (
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                    className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-acid/10 to-transparent pointer-events-none"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
