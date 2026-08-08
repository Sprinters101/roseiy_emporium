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
    piecesQty?: number;
    casesQty?: number;
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

export interface AddToCartOptions {
    quantity?: number;
    piecesQty?: number;
    casesQty?: number;
    override?: boolean;
}

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
        optionsOrQty?: number | AddToCartOptions,
    ) => void;
    setCartItemQuantities: (
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
        piecesQty: number,
        casesQty: number,
    ) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    updateUnitQuantities: (
        productId: string,
        piecesQty: number,
        casesQty: number,
    ) => void;
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

    // Add or merge quantities into cart
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
        optionsOrQty: number | AddToCartOptions = 1,
    ) => {
        let pQty = 0;
        let cQty = 0;
        let isDualUnit = false;
        let isOverride = false;

        if (typeof optionsOrQty === "number") {
            pQty = optionsOrQty;
            cQty = 0;
        } else if (typeof optionsOrQty === "object") {
            pQty = optionsOrQty.piecesQty ?? 0;
            cQty = optionsOrQty.casesQty ?? 0;
            isOverride = !!optionsOrQty.override;
            isDualUnit = true;
        }

        if (isOverride) {
            setCartItemQuantities(product, pQty, cQty);
            return;
        }

        const maxPieces = product.piecesLeft ?? Infinity;
        const maxCases = product.casesLeft ?? Infinity;

        if (maxPieces <= 0 && maxCases <= 0) {
            toast.error(`${product.name} is currently out of stock`);
            return;
        }

        let isExceeded = false;

        setCartItems((prevItems) => {
            const existingIndex = prevItems.findIndex(
                (item) => item.id === product.id,
            );

            if (existingIndex > -1) {
                const existingItem = prevItems[existingIndex];
                const newPQty =
                    (existingItem.piecesQty ?? existingItem.quantity) + pQty;
                const newCQty = (existingItem.casesQty ?? 0) + cQty;

                if (newPQty > maxPieces || newCQty > maxCases) {
                    isExceeded = true;
                    return prevItems;
                }

                const updated = [...prevItems];
                updated[existingIndex] = {
                    ...existingItem,
                    quantity: newPQty + newCQty,
                    piecesQty: newPQty,
                    casesQty: newCQty,
                    piecesLeft: product.piecesLeft,
                    casesLeft: product.casesLeft,
                };
                return updated;
            }

            if (pQty > maxPieces || cQty > maxCases) {
                isExceeded = true;
                return prevItems;
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
                    quantity: isDualUnit ? pQty + cQty : pQty,
                    piecesQty: isDualUnit ? pQty : pQty,
                    casesQty: isDualUnit ? cQty : 0,
                    piecesLeft: product.piecesLeft,
                    casesLeft: product.casesLeft,
                },
            ];
        });

        if (isExceeded) {
            toast.warning(
                `Requested quantity exceeds available stock for ${product.name}`,
            );
        } else {
            toast.success(`${product.name} added to cart`);
        }
    };

    // Override/Replace cart item quantities directly (for ProductDetails "Add to Cart")
    const setCartItemQuantities = (
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
        piecesQty: number,
        casesQty: number,
    ) => {
        if (piecesQty <= 0 && casesQty <= 0) {
            removeFromCart(product.id);
            return;
        }

        const maxPieces = product.piecesLeft ?? Infinity;
        const maxCases = product.casesLeft ?? Infinity;

        const validP = Math.max(0, Math.min(piecesQty, maxPieces));
        const validC = Math.max(0, Math.min(casesQty, maxCases));

        setCartItems((prevItems) => {
            const existingIndex = prevItems.findIndex(
                (item) => item.id === product.id,
            );

            if (existingIndex > -1) {
                const updated = [...prevItems];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: validP + validC,
                    piecesQty: validP,
                    casesQty: validC,
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
                    quantity: validP + validC,
                    piecesQty: validP,
                    casesQty: validC,
                    piecesLeft: product.piecesLeft,
                    casesLeft: product.casesLeft,
                },
            ];
        });

        toast.success(`Cart updated for ${product.name}`);
    };

    const removeFromCart = (productId: string) => {
        setCartItems((prevItems) => {
            const itemToRemove = prevItems.find(
                (item) => item.id === productId,
            );
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
                    return { ...item, quantity: maxStock, piecesQty: maxStock };
                }
                return { ...item, quantity, piecesQty: quantity };
            }),
        );
    };

    const updateUnitQuantities = (
        productId: string,
        newPiecesQty: number,
        newCasesQty: number,
    ) => {
        if (newPiecesQty <= 0 && newCasesQty <= 0) {
            removeFromCart(productId);
            return;
        }

        setCartItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id !== productId) return item;

                const maxP = item.piecesLeft ?? Infinity;
                const maxC = item.casesLeft ?? Infinity;

                const validP = Math.max(0, Math.min(newPiecesQty, maxP));
                const validC = Math.max(0, Math.min(newCasesQty, maxC));

                if (newPiecesQty > maxP) {
                    toast.warning(`Only ${maxP} pieces available`);
                }
                if (newCasesQty > maxC) {
                    toast.warning(`Only ${maxC} cases available`);
                }

                return {
                    ...item,
                    piecesQty: validP,
                    casesQty: validC,
                    quantity: validP + validC,
                };
            }),
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const totalItems = cartItems.reduce(
        (total, item) =>
            total +
            ((item.piecesQty ?? item.quantity ?? 0) + (item.casesQty ?? 0)),
        0,
    );

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0,
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                setCartItemQuantities,
                removeFromCart,
                updateQuantity,
                updateUnitQuantities,
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
