import { topFlourishOrnament } from "@/lib/site_data";

interface ShopEmptyStateProps {
    totalActiveFilters: number;
    onClearFilters: () => void;
}

export const ShopEmptyState = ({
    totalActiveFilters,
    onClearFilters,
}: ShopEmptyStateProps) => {
    const isFiltered = totalActiveFilters > 0;

    return (
        <div className="bg-[#111111] border border-neutral-800/80 rounded-2xl p-8 sm:p-16 flex flex-col items-center text-center min-h-[500px] justify-center">
            <div className="relative w-full max-w-sm mb-6 flex justify-center">
                <img
                    src="/icon/sideDrink.png"
                    alt="No drinks match"
                    className="w-full h-auto max-h-56 object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                />
            </div>

            <img
                src={topFlourishOrnament}
                alt=""
                className="w-full max-w-xs h-auto object-contain mb-4 opacity-90"
            />

            <h2 className="text-white font-playfair text-2xl sm:text-4xl font-bold mb-3">
                {isFiltered
                    ? "No Drinks Match Your Filters"
                    : "We Couldn't Find That Bottle"}
            </h2>

            <p className="text-neutral-400 font-hanken text-sm sm:text-base max-w-md mb-8 leading-relaxed">
                {isFiltered
                    ? "Try adjusting your filters or explore another category to discover more exceptional selections."
                    : "Try another search or browse our curated collection."}
            </p>

            {isFiltered && (
                <button
                    onClick={onClearFilters}
                    className="px-8 py-3 bg-transparent border border-neutral-600 hover:border-white text-white font-hanken font-medium text-sm rounded-md transition-colors cursor-pointer"
                >
                    Clear Filters
                </button>
            )}
        </div>
    );
};
