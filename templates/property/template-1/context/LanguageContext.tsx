"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "id";

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("denn_house_lang") as Language;
      if (saved === "en" || saved === "id") {
        setLang(saved);
      }
    } catch {
      // Ignore localStorage access issues
    }
  }, []);

  const toggleLang = () => {
    setLang((prev) => {
      const next: Language = prev === "en" ? "id" : "en";
      try {
        localStorage.setItem("denn_house_lang", next);
      } catch {
        // Ignore localStorage access issues
      }
      return next;
    });
  };

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem("denn_house_lang", newLang);
    } catch {
      // Ignore
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLang: handleSetLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Provide a fallback if not wrapped in provider
    return {
      lang: "en" as Language,
      toggleLang: () => {},
      setLang: () => {},
    };
  }
  return context;
}
