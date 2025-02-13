'use client'

import { useState } from "react"
import { useLanguage } from "@/contexts/languageContext"

import { MdArrowDownward } from "react-icons/md"
import contents from "@/data/contents.json"

export default function ExperienceFrame({ href }: { href: string }) {

    const [isHidden, setIsHidden] = useState(true)
    const { language } = useLanguage()

    return (
        <div className="h-svh bg-neutral-100 flex flex-col lg:flex-row-reverse">
            <div className="flex flex-col w-full rounded-b-[50px] lg:rounded-l-[150px] bg-[#fe4649] p-[15%] md:p-32 lg:p-40">
                <div className="flex items-center gap-4">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0H11.25V11.25H0V0Z" fill="white" />
                        <path d="M0 18.75H11.25V30H0V18.75Z" fill="white" />
                        <path d="M18.75 18.75H30V30H18.75V18.75Z" fill="white" />
                        <path d="M25.625 0H23.125V4.375L18.75 4.375V6.875H23.125V11.25H25.625V6.875H30V4.375L25.625 4.375V0Z" fill="white" />
                    </svg>

                    <a href={href} className="text-3xl md:text-5xl lg:text-6xl text-white font-bold">{contents.experienceFrame.experienceSection.title[language]}</a>
                </div>
            </div>
            <div 
                className="relative w-full lg:w-40 h-40 lg:h-full hover:lg:w-3/5 hover:h-fit hover:lg:h-full transition-all px-[15%] py-12 md:p-32"
                onMouseEnter={() => setIsHidden(false)}
                onMouseLeave={() => setIsHidden(true)}
            >
                <div className="flex items-center gap-4 text-blue-400 origin-left lg:absolute lg:left-30 lg:bottom-16 lg:-rotate-90">
                    <h3 className="font-bold text-3xl md:text-4xl lg:text-5xl ">{contents.experienceFrame.certifcationSection.title[language]}</h3>
                    <div className="w-10 h-10 flex items-center justify-center bg-yellow-400 rounded-full ml-2 animate-bounce">
                        <MdArrowDownward className="text-white text-xl md:text-2xl lg:text-3xl" />
                    </div>
                </div>
            </div>
        </div>
    )
} 