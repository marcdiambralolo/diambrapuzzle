"use client";
import {
  Award, Brain, ChevronRight, Clock, Eye, Grid, Image as ImageIcon,
  Layers, Lock, Palette, Shuffle, Sparkles, Target, Trophy, Type, Zap
} from "lucide-react";
import { useEffect } from "react";
import CacheLink from "../commons/CacheLink";
import BackButton from "./components/BackButton";
import ConicSection from "./components/ConicSection";
import DifficultyBadge from "./components/DifficultyBadge";
import FeatureCard from "./components/FeatureCard";
import NavLink from "./components/NavLink";
import Pill from "./components/Pill";
import Section from "./components/Section";
import SectionHeader from "./components/SectionHeader";
import TipCard from "./components/TipCard";

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

const BUTTON_CLASSES = {
  primary: [
    "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-white",
    "transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600",
    "hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg active:scale-95",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2",
  ].join(" "),
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

interface GridRendererProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  columns?: {
    sm?: number;
    lg?: number;
  };
}

function GridRenderer<T>({
  items,
  renderItem,
  className = "",
  columns = { sm: 2, lg: 4 }
}: GridRendererProps<T>) {
  const colClasses = [
    "grid gap-3",
    `sm:grid-cols-${columns.sm}`,
    `lg:grid-cols-${columns.lg}`,
  ].join(" ");

  return (
    <div className={`${colClasses} ${className}`}>
      {items.map((item, index) => renderItem(item, index))}
    </div>
  );
}

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

interface PlainSectionProps extends SectionProps {
  headerTitle: string;
  headerSubtitle?: string;
}

function PlainSection({ id, headerTitle, headerSubtitle, children }: PlainSectionProps) {
  return (
    <Section id={id}>
      <SectionHeader title={headerTitle} subtitle={headerSubtitle} />
      {children}
    </Section>
  );
}

interface NavProps {
  items: Array<{ id: string; label: string }>;
}

interface FeatureItem {
  icon: React.ElementType;
  title: string;
  desc: string;
}

interface PillItem {
  icon: React.ElementType;
  title: string;
  desc: string;
  tooltip?: string;
}

function Navigation({ items }: NavProps) {
  return (
    <nav className="sticky top-0 z-30 border-b border-purple-100 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-3">
        <BackButton href="/star/profil">Retour au jeu</BackButton>
        <NavLinks items={items} />
      </div>
    </nav>
  );
}

function NavLinks({ items }: NavProps) {
  return (
    <div className="hidden sm:flex items-center gap-2 text-[13px] font-bold">
      {items.map((item) => (
        <NavLink key={item.id} href={`#${item.id}`} label={item.label} />
      ))}
    </div>
  );
}

function HeroSection() {
  return (
    <section className="text-center reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
      <h1 className="text-balance text-4xl font-black tracking-tight bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent sm:text-6xl">
        DIAMBRA PUZZLE
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-sm text-purple-600">
        Développez votre mémoire visuelle et votre logique en replaçant les éléments du plateau P2.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <CacheLink href="/star/profil" className={BUTTON_CLASSES.primary}>
          Jouez maintenant ! <ChevronRight className="h-4 w-4" />
        </CacheLink>
      </div>
    </section>
  );
}

interface FeatureGridProps {
  items: FeatureItem[];
}

function FeatureGrid({ items }: FeatureGridProps) {
  return (
    <GridRenderer
      items={items}
      columns={{ sm: 2, lg: 4 }}
      renderItem={(item) => (
        <FeatureCard key={item.title} icon={<item.icon className="h-5 w-5" />} title={item.title}>
          {item.desc}
        </FeatureCard>
      )}
    />
  );
}

interface PillGridProps {
  items: PillItem[];
  columns?: { sm?: number; lg?: number };
}

function PillGrid({ items, columns = { sm: 2, lg: 4 } }: PillGridProps) {
  return (
    <GridRenderer
      items={items}
      columns={columns}
      renderItem={(item) => (
        <Pill
          key={item.title}
          icon={<item.icon className="h-5 w-5" />}
          title={item.title}
          desc={item.desc}
          tooltip={item.tooltip}
        />
      )}
    />
  );
}

interface StepItem {
  icon: React.ElementType;
  title: string;
  desc: string;
}

function StepGrid({ items }: { items: StepItem[] }) {
  return (
    <GridRenderer
      items={items}
      columns={{ sm: 2, lg: 3 }}
      renderItem={(item) => (
        <FeatureCard key={item.title} icon={<item.icon className="h-5 w-5" />} title={item.title}>
          {item.desc}
        </FeatureCard>
      )}
    />
  );
}

interface TipItem {
  icon: React.ElementType;
  title: string;
  desc: string;
  color: "purple" | "indigo";
}

function TipGrid({ items }: { items: TipItem[] }) {
  return (
    <GridRenderer
      items={items}
      columns={{ sm: 2 }}
      renderItem={(item) => (
        <TipCard
          key={item.title}
          icon={item.icon}
          title={item.title}
          desc={item.desc}
          color={item.color}
        />
      )}
    />
  );
}

function CTASection() {
  return (
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
}

export default function AboutPageClient() {
  useScrollReveal();

  const { NAV_ITEMS, OBJECTIVES, PRINCIPLES, STEPS, MODES, DIFFICULTIES, TIPS } = CONFIG;

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/50 text-purple-900 overflow-x-hidden">
      <Navigation items={NAV_ITEMS} />

      <div className="mx-auto max-w-5xl px-4 py-4 sm:py-8">
        <HeroSection />

        {/* Objectives - Conic Section */}
        <ConicSection id="objectifs" headerTitle="🎯 Objectifs du jeu">
          <FeatureGrid items={OBJECTIVES} />
        </ConicSection>

        {/* Principles - Plain Section */}
        <PlainSection id="principe" headerTitle="📌 Principe du jeu" headerSubtitle="Déplacez les éléments du plateau P2 pour reproduire le plateau P1.">
          <PillGrid items={PRINCIPLES} columns={{ sm: 3 }} />
        </PlainSection>

        {/* How to Play - Conic Section */}
        <ConicSection id="jeu" headerTitle="🎮 Comment jouer">
          <StepGrid items={STEPS} />
        </ConicSection>

        {/* Modes - Plain Section */}
        <PlainSection id="modes" headerTitle="🎨 Modes de jeu" headerSubtitle="Variété de défis">
          <PillGrid items={MODES} />
        </PlainSection>

        {/* Difficulty - Conic Section */}
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

        {/* Evaluation - Conic Section */}
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