"use client";
import { useEffect } from "react";
import { CONFIG } from "./components/Constantes";
import CTASection from "./components/CTASection";
import DifficultiesSection from "./components/DifficultiesSection";
import EvaluationSection from "./components/EvaluationSection";
import HeroSection from "./components/HeroSection";
import HowToPlaySection from "./components/HowToPlaySection";
import ModesSection from "./components/ModesSection";
import NavigationAbout from "./components/Navigation";
import ObjectivesSection from "./components/ObjectivesSection";
import PrinciplesSection from "./components/PrinciplesSection";
import TipsSection from "./components/TipsSection";

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

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

export default function AboutPageClient() {
  useScrollReveal();

  return (
    <main className="bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/50 text-purple-900 overflow-x-hidden">
      <NavigationAbout items={CONFIG.NAV_ITEMS} />

      <div className="mx-auto max-w-5xl px-4 py-4 sm:py-8">
        <HeroSection />

        <ObjectivesSection />
        <PrinciplesSection />
        <HowToPlaySection />
        <ModesSection />
        <DifficultiesSection />
        <EvaluationSection />
        <TipsSection />

        <CTASection />
      </div>
    </main>
  );
}