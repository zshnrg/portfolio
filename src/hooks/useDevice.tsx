import { useState, useEffect } from "react";
import useWindowDimensions from "./useWindowDimensions";

export function useDevice() {
    const [ device, setDevice ] = useState<"mobile" | "tablet" | "desktop">("desktop");
    const { width } = useWindowDimensions();

    useEffect(() => {
        if (width < 768) {
            setDevice("mobile");
        } else if (width < 1024) {
            setDevice("tablet");
        } else {
            setDevice("desktop");
        }
    }, [width]);

    const isMobile = device === "mobile";
    const isTablet = device === "tablet";
    const isDesktop = device === "desktop";

    return { device, isMobile, isTablet, isDesktop };
}
