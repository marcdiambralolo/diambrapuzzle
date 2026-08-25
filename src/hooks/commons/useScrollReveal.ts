"use client";
import { useEffect } from "react";

/**
 * Hook personnalisé pour l'animation au défilement (scroll reveal)
 * Ajoute les classes 'opacity-100' et 'translate-y-0' aux éléments
 * portant la classe 'reveal-on-scroll' lorsqu'ils deviennent visibles.
 */
export const useScrollReveal = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("opacity-100", "translate-y-0");
                        entry.target.classList.remove("opacity-0", "translate-y-8");
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        const elements = document.querySelectorAll(".reveal-on-scroll");
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);
};

export default useScrollReveal;