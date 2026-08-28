import { Consultation } from "@/lib/interfaces";
import { extractSecondsFromTimeSpent } from "@/lib/learning/functions";
import { DuplicateInfo } from "@/lib/learning/interface";
import { useMemo } from "react";

const TIME_CACHE_MAX_SIZE = 1000;
const timeCache = new Map<string, number>();

export const getCachedTime = (timeSpent: string | undefined): number => {
  if (!timeSpent) return 0;

  const cached = timeCache.get(timeSpent);
  if (cached !== undefined) return cached;

  if (timeCache.size >= TIME_CACHE_MAX_SIZE) {
    const firstKey = timeCache.keys().next().value;
    if (firstKey) timeCache.delete(firstKey);
  }

  const seconds = extractSecondsFromTimeSpent(timeSpent);
  timeCache.set(timeSpent, seconds);
  return seconds;
};

export function useConsultationDuplicates(rawConsultations: Consultation[] = []) {
  return useMemo(() => {
    if (!rawConsultations.length) {
      return {
        sortedConsultations: [],
        duplicateMap: new Map<string, DuplicateInfo>(),
      };
    }

    const duplicateMap = new Map<string, DuplicateInfo>();

    for (let i = 0; i < rawConsultations.length; i++) {
      const consultation = rawConsultations[i];
      const comb = consultation.timeSpent || "0";
      const seconds = getCachedTime(consultation.timeSpent);

      const existing = duplicateMap.get(comb);
      if (existing) {
        existing.count += 1;
        existing.totalTimeSpent += seconds;
        existing.isDuplicate = true;
      } else {
        duplicateMap.set(comb, {
          count: 1,
          isDuplicate: false,
          totalTimeSpent: seconds,
        });
      }
    }

    const sortedConsultations = [...rawConsultations].sort(
      (a, b) => getCachedTime(b.timeSpent) - getCachedTime(a.timeSpent)
    );

    return { sortedConsultations, duplicateMap };
  }, [rawConsultations]);
}