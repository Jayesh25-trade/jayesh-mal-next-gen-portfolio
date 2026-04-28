import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useI18n } from "@/i18n/I18nProvider";

export const Navbar = () => {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#work", label: t.nav.work },
    { href: "#services", label: t.nav.services },
    { href: "#stack", label: t.nav.stack },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-primary origin-left z-[60]"
      />
      <header
        className={`fixed top-2 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 transition-all`}
      >
        <div className={`mx-auto max-w-6xl flex items-center justify-between rounded-full px-3 sm:px-5 py-2 sm:py-3 transition-all ${scrolled ? "glass-strong" : "glass"}`}>
          <a href="#top" className="flex items-center gap-2 font-display font-semibold text-sm sm:text-base">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-primary glow-primary flex items-center justify-center text-primary-foreground text-xs">JM</span>
            <span className="hidden xs:inline">Jayesh Mal</span>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-white/5">
                {l.label}
              </a>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>
      </header>
    </>
  );
};
