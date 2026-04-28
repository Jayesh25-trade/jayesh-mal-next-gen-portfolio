import { createContext, useContext, useEffect, useState, ReactNode, createElement } from "react";
import { DICTS, LANGUAGES, LangCode, Dict } from "./dictionaries";

type Ctx = { lang: LangCode; setLang: (l: LangCode) => void; t: Dict; isRTL: boolean };
const I18nContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "jm_lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as LangCode | null;
    if (stored && DICTS[stored]) setLangState(stored);
  }, []);

  const isRTL = !!LANGUAGES.find((l) => l.code === lang)?.rtl;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [lang, isRTL]);

  const setLang = (l: LangCode) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  const t = DICTS[lang] ?? DICTS.en;
  return createElement(I18nContext.Provider, { value: { lang, setLang, t, isRTL } }, children);
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

export function hasChosenLanguage() {
  return typeof localStorage !== "undefined" && !!localStorage.getItem(STORAGE_KEY);
}
