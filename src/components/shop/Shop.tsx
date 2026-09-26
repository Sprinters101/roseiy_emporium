import { useState, useMemo } from "react";
import Container from "@/components/common/Container";
import { ProductCard } from "@/components/common/ProductCard";
import { ProductCardSkeleton } from "@/components/common/ProductCardSkeleton";
import { Hero } from "@/components/common/Hero";
import { products as mockProducts } from "@/lib/site_data";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useShopFilters } from "./data/useShopFilters";
import { ShopHeader } from "./ShopHeader";
import { ShopSidebar } from "./ShopSidebar";
import { ShopEmptyState } from "./ShopEmptyState";
import {
    useGetProducts,
    useGetCategories,
    useGetBrands,
} from "@/service/queries";
import type { FilterOption } from "./data/shopData";
import type { ProductItem } from "@/service/types";

export const Shop = () => {
    const [visibleCount, setVisibleCount] = useState(12);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // 1. Fetch live categories & brands from backend
    const { data: categoriesApi, isLoading: isLoadingCategories } =
        useGetCategories();
    const { data: brandsApi, isLoading: isLoadingBrands } = useGetBrands();

    // 2. Fetch live products from backend
    const { data: productsApi, isLoading } = useGetProducts({
        limit: 100,
    });

    // Map backend products directly into the shop view (with fallback if backend is empty)
    const allProducts = useMemo(() => {
        const liveItems =
            productsApi?.data?.products || productsApi?.data?.items;
        if (liveItems && liveItems.length > 0) {
            return liveItems.map((p: ProductItem) => {
                const pieceUnit = p.sellingUnits?.find((u) =>
                    u.name.toLowerCase().includes("piece"),
                );
                const cartonUnit = p.sellingUnits?.find(
                    (u) =>
                        u.name.toLowerCase().includes("carton") ||
                        u.name.toLowerCase().includes("case"),
                );
                const primaryUnit = p.sellingUnits?.[0];

                return {
                    id: p.productId,
                    productId: p.productId,
                    slug: p.slug,
                    name: p.name,
                    brand: p.brand?.name || "",
                    brandId: p.brandId,
                    category: p.category?.name || "",
                    categoryId: p.categoryId,
                    volume: (p as any).volume || "",
                    piecesLeft: pieceUnit
                        ? pieceUnit.stock
                        : primaryUnit
                          ? primaryUnit.stock
                          : "",
                    casesLeft: cartonUnit ? cartonUnit.stock : "",
                    price: primaryUnit ? Number(primaryUnit.price) : "",
                    image:
                        p.images?.find((i) => i.isPrimary)?.imageUrl ||
                        p.images?.[0]?.imageUrl ||
                        "",
                    gallery: p.images?.map((i) => i.imageUrl) || [],
                    description: p.description || "",
                    sellingUnits: p.sellingUnits,
                };
            });
        }
        return mockProducts;
    }, [productsApi]);

    // Map backend categories strictly from server
    const categoriesList: FilterOption[] = useMemo(() => {
        const rawCategories = Array.isArray(categoriesApi?.data)
            ? categoriesApi.data
            : (categoriesApi?.data as any)?.categories ||
              (categoriesApi?.data as any)?.items ||
              [];

        if (Array.isArray(rawCategories) && rawCategories.length > 0) {
            return rawCategories.map((c: any) => {
                const serverCount =
                    c.productCount ??
                    c.productsCount ??
                    c.count ??
                    c.totalProducts;

                let count: number | string = "NIL";
                if (typeof serverCount === "number") {
                    count = serverCount;
                } else if (allProducts && allProducts.length > 0) {
                    const matchedCount = allProducts.filter(
                        (p: any) =>
                            p.categoryId === c.categoryId ||
                            (p.category &&
                                p.category.toLowerCase() ===
                                    c.name.toLowerCase()),
                    ).length;
                    count = matchedCount;
                } else {
                    count = "NIL";
                }

                return {
                    id: c.categoryId,
                    label: c.name,
                    slug: c.slug || c.name?.toLowerCase().replace(/\s+/g, "-"),
                    count,
                };
            });
        }
        return [];
    }, [categoriesApi, allProducts]);

    // Map backend brands strictly from server
    const brandsList: FilterOption[] = useMemo(() => {
        const rawBrands = Array.isArray(brandsApi?.data)
            ? brandsApi.data
            : (brandsApi?.data as any)?.brands ||
              (brandsApi?.data as any)?.items ||
              [];

        if (Array.isArray(rawBrands) && rawBrands.length > 0) {
            return rawBrands.map((b: any) => {
                const serverCount =
                    b.productCount ??
                    b.productsCount ??
                    b.count ??
                    b.totalProducts;

                let count: number | string = "NIL";
                if (typeof serverCount === "number") {
                    count = serverCount;
                } else if (allProducts && allProducts.length > 0) {
                    const matchedCount = allProducts.filter(
                        (p: any) =>
                            p.brandId === b.brandId ||
                            (p.brand &&
                                p.brand.toLowerCase() ===
                                    b.name.toLowerCase()) ||
                            p.name.toLowerCase().includes(b.name.toLowerCase()),
                    ).length;
                    count = matchedCount;
                } else {
                    count = "NIL";
                }

                return {
                    id: b.brandId,
                    label: b.name,
                    slug: b.slug || b.name?.toLowerCase().replace(/\s+/g, "-"),
                    count,
                };
            });
        }
        return [];
    }, [brandsApi, allProducts]);

    const {
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
    } = useShopFilters(allProducts as any, brandsList, categoriesList);

    return (
        <div className="bg-black-900 min-h-screen pb-24">
            <Hero />

            <Container className="pt-8 md:pt-14">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    {/* Desktop Filter Sidebar */}
                    <ShopSidebar
                        selectedCategories={selectedCategories}
                        selectedBrands={selectedBrands}
                        selectedPriceRanges={selectedPriceRanges}
                        brandSearch={brandSearch}
                        totalActiveFilters={totalActiveFilters}
                        filteredBrandList={filteredBrandList}
                        categoriesList={categoriesList}
                        isLoadingCategories={isLoadingCategories}
                        isLoadingBrands={isLoadingBrands}
                        onCategoryToggle={toggleCategory}
                        onBrandToggle={toggleBrand}
                        onPriceToggle={togglePrice}
                        onBrandSearchChange={setBrandSearch}
                        onClearAll={clearAllFilters}
                    />

                    {/* Mobile Slide-Over Filter Sheet */}
                    <Sheet
                        open={mobileFiltersOpen}
                        onOpenChange={setMobileFiltersOpen}
                    >
                        <SheetContent
                            side="bottom"
                            className="w-full top-40 bg-[#111111] p-0 border-r border-neutral-800"
                            showCloseButton={false}
                        >
                            <ShopSidebar
                                isMobileDrawer={true}
                                onCloseMobileDrawer={() =>
                                    setMobileFiltersOpen(false)
                                }
                                selectedCategories={selectedCategories}
                                selectedBrands={selectedBrands}
                                selectedPriceRanges={selectedPriceRanges}
                                brandSearch={brandSearch}
                                totalActiveFilters={totalActiveFilters}
                                filteredBrandList={filteredBrandList}
                                categoriesList={categoriesList}
                                isLoadingCategories={isLoadingCategories}
                                isLoadingBrands={isLoadingBrands}
                                onCategoryToggle={toggleCategory}
                                onBrandToggle={toggleBrand}
                                onPriceToggle={togglePrice}
                                onBrandSearchChange={setBrandSearch}
                                onClearAll={clearAllFilters}
                            />
                        </SheetContent>
                    </Sheet>

                    {/* Product Grid Area */}
                    <main className="lg:col-span-3">
                        <ShopHeader
                            sortBy={sortBy}
                            totalActiveFilters={totalActiveFilters}
                            selectedCategories={selectedCategories}
                            selectedBrands={selectedBrands}
                            selectedPriceRanges={selectedPriceRanges}
                            categoriesList={categoriesList}
                            brandsList={brandsList}
                            onSortChange={setSortBy}
                            onOpenMobileFilters={() =>
                                setMobileFiltersOpen(true)
                            }
                            onRemoveCategory={toggleCategory}
                            onRemoveBrand={toggleBrand}
                            onRemovePrice={togglePrice}
                            onClearAll={clearAllFilters}
                        />

                        {isLoading ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
                                {Array.from({ length: 8 }).map((_, idx) => (
                                    <ProductCardSkeleton key={idx} />
                                ))}
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <ShopEmptyState
                                totalActiveFilters={totalActiveFilters}
                                onClearFilters={clearAllFilters}
                            />
                        ) : (
                            <div className="flex flex-col space-y-10">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
                                    {filteredProducts
                                        .slice(0, visibleCount)
                                        .map((product) => (
                                            <ProductCard
                                                key={product.id}
                                                product={product}
                                            />
                                        ))}
                                </div>

                                <div className="flex flex-col items-center pt-4 space-y-4">
                                    <p className="text-gold-500 font-hanken text-sm font-semibold tracking-wide">
                                        Showing{" "}
                                        {Math.min(
                                            visibleCount,
                                            filteredProducts.length,
                                        )}{" "}
                                        of {filteredProducts.length} Products
                                    </p>

                                    {visibleCount < filteredProducts.length && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setVisibleCount(
                                                    (prev) => prev + 6,
                                                )
                                            }
                                            className="px-10 py-3.5 bg-black-900 border border-neutral-700 hover:border-gold-500/60 text-white font-hanken font-semibold text-sm rounded-md transition-all shadow-lg cursor-pointer"
                                        >
                                            Load More
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </Container>
        </div>
    );
};

export default Shop;
