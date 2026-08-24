"use client";
import Loader from "@/app/loading";
import { useTransactionPage } from "@/hooks/transaction/useTransactionPage";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import ErrorState from "./components/ErrorState";
import Footer from "./components/Footer";
import OrderSummary from "./components/OrderSummary";
import PaymentButton from "./components/PaymentButton";
import PaymentErrorState from "./components/PaymentErrorState";
import PaymentMethodSelector from "./components/PaymentMethodSelector";
import ProcessingState from "./components/ProcessingState";
import SuccessState from "./components/SuccessState";

export default function TransactionPage() {
    const router = useRouter();
    const {
        setSelectedPaymentMethod, initiatePayment, handleRetry, paymentError, selectedPaymentMethod,
        transaction, isLoading, error, paymentStatus, totalAmount, consultationId,
    } = useTransactionPage();

    if (isLoading) return <Loader />;

    if (error || !transaction) return <ErrorState error={error} router={router} />;

    const isProcessing = ["initiating", "pending_user_action", "verifying"].includes(paymentStatus);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-2xl mx-auto px-4 py-12">
                <AnimatePresence mode="wait">
                    {paymentStatus === "success" && <SuccessState consultationId={consultationId!} router={router} />}
                    {isProcessing && <ProcessingState status={paymentStatus} />}
                </AnimatePresence>

                <OrderSummary transaction={transaction} totalAmount={totalAmount} />

                {paymentStatus === "idle" && (
                    <>
                        <PaymentMethodSelector
                            selectedMethod={selectedPaymentMethod}
                            setSelectedPaymentMethod={setSelectedPaymentMethod}
                        />
                        <PaymentButton totalAmount={totalAmount} onClick={initiatePayment} />
                    </>
                )}

                {paymentStatus === "error" && (
                    <PaymentErrorState error={paymentError} onRetry={handleRetry} />
                )}

                <Footer />
            </div>
        </div>
    );
}