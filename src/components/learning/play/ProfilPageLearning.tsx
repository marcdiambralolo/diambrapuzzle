'use client';
import { memo } from 'react';
import LaMise from "../choix/LaMise";
import FooterSection from "../commons/Features";
import HorlogeMise from '../home/dashboard/HorlogeMise';
import { HelpButton } from "../home/fixedcontent/HelpButton";

const ProfilPageLearning = memo(() => {

  return (
    <div className="w-full mx-auto max-w-md mb-8 mt-8">
      <div className="mt-4">
        <LaMise />
      </div>
      <footer className="fixed-bottom-content w-full mx-auto max-w-md space-y-4 space-x-2">
        <HorlogeMise />
        <FooterSection />
        <HelpButton />
      </footer>
    </div>
  );
});

export default ProfilPageLearning;