import { useI18n } from "@/i18n/I18nProvider";

export const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="relative bg-ink text-text pt-20 pb-10 border-t border-wire/20 overflow-hidden">
      <div className="section-padding container mx-auto">
        {/* Giant Editorial Brand Typography */}
        <div className="overflow-hidden border-b border-wire/15 pb-8 mb-12">
          <h1 className="font-display font-black text-text/10 tracking-tighter uppercase leading-none select-none text-center" style={{ fontSize: "clamp(48px, 11vw, 180px)" }}>
            Jimmzzz Studio
          </h1>
        </div>

        {/* Footer info grid */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-muted">
          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} — {t.footer}</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://github.com/Jayesh25-trade" target="_blank" rel="noreferrer" className="hover:text-acid transition-colors">
              GitHub
            </a>
            <span>·</span>
            <a href="https://linkedin.com/in/jayesh-mal" target="_blank" rel="noreferrer" className="hover:text-acid transition-colors">
              LinkedIn
            </a>
            <span>·</span>
            <a href="mailto:jimmy.developers007@gmail.com" className="hover:text-acid transition-colors">
              Email
            </a>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-acid transition-colors uppercase tracking-widest"
          >
            ↑ Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};
