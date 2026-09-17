import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router";
import type { Product } from "@/config/types";
import { PRICE_RANGES, type FilterOption } from "./shopData";

export const isCategoryMatch = (
    cat: FilterOption,
    query: string,
): boolean => {
    if (!cat || !query) return false;
    const qLower = query.toLowerCase().trim();
    const qClean = qLower.replace(/[^a-z0-9]/g, "");

    const idMatch = cat.id === query;
    const slugMatch =
        !!cat.slug && cat.slug.toLowerCase().trim() === qLower;
    const labelMatch = cat.label.toLowerCase().trim() === qLower;
    const cleanMatch =
        cat.label.toLowerCase().replace(/[^a-z0-9]/g, "") === qClean ||
        (cat.slug
            ? cat.slug.toLowerCase().replace(/[^a-z0-9]/g, "") === qClean
            : false);

    return idMatch || slugMatch || labelMatch || cleanMatch;
};

export const isBrandMatch = (
    brand: FilterOption,
    query: string,
): boolean => {
    if (!brand || !query) return false;
    const qLower = query.toLowerCase().trim();
    const qClean = qLower.replace(/[^a-z0-9]/g, "");

    const idMatch = brand.id === query;
    const slugMatch =
        !!brand.slug && brand.slug.toLowerCase().trim() === qLower;
    const labelMatch = brand.label.toLowerCase().trim() === qLower;
    const cleanMatch =
        brand.label.toLowerCase().replace(/[^a-z0-9]/g, "") === qClean ||
        (brand.slug
            ? brand.slug.toLowerCase().replace(/[^a-z0-9]/g, "") === qClean
            : false);

    return idMatch || slugMatch || labelMatch || cleanMatch;
};

