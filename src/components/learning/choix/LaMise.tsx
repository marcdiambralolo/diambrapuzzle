'use client';
import Loader from '@/app/loading';
import ErrorMessage from '@/components/learning/commons/ErrorMessage';
import { useLaMise } from '@/hooks/learning/lamise/useLaMise';
import { memo } from 'react';
import { MarketButton, PlayButton } from './lamise/ActionButtons';
import { StatusBanner } from './lamise/StatusBanner';
import { TokenCard } from './lamise/TokenCard';

const LaMise = () => {
  const {
    handlePlayClick, handleMarketClick,
    isSufficient, loading, requiredQuantity, error, availableQuantity, cardClasses,
  } = useLaMise();

  if (error) return <ErrorMessage />;

  if (loading) return <Loader />;

  return (
    <div className="w-full mx-auto max-w-md px-2 flex flex-col gap-4 items-center justify-center">
      <StatusBanner
        isSufficient={isSufficient}
        requiredQuantity={requiredQuantity}
        availableQuantity={availableQuantity}
      />

      <TokenCard
        isSufficient={isSufficient}
        requiredQuantity={requiredQuantity}
        availableQuantity={availableQuantity}
        cardClasses={cardClasses}
        onPlayClick={handlePlayClick}
        isPending={loading}
      />

      {!isSufficient && (
        <div className="w-full my-1 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 text-center">
          <p className="text-base text-red-700 dark:text-red-400 font-medium">
            ⚠️ Vous ne disposez pas d&apos;assez de jetons pour jouer.
          </p>
          <p className="text-sm text-red-600/70 dark:text-red-400/60 mt-1">
            Acquérez des jetons en cliquant sur le bouton ci-dessous pour continuer.
          </p>
        </div>
      )}

      {isSufficient && (
        <div className="w-full mt-1">
          <PlayButton
            isSufficient={isSufficient}
            onClick={handlePlayClick}
            isPending={loading}
          />
        </div>
      )}

      <div className="w-full">
        <MarketButton
          onClick={handleMarketClick}
          isPending={loading}
        />
      </div>

      <div className="flex items-center gap-2 mt-2">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      </div>
    </div>
  );
};

export default memo(LaMise);