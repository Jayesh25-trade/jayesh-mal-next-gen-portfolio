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
      className="grain relative"
      style={{ background: "var(--ink-2)", color: "var(--text)", paddingBlock: "var(--section-py)" }}
    >
      <div className="container-xl relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-acid" />
              <span className="label-sm text-acid uppercase tracking-widest text-xs font-semibold">
                04 — CAPABILITIES & EXPERTISE
              </span>
            </div>
            <h2
              className="font-display font-black tracking-tighter uppercase text-text"
              style={{ fontSize: "var(--h-section)", lineHeight: 1 }}
            >
              {t.services.title}
            </h2>
          </div>
          <p
            className="max-w-[300px] text-sm text-muted font-body leading-relaxed sm:text-right"
          >
            {t.services.subtitle}
          </p>
        </div>

        <div className="rule bg-white/10 mb-2" />

        {/* Editorial numbered service list */}
        <div className="divide-y divide-white/[0.08]">
          {t.services.items.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 py-8 sm:py-10 hover:bg-white/[0.015] px-4 -mx-4 rounded-xl transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-baseline gap-6 sm:gap-10 flex-1">
                {/* Number */}
                <span
                  className="font-mono font-bold shrink-0 text-sm text-acid/70"
                >
                  0{i + 1}
                </span>

                {/* Title */}
                <h3
                  className="font-display font-bold tracking-tighter text-text group-hover:text-acid group-hover:translate-x-1.5 transition-all duration-300"
                  style={{ fontSize: "clamp(22px, 3vw, 42px)", lineHeight: 1.1 }}
                >
                  {svc.title}
                </h3>
              </div>

              {/* Description + Arrow */}
              <div className="flex items-center justify-between md:justify-end gap-6 pl-12 md:pl-0">
                <p
                  className="max-w-[340px] text-sm text-muted font-body leading-relaxed"
                >
                  {svc.desc}
                </p>

                <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-acid group-hover:bg-acid/10 flex items-center justify-center shrink-0 transition-all duration-300">
                  <ArrowRight
                    className="w-4 h-4 text-muted group-hover:text-acid group-hover:translate-x-0.5 transition-all duration-300"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
