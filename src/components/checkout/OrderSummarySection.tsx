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
        0,
    );

    return (
        <div className="bg-black-700 rounded-sm py-6  px-4 sm:p-8 flex flex-col justify-between h-fit ">
            <div>
                {/* Section Title */}
                <h2 className="text-xl sm:text-base font-playfair font-bold text-white mb-6">
                    Order Summary ({totalItemCount})
                </h2>

                {/* Items List */}
                <div className="flex flex-col gap-4 max-h-110 overflow-y-auto pr-1">
                    {items.length === 0 ? (
                        <div className="py-8 text-center text-white text-sm font-hanken bg-black-900/50 rounded-lg border border-neutral-800/50 p-4">
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
                <div className="bg-black-900 rounded-sm p-4 sm:p-5 flex flex-col gap-3 mt-6 ">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-hanken">
                        <span className="text-white">Subtotal</span>
                        <span className="text-white font-bold font-mono">
                            ₦{subtotal.toLocaleString()}
                        </span>
                    </div>

                    <div className="flex items-center justify-between text-sm sm:text-sm font-hanken">
                        <span className="text-white">Delivery Fee</span>
                        <span className="text-white font-bold font-mono">
                            {deliveryFee === 0
                                ? "FREE"
                                : `₦${deliveryFee.toLocaleString()}`}
                        </span>
                    </div>
                </div>

                {/* Free Delivery Notice Banner */}
                <div className="flex items-center gap-2 text-xs  font-medium mt-3.5 px-1">
                    <Info className="size-4 text-gold-500 shrink-0" />
                    <span>
                        Delivery is free for purchases above 1 million naira
                    </span>
                </div>
            </div>

            {/* Total Display Box */}
            <div className="bg-black-900 rounded-xs p-2 md:p-5 flex items-center justify-between mt-6 ">
                <span className="text-body-c1 sm:text-lg font-bold font-hanken text-gold-500">
                    Total
                </span>
                <span className="text-body-c1 sm:text-2xl font-bold font-playfair text-gold-500">
                    ₦{total.toLocaleString()}
                </span>
            </div>
        </div>
    );
};

export default OrderSummarySection;
