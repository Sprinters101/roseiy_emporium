import React from "react";
import { Link } from "react-router";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product, ProductCardProps } from "@/config/types";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import type { ProductItem } from "@/service/types";

export const ProductCard = ({
    product,
    onAddToCart,
    onToggleWishlist,
    className = "",
    isLandingPage = false,
}: ProductCardProps & { product: Product | ProductItem | any }) => {
    const { cartItems, addToCart, isAddingProduct } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();

    // Standardize product fields across mock and live API objects
    const resolvedId = String(
        product.slug || product.productId || product.id || "",
    );
    const cartId = String(product.productId || product.id || resolvedId);
    const resolvedName = product.name || "Product";

    const isWishlisted = isInWishlist(cartId);
    const cartItem = cartItems.find(
        (item) => item.id === cartId || item.id === resolvedId,
    );
    const inCartQty = cartItem ? cartItem.quantity : 0;

    // Resolve primary image
    const resolvedImage =
        product.image ||
        product.images?.find((img: any) => img.isPrimary)?.imageUrl ||
        product.images?.[0]?.imageUrl ||
        "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784813212/p_5_ohp3t7.png";

    // Resolve category name
    const resolvedCategory =
        typeof product.category === "object" && product.category !== null
            ? product.category.name
            : product.category || "";

    // Resolve stock metrics & selling units
    const pieceUnit = product.sellingUnits?.find((u: any) =>
        u.name?.toLowerCase().includes("piece"),
    );
    const cartonUnit = product.sellingUnits?.find(
        (u: any) =>
            u.name?.toLowerCase().includes("carton") ||
            u.name?.toLowerCase().includes("case"),
    );
    const primaryUnit = pieceUnit || product.sellingUnits?.[0];

    // Prioritize pieces price first
    const piecePrice =
        pieceUnit?.price !== undefined
            ? Number(pieceUnit.price)
            : pieceUnit?.unitPrice !== undefined
              ? Number(pieceUnit.unitPrice)
              : undefined;

    const fallbackSellingUnitPrice =
        product.sellingUnits?.[0]?.price !== undefined
            ? Number(product.sellingUnits[0].price)
            : product.sellingUnits?.[0]?.unitPrice !== undefined
              ? Number(product.sellingUnits[0].unitPrice)
              : undefined;

    const resolvedPrice =
        piecePrice !== undefined && piecePrice > 0
            ? piecePrice
            : product.price !== undefined &&
                typeof product.price === "number" &&
                product.price > 0
              ? product.price
              : fallbackSellingUnitPrice !== undefined &&
                  fallbackSellingUnitPrice > 0
                ? fallbackSellingUnitPrice
                : 0;

    const piecesLeft =
        product.piecesLeft !== undefined
            ? product.piecesLeft
            : pieceUnit
              ? pieceUnit.stock
              : primaryUnit
                ? primaryUnit.stock
                : undefined;

    const casesLeft =
        product.casesLeft !== undefined
            ? product.casesLeft
            : cartonUnit
              ? cartonUnit.stock
              : undefined;

    const maxStock =
        piecesLeft !== undefined
            ? piecesLeft
            : casesLeft !== undefined
              ? casesLeft
              : Infinity;

    const isAdding =
        isAddingProduct(cartId) ||
        isAddingProduct(resolvedId) ||
        isAddingProduct(product.productId || "") ||
        isAddingProduct(product.slug || "");

    const isOutOfStock = maxStock <= 0;
    const isMaxInCart = inCartQty >= maxStock;
    const isButtonDisabled = isOutOfStock || isMaxInCart || isAdding;

    // Normalized product object for context handlers
    const normalizedProduct: Product & {
        sellingUnits?: any[];
        productId?: string;
        slug?: string;
    } = {
        id: cartId,
        productId: product.productId,
        slug: product.slug,
        name: resolvedName,
        category: resolvedCategory,
        volume: product.volume || "75cl",
        piecesLeft,
        casesLeft,
        price: resolvedPrice,
        image: resolvedImage,
        sellingUnits: product.sellingUnits,
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(normalizedProduct);
        if (onToggleWishlist) onToggleWishlist(cartId);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isOutOfStock || isMaxInCart) return;
        if (onAddToCart) {
            onAddToCart(normalizedProduct);
        } else {
            addToCart(normalizedProduct);
        }
    };

    // Format currency string with Nigerian Naira symbol
    const formattedPrice = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    })
        .format(resolvedPrice)
        .replace("NGN", "₦");

    return (
        <div
            className={cn(
                `group relative w-full bg-[#111111] border rounded-lg p-4 
                 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:fill-gold-300`,
                isWishlisted
                    ? "border-gold-300/80  bg-black-500"
                    : "border-white/30 hover:border-gold-300/80",
                isLandingPage && "md:py-5",
                className,
            )}
        >
            {/* Top Action Header: Wishlist Button */}
            <div className="  flex justify-end w-full relative z-10">
                <button
                    type="button"
                    onClick={handleWishlist}
                    className="flex size-6 md:size-10 items-center justify-center rounded-full bg-black/40 border border-neutral-800 text-white hover:bg-neutral-800 transition-colors cursor-pointer absolute"
                    aria-label="Add to wishlist"
                >
                    <Heart
                        className={`size-3 md:size-4 transition-colors ${
                            isWishlisted
                                ? "fill-gold-500 text-gold-500"
                                : "text-gray-300"
                        }`}
                    />
                </button>
            </div>

            {/* Product Image Link */}
            <Link
                to={`/product/${resolvedId}`}
                className={cn("block ", isLandingPage && "mt-6.25")}
            >
                <div
                    className={cn(
                        "relative w-full h-28.25 sm:h-56.75  flex items-center justify-center overflow-hidden",
                        isLandingPage && "md:h-76.25 ",
                    )}
                >
                    <img
                        src={resolvedImage}
                        alt={resolvedName}
                        className="max-h-full w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                </div>
            </Link>

            {/* Product Info */}
            <div
                className={cn(
                    "space-y-0.5 mt-0",
                    isLandingPage && "mt-4 space-y-1.5",
                )}
            >
                <span className="text-[10px] font-medium tracking-widest text-gold-500 uppercase font-hanken">
                    {resolvedCategory}
                </span>

                <Link to={`/product/${resolvedId}`} className="block mt-0">
                    <h3
                        className={cn(
                            "text-white font-playfair text-hg-c3 md:text-base font-bold leading-snug line-clamp-2 min-h-8.5 md:min-h-10.5  transition-colors",
                            isLandingPage && "md:text-[1.5625rem] md:min-h-14",
                        )}
                    >
                        {resolvedName}
                    </h3>
                </Link>

                <p
                    className={cn(
                        "text-[0.5rem] md:text-[0.8125rem] text-neutral-400 font-hanken mt-1",
                        isLandingPage && "md:text-[0.625rem] mt-1.25",
                    )}
                >
                    {product.volume || product.description || ""}
                    {piecesLeft !== undefined && ` • ${piecesLeft} Pieces Left`}
                    {casesLeft !== undefined && ` • ${casesLeft} Cases Left`}
                </p>

                <div className={cn("mt-0", isLandingPage && "mt-2")}>
                    <span className="text-gold-500 font-playfair text-[1.25rem] md:text-[1.9375rem] font-bold tracking-tight">
                        {formattedPrice}
                    </span>
                </div>
            </div>

            {/* Add to Cart CTA */}
            <div className={cn("mt-4", isLandingPage && "mt-2")}>
                {(() => {
                    return (
                        <Button
                            type="button"
                            disabled={isButtonDisabled}
                            onClick={handleAddToCart}
                            className={cn(
                                "w-full h-10 md:h-11 font-hanken font-medium text-body-c1 rounded-sm transition-all duration-300",
                                isLandingPage && "h-12 md:text-body-b3",
                                isAdding
                                    ? "bg-neutral-800/80 border border-neutral-700 text-neutral-300 cursor-not-allowed"
                                    : isButtonDisabled
                                      ? "bg-neutral-800/80 border border-neutral-800 text-neutral-500 cursor-not-allowed hover:bg-neutral-800 hover:text-neutral-500"
                                      : "bg-[#1A1A1A] hover:bg-white/20 border border-white text-white cursor-pointer",
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
    );
};

export default ProductCard;
