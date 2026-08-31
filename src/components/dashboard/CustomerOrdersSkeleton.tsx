import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const CustomerOrdersSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Section Header Skeleton */}
            <Skeleton className="h-9 w-36 bg-neutral-800/90" />

            {/* Tabs Skeleton */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
                <Skeleton className="h-12 w-36 sm:w-44 bg-neutral-800/80 rounded-xl" />
                <Skeleton className="h-12 w-36 sm:w-44 bg-neutral-800/80 rounded-xl" />
            </div>

            {/* Orders Card Container Skeleton */}
            <div className="bg-black-700 rounded-xl p-6 sm:p-8 border border-neutral-800/60 shadow-xl flex flex-col gap-6 w-full">
                <Skeleton className="h-7 w-48 bg-neutral-800/90" />

                <div className="flex flex-col gap-3 w-full">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div
                            key={item}
                            className="border-y border-y-neutral-800/80 py-3.5 flex items-center justify-between gap-4"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <Skeleton className="size-10 sm:size-14 md:size-16 rounded-lg bg-neutral-800/90" />
                                    <Skeleton className="size-10 sm:size-14 md:size-16 rounded-lg bg-neutral-800/80" />
                                    <Skeleton className="size-10 sm:size-14 md:size-16 rounded-lg bg-neutral-800/70" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <Skeleton className="h-4 w-36 bg-neutral-800/90" />
                                    <Skeleton className="h-3 w-16 bg-neutral-800/70" />
                                </div>
                            </div>

                            <Skeleton className="hidden sm:block h-4 w-24 bg-neutral-800/80" />
                            <Skeleton className="hidden sm:block h-4 w-24 bg-neutral-800/80" />

                            <div className="hidden sm:flex items-center gap-4">
                                <Skeleton className="h-4 w-20 bg-neutral-800/80" />
                                <Skeleton className="h-4 w-20 bg-neutral-800/80" />
                            </div>

                            <Skeleton className="sm:hidden size-8 rounded-lg bg-neutral-800/80" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomerOrdersSkeleton;

