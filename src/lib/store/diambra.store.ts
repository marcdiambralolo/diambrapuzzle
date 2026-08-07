import { CompetitionInfo, LearningConfiguration, MatchInfo } from '@/lib/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MAX_COMPETITIONS = 10;
const STORAGE_NAME = 'diambra-store';

interface StoredMatchInfo {
  id?: string;
  tpsglobal?: number;
  trouves?: number;
  rates?: number;
  isgameover?: boolean;
  timeSpent?: number;
  matchNumber?: number;
  niveau?: number;
  numeromatch?: string;
  datedebut?: string | null;
  datefin?: string | null;
  combinaisons?: string[];
  score?: number;
  numordrep?: number;
  entite?: number;
}

interface StoredCompetition {
  id: string;
  datedebut: string;
  datefin: string;
  idConfig: string;
  consultationId: string;
  timeSpent: number;
  displayName?: string;
  isValidated?: boolean;
  niveau?: number;
  matchInfo: StoredMatchInfo[];
  punChangeCount?: number;
}

interface MonEtoileStore {
  // État
  gameConfig: LearningConfiguration | null;
  currentMatchInfo: MatchInfo[];
  competitions: CompetitionInfo[];
  competitionsVersion: number;
  currentConsultationId: string | null;
  gameStarted: boolean;
  jeuAcommencer: boolean;
  afficheaide: boolean;
  jeuenattente: boolean;
  lejeu: boolean;
  lamise: boolean;
  afficheBanana: boolean;
  afficheStat: boolean;
  afficheChoix: boolean;
  afficheGame: boolean;
  gameIsFinished: boolean;
  gameJustEnded: boolean;

  // Actions - Configuration
  setGameConfig: (config: LearningConfiguration | null) => void;
  resetGameConfig: () => void;

  // Actions - Matchs
  setCurrentMatchInfo: (matches: MatchInfo[]) => void;
  appendMatchInfo: (match: MatchInfo) => void;
  updateMatchInfo: (index: number, match: Partial<MatchInfo>) => void;
  clearCurrentMatchInfo: () => void;
  getCurrentMatchByType: (tpsglobal: number) => MatchInfo | undefined;

  // Actions - Compétitions
  addCompetition: (competition: CompetitionInfo) => void;
  getCompetitionById: (id: string) => CompetitionInfo | undefined;
  removeCompetitionById: (id: string) => boolean;
  getAllCompetitions: () => CompetitionInfo[];
  getLatestCompetitions: (limit?: number) => CompetitionInfo[];
  addMultipleCompetitions: (newCompetitions: CompetitionInfo[]) => void;
  refreshCompetitions: () => void;
  updateCompetitionValidation: (id: string, isValidated: boolean) => void;

  // Actions - Fin de partie
  notifyGameEnd: () => void;
  resetGameJustEnded: () => void;

  // Actions - UI
  setAfficheBanana: (value: boolean) => void;
  setAfficheStat: (value: boolean) => void;
  setAfficheGame: (value: boolean) => void;
  setAfficheChoix: (value: boolean) => void;
  setGameIsFinished: (value: boolean) => void;
  setJeuAcommencer: (value: boolean) => void;
  setJeuenattente: (value: boolean) => void;
  setLejeu: (value: boolean) => void;
  setLamise: (value: boolean) => void;
  setAfficheAide: (value: boolean) => void;
  setGameStarted: (value: boolean) => void;
  setCurrentConsultationId: (id: string | null) => void;
  resetGameState: () => void;
  resetAll: () => void;
}

// Helpers
const sortByDateDesc = (a: CompetitionInfo, b: CompetitionInfo): number => {
  return new Date(b.datedebut).getTime() - new Date(a.datedebut).getTime();
};

const enforceMaxLimit = (competitions: CompetitionInfo[]): CompetitionInfo[] => {
  if (competitions.length <= MAX_COMPETITIONS) return competitions;
  return [...competitions].sort(sortByDateDesc).slice(0, MAX_COMPETITIONS);
};

