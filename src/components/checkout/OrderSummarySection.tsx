import React from "react";
import type { CartItem } from "@/context/CartContext";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckoutItemCard } from "./CheckoutItemCard";

export interface OrderSummarySectionProps {
    items: CartItem[];
    onRemoveItem: (id: string) => void;
    subtotal: number;
    total: number;
    isLoading?: boolean;
}

export const OrderSummarySection: React.FC<OrderSummarySectionProps> = ({
    items,
    onRemoveItem,
    subtotal,
    total,
    isLoading = false,
}) => {
    const totalItemCount = items.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0
    );

    return (
        <div className="bg-black-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-neutral-800/60 shadow-xl flex flex-col justify-between h-fit w-full">
            <div>
                {/* Section Title */}
                <h2 className="font-playfair font-bold text-xl sm:text-[1.25rem] text-white mb-4">
                    Order Summary ({isLoading ? "..." : totalItemCount})
                </h2>

                {/* Items List */}
                <div className="flex flex-col gap-3.5 max-h-96 overflow-y-auto pr-1">
                    {isLoading ? (
                        Array.from({ length: 2 }).map((_, i) => (
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
                        ))
                    ) : items.length === 0 ? (
                        <div className="py-8 text-center text-neutral-400 text-sm font-hanken bg-black-900/50 rounded-lg border border-neutral-800/50 p-4">
                            Your cart is currently empty.
                        </div>
                    ) : (
                        items.map((item) => (
                            <CheckoutItemCard
                                key={item.id}
                                item={item}
                                onRemove={onRemoveItem}
                            />
                        ))
                    )}
                </div>

                {/* Breakdown Card */}
                <div className="bg-black-900 rounded-xl p-4 sm:p-5 flex flex-col gap-3 mt-6 border border-neutral-800/50">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-hanken">
                        <span className="text-neutral-300">Subtotal</span>
                        <span className="text-white font-bold font-hanken">
                            ₦{subtotal.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Total Display Box */}
            <div className="bg-black-900 rounded-xl p-5 flex items-center justify-between mt-6 border border-neutral-800/50">
                <span className="font-playfair font-bold text-xl sm:text-2xl text-gold-400">
                    Total
                </span>
                <span className="font-playfair font-bold text-xl sm:text-2xl text-gold-400">
                    ₦{total.toLocaleString()}
                </span>
            </div>
        </div>
    );
};

export default OrderSummarySection;
