import React from "react";
import { Info } from "lucide-react";
import type { CartItem } from "@/context/CartContext";
import { CheckoutItemCard } from "./CheckoutItemCard";

export interface OrderSummarySectionProps {
    items: CartItem[];
    onRemoveItem: (id: string) => void;
    subtotal: number;
    deliveryFee: number;
    total: number;
}

export const OrderSummarySection: React.FC<OrderSummarySectionProps> = ({
    items,
    onRemoveItem,
    subtotal,
    deliveryFee,
    total,
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
                    Order Summary ({totalItemCount})
                </h2>

                {/* Items List */}
                <div className="flex flex-col gap-3.5 max-h-96 overflow-y-auto pr-1">
                    {items.length === 0 ? (
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

                    <div className="flex items-center justify-between text-xs sm:text-sm font-hanken">
                        <span className="text-neutral-300">Delivery Fee</span>
                        <span className="text-white font-bold font-hanken">
                            {deliveryFee === 0
                                ? "FREE"
                                : `₦${deliveryFee.toLocaleString()}`}
                        </span>
                    </div>
                </div>

                {/* Free Delivery Notice Banner */}
                <div className="flex items-center gap-2 text-xs text-gold-300 font-hanken mt-3.5 px-1">
                    <Info className="size-4 text-gold-400 shrink-0" />
                    <span>
                        Delivery is free for purchases above 1 million naira
                    </span>
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
