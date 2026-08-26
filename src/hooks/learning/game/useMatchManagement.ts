'use client';

import { CompetitionInfo, MatchInfo } from '@/lib/interfaces';
import { decoupelimage } from "@/lib/learning/functions";
import { GameState } from '@/lib/learning/interface';
import { createInitialCases, createMatch, createPlayableCases, getTotalCases, shuffleArray } from "@/lib/learning/services/game.service";
import { useDiambraStore } from "@/lib/store/diambra.store";
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTimer } from './useTimer';

const TRANSITION_DELAY = 100;
const DEFAULT_IMAGE_PATH = "/ephotosept.jpg";
const DEFAULT_MATCH_NUM = 123456789;
const TOTAL_ORDERS = 24;

const SIMPLE_A = 9301;
const SIMPLE_C = 49297;
const SIMPLE_M = 233280;

// Mélange LCG pour mélanger la séquence globale 0..23
const shuffleWithSeed = <T,>(array: T[], seed: number): T[] => {
    const result = [...array];
    let currentSeed = seed;

    for (let i = result.length - 1; i > 0; i--) {
        currentSeed = (currentSeed * SIMPLE_A + SIMPLE_C) % SIMPLE_M;
        const randomIndex = Math.floor((currentSeed / SIMPLE_M) * (i + 1));
        [result[i], result[randomIndex]] = [result[randomIndex], result[i]];
    }

    return result;
};

/**
 * Génère de manière déterministe et exacte la k-ième permutation de [0, 1, 2, 3].
 * Pour k variant de 0 à 23, les 24 ordres générés sont TOUS différents.
 */
const getPermutation4 = (k: number): number[] => {
    const items = [0, 1, 2, 3];
    const result: number[] = [];
    let index = ((k % TOTAL_ORDERS) + TOTAL_ORDERS) % TOTAL_ORDERS;

    const factorials = [6, 2, 1, 1]; // Poids factoriels : 3!, 2!, 1!, 0!
    for (let i = 0; i < 4; i++) {
        const pos = Math.floor(index / factorials[i]);
        result.push(items.splice(pos, 1)[0]);
        index %= factorials[i];
    }

    return result;
};

const getMatchNumber = (numeromatch?: string | number): number => {
    if (typeof numeromatch === 'string') {
        return parseInt(numeromatch, 10) || DEFAULT_MATCH_NUM;
    }
    return numeromatch || DEFAULT_MATCH_NUM;
};

