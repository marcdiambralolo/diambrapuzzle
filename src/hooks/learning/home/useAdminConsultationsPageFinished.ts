'use client';

import { useStatsDataWithCache } from '@/hooks/cache/useStatsDataWithCache';
import { api } from '@/lib/api/client';
import { LearningConfiguration } from '@/lib/interfaces';
import { useDiambraStore } from '@/lib/store/diambra.store';
import { useQuery } from "@tanstack/react-query";
import { useMemo } from 'react';
import { useGameActions } from './useGameActions';
import { useGameStatus } from './useGameStatus';
import { useGameTimers } from './useGameTimers';
import { useLastEndedGame } from './useLastEndedGame';

const QUERY_STALE_TIME = 1000;
const RETRY_ATTEMPTS = 2;
const REFRESH_CONFIG_INTERVAL = 5000;
const CONFIG_GC_TIME = 60 * 1000;

export function useAdminConsultationsPageFinished() {
  // Sélecteur Zustand regroupé pour réduire le nombre de souscriptions
  const { setGameConfig, afficheGame } = useDiambraStore((state) => ({
    setGameConfig: state.setGameConfig,
    afficheGame: state.afficheGame,
  }));

  const { stats, isLoading: isStatsLoading, error } = useStatsDataWithCache();

  // Utilisation de `select` pour synchroniser le store sans déclencher de useEffect
  const { data: gameConfig = null, isLoading: isConfigLoading } = useQuery<LearningConfiguration | null>({
    queryKey: ['game', 'config'],
    queryFn: async () => {
      const { data } = await api.get<LearningConfiguration>('learning-configurations/current-config');
      return data;
    },
    select: (data) => {
      setGameConfig(data);
      return data;
    },
    staleTime: QUERY_STALE_TIME,
    refetchInterval: REFRESH_CONFIG_INTERVAL,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: RETRY_ATTEMPTS,
    gcTime: CONFIG_GC_TIME,
  });

  const { lastEndedGame, isLoading: isLastEndedLoading } = useLastEndedGame();
  const { currentTimestamp, dates, countdowns } = useGameTimers(gameConfig);

  const { gameState } = useGameStatus({
    gameConfig,
    dates,
    countdowns,
    currentTimestamp,
    lastEndedGame,
  });

  const { completeGameCleanup, demarrerJeu, demarrerJeuInit } = useGameActions(gameConfig);

  const showBandeauButton = Boolean(gameState.canUserPlay && !afficheGame);
  const isLoading = isLastEndedLoading || isConfigLoading || isStatsLoading;

  return useMemo(() => ({
    demarrerJeu,
    demarrerJeuInit,
    completeGameCleanup,
    startDate: dates.startDate,
    endDate: dates.endDate,
    countdown: gameState.countdown,
    isLoading,
    lastEndedGame,
    gameState,
    showBandeauButton,
    stats,
    error,
  }), [
    demarrerJeu,
    demarrerJeuInit,
    completeGameCleanup,
    dates.startDate,
    dates.endDate,
    gameState,
    isLoading,
    lastEndedGame,
    showBandeauButton,
    stats,
    error,
  ]);
}