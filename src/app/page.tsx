'use client'

import LandingFrame from "./_frames/landingFrame/landingFrame";
import ProfileFrame from "./_frames/profileFrame/profileFrame";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import ExperienceFrame from "./_frames/experienceFrame/experienceFrame";

export default function Home() {

  const params = useParams();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(`[href="${hash}"]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [params]);

  return (
    <div>
      <LandingFrame />
      <ProfileFrame href="#profile"/>
      <ExperienceFrame href="#experience"/>
    </div>
  );
}
