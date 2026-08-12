import React from "react";
import { ShoppingBag, MapPin, CheckCircle2 } from "lucide-react";

export interface DashboardStatsProps {
    activeOrdersCount?: number;
    completedOrdersCount?: number;
    savedAddressesCount?: number;
}

export const DashboardStatsCard: React.FC<DashboardStatsProps> = ({
    activeOrdersCount = 0,
    completedOrdersCount = 0,
    savedAddressesCount = 0,
}) => {
    const stats = [
        {
            title: "Active Orders",
            value: activeOrdersCount,
            icon: ShoppingBag,
        },
        {
            title: "Completed Orders",
            value: completedOrdersCount,
            icon: CheckCircle2,
        },
        {
            title: "Saved Addresses",
            value: savedAddressesCount,
            icon: MapPin,
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={idx}
                        className="bg-black-700 rounded-xl p-5 border border-neutral-800/60 shadow-xl flex items-center gap-4"
                    >
                        {/* Circular Dark Badge */}
                        <div className="w-12 h-12 rounded-full bg-black-900 flex items-center justify-center text-gold-500 shrink-0">
                            <Icon className="size-5.5 text-gold-500" />
                        </div>

                        {/* Title & Value */}
                        <div className="flex flex-col">
                            <span className="text-xs text-neutral-400 font-hanken font-medium">
                                {stat.title}
                            </span>
                            <span className="text-2xl sm:text-3xl font-bold font-hanken text-white tracking-tight mt-0.5">
                                {stat.value}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DashboardStatsCard;
