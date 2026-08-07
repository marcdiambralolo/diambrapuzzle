"use client";
import {
  ArrowLeft, Award, Brain, ChevronRight, Clock, Eye, Grid, Image as ImageIcon,
  Layers, Lock, Palette, Shuffle, Sparkles, Target, Trophy, Type, Zap
} from "lucide-react";
import { useEffect } from "react";
import CacheLink from "../commons/CacheLink";
import ConicPanel from "./components/ConicPanel";
import DifficultyBadge from "./components/DifficultyBadge";
import FeatureCard from "./components/FeatureCard";
import Pill from "./components/Pill";
import SectionHeader from "./components/SectionHeader";
import NavLink from "./components/NavLink";
import TipCard from "./components/TipCard";

const NAV_ITEMS = [
  { id: "principe", label: "Principe" },
  { id: "jeu", label: "Jeu" },
  { id: "modes", label: "Modes" },
  { id: "difficulte", label: "Difficulté" },
  { id: "evaluation", label: "Évaluation" },
  { id: "conseils", label: "Conseils" },
];

const OBJECTIVES = [
  { icon: Brain, title: "Mémoire visuelle", desc: "Développez votre capacité à mémoriser des dispositions." },
  { icon: Target, title: "Concentration", desc: "Restez focalisé pour résoudre le puzzle." },
  { icon: Sparkles, title: "Patience & stratégie", desc: "Planifiez vos mouvements pour gagner du temps." },
  { icon: Trophy, title: "Compétition", desc: "Défiez vos amis et participez à des classements." },
];

const PRINCIPLES = [
  { icon: Layers, title: "Plateau P1", desc: "Mémorisez la disposition de référence.", tooltip: "P1 est le modèle à reproduire." },
  { icon: Shuffle, title: "Plateau P2", desc: "Échangez les cases pour retrouver la disposition.", tooltip: "Cliquez sur deux cases pour les échanger." },
  { icon: Clock, title: "Temps limité", desc: "Terminez le puzzle avant la fin du chrono.", tooltip: "Plus vous êtes rapide, meilleur est votre score." },
];

const STEPS = [
  { icon: Eye, title: "1. Mémorisez", desc: "Observez le plateau P1 pendant quelques secondes." },
  { icon: Shuffle, title: "2. Échangez", desc: "Cliquez sur deux cases du plateau P2 pour les échanger." },
  { icon: Eye, title: "3. Vérifiez", desc: 'Utilisez "Voir P1" pour comparer votre progression.' },
  { icon: Lock, title: "4. Verrouillez", desc: 'Bloguez les cases correctement placées avec "Ajuster".' },
  { icon: Clock, title: "5. Chronomètrez", desc: "Complétez le puzzle avant la fin du temps imparti." },
];

const MODES = [
  { icon: Grid, title: "Mode Nombre", desc: "Replacez les chiffres dans l'ordre.", tooltip: "Entraînez votre mémoire numérique." },
  { icon: Palette, title: "Mode Couleur", desc: "Retrouvez la séquence de couleurs originale.", tooltip: "Parfait pour la mémoire visuelle." },
  { icon: ImageIcon, title: "Mode Image", desc: "Reconstituez l'image découpée en morceaux.", tooltip: "Un défi pour les amateurs de puzzle." },
  { icon: Type, title: "Mode Lettre", desc: "Réorganisez les paires de lettres alphabétiques.", tooltip: "Stimulez votre mémoire verbale." },
];

const DIFFICULTIES = [
  { level: "débutant", label: "2×2 • Débutant" },
  { level: "intermédiaire", label: "4×4 • Intermédiaire" },
  { level: "avancé", label: "6×6 • Avancé" },
  { level: "expert", label: "10×10 • Expert" },
];

const TIPS = [
  { icon: Clock, title: "Prenez votre temps", desc: "Mémorisez bien le plateau P1 avant de commencer.", color: "purple" },
  { icon: Target, title: "Commencez facile", desc: "Essayez d'abord les niveaux 2×2 ou 3×3.", color: "indigo" },
  { icon: Zap, title: "Pratiquez régulièrement", desc: "L'entraînement améliore vos performances.", color: "purple" },
  { icon: Zap, title: "Mode automatique", desc: "Pour un défi chronométré plus intense.", color: "indigo" },
];

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-white transition-all duration-300 " +
  "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg active:scale-95 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2";

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

