"use client";
import Loader from "@/app/loading";
import { useConsultationsListPage } from "@/hooks/consultations/useConsultationsListPage";
import { cx, formatEditionDate } from "@/lib/functions";
import { AlertCircle, CalendarDays, ChevronRight, Crown, Flame, Gamepad2, History, Trophy, UserRound } from "lucide-react";
import Link from "next/link";
import { memo, type ReactNode } from "react";
import ConsultationCard from "../commons/ConsultationCard"; 

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
  count: number;
}

const TabButton = memo(({ active, onClick, icon, label, count }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={cx(
      "relative flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-colors duration-200",
      active
        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25"
        : "bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
    )}
  >
    {icon}
    <span>{label}</span>
    {count >= 0 && (
      <span
        className={cx(
          "px-2 py-0.5 rounded-full text-xs font-bold",
          active
            ? "bg-white/20 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
        )}
      >
        {count > 0 && count}
      </span>
    )}
    {active && (
      <span className="absolute -bottom-4 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full" />
    )}
  </button>
)); 

interface EditionCardProps {
  edition: {
    id: string;
    startDate: string;
    endDate: string;
    status: string;
    isActive: boolean;
    winningCombination: string | null;
  };
  gamesCount: number;
}

const EditionCard = memo(({ edition, gamesCount }: EditionCardProps) => {
  const now = new Date();
  const startDate = new Date(edition.startDate);
  const endDate = new Date(edition.endDate);
  const isActive = now >= startDate && now <= endDate && edition.status === 'active';
  const isEnded = edition.status === 'ended' || now > endDate;

  const getStatusBadge = () => {
    if (isActive) {
      return { text: "En cours", color: "bg-green-500", icon: <Flame className="w-3 h-3" /> };
    }
    if (isEnded) {
      return { text: "Terminée", color: "bg-red-500", icon: <Trophy className="w-3 h-3" /> };
    }
    return { text: "À venir", color: "bg-yellow-500", icon: <CalendarDays className="w-3 h-3" /> };
  };

  const status = getStatusBadge();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 shadow-xl">
      <Link href={`/star/monprofil/${edition.id}`}>
        <div className="p-5 cursor-pointer">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-xs text-white/80">Édition</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${status.color} text-white`}>
                    {status.icon}
                    {status.text}
                  </span>
                </div>
                <p className="text-white font-bold text-sm mt-1">
                  Du {formatEditionDate(startDate)} au {formatEditionDate(endDate)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {gamesCount > 0 && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{gamesCount}</div>
                  <div className="text-[10px] text-white/70">parties</div>
                </div>
              )}              

              <ChevronRight className="w-5 h-5 text-white/70" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
});

interface EditionsListProps {
  editions: Array<{
    id: string;
    startDate: string;
    endDate: string;
    status: string;
    isActive: boolean;
    winningCombination: string | null;
  }>;
  getGamesCountByEdition: (editionId: string) => number;
}

const EditionsList = memo(({ editions, getGamesCountByEdition }: EditionsListProps) => {
  if (editions.length === 0) {
    return (
      <div className="text-center py-12 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl">
        <p className="text-gray-500 dark:text-gray-400">Aucune édition disponible</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {editions.map((edition) => (
        <EditionCard
          key={edition.id}
          edition={edition}
          gamesCount={getGamesCountByEdition(edition.id)}
        />
      ))}
    </div>
  );
});

const ErrorState = memo(() => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="max-w-md rounded-2xl border border-red-500/25 bg-gradient-to-br from-red-950/20 to-red-900/10 p-8 text-center backdrop-blur-xl">
      <AlertCircle className="mx-auto mb-4 h-16 w-16 text-red-400" />
      <h3 className="text-xl font-bold text-white mb-2">Accès refusé</h3>
      <p className="text-gray-300">Aucun utilisateur connecté. Veuillez vous connecter.</p>
    </div>
  </div>
));

const IdentityOverview = memo(function IdentityOverview({
  fullName,
  dateNaissanceLabel,
}: {
  fullName: string;
  dateNaissanceLabel: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-transparent to-indigo-50/30 dark:from-purple-950/20 dark:to-indigo-950/20" />
      <div className="relative p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <IdentityPill
            icon={<UserRound className="h-4 w-4" />}
            label="Nom complet"
            value={fullName}
          />
          <IdentityPill
            icon={<CalendarDays className="h-4 w-4" />}
            label="Date & heure"
            value={dateNaissanceLabel}
          />
        </div>
      </div>
    </div>
  );
});

const IdentityPill = memo(function IdentityPill({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 py-3">
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
        {icon}
        {label}
      </div>
      <div className="mt-1.5 text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
        {value || "—"}
      </div>
    </div>
  );
});


function MonProfilPageClientImpl() {
  const {
    setActiveTab,
    getGamesCountByEdition,
    consultations,
    editions,
    loading,
    activeTab,
    processedData,
    fullName,
    dateNaissanceLabel,
  } = useConsultationsListPage();

  if (loading) return <Loader />;
  if (!processedData) return <ErrorState />;

  const isGamesTab = activeTab === 'games';

  return (
    <main className="relative max-w-2xl mx-auto px-4 py-8 sm:px-6 sm:py-12 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20">
      <div className="mb-8">
        <div className="flex gap-3 p-1.5 bg-gray-100/50 dark:bg-gray-800/30 rounded-2xl">
          <TabButton
            active={activeTab === 'games'}
            onClick={() => setActiveTab('games')}
            icon={<Gamepad2 className="w-4 h-4" />}
            label="Mes Jeux"
            count={editions.length}
          />
          <TabButton
            active={activeTab === 'history'}
            onClick={() => setActiveTab('history')}
            icon={<History className="w-4 h-4" />}
            label="Mon Profil"
            count={-1}
          />
        </div>
      </div>

      {/* Contenu des onglets */}
      {isGamesTab ? (
        <div className="space-y-5">
          <EditionsList
            editions={editions}
            getGamesCountByEdition={getGamesCountByEdition}
          />
        </div>
      ) : (
        <div className="relative mt-8">
          <div className="relative z-10 w-full">
            <div className="space-y-6">
              <IdentityOverview
                fullName={fullName}
                dateNaissanceLabel={dateNaissanceLabel}
              />

              {consultations.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <History className="w-5 h-5 text-purple-500" />
                    Dernières parties (top 10)
                  </h3>
                  <div className="space-y-3">
                    {consultations.slice(0, 10).map((consultation, index) => (
                      <ConsultationCard
                        key={consultation?._id ?? consultation?.id ?? index}
                        consultation={consultation}
                        index={index}
                        showDate={true}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

const MonProfilPageClient = memo(MonProfilPageClientImpl);

export default MonProfilPageClient;