import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  {
    q: "How long does a typical project take?",
    a: "Landing pages: 1–2 weeks. Full web apps: 4–8 weeks depending on scope. You'll get a clear timeline after the discovery call.",
  },
  {
    q: "Do you handle both design and development?",
    a: "Yes. I design in Figma and build in React/Next.js — so the UI you approve is exactly what ships, pixel-perfect.",
  },
  {
    q: "What's your pricing model?",
    a: "Fixed price per project for clear scopes, or weekly retainer for ongoing work. Always transparent — no surprise invoices.",
  },
  {
    q: "Will my site be fast and SEO-friendly?",
    a: "Absolutely. Every project ships with 90+ Lighthouse scores, semantic HTML, structured data, and Core Web Vitals tuned.",
  },
  {
    q: "Do you offer post-launch support?",
    a: "Yes — 30 days of free bug fixes after launch, plus optional monthly maintenance plans.",
  },
];

export const FAQ = () => (
  <section className="relative py-20 sm:py-28">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-2xl mx-auto text-center mb-10 sm:mb-14"
      >
        <h2 className="text-3xl sm:text-5xl font-display font-semibold">
          <span className="gradient-text">Frequently asked</span>
        </h2>
        <p className="mt-3 text-muted-foreground">Everything you need to know before we start.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-3xl mx-auto"
      >
        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i} value={`item-${i}`}
              className="gradient-border px-5 sm:px-6 border-0 rounded-2xl overflow-hidden"
            >
              <AccordionTrigger className="text-left font-display text-base sm:text-lg hover:no-underline py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);
