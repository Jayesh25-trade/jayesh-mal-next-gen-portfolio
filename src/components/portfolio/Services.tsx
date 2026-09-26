import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import { ArrowRight } from "lucide-react";
import { useIsDeck } from "@/hooks/use-deck";
import { STACK } from "@/components/portfolio/Stack";

export const Services = () => {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isDeck = useIsDeck();

  /* ── PHONE DECK: services and tech stack as one capability screen ── */
  if (isDeck) {
    return (
      <section
        data-deck-slide=""
        data-deck-title="Capabilities"
        className="deck-slide grain relative overflow-hidden"
        style={{ background: "var(--cream)", color: "var(--ink)" }}
      >
        <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />
        <div className="container-xl relative z-10">
          <div className="mb-3 flex items-center justify-between">
            <span className="label-sm" style={{ color: "var(--muted-2)" }}>07</span>
            <span className="label-sm" style={{ color: "var(--muted-2)" }}>Capabilities</span>
          </div>

          <h2
            className="font-display font-black tracking-tighter"
            style={{ fontSize: "clamp(28px, 8vw, 38px)", color: "var(--ink)", lineHeight: 1 }}
          >
            {t.services.title}
          </h2>
          <p
            className="mt-2 text-[13px] leading-relaxed"
            style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
          >
            {t.services.subtitle}
          </p>

          <div className="mt-4">
            {t.services.items.map((svc, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-2.5"
                style={{ borderTop: "1px solid var(--cream-2)" }}
              >
                <span
                  className="font-display font-black shrink-0"
                  style={{ fontSize: 11, color: "var(--acid-dim)" }}
                >
                  0{i + 1}
                </span>
                <div className="min-w-0">
                  <h3
                    className="font-display font-bold tracking-tight truncate"
                    style={{ fontSize: 15, color: "var(--ink)", lineHeight: 1.2 }}
                  >
                    {svc.title}
                  </h3>
                  <p
                    className="text-[11px] leading-snug"
                    style={{
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {svc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-4 overflow-hidden"
            style={{ borderTop: "1px solid var(--cream-2)", borderBottom: "1px solid var(--cream-2)" }}
          >
            <div className="marquee-track flex w-max items-center gap-4 py-2">
              {[...STACK, ...STACK].map((s, i) => (
                <span
                  key={i}
                  className="flex shrink-0 items-center gap-3 font-display font-black tracking-tighter"
                  style={{ fontSize: 15, color: i % 3 === 0 ? "var(--acid-dim)" : "var(--muted-2)" }}
                >
                  {s}
                  <span style={{ fontSize: 9, color: "var(--muted-2)" }} aria-hidden>
                    ✦
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

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
