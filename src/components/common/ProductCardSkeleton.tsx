import React from "react";
import { cn } from "@/lib/utils";

interface ProductCardSkeletonProps {
    className?: string;
    isLandingPage?: boolean;
}

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({
    className = "",
    isLandingPage = false,
}) => {
    return (
        <div
            className={cn(
                `group relative w-full bg-[#111111] border border-white/10 rounded-lg p-4 
                 flex flex-col justify-between`,
                isLandingPage && "md:py-5",
                className,
            )}
        >
            {/* Top Action Header Placeholder */}
            <div className="flex justify-end w-full relative z-10">
                <div className="size-6 md:size-10 rounded-full bg-neutral-800/80 animate-pulse" />
            </div>

            {/* Product Image Placeholder */}
            <div
                className={cn(
                    "relative w-full h-28.25 sm:h-56.75 flex items-center justify-center overflow-hidden my-2",
                    isLandingPage && "md:h-76.25 mt-6.25",
                )}
            >
                <div className="w-20 h-24 sm:w-36 sm:h-48 bg-neutral-800/60 rounded-md animate-pulse" />
            </div>

            {/* Product Info */}
            <div
                className={cn(
                    "space-y-2 mt-0",
                    isLandingPage && "mt-4 space-y-2.5",
                )}
            >
                {/* Category Tag Skeleton */}
                <div className="h-2.5 w-16 bg-gold-500/20 rounded animate-pulse" />

                {/* Title Skeleton */}
                <div className="space-y-1.5 min-h-8.5 md:min-h-10.5">
                    <div className="h-4 w-5/6 bg-neutral-800 rounded animate-pulse" />
                    <div className="h-4 w-3/5 bg-neutral-800/60 rounded animate-pulse" />
                </div>

                {/* Stock Meta Skeleton */}
                <div className="h-3 w-1/2 bg-neutral-800/50 rounded animate-pulse" />

                {/* Price Skeleton */}
                <div className={cn("pt-1", isLandingPage && "mt-2")}>
                    <div className="h-6 sm:h-8 w-28 bg-gold-500/20 rounded animate-pulse" />
                </div>
            </div>

            {/* CTA Button Skeleton */}
            <div className={cn("mt-4", isLandingPage && "mt-2")}>
                <div
                    className={cn(
                        "w-full h-10 md:h-11 rounded-sm bg-neutral-800/80 animate-pulse",
                        isLandingPage && "h-12",
                    )}
                />
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
