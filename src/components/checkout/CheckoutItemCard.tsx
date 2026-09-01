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
            `${item.casesQty} ${item.casesQty === 1 ? "Case" : "Cases"}`
        );
    }
    if (item.piecesQty && item.piecesQty > 0) {
        quantityParts.push(
            `${item.piecesQty} ${item.piecesQty === 1 ? "Piece" : "Pieces"}`
        );
    }

    const quantityText =
        quantityParts.length > 0
            ? quantityParts.join(" and ")
            : `${item.quantity || 1}`;

    const formattedPrice = (
        (item.price || 0) * (item.quantity || 1)
    ).toLocaleString();

    return (
        <div className="flex items-center justify-between gap-3 sm:gap-4 py-2 w-full">
            {/* Left: Product Image */}
            <div className="size-20 sm:size-24 bg-black-900 border border-neutral-800 rounded-lg flex items-center justify-center p-2 shrink-0 overflow-hidden shadow-sm">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Middle: Info */}
            <div className="flex flex-col flex-1 min-w-0">
                {item.category && (
                    <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-gold-400 uppercase font-hanken">
                        {item.category}
                    </span>
                )}
                <h4 className="text-sm sm:text-base font-playfair font-bold text-white line-clamp-1 mt-0.5">
                    {item.name}
                </h4>
                <p className="text-xs text-neutral-400 font-hanken mt-0.5 truncate">
                    {item.volume ? `${item.volume} • ` : ""}Quantity:{" "}
                    {quantityText}
                </p>
                <span className="text-sm sm:text-base font-bold text-gold-400 font-playfair mt-1">
                    ₦{formattedPrice}
                </span>
            </div>

            {/* Right: Remove Button */}
            <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="size-8 sm:size-9 rounded-full bg-black-900 border border-neutral-800 flex items-center justify-center text-red-500 hover:bg-red-500/10 hover:border-red-500/30 transition-all cursor-pointer shrink-0"
                title="Remove item"
                aria-label={`Remove ${item.name}`}
            >
                <Trash2 className="size-3.5 sm:size-4" />
            </button>
        </div>
    );
};

export default CheckoutItemCard;
