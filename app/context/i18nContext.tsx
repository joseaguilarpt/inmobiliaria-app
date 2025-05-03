// i18nContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '../translations/en.json'; // Adjust path as needed
import esTranslations from '../translations/es.json'; // Adjust path as needed

interface Translations {
  [key: string]: string | Translations;
}

interface I18nContextType {
  locale: string;
  translations: Translations;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
}

const translationsMap: { [key: string]: Translations } = {
  en: enTranslations,
  es: esTranslations,
};

const defaultLocale = 'es'; // Default language

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<string>(() => {
    // Try to get the initial locale from cookies (server-side) or localStorage (client-side)
    const storedLocale = typeof window !== 'undefined' ? localStorage.getItem('locale') : undefined;
    return storedLocale || defaultLocale;
  });

  const [translations, setTranslations] = useState<Translations>(() => {
    return translationsMap[locale] || translationsMap[defaultLocale];
  });

  useEffect(() => {
    // Update localStorage with the selected locale (client-side only)
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', locale);
    }
    setTranslations(translationsMap[locale] || translationsMap[defaultLocale]);
  }, [locale]);

  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    keys.forEach((k) => {
      value = value?.[k];
    });
    return value || key; // Default to key if translation not found
  };

  const value: I18nContextType = {
    locale,
    translations,
    setLocale,
    t,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
