import Loader from "@/app/loading";
import { Stats } from "@/hooks/cache/useStatsDataWithCache";
import { useAdminConsultationsPageFinished } from "@/hooks/learning/home/useAdminConsultationsPageFinished";
import { memo } from 'react';
import ActiveBannerPlay from "./ActiveBannerPlay";
import NoCompetitionBanner from "./NoCompetitionBanner";

type GameStatus = 'results_available' | 'no_competition' | 'not_started' | 'ended_no_proclamation' | 'active';

interface DashboardContentProps {
  status: GameStatus;
  endDate: Date | null;
  countdown: number | null;
  onCompleteGameCleanup: () => void;
  stats: Stats | null;
  showButton: boolean;
  demarrerJeu: () => void;
}

const DashboardContent = memo(({
  status,
  endDate,
  countdown,
  onCompleteGameCleanup,
  stats,
  showButton,
  demarrerJeu
}: DashboardContentProps) => {
  switch (status) {
    case 'no_competition':
      return <NoCompetitionBanner />;

    case 'not_started':
      return <NoCompetitionBanner />;

    case 'active':
      if (endDate) {
        return (
          <ActiveBannerPlay
            endDate={endDate}
            countdown={countdown}
            onFinish={onCompleteGameCleanup}
            stats={stats!}
            showBandeauButton={showButton}
            demarrerJeu={demarrerJeu}
          />
        );
      }
      return <NoCompetitionBanner />;

    default:
      return <NoCompetitionBanner />;
  }
});

const Horloge = memo(() => {
  const {
    completeGameCleanup, endDate, isLoading, gameState, countdown, stats,showBandeauButton,demarrerJeu
  } = useAdminConsultationsPageFinished();

  if (isLoading) return <Loader />;

  return (
    <DashboardContent
      status={gameState.status}
      endDate={endDate}
      countdown={countdown}
      onCompleteGameCleanup={completeGameCleanup}
      stats={stats}
      showButton={showBandeauButton}
      demarrerJeu={demarrerJeu}
    />
  );
});

export default Horloge;