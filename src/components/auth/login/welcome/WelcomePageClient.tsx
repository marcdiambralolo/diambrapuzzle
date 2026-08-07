'use client';
import {
  ArrowRight,
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
  Type,
  Zap
} from 'lucide-react';
import React, { memo, useCallback, useState } from 'react';

type PillItem = {
  id: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  tooltip?: string;
};

type StatItem = {
  id: string;
  value: string;
  label: string;
  gradient: string;
  textColor: string;
  glow: string;
};

type ModeItem = {
  id: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  tooltip?: string;
};

type DifficultyLevel = {
  id: string;
  label: string;
  level: string;
};

// ============================================================
// DONNÉES
// ============================================================

const RULES: PillItem[] = [
  {
    id: 'principe',
    icon: <Layers className="h-5 w-5" />,
    title: 'Plateau P1 & P2',
    desc: 'Mémorisez la disposition du plateau P1, puis reproduisez-la sur P2.',
    tooltip: 'P1 est le modèle à reproduire, P2 est modifiable.',
  },
  {
    id: 'echange',
    icon: <Shuffle className="h-5 w-5" />,
    title: 'Échangez les cases',
    desc: 'Cliquez sur deux cases du plateau P2 pour les échanger.',
    tooltip: 'Chaque échange modifie la disposition.',
  },
  {
    id: 'temps',
    icon: <Clock className="h-5 w-5" />,
    title: 'Temps limité',
    desc: 'Terminez le puzzle avant la fin du chronomètre.',
    tooltip: 'Plus vous êtes rapide, meilleur est votre score.',
  },
];

const MODES: ModeItem[] = [
  {
    id: 'nombre',
    icon: <Grid className="h-5 w-5" />,
    title: 'Mode Nombre',
    desc: 'Replacez les chiffres dans l\'ordre.',
    tooltip: 'Entraînez votre mémoire numérique.',
  },
  {
    id: 'couleur',
    icon: <Palette className="h-5 w-5" />,
    title: 'Mode Couleur',
    desc: 'Retrouvez la séquence de couleurs originale.',
    tooltip: 'Parfait pour la mémoire visuelle.',
  },
  {
    id: 'image',
    icon: <ImageIcon className="h-5 w-5" />,
    title: 'Mode Image',
    desc: 'Reconstituez l\'image découpée en morceaux.',
    tooltip: 'Un défi pour les amateurs de puzzle.',
  },
  {
    id: 'lettre',
    icon: <Type className="h-5 w-5" />,
    title: 'Mode Lettre',
    desc: 'Réorganisez les paires de lettres alphabétiques.',
    tooltip: 'Stimulez votre mémoire verbale.',
  },
];

const DIFFICULTIES: DifficultyLevel[] = [
  { id: 'debutant', label: '2×2 • Débutant', level: 'débutant' },
  { id: 'intermediaire', label: '4×4 • Intermédiaire', level: 'intermédiaire' },
  { id: 'avance', label: '6×6 • Avancé', level: 'avancé' },
  { id: 'expert', label: '10×10 • Expert', level: 'expert' },
];

const STATS: StatItem[] = [
  {
    id: 'digits',
    value: '2×2 → 10×10',
    label: 'niveaux de difficulté',
    gradient: 'from-purple-500/15 via-fuchsia-500/10 to-indigo-500/15',
    textColor: 'text-purple-700 dark:text-purple-300',
    glow: 'shadow-purple-500/10',
  },
  {
    id: 'modes',
    value: '4',
    label: 'modes de jeu',
    gradient: 'from-indigo-500/15 via-blue-500/10 to-cyan-500/15',
    textColor: 'text-indigo-700 dark:text-indigo-300',
    glow: 'shadow-indigo-500/10',
  },
  {
    id: 'temps',
    value: '⏱️',
    label: 'chronométré',
    gradient: 'from-fuchsia-500/15 via-violet-500/10 to-purple-500/15',
    textColor: 'text-fuchsia-700 dark:text-fuchsia-300',
    glow: 'shadow-fuchsia-500/10',
  },
];

// ============================================================
// STYLES
// ============================================================

const sectionTitleClass =
  'text-center text-xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-white';

const sectionTextClass =
  'mx-auto mt-2 max-w-md text-center text-sm leading-relaxed text-slate-500 sm:text-[14px] dark:text-slate-300/80';

