"use client";
import Loader from "@/app/loading";
import { useWalletPageWithCache } from "@/hooks/cache/useWalletPageWithCache";
import BottomCtas from "./components/BottomCtas";
import OfferingsTab from "./components/OfferingsTab";
import PageContainer from "./components/PageContainer";
import TransactionsTab from "./components/TransactionsTab";
import WalletTabs from "./components/WalletTabs";

export default function WalletPageContent() {
  const {
    setSortOrder, onRefresh, setActiveTab,
    unusedError, isLoading, unusedOfferings, stats, sortOrder,
    filteredTransactions, backLink: { href, label }, activeTab, isRefreshing,
  } = useWalletPageWithCache();

  if (isLoading) return <Loader />;

  const isTransactionsTab = activeTab === "transactions";

  return (
    <PageContainer>
      <WalletTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {isTransactionsTab ? (
        <TransactionsTab
          stats={stats}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          onRefresh={onRefresh}
          isRefreshing={isRefreshing}
          filteredTransactions={filteredTransactions}
        />
      ) : (
        <OfferingsTab
          unusedError={unusedError}
          unusedOfferings={unusedOfferings}
        />
      )}

      <BottomCtas href={href} label={label} />
    </PageContainer>
  );
}