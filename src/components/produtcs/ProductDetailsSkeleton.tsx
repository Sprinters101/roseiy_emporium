import React from "react";
import Container from "@/components/common/Container";
import { ProductCardSkeleton } from "@/components/common/ProductCardSkeleton";

export const ProductDetailsSkeleton: React.FC = () => {
    return (
        <div className="min-h-screen bg-black-900 text-white pt-6 font-hanken md:mt-18">
            <div className="pt-25"></div>
            <Container>
                {/* 1. Breadcrumbs Skeleton */}
                <div className="flex items-center space-x-2 pb-4">
                    <div className="h-3.5 w-12 bg-neutral-800 rounded animate-pulse" />
                    <div className="h-3.5 w-3 bg-neutral-800 rounded animate-pulse" />
                    <div className="h-3.5 w-14 bg-neutral-800 rounded animate-pulse" />
                    <div className="h-3.5 w-3 bg-neutral-800 rounded animate-pulse" />
                    <div className="h-3.5 w-36 bg-neutral-800/80 rounded animate-pulse" />
                </div>

                {/* 2. Main Page Header Title Skeleton */}
                <div className="pb-4">
                    <div className="h-8 md:h-10 w-64 bg-neutral-800 rounded animate-pulse" />
                </div>

                {/* 3. Main Product Showcase Grid Skeleton */}
                <div className="grid grid-cols-1 lg:flex gap-8 lg:gap-12 items-start md:mt-8">
                    {/* LEFT COLUMN: Main Gallery Display Skeleton */}
                    <div className="w-full max-w-148 space-y-6">
                        {/* Main Image Container */}
                        <div className="relative w-full bg-black-700 rounded-lg p-8 sm:p-12 flex items-center justify-center min-h-95 sm:min-h-125 md:min-h-180.5 overflow-hidden animate-pulse">
                            <div className="w-48 h-80 bg-neutral-800/60 rounded-lg" />
                        </div>

                        {/* Thumbnail Bar */}
                        <div className="flex items-center gap-4 overflow-x-auto pb-2">
                            {Array.from({ length: 3 }).map((_, idx) => (
                                <div
                                    key={idx}
                                    className="size-20 sm:size-36.5 rounded-lg bg-black-700 p-2 border border-neutral-800 flex items-center justify-center shrink-0 animate-pulse"
                                >
                                    <div className="size-12 bg-neutral-800/80 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Purchase Card Skeleton */}
                    <div className="w-full">
                        <div className="bg-black-700 rounded-2xl p-5 sm:p-8 space-y-6 shadow-2xl relative">
                            {/* Header: Subtitle & Wishlist */}
                            <div className="flex items-center justify-between gap-4">
                                <div className="h-4 w-40 bg-neutral-800 rounded animate-pulse" />
                                <div className="size-10 rounded-full bg-neutral-800/70 animate-pulse" />
                            </div>

                            {/* Product Title */}
                            <div className="space-y-2">
                                <div className="h-8 md:h-12 w-3/4 bg-neutral-800 rounded animate-pulse" />
                                <div className="h-8 md:h-12 w-1/2 bg-neutral-800/70 rounded animate-pulse" />
                            </div>

                            {/* Stock & Volume Bar */}
                            <div className="h-4 w-52 bg-neutral-800/60 rounded animate-pulse" />

                            {/* Large Price */}
                            <div className="h-14 md:h-20 w-60 bg-neutral-800 rounded animate-pulse" />

                            {/* Purchase Unit Selector */}
                            <div className="pt-4 space-y-3">
                                <div className="h-4 w-28 bg-neutral-800/80 rounded animate-pulse" />
                                <div className="flex gap-6">
                                    <div className="h-6 w-20 bg-neutral-800 rounded animate-pulse" />
                                    <div className="h-6 w-20 bg-neutral-800 rounded animate-pulse" />
                                </div>
                            </div>

                            {/* Quantity Counter */}
                            <div className="pt-4 space-y-3">
                                <div className="h-4 w-36 bg-neutral-800/80 rounded animate-pulse" />
                                <div className="flex items-center gap-4">
                                    <div className="size-10 bg-neutral-800 rounded-md animate-pulse" />
                                    <div className="h-6 w-16 bg-neutral-800 rounded animate-pulse" />
                                    <div className="size-10 bg-neutral-800 rounded-md animate-pulse" />
                                </div>
                            </div>

                            {/* Total Quantity Summary */}
                            <div className="pt-4 space-y-2">
                                <div className="h-4 w-28 bg-neutral-800/80 rounded animate-pulse" />
                                <div className="h-8 w-44 bg-neutral-800/70 rounded-md animate-pulse" />
                            </div>

                            {/* Action CTA Buttons */}
                            <div className="space-y-4 pt-6">
                                <div className="w-full h-12 md:h-13 bg-neutral-800 rounded-lg animate-pulse" />
                                <div className="w-full h-12 md:h-13 bg-neutral-800/60 rounded-lg animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Products Skeleton Section */}
                <div className="pt-16 pb-12">
                    <div className="h-8 w-48 bg-neutral-800 rounded animate-pulse mb-8" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <ProductCardSkeleton key={idx} />
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ProductDetailsSkeleton;
