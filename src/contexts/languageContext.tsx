'use client'

import { createContext, useContext, useState, ReactNode } from "react";

const LanguageContext = createContext({});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState("en");

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