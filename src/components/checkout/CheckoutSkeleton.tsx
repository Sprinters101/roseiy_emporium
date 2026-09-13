import React from "react";
import Container from "@/components/common/Container";
import { Skeleton } from "@/components/ui/skeleton";

export const CheckoutSkeleton: React.FC = () => {
    return (
        <div className="w-full bg-black-900 min-h-screen text-white pt-28 md:pt-36 pb-24">
            <Container>
                {/* Breadcrumbs Skeleton */}
                <div className="flex items-center gap-2 mb-3">
                    <Skeleton className="h-3 w-12 bg-neutral-800" />
                    <Skeleton className="size-3 bg-neutral-800" />
                    <Skeleton className="h-3 w-12 bg-neutral-800" />
                    <Skeleton className="size-3 bg-neutral-800" />
                    <Skeleton className="h-3 w-16 bg-neutral-800" />
                </div>

                {/* Page Title Skeleton */}
                <Skeleton className="h-9 md:h-12 w-48 md:w-64 bg-neutral-800 mb-6 sm:mb-8" />

                {/* 2-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
                    {/* Left Column: Personal & Shipping Skeletons */}
                    <div className="lg:col-span-7 flex flex-col gap-6 w-full">
                        {/* Personal Info Card Skeleton */}
                        <div className="bg-black-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-neutral-800/60 shadow-xl flex flex-col gap-5 w-full">
                            <div className="flex items-center justify-between w-full">
                                <Skeleton className="h-6 w-44 bg-neutral-800" />
                                <Skeleton className="h-7 w-28 bg-neutral-800 rounded-md" />
                            </div>
                            <div className="flex flex-col gap-4 pt-1">
                                <div className="flex flex-col gap-1.5">
                                    <Skeleton className="h-3 w-16 bg-neutral-800" />
                                    <Skeleton className="h-5 w-40 bg-neutral-800" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <Skeleton className="h-3 w-24 bg-neutral-800" />
                                    <Skeleton className="h-5 w-36 bg-neutral-800" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <Skeleton className="h-3 w-24 bg-neutral-800" />
                                    <Skeleton className="h-5 w-48 bg-neutral-800" />
                                </div>
                            </div>
                        </div>

                        {/* Shipping Info Card Skeleton */}
                        <div className="bg-black-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-neutral-800/60 shadow-xl flex flex-col gap-5 w-full">
                            <div className="flex items-center justify-between w-full">
                                <Skeleton className="h-6 w-44 bg-neutral-800" />
                                <Skeleton className="h-7 w-28 bg-neutral-800 rounded-md" />
                            </div>
                            <div className="bg-black-700 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-neutral-800/80 flex items-start justify-between gap-4 w-full">
                                <div className="flex items-start gap-3.5 sm:gap-4 min-w-0 flex-1">
                                    <Skeleton className="size-5 rounded-full bg-neutral-800 shrink-0 mt-0.5" />
                                    <div className="flex flex-col gap-2 min-w-0 flex-1">
                                        <Skeleton className="h-5 w-32 bg-neutral-800" />
                                        <Skeleton className="h-4 w-3/4 bg-neutral-800" />
                                        <Skeleton className="h-4 w-28 bg-neutral-800" />
                                    </div>
                                </div>
                                <Skeleton className="size-8 sm:size-9 rounded-full bg-neutral-800 shrink-0" />
                            </div>
                        </div>

                        {/* Bottom Full-Width Pay Button Skeleton */}
                        <Skeleton className="w-full mt-2 h-14 rounded-sm sm:rounded-md bg-neutral-800" />
                    </div>

                    {/* Right Column: Order Summary Skeleton */}
                    <div className="lg:col-span-5 w-full sticky top-28">
                        <div className="bg-black-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-neutral-800/60 shadow-xl flex flex-col justify-between h-fit w-full">
                            <div>
                                <Skeleton className="h-6 w-44 bg-neutral-800 mb-4" />
                                <div className="flex flex-col gap-3.5">
                                    {Array.from({ length: 2 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between gap-3 sm:gap-4 py-2 w-full"
                                        >
                                            <Skeleton className="size-20 sm:size-24 rounded-lg bg-neutral-800 shrink-0" />
                                            <div className="flex flex-col gap-2 flex-1 min-w-0">
                                                <Skeleton className="h-3 w-16 bg-neutral-800" />
                                                <Skeleton className="h-5 w-36 bg-neutral-800" />
                                                <Skeleton className="h-4 w-24 bg-neutral-800" />
                                                <Skeleton className="h-5 w-20 bg-neutral-800" />
                                            </div>
                                            <Skeleton className="size-8 sm:size-9 rounded-full bg-neutral-800 shrink-0" />
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-black-900 rounded-xl p-4 sm:p-5 flex flex-col gap-3 mt-6 border border-neutral-800/50">
                                    <div className="flex items-center justify-between">
                                        <Skeleton className="h-4 w-16 bg-neutral-800" />
                                        <Skeleton className="h-4 w-24 bg-neutral-800" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Skeleton className="h-4 w-20 bg-neutral-800" />
                                        <Skeleton className="h-4 w-16 bg-neutral-800" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black-900 rounded-xl p-5 flex items-center justify-between mt-6 border border-neutral-800/50">
                                <Skeleton className="h-6 w-16 bg-neutral-800" />
                                <Skeleton className="h-6 w-28 bg-neutral-800" />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CheckoutSkeleton;
