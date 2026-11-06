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

function langFromPath(pathname: string | null): Lang | null {
  if (!pathname) return null;
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/id" || pathname.startsWith("/id/")) return "id";
  return null;
}

export function LanguageProvider({
  children,
  initialLang = "id",
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const pathname = usePathname();
  // Bahasa awal diambil dari URL (usePathname tersedia juga saat render di server),
  // sehingga HTML server dan render pertama di browser sama-sama memakai bahasa yang benar.
  // Sebelumnya server selalu merender "id" untuk /en, memicu hydration mismatch + render ulang penuh.
  const [lang, setLangState] = useState<Lang>(() => langFromPath(pathname) ?? initialLang);

  // Keep language in sync with URL pathname
  useEffect(() => {
    setLangState(langFromPath(pathname) ?? initialLang);
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
