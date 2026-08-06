import { useState } from "react";
import Container from "@/components/common/Container";
import { ProductCard } from "@/components/common/ProductCard";
import { Hero } from "@/components/common/Hero";
import { products as mockProducts } from "@/lib/site_data";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useShopFilters } from "./data/useShopFilters";
import { ShopHeader } from "./ShopHeader";
import { ShopSidebar } from "./ShopSidebar";
import { ShopEmptyState } from "./ShopEmptyState";

export const Shop = () => {
    const [visibleCount, setVisibleCount] = useState(12);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
    } = useShopFilters(mockProducts);

    return (
        <div className="bg-black-900 min-h-screen pb-24">
            <Hero />

            <Container className="pt-8 md:pt-14">
                {/* Shop Header with Mobile Controls */}
                {/* <ShopHeader
                    sortBy={sortBy}
                    totalActiveFilters={totalActiveFilters}
                    onSortChange={setSortBy}
                    onOpenMobileFilters={() => setMobileFiltersOpen(true)}
                /> */}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    {/* Desktop Filter Sidebar */}
                    <ShopSidebar
                        selectedCategories={selectedCategories}
                        selectedBrands={selectedBrands}
                        selectedPriceRanges={selectedPriceRanges}
                        brandSearch={brandSearch}
                        totalActiveFilters={totalActiveFilters}
                        filteredBrandList={filteredBrandList}
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
                            onSortChange={setSortBy}
                            onOpenMobileFilters={() =>
                                setMobileFiltersOpen(true)
                            }
                            onRemoveCategory={toggleCategory}
                            onRemoveBrand={toggleBrand}
                            onRemovePrice={togglePrice}
                            onClearAll={clearAllFilters}
                        />
                        {filteredProducts.length === 0 ? (
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
