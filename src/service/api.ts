import { apiClient } from "@/config/apiClient";
import type {
    ApiResponse,
    RegisterPayload,
    RegisterResponseData,
    VerifyEmailPayload,
    VerifyEmailResponseData,
    ResendOtpPayload,
    ResendOtpResponseData,
    LoginPayload,
    LoginResponseData,
    ForgotPasswordPayload,
    ResetPasswordPayload,
    CustomerUser,
    CategoriesResponseData,
    BrandsResponseData,
    GetProductsParams,
    ProductsResponseData,
    ProductItem,
    CartResponseData,
    AddToCartPayload,
    SetProductQuantitiesPayload,
    UpdateCartItemPayload,
    CheckoutAddressPayload,
    CheckoutResponseData,
    VerifyCheckoutResponseData,
    DeliveryAreasResponseData,
    AccountPaymentsResponseData,
    UpdateProfilePayload,
    ChangePasswordPayload,
    AddressResponseItem,
    AddressesResponseData,
    CreateAddressPayload,
    UpdateAddressPayload,
    TrackOrderPayload,
    TrackOrderResponseData,
    OrderSummaryItem,
    OrderDetailsData,
    ReorderResponseData,
    SubmitReviewPayload,
    SubmitReviewResponseData,
    LatestReviewsResponseData,
    PublishedReviewsResponseData,
} from "./types";

// ==========================================
// 1. AUTHENTICATION API
// ==========================================

/**
 * 1. Register Customer
 * POST /auth/register
 */
export const registerCustomerFunc = async (
    payload: RegisterPayload,
): Promise<ApiResponse<RegisterResponseData>> => {
    const response = await apiClient.post<ApiResponse<RegisterResponseData>>(
        "/auth/register",
        payload,
    );
    return response.data;
};

/**
 * 2. Verify Email
 * POST /auth/verify-email
 */
export const verifyEmailFunc = async (
    payload: VerifyEmailPayload,
): Promise<ApiResponse<VerifyEmailResponseData>> => {
    const response = await apiClient.post<ApiResponse<VerifyEmailResponseData>>(
        "/auth/verify-email",
        payload,
    );
    return response.data;
};

/**
 * 3. Resend Verification OTP
 * POST /auth/resend-otp
 */
export const resendOtpFunc = async (
    payload: ResendOtpPayload,
): Promise<ApiResponse<ResendOtpResponseData>> => {
    const response = await apiClient.post<ApiResponse<ResendOtpResponseData>>(
        "/auth/resend-otp",
        payload,
    );
    return response.data;
};

/**
 * 4. Customer Login
 * POST /auth/login
 */
export const loginFunc = async (
    payload: LoginPayload,
): Promise<ApiResponse<LoginResponseData>> => {
    const response = await apiClient.post<ApiResponse<LoginResponseData>>(
        "/auth/login",
        payload,
    );
    return response.data;
};

/**
 * 5. Forgot Password
 * POST /auth/forgot-password
 */
export const forgotPasswordFunc = async (
    payload: ForgotPasswordPayload,
): Promise<ApiResponse<unknown>> => {
    const response = await apiClient.post<ApiResponse<unknown>>(
        "/auth/forgot-password",
        payload,
    );
    return response.data;
};

/**
 * 6. Reset Password
 * POST /auth/reset-password
 */
export const resetPasswordFunc = async (
    payload: ResetPasswordPayload,
): Promise<ApiResponse<unknown>> => {
    const response = await apiClient.post<ApiResponse<unknown>>(
        "/auth/reset-password",
        payload,
    );
    return response.data;
};

// ==========================================
// 2. CATALOGUE, CATEGORIES & PRODUCTS API
// ==========================================

/**
 * 5. Get Public Categories List
 * GET /categories
 */
export const getCategoriesFunc = async (): Promise<
    ApiResponse<CategoriesResponseData>
> => {
    const response =
        await apiClient.get<ApiResponse<CategoriesResponseData>>("/categories");
    return response.data;
};

/**
 * 6. Get Public Brands List
 * GET /brands
 */
export const getBrandsFunc = async (): Promise<
    ApiResponse<BrandsResponseData>
> => {
    const response =
        await apiClient.get<ApiResponse<BrandsResponseData>>("/brands");
    return response.data;
};

/**
 * 7. Get Public Products (with search, categoryId, brandId, featured, sort, page, limit)
 * GET /products
 */
export const getProductsFunc = async (
    params?: GetProductsParams,
): Promise<ApiResponse<ProductsResponseData>> => {
    const response = await apiClient.get<ApiResponse<ProductsResponseData>>(
        "/products",
        { params },
    );
    return response.data;
};

/**
 * 8. Get Single Product Details by Slug
 * GET /products/:slug
 */
