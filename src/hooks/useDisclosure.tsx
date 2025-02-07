import { useState, useCallback } from "react";

export function useDisclosure() {
    const [isOpen, setIsOpen] = useState(false)

    const onOpen = useCallback(() => setIsOpen(true), [])
    const onClose = useCallback(() => setIsOpen(false), [])
    const onOpenChange = useCallback(() => setIsOpen((prev) => !prev), [])

    return { isOpen, onOpen, onClose, onOpenChange }
}