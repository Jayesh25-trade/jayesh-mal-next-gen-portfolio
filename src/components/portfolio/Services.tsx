import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import { ArrowRight } from "lucide-react";

export const Services = () => {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="services"
      className="grain"
      style={{ background: "var(--cream)", color: "var(--ink)", paddingBlock: "var(--section-py)" }}
    >
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />

      <div className="container-xl relative">
        <div className="flex items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="label-sm block mb-3" style={{ color: "var(--muted-2)" }}>07</span>
            <h2
              className="font-display font-black tracking-tighter"
              style={{ fontSize: "var(--h-section)", color: "var(--ink)", lineHeight: 1 }}
            >
              {t.services.title}
            </h2>
          </div>
          <p
            className="hidden sm:block max-w-[260px] text-sm text-right leading-relaxed"
            style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
          >
            {t.services.subtitle}
          </p>
        </div>

        <div className="rule" style={{ background: "var(--cream-2)" }} />

        {/* Editorial numbered service list */}
        {t.services.items.map((svc, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.12 + 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group flex items-center gap-6 sm:gap-10 py-7 sm:py-9"
            style={{ borderBottom: "1px solid var(--cream-2)" }}
          >
            {/* Number */}
            <span
              className="font-display font-black shrink-0 w-8"
              style={{ fontSize: 13, color: "var(--muted-2)", fontVariantNumeric: "tabular-nums" }}
            >
              0{i + 1}
            </span>

            {/* Title — large left */}
            <h3
              className="flex-1 font-display font-bold tracking-tighter group-hover:text-[var(--acid-dim)] transition-colors duration-200"
              style={{ fontSize: "clamp(20px, 2.8vw, 40px)", color: "var(--ink)", lineHeight: 1.1 }}
            >
              {svc.title}
            </h3>

            {/* Desc — right column */}
            <p
              className="hidden sm:block max-w-[280px] text-sm leading-relaxed shrink-0"
              style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
            >
              {svc.desc}
            </p>

            {/* Arrow */}
            <ArrowRight
              className="shrink-0 transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
              style={{ color: "var(--acid-dim)", width: 20, height: 20 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
