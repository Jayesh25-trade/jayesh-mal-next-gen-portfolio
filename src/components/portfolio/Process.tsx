import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { num: "01", title: "Discover", desc: "We align on goals, audience and success metrics. Quick and focused." },
  { num: "02", title: "Design", desc: "Wireframes → high-fidelity, animated prototype. You see it before we build." },
  { num: "03", title: "Build", desc: "Production-grade code with tests, CI/CD, and zero technical debt." },
  { num: "04", title: "Launch", desc: "Deploy on Vercel, monitor performance, iterate based on real data." },
];

export const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    const path = pathRef.current;
    if (!track || !section) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      // Pin and horizontal scroll
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

      tl.to(track, {
        x: -totalScroll,
        ease: "none",
      });

      // SVG path drawing synced to scroll progress
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
      className="grain aurora-bg overflow-hidden"
      style={{ background: "var(--ink-2)" }}
    >
      {/* Sticky pinned container */}
      <div className="h-screen flex flex-col justify-center relative" style={{ paddingBlock: "6vh" }}>
        {/* Animated SVG Path Line */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-10 hidden md:block">
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

        {/* Section header */}
        <div ref={titleRef} className="container-xl mb-10 flex items-end justify-between relative z-20">
          <div>
            <span className="label-sm text-acid block mb-3">06 — ANIMATED JOURNEY</span>
            <h2
              className="font-display font-black tracking-tighter text-text uppercase"
              style={{ fontSize: "var(--h-section)", lineHeight: 1 }}
            >
              How we work
            </h2>
          </div>
          <span className="label-sm text-muted hidden sm:block">
            ← Scroll to explore path
          </span>
        </div>

        <div className="rule bg-wire relative z-20" />

        {/* Horizontal track */}
        <div ref={trackRef} className="flex items-stretch gap-0 relative z-20" style={{ width: "max-content", paddingLeft: "var(--gutter)" }}>
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col justify-between shrink-0 py-10 pr-16 sm:pr-24 xl:pr-32 border-r border-wire relative group"
              style={{
                width: "clamp(280px, 36vw, 520px)",
              }}
            >
              {/* Milestone Node */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 rounded-full bg-ink border-2 border-acid flex items-center justify-center shadow-[0_0_12px_#dfff00] group-hover:scale-125 transition-transform z-30 hidden md:flex">
                <span className="w-2 h-2 rounded-full bg-acid" />
              </div>

              {/* Step number — oversized background type */}
              <div className="relative">
                <span
                  className="font-display font-black select-none transition-colors duration-500"
                  style={{
                    fontSize: "clamp(80px, 14vw, 180px)",
                    color: i === 0 ? "var(--acid)" : "var(--wire-2)",
                    lineHeight: 1,
                    letterSpacing: "-0.06em",
                    opacity: i === 0 ? 1 : 0.4,
                  }}
                  aria-hidden
                >
                  {s.num}
                </span>
              </div>

              <div className="mt-6">
                <div className="rule mb-5 bg-wire" />
                <h3
                  className="font-display font-bold tracking-tighter text-text group-hover:text-acid transition-colors"
                  style={{ fontSize: "clamp(22px, 3vw, 40px)", lineHeight: 1.1 }}
                >
                  {s.title}
                </h3>
                <p
                  className="mt-3 text-sm sm:text-base leading-relaxed text-muted font-body max-w-[300px]"
                >
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}

          {/* End card */}
          <div className="shrink-0 flex items-center justify-center px-14 sm:px-20">
            <div className="text-center">
              <span
                className="font-display font-black text-acid block"
                style={{ fontSize: "clamp(28px, 5vw, 60px)" }}
              >
                Ship.
              </span>
              <p className="mt-2 label-sm text-muted">That's it.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
