'use client';
import CacheLink from "@/components/commons/CacheLink";
import { ChevronRight, Trophy } from "lucide-react";
import { memo } from 'react';

const ResultsCallToAction = memo(() => {
    return (
        <CacheLink
            href="/star/learning/historique/6a782428e1a75a8c30980456"
            className="group relative block w-full overflow-hidden"
        >
            <div className="relative mx-auto w-full max-w-md">
                <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-[1.02]">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700/95 via-purple-700/95 to-indigo-800/95 px-6 py-6 backdrop-blur-sm text-center">

                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md mb-4">
                            <span className="text-sm">🏆</span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
                                Compétition Précédente
                            </span>
                        </div>

                        <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
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

                        <p className="mt-3 mx-auto max-w-xs text-sm leading-relaxed text-white/80">
                            Découvrez les{" "}
                            <span className="font-bold text-white">nouveaux champions</span>
                            {" "}et vérifiez votre position dans le classement général.
                        </p>

                        <div className="mt-5 flex justify-center">
                            <div className="flex w-full max-w-sm items-center justify-between bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 transition-all duration-300 hover:bg-white/20 group-hover:bg-white/20">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg transition-all duration-500 group-hover:scale-110">
                                            <Trophy className="h-5 w-5 text-white" />
                                        </div>
                                        <div className="absolute -right-1 -top-1 h-3 w-3 animate-ping rounded-full bg-amber-400 opacity-75" />
                                        <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-amber-400" />
                                    </div>

                                    <span className="text-sm font-bold text-white transition-colors duration-300 group-hover:text-amber-200">
                                        Voir le classement complet
                                    </span>
                                </div>

                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-all duration-500 group-hover:scale-110 group-hover:bg-white/30">
                                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CacheLink>
    );
});

export default ResultsCallToAction;