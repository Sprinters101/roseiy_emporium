import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router";
import type { Product } from "@/config/types";
import { PRICE_RANGES, type FilterOption } from "./shopData";

export const useShopFilters = (
    initialProducts: (Product & { brandId?: string; categoryId?: string })[],
    customBrands: FilterOption[] = [],
) => {
    const [searchParams] = useSearchParams();
    const urlCategory = searchParams.get("category");
    const urlBrand = searchParams.get("brand");

    const [selectedCategories, setSelectedCategories] = useState<string[]>(() =>
        urlCategory ? [urlCategory] : [],
    );
    const [selectedBrands, setSelectedBrands] = useState<string[]>(() =>
        urlBrand ? [urlBrand] : [],
    );
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
    const [brandSearch, setBrandSearch] = useState("");
    const [sortBy, setSortBy] = useState("Recommended");

    // Sync with URL parameters if they change
    useEffect(() => {
        const cat = searchParams.get("category");
        if (cat && !selectedCategories.includes(cat)) {
            setSelectedCategories((prev) => (prev.includes(cat) ? prev : [...prev, cat]));
        }
        const br = searchParams.get("brand");
        if (br && !selectedBrands.includes(br)) {
            setSelectedBrands((prev) => (prev.includes(br) ? prev : [...prev, br]));
        }
    }, [searchParams]);

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
        return customBrands.filter((b) =>
            b.label.toLowerCase().includes(brandSearch.toLowerCase()),
        );
    }, [customBrands, brandSearch]);

    // Active product filtering & sorting computation
    const filteredProducts = useMemo(() => {
        let result = initialProducts.filter((product) => {
            if (selectedCategories.length > 0) {
                const matchesCat = selectedCategories.some(
                    (catId) =>
                        catId === (product as any).categoryId ||
                        catId.toLowerCase() === (product.category || "").toLowerCase(),
                );
                if (!matchesCat) return false;
            }

            if (selectedBrands.length > 0) {
                const matchesBrand = selectedBrands.some(
                    (brandId) =>
                        brandId === (product as any).brandId ||
                        (product.brand &&
                            product.brand.toLowerCase() === brandId.toLowerCase()) ||
                        product.name.toLowerCase().includes(brandId.toLowerCase()),
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

        // Apply Sorting
        switch (sortBy) {
            case "PriceLowHigh":
                result = [...result].sort((a, b) => a.price - b.price);
                break;
            case "PriceHighLow":
                result = [...result].sort((a, b) => b.price - a.price);
                break;
            case "AZ":
                result = [...result].sort((a, b) =>
                    a.name.localeCompare(b.name),
                );
                break;
            case "ZA":
                result = [...result].sort((a, b) =>
                    b.name.localeCompare(a.name),
                );
                break;
            case "Newest":
            case "Arrivals":
            case "Recommended":
            default:
                break;
        }

        return result;
    }, [
        initialProducts,
        selectedCategories,
        selectedBrands,
        selectedPriceRanges,
        sortBy,
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

export default useShopFilters;
