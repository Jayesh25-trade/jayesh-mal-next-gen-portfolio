import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, ShieldCheck, Cpu, Rocket, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    phase: "PHASE 01",
    title: "Discovery & Architecture",
    desc: "Deep technical alignment on business goals, target audience requirements, system architecture, and core performance SLAs.",
    deliverables: ["Architecture Blueprint", "Technical Specification", "SLA & Metric Targets"],
    metric: "100% Scope Clarity",
    icon: Cpu,
  },
  {
    num: "02",
    phase: "PHASE 02",
    title: "Product Design & Prototyping",
    desc: "Precision UI/UX engineering, scalable design tokens, micro-interactions, and high-fidelity clickable interactive prototypes.",
    deliverables: ["Design System Core", "Interactive Prototype", "Accessibility Standards"],
    metric: "60fps Motion UX",
    icon: ShieldCheck,
  },
  {
    num: "03",
    phase: "PHASE 03",
    title: "Full-Stack Development & QA",
    desc: "Production-grade engineering built with clean architecture, CI/CD automation, API security audits, and comprehensive E2E test suites.",
    deliverables: ["Clean Codebase", "Automated E2E Suite", "Security & API Audits"],
    metric: "Zero Technical Debt",
    icon: CheckCircle2,
  },
  {
    num: "04",
    phase: "PHASE 04",
    title: "Enterprise Deployment & Telemetry",
    desc: "Global edge CDN deployment, real-time automated crash monitoring, operational telemetry, and continuous performance tuning.",
    deliverables: ["Edge CDN Deployment", "24/7 Monitoring", "Performance Analytics"],
    metric: "High Availability SLA",
    icon: Rocket,
  },
];

