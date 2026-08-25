"use client";
import useScrollReveal from '@/hooks/commons/useScrollReveal';
import DifficultiesSection from './components/DifficultiesSection';
import EvaluationSection from './components/EvaluationSection';
import Footer from './components/Footer';
import HowToPlaySection from './components/HowToPlaySection';
import ModesSection from './components/ModesSection';
import ObjectivesSection from './components/ObjectivesSection';
import PrinciplesSection from './components/PrinciplesSection';
import TipsSection from './components/TipsSection';

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