export const useShopFilters = (
    initialProducts: (Product & { brandId?: string; categoryId?: string })[],
    customBrands: FilterOption[] = [],
    customCategories: FilterOption[] = [],
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

    // Sync with URL parameters and resolve with categories
    useEffect(() => {
        const cat = searchParams.get("category");
        if (cat) {
            const matched = customCategories.find((c) => isCategoryMatch(c, cat));
            const targetId = matched ? matched.id : cat;

            setSelectedCategories((prev) => {
                const alreadySelected = prev.some(
                    (p) =>
                        p === targetId ||
                        p === cat ||
                        (matched && isCategoryMatch(matched, p)),
                );
                if (alreadySelected) return prev;
                return [...prev, targetId];
            });
        }
    }, [searchParams, customCategories]);

    // Sync with URL parameters and resolve with brands
    useEffect(() => {
        const br = searchParams.get("brand");
        if (br) {
            const matched = customBrands.find((b) => isBrandMatch(b, br));
            const targetId = matched ? matched.id : br;

            setSelectedBrands((prev) => {
                const alreadySelected = prev.some(
                    (p) =>
                        p === targetId ||
                        p === br ||
                        (matched && isBrandMatch(matched, p)),
                );
                if (alreadySelected) return prev;
                return [...prev, targetId];
            });
        }
    }, [searchParams, customBrands]);

    // Toggle handlers
    const toggleCategory = (id: string) => {
        setSelectedCategories((prev) => {
            const matchingCategory = customCategories.find(
                (c) => isCategoryMatch(c, id) || c.id === id,
            );

            const isCurrentlySelected = prev.some((p) => {
                if (p === id) return true;
                if (
                    matchingCategory &&
                    (isCategoryMatch(matchingCategory, p) ||
                        p === matchingCategory.id)
                ) {
                    return true;
                }
                return false;
            });

            if (isCurrentlySelected) {
                return prev.filter((p) => {
                    if (p === id) return false;
                    if (
                        matchingCategory &&
                        (isCategoryMatch(matchingCategory, p) ||
                            p === matchingCategory.id)
                    ) {
                        return false;
                    }
                    return true;
                });
            } else {
                return [...prev, matchingCategory ? matchingCategory.id : id];
            }
        });
    };

    const toggleBrand = (id: string) => {
        setSelectedBrands((prev) => {
            const matchingBrand = customBrands.find(
                (b) => isBrandMatch(b, id) || b.id === id,
            );

            const isCurrentlySelected = prev.some((p) => {
                if (p === id) return true;
                if (
                    matchingBrand &&
                    (isBrandMatch(matchingBrand, p) ||
                        p === matchingBrand.id)
                ) {
                    return true;
                }
                return false;
            });

            if (isCurrentlySelected) {
                return prev.filter((p) => {
                    if (p === id) return false;
                    if (
                        matchingBrand &&
                        (isBrandMatch(matchingBrand, p) ||
                            p === matchingBrand.id)
                    ) {
                        return false;
                    }
                    return true;
                });
            } else {
                return [...prev, matchingBrand ? matchingBrand.id : id];
            }
        });
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
                const matchesCat = selectedCategories.some((catFilter) => {
                    const matchedCategoryObj = customCategories.find(
                        (c) =>
                            isCategoryMatch(c, catFilter) ||
                            c.id === catFilter,
                    );

                    const targetId = matchedCategoryObj?.id || catFilter;
                    const targetLabel = (
                        matchedCategoryObj?.label || catFilter
                    ).toLowerCase();
                    const targetClean = targetLabel.replace(/[^a-z0-9]/g, "");

                    const prodCatId = (product as any).categoryId;
                    const prodCatName = (
                        (product as any).category?.name ||
                        product.category ||
                        ""
                    ).toLowerCase();
                    const prodCatClean = prodCatName.replace(/[^a-z0-9]/g, "");
                    const prodCatSlug = (
                        (product as any).category?.slug || ""
                    ).toLowerCase();

                    return (
                        (prodCatId &&
                            (prodCatId === targetId ||
                                prodCatId === catFilter)) ||
                        (prodCatName &&
                            (prodCatName === targetLabel ||
                                prodCatName === catFilter.toLowerCase() ||
                                prodCatClean === targetClean ||
                                prodCatClean ===
                                    catFilter
                                        .toLowerCase()
                                        .replace(/[^a-z0-9]/g, ""))) ||
                        (prodCatSlug &&
                            (prodCatSlug ===
                                (
                                    matchedCategoryObj?.slug || ""
                                ).toLowerCase() ||
                                prodCatSlug === catFilter.toLowerCase() ||
                                prodCatSlug.replace(/[^a-z0-9]/g, "") ===
                                    targetClean))
                    );
                });
                if (!matchesCat) return false;
            }

            if (selectedBrands.length > 0) {
                const matchesBrand = selectedBrands.some((brandFilter) => {
                    const matchedBrandObj = customBrands.find(
                        (b) =>
                            isBrandMatch(b, brandFilter) ||
                            b.id === brandFilter,
                    );

                    const targetId = matchedBrandObj?.id || brandFilter;
                    const targetLabel = (
                        matchedBrandObj?.label || brandFilter
                    ).toLowerCase();
                    const targetClean = targetLabel.replace(/[^a-z0-9]/g, "");

                    const prodBrandId = (product as any).brandId;
                    const prodBrandName = (
                        (product as any).brand?.name ||
                        product.brand ||
                        ""
                    ).toLowerCase();
                    const prodBrandClean = prodBrandName.replace(
                        /[^a-z0-9]/g,
                        "",
                    );
                    const prodBrandSlug = (
                        (product as any).brand?.slug || ""
                    ).toLowerCase();
                    const prodName = product.name.toLowerCase();

                    return (
                        (prodBrandId &&
                            (prodBrandId === targetId ||
                                prodBrandId === brandFilter)) ||
                        (prodBrandName &&
                            (prodBrandName === targetLabel ||
                                prodBrandName === brandFilter.toLowerCase() ||
                                prodBrandClean === targetClean ||
                                prodBrandClean ===
                                    brandFilter
                                        .toLowerCase()
                                        .replace(/[^a-z0-9]/g, ""))) ||
                        (prodBrandSlug &&
                            (prodBrandSlug ===
                                (
                                    matchedBrandObj?.slug || ""
                                ).toLowerCase() ||
                                prodBrandSlug ===
                                    brandFilter.toLowerCase())) ||
                        prodName.includes(targetLabel) ||
                        prodName.includes(brandFilter.toLowerCase())
                    );
                });
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
        customCategories,
        customBrands,
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
