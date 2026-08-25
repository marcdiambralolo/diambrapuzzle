"use client";
import Loader from "@/app/loading";
import { useConsultationsListPage } from "@/hooks/consultations/useConsultationsListPage";
import { memo } from "react";
import ErrorState from "./components/ErrorState";
import GamesTab from "./components/GamesTab";
import PageContainer from "./components/PageContainer";
import ProfileTab from "./components/ProfileTab";
import TabsNavigation from "./components/TabsNavigation";

function MonProfilPageClientImpl() {
  const {
    setActiveTab, getGamesCountByEdition,
    consultations, editions, loading, activeTab, processedData, fullName, dateNaissanceLabel,
  } = useConsultationsListPage();

  if (loading) return <Loader />;
  if (!processedData) return <ErrorState />;

  const isGamesTab = activeTab === 'games';

  return (
    <PageContainer>
      <TabsNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        editionsCount={editions.length}
      />

      {isGamesTab ? (
        <GamesTab
          editions={editions}
          getGamesCountByEdition={getGamesCountByEdition}
        />
      ) : (
        <ProfileTab
          fullName={fullName}
          dateNaissanceLabel={dateNaissanceLabel}
          consultations={consultations}
        />
      )}
    </PageContainer>
  );
}

const MonProfilPageClient = memo(MonProfilPageClientImpl);

export default MonProfilPageClient;