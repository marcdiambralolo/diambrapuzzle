"use client";
import TipCard from "./TipCard";

interface GridRendererProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    className?: string;
    columns?: {
        sm?: number;
        lg?: number;
    };
}

function GridRenderer<T>({
    items,
    renderItem,
    className = "",
    columns = { sm: 2, lg: 4 }
}: GridRendererProps<T>) {
    const colClasses = [
        "grid gap-3",
        `sm:grid-cols-${columns.sm}`,
        `lg:grid-cols-${columns.lg}`,
    ].join(" ");

    return (
        <div className={`${colClasses} ${className}`}>
            {items.map((item, index) => renderItem(item, index))}
        </div>
    );
}

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