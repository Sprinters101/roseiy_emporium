import { X, ChevronRight, SlidersHorizontal } from "lucide-react";
import { CustomDropdown } from "../common/CustomDropdown";
import { CATEGORIES, BRANDS, PRICE_RANGES } from "./data/shopData";

interface ShopHeaderProps {
    sortBy: string;
    totalActiveFilters: number;
    selectedCategories?: string[];
    selectedBrands?: string[];
    selectedPriceRanges?: string[];
    onSortChange: (value: string) => void;
    onOpenMobileFilters: () => void;
    onRemoveCategory?: (id: string) => void;
    onRemoveBrand?: (id: string) => void;
    onRemovePrice?: (id: string) => void;
    onClearAll?: () => void;
}

export const ShopHeader = ({
    sortBy,
    totalActiveFilters,
    selectedCategories = [],
    selectedBrands = [],
    selectedPriceRanges = [],
    onSortChange,
    onOpenMobileFilters,
    onRemoveCategory,
    onRemoveBrand,
    onRemovePrice,
    onClearAll,
}: ShopHeaderProps) => {
    const SORT_OPTIONS = [
        { label: "Recommended", value: "Recommended" },
        { label: "Newest", value: "Newest" },
        { label: "Price: Low to High", value: "PriceLowHigh" },
        { label: "Price: High to Low", value: "PriceHighLow" },
        { label: "Arrivals", value: "Arrivals" },
        { label: "A-Z", value: "AZ" },
        { label: "Z-A", value: "ZA" },
    ];

    return (
        <div className="flex flex-col gap-4 mb-6 md:mb-">
            {/* Controls Bar: Filters Button (Mobile) + Sort By (All Screens) */}
            <div className="grid grid-cols-2 lg:flex lg:justify-between gap-3 w-full">
                <div className="col-span-2">
                    <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest font-hanken mb-1">
                        <span>Home</span>
                        <ChevronRight className="size-3.5" />
                        <span className="text-gold-500 font-medium">Shop</span>
                    </div>
                    <h1 className="text-white font-playfair text-3xl md:text-hg-b2 font-bold tracking-tight">
                        SHOP
                    </h1>
                </div>

                {/* Mobile Filter Trigger Button */}
                <button
                    type="button"
                    onClick={onOpenMobileFilters}
                    className="lg:hidden flex items-center justify-between bg-[#111111] border border-neutral-800 text-white text-xs sm:text-sm rounded-md px-4 py-2.5 font-hanken cursor-pointer hover:border-neutral-700 transition-colors"
                >
                    <span>Filters ({totalActiveFilters})</span>
                    <SlidersHorizontal className="size-3.5 text-neutral-400" />
                </button>

                {/* Sort By Dropdown */}
                <div className="relative w-full lg:w-auto">
                    <CustomDropdown
                        options={SORT_OPTIONS}
                        value={sortBy}
                        onChange={onSortChange}
                        className="min-w-44"
                    />
                </div>
            </div>

            {/* Filtered active brand & category list horizontally scrollable */}
            {totalActiveFilters > 0 && (
                <div className="md:flex items-center gap-3 overflow-x-auto  scrollbar-none max-w-full hidden">
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
                        {selectedCategories.map((catId) => {
                            const label =
                                CATEGORIES.find((c) => c.id === catId)?.label ||
                                catId;
                            return (
                                <button
                                    key={`cat-${catId}`}
                                    type="button"
                                    onClick={() => onRemoveCategory?.(catId)}
                                    className="flex flex-row-reverse items-center gap-1.5 bg-black-700 border-none rounded-[8px] text-white text-xs font-hanken  px-2 py-1.5 hover:border-gold-500/80 hover:text-gold-300 transition-all shrink-0 cursor-pointer group"
                                >
                                    <X className="size-3.5 text-white group-hover:text-gold-500 transition-colors" />
                                    <span>{label}</span>
                                </button>
                            );
                        })}

                        {selectedBrands.map((brandId) => {
                            const label =
                                BRANDS.find((b) => b.id === brandId)?.label ||
                                brandId;
                            return (
                                <button
                                    key={`brand-${brandId}`}
                                    type="button"
                                    onClick={() => onRemoveBrand?.(brandId)}
                                    className="flex flex-row-reverse items-center gap-1.5 bg-black-700 border-none rounded-[8px] text-white text-xs font-hanken  px-2 py-1.5 hover:border-gold-500/80 hover:text-gold-300 transition-all shrink-0 cursor-pointer group"
                                >
                                    <X className="size-3.5 text-white group-hover:text-gold-500 transition-colors" />
                                    <span>{label}</span>
                                </button>
                            );
                        })}

                        {selectedPriceRanges.map((priceId) => {
                            const label =
                                PRICE_RANGES.find((p) => p.id === priceId)
                                    ?.label || priceId;
                            return (
                                <button
                                    key={`price-${priceId}`}
                                    type="button"
                                    onClick={() => onRemovePrice?.(priceId)}
                                    className="flex flex-row-reverse items-center gap-1.5 bg-black-700 border-none rounded-[8px] text-white text-xs font-hanken  px-2 py-1.5 hover:border-gold-500/80 hover:text-gold-300 transition-all shrink-0 cursor-pointer group"
                                >
                                    <X className="size-3.5 text-white group-hover:text-gold-500 transition-colors" />
                                    <span>{label}</span>
                                </button>
                            );
                        })}

                        {onClearAll && (
                            <button
                                type="button"
                                onClick={onClearAll}
                                className="text-xs text-gold-500 hover:underline font-hanken ml-2 shrink-0 cursor-pointer font-medium"
                            >
                                Clear All
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
