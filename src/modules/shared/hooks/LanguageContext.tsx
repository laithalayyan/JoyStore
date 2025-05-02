import React, { createContext, useContext, useState } from "react";
import { translations } from "../../../utils/translations";

type Language = keyof typeof translations;
type Translations = (typeof translations)[Language]; // Allow translations for all languages

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations; // Strongly typed translations
}

const LanguageContext = createContext<LanguageContextType>(
  {} as LanguageContextType
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  // Get translations for current language
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
