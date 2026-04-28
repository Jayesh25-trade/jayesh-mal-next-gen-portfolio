import { motion } from "framer-motion";
import { Compass, PenTool, Code2, Rocket } from "lucide-react";

const STEPS = [
  { Icon: Compass, title: "Discover", desc: "We align on goals, audience and success metrics. Quick and focused." },
  { Icon: PenTool, title: "Design", desc: "Wireframes → high-fidelity, animated prototype. You see it before we build." },
  { Icon: Code2, title: "Build", desc: "Production-grade code with tests, CI/CD, and zero technical debt." },
  { Icon: Rocket, title: "Launch", desc: "Deploy on Vercel, monitor performance, iterate based on real data." },
];

export const Process = () => (
  <section className="relative py-20 sm:py-28">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-2xl mx-auto text-center mb-12 sm:mb-16"
      >
        <h2 className="text-3xl sm:text-5xl font-display font-semibold">
          <span className="gradient-text">How we work together</span>
        </h2>
        <p className="mt-3 text-muted-foreground">A simple, transparent 4-step process — from idea to live product.</p>
      </motion.div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* connector line */}
        <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-neon-purple/40 to-transparent" />

        {STEPS.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1, duration: 0.6 }}
            className="relative gradient-border p-6 group hover:glow-primary transition-shadow"
          >
            <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full glass-strong flex items-center justify-center font-display text-sm gradient-text">
              0{i + 1}
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
              <s.Icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
