import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

const PROJECTS = [
  {
    name: "Parth Fuel Corporation",
    category: "Energy & Infrastructure",
    description: "Enterprise energy and fuel management portal for Parth Fuel Corporation with real-time delivery tracking, live fuel pricing, and CMS integration.",
    url: "https://parthfuelcorporation.in/",
    img: "/project-parth.jpg",
    tags: ["Next.js", "Tailwind", "Headless CMS"],
    size: "large"
  },
  {
    name: "Gas Agency Hub",
    category: "LPG Distribution SaaS",
    description: "All-in-one LPG gas agency hub for automated cylinder booking, real-time inventory management, consumer billing, and delivery route tracking.",
    url: "https://gas-agency-hub-2-mtyvmbvmx.vercel.app/landing",
    img: "/project-gasagency.jpg",
    tags: ["React", "Node.js", "Realtime DB"],
    size: "small"
  },
  {
    name: "Maheshwari Smart Bill",
    category: "Billing SaaS",
    description: "Complete billing and inventory platform for modern retail. Real-time invoicing, GST-ready exports, and high-speed POS dashboard.",
    url: "https://maheshwari-smart-bill.vercel.app/",
    img: "/featured-smartbill.jpg",
    tags: ["React", "GST API", "Tailwind"],
    size: "medium"
  },
  {
    name: "ResumeZen AI",
    category: "AI SaaS",
    description: "Premium multilingual voice-first resume builder. Create AI-powered, ATS-friendly resumes through natural voice conversations.",
    url: "https://career-compass-ai-five-eosin.vercel.app/",
    img: "/project-resumezen.jpg",
    tags: ["React", "ElevenLabs", "Grok AI"],
    size: "medium"
  },
  {
    name: "STEMOS",
    category: "AI EdTech",
    description: "Next-gen multilingual AI-powered STEM learning platform with real-time AI tutoring and adaptive quizzes.",
    url: "https://stemos-future-learn.vercel.app/",
    img: "/project-stemos.jpg",
    tags: ["React", "Groq AI", "Supabase"],
    size: "small"
  },
  {
    name: "ATELIER 22",
    category: "Luxury E-Commerce",
    description: "Conceptual luxury fashion brand. Custom Vercel SSR adapter for TanStack Start with React 19.",
    url: "https://style-canvas-2s641spov-jayesh25-trades-projects.vercel.app/",
    img: "/project-atelier22.jpg",
    tags: ["React 19", "TanStack"],
    size: "large"
  },
  {
    name: "Jimmyy Foodzz",
    category: "Food Delivery",
    description: "A high-performance food ordering platform featuring real-time orders and interactive catalog layouts.",
    url: "https://jimmyy-fooddzz.vercel.app/",
    img: "/project-foodzz.jpg",
    tags: ["React", "Node.js"],
    size: "medium"
  },
  {
    name: "Formomatic PDF Pro",
    category: "Document SaaS",
    description: "Document tooling SaaS platform specializing in client-side PDF manipulation and Stripe integrations.",
    url: "https://formomatic-pdf-pro.vercel.app/",
    img: "/project-formomatic.jpg",
    tags: ["React", "Stripe"],
    size: "small"
  },
  {
    name: "Dowry181",
    category: "Social Platform",
    description: "Interactive real-time matrimonial product supporting full user authentication and live socket chat.",
    url: "https://dowry181.vercel.app/",
    img: "/project-dowry.jpg",
    tags: ["React", "Auth"],
    size: "small"
  },
];

