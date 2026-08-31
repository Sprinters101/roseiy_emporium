import React, { useState, useEffect } from "react";
import { DashboardStatsCard } from "./DashboardStatsCard";
import { RecentOrdersList } from "./RecentOrdersList";
import { CustomerOverviewSkeleton } from "./CustomerOverviewSkeleton";

export interface CustomerOverviewProps {
    isLoading?: boolean;
}

export const CustomerOverview: React.FC<CustomerOverviewProps> = ({
    isLoading: propIsLoading,
}) => {
    const [simulatedLoading, setSimulatedLoading] = useState<boolean>(
        propIsLoading === undefined,
    );

    useEffect(() => {
        if (propIsLoading !== undefined) return;

        // Simulate data fetching delay so skeleton displays before data populates
        const timer = setTimeout(() => {
            setSimulatedLoading(false);
        }, 600);

        return () => clearTimeout(timer);
    }, [propIsLoading]);

    const loading =
        propIsLoading !== undefined ? propIsLoading : simulatedLoading;

    if (loading) {
        return <CustomerOverviewSkeleton />;
    }

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Section Header */}
            <h2 className="font-playfair font-bold text-2xl md:text-3xl text-white">
                Overview
            </h2>

            {/* Top Stats Cards Row */}
            <DashboardStatsCard
                activeOrdersCount={1}
                completedOrdersCount={15}
                savedAddressesCount={3}
            />

            {/* Recent Orders List Card Container */}
            <RecentOrdersList />
        </div>
    );
};

export default CustomerOverview;
