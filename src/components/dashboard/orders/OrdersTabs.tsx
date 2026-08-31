import React from "react";
import type { OrderTabType } from "./types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OrdersTabsProps {
    activeTab: OrderTabType;
    onTabChange: (tab: OrderTabType) => void;
    ongoingCount: number;
    deliveredCount: number;
}
interface NavTabItem {
    id: number;
    title: string;
    value: OrderTabType;
    count: number;
}

export const OrdersTabs: React.FC<OrdersTabsProps> = ({
    activeTab,
    onTabChange,
    ongoingCount,
    deliveredCount,
}) => {
    const navData: NavTabItem[] = [
        {
            id: 1,
            title: "Ongoing",
            value: "ongoing",
            count: ongoingCount,
            // handleclick: () => onTabChange("ongoing"),
        },
        {
            id: 2,
            title: "Delivered",
            value: "delivered",
            count: deliveredCount,
            // handleClick: () => onTabChange("delivered"),
        },
    ];

    return (
        <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Ongoing Tab */}

            {navData.map((nav) => (
                <Button
                    key={nav.id}
                    type="button"
                    onClick={() => onTabChange(nav.value)}
                    className={cn(
                        `flex-1 w-full max-w-54.5 sm:flex-initial h-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-hanken font-medium text-sm sm:text-base transition-all cursor-pointer text-center`,
                        "bg-black-700 text-neutral-300 hover:text-white border border-transparent hover:bg-neutral-800/80",
                        activeTab === nav.value &&
                            "border border-gold-500 gradient-text bg-transparent  ",
                    )}
                >
                    {nav.title} ({nav.count})
                </Button>
            ))}
        </div>
    );
};

export default OrdersTabs;
