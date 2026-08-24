'use client';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const StickyHeader = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-purple-100"
        >
            <div className="max-w-4xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2"
                    >
                        <button
                            onClick={handleGoBack}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Retour
                        </button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default StickyHeader;