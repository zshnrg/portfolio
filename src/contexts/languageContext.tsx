'use client'

import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "id" | "en";

const LanguageContext = createContext<{ language: Language; setLanguage: (lang: Language) => void }>({ language: "en", setLanguage: () => {} });

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>("en");

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
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