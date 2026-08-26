'use client';
import { useEndGameGenerator } from "@/hooks/learning/endgame/useEndGameGenerator";
import { memo } from 'react';
import FooterSection from "../commons/Features";
import Horloge from "../home/dashboard/Horloge";
import { HelpButton } from "../home/fixedcontent/HelpButton";
import CompetitionDetails from "../home/matchsheet/CompetitionDetails";
import LoadMoreButton from "../home/matchsheet/LoadMoreButton";
import TheGame from "../startgame/ProfilPageLearning";
import { useDiambraStore } from "@/lib/store/diambra.store";

const ProfilPageLearning = memo(() => {
  const afficheGame = useDiambraStore((state) => state.afficheGame);

  const {
    handleLoadMoreClick, competitionList, hasMore, remainingCount, isLoadingMore, user,
  } = useEndGameGenerator();

  return (
    <div className="w-full mx-auto max-w-md mb-8 mt-8">
      {afficheGame && <TheGame />}

      <footer className="fixed-bottom-content w-full mx-auto max-w-md space-y-4 space-x-2">
        <Horloge />

        <div className="w-full mx-auto max-w-md px-2 sm:px-0">
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

        <FooterSection />
        <HelpButton />
      </footer>
    </div>
  );
});

export default ProfilPageLearning;