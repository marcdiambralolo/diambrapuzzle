"use client";
import Loader from '@/app/loading';
import { cx } from '@/lib/functions';
import { useAuthStore } from '@/lib/store/auth.store';
import Image from "next/image";
import {
  ArrowRight,
  Brain,
  ChevronRight,
  Clock,
  Eye,
  Gamepad2,
  Grid,
  Image as ImageIcon,
  Info,
  Layers,
  Lock,
  Palette,
  Rocket,
  Shuffle,
  Sparkles,
  Target,
  Trophy,
  Type,
  Zap
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import CacheLink from '../commons/CacheLink';

// ============================================================
// HOOKS
// ============================================================

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

// ============================================================
// STYLES
// ============================================================

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-white transition-all duration-300 " +
  "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg active:scale-95 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2";

// ============================================================
// COMPOSANTS UI
// ============================================================

/**
 * Carte "Pilule" avec icône, titre, description et tooltip.
 */
function Pill({
  icon,
  title,
  desc,
  tooltip,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tooltip?: string;
  delay?: number;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="group relative flex items-start gap-3 rounded-2xl border border-purple-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mt-0.5 grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 text-purple-700 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <div className="text-[12px] font-bold text-purple-900">{title}</div>
          {tooltip && (
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="text-purple-400 hover:text-purple-600 transition"
            >
              <Info className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <div className="mt-1 text-[13px] leading-relaxed text-purple-700">{desc}</div>
      </div>
      {tooltip && showTooltip && (
        <div className="absolute left-0 top-full mt-2 z-10 w-48 rounded-lg bg-purple-900 px-3 py-2 text-xs text-white shadow-lg">
          {tooltip}
        </div>
      )}
    </div>
  );
}

/**
 * Carte de fonctionnalité avec icône colorée.
 */
function FeatureCard({
  icon,
  title,
  children,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2 text-purple-700">
        {icon}
        <span className="font-bold text-purple-900">{title}</span>
      </div>
      <div className="mt-2 text-sm text-purple-700">{children}</div>
    </div>
  );
}

/**
 * Badge de difficulté.
 */
function DifficultyBadge({ level, label }: { level: string; label: string }) {
  const colors: Record<string, string> = {
    débutant: "bg-green-100 text-green-700",
    intermédiaire: "bg-yellow-100 text-yellow-700",
    avancé: "bg-orange-100 text-orange-700",
    expert: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={cx(
        "inline-block rounded-full px-3 py-1 text-xs font-bold",
        colors[level] || "bg-purple-100 text-purple-700"
      )}
    >
      {label}
    </span>
  );
}

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================

export default function WelcomePageClient() {
  return (
    <Suspense fallback={<Loader />}>
      <WelcomePageClientContent />
    </Suspense>
  );
}

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
    <main className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/50 overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:py-4">
        {/* ===== HERO ===== */}
        <section className="text-center reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          {/* ===== LOGO ===== */}
          <div className="flex justify-center">
            <CacheLink href="/" className="block relative group">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/logolearning.png"
                  alt="Diambra"
                  fill
                  sizes="(max-width: 768px) 256px, 384px"
                  className="object-contain drop-shadow-xl"
                  priority
                />
              </div>
            </CacheLink>
          </div>

          {/* ===== TITRE ===== */}
          <div className="relative">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              DIAMBRA PUZZLE
            </h1>
            {/* Effet de brillance sur le titre */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
          </div>

          {/* ===== SOUS-TITRE ===== */}
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-purple-600 font-medium">
            Développez votre mémoire visuelle et votre logique en replaçant les éléments du plateau P2.
          </p>

          {/* ===== BOUTON CTA ===== */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CacheLink
              href="/star/profil"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-white font-bold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center gap-2 text-base sm:text-lg">
                <span className="text-xl">🎮</span>
                Jouez maintenant !
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              {/* Effet de brillance au survol */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              {/* Effet de pulsation */}
              <div className="absolute inset-0 rounded-2xl animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-400/20 to-indigo-400/20" />
            </CacheLink>

            {/* Bouton secondaire optionnel */}
            <CacheLink
              href="#principe"
              className="group inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-purple-600 hover:text-purple-800 transition-all duration-300 hover:-translate-y-1"
            >
              En savoir plus
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </CacheLink>
          </div>

          {/* ===== STATS RAPIDES ===== */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-10">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-600">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="font-semibold">2×2</span>
              <span className="text-purple-400">→</span>
              <span className="font-semibold">10×10</span>
              <span className="text-purple-400">niveaux</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-600">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse animation-delay-200" />
              <span className="font-semibold">4</span>
              <span className="text-purple-400">modes de jeu</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-600">
              <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse animation-delay-500" />
              <span className="font-semibold">⏱️</span>
              <span className="text-purple-400">chronométré</span>
            </div>
          </div>
        </section>

        {/* ===== OBJECTIFS ===== */}
        <section className="mt-16 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-800">🎯 Objectifs du jeu</h2>
            <p className="text-gray-500 mt-2">Ce que vous allez développer</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon={<Brain className="h-5 w-5" />} title="Mémoire visuelle" delay={0}>
              Développez votre capacité à mémoriser des dispositions.
            </FeatureCard>
            <FeatureCard icon={<Target className="h-5 w-5" />} title="Concentration" delay={50}>
              Restez focalisé pour résoudre le puzzle.
            </FeatureCard>
            <FeatureCard icon={<Sparkles className="h-5 w-5" />} title="Patience & stratégie" delay={100}>
              Planifiez vos mouvements pour gagner du temps.
            </FeatureCard>
            <FeatureCard icon={<Trophy className="h-5 w-5" />} title="Compétition" delay={150}>
              Défiez vos amis et participez à des classements.
            </FeatureCard>
          </div>
        </section>

        {/* ===== PRINCIPE ===== */}
        <section id="principe" className="mt-16 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-800">📌 Principe du jeu</h2>
            <p className="text-gray-500 mt-2">Déplacez les éléments du plateau P2 pour reproduire le plateau P1</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Pill
              icon={<Layers className="h-5 w-5" />}
              title="Plateau P1"
              desc="Mémorisez la disposition de référence."
              tooltip="P1 est le modèle à reproduire."
              delay={0}
            />
            <Pill
              icon={<Shuffle className="h-5 w-5" />}
              title="Plateau P2"
              desc="Échangez les cases pour retrouver la disposition."
              tooltip="Cliquez sur deux cases pour les échanger."
              delay={50}
            />
            <Pill
              icon={<Clock className="h-5 w-5" />}
              title="Temps limité"
              desc="Terminez le puzzle avant la fin du chrono."
              tooltip="Plus vous êtes rapide, meilleur est votre score."
              delay={100}
            />
          </div>
        </section>

        {/* ===== COMMENT JOUER ===== */}
        <section id="jeu" className="mt-16 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-300">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-800">🎮 Comment jouer ?</h2>
            <p className="text-gray-500 mt-2">Suivez ces étapes pour réussir</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard icon={<Eye className="h-5 w-5" />} title="1. Mémorisez" delay={0}>
              Observez le plateau P1 pendant quelques secondes.
            </FeatureCard>
            <FeatureCard icon={<Shuffle className="h-5 w-5" />} title="2. Échangez" delay={50}>
              Cliquez sur deux cases du plateau P2 pour les échanger.
            </FeatureCard>
            <FeatureCard icon={<Eye className="h-5 w-5" />} title="3. Vérifiez" delay={100}>
              Utilisez &quot;Voir P1&quot; pour comparer votre progression.
            </FeatureCard>
            <FeatureCard icon={<Lock className="h-5 w-5" />} title="4. Verrouillez" delay={150}>
              Bloguez les cases correctement placées avec &quot;Ajuster&quot;.
            </FeatureCard>
            <FeatureCard icon={<Clock className="h-5 w-5" />} title="5. Chronomètrez" delay={200}>
              Complétez le puzzle avant la fin du temps imparti.
            </FeatureCard>
          </div>
        </section>

        {/* ===== MODES DE JEU ===== */}
        <section id="modes" className="mt-16 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-400">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-800">🎨 Modes de jeu</h2>
            <p className="text-gray-500 mt-2">Variété de défis pour tous les goûts</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Pill
              icon={<Grid className="h-5 w-5" />}
              title="Mode Nombre"
              desc="Replacez les chiffres dans l'ordre."
              tooltip="Entraînez votre mémoire numérique."
              delay={0}
            />
            <Pill
              icon={<Palette className="h-5 w-5" />}
              title="Mode Couleur"
              desc="Retrouvez la séquence de couleurs originale."
              tooltip="Parfait pour la mémoire visuelle."
              delay={50}
            />
            <Pill
              icon={<ImageIcon className="h-5 w-5" />}
              title="Mode Image"
              desc="Reconstituez l'image découpée en morceaux."
              tooltip="Un défi pour les amateurs de puzzle."
              delay={100}
            />
            <Pill
              icon={<Type className="h-5 w-5" />}
              title="Mode Lettre"
              desc="Réorganisez les paires de lettres alphabétiques."
              tooltip="Stimulez votre mémoire verbale."
              delay={150}
            />
          </div>
        </section>

        {/* ===== DIFFICULTÉ ===== */}
        <section id="difficulte" className="mt-16 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-500">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-800">📊 Niveaux de difficulté</h2>
            <p className="text-gray-500 mt-2">Choisissez votre niveau et progressez</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-lg border border-purple-100">
            <div className="flex flex-wrap gap-3 justify-center">
              <DifficultyBadge level="débutant" label="2×2 • Débutant" />
              <DifficultyBadge level="intermédiaire" label="4×4 • Intermédiaire" />
              <DifficultyBadge level="avancé" label="6×6 • Avancé" />
              <DifficultyBadge level="expert" label="10×10 • Expert" />
            </div>
            <p className="mt-4 text-center text-sm text-purple-700">
              Plus le niveau est élevé, plus le nombre de cases à mémoriser et à déplacer est important.
              <br />
              <span className="font-semibold">Commencez petit et progressez à votre rythme !</span>
            </p>
          </div>
        </section>

        {/* ===== ÉVALUATION ===== */}
        <section id="evaluation" className="mt-16 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-600">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-800">⏱️ Évaluation et classement</h2>
            <p className="text-gray-500 mt-2">Votre performance mesurée</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-lg border border-purple-100">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 p-5">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="font-bold text-purple-900">Temps écoulé</p>
                    <p className="text-sm text-purple-700">Mesuré du début à la fin du match</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-5">
                <div className="flex items-center gap-3">
                  <Trophy className="h-8 w-8 text-indigo-600" />
                  <div>
                    <p className="font-bold text-indigo-900">Score & Classement</p>
                    <p className="text-sm text-indigo-700">Comparez vos résultats et défiez vos amis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CONSEILS ===== */}
        <section id="conseils" className="mt-16 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-700">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-800">💡 Conseils pratiques</h2>
            <p className="text-gray-500 mt-2">Astuces pour améliorer vos performances</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-5 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 text-purple-700">
                <Clock className="h-5 w-5" />
                <span className="font-bold">Prenez votre temps</span>
              </div>
              <p className="mt-1 text-sm text-purple-700">Mémorisez bien le plateau P1 avant de commencer.</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 text-indigo-700">
                <Target className="h-5 w-5" />
                <span className="font-bold">Commencez facile</span>
              </div>
              <p className="mt-1 text-sm text-indigo-700">Essayez d'abord les niveaux 2×2 ou 3×3.</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-5 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 text-purple-700">
                <Zap className="h-5 w-5" />
                <span className="font-bold">Pratiquez régulièrement</span>
              </div>
              <p className="mt-1 text-sm text-purple-700">L'entraînement améliore vos performances.</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 text-indigo-700">
                <Rocket className="h-5 w-5" />
                <span className="font-bold">Mode automatique</span>
              </div>
              <p className="mt-1 text-sm text-indigo-700">Pour un défi chronométré plus intense.</p>
            </div>
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <section className="mt-16 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-800">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 p-10 text-center shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg...%3E')] opacity-10" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/20 rounded-full blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 mb-4">
                <Rocket className="w-4 h-4 text-white" />
                <span className="text-xs font-bold text-white uppercase">Prêt à relever le défi ?</span>
              </div>
              <h2 className="text-3xl font-black text-white mb-6">Mémorisez, échangez, verrouillez et gagnez !</h2>
              <CacheLink
                href="/star/profil"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-700 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
              >
                <Gamepad2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Jouer maintenant
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </CacheLink>
            </div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-400">© 2026 Diambra - Tous droits réservés.</p>
        </div>
      </div>
    </main>
  );
}