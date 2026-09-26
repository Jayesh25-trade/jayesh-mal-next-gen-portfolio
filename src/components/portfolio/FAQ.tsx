import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIsDeck } from "@/hooks/use-deck";

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

export const FAQ = () => {
  const isDeck = useIsDeck();

  /* ── PHONE DECK: the whole list fits one screen ── */
  if (isDeck) {
    return (
      <section
        data-deck-slide=""
        data-deck-title="FAQ"
        className="deck-slide grain relative overflow-hidden"
        style={{ background: "rgba(12, 12, 12, 0.7)" }}
      >
        <div className="container-xl relative z-10">
          <div className="mb-4 flex items-center gap-4">
            <span className="label-sm text-acid">07 — INQUIRIES</span>
            <div className="rule flex-1" />
          </div>

          <h2
            className="font-display font-black text-text uppercase tracking-tighter"
            style={{ fontSize: "clamp(26px, 7.5vw, 34px)", lineHeight: 1 }}
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-[13px] text-muted">
            Everything you need to know before we start working together.
          </p>

          <div className="mt-4">
            <Accordion type="single" collapsible className="space-y-0">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-b border-wire/20 pb-2 border-t-0 border-x-0 rounded-none group transition-colors"
                >
                  <AccordionTrigger className="text-left font-display font-bold text-[14px] text-text hover:text-acid hover:no-underline py-3 flex items-center justify-between gap-3">
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-acid opacity-70">0{i + 1}</span>
                      {f.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent
                    className="text-muted leading-relaxed pb-2 pt-1 text-[12px] font-normal pl-7"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="faq" className="relative py-28 sm:py-36">
      <div className="section-padding container mx-auto">
        {/* Header Tagline */}
        <div className="flex items-center gap-4 mb-16">
          <span className="label-sm text-acid">07 — INQUIRIES</span>
          <div className="rule flex-1" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Big Headline */}
          <div className="lg:col-span-5">
            <h2 className="font-display font-black text-text uppercase tracking-tighter sticky top-28" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
              Frequently<br />Asked Questions
            </h2>
            <p className="mt-4 text-muted text-sm max-w-sm">
              Everything you need to know before we start working together.
            </p>
          </div>

          {/* Right Column: Editorial Accordion List */}
          <div className="lg:col-span-7">
            <Accordion type="single" collapsible className="space-y-4">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-b border-wire/20 pb-4 border-t-0 border-x-0 rounded-none group transition-colors"
                >
                  <AccordionTrigger className="text-left font-display font-bold text-lg sm:text-xl text-text hover:text-acid hover:no-underline py-4 flex items-center justify-between gap-4">
                    <span className="flex items-center gap-4">
                      <span className="text-xs font-mono text-acid opacity-70">0{i + 1}</span>
                      {f.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted leading-relaxed pb-4 pt-2 text-sm sm:text-base font-normal max-w-xl pl-8">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
