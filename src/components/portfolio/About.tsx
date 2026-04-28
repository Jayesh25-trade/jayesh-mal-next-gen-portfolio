import { motion } from "framer-motion";
import { Check } from "lucide-react";
import workspace from "@/assets/about-workspace.jpg";

const POINTS = [
  "Pixel-perfect UI built with React, Next.js & Tailwind",
  "Scalable backends with Node, PostgreSQL & Supabase",
  "Conversion-focused design with motion & micro-interactions",
  "SEO, Core Web Vitals & accessibility — built in",
];

export const About = () => {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-cyan opacity-30 blur-3xl rounded-3xl" />
            <div className="relative gradient-border overflow-hidden rounded-3xl">
              <img
                src={workspace}
                alt="Modern developer workspace with neon RGB lighting"
                loading="lazy" width={1280} height={960}
                className="w-full h-auto block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 glass-strong rounded-2xl px-4 py-3 max-w-[180px]">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Mission</div>
              <div className="font-display text-sm mt-0.5">Ship beautiful, fast products that convert.</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
              <span className="text-muted-foreground">About me</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-semibold leading-tight">
              Hi, I'm <span className="gradient-text">Jayesh Mal</span> —
              a full-stack developer building products people love.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              I design and engineer modern web experiences end-to-end — from concept,
              to a polished UI, to a production-grade backend. I obsess over performance,
              motion, and the tiny details that make a product feel premium.
            </p>

            <ul className="mt-7 space-y-3">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-gradient-primary flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
                  </span>
                  <span className="text-foreground/90">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
