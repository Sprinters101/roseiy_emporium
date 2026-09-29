import React from "react";
import { ProductCard } from "@/components/common/ProductCard";
import { ProductCardSkeleton } from "@/components/common/ProductCardSkeleton";
import { useGetBestSellers, useGetProducts } from "@/service/queries";
import type { ProductItem } from "@/service/types";
import type { Product } from "@/config/types";
import Container from "../common/Container";

export interface DashboardRecommendedProps {
    title?: string;
    limit?: number;
}

export const DashboardRecommended: React.FC<DashboardRecommendedProps> = ({
    title = "Recommended For You",
    limit = 5,
}) => {
    const { data: bestSellersData, isLoading: isBestSellersLoading } =
        useGetBestSellers({ limit });

    const { data: productsData, isLoading: isProductsLoading } = useGetProducts(
        { limit },
    );

    const products: (ProductItem | Product)[] = React.useMemo(() => {
        // 1. Check best sellers data
        if (bestSellersData?.data) {
            if (
                Array.isArray(bestSellersData.data) &&
                bestSellersData.data.length > 0
            ) {
                return bestSellersData.data.slice(0, limit);
            }
            if (
                Array.isArray((bestSellersData.data as any).products) &&
                (bestSellersData.data as any).products.length > 0
            ) {
                return (bestSellersData.data as any).products.slice(0, limit);
            }
            if (
                Array.isArray((bestSellersData.data as any).bestSellers) &&
                (bestSellersData.data as any).bestSellers.length > 0
            ) {
                return (bestSellersData.data as any).bestSellers.slice(
                    0,
                    limit,
                );
            }
        }

        // 2. Fallback to catalog products
        // if (productsData?.data) {
        //     if (
        //         Array.isArray(productsData.data) &&
        //         productsData.data.length > 0
        //     ) {
        //         return productsData.data.slice(0, limit);
        //     }
        //     if (
        //         Array.isArray((productsData.data as any).products) &&
        //         (productsData.data as any).products.length > 0
        //     ) {
        //         return (productsData.data as any).products.slice(0, limit);
        //     }
        // }

        // 3. Fallback to mock products
        // return (mockProducts || []).slice(0, limit);
        return [];
    }, [bestSellersData, productsData, limit]);

    const isLoading =
        isBestSellersLoading && isProductsLoading && products.length === 0;

    return (
        <Container className=" p-4 sm:p-6 md:p-8  flex flex-col gap-6 w-full mt-2">
            {/* Header */}
            <div className="flex items-center justify-between w-full">
                <h2 className="font-playfair font-bold text-lg sm:text-[1.9375rem] text-white">
                    {title}
                </h2>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5  bg-black-800 p-0 md:p-10 rounded-lg">
                {isLoading
                    ? Array.from({ length: limit }).map((_, index) => (
                          <ProductCardSkeleton
                              key={`recommended-skel-${index}`}
                          />
                      ))
                    : products.map((product) => {
                          const key =
                              (product as any).productId ||
                              (product as any).id ||
                              (product as any).slug ||
                              product.name;
                          return <ProductCard key={key} product={product} />;
                      })}
            </div>
        </Container>
    );
};

export default DashboardRecommended;
