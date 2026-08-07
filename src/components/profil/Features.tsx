'use client';
import { formatDateFRJeu, formatDateTime, formatEditionDate, formatNumber } from "@/lib/functions";
import { LastEndedGame, Winner } from "@/lib/interfaces";
import { AnimatePresence, motion } from 'framer-motion';
import {
    Award, Calendar, Clock, Crown, FileText,
    Gift, History, Hourglass,  Zap,
    ListOrdered, Medal, RefreshCw, Shuffle, Sparkles, Star, Timer, TrendingUp, Trophy, Users,
  
} from "lucide-react";
import React, { memo } from 'react';
 import CacheLink from "../commons/CacheLink";
import { fadeInUp } from "@/hooks/marcheoffrandes/useMarcheOffrandesMain";
import { staggerContainer } from "@/lib/animations";

export const ErrorState = memo(({ onRefresh }: { onRefresh: () => void }) => (
    <div className="flex items-center justify-center min-h-[60vh] p-6">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 border border-red-100 dark:border-red-900/30"
        >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <FileText className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Erreur de chargement</h3>
            <button
                onClick={onRefresh}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
                <RefreshCw className="w-4 h-4 inline mr-2" />
                Réessayer
            </button>
        </motion.div>
    </div>
));

  
 
 

 


 
 



 

 

 
 
 
interface StatCardProps {
    value: number | null;
    label: string;
    icon: React.ReactNode;
    color: string;
    delay?: number;
}

 

export const CountdownTimer = ({ targetDate, variant = 'light', onFinish }: { targetDate: Date; variant?: 'light' | 'dark'; onFinish?: () => void }) => {
    const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [hasFinished, setHasFinished] = React.useState(false);

    React.useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();

            if (diff <= 0) {
                clearInterval(timer);
                if (!hasFinished) {
                    setHasFinished(true);
                    onFinish?.();
                }
                return;
            }

            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff % 86400000) / (1000 * 60 * 60)),
                minutes: Math.floor((diff % 3600000) / (1000 * 60)),
                seconds: Math.floor((diff % 60000) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, hasFinished, onFinish]);

    const textColor = variant === 'light' ? 'text-white' : 'text-gray-800';
    const bgColor = variant === 'light' ? 'bg-black/25' : 'bg-white/80';

    return (
        <div className="flex gap-2 justify-center flex-wrap">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className={`text-center ${bgColor} backdrop-blur-lg rounded-xl px-2 py-1.5 min-w-[55px] shadow-lg`}>
                    <p className={`${textColor} font-black text-xl sm:text-2xl leading-tight`}>
                        {value.toString().padStart(2, '0')}
                    </p>
                    <p className={`${textColor}/70 text-[9px] uppercase tracking-wider font-medium`}>
                        {unit === 'days' ? 'j' : unit === 'hours' ? 'h' : unit === 'minutes' ? 'm' : 's'}
                    </p>
                </div>
            ))}
        </div>
    );
};

export const HistoryButton = memo(() => (
    <CacheLink
        href="/star/historique/1779760200000"
        className="group flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all text-sm w-full sm:w-auto"
    >
        <History className="w-4 h-4" />
        <span>Historique</span>
    </CacheLink>
));

export const GameStatusBadge = ({ children, variant = 'primary' }: { children: React.ReactNode; variant?: 'primary' | 'success' | 'error' }) => {
    const colors = {
        primary: 'from-purple-600 to-pink-600',
        success: 'from-green-600 to-emerald-600',
        error: 'from-red-600 to-orange-600'
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${colors[variant]} px-4 py-2 shadow-xl`}
        >
            {children}
        </motion.div>
    );
};

 
 

export const CountdownTimerLight = ({monjeuid, targetDate, onFinish }: {monjeuid:string, targetDate: Date; variant?: 'light' | 'dark'; onFinish?: () => void }) => {
    const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [hasFinished, setHasFinished] = React.useState(false);

    React.useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();

            if (diff <= 0) {
                clearInterval(timer);
                if (!hasFinished) {
                    setHasFinished(true);
                    onFinish?.();
                }
                return;
            }

            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff % 86400000) / (1000 * 60 * 60)),
                minutes: Math.floor((diff % 3600000) / (1000 * 60)),
                seconds: Math.floor((diff % 60000) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, hasFinished, onFinish]);


    return (
        <div className="relative">
             <CacheLink   href={`/star/choix/${monjeuid || ''}`} className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 hover:text-purple-800 transition">
           
            {/* Bannière principale avec effet néon */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-[3px] mb-6 shadow-2xl shadow-orange-500/50">
                {/* Effet de brillance animé */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />

                {/* Effet de particules */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-300 rounded-full blur-2xl animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-red-300 rounded-full blur-2xl animate-pulse delay-1000" />
                </div>

                {/* Contenu principal */}
                <div className="relative bg-gradient-to-br from-amber-600/95 to-red-600/95 backdrop-blur-sm rounded-2xl p-6 overflow-hidden">

                    {/* Pattern décoratif */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="stars" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <circle cx="2" cy="2" r="1.5" fill="white" opacity="0.8" />
                                    <circle cx="20" cy="15" r="1" fill="white" opacity="0.5" />
                                    <circle cx="35" cy="30" r="2" fill="white" opacity="0.6" />
                                    <circle cx="10" cy="35" r="0.8" fill="white" opacity="0.4" />
                                    <circle cx="30" cy="8" r="1.2" fill="white" opacity="0.7" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#stars)" />
                        </svg>
                    </div>

                    {/* Icônes flottantes */}
                    <motion.div
                        animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute top-2 left-2 text-yellow-300/30"
                    >
                        <Sparkles className="w-8 h-8" />
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, 10, 0], rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                        className="absolute bottom-2 right-2 text-yellow-300/30"
                    >
                        <Trophy className="w-8 h-8" />
                    </motion.div>

                    {/* Message principal */}
                    <div className="relative text-center space-y-4">

                        {/* Titre principal avec effet 3D */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="relative"
                        >
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                                <span className="bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 bg-clip-text text-transparent">
                                    C'EST LE MOMENT
                                </span>
                            </h2>
                            <h3 className="text-5xl md:text-7xl font-black mt-2">
                                <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent animate-pulse">
                                    DE GAGNER!
                                </span>
                            </h3>
                        </motion.div>

                        {/* Sous-titre */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-white/80 text-sm font-medium flex items-center justify-center gap-2"
                        >
                            <Zap className="w-4 h-4 text-yellow-300" />
                            ⚡ AVEC DIAMBRA ⚡
                            <Sparkles className="w-4 h-4 text-yellow-300" />
                        </motion.p>

                        {/* Barre de progression animée */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.6, duration: 1 }}
                            className="h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full mt-6"
                        />

                    </div>
                </div>
            </div>
          </CacheLink>


            <style jsx>{`
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        .animate-shimmer {
            animation: shimmer 2s infinite;
        }
    `}</style>
        </div>
    );
};

const GlowButton = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <motion.a
        href={href}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative block w-full"
    >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-600 via-green-500 to-green-800 rounded-xl text-white font-bold text-lg shadow-2xl overflow-hidden">
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                <Star className="w-5 h-5" />
            </motion.div>
            <span className="relative z-10">{children}</span>
            <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
            >
                <Zap className="w-5 h-5" />
            </motion.div>
        </div>
    </motion.a>
);

 