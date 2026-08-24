'use client';
import { processUserData } from '@/lib/functions';
import { useAuth } from '@/lib/hooks';
import { useDiambraStore } from "@/lib/store/diambra.store";
import { useCallback, useEffect, useMemo, useState } from "react";
import usePaginationWithLoadMore from "./usePaginationWithLoadMore";

const ACTIVE_VALIDATED_GAME_KEY = 'active_validated_competition_id';

const getActiveValidatedId = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACTIVE_VALIDATED_GAME_KEY);
};

const useCompetitionStorage = () => {
  const [activeValidatedId, setActiveValidatedId] = useState<string | null>(getActiveValidatedId);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === ACTIVE_VALIDATED_GAME_KEY) {
        setActiveValidatedId(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateLocalCache = useCallback((competitionId: string) => {
    localStorage.setItem(ACTIVE_VALIDATED_GAME_KEY, competitionId);
    setActiveValidatedId(competitionId);
  }, []);

  return { activeValidatedId, updateLocalCache };
};

const useCompetitionList = () => {
  const competitions = useDiambraStore((state) => state.competitions);
  const gameConfigId = useDiambraStore((state) => state.gameConfig?.id);
  const competitionsVersion = useDiambraStore((state) => state.competitionsVersion);
  const gameJustEnded = useDiambraStore((state) => state.gameJustEnded);
  const afficheGame = useDiambraStore((state) => state.afficheGame);
  const { gameConfig } = useDiambraStore();

  const { activeValidatedId } = useCompetitionStorage();

  return useMemo(() => {
    if (!gameConfigId || !competitions.length) return [];

    return competitions
      .filter((comp) => comp.idConfig === gameConfigId)
      .map((comp) => {
        const isValidated = comp.id === activeValidatedId;
        const timestamp = comp.datedebut ? new Date(comp.datedebut).getTime() : 0;

        return {
          ...comp,
          displayName: `N° Match: ${gameConfig?.numeromatch}`,
          isValidated,
          _timestamp: timestamp,
        };
      })
      .sort((a, b) => {
        if (a.isValidated !== b.isValidated) return a.isValidated ? -1 : 1;
        return b._timestamp - a._timestamp;
      });
  }, [competitions, gameConfigId, competitionsVersion, gameJustEnded, afficheGame, activeValidatedId]);
};

export const useEndGameGenerator = () => {
  const refreshCompetitions = useDiambraStore((state) => state.refreshCompetitions);
  const { user } = useAuth();

  const processedData = useMemo(() => processUserData(user), [user]);
  const competitions = useCompetitionList();

  const refreshData = useCallback(() => {
    refreshCompetitions();
  }, [refreshCompetitions]);

  const {
    handleLoadMoreClick,
    displayList,
    hasMore,
    remainingCount,
    isLoadingMore,
  } = usePaginationWithLoadMore(competitions);

  return {
    handleLoadMoreClick,
    competitionList: displayList,
    hasMore,
    remainingCount,
    isLoadingMore,
    user: processedData,
    refreshData,
  };
};

export default useEndGameGenerator;