import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from "react";
import type { Product } from "@/config/types";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/context/AuthContext";
import { useGetWishlist } from "@/service/queries";
import {
    useAddToWishlist,
    useRemoveFromWishlist,
    useClearWishlist,
} from "@/service/mutation";
import { addToWishlistFunc } from "@/service/api";
import type { WishlistItem } from "@/service/types";

export interface WishlistContextType {
    wishlistItems: Product[];
    addToWishlist: (product: Product | any) => void;
    removeFromWishlist: (productId: string) => void;
    toggleWishlist: (product: Product | any) => void;
    isInWishlist: (productId: string) => boolean;
    isItemLoading: (productId: string) => boolean;
    clearWishlist: () => void;
    wishlistCount: number;
    isLoading: boolean;
}

const WISHLIST_STORAGE_KEY = "roseiy_wishlist_items";

// Helper to normalize product objects from API WishlistItem
const normalizeWishlistItem = (item: WishlistItem): Product => {
    const p = item.product || ({} as any);
    const pieceUnit = p.sellingUnits?.find((u: any) =>
        u.name?.toLowerCase().includes("piece"),
    );
    const cartonUnit = p.sellingUnits?.find(
        (u: any) =>
            u.name?.toLowerCase().includes("carton") ||
            u.name?.toLowerCase().includes("case"),
    );
    const primaryUnit = pieceUnit || p.sellingUnits?.[0];

    const piecePrice =
        p.piecePrice !== undefined
            ? Number(p.piecePrice)
            : pieceUnit?.price !== undefined
              ? Number(pieceUnit.price)
              : primaryUnit?.price !== undefined
                ? Number(primaryUnit.price)
                : 0;

    const resolvedImage =
        p.primaryImage ||
        (p as any).image ||
        p.images?.find((img: any) => img.isPrimary)?.imageUrl ||
        p.images?.[0]?.imageUrl ||
        "";

    const resolvedCategory =
        typeof p.category === "object" && p.category !== null
            ? p.category.name || ""
            : p.category || "";

    const resolvedId = String(p.productId || item.productId || item.wishlistItemId || "");

    return {
        id: resolvedId,
        productId: p.productId || item.productId,
        slug: p.slug,
        name: p.name || "Product",
        category: resolvedCategory,
        volume: p.volume || "75cl",
        piecesLeft: pieceUnit ? pieceUnit.stock : primaryUnit ? primaryUnit.stock : p.totalStock,
        casesLeft: cartonUnit ? cartonUnit.stock : undefined,
        price: piecePrice,
        image: resolvedImage,
        gallery: p.images?.map((img: any) => img.imageUrl) || [],
        description: p.description || "",
        sellingUnits: p.sellingUnits,
    };
};

