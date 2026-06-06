import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import foodzz from "@/assets/project-foodzz.jpg";
import parth from "@/assets/project-parth.jpg";
import formomatic from "@/assets/project-formomatic.jpg";
import dowry from "@/assets/project-dowry.jpg";
import maisonnorth from "@/assets/project-maisonnorth.jpg";
import atelier22 from "@/assets/project-atelier22.jpg";
import resumezen from "@/assets/project-resumezen.jpg";
import stemos from "@/assets/project-stemos.jpg";

const PROJECTS = [
  {
    name: "ResumeZen AI",
    category: "AI SaaS",
    description: "Premium multilingual voice-first resume builder. Create AI-powered, ATS-friendly resumes through natural voice conversations in multiple Indian & international languages.",
    url: "https://career-compass-ai-five-eosin.vercel.app/",
    image: resumezen,
    tags: ["React", "Vite", "ElevenLabs", "Grok AI", "Razorpay"],
  },
  {
    name: "STEMOS",
    category: "AI EdTech",
    description: "Next-gen multilingual AI-powered STEM learning platform. Real-time AI tutoring, adaptive quizzes, gamified progress tracking & personalized learning paths.",
    url: "https://stemos-future-learn.vercel.app/",
    image: stemos,
    tags: ["React", "TypeScript", "Groq AI", "Supabase", "Tailwind"],
  },
  {
    name: "ATELIER 22",
    category: "Luxury E-Commerce",
    description: "Conceptual luxury fashion brand built with quality over speed. Custom Vercel SSR adapter for TanStack Start with React 19, near-instant loads & perfect SEO.",
    url: "https://style-canvas-2s641spov-jayesh25-trades-projects.vercel.app/",
    image: atelier22,
    tags: ["React 19", "TanStack Start", "Vercel SSR"],
  },
  {
    name: "Maren & Studio",
    category: "Interior Design Showcase",
    description: "European interior design practice website showing calm, organic, timeless spaces crafted from honest materials across 80+ projects in 12 countries.",
    url: "https://design-showcase-rho.vercel.app/",
    image: maisonnorth,
    tags: ["React", "TypeScript", "Framer Motion"],
  },
  {
    name: "Jimmyy Foodzz",
    category: "Food Delivery Platform",
    description: "A high-performance food ordering platform featuring real-time orders, responsive navigation, and interactive catalog layouts.",
    url: "https://jimmyy-fooddzz.vercel.app/",
    image: foodzz,
    tags: ["React", "Node.js", "Live orders"],
  },
  {
    name: "Parth Fuel Corporation",
    category: "Corporate Web Portal",
    description: "Fully optimized corporate landing page and portal featuring headless CMS integrations, complete SEO config, and rich animations.",
    url: "https://parthfuelcorporation.vercel.app/",
    image: parth,
    tags: ["Next.js", "SEO", "CMS"],
  },
  {
    name: "Formomatic PDF Pro",
    category: "Document SaaS",
    description: "Document tooling SaaS platform specializing in client-side PDF manipulation, Stripe integrations, and high-performance workflows.",
    url: "https://formomatic-pdf-pro.vercel.app/",
    image: formomatic,
    tags: ["React", "PDF.js", "Stripe"],
  },
  {
    name: "Dowry181",
    category: "Social Matrimonial Platform",
    description: "Interactive real-time matrimonial product supporting full user authentication, instant searches, and live socket chat.",
    url: "https://dowry181.vercel.app/",
    image: dowry,
    tags: ["React", "Auth", "Realtime"],
  },
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.url} href={p.url} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="group relative gradient-border overflow-hidden rounded-3xl block flex flex-col h-full bg-card/20 backdrop-blur-sm transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={p.image}
                  alt={`${p.name} preview`}
                  loading="lazy" width={1280} height={800}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <span className="absolute top-4 left-4 glass rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-neon-cyan border border-neon-cyan/20">
                  {p.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="flex-1 flex flex-col p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-lg sm:text-xl font-bold group-hover:text-neon-cyan transition-colors truncate">
                    {p.name}
                  </h3>
                  <span className="shrink-0 inline-flex items-center gap-1.5 glass-strong rounded-full px-3 py-1.5 text-xs font-medium group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-all">
                    {t.projects.visit}
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                  {p.description}
                </p>

                {/* Tech Stack Chips */}
                <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span key={tag} className="bg-white/5 text-[10px] text-muted-foreground px-2 py-0.5 rounded-md font-medium uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
