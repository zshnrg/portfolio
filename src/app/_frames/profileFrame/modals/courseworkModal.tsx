import { useLanguage } from "@/contexts/languageContext";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useState } from "react";

import { Modal } from "@/components/ui/modal";

import modals from "@/data/modals.json"

type Name= {
    id: string;
    en: string;
}

type Course = {
    name: Name;
    tags: string[];
}

export default function CourseworkModal({ disclosure } : { disclosure: ReturnType<typeof useDisclosure> }) {

    const { language } = useLanguage();
    const [ activeTags, setActiveTags ] = useState<string[]>([]);

    const [activeData, setActiveData] = useState<Course[]>([]);
    const [remainingData, setRemainingData] = useState<Course[]>(modals.courseworkModal.data.course);

    const handleTagClick = (tag: string) => {
        if (activeTags.includes(tag)) {
            setActiveTags(activeTags.filter(activeTag => activeTag !== tag));

            const filteredData = activeData.filter(course => course.tags.includes(tag));
            setActiveData(activeData.filter(course => !filteredData.includes(course)));
        } else {
            setActiveTags([...activeTags, tag]);

            const filteredData = remainingData.filter(course => course.tags.includes(tag));
            setActiveData([...activeData, ...filteredData]);
        }
    }
    
    return (
        <Modal 
            title={modals.courseworkModal.title[useLanguage().language]} 
            size="4xl" placement="auto"
            {...disclosure}
        >
            <div className="flex flex-col gap-4">
                <p>{modals.courseworkModal.subtitle[useLanguage().language]}</p>
                <div className="flex flex-wrap gap-3">
                    {modals.courseworkModal.data.tags.map((tags, index) => (
                            <h4 key={tags.tag} 
                                className={`p-2 rounded-xl font-bold text-md ${(activeTags.includes(tags.tag) ? tags.color.active : tags.color.bg)} ${tags.color.text} ${tags.color.hover} cursor-pointer`} 
                                onClick={() => handleTagClick(tags.tag)}
                            >
                                {tags[language]}
                            </h4>
                        )
                    )}
                    <hr className="w-full border-gray-100 border-4 m-4 rounded-full" />

                    <div className="flex flex-wrap gap-4">
                        {activeData.map((course, index) => (
                            <div key={course.name.id} className="flex flex-col gap-2 p-2 bg-sky-300 font-medium text-sm rounded-xl">
                                {course.name[language]}
                            </div>
                        ))}
                        {remainingData.map((course, index) => (
                            <div key={course.name.id} className="flex flex-col gap-2 p-2 bg-neutral-100 font-medium text-sm rounded-xl opacity-50">
                                {course.name[language]}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    )
}