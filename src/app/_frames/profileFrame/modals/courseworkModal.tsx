import { useLanguage } from "@/contexts/languageContext";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useState } from "react";

import { Modal } from "@/components/ui/modal";

import modals from "@/data/modals.json"

export default function CourseworkModal({ disclosure } : { disclosure: ReturnType<typeof useDisclosure> }) {

    const { language } = useLanguage();
    const [ activeTags, setActiveTags ] = useState<string[]>([]);

    const handleTagClick = (tag: string) => {
        if (activeTags.includes(tag)) {
            setActiveTags(activeTags.filter(activeTag => activeTag !== tag));
        } else {
            setActiveTags([...activeTags, tag]);
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
                            <h4 key={tags.id} 
                                className={`p-2 rounded-xl font-bold text-md ${(activeTags.includes(tags.id) ? tags.color.active : tags.color.bg)} ${tags.color.text} ${tags.color.hover} cursor-pointer`} 
                                onClick={() => handleTagClick(tags.id)}
                            >
                                {tags[language]}
                            </h4>
                        )
                    )}
                    <hr className="w-full border-gray-100 border-4 m-4 rounded-full" />
                </div>
            </div>
        </Modal>
    )
}