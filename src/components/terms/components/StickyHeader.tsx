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
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <button
                            onClick={handleGoBack}
                            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 relative overflow-hidden cursor-pointer"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Retour
                            </span>
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default StickyHeader;