export default function AboutPageClient() {
  useScrollReveal();

  const renderObjectives = () => (
    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {OBJECTIVES.map((obj) => (
        <FeatureCard key={obj.title} icon={<obj.icon className="h-5 w-5" />} title={obj.title}>
          {obj.desc}
        </FeatureCard>
      ))}
    </div>
  );

  const renderPrinciples = () => (
    <div className="grid gap-3 sm:grid-cols-3">
      {PRINCIPLES.map((item) => (
        <Pill
          key={item.title}
          icon={<item.icon className="h-5 w-5" />}
          title={item.title}
          desc={item.desc}
          tooltip={item.tooltip}
        />
      ))}
    </div>
  );

  const renderSteps = () => (
    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {STEPS.map((step) => (
        <FeatureCard key={step.title} icon={<step.icon className="h-5 w-5" />} title={step.title}>
          {step.desc}
        </FeatureCard>
      ))}
    </div>
  );

  const renderModes = () => (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {MODES.map((mode) => (
        <Pill
          key={mode.title}
          icon={<mode.icon className="h-5 w-5" />}
          title={mode.title}
          desc={mode.desc}
          tooltip={mode.tooltip}
        />
      ))}
    </div>
  );

  const renderDifficulties = () => (
    <div className="mt-4 flex flex-wrap gap-2">
      {DIFFICULTIES.map((diff) => (
        <DifficultyBadge key={diff.level} level={diff.level} label={diff.label} />
      ))}
    </div>
  );

  const renderTips = () => (
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      {TIPS.map((tip) => (
        <TipCard key={tip.title} icon={tip.icon} title={tip.title} desc={tip.desc} color={tip.color as "purple" | "indigo"} />
      ))}
    </div>
  );

  const renderCTA = () => (
    <section className="mt-12 text-center reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-800">
      <div className="rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white">
        <h2 className="text-2xl font-black">Prêt à relever le défi ?</h2>
        <p className="mt-2 text-sm text-purple-100">Mémorisez, échangez, verrouillez et gagnez !</p>
        <CacheLink
          href="/star/profil"
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-white text-purple-700 rounded-2xl font-bold hover:shadow-lg transition-all hover:scale-105"
        >
          Commencez ! <ChevronRight className="h-4 w-4" />
        </CacheLink>
      </div>
    </section>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/50 text-purple-900 overflow-x-hidden">
      {/* ===== NAVBAR ===== */}
      <nav className="sticky top-0 z-30 border-b border-purple-100 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-3">
          <CacheLink
            href="/star/profil"
            className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 hover:text-purple-800 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au jeu
          </CacheLink>
          <div className="hidden sm:flex items-center gap-2 text-[13px] font-bold">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.id} href={`#${item.id}`} label={item.label} />
            ))}
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-4 py-4 sm:py-8">
        {/* ===== HERO ===== */}
        <section className="text-center reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          <h1 className="text-balance text-4xl font-black tracking-tight bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent sm:text-6xl">
            DIAMBRA PUZZLE
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-purple-600">
            Développez votre mémoire visuelle et votre logique en replaçant les éléments du plateau P2.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CacheLink href="/star/profil" className={btnPrimary}>
              Jouez maintenant ! <ChevronRight className="h-4 w-4" />
            </CacheLink>
          </div>
        </section>

        {/* ===== OBJECTIFS ===== */}
        <section className="mt-10 sm:mt-12 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100">
          <ConicPanel>
            <SectionHeader title="🎯 Objectifs du jeu" />
            {renderObjectives()}
          </ConicPanel>
        </section>

        {/* ===== PRINCIPE ===== */}
        <section id="principe" className="mt-10 sm:mt-12 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200">
          <SectionHeader
            title="📌 Principe du jeu"
            subtitle="Déplacez les éléments du plateau P2 pour reproduire le plateau P1."
          />
          {renderPrinciples()}
        </section>

        {/* ===== COMMENT JOUER ===== */}
        <section id="jeu" className="mt-10 sm:mt-12 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-300">
          <ConicPanel>
            <SectionHeader title="🎮 Comment jouer" />
            {renderSteps()}
          </ConicPanel>
        </section>

        {/* ===== MODES ===== */}
        <section id="modes" className="mt-10 sm:mt-12 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-400">
          <SectionHeader
            title="🎨 Modes de jeu"
            subtitle="Variété de défis pour tous les goûts"
          />
          {renderModes()}
        </section>

        {/* ===== DIFFICULTÉ ===== */}
        <section id="difficulte" className="mt-10 sm:mt-12 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-500">
          <ConicPanel>
            <SectionHeader
              title="📊 Niveaux de difficulté"
              subtitle="Choisissez votre niveau, de 2×2 (débutant) à 10×10 (expert)."
            />
            {renderDifficulties()}
            <p className="mt-3 text-sm text-purple-700">
              Plus le niveau est élevé, plus le nombre de cases à mémoriser et à déplacer est important.
              <br />
              <span className="font-semibold">Commencez petit et progressez à votre rythme !</span>
            </p>
          </ConicPanel>
        </section>

        {/* ===== ÉVALUATION ===== */}
        <section id="evaluation" className="mt-10 sm:mt-12 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-600">
          <ConicPanel>
            <SectionHeader title="⏱️ Évaluation et classement" />
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
          </ConicPanel>
        </section>

        <section id="conseils" className="mt-10 sm:mt-12 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-700">
          <ConicPanel>
            <SectionHeader title="💡 Conseils pratiques" />
            {renderTips()}
          </ConicPanel>
        </section>

        {/* ===== CTA ===== */}
        {renderCTA()}
      </div>
    </main>
  );
}