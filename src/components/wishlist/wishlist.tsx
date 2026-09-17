import { Link } from "react-router";
import {
    Trash2,
    Heart,
    ChevronRight,
    ShoppingBag,
    Loader2,
} from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { products as mockProducts } from "@/lib/site_data";
import { ProductCard } from "@/components/common/ProductCard";
import Container from "@/components/common/Container";
import type { Product } from "@/config/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WishlistItemCardProps {
    item: Product;
    onRemove: (id: string) => void;
}

const WishlistItemCard = ({ item, onRemove }: WishlistItemCardProps) => {
    const { addToCart, cartItems, isAddingProduct } = useCart();

    const resolvedId = String(
        (item as any).slug || (item as any).productId || item.id || "",
    );
    const cartId = String((item as any).productId || item.id || resolvedId);

    const cartItem = cartItems.find(
        (ci) => ci.id === cartId || ci.id === item.id || ci.id === resolvedId,
    );
    const inCartQty = cartItem ? cartItem.quantity : 0;

    // Resolve stock metrics
    const pieceUnit = (item as any).sellingUnits?.find((u: any) =>
        u.name?.toLowerCase().includes("piece"),
    );
    const cartonUnit = (item as any).sellingUnits?.find(
        (u: any) =>
            u.name?.toLowerCase().includes("carton") ||
            u.name?.toLowerCase().includes("case"),
    );
    const primaryUnit = (item as any).sellingUnits?.[0];

    const piecesLeft =
        item.piecesLeft !== undefined
            ? item.piecesLeft
            : pieceUnit
              ? pieceUnit.stock
              : primaryUnit
                ? primaryUnit.stock
                : undefined;

    const casesLeft =
        item.casesLeft !== undefined
            ? item.casesLeft
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
        isAddingProduct(item.id) ||
        isAddingProduct((item as any).productId || "") ||
        isAddingProduct((item as any).slug || "");

    const isOutOfStock = maxStock <= 0;
    const isMaxInCart = inCartQty >= maxStock;
    const isButtonDisabled = isOutOfStock || isMaxInCart || isAdding;

    // Add item to cart
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isOutOfStock || isMaxInCart) return;
        addToCart(item);
    };

    // Format currency
    const formattedPrice = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    })
        .format(item.price)
        .replace("NGN", "₦");

    // Subtitle specifications text
    const specs: string[] = [];
    if (item.volume) specs.push(item.volume);

    if (inCartQty > 0) {
        specs.push(`In Cart: ${inCartQty}`);
    } else if (piecesLeft !== undefined && casesLeft !== undefined) {
        specs.push(
            `${casesLeft > 0 ? `${casesLeft} Case` : ""}${
                casesLeft > 1 ? "s" : ""
            } ${piecesLeft > 0 ? `and ${piecesLeft} Pieces` : ""}`,
        );
    } else if (piecesLeft !== undefined) {
        specs.push(`${piecesLeft} Pieces Left`);
    } else if (isOutOfStock) {
        specs.push("Out of Stock");
    }
    const specsString = specs.join(" • ");

    return (
        <>
            {/* MOBILE CARD VIEW */}
            <div className="md:hidden group relative w-full bg-black-800 rounded-2xl p-4 shadow-xl border border-white/5 flex gap-3.5 items-center">
                {/* Product Image Box */}
                <Link to={`/product/${resolvedId}`} className="block shrink-0">
                    <div className="w-28 h-32 bg-black-900 rounded-xl p-2 flex items-center justify-center border border-neutral-800/60 overflow-hidden">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                </Link>

                {/* Right Side Info & Actions */}
                <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
                    {/* Top Row: Category Label & Trash Icon */}
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest font-hanken truncate">
                            {typeof item.category === "object" && item.category !== null
                                ? (item.category as any).name
                                : item.category || "Champagne"}
                        </span>

                        {/* Trash Button */}
                        <button
                            type="button"
                            onClick={() => onRemove(item.id)}
                            className="size-8 rounded-full bg-black-900 border border-neutral-800 text-rose-500 hover:bg-rose-950/60 flex items-center justify-center transition-colors cursor-pointer active:scale-95 shrink-0"
                            title="Remove from wishlist"
                            aria-label="Remove item"
                        >
                            <Trash2 className="size-3.5" />
                        </button>
                    </div>

                    {/* Title */}
                    <Link to={`/product/${resolvedId}`}>
                        <h3 className="font-playfair text-base font-bold text-white leading-snug line-clamp-2 hover:text-gold-300 transition-colors">
                            {item.name}
                        </h3>
                    </Link>

                    {/* Subtitle / Specs */}
                    <p className="text-[11px] text-neutral-400 font-hanken truncate">
                        {specsString || "75cl"}
                    </p>

                    {/* Price */}
                    <div className="text-gold-500 font-playfair text-lg font-bold tracking-tight">
                        {formattedPrice}
                    </div>

                    {/* Bottom Action: Standard Add to Cart button */}
                    <div className="mt-1">
                        <Button
                            type="button"
                            disabled={isButtonDisabled}
                            onClick={handleAddToCart}
                            className={cn(
                                "h-9 px-4 font-hanken font-medium text-xs rounded-sm transition-all duration-300 w-fit",
                                isAdding
                                    ? "bg-neutral-800/80 border border-neutral-700 text-neutral-300 cursor-not-allowed"
                                    : isButtonDisabled
                                      ? "bg-neutral-800/80 border border-neutral-800 text-neutral-500 cursor-not-allowed hover:bg-neutral-800 hover:text-neutral-500"
                                      : "bg-[#1A1A1A] hover:bg-white/20 border border-white text-white cursor-pointer",
                            )}
                        >
                            {isAdding ? (
                                <span className="flex items-center justify-center gap-1.5">
                                    <Loader2 className="size-3.5 animate-spin text-gold-500" />
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
                    </div>
                </div>
            </div>

            {/* DESKTOP CARD VIEW */}
            <div className="hidden md:flex group relative w-full bg-black-800 rounded-xl p-6 transition-all duration-300 hover:border-gold-500/40 shadow-xl items-center justify-between gap-6 border border-white/5">
                {/* Left Side: Trash Icon + Image + Info */}
                <div className="flex items-center gap-6">
                    {/* Remove Trash Button */}
                    <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        className="size-11 rounded-[65px] bg-black-900 hover:bg-rose-950/70 text-rose-500 hover:text-rose-400 flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0 border border-neutral-900"
                        title="Remove from wishlist"
                        aria-label="Remove item"
                    >
                        <Trash2 className="size-4" />
                    </button>

                    {/* Product Image Box */}
                    <Link to={`/product/${resolvedId}`} className="block shrink-0">
                        <div className="size-37.5 bg-black-900 rounded-lg p-2.5 flex items-center justify-center overflow-hidden border border-neutral-900">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="max-h-27.25 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                    </Link>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                        <span className="block text-xs font-bold text-gold-500 uppercase tracking-widest font-hanken mb-1">
                            {typeof item.category === "object" && item.category !== null
                                ? (item.category as any).name
                                : item.category || "Beverage"}
                        </span>

                        <Link to={`/product/${resolvedId}`}>
                            <h3 className="font-playfair text-2xl font-bold text-white leading-snug hover:text-gold-300 transition-colors">
                                {item.name}
                            </h3>
                        </Link>

                        <p className="text-sm text-neutral-400 font-hanken mt-1 mb-2">
                            {specsString || "75cl"}
                        </p>

                        <div className="text-gold-500 font-playfair text-3xl font-bold tracking-tight">
                            {formattedPrice}
                        </div>
                    </div>
                </div>

                {/* Right Side: Standard Add to Cart button */}
                <div className="shrink-0 flex items-center gap-4">
                    <Button
                        type="button"
                        disabled={isButtonDisabled}
                        onClick={handleAddToCart}
                        className={cn(
                            "h-11 px-8 font-hanken font-medium text-sm rounded-sm transition-all duration-300",
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
                </div>
            </div>
        </>
    );
};

export const Wishlist = () => {
    const { wishlistItems, removeFromWishlist, wishlistCount } = useWishlist();

    // Filter recommended products
    const wishlistIds = new Set(wishlistItems.map((item) => item.id));
    const recommendedProducts = mockProducts
        .filter((p) => !wishlistIds.has(p.id))
        .slice(0, 4);

    return (
        <div className="bg-black-900 min-h-screen text-white pt-28 md:pt-36 pb-24">
            <Container>
                {/* Breadcrumb Navigation */}
                <nav className="flex items-center gap-1.5 text-xs font-hanken uppercase tracking-widest text-neutral-400 mb-4">
                    <Link
                        to="/"
                        className="hover:text-white transition-colors duration-200"
                    >
                        Home
                    </Link>
                    <ChevronRight className="size-3 text-neutral-600" />
                    <span className="text-gold-500 font-bold">Wishlist</span>
                </nav>

                {/* Page Title */}
                <h1 className="font-playfair text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white uppercase tracking-tight mb-8 md:mb-10">
                    Wishlist ({wishlistCount})
                </h1>

                {/* Wishlist Items List */}
                {wishlistItems.length > 0 ? (
                    <div className="space-y-4 md:space-y-6 mb-16 md:mb-24">
                        {wishlistItems.map((item) => (
                            <WishlistItemCard
                                key={item.id}
                                item={item}
                                onRemove={removeFromWishlist}
                            />
                        ))}
                    </div>
                ) : (
                    /* Empty Wishlist State */
                    <div className="bg-[#111111] border border-white/5 rounded-2xl p-10 md:p-16 text-center max-w-2xl mx-auto my-12 mb-20 shadow-2xl flex flex-col items-center">
                        <div className="size-20 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-6">
                            <Heart className="size-10 text-gold-500" />
                        </div>
                        <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-3">
                            Your Wishlist is Empty
                        </h2>
                        <p className="text-neutral-400 font-hanken text-sm md:text-base max-w-md mb-8 leading-relaxed">
                            Explore our curated collection of fine wines,
                            champagnes, and rare spirits to save your favorite
                            bottles for later.
                        </p>
                        <Link
                            to="/shop"
                            className="inline-flex items-center gap-2 bg-gold-gradient text-black font-hanken font-bold text-sm px-8 py-3.5 rounded-lg shadow-lg hover:opacity-90 transition-all cursor-pointer"
                        >
                            <ShoppingBag className="size-4" />
                            Explore Shop
                        </Link>
                    </div>
                )}

                {/* Recommended For You Section */}
                {recommendedProducts.length > 0 && (
                    <section className="pt-8 border-t border-neutral-900">
                        <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8">
                            Recommended For You
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {recommendedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </Container>
        </div>
    );
};

export default Wishlist;
