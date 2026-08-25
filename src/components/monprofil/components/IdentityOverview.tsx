"use client";
import { CalendarDays, UserRound } from "lucide-react";
import { memo, type ReactNode } from "react";

const IdentityOverview = memo(function IdentityOverview({
    fullName,
    dateNaissanceLabel,
}: {
    fullName: string;
    dateNaissanceLabel: string;
}) {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-transparent to-indigo-50/30 dark:from-purple-950/20 dark:to-indigo-950/20" />
            <div className="relative p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <IdentityPill
                        icon={<UserRound className="h-4 w-4" />}
                        label="Nom complet"
                        value={fullName}
                    />
                    <IdentityPill
                        icon={<CalendarDays className="h-4 w-4" />}
                        label="Date & heure"
                        value={dateNaissanceLabel}
                    />
                </div>
            </div>
        </div>
    );
});

const IdentityPill = memo(function IdentityPill({
    icon,
    label,
    value,
}: {
    icon: ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 py-3">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                {icon}
                {label}
            </div>

            <div className="mt-1.5 text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                {value || "—"}
            </div>
        </div>
    );
});

export default IdentityOverview;