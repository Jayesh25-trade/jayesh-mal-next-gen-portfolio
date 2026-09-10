import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
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
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pctX = (x / rect.width) * 100;
    const pctY = (y / rect.height) * 100;

    // 3D Tilt calculation
    const rx = ((y - rect.height / 2) / (rect.height / 2)) * -12;
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 12;

    setRotX(rx);
    setRotY(ry);
    setGlowPos({ x: pctX, y: pctY });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setRotX(0);
    setRotY(0);
  };

  return (
    <motion.a
      ref={ref}
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-view
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: i * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ perspective: 1000 }}
      className="block group"
    >
      <motion.div
        animate={{ rotateX: rotX, rotateY: rotY }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="glass-slab rounded-xl overflow-hidden relative transform-gpu transition-all duration-300"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Dynamic Colored Shadow / Glow Spot */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, rgba(184, 255, 0, 0.22), transparent 80%)`,
          }}
        />

        {/* Image Stage */}
        <div
          className="relative w-full overflow-hidden bg-wire/10"
          style={{ aspectRatio: p.size === "large" ? "16/9" : p.size === "medium" ? "4/3" : "3/2" }}
        >
          <motion.img
            src={p.img}
            alt={`${p.name} preview`}
            loading="lazy"
            width={1280}
            height={800}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
            }}
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full object-cover"
          />

          {/* Particle Wave Overlay on Hover */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col justify-end p-5 sm:p-7 z-20"
                style={{
                  background: "linear-gradient(to top, rgba(12,12,12,0.96) 0%, rgba(12,12,12,0.4) 65%, transparent 100%)",
                }}
              >
                <div className="flex items-center gap-1.5 text-acid text-xs font-mono mb-2">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>3D SLAB PREVIEW</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.tags.map(t => (
                    <span key={t} className="tag text-[10px] text-acid border-acid/30 bg-acid/10">{t}</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-text font-body">
                  {p.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Top Category Badge */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-30">
            <span className="tag text-[10px] bg-ink/80 backdrop-blur-md border-wire-2 text-text">
              {p.category}
            </span>
            <motion.div
              animate={{ opacity: hovered ? 1 : 0.7, scale: hovered ? 1.05 : 0.9, rotate: hovered ? 0 : -15 }}
              transition={{ duration: 0.25 }}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-acid shadow-lg"
            >
              <ArrowUpRight className="w-4 h-4 text-ink" />
            </motion.div>
          </div>
        </div>

        {/* Caption Bar */}
        <div className="p-4 bg-ink/80 border-t border-wire/10 flex items-center justify-between">
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
      </motion.div>
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
      className="grain aurora-bg"
      style={{ background: "var(--ink)", paddingBlock: "var(--section-py)" }}
    >
      <div className="container-xl">
        <motion.div
          style={{ y: headerY, opacity: headerO }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14"
        >
          <div>
            <span className="label-sm text-acid block mb-3">05 — 3D GLASS SLABS</span>
            <h2
              className="font-display font-black tracking-tighter uppercase text-text"
              style={{ fontSize: "var(--h-section)", lineHeight: 1 }}
            >
              {t.projects.title}
            </h2>
          </div>
          <p className="text-sm text-muted font-body max-w-[280px]">
            {t.projects.subtitle}
          </p>
        </motion.div>

        {/* Bento masonry grid */}
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
