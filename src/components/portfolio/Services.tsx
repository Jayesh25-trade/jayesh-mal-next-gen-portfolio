import { motion } from "framer-motion";
import { Code2, Layout, BarChart3, Cog } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

const ICONS = [Code2, Layout, BarChart3, Cog];

export const Services = () => {
  const { t } = useI18n();
  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mb-10 sm:mb-14 text-center mx-auto"
        >
          <h2 className="text-3xl sm:text-5xl font-display font-semibold gradient-text">{t.services.title}</h2>
          <p className="mt-3 text-muted-foreground">{t.services.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-5xl mx-auto">
          {t.services.items.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="group relative gradient-border p-6 sm:p-7 hover:glow-cyan transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-cyan glow-cyan flex items-center justify-center group-hover:rotate-6 transition-transform">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-semibold">{s.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
