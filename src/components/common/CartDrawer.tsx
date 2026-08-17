import React, { useState, useEffect } from "react";
import { Trash2, Plus, Minus, X } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router";
import { useCart } from "@/context/CartContext";
import { ShopEmptyState } from "@/components/shop/ShopEmptyState";
import { cn } from "@/lib/utils";

interface CartDrawerProps {
    children: React.ReactNode;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ children }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const {
        cartItems,
        totalItems,
        subtotal,
        updateUnitQuantities,
        removeFromCart,
    } = useCart();

    // Monitor screen width to switch sheet side between bottom (mobile) and right (desktop)
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Format currency string with Nigerian Naira symbol
    const formatPrice = (price: number) =>
        new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0,
        })
            .format(price)
            .replace("NGN", "₦");

    const drawerSide = isMobile ? "bottom" : "right";

    // Format quantity summary string (e.g. "1 Case and 2 Pieces")
    const getQuantitySummary = (item: {
        piecesQty?: number;
        casesQty?: number;
        quantity: number;
    }) => {
        const pQty = item.piecesQty ?? item.quantity ?? 0;
        const cQty = item.casesQty ?? 0;

        const parts: string[] = [];
        if (cQty > 0) {
            parts.push(`${cQty} ${cQty === 1 ? "Case" : "Cases"}`);
        }
        if (pQty > 0 || parts.length === 0) {
            parts.push(`${pQty} ${pQty === 1 ? "Piece" : "Pieces"}`);
        }
        return parts.join(" and ");
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>{children}</SheetTrigger>

            {/* Slide out drawer panel (bottom on mobile, right on desktop) */}
            <SheetContent
                side={drawerSide}
                showCloseButton={false}
                className={cn(
                    " w-full bg-black-700 border-none p-0 text-white flex flex-col h-full z-50 overflow-hidden data-[side=right]:sm:max-w-2xl",
                    isMobile &&
                        "w-full max-h-[92vh] h-[92vh]  border-t border-neutral-800 p-0 text-white flex flex-col z-50 overflow-hidden",
                )}
            >
                {/* Header */}
                <SheetHeader className="px-6 md:p-6 flex flex-row items-center justify-between shrink-0">
                    <SheetTitle className="text-xl md:text-[1.9375rem] font-playfair font-bold text-white tracking-wider uppercase">
                        CART ({totalItems})
                    </SheetTitle>

                    <SheetClose className="size-9 rounded-full  flex items-center justify-center text-white hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer">
                        <X className="size-5" />
                        <span className="sr-only">Close</span>
                    </SheetClose>
                </SheetHeader>

                {/* Scrollable Body Content */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full py-8">
                            <ShopEmptyState
                                isCartEmpty={true}
                                onButtonClick={() => {
                                    setIsOpen(false);
                                    navigate("/shop");
                                }}
                            />
                        </div>
                    ) : (
                        cartItems.map((item) => {
                            const pQty = item.piecesQty ?? item.quantity ?? 1;
                            const cQty = item.casesQty ?? 0;
                            const piecesLeft = item.piecesLeft ?? Infinity;
                            const casesLeft = item.casesLeft ?? Infinity;

                            const categoryName = item.category || "Champagne";
                            const volumeText = item.volume || "75cl";

                            return (
                                <div
                                    key={item.id}
                                    className="bsg-[#141415] border-none rounded-2xl  flex gap-4 relative items-stretch hover:border-neutral-700 transition-all md:max-h-56"
                                >
                                    {/* Left Product Image Thumbnail Box */}
                                    <div className="w-full h-41.25 md:h-56 md:max-w-56 max-w-36.25 max-h-41.25 md:max-h-56  min-h-full  bg-black-900 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-full max-h-26.25 md:max-h-40 w-auto object-contain drop-shadow-md"
                                        />
                                    </div>

                                    {/* Middle Details Column */}
                                    <div className="flex-1 min-w-0 pr-8 ">
                                        <div>
                                            <span className="text-gold-500 leading-0 font-hanken text-[0.5rem] md:text-[0.625rem] sm:text-[0.8125rem] font-semibold tracking-widest uppercase">
                                                {categoryName.toUpperCase()}
                                            </span>

                                            <h4 className="text-[0.8125rem] leading-[120%] sm:text-base md:text-hg-c1 font-playfair font-bold text-white  mt-0.5  line clamp-2 md:line-clamp-2 max-w-28.5 md:max-w-59.5">
                                                {item.name}
                                            </h4>

                                            <p className="text-[0.5rem] md:text-[0.625rem]  text-black-200 font-hanken mt-0.5">
                                                {volumeText} • Quantity:{" "}
                                                {getQuantitySummary(item)}
                                            </p>

                                            <div className="mt-1">
                                                <span className="text-gold-500 leading-0 leading font-playfair text-base sm:text-xl md:text-[1.5625rem] font-bold">
                                                    {formatPrice(
                                                        item.price *
                                                            item.quantity,
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Counter 1: QUANTITY IN PIECES */}
                                        <div className="pt-2 md:pt-3">
                                            <label className="block text-white text-[0.375rem] md:text-[0.625rem] font-semibold tracking-wider uppercase font-hanken">
                                                QUANTITY IN PIECES
                                            </label>
                                            <div className="flex items-center gap-2 mt-1 md:mt-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateUnitQuantities(
                                                            item.id,
                                                            pQty - 1,
                                                            cQty,
                                                        )
                                                    }
                                                    disabled={pQty <= 0}
                                                    className="size-4 md:size-6 rounded border border-gold-500/80 bg-neutral-900/60 hover:bg-neutral-800 text-gold-500 flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                                    aria-label="Decrease pieces quantity"
                                                >
                                                    <Minus className="size-3" />
                                                </button>

                                                <span className="w-8 text-center font-bold text-white text-[0.625rem] md:text-sm font-hanken">
                                                    {pQty}
                                                </span>

                                                <button
                                                    type="button"
                                                    disabled={
                                                        pQty >= piecesLeft
                                                    }
                                                    onClick={() =>
                                                        updateUnitQuantities(
                                                            item.id,
                                                            pQty + 1,
                                                            cQty,
                                                        )
                                                    }
                                                    className="size-4 md:size-6 rounded border border-gold-500/80 bg-neutral-900/60 hover:bg-neutral-800 text-gold-500 flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                                    aria-label="Increase pieces quantity"
                                                >
                                                    <Plus className="size-3" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Counter 2: QUANTITY IN CASES */}
                                        <div className="pt-2 md:pt-3">
                                            <label className="block text-white text-[0.375rem] md:text-[0.625rem] font-semibold tracking-wider uppercase font-hanken">
                                                QUANTITY IN CASES
                                            </label>
                                            <div className="flex items-center gap-2 mt-1 md:mt-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateUnitQuantities(
                                                            item.id,
                                                            pQty,
                                                            cQty - 1,
                                                        )
                                                    }
                                                    disabled={cQty <= 0}
                                                    className="size-4 md:size-6 rounded border border-gold-500/80 bg-neutral-900/60 hover:bg-neutral-800 text-gold-500 flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                                    aria-label="Decrease cases quantity"
                                                >
                                                    <Minus className="size-3" />
                                                </button>

                                                <span className="w-8 text-center font-bold text-white text-[0.625rem] md:text-sm font-hanken">
                                                    {cQty}
                                                </span>

                                                <button
                                                    type="button"
                                                    disabled={cQty >= casesLeft}
                                                    onClick={() =>
                                                        updateUnitQuantities(
                                                            item.id,
                                                            pQty,
                                                            cQty + 1,
                                                        )
                                                    }
                                                    className="size-4 md:size-6 rounded border border-gold-500/80 bg-neutral-900/60 hover:bg-neutral-800 text-gold-500 flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                                    aria-label="Increase cases quantity"
                                                >
                                                    <Plus className="size-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Top Right Trash Button */}
                                    <button
                                        type="button"
                                        onClick={() => removeFromCart(item.id)}
                                        className="size-6 md:size-9 rounded-full bg-black-900 hover:bg-red-950 border-none  text-red-500 flex items-center justify-center cursor-pointer transition-colors absolute top-4 right-4"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 className="size-2 md:size-4" />
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer Overview & CTA Action Section */}
                {cartItems.length > 0 && (
                    <div className="px-4 sm:p-6 space-y-4 shrink-0">
                        {/* Total Summary Container */}
                        <div className="bg-black-900 border border-white/5 rounded-xl px-5 py-4 flex items-center justify-between">
                            <span className="text-gold-500 font-hanken text-lg sm:text-xl font-normal">
                                Total
                            </span>
                            <span className="text-gold-500 font-hanken text-2xl sm:text-[1.5625rem] font-bold">
                                {formatPrice(subtotal)}
                            </span>
                        </div>

                        {/* CTA Buttons */}
                        <div className="space-y-3 md:space-y-4 pt-1">
                            <Link
                                to="/checkout"
                                onClick={() => setIsOpen(false)}
                                className="w-full h-10 md:h-12 sm:h-13 bg-gold-g hover:opacity-95 text-black-900 font-hanken font-bold text-[0.8125rem] sm:text-base rounded-lg shadow-lg flex items-center justify-center transition-all active:scale-[0.99]"
                            >
                                Proceed to Checkout
                            </Link>

                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="w-full h-10 sm:h-12 bg-transparent hover:bg-white/10 border border-white/40 hover:border-gold-400 text-white font-hanken font-medium text-sm sm:text-base rounded-lg flex items-center justify-center transition-all active:scale-[0.99] cursor-pointer"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default CartDrawer;
