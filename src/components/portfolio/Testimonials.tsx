import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "Jayesh delivered our billing system 2 weeks ahead of schedule. Sales tracking is now effortless and our team loves it.",
    name: "Maheshwari Group",
    role: "Retail business",
    initials: "MG",
    gradient: "from-neon-cyan to-neon-blue",
  },
  {
    quote: "The food ordering site looks better than apps from billion-dollar startups. Orders went up the first week we launched.",
    name: "Jimmyy Foodzz",
    role: "Restaurant owner",
    initials: "JF",
    gradient: "from-neon-pink to-neon-purple",
  },
  {
    quote: "Professional, fast, and obsessive about details. Our corporate site finally matches our brand.",
    name: "Parth Fuel Corp.",
    role: "Operations head",
    initials: "PF",
    gradient: "from-neon-purple to-neon-blue",
  },
];

export const Testimonials = () => (
  <section className="relative py-20 sm:py-28">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-2xl mx-auto text-center mb-12 sm:mb-16"
      >
        <h2 className="text-3xl sm:text-5xl font-display font-semibold">
          <span className="gradient-text">Loved by teams</span>
        </h2>
        <p className="mt-3 text-muted-foreground">Real words from real clients I've shipped products with.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ y: -4 }}
            className="relative gradient-border p-6 sm:p-7 flex flex-col"
          >
            <Quote className="w-8 h-8 text-neon-purple/40 mb-3" />
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed flex-1">"{t.quote}"</p>
            <div className="mt-5 flex items-center gap-3 pt-5 border-t border-white/5">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center font-display text-sm font-semibold text-primary-foreground`}>
                {t.initials}
              </div>
              <div className="min-w-0">
                <div className="font-medium text-sm truncate">{t.name}</div>
                <div className="text-xs text-muted-foreground truncate">{t.role}</div>
              </div>
              <div className="ml-auto flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-neon-cyan text-neon-cyan" />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