export const getProductBySlugFunc = async (
    slug: string,
): Promise<ApiResponse<ProductItem>> => {
    const response = await apiClient.get<ApiResponse<ProductItem>>(
        `/products/${slug}`,
    );
    return response.data;
};

// ==========================================
// 3. CART API (Guest with X-Cart-Token or Customer with Bearer)
// ==========================================

/**
 * 9. Get / Initialize Cart
 * GET /cart
 */
export const getCartFunc = async (): Promise<
    ApiResponse<{ cart: CartResponseData }>
> => {
    const response =
        await apiClient.get<ApiResponse<{ cart: CartResponseData }>>("/cart");
    return response.data;
};

/**
 * 10. Set Product Quantities (Unified Pieces & Cases)
 * POST /cart/product-quantities
 */
export const setProductQuantitiesFunc = async (
    payload: SetProductQuantitiesPayload,
): Promise<ApiResponse<{ cart: CartResponseData }>> => {
    const response = await apiClient.post<
        ApiResponse<{ cart: CartResponseData }>
    >("/cart/product-quantities", payload);
    return response.data;
};

/**
 * 11. Add Single Item to Cart
 * POST /cart/items
 */
export const addToCartFunc = async (
    payload: AddToCartPayload,
): Promise<ApiResponse<{ cart: CartResponseData }>> => {
    const response = await apiClient.post<
        ApiResponse<{ cart: CartResponseData }>
    >("/cart/items", payload);
    return response.data;
};

/**
 * 11. Update Cart Item Quantity
 * PATCH /cart/items/:cartItemId
 */
export const updateCartItemQuantityFunc = async (
    payload: UpdateCartItemPayload,
): Promise<ApiResponse<{ cart: CartResponseData }>> => {
    const response = await apiClient.patch<
        ApiResponse<{ cart: CartResponseData }>
    >(`/cart/items/${payload.cartItemId}`, {
        quantity: payload.quantity,
    });
    return response.data;
};

/**
 * 12. Remove Single Item from Cart
 * DELETE /cart/items/:cartItemId
 */
export const removeCartItemFunc = async (
    cartItemId: string,
): Promise<ApiResponse<{ cart: CartResponseData }>> => {
    const response = await apiClient.delete<
        ApiResponse<{ cart: CartResponseData }>
    >(`/cart/items/${cartItemId}`);
    return response.data;
};

/**
 * 13. Clear Entire Cart
 * DELETE /cart
 */
export const clearCartFunc = async (): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>("/cart");
    return response.data;
};

// ==========================================
// 4. CHECKOUT & PAYMENT API
// ==========================================

/**
 * 14. Get Public Delivery Areas
 * GET /delivery-areas
 */
export const getDeliveryAreasFunc = async (): Promise<
    ApiResponse<DeliveryAreasResponseData>
> => {
    const response =
        await apiClient.get<ApiResponse<DeliveryAreasResponseData>>(
            "/delivery-areas",
        );
    return response.data;
};

/**
 * 15. Initialize Checkout
 * POST /checkout
 */
export const initializeCheckoutFunc = async (
    payload: CheckoutAddressPayload,
): Promise<ApiResponse<CheckoutResponseData>> => {
    const response = await apiClient.post<ApiResponse<CheckoutResponseData>>(
        "/checkout",
        payload,
    );
    return response.data;
};

/**
 * 16. Verify Checkout Payment & Trigger Order Creation
 * GET /checkout/verify/:reference
 */
export const verifyCheckoutFunc = async (
    reference: string,
): Promise<ApiResponse<VerifyCheckoutResponseData>> => {
    const response = await apiClient.get<
        ApiResponse<VerifyCheckoutResponseData>
    >(`/checkout/verify/${reference}`);
    return response.data;
};

// ==========================================
// 5. CUSTOMER ACCOUNT & SAVED ADDRESSES API
// ==========================================

/**
 * 16. Get Account Profile
 * GET /account/profile
 */
export const getAccountProfileFunc = async (): Promise<
    ApiResponse<CustomerUser>
> => {
    const response =
        await apiClient.get<ApiResponse<CustomerUser>>("/account/profile");
    return response.data;
};

// Backward-compatibility aliases
export const userProfileFunc = getAccountProfileFunc;
export const getCustomerProfileFunc = getAccountProfileFunc;

/**
 * 17. Update Account Profile
 * PATCH /account/profile
 */
export const updateAccountProfileFunc = async (
    payload: UpdateProfilePayload,
): Promise<ApiResponse<CustomerUser>> => {
    const response = await apiClient.patch<ApiResponse<CustomerUser>>(
        "/account/profile",
        payload,
    );
    return response.data;
};

/**
 * 18. Change Password
 * PATCH /account/password
 */
