"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

import { id } from "./id";
import { en } from "./en";

export type Lang = "id" | "en";

const translations = { id, en };
const LANGUAGE_STORAGE_KEY = "bidtech-lang";

type Translations = typeof translations.id;

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  initialLang = "id",
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const pathname = usePathname();
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== "undefined" && window.location.pathname.startsWith("/en")) {
      return "en";
    }
    return initialLang;
  });

  // Keep language in sync with URL pathname
  useEffect(() => {
    if (pathname) {
      if (pathname === "/en" || pathname.startsWith("/en/")) {
        setLangState("en");
        return;
      }
      if (pathname === "/id" || pathname.startsWith("/id/")) {
        setLangState("id");
        return;
      }
    }
    if (initialLang && (initialLang === "id" || initialLang === "en")) {
      setLangState(initialLang);
    }
  }, [pathname, initialLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
      document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000;SameSite=Lax`;
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