const getInitialGuestWishlist = (): Product[] => {
    try {
        const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (error) {
        console.error("Failed to parse wishlist from localStorage", error);
    }
    return [];
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { isAuthenticated } = useAuth();
    const [guestItems, setGuestItems] = useState<Product[]>(getInitialGuestWishlist);
    const [loadingIds, setLoadingIds] = useState<string[]>([]);
    const syncedOnLoginRef = useRef(false);

    // Live backend queries & mutations
    const { data: serverWishlistData, isLoading: isServerWishlistLoading } =
        useGetWishlist({ enabled: isAuthenticated });

    const addToWishlistMutation = useAddToWishlist();
    const removeFromWishlistMutation = useRemoveFromWishlist();
    const clearWishlistMutation = useClearWishlist();

    // Auto-save guest items to localStorage
    useEffect(() => {
        if (!isAuthenticated) {
            try {
                localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(guestItems));
            } catch (error) {
                console.error("Failed to save wishlist to localStorage", error);
            }
        }
    }, [guestItems, isAuthenticated]);

    // When customer logs in, seamlessly sync / merge any guest items from localStorage to backend
    useEffect(() => {
        if (isAuthenticated && !syncedOnLoginRef.current) {
            syncedOnLoginRef.current = true;
            const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
            if (saved) {
                try {
                    const localItems: Product[] = JSON.parse(saved);
                    if (Array.isArray(localItems) && localItems.length > 0) {
                        // Sync each local item to customer account
                        Promise.allSettled(
                            localItems.map((item) => {
                                const targetId = String(item.productId || item.id);
                                return addToWishlistFunc({ productId: targetId });
                            }),
                        ).then(() => {
                            localStorage.removeItem(WISHLIST_STORAGE_KEY);
                            setGuestItems([]);
                        });
                    }
                } catch {
                    localStorage.removeItem(WISHLIST_STORAGE_KEY);
                }
            }
        } else if (!isAuthenticated) {
            syncedOnLoginRef.current = false;
        }
    }, [isAuthenticated]);

    // Normalize server wishlist items
    const serverItems = useMemo<Product[]>(() => {
        if (!isAuthenticated || !serverWishlistData?.data?.items) return [];
        return serverWishlistData.data.items.map(normalizeWishlistItem);
    }, [isAuthenticated, serverWishlistData]);

    const activeWishlistItems: Product[] = isAuthenticated ? serverItems : guestItems;

    const isItemLoading = (productId: string): boolean => {
        if (!productId) return false;
        const target = String(productId);
        return loadingIds.includes(target);
    };

    const isInWishlist = (productId: string): boolean => {
        if (!productId) return false;
        const target = String(productId);
        return activeWishlistItems.some(
            (item) =>
                String(item.id) === target ||
                String(item.productId) === target ||
                String(item.slug) === target,
        );
    };

    const addToWishlist = (product: Product | any) => {
        const resolvedProductId = String(product.productId || product.id || product.slug || "");
        if (!resolvedProductId) return;

        if (isInWishlist(resolvedProductId)) {
            return;
        }

        if (isAuthenticated) {
            setLoadingIds((prev) => [...prev, resolvedProductId]);
            addToWishlistMutation.mutate(
                { productId: resolvedProductId },
                {
                    onSuccess: (data) => {
                        toast.success(data?.data?.message || `${product.name || "Product"} added to wishlist`);
                    },
                    onSettled: () => {
                        setLoadingIds((prev) => prev.filter((id) => id !== resolvedProductId));
                    },
                },
            );
        } else {
            // Guest mode: Save to local state and localStorage
            const normalized = {
                id: resolvedProductId,
                productId: product.productId || resolvedProductId,
                slug: product.slug,
                name: product.name || "Product",
                category: typeof product.category === "object" ? product.category?.name : product.category || "",
                volume: product.volume || "75cl",
                piecesLeft: product.piecesLeft,
                casesLeft: product.casesLeft,
                price: Number(product.price) || 0,
                image: product.image || product.images?.[0]?.imageUrl || "",
                sellingUnits: product.sellingUnits,
                description: product.description || "",
            };
            setGuestItems((prev) => [...prev, normalized]);
            toast.success(`${product.name || "Product"} added to wishlist`);
        }
    };

    const removeFromWishlist = (productId: string) => {
        const targetId = String(productId);
        const itemToRemove = activeWishlistItems.find(
            (item) =>
                String(item.id) === targetId ||
                String(item.productId) === targetId ||
                String(item.slug) === targetId,
        );

        if (isAuthenticated) {
            const apiTargetId = String(itemToRemove?.productId || targetId);
            setLoadingIds((prev) => [...prev, targetId, apiTargetId]);
            removeFromWishlistMutation.mutate(apiTargetId, {
                onSuccess: (data) => {
                    toast.info(data?.data?.message || `${itemToRemove?.name || "Product"} removed from wishlist`);
                },
                onSettled: () => {
                    setLoadingIds((prev) => prev.filter((id) => id !== targetId && id !== apiTargetId));
                },
            });
        } else {
            setGuestItems((prev) =>
                prev.filter(
                    (item) =>
                        String(item.id) !== targetId &&
                        String(item.productId) !== targetId &&
                        String(item.slug) !== targetId,
                ),
            );
            if (itemToRemove) {
                toast.info(`${itemToRemove.name} removed from wishlist`);
            }
        }
    };

    const toggleWishlist = (product: Product | any) => {
        const resolvedId = String(product.productId || product.id || product.slug || "");
        if (isInWishlist(resolvedId)) {
            removeFromWishlist(resolvedId);
        } else {
            addToWishlist(product);
        }
    };

    const clearWishlist = () => {
        if (isAuthenticated) {
            clearWishlistMutation.mutate(undefined, {
                onSuccess: (data) => {
                    toast.info(data?.data?.message || "Wishlist cleared");
                },
            });
        } else {
            setGuestItems([]);
            toast.info("Wishlist cleared");
        }
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems: activeWishlistItems,
                addToWishlist,
                removeFromWishlist,
                toggleWishlist,
                isInWishlist,
                isItemLoading,
                clearWishlist,
                wishlistCount: activeWishlistItems.length,
                isLoading: isAuthenticated ? isServerWishlistLoading : false,
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
