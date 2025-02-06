import Image from "next/image";
import LandingFrame from "./_frames/landingFrame/landingFrame";
import ProfileFrame from "./_frames/profileFrame/profileFrame";

export default function Home() {
  return (
    <div>
      <LandingFrame />
      <ProfileFrame />
    </div>
  );
}
