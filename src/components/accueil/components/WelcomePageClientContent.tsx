"use client";
import Loader from '@/app/loading';
import ObjectivesSection from '@/components/about/components/ObjectivesSection';
import { useAuthStore } from '@/lib/store/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CTASection from './CTASection';
import DifficultiesSection from './DifficultiesSection';
import EvaluationSection from './EvaluationSection';
import Footer from './Footer';
import HeroSection from './HeroSection';
import HowToPlaySection from './HowToPlaySection';
import ModesSection from './ModesSection';
import PrinciplesSection from './PrinciplesSection';
import TipsSection from './TipsSection';

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

export function WelcomePageClientContent() {
    useScrollReveal();
    const router = useRouter();
    const { user } = useAuthStore();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (user && user.secretCode) {
            setIsRedirecting(true);
            router.replace('/star/profil');
        }
    }, [user, router]);

    if (isRedirecting) {
        return <Loader />;
    }

    return (
        <main className="w-full mx-auto max-w-4xl px-2 py-2 bg-white overflow-x-hidden">
            <HeroSection />
            <ObjectivesSection />
            <PrinciplesSection />
            <HowToPlaySection />
            <ModesSection />
            <DifficultiesSection />
            <EvaluationSection />
            <TipsSection />
            <CTASection />
            <Footer />
        </main>
    );
}