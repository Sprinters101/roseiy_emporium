import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const AddressesSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between gap-4 w-full">
                <Skeleton className="h-9 w-36 bg-neutral-800/90" />
                <Skeleton className="h-10 w-36 sm:w-44 bg-neutral-800/80 rounded-md" />
            </div>

            {/* Address Cards Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 w-full">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="bg-black-700 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-neutral-800/60 flex items-start justify-between gap-4"
                    >
                        <div className="flex items-start gap-4 flex-1">
                            <Skeleton className="size-5 rounded-full bg-neutral-800/90 shrink-0 mt-1" />
                            <div className="flex flex-col gap-2 w-full max-w-[80%]">
                                <Skeleton className="h-5 w-36 bg-neutral-800/90" />
                                <Skeleton className="h-3.5 w-full bg-neutral-800/70" />
                                <Skeleton className="h-3.5 w-28 bg-neutral-800/70" />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <Skeleton className="size-8 sm:size-9 rounded-full bg-neutral-800/80" />
                            <Skeleton className="size-8 sm:size-9 rounded-full bg-neutral-800/80" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddressesSkeleton;
