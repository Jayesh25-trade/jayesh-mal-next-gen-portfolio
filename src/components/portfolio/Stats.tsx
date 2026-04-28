import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

const STATS = [
  { value: 20, suffix: "+", label: "Projects shipped" },
  { value: 15, suffix: "+", label: "Happy clients" },
  { value: 3, suffix: "+", label: "Years building" },
  { value: 99, suffix: "%", label: "Client retention" },
];

const Counter = ({ to, suffix }: { to: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1500, bounce: 0 });

  useEffect(() => { if (inView) mv.set(to); }, [inView, to, mv]);
  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toString() + suffix;
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

export const Stats = () => (
  <section className="relative py-12 sm:py-16">
    <div className="container mx-auto px-4">
      <div className="relative gradient-border rounded-3xl p-6 sm:p-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50 pointer-events-none" />
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold gradient-text">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
