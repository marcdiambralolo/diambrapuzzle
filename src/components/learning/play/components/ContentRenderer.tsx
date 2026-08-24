'use client';
import { memo } from 'react';
import LaMise from '../../choix/LaMise';
import TheGame from '../../startgame/ProfilPageLearning';

interface ContentRendererProps {
    showChoix: boolean;
    showGame: boolean;
}

const ContentRenderer = memo(({ showChoix, showGame }: ContentRendererProps) => {
    if (showChoix) return <LaMise />;
    if (showGame) return <TheGame />;

    return null;
});

export default ContentRenderer;