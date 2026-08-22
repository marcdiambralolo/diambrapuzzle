"use client";
import Pill from "./Pill";

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

interface PillItem {
    icon: React.ElementType;
    title: string;
    desc: string;
    tooltip?: string;
}

interface PillGridProps {
    items: PillItem[];
    columns?: { sm?: number; lg?: number };
}

function PillGrid({ items, columns = { sm: 2, lg: 4 } }: PillGridProps) {

    return (
        <GridRenderer
            items={items}
            columns={columns}
            renderItem={(item) => (
                <Pill
                    key={item.title}
                    icon={<item.icon className="h-5 w-5" />}
                    title={item.title}
                    desc={item.desc}
                    tooltip={item.tooltip}
                />
            )}
        />
    );
}

export default PillGrid;