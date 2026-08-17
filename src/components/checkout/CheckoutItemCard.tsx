import React from "react";
import { Trash2 } from "lucide-react";
import type { CartItem } from "@/context/CartContext";

export interface CheckoutItemCardProps {
    item: CartItem;
    onRemove: (id: string) => void;
}

export const CheckoutItemCard: React.FC<CheckoutItemCardProps> = ({
    item,
    onRemove,
}) => {
    // Format quantity text breakdown e.g. "1 Case and 2 Pieces" or "Quantity: 3"
    const quantityParts: string[] = [];
    if (item.casesQty && item.casesQty > 0) {
        quantityParts.push(
            `${item.casesQty} ${item.casesQty === 1 ? "Case" : "Cases"}`,
        );
    }
    if (item.piecesQty && item.piecesQty > 0) {
        quantityParts.push(
            `${item.piecesQty} ${item.piecesQty === 1 ? "Piece" : "Pieces"}`,
        );
    }

    const quantityText =
        quantityParts.length > 0
            ? quantityParts.join(" and ")
            : `${item.quantity || 1}`;

    return (
        <div className=" rounded-lg  flex items-center justify-between gap-4">
            {/* Left: Product Image */}
            <div className="size-[7.3125rem] md:size-[150px]  bg-black-800 rounded-md flex items-center justify-center shrink-0 overflow-hidden p-1 border border-white/5">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full max-h-[4.75rem] md:max-h-full h-full object-contain"
                />
            </div>

            {/* Middle: Info */}
            <div className="flex flex-col flex-1 min-w-0 pr-1">
                {item.category && (
                    <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-gold-500 uppercase font-hanken">
                        {item.category}
                    </span>
                )}
                <h4 className="text-sm sm:text-base font-playfair font-bold text-white line-clamp-2 leading-tight mt-0.5">
                    {item.name}
                </h4>
                <p className="text-[8px] sm:text-xs text-neutral-400 font-hanken mt-0.5 truncatse">
                    {item.volume ? `${item.volume} • ` : ""}Quantity:{" "}
                    {quantityText}
                </p>
                <span className="text-sm sm:text-base font-bold text-gold-500 font-playfair mt-1">
                    ₦
                    {item.price
                        ? (item.price * (item.quantity || 1)).toLocaleString()
                        : "0"}
                </span>
            </div>

            {/* Right: Remove Button */}
            <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="size-6 md:size-8 rounded-full bg-black-900 hover:bg-red-950/40 flex items-center justify-center text-red-500 hover:text-red-400 transition-all cursor-pointer shrink-0 self-start mt-1"
                title="Remove item"
                aria-label="Remove item"
            >
                <Trash2 className="size-2.5 md:size-4" />
            </button>
        </div>
    );
};

export default CheckoutItemCard;
