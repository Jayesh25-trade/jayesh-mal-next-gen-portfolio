import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { useI18n } from "@/i18n/I18nProvider";

const word = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { delay: i * 0.06, duration: 0.7, ease: "easeOut" as const },
  }),
};

const FloatingCard = ({ className, delay = 0, children }: { className: string; delay?: number; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: [0, -10, 0] }}
    transition={{ opacity: { delay, duration: 0.8 }, y: { repeat: Infinity, duration: 6, delay, ease: "easeInOut" } }}
    className={`absolute glass rounded-2xl p-3 text-xs font-medium hidden md:block ${className}`}
  >
    {children}
  </motion.div>
);

export const Hero = () => {
  const { t } = useI18n();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const y = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const title = `${t.hero.title1} ${t.hero.title2}`.split(" ");

  return (
    <section id="top" className="relative min-h-[100svh] flex items-center pt-28 sm:pt-32 pb-16 overflow-hidden">
      {/* Mouse-follow light */}
      <motion.div
        aria-hidden
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none fixed top-0 left-0 w-[420px] h-[420px] rounded-full bg-neon-purple/15 blur-3xl z-0 hidden lg:block"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs sm:text-sm mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-neon-cyan" />
            <span className="text-muted-foreground">{t.hero.badge}</span>
          </motion.div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-semibold leading-[1.05] tracking-tight">
            {title.map((w, i) => (
              <motion.span
                key={i} custom={i} variants={word} initial="hidden" animate="visible"
                className={`inline-block mr-[0.25em] ${i >= t.hero.title1.split(" ").length ? "gradient-text" : ""}`}
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3.5 font-medium text-primary-foreground glow-primary hover:scale-[1.03] transition-transform w-full sm:w-auto justify-center"
            >
              {t.hero.ctaWork}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 font-medium hover:border-white/25 transition-colors w-full sm:w-auto justify-center"
            >
              {t.hero.ctaContact}
            </a>
          </motion.div>
        </div>

        {/* Floating preview cards */}
        <div className="relative max-w-5xl mx-auto h-32 mt-10 hidden md:block">
          <FloatingCard className="left-0 top-0" delay={0.2}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-cyan glow-cyan" />
              <div>
                <div className="text-foreground">Smart Bill</div>
                <div className="text-muted-foreground">+38% revenue</div>
              </div>
            </div>
          </FloatingCard>
          <FloatingCard className="right-0 top-4" delay={0.5}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-pink" />
              <div>
                <div className="text-foreground">Foodzz</div>
                <div className="text-muted-foreground">Live orders</div>
              </div>
            </div>
          </FloatingCard>
          <FloatingCard className="left-1/3 top-16" delay={0.8}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary glow-primary" />
              <div>
                <div className="text-foreground">Formomatic</div>
                <div className="text-muted-foreground">PDF Pro</div>
              </div>
            </div>
          </FloatingCard>
        </div>
      </div>
    </section>
  );
};
