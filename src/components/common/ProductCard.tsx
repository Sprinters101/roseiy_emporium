import { useState } from "react";
import { Link } from "react-router";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProductCardProps } from "@/config/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const ProductCard = ({
    product,
    onAddToCart,
    onToggleWishlist,
    className = "",
    isLandingPage = false,
}: ProductCardProps) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
        if (onToggleWishlist) onToggleWishlist(product.id);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onAddToCart?.(product);
        toast.success(`${product.name} added to cart`);
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
                `group relative w-full bg-[#111111] border rounded-lg p-4 md:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl`,
                isWishlisted
                    ? "border-gold-300/80  bg-black-500"
                    : "border-white/10 hover:border-gold-300/40",
                className,
            )}
        >
            {/* Top Action Header: Wishlist Button */}
            <div className="  flex justify-end w-full relative z-10">
                <button
                    onClick={handleWishlist}
                    className="flex size-6 md:size-10 items-center justify-center rounded-full bg-black/40 border border-neutral-800 text-white hover:bg-neutral-800 transition-colors cursor-pointer absolute"
                    aria-label="Add to wishlist"
                >
                    <Heart
                        className={`size-3 md:size-4 transition-colors ${
                            isWishlisted
                                ? "fill-gold-300 text-gold-300"
                                : "text-gray-300"
                        }`}
                    />
                </button>
            </div>

            {/* Product Image Link */}
            <Link
                to={`/product/${product.id}`}
                className={cn("block mt-7.5", isLandingPage && "mt-6.25")}
            >
                <div
                    className={cn(
                        "relative w-full h-28.25 sm:h-64  flex items-center justify-center overflow-hidden",
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
            <div className="space-y-1.5 mt-4 ">
                <span className="text-[10px] font-medium tracking-widest text-gold-500 uppercase font-hanken">
                    {product.category}
                </span>

                <Link to={`/product/${product.id}`} className="block mt-1">
                    <h3 className="text-white font-playfair text-hg-c3 md:text-[1.5625rem] font-bold leading-snug line-clamp-2 min-h-8.5 md:min-h-14 hover:text-gold-300 transition-colors">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-[0.5rem] md:text-[0.8125rem] text-neutral-400 font-hanken mt-1.25">
                    {product.volume}
                    {product.piecesLeft !== undefined &&
                        ` • ${product.piecesLeft} Pieces Left`}
                    {product.casesLeft !== undefined &&
                        ` • ${product.casesLeft} Cases Left`}
                </p>

                <div className="mt-2">
                    <span className="text-gold-500 font-playfair text-[1.25rem] md:text-[1.9375rem] font-bold tracking-tight">
                        {formattedPrice}
                    </span>
                </div>
            </div>

            {/* Add to Cart CTA */}
            <div className="mt-5">
                <Button
                    onClick={handleAddToCart}
                    className="w-full h-10 md:h-12 bg-[#1A1A1A] hover:bg-gold-gradient hover:text-black-900 border border-neutral-700 text-white font-hanken font-medium text-body-c1 md:text-body-b3 rounded-sm transition-all duration-300 cursor-pointer"
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
};
