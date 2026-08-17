import { Link } from "react-router";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProductCardProps } from "@/config/types";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export const ProductCard = ({
    product,
    onAddToCart,
    onToggleWishlist,
    className = "",
    isLandingPage = false,
}: ProductCardProps) => {
    const { cartItems, addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);

    const cartItem = cartItems.find((item) => item.id === product.id);
    const inCartQty = cartItem ? cartItem.quantity : 0;

    const maxStock =
        product.piecesLeft !== undefined
            ? product.piecesLeft
            : product.casesLeft !== undefined
            ? product.casesLeft
            : Infinity;

    const isOutOfStock = maxStock <= 0 || inCartQty >= maxStock;

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
        if (onToggleWishlist) onToggleWishlist(product.id);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isOutOfStock) return;
        if (onAddToCart) {
            onAddToCart(product);
        } else {
            addToCart(product);
        }
    };

    // Format currency string with Nigerian Naira symbol
    const formattedPrice = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    })
        .format(product.price)
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
                to={`/product/${product.id}`}
                className={cn("block ", isLandingPage && "mt-6.25")}
            >
                <div
                    className={cn(
                        "relative w-full h-28.25 sm:h-56.75  flex items-center justify-center overflow-hidden",
                        isLandingPage && "md:h-76.25 ",
                    )}
                >
                    <img
                        src={product.image}
                        alt={product.name}
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
                    {product.category}
                </span>

                <Link to={`/product/${product.id}`} className="block mt-0">
                    <h3
                        className={cn(
                            "text-white font-playfair text-hg-c3 md:text-base font-bold leading-snug line-clamp-2 min-h-8.5 md:min-h-10.5  transition-colors",
                            isLandingPage && "md:text-[1.5625rem] md:min-h-14",
                        )}
                    >
                        {product.name}
                    </h3>
                </Link>

                <p
                    className={cn(
                        "text-[0.5rem] md:text-[0.8125rem] text-neutral-400 font-hanken mt-1",
                        isLandingPage && "md:text-[0.625rem] mt-1.25",
                    )}
                >
                    {product.volume}
                    {product.piecesLeft !== undefined &&
                        ` • ${product.piecesLeft} Pieces Left`}
                    {product.casesLeft !== undefined &&
                        ` • ${product.casesLeft} Cases Left`}
                </p>

                <div className={cn("mt-0", isLandingPage && "mt-2")}>
                    <span className="text-gold-500 font-playfair text-[1.25rem] md:text-[1.9375rem] font-bold tracking-tight">
                        {formattedPrice}
                    </span>
                </div>
            </div>

            {/* Add to Cart CTA */}
            <div className={cn("mt-4", isLandingPage && "mt-2")}>
                <Button
                    type="button"
                    disabled={isOutOfStock}
                    onClick={handleAddToCart}
                    className={cn(
                        "w-full h-10 md:h-11 font-hanken font-medium text-body-c1 rounded-sm transition-all duration-300",
                        isLandingPage && "h-12 md:text-body-b3",
                        isOutOfStock
                            ? "bg-neutral-800/80 border border-neutral-800 text-neutral-500 cursor-not-allowed hover:bg-neutral-800 hover:text-neutral-500"
                            : "bg-[#1A1A1A] hover:bg-white/20 border border-white text-white cursor-pointer",
                    )}
                >
                    {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </Button>
            </div>
        </div>
    );
};
