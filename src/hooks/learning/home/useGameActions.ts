import { useDiambraStore } from '@/lib/store/diambra.store';
import { CompetitionInfo } from '@/lib/interfaces';
import { useCallback, useRef, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export function useGameActions(gameConfig: any) {
  const [, startTransition] = useTransition();
  const hasRedirectedRef = useRef(false);
  const router = useRouter();

  const {
    gameIsFinished, afficheChoix, afficheGame, competitions,
    setGameIsFinished, setAfficheChoix, setAfficheGame, resetGameState,
  } = useDiambraStore();

  const completeGameCleanup = useCallback(() => {
    if (gameIsFinished) setGameIsFinished(false);
    if (afficheChoix) setAfficheChoix(false);
    if (afficheGame) setAfficheGame(false);
    if (resetGameState) resetGameState();
  }, [gameIsFinished, afficheChoix, afficheGame, setGameIsFinished, setAfficheChoix, setAfficheGame, resetGameState]);

  const demarrerJeu = useCallback(() => {
    if (hasRedirectedRef.current) return;
    const configId = gameConfig?._id || gameConfig?.id;
    const hasActiveCompetition = competitions.some(
      (competition: CompetitionInfo) => competition.idConfig === configId
    );

    hasRedirectedRef.current = true;

    startTransition(() => {
      if (!hasActiveCompetition) {
        setAfficheChoix(true);
        router.push(`/star/play/?puzzle=${configId}`);
      } else {
        setAfficheGame(true);
      }
    });
  }, [gameConfig, competitions, setAfficheChoix, setAfficheGame]);

  const demarrerJeuInit = useCallback(() => {
    const configId = gameConfig?._id || gameConfig?.id;
    startTransition(() => {
      setAfficheChoix(true);
      router.push(`/star/play/?puzzle=${configId}`);
    });
  }, [gameConfig, setAfficheChoix,]);

  return { completeGameCleanup, demarrerJeu, demarrerJeuInit };
}