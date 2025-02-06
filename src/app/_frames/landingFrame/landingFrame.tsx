'use client';

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/languageContext";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import { motion, AnimatePresence } from "motion/react";
import PendulumSimulation from "@/components/pendulumSimulation";
import Image from "next/image";

import contents from "@/data/contents.json"
import roles from "@/data/roles.json"

export default function LandingFrame() {

    const { height, width } = useWindowDimensions();

    const ballSize = (width) / 5.25;
    const barLength = (height) * 0.35;

    const [index, setIndex] = useState(0);

    const { language } = useLanguage();

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((index + 1) % roles.length);
        }, 2000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    //Initial SVGs
    const SVG_O = <svg width={ballSize} height={ballSize} viewBox={`0 0 400 400`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="200" r="200" fill="#F23827" />
        <circle cx="200" cy="200" r="100" fill="#FFDF5E" />
    </svg>

    const SVG_J = <svg width={ballSize} height={ballSize} viewBox={`0 0 400 400`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 200H400V200C400 310.457 310.457 400 200 400V400C89.5431 400 0 310.457 0 200V200Z" fill="#526AF2" />
        <path d="M0 200H200V400V400C89.5431 400 0 310.457 0 200V200Z" fill="#F2B807" />
        <rect x="200" width="200" height="200" fill="#2594D9" />
    </svg>

    const SVG_A = <svg width={ballSize} height={ballSize} viewBox={`0 0 400 400`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M200 201H400V401V401C289.543 401 200 311.457 200 201V201Z" fill="#027313" />
        <path d="M399.997 202.137L200 200.995L201.139 0.998681V0.998681C311.594 1.62943 400.626 91.6823 399.997 202.137V202.137Z" fill="#027313" />
        <path d="M200 201L400 201C400 90.5431 310.457 0.716074 200 0.716064C89.5431 0.716055 9.64276e-06 90.5431 0 201V401H200V201Z" fill="#D0F578" />
    </svg>

    const SVG_N = <svg width={ballSize} height={ballSize} viewBox={`0 0 400 400`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M400 200L0.000213623 200V200C0.000223279 89.5431 89.5432 4.91529e-05 200 5.88094e-05V5.88094e-05C310.457 6.84658e-05 400 89.5431 400 200V200Z" fill="#F22753" />
        <rect x="200" y="200" width="200" height="200" fill="#AA3351" />
        <rect y="200" width="200" height="200" fill="#FE4649" />
    </svg>

    return (
        <div
            style={{ backgroundImage: "url('/assets/background/gradient_light.svg')", backgroundSize: "contain", backgroundPosition: "top", backgroundRepeat: "no-repeat" }}
            className="relative h-svh w-full rounded-b-3xl flex items-center justify-center overflow-hidden bg-neutral-100"
        >
            {/* <PendulumSimulation ballSVG={SVG_O} /> */}
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="flex w-full h-full items-end justify-center gap-12 md:gap-18 lg:gap-24"
            >
                <PendulumSimulation ballSVG={SVG_O} ballRadius={ballSize / 2} barLength={barLength} barDamping={5} barStiffness={500} idlePeriod={1500 + Math.random() * 500} />
                <PendulumSimulation ballSVG={SVG_J} ballRadius={ballSize / 2} barLength={barLength + 70} barDamping={5} barStiffness={500} idlePeriod={1500 + Math.random() * 500} />
                <PendulumSimulation ballSVG={SVG_A} ballRadius={ballSize / 2} barLength={barLength - 30} barDamping={5} barStiffness={500} idlePeriod={1500 + Math.random() * 500} />
                <PendulumSimulation ballSVG={SVG_N} ballRadius={ballSize / 2} barLength={barLength - 10} barDamping={5} barStiffness={500} idlePeriod={1500 + Math.random() * 500} />
            </motion.div>

            <div className="absolute left-0 bottom-0 right-0 h-8 pointer-events-none bg-white shadow-xl flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="320" height="8" viewBox="0 0 320 8" fill="none">
                    <path d="M0 4C0 1.79086 2.23858 0 5 0H315C317.761 0 320 1.79086 320 4C320 6.20914 317.761 8 315 8H5C2.23858 8 0 6.20914 0 4Z" fill="black" fill-opacity="0.15" />
                </svg>
            </div>

            <div className="absolute pointer-events-none flex flex-col items-center justify-center gap-24">

                <div className="mx-12 p-4 md:p-6 shadow-lg bg-white -rotate-[6deg] ">
                    <Image src="/assets/image/self.png" alt="My Self" width={350} height={450} />
                </div>

                <div className="flex flex-col">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15%" viewBox="0 0 118 50" fill="none" className="ml-8 md:ml-16 lg:ml-24 overflow-visible">
                        <path d="M104.375 1.30341C110.745 -1.97672 118.08 3.12705 117.467 10.0526C117.419 10.5937 117.265 11.1193 117.076 11.6287L101 54.9999H0.100586L104.375 1.30341Z" fill="white" className="shadow" />
                    </svg>
                    <div className="flex rounded-lg md:rounded-xl lg:rounded-3xl bg-white shadow-lg py-3 px-6 md:shadow-xl md:py-4 md:px-8 lg:py-6 lg:px-10 mx-auto">
                        <h3 className="text-md md:text-xl lg:text-2xl flex flex-wrap items-center max-w-full">
                            <span className="min-w-0 truncate">{contents.landingFrame.title[language]}</span>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={index}
                                    initial={{ y: "100%", opacity: 0, color: roles[index].color }}
                                    animate={{ y: "0%", opacity: 1, color: roles[index].color }}
                                    exit={{ y: "-100%", opacity: 0, color: roles[index].color }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="font-bold whitespace-nowrap"
                                >
                                    &nbsp;{roles[index][language]}
                                </motion.span>
                            </AnimatePresence>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}