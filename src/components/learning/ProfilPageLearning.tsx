'use client';
import { useEndGameGenerator } from "@/hooks/learning/endgame/useEndGameGenerator";
import { useDiambraStore } from "@/lib/store/diambra.store";
import { memo } from 'react';
import LaMise from "./choix/LaMise";
import { FooterSection } from "./commons/Features";
import Historique from "./historique/Historique";
import Horloge from "./home/dashboard/Horloge";
import { HeaderSection } from "./home/fixedcontent/HeaderSection";
import { HelpButton } from "./home/fixedcontent/HelpButton";
import { StatsSection } from "./home/fixedcontent/StatsSection";
import CompetitionDetails from "./home/matchsheet/CompetitionDetails";
import LoadMoreButton from "./home/matchsheet/LoadMoreButton";
import TheGame from "./startgame/ProfilPageLearning";

interface ContentRendererProps {
  showChoix: boolean;
  showGame: boolean;
}

const ContentRenderer = memo(({ showChoix, showGame }: ContentRendererProps) => {
  if (showChoix) return <LaMise />;
  if (showGame) return <TheGame />;

  return null;
});

const ProfilPageLearning = memo(() => {
  const afficheGame = useDiambraStore((state) => state.afficheGame);
  const afficheChoix = useDiambraStore((state) => state.afficheChoix);
  const hasContent = afficheChoix || afficheGame;
  const {
    handleLoadMoreClick, competitionList, hasMore, remainingCount, isLoadingMore, user,
  } = useEndGameGenerator();

  return (
    <div className="w-full mx-auto max-w-md mb-8 mt-4">
      <HeaderSection />
      {hasContent && (
        <div className="mt-4">
          <ContentRenderer showChoix={afficheChoix} showGame={afficheGame} />
        </div>
      )}
      <footer className="fixed-bottom-content w-full mx-auto max-w-md space-y-4 space-x-2">
        <Horloge />
        <div className="w-full mx-auto max-w-md px-4 sm:px-0">
          <div className="space-y-4">
            {competitionList?.map((competition, idx) => (
              <CompetitionDetails
                key={competition.id}
                competition={competition}
                priority={idx === 0}
                user={user}
              />
            ))}

            {hasMore && (
              <LoadMoreButton
                onClick={handleLoadMoreClick}
                remainingCount={remainingCount}
                isLoading={isLoadingMore}
              />
            )}
          </div>
        </div>
        <StatsSection />
        <Historique />
        <FooterSection />
        <HelpButton />
      </footer>
    </div>
  );
});

export default ProfilPageLearning;