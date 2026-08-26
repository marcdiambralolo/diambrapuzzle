'use client';
import { useDiambraStore } from "@/lib/store/diambra.store";
import { memo } from 'react';
import FooterSection from "../commons/FooterSection";
import Horloge from "../home/dashboard/Horloge";
import { HelpButton } from "../home/fixedcontent/HelpButton";
import FeuillesdeMatch from "../home/matchsheet/FeuillesdeMatch";
import TheGame from "../startgame/ProfilPageLearning";

const ProfilPageLearning = memo(() => {
  const afficheGame = useDiambraStore((state) => state.afficheGame);

  return (
    <div className="w-full mx-auto max-w-md mb-8 mt-8">
      {afficheGame && <TheGame />}
      <footer className="fixed-bottom-content w-full mx-auto max-w-md space-y-4 space-x-2">
        <Horloge />
        <FeuillesdeMatch />
        <FooterSection />
        <HelpButton />
      </footer>
    </div>
  );
});

export default ProfilPageLearning;