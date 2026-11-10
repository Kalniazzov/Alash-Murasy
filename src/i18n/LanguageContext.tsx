import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { kk } from './kk';
import { en } from './en';

export type Language = 'kz' | 'en';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const STORAGE_KEY = 'alash_language';

const translations: Record<Language, Record<string, string>> = {
  kz: kk,
  en: en,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'kz' || saved === 'en') {
        return saved;
      }
    } catch {
      // In-memory fallback if localStorage is blocked
    }
    return 'kz';
  });

  // Synchronize document html lang attribute and localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore quota/security errors
    }
    document.documentElement.lang = language === 'kz' ? 'kk' : 'en';
  }, [language]);

  const setLanguage = useCallback((newLang: Language) => {
    setLanguageState(newLang);
  }, []);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const currentDict = translations[language];
      if (currentDict && currentDict[key] !== undefined) {
        return currentDict[key];
      }
      // Fallback to Kazakh if missing in English
      const kzDict = translations['kz'];
      if (kzDict && kzDict[key] !== undefined) {
        return kzDict[key];
      }
      // Return provided fallback or raw key
      return fallback !== undefined ? fallback : key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
