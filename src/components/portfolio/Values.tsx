import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Palette, Target, Cpu, Zap, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

const PILLARS = [
  {
    icon: Palette,
    metric: "60 FPS UX",
    tag: "Visual Design",
    title: "Modern UI/UX & Motion",
    desc: "Clean, intentional interfaces with fluid Framer Motion and GSAP micro-interactions that elevate brand perception.",
  },
  {
    icon: Target,
    metric: "+340% Lift",
    tag: "Conversion",
    title: "Engineered for Results",
    desc: "Clear visual hierarchies, high-converting checkout flows, and user-centric architecture designed to drive revenue.",
  },
  {
    icon: Cpu,
    metric: "Zero Debt",
    tag: "Architecture",
    title: "Scalable Full-Stack Core",
    desc: "Robust TypeScript, React/Next.js, and Supabase/PostgreSQL backends engineered for speed, security, and scalability.",
  },
  {
    icon: Zap,
    metric: "99+ Score",
    tag: "Performance",
    title: "Sub-Second Speed & SEO",
    desc: "Blazing fast global edge delivery, semantic markup, and Core Web Vitals tuned for top search engine visibility.",
  },
];

export const Values = () => {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      id="values"
      className="grain relative overflow-hidden"
      style={{ background: "var(--ink)", paddingBlock: "var(--section-py)" }}
    >
      <div className="container-xl relative z-10">
        {/* Label + section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-acid" />
              <span className="label-sm text-acid uppercase tracking-widest text-xs font-semibold">
                06 — WHY WORK WITH US
              </span>
            </div>
            <h2
              className="font-display font-black tracking-tighter text-text uppercase relative"
              style={{ fontSize: "var(--h-section)", lineHeight: 1 }}
            >
              Why work with us
              <span className="block text-acid text-2xl sm:text-3xl mt-2 tracking-normal font-mono font-medium">
                Modern engineering meets business goals
              </span>
            </h2>
          </div>

          <p className="max-w-[320px] text-sm text-muted font-body leading-relaxed border-l-2 border-acid/40 pl-4">
            We don't just write code — we engineer scalable digital assets designed to convert, perform, and scale effortlessly.
          </p>
        </div>

        <div className="rule bg-white/10 mb-10 sm:mb-12" />

        {/* Minimalist Bento Value Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            const isHovered = hoveredIdx === i;

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative p-8 rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isHovered
                    ? "border-acid/50 bg-white/[0.035] shadow-[0_12px_40px_rgba(184,255,0,0.08)] -translate-y-1"
                    : "border-white/[0.08] bg-white/[0.015] hover:border-white/20"
                }`}
              >
                {/* Top Row: Icon + Metric Pill */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    isHovered ? "bg-acid/20 text-acid border border-acid/40" : "bg-white/[0.04] text-text/80 border border-white/10"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02]">
                      {pillar.tag}
                    </span>
                    <span className="text-xs font-mono font-bold text-acid px-2.5 py-1 rounded-full border border-acid/30 bg-acid/10">
                      {pillar.metric}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="font-display font-bold text-xl sm:text-2xl text-text mb-3 tracking-tight group-hover:text-acid transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm sm:text-base text-muted font-body leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
