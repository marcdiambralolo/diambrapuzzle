import { api } from '@/lib/api/client';
import { useQuery } from '@tanstack/react-query';

export interface Stats {
  subscribers: number;
  visits: number;
}

type StatsResponse = Partial<Stats>;

const STATS_STALE_TIME = 1000 * 60 * 5;  
const STATS_GC_TIME = 1000 * 60 * 30;   

async function fetchStats(): Promise<Stats> {
  const { data } = await api.post<StatsResponse>('/stats');

  if (!data) {
    throw new Error('Aucune donnée reçue');
  }

  return {
    subscribers: data.subscribers ?? 0,
    visits: data.visits ?? 0,
  };
}

export function useStatsDataWithCache() {
  const query = useQuery<Stats>({
    queryKey: ['stats'],
    queryFn: fetchStats,
    staleTime: STATS_STALE_TIME,
    gcTime: STATS_GC_TIME,
  });

  return {
    stats: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    error: query.error,
    refetch: query.refetch,
  };
}