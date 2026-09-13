import { useQuery } from "@tanstack/react-query";
import {
    getCategoriesFunc,
    getBrandsFunc,
    getProductsFunc,
    getProductBySlugFunc,
    getCartFunc,
    getAccountProfileFunc,
    getAddressesFunc,
    getCustomerOrdersFunc,
    getSingleOrderFunc,
    verifyCheckoutFunc,
} from "./api";
import type { GetProductsParams } from "./types";

/**
 * Standardized Query Keys Factory
 */
export const queryKeys = {
    auth: {
        all: ["auth"] as const,
        userProfile: ["userProfile"] as const,
        accountProfile: ["accountProfile"] as const,
    },
    catalogue: {
        all: ["catalogue"] as const,
        categories: ["categories"] as const,
        brands: ["brands"] as const,
        products: (params?: GetProductsParams) =>
            ["products", params || {}] as const,
        productBySlug: (slug: string) => ["product", slug] as const,
    },
    cart: {
        all: ["cart"] as const,
    },
    checkout: {
        verify: (reference: string) => ["checkout", "verify", reference] as const,
    },
    addresses: {
        all: ["addresses"] as const,
    },
    orders: {
        all: ["orders"] as const,
        single: (orderNumber: string) => ["orders", orderNumber] as const,
    },
};

// Backward-compatibility alias
export const authQueryKeys = queryKeys.auth;

// ==========================================
// 1. CATALOGUE & PRODUCT QUERIES
// ==========================================

/**
 * Fetch all active categories
 */
export const useGetCategories = () => {
    return useQuery({
        queryKey: queryKeys.catalogue.categories,
        queryFn: () => getCategoriesFunc(),
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
};

/**
 * Fetch all active brands alphabetically
 */
export const useGetBrands = () => {
    return useQuery({
        queryKey: queryKeys.catalogue.brands,
        queryFn: () => getBrandsFunc(),
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
};

/**
 * Fetch paginated & filtered products list
 */
export const useGetProducts = (params?: GetProductsParams) => {
    return useQuery({
        queryKey: queryKeys.catalogue.products(params),
        queryFn: () => getProductsFunc(params),
        staleTime: 1000 * 60 * 2, // 2 minutes
    });
};

/**
 * Fetch single product details by slug
 */
export const useGetProductBySlug = (
    slug: string,
    options?: { enabled?: boolean },
) => {
    return useQuery({
        queryKey: queryKeys.catalogue.productBySlug(slug),
        queryFn: () => getProductBySlugFunc(slug),
        enabled: options?.enabled !== undefined ? options.enabled : Boolean(slug),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// ==========================================
// 2. CART QUERIES
// ==========================================

/**
 * Fetch / Initialize Cart (Guest or Customer)
 */
export const useGetCart = () => {
    return useQuery({
        queryKey: queryKeys.cart.all,
        queryFn: () => getCartFunc(),
        staleTime: 1000 * 30, // 30 seconds
    });
};

// ==========================================
// 3. CHECKOUT & PAYMENT QUERIES
// ==========================================

/**
 * Verify checkout payment reference status
 */
export const useVerifyCheckout = (
    reference: string,
    options?: { enabled?: boolean },
) => {
    return useQuery({
        queryKey: queryKeys.checkout.verify(reference),
        queryFn: () => verifyCheckoutFunc(reference),
        enabled:
            options?.enabled !== undefined
                ? options.enabled
                : Boolean(reference),
        retry: 2,
    });
};

// ==========================
// 4. CUSTOMER ACCOUNT & ADDRESSES QUERIES
// ==========================

/**
 * Fetch Current Customer Profile
 */
export const useGetAccountProfile = () => {
    return useQuery({
        queryKey: queryKeys.auth.accountProfile,
        queryFn: () => getAccountProfileFunc(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: false,
    });
};

// Backward-compatibility aliases
export const useGetUserProfile = useGetAccountProfile;
export const useGetCustomerProfile = useGetAccountProfile;

/**
 * Fetch saved delivery addresses
 */
export const useGetAddresses = () => {
    return useQuery({
        queryKey: queryKeys.addresses.all,
        queryFn: () => getAddressesFunc(),
        staleTime: 1000 * 60 * 2, // 2 minutes
    });
};

// ==========================================
// 5. ORDERS & ORDER DETAILS QUERIES
// ==========================================

/**
 * Fetch customer order history
 */
export const useGetCustomerOrders = () => {
    return useQuery({
        queryKey: queryKeys.orders.all,
        queryFn: () => getCustomerOrdersFunc(),
        staleTime: 1000 * 60 * 2, // 2 minutes
    });
};

/**
 * Fetch single customer order details
 */
export const useGetSingleOrder = (
    orderNumber: string,
    options?: { enabled?: boolean },
) => {
    return useQuery({
        queryKey: queryKeys.orders.single(orderNumber),
        queryFn: () => getSingleOrderFunc(orderNumber),
        enabled:
            options?.enabled !== undefined
                ? options.enabled
                : Boolean(orderNumber),
    });
};
