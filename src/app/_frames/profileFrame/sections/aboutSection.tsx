import { useLanguage } from "@/contexts/languageContext"

import contents from "@/data/contents.json"
import { buildParagraph } from "@/utils/language/paragraph"

export default function AboutSection({href}: {href: string}) {
    const { language } = useLanguage()
    return (
        <div className="col-span-2 lg:col-span-1 flex flex-col w-full py-40 px-[calc(100%/6)] justify-start gap-6 md:gap-8 lg:gap-12">
            <a className="text-4xl lg:text-6xl font-bold text-white cursor-pointer-none" href={href}>{contents.profileFrame.aboutSection.title[language]}</a>
            <div className="flex flex-col gap-6">
                { contents.profileFrame.aboutSection.content[language].map((paragraph, index) => (
                    buildParagraph(paragraph, "text-lg md:text-xl lg:text-2xl leading-7 md:leading-8 lg:leading-10 text-white text-justify", index)
                ))}
            </div>
        </div>
    )
}