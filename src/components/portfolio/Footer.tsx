import { useI18n } from "@/i18n/I18nProvider";
export const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="relative py-10 border-t border-white/5">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} — {t.footer}
      </div>
    </footer>
  );
};