export const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const isMobileInView = useInView(mobileRef, { once: true, margin: "-60px" });

  useEffect(() => {
    // Only initialize GSAP pinned horizontal scroll on desktop (width >= 768)
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    const track = trackRef.current;
    const section = sectionRef.current;
    const path = pathRef.current;
    if (!track || !section) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll + window.innerHeight}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.to(track, { x: -totalScroll, ease: "none" });

      if (path) {
        const pathLength = path.getTotalLength();
        gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${totalScroll + window.innerHeight}`,
            scrub: 1,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="grain aurora-bg relative overflow-hidden"
      style={{ background: "rgba(22, 22, 22, 0.55)" }}
    >
      {/* ── MOBILE VIEW: Vertical Card Stack (Hidden on Desktop) ── */}
      <div ref={mobileRef} className="block md:hidden container-xl py-16">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-acid" />
            <span className="label-sm text-acid uppercase tracking-widest text-xs">06 — ENGINEERING METHODOLOGY</span>
          </div>
          <h2
            className="font-display font-black tracking-tighter text-text uppercase"
            style={{ fontSize: "var(--h-section)", lineHeight: 1 }}
          >
            How we work
          </h2>
          <p className="mt-3 text-sm text-muted max-w-lg font-body leading-relaxed">
            A battle-tested 4-phase engineering framework designed for scalable infrastructure, flawless user experience, and rapid execution.
          </p>
        </div>

        <div className="rule bg-wire mb-8" />

        <div className="flex flex-col gap-6">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 24 }}
                animate={isMobileInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md relative overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono tracking-widest text-acid uppercase font-semibold">
                    {s.phase}
                  </span>
                  <span
                    className="font-display font-black text-2xl"
                    style={{ color: i === 0 ? "var(--acid)" : "var(--wire-2)" }}
                  >
                    {s.num}
                  </span>
                </div>

                <h3
                  className="font-display font-bold tracking-tight text-text mb-2 flex items-center gap-2"
                  style={{ fontSize: "clamp(20px, 4.5vw, 28px)", lineHeight: 1.2 }}
                >
                  <Icon className="w-5 h-5 text-acid shrink-0" />
                  {s.title}
                </h3>

                <p className="text-sm leading-relaxed font-body text-muted mb-4">
                  {s.desc}
                </p>

                {/* Deliverables tags */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                  {s.deliverables.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] text-cream border border-white/10"
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}

          <div className="pt-6 text-center">
            <div className="p-6 rounded-2xl border border-acid/30 bg-acid/5 backdrop-blur-md">
              <span className="font-display font-black text-cream block text-xl tracking-tight mb-2">
                Production-Grade Delivery
              </span>
              <p className="text-xs text-muted leading-relaxed font-body max-w-xs mx-auto mb-4">
                Enterprise software engineered with speed, security, and precision.
              </p>
              <a href="#contact" className="btn-primary text-xs py-2 px-4 inline-flex items-center justify-center gap-2">
                Initiate Project <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── DESKTOP VIEW: Horizontal Pin Track (Hidden on Mobile) ── */}
      <div className="hidden md:flex h-screen flex-col justify-center relative" style={{ paddingBlock: "5vh" }}>
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-10">
          <svg className="w-full h-24 overflow-visible" viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none">
            <path
              ref={pathRef}
              d="M0,50 Q360,0 720,50 T1440,50"
              stroke="var(--acid)"
              strokeWidth="4"
              strokeLinecap="round"
              className="drop-shadow-[0_0_12px_#dfff00]"
            />
          </svg>
        </div>

        <div className="container-xl mb-6 flex items-end justify-between relative z-20">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-acid" />
              <span className="label-sm text-acid block uppercase tracking-widest text-xs">06 — ENGINEERING METHODOLOGY</span>
            </div>
            <h2
              className="font-display font-black tracking-tighter text-text uppercase"
              style={{ fontSize: "var(--h-section)", lineHeight: 1 }}
            >
              How we work
            </h2>
          </div>
          <div className="text-right hidden sm:block">
            <span className="label-sm text-muted block mb-1">PROVEN 4-PHASE DELIVERY FRAMEWORK</span>
            <span className="label-sm text-acid">← Scroll horizontally to explore</span>
          </div>
        </div>

        <div className="rule bg-wire relative z-20 mb-4" />

        <div ref={trackRef} className="flex items-stretch gap-8 relative z-20" style={{ width: "max-content", paddingLeft: "var(--gutter)" }}>
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.num}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="flex flex-col justify-between shrink-0 p-8 sm:p-10 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl relative group shadow-2xl"
                style={{ width: "clamp(340px, 32vw, 480px)" }}
              >
                {/* Node indicator dot */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-7 h-7 rounded-full bg-ink border-2 border-acid flex items-center justify-center shadow-[0_0_15px_#dfff00] group-hover:scale-125 transition-transform z-30">
                  <span className="w-2.5 h-2.5 rounded-full bg-acid" />
                </div>

                {/* Top header line */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono tracking-widest text-acid uppercase font-semibold">
                      {s.phase}
                    </span>
                    <span
                      className="font-display font-black select-none text-4xl"
                      style={{
                        color: i === 0 ? "var(--acid)" : "var(--wire-2)",
                        opacity: i === 0 ? 1 : 0.6,
                      }}
                      aria-hidden
                    >
                      {s.num}
                    </span>
                  </div>

                  <h3
                    className="font-display font-bold tracking-tight text-text group-hover:text-acid transition-colors flex items-center gap-3"
                    style={{ fontSize: "clamp(22px, 2.2vw, 32px)", lineHeight: 1.1 }}
                  >
                    <Icon className="w-6 h-6 text-acid shrink-0" />
                    {s.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-muted font-body">
                    {s.desc}
                  </p>
                </div>

                {/* Bottom deliverables */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <span className="text-[10px] font-mono uppercase text-muted tracking-wider block mb-2 font-semibold">
                    Key Deliverables
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {s.deliverables.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] text-cream border border-white/10"
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-acid font-mono">
                    <span>Target Metric:</span>
                    <span className="font-semibold text-cream">{s.metric}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* End Card — Enterprise Guarantee */}
          <div className="shrink-0 flex items-center justify-center px-8 sm:px-12">
            <div className="p-8 rounded-2xl border border-acid/30 bg-acid/5 backdrop-blur-xl max-w-[320px] text-center shadow-2xl">
              <div className="w-12 h-12 rounded-full border border-acid/40 bg-acid/10 flex items-center justify-center text-acid mx-auto mb-4">
                <Rocket className="w-6 h-6" />
              </div>
              <span className="font-display font-black text-cream block text-2xl tracking-tight mb-2">
                Production-Ready Execution
              </span>
              <p className="text-xs text-muted leading-relaxed font-body mb-6">
                Engineered with precision, security, and zero technical debt. Battle-tested for enterprise performance.
              </p>
              <a href="#contact" className="btn-primary text-xs py-3 px-6 inline-flex items-center justify-center gap-2 w-full">
                Initiate Project <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


