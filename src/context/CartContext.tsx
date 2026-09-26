import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    useCallback,
} from "react";
import type { Product } from "@/config/types";
import { toast } from "@/components/ui/sonner";
import { useGetCart } from "@/service/queries";
import {
    useAddToCart,
    useSetProductQuantities,
    useUpdateCartItem,
    useRemoveCartItem,
    useClearCart,
} from "@/service/mutation";

export interface CartItem {
    id: string;
    productId?: string;
    slug?: string;
    name: string;
    price: number;
    casePrice?: number;
    volume?: string;
    category?: string;
    image: string;
    quantity: number;
    piecesQty?: number;
    casesQty?: number;
    piecesLeft?: number;
    casesLeft?: number;
    pieceSellingUnitId?: string;
    caseSellingUnitId?: string;
    pieceCartItemId?: string;
    caseCartItemId?: string;
    cartItemId?: string;
    sellingUnits?: any[];
}

export const getProductMaxStock = (product: {
    piecesLeft?: number;
    casesLeft?: number;
}): number => {
    if (product.piecesLeft !== undefined) return product.piecesLeft;
    if (product.casesLeft !== undefined) return product.casesLeft;
    return Infinity;
};

/**
 * Calculates the exact line total for a given cart item accounting for Pieces and Cases
 */
