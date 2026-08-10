import { Link } from "react-router";
import { Trash2, Heart, ChevronRight, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { products as mockProducts } from "@/lib/site_data";
import { ProductCard } from "@/components/common/ProductCard";
import Container from "@/components/common/Container";
import type { Product } from "@/config/types";

export const Wishlist = () => {
    const { wishlistItems, removeFromWishlist, wishlistCount } = useWishlist();
    const { addToCart, cartItems } = useCart();

    // Format currency helper
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0,
        })
            .format(price)
            .replace("NGN", "₦");
    };

    // Filter recommended products (products not in current wishlist or top products)
    const wishlistIds = new Set(wishlistItems.map((item) => item.id));
    const recommendedProducts = mockProducts
        .filter((p) => !wishlistIds.has(p.id))
        .slice(0, 4);

    const handleAddToCart = (product: Product, isOutOfStock: boolean) => {
        if (isOutOfStock) return;
        addToCart(product);
    };

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
                        {wishlistItems.map((item) => {
                            const cartItem = cartItems.find(
                                (ci) => ci.id === item.id,
                            );
                            const inCartQty = cartItem ? cartItem.quantity : 0;
                            const maxStock =
                                item.piecesLeft !== undefined
                                    ? item.piecesLeft
                                    : item.casesLeft !== undefined
                                      ? item.casesLeft
                                      : Infinity;
                            const isOutOfStock =
                                maxStock <= 0 || inCartQty >= maxStock;

                            // Build subtitle details text
                            const specs: string[] = [];
                            if (item.volume) specs.push(item.volume);
                            if (
                                item.piecesLeft !== undefined &&
                                item.piecesLeft > 0
                            ) {
                                specs.push(`${item.piecesLeft} Pieces Left`);
                            }
                            if (
                                item.casesLeft !== undefined &&
                                item.casesLeft > 0
                            ) {
                                specs.push(`${item.casesLeft} Cases Left`);
                            }
                            if (isOutOfStock) {
                                specs.push("Out of Stock");
                            }
                            const specsString = specs.join(" • ");

                            return (
                                <div
                                    key={item.id}
                                    className="group relative w-full bg-[#111111] border border-white/5 md:border-neutral-800/80 rounded-xl p-4 md:p-6 transition-all duration-300 hover:border-gold-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 md:gap-6"
                                >
                                    {/* Left Side: Trash Icon + Image + Info */}
                                    <div className="flex items-center gap-3 sm:gap-5 md:gap-6 w-full sm:w-auto">
                                        {/* Remove Trash Button */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeFromWishlist(item.id)
                                            }
                                            className="size-10 sm:size-11 rounded-lg bg-[#1E1213] hover:bg-rose-950/70 border border-rose-900/30 text-rose-500 hover:text-rose-400 flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0"
                                            title="Remove from wishlist"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 className="size-4 md:size-5" />
                                        </button>

                                        {/* Product Image Box */}
                                        <Link
                                            to={`/product/${item.id}`}
                                            className="block shrink-0"
                                        >
                                            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-[#090909] rounded-lg p-2 flex items-center justify-center border border-neutral-900/80 overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                        </Link>

                                        {/* Item Info */}
                                        <div className="flex-1 min-w-0">
                                            <span className="block text-[10px] md:text-xs font-bold text-gold-500 uppercase tracking-widest font-hanken mb-0.5 md:mb-1">
                                                {item.category || "Beverage"}
                                            </span>

                                            <Link to={`/product/${item.id}`}>
                                                <h3 className="font-playfair text-base sm:text-xl md:text-2xl font-bold text-white leading-snug hover:text-gold-300 transition-colors truncate sm:whitespace-normal">
                                                    {item.name}
                                                </h3>
                                            </Link>

                                            <p className="text-xs md:text-sm text-neutral-400 font-hanken mt-1 mb-2">
                                                {specsString || "75cl"}
                                            </p>

                                            <div className="text-gold-500 font-playfair text-lg sm:text-2xl md:text-3xl font-bold tracking-tight">
                                                {formatPrice(item.price)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side: Add to Cart CTA */}
                                    <div className="w-full sm:w-auto shrink-0 flex justify-end">
                                        <button
                                            type="button"
                                            disabled={isOutOfStock}
                                            onClick={() =>
                                                handleAddToCart(
                                                    item,
                                                    isOutOfStock,
                                                )
                                            }
                                            className={`w-full sm:w-auto h-11 md:h-12 px-6 md:px-8 font-hanken font-medium text-xs md:text-sm rounded-sm border transition-all duration-300 cursor-pointer shadow-md ${
                                                isOutOfStock
                                                    ? "border-neutral-800 bg-neutral-900/60 text-neutral-500 cursor-not-allowed"
                                                    : "border-white text-white bg-transparent hover:bg-white hover:text-black"
                                            }`}
                                        >
                                            {isOutOfStock
                                                ? "Out of Stock"
                                                : "Add to Cart"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
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
