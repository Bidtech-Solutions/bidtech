"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, TranslationDictionary, translations } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationDictionary;
  isId: boolean;
  isEn: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "konterku_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (savedLang === "id" || savedLang === "en") {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang;
      }
    } catch {
      // Ignore localStorage access errors
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {
      // Ignore localStorage write errors
    }
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === "id" ? "en" : "id";
    setLanguage(nextLang);
  };

  // Safe fallback to 'id' if invalid
  const currentLang = language in translations ? language : "id";
  const t = translations[currentLang];

  return (
    <LanguageContext.Provider
      value={{
        language: currentLang,
        setLanguage,
        toggleLanguage,
        t,
        isId: currentLang === "id",
        isEn: currentLang === "en",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

