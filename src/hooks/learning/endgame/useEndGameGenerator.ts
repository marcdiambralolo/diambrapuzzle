// 'use client';
// import { processUserData } from '@/lib/functions';
// import { useAuth } from '@/lib/hooks';
// import { useDiambraStore } from "@/lib/store/diambra.store";
// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import usePaginationWithLoadMore from "./usePaginationWithLoadMore";

// // Clé unique globale alignée avec useCompetitionValidation
// const ACTIVE_VALIDATED_GAME_KEY = 'active_validated_competition_id';

// const isCompetitionValidated = (competitionId: string): boolean => {
//     if (typeof window === 'undefined') return false;
//     return localStorage.getItem(ACTIVE_VALIDATED_GAME_KEY) === competitionId;
// };

// const useCompetitionStorage = () => {
//     const [refreshKey, setRefreshKey] = useState(0);

//     useEffect(() => {
//         const handleStorageChange = (e: StorageEvent) => {
//             if (e.key === ACTIVE_VALIDATED_GAME_KEY) {
//                 setRefreshKey(prev => prev + 1);
//             }
//         };
//         window.addEventListener('storage', handleStorageChange);
//         return () => window.removeEventListener('storage', handleStorageChange);
//     }, []);

//     const updateLocalCache = useCallback((competitionId: string) => {
//         localStorage.setItem(ACTIVE_VALIDATED_GAME_KEY, competitionId);
//         setRefreshKey(prev => prev + 1);
//     }, []);

//     const isCompetitionValidatedMemo = useCallback((competitionId: string) => {
//         return isCompetitionValidated(competitionId);
//     }, [refreshKey]);

//     return {
//         refreshKey,
//         updateLocalCache,
//         isCompetitionValidated: isCompetitionValidatedMemo,
//     };
// };

// const useCompetitionList = () => {
//     const { getAllCompetitions, gameConfig, competitionsVersion, afficheGame } = useDiambraStore();
//     const { refreshKey, isCompetitionValidated } = useCompetitionStorage();

//     // Re-calcul automatique dès que isGameFinished, competitionsVersion ou le storage change
//     return useMemo(() => {
//         const allCompetitions = getAllCompetitions();

//         return allCompetitions
//             .filter(comp => comp.idConfig === gameConfig?.id)
//             .map(comp => ({
//                 ...comp,
//                 displayName: `N°: ${comp.id.slice(-12)}`,
//                 isValidated: isCompetitionValidated(comp.id),
//             }))
//             .sort((a, b) => {
//                 if (a.isValidated !== b.isValidated) return a.isValidated ? -1 : 1;
//                 return new Date(b.datedebut).getTime() - new Date(a.datedebut).getTime();
//             });
//     }, [
//         getAllCompetitions,
//         gameConfig?.id,
//         refreshKey,
//         isCompetitionValidated,
//         competitionsVersion,
//         afficheGame // 🔥 Déclenche la mise à jour dès la fin d'un jeu
//     ]);
// };

// const REFETCH_INTERVAL = 1000;
// const DEBOUNCE_DELAY = 100;

// const useCompetitionPolling = (onRefresh: () => void) => {
//     const isRefreshingRef = useRef(false);
//     const timeoutRef = useRef<NodeJS.Timeout>();

//     const refreshData = useCallback(() => {
//         if (isRefreshingRef.current) return;
//         isRefreshingRef.current = true;

//         onRefresh();

//         timeoutRef.current = setTimeout(() => {
//             isRefreshingRef.current = false;
//         }, DEBOUNCE_DELAY);
//     }, [onRefresh]);

//     useEffect(() => {
//         const intervalId = setInterval(refreshData, REFETCH_INTERVAL);
//         return () => {
//             clearInterval(intervalId);
//             if (timeoutRef.current) {
//                 clearTimeout(timeoutRef.current);
//             }
//         };
//     }, [refreshData]);

//     return { refreshData };
// };

// export const useEndGameGenerator = () => {
//     const { refreshCompetitions } = useDiambraStore();
//     const { user } = useAuth();
//     const processedData = useMemo(() => processUserData(user), [user]);

//     const competitions = useCompetitionList();

//     const refreshData = useCallback(() => {
//         if (refreshCompetitions) {
//             refreshCompetitions();
//         }
//     }, [refreshCompetitions]);

//     useCompetitionPolling(refreshData);

//     const {
//         handleLoadMoreClick,
//         displayList, hasMore, remainingCount, isLoadingMore,
//     } = usePaginationWithLoadMore(competitions);

//     return {
//         handleLoadMoreClick, 
//         competitionList: displayList,
//         hasMore, 
//         remainingCount, 
//         isLoadingMore, 
//         user: processedData,
//     };
// };

// export default useEndGameGenerator;



'use client';

import { processUserData } from '@/lib/functions';
import { useAuth } from '@/lib/hooks';
import { useDiambraStore } from "@/lib/store/diambra.store";
import { useCallback, useEffect, useMemo, useState } from "react";
import usePaginationWithLoadMore from "./usePaginationWithLoadMore";

const ACTIVE_VALIDATED_GAME_KEY = 'active_validated_competition_id';

/**
 * Lit l'ID validé directement depuis localStorage (SSR-safe)
 */
const getActiveValidatedId = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACTIVE_VALIDATED_GAME_KEY);
};

/**
 * Hook pour synchroniser l'état du localStorage sans polling
 */
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

/**
 * Récupère et trie la liste des compétitions de manière réactive
 */
const useCompetitionList = () => {
  // Sélecteurs atomiques pour éviter les re-rendus inutiles liés au store Zustand
  const competitions = useDiambraStore((state) => state.competitions);
  const gameConfigId = useDiambraStore((state) => state.gameConfig?.id);
  const competitionsVersion = useDiambraStore((state) => state.competitionsVersion);
  const gameJustEnded = useDiambraStore((state) => state.gameJustEnded);
  const afficheGame = useDiambraStore((state) => state.afficheGame);

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
          displayName: `N°: ${comp.id.slice(-12)}`,
          isValidated,
          _timestamp: timestamp, // Mémoïsation pour le tri
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

  // Déclencheur manuel si nécessaire
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