"use client";
import FeatureCard from "./FeatureCard";

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

interface FeatureItem {
    icon: React.ElementType;
    title: string;
    desc: string;
}

interface FeatureGridProps {
    items: FeatureItem[];
}

function FeatureGrid({ items }: FeatureGridProps) {

    return (
        <GridRenderer
            items={items}
            columns={{ sm: 2, lg: 4 }}
            renderItem={(item) => (
                <FeatureCard key={item.title} icon={<item.icon className="h-5 w-5" />} title={item.title}>
                    {item.desc}
                </FeatureCard>
            )}
        />
    );
}

export default FeatureGrid;