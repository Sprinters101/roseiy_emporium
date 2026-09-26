import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Heart, Minus, Plus, Check, ChevronRight, Loader2 } from "lucide-react";
import { products as mockProducts } from "@/lib/site_data";
import type { Product } from "@/config/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/common/ProductCard";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import Container from "../common/Container";
import { useGetProductBySlug, useGetProducts } from "@/service/queries";
import { ProductDetailsSkeleton } from "./ProductDetailsSkeleton";

export const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { cartItems, setCartItemQuantities, isAddingProduct } = useCart();

    // 1. Fetch live product by slug or id from the backend
    const { data: productApi, isLoading: isLoadingProduct } =
        useGetProductBySlug(id ?? "");

    const liveProduct = useMemo(() => {
        const raw = (productApi?.data as any)?.product || productApi?.data;
        return raw || null;
    }, [productApi]);

    // Standardize product object with live backend data (or fallback)
    const product: Product = useMemo(() => {
        if (liveProduct) {
            const pieceUnit = liveProduct.sellingUnits?.find((u: any) =>
                u.name?.toLowerCase().includes("piece"),
            );
            const cartonUnit = liveProduct.sellingUnits?.find(
                (u: any) =>
                    u.name?.toLowerCase().includes("carton") ||
                    u.name?.toLowerCase().includes("case"),
            );
            const primaryUnit = liveProduct.sellingUnits?.[0];

            const primaryImg =
                liveProduct.images?.find((img: any) => img.isPrimary)
                    ?.imageUrl ||
                liveProduct.images?.[0]?.imageUrl ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHcoC1Vf-DNLzYsBkbGaBdVEHTk1AhxeEfgaJguZgz-XqWAuwnmJ4gkxPA&s=10";

            const galleryList = liveProduct.images?.map(
                (img: any) => img.imageUrl,
            ) || [primaryImg];

            const piecesStock =
                pieceUnit?.stock !== undefined
                    ? Number(pieceUnit.stock)
                    : primaryUnit?.stock !== undefined
                      ? Number(primaryUnit.stock)
                      : liveProduct.piecesLeft !== undefined
                        ? Number(liveProduct.piecesLeft)
                        : 22;

            const casesStock =
                cartonUnit?.stock !== undefined
                    ? Number(cartonUnit.stock)
                    : liveProduct.casesLeft !== undefined
                      ? Number(liveProduct.casesLeft)
                      : liveProduct.sellingUnits &&
                          liveProduct.sellingUnits.length > 0
                        ? 0
                        : 10;

            return {
                id: liveProduct.productId || liveProduct.slug || id || "",
                productId: liveProduct.productId,
                slug: liveProduct.slug,
                name: liveProduct.name,
                brand: liveProduct.brand?.name || "",
                brandId: liveProduct.brandId,
                category: liveProduct.category?.name || "",
                categoryId: liveProduct.categoryId,
                volume: (liveProduct as any).volume || "",
                piecesLeft: piecesStock,
                casesLeft: casesStock,
                price: primaryUnit ? Number(primaryUnit.price || primaryUnit.unitPrice || 0) : 0,
                image: primaryImg,
                gallery: galleryList.length > 0 ? galleryList : [primaryImg],
                description: liveProduct.description || "",
                sellingUnits: liveProduct.sellingUnits,
            };
        }

        const found = mockProducts.find((p) => p.id === id);
        if (found) return found;

        return (
            mockProducts.find((p) => p.id === "10") || {
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
            }
        );
    }, [liveProduct, id]);

    // Check if this product is already in the cart
    const cartItem = useMemo(() => {
        return cartItems.find((item) => item.id === product.id);
    }, [cartItems, product.id]);

    // Stock metrics
    const piecesLeft = product.piecesLeft ?? 22;
    const casesLeft = product.casesLeft ?? 10;

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

    // Sync selectedImage when gallery updates
    useEffect(() => {
        if (galleryImages.length > 0) {
            setSelectedImage(galleryImages[0]);
        }
    }, [galleryImages]);

    // Multi-unit purchase selection state: default pieces selected (1), cases inactive (0) until chosen
    const [includePieces, setIncludePieces] = useState<boolean>(
        () => piecesLeft > 0 || casesLeft <= 0,
    );
    const [includeCases, setIncludeCases] = useState<boolean>(
        () => piecesLeft <= 0 && casesLeft > 0,
    );

    // Independent local quantity states for pieces and cases
    const [piecesQty, setPiecesQty] = useState<number>(() =>
        piecesLeft > 0 ? 1 : 0,
    );
    const [casesQty, setCasesQty] = useState<number>(() =>
        piecesLeft <= 0 && casesLeft > 0 ? 1 : 0,
    );

    const { isInWishlist, toggleWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);

    // Sync local quantities with cart item whenever cart state or stock updates
    useEffect(() => {
        if (cartItem) {
            const p = cartItem.piecesQty ?? (cartItem.quantity || 1);
            const c = cartItem.casesQty ?? 0;
            const validP = Math.min(p, piecesLeft);
            const validC = Math.min(c, casesLeft);
            setPiecesQty(validP);
            setCasesQty(validC);
            setIncludePieces(validP > 0 && piecesLeft > 0);
            setIncludeCases(validC > 0 && casesLeft > 0);
        } else {
            if (piecesLeft > 0) {
                setIncludePieces(true);
                setPiecesQty(1);
                setIncludeCases(false);
                setCasesQty(0);
            } else if (casesLeft > 0) {
                setIncludePieces(false);
                setPiecesQty(0);
                setIncludeCases(true);
                setCasesQty(1);
            } else {
                setIncludePieces(false);
                setPiecesQty(0);
                setIncludeCases(false);
                setCasesQty(0);
            }
        }
    }, [cartItem, piecesLeft, casesLeft]);

    const brandName = product.brand || "Glenfiddich";
    const categoryName = product.category || "Whiskey";

    // Unit pricing from sellingUnits
    const pieceUnit = (product as any).sellingUnits?.find((u: any) =>
        u.name?.toLowerCase().includes("piece"),
    );
    const cartonUnit = (product as any).sellingUnits?.find(
        (u: any) =>
            u.name?.toLowerCase().includes("carton") ||
            u.name?.toLowerCase().includes("case"),
    );
    const piecePrice = pieceUnit
        ? Number(pieceUnit.price)
        : product.price || 110000;
    const casePrice = cartonUnit ? Number(cartonUnit.price) : piecePrice * 6;

    // Format NGN Currency
    const formattedPrice = useMemo(() => {
        const total =
            (includePieces ? piecesQty * piecePrice : 0) +
            (includeCases ? casesQty * casePrice : 0);
        const displayAmount = total > 0 ? total : piecePrice;

        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0,
        })
            .format(displayAmount)
            .replace("NGN", "₦");
    }, [
        includePieces,
        includeCases,
        piecesQty,
        casesQty,
        piecePrice,
        casePrice,
    ]);

    // Local Quantity Increment / Decrement Handlers (Does NOT affect cart until Add to Cart is clicked)
    const handleDecrementPieces = () => {
        if (piecesLeft <= 0) {
            toast.error("Pieces are out of stock");
            return;
        }
        if (piecesQty > 1) {
            setPiecesQty((prev) => prev - 1);
        }
    };

    const handleIncrementPieces = () => {
        if (piecesLeft <= 0) {
            toast.error("Pieces are out of stock");
            return;
        }
        if (piecesQty >= piecesLeft) {
            toast.warning(`Maximum available pieces in stock is ${piecesLeft}`);
            return;
        }
        setPiecesQty((prev) => prev + 1);
    };

    const handleDecrementCases = () => {
        if (casesLeft <= 0) {
            toast.error("Cases are out of stock");
            return;
        }
        if (casesQty > 1) {
            setCasesQty((prev) => prev - 1);
        }
    };

    const handleIncrementCases = () => {
        if (casesLeft <= 0) {
            toast.error("Cases are out of stock");
            return;
        }
        if (casesQty >= casesLeft) {
            toast.warning(`Maximum available cases in stock is ${casesLeft}`);
            return;
        }
        setCasesQty((prev) => prev + 1);
    };

    // Toggle Checkboxes for Units
    const toggleIncludePieces = () => {
        if (piecesLeft <= 0) {
            toast.error("Pieces are out of stock");
            return;
        }

        if (!includePieces) {
            setIncludePieces(true);
            if (piecesQty === 0) setPiecesQty(Math.min(1, piecesLeft));
        } else {
            if (!includeCases || casesLeft <= 0) {
                toast.warning("At least one purchase unit must be selected");
                return;
            }
            setIncludePieces(false);
        }
    };

    const toggleIncludeCases = () => {
        if (casesLeft <= 0) {
            toast.error("Cases are out of stock");
            return;
        }

        if (!includeCases) {
            setIncludeCases(true);
            if (casesQty === 0) setCasesQty(Math.min(1, casesLeft));
        } else {
            if (!includePieces || piecesLeft <= 0) {
                toast.warning("At least one purchase unit must be selected");
                return;
            }
            setIncludeCases(false);
        }
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
        toggleWishlist(product);
    };

    // Add to Cart handler (Overrides existing cart quantities with exact local selections)
    const handleAddToCart = () => {
        const activePieces = includePieces ? piecesQty : 0;
        const activeCases = includeCases ? casesQty : 0;

        if (activePieces <= 0 && activeCases <= 0) {
            toast.warning("Please select at least one item quantity");
            return;
        }

        if (activePieces > piecesLeft) {
            toast.warning(`Cannot exceed available pieces (${piecesLeft})`);
            return;
        }

        if (activeCases > casesLeft) {
            toast.warning(`Cannot exceed available cases (${casesLeft})`);
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

    // 2. Fetch live related products
    const { data: similarProductsApi } = useGetProducts({
        categoryId: (product as any).categoryId,
        limit: 8,
    });

    const relatedProducts = useMemo(() => {
        const liveItems =
            similarProductsApi?.data?.products ||
            similarProductsApi?.data?.items;
        if (liveItems && liveItems.length > 0) {
            return liveItems
                .filter(
                    (p: any) =>
                        (p.productId || p.id) !== product.id &&
                        (p.slug || "") !== (liveProduct?.slug || ""),
                )
                .slice(0, 4);
        }

        return mockProducts
            .filter(
                (p) =>
                    p.id !== product.id &&
                    p.category.toLowerCase() === categoryName.toLowerCase(),
            )
            .slice(0, 4);
    }, [similarProductsApi, product.id, liveProduct, categoryName]);

    if (isLoadingProduct) {
        return <ProductDetailsSkeleton />;
    }

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
                                    {product.volume || product.description} •{" "}
                                    {piecesLeft} Pieces Left • {casesLeft} Cases
                                    Left
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
                                            className={cn(
                                                "flex items-center gap-2.5 group cursor-pointer",
                                                piecesLeft <= 0 && "opacity-60",
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "size-4 md:size-5 rounded flex items-center justify-center border transition-all",
                                                    includePieces &&
                                                        piecesLeft > 0
                                                        ? "bg-gold-400 border-gold-400 text-black font-bold"
                                                        : "border-gold-500 bg-transparent group-hover:border-neutral-400",
                                                )}
                                            >
                                                {includePieces &&
                                                    piecesLeft > 0 && (
                                                        <Check className="size-2 md:size-3.5 stroke-3 text-black" />
                                                    )}
                                            </div>
                                            <span
                                                className={cn(
                                                    "text-sm font-medium font-hanken transition-colors",
                                                    includePieces &&
                                                        piecesLeft > 0
                                                        ? "gradient-text"
                                                        : "text-white",
                                                )}
                                            >
                                                Pieces{" "}
                                                {piecesLeft <= 0 && (
                                                    <span className="text-red-400 text-xs ml-1">
                                                        (Out of Stock)
                                                    </span>
                                                )}
                                            </span>
                                        </button>

                                        {/* Option 2: Cases Checkbox */}
                                        <button
                                            type="button"
                                            onClick={toggleIncludeCases}
                                            className={cn(
                                                "flex items-center gap-2.5 group cursor-pointer",
                                                casesLeft <= 0 && "opacity-60",
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "size-4 md:size-5 rounded flex items-center justify-center border transition-all",
                                                    includeCases &&
                                                        casesLeft > 0
                                                        ? "bg-gold-400 border-gold-400 text-black font-bold"
                                                        : "border-gold-500 bg-transparent group-hover:border-neutral-400",
                                                )}
                                            >
                                                {includeCases &&
                                                    casesLeft > 0 && (
                                                        <Check className="size-2 md:size-3.5 stroke-3 text-black" />
                                                    )}
                                            </div>
                                            <span
                                                className={cn(
                                                    "text-sm font-medium font-hanken transition-colors",
                                                    includeCases &&
                                                        casesLeft > 0
                                                        ? "gradient-text"
                                                        : "text-white",
                                                )}
                                            >
                                                Cases{" "}
                                                {casesLeft <= 0 && (
                                                    <span className="text-red-400 text-xs ml-1">
                                                        (Out of Stock)
                                                    </span>
                                                )}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* QUANTITY IN PIECES Counter */}
                                {(includePieces || piecesLeft <= 0) && (
                                    <div className="space-y-3 mt-6 md:pt-8">
                                        <div className="flex items-center justify-between">
                                            <label className="block text-white text-xs md:text-base font-semibold tracking-widest uppercase font-hanken">
                                                QUANTITY IN PIECES
                                            </label>
                                            {piecesLeft <= 0 ? (
                                                <span className="text-red-400 text-xs md:text-sm font-medium font-hanken">
                                                    Out of Stock
                                                </span>
                                            ) : piecesQty >= piecesLeft ? (
                                                <span className="text-amber-400 text-xs md:text-sm font-medium font-hanken">
                                                    Max in Stock ({piecesLeft})
                                                </span>
                                            ) : (
                                                <span className="text-neutral-400 text-xs md:text-sm font-hanken">
                                                    {piecesLeft} available
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center mt-3">
                                            <button
                                                type="button"
                                                onClick={handleDecrementPieces}
                                                className={cn(
                                                    "size-5 sm:size-11 rounded-md border flex items-center justify-center transition-all",
                                                    piecesQty <= 1 ||
                                                        piecesLeft <= 0
                                                        ? "border-neutral-700 bg-neutral-900/40 text-neutral-600 opacity-40 cursor-not-allowed"
                                                        : "border-gold-500 bg-neutral-900/60 hover:bg-neutral-800 hover:border-gold-400/80 text-gold-500 cursor-pointer",
                                                )}
                                                aria-label="Decrease pieces quantity"
                                            >
                                                <Minus className="size-3 sm:size-4" />
                                            </button>

                                            <span className="w-24 text-center font-bold text-white text-body-c1 md:text-xl font-hanken">
                                                {piecesLeft <= 0
                                                    ? 0
                                                    : piecesQty}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={handleIncrementPieces}
                                                className={cn(
                                                    "size-5 sm:size-11 rounded-md border flex items-center justify-center transition-all",
                                                    piecesQty >= piecesLeft ||
                                                        piecesLeft <= 0
                                                        ? "border-neutral-700 bg-neutral-900/40 text-neutral-600 opacity-40 cursor-not-allowed"
                                                        : "border-gold-500 bg-neutral-900/60 hover:bg-neutral-800 hover:border-gold-400/80 text-gold-500 cursor-pointer",
                                                )}
                                                aria-label="Increase pieces quantity"
                                            >
                                                <Plus className="size-3 sm:size-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* QUANTITY IN CASES Counter */}
                                {(includeCases || casesLeft <= 0) && (
                                    <div className="space-y-3 pt-8">
                                        <div className="flex items-center justify-between">
                                            <label className="block text-white text-xs md:text-base font-semibold tracking-widest uppercase font-hanken">
                                                QUANTITY IN CASES
                                            </label>
                                            {casesLeft <= 0 ? (
                                                <span className="text-red-400 text-xs md:text-sm font-medium font-hanken">
                                                    Out of Stock
                                                </span>
                                            ) : casesQty >= casesLeft ? (
                                                <span className="text-amber-400 text-xs md:text-sm font-medium font-hanken">
                                                    Max in Stock ({casesLeft})
                                                </span>
                                            ) : (
                                                <span className="text-neutral-400 text-xs md:text-sm font-hanken">
                                                    {casesLeft} available
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center mt-3">
                                            <button
                                                type="button"
                                                onClick={handleDecrementCases}
                                                className={cn(
                                                    "size-5 sm:size-11 rounded-md border flex items-center justify-center transition-all",
                                                    casesQty <= 1 ||
                                                        casesLeft <= 0
                                                        ? "border-neutral-700 bg-neutral-900/40 text-neutral-600 opacity-40 cursor-not-allowed"
                                                        : "border-gold-500 bg-neutral-900/60 hover:bg-neutral-800 hover:border-gold-400/80 text-white cursor-pointer",
                                                )}
                                                aria-label="Decrease cases quantity"
                                            >
                                                <Minus className="size-4" />
                                            </button>

                                            <span className="w-24 text-center font-bold text-white text-body-c1 md:text-xl font-hanken">
                                                {casesLeft <= 0 ? 0 : casesQty}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={handleIncrementCases}
                                                className={cn(
                                                    "size-5 md:size-11 rounded-md border flex items-center justify-center transition-all",
                                                    casesQty >= casesLeft ||
                                                        casesLeft <= 0
                                                        ? "border-neutral-700 bg-neutral-900/40 text-neutral-600 opacity-40 cursor-not-allowed"
                                                        : "border-gold-500 bg-neutral-900/60 hover:bg-neutral-800 hover:border-gold-400/80 text-gold-500 cursor-pointer",
                                                )}
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
                                    <div className="mt-3 bg-black-900/80 border border-neutral-800/90 rounded-md px-5 py-[3.5px] text-center text-white font-medium text-body-c1 md:text-base md:text-lg md:max-w-60.5  w-fit">
                                        {totalQuantitySummary}
                                    </div>
                                </div>

                                {/* Action CTA Buttons */}
                                <div className="space-y-6 md:space-y-8 md:pt-12 pt-8">
                                    {(() => {
                                        const isAdding =
                                            isAddingProduct(product.id) ||
                                            isAddingProduct(
                                                (product as any).productId ||
                                                    "",
                                            ) ||
                                            isAddingProduct(
                                                (product as any).slug || "",
                                            ) ||
                                            (id ? isAddingProduct(id) : false);

                                        const isProductOutOfStock =
                                            piecesLeft <= 0 && casesLeft <= 0;
                                        const isCurrentSelectionInvalid =
                                            (!includePieces && !includeCases) ||
                                            (includePieces &&
                                                (piecesQty <= 0 ||
                                                    piecesQty > piecesLeft ||
                                                    piecesLeft <= 0)) ||
                                            (includeCases &&
                                                (casesQty <= 0 ||
                                                    casesQty > casesLeft ||
                                                    casesLeft <= 0));

                                        const isBtnDisabled =
                                            isAdding ||
                                            isProductOutOfStock ||
                                            isCurrentSelectionInvalid;

                                        return (
                                            <>
                                                <button
                                                    type="button"
                                                    disabled={isBtnDisabled}
                                                    onClick={handleBuyNow}
                                                    className={cn(
                                                        "w-full h-10 md:h-13 font-hanken font-bold text-body-c1 md:text-base rounded-lg shadow-lg transition-all flex items-center justify-center active:scale-[0.99] gap-2",
                                                        isBtnDisabled
                                                            ? "bg-neutral-800/80 border border-neutral-800 text-neutral-500 cursor-not-allowed opacity-60"
                                                            : "bg-gold-g hover:opacity-95 text-black-900 cursor-pointer",
                                                    )}
                                                >
                                                    {isAdding ? (
                                                        <>
                                                            <Loader2 className="size-4.5 animate-spin text-black-900" />
                                                            <span>
                                                                Processing...
                                                            </span>
                                                        </>
                                                    ) : isProductOutOfStock ? (
                                                        "Out of Stock"
                                                    ) : (
                                                        "Buy Now"
                                                    )}
                                                </button>

                                                <button
                                                    type="button"
                                                    disabled={isBtnDisabled}
                                                    onClick={handleAddToCart}
                                                    className={cn(
                                                        "w-full h-10 md:h-13 font-hanken font-medium text-body-c1 md:text-base rounded-lg transition-all flex items-center justify-center active:scale-[0.99] gap-2",
                                                        isBtnDisabled
                                                            ? "bg-neutral-900/60 border border-neutral-800 text-neutral-500 cursor-not-allowed opacity-60"
                                                            : "bg-transparent hover:bg-white/10 border border-white/40 hover:border-gold-400 text-white cursor-pointer",
                                                    )}
                                                >
                                                    {isAdding ? (
                                                        <>
                                                            <Loader2 className="size-4.5 animate-spin text-gold-500" />
                                                            <span>
                                                                Adding to
                                                                Cart...
                                                            </span>
                                                        </>
                                                    ) : isProductOutOfStock ? (
                                                        "Out of Stock"
                                                    ) : (
                                                        "Add to Cart"
                                                    )}
                                                </button>
                                            </>
                                        );
                                    })()}
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
                                {relatedProducts.map((relProduct: any) => (
                                    <ProductCard
                                        key={
                                            relProduct.productId ||
                                            relProduct.id
                                        }
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
