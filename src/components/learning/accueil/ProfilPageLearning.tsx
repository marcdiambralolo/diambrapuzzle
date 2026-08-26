'use client';
import { memo } from 'react';
import HorlogeInit from '../home/accueil/HorlogeInit';
import HelpButton from './components/HelpButton';
import PageContainer from './components/PageContainer';
import ResultsSection from './components/ResultsSection';

const ProfilPageLearning = memo(() => {
  return (
    <PageContainer>
      <HorlogeInit />
      <ResultsSection />
      <HelpButton />
    </PageContainer>
  );
});

export default ProfilPageLearning;