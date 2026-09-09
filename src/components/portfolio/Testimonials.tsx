import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";

const TESTIMONIALS = [
  { quote: "Jimmzzz Developers delivered our billing system 2 weeks ahead of schedule. Sales tracking is now effortless and our team loves it.", name: "Maheshwari Group", role: "Retail business", initials: "MG" },
  { quote: "The food ordering site looks better than apps from billion-dollar startups. Orders went up the first week we launched.", name: "Jimmyy Foodzz", role: "Restaurant owner", initials: "JF" },
  { quote: "Professional, fast, and obsessive about details. Our corporate site finally matches our brand.", name: "Parth Fuel Corp.", role: "Operations head", initials: "PF" },
];

export const Testimonials = () => {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a === 0 ? TESTIMONIALS.length - 1 : a - 1));
  const next = () => setActive((a) => (a === TESTIMONIALS.length - 1 ? 0 : a + 1));

  const current = TESTIMONIALS[active];

  return (
    <section id="testimonials" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="section-padding container mx-auto">
        {/* Section Tagline */}
        <div className="flex items-center gap-4 mb-16">
          <span className="label-sm text-acid">06 — CLIENT TALK</span>
          <div className="rule flex-1" />
        </div>

        {/* Studio Editorial Quote Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          {/* Left 8 cols: Active quote */}
          <div className="lg:col-span-8 relative">
            <span className="font-display font-black text-wire/20 select-none block leading-none -mb-8 sm:-mb-14" style={{ fontSize: "clamp(120px, 20vw, 240px)" }}>
              “
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10"
              >
                <p className="font-display font-bold text-text leading-tight tracking-tight" style={{ fontSize: "clamp(24px, 3.5vw, 44px)" }}>
                  "{current.quote}"
                </p>

                <div className="mt-10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-acid/40 flex items-center justify-center font-display font-bold text-sm text-acid bg-acid/5">
                    {current.initials}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-text">{current.name}</h4>
                    <p className="text-xs text-muted font-mono uppercase tracking-widest mt-0.5">{current.role}</p>
                  </div>
                  <div className="ml-auto flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-acid text-acid" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right 4 cols: Interactive pagination & list switch */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-8 border-t lg:border-t-0 lg:border-l border-wire/20 pt-8 lg:pt-0 lg:pl-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted font-mono mb-4">Client Roster</p>
              <div className="space-y-3">
                {TESTIMONIALS.map((t, idx) => (
                  <button
                    key={t.name}
                    onClick={() => setActive(idx)}
                    className={`w-full text-left p-3 rounded-lg border transition-all duration-300 flex items-center justify-between ${
                      active === idx
                        ? "border-acid bg-acid/5 text-text"
                        : "border-wire/20 text-muted hover:text-text hover:border-wire"
                    }`}
                  >
                    <span className="font-display font-semibold text-sm">{t.name}</span>
                    <span className="text-xs font-mono opacity-50">0{idx + 1}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Prev / Next controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-12 h-12 rounded-full border border-wire/30 flex items-center justify-center text-text hover:border-acid hover:text-acid hover:bg-acid/10 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="w-12 h-12 rounded-full border border-wire/30 flex items-center justify-center text-text hover:border-acid hover:text-acid hover:bg-acid/10 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
              <span className="font-mono text-xs text-muted ml-auto">
                0{active + 1} / 0{TESTIMONIALS.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