const ProjectCard = ({ p, i }: { p: typeof PROJECTS[0]; i: number }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--px", String(px));
    el.style.setProperty("--py", String(py));
  };

  return (
    <motion.a
      ref={ref}
      href={p.url} target="_blank" rel="noopener noreferrer"
      data-cursor-view
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: i * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMove}
      className="relative block overflow-hidden group border border-wire/20 hover:border-acid transition-colors duration-300"
      style={{ borderRadius: 4 }}
    >
      {/* Image Container */}
      <div
        className="relative w-full overflow-hidden bg-wire/10"
        style={{ aspectRatio: p.size === "large" ? "16/9" : p.size === "medium" ? "4/3" : "3/2" }}
      >
        <motion.img
          src={p.img}
          alt={`${p.name} preview`}
          loading="lazy" width={1280} height={800}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
          }}
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full object-cover"
        />
        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col justify-end p-5 sm:p-7"
              style={{ background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 60%, transparent 100%)" }}
            >
              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.tags.map(t => (
                  <span key={t} className="tag text-[10px]" style={{ color: "var(--acid)", borderColor: "rgba(223, 255, 0, 0.3)", background: "rgba(223, 255, 0, 0.05)" }}>{t}</span>
                ))}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text)", fontFamily: "var(--font-body)" }}>
                {p.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Always-visible top meta */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <span className="tag text-[10px]" style={{ background: "rgba(12,12,12,0.85)", backdropFilter: "blur(8px)", borderColor: "var(--wire-2)", color: "var(--text)" }}>
            {p.category}
          </span>
          <motion.div
            animate={{ opacity: hovered ? 1 : 0.8, scale: hovered ? 1 : 0.9, rotate: hovered ? 0 : -15 }}
            transition={{ duration: 0.25 }}
            className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: "var(--acid)" }}
          >
            <ArrowUpRight className="w-4 h-4" style={{ color: "var(--ink)" }} />
          </motion.div>
        </div>
      </div>

      {/* Caption */}
      <div className="p-4 bg-ink flex items-center justify-between border-t border-wire/10">
        <div>
          <h3
            className="font-display font-bold tracking-tighter text-text group-hover:text-acid transition-colors"
            style={{ fontSize: "clamp(16px, 1.8vw, 22px)", lineHeight: 1.1 }}
          >
            {p.name}
          </h3>
          <p className="text-xs font-mono text-muted mt-1">{p.url.replace("https://", "").replace("/", "")}</p>
        </div>
        <ArrowUpRight className="w-5 h-5 text-muted group-hover:text-acid group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </motion.a>
  );
};

export const Projects = () => {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 0.3], ["30px", "0px"]);
  const headerO = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="grain"
      style={{ background: "var(--ink)", paddingBlock: "var(--section-py)" }}
    >
      <div className="container-xl">
        <motion.div
          style={{ y: headerY, opacity: headerO }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14"
        >
          <div>
            <span className="label-sm text-acid block mb-3">05 — FLAGSHIP WORK</span>
            <h2
              className="font-display font-black tracking-tighter uppercase"
              style={{ fontSize: "var(--h-section)", color: "var(--text)", lineHeight: 1 }}
            >
              {t.projects.title}
            </h2>
          </div>
          <p className="text-sm" style={{ color: "var(--muted)", fontFamily: "var(--font-body)", maxWidth: 280 }}>
            {t.projects.subtitle}
          </p>
        </motion.div>

        {/* ─── Bento masonry grid ─── */}
        {/* Row 1: Parth Fuel (2/3) + Gas Agency Hub (1/3) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
          <div className="sm:col-span-2"><ProjectCard p={PROJECTS[0]} i={0} /></div>
          <div className="sm:col-span-1"><ProjectCard p={PROJECTS[1]} i={1} /></div>
        </div>

        {/* Row 2: Maheshwari Smart Bill + ResumeZen AI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <ProjectCard p={PROJECTS[2]} i={2} />
          <ProjectCard p={PROJECTS[3]} i={3} />
        </div>

        {/* Row 3: STEMOS (1/3) + ATELIER 22 (2/3) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
          <div className="sm:col-span-1"><ProjectCard p={PROJECTS[4]} i={4} /></div>
          <div className="sm:col-span-2"><ProjectCard p={PROJECTS[5]} i={5} /></div>
        </div>

        {/* Row 4: Jimmyy Foodzz, Formomatic PDF Pro, Dowry181 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <ProjectCard p={PROJECTS[6]} i={6} />
          <ProjectCard p={PROJECTS[7]} i={7} />
          <ProjectCard p={PROJECTS[8]} i={8} />
        </div>
      </div>
    </section>
  );
};
