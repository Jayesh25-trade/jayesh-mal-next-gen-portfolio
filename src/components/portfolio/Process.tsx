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
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll + window.innerHeight}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="grain overflow-hidden"
      style={{ background: "var(--ink-2)" }}
    >
      {/* Sticky pinned content */}
      <div className="h-screen flex flex-col justify-center" style={{ paddingBlock: "6vh" }}>
        {/* Section header — static */}
        <div ref={titleRef} className="container-xl mb-10 flex items-end justify-between">
          <div>
            <span className="label-sm text-muted-ed block mb-3">06</span>
            <h2
              className="font-display font-black tracking-tighter"
              style={{ fontSize: "var(--h-section)", color: "var(--text)", lineHeight: 1 }}
            >
              How we work
            </h2>
          </div>
          <span className="label-sm hidden sm:block" style={{ color: "var(--muted)" }}>
            ← Scroll to explore
          </span>
        </div>

        <div className="rule" style={{ background: "var(--wire)" }} />

        {/* Horizontal track */}
        <div ref={trackRef} className="flex items-stretch gap-0" style={{ width: "max-content", paddingLeft: "var(--gutter)" }}>
          {STEPS.map((s, i) => (
            <div
              key={s.num}
              className="flex flex-col justify-between shrink-0 py-10 pr-16 sm:pr-24 xl:pr-32 border-r"
              style={{
                borderColor: "var(--wire)",
                width: "clamp(280px, 36vw, 520px)",
              }}
            >
              {/* Step number — oversized background type */}
              <div className="relative">
                <span
                  className="font-display font-black select-none"
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
                <div className="rule mb-5" style={{ background: "var(--wire)" }} />
                <h3
                  className="font-display font-bold tracking-tighter"
                  style={{ fontSize: "clamp(22px, 3vw, 40px)", color: "var(--text)", lineHeight: 1.1 }}
                >
                  {s.title}
                </h3>
                <p
                  className="mt-3 text-sm sm:text-base leading-relaxed"
                  style={{ color: "var(--muted)", fontFamily: "var(--font-body)", maxWidth: 300 }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          ))}

          {/* End card */}
          <div className="shrink-0 flex items-center justify-center px-14 sm:px-20">
            <div className="text-center">
              <span
                className="font-display font-black"
                style={{ fontSize: "clamp(28px, 5vw, 60px)", color: "var(--acid)" }}
              >
                Ship.
              </span>
              <p className="mt-2 label-sm" style={{ color: "var(--muted)" }}>That's it.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
