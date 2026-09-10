import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import { LanguageSwitcher } from "@/components/portfolio/LanguageSwitcher";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

const menuVars: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
  visible: { clipPath: "inset(0 0 0% 0)", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
};

const linkVars: Variants = {
  hidden: { y: 80, opacity: 0 },
  visible: (i: number) => ({
    y: 0, opacity: 1,
    transition: { delay: 0.25 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: (i: number) => ({
    y: -60, opacity: 0,
    transition: { delay: i * 0.04, duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  }),
};

export const FullscreenMenu = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <>
      {/* ── Header bar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 sm:px-10 py-3.5 sm:py-4 transition-all duration-300 ${
          open
            ? "bg-transparent border-b border-transparent"
            : "bg-ink/90 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
        }`}
      >
        {/* Logo */}
        <motion.a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-2.5 z-[101]"
          whileHover={{ scale: 1.03 }}
        >
          <span
            className="font-display font-black text-base sm:text-lg tracking-tighter"
            style={{
              color: open ? "var(--ink)" : "var(--cream)",
              transition: "color 0.4s",
            }}
          >
            <span style={{ color: open ? "var(--ink)" : "var(--acid)" }}>J</span>D
          </span>
          <span
            className="hidden sm:inline text-sm font-semibold tracking-wide"
            style={{
              color: open ? "var(--ink)" : "var(--cream)",
              transition: "color 0.4s",
              fontFamily: "var(--font-body)",
            }}
          >
            Jimmzzz Developers
          </span>
        </motion.a>

        {/* Right Action Group: Language Switcher + Hamburger Menu */}
        <div className="flex items-center gap-4 z-[101]">
          <div style={{ filter: open ? "invert(1)" : "none", transition: "filter 0.4s" }}>
            <LanguageSwitcher />
          </div>

          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative w-8 h-5 flex flex-col justify-between cursor-pointer focus:outline-none"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="block h-[2px] w-full origin-center rounded-full"
              style={{ background: open ? "var(--ink)" : "var(--acid)" }}
            />
            <motion.span
              animate={open ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="block h-[2px] w-3/4 self-end rounded-full"
              style={{ background: open ? "var(--ink)" : "var(--cream)" }}
            />
            <motion.span
              animate={open ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="block h-[2px] w-full origin-center rounded-full"
              style={{ background: open ? "var(--ink)" : "var(--acid)" }}
            />
          </button>
        </div>
      </header>

      {/* ── Fullscreen overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            variants={menuVars}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-[99] flex flex-col grain"
            style={{ background: "var(--acid)" }}
          >
            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-6 sm:px-14 lg:px-20 pt-24">
              <div className="rule mb-8" style={{ background: "var(--ink)", opacity: 0.15 }} />
              {NAV_LINKS.map((link, i) => (
                <div key={link.href} className="overflow-hidden">
                  <motion.button
                    custom={i}
                    variants={linkVars}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={() => go(link.href)}
                    className="block w-full text-left font-display font-black tracking-tighter leading-none py-3 sm:py-4 border-b"
                    style={{
                      fontSize: "clamp(32px, 8vw, 120px)",
                      color: "var(--ink)",
                      borderColor: "rgba(0,0,0,0.12)",
                    }}
                    whileHover={{ x: 16 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className="inline-flex items-center gap-4">
                      <span className="label-sm" style={{ color: "var(--ink-2)", opacity: 0.5, fontSize: 12 }}>
                        0{i + 1}
                      </span>
                      {link.label}
                    </span>
                  </motion.button>
                </div>
              ))}
              <div className="rule mt-8" style={{ background: "var(--ink)", opacity: 0.15 }} />
            </nav>

            {/* Footer of menu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="px-6 sm:px-14 lg:px-20 py-8 flex items-center gap-6"
              style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.6, fontSize: 13 }}
            >
              <a href="mailto:jimmy.developers007@gmail.com" className="hover:opacity-100 transition-opacity">
                jimmy.developers007@gmail.com
              </a>
              <span>·</span>
              <a href="https://github.com/Jayesh25-trade" target="_blank" rel="noreferrer" className="hover:opacity-100 transition-opacity">GitHub</a>
              <span>·</span>
              <a href="https://linkedin.com/in/jayesh-mal" target="_blank" rel="noreferrer" className="hover:opacity-100 transition-opacity">LinkedIn</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
