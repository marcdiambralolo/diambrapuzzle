'use client';
import { ChevronRight, Trophy } from "lucide-react";
import { memo } from 'react';
import CacheLink from "../commons/CacheLink";
import HorlogeInit from "./home/dashboard/HorlogeInit";

const ResultsCallToAction = memo(() => {
  return (
    <CacheLink
      href="/star/historique/6a782428e1a75a8c30980456"
      className="group relative block w-full overflow-hidden"
    >
      <div className="relative mx-auto w-full max-w-md">
        <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 transition-all duration-500 hover:shadow-3xl hover:shadow-purple-500/30 hover:scale-[1.02]">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-violet-700/90 via-purple-700/90 to-indigo-800/90 px-4 py-4 backdrop-blur-sm">
            <div className="mb-2">
              <div className="inline-block">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white">
                  🏆 Competition Precedente
                </p>
              </div>

              <h3 className="text-xl font-black tracking-tight text-white sm:text-3xl">
                <span className="bg-gradient-to-r from-amber-200 via-yellow-200 to-orange-200 bg-clip-text text-transparent">
                  Le classement
                </span>
                {" "}
                <span className="relative inline-block">
                  est tombé
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                    <path d="M1 5.5C67 -0.5 133 -0.5 199 5.5" stroke="url(#underlineGrad)" strokeWidth="2" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="underlineGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#FCD34D" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#FCD34D" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/80">
                Découvrez les{" "}
                <span className="font-bold text-white">nouveaux champions</span>
                {" "}et vérifiez votre position.
              </p>
            </div>


            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="relative flex w-full items-center justify-between bg-white px-5 py-4 transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-50">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-purple-500/30 transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -right-1 -top-1 h-4 w-4 animate-ping rounded-full bg-amber-400 opacity-75" />
                  <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-amber-400" />
                </div>

                <div className="text-left">
                  <span className="block text-sm font-bold text-gray-900 transition-colors group-hover:text-purple-700">
                    Voir le classement
                  </span>
                </div>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30 transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl">
                <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CacheLink>
  );
});

const ProfilPageLearning = memo(() => {
  return (
    <div className="w-full mx-auto max-w-md mb-8 mt-8">
      <HorlogeInit />

      <div className="mb-6 mt-2">
        <ResultsCallToAction />
      </div>
    </div>
  );
});

export default ProfilPageLearning;