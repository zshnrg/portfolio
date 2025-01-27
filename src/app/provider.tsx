import { LanguageProvider } from "@/contexts/languageContext";

export default function Provider({ children } : { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            {children}
        </LanguageProvider>
    );
}