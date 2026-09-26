import { useMemo } from "react";
import { Link } from "react-router";
import { Loader2 } from "lucide-react";
import TitleDecoration from "@/components/common/TitleDecoration";
import {
    donJulioReposadoImg,
    hennessyXoImg,
    claseAzulImg,
} from "@/lib/site_data";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useGetProducts } from "@/service/queries";
import type { ProductItem } from "@/service/types";

export interface BestSellerProduct {
    id: string;
    productId?: string;
    slug?: string;
    name: string;
    category: string;
    volume: string;
    piecesLeft?: number;
    casesLeft?: number;
    price: number;
    image: string;
    title: string;
    sellingUnits?: any[];
}

const HorizontalProductCardSkeleton = () => {
    return (
        <div className="flex items-center gap-4 sm:gap-6 p-4 rounded-xl mx-auto md:max-w-full max-w-75 bg-[#111111]/40 border border-white/5">
            {/* Bottle Image Skeleton */}
            <div className="relative md:shrink-0 w-32 sm:w-40 h-48 max-w-27.75 md:max-w-40 sm:h-64.5 flex items-center justify-center">
                <div className="w-16 sm:w-20 h-36 sm:h-48 bg-neutral-800/60 rounded-md animate-pulse" />
            </div>

            <img
                src="/icon/line.svg"
                alt="divider"
                className="h-full opacity-30"
            />

            {/* Product Details Skeleton */}
            <div className="flex flex-col justify-center space-y-3 w-full max-w-33.75 md:max-w-53.25 overflow-hidden">
                <div className="h-3 w-16 bg-gold-500/20 rounded animate-pulse" />
                <div className="h-6 w-32 bg-neutral-800 rounded animate-pulse" />
                <div className="h-3 w-24 bg-neutral-800/50 rounded animate-pulse" />
                <div className="h-7 w-28 bg-gold-500/20 rounded animate-pulse pt-1" />
            </div>
        </div>
    );
};

const HorizontalProductCard = ({ product }: { product: BestSellerProduct }) => {
    const { cartItems, addToCart, isAddingProduct } = useCart();

    const cartItem = cartItems.find((item) => item.id === product.id);
    const inCartQty = cartItem ? cartItem.quantity : 0;

    const maxStock =
        product.piecesLeft !== undefined
            ? product.piecesLeft
            : product.casesLeft !== undefined
              ? product.casesLeft
              : Infinity;

    const isOutOfStock = maxStock <= 0;
    const isMaxInCart = inCartQty >= maxStock;
    const isButtonDisabled =
        isOutOfStock || isMaxInCart || isAddingProduct(product.id);

    // Format currency string into Nigerian Naira
    const formattedPrice = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    })
        .format(product.price)
        .replace("NGN", "₦");

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isOutOfStock || isMaxInCart) return;
        addToCart(product);
    };

    return (
        <Link
            to={`/product/${product.id}`}
            className="group flex items-center gap-4 sm:gap-6 p-4 rounded-xl transition-all duration-300 mx-auto md:max-w-full max-w-75 cursor-pointer block"
        >
            {/* Product Bottle Image with Shadow Glow Effect */}
            <div className="relative md:shrink-0 w-32 sm:w-40 h-48 max-w-27.75 md:max-w-40 sm:h-64.5 flex items-center justify-center">
                <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <img src="/icon/line.svg" alt="divider" className="h-full" />

            {/* Product Details (Right Side) */}
            <div className="flex flex-col justify-center space-y-2 w-full max-w-33.75 md:max-w-53.25 overflow-hidden transition-all transform duration-1000">
                {/* Category Tag */}
                <h4 className="text-body-c2 md:text-body-c1 font-semibold tracking-widest text-gold-500 uppercase font-hanken">
                    {product.category}
                </h4>

                <h2 className="text-hg-c1 md:text-hg-b3 font-semibold tracking-widest text-white uppercase w-full max-w-35 md:max-w-49.5 font-playfair whitespace-pre-line">
                    {product.title}
                </h2>

                {/* Stock Meta Information */}
                <p className="text-body-c1 text-black-200 font-hanken">
                    {product.volume}
                    {product.piecesLeft !== undefined &&
                        ` • ${product.piecesLeft} Pieces Left`}
                    {product.casesLeft !== undefined &&
                        ` • ${product.casesLeft} Cases Left`}
                </p>

                {/* Big Price Tag */}
                <div className="pt-1">
                    <span className="text-gold-500 font-playfair text-2xl sm:text-hg-b2 font-bold tracking-tight">
                        {formattedPrice}
                    </span>
                </div>
                <div className="transition-all transform md:translate-y-full group-hover:translate-y-0 duration-1000">
                    {(() => {
                        const isAdding =
                            isAddingProduct(product.id) ||
                            isAddingProduct(product.productId || "") ||
                            isAddingProduct(product.slug || "");

                        return (
                            <Button
                                variant="outline"
                                type="button"
                                disabled={isButtonDisabled || isAdding}
                                onClick={handleAddToCart}
                                className={cn(
                                    "mt-6 px-8 w-full rounded-sm h-11 md:hidden group-hover:block transition-all duration-300",
                                    isAdding
                                        ? "bg-neutral-800/80 border-neutral-700 text-neutral-300 cursor-not-allowed"
                                        : isButtonDisabled
                                          ? "bg-neutral-800/80 border-neutral-800 text-neutral-500 cursor-not-allowed hover:bg-neutral-800 hover:text-neutral-500"
                                          : "cursor-pointer",
                                )}
                            >
                                {isAdding ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="size-4 animate-spin text-gold-500" />
                                        <span>Adding...</span>
                                    </span>
                                ) : isOutOfStock ? (
                                    "Out of Stock"
                                ) : isMaxInCart ? (
                                    "Max in Cart"
                                ) : (
                                    "Add to Cart"
                                )}
                            </Button>
                        );
                    })()}
                </div>
            </div>
        </Link>
    );
};

