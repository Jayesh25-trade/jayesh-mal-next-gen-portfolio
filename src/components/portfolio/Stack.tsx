import { useRef } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { motion } from "framer-motion";

const STACK = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion",
  "Node.js", "Express", "PostgreSQL", "MongoDB", "Supabase",
  "Vite", "Vercel", "Stripe", "Figma", "Git", "GSAP",
];

const MarqueeRow = ({ items, reversed }: { items: string[]; reversed?: boolean }) => (
  <div className="overflow-hidden relative">
    <div
      className={`flex items-center gap-px w-max ${reversed ? "marquee-track-rev" : "marquee-track"}`}
    >
      {[...items, ...items, ...items].map((s, i) => (
        <span key={i} className="flex items-center">
          <span
            className="font-display font-black tracking-tighter px-3 sm:px-4 select-none"
            style={{
              fontSize: "clamp(36px, 6vw, 80px)",
              color: i % 3 === 0 ? "var(--acid)" : "var(--wire-2)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            {s}
          </span>
          <span
            className="text-xl sm:text-2xl mx-1"
            style={{ color: "var(--wire-2)", lineHeight: 1 }}
            aria-hidden
          >
            ✦
          </span>
        </span>
      ))}
    </div>
  </div>
);

export const Stack = () => {
  const { t } = useI18n();

  return (
    <section
      id="stack"
      className="grain overflow-hidden"
      style={{ background: "var(--ink)", paddingBlock: "var(--section-py)" }}
    >
      <div className="container-xl mb-12 sm:mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-acid" />
              <span className="label-sm text-acid uppercase tracking-widest text-xs font-semibold">07 — TECHNOLOGY ECOSYSTEM</span>
            </div>
            <h2
              className="font-display font-black tracking-tighter uppercase"
              style={{ fontSize: "var(--h-section)", color: "var(--text)", lineHeight: 1 }}
            >
              {t.stack.title}
            </h2>
          </div>
          <p className="text-sm text-muted font-body max-w-xs">{t.stack.subtitle}</p>
        </div>
      </div>

      {/* Full-bleed typographic marquee — no pills */}
      <div className="flex flex-col gap-0">
        <MarqueeRow items={STACK.slice(0, 8)} />
        <MarqueeRow items={STACK.slice(8)} reversed />
      </div>
    </section>
  );
};
