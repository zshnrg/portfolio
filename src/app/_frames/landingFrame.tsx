'use client';

import { useLanguage } from "@/contexts/languageContext";

import PendulumSimulation from "@/components/pendulumSimulation";
import Image from "next/image";

import contents from "@/data/contents.json"
import O_SVG from "@/public/assets/svg/o.svg"

export default function LandingFrame() {

    const { language } = useLanguage();

    const SVG_O = <svg width="200" height="200" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 200H400V200C400 310.457 310.457 400 200 400V400C89.5431 400 0 310.457 0 200V200Z" fill="#526AF2"/>
    <path d="M0 200H200V400V400C89.5431 400 0 310.457 0 200V200Z" fill="#F2B807"/>
    <rect x="200" width="200" height="200" fill="#2594D9"/>
    </svg>

    return (
        <div className="h-svh w-full bg-white rounded-b-3xl flex flex-col items-center justify-center gap-24 px-8 md:px-24">
            <div className="p-4 md:p-6 shadow-lg bg-white -rotate-[6deg]">
                <Image src="/assets/image/self.png" alt="My Self" width={350} height={450} />
            </div>
            <div className="flex flex-col justify-center items-center w-full"> {/* Added items-center and w-full */}
                <svg
                    width="5%"
                    viewBox="0 0 118 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-4 md:ml-6 lg:ml-16 overflow-visible"
                >
                    <path
                        className="shadow"
                        d="M104.375 1.85816C110.991 -1.5487 118.648 4.0887 117.36 11.4178L109.601 55.5547H0.100586L104.375 1.85816Z"
                        fill="white"
                    />
                </svg>

                <div className="flex flex-col w-fit items-center justify-center rounded-xl bg-white shadow-lg py-3 px-6 md:shadow-xl md:py-4 md:px-8 lg:py-6 lg:px-10 mx-auto"> {/* Added mx-auto */}
                    <h2 className="text-md md:text-xl lg:text-2xl text-neutral-900">
                        {contents.landingFrame.title[language]}
                    </h2>
                </div>
            </div>
            <PendulumSimulation ballSVG={SVG_O} />
        </div>
    );
}