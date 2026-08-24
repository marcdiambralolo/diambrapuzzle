"use client";
import { cx } from "@/lib/functions";
import { Calendar } from "lucide-react";
import { memo } from "react";

const DAYS = Array.from({ length: 31 }, (_, i) => {
    const value = String(i + 1);
    return { value, label: value };
});

const MONTHS = [
    { value: "1", label: "Janvier" },
    { value: "2", label: "Février" },
    { value: "3", label: "Mars" },
    { value: "4", label: "Avril" },
    { value: "5", label: "Mai" },
    { value: "6", label: "Juin" },
    { value: "7", label: "Juillet" },
    { value: "8", label: "Août" },
    { value: "9", label: "Septembre" },
    { value: "10", label: "Octobre" },
    { value: "11", label: "Novembre" },
    { value: "12", label: "Décembre" },
];

const YEARS = Array.from({ length: 100 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: String(year), label: String(year) };
});

interface BirthDateInputProps {
    day: string;
    month: string;
    year: string;
    onDayChange: (value: string) => void;
    onMonthChange: (value: string) => void;
    onYearChange: (value: string) => void;
    error?: string;
}

const BirthDateInput = memo(function BirthDateInput({
    day,
    month,
    year,
    onDayChange,
    onMonthChange,
    onYearChange,
    error,
}: BirthDateInputProps) {
    return (
        <div className="w-full">
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date de naissance
                </span>
            </label>

            <div className="grid grid-cols-3 gap-2">
                <select
                    value={day}
                    onChange={(e) => onDayChange(e.target.value)}
                    className={cx(
                        "rounded-xl border-2 bg-white px-3 py-3 transition-all dark:bg-gray-800",
                        error
                            ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                            : "border-gray-200 focus:border-purple-500 dark:border-gray-700"
                    )}
                >
                    <option value="">Jour</option>
                    {DAYS.map((dayOption) => (
                        <option key={dayOption.value} value={dayOption.value}>
                            {dayOption.label}
                        </option>
                    ))}
                </select>

                <select
                    value={month}
                    onChange={(e) => onMonthChange(e.target.value)}
                    className={cx(
                        "rounded-xl border-2 bg-white px-3 py-3 transition-all dark:bg-gray-800",
                        error
                            ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                            : "border-gray-200 focus:border-purple-500 dark:border-gray-700"
                    )}
                >
                    <option value="">Mois</option>
                    {MONTHS.map((monthOption) => (
                        <option key={monthOption.value} value={monthOption.value}>
                            {monthOption.label}
                        </option>
                    ))}
                </select>

                <select
                    value={year}
                    onChange={(e) => onYearChange(e.target.value)}
                    className={cx(
                        "rounded-xl border-2 bg-white px-3 py-3 transition-all dark:bg-gray-800",
                        error
                            ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                            : "border-gray-200 focus:border-purple-500 dark:border-gray-700"
                    )}
                >
                    <option value="">Année</option>
                    {YEARS.map((yearOption) => (
                        <option key={yearOption.value} value={yearOption.value}>
                            {yearOption.label}
                        </option>
                    ))}
                </select>
            </div>

            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
});

export default BirthDateInput;