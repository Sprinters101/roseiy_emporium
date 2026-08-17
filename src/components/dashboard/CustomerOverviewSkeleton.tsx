import React from "react";
import Container from "@/components/common/Container";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardStatsSkeleton } from "./DashboardStatsSkeleton";
import { RecentOrdersSkeleton } from "./RecentOrdersSkeleton";

export const CustomerOverviewSkeleton: React.FC = () => {
    return (
        <div className="w-full bg-black-900 min-h-screen text-white pt-8 pb-24">
            <Container>
                {/* Header Greeting Skeleton */}
                <div className="flex items-center justify-between w-full mb-8">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-8 sm:h-10 w-64 sm:w-80 bg-neutral-800/90" />
                        <Skeleton className="h-4 w-72 sm:w-96 bg-neutral-800/70" />
                    </div>
                </div>

                {/* Main 2-Column Content Layout */}
                <div className="flex flex-col md:flex-row gap-8 items-start w-full">
                    {/* Desktop Sidebar Skeleton */}
                    <div className="hidden md:block w-64 shrink-0 bg-black-700 rounded-xl p-5 border border-neutral-800/60 shadow-xl flex flex-col gap-3">
                        {[1, 2, 3, 4].map((item) => (
                            <Skeleton
                                key={item}
                                className="h-11 w-full bg-neutral-800/80 rounded-lg"
                            />
                        ))}
                        <Skeleton className="h-11 w-full bg-neutral-800/60 rounded-lg mt-4" />
                    </div>

                    {/* Right Column Skeleton View */}
                    <div className="flex-1 w-full min-w-0 flex flex-col gap-6">
                        {/* Section Header Skeleton */}
                        <Skeleton className="h-8 w-32 bg-neutral-800/90" />

                        {/* Top Stats Cards Skeleton Component */}
                        <DashboardStatsSkeleton />

                        {/* Recent Orders List Skeleton Component */}
                        <RecentOrdersSkeleton />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CustomerOverviewSkeleton;
