import React from "react";
import { PackageSearch, SearchX } from "lucide-react";

export interface TrackOrderEmptyStateProps {
    type?: "idle" | "error";
    searchedOrderId?: string;
}

export const TrackOrderEmptyState: React.FC<TrackOrderEmptyStateProps> = ({
    type = "idle",
    searchedOrderId,
}) => {
    if (type === "error") {
        return (
            <div className="bg-black-700 rounded-xl sm:rounded-2xl p-8 sm:p-12 border border-neutral-800/60 shadow-xl flex flex-col items-center justify-center text-center w-full animate-in fade-in duration-300">
                <div className="size-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-4 shadow-inner">
                    <SearchX className="size-8" />
                </div>

                <h3 className="font-playfair font-bold text-xl sm:text-2xl text-white mb-2">
                    Order Not Found
                </h3>

                <p className="font-hanken text-xs sm:text-sm text-neutral-400 max-w-md mb-4 leading-relaxed">
                    {searchedOrderId ? (
                        <>
                            We could not find an order matching{" "}
                            <span className="text-white font-medium">
                                "{searchedOrderId}"
                            </span>
                            . Please ensure the Order ID and Email Address are
                            accurate.
                        </>
                    ) : (
                        "No order matched your search. Please check your Order ID and Email Address and try again."
                    )}
                </p>
            </div>
        );
    }

    return (
        <div className="bg-black-700 rounded-xl sm:rounded-2xl p-8 sm:p-12 border border-neutral-800/60 shadow-xl flex flex-col items-center justify-center text-center w-full animate-in fade-in duration-300">
            <div className="size-16 rounded-full bg-black-900 border border-neutral-800 flex items-center justify-center text-gold-400 mb-4 shadow-inner">
                <PackageSearch className="size-8" />
            </div>

            <h3 className="font-playfair font-bold text-xl sm:text-2xl text-white mb-2">
                Live Order Tracking
            </h3>

            <p className="font-hanken text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed">
                Enter your Email Address and Order ID in the form above to check
                the real-time shipping updates, dispatch status, and delivery
                timeline.
            </p>
        </div>
    );
};

export default TrackOrderEmptyState;