export const BestSellers = () => {
    // 1. Fetch live featured / best seller products
    const { data: apiResponse, isLoading } = useGetProducts({
        limit: 3,
        featured: true,
    });

    const fallbackBestSellers: BestSellerProduct[] = useMemo(
        () => [
            {
                id: "don-julio-reposado",
                name: "Don Julio Reposado",
                category: "Tequila",
                volume: "75cl",
                piecesLeft: 22,
                price: 650000,
                image: donJulioReposadoImg,
                title: "Don Julio Reposado",
            },
            {
                id: "hennessy-xo",
                name: "Hennessy XO",
                category: "Cognac",
                volume: "75cl",
                piecesLeft: 22,
                casesLeft: 5,
                price: 650000,
                image: hennessyXoImg,
                title: "Hennessy \n X.O",
            },
            {
                id: "clase-azul",
                name: "Clase Azul Reposado",
                category: "Tequila",
                volume: "75cl",
                casesLeft: 5,
                price: 650000,
                image: claseAzulImg,
                title: "Clase Azul \n Reposado ",
            },
        ],
        [],
    );

    const bestSellers: BestSellerProduct[] = useMemo(() => {
        const liveItems =
            apiResponse?.data?.products || apiResponse?.data?.items;
        if (liveItems && liveItems.length > 0) {
            return liveItems.slice(0, 3).map((p: ProductItem) => {
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
                    id: p.slug || p.productId,
                    productId: p.productId,
                    slug: p.slug,
                    name: p.name,
                    title: p.name,
                    category: p.category?.name || "",
                    volume: (p as any).volume || "",
                    piecesLeft: pieceUnit
                        ? pieceUnit.stock
                        : primaryUnit
                          ? primaryUnit.stock
                          : 22,
                    casesLeft: cartonUnit ? cartonUnit.stock : 5,
                    price: pieceUnit
                        ? Number(pieceUnit.price || (pieceUnit as any).unitPrice)
                        : primaryUnit
                          ? Number(primaryUnit.price || (primaryUnit as any).unitPrice)
                          : 650000,
                    image:
                        p.images?.find((i) => i.isPrimary)?.imageUrl ||
                        p.images?.[0]?.imageUrl ||
                        donJulioReposadoImg,
                    sellingUnits: p.sellingUnits,
                };
            });
        }
        return fallbackBestSellers;
    }, [apiResponse, fallbackBestSellers]);

    return (
        <section className="w-full bg-black-900 pt-16 md:py-24 border-t border-white/5">
            <div className="flex flex-col items-center">
                <div className="w-full max-w-[1600px] mx-auto flex flex-col items-center">
                    {/* Section Title Header: Fades in directly */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                            duration: 1.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex flex-col items-center text-center"
                    >
                        <TitleDecoration title="Our Best Sellers" />
                        <h2 className="text-hg-b3 md:text-hg-h3 text-center font-bold mt-1 md:mt-2 font-playfair text-white max-w-2xl leading-tight">
                            Most Loved By Our Customers
                        </h2>

                        <p className="mt-3 md:mt-4 text-body-c1 md:text-body-b2 max-w-81.75 md:max-w-171 text-center text-neutral-300 font-hanken font-light">
                            Discover the bottles our customers return for time
                            and again, celebrated for their exceptional quality,
                            and unforgettable character.
                        </p>
                    </motion.div>

                    {/* 3-Column Horizontal Card Layout: Mapped with inline index delays */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-12 md:mt-16">
                        {isLoading
                            ? Array.from({ length: 3 }).map((_, idx) => (
                                  <HorizontalProductCardSkeleton key={idx} />
                              ))
                            : bestSellers.map((product, index) => (
                                  <motion.div
                                      key={product.id}
                                      initial={{ opacity: 0, y: 20 }}
                                      whileInView={{ opacity: 1, y: 0 }}
                                      viewport={{ once: false, amount: 0.15 }}
                                      transition={{
                                          duration: 1.2,
                                          delay: 0.2 + index * 0.15, // Staggers the items one by one
                                          ease: [0.16, 1, 0.3, 1],
                                      }}
                                  >
                                      <HorizontalProductCard
                                          product={product}
                                      />
                                  </motion.div>
                              ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BestSellers;
