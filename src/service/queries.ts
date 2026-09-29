import { useQuery } from "@tanstack/react-query";
import {
    getCategoriesFunc,
    getBrandsFunc,
    getProductsFunc,
    getProductBySlugFunc,
    getBestSellersFunc,
    getCartFunc,
    getDeliveryAreasFunc,
    getAccountProfileFunc,
    getAddressesFunc,
    getAccountPaymentsFunc,
    getCustomerOrdersFunc,
    getSingleOrderFunc,
    verifyCheckoutFunc,
    getLatestReviewsFunc,
    getWishlistFunc,
    checkWishlistStatusFunc,
    searchStorefrontFunc,
} from "./api";
import type {
    GetProductsParams,
    GetBestSellersParams,
    ApiResponse,
    WishlistResponseData,
    CheckWishlistStatusResponseData,
    UniversalSearchParams,
    UniversalSearchResponseData,
} from "./types";

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
        bestSellers: (params?: GetBestSellersParams) =>
            ["bestSellers", params || {}] as const,
        productBySlug: (slug: string) => ["product", slug] as const,
    },
    wishlist: {
        all: ["wishlist"] as const,
        check: (productId: string) => ["wishlist", "check", productId] as const,
    },
    cart: {
        all: ["cart"] as const,
    },
    deliveryAreas: {
        all: ["deliveryAreas"] as const,
    },
    checkout: {
        verify: (reference: string) =>
            ["checkout", "verify", reference] as const,
    },
    addresses: {
        all: ["addresses"] as const,
    },
    account: {
        payments: ["accountPayments"] as const,
    },
    orders: {
        all: ["orders"] as const,
        single: (orderNumber: string) => ["orders", orderNumber] as const,
    },
    reviews: {
        all: ["reviews"] as const,
        latest: ["reviews", "latest"] as const,
    },
    search: (params: UniversalSearchParams) => ["search", params] as const,
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
        // staleTime: 1000 * 60 * 10, // 10 minutes
    });
};

/**
 * Fetch all active brands alphabetically
 */
export const useGetBrands = () => {
    return useQuery({
        queryKey: queryKeys.catalogue.brands,
        queryFn: () => getBrandsFunc(),
        // staleTime: 1000 * 60 * 10, // 10 minutes
    });
};

/**
 * Fetch paginated & filtered products list
 */
export const useGetProducts = (params?: GetProductsParams) => {
    return useQuery({
        queryKey: queryKeys.catalogue.products(params),
        queryFn: () => getProductsFunc(params),
        // staleTime: 1000 * 60 * 2, // 2 minutes
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
        enabled:
            options?.enabled !== undefined ? options.enabled : Boolean(slug),
        // staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

/**
 * Fetch Best-Selling Products
 */
export const useGetBestSellers = (
    params?: GetBestSellersParams,
    options?: { enabled?: boolean; staleTime?: number },
) => {
    return useQuery({
        queryKey: queryKeys.catalogue.bestSellers(params),
        queryFn: () => getBestSellersFunc(params),
        enabled: options?.enabled !== undefined ? options.enabled : true,
        staleTime: options?.staleTime ?? 1000 * 60 * 5, // 5 minutes
    });
};

// ==========================================
// 2. CART QUERIES
// ==========================================

/**
 * Fetch / Initialize Cart (Guest or Customer)
 */
export const useGetCart = (options?: { enabled?: boolean; staleTime?: number }) => {
    return useQuery({
        queryKey: queryKeys.cart.all,
        queryFn: () => getCartFunc(),
        staleTime: options?.staleTime ?? 1000 * 60 * 5, // 5 minutes fresh in cache
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        ...options,
    });
};

// ==========================================
// 3. CHECKOUT & PAYMENT QUERIES
// ==========================================

/**
 * Fetch all active delivery areas and delivery rates
 */
export const useGetDeliveryAreas = () => {
    return useQuery({
        queryKey: queryKeys.deliveryAreas.all,
        queryFn: () => getDeliveryAreasFunc(),
        // staleTime: 1000 * 60 * 10, // 10 minutes
    });
};

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
export const useGetAccountProfile = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: queryKeys.auth.accountProfile,
        queryFn: () => getAccountProfileFunc(),
        enabled: options?.enabled !== undefined ? options.enabled : true,
        // staleTime: 1000 * 60 * 5, // 5 minutes
        retry: false,
    });
};

// Backward-compatibility aliases
export const useGetUserProfile = useGetAccountProfile;
export const useGetCustomerProfile = useGetAccountProfile;

/**
 * Fetch saved delivery addresses
 */
export const useGetAddresses = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: queryKeys.addresses.all,
        queryFn: () => getAddressesFunc(),
        enabled: options?.enabled !== undefined ? options.enabled : true,
        // staleTime: 1000 * 60 * 2, // 2 minutes
    });
};

/**
 * Fetch customer payment history
 */
export const useGetAccountPayments = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: queryKeys.account.payments,
        queryFn: () => getAccountPaymentsFunc(),
        enabled: options?.enabled !== undefined ? options.enabled : true,
        // staleTime: 1000 * 60 * 2, // 2 minutes
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
        // staleTime: 1000 * 60 * 2, // 2 minutes
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

// ==========================================
// 6. REVIEWS & RATINGS QUERIES
// ==========================================

/**
 * Fetch latest 6 published customer reviews
 */
export const useGetLatestReviews = () => {
    return useQuery({
        queryKey: queryKeys.reviews.latest,
        queryFn: () => getLatestReviewsFunc(),
        // staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// ==========================================
// 7. WISHLIST QUERIES
// ==========================================

/**
 * Fetch customer wishlist
 */
export const useGetWishlist = (options?: { enabled?: boolean }) => {
    return useQuery<ApiResponse<WishlistResponseData>>({
        queryKey: queryKeys.wishlist.all,
        queryFn: () => getWishlistFunc(),
        enabled: options?.enabled !== undefined ? options.enabled : true,
    });
};

/**
 * Check if a product is in customer wishlist
 */
export const useCheckWishlistStatus = (
    productId: string,
    options?: { enabled?: boolean },
) => {
    return useQuery<ApiResponse<CheckWishlistStatusResponseData>>({
        queryKey: queryKeys.wishlist.check(productId),
        queryFn: () => checkWishlistStatusFunc(productId),
        enabled:
            options?.enabled !== undefined
                ? options.enabled
                : Boolean(productId),
    });
};

// ==========================================
// 8. UNIVERSAL SEARCH QUERIES (Storefront)
// ==========================================

/**
 * Fetch unified search results across products, categories, and brands
 */
export const useUniversalSearch = (
    params: UniversalSearchParams,
    options?: { enabled?: boolean },
) => {
    return useQuery<ApiResponse<UniversalSearchResponseData>>({
        queryKey: queryKeys.search(params),
        queryFn: () => searchStorefrontFunc(params),
        enabled:
            options?.enabled !== undefined
                ? options.enabled
                : Boolean(params?.q && params.q.trim().length > 0),
        staleTime: 1000 * 60 * 2, // 2 minutes cache
    });
};

