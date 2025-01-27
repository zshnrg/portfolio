import { useLanguage } from "@/contexts/languageContext";

export default function LanguageToggle({ className }: { className?: string }) {
    const { language, setLanguage } = useLanguage();

    const changeLanguage = () => {
        setLanguage(language === "en" ? "id" : "en");
    }

    return (
        <div className={`relative flex bg-neutral-200 rounded-full p-2` + (className ? ` ${className}` : "")}>
            <div
                className={`absolute top-0 bottom-0 m-auto w-10 h-6 bg-white rounded-full transition-transform duration-300 ease-in-out`}
                style={{
                    transform: language === "id" ? "translateX(100%)" : "translateX(0)",
                }}
            ></div>

            <button
                onClick={() => changeLanguage()}
                className="relative w-10 h-6 flex items-center justify-center text-xs font-bold z-10 text-neutral-950 transition-opacity duration-300 ease-in-out"
                style={{
                    opacity: language === "id" ? 0.5 : 1,
                }}
            >
                EN
            </button>
            <button
                onClick={() => changeLanguage()}
                className="relative w-10 h-6 flex items-center justify-center text-xs font-bold z-10 text-neutral-950 transition-opacity duration-300 ease-in-out"
                style={{
                    opacity: language === "en" ? 0.5 : 1,
                }}
            >
                ID
            </button>
        </div>
    );
}