const cardBaseClass =
  'relative overflow-hidden rounded-2xl border border-purple-100/80 bg-white/90 shadow-[0_10px_30px_rgba(109,40,217,0.08)] backdrop-blur-sm transition-all duration-300 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_10px_30px_rgba(80,50,180,0.20)]';

// ============================================================
// COMPOSANTS
// ============================================================

const SectionHeader = memo(function SectionHeader({
  badge,
  title,
  subtitle,
}: {
  badge?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-5 sm:mb-6">
      {badge ? (
        <div className="mb-3 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-200/70 bg-purple-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-purple-700 dark:border-purple-400/20 dark:bg-purple-500/10 dark:text-purple-300">
            <Sparkles className="h-3.5 w-3.5" />
            {badge}
          </span>
        </div>
      ) : null}

      <h4 className={sectionTitleClass}>{title}</h4>

      {subtitle ? <p className={sectionTextClass}>{subtitle}</p> : null}
    </div>
  );
});

const Pill = memo(function Pill({
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

  const toggleTooltip = useCallback(() => {
    setShowTooltip((prev) => !prev);
  }, []);

  const closeTooltip = useCallback(() => {
    setShowTooltip(false);
  }, []);

  return (
    <div
      className={`${cardBaseClass} group p-4 sm:p-5`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] via-transparent to-indigo-500/[0.05] dark:from-purple-400/[0.05] dark:to-indigo-400/[0.06]" />
      <div className="relative flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 text-purple-700 transition-transform duration-300 group-active:scale-95 group-hover:scale-105 dark:from-purple-500/20 dark:to-indigo-500/20 dark:text-purple-300">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-extrabold leading-tight text-slate-900 sm:text-sm dark:text-white">
                {title}
              </div>
            </div>

            {tooltip ? (
              <button
                type="button"
                onClick={toggleTooltip}
                aria-label={`Informations sur ${title}`}
                aria-expanded={showTooltip}
                className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-50 text-purple-500 transition active:scale-95 dark:bg-white/10 dark:text-purple-300"
              >
                <Info className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>

          <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600 sm:text-[14px] dark:text-slate-300/85">
            {desc}
          </p>

          {tooltip ? (
            <div
              className={`grid transition-all duration-200 ${
                showTooltip
                  ? 'mt-3 grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="rounded-2xl border border-purple-200/70 bg-purple-50/90 px-3 py-2 text-xs leading-relaxed text-purple-700 dark:border-purple-400/20 dark:bg-purple-500/10 dark:text-purple-200">
                  {tooltip}
                  <button
                    type="button"
                    onClick={closeTooltip}
                    className="ml-2 font-bold underline underline-offset-2"
                  >
                    fermer
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
});

const HowToPlayCard = memo(function HowToPlayCard() {
  const steps = [
    { label: 'Mémorisez', icon: <Eye className="h-4 w-4" />, color: 'purple' },
    { label: 'Échangez', icon: <Shuffle className="h-4 w-4" />, color: 'indigo' },
    { label: 'Vérifiez', icon: <Eye className="h-4 w-4" />, color: 'blue' },
    { label: 'Verrouillez', icon: <Lock className="h-4 w-4" />, color: 'fuchsia' },
    { label: 'Chronométrez', icon: <Clock className="h-4 w-4" />, color: 'rose' },
  ];

  const colorMap: Record<string, string> = {
    purple: 'text-purple-500',
    indigo: 'text-indigo-500',
    blue: 'text-blue-500',
    fuchsia: 'text-fuchsia-500',
    rose: 'text-rose-500',
  };

  return (
    <div className={`${cardBaseClass} p-5 sm:p-6`}>
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-400/10" />
      <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-400/10" />

      <div className="relative">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-purple-700 dark:bg-purple-500/10 dark:text-purple-300">
          <Zap className="h-3.5 w-3.5" />
          5 étapes pour réussir
        </div>

        <p className="text-sm leading-7 text-slate-700 sm:text-[15px] dark:text-slate-200">
          Suivez ces étapes pour résoudre le puzzle Diambra :
        </p>

        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-5">
          {steps.map((step, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white/80 px-3 py-3 text-center shadow-sm transition-all hover:shadow-md dark:bg-white/5"
            >
              <div className={`flex items-center justify-center ${colorMap[step.color]}`}>
                {step.icon}
              </div>
              <div className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.10em] text-slate-700 dark:text-slate-300">
                {index + 1}
              </div>
              <div className="mt-0.5 text-xs font-semibold text-slate-800 dark:text-white">
                {step.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

const ModeCard = memo(function ModeCard({ item }: { item: ModeItem }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = useCallback(() => {
    setShowTooltip((prev) => !prev);
  }, []);

  const closeTooltip = useCallback(() => {
    setShowTooltip(false);
  }, []);

  return (
    <div className={`${cardBaseClass} group p-4 sm:p-5`}>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.02] via-transparent to-indigo-500/[0.03] dark:from-purple-400/[0.03] dark:to-indigo-400/[0.04]" />
      <div className="relative flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 text-purple-600 transition-transform duration-300 group-hover:scale-105 dark:from-purple-500/20 dark:to-indigo-500/20 dark:text-purple-300">
          {item.icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <div className="text-[12px] font-extrabold leading-tight text-slate-900 sm:text-[13px] dark:text-white">
                {item.title}
              </div>
            </div>

            {item.tooltip ? (
              <button
                type="button"
                onClick={toggleTooltip}
                aria-label={`Informations sur ${item.title}`}
                aria-expanded={showTooltip}
                className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-50 text-purple-500 transition active:scale-95 dark:bg-white/10 dark:text-purple-300"
              >
                <Info className="h-3 w-3" />
              </button>
            ) : null}
          </div>

          <p className="mt-1 text-[12px] leading-relaxed text-slate-600 sm:text-[13px] dark:text-slate-300/85">
            {item.desc}
          </p>

          {item.tooltip ? (
            <div
              className={`grid transition-all duration-200 ${
                showTooltip
                  ? 'mt-2 grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="rounded-xl border border-purple-200/70 bg-purple-50/90 px-3 py-1.5 text-xs leading-relaxed text-purple-700 dark:border-purple-400/20 dark:bg-purple-500/10 dark:text-purple-200">
                  {item.tooltip}
                  <button
                    type="button"
                    onClick={closeTooltip}
                    className="ml-2 font-bold underline underline-offset-2"
                  >
                    fermer
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
});

const DifficultyBadge = memo(function DifficultyBadge({ 
  label, 
  level 
}: { 
  label: string; 
  level: string;
}) {
  const colors: Record<string, string> = {
    débutant: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",
    intermédiaire: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300",
    avancé: "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300",
    expert: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
  };

  return (
    <span className={`inline-block rounded-full px-4 py-2 text-xs font-bold ${colors[level] || "bg-purple-100 text-purple-700"}`}>
      {label}
    </span>
  );
});

const StatCard = memo(function StatCard({ item }: { item: StatItem }) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-br ${item.gradient} p-5 shadow-xl ${item.glow} backdrop-blur-sm dark:border-white/10`}
    >
      <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-white/20 blur-2xl dark:bg-white/10" />
      <div className="relative text-center">
        <div className={`text-2xl font-black sm:text-3xl ${item.textColor}`}>
          {item.value}
        </div>
        <div className="mt-2 text-sm font-semibold leading-snug text-slate-700 dark:text-slate-200">
          {item.label}
        </div>
      </div>
    </div>
  );
});

const CTACard = memo(function CTACard() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 p-8 text-center shadow-2xl">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg...%3E')] opacity-10" />
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
      
      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 mb-4">
          <Rocket className="h-4 w-4 text-white" />
          <span className="text-xs font-bold text-white uppercase">Prêt à relever le défi ?</span>
        </div>
        
        <h2 className="text-2xl font-black text-white sm:text-3xl mb-4">
          Mémorisez, échangez, verrouillez et gagnez !
        </h2>
        
        <a
          href="/star/profil"
          className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 font-bold text-purple-700 shadow-lg transition-all hover:shadow-xl hover:scale-105"
        >
          <Gamepad2 className="h-5 w-5" />
          Jouer maintenant
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
});

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================

export default function WelcomePageClient() {
  return (
    <div className="relative mx-auto w-full max-w-6xl px-4 pb-8 pt-4 sm:px-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/15" />
        <div className="absolute right-0 top-28 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/15" />
        <div className="absolute bottom-20 left-0 h-32 w-32 rounded-full bg-fuchsia-500/10 blur-3xl dark:bg-fuchsia-500/10" />
      </div>

      <div className="relative z-10 space-y-6 sm:space-y-8">
        {/* ===== PRINCIPE ===== */}
        <section id="principe">
          <SectionHeader
            badge="Principe du jeu"
            title="📌 Déplacez les éléments du plateau P2"
            subtitle="Mémorisez P1, reproduisez sur P2"
          />

          <div className="grid gap-3 sm:gap-4 md:grid-cols-1 lg:grid-cols-1">
            {RULES.map((item, index) => (
              <Pill
                key={item.id}
                icon={item.icon}
                title={item.title}
                desc={item.desc}
                tooltip={item.tooltip}
                delay={index * 60}
              />
            ))}
          </div>
        </section>

        {/* ===== COMMENT JOUER ===== */}
        <section id="jeu">
          <SectionHeader
            badge="Comment jouer"
            title="🎮 5 étapes pour réussir"
          />

          <HowToPlayCard />
        </section>

        {/* ===== MODES DE JEU ===== */}
        <section id="modes">
          <SectionHeader
            badge="Modes de jeu"
            title="🎨 Variété de défis"
            subtitle="4 modes pour tous les goûts"
          />

          <div className="grid grid-cols-1 gap-3">
            {MODES.map((item) => (
              <ModeCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* ===== DIFFICULTÉ ===== */}
        <section id="difficulte">
          <SectionHeader
            badge="Niveaux de difficulté"
            title="📊 Choisissez votre niveau"
            subtitle="De 2×2 (débutant) à 10×10 (expert)"
          />

          <div className="rounded-3xl bg-white/90 p-6 shadow-lg border border-purple-100/80 dark:bg-white/5 dark:border-white/10">
            <div className="flex flex-wrap gap-3 justify-center">
              {DIFFICULTIES.map((item) => (
                <DifficultyBadge
                  key={item.id}
                  label={item.label}
                  level={item.level}
                />
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">
              Plus le niveau est élevé, plus le nombre de cases à mémoriser et à déplacer est important.
              <br />
              <span className="font-semibold">Commencez petit et progressez à votre rythme !</span>
            </p>
          </div>
        </section>

        {/* ===== STATS ===== */}
        <section id="stats">
          <SectionHeader
            badge="Le jeu en chiffres"
            title="📊 Les chiffres clés"
          />

          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
            {STATS.map((item) => (
              <StatCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* ===== CONSEILS ===== */}
        <section id="conseils">
          <SectionHeader
            badge="Conseils pratiques"
            title="💡 Astuces pour améliorer vos performances"
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 p-5 dark:from-purple-500/10 dark:to-purple-500/5">
              <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                <Clock className="h-5 w-5" />
                <span className="font-bold">Prenez votre temps</span>
              </div>
              <p className="mt-1 text-sm text-purple-700 dark:text-purple-300/80">
                Mémorisez bien le plateau P1 avant de commencer.
              </p>
            </div>
            
            <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-5 dark:from-indigo-500/10 dark:to-indigo-500/5">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                <Target className="h-5 w-5" />
                <span className="font-bold">Commencez facile</span>
              </div>
              <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-300/80">
                Essayez d'abord les niveaux 2×2 ou 3×3.
              </p>
            </div>
            
            <div className="rounded-2xl bg-gradient-to-br from-fuchsia-50 to-fuchsia-100/50 p-5 dark:from-fuchsia-500/10 dark:to-fuchsia-500/5">
              <div className="flex items-center gap-2 text-fuchsia-700 dark:text-fuchsia-300">
                <Zap className="h-5 w-5" />
                <span className="font-bold">Pratiquez régulièrement</span>
              </div>
              <p className="mt-1 text-sm text-fuchsia-700 dark:text-fuchsia-300/80">
                L'entraînement améliore vos performances.
              </p>
            </div>
            
            <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100/50 p-5 dark:from-rose-500/10 dark:to-rose-500/5">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300">
                <Rocket className="h-5 w-5" />
                <span className="font-bold">Mode automatique</span>
              </div>
              <p className="mt-1 text-sm text-rose-700 dark:text-rose-300/80">
                Pour un défi chronométré plus intense.
              </p>
            </div>
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <CTACard />

        {/* ===== FOOTER ===== */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © 2026 Diambra - Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}