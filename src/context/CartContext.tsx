import React, { createContext, useContext, useState, useEffect } from "react";
import type { Product } from "@/config/types";
import { toast } from "sonner";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    volume?: string;
    category?: string;
    image: string;
    quantity: number;
    piecesLeft?: number;
    casesLeft?: number;
}

export const getProductMaxStock = (product: {
    piecesLeft?: number;
    casesLeft?: number;
}): number => {
    if (product.piecesLeft !== undefined) return product.piecesLeft;
    if (product.casesLeft !== undefined) return product.casesLeft;
    return Infinity;
};

export interface CartContextType {
    cartItems: CartItem[];
    addToCart: (
        product:
            | Product
            | {
                  id: string;
                  name: string;
                  price: number;
                  image: string;
                  volume?: string;
                  category?: string;
                  piecesLeft?: number;
                  casesLeft?: number;
              },
        quantity?: number,
    ) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    subtotal: number;
}

const CART_STORAGE_KEY = "roseiy_cart_items";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        try {
            const saved = localStorage.getItem(CART_STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        } catch (error) {
            console.error("Failed to save cart to localStorage", error);
        }
    }, [cartItems]);

    const addToCart = (
        product:
            | Product
            | {
                  id: string;
                  name: string;
                  price: number;
                  image: string;
                  volume?: string;
                  category?: string;
                  piecesLeft?: number;
                  casesLeft?: number;
              },
        quantityToAdd: number = 1,
    ) => {
        const maxStock = getProductMaxStock(product);
        if (maxStock <= 0) {
            toast.error(`${product.name} is currently out of stock`);
            return;
        }

        let isExceeded = false;

        setCartItems((prevItems) => {
            const existingIndex = prevItems.findIndex(
                (item) => item.id === product.id,
            );
            const currentQty = existingIndex > -1 ? prevItems[existingIndex].quantity : 0;

            if (currentQty + quantityToAdd > maxStock) {
                isExceeded = true;
                return prevItems;
            }

            if (existingIndex > -1) {
                const updated = [...prevItems];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + quantityToAdd,
                    piecesLeft: product.piecesLeft,
                    casesLeft: product.casesLeft,
                };
                return updated;
            }

            return [
                ...prevItems,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    volume: product.volume,
                    category: product.category,
                    image: product.image,
                    quantity: quantityToAdd,
                    piecesLeft: product.piecesLeft,
                    casesLeft: product.casesLeft,
                },
            ];
        });

        if (isExceeded) {
            toast.warning(
                `Cannot add more than ${maxStock} available units of ${product.name}`,
            );
        } else {
            toast.success(`${product.name} added to cart`);
        }
    };

    const removeFromCart = (productId: string) => {
        setCartItems((prevItems) => {
            const itemToRemove = prevItems.find((item) => item.id === productId);
            if (itemToRemove) {
                toast.info(`${itemToRemove.name} removed from cart`);
            }
            return prevItems.filter((item) => item.id !== productId);
        });
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCartItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id !== productId) return item;
                const maxStock = getProductMaxStock(item);
                if (quantity > maxStock) {
                    toast.warning(
                        `Only ${maxStock} units of ${item.name} are available`,
                    );
                    return { ...item, quantity: maxStock };
                }
                return { ...item, quantity };
            }),
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
    );

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                subtotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
