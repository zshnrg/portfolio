'use client'

import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/languageContext";
import { useDevice } from "@/hooks/useDevice";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import { motion } from "framer-motion";
import PendulumSimulation from "@/components/pendulumSimulation";
import { MdArrowBack } from "react-icons/md";

export default function NotFound() {

    const { height, width } = useWindowDimensions();
    const { isMobile } = useDevice();

    const ballSize = (width) / 3.5;
    const barLength = (height) * 0.35 - (isMobile ? 100 : 0);

    const router = useRouter();
    const { language } = useLanguage();

    const _4_1 = <svg width={ballSize} height={ballSize} viewBox={`0 0 400 400`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M200.136 200L0.135742 199.999L0.13576 -0.000444731V-0.000444731C110.593 -0.000435074 200.136 89.5426 200.136 200V200Z" fill="#027313"/>
        <path d="M0 200H200V300C115.944 258.03 79.9162 239.902 0 200Z" fill="#91DEFF"/>
        <rect x="200" y="200" width="200" height="200" fill="#2594D9"/>
        <rect x="200" y="-0.000488281" width="200" height="200" fill="#D0F578"/>
    </svg>    

    const _0 = <svg width={ballSize} height={ballSize} viewBox={`0 0 400 400`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="200" r="200" fill="#F23827"/>
        <circle cx="200" cy="200" r="100" fill="#FFDF5E"/>
    </svg>

    const _4_2 = <svg width={ballSize} height={ballSize} viewBox={`0 0 400 400`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M200.136 200L0.135742 200L0.13576 4.35506e-05V4.35506e-05C110.593 5.32071e-05 200.136 89.5431 200.136 200V200Z" fill="#526AF2"/>
        <path d="M0 200H200L200 300C115.944 258.03 79.9162 239.903 0 200Z" fill="#EECC48"/>
        <rect x="200" y="200" width="200" height="200" fill="#FE4649"/>
        <rect x="200" y="-0.000244141" width="200" height="200" fill="#F2B807"/>
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
                className="flex w-full h-full items-end justify-between mx-10"
            >
                <PendulumSimulation ballSVG={_4_1} ballRadius={ballSize / 2} barLength={barLength} barDamping={5} barStiffness={500} idlePeriod={1500 + Math.random() * 500} />
                <PendulumSimulation ballSVG={_0} ballRadius={ballSize / 2} barLength={barLength + 40} barDamping={5} barStiffness={500} idlePeriod={1500 + Math.random() * 500} />
                <PendulumSimulation ballSVG={_4_2} ballRadius={ballSize / 2} barLength={barLength - 30} barDamping={5} barStiffness={500} idlePeriod={1500 + Math.random() * 500} />
            </motion.div>

            <div className="absolute flex flex-col items-center justify-center gap-8 p-8 shadow-2xl bg-white rounded-4xl">
                <div className="flex flex-col gap-1 items-center">
                    <h1 className="text-4xl font-bold text-neutral-900">404</h1>
                    <h2 className="text-xl font-semibold text-neutral-800">{language === "en" ? "Page not found" : "Halaman tidak ditemukan"}</h2>
                </div>
                <button onClick={() => router.push("/")} className="px-4 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center">
                    <MdArrowBack size={20} className="mr-2" />
                    {language === "en" ? "Back to Home" : "Kembali ke Beranda"}
                </button>
            </div>
        </div>
    )
}