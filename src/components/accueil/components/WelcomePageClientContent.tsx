"use client";
import Loader from '@/app/loading';
import ObjectivesSection from '@/components/about/components/ObjectivesSection';
import useScrollReveal from '@/hooks/commons/useScrollReveal';
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

    if (isRedirecting) { return <Loader />; }

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