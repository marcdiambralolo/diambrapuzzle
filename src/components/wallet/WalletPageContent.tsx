"use client";
import Loader from "@/app/loading";
import { useWalletPageWithCache } from "@/hooks/cache/useWalletPageWithCache";
import { staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { ShoppingBag, TrendingUp } from "lucide-react";
import BottomCtas from "./components/BottomCtas";
import StatsCard from "./components/StatsCard";
import TransactionCard from "./components/TransactionCard";
import TransactionEmptyState from "./components/TransactionEmptyState";
import TransactionsToolbar from "./components/TransactionsToolbar";
import UnusedOfferingsSection from "./components/UnusedOfferingsSection";
import WalletTabs from "./components/WalletTabs";

export default function WalletPageContent() {
  const {
    setSortOrder, onRefresh, setActiveTab,
    unusedError, isLoading, unusedOfferings, stats, sortOrder, filteredTransactions,
    backLink: { href, label }, activeTab, isRefreshing,
  } = useWalletPageWithCache();

  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-8 sm:px-6 sm:py-12">
      <WalletTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "transactions" ? (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-5"
        >
          <div className="flex gap-4">
            <StatsCard
              label="transactions"
              value={stats.totalTransactions}
              icon={ShoppingBag}
            />

            <StatsCard
              label="dépense"
              value={`${stats.totalSpent.toLocaleString()} F`}
              icon={TrendingUp}
            />
          </div>

          <TransactionsToolbar
            onRefresh={onRefresh}
            isRefreshing={isRefreshing}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          {filteredTransactions.length === 0 ? (
            <TransactionEmptyState />
          ) : (
            <div className="space-y-3">
              {filteredTransactions.map((transaction, index) => (
                <TransactionCard
                  key={transaction._id}
                  transaction={transaction}
                  index={index}
                />
              ))}
            </div>
          )}
        </motion.div>
      ) : (
        <UnusedOfferingsSection
          unusedError={unusedError}
          unusedOfferings={unusedOfferings}
        />
      )}

      <BottomCtas href={href} label={label} />
    </div>
  );
}