import { useLanguage } from "@/contexts/languageContext"

import contents from "@/data/contents.json"
import { buildParagraph } from "@/utils/language/paragraph"

export default function AboutSection() {
    const { language } = useLanguage()
    return (
        <div className="flex flex-col w-full py-40 px-52 justify-start gap-12">
            <h2 className="text-6xl font-bold text-white">{contents.profileFrame.aboutSection.title[language]}</h2>
            <div className="flex flex-col gap-6">
                { contents.profileFrame.aboutSection.content[language].map((paragraph, index) => (
                    buildParagraph(paragraph, "text-2xl leading-10 text-white whitespace-pre-line text-justify")
                ))}
            </div>
        </div>
    )
}