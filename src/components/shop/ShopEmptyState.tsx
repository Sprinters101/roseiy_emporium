import React from "react";
import { topFlourishOrnament } from "@/lib/site_data";

export interface ShopEmptyStateProps {
    totalActiveFilters?: number;
    onClearFilters?: () => void;
    title?: string;
    description?: string;
    buttonText?: string;
    onButtonClick?: () => void;
    imageSrc?: string;
    className?: string;
    isCartEmpty?: boolean;
}

export const ShopEmptyState: React.FC<ShopEmptyStateProps> = ({
    totalActiveFilters = 0,
    onClearFilters,
    title,
    description,
    buttonText,
    onButtonClick,
    imageSrc,
    className = "",
    isCartEmpty = false,
}) => {
    const isFiltered = totalActiveFilters > 0;

    // Display values for cart vs shop empty states
    const defaultTitle = isCartEmpty
        ? "Your Cart Is Empty"
        : isFiltered
          ? "No Drinks Match Your Filters"
          : "We Couldn't Find That Bottle";

    const defaultDescription = isCartEmpty
        ? "It looks like your cart is empty. Consider adjusting your filters or browsing a different category to find some amazing items!"
        : isFiltered
          ? "Try adjusting your filters or explore another category to discover more exceptional selections."
          : "Try another search or browse our curated collection.";

    const displayTitle = title || defaultTitle;
    const displayDescription = description || defaultDescription;
    const displayButtonText =
        buttonText || (isCartEmpty ? "Start Shopping" : "Clear Filters");

    const handleAction = () => {
        if (onButtonClick) {
            onButtonClick();
        } else if (onClearFilters) {
            onClearFilters();
        }
    };

    return (
        <div
            className={`bg-transparent flex flex-col items-center justify-center text-center p-6 sm:p-8 space-y-4 ${className}`}
        >
            {/* Header Graphic */}
            <div className="relative w-full max-w-xs mb-2 flex justify-center">
                <img
                    src={imageSrc || "/icon/empty.svg"}
                    alt="Empty State"
                    className="w-full h-auto max-h-48 sm:max-h-56 object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                />
            </div>

            {/* Flourish Decorative Ornament Divider */}
            <img
                src={topFlourishOrnament}
                alt=""
                className="w-full max-w-50 sm:max-w-xs h-auto object-contain my-2 opacity-90"
            />

            {/* Heading */}
            <h2 className="text-white font-playfair text-2xl sm:text-3xl font-bold tracking-wide">
                {displayTitle}
            </h2>

            {/* Description */}
            <p className="text-neutral-400 font-hanken text-xs sm:text-sm max-w-sm leading-relaxed">
                {displayDescription}
            </p>

            {/* Action CTA Button */}
            {(onButtonClick || onClearFilters || isCartEmpty || isFiltered) && (
                <button
                    type="button"
                    onClick={handleAction}
                    className="mt-4 px-8 py-3 bg-transparent border border-white/40 hover:border-gold-400 text-white font-hanken font-medium text-sm rounded-lg transition-colors cursor-pointer hover:bg-white/10 active:scale-95"
                >
                    {displayButtonText}
                </button>
            )}
        </div>
    );
};

export default ShopEmptyState;
