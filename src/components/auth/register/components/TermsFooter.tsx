'use client';
import { default as CacheLink } from '@/components/commons/CacheLink';
import { HelpCircle, Shield } from 'lucide-react';

const TermsFooter = () => (
    <div className="flex flex-col gap-3 mt-10 w-full text-center">
        <CacheLink
            href="/terms"
            className="group flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:shadow-amber-500/30 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
        >
            <span className="relative z-10 flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Conditions générales d'utilisation
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </CacheLink>
        <CacheLink
            href="/privacy"
            className="group flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
        >
            <span className="relative z-10 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Politique de confidentialité
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </CacheLink>
    </div>
);

export default TermsFooter;