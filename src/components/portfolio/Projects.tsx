import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

const PROJECTS = [
  { name: "Jimmyy Foodzz", category: "Food ordering", url: "https://jimmyy-fooddzz.vercel.app/", gradient: "from-neon-pink/40 to-neon-purple/40" },
  { name: "Parth Fuel Corporation", category: "Business site", url: "https://parthfuelcorporation.vercel.app/", gradient: "from-neon-cyan/40 to-neon-blue/40" },
  { name: "Formomatic PDF Pro", category: "Document tooling", url: "https://formomatic-pdf-pro.vercel.app/", gradient: "from-neon-purple/40 to-neon-blue/40" },
  { name: "Dowry181", category: "Web product", url: "https://dowry181.vercel.app/", gradient: "from-neon-blue/40 to-neon-pink/40" },
];

export const Projects = () => {
  const { t } = useI18n();
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-5xl font-display font-semibold">
            <span className="gradient-text">{t.projects.title}</span>
          </h2>
          <p className="mt-3 text-muted-foreground">{t.projects.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.url} href={p.url} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="group relative gradient-border overflow-hidden rounded-3xl block"
            >
              <div className={`relative aspect-[16/10] bg-gradient-to-br ${p.gradient} overflow-hidden`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(0_0%_100%/0.15),transparent_60%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="font-display text-3xl sm:text-4xl font-semibold opacity-30 group-hover:opacity-60 transition-opacity text-center px-4">
                    {p.name}
                  </div>
                </div>
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{p.category}</div>
                      <div className="font-display text-lg sm:text-xl mt-0.5">{p.name}</div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1.5 text-xs font-medium">
                      {t.projects.visit}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
