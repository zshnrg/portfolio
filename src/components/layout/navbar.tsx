
'use client';

import { useLanguage, Language } from "@/contexts/languageContext";
import { useEffect, useRef, useState } from "react";

import { motion, AnimatePresence } from "motion/react";
import { MdMenu } from "react-icons/md";
import Image from "next/image";

import LanguageToogle from "./languageToogle";

const menus = [
    { name: { en: "Profile", id: "Profil" }, url: "#profile" },
    { name: { en: "Experience", id: "Pengalaman" }, url: "#experience" },
    { name: { en: "Project", id: "Proyek" }, url: "#project" },
    { name: { en: "Contact", id: "Kontak" }, url: "#contact" },
];

const bellowLayerColors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
];

export default function Navigation() {
    const { language } = useLanguage()
    const [bgColor, setBgColor] = useState("bg-transparent");
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const menuRefs = useRef<HTMLAnchorElement[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const handRef = useRef<HTMLImageElement>(null);

    const [isHoverable, setIsHoverable] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const mediaQuery = window.matchMedia("(hover: hover)");
            setIsHoverable(mediaQuery.matches);
        
            const handleHoverChange = (event: MediaQueryListEvent) => {
              setIsHoverable(event.matches);
            };
            mediaQuery.addEventListener("change", handleHoverChange);
        
            return () => {
              mediaQuery.removeEventListener("change", handleHoverChange);
            };
        }
    }, []);

    const handleScroll = () => {
        if (window.scrollY > window.innerHeight - 100) {
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

    const handleHover = (index: number | null) => {
        setHoveredIndex(index);
    };

    return (
        <nav className="fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-in-out">

            <div className={`flex flex-row-reverse items-center justify-between h-full w-full px-12 py-4 ${isOpen ? "bg-white" : bgColor} transition delay-150 duration-300 ease-in-out`}>
                <MdMenu className="text-3xl text-black cursor-pointer" onClick={toggleMenu}/>
                <LanguageToogle className={`transition-opacity duration-300 ease-in-out ${ !isOpen && "opacity-0 md:opacity-100" }`}/>
            </div>


            <div className="relative">
                {
                    isOpen && bellowLayerColors.map((color, index) => (
                        <motion.div
                            key={index}
                            className={`absolute top-0 left-0 w-full h-1/5 ${color}`}
                            initial={{ height: 0 }}
                            animate={{ height: "100vh", transition: { duration: 0.4, delay: index * 0.05 } }}
                            exit={{ height: 0, transition: { duration: 0.4, delay: bellowLayerColors.length} }}
                        />
                    ))
                }

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            key="white-layer"
                            className="absolute top-0 left-0 w-full bg-white overflow-hidden"
                            initial={{ height: 0 }}
                            animate={{ height: "100vh", transition: { duration: 0.4, delay: bellowLayerColors.length * 0.05 } }}
                            exit={{ height: 0, transition: { duration: 0.4 } }}
                        >
                            <div ref={containerRef} className="flex flex-col items-start pt-16 px-12 md:px-16 lg:px-20 justify-start h-full w-full">
                                {menus.map((menu, index) => (
                                    <motion.a
                                        key={menu.url}    ref={(element) => {
                                            if (element) {
                                                menuRefs.current[index] = element;
                                            }
                                        }}                                    
                                        className="w-full py-4 md:px-8 lg:px-12 text-2xl font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                                        initial={{ opacity: 0, x: "-100%" }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: "-100%" }}
                                        transition={{
                                            delay: index * 0.1,
                                            duration: 0.3,
                                        }}
                                        onMouseEnter={() => handleHover(index)}
                                        onMouseLeave={() => handleHover(null)}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {menu.name[language]}
                                    </motion.a>
                                ))}
                                {
                                    isHoverable && (
                                        <motion.div
                                            className={`absolute right-0 md:right-8 lg:right-32 bottom-[-100%]`}
                                            ref={handRef}
                                            initial={{ opacity: 1, y: 0 }}
                                            animate={
                                                hoveredIndex !== null
                                                    ? {
                                                            opacity: 1,
                                                            y:
                                                            // Translate the hand to the hovered menu, calculating window height - container height - menu height
                                                            menuRefs.current[hoveredIndex].offsetTop - (menuRefs.current[hoveredIndex].getBoundingClientRect().height || 0) * 3 - (window.innerHeight - (containerRef.current?.getBoundingClientRect().y || 0))
                                                        }
                                                    : { y: 50 }
                                            }
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Image src="/assets/art/hand.svg" alt="hand" width={(window.innerHeight - 100 - (containerRef.current?.getBoundingClientRect().y || 0)) / 3} height={(window.innerHeight - 100 - (containerRef.current?.getBoundingClientRect().y|| 0))} />
                                        </motion.div>
                                    )
                                }
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>    
        </nav>
    );
}
