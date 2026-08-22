"use client";
import CacheLink from "@/components/commons/CacheLink";
import { ChevronRight } from "lucide-react";

const BUTTON_CLASSES = {
    primary: [
        "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-white",
        "transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600",
        "hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2",
    ].join(" "),
};

function HeroSection() {

    return (
        <section className="text-center reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
            <div className="mb-6 flex justify-center">
                <img
                    src="/logo.png"
                    alt="DIAMBRA PUZZLE Logo"
                    className="h-20 w-auto object-contain"
                />
            </div>
            <h1 className="text-balance text-4xl font-black tracking-tight bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent sm:text-6xl">
                DIAMBRA PUZZLE
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-purple-600">
                Développez votre mémoire visuelle et votre logique en replaçant les éléments du plateau P2.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <CacheLink href="/star/profil" className={BUTTON_CLASSES.primary}>
                    Jouez maintenant ! <ChevronRight className="h-4 w-4" />
                </CacheLink>
            </div>
        </section>
    );
}

export default HeroSection;