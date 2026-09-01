import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const ProfileSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Personal Information Skeleton Card */}
            <div className="bg-black-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-neutral-800/60 shadow-xl flex flex-col gap-5 w-full">
                <div className="flex items-center justify-between w-full">
                    <Skeleton className="h-7 w-48 bg-neutral-800/90" />
                    <Skeleton className="h-8 w-16 bg-neutral-800/80 rounded-md" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-24 bg-neutral-800/80" />
                        <Skeleton className="h-12 w-full bg-neutral-800/90 rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-24 bg-neutral-800/80" />
                        <Skeleton className="h-12 w-full bg-neutral-800/90 rounded-lg" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-28 bg-neutral-800/80" />
                    <Skeleton className="h-12 w-full bg-neutral-800/90 rounded-lg" />
                </div>

                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-28 bg-neutral-800/80" />
                    <Skeleton className="h-12 w-full bg-neutral-800/90 rounded-lg" />
                </div>
            </div>

            {/* Password Skeleton Card */}
            <div className="bg-black-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-neutral-800/60 shadow-xl flex flex-col gap-5 w-full">
                <div className="flex items-center justify-between w-full">
                    <Skeleton className="h-7 w-32 bg-neutral-800/90" />
                    <Skeleton className="h-8 w-16 bg-neutral-800/80 rounded-md" />
                </div>

                <div className="flex flex-col gap-2 mt-2">
                    <Skeleton className="h-4 w-24 bg-neutral-800/80" />
                    <Skeleton className="h-12 w-full bg-neutral-800/90 rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export default ProfileSkeleton;
