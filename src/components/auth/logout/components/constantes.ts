import { Variants } from "framer-motion";

export const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.92, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 250, damping: 22, mass: 0.8 } },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.15 } }
};