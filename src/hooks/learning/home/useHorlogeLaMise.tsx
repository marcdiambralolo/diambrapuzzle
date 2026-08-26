'use client';

import { useStatsDataWithCache } from '@/hooks/cache/useStatsDataWithCache';
import { api } from '@/lib/api/client';
import { LearningConfiguration } from '@/lib/interfaces';
import { useDiambraStore } from '@/lib/store/diambra.store';
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from 'react';
import { useGameActions } from './useGameActions';
import { useGameStatus } from './useGameStatus';
import { useGameTimers } from './useGameTimers';
import { useLastEndedGame } from './useLastEndedGame';

const QUERY_STALE_TIME = 1000;
const RETRY_ATTEMPTS = 2;
const REFRESH_CONFIG_INTERVAL = 5000;
const CONFIG_GC_TIME = 60 * 1000;

export function useHorlogeInit() {
  // 1. Sélecteurs Zustand isolés (références stables)
  const setGameConfig = useDiambraStore((state) => state.setGameConfig);
  const afficheGame = useDiambraStore((state) => state.afficheGame);

  const { stats, isLoading: isStatsLoading, error } = useStatsDataWithCache();

  const { data: gameConfig = null, isLoading: isConfigLoading } = useQuery<LearningConfiguration | null>({
    queryKey: ['game', 'config'],
    queryFn: async () => {
      const { data } = await api.get<LearningConfiguration>('learning-configurations/current-config');
      return data;
    },
    staleTime: QUERY_STALE_TIME,
    refetchInterval: REFRESH_CONFIG_INTERVAL,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: RETRY_ATTEMPTS,
    gcTime: CONFIG_GC_TIME,
  });

  // 2. Synchronisation de la config dans Zustand sans effets secondaires dans le rendu
  useEffect(() => {
    if (gameConfig) {
      setGameConfig(gameConfig);
    }
  }, [gameConfig, setGameConfig]);

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