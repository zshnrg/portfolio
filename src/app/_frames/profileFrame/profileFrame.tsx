"use client";

import AboutSection from "./aboutSection";
import EducationSection from "./educationSection";

export default function ProfileFrame() {
    return (
        <div 
            className="grid grid-cols-2"
            style={{ backgroundImage: "url('/assets/background/gradient_dark.svg')", backgroundSize: "contain", backgroundPosition: "left", backgroundRepeat: "no-repeat" }}
        >
            <AboutSection />
            <EducationSection />
        </div>
    )
}