import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const DashboardStatsSkeleton: React.FC = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {[1, 2, 3].map((item) => (
                <div
                    key={item}
                    className="bg-black-700 rounded-xl p-5 border border-neutral-800/60 shadow-xl flex items-center gap-4"
                >
                    {/* Icon Circle Skeleton */}
                    <Skeleton className="w-12 h-12 rounded-full bg-neutral-800/90 shrink-0" />

                    {/* Title & Value Skeleton */}
                    <div className="flex flex-col gap-2 flex-1">
                        <Skeleton className="h-3.5 w-24 bg-neutral-800/80" />
                        <Skeleton className="h-7 w-12 bg-neutral-800/90" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardStatsSkeleton;
