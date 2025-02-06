import { useLanguage } from "@/contexts/languageContext"
import { motion, useScroll, useTransform } from "framer-motion"
import { MdOutlineSchool, MdOutlinePermDataSetting } from "react-icons/md"
import { useRef } from "react"
import contents from "@/data/contents.json"

const icons = [
    <MdOutlineSchool key={1} className="w-full h-full" />,
    <MdOutlinePermDataSetting key={2} className="w-full h-full" />
]

export default function EducationSection() {
    const { language } = useLanguage()
    const sectionRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end end"]
    })
    const yProgressEnd = 0.8

    const translateX = useTransform(scrollYProgress, [0, yProgressEnd], ["100%", "0%"])

    return (
        <motion.div
            ref={sectionRef}
            style={{ x: translateX }} // Animasi masuk
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="col-span-2 lg:col-span-1 flex flex-col w-full py-40 px-[calc(100%/6)] justify-start gap-6 md:gap-8 lg:gap-12 rounded-l-[100px] bg-[#2A2A2A]"
        >
            <h2 className="text-4xl lg:text-6xl font-bold text-white">
                {contents.profileFrame.educationSection.title[language]}
            </h2>

            <div className="flex flex-col gap-8">
                {contents.profileFrame.educationSection.content[language].map((text, index) => {
                    console.log(index)
                    const remainingProgress = 1 - yProgressEnd
                    const overlapStep = remainingProgress * 2 / (contents.profileFrame.educationSection.content[language].length + 1)
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const itemOpacity = useTransform(scrollYProgress, [yProgressEnd + (overlapStep / 2) * index, yProgressEnd + overlapStep * (index + 2) / 2], [0, 1])
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const itemTranslateY = useTransform(scrollYProgress, [yProgressEnd + (overlapStep / 2) * index, yProgressEnd + overlapStep * (index + 2) / 2], [20, 0])
                    return (
                        <motion.div
                            key={index}
                            style={{ opacity: itemOpacity, y: itemTranslateY }}
                            className="flex flex-col md:flex-row gap-4 md:gap-8 text-white items-start"
                        >
                            <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
                                {icons[index]}
                            </div>

                            <div className="flex flex-col gap-4 flex-1">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-2">
                                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold">{text.title}</h3>
                                    <label className="w-fit h-fit text-xs md:text-sm lg:text-md font-bold text-black bg-white rounded-full p-2 px-4 whitespace-nowrap md:ml-auto hover:animate-pulse">
                                        {text.date}
                                    </label>
                                </div>

                                <p className="text-md md:text-lg lg:text-xl text-neutral-400">
                                    {text.degree} <br /> {text.major}
                                </p>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    )
}
