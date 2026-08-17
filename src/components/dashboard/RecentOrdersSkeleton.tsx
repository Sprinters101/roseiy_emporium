import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const RecentOrdersSkeleton: React.FC = () => {
    return (
        <div className="bg-black-700 rounded-xl p-6 sm:p-8 border border-neutral-800/60 shadow-xl flex flex-col gap-6 w-full mt-2">
            {/* Card Header Skeleton */}
            <div className="flex items-center justify-between w-full">
                <Skeleton className="h-7 w-36 bg-neutral-800/90" />
                <Skeleton className="h-7 w-20 bg-neutral-800/80 rounded-md" />
            </div>

            {/* Orders List Skeleton Rows */}
            <div className="flex flex-col gap-3 w-full">
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="bg-black-900/60 border border-neutral-800/80 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                        {/* Thumbnails & Info Skeleton */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center -space-x-2 shrink-0">
                                <Skeleton className="w-10 h-10 rounded-md bg-neutral-800/90" />
                                <Skeleton className="w-10 h-10 rounded-md bg-neutral-800/80" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <Skeleton className="h-4 w-36 bg-neutral-800/90" />
                                <Skeleton className="h-3 w-16 bg-neutral-800/70" />
                            </div>
                        </div>

                        {/* Date Skeleton */}
                        <Skeleton className="h-3.5 w-24 bg-neutral-800/80" />

                        {/* Price & Action Skeleton */}
                        <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0">
                            <Skeleton className="h-5 w-24 bg-neutral-800/90" />
                            <Skeleton className="h-4 w-20 bg-neutral-800/80" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentOrdersSkeleton;
