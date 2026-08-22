"use client";
import {
  Award, Brain, Clock, Eye, Grid, Image as ImageIcon,
  Layers, Lock, Palette, Shuffle, Sparkles, Target, Trophy, Type, Zap
} from "lucide-react";
import { useEffect } from "react";
import ConicSection from "./components/ConicSection";
import CTASection from "./components/CTASection";
import DifficultyBadge from "./components/DifficultyBadge";
import FeatureGrid from "./components/FeatureGrid";
import HeroSection from "./components/HeroSection";
import NavigationAbout from "./components/Navigation";
import PillGrid from "./components/PillGrid";
import PlainSection from "./components/PlainSection";
import StepGrid from "./components/StepGrid";
import TipGrid from "./components/TipGrid";

const CONFIG = {
  NAV_ITEMS: [
    { id: "principe", label: "Principe" },
    { id: "jeu", label: "Jeu" },
    { id: "modes", label: "Modes" },
    { id: "difficulte", label: "Difficulté" },
    { id: "evaluation", label: "Évaluation" },
    { id: "conseils", label: "Conseils" },
  ],
  OBJECTIVES: [
    { icon: Brain, title: "Mémoire visuelle", desc: "Développez votre capacité à mémoriser des dispositions." },
    { icon: Target, title: "Concentration", desc: "Restez focalisé pour résoudre le puzzle." },
    { icon: Sparkles, title: "Patience & stratégie", desc: "Planifiez vos mouvements pour gagner du temps." },
    { icon: Trophy, title: "Compétition", desc: "Défiez vos amis et participez à des classements." },
  ],
  PRINCIPLES: [
    { icon: Layers, title: "Plateau P1", desc: "Mémorisez la disposition de référence.", tooltip: "P1 est le modèle à reproduire." },
    { icon: Shuffle, title: "Plateau P2", desc: "Échangez les cases pour retrouver la disposition.", tooltip: "Cliquez sur deux cases pour les échanger." },
    { icon: Clock, title: "Temps limité", desc: "Terminez le puzzle avant la fin du chrono.", tooltip: "Plus vous êtes rapide, meilleur est votre score." },
  ],
  STEPS: [
    { icon: Eye, title: "1. Mémorisez", desc: "Observez le plateau P1 pendant quelques secondes." },
    { icon: Shuffle, title: "2. Échangez", desc: "Cliquez sur deux cases du plateau P2 pour les échanger." },
    { icon: Eye, title: "3. Vérifiez", desc: 'Utilisez "Voir P1" pour comparer votre progression.' },
    { icon: Lock, title: "4. Verrouillez", desc: 'Bloguez les cases correctement placées avec "Ajuster".' },
    { icon: Clock, title: "5. Chronométrz", desc: "Complétez le puzzle avant la fin du temps imparti." },
  ],
  MODES: [
    { icon: Grid, title: "Mode Nombre", desc: "Replacez les chiffres dans l'ordre.", tooltip: "Entraînez votre mémoire numérique." },
    { icon: Palette, title: "Mode Couleur", desc: "Retrouvez la séquence de couleurs originale.", tooltip: "Parfait pour la mémoire visuelle." },
    { icon: ImageIcon, title: "Mode Image", desc: "Reconstituez l'image découpée en morceaux.", tooltip: "Un défi pour les amateurs de puzzle." },
    { icon: Type, title: "Mode Lettre", desc: "Réorganisez les paires de lettres alphabétiques.", tooltip: "Stimulez votre mémoire verbale." },
  ],
  DIFFICULTIES: [
    { level: "débutant", label: "2×2 • Débutant" },
    { level: "intermédiaire", label: "4×4 • Intermédiaire" },
    { level: "avancé", label: "6×6 • Avancé" },
    { level: "expert", label: "10×10 • Expert" },
  ],
  TIPS: [
    { icon: Clock, title: "Prenez votre temps", desc: "Mémorisez bien le plateau P1 avant de commencer.", color: "purple" as const },
    { icon: Zap, title: "Jouez régulièrement", desc: "La competition vous améliore vos performances.", color: "purple" as const },
  ],
};

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

  const { NAV_ITEMS, OBJECTIVES, PRINCIPLES, STEPS, MODES, DIFFICULTIES, TIPS } = CONFIG;

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/50 text-purple-900 overflow-x-hidden">

      <NavigationAbout items={NAV_ITEMS} />

      <div className="mx-auto max-w-5xl px-4 py-4 sm:py-8">
        <HeroSection />

        <ConicSection id="objectifs" headerTitle="🎯 Objectifs du jeu">
          <FeatureGrid items={OBJECTIVES} />
        </ConicSection>

        <PlainSection id="principe" headerTitle="📌 Principe du jeu" headerSubtitle="Déplacez les éléments du plateau P2 pour reproduire le plateau P1.">
          <PillGrid items={PRINCIPLES} columns={{ sm: 3 }} />
        </PlainSection>

        <ConicSection id="jeu" headerTitle="🎮 Comment jouer">
          <StepGrid items={STEPS} />
        </ConicSection>

        <PlainSection id="modes" headerTitle="🎨 Modes de jeu" headerSubtitle="Variété de défis">
          <PillGrid items={MODES} />
        </PlainSection>

        <ConicSection id="difficulte" headerTitle="📊 Niveaux de difficulté" headerSubtitle="Choisissez votre niveau, de 2×2 (débutant) à 10×10 (expert).">
          <div className="mt-4 flex flex-wrap gap-2">
            {DIFFICULTIES.map((diff) => (
              <DifficultyBadge key={diff.level} level={diff.level} label={diff.label} />
            ))}
          </div>
          <p className="mt-3 text-sm text-purple-700">
            Plus le niveau est élevé, plus le nombre de cases à mémoriser et à déplacer est important.
          </p>
        </ConicSection>

        <ConicSection id="evaluation" headerTitle="⏱️ Évaluation et classement">
          <p className="mt-3 text-sm leading-relaxed text-purple-700">
            Votre performance est mesurée par le temps écoulé entre le début et la fin du match.
            Plus vous êtes rapide et précis, meilleur sera votre score.
          </p>
          <div className="mt-4 flex items-center gap-4 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 p-4">
            <Award className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-sm font-bold text-purple-900">Comparez vos résultats</p>
              <p className="text-sm text-purple-700">Défiez vos amis et devenez le champion !</p>
            </div>
          </div>
        </ConicSection>

        <ConicSection id="conseils" headerTitle="💡 Conseils pratiques">
          <TipGrid items={TIPS} />
        </ConicSection>

        <CTASection />
      </div>
    </main>
  );
}