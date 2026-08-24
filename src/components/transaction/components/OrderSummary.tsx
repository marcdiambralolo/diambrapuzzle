"use client";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";

const ANIMATIONS = {
    fadeInUp: {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 }
    },
    scaleIn: {
        initial: { scale: 0.95, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.95, opacity: 0 }
    }
};

const OrderSummary = ({ transaction, totalAmount }: { transaction: any; totalAmount: number }) => (
    <motion.div
        {...ANIMATIONS.fadeInUp}
        className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden mb-6"
    >
        <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Récapitulatif de la commande
            </h2>
        </div>

        <div className="p-6 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="text-gray-600">Montant total</span>
                <span className="text-2xl font-bold text-indigo-600">
                    {totalAmount.toLocaleString()} FCFA
                </span>
            </div>

            <div className="space-y-2">
                <DetailRow label="Client" value={transaction.nomclient || transaction.nom} />
                {(transaction.numeroSend || transaction.phone) && (
                    <DetailRow label="Téléphone" value={transaction.numeroSend || transaction.phone} mono />
                )}
                <DetailRow label="Référence" value={transaction.transactionId} mono small />
                <DetailRow
                    label="Date"
                    value={new Date(transaction.createdAt).toLocaleString("fr-FR", {
                        dateStyle: "long",
                        timeStyle: "short",
                    })}
                />
            </div>

            {transaction.items && transaction.items.length > 0 && (
                <div className="pt-4 border-t border-gray-100">
                    <h3 className="font-medium text-gray-700 mb-3">Articles commandés</h3>
                    <ul className="space-y-2">
                        {transaction.items.map((item: any, idx: number) => (
                            <li key={idx} className="flex justify-between text-sm py-1">
                                <span className="text-gray-600">{item.name} × {item.quantity}</span>
                                <span className="text-gray-700 font-medium">
                                    {item.totalPrice.toLocaleString()} FCFA
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    </motion.div>
);

const DetailRow = ({ label, value, mono = false, small = false }: { label: string; value: string; mono?: boolean; small?: boolean }) => (
    <div className="flex justify-between text-sm">
        <span className="text-gray-500">{label}</span>
        <span className={`font-medium text-gray-800 ${mono ? 'font-mono' : ''} ${small ? 'text-xs bg-gray-100 px-2 py-1 rounded' : ''}`}>
            {value}
        </span>
    </div>
);

export default OrderSummary;