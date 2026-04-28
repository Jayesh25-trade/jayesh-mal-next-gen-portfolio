import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { useRef } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import featuredImg from "@/assets/featured-smartbill.jpg";

const URL = "https://maheshwari-smart-bill.vercel.app/";

export const Featured = () => {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.02, 0.98]);

  return (
    <section id="work" ref={ref} className="relative py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs mb-4">
            <Star className="w-3.5 h-3.5 text-neon-cyan" />
            <span className="text-muted-foreground">{t.featured.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-semibold gradient-text">
            {t.featured.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.featured.desc}</p>
        </motion.div>

        <motion.a
          href={URL} target="_blank" rel="noopener noreferrer"
          aria-label={`${t.featured.title} — ${t.featured.visit}`}
          style={{ scale }}
          className="block relative max-w-5xl mx-auto group"
        >
          <div className="absolute -inset-4 bg-gradient-primary opacity-30 blur-3xl rounded-[2rem] group-hover:opacity-60 transition-opacity" />
          <div className="relative gradient-border overflow-hidden rounded-3xl">
            <motion.img
              src={featuredImg}
              alt="Maheshwari Smart Bill dashboard preview"
              loading="lazy" width={1536} height={960}
              style={{ y }}
              className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Live</div>
                <div className="font-display text-xl sm:text-2xl">{t.featured.title}</div>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground glow-primary group-hover:scale-105 transition-transform">
                {t.featured.visit}
                <ExternalLink className="w-4 h-4" />
              </span>
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
};
