import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, Github, Linkedin, Mail } from "lucide-react";
import { useEffect } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import portrait from "@/assets/jayesh-portrait.jpg";

const word = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { delay: i * 0.06, duration: 0.7, ease: "easeOut" as const },
  }),
};

export const Hero = () => {
  const { t } = useI18n();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const y = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const title = `${t.hero.title1} ${t.hero.title2}`.split(" ");

  return (
    <section id="top" className="relative min-h-[100svh] flex items-center pt-28 sm:pt-32 pb-16 overflow-hidden">
      <motion.div
        aria-hidden
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none fixed top-0 left-0 w-[420px] h-[420px] rounded-full bg-neon-purple/15 blur-3xl z-0 hidden lg:block"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center">
          {/* LEFT — copy */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs sm:text-sm mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan" />
              </span>
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
              className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3"
            >
              <a href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3.5 font-medium text-primary-foreground glow-primary hover:scale-[1.03] transition-transform w-full sm:w-auto justify-center">
                {t.hero.ctaWork}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#contact"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 font-medium hover:border-white/25 transition-colors w-full sm:w-auto justify-center">
                {t.hero.ctaContact}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 0.6 }}
              className="mt-8 flex items-center justify-center lg:justify-start gap-3"
            >
              {[
                { Icon: Github, href: "https://github.com/" },
                { Icon: Linkedin, href: "https://linkedin.com/" },
                { Icon: Mail, href: "mailto:jayeshneo07@gmail.com" },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-neon-cyan/40 hover:text-neon-cyan transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto order-1 lg:order-2 w-[260px] sm:w-[320px] lg:w-[420px]"
          >
            <div className="absolute -inset-6 bg-gradient-primary opacity-40 blur-3xl rounded-full" />
            <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-neon-cyan/40 via-neon-purple/40 to-neon-pink/40 blur-xl" />
            <div className="relative gradient-border rounded-[2rem] overflow-hidden aspect-square">
              <img
                src={portrait}
                alt="Portrait of Jayesh Mal, full-stack developer"
                width={1024} height={1024}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>

            {/* Floating stat chips */}
            <motion.div
              animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -left-4 sm:-left-10 top-10 glass-strong rounded-2xl px-3 py-2 text-xs"
            >
              <div className="text-neon-cyan font-display text-lg leading-none">3+</div>
              <div className="text-muted-foreground text-[10px] uppercase tracking-wider mt-0.5">Years</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
              className="absolute -right-4 sm:-right-8 top-1/3 glass-strong rounded-2xl px-3 py-2 text-xs"
            >
              <div className="gradient-text font-display text-lg leading-none">20+</div>
              <div className="text-muted-foreground text-[10px] uppercase tracking-wider mt-0.5">Projects</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }}
              className="absolute -right-2 sm:right-4 -bottom-4 glass-strong rounded-2xl px-3 py-2 text-xs flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
              <span>Available now</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
