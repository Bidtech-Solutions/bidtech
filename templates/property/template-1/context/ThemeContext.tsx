"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isLight: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("denn_house_theme") as Theme | null;
      if (savedTheme === "dark" || savedTheme === "light") {
        setThemeState(savedTheme);
        applyThemeClass(savedTheme);
      } else {
        applyThemeClass("dark");
      }
    } catch {
      applyThemeClass("dark");
    }
  }, []);

  const applyThemeClass = (newTheme: Theme) => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (newTheme === "light") {
        root.classList.remove("dark");
        root.classList.add("light");
      } else {
        root.classList.remove("light");
        root.classList.add("dark");
      }
    }
  };

  const toggleTheme = () => {
    setThemeState((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("denn_house_theme", next);
      } catch {
        // Ignore localStorage restrictions
      }
      applyThemeClass(next);
      return next;
    });
  };

  const handleSetTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("denn_house_theme", newTheme);
    } catch {
      // Ignore
    }
    applyThemeClass(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme: handleSetTheme,
        isLight: theme === "light",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: "dark" as Theme,
      toggleTheme: () => {},
      setTheme: () => {},
      isLight: false,
    };
  }
  return context;
}
