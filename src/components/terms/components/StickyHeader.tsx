'use client';
import CacheLink from '@/components/commons/CacheLink';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const StickyHeader = () => (
    <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-purple-100"
    >
        <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
                <motion.div whileHover={{ x: -4 }} className="flex items-center gap-2">
                    <CacheLink
                        href="/star/profil"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-500 transition-colors hover:text-purple-700"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Retour au jeu
                    </CacheLink>
                </motion.div>
            </div>
        </div>
    </motion.div>
);

export default StickyHeader;