'use client';
import { Suspense } from 'react';
import { LoadingFallback } from '../ErrorBoundary/ErrorBoundary';

interface SecuredMainSuspenseProps {
  children: React.ReactNode;
}

export function SecuredMainSuspense({ children }: SecuredMainSuspenseProps) {

  return (
    <Suspense fallback={<LoadingFallback />}>
      {children}
    </Suspense>
  );
}