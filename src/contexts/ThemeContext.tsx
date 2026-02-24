"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ThemeMode, Language } from "@/lib/tokens";

interface ThemeContextValue {
  theme: ThemeMode;
  language: Language;
  dir: "ltr" | "rtl";
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: Language) => void;
  toggleTheme: () => void;
  toggleLanguage: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("pret");
  const [language, setLanguageState] = useState<Language>("en");

  const dir = language === "ur" ? "rtl" : "ltr";

  const setTheme = useCallback((t: ThemeMode) => {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  const setLanguage = useCallback((l: Language) => {
    setLanguageState(l);
    document.documentElement.setAttribute("dir", l === "ur" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", l);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "pret" ? "bridal" : "pret");
  }, [theme, setTheme]);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "ur" : "en");
  }, [language, setLanguage]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", language);
  }, [theme, dir, language]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        language,
        dir,
        setTheme,
        setLanguage,
        toggleTheme,
        toggleLanguage,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
