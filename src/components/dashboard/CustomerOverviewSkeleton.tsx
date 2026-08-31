import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardStatsSkeleton } from "./DashboardStatsSkeleton";
import { RecentOrdersSkeleton } from "./RecentOrdersSkeleton";

export const CustomerOverviewSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Section Header Skeleton */}
            <Skeleton className="h-8 w-32 bg-neutral-800/90" />

            {/* Top Stats Cards Skeleton Component */}
            <DashboardStatsSkeleton />

            {/* Recent Orders List Skeleton Component */}
            <RecentOrdersSkeleton />
        </div>
    );
};

export default CustomerOverviewSkeleton;

