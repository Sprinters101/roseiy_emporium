import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Heart, Minus, Plus, Check, ChevronRight } from "lucide-react";
import { products } from "@/lib/site_data";
import type { Product } from "@/config/types";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/common/ProductCard";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Container from "../common/Container";

export const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { cartItems, setCartItemQuantities } = useCart();

    // Look up product or default to Glenfiddich Single Scotch (ID '10')
    const product: Product = useMemo(() => {
        const found = products.find((p) => p.id === id);
        if (found) return found;

        // Default reference product matching the design exactly
        return (
            products.find((p) => p.id === "10") || {
                id: "10",
                name: "Glenfiddich Single Scotch",
                brand: "Glenfiddich",
                category: "Whiskey",
                volume: "70cl",
                piecesLeft: 22,
                casesLeft: 10,
                price: 110000,
                image: "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784813212/p_5_ohp3t7.png",
                gallery: [
                    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784813212/p_5_ohp3t7.png",
                ],
                description:
                    "A remarkably rich and luxurious single malt scotch whiskey, matured in fine Spanish Oloroso wood and American oak casks. Small batch production gives this 18-year-old expression extraordinary depth, complexity, and exceptional elegance.",
                tastingNotes: {
                    nose: "A remarkably rich aroma with ripe orchard fruit, baked apple, and robust oakiness.",
                    taste: "Richly delivers luxurious dried fruit, candy peel, and dates. Overlaid with elegant oak notes.",
                    finish: "Warming, rewarding, and distinguished long finish.",
                },
                details: {
                    abv: "40%",
                    country: "Scotland",
                    region: "Speyside",
                },
            }
        );
    }, [id]);

    // Check if this product is already in the cart
    const cartItem = useMemo(() => {
        return cartItems.find((item) => item.id === product.id);
    }, [cartItems, product.id]);

    // Product Gallery images fallback
    const galleryImages = useMemo(() => {
        if (product.gallery && product.gallery.length > 0) {
            return product.gallery;
        }
        return [product.image];
    }, [product]);

    // Interactive State
    const [selectedImage, setSelectedImage] = useState<string>(
        galleryImages[0] || product.image,
    );

    // Multi-unit purchase selection state
    const [includePieces, setIncludePieces] = useState<boolean>(true);
    const [includeCases, setIncludeCases] = useState<boolean>(true);

    // Independent local quantity states for pieces and cases
    const [piecesQty, setPiecesQty] = useState<number>(2);
    const [casesQty, setCasesQty] = useState<number>(1);

    const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

    // Sync local quantities with cart item whenever cart state updates
    useEffect(() => {
        if (cartItem) {
            const p = cartItem.piecesQty ?? cartItem.quantity ?? 2;
            const c = cartItem.casesQty ?? 1;
            setPiecesQty(p);
            setCasesQty(c);
            setIncludePieces(p > 0);
            setIncludeCases(c > 0);
        }
    }, [cartItem]);

    // Stock metrics
    const piecesLeft = product.piecesLeft ?? 22;
    const casesLeft = product.casesLeft ?? 10;

    const brandName = product.brand || "Glenfiddich";
    const categoryName = product.category || "Whiskey";

    // Format NGN Currency
    const formattedPrice = useMemo(() => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0,
        })
            .format(product.price)
            .replace("NGN", "₦");
    }, [product.price]);

    // Local Quantity Increment / Decrement Handlers (Does NOT affect cart until Add to Cart is clicked)
    const handleDecrementPieces = () => {
        if (piecesQty > 1) {
            setPiecesQty((prev) => prev - 1);
        }
    };

    const handleIncrementPieces = () => {
        if (piecesQty < piecesLeft) {
            setPiecesQty((prev) => prev + 1);
        } else {
            toast.warning(`Maximum available pieces in stock is ${piecesLeft}`);
        }
    };

    const handleDecrementCases = () => {
        if (casesQty > 1) {
            setCasesQty((prev) => prev - 1);
        }
    };

    const handleIncrementCases = () => {
        if (casesQty < casesLeft) {
            setCasesQty((prev) => prev + 1);
        } else {
            toast.warning(`Maximum available cases in stock is ${casesLeft}`);
        }
    };

    // Toggle Checkboxes for Units
    const toggleIncludePieces = () => {
        if (includePieces && !includeCases) {
            // Keep at least one checked
            return;
        }
        setIncludePieces((prev) => !prev);
    };

    const toggleIncludeCases = () => {
        if (includeCases && !includePieces) {
            // Keep at least one checked
            return;
        }
        setIncludeCases((prev) => !prev);
    };

    // Format Total Quantity Summary String (e.g. "1 Case and 2 Pieces")
    const totalQuantitySummary = useMemo(() => {
        const parts: string[] = [];

        if (includeCases && casesQty > 0) {
            parts.push(`${casesQty} ${casesQty === 1 ? "Case" : "Cases"}`);
        }

        if (includePieces && piecesQty > 0) {
            parts.push(`${piecesQty} ${piecesQty === 1 ? "Piece" : "Pieces"}`);
        }

        if (parts.length === 0) return "0 Selected";
        if (parts.length === 1) return parts[0];
        return parts.join(" and ");
    }, [includePieces, includeCases, piecesQty, casesQty]);

    // Toggle Wishlist
    const handleWishlistToggle = () => {
        setIsWishlisted((prev) => !prev);
        if (!isWishlisted) {
            toast.success(`${product.name} added to your wishlist`);
        } else {
            toast.info(`${product.name} removed from your wishlist`);
        }
    };

    // Add to Cart handler (Overrides existing cart quantities with exact local selections)
    const handleAddToCart = () => {
        const activePieces = includePieces ? piecesQty : 0;
        const activeCases = includeCases ? casesQty : 0;

        if (activePieces <= 0 && activeCases <= 0) {
            toast.warning("Please select at least one item quantity");
            return;
        }

        // Override cart item quantities with exact local choices
        setCartItemQuantities(product, activePieces, activeCases);
    };

    // Buy Now handler
    const handleBuyNow = () => {
        handleAddToCart();
        navigate("/shop");
    };

    // Filter related products
    const relatedProducts = useMemo(() => {
        return products
            .filter(
                (p) =>
                    p.id !== product.id &&
                    p.category.toLowerCase() === categoryName.toLowerCase(),
            )
            .slice(0, 4);
    }, [product.id, categoryName]);

    return (
        <div className="">
            <div className="pt-25"></div>
            <div className="min-h-screen bg-black-900 text-white pt-6 font-hanken md:mt-18">
                <Container className="">
                    {/* 1. Breadcrumbs */}
                    <nav className="flex items-center space-x-2 text-[10px] sm:text-sm text-neutral-400 font-hanken font-medium  uppercase overflow-x-hidden line-clamp-1 whitespace-nowrap pb-2">
                        <Link
                            to="/"
                            className="hover:text-gold-400 transition-colors"
                        >
                            HOME
                        </Link>
                        <ChevronRight className="size-3.5 text-neutral-600 shrink-0" />
                        <Link
                            to={`/shop?category=${encodeURIComponent(categoryName)}`}
                            className="hover:text-gold-400 transition-colors"
                        >
                            {/* {categoryName.toUpperCase()} */}
                            shop
                        </Link>
                        <ChevronRight className="size-3.5 text-neutral-600 shrink-0" />
                        <span className="text-gold-400 font-semibold">
                            {product.name.toUpperCase()}
                        </span>
                        {/* <ChevronRight className="size-3.5 text-neutral-600 shrink-0" />
                        <Link
                            to={`/shop?brand=${encodeURIComponent(brandName)}`}
                            className="hover:text-gold-400 transition-colors"
                        >
                            {brandName.toUpperCase()}
                        </Link>
                         */}
                    </nav>

                    {/* 2. Main Page Header Title */}
                    <div className="pb-4">
                        <h1 className="text-hg-c1 sm:text-hg-b2 font-playfair font-bold text-white  uppercase">
                            PRODUCT DESCRIPTION
                        </h1>
                    </div>

                    {/* 3. Main Product Showcase Grid */}
                    <div className="grid grid-cols-1 lg:flex gap-8 lg:gap-12 items-start md:mt-8">
                        {/* LEFT COLUMN: Main Gallery Display */}
                        <div className="w-full max-w-148 space-y-6">
                            {/* Main Image Container */}
                            <div className="relative w-full bg-black-700 rounded-lg p-8 sm:p-12 flex items-center justify-center min-h-95 sm:min-h-125 md:min-h-180.5 overflow-hidden group">
                                <img
                                    src={selectedImage}
                                    alt={product.name}
                                    className="max-h-90 h-90 md:max-h-127.5 md:h-127.5 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
                                />
                            </div>

                            {/* Thumbnail Bar */}
                            <div className="flex items-center gap-4 overflow-x-auto pb-2">
                                {galleryImages?.map((imgUrl, index) => {
                                    const isSelected = selectedImage === imgUrl;
                                    return (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() =>
                                                setSelectedImage(imgUrl)
                                            }
                                            className={cn(
                                                "size-20 sm:size-36.5 rounded-lg bg-black-700 p-2 flex items-center justify-center border transition-all cursor-pointer overflow-hidden shrink-0",
                                                isSelected
                                                    ? "border-gold-400 ring-2 ring-gold-400/40 bg-black-700 shadow-lg"
                                                    : "border-neutral-800 hover:border-neutral-600 opacity-70 hover:opacity-100",
                                            )}
                                        >
                                            <img
                                                src={imgUrl}
                                                alt={`${product.name} thumbnail ${index + 1}`}
                                                className="max-h-full w-auto object-contain"
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Detailed Product Purchase Card */}
                        <div className="w-full">
                            <div className="bg-black-700 rounded-2xl p-5 sm:p-8 spaces-y-6 shadow-2xl relative">
                                {/* Header: Category/Brand Subtitle & Wishlist Icon */}
                                <div>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="text-gold-500 font-hanken text-xs sm:text-sm md:text-[20px] md:font-bold uppercase">
                                            {brandName.toUpperCase()}{" "}
                                            <div className="size-2.5 bg-gold-500 rounded-full inline-block mx-2.5" />{" "}
                                            {categoryName.toUpperCase()}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleWishlistToggle}
                                            className="size-10 rounded-full bg-black/50 border border-neutral-800 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                                            aria-label="Add to wishlist"
                                        >
                                            <Heart
                                                className={cn(
                                                    "size-5 transition-colors",
                                                    isWishlisted
                                                        ? "fill-gold-400 text-gold-400"
                                                        : "text-white hover:text-white",
                                                )}
                                            />
                                        </button>
                                    </div>

                                    {/* Product Title */}
                                    <div>
                                        <h2 className="text-[1.5625rem] mt-1.25 sm:text-4xl lg:text-5xl font-playfair font-bold text-white leading-tight tracking-tight max-w-[13.75rem] md:max-w-123.25">
                                            {product.name}
                                        </h2>
                                    </div>
                                </div>

                                {/* Stock & Volume Information Bar */}
                                <div className="text-black-200 font-hanken text-[0.625rem] sm:text-base md:text-[1.25rem] font-normal tracking-wide mt-1.5">
                                    {product.volume} • {piecesLeft} Pieces Left
                                    • {casesLeft} Cases Left
                                </div>

                                {/* Large Metallic Gold Price */}
                                <div className="pt-1">
                                    <span className="text-gold-500 font-playfair text-4xl sm:text-5xl lg:text-[4.75rem] font-bold tracking-tight">
                                        {formattedPrice}
                                    </span>
                                </div>

                                {/* Purchase Unit Selector (Checkboxes for Pieces and Cases) */}
                                <div className="pt-6 ">
                                    <label className="block text-white text-xs md:text-base font-semibold tracking-widest uppercase font-hanken">
                                        PURCHASE UNIT
                                    </label>
                                    <div className="flex items-center gap-6 mt-2 md:mt-4">
                                        {/* Option 1: Pieces Checkbox */}
                                        <button
                                            type="button"
                                            onClick={toggleIncludePieces}
                                            className="flex items-center gap-2.5 cursor-pointer group"
                                        >
                                            <div
                                                className={cn(
                                                    "size-4 md:size-5 rounded flex items-center justify-center border transition-all",
                                                    includePieces
                                                        ? "bg-gold-400 border-gold-400 text-black font-bold"
                                                        : "border-gold-500 bg-transparent group-hover:border-neutral-400",
                                                )}
                                            >
                                                {includePieces && (
                                                    <Check className="size-2 md:size-3.5 stroke-3 text-black" />
                                                )}
                                            </div>
                                            <span
                                                className={cn(
                                                    "text-sm font-medium font-hanken transition-colors",
                                                    includePieces
                                                        ? "gradient-text"
                                                        : "text-white",
                                                )}
                                            >
                                                Pieces
                                            </span>
                                        </button>

                                        {/* Option 2: Cases Checkbox */}
                                        <button
                                            type="button"
                                            onClick={toggleIncludeCases}
                                            className="flex items-center gap-2.5 cursor-pointer group"
                                        >
                                            <div
                                                className={cn(
                                                    "size-4 md:size-5 rounded flex items-center justify-center border transition-all",
                                                    includeCases
                                                        ? "bg-gold-400 border-gold-400 text-black font-bold"
                                                        : "border-gold-500 bg-transparent group-hover:border-neutral-400",
                                                )}
                                            >
                                                {includeCases && (
                                                    <Check className="size-2 md:size-3.5 stroke-3 text-black" />
                                                )}
                                            </div>
                                            <span
                                                className={cn(
                                                    "text-sm font-medium font-hanken transition-colors",
                                                    includeCases
                                                        ? "gradient-text"
                                                        : "text-white",
                                                )}
                                            >
                                                Cases
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* QUANTITY IN PIECES Counter */}
                                {includePieces && (
                                    <div className="space-y-3 mt-6 md:pt-8">
                                        <label className="block text-white text-xs md:text-base font-semibold tracking-widest uppercase font-hanken">
                                            QUANTITY IN PIECES
                                        </label>
                                        <div className="flex items-center mt-3">
                                            <button
                                                type="button"
                                                onClick={handleDecrementPieces}
                                                disabled={piecesQty <= 1}
                                                className="size-5 sm:size-11 rounded-md border border-gold-500 bg-neutral-900/60 hover:bg-neutral-800 hover:border-gold-400/80 text-gold-500 flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                                aria-label="Decrease pieces quantity"
                                            >
                                                <Minus className="size-3 sm:size-4" />
                                            </button>

                                            <span className="w-24 text-center font-bold text-white text-body-c1 md:text-xl font-hanken">
                                                {piecesQty}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={handleIncrementPieces}
                                                disabled={
                                                    piecesQty >= piecesLeft
                                                }
                                                className="size-5 sm:size-11 rounded-md border border-gold-500 bg-neutral-900/60 hover:bg-neutral-800 hover:border-gold-400/80 text-gold-500 flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                                aria-label="Increase pieces quantity"
                                            >
                                                <Plus className="size-3 sm:size-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* QUANTITY IN CASES Counter */}
                                {includeCases && (
                                    <div className="space-y-3 pt-8">
                                        <label className="block text-white text-xs md:text-base font-semibold tracking-widest uppercase font-hanken">
                                            QUANTITY IN CASES
                                        </label>
                                        <div className="flex items-center mt-3">
                                            <button
                                                type="button"
                                                onClick={handleDecrementCases}
                                                disabled={casesQty <= 1}
                                                className="size-5 sm:size-11 rounded-md border border-gold-500 bg-neutral-900/60 hover:bg-neutral-800 hover:border-gold-400/80 text-white flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                                aria-label="Decrease cases quantity"
                                            >
                                                <Minus className="size-4" />
                                            </button>

                                            <span className="w-24 text-center font-bold text-white text-body-c1 md:text-xl font-hanken">
                                                {casesQty}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={handleIncrementCases}
                                                disabled={casesQty >= casesLeft}
                                                className="size-5 md:size-11 rounded-md border border-gold-500 bg-neutral-900/60 hover:bg-neutral-800 hover:border-gold-400/80 text-gold-500 flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                                aria-label="Increase cases quantity"
                                            >
                                                <Plus className="size-3 md:size-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* TOTAL QUANTITY SUMMARY BOX */}
                                <div className="pt-8">
                                    <p className="block text-white text-xs md:text-base font-semibold tracking-widest uppercase font-hanken">
                                        TOTAL QUANTITY
                                    </p>
                                    <div className="mt-3 bg-black-900/80 border border-neutral-800/90 rounded-md px-5 py-[3.5px] text-center text-white font-medium text-body-c1 md:text-base md:text-lg md:max-w-60.5 max-w-40.5">
                                        {totalQuantitySummary}
                                    </div>
                                </div>

                                {/* Action CTA Buttons */}
                                <div className="space-y-6 md:space-y-8 md:pt-12 pt-8">
                                    <button
                                        type="button"
                                        onClick={handleBuyNow}
                                        className="w-full h-10 md:h-13 bg-gold-g hover:opacity-95 text-black-900 font-hanken font-bold text-body-c1 md:text-base rounded-lg shadow-lg transition-all cursor-pointer flex items-center justify-center active:scale-[0.99]"
                                    >
                                        Buy Now
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleAddToCart}
                                        className="w-full h-10 md:h-13 bg-transparent hover:bg-white/10 border border-white/40 hover:borsder-gold-400 text-white font-hanken font-medium text-body-c1 md:text-base rounded-lg transition-all cursor-pointer flex items-center justify-center active:scale-[0.99]"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. Recommended / Related Products Section */}
                    {relatedProducts.length > 0 && (
                        <div className="pt-16">
                            <div>
                                <h3 className="text-2xl sm:text-hg-b2 font-playfair font-bold text-white tracking-wide">
                                    Similar Products
                                </h3>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 md:p-10">
                                {relatedProducts.map((relProduct) => (
                                    <ProductCard
                                        key={relProduct.id}
                                        product={relProduct}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </Container>
            </div>
        </div>
    );
};

export default ProductDetails;