const compressCompetition = (competition: CompetitionInfo): StoredCompetition => ({
  id: competition.id,
  datedebut: competition.datedebut,
  datefin: competition.datefin,
  idConfig: competition.idConfig,
  consultationId: competition.consultationId,
  timeSpent: competition.timeSpent || 0,
  displayName: competition.displayName,
  isValidated: competition.isValidated,
  niveau: competition.niveau,
  punChangeCount: competition.punChangeCount || 1,
  matchInfo: (competition.matchInfo || []).map((match) => ({
    id: match.id,
    tpsglobal: match.tpsglobal,
    trouves: match.trouves,
    rates: match.rates,
    isgameover: match.isgameover,
    timeSpent: match.timeSpent,
    matchNumber: match.matchNumber,
    niveau: match.niveau,
    numeromatch: match.numeromatch,
    datedebut: match.datedebut,
    datefin: match.datefin,
    score: match.score,
    numordrep: match.numordrep,
    entite: match.entite,
  })),
});

const decompressCompetition = (stored: StoredCompetition): CompetitionInfo => ({
  id: stored.id,
  datedebut: stored.datedebut,
  datefin: stored.datefin,
  idConfig: stored.idConfig,
  consultationId: stored.consultationId,
  timeSpent: stored.timeSpent,
  displayName: stored.displayName || `N°: ${stored.id.slice(-12)}`,
  isValidated: stored.isValidated || false,
  niveau: stored.niveau,
  punChangeCount: stored.punChangeCount || 0,
  matchInfo: (stored.matchInfo || []).map((match) => ({
    id: match.id,
    tpsglobal: match.tpsglobal,
    trouves: match.trouves || 0,
    rates: match.rates || 0,
    isgameover: match.isgameover || false,
    timeSpent: match.timeSpent,
    matchNumber: match.matchNumber || 0,
    score: match.score || 0,
    niveau: match.niveau,
    numeromatch: match.numeromatch || '',
    datedebut: match.datedebut || null,
    datefin: match.datefin || null,
    combinaisons: match.combinaisons || [],
    numordrep: match.numordrep || 0,
    entite: match.entite || 0,
  })),
});

const INITIAL_STATE = {
  gameConfig: null,
  currentMatchInfo: [] as MatchInfo[],
  competitions: [] as CompetitionInfo[],
  competitionsVersion: 0,
  currentConsultationId: null,
  gameStarted: false,
  jeuAcommencer: false,
  afficheaide: false,
  jeuenattente: true,
  lejeu: false,
  lamise: false,
  afficheBanana: false,
  afficheStat: false,
  gameIsFinished: false,
  afficheChoix: false,
  afficheGame: false,
  gameJustEnded: false,
};

