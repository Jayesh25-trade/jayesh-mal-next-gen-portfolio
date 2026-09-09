import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const URL = "https://maheshwari-smart-bill.vercel.app/";

export const Featured = () => {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.0, 1.06]);
  const textY    = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  /* Single clip-path curtain reveal — the signature interaction */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".featured-img",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          scrollTrigger: {
            trigger: ".featured-img",
            start: "top 85%",
            end: "top 30%",
            scrub: 1.5,
          }
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="featured"
      className="grain"
      style={{ background: "var(--ink-2)", paddingBlock: "var(--section-py)" }}
    >
      <div className="container-xl">
        {/* Label */}
        <div className="flex items-center justify-between mb-10 sm:mb-14">
          <span className="label-sm">{t.featured.eyebrow}</span>
          <span className="label-sm">04</span>
        </div>

        {/* Full-bleed image with curtain reveal */}
        <div
          className="featured-img relative overflow-hidden w-full mb-6"
          style={{ aspectRatio: "16/8", borderRadius: 2 }}
          data-cursor-view
        >
          <motion.div className="w-full h-full" style={{ scale: imgScale }}>
            <img
              src="/featured-smartbill.jpg"
              alt="Maheshwari Smart Bill dashboard — billing and inventory platform"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
              }}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>
          {/* Overlay gradient */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(12,12,12,0.8) 0%, transparent 50%)" }}
          />
          {/* Category tag on image */}
          <div className="absolute top-5 left-5 tag" style={{ background: "var(--ink)", borderColor: "var(--wire-2)", color: "var(--text)" }}>
            Billing SaaS
          </div>
        </div>

        {/* Below image: title + CTA — asymmetric, not centered */}
        <motion.div
          style={{ y: textY }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-black tracking-tighter"
              style={{ fontSize: "clamp(32px, 5vw, 72px)", color: "var(--text)", lineHeight: 1 }}
            >
              {t.featured.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed"
              style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
            >
              {t.featured.desc}
            </motion.p>
          </div>

          <motion.a
            href={URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -3 }}
            className="shrink-0 inline-flex items-center gap-2 btn-primary"
          >
            {t.featured.visit}
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
