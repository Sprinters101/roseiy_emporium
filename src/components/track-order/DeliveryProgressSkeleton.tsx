import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface DeliveryProgressSkeletonProps {
    className?: string;
}

export const DeliveryProgressSkeleton: React.FC<
    DeliveryProgressSkeletonProps
> = ({ className }) => {
    return (
        <div
            className={cn(
                "bg-black-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 flex flex-col gap-6 border border-neutral-800/60 shadow-xl w-full",
                className,
            )}
        >
            {/* Card Heading Skeleton */}
            <Skeleton className="h-6 sm:h-7 w-40 bg-neutral-800" />

            {/* Order Identifier Info Box Skeleton */}
            <div className="flex items-center gap-3.5">
                <Skeleton className="size-10 sm:size-11 rounded-full bg-neutral-800 shrink-0" />
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-44 sm:w-52 bg-neutral-800" />
                    <Skeleton className="h-3.5 w-28 sm:w-36 bg-neutral-800" />
                </div>
            </div>

            {/* Top Progress Bar Skeleton */}
            <div className="w-full h-2 sm:h-2.5 bg-black-900 rounded-full overflow-hidden relative my-1">
                <Skeleton className="h-full w-1/3 bg-neutral-800 rounded-full" />
            </div>

            {/* Stepper Steps Row Skeleton */}
            <div className="w-full pt-1">
                {/* Icons & Connecting Lines Row */}
                <div className="flex items-center justify-between w-full">
                    {[0, 1, 2, 3].map((idx) => {
                        const isLast = idx === 3;
                        return (
                            <React.Fragment key={idx}>
                                <Skeleton className="size-5 sm:size-6 rounded-full bg-neutral-800 shrink-0" />
                                {!isLast && (
                                    <div className="h-[1px] min-w-[20px] sm:min-w-[40px] flex-1 mx-2 sm:mx-4 bg-neutral-800" />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* Labels Row Skeleton */}
                <div className="flex items-start justify-between w-full mt-2.5">
                    <Skeleton className="h-3 w-16 bg-neutral-800" />
                    <Skeleton className="h-3 w-20 bg-neutral-800" />
                    <Skeleton className="h-3 w-14 bg-neutral-800" />
                    <Skeleton className="h-3 w-20 bg-neutral-800" />
                </div>
            </div>
        </div>
    );
};

export default DeliveryProgressSkeleton;
