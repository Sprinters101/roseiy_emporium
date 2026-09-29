import React from "react";
import type { CartItem } from "@/context/CartContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { CheckoutItemCard } from "./CheckoutItemCard";

export interface OrderSummarySectionProps {
    items: CartItem[];
    onRemoveItem: (id: string) => void;
    subtotal: number;
    deliveryFee?: number;
    deliveryAreaName?: string;
    isFreeDeliveryUnlocked?: boolean;
    total: number;
    isLoading?: boolean;
    isSubmitting?: boolean;
    isProcessing?: boolean;
    isSubmitType?: boolean;
    onPay?: () => void;
    showPayButton?: boolean;
}

export const OrderSummarySection: React.FC<OrderSummarySectionProps> = ({
    items,
    onRemoveItem,
    subtotal,
    deliveryFee = 0,
    deliveryAreaName,
    isFreeDeliveryUnlocked = false,
    total,
    isLoading = false,
    isSubmitting = false,
    isProcessing = false,
    isSubmitType = false,
    onPay,
    showPayButton = true,
}) => {
    const totalItemCount = items.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0,
    );

    const isBusy = isProcessing || isSubmitting;
    const isPayDisabled = isBusy || items.length === 0;

    return (
        <div className="bg-black-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-neutral-800/60 shadow-xl flex flex-col justify-between h-fit w-full gap-6">
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
                    <div className="flex items-center justify-between text-xs sm:text-sm font-hanken">
                        <div className="flex flex-col min-w-0 pr-2">
                            <span className="text-neutral-300">Delivery</span>
                            <span className="text-[11px] text-neutral-400 font-light truncate max-w-[200px]">
                                {deliveryAreaName || "Store Pickup / None"}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                            {isFreeDeliveryUnlocked && deliveryAreaName && (
                                <span className="text-[10px] uppercase font-bold text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">
                                    Free
                                </span>
                            )}
                            <span className="text-white font-bold font-hanken">
                                {deliveryFee !== undefined && deliveryFee > 0
                                    ? `₦${deliveryFee.toLocaleString()}`
                                    : "₦0"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Total Display Box */}
                <div className="bg-black-900 rounded-xl p-5 flex items-center justify-between mt-4 border border-neutral-800/50">
                    <span className="font-playfair font-bold text-xl sm:text-2xl text-gold-400">
                        Total
                    </span>
                    <span className="font-playfair font-bold text-xl sm:text-2xl text-gold-400">
                        ₦{total.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Pay Button at the bottom of Order Summary (Mobile Only) */}
            {showPayButton && (
                <button
                    type={isSubmitType ? "submit" : "button"}
                    onClick={!isSubmitType ? onPay : undefined}
                    disabled={isPayDisabled}
                    className="lg:hidden w-full h-12 bg-gold-gradient text-black-900 font-bold font-hanken text-sm sm:text-base px-6 rounded-sm sm:rounded-md shadow-xl hover:opacity-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-center gap-2"
                >
                    {isBusy && <Loader2 className="size-4 animate-spin" />}
                    <span>
                        {isBusy
                            ? isSubmitType
                                ? "Processing Payment..."
                                : "Initializing Payment..."
                            : `Pay ₦${total.toLocaleString()}`}
                    </span>
                </button>
            )}
        </div>
    );
};

export default OrderSummarySection;
