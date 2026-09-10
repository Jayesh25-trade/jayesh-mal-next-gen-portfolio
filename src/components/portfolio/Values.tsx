import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";

const ICONS_SVG = [
  // Palette
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2v-.5c0-.28.22-.5.5-.5H17c2.76 0 5-2.24 5-5 0-5.52-4.48-10-10-10z"/><circle cx="6.5" cy="11.5" r="1.5"/><circle cx="9.5" cy="7.5" r="1.5"/><circle cx="14.5" cy="7.5" r="1.5"/><circle cx="17.5" cy="11.5" r="1.5"/></svg>,
  // Target
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  // Workflow
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="9" y="15" width="6" height="6" rx="1"/><path d="M6 9v3a3 3 0 003 3h6a3 3 0 003-3V9"/></svg>,
  // Zap
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
];

export const Values = () => {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="values"
      className="relative grain aurora-bg overflow-hidden"
      style={{ background: "rgba(12, 12, 12, 0.5)", paddingBlock: "var(--section-py)" }}
    >
      <div className="container-xl">
        {/* Label + heading */}
        <div className="flex items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="label-sm text-muted-ed block mb-3">03</span>
            <h2
              className="font-display font-black tracking-tighter"
              style={{ fontSize: "var(--h-section)", color: "var(--text)", lineHeight: 1 }}
            >
              {t.values.title}
            </h2>
          </div>
          <p
            className="hidden sm:block max-w-[280px] text-sm text-right leading-relaxed"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            {t.values.subtitle}
          </p>
        </div>

        <div className="rule mb-10 sm:mb-12" style={{ background: "var(--wire)" }} />

        {/* Horizontal editorial list — not a card grid */}
        <div>
          {t.values.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-start gap-6 sm:gap-10 py-7 sm:py-9"
              style={{ borderBottom: "1px solid var(--wire)" }}
            >
              {/* Number */}
              <span
                className="font-display font-black shrink-0 w-8"
                style={{ fontSize: 13, color: "var(--muted)", fontVariantNumeric: "tabular-nums" }}
              >
                0{i + 1}
              </span>

              {/* Icon */}
              <span
                className="shrink-0 mt-0.5 transition-colors duration-200"
                style={{ color: "var(--muted)" }}
                aria-hidden
              >
                {ICONS_SVG[i]}
              </span>

              {/* Title — big, left-aligned */}
              <div className="flex-1 min-w-0">
                <h3
                  className="font-display font-bold tracking-tighter transition-colors duration-200 group-hover:text-acid"
                  style={{ fontSize: "clamp(20px, 2.8vw, 36px)", color: "var(--text)", lineHeight: 1.1 }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-2 text-sm sm:text-base leading-relaxed max-w-lg"
                  style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
                >
                  {item.desc}
                </p>
              </div>

              {/* Right arrow accent — appears on hover */}
              <span
                className="shrink-0 self-center text-2xl font-black opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-3 group-hover:translate-x-0"
                style={{ color: "var(--acid)" }}
                aria-hidden
              >
                →
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
