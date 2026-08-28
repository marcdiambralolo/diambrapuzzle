'use client';
import { api } from '@/lib/api/client';
import { AdminConsultationsResponse } from '@/lib/interfaces';
import { useQuery } from '@tanstack/react-query';

export const ITEMS_PER_PAGE = 10000;

const FETCH_QUERY_KEY = ['admin', 'consultations', 'ended-learning', ITEMS_PER_PAGE];

async function fetchEndedLearningConsultations(): Promise<AdminConsultationsResponse> {
  const { data } = await api.get<AdminConsultationsResponse>('/consultations/ended-learning', {
    params: { page: 1, limit: ITEMS_PER_PAGE },
  });

  return {
    consultations: data?.consultations ?? [],
    activeEdition: data?.activeEdition ?? null,
  };
}

export function useAdminConsultationsPageFinished() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: FETCH_QUERY_KEY,
    queryFn: fetchEndedLearningConsultations,
    staleTime: 1000 * 60 * 10,
  });

  return {
    consultations: data?.consultations ?? [],
    activeEdition: data?.activeEdition ?? null,
    loading: isLoading,
    error: error ? (error as Error).message || 'Erreur lors du chargement' : null,
    refetch,
  };
}