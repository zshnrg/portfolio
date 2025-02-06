"use client";

import AboutSection from "./aboutSection";
import EducationSection from "./educationSection";

export default function ProfileFrame() {
    return (
        <div 
            className="flex lg:flex-row w-full"
            style={{ backgroundImage: "url('/assets/background/gradient_dark.svg')", backgroundSize: "contain", backgroundPosition: "left", backgroundRepeat: "no-repeat" }}
        >
            <AboutSection />
            <EducationSection />
        </div>
    )
}