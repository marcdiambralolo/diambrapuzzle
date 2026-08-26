"use client";
import GridRenderer from "./GridRenderer";
import TipCard from "./TipCard";

interface TipItem {
    icon: React.ElementType;
    title: string;
    desc: string;
    color: "purple" | "indigo";
}

function TipGrid({ items }: { items: TipItem[] }) {
    return (
        <GridRenderer
            items={items}
            columns={{ sm: 2 }}
            renderItem={(item) => (
                <TipCard
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    desc={item.desc}
                    color={item.color}
                />
            )}
        />
    );
}

export default TipGrid;