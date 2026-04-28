import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";

const STACK = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion",
  "Node.js", "Express", "PostgreSQL", "MongoDB", "Supabase",
  "Vite", "Vercel", "Stripe", "Figma", "Git",
];

export const Stack = () => {
  const { t } = useI18n();
  const items = [...STACK, ...STACK]; // duplicate for marquee
  return (
    <section id="stack" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mx-auto text-center mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-5xl font-display font-semibold">
            <span className="gradient-text">{t.stack.title}</span>
          </h2>
          <p className="mt-3 text-muted-foreground">{t.stack.subtitle}</p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex gap-3 sm:gap-4 animate-marquee w-max">
          {items.map((s, i) => (
            <div
              key={i}
              className="glass rounded-2xl px-5 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium whitespace-nowrap hover:glow-cyan hover:border-neon-cyan/40 transition-all"
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
