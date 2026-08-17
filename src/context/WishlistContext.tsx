import React, { createContext, useContext, useState, useEffect } from "react";
import type { Product } from "@/config/types";
import { products as mockProducts } from "@/lib/site_data";
import { toast } from "@/components/ui/sonner";

export interface WishlistContextType {
    wishlistItems: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
    toggleWishlist: (product: Product) => void;
    isInWishlist: (productId: string) => boolean;
    clearWishlist: () => void;
    wishlistCount: number;
}

const WISHLIST_STORAGE_KEY = "roseiy_wishlist_items";

// Default initial items to match design preview if storage is empty
const getInitialWishlist = (): Product[] => {
    try {
        const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (error) {
        console.error("Failed to parse wishlist from localStorage", error);
    }
    // Return sample wishlist items from mockProducts (or customized items)
    if (mockProducts && mockProducts.length > 0) {
        const sampleIds = ["10", "1", "7", "9", "5", "11"];
        const samples = mockProducts.filter((p) => sampleIds.includes(p.id));
        return samples.length > 0 ? samples : mockProducts.slice(0, 6);
    }
    return [];
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [wishlistItems, setWishlistItems] = useState<Product[]>(getInitialWishlist);

    useEffect(() => {
        try {
            localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
        } catch (error) {
            console.error("Failed to save wishlist to localStorage", error);
        }
    }, [wishlistItems]);

    const isInWishlist = (productId: string) => {
        return wishlistItems.some((item) => item.id === productId);
    };

    const addToWishlist = (product: Product) => {
        if (!isInWishlist(product.id)) {
            setWishlistItems((prev) => [...prev, product]);
            toast.success(`${product.name} added to wishlist`);
        }
    };

    const removeFromWishlist = (productId: string) => {
        setWishlistItems((prev) => {
            const itemToRemove = prev.find((item) => item.id === productId);
            if (itemToRemove) {
                toast.info(`${itemToRemove.name} removed from wishlist`);
            }
            return prev.filter((item) => item.id !== productId);
        });
    };

    const toggleWishlist = (product: Product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const clearWishlist = () => {
        setWishlistItems([]);
        toast.info("Wishlist cleared");
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                addToWishlist,
                removeFromWishlist,
                toggleWishlist,
                isInWishlist,
                clearWishlist,
                wishlistCount: wishlistItems.length,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
};
