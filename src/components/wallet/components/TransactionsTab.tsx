"use client";
import { staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { ShoppingBag, TrendingUp } from "lucide-react";
import StatsCard from "./StatsCard";
import TransactionCard from "./TransactionCard";
import TransactionEmptyState from "./TransactionEmptyState";
import TransactionsToolbar from "./TransactionsToolbar";

type SortOrder = "newest" | "oldest" | "amount_high" | "amount_low";

const StatsSection = ({ totalTransactions, totalSpent }: { totalTransactions: number; totalSpent: number }) => (
    <div className="flex gap-4">
        <StatsCard
            label="transactions"
            value={totalTransactions}
            icon={ShoppingBag}
        />
        <StatsCard
            label="dépense"
            value={`${totalSpent.toLocaleString()} F`}
            icon={TrendingUp}
        />
    </div>
);

const TransactionList = ({ transactions }: { transactions: any[] }) => (
    <div className="space-y-3">
        {transactions.map((transaction, index) => (
            <TransactionCard
                key={transaction._id}
                transaction={transaction}
                index={index}
            />
        ))}
    </div>
);

const TransactionsTab = ({
    stats,
    sortOrder,
    setSortOrder,
    onRefresh,
    isRefreshing,
    filteredTransactions,
}: {
    stats: { totalTransactions: number; totalSpent: number };
    sortOrder: SortOrder;
    setSortOrder: (order: SortOrder) => void;
    onRefresh: () => void;
    isRefreshing: boolean;
    filteredTransactions: any[];
}) => (
    <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-5"
    >
        <StatsSection
            totalTransactions={stats.totalTransactions}
            totalSpent={stats.totalSpent}
        />

        <TransactionsToolbar
            onRefresh={onRefresh}
            isRefreshing={isRefreshing}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
        />

        {filteredTransactions.length === 0 ? (
            <TransactionEmptyState />
        ) : (
            <TransactionList transactions={filteredTransactions} />
        )}
    </motion.div>
);

export default TransactionsTab;