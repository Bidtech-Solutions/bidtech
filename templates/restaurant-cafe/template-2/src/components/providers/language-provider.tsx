"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (id: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "deny_restaurant_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (saved === "id" || saved === "en") {
        setLanguageState(saved);
      }
    } catch {
      // Ignore localStorage security/private mode issues
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  };

  const toggleLanguage = () => {
    setLanguage(language === "id" ? "en" : "id");
  };

  const t = (idText: string, enText: string): string => {
    // If not mounted yet, default to id to maintain stable SSR hydration
    if (!mounted) return idText;
    return language === "en" ? enText : idText;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return fallback if used outside provider
    return {
      language: "id" as Language,
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: (idText: string, enText: string) => idText,
    };
  }
  return context;
}
