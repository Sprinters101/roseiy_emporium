// src/components/CartDrawer.tsx
import { ShoppingCart, Trash2, Plus, Minus, X } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

interface CartDrawerProps {
    children: React.ReactNode;
}

export const CartDrawer = ({ children }: CartDrawerProps) => {
    // Mock cart items data for layout structure (we will wire this to a React Query/Zustand state later)
    const cartItems = [
        {
            id: "1",
            name: "Premium Curated Vintage Reserve",
            price: 120,
            quantity: 1,
            image: "https://via.placeholder.com/80",
        },
        {
            id: "2",
            name: "Roseiy Special Edition Blend",
            price: 85,
            quantity: 2,
            image: "https://via.placeholder.com/80",
        },
    ];

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
    );

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>

            {/* Slide out panel from the right hand side */}
            <SheetContent
                side="right"
                className="w-full sm:max-w-md bg-pod-gradient border-l border-neutral-800 p-0 text-white flex flex-col h-full"
            >
                {/* Drawer Header */}
                <SheetHeader className="p-6 border-b border-neutral-800 flex flex-row items-center justify-between">
                    <SheetTitle className="text-xl font-serif text-white tracking-wide flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5 text-gold" /> Shopping
                        Bag ({cartItems.length})
                    </SheetTitle>
                </SheetHeader>

                {/* Drawer Scrollable Items Container List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-neutral-400 gap-2">
                            <ShoppingCart className="h-12 w-12 text-neutral-600 stroke-[1.5]" />
                            <p className="text-sm font-medium">
                                Your cart is currently empty.
                            </p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-4 bg-black/20 p-3 rounded-xl border border-neutral-800/60 items-center"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 rounded-lg object-cover bg-neutral-900 border border-neutral-800"
                                />

                                <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-medium text-white truncate tracking-wide">
                                        {item.name}
                                    </h4>
                                    <p className="text-xs text-gold font-semibold mt-1">
                                        ${item.price}
                                    </p>

                                    {/* Quantity Actions Selector */}
                                    <div className="flex items-center gap-2 mt-2">
                                        <button className="h-6 w-6 rounded-md bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 text-neutral-300">
                                            <Minus className="h-3 w-3" />
                                        </button>
                                        <span className="text-xs font-semibold w-4 text-center">
                                            {item.quantity}
                                        </span>
                                        <button className="h-6 w-6 rounded-md bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 text-neutral-300">
                                            <Plus className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>

                                {/* Remove single item action */}
                                <button className="text-neutral-500 hover:text-destructive p-1 transition-colors">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Drawer Sticky Footer Overview panel */}
                {cartItems.length > 0 && (
                    <div className="p-6 border-t border-neutral-800 bg-black/30 space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-neutral-400">Subtotal</span>
                            <span className="text-lg font-bold text-gold">
                                ${subtotal.toFixed(2)}
                            </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 leading-normal">
                            Shipping calculations, taxes, and applied
                            promotional discounts will be computed at the secure
                            checkout step.
                        </p>

                        <div className="grid gap-2 pt-2">
                            <SheetTrigger asChild>
                                <Link
                                    to="/checkout"
                                    className="w-full text-center text-xs font-bold py-3 rounded-lg bg-gold-gradient text-black tracking-wide shadow-lg block hover:opacity-95 transition-opacity"
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
