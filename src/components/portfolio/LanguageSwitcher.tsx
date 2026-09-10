import { useState } from "react";
import { Globe, Check } from "lucide-react";
import { LANGUAGES } from "@/i18n/dictionaries";
import { useI18n } from "@/i18n/I18nProvider";
import { motion, AnimatePresence } from "framer-motion";

export const LanguageSwitcher = () => {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.code === lang);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-xs sm:text-sm font-bold transition-all cursor-pointer hover:opacity-80 pointer-events-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
        style={{
          background: "transparent",
          border: "none",
          color: "#FFFFFF",
        }}
        aria-label="Change language"
      >
        <Globe className="w-4 h-4 shrink-0 stroke-[2]" style={{ color: "var(--acid)" }} />
        <span className="font-bold tracking-wide" style={{ color: "#FFFFFF" }}>{current?.native}</span>
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="absolute right-0 mt-2 w-64 max-h-80 overflow-y-auto glass-strong rounded-2xl p-2 z-50"
            >
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 text-left text-sm"
                >
                  <span>{l.flag}</span>
                  <span className="flex-1 truncate">{l.native}</span>
                  {l.code === lang && <Check className="w-4 h-4 text-neon-cyan" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
