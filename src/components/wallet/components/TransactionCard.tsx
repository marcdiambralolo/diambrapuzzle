"use client";
import { Transaction, TransactionItem } from "@/lib/interfaces";
import { motion, Variants } from "framer-motion";
import { Calendar, CreditCard } from "lucide-react";
import { memo, useMemo } from "react";

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

function normalizeItem(item: TransactionItem) {
    if (typeof item.offeringId === 'object' && item.offeringId !== null) {
        return {
            ...item.offeringId,
            quantity: item.quantity,
            price: item.price ?? item.offeringId.price,
            name: item.offeringId.name ?? 'Jeton',
        };
    }

    return {
        ...item, name: item.name ?? 'Jeton',
        price: item.price ?? item.unitPrice ?? 0,
    };
}

interface OfferingItemCardProps {
    item: any;
    index: number;
}

const OfferingItemCard = memo(function OfferingItemCard({
    item,
    index,
}: OfferingItemCardProps) {

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            className="flex items-center gap-3 rounded-lg bg-gray-50 p-3"
        >
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                </div>

                <p className="text-xs text-gray-500">
                    {item.quantity} × {item.price?.toLocaleString()} FCFA
                </p>
            </div>

            <div className="text-right">
                <p className="text-sm font-bold text-indigo-600">
                    {(item.quantity * item.price).toLocaleString()}
                </p>
                <p className="text-[10px] text-gray-400">FCFA</p>
            </div>
        </motion.div>
    );
});

const TransactionCard = memo(function TransactionCard({
    transaction,
}: {
    transaction: Transaction;
    index: number;
}) {

    const normalizedItems = useMemo(
        () => transaction.items.map((item) => normalizeItem(item)),
        [transaction.items]
    );

    return (
        <motion.div
            variants={fadeInUp}
            className="rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden"
        >
            <div className="p-4">
                <div className="mb-3 flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <CreditCard className="h-4 w-4 text-indigo-500" />
                            <p className="text-xs font-mono font-semibold text-gray-500">
                                ID :   {transaction.transactionId?.slice(-12)}
                            </p>
                        </div>
                        <p className="flex items-center gap-1 text-xs text-gray-400">
                            <Calendar className="h-3 w-3" />
                            {new Date(transaction.completedAt || transaction.createdAt).toLocaleString("fr-FR", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                </div>

                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-3 space-y-2 overflow-hidden"
                >
                    {normalizedItems.map((item, idx) => (
                        <OfferingItemCard key={idx} item={item} index={idx} />
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
});

export default TransactionCard;