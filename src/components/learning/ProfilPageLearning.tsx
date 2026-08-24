'use client';
import CacheLink from '@/components/commons/CacheLink';
import { HelpCircle } from 'lucide-react';
import { memo } from 'react';
import ResultsCallToAction from "./components/ResultsCallToAction";
import HorlogeInit from "./home/dashboard/HorlogeInit";

const ProfilPageLearning = memo(() => {
  return (
    <div className="w-full mx-auto max-w-md mb-8 mt-8">
      <HorlogeInit />
      <div className="mb-6 mt-2">
        <ResultsCallToAction />
      </div>

      <div className="flex flex-col gap-3 mt-4 w-full">
        <CacheLink
          href="/star/help"
          className="group flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            Aide du jeu DIAMBRA PUZZLE
          </span>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </CacheLink>
      </div>
    </div>
  );
});

export default ProfilPageLearning;