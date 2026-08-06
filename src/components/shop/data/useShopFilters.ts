import { useState, useMemo } from "react";
import type { Product } from "@/config/types";
import { BRANDS, PRICE_RANGES } from "./shopData";

export const useShopFilters = (initialProducts: Product[]) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>(
        [],
    );
    const [brandSearch, setBrandSearch] = useState("");
    const [sortBy, setSortBy] = useState("Recommended");

    // Toggle handlers
    const toggleCategory = (id: string) => {
        setSelectedCategories((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id],
        );
    };

    const toggleBrand = (id: string) => {
        setSelectedBrands((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id],
        );
    };

    const togglePrice = (id: string) => {
        setSelectedPriceRanges((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id],
        );
    };

    const clearAllFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setSelectedPriceRanges([]);
        setBrandSearch("");
    };

    const totalActiveFilters =
        selectedCategories.length +
        selectedBrands.length +
        selectedPriceRanges.length;

    // Filtered brand search list for sidebar
    const filteredBrandList = useMemo(() => {
        return BRANDS.filter((b) =>
            b.label.toLowerCase().includes(brandSearch.toLowerCase()),
        );
    }, [brandSearch]);

    // Active product filtering computation
    const filteredProducts = useMemo(() => {
        return initialProducts.filter((product) => {
            if (
                selectedCategories.length > 0 &&
                !selectedCategories.includes(product.category)
            ) {
                return false;
            }

            if (selectedBrands.length > 0) {
                const matchesBrand = selectedBrands.some((b) =>
                    product.name.toLowerCase().includes(b.toLowerCase()),
                );
                if (!matchesBrand) return false;
            }

            if (selectedPriceRanges.length > 0) {
                const matchesPrice = selectedPriceRanges.some((rangeId) => {
                    const range = PRICE_RANGES.find((r) => r.id === rangeId);
                    if (!range) return false;
                    return (
                        product.price >= range.min && product.price <= range.max
                    );
                });
                if (!matchesPrice) return false;
            }

            return true;
        });
    }, [
        initialProducts,
        selectedCategories,
        selectedBrands,
        selectedPriceRanges,
    ]);

    return {
        selectedCategories,
        selectedBrands,
        selectedPriceRanges,
        brandSearch,
        sortBy,
        totalActiveFilters,
        filteredBrandList,
        filteredProducts,
        setBrandSearch,
        setSortBy,
        toggleCategory,
        toggleBrand,
        togglePrice,
        clearAllFilters,
    };
};
