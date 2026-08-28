'use client';

import { createCategoryConsultationLearning, getCategoryErrorMessage } from '@/hooks/categorie/categoryConsultation.shared';
import { walletService } from '@/lib/api/services/wallet.service';
import { QUERY_KEYS, queryClient } from '@/lib/cache/queryClient';
import type { OfferingAlternative, WalletOffering } from '@/lib/interfaces';
import { MISE_INITIALE } from '@/lib/learning/constantes';
import { useDiambraStore } from '@/lib/store/diambra.store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useTransition } from 'react';

const BASE_CLASSES =
    'group relative w-full overflow-hidden rounded-2xl border p-2 text-left transition-all duration-300 flex items-center gap-4';
const INSUFFICIENT_CLASSES =
    'cursor-not-allowed border-gray-200 bg-gray-50 opacity-60 dark:border-gray-700 dark:bg-gray-800/50';
const SUFFICIENT_CLASSES =
    'cursor-pointer border-gray-200 bg-white hover:border-[#9BC2FF] hover:shadow-xl hover:shadow-[#4F83D1]/10 active:scale-[0.98] dark:border-gray-700 dark:bg-gray-800';

const REQUIRED_QUANTITY = MISE_INITIALE.quantity;

function getOfferingId(alternative: OfferingAlternative): string {
    const offeringId = alternative.offeringId;
    if (offeringId && typeof offeringId === 'object' && '_id' in offeringId) {
        return String((offeringId as { _id: string })._id);
    }
    return String(offeringId ?? '');
}

const CONFIG_OFFERING_ID = getOfferingId(MISE_INITIALE);

async function getAvailableQuantity(): Promise<number> {
    const offerings = await walletService.getUnusedWalletOfferings();
    const targetOffering = offerings?.find(
        (walletOffering: WalletOffering) => walletOffering.offeringId === CONFIG_OFFERING_ID
    );
    return targetOffering?.quantity ?? 0;
}

export function useLaMise() {
    const router = useRouter();
    const [isPendingNavigation, startNavigationTransition] = useTransition();

    const gameConfig = useDiambraStore((state) => state.gameConfig);
    const setAfficheGame = useDiambraStore((state) => state.setAfficheGame);
    const setIdEditionencours = useDiambraStore((state) => state.setIdEditionencours);
    const setCurrentConsultationId = useDiambraStore((state) => state.setCurrentConsultationId);
    const resetGameSequenceCounter = useDiambraStore((state) => state.resetGameSequenceCounter);

    const monidjeu = gameConfig?._id ?? gameConfig?.id ?? '';

    const isMountedRef = useRef(false);
    useEffect(() => {
        if (!isMountedRef.current) {
            setAfficheGame(false);
            isMountedRef.current = true;
        }
    }, [setAfficheGame]);

    const {
        data: availableQuantity = 0,
        isLoading: isWalletLoading,
        isFetching: isWalletFetching,
    } = useQuery<number>({
        queryKey: [QUERY_KEYS.WALLET_UNUSED_OFFERINGS, CONFIG_OFFERING_ID],
        queryFn: getAvailableQuantity,
        enabled: Boolean(monidjeu),
        retry: 2,
        staleTime: 1000 * 60,
    });

    const isSufficient = availableQuantity >= REQUIRED_QUANTITY;

    const cardClasses = useMemo(
        () => `${BASE_CLASSES} ${isSufficient ? SUFFICIENT_CLASSES : INSUFFICIENT_CLASSES}`,
        [isSufficient]
    );

    const submitMutation = useMutation<string, Error>({
        mutationFn: async () => {
            if (!monidjeu) throw new Error('Identifiant du jeu introuvable');

            const consultationId = await createCategoryConsultationLearning(monidjeu);
            if (!consultationId) throw new Error('Impossible de créer la compétition');

            const consumeRes = await walletService.validateConsultationOfferings(consultationId, [
                {
                    offeringId: CONFIG_OFFERING_ID,
                    quantity: REQUIRED_QUANTITY,
                },
            ]);

            if (!consumeRes.success) {
                throw new Error(consumeRes.message || 'Erreur lors de la consommation du jeton');
            }

            return consultationId;
        },
        retry: 1,
        onSuccess: (consultationId) => {
            setAfficheGame(true);
            resetGameSequenceCounter();
            setCurrentConsultationId(consultationId);
            setIdEditionencours(gameConfig?._id ?? gameConfig?.id ?? '');
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WALLET_TRANSACTIONS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WALLET_UNUSED_OFFERINGS] });

            startNavigationTransition(() => {
                router.push(`/star/diambraplay?monjeu=${monidjeu}`);
            });
        },
    });

    const { mutate, isPending: isMutationPending, error: mutationError } = submitMutation;

    const handlePlayClick = useCallback(() => {
        if (!monidjeu || !isSufficient || isMutationPending || isPendingNavigation) return;

        mutate(undefined, {
            onError: (err) => console.error('Submission processing failed:', err),
        });
    }, [monidjeu, isSufficient, isMutationPending, isPendingNavigation, mutate]);

    const handleMarketClick = useCallback(() => {
        if (!monidjeu || isPendingNavigation) return;

        startNavigationTransition(() => {
            router.push(`/star/marcheoffrandes?retour=learning&monjeu=${monidjeu}`);
        });
    }, [router, monidjeu, isPendingNavigation]);

    const error = useMemo(() => {
        if (!mutationError) return null;
        return getCategoryErrorMessage(mutationError, 'Erreur inconnue');
    }, [mutationError]);

    const loading = isWalletLoading || isWalletFetching || isMutationPending || isPendingNavigation;

    return {
        handlePlayClick,
        handleMarketClick,
        isSufficient,
        loading,
        requiredQuantity: REQUIRED_QUANTITY,
        error,
        availableQuantity,
        cardClasses,
    };
}