import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import foodzz from "@/assets/project-foodzz.jpg";
import parth from "@/assets/project-parth.jpg";
import formomatic from "@/assets/project-formomatic.jpg";
import dowry from "@/assets/project-dowry.jpg";
import maisonnorth from "@/assets/project-maisonnorth.jpg";

const PROJECTS = [
  { name: "MAISON NORTH", category: "Editorial fashion e-commerce", url: "https://style-haven-drab.vercel.app/", image: maisonnorth, tags: ["React", "TypeScript", "Framer Motion"] },
  { name: "Jimmyy Foodzz", category: "Food ordering platform", url: "https://jimmyy-fooddzz.vercel.app/", image: foodzz, tags: ["React", "Node", "Live orders"] },
  { name: "Parth Fuel Corporation", category: "Corporate website", url: "https://parthfuelcorporation.vercel.app/", image: parth, tags: ["Next.js", "SEO", "CMS"] },
  { name: "Formomatic PDF Pro", category: "Document tooling SaaS", url: "https://formomatic-pdf-pro.vercel.app/", image: formomatic, tags: ["React", "PDF.js", "Stripe"] },
  { name: "Dowry181", category: "Matrimonial product", url: "https://dowry181.vercel.app/", image: dowry, tags: ["React", "Auth", "Realtime"] },
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
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.image}
                  alt={`${p.name} preview`}
                  loading="lazy" width={1280} height={800}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span key={tag} className="glass rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{p.category}</div>
                      <div className="font-display text-lg sm:text-xl mt-0.5 truncate">{p.name}</div>
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-1.5 glass-strong rounded-full px-3 py-1.5 text-xs font-medium group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-all">
                      {t.projects.visit}
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
