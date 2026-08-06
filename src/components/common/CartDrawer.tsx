// src/components/CartDrawer.tsx
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router";
import { useCart } from "@/context/CartContext";

interface CartDrawerProps {
    children: React.ReactNode;
}

export const CartDrawer = ({ children }: CartDrawerProps) => {
    const {
        cartItems,
        totalItems,
        subtotal,
        updateQuantity,
        removeFromCart,
    } = useCart();

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0,
        })
            .format(price)
            .replace("NGN", "₦");

    return (
        <Sheet>
            <SheetTrigger>{children}</SheetTrigger>

            {/* Slide out panel from the right hand side */}
            <SheetContent
                side="right"
                className="w-full sm:max-w-md bg-pod-gradient border-l border-neutral-800 p-0 text-white flex flex-col h-full z-50"
            >
                {/* Drawer Header */}
                <SheetHeader className="p-6 border-b border-neutral-800 flex flex-row items-center justify-between">
                    <SheetTitle className="text-xl font-serif text-white tracking-wide flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5 text-gold-500" /> Shopping
                        Bag ({totalItems})
                    </SheetTitle>
                </SheetHeader>

                {/* Drawer Scrollable Items Container List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-neutral-400 gap-3 py-12">
                            <ShoppingCart className="h-14 w-14 text-neutral-600 stroke-[1.5]" />
                            <p className="text-sm font-medium text-neutral-300">
                                Your cart is currently empty.
                            </p>
                            <p className="text-xs text-neutral-500 text-center max-w-xs">
                                Explore our collection of premium spirits and luxury beverages to populate your bag.
                            </p>
                        </div>
                    ) : (
                        cartItems.map((item) => {
                            const maxStock =
                                item.piecesLeft !== undefined
                                    ? item.piecesLeft
                                    : item.casesLeft !== undefined
                                    ? item.casesLeft
                                    : Infinity;
                            const isMaxReached = item.quantity >= maxStock;

                            return (
                                <div
                                    key={item.id}
                                    className="flex gap-4 bg-black/40 p-3.5 rounded-xl border border-neutral-800/80 items-center hover:border-neutral-700 transition-colors"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 rounded-lg object-contain bg-black-900 border border-neutral-800 p-1 shrink-0"
                                    />

                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-xs font-medium text-white truncate tracking-wide font-playfair">
                                            {item.name}
                                        </h4>
                                        <p className="text-xs text-gold-500 font-semibold mt-1">
                                            {formatPrice(item.price)}
                                        </p>

                                        {/* Quantity Actions Selector */}
                                        <div className="flex items-center gap-2 mt-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        item.quantity - 1,
                                                    )
                                                }
                                                className="h-6 w-6 rounded-md bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus className="h-3 w-3" />
                                            </button>
                                            <span className="text-xs font-semibold w-4 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                type="button"
                                                disabled={isMaxReached}
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        item.quantity + 1,
                                                    )
                                                }
                                                className="h-6 w-6 rounded-md bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-neutral-800"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Remove single item action */}
                                    <button
                                        type="button"
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-neutral-500 hover:text-red-400 p-1.5 transition-colors cursor-pointer"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Drawer Sticky Footer Overview panel */}
                {cartItems.length > 0 && (
                    <div className="p-6 border-t border-neutral-800 bg-black/60 space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-neutral-400">Subtotal</span>
                            <span className="text-lg font-bold text-gold-500 font-playfair">
                                {formatPrice(subtotal)}
                            </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 leading-normal">
                            Shipping calculations, taxes, and applied
                            promotional discounts will be computed at the secure
                            checkout step.
                        </p>

                        <div className="grid gap-2 pt-2">
                            <SheetTrigger>
                                <Link
                                    to="/checkout"
                                    className="w-full text-center text-xs font-bold py-3.5 rounded-lg bg-gold-g text-black tracking-wide shadow-lg block hover:opacity-95 transition-opacity"
                                >
                                    Proceed To Checkout
                                </Link>
                            </SheetTrigger>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};
