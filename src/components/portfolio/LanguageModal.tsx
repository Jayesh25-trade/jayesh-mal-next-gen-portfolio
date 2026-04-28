import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LANGUAGES } from "@/i18n/dictionaries";
import { useI18n, hasChosenLanguage } from "@/i18n/I18nProvider";

export const LanguageModal = () => {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(lang);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!hasChosenLanguage()) setOpen(true);
  }, []);

  useEffect(() => { setSelected(lang); }, [lang]);

  const filtered = LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.native.toLowerCase().includes(query.toLowerCase())
  );

  const confirm = () => {
    setLang(selected);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", damping: 24, stiffness: 240 }}
            className="glass-strong gradient-border w-full max-w-2xl rounded-3xl p-5 sm:p-8 max-h-[90vh] flex flex-col"
          >
            <div className="text-center mb-5">
              <h2 className="text-2xl sm:text-3xl font-display font-semibold gradient-text">
                {t.modal.title}
              </h2>
              <p className="text-muted-foreground mt-2 text-sm sm:text-base">{t.modal.subtitle}</p>
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search language…"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neon-cyan/60 transition-colors mb-4"
            />

            <div className="overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-2 pr-1 flex-1 min-h-0">
              {filtered.map((l) => {
                const active = selected === l.code;
                return (
                  <button
                    key={l.code}
                    onClick={() => setSelected(l.code)}
                    className={`relative text-left rounded-xl px-3 py-2.5 border transition-all ${
                      active
                        ? "border-neon-purple/60 bg-neon-purple/10 glow-primary"
                        : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg leading-none">{l.flag}</span>
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">{l.native}</div>
                        <div className="text-[11px] text-muted-foreground truncate">{l.name}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={confirm}
              className="mt-5 w-full rounded-xl bg-gradient-primary py-3.5 font-medium text-primary-foreground hover:opacity-90 transition-opacity glow-primary"
            >
              {t.modal.continue}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