export const useDiambraStore = create<MonEtoileStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      // Configuration
      setGameConfig: (config) => set({ gameConfig: config }),
      resetGameConfig: () => set({ gameConfig: null }),

      // Matchs
      setCurrentMatchInfo: (matches) => set({ currentMatchInfo: matches }),
      appendMatchInfo: (match) =>
        set((state) => ({ currentMatchInfo: [...state.currentMatchInfo, match] })),
      updateMatchInfo: (index, updatedMatch) =>
        set((state) => {
          const newMatches = [...state.currentMatchInfo];
          if (index >= 0 && index < newMatches.length) {
            newMatches[index] = { ...newMatches[index], ...updatedMatch };
          }
          return { currentMatchInfo: newMatches };
        }),
      clearCurrentMatchInfo: () => set({ currentMatchInfo: [] }),
      getCurrentMatchByType: (tpsglobal) =>
        get().currentMatchInfo.find((match) => match.tpsglobal === tpsglobal),

      // Compétitions
      addCompetition: (competition) =>
        set((state) => {
          if (state.competitions.some((c) => c.id === competition.id)) {
            return state;
          }
          const newCompetitions = enforceMaxLimit([competition, ...state.competitions]);
          return {
            competitions: newCompetitions,
            competitionsVersion: state.competitionsVersion + 1,
          };
        }),

      getCompetitionById: (id) => get().competitions.find((c) => c.id === id),

      removeCompetitionById: (id) => {
        let removed = false;
        set((state) => {
          const newCompetitions = state.competitions.filter((c) => c.id !== id);
          removed = newCompetitions.length !== state.competitions.length;
          return {
            competitions: newCompetitions,
            competitionsVersion: state.competitionsVersion + 1,
          };
        });
        return removed;
      },

      getAllCompetitions: () => get().competitions,

      getLatestCompetitions: (limit = MAX_COMPETITIONS) =>
        [...get().competitions].sort(sortByDateDesc).slice(0, limit),

      addMultipleCompetitions: (newCompetitions) =>
        set((state) => {
          const existingIds = new Set(state.competitions.map((c) => c.id));
          const uniqueNew = newCompetitions.filter((c) => !existingIds.has(c.id));
          const allCompetitions = enforceMaxLimit([...uniqueNew, ...state.competitions]);
          return {
            competitions: allCompetitions,
            competitionsVersion: state.competitionsVersion + 1,
          };
        }),

      refreshCompetitions: () =>
        set((state) => ({ competitionsVersion: state.competitionsVersion + 1 })),

      updateCompetitionValidation: (id, isValidated) =>
        set((state) => ({
          competitions: state.competitions.map((comp) =>
            comp.id === id ? { ...comp, isValidated } : comp
          ),
          competitionsVersion: state.competitionsVersion + 1,
        })),

      // Fin de partie
      notifyGameEnd: () => {
        set({ gameJustEnded: true });
        get().refreshCompetitions();
        setTimeout(() => set({ gameJustEnded: false }), 500);
      },

      resetGameJustEnded: () => set({ gameJustEnded: false }),

      // UI Actions
      setAfficheBanana: (value) => set({ afficheBanana: value }),
      setAfficheStat: (value) => set({ afficheStat: value }),
      setAfficheChoix: (value) => set({ afficheChoix: value }),
      setGameIsFinished: (value) => set({ gameIsFinished: value }),
      setJeuAcommencer: (value) => set({ jeuAcommencer: value }),
      setJeuenattente: (value) => set({ jeuenattente: value }),
      setLejeu: (value) => set({ lejeu: value }),
      setLamise: (value) => set({ lamise: value }),
      setAfficheAide: (value) => set({ afficheaide: value }),
      setGameStarted: (value) => set({ gameStarted: value }),
      setAfficheGame: (value) => {
        const previousAfficheGame = get().afficheGame;
        set({ afficheGame: value });

        // Si le jeu vient de se fermer et qu'il était terminé
        if (previousAfficheGame && !value && get().gameIsFinished) {
          get().notifyGameEnd();
        }
      },
      setCurrentConsultationId: (id) => set({ currentConsultationId: id }),

      resetGameState: () =>
        set({
          gameStarted: false,
          jeuAcommencer: false,
          lejeu: false,
          lamise: false,
          currentMatchInfo: [],
          gameJustEnded: false,
        }),

      resetAll: () =>
        set({
          ...INITIAL_STATE,
          competitions: [],
          competitionsVersion: 0,
          currentMatchInfo: [],
          gameJustEnded: false,
        }),
    }),
    {
      name: STORAGE_NAME,
      partialize: (state) => ({
        gameConfig: state.gameConfig,
        competitions: state.competitions.map(compressCompetition),
        afficheBanana: state.afficheBanana,
        afficheStat: state.afficheStat,
        gameIsFinished: state.gameIsFinished,
        currentConsultationId: state.currentConsultationId,
      }),
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.competitions)) {
          try {
            state.competitions = enforceMaxLimit(
              (state.competitions as unknown as StoredCompetition[]).map(decompressCompetition)
            );
            state.competitionsVersion = Date.now();
          } catch (error) {
            console.error('Error decompressing competitions:', error);
            state.competitions = [];
          }
        }
        if (state) {
          state.currentMatchInfo = state.currentMatchInfo || [];
          state.gameJustEnded = false;
        }
      },
    }
  )
);