import { useLanguage } from "@/contexts/languageContext";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useState } from "react";

import { Modal } from "@/components/ui/modal";
import { motion, AnimatePresence } from "framer-motion";

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
    const [ activeTags, setActiveTags ] = useState<string | null>(null);

    const [activeData, setActiveData] = useState<Course[]>([]);
    const [remainingData, setRemainingData] = useState<Course[]>(modals.courseworkModal.data.course);

    const handleTagClick = (tag: string) => {
        if (activeTags === tag) {
            setActiveTags(null);
            setActiveData([]);
            setRemainingData(modals.courseworkModal.data.course);
        } else {
            setActiveTags(tag);
            setActiveData(modals.courseworkModal.data.course.filter(course => course.tags.includes(tag)));
            setRemainingData(modals.courseworkModal.data.course.filter(course => !course.tags.includes(tag)));
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
                                className={`p-2 rounded-xl font-bold text-md ${(activeTags === tags.tag ? tags.color.active : tags.color.bg)} ${tags.color.text} ${tags.color.hover} cursor-pointer`} 
                                onClick={() => handleTagClick(tags.tag)}
                            >
                                {tags[language]}
                            </h4>
                        )
                    )}
                    <hr className="w-full border-gray-100 border-4 m-4 rounded-full" />

                    <AnimatePresence>
                        <motion.div 
                            layout
                            className="flex flex-wrap gap-4 transition-all duration-300"
                        >
                            {activeData.map((course, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.5, delay: index * 0.025 }}
                                    key={course.name.id} 
                                    className="flex flex-col gap-2 p-2 bg-sky-300 font-medium text-sm rounded-xl"
                                >
                                    {course.name[language]}
                                </motion.div>
                            ))}
                            {remainingData.map((course, index) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.5, delay: index * 0.025 }} 
                                    key={course.name.id} 
                                    className="flex flex-col gap-2 p-2 bg-neutral-100 font-medium text-sm rounded-xl opacity-50"
                                >
                                    {course.name[language]}
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </Modal>
    )
}