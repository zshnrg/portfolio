"use client";

import { useDisclosure } from "@/hooks/useDisclosure";

import AboutSection from "./sections/aboutSection";
import EducationSection from "./sections/educationSection";
import CourseworkModal from "./modals/courseworkModal";

export default function ProfileFrame() {

    const courseworkDisclosure = useDisclosure()
    const activitiesDisclosure = useDisclosure()

    return (
        <div 
            className="grid grid-cols-2 overflow-hidden"
            style={{ backgroundImage: "url('/assets/background/gradient_dark.svg')", backgroundSize: "contain", backgroundPosition: "left", backgroundRepeat: "no-repeat" }}
        >
            <AboutSection />
            <EducationSection courseworkDisclosure={courseworkDisclosure} activitiesDisclosure={activitiesDisclosure} />

            <CourseworkModal disclosure={courseworkDisclosure} />
        </div>
    )
}