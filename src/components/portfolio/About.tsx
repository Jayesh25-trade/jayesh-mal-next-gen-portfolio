import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowUpRight, Sparkles, Code2, Layers, Cpu, ShieldCheck } from "lucide-react";

/* Curtain reveal used for headlines and quotes */
const Curtain = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        animate={inView ? { y: "0%" } : { y: "105%" }}
        initial={{ y: "105%" }}
        transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const ABOUT_HIGHLIGHTS = [
  {
    title: "Precision Engineering",
    desc: "React, Next.js, and TypeScript architectures crafted with zero technical debt.",
    icon: Code2,
  },
  {
    title: "Scalable Infrastructure",
    desc: "Node.js, PostgreSQL, Supabase, and distributed edge deployments.",
    icon: Cpu,
  },
  {
    title: "60fps Motion UX",
    desc: "Framer Motion & GSAP micro-interactions tuned for fluid mobile response.",
    icon: Layers,
  },
  {
    title: "Performance & SEO SLAs",
    desc: "99+ Core Web Vitals, accessible semantic HTML, and structured metadata.",
    icon: ShieldCheck,
  },
];

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const lineScale = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative grain"
      style={{ background: "var(--ink)", color: "var(--text)", paddingBlock: "var(--section-py)" }}
    >
      <div className="container-xl relative">
        {/* ─── Top row: section label + index ─── */}
        <div className="flex items-center justify-between mb-12 sm:mb-16">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-acid" />
            <span className="label-sm text-acid tracking-widest uppercase">01 — ABOUT THE STUDIO</span>
          </div>
          <span className="label-sm text-muted font-mono">EST. 2021</span>
        </div>

        {/* ─── Main: 30/70 asymmetric split ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_5fr] gap-10 lg:gap-20">
          {/* LEFT narrow: oversized studio monogram */}
          <div className="flex flex-col justify-between">
            <div
              className="font-display font-black select-none hidden lg:block opacity-20 hover:opacity-30 transition-opacity"
              style={{
                fontSize: "clamp(80px, 10vw, 130px)",
                color: "var(--acid)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}
              aria-hidden
            >
              JD.
            </div>

            <div className="mt-8 lg:mt-0 flex flex-col gap-4">
              <motion.div
                style={{ scaleX: lineScale, transformOrigin: "left", background: "var(--acid)", height: "1px" }}
                className="w-full opacity-60"
              />
              <p className="text-sm leading-relaxed text-muted font-body">
                Building scalable web products and high-converting software systems since 2021.
              </p>
            </div>
          </div>

          {/* RIGHT wide: content */}
          <div>
            <Curtain delay={0.1}>
              <h2
                className="font-display font-bold leading-tight tracking-tighter text-text"
                style={{ fontSize: "clamp(26px, 3.5vw, 48px)" }}
              >
                We are{" "}
                <span className="text-acid underline decoration-acid/30 decoration-2 underline-offset-8">
                  Jimmy Developers
                </span>{" "}
                — a next-generation web studio building products people actually love using.
              </h2>
            </Curtain>

            {/* Founder Developer Spotlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 sm:mt-10 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm relative overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-acid" />
                <span className="label-sm uppercase font-mono text-xs text-acid">
                  Founder & Technical Architect — Jayesh Mal
                </span>
              </div>
              <p className="text-base sm:text-lg leading-relaxed text-text/90 font-body">
                Combining high-fidelity UI design with robust full-stack architecture, we transform complex business problems into seamless, high-velocity digital experiences. Every project ships with pixel-perfect attention to detail, sub-second response times, and an architecture built for long-term scale.
              </p>
            </motion.div>

            {/* Capability highlights grid */}
            <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ABOUT_HIGHLIGHTS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.1 + 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.015] hover:border-acid/40 hover:bg-white/[0.03] transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-acid/10 border border-acid/20 flex items-center justify-center text-acid mb-3 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display font-bold text-base text-text group-hover:text-acid transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-muted font-body leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
