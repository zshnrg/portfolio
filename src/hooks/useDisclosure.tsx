import { useState, useCallback } from "react";

export function useDisclosure() {
    const [isOpen, setIsOpen] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    const onOpen = useCallback(() => setIsOpen(true), [])
    const onClose = useCallback(() => setIsOpen(false), [])
    const onOpenChange = useCallback(() => {
        setIsDisabled((prev) => {
            console.log(prev)
            if (prev) return true;

            setIsOpen((prevOpen) => {
                console.log("Setting to", !prevOpen)
                return !prevOpen;
            }); 
            setTimeout(() => setIsDisabled(false), 500);
            return true;
        });
    }, []);

    return { isOpen, onOpen, onClose, onOpenChange }
}