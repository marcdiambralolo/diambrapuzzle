import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = {
    title: "À propos — Diambra Puzzle",
    description:
        "Diambra Puzzle est un jeu de puzzle en ligne",
    alternates: { canonical: "/a-propos" },
    openGraph: {
        title: "À propos de Diambra Puzzle",
        description:
            "Diambra Puzzle est un jeu de puzzle en ligne",
        url: "/a-propos",
        type: "website",
        images: [
            {
                url: "/logo.png",
                width: 512,
                height: 512,
                alt: "Logo Diambra Puzzle",
            },
        ],
    },
    icons: {
        icon: "/logo.png",
        shortcut: "/logo.png",
        apple: "/logo.png",
    },
};

export default function AboutPageWrapper() {

    return <AboutPage />;
}