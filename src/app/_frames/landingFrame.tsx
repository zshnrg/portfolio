import PendulumSimulation from "@/components/pendulumSimulation";
import Image from "next/image";

export default function LandingFrame() {
    return (
        <div className="h-svh w-full bg-white rounded-b-3xl flex flex-col items-center justify-center">
            <Image src="/next.svg" alt="hand" width={200} height={200} />
            {/* <PendulumSimulation /> */}
        </div>
    );
}