const useMatchManagement = (
    state: GameState,
    setState: React.Dispatch<React.SetStateAction<GameState>>,
    updateState: (updates: Partial<GameState>) => void
) => {
    const {
        gameConfig,
        addCompetition,
        setAfficheGame,
        currentConsultationId,
        gameSequenceCounter,
        incrementGameSequenceCounter,
    } = useDiambraStore();

    const timeElapsed = useTimer(state.start);
    const lancementRef = useRef(false);
    const isLoadingMatch = useRef(false);

    // Mélange des indices de 0 à 23 selon le numeromatch
    const pseudoRandomSequence = useMemo(() => {
        const matchNumber = getMatchNumber(gameConfig?.numeromatch);
        const baseSequence = Array.from({ length: TOTAL_ORDERS }, (_, i) => i);
        return shuffleWithSeed(baseSequence, matchNumber);
    }, [gameConfig?.numeromatch]);

    // Sélectionne l'index d'ordre courant (0 à 23)
    const currentOrderValue = useMemo(() => {
        const index = gameSequenceCounter % TOTAL_ORDERS;
        return pseudoRandomSequence[index];
    }, [gameSequenceCounter, pseudoRandomSequence]);

    // Génère l'ordre des 4 matchs (permutation garantie unique)
    const matchOrder = useMemo(() => {
        return getPermutation4(currentOrderValue);
    }, [currentOrderValue]);

    const chargerMatch = useCallback((matchData: MatchInfo) => {
        if (!matchData) return;
        updateState({
            tpsglobal: matchData.tpsglobal ?? 0,
            casesdujeuencours: matchData.listeCaseOpLab ?? [],
            casesinitiales: matchData.listeCaseOpLabInitiale ?? [],
            pieces: matchData.pieces ?? [],
            selectedCase: null,
            showPun: true,
        });
    }, [updateState]);

    const generateMatchList = useCallback((): MatchInfo[] => {
        const matchId = String(gameConfig?.numeromatch || DEFAULT_MATCH_NUM);
        return matchOrder.map((type, index) => createMatch(index, type, matchId));
    }, [gameConfig?.numeromatch, matchOrder]);

    const loadMatch = useCallback((match: MatchInfo, niveau: number, piecesImages: string[]): MatchInfo => {
        const totalCases = getTotalCases(match.tpsglobal ?? 0, niveau);
        const gridSize = niveau * niveau;
        const seed = getMatchNumber(match.numeromatch) + 7;

        let availableCases = Array.from({ length: totalCases }, (_, i) => i.toString());

        if (match.tpsglobal !== 2) {
            availableCases = shuffleArray(availableCases, seed);
        }

        const selectedCases = availableCases.slice(0, gridSize);
        const shuffledCases = shuffleArray([...selectedCases], seed);

        return {
            ...match,
            listeCaseOpLab: createPlayableCases(shuffledCases, selectedCases, match),
            listeCaseOpLabInitiale: createInitialCases(selectedCases, match),
            pieces: piecesImages,
        };
    }, []);

    const allMatchesFinished = useMemo(() =>
        state.infomatch.length > 0 && state.infomatch.every(m => m.isgameover),
        [state.infomatch]
    );

    const saveFinalResults = useCallback(() => {
        if (!allMatchesFinished || !gameConfig?.id) return;

        const dateFin = new Date();
        const dateDebut = state.datedebut ? new Date(state.datedebut) : dateFin;
        const totalDurationSeconds = Math.max(0, Math.round((dateFin.getTime() - dateDebut.getTime()) / 1000));
        const competitionId = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

        const competition: CompetitionInfo = {
            id: competitionId,
            matchInfo: state.infomatch,
            datedebut: state.datedebut,
            idConfig: gameConfig.id,
            datefin: dateFin.toISOString(),
            consultationId: currentConsultationId || '',
            timeSpent: totalDurationSeconds,
            name: gameConfig.id,
            displayName: gameConfig.id,
            niveau: gameConfig.niveau,
            punChangeCount: state.punChangeCount,
        };

        addCompetition(competition);
    }, [allMatchesFinished, state.infomatch, state.datedebut, state.punChangeCount, gameConfig, addCompetition, currentConsultationId]);

    // Initialisation du jeu
    useEffect(() => {
        if (lancementRef.current) return;
        lancementRef.current = true;

        const lancerJeu = async () => {
            const niveau = gameConfig?.niveau ?? 3;
            updateState({ start: false, isTransitioning: false });

            try {
                const matchList = generateMatchList();
                const piecesImages: string[] = await decoupelimage(DEFAULT_IMAGE_PATH, niveau);
                const updatedMatches = matchList.map(match => loadMatch(match, niveau, piecesImages));

                updateState({
                    infomatch: updatedMatches,
                    datedebut: new Date().toISOString(),
                    matchEnCours: 0,
                });

                if (updatedMatches[0]) chargerMatch(updatedMatches[0]);
            } catch (error) {
                console.error("Erreur lors du lancement du jeu:", error);
            } finally {
                lancementRef.current = false;
            }
        };

        lancerJeu();
    }, [gameConfig?.niveau, generateMatchList, loadMatch, chargerMatch, updateState]);

    // Changement de match au sein d'une session
    useEffect(() => {
        const { matchEnCours, infomatch } = state;
        if (matchEnCours === -1 || !infomatch[matchEnCours] || isLoadingMatch.current) return;

        isLoadingMatch.current = true;
        chargerMatch(infomatch[matchEnCours]);

        const timer = setTimeout(() => {
            isLoadingMatch.current = false;
            updateState({ isTransitioning: false });
        }, TRANSITION_DELAY);

        return () => clearTimeout(timer);
    }, [state.matchEnCours, state.infomatch, chargerMatch, updateState]);

    // Vérification des conditions de victoire sur le match en cours
    useEffect(() => {
        const { casesdujeuencours, isTransitioning, matchEnCours, infomatch } = state;
        if (casesdujeuencours.length === 0 || isTransitioning) return;
        if (!casesdujeuencours.every(c => c.isLocked)) return;

        updateState({ isTransitioning: true });

        setState(prev => ({
            ...prev,
            infomatch: prev.infomatch.map((m, idx) =>
                idx === matchEnCours
                    ? { ...m, isgameover: true, trouves: (m.trouves || 0) + prev.casesdujeuencours.length }
                    : m
            ),
        }));

        if (matchEnCours + 1 < infomatch.length) {
            updateState({ matchEnCours: matchEnCours + 1, showPun: false, selectedCase: null });
        }
    }, [state.casesdujeuencours, state.isTransitioning, state.matchEnCours, state.infomatch.length, updateState, setState]);

    // Sauvegarde et clôture globale
    useEffect(() => {
        if (allMatchesFinished && state.infomatch.length > 0 && !state.isGameover) {
            updateState({ isGameover: true });
            saveFinalResults();
            setAfficheGame(false);
            incrementGameSequenceCounter();
        }
    }, [allMatchesFinished, state.infomatch.length, state.isGameover, saveFinalResults, setAfficheGame, incrementGameSequenceCounter, updateState]);

    return { chargerMatch, timeElapsed, allMatchesFinished };
};

export default useMatchManagement;