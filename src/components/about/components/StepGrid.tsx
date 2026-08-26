"use client";
import FeatureCard from "./FeatureCard";
import GridRenderer from "./GridRenderer";

interface StepItem {
    icon: React.ElementType;
    title: string;
    desc: string;
}

function StepGrid({ items }: { items: StepItem[] }) {

    return (
        <GridRenderer
            items={items}
            columns={{ sm: 2, lg: 3 }}
            renderItem={(item) => (
                <FeatureCard key={item.title} icon={<item.icon className="h-5 w-5" />} title={item.title}>
                    {item.desc}
                </FeatureCard>
            )}
        />
    );
}

export default StepGrid;