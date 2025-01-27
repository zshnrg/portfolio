
'use client';

import { useRef, useState } from "react";
import { MdMenu } from "react-icons/md";
import LanguageToogle from "./languageToogle";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage, Language } from "@/contexts/languageContext";

const menus = [
    { name: {
        en: "Profile", 
        id: "Profil"
        },
        url: "#profile" 
    },
    { name: 
        {
            en: "Experience",
            id: "Pengalaman"
        },
        url: "#experience"
    },
    { name: 
        {
            en: "Project",
            id: "Proyek"
        },
        url: "#project"
    },
    { name: 
        {
            en: "Contact",
            id: "Kontak"
        },
        url: "#contact"
    },
];

const bellowLayerColors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
];

const whiteLayerVariants = {
    hidden: { height: 0 },
    visible: { height: "100vh", transition: { duration: 0.4, delay: bellowLayerColors.length * 0.05 } },
    exit: { height: 0, transition: { duration: 0.4 } },
};

const menuVariants = {
    hidden: { opacity: 0, x: "-100%" },
    visible: (index: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: index * 0.1 + (bellowLayerColors.length - 2) * 0.05,
            duration: 0.3,
        },
    }),
    exit: { opacity: 0, x: "-100%", transition: { duration: 0.3 } },
};
export default function Navigation() {
    const container = useRef(null);
    const [bgColor, setBgColor] = useState("bg-transparent");
    const [isOpen, setIsOpen] = useState(false);

    const { language } = useLanguage()

    const handleScroll = () => {
        if (window.scrollY > 20) {
            setBgColor("bg-white");
        } else {
            setBgColor("bg-transparent");
        }
    };

    if (typeof window !== "undefined") {
        window.addEventListener("scroll", handleScroll);
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const handleClinkMenu = (url: string) => {
        setIsOpen(false);
    }

    return (
        <nav className="fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-in-out">
            <div className={`flex flex-row-reverse items-center justify-between h-full w-full px-12 py-4 ${isOpen ? "bg-white" : bgColor}`}>
                <MdMenu className="text-3xl text-black cursor-pointer" onClick={toggleMenu}/>
                <LanguageToogle className={`transition-opacity duration-300 ease-in-out ${ !isOpen && "opacity-0 md:opacity-100" }`}/>
            </div>


            <div className="relative">
                {/* <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            key="grey-layer"
                            className="absolute top-0 left-0 w-full bg-black"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={greyLayerVariants}
                        />
                    )}
                </AnimatePresence> */}

                {
                    isOpen && bellowLayerColors.map((color, index) => (
                        <motion.div
                            key={index}
                            className={`absolute top-0 left-0 w-full h-1/5 ${color}`}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={{
                                hidden: { height: 0 },
                                visible: { height: "100vh", transition: { duration: 0.4, delay: index * 0.05 } },
                                exit: { height: 0, transition: { duration: 0.4, delay: bellowLayerColors.length} },
                            }}
                        />
                    ))
                }

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            key="white-layer"
                            className="absolute top-0 left-0 w-full bg-white overflow-hidden"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={whiteLayerVariants}
                        >
                            <div className="flex flex-col items-start pt-16 px-20 justify-start h-full w-full">
                                {menus.map((menu, index) => (
                                    <motion.a
                                        key={menu.url}
                                        className="w-full py-4 px-12 text-2xl font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                                        variants={menuVariants}
                                        custom={index}
                                        onClick={() => handleClinkMenu(menu.url)}
                                    >
                                        {menu.name[language]}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </nav>
    );
}
