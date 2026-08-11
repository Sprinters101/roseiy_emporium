import { Link } from "react-router";
import {
    Trash2,
    Heart,
    ChevronRight,
    ShoppingBag,
    Plus,
    Minus,
} from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { products as mockProducts } from "@/lib/site_data";
import { ProductCard } from "@/components/common/ProductCard";
import Container from "@/components/common/Container";
import type { Product } from "@/config/types";
import { toast } from "@/components/ui/sonner";

interface WishlistItemCardProps {
    item: Product;
    onRemove: (id: string) => void;
}

const WishlistItemCard = ({ item, onRemove }: WishlistItemCardProps) => {
    const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();

    const cartItem = cartItems.find((ci) => ci.id === item.id);
    const inCartQty = cartItem ? cartItem.quantity : 0;
    const isInCart = inCartQty > 0;

    const maxStock =
        item.piecesLeft !== undefined
            ? item.piecesLeft
            : item.casesLeft !== undefined
              ? item.casesLeft
              : Infinity;
    const isOutOfStock = maxStock <= 0 || inCartQty >= maxStock;

    // Format currency
    const formattedPrice = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    })
        .format(item.price)
        .replace("NGN", "₦");

    // Increment quantity in cart
    const handleCartIncrement = () => {
        if (inCartQty < maxStock) {
            updateQuantity(item.id, inCartQty + 1);
        } else {
            toast.warning(`Maximum stock limit reached (${maxStock})`);
        }
    };

    // Decrement quantity in cart (removes from cart if quantity hits 0)
    const handleCartDecrement = () => {
        if (inCartQty > 1) {
            updateQuantity(item.id, inCartQty - 1);
        } else {
            removeFromCart(item.id);
            toast.info(`${item.name} removed from cart`);
        }
    };

    // Add item to cart initially
    const handleAddToCart = () => {
        if (isOutOfStock) return;
        addToCart(item, 1);
    };

    // Subtitle specifications text
    const specs: string[] = [];
    if (item.volume) specs.push(item.volume);

    if (isInCart) {
        specs.push(`In Cart: ${inCartQty}`);
    } else if (item.piecesLeft !== undefined && item.casesLeft !== undefined) {
        specs.push(
            `${item.casesLeft > 0 ? `${item.casesLeft} Case` : ""}${
                item.casesLeft > 1 ? "s" : ""
            } ${item.piecesLeft > 0 ? `and ${item.piecesLeft} Pieces` : ""}`,
        );
    } else if (item.piecesLeft !== undefined) {
        specs.push(`${item.piecesLeft} Pieces Left`);
    } else if (isOutOfStock) {
        specs.push("Out of Stock");
    }
    const specsString = specs.join(" • ");

    return (
        <>
            {/* MOBILE CARD VIEW */}
            <div className="md:hidden group relative w-full bg-black-800 rounded-2xl p-4 shadow-xl border border-white/5 flex gap-3.5 items-center">
                {/* Product Image Box */}
                <Link to={`/product/${item.id}`} className="block shrink-0">
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
                            {item.category || "Champagne"}
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
                    <Link to={`/product/${item.id}`}>
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

                    {/* Bottom Action: Show Stepper IF in cart, ELSE show Add to Cart button */}
                    <div className="mt-1">
                        {isInCart ? (
                            /* Gold Quantity Stepper Counter */
                            <div className="inline-flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleCartDecrement}
                                    className="size-7 rounded-md border border-gold-500/80 text-gold-500 hover:bg-gold-500/10 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                                    aria-label="Decrease quantity"
                                >
                                    <Minus className="size-3.5" />
                                </button>

                                <span className="text-white font-hanken font-bold text-sm min-w-5 text-center">
                                    {inCartQty}
                                </span>

                                <button
                                    type="button"
                                    onClick={handleCartIncrement}
                                    disabled={inCartQty >= maxStock}
                                    className="size-7 rounded-md border border-gold-500/80 text-gold-500 hover:bg-gold-500/10 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-95"
                                    aria-label="Increase quantity"
                                >
                                    <Plus className="size-3.5" />
                                </button>
                            </div>
                        ) : (
                            /* Add to Cart Button */
                            <button
                                type="button"
                                disabled={isOutOfStock}
                                onClick={handleAddToCart}
                                className={`h-8 px-4 font-hanken font-medium text-xs rounded-sm border transition-all duration-300 cursor-pointer shadow-md ${
                                    isOutOfStock
                                        ? "border-neutral-800 bg-neutral-900/60 text-neutral-500 cursor-not-allowed"
                                        : "border-white text-white bg-transparent hover:bg-white hover:text-black active:scale-95"
                                }`}
                            >
                                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                            </button>
                        )}
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
                    <Link to={`/product/${item.id}`} className="block shrink-0">
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
                            {item.category || "Beverage"}
                        </span>

                        <Link to={`/product/${item.id}`}>
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

                {/* Right Side: Show Stepper IF in cart, ELSE show Add to Cart button */}
                <div className="shrink-0 flex items-center gap-4">
                    {isInCart ? (
                        /* Gold Stepper Counter */
                        <div className="flex items-center gap-3 bg-black-900  rounded-lg p-2 shadow-inner">
                            <button
                                type="button"
                                onClick={handleCartDecrement}
                                className="size-8 rounded-md border border-gold-500/80 text-gold-500 hover:bg-gold-500/10 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                                aria-label="Decrease quantity"
                            >
                                <Minus className="size-4" />
                            </button>

                            <span className="text-white font-hanken font-bold text-base px-2 min-w-6 text-center">
                                {inCartQty}
                            </span>

                            <button
                                type="button"
                                onClick={handleCartIncrement}
                                disabled={inCartQty >= maxStock}
                                className="size-8 rounded-md border border-gold-500/80 text-gold-500 hover:bg-gold-500/10 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-95"
                                aria-label="Increase quantity"
                            >
                                <Plus className="size-4" />
                            </button>
                        </div>
                    ) : (
                        /* Add to Cart Button */
                        <button
                            type="button"
                            disabled={isOutOfStock}
                            onClick={handleAddToCart}
                            className={`h-12 px-8 font-hanken font-medium text-sm rounded-sm border transition-all duration-300 cursor-pointer shadow-md ${
                                isOutOfStock
                                    ? "border-neutral-800 bg-neutral-900/60 text-neutral-500 cursor-not-allowed"
                                    : "border-white text-white bg-transparent hover:bg-white hover:text-black"
                            }`}
                        >
                            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                        </button>
                    )}
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