export const changePasswordFunc = async (
    payload: ChangePasswordPayload,
): Promise<ApiResponse<null>> => {
    const response = await apiClient.patch<ApiResponse<null>>(
        "/account/password",
        payload,
    );
    return response.data;
};

/**
 * 19. List Saved Addresses
 * GET /account/addresses
 */
export const getAddressesFunc = async (): Promise<
    ApiResponse<AddressesResponseData>
> => {
    const response =
        await apiClient.get<ApiResponse<AddressesResponseData>>(
            "/account/addresses",
        );
    return response.data;
};

/**
 * 20. Add New Saved Address
 * POST /account/addresses
 */
export const createAddressFunc = async (
    payload: CreateAddressPayload,
): Promise<ApiResponse<AddressResponseItem>> => {
    const response = await apiClient.post<ApiResponse<AddressResponseItem>>(
        "/account/addresses",
        payload,
    );
    return response.data;
};

/**
 * 21. Update Saved Address
 * PATCH /account/addresses/:addressId
 */
export const updateAddressFunc = async (
    payload: UpdateAddressPayload,
): Promise<ApiResponse<AddressResponseItem>> => {
    const response = await apiClient.patch<ApiResponse<AddressResponseItem>>(
        `/account/addresses/${payload.addressId}`,
        payload.data,
    );
    return response.data;
};

/**
 * 22. Delete Saved Address
 * DELETE /account/addresses/:addressId
 */
export const deleteAddressFunc = async (
    addressId: string,
): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(
        `/account/addresses/${addressId}`,
    );
    return response.data;
};

/**
 * 23. Get Customer Payments History
 * GET /account/payments
 */
export const getAccountPaymentsFunc = async (): Promise<
    ApiResponse<AccountPaymentsResponseData>
> => {
    const response =
        await apiClient.get<ApiResponse<AccountPaymentsResponseData>>(
            "/account/payments",
        );
    return response.data;
};

// ==========================================
// 6. ORDERS, TRACKING & REORDER API
// ==========================================

/**
 * 23. Guest / Customer Order Tracking
 * POST /orders/track
 */
export const trackOrderFunc = async (
    payload: TrackOrderPayload,
): Promise<ApiResponse<TrackOrderResponseData>> => {
    const response = await apiClient.post<ApiResponse<TrackOrderResponseData>>(
        "/orders/track",
        payload,
    );
    return response.data;
};

/**
 * 24. Get Customer Orders List
 * GET /orders
 */
export const getCustomerOrdersFunc = async (): Promise<
    ApiResponse<OrderSummaryItem[]>
> => {
    const response =
        await apiClient.get<ApiResponse<OrderSummaryItem[]>>("/orders");
    return response.data;
};

/**
 * 25. Get Single Customer Order Details
 * GET /orders/:orderNumber
 */
export const getSingleOrderFunc = async (
    orderNumber: string,
): Promise<ApiResponse<OrderDetailsData>> => {
    const response = await apiClient.get<ApiResponse<OrderDetailsData>>(
        `/orders/${orderNumber}`,
    );
    return response.data;
};

/**
 * 26. Reorder Previous Order Items into Active Cart
 * POST /account/orders/:orderNumber/reorder
 */
export const reorderFunc = async (
    orderNumber: string,
): Promise<ApiResponse<ReorderResponseData>> => {
    const response = await apiClient.post<ApiResponse<ReorderResponseData>>(
        `/account/orders/${orderNumber}/reorder`,
    );
    return response.data;
};

// ==========================================
// 7. REVIEWS & RATINGS API
// ==========================================

/**
 * 27. Get Latest Six Published Reviews (for Homepage Testimonials)
 * GET /reviews/latest
 */
export const getLatestReviewsFunc = async (): Promise<
    ApiResponse<LatestReviewsResponseData>
> => {
    const response =
        await apiClient.get<ApiResponse<LatestReviewsResponseData>>(
            "/reviews/latest",
        );
    return response.data;
};

/**
 * 28. Get Published Reviews List (with pagination and optional productId)
 * GET /reviews
 */
export const getReviewsFunc = async (params?: {
    page?: number;
    limit?: number;
    productId?: string;
}): Promise<ApiResponse<PublishedReviewsResponseData>> => {
    const response = await apiClient.get<
        ApiResponse<PublishedReviewsResponseData>
    >("/reviews", { params });
    return response.data;
};

/**
 * 29. Submit Order Review (Authenticated or Guest)
 * POST /reviews
 */
export const submitReviewFunc = async (
    payload: SubmitReviewPayload,
): Promise<ApiResponse<SubmitReviewResponseData>> => {
    const response = await apiClient.post<
        ApiResponse<SubmitReviewResponseData>
    >("/reviews", payload);
    return response.data;
};