export const calculateCartItemTotal = (item: CartItem): number => {
    if (!item) return 0;

    const pQty =
        item.piecesQty !== undefined
            ? item.piecesQty
            : item.casesQty !== undefined && item.casesQty > 0
              ? 0
              : item.quantity || 0;
    const cQty = item.casesQty !== undefined ? item.casesQty : 0;

    const cartonUnit = item.sellingUnits?.find(
        (u: any) =>
            u.name?.toLowerCase().includes("carton") ||
            u.name?.toLowerCase().includes("case"),
    );
    const pieceUnit = item.sellingUnits?.find((u: any) =>
        u.name?.toLowerCase().includes("piece"),
    );

    const piecePrice =
        item.price > 0
            ? Number(item.price)
            : pieceUnit
              ? Number(pieceUnit.price || pieceUnit.unitPrice || 0)
              : 0;

    const casePrice =
        item.casePrice && item.casePrice > 0
            ? Number(item.casePrice)
            : cartonUnit
              ? Number(cartonUnit.price || cartonUnit.unitPrice || 0)
              : piecePrice > 0
                ? piecePrice
                : 0;

    if (item.piecesQty !== undefined || item.casesQty !== undefined) {
        return pQty * piecePrice + cQty * casePrice;
    }

    const unitPrice = piecePrice > 0 ? piecePrice : casePrice;
    return unitPrice * (item.quantity || 1);
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
                  productId?: string;
                  slug?: string;
                  name: string;
                  price: number;
                  image: string;
                  volume?: string;
                  category?: string;
                  piecesLeft?: number;
                  casesLeft?: number;
                  sellingUnits?: any[];
                  sellingUnitId?: string;
              },
        optionsOrQty?: number | AddToCartOptions,
    ) => void;
    setCartItemQuantities: (
        product:
            | Product
            | {
                  id: string;
                  productId?: string;
                  slug?: string;
                  name: string;
                  price: number;
                  image: string;
                  volume?: string;
                  category?: string;
                  piecesLeft?: number;
                  casesLeft?: number;
                  sellingUnits?: any[];
                  sellingUnitId?: string;
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
    isLoading: boolean;
    isCartFetching: boolean;
    isAddingProduct: (productIdOrSlug: string) => boolean;
    addingProductIds: string[];
    refetchCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Robustly extract a valid image URL from any product/item/unit representation
 */
export const extractImageFromObject = (obj: any): string => {
    if (!obj) return "";
    if (typeof obj === "string") {
        const trimmed = obj.trim();
        if (
            trimmed.startsWith("http://") ||
            trimmed.startsWith("https://") ||
            trimmed.startsWith("/") ||
            trimmed.startsWith("data:")
        ) {
            return trimmed;
        }
        return "";
    }

    if (typeof obj.imageUrl === "string" && obj.imageUrl.trim()) {
        return obj.imageUrl.trim();
    }
    if (typeof obj.image === "string" && obj.image.trim()) {
        return obj.image.trim();
    }
    if (typeof obj.image === "object" && obj.image !== null) {
        const found = extractImageFromObject(obj.image);
        if (found) return found;
    }
    if (typeof obj.url === "string" && obj.url.trim()) {
        return obj.url.trim();
    }
    if (typeof obj.src === "string" && obj.src.trim()) {
        return obj.src.trim();
    }

    if (Array.isArray(obj.images) && obj.images.length > 0) {
        const primary = obj.images.find(
            (img: any) => img && (img.isPrimary || img.primary),
        );
        if (primary) {
            const found = extractImageFromObject(primary);
            if (found) return found;
        }
        for (const img of obj.images) {
            const found = extractImageFromObject(img);
            if (found) return found;
        }
    }

    if (Array.isArray(obj.gallery) && obj.gallery.length > 0) {
        const found = extractImageFromObject(obj.gallery[0]);
        if (found) return found;
    }

    if (obj.product && typeof obj.product === "object") {
        const found = extractImageFromObject(obj.product);
        if (found) return found;
    }

    if (obj.sellingUnit && typeof obj.sellingUnit === "object") {
        const found = extractImageFromObject(obj.sellingUnit);
        if (found) return found;
    }

    return "";
};

/**
 * Transform backend cart items response into standard UI CartItem[]
 */
const parseServerCart = (cartData: any): CartItem[] => {
    if (!cartData) return [];

    // 1. Check if backend returned pre-consolidated groupedItems
    if (
        Array.isArray(cartData.groupedItems) &&
        cartData.groupedItems.length > 0
    ) {
        return cartData.groupedItems
            .map((group: any) => {
                const product = group.product || {};
                const productId = String(
                    group.productId || product.productId || product.id || "",
                );
                const pieceUnit = group.pieceUnit || {};
                const caseUnit = group.caseUnit || {};

                const piecesQty = Number(
                    group.piecesQuantity ??
                        pieceUnit.quantity ??
                        pieceUnit.cartQuantity ??
                        0,
                );
                const casesQty = Number(
                    group.casesQuantity ??
                        caseUnit.quantity ??
                        caseUnit.cartQuantity ??
                        0,
                );

                const name = product.name || group.name || "";
                const image =
                    extractImageFromObject(product) ||
                    extractImageFromObject(group) ||
                    "";
                const category =
                    typeof product.category === "object" &&
                    product.category !== null
                        ? product.category.name
                        : product.category || "";
                const volume = product.volume || "";

                const piecePrice = Number(
                    pieceUnit.unitPrice || pieceUnit.price || 0,
                );
                const casePrice = Number(
                    caseUnit.unitPrice || caseUnit.price || 0,
                );

                const piecesLeft =
                    pieceUnit.availableStock !== undefined
                        ? Number(pieceUnit.availableStock)
                        : undefined;
                const casesLeft =
                    caseUnit.availableStock !== undefined
                        ? Number(caseUnit.availableStock)
                        : undefined;

                const pieceSellingUnitId = pieceUnit.sellingUnitId;
                const caseSellingUnitId = caseUnit.sellingUnitId;
                const pieceCartItemId = pieceUnit.cartItemId;
                const caseCartItemId = caseUnit.cartItemId;

                const sellingUnits: any[] = [];
                if (pieceSellingUnitId) {
                    sellingUnits.push({
                        ...pieceUnit,
                        name: pieceUnit.name || "Piece",
                        price: piecePrice,
                        stock: piecesLeft,
                    });
                }
                if (caseSellingUnitId) {
                    sellingUnits.push({
                        ...caseUnit,
                        name: caseUnit.name || "Case",
                        price: casePrice,
                        stock: casesLeft,
                    });
                }

                return {
                    id: productId,
                    productId,
                    slug: product.slug,
                    name,
                    category,
                    volume,
                    image,
                    price: piecePrice > 0 ? piecePrice : (casePrice > 0 ? casePrice : 0),
                    casePrice: casePrice > 0 ? casePrice : undefined,
                    quantity: piecesQty + casesQty,
                    piecesQty,
                    casesQty,
                    piecesLeft,
                    casesLeft,
                    sellingUnits,
                    pieceSellingUnitId,
                    caseSellingUnitId,
                    pieceCartItemId,
                    caseCartItemId,
                    cartItemId: pieceCartItemId || caseCartItemId,
                };
            })
            .filter((item: CartItem) => item.quantity > 0 || (item.piecesQty || 0) > 0 || (item.casesQty || 0) > 0);
    }

    // 2. Fallback: Parse flat items array
    const rawItems = Array.isArray(cartData.items)
        ? cartData.items
        : Array.isArray(cartData)
          ? cartData
          : [];

    if (rawItems.length === 0) return [];

    const productMap = new Map<string, CartItem>();

    rawItems.forEach((item: any) => {
        const cartItemId = String(item.cartItemId || item.id || "");
        const sellingUnit = item.sellingUnit || {};
        const product = item.product || sellingUnit.product || {};
        const productId = String(
            product.productId ||
                product.id ||
                product.slug ||
                item.productId ||
                cartItemId,
        );
        const name = product.name || item.name || "";
        const image =
            extractImageFromObject(item) ||
            extractImageFromObject(product) ||
            extractImageFromObject(sellingUnit) ||
            "";

        const category =
            typeof product.category === "object" && product.category !== null
                ? product.category.name
                : product.category || item.category || "";
        const volume = product.volume || item.volume || "";

        const unitName = String(
            sellingUnit.name || item.unitName || "",
        ).toLowerCase();
        const isCase =
            unitName.includes("carton") ||
            unitName.includes("case") ||
            unitName.includes("pack");

        const unitPrice = Number(
            item.unitPrice || sellingUnit.price || item.lineTotal || item.totalPrice || 0,
        );
        const quantity = Number(item.quantity) || 1;
        const availableStock =
            item.availableStock !== undefined
                ? Number(item.availableStock)
                : sellingUnit.stock !== undefined
                  ? Number(sellingUnit.stock)
                  : undefined;

        const allUnits =
            product.sellingUnits ||
            (sellingUnit.sellingUnitId
                ? [{ ...sellingUnit, price: unitPrice, stock: availableStock }]
                : []);
        const foundPieceUnit = allUnits.find((u: any) =>
            u.name?.toLowerCase().includes("piece"),
        );
        const foundCartonUnit = allUnits.find(
            (u: any) =>
                u.name?.toLowerCase().includes("carton") ||
                u.name?.toLowerCase().includes("case"),
        );

        const pieceStock =
            foundPieceUnit?.stock !== undefined
                ? Number(foundPieceUnit.stock)
                : product.piecesLeft !== undefined
                  ? Number(product.piecesLeft)
                  : undefined;

        const caseStock =
            foundCartonUnit?.stock !== undefined
                ? Number(foundCartonUnit.stock)
                : product.casesLeft !== undefined
                  ? Number(product.casesLeft)
                  : undefined;

        const piecePriceFromUnits = foundPieceUnit
            ? Number(foundPieceUnit.price || foundPieceUnit.unitPrice || 0)
            : 0;
        const casePriceFromUnits = foundCartonUnit
            ? Number(foundCartonUnit.price || foundCartonUnit.unitPrice || 0)
            : 0;

        if (!productMap.has(productId)) {
            productMap.set(productId, {
                id: productId,
                productId: product.productId || productId,
                slug: product.slug,
                name,
                category,
                volume,
                image,
                price: isCase
                    ? piecePriceFromUnits > 0
                        ? piecePriceFromUnits
                        : 0
                    : unitPrice > 0
                      ? unitPrice
                      : piecePriceFromUnits,
                casePrice: isCase
                    ? unitPrice > 0
                        ? unitPrice
                        : casePriceFromUnits
                    : casePriceFromUnits > 0
                      ? casePriceFromUnits
                      : undefined,
                quantity: 0,
                piecesQty: 0,
                casesQty: 0,
                piecesLeft: isCase ? pieceStock : availableStock ?? pieceStock,
                casesLeft: isCase ? availableStock ?? caseStock : caseStock,
                sellingUnits: allUnits,
            });
        }

        const entry = productMap.get(productId)!;
        if (!entry.image && image) {
            entry.image = image;
        }

        if (isCase) {
            entry.casesQty = (entry.casesQty || 0) + quantity;
            entry.caseCartItemId = cartItemId;
            entry.caseSellingUnitId =
                item.sellingUnitId || sellingUnit.sellingUnitId;
            entry.casePrice =
                unitPrice > 0
                    ? unitPrice
                    : entry.casePrice || casePriceFromUnits;
            if ((!entry.price || entry.price <= 0) && piecePriceFromUnits > 0) {
                entry.price = piecePriceFromUnits;
            }
            if (availableStock !== undefined) {
                entry.casesLeft = availableStock;
            } else if (caseStock !== undefined) {
                entry.casesLeft = caseStock;
            }
        } else {
            entry.piecesQty = (entry.piecesQty || 0) + quantity;
            entry.pieceCartItemId = cartItemId;
            entry.pieceSellingUnitId =
                item.sellingUnitId || sellingUnit.sellingUnitId;
            entry.price =
                unitPrice > 0
                    ? unitPrice
                    : entry.price || piecePriceFromUnits;
            if ((!entry.casePrice || entry.casePrice <= 0) && casePriceFromUnits > 0) {
                entry.casePrice = casePriceFromUnits;
            }
            if (availableStock !== undefined) {
                entry.piecesLeft = availableStock;
            } else if (pieceStock !== undefined) {
                entry.piecesLeft = pieceStock;
            }
        }

        entry.quantity = (entry.piecesQty || 0) + (entry.casesQty || 0);
        if (!entry.price && unitPrice > 0 && !isCase) {
            entry.price = unitPrice;
        }
    });

    return Array.from(productMap.values());
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    // 1. Initial State: Empty array, strictly loaded from backend server
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Purge any stale local cart cache on startup
    useEffect(() => {
        try {
            localStorage.removeItem("roseiy_cart_items");
        } catch {
            // Ignore localStorage errors
        }
    }, []);

    // Active product IDs currently undergoing add-to-cart mutation
    const [addingProductIds, setAddingProductIds] = useState<string[]>([]);

    // 2. React Query: Fetch server cart
    const {
        data: cartApiResponse,
        isLoading: isCartQueryLoading,
        isFetching: isCartFetching,
        refetch: refetchCart,
    } = useGetCart();

    // 3. Backend Mutations
    const setProductQuantitiesMutation = useSetProductQuantities();
    const addToCartMutation = useAddToCart();
    const updateCartItemMutation = useUpdateCartItem();
    const removeCartItemMutation = useRemoveCartItem();
    const clearCartMutation = useClearCart();

    // 4. Sync Server Cart into state when query returns
    useEffect(() => {
        if (cartApiResponse?.data) {
            const serverCartData =
                (cartApiResponse.data as any).cart || cartApiResponse.data;
            const parsed = parseServerCart(serverCartData);
            setCartItems(parsed);
        }
    }, [cartApiResponse]);

    // Check if a product is currently being added
    const isAddingProduct = useCallback(
        (idOrSlug: string): boolean => {
            if (!idOrSlug) return false;
            return addingProductIds.includes(String(idOrSlug));
        },
        [addingProductIds],
    );

    const startAddingProduct = useCallback((product: any) => {
        const keys = [
            String(product.id || ""),
            String(product.productId || ""),
            String(product.slug || ""),
        ].filter(Boolean);

        setAddingProductIds((prev) => Array.from(new Set([...prev, ...keys])));
    }, []);

    const stopAddingProduct = useCallback((product: any) => {
        const keys = [
            String(product.id || ""),
            String(product.productId || ""),
            String(product.slug || ""),
        ].filter(Boolean);

        setAddingProductIds((prev) => prev.filter((id) => !keys.includes(id)));
    }, []);

    // Helper to resolve selling units from a product
    const resolveSellingUnits = useCallback(
        (product: any, existingItem?: CartItem) => {
            const units: any[] =
                product.sellingUnits || existingItem?.sellingUnits || [];

            const pieceUnit =
                units.find((u: any) =>
                    u.name?.toLowerCase().includes("piece"),
                ) ||
                units[0] ||
                (product.sellingUnitId
                    ? { sellingUnitId: product.sellingUnitId }
                    : null) ||
                (existingItem?.pieceSellingUnitId
                    ? { sellingUnitId: existingItem.pieceSellingUnitId }
                    : null);

            const cartonUnit =
                units.find(
                    (u: any) =>
                        u.name?.toLowerCase().includes("carton") ||
                        u.name?.toLowerCase().includes("case"),
                ) ||
                (units.length > 1 ? units[1] : null) ||
                (existingItem?.caseSellingUnitId
                    ? { sellingUnitId: existingItem.caseSellingUnitId }
                    : null);

            return { pieceUnit, cartonUnit };
        },
        [],
    );

    // Remove an item entirely from cart
    const removeFromCart = useCallback(
        (productId: string) => {
            const itemToRemove = cartItems.find(
                (item) =>
                    item.id === productId ||
                    item.productId === productId ||
                    item.slug === productId ||
                    item.cartItemId === productId ||
                    item.pieceCartItemId === productId ||
                    item.caseCartItemId === productId,
            );

            if (itemToRemove) {
                const targetProductId = String(
                    itemToRemove.productId || itemToRemove.id || productId,
                );
                setProductQuantitiesMutation.mutate({
                    productId: targetProductId,
                    piecesQuantity: 0,
                    casesQuantity: 0,
                });
                toast.info(`${itemToRemove.name} removed from cart`);
            }

            setCartItems((prevItems) =>
                prevItems.filter(
                    (item) =>
                        item.id !== productId &&
                        item.productId !== productId &&
                        item.slug !== productId &&
                        item.cartItemId !== productId &&
                        item.pieceCartItemId !== productId &&
                        item.caseCartItemId !== productId,
                ),
            );
        },
        [cartItems, setProductQuantitiesMutation],
    );

    // Add or merge quantities into cart
    const addToCart = useCallback(
        (
            product:
                | Product
                | {
                      id: string;
                      productId?: string;
                      slug?: string;
                      name: string;
                      price: number;
                      image: string;
                      volume?: string;
                      category?: string;
                      piecesLeft?: number;
                      casesLeft?: number;
                      sellingUnits?: any[];
                      sellingUnitId?: string;
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

            const targetId = String((product as any).productId || product.id);
            const existingItem = cartItems.find(
                (item) =>
                    item.id === targetId ||
                    item.id === product.id ||
                    item.slug === (product as any).slug,
            );

            const currentPieces = existingItem
                ? (existingItem.piecesQty ?? existingItem.quantity ?? 0)
                : 0;
            const currentCases = existingItem
                ? (existingItem.casesQty ?? 0)
                : 0;

            let actualAddPieces = pQty;
            let actualAddCases = cQty;

            if (pQty > 0 && currentPieces + pQty > maxPieces) {
                const allowedAdd = Math.max(0, maxPieces - currentPieces);
                if (allowedAdd <= 0) {
                    toast.warning(
                        `You already have the maximum available pieces (${maxPieces}) in your cart`,
                    );
                    actualAddPieces = 0;
                } else {
                    toast.warning(
                        `Only ${allowedAdd} additional piece(s) can be added (stock limit: ${maxPieces})`,
                    );
                    actualAddPieces = allowedAdd;
                }
            }

            if (cQty > 0 && currentCases + cQty > maxCases) {
                const allowedAdd = Math.max(0, maxCases - currentCases);
                if (allowedAdd <= 0) {
                    toast.warning(
                        `You already have the maximum available cases (${maxCases}) in your cart`,
                    );
                    actualAddCases = 0;
                } else {
                    toast.warning(
                        `Only ${allowedAdd} additional case(s) can be added (stock limit: ${maxCases})`,
                    );
                    actualAddCases = allowedAdd;
                }
            }

            if (actualAddPieces <= 0 && actualAddCases <= 0) {
                return;
            }

            // Trigger Backend Mutation with tracking
            startAddingProduct(product);

            const { pieceUnit, cartonUnit } = resolveSellingUnits(
                product,
                existingItem,
            );

            const finalPQty = currentPieces + actualAddPieces;
            const finalCQty = currentCases + actualAddCases;

            const targetProductId = String(
                (product as any).productId || product.id || targetId,
            );

            const mutationPromise = targetProductId
                ? setProductQuantitiesMutation
                      .mutateAsync({
                          productId: targetProductId,
                          piecesQuantity: finalPQty,
                          casesQuantity: finalCQty,
                      })
                      .catch((err) => {
                          console.error("Error setting product quantities", err);
                      })
                : Promise.resolve();

            mutationPromise.finally(() => {
                stopAddingProduct(product);
            });

            // Optimistic Local State Update
            setCartItems((prevItems) => {
                const existingIndex = prevItems.findIndex(
                    (item) =>
                        item.id === targetId ||
                        item.id === product.id ||
                        item.slug === (product as any).slug,
                );

                if (existingIndex > -1) {
                    const existing = prevItems[existingIndex];
                    const newPQty =
                        (existing.piecesQty ?? existing.quantity) +
                        actualAddPieces;
                    const newCQty = (existing.casesQty ?? 0) + actualAddCases;

                    const resolvedImage =
                        extractImageFromObject(product) ||
                        existing.image ||
                        "";

                    const updated = [...prevItems];
                    updated[existingIndex] = {
                        ...existing,
                        image: existing.image || resolvedImage,
                        quantity: newPQty + newCQty,
                        piecesQty: newPQty,
                        casesQty: newCQty,
                        piecesLeft: product.piecesLeft ?? existing.piecesLeft,
                        casesLeft: product.casesLeft ?? existing.casesLeft,
                        sellingUnits:
                            (product as any).sellingUnits ||
                            existing.sellingUnits,
                    };
                    return updated;
                }

                const resolvedImage =
                    extractImageFromObject(product) || "";

                const piecePrice =
                    pieceUnit?.price !== undefined
                        ? Number(pieceUnit.price)
                        : pieceUnit?.unitPrice !== undefined
                          ? Number(pieceUnit.unitPrice)
                          : Number(product.price || 0);

                const casePrice =
                    cartonUnit?.price !== undefined
                        ? Number(cartonUnit.price)
                        : cartonUnit?.unitPrice !== undefined
                          ? Number(cartonUnit.unitPrice)
                          : (product as any).casePrice !== undefined
                            ? Number((product as any).casePrice)
                            : undefined;

                return [
                    ...prevItems,
                    {
                        id: targetId,
                        productId: (product as any).productId || targetId,
                        slug: (product as any).slug,
                        name: product.name,
                        price: piecePrice,
                        casePrice: casePrice && casePrice > 0 ? casePrice : undefined,
                        volume: product.volume,
                        category:
                            typeof product.category === "object" &&
                            product.category !== null
                                ? (product.category as any).name
                                : (product.category as string),
                        image: resolvedImage,
                        quantity: isDualUnit
                            ? actualAddPieces + actualAddCases
                            : actualAddPieces,
                        piecesQty: actualAddPieces,
                        casesQty: actualAddCases,
                        piecesLeft: product.piecesLeft,
                        casesLeft: product.casesLeft,
                        sellingUnits: (product as any).sellingUnits,
                        pieceSellingUnitId: pieceUnit?.sellingUnitId,
                        caseSellingUnitId: cartonUnit?.sellingUnitId,
                    },
                ];
            });
        },
        [
            cartItems,
            resolveSellingUnits,
            setProductQuantitiesMutation,
            startAddingProduct,
            stopAddingProduct,
        ],
    );

    // Override/Replace cart item quantities directly (for ProductDetails "Add to Cart")
    const setCartItemQuantities = useCallback(
        (
            product:
                | Product
                | {
                      id: string;
                      productId?: string;
                      slug?: string;
                      name: string;
                      price: number;
                      image: string;
                      volume?: string;
                      category?: string;
                      piecesLeft?: number;
                      casesLeft?: number;
                      sellingUnits?: any[];
                      sellingUnitId?: string;
                  },
            piecesQty: number,
            casesQty: number,
        ) => {
            const targetId = String((product as any).productId || product.id);

            const maxPieces = product.piecesLeft ?? Infinity;
            const maxCases = product.casesLeft ?? Infinity;

            const cappedPieces = Math.max(0, Math.min(piecesQty, maxPieces));
            const cappedCases = Math.max(0, Math.min(casesQty, maxCases));

            if (piecesQty > maxPieces) {
                toast.warning(
                    `Maximum available pieces in stock is ${maxPieces}`,
                );
            }
            if (casesQty > maxCases) {
                toast.warning(
                    `Maximum available cases in stock is ${maxCases}`,
                );
            }

            if (cappedPieces <= 0 && cappedCases <= 0) {
                removeFromCart(targetId);
                return;
            }

            const existingItem = cartItems.find(
                (item) =>
                    item.id === targetId ||
                    item.id === product.id ||
                    item.slug === (product as any).slug,
            );

            startAddingProduct(product);

            const { pieceUnit, cartonUnit } = resolveSellingUnits(
                product,
                existingItem,
            );

            const targetProductId = String(
                (product as any).productId || product.id || targetId,
            );

            const mutationPromise = setProductQuantitiesMutation
                .mutateAsync({
                    productId: targetProductId,
                    piecesQuantity: cappedPieces,
                    casesQuantity: cappedCases,
                })
                .catch((err) => {
                    console.error("Error setting product quantities", err);
                });

            mutationPromise.finally(() => {
                stopAddingProduct(product);
            });

            // Optimistic Local State Update
            setCartItems((prevItems) => {
                const existingIndex = prevItems.findIndex(
                    (item) =>
                        item.id === targetId ||
                        item.id === product.id ||
                        item.slug === (product as any).slug,
                );

                const resolvedImage =
                    extractImageFromObject(product) || "";

                if (existingIndex > -1) {
                    const existing = prevItems[existingIndex];
                    const updated = [...prevItems];
                    updated[existingIndex] = {
                        ...existing,
                        image: existing.image || resolvedImage,
                        quantity: cappedPieces + cappedCases,
                        piecesQty: cappedPieces,
                        casesQty: cappedCases,
                        piecesLeft: product.piecesLeft ?? existing.piecesLeft,
                        casesLeft: product.casesLeft ?? existing.casesLeft,
                        sellingUnits:
                            (product as any).sellingUnits ||
                            existing.sellingUnits,
                    };
                    return updated;
                }

                const piecePrice =
                    pieceUnit?.price !== undefined
                        ? Number(pieceUnit.price)
                        : pieceUnit?.unitPrice !== undefined
                          ? Number(pieceUnit.unitPrice)
                          : Number(product.price || 0);

                const casePrice =
                    cartonUnit?.price !== undefined
                        ? Number(cartonUnit.price)
                        : cartonUnit?.unitPrice !== undefined
                          ? Number(cartonUnit.unitPrice)
                          : (product as any).casePrice !== undefined
                            ? Number((product as any).casePrice)
                            : undefined;

                return [
                    ...prevItems,
                    {
                        id: targetId,
                        productId: (product as any).productId || targetId,
                        slug: (product as any).slug,
                        name: product.name,
                        price: piecePrice,
                        casePrice: casePrice && casePrice > 0 ? casePrice : undefined,
                        volume: product.volume,
                        category:
                            typeof product.category === "object" &&
                            product.category !== null
                                ? (product.category as any).name
                                : (product.category as string),
                        image: resolvedImage,
                        quantity: cappedPieces + cappedCases,
                        piecesQty: cappedPieces,
                        casesQty: cappedCases,
                        piecesLeft: product.piecesLeft,
                        casesLeft: product.casesLeft,
                        sellingUnits: (product as any).sellingUnits,
                        pieceSellingUnitId: pieceUnit?.sellingUnitId,
                        caseSellingUnitId: cartonUnit?.sellingUnitId,
                    },
                ];
            });
        },
        [
            cartItems,
            resolveSellingUnits,
            setProductQuantitiesMutation,
            removeFromCart,
            startAddingProduct,
            stopAddingProduct,
        ],
    );

    // Update single unit quantity
    const updateQuantity = useCallback(
        (productId: string, quantity: number) => {
            if (quantity <= 0) {
                removeFromCart(productId);
                return;
            }

            const item = cartItems.find(
                (ci) =>
                    ci.id === productId ||
                    ci.productId === productId ||
                    ci.slug === productId,
            );

            const maxStock = item ? getProductMaxStock(item) : Infinity;
            const validQty = Math.min(quantity, maxStock);

            if (quantity > maxStock) {
                toast.warning(`Cannot exceed stock limit of ${maxStock}`);
            }

            if (item) {
                const targetProductId = String(
                    item.productId || item.id || productId,
                );
                setProductQuantitiesMutation.mutate({
                    productId: targetProductId,
                    piecesQuantity: validQty,
                    casesQuantity: item.casesQty ?? 0,
                });
            }

            setCartItems((prevItems) =>
                prevItems.map((ci) => {
                    if (
                        ci.id !== productId &&
                        ci.productId !== productId &&
                        ci.slug !== productId
                    ) {
                        return ci;
                    }
                    return { ...ci, quantity: validQty, piecesQty: validQty };
                }),
            );
        },
        [cartItems, removeFromCart, setProductQuantitiesMutation],
    );

    // Update pieces & cases independently
    const updateUnitQuantities = useCallback(
        (productId: string, newPiecesQty: number, newCasesQty: number) => {
            if (newPiecesQty <= 0 && newCasesQty <= 0) {
                removeFromCart(productId);
                return;
            }

            const item = cartItems.find(
                (ci) =>
                    ci.id === productId ||
                    ci.productId === productId ||
                    ci.slug === productId,
            );

            const currentP = item?.piecesQty ?? item?.quantity ?? 0;
            const currentC = item?.casesQty ?? 0;
            const maxP =
                item?.piecesLeft !== undefined ? item.piecesLeft : Infinity;
            const maxC =
                item?.casesLeft !== undefined ? item.casesLeft : Infinity;

            // Before sending increment request, verify if amount can be added
            if (newPiecesQty > currentP) {
                if (maxP <= 0) {
                    toast.error("Pieces are out of stock");
                    return;
                }
                if (currentP >= maxP) {
                    toast.warning(
                        `Maximum available pieces in stock is ${maxP}`,
                    );
                    return;
                }
            }

            if (newCasesQty > currentC) {
                if (maxC <= 0) {
                    toast.error("Cases are out of stock");
                    return;
                }
                if (currentC >= maxC) {
                    toast.warning(
                        `Maximum available cases in stock is ${maxC}`,
                    );
                    return;
                }
            }

            const validP = Math.max(0, Math.min(newPiecesQty, maxP));
            const validC = Math.max(0, Math.min(newCasesQty, maxC));

            if (item) {
                const targetProductId = String(
                    item.productId || item.id || productId,
                );
                setProductQuantitiesMutation.mutate({
                    productId: targetProductId,
                    piecesQuantity: validP,
                    casesQuantity: validC,
                });
            }

            // Optimistic Local State Update
            setCartItems((prevItems) =>
                prevItems.map((ci) => {
                    if (
                        ci.id !== productId &&
                        ci.productId !== productId &&
                        ci.slug !== productId
                    ) {
                        return ci;
                    }

                    return {
                        ...ci,
                        piecesQty: validP,
                        casesQty: validC,
                        quantity: validP + validC,
                    };
                }),
            );
        },
        [
            cartItems,
            removeFromCart,
            setProductQuantitiesMutation,
        ],
    );

    // Clear entire cart
    const clearCart = useCallback(() => {
        clearCartMutation.mutate();
        setCartItems([]);
    }, [clearCartMutation]);

    // Computed totals
    const totalItems = useMemo(
        () =>
            cartItems.reduce(
                (total, item) =>
                    total +
                    ((item.piecesQty ?? item.quantity ?? 0) +
                        (item.casesQty ?? 0)),
                0,
            ),
        [cartItems],
    );

    const subtotal = useMemo(() => {
        return cartItems.reduce((total, item) => {
            return total + calculateCartItemTotal(item);
        }, 0);
    }, [cartItems]);

    const isLoading =
        isCartQueryLoading ||
        setProductQuantitiesMutation.isPending ||
        addToCartMutation.isPending ||
        updateCartItemMutation.isPending ||
        removeCartItemMutation.isPending ||
        clearCartMutation.isPending;

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
                isLoading,
                isCartFetching,
                isAddingProduct,
                addingProductIds,
                refetchCart,
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
