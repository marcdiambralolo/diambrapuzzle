"use client";
import { useEffect } from 'react';
import DifficultiesSection from './components/DifficultiesSection';
import EvaluationSection from './components/EvaluationSection';
import Footer from './components/Footer';
import HowToPlaySection from './components/HowToPlaySection';
import ModesSection from './components/ModesSection';
import ObjectivesSection from './components/ObjectivesSection';
import PrinciplesSection from './components/PrinciplesSection';
import TipsSection from './components/TipsSection';

const useScrollReveal = () => {
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

        document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);
};

export default function WelcomePageClientContent() {
    useScrollReveal();

    return (
        <main className="w-full mx-auto max-w-4xl px-2 py-2 bg-white overflow-x-hidden">
            <ObjectivesSection />
            <PrinciplesSection />
            <HowToPlaySection />
            <ModesSection />
            <DifficultiesSection />
            <EvaluationSection />
            <TipsSection />
            <Footer />
        </main>
    );
}