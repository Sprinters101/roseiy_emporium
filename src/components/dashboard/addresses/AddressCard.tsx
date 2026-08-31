import React from "react";
import { PenLine, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AddressItem } from "./types";

export interface AddressCardProps {
    address: AddressItem;
    isSelected: boolean;
    onSelect: (id: string) => void;
    onEdit: (address: AddressItem) => void;
    onDelete: (id: string) => void;
}

export const AddressCard: React.FC<AddressCardProps> = ({
    address,
    isSelected,
    onSelect,
    onEdit,
    onDelete,
}) => {
    return (
        <div
            onClick={() => onSelect(address.id)}
            className={cn(
                "bg-black-700 rounded-xl sm:rounded-2xl p-5 sm:p-6 transition-all duration-200 cursor-pointer flex items-start justify-between gap-4 relative",
                isSelected
                    ? "border border-gold-400 shadow-[0_0_16px_rgba(228,196,91,0.08)]"
                    : "border border-neutral-800/60 hover:border-neutral-700/80"
            )}
        >
            {/* Left: Radio Selector & Address Details */}
            <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
                {/* Radio Button */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect(address.id);
                    }}
                    className="size-5 rounded-full border-2 border-gold-400 flex items-center justify-center shrink-0 mt-0.5 cursor-pointer focus:outline-none"
                    aria-label={`Select ${address.title}`}
                    aria-checked={isSelected}
                    role="radio"
                >
                    {isSelected && (
                        <div className="size-2.5 rounded-full bg-gold-400 animate-in fade-in zoom-in duration-150" />
                    )}
                </button>

                {/* Address Information Stack */}
                <div className="flex flex-col min-w-0">
                    <h3 className="font-hanken font-bold text-base sm:text-lg text-white">
                        {address.title}
                    </h3>
                    <p className="font-hanken text-xs sm:text-sm text-neutral-400 mt-1 leading-relaxed">
                        {address.address}
                    </p>
                    <p className="font-hanken text-xs sm:text-sm text-neutral-400 mt-1.5">
                        {address.phone}
                    </p>
                </div>
            </div>

            {/* Right: Action Buttons (Edit & Delete) */}
            <div
                className="flex items-center gap-2 sm:gap-2.5 shrink-0"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Edit Button */}
                <button
                    type="button"
                    onClick={() => onEdit(address)}
                    className="size-8 sm:size-9 rounded-full bg-black-900 border border-neutral-800/80 flex items-center justify-center text-white hover:bg-neutral-800 hover:text-gold-400 hover:border-gold-400/40 transition-all cursor-pointer shadow-sm"
                    aria-label={`Edit ${address.title}`}
                >
                    <PenLine className="size-3.5 sm:size-4" />
                </button>

                {/* Delete Button */}
                <button
                    type="button"
                    onClick={() => onDelete(address.id)}
                    className="size-8 sm:size-9 rounded-full bg-black-900 border border-neutral-800/80 flex items-center justify-center text-red-500 hover:bg-red-500/10 hover:border-red-500/30 transition-all cursor-pointer shadow-sm"
                    aria-label={`Delete ${address.title}`}
                >
                    <Trash2 className="size-3.5 sm:size-4" />
                </button>
            </div>
        </div>
    );
};

export default AddressCard;
