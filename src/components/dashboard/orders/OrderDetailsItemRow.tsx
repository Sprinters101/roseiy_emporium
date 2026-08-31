import React from "react";
import type { OrderItemDetail } from "./types";

interface OrderDetailsItemRowProps {
    item: OrderItemDetail;
}

export const OrderDetailsItemRow: React.FC<OrderDetailsItemRowProps> = ({
    item,
}) => {
    return (
        <div className="border-y border-y-neutral-800/80 py-3 sm:py-3.5 flex flex-row items-center justify-between gap-4 transition-all hover:bg-white/[0.01]">
            {/* Left: Thumbnail & Details */}
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                {/* Thumbnail */}
                <div className="size-12 sm:size-16 rounded-lg bg-black-900 flex items-center justify-center p-1 border border-neutral-800/50 shrink-0 overflow-hidden shadow-md">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Details */}
                <div className="flex flex-col min-w-0">
                    <span className="text-[0.5rem] sm:text-xs font-semibold text-gold-400 tracking-wider uppercase font-hanken">
                        {item.category}
                    </span>
                    <h4 className="font-playfair font-bold text-[0.8125rem] sm:text-base text-white truncate mt-0.5">
                        {item.name}
                    </h4>
                    <span className="text-[0.5rem] sm:text-sm text-neutral-400 font-hanken mt-0.5 truncate">
                        {item.volume} • {item.quantityText}
                    </span>
                </div>
            </div>

            {/* Right: Price */}
            <span className="font-playfair font-bold text-[0.8125rem] sm:text-base text-white whitespace-nowrap shrink-0">
                {item.price}
            </span>
        </div>
    );
};

export default OrderDetailsItemRow;
