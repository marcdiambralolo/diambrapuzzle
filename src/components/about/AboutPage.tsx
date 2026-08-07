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

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-white transition-all duration-300 " +
  "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg active:scale-95 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2";

export default function AboutPageClient() {
  useScrollReveal();

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/50 text-purple-900 overflow-x-hidden">
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
            {["principe", "jeu", "modes", "difficulte", "evaluation", "conseils"].map((item) => (
              <a
                key={item}
                className="text-purple-500 hover:text-purple-800 transition capitalize"
                href={`#${item}`}
              >
                {item === "difficulte" ? "Difficulté" : item === "evaluation" ? "Évaluation" : item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-4 py-4 sm:py-8">
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

        <section className="mt-10 sm:mt-12 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100">
          <ConicPanel>
            <h2 className="text-2xl font-black text-purple-900">🎯 Objectifs du jeu</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureCard icon={<Brain className="h-5 w-5" />} title="Mémoire visuelle">
                Développez votre capacité à mémoriser des dispositions.
              </FeatureCard>
              <FeatureCard icon={<Target className="h-5 w-5" />} title="Concentration">
                Restez focalisé pour résoudre le puzzle.
              </FeatureCard>
              <FeatureCard icon={<Sparkles className="h-5 w-5" />} title="Patience & stratégie">
                Planifiez vos mouvements pour gagner du temps.
              </FeatureCard>
              <FeatureCard icon={<Trophy className="h-5 w-5" />} title="Compétition">
                Défiez vos amis et participez à des classements.
              </FeatureCard>
            </div>
          </ConicPanel>
        </section>

        <section id="principe" className="mt-10 sm:mt-12 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200">
          <div className="mb-4 text-center">
            <h2 className="text-2xl font-black text-purple-900">📌 Principe du jeu</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-purple-600">
              Déplacez les éléments du plateau P2 pour reproduire le plateau P1.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Pill
              icon={<Layers className="h-5 w-5" />}
              title="Plateau P1"
              desc="Mémorisez la disposition de référence."
              tooltip="P1 est le modèle à reproduire."
            />
            <Pill
              icon={<Shuffle className="h-5 w-5" />}
              title="Plateau P2"
              desc="Échangez les cases pour retrouver la disposition."
              tooltip="Cliquez sur deux cases pour les échanger."
            />
            <Pill
              icon={<Clock className="h-5 w-5" />}
              title="Temps limité"
              desc="Terminez le puzzle avant la fin du chrono."
              tooltip="Plus vous êtes rapide, meilleur est votre score."
            />
          </div>
        </section>

        <section id="jeu" className="mt-10 sm:mt-12 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-300">
          <ConicPanel>
            <h2 className="text-2xl font-black text-purple-900">🎮 Comment jouer</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard icon={<Eye className="h-5 w-5" />} title="1. Mémorisez">
                Observez le plateau P1 pendant quelques secondes.
              </FeatureCard>
              <FeatureCard icon={<Shuffle className="h-5 w-5" />} title="2. Échangez">
                Cliquez sur deux cases du plateau P2 pour les échanger.
              </FeatureCard>
              <FeatureCard icon={<Eye className="h-5 w-5" />} title="3. Vérifiez">
                Utilisez &quot;Voir P1&quot; pour comparer votre progression.
              </FeatureCard>
              <FeatureCard icon={<Lock className="h-5 w-5" />} title="4. Verrouillez">
                Bloguez les cases correctement placées avec &quot;Ajuster&quot;.
              </FeatureCard>
              <FeatureCard icon={<Clock className="h-5 w-5" />} title="5. Chronomètrez">
                Complétez le puzzle avant la fin du temps imparti.
              </FeatureCard>
            </div>
          </ConicPanel>
        </section>

        <section id="modes" className="mt-10 sm:mt-12 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-400">
          <div className="mb-4 text-center">
            <h2 className="text-2xl font-black text-purple-900">🎨 Modes de jeu</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-purple-600">Variété de défis pour tous les goûts</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Pill
              icon={<Grid className="h-5 w-5" />}
              title="Mode Nombre"
              desc="Replacez les chiffres dans l'ordre."
              tooltip="Entraînez votre mémoire numérique."
            />
            <Pill
              icon={<Palette className="h-5 w-5" />}
              title="Mode Couleur"
              desc="Retrouvez la séquence de couleurs originale."
              tooltip="Parfait pour la mémoire visuelle."
            />
            <Pill
              icon={<ImageIcon className="h-5 w-5" />}
              title="Mode Image"
              desc="Reconstituez l'image découpée en morceaux."
              tooltip="Un défi pour les amateurs de puzzle."
            />
            <Pill
              icon={<Type className="h-5 w-5" />}
              title="Mode Lettre"
              desc="Réorganisez les paires de lettres alphabétiques."
              tooltip="Stimulez votre mémoire verbale."
            />
          </div>
        </section>

        <section id="difficulte" className="mt-10 sm:mt-12 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-500">
          <ConicPanel>
            <h2 className="text-2xl font-black text-purple-900">📊 Niveaux de difficulté</h2>
            <p className="mt-2 text-sm text-purple-600">
              Choisissez votre niveau, de 2×2 (débutant) à 10×10 (expert).
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <DifficultyBadge level="débutant" label="2×2 • Débutant" />
              <DifficultyBadge level="intermédiaire" label="4×4 • Intermédiaire" />
              <DifficultyBadge level="avancé" label="6×6 • Avancé" />
              <DifficultyBadge level="expert" label="10×10 • Expert" />
            </div>
            <p className="mt-3 text-sm text-purple-700">
              Plus le niveau est élevé, plus le nombre de cases à mémoriser et à déplacer est important.
              <br />
              <span className="font-semibold">Commencez petit et progressez à votre rythme !</span>
            </p>
          </ConicPanel>
        </section>

        <section id="evaluation" className="mt-10 sm:mt-12 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-600">
          <ConicPanel>
            <h2 className="text-2xl font-black text-purple-900">⏱️ Évaluation et classement</h2>
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
            <h2 className="text-2xl font-black text-purple-900">💡 Conseils pratiques</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-purple-50 p-4">
                <div className="flex items-center gap-2 text-purple-700">
                  <Clock className="h-5 w-5" />
                  <span className="font-bold">Prenez votre temps</span>
                </div>
                <p className="mt-1 text-sm text-purple-700">Mémorisez bien le plateau P1 avant de commencer.</p>
              </div>
              <div className="rounded-2xl bg-indigo-50 p-4">
                <div className="flex items-center gap-2 text-indigo-700">
                  <Target className="h-5 w-5" />
                  <span className="font-bold">Commencez facile</span>
                </div>
                <p className="mt-1 text-sm text-indigo-700">Essayez d'abord les niveaux 2×2 ou 3×3.</p>
              </div>
              <div className="rounded-2xl bg-purple-50 p-4">
                <div className="flex items-center gap-2 text-purple-700">
                  <Zap className="h-5 w-5" />
                  <span className="font-bold">Pratiquez régulièrement</span>
                </div>
                <p className="mt-1 text-sm text-purple-700">L'entraînement améliore vos performances.</p>
              </div>
              <div className="rounded-2xl bg-indigo-50 p-4">
                <div className="flex items-center gap-2 text-indigo-700">
                  <Zap className="h-5 w-5" />
                  <span className="font-bold">Mode automatique</span>
                </div>
                <p className="mt-1 text-sm text-indigo-700">Pour un défi chronométré plus intense.</p>
              </div>
            </div>
          </ConicPanel>
        </section>

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
      </div>
    </main>
  );
}