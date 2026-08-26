'use client';

import { CompetitionInfo, LearningConfiguration } from '@/lib/interfaces';
import { useDiambraStore } from '@/lib/store/diambra.store';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useRef, useTransition } from 'react'; 

export function useGameActions(gameConfig?: LearningConfiguration | null) {
  const [, startTransition] = useTransition();
  const hasRedirectedRef = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

  // Abonnements optimisés aux actions Zustand (stables entre les rendus)
  const {
    setGameIsFinished,
    setAfficheChoix,
    setAfficheGame,
    resetGameState,
    competitions,
  } = useDiambraStore();

  // Fonction de nettoyage simplifiée et stable (plus besoin d'écouter les valeurs d'état)
  const completeGameCleanup = useCallback(() => {
    setGameIsFinished(false);
    setAfficheChoix(false);
    setAfficheGame(false);
    resetGameState?.();
  }, [setGameIsFinished, setAfficheChoix, setAfficheGame, resetGameState]);

  /**
   * Navigue vers la page de jeu en forçant le rechargement si nécessaire
   */
  const navigateToGame = useCallback((path: string, configId: string) => {
    const targetPath = `${path}?puzzle=${configId}`;

    if (pathname === path) {
      router.replace(`${targetPath}&_t=${Date.now()}`);
    } else {
      router.push(targetPath);
    }
  }, [pathname, router]);

  const resetRedirectFlag = useCallback(() => {
    hasRedirectedRef.current = false;
  }, []);

  const demarrerJeu = useCallback(() => {
    if (hasRedirectedRef.current) return;

    const configId = gameConfig?._id || gameConfig?.id;
    if (!configId) return;

    hasRedirectedRef.current = true;

    const hasActiveCompetition = competitions.some(
      (competition: CompetitionInfo) => competition.idConfig === configId
    );

    startTransition(() => {
      if (!hasActiveCompetition) {
        setAfficheChoix(true);
        navigateToGame('/star/play', configId);
      } else {
        setAfficheGame(true);
        navigateToGame('/star/diambraplay', configId);
      }
    });

    // Libère automatiquement le verrou de redirection après 3 secondes
    setTimeout(resetRedirectFlag, 3000);
  }, [gameConfig, competitions, setAfficheChoix, setAfficheGame, navigateToGame, resetRedirectFlag]);

  const demarrerJeuInit = useCallback(() => {
    const configId = gameConfig?._id || gameConfig?.id;
    if (!configId) return;

    startTransition(() => {
      setAfficheChoix(true);
      navigateToGame('/star/play', configId);
    });
  }, [gameConfig, setAfficheChoix, navigateToGame]);

  return { completeGameCleanup, demarrerJeu, demarrerJeuInit, resetRedirectFlag